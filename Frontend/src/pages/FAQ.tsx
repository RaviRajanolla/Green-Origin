import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { faqs } from '../data/mockData';

export const FAQ: React.FC = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenItem(prev => (prev === id ? null : id)); 
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about our organic products and services
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openItem === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-xl shadow-md border transition-colors duration-300 overflow-hidden
                  ${isOpen ? "bg-purple-600 border-purple-700" : "bg-white border-gray-200"}`}
              >
                {/* Question Button */}
                <motion.button
                  onClick={() => toggleItem(faq.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`w-full px-6 py-4 text-left flex items-center justify-between 
                    transition-colors duration-300 ${isOpen ? "text-white" : "text-gray-900 hover:bg-gray-50"}`}
                >
                  <h3 className={`text-lg font-semibold pr-4 ${isOpen ? "text-white" : "text-gray-900"}`}>
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className={`h-5 w-5 flex-shrink-0 ${isOpen ? "text-white" : "text-gray-500"}`} />
                  </motion.div>
                </motion.button>

                {/* Answer */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-4"
                      >
                        <p className="leading-relaxed text-purple-100">
                          {faq.answer}
                        </p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-6">
            Our customer support team is here to help you with any inquiries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="mailto:hello@greenorigin.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200"
            >
              Email Us
            </motion.a>
            <motion.a
              href="tel:+917702114099"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-lg hover:bg-purple-50 transition-colors duration-200"
            >
              Call Us
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
