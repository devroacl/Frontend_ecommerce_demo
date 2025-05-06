import { Card, CardMedia, CardContent, Button, Typography } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardMedia
        component="img"
        height="200"
        image={product.imagen || '/placeholder.jpg'}
        alt={product.nombre}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">{product.nombre}</Typography>
        <Typography variant="body2" color="text.secondary">
          ${product.precio?.toLocaleString()}
        </Typography>
        <Button 
          fullWidth
          variant="contained" 
          startIcon={<AddShoppingCart />}
          onClick={() => dispatch(addToCart(product))}
          sx={{ mt: 2 }}
        >
          Añadir al carrito
        </Button>
      </CardContent>
    </Card>
  );
}