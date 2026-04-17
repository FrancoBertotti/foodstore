import { defineConfig } from 'vite';

export default defineConfig({
  root: './',
    build: {
    rollupOptions: {
        input: {
        main: './index.html',
        login: './src/pages/login.html',
        admin: './src/pages/admin.html',
        },
    },
    },
});