package com.akshaj.mydigibank.controller;

import com.akshaj.mydigibank.service.GoogleTranslateService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class TranslateController {

    private final GoogleTranslateService translateService;

    public TranslateController(GoogleTranslateService translateService) {
        this.translateService = translateService;
    }

    @PostMapping("/translate")
    public String translate(@RequestBody TranslateRequest request) {
        return translateService.translate(request.getText(), request.getTargetLang());
    }
}

class TranslateRequest {
    private String text;
    private String targetLang;

    // getters setters
    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
    public String getTargetLang() { return targetLang; }
    public void setTargetLang(String targetLang) { this.targetLang = targetLang; }
}
