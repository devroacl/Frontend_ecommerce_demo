import { Box, Container, Grid, Typography, Link } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Columna 1: Información */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Ecomarket
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              La mejor plataforma para comprar y vender productos en línea.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Link href="#" color="inherit">
                <Facebook />
              </Link>
              <Link href="#" color="inherit">
                <Twitter />
              </Link>
              <Link href="#" color="inherit">
                <Instagram />
              </Link>
              <Link href="#" color="inherit">
                <LinkedIn />
              </Link>
            </Box>
          </Grid>

          {/* Columna 2: Enlaces rápidos */}
          <Grid item xs={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Enlaces
            </Typography>
            <Link href="/" color="inherit" underline="hover" display="block" mb={1}>
              Inicio
            </Link>
            <Link href="/products" color="inherit" underline="hover" display="block" mb={1}>
              Productos
            </Link>
            <Link href="/about" color="inherit" underline="hover" display="block" mb={1}>
              Sobre Nosotros
            </Link>
            <Link href="/contact" color="inherit" underline="hover" display="block" mb={1}>
              Contacto
            </Link>
          </Grid>

          {/* Columna 3: Legal */}
          <Grid item xs={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Legal
            </Typography>
            <Link href="#" color="inherit" underline="hover" display="block" mb={1}>
              Términos
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block" mb={1}>
              Privacidad
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block" mb={1}>
              Cookies
            </Link>
          </Grid>

          {/* Columna 4: Contacto */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contacto
            </Typography>
            <Typography variant="body2" display="block" mb={1}>
              contacto@ecomarket.cl
            </Typography>
            <Typography variant="body2" display="block" mb={1}>
              +56 9 1234 5678
            </Typography>
            <Typography variant="body2" display="block">
              Santiago, Chile
            </Typography>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box sx={{ pt: 4, textAlign: 'center' }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} Ecomarket. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;