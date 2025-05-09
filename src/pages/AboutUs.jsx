
// 1. Corregir AboutUs.jsx - Añadir la importación de React
// AboutUs.jsx
import React from 'react';
import { Grid, Typography, Card, CardMedia, CardContent } from '@mui/material';

const team = [
  { name: 'Juan Pérez', role: 'CEO', photo: '/team/juan.jpg' },
  { name: 'María Gómez', role: 'CTO', photo: '/team/maria.jpg' },
  { name: 'Carlos Ruiz', role: 'Diseñador UX', photo: '/team/carlos.jpg' }
];

export default function AboutUs() {
  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h3" gutterBottom>Nuestro Equipo</Typography>
      <Grid container spacing={4}>
        {team.map((member) => (
          <Grid item xs={12} sm={6} md={4} key={member.name}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={member.photo}
                alt={member.name}
              />
              <CardContent>
                <Typography variant="h5">{member.name}</Typography>
                <Typography color="textSecondary">{member.role}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}