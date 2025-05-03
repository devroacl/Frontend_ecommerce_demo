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
  useTheme,
  Tabs,
  Tab,
  Badge,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { 
  AddShoppingCart, 
  ArrowBack, 
  Favorite, 
  FavoriteBorder,
  ExpandMore,
  Star,
  StarHalf,
  StarBorder
} from '@mui/icons-material';
import productService from '../../services/productService';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../context/cartSlice';
import { styled } from '@mui/material/styles';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const productData = await productService.getProductById(id);
        setProduct(productData);
        
        // Obtener productos relacionados si hay categoría
        if (productData.categoria?.id) {
          const related = await productService.getProductsByCategory(productData.categoria.id);
          setRelatedProducts(related.filter(p => p.id !== productData.id).slice(0, 4));
        }
      } catch (err) {
        setError(err.message || 'Error al cargar el producto');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProductData();
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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
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
        {/* Galería de imágenes */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <Box sx={{ position: 'relative', pt: '100%' }}>
              <CardMedia
                component="img"
                image={product.imagen || '/default-product.jpg'}
                alt={product.nombre}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  p: 2
                }}
              />
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              p: 2, 
              gap: 1,
              overflowX: 'auto',
              '&::-webkit-scrollbar': {
                height: '6px'
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: theme.palette.grey[400],
                borderRadius: '3px'
              }
            }}>
              {[product.imagen, ...(product.imagenesAdicionales || [])].map((img, index) => (
                <Box
                  key={index}
                  sx={{
                    flexShrink: 0,
                    width: 80,
                    height: 80,
                    border: selectedImage === index ? `2px solid ${theme.palette.primary.main}` : '1px solid #ddd',
                    borderRadius: 1,
                    cursor: 'pointer',
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                  onClick={() => setSelectedImage(index)}
                >
                  <img 
                    src={img || '/default-product.jpg'} 
                    alt={`Vista ${index + 1}`}
                    style={{ 
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>
        
        {/* Información del producto */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
              {product.nombre}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <StyledRating
                value={product.rating || 4.5}
                precision={0.5}
                readOnly
                icon={<Star fontSize="inherit" />}
                emptyIcon={<StarBorder fontSize="inherit" />}
                sx={{ mr: 1 }}
              />
              <Typography variant="body2" color="text.secondary">
                ({product.reviewCount || 24} reseñas) | {product.vendidos || 0} vendidos
              </Typography>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="h4" color="primary" component="span" sx={{ fontWeight: 'bold' }}>
                ${product.precio.toLocaleString()}
              </Typography>
              {product.precioOriginal && (
                <Typography 
                  variant="body1" 
                  color="text.secondary" 
                  component="span" 
                  sx={{ 
                    textDecoration: 'line-through',
                    ml: 1.5
                  }}
                >
                  ${product.precioOriginal.toLocaleString()}
                </Typography>
              )}
              {product.descuento && (
                <Chip 
                  label={`${product.descuento}% OFF`} 
                  color="error" 
                  size="small"
                  sx={{ ml: 1.5 }}
                />
              )}
            </Box>
            
            <Chip 
              label={product.stock > 0 ? 'Disponible' : 'Agotado'} 
              color={product.stock > 0 ? 'success' : 'error'} 
              sx={{ 
                mb: 3, 
                alignSelf: 'flex-start',
                fontWeight: 'bold'
              }}
            />
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" paragraph>
                {product.descripcionCorta}
              </Typography>
              
              <List dense sx={{ py: 0 }}>
                {product.caracteristicas?.map((caract, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemText 
                      primary={`• ${caract}`}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
            
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
                  style: { 
                    width: '60px', 
                    textAlign: 'center',
                    MozAppearance: 'textfield'
                  }
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
                  fontWeight: 'bold',
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
                <strong>Categoría:</strong> {product.categoria?.nombre || 'Sin categoría'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Vendido por:</strong> {product.vendedor?.nombre || 'Ecomarket'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Envío:</strong> {product.envioGratis ? 'Gratis' : `$${product.costoEnvio?.toLocaleString() || 'Calculado al finalizar compra'}`}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      
      {/* Tabs para detalles y reseñas */}
      <Box sx={{ mt: 6 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            mb: 3
          }}
        >
          <Tab label="Descripción" />
          <Tab label="Especificaciones" />
          <Tab label={`Reseñas (${product.reviewCount || 0})`} />
        </Tabs>
        
        {tabValue === 0 && (
          <Box sx={{ p: 2 }}>
            <Typography variant="body1" paragraph>
              {product.descripcionLarga || product.descripcion || 'No hay descripción disponible.'}
            </Typography>
          </Box>
        )}
        
        {tabValue === 1 && (
          <Box sx={{ p: 2 }}>
            {product.especificaciones?.length > 0 ? (
              <List dense>
                {product.especificaciones.map((spec, index) => (
                  <ListItem key={index} sx={{ py: 1 }}>
                    <ListItemText 
                      primary={spec.nombre}
                      secondary={spec.valor}
                      secondaryTypographyProps={{ color: 'text.primary' }}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body1" color="text.secondary">
                No hay especificaciones disponibles.
              </Typography>
            )}
          </Box>
        )}
        
        {tabValue === 2 && (
          <Box sx={{ p: 2 }}>
            {product.resenas?.length > 0 ? (
              <>
                {product.resenas.map((review, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Avatar src={review.usuario.avatar} sx={{ mr: 2 }} />
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          {review.usuario.nombre}
                        </Typography>
                        <Rating 
                          value={review.rating} 
                          precision={0.5} 
                          readOnly 
                          size="small" 
                        />
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {new Date(review.fecha).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body1">
                      {review.comentario}
                    </Typography>
                    <Divider sx={{ mt: 2 }} />
                  </Box>
                ))}
              </>
            ) : (
              <Typography variant="body1" color="text.secondary">
                No hay reseñas aún. Sé el primero en opinar.
              </Typography>
            )}
            
            <Accordion sx={{ mt: 3 }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>Escribir una reseña</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Para escribir una reseña, debes haber comprado este producto.
                </Typography>
                <Button 
                  variant="outlined" 
                  disabled
                >
                  Escribir reseña
                </Button>
              </AccordionDetails>
            </Accordion>
          </Box>
        )}
      </Box>
      
      {/* Productos relacionados */}
      {relatedProducts.length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            Productos relacionados
          </Typography>
          <Grid container spacing={3}>
            {relatedProducts.map((relatedProduct) => (
              <Grid item xs={6} sm={4} md={3} key={relatedProduct.id}>
                <Card 
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: theme.shadows[4],
                    }
                  }}
                  onClick={() => navigate(`/products/${relatedProduct.id}`)}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={relatedProduct.imagen || '/default-product.jpg'}
                    alt={relatedProduct.nombre}
                    sx={{ objectFit: 'contain', p: 1 }}
                  />
                  <CardContent>
                    <Typography variant="subtitle1" noWrap>
                      {relatedProduct.nombre}
                    </Typography>
                    <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold' }}>
                      ${relatedProduct.precio.toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default ProductDetailPage;