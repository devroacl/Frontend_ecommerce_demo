import axios from 'axios';

const API_URL = 'https://prod-backendecomarket-def.onrender.com/api/auth';

// Configura axios para incluir credenciales
axios.defaults.withCredentials = true;

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/registro`, userData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    return response;
  } catch (error) {
    console.error('Error en el registro:', error);
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    if (response.data && response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
      setAuthToken(response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Error en el login:', error);
    throw error;
  }
};

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Inicializar token si existe
const user = JSON.parse(localStorage.getItem('user'));
if (user && user.token) {
  setAuthToken(user.token);
}