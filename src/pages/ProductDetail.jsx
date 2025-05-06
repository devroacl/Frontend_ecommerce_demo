import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography, Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <CircularProgress />;

  return (
    <Grid container spacing={4} sx={{ p: 4 }}>
      <Grid item xs={12} md={6}>
        <img 
          src={product.imagen} 
          alt={product.nombre} 
          style={{ width: '100%', borderRadius: '8px' }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h2">{product.nombre}</Typography>
        <Typography variant="h4" sx={{ my: 2 }}>
          ${product.precio?.toLocaleString()}
        </Typography>
        <Typography paragraph>{product.descripcion}</Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => dispatch(addToCart(product))}
        >
          Añadir al carrito
        </Button>
      </Grid>
    </Grid>
  );
}