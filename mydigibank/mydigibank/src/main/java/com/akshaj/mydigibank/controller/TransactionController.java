package com.akshaj.mydigibank.controller;

import com.akshaj.mydigibank.model.Transaction;
import com.akshaj.mydigibank.service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/transactions")
@CrossOrigin
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping
    public ResponseEntity<?> recordTransaction(@Valid @RequestBody Transaction transactionRequest) {
        Optional<Transaction> savedTransaction = transactionService.recordTransaction(transactionRequest);

        return savedTransaction.<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.badRequest().body("Transaction failed"));
    }

    @GetMapping("/account/{accountId}")
    public ResponseEntity<List<Transaction>> getTransactions(
            @PathVariable String accountId,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) Double min,
            @RequestParam(required = false) Double max,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {

        List<Transaction> transactions = transactionService.getTransactionsForAccount(accountId, type, min, max, from, to);
        return ResponseEntity.ok(transactions);
    }
}