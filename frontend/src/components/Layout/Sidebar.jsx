import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Box } from '@mui/material';
import { Dashboard as DashboardIcon, Calculate as CalculateIcon, CompareArrows as CompareIcon, Person as PersonIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

const drawerWidth = 240;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'ROI Calculator', icon: <CalculateIcon />, path: '/calculator' },
    { text: 'Compare Universities', icon: <CompareIcon />, path: '/compare' },
    { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: drawerWidth, 
          boxSizing: 'border-box', 
          backgroundColor: '#f4f5f7', 
          borderRight: '1px solid #dfe1e6' 
        },
      }}
    >
      <Toolbar /> {/* Spacer for Navbar */}
      <Box sx={{ overflow: 'auto', display: 'flex', flexDirection: 'column', height: '100%', mt: 2 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton 
                onClick={() => navigate(item.path)}
                selected={location.pathname === item.path}
                sx={{
                  mx: 1,
                  borderRadius: 1,
                  '&.Mui-selected': {
                    backgroundColor: '#e6effc',
                    color: '#0052CC',
                    '& .MuiListItemIcon-root': {
                      color: '#0052CC',
                    }
                  },
                  '&:hover': {
                    backgroundColor: '#ebecf0',
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: location.pathname === item.path ? '#0052CC' : '#42526E' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  sx={{ 
                    '& .MuiTypography-root': { 
                      fontWeight: location.pathname === item.path ? 600 : 500, 
                      color: location.pathname === item.path ? '#0052CC' : '#172B4D',
                      fontSize: '0.875rem'
                    } 
                  }} 
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ flexGrow: 1 }} />
        <List sx={{ mb: 2 }}>
          <ListItem disablePadding>
            <ListItemButton 
              onClick={handleLogout} 
              sx={{ 
                mx: 1,
                borderRadius: 1,
                '&:hover': { 
                  backgroundColor: '#ffebe6', 
                  color: '#de350b', 
                  '& .MuiListItemIcon-root': { color: '#de350b' } 
                } 
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: '#42526E' }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Logout" 
                sx={{ 
                  '& .MuiTypography-root': { 
                    color: '#172B4D',
                    fontWeight: 500,
                    fontSize: '0.875rem'
                  } 
                }} 
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
