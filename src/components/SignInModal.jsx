import { useState, useRef, useEffect } from 'react'
import { signInWithEmail, signUpWithEmail, signInWithGoogle } from '../services/authService'
import { useTheme } from '../contexts/ThemeContext'

function SignInModal({ isOpen, onClose }) {
  const { isDark, colors } = useTheme()
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const modalRef = useRef(null)

  useEffect(() => {
    // Set global flag to disable ALL keyboard handlers
    if (isOpen) {
      window.__SIGN_IN_MODAL_OPEN__ = true
    }

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose()
      }
    }

    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault()
        e.stopPropagation() // Prevent event from reaching global handlers
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      // Clear global flag
      window.__SIGN_IN_MODAL_OPEN__ = false
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    console.log('🔐 Authentication attempt started')
    console.log('Mode:', isSignUp ? 'Sign Up' : 'Sign In')
    console.log('Email:', email)

    try {
      let result
      if (isSignUp) {
        if (!displayName.trim()) {
          setError('Please enter your name')
          setIsLoading(false)
          return
        }
        console.log('📝 Attempting sign up with:', email)
        result = await signUpWithEmail(email, password, displayName)
        console.log('📝 Sign up result:', result)
      } else {
        console.log('🔑 Attempting sign in with:', email)
        result = await signInWithEmail(email, password)
        console.log('🔑 Sign in result:', result)
      }

      if (result.success) {
        onClose()
        setEmail('')
        setPassword('')
        setDisplayName('')
      } else {
        console.error('Authentication error:', result.error)
        setError(result.error)
      }
    } catch (err) {
      console.error('Unexpected error:', err)
      setError('An unexpected error occurred: ' + err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError('')
    setIsLoading(true)

    try {
      const result = await signInWithGoogle()
      if (result.success) {
        onClose()
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError('Failed to sign in with Google')
    } finally {
      setIsLoading(false)
    }
  }

  const toggleMode = () => {
    setIsSignUp(!isSignUp)
    setError('')
  }

  return (
    <div
      data-modal="signin"
      data-prevent-keyboard-nav="true"
      onClick={(e) => {
        // Close modal when clicking on backdrop
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
        alignItems: 'flex-start',
        justifyContent: 'center',
        zIndex: 1000004,
        padding: '2rem 1rem',
        overflowY: 'auto'
      }}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: colors.bgSecondary,
          borderRadius: '16px',
          maxWidth: '440px',
          width: '100%',
          boxShadow: isDark
            ? '0 20px 60px rgba(0, 0, 0, 0.6)'
            : '0 20px 60px rgba(0, 0, 0, 0.3)',
          overflow: 'hidden',
          margin: 'auto 0',
          pointerEvents: 'auto',
          border: `1px solid ${colors.border}`
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

          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>👤</div>
          <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '700' }}>
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p style={{ margin: '0.5rem 0 0', opacity: 0.9, fontSize: '0.95rem' }}>
            {isSignUp ? 'Sign up to track your progress' : 'Sign in to continue learning'}
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: '2rem' }}>
          {/* Error Message */}
          {error && (
            <div
              style={{
                padding: '0.75rem 1rem',
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                color: '#dc2626',
                fontSize: '0.875rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Name Field (Sign Up Only) */}
            {isSignUp && (
              <div style={{ marginBottom: '1rem' }}>
                <label
                  htmlFor="displayName"
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    color: colors.textSecondary
                  }}
                >
                  Full Name
                </label>
                <input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Michael Perera"
                  tabIndex={0}
                  autoFocus={isSignUp}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    fontSize: '1rem',
                    border: `2px solid ${colors.border}`,
                    borderRadius: '8px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    fontFamily: 'inherit',
                    backgroundColor: colors.bgPrimary,
                    color: colors.textPrimary
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.currentTarget.style.borderColor = colors.border}
                />
              </div>
            )}

            {/* Email Field */}
            <div style={{ marginBottom: '1rem' }}>
              <label
                htmlFor="email"
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  color: colors.textSecondary
                }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
                tabIndex={0}
                autoFocus={!isSignUp}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  fontSize: '1rem',
                  border: `2px solid ${colors.border}`,
                  borderRadius: '8px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  fontFamily: 'inherit',
                  backgroundColor: colors.bgPrimary,
                  color: colors.textPrimary
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.currentTarget.style.borderColor = colors.border}
              />
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label
                htmlFor="password"
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  color: colors.textSecondary
                }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                tabIndex={0}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  fontSize: '1rem',
                  border: `2px solid ${colors.border}`,
                  borderRadius: '8px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  fontFamily: 'inherit',
                  backgroundColor: colors.bgPrimary,
                  color: colors.textPrimary
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.currentTarget.style.borderColor = colors.border}
              />
              <div style={{ fontSize: '0.75rem', color: colors.textMuted, marginTop: '0.25rem' }}>
                Minimum 6 characters
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '0.875rem',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: isLoading ? '#9ca3af' : '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                marginBottom: '1rem'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) e.currentTarget.style.backgroundColor = '#2563eb'
              }}
              onMouseLeave={(e) => {
                if (!isLoading) e.currentTarget.style.backgroundColor = '#3b82f6'
              }}
            >
              {isLoading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
            </button>

            {/* Divider */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                margin: '1.5rem 0'
              }}
            >
              <div style={{ flex: 1, height: '1px', backgroundColor: colors.border }} />
              <span style={{ fontSize: '0.875rem', color: colors.textMuted, fontWeight: '500' }}>
                OR
              </span>
              <div style={{ flex: 1, height: '1px', backgroundColor: colors.border }} />
            </div>

            {/* Google Sign In */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '0.875rem',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: colors.bgPrimary,
                color: colors.textSecondary,
                border: `2px solid ${colors.border}`,
                borderRadius: '8px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = colors.bgTertiary
                  e.currentTarget.style.borderColor = '#3b82f6'
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = colors.bgPrimary
                  e.currentTarget.style.borderColor = colors.border
                }
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M19.8 10.2273C19.8 9.51818 19.7364 8.83637 19.6182 8.18182H10V12.05H15.4818C15.2273 13.3 14.5045 14.3591 13.4273 15.0682V17.5773H16.7364C18.7091 15.8364 19.8 13.2727 19.8 10.2273Z"
                  fill="#4285F4"
                />
                <path
                  d="M10 20C12.7 20 14.9636 19.1045 16.7364 17.5773L13.4273 15.0682C12.5182 15.6682 11.3455 16.0227 10 16.0227C7.39545 16.0227 5.19091 14.2636 4.40455 11.9H0.977273V14.4909C2.74091 17.9909 6.11364 20 10 20Z"
                  fill="#34A853"
                />
                <path
                  d="M4.40455 11.9C4.18182 11.3 4.05455 10.6591 4.05455 10C4.05455 9.34091 4.18182 8.7 4.40455 8.1V5.50909H0.977273C0.354545 6.75909 0 8.14091 0 10C0 11.8591 0.354545 13.2409 0.977273 14.4909L4.40455 11.9Z"
                  fill="#FBBC04"
                />
                <path
                  d="M10 3.97727C11.4682 3.97727 12.7864 4.48182 13.8227 5.47273L16.6909 2.60455C14.9591 0.990909 12.6955 0 10 0C6.11364 0 2.74091 2.00909 0.977273 5.50909L4.40455 8.1C5.19091 5.73636 7.39545 3.97727 10 3.97727Z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>
          </form>

          {/* Toggle Sign In / Sign Up */}
          <div
            style={{
              marginTop: '1.5rem',
              textAlign: 'center',
              fontSize: '0.875rem',
              color: colors.textMuted
            }}
          >
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={toggleMode}
              style={{
                background: 'none',
                border: 'none',
                color: '#3b82f6',
                fontWeight: '600',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInModal
