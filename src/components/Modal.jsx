import { useEffect, useCallback } from 'react'
import { useTheme } from '../contexts/ThemeContext'

function Modal({
  isOpen,
  onClose,
  children,
  maxWidth = '1400px',
  showCloseButton = true,
  closeOnEscape = true,
  closeOnBackdrop = true,
  zIndex = 1000000
}) {
  const { isDark, colors } = useTheme()
  const handleEscape = useCallback((e) => {
    if (e.key === 'Escape' && closeOnEscape) {
      onClose()
    }
  }, [onClose, closeOnEscape])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleEscape])

  if (!isOpen) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex,
        padding: '1rem',
        overflow: 'auto'
      }}
      onClick={closeOnBackdrop ? onClose : undefined}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: colors.bgSecondary,
          borderRadius: '16px',
          maxWidth: '95vw',
          width: maxWidth,
          maxHeight: '95vh',
          overflow: 'auto',
          boxShadow: isDark
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
            : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          position: 'relative',
          border: `1px solid ${colors.border}`,
          color: colors.textPrimary
        }}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              width: '2rem',
              height: '2rem',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: colors.bgTertiary,
              color: colors.textMuted,
              fontSize: '1.25rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.border
              e.currentTarget.style.color = colors.textPrimary
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.bgTertiary
              e.currentTarget.style.color = colors.textMuted
            }}
          >
            ×
          </button>
        )}
        {children}
      </div>
    </div>
  )
}

export default Modal
