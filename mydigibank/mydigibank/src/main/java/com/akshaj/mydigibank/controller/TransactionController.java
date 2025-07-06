package com.akshaj.mydigibank.controller;

import com.akshaj.mydigibank.model.Transaction;
import com.akshaj.mydigibank.service.GoogleTranslateService;
import com.akshaj.mydigibank.service.TransactionService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private GoogleTranslateService translateService;

    @PostMapping("/transactions")
    public ResponseEntity<?> recordTransaction(@Valid @RequestBody Transaction transactionRequest,
            @RequestParam(defaultValue = "en") String lang) {
        if (transactionRequest.getDateOfTransaction() == null) {
            transactionRequest.setDateOfTransaction(LocalDate.now());
        }
        if (transactionRequest.getTimeOfTransaction() == null) {
            transactionRequest.setTimeOfTransaction(LocalTime.now());
        }

        Optional<Transaction> saved = transactionService.recordTransaction(transactionRequest);

        return saved.<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.badRequest()
                        .body(translateService.translate("Transaction failed", lang)));
    }

    @GetMapping("/accounts/{accountId}/transactions")
    public ResponseEntity<List<Transaction>> getAccountTransactions(
            @PathVariable String accountId,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) Double minAmount,
            @RequestParam(required = false) Double maxAmount,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fromDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate toDate,
            @RequestParam(defaultValue = "en") String lang) {

        List<Transaction> list = transactionService.getTransactionsForAccount(
                accountId, type, minAmount, maxAmount, fromDate, toDate);

        List<Transaction> translated = list.stream().map(t -> {
            t.setDescription(translateService.translate(t.getDescription(), lang));
            return t;
        }).toList();

        return ResponseEntity.ok(translated);
    }
}
