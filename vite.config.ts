import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig({
 plugins: [
  react(),
  federation({
   name: 'my-shell',
   remotes: [
    {
     saleApp: {
      external: 'Promise.resolve("http://localhost:5001/assets/remoteEntry.js")',
      from: 'vite',
      externalType: 'promise',
     },
    },
   ],
   shared: ['react', 'react-dom'],
  }),
 ],
 preview: {
  host: 'localhost',
  port: 5001,
  strictPort: true,
 },
 build: {
  modulePreload: false,
  target: 'esnext',
  minify: false,
  cssCodeSplit: false,
 },
 resolve: {
  alias: {
   '@': path.resolve(__dirname, './src'),
  },
 },
});
