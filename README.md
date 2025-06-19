# ✨ Spark: The Ultimate Couples Connection Game

A digital card game designed for couples to enjoy a fun, intimate, and engaging date night experience.

![Spark Game](https://img.shields.io/badge/Status-Ready%20for%20Development-green) ![Node.js](https://img.shields.io/badge/Node.js-18%2B-green) ![React](https://img.shields.io/badge/React-18-blue) ![MongoDB](https://img.shields.io/badge/MongoDB-6%2B-green)

## 🎯 Overview

Spark is a modern, web-based card game that helps couples connect through thoughtful questions, fun tasks, and intimate conversations. Built with a scalable architecture and modern technologies.

### 🏗️ System Architecture
- **Frontend**: React 18 with Tailwind CSS and Framer Motion
- **Backend**: Node.js/Express API with MongoDB
- **WordPress Site**: WooCommerce store with Stripe payment processing
- **PDF Parser**: Intelligent content extraction from game materials

### 💰 Pricing Tiers
- **Standard ($4.99)**: Ad-supported gameplay with seamless brand integration
- **Premium ($15.99)**: Ad-free premium experience

## 📁 Project Structure

```
spark-couples-game/
├── 📁 frontend/              # React web application
│   ├── 📁 src/
│   │   ├── 📁 components/    # React components
│   │   ├── 📁 services/      # API services
│   │   ├── App.js           # Main app component
│   │   └── index.js         # Entry point
│   ├── 📁 public/           # Static assets
│   └── package.json         # Dependencies
├── 📁 backend/              # Node.js/Express API
│   ├── 📁 src/
│   │   ├── 📁 models/       # MongoDB models
│   │   ├── 📁 routes/       # API routes
│   │   ├── 📁 middleware/   # Express middleware
│   │   ├── 📁 utils/        # Utilities (PDF parser)
│   │   └── server.js        # Main server file
│   └── package.json         # Dependencies
├── 📁 wordpress/            # WordPress/WooCommerce
├── 📁 docs/                 # Documentation
├── setup.js                 # Development setup script
└── README.md               # This file
```

## 🚀 Quick Start

### 🛠️ Automated Setup
Run the setup script to automatically configure your development environment:

```bash
# Clone the repository
git clone <your-repo-url>
cd spark-couples-game

# Run automated setup
node setup.js
```

### 📋 Manual Setup

#### Prerequisites
- **Node.js 18+** ([Download](https://nodejs.org/))
- **MongoDB** (local installation or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **Git** for version control

#### 1. Install Dependencies
```bash
# Install all dependencies
npm run install:all

# Or install individually
npm run install:backend
npm run install:frontend
```

#### 2. Configure Environment
Create environment files with your configuration:

**`backend/.env`**:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/spark-couples-game
JWT_SECRET=your-super-secret-jwt-key-here
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
FRONTEND_URL=http://localhost:3000
ADMIN_ACCESS_CODES=ADMIN123,DEMO1234
```

**`frontend/.env`**:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
REACT_APP_APP_NAME=Spark Couples Game
```

#### 3. Start Development Servers
```bash
# Start both frontend and backend
npm run dev

# Or start individually
npm run dev:backend    # http://localhost:5000
npm run dev:frontend   # http://localhost:3000
```

## 🎮 Game Features

### 🎯 Core Gameplay
- **Turn-based card drawing** with smooth animations
- **Three skip opportunities** per game to maintain engagement
- **Multiple card types**: Questions, tasks, and sponsored content
- **Real-time game statistics** tracking

### 🎨 User Experience
- **Mobile-first responsive design** for any device
- **Elegant dark theme** with gold accents
- **Smooth animations** powered by Framer Motion
- **Accessibility features** (WCAG 2.1 compliant)

### 🔐 Security & Authentication
- **JWT-based authentication** with secure access codes
- **Rate limiting** to prevent abuse
- **Input validation** and sanitization
- **Secure payment processing** via Stripe

### 📊 Analytics & Insights
- **Game session tracking** (duration, cards drawn)
- **Player behavior analytics** (categories, preferences)
- **Usage statistics** for business insights

## 🚀 Deployment

### 🌐 Frontend (Vercel)
```bash
cd frontend
npm run build
vercel --prod
```

### 🖥️ Backend (Render/Heroku)
1. Connect your repository to your hosting provider
2. Set environment variables in the dashboard
3. Deploy the `backend` folder
4. Configure MongoDB Atlas connection

### 🛒 WordPress (eCommerce)
1. Set up WordPress hosting (SiteGround, WP Engine, etc.)
2. Install WooCommerce plugin
3. Configure Stripe payment gateway
4. Create products for Standard and Premium tiers
5. Set up automated email delivery for access codes

## 🧪 Testing

### 🔍 Running Tests
```bash
# All tests
npm run test:all

# Backend tests
npm run test:backend

# Frontend tests
npm run test:frontend
```

### 🎯 Test Coverage
- **Unit tests** for models and utilities
- **Integration tests** for API endpoints
- **Component tests** for React components
- **End-to-end tests** for user flows

## 📈 API Documentation

### 🔐 Authentication Endpoints
- `POST /api/auth/validate` - Validate access code
- `POST /api/auth/refresh` - Refresh JWT token
- `GET /api/auth/me` - Get user information

### 🎴 Card Endpoints
- `GET /api/cards` - Get shuffled card deck
- `GET /api/cards/categories` - Get available categories
- `GET /api/cards/stats` - Get card statistics

### 📊 Admin Endpoints
- `POST /api/cards/upload` - Upload and parse PDF
- `POST /api/cards/seed` - Seed database with sample data

## 💻 Tech Stack

### 🎨 Frontend Technologies
- **React 18** - Modern component-based UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library
- **Axios** - Promise-based HTTP client

### ⚙️ Backend Technologies
- **Node.js 18** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **Stripe** - Payment processing

### 🛠️ Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Nodemon** - Development server auto-restart
- **Concurrently** - Run multiple scripts

## 🔧 Development Scripts

```bash
# Setup and installation
npm run install:all          # Install all dependencies
node setup.js               # Run automated setup

# Development
npm run dev                  # Start both servers
npm run dev:backend         # Start backend only
npm run dev:frontend        # Start frontend only

# Building and deployment
npm run build:frontend      # Build frontend for production

# Testing and quality
npm run test:all            # Run all tests
npm run lint:all            # Lint all code
npm run format:all          # Format all code

# Database
npm run seed                # Seed database with sample data
```

## 🐛 Troubleshooting

### Common Issues

#### MongoDB Connection Failed
```bash
# Check if MongoDB is running
mongosh --version

# Start MongoDB (macOS with Homebrew)
brew services start mongodb-community

# Or use MongoDB Atlas cloud database
```

#### Port Already in Use
```bash
# Find process using port 5000
lsof -ti:5000

# Kill the process
kill -9 <PID>
```

#### CORS Errors
- Ensure frontend URL is in `FRONTEND_URL` environment variable
- Check that both servers are running on correct ports

## 📖 Documentation

- [API Documentation](./docs/api.md)
- [Component Documentation](./docs/components.md)
- [Deployment Guide](./docs/deployment.md)
- [Contributing Guidelines](./docs/contributing.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

## 📞 Support

For technical support or questions:
- 📧 Email: support@sparkgame.com
- 🐛 Issues: [GitHub Issues](https://github.com/your-repo/issues)
- 📖 Docs: [Documentation Site](https://docs.sparkgame.com)

## 🎉 Acknowledgments

- Built with ❤️ for couples everywhere
- Inspired by the need for meaningful connections
- Powered by modern web technologies

---

**Ready to spark some connection?** 🔥✨ 