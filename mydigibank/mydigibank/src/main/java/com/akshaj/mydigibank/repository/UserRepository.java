package com.akshaj.mydigibank.repository;

import com.akshaj.mydigibank.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {

}