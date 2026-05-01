const UNIVERSITY_API_BASE_URL =
	import.meta.env.VITE_UNIVERSITY_API_BASE_URL || 'http://universities.hipolabs.com/search';

export const DEFAULT_COMPARE_COUNTRIES = ['United States', 'Canada', 'United Kingdom', 'Australia', 'India'];

const COUNTRY_PROFILES = {
	'United States': {
		degree: 'Computer Science',
		program: 'MS in Computer Science',
		tuition: 82000,
		living: 38000,
		misc: 5000,
		startingSalary: 165000,
		interestRate: 8.45,
		visaTitle: 'Visa Details (USA - F1)',
		visaDescription:
			'36-month OPT STEM extension available. High likelihood of H1-B sponsorship from major tech hubs.',
	},
	India: {
		degree: 'Computer Science',
		program: 'M.Tech in Computer Science',
		tuition: 15000,
		living: 8000,
		misc: 2000,
		startingSalary: 35000,
		interestRate: 9.5,
		visaTitle: 'Domestic Profile',
		visaDescription:
			'No visa required for domestic students. Placements driven largely through campus recruitment cells.',
	},
	Canada: {
		degree: 'Computer Science',
		program: 'MSc in Applied Computing',
		tuition: 45000,
		living: 28000,
		misc: 5000,
		startingSalary: 115000,
		interestRate: 7.25,
		visaTitle: 'Visa Details (Canada - PGWP)',
		visaDescription:
			'Eligible for a post-graduation work permit with a clear path to long-term residency for skilled workers.',
	},
	'United Kingdom': {
		degree: 'AI & ML',
		program: 'MPhil in Advanced Computer Science',
		tuition: 55000,
		living: 35000,
		misc: 5000,
		startingSalary: 130000,
		interestRate: 7.75,
		visaTitle: 'Visa Details (UK - Graduate Route)',
		visaDescription:
			'Graduate route post-study visa with routes toward skilled worker sponsorship in technology roles.',
	},
	Australia: {
		degree: 'Data Science',
		program: 'Master of Information Technology',
		tuition: 60000,
		living: 32000,
		misc: 5000,
		startingSalary: 125000,
		interestRate: 7.9,
		visaTitle: 'Visa Details (Australia - Temporary Graduate)',
		visaDescription:
			'Post-study work rights available with strong demand for graduates in technology and analytics roles.',
	},
	default: {
		degree: 'Computer Science',
		program: 'MS in Computer Science',
		tuition: 70000,
		living: 30000,
		misc: 5000,
		startingSalary: 120000,
		interestRate: 8,
		visaTitle: 'Visa Details',
		visaDescription: 'Country-specific post-study work guidance varies by destination.',
	},
};

const FALLBACK_UNIVERSITIES = [
	{
		id: 'stanford-university-stanford-edu',
		name: 'Stanford University',
		country: 'United States',
		degree: 'Computer Science',
		program: 'MS in Computer Science',
		logo: 'https://logo.clearbit.com/stanford.edu',
		webPages: ['https://www.stanford.edu'],
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
		source: 'fallback',
	},
	{
		id: 'iit-delhi-iitd-ac-in',
		name: 'Indian Institute of Technology Delhi',
		country: 'India',
		degree: 'Computer Science',
		program: 'M.Tech in Computer Science',
		logo: 'https://logo.clearbit.com/iitd.ac.in',
		webPages: ['https://www.iitd.ac.in'],
		totalCost: 14000,
		costBreakdown: {
			tuition: 7000,
			living: 5000,
			misc: 2000,
		},
		costPercentages: {
			tuition: 50,
			living: 36,
			misc: 14,
		},
		roi: {
			startingSalary: 36000,
			breakEvenPeriod: '0.4 Years',
			tenYearProjection: 360000,
			projectionPercentage: 88,
		},
		loan: {
			interestRate: 9.5,
			monthlyEMI: 140,
			totalRepayment: 16800,
		},
		visa: {
			title: 'Domestic Profile',
			icon: 'home',
			description:
				'No visa required for domestic students. Campus placements are strong in core tech companies.',
		},
		source: 'fallback',
	},
	{
		id: 'iit-madras-iitm-ac-in',
		name: 'Indian Institute of Technology Madras',
		country: 'India',
		degree: 'Computer Science',
		program: 'M.Tech in Computer Science',
		logo: 'https://logo.clearbit.com/iitm.ac.in',
		webPages: ['https://www.iitm.ac.in'],
		totalCost: 14500,
		costBreakdown: {
			tuition: 7500,
			living: 5500,
			misc: 1500,
		},
		costPercentages: {
			tuition: 52,
			living: 38,
			misc: 10,
		},
		roi: {
			startingSalary: 37000,
			breakEvenPeriod: '0.4 Years',
			tenYearProjection: 370000,
			projectionPercentage: 89,
		},
		loan: {
			interestRate: 9.5,
			monthlyEMI: 145,
			totalRepayment: 17400,
		},
		visa: {
			title: 'Domestic Profile',
			icon: 'home',
			description:
				'No visa required for domestic students. IIT Madras has a strong placement network for tech roles.',
		},
		source: 'fallback',
	},
	{
		id: 'iisc-bangalore-iisc-ac-in',
		name: 'Indian Institute of Science, Bangalore',
		country: 'India',
		degree: 'Computer Science',
		program: 'M.Tech in Computer Science',
		logo: 'https://logo.clearbit.com/iisc.ac.in',
		webPages: ['https://www.iisc.ac.in'],
		totalCost: 16000,
		costBreakdown: {
			tuition: 9000,
			living: 6000,
			misc: 1000,
		},
		costPercentages: {
			tuition: 56,
			living: 38,
			misc: 6,
		},
		roi: {
			startingSalary: 38000,
			breakEvenPeriod: '0.4 Years',
			tenYearProjection: 380000,
			projectionPercentage: 90,
		},
		loan: {
			interestRate: 9.5,
			monthlyEMI: 160,
			totalRepayment: 19200,
		},
		visa: {
			title: 'Domestic Profile',
			icon: 'home',
			description:
				'No visa required for domestic students. IISc has research-led placements and strong industry ties.',
		},
		source: 'fallback',
	},
	{
		id: 'bits-pilani-bits-pilani-ac-in',
		name: 'BITS Pilani',
		country: 'India',
		degree: 'Computer Science',
		program: 'M.E. in Computer Science',
		logo: 'https://logo.clearbit.com/bits-pilani.ac.in',
		webPages: ['https://www.bits-pilani.ac.in'],
		totalCost: 22000,
		costBreakdown: {
			tuition: 12000,
			living: 8000,
			misc: 2000,
		},
		costPercentages: {
			tuition: 55,
			living: 36,
			misc: 9,
		},
		roi: {
			startingSalary: 32000,
			breakEvenPeriod: '0.7 Years',
			tenYearProjection: 320000,
			projectionPercentage: 78,
		},
		loan: {
			interestRate: 9.5,
			monthlyEMI: 200,
			totalRepayment: 26400,
		},
		visa: {
			title: 'Domestic Profile',
			icon: 'home',
			description:
				'No visa required for domestic students. BITS Pilani has strong alumni placement links.',
		},
		source: 'fallback',
	},
	{
		id: 'university-of-toronto-utoronto-ca',
		name: 'University of Toronto',
		country: 'Canada',
		degree: 'Computer Science',
		program: 'MSc in Applied Computing',
		logo: 'https://logo.clearbit.com/utoronto.ca',
		webPages: ['https://www.utoronto.ca'],
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
				'Eligible for a 3-year Post-Graduation Work Permit with a strong pathway toward Permanent Residency.',
		},
		source: 'fallback',
	},
	{
		id: 'mit-mit-edu',
		name: 'MIT',
		country: 'United States',
		degree: 'AI & ML',
		program: 'MS in Computer Science (AI)',
		logo: 'https://logo.clearbit.com/mit.edu',
		webPages: ['https://www.mit.edu'],
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
				'STEM OPT extension provides extended work authorization and strong sponsorship prospects for AI/ML roles.',
		},
		source: 'fallback',
	},
	{
		id: 'university-of-cambridge-cam-ac-uk',
		name: 'University of Cambridge',
		country: 'United Kingdom',
		degree: 'AI & ML',
		program: 'MPhil in Advanced Computer Science',
		logo: 'https://logo.clearbit.com/cam.ac.uk',
		webPages: ['https://www.cam.ac.uk'],
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
				'Two-year graduate visa with a pathway to skilled work sponsorship for technology graduates.',
		},
		source: 'fallback',
	},
	{
		id: 'iit-bombay-iitb-ac-in',
		name: 'Indian Institute of Technology Bombay',
		country: 'India',
		degree: 'Computer Science',
		program: 'M.Tech in Computer Science',
		logo: 'https://logo.clearbit.com/iitb.ac.in',
		webPages: ['https://www.iitb.ac.in'],
		totalCost: 15000,
		costBreakdown: {
			tuition: 8000,
			living: 5000,
			misc: 2000,
		},
		costPercentages: {
			tuition: 53,
			living: 33,
			misc: 14,
		},
		roi: {
			startingSalary: 35000,
			breakEvenPeriod: '0.4 Years',
			tenYearProjection: 350000,
			projectionPercentage: 90,
		},
		loan: {
			interestRate: 9.5,
			monthlyEMI: 150,
			totalRepayment: 18000,
		},
		visa: {
			title: 'Domestic Profile',
			icon: 'home',
			description:
				'No visa required for domestic students. Placements driven largely through campus recruitment cells.',
		},
		source: 'fallback',
	},
];

const DEFAULT_LIMIT_PER_COUNTRY = 20;

function getCountryProfile(country) {
	return COUNTRY_PROFILES[country] || COUNTRY_PROFILES.default;
}

function safeCurrencyValue(value) {
	return Number.isFinite(Number(value)) ? Number(value) : 0;
}

function buildMetrics(country) {
	const profile = getCountryProfile(country);
	const totalCost = profile.tuition + profile.living + profile.misc;
	const breakEvenYears = Math.max(1.8, Math.min(4.5, totalCost / (profile.startingSalary * 0.42)));
	const projectionPercentage = Math.max(55, Math.min(95, Math.round((profile.startingSalary / totalCost) * 1000)));

	return {
		totalCost,
		costBreakdown: {
			tuition: profile.tuition,
			living: profile.living,
			misc: profile.misc,
		},
		costPercentages: {
			tuition: Math.round((profile.tuition / totalCost) * 100),
			living: Math.round((profile.living / totalCost) * 100),
			misc: Math.max(1, 100 - Math.round((profile.tuition / totalCost) * 100) - Math.round((profile.living / totalCost) * 100)),
		},
		roi: {
			startingSalary: profile.startingSalary,
			breakEvenPeriod: `${breakEvenYears.toFixed(1)} Years`,
			tenYearProjection: Math.round(profile.startingSalary * 10 * 1.1),
			projectionPercentage,
		},
		loan: {
			interestRate: profile.interestRate,
			monthlyEMI: Math.round(totalCost / 120),
			totalRepayment: Math.round(totalCost * 1.2),
		},
		visa: {
			title: profile.visaTitle,
			icon: 'travel_explore',
			description: profile.visaDescription,
		},
	};
}

function buildLogo(rawUniversity) {
	const domain = rawUniversity?.domains?.[0];

	if (domain) {
		// Google Favicon service is often more reliable for academic domains than Clearbit
		return `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;
	}

	const label = encodeURIComponent(rawUniversity?.name || 'U');
	// Use UI-Avatars for a nicer colored placeholder with initials
	return `https://ui-avatars.com/api/?name=${label}&background=random&color=fff&size=128`;
}

function buildUniversityRecord(rawUniversity, index) {
	const country = rawUniversity?.country || 'Unknown';
	const profile = getCountryProfile(country);
	const metrics = buildMetrics(country);

	return {
		id: rawUniversity?.domains?.[0]
			? `${rawUniversity.name}-${rawUniversity.domains[0]}`
			: `${rawUniversity?.name || 'university'}-${country}-${index}`,
		name: rawUniversity?.name || 'Unnamed University',
		country,
		state: rawUniversity?.['state-province'] || '',
		degree: profile.degree,
		program: profile.program,
		logo: buildLogo(rawUniversity),
		webPages: Array.isArray(rawUniversity?.web_pages) ? rawUniversity.web_pages : [],
		source: 'hipolabs',
		...metrics,
	};
}

function matchesQuery(university, searchTerm, allowedCountries) {
	const term = searchTerm.trim().toLowerCase();
	const countryAllowed =
		!allowedCountries?.length || allowedCountries.includes(university.country);

	if (!countryAllowed) {
		return false;
	}

	if (!term) {
		return true;
	}

	return [university.name, university.country, university.program, university.degree]
		.filter(Boolean)
		.some((value) => value.toLowerCase().includes(term));
}

function filterFallbackUniversities({ searchTerm = '', countries = DEFAULT_COMPARE_COUNTRIES } = {}) {
	return FALLBACK_UNIVERSITIES.filter((university) => matchesQuery(university, searchTerm, countries));
}

async function fetchHipolabsUniversities({ searchTerm = '', countries = DEFAULT_COMPARE_COUNTRIES, limitPerCountry = DEFAULT_LIMIT_PER_COUNTRY } = {}) {
	const queries = countries.map(async (country) => {
		const url = new URL(UNIVERSITY_API_BASE_URL);

		if (searchTerm.trim()) {
			url.searchParams.set('name', searchTerm.trim());
		}

		url.searchParams.set('country', country);

		const response = await fetch(url.toString());

		if (!response.ok) {
			throw new Error(`University lookup failed for ${country}`);
		}

		const data = await response.json();

		return (Array.isArray(data) ? data : [])
			.slice(0, limitPerCountry)
			.map((item, index) => buildUniversityRecord(item, index));
	});

	const nestedResults = await Promise.all(queries);
	const deduped = new Map();

	nestedResults.flat().forEach((university) => {
		const key = university.id || `${university.name}-${university.country}`;
		if (!deduped.has(key)) {
			deduped.set(key, university);
		}
	});

	return Array.from(deduped.values());
}

export async function loadCompareUniversities(options = {}) {
	try {
		const universities = await fetchHipolabsUniversities(options);

		if (universities.length > 0) {
			return universities;
		}

		return filterFallbackUniversities(options);
	} catch {
		return filterFallbackUniversities(options);
	}
}

export { FALLBACK_UNIVERSITIES };
