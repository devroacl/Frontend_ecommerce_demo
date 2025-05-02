import { useState } from 'react';
import { useAuth } from "../context/authContext";
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const { login, error: authError, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    
    // Validación básica del formulario
    if (!email || !password) {
      setFormError('Por favor, completa todos los campos');
      return;
    }

    try {
      // Llamada a la función login del contexto
      await login(email, password);
      
      // Si el login es exitoso, redirigir a la página principal
      navigate('/dashboard');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // El error ya se maneja en el contexto de autenticación
    }
  };

  return (
    <div className="login-form-container">
      <h2>Iniciar sesión</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu correo"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            required
          />
        </div>

        {/* Mostrar errores del formulario o del contexto de autenticación */}
        {(formError || authError) && (
          <div className="error-message">
            {formError || authError}
          </div>
        )}
        
        <button 
          type="submit" 
          className="login-button"
          disabled={loading}
        >
          {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;