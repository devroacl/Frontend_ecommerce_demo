// pages/Carrito/CarritoPage.jsx
import React from 'react';
import { useCart } from '../../context/cartContext';

export default function CarritoPage() {
  const { cart } = useCart();
  
  return (
    <div>
      <h1>Carrito de Compras</h1>
      {/* Implementar lógica del carrito */}
    </div>
  );
}