// API Configuration and Base Service
const API_BASE_URL = 'http://localhost:8080/api';

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Enhanced User Interface
export interface User {
  id: number;
  name: string;
  email: string;
}

// Enhanced Product Interface (matching backend)
export interface BackendProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stockQuantity: number;
  available: boolean;
  organic: boolean;
  isFeatured: boolean;
}

// Category Interface
export interface Category {
  id: number;
  name: string;
}

// Cart Interfaces
export interface CartItemRequest {
  userId: number;
  productId: number;
  quantity: number;
}

export interface CartItemResponse {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  product: BackendProduct;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

// Order Interfaces
export interface PlaceOrderRequest {
  userId: number;
  cartItemIds: number[];
  totalAmount: number;
  shippingAddress: string;
}

export interface Order {
  id: number;
  userId: number;
  totalAmount: number;
  shippingAddress: string;
  orderDate: string;
  status: string;
}

// ✅ Generic API call function with credentials included
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      credentials: 'include', // ✅ Required when allowCredentials is true on backend
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error);
    throw error;
  }
}

// 🔐 Authentication APIs
export const authAPI = {
  register: async (userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<User> => {
    return apiCall<User>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  login: async (credentials: {
    email: string;
    password: string;
  }): Promise<User> => {
    return apiCall<User>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
};

// 📦 Product APIs
export const productAPI = {
  getAllProducts: async (): Promise<BackendProduct[]> => {
    return apiCall<BackendProduct[]>('/products');
  },

  getProductById: async (id: number): Promise<BackendProduct> => {
    return apiCall<BackendProduct>(`/products/${id}`);
  },

  createProduct: async (productData: Omit<BackendProduct, 'id'>): Promise<BackendProduct> => {
    return apiCall<BackendProduct>('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  updateProduct: async (id: number, productData: Omit<BackendProduct, 'id'>): Promise<BackendProduct> => {
    return apiCall<BackendProduct>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  },

  deleteProduct: async (id: number): Promise<void> => {
    return apiCall<void>(`/products/${id}`, {
      method: 'DELETE',
    });
  },
};

// 🗂️ Category APIs
export const categoryAPI = {
  getAllCategories: async (): Promise<Category[]> => {
    return apiCall<Category[]>('/categories');
  },

  getCategoryById: async (id: number): Promise<Category> => {
    return apiCall<Category>(`/categories/${id}`);
  },

  createCategory: async (categoryData: { name: string }): Promise<Category> => {
    return apiCall<Category>('/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData),
    });
  },

  updateCategory: async (id: number, categoryData: { name: string }): Promise<Category> => {
    return apiCall<Category>(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(categoryData),
    });
  },

  deleteCategory: async (id: number): Promise<void> => {
    return apiCall<void>(`/categories/${id}`, {
      method: 'DELETE',
    });
  },
};

// 🛒 Cart APIs
export const cartAPI = {
  addToCart: async (cartItem: CartItemRequest): Promise<CartItemResponse> => {
    return apiCall<CartItemResponse>('/cart/add', {
      method: 'POST',
      body: JSON.stringify(cartItem),
    });
  },

  getCartByUserId: async (userId: number): Promise<CartItemResponse[]> => {
    return apiCall<CartItemResponse[]>(`/cart/user/${userId}`);
  },

  updateCartItem: async (cartItemId: number, updateData: UpdateCartItemRequest): Promise<CartItemResponse> => {
    return apiCall<CartItemResponse>(`/cart/update/${cartItemId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  },

  removeFromCart: async (cartItemId: number): Promise<void> => {
    return apiCall<void>(`/cart/remove/${cartItemId}`, {
      method: 'DELETE',
    });
  },
};

// // 🧾 Order APIs
// export const orderAPI = {
//   placeOrder: async (orderData: PlaceOrderRequest): Promise<Order> => {
//     return apiCall<Order>('/orders/place', {
//       method: 'POST',
//       body: JSON.stringify(orderData),
//     });
//   },

//   getOrdersByUserId: async (userId: number): Promise<Order[]> => {
//     return apiCall<Order[]>(`/orders/user/${userId}`);
//   },
// };

// 🧾 Order APIs
export const orderAPI = {
  placeOrder: async (orderData: PlaceOrderRequest): Promise<{ success: boolean; orderId?: number }> => {
    return apiCall<{ success: boolean; orderId?: number }>('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  getOrdersByUserId: async (userId: number): Promise<Order[]> => {
    return apiCall<Order[]>(`/orders/user/${userId}`);
  },
};