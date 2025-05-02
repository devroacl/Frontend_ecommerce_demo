// src/components/Auth/PrivateRoute.jsx
import { useAuth } from '../../context/authContext';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="cargando">Verificando autenticación...</div>;
  
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;