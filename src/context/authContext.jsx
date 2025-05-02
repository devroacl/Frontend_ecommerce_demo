import { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Configuración de Axios con la URL base correcta
  const api = axios.create({
    baseURL: 'http://localhost:8080', 
    headers: {
      'Content-Type': 'application/json',
    }
  });

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      // IMPORTANTE: Cambiado para coincidir con el backend - correo y contrasena
      const response = await api.post('/api/auth/login', {
        correo: email,       // Cambiado: email -> correo
        contrasena: password // Cambiado: password -> contrasena
      });

      if (response.data) {
        setUser(response.data);
        setIsAuthenticated(true);
        
        // Guardar token en localStorage si es necesario
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          // Configurar el token para futuras solicitudes
          api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        }
      }
      
      return response.data;
    } catch (err) {
      console.error('Error en login:', err);
      
      // Mensaje de error más descriptivo
      if (err.response) {
        // El servidor respondió con un status fuera del rango 2xx
        if (err.response.status === 403) {
          setError('Acceso denegado. Verifica tus credenciales.');
        } else if (err.response.status === 404) {
          setError('Servicio de autenticación no encontrado.');
        } else {
          setError(`Error del servidor: ${err.response.status}`);
        }
      } else if (err.request) {
        // La solicitud se realizó pero no se recibió respuesta
        setError('No se recibió respuesta del servidor. Verifica que el backend esté en ejecución.');
      } else {
        // Error en la configuración de la solicitud
        setError(`Error de configuración: ${err.message}`);
      }
      
      throw new Error(error || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    // Eliminar el token de las cabeceras por defecto
    delete api.defaults.headers.common['Authorization'];
  };

  // Comprobar si hay un token almacenado al iniciar la aplicación
  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    
    if (token) {
      setLoading(true);
      try {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await api.get('/api/auth/user');
        setUser(response.data);
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Error al verificar autenticación:', err);
        logout(); // Si hay un error, cerrar sesión
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        login,
        logout,
        checkAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;