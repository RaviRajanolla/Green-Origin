import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Collections } from './pages/Collections';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Login } from './pages/Login';
import { About } from './pages/About';
import { FAQ } from './pages/FAQ';
import { Contact } from './pages/Contact';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { useAuth } from './context/AuthContext';
import { OrderConfirmation } from './pages/OrderConfirmation';
import OurStory from './pages/OurStory';
import JoinCommunityForm from './pages/JoinCommunityForm';
import ShippingInfo from './pages/ShippingInfo';
import Returns from './pages/Returns';
import PrivacyPolicy from './pages/PrivacyPolicy';

// Protected Route Component for Admin
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">You need admin privileges to access this page.</p>
          <Link to="/admin/login" className="text-purple-600 hover:text-purple-700">
            Admin Login
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="/join-community" element={<JoinCommunityForm />} />
                <Route path="/shipping-info" element={<ShippingInfo />} />
                <Route path="/returns" element={<Returns />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/our-story" element={<OurStory />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin/dashboard"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
