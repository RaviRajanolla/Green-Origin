package com.greenorigin.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.greenorigin.entity.User;
import com.greenorigin.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(originPatterns = "http://localhost:5173", allowCredentials = "true")
		  
public class AuthController {
	
    @Autowired
    private UserService userService;

    // ✅ Register a new user with wrapped response
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody User user) {
        User savedUser = userService.createUser(user);

        Map<String, Object> response = new HashMap<>();
        response.put("data", savedUser);
        response.put("success", true);
        response.put("message", "User registered successfully");

        return ResponseEntity.ok(response);
    }

    // ✅ Login user with JSON request body
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        User user = userService.login(email, password);

        Map<String, Object> response = new HashMap<>();
        response.put("data", user);
        response.put("success", true);
        response.put("message", "Login successful");

        return ResponseEntity.ok(response);
    }
}
