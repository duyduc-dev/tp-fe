import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import requireTransform from 'vite-plugin-require-transform';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), requireTransform()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  preview: {
    port: 2003,
    strictPort: true,
  },
  server: {
    port: 2003,
    host: true,
    strictPort: true,
  },
  build: {
    target: 'es2022',
    rollupOptions: {
      input: {
        main: './index.html',
        'firebase-messaging-sw': './firebase-messaging-sw.js',
      },
      output: {
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === 'firebase-messaging-sw'
            ? '[name].js' // Output service worker in root
            : 'assets/[name]-[hash].js'; // Others in `assets/`
        },
      },
    },
  },
});
