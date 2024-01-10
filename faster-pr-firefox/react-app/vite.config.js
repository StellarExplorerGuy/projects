import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => {
  process.env.NODE_ENV = 'production'
  return {
    plugins: [react()],
    define: {
      'process.env': process.env,
    },

    build: {
      // sourcemap: true, // ENABLE to debug code using source code in PROD
      outDir: '../extension',
      minify: 'terser',
      terserOptions: {
        parse: { html5_comments: false },
        maxWorkers: 4,
        compress: true,
        ecma: 2020,
        module: true,
        format: {
          comments: false,
          ascii_only: true,
        },
      },
      emptyOutDir: true,
      lib: {
        entry: path.resolve(__dirname, 'src/index.tsx'),
        name: 'content',
        formats: ['umd'],
        fileName: () => 'content.js',
      },
      assetsInlineLimit: 0,
      target: 'esnext',
    },
    resolve: {
      alias: {
        pages: path.resolve(__dirname, './src/pages'),
        utils: path.resolve(__dirname, './src/utils'),
        components: path.resolve(__dirname, './src/components'),
        types: path.resolve(__dirname, './src/types'),
        assets: path.resolve(__dirname, './src/assets'),
      },
    },
    preview: {
      port: 8080,
    },
  }
})
