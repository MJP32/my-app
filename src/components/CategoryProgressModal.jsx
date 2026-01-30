import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useFocusTrap } from '../hooks/useKeyboardNavigation'

function CategoryProgressModal({ isOpen, onClose, categoryStats, onCategoryClick }) {
  const modalRef = useFocusTrap(isOpen)

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation() // Prevent event from reaching global handlers
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000003,
        padding: '1rem',
        overflowY: 'auto'
      }}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '90vh',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          margin: 'auto'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '2rem 2rem 1.5rem',
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            color: 'white',
            position: 'relative'
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '0.25rem',
              opacity: 0.8,
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
            onMouseLeave={(e) => e.currentTarget.style.opacity = 0.8}
          >
            ✕
          </button>

          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📊</div>
          <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '700' }}>
            Category Progress
          </h2>
          <p style={{ margin: '0.5rem 0 0', opacity: 0.9, fontSize: '0.95rem' }}>
            Track your progress across all practice categories
          </p>
        </div>

        {/* Body - Scrollable */}
        <div style={{
          padding: '2rem',
          overflowY: 'auto',
          flex: 1
        }}>
          {categoryStats && Object.entries(categoryStats).length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {Object.entries(categoryStats).map(([category, stat]) => (
                <button
                  key={category}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    if (onCategoryClick) {
                      onCategoryClick(category)
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    pointerEvents: 'auto',
                    textAlign: 'left',
                    background: stat.percent === 100
                      ? 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)'
                      : stat.percent >= 75
                      ? 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)'
                      : stat.percent >= 50
                      ? 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)'
                      : stat.percent >= 25
                      ? 'linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)'
                      : 'linear-gradient(135deg, #fecaca 0%, #fca5a5 100%)',
                    borderRadius: '12px',
                    border: stat.percent === 100 ? '2px solid #10b981' : '2px solid #e5e7eb',
                    transition: 'all 0.2s',
                    cursor: onCategoryClick ? 'pointer' : 'default',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    if (onCategoryClick) {
                      e.currentTarget.style.borderColor = '#3b82f6'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.25)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (onCategoryClick) {
                      e.currentTarget.style.borderColor = stat.percent === 100 ? '#10b981' : '#e5e7eb'
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'none'
                    }
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.75rem'
                  }}>
                    <span style={{
                      fontSize: '1rem',
                      fontWeight: '700',
                      color: '#1f2937'
                    }}>
                      {category}
                    </span>
                    <span style={{
                      fontSize: '1rem',
                      fontWeight: '700',
                      color: stat.percent === 100 ? '#10b981' : '#3b82f6',
                      backgroundColor: stat.percent === 100 ? '#d1fae5' : '#dbeafe',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px'
                    }}>
                      {stat.percent}%
                    </span>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    color: '#6b7280'
                  }}>
                    <span>Completed: {stat.completed} / {stat.total}</span>
                    {onCategoryClick ? (
                      <span style={{ color: '#3b82f6', fontWeight: '600', fontSize: '0.8rem' }}>
                        Click to practice →
                      </span>
                    ) : (
                      <span>Remaining: {stat.total - stat.completed}</span>
                    )}
                  </div>

                  <div style={{
                    width: '100%',
                    height: '10px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '5px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${stat.percent}%`,
                      height: '100%',
                      backgroundColor: stat.percent === 100 ? '#10b981' : '#3b82f6',
                      transition: 'width 0.3s ease',
                      borderRadius: '5px'
                    }} />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '3rem 1rem',
              color: '#6b7280'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
              <p style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                No Progress Yet
              </p>
              <p style={{ fontSize: '0.95rem' }}>
                Start completing practice problems to see your progress here!
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '1rem 2rem',
          backgroundColor: '#f9fafb',
          borderTop: '1px solid #e5e7eb',
          textAlign: 'center'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '0.75rem 2rem',
              fontSize: '1rem',
              fontWeight: '600',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default CategoryProgressModal
