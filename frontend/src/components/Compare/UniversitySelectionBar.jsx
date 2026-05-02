import React from 'react';

export default function UniversitySelectionBar({ selectedUniversities, universities, onClear, onCompare }) {
  if (selectedUniversities.length === 0) return null;

  return (
    <div className="fixed bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-10 duration-500 w-[calc(100%-1.5rem)] sm:w-auto">
      <div className="bg-surface-container-high/90 backdrop-blur-md p-3 sm:p-4 rounded-3xl shadow-2xl border border-outline-variant/20 flex items-center gap-3 sm:gap-6 w-full sm:w-auto justify-between">
        <div className="flex items-center gap-3 px-1 sm:px-4">
          <div className="flex -space-x-3 overflow-hidden">
            {selectedUniversities.slice(0, 3).map((id) => {
              const uni = universities.find((u) => u.id === id);
              return (
                <img
                  key={id}
                  src={uni?.logo}
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-surface bg-surface-container object-contain p-1"
                  alt={uni?.name}
                />
              );
            })}
            {selectedUniversities.length > 3 && (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xs font-bold text-on-primary ring-2 ring-surface">
                +{selectedUniversities.length - 3}
              </div>
            )}
          </div>
          <div className="text-left">
            <p className="font-bold text-on-surface leading-none">{selectedUniversities.length} Selected</p>
            <p className="text-xs text-on-surface-variant mt-1">Ready to compare</p>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={onClear}
            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-surface-container text-on-surface rounded-2xl font-bold hover:bg-surface-container-highest transition-all text-sm"
          >
            Clear
          </button>
          <button
            onClick={onCompare}
            disabled={selectedUniversities.length < 2}
            className={`px-5 sm:px-8 py-2.5 sm:py-3 rounded-2xl font-bold shadow-lg transition-all text-sm ${
              selectedUniversities.length >= 2
                ? 'bg-primary text-on-primary hover:scale-105 active:scale-95'
                : 'bg-primary/50 text-on-primary/50 cursor-not-allowed'
            }`}
          >
            Compare Now
          </button>
        </div>
      </div>
    </div>
  );
}
