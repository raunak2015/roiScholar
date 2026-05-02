import { COUNTRY_PROFILES } from './universityData';

export function getCountryProfile(country) {
  return COUNTRY_PROFILES[country] || COUNTRY_PROFILES.default;
}

export function buildMetrics(country) {
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

export function buildLogo(rawUniversity) {
  const domain = rawUniversity?.domains?.[0];
  if (domain) {
    return `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;
  }
  const label = encodeURIComponent(rawUniversity?.name || 'U');
  return `https://ui-avatars.com/api/?name=${label}&background=random&color=fff&size=128`;
}

export function buildUniversityRecord(rawUniversity, index) {
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
