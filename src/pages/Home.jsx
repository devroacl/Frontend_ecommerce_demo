import React from 'react';
import { useEffect } from 'react';
import { Grid, Container, Typography, CircularProgress, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../store/productsSlice'; 

export default function Home() {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === 'loading') {
    return <CircularProgress sx={{ display: 'block', margin: '2rem auto' }} />;
  }

  if (status === 'failed') {
    return (
      <Typography variant="h6" color="error" sx={{ textAlign: 'center', mt: 4 }}>
        Error: {error}
      </Typography>
    );
  }
  if (!products?.length && status === 'succeeded') {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h5" color="text.secondary">
          No hay productos disponibles. ¡Prueba agregando algunos!
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 4 }}>
        Productos Destacados
      </Typography>
      <Grid container spacing={3}>
        {products.slice(0, 6).map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}