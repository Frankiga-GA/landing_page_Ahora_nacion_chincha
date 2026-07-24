import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://zinthiagaray.pe',
  server: {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  },
});
