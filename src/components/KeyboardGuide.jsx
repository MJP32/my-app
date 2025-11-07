import { useEffect } from 'react'

function KeyboardGuide({ isOpen, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault()
        e.stopPropagation() // Prevent event from reaching global handlers
        onClose()
      }
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const shortcuts = [
    {
      category: 'Navigation',
      items: [
        { keys: ['↑', '↓', '←', '→'], description: 'Navigate between items' },
        { keys: ['Tab'], description: 'Move forward through elements' },
        { keys: ['Shift', '+', 'Tab'], description: 'Move backward through elements' },
        { keys: ['Home'], description: 'Jump to first item' },
        { keys: ['End'], description: 'Jump to last item' }
      ]
    },
    {
      category: 'Actions',
      items: [
        { keys: ['Enter'], description: 'Activate/Select focused element' },
        { keys: ['Space'], description: 'Activate/Select focused element' },
        { keys: ['Esc'], description: 'Close modal/menu or go back' }
      ]
    },
    {
      category: 'Shortcuts',
      items: [
        { keys: ['?'], description: 'Toggle this keyboard guide' },
        { keys: ['H'], description: 'Show/hide keyboard shortcuts' }
      ]
    }
  ]

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999999,
        padding: '2rem'
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="keyboard-guide-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          maxWidth: '700px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          animation: 'slideIn 0.3s ease-out'
        }}
      >
        <div style={{
          padding: '2rem',
          borderBottom: '2px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2
              id="keyboard-guide-title"
              style={{
                margin: 0,
                fontSize: '1.875rem',
                fontWeight: '800',
                color: '#1f2937'
              }}
            >
              ⌨️ Keyboard Navigation Guide
            </h2>
            <button
              onClick={onClose}
              aria-label="Close keyboard guide"
              style={{
                padding: '0.5rem',
                fontSize: '1.5rem',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#6b7280',
                borderRadius: '8px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f3f4f6'
                e.target.style.color = '#1f2937'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent'
                e.target.style.color = '#6b7280'
              }}
            >
              ✕
            </button>
          </div>
          <p style={{
            marginTop: '0.5rem',
            color: '#6b7280',
            fontSize: '1rem'
          }}>
            Navigate the entire application using your keyboard
          </p>
        </div>

        <div style={{ padding: '2rem' }}>
          {shortcuts.map((section, idx) => (
            <div key={idx} style={{ marginBottom: idx < shortcuts.length - 1 ? '2rem' : 0 }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '1rem'
              }}>
                {section.category}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {section.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem',
                      backgroundColor: '#f9fafb',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      {item.keys.map((key, keyIdx) => (
                        <span key={keyIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <kbd style={{
                            padding: '0.25rem 0.75rem',
                            backgroundColor: 'white',
                            border: '2px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            color: '#374151',
                            boxShadow: '0 2px 0 #d1d5db',
                            fontFamily: 'monospace',
                            minWidth: '2rem',
                            textAlign: 'center'
                          }}>
                            {key}
                          </kbd>
                          {keyIdx < item.keys.length - 1 && <span style={{ color: '#9ca3af' }}>+</span>}
                        </span>
                      ))}
                    </div>
                    <span style={{
                      color: '#6b7280',
                      fontSize: '0.95rem',
                      marginLeft: '1rem'
                    }}>
                      {item.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          padding: '1.5rem 2rem',
          backgroundColor: '#f9fafb',
          borderTop: '2px solid #e5e7eb',
          borderRadius: '0 0 16px 16px'
        }}>
          <p style={{
            margin: 0,
            fontSize: '0.875rem',
            color: '#6b7280',
            textAlign: 'center'
          }}>
            Press <kbd style={{
              padding: '0.125rem 0.5rem',
              backgroundColor: 'white',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontWeight: '600',
              fontFamily: 'monospace'
            }}>Esc</kbd> or <kbd style={{
              padding: '0.125rem 0.5rem',
              backgroundColor: 'white',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontWeight: '600',
              fontFamily: 'monospace'
            }}>?</kbd> to close this guide
          </p>
        </div>
      </div>

      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  )
}

export default KeyboardGuide
