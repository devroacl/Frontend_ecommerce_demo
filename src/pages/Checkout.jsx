import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Added missing import
import { Container, Typography, Button, List, ListItem, Divider, CircularProgress } from '@mui/material';
import orderService from '../api/orderService'; // Changed to import the default export
import { clearCart } from '../store/cartSlice';

export default function Checkout() {
  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = items.reduce((sum, item) => sum + (item.precio * item.quantity), 0);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      // Changed to use orderService.confirmarPedido
      const response = await orderService.confirmarPedido(user.token);
      setOrderId(response.id); // Removed .data since your service returns response.data
      dispatch(clearCart());
    } catch (error) {
      console.error('Error confirming order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          ¡Pedido Confirmado!
        </Typography>
        <Typography variant="h6">
          Número de seguimiento: #{orderId}
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 3 }}
          onClick={() => navigate('/mis-pedidos')}
        >
          Ver mis pedidos
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Confirmación de Pedido</Typography>
      
      <List>
        {items.map((item) => (
          <ListItem key={item.id}>
            <Typography>
              {item.nombre} x{item.quantity} - ${(item.precio * item.quantity).toLocaleString()}
            </Typography>
          </ListItem>
        ))}
        <Divider sx={{ my: 2 }} />
        <ListItem>
          <Typography variant="h6">
            Total: ${total.toLocaleString()}
          </Typography>
        </ListItem>
      </List>

      <Button
        fullWidth
        variant="contained"
        size="large"
        disabled={loading || items.length === 0}
        onClick={handleConfirm}
      >
        {loading ? <CircularProgress size={24} /> : 'Confirmar Pedido'}
      </Button>
    </Container>
  );
}