// src/pages/CompradorDashboard.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/api';

export default function CompradorDashboard() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const cargarPedidos = async () => {
      try {
        const response = await api.get('/api/pedidos/mis-pedidos');
        setPedidos(response.data);
      } catch (error) {
        console.error('Error al cargar pedidos:', error);
      }
    };
    cargarPedidos();
  }, []);

  return (
    <div>
      <h1>Mis Pedidos</h1>
      <div>
        {pedidos.map((pedido) => (
          <div key={pedido.id}>
            <h3>Pedido #{pedido.id}</h3>
            <p>Fecha: {new Date(pedido.fechaCreacion).toLocaleDateString()}</p>
            <p>Estado: {pedido.estado}</p>
            <p>Total: ${pedido.total}</p>
          </div>
        ))}
      </div>
    </div>
  );
}