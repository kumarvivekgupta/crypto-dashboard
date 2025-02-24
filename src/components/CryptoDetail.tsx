import React from 'react';

interface CryptoDetailProps {
  crypto: any;
  currency: string;
}

const CryptoDetail: React.FC<CryptoDetailProps> = ({ crypto,currency }) => {
  if (!crypto) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold">{crypto.name} ({crypto.symbol.toUpperCase()})</h2>
      <img src={crypto.image.small} alt={crypto.name} />
      <p>Current Price: {crypto.market_data.current_price[currency]} {currency}</p>
      <p>Market Cap: {crypto.market_data.market_cap[currency]} {currency}</p>
      <p>24h Change: {crypto.market_data.price_change_percentage_24h}%</p>
    </div>
  );
};

export default CryptoDetail;
