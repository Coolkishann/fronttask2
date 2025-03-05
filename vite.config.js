import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://back-task2.onrender.com',
        changeOrigin: true,
        secure: false,  // Allow self-signed certificates
      }
    }
  }
});
