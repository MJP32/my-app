// Gamification Service - Core logic for streaks, XP, and levels

import {
  XP_CONFIG,
  LEVEL_THRESHOLDS,
  LEVEL_NAMES,
  LEVEL_COLORS,
  MAX_LEVEL,
  getLevelFromXP,
  getXPForNextLevel,
  getLevelProgress
} from './gamificationConstants.js'

const STORAGE_KEY_PREFIX = 'gamification_data_'

// Get storage key for current user
function getStorageKey(uid) {
  return `${STORAGE_KEY_PREFIX}${uid || 'anonymous'}`
}

// Get today's date as YYYY-MM-DD
function getTodayDate() {
  return new Date().toISOString().split('T')[0]
}

// Get yesterday's date as YYYY-MM-DD
function getYesterdayDate() {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return yesterday.toISOString().split('T')[0]
}

// Create initial gamification data structure
function createInitialData() {
  return {
    streak: {
      current: 0,
      longest: 0,
      lastActivityDate: null
    },
    xp: {
      total: 0,
      todayXP: 0,
      todayDate: getTodayDate(),
      history: [] // Last 50 XP transactions
    },
    level: {
      current: 0,
      name: LEVEL_NAMES[0],
      color: LEVEL_COLORS[0]
    },
    completedToday: [], // Problem IDs completed today
    firstProblemTodayAwarded: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
}

// Initialize gamification data for a user
export function initializeGamification(uid) {
  const key = getStorageKey(uid)
  const existing = localStorage.getItem(key)

  if (!existing) {
    const initialData = createInitialData()
    localStorage.setItem(key, JSON.stringify(initialData))
    return initialData
  }

  return JSON.parse(existing)
}

// Get current gamification data
export function getGamificationData(uid) {
  const key = getStorageKey(uid)
  const data = localStorage.getItem(key)

  if (!data) {
    return initializeGamification(uid)
  }

  const parsed = JSON.parse(data)

  // Reset daily data if it's a new day
  if (parsed.xp.todayDate !== getTodayDate()) {
    parsed.xp.todayXP = 0
    parsed.xp.todayDate = getTodayDate()
    parsed.completedToday = []
    parsed.firstProblemTodayAwarded = false
    saveGamificationData(uid, parsed)
  }

  return parsed
}

// Save gamification data
export function saveGamificationData(uid, data) {
  const key = getStorageKey(uid)
  data.updatedAt = new Date().toISOString()
  localStorage.setItem(key, JSON.stringify(data))
}

// Check and update streak status (call on app load)
export function checkStreakStatus(uid) {
  const data = getGamificationData(uid)
  const today = getTodayDate()
  const yesterday = getYesterdayDate()
  const lastActivity = data.streak.lastActivityDate

  let streakUpdated = false
  let isNewDay = false

  // If last activity was before yesterday, reset streak
  if (lastActivity && lastActivity !== today && lastActivity !== yesterday) {
    if (data.streak.current > 0) {
      data.streak.current = 0
      streakUpdated = true
    }
  }

  // Check if this is a new day for the user
  if (lastActivity !== today) {
    isNewDay = true
  }

  if (streakUpdated) {
    saveGamificationData(uid, data)
  }

  // Emit streak update event
  if (streakUpdated || isNewDay) {
    emitEvent('streakUpdated', {
      current: data.streak.current,
      longest: data.streak.longest,
      isNewDay
    })
  }

  return {
    current: data.streak.current,
    longest: data.streak.longest,
    lastActivityDate: data.streak.lastActivityDate,
    isNewDay
  }
}

// Update streak when user completes activity
function updateStreak(data) {
  const today = getTodayDate()
  const yesterday = getYesterdayDate()
  const lastActivity = data.streak.lastActivityDate

  // Already active today
  if (lastActivity === today) {
    return { streakChanged: false, milestoneReached: null }
  }

  let streakChanged = false
  let milestoneReached = null

  // Continuing streak from yesterday or starting fresh
  if (lastActivity === yesterday) {
    data.streak.current += 1
    streakChanged = true
  } else if (!lastActivity || lastActivity !== today) {
    // Starting a new streak or first activity
    data.streak.current = 1
    streakChanged = true
  }

  // Update longest streak
  if (data.streak.current > data.streak.longest) {
    data.streak.longest = data.streak.current
  }

  // Update last activity date
  data.streak.lastActivityDate = today

  // Check for milestone
  if (XP_CONFIG.streakMilestones[data.streak.current]) {
    milestoneReached = data.streak.current
  }

  return { streakChanged, milestoneReached }
}

// Award XP to user
export function awardXP(uid, amount, source) {
  const data = getGamificationData(uid)
  const previousLevel = data.level.current

  // Add XP
  data.xp.total += amount
  data.xp.todayXP += amount

  // Add to history (keep last 50)
  data.xp.history.unshift({
    amount,
    source,
    timestamp: new Date().toISOString()
  })
  if (data.xp.history.length > 50) {
    data.xp.history = data.xp.history.slice(0, 50)
  }

  // Update level
  const newLevel = getLevelFromXP(data.xp.total)
  data.level.current = newLevel
  data.level.name = LEVEL_NAMES[newLevel]
  data.level.color = LEVEL_COLORS[newLevel]

  saveGamificationData(uid, data)

  // Emit XP gained event
  emitEvent('xpGained', {
    amount,
    source,
    newTotal: data.xp.total,
    todayXP: data.xp.todayXP
  })

  // Emit level up event if level changed
  if (newLevel > previousLevel) {
    emitEvent('levelUp', {
      oldLevel: previousLevel,
      newLevel,
      levelName: LEVEL_NAMES[newLevel],
      levelColor: LEVEL_COLORS[newLevel]
    })
  }

  // Emit general update
  emitEvent('gamificationUpdate', getGamificationData(uid))

  return {
    xpGained: amount,
    totalXP: data.xp.total,
    leveledUp: newLevel > previousLevel,
    newLevel,
    levelName: LEVEL_NAMES[newLevel]
  }
}

// Record problem completion - main entry point for XP awards
export function recordProblemCompletion(uid, problemId, difficulty = 'Medium') {
  const data = getGamificationData(uid)
  const today = getTodayDate()

  // Check if already completed this problem today (prevent double XP)
  if (data.completedToday.includes(problemId)) {
    return { alreadyCompleted: true, xpAwarded: 0 }
  }

  let totalXPAwarded = 0
  const xpSources = []

  // Award base XP for problem completion
  const baseXP = XP_CONFIG.problemCompletion[difficulty] || XP_CONFIG.problemCompletion.Medium
  totalXPAwarded += baseXP
  xpSources.push({ amount: baseXP, source: `${difficulty} problem` })

  // Award first problem of day bonus
  if (!data.firstProblemTodayAwarded) {
    totalXPAwarded += XP_CONFIG.firstProblemOfDayBonus
    xpSources.push({ amount: XP_CONFIG.firstProblemOfDayBonus, source: 'First problem bonus' })
    data.firstProblemTodayAwarded = true
  }

  // Update streak
  const { streakChanged, milestoneReached } = updateStreak(data)

  // Award streak milestone bonus if reached
  if (milestoneReached) {
    const milestoneBonus = XP_CONFIG.streakMilestones[milestoneReached]
    totalXPAwarded += milestoneBonus
    xpSources.push({ amount: milestoneBonus, source: `${milestoneReached}-day streak milestone` })
  }

  // Mark problem as completed today
  data.completedToday.push(problemId)

  // Save data first
  saveGamificationData(uid, data)

  // Award all XP
  const result = awardXP(uid, totalXPAwarded, xpSources.map(s => s.source).join(', '))

  // Emit streak update if changed
  if (streakChanged) {
    emitEvent('streakUpdated', {
      current: data.streak.current,
      longest: data.streak.longest,
      isNewDay: true,
      milestoneReached
    })
  }

  return {
    alreadyCompleted: false,
    xpAwarded: totalXPAwarded,
    xpSources,
    streakUpdated: streakChanged,
    currentStreak: data.streak.current,
    milestoneReached,
    ...result
  }
}

// Record problem un-completion (when user unchecks)
export function recordProblemUncompletion(uid, problemId) {
  const data = getGamificationData(uid)

  // Remove from today's completed list
  const index = data.completedToday.indexOf(problemId)
  if (index > -1) {
    data.completedToday.splice(index, 1)
  }

  // Note: We don't remove XP - once earned, it's kept
  // This prevents gaming the system by toggling completions

  saveGamificationData(uid, data)

  return { removed: index > -1 }
}

// Get summary stats for display
export function getGamificationSummary(uid) {
  const data = getGamificationData(uid)
  const level = data.level.current

  return {
    streak: {
      current: data.streak.current,
      longest: data.streak.longest,
      lastActivityDate: data.streak.lastActivityDate
    },
    xp: {
      total: data.xp.total,
      todayXP: data.xp.todayXP,
      forNextLevel: getXPForNextLevel(level),
      progressPercent: getLevelProgress(data.xp.total)
    },
    level: {
      current: level,
      name: data.level.name,
      color: data.level.color,
      isMaxLevel: level >= MAX_LEVEL
    },
    problemsCompletedToday: data.completedToday.length
  }
}

// Migrate anonymous data to authenticated user
export function migrateGamificationData(fromUid, toUid) {
  const fromKey = getStorageKey(fromUid)
  const toKey = getStorageKey(toUid)

  const fromData = localStorage.getItem(fromKey)
  const toData = localStorage.getItem(toKey)

  // If no anonymous data, nothing to migrate
  if (!fromData || fromUid === 'anonymous') {
    return
  }

  // If user already has data, merge (keep higher values)
  if (toData) {
    const from = JSON.parse(fromData)
    const to = JSON.parse(toData)

    // Keep higher XP
    if (from.xp.total > to.xp.total) {
      to.xp.total = from.xp.total
    }

    // Keep longer streak
    if (from.streak.longest > to.streak.longest) {
      to.streak.longest = from.streak.longest
    }

    // Keep current streak if it's active and longer
    if (from.streak.current > to.streak.current) {
      to.streak.current = from.streak.current
      to.streak.lastActivityDate = from.streak.lastActivityDate
    }

    // Recalculate level
    to.level.current = getLevelFromXP(to.xp.total)
    to.level.name = LEVEL_NAMES[to.level.current]
    to.level.color = LEVEL_COLORS[to.level.current]

    localStorage.setItem(toKey, JSON.stringify(to))
  } else {
    // Just copy data to new key
    localStorage.setItem(toKey, fromData)
  }

  // Clear anonymous data
  if (fromUid === 'anonymous') {
    localStorage.removeItem(fromKey)
  }

  // Emit update
  emitEvent('gamificationUpdate', getGamificationData(toUid))
}

// Custom event emitter
function emitEvent(eventName, detail) {
  window.dispatchEvent(new CustomEvent(eventName, { detail }))
}

// Export constants for use elsewhere
export {
  XP_CONFIG,
  LEVEL_THRESHOLDS,
  LEVEL_NAMES,
  LEVEL_COLORS,
  MAX_LEVEL,
  getLevelFromXP,
  getXPForNextLevel,
  getLevelProgress
}
