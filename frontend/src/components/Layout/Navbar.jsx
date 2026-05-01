import { Link, useLocation } from 'react-router-dom';
import CurrencySelector from '../UI/CurrencySelector';

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
    <header className="sticky top-0 w-full z-50 bg-[#f9f9ff] shadow-sm">
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center h-20">
        <Link to="/dashboard" className="text-xl font-black tracking-tighter text-[#00236f]">
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
                    ? 'text-[#00236f] border-b-2 border-[#006a61] pb-1 font-semibold'
                    : 'text-[#44474e] hover:text-[#00236f]'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <button
            className="p-2 rounded-full hover:bg-[#f0f0f7] active:scale-95 transition-transform"
            type="button"
          >
            <span className="material-symbols-outlined text-[#00236f]">notifications</span>
          </button>
          <button
            className="p-2 rounded-full hover:bg-[#f0f0f7] active:scale-95 transition-transform"
            type="button"
          >
            <span className="material-symbols-outlined text-[#00236f]">help_outline</span>
          </button>
          
          <div className="hidden lg:block">
            <CurrencySelector />
          </div>

          <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center border-2 border-white shadow-sm overflow-hidden text-[#00236f] font-bold">
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
}
