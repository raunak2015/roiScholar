import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MainNavbar from '../components/Layout/MainNavbar';
import Footer from '../components/Layout/Footer';
import UniversityFilterPanel from '../components/Compare/UniversityFilterPanel';
import ComparisonTable from '../components/Compare/ComparisonTable';
import UniversitySearchForm from '../components/Compare/UniversitySearchForm';
import UniversitySelectionBar from '../components/Compare/UniversitySelectionBar';
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
        const data = await loadCompareUniversities({ searchTerm, countries: DEFAULT_COMPARE_COUNTRIES });
        if (!cancelled) dispatch(setUniversities(data));
      } catch (err) {
        if (!cancelled) setError(err?.message || 'Failed to load universities');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadUniversities();
    return () => { cancelled = true; };
  }, [dispatch, searchTerm]);

  const filteredUniversities = useMemo(() => {
    return universities.filter((uni) => {
      const countryMatch = !uniState.filters?.country?.length || uniState.filters.country.includes(uni.country);
      const degreeMatch = !uniState.filters?.degree?.length || uniState.filters.degree.includes(uni.degree);
      const tuitionMatch = !uniState.filters?.maxTuition || Number(uni.totalCost) <= Number(uniState.filters.maxTuition);
      return countryMatch && degreeMatch && tuitionMatch;
    });
  }, [uniState.filters, universities]);

  const toggleUniversity = (id) => {
    const nextSelection = selectedUniversities.includes(id)
      ? selectedUniversities.filter((uniId) => uniId !== id)
      : [...selectedUniversities, id];
    dispatch(setSelectedUniversities(nextSelection));
  };

  const handleSearchSubmit = (e) => { e.preventDefault(); setSearchTerm(searchInput.trim()); };

  const handleReset = () => {
    setSearchInput('');
    setSearchTerm('');
    dispatch(updateUniversityFilters({}));
  };

  return (
    <div className="bg-surface min-h-screen flex flex-col">
      <MainNavbar userName="JD" />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 pb-28 md:pb-12 flex-grow">
        <div className="mb-6 transition-all duration-300">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-on-surface mb-2">Compare Universities</h1>
          <p className="text-on-surface-variant text-lg">Search live university data from Hipolabs, then compare ROI and financing metrics</p>
        </div>

        <UniversitySearchForm 
          searchInput={searchInput} 
          setSearchInput={setSearchInput} 
          onSearch={handleSearchSubmit} 
          onReset={handleReset} 
        />

        {filteredUniversities.length > 0 && <UniversityFilterPanel filters={uniState.filters || {}} onFilterChange={(f) => dispatch(updateUniversityFilters(f))} />}

        {loading ? <SkeletonLoader type="table" /> : error ? (
          <div className="mb-8 rounded-xl border border-error/20 bg-error/5 p-6 text-error flex items-center gap-4">
            <span className="material-symbols-outlined text-3xl">error</span>
            <div><p className="font-bold">Error Loading Data</p><p className="text-sm opacity-90">{error}</p></div>
          </div>
        ) : filteredUniversities.length === 0 ? (
          <EmptyState title="No Universities Found" description={searchTerm ? `No results for "${searchTerm}".` : "Start your search above."} onAction={handleReset} />
        ) : (
          <div className="animate-in fade-in duration-700">
            <div className="hidden md:block">
              <ComparisonTable universities={filteredUniversities} selected={selectedUniversities} onSelect={(ids) => dispatch(setSelectedUniversities(ids))} />
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
              {filteredUniversities.map((uni) => (
                <div key={uni.id} onClick={() => toggleUniversity(uni.id)} className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${selectedUniversities.includes(uni.id) ? 'bg-primary text-on-primary shadow-xl ring-2 ring-primary ring-offset-2' : 'bg-surface-container-low text-on-surface hover:shadow-lg border border-outline-variant/10'}`}>
                  <div className="flex items-start gap-4 mb-5">
                    <img alt={uni.name} src={uni.logo} className={`w-16 h-16 rounded-xl object-contain p-2 ${selectedUniversities.includes(uni.id) ? 'bg-on-surface/10' : 'bg-surface-container-highest'}`} />
                    <div className="flex-1"><h3 className="font-bold text-lg leading-tight mb-1">{uni.name}</h3><p className={`text-sm font-medium ${selectedUniversities.includes(uni.id) ? 'text-on-surface/80' : 'text-on-surface-variant'}`}>{uni.program}</p></div>
                  </div>
                  <div className="space-y-3 text-sm border-t border-outline-variant/10 pt-4 mt-2">
                    <div className="flex justify-between items-center"><span className="opacity-70 font-medium">Location</span><span className="font-semibold">{uni.country}</span></div>
                    <div className="flex justify-between items-center"><span className="opacity-70 font-medium">Total Cost</span><span className="font-bold text-lg">${Number(uni.totalCost).toLocaleString()}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <UniversitySelectionBar 
          selectedUniversities={selectedUniversities} 
          universities={universities} 
          onClear={() => dispatch(setSelectedUniversities([]))} 
          onCompare={() => navigate('/compare-detail')} 
        />
      </main>
      <Footer />
    </div>
  );
}
