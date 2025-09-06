import React from "react";
import { motion } from "framer-motion";
import { User, CreditCard, Shield, Link as LinkIcon } from "lucide-react";

const PrivacyPolicy: React.FC = () => {
  const sectionFade = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const listItemHover = { scale: 1.03, color: "#7C3AED" }; // Purple accent

  return (
    <motion.div
      className="max-w-5xl mx-auto py-24 px-6 sm:px-8 lg:px-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <h1 className="text-5xl font-extrabold mb-8 text-purple-700">
        Privacy Policy
      </h1>
      <p className="text-gray-700 leading-relaxed mb-12 text-lg md:text-xl">
        Your privacy is our top priority. GreenOrigin is committed to protecting your personal information 
        and ensuring transparency about how it is collected, stored, and used.
      </p>

      <div className="space-y-12">
        {/* Information We Collect */}
        <motion.div {...sectionFade}>
          <div className="flex items-center mb-4 space-x-3">
            <User className="text-purple-600 w-6 h-6" />
            <h2 className="text-3xl font-semibold text-purple-600">Information We Collect</h2>
          </div>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {[
              "Personal details like name, email, and phone number",
              "Shipping and billing addresses",
              "Payment information (securely processed)",
              "Browsing and order history on our site",
            ].map((item, idx) => (
              <motion.li
                key={idx}
                whileHover={listItemHover}
                className="cursor-pointer"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* How We Use Your Information */}
        <motion.div {...sectionFade}>
          <div className="flex items-center mb-4 space-x-3">
            <CreditCard className="text-purple-600 w-6 h-6" />
            <h2 className="text-3xl font-semibold text-purple-600">How We Use Your Information</h2>
          </div>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {[
              "To process and deliver orders",
              "To communicate about promotions, updates, and support",
              "To improve website functionality and user experience",
              "To comply with legal obligations",
            ].map((item, idx) => (
              <motion.li
                key={idx}
                whileHover={listItemHover}
                className="cursor-pointer"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Data Protection */}
        <motion.div {...sectionFade}>
          <div className="flex items-center mb-4 space-x-3">
            <Shield className="text-purple-600 w-6 h-6" />
            <h2 className="text-3xl font-semibold text-purple-600">Data Protection</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            We implement industry-standard security measures to protect your personal data from unauthorized access, disclosure, or loss. Your information is safe with us.
          </p>
        </motion.div>

        {/* Third-Party Sharing */}
        <motion.div {...sectionFade}>
          <div className="flex items-center mb-4 space-x-3">
            <LinkIcon className="text-purple-600 w-6 h-6" />
            <h2 className="text-3xl font-semibold text-purple-600">Third-Party Sharing</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            We do not sell your personal information. Data may be shared with trusted partners for shipping, payment processing, or legal requirements only.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;
