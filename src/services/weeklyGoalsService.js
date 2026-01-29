// Weekly Goals Service - Track and manage weekly coding goals
import { getCurrentUser } from './authService'

const WEEKLY_GOALS_KEY = 'weekly_goals'

/**
 * Get the start of the current week (Monday)
 */
const getWeekStart = () => {
  const now = new Date()
  const dayOfWeek = now.getDay()
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek // Adjust for Sunday (0) or other days
  const monday = new Date(now)
  monday.setDate(now.getDate() + diff)
  monday.setHours(0, 0, 0, 0)
  return monday.toISOString().split('T')[0]
}

/**
 * Get week identifier (e.g., "2024-W03")
 */
const getWeekId = () => {
  const now = new Date()
  const yearStart = new Date(now.getFullYear(), 0, 1)
  const weekNumber = Math.ceil(((now - yearStart) / 86400000 + yearStart.getDay() + 1) / 7)
  return `${now.getFullYear()}-W${String(weekNumber).padStart(2, '0')}`
}

/**
 * Get user's weekly goals data
 */
export const getWeeklyGoalsData = (userId) => {
  try {
    const key = `${WEEKLY_GOALS_KEY}_${userId || 'anonymous'}`
    const stored = localStorage.getItem(key)
    if (!stored) return null

    const data = JSON.parse(stored)
    const currentWeek = getWeekId()

    // Check if we need to reset for new week
    if (data.weekId !== currentWeek) {
      return null // Return null to trigger new week initialization
    }

    return data
  } catch (error) {
    console.error('Error getting weekly goals:', error)
    return null
  }
}

/**
 * Initialize weekly goals for current week
 */
export const initializeWeeklyGoals = (userId, goalCount = 5) => {
  try {
    const key = `${WEEKLY_GOALS_KEY}_${userId || 'anonymous'}`
    const currentWeek = getWeekId()
    const weekStart = getWeekStart()

    const data = {
      weekId: currentWeek,
      weekStart,
      goal: goalCount,
      completed: 0,
      problems: [], // Track which problems were completed this week
      lastUpdated: new Date().toISOString()
    }

    localStorage.setItem(key, JSON.stringify(data))
    return data
  } catch (error) {
    console.error('Error initializing weekly goals:', error)
    return null
  }
}

/**
 * Get current weekly goal progress
 */
export const getWeeklyGoalProgress = (userId) => {
  const data = getWeeklyGoalsData(userId)

  if (!data) {
    // Initialize if doesn't exist or new week
    return initializeWeeklyGoals(userId)
  }

  const percent = data.goal > 0 ? Math.round((data.completed / data.goal) * 100) : 0

  return {
    ...data,
    remaining: Math.max(0, data.goal - data.completed),
    percent,
    isComplete: data.completed >= data.goal
  }
}

/**
 * Update weekly goal count (set new goal)
 */
export const setWeeklyGoal = (userId, goalCount) => {
  try {
    const currentUser = getCurrentUser()
    if (!currentUser && userId !== 'anonymous') {
      console.warn('Cannot set weekly goal: User not logged in')
      return null
    }

    const data = getWeeklyGoalsData(userId) || initializeWeeklyGoals(userId)
    data.goal = goalCount
    data.lastUpdated = new Date().toISOString()

    const key = `${WEEKLY_GOALS_KEY}_${userId || 'anonymous'}`
    localStorage.setItem(key, JSON.stringify(data))

    window.dispatchEvent(new CustomEvent('weeklyGoalUpdated', {
      detail: { goal: goalCount }
    }))

    return data
  } catch (error) {
    console.error('Error setting weekly goal:', error)
    return null
  }
}

/**
 * Record a problem completion for the week
 */
export const recordWeeklyProblem = (userId, problemId) => {
  try {
    const currentUser = getCurrentUser()
    if (!currentUser && userId !== 'anonymous') {
      console.warn('Cannot record weekly problem: User not logged in')
      return null
    }

    let data = getWeeklyGoalsData(userId)

    if (!data) {
      data = initializeWeeklyGoals(userId)
    }

    // Add problem if not already recorded this week
    if (!data.problems.includes(problemId)) {
      data.problems.push(problemId)
      data.completed = data.problems.length
      data.lastUpdated = new Date().toISOString()

      const key = `${WEEKLY_GOALS_KEY}_${userId || 'anonymous'}`
      localStorage.setItem(key, JSON.stringify(data))

      // Check if goal was just completed
      const wasComplete = (data.completed - 1) >= data.goal
      const isNowComplete = data.completed >= data.goal

      if (!wasComplete && isNowComplete) {
        window.dispatchEvent(new CustomEvent('weeklyGoalCompleted', {
          detail: {
            goal: data.goal,
            completed: data.completed,
            weekId: data.weekId
          }
        }))
      }

      window.dispatchEvent(new CustomEvent('weeklyProgressUpdated', {
        detail: {
          completed: data.completed,
          goal: data.goal,
          percent: Math.round((data.completed / data.goal) * 100)
        }
      }))
    }

    return data
  } catch (error) {
    console.error('Error recording weekly problem:', error)
    return null
  }
}

/**
 * Get weekly goal history (past weeks)
 */
export const getWeeklyHistory = (userId) => {
  try {
    const key = `${WEEKLY_GOALS_KEY}_history_${userId || 'anonymous'}`
    const stored = localStorage.getItem(key)
    if (!stored) return []

    return JSON.parse(stored)
  } catch (error) {
    console.error('Error getting weekly history:', error)
    return []
  }
}

/**
 * Archive current week's data to history
 */
export const archiveCurrentWeek = (userId) => {
  try {
    const data = getWeeklyGoalsData(userId)
    if (!data) return

    const historyKey = `${WEEKLY_GOALS_KEY}_history_${userId || 'anonymous'}`
    const history = getWeeklyHistory(userId)

    history.push({
      weekId: data.weekId,
      weekStart: data.weekStart,
      goal: data.goal,
      completed: data.completed,
      isComplete: data.completed >= data.goal,
      problems: data.problems
    })

    // Keep only last 12 weeks
    if (history.length > 12) {
      history.shift()
    }

    localStorage.setItem(historyKey, JSON.stringify(history))
  } catch (error) {
    console.error('Error archiving week:', error)
  }
}

/**
 * Get weekly stats (completion rate, average, etc.)
 */
export const getWeeklyStats = (userId) => {
  const history = getWeeklyHistory(userId)
  const current = getWeeklyGoalProgress(userId)

  if (history.length === 0) {
    return {
      totalWeeks: 1,
      completedWeeks: current.isComplete ? 1 : 0,
      averageCompletion: current.completed,
      completionRate: current.isComplete ? 100 : 0,
      currentStreak: current.isComplete ? 1 : 0
    }
  }

  const totalWeeks = history.length + 1
  const completedWeeks = history.filter(w => w.isComplete).length + (current.isComplete ? 1 : 0)
  const totalProblems = history.reduce((sum, w) => sum + w.completed, 0) + current.completed
  const averageCompletion = Math.round(totalProblems / totalWeeks)
  const completionRate = Math.round((completedWeeks / totalWeeks) * 100)

  // Calculate current streak of completed weeks
  let currentStreak = current.isComplete ? 1 : 0
  for (let i = history.length - 1; i >= 0; i--) {
    if (history[i].isComplete) {
      currentStreak++
    } else {
      break
    }
  }

  return {
    totalWeeks,
    completedWeeks,
    averageCompletion,
    completionRate,
    currentStreak
  }
}
