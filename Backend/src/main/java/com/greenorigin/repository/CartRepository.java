package com.greenorigin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.greenorigin.entity.CartItem;

public interface CartRepository extends JpaRepository<CartItem, Long> {
	
	

}
