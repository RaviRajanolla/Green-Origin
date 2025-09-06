package com.greenorigin.service;

import java.util.List;

import com.greenorigin.entity.Product;

public interface ProductService {
	
	 Product createProduct(Product product);
	    Product updateProduct(Long id, Product product);
	    void deleteProduct(Long id);
	    Product getProductById(Long id);
	    List<Product> getAllProducts();


}
