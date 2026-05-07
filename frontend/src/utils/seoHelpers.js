/**
 * SEO Helper Utilities
 * Centralized management of SEO metadata and structured data
 */

export const SITE_CONFIG = {
  name: 'RoiScholar',
  url: process.env.VITE_SITE_URL || 'https://roischolar.com',
  description: 'Compare universities, calculate loan ROI, and plan your STEM career with data-driven insights.',
  email: 'contact@roischolar.com',
  twitterHandle: '@roischolar',
  author: 'RoiScholar Team',
  keywords: [
    'STEM education',
    'loan ROI calculator',
    'university comparison',
    'education investment',
    'scholarship finder',
    'student loans',
    'career ROI',
  ],
};

/**
 * Generate metadata object for a page
 * @param {Object} params - Metadata parameters
 * @returns {Object} Complete metadata object
 */
export const generatePageMetadata = ({
  title = SITE_CONFIG.name,
  description = SITE_CONFIG.description,
  path = '/',
  keywords = [],
  image = `${SITE_CONFIG.url}/og-image.png`,
  author = SITE_CONFIG.author,
  ogType = 'website',
  canonicalUrl = null,
}) => {
  const fullUrl = `${SITE_CONFIG.url}${path}`;
  const mergedKeywords = [...SITE_CONFIG.keywords, ...keywords].join(', ');

  return {
    title,
    description,
    keywords: mergedKeywords,
    author,
    canonicalUrl: canonicalUrl || fullUrl,
    image,
    url: fullUrl,
    ogType,
  };
};

/**
 * Generate JSON-LD Schema markup for Organization
 * @returns {Object} JSON-LD structured data
 */
export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  logo: `${SITE_CONFIG.url}/logo.png`,
  description: SITE_CONFIG.description,
  email: SITE_CONFIG.email,
  sameAs: [
    'https://twitter.com/roischolar',
    'https://linkedin.com/company/roischolar',
    'https://facebook.com/roischolar',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-XXX-XXX-XXXX',
    contactType: 'Customer Support',
    email: SITE_CONFIG.email,
  },
});

/**
 * Generate JSON-LD Schema markup for Application Page
 * @param {Object} pageData - Page specific data
 * @returns {Object} JSON-LD structured data
 */
export const generateApplicationSchema = (pageData = {}) => ({
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'RoiScholar',
  description: SITE_CONFIG.description,
  url: SITE_CONFIG.url,
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
});

/**
 * Generate JSON-LD Schema for Breadcrumb Navigation
 * @param {Array} breadcrumbs - Array of breadcrumb items [{name, path}]
 * @returns {Object} JSON-LD structured data
 */
export const generateBreadcrumbSchema = (breadcrumbs = []) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map((breadcrumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: breadcrumb.name,
    item: `${SITE_CONFIG.url}${breadcrumb.path}`,
  })),
});

/**
 * Generate JSON-LD Schema for FAQPage
 * @param {Array} faqs - Array of FAQ items [{question, answer}]
 * @returns {Object} JSON-LD structured data
 */
export const generateFAQSchema = (faqs = []) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

/**
 * Generate open graph meta tags object
 * @param {Object} metadata - Metadata object from generatePageMetadata
 * @returns {Array} Array of meta tag objects
 */
export const generateOpenGraphTags = (metadata) => [
  { property: 'og:type', content: metadata.ogType },
  { property: 'og:title', content: metadata.title },
  { property: 'og:description', content: metadata.description },
  { property: 'og:url', content: metadata.url },
  { property: 'og:image', content: metadata.image },
  { property: 'og:image:width', content: '1200' },
  { property: 'og:image:height', content: '630' },
  { property: 'og:site_name', content: SITE_CONFIG.name },
];

/**
 * Generate Twitter Card meta tags object
 * @param {Object} metadata - Metadata object from generatePageMetadata
 * @returns {Array} Array of meta tag objects
 */
export const generateTwitterTags = (metadata) => [
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: metadata.title },
  { name: 'twitter:description', content: metadata.description },
  { name: 'twitter:image', content: metadata.image },
  { name: 'twitter:creator', content: SITE_CONFIG.twitterHandle },
];

/**
 * Route to metadata mapping for convenience
 */
export const PAGE_METADATA = {
  '/': {
    title: 'RoiScholar | Plan Your STEM Future with Data-Driven Insights',
    description: 'Make informed education decisions with ROI projections, loan calculators, and university comparisons for STEM programs.',
    keywords: ['STEM education', 'education ROI', 'university comparison', 'student loans'],
  },
  '/calculator': {
    title: 'Education Loan Calculator | RoiScholar',
    description: 'Calculate monthly payments, total interest, and repayment schedules for your education loans. Plan your finances with precision.',
    keywords: ['loan calculator', 'monthly payment', 'interest calculator', 'education financing'],
  },
  '/roi-simulator': {
    title: 'Career ROI Simulator | RoiScholar',
    description: 'Project your career earnings, calculate break-even points, and simulate different salary scenarios for your STEM degree.',
    keywords: ['ROI calculator', 'career earnings', 'salary projection', 'degree investment'],
  },
  '/compare': {
    title: 'Compare Universities & STEM Programs | RoiScholar',
    description: 'Compare tuition costs, graduate outcomes, and ROI across top STEM universities worldwide. Make the best choice.',
    keywords: ['university comparison', 'program comparison', 'tuition comparison', 'STEM schools'],
  },
  '/applications': {
    title: 'Application Tracker | Manage Your University Applications',
    description: 'Track application status, deadlines, and documents for all your university applications in one organized dashboard.',
    keywords: ['application tracker', 'university applications', 'application management'],
  },
  '/dashboard': {
    title: 'My Dashboard | RoiScholar',
    description: 'View your saved scenarios, application progress, financial insights, and education planning summary.',
    keywords: ['student dashboard', 'education planning', 'financial insights'],
  },
  '/scholarships': {
    title: 'STEM Scholarship Finder | Find Fully-Funded Opportunities',
    description: 'Discover fully-funded scholarships and grants for STEM students. Reduce your education loans and increase accessibility.',
    keywords: ['scholarships', 'grants', 'STEM scholarships', 'funded opportunities'],
  },
  '/login': {
    title: 'Sign In | RoiScholar',
    description: 'Log in to your RoiScholar account to access personalized education insights and planning tools.',
    keywords: ['login', 'sign in'],
    robots: 'noindex',
  },
  '/register': {
    title: 'Create Account | RoiScholar',
    description: 'Join RoiScholar to start planning your STEM education and comparing universities based on ROI.',
    keywords: ['register', 'sign up'],
    robots: 'noindex',
  },
};

/**
 * Get metadata for a specific route
 * @param {string} path - Route path
 * @returns {Object} Metadata object
 */
export const getRouteMetadata = (path) => {
  const metadata = PAGE_METADATA[path] || PAGE_METADATA['/'];
  return generatePageMetadata({
    title: metadata.title,
    description: metadata.description,
    path,
    keywords: metadata.keywords || [],
  });
};
