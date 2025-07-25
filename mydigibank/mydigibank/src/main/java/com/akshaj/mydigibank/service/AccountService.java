package com.akshaj.mydigibank.service;

import com.akshaj.mydigibank.model.Account;
import com.akshaj.mydigibank.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepo;

    // Account create karna
    public Account createAccount(Account account) {
        account.setAccountId(UUID.randomUUID().toString()); // Unique ID
        account.setDateOfCreation(LocalDate.now()); // Current date
        account.setStatus("Active"); // Default status
        return accountRepo.save(account); // Save to DB
    }

    // Account fetch by ID
    public Optional<Account> getAccountById(String id) {
        return accountRepo.findById(id);
    }

    // Account soft delete (status = Closed)
    public void closeAccount(String id) {
        accountRepo.findById(id).ifPresent(account -> {
            account.setStatus("Closed");
            accountRepo.save(account);
        });
    }

    public Optional<Account> updateAccount(String id, Account updatedData) {
        return accountRepo.findById(id).map(existing -> {
            existing.setAccountHolderName(updatedData.getAccountHolderName());
            existing.setAccountType(updatedData.getAccountType());
            existing.setBalance(updatedData.getBalance());
            existing.setEmail(updatedData.getEmail());
            existing.setPhoneNumber(updatedData.getPhoneNumber());
            existing.setIfsc(updatedData.getIfsc());
            existing.setStatus(updatedData.getStatus());
            return accountRepo.save(existing);
        });
    }

    public List<Account> getAllAccounts() {
        return accountRepo.findAll();
    }

}