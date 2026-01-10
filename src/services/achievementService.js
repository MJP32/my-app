// Achievement Service - Track and award achievements

import { ACHIEVEMENTS, getAchievement } from './achievementConstants';
import { awardXP } from './gamificationService';

const ACHIEVEMENTS_KEY_PREFIX = 'achievements_';

/**
 * Get storage key for user's achievements
 */
const getStorageKey = (userId) => {
  return `${ACHIEVEMENTS_KEY_PREFIX}${userId || 'anonymous'}`;
};

/**
 * Get user's achievement data
 */
export const getAchievementData = (userId) => {
  try {
    const key = getStorageKey(userId);
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : {
      earned: [],
      earnedAt: {},
      progress: {}
    };
  } catch (error) {
    console.error('Error loading achievements:', error);
    return { earned: [], earnedAt: {}, progress: {} };
  }
};

/**
 * Save user's achievement data
 */
const saveAchievementData = (userId, data) => {
  try {
    const key = getStorageKey(userId);
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving achievements:', error);
    return false;
  }
};

/**
 * Check if user has earned an achievement
 */
export const hasAchievement = (userId, achievementId) => {
  const data = getAchievementData(userId);
  return data.earned.includes(achievementId);
};

/**
 * Award an achievement to a user
 */
export const awardAchievement = (userId, achievementId) => {
  const achievement = getAchievement(achievementId);
  if (!achievement) {
    console.error('Achievement not found:', achievementId);
    return null;
  }

  // Check if already earned
  if (hasAchievement(userId, achievementId)) {
    return null;
  }

  // Update achievement data
  const data = getAchievementData(userId);
  data.earned.push(achievementId);
  data.earnedAt[achievementId] = new Date().toISOString();
  saveAchievementData(userId, data);

  // Award XP bonus
  if (achievement.xpBonus) {
    awardXP(userId, achievement.xpBonus, `Achievement: ${achievement.name}`);
  }

  // Dispatch event for notification
  window.dispatchEvent(new CustomEvent('achievementEarned', {
    detail: { achievement, userId }
  }));

  console.log(`🏆 Achievement unlocked: ${achievement.name}`);
  return achievement;
};

/**
 * Update progress for an achievement
 */
export const updateProgress = (userId, achievementId, value) => {
  const data = getAchievementData(userId);
  data.progress[achievementId] = value;
  saveAchievementData(userId, data);
};

/**
 * Get progress for an achievement
 */
export const getProgress = (userId, achievementId) => {
  const data = getAchievementData(userId);
  return data.progress[achievementId] || 0;
};

/**
 * Check and award achievements based on problem completion
 */
export const checkProblemCompletionAchievements = (userId, totalCompleted, difficulty) => {
  const awarded = [];

  // Progress-based achievements
  const progressAchievements = [
    { id: 'first-blood', count: 1 },
    { id: 'getting-started', count: 5 },
    { id: 'double-digits', count: 10 },
    { id: 'quarter-century', count: 25 },
    { id: 'half-century', count: 50 },
    { id: 'centurion', count: 100 },
    { id: 'problem-slayer', count: 200 }
  ];

  for (const { id, count } of progressAchievements) {
    if (totalCompleted >= count && !hasAchievement(userId, id)) {
      const achievement = awardAchievement(userId, id);
      if (achievement) awarded.push(achievement);
    }
  }

  // Time-based achievements
  const hour = new Date().getHours();
  if (hour >= 22 && !hasAchievement(userId, 'night-owl')) {
    const achievement = awardAchievement(userId, 'night-owl');
    if (achievement) awarded.push(achievement);
  }
  if (hour < 7 && !hasAchievement(userId, 'early-bird')) {
    const achievement = awardAchievement(userId, 'early-bird');
    if (achievement) awarded.push(achievement);
  }

  // Difficulty-based achievements (track progress)
  if (difficulty) {
    const difficultyKey = `${difficulty.toLowerCase()}_completed`;
    const data = getAchievementData(userId);
    const currentCount = (data.progress[difficultyKey] || 0) + 1;
    updateProgress(userId, difficultyKey, currentCount);

    const difficultyAchievements = {
      'Easy': { id: 'easy-peasy', count: 10 },
      'Medium': { id: 'medium-rare', count: 10 },
      'Hard': { id: 'hard-core', count: 10 }
    };

    const diffAchievement = difficultyAchievements[difficulty];
    if (diffAchievement && currentCount >= diffAchievement.count) {
      if (!hasAchievement(userId, diffAchievement.id)) {
        const achievement = awardAchievement(userId, diffAchievement.id);
        if (achievement) awarded.push(achievement);
      }
    }
  }

  return awarded;
};

/**
 * Check and award streak achievements
 */
export const checkStreakAchievements = (userId, currentStreak) => {
  const awarded = [];

  const streakAchievements = [
    { id: 'streak-starter', count: 3 },
    { id: 'streak-warrior', count: 7 },
    { id: 'streak-master', count: 14 },
    { id: 'streak-legend', count: 30 }
  ];

  for (const { id, count } of streakAchievements) {
    if (currentStreak >= count && !hasAchievement(userId, id)) {
      const achievement = awardAchievement(userId, id);
      if (achievement) awarded.push(achievement);
    }
  }

  return awarded;
};

/**
 * Check and award bookmark achievements
 */
export const checkBookmarkAchievements = (userId, bookmarkCount) => {
  if (bookmarkCount >= 10 && !hasAchievement(userId, 'bookworm')) {
    return awardAchievement(userId, 'bookworm');
  }
  return null;
};

/**
 * Check and award notes achievements
 */
export const checkNotesAchievements = (userId, notesCount) => {
  if (notesCount >= 5 && !hasAchievement(userId, 'note-taker')) {
    return awardAchievement(userId, 'note-taker');
  }
  return null;
};

/**
 * Check and award daily challenge achievements
 */
export const checkDailyChallengeAchievements = (userId, completedCount) => {
  if (completedCount >= 7 && !hasAchievement(userId, 'daily-devotee')) {
    return awardAchievement(userId, 'daily-devotee');
  }
  return null;
};

/**
 * Check and award topic mastery achievements
 */
export const checkTopicMasteryAchievements = (userId, isTopicComplete) => {
  if (isTopicComplete && !hasAchievement(userId, 'topic-master')) {
    return awardAchievement(userId, 'topic-master');
  }
  return null;
};

/**
 * Get all earned achievements for a user
 */
export const getEarnedAchievements = (userId) => {
  const data = getAchievementData(userId);
  return data.earned.map(id => ({
    ...getAchievement(id),
    earnedAt: data.earnedAt[id]
  })).filter(Boolean);
};

/**
 * Get achievement statistics for a user
 */
export const getAchievementStats = (userId) => {
  const data = getAchievementData(userId);
  const totalAchievements = Object.keys(ACHIEVEMENTS).length;
  const earnedCount = data.earned.length;
  const totalXP = data.earned.reduce((sum, id) => {
    const achievement = getAchievement(id);
    return sum + (achievement?.xpBonus || 0);
  }, 0);

  return {
    earned: earnedCount,
    total: totalAchievements,
    percentage: Math.round((earnedCount / totalAchievements) * 100),
    totalXP
  };
};

/**
 * Migrate achievements from anonymous to authenticated user
 */
export const migrateAchievements = (fromUserId, toUserId) => {
  try {
    const anonymousData = getAchievementData(fromUserId);
    const userData = getAchievementData(toUserId);

    // Merge achievements
    const mergedEarned = [...new Set([...anonymousData.earned, ...userData.earned])];
    const mergedEarnedAt = { ...anonymousData.earnedAt, ...userData.earnedAt };
    const mergedProgress = { ...anonymousData.progress, ...userData.progress };

    const mergedData = {
      earned: mergedEarned,
      earnedAt: mergedEarnedAt,
      progress: mergedProgress
    };

    saveAchievementData(toUserId, mergedData);
    localStorage.removeItem(getStorageKey(fromUserId));

    return true;
  } catch (error) {
    console.error('Error migrating achievements:', error);
    return false;
  }
};
