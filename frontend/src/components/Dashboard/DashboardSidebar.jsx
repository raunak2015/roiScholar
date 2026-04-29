import React from 'react';
import { Link } from 'react-router-dom';

const DashboardSidebar = () => {
  return (
    <div className="lg:col-span-4 space-y-8">
      <section className="bg-primary bg-gradient-to-br from-primary to-primary-container rounded-xl p-8 text-white shadow-xl">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined">bolt</span>
          Recommended Actions
        </h2>
        <div className="space-y-4">
          <Link className="block bg-white/10 hover:bg-white/20 p-4 rounded-lg transition-colors group" to="/application-tracker">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-bold uppercase tracking-widest text-primary-fixed">Next Step</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
            <h3 className="font-bold text-lg">Complete application</h3>
            <p className="text-xs text-blue-100 opacity-80 mt-1">Connect your verified student ID to finalize your refinance rate.</p>
          </Link>
          <Link to="/calculator" className="w-full block mt-2 p-4 bg-secondary text-on-secondary rounded-lg font-bold text-center hover:opacity-95 transition-opacity">
            Open Calculator
          </Link>
          <button className="w-full flex items-center gap-3 p-4 bg-surface-container-lowest/5 hover:bg-surface-container-lowest/10 rounded-lg transition-colors text-left" type="button">
            <span className="material-symbols-outlined text-secondary-fixed">compare_arrows</span>
            <div className="flex-grow">
              <div className="text-sm font-semibold">Compare more lenders</div>
              <div className="text-xs text-blue-100/70">3 new rates available today</div>
            </div>
          </button>
          <button className="w-full flex items-center gap-3 p-4 bg-surface-container-lowest/5 hover:bg-surface-container-lowest/10 rounded-lg transition-colors text-left" type="button">
            <span className="material-symbols-outlined text-tertiary-fixed-dim">school</span>
            <div className="flex-grow">
              <div className="text-sm font-semibold">Scholarships</div>
              <div className="text-xs text-blue-100/70">Matched: STEM Women Grant</div>
            </div>
          </button>
        </div>
      </section>

      <div className="bg-surface-container-high rounded-xl p-6">
        <h3 className="font-bold text-on-surface mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">trending_down</span>
          Market Pulse
        </h3>
        <p className="text-sm text-on-surface-variant leading-relaxed">
          Interest rates for STEM graduates dropped <span className="font-bold text-secondary">0.25%</span> this morning. Locking a rate now could save you <span className="font-bold">$1,400</span> over your loan term.
        </p>
        <div className="mt-6 h-2 bg-surface-container rounded-full overflow-hidden">
          <div className="h-full bg-secondary w-3/4"></div>
        </div>
        <div className="flex justify-between mt-2 text-[10px] uppercase font-bold text-outline">
          <span>Current Sentiment</span>
          <span>Favorable</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
