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
    // outDir: '../../resources/static/vite-project',
    outDir: '../../../../target/classes/static/vite-project',
    emptyOutDir: true
  },
  base: '/vite-project/',
  define: {
    'process.env.VUE_ROUTER_BASE': '"/v/"'
  },
  server: {
    proxy: {
      // '^^(?!/v/).*$': {
      //   target: 'http://localhost:8080',
      //   changeOrigin: true
      // }
      // '^^/v/$': {
      //   target: 'http://localhost:8080',
      //   changeOrigin: true
      // }
    }
  }
  // CHANGED/ADDED - END
})
