import { useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  TextField,
  Divider,
  CircularProgress,
  useTheme
} from '@mui/material';
import { 
  Delete as DeleteIcon, 
  ShoppingCart as ShoppingCartIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  removeItem, 
  updateQuantity, 
  clearCart 
} from '../../context/cartSlice';
import orderService from '../../services/orderService';

const CartPage = () => {
  const { items, total, loading } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleQuantityChange = (productId, newQuantity) => {
    dispatch(updateQuantity({ 
      id: productId, 
      quantity: Math.max(1, newQuantity)
    }));
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeItem(productId));
  };

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await orderService.createOrder({ items });
      dispatch(clearCart());
      navigate('/buyer-dashboard');
    } catch (error) {
      console.error('Error al confirmar pedido:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (items.length === 0) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '50vh',
        textAlign: 'center',
        p: 3
      }}>
        <ShoppingCartIcon sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          Tu carrito está vacío
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Explora nuestros productos y añade algo especial a tu carrito
        </Typography>
        <Button 
          variant="contained" 
          component={Link} 
          to="/products"
          sx={{
            px: 4,
            py: 1.5,
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: 2,
            },
            transition: 'all 0.3s ease',
          }}
        >
          Ver productos
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h4" gutterBottom>
        Mi Carrito
      </Typography>
      
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Producto</TableCell>
              <TableCell align="center">Precio</TableCell>
              <TableCell align="center">Cantidad</TableCell>
              <TableCell align="center">Subtotal</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.product.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img 
                      src={item.product.imagen || '/default-product.jpg'} 
                      alt={item.product.nombre}
                      style={{ 
                        width: 60, 
                        height: 60, 
                        objectFit: 'cover',
                        marginRight: 16,
                        borderRadius: theme.shape.borderRadius
                      }}
                    />
                    <Typography variant="body1">
                      {item.product.nombre}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  ${item.product.precio.toLocaleString()}
                </TableCell>
                <TableCell align="center">
                  <TextField
                    type="number"
                    size="small"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(
                      item.product.id, 
                      parseInt(e.target.value)
                    )}
                    inputProps={{ 
                      min: 1, 
                      style: { 
                        width: '50px', 
                        textAlign: 'center' 
                      }
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  ${(item.product.precio * item.quantity).toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  <IconButton 
                    onClick={() => handleRemoveItem(item.product.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Button
            component={Link}
            to="/products"
            startIcon={<ArrowBackIcon />}
            sx={{ textTransform: 'none' }}
          >
            Continuar comprando
          </Button>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Resumen del pedido
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Subtotal:</Typography>
              <Typography>${total.toLocaleString()}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Envío:</Typography>
              <Typography>$0</Typography>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="subtitle1">Total:</Typography>
              <Typography variant="subtitle1">${total.toLocaleString()}</Typography>
            </Box>
            
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleCheckout}
              sx={{
                py: 1.5,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 3,
                },
                transition: 'all 0.3s ease',
              }}
            >
              Proceder al pago
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartPage;