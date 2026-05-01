import React from 'react';

export default function EmptyState({ 
  title = 'No Data Found', 
  description = 'We couldn\'t find what you were looking for. Try adjusting your filters or search terms.',
  icon = 'search_off',
  actionLabel,
  onAction
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-8 text-center bg-surface-container-low/30 rounded-3xl border-2 border-dashed border-outline-variant/20">
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-4xl text-primary">{icon}</span>
      </div>
      <h3 className="text-2xl font-bold text-on-surface mb-2 tracking-tight">{title}</h3>
      <p className="text-on-surface-variant max-w-md mx-auto mb-8 leading-relaxed">
        {description}
      </p>
      {actionLabel && (
        <button 
          onClick={onAction}
          className="px-8 py-3 bg-primary text-on-primary rounded-2xl font-bold shadow-lg hover:bg-primary/90 transition-all active:scale-95"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
