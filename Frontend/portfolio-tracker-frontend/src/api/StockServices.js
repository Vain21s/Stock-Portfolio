import axios from 'axios';

const API_URL = 'http://localhost:8080/stocks';

export const fetchStocks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addStock = async (stock) => {
  await axios.post(API_URL, stock);
};

export const updateStock = async (id, stock) => {
  await axios.put(`${API_URL}/${id}`, stock);
};

export const deleteStock = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const fetchPortfolioValue = async () => {
  const response = await axios.get(`${API_URL}/portfolio/value`);
  return response.data;
};

export const fetchRealTimePortfolioValue = async () => {
  const response = await axios.get(`${API_URL}/portfolio/value/realtime`);
  return response.data;
};
