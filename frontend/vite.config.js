import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',                // Listen on all interfaces
    port: process.env.PORT || 5173  // Use Render's port or default
  },
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT || 4173
  }
})
