export default function PreferencesCard({
  title,
  description,
  icon,
  status,
  isToggled,
  onToggle,
}) {
  return (
    <div className="bg-surface-container-low rounded-xl p-6 flex flex-col justify-between group">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-bold text-on-surface">{title}</h3>
          <p className="text-sm text-on-surface-variant mt-1">{description}</p>
        </div>
        <span className="material-symbols-outlined text-primary group-hover:rotate-12 transition-transform">
          {icon}
        </span>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-tighter text-on-surface-variant">
          Current: {status}
        </span>

        <button
          onClick={onToggle}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
            isToggled ? 'bg-secondary' : 'bg-outline-variant'
          }`}
        >
          <span
            className={`${
              isToggled ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-surface transition-transform`}
          />
        </button>
      </div>
    </div>
  );
}
