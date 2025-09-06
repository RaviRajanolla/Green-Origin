import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, LogOut, Shield } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const { totalItems } = useCart();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  // Active link highlight
  const isActive = (path: string) =>
    location.pathname === path
      ? "text-purple-700 font-semibold border-b-2 border-purple-700"
      : "text-gray-700 hover:text-purple-600";

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-9 h-9 bg-purple-700 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">GO</span>
            </div>
            <span className="text-xl font-bold text-gray-900">GreenOrigin</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className={isActive("/")}>Home</Link>
            <Link to="/collections" className={isActive("/collections")}>Collections</Link>
            <Link to="/about" className={isActive("/about")}>About</Link>
            <Link to="/faq" className={isActive("/faq")}>FAQ</Link>
            <Link to="/contact" className={isActive("/contact")}>Contact</Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {isAdmin && (
              <Link 
                to="/admin/dashboard"
                className="text-red-600 hover:text-red-700 hidden md:flex items-center space-x-1"
                title="Admin Dashboard"
              >
                <Shield className="h-5 w-5" />
                <span className="text-sm font-medium">Admin</span>
              </Link>
            )}

            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700 hidden sm:block">
                  Hello, {user?.name?.split(' ')[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-purple-600"
                  title="Logout"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-purple-600">
                <User className="h-6 w-6" />
              </Link>
            )}
            
            {/* Cart */}
            <Link to="/cart" className="relative text-gray-700 hover:text-purple-600">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-purple-700 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-gray-700 hover:text-purple-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 py-4"
            >
              <div className="flex flex-col space-y-4">
                <Link to="/" className={isActive("/")} onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link to="/collections" className={isActive("/collections")} onClick={() => setIsMenuOpen(false)}>Collections</Link>
                <Link to="/about" className={isActive("/about")} onClick={() => setIsMenuOpen(false)}>About</Link>
                <Link to="/faq" className={isActive("/faq")} onClick={() => setIsMenuOpen(false)}>FAQ</Link>
                <Link to="/contact" className={isActive("/contact")} onClick={() => setIsMenuOpen(false)}>Contact</Link>

                {isAdmin && (
                  <Link to="/admin/dashboard" className="text-red-600 hover:text-red-700 flex items-center space-x-1" onClick={() => setIsMenuOpen(false)}>
                    <Shield className="h-4 w-4" />
                    <span>Admin Dashboard</span>
                  </Link>
                )}
                {isAuthenticated ? (
                  <button onClick={handleLogout} className="text-gray-700 hover:text-purple-600 text-left">
                    Logout ({user?.name})
                  </button>
                ) : (
                  <Link to="/login" className="text-gray-700 hover:text-purple-600" onClick={() => setIsMenuOpen(false)}>Login</Link>
                )}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
