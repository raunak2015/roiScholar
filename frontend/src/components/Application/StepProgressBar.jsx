export default function StepProgressBar({ currentStep, steps }) {
  const progressPercentage = (currentStep / steps.length) * 100;

  return (
    <div className="mb-12">
      <div className="flex justify-between mb-6">
        {steps.map((step) => (
          <div key={step.number} className={`flex flex-col ${step.number === steps.length ? 'items-end' : 'items-start'}`}>
            <span
              className={`text-xs font-bold uppercase tracking-widest mb-1 ${
                currentStep >= step.number ? 'text-secondary' : 'text-on-surface-variant'
              }`}
            >
              Step {String(step.number).padStart(2, '0')}
            </span>
            <span
              className={`font-semibold ${
                currentStep >= step.number ? 'text-on-surface' : 'text-on-surface-variant opacity-40'
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>

      <div className="w-full h-2 bg-secondary-fixed-dim rounded-full overflow-hidden">
        <div
          className="h-full bg-secondary transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
}
