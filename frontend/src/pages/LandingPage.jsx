import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f5f7ff] text-[#1b2430] selection:bg-[#cbeee7] selection:text-[#0a4a44] min-h-screen font-['Inter']">
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32 bg-[#f5f7ff]">
          <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 items-center gap-16">
            <div className="z-10 order-2 md:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#cbeee7] text-[#0a4a44] text-xs font-bold tracking-wide mb-10">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'wght' 700" }}>auto_awesome</span>
                <span>STEM Education Finance 2026</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-[#1b2430] leading-[0.95] tracking-tight mb-8">
                Why do STEM students face education loan <span className="text-[#1e3a8a] italic font-serif">anxiety</span> from unclear costs in 2026?
              </h1>
              <p className="text-xl text-[#4c5665] leading-relaxed mb-10 max-w-xl font-medium">
                Students struggling with biased information and complex loan ROI for international degrees deserve architectural clarity.
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <button
                  onClick={() => navigate('/login')}
                  className="inline-flex items-center justify-center px-10 py-4 bg-[#101c4d] text-white font-bold rounded-lg tracking-wide hover:shadow-[0_12px_30px_rgba(16,28,77,0.25)] active:scale-95 transition-all uppercase"
                >
                  CALCULATE YOUR TRUE COST
                </button>
                <button className="inline-flex items-center justify-center px-10 py-4 bg-[#eef1ff] text-[#314bd6] font-bold rounded-lg tracking-wide hover:bg-[#e0e6ff] active:scale-95 transition-all uppercase">
                  LEARN MORE
                </button>
              </div>
            </div>
            <div className="relative order-1 md:order-2 flex justify-center">
              <div className="absolute inset-0 bg-[#dbe3ff] blur-[120px] opacity-40 -z-10 rounded-full"></div>
              <div className="rounded-2xl overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.25)] transform rotate-2 md:rotate-[3.5deg] border border-white/40">
                <img
                  alt="Student focused"
                  className="w-full aspect-[4/5] object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuADul8FNb9TPPYMeLWZFAh5Mew77dZKGjPI30MedRJW2qK4Bxh6XcIl8elBKZ1zE1728Za4vXZ0WtcZdeiLI8ZMewvx7FlUu8ln0wHbeUlQL1ThrC0B_fpdpJcmyx99Fg75eAlr_i4A6DxrLx2bpWpIb349_o5M65MbO5iwRwkIfEh5RJruIYRTtKT6RR6h6oFx6kPaOVNbHnTMjvxx30qzkgmoqfzaIA_8trWFm04w8tkiVZCRUfWU7nLcMMu8uUshSH67mWjPZR8"
                />
                <div className="absolute bottom-6 left-6 right-6 backdrop-blur-3xl bg-white/70 p-8 rounded-xl border border-[#e7ecf7] shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs font-bold text-[#1e3a8a] uppercase tracking-widest mb-2 opacity-60">Current Trend</p>
                      <p className="text-xl font-bold text-[#1b2430] leading-tight">Biased lending spikes in 2026</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-[#00796b]">+14.2%</p>
                      <p className="text-[10px] uppercase font-bold text-[#6b7280] opacity-60">Annual Rate</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="py-24 bg-[#f1f4ff]">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-black text-[#101c4d] tracking-tighter mb-4 leading-tight">Architectural Solutions for Financial Stability</h2>
                <p className="text-[#5b6374] text-lg leading-relaxed">We dismantle the complexity of international student finance through data-driven precision and unbiased advocacy.</p>
              </div>
              <div className="pb-2">
                <span className="text-sm font-extrabold text-[#101c4d] border-b-[3px] border-[#101c4d] tracking-[0.2em] uppercase cursor-pointer">Explore Features</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Feature Card 1 */}
              <div className="bg-white p-10 rounded-xl shadow-[0_6px_24px_rgba(16,28,77,0.06)] hover:shadow-[0_14px_36px_rgba(16,28,77,0.08)] transition-all group relative overflow-hidden">
                <div className="absolute top-[-10px] right-[-10px] opacity-[0.06] group-hover:opacity-[0.1] transition-opacity">
                  <span className="material-symbols-outlined text-[10rem] text-[#00236f]">visibility</span>
                </div>
                <div className="h-12 w-12 rounded-xl bg-[#eef1ff] flex items-center justify-center mb-8 relative z-10">
                  <span className="material-symbols-outlined text-[#1e3a8a] !font-bold" style={{ fontVariationSettings: "'wght' 700" }}>visibility</span>
                </div>
                <h3 className="text-2xl font-black text-[#101c4d] mb-4 relative z-10">Uncover Hidden Costs</h3>
                <p className="text-[#5b6374] leading-relaxed mb-10 relative z-10">Going beyond tuition. We map health insurance, living parity, and currency volatility that lenders often omit from initial quotes.</p>
                <div className="flex items-center gap-2 text-[#101c4d] font-black text-xs tracking-[0.15em] group-hover:gap-4 transition-all cursor-pointer relative z-10">
                  <span>VIEW AUDIT LOGIC</span>
                  <span className="material-symbols-outlined text-sm font-black">arrow_forward</span>
                </div>
              </div>

              {/* Feature Card 2 */}
              <div className="bg-white p-10 rounded-xl shadow-[0_6px_24px_rgba(16,28,77,0.06)] hover:shadow-[0_14px_36px_rgba(16,28,77,0.08)] transition-all group relative overflow-hidden">
                <div className="absolute top-[-10px] right-[-10px] opacity-[0.06] group-hover:opacity-[0.1] transition-opacity">
                  <span className="material-symbols-outlined text-[10rem] text-[#006a61]">balance</span>
                </div>
                <div className="h-12 w-12 rounded-xl bg-[#e5fbf5] flex items-center justify-center mb-8 relative z-10">
                  <span className="material-symbols-outlined text-[#00796b] !font-bold" style={{ fontVariationSettings: "'wght' 700" }}>balance</span>
                </div>
                <h3 className="text-2xl font-black text-[#101c4d] mb-4 relative z-10">Unbiased Comparison</h3>
                <p className="text-[#5b6374] leading-relaxed mb-10 relative z-10">No kickbacks. No commissions. Just a transparent architectural view of domestic and international lenders side-by-side.</p>
                <div className="flex items-center gap-2 text-[#00796b] font-black text-xs tracking-[0.15em] group-hover:gap-4 transition-all cursor-pointer relative z-10">
                  <span>COMPARE RATES</span>
                  <span className="material-symbols-outlined text-sm font-black">arrow_forward</span>
                </div>
              </div>

              {/* Feature Card 3 */}
              <div className="bg-white p-10 rounded-xl shadow-[0_6px_24px_rgba(16,28,77,0.06)] hover:shadow-[0_14px_36px_rgba(16,28,77,0.08)] transition-all group relative overflow-hidden">
                <div className="absolute top-[-10px] right-[-10px] opacity-[0.06] group-hover:opacity-[0.1] transition-opacity">
                  <span className="material-symbols-outlined text-[10rem] text-[#ff8a65]">auto_graph</span>
                </div>
                <div className="h-12 w-12 rounded-xl bg-[#fff1e6] flex items-center justify-center mb-8 relative z-10">
                  <span className="material-symbols-outlined text-[#ff8a65] !font-bold" style={{ fontVariationSettings: "'wght' 700" }}>auto_graph</span>
                </div>
                <h3 className="text-2xl font-black text-[#101c4d] mb-4 relative z-10">ROI Simulator</h3>
                <p className="text-[#5b6374] leading-relaxed mb-10 relative z-10">Project your post-graduation salary based on 2026 STEM market trends and see exactly when your degree pays for itself.</p>
                <div
                  className="flex items-center gap-2 text-[#ff8a65] font-black text-xs tracking-[0.15em] group-hover:gap-4 transition-all cursor-pointer relative z-10"
                  onClick={() => navigate('/calculator')}
                >
                  <span>RUN SIMULATION</span>
                  <span className="material-symbols-outlined text-sm font-black">arrow_forward</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ROI Visualization (Asymmetric) */}
        <section className="py-24 bg-[#f7f9ff]">
          <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-3/5 bg-[#e9eeff] p-10 rounded-2xl relative overflow-hidden">
              <div className="flex justify-between items-center mb-12">
                <h3 className="text-xl font-bold text-[#101c4d]">Global ROI Projection</h3>
                <span className="text-sm font-medium text-[#6b7280]">Update: Jan 2026</span>
              </div>
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-bold text-[#1b2430]">Data Science - USA</span>
                    <span className="font-black text-[#0f766e]">4.2 Years</span>
                  </div>
                  <div className="h-2 w-full bg-[#cfe8e4]">
                    <div className="h-full bg-[#0f766e] w-[85%]"></div>
                  </div>
                  <p className="text-[10px] text-[#6b7280] mt-1 uppercase tracking-widest font-bold">Payback Period</p>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-bold text-[#1b2430]">AI Research - Germany</span>
                    <span className="font-black text-[#0f766e]">3.1 Years</span>
                  </div>
                  <div className="h-2 w-full bg-[#cfe8e4]">
                    <div className="h-full bg-[#0f766e] w-[65%]"></div>
                  </div>
                  <p className="text-[10px] text-[#6b7280] mt-1 uppercase tracking-widest font-bold">Payback Period</p>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-bold text-[#1b2430]">Cloud Arch - UK</span>
                    <span className="font-black text-[#0f766e]">5.8 Years</span>
                  </div>
                  <div className="h-2 w-full bg-[#cfe8e4]">
                    <div className="h-full bg-[#0f766e] w-[95%]"></div>
                  </div>
                  <p className="text-[10px] text-[#6b7280] mt-1 uppercase tracking-widest font-bold">Payback Period</p>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 opacity-5">
                <span className="material-symbols-outlined text-[200px]">trending_up</span>
              </div>
            </div>
            <div className="w-full md:w-2/5">
              <span className="text-[#1e3a8a] font-bold uppercase tracking-[0.2em] text-xs mb-4 block">Precision Data</span>
              <h2 className="text-4xl font-black text-[#1b2430] leading-tight mb-6">Stop guessing. Start calculating.</h2>
              <p className="text-[#5b6374] leading-relaxed mb-8">Our simulator uses real-time market data to give you a pragmatic view of your financial future. No marketing fluff—just hard ROI metrics.</p>
              <button
                onClick={() => navigate('/calculator')}
                className="flex items-center gap-4 text-[#1e3a8a] font-black hover:gap-6 transition-all"
              >
                <span className="text-lg">START SIMULATION</span>
                <span className="material-symbols-outlined">arrow_right_alt</span>
              </button>
            </div>
          </div>
        </section>

        {/* Newsletter / CTA */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-8">
            <div className="bg-[#071b5a] rounded-2xl p-12 md:p-20 text-center relative overflow-hidden">
              {/* Refined Dot Pattern */}
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight">
                  Ready to navigate your STEM future with precision?
                </h2>
                <p className="text-white/70 text-xl mb-12 font-medium max-w-2xl mx-auto">
                  Join 12,000+ students using EduLoan Compass to secure their education without the debt trap.
                </p>
                <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto" onSubmit={(e) => e.preventDefault()}>
                  <input
                    className="flex-grow px-6 py-5 rounded-lg bg-white border-none text-[#1b2430] text-lg placeholder:text-[#94a3b8] focus:ring-0"
                    placeholder="Enter your academic email"
                    type="email"
                  />
                  <button className="px-10 py-5 bg-[#0b6a55] text-white font-bold rounded-lg hover:bg-[#095645] transition-all text-lg tracking-wide uppercase">
                    GET STARTED
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#e6ebf5] bg-[#f5f7ff] py-12">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-lg font-bold text-[#101c4d]">EduLoan Compass</span>
            <p className="text-[#6b7280] text-xs">© 2026 EduLoan Compass. Navigating STEM futures with precision.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {['About STEM ROI', 'Lender Transparency', 'Privacy Protocol', 'Terms of Service'].map(link => (
              <a key={link} className="text-[#6b7280] hover:text-[#101c4d] hover:underline decoration-[#1e3a8a] underline-offset-4 text-xs font-medium cursor-pointer transition-opacity hover:opacity-75" href="#">{link}</a>
            ))}
            <a className="text-[#0f766e] font-bold text-xs cursor-pointer hover:underline" href="#">Financial Concierge</a>
          </div>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-[#1e3a8a] opacity-60 hover:opacity-100 cursor-pointer">language</span>
            <span className="material-symbols-outlined text-[#1e3a8a] opacity-60 hover:opacity-100 cursor-pointer">shield</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
