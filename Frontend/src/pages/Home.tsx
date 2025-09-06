import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HeroBanner } from '../components/hero/HeroBanner';
import { ProductList } from '../components/products/ProductList';
import { TestimonialCarousel } from '../components/testimonial/TestimonialCarousel';
import { productAPI, BackendProduct } from '../services/api';
import { Product } from '../types';
import ExitIntentPopup from './ExitIntentPopup';

const convertBackendProduct = (backendProduct: BackendProduct): Product => ({
  id: backendProduct.id.toString(),
  name: backendProduct.name,
  price: backendProduct.price,
  image: backendProduct.imageUrl,
  category: backendProduct.category.toLowerCase(),
  weight: '',
  description: backendProduct.description,
  features: [],
  certifications: backendProduct.organic ? ['USDA Organic'] : [],
  rating: 4.5,
  reviews: Math.floor(Math.random() * 200) + 50,
  isNew: false,
  isOrganic: backendProduct.organic,
  inStock: backendProduct.available && backendProduct.stockQuantity > 0,
  isFeatured: backendProduct.featured,
});

export const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Exit intent popup state
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupCount, setPopupCount] = useState(0); // number of times popup shown
  const maxPopups = 3; // max times popup can appear

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const backendProducts = await productAPI.getAllProducts();
        const convertedProducts = backendProducts.map(convertBackendProduct);

        const selectedIds = [826, 830, 621, 825, 552, 827];
        const topProductsManual = convertedProducts.filter((p) =>
          selectedIds.includes(Number(p.id))
        );

        setTopProducts(topProductsManual);
        setProducts(convertedProducts.filter((p) => p.isFeatured));
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Exit intent popup logic (multiple appearances)
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 50 && popupCount < maxPopups) {
        setIsPopupOpen(true);
        setPopupCount((prev) => prev + 1);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    const timer = setTimeout(() => {
      if (popupCount < maxPopups) {
        setIsPopupOpen(true);
        setPopupCount((prev) => prev + 1);
      }
    }, 20000); 
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
    };
  }, [popupCount]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Top Horizontal Round Products */}
      <section className="py-6 flex justify-center">
        {isLoading ? (
          <div className="flex space-x-12 animate-pulse">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 bg-gray-300 rounded-full mb-2"></div>
                <div className="h-4 w-16 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            className="flex justify-center gap-12 overflow-x-hidden py-2 snap-x snap-mandatory"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {topProducts.map((product) => (
              <motion.div
                key={product.id}
                className="flex flex-col items-center flex-shrink-0 cursor-pointer snap-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/products/${product.id}`)}
              >
                <div className="w-16 sm:w-28 md:w-32 h-16 sm:h-28 md:h-32 rounded-full border border-gray-200 shadow-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <span className="mt-2 text-sm font-medium text-gray-700 text-center">
                  {product.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* Hero Banner */}
      <HeroBanner />

      {/* Featured Products */}
      <ProductList products={products} title="Shop Our Customers' Favorites" />

{/* Why Choose Us Section */}
<section className="py-16 bg-purple-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section Heading */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center mb-12"
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
        Why Choose <span className="text-purple-600">Us</span>
      </h2>
      <p className="text-gray-700 max-w-2xl mx-auto">
        We provide the finest organic products, sourced directly from trusted farmers, 
        ensuring quality, sustainability, and freshness every time.
      </p>
    </motion.div>

    {/* Each card has its own hover effect */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        {
          title: '100% Organic',
          desc: 'Certified organic products, free from harmful chemicals and pesticides.',
          icon: '🌱',
          bg: 'bg-white',
        },
        {
          title: 'Farm Fresh',
          desc: 'Directly sourced from farms to ensure peak freshness and quality.',
          icon: '🚜',
          bg: 'bg-white',
        },
        {
          title: 'Sustainable',
          desc: 'We support eco-friendly farming and fair-trade practices.',
          icon: '♻️',
          bg: 'bg-white',
        },
        {
          title: 'Trusted Quality',
          desc: 'Rigorous quality checks to deliver only the best products.',
          icon: '✅',
          bg: 'bg-white',
        },
      ].map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: idx * 0.15 }}
          whileHover={{ scale: 1.08, y: -8, boxShadow: "0px 8px 25px rgba(0,0,0,0.15)" }} 
          whileTap={{ scale: 0.98 }} 
          className={`rounded-2xl p-8 flex flex-col items-center text-center shadow-lg ${item.bg}`}
        >
          <div className="text-4xl mb-4">{item.icon}</div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900">{item.title}</h3>
          <p className="text-gray-600">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>


      {/* Testimonials */}
      <TestimonialCarousel />

      {/* Exit Intent Popup */}
      <ExitIntentPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </>
  );
};
