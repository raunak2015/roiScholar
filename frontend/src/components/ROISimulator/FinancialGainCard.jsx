import { useCurrency } from '../../hooks/useCurrency';

export default function FinancialGainCard({ roiState = {}, loanState = {} }) {
  const { format } = useCurrency();
  const netGain = roiState?.netGain || 185240;
  const totalInterest = loanState?.totalInterest || 12450;
  const totalRepayment = loanState?.totalRepayment || 94450;
  const tuitionCost = totalRepayment - totalInterest || 82000;

  return (
    <div className="bg-surface-container rounded-2xl p-8 flex flex-col md:flex-row items-center gap-10 shadow-sm border border-outline-variant/10 h-full">
      <div className="flex-1 space-y-6">
        <h3 className="text-sm font-bold text-on-surface">5-Year Net Financial Gain</h3>
        <div className="text-6xl font-black text-secondary tracking-tighter">
          {format(netGain, { minimumFractionDigits: 0 })}
        </div>
        <p className="text-on-surface-variant leading-relaxed text-sm font-medium">
          Based on 3.5% annual merit increases and post-tax debt service. You will out-earn the cost of education by year 3.
        </p>
        
        <div className="flex gap-4">
          <div className="bg-surface-container-high px-5 py-3 rounded-xl flex flex-col gap-1 border border-primary/5">
            <span className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest">TUITION COST</span>
            <span className="font-bold text-on-surface text-sm">{format(tuitionCost, { minimumFractionDigits: 0 })}</span>
          </div>
          <div className="bg-surface-container-high px-5 py-3 rounded-xl flex flex-col gap-1 border border-primary/5">
            <span className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest">INTEREST PAID</span>
            <span className="font-bold text-on-surface text-sm">{format(totalInterest, { minimumFractionDigits: 0 })}</span>
          </div>
        </div>
      </div>
      
      <div className="w-full md:w-56 aspect-square bg-surface-container-high rounded-2xl flex items-center justify-center p-6 border border-primary/5 overflow-hidden">
        <img
          alt="Growth graph with coins"
          className="w-full h-full object-contain mix-blend-multiply"
          src="https://img.freepik.com/free-photo/financial-growth-concept-with-coins_23-2148782410.jpg?t=st=1714571000~exp=1714574600~hmac=6b9e24a5b4a5b4a5b4a5b4a5b4a5b4a5b4a5b4a5b4a5b4a5b4a5b4a5b4a5b4a5&w=800"
        />
      </div>
    </div>
  );
}
