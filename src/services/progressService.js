// Progress tracking service using localStorage
import { getCurrentUser } from './authService'

const STORAGE_KEYS = {
  USER_PROGRESS: 'user_progress',
  USER_INFO: 'user_info',
  COMPLETED_PROBLEMS: 'completed_problems',
  SAVED_CODE: 'saved_code'
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
export const toggleProblemCompletion = (problemId, completed) => {
  const currentUser = getCurrentUser()
  if (!currentUser) {
    console.warn('Cannot toggle problem completion: User not logged in')
    return
  }

  const completedProblems = getCompletedProblems()

  if (completed) {
    // Add to completed list if not already there
    if (!completedProblems.includes(problemId)) {
      completedProblems.push(problemId)
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
