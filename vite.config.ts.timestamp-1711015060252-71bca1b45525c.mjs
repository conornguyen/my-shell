// vite.config.ts
import { defineConfig } from 'file:///E:/research/cyber-rex/node_modules/.pnpm/vite@5.1.6/node_modules/vite/dist/node/index.js';
import react from 'file:///E:/research/cyber-rex/node_modules/.pnpm/@vitejs+plugin-react@4.2.1_vite@5.1.6/node_modules/@vitejs/plugin-react/dist/index.mjs';
import federation from 'file:///E:/research/cyber-rex/node_modules/.pnpm/@originjs+vite-plugin-federation@1.3.5/node_modules/@originjs/vite-plugin-federation/dist/index.mjs';
var vite_config_default = defineConfig({
 plugins: [
  react(),
  federation({
   name: 'cyber-rex',
   remotes: {
    remoteApp: 'http://localhost:5001/assets/remoteEntry.js',
   },
   shared: ['react', 'react-dom'],
  }),
 ],
 build: {
  modulePreload: false,
  target: 'esnext',
  minify: false,
  cssCodeSplit: false,
 },
});
export { vite_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxyZXNlYXJjaFxcXFxjeWJlci1yZXhcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXHJlc2VhcmNoXFxcXGN5YmVyLXJleFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovcmVzZWFyY2gvY3liZXItcmV4L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCBmZWRlcmF0aW9uIGZyb20gXCJAb3JpZ2luanMvdml0ZS1wbHVnaW4tZmVkZXJhdGlvblwiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCksICBmZWRlcmF0aW9uKHtcbiAgICBuYW1lOiAnY3liZXItcmV4JyxcbiAgICByZW1vdGVzOiB7XG4gICAgICByZW1vdGVBcHA6ICdodHRwOi8vbG9jYWxob3N0OjUwMDEvYXNzZXRzL3JlbW90ZUVudHJ5LmpzJyxcbiAgICB9LFxuICAgIHNoYXJlZDogWydyZWFjdCcsJ3JlYWN0LWRvbSddXG4gIH0pXSxcbiAgYnVpbGQ6IHtcbiAgICBtb2R1bGVQcmVsb2FkOiBmYWxzZSxcbiAgICB0YXJnZXQ6ICdlc25leHQnLFxuICAgIG1pbmlmeTogZmFsc2UsXG4gICAgY3NzQ29kZVNwbGl0OiBmYWxzZVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1UCxTQUFTLG9CQUFvQjtBQUNwUixPQUFPLFdBQVc7QUFDbEIsT0FBTyxnQkFBZ0I7QUFHdkIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sR0FBSSxXQUFXO0FBQUEsSUFDN0IsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLE1BQ1AsV0FBVztBQUFBLElBQ2I7QUFBQSxJQUNBLFFBQVEsQ0FBQyxTQUFRLFdBQVc7QUFBQSxFQUM5QixDQUFDLENBQUM7QUFBQSxFQUNGLE9BQU87QUFBQSxJQUNMLGVBQWU7QUFBQSxJQUNmLFFBQVE7QUFBQSxJQUNSLFFBQVE7QUFBQSxJQUNSLGNBQWM7QUFBQSxFQUNoQjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
