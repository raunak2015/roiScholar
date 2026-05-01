import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useCurrency } from '../../hooks/useCurrency';

const steps = [
  { id: 1, title: 'Program', icon: 'school' },
  { id: 2, title: 'Budget', icon: 'account_balance_wallet' },
  { id: 3, title: 'Loan', icon: 'payments' },
];

const validationSchema = [
  Yup.object({
    university: Yup.string().required('University name is required'),
    degree: Yup.string().required('Degree name is required'),
    duration: Yup.number().required('Duration is required').min(1, 'Minimum 1 year'),
  }),
  Yup.object({
    tuitionPerYear: Yup.number().required('Tuition is required').min(0),
    livingMonthly: Yup.number().required('Monthly living cost is required').min(0),
    insurance: Yup.number().required('Insurance cost is required').min(0),
  }),
  Yup.object({
    loanAmount: Yup.number().required('Loan amount is required').min(1000),
    interestRate: Yup.number().required('Interest rate is required').min(1).max(25),
    tenure: Yup.number().required('Tenure is required').min(1).max(20),
  }),
];

export default function MultiStepLoanForm({ onCalculate }) {
  const [activeStep, setActiveStep] = useState(0);
  const { symbol, format } = useCurrency();

  const initialValues = {
    university: '',
    degree: '',
    duration: 2,
    tuitionPerYear: 30000,
    livingMonthly: 1500,
    insurance: 2000,
    misc: 1000,
    loanAmount: 50000,
    interestRate: 8.5,
    tenure: 10,
    gracePeriod: 6, // months
  };

  const handleNext = (validateForm, values) => {
    validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        if (activeStep < steps.length - 1) {
          setActiveStep(activeStep + 1);
        } else {
          onCalculate(values);
        }
      }
    });
  };

  const handleBack = () => {
    setActiveStep(Math.max(0, activeStep - 1));
  };

  return (
    <div className="bg-surface-container-low rounded-3xl p-8 border border-outline-variant/10 shadow-sm lg:col-span-7">
      {/* Stepper */}
      <div className="flex justify-between mb-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-surface-container-highest -translate-y-1/2 z-0"></div>
        {steps.map((step, index) => (
          <div key={step.id} className="relative z-10 flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 font-bold
              ${index <= activeStep ? 'bg-primary text-on-primary' : 'bg-surface-container-highest text-on-surface-variant'}
              ${index < activeStep ? 'bg-tertiary' : ''}
            `}>
              {index < activeStep ? (
                <span className="material-symbols-outlined">check</span>
              ) : (
                <span className="material-symbols-outlined">{step.icon}</span>
              )}
            </div>
            <span className={`text-xs mt-2 font-bold uppercase tracking-widest ${index <= activeStep ? 'text-primary' : 'text-on-surface-variant'}`}>
              {step.title}
            </span>
          </div>
        ))}
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema[activeStep]}
        onSubmit={(values) => onCalculate(values)}
      >
        {({ values, validateForm, errors, touched }) => (
          <Form className="space-y-6">
            {activeStep === 0 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xl font-bold text-on-surface mb-6">Program Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-on-surface-variant">University</label>
                    <Field 
                      name="university" 
                      placeholder="e.g. Stanford University"
                      className="rounded-xl border border-outline-variant bg-surface px-4 py-3 outline-none focus:border-primary transition-all"
                    />
                    <ErrorMessage name="university" component="div" className="text-error text-xs font-bold" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-on-surface-variant">Degree Name</label>
                    <Field 
                      name="degree" 
                      placeholder="e.g. MS in Data Science"
                      className="rounded-xl border border-outline-variant bg-surface px-4 py-3 outline-none focus:border-primary transition-all"
                    />
                    <ErrorMessage name="degree" component="div" className="text-error text-xs font-bold" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-on-surface-variant">Program Duration (Years)</label>
                  <Field 
                    type="number" 
                    name="duration" 
                    className="rounded-xl border border-outline-variant bg-surface px-4 py-3 outline-none focus:border-primary transition-all"
                  />
                  <ErrorMessage name="duration" component="div" className="text-error text-xs font-bold" />
                </div>
              </div>
            )}

            {activeStep === 1 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xl font-bold text-on-surface mb-6">Expense Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-on-surface-variant">Tuition (Per Year)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">{symbol}</span>
                      <Field 
                        type="number" 
                        name="tuitionPerYear" 
                        className="w-full rounded-xl border border-outline-variant bg-surface pl-8 pr-4 py-3 outline-none focus:border-primary transition-all"
                      />
                    </div>
                    <ErrorMessage name="tuitionPerYear" component="div" className="text-error text-xs font-bold" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-on-surface-variant">Monthly Living Cost</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">{symbol}</span>
                      <Field 
                        type="number" 
                        name="livingMonthly" 
                        className="w-full rounded-xl border border-outline-variant bg-surface pl-8 pr-4 py-3 outline-none focus:border-primary transition-all"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-on-surface-variant">Health Insurance (Total)</label>
                    <Field 
                      type="number" 
                      name="insurance" 
                      className="rounded-xl border border-outline-variant bg-surface px-4 py-3 outline-none focus:border-primary transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-on-surface-variant">Misc/Travel (Total)</label>
                    <Field 
                      type="number" 
                      name="misc" 
                      className="rounded-xl border border-outline-variant bg-surface px-4 py-3 outline-none focus:border-primary transition-all"
                    />
                  </div>
                </div>
                <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 flex justify-between items-center">
                  <span className="font-bold text-on-surface">Total Cost Estimated:</span>
                  <span className="text-2xl font-extrabold text-primary">
                    {format(((values.tuitionPerYear * values.duration) + (values.livingMonthly * 12 * values.duration) + Number(values.insurance) + Number(values.misc)))}
                  </span>
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xl font-bold text-on-surface mb-6">Financing Details</h3>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-on-surface-variant">Desired Loan Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">{symbol}</span>
                    <Field 
                      type="number" 
                      name="loanAmount" 
                      className="w-full rounded-xl border border-outline-variant bg-surface pl-8 pr-4 py-3 outline-none focus:border-primary transition-all"
                    />
                  </div>
                  <ErrorMessage name="loanAmount" component="div" className="text-error text-xs font-bold" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-on-surface-variant">Interest Rate (%)</label>
                    <Field 
                      type="number" 
                      name="interestRate" 
                      step="0.1"
                      className="rounded-xl border border-outline-variant bg-surface px-4 py-3 outline-none focus:border-primary transition-all"
                    />
                    <ErrorMessage name="interestRate" component="div" className="text-error text-xs font-bold" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-on-surface-variant">Tenure (Years)</label>
                    <Field 
                      type="number" 
                      name="tenure" 
                      className="rounded-xl border border-outline-variant bg-surface px-4 py-3 outline-none focus:border-primary transition-all"
                    />
                    <ErrorMessage name="tenure" component="div" className="text-error text-xs font-bold" />
                  </div>
                </div>
              </div>
            )}

            <div className="pt-8 flex justify-between gap-4 border-t border-outline-variant/10 mt-8">
              <button
                type="button"
                onClick={handleBack}
                disabled={activeStep === 0}
                className={`px-8 py-3 rounded-xl font-bold transition-all
                  ${activeStep === 0 ? 'opacity-0 cursor-default' : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'}
                `}
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => handleNext(validateForm, values)}
                className="px-10 py-3 bg-primary text-on-primary rounded-xl font-bold shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all active:scale-95"
              >
                {activeStep === steps.length - 1 ? 'Calculate ROI' : 'Next Step'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
