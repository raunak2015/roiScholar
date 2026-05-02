export default function ApplicationFormFooter({ currentStep, steps, onPrevious, onNext, onSubmit, onBack }) {
  return (
    <div className="mt-16 pt-8 flex flex-col gap-4 sm:gap-0 sm:flex-row sm:items-center sm:justify-between border-t border-outline-variant/10">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-on-surface-variant font-semibold hover:text-on-surface transition-colors"
      >
        <span className="material-symbols-outlined">arrow_back</span>
        Back to Dashboard
      </button>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
        {currentStep > 1 && (
          <button
            onClick={onPrevious}
            className="px-6 py-3 bg-surface-container text-primary rounded-lg font-semibold hover:bg-surface-container-high transition-all active:scale-95 w-full sm:w-auto"
          >
            Previous
          </button>
        )}

        {currentStep < steps.length ? (
          <button
            onClick={onNext}
            className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-3 rounded-lg font-bold tracking-wide uppercase text-sm shadow-lg hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            Continue to {steps[currentStep]?.label || 'Next'}
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        ) : (
          <button
            onClick={onSubmit}
            className="bg-gradient-to-r from-secondary to-secondary-container text-on-secondary px-8 py-3 rounded-lg font-bold tracking-wide uppercase text-sm shadow-lg hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            Submit Application
            <span className="material-symbols-outlined">check_circle</span>
          </button>
        )}
      </div>
    </div>
  );
}
