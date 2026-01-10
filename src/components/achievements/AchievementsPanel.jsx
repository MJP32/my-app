import { useState, useEffect } from 'react';
import { getAllAchievements, ACHIEVEMENT_CATEGORIES, RARITY_CONFIG } from '../../services/achievementConstants';
import { getAchievementData, getAchievementStats } from '../../services/achievementService';
import { useTheme } from '../../contexts/ThemeContext';
import AchievementBadge from './AchievementBadge';

/**
 * AchievementsPanel - Display all achievements with filtering
 */
const AchievementsPanel = ({ userId, onClose }) => {
  const { colors } = useTheme();
  const [earnedIds, setEarnedIds] = useState([]);
  const [stats, setStats] = useState({ earned: 0, total: 0, percentage: 0, totalXP: 0 });
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const data = getAchievementData(userId);
    setEarnedIds(data.earned);
    setStats(getAchievementStats(userId));
  }, [userId]);

  const allAchievements = getAllAchievements();
  const filteredAchievements = selectedCategory === 'all'
    ? allAchievements
    : allAchievements.filter(a => a.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All' },
    { id: ACHIEVEMENT_CATEGORIES.PROGRESS, label: 'Progress' },
    { id: ACHIEVEMENT_CATEGORIES.STREAK, label: 'Streaks' },
    { id: ACHIEVEMENT_CATEGORIES.TIME, label: 'Time' },
    { id: ACHIEVEMENT_CATEGORIES.MASTERY, label: 'Mastery' },
    { id: ACHIEVEMENT_CATEGORIES.SPECIAL, label: 'Special' }
  ];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: colors.bgPrimary,
        borderRadius: '16px',
        width: '100%',
        maxWidth: '600px',
        maxHeight: '80vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: `1px solid ${colors.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h2 style={{
              margin: 0,
              fontSize: '1.5rem',
              fontWeight: '700',
              color: colors.textPrimary
            }}>
              🏆 Achievements
            </h2>
            <p style={{
              margin: '0.25rem 0 0 0',
              fontSize: '0.875rem',
              color: colors.textSecondary
            }}>
              {stats.earned} of {stats.total} unlocked ({stats.percentage}%)
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: colors.textSecondary,
              padding: '0.5rem'
            }}
          >
            ×
          </button>
        </div>

        {/* Stats Bar */}
        <div style={{
          padding: '1rem 1.5rem',
          backgroundColor: colors.bgSecondary,
          display: 'flex',
          gap: '1.5rem'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#3b82f6'
            }}>
              {stats.earned}
            </div>
            <div style={{
              fontSize: '0.7rem',
              color: colors.textSecondary,
              textTransform: 'uppercase'
            }}>
              Unlocked
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#f59e0b'
            }}>
              {stats.totalXP}
            </div>
            <div style={{
              fontSize: '0.7rem',
              color: colors.textSecondary,
              textTransform: 'uppercase'
            }}>
              XP Earned
            </div>
          </div>
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center'
          }}>
            <div style={{
              flex: 1,
              height: '8px',
              backgroundColor: colors.border,
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${stats.percentage}%`,
                height: '100%',
                backgroundColor: '#3b82f6',
                borderRadius: '4px',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div style={{
          padding: '1rem 1.5rem',
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          borderBottom: `1px solid ${colors.border}`
        }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: '0.375rem 0.75rem',
                borderRadius: '6px',
                border: 'none',
                fontSize: '0.75rem',
                fontWeight: '600',
                cursor: 'pointer',
                backgroundColor: selectedCategory === cat.id ? '#3b82f6' : colors.bgTertiary,
                color: selectedCategory === cat.id ? 'white' : colors.textSecondary,
                transition: 'all 0.2s ease'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          padding: '1.5rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
            gap: '1.5rem'
          }}>
            {filteredAchievements.map(achievement => (
              <AchievementBadge
                key={achievement.id}
                achievement={achievement}
                isEarned={earnedIds.includes(achievement.id)}
                size="medium"
              />
            ))}
          </div>
        </div>

        {/* Rarity Legend */}
        <div style={{
          padding: '1rem 1.5rem',
          borderTop: `1px solid ${colors.border}`,
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          {Object.entries(RARITY_CONFIG).map(([key, config]) => (
            <div
              key={key}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
                fontSize: '0.7rem'
              }}
            >
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: config.color
              }} />
              <span style={{ color: colors.textSecondary }}>
                {config.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementsPanel;
