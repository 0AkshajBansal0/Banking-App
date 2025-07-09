package com.akshaj.mydigibank.controller;

import com.akshaj.mydigibank.model.Account;
import com.akshaj.mydigibank.service.AccountService;
import com.akshaj.mydigibank.service.GoogleTranslateService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/accounts")
@CrossOrigin
public class AccountController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private GoogleTranslateService translateService;

    private Account translateAccount(Account acc, String lang) {
        acc.setStatus(translateService.translate(acc.getStatus(), lang));
        acc.setAccountHolderName(translateService.translate(acc.getAccountHolderName(), lang));
        return acc;
    }

    /* (POST /accounts) */
    @PostMapping
    public ResponseEntity<Account> createAccount(@Valid @RequestBody Account account,
            @RequestParam(defaultValue = "en") String lang) {
        if (account.getAccountType() == null || account.getAccountType().isBlank()) {
            String actualType = account.getClass().getSimpleName().replace("Account", "");
            account.setAccountType(actualType);
        }
        Account saved = accountService.createAccount(account);
        return ResponseEntity.ok(translateAccount(saved, lang));
    }

    /* (GET /accounts?type=&status=&from=&to=&lang=) */
    @GetMapping
    public ResponseEntity<List<Account>> getFilteredAccounts(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to,
            @RequestParam(defaultValue = "en") String lang) {

        List<Account> result = accountService.getAllAccounts().stream()
                .filter(a -> type == null || a.getAccountType().equalsIgnoreCase(type))
                .filter(a -> status == null || a.getStatus().equalsIgnoreCase(status))
                .filter(a -> from == null || !a.getDateOfCreation().isBefore(from))
                .filter(a -> to == null || !a.getDateOfCreation().isAfter(to))
                .map(acc -> translateAccount(acc, lang))
                .collect(Collectors.toList());

        return ResponseEntity.ok(result);
    }

    /* (GET /accounts/{id}?lang=) */
    @GetMapping("/{id}")
    public ResponseEntity<Account> getAccount(
            @PathVariable String id,
            @RequestParam(defaultValue = "en") String lang) {

        return accountService.getAccountById(id)
                .map(acc -> ResponseEntity.ok(translateAccount(acc, lang)))
                .orElse(ResponseEntity.notFound().build());
    }

    /* (PUT /accounts/{id}?lang=) */
    @PutMapping("/{id}")
    public ResponseEntity<Account> updateAccount(@PathVariable String id,
            @Valid @RequestBody Account updated,
            @RequestParam(defaultValue = "en") String lang) {
        return accountService.updateAccount(id, updated)
                .map(acc -> ResponseEntity.ok(translateAccount(acc, lang)))
                .orElse(ResponseEntity.notFound().build());
    }

    /* (DELETE /accounts/{id}) */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> closeAccount(@PathVariable String id) {
        accountService.closeAccount(id);
        return ResponseEntity.noContent().build();
    }
}
