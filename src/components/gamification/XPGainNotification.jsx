import { useState, useEffect } from 'react'

function XPGainNotification() {
  const [notifications, setNotifications] = useState([])

  // Listen for XP gain events
  useEffect(() => {
    const handleXPGain = (event) => {
      const { amount, source } = event.detail
      const id = Date.now()

      setNotifications(prev => [...prev, { id, amount, source }])

      // Auto-remove after 3 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id))
      }, 3000)
    }

    const handleLevelUp = (event) => {
      const { newLevel, levelName, levelColor } = event.detail
      const id = Date.now() + 1

      setNotifications(prev => [...prev, {
        id,
        isLevelUp: true,
        level: newLevel,
        levelName,
        levelColor
      }])

      // Auto-remove after 4 seconds (longer for level up)
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id))
      }, 4000)
    }

    window.addEventListener('xpGained', handleXPGain)
    window.addEventListener('levelUp', handleLevelUp)

    return () => {
      window.removeEventListener('xpGained', handleXPGain)
      window.removeEventListener('levelUp', handleLevelUp)
    }
  }, [])

  if (notifications.length === 0) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        zIndex: 999999,
        pointerEvents: 'none'
      }}
    >
      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          style={{
            animation: 'slideInRight 0.3s ease-out forwards',
            animationDelay: `${index * 0.1}s`,
            opacity: 0
          }}
        >
          {notification.isLevelUp ? (
            <LevelUpToast
              level={notification.level}
              levelName={notification.levelName}
              levelColor={notification.levelColor}
            />
          ) : (
            <XPToast
              amount={notification.amount}
              source={notification.source}
            />
          )}
        </div>
      ))}
      <style>
        {`
          @keyframes slideInRight {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  )
}

function XPToast({ amount, source }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.75rem 1.25rem',
        backgroundColor: 'rgba(139, 92, 246, 0.95)',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(139, 92, 246, 0.4)',
        backdropFilter: 'blur(8px)'
      }}
    >
      <span style={{ fontSize: '1.5rem' }}>⭐</span>
      <div>
        <div
          style={{
            fontSize: '1.25rem',
            fontWeight: '800',
            color: 'white',
            textShadow: '0 1px 2px rgba(0,0,0,0.1)'
          }}
        >
          +{amount} XP
        </div>
        {source && (
          <div
            style={{
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.8)',
              marginTop: '0.125rem'
            }}
          >
            {source}
          </div>
        )}
      </div>
    </div>
  )
}

function LevelUpToast({ level, levelName, levelColor }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem 1.5rem',
        background: `linear-gradient(135deg, ${levelColor} 0%, ${levelColor}dd 100%)`,
        borderRadius: '16px',
        boxShadow: `0 8px 32px ${levelColor}60`,
        backdropFilter: 'blur(8px)',
        animation: 'levelUpPulse 0.6s ease-in-out'
      }}
    >
      <div
        style={{
          fontSize: '2.5rem',
          animation: 'bounce 0.6s ease-in-out infinite'
        }}
      >
        🎉
      </div>
      <div>
        <div
          style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            color: 'rgba(255,255,255,0.9)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          Level Up!
        </div>
        <div
          style={{
            fontSize: '1.5rem',
            fontWeight: '800',
            color: 'white',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
        >
          Level {level}: {levelName}
        </div>
      </div>
      <style>
        {`
          @keyframes levelUpPulse {
            0% { transform: scale(0.8); opacity: 0; }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
        `}
      </style>
    </div>
  )
}

export default XPGainNotification
