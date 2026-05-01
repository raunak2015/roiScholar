import { Link, useLocation } from 'react-router-dom';
import CurrencySelector from '../UI/CurrencySelector';
import ThemeToggle from '../UI/ThemeToggle';

const navItems = [
  { name: 'Dashboard', to: '/dashboard' },
  { name: 'Calculator', to: '/calculator' },
  { name: 'ROI Simulator', to: '/roi-simulator' },
  { name: 'Compare', to: '/compare' },
  { name: 'Profile', to: '/profile' },
];

export default function Navbar({ userName = 'JD' }) {
  const location = useLocation();

  const initials =
    userName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('') || 'JD';

  return (
    <header className="sticky top-0 w-full z-50 bg-surface shadow-sm border-b border-outline-variant/10">
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center h-20">
        <Link to="/dashboard" className="text-xl font-black tracking-tighter text-primary">
          EduLoan Compass
        </Link>

        <nav className="hidden md:flex items-center gap-8 h-full">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.name}
                to={item.to}
                className={`h-full flex items-center font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-primary border-b-2 border-secondary pb-1 font-semibold'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <button
            className="p-2 rounded-full hover:bg-surface-container-high active:scale-95 transition-transform"
            type="button"
          >
            <span className="material-symbols-outlined text-primary">notifications</span>
          </button>
          <button
            className="p-2 rounded-full hover:bg-surface-container-high active:scale-95 transition-transform"
            type="button"
          >
            <span className="material-symbols-outlined text-primary">help_outline</span>
          </button>
          
          <div className="hidden lg:flex items-center gap-3">
            <CurrencySelector />
            <ThemeToggle />
          </div>

          <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center border-2 border-surface shadow-sm overflow-hidden text-primary font-bold">
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
}
