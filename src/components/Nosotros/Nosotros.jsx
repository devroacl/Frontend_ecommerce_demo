// Importamos React y los recursos necesarios
import React from "react";
import "./Nosotros.css";
import { useTheme } from "../../context/themeContext"; // Importamos nuestro hook de tema personalizado

//Datos del equipo//
const teamMembers = [
  {
    id: 1,
    name: "Juan Pérez",
    role: "Desarrollador Frontend",
    photo:
      "https://imgs.search.brave.com/NbFnxYeaKE9R9Yl2M82NmoTCfuh4vrhcVor9XtRBimE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMS53/cC5jb20vd3d3LnNo/dXR0ZXJzdG9jay5j/b20vYmxvZy93cC1j/b250ZW50L3VwbG9h/ZHMvc2l0ZXMvNS8y/MDI0LzA2L3Byb2Zp/bGVfcGhvdG9fc2Ft/cGxlXzcuanBnP3Nz/bD0x",
  },
  {
    id: 2,
    name: "María García",
    role: "Desarrolladora Backend",
    photo:
      "https://imgs.search.brave.com/H7qHXnpx5HCLKMnuXzhCFv9T7kvcK9UCfjIRbcDu3j0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zaG90/a2l0LmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvYmItcGx1Z2lu/L2NhY2hlL2Nvb2wt/cHJvZmlsZS1waWMt/bWF0aGV1cy1mZXJy/ZXJvLWxhbmRzY2Fw/ZS02Y2JlZWEwN2Nl/ODcwZmM1M2JlZGQ5/NDkwOTk0MWE0Yi16/eWJyYXZneDJxNDcu/anBlZw",
  },
  {
    id: 3,
    name: "Carlos López",
    role: "Diseñador UI/UX",
    photo:
      "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

//Componente Nosotros - Muestra información sobre el equipo, usa el tema personalizado para estilos dinámicos (modo oscuro/claro)
export default function Nosotros() {
  // Extraemos los valores del contexto del tema
  const { colors } = useTheme(); // darkMode y toggleTheme no se usan aquí pero están disponibles

  return (
    // Sección principal con estilos dinámicos según el tema
    <section
      className="team-section"
      style={{
        backgroundColor: colors.cardBackground, // Fondo dinámico
        color: colors.text, // Color de texto dinámico
      }}
    >
      {/* Título con color primario del tema */}
      <h2 style={{ color: colors.primary }}>Nuestro Equipo</h2>

      {/* Contenedor grid para las tarjetas de equipo */}
      <div className="team-grid">
        {/* Mapeamos cada miembro del equipo a un componente */}
        {teamMembers.map((member) => (
          <div
            key={member.id} // Key único
            className="team-member"
            style={{ color: colors.text }}
          >
            {/* Contenedor de la foto con borde del color primario */}
            <div
              className="member-photo"
              style={{ borderColor: colors.primary }} // Borde dinámico
            >
              <img
                src={member.photo}
                alt={member.name}
                loading="lazy" // Carga diferida para mejor performance
              />
            </div>

            {/* Nombre del miembro */}
            <h3 style={{ color: colors.text }}>{member.name}</h3>

            {/* Rol/Puesto */}
            <p>{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
