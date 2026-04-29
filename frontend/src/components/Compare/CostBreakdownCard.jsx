export default function CostBreakdownCard({ totalCost, breakdown, percentages }) {
  return (
    <div className="bg-surface-container-low p-8 rounded-xl">
      <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-6">
        Total Cost of Attendance
      </h3>
      <div className="flex items-center gap-8">
        {/* Custom Pie Chart */}
        <div className="relative w-32 h-32">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 36 36"
          >
            <circle
              cx="18"
              cy="18"
              fill="transparent"
              r="16"
              stroke="#e9edff"
              strokeWidth="4"
            ></circle>
            <circle
              cx="18"
              cy="18"
              fill="transparent"
              r="16"
              stroke="#00236f"
              strokeDasharray={`${percentages.tuition}, 100`}
              strokeWidth="4"
            ></circle>
            <circle
              cx="18"
              cy="18"
              fill="transparent"
              r="16"
              stroke="#006a61"
              strokeDasharray={`${percentages.living}, 100`}
              strokeDashoffset={`-${percentages.tuition}`}
              strokeWidth="4"
            ></circle>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold">
              ${(totalCost / 1000).toFixed(0)}K
            </span>
          </div>
        </div>

        {/* Cost Legend */}
        <ul className="space-y-3 flex-1">
          <li className="flex justify-between items-center text-sm">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              Tuition
            </span>
            <span className="font-bold">${breakdown.tuition.toLocaleString()}</span>
          </li>
          <li className="flex justify-between items-center text-sm">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              Living
            </span>
            <span className="font-bold">${breakdown.living.toLocaleString()}</span>
          </li>
          <li className="flex justify-between items-center text-sm">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
              Misc
            </span>
            <span className="font-bold">${breakdown.misc.toLocaleString()}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
