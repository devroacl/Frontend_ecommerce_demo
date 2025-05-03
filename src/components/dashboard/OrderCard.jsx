import { Card, CardContent, Typography, Chip, Button, Box, Divider } from '@mui/material';
import { LocalShipping, CheckCircle, Pending, HighlightOff } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const statusIcons = {
  'ENTREGADO': <CheckCircle color="success" />,
  'EN_PROCESO': <Pending color="warning" />,
  'CANCELADO': <HighlightOff color="error" />,
  'ENVIADO': <LocalShipping color="info" />
};

const statusColors = {
  'ENTREGADO': 'success',
  'EN_PROCESO': 'warning',
  'CANCELADO': 'error',
  'ENVIADO': 'info'
};

const OrderCard = ({ order, onClick }) => {
  const theme = useTheme();
  
  return (
    <Card 
      sx={{ 
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[4],
        }
      }}
      onClick={onClick}
    >
      <CardContent>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2
        }}>
          <Typography variant="h6" component="div">
            Orden #{order.id}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {statusIcons[order.estado]}
            <Chip 
              label={order.estado.replace('_', ' ')} 
              color={statusColors[order.estado]} 
              size="small"
            />
          </Box>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Fecha: {new Date(order.fecha).toLocaleDateString()}
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body1">
            {order.items.length} {order.items.length === 1 ? 'producto' : 'productos'}
          </Typography>
          <Typography variant="h6">
            Total: ${order.total.toLocaleString()}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button size="small" variant="outlined">
            Ver detalles
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default OrderCard;