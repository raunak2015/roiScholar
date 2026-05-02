import React from 'react';

export default function UniversitySearchForm({ searchInput, setSearchInput, onSearch, onReset }) {
  return (
    <div className="mb-8 transition-all duration-300">
      <form onSubmit={onSearch} className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
            search
          </span>
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search universities by name or country..."
            className="w-full rounded-xl border border-outline-variant bg-surface-container-low pl-12 pr-4 py-3.5 text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        <button
          type="submit"
          className="rounded-xl bg-primary px-8 py-3.5 font-bold text-on-primary shadow-sm hover:shadow-lg hover:bg-primary/90 transition-all active:scale-95"
        >
          Search
        </button>
        <button
          type="button"
          onClick={onReset}
          className="rounded-xl bg-surface-container px-6 py-3.5 font-semibold text-on-surface hover:bg-surface-container-high transition-all"
        >
          Reset
        </button>
      </form>
    </div>
  );
}
