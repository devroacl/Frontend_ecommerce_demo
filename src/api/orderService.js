import api from './axiosConfig';

const orderService = {
  // Get seller's sales - matches PedidoRestController.getVentasDelVendedor
  getMySales: async () => {
    try {
      const response = await api.get('/pedidos/mis-ventas');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Error al obtener mis ventas' };
    }
  },
  
  // Get buyer's orders - matches PedidoRestController.getPedidosDelComprador
  getMyOrders: async () => {
    try {
      const response = await api.get('/pedidos/mis-pedidos');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Error al obtener mis pedidos' };
    }
  },
  
  // Confirm order - matches PedidoRestController.confirmarPedido
  confirmarPedido: async () => {
    try {
      const response = await api.post('/pedidos/confirmar');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Error al confirmar el pedido' };
    }
  }
};

export default orderService;