import React, { useEffect, useState } from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import { fetchRealTimePortfolioValue } from '../api/StockServices'; // Ensure this import is correct

const Dashboard = ({ totalValue }) => {
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

  return (
    <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
      <Typography variant="h4" component="h1">Portfolio Dashboard</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" component="p">Total Portfolio Value: ${totalValue}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" component="p">Real-Time Value: ${realTimeValue}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Dashboard;
