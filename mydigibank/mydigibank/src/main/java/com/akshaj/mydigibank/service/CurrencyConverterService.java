package com.akshaj.mydigibank.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.Locale;
import java.util.Map;

@Service
public class CurrencyConverterService {

    @Value("${exchangerate.api.key:}")
    private String apiKey;

    @Value("${exchangerate.api.base:https://v6.exchangerate-api.com/v6}")
    private String apiBase;

    private final RestTemplate restTemplate = new RestTemplate();

    public double getConversionRate(String fromCurrency, String toCurrency) {
        String from = normalizeCurrency(fromCurrency);
        String to = normalizeCurrency(toCurrency);
        if (from.equals(to)) return 1.0;
        if (apiKey.isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.SERVICE_UNAVAILABLE, "Currency conversion is not configured");
        }

        try {
            String url = apiBase + "/" + apiKey + "/latest/" + from;
            Map<?, ?> response = restTemplate.getForObject(url, Map.class);
            Object ratesValue = response == null ? null : response.get("conversion_rates");
            if (!(ratesValue instanceof Map<?, ?> rates)) {
                throw new ResponseStatusException(
                        HttpStatus.SERVICE_UNAVAILABLE, "Currency rate response was invalid");
            }

            Object rateValue = rates.get(to);
            if (rateValue instanceof Number rate && rate.doubleValue() > 0) {
                return rate.doubleValue();
            }
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Unsupported currency: " + to);
        } catch (RestClientException e) {
            throw new ResponseStatusException(
                    HttpStatus.SERVICE_UNAVAILABLE, "Unable to retrieve currency rate", e);
        }
    }

    public double convert(String fromCurrency, String toCurrency, double amount) {
        double rate = getConversionRate(fromCurrency, toCurrency);
        return amount * rate;
    }

    private String normalizeCurrency(String currency) {
        if (currency == null || !currency.matches("[A-Za-z]{3}")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Currency must be a 3-letter code");
        }
        return currency.toUpperCase(Locale.ROOT);
    }
}