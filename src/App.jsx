import { Routes, Route } from 'react-router-dom';
import React from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
// Importar todos los componentes de página
import Home from './pages/Home';
import Productos from './pages/Productos';
//import ProductDetail from './pages/ProductDetail';
import AboutUs from './pages/AboutUs';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Dashboard from './pages/Dashboard';
import NewProduct from './pages/NewProduct'; 
import { useSelector } from 'react-redux';

export default function App() {
  const cartItems = useSelector((state) => state.cart.items);
  
  return (
    <>
      <Navbar />
      <Routes>
        {/* Rutas públicas */}
  <Route path="/" element={<Home />} />
  <Route path="/productos" element={<Productos />} />
  <Route path="/about" element={<AboutUs />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} /> {/* ✅ Ruta pública */}

  {/* Rutas protegidas */}
  <Route element={<ProtectedRoute allowedRoles={['ROLE_COMPRADOR']} />}>
    <Route path="/cart" element={<Cart />} />
    <Route path="/checkout" element={<Checkout />} />
  </Route>

  <Route element={<ProtectedRoute allowedRoles={['ROLE_VENDEDOR']} />}>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/nuevo-producto" element={<NewProduct />} />
  </Route>
      </Routes>
    </>
  );
}