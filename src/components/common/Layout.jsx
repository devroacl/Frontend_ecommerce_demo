import { Outlet } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Navbar from '../navbar/Navbar';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from '../../services/authService';
import { setUser } from '../../context/authSlice';

const Layout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    // Verificar autenticación al cargar el layout
    const verifyAuth = async () => {
      try {
        const userData = await checkAuth();
        dispatch(setUser(userData));
      } catch (error) {
        console.log('No hay usuario autenticado');
      }
    };
    
    verifyAuth();
  }, [dispatch]);

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: '#f9f9f9',
        }}
      >
        {/* Navbar */}
        <Navbar user={user} />
        
        {/* Contenido principal */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: 8, // Padding para el navbar fijo
            pb: 4, // Padding para el footer
          }}
        >
          <Outlet /> {/* Aquí se renderizan las páginas */}
        </Box>
        
        {/* Footer */}
        <Footer />
      </Box>
    </>
  );
};

export default Layout;