// src/components/Auth/RoleRoute.jsx
import { useAuth } from '../../context/authContext';
import { Navigate, Outlet } from 'react-router-dom';

const RoleRoute = ({ allowedRoles }) => {
  const { user } = useAuth();
  
  const tieneAcceso = allowedRoles.some(rol => user?.rol === rol);
  
  return tieneAcceso ? (
    <Outlet />
  ) : (
    <Navigate to={user ? '/no-autorizado' : '/login'} replace />
  );
};

export default RoleRoute;