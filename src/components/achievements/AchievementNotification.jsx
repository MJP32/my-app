import { useState, useEffect } from 'react';
import { RARITY_CONFIG } from '../../services/achievementConstants';
import { useTheme } from '../../contexts/ThemeContext';

/**
 * AchievementNotification - Popup when achievement is earned
 */
const AchievementNotification = () => {
  const { colors } = useTheme();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const handleAchievementEarned = (event) => {
      const { achievement } = event.detail;
      const id = Date.now();

      setNotifications(prev => [...prev, { ...achievement, notificationId: id }]);

      // Auto-remove after 5 seconds
      setTimeout(() => {
        setNotifications(prev =>
          prev.filter(n => n.notificationId !== id)
        );
      }, 5000);
    };

    window.addEventListener('achievementEarned', handleAchievementEarned);
    return () => {
      window.removeEventListener('achievementEarned', handleAchievementEarned);
    };
  }, []);

  if (notifications.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '80px',
      right: '20px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    }}>
      {notifications.map((achievement) => {
        const rarityConfig = RARITY_CONFIG[achievement.rarity] || RARITY_CONFIG.common;

        return (
          <div
            key={achievement.notificationId}
            style={{
              backgroundColor: colors.bgSecondary,
              borderRadius: '12px',
              padding: '1rem 1.25rem',
              boxShadow: `0 8px 24px rgba(0, 0, 0, 0.2), 0 0 0 2px ${rarityConfig.color}`,
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              minWidth: '280px',
              animation: 'slideIn 0.3s ease-out'
            }}
          >
            {/* Icon */}
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: rarityConfig.bgColor,
              border: `3px solid ${rarityConfig.color}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.75rem',
              flexShrink: 0
            }}>
              {achievement.icon}
            </div>

            {/* Content */}
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '0.7rem',
                fontWeight: '700',
                color: rarityConfig.color,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '0.125rem'
              }}>
                Achievement Unlocked!
              </div>
              <div style={{
                fontSize: '1rem',
                fontWeight: '700',
                color: colors.textPrimary,
                marginBottom: '0.125rem'
              }}>
                {achievement.name}
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: colors.textSecondary
              }}>
                {achievement.description}
              </div>
              {achievement.xpBonus > 0 && (
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  color: '#f59e0b',
                  marginTop: '0.25rem'
                }}>
                  +{achievement.xpBonus} XP
                </div>
              )}
            </div>

            {/* Close button */}
            <button
              onClick={() => {
                setNotifications(prev =>
                  prev.filter(n => n.notificationId !== achievement.notificationId)
                );
              }}
              style={{
                background: 'none',
                border: 'none',
                color: colors.textSecondary,
                cursor: 'pointer',
                fontSize: '1.25rem',
                padding: '0.25rem',
                lineHeight: 1
              }}
            >
              ×
            </button>
          </div>
        );
      })}

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AchievementNotification;
