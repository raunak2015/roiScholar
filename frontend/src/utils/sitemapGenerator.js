/**
 * Sitemap Generator
 * Generates XML sitemaps for SEO purposes
 */

const SITE_URL = process.env.VITE_SITE_URL || 'https://roischolar.com';

const STATIC_ROUTES = [
  {
    path: '/',
    priority: 1.0,
    frequency: 'weekly',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/calculator',
    priority: 0.9,
    frequency: 'weekly',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/roi-simulator',
    priority: 0.9,
    frequency: 'weekly',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/compare',
    priority: 0.9,
    frequency: 'weekly',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/applications',
    priority: 0.8,
    frequency: 'weekly',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/scholarships',
    priority: 0.9,
    frequency: 'weekly',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/dashboard',
    priority: 0.7,
    frequency: 'weekly',
    lastmod: new Date().toISOString().split('T')[0],
  },
];

/**
 * Generate XML sitemap from route array
 * @param {Array} routes - Array of route objects with path, priority, frequency, lastmod
 * @returns {string} XML sitemap
 */
export const generateSitemapXML = (routes = STATIC_ROUTES) => {
  const urlElements = routes
    .map(
      (route) => `
  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.frequency}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
};

/**
 * Generate XML sitemap for universities
 * @param {Array} universities - Array of university objects with id, slug, lastmod
 * @returns {string} XML sitemap
 */
export const generateUniversitySitemapXML = (universities = []) => {
  const urlElements = universities
    .map(
      (uni) => `
  <url>
    <loc>${SITE_URL}/university/${uni.slug || uni.id}</loc>
    <lastmod>${uni.lastmod || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
};

/**
 * Generate sitemap index for multiple sitemaps
 * @param {Array} sitemapUrls - Array of sitemap URLs
 * @returns {string} XML sitemap index
 */
export const generateSitemapIndex = (sitemapUrls = []) => {
  const sitemapElements = sitemapUrls
    .map(
      (url) => `
  <sitemap>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapElements}
</sitemapindex>`;
};

export { STATIC_ROUTES, SITE_URL };
