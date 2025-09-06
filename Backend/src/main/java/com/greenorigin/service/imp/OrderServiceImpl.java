package com.greenorigin.service.imp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.greenorigin.entity.Order;
import com.greenorigin.repository.OrderRepository;
import com.greenorigin.service.OrderService;

@Service
public class OrderServiceImpl implements OrderService {
	
	 @Autowired
	    private OrderRepository orderRepository;

	@Override
	public Order placeOrder(Order order) {
        order.setStatus("PLACED"); // optional default status
		return orderRepository.save(order);

	}

	@Override
	public Order getOrderById(Long id) {
		// TODO Auto-generated method stub
		return  orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
	}

	@Override
	public List<Order> getAllOrders() {
		// TODO Auto-generated method stub
		return  orderRepository.findAll();

	}

	@Override
	public Order updateOrder(Long id, Order order) {
		Order existing = getOrderById(id);
	    existing.setCustomerName(order.getCustomerName());
	    existing.setAddress(order.getAddress());
	    existing.setStatus(order.getStatus());
	    existing.setTotalAmount(order.getTotalAmount());
		return orderRepository.save(existing);

	}

	@Override
	public void deleteOrder(Long id) {
		Order existing = getOrderById(id);
        orderRepository.delete(existing);		
	}


}
