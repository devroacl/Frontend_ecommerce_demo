import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  CircularProgress,
  InputAdornment,
  Divider
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  AssignmentInd as RUTIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import { validateEmail, formatRut } from '../../utils/validationUtils';
import userService from '../../services/userService';

const ProfileForm = ({ user }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    rut: '',
    avatar: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.nombre || '',
        apellido: user.apellido || '',
        email: user.correo || '',
        rut: user.rut ? formatRut(user.rut) : '',
        avatar: user.avatar || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre) newErrors.nombre = 'Nombre es requerido';
    if (!formData.apellido) newErrors.apellido = 'Apellido es requerido';
    
    if (!formData.email) {
      newErrors.email = 'Correo es requerido';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Correo electrónico inválido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      setSuccess(false);
      
      // Aquí iría la llamada al servicio para actualizar el perfil
      // await userService.updateProfile(formData);
      
      setSuccess(true);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Avatar
          src={formData.avatar || '/default-avatar.jpg'}
          sx={{ 
            width: 120, 
            height: 120,
            border: '3px solid',
            borderColor: 'primary.main'
          }}
        />
      </Box>
      
      {success && (
        <Box sx={{ 
          backgroundColor: 'success.light',
          color: 'success.dark',
          p: 2,
          borderRadius: 1,
          mb: 3,
          textAlign: 'center'
        }}>
          Perfil actualizado correctamente
        </Box>
      )}
      
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            margin="normal"
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            error={!!errors.nombre}
            helperText={errors.nombre}
            disabled={!editMode}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color={errors.nombre ? 'error' : 'action'} />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            margin="normal"
            label="Apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            error={!!errors.apellido}
            helperText={errors.apellido}
            disabled={!editMode}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color={errors.apellido ? 'error' : 'action'} />
                </InputAdornment>
              )
            }}
          />
        </Grid>
      </Grid>
      
      <TextField
        fullWidth
        margin="normal"
        label="Correo electrónico"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        disabled={!editMode}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon color={errors.email ? 'error' : 'action'} />
            </InputAdornment>
          )
        }}
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="RUT"
        name="rut"
        value={formData.rut}
        onChange={handleChange}
        disabled
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <RUTIcon color="action" />
            </InputAdornment>
          )
        }}
      />
      
      <Divider sx={{ my: 3 }} />
      
      {editMode ? (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            Guardar cambios
          </Button>
          <Button
            variant="outlined"
            onClick={() => setEditMode(false)}
          >
            Cancelar
          </Button>
        </Box>
      ) : (
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={() => setEditMode(true)}
        >
          Editar perfil
        </Button>
      )}
    </Box>
  );
};

export default ProfileForm;