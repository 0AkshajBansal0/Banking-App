package com.akshaj.mydigibank.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Account {

    @Id
    private String accountId;  // Unique identifier for the account

    @NotBlank(message = "Name is required")
    private String accountHolderName;  // Full name of the account holder

    @NotBlank(message = "Account type is required")
    private String accountType;  // Type of account (Savings, Checking)

    @PositiveOrZero(message = "Balance cannot be negative")
    private double balance;  // Initial or current balance in the account

    private LocalDate dateOfCreation;  // Date when the account was created (set during creation)

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;  // Email address of the account holder

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Invalid Phone Number")
    private String phoneNumber;  // 10-digit phone number of the customer

    @NotBlank(message = "IFSC code is required")
    @Pattern(regexp = "^[A-Z]{4}0[A-Z0-9]{6}$", message = "Invalid IFSC format")
    private String ifsc;  // Branch IFSC code (used for identifying bank branch)

    @NotBlank(message = "Status is required")
    private String status;  // Account status (Active, Closed, or Frozen)
}