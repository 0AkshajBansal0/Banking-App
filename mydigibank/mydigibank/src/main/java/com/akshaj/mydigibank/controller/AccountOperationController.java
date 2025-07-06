package com.akshaj.mydigibank.controller;

import com.akshaj.mydigibank.dto.DebitCreditDTO;
import com.akshaj.mydigibank.model.Transaction;
import com.akshaj.mydigibank.service.TransactionService;
import com.akshaj.mydigibank.service.CurrencyConverterService;
import com.akshaj.mydigibank.service.GoogleTranslateService;

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

    @Autowired
    private CurrencyConverterService currencyConverterService;

    @Autowired
    private GoogleTranslateService translateService;

    @PostMapping("/{accountId}/debit")
    public ResponseEntity<?> debit(@PathVariable String accountId,
                                   @Valid @RequestBody DebitCreditDTO request,
                                   @RequestParam(defaultValue = "en") String lang) {

        String language = request.getLang() != null ? request.getLang() : lang;

        double convertedAmount = currencyConverterService.convert(
                request.getCurrency(), "INR", request.getAmount());

        Transaction transaction = Transaction.builder()
                .accountId(accountId)
                .transactionType("Debit")
                .amount(convertedAmount)
                .description(request.getDescription() + " (" + request.getAmount() + " " + request.getCurrency() + ")")
                .build();

        Optional<Transaction> result = transactionService.recordTransaction(transaction);

        return result.<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> {
                    String msg = translateService.translate("Transaction failed", language);
                    return ResponseEntity.badRequest().body(msg);
                });
    }

    @PostMapping("/{accountId}/credit")
    public ResponseEntity<?> credit(@PathVariable String accountId,
                                    @Valid @RequestBody DebitCreditDTO request,
                                    @RequestParam(defaultValue = "en") String lang) {

        String language = request.getLang() != null ? request.getLang() : lang;

        double convertedAmount = currencyConverterService.convert(
                request.getCurrency(), "INR", request.getAmount());

        Transaction transaction = Transaction.builder()
                .accountId(accountId)
                .transactionType("Credit")
                .amount(convertedAmount)
                .description(request.getDescription() + " (" + request.getAmount() + " " + request.getCurrency() + ")")
                .build();

        Optional<Transaction> result = transactionService.recordTransaction(transaction);

        return result.<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> {
                    String msg = translateService.translate("Transaction failed", language);
                    return ResponseEntity.badRequest().body(msg);
                });
    }
}
