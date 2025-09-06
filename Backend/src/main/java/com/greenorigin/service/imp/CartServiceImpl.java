package com.greenorigin.service.imp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.greenorigin.entity.CartItem;
import com.greenorigin.repository.CartRepository;
import com.greenorigin.service.CartService;

@Service

public class CartServiceImpl implements CartService {
	
	@Autowired
    private CartRepository cartRepository;

	@Override
	public CartItem addToCart(CartItem cartItem) {
		// TODO Auto-generated method stub
		return cartRepository.save(cartItem);

	}


}
