// Game Component for Spark: Digital Couples Connection Game
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from './Card';
import ProgressBar from './ProgressBar';
import PlayerIndicator from './PlayerIndicator';
import GameControls from './GameControls';
import AdBanner from './AdBanner';
import { useGameState } from '../hooks/useGameState';

const Game = ({ onGameEnd, onBackToMenu, isAdFreeVersion = false }) => {
  const {
    currentPlayer,
    gameProgress,
    favoriteCards,
    isGameCompleted,
    getCurrentCard,
    getCurrentPlayerName,
    nextCard,
    skipCard,
    addToFavorites,
    removeFromFavorites,
    getGameSummary
  } = useGameState();

  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);

  const currentCard = getCurrentCard();
  const currentPlayerName = getCurrentPlayerName();
  const isFavorite = currentCard ? favoriteCards.some(fav => fav.id === currentCard.id) : false;

  // Update session time
  useEffect(() => {
    const interval = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Handle card flip
  const handleCardFlip = () => {
    if (!isCardFlipped) {
      setIsCardFlipped(true);
      setTimeout(() => {
        setShowControls(true);
      }, 600); // Wait for flip animation to complete
    }
  };

  // Handle next card
  const handleNextCard = () => {
    setIsCardFlipped(false);
    setShowControls(false);
    setTimeout(() => {
      nextCard();
    }, 300);
  };

  // Handle skip card
  const handleSkipCard = () => {
    setIsCardFlipped(false);
    setShowControls(false);
    setTimeout(() => {
      skipCard();
    }, 300);
  };

  // Handle favorite toggle
  const handleFavoriteToggle = (cardId) => {
    if (isFavorite) {
      removeFromFavorites(cardId);
    } else {
      addToFavorites(cardId);
    }
  };

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle game completion
  useEffect(() => {
    if (isGameCompleted) {
      const summary = getGameSummary();
      setTimeout(() => {
        onGameEnd(summary);
      }, 1000);
    }
  }, [isGameCompleted, onGameEnd, getGameSummary]);

  if (isGameCompleted) {
    return (
      <motion.div
        className="game-container"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center py-20">
          <motion.div
            className="text-6xl mb-6"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            🎉
          </motion.div>
          <h2 className="text-3xl font-romantic font-bold text-gradient mb-4">
            Game Complete!
          </h2>
          <p className="text-gray-600 mb-8">
            Generating your connection summary...
          </p>
          <div className="spinner mx-auto"></div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="game-container relative">
      {/* Ad Banner for basic version */}
      {!isAdFreeVersion && (
        <div className="mb-4">
          <AdBanner />
        </div>
      )}

      {/* Game Header */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Progress Bar */}
        <div className="mb-4">
          <ProgressBar progress={gameProgress} />
        </div>

        {/* Game Info */}
        <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <i className="fas fa-clock mr-1"></i>
              {formatTime(sessionTime)}
            </span>
            <span className="flex items-center">
              <i className="fas fa-heart mr-1 text-romantic-red"></i>
              {favoriteCards.length}
            </span>
          </div>
          
          <button
            onClick={onBackToMenu}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            title="Back to Menu"
          >
            <i className="fas fa-home text-gray-500"></i>
          </button>
        </div>

        {/* Player Indicator */}
        <PlayerIndicator 
          currentPlayer={currentPlayer}
          currentPlayerName={currentPlayerName}
        />
      </motion.div>

      {/* Main Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-96">
        {/* Card Display */}
        <motion.div
          className="mb-8"
          layout
          transition={{ duration: 0.3 }}
        >
          <Card
            card={currentCard}
            isFlipped={isCardFlipped}
            onFlip={handleCardFlip}
            onFavorite={handleFavoriteToggle}
            isFavorite={isFavorite}
          />
        </motion.div>

        {/* Game Controls */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <GameControls
                onNext={handleNextCard}
                onSkip={handleSkipCard}
                onFavorite={() => handleFavoriteToggle(currentCard?.id)}
                isFavorite={isFavorite}
                showFavorite={true}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instructions */}
        {!isCardFlipped && (
          <motion.div
            className="text-center text-gray-500 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm mb-2">
              <span className="font-medium">{currentPlayerName}</span>, it's your turn!
            </p>
            <p className="text-xs">
              Tap the card to reveal your prompt
            </p>
          </motion.div>
        )}
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3">
        {/* Favorites button */}
        {favoriteCards.length > 0 && (
          <motion.button
            className="w-12 h-12 bg-romantic-red text-white rounded-full shadow-lg flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 }}
          >
            <i className="fas fa-heart"></i>
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-white text-romantic-red text-xs rounded-full flex items-center justify-center font-bold">
              {favoriteCards.length}
            </span>
          </motion.button>
        )}
      </div>

      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-10 left-10 text-6xl text-pink-100 opacity-50">
          💕
        </div>
        <div className="absolute bottom-20 right-20 text-4xl text-purple-100 opacity-30">
          💖
        </div>
        <div className="absolute top-1/3 right-10 text-5xl text-red-100 opacity-40">
          💝
        </div>
        <div className="absolute bottom-1/3 left-20 text-3xl text-pink-200 opacity-60">
          💞
        </div>
      </div>
    </div>
  );
};

export default Game; 