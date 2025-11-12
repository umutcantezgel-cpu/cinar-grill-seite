import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.cinar-grill.de',
  base: '/',
  trailingSlash: 'never',
  build: {
    format: 'file',
    assets: 'assets',
    inlineStylesheets: 'never',  // No inline styles for CSP compliance
  },
  output: 'static',
  integrations: [
    tailwind({
      applyBaseStyles: false,  // We use custom base styles with tokens
    }),
  ],
  vite: {
    build: {
      cssCodeSplit: false,  // Single CSS file for better caching
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name].[hash][extname]',
          chunkFileNames: 'assets/[name].[hash].js',
          entryFileNames: 'assets/[name].[hash].js',
        },
      },
    },
    ssr: {
      noExternal: [],
    },
  },
  compressHTML: true,
  scopedStyleStrategy: 'class',
});
