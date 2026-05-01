import { useNavigate } from 'react-router-dom';
import MainNavbar from '../components/Layout/MainNavbar';
import Footer from '../components/Layout/Footer';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f9f9ff] min-h-screen flex flex-col">
      <MainNavbar userName="JD" />

      <main className="flex-grow flex items-center justify-center px-8 py-10">
        <div className="max-w-lg text-center">
          <div className="mb-8">
            <span className="material-symbols-outlined text-9xl text-primary opacity-30 block">
              error
            </span>
          </div>

          <h1 className="text-6xl font-extrabold text-on-surface mb-4">404</h1>
          <h2 className="text-3xl font-bold text-on-surface mb-4">Page Not Found</h2>
          
          <p className="text-lg text-on-surface-variant mb-8 leading-relaxed">
            Sorry! The page you're looking for doesn't exist. It might have been moved or deleted.
            Let's get you back to navigating your education journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-on-primary rounded-lg font-semibold hover:shadow-lg active:scale-95 transition-all gap-2"
            >
              <span className="material-symbols-outlined">home</span>
              Go to Dashboard
            </button>

            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center px-8 py-3 bg-surface-container text-primary rounded-lg font-semibold hover:bg-surface-container-high active:scale-95 transition-all gap-2"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Go Back
            </button>
          </div>

          {/* Quick Links */}
          <div className="mt-16 pt-8 border-t border-outline-variant/20">
            <p className="text-sm text-on-surface-variant font-semibold mb-4">Quick Navigation</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => navigate('/calculator')}
                className="p-3 bg-surface-container-low rounded-lg text-sm font-medium text-primary hover:bg-surface-container transition-all active:scale-95"
              >
                Calculator
              </button>
              <button
                onClick={() => navigate('/compare')}
                className="p-3 bg-surface-container-low rounded-lg text-sm font-medium text-primary hover:bg-surface-container transition-all active:scale-95"
              >
                Compare
              </button>
              <button
                onClick={() => navigate('/roi-simulator')}
                className="p-3 bg-surface-container-low rounded-lg text-sm font-medium text-primary hover:bg-surface-container transition-all active:scale-95"
              >
                ROI Simulator
              </button>
              <button
                onClick={() => navigate('/profile')}
                className="p-3 bg-surface-container-low rounded-lg text-sm font-medium text-primary hover:bg-surface-container transition-all active:scale-95"
              >
                Profile
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
