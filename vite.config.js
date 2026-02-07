/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    css: true
  },
  server: {
    watch: {
      usePolling: true,
      interval: 1000
    },
    // Add CORS headers for better compatibility
    cors: true
  },
  build: {
    // Target ES2018 so optional chaining (?.) is transpiled for react-snap's Chromium
    target: 'es2018',
    // Optimize bundle size for better SEO performance
    rollupOptions: {
      output: {
        // Manual chunks for better caching and performance
        manualChunks: {
          'react-vendor': ['react', 'react-dom']
        }
      }
    },
    // Generate sourcemaps for debugging (disable in production for security)
    sourcemap: false,
    // Minify for better performance (using esbuild - faster than terser)
    minify: 'esbuild',
    // Chunk size warning limit
    chunkSizeWarningLimit: 1000
  }
})
