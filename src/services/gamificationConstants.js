// Gamification Constants - XP values, level thresholds, and configuration

export const XP_CONFIG = {
  // XP awarded for completing problems by difficulty
  problemCompletion: {
    Easy: 25,
    Medium: 50,
    Hard: 100
  },

  // XP for daily activities
  dailyLogin: 10,
  firstProblemOfDayBonus: 10,

  // Streak milestone bonuses (streak day: bonus XP)
  streakMilestones: {
    3: 50,
    7: 150,
    14: 300,
    30: 750,
    60: 1500,
    100: 3000
  }
}

// Level thresholds - XP required to reach each level (index = level)
// Level 0 = 0 XP, Level 1 = 100 XP, Level 2 = 250 XP, etc.
export const LEVEL_THRESHOLDS = [
  0,      // Level 0 (starting)
  100,    // Level 1
  250,    // Level 2
  500,    // Level 3
  850,    // Level 4
  1300,   // Level 5
  1800,   // Level 6
  2500,   // Level 7
  3400,   // Level 8
  4500,   // Level 9
  5800,   // Level 10
  7300,   // Level 11
  9000,   // Level 12
  11000,  // Level 13
  13500,  // Level 14
  16500,  // Level 15
  20000,  // Level 16
  24000,  // Level 17
  29000,  // Level 18
  35000   // Level 19 (max level)
]

// Level names/titles for display
export const LEVEL_NAMES = [
  'Novice',           // 0
  'Apprentice',       // 1
  'Student',          // 2
  'Practitioner',     // 3
  'Developer',        // 4
  'Engineer',         // 5
  'Senior Dev',       // 6
  'Lead Dev',         // 7
  'Architect',        // 8
  'Senior Architect', // 9
  'Principal',        // 10
  'Staff Engineer',   // 11
  'Senior Staff',     // 12
  'Distinguished',    // 13
  'Fellow',           // 14
  'Senior Fellow',    // 15
  'Expert',           // 16
  'Master',           // 17
  'Grandmaster',      // 18
  'Legend'            // 19
]

// Colors for level badges (gradient from green to gold)
export const LEVEL_COLORS = [
  '#6b7280', // 0 - Gray
  '#22c55e', // 1 - Green
  '#16a34a', // 2 - Dark Green
  '#14b8a6', // 3 - Teal
  '#06b6d4', // 4 - Cyan
  '#0ea5e9', // 5 - Light Blue
  '#3b82f6', // 6 - Blue
  '#6366f1', // 7 - Indigo
  '#8b5cf6', // 8 - Violet
  '#a855f7', // 9 - Purple
  '#d946ef', // 10 - Fuchsia
  '#ec4899', // 11 - Pink
  '#f43f5e', // 12 - Rose
  '#ef4444', // 13 - Red
  '#f97316', // 14 - Orange
  '#eab308', // 15 - Yellow
  '#fbbf24', // 16 - Amber
  '#fcd34d', // 17 - Light Amber
  '#fde047', // 18 - Light Yellow
  '#fef08a'  // 19 - Gold
]

// Maximum level
export const MAX_LEVEL = LEVEL_THRESHOLDS.length - 1

// Helper function to get level from XP
export function getLevelFromXP(xp) {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) {
      return i
    }
  }
  return 0
}

// Helper function to get XP needed for next level
export function getXPForNextLevel(currentLevel) {
  if (currentLevel >= MAX_LEVEL) {
    return null // Already at max level
  }
  return LEVEL_THRESHOLDS[currentLevel + 1]
}

// Helper function to get progress percentage to next level
export function getLevelProgress(xp) {
  const level = getLevelFromXP(xp)
  if (level >= MAX_LEVEL) {
    return 100 // Max level
  }

  const currentLevelXP = LEVEL_THRESHOLDS[level]
  const nextLevelXP = LEVEL_THRESHOLDS[level + 1]
  const xpInCurrentLevel = xp - currentLevelXP
  const xpNeededForLevel = nextLevelXP - currentLevelXP

  return Math.floor((xpInCurrentLevel / xpNeededForLevel) * 100)
}
