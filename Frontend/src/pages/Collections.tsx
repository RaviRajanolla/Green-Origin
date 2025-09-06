import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProductList } from '../components/products/ProductList';
import { ProductFilters } from '../components/products/ProductFilters';
import { productAPI, categoryAPI, BackendProduct, Category } from '../services/api';
import { Product } from '../types';
import { Button } from '../components/shared/Button';

const categoryWeightMap: Record<string, string> = {
  fruits: '1kg',
  vegetables: '500g',
  'milk & dairy': '/pack',
  'grains & pulses': '1kg',
  herbs: '100g',
  'natural sweetners': 'kg',
  beverages: '300ml',
  'spices & masalas': '500g',
  'leafy greens': '500g',
  'natural kitchen oils': '1/L',
  'hampers & flowers': '', // add weight if needed
};

// Convert backend product and normalize categories
const convertBackendProduct = (backendProduct: BackendProduct): Product => {
  let categoryKey = backendProduct.category.toLowerCase().trim();

  // Normalize Hampers & Flowers
  if (['hampers', 'flowers', 'hampers & flowers'].includes(categoryKey)) {
    categoryKey = 'hampers & flowers';
  }

  return {
    id: backendProduct.id.toString(),
    name: backendProduct.name.trim(),
    price: backendProduct.price,
    image: backendProduct.imageUrl,
    category: categoryKey,
    weight: categoryWeightMap[categoryKey] || '',
    description: backendProduct.description,
    features: [],
    certifications: backendProduct.organic ? ['USDA Organic'] : [],
    rating: 4.5,
    reviews: Math.floor(Math.random() * 200) + 50,
    isNew: false,
    isOrganic: backendProduct.organic,
    inStock: backendProduct.available && backendProduct.stockQuantity > 0,
  };
};

const ALPHABETS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const Collections: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [backendProducts, backendCategories] = await Promise.all([
          productAPI.getAllProducts(),
          categoryAPI.getAllCategories(),
        ]);

        const convertedProducts = backendProducts
          .map(convertBackendProduct)
          .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

        setProducts(convertedProducts);

        // Normalize categories for filter
        const normalizedCategories = backendCategories.map((cat) => {
          const name = cat.name.toLowerCase().trim();
          if (['hampers', 'flowers', 'hampers & flowers'].includes(name)) {
            return { ...cat, name: 'Hampers & Flowers' };
          }
          return cat;
        });

        setCategories(normalizedCategories);
      } catch (error) {
        console.error(error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        !selectedCategory ||
        product.category === selectedCategory.toLowerCase().trim();

      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      const matchesLetter =
        !activeLetter || product.name.toUpperCase().startsWith(activeLetter);

      return matchesSearch && matchesCategory && matchesPrice && matchesLetter;
    });
  }, [searchQuery, selectedCategory, priceRange, activeLetter, products]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* A→Z Vertical Bar */}
      <motion.div
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed inset-y-0 right-0 flex items-center z-50"
      >
        <motion.div
          initial={{ opacity: 0.3 }}
          whileHover={{ opacity: 1 }}
          className="bg-white rounded-l-2xl px-1 py-4 shadow-xl flex flex-col items-center cursor-pointer overflow-y-auto max-h-[70vh]"
        >
          {ALPHABETS.map((letter) => (
            <motion.div
              key={letter}
              onClick={() => setActiveLetter(letter)}
              whileHover={{ scale: 1.3, color: '#2563EB' }}
              className={`text-xs font-bold my-1 flex items-center justify-center w-6 h-6 rounded-full ${
                activeLetter === letter ? 'bg-blue-500 text-white shadow-md' : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              {letter}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Collections</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated selection of premium organic products
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ProductFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              showFilters={true}
              setShowFilters={() => {}}
              categories={categories}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                {isLoading ? 'Loading...' : `Showing ${filteredProducts.length} of ${products.length} products`}
              </p>
              {activeLetter && (
                <Button variant="outline" onClick={() => setActiveLetter(null)}>
                  Clear Letter
                </Button>
              )}
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 animate-pulse">
                    <div className="h-48 bg-gray-300 rounded-t-xl"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
                      <div className="h-8 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                <ProductList products={filteredProducts} showAll={true} />
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('');
                    setPriceRange([0, 1000]);
                    setActiveLetter(null);
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
