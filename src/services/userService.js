import api from './api';

const getProfile = async () => {
  try {
    const response = await api.get('/usuario/perfil');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const getWishlist = async () => {
  try {
    const response = await api.get('/usuario/lista-deseos');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default {
  getProfile,
  getWishlist
};