// Home Component for Spark: Digital Couples Connection Game
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GAME_SESSIONS, INTENSITY_LEVELS } from '../data/gameContent';

const Home = ({ onStartGame, onShowFavorites, favoriteCount = 0 }) => {
  const [step, setStep] = useState('welcome'); // welcome, setup, ready
  const [playerNames, setPlayerNames] = useState({ player1: '', player2: '' });
  const [selectedSession, setSelectedSession] = useState('standard');
  const [intensityLevel, setIntensityLevel] = useState(INTENSITY_LEVELS.MILD);
  const [showIntro, setShowIntro] = useState(true);

  const handleStartSetup = () => {
    setStep('setup');
    setShowIntro(false);
  };

  const handleStartGame = () => {
    if (playerNames.player1 && playerNames.player2) {
      onStartGame(selectedSession, playerNames, intensityLevel);
    }
  };

  const isReadyToStart = playerNames.player1.trim() && playerNames.player2.trim();

  // Welcome Screen
  if (step === 'welcome' && showIntro) {
    return (
      <motion.div
        className="game-container text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Logo and Title */}
        <motion.div
          className="mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.div
            className="text-8xl mb-4"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, -5, 5, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2
            }}
          >
            ✨
          </motion.div>
          <h1 className="font-romantic text-5xl font-bold text-gradient mb-4">
            Spark
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Digital Couples Connection Game
          </p>
          <p className="text-sm text-gray-500">
            Ignite passion • Deepen connection • Create memories
          </p>
        </motion.div>

        {/* Feature highlights */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="text-center">
            <div className="text-3xl mb-2">💕</div>
            <h3 className="font-semibold text-gray-800 mb-1">Fun & Flirty</h3>
            <p className="text-sm text-gray-600">Light questions to break the ice</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🔥</div>
            <h3 className="font-semibold text-gray-800 mb-1">Deep Connection</h3>
            <p className="text-sm text-gray-600">Meaningful conversations</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🌶️</div>
            <h3 className="font-semibold text-gray-800 mb-1">Spice It Up</h3>
            <p className="text-sm text-gray-600">Intimate moments together</p>
          </div>
        </motion.div>

        {/* Start button */}
        <motion.button
          className="btn-primary text-lg px-8 py-4 mb-6"
          onClick={handleStartSetup}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Your Journey
          <i className="fas fa-heart ml-2"></i>
        </motion.button>

        {/* Favorites link */}
        {favoriteCount > 0 && (
          <motion.button
            className="block mx-auto text-sm text-gray-500 hover:text-romantic-purple transition-colors"
            onClick={onShowFavorites}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <i className="fas fa-heart mr-1"></i>
            View Favorites ({favoriteCount})
          </motion.button>
        )}
      </motion.div>
    );
  }

  // Setup Screen
  return (
    <motion.div
      className="game-container"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <button
          onClick={() => setStep('welcome')}
          className="absolute top-6 left-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <i className="fas fa-arrow-left text-gray-500"></i>
        </button>
        
        <h2 className="text-2xl font-romantic font-bold text-gradient mb-2">
          Let's Set Up Your Game
        </h2>
        <p className="text-gray-600 text-sm">
          Customize your romantic experience
        </p>
      </div>

      {/* Player Names */}
      <motion.div
        className="mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Who's Playing? 👫
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Player 1 (👩)
            </label>
            <input
              type="text"
              value={playerNames.player1}
              onChange={(e) => setPlayerNames(prev => ({ ...prev, player1: e.target.value }))}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-romantic-pink focus:border-transparent transition-all"
              maxLength={20}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Player 2 (👨)
            </label>
            <input
              type="text"
              value={playerNames.player2}
              onChange={(e) => setPlayerNames(prev => ({ ...prev, player2: e.target.value }))}
              placeholder="Enter partner's name"
              className="w-full px-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-romantic-pink focus:border-transparent transition-all"
              maxLength={20}
            />
          </div>
        </div>
      </motion.div>

      {/* Session Selection */}
      <motion.div
        className="mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Choose Your Adventure ⏰
        </h3>
        <div className="space-y-3">
          {Object.entries(GAME_SESSIONS).map(([key, session]) => (
            <motion.button
              key={key}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                selectedSession === key
                  ? 'border-romantic-pink bg-romantic-pink/5'
                  : 'border-gray-200 hover:border-romantic-pink/50'
              }`}
              onClick={() => setSelectedSession(key)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-gray-800">{session.name}</h4>
                  <p className="text-sm text-gray-600">
                    {session.duration} minutes • {session.cardCount} cards
                  </p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedSession === key
                    ? 'border-romantic-pink bg-romantic-pink'
                    : 'border-gray-300'
                }`}>
                  {selectedSession === key && (
                    <i className="fas fa-check text-xs text-white"></i>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Intensity Level */}
      <motion.div
        className="mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Set the Mood 🌡️
        </h3>
        <div className="flex space-x-2">
          {Object.values(INTENSITY_LEVELS).map((level) => (
            <motion.button
              key={level}
              className={`flex-1 p-3 rounded-full text-sm font-medium transition-all ${
                intensityLevel === level
                  ? 'bg-romantic-pink text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setIntensityLevel(level)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </motion.button>
          ))}
        </div>
        <p className="text-xs text-gray-500 text-center mt-2">
          {intensityLevel === INTENSITY_LEVELS.MILD && "Sweet and playful questions"}
          {intensityLevel === INTENSITY_LEVELS.MODERATE && "Deeper connections and light teasing"}
          {intensityLevel === INTENSITY_LEVELS.SPICY && "Bold, intimate, and passionate"}
        </p>
      </motion.div>

      {/* Start Game Button */}
      <motion.button
        className={`w-full py-4 rounded-full font-semibold transition-all ${
          isReadyToStart
            ? 'btn-primary'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        onClick={handleStartGame}
        disabled={!isReadyToStart}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        whileHover={isReadyToStart ? { scale: 1.02 } : {}}
        whileTap={isReadyToStart ? { scale: 0.98 } : {}}
      >
        {isReadyToStart ? 'Start Playing!' : 'Enter Both Names to Continue'}
        {isReadyToStart && <i className="fas fa-play ml-2"></i>}
      </motion.button>

      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-20 right-10 text-4xl text-pink-100 opacity-30">
          💕
        </div>
        <div className="absolute bottom-32 left-10 text-5xl text-purple-100 opacity-25">
          💖
        </div>
        <div className="absolute top-1/2 left-20 text-3xl text-red-100 opacity-35">
          💝
        </div>
      </div>
    </motion.div>
  );
};

export default Home; 