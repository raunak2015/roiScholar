import { useState } from 'react';

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
      {/* Degree and Market Inputs */}
      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Academic Pathway */}
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm space-y-4">
          <label className="block text-sm font-semibold text-primary tracking-wide">
            ACADEMIC PATHWAY
          </label>
          <div className="relative">
            <select
              value={inputs.degree}
              onChange={handleDegreeChange}
              className="w-full bg-surface-container-low border-none rounded-lg p-4 text-on-surface font-medium focus:ring-2 focus:ring-primary appearance-none"
            >
              {DEGREES.map((degree) => (
                <option key={degree} value={degree}>
                  {degree}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-4 top-4 pointer-events-none text-outline">
              expand_more
            </span>
          </div>
        </div>

        {/* Target Market */}
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm space-y-4">
          <label className="block text-sm font-semibold text-primary tracking-wide">
            TARGET MARKET
          </label>
          <div className="relative">
            <select
              value={inputs.market}
              onChange={handleMarketChange}
              className="w-full bg-surface-container-low border-none rounded-lg p-4 text-on-surface font-medium focus:ring-2 focus:ring-primary appearance-none"
            >
              {MARKETS.map((market) => (
                <option key={market} value={market}>
                  {market}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-4 top-4 pointer-events-none text-outline">
              public
            </span>
          </div>
        </div>
      </div>

      {/* Expected Starting Salary Card */}
      <div className="bg-primary bg-gradient-to-br from-primary to-primary-container p-8 rounded-xl flex flex-col justify-between text-white shadow-lg">
        <div>
          <p className="text-sm font-medium opacity-80 mb-1">EXPECTED STARTING SALARY</p>
          <div className="text-4xl font-extrabold">${startingSalary.toLocaleString()}</div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-secondary-fixed font-semibold">
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            trending_up
          </span>
          <span>{percentile} in {inputs.market}</span>
        </div>
      </div>
    </div>
  );
}
