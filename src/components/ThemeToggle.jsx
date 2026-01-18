import { useTheme } from '../contexts/ThemeContext'
import { Sun, Moon } from 'lucide-react'

function ThemeToggle({ size = 'medium' }) {
  const { toggleTheme, isDark } = useTheme()

  const sizes = {
    small: { width: 52, height: 28, circle: 20, icon: 12 },
    medium: { width: 64, height: 32, circle: 24, icon: 14 },
    large: { width: 76, height: 38, circle: 30, icon: 18 }
  }

  const { width, height, circle, icon } = sizes[size] || sizes.medium
  const padding = (height - circle) / 2

  return (
    <button
      onClick={toggleTheme}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      style={{
        position: 'relative',
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: `${height}px`,
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        background: isDark
          ? 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)'
          : 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
        boxShadow: isDark
          ? 'inset 0 2px 4px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3)'
          : 'inset 0 2px 4px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(59, 130, 246, 0.3)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden'
      }}
    >
      {/* Stars for dark mode */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: isDark ? 1 : 0,
        transition: 'opacity 0.4s ease',
        pointerEvents: 'none'
      }}>
        <div style={{ position: 'absolute', top: '6px', left: '8px', width: '2px', height: '2px', backgroundColor: '#fff', borderRadius: '50%', opacity: 0.8 }} />
        <div style={{ position: 'absolute', top: '14px', left: '14px', width: '1.5px', height: '1.5px', backgroundColor: '#fff', borderRadius: '50%', opacity: 0.6 }} />
        <div style={{ position: 'absolute', top: '8px', left: '22px', width: '2px', height: '2px', backgroundColor: '#fff', borderRadius: '50%', opacity: 0.7 }} />
      </div>

      {/* Sliding circle with icon */}
      <div
        style={{
          position: 'absolute',
          top: `${padding}px`,
          left: isDark ? `${width - circle - padding}px` : `${padding}px`,
          width: `${circle}px`,
          height: `${circle}px`,
          borderRadius: '50%',
          backgroundColor: isDark ? '#fbbf24' : '#fef3c7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: isDark
            ? '0 2px 8px rgba(251, 191, 36, 0.5)'
            : '0 2px 8px rgba(0, 0, 0, 0.15)'
        }}
      >
        {isDark ? (
          <Sun size={icon} style={{ color: '#92400e', strokeWidth: 2.5 }} />
        ) : (
          <Moon size={icon} style={{ color: '#1e40af', strokeWidth: 2.5 }} />
        )}
      </div>

      {/* Light mode clouds hint */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: isDark ? 0 : 0.3,
        transition: 'opacity 0.4s ease',
        pointerEvents: 'none'
      }}>
        <div style={{ position: 'absolute', bottom: '4px', right: '10px', width: '8px', height: '4px', backgroundColor: '#fff', borderRadius: '4px' }} />
        <div style={{ position: 'absolute', bottom: '6px', right: '16px', width: '6px', height: '3px', backgroundColor: '#fff', borderRadius: '3px' }} />
      </div>
    </button>
  )
}

export default ThemeToggle
