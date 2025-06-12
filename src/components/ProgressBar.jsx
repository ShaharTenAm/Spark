// ProgressBar Component for Spark: Digital Couples Connection Game
import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ progress = 0, className = "" }) => {
  return (
    <div className={`progress-bar ${className}`}>
      <motion.div
        className="progress-fill"
        initial={{ width: 0 }}
        animate={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-pulse"></div>
        
        {/* Heart icon that moves with progress */}
        {progress > 5 && (
          <motion.div
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-romantic-red text-lg heart">💖</span>
          </motion.div>
        )}
      </motion.div>
      
      {/* Progress text */}
      <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
        <span>Progress</span>
        <span className="font-medium">{Math.round(progress)}%</span>
      </div>
    </div>
  );
};

export default ProgressBar; 