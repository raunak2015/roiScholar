export default function ROIBenchmarksCard({ roi }) {
  return (
    <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/10">
      <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-6">
        ROI Benchmarks
      </h3>
      <div className="grid grid-cols-2 gap-6">
        {/* Starting Salary */}
        <div className="space-y-1">
          <p className="text-xs text-on-surface-variant">Starting Salary</p>
          <p className="text-2xl font-bold text-on-surface">
            ${roi.startingSalary.toLocaleString()}
          </p>
        </div>

        {/* Break-even Period */}
        <div className="space-y-1">
          <p className="text-xs text-on-surface-variant">Break-even Period</p>
          <p className="text-2xl font-bold text-secondary">{roi.breakEvenPeriod}</p>
        </div>

        {/* 10-Year Net Gain */}
        <div className="col-span-2 pt-4">
          <p className="text-xs text-on-surface-variant mb-2">
            10-Year Net Gain Projection
          </p>
          <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
            <div
              className="h-full bg-secondary"
              style={{ width: `${roi.projectionPercentage}%` }}
            ></div>
          </div>
          <p className="text-right text-sm font-bold text-secondary mt-1">
            +${(roi.tenYearProjection / 1000000).toFixed(1)}M Potential
          </p>
        </div>
      </div>
    </div>
  );
}
