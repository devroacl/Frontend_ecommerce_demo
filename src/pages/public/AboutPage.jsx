import { Box, Typography, Grid, Card, CardContent, Avatar, useTheme } from '@mui/material';
import { 
  Code as CodeIcon,
  DesignServices as DesignIcon,
  Business as BusinessIcon
} from '@mui/icons-material';

const teamMembers = [
  {
    name: 'Alejandra Roa',
    role: 'Desarrolladora Backend',
    bio: 'Experta en Spring Boot y seguridad JWT. Encargada de la arquitectura del sistema.',
    icon: <CodeIcon fontSize="large" />
  },
  {
    name: 'Carlos Pérez',
    role: 'Diseñador UI/UX',
    bio: 'Especialista en experiencias de usuario y diseño de interfaces atractivas.',
    icon: <DesignIcon fontSize="large" />
  },
  {
    name: 'María González',
    role: 'Gerente de Proyecto',
    bio: 'Coordina el equipo y asegura que cumplamos con los objetivos del negocio.',
    icon: <BusinessIcon fontSize="large" />
  }
];

const AboutPage = () => {
  const theme = useTheme();

  return (
    <Box sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
        Sobre Nosotros
      </Typography>
      
      <Typography variant="body1" align="center" sx={{ maxWidth: 800, mx: 'auto', mb: 6 }}>
        En Ecomarket, nos dedicamos a conectar compradores y vendedores de manera sencilla y segura. 
        Nuestra plataforma ofrece las mejores herramientas para que los vendedores muestren sus productos 
        y los compradores encuentren exactamente lo que necesitan.
      </Typography>
      
      <Typography variant="h4" align="center" gutterBottom sx={{ mt: 6, fontWeight: 'bold' }}>
        Nuestro Equipo
      </Typography>
      
      <Grid container spacing={4} sx={{ mt: 2, mb: 6 }}>
        {teamMembers.map((member, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-10px)',
                boxShadow: theme.shadows[6],
              }
            }}>
              <CardContent sx={{ 
                flexGrow: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                textAlign: 'center',
                p: 4
              }}>
                <Avatar sx={{ 
                  width: 80, 
                  height: 80, 
                  mb: 3,
                  bgcolor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText
                }}>
                  {member.icon}
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  {member.name}
                </Typography>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  {member.role}
                </Typography>
                <Typography variant="body1">
                  {member.bio}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <Typography variant="h4" align="center" gutterBottom sx={{ mt: 6, fontWeight: 'bold' }}>
        Nuestra Misión
      </Typography>
      
      <Box sx={{ 
        maxWidth: 800, 
        mx: 'auto', 
        p: 4, 
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: theme.shadows[2],
        textAlign: 'center'
      }}>
        <Typography variant="body1" paragraph>
          Creemos en el poder del comercio electrónico para democratizar el acceso a productos y servicios. 
          Nuestra misión es proporcionar una plataforma que sea fácil de usar, segura y accesible para todos, 
          eliminando las barreras entre compradores y vendedores.
        </Typography>
        <Typography variant="body1">
          Trabajamos cada día para mejorar la experiencia de nuestros usuarios y construir una comunidad 
          de comercio electrónico vibrante y confiable.
        </Typography>
      </Box>
    </Box>
  );
};

export default AboutPage;