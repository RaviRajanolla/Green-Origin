import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem, Product } from '../types';
import { cartAPI, CartItemResponse } from '../services/api';
import { useAuth } from './AuthContext';

interface CartState {
  items: CartItem[];
  backendCartItems: CartItemResponse[];
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
}

interface CartContextType extends CartState {
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  syncWithBackend: () => Promise<void>;
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] }
  | { type: 'SET_BACKEND_CART'; payload: CartItemResponse[] }
  | { type: 'SET_LOADING'; payload: boolean };

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(item => item.product.id === product.id);
      
      let newItems: CartItem[];
      if (existingItem) {
        newItems = state.items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...state.items, { product, quantity }];
      }
      
      return {
        ...state,
        items: newItems,
        totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
      };
    }
    
    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(item => item.product.id !== action.payload);
      return {
        ...state,
        items: newItems,
        totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_FROM_CART', payload: productId });
      }
      
      const newItems = state.items.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      
      return {
        ...state,
        items: newItems,
        totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
      };
    }
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalPrice: 0
      };
    
    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload,
        totalItems: action.payload.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: action.payload.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
      };
    
    case 'SET_BACKEND_CART':
      return {
        ...state,
        backendCartItems: action.payload
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    backendCartItems: [],
    totalItems: 0,
    totalPrice: 0,
    isLoading: false
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('greenorigin-cart');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cartItems });
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('greenorigin-cart', JSON.stringify(state.items));
  }, [state.items]);

  // Sync with backend when user logs in
  useEffect(() => {
    if (isAuthenticated && user) {
      syncWithBackend();
    }
  }, [isAuthenticated, user]);

  const syncWithBackend = async () => {
    if (!user) return;
    
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const backendCart = await cartAPI.getCartByUserId(user.id);
      dispatch({ type: 'SET_BACKEND_CART', payload: backendCart });
    } catch (error) {
      console.error('Failed to sync cart with backend:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };
  const addToCart = async (product: Product, quantity = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
    
    // If user is authenticated, also add to backend
    if (isAuthenticated && user) {
      try {
        await cartAPI.addToCart({
          userId: user.id,
          productId: parseInt(product.id),
          quantity
        });
      } catch (error) {
        console.error('Failed to add item to backend cart:', error);
      }
    }
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{
      ...state,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      syncWithBackend
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};