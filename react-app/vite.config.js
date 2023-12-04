import path from 'node:path'
import { defineConfig } from 'vite'
import { terser } from 'rollup-plugin-terser'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    
    // tsconfigPaths({ root: './' }),
    react(),
    // terser({
      // numWorkers: 4,
      // compress: true,
      // format: {
      //   ecma: 2020,
      //   ascii_only: true,
      // },
    // }),
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      // numWorkers: 4,
      compress: true,
      ecma: 2020,
      module: true,
      format: {
        comments: false,
        ecma: 2020,
        ascii_only: true,
      },
    },
    // target: 'modules',
    outDir: '../extension',
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'content',
      formats: ['umd'],
      fileName: () => `content.js`,
    },

    //   // minify: 'terser',
    //   // assetsInlineLimit: 0,
      // rollupOptions: {
      //   external: ['react', 'react-dom', '@mui/material', '@mui/joy'],
      //   output: {
      //     strict: false,
      //     dir: '../extension',
      //     format: 'cjs',
      //     // globals: {
      //     //   react: 'React',
      //     //   'react-dom': 'ReactDOM',
      //     //   // '@mui/joy': '@mui/joy',
      //     //   // '@mui/material': '@mui/material',
      //     // },
      //   },
      // },
  },
  resolve: {
    alias: {
      pages: path.resolve(__dirname, './src/pages'),
      utils: path.resolve(__dirname, './src/utils'),
      components: path.resolve(__dirname, './src/components'),
      types: path.resolve(__dirname, './src/types'),
      assets: path.resolve(__dirname, './src/assets'),
    },
    // '@mui/material': '@mui/material',
    // '@mui/joy': '@mui/joy',
  },
  preview: {
    port: 8080,
  },
})
