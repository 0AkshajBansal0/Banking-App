package com.akshaj.mydigibank.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@DiscriminatorValue("Checking")
@Getter @Setter
@NoArgsConstructor
public class CheckingAccount extends Account {
    private double overdraftLimit = 50000.0;
}
