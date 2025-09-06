package com.greenorigin.service.imp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.greenorigin.entity.User;
import com.greenorigin.exception.ResourceNotFoundException;
import com.greenorigin.repository.UserRepository;
import com.greenorigin.service.UserService;

@Service

public class UserServiceImpl implements UserService {
	
	@Autowired
    private UserRepository repo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;


	@Override
	public User createUser(User user) {
	    user.setPassword(passwordEncoder.encode(user.getPassword()));
	    user.setRole("user"); // optional default
		return repo.save(user);
	}

	@Override
	public List<User> getAllUsers() {
		// TODO Auto-generated method stub
		return repo.findAll();

	}

	@Override
	public User getUserById(Long id) {
		// TODO Auto-generated method stub
		return  repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));
	}

	@Override
	public User updateUser(Long id, User user) {
		User existing = getUserById(id);
	    existing.setName(user.getName());
	    existing.setEmail(user.getEmail());
	    existing.setPassword(user.getPassword());
	    existing.setRole(user.getRole());
		return  repo.save(existing);

	}

	@Override
	public void deleteUser(Long id) {
		User user = getUserById(id);
        repo.delete(user);		
	}

	@Override
	public User login(String email, String password) {
		 User user = repo.findByEmail(email)
			        .orElseThrow(() -> new RuntimeException("User not found"));

			    System.out.println("Login email: " + email);
			    System.out.println("Plain password: " + password);
			    System.out.println("Stored hashed password: " + user.getPassword());

			    if (!passwordEncoder.matches(password, user.getPassword())) {
			        throw new RuntimeException("Invalid credentials");
			    }

			    return user;
			
	}


}
