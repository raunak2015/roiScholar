export default function PersonalInfoStep({ formData, handleInputChange }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-on-surface mb-4 tracking-tight">
          Identity Verification
        </h2>
        <p className="text-on-surface-variant leading-relaxed mb-8">
          We use this information to personalize your ROI simulations and ensure legal compliance with lender
          transparency protocols.
        </p>
        <div className="flex items-start gap-4 p-4 bg-surface-container-low rounded-lg">
          <span className="material-symbols-outlined text-primary flex-shrink-0">security</span>
          <p className="text-sm text-on-surface-variant">
            Your data is encrypted using military-grade protocols and will never be sold to third parties.
          </p>
        </div>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-on-surface mb-2 tracking-tight">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="e.g. Elena Rodriguez"
            className="w-full h-14 px-4 bg-surface-container-lowest border-0 border-b-2 border-outline-variant/30 focus:border-primary focus:ring-0 transition-all placeholder:text-outline/50"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-on-surface mb-2 tracking-tight">
            Primary Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="elena.r@university.edu"
            className="w-full h-14 px-4 bg-surface-container-lowest border-0 border-b-2 border-outline-variant/30 focus:border-primary focus:ring-0 transition-all placeholder:text-outline/50"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-on-surface mb-2 tracking-tight">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="+1 (555) 000-0000"
            className="w-full h-14 px-4 bg-surface-container-lowest border-0 border-b-2 border-outline-variant/30 focus:border-primary focus:ring-0 transition-all placeholder:text-outline/50"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-on-surface mb-2 tracking-tight">
            Education Level
          </label>
          <div className="relative">
            <select
              name="educationLevel"
              value={formData.educationLevel}
              onChange={handleInputChange}
              className="w-full h-14 px-4 bg-surface-container-lowest border-0 border-b-2 border-outline-variant/30 focus:border-primary focus:ring-0 transition-all appearance-none text-on-surface"
            >
              <option value="">Select current level</option>
              <option value="undergraduate">Undergraduate (Senior)</option>
              <option value="graduate">Graduate (Masters/PhD)</option>
              <option value="professional">Professional Certification</option>
              <option value="postdoc">Post-Doctoral</option>
            </select>
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-outline">
              expand_more
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}
