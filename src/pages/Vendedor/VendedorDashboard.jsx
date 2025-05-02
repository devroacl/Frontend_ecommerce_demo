// pages/VendedorDashboard.jsx
import { useEffect, useState } from 'react';
import { productoService } from "../../service/productoService";
import { useAuth } from '../../context/authContext';

export default function VendedorDashboard() {
  const [productos, setProductos] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.role === 'ROLE_VENDEDOR') {
      productoService.getByVendedor().then(res => setProductos(res.data));
    }
  }, [user]);

  return (
    <div>
      <h1>Mis Productos</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.nombre}</td>
              <td>${producto.precio}</td>
              <td>{producto.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}