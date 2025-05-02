// components/Navbar/Navbar.jsx
import { useAuth } from '../../context/authContext';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();
  
  return (
    <div className="navbar">
      {/* Logo */}
      <div className="nav-logo">
        <Link to="/">
          <img src="/logo.png" alt="Logo" /> {/* Añade tu ruta de imagen */}
        </Link>
      </div>

      {/* Menú de navegación */}
      <nav className="nav-menu">
        <Link to="/tienda">Tienda</Link>
        <Link to="/hombre">Hombre</Link>
        <Link to="/mujer">Mujer</Link>
      </nav>

      {/* Área de login/carrito */}
      <div className="nav-login-cart">
        {user ? (
          <>
            <button onClick={logout}>Cerrar sesión</button>
            <span>{user.email}</span>
          </>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
        <Link to="/carrito">
          <img src="/cart-icon.svg" alt="Carrito" />
        </Link>
      </div>
    </div>
  );
}

export default Navbar; // Exportación correcta