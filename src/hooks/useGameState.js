// Custom hook for managing game state in Spark: Digital Couples Connection Game
import { useState, useEffect, useCallback } from 'react';
import { 
  getRandomCards, 
  GAME_SESSIONS, 
  INTENSITY_LEVELS,
  SECTIONS_CONFIG 
} from '../data/gameContent';

export const useGameState = () => {
  // Game state variables
  const [gameSession, setGameSession] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [gameCards, setGameCards] = useState([]);
  const [players, setPlayers] = useState({ player1: '', player2: '' });
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [gameProgress, setGameProgress] = useState(0);
  const [gameStartTime, setGameStartTime] = useState(null);
  const [intensityLevel, setIntensityLevel] = useState(INTENSITY_LEVELS.MILD);
  const [favoriteCards, setFavoriteCards] = useState([]);
  const [completedCards, setCompletedCards] = useState([]);
  const [gameStats, setGameStats] = useState({
    totalCards: 0,
    completedCards: 0,
    favoriteCards: 0,
    sessionTime: 0
  });
  const [isGameActive, setIsGameActive] = useState(false);
  const [isGameCompleted, setIsGameCompleted] = useState(false);

  // Initialize game with selected session type
  const initializeGame = useCallback((sessionType, playerNames, intensity = INTENSITY_LEVELS.MILD) => {
    const session = GAME_SESSIONS[sessionType];
    if (!session) {
      console.error('Invalid session type');
      return false;
    }

    // Generate random cards for the session
    const cards = getRandomCards(session.sections, session.cardCount, intensity);
    
    setGameSession(session);
    setGameCards(cards);
    setPlayers(playerNames);
    setCurrentPlayer(1);
    setCurrentCardIndex(0);
    setGameProgress(0);
    setGameStartTime(Date.now());
    setIntensityLevel(intensity);
    setCompletedCards([]);
    setFavoriteCards([]);
    setIsGameActive(true);
    setIsGameCompleted(false);
    setGameStats({
      totalCards: cards.length,
      completedCards: 0,
      favoriteCards: 0,
      sessionTime: 0
    });

    // Save game state to localStorage
    saveGameState({
      session,
      cards,
      playerNames,
      intensity,
      startTime: Date.now()
    });

    return true;
  }, []);

  // Move to next card
  const nextCard = useCallback(() => {
    if (currentCardIndex < gameCards.length - 1) {
      const newIndex = currentCardIndex + 1;
      setCurrentCardIndex(newIndex);
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      
      // Update progress
      const progress = ((newIndex + 1) / gameCards.length) * 100;
      setGameProgress(progress);
      
      // Mark current card as completed
      const currentCard = gameCards[currentCardIndex];
      setCompletedCards(prev => [...prev, currentCard]);
      
      // Update stats
      setGameStats(prev => ({
        ...prev,
        completedCards: prev.completedCards + 1,
        sessionTime: gameStartTime ? Math.floor((Date.now() - gameStartTime) / 1000) : 0
      }));

      // Check if game is completed
      if (newIndex === gameCards.length - 1) {
        setIsGameCompleted(true);
        setIsGameActive(false);
      }
    }
  }, [currentCardIndex, gameCards, currentPlayer, gameStartTime]);

  // Skip current card
  const skipCard = useCallback(() => {
    nextCard(); // Same logic as next card for now
  }, [nextCard]);

  // Add card to favorites
  const addToFavorites = useCallback((cardId) => {
    const card = gameCards.find(c => c.id === cardId);
    if (card && !favoriteCards.find(c => c.id === cardId)) {
      const newFavorites = [...favoriteCards, card];
      setFavoriteCards(newFavorites);
      setGameStats(prev => ({
        ...prev,
        favoriteCards: newFavorites.length
      }));
      
      // Save to localStorage
      localStorage.setItem('spark_favorites', JSON.stringify(newFavorites));
    }
  }, [gameCards, favoriteCards]);

  // Remove card from favorites
  const removeFromFavorites = useCallback((cardId) => {
    const newFavorites = favoriteCards.filter(c => c.id !== cardId);
    setFavoriteCards(newFavorites);
    setGameStats(prev => ({
      ...prev,
      favoriteCards: newFavorites.length
    }));
    
    // Save to localStorage
    localStorage.setItem('spark_favorites', JSON.stringify(newFavorites));
  }, [favoriteCards]);

  // Reset game
  const resetGame = useCallback(() => {
    setGameSession(null);
    setCurrentCardIndex(0);
    setGameCards([]);
    setPlayers({ player1: '', player2: '' });
    setCurrentPlayer(1);
    setGameProgress(0);
    setGameStartTime(null);
    setCompletedCards([]);
    setIsGameActive(false);
    setIsGameCompleted(false);
    setGameStats({
      totalCards: 0,
      completedCards: 0,
      favoriteCards: favoriteCards.length,
      sessionTime: 0
    });
    
    // Clear localStorage
    localStorage.removeItem('spark_game_state');
  }, [favoriteCards.length]);

  // Save game state to localStorage
  const saveGameState = useCallback((state) => {
    try {
      localStorage.setItem('spark_game_state', JSON.stringify({
        ...state,
        currentCardIndex,
        currentPlayer,
        gameProgress,
        completedCards,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.error('Error saving game state:', error);
    }
  }, [currentCardIndex, currentPlayer, gameProgress, completedCards]);

  // Load game state from localStorage
  const loadGameState = useCallback(() => {
    try {
      const savedState = localStorage.getItem('spark_game_state');
      if (savedState) {
        const state = JSON.parse(savedState);
        
        // Check if saved state is not too old (24 hours)
        const dayInMs = 24 * 60 * 60 * 1000;
        if (Date.now() - state.timestamp < dayInMs) {
          setGameSession(state.session);
          setGameCards(state.cards);
          setPlayers(state.playerNames);
          setCurrentCardIndex(state.currentCardIndex || 0);
          setCurrentPlayer(state.currentPlayer || 1);
          setGameProgress(state.gameProgress || 0);
          setIntensityLevel(state.intensity);
          setCompletedCards(state.completedCards || []);
          setGameStartTime(state.startTime);
          setIsGameActive(true);
          
          return true;
        }
      }
    } catch (error) {
      console.error('Error loading game state:', error);
    }
    return false;
  }, []);

  // Load favorites on component mount
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem('spark_favorites');
      if (savedFavorites) {
        const favorites = JSON.parse(savedFavorites);
        setFavoriteCards(favorites);
        setGameStats(prev => ({
          ...prev,
          favoriteCards: favorites.length
        }));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  }, []);

  // Update session time periodically
  useEffect(() => {
    let interval;
    if (isGameActive && gameStartTime) {
      interval = setInterval(() => {
        setGameStats(prev => ({
          ...prev,
          sessionTime: Math.floor((Date.now() - gameStartTime) / 1000)
        }));
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isGameActive, gameStartTime]);

  // Get current card
  const getCurrentCard = useCallback(() => {
    return gameCards[currentCardIndex] || null;
  }, [gameCards, currentCardIndex]);

  // Get current player name
  const getCurrentPlayerName = useCallback(() => {
    return currentPlayer === 1 ? players.player1 : players.player2;
  }, [currentPlayer, players]);

  // Get game summary for end screen
  const getGameSummary = useCallback(() => {
    const totalTime = gameStartTime ? Math.floor((Date.now() - gameStartTime) / 1000) : 0;
    const favoriteCardsInSession = completedCards.filter(card => 
      favoriteCards.some(fav => fav.id === card.id)
    );

    return {
      totalCards: gameStats.totalCards,
      completedCards: gameStats.completedCards,
      favoriteCards: favoriteCardsInSession.length,
      sessionTime: totalTime,
      sessionName: gameSession?.name || '',
      topFavoriteCard: favoriteCardsInSession[0] || null,
      completionPercentage: Math.round((gameStats.completedCards / gameStats.totalCards) * 100)
    };
  }, [gameStartTime, completedCards, favoriteCards, gameStats, gameSession]);

  return {
    // State
    gameSession,
    currentCardIndex,
    gameCards,
    players,
    currentPlayer,
    gameProgress,
    intensityLevel,
    favoriteCards,
    completedCards,
    gameStats,
    isGameActive,
    isGameCompleted,
    
    // Actions
    initializeGame,
    nextCard,
    skipCard,
    addToFavorites,
    removeFromFavorites,
    resetGame,
    loadGameState,
    saveGameState,
    
    // Computed values
    getCurrentCard,
    getCurrentPlayerName,
    getGameSummary
  };
}; 