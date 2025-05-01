import React from "react";
import {
  Box, // Equivalente a div con mayores capacidades de estilos
  Typography, // Para texto con estilos consistentes
  Link, // Componente para enlaces accesibles
  useTheme, // Hook de MUI para acceder al tema
} from "@mui/material";
import { useTheme as useCustomTheme } from "../../context/themeContext"; // Nuestro contexto personalizado para el modo oscuro
import { Link as RouterLink } from "react-router-dom";

// Componente Footer construido con Material-UI, es responsivo por defecto
export default function Footer() {
  // Obtenemos el tema de MUI (para breakpoints, paleta de colores, etc.)
  const muiTheme = useTheme();

  // Obtenemos nuestro tema personalizado
  const { colors } = useCustomTheme();

  return (
    // Box actúa como contenedor principal
    // sx: Propiedad especial de MUI para estilos (similar a style pero con acceso al tema)
    // component="footer": Semántica HTML correcta
    <Box
      component="footer"
      sx={{
        backgroundColor: colors.background,
        color: colors.text,
        py: 4, // Padding vertical (4 = 32px en el sistema de MUI)
        px: 2, // Padding horizontal
        mt: "auto", // Empuja el footer hacia abajo si hay poco contenido
      }}
    >
      {/* Contenedor con ancho máximo para contenido */}
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto", // Centrado horizontal
          display: "flex",
          flexDirection: { xs: "column", sm: "column" }, // Columna en móvil y desktop
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        {/* Sección de enlaces */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
          }}
        >
          {/* Componente Link de MUI */}
          <Link
            component={RouterLink}
            to="/nosotros"
            color="inherit" // Hereda el color del contenedor padre
            underline="hover" // Subrayado solo al hover
            sx={{
              "&:hover": {
                color: colors.primary, // Cambia al color primario(verde) al hacer hover
              },
            }}
          >
            Nosotros
          </Link>

          <Link
            component={RouterLink}
            to="/tienda"
            color="inherit"
            underline="hover"
            sx={{
              "&:hover": {
                color: colors.primary,
              },
            }}
          >
            Productos
          </Link>

          <Link
            component={RouterLink}
            to="/contacto"
            color="inherit"
            underline="hover"
            sx={{
              "&:hover": {
                color: colors.primary,
              },
            }}
          >
            Contacto
          </Link>
        </Box>

        {/* Copyright */}
        <Typography
          variant="body2" // Estilo tipográfico predefinido
          sx={{
            textAlign: { xs: "center", sm: "center" }, // Centrado en móvil, derecha en desktop
          }}
        >
          &copy; {new Date().getFullYear()} Mi Tienda Online
        </Typography>
      </Box>
    </Box>
  );
}
