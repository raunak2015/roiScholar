import { useState } from 'react';
import { useCurrency } from '../../hooks/useCurrency';

const DEGREES = [
  'Computer Science (B.S.)',
  'Data Science (M.S.)',
  'Artificial Intelligence & ML',
  'Cybersecurity Engineering',
  'Robotics & Automation',
];

const MARKETS = [
  'United States of America',
  'United Kingdom',
  'Canada',
  'Germany',
  'Singapore',
];

const SALARY_BY_DEGREE_MARKET = {
  'Artificial Intelligence & ML': {
    'United States of America': 112500,
    'United Kingdom': 95000,
    'Canada': 105000,
    'Germany': 85000,
    'Singapore': 110000,
  },
  'Computer Science (B.S.)': {
    'United States of America': 95000,
    'United Kingdom': 75000,
    'Canada': 85000,
    'Germany': 65000,
    'Singapore': 90000,
  },
  'Data Science (M.S.)': {
    'United States of America': 125000,
    'United Kingdom': 100000,
    'Canada': 115000,
    'Germany': 90000,
    'Singapore': 120000,
  },
  'Cybersecurity Engineering': {
    'United States of America': 118000,
    'United Kingdom': 98000,
    'Canada': 108000,
    'Germany': 88000,
    'Singapore': 112000,
  },
  'Robotics & Automation': {
    'United States of America': 108000,
    'United Kingdom': 88000,
    'Canada': 98000,
    'Germany': 78000,
    'Singapore': 105000,
  },
};

const PERCENTILE_BY_DEGREE_MARKET = {
  'Artificial Intelligence & ML': 'Top 15% for AI/ML roles',
  'Computer Science (B.S.)': 'Top 20% for entry-level CS roles',
  'Data Science (M.S.)': 'Top 10% for Data Science roles',
  'Cybersecurity Engineering': 'Top 12% for Security Engineering roles',
  'Robotics & Automation': 'Top 18% for Robotics roles',
};

export default function ROISimulatorInputs({ onInputChange }) {
  const { format } = useCurrency();
  const [inputs, setInputs] = useState({
    degree: 'Artificial Intelligence & ML',
    market: 'United States of America',
  });

  const startingSalary =
    SALARY_BY_DEGREE_MARKET[inputs.degree]?.[inputs.market] || 112500;
  const percentile = PERCENTILE_BY_DEGREE_MARKET[inputs.degree] || 'Top 15%';

  const handleDegreeChange = (e) => {
    const degree = e.target.value;
    setInputs((prev) => ({ ...prev, degree }));
    onInputChange({ ...inputs, degree, startingSalary });
  };

  const handleMarketChange = (e) => {
    const market = e.target.value;
    setInputs((prev) => ({ ...prev, market }));
    onInputChange({ ...inputs, market, startingSalary });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {/* Academic Pathway Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-outline-variant/10 flex flex-col justify-between">
        <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-4">
          Academic Pathway
        </label>
        <div className="relative group">
          <select
            value={inputs.degree}
            onChange={handleDegreeChange}
            className="w-full bg-surface-container-low border-0 rounded-lg p-3 text-on-surface font-bold focus:ring-0 appearance-none cursor-pointer"
          >
            {DEGREES.map((degree) => (
              <option key={degree} value={degree}>
                {degree}
              </option>
            ))}
          </select>
          <span className="material-symbols-outlined absolute right-3 top-2.5 text-on-surface-variant pointer-events-none text-lg">
            expand_more
          </span>
        </div>
      </div>

      {/* Target Market Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-outline-variant/10 flex flex-col justify-between">
        <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-4">
          Target Market
        </label>
        <div className="relative group flex items-center">
          <select
            value={inputs.market}
            onChange={handleMarketChange}
            className="w-full bg-surface-container-low border-0 rounded-lg p-3 text-on-surface font-bold focus:ring-0 appearance-none cursor-pointer"
          >
            {MARKETS.map((market) => (
              <option key={market} value={market}>
                {market}
              </option>
            ))}
          </select>
          <span className="material-symbols-outlined absolute right-3 top-2.5 text-on-surface-variant pointer-events-none text-lg">
            public
          </span>
        </div>
      </div>

      {/* Expected Starting Salary Dark Card */}
      <div className="bg-[#1e2b58] rounded-xl p-6 shadow-lg flex flex-col justify-center text-white">
        <span className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-2">
          Expected Starting Salary
        </span>
        <div className="text-4xl font-black mb-3">
          {format(startingSalary, { minimumFractionDigits: 0 })}
        </div>
        <div className="flex items-center gap-2 text-[#4ade80] text-xs font-bold">
          <span className="material-symbols-outlined text-sm">trending_up</span>
          <span>{percentile} in {inputs.market === 'United States of America' ? 'USA' : inputs.market}</span>
        </div>
      </div>
    </div>
  );
}
