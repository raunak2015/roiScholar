import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainNavbar from '../components/Layout/MainNavbar';
import Footer from '../components/Layout/Footer';

export default function ApplicationTracker() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    educationLevel: '',
    university: '',
    program: '',
    loanAmount: '',
    loanTerm: '',
    documents: [],
  });

  const steps = [
    { number: 1, label: 'Personal' },
    { number: 2, label: 'University' },
    { number: 3, label: 'Loan' },
    { number: 4, label: 'Documents' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Application submitted:', formData);
    navigate('/dashboard');
  };

  const progressPercentage = (currentStep / 4) * 100;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
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

      case 2:
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

      case 3:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-on-surface mb-4 tracking-tight">Loan Estimate</h2>
              <p className="text-on-surface-variant leading-relaxed mb-8">
                Provide details about the financing you need for your education.
              </p>
              <div className="flex items-start gap-4 p-4 bg-surface-container-low rounded-lg">
                <span className="material-symbols-outlined text-primary flex-shrink-0">savings</span>
                <p className="text-sm text-on-surface-variant">
                  We will match you with loan products that have the best ROI potential for your program.
                </p>
              </div>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-on-surface mb-2 tracking-tight">
                  Loan Amount Required
                </label>
                <input
                  type="number"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={handleInputChange}
                  placeholder="e.g. 125000"
                  className="w-full h-14 px-4 bg-surface-container-lowest border-0 border-b-2 border-outline-variant/30 focus:border-primary focus:ring-0 transition-all placeholder:text-outline/50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-on-surface mb-2 tracking-tight">
                  Preferred Loan Term
                </label>
                <div className="relative">
                  <select
                    name="loanTerm"
                    value={formData.loanTerm}
                    onChange={handleInputChange}
                    className="w-full h-14 px-4 bg-surface-container-lowest border-0 border-b-2 border-outline-variant/30 focus:border-primary focus:ring-0 transition-all appearance-none text-on-surface"
                  >
                    <option value="">Select loan term</option>
                    <option value="5">5 Years</option>
                    <option value="10">10 Years</option>
                    <option value="15">15 Years</option>
                    <option value="20">20 Years</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-outline">
                    expand_more
                  </span>
                </div>
              </div>
            </form>
          </div>
        );

      case 4:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-on-surface mb-4 tracking-tight">Upload Documents</h2>
              <p className="text-on-surface-variant leading-relaxed mb-8">
                Upload necessary documents to complete your application.
              </p>
              <div className="flex items-start gap-4 p-4 bg-surface-container-low rounded-lg">
                <span className="material-symbols-outlined text-secondary flex-shrink-0">file_present</span>
                <p className="text-sm text-on-surface-variant">
                  Required: Academic transcripts, passport copy, and proof of financial support.
                </p>
              </div>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-on-surface mb-2 tracking-tight">
                  Upload Documents
                </label>
                <div className="border-2 border-dashed border-outline-variant/30 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors">
                  <span className="material-symbols-outlined text-4xl text-on-surface-variant opacity-40 block mb-2">
                    cloud_upload
                  </span>
                  <p className="text-sm font-medium text-on-surface mb-1">Click to upload or drag and drop</p>
                  <p className="text-xs text-on-surface-variant">PDF, DOC up to 10MB</p>
                </div>
              </div>
            </form>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-surface min-h-screen flex flex-col">
      <MainNavbar userName="JD" />

      <main className="max-w-4xl mx-auto px-8 py-16 flex-grow w-full">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-5xl font-black tracking-tighter text-on-surface mb-4">
            Your Academic Journey <span className="text-secondary">Begins Here</span>
          </h1>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
            Complete your application to unlock tailored STEM financing solutions designed for your future ROI.
          </p>
        </section>

        {/* Progress Section */}
        <div className="mb-12">
          <div className="flex justify-between mb-6">
            {steps.map((step) => (
              <div key={step.number} className={`flex flex-col ${step.number === 4 ? 'items-end' : 'items-start'}`}>
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

        {/* Form Card */}
        <div className="bg-surface-container-lowest p-10 md:p-16 rounded-xl shadow-sm border border-outline-variant/10 mb-8">
          {/* Auto-save Indicator */}
          <div className="absolute top-8 right-8 flex items-center gap-2 px-3 py-1 bg-surface-container-low rounded-full">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            <span className="text-xs font-medium text-on-surface-variant">Your progress is auto-saved</span>
          </div>

          {/* Step Content */}
          {renderStepContent()}

          {/* Action Footer */}
          <div className="mt-16 pt-8 flex items-center justify-between border-t border-outline-variant/10">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-on-surface-variant font-semibold hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Back to Dashboard
            </button>

            <div className="flex gap-4">
              {currentStep > 1 && (
                <button
                  onClick={handlePreviousStep}
                  className="px-6 py-3 bg-surface-container text-primary rounded-lg font-semibold hover:bg-surface-container-high transition-all active:scale-95"
                >
                  Previous
                </button>
              )}

              {currentStep < 4 ? (
                <button
                  onClick={handleNextStep}
                  className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-3 rounded-lg font-bold tracking-wide uppercase text-sm shadow-lg hover:shadow-lg active:scale-95 transition-all flex items-center gap-2"
                >
                  Continue to {steps[currentStep].label}
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-secondary to-secondary-container text-on-secondary px-8 py-3 rounded-lg font-bold tracking-wide uppercase text-sm shadow-lg hover:shadow-lg active:scale-95 transition-all flex items-center gap-2"
                >
                  Submit Application
                  <span className="material-symbols-outlined">check_circle</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Contextual Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-2 bg-surface-container-low p-8 rounded-xl flex items-center gap-8">
            <img
              className="w-32 h-32 object-cover rounded-lg shadow-sm flex-shrink-0"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCq-ig1iFMA98rbIjdSutZsSeT0h-ZFApay4vZb0n46YpEJa0154HYU1Q56OhdtZ1ewSlJj-aXaRmM451Tz9YzALnRsvhSNyAE2Yn0uvu74Q7psmTTxNKxV-T-kbm5Oavd8b-ZmIVoZRkrtTdRBiThHtq3Oh9TvdFuv1IZiqhJnO8p_6EnzlR56nulsVcI08oD1HExHsLE-ZZGKRLb3ZLT1vF6LdC0rMx0KdU4LFM_v5VgFwSOCg6NwUHK5q_JI7XZXzUKSVU4q76o"
              alt="University library"
            />
            <div>
              <h3 className="font-bold text-on-surface text-lg mb-2">STEM Career Support</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Applications for STEM majors receive priority review and specialized ROI modeling tools for better future
                planning.
              </p>
            </div>
          </div>

          <div className="bg-secondary-container p-8 rounded-xl flex flex-col justify-between">
            <span className="material-symbols-outlined text-on-secondary-container text-4xl">analytics</span>
            <div>
              <h3 className="font-bold text-on-secondary-container text-lg mt-4">Precision ROI</h3>
              <p className="text-xs text-on-secondary-container/80 mt-1 uppercase tracking-widest font-bold">
                Lender transparency protocol active
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
