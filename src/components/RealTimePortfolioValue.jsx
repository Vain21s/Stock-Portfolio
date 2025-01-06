import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { RefreshCw, TrendingUp, TrendingDown } from 'lucide-react';

const RealTimePortfolioValue = () => {
  const [realTimeValue, setRealTimeValue] = useState(0);
  const [previousValue, setPreviousValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [realtimeData, setRealtimeData] = useState([]);

  const getRealTimeValue = async () => {
    setIsLoading(true);
    try {
      const value = await fetchRealTimePortfolioValue();
      setPreviousValue(realTimeValue);
      setRealTimeValue(value);
      
      // Add new data point
      setRealtimeData(prev => {
        const newData = [...prev, { time: new Date().toLocaleTimeString(), value }];
        return newData.slice(-20); // Keep last 20 data points
      });
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

  const valueChange = realTimeValue - previousValue;
  const percentageChange = previousValue ? ((valueChange / previousValue) * 100).toFixed(2) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Real-Time Portfolio Value</h2>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={getRealTimeValue}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={realTimeValue}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="text-center py-4"
        >
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            ${realTimeValue.toLocaleString()}
          </div>
          
          <div className="flex items-center justify-center mt-2 space-x-2">
            {valueChange !== 0 && (
              <>
                {valueChange > 0 ? (
                  <TrendingUp className="w-5 h-5 text-green-500" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-500" />
                )}
                <span className={`font-medium ${valueChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {percentageChange}%
                </span>
              </>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="h-[200px] mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={realtimeData}>
            <YAxis domain={['auto', 'auto']} hide />
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
              dot={false}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default RealTimePortfolioValue;
