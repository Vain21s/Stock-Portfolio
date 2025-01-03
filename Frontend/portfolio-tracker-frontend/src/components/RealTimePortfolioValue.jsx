import React, { useEffect, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import { fetchRealTimePortfolioValue } from '../api/StockServices';

const RealTimePortfolioValue = () => {
  const [realTimeValue, setRealTimeValue] = useState(0);
  
  const getRealTimeValue = async () => {
    try {
      const value = await fetchRealTimePortfolioValue();
      setRealTimeValue(value);
    } catch (error) {
      console.error("Error fetching real-time portfolio value:", error);
    }
  };

  useEffect(() => {
    getRealTimeValue();
    const intervalId = setInterval(getRealTimeValue, 60000); // Fetch every minute

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

 
};


export default RealTimePortfolioValue;
