package com.akshaj.mydigibank.controller;

import com.akshaj.mydigibank.dto.DebitCreditDTO;
import com.akshaj.mydigibank.model.Transaction;
import com.akshaj.mydigibank.service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/accounts")
@CrossOrigin
public class AccountOperationController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping("/{accountId}/debit")
    public ResponseEntity<?> debit(@PathVariable String accountId,
                                   @Valid @RequestBody DebitCreditDTO request) {

        Transaction tx = Transaction.builder()
                .accountId(accountId)
                .transactionType("Debit")
                .amount(request.getAmount())
                .description(request.getDescription())
                .build();

        Optional<Transaction> result = transactionService.recordTransaction(tx);
        return result.<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.badRequest().body("Transaction failed"));
    }

    @PostMapping("/{accountId}/credit")
    public ResponseEntity<?> credit(@PathVariable String accountId,
                                    @Valid @RequestBody DebitCreditDTO request) {

        Transaction tx = Transaction.builder()
                .accountId(accountId)
                .transactionType("Credit")
                .amount(request.getAmount())
                .description(request.getDescription())
                .build();

        Optional<Transaction> result = transactionService.recordTransaction(tx);
        return result.<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.badRequest().body("Transaction failed"));
    }
}