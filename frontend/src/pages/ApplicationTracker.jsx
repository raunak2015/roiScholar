import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import MainNavbar from '../components/Layout/MainNavbar';
import Footer from '../components/Layout/Footer';
import StepProgressBar from '../components/Application/StepProgressBar';
import PersonalInfoStep from '../components/Application/PersonalInfoStep';
import UniversityDetailsStep from '../components/Application/UniversityDetailsStep';
import LoanEstimateStep from '../components/Application/LoanEstimateStep';
import DocumentUploadStep from '../components/Application/DocumentUploadStep';
import ApplicationFormFooter from '../components/Application/ApplicationFormFooter';
import ContextualSection from '../components/Application/ContextualSection';

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

  const handleDocumentsAdd = (newFiles = []) => {
    if (!newFiles.length) {
      return;
    }

    setFormData((prev) => {
      const existing = prev.documents || [];
      const merged = [...existing];

      newFiles.forEach((file) => {
        const isDuplicate = merged.some(
          (item) => item.name === file.name && item.size === file.size,
        );

        if (!isDuplicate) {
          merged.push(file);
        }
      });

      return { ...prev, documents: merged };
    });
  };

  const handleDocumentRemove = (id) => {
    setFormData((prev) => ({
      ...prev,
      documents: (prev.documents || []).filter((doc) => doc.id !== id),
    }));
  };

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    try {
      console.log('Application submitted:', formData);
      
      // Reset form state
      setFormData({
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

      toast.success('Application submitted successfully.');

      // Navigate to dashboard
      navigate('/dashboard', { replace: false });
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Unable to submit application. Please try again.');
      navigate('/dashboard', { replace: false });
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep formData={formData} handleInputChange={handleInputChange} />;
      case 2:
        return <UniversityDetailsStep formData={formData} handleInputChange={handleInputChange} />;
      case 3:
        return <LoanEstimateStep formData={formData} handleInputChange={handleInputChange} />;
      case 4:
        return (
          <DocumentUploadStep
            documents={formData.documents}
            onAddFiles={handleDocumentsAdd}
            onRemoveFile={handleDocumentRemove}
          />
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

        {/* Progress Bar */}
        <StepProgressBar currentStep={currentStep} steps={steps} />

        {/* Form Card */}
        <div className="bg-surface-container-lowest p-10 md:p-16 rounded-xl shadow-sm border border-outline-variant/10 mb-8">
          {/* Auto-save Indicator */}
          <div className="absolute top-8 right-8 flex items-center gap-2 px-3 py-1 bg-surface-container-low rounded-full">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            <span className="text-xs font-medium text-on-surface-variant">Your progress is auto-saved</span>
          </div>

          {/* Step Content */}
          {renderStepContent()}

          {/* Form Footer */}
          <ApplicationFormFooter
            currentStep={currentStep}
            steps={steps}
            onPrevious={handlePreviousStep}
            onNext={handleNextStep}
            onSubmit={handleSubmit}
            onBack={() => navigate('/dashboard')}
          />
        </div>

        {/* Contextual Section */}
        <ContextualSection />
      </main>

      <Footer />
    </div>
  );
}
