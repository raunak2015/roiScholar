export default function RegionalDefaults({
  country,
  degree,
  onCountryChange,
  onDegreeChange,
}) {
  const countries = [
    'United States',
    'United Kingdom',
    'Germany',
    'Australia',
    'Canada',
  ];

  const degrees = [
    'Computer Science (STEM)',
    'Biomedical Engineering',
    'Data Science & AI',
    'Mathematics',
    'Aerospace Engineering',
  ];

  return (
    <div className="bg-surface-container-lowest rounded-xl p-8 shadow-[0_4px_24px_rgba(0,35,111,0.04)]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-on-surface tracking-tight">
            Regional & Educational Defaults
          </h2>
          <p className="text-on-surface-variant text-sm mt-1">
            Set your default search parameters for faster ROI calculations.
          </p>
        </div>
        <span className="material-symbols-outlined text-secondary opacity-40 text-4xl">
          travel_explore
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Target Country */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant">
            Target Country
          </label>
          <div className="relative group">
            <select
              value={country}
              onChange={(e) => onCountryChange(e.target.value)}
              className="w-full h-12 bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-lg text-on-surface font-medium transition-all appearance-none px-4"
            >
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-4 top-3 text-on-surface-variant pointer-events-none">
              expand_more
            </span>
          </div>
        </div>

        {/* Primary Degree Focus */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant">
            Primary Degree Focus
          </label>
          <div className="relative group">
            <select
              value={degree}
              onChange={(e) => onDegreeChange(e.target.value)}
              className="w-full h-12 bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-lg text-on-surface font-medium transition-all appearance-none px-4"
            >
              {degrees.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-4 top-3 text-on-surface-variant pointer-events-none">
              expand_more
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
