
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  TextField, 
  Button, 
  Container, 
  Typography, 
  Box, 
  CircularProgress, 
  Alert,
  Paper
} from '@mui/material';
import authService from '../api/authService'; // Changed to import the default export
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';

function Login() {
  const [credentials, setCredentials] = useState({ 
    correo: '', 
    contrasena: '' 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const userData = await authService.login({ // Changed to use authService.login
        correo: credentials.correo,
        contrasena: credentials.contrasena
      });
      
      dispatch(loginSuccess(userData));
      
      // Redirigir según el rol del usuario
      if (userData.rol === 'ROLE_VENDEDOR') {
        navigate('/dashboard');
      } else if (userData.rol === 'ROLE_ADMIN') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Error de inicio de sesión:', err);
      
      if (err.message === 'Tiempo de espera agotado') {
        setError('El servidor está tardando en responder. Por favor, intenta nuevamente.');
      } else if (err.response) {
        // El servidor respondió con un código de error
        setError(err.response.data?.error || 'Credenciales inválidas');
      } else if (err.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        setError('No se pudo conectar con el servidor. Por favor, verifica tu conexión.');
      } else {
        // Error al configurar la solicitud
        setError('Error al procesar tu solicitud. Por favor, intenta nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Iniciar Sesión
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <Box 
            component="form" 
            onSubmit={handleSubmit} 
            sx={{ width: '100%' }}
            noValidate
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="correo"
              label="Correo electrónico"
              name="correo"
              type="email"
              autoComplete="email"
              value={credentials.correo}
              onChange={handleChange}
              autoFocus
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="contrasena"
              name="contrasena"
              label="Contraseña"
              type="password"
              autoComplete="current-password"
              value={credentials.contrasena}
              onChange={handleChange}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Ingresar'}
            </Button>
            
            <Box textAlign="center" mt={2}>
              <Typography variant="body2">
                ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;