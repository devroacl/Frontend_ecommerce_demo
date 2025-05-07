import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  IconButton, 
  Badge 
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Button component={Link} to="/" color="inherit">Home</Button>
        <Button component={Link} to="/productos" color="inherit">Productos</Button>
        <Button component={Link} to="/about" color="inherit">Nosotros</Button>
        
        <div style={{ flexGrow: 1 }} />
        
        {user ? (
          <>
            {user.role === 'ROLE_VENDEDOR' && (
              <Button component={Link} to="/dashboard" color="inherit">
                Dashboard
              </Button>
            )}
            
            <IconButton component={Link} to="/cart" color="inherit">
              <Badge badgeContent={cartItems.length} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
            
            <Button component={Link} to="/logout" color="inherit">
              Cerrar Sesión
            </Button>
          </>
        ) : (
          <>
            <Button component={Link} to="/login" color="inherit">Login</Button>
            <Button component={Link} to="/register" color="inherit">Registrarse</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}