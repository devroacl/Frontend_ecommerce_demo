export const productoService = {
    getByVendedor: async () => {
      return api.get('/api/productos/mis-productos');
    },
    crearProducto: async (formData) => {
      return api.post('/api/productos', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    }
  };