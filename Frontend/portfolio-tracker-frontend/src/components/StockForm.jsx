import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, X, DollarSign, Hash, BarChart2, Building, AlertCircle } from 'lucide-react';
import { addStock } from '../api/StockServices';

const StockForm = ({ fetchStocks }) => {
  const [stock, setStock] = useState({ name: '', ticker: '', quantity: '', buyPrice: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStock(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user makes changes
  };

  const validateForm = () => {
    if (!stock.name.trim()) return 'Stock name is required';
    if (!stock.ticker.trim()) return 'Ticker symbol is required';
    if (!stock.quantity || Number(stock.quantity) <= 0) return 'Please enter a valid quantity';
    if (!stock.buyPrice || Number(stock.buyPrice) <= 0) return 'Please enter a valid buy price';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await addStock({
        ...stock,
        quantity: Number(stock.quantity),
        buyPrice: Number(stock.buyPrice)
      });
      await fetchStocks();
      setStock({ name: '', ticker: '', quantity: '', buyPrice: '' });
      setShowForm(false);
    } catch (error) {
      setError(error.message || 'Failed to add stock');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-6">
      {!showForm ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowForm(true)}
          className="w-full p-4 bg-indigo-50 dark:bg-indigo-900/20 border-2 border-dashed border-indigo-200 dark:border-indigo-800 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Add New Stock</span>
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Stock</h2>
            <motion.button
              whileHover={{ rotate: 90 }}
              onClick={() => setShowForm(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2 text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg"
              >
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  className="pl-10 w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                  className="pl-10 w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent uppercase"
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
                  min="1"
                  step="1"
                  className="pl-10 w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                  min="0.01"
                  step="0.01"
                  className="pl-10 w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
      )}
    </div>
  );
};

export default StockForm;