import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

function spa404(): Plugin {
  return {
    name: 'spa-404',
    apply: 'build',
    closeBundle() {
      const index = resolve(process.cwd(), 'dist/index.html')
      const dest = resolve(process.cwd(), 'dist/404.html')
      if (existsSync(index)) copyFileSync(index, dest)
    },
  }
}

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react(), spa404()],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
})
