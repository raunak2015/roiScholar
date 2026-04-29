import React from 'react';
import { useSelector } from 'react-redux';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import DashboardWelcome from '../components/Dashboard/DashboardWelcome';
import LoanScenariosSection from '../components/Dashboard/LoanScenariosSection';
import RecentROISimulations from '../components/Dashboard/RecentROISimulations';
import DashboardSidebar from '../components/Dashboard/DashboardSidebar';
import DashboardFooter from '../components/Dashboard/DashboardFooter';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const userName = user?.name || (user?.email ? user.email.split('@')[0] : 'Alex');

  return (
    <div className="bg-[#f9f9ff] text-on-surface min-h-screen font-['Inter']">
      <DashboardHeader userName={userName} />

      <main className="max-w-7xl mx-auto px-8 py-12">
        <DashboardWelcome userName={userName} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-12">
            <LoanScenariosSection />
            <RecentROISimulations />
          </div>

          <DashboardSidebar />
        </div>
      </main>

      <DashboardFooter />
    </div>
  );
};

export default Dashboard;