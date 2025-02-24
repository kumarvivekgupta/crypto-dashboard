
import React, { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  cryptocurrencies:any[];
}



const SearchBar: React.FC<SearchBarProps> = ({ onSearch,cryptocurrencies }) => {
  const [query, setQuery] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (query) {
      const matches = cryptocurrencies.filter((crypto) =>
        crypto.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredOptions(matches);
      setShowDropdown(matches.length > 0);
    } else {
      setShowDropdown(false);
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() !== "") {
      onSearch(query);
      setQuery("");
      setShowDropdown(false);
    }
  };

  const handleSelect = (crypto: any) => {
    setQuery(crypto.name);
   // onSearch(crypto.name);
    setShowDropdown(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => (prev < filteredOptions.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      handleSelect(filteredOptions[selectedIndex]);
    }
  };

  return (
    <div className="relative w-72">
      <form onSubmit={handleSearch} className="flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for a cryptocurrency"
          className="px-6 py-3 w-72 border border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-blue-500"
        />
        <button
          type="submit"
          className="ml-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full hover:bg-blue-600 focus:outline-none transition-all"
        >
          Search
        </button>
      </form>

      {/* Autocomplete Dropdown */}
      {showDropdown && (
        <ul className="absolute left-0 mt-2 w-full bg-white border border-gray-300 shadow-lg rounded-md max-h-40 overflow-y-auto">
          {filteredOptions.map((crypto, index) => (
            <li
              key={crypto.name}
              onClick={() => handleSelect(crypto)}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-200 text-blue-500 ${
                index === selectedIndex ? "bg-gray-300" : ""
              }`}
            >
              {crypto.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;

