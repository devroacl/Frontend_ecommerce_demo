import api from './axiosConfig';

const authService = {
  // Login endpoint - matches AuthController.login
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Error de servidor' };
    }
  },
  
  // Register endpoint - matches AuthController.registro
  register: async (userData) => {
    try {
      const response = await api.post('/auth/registro', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Error de servidor' };
    }
  }
};

export default authService;