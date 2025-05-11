import api from './axiosConfig';

const cartService = {
  // Confirm order - matches CarritoRestController.confirmarPedido
  confirmOrder: async () => {
    try {
      const response = await api.post('/carrito/confirmar');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Error al confirmar el pedido' };
    }
  }
  
  // Note: You may need to add more cart endpoints if they exist in your backend
  // but weren't included in the provided controller files
};

export default cartService;