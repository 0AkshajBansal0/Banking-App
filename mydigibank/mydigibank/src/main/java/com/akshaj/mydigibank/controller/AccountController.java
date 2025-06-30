package com.akshaj.mydigibank.controller;

import com.akshaj.mydigibank.model.Account;
import com.akshaj.mydigibank.service.AccountService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/accounts")
@CrossOrigin
public class AccountController {

    @Autowired
    private AccountService accountService;

    // GET /accounts?type=Savings&status=Active
    @GetMapping
    public ResponseEntity<List<Account>> getFilteredAccounts(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String status) {

        List<Account> filtered = accountService.getAllAccounts().stream()
                .filter(a -> type == null || a.getAccountType().equalsIgnoreCase(type))
                .filter(a -> status == null || a.getStatus().equalsIgnoreCase(status))
                .collect(Collectors.toList());

        return ResponseEntity.ok(filtered);
    }

    // POST /accounts   (send JSON as SavingsAccount or CheckingAccount)
    @PostMapping
    public ResponseEntity<Account> createAccount(@Valid @RequestBody Account account) {
        Account saved = accountService.createAccount(account);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Account> getAccount(@PathVariable String id) {
        Optional<Account> found = accountService.getAccountById(id);
        return found.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Account> updateAccount(@PathVariable String id,
                                                 @Valid @RequestBody Account updatedData) {
        return accountService.updateAccount(id, updatedData)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> closeAccount(@PathVariable String id) {
        accountService.closeAccount(id);
        return ResponseEntity.noContent().build();
    }
}