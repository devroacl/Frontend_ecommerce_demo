import { Box, Button, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import ErrorIllustration from '../assets/404-illustration.svg';

const NotFoundPage = () => {
  const theme = useTheme();

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      textAlign: 'center',
      p: 3,
      bgcolor: theme.palette.background.default
    }}>
      <img 
        src={ErrorIllustration} 
        alt="Página no encontrada" 
        style={{ 
          width: '100%', 
          maxWidth: '500px', 
          marginBottom: '2rem' 
        }}
      />
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
        404 - Página no encontrada
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, maxWidth: '600px' }}>
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        size="large"
        sx={{
          px: 4,
          py: 1.5,
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: 3,
          },
          transition: 'all 0.3s ease',
        }}
      >
        Volver al inicio
      </Button>
    </Box>
  );
};

export default NotFoundPage;