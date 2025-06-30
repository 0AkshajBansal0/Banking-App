package com.akshaj.mydigibank.controller;

import com.akshaj.mydigibank.dto.AccountTypeResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/accounts")
@CrossOrigin
public class AccountTypeController {

    @GetMapping("/types")
    public List<AccountTypeResponse> getAccountTypes() {
        return List.of(
                new AccountTypeResponse("Savings", 3.0, null),
                new AccountTypeResponse("Checking", null, 50000.0)
        );
    }
}