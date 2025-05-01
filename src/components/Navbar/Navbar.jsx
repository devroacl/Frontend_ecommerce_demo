import React from "react";
import logo from "../../assets/logo.png";
import cart from "../../assets/cart.svg";
import "./Navbar.css";
import { Link } from "react-router-dom";

// Importamos el hook useTheme desde nuestro contexto de tema personalizado
import { useTheme } from "../../context/themeContext";

export default function Navbar() {
  // Extraemos los valores del contexto de tema:
  // - darkMode: boolean que indica si el modo oscuro está activo
  // - toggleTheme: función para alternar entre temas
  // - colors: objeto con los colores del tema actual
  const { darkMode, toggleTheme, colors } = useTheme();

  return (
    <div
      className="navbar"
      style={{
        // Color de fondo según el tema
        backgroundColor: colors.background,
        // Sombra diferente para modo oscuro/claro
        boxShadow: darkMode
          ? "0 2px 4px rgba(0, 0, 0, 0.3)"
          : "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Logo */}
      <div className="nav-logo">
        <img src={logo} alt="logo" />
      </div>

      {/* Menú de navegación con color de texto dinámico */}
      <ul className="nav-menu">
        <Link
          to={"/tienda"}
          style={{ color:colors.text, textDecoration:"none"}}
        >
          <li style={{ color: colors.text }}>Tienda</li>
        </Link>
        <Link
          to={"/hombre"}
          style={{ color:colors.text, textDecoration:"none"}}
        >
          <li style={{ color: colors.text }}>Hombre</li>
        </Link>
        <Link
          to={"/mujer"}
          style={{ color:colors.text, textDecoration:"none"}}
        >
          <li style={{ color: colors.text }}>Mujer</li>
        </Link>
        <Link
         to={"/ninos"}
          style={{ color:colors.text, textDecoration:"none"}}
         >
          <li style={{ color: colors.text }}>Niños</li>
        </Link>
        
      </ul>

      {/* Contenedor de login/carrito/tema */}
      <div className="nav-login-cart">
        <button
          style={{
            borderColor: colors.primary
          }}
        >
          Login
        </button>
        <img src={cart} alt="carrito" />

        {/* Botón para alternar entre temas */}
        <button
          onClick={toggleTheme}
          style={{
            marginLeft: "1rem",
            padding: "0.5rem",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: colors.text, // Color de texto según el tema
          }}
          aria-label={
            darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
          }
        >
          {darkMode ? "☀️" : "🌙"} {/* Icono solar o lunar según el tema */}
        </button>
      </div>
    </div>
  );
}