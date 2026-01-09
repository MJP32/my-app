import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light'
    }
    return 'dark'
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)

    // Update meta theme-color
    const metaTheme = document.querySelector('meta[name="theme-color"]')
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'dark' ? '#111827' : '#ffffff')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  const colors = theme === 'dark' ? {
    // Backgrounds
    bgPrimary: '#111827',
    bgSecondary: '#1f2937',
    bgTertiary: '#374151',
    bgCard: 'linear-gradient(to bottom right, #1f2937, #111827)',

    // Text
    textPrimary: '#f9fafb',
    textSecondary: '#d1d5db',
    textMuted: '#9ca3af',

    // Borders
    border: '#374151',
    borderLight: '#4b5563',

    // Accents
    accent: '#f59e0b',
    accentHover: '#fbbf24',
    success: '#10b981',
    error: '#ef4444',
    info: '#3b82f6',

    // Code
    codeBg: '#1e1e1e',
    codeText: '#d4d4d4'
  } : {
    // Backgrounds
    bgPrimary: '#ffffff',
    bgSecondary: '#f9fafb',
    bgTertiary: '#f3f4f6',
    bgCard: 'linear-gradient(to bottom right, #ffffff, #f9fafb)',

    // Text
    textPrimary: '#111827',
    textSecondary: '#374151',
    textMuted: '#6b7280',

    // Borders
    border: '#e5e7eb',
    borderLight: '#d1d5db',

    // Accents
    accent: '#f59e0b',
    accentHover: '#d97706',
    success: '#059669',
    error: '#dc2626',
    info: '#2563eb',

    // Code
    codeBg: '#f8f9fa',
    codeText: '#1f2937'
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export default ThemeContext
