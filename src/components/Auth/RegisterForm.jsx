// src/components/Auth/RegisterForm.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { validarRUT } from '../../utils/rutUtils'; // Implementar esta función

export default function RegisterForm() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    correo: '',
    contrasena: '',
    nombre: '',
    apellido: '',
    rut: '',
    tipoUsuario: 'COMPRADOR'
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validarRUT(formData.rut)) {
      setError('RUT inválido');
      return;
    }

    const result = await register(formData);
    if (result?.error) setError(result.error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Correo" value={formData.correo} 
        onChange={(e) => setFormData({...formData, correo: e.target.value})} required />
      
      <input type="password" placeholder="Contraseña" value={formData.contrasena}
        onChange={(e) => setFormData({...formData, contrasena: e.target.value})} required />
      
      <input placeholder="Nombre" value={formData.nombre}
        onChange={(e) => setFormData({...formData, nombre: e.target.value})} required />
      
      <input placeholder="Apellido" value={formData.apellido}
        onChange={(e) => setFormData({...formData, apellido: e.target.value})} required />
      
      <input placeholder="RUT (12345678-9)" value={formData.rut}
        onChange={(e) => setFormData({...formData, rut: e.target.value})} required />
      
      <select value={formData.tipoUsuario} 
        onChange={(e) => setFormData({...formData, tipoUsuario: e.target.value})}>
        <option value="COMPRADOR">Comprador</option>
        <option value="VENDEDOR">Vendedor</option>
      </select>

      {error && <div className="error-message">{error}</div>}
      <button type="submit">Registrarse</button>
    </form>
  );
}