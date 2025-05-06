import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path'; // Asegúrate de tener esto instalado

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Debe apuntar a "./src"
    },
  },
});