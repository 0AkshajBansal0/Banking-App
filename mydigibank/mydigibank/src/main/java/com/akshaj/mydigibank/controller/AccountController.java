package com.akshaj.mydigibank.controller;

import com.akshaj.mydigibank.model.Account;
import com.akshaj.mydigibank.service.AccountService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/accounts")  // Base URL for all account APIs
@CrossOrigin                  // Allow JavaFX or browser calls (if needed)
public class AccountController {

    @Autowired
    private AccountService accountService;

    // POST /accounts → Create new account
    @PostMapping
    public ResponseEntity<Account> createAccount(@Valid @RequestBody Account account) {
        Account saved = accountService.createAccount(account);
        return ResponseEntity.ok(saved);
    }

    // GET /accounts/{id} → Fetch account by ID
    @GetMapping("/{id}")
    public ResponseEntity<Account> getAccount(@PathVariable String id) {
        Optional<Account> found = accountService.getAccountById(id);
        return found.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
    }

    // DELETE /accounts/{id} → Soft delete (mark as Closed)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> closeAccount(@PathVariable String id) {
        accountService.closeAccount(id);
        return ResponseEntity.noContent().build(); // 204 No Content
    }
}
