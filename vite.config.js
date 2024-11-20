import { defineConfig } from 'vite';
import path from 'path';

const packageJson = require('./package.json');

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: 'edge-addons-api',
      formats: ['umd'],
      fileName: () => `edge-addons-api-${packageJson.version}.min.js`
    }
  }
});