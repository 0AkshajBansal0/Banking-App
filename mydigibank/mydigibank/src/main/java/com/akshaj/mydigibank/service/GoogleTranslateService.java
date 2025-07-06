package com.akshaj.mydigibank.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@Service
public class GoogleTranslateService {

    @Value("${google.api.key}")
    private String apiKey;

    private final String URL = "https://translation.googleapis.com/language/translate/v2";

    public String translate(String text, String targetLang) {
        if (text == null || text.isEmpty() || targetLang.equalsIgnoreCase("en")) {
            return text;
        }

        try {
            // URL encode text & target language params
            String encodedText = URLEncoder.encode(text, StandardCharsets.UTF_8);
            String encodedTarget = URLEncoder.encode(targetLang, StandardCharsets.UTF_8);

            // Construct URL with query params
            String url = String.format("%s?key=%s&q=%s&target=%s&format=text", URL, apiKey, encodedText, encodedTarget);

            RestTemplate restTemplate = new RestTemplate();

            ResponseEntity<Map> response = restTemplate.getForEntity(new URI(url), Map.class);

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                Map data = (Map) response.getBody().get("data");
                if (data != null) {
                    var translations = (java.util.List<Map<String, String>>) data.get("translations");
                    if (translations != null && !translations.isEmpty()) {
                        return translations.get(0).get("translatedText");
                    }
                }
            }
        } catch (URISyntaxException e) {
            e.printStackTrace();
        } catch (Exception e) {
            System.out.println("Translation failed: " + e.getMessage());
        }

        return text; // fallback original
    }
}
