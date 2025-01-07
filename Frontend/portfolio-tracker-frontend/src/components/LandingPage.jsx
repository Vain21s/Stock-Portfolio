import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart2, PieChart, Shield } from 'lucide-react';

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="absolute top-0 w-full p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-8 w-8 text-green-500" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">StockFolio</span>
          </div>
          <button 
            onClick={onGetStarted}
            className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Sign in
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 px-4 max-w-7xl mx-auto">
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            <span className="text-green-500">Discover Your Next Investment</span>
            <br />with StockFolio:
            <br />
            <span className="text-black dark:text-white">
              Smart Portfolio Management at Your Fingertips
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Your personal portfolio tracker in Realtime.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={onGetStarted}
            className="px-8 py-4 bg-green-500 text-white rounded-full text-lg font-medium hover:bg-green-600 transition-colors shadow-lg hover:shadow-xl"
          >
            Get Started It's Free
          </motion.button>
        </div>

        {/* Animated Features Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 mb-12"
        >
          {[
            {
              icon: <BarChart2 className="h-8 w-8 text-green-500" />,
              title: "Real-time Analytics",
              description: "Track your portfolio performance with advanced analytics and insights"
            },
            {
              icon: <PieChart className="h-8 w-8 text-green-500" />,
              title: "Smart Diversification",
              description: "Provides Realtime Stock Data and Portfolio Metrics"
            },
            {
              icon: <Shield className="h-8 w-8 text-green-500" />,
              title: "CRUD Operations",
              description: "CRUD Operations allow you to manage the stocks at your Fingertips "
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.2 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                {feature.icon}
                <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 3D Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="w-full h-64 md:h-96 relative mb-20"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full max-w-2xl">
              <motion.div
                animate={{ 
                  rotateY: [0, 360],
                  rotateX: [0, 360]
                }}
                transition={{ 
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="w-32 h-32 md:w-48 md:h-48 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl shadow-2xl"
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1000px'
                }}
              />
              
              {/* Floating Numbers Animation */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    y: -100,
                    x: Math.sin(i) * 100
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5
                  }}
                  className="absolute top-1/2 left-1/2 text-2xl font-bold text-green-500"
                >
                  ${Math.floor(Math.random() * 1000)}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;