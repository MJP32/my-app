import { useState, useEffect } from 'react';
import {
  getDailyChallenge,
  isDailyChallengeCompleted,
  getDifficultyColor
} from '../services/dailyChallengeService';
import { useTheme } from '../contexts/ThemeContext';

/**
 * DailyChallenge - Display today's challenge problem
 *
 * Props:
 * - userId: Current user's ID
 * - onNavigate: Function to navigate to the problem
 */
const DailyChallenge = ({ userId, onNavigate }) => {
  const { colors } = useTheme();
  const [challenge, setChallenge] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const todayChallenge = getDailyChallenge();
    setChallenge(todayChallenge);
    setIsCompleted(isDailyChallengeCompleted(userId));

    // Listen for completion events
    const handleCompletion = () => {
      setIsCompleted(isDailyChallengeCompleted(userId));
    };

    window.addEventListener('dailyChallengeCompleted', handleCompletion);
    window.addEventListener('progressUpdate', handleCompletion);

    return () => {
      window.removeEventListener('dailyChallengeCompleted', handleCompletion);
      window.removeEventListener('progressUpdate', handleCompletion);
    };
  }, [userId]);

  if (!challenge) return null;

  const difficultyColor = getDifficultyColor(challenge.difficulty);

  return (
    <div
      onClick={() => onNavigate && onNavigate(challenge.page)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: '1rem 1.25rem',
        borderRadius: '12px',
        background: isCompleted
          ? `linear-gradient(135deg, ${colors.bgSecondary} 0%, rgba(16, 185, 129, 0.1) 100%)`
          : `linear-gradient(135deg, ${colors.bgSecondary} 0%, rgba(59, 130, 246, 0.1) 100%)`,
        border: `2px solid ${isCompleted ? '#10b981' : '#3b82f6'}`,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: isHovered
          ? `0 8px 20px -4px ${isCompleted ? 'rgba(16, 185, 129, 0.3)' : 'rgba(59, 130, 246, 0.3)'}`
          : '0 2px 8px -2px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '1rem'
      }}
    >
      {/* Icon */}
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        backgroundColor: isCompleted ? '#10b981' : '#3b82f6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        flexShrink: 0
      }}>
        {isCompleted ? '✅' : '🎯'}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '0.25rem'
        }}>
          <span style={{
            fontSize: '0.7rem',
            fontWeight: '700',
            color: isCompleted ? '#10b981' : '#3b82f6',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Daily Challenge
          </span>
          <span style={{
            fontSize: '0.65rem',
            fontWeight: '700',
            color: 'white',
            backgroundColor: '#f59e0b',
            padding: '0.125rem 0.375rem',
            borderRadius: '4px'
          }}>
            2x XP
          </span>
          {isCompleted && (
            <span style={{
              fontSize: '0.65rem',
              fontWeight: '700',
              color: 'white',
              backgroundColor: '#10b981',
              padding: '0.125rem 0.375rem',
              borderRadius: '4px'
            }}>
              COMPLETED
            </span>
          )}
        </div>

        <div style={{
          fontSize: '1rem',
          fontWeight: '700',
          color: colors.textPrimary,
          marginBottom: '0.25rem',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {challenge.title}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontSize: '0.75rem'
        }}>
          <span style={{
            color: difficultyColor,
            fontWeight: '600'
          }}>
            {challenge.difficulty}
          </span>
          <span style={{ color: colors.textSecondary }}>
            {challenge.category}
          </span>
        </div>
      </div>

      {/* Arrow */}
      <div style={{
        color: colors.textSecondary,
        fontSize: '1.25rem',
        transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
        transition: 'transform 0.2s ease'
      }}>
        →
      </div>
    </div>
  );
};

export default DailyChallenge;
