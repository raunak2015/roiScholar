export default function EarningsChart() {
  return (
    <div className="lg:col-span-12 bg-surface-container rounded-xl p-8 shadow-sm border-t-4 border-primary">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h3 className="text-xl font-bold text-primary">Earnings vs. Repayment Velocity</h3>
          <p className="text-on-surface-variant text-sm">Projected cumulative wealth over 10 years</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-xs font-bold text-on-surface-variant">CUMULATIVE EARNINGS</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-secondary"></div>
            <span className="text-xs font-bold text-on-surface-variant">LOAN BALANCE</span>
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="w-full h-80 relative mt-4">
        {/* Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between opacity-10">
          <div className="border-b border-outline w-full"></div>
          <div className="border-b border-outline w-full"></div>
          <div className="border-b border-outline w-full"></div>
          <div className="border-b border-outline w-full"></div>
          <div className="border-b border-outline w-full"></div>
        </div>

        {/* SVG Chart */}
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 300">
          {/* Loan Repayment Line (secondary color - descending) */}
          <path
            d="M 0 100 Q 250 150 500 280 L 1000 300"
            fill="none"
            stroke="#006a61"
            strokeWidth="4"
          />
          {/* Cumulative Earnings Line (primary color - ascending) */}
          <path
            d="M 0 280 Q 300 250 600 150 T 1000 20"
            fill="none"
            stroke="#00236f"
            strokeWidth="4"
          />
          {/* Break-even Marker */}
          <circle cx="500" cy="280" fill="#ffffff" r="8" stroke="#006a61" strokeWidth="3" />
        </svg>

        {/* Year Labels */}
        <div className="flex justify-between mt-4 px-2 text-[10px] font-bold text-outline">
          <span>YEAR 0</span>
          <span>YEAR 2</span>
          <span>YEAR 4</span>
          <span>YEAR 6</span>
          <span>YEAR 8</span>
          <span>YEAR 10</span>
        </div>
      </div>
    </div>
  );
}
