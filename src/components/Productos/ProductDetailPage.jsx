import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Divider, 
  Chip,
  CircularProgress,
  Rating,
  TextField,
  useTheme
} from '@mui/material';
import { AddShoppingCart, ArrowBack, Favorite, FavoriteBorder } from '@mui/icons-material';
import productService from '../../services/productService';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../context/cartSlice';
import ReviewList from '../../components/products/ReviewList';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productService.getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message || 'Error al cargar el producto');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    dispatch(addItem({
      product,
      quantity: parseInt(quantity)
    }));
  };

  const handleQuantityChange = (e) => {
    const value = Math.max(1, Math.min(product.stock, Number(e.target.value)));
    setQuantity(value);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">{error}</Typography>
        <Button 
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ mt: 2 }}
        >
          Volver
        </Button>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Producto no encontrado</Typography>
        <Button 
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ mt: 2 }}
        >
          Volver
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4, mb: 8 }}>
      <Button 
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        Volver
      </Button>
      
      <Grid container spacing={4}>
        {/* Imágenes del producto */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 2 }}>
            <CardMedia
              component="img"
              height="400"
              image={product.imagen || '/default-product.jpg'}
              alt={product.nombre}
              sx={{ objectFit: 'contain', p: 2 }}
            />
            
            <Box sx={{ display: 'flex', p: 2, gap: 1 }}>
              {[product.imagen, ...(product.imagenesAdicionales || [])].map((img, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 60,
                    height: 60,
                    border: selectedImage === index ? `2px solid ${theme.palette.primary.main}` : '1px solid #ddd',
                    borderRadius: 1,
                    cursor: 'pointer',
                    overflow: 'hidden'
                  }}
                  onClick={() => setSelectedImage(index)}
                >
                  <img 
                    src={img || '/default-product.jpg'} 
                    alt={`Vista ${index + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>
        
        {/* Detalles del producto */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography variant="h3" gutterBottom>
              {product.nombre}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating 
                value={product.rating || 4.5} 
                precision={0.5} 
                readOnly 
                sx={{ mr: 1 }}
              />
              <Typography variant="body2" color="text.secondary">
                ({product.reviewCount || 24} reseñas)
              </Typography>
            </Box>
            
            <Typography variant="h4" color="primary" gutterBottom>
              ${product.precio.toLocaleString()}
            </Typography>
            
            <Chip 
              label={product.stock > 0 ? 'Disponible' : 'Agotado'} 
              color={product.stock > 0 ? 'success' : 'error'} 
              sx={{ mb: 2, alignSelf: 'flex-start' }}
            />
            
            <Typography variant="body1" paragraph sx={{ mb: 3 }}>
              {product.descripcion}
            </Typography>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Typography variant="body1" sx={{ mr: 2 }}>
                Cantidad:
              </Typography>
              <TextField
                type="number"
                size="small"
                value={quantity}
                onChange={handleQuantityChange}
                inputProps={{ 
                  min: 1, 
                  max: product.stock,
                  style: { width: '60px', textAlign: 'center' }
                }}
                sx={{ mr: 2 }}
              />
              <Typography variant="body2" color="text.secondary">
                {product.stock} disponibles
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
              <Button
                variant="contained"
                startIcon={<AddShoppingCart />}
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                sx={{
                  flexGrow: 1,
                  py: 1.5,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 2,
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Añadir al carrito
              </Button>
              
              <Button
                variant="outlined"
                startIcon={isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
                onClick={() => setIsFavorite(!isFavorite)}
                sx={{
                  minWidth: 'auto',
                  px: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 0, 0, 0.04)',
                  },
                }}
              />
            </Box>
            
            <Box sx={{ mt: 'auto' }}>
              <Typography variant="body2" color="text.secondary">
                Categoría: {product.categoria?.nombre || 'Sin categoría'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Vendido por: {product.vendedor?.nombre || 'Ecomarket'}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      
      {/* Reseñas */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Reseñas de clientes
        </Typography>
        <ReviewList productId={id} />
      </Box>
      
      {/* Productos relacionados */}
      {product.categoria && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" gutterBottom>
            Productos relacionados
          </Typography>
          {/* Aquí iría un componente de carrusel con productos de la misma categoría */}
        </Box>
      )}
    </Box>
  );
};

export default ProductDetailPage;