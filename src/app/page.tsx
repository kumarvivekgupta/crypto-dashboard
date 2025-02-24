"use client";
import { useEffect, useState } from "react";
import { getTopCryptos, getCryptoDetails } from "../utils/api";
import SearchBar from "../components/SearchBar";
import CryptoList from "../components/CryptoList";
import CryptoDetail from "../components/CryptoDetail";
import CurrencySelector from "../components/CurrencySelector";
import RecentSearches from "../components/RecentSearches";

const RECENT_SEARCHES_KEY = "recent_searches";

const Home = () => {
  const [cryptos, setCryptos] = useState<any[]>([]);
  const [selectedCrypto, setSelectedCrypto] = useState<any | null>(null);
  const [currency, setCurrency] = useState<string>("usd");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const fetchTopCryptos = async () => {
      const data = await getTopCryptos(currency);
      setCryptos(data);
    };
    fetchTopCryptos();
  }, [currency]);

  // Load recent searches from localStorage
  useEffect(() => {
    const storedSearches = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

  const handleSearch = async (query: string) => {
    const crypto = cryptos.find((c) => c.name.toLowerCase().includes(query.toLowerCase()));
    if (crypto) {
      setSelectedCrypto(await getCryptoDetails(crypto.id, currency));

      // Update recent searches
      const updatedSearches = [crypto.id, ...recentSearches.filter(id => id !== crypto.id)].slice(0, 10);
      setRecentSearches(updatedSearches);

      // Save to localStorage
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updatedSearches));
    } else {
      alert("No crypto found");
    }
  };

  const handleSelectCurrency = (newCurrency: string) => {
    setCurrency(newCurrency);
  };

  const handleSelectCrypto = async (id: string) => {
    setSelectedCrypto(await getCryptoDetails(id, currency));
  };

  return (
    <div className="container mx-auto p-4">
      <SearchBar onSearch={handleSearch} cryptocurrencies={cryptos} />
      <CurrencySelector onSelectCurrency={handleSelectCurrency} />
      <div className="grid grid-cols-3 gap-4 mt-2">
        <div className="col-span-2">
          <CryptoList cryptos={cryptos} currency={currency} />
        </div>
        <div>
          <CryptoDetail crypto={selectedCrypto} currency={currency} />
          
          <RecentSearches recentSearches={recentSearches} onClick={handleSelectCrypto} />
        </div>
      </div>
    </div>
  );
};

export default Home;
