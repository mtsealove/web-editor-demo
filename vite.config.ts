import react from '@vitejs/plugin-react';
import { createRequire } from 'node:module';
import path, { resolve } from 'path';
import { defineConfig, normalizePath } from 'vite';

const require = createRequire(import.meta.url);

export default defineConfig({
  plugins: [react({
    jsxImportSource: '@emotion/react',
  })],
  base: '/',
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') },
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@domains', replacement: path.resolve(__dirname, 'src/domains') },
      { find: '@models', replacement: path.resolve(__dirname, 'src/models') },
      { find: '@providers', replacement: path.resolve(__dirname, 'src/providers') },
      { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') },
      { find: '@styles', replacement: path.resolve(__dirname, 'src/styles') },
      { find: '@constants', replacement: path.resolve(__dirname, 'src/constants') },
      { find: '@stores', replacement: path.resolve(__dirname, 'src/stores') },
      { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') },
      { find: '@apis', replacement: path.resolve(__dirname, 'src/apis') },
      { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') },
      { find: '@atoms', replacement: path.resolve(__dirname, 'src/atoms') },
      { find: '@contexts', replacement: path.resolve(__dirname, 'src/contexts') },
      { find: '@router', replacement: path.resolve(__dirname, 'src/router') },
      { find: '@queries', replacement: path.resolve(__dirname, 'src/queries') },
      { find: '@preview', replacement: path.resolve(__dirname, 'src/preview') },
      { find: '@test', replacement: path.resolve(__dirname, 'src/__test__') },
      { find: '@locales', replacement: path.resolve(__dirname, 'src/locales') },
    ],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  build: {
    dynamicImportVarsOptions: {
      exclude: [],
    },
  },
  server: {
    hmr: true,
  },
  preview: {
    port: 5173,
  },
  optimizeDeps: {
  },
});
