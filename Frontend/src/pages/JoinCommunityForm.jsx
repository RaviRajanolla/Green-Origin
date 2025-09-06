import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';

const JoinCommunityForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // simulate form submit
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-600 via-violet-600 to-fuchsia-600 p-4">
      
      <AnimatePresence>
        {!submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-10 relative"
          >
            {/* Close icon if you want */}
            {/* <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button> */}

            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-purple-700 mb-6 text-center"
            >
              Join Our Organic Community
            </motion.h2>
            <p className="text-gray-600 text-center mb-8">
              Connect with us and be part of a sustainable, healthy lifestyle 🌱
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                whileFocus={{ scale: 1.02 }}
                className="relative"
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300"
                />
              </motion.div>

              <motion.div
                whileFocus={{ scale: 1.02 }}
                className="relative"
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300"
                />
              </motion.div>

              <motion.div
                whileFocus={{ scale: 1.02 }}
                className="relative"
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">Interest Area</label>
                <select
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300"
                >
                  <option value="">Select your interest</option>
                  <option>Organic Farming</option>
                  <option>Healthy Living</option>
                  <option>Sustainable Practices</option>
                  <option>Community Events</option>
                </select>
              </motion.div>

              <motion.div
                whileFocus={{ scale: 1.02 }}
                className="relative"
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  rows="4"
                  placeholder="Tell us why you want to join..."
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300 resize-none"
                ></textarea>
              </motion.div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition-all duration-300 shadow-lg"
              >
                Submit & Join 🌿
              </motion.button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-10 flex flex-col items-center justify-center"
          >
            <Check className="w-16 h-16 text-green-500 mb-6 animate-bounce" />
            <h2 className="text-2xl font-bold text-purple-700 mb-4 text-center">
              Success!
            </h2>
            <p className="text-gray-600 text-center">
              You've successfully joined our community 🌱 We’ll reach out to you soon!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JoinCommunityForm;
