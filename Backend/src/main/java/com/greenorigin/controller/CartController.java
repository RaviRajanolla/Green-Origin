package com.greenorigin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.greenorigin.entity.CartItem;
import com.greenorigin.service.CartService;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class CartController {
	
	  @Autowired
	    private CartService cartService;

	    @PostMapping("/add")
	    public CartItem addToCart(@RequestBody CartItem cartItem) {
	        return cartService.addToCart(cartItem);
	    }

}
