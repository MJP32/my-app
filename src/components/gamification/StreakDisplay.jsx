import { useState, useEffect } from 'react'
import { useTheme } from '../../contexts/ThemeContext'

function StreakDisplay({ streak = 0, showLabel = true, size = 'medium' }) {
  const { colors } = useTheme()
  const [isAnimating, setIsAnimating] = useState(false)

  // Animate when streak changes
  useEffect(() => {
    if (streak > 0) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 600)
      return () => clearTimeout(timer)
    }
  }, [streak])

  const sizes = {
    small: { font: '0.875rem', icon: '1rem', padding: '0.25rem 0.5rem' },
    medium: { font: '1rem', icon: '1.25rem', padding: '0.375rem 0.75rem' },
    large: { font: '1.25rem', icon: '1.5rem', padding: '0.5rem 1rem' }
  }

  const currentSize = sizes[size] || sizes.medium
  const isActive = streak > 0

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.375rem',
        padding: currentSize.padding,
        borderRadius: '20px',
        backgroundColor: isActive ? 'rgba(249, 115, 22, 0.15)' : colors.bgTertiary,
        border: `1px solid ${isActive ? 'rgba(249, 115, 22, 0.3)' : colors.border}`,
        transition: 'all 0.3s ease',
        transform: isAnimating ? 'scale(1.1)' : 'scale(1)'
      }}
      title={`${streak} day streak${streak !== 1 ? 's' : ''}`}
    >
      <span
        style={{
          fontSize: currentSize.icon,
          filter: isActive ? 'none' : 'grayscale(100%)',
          opacity: isActive ? 1 : 0.5,
          animation: isActive && isAnimating ? 'pulse 0.6s ease-in-out' : 'none'
        }}
      >
        {isActive ? '🔥' : '💨'}
      </span>
      <span
        style={{
          fontSize: currentSize.font,
          fontWeight: '700',
          color: isActive ? '#f97316' : colors.textMuted,
          fontVariantNumeric: 'tabular-nums'
        }}
      >
        {streak}
      </span>
      {showLabel && (
        <span
          style={{
            fontSize: `calc(${currentSize.font} * 0.85)`,
            color: isActive ? '#fb923c' : colors.textMuted,
            fontWeight: '500'
          }}
        >
          {streak === 1 ? 'day' : 'days'}
        </span>
      )}
      <style>
        {`
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
          }
        `}
      </style>
    </div>
  )
}

export default StreakDisplay
