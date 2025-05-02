// App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/themeContext';
import { AuthProvider } from './context/authContext';
import { CartProvider } from './context/cartContext';
import PrivateRoute from './components/Auth/PrivateRoute';
import RoleRoute from './components/Auth/RoleRoute';
// Componentes y páginas
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Tienda from './pages/Tienda';
import Hombre from './pages/Hombre';
import Mujer from './pages/Mujer';
import Ninos from './pages/Ninos';
import Nosotros from './components/Nosotros/Nosotros';
import Contacto from './components/Contacto/Contacto';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductoDetalle from './pages/ProductoDetalle';
import CompradorDashboard from './pages/CompradorDashboard';
import PedidosHistory from './pages/PedidosHistory';
import CarritoPage from './pages/Carrito/CarritoPage';
import Checkout from './pages/Checkout/Checkout';
import VendedorDashboard from './pages/Vendedor/VendedorDashboard';
import ProductosVendedor from './pages/Vendedor/ProductosVendedor';
import VentasVendedor from './pages/Vendedor/VentasVendedor';
import EstadisticasVendedor from './pages/Vendedor/EstadisticasVendedor';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Error403 from './pages/Errors/Error403';
import Error404 from './pages/Errors/Error404';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <Routes>
            {/* ------------------ RUTAS PÚBLICAS ------------------ */}
            <Route path="/" element={<Navigate to="/tienda" />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/hombre" element={<Hombre />} />
            <Route path="/mujer" element={<Mujer />} />
            <Route path="/ninos" element={<Ninos />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registro" element={<RegisterPage />} />
            <Route path="/producto/:id" element={<ProductoDetalle />} />

            {/* ------------------ RUTAS PRIVADAS ------------------ */}
            <Route element={<PrivateRoute />}>
              {/* Dashboard Comprador */}
              <Route element={<RoleRoute allowedRoles={['ROLE_COMPRADOR']} />}>
                <Route path="/mi-cuenta" element={<CompradorDashboard />} />
                <Route path="/mis-pedidos" element={<PedidosHistory />} />
                <Route path="/carrito" element={<CarritoPage />} />
                <Route path="/checkout" element={<Checkout />} />
              </Route>

              {/* Dashboard Vendedor */}
              <Route element={<RoleRoute allowedRoles={['ROLE_VENDEDOR']} />}>
                <Route path="/panel-vendedor" element={<VendedorDashboard />}>
                  <Route index element={<ProductosVendedor />} />
                  <Route path="productos" element={<ProductosVendedor />} />
                  <Route path="ventas" element={<VentasVendedor />} />
                  <Route path="estadisticas" element={<EstadisticasVendedor />} />
                </Route>
              </Route>

              {/* Dashboard Admin */}
              <Route element={<RoleRoute allowedRoles={['ROLE_ADMIN']} />}>
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>
            </Route>

            {/* ------------------ MANEJO DE ERRORES ------------------ */}
            <Route path="/no-autorizado" element={<Error403 />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;