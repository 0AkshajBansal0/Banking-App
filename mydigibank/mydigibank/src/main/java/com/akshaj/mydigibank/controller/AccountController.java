package com.akshaj.mydigibank.controller;

import com.akshaj.mydigibank.model.Account;
import com.akshaj.mydigibank.service.AccountService;
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

    /* (POST /accounts) */
    @PostMapping
    public ResponseEntity<Account> createAccount(@Valid @RequestBody Account account) {
        Account saved = accountService.createAccount(account);
        return ResponseEntity.ok(saved);
    }

    /* (GET /accounts?type=&status=&from=&to=) */
    @GetMapping
    public ResponseEntity<List<Account>> getFilteredAccounts(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {

        List<Account> result = accountService.getAllAccounts().stream()
                .filter(a -> type == null || a.getAccountType().equalsIgnoreCase(type))
                .filter(a -> status == null || a.getStatus().equalsIgnoreCase(status))
                .filter(a -> from == null || !a.getDateOfCreation().isBefore(from))
                .filter(a -> to == null || !a.getDateOfCreation().isAfter(to))
                .collect(Collectors.toList());

        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Account> getAccount(@PathVariable String id) {
        return accountService.getAccountById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Account> updateAccount(@PathVariable String id,
            @Valid @RequestBody Account updated) {
        return accountService.updateAccount(id, updated)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> closeAccount(@PathVariable String id) {
        accountService.closeAccount(id);
        return ResponseEntity.noContent().build();
    }
}