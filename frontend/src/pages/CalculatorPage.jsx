import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CalculatorInputForm from '../components/Calculator/CalculatorInputForm';
import CalculatorResultCard from '../components/Calculator/CalculatorResultCard';

export default function CalculatorPage() {
  const navigate = useNavigate();
  const [calculatorData, setCalculatorData] = useState({
    tuition: 45000,
    livingExpenses: 18000,
    insurance: 2500,
    totalLoanAmount: 65500,
    interestRate: 6.5,
    tenure: 10,
  });

  const handleCalculatorChange = (data) => {
    setCalculatorData(data);
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
            <button className="text-primary border-b-2 border-secondary pb-1 font-semibold">
              Calculator
            </button>
            <button className="text-on-surface-variant font-medium hover:text-primary transition-all duration-200">
              ROI Simulator
            </button>
            <button className="text-on-surface-variant font-medium hover:text-primary transition-all duration-200">
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
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-8 py-12 w-full">
        {/* Page Header */}
        <header className="mb-12">
          <h1 className="text-[2.75rem] font-extrabold text-on-surface tracking-tight leading-none">
            Loan Architect
          </h1>
          <p className="text-on-surface-variant text-lg mt-4 max-w-2xl">
            Precision modeling for your educational investment. Adjust variables to see your
            long-term financial trajectory.
          </p>
        </header>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <CalculatorInputForm onCalculatorChange={handleCalculatorChange} />
          <CalculatorResultCard calculatorData={calculatorData} />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-surface-container mt-16 bg-surface">
        <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-lg font-bold text-primary">EduLoan Compass</div>
          <div className="flex flex-wrap justify-center gap-8">
            <button className="text-sm text-on-surface-variant hover:text-primary transition-colors">
              About STEM ROI
            </button>
            <button className="text-sm text-on-surface-variant hover:text-primary transition-colors">
              Lender Transparency
            </button>
            <button className="text-sm text-on-surface-variant hover:text-primary transition-colors">
              Privacy Protocol
            </button>
            <button className="text-sm text-on-surface-variant hover:text-primary transition-colors">
              Terms of Service
            </button>
            <button className="text-sm text-on-surface-variant hover:text-primary transition-colors">
              Financial Concierge
            </button>
          </div>
          <div className="text-sm text-on-surface-variant">
            © 2024 EduLoan Compass. Navigating STEM futures with precision.
          </div>
        </div>
      </footer>
    </div>
  );
}
