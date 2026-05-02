import React from 'react';
import LoginForm from '../components/Auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="flex min-h-screen bg-surface">
      {/* Left side - Form */}
      <div className="flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:w-1/2 lg:px-20 xl:px-24 bg-surface relative z-10 shadow-[20px_0_40px_-15px_rgba(0,0,0,0.05)]">
        <div className="mx-auto w-full max-w-md">
          {/* Logo / Brand Header */}
          <div className="flex items-center gap-2 mb-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-on-primary shadow-lg shadow-primary/30">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-on-surface tracking-tight">RoiScholar</span>
          </div>

          <LoginForm />
        </div>
      </div>

      {/* Right side - Image / Aesthetic Area */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl opacity-60 mix-blend-screen"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl opacity-60 mix-blend-screen"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>

          <div className="absolute inset-0 flex items-center justify-center p-16">
            <div className="max-w-xl text-center z-10 backdrop-blur-sm bg-surface/10 border border-outline-variant/10 p-10 rounded-3xl shadow-2xl">
              <h2 className="text-4xl font-extrabold text-on-surface mb-6 leading-tight">
                Navigating your educational financial future.
              </h2>
              <p className="text-lg text-on-surface-variant font-medium">
                Make data-driven decisions about your education investments with RoiScholar's advanced analytics platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
