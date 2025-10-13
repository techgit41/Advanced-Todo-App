const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  TIMEOUT: 10000,
};

// Test the connection
console.log('🔗 Frontend trying to connect to:', API_CONFIG.BASE_URL);

export default API_CONFIG;