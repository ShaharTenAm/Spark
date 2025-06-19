#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up Spark Couples Game Development Environment...\n');

// Create environment files
const createEnvFiles = () => {
  console.log('📝 Creating environment configuration files...');
  
  // Backend .env
  const backendEnv = `# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/spark-couples-game

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-change-this-in-production

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Frontend URLs (for CORS)
FRONTEND_URL=http://localhost:3000

# Admin Access Codes (comma-separated)
ADMIN_ACCESS_CODES=ADMIN123,TESTCODE

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
`;

  // Frontend .env
  const frontendEnv = `# API Configuration
REACT_APP_API_URL=http://localhost:5000/api

# Stripe Configuration (public key)
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key_here

# App Configuration
REACT_APP_APP_NAME=Spark Couples Game
REACT_APP_VERSION=1.0.0
`;

  // Write backend .env
  if (!fs.existsSync('backend/.env')) {
    fs.writeFileSync('backend/.env', backendEnv);
    console.log('✅ Created backend/.env');
  } else {
    console.log('⚠️  backend/.env already exists, skipping...');
  }

  // Write frontend .env
  if (!fs.existsSync('frontend/.env')) {
    fs.writeFileSync('frontend/.env', frontendEnv);
    console.log('✅ Created frontend/.env');
  } else {
    console.log('⚠️  frontend/.env already exists, skipping...');
  }
};

// Install dependencies
const installDependencies = () => {
  console.log('\n📦 Installing dependencies...');
  
  try {
    console.log('Installing backend dependencies...');
    process.chdir('backend');
    execSync('npm install', { stdio: 'inherit' });
    
    console.log('Installing frontend dependencies...');
    process.chdir('../frontend');
    execSync('npm install', { stdio: 'inherit' });
    
    process.chdir('..');
    console.log('✅ Dependencies installed successfully');
  } catch (error) {
    console.error('❌ Error installing dependencies:', error.message);
    process.exit(1);
  }
};

// Create additional configuration files
const createConfigFiles = () => {
  console.log('\n⚙️  Creating additional configuration files...');
  
  // Vercel configuration for frontend
  const vercelConfig = {
    "name": "spark-couples-game",
    "builds": [
      {
        "src": "frontend/package.json",
        "use": "@vercel/static-build",
        "config": {
          "distDir": "build"
        }
      }
    ],
    "routes": [
      {
        "src": "/static/(.*)",
        "dest": "/static/$1"
      },
      {
        "src": "/(.*)",
        "dest": "/index.html"
      }
    ],
    "env": {
      "REACT_APP_API_URL": "@api-url"
    }
  };

  if (!fs.existsSync('vercel.json')) {
    fs.writeFileSync('vercel.json', JSON.stringify(vercelConfig, null, 2));
    console.log('✅ Created vercel.json for frontend deployment');
  }

  // Docker configuration for backend
  const dockerfile = `FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
`;

  if (!fs.existsSync('backend/Dockerfile')) {
    fs.writeFileSync('backend/Dockerfile', dockerfile);
    console.log('✅ Created backend/Dockerfile');
  }

  // GitHub Actions workflow
  const githubWorkflow = {
    "name": "CI/CD Pipeline",
    "on": {
      "push": {
        "branches": ["main", "develop"]
      },
      "pull_request": {
        "branches": ["main"]
      }
    },
    "jobs": {
      "test": {
        "runs-on": "ubuntu-latest",
        "steps": [
          {
            "uses": "actions/checkout@v3"
          },
          {
            "name": "Setup Node.js",
            "uses": "actions/setup-node@v3",
            "with": {
              "node-version": "18"
            }
          },
          {
            "name": "Install dependencies",
            "run": "npm run install:all"
          },
          {
            "name": "Run tests",
            "run": "npm run test:all"
          }
        ]
      }
    }
  };

  const workflowDir = '.github/workflows';
  if (!fs.existsSync(workflowDir)) {
    fs.mkdirSync(workflowDir, { recursive: true });
  }

  if (!fs.existsSync(`${workflowDir}/ci.yml`)) {
    fs.writeFileSync(`${workflowDir}/ci.yml`, JSON.stringify(githubWorkflow, null, 2));
    console.log('✅ Created GitHub Actions workflow');
  }
};

// Create root package.json with scripts
const createRootPackageJson = () => {
  const rootPackage = {
    "name": "spark-couples-game",
    "version": "1.0.0",
    "description": "The Ultimate Couples Connection Game",
    "private": true,
    "scripts": {
      "install:backend": "cd backend && npm install",
      "install:frontend": "cd frontend && npm install",
      "install:all": "npm run install:backend && npm run install:frontend",
      "start:backend": "cd backend && npm start",
      "start:frontend": "cd frontend && npm start",
      "dev:backend": "cd backend && npm run dev",
      "dev:frontend": "cd frontend && npm start",
      "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\"",
      "build:frontend": "cd frontend && npm run build",
      "test:backend": "cd backend && npm test",
      "test:frontend": "cd frontend && npm test",
      "test:all": "npm run test:backend && npm run test:frontend",
      "lint:backend": "cd backend && npm run lint",
      "lint:frontend": "cd frontend && npm run lint",
      "lint:all": "npm run lint:backend && npm run lint:frontend",
      "seed": "cd backend && node -e \"require('./src/utils/pdfParser.js'); console.log('Seeding database...')\""
    },
    "devDependencies": {
      "concurrently": "^7.6.0"
    },
    "keywords": [
      "couples-game",
      "card-game",
      "nodejs",
      "react",
      "mongodb"
    ],
    "author": "Spark Couples Game",
    "license": "PROPRIETARY"
  };

  if (!fs.existsSync('package.json')) {
    fs.writeFileSync('package.json', JSON.stringify(rootPackage, null, 2));
    console.log('✅ Created root package.json');
  }
};

// Check system requirements
const checkRequirements = () => {
  console.log('🔍 Checking system requirements...');
  
  try {
    const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
    console.log(`✅ Node.js version: ${nodeVersion}`);
    
    const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
    console.log(`✅ npm version: ${npmVersion}`);
    
    // Check if MongoDB is running (optional)
    try {
      execSync('mongosh --version', { encoding: 'utf8', stdio: 'ignore' });
      console.log('✅ MongoDB CLI detected');
    } catch {
      console.log('⚠️  MongoDB CLI not found (install MongoDB locally or use MongoDB Atlas)');
    }
    
  } catch (error) {
    console.error('❌ System requirements check failed:', error.message);
    process.exit(1);
  }
};

// Show next steps
const showNextSteps = () => {
  console.log('\n🎉 Setup completed successfully!\n');
  console.log('📋 Next steps:');
  console.log('1. Update environment variables in backend/.env and frontend/.env');
  console.log('2. Start MongoDB (locally or use MongoDB Atlas)');
  console.log('3. Run the development servers:');
  console.log('   npm run dev:backend    (in one terminal)');
  console.log('   npm run dev:frontend   (in another terminal)');
  console.log('4. Or run both simultaneously:');
  console.log('   npm run dev');
  console.log('\n🌐 URLs:');
  console.log('   Frontend: http://localhost:3000');
  console.log('   Backend:  http://localhost:5000');
  console.log('   API:      http://localhost:5000/api');
  console.log('   Health:   http://localhost:5000/health');
  console.log('\n💡 Pro tip: Install the Spark PDF in the root directory for card parsing');
};

// Main setup function
const main = () => {
  try {
    checkRequirements();
    createEnvFiles();
    createRootPackageJson();
    installDependencies();
    createConfigFiles();
    showNextSteps();
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
};

// Run setup
main(); 