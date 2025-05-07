// Register.jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await register({
      correo: email,
      contrasena: password,
      nombre: firstName,
      apellido: lastName,
      rut: rutFormateado,
      tipoUsuario: userType // "COMPRADOR" o "VENDEDOR"
    });
    // Redirigir a login u otra página
  } catch (error) {
    console.error("Error en registro:", error.response.data);
  }
};