/**
 * Sitemap Generator
 * Dynamically generates sitemap.xml from SEO routes contract
 */

import type { APIRoute } from 'astro';
import seoRoutesData from '../../contracts/seo.routes.json';

export const GET: APIRoute = async () => {
  const baseUrl = seoRoutesData.baseUrl;

  // Filter out excluded routes (404, 503, offline)
  const routes = seoRoutesData.routes.filter(
    (route) => !route.excludeFromSitemap
  );

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${routes.map((route) => {
    const fullUrl = `${baseUrl}${route.path}`;
    const lastmod = new Date().toISOString().split('T')[0];

    return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`;
  }).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
