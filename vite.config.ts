import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures assets are loaded with relative paths for GitHub Pages
  server: {
    port: 3000,
    open: false,
    // Allow the sandbox/deployment preview host to reach Vite.
    allowedHosts: ['.manus.computer', 'localhost', '127.0.0.1']
  }
});
