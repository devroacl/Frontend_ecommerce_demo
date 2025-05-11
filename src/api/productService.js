import api from './axiosConfig';

const productService = {
  // Get all available products - matches ProductoRestController.getProductosDisponibles
  getAvailableProducts: async () => {
    try {
      const response = await api.get('/productos/disponibles');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Error al obtener productos' };
    }
  },
  
  // Get product by ID - matches ProductoRestController.getProductoById
  getProductById: async (productId) => {
    try {
      const response = await api.get(`/productos/${productId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Error al obtener el producto' };
    }
  },
  
  // Get products by category - matches ProductoRestController.getProductosByCategoria
  getProductsByCategory: async (categoryId) => {
    try {
      const response = await api.get(`/productos/categoria/${categoryId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Error al obtener productos por categoría' };
    }
  },
  
  // Search products - matches ProductoRestController.buscarProductos
  searchProducts: async (query) => {
    try {
      const response = await api.get(`/productos/buscar?query=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Error al buscar productos' };
    }
  },
  
  // === VENDEDOR ENDPOINTS ===
  
  // Create product - matches ProductoRestController.crearProducto
  createProduct: async (productData) => {
    try {
      // Create FormData for multipart/form-data (for image upload)
      const formData = new FormData();
      
      // Add text fields
      formData.append('nombre', productData.nombre);
      formData.append('descripcion', productData.descripcion);
      formData.append('precio', productData.precio);
      formData.append('stock', productData.stock);
      formData.append('categoriaId', productData.categoriaId);
      
      // Add image if it exists
      if (productData.imagen) {
        formData.append('imagen', productData.imagen);
      }
      
      const response = await api.post('/productos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Error al crear producto' };
    }
  },
  
  // Get seller's products - matches ProductoRestController.getMisProductos
  getMyProducts: async () => {
    try {
      const response = await api.get('/productos/mis-productos');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Error al obtener mis productos' };
    }
  },
  
  // Update product - matches ProductoRestController.actualizarProducto
  updateProduct: async (productId, productData) => {
    try {
      // Create FormData for multipart/form-data (for image upload)
      const formData = new FormData();
      
      // Add only the fields that are present
      if (productData.nombre) formData.append('nombre', productData.nombre);
      if (productData.descripcion) formData.append('descripcion', productData.descripcion);
      if (productData.precio) formData.append('precio', productData.precio);
      if (productData.stock) formData.append('stock', productData.stock);
      if (productData.categoriaId) formData.append('categoriaId', productData.categoriaId);
      if (productData.imagen) formData.append('imagen', productData.imagen);
      
      const response = await api.put(`/productos/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Error al actualizar producto' };
    }
  },
  
  // Change product status (ADMIN) - matches ProductoRestController.cambiarEstadoProducto
  changeProductStatus: async (productId, isActive) => {
    try {
      const response = await api.patch(`/productos/${productId}/estado?activo=${isActive}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Error al cambiar estado del producto' };
    }
  }
};

export default productService;