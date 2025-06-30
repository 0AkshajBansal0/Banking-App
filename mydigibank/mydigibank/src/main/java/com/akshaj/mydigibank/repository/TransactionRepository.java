package com.akshaj.mydigibank.repository;

import com.akshaj.mydigibank.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, String> {
    // To get all transactions of a specific account
    List<Transaction> findByAccountId(String accountId);
}