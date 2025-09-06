package com.greenorigin.service;

import java.util.List;

import com.greenorigin.entity.Order;

public interface OrderService {
	
	Order placeOrder(Order order);
    Order getOrderById(Long id);
    List<Order> getAllOrders();
    Order updateOrder(Long id, Order order);
    void deleteOrder(Long id);


}
