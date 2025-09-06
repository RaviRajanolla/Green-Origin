import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { CheckoutForm } from '../components/checkout/CheckoutForm';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/shared/Button';

export const Checkout: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8 text-center"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Login Required</h2>
            <p className="text-gray-600 mb-6">
              Please log in to your account to proceed with checkout.
            </p>
            <div className="space-y-4">
              <Link to="/login" className="block">
                <Button className="w-full">Login to Continue</Button>
              </Link>
              <Link to="/cart" className="block">
                <Button variant="outline" className="w-full">Back to Cart</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link 
            to="/cart"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Cart
          </Link>
        </motion.div>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center"
      >
        Checkout
      </motion.h1>

      <CheckoutForm />
    </div>
  );
};