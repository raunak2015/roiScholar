import React from 'react';

const DashboardWelcome = ({ userName = 'Alex' }) => {
  return (
    <section className="mb-12">
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-on-surface leading-tight">
        Welcome back, <span className="text-primary">{userName}</span>
      </h1>
      <p className="text-body-lg text-on-surface-variant mt-2 max-w-2xl">
        Your STEM journey is currently projected at a <span className="text-secondary font-bold">142% ROI</span> over 10 years. Let's optimize your path forward.
      </p>
    </section>
  );
};

export default DashboardWelcome;
