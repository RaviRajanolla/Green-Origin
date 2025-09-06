import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../services/api';

interface AdminUser extends User {
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | AdminUser | null;
  login: (user: User) => void;
  loginAsAdmin: (user: AdminUser) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | AdminUser | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('greenorigin-user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Failed to load user from localStorage:', error);
        localStorage.removeItem('greenorigin-user');
      }
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('greenorigin-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('greenorigin-user');
    }
  }, [user]);

  const login = (userData: User) => {
    setUser(userData);
  };

  const loginAsAdmin = (userData: AdminUser) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;
  const isAdmin = !!(user && 'isAdmin' in user && user.isAdmin);

  return (
    <AuthContext.Provider value={{
      user,
      login,
      loginAsAdmin,
      logout,
      isAuthenticated,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};