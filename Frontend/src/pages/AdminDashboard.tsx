import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Package, Users, ShoppingCart, TrendingUp } from 'lucide-react';
import { productAPI, categoryAPI, BackendProduct, Category } from '../services/api';
import { Button } from '../components/shared/Button';
import { Badge } from '../components/shared/Badge';
import { ProductForm } from '../components/admin/ProductForm';

export const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<BackendProduct[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<BackendProduct | null>(null);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        productAPI.getAllProducts(),
        categoryAPI.getAllCategories()
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setError('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await productAPI.deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Failed to delete product:', error);
      alert('Failed to delete product!');
    }
  };

  const handleEditProduct = (product: BackendProduct) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleProductSaved = (newProduct?: BackendProduct) => {
    setShowProductForm(false);
    setEditingProduct(null);

    if (newProduct) {
      setProducts(prev => {
        const exists = prev.find(p => p.id === newProduct.id);
        if (exists) {
          return prev.map(p => (p.id === newProduct.id ? newProduct : p));
        }
        return [newProduct, ...prev];
      });
    } else {
      fetchData();
    }
  };

  const filteredProducts = products.filter(
    p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { label: 'Total Products', value: products.length, icon: Package, color: 'bg-blue-500' },
    { label: 'Categories', value: categories.length, icon: Users, color: 'bg-green-500' },
    { label: 'In Stock', value: products.filter(p => p.available).length, icon: ShoppingCart, color: 'bg-purple-500' },
    { label: 'Organic Products', value: products.filter(p => p.organic).length, icon: TrendingUp, color: 'bg-yellow-500' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Manage your GreenOrigin products and inventory</p>
            </div>
            <Button onClick={() => setShowProductForm(true)} className="bg-green-600 hover:bg-green-700">
              <Plus className="h-5 w-5 mr-2" />
              Add Product
            </Button>
          </div>
        </motion.div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name or category..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-full`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Products Table */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Products Management</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map(product => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img className="h-12 w-12 rounded-lg object-cover" src={product.imageUrl} alt={product.name} />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{product.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{product.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.stockQuantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        {product.available && <Badge variant="success">Available</Badge>}
                        {!product.available && <Badge variant="warning">Out of Stock</Badge>}
                        {product.organic && <Badge variant="info">Organic</Badge>}
                        {product.isFeatured && <Badge variant="primary">Featured</Badge>}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEditProduct(product)} className="text-blue-600 hover:text-blue-700">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteProduct(product.id)} className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Product Form Modal */}
        {showProductForm && (
          <ProductForm
            product={editingProduct}
            categories={categories}
            onSave={handleProductSaved}
            onCancel={() => {
              setShowProductForm(false);
              setEditingProduct(null);
            }}
          />
        )}
      </div>
    </div>
  );
};
