import { useState } from 'react';

export default function CalculatorResultCard({ calculatorData }) {
  const [savedScenarios, setSavedScenarios] = useState(0);
  const { tuition, livingExpenses, insurance, interestRate, tenure, totalLoanAmount } =
    calculatorData;

  // Calculate EMI using formula: EMI = P * r * (1+r)^n / ((1+r)^n - 1)
  const calculateEMI = () => {
    if (!totalLoanAmount || !tenure || interestRate === undefined) return 0;

    const monthlyRate = interestRate / 100 / 12;
    const months = tenure * 12;

    if (monthlyRate === 0) {
      return totalLoanAmount / months;
    }

    const numerator = totalLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, months);
    const denominator = Math.pow(1 + monthlyRate, months) - 1;
    return numerator / denominator;
  };

  const emi = calculateEMI();
  const months = tenure * 12;
  const totalCost = emi * months;
  const totalInterest = totalCost - totalLoanAmount;

  const handleApplyForRate = () => {
    // Redirect to application or loan form
    console.log('Apply for rate clicked');
  };

  const handleSaveScenario = () => {
    setSavedScenarios((prev) => prev + 1);
    console.log('Scenario saved');
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
                ${emi.toFixed(2)}
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
              <p className="text-2xl font-bold">${totalLoanAmount.toLocaleString()}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider opacity-70">
                Total Interest
              </span>
              <p className="text-2xl font-bold">${totalInterest.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
            </div>
          </div>

          {/* Total Cost */}
          <div className="pt-6 border-t border-white/10">
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm font-semibold opacity-80">Total Cost of Loan</span>
              <span className="text-3xl font-black">
                ${totalCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}
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
                Save Scenario
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
