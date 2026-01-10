// Achievement Constants - Badge definitions and configuration

export const ACHIEVEMENT_CATEGORIES = {
  PROGRESS: 'progress',
  STREAK: 'streak',
  TIME: 'time',
  MASTERY: 'mastery',
  SPECIAL: 'special'
};

export const ACHIEVEMENTS = {
  // Progress-based achievements
  'first-blood': {
    id: 'first-blood',
    name: 'First Blood',
    description: 'Complete your first problem',
    icon: '🩸',
    category: ACHIEVEMENT_CATEGORIES.PROGRESS,
    xpBonus: 50,
    requirement: { type: 'problems_completed', count: 1 },
    rarity: 'common'
  },
  'getting-started': {
    id: 'getting-started',
    name: 'Getting Started',
    description: 'Complete 5 problems',
    icon: '🚀',
    category: ACHIEVEMENT_CATEGORIES.PROGRESS,
    xpBonus: 100,
    requirement: { type: 'problems_completed', count: 5 },
    rarity: 'common'
  },
  'double-digits': {
    id: 'double-digits',
    name: 'Double Digits',
    description: 'Complete 10 problems',
    icon: '🔟',
    category: ACHIEVEMENT_CATEGORIES.PROGRESS,
    xpBonus: 150,
    requirement: { type: 'problems_completed', count: 10 },
    rarity: 'common'
  },
  'quarter-century': {
    id: 'quarter-century',
    name: 'Quarter Century',
    description: 'Complete 25 problems',
    icon: '🎯',
    category: ACHIEVEMENT_CATEGORIES.PROGRESS,
    xpBonus: 250,
    requirement: { type: 'problems_completed', count: 25 },
    rarity: 'uncommon'
  },
  'half-century': {
    id: 'half-century',
    name: 'Half Century',
    description: 'Complete 50 problems',
    icon: '⭐',
    category: ACHIEVEMENT_CATEGORIES.PROGRESS,
    xpBonus: 400,
    requirement: { type: 'problems_completed', count: 50 },
    rarity: 'rare'
  },
  'centurion': {
    id: 'centurion',
    name: 'Centurion',
    description: 'Complete 100 problems',
    icon: '💯',
    category: ACHIEVEMENT_CATEGORIES.PROGRESS,
    xpBonus: 750,
    requirement: { type: 'problems_completed', count: 100 },
    rarity: 'epic'
  },
  'problem-slayer': {
    id: 'problem-slayer',
    name: 'Problem Slayer',
    description: 'Complete 200 problems',
    icon: '⚔️',
    category: ACHIEVEMENT_CATEGORIES.PROGRESS,
    xpBonus: 1500,
    requirement: { type: 'problems_completed', count: 200 },
    rarity: 'legendary'
  },

  // Streak-based achievements
  'streak-starter': {
    id: 'streak-starter',
    name: 'Streak Starter',
    description: 'Achieve a 3-day streak',
    icon: '🔥',
    category: ACHIEVEMENT_CATEGORIES.STREAK,
    xpBonus: 75,
    requirement: { type: 'streak', count: 3 },
    rarity: 'common'
  },
  'streak-warrior': {
    id: 'streak-warrior',
    name: 'Streak Warrior',
    description: 'Achieve a 7-day streak',
    icon: '💪',
    category: ACHIEVEMENT_CATEGORIES.STREAK,
    xpBonus: 200,
    requirement: { type: 'streak', count: 7 },
    rarity: 'uncommon'
  },
  'streak-master': {
    id: 'streak-master',
    name: 'Streak Master',
    description: 'Achieve a 14-day streak',
    icon: '🏆',
    category: ACHIEVEMENT_CATEGORIES.STREAK,
    xpBonus: 400,
    requirement: { type: 'streak', count: 14 },
    rarity: 'rare'
  },
  'streak-legend': {
    id: 'streak-legend',
    name: 'Streak Legend',
    description: 'Achieve a 30-day streak',
    icon: '👑',
    category: ACHIEVEMENT_CATEGORIES.STREAK,
    xpBonus: 1000,
    requirement: { type: 'streak', count: 30 },
    rarity: 'legendary'
  },

  // Time-based achievements
  'night-owl': {
    id: 'night-owl',
    name: 'Night Owl',
    description: 'Complete a problem after 10 PM',
    icon: '🦉',
    category: ACHIEVEMENT_CATEGORIES.TIME,
    xpBonus: 50,
    requirement: { type: 'time_of_day', after: 22 },
    rarity: 'uncommon'
  },
  'early-bird': {
    id: 'early-bird',
    name: 'Early Bird',
    description: 'Complete a problem before 7 AM',
    icon: '🐦',
    category: ACHIEVEMENT_CATEGORIES.TIME,
    xpBonus: 50,
    requirement: { type: 'time_of_day', before: 7 },
    rarity: 'uncommon'
  },
  'weekend-warrior': {
    id: 'weekend-warrior',
    name: 'Weekend Warrior',
    description: 'Complete 5 problems on a weekend',
    icon: '🎮',
    category: ACHIEVEMENT_CATEGORIES.TIME,
    xpBonus: 100,
    requirement: { type: 'weekend_problems', count: 5 },
    rarity: 'uncommon'
  },

  // Mastery achievements
  'topic-master': {
    id: 'topic-master',
    name: 'Topic Master',
    description: 'Complete 100% of any topic',
    icon: '🎓',
    category: ACHIEVEMENT_CATEGORIES.MASTERY,
    xpBonus: 300,
    requirement: { type: 'topic_complete' },
    rarity: 'rare'
  },
  'easy-peasy': {
    id: 'easy-peasy',
    name: 'Easy Peasy',
    description: 'Complete 10 Easy problems',
    icon: '🟢',
    category: ACHIEVEMENT_CATEGORIES.MASTERY,
    xpBonus: 100,
    requirement: { type: 'difficulty', difficulty: 'Easy', count: 10 },
    rarity: 'common'
  },
  'medium-rare': {
    id: 'medium-rare',
    name: 'Medium Rare',
    description: 'Complete 10 Medium problems',
    icon: '🟡',
    category: ACHIEVEMENT_CATEGORIES.MASTERY,
    xpBonus: 200,
    requirement: { type: 'difficulty', difficulty: 'Medium', count: 10 },
    rarity: 'uncommon'
  },
  'hard-core': {
    id: 'hard-core',
    name: 'Hard Core',
    description: 'Complete 10 Hard problems',
    icon: '🔴',
    category: ACHIEVEMENT_CATEGORIES.MASTERY,
    xpBonus: 500,
    requirement: { type: 'difficulty', difficulty: 'Hard', count: 10 },
    rarity: 'epic'
  },

  // Special achievements
  'daily-devotee': {
    id: 'daily-devotee',
    name: 'Daily Devotee',
    description: 'Complete 7 daily challenges',
    icon: '📅',
    category: ACHIEVEMENT_CATEGORIES.SPECIAL,
    xpBonus: 300,
    requirement: { type: 'daily_challenges', count: 7 },
    rarity: 'rare'
  },
  'bookworm': {
    id: 'bookworm',
    name: 'Bookworm',
    description: 'Bookmark 10 problems',
    icon: '📚',
    category: ACHIEVEMENT_CATEGORIES.SPECIAL,
    xpBonus: 50,
    requirement: { type: 'bookmarks', count: 10 },
    rarity: 'common'
  },
  'note-taker': {
    id: 'note-taker',
    name: 'Note Taker',
    description: 'Add notes to 5 problems',
    icon: '📝',
    category: ACHIEVEMENT_CATEGORIES.SPECIAL,
    xpBonus: 50,
    requirement: { type: 'notes', count: 5 },
    rarity: 'common'
  }
};

// Rarity colors and labels
export const RARITY_CONFIG = {
  common: { color: '#9ca3af', label: 'Common', bgColor: 'rgba(156, 163, 175, 0.1)' },
  uncommon: { color: '#10b981', label: 'Uncommon', bgColor: 'rgba(16, 185, 129, 0.1)' },
  rare: { color: '#3b82f6', label: 'Rare', bgColor: 'rgba(59, 130, 246, 0.1)' },
  epic: { color: '#8b5cf6', label: 'Epic', bgColor: 'rgba(139, 92, 246, 0.1)' },
  legendary: { color: '#f59e0b', label: 'Legendary', bgColor: 'rgba(245, 158, 11, 0.1)' }
};

// Get achievement by ID
export const getAchievement = (id) => ACHIEVEMENTS[id];

// Get all achievements
export const getAllAchievements = () => Object.values(ACHIEVEMENTS);

// Get achievements by category
export const getAchievementsByCategory = (category) =>
  Object.values(ACHIEVEMENTS).filter(a => a.category === category);

// Get total possible XP from achievements
export const getTotalAchievementXP = () =>
  Object.values(ACHIEVEMENTS).reduce((sum, a) => sum + a.xpBonus, 0);
