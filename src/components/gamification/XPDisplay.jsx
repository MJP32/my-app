import { useState, useEffect, useRef } from 'react'
import { useTheme } from '../../contexts/ThemeContext'

function XPDisplay({ xp = 0, todayXP = 0, showToday = true, size = 'medium' }) {
  const { colors } = useTheme()
  const [displayXP, setDisplayXP] = useState(xp)
  const [isAnimating, setIsAnimating] = useState(false)
  const prevXPRef = useRef(xp)

  // Animate count-up when XP increases
  useEffect(() => {
    if (xp !== prevXPRef.current) {
      const diff = xp - prevXPRef.current

      if (diff > 0) {
        setIsAnimating(true)

        // Animate the number
        const startXP = prevXPRef.current
        const duration = 600
        const startTime = Date.now()

        const animate = () => {
          const elapsed = Date.now() - startTime
          const progress = Math.min(elapsed / duration, 1)

          // Easing function (ease-out)
          const eased = 1 - Math.pow(1 - progress, 3)
          const currentXP = Math.floor(startXP + diff * eased)

          setDisplayXP(currentXP)

          if (progress < 1) {
            requestAnimationFrame(animate)
          } else {
            setDisplayXP(xp)
            setTimeout(() => setIsAnimating(false), 200)
          }
        }

        requestAnimationFrame(animate)
      } else {
        setDisplayXP(xp)
      }

      prevXPRef.current = xp
    }
  }, [xp])

  const sizes = {
    small: { font: '0.875rem', padding: '0.25rem 0.5rem' },
    medium: { font: '1rem', padding: '0.375rem 0.75rem' },
    large: { font: '1.25rem', padding: '0.5rem 1rem' }
  }

  const currentSize = sizes[size] || sizes.medium

  // Format large numbers
  const formatXP = (value) => {
    if (value >= 10000) {
      return `${(value / 1000).toFixed(1)}k`
    }
    return value.toLocaleString()
  }

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.375rem',
        padding: currentSize.padding,
        borderRadius: '20px',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        border: '1px solid rgba(139, 92, 246, 0.2)',
        transition: 'all 0.3s ease',
        transform: isAnimating ? 'scale(1.05)' : 'scale(1)'
      }}
      title={`Total XP: ${xp.toLocaleString()}${showToday ? ` | Today: +${todayXP}` : ''}`}
    >
      <span
        style={{
          fontSize: `calc(${currentSize.font} * 1.1)`,
          animation: isAnimating ? 'sparkle 0.6s ease-in-out' : 'none'
        }}
      >
        ⭐
      </span>
      <span
        style={{
          fontSize: currentSize.font,
          fontWeight: '700',
          color: '#8b5cf6',
          fontVariantNumeric: 'tabular-nums',
          minWidth: '3ch'
        }}
      >
        {formatXP(displayXP)}
      </span>
      <span
        style={{
          fontSize: `calc(${currentSize.font} * 0.85)`,
          fontWeight: '600',
          color: '#a78bfa'
        }}
      >
        XP
      </span>
      {showToday && todayXP > 0 && (
        <span
          style={{
            fontSize: `calc(${currentSize.font} * 0.8)`,
            color: '#22c55e',
            fontWeight: '600',
            marginLeft: '0.25rem'
          }}
        >
          +{todayXP}
        </span>
      )}
      <style>
        {`
          @keyframes sparkle {
            0%, 100% { transform: scale(1) rotate(0deg); }
            25% { transform: scale(1.2) rotate(-10deg); }
            50% { transform: scale(1.3) rotate(10deg); }
            75% { transform: scale(1.2) rotate(-5deg); }
          }
        `}
      </style>
    </div>
  )
}

export default XPDisplay
