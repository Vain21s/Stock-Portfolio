import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = ({ totalValue }) => {
  const [addedStockValue, setAddedStockValue] = useState(0); // Track the added stock value
  const [isLoading, setIsLoading] = useState(false);
  const [historicalData] = useState([
    { time: '1h ago', value: totalValue * 0.98 },
    { time: '45m ago', value: totalValue * 0.99 },
    { time: '30m ago', value: totalValue * 1.01 },
    { time: '15m ago', value: totalValue * 1.02 },
    { time: 'Now', value: totalValue }
  ]);

  const getRealTimeValue = async () => {
    setIsLoading(true);
    try {
      const value = await fetchRealTimePortfolioValue();
      setAddedStockValue(value); // Set the new stock value after fetching
    } catch (error) {
      console.error("Error fetching real-time portfolio value:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRealTimeValue();
    const intervalId = setInterval(getRealTimeValue, 60000);
    return () => clearInterval(intervalId);
  }, []);

  // Adjusted logic to track the value change based on the added stock value
  const valueChange = addedStockValue - totalValue;
  const percentageChange = ((addedStockValue - totalValue) / totalValue * 100).toFixed(2);

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
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Portfolio Value</p>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                ${totalValue.toLocaleString()}
              </h2>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">Added Stock Value</p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={getRealTimeValue}
                >
                  <RefreshCw 
                    className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`}
                  />
                </motion.button>
              </div>
              <div className="flex items-center space-x-2">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${addedStockValue.toLocaleString()}
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
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
                <XAxis 
                  dataKey="time" 
                  className="text-xs"
                />
                <YAxis 
                  className="text-xs"
                  domain={['auto', 'auto']}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgb(31 41 55)',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: 'white'
                  }}
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
