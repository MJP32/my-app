import { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

/**
 * WeeklyProgressChart - Bar chart showing problems completed per day
 *
 * Props:
 * - userId: Current user's ID
 */
const WeeklyProgressChart = ({ userId }) => {
  const { colors } = useTheme();
  const [weekData, setWeekData] = useState([]);
  const [maxValue, setMaxValue] = useState(0);

  useEffect(() => {
    const loadWeekData = () => {
      try {
        const key = `activity_log_${userId || 'anonymous'}`;
        const stored = localStorage.getItem(key);
        const activityData = stored ? JSON.parse(stored) : {};

        // Get last 7 days
        const days = [];
        const today = new Date();

        for (let i = 6; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

          days.push({
            date: dateStr,
            day: dayName,
            count: activityData[dateStr] || 0,
            isToday: i === 0
          });
        }

        setWeekData(days);
        setMaxValue(Math.max(...days.map(d => d.count), 5));
      } catch (error) {
        console.error('Error loading week data:', error);
      }
    };

    loadWeekData();

    const handleUpdate = () => loadWeekData();
    window.addEventListener('progressUpdate', handleUpdate);
    return () => window.removeEventListener('progressUpdate', handleUpdate);
  }, [userId]);

  const totalWeek = weekData.reduce((sum, d) => sum + d.count, 0);
  const avgPerDay = weekData.length > 0 ? (totalWeek / 7).toFixed(1) : 0;

  return (
    <div style={{
      padding: '1rem',
      backgroundColor: colors.bgSecondary,
      borderRadius: '12px',
      border: `1px solid ${colors.border}`
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <h3 style={{
          margin: 0,
          fontSize: '0.875rem',
          fontWeight: '700',
          color: colors.textPrimary
        }}>
          📅 This Week
        </h3>
        <div style={{
          display: 'flex',
          gap: '1rem',
          fontSize: '0.7rem'
        }}>
          <span style={{ color: colors.textSecondary }}>
            Total: <strong style={{ color: '#3b82f6' }}>{totalWeek}</strong>
          </span>
          <span style={{ color: colors.textSecondary }}>
            Avg: <strong style={{ color: '#10b981' }}>{avgPerDay}/day</strong>
          </span>
        </div>
      </div>

      {/* Bar chart */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: '100px',
        gap: '0.5rem',
        paddingBottom: '1.5rem',
        position: 'relative'
      }}>
        {weekData.map((day) => {
          const height = maxValue > 0 ? (day.count / maxValue) * 100 : 0;

          return (
            <div
              key={day.date}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                justifyContent: 'flex-end'
              }}
            >
              {/* Count label */}
              {day.count > 0 && (
                <div style={{
                  fontSize: '0.65rem',
                  fontWeight: '700',
                  color: colors.textPrimary,
                  marginBottom: '0.25rem'
                }}>
                  {day.count}
                </div>
              )}

              {/* Bar */}
              <div style={{
                width: '100%',
                maxWidth: '32px',
                height: `${Math.max(height, 4)}%`,
                backgroundColor: day.isToday ? '#3b82f6' : '#10b981',
                borderRadius: '4px 4px 0 0',
                transition: 'height 0.3s ease',
                opacity: day.count > 0 ? 1 : 0.3
              }} />

              {/* Day label */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                fontSize: '0.65rem',
                fontWeight: day.isToday ? '700' : '500',
                color: day.isToday ? '#3b82f6' : colors.textSecondary
              }}>
                {day.day}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyProgressChart;
