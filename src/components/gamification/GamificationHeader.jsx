import { useState, useEffect } from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import { getGamificationSummary, checkStreakStatus } from '../../services/gamificationService'
import StreakDisplay from './StreakDisplay'
import LevelBadge from './LevelBadge'
import XPDisplay from './XPDisplay'

function GamificationHeader({ userId, size = 'small' }) {
  const { colors } = useTheme()
  const [gamificationData, setGamificationData] = useState(null)

  // Load gamification data on mount and when userId changes
  useEffect(() => {
    if (userId) {
      // Check streak status (may reset if missed a day)
      checkStreakStatus(userId)
      // Get summary data
      const summary = getGamificationSummary(userId)
      setGamificationData(summary)
    }
  }, [userId])

  // Listen for gamification updates
  useEffect(() => {
    const handleUpdate = (event) => {
      if (userId) {
        const summary = getGamificationSummary(userId)
        setGamificationData(summary)
      }
    }

    window.addEventListener('gamificationUpdate', handleUpdate)
    window.addEventListener('xpGained', handleUpdate)
    window.addEventListener('levelUp', handleUpdate)
    window.addEventListener('streakUpdated', handleUpdate)

    return () => {
      window.removeEventListener('gamificationUpdate', handleUpdate)
      window.removeEventListener('xpGained', handleUpdate)
      window.removeEventListener('levelUp', handleUpdate)
      window.removeEventListener('streakUpdated', handleUpdate)
    }
  }, [userId])

  // Don't render if no user or no data
  if (!userId || !gamificationData) {
    return null
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.25rem',
        flexWrap: 'wrap'
      }}
    >
      {/* Level Badge */}
      <LevelBadge
        level={gamificationData.level.current}
        progressPercent={gamificationData.xp.progressPercent}
        size={size}
        showProgress={true}
      />

      {/* XP Display */}
      <XPDisplay
        xp={gamificationData.xp.total}
        todayXP={gamificationData.xp.todayXP}
        showToday={true}
        size={size}
      />

      {/* Streak Display */}
      <StreakDisplay
        streak={gamificationData.streak.current}
        showLabel={true}
        size={size}
      />
    </div>
  )
}

export default GamificationHeader
