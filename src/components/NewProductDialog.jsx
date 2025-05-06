import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

export default function NewProductDialog({ open, onClose, onSubmit }) {
  const [productData, setProductData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoriaId: '',
    imagen: null
  });

  const handleFileChange = (e) => {
    setProductData({ ...productData, imagen: e.target.files[0] });
  };

  const handleSubmit = () => {
    const formData = new FormData();
    Object.entries(productData).forEach(([key, value]) => {
      if (value !== null) formData.append(key, value);
    });
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Nuevo Producto</DialogTitle>
      <DialogContent>
        <TextField
          margin="normal"
          fullWidth
          label="Nombre"
          value={productData.nombre}
          onChange={(e) => setProductData({ ...productData, nombre: e.target.value })}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Descripción"
          multiline
          rows={4}
          value={productData.descripcion}
          onChange={(e) => setProductData({ ...productData, descripcion: e.target.value })}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Precio"
          type="number"
          value={productData.precio}
          onChange={(e) => setProductData({ ...productData, precio: e.target.value })}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Stock"
          type="number"
          value={productData.stock}
          onChange={(e) => setProductData({ ...productData, stock: e.target.value })}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Categoría ID"
          value={productData.categoriaId}
          onChange={(e) => setProductData({ ...productData, categoriaId: e.target.value })}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ marginTop: 16 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSubmit}>Crear Producto</Button>
      </DialogActions>
    </Dialog>
  );
}