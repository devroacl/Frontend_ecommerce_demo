import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PublicRoute from './components/Auth/PublicRoute';
import Layout from './components/common/Layout';

// Lazy loading para mejor performance
const HomePage = lazy(() => import('./pages/public/HomePage'));
const ProductListPage = lazy(() => import('./pages/public/ProductListPage'));
const ProductDetailPage = lazy(() => import('./pages/public/ProductDetailPage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));
const BuyerDashboard = lazy(() => import('./pages/buyer/Dashboard'));
const SellerDashboard = lazy(() => import('./pages/seller/Dashboard'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AboutPage = lazy(() => import('./pages/public/AboutPage'));
const ContactPage = lazy(() => import('./pages/public/ContactPage'));
const CartPage = lazy(() => import('./pages/public/CartPage'));
const NotFoundPage = lazy(() => import('./pages/public/NotFoundPage'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public routes */}
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductListPage />} />
          <Route path="products/:id" element={<ProductDetailPage />} />
          <Route path="category/:categoryId" element={<ProductListPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="cart" element={<CartPage />} />
          
          {/* Auth routes - only for non-authenticated */}
          <Route element={<PublicRoute />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute allowedRoles={['ROLE_COMPRADOR']} />}>
            <Route path="buyer-dashboard" element={<BuyerDashboard />} />
          </Route>
          
          <Route element={<ProtectedRoute allowedRoles={['ROLE_VENDEDOR']} />}>
            <Route path="seller-dashboard" element={<SellerDashboard />} />
          </Route>
          
          <Route element={<ProtectedRoute allowedRoles={['ROLE_ADMIN']} />}>
            <Route path="admin-dashboard" element={<AdminDashboard />} />
          </Route>
          
          {/* Catch all */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
} 