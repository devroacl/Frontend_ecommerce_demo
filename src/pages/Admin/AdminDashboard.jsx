// src/pages/Admin/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext';
import api from '../../api/api';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeProducts: 0,
    totalSales: 0
  });

  // Verificar rol de admin
  useEffect(() => {
    if (user?.rol !== 'ROLE_ADMIN') {
      window.location.href = '/no-autorizado';
    }
  }, [user]);

  // Cargar estadísticas
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/admin/estadisticas');
        setStats(response.data);
      } catch (error) {
        console.error('Error cargando estadísticas:', error);
      }
    };
    
    if (user?.rol === 'ROLE_ADMIN') {
      fetchStats();
    }
  }, [user]);

  return (
    <div className="admin-dashboard">
      <h1>Panel de Administración</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Usuarios Registrados</h3>
          <p>{stats.totalUsers}</p>
        </div>
        
        <div className="stat-card">
          <h3>Productos Activos</h3>
          <p>{stats.activeProducts}</p>
        </div>
        
        <div className="stat-card">
          <h3>Ventas Totales</h3>
          <p>${stats.totalSales.toLocaleString()}</p>
        </div>
      </div>

      <section className="admin-actions">
        <h2>Acciones Rápidas</h2>
        <div className="action-buttons">
          <button className="btn-admin">
            Gestionar Usuarios
          </button>
          <button className="btn-admin">
            Ver Reportes
          </button>
          <button className="btn-admin">
            Moderar Contenido
          </button>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard; // Exportación default crucial