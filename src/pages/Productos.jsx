import React, { useEffect, useState } from 'react';
import { Container, Grid, TextField, Typography, CircularProgress } from '@mui/material';
import ProductCard from '../components/ProductCard';
import productService from '../api/productService'; // Changed to import the default export
import { useDispatch, useSelector } from 'react-redux';

export default function Productos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Using getAvailableProducts from the imported service
        const response = await productService.getAvailableProducts();
        // Since getAvailableProducts already returns response.data, we don't need .data here
        setFilteredProducts(response);
        setLoading(false);
      } catch (error) {
        console.error('Error loading products:', error);
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm) {
        const results = products.filter(product =>
          product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(results);
      } else {
        setFilteredProducts(products);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, products]);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>Nuestros Productos</Typography>
      
      <TextField
        fullWidth
        label="Buscar productos..."
        variant="outlined"
        sx={{ mb: 4 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {filteredProducts?.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}