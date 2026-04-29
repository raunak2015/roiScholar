import React from 'react';

const links = ['About STEM ROI', 'Lender Transparency', 'Privacy Protocol', 'Terms of Service', 'Financial Concierge'];

const DashboardFooter = () => {
  return (
    <footer className="w-full border-t border-slate-100 bg-[#f9f9ff] mt-24">
      <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col gap-2">
          <div className="text-lg font-bold text-[#00236f]">EduLoan Compass</div>
          <div className="font-['Inter'] text-sm leading-relaxed text-[#44474e]">
            © 2024 EduLoan Compass. Navigating STEM futures with precision.
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {links.map((link) => (
            <a
              key={link}
              className="font-['Inter'] text-sm leading-relaxed text-[#44474e] hover:text-[#00236f] hover:underline decoration-[#006a61] underline-offset-4 transition-opacity"
              href="#"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
