import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lógica para verificar token al cargar
  }, []);

  const login = async (email, password) => {
    // Lógica de login
  };

  const register = async (userData) => {
    // Lógica de registro
  };

  const logout = () => {
    // Lógica de logout
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}