import axios from 'axios';

const API_URL = 'https://prod-backendecomarket.onrender.com/api';

// Función faltante
export const getMisProductos = async (token) => {
  return await axios.get(`${API_URL}/productos/mis-productos`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// Funciones existentes
export const getProducts = async () => {
  return await axios.get(`${API_URL}/productos/disponibles`);
};

export const createProduct = async (productData, token) => {
  return await axios.post(`${API_URL}/productos`, productData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
};