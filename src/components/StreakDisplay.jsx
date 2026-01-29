import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'

/**
 * StreakDisplay - Visual component for showing streak information
 * Displays current streak, longest streak, and progress to next milestone
 */
const StreakDisplay = ({ currentStreak, longestStreak, size = 'medium' }) => {
  const { isDarkMode } = useContext(ThemeContext)

  // Calculate milestone progress (7-day increments)
  const nextMilestone = Math.ceil((currentStreak + 1) / 7) * 7
  const daysToMilestone = nextMilestone - currentStreak
  const milestoneProgress = ((currentStreak % 7) / 7) * 100

  // Size variants
  const sizeClasses = {
    small: {
      container: 'p-3',
      number: 'text-2xl',
      label: 'text-xs',
      subtext: 'text-xs'
    },
    medium: {
      container: 'p-4',
      number: 'text-4xl',
      label: 'text-sm',
      subtext: 'text-sm'
    },
    large: {
      container: 'p-6',
      number: 'text-6xl',
      label: 'text-base',
      subtext: 'text-base'
    }
  }

  const sizes = sizeClasses[size] || sizeClasses.medium

  // Get streak emoji based on length
  const getStreakEmoji = (streak) => {
    if (streak >= 100) return '🔥💯'
    if (streak >= 50) return '🔥⭐'
    if (streak >= 30) return '🔥✨'
    if (streak >= 7) return '🔥'
    if (streak >= 3) return '🔥'
    if (streak > 0) return '🔥'
    return '🎯'
  }

  // Get motivational message
  const getMotivationalMessage = (streak, daysToNext) => {
    if (streak === 0) return 'Start your streak today!'
    if (streak === 1) return 'Great start! Keep it going!'
    if (daysToNext === 1) return `Just 1 day to ${nextMilestone}-day milestone!`
    if (daysToNext <= 3) return `${daysToNext} days to ${nextMilestone}-day milestone!`
    if (streak >= 100) return 'Legendary streak!'
    if (streak >= 50) return 'Amazing dedication!'
    if (streak >= 30) return "You're on fire!"
    if (streak >= 7) return 'Fantastic streak!'
    return 'Keep up the momentum!'
  }

  return (
    <div className={`${sizes.container} rounded-xl border-2 ${
      isDarkMode
        ? 'bg-gray-800 border-gray-700'
        : 'bg-white border-gray-200'
    } shadow-lg transition-all hover:shadow-xl`}>
      {/* Current Streak */}
      <div className="text-center mb-4">
        <div className={`${sizes.number} font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        } flex items-center justify-center gap-2`}>
          <span className="animate-pulse">{getStreakEmoji(currentStreak)}</span>
          <span>{currentStreak}</span>
        </div>
        <div className={`${sizes.label} font-semibold ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        } uppercase tracking-wide mt-1`}>
          Day Streak
        </div>
      </div>

      {/* Longest Streak */}
      {longestStreak > 0 && (
        <div className={`text-center mb-4 pb-4 border-b ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className={`${sizes.subtext} ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Longest: <span className="font-bold text-amber-500">{longestStreak} 🏆</span>
          </div>
          {currentStreak === longestStreak && currentStreak > 0 && (
            <div className={`${sizes.subtext} text-green-500 font-semibold mt-1`}>
              New Record!
            </div>
          )}
        </div>
      )}

      {/* Milestone Progress */}
      {currentStreak > 0 && daysToMilestone <= 7 && (
        <div className="mb-3">
          <div className={`${sizes.subtext} ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          } mb-2 flex justify-between`}>
            <span>Next Milestone</span>
            <span className="font-semibold">{nextMilestone} days</span>
          </div>
          <div className={`w-full h-2 rounded-full ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
          } overflow-hidden`}>
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500 rounded-full"
              style={{ width: `${milestoneProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Motivational Message */}
      <div className={`text-center ${sizes.subtext} font-medium ${
        currentStreak >= 7
          ? 'text-orange-500'
          : isDarkMode ? 'text-blue-400' : 'text-blue-600'
      }`}>
        {getMotivationalMessage(currentStreak, daysToMilestone)}
      </div>

      {/* Streak Milestones Indicator */}
      {currentStreak > 0 && (
        <div className="mt-4 flex justify-center gap-1">
          {[7, 30, 50, 100].map((milestone) => (
            <div
              key={milestone}
              className={`w-2 h-2 rounded-full transition-all ${
                currentStreak >= milestone
                  ? 'bg-gradient-to-r from-orange-500 to-red-500'
                  : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
              }`}
              title={`${milestone}-day milestone ${currentStreak >= milestone ? '✓' : ''}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default StreakDisplay
