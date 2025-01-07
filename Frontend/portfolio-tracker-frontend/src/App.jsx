import React, { useState, useEffect } from 'react';
import { Container, CssBaseline } from '@mui/material';
import { fetchStocks, fetchPortfolioValue } from './api/StockServices';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import StockForm from './components/StockForm';
import StockList from './components/StockList';

const App = () => {
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
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
    setShowAuth(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    setUser(null);
    setStocks([]);
    setTotalValue(0);
    setShowAuth(false);
  };

  if (!user) {
    if (showAuth) {
      return <AuthPage onLoginSuccess={handleLoginSuccess} />;
    }
    return <LandingPage onGetStarted={() => setShowAuth(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CssBaseline />
      <Container maxWidth="lg">
        <div className="py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome, {user.username}!
            </h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
          
          <Dashboard totalValue={totalValue} userId={user.id} />
          <div className="mt-8">
            <StockForm fetchStocks={fetchAllData} userId={user.id} />
          </div>
          <div className="mt-8">
            <StockList stocks={stocks} fetchStocks={fetchAllData} userId={user.id} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default App;