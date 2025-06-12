# ✨ Spark: Digital Couples Connection Game

A fun, intimate, and engaging digital card game for couples to enhance date nights, deepen connection, and spark passion.

![Spark Game Logo](https://via.placeholder.com/400x200/ff6b9d/ffffff?text=Spark+Couples+Game)

## 🎯 Project Overview

**Spark** is a web-based digital card game designed specifically for couples. It features romantic prompts, dares, and interactive tasks organized into themed sections that progressively build intimacy and connection.

### 🎮 Game Features

- **7 Themed Sections**: From "Warm-Up Flirt" to "Fantasy Zone"
- **200+ Unique Cards**: Questions, dares, tasks, and mini-games
- **3 Intensity Levels**: Mild, Moderate, and Spicy
- **Beautiful Animations**: Card flips, transitions, and romantic effects
- **Progress Tracking**: Session time, favorites, and completion stats
- **PWA Support**: Install as a mobile app for offline play
- **Responsive Design**: Perfect on mobile, tablet, and desktop

### 💰 Monetization

- **Basic Version ($4.99)**: Full game with non-intrusive banner ads
- **Premium Version ($15.99)**: Ad-free experience with all features

## 🚀 Quick Start Guide

### For Non-Technical Users

1. **Download the Project**
   - Click the green "Code" button on GitHub
   - Select "Download ZIP"
   - Extract the ZIP file to your computer

2. **Install Node.js**
   - Go to [nodejs.org](https://nodejs.org)
   - Download and install the LTS version
   - This includes npm (package manager)

3. **Open Terminal/Command Prompt**
   - Windows: Press `Win + R`, type `cmd`, press Enter
   - Mac: Press `Cmd + Space`, type "Terminal", press Enter

4. **Navigate to Project Folder**
   ```bash
   cd path/to/spark-couples-game
   ```

5. **Install Dependencies**
   ```bash
   npm install
   ```

6. **Start the Game**
   ```bash
   npm start
   ```

7. **Open in Browser**
   - The game will automatically open at `http://localhost:3000`
   - If not, manually open your browser and go to that address

### 🎉 You're Ready to Play!

The game should now be running on your computer. You can play locally or follow the deployment guide below to make it available online.

## 📱 Mobile Installation (PWA)

Once running, you can install Spark as a mobile app:

1. **On Mobile Browser**: Look for "Add to Home Screen" option
2. **On Desktop**: Look for the install icon in the address bar
3. **Enjoy Offline Play**: The app works without internet after installation

## 🛠️ Development Setup

### Prerequisites

- Node.js 16+ and npm
- Git for version control
- Modern web browser
- Code editor (VS Code recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/spark-couples-game.git

# Navigate to project directory
cd spark-couples-game

# Install dependencies
npm install

# Start development server
npm start

# Open http://localhost:3000 in your browser
```

### Available Scripts

```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from Create React App (not recommended)
```

## 🏗️ Project Structure

```
spark-couples-game/
├── public/
│   ├── index.html          # Main HTML file
│   ├── manifest.json       # PWA manifest
│   └── sw.js              # Service worker
├── src/
│   ├── components/        # React components
│   │   ├── Card.jsx       # Game card component
│   │   ├── Game.jsx       # Main game logic
│   │   ├── Home.jsx       # Home screen
│   │   └── ...
│   ├── hooks/             # Custom React hooks
│   │   └── useGameState.js
│   ├── data/              # Game content
│   │   └── gameContent.js
│   ├── firebase/          # Firebase configuration
│   │   └── config.js
│   ├── styles/            # CSS and styling
│   │   └── globals.css
│   ├── App.js             # Main App component
│   └── index.js           # React entry point
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS config
└── README.md              # This file
```

## 🎨 Game Content

### Sections Overview

1. **Warm-Up Flirt** 🔥 - Light, playful questions to break the ice
2. **Getting Closer** 💕 - Deeper questions and gentle teasing
3. **The Heat Is On** 🌶️ - Sexy prompts and intimate challenges
4. **Dare or Bare** 🎯 - Bold dares and revealing questions
5. **Fantasy Zone** ✨ - Safe exploration of fantasies and desires
6. **Love Language Sparks** 💖 - Activities based on love languages
7. **Naughty & Nice Games** 🎲 - Playful mini-games and activities

### Card Types

- **Questions** ❓ - Conversation starters and deep queries
- **Dares** 🎯 - Fun challenges and activities
- **Tasks** ✅ - Specific actions to perform together
- **Mini-Games** 🎲 - Interactive games and activities

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-domain.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abcdef
REACT_APP_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Google AdSense (for $4.99 version)
REACT_APP_GOOGLE_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxx

# App Configuration
REACT_APP_VERSION=basic
REACT_APP_ENABLE_ADS=true
```

### Firebase Setup

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Click "Create a project"
   - Follow the setup wizard

2. **Enable Services**
   - Authentication: Enable Anonymous sign-in
   - Firestore: Create a database in test mode
   - Hosting: Set up for web deployment

3. **Get Configuration**
   - Go to Project Settings → General
   - Scroll to "Your apps" → Web app
   - Copy the configuration values to your `.env` file

## 🚀 Deployment

### Firebase Hosting (Recommended)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init

# Select:
# - Hosting
# - Use existing project
# - Set public directory to 'build'
# - Configure as single-page app: Yes
# - Set up automatic builds with GitHub: Optional

# Build the project
npm run build

# Deploy to Firebase
firebase deploy

# Your game is now live!
```

### Alternative Deployment Options

- **Netlify**: Drag and drop the `build` folder
- **Vercel**: Connect your GitHub repository
- **Heroku**: Use the Node.js buildpack
- **AWS S3**: Upload the build folder to an S3 bucket

## 💳 E-Commerce Integration

### WordPress + WooCommerce Setup

1. **Install WordPress**
   - Purchase hosting (SiteGround, Bluehost, etc.)
   - Install WordPress via one-click installer

2. **Install WooCommerce**
   ```bash
   # In WordPress admin:
   Plugins → Add New → Search "WooCommerce" → Install → Activate
   ```

3. **Configure Products**
   - Basic Version: $4.99 (with ads)
   - Premium Version: $15.99 (ad-free)

4. **Set Up Stripe**
   - Install WooCommerce Stripe Gateway
   - Configure Stripe Atlas account
   - Test payment processing

### License Key System

The game includes license verification for premium features:

```javascript
// Example license verification
const licenseKey = localStorage.getItem('spark_license_key');
const isAdFree = verifyLicense(licenseKey);
```

## 📊 Analytics & Monitoring

### Built-in Analytics

- Game session tracking
- Card interaction metrics
- User engagement data
- Performance monitoring

### Google Analytics Integration

```javascript
// Add to public/index.html
gtag('config', 'GA_MEASUREMENT_ID');
```

## 🎯 Marketing & SEO

### SEO Optimization

- Semantic HTML structure
- Open Graph meta tags
- Twitter Card support
- Mobile-first responsive design
- Fast loading times (<3 seconds)

### Social Media Assets

- Instagram: 1080x1080 game screenshots
- Facebook: 1200x630 promo images
- TikTok: Vertical video demos
- Pinterest: 1000x1500 romantic game ideas

## 🔐 Security & Privacy

### Data Protection

- No sensitive data collection
- Local storage for game state
- GDPR compliant
- Secure Firebase rules
- HTTPS encryption

### Content Moderation

- All prompts reviewed for appropriateness
- Consent-focused language
- Inclusive and respectful content
- Age-appropriate intensity levels

## 🤝 Contributing

### For Developers

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Content Contributions

We welcome new card suggestions! Please ensure they:
- Promote healthy relationships
- Respect boundaries and consent
- Are inclusive and appropriate
- Follow our content guidelines

## 📞 Support & Troubleshooting

### Common Issues

**Game won't start:**
- Check Node.js version (16+ required)
- Run `npm install` again
- Clear browser cache

**Cards not loading:**
- Check console for errors
- Verify game content files exist
- Check network connection

**PWA installation fails:**
- Ensure HTTPS connection
- Clear browser cache
- Check manifest.json validity

### Getting Help

- 📧 Email: support@sparkcouplesgame.com
- 💬 Discord: [Join our community](#)
- 📱 Twitter: [@SparkCouplesGame](#)
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/spark-couples-game/issues)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for beautiful styling
- Framer Motion for smooth animations
- Firebase for backend services
- The couples who inspired this game

## 🔮 Roadmap

### Version 1.1 (Coming Soon)
- [ ] Favorites screen
- [ ] Custom card creation
- [ ] Couples profiles
- [ ] Achievement system

### Version 1.2 (Future)
- [ ] Multiplayer remote sessions
- [ ] Voice prompts
- [ ] Video call integration
- [ ] Relationship coaching tips

---

## 💕 Made with Love

Spark was created to help couples connect, laugh, and grow together. Every card, animation, and feature was designed with love and care to enhance your relationship journey.

**Remember**: The best relationships are built on communication, trust, and shared experiences. Have fun, be respectful, and enjoy discovering new things about each other!

---

*Last updated: January 2024*
*Version: 1.0.0* 