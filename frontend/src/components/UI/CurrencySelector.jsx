import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTargetCurrency, getLatestRates } from '../../features/currency/currencySlice';
import { getCurrencySymbol } from '../../services/currencyService';

const CURRENCIES = ['USD', 'INR', 'GBP', 'EUR', 'CAD'];

export default function CurrencySelector() {
  const dispatch = useDispatch();
  const { targetCurrency, baseCurrency, status } = useSelector((state) => state.currency);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getLatestRates(baseCurrency));
    }
  }, [dispatch, baseCurrency, status]);

  return (
    <div className="flex items-center gap-2 p-1 bg-surface-container rounded-xl border border-outline-variant/10 shadow-sm">
      {CURRENCIES.map((code) => (
        <button
          key={code}
          onClick={() => dispatch(setTargetCurrency(code))}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all
            ${targetCurrency === code 
              ? 'bg-primary text-on-primary shadow-md scale-105' 
              : 'text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface'}
          `}
        >
          {getCurrencySymbol(code)} {code}
        </button>
      ))}
    </div>
  );
}
