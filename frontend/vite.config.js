import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // — no @tailwindcss/vite here —
  ],
  // (you can add resolve.alias, server.port, etc. below if you need)
})
