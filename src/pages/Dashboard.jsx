import { useState, useEffect } from 'react';
import { Container, Typography, Button, Grid, CircularProgress } from '@mui/material';
import ProductCard from '../components/ProductCard';
import { getMisProductos, createProduct } from '../api/products';
import NewProductDialog from '../components/NewProductDialog';


export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await getMisProductos(user.token);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading products:', error);
        setLoading(false);
      }
    };
    loadProducts();
  }, [user.token]);

  const handleCreateProduct = async (productData) => {
    try {
      const response = await createProduct(productData, user.token);
      setProducts([...products, response.data]);
      setOpenDialog(false);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">Mis Productos</Typography>
        <Button
          variant="contained"
          onClick={() => setOpenDialog(true)}
        >
          Nuevo Producto
        </Button>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard product={product} isDashboard />
            </Grid>
          ))}
        </Grid>
      )}

      <NewProductDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleCreateProduct}
      />
    </Container>
  );
}