// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/Auth/PrivateRoute';
import RoleRoute from './components/Auth/RoleRoute';

// App.jsx
import { ThemeProvider } from './context/themeContext';
import { AuthProvider } from './context/authContext';
import { CartProvider } from './context/cartContext';
import Navbar from './components/Navbar/Navbar'


function App() { // <-- Declaración correcta del componente
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
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
              {/* Ruta base para usuarios autenticados */}
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

                {/* Ruta para admin (si es necesario) */}
                <Route element={<RoleRoute allowedRoles={['ROLE_ADMIN']} />}>
                  <Route path="/admin" element={<AdminDashboard />} />
                </Route>
              </Route>

              {/* ------------------ MANEJO DE ERRORES ------------------ */}
              <Route path="/no-autorizado" element={<Error403 />} />
              <Route path="*" element={<Error404 />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
export default App;