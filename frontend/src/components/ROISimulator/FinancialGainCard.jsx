export default function FinancialGainCard({ roiState = {}, loanState = {} }) {
  const netGain = roiState?.netGain || 0;
  const totalInterest = loanState?.totalInterest || 0;
  const totalRepayment = loanState?.totalRepayment || 0;

  return (
    <div className="lg:col-span-7 bg-white rounded-xl p-8 flex flex-col lg:flex-row items-center gap-8 shadow-sm">
      <div className="flex-1 space-y-4">
        <h3 className="text-lg font-bold text-primary">5-Year Net Financial Gain</h3>
        <div className="text-6xl font-black text-secondary tracking-tighter">${netGain.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
        <p className="text-on-surface-variant leading-relaxed">
          Based on 3.5% annual merit increases and post-tax debt service. You will out-earn
          the cost of education by year 3.
        </p>
        <div className="flex gap-4 pt-4">
          <div className="bg-surface-container-low px-4 py-2 rounded-lg flex flex-col">
            <span className="text-[10px] font-bold text-outline">TUITION COST</span>
            <span className="font-bold text-primary">${(totalRepayment - totalInterest).toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
          </div>
          <div className="bg-surface-container-low px-4 py-2 rounded-lg flex flex-col">
            <span className="text-[10px] font-bold text-outline">INTEREST PAID</span>
            <span className="font-bold text-primary">${totalInterest.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-48 h-48 bg-surface-container-low rounded-xl flex items-center justify-center p-4">
        <img
          alt="Financial Growth Visualization"
          className="max-w-full max-h-full object-contain"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKgyOY8bfY8_fCAvLC6dTvDcaN-7PqhTwoFwIJJPksgJWmjIBWj8em6PJ4AwNWY_hTi0k5QCvlP4Jme6RE8XXSdAGLZ4ZTIQ7n6-Baymw18TwRuOm5orwBA6VGaEoBle68smzSXBa-Kj5P-3IAgjvQz-XomXl-WxKQPsd6eNg-PbRjcSMUoSGdM1bgLzcVKnSmLnIU2S-YP_FXZAA-Z12XFxqK6bvw8Bhnwsd5_guufD_DGW1v_a0nyBvWi5Ou9dCkmKHMWVEaNCs"
        />
      </div>
    </div>
  );
}
