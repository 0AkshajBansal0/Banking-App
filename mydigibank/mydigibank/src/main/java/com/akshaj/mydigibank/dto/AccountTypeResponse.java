package com.akshaj.mydigibank.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AccountTypeResponse {
    private String type;
    private Double interestRate;
    private Double overdraftLimit;
}