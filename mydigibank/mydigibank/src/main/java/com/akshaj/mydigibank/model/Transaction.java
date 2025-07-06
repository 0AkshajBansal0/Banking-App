package com.akshaj.mydigibank.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transaction {

    @Id
    private String transactionId;

    @NotBlank(message = "Account ID is required")
    private String accountId;

    @NotBlank(message = "Transaction type is required")
    @Pattern(regexp = "^(Debit|Credit)$", message = "Transaction type must be Debit or Credit")
    private String transactionType;

    @Positive(message = "Amount must be positive")
    private double amount;

    private LocalDate dateOfTransaction;
    @Column(name = "time_of_transaction")
    private LocalTime timeOfTransaction;

    @NotBlank(message = "Description is required")
    private String description;
}