import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'src/pages/auth/login/login.html'),
        admin: resolve(__dirname, 'src/pages/admin/admin.html'),
        cart: resolve(__dirname, 'src/pages/store/cart/cart.html'),
        home: resolve(__dirname, 'src/pages/store/home/home.html'),
        registro: resolve(__dirname, 'src/pages/auth/registro/registro.html')
      },
    },
  },
  server: {
    port: 3000,
    open: true
  }
});