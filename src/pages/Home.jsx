import { useEffect } from 'react';
import { Grid, Container, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../api/products';

export default function Home() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    getProducts().then((response) => {
      // Dispatch para guardar en el estado (agregar slice de productos si es necesario)
    });
  }, []);

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