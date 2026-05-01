import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ROISimulatorInputs from '../components/ROISimulator/ROISimulatorInputs';
import FinancialMilestoneCard from '../components/ROISimulator/FinancialMilestoneCard';
import FinancialGainCard from '../components/ROISimulator/FinancialGainCard';
import EarningsChart from '../components/ROISimulator/EarningsChart';
import ROISimulatorCTA from '../components/ROISimulator/ROISimulatorCTA';
import MainNavbar from '../components/Layout/MainNavbar';
import { setRoiInputs, setRoiResults } from '../features/roi/roiSlice';
import { calculateROI, calculateMultiYearROI } from '../features/roi/roiUtils';

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
    <div className="min-h-screen bg-surface flex flex-col">
      <MainNavbar userName="JD" />

      <main className="flex-1 max-w-7xl mx-auto px-8 py-12 w-full">
        <div className="mb-12">
          <h1 className="text-[2.75rem] font-extrabold tracking-tight text-primary leading-tight">
            ROI Simulator
          </h1>
          <p className="text-on-surface-variant text-lg max-w-2xl mt-2">
            Project your career trajectory and financial health by simulating educational costs
            against global STEM market trends.
          </p>
        </div>

        <ROISimulatorInputs onInputChange={handleInputChange} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <FinancialMilestoneCard roiState={roiState} loanState={loanState} />
          <FinancialGainCard roiState={roiState} loanState={loanState} />
          <EarningsChart roiState={roiState} loanState={loanState} />
          <ROISimulatorCTA />
        </div>
      </main>

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

