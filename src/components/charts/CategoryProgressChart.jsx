import { useTheme } from '../../contexts/ThemeContext';

/**
 * CategoryProgressChart - Horizontal bar chart showing progress by category
 *
 * Props:
 * - categories: Array of { name, completed, total, color }
 */
const CategoryProgressChart = ({ categories = [] }) => {
  const { colors } = useTheme();

  // Sort by completion percentage
  const sortedCategories = [...categories].sort((a, b) => {
    const pctA = a.total > 0 ? (a.completed / a.total) * 100 : 0;
    const pctB = b.total > 0 ? (b.completed / b.total) * 100 : 0;
    return pctB - pctA;
  });

  return (
    <div style={{
      padding: '1rem',
      backgroundColor: colors.bgSecondary,
      borderRadius: '12px',
      border: `1px solid ${colors.border}`
    }}>
      <h3 style={{
        margin: '0 0 1rem 0',
        fontSize: '0.875rem',
        fontWeight: '700',
        color: colors.textPrimary
      }}>
        📈 Progress by Category
      </h3>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}>
        {sortedCategories.slice(0, 8).map((category) => {
          const percentage = category.total > 0
            ? Math.round((category.completed / category.total) * 100)
            : 0;

          return (
            <div key={category.name}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.25rem'
              }}>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: colors.textPrimary
                }}>
                  {category.name}
                </span>
                <span style={{
                  fontSize: '0.7rem',
                  color: colors.textSecondary
                }}>
                  {category.completed}/{category.total} ({percentage}%)
                </span>
              </div>

              <div style={{
                height: '8px',
                backgroundColor: colors.bgTertiary,
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${percentage}%`,
                  height: '100%',
                  backgroundColor: category.color || '#3b82f6',
                  borderRadius: '4px',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>
          );
        })}
      </div>

      {sortedCategories.length > 8 && (
        <div style={{
          marginTop: '0.75rem',
          fontSize: '0.7rem',
          color: colors.textSecondary,
          textAlign: 'center'
        }}>
          +{sortedCategories.length - 8} more categories
        </div>
      )}
    </div>
  );
};

export default CategoryProgressChart;
