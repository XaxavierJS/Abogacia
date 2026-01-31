// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath, URL } from 'node:url';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// Detectar si estamos en GitHub Actions para usar base path
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'static',
  site: isGitHubPages ? 'https://xaxavierjs.github.io' : 'http://localhost:4321',
  base: isGitHubPages ? '/Abogacia' : '/',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  },
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      cssMinify: true
    }
  }
});
