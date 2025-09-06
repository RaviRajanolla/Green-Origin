package com.greenorigin.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Product {
	
	  @Id @GeneratedValue
	  private Long id;

	    private String name;
	    private String description;
	    private Double price;

	    private String imageUrl;
	    private String category;

	    private boolean organic;
	    private boolean available;
	    private int stockQuantity;
	    
	    private boolean isFeatured;
	    
	  
	
	

}
