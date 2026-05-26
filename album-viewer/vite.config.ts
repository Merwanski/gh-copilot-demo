import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

const apiHost = process.env.VITE_ALBUM_API_HOST ?? 'localhost:3000'
const apiTarget = apiHost.startsWith('http') ? apiHost : `http://${apiHost}`

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3001,
    proxy: {
      '/albums': {
        target: apiTarget,
        changeOrigin: true
      }
    }
  }
})
