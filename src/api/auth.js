import axios from 'axios';

const API_URL = 'https://prod-backendecomarket.onrender.com/api';

// Configuración global para axios
axios.defaults.timeout = 30000; // 30 segundos de timeout

// Función para registrar un nuevo usuario
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/registro`, userData);
    return response;
  } catch (error) {
    console.error('Error en el registro:', error);
    throw error;
  }
};

// Función para iniciar sesión
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    if (response.data && response.data.token) {
      // Guardar datos de usuario en localStorage
      localStorage.setItem('user', JSON.stringify(response.data));
      
      // También podemos configurar el token para futuras solicitudes
      setAuthToken(response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Error en el login:', error);
    throw error;
  }
};

// Función para cerrar sesión
export const logout = () => {
  localStorage.removeItem('user');
  // Limpiar el token de autorización
  delete axios.defaults.headers.common['Authorization'];
};

// Función para configurar el token de autorización en axios
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Función para verificar si el usuario está autenticado
export const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return !!user && !!user.token;
};

// Función para obtener el usuario actual
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

// Inicializar el token si el usuario ya está autenticado
const user = JSON.parse(localStorage.getItem('user'));
if (user && user.token) {
  setAuthToken(user.token);
}