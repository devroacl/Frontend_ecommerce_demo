import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Grid, CircularProgress } from '@mui/material';
import ProductCard from '../components/ProductCard';
import productService from '../api/productService'; // Importación corregida
import { useSelector } from 'react-redux';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);
  
  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Usando el método getMyProducts en lugar de fetchProducts
        const data = await productService.getMyProducts();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };
    loadProducts();
  }, [user?.token]); // Añadido el opcional "?" para evitar errores si user es null

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Mis Productos Publicados
      </Typography>
      
      <Button
        component={Link}
        to="/nuevo-producto"
        variant="contained"
        sx={{ mb: 4 }}
      >
        Nuevo Producto
      </Button>
    
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard product={product} isDashboard />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}