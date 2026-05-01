import React from 'react';

export default function SkeletonLoader({ type = 'card', count = 1 }) {
  const items = Array.from({ length: count });

  const renderSkeleton = (index) => {
    switch (type) {
      case 'card':
        return (
          <div key={index} className="bg-surface-container-low rounded-3xl p-6 border border-outline-variant/10 animate-pulse">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-surface-container-highest" />
              <div className="space-y-2">
                <div className="w-32 h-4 bg-surface-container-highest rounded-full" />
                <div className="w-20 h-3 bg-surface-container-highest rounded-full opacity-50" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="w-full h-3 bg-surface-container-highest rounded-full" />
              <div className="w-5/6 h-3 bg-surface-container-highest rounded-full" />
              <div className="w-4/6 h-3 bg-surface-container-highest rounded-full" />
            </div>
            <div className="mt-8 pt-6 border-t border-outline-variant/10 flex justify-between">
              <div className="w-16 h-4 bg-surface-container-highest rounded-full" />
              <div className="w-24 h-8 bg-surface-container-highest rounded-xl" />
            </div>
          </div>
        );
      case 'chart':
        return (
          <div key={index} className="bg-surface-container-low rounded-3xl p-8 border border-outline-variant/10 animate-pulse h-[400px] flex flex-col">
            <div className="flex justify-between items-start mb-12">
              <div className="space-y-3">
                <div className="w-48 h-6 bg-surface-container-highest rounded-full" />
                <div className="w-32 h-4 bg-surface-container-highest rounded-full opacity-50" />
              </div>
              <div className="flex gap-2">
                <div className="w-20 h-8 bg-surface-container-highest rounded-xl" />
                <div className="w-20 h-8 bg-surface-container-highest rounded-xl" />
              </div>
            </div>
            <div className="flex-grow flex items-end gap-4 px-4">
              {[...Array(10)].map((_, i) => (
                <div 
                  key={i} 
                  className="bg-surface-container-highest rounded-t-lg w-full"
                  style={{ height: `${Math.random() * 60 + 20}%`, opacity: 0.3 + (i * 0.05) }}
                />
              ))}
            </div>
          </div>
        );
      case 'table':
        return (
          <div key={index} className="bg-surface-container-low rounded-3xl border border-outline-variant/10 overflow-hidden animate-pulse">
            <div className="p-6 border-b border-outline-variant/10 flex gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 bg-surface-container-highest rounded-full flex-grow" />
              ))}
            </div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="p-6 border-b border-outline-variant/10 flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-container-highest" />
                <div className="space-y-2 flex-grow">
                  <div className="w-40 h-4 bg-surface-container-highest rounded-full" />
                  <div className="w-24 h-3 bg-surface-container-highest rounded-full opacity-50" />
                </div>
                <div className="w-20 h-4 bg-surface-container-highest rounded-full my-auto" />
                <div className="w-32 h-2 bg-surface-container-highest rounded-full my-auto" />
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`grid gap-6 ${type === 'card' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
      {items.map((_, i) => renderSkeleton(i))}
    </div>
  );
}
