package com.greenorigin.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.greenorigin.entity.Order;
import com.greenorigin.service.OrderService;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(originPatterns = "http://localhost:5173", allowCredentials = "true")
public class OrderController {
	
	@Autowired
    private final OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
    }
    
    
    @PostMapping
    public ResponseEntity<?> placeOrder(@RequestBody Order order) {
        try {
            Order savedOrder = service.placeOrder(order);

            return ResponseEntity.ok().body(
                Map.of(
                    "success", true,
                    "orderId", savedOrder.getId()
                )
            );
        } catch (Exception e) {
            e.printStackTrace(); // Optional: for debugging
            return ResponseEntity
                    .status(500)
                    .body(Map.of(
                        "success", false,
                        "message", "Order failed. Please try again."
                    ));
        }
    }

   
//    @PostMapping
//    public Order placeOrder(@RequestBody Order order) {
//    	
//        System.out.println("Incoming order: " + order);
//
//        return service.placeOrder(order);
//    }

    @GetMapping
    public List<Order> getAllOrders() {
        return service.getAllOrders();
    }

    @GetMapping("/{id}")
    public Order getOrder(@PathVariable Long id) {
        return service.getOrderById(id);
    }

    @PutMapping("/{id}")
    public Order updateOrder(@PathVariable Long id, @RequestBody Order order) {
        return service.updateOrder(id, order);
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id) {
        service.deleteOrder(id);
    }

}
