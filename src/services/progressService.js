// Progress tracking service using localStorage
import { getCurrentUser } from './authService'
import { recordWeeklyProblem } from './weeklyGoalsService'

const STORAGE_KEYS = {
  USER_PROGRESS: 'user_progress',
  USER_INFO: 'user_info',
  COMPLETED_PROBLEMS: 'completed_problems',
  SAVED_CODE: 'saved_code',
  USER_XP: 'user_xp'
}

// Helper to get user-specific key
const getUserKey = (baseKey) => {
  const currentUser = getCurrentUser()
  if (currentUser) {
    return `${baseKey}_${currentUser.uid}`
  }
  return baseKey // Fallback to non-user-specific key for anonymous users
}

// Migrate old completion data to user-specific key
export const migrateCompletionData = () => {
  const currentUser = getCurrentUser()
  if (!currentUser) return

  const userKey = getUserKey(STORAGE_KEYS.COMPLETED_PROBLEMS)
  const oldData = localStorage.getItem(STORAGE_KEYS.COMPLETED_PROBLEMS)
  const existingUserData = localStorage.getItem(userKey)

  // Only migrate if there's old data and no user-specific data yet
  if (oldData && !existingUserData) {
    console.log('Migrating completion data to user-specific storage...')
    localStorage.setItem(userKey, oldData)
    console.log('Migration complete!')
  }
}

// Initialize default user if not exists
export const initializeUser = () => {
  const currentUser = getCurrentUser()

  const userInfo = localStorage.getItem(STORAGE_KEYS.USER_INFO)
  if (!userInfo) {
    const defaultUser = {
      username: 'michael_perera',
      email: 'michael@example.com',
      joinedDate: new Date().toISOString()
    }
    localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(defaultUser))
  }

  // Initialize completed problems set with user-specific key
  if (currentUser) {
    const userKey = getUserKey(STORAGE_KEYS.COMPLETED_PROBLEMS)
    const completedProblems = localStorage.getItem(userKey)
    if (!completedProblems) {
      localStorage.setItem(userKey, JSON.stringify([]))
    }
  }
}

// Get user info
export const getUserInfo = () => {
  const currentUser = getCurrentUser()
  if (!currentUser) return null
  
  initializeUser()
  const userInfo = localStorage.getItem(STORAGE_KEYS.USER_INFO)
  return JSON.parse(userInfo)
}

// Get all completed problem IDs
export const getCompletedProblems = () => {
  const currentUser = getCurrentUser()
  if (!currentUser) {
    // Return empty array for non-logged-in users
    console.log('⚠️ getCompletedProblems: No user logged in')
    return []
  }

  initializeUser()
  const userKey = getUserKey(STORAGE_KEYS.COMPLETED_PROBLEMS)
  const completed = localStorage.getItem(userKey)
  console.log('✅ getCompletedProblems:', {
    userKey,
    count: JSON.parse(completed)?.length || 0,
    userId: currentUser.uid
  })
  return JSON.parse(completed) || []
}

// Mark problem as completed or uncompleted
export const toggleProblemCompletion = (problemId, completed, difficulty = 'Medium', xpMultiplier = 1) => {
  const currentUser = getCurrentUser()
  if (!currentUser) {
    console.warn('Cannot toggle problem completion: User not logged in')
    return
  }

  const completedProblems = getCompletedProblems()
  const wasCompleted = completedProblems.includes(problemId)

  if (completed) {
    // Add to completed list if not already there
    if (!wasCompleted) {
      completedProblems.push(problemId)
      // Award XP for completing the problem
      const xp = getXPForDifficulty(difficulty, xpMultiplier)
      addUserXP(xp, `problem-${problemId}`)
      // Record for weekly goals
      recordWeeklyProblem(currentUser.uid, problemId)
    }
  } else {
    // Remove from completed list
    const index = completedProblems.indexOf(problemId)
    if (index > -1) {
      completedProblems.splice(index, 1)
      // Note: We don't remove XP when unchecking a problem
      // Note: We don't remove from weekly goals either
    }
  }

  const userKey = getUserKey(STORAGE_KEYS.COMPLETED_PROBLEMS)
  localStorage.setItem(userKey, JSON.stringify(completedProblems))
  return completedProblems
}

// Check if problem is completed
export const isProblemCompleted = (problemId) => {
  const completedProblems = getCompletedProblems()
  return completedProblems.includes(problemId)
}

// Get all practice topics with their problems
export const getAllPracticeProblems = () => {
  // Define all practice topics and their problem counts (exact naming from files)
  return {
    // Algorithms (src/pages/algorithms/)
    'Advanced Graphs': 5,
    'Arrays': 21,
    'Backtracking': 11,
    'Binary Search': 5,
    'Binary Search Trees': 3,
    'Binary Trees': 17,
    'Bit Manipulation': 7,
    'Data Structures': 1,
    'Graphs': 9,
    'Greedy Algorithms': 4,
    'Hash Tables': 11,
    'Heaps': 6,
    'Intervals': 7,
    'Linked Lists': 12,
    'Math & Geometry': 9,
    'Queues': 4,
    'Recursion': 8,
    'Searching': 2,
    'Sliding Window': 9,
    'Sorting': 4,
    'Stacks': 8,
    'Strings': 11,
    'Trees': 6,
    'Trie': 5,
    'Two Pointers': 5,
    'Union Find': 4,
    'Dynamic Programming': 17,
    'Famous Algorithms': 3,
    // Java Features (src/pages/java/ - camelCase naming)
    'Streams': 4,
    'StreamsAdvanced': 4,
    'Lambdas': 4,
    'LambdasAdvanced': 8,
    'FunctionalInterfaces': 4,
    'CollectionsFramework': 4,
    // Concurrency (src/pages/java/)
    'Concurrency': 4,
    'Multithreading': 4,
    // Core Java Fundamentals (src/pages/java/)
    'ObjectOrientedProgramming': 4,
    'ExceptionHandling': 5,
    'FileIO': 5,
    'JVM Internals': 4,
    'MemoryManagement': 4,
    'Generics': 4,
    // System Design (src/pages/design/)
    'System Design': 9,
    'DesignPatternsInteractive': 4,
    'DesignProblems': 5,
    'LRUCache': 4,
    'RateLimiter': 4,
    // Practice folder (src/pages/practice/)
    'SetOperations': 4,
    'MapOperations': 8,
    // Python (src/pages/python/)
    'PythonSetOperations': 8,
    'PythonMapFunctions': 10,
    'PythonDictOps': 11,
    'PythonRegex': 10
  }
}

// Get progress stats
export const getProgressStats = () => {
  const currentUser = getCurrentUser()
  if (!currentUser) {
    return {
      total: 0,
      completed: 0,
      remaining: 0,
      progressPercent: 0
    }
  }
  
  const problems = getAllPracticeProblems()
  const totalProblems = Object.values(problems).reduce((sum, count) => sum + count, 0)
  const completedProblems = getCompletedProblems()
  const completedCount = completedProblems.length
  const progressPercent = totalProblems > 0 ? Math.round((completedCount / totalProblems) * 100) : 0

  return {
    total: totalProblems,
    completed: completedCount,
    remaining: totalProblems - completedCount,
    progressPercent
  }
}

// Define category groupings
export const getCategoryGroupings = () => {
  return {
    'Practice - Algorithms': [
      'Advanced Graphs',
      'Arrays',
      'Backtracking',
      'Binary Search',
      'Binary Search Trees',
      'Binary Trees',
      'Bit Manipulation',
      'Data Structures',
      'Dynamic Programming',
      'Famous Algorithms',
      'Graphs',
      'Greedy Algorithms',
      'Hash Tables',
      'Heaps',
      'Intervals',
      'Linked Lists',
      'Math & Geometry',
      'Queues',
      'Recursion',
      'Searching',
      'Sliding Window',
      'Sorting',
      'Stacks',
      'Strings',
      'Trees',
      'Trie',
      'Two Pointers',
      'Union Find'
    ],
    'Practice - Java Features': [
      'Streams',
      'StreamsAdvanced',
      'Lambdas',
      'LambdasAdvanced',
      'FunctionalInterfaces',
      'CollectionsFramework'
    ],
    'Practice - Concurrency': [
      'Concurrency',
      'Multithreading'
    ],
    'Practice - Core Java Fundamentals': [
      'ObjectOrientedProgramming',
      'ExceptionHandling',
      'FileIO',
      'JVM Internals',
      'MemoryManagement',
      'Generics'
    ],
    'Practice - System Design': [
      'System Design',
      'DesignPatternsInteractive',
      'DesignProblems',
      'LRUCache',
      'RateLimiter'
    ],
    'Practice - Python Operations': [
      'SetOperations',
      'MapOperations',
      'PythonSetOperations',
      'PythonMapFunctions',
      'PythonDictOps',
      'PythonRegex'
    ]
  }
}

// Get stats by category
export const getCategoryStats = () => {
  const currentUser = getCurrentUser()
  if (!currentUser) return {}

  const problems = getAllPracticeProblems()
  const completedProblems = getCompletedProblems()
  const groupings = getCategoryGroupings()

  const stats = {}

  // Calculate stats for grouped categories
  for (const [categoryName, topics] of Object.entries(groupings)) {
    let totalCount = 0
    let completedCount = 0

    for (const topic of topics) {
      const topicCount = problems[topic] || 0
      totalCount += topicCount
      completedCount += completedProblems.filter(id => id.startsWith(topic)).length
    }

    if (totalCount > 0) {
      stats[categoryName] = {
        total: totalCount,
        completed: completedCount,
        percent: Math.round((completedCount / totalCount) * 100)
      }
    }
  }

  return stats
}

// Update user info
export const updateUserInfo = (updates) => {
  const currentInfo = getUserInfo()
  const updatedInfo = { ...currentInfo, ...updates }
  localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(updatedInfo))
  return updatedInfo
}

// Reset all progress (for testing)
export const resetProgress = () => {
  const currentUser = getCurrentUser()
  if (currentUser) {
    const userKey = getUserKey(STORAGE_KEYS.COMPLETED_PROBLEMS)
    localStorage.setItem(userKey, JSON.stringify([]))
  }
  return getProgressStats()
}

// Export for debugging
export const getDebugInfo = () => {
  return {
    userInfo: getUserInfo(),
    completedProblems: getCompletedProblems(),
    stats: getProgressStats()
  }
}

// Save user's code for a specific problem (with language support)
export const saveUserCode = (problemId, code, language = 'java') => {
  const savedCode = getSavedCode()
  const key = `${problemId}-${language}`
  savedCode[key] = {
    code,
    lastModified: new Date().toISOString()
  }
  localStorage.setItem(STORAGE_KEYS.SAVED_CODE, JSON.stringify(savedCode))
  console.log('✅ Saved to localStorage:', key, 'Code length:', code?.length)
}

// Get user's saved code for a specific problem (with language support)
export const getUserCode = (problemId, language = 'java') => {
  const savedCode = getSavedCode()
  const key = `${problemId}-${language}`
  const code = savedCode[key]?.code || null
  console.log('📖 Loading from localStorage:', key, code ? `Found (${code.length} chars)` : 'Not found')
  return code
}

// Get all saved code
export const getSavedCode = () => {
  const savedCode = localStorage.getItem(STORAGE_KEYS.SAVED_CODE)
  return savedCode ? JSON.parse(savedCode) : {}
}

// Clear saved code for a specific problem
export const clearUserCode = (problemId, language = null) => {
  const savedCode = getSavedCode()
  if (language) {
    const key = `${problemId}-${language}`
    delete savedCode[key]
  } else {
    // Clear all languages for this problem
    const keys = Object.keys(savedCode).filter(k => k.startsWith(problemId))
    keys.forEach(k => delete savedCode[k])
  }
  localStorage.setItem(STORAGE_KEYS.SAVED_CODE, JSON.stringify(savedCode))
}

// ========== XP and Level System ==========

// XP values by difficulty
const XP_VALUES = {
  Easy: 10,
  Medium: 25,
  Hard: 50
}

// Level thresholds (level: required XP)
const LEVEL_THRESHOLDS = {
  1: 0,
  2: 100,
  3: 250,
  4: 500,
  5: 1000,
  10: 2500,
  15: 5000,
  20: 10000,
  25: 20000,
  30: 35000,
  40: 60000,
  50: 100000
}

// Get user's total XP
export const getUserXP = () => {
  const currentUser = getCurrentUser()
  if (!currentUser) return 0

  const userKey = getUserKey(STORAGE_KEYS.USER_XP)
  const stored = localStorage.getItem(userKey)
  if (!stored) return 0

  try {
    const data = JSON.parse(stored)
    return data.totalXP || 0
  } catch (error) {
    console.error('Error getting user XP:', error)
    return 0
  }
}

// Add XP to user's total
export const addUserXP = (xp, source = 'problem') => {
  const currentUser = getCurrentUser()
  if (!currentUser) {
    console.warn('Cannot add XP: User not logged in')
    return 0
  }

  const userKey = getUserKey(STORAGE_KEYS.USER_XP)
  const currentXP = getUserXP()
  const newXP = currentXP + xp

  const data = {
    totalXP: newXP,
    lastUpdated: new Date().toISOString(),
    history: []
  }

  // Get existing history
  const stored = localStorage.getItem(userKey)
  if (stored) {
    try {
      const existingData = JSON.parse(stored)
      data.history = existingData.history || []
    } catch (error) {
      console.error('Error parsing XP history:', error)
    }
  }

  // Add to history
  data.history.push({
    xp,
    source,
    timestamp: new Date().toISOString()
  })

  // Keep only last 100 entries
  if (data.history.length > 100) {
    data.history = data.history.slice(-100)
  }

  localStorage.setItem(userKey, JSON.stringify(data))

  // Dispatch event for level up
  const oldLevel = calculateLevel(currentXP)
  const newLevel = calculateLevel(newXP)
  if (newLevel > oldLevel) {
    window.dispatchEvent(new CustomEvent('levelUp', {
      detail: { oldLevel, newLevel, totalXP: newXP }
    }))
  }

  window.dispatchEvent(new CustomEvent('xpGained', {
    detail: { xp, totalXP: newXP, source }
  }))

  return newXP
}

// Calculate level from XP
export const calculateLevel = (xp) => {
  const levels = Object.keys(LEVEL_THRESHOLDS).map(Number).sort((a, b) => b - a)

  for (const level of levels) {
    if (xp >= LEVEL_THRESHOLDS[level]) {
      return level
    }
  }

  return 1
}

// Get current level
export const getUserLevel = () => {
  const xp = getUserXP()
  return calculateLevel(xp)
}

// Get XP needed for next level
export const getXPForNextLevel = () => {
  const currentXP = getUserXP()
  const currentLevel = calculateLevel(currentXP)

  // Find next level threshold
  const levels = Object.keys(LEVEL_THRESHOLDS).map(Number).sort((a, b) => a - b)
  const nextLevel = levels.find(level => level > currentLevel)

  if (!nextLevel) {
    return { current: currentXP, needed: currentXP, nextLevel: currentLevel }
  }

  const neededXP = LEVEL_THRESHOLDS[nextLevel]
  const previousLevelXP = LEVEL_THRESHOLDS[currentLevel]
  const progress = currentXP - previousLevelXP
  const total = neededXP - previousLevelXP
  const percent = Math.round((progress / total) * 100)

  return {
    current: currentXP,
    needed: neededXP,
    remaining: neededXP - currentXP,
    nextLevel,
    percent,
    progress,
    total
  }
}

// Get XP for difficulty
export const getXPForDifficulty = (difficulty, multiplier = 1) => {
  const baseXP = XP_VALUES[difficulty] || 0
  return Math.round(baseXP * multiplier)
}

// Get level info (level, XP, next level progress)
export const getLevelInfo = () => {
  const xp = getUserXP()
  const level = calculateLevel(xp)
  const nextLevelInfo = getXPForNextLevel()

  return {
    level,
    xp,
    ...nextLevelInfo
  }
}
