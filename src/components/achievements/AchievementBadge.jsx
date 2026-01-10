import { RARITY_CONFIG } from '../../services/achievementConstants';
import { useTheme } from '../../contexts/ThemeContext';

/**
 * AchievementBadge - Display a single achievement badge
 */
const AchievementBadge = ({
  achievement,
  isEarned = false,
  showDetails = true,
  size = 'medium'
}) => {
  const { colors } = useTheme();
  const rarityConfig = RARITY_CONFIG[achievement.rarity] || RARITY_CONFIG.common;

  const sizes = {
    small: { badge: 40, icon: '1.25rem', font: '0.65rem' },
    medium: { badge: 56, icon: '1.75rem', font: '0.75rem' },
    large: { badge: 72, icon: '2.25rem', font: '0.875rem' }
  };

  const s = sizes[size] || sizes.medium;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.5rem',
      opacity: isEarned ? 1 : 0.4,
      filter: isEarned ? 'none' : 'grayscale(100%)',
      transition: 'all 0.2s ease'
    }}>
      {/* Badge circle */}
      <div style={{
        width: `${s.badge}px`,
        height: `${s.badge}px`,
        borderRadius: '50%',
        backgroundColor: isEarned ? rarityConfig.bgColor : colors.bgTertiary,
        border: `3px solid ${isEarned ? rarityConfig.color : colors.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: s.icon,
        boxShadow: isEarned
          ? `0 4px 12px ${rarityConfig.color}40`
          : 'none',
        position: 'relative'
      }}>
        {achievement.icon}

        {/* Earned checkmark */}
        {isEarned && (
          <div style={{
            position: 'absolute',
            bottom: -2,
            right: -2,
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            backgroundColor: '#10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.65rem',
            color: 'white',
            border: `2px solid ${colors.bgPrimary}`
          }}>
            ✓
          </div>
        )}
      </div>

      {/* Details */}
      {showDetails && (
        <div style={{
          textAlign: 'center',
          maxWidth: '100px'
        }}>
          <div style={{
            fontSize: s.font,
            fontWeight: '700',
            color: isEarned ? colors.textPrimary : colors.textSecondary,
            lineHeight: 1.2,
            marginBottom: '0.125rem'
          }}>
            {achievement.name}
          </div>
          <div style={{
            fontSize: '0.6rem',
            color: rarityConfig.color,
            fontWeight: '600',
            textTransform: 'uppercase'
          }}>
            {rarityConfig.label}
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementBadge;
