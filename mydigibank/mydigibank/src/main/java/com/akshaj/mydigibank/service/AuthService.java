package com.akshaj.mydigibank.service;

import com.akshaj.mydigibank.repository.UserRepository;
import com.akshaj.mydigibank.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepo;

    public boolean authenticate(String username, String password) {
        return userRepo.findById(username)
                .filter(u -> u.getPassword().equals(password))
                .isPresent();
    }

    public boolean userExists(String username) {
        return userRepo.existsById(username);
    }

    public void createUser(String username, String password) {
        userRepo.save(new User(username, password));
    }

}