package com.greenorigin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.greenorigin.entity.Category;
import com.greenorigin.service.CategoryService;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin
public class CategoryController {
	
	
    @Autowired
    private CategoryService service;

    @PostMapping
    public Category createCategory(@RequestBody Category category) {
        return service.createCategory(category);
    }

    @GetMapping
    public List<Category> getAll() {
        return service.getAllCategories();
    }

    @GetMapping("/{id}")
    public Category getById(@PathVariable Long id) {
        return service.getCategoryById(id);
    }

    @PutMapping("/{id}")
    public Category update(@PathVariable Long id, @RequestBody Category category) {
        return service.updateCategory(id, category);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteCategory(id);
    }
}
