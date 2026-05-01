import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MainNavbar from '../components/Layout/MainNavbar';
import Footer from '../components/Layout/Footer';
import UniversityFilterPanel from '../components/Compare/UniversityFilterPanel';
import ComparisonTable from '../components/Compare/ComparisonTable';
import { loadCompareUniversities, DEFAULT_COMPARE_COUNTRIES } from '../services/universityService';
import { setUniversities, setSelectedUniversities, updateUniversityFilters } from '../features/university/universitySlice';

export default function CompareUniversities() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const uniState = useSelector((state) => state.university || {});
  const universities = uniState.universities || [];
  const selectedUniversities = uniState.selectedUniversities || [];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadUniversities() {
      setLoading(true);
      setError('');

      try {
        const data = await loadCompareUniversities({
          searchTerm,
          countries: DEFAULT_COMPARE_COUNTRIES,
        });

        if (!cancelled) {
          dispatch(setUniversities(data));
        }
      } catch (fetchError) {
        if (!cancelled) {
          setError(fetchError?.message || 'Failed to load universities');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadUniversities();

    return () => {
      cancelled = true;
    };
  }, [dispatch, searchTerm]);

  const filteredUniversities = useMemo(() => {
    return universities.filter((uni) => {
      const countryMatch =
        !uniState.filters?.country?.length || uniState.filters.country.includes(uni.country);
      const degreeMatch =
        !uniState.filters?.degree?.length || uniState.filters.degree.includes(uni.degree);
      const tuitionMatch =
        !uniState.filters?.maxTuition || Number(uni.totalCost) <= Number(uniState.filters.maxTuition);

      return countryMatch && degreeMatch && tuitionMatch;
    });
  }, [uniState.filters, universities]);

  const toggleUniversity = (id) => {
    const nextSelection = selectedUniversities.includes(id)
      ? selectedUniversities.filter((uniId) => uniId !== id)
      : [...selectedUniversities, id];

    dispatch(setSelectedUniversities(nextSelection));
  };

  const handleCompare = () => {
    if (selectedUniversities.length >= 2) {
      navigate('/compare-detail');
    }
  };

  const handleFilterChange = (newFilters) => {
    dispatch(updateUniversityFilters(newFilters));
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchTerm(searchInput.trim());
  };

  return (
    <div className="bg-[#f9f9ff] min-h-screen flex flex-col">
      <MainNavbar userName="JD" />

      <main className="max-w-7xl mx-auto px-8 py-10 flex-grow">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">
            Compare Universities
          </h1>
          <p className="text-on-surface-variant text-lg">
            Search live university data from Hipolabs, then compare ROI and financing metrics
          </p>
        </div>

        <form onSubmit={handleSearchSubmit} className="mb-8 flex flex-col gap-3 sm:flex-row">
          <input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search universities by name or country"
            className="flex-1 rounded-lg border border-outline-variant bg-surface-container-low px-4 py-3 text-on-surface outline-none focus:border-primary"
          />
          <button
            type="submit"
            className="rounded-lg bg-primary px-6 py-3 font-semibold text-on-primary transition-all hover:shadow-lg active:scale-95"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => {
              setSearchInput('');
              setSearchTerm('');
            }}
            className="rounded-lg bg-surface-container px-6 py-3 font-semibold text-on-surface transition-all hover:bg-surface-container-high active:scale-95"
          >
            Reset
          </button>
        </form>

        <UniversityFilterPanel filters={uniState.filters || {}} onFilterChange={handleFilterChange} />

        {loading ? (
          <div className="rounded-xl bg-surface-container-low p-8 text-center text-on-surface-variant">
            Loading universities from Hipolabs...
          </div>
        ) : error ? (
          <div className="mb-8 rounded-xl border border-error/20 bg-error/5 p-4 text-error">
            {error}
          </div>
        ) : null}

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-primary">
            {filteredUniversities.length} Universities Found
          </h2>
          <p className="text-sm text-on-surface-variant">
            Default countries: {DEFAULT_COMPARE_COUNTRIES.join(', ')}
          </p>
        </div>

        <ComparisonTable
          universities={filteredUniversities}
          selected={selectedUniversities}
          onSelect={(ids) => dispatch(setSelectedUniversities(ids))}
        />

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredUniversities.map((uni) => (
            <div
              key={uni.id}
              onClick={() => toggleUniversity(uni.id)}
              className={`p-6 rounded-xl cursor-pointer transition-all ${
                selectedUniversities.includes(uni.id)
                  ? 'bg-primary text-on-primary shadow-lg ring-2 ring-primary'
                  : 'bg-surface-container-low text-on-surface hover:shadow-md'
              }`}
            >
              <div className="flex items-start gap-4 mb-4">
                <img
                  alt={uni.name}
                  src={uni.logo}
                  className="w-16 h-16 rounded-lg object-contain bg-surface-container-highest"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(uni.name)}&background=random&color=fff&size=128`;
                  }}
                />
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{uni.name}</h3>
                  <p
                    className={`text-sm ${
                      selectedUniversities.includes(uni.id)
                        ? 'opacity-80'
                        : 'text-on-surface-variant'
                    }`}
                  >
                    {uni.program}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-semibold">Location:</span> {uni.state ? `${uni.state}, ${uni.country}` : uni.country}
                </p>
                <p>
                  <span className="font-semibold">Total Cost:</span> ${Number(uni.totalCost).toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold">Starting Salary:</span> ${Number(uni.roi?.startingSalary || 0).toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold">Break-even:</span> {uni.breakEvenPeriod}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className={`text-xs font-bold uppercase tracking-widest ${selectedUniversities.includes(uni.id) ? 'opacity-70' : 'text-primary'}`}>
                  {selectedUniversities.includes(uni.id) ? 'Selected' : 'Select'}
                </span>
                <input
                  type="checkbox"
                  checked={selectedUniversities.includes(uni.id)}
                  onChange={() => toggleUniversity(uni.id)}
                  className="w-5 h-5 rounded"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleCompare}
            disabled={selectedUniversities.length < 2}
            className={`px-8 py-3 rounded-lg font-semibold transition-all ${
              selectedUniversities.length >= 2
                ? 'bg-primary text-on-primary hover:shadow-lg active:scale-95'
                : 'bg-surface-container text-on-surface-variant cursor-not-allowed opacity-50'
            }`}
          >
            Compare {selectedUniversities.length} Universities
          </button>
          <button
            onClick={() => setSelectedUniversities([])}
            className="px-8 py-3 bg-surface-container text-primary rounded-lg font-semibold hover:bg-surface-container-high transition-all active:scale-95"
          >
            Clear Selection
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
