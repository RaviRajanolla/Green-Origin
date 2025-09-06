import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckoutFormData } from '../../types';
import { Button } from '../shared/Button';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { orderAPI } from '../../services/api';

export const CheckoutForm: React.FC = () => {
  const navigate = useNavigate();
  const { totalPrice, totalItems, clearCart } = useCart();
  const { user } = useAuth();

  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'upi'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    setError('');

    try {
      const deliveryFee = totalPrice > 500 ? 0 : 50;
      const finalTotal = totalPrice + deliveryFee;
      const shippingAddress = `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`;

      const orderData = {
        userId: user.id,
        cartItemIds: [], // TODO: integrate real cart items when backend supports it
        totalAmount: finalTotal,
        shippingAddress
      };

      const order = await orderAPI.placeOrder(orderData);

      // Safely derive an ID (handles API shapes like {id} or {data: {id}})
      const orderId =
        (order && (order.id || order.orderId)) ||
        (order?.data && (order.data.id || order.data.orderId)) ||
        `ORD-${Date.now().toString(36).toUpperCase().slice(-6)}-${Math
          .floor(Math.random() * 1e4)
          .toString()
          .padStart(4, '0')}`;

      // ✅ No alert, no redirect to home. Go to full-page confirmation:
      clearCart();
      navigate('/order-confirmation', {
        state: {
          orderId,
          totalAmount: finalTotal,
          email: formData.email
        }
      });
    } catch (error) {
      console.error('Failed to place order:', error);
      setError('Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const deliveryFee = totalPrice > 500 ? 0 : 50;
  const finalTotal = totalPrice + deliveryFee;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Checkout Details</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code *</label>
                    <input
                      type="text"
                      name="zipCode"
                      required
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
              <div className="space-y-3">
                {['upi', 'card', 'cod'].map(method => (
                  <label
                    key={method}
                    className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={formData.paymentMethod === method}
                      onChange={handleInputChange}
                      className="text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-3 font-medium capitalize">
                      {method === 'cod' ? 'Cash on Delivery' : method.toUpperCase()}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <Button type="submit" isLoading={isLoading} className="w-full" size="lg">
              Place Order - ₹{finalTotal}
            </Button>
          </form>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit sticky top-24"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h3>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal ({totalItems} items)</span>
              <span>₹{totalPrice}</span>
            </div>
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
                <span>₹{finalTotal}</span>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4 text-sm text-purple-800">
            <p className="font-medium mb-1">💡 Pro Tip:</p>
            <p>Use coupon codes <b>WELCOME10</b> or <b>ORGANIC20</b> for discounts!</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
