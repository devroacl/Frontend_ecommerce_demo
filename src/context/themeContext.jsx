// Importamos las utilidades necesarias de React
import { createContext, useState, useContext } from "react";

// Creamos el contexto para el tema
const ThemeContext = createContext();

// Proveedor del contexto que envolverá los demás componentes
export function ThemeProvider({ children }) {
  // Definimos un estado para controlar si el modo oscuro está activo
  const [darkMode, setDarkMode] = useState(false);

  // Función para alternar entre modo oscuro/claro
  const toggleTheme = () => {
    setDarkMode(!darkMode); // Invierte el valor actual
  };

  // Objeto de tema que contiene el estado del modo oscuro, función para alternarlo y colores correspondientes al tema actual
  const theme = {
    darkMode,
    toggleTheme,
    colors: {
      background: darkMode ? "#1a1a1a" : "#ffffff", // Fondo oscuro o claro
      text: darkMode ? "#D3D3D3" : "#333333", // Texto claro u oscuro
      primary: darkMode ? "#4CAF50" : "#28a745", // Color primario (verde oscuro o claro)
      cardBackground: darkMode ? "#2d2d2d" : "#f8f9fa", // Fondo de tarjetas
    },
  };

  // Acá proveemos el contexto a toda la aplicación
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

// Hook personalizado para consumir el contexto del tema
export function useTheme() {
  // Este hook permite a cualquier componente acceder fácilmente al contexto del tema
  return useContext(ThemeContext);
}
