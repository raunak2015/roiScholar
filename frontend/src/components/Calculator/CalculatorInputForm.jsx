import { useState, useEffect } from 'react';

export default function CalculatorInputForm({ onCalculatorChange }) {
  const [inputs, setInputs] = useState({
    tuition: 45000,
    livingExpenses: 18000,
    insurance: 2500,
    interestRate: 6.5,
    tenure: 10, // in years
  });

  const totalLoanAmount = inputs.tuition + inputs.livingExpenses + inputs.insurance;

  // Notify parent component on input changes
  useEffect(() => {
    onCalculatorChange({
      ...inputs,
      totalLoanAmount,
    });
  }, [inputs]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: name === 'tenure' ? parseInt(value) : parseFloat(value) || 0,
    }));
  };

  return (
    <section className="lg:col-span-7 space-y-8">
      {/* Expense Parameters */}
      <div className="bg-surface-container-low rounded-xl p-8 space-y-8">
        <h2 className="text-xl font-bold text-primary flex items-center gap-2">
          <span className="material-symbols-outlined">account_balance_wallet</span>
          Expense Parameters
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tuition Fees */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-on-surface-variant ml-1">
              Tuition Fees
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-medium">
                $
              </span>
              <input
                type="number"
                name="tuition"
                value={inputs.tuition}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-4 bg-surface-container-lowest border-none rounded-lg focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all text-on-surface font-semibold"
              />
            </div>
          </div>

          {/* Living Expenses */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-on-surface-variant ml-1">
              Living Expenses
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-medium">
                $
              </span>
              <input
                type="number"
                name="livingExpenses"
                value={inputs.livingExpenses}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-4 bg-surface-container-lowest border-none rounded-lg focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all text-on-surface font-semibold"
              />
            </div>
          </div>

          {/* Insurance & Visa */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-on-surface-variant ml-1">
              Insurance & Visa
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-medium">
                $
              </span>
              <input
                type="number"
                name="insurance"
                value={inputs.insurance}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-4 bg-surface-container-lowest border-none rounded-lg focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all text-on-surface font-semibold"
              />
            </div>
          </div>

          {/* Total Loan Amount (read-only) */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-on-surface-variant ml-1">
              Total Loan Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-medium">
                $
              </span>
              <input
                type="number"
                value={totalLoanAmount}
                readOnly
                className="w-full pl-10 pr-4 py-4 bg-surface-container-highest border-none rounded-lg focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all text-primary font-bold cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        <hr className="border-outline-variant opacity-10" />

        {/* Loan Terms */}
        <h2 className="text-xl font-bold text-primary flex items-center gap-2">
          <span className="material-symbols-outlined">analytics</span>
          Loan Terms
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Interest Rate */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-on-surface-variant ml-1">
              Interest Rate (%)
            </label>
            <input
              type="number"
              name="interestRate"
              value={inputs.interestRate}
              onChange={handleInputChange}
              step="0.1"
              className="w-full px-4 py-4 bg-surface-container-lowest border-none rounded-lg focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all text-on-surface font-semibold"
            />
          </div>

          {/* Tenure */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-on-surface-variant ml-1">
              Tenure (Years)
            </label>
            <select
              name="tenure"
              value={inputs.tenure}
              onChange={handleInputChange}
              className="w-full px-4 py-4 bg-surface-container-lowest border-none rounded-lg focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all text-on-surface font-semibold appearance-none cursor-pointer"
            >
              <option value="5">5 Years</option>
              <option value="10">10 Years</option>
              <option value="15">15 Years</option>
              <option value="20">20 Years</option>
            </select>
          </div>
        </div>
      </div>

      {/* Repayment Chart Section */}
      <div className="bg-surface-container-low rounded-xl p-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-lg font-bold text-on-surface">Repayment Structure</h3>
            <p className="text-sm text-on-surface-variant">Principal vs. Cumulative Interest</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-secondary rounded-sm"></div>
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Principal
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary-container rounded-sm"></div>
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Interest
              </span>
            </div>
          </div>
        </div>

        <RepaymentChart
          principal={totalLoanAmount}
          monthlyRate={inputs.interestRate / 100 / 12}
          months={inputs.tenure * 12}
        />
      </div>
    </section>
  );
}

// Repayment Chart Sub-component
function RepaymentChart({ principal, monthlyRate, months }) {
  // Calculate amortization schedule
  const amortizationSchedule = [];
  let remainingBalance = principal;

  for (let i = 1; i <= months; i++) {
    const interest = remainingBalance * monthlyRate;
    const yearIndex = Math.ceil(i / 12);

    if (!amortizationSchedule[yearIndex - 1]) {
      amortizationSchedule[yearIndex - 1] = { principal: 0, interest: 0 };
    }

    amortizationSchedule[yearIndex - 1].interest += interest;
    remainingBalance -= interest;
  }

  // Calculate principal repayment per year
  const principalPerYear = principal / months;
  const maxBarHeight = 100;

  // Normalize heights based on max values
  const maxTotal = Math.max(...amortizationSchedule.map((y) => y.principal + y.interest));

  return (
    <div className="flex items-end gap-3 h-48 w-full px-2">
      {amortizationSchedule.slice(0, 8).map((year, idx) => {
        const totalHeight = (year.principal + year.interest) / maxTotal * maxBarHeight;
        const principalHeight = (year.principal / (year.principal + year.interest)) * totalHeight;

        return (
          <div key={idx} className="flex-1 flex flex-col gap-1 h-full justify-end">
            <div
              className="w-full bg-primary-container rounded-t-sm"
              style={{ height: `${principalHeight}%` }}
            ></div>
            <div
              className="w-full bg-secondary rounded-b-sm"
              style={{ height: `${totalHeight - principalHeight}%` }}
            ></div>
            <span className="text-[10px] text-center mt-2 font-bold text-on-surface-variant">
              Y{idx + 1}
            </span>
          </div>
        );
      })}
    </div>
  );
}
