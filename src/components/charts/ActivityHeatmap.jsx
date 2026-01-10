import { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

/**
 * ActivityHeatmap - GitHub-style activity heatmap
 *
 * Props:
 * - userId: Current user's ID
 * - weeks: Number of weeks to show (default 12)
 */
const ActivityHeatmap = ({ userId, weeks = 12 }) => {
  const { colors } = useTheme();
  const [activityData, setActivityData] = useState({});
  const [maxActivity, setMaxActivity] = useState(0);

  useEffect(() => {
    // Load activity data from localStorage
    const loadActivityData = () => {
      try {
        const key = `activity_log_${userId || 'anonymous'}`;
        const stored = localStorage.getItem(key);
        if (stored) {
          const data = JSON.parse(stored);
          setActivityData(data);
          const max = Math.max(...Object.values(data), 1);
          setMaxActivity(max);
        }
      } catch (error) {
        console.error('Error loading activity data:', error);
      }
    };

    loadActivityData();

    // Listen for progress updates
    const handleUpdate = () => loadActivityData();
    window.addEventListener('progressUpdate', handleUpdate);
    return () => window.removeEventListener('progressUpdate', handleUpdate);
  }, [userId]);

  // Generate dates for the heatmap
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    const totalDays = weeks * 7;

    for (let i = totalDays - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }

    return dates;
  };

  const dates = generateDates();

  // Group dates by week
  const weeksData = [];
  for (let i = 0; i < dates.length; i += 7) {
    weeksData.push(dates.slice(i, i + 7));
  }

  // Get intensity color based on activity count
  const getColor = (count) => {
    if (!count || count === 0) return colors.bgTertiary;
    const intensity = Math.min(count / Math.max(maxActivity, 1), 1);

    if (intensity <= 0.25) return '#9be9a8';
    if (intensity <= 0.5) return '#40c463';
    if (intensity <= 0.75) return '#30a14e';
    return '#216e39';
  };

  const dayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
  const cellSize = 12;
  const cellGap = 3;

  return (
    <div style={{
      padding: '1rem',
      backgroundColor: colors.bgSecondary,
      borderRadius: '12px',
      border: `1px solid ${colors.border}`
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem'
      }}>
        <h3 style={{
          margin: 0,
          fontSize: '0.875rem',
          fontWeight: '700',
          color: colors.textPrimary
        }}>
          📊 Activity Heatmap
        </h3>
        <span style={{
          fontSize: '0.75rem',
          color: colors.textSecondary
        }}>
          Last {weeks} weeks
        </span>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {/* Day labels */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: `${cellGap}px`,
          paddingTop: '20px'
        }}>
          {dayLabels.map((label, i) => (
            <div
              key={i}
              style={{
                height: `${cellSize}px`,
                fontSize: '0.6rem',
                color: colors.textSecondary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: '0.25rem',
                width: '24px'
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Heatmap grid */}
        <div style={{ overflow: 'auto' }}>
          <div style={{ display: 'flex', gap: `${cellGap}px` }}>
            {weeksData.map((week, weekIndex) => (
              <div
                key={weekIndex}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: `${cellGap}px`
                }}
              >
                {/* Month label on first week of month */}
                <div style={{
                  height: '16px',
                  fontSize: '0.6rem',
                  color: colors.textSecondary
                }}>
                  {week[0] && new Date(week[0]).getDate() <= 7 ?
                    new Date(week[0]).toLocaleDateString('en-US', { month: 'short' }) : ''}
                </div>

                {week.map((date, dayIndex) => {
                  const count = activityData[date] || 0;
                  return (
                    <div
                      key={date}
                      title={`${date}: ${count} problems`}
                      style={{
                        width: `${cellSize}px`,
                        height: `${cellSize}px`,
                        backgroundColor: getColor(count),
                        borderRadius: '2px',
                        cursor: 'default'
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: '0.5rem',
        marginTop: '0.75rem'
      }}>
        <span style={{
          fontSize: '0.65rem',
          color: colors.textSecondary
        }}>
          Less
        </span>
        {[0, 0.25, 0.5, 0.75, 1].map((intensity, i) => (
          <div
            key={i}
            style={{
              width: '10px',
              height: '10px',
              backgroundColor: intensity === 0 ? colors.bgTertiary :
                intensity <= 0.25 ? '#9be9a8' :
                intensity <= 0.5 ? '#40c463' :
                intensity <= 0.75 ? '#30a14e' : '#216e39',
              borderRadius: '2px'
            }}
          />
        ))}
        <span style={{
          fontSize: '0.65rem',
          color: colors.textSecondary
        }}>
          More
        </span>
      </div>
    </div>
  );
};

export default ActivityHeatmap;
