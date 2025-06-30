package com.akshaj.mydigibank.controller;

import com.akshaj.mydigibank.model.Transaction;
import com.akshaj.mydigibank.service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/transactions")
@CrossOrigin
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    // POST /transactions
    @PostMapping
    public ResponseEntity<?> recordTransaction(@Valid @RequestBody Transaction transaction) {
        Optional<Transaction> saved = transactionService.recordTransaction(transaction);

        if (saved.isPresent()) {
            return ResponseEntity.ok(saved.get());
        } else {
            return ResponseEntity.badRequest().body("Transaction failed (insufficient balance or invalid input)");
        }
    }

    // GET /transactions/account/{accountId}
    @GetMapping("/account/{accountId}")
    public ResponseEntity<List<Transaction>> getTransactions(@PathVariable String accountId) {
        return ResponseEntity.ok(transactionService.getTransactionsForAccount(accountId));
    }
}