export default function SettingsSidebar({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'account', label: 'Account Info', icon: 'person' },
    { id: 'preferences', label: 'Preferences', icon: 'settings' },
    { id: 'saved', label: 'Saved Data', icon: 'database' },
  ];

  return (
    <aside className="w-full md:w-64 shrink-0">
      <div className="flex md:flex-col gap-2 p-1 bg-surface-container-low rounded-xl overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 md:gap-3 px-4 py-3 text-sm rounded-lg transition-all whitespace-nowrap min-w-fit ${activeTab === tab.id
                ? 'font-bold bg-surface-container-highest text-primary shadow-sm border-l-4 border-secondary'
                : 'font-semibold text-on-surface-variant hover:bg-surface-container-high'
              }`}
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={activeTab === tab.id ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {tab.icon}
            </span>
            {tab.label}
          </button>
        ))}

        <div className="hidden md:block my-4 border-t border-outline-variant opacity-20 mx-4"></div>

        <button className="hidden md:flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-lg text-error hover:bg-error-container/10 transition-all">
          <span className="material-symbols-outlined text-[20px]">logout</span>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
