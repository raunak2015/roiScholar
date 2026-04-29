import React from 'react';

const navItems = ['Dashboard', 'Calculator', 'ROI Simulator', 'Compare', 'Profile'];

const DashboardHeader = ({ userName = 'Alex' }) => {
  return (
    <header className="sticky top-0 w-full z-50 bg-[#f9f9ff] shadow-sm">
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center h-20">
        <div className="text-xl font-black tracking-tighter text-[#00236f]">EduLoan Compass</div>

        <nav className="hidden md:flex items-center gap-8 h-full">
          {navItems.map((item) => (
            <a
              key={item}
              className={`h-full flex items-center font-medium transition-all duration-200 ${
                item === 'Dashboard'
                  ? 'text-[#00236f] border-b-2 border-[#006a61] pb-1 font-semibold'
                  : 'text-[#44474e] hover:text-[#00236f]'
              }`}
              href="#"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-[#f0f0f7] active:scale-95 transition-transform" type="button">
            <span className="material-symbols-outlined text-[#00236f]">notifications</span>
          </button>
          <button className="p-2 rounded-full hover:bg-[#f0f0f7] active:scale-95 transition-transform" type="button">
            <span className="material-symbols-outlined text-[#00236f]">help_outline</span>
          </button>
          <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
            <img
              alt={userName}
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaZVH7N12qgL6aplxtQ10WP2RtS3wBNqpppkTvEPA3RO5GKK24kGIAzXKqKUmLsWRzXs4UXD3mdlvEaE2bqmWjl8xjhDW96uqdJ6Ulz_wlF0QKPnEsjH_KfrJt5PbxYLETXJglOEguutuKG3JgjwSUHI4WW_b50rPwT9T0zvg8a7Wn8RKQV8C8DT4OOsS2XsPzTLyAVgfB8Rq0juK2OMrcMsLsWMm2K94vK_Yi0AiMnQ6gjgY4kl3Cx1XVAL542Ffu-dlsO_00_Ao"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
