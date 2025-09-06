import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export const OrderConfirmation: React.FC = () => {
  const { state } = useLocation() as {
    state?: { orderId?: string; totalAmount?: number; email?: string };
  };

  // Graceful fallbacks if something wasn't passed in navigation
  const orderId =
    state?.orderId ||
    `ORD-${Date.now().toString(36).toUpperCase().slice(-6)}-${Math
      .floor(Math.random() * 1e4)
      .toString()
      .padStart(4, "0")}`;

  const totalAmount = state?.totalAmount;
  const email = state?.email;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="bg-white rounded-2xl shadow-lg p-10 max-w-lg w-full text-center"
      >
        <CheckCircle className="mx-auto h-20 w-20 text-green-500 mb-6" />

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Order placed successfully!
        </h1>

        <p className="text-gray-700 mb-2">
          Order ID: <span className="font-semibold text-purple-600">{orderId}</span>
        </p>

        {typeof totalAmount === "number" && (
          <p className="text-gray-700 mb-2">Total Paid: <b>₹{totalAmount}</b></p>
        )}

        {email && (
          <p className="text-gray-500 mb-8">
            A confirmation email will be sent to <span className="font-medium">{email}</span>.
          </p>
        )}

        <Link
          to="/collections"
          className="inline-block bg-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors duration-200"
        >
          Continue Shopping
        </Link>
      </motion.div>
    </div>
  );
};
