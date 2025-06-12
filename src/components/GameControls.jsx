// GameControls Component for Spark: Digital Couples Connection Game
import React from 'react';
import { motion } from 'framer-motion';

const GameControls = ({ 
  onNext, 
  onSkip, 
  onFavorite, 
  isFavorite = false,
  showFavorite = true,
  disabled = false 
}) => {
  const buttonVariants = {
    hover: { scale: 1.05, y: -2 },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div
      className="flex items-center justify-center space-x-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Skip Button */}
      <motion.button
        className="btn-secondary flex items-center space-x-2 min-w-24"
        variants={buttonVariants}
        whileHover={!disabled ? "hover" : {}}
        whileTap={!disabled ? "tap" : {}}
        onClick={onSkip}
        disabled={disabled}
        title="Skip this card"
      >
        <i className="fas fa-forward text-sm"></i>
        <span>Skip</span>
      </motion.button>

      {/* Favorite Button */}
      {showFavorite && (
        <motion.button
          className={`p-3 rounded-full border-2 transition-all duration-300 ${
            isFavorite 
              ? 'bg-romantic-red border-romantic-red text-white shadow-lg' 
              : 'bg-white border-gray-200 text-gray-400 hover:border-romantic-red hover:text-romantic-red'
          }`}
          variants={buttonVariants}
          whileHover={!disabled ? "hover" : {}}
          whileTap={!disabled ? "tap" : {}}
          onClick={onFavorite}
          disabled={disabled}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <motion.i
            className={`fas fa-heart text-lg`}
            animate={isFavorite ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      )}

      {/* Next Button */}
      <motion.button
        className="btn-primary flex items-center space-x-2 min-w-24"
        variants={buttonVariants}
        whileHover={!disabled ? "hover" : {}}
        whileTap={!disabled ? "tap" : {}}
        onClick={onNext}
        disabled={disabled}
        title="Next card"
      >
        <span>Next</span>
        <i className="fas fa-arrow-right text-sm"></i>
      </motion.button>
    </motion.div>
  );
};

export default GameControls; 