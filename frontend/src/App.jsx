import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import ReactGA from 'react-ga4';
import { ToastContainer } from 'react-toastify';
import AppRoutes from './AppRoutes';
import AppErrorBoundary from './components/UI/AppErrorBoundary';
import ThemeToggle from './components/UI/ThemeToggle';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

if (GA_MEASUREMENT_ID) {
  ReactGA.initialize(GA_MEASUREMENT_ID);
}

const routeMeta = {
  default: {
    title: 'EduLoan Compass',
    description: 'Compare universities, calculate loan ROI, and plan your STEM career with EduLoan Compass.',
  },
  '/': {
    title: 'EduLoan Compass | Plan Your STEM Future',
    description: 'Make data-driven education decisions with ROI projections and loan insights for STEM programs.',
  },
  '/calculator': {
    title: 'Loan Calculator | EduLoan Compass',
    description: 'Estimate monthly payments, interest, and repayment totals for your education loan.',
  },
  '/roi-simulator': {
    title: 'ROI Simulator | EduLoan Compass',
    description: 'Project your career earnings and find the break-even point for your STEM degree investment.',
  },
  '/compare': {
    title: 'Compare Universities | EduLoan Compass',
    description: 'Compare tuition, ROI, and outcomes across top STEM programs worldwide.',
  },
  '/applications': {
    title: 'Application Tracker | EduLoan Compass',
    description: 'Track your application progress and manage documents in one place.',
  },
  '/dashboard': {
    title: 'Dashboard | EduLoan Compass',
    description: 'Monitor your saved scenarios, application status, and financial insights.',
  },
};

const RouteMeta = () => {
  const location = useLocation();
  const meta = routeMeta[location.pathname] || routeMeta.default;

  React.useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    ReactGA.send({
      hitType: 'pageview',
      page: `${location.pathname}${location.search}`,
      title: meta.title,
    });
  }, [location.pathname, location.search, meta.title]);

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
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
          
          <div className="fixed bottom-6 right-6 z-[60]">
            <ThemeToggle />
          </div>

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
