import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Category } from '../../services/api';
import { Button } from '../shared/Button';

interface ProductFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  categories: Category[];
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  showFilters,
  setShowFilters,
  categories
}) => {
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setPriceRange([0, 1000]);
  };

  const hasActiveFilters = searchQuery || selectedCategory || priceRange[0] > 0 || priceRange[1] < 1000;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
        {hasActiveFilters && (
          <Button variant="ghost" onClick={clearFilters} className="flex items-center gap-2">
            <X className="h-4 w-4" />
            Clear All
          </Button>
        )}
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="space-y-6 border-t border-gray-200 pt-6">
          {/* Categories */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value=""
                  checked={selectedCategory === ''}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="text-purple-600 focus:ring-purple-500"
                />
                <span className="ml-2 text-gray-700">All Categories</span>
              </label>
              {categories.map(category => (
                <label key={category.id} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value={category.name}
                    checked={selectedCategory === category.name}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="text-purple-600 focus:ring-purple-500"
                  />
                  <span className="ml-2 text-gray-700">{category.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <label className="block text-sm text-gray-600 mb-1">Min</label>
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    min={0}
                    max={1000}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-gray-600 mb-1">Max</label>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 1000])}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    min={0}
                    max={1000}
                  />
                </div>
              </div>
              <div className="text-sm text-gray-600">
                Showing products: ₹{priceRange[0]} - ₹{priceRange[1]}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
