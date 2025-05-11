import axios from 'axios';
import store from '../store/store';
import { logout } from '../store/authSlice';

// Create base axios instance
const api = axios.create({
  baseURL: 'https://prod-backendecomarket-def.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include JWT token in requests
api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Token expired or invalid, logout user
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default api;