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
import authService from '../api/authService'; // Changed to import the default export

function Register() {
  const [formData, setFormData] = useState({
    correo: '',
    contrasena: '',
    nombre: '',
    apellido: '',
    rut: '',
    tipoUsuario: 'COMPRADOR'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      // Preparamos los datos exactamente como los espera el backend
      const userData = {
        correo: formData.correo,
        contrasena: formData.contrasena,
        nombre: formData.nombre,
        apellido: formData.apellido,
        rut: formData.rut, // El backend se encarga del formateo
        tipoUsuario: formData.tipoUsuario
      };
      
      const response = await authService.register(userData); // Changed to use authService.register
      
      if (response.status === 201) {
        setSuccess(true);
        // Redirigir después de 2 segundos para que el usuario vea el mensaje
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (err) {
      let errorMessage = 'Error durante el registro';
      
      if (err.response) {
        // Si el backend devuelve un mensaje de error específico
        if (err.response.data?.error) {
          errorMessage = err.response.data.error;
        }
        
        // Manejo especial para errores de RUT
        if (err.response.data?.detalle) {
          errorMessage += `: ${err.response.data.detalle}`;
        }
      } else if (err.request) {
        errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión.';
      } else {
        errorMessage = 'Error al procesar tu solicitud. Intenta nuevamente.';
      }
      
      setError(errorMessage);
      console.error('Error detallado:', err);
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
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            ¡Registro exitoso! Redirigiendo al login...
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="nombre"
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            autoFocus
            inputProps={{ maxLength: 50 }}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="apellido"
            label="Apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            inputProps={{ maxLength: 50 }}
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
            inputProps={{ maxLength: 12 }}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="correo"
            label="Correo electrónico"
            name="correo"
            type="email"
            value={formData.correo}
            onChange={handleChange}
            inputProps={{ maxLength: 100 }}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="contrasena"
            label="Contraseña"
            name="contrasena"
            type="password"
            value={formData.contrasena}
            onChange={handleChange}
            helperText="Mínimo 6 caracteres, máximo 15"
            inputProps={{ minLength: 6, maxLength: 15 }}
          />
          
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Tipo de Usuario</FormLabel>
            <RadioGroup
              name="tipoUsuario"
              value={formData.tipoUsuario}
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