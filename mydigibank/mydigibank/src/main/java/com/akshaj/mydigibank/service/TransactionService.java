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

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepo;

    @Autowired
    private AccountRepository accountRepo;

    public Optional<Transaction> recordTransaction(Transaction transaction) {
        Optional<Account> accountOpt = accountRepo.findById(transaction.getAccountId());

        if (accountOpt.isEmpty()) return Optional.empty();

        Account account = accountOpt.get();
        double amount = transaction.getAmount();

        if (transaction.getTransactionType().equalsIgnoreCase("Debit")) {
            if (account.getBalance() < amount) return Optional.empty(); // only for debit
            account.setBalance(account.getBalance() - amount);
        } else if (transaction.getTransactionType().equalsIgnoreCase("Credit")) {
            account.setBalance(account.getBalance() + amount); // credit = add, no check
        } else {
            return Optional.empty(); // unknown type
        }

        accountRepo.save(account);
        transaction.setTransactionId(UUID.randomUUID().toString());
        transaction.setDateOfTransaction(LocalDate.now());
        Transaction saved = transactionRepo.save(transaction);
        return Optional.of(saved);
    }

    public List<Transaction> getTransactionsForAccount(String accountId) {
        return transactionRepo.findByAccountId(accountId);
    }
}