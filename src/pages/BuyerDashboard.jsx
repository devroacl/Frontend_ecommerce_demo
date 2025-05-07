import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function BuyerDashboard() {
  return (
    <Container sx={{ py: 4, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>
        Panel del Comprador
      </Typography>
      <Typography variant="h5" sx={{ mb: 4 }}>
        ¡Explora nuestros productos!
      </Typography>
      <Button 
        component={Link}
        to="/productos"
        variant="contained"
        size="large"
      >
        Ver Catálogo
      </Button>
    </Container>
  );
}