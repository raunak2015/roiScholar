import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ROISimulatorInputs from '../components/ROISimulator/ROISimulatorInputs';
import FinancialMilestoneCard from '../components/ROISimulator/FinancialMilestoneCard';
import FinancialGainCard from '../components/ROISimulator/FinancialGainCard';
import ROISimulatorCTA from '../components/ROISimulator/ROISimulatorCTA';
import MainNavbar from '../components/Layout/MainNavbar';
import { setRoiInputs, setRoiResults } from '../features/roi/roiSlice';
import { calculateROI, calculateMultiYearROI } from '../features/roi/roiUtils';
import FileUpload from '../components/UI/FileUpload';
import ROIVisualizer from '../components/ROI/ROIVisualizer';

export default function ROISimulatorPage() {
  const dispatch = useDispatch();
  const loanState = useSelector((state) => state.loan || {});
  const roiState = useSelector((state) => state.roi || {});
  const [, setSimulatorInputs] = useState({
    degree: 'Artificial Intelligence & ML',
    market: 'United States of America',
    startingSalary: 112500,
  });

  const handleInputChange = (data) => {
    setSimulatorInputs(data);

    dispatch(
      setRoiInputs({
        selectedDegree: data.degree,
        selectedCountry: data.market,
        expectedSalary: data.startingSalary,
      }),
    );

    const monthlyPayment = loanState?.monthlyPayment || 0;
    const roiResults = calculateROI({
      monthlyPayment,
      startingSalary: data.startingSalary,
    });

    dispatch(
      setRoiResults({
        projectedSalary: data.startingSalary,
        breakEvenYears: roiResults.breakEvenYears,
        netGain: roiResults.totalGainAtBreakEven,
      }),
    );
  };

  return (
    <div className="min-h-screen bg-[#f8faff] flex flex-col font-['Inter']">
      <MainNavbar />

      <main className="flex-1 max-w-7xl mx-auto px-8 py-12 w-full">
        {/* Header Section */}
        <header className="mb-10">
          <h1 className="text-[2.75rem] font-black tracking-tight text-[#1e2b58] mb-2">
            ROI Simulator
          </h1>
          <p className="text-on-surface-variant text-base max-w-2xl font-medium">
            Project your career trajectory and financial health by simulating educational costs against global STEM market trends.
          </p>
        </header>

        {/* Top Row: Inputs */}
        <ROISimulatorInputs onInputChange={handleInputChange} />

        {/* Middle Row: Metrics Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 items-stretch">
          <div className="lg:col-span-5 h-full">
            <FinancialMilestoneCard roiState={roiState} loanState={loanState} />
          </div>
          <div className="lg:col-span-7 h-full">
            <FinancialGainCard roiState={roiState} loanState={loanState} />
          </div>
        </div>

        {/* Bottom Row: Visualizer Chart */}
        <ROIVisualizer 
          totalInvestment={loanState?.totalLoanAmount || 50000}
          startingSalary={roiState?.expectedSalary || 112500}
        />

        {/* CTA Section */}
        <ROISimulatorCTA />
      </main>

      <footer className="w-full border-t border-outline-variant/10 bg-white mt-16">
        <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-4">
            <div className="text-xl font-black text-[#1e2b58]">EduLoan Compass</div>
            <div className="text-on-surface-variant text-xs font-medium leading-relaxed max-w-[240px]">
              © 2024 EduLoan Compass. Navigating STEM futures with precision.
            </div>
          </div>
          
          <div className="flex flex-wrap gap-x-12 gap-y-4">
            {['About STEM ROI', 'Lender Transparency', 'Privacy Protocol', 'Terms of Service', 'Financial Concierge'].map(link => (
              <button key={link} className="text-on-surface-variant text-xs font-bold hover:text-[#1e2b58] transition-colors">{link}</button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

