// Activity Log Service - Track daily problem completion for charts

const ACTIVITY_KEY_PREFIX = 'activity_log_';

/**
 * Get storage key for user's activity log
 */
const getStorageKey = (userId) => {
  return `${ACTIVITY_KEY_PREFIX}${userId || 'anonymous'}`;
};

/**
 * Get all activity data for a user
 */
export const getActivityLog = (userId) => {
  try {
    const key = getStorageKey(userId);
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error loading activity log:', error);
    return {};
  }
};

/**
 * Log a problem completion
 */
export const logActivity = (userId) => {
  try {
    const key = getStorageKey(userId);
    const log = getActivityLog(userId);
    const today = new Date().toISOString().split('T')[0];

    // Increment today's count
    log[today] = (log[today] || 0) + 1;

    // Keep only last 365 days of data
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 365);
    const cutoffStr = cutoffDate.toISOString().split('T')[0];

    const filteredLog = {};
    for (const [date, count] of Object.entries(log)) {
      if (date >= cutoffStr) {
        filteredLog[date] = count;
      }
    }

    localStorage.setItem(key, JSON.stringify(filteredLog));

    // Dispatch event for chart updates
    window.dispatchEvent(new CustomEvent('activityLogged', {
      detail: { date: today, count: filteredLog[today] }
    }));

    return filteredLog[today];
  } catch (error) {
    console.error('Error logging activity:', error);
    return 0;
  }
};

/**
 * Get activity for a specific date
 */
export const getActivityForDate = (userId, date) => {
  const log = getActivityLog(userId);
  return log[date] || 0;
};

/**
 * Get total problems completed in last N days
 */
export const getTotalInLastDays = (userId, days) => {
  const log = getActivityLog(userId);
  const today = new Date();
  let total = 0;

  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    total += log[dateStr] || 0;
  }

  return total;
};

/**
 * Get activity stats
 */
export const getActivityStats = (userId) => {
  const log = getActivityLog(userId);
  const entries = Object.entries(log);

  if (entries.length === 0) {
    return {
      totalDays: 0,
      totalProblems: 0,
      averagePerDay: 0,
      bestDay: { date: null, count: 0 },
      currentStreak: 0
    };
  }

  // Calculate totals
  const totalProblems = entries.reduce((sum, [, count]) => sum + count, 0);
  const totalDays = entries.filter(([, count]) => count > 0).length;
  const averagePerDay = totalDays > 0 ? (totalProblems / totalDays).toFixed(1) : 0;

  // Find best day
  const bestDay = entries.reduce(
    (best, [date, count]) => count > best.count ? { date, count } : best,
    { date: null, count: 0 }
  );

  // Calculate current streak
  let currentStreak = 0;
  const today = new Date();
  const checkDate = new Date(today);

  while (true) {
    const dateStr = checkDate.toISOString().split('T')[0];
    if (log[dateStr] && log[dateStr] > 0) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else if (currentStreak === 0) {
      // Allow for checking yesterday if today hasn't been logged yet
      checkDate.setDate(checkDate.getDate() - 1);
      const yesterdayStr = checkDate.toISOString().split('T')[0];
      if (log[yesterdayStr] && log[yesterdayStr] > 0) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    } else {
      break;
    }
  }

  return {
    totalDays,
    totalProblems,
    averagePerDay: parseFloat(averagePerDay),
    bestDay,
    currentStreak
  };
};

/**
 * Migrate activity log from anonymous to authenticated user
 */
export const migrateActivityLog = (fromUserId, toUserId) => {
  try {
    const anonymousLog = getActivityLog(fromUserId);
    const userLog = getActivityLog(toUserId);

    // Merge logs, summing counts for overlapping dates
    const mergedLog = { ...userLog };
    for (const [date, count] of Object.entries(anonymousLog)) {
      mergedLog[date] = (mergedLog[date] || 0) + count;
    }

    const key = getStorageKey(toUserId);
    localStorage.setItem(key, JSON.stringify(mergedLog));

    // Clear anonymous log
    localStorage.removeItem(getStorageKey(fromUserId));

    return true;
  } catch (error) {
    console.error('Error migrating activity log:', error);
    return false;
  }
};
