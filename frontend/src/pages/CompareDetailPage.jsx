import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MainNavbar from '../components/Layout/MainNavbar';
import Footer from '../components/Layout/Footer';
import UniversityCard from '../components/Compare/UniversityCard';
import CostBreakdownCard from '../components/Compare/CostBreakdownCard';
import ROIBenchmarksCard from '../components/Compare/ROIBenchmarksCard';
import LoanRecommendationCard from '../components/Compare/LoanRecommendationCard';
import VisaDetailsCard from '../components/Compare/VisaDetailsCard';
import UniversityFilterPanel from '../components/Compare/UniversityFilterPanel';
import ComparisonTable from '../components/Compare/ComparisonTable';
import { setUniversities, updateUniversityFilters, setSelectedUniversities } from '../features/university/universitySlice';

export default function CompareDetailPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const uniState = useSelector((state) => state.university || {});
  const [selectedIds, setSelectedIds] = useState([]);

  const mockUniversities = [
    {
      id: 1,
      name: 'Stanford University',
      country: 'United States',
      degree: 'Computer Science',
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
      country: 'Canada',
      degree: 'Computer Science',
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
    {
      id: 3,
      name: 'MIT',
      country: 'United States',
      degree: 'AI & ML',
      program: 'MS in Computer Science (AI)',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8yVPeBI7jk4Yjdka1I97JcsOcdJW5CSojfT_cD5uxfU3Q6L_PMNNEcod_UXzV819yk3WIYDP_nwAgwtAUHw4eyJ7tadHb07Rg7e0OzzaF8QSoPFfJiKEjO0h1mz9PXHrgNTwQWfR0zV9a5yLSq-R6x2bzGkRJDdDwio8IsPsAdqxs4TAUA4S1h8CiMn7p6gN1Dxs1-gMAfnMSGr4tjORYtIK8GkN7q0MEMYtpFg241XKooSbEVUGOW7Ipj-ju-gNr_0LpVRFBbCE',
      totalCost: 135000,
      costBreakdown: {
        tuition: 90000,
        living: 40000,
        misc: 5000,
      },
      costPercentages: {
        tuition: 67,
        living: 30,
        misc: 3,
      },
      roi: {
        startingSalary: 185000,
        breakEvenPeriod: '2.0 Years',
        tenYearProjection: 1550000,
        projectionPercentage: 88,
      },
      loan: {
        interestRate: 8.5,
        monthlyEMI: 1340,
        totalRepayment: 160800,
      },
      visa: {
        title: 'Visa Details (USA - F1)',
        icon: 'flight_takeoff',
        description:
          'STEM OPT extension 24 months + 3 year extension possible. High sponsorship rates for AI/ML roles.',
      },
    },
    {
      id: 4,
      name: 'University of Cambridge',
      country: 'United Kingdom',
      degree: 'AI & ML',
      program: 'MPhil in Advanced Computer Science',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8yVPeBI7jk4Yjdka1I97JcsOcdJW5CSojfT_cD5uxfU3Q6L_PMNNEcod_UXzV819yk3WIYDP_nwAgwtAUHw4eyJ7tadHb07Rg7e0OzzaF8QSoPFfJiKEjO0h1mz9PXHrgNTwQWfR0zV9a5yLSq-R6x2bzGkRJDdDwio8IsPsAdqxs4TAUA4S1h8CiMn7p6gN1Dxs1-gMAfnMSGr4tjORYtIK8GkN7q0MEMYtpFg241XKooSbEVUGOW7Ipj-ju-gNr_0LpVRFBbCE',
      totalCost: 95000,
      costBreakdown: {
        tuition: 55000,
        living: 35000,
        misc: 5000,
      },
      costPercentages: {
        tuition: 58,
        living: 37,
        misc: 5,
      },
      roi: {
        startingSalary: 130000,
        breakEvenPeriod: '2.5 Years',
        tenYearProjection: 1050000,
        projectionPercentage: 72,
      },
      loan: {
        interestRate: 7.75,
        monthlyEMI: 945,
        totalRepayment: 113400,
      },
      visa: {
        title: 'Visa Details (UK - Graduate Route)',
        icon: 'travel_explore',
        description:
          '2-year graduate visa post-completion. Pathway to Skilled Worker visa for tech roles.',
      },
    },
  ];

  // Initialize universities on mount
  useEffect(() => {
    dispatch(setUniversities(mockUniversities));
  }, [dispatch]);

  // Filter universities based on Redux filters
  const filteredUniversities = (uniState.universities || mockUniversities).filter((uni) => {
    const countryMatch =
      !uniState.filters?.country?.length || uniState.filters.country.includes(uni.country);
    const degreeMatch =
      !uniState.filters?.degree?.length || uniState.filters.degree.includes(uni.degree);
    const tuitionMatch = !uniState.filters?.maxTuition || uni.totalCost <= uniState.filters.maxTuition;
    return countryMatch && degreeMatch && tuitionMatch;
  });

  const handleFilterChange = (newFilters) => {
    dispatch(updateUniversityFilters(newFilters));
  };

  const handleSelectUniversities = (ids) => {
    setSelectedIds(ids);
    dispatch(setSelectedUniversities(ids));
  };

  const universities = filteredUniversities;

  return (
    <div className="bg-[#f9f9ff] min-h-screen flex flex-col">
      <MainNavbar userName="JD" />

      <main className="max-w-7xl mx-auto px-8 py-10 flex-grow">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">
            Compare Universities
          </h1>
          <p className="text-on-surface-variant text-lg">
            Filter and compare STEM programs across countries with financial ROI analysis
          </p>
        </div>

        {/* Filter Panel */}
        <UniversityFilterPanel
          filters={uniState.filters || {}}
          onFilterChange={handleFilterChange}
        />

        {/* Comparison Table */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-4">
            {filteredUniversities.length} Universities Found
          </h2>
          <ComparisonTable
            universities={filteredUniversities}
            selected={selectedIds}
            onSelect={handleSelectUniversities}
          />
        </div>

        {/* Detailed View for Selected Universities */}
        {selectedIds.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-primary mb-8">Detailed Comparison</h2>

            {/* Action Header */}
            <div className="flex justify-between items-end mb-12">
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">
                  {universities
                    .filter((u) => selectedIds.includes(u.id))
                    .map((u) => u.name)
                    .join(' vs. ')}
                </h1>
                <p className="text-on-surface-variant text-lg">
                  Financial ROI Analysis
                </p>
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-surface-container-high text-primary rounded-lg font-semibold hover:bg-surface-container-highest transition-all active:scale-95">
                <span className="material-symbols-outlined">picture_as_pdf</span>
                Export as PDF
              </button>
            </div>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {universities
                .filter((u) => selectedIds.includes(u.id))
                .map((uni) => (
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
          </div>
        )}

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
