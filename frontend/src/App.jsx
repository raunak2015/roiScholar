import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import ReactGA from 'react-ga4';
import { ToastContainer } from 'react-toastify';
import AppRoutes from './AppRoutes';
import AppErrorBoundary from './components/UI/AppErrorBoundary';
import { getRouteMetadata, PAGE_METADATA, generateOrganizationSchema, generateApplicationSchema } from './utils/seoHelpers';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

if (GA_MEASUREMENT_ID) {
  ReactGA.initialize(GA_MEASUREMENT_ID);
}

/**
 * Enhanced RouteMeta component with comprehensive SEO support
 * Manages dynamic metadata, structured data, and analytics for each route
 */
const RouteMeta = () => {
  const location = useLocation();
  const metadata = getRouteMetadata(location.pathname);
  const pageData = PAGE_METADATA[location.pathname];

  React.useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    ReactGA.send({
      hitType: 'pageview',
      page: `${location.pathname}${location.search}`,
      title: metadata.title,
    });
  }, [location.pathname, location.search, metadata.title]);

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="keywords" content={metadata.keywords} />
      <meta name="author" content={metadata.author} />
      
      {/* Robots Meta */}
      <meta 
        name="robots" 
        content={pageData?.robots ? `${pageData.robots}, follow` : 'index, follow'} 
      />

      {/* Canonical URL */}
      <link rel="canonical" href={metadata.canonicalUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={metadata.ogType} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:url" content={metadata.url} />
      <meta property="og:image" content={metadata.image} />
      <meta property="og:site_name" content="RoiScholar" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      <meta name="twitter:image" content={metadata.image} />
      <meta name="twitter:creator" content="@roischolar" />

      {/* Additional SEO Meta Tags */}
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="theme-color" content="#1e40af" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(generateOrganizationSchema())}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(generateApplicationSchema())}
      </script>
    </Helmet>
  );
};

function App() {
  const themeMode = useSelector((state) => state?.ui?.themeMode || 'light');

  // Global theme synchronization
  React.useLayoutEffect(() => {
    console.log('Current Theme Mode:', themeMode);
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(themeMode);
    root.setAttribute('data-theme', themeMode);
    
    // Force a repaint for certain browsers
    root.style.display = 'none';
    root.offsetHeight;
    root.style.display = '';
  }, [themeMode]);

  return (
    <AppErrorBoundary>
      <BrowserRouter>
        <RouteMeta />
        <div className={`min-h-screen bg-surface text-on-surface transition-colors duration-300 ${themeMode === 'dark' ? 'dark' : ''}`}>
          <AppRoutes />


          <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
            draggable
            theme={themeMode === 'dark' ? 'dark' : 'light'}
          />
        </div>
      </BrowserRouter>
    </AppErrorBoundary>
  );
}

export default App;
