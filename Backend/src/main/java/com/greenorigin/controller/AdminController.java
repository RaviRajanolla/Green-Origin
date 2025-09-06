package com.greenorigin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.greenorigin.entity.User;
import com.greenorigin.repository.UserRepository;
import com.greenorigin.service.UserService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(originPatterns = "http://localhost:5173", allowCredentials = "true")
public class AdminController {
	
    @Autowired
    private UserService userService;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;


    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    @PutMapping("/users/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }
    
    
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerAdmin(@RequestBody User admin) {
        Map<String, Object> response = new HashMap<>();

        if (userRepository.findByEmail(admin.getEmail()).isPresent()) {
            response.put("success", false);
            response.put("message", "Email already exists");
            return ResponseEntity.badRequest().body(response);
        }

        admin.setRole("admin");
        admin.setPassword(passwordEncoder.encode(admin.getPassword())); // hash here
        userRepository.save(admin);

        response.put("success", true);
        response.put("message", "Admin registered successfully");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginAdmin(@RequestBody Map<String, String> loginRequest) {
        Map<String, Object> response = new HashMap<>();
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        return userRepository.findByEmail(email)
                .filter(user -> passwordEncoder.matches(password, user.getPassword()) && "admin".equals(user.getRole()))
                .map(user -> {
                    response.put("success", true);
                    response.put("message", "Login successful");
                    response.put("data", user);
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    response.put("success", false);
                    response.put("message", "Invalid credentials");
                    return ResponseEntity.status(401).body(response);
                });
    }

}


