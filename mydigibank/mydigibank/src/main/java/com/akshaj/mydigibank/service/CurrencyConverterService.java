package com.akshaj.mydigibank.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class CurrencyConverterService {

    @Value("${exchangerate.api.key}")
    private String apiKey;

    @Value("${exchangerate.api.base}")
    private String apiBase;

    private final RestTemplate restTemplate = new RestTemplate();

    public double getConversionRate(String fromCurrency, String toCurrency) {
        String url = apiBase + "/" + apiKey + "/latest/" + fromCurrency;

        try {
            Map response = restTemplate.getForObject(url, Map.class);
            Map<String, Object> rates = (Map<String, Object>) response.get("conversion_rates");

            if (rates.containsKey(toCurrency)) {
                return ((Number) rates.get(toCurrency)).doubleValue();
            }
        } catch (Exception e) {
            System.out.println("Error fetching currency rate: " + e.getMessage());
        }

        return 1.0; // fallback
    }

    public double convert(String fromCurrency, String toCurrency, double amount) {
        double rate = getConversionRate(fromCurrency, toCurrency);
        return amount * rate;
    }
}