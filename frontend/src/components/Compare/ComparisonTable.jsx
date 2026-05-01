import { useCurrency } from '../../hooks/useCurrency';

export default function ComparisonTable({ universities = [], selected = [], onSelect = () => {} }) {
  const { format } = useCurrency();

  const toggleSelect = (id) => {
    const nextSelected = selected.includes(id)
      ? selected.filter((selectedId) => selectedId !== id)
      : [...selected, id];
    onSelect(nextSelected);
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
          {universities.map((uni) => (
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
                      className="w-10 h-10 rounded object-contain bg-surface-container-highest"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(uni.name)}&background=random&color=fff&size=128`;
                      }}
                    />
                  )}
                  <div className="flex flex-col">
                    <span className="font-semibold text-on-surface">{uni.name}</span>
                    <span className="text-xs text-on-surface-variant">
                      {uni.state ? `${uni.state}, ${uni.country}` : uni.country}
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-on-surface-variant">{uni.program}</td>
              <td className="px-6 py-4 text-right font-semibold text-secondary">
                {uni.totalCost ? format(uni.totalCost) : 'N/A'}
              </td>
              <td className="px-6 py-4 text-right font-semibold text-on-surface">
                {uni.roi?.startingSalary ? format(uni.roi.startingSalary) : 'N/A'}
              </td>
              <td className="px-6 py-4 text-right text-on-surface">
                {uni.roi?.breakEvenPeriod || 'N/A'}
              </td>
              <td className="px-6 py-4 text-right font-semibold text-tertiary">
                {uni.roi?.tenYearProjection ? format(uni.roi.tenYearProjection, { compact: true }) : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
