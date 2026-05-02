import { useCurrency } from '../../hooks/useCurrency';

export default function ScholarshipCard({ scholarship }) {
  const { symbol, format } = useCurrency();

  const isFullRide = scholarship.amountType === 'Full Tuition';
  
  // Format deadline
  const deadlineDate = new Date(scholarship.deadline);
  const formattedDeadline = deadlineDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const isUrgent = (deadlineDate.getTime() - new Date().getTime()) < (30 * 24 * 60 * 60 * 1000); // Less than 30 days

  // Eligibility Match Simulation (Mock logic based on STEM flag)
  const matchScore = scholarship.stemOnly ? 95 : 75;

  return (
    <div className="bg-surface-container-low rounded-3xl p-6 border border-outline-variant/10 shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-3">
            {scholarship.provider}
          </span>
          <h3 className="text-xl font-bold text-on-surface leading-tight group-hover:text-primary transition-colors">
            {scholarship.title}
          </h3>
        </div>
        
        {/* Match Badge */}
        <div className="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-secondary/10 border-2 border-secondary/20 flex-shrink-0">
          <span className="text-secondary font-black text-sm">{matchScore}%</span>
          <span className="text-secondary opacity-70 text-[8px] uppercase font-bold leading-none">Match</span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {scholarship.tags.slice(0, 3).map((tag, idx) => (
          <span key={idx} className="text-xs font-semibold px-2 py-1 bg-surface-container-high text-on-surface-variant rounded-md">
            {tag}
          </span>
        ))}
      </div>

      <p className="text-sm text-on-surface-variant mb-6 flex-grow line-clamp-3">
        {scholarship.description}
      </p>

      {/* Footer Metrics */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-outline-variant/10 mt-auto">
        <div>
          <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Amount</span>
          <p className="text-lg font-black text-on-surface">
            {isFullRide ? 'Full Tuition' : `${scholarship.amountType} ${format(scholarship.amountValue, { compact: true })}`}
          </p>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Deadline</span>
          <p className={`text-sm font-bold mt-1 flex items-center gap-1 ${isUrgent ? 'text-error' : 'text-on-surface'}`}>
            <span className="material-symbols-outlined text-[16px]">{isUrgent ? 'warning' : 'event'}</span>
            {formattedDeadline}
          </p>
        </div>
      </div>

      <a 
        href={scholarship.applicationLink} 
        target="_blank" 
        rel="noopener noreferrer"
        className="mt-6 w-full py-3 bg-primary text-on-primary rounded-xl font-bold text-center hover:bg-primary/90 transition-all active:scale-95 shadow-md flex justify-center items-center gap-2"
      >
        View Details <span className="material-symbols-outlined text-[18px]">open_in_new</span>
      </a>
    </div>
  );
}
