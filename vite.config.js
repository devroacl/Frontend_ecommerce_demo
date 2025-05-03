import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Tu backend local
        changeOrigin: true,
        secure: false,
      },
    },
  }
});