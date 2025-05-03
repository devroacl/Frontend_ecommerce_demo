import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Tabs, 
  Tab, 
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Button,
  useTheme
} from '@mui/material';
import {
  ShoppingBag as OrdersIcon,
  Favorite as WishlistIcon,
  Person as ProfileIcon,
  LocalShipping as ShippingIcon,
  Payment as PaymentIcon,
  Star as ReviewIcon
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import orderService from '../../services/orderService';
import userService from '../../services/userService';
import { setUser } from '../../context/authSlice';
import OrderCard from '../../components/dashboard/OrderCard';
import ProfileForm from '../../components/dashboard/ProfileForm';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const BuyerDashboard = () => {
  const [value, setValue] = useState(0);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState({
    orders: true,
    profile: true,
    wishlist: true
  });
  const [error, setError] = useState(null);
  const theme = useTheme();
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(prev => ({ ...prev, orders: true, profile: true, wishlist: true }));
        
        const [ordersData, userData, wishlistData] = await Promise.all([
          orderService.getUserOrders(),
          userService.getProfile(),
          userService.getWishlist()
        ]);
        
        setOrders(ordersData);
        dispatch(setUser(userData));
        setWishlist(wishlistData);
        
      } catch (err) {
        setError(err.message || 'Error al cargar datos');
      } finally {
        setLoading(prev => ({
          ...prev,
          orders: false,
          profile: false,
          wishlist: false
        }));
      }
    };
    
    fetchData();
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOrderClick = (orderId) => {
    // Navegar a la página de detalle del pedido
    console.log('Ver detalle del pedido:', orderId);
  };

  const handleRemoveFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
    // Aquí deberías llamar al servicio para actualizar en el backend
  };

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => window.location.reload()}
        >
          Reintentar
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: 'calc(100vh - 64px)',
      mt: 8,
      backgroundColor: '#f9f9f9'
    }}>
      {/* Menú lateral */}
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={{
          borderRight: 1,
          borderColor: 'divider',
          minWidth: 250,
          bgcolor: 'background.paper',
          boxShadow: theme.shadows[2]
        }}
      >
        <Tab 
          label="Mis Pedidos" 
          icon={<OrdersIcon />} 
          iconPosition="start" 
          sx={{ 
            justifyContent: 'flex-start',
            minHeight: 56
          }} 
        />
        <Tab 
          label="Lista de Deseos" 
          icon={<WishlistIcon />} 
          iconPosition="start" 
          sx={{ 
            justifyContent: 'flex-start',
            minHeight: 56
          }} 
        />
        <Tab 
          label="Mi Perfil" 
          icon={<ProfileIcon />} 
          iconPosition="start" 
          sx={{ 
            justifyContent: 'flex-start',
            minHeight: 56
          }} 
        />
        <Tab 
          label="Direcciones" 
          icon={<ShippingIcon />} 
          iconPosition="start" 
          sx={{ 
            justifyContent: 'flex-start',
            minHeight: 56
          }} 
        />
        <Tab 
          label="Métodos de Pago" 
          icon={<PaymentIcon />} 
          iconPosition="start" 
          sx={{ 
            justifyContent: 'flex-start',
            minHeight: 56
          }} 
        />
        <Tab 
          label="Mis Reseñas" 
          icon={<ReviewIcon />} 
          iconPosition="start" 
          sx={{ 
            justifyContent: 'flex-start',
            minHeight: 56
          }} 
        />
      </Tabs>
      
      {/* Contenido principal */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <TabPanel value={value} index={0}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            Mis Pedidos
          </Typography>
          
          {loading.orders ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : orders.length === 0 ? (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              minHeight: '50vh',
              textAlign: 'center'
            }}>
              <OrdersIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                No tienes pedidos recientes
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Cuando realices un pedido, aparecerá aquí
              </Typography>
              <Button 
                variant="contained" 
                href="/products"
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
                Comprar ahora
              </Button>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {orders.map((order) => (
                <Grid item xs={12} key={order.id}>
                  <OrderCard 
                    order={order} 
                    onClick={() => handleOrderClick(order.id)} 
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </TabPanel>
        
        <TabPanel value={value} index={1}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            Lista de Deseos
          </Typography>
          
          {loading.wishlist ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : wishlist.length === 0 ? (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              minHeight: '50vh',
              textAlign: 'center'
            }}>
              <WishlistIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Tu lista de deseos está vacía
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Guarda productos que te interesen para verlos después
              </Typography>
              <Button 
                variant="contained" 
                href="/products"
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
                Explorar productos
              </Button>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {wishlist.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={product.imagen || '/default-product.jpg'}
                      alt={product.nombre}
                      sx={{ objectFit: 'contain', p: 2 }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h6">
                        {product.nombre}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ${product.precio.toLocaleString()}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                      <Button 
                        size="small" 
                        href={`/products/${product.id}`}
                      >
                        Ver producto
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleRemoveFromWishlist(product.id)}
                      >
                        Eliminar
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </TabPanel>
        
        <TabPanel value={value} index={2}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            Mi Perfil
          </Typography>
          
          {loading.profile ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <ProfileForm user={user} />
          )}
        </TabPanel>
        
        <TabPanel value={value} index={3}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            Mis Direcciones
          </Typography>
          <Card>
            <CardContent>
              <Typography variant="body1">
                Aquí podrás gestionar tus direcciones de envío
              </Typography>
              {/* Implementar gestión de direcciones */}
            </CardContent>
          </Card>
        </TabPanel>
        
        <TabPanel value={value} index={4}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            Métodos de Pago
          </Typography>
          <Card>
            <CardContent>
              <Typography variant="body1">
                Aquí podrás gestionar tus métodos de pago
              </Typography>
              {/* Implementar gestión de métodos de pago */}
            </CardContent>
          </Card>
        </TabPanel>
        
        <TabPanel value={value} index={5}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            Mis Reseñas
          </Typography>
          <Card>
            <CardContent>
              <Typography variant="body1">
                Aquí podrás ver y gestionar tus reseñas
              </Typography>
              {/* Implementar gestión de reseñas */}
            </CardContent>
          </Card>
        </TabPanel>
      </Box>
    </Box>
  );
};

export default BuyerDashboard;