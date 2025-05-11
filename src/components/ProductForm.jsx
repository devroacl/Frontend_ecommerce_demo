
import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Grid, 
  Container, 
  Typography, 
  InputLabel, 
  Select, 
  MenuItem, 
  CircularProgress,
  Snackbar,
  Alert 
} from '@mui/material';
import { useSelector } from 'react-redux';
import productService from '../api/productService'; // Importación corregida
import { fetchCategories } from '../api/categories'; // Asumiendo endpoint GET /api/categorias

export default function ProductForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoriaId: '',
    imagen: null
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const { user } = useSelector((state) => state.auth);
  
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetchCategories();
        setCategories(response.data);
      } catch (err) {
        setError('Error cargando categorías');
      }
    };
    loadCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // No necesitamos crear un FormData aquí porque productService.createProduct ya lo hace
    try {
      await productService.createProduct(formData);
      setSuccess(true);
      setFormData({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        categoriaId: '',
        imagen: null
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Error creando producto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Publicar Nuevo Producto</Typography>
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre del Producto"
              variant="outlined"
              required
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descripción"
              multiline
              rows={4}
              required
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Precio"
              type="number"
              required
              inputProps={{ step: "0.01" }}
              value={formData.precio}
              onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Stock Disponible"
              type="number"
              required
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputLabel id="categoria-label">Categoría</InputLabel>
            <Select
              labelId="categoria-label"
              fullWidth
              required
              value={formData.categoriaId}
              onChange={(e) => setFormData({ ...formData, categoriaId: e.target.value })}
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.nombre}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={12} md={6}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="imagen-producto"
              type="file"
              onChange={(e) => setFormData({ ...formData, imagen: e.target.files[0] })}
            />
            <label htmlFor="imagen-producto">
              <Button 
                variant="contained" 
                component="span"
                fullWidth
                sx={{ height: '100%' }}
              >
                Subir Imagen
              </Button>
            </label>
            {formData.imagen && (
              <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                Archivo seleccionado: {formData.imagen.name}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <Button 
              type="submit" 
              variant="contained" 
              size="large" 
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Publicar Producto'}
            </Button>
          </Grid>
        </Grid>
      </form>

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success">Producto creado exitosamente!</Alert>
      </Snackbar>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Container>
  );
}