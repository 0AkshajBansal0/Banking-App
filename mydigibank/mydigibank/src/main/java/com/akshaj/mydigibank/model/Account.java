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
    private String accountId;  // Unique ID (UUID)

    @NotBlank(message = "Name is required")
    private String accountHolderName;  // Customer's name

    @NotBlank(message = "Account type is required")
    private String accountType;  // "Savings" / "Checking"

    @PositiveOrZero(message = "Balance cannot be negative")
    private double balance;  // Initial balance (>= 0)

    private LocalDate dateOfCreation;  // When account was created

    @Email
    @NotBlank
    private String email;  // Valid email

    @NotBlank
    @Pattern(regexp = "^[0-9]{10}$")
    private String phoneNumber;  // 10-digit phone

    @NotBlank
    @Pattern(regexp = "^[A-Z]{4}0[A-Z0-9]{6}$")
    private String ifsc;  // IFSC code format

    @NotBlank
    private String status;  // Active / Closed / Frozen

}