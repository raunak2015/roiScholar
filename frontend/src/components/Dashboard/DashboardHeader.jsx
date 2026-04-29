import React from 'react';
import MainNavbar from '../Layout/MainNavbar';

const DashboardHeader = ({ userName = 'Alex' }) => {
  return <MainNavbar userName={userName} />;
};

export default DashboardHeader;
