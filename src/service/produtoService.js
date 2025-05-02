import api from '../api/api';

export const productoService = {
  getAll: async () => {
    const response = await api.get("/productos/lista");
    return response.data;
  },
  
  getByCategory: async (categoria) => {
    const response = await api.get("/productos/lista");
    return response.data.filter(
      producto => producto.categoria?.nombre === categoria.toUpperCase()
    );
  }
};