import { useState, useEffect, useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'
import { getProgressStats, getCategoryStats, getLevelInfo } from '../services/progressService'
import { getDailyChallengeStreak, getLongestStreak } from '../services/dailyChallengeService'
import { getCurrentUser } from '../services/authService'
import StreakDisplay from './StreakDisplay'

/**
 * StatsOverview - Comprehensive dashboard showing user progress and stats
 */
const StatsOverview = () => {
  const { isDarkMode } = useContext(ThemeContext)
  const [stats, setStats] = useState(null)
  const [categoryStats, setCategoryStats] = useState({})
  const [levelInfo, setLevelInfo] = useState(null)
  const [streakInfo, setStreakInfo] = useState({ current: 0, longest: 0 })
  const [weeklyGoal, setWeeklyGoal] = useState(null)
  const currentUser = getCurrentUser()

  useEffect(() => {
    if (!currentUser) return

    loadStats()

    // Listen for progress updates
    const handleUpdate = () => loadStats()
    window.addEventListener('progressUpdate', handleUpdate)
    window.addEventListener('xpGained', handleUpdate)
    window.addEventListener('dailyChallengeCompleted', handleUpdate)

    return () => {
      window.removeEventListener('progressUpdate', handleUpdate)
      window.removeEventListener('xpGained', handleUpdate)
      window.removeEventListener('dailyChallengeCompleted', handleUpdate)
    }
  }, [currentUser])

  const loadStats = () => {
    const progressStats = getProgressStats()
    const catStats = getCategoryStats()
    const level = getLevelInfo()
    const currentStreak = getDailyChallengeStreak(currentUser?.uid)
    const longestStreak = getLongestStreak(currentUser?.uid)
    const weekly = getWeeklyProgress()

    setStats(progressStats)
    setCategoryStats(catStats)
    setLevelInfo(level)
    setStreakInfo({ current: currentStreak, longest: longestStreak })
    setWeeklyGoal(weekly)
  }

  const getWeeklyProgress = () => {
    // Get problems completed this week
    const completedProblems = JSON.parse(localStorage.getItem(`completed_problems_${currentUser?.uid}`) || '[]')
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    // For now, just count total (we'd need timestamps for accurate weekly tracking)
    // This is a simplified version - you could enhance this with timestamp tracking
    return {
      goal: 5, // Default weekly goal
      completed: Math.min(completedProblems.length % 10, 5), // Simplified for demo
      percent: Math.min((completedProblems.length % 10) / 5 * 100, 100)
    }
  }

  if (!currentUser) {
    return (
      <div className={`text-center p-8 rounded-lg ${
        isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-50 text-gray-600'
      }`}>
        <p className="text-lg mb-4">Sign in to track your progress and stats!</p>
      </div>
    )
  }

  if (!stats || !levelInfo) {
    return (
      <div className={`text-center p-8 ${
        isDarkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        Loading stats...
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className={`text-4xl font-bold mb-2 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Your Progress Dashboard
        </h1>
        <p className={`text-lg ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Keep learning, keep growing!
        </p>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Level Card */}
        <div className={`p-6 rounded-xl border-2 ${
          isDarkMode
            ? 'bg-gradient-to-br from-purple-900 to-purple-800 border-purple-700'
            : 'bg-gradient-to-br from-purple-100 to-purple-50 border-purple-300'
        } shadow-lg`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm font-semibold uppercase tracking-wide ${
              isDarkMode ? 'text-purple-300' : 'text-purple-700'
            }`}>
              Level
            </span>
            <span className="text-3xl">⭐</span>
          </div>
          <div className={`text-5xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-purple-900'
          }`}>
            {levelInfo.level}
          </div>
          <div className={`text-sm ${
            isDarkMode ? 'text-purple-300' : 'text-purple-700'
          }`}>
            {levelInfo.xp.toLocaleString()} XP
          </div>
          {/* Progress to next level */}
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span className={isDarkMode ? 'text-purple-300' : 'text-purple-700'}>
                Level {levelInfo.nextLevel || levelInfo.level}
              </span>
              <span className={isDarkMode ? 'text-purple-300' : 'text-purple-700'}>
                {levelInfo.percent || 100}%
              </span>
            </div>
            <div className={`w-full h-2 rounded-full ${
              isDarkMode ? 'bg-purple-950' : 'bg-purple-200'
            } overflow-hidden`}>
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                style={{ width: `${levelInfo.percent || 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Total Problems */}
        <div className={`p-6 rounded-xl border-2 ${
          isDarkMode
            ? 'bg-gradient-to-br from-blue-900 to-blue-800 border-blue-700'
            : 'bg-gradient-to-br from-blue-100 to-blue-50 border-blue-300'
        } shadow-lg`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm font-semibold uppercase tracking-wide ${
              isDarkMode ? 'text-blue-300' : 'text-blue-700'
            }`}>
              Problems Solved
            </span>
            <span className="text-3xl">✅</span>
          </div>
          <div className={`text-5xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-blue-900'
          }`}>
            {stats.completed}
          </div>
          <div className={`text-sm ${
            isDarkMode ? 'text-blue-300' : 'text-blue-700'
          }`}>
            of {stats.total} total
          </div>
          {/* Overall progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span className={isDarkMode ? 'text-blue-300' : 'text-blue-700'}>
                Progress
              </span>
              <span className={isDarkMode ? 'text-blue-300' : 'text-blue-700'}>
                {stats.progressPercent}%
              </span>
            </div>
            <div className={`w-full h-2 rounded-full ${
              isDarkMode ? 'bg-blue-950' : 'bg-blue-200'
            } overflow-hidden`}>
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500"
                style={{ width: `${stats.progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Weekly Goal */}
        <div className={`p-6 rounded-xl border-2 ${
          isDarkMode
            ? 'bg-gradient-to-br from-green-900 to-green-800 border-green-700'
            : 'bg-gradient-to-br from-green-100 to-green-50 border-green-300'
        } shadow-lg`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm font-semibold uppercase tracking-wide ${
              isDarkMode ? 'text-green-300' : 'text-green-700'
            }`}>
              Weekly Goal
            </span>
            <span className="text-3xl">🎯</span>
          </div>
          <div className={`text-5xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-green-900'
          }`}>
            {weeklyGoal?.completed || 0}
          </div>
          <div className={`text-sm ${
            isDarkMode ? 'text-green-300' : 'text-green-700'
          }`}>
            of {weeklyGoal?.goal || 5} this week
          </div>
          {/* Weekly progress */}
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span className={isDarkMode ? 'text-green-300' : 'text-green-700'}>
                Progress
              </span>
              <span className={isDarkMode ? 'text-green-300' : 'text-green-700'}>
                {Math.round(weeklyGoal?.percent || 0)}%
              </span>
            </div>
            <div className={`w-full h-2 rounded-full ${
              isDarkMode ? 'bg-green-950' : 'bg-green-200'
            } overflow-hidden`}>
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
                style={{ width: `${weeklyGoal?.percent || 0}%` }}
              />
            </div>
          </div>
        </div>

        {/* Streak - using quarter width on desktop */}
        <div className="lg:col-span-1">
          <StreakDisplay
            currentStreak={streakInfo.current}
            longestStreak={streakInfo.longest}
            size="medium"
          />
        </div>
      </div>

      {/* Category Breakdown */}
      <div className={`p-6 rounded-xl border-2 ${
        isDarkMode
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-200'
      } shadow-lg`}>
        <h2 className={`text-2xl font-bold mb-6 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Progress by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(categoryStats).map(([category, data]) => (
            <div key={category} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className={`font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {category.replace('Practice - ', '')}
                </span>
                <span className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {data.completed}/{data.total} ({data.percent}%)
                </span>
              </div>
              <div className={`w-full h-3 rounded-full ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
              } overflow-hidden`}>
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    data.percent === 100
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                      : data.percent >= 50
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                      : 'bg-gradient-to-r from-orange-500 to-amber-500'
                  }`}
                  style={{ width: `${data.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Motivational Footer */}
      <div className={`p-6 rounded-xl border-2 text-center ${
        isDarkMode
          ? 'bg-gradient-to-r from-indigo-900 to-purple-900 border-indigo-700'
          : 'bg-gradient-to-r from-indigo-100 to-purple-100 border-indigo-300'
      } shadow-lg`}>
        <p className={`text-lg font-semibold ${
          isDarkMode ? 'text-white' : 'text-indigo-900'
        }`}>
          {stats.completed === 0
            ? "Start your learning journey today!"
            : stats.progressPercent === 100
            ? "🎉 Amazing! You've completed everything!"
            : stats.progressPercent >= 75
            ? "You're almost there! Keep pushing!"
            : stats.progressPercent >= 50
            ? "Halfway there! Great progress!"
            : stats.progressPercent >= 25
            ? "You're making great progress!"
            : "Every problem solved is a step forward!"}
        </p>
      </div>
    </div>
  )
}

export default StatsOverview
