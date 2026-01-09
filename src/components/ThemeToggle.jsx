import { useTheme } from '../contexts/ThemeContext'

function ThemeToggle({ size = 'medium' }) {
  const { theme, toggleTheme, isDark } = useTheme()

  const sizes = {
    small: { button: '2rem', icon: '1rem' },
    medium: { button: '2.5rem', icon: '1.25rem' },
    large: { button: '3rem', icon: '1.5rem' }
  }

  const { button, icon } = sizes[size] || sizes.medium

  return (
    <button
      onClick={toggleTheme}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      style={{
        width: button,
        height: button,
        borderRadius: '50%',
        border: 'none',
        backgroundColor: isDark ? '#374151' : '#f3f4f6',
        color: isDark ? '#fbbf24' : '#6b7280',
        fontSize: icon,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
        boxShadow: isDark
          ? '0 2px 8px rgba(0, 0, 0, 0.3)'
          : '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)'
        e.currentTarget.style.backgroundColor = isDark ? '#4b5563' : '#e5e7eb'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.backgroundColor = isDark ? '#374151' : '#f3f4f6'
      }}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}

export default ThemeToggle
