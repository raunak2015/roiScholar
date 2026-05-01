import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveLoanScenario, persistLoanScenario } from '../../features/loan/loanSlice';
import { getCurrencySymbol } from '../../services/currencyService';
import { toast } from 'react-toastify';

export default function CalculatorResultCard({ calculatorData = {}, loanResults = {} }) {
  const dispatch = useDispatch();
  const savedScenarios = useSelector((state) => state.loan?.savedScenarios || []);
  const { targetCurrency, rates } = useSelector((state) => state.currency);
  
  const { monthlyPayment = 0, totalInterest = 0, totalRepayment = 0 } = loanResults;
  const { principal = 0 } = calculatorData;

  const currentRate = rates[targetCurrency] || 1;
  const symbol = getCurrencySymbol(targetCurrency);

  const formatValue = (val) => {
    const converted = val * currentRate;
    return converted.toLocaleString('en-US', { 
      maximumFractionDigits: 0,
      minimumFractionDigits: 0
    });
  };

  const handleApplyForRate = () => {
    // Redirect to application or loan form
    console.log('Apply for rate clicked');
  };

  const handleSaveScenario = () => {
    const scenario = {
      title: `${calculatorData.university} - ${calculatorData.degree}`,
      university: calculatorData.university,
      degree: calculatorData.degree,
      inputs: {
        loanAmount: calculatorData.loanAmount,
        interestRate: calculatorData.interestRate,
        tenure: calculatorData.tenure,
        tuitionPerYear: calculatorData.tuitionPerYear,
        livingMonthly: calculatorData.livingMonthly,
      },
      results: { monthlyPayment, totalInterest, totalRepayment },
    };

    dispatch(persistLoanScenario(scenario))
      .unwrap()
      .then(() => {
        toast.success('Scenario saved to your profile!');
      })
      .catch((err) => {
        toast.error(err || 'Failed to save scenario');
        // Fallback to local save if backend fails
        dispatch(saveLoanScenario({ ...scenario, id: `local_${Date.now()}` }));
      });
  };

  return (
    <aside className="lg:col-span-5 sticky top-28">
      {/* Results Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-container rounded-xl p-8 text-on-primary shadow-xl">
        {/* Decorative elements */}
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-secondary/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 space-y-10">
          {/* Monthly EMI */}
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-80">
              Estimated Monthly EMI
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-5xl font-black tracking-tighter">
                {symbol}{formatValue(monthlyPayment)}
              </span>
              <span className="text-lg font-medium opacity-70">/mo</span>
            </div>
          </div>

          {/* Principal & Interest Grid */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider opacity-70">
                Total Principal
              </span>
              <p className="text-2xl font-bold">{symbol}{formatValue(principal)}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider opacity-70">
                Total Interest
              </span>
              <p className="text-2xl font-bold">{symbol}{formatValue(totalInterest)}</p>
            </div>
          </div>

          {/* Total Cost */}
          <div className="pt-6 border-t border-white/10">
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm font-semibold opacity-80">Total Cost of Loan</span>
              <span className="text-3xl font-black">
                  {symbol}{formatValue(totalRepayment)}
                </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleApplyForRate}
                className="w-full py-4 bg-secondary text-on-secondary rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-secondary-container hover:text-on-secondary-container transition-all shadow-lg active:scale-95 transform"
              >
                Apply for this rate
              </button>
              <button
                onClick={handleSaveScenario}
                className="w-full py-4 bg-white/10 text-white rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-white/20 transition-all border border-white/10 active:scale-95 transform"
              >
                Save Scenario ({savedScenarios.length})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Concierge Insight Card */}
      <div className="mt-6 bg-surface-container-highest rounded-xl p-6 border-l-4 border-secondary">
        <div className="flex gap-4">
          <span
            className="material-symbols-outlined text-secondary flex-shrink-0"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            lightbulb
          </span>
          <div>
            <h4 className="font-bold text-on-surface">Concierge Insight</h4>
            <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">
              Increasing your monthly payment by just{' '}
              <strong className="text-primary">$50</strong> could reduce your loan tenure by{' '}
              <strong className="text-primary">14 months</strong> and save{' '}
              <strong className="text-primary">$3,200</strong> in interest.
            </p>
          </div>
        </div>
      </div>

      {/* ROI Preview Card */}
      <div className="mt-6 relative h-40 rounded-xl overflow-hidden group cursor-pointer">
        <img
          alt="Financial Growth"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCebcDIksA-RhFJSbdimvJX1g9tCyt2xokv3sy7kBiGJVLHAx1hkmrNWqmzRLlTtUEL9T2yoAfMllRHbGxIxv0HaEQZtELqFAUXVc5xF3qh7Yp9WbYoSh5NIRCswmRRXMizMF46zhalTqWJaMCAo3v3rdGyQNXtNLSV8bnjZono8T3VYz5ppt3WVkekG4c4kQwYgbuAb9Aunl_AZrUJtqrOZhATuHOqshxNoJzUrxECSe4VbvN2zjMxJHQIFUYCW_oWyOsH6bFz-4s"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
          <span className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-1">
            Advanced Tool
          </span>
          <h4 className="text-white font-bold">Simulate ROI for STEM Degrees</h4>
        </div>
      </div>
    </aside>
  );
}
