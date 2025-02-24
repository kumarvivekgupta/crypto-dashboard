import axios from 'axios';

const API_URL = 'https://api.coingecko.com/api/v3';

export const getTopCryptos = async (currency: string = 'usd') => {
  try {
    const { data } = await axios.get(`${API_URL}/coins/markets`, {
      params: {
        vs_currency: currency,
        order: 'market_cap_desc',
        per_page: 50,
        page: 1,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching top cryptocurrencies: ", error);
    throw error;
  }
};

export const getCryptoDetails = async (id: string, currency: string = 'usd') => {
  try {
    const { data } = await axios.get(`${API_URL}/coins/${id}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching cryptocurrency details: ", error);
    throw error;
  }
};
