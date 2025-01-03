import React, { useEffect, useState } from 'react';
import { Container, CssBaseline } from '@mui/material';
import { fetchStocks, fetchPortfolioValue } from './api/StockServices'; // Correct path
import Dashboard from './components/Dashboard';
import StockForm from './components/StockForm';
import StockList from './components/StockList';
import ThreeDScene from './components/ThreeDScene';

const App = () => {
  const [stocks, setStocks] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  const fetchAllData = async () => {
    const stocksData = await fetchStocks();
    setStocks(stocksData);
    
    const portfolioValueData = await fetchPortfolioValue();
    setTotalValue(portfolioValueData);
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <Container maxWidth="lg">
      <CssBaseline />
      <Dashboard totalValue={totalValue} />
      <StockForm fetchStocks={fetchAllData} />
      <StockList stocks={stocks} fetchStocks={fetchAllData} />
      <ThreeDScene />
    </Container>
  );
};

export default App;
