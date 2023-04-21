import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:4365',
  //       changeOrigin: true
  //     },
  //   }
  // }
})
