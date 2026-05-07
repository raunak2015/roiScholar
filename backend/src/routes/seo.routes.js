const express = require('express');
const University = require('../models/University.model');

const router = express.Router();

/**
 * GET /api/seo/sitemap
 * Generate dynamic sitemap for main pages
 */
router.get('/sitemap', (req, res) => {
  try {
    const siteUrl = process.env.FRONTEND_URL || 'https://roischolar.com';
    const today = new Date().toISOString().split('T')[0];

    const staticRoutes = [
      { path: '/', priority: 1.0, frequency: 'weekly' },
      { path: '/calculator', priority: 0.9, frequency: 'weekly' },
      { path: '/roi-simulator', priority: 0.9, frequency: 'weekly' },
      { path: '/compare', priority: 0.9, frequency: 'weekly' },
      { path: '/scholarships', priority: 0.9, frequency: 'weekly' },
      { path: '/applications', priority: 0.8, frequency: 'weekly' },
      { path: '/dashboard', priority: 0.7, frequency: 'weekly' },
    ];

    const urlElements = staticRoutes
      .map(
        (route) => `
  <url>
    <loc>${siteUrl}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.frequency}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
      )
      .join('');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;

    res.set('Content-Type', 'application/xml');
    res.send(sitemap);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).json({ error: 'Failed to generate sitemap' });
  }
});

/**
 * GET /api/seo/sitemap-universities
 * Generate dynamic sitemap for universities
 */
router.get('/sitemap-universities', async (req, res) => {
  try {
    const siteUrl = process.env.FRONTEND_URL || 'https://roischolar.com';
    const today = new Date().toISOString().split('T')[0];

    const universities = await University.find({}, 'id name slug updatedAt').lean();

    const urlElements = universities
      .map(
        (uni) => `
  <url>
    <loc>${siteUrl}/compare/${uni.slug || uni.id}</loc>
    <lastmod>${new Date(uni.updatedAt).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
      )
      .join('');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;

    res.set('Content-Type', 'application/xml');
    res.send(sitemap);
  } catch (error) {
    console.error('Error generating universities sitemap:', error);
    res.status(500).json({ error: 'Failed to generate universities sitemap' });
  }
});

/**
 * GET /api/seo/robots.txt
 * Serve robots.txt (can be served by nginx/static instead)
 */
router.get('/robots.txt', (req, res) => {
  try {
    const siteUrl = process.env.FRONTEND_URL || 'https://roischolar.com';
    const robotsTxt = `# robots.txt for RoiScholar
# https://www.robotstxt.org/

User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/auth
Disallow: /uploads/
Disallow: *?sort=
Disallow: *?utm_

User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 1

# Block bad bots
User-agent: MJ12bot
Disallow: /

User-agent: AhrefsBot
Disallow: /

Sitemap: ${siteUrl}/sitemap.xml
Sitemap: ${siteUrl}/api/seo/sitemap-universities
`;

    res.set('Content-Type', 'text/plain');
    res.send(robotsTxt);
  } catch (error) {
    console.error('Error generating robots.txt:', error);
    res.status(500).json({ error: 'Failed to generate robots.txt' });
  }
});

/**
 * GET /api/seo/schema/:type
 * Generate JSON-LD schema markup
 */
router.get('/schema/:type', (req, res) => {
  try {
    const { type } = req.params;
    const siteUrl = process.env.FRONTEND_URL || 'https://roischolar.com';

    const schemas = {
      organization: {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'RoiScholar',
        url: siteUrl,
        logo: `${siteUrl}/logo.png`,
        description:
          'Compare universities, calculate loan ROI, and plan your STEM career with data-driven insights.',
        email: 'contact@roischolar.com',
        sameAs: [
          'https://twitter.com/roischolar',
          'https://linkedin.com/company/roischolar',
        ],
      },
      application: {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'RoiScholar',
        description:
          'Compare universities, calculate loan ROI, and plan your STEM career with data-driven insights.',
        url: siteUrl,
        applicationCategory: 'EducationApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          description: 'Free education planning tool',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          ratingCount: '250',
        },
      },
    };

    const schema = schemas[type];

    if (!schema) {
      return res.status(404).json({ error: 'Schema type not found' });
    }

    res.set('Content-Type', 'application/ld+json');
    res.json(schema);
  } catch (error) {
    console.error('Error generating schema:', error);
    res.status(500).json({ error: 'Failed to generate schema' });
  }
});

module.exports = router;
