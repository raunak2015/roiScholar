import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainNavbar from '../components/Layout/MainNavbar';
import Footer from '../components/Layout/Footer';
import UniversityCard from '../components/Compare/UniversityCard';
import CostBreakdownCard from '../components/Compare/CostBreakdownCard';
import ROIBenchmarksCard from '../components/Compare/ROIBenchmarksCard';
import LoanRecommendationCard from '../components/Compare/LoanRecommendationCard';
import VisaDetailsCard from '../components/Compare/VisaDetailsCard';

export default function CompareDetailPage() {
  const navigate = useNavigate();

  const universities = [
    {
      id: 1,
      name: 'Stanford University',
      program: 'MS in Computer Science',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADWAgRn84e8eR__3qFpiaZ30tqMCBYkDqbTFF1GklU2LSayLnT5bHf3tACe4ONnX9D6XTnIN3KQP28k_mogFkMxYpoGrJd0A07BVzonob4B7orGOzfXK_XWgZRe3FfH_kgJG8i-14vajTPjkJKpxacSmJlf8oAK9PCT-wF07FJqItknwAqT_TjRpZ50KQJ5TBuNZ7ThPqr3iyVbEE7JT59ggYhZ4761o-2_ClRK52EfK8kGBXk8aEUzPWFaFSPuUi2pGd0dUtb1Zw',
      totalCost: 125000,
      costBreakdown: {
        tuition: 82000,
        living: 38000,
        misc: 5000,
      },
      costPercentages: {
        tuition: 70,
        living: 25,
        misc: 5,
      },
      roi: {
        startingSalary: 165000,
        breakEvenPeriod: '2.2 Years',
        tenYearProjection: 1400000,
        projectionPercentage: 85,
      },
      loan: {
        interestRate: 8.45,
        monthlyEMI: 1240,
        totalRepayment: 148800,
      },
      visa: {
        title: 'Visa Details (USA - F1)',
        icon: 'flight_takeoff',
        description:
          '36-month OPT STEM extension available. High likelihood of H1-B sponsorship from Silicon Valley network partners.',
      },
    },
    {
      id: 2,
      name: 'University of Toronto',
      program: 'MSc in Applied Computing',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8yVPeBI7jk4Yjdka1I97JcsOcdJW5CSojfT_cD5uxfU3Q6L_PMNNEcod_UXzV819yk3WIYDP_nwAgwtAUHw4eyJ7tadHb07Rg7e0OzzaF8QSoPFfJiKEjO0h1mz9PXHrgNTwQWfR0zV9a5yLSq-R6x2bzGkRJDdDwio8IsPsAdqxs4TAUA4S1h8CiMn7p6gN1Dxs1-gMAfnMSGr4tjORYtIK8GkN7q0MEMYtpFg241XKooSbEVUGOW7Ipj-ju-gNr_0LpVRFBbCE',
      totalCost: 78000,
      costBreakdown: {
        tuition: 45000,
        living: 28000,
        misc: 5000,
      },
      costPercentages: {
        tuition: 55,
        living: 35,
        misc: 10,
      },
      roi: {
        startingSalary: 115000,
        breakEvenPeriod: '2.8 Years',
        tenYearProjection: 850000,
        projectionPercentage: 60,
      },
      loan: {
        interestRate: 7.25,
        monthlyEMI: 780,
        totalRepayment: 93600,
      },
      visa: {
        title: 'Visa Details (Canada - PGWP)',
        icon: 'travel_explore',
        description:
          'Eligible for 3-year Post-Graduation Work Permit. Clear path to Permanent Residency (Express Entry) for high-skilled tech workers.',
      },
    },
  ];

  return (
    <div className="bg-[#f9f9ff] min-h-screen flex flex-col">
      <MainNavbar userName="JD" />

      <main className="max-w-7xl mx-auto px-8 py-10 flex-grow">
        {/* Action Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">
              Detailed Comparison
            </h1>
            <p className="text-on-surface-variant text-lg">
              Stanford vs. Toronto: Financial ROI Analysis
            </p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-surface-container-high text-primary rounded-lg font-semibold hover:bg-surface-container-highest transition-all active:scale-95">
            <span className="material-symbols-outlined">picture_as_pdf</span>
            Export as PDF
          </button>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {universities.map((uni) => (
            <div key={uni.id} className="flex flex-col gap-6">
              {/* University Identity Card */}
              <UniversityCard
                name={uni.name}
                program={uni.program}
                logo={uni.logo}
              />

              {/* Cost Breakdown */}
              <CostBreakdownCard
                totalCost={uni.totalCost}
                breakdown={uni.costBreakdown}
                percentages={uni.costPercentages}
              />

              {/* ROI Metrics */}
              <ROIBenchmarksCard roi={uni.roi} />

              {/* Loan Estimate */}
              <LoanRecommendationCard loan={uni.loan} />

              {/* Visa & Logistics */}
              <VisaDetailsCard visa={uni.visa} />
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="mt-16 flex justify-center border-t border-outline-variant/10 pt-12">
          <button
            onClick={() => navigate('/compare')}
            className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all group"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Back to comparison
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
