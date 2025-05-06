import axios from 'axios';

export const getProducts = async () => {
  return await axios.get('http://localhost:8080/api/productos/disponibles');
};

export const createProduct = async (productData, token) => {
  return await axios.post('http://localhost:8080/api/productos', productData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
};