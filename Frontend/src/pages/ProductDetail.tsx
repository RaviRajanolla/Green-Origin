import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Minus,
  Plus,
  Shield,
  Truck,
  RefreshCw,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { productAPI, BackendProduct } from '../services/api';
import { Product } from '../types';
import { Button } from '../components/shared/Button';
import { Badge } from '../components/shared/Badge';
import { useCart } from '../context/CartContext';

// Map category to weight
const categoryWeightMap: Record<string, string> = {
  fruits: '1kg',
  vegetables: '500g',
  'milk & dairy': '/pack',
  'grains & pulses': '1kg',
  herbs: '100g',
  'organic eggs': '15/egg',
  'natural sweetners': '/kg',
  'natural kitchen oils': '1/L',
  beverages: '300ml',
  'spices & masalas': '500g',
  'leafy greens': '500g',
};

const convertBackendProduct = (backendProduct: BackendProduct): Product => {
  const categoryKey = backendProduct.category.toLowerCase();
  const weight = categoryWeightMap[categoryKey] || '';
  return {
    id: backendProduct.id.toString(),
    name: backendProduct.name,
    price: backendProduct.price,
    image: backendProduct.imageUrl,
    category: categoryKey,
    weight,
    description: backendProduct.description,
    features: ['Premium Quality', 'Farm Fresh', 'Naturally Grown', 'Chemical Free'],
    certifications: backendProduct.organic ? ['USDA Organic', 'Non-GMO'] : ['Non-GMO'],
    rating: 4.5,
    reviews: Math.floor(Math.random() * 200) + 50,
    isNew: backendProduct.featured || false,
    isOrganic: backendProduct.organic,
    inStock: backendProduct.available && backendProduct.stockQuantity > 0,
  };
};

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        const backendProduct = await productAPI.getProductById(parseInt(id));
        if (!backendProduct) {
          setError('Product not found.');
          return;
        }
        setProduct(convertBackendProduct(backendProduct));
      } catch (err) {
        console.error(err);
        setError('Failed to load product.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) addToCart(product, quantity);
  };

  // Loading Skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
            <div className="bg-gray-300 rounded-2xl h-96 lg:h-[500px]"></div>
            <div className="space-y-6">
              <div className="h-8 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-6 bg-gray-300 rounded w-1/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error Page
  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{error || 'Product Not Found'}</h1>
          <Link to="/collections">
            <Button>Back to Collections</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Main Product Detail
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <Link
            to="/collections"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Collections
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-96 lg:h-[500px] object-cover" />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {product.isNew && <Badge variant="info">New</Badge>}
                {product.isOrganic && <Badge variant="success">Organic</Badge>}
              </div>
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

            {/* Ratings */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                ))}
              </div>
              <span className="text-gray-600">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-4 mb-6">
              <span className="text-3xl font-bold text-purple-600">₹{product.price}</span>
              <span className="text-lg text-gray-600">per {product.weight}</span>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Certifications</h3>
              <div className="flex flex-wrap gap-2">
                {product.certifications.map((cert, index) => (
                  <Badge key={index} variant="success">{cert}</Badge>
                ))}
              </div>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-gray-100 transition-colors duration-200">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-3 font-semibold">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-gray-100 transition-colors duration-200">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <Button onClick={handleAddToCart} disabled={!product.inStock} className="w-full" size="lg">
                <ShoppingCart className="h-5 w-5 mr-2" />
                {product.inStock ? `Add ${quantity} to Cart - ₹${product.price * quantity}` : 'Out of Stock'}
              </Button>
            </div>

            {/* Extra Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Shield className="h-5 w-5 text-green-600" />
                <span>Quality Guaranteed</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Truck className="h-5 w-5 text-blue-600" />
                <span>Free Delivery ₹500+</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <RefreshCw className="h-5 w-5 text-purple-600" />
                <span>7-Day Returns</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
