const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/spark-couples-game';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('📦 Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Card Schema
const cardSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  type: { type: String, enum: ['question', 'task', 'sponsored'], default: 'question' },
  difficulty: { type: Number, min: 1, max: 5, default: 1 },
  tags: [String],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const Card = mongoose.model('Card', cardSchema);

// Game Session Schema
const gameSessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  playerNames: [String],
  currentPlayerIndex: { type: Number, default: 0 },
  cardsDrawn: [String],
  skipsUsed: { type: Number, default: 0 },
  maxSkips: { type: Number, default: 3 },
  startTime: { type: Date, default: Date.now },
  endTime: Date,
  isActive: { type: Boolean, default: true },
  gameStats: {
    totalCards: { type: Number, default: 0 },
    questionsAnswered: { type: Number, default: 0 },
    tasksCompleted: { type: Number, default: 0 }
  }
});

const GameSession = mongoose.model('GameSession', gameSessionSchema);

// API Routes

// Health check endpoint
app.get('/api/hello', (req, res) => {
  res.json({ 
    message: 'Hello from Spark Couples Game API!',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// Get all cards or filtered cards
app.get('/api/cards', async (req, res) => {
  try {
    const { category, difficulty, type, limit = 50 } = req.query;
    let query = { isActive: true };
    
    if (category) query.category = category;
    if (difficulty) query.difficulty = parseInt(difficulty);
    if (type) query.type = type;
    
    const cards = await Card.find(query)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });
    
    // Shuffle cards
    const shuffledCards = cards.sort(() => Math.random() - 0.5);
    
    res.json({
      success: true,
      count: shuffledCards.length,
      cards: shuffledCards
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch cards',
      details: error.message 
    });
  }
});

// Get card by ID
app.get('/api/cards/:id', async (req, res) => {
  try {
    const card = await Card.findOne({ id: req.params.id, isActive: true });
    if (!card) {
      return res.status(404).json({ 
        success: false, 
        error: 'Card not found' 
      });
    }
    res.json({ success: true, card });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch card',
      details: error.message 
    });
  }
});

// Get available categories
app.get('/api/cards/categories', async (req, res) => {
  try {
    const categories = await Card.distinct('category', { isActive: true });
    res.json({ 
      success: true, 
      categories: categories.sort() 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch categories',
      details: error.message 
    });
  }
});

// Create new game session
app.post('/api/game/start', async (req, res) => {
  try {
    const { playerNames } = req.body;
    
    if (!playerNames || !Array.isArray(playerNames) || playerNames.length < 2) {
      return res.status(400).json({ 
        success: false, 
        error: 'At least 2 player names required' 
      });
    }
    
    const sessionId = `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const gameSession = new GameSession({
      sessionId,
      playerNames: playerNames.slice(0, 2), // Limit to 2 players for couples game
      currentPlayerIndex: 0,
      cardsDrawn: [],
      skipsUsed: 0,
      maxSkips: 3
    });
    
    await gameSession.save();
    
    res.json({ 
      success: true, 
      sessionId,
      gameSession: {
        playerNames: gameSession.playerNames,
        currentPlayer: gameSession.playerNames[0],
        skipsRemaining: gameSession.maxSkips - gameSession.skipsUsed
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to start game session',
      details: error.message 
    });
  }
});

// Get game session status
app.get('/api/game/:sessionId', async (req, res) => {
  try {
    const gameSession = await GameSession.findOne({ 
      sessionId: req.params.sessionId,
      isActive: true 
    });
    
    if (!gameSession) {
      return res.status(404).json({ 
        success: false, 
        error: 'Game session not found' 
      });
    }
    
    res.json({ 
      success: true, 
      gameSession: {
        sessionId: gameSession.sessionId,
        playerNames: gameSession.playerNames,
        currentPlayer: gameSession.playerNames[gameSession.currentPlayerIndex],
        currentPlayerIndex: gameSession.currentPlayerIndex,
        cardsDrawn: gameSession.cardsDrawn.length,
        skipsUsed: gameSession.skipsUsed,
        skipsRemaining: gameSession.maxSkips - gameSession.skipsUsed,
        gameStats: gameSession.gameStats,
        startTime: gameSession.startTime
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch game session',
      details: error.message 
    });
  }
});

// Draw a card
app.post('/api/game/:sessionId/draw', async (req, res) => {
  try {
    const gameSession = await GameSession.findOne({ 
      sessionId: req.params.sessionId,
      isActive: true 
    });
    
    if (!gameSession) {
      return res.status(404).json({ 
        success: false, 
        error: 'Game session not found' 
      });
    }
    
    // Get a random card that hasn't been drawn yet
    const drawnCardIds = gameSession.cardsDrawn;
    const availableCards = await Card.find({
      isActive: true,
      id: { $nin: drawnCardIds }
    });
    
    if (availableCards.length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'No more cards available' 
      });
    }
    
    const randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];
    
    // Update game session
    gameSession.cardsDrawn.push(randomCard.id);
    gameSession.gameStats.totalCards += 1;
    
    if (randomCard.type === 'question') {
      gameSession.gameStats.questionsAnswered += 1;
    } else if (randomCard.type === 'task') {
      gameSession.gameStats.tasksCompleted += 1;
    }
    
    // Switch to next player
    gameSession.currentPlayerIndex = (gameSession.currentPlayerIndex + 1) % gameSession.playerNames.length;
    
    await gameSession.save();
    
    res.json({ 
      success: true, 
      card: randomCard,
      gameSession: {
        currentPlayer: gameSession.playerNames[gameSession.currentPlayerIndex],
        currentPlayerIndex: gameSession.currentPlayerIndex,
        cardsDrawn: gameSession.cardsDrawn.length,
        skipsRemaining: gameSession.maxSkips - gameSession.skipsUsed,
        gameStats: gameSession.gameStats
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to draw card',
      details: error.message 
    });
  }
});

// Skip a card
app.post('/api/game/:sessionId/skip', async (req, res) => {
  try {
    const gameSession = await GameSession.findOne({ 
      sessionId: req.params.sessionId,
      isActive: true 
    });
    
    if (!gameSession) {
      return res.status(404).json({ 
        success: false, 
        error: 'Game session not found' 
      });
    }
    
    if (gameSession.skipsUsed >= gameSession.maxSkips) {
      return res.status(400).json({ 
        success: false, 
        error: 'No skips remaining' 
      });
    }
    
    gameSession.skipsUsed += 1;
    await gameSession.save();
    
    res.json({ 
      success: true, 
      message: 'Card skipped',
      skipsRemaining: gameSession.maxSkips - gameSession.skipsUsed
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to skip card',
      details: error.message 
    });
  }
});

// End game session
app.post('/api/game/:sessionId/end', async (req, res) => {
  try {
    const gameSession = await GameSession.findOne({ 
      sessionId: req.params.sessionId,
      isActive: true 
    });
    
    if (!gameSession) {
      return res.status(404).json({ 
        success: false, 
        error: 'Game session not found' 
      });
    }
    
    gameSession.isActive = false;
    gameSession.endTime = new Date();
    await gameSession.save();
    
    const gameDuration = gameSession.endTime - gameSession.startTime;
    
    res.json({ 
      success: true, 
      message: 'Game session ended',
      finalStats: {
        ...gameSession.gameStats,
        duration: Math.floor(gameDuration / 1000 / 60), // in minutes
        playerNames: gameSession.playerNames
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to end game session',
      details: error.message 
    });
  }
});

// Seed database with sample cards
app.post('/api/admin/seed', async (req, res) => {
  try {
    const sampleCards = [
      {
        id: 'card_001',
        content: 'What is your partner\'s biggest dream, and how can you support them in achieving it?',
        category: 'Dreams & Goals',
        type: 'question',
        difficulty: 3,
        tags: ['future', 'support', 'dreams']
      },
      {
        id: 'card_002',
        content: 'Share three things you absolutely love about your partner.',
        category: 'Appreciation',
        type: 'question',
        difficulty: 1,
        tags: ['love', 'appreciation', 'positive']
      },
      {
        id: 'card_003',
        content: 'Give your partner a 30-second shoulder massage.',
        category: 'Physical Touch',
        type: 'task',
        difficulty: 1,
        tags: ['touch', 'massage', 'care']
      },
      {
        id: 'card_004',
        content: 'What is one adventure you\'d love to go on together?',
        category: 'Adventures',
        type: 'question',
        difficulty: 2,
        tags: ['adventure', 'travel', 'together']
      },
      {
        id: 'card_005',
        content: 'Plan your perfect date night together right now.',
        category: 'Romance',
        type: 'task',
        difficulty: 2,
        tags: ['romance', 'planning', 'date']
      }
    ];
    
    // Clear existing cards
    await Card.deleteMany({});
    
    // Insert sample cards
    await Card.insertMany(sampleCards);
    
    res.json({ 
      success: true, 
      message: `Database seeded with ${sampleCards.length} sample cards` 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to seed database',
      details: error.message 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    error: 'Something went wrong!',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    error: 'API endpoint not found' 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Spark Couples Game API server running on port ${PORT}`);
  console.log(`📱 API endpoints available at http://localhost:${PORT}/api`);
});

module.exports = app;
