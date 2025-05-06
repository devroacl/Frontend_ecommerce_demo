import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, IconButton, Badge } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

export default function Navbar({ cartItems = [] }) {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Button component={Link} to="/" color="inherit">Home</Button>
        <Button component={Link} to="api/productos" color="inherit">Productos</Button>
        <Button component={Link} to="api/about" color="inherit">Nosotros</Button>
        
        <div style={{ flexGrow: 1 }} />
        
        <IconButton component={Link} to="api/cart" color="inherit">
          <Badge badgeContent={cartItems.length} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
        
        <Button component={Link} to="api/login" color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}