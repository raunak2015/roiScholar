import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
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
import { submitApplication } from '../services/applicationService';

export default function ApplicationTracker() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth || {});
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
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

  // Pre-fill from auth user
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: prev.fullName || user.name || '',
        email: prev.email || user.email || ''
      }));
    }
  }, [user]);

  // Pre-fill from navigation state (e.g. from Compare page)
  useEffect(() => {
    if (location.state) {
      setFormData(prev => ({
        ...prev,
        ...location.state
      }));
    }
  }, [location.state]);

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
    // Validate current step before proceeding
    if (currentStep === 1) {
      if (!formData.fullName || !formData.email || !formData.phone || !formData.educationLevel) {
        toast.error('Please complete all fields in this step to proceed.');
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.university || !formData.program) {
        toast.error('Please complete all fields in this step to proceed.');
        return;
      }
    } else if (currentStep === 3) {
      if (!formData.loanAmount || !formData.loanTerm) {
        toast.error('Please complete all fields in this step to proceed.');
        return;
      }
    }

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    // Final safety check before submission
    if (!formData.fullName || !formData.email || !formData.phone || !formData.educationLevel || !formData.university || !formData.program || !formData.loanAmount || !formData.loanTerm) {
      toast.error('Please ensure all required fields across all steps are filled out.');
      return;
    }

    try {
      setLoading(true);
      console.log('Submitting application (Demo Mode):', formData);
      
      // Mock delay for demo purposes (2 seconds as requested)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Email is sent successfully!');
      
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

      // Brief delay before navigation for better UX in demo
      setTimeout(() => {
        navigate('/dashboard', { replace: false });
      }, 1500);
      
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Unable to submit application. Please try again.');
    } finally {
      setLoading(false);
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 pb-28 md:pb-12 flex-grow w-full">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tighter text-on-surface mb-4">
            Your Academic Journey <span className="text-secondary">Begins Here</span>
          </h1>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
            Complete your application to unlock tailored STEM financing solutions designed for your future ROI.
          </p>
        </section>

        {/* Progress Bar */}
        <StepProgressBar currentStep={currentStep} steps={steps} />

        {/* Form Card */}
        <div className="relative bg-surface-container-lowest p-6 sm:p-10 md:p-16 rounded-xl shadow-sm border border-outline-variant/10 mb-8">
          {/* Auto-save Indicator */}
          <div className="mb-6 md:mb-0 md:absolute md:top-8 md:right-8 flex items-center gap-2 px-3 py-1 bg-surface-container-low rounded-full w-fit ml-auto">
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
            loading={loading}
          />
        </div>

        {/* Contextual Section */}
        <ContextualSection />
      </main>

      <Footer />
    </div>
  );
}
