// service/produtoService.js
import api from '../api/api'

export const productoService = {
  getAll: async () => {
    return api.get("/productos/lista");
  },
  
  getByCategory: async (categoria) => {
    const response = await api.get("/productos/lista");
    return response.data.filter(
      producto => producto.categoria?.nombre === categoria
    );
  }
};