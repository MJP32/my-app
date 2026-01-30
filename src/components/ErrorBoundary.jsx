import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo })
    console.error('Error caught by boundary:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
    if (this.props.onReset) {
      this.props.onReset()
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div style={{
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          backgroundColor: '#1f2937',
          borderRadius: '12px',
          margin: '2rem',
          border: '1px solid #374151'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>😵</div>
          <h2 style={{
            color: '#ef4444',
            fontSize: '1.5rem',
            fontWeight: '700',
            marginBottom: '0.5rem'
          }}>
            Oops! Something went wrong
          </h2>
          <p style={{
            color: '#9ca3af',
            marginBottom: '1.5rem',
            textAlign: 'center',
            maxWidth: '400px'
          }}>
            {this.props.message || "We encountered an unexpected error. Please try again."}
          </p>

          {import.meta.env.DEV && this.state.error && (
            <details style={{
              backgroundColor: '#111827',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              maxWidth: '600px',
              width: '100%',
              overflow: 'auto'
            }}>
              <summary style={{ color: '#f59e0b', cursor: 'pointer', marginBottom: '0.5rem' }}>
                Error Details
              </summary>
              <pre style={{
                color: '#ef4444',
                fontSize: '0.8rem',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}>
                {this.state.error.toString()}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={this.handleReset}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
            >
              Try Again
            </button>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#374151',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4b5563'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#374151'}
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
