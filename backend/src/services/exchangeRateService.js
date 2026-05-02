const axios = require('axios');

/**
 * Fetch latest exchange rates for a base currency
 * @param {string} base - Base currency code (default: USD)
 */
exports.getExchangeRates = async (base = 'USD') => {
  try {
    // Using a free API for demonstration
    const response = await axios.get(`https://open.er-api.com/v6/latest/${base}`);

    if (response.data && response.data.result === 'success') {
      return {
        success: true,
        base: response.data.base_code,
        rates: response.data.rates,
        lastUpdate: response.data.time_last_update_utc,
      };
    } else {
      throw new Error('Failed to fetch exchange rates');
    }
  } catch (error) {
    console.error('Exchange Rate Service Error:', error.message);
    return {
      success: false,
      message: error.message,
    };
  }
};

/**
 * Convert an amount between two currencies
 */
exports.convertCurrency = async (amount, from, to) => {
  try {
    const ratesData = await this.getExchangeRates(from);
    if (ratesData.success) {
      const rate = ratesData.rates[to];
      if (rate) {
        return {
          success: true,
          amount: amount * rate,
          rate,
        };
      }
    }
    throw new Error(`Conversion rate from ${from} to ${to} not found`);
  } catch (error) {
    console.error('Currency Conversion Error:', error.message);
    return {
      success: false,
      message: error.message,
    };
  }
};
