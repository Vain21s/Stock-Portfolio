import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, TrendingUp, TrendingDown } from 'lucide-react';

import { deleteStock } from '../api/StockServices'; 

const StockList = ({ stocks, fetchStocks }) => {
  const handleDelete = async (id) => {
    try {
      await deleteStock(id);
      fetchStocks();
    } catch (error) {
      console.error("Error deleting stock:", error);
    }
  };

  if (!stocks.length) {
    return (
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
        <p className="text-sm text-blue-700">
          No stocks in your portfolio. Add some stocks to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {stocks.map(stock => (
          <motion.div
            key={stock.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            layout
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{stock.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stock.ticker}</p>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200"
                  onClick={() => handleDelete(stock.id)}
                >
                  <Trash2 className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Quantity</p>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">{stock.quantity}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Buy Price</p>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">${stock.buyPrice}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Value</p>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    ${(stock.quantity * stock.buyPrice).toLocaleString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Performance</p>
                  <div className="flex items-center space-x-1">
                    {Math.random() > 0.5 ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-lg font-medium ${Math.random() > 0.5 ? 'text-green-500' : 'text-red-500'}`}>
                      {(Math.random() * 10).toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default StockList;