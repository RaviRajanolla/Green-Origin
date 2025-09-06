import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';
import { Button } from '../shared/Button';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(item.product.id);
    } else {
      updateQuantity(item.product.id, newQuantity);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg shadow-sm border border-gray-100 p-4"
    >
      <div className="flex items-center space-x-4">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-20 h-20 object-cover rounded-lg"
        />
        
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{item.product.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{item.product.weight}</p>
          <p className="text-lg font-bold text-purple-600">₹{item.product.price}</p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Quantity Controls */}
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="p-2 hover:bg-gray-100 transition-colors duration-200"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-3 py-2 font-semibold">{item.quantity}</span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="p-2 hover:bg-gray-100 transition-colors duration-200"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {/* Remove Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeFromCart(item.product.id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};