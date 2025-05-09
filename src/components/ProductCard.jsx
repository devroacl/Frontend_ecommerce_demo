import { Card, CardMedia, CardContent, Typography } from '@mui/material';

export default function ProductCard({ product }) {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={product.image || 'https://via.placeholder.com/150'}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {product.name}
        </Typography>
        <Typography color="text.secondary">
          ${product.price}
        </Typography>
      </CardContent>
    </Card>
  );
}