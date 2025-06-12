// Game Content for Spark: Digital Couples Connection Game
// Based on the specification sections: Warm-Up Flirt, Getting Closer, The Heat Is On, etc.

export const GAME_SECTIONS = {
  WARM_UP: 'warm_up',
  GETTING_CLOSER: 'getting_closer',
  HEAT_IS_ON: 'heat_is_on',
  DARE_OR_BARE: 'dare_or_bare',
  FANTASY_ZONE: 'fantasy_zone',
  LOVE_LANGUAGE: 'love_language',
  NAUGHTY_NICE: 'naughty_nice'
};

export const CARD_TYPES = {
  QUESTION: 'question',
  DARE: 'dare',
  TASK: 'task',
  MINI_GAME: 'mini_game'
};

export const INTENSITY_LEVELS = {
  MILD: 'mild',
  MODERATE: 'moderate',
  SPICY: 'spicy'
};

// Game sections configuration
export const SECTIONS_CONFIG = {
  [GAME_SECTIONS.WARM_UP]: {
    name: 'Warm-Up Flirt',
    description: 'Light, fun questions and dares to set the mood',
    icon: '🔥',
    color: 'from-pink-400 to-rose-500',
    minIntensity: INTENSITY_LEVELS.MILD
  },
  [GAME_SECTIONS.GETTING_CLOSER]: {
    name: 'Getting Closer',
    description: 'Deeper questions and teasing tasks',
    icon: '💕',
    color: 'from-purple-400 to-pink-500',
    minIntensity: INTENSITY_LEVELS.MILD
  },
  [GAME_SECTIONS.HEAT_IS_ON]: {
    name: 'The Heat Is On',
    description: 'Sexy prompts and challenges',
    icon: '🌶️',
    color: 'from-red-400 to-pink-500',
    minIntensity: INTENSITY_LEVELS.MODERATE
  },
  [GAME_SECTIONS.DARE_OR_BARE]: {
    name: 'Dare or Bare',
    description: 'Bold, spicy dares and intimate questions',
    icon: '🎯',
    color: 'from-red-500 to-rose-600',
    minIntensity: INTENSITY_LEVELS.MODERATE
  },
  [GAME_SECTIONS.FANTASY_ZONE]: {
    name: 'Fantasy Zone',
    description: 'Safe exploration of fantasies',
    icon: '✨',
    color: 'from-indigo-400 to-purple-500',
    minIntensity: INTENSITY_LEVELS.MODERATE
  },
  [GAME_SECTIONS.LOVE_LANGUAGE]: {
    name: 'Love Language Sparks',
    description: 'Tasks based on love languages',
    icon: '💖',
    color: 'from-pink-500 to-red-400',
    minIntensity: INTENSITY_LEVELS.MILD
  },
  [GAME_SECTIONS.NAUGHTY_NICE]: {
    name: 'Naughty & Nice Games',
    description: 'Playful mini-games',
    icon: '🎲',
    color: 'from-purple-500 to-indigo-500',
    minIntensity: INTENSITY_LEVELS.MODERATE
  }
};

// Game cards data
export const GAME_CARDS = {
  [GAME_SECTIONS.WARM_UP]: [
    {
      id: 'wu_q1',
      type: CARD_TYPES.QUESTION,
      intensity: INTENSITY_LEVELS.MILD,
      content: "If I were an ice cream flavor, what would I be and why?",
      points: 1
    },
    {
      id: 'wu_q2',
      type: CARD_TYPES.QUESTION,
      intensity: INTENSITY_LEVELS.MILD,
      content: "What's the silliest thing you find attractive about me?",
      points: 1
    },
    {
      id: 'wu_q3',
      type: CARD_TYPES.QUESTION,
      intensity: INTENSITY_LEVELS.MILD,
      content: "What was your first impression of me when we met?",
      points: 1
    },
    {
      id: 'wu_d1',
      type: CARD_TYPES.DARE,
      intensity: INTENSITY_LEVELS.MILD,
      content: "Give me a compliment using only animal comparisons",
      points: 2
    },
    {
      id: 'wu_d2',
      type: CARD_TYPES.DARE,
      intensity: INTENSITY_LEVELS.MILD,
      content: "Show me your most confident pose and hold it for 10 seconds",
      points: 2
    },
    {
      id: 'wu_t1',
      type: CARD_TYPES.TASK,
      intensity: INTENSITY_LEVELS.MILD,
      content: "Hold eye contact for 30 seconds without laughing",
      points: 2
    },
    {
      id: 'wu_q4',
      type: CARD_TYPES.QUESTION,
      intensity: INTENSITY_LEVELS.MILD,
      content: "What's a random skill you'd love to learn together?",
      points: 1
    },
    {
      id: 'wu_q5',
      type: CARD_TYPES.QUESTION,
      intensity: INTENSITY_LEVELS.MILD,
      content: "If we could teleport anywhere right now for a date, where would we go?",
      points: 1
    }
  ],

  [GAME_SECTIONS.GETTING_CLOSER]: [
    {
      id: 'gc_q1',
      type: CARD_TYPES.QUESTION,
      intensity: INTENSITY_LEVELS.MILD,
      content: "What was the moment you knew this relationship was special?",
      points: 2
    },
    {
      id: 'gc_q2',
      type: CARD_TYPES.QUESTION,
      intensity: INTENSITY_LEVELS.MODERATE,
      content: "What's a fear you've never shared about us?",
      points: 3
    },
    {
      id: 'gc_q3',
      type: CARD_TYPES.QUESTION,
      intensity: INTENSITY_LEVELS.MILD,
      content: "What's your favorite memory of us together so far?",
      points: 2
    },
    {
      id: 'gc_d1',
      type: CARD_TYPES.DARE,
      intensity: INTENSITY_LEVELS.MODERATE,
      content: "Recreate our first kiss",
      points: 3
    },
    {
      id: 'gc_t1',
      type: CARD_TYPES.TASK,
      intensity: INTENSITY_LEVELS.MILD,
      content: "Give a 60-second shoulder massage",
      points: 2
    },
    {
      id: 'gc_q4',
      type: CARD_TYPES.QUESTION,
      intensity: INTENSITY_LEVELS.MODERATE,
      content: "What's something about me that turns you on that I might not realize?",
      points: 3
    },
    {
      id: 'gc_q5',
      type: CARD_TYPES.QUESTION,
      intensity: INTENSITY_LEVELS.MILD,
      content: "What's your love language and how do you want me to show it more?",
      points: 2
    },
    {
      id: 'gc_d2',
      type: CARD_TYPES.DARE,
      intensity: INTENSITY_LEVELS.MODERATE,
      content: "Whisper something sweet in my ear that makes me blush",
      points: 3
    }
  ],

  [GAME_SECTIONS.HEAT_IS_ON]: [
    {
      id: 'hio_q1',
      type: CARD_TYPES.QUESTION,
      intensity: INTENSITY_LEVELS.MODERATE,
      content: "What's your favorite way to be kissed?",
      points: 3
    },
    {
      id: 'hio_d1',
      type: CARD_TYPES.DARE,
      intensity: INTENSITY_LEVELS.MODERATE,
      content: "Demonstrate how you like to be kissed",
      points: 4
    },
    {
      id: 'hio_t1',
      type: CARD_TYPES.TASK,
      intensity: INTENSITY_LEVELS.SPICY,
      content: "Trace your favorite parts of my body with ice",
      points: 5
    },
    {
      id: 'hio_q2',
      type: CARD_TYPES.QUESTION,
      intensity: INTENSITY_LEVELS.SPICY,
      content: "What's the sexiest outfit you'd like to see me in?",
      points: 4
    },
    {
      id: 'hio_d2',
      type: CARD_TYPES.DARE,
      intensity: INTENSITY_LEVELS.SPICY,
      content: "Give me a sensual dance for 30 seconds",
      points: 5
    },
    {
      id: 'hio_q3',
      type: CARD_TYPES.QUESTION,
      intensity: INTENSITY_LEVELS.MODERATE,
      content: "Where on your body do you most like to be touched?",
      points: 3
    },
    {
      id: 'hio_t2',
      type: CARD_TYPES.TASK,
      intensity: INTENSITY_LEVELS.MODERATE,
      content: "Blindfold your partner and feed them something sweet",
      points: 4
    }
  ],

  [GAME_SECTIONS.DARE_OR_BARE]: [
    {
      id: 'dob_d1',
      type: CARD_TYPES.DARE,
      intensity: INTENSITY_LEVELS.SPICY,
      content: "Send a suggestive text right now",
      points: 4
    },
    {
      id: 'dob_q1',
      type: CARD_TYPES.QUESTION,
      intensity: INTENSITY_LEVELS.SPICY,
      content: "What's the naughtiest thing you've thought about doing with me?",
      points: 5
    },
    {
      id: 'dob_d2',
      type: CARD_TYPES.DARE,
      intensity: INTENSITY_LEVELS.SPICY,
      content: "Show me your most seductive look",
      points: 4
    },
    {
      id: 'dob_q2',
      type: CARD_TYPES.QUESTION,
      intensity: INTENSITY_LEVELS.SPICY,
      content: "What's a secret turn-on you haven't told me about?",
      points: 5
    },
    {
      id: 'dob_t1',
      type: CARD_TYPES.TASK,
      intensity: INTENSITY_LEVELS.SPICY,
      content: "Remove one piece of clothing",
      points: 5
    },
    {
      id: 'dob_d3',
      type: CARD_TYPES.DARE,
      intensity: INTENSITY_LEVELS.SPICY,
      content: "Describe what you want to do to me right now",
      points: 5
    }
  ],

  [GAME_SECTIONS.FANTASY_ZONE]: [
    {
      id: 'fz_q1',
      type: CARD_TYPES.QUESTION,
      intensity: INTENSITY_LEVELS.MODERATE,
      content: "What's a role-play scenario you'd choose?",
      points: 3
    },
    {
      id: 'fz_q2',
      type: CARD_TYPES.QUESTION,
      intensity: INTENSITY_LEVELS.SPICY,
      content: "Describe your ultimate fantasy date in detail",
      points: 4
    },
    {
      id: 'fz_q3',
      type: CARD_TYPES.QUESTION,
      intensity: INTENSITY_LEVELS.MODERATE,
      content: "What's a fantasy location where you'd like to be intimate?",
      points: 3
    },
    {
      id: 'fz_d1',
      type: CARD_TYPES.DARE,
      intensity: INTENSITY_LEVELS.MODERATE,
      content: "Act out a character from your favorite romantic movie",
      points: 3
    },
    {
      id: 'fz_q4',
      type: CARD_TYPES.QUESTION,
      intensity: INTENSITY_LEVELS.SPICY,
      content: "What's a fantasy you've been shy to share?",
      points: 5
    },
    {
      id: 'fz_t1',
      type: CARD_TYPES.TASK,
      intensity: INTENSITY_LEVELS.MODERATE,
      content: "Create a romantic scenario for our next date night",
      points: 3
    }
  ],

  [GAME_SECTIONS.LOVE_LANGUAGE]: [
    {
      id: 'll_t1',
      type: CARD_TYPES.TASK,
      intensity: INTENSITY_LEVELS.MILD,
      content: "Write down 5 things you find irresistible about me",
      points: 2
    },
    {
      id: 'll_d1',
      type: CARD_TYPES.DARE,
      intensity: INTENSITY_LEVELS.MILD,
      content: "Give me a gift using only things in this room",
      points: 2
    },
    {
      id: 'll_t2',
      type: CARD_TYPES.TASK,
      intensity: INTENSITY_LEVELS.MILD,
      content: "Show me your love through touch for 2 minutes",
      points: 2
    },
    {
      id: 'll_q1',
      type: CARD_TYPES.QUESTION,
      intensity: INTENSITY_LEVELS.MILD,
      content: "How do you feel most loved by me?",
      points: 2
    },
    {
      id: 'll_t3',
      type: CARD_TYPES.TASK,
      intensity: INTENSITY_LEVELS.MILD,
      content: "Plan our perfect quality time activity",
      points: 2
    },
    {
      id: 'll_d2',
      type: CARD_TYPES.DARE,
      intensity: INTENSITY_LEVELS.MILD,
      content: "Do something helpful for me right now",
      points: 2
    }
  ],

  [GAME_SECTIONS.NAUGHTY_NICE]: [
    {
      id: 'nn_mg1',
      type: CARD_TYPES.MINI_GAME,
      intensity: INTENSITY_LEVELS.MODERATE,
      content: "Truth or Dare: Choose and your partner picks the truth or dare",
      points: 3
    },
    {
      id: 'nn_mg2',
      type: CARD_TYPES.MINI_GAME,
      intensity: INTENSITY_LEVELS.MODERATE,
      content: "Guess That Body Part: Close your eyes and guess what part of your partner's body you're touching",
      points: 3
    },
    {
      id: 'nn_mg3',
      type: CARD_TYPES.MINI_GAME,
      intensity: INTENSITY_LEVELS.SPICY,
      content: "Strip Trivia: Answer wrong and remove a piece of clothing",
      points: 4
    },
    {
      id: 'nn_t1',
      type: CARD_TYPES.TASK,
      intensity: INTENSITY_LEVELS.MODERATE,
      content: "Create a couple's bucket list with 10 items",
      points: 3
    },
    {
      id: 'nn_mg4',
      type: CARD_TYPES.MINI_GAME,
      intensity: INTENSITY_LEVELS.MODERATE,
      content: "Compliment Battle: Take turns giving compliments until someone can't think of one",
      points: 3
    }
  ]
};

// Pre-defined game sessions
export const GAME_SESSIONS = {
  quick: {
    name: "Quick Spark",
    duration: 15,
    cardCount: 8,
    sections: [GAME_SECTIONS.WARM_UP, GAME_SECTIONS.GETTING_CLOSER]
  },
  standard: {
    name: "Standard Connection",
    duration: 30,
    cardCount: 15,
    sections: [GAME_SECTIONS.WARM_UP, GAME_SECTIONS.GETTING_CLOSER, GAME_SECTIONS.HEAT_IS_ON]
  },
  extended: {
    name: "Extended Passion",
    duration: 60,
    cardCount: 25,
    sections: Object.values(GAME_SECTIONS)
  }
};

// Utility functions
export const getRandomCards = (sections, count, intensityLevel = INTENSITY_LEVELS.MILD) => {
  const availableCards = [];
  
  sections.forEach(section => {
    if (GAME_CARDS[section]) {
      const sectionCards = GAME_CARDS[section].filter(card => {
        if (intensityLevel === INTENSITY_LEVELS.MILD) return true;
        if (intensityLevel === INTENSITY_LEVELS.MODERATE) return card.intensity !== INTENSITY_LEVELS.SPICY;
        return true; // SPICY includes all
      });
      availableCards.push(...sectionCards);
    }
  });
  
  // Shuffle and return the requested count
  const shuffled = availableCards.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getCardsBySection = (section, intensityLevel = INTENSITY_LEVELS.MILD) => {
  if (!GAME_CARDS[section]) return [];
  
  return GAME_CARDS[section].filter(card => {
    if (intensityLevel === INTENSITY_LEVELS.MILD) return true;
    if (intensityLevel === INTENSITY_LEVELS.MODERATE) return card.intensity !== INTENSITY_LEVELS.SPICY;
    return true;
  });
};

export const getTotalCardsCount = () => {
  return Object.values(GAME_CARDS).reduce((total, sectionCards) => {
    return total + sectionCards.length;
  }, 0);
}; 