package com.akshaj.mydigibank.controller;

import com.akshaj.mydigibank.dto.AccountTypeResponse;
import com.akshaj.mydigibank.service.GoogleTranslateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/accounts")
@CrossOrigin
public class AccountTypeController {

    @Autowired
    private GoogleTranslateService translateService;

    @GetMapping("/types")
    public List<AccountTypeResponse> getAccountTypes(@RequestParam(defaultValue = "en") String lang) {
        return List.of(
                new AccountTypeResponse(
                        translateService.translate("Savings", lang),
                        3.0,
                        null),
                new AccountTypeResponse(
                        translateService.translate("Checking", lang),
                        null,
                        50000.0)
        );
    }
}
