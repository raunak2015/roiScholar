import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import ReactGA from 'react-ga4';
import { ToastContainer } from 'react-toastify';
import AppRoutes from './AppRoutes';
import AppErrorBoundary from './components/UI/AppErrorBoundary';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

if (GA_MEASUREMENT_ID) {
  ReactGA.initialize(GA_MEASUREMENT_ID);
}

const routeMeta = {
  default: {
    title: 'EduLoan Compass',
    description:
      'Compare universities, calculate loan ROI, and plan your STEM career with EduLoan Compass.',
  },
  '/': {
    title: 'EduLoan Compass | Plan Your STEM Future',
    description:
      'Make data-driven education decisions with ROI projections and loan insights for STEM programs.',
  },
  '/calculator': {
    title: 'Loan Calculator | EduLoan Compass',
    description: 'Estimate monthly payments, interest, and repayment totals for your education loan.',
  },
  '/roi-simulator': {
    title: 'ROI Simulator | EduLoan Compass',
    description:
      'Project your career earnings and find the break-even point for your STEM degree investment.',
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

const AppThemeSync = ({ themeMode, children }) => {
  React.useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    document.documentElement.dataset.theme = themeMode;
    document.documentElement.classList.toggle('dark', themeMode === 'dark');
  }, [themeMode]);

  return children;
};

const RouteMeta = () => {
  const location = useLocation();
  const meta = routeMeta[location.pathname] || routeMeta.default;

  React.useEffect(() => {
    if (!GA_MEASUREMENT_ID) {
      return;
    }

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

  return (
    <AppErrorBoundary>
      <AppThemeSync themeMode={themeMode}>
        <>
          <BrowserRouter>
            <RouteMeta />
            <AppRoutes />
          </BrowserRouter>
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
        </>
      </AppThemeSync>
    </AppErrorBoundary>
  );
}

export default App;
