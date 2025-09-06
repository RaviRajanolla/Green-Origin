package com.greenorigin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.greenorigin.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long>{
	
	

}
