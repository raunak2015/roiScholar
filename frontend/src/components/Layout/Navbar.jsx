import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../features/auth/authSlice';
import ThemeToggle from '../UI/ThemeToggle';
import CurrencyToggle from '../UI/CurrencyToggle';

const navItems = [
  { name: 'Dashboard', to: '/dashboard' },
  { name: 'Calculator', to: '/calculator' },
  { name: 'ROI Simulator', to: '/roi-simulator' },
  { name: 'Compare', to: '/compare' },
  { name: 'Scholarships', to: '/scholarships' },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth || {});

  const initials =
    user?.name
      ?.split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('') || 'JD';

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  const mobileTabs = [
    { name: 'Dashboard', to: '/dashboard', icon: 'dashboard' },
    { name: 'Calculator', to: '/calculator', icon: 'calculate' },
    { name: 'ROI', to: '/roi-simulator', icon: 'trending_up' },
    { name: 'Compare', to: '/compare', icon: 'compare_arrows' },
    { name: 'Profile', to: '/profile', icon: 'person' },
  ];

  return (
    <header className="sticky top-0 w-full z-50 bg-surface shadow-sm border-b border-outline-variant/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 md:h-20">
        <Link to="/dashboard" className="text-lg md:text-xl font-black tracking-tighter text-primary">
          RoiScholar
        </Link>

        <nav className="hidden md:flex items-center gap-8 h-full">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.name}
                to={item.to}
                className={`h-full flex items-center font-medium transition-all duration-200 ${isActive
                  ? 'text-primary border-b-2 border-secondary pb-1 font-semibold'
                  : 'text-on-surface-variant hover:text-primary'
                  }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <button
            className="p-2 rounded-full hover:bg-surface-container-high active:scale-95 transition-transform"
            type="button"
          >
            <span className="material-symbols-outlined text-primary text-[20px] md:text-[24px]">notifications</span>
          </button>
          <button
            className="hidden sm:inline-flex p-2 rounded-full hover:bg-surface-container-high active:scale-95 transition-transform"
            type="button"
          >
            <span className="material-symbols-outlined text-primary text-[20px] md:text-[24px]">help_outline</span>
          </button>

          <div className="hidden lg:flex items-center gap-3">
            <CurrencyToggle />
            <ThemeToggle />
          </div>

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link
                to="/profile"
                className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center border-2 border-surface shadow-sm overflow-hidden text-primary font-bold hover:scale-105 transition-transform"
              >
                {initials}
              </Link>
              <button
                onClick={handleLogout}
                className="hidden md:inline-flex text-sm font-bold text-error hover:bg-error/10 px-3 py-1.5 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-sm font-bold text-primary hover:bg-primary/10 px-4 py-2 rounded-lg transition-colors">
                Log in
              </Link>
              <Link to="/register" className="text-sm font-bold bg-primary text-on-primary px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>

      {isAuthenticated && (
        <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 border-t border-outline-variant/20 bg-surface/95 backdrop-blur-md px-2 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          <div className="grid grid-cols-5 gap-1">
            {mobileTabs.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.name}
                  to={item.to}
                  className={`flex flex-col items-center justify-center gap-1 rounded-xl py-2 text-[11px] font-semibold transition-colors ${
                    isActive
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                  <span className="leading-none">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
