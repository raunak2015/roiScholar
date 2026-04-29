import { useState } from 'react';
import CalculatorInputForm from '../components/Calculator/CalculatorInputForm';
import CalculatorResultCard from '../components/Calculator/CalculatorResultCard';
import MainNavbar from '../components/Layout/MainNavbar';

export default function CalculatorPage() {
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
      <MainNavbar userName="JD" />

      <main className="flex-1 max-w-7xl mx-auto px-8 py-12 w-full">
        <header className="mb-12">
          <h1 className="text-[2.75rem] font-extrabold text-on-surface tracking-tight leading-none">
            Loan Architect
          </h1>
          <p className="text-on-surface-variant text-lg mt-4 max-w-2xl">
            Precision modeling for your educational investment. Adjust variables to see your
            long-term financial trajectory.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <CalculatorInputForm onCalculatorChange={handleCalculatorChange} />
          <CalculatorResultCard calculatorData={calculatorData} />
        </div>
      </main>

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
