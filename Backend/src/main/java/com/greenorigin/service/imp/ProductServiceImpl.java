package com.greenorigin.service.imp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.greenorigin.entity.Product;
import com.greenorigin.exception.ResourceNotFoundException;
import com.greenorigin.repository.ProductRepository;
import com.greenorigin.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {
	
	 @Autowired
	  private ProductRepository repo;

	@Override
	public Product createProduct(Product product) {
		// TODO Auto-generated method stub
		return repo.save(product);

	}

	@Override
	public Product updateProduct(Long id, Product product) {
		 Product existing = getProductById(id);
	        existing.setName(product.getName());
	        existing.setDescription(product.getDescription());
	        existing.setPrice(product.getPrice());
	        existing.setCategory(product.getCategory());
	        existing.setImageUrl(product.getImageUrl());
	        existing.setStockQuantity(product.getStockQuantity());
	        existing.setAvailable(product.isAvailable());
	        existing.setOrganic(product.isOrganic());
		return repo.save(existing);

	}

	@Override
	public void deleteProduct(Long id) {
		Product p = getProductById(id);
        repo.delete(p);			
	}

	@Override
	public Product getProductById(Long id) {
		// TODO Auto-generated method stub
		return  repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

	}

	@Override
	public List<Product> getAllProducts() {
		// TODO Auto-generated method stub
		return repo.findAll();

	}


}
