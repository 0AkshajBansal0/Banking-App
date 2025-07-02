package com.akshaj.mydigibank.controller;

import com.akshaj.mydigibank.service.AuthService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest req) {
        boolean ok = authService.authenticate(req.getUsername(), req.getPassword());
        if (ok)
            return ResponseEntity.ok("Login successful");
        else
            return ResponseEntity.status(401).body("Invalid credentials");
    }

    @Data
    private static class LoginRequest {
        private String username;
        private String password;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody LoginRequest req) {
        boolean exists = authService.userExists(req.getUsername());

        if (exists)
            return ResponseEntity.badRequest().body("Username already exists");

        authService.createUser(req.getUsername(), req.getPassword());
        return ResponseEntity.ok("Signup successful");
    }
}