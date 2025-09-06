import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { productAPI, BackendProduct, Category } from '../../services/api';
import { Button } from '../shared/Button';

interface ProductFormProps {
  product?: BackendProduct | null;
  categories: Category[];
  onSave: (newProduct?: BackendProduct) => void;
  onCancel: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  product,
  categories,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    category: '',
    stockQuantity: 0,
    available: true,
    organic: false,
    isFeatured: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        category: product.category,
        stockQuantity: product.stockQuantity,
        available: product.available,
        organic: product.organic,
        isFeatured: product.isFeatured
      });
    }
  }, [product]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : type === 'number'
          ? parseFloat(value) || 0
          : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Map frontend isFeatured -> backend featured
      const payload = {
        ...formData,
        featured: formData.isFeatured
      };
      delete (payload as any).isFeatured;

      let savedProduct: BackendProduct;
      if (product) {
        savedProduct = await productAPI.updateProduct(product.id, payload);
      } else {
        savedProduct = await productAPI.createProduct(payload);
      }

      onSave(savedProduct);
    } catch (error) {
      console.error('Failed to save product:', error);
      setError('Failed to save product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea
              name="description"
              required
              rows={3}
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Price and Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹) *</label>
              <input
                type="number"
                name="price"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity *</label>
              <input
                type="number"
                name="stockQuantity"
                required
                min="0"
                value={formData.stockQuantity}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <select
              name="category"
              required
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select a category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Image URL + Preview */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL *</label>
            <input
              type="url"
              name="imageUrl"
              required
              value={formData.imageUrl}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />

            {formData.imageUrl && (
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-1">Preview:</p>
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="w-48 h-48 object-contain border rounded-lg shadow"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://via.placeholder.com/200x200.png?text=Invalid+URL';
                  }}
                />
              </div>
            )}
          </div>

          {/* Checkboxes */}
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="available"
                checked={formData.available}
                onChange={handleInputChange}
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="ml-2 text-sm text-gray-700">Available for purchase</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="organic"
                checked={formData.organic}
                onChange={handleInputChange}
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="ml-2 text-sm text-gray-700">Organic product</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleInputChange}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Featured product</span>
            </label>
          </div>

          {/* Form Actions */}
          <div className="flex space-x-4 pt-6 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" isLoading={isLoading} className="flex-1 bg-green-600 hover:bg-green-700">
              {product ? 'Update Product' : 'Add Product'}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
