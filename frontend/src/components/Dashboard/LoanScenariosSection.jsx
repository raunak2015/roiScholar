import React from 'react';

const scenarios = [
  {
    title: 'Refinance Alpha',
    amount: '$42,500',
    rate: '4.2% APR',
    term: '120 mo',
    borderClass: 'border-primary',
  },
  {
    title: 'Public Sector Path',
    amount: '$38,200',
    rate: '3.8% APR',
    term: 'PSLF Eligible',
    borderClass: 'border-secondary',
  },
  {
    title: 'Aggressive Payoff',
    amount: '$42,500',
    rate: '4.5% APR',
    term: '60 mo',
    borderClass: 'border-surface-dim',
  },
];

const LoanScenariosSection = () => {
  return (
    <section>
      <div className="flex items-end justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-on-surface">Your Saved Loan Scenarios</h2>
        <button className="text-sm font-semibold text-primary hover:underline underline-offset-4" type="button">
          View All Scenarios
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {scenarios.map((scenario) => (
          <div
            key={scenario.title}
            className={`bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_24px_-10px_rgba(0,35,111,0.08)] border-l-4 ${scenario.borderClass}`}
          >
            <div className="text-label-md uppercase tracking-wider text-outline mb-2">{scenario.title}</div>
            <div className="text-2xl font-bold text-on-surface mb-4">{scenario.amount}</div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant">Rate</span>
                <span className="font-semibold text-secondary">{scenario.rate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant">Term</span>
                <span className="font-semibold">{scenario.term}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LoanScenariosSection;
