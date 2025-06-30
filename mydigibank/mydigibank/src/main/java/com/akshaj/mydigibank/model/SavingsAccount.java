package com.akshaj.mydigibank.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@DiscriminatorValue("Savings")
@Getter @Setter
public class SavingsAccount extends Account {

    private double interestRate = 3.0;   // default

    public SavingsAccount() { super(); }
}