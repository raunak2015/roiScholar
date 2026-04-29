import React from 'react';

const simulations = [
  {
    icon: 'terminal',
    iconBg: 'bg-primary-container/20',
    iconColor: 'text-primary',
    title: 'Cloud Architecture Specialist',
    salary: 'Projected Salary: $125k • Market Demand: High',
    roi: '168% ROI',
  },
  {
    icon: 'biotech',
    iconBg: 'bg-secondary-container/20',
    iconColor: 'text-secondary',
    title: 'Bioinformatics Analyst',
    salary: 'Projected Salary: $98k • Market Demand: Emerging',
    roi: '112% ROI',
  },
  {
    icon: 'data_exploration',
    iconBg: 'bg-surface-dim/30',
    iconColor: 'text-on-surface',
    title: 'Data Science Manager',
    salary: 'Projected Salary: $145k • Market Demand: Peak',
    roi: '194% ROI',
  },
];

const RecentROISimulations = () => {
  return (
    <section>
      <div className="flex items-end justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-on-surface">Recent ROI Simulations</h2>
        <button className="text-sm font-semibold text-primary hover:underline underline-offset-4" type="button">
          History
        </button>
      </div>

      <div className="bg-surface-container-low rounded-xl overflow-hidden">
        {simulations.map((simulation, index) => (
          <div
            key={simulation.title}
            className={`flex flex-col md:flex-row items-center gap-6 p-6 ${index < simulations.length - 1 ? 'border-b border-outline-variant/10' : ''}`}
          >
            <div className={`w-16 h-16 rounded-lg ${simulation.iconBg} flex items-center justify-center flex-shrink-0`}>
              <span className={`material-symbols-outlined ${simulation.iconColor} text-3xl`}>{simulation.icon}</span>
            </div>
            <div className="flex-grow">
              <h3 className="font-bold text-on-surface">{simulation.title}</h3>
              <p className="text-sm text-on-surface-variant">{simulation.salary}</p>
            </div>
            <div className="text-right hidden md:block">
              <div className="text-lg font-bold text-secondary">{simulation.roi}</div>
              <div className="text-xs text-outline">5yr projection</div>
            </div>
            <button className="w-full md:w-auto px-6 py-2 bg-surface-container-highest text-primary font-bold text-sm rounded-lg active:scale-95 transition-transform flex items-center justify-center gap-2" type="button">
              <span className="material-symbols-outlined text-sm">refresh</span>
              Recalculate
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentROISimulations;
