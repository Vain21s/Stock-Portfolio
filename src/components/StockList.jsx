import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { deleteStock } from '../api/StockServices';

const StockList = ({ stocks, fetchStocks }) => {
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState('');

  const handleDelete = async (stockId) => {
    try {
      setDeletingId(stockId);
      await deleteStock(stockId);
      await fetchStocks();
    } catch (error) {
      setError(`Failed to delete stock: ${error.message}`);
      setTimeout(() => setError(''), 5000); // Clear error after 5 seconds
    } finally {
      setDeletingId(null);
    }
  };

  if (!stocks.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 p-4 rounded-lg"
      >
        <p className="text-sm text-indigo-700 dark:text-indigo-300">
          Your portfolio is empty. Add some stocks to get started!
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex items-center space-x-2 text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg"
        >
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </motion.div>
      )}

      <AnimatePresence mode="popLayout">
        {stocks.map(stock => (
          <motion.div
            key={stock.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            layout
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{stock.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 uppercase">{stock.ticker}</p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors duration-200 ${
                  deletingId === stock.id ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={() => handleDelete(stock.id)}
                disabled={deletingId === stock.id}
              >
                <Trash2 className={`w-5 h-5 ${deletingId === stock.id ? 'animate-spin' : ''}`} />
              </motion.button>
            </div>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">Quantity</p>
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  {stock.quantity.toLocaleString()}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">Buy Price</p>
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  ${stock.buyPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Investment</p>
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  ${(stock.quantity * stock.buyPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">Current Value</p>
                <div className="flex items-center space-x-1">
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    ${((stock.quantity * stock.buyPrice) * (1 + (Math.random() * 0.2 - 0.1))).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      transition: { duration: 2, repeat: Infinity }
                    }}
                  >
                    {Math.random() > 0.5 ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                  </motion.div>
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