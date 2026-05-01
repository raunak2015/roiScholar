import React, { Suspense, useState } from 'react';
import { useSelector } from 'react-redux';
import MainNavbar from '../components/Layout/MainNavbar';
import Footer from '../components/Layout/Footer';
import DashboardWelcome from '../components/Dashboard/DashboardWelcome';
import DashboardSidebar from '../components/Dashboard/DashboardSidebar';

const Dashboard = () => {
  try {
    const authState = useSelector((state) => state?.auth) || {};
    const user = authState?.user || {};
    const userName = user?.name || (user?.email ? user.email.split('@')[0] : 'Alex');

    return (
      <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading Dashboard...</div>}>
        <div className="bg-surface text-on-surface min-h-screen flex flex-col font-['Inter']">
          <MainNavbar userName={userName} />

          <main className="max-w-7xl mx-auto px-8 py-12 flex-grow">
            <DashboardWelcome userName={userName} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-12">
                {/* Placeholder for future sections */}
                <section className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/10">
                  <h2 className="text-2xl font-bold text-on-surface mb-4">Loan Scenarios</h2>
                  <p className="text-on-surface-variant">Your loan scenarios will appear here.</p>
                </section>

                <section className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/10">
                  <h2 className="text-2xl font-bold text-on-surface mb-4">Recent ROI Simulations</h2>
                  <p className="text-on-surface-variant">Your ROI simulations will appear here.</p>
                </section>
              </div>

              <Suspense fallback={<div className="lg:col-span-4">Loading sidebar...</div>}>
                <DashboardSidebar />
              </Suspense>
            </div>
          </main>

          <Footer />
        </div>
      </Suspense>
    );
  } catch (error) {
    console.error('Dashboard Error:', error);
    return (
      <div className="min-h-screen bg-surface flex flex-col">
        <MainNavbar userName="User" />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-on-surface mb-4">Error Loading Dashboard</h1>
            <p className="text-on-surface-variant mb-6 max-w-md">{error?.message || 'An unexpected error occurred'}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-primary text-on-primary rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
};

export default Dashboard;