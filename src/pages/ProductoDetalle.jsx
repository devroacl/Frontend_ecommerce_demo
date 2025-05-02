// pages/ProductoDetalle.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

export default function ProductoDetalle() {
  const { id } = useParams();

  return (
    <div>
      <h1>Detalle del Producto #{id}</h1>
      {/* Lógica para mostrar detalles del producto */}
    </div>
  );
}