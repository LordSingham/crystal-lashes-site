// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://crystallashes.com.br',
  // /portfolio so existe para redirecionar a /resultados: fora do sitemap,
  // senao o Google indexa um redirect (GSC "Pagina com redirecionamento", 05/08/2026).
  integrations: [sitemap({ filter: (page) => !page.includes('/portfolio/') })],
  compressHTML: true,
});
