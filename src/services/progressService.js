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
  try {
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
  } catch (error) {
    console.error('Error migrating completion data:', error)
  }
}

// Initialize default user if not exists
export const initializeUser = () => {
  try {
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
  } catch (error) {
    console.error('Error initializing user:', error)
  }
}

// Get user info
export const getUserInfo = () => {
  try {
    const currentUser = getCurrentUser()
    if (!currentUser) return null

    initializeUser()
    const userInfo = localStorage.getItem(STORAGE_KEYS.USER_INFO)
    return userInfo ? JSON.parse(userInfo) : null
  } catch (error) {
    console.error('Error getting user info:', error)
    return null
  }
}

// Get all completed problem IDs
export const getCompletedProblems = () => {
  try {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      return []
    }

    initializeUser()
    const userKey = getUserKey(STORAGE_KEYS.COMPLETED_PROBLEMS)
    const completed = localStorage.getItem(userKey)
    return completed ? JSON.parse(completed) : []
  } catch (error) {
    console.error('Error getting completed problems:', error)
    return []
  }
}

// Mark problem as completed or uncompleted
export const toggleProblemCompletion = (problemId, completed, difficulty = 'Medium', xpMultiplier = 1) => {
  try {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      console.warn('Cannot toggle problem completion: User not logged in')
      return []
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
      }
    }

    const userKey = getUserKey(STORAGE_KEYS.COMPLETED_PROBLEMS)
    localStorage.setItem(userKey, JSON.stringify(completedProblems))
    return completedProblems
  } catch (error) {
    console.error('Error toggling problem completion:', error)
    return []
  }
}

// Check if problem is completed
export const isProblemCompleted = (problemId) => {
  const completedProblems = getCompletedProblems()
  return completedProblems.includes(problemId)
}

// Get all practice topics with their problems
export const getAllPracticeProblems = () => {
  // Define all practice topics and their problem counts (matching Learning Path)
  return {
    // Fundamentals
    'Arrays': 21,
    'Strings': 11,
    'HashTables': 11,
    'Stacks': 8,
    'Queues': 4,
    // Core Algorithms
    'TwoPointers': 5,
    'SlidingWindow': 9,
    'BinarySearch': 5,
    'Searching': 2,
    'Sorting': 4,
    'LinkedLists': 12,
    // Intermediate
    'Recursion': 8,
    'Trees': 6,
    'BinaryTrees': 17,
    'BinarySearchTrees': 3,
    'Heaps': 6,
    'MathGeometry': 9,
    // Advanced Data Structures
    'Graphs': 9,
    'Trie': 5,
    'UnionFind': 4,
    'Intervals': 7,
    'DataStructures': 1,
    // Advanced Algorithms
    'DynamicProgramming': 17,
    'DynamicProgrammingPatterns': 89,
    'Backtracking': 11,
    'GreedyAlgorithms': 4,
    'AdvancedGraphs': 5,
    'BitManipulation': 7,
    'FamousAlgorithms': 3,
    // Java Features
    'Lambdas': 4,
    'FunctionalInterfaces': 4,
    // Core Java Fundamentals
    'FileIO': 6,
    'Generics': 4,
    'JVMInternals': 5,
    'MemoryManagement': 4,
    // System Design Components
    'LRUCache': 7,
    'RateLimiter': 6,
    'NotificationSystem': 6,
    'Newsfeed': 5,
    'TypeAhead': 5,
    'TinyURL': 5,
    // System Design Case Studies
    'Twitter': 5,
    'Netflix': 6,
    'Instagram': 8,
    'YouTube': 5,
    'WhatsApp': 7,
    'Zoom': 9,
    'Dropbox': 7,
    'Amazon': 7,
    'GoogleDocs': 5,
    'RideShare': 5,
    'FoodDelivery': 7,
    // Java Interview Questions
    'JavaQuestions': 10,
    'CoreJavaQuestions': 12,
    'Java8Questions': 15,
    'Java11Questions': 8,
    'Java15Questions': 8,
    'Java21Questions': 8,
    'Java24Questions': 4,
    // Spring Framework Questions
    'SpringCoreQuestions': 3,
    'SpringBootQuestions': 18,
    'SpringSecurityQuestions': 3,
    'SpringDataJPAQuestions': 3,
    'SpringAnnotationsQuestions': 8,
    // Database Questions
    'SQLQuestions': 16,
    'NoSQLQuestions': 8,
    'ORMQuestions': 8,
    'HibernateQuestions': 5,
    'PostgreSQLQuestions': 10,
    'SQLFundamentalsQuestions': 10,
    // Messaging & Streaming Questions
    'KafkaQuestions': 18,
    'RabbitMQQuestions': 4,
    'SolaceQuestions': 4,
    'ApacheFlinkQuestions': 5,
    // DevOps & Monitoring Questions
    'JenkinsQuestions': 11,
    'TeamCityQuestions': 4,
    'PrometheusQuestions': 4,
    'GrafanaQuestions': 4,
    'ZipkinQuestions': 4,
    'ActuatorQuestions': 4,
    // API & Integration Questions
    'RestAPIQuestions': 4,
    // Specialized Domain Questions
    'EtradingQuestions': 27,
    'SystemDesignQuestions': 15,
    // System Design Fundamentals Questions
    'SystemDesignFundamentalsQuestions': 15,
    // Data Storage Questions
    'DataStorageQuestions': 12,
    // Architecture Questions
    'ArchitectureQuestions': 12,
    // Communication Questions
    'CommunicationQuestions': 8
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
      'JVMInternals',
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
  try {
    const currentInfo = getUserInfo()
    const updatedInfo = { ...currentInfo, ...updates }
    localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(updatedInfo))
    return updatedInfo
  } catch (error) {
    console.error('Error updating user info:', error)
    return null
  }
}

// Reset all progress (for testing)
export const resetProgress = () => {
  try {
    const currentUser = getCurrentUser()
    if (currentUser) {
      const userKey = getUserKey(STORAGE_KEYS.COMPLETED_PROBLEMS)
      localStorage.setItem(userKey, JSON.stringify([]))
    }
  } catch (error) {
    console.error('Error resetting progress:', error)
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
  try {
    const savedCode = getSavedCode()
    const key = `${problemId}-${language}`
    savedCode[key] = {
      code,
      lastModified: new Date().toISOString()
    }
    localStorage.setItem(STORAGE_KEYS.SAVED_CODE, JSON.stringify(savedCode))
  } catch (error) {
    console.error('Error saving user code:', error)
  }
}

// Get user's saved code for a specific problem (with language support)
export const getUserCode = (problemId, language = 'java') => {
  const savedCode = getSavedCode()
  const key = `${problemId}-${language}`
  return savedCode[key]?.code || null
}

// Get all saved code
export const getSavedCode = () => {
  try {
    const savedCode = localStorage.getItem(STORAGE_KEYS.SAVED_CODE)
    return savedCode ? JSON.parse(savedCode) : {}
  } catch (error) {
    console.error('Error getting saved code:', error)
    return {}
  }
}

// Clear saved code for a specific problem
export const clearUserCode = (problemId, language = null) => {
  try {
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
  } catch (error) {
    console.error('Error clearing user code:', error)
  }
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
  try {
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
  } catch (error) {
    console.error('Error adding user XP:', error)
    return 0
  }
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
    return { current: currentXP, needed: currentXP, nextLevel: currentLevel, percent: 100, remaining: 0, progress: 0, total: 0 }
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
