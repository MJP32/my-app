function LoadingSpinner({
  size = 'medium',
  color = '#f59e0b',
  text = '',
  fullScreen = false
}) {
  const sizes = {
    small: { spinner: '1.5rem', border: '2px' },
    medium: { spinner: '3rem', border: '3px' },
    large: { spinner: '4rem', border: '4px' }
  }

  const { spinner, border } = sizes[size] || sizes.medium

  const spinnerElement = (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem'
    }}>
      <div
        style={{
          width: spinner,
          height: spinner,
          border: `${border} solid #374151`,
          borderTopColor: color,
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}
      />
      {text && (
        <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>{text}</p>
      )}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )

  if (fullScreen) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}>
        {spinnerElement}
      </div>
    )
  }

  return spinnerElement
}

// Skeleton loader for content placeholders
export function Skeleton({ width = '100%', height = '1rem', borderRadius = '4px', style = {} }) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: '#374151',
        animation: 'pulse 2s ease-in-out infinite',
        ...style
      }}
    >
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}

// Card skeleton loader
export function CardSkeleton({ count = 1 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            padding: '1.5rem',
            backgroundColor: '#1f2937',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}
        >
          <Skeleton width="60%" height="1.5rem" style={{ marginBottom: '1rem' }} />
          <Skeleton width="100%" height="0.9rem" style={{ marginBottom: '0.5rem' }} />
          <Skeleton width="80%" height="0.9rem" style={{ marginBottom: '1rem' }} />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Skeleton width="4rem" height="1.5rem" borderRadius="12px" />
            <Skeleton width="4rem" height="1.5rem" borderRadius="12px" />
          </div>
        </div>
      ))}
    </>
  )
}

export default LoadingSpinner
