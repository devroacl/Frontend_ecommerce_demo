import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Button, 
  CircularProgress,
  Pagination,
  TextField,
  useTheme,
  Chip,
  Stack
} from '@mui/material';
import { Search, FilterList, ShoppingCart } from '@mui/icons-material';
import productService from '../../services/productService';
import { useDispatch } from 'react-redux';
import { addItem } from '../../context/cartSlice';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();

  const itemsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Obtener parámetros de la URL
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get('query') || '';
        const categoryId = searchParams.get('category') || null;
        
        setSearchQuery(query);
        setCategoryFilter(categoryId);

        let data;
        if (categoryId) {
          data = await productService.getProductsByCategory(categoryId);
        } else if (query) {
          data = await productService.searchProducts(query);
        } else {
          data = await productService.getProducts();
        }

        setProducts(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      } catch (err) {
        setError(err.message || 'Error al cargar productos');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [location.search]);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      navigate(`/products?query=${searchQuery}`);
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addItem({
      product,
      quantity: 1
    }));
  };

  const paginatedProducts = products.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

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
          variant="outlined" 
          onClick={() => window.location.reload()}
          sx={{ mt: 2 }}
        >
          Reintentar
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4, mb: 8, px: { xs: 2, md: 0 } }}>
      {/* Filtros y búsqueda */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          {categoryFilter ? 'Productos por categoría' : searchQuery ? `Resultados para "${searchQuery}"` : 'Todos los productos'}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleSearch}
            InputProps={{
              startAdornment: <Search sx={{ color: 'action.active', mr: 1 }} />,
            }}
            sx={{ maxWidth: 500 }}
          />
          
          <Button 
            variant="outlined" 
            startIcon={<FilterList />}
            sx={{ whiteSpace: 'nowrap' }}
          >
            Filtros
          </Button>
        </Box>
        
        {categoryFilter && (
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <Chip 
              label={`Categoría: ${categoryFilter}`}
              onDelete={() => {
                navigate('/products');
                setCategoryFilter(null);
              }}
            />
          </Stack>
        )}
      </Box>
      
      {/* Lista de productos */}
      {paginatedProducts.length > 0 ? (
        <>
          <Grid container spacing={4}>
            {paginatedProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: theme.shadows[4],
                  }
                }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.imagen || '/default-product.jpg'}
                    alt={product.nombre}
                    sx={{ objectFit: 'contain', p: 2 }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h3">
                      {product.nombre}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {product.descripcion.length > 100 
                        ? `${product.descripcion.substring(0, 100)}...` 
                        : product.descripcion}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      ${product.precio.toLocaleString()}
                    </Typography>
                    <Chip 
                      label={product.stock > 0 ? 'Disponible' : 'Agotado'} 
                      color={product.stock > 0 ? 'success' : 'error'} 
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                    <Button 
                      size="small" 
                      onClick={() => navigate(`/products/${product.id}`)}
                    >
                      Ver detalles
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<ShoppingCart />}
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock <= 0}
                    >
                      Añadir
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          {/* Paginación */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      ) : (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '50vh',
          textAlign: 'center',
          p: 3
        }}>
          <Typography variant="h5" gutterBottom>
            No se encontraron productos
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {searchQuery 
              ? `No hay resultados para "${searchQuery}"`
              : 'No hay productos disponibles en esta categoría'}
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/products')}
          >
            Ver todos los productos
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ProductListPage;