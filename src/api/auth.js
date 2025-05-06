import axios from 'axios';

const API_URL = 'https://prod-backendecomarket.onrender.com/api';

export const register = async (userData) => {
  return await axios.post(`${API_URL}/auth/registro`, userData);
};

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};