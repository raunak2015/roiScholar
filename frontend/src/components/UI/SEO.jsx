import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  generatePageMetadata,
  generateOpenGraphTags,
  generateTwitterTags,
  SITE_CONFIG,
} from '../utils/seoHelpers';

/**
 * SEO Component for managing page head tags
 * Provides a simple interface to set all SEO metadata for any page
 *
 * @example
 * <SEO
 *   title="Page Title | RoiScholar"
 *   description="Page description"
 *   keywords={['keyword1', 'keyword2']}
 *   path="/page"
 *   image="https://example.com/image.png"
 * />
 */
const SEO = ({
  title = SITE_CONFIG.name,
  description = SITE_CONFIG.description,
  path = '/',
  keywords = [],
  image = `${SITE_CONFIG.url}/og-image.png`,
  author = SITE_CONFIG.author,
  canonicalUrl = null,
  ogType = 'website',
  noindex = false,
  nofollow = false,
  children = null,
}) => {
  const metadata = generatePageMetadata({
    title,
    description,
    path,
    keywords,
    image,
    author,
    canonicalUrl,
    ogType,
  });

  const ogTags = generateOpenGraphTags(metadata);
  const twitterTags = generateTwitterTags(metadata);

  const robots = [
    noindex ? 'noindex' : 'index',
    nofollow ? 'nofollow' : 'follow',
  ].join(', ');

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={metadata.keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={robots} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="charset" content="UTF-8" />

      {/* Canonical URL */}
      <link rel="canonical" href={metadata.canonicalUrl} />

      {/* Open Graph Tags */}
      {ogTags.map((tag, index) => (
        <meta key={index} property={tag.property} content={tag.content} />
      ))}

      {/* Twitter Card Tags */}
      {twitterTags.map((tag, index) => (
        <meta key={index} name={tag.name} content={tag.content} />
      ))}

      {/* Additional SEO Tags */}
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="theme-color" content="#1e40af" />

      {/* Alternate Language Links */}
      <link rel="alternate" hrefLang="en" href={metadata.canonicalUrl} />

      {/* Preconnect to external resources */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" />

      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />

      {/* Additional SEO metadata */}
      {children}
    </Helmet>
  );
};

export default SEO;
