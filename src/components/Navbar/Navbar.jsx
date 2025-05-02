// components/Navbar/Navbar.jsx
import { useAuth } from '../../context/authContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  
  return (
    <div className="navbar">
      {/* ... otros elementos ... */}
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
      </div>
    </div>
  );
}