import React from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export const Footer: React.FC = () => {
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.15 } },
  };

  return (
    <footer className="bg-gray-900 text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
        >
          {/* Brand Info */}
          <motion.div variants={fadeUp} className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-white font-bold text-sm">GO</span>
              </div>
              <span className="text-xl font-bold">GreenOrigin</span>
            </div>
            <p className="text-gray-400">
              Bringing you the finest organic products from sustainable farms to
              your doorstep.
            </p>
            <div className="flex space-x-4">
              {[Github, Linkedin, Youtube].map((Icon, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
                  whileHover={{ scale: 1.2, color: "#A78BFA" }}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeUp}>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", to: "/" },
                { name: "Collections", to: "/collections" },
                { name: "About Us", to: "/about" },
                { name: "FAQ", to: "/faq" },
                { name: "Admin Login", to: "/admin/login" },
                { name: "Our Story", to: "/our-story" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Customer Service */}
          <motion.div variants={fadeUp}>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              {[
                { name: "Contact Us", to: "/contact" },
                { name: "Shipping Info", to: "/shipping-info" },
                { name: "Returns", to: "/returns" },
                { name: "Privacy Policy", to: "/privacy-policy" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={fadeUp}>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2">
              <motion.div
                className="flex items-center space-x-2 text-gray-400"
                whileHover={{ x: 5 }}
              >
                <Mail className="h-4 w-4" />
                <span>hello@greenorigin.com</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-2 text-gray-400"
                whileHover={{ x: 5 }}
              >
                <Phone className="h-4 w-4" />
                <span>+91 7702114099</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-2 text-gray-400"
                whileHover={{ x: 5 }}
              >
                <MapPin className="h-4 w-4" />
                <span>Hyderabad, India</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div
          className="border-t border-gray-800 mt-8 pt-8 text-center"
          variants={fadeUp}
        >
          <p className="text-gray-400 animate-pulse">
            © 2025 GreenOrigin. All rights reserved. Made with ❤️ for a healthier
            planet.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
