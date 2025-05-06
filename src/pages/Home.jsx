// Home.jsx
import React from 'react';
import { useEffect } from 'react';
import { Grid, Container, Typography, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../store/productsSlice'; 

export default function Home() {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === 'loading') {
    return <CircularProgress sx={{ display: 'block', margin: '2rem auto' }} />;
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>Productos Destacados</Typography>
      <Grid container spacing={3}>
        {products?.slice(0, 6).map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}