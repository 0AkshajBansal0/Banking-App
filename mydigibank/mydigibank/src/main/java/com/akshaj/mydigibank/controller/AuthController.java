package com.akshaj.mydigibank.controller;

import com.akshaj.mydigibank.service.AuthService;
import com.akshaj.mydigibank.service.GoogleTranslateService;

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

    @Autowired
    private GoogleTranslateService translateService;

    @Data
    private static class LoginRequest {
        private String username;
        private String password;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest req,
                                        @RequestParam(defaultValue = "en") String lang) {
        boolean ok = authService.authenticate(req.getUsername(), req.getPassword());
        if (ok)
            return ResponseEntity.ok(translateService.translate("Login successful", lang));
        else
            return ResponseEntity.status(401).body(translateService.translate("Invalid credentials", lang));
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody LoginRequest req,
                                         @RequestParam(defaultValue = "en") String lang) {
        boolean exists = authService.userExists(req.getUsername());

        if (exists)
            return ResponseEntity.badRequest().body(translateService.translate("Username already exists", lang));

        authService.createUser(req.getUsername(), req.getPassword());
        return ResponseEntity.ok(translateService.translate("Signup successful", lang));
    }
}
