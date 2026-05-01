export default function FinancialMilestoneCard({ roiState = {}, loanState = {} }) {
  const breakEvenYears = roiState?.breakEvenYears || 0;
  const repaymentProgress = Math.min(Math.round((breakEvenYears / 10) * 100), 100);

  return (
    <div className="lg:col-span-5 bg-surface-container-low rounded-xl p-8 flex flex-col justify-between relative overflow-hidden">
      <div className="relative z-10">
        <h3 className="text-lg font-bold text-primary mb-6">Financial Milestone</h3>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-5xl font-black text-primary">{breakEvenYears.toFixed(1)}</span>
          <span className="text-xl font-semibold text-on-surface-variant">Years</span>
        </div>
        <p className="text-on-surface-variant font-medium mb-8">Estimated Break-even Point</p>
        <div className="space-y-3">
          <div className="flex justify-between text-sm font-bold text-primary">
            <span>REPAYMENT PROGRESS</span>
            <span>{repaymentProgress}%</span>
          </div>
          <div className="w-full h-2 bg-surface-container-highest rounded-none">
            <div className="h-full bg-secondary" style={{ width: `${repaymentProgress}%` }}></div>
          </div>
        </div>
      </div>
      <div className="absolute -right-12 -bottom-12 opacity-5">
        <span className="material-symbols-outlined text-[12rem]">history_toggle_off</span>
      </div>
    </div>
  );
}
