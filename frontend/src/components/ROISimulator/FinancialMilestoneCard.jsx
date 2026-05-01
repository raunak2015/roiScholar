export default function FinancialMilestoneCard({ roiState = {}, loanState = {} }) {
  const breakEvenYears = roiState?.breakEvenYears || 0;
  const repaymentProgress = Math.min(Math.round((breakEvenYears / 10) * 100), 100);

  return (
    <div className="bg-[#f0f4ff] rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden h-full border border-primary/5">
      <div className="relative z-10">
        <h3 className="text-sm font-bold text-[#1e2b58] mb-8">Financial Milestone</h3>
        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-6xl font-black text-[#1e2b58] tracking-tighter">
            {breakEvenYears.toFixed(1)}
          </span>
          <span className="text-xl font-bold text-[#1e2b58]/60">Years</span>
        </div>
        <p className="text-[#1e2b58]/70 font-medium text-sm mb-10">Estimated Break-even Point</p>
        
        <div className="space-y-4">
          <div className="flex justify-between text-[10px] font-black text-[#1e2b58] tracking-widest uppercase">
            <span>REPAYMENT PROGRESS</span>
            <span>{repaymentProgress}%</span>
          </div>
          <div className="w-full h-2 bg-white rounded-full overflow-hidden border border-primary/5">
            <div className="h-full bg-[#006a61]" style={{ width: `${repaymentProgress}%` }}></div>
          </div>
        </div>
      </div>
      
      {/* Decorative Background Clock */}
      <div className="absolute -right-8 -bottom-8 opacity-5">
        <span className="material-symbols-outlined text-[10rem] text-[#1e2b58]">
          schedule
        </span>
      </div>
    </div>
  );
}
