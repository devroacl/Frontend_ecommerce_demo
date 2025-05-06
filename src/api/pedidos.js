import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const getMisPedidos = async (token) => {
  return await axios.get(`${API_URL}/pedidos/mis-pedidos`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const confirmarPedido = async (token) => {
  return await axios.post(`${API_URL}/carrito/confirmar`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
};