import { DEFAULT_COMPARE_COUNTRIES, FALLBACK_UNIVERSITIES } from './universityData';
import { buildUniversityRecord } from './universityHelpers';

const UNIVERSITY_API_BASE_URL =
  import.meta.env.VITE_UNIVERSITY_API_BASE_URL || 'http://universities.hipolabs.com/search';

const DEFAULT_LIMIT_PER_COUNTRY = 20;

function matchesQuery(university, searchTerm, allowedCountries) {
  const term = searchTerm.trim().toLowerCase();
  const countryAllowed = !allowedCountries?.length || allowedCountries.includes(university.country);

  if (!countryAllowed) return false;
  if (!term) return true;

  return [university.name, university.country, university.program, university.degree]
    .filter(Boolean)
    .some((value) => value.toLowerCase().includes(term));
}

async function fetchHipolabsUniversities({ searchTerm = '', countries = DEFAULT_COMPARE_COUNTRIES, limitPerCountry = DEFAULT_LIMIT_PER_COUNTRY } = {}) {
  const queries = countries.map(async (country) => {
    const url = new URL(UNIVERSITY_API_BASE_URL);
    if (searchTerm.trim()) url.searchParams.set('name', searchTerm.trim());
    url.searchParams.set('country', country);

    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(`University lookup failed for ${country}`);
    
    const data = await response.json();
    return (Array.isArray(data) ? data : [])
      .slice(0, limitPerCountry)
      .map((item, index) => buildUniversityRecord(item, index));
  });

  const nestedResults = await Promise.all(queries);
  const deduped = new Map();

  nestedResults.flat().forEach((university) => {
    const key = university.id || `${university.name}-${university.country}`;
    if (!deduped.has(key)) deduped.set(key, university);
  });

  return Array.from(deduped.values());
}

export async function loadCompareUniversities(options = {}) {
  try {
    const universities = await fetchHipolabsUniversities(options);
    return universities.length > 0 ? universities : FALLBACK_UNIVERSITIES.filter((u) => matchesQuery(u, options.searchTerm || '', options.countries || DEFAULT_COMPARE_COUNTRIES));
  } catch {
    return FALLBACK_UNIVERSITIES.filter((u) => matchesQuery(u, options.searchTerm || '', options.countries || DEFAULT_COMPARE_COUNTRIES));
  }
}

export { DEFAULT_COMPARE_COUNTRIES, FALLBACK_UNIVERSITIES };
