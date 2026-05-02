export default function FinancialMilestoneCard({ roiState = {}, loanState = {} }) {
  const breakEvenYears = roiState?.breakEvenYears || 0;
  const repaymentProgress = Math.min(Math.round((breakEvenYears / 10) * 100), 100);

  return (
    <div className="bg-surface-container-high rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden h-full border border-primary/5">
      <div className="relative z-10">
        <h3 className="text-sm font-bold text-on-surface mb-8">Financial Milestone</h3>
        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-6xl font-black text-on-surface tracking-tighter">
            {breakEvenYears.toFixed(1)}
          </span>
          <span className="text-xl font-bold text-on-surface/60">Years</span>
        </div>
        <p className="text-on-surface/70 font-medium text-sm mb-10">Estimated Break-even Point</p>
        
        <div className="space-y-4">
          <div className="flex justify-between text-[10px] font-black text-on-surface tracking-widest uppercase">
            <span>REPAYMENT PROGRESS</span>
            <span>{repaymentProgress}%</span>
          </div>
          <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden border border-primary/5">
            <div className="h-full bg-secondary" style={{ width: `${repaymentProgress}%` }}></div>
          </div>
        </div>
      </div>
      
      {/* Decorative Background Clock */}
      <div className="absolute -right-8 -bottom-8 opacity-5">
        <span className="material-symbols-outlined text-[10rem] text-on-surface">
          schedule
        </span>
      </div>
    </div>
  );
}
