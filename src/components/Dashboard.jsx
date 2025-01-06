import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchRealTimePortfolioValue } from '../api/StockServices';

const Dashboard = ({ totalValue = 0 }) => {
  const [realTimeValue, setRealTimeValue] = useState(totalValue);
  const [isLoading, setIsLoading] = useState(false);
  const [historicalData, setHistoricalData] = useState([]);

  const updateHistoricalData = (newValue) => {
    const now = new Date();
    setHistoricalData(prev => {
      // Keep only last 4 entries and add new value
      const newData = [...prev.slice(-4), {
        time: 'Now',
        value: newValue
      }];
      
      // Update time labels
      return newData.map((item, index) => ({
        ...item,
        time: index === newData.length - 1 ? 'Now' : 
              `${(newData.length - 1 - index) * 15}m ago`
      }));
    });
  };

  const getRealTimeValue = async () => {
    setIsLoading(true);
    try {
      const value = await fetchRealTimePortfolioValue();
      setRealTimeValue(Number(value) || 0);
      updateHistoricalData(Number(value) || 0);
    } catch (error) {
      console.error("Error fetching real-time portfolio value:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initialize historical data with current total value
    setHistoricalData([
      { time: '1h ago', value: totalValue },
      { time: '45m ago', value: totalValue },
      { time: '30m ago', value: totalValue },
      { time: '15m ago', value: totalValue },
      { time: 'Now', value: totalValue }
    ]);

    // Initial fetch
    getRealTimeValue();

    // Set up interval for real-time updates
    const intervalId = setInterval(getRealTimeValue, 60000); // Every minute
    return () => clearInterval(intervalId);
  }, [totalValue]);

  const valueChange = realTimeValue - totalValue;
  const percentageChange = totalValue ? ((valueChange / totalValue) * 100).toFixed(2) : '0.00';

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Portfolio Dashboard</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">Base Portfolio Value</p>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                ${totalValue.toLocaleString()}
              </h2>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">Real-Time Value</p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={getRealTimeValue}
                  disabled={isLoading}
                >
                  <RefreshCw 
                    className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`}
                  />
                </motion.button>
              </div>
              <div className="flex items-center space-x-2">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${realTimeValue.toLocaleString()}
                </h2>
                <div className={`flex items-center ${valueChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {valueChange >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                  <span className="text-sm font-medium">{percentageChange}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis 
                  dataKey="time" 
                  className="text-xs"
                  stroke="#9CA3AF"
                />
                <YAxis 
                  className="text-xs"
                  domain={['auto', 'auto']}
                  stroke="#9CA3AF"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgb(31 41 55)',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: 'white'
                  }}
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Value']}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#6366f1"
                  strokeWidth={2}
                  dot={{ strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;