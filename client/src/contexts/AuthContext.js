import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import API_CONFIG from '../config/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
});

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Test server connection
const testServerConnection = async () => {
  try {
    const response = await api.get('/api/health');
    return { connected: true, data: response.data };
  } catch (error) {
    return { connected: false, error: error.message };
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [serverOnline, setServerOnline] = useState(false);

  // Function to set authorization header
  const setAuthToken = (token) => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete api.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  };

  // Function to get stored token
  const getStoredToken = () => {
    return localStorage.getItem('token');
  };

  useEffect(() => {
    const initAuth = async () => {
      // First, test server connection
      const connectionTest = await testServerConnection();
      setServerOnline(connectionTest.connected);
      
      if (!connectionTest.connected) {
        console.warn('Server is not reachable:', connectionTest.error);
      }

      // Then check for existing auth
      const token = getStoredToken();
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        setAuthToken(token);
        setUser(JSON.parse(userData));
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      // Test connection first
      if (!serverOnline) {
        const connectionTest = await testServerConnection();
        if (!connectionTest.connected) {
          return { 
            success: false, 
            message: 'Cannot connect to server. Please make sure the backend is running on port 5000.' 
          };
        }
        setServerOnline(true);
      }

      const response = await api.post('/api/auth/login', {
        email,
        password
      });

      if (response.data.success) {
        const { token, user: userData } = response.data;
        
        setAuthToken(token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        
        return { success: true };
      } else {
        return { 
          success: false, 
          message: response.data.message || 'Login failed' 
        };
      }
    } catch (error) {
      console.error('Login error details:', error);
      
      if (error.code === 'ECONNREFUSED') {
        return { 
          success: false, 
          message: 'Cannot connect to server. Please make sure the backend is running on port 5000.' 
        };
      } else if (error.response) {
        return { 
          success: false, 
          message: error.response.data.message || 'Login failed' 
        };
      } else if (error.request) {
        return { 
          success: false, 
          message: 'Server is not responding. Please check if the backend server is running.' 
        };
      } else {
        return { 
          success: false, 
          message: 'An unexpected error occurred during login' 
        };
      }
    }
  };

  const register = async (username, email, password) => {
    try {
      // Test connection first
      if (!serverOnline) {
        const connectionTest = await testServerConnection();
        if (!connectionTest.connected) {
          return { 
            success: false, 
            message: 'Cannot connect to server. Please make sure the backend is running on port 5000.' 
          };
        }
        setServerOnline(true);
      }

      const response = await api.post('/api/auth/register', {
        username,
        email,
        password
      });

      if (response.data.success) {
        const { token, user: userData } = response.data;
        
        setAuthToken(token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        
        return { success: true };
      } else {
        return { 
          success: false, 
          message: response.data.message || 'Registration failed' 
        };
      }
    } catch (error) {
      console.error('Registration error details:', error);
      
      if (error.code === 'ECONNREFUSED') {
        return { 
          success: false, 
          message: 'Cannot connect to server. Please make sure the backend is running on port 5000.' 
        };
      } else if (error.response) {
        const errorMessage = error.response.data.message || 'Registration failed';
        
        if (error.response.data.errors) {
          const validationErrors = error.response.data.errors.map(err => err.msg).join(', ');
          return { 
            success: false, 
            message: validationErrors 
          };
        }
        
        return { 
          success: false, 
          message: errorMessage 
        };
      } else if (error.request) {
        return { 
          success: false, 
          message: 'Server is not responding. Please check if the backend server is running.' 
        };
      } else {
        return { 
          success: false, 
          message: 'An unexpected error occurred during registration' 
        };
      }
    }
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('user');
    setUser(null);
  };

  const checkServerStatus = async () => {
    const connectionTest = await testServerConnection();
    setServerOnline(connectionTest.connected);
    return connectionTest;
  };

  // Get the API instance for other components to use
  const getApi = () => api;

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    serverOnline,
    checkServerStatus,
    getApi,
    getToken: getStoredToken
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Export the api instance for use in other components
export { api };