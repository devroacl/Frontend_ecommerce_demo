import api from './api';

const getUsers = async () => {
  try {
    const response = await api.get('/admin/usuarios');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const getProducts = async () => {
  try {
    const response = await api.get('/admin/productos');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const getStats = async () => {
  try {
    const response = await api.get('/admin/estadisticas');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const getCategories = async () => {
  try {
    const response = await api.get('/admin/categorias');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const updateProductStatus = async (productId, active) => {
  try {
    const response = await api.patch(`/admin/productos/${productId}/estado`, { activo: active });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const updateUserStatus = async (userId, active) => {
  try {
    const response = await api.patch(`/admin/usuarios/${userId}/estado`, { activo: active });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const updateProduct = async (productId, productData) => {
  try {
    const formData = new FormData();
    Object.keys(productData).forEach(key => {
      if (key === 'imagen' && productData[key]) {
        formData.append('imagen', productData[key]);
      } else if (productData[key] !== undefined) {
        formData.append(key, productData[key]);
      }
    });

    const response = await api.put(`/admin/productos/${productId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
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

    const response = await api.post('/admin/productos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const updateUser = async (userId, userData) => {
  try {
    const response = await api.put(`/admin/usuarios/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default {
  getUsers,
  getProducts,
  getStats,
  getCategories,
  updateProductStatus,
  updateUserStatus,
  updateProduct,
  createProduct,
  updateUser
};