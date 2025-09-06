import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartItem } from '../components/cart/CartItem';
import { CartSummary } from '../components/cart/CartSummary';
import { useCart } from '../context/CartContext';

export const Cart: React.FC = () => {
  const { items } = useCart();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link 
            to="/collections"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Continue Shopping
          </Link>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8"
        >
          Shopping Cart
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <AnimatePresence>
              {items.length > 0 ? (
                <div className="space-y-4">
                  {items.map(item => (
                    <CartItem key={item.product.id} item={item} />
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Your cart is empty</h3>
                  <p className="text-gray-600 mb-6">Add some organic goodness to your cart!</p>
                  <Link to="/collections">
                    <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200">
                      Start Shopping
                    </button>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
};