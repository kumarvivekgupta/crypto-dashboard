// components/CryptoList.tsx
import React from "react";

interface CryptoListProps {
  cryptos: any[];
  currency: string;
}

const CryptoList: React.FC<CryptoListProps> = ({ cryptos,currency }) => {
  return (
    <ul>
      {cryptos.map((crypto) => (
        <li key={crypto.id} className="flex flex-row gap-2">
           
           <img className="w-5" src={crypto.image} /> {crypto.name} ({crypto.symbol.toUpperCase()}) - {crypto.current_price} {currency}
        </li>
      ))}
    </ul>
  );
};

export default CryptoList;
