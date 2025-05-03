import { Button } from '@mui/material';
import { Google } from '@mui/icons-material';

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    // Implementar lógica de autenticación con Google
    window.location.href = `${import.meta.env.VITE_API_URL}/oauth2/authorization/google`;
  };

  return (
    <Button
      fullWidth
      variant="outlined"
      startIcon={<Google />}
      onClick={handleGoogleLogin}
      sx={{
        py: 1.5,
        mb: 2,
        textTransform: 'none',
        borderColor: '#DB4437',
        color: '#DB4437',
        '&:hover': {
          backgroundColor: 'rgba(219, 68, 55, 0.04)',
          borderColor: '#DB4437'
        }
      }}
    >
      Continuar con Google
    </Button>
  );
};

export default GoogleLoginButton;