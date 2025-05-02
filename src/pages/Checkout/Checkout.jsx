// src/pages/Checkout.jsx
import React from 'react';
import { useCart } from '../../context/cartContext';
import api from '../../api/api';

export default function Checkout() {
  const { cart, dispatch } = useCart();

  const confirmarPedido = async () => {
    try {
      await api.post('/api/carrito/confirmar');
      dispatch({ type: 'CLEAR_CART' });
      alert('Pedido confirmado exitosamente');
    } catch (error) {
      alert(`Error: ${error.response?.data?.error || 'Error al confirmar pedido'}`);
    }
  };

  return (
    <div>
      <h1>Resumen del Pedido</h1>
      {cart.items.map((item) => (
        <div key={item.producto.id}>
          <h3>{item.producto.nombre}</h3>
          <p>Cantidad: {item.cantidad}</p>
          <p>Precio unitario: ${item.producto.precio}</p>
        </div>
      ))}
      <button onClick={confirmarPedido}>Confirmar Compra</button>
    </div>
  );
}