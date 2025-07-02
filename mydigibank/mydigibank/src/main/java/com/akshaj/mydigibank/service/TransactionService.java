package com.akshaj.mydigibank.service;

import com.akshaj.mydigibank.model.Account;
import com.akshaj.mydigibank.model.Transaction;
import com.akshaj.mydigibank.repository.AccountRepository;
import com.akshaj.mydigibank.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Stream;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AccountRepository accountRepository;

    public Optional<Transaction> recordTransaction(Transaction transaction) {

        if (transaction.getAmount() <= 0) return Optional.empty();

        Optional<Account> accountOptional = accountRepository.findById(transaction.getAccountId());
        if (accountOptional.isEmpty()) return Optional.empty();

        Account account = accountOptional.get();

        if (!"Active".equalsIgnoreCase(account.getStatus())) return Optional.empty();

        double amount = transaction.getAmount();

        switch (transaction.getTransactionType()) {
            case "Debit" -> {
                if (account.getBalance() < amount) return Optional.empty();
                account.setBalance(account.getBalance() - amount);
            }
            case "Credit" -> account.setBalance(account.getBalance() + amount);
            default -> { return Optional.empty(); }
        }

        accountRepository.save(account);

        transaction.setTransactionId(UUID.randomUUID().toString());
        transaction.setDateOfTransaction(LocalDate.now());

        Transaction savedTransaction = transactionRepository.save(transaction);
        return Optional.of(savedTransaction);
    }

    public List<Transaction> getTransactionsForAccount(
            String accountId,
            String transactionType,
            Double minAmount,
            Double maxAmount,
            LocalDate fromDate,
            LocalDate toDate) {

        Stream<Transaction> stream = transactionRepository.findByAccountId(accountId).stream();

        if (transactionType != null) stream = stream.filter(t -> t.getTransactionType().equalsIgnoreCase(transactionType));
        if (minAmount != null) stream = stream.filter(t -> t.getAmount() >= minAmount);
        if (maxAmount != null) stream = stream.filter(t -> t.getAmount() <= maxAmount);
        if (fromDate != null) stream = stream.filter(t -> !t.getDateOfTransaction().isBefore(fromDate));
        if (toDate != null) stream = stream.filter(t -> !t.getDateOfTransaction().isAfter(toDate));

        return stream.toList();
    }
}