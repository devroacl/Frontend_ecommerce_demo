import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/authService';
import { clearUser } from '../../context/authSlice';
import { AppBar, Toolbar, Box, IconButton, Badge, InputBase, Avatar, Menu, MenuItem, Typography } from '@mui/material';
import { Search, ShoppingCart, Menu as MenuIcon } from '@mui/icons-material';
import Logo from '../../assets/logo.svg';
import './Navbar.css';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useSelector(state => state.auth);
  const { items } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleScroll = () => {
    setScrolled(window.scrollY > 10);
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      dispatch(clearUser());
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      navigate(`/products?query=${e.target.value}`);
    }
  };
  
  return (
    <AppBar position="fixed" className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Toolbar className="navbar-container">
        <Box className="navbar-left">
          <Link to="/" className="logo-link">
            <img 
              src={Logo} 
              alt="Ecomarket Logo" 
              className="logo-img"
              onMouseEnter={(e) => e.currentTarget.classList.add('animate')}
              onMouseLeave={(e) => e.currentTarget.classList.remove('animate')}
            />
            <Typography variant="h4" className="logo-text">Ecomarket</Typography>
          </Link>
        </Box>
        
        <Box className="search-bar">
          <Search className="search-icon" />
          <InputBase
            placeholder="Buscar productos..."
            onKeyPress={handleSearch}
            className="search-input"
          />
        </Box>
        
        <Box className="navbar-right">
          {user ? (
            <>
              <IconButton color="inherit" onClick={() => navigate('/cart')}>
                <Badge badgeContent={items.length} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
              
              <IconButton onClick={handleMenuOpen}>
                <Avatar 
                  alt={user.nombre} 
                  src={user.avatar || '/default-avatar.jpg'}
                  className="avatar"
                />
              </IconButton>
              
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => {
                  navigate(user.rol === 'ROLE_COMPRADOR' ? '/buyer-dashboard' : 
                         user.rol === 'ROLE_VENDEDOR' ? '/seller-dashboard' : 
                         '/admin-dashboard');
                  handleMenuClose();
                }}>
                  Mi Perfil
                </MenuItem>
                <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Link to="/login" className="auth-link">
                <Typography variant="body1">Iniciar Sesión</Typography>
              </Link>
              <Link to="/register" className="auth-link">
                <Typography variant="body1">Registrarse</Typography>
              </Link>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;