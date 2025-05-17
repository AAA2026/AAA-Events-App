import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('token');
    return !!token;
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check token validity on mount
    const token = localStorage.getItem('token');
    if (token) {
      // You might want to verify the token with your backend here
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (credentials) => {
    try {
      // Implement your login logic here
      // const response = await api.login(credentials);
      // localStorage.setItem('token', response.token);
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const register = async (userData) => {
    try {
      // Implement your registration logic here
      // const response = await api.register(userData);
      // localStorage.setItem('token', response.token);
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 