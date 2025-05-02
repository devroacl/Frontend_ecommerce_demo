import api from '../api/api';

export const authService = {
  login: async (email, password) => {
    return api.post('/api/auth/login', { correo: email, contrasena: password });
  },
  register: async (userData) => {
    return api.post('/api/auth/registro', userData);
  }
};