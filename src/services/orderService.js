import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const getUserOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/pedidos/mis-pedidos`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const getSellerSales = async () => {
  try {
    const response = await axios.get(`${API_URL}/pedidos/mis-ventas`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const getSalesStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/pedidos/estadisticas`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const createOrder = async (cartData) => {
  try {
    const response = await axios.post(`${API_URL}/carrito/confirmar`, cartData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const getOrderDetails = async (orderId) => {
  try {
    const response = await axios.get(`${API_URL}/pedidos/${orderId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default {
  getUserOrders,
  getSellerSales,
  getSalesStats,
  createOrder,
  getOrderDetails
};