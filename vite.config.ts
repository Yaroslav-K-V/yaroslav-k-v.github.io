import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (
              id.includes('/react/') ||
              id.includes('/react-dom/') ||
              id.includes('/scheduler/')
            ) {
              return 'vendor-react';
            }
            if (
              id.includes('/framer-motion/') ||
              id.includes('/motion-dom/') ||
              id.includes('/motion-utils/')
            ) {
              return 'vendor-motion';
            }
            if (id.includes('/lucide-react/')) {
              return 'vendor-lucide';
            }
          }
        },
      },
    },
  },
});
