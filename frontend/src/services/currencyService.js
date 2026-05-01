import axios from 'axios';

const BASE_URL = 'https://open.er-api.com/v6/latest'; // Free API, no key needed for public data

export const fetchLatestRates = async (baseCurrency = 'USD') => {
  try {
    const response = await axios.get(`${BASE_URL}/${baseCurrency}`);
    if (response.data && response.data.result === 'success') {
      return {
        rates: response.data.rates,
        lastUpdate: response.data.time_last_update_utc,
      };
    }
    throw new Error('Failed to fetch currency rates');
  } catch (error) {
    console.error('Currency API Error:', error);
    // Fallback rates if API is down
    return {
      rates: {
        USD: 1,
        INR: 83.5,
        GBP: 0.79,
        EUR: 0.92,
        CAD: 1.36,
      },
      lastUpdate: new Date().toUTCString(),
    };
  }
};

export const convertCurrency = (amount, rate) => {
  return (amount * rate).toFixed(2);
};

export const getCurrencySymbol = (code) => {
  const symbols = {
    USD: '$',
    INR: '₹',
    GBP: '£',
    EUR: '€',
    CAD: 'C$',
  };
  return symbols[code] || code;
};
