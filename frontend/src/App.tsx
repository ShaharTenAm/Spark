import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

interface Card {
  id: string;
  content: string;
  category: string;
  type: 'question' | 'task' | 'sponsored';
  difficulty: number;
  tags: string[];
}

interface GameSession {
  sessionId: string;
  playerNames: string[];
  currentPlayer: string;
  currentPlayerIndex: number;
  cardsDrawn: number;
  skipsUsed: number;
  skipsRemaining: number;
  gameStats: {
    totalCards: number;
    questionsAnswered: number;
    tasksCompleted: number;
  };
}

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'finished'>('setup');
  const [playerNames, setPlayerNames] = useState<string[]>(['', '']);
  const [gameSession, setGameSession] = useState<GameSession | null>(null);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const startGame = async () => {
    if (!playerNames[0] || !playerNames[1]) {
      setError('Please enter both player names');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // First, seed the database with sample cards
      await axios.post(`${API_URL}/admin/seed`);
      
      // Then start the game session
      const response = await axios.post(`${API_URL}/game/start`, {
        playerNames: playerNames.filter(name => name.trim())
      });

      setGameSession(response.data.gameSession);
      setGameState('playing');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to start game');
    } finally {
      setLoading(false);
    }
  };

  const drawCard = async () => {
    if (!gameSession) return;

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_URL}/game/${gameSession.sessionId}/draw`);
      setCurrentCard(response.data.card);
      setGameSession(prev => prev ? {
        ...prev,
        ...response.data.gameSession
      } : null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to draw card');
    } finally {
      setLoading(false);
    }
  };

  const skipCard = async () => {
    if (!gameSession) return;

    setLoading(true);
    setError('');

    try {
      await axios.post(`${API_URL}/game/${gameSession.sessionId}/skip`);
      setCurrentCard(null);
      // Refresh game session data
      const sessionResponse = await axios.get(`${API_URL}/game/${gameSession.sessionId}`);
      setGameSession(sessionResponse.data.gameSession);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to skip card');
    } finally {
      setLoading(false);
    }
  };

  const nextTurn = () => {
    setCurrentCard(null);
  };

  const endGame = async () => {
    if (!gameSession) return;

    try {
      await axios.post(`${API_URL}/game/${gameSession.sessionId}/end`);
      setGameState('finished');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to end game');
    }
  };

  const resetGame = () => {
    setGameState('setup');
    setGameSession(null);
    setCurrentCard(null);
    setPlayerNames(['', '']);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">✨ Spark</h1>
          <p className="text-xl text-pink-200">The Ultimate Couples Connection Game</p>
        </header>

        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        {gameState === 'setup' && (
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Ready to Connect?</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-pink-200 mb-2">Player 1 Name</label>
                <input
                  type="text"
                  value={playerNames[0]}
                  onChange={(e) => setPlayerNames([e.target.value, playerNames[1]])}
                  className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-pink-200 border border-white/30 focus:border-pink-400 focus:outline-none"
                  placeholder="Enter first name..."
                />
              </div>
              
              <div>
                <label className="block text-pink-200 mb-2">Player 2 Name</label>
                <input
                  type="text"
                  value={playerNames[1]}
                  onChange={(e) => setPlayerNames([playerNames[0], e.target.value])}
                  className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-pink-200 border border-white/30 focus:border-pink-400 focus:outline-none"
                  placeholder="Enter second name..."
                />
              </div>
            </div>

            <button
              onClick={startGame}
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 transform hover:scale-105"
            >
              {loading ? '🎮 Starting Game...' : '💕 Start Playing'}
            </button>
          </div>
        )}

        {gameState === 'playing' && gameSession && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-6">
              <div className="flex justify-between items-center text-white">
                <div className="text-center">
                  <div className="text-sm text-pink-200">Current Player</div>
                  <div className="text-xl font-bold">{gameSession.currentPlayer}</div>
                </div>
                
                <div className="text-center">
                  <div className="text-sm text-pink-200">Cards Drawn</div>
                  <div className="text-xl font-bold">{gameSession.cardsDrawn}</div>
                </div>
                
                <div className="text-center">
                  <div className="text-sm text-pink-200">Skips Left</div>
                  <div className="text-xl font-bold">{gameSession.skipsRemaining}</div>
                </div>
              </div>
            </div>

            {currentCard ? (
              <div className="bg-white/15 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-6">
                <div className="text-center mb-4">
                  <span className="inline-block bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {currentCard.category}
                  </span>
                  <span className="inline-block bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium ml-2">
                    {currentCard.type === 'question' ? '❓ Question' : '✨ Task'}
                  </span>
                </div>
                
                <div className="text-center text-white text-xl leading-relaxed mb-6">
                  {currentCard.content}
                </div>

                <div className="flex justify-center space-x-4">
                  <button
                    onClick={nextTurn}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    ✅ Done
                  </button>
                  
                  {gameSession.skipsRemaining > 0 && (
                    <button
                      onClick={skipCard}
                      disabled={loading}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                    >
                      ⏭️ Skip
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="bg-white/15 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-6">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {gameSession.currentPlayer}'s Turn
                  </h3>
                  <p className="text-pink-200 mb-6">Ready to draw a card?</p>
                  
                  <button
                    onClick={drawCard}
                    disabled={loading}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 px-8 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 transform hover:scale-105"
                  >
                    {loading ? '🎴 Drawing...' : '🎴 Draw Card'}
                  </button>
                </div>
              </div>
            )}

            <div className="text-center">
              <button
                onClick={endGame}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300"
              >
                🏁 End Game
              </button>
            </div>
          </div>
        )}

        {gameState === 'finished' && gameSession && (
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">🎉 Game Complete!</h2>
            
            <div className="space-y-3 mb-6 text-pink-200">
              <div>Cards Drawn: <span className="font-bold text-white">{gameSession.gameStats.totalCards}</span></div>
              <div>Questions Answered: <span className="font-bold text-white">{gameSession.gameStats.questionsAnswered}</span></div>
              <div>Tasks Completed: <span className="font-bold text-white">{gameSession.gameStats.tasksCompleted}</span></div>
            </div>

            <button
              onClick={resetGame}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              💕 Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
