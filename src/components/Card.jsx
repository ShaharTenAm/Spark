// Card Component for Spark: Digital Couples Connection Game
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CARD_TYPES, INTENSITY_LEVELS, SECTIONS_CONFIG } from '../data/gameContent';

const Card = ({ 
  card, 
  isFlipped = false, 
  onFlip, 
  onFavorite, 
  isFavorite = false,
  className = "" 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!card) {
    return (
      <div className="card w-80 h-96 flex items-center justify-center">
        <div className="text-gray-400 text-center">
          <i className="fas fa-heart text-4xl mb-4"></i>
          <p>No more cards!</p>
        </div>
      </div>
    );
  }

  // Get card type styling
  const getCardTypeIcon = (type) => {
    switch (type) {
      case CARD_TYPES.QUESTION:
        return '❓';
      case CARD_TYPES.DARE:
        return '🎯';
      case CARD_TYPES.TASK:
        return '✅';
      case CARD_TYPES.MINI_GAME:
        return '🎲';
      default:
        return '💕';
    }
  };

  const getIntensityColor = (intensity) => {
    switch (intensity) {
      case INTENSITY_LEVELS.MILD:
        return 'bg-green-100 text-green-800';
      case INTENSITY_LEVELS.MODERATE:
        return 'bg-yellow-100 text-yellow-800';
      case INTENSITY_LEVELS.SPICY:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const cardVariants = {
    front: {
      rotateY: 0,
      transition: { duration: 0.6, ease: "easeInOut" }
    },
    back: {
      rotateY: 180,
      transition: { duration: 0.6, ease: "easeInOut" }
    }
  };

  const hoverVariants = {
    hover: {
      scale: 1.05,
      y: -10,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  return (
    <motion.div
      className={`relative w-80 h-96 cursor-pointer ${className}`}
      style={{ perspective: '1000px' }}
      variants={hoverVariants}
      whileHover="hover"
      whileTap="tap"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onFlip}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isFlipped ? 'back' : 'front'}
          className="absolute inset-0 w-full h-full"
          variants={cardVariants}
          initial={isFlipped ? "front" : "back"}
          animate={isFlipped ? "back" : "front"}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {!isFlipped ? (
            // Card Front (Back of card - before flip)
            <div className="card card-front w-full h-full relative overflow-hidden">
              <div className="absolute inset-0 bg-romantic-gradient opacity-90"></div>
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
                {/* Spark Logo/Branding */}
                <motion.div
                  className="mb-6"
                  animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-6xl mb-2">✨</div>
                  <h2 className="font-romantic text-2xl font-bold text-white">
                    Spark
                  </h2>
                  <p className="text-white/80 text-sm">
                    Couples Connection
                  </p>
                </motion.div>
                
                {/* Decorative hearts */}
                <div className="absolute top-4 left-4 text-white/30 text-xl">
                  💕
                </div>
                <div className="absolute top-6 right-6 text-white/20 text-lg">
                  💖
                </div>
                <div className="absolute bottom-8 left-6 text-white/25 text-2xl">
                  💝
                </div>
                <div className="absolute bottom-4 right-4 text-white/30 text-xl">
                  💞
                </div>
                
                {/* Tap to reveal instruction */}
                <motion.div
                  className="mt-8 text-white/90 text-sm font-medium"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <i className="fas fa-hand-pointer mr-2"></i>
                  Tap to reveal
                </motion.div>
              </div>
            </div>
          ) : (
            // Card Back (Front of card - after flip)
            <div className="card w-full h-full relative overflow-hidden bg-white">
              {/* Card Header */}
              <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-r from-romantic-pink/10 to-romantic-purple/10">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">
                      {getCardTypeIcon(card.type)}
                    </span>
                    <div>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getIntensityColor(card.intensity)}`}>
                        {card.intensity.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  {/* Favorite button */}
                  <motion.button
                    className={`p-2 rounded-full transition-colors ${
                      isFavorite 
                        ? 'text-romantic-red bg-romantic-red/10' 
                        : 'text-gray-400 hover:text-romantic-red hover:bg-romantic-red/5'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onFavorite && onFavorite(card.id);
                    }}
                  >
                    <i className={`fas fa-heart text-lg ${isFavorite ? 'text-romantic-red' : ''}`}></i>
                  </motion.button>
                </div>
              </div>

              {/* Card Content */}
              <div className="pt-20 pb-16 px-6 h-full flex flex-col justify-center">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <p className="text-gray-800 text-lg leading-relaxed font-medium mb-6">
                    {card.content}
                  </p>
                  
                  {/* Card type label */}
                  <div className="mt-auto">
                    <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium capitalize">
                      {card.type.replace('_', ' ')}
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Card Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-r from-romantic-pink/5 to-romantic-purple/5">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">
                    Points: {card.points}
                  </span>
                  <span className="text-gray-400 text-xs">
                    ID: {card.id}
                  </span>
                </div>
              </div>

              {/* Decorative corner elements */}
              <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-romantic-pink/20 rounded-tr-lg"></div>
              <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-romantic-purple/20 rounded-bl-lg"></div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default Card; 