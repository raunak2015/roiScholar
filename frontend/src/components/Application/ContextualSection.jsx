export default function ContextualSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="col-span-1 md:col-span-2 bg-surface-container-low p-8 rounded-xl flex items-center gap-8">
        <img
          className="w-32 h-32 object-cover rounded-lg shadow-sm flex-shrink-0"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCq-ig1iFMA98rbIjdSutZsSeT0h-ZFApay4vZb0n46YpEJa0154HYU1Q56OhdtZ1ewSlJj-aXaRmM451Tz9YzALnRsvhSNyAE2Yn0uvu74Q7psmTTxNKxV-T-kbm5Oavd8b-ZmIVoZRkrtTdRBiThHtq3Oh9TvdFuv1IZiqhJnO8p_6EnzlR56nulsVcI08oD1HExHsLE-ZZGKRLb3ZLT1vF6LdC0rMx0KdU4LFM_v5VgFwSOCg6NwUHK5q_JI7XZXzUKSVU4q76o"
          alt="University library"
        />
        <div>
          <h3 className="font-bold text-on-surface text-lg mb-2">STEM Career Support</h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Applications for STEM majors receive priority review and specialized ROI modeling tools for better future
            planning.
          </p>
        </div>
      </div>

      <div className="bg-secondary-container p-8 rounded-xl flex flex-col justify-between">
        <span className="material-symbols-outlined text-on-secondary-container text-4xl">analytics</span>
        <div>
          <h3 className="font-bold text-on-secondary-container text-lg mt-4">Precision ROI</h3>
          <p className="text-xs text-on-secondary-container/80 mt-1 uppercase tracking-widest font-bold">
            Lender transparency protocol active
          </p>
        </div>
      </div>
    </div>
  );
}
