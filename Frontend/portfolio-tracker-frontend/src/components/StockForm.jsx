import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, X, DollarSign, Hash, BarChart2, Building } from 'lucide-react';
import { addStock } from '../api/StockServices';


const StockForm = ({ fetchStocks }) => {
  const [stock, setStock] = useState({ name: '', ticker: '', quantity: '', buyPrice: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => setStock({ ...stock, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addStock(stock);
      fetchStocks();
      setStock({ name: '', ticker: '', quantity: '', buyPrice: '' });
    } catch (error) {
      console.error("Error adding stock:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Stock</h2>
        <motion.button
          whileHover={{ rotate: 90 }}
          onClick={() => setStock({ name: '', ticker: '', quantity: '', buyPrice: '' })}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X className="w-5 h-5" />
        </motion.button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Building className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="name"
              value={stock.name}
              onChange={handleChange}
              placeholder="Stock Name"
              required
              className="pl-10 w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Hash className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="ticker"
              value={stock.ticker}
              onChange={handleChange}
              placeholder="Ticker Symbol"
              required
              className="pl-10 w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <BarChart2 className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              name="quantity"
              value={stock.quantity}
              onChange={handleChange}
              placeholder="Quantity"
              required
              className="pl-10 w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              name="buyPrice"
              value={stock.buyPrice}
              onChange={handleChange}
              placeholder="Buy Price"
              required
              className="pl-10 w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PlusCircle className="w-5 h-5" />
          <span>{isSubmitting ? 'Adding...' : 'Add Stock'}</span>
        </motion.button>
      </form>
    </motion.div>
  );
};

export default StockForm;