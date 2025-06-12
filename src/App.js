// Main App Component for Spark: Digital Couples Connection Game
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './components/Home';
import Game from './components/Game';
import GameSummary from './components/GameSummary';
import { useGameState } from './hooks/useGameState';
import './styles/globals.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home'); // home, game, summary
  const [appVersion, setAppVersion] = useState('basic'); // basic ($4.99) or premium ($15.99)
  const [gameSummary, setGameSummary] = useState(null);
  
  const {
    initializeGame,
    favoriteCards,
    resetGame,
    loadGameState,
    isGameActive
  } = useGameState();

  // Check for existing game session on app load
  useEffect(() => {
    const hasExistingGame = loadGameState();
    if (hasExistingGame) {
      setCurrentScreen('game');
    }
  }, [loadGameState]);

  // Determine if this is the ad-free version
  const isAdFreeVersion = appVersion === 'premium';

  // Handle game start
  const handleStartGame = (sessionType, playerNames, intensityLevel) => {
    const success = initializeGame(sessionType, playerNames, intensityLevel);
    if (success) {
      setCurrentScreen('game');
    } else {
      console.error('Failed to initialize game');
    }
  };

  // Handle game end
  const handleGameEnd = (summary) => {
    setGameSummary(summary);
    setCurrentScreen('summary');
  };

  // Handle back to menu
  const handleBackToMenu = () => {
    resetGame();
    setCurrentScreen('home');
    setGameSummary(null);
  };

  // Handle show favorites (placeholder for now)
  const handleShowFavorites = () => {
    // TODO: Implement favorites screen
    console.log('Show favorites:', favoriteCards);
  };

  // Handle play again
  const handlePlayAgain = () => {
    resetGame();
    setCurrentScreen('home');
    setGameSummary(null);
  };

  // Screen transition variants
  const screenVariants = {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -100 }
  };

  const screenTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  return (
    <div className="App min-h-screen">
      <AnimatePresence mode="wait">
        {currentScreen === 'home' && (
          <motion.div
            key="home"
            variants={screenVariants}
            initial="initial"
            animate="in"
            exit="out"
            transition={screenTransition}
          >
            <Home
              onStartGame={handleStartGame}
              onShowFavorites={handleShowFavorites}
              favoriteCount={favoriteCards.length}
            />
          </motion.div>
        )}

        {currentScreen === 'game' && (
          <motion.div
            key="game"
            variants={screenVariants}
            initial="initial"
            animate="in"
            exit="out"
            transition={screenTransition}
          >
            <Game
              onGameEnd={handleGameEnd}
              onBackToMenu={handleBackToMenu}
              isAdFreeVersion={isAdFreeVersion}
            />
          </motion.div>
        )}

        {currentScreen === 'summary' && gameSummary && (
          <motion.div
            key="summary"
            variants={screenVariants}
            initial="initial"
            animate="in"
            exit="out"
            transition={screenTransition}
          >
            <GameSummary
              summary={gameSummary}
              onPlayAgain={handlePlayAgain}
              onBackToMenu={handleBackToMenu}
              favoriteCards={favoriteCards}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Loading Screen */}
      {!currentScreen && (
        <div className="fixed inset-0 bg-gradient-to-br from-primary-50 via-white to-romantic-pink/10 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-bounce">✨</div>
            <h2 className="font-romantic text-2xl text-gradient mb-2">Spark</h2>
            <div className="spinner mx-auto"></div>
          </div>
        </div>
      )}

      {/* Version indicator (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 bg-black/50 text-white text-xs px-2 py-1 rounded">
          {appVersion.toUpperCase()} v1.0.0
        </div>
      )}
    </div>
  );
}

export default App; 