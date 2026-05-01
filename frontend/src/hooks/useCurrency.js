import { useSelector } from 'react-redux';
import { getCurrencySymbol, convertCurrency } from '../services/currencyService';

/**
 * useCurrency — shared hook for all currency-aware components.
 *
 * Returns:
 *  - symbol       : e.g. "₹"
 *  - code         : e.g. "INR"
 *  - convert(usdAmount) : converts from USD base to the selected currency
 *  - format(usdAmount)  : converts AND formats with symbol, e.g. "₹83,50,000"
 */
export function useCurrency() {
  const { targetCurrency, rates } = useSelector((state) => state.currency);

  const rate = rates?.[targetCurrency] ?? 1;
  const symbol = getCurrencySymbol(targetCurrency);

  const convert = (usdAmount) => {
    const num = parseFloat(usdAmount) || 0;
    return parseFloat(convertCurrency(num, rate));
  };

  const format = (usdAmount, options = {}) => {
    const converted = convert(usdAmount);
    const { decimals = 0, compact = false } = options;

    if (compact && converted >= 1_000_000) {
      return `${symbol}${(converted / 1_000_000).toFixed(1)}M`;
    }
    if (compact && converted >= 1_000) {
      return `${symbol}${(converted / 1_000).toFixed(0)}K`;
    }

    return `${symbol}${converted.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}`;
  };

  return { symbol, code: targetCurrency, rate, convert, format };
}

export default useCurrency;
