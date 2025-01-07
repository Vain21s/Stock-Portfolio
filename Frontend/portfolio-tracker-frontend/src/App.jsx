import React, { useState, useEffect } from 'react';
import { Container, CssBaseline } from '@mui/material';
import { fetchStocks, fetchPortfolioValue } from './api/StockServices';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import StockForm from './components/StockForm';
import StockList from './components/StockList';
import ThreeDScene from './components/ThreeDScene';

const App = () => {
  const [user, setUser] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  // Check for existing login
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    if (userId && username) {
      setUser({ id: userId, username });
    }
  }, []);

  const fetchAllData = async () => {
    if (!user) return;
    
    try {
      const stocksData = await fetchStocks(user.id);
      setStocks(stocksData);
      
      const portfolioValueData = await fetchPortfolioValue(user.id);
      setTotalValue(portfolioValueData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchAllData();
    }
  }, [user]);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    setUser(null);
    setStocks([]);
    setTotalValue(0);
  };

  if (!user) {
    return <AuthPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <Container maxWidth="lg">
      <CssBaseline />
      <div className="py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Welcome, {user.username}!</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
      <Dashboard totalValue={totalValue} userId={user.id} />
      <StockForm fetchStocks={fetchAllData} userId={user.id} />
      <StockList stocks={stocks} fetchStocks={fetchAllData} userId={user.id} />
      <ThreeDScene />
    </Container>
  );
};

export default App;