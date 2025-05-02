import React from 'react';
import { useAuth } from "../context/authContext";

export default function PedidosHistory() {
  const { user } = useAuth();

  return (
    <div className="pedidos-history">
      <h2>Historial de Pedidos</h2>
      {/* Listado de pedidos del usuario */}
    </div>
  );
}