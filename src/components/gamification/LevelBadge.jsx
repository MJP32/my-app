import { useState, useEffect } from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import { LEVEL_NAMES, LEVEL_COLORS } from '../../services/gamificationConstants'

function LevelBadge({
  level = 0,
  showProgress = true,
  progressPercent = 0,
  size = 'medium',
  showName = false
}) {
  const { colors } = useTheme()
  const [isAnimating, setIsAnimating] = useState(false)

  // Animate on level change
  useEffect(() => {
    setIsAnimating(true)
    const timer = setTimeout(() => setIsAnimating(false), 800)
    return () => clearTimeout(timer)
  }, [level])

  const sizes = {
    small: { badge: '1.5rem', font: '0.75rem', progress: '3px' },
    medium: { badge: '2rem', font: '0.875rem', progress: '4px' },
    large: { badge: '2.5rem', font: '1rem', progress: '5px' }
  }

  const currentSize = sizes[size] || sizes.medium
  const levelColor = LEVEL_COLORS[level] || LEVEL_COLORS[0]
  const levelName = LEVEL_NAMES[level] || LEVEL_NAMES[0]

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}
      title={`Level ${level}: ${levelName} (${progressPercent}% to next level)`}
    >
      {/* Level Badge Circle */}
      <div
        style={{
          position: 'relative',
          width: currentSize.badge,
          height: currentSize.badge
        }}
      >
        {/* Progress ring background */}
        {showProgress && (
          <svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              transform: 'rotate(-90deg)'
            }}
            width={currentSize.badge}
            height={currentSize.badge}
          >
            <circle
              cx={parseInt(currentSize.badge) / 2 * 16}
              cy={parseInt(currentSize.badge) / 2 * 16}
              r={(parseInt(currentSize.badge) / 2 - 0.15) * 16}
              fill="none"
              stroke={colors.border}
              strokeWidth={parseInt(currentSize.progress)}
              style={{
                cx: `calc(${currentSize.badge} / 2)`,
                cy: `calc(${currentSize.badge} / 2)`,
                r: `calc(${currentSize.badge} / 2 - ${currentSize.progress})`
              }}
            />
            <circle
              cx={parseInt(currentSize.badge) / 2 * 16}
              cy={parseInt(currentSize.badge) / 2 * 16}
              r={(parseInt(currentSize.badge) / 2 - 0.15) * 16}
              fill="none"
              stroke={levelColor}
              strokeWidth={parseInt(currentSize.progress)}
              strokeLinecap="round"
              strokeDasharray={`${(progressPercent / 100) * 2 * Math.PI * (parseInt(currentSize.badge) / 2 - 0.15) * 16} 1000`}
              style={{
                cx: `calc(${currentSize.badge} / 2)`,
                cy: `calc(${currentSize.badge} / 2)`,
                r: `calc(${currentSize.badge} / 2 - ${currentSize.progress})`,
                transition: 'stroke-dasharray 0.5s ease'
              }}
            />
          </svg>
        )}

        {/* Level number */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) ${isAnimating ? 'scale(1.2)' : 'scale(1)'}`,
            width: `calc(${currentSize.badge} - ${currentSize.progress} * 3)`,
            height: `calc(${currentSize.badge} - ${currentSize.progress} * 3)`,
            borderRadius: '50%',
            backgroundColor: levelColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 2px 8px ${levelColor}40`,
            transition: 'transform 0.3s ease'
          }}
        >
          <span
            style={{
              fontSize: currentSize.font,
              fontWeight: '800',
              color: 'white',
              textShadow: '0 1px 2px rgba(0,0,0,0.2)'
            }}
          >
            {level}
          </span>
        </div>
      </div>

      {/* Level name */}
      {showName && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.125rem'
          }}
        >
          <span
            style={{
              fontSize: currentSize.font,
              fontWeight: '600',
              color: colors.textPrimary
            }}
          >
            {levelName}
          </span>
          {showProgress && (
            <span
              style={{
                fontSize: `calc(${currentSize.font} * 0.8)`,
                color: colors.textMuted
              }}
            >
              {progressPercent}% to Lvl {level + 1}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default LevelBadge
