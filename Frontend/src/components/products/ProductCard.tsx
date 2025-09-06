import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '../../types';
import { Badge } from '../shared/Badge';
import { Button } from '../shared/Button';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
    >
      <Link to={`/products/${product.id}`}>
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {product.isNew && <Badge variant="info">New</Badge>}
            {product.isOrganic && <Badge variant="success">Organic</Badge>}
            {product.originalPrice && (
              <Badge variant="warning">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% Off
              </Badge>
            )}
          </div>

          {/* Stock Status */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">Out of Stock</span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2">
            {product.name}
          </h3>
          
          <div className="flex items-center space-x-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({product.reviews})</span>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-purple-600">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
              )}
            </div>
            <span className="text-sm text-gray-600">{product.weight}</span>
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </Link>
    </motion.div>
  );
};