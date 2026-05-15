import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '../../api/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  useEffect(() => {
    const checkLoggedIn = async () => {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (storedUser && token) {
        try {
          const response = await axiosInstance.get('/auth/me');
          const serverUser = response.data.data;
          
          // Sync role from server
          const storedUserObj = JSON.parse(storedUser);
          if (serverUser.role !== storedUserObj.role) {
            localStorage.setItem('user', JSON.stringify(serverUser));
          }
          
          setUser(serverUser);
        } catch (error) {
          logout();
        }
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  const login = async (email, password) => {
    const response = await axiosInstance.post('/auth/login', { email, password });
    const { token, ...userData } = response.data.data;
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const signup = async (name, email, password, role) => {
    const response = await axiosInstance.post('/auth/signup', { name, email, password, role });
    const { token, ...userData } = response.data.data;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
