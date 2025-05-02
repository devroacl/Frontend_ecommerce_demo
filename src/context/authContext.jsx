// src/context/authContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar token al cargar la app
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
      } catch (err) {
        localStorage.removeItem('token');
        console.error('Error verificando token:', err);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/api/auth/login', { email, password });
      
      // Guardar token en localStorage y estado
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      
      return true;
    } catch (err) {
      console.error('Error en login:', err);
      throw new Error(err.response?.data?.error || 'Error de autenticación');
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post('/api/auth/registro', userData);
      
      // Autologin después del registro
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      
      return true;
    } catch (err) {
      console.error('Error en registro:', err);
      throw new Error(err.response?.data?.error || 'Error de registro');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}


export const useAuth = () => useContext(AuthContext); // Hook