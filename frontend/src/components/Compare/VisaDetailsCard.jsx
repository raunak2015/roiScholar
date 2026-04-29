export default function VisaDetailsCard({ visa }) {
  return (
    <div className="bg-surface-container-low p-6 rounded-xl border-l-4 border-secondary">
      <h3 className="flex items-center gap-2 text-sm font-bold text-secondary mb-4">
        <span className="material-symbols-outlined text-sm">{visa.icon}</span>
        {visa.title}
      </h3>
      <p className="text-sm text-on-surface-variant leading-relaxed">
        {visa.description}
      </p>
    </div>
  );
}
