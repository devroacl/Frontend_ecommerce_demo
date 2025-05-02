import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme as useCustomTheme } from '../../context/themeContext';

export default function Footer() {
  const { colors } = useCustomTheme();

  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: colors.background,
        color: colors.text,
        py: 4,
        mt: 'auto'
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto', textAlign: 'center' }}>
        <Link 
          component={RouterLink} 
          to="/contacto" 
          sx={{ color: colors.primary, mr: 2 }}
        >
          Contacto
        </Link>
        <Typography variant="body2" sx={{ mt: 2 }}>
          © {new Date().getFullYear()} Tu Ecommerce
        </Typography>
      </Box>
    </Box>
  );
}