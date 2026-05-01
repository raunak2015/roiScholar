export default function ComparisonTable({ universities = [], selected = [], onSelect = () => {} }) {
  const toggleSelect = (id) => {
    const newSelected = selected.includes(id)
      ? selected.filter((s) => s !== id)
      : [...selected, id];
    onSelect(newSelected);
  };

  if (universities.length === 0) {
    return (
      <div className="bg-surface-container-low rounded-xl p-8 text-center">
        <p className="text-on-surface-variant">No universities match your filters</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-surface-container-low rounded-xl">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-surface-container-highest">
            <th className="px-6 py-4 text-left font-bold text-primary">Select</th>
            <th className="px-6 py-4 text-left font-bold text-primary">University</th>
            <th className="px-6 py-4 text-left font-bold text-primary">Program</th>
            <th className="px-6 py-4 text-right font-bold text-primary">Total Cost</th>
            <th className="px-6 py-4 text-right font-bold text-primary">Starting Salary</th>
            <th className="px-6 py-4 text-right font-bold text-primary">Break-even</th>
            <th className="px-6 py-4 text-right font-bold text-primary">10-Year ROI</th>
          </tr>
        </thead>
        <tbody>
          {universities.map((uni, idx) => (
            <tr
              key={uni.id}
              className={`border-b border-surface-container-highest hover:bg-surface-container-highest transition-colors ${
                selected.includes(uni.id) ? 'bg-primary/10' : ''
              }`}
            >
              <td className="px-6 py-4">
                <input
                  type="checkbox"
                  checked={selected.includes(uni.id)}
                  onChange={() => toggleSelect(uni.id)}
                  className="w-5 h-5 rounded"
                />
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  {uni.logo && (
                    <img
                      src={uni.logo}
                      alt={uni.name}
                      className="w-10 h-10 rounded object-cover"
                    />
                  )}
                  <span className="font-semibold text-on-surface">{uni.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-on-surface-variant">{uni.program}</td>
              <td className="px-6 py-4 text-right font-semibold text-secondary">
                ${uni.totalCost.toLocaleString()}
              </td>
              <td className="px-6 py-4 text-right font-semibold text-on-surface">
                ${uni.roi?.startingSalary.toLocaleString()}
              </td>
              <td className="px-6 py-4 text-right text-on-surface">
                {uni.roi?.breakEvenPeriod || 'N/A'}
              </td>
              <td className="px-6 py-4 text-right font-semibold text-tertiary">
                ${uni.roi?.tenYearProjection.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
