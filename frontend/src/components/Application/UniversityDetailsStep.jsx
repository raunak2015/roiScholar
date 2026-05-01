export default function UniversityDetailsStep({ formData, handleInputChange }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-on-surface mb-4 tracking-tight">University Details</h2>
        <p className="text-on-surface-variant leading-relaxed mb-8">
          Tell us about the university and program you are applying to.
        </p>
        <div className="flex items-start gap-4 p-4 bg-surface-container-low rounded-lg">
          <span className="material-symbols-outlined text-secondary flex-shrink-0">school</span>
          <p className="text-sm text-on-surface-variant">
            We will use this information to calculate accurate ROI projections based on program details.
          </p>
        </div>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-on-surface mb-2 tracking-tight">
            University Name
          </label>
          <input
            type="text"
            name="university"
            value={formData.university}
            onChange={handleInputChange}
            placeholder="e.g. Stanford University"
            className="w-full h-14 px-4 bg-surface-container-lowest border-0 border-b-2 border-outline-variant/30 focus:border-primary focus:ring-0 transition-all placeholder:text-outline/50"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-on-surface mb-2 tracking-tight">
            Program/Degree
          </label>
          <input
            type="text"
            name="program"
            value={formData.program}
            onChange={handleInputChange}
            placeholder="e.g. MS in Computer Science"
            className="w-full h-14 px-4 bg-surface-container-lowest border-0 border-b-2 border-outline-variant/30 focus:border-primary focus:ring-0 transition-all placeholder:text-outline/50"
          />
        </div>
      </form>
    </div>
  );
}
