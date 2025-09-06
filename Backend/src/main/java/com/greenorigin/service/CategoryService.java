package com.greenorigin.service;

import java.util.List;

import com.greenorigin.entity.Category;

public interface CategoryService {
	
	Category createCategory(Category category);
    List<Category> getAllCategories();
    Category getCategoryById(Long id);
    Category updateCategory(Long id, Category category);
    void deleteCategory(Long id);


}
