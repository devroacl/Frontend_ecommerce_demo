import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, MenuItem } from '@mui/material';
import { register } from '../api/auth';

export default function Register() {
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    rut: '',
    tipolUsuario: 'COMPRADOR'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userData.rut || !/^\d{7,8}-[\dkK]$/.test(userData.rut)) {
      setError('RUT inválido (Ej: 12345678-9)');
      return;
    }

    try {
      await register(userData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Error en el registro');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4">Registro de Usuario</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Nombre"
            value={userData.nombre}
            onChange={(e) => setUserData({ ...userData, nombre: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Apellido"
            value={userData.apellido}
            onChange={(e) => setUserData({ ...userData, apellido: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Correo electrónico"
            type="email"
            value={userData.correo}
            onChange={(e) => setUserData({ ...userData, correo: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Contraseña"
            type="password"
            value={userData.contrasena}
            onChange={(e) => setUserData({ ...userData, contrasena: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="RUT"
            placeholder="12345678-9"
            value={userData.rut}
            onChange={(e) => setUserData({ ...userData, rut: e.target.value })}
          />
          <TextField
            select
            margin="normal"
            required
            fullWidth
            label="Tipo de Usuario"
            value={userData.tipolUsuario}
            onChange={(e) => setUserData({ ...userData, tipolUsuario: e.target.value })}
          >
            <MenuItem value="COMPRADOR">Comprador</MenuItem>
            <MenuItem value="VENDEDOR">Vendedor</MenuItem>
          </TextField>
          
          {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Registrarse
          </Button>
          
          <Typography>
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}