import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTargetCurrency } from '../../features/currency/currencySlice';

export default function CurrencyToggle() {
  const dispatch = useDispatch();
  const { targetCurrency } = useSelector((state) => state.currency);

  const currencies = [
    { code: 'USD', symbol: '$', label: 'USD' },
    { code: 'INR', symbol: '₹', label: 'INR' },
  ];

  return (
    <div className="flex items-center p-1 bg-surface-container-highest rounded-xl border border-outline-variant/10">
      {currencies.map((curr) => (
        <button
          key={curr.code}
          onClick={() => dispatch(setTargetCurrency(curr.code))}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            targetCurrency === curr.code
              ? 'bg-primary text-on-primary shadow-sm'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          <span>{curr.symbol}</span>
          <span className="hidden sm:inline">{curr.label}</span>
        </button>
      ))}
    </div>
  );
}
