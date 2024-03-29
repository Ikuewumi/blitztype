/// <reference types="vitest" />
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid'
import path from "path";

export default defineConfig({
  plugins: [solid()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupVitest.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@composables': path.resolve(__dirname, './src/composables'),
      '@components': path.resolve(__dirname, './src/components'),
      '@data': path.resolve(__dirname, './src/data'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@scss': path.resolve(__dirname, './src/scss')
    },
    conditions: ['development', 'browser'],
  }


})
