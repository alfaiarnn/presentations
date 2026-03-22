import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://alfaiarnn.github.io',
  base: '/presentations/',
  build: {
    assets: '_assets'
  }
});
