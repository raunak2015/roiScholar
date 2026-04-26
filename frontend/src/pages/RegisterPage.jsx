import React from 'react';
import RegisterForm from '../components/Auth/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side - Image / Aesthetic Area (Swapped for variety) */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-0 left-0 -ml-20 -mt-20 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl opacity-60 mix-blend-screen"></div>
          <div className="absolute bottom-0 right-0 -mr-20 -mb-20 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl opacity-60 mix-blend-screen"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://images.unsplash.com/photo-1523240715624-51c63558600c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
          
          <div className="absolute inset-0 flex items-center justify-center p-16">
            <div className="max-w-xl text-center z-10 backdrop-blur-sm bg-white/5 border border-white/10 p-10 rounded-3xl shadow-2xl">
              <h2 className="text-4xl font-extrabold text-white mb-6 leading-tight">
                Empowering your academic journey.
              </h2>
              <p className="text-lg text-blue-100 font-medium">
                Join thousands of students who are using RoiScholar to optimize their educational path and financial future.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:w-1/2 lg:px-20 xl:px-24 bg-white relative z-10 shadow-[-20px_0_40px_-15px_rgba(0,0,0,0.05)]">
        <div className="mx-auto w-full max-w-md">
          {/* Logo / Brand Header */}
          <div className="flex items-center gap-2 mb-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-900 text-white shadow-lg shadow-blue-900/30">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">RoiScholar</span>
          </div>

          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
