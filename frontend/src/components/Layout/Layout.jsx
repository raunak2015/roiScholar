import React from 'react';
import { Box, Toolbar } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FAFBFC' }}>
      {/* Top Navigation */}
      <Navbar />
      
      {/* Side Navigation */}
      <Sidebar />
      
      {/* Main Content Area */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          width: { sm: `calc(100% - 240px)` },
          backgroundColor: '#FAFBFC',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Toolbar /> {/* Spacer to push content below Navbar */}
        
        {/* Page Content */}
        <Box sx={{ flexGrow: 1, mt: 2 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
