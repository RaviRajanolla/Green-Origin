package com.greenorigin.service.imp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.greenorigin.entity.Category;
import com.greenorigin.exception.ResourceNotFoundException;
import com.greenorigin.repository.CategoryRepository;
import com.greenorigin.service.CategoryService;

@Service

public class CategoryServiceImpl implements CategoryService  {
	
	@Autowired
    private CategoryRepository categoryRepository;

	@Override
	public Category createCategory(Category category) {
		// TODO Auto-generated method stub
		return categoryRepository.save(category);

	}

	@Override
	public List<Category> getAllCategories() {
		// TODO Auto-generated method stub
		return  categoryRepository.findAll();

	}

	@Override
	public Category getCategoryById(Long id) {
		// TODO Auto-generated method stub
		return  categoryRepository.findById(id)
	            .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));

	}

	@Override
	public Category updateCategory(Long id, Category category) {
		 Category existing = getCategoryById(id);
	        existing.setName(category.getName());
		return categoryRepository.save(existing);

	}

	@Override
	public void deleteCategory(Long id) {
		Category existing = getCategoryById(id);
        categoryRepository.delete(existing);		
	}


}
