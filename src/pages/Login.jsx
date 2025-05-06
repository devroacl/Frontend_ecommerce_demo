import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { login } from '../api/auth';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';

export default function Login() {
  const [credentials, setCredentials] = useState({ correo: '', contrasena: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login(credentials);
      dispatch(loginSuccess(userData));
      navigate(userData.rol === 'ROLE_VENDEDOR' ? '/dashboard' : '/');
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4">Iniciar Sesión</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Correo electrónico"
            type="email"
            value={credentials.correo}
            onChange={(e) => setCredentials({ ...credentials, correo: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Contraseña"
            type="password"
            value={credentials.contrasena}
            onChange={(e) => setCredentials({ ...credentials, contrasena: e.target.value })}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Ingresar
          </Button>
          <Typography>
            ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}