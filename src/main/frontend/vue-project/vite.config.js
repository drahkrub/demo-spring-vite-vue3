import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // CHANGED/ADDED - START
  build: {
    outDir: '../../resources/static/target/vue-project',
    emptyOutDir: true
  },
  base: '/target/vue-project/',
  define: {
    'process.env.VUE_ROUTER_BASE': '"/vp/"'
  },
  server: {
    proxy: {
      // '^^(?!/vp/).*$': {
      //   target: 'http://localhost:8080',
      //   changeOrigin: true
      // }
      // '^^/vp/$': {
      //   target: 'http://localhost:8080',
      //   changeOrigin: true
      // }
    }
  }
  // CHANGED/ADDED - END
})
