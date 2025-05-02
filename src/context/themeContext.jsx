import { createContext, useContext, useState, useMemo } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(() => ({
    darkMode,
    toggleTheme: () => setDarkMode(prev => !prev),
    colors: {
      background: darkMode ? "#1a1a1a" : "#ffffff",
      text: darkMode ? "#e0e0e0" : "#333333",
      primary: darkMode ? "#66bb6a" : "#28a745",
      cardBackground: darkMode ? "#2d2d2d" : "#f8f9fa",
    }
  }), [darkMode]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);