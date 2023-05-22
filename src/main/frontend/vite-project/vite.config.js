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
    // open: '/v/',
    open: true,
    proxy: {
      // this works, but what if you have hundreds of different backend URLs?
      // '/api': {
      //   target: 'http://localhost:8080',
      //   changeOrigin: true
      // }
      // first try like in vue.config.js - destroys live reload!
      // '^.*': {
      //   target: 'http://localhost:8080',
      //   changeOrigin: true,
      //   ws: false,
      //   bypass: function (req, res, options) {
      //     if (req.url.startsWith('/v/')) {
      //       return req.url
      //     }
      //   }
      // }
      // second try - does also not work:
      // '^^(?!/v/).*$': {
      //   target: 'http://localhost:8080',
      //   changeOrigin: true
      //   ws: false,
      // }
    }
  }
  // CHANGED/ADDED - END
})
