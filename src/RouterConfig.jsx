import { lazy, Suspense, useContext } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import {AuthContext} from '../src/context/AuthContext';
import {Layout} from '../src/components/common/Layout';

// Lazy loading con prefijo absoluto usando alias Vite
const HomePage = lazy(() => import('@/pages/public/HomePage'));
const ProductListPage = lazy(() => import('@/pages/public/ProductListPage'));
const ProductDetailPage = lazy(() => import('@/pages/public/ProductDetailPage'));
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'));
const BuyerDashboard = lazy(() => import('@/pages/buyer/Dashboard'));
const SellerDashboard = lazy(() => import('@/pages/seller/Dashboard'));
const AdminDashboard = lazy(() => import('@/pages/admin/Dashboard'));
const AboutPage = lazy(() => import('@/pages/public/AboutPage'));
const ContactPage = lazy(() => import('@/pages/public/ContactPage'));
const CartPage = lazy(() => import('@/pages/public/CartPage'));
const NotFoundPage = lazy(() => import('@/pages/public/NotFoundPage'));

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.rol)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? <Navigate to="/" replace /> : children;
};

function RouterConfig() {
  return (
    <Suspense fallback={
      <div className="full-page-loader">
        <CircularProgress size={80} />
      </div>
    }>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Rutas públicas */}
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductListPage />} />
          <Route path="products/:id" element={<ProductDetailPage />} />
          <Route path="category/:categoryId" element={<ProductListPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="cart" element={<CartPage />} />

          {/* Rutas de autenticación */}
          <Route element={<PublicRoute />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>

          {/* Rutas protegidas */}
          <Route path="buyer">
            <Route 
              path="dashboard" 
              element={
                <ProtectedRoute allowedRoles={['ROLE_COMPRADOR']}>
                  <BuyerDashboard />
                </ProtectedRoute>
              } 
            />
          </Route>

          <Route path="seller">
            <Route 
              path="dashboard" 
              element={
                <ProtectedRoute allowedRoles={['ROLE_VENDEDOR']}>
                  <SellerDashboard />
                </ProtectedRoute>
              } 
            />
          </Route>

          <Route path="admin">
            <Route 
              path="dashboard" 
              element={
                <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Route>

          {/* Ruta para 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default RouterConfig;