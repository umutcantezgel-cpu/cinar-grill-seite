import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://cinargrill.de',
  output: 'static',

  integrations: [
    tailwind({
      applyBaseStyles: false, // We'll use custom base styles
    }),
  ],

  build: {
    inlineStylesheets: 'never', // No inline styles for CSP compliance
    assets: '_assets',
  },

  vite: {
    build: {
      cssMinify: 'lightningcss',
      rollupOptions: {
        output: {
          // Ensure consistent hashing for SRI
          entryFileNames: '_assets/[name].[hash].js',
          chunkFileNames: '_assets/[name].[hash].js',
          assetFileNames: '_assets/[name].[hash][extname]',
        },
      },
    },
  },

  compilerOptions: {
    // Remove comments in production
    removeComments: true,
  },

  // Security headers and optimizations
  server: {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  },
});
