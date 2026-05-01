import { useState } from 'react';

const COUNTRIES = ['United States', 'Canada', 'United Kingdom', 'Australia', 'India'];
const DEGREES = ['Computer Science', 'Data Science', 'AI & ML', 'Engineering'];

export default function UniversityFilterPanel({ filters = {}, onFilterChange = () => {} }) {
  const [collapsed, setCollapsed] = useState(false);

  const handleCountryChange = (country) => {
    const newCountries = filters.country?.includes(country)
      ? filters.country.filter((c) => c !== country)
      : [...(filters.country || []), country];
    onFilterChange({ ...filters, country: newCountries });
  };

  const handleDegreeChange = (degree) => {
    const newDegrees = filters.degree?.includes(degree)
      ? filters.degree.filter((d) => d !== degree)
      : [...(filters.degree || []), degree];
    onFilterChange({ ...filters, degree: newDegrees });
  };

  const handleTuitionChange = (e) => {
    onFilterChange({ ...filters, maxTuition: Number(e.target.value) });
  };

  const handleClear = () => {
    onFilterChange({ country: [], degree: [], maxTuition: 200000 });
  };

  return (
    <div className="bg-surface-container-low rounded-xl p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-primary">Filter Universities</h3>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-on-surface-variant hover:text-on-surface"
        >
          {collapsed ? '▼' : '▲'}
        </button>
      </div>

      {!collapsed && (
        <>
          {/* Country Filter */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-on-surface-variant block mb-3">
              Country
            </label>
            <div className="flex flex-wrap gap-2">
              {COUNTRIES.map((country) => (
                <button
                  key={country}
                  onClick={() => handleCountryChange(country)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filters.country?.includes(country)
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                  }`}
                >
                  {country}
                </button>
              ))}
            </div>
          </div>

          {/* Degree Filter */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-on-surface-variant block mb-3">
              Degree Field
            </label>
            <div className="flex flex-wrap gap-2">
              {DEGREES.map((degree) => (
                <button
                  key={degree}
                  onClick={() => handleDegreeChange(degree)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filters.degree?.includes(degree)
                      ? 'bg-secondary text-on-secondary'
                      : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                  }`}
                >
                  {degree}
                </button>
              ))}
            </div>
          </div>

          {/* Tuition Filter */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-on-surface-variant block mb-3">
              Max Tuition: ${(filters.maxTuition || 200000).toLocaleString()}
            </label>
            <input
              type="range"
              min="0"
              max="200000"
              step="10000"
              value={filters.maxTuition || 200000}
              onChange={handleTuitionChange}
              className="w-full"
            />
          </div>

          {/* Clear Button */}
          <button
            onClick={handleClear}
            className="w-full py-2 px-4 bg-surface-container-high text-on-surface rounded-lg font-medium hover:bg-surface-container-highest transition-all"
          >
            Clear Filters
          </button>
        </>
      )}
    </div>
  );
}
