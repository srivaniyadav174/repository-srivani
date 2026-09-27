import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],

  server: {
    allowedHosts: ['repository-srivani-portfolio.onrender.com'],
  },

  preview: {
    allowedHosts: ['repository-srivani-portfolio.onrender.com'],
  },
})