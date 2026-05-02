import { useState, useEffect } from 'react';
import MainNavbar from '../components/Layout/MainNavbar';
import ScholarshipCard from '../components/Scholarships/ScholarshipCard';
import { fetchScholarships } from '../services/scholarshipService';
import { toast } from 'react-toastify';

export default function ScholarshipsPage() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [search, setSearch] = useState('');
  const [degree, setDegree] = useState('');
  const [country, setCountry] = useState('');
  const [stemOnly, setStemOnly] = useState(true);

  const loadScholarships = async () => {
    try {
      setLoading(true);
      const data = await fetchScholarships({ search, degree, country, stemOnly });
      setScholarships(data);
    } catch (error) {
      toast.error('Failed to load scholarships');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadScholarships();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [degree, country, stemOnly]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadScholarships();
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <MainNavbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-28 md:pb-12 w-full">
        {/* Header Area */}
        <header className="mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-on-surface tracking-tight leading-none mb-4">
              Scholarship Finder
            </h1>
            <p className="text-on-surface-variant text-lg max-w-2xl">
              Discover fully-funded grants and STEM-specific scholarships to reduce your total education loan. We've curated the best international opportunities for you.
            </p>
          </div>
          <div className="bg-primary/10 px-6 py-4 rounded-2xl border border-primary/20 flex-shrink-0">
            <span className="block text-primary text-sm font-bold uppercase tracking-wider mb-1">Total Available</span>
            <span className="text-3xl font-black text-primary">{scholarships.length}</span>
          </div>
        </header>

        {/* Filters Section */}
        <section className="mb-12 bg-surface-container-low p-4 sm:p-6 rounded-3xl border border-outline-variant/10 shadow-sm">
          <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-grow w-full">
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2 ml-1">Search Keywords</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant">search</span>
                <input 
                  type="text" 
                  placeholder="e.g. Google, Fulbright, Women in Tech" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded-xl pl-12 pr-4 py-3 outline-none focus:border-primary transition-all text-on-surface"
                />
              </div>
            </div>
            
            <div className="w-full md:w-48">
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2 ml-1">Degree Level</label>
              <select 
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 outline-none focus:border-primary transition-all text-on-surface appearance-none font-medium"
              >
                <option value="">All Degrees</option>
                <option value="Bachelors">Bachelors</option>
                <option value="Masters">Masters</option>
                <option value="PhD">PhD</option>
              </select>
            </div>

            <div className="w-full md:w-48">
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2 ml-1">Target Country</label>
              <select 
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 outline-none focus:border-primary transition-all text-on-surface appearance-none font-medium"
              >
                <option value="">Any Country</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Canada">Canada</option>
                <option value="Germany">Germany</option>
              </select>
            </div>

            <button type="submit" className="w-full md:w-auto px-8 py-3 bg-secondary text-on-secondary font-bold rounded-xl hover:bg-secondary-container hover:text-on-secondary-container transition-all shadow-md active:scale-95">
              Filter
            </button>
          </form>

          {/* Quick Toggles */}
          <div className="mt-6 flex flex-wrap gap-4 pt-4 border-t border-outline-variant/10">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className={`w-12 h-6 rounded-full transition-colors relative ${stemOnly ? 'bg-primary' : 'bg-surface-container-highest'}`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${stemOnly ? 'left-7' : 'left-1'}`}></div>
              </div>
              <span className="text-sm font-bold text-on-surface select-none group-hover:text-primary transition-colors">STEM Focused Only</span>
              <input type="checkbox" className="hidden" checked={stemOnly} onChange={() => setStemOnly(!stemOnly)} />
            </label>
          </div>
        </section>

        {/* Results Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          </div>
        ) : scholarships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-500">
            {scholarships.map(scholarship => (
              <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-surface-container-lowest rounded-3xl border border-outline-variant/20 border-dashed">
            <span className="material-symbols-outlined text-6xl text-on-surface-variant/50 mb-4">search_off</span>
            <h3 className="text-xl font-bold text-on-surface mb-2">No scholarships found</h3>
            <p className="text-on-surface-variant max-w-md mx-auto">Try adjusting your filters or expanding your search criteria to discover more opportunities.</p>
            <button 
              onClick={() => { setSearch(''); setDegree(''); setCountry(''); setStemOnly(false); loadScholarships(); }}
              className="mt-6 px-6 py-2 bg-primary/10 text-primary font-bold rounded-lg hover:bg-primary/20 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
