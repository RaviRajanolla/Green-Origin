package com.greenorigin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.greenorigin.service.UserService;

@CrossOrigin(originPatterns = "http://localhost:5173", allowCredentials = "true")

@RestController
@RequestMapping("/api/users")
public class UserController {
	
	@Autowired
    private UserService service;

    @PostMapping("/register")
    public User createUser(@RequestBody User user) {
        return service.createUser(user);
    }

    @PostMapping("/login")
    public User loginUser(@RequestBody User user) {
        return service.login(user.getEmail(), user.getPassword());
    }

    @GetMapping
    public List<User> getAll() {
        return service.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getById(@PathVariable Long id) {
        return service.getUserById(id);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return service.updateUser(id, user);
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        service.deleteUser(id);
        return "User deleted successfully";
    }


}
