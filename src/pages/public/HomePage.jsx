import { useEffect, useState } from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import ProductCarousel from '../../components/products/ProductCarousel';
import CategoryGrid from '../../components/products/CategoryGrid';
import HeroSlider from '../../components/common/HeroSlider';
import productService from '../../services/productService';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const featured = await productService.getFeaturedProducts();
        const newProducts = await productService.getNewArrivals();
        setFeaturedProducts(featured);
        setNewArrivals(newProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  return (
    <Box sx={{ mt: 4 }}>
      {/* Hero Slider */}
      <HeroSlider />
      
      {/* Featured Products */}
      <Box sx={{ my: 8 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          Productos Destacados
        </Typography>
        <ProductCarousel products={featuredProducts} loading={loading} />
      </Box>
      
      {/* Categories Grid */}
      <Box sx={{ my: 8 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          Explora por Categorías
        </Typography>
        <CategoryGrid />
      </Box>
      
      {/* New Arrivals */}
      <Box sx={{ my: 8 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          Nuevos Productos
        </Typography>
        <ProductCarousel products={newArrivals} loading={loading} />
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button 
            component={Link} 
            to="/products" 
            variant="contained" 
            size="large"
            sx={{
              bgcolor: theme.palette.secondary.main,
              '&:hover': {
                bgcolor: theme.palette.secondary.dark,
                transform: 'scale(1.05)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Ver Todos los Productos
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;