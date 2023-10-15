// vite.config.js
import { defineConfig } from 'vite';
import React from '@vitejs/plugin-react';
import ViteTailwindCSS from 'vite-plugin-tailwind';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    React(),
    // ViteTailwindCSS(),
  ],
});
