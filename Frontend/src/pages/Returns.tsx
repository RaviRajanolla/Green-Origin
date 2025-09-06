import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRightCircle, RefreshCw } from "lucide-react";

const Returns: React.FC = () => {
  const sectionMotion = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const listMotion = {
    whileHover: { scale: 1.03, x: 5, color: "#7F3DFF" },
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto py-24 px-6 sm:px-8 lg:px-12"
      initial="initial"
      animate="animate"
    >
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold mb-8 text-gradient-to-r from-purple-600 via-indigo-500 to-pink-500"
        {...sectionMotion}
      >
        Returns Policy
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl text-gray-700 mb-12 leading-relaxed"
        {...sectionMotion}
      >
        We want you to be fully satisfied with your purchase. If something isn’t right, you can return eligible items within 14 days of delivery. Follow the steps below to make your return process smooth and hassle-free.
      </motion.p>

      <div className="space-y-12">
        {/* Return Conditions */}
        <motion.div className="flex flex-col md:flex-row items-start md:items-center gap-6" {...sectionMotion}>
          <CheckCircle className="w-12 h-12 text-purple-500 flex-shrink-0" />
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Return Conditions</h2>
            <ul className="space-y-2 text-gray-700">
              <motion.li {...listMotion} className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-purple-400" />
                Item must be unused, unopened, and in original packaging
              </motion.li>
              <motion.li {...listMotion} className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-purple-400" />
                Include the original receipt or proof of purchase
              </motion.li>
              <motion.li {...listMotion} className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-purple-400" />
                Return request must be initiated within 14 days of delivery
              </motion.li>
            </ul>
          </div>
        </motion.div>

        {/* How to Return */}
        <motion.div className="flex flex-col md:flex-row items-start md:items-center gap-6" {...sectionMotion}>
          <ArrowRightCircle className="w-12 h-12 text-indigo-500 flex-shrink-0" />
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">How to Return</h2>
            <ul className="space-y-2 text-gray-700">
              <motion.li {...listMotion} className="flex items-center gap-2">
                <ArrowRightCircle className="w-5 h-5 text-indigo-400" />
                Log in to your account and go to 'My Orders'
              </motion.li>
              <motion.li {...listMotion} className="flex items-center gap-2">
                <ArrowRightCircle className="w-5 h-5 text-indigo-400" />
                Select the order and click 'Request Return'
              </motion.li>
              <motion.li {...listMotion} className="flex items-center gap-2">
                <ArrowRightCircle className="w-5 h-5 text-indigo-400" />
                Follow the instructions to ship the product back to us
              </motion.li>
            </ul>
          </div>
        </motion.div>

        {/* Refund Process */}
        <motion.div className="flex flex-col md:flex-row items-start md:items-center gap-6" {...sectionMotion}>
          <RefreshCw className="w-12 h-12 text-pink-500 flex-shrink-0" />
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Refund Process</h2>
            <motion.p {...listMotion} className="text-gray-700 leading-relaxed">
              Once we receive your returned item, it will be inspected to ensure it meets the return conditions. Refunds will be processed within 5 business days using your original payment method. Shipping charges are non-refundable unless the return is due to our error.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Returns;
