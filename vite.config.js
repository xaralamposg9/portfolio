import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative base so the built site works whether it's served from
  // a GitHub Pages PROJECT site (username.github.io/repo/) or a
  // user/custom-domain site (root). No need to hard-code the repo name.
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Inline small assets (favicon etc.) to cut HTTP requests.
    assetsInlineLimit: 4096,
    // Modern targets keep the bundle small and fast.
    target: 'es2020',
  },
  server: {
    port: 3000,
    open: false,
  },
  preview: {
    port: 4173,
  },
})
