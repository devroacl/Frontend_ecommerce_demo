import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, List, ListItem, IconButton, TextField } from '@mui/material';
import { RemoveShoppingCart, ArrowBack } from '@mui/icons-material';
import { removeFromCart, updateQuantity } from '../store/cartSlice';

export default function Cart() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = items.reduce((sum, item) => sum + (item.precio * item.quantity), 0);

  if (items.length === 0) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>Tu carrito está vacío</Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/productos')}
        >
          Volver a la tienda
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Tu Carrito</Typography>
      
      <List>
        {items.map((item) => (
          <ListItem key={item.id} divider>
            <img 
              src={item.imagen} 
              alt={item.nombre} 
              style={{ width: 80, height: 80, marginRight: 16 }} 
            />
            
            <div style={{ flexGrow: 1 }}>
              <Typography variant="h6">{item.nombre}</Typography>
              <Typography>Precio unitario: ${item.precio.toLocaleString()}</Typography>
              
              <TextField
                type="number"
                value={item.quantity}
                onChange={(e) => dispatch(updateQuantity({
                  id: item.id,
                  quantity: Math.max(1, parseInt(e.target.value))
                }))}
                inputProps={{ min: 1 }}
                sx={{ width: 100, mt: 1 }}
              />
            </div>
            
            <IconButton 
              onClick={() => dispatch(removeFromCart(item.id))}
              color="error"
            >
              <RemoveShoppingCart />
            </IconButton>
          </ListItem>
        ))}
      </List>

      <Typography variant="h5" sx={{ mt: 3, textAlign: 'right' }}>
        Total: ${total.toLocaleString()}
      </Typography>

      <Button
        fullWidth
        variant="contained"
        size="large"
        sx={{ mt: 3 }}
        component={Link}
        to="/checkout"
      >
        Proceder al Pago
      </Button>
    </Container>
  );
}