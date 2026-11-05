import { solidStart } from '@solidjs/start/config';
import { nitro } from 'nitro/vite';
import { defineConfig } from 'vite';

// Every page prerenders to plain HTML in its own folder (/pricing/ is pricing/index.html): the pages
// below, then each page they link to, such as every post and older blog page
export default defineConfig({
  plugins: [
    solidStart(),
    nitro({
      preset: 'static',
      prerender: {
        routes: ['/', '/pricing/', '/about/', '/contact/', '/blog/'],
        crawlLinks: true,
        failOnError: true,
      },
    }),
  ],
});
