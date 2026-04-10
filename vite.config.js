import { defineConfig } from 'vite'

export default defineConfig({
  // Vite defaults are fine for most static sites
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
