import React from 'react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { motion } from 'framer-motion';

interface ProductListProps {
  products: Product[];
  title?: string;
  showAll?: boolean;
}

export const ProductList: React.FC<ProductListProps> = ({ 
  products, 
  title = 'Featured Products',
  showAll = false 
}) => {
  const displayProducts = showAll ? products : products.slice(0, 6);

  if (showAll) {
    // For Collections page - just return the grid without section wrapper
    return (
      <>
        {displayProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </>
    );
  }
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated selection of premium organic products
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};