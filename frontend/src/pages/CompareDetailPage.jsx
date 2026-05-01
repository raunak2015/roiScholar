import { useEffect } from 'react';
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
import { DEFAULT_COMPARE_COUNTRIES, loadCompareUniversities } from '../services/universityService';

export default function CompareDetailPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const uniState = useSelector((state) => state.university || {});
  const universityRows = uniState.universities || [];
  const selectedUniversities = uniState.selectedUniversities || [];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function initializeUniversities() {
      if (universityRows.length > 0) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');

      try {
        const data = await loadCompareUniversities({ countries: DEFAULT_COMPARE_COUNTRIES });

        if (!cancelled) {
          dispatch(setUniversities(data));
        }
      } catch (fetchError) {
        if (!cancelled) {
          setError(fetchError?.message || 'Failed to load university comparison data');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    initializeUniversities();

    return () => {
      cancelled = true;
    };
  }, [dispatch, universityRows.length]);

  // Filter universities based on Redux filters
  const filteredUniversities = universityRows.filter((uni) => {
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
    dispatch(setSelectedUniversities(ids));
  };

  const selectedIds = selectedUniversities;
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

        {loading ? (
          <div className="mb-8 rounded-xl bg-surface-container-low p-6 text-center text-on-surface-variant">
            Loading universities from Hipolabs...
          </div>
        ) : error ? (
          <div className="mb-8 rounded-xl border border-error/20 bg-error/5 p-4 text-error">
            {error}
          </div>
        ) : null}

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
