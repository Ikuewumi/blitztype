/// <reference types="vitest" />

import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solid()],
  test: {
    globals: true,
    environment: 'jsdom',
    testTransformMode: {
      /**@ts-ignore*/
      web: [/\.tsx?$/],
    },
    setupFiles: './setupVitest.ts',
  },
  resolve: {
    conditions: ['development', 'browser'],
  },

})
