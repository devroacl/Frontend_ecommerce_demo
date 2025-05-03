import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const getProducts = async (params = {}) => {
  try {
    const response = await axios.get(`${API_URL}/productos/disponibles`, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/productos/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const getProductsByCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${API_URL}/productos/categoria/${categoryId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const searchProducts = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/productos/buscar`, { params: { query } });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const getFeaturedProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/productos/destacados`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const getNewArrivals = async () => {
  try {
    const response = await axios.get(`${API_URL}/productos/nuevos`);
    return response.data.slice(0, 10); // Limitar a 10 productos
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Para vendedores
const getSellerProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/productos/mis-productos`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const createProduct = async (productData) => {
  try {
    const formData = new FormData();
    Object.keys(productData).forEach(key => {
      if (key === 'imagen' && productData[key]) {
        formData.append('imagen', productData[key]);
      } else {
        formData.append(key, productData[key]);
      }
    });

    const response = await axios.post(`${API_URL}/productos`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const updateProduct = async (id, productData) => {
  try {
    const formData = new FormData();
    Object.keys(productData).forEach(key => {
      if (key === 'imagen' && productData[key]) {
        formData.append('imagen', productData[key]);
      } else if (productData[key] !== undefined) {
        formData.append(key, productData[key]);
      }
    });

    const response = await axios.put(`${API_URL}/productos/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default {
  getProducts,
  getProductById,
  getProductsByCategory,
  searchProducts,
  getFeaturedProducts,
  getNewArrivals,
  getSellerProducts,
  createProduct,
  updateProduct
};