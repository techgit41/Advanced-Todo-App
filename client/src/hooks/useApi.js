import { useAuth } from '../contexts/AuthContext';
import { api } from '../contexts/AuthContext';

export const useApi = () => {
  const { getToken } = useAuth();

  const makeRequest = async (method, url, data = null) => {
    try {
      // Ensure we have the latest token
      const token = getToken();
      console.log('🌐 Making API request:', {
        method,
        url,
        data,
        hasToken: !!token,
        token: token ? `${token.substring(0, 20)}...` : 'None'
      });
      
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        console.warn('⚠️ No token found for API request');
        delete api.defaults.headers.common['Authorization'];
      }

      const config = {
        method,
        url,
        ...(data && { data })
      };

      const response = await api(config);
      console.log('✅ API response success:', {
        url,
        status: response.status,
        data: response.data
      });
      return response.data;
    } catch (error) {
      console.error('❌ API request failed:', {
        method,
        url,
        data,
        status: error.response?.status,
        statusText: error.response?.statusText,
        errorData: error.response?.data,
        errorMessage: error.message,
        headers: error.response?.headers
      });
      
      throw error;
    }
  };

  return {
    get: (url) => makeRequest('GET', url),
    post: (url, data) => makeRequest('POST', url, data),
    put: (url, data) => makeRequest('PUT', url, data),
    delete: (url) => makeRequest('DELETE', url)
  };
};