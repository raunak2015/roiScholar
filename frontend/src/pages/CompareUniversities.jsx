import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MainNavbar from '../components/Layout/MainNavbar';
import Footer from '../components/Layout/Footer';
import UniversityFilterPanel from '../components/Compare/UniversityFilterPanel';
import ComparisonTable from '../components/Compare/ComparisonTable';
import { loadCompareUniversities, DEFAULT_COMPARE_COUNTRIES } from '../services/universityService';
import { setUniversities, setSelectedUniversities, updateUniversityFilters } from '../features/university/universitySlice';
import SkeletonLoader from '../components/UI/SkeletonLoader';
import EmptyState from '../components/UI/EmptyState';

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
        <div className={`${filteredUniversities.length > 0 ? 'mb-10' : 'mb-6'} transition-all duration-300`}>
          <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">
            Compare Universities
          </h1>
          <p className="text-on-surface-variant text-lg">
            Search live university data from Hipolabs, then compare ROI and financing metrics
          </p>
        </div>

        <div className={`${filteredUniversities.length > 0 ? 'mb-8' : 'mb-4'} transition-all duration-300`}>
          <form onSubmit={handleSearchSubmit} className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
                search
              </span>
              <input
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="Search universities by name or country..."
                className="w-full rounded-xl border border-outline-variant bg-surface-container-low pl-12 pr-4 py-3.5 text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-primary px-8 py-3.5 font-bold text-on-primary shadow-sm hover:shadow-lg hover:bg-primary/90 transition-all active:scale-95"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchInput('');
                setSearchTerm('');
              }}
              className="rounded-xl bg-surface-container px-6 py-3.5 font-semibold text-on-surface hover:bg-surface-container-high transition-all"
            >
              Reset
            </button>
          </form>
        </div>

        {filteredUniversities.length > 0 && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-500">
            <UniversityFilterPanel filters={uniState.filters || {}} onFilterChange={handleFilterChange} />
          </div>
        )}

        {loading ? (
          <div className="space-y-12">
            <SkeletonLoader type="table" />
            <SkeletonLoader type="card" count={3} />
          </div>
        ) : error ? (
          <div className="mb-8 rounded-xl border border-error/20 bg-error/5 p-6 text-error flex items-center gap-4">
            <span className="material-symbols-outlined text-3xl">error</span>
            <div>
              <p className="font-bold">Error Loading Data</p>
              <p className="text-sm opacity-90">{error}</p>
            </div>
          </div>
        ) : filteredUniversities.length === 0 ? (
          <EmptyState 
            title="No Universities Found"
            description={searchTerm ? `We couldn't find any results for "${searchTerm}". Try a different university name or check your filters.` : "Start your search by typing a university name or selecting a country filter above."}
            actionLabel="Reset Search"
            onAction={() => {
              setSearchInput('');
              setSearchTerm('');
              dispatch(updateUniversityFilters({}));
            }}
          />
        ) : (
          <div className="animate-in fade-in duration-700">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-baseline gap-3">
                <h2 className="text-2xl font-bold text-primary">
                  {filteredUniversities.length} Universities Found
                </h2>
                <span className="text-sm px-2 py-0.5 bg-primary/5 text-primary rounded-full font-medium">
                  {searchTerm ? `Results for "${searchTerm}"` : 'Global Results'}
                </span>
              </div>
              <p className="text-sm text-on-surface-variant hidden md:block">
                Default countries: {DEFAULT_COMPARE_COUNTRIES.join(', ')}
              </p>
            </div>

            <ComparisonTable
              universities={filteredUniversities}
              selected={selectedUniversities}
              onSelect={(ids) => dispatch(setSelectedUniversities(ids))}
            />

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
              {filteredUniversities.map((uni) => (
                <div
                  key={uni.id}
                  onClick={() => toggleUniversity(uni.id)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${
                    selectedUniversities.includes(uni.id)
                      ? 'bg-primary text-on-primary shadow-xl ring-2 ring-primary ring-offset-2'
                      : 'bg-surface-container-low text-on-surface hover:shadow-lg border border-outline-variant/10'
                  }`}
                >
                  <div className="flex items-start gap-4 mb-5">
                    <img
                      alt={uni.name}
                      src={uni.logo}
                      className={`w-16 h-16 rounded-xl object-contain p-2 ${
                        selectedUniversities.includes(uni.id) ? 'bg-white/20' : 'bg-surface-container-highest'
                      }`}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(uni.name)}&background=random&color=fff&size=128`;
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg leading-tight mb-1">{uni.name}</h3>
                      <p
                        className={`text-sm font-medium ${
                          selectedUniversities.includes(uni.id)
                            ? 'text-on-primary/80'
                            : 'text-on-surface-variant'
                        }`}
                      >
                        {uni.program}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm border-t border-outline-variant/10 pt-4 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="opacity-70 font-medium">Location</span>
                      <span className="font-semibold">{uni.state ? `${uni.state}, ${uni.country}` : uni.country}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="opacity-70 font-medium">Total Cost</span>
                      <span className="font-bold text-lg">${Number(uni.totalCost).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="opacity-70 font-medium">Starting Salary</span>
                      <span className="font-semibold">${Number(uni.roi?.startingSalary || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="opacity-70 font-medium">Break-even</span>
                      <span className="px-2 py-0.5 bg-tertiary/10 text-tertiary rounded-md font-bold">
                        {uni.breakEvenPeriod}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <span className={`text-xs font-bold uppercase tracking-widest ${selectedUniversities.includes(uni.id) ? 'text-on-primary/70' : 'text-primary'}`}>
                      {selectedUniversities.includes(uni.id) ? 'Selected for Comparison' : 'Select to Compare'}
                    </span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      selectedUniversities.includes(uni.id) ? 'bg-white border-white text-primary' : 'border-outline-variant'
                    }`}>
                      {selectedUniversities.includes(uni.id) && <span className="material-symbols-outlined text-sm font-bold">check</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-10 duration-500">
              <div className="bg-surface-container-high/90 backdrop-blur-md p-4 rounded-3xl shadow-2xl border border-outline-variant/20 flex items-center gap-6">
                <div className="flex items-center gap-3 px-4">
                  <div className="flex -space-x-3 overflow-hidden">
                    {selectedUniversities.slice(0, 3).map((id) => {
                      const uni = universities.find(u => u.id === id);
                      return (
                        <img 
                          key={id}
                          src={uni?.logo} 
                          className="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-white object-contain p-1"
                        />
                      );
                    })}
                    {selectedUniversities.length > 3 && (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xs font-bold text-on-primary ring-2 ring-white">
                        +{selectedUniversities.length - 3}
                      </div>
                    )}
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-on-surface leading-none">{selectedUniversities.length} Selected</p>
                    <p className="text-xs text-on-surface-variant mt-1">Ready to compare</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => dispatch(setSelectedUniversities([]))}
                    className="px-6 py-3 bg-surface-container text-on-surface rounded-2xl font-bold hover:bg-surface-container-highest transition-all"
                  >
                    Clear
                  </button>
                  <button
                    onClick={handleCompare}
                    disabled={selectedUniversities.length < 2}
                    className={`px-8 py-3 rounded-2xl font-bold shadow-lg transition-all ${
                      selectedUniversities.length >= 2
                        ? 'bg-primary text-on-primary hover:scale-105 active:scale-95'
                        : 'bg-primary/50 text-on-primary/50 cursor-not-allowed'
                    }`}
                  >
                    Compare Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
