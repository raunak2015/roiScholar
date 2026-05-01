export default function LoanEstimateStep({ formData, handleInputChange }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-on-surface mb-4 tracking-tight">Loan Estimate</h2>
        <p className="text-on-surface-variant leading-relaxed mb-8">
          Provide details about the financing you need for your education.
        </p>
        <div className="flex items-start gap-4 p-4 bg-surface-container-low rounded-lg">
          <span className="material-symbols-outlined text-primary flex-shrink-0">savings</span>
          <p className="text-sm text-on-surface-variant">
            We will match you with loan products that have the best ROI potential for your program.
          </p>
        </div>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-on-surface mb-2 tracking-tight">
            Loan Amount Required
          </label>
          <input
            type="number"
            name="loanAmount"
            value={formData.loanAmount}
            onChange={handleInputChange}
            placeholder="e.g. 125000"
            className="w-full h-14 px-4 bg-surface-container-lowest border-0 border-b-2 border-outline-variant/30 focus:border-primary focus:ring-0 transition-all placeholder:text-outline/50"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-on-surface mb-2 tracking-tight">
            Preferred Loan Term
          </label>
          <div className="relative">
            <select
              name="loanTerm"
              value={formData.loanTerm}
              onChange={handleInputChange}
              className="w-full h-14 px-4 bg-surface-container-lowest border-0 border-b-2 border-outline-variant/30 focus:border-primary focus:ring-0 transition-all appearance-none text-on-surface"
            >
              <option value="">Select loan term</option>
              <option value="5">5 Years</option>
              <option value="10">10 Years</option>
              <option value="15">15 Years</option>
              <option value="20">20 Years</option>
            </select>
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-outline">
              expand_more
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}
