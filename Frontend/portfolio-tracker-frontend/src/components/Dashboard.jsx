import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchRealTimePortfolioValue } from '../api/StockServices';

const Dashboard = ({ totalValue = 0, portfolioHistory = [], userId }) => {
  const [realTimeValue, setRealTimeValue] = useState(totalValue);
  const [isLoading, setIsLoading] = useState(false);

  // Handle real-time value updates for display only
  const getRealTimeValue = async () => {
    setIsLoading(true);
    try {
      // Now using userId in the API call
      const value = await fetchRealTimePortfolioValue(userId);
      setRealTimeValue(Number(value) || 0);
    } catch (error) {
      console.error("Error fetching real-time portfolio value:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Set up real-time updates
  useEffect(() => {
    if (userId) {
      getRealTimeValue();
      const intervalId = setInterval(getRealTimeValue, 60000); // Every minute
      return () => clearInterval(intervalId);
    }
  }, [userId]);

  // Sample data for graph if no portfolio history is provided
  const graphData = portfolioHistory.length > 0 ? portfolioHistory : [
    { time: '30m ago', value: totalValue* 0.88 },
    { time: '20m ago', value: totalValue * 0.92 },
    { time: '15m ago', value: totalValue * 0.90 },
    { time: '10m ago', value: totalValue * 0.98 },
    { time: 'Now', value: totalValue }
  ];

  const valueChange = realTimeValue - totalValue;
  const percentageChange = totalValue ? ((valueChange / totalValue) * 100).toFixed(2) : '0.00';

  return (
    <div className="w-full p-4 space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <div className="bg-gray-900 rounded-lg shadow-lg p-6 w-full">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white">Portfolio Dashboard</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <p className="text-sm text-gray-400">Base Portfolio Value</p>
              <h2 className="text-4xl font-bold text-white">
                ${totalValue.toLocaleString()}
              </h2>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <p className="text-sm text-gray-400">Real-Time Value</p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1 rounded-full hover:bg-gray-800"
                  onClick={getRealTimeValue}
                  disabled={isLoading}
                >
                  <RefreshCw 
                    className={`w-4 h-4 text-gray-400 ${isLoading ? 'animate-spin' : ''}`}
                  />
                </motion.button>
              </div>
              <div className="flex items-center space-x-2">
                <h2 className="text-4xl font-bold text-white">
                  ${realTimeValue.toLocaleString()}
                </h2>
                <div className={`flex items-center ${valueChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {valueChange >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                  <span className="text-sm font-medium">{percentageChange}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="time" 
                  stroke="#9CA3AF"
                  tick={{ fill: '#9CA3AF' }}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  tick={{ fill: '#9CA3AF' }}
                  domain={['auto', 'auto']}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: 'white'
                  }}
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Value']}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#6366F1"
                  strokeWidth={2}
                  dot={{ fill: '#6366F1', strokeWidth: 2 }}
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