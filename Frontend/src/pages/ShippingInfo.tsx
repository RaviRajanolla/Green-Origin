import React from "react";
import { motion } from "framer-motion";
import { Truck, Clock, DollarSign, MapPin } from "lucide-react";

const ShippingInfo: React.FC = () => {
  const sectionFade = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const listItemHover = { scale: 1.03, color: "#10B981" }; // Green accent

  return (
    <motion.div
      className="max-w-5xl mx-auto py-24 px-6 sm:px-8 lg:px-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <h1 className="text-5xl font-extrabold mb-8 text-green-600">
        Shipping Information
      </h1>
      <p className="text-gray-700 leading-relaxed mb-12 text-lg md:text-xl">
        GreenOrigin delivers your favorite organic products safely and quickly. 
        We partner with trusted shipping carriers to ensure your order arrives on time.
      </p>

      <div className="space-y-12">
        {/* Delivery Times */}
        <motion.div {...sectionFade}>
          <div className="flex items-center mb-4 space-x-3">
            <Clock className="text-green-500 w-6 h-6" />
            <h2 className="text-3xl font-semibold text-green-500">Delivery Times</h2>
          </div>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {[
              "Standard Delivery: 3-5 business days",
              "Express Delivery: 1-2 business days",
              "International Shipping: 7-14 business days",
            ].map((item, idx) => (
              <motion.li key={idx} whileHover={listItemHover} className="cursor-pointer">
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Shipping Charges */}
        <motion.div {...sectionFade}>
          <div className="flex items-center mb-4 space-x-3">
            <DollarSign className="text-green-500 w-6 h-6" />
            <h2 className="text-3xl font-semibold text-green-500">Shipping Charges</h2>
          </div>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {[
              "Orders above ₹1,500: Free Standard Shipping",
              "Orders below ₹1,500: ₹150 standard shipping",
              "Express Delivery: Flat ₹250",
            ].map((item, idx) => (
              <motion.li key={idx} whileHover={listItemHover} className="cursor-pointer">
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Order Tracking */}
        <motion.div {...sectionFade}>
          <div className="flex items-center mb-4 space-x-3">
            <MapPin className="text-green-500 w-6 h-6" />
            <h2 className="text-3xl font-semibold text-green-500">Order Tracking</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            Once your order is shipped, you will receive a tracking number via email. 
            Use it to track your order in real-time on our website or carrier’s portal.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ShippingInfo;
