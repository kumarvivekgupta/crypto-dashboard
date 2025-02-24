import React from 'react';

interface CurrencySelectorProps {
  onSelectCurrency: (currency: string) => void;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ onSelectCurrency }) => {
  return (
    <select onChange={(e) => onSelectCurrency(e.target.value)} className="p-2 border rounded text-blue-500 mt-2">
      <option value="usd">USD</option>
      <option value="eur">EUR</option>
      <option value="gbp">GBP</option>
      <option value="inr">INR</option>
    </select>
  );
};

export default CurrencySelector;
