import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/registro`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
};

export const checkAuth = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');
  
  try {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.get(`${API_URL}/auth/check`);
    return response.data;
  } catch (error) {
    logout();
    throw error.response?.data || error.message;
  }
};

// Puedes mantener también la exportación por defecto si la necesitas en otros lugares
export default {
  login,
  register,
  logout,
  checkAuth
};