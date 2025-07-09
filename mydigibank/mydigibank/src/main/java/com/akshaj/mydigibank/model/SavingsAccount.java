package com.akshaj.mydigibank.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@DiscriminatorValue("Savings")
@Getter @Setter
@NoArgsConstructor
public class SavingsAccount extends Account {
    private double interestRate = 3.0;
}
