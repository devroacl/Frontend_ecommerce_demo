// Register.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  TextField, 
  Button, 
  Container, 
  Typography, 
  Box, 
  FormControl, 
  FormLabel, 
  RadioGroup, 
  FormControlLabel, 
  Radio,
  CircularProgress,
  Alert,
  Paper
} from '@mui/material';
import { register } from '../api/auth';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    rut: '',
    userType: 'COMPRADOR'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Función para formatear RUT chileno
  const formatearRut = (rutInput) => {
    // Eliminar puntos y guiones
    let rut = rutInput.replace(/\./g, '').replace(/-/g, '').trim();
    
    // Separar número y dígito verificador
    let rutNumero = rut.slice(0, -1);
    let dv = rut.slice(-1).toUpperCase();
    
    // Formatear con puntos y guión
    let resultado = '';
    for (let i = rutNumero.length; i > 0; i -= 3) {
      const start = Math.max(0, i - 3);
      resultado = rutNumero.substring(start, i) + (resultado ? '.' + resultado : '');
    }
    
    return resultado + '-' + dv;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const formattedRut = formatearRut(formData.rut);
      
      const userData = {
        correo: formData.email,
        contrasena: formData.password,
        nombre: formData.firstName,
        apellido: formData.lastName,
        rut: formattedRut,
        tipoUsuario: formData.userType
      };
      
      const response = await register(userData);
      console.log('Registro exitoso:', response.data);
      
      // Redirigir a login después del registro exitoso
      navigate('/login');
    } catch (err) {
      console.error('Error durante el registro:', err);
      
      // Manejar diferentes tipos de errores
      if (err.response) {
        // El servidor respondió con un código de error
        setError(err.response.data.error || 'Error en el registro. Por favor, intenta nuevamente.');
      } else if (err.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        setError('No se pudo conectar con el servidor. Por favor, verifica tu conexión e intenta nuevamente.');
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
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Registro de Usuario
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="Nombre"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            autoFocus
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Apellido"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="rut"
            label="RUT (sin puntos ni guión)"
            name="rut"
            value={formData.rut}
            onChange={handleChange}
            helperText="Ejemplo: 12345678K"
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo electrónico"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Contraseña"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            helperText="Mínimo 6 caracteres"
          />
          
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Tipo de Usuario</FormLabel>
            <RadioGroup
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              row
            >
              <FormControlLabel 
                value="COMPRADOR" 
                control={<Radio />} 
                label="Comprador" 
              />
              <FormControlLabel 
                value="VENDEDOR" 
                control={<Radio />} 
                label="Vendedor" 
              />
            </RadioGroup>
          </FormControl>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Registrarse'}
          </Button>
          
          <Box textAlign="center" mt={2}>
            <Typography variant="body2">
              ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Register;