package com.akshaj.mydigibank.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DebitCreditDTO {

    @Positive
    private double amount;

    @NotBlank
    private String description;

    @NotBlank
    private String currency; // e.g., INR, USD, etc..

    @NotBlank
private String lang; // new field

}