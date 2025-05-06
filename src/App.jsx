import { CssBaseline } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes } from './RouterConfig';
import { checkAuth } from './services/authService';
import { setUser } from './context/authSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Verificar autenticación al cargar la app
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
      <Routes />
    </>
  );
}

export default App;