package com.greenorigin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.greenorigin.entity.Product;
import com.greenorigin.service.ProductService;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class ProductController {
	
	 @Autowired
	    private ProductService productService;

	    @PostMapping
	    public ResponseEntity<Product> create(@RequestBody Product product) {
	        return new ResponseEntity<>(productService.createProduct(product), HttpStatus.CREATED);
	    }
	    
	    @PostMapping("/batch")
	    public ResponseEntity<List<Product>> createMultiple(@RequestBody List<Product> products) {
	        List<Product> savedProducts = products.stream()
	            .map(productService::createProduct)
	            .toList();
	        return new ResponseEntity<>(savedProducts, HttpStatus.CREATED);
	    }


	    @GetMapping
	    public ResponseEntity<List<Product>> getAll() {
	        return ResponseEntity.ok(productService.getAllProducts());
	    }

	    @GetMapping("/{id}")
	    public ResponseEntity<Product> get(@PathVariable Long id) {
	        return ResponseEntity.ok(productService.getProductById(id));
	    }

	    @PutMapping("/{id}")
	    public ResponseEntity<Product> update(@PathVariable Long id, @RequestBody Product p) {
	        return ResponseEntity.ok(productService.updateProduct(id, p));
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<?> delete(@PathVariable Long id) {
	        productService.deleteProduct(id);
	        return ResponseEntity.ok().build();
	    }

}
