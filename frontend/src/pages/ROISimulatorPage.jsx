import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ROISimulatorInputs from '../components/ROISimulator/ROISimulatorInputs';
import FinancialMilestoneCard from '../components/ROISimulator/FinancialMilestoneCard';
import FinancialGainCard from '../components/ROISimulator/FinancialGainCard';
import EarningsChart from '../components/ROISimulator/EarningsChart';
import ROISimulatorCTA from '../components/ROISimulator/ROISimulatorCTA';

export default function ROISimulatorPage() {
  const navigate = useNavigate();
  const [simulatorInputs, setSimulatorInputs] = useState({
    degree: 'Artificial Intelligence & ML',
    market: 'United States of America',
    startingSalary: 112500,
  });

  const handleInputChange = (data) => {
    setSimulatorInputs(data);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 w-full z-50 bg-surface shadow-sm">
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center h-20">
          <button
            onClick={() => navigate('/')}
            className="text-xl font-black tracking-tighter text-primary hover:opacity-80 transition-opacity"
          >
            EduLoan Compass
          </button>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-on-surface-variant font-medium hover:text-primary transition-all duration-200"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate('/calculator')}
              className="text-on-surface-variant font-medium hover:text-primary transition-all duration-200"
            >
              Calculator
            </button>
            <button className="text-primary border-b-2 border-secondary pb-1 font-semibold">
              ROI Simulator
            </button>
            <button
              onClick={() => navigate('/compare')}
              className="text-on-surface-variant font-medium hover:text-primary transition-all duration-200"
            >
              Compare
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="text-on-surface-variant font-medium hover:text-primary transition-all duration-200"
            >
              Profile
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-surface-container-low transition-all duration-200">
              <span className="material-symbols-outlined text-primary">notifications</span>
            </button>
            <button className="p-2 rounded-full hover:bg-surface-container-low transition-all duration-200">
              <span className="material-symbols-outlined text-primary">help_outline</span>
            </button>
            <div className="h-10 w-10 rounded-full bg-primary-container flex items-center justify-center text-white font-bold ml-2">
              JD
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-8 py-12 w-full">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-[2.75rem] font-extrabold tracking-tight text-primary leading-tight">
            ROI Simulator
          </h1>
          <p className="text-on-surface-variant text-lg max-w-2xl mt-2">
            Project your career trajectory and financial health by simulating educational costs
            against global STEM market trends.
          </p>
        </div>

        {/* Simulation Inputs */}
        <ROISimulatorInputs onInputChange={handleInputChange} />

        {/* Main Dashboard Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <FinancialMilestoneCard />
          <FinancialGainCard />
          <EarningsChart />
          <ROISimulatorCTA />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-surface-container mt-16 bg-surface">
        <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-lg font-bold text-primary">EduLoan Compass</span>
            <p className="text-on-surface-variant text-sm max-w-xs leading-relaxed">
              © 2024 EduLoan Compass. Navigating STEM futures with precision.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <button className="text-on-surface-variant text-sm hover:text-primary transition-colors">
              About STEM ROI
            </button>
            <button className="text-on-surface-variant text-sm hover:text-primary transition-colors">
              Lender Transparency
            </button>
            <button className="text-on-surface-variant text-sm hover:text-primary transition-colors">
              Privacy Protocol
            </button>
            <button className="text-on-surface-variant text-sm hover:text-primary transition-colors">
              Terms of Service
            </button>
            <button className="text-on-surface-variant text-sm hover:text-primary transition-colors">
              Financial Concierge
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
