// GameSummary Component for Spark: Digital Couples Connection Game
import React from 'react';
import { motion } from 'framer-motion';

const GameSummary = ({ summary, onPlayAgain, onBackToMenu, favoriteCards = [] }) => {
  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Get encouraging message based on completion percentage
  const getEncouragingMessage = (percentage) => {
    if (percentage >= 90) {
      return "Amazing connection! You both were fully engaged! 🔥";
    } else if (percentage >= 70) {
      return "Great chemistry! You're building something special! 💕";
    } else if (percentage >= 50) {
      return "Good start! Keep exploring together! ✨";
    } else {
      return "Every journey begins with a single step! 💖";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="game-container text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <motion.div
          className="text-6xl mb-4"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, -5, 5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3
          }}
        >
          🎉
        </motion.div>
        <h1 className="font-romantic text-4xl font-bold text-gradient mb-2">
          Connection Complete!
        </h1>
        <p className="text-gray-600">
          {getEncouragingMessage(summary.completionPercentage)}
        </p>
      </motion.div>

      {/* Statistics Grid */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-2 gap-4 mb-8"
      >
        {/* Cards Completed */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-primary-100">
          <div className="text-3xl mb-2">🃏</div>
          <div className="text-2xl font-bold text-gray-800 mb-1">
            {summary.completedCards}
          </div>
          <div className="text-sm text-gray-600">
            Cards Completed
          </div>
          <div className="text-xs text-gray-500 mt-1">
            out of {summary.totalCards}
          </div>
        </div>

        {/* Time Spent */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-primary-100">
          <div className="text-3xl mb-2">⏰</div>
          <div className="text-2xl font-bold text-gray-800 mb-1">
            {formatTime(summary.sessionTime)}
          </div>
          <div className="text-sm text-gray-600">
            Time Together
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {summary.sessionName}
          </div>
        </div>

        {/* Favorite Cards */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-primary-100">
          <div className="text-3xl mb-2">💕</div>
          <div className="text-2xl font-bold text-gray-800 mb-1">
            {summary.favoriteCards}
          </div>
          <div className="text-sm text-gray-600">
            Favorites Added
          </div>
          {summary.favoriteCards > 0 && (
            <div className="text-xs text-gray-500 mt-1">
              Save them for later!
            </div>
          )}
        </div>

        {/* Completion Rate */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-primary-100">
          <div className="text-3xl mb-2">📊</div>
          <div className="text-2xl font-bold text-gray-800 mb-1">
            {summary.completionPercentage}%
          </div>
          <div className="text-sm text-gray-600">
            Completion Rate
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Keep going!
          </div>
        </div>
      </motion.div>

      {/* Top Favorite Card */}
      {summary.topFavoriteCard && (
        <motion.div 
          variants={itemVariants}
          className="mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Your Top Moment 💖
          </h3>
          <div className="bg-gradient-to-r from-romantic-pink/10 to-romantic-purple/10 rounded-2xl p-6 border border-romantic-pink/20">
            <p className="text-gray-700 italic mb-2">
              "{summary.topFavoriteCard.content}"
            </p>
            <span className="inline-block px-3 py-1 bg-romantic-pink/20 text-romantic-red rounded-full text-sm font-medium">
              {summary.topFavoriteCard.type.replace('_', ' ')}
            </span>
          </div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <motion.div 
        variants={itemVariants}
        className="space-y-4"
      >
        {/* Play Again Button */}
        <motion.button
          className="btn-primary w-full py-4 text-lg"
          onClick={onPlayAgain}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <i className="fas fa-play mr-2"></i>
          Play Another Round
        </motion.button>

        {/* Back to Menu Button */}
        <motion.button
          className="btn-secondary w-full py-3"
          onClick={onBackToMenu}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <i className="fas fa-home mr-2"></i>
          Back to Menu
        </motion.button>

        {/* Share Results (Future Feature) */}
        <motion.button
          className="w-full py-3 text-gray-500 hover:text-romantic-purple transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            // TODO: Implement sharing functionality
            console.log('Share results feature coming soon!');
          }}
        >
          <i className="fas fa-share-alt mr-2"></i>
          Share Your Connection Journey
        </motion.button>
      </motion.div>

      {/* Encouragement Message */}
      <motion.div 
        variants={itemVariants}
        className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-romantic-pink/10 rounded-2xl border border-primary-100"
      >
        <h4 className="font-semibold text-gray-800 mb-2">
          Keep the Spark Alive! ✨
        </h4>
        <p className="text-sm text-gray-600 mb-3">
          Great relationships are built through consistent connection and communication.
        </p>
        <div className="flex justify-center space-x-6 text-xs text-gray-500">
          <span>💬 Talk about your favorites</span>
          <span>📅 Schedule regular date nights</span>
          <span>❤️ Keep exploring together</span>
        </div>
      </motion.div>

      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div 
          className="absolute top-20 left-10 text-4xl text-pink-100 opacity-30"
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            repeatDelay: 1
          }}
        >
          🎊
        </motion.div>
        <motion.div 
          className="absolute bottom-32 right-10 text-5xl text-purple-100 opacity-25"
          animate={{ 
            y: [0, 10, 0],
            rotate: [0, -5, 5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2
          }}
        >
          🎉
        </motion.div>
        <motion.div 
          className="absolute top-1/2 right-20 text-3xl text-red-100 opacity-35"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            repeatDelay: 0.5
          }}
        >
          🌟
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GameSummary; 