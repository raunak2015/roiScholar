import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppRoutes from './AppRoutes';
import AppErrorBoundary from './components/UI/AppErrorBoundary';

const AppThemeSync = ({ children }) => {
  const themeMode = useSelector((state) => state?.ui?.themeMode || 'light');

  React.useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    document.documentElement.dataset.theme = themeMode;
    document.documentElement.classList.toggle('dark', themeMode === 'dark');
  }, [themeMode]);

  return children;
};

function App() {
  return (
    <AppErrorBoundary>
      <AppThemeSync>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppThemeSync>
    </AppErrorBoundary>
  );
}

export default App;
