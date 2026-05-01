export default function ApplicationFormFooter({ currentStep, steps, onPrevious, onNext, onSubmit, onBack }) {
  return (
    <div className="mt-16 pt-8 flex items-center justify-between border-t border-outline-variant/10">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-on-surface-variant font-semibold hover:text-on-surface transition-colors"
      >
        <span className="material-symbols-outlined">arrow_back</span>
        Back to Dashboard
      </button>

      <div className="flex gap-4">
        {currentStep > 1 && (
          <button
            onClick={onPrevious}
            className="px-6 py-3 bg-surface-container text-primary rounded-lg font-semibold hover:bg-surface-container-high transition-all active:scale-95"
          >
            Previous
          </button>
        )}

        {currentStep < steps.length ? (
          <button
            onClick={onNext}
            className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-3 rounded-lg font-bold tracking-wide uppercase text-sm shadow-lg hover:shadow-lg active:scale-95 transition-all flex items-center gap-2"
          >
            Continue to {steps[currentStep]?.label || 'Next'}
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        ) : (
          <button
            onClick={onSubmit}
            className="bg-gradient-to-r from-secondary to-secondary-container text-on-secondary px-8 py-3 rounded-lg font-bold tracking-wide uppercase text-sm shadow-lg hover:shadow-lg active:scale-95 transition-all flex items-center gap-2"
          >
            Submit Application
            <span className="material-symbols-outlined">check_circle</span>
          </button>
        )}
      </div>
    </div>
  );
}
