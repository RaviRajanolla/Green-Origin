import React, { useState } from 'react';
import { Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { Button } from '../shared/Button';

export const CartSummary: React.FC = () => {
  const { totalPrice, totalItems } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  
  const deliveryFee = totalPrice > 500 ? 0 : 50;
  const finalTotal = totalPrice - discount + deliveryFee;

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === 'welcome10') {
      setDiscount(totalPrice * 0.1);
    } else if (couponCode.toLowerCase() === 'organic20') {
      setDiscount(totalPrice * 0.2);
    } else {
      alert('Invalid coupon code');
    }
  };

  if (totalItems === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Your cart is empty</h3>
        <p className="text-gray-600 mb-6">Add some organic goodness to your cart!</p>
        <Link to="/collections">
          <Button>Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24"
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h3>
      
      {/* Coupon Code */}
      <div className="mb-6">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <Button variant="outline" onClick={applyCoupon}>
            Apply
          </Button>
        </div>
        {discount > 0 && (
          <p className="text-green-600 text-sm mt-2">
            Coupon applied! You saved ₹{discount.toFixed(0)}
          </p>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({totalItems} items)</span>
          <span>₹{totalPrice}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-₹{discount.toFixed(0)}</span>
          </div>
        )}
        
        <div className="flex justify-between text-gray-600">
          <span>Delivery Fee</span>
          <span>{deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}</span>
        </div>
        
        {deliveryFee === 0 && (
          <p className="text-green-600 text-sm">🎉 Free delivery on orders above ₹500!</p>
        )}
        
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between text-lg font-semibold text-gray-900">
            <span>Total</span>
            <span>₹{finalTotal.toFixed(0)}</span>
          </div>
        </div>
      </div>

      <Link to="/checkout" className="block">
        <Button className="w-full" size="lg">
          Proceed to Checkout
        </Button>
      </Link>
    </motion.div>
  );
};