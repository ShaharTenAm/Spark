// PlayerIndicator Component for Spark: Digital Couples Connection Game
import React from 'react';
import { motion } from 'framer-motion';

const PlayerIndicator = ({ currentPlayer, currentPlayerName, players = {} }) => {
  return (
    <div className="text-center">
      <motion.div
        className="inline-flex items-center space-x-3 bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 border border-primary-100"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        key={currentPlayer} // Re-animate on player change
      >
        {/* Player Avatar */}
        <motion.div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${
            currentPlayer === 1 
              ? 'bg-gradient-to-r from-romantic-pink to-romantic-purple' 
              : 'bg-gradient-to-r from-romantic-purple to-romantic-red'
          }`}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
        >
          {currentPlayer === 1 ? '👩' : '👨'}
        </motion.div>

        {/* Player Name */}
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-1">Current Turn</p>
          <p className="font-semibold text-gray-800">
            {currentPlayerName || `Player ${currentPlayer}`}
          </p>
        </div>

        {/* Turn indicator */}
        <motion.div
          className="w-3 h-3 bg-romantic-red rounded-full"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.div>
      
      {/* Turn instruction */}
      <motion.p
        className="text-xs text-gray-500 mt-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        It's <span className="font-medium text-romantic-purple">{currentPlayerName}</span>'s turn to draw a card
      </motion.p>
    </div>
  );
};

export default PlayerIndicator; 