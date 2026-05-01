import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MultiStepLoanForm from '../components/Calculator/MultiStepLoanForm';
import CalculatorResultCard from '../components/Calculator/CalculatorResultCard';
import MainNavbar from '../components/Layout/MainNavbar';
import { calculateLoanSummary } from '../features/loan/loanUtils';
import { setLoanInputs, setLoanResults } from '../features/loan/loanSlice';

export default function CalculatorPage() {
  const dispatch = useDispatch();
  const loanState = useSelector((state) => state.loan || {});
  
  const [calculatorData, setCalculatorData] = useState({
    university: 'Stanford University',
    degree: 'MS in Computer Science',
    loanAmount: 50000,
    interestRate: 8.5,
    tenure: 10,
  });

  const handleCalculate = (data) => {
    setCalculatorData(data);

    const principal = Number(data.loanAmount) || 0;
    const annualInterestRate = Number(data.interestRate) || 0;
    const termInMonths = (Number(data.tenure) || 0) * 12;

    // Dispatch inputs and results into Redux
    dispatch(setLoanInputs({ principal, annualInterestRate, termInMonths }));

    const summary = calculateLoanSummary({ principal, annualInterestRate, termInMonths });
    dispatch(setLoanResults(summary));
  };


  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <MainNavbar />

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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          <MultiStepLoanForm onCalculate={handleCalculate} />
          <CalculatorResultCard calculatorData={calculatorData} loanResults={loanState} />
        </div>
      </main>

      <footer className="w-full border-t border-surface-container mt-16 bg-surface">
        <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-lg font-bold text-primary">RoiScholar</div>
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
            © 2024 RoiScholar. Navigating STEM futures with precision.
          </div>
        </div>
      </footer>
    </div>
  );
}
