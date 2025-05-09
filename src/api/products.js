import axios from 'axios';

const API_URL = 'https://prod-backendecomarket-def.onrender.com/api';

// Obtener productos disponibles para todos
export const getProducts = async () => {
  return await axios.get(`${API_URL}/productos/disponibles`);
};

// Obtener productos del vendedor autenticado (nueva función corregida)
export const fetchProducts = async (token) => {
  return await axios.get(`${API_URL}/productos/mis-productos`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// Crear nuevo producto
export const createProduct = async (productData, token) => {
  return await axios.post(`${API_URL}/productos`, productData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
};

// Obtener categorías
export const fetchCategories = async () => {
  return await axios.get(`${API_URL}/categorias`);
};