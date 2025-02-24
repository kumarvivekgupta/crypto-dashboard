"use client"
import { useState, useEffect } from "react";
import { getTopCryptos } from "../../utils/api";
import SearchBar from "../../components/SearchBar";
import CryptoList from "@/components/CryptoList";

export default function SearchPage() {
    const [cryptos, setCryptos] = useState<any[]>([]);
    const [currency, setCurrency] = useState<string>("usd");

    useEffect(() => {
        const fetchCryptos = async () => {
            const data = await getTopCryptos(currency);
            setCryptos(data);
        };
        fetchCryptos();
    }, [currency]);

    const handleSearch = (query: string) => {
        // Implement search logic to find a crypto by name, and show results
    };

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <CryptoList cryptos={cryptos} />
        </div>
    );
}
