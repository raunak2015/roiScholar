export default function LoanRecommendationCard({ loan }) {
  return (
    <div className="bg-primary text-on-primary p-8 rounded-xl shadow-lg">
      <h3 className="text-sm font-bold uppercase tracking-widest opacity-70 mb-6">
        Recommended Loan Product
      </h3>
      <div className="space-y-4">
        {/* Interest Rate & EMI */}
        <div className="flex justify-between items-end border-b border-white/10 pb-4">
          <div>
            <p className="text-xs opacity-80">Interest Rate</p>
            <p className="text-3xl font-bold">
              {loan.interestRate}%{' '}
              <span className="text-sm font-normal opacity-70">APR</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-80">Monthly EMI</p>
            <p className="text-xl font-bold">${loan.monthlyEMI.toLocaleString()}</p>
          </div>
        </div>

        {/* Total Repayment */}
        <div className="flex justify-between text-sm opacity-90">
          <span>Total Repayment</span>
          <span className="font-bold">${loan.totalRepayment.toLocaleString()}</span>
        </div>
      </div>

      <button className="w-full mt-8 bg-on-primary text-primary py-4 rounded-lg font-bold tracking-widest uppercase text-sm hover:bg-primary-fixed transition-all active:scale-95">
        Apply for Loan
      </button>
    </div>
  );
}
