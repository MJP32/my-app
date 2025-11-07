import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { getUserInfo, getProgressStats, getCategoryStats } from '../services/progressService'
import { getCurrentUser, logOut } from '../services/authService'
import SignInModal from './SignInModal'
import CategoryProgressModal from './CategoryProgressModal'
import SocialShare from './SocialShare'

function AccountDropdown({ isOpen, onClose, onOpenStudyGuide, onGoToHome, onGoToPractice, triggerRef }) {
  const [userInfo, setUserInfo] = useState(null)
  const [stats, setStats] = useState(null)
  const [categoryStats, setCategoryStats] = useState(null)
  const [authUser, setAuthUser] = useState(null)
  const [showSignInModal, setShowSignInModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [theme, setTheme] = useState(() => {
    // Get saved theme from localStorage or default to 'light'
    return localStorage.getItem('app_theme') || 'light'
  })
  const dropdownRef = useRef(null)

  useEffect(() => {
    const updateStats = () => {
      if (isOpen) {
        const currentUser = getCurrentUser()
        setAuthUser(currentUser)

        const info = getUserInfo()
        const progressStats = getProgressStats()
        const catStats = getCategoryStats()
        setUserInfo(info)
        setStats(progressStats)
        setCategoryStats(catStats)
      }
    }

    updateStats()

    // Listen for progress updates
    const handleProgressUpdate = () => {
      updateStats()
    }

    window.addEventListener('progressUpdate', handleProgressUpdate)

    return () => {
      window.removeEventListener('progressUpdate', handleProgressUpdate)
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Don't close if the sign-in modal is open
      if (showSignInModal) return

      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          triggerRef.current && !triggerRef.current.contains(event.target)) {
        onClose()
      }
    }

    const handleEscape = (event) => {
      // CRITICAL: Don't process ANY keyboard events if sign-in modal is open
      if (window.__SIGN_IN_MODAL_OPEN__) return

      // CRITICAL: Don't interfere with typing in input fields
      const target = event.target
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT')) {
        return
      }

      // Let the SignInModal handle Escape if it's open
      if (showSignInModal) return

      if (event.key === 'Escape') {
        event.preventDefault()
        event.stopPropagation() // Prevent event from reaching global handlers
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose, triggerRef, showSignInModal])

  // Reset modal states when dropdown closes
  useEffect(() => {
    if (!isOpen) {
      setShowShareModal(false)
      setShowCategoryModal(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleStudyGuideClick = () => {
    onClose()
    onOpenStudyGuide()
  }

  const handleSignOut = async () => {
    if (confirm('Are you sure you want to log out?')) {
      const result = await logOut()
      if (result.success) {
        setAuthUser(null)
        onClose()
      }
    }
  }

  const handleSignInClick = () => {
    setShowSignInModal(true)
  }

  const handleSignInClose = () => {
    setShowSignInModal(false)
    // Refresh auth state after sign in
    const currentUser = getCurrentUser()
    setAuthUser(currentUser)
    if (currentUser) {
      // Update stats after successful sign in
      const info = getUserInfo()
      const progressStats = getProgressStats()
      setUserInfo(info)
      setStats(progressStats)
      window.dispatchEvent(new CustomEvent('progressUpdate'))
    }
  }

  return (
    <>
      <div
        ref={dropdownRef}
        style={{
          position: 'fixed',
          top: '60px',
          right: '20px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
          border: '2px solid #e5e7eb',
          width: '320px',
          zIndex: 1000002,
          overflow: 'hidden'
        }}
      >
      {/* Header with user info */}
      <div style={{
        padding: '1.25rem',
        backgroundColor: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        borderBottom: '2px solid #e5e7eb'
      }}>
        {authUser && userInfo ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#dbeafe',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              border: '2px solid white'
            }}>
              {authUser.photoURL ? (
                <img src={authUser.photoURL} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
              ) : (
                '👤'
              )}
            </div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '1.1rem', color: 'white' }}>
                {authUser.displayName || userInfo.username}
              </div>
              <div style={{ fontSize: '0.875rem', color: '#dbeafe' }}>
                {authUser.email || userInfo.email}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', color: 'white' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👤</div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '700' }}>Welcome!</h3>
            <p style={{ margin: '0.5rem 0 0', opacity: 0.9, fontSize: '0.875rem' }}>Sign in to track your progress</p>
          </div>
        )}
      </div>

      {/* Progress Stats - Only show when authenticated */}
      {authUser && stats && (
        <div style={{
          padding: '1.25rem',
          backgroundColor: '#f9fafb',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <div style={{ marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>
                Overall Progress
              </span>
              <span style={{ fontSize: '1.25rem', fontWeight: '700', color: '#3b82f6' }}>
                {stats.progressPercent}%
              </span>
            </div>

            {/* Progress Bar */}
            <div style={{
              width: '100%',
              height: '8px',
              backgroundColor: '#e5e7eb',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${stats.progressPercent}%`,
                height: '100%',
                backgroundColor: '#3b82f6',
                transition: 'width 0.3s ease',
                borderRadius: '4px'
              }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
            <div style={{
              textAlign: 'center',
              padding: '0.5rem',
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#3b82f6' }}>
                {stats.total}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500' }}>
                Total
              </div>
            </div>
            <div style={{
              textAlign: 'center',
              padding: '0.5rem',
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#10b981' }}>
                {stats.completed}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500' }}>
                Done
              </div>
            </div>
            <div style={{
              textAlign: 'center',
              padding: '0.5rem',
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#f59e0b' }}>
                {stats.remaining}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500' }}>
                Left
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Menu Items */}
      <div style={{ padding: '0.5rem' }}>
        {!authUser ? (
          // Show Sign In button and theme toggle when not authenticated
          <>
            <button
              onClick={handleSignInClick}
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginBottom: '1rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#2563eb'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#3b82f6'
              }}
            >
              <span>🔐</span>
              <span>Sign In</span>
            </button>

            {/* Theme Toggle for non-authenticated users */}
            <div style={{
              padding: '0.75rem 1rem',
              borderRadius: '8px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '0.75rem'
              }}>
                <span style={{ fontSize: '1.25rem' }}>⚙️</span>
                <span style={{
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  color: '#1f2937'
                }}>Settings</span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingLeft: '2rem'
              }}>
                <span style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  fontWeight: '500'
                }}>Theme</span>
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  backgroundColor: '#f3f4f6',
                  padding: '0.25rem',
                  borderRadius: '8px'
                }}>
                  <button
                    onClick={() => {
                      setTheme('light')
                      localStorage.setItem('app_theme', 'light')
                      document.body.setAttribute('data-theme', 'light')
                      window.dispatchEvent(new CustomEvent('themeChange', { detail: 'light' }))
                    }}
                    style={{
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      backgroundColor: theme === 'light' ? 'white' : 'transparent',
                      color: theme === 'light' ? '#1f2937' : '#6b7280',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: theme === 'light' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
                    }}
                  >
                    ☀️ Light
                  </button>
                  <button
                    onClick={() => {
                      setTheme('dark')
                      localStorage.setItem('app_theme', 'dark')
                      document.body.setAttribute('data-theme', 'dark')
                      window.dispatchEvent(new CustomEvent('themeChange', { detail: 'dark' }))
                    }}
                    style={{
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      backgroundColor: theme === 'dark' ? '#1f2937' : 'transparent',
                      color: theme === 'dark' ? 'white' : '#6b7280',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: theme === 'dark' ? '0 2px 4px rgba(0,0,0,0.2)' : 'none'
                    }}
                  >
                    🌙 Dark
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Show menu items when authenticated
          <>
            <button
              onClick={handleStudyGuideClick}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: '0.95rem',
                fontWeight: '500',
                color: '#1f2937',
                transition: 'all 0.2s',
                textAlign: 'left'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              <span style={{ fontSize: '1.25rem' }}>📘</span>
              <span>Study Guide</span>
            </button>

            <button
              onClick={() => setShowCategoryModal(true)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: '0.95rem',
                fontWeight: '500',
                color: '#1f2937',
                transition: 'all 0.2s',
                textAlign: 'left'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              <span style={{ fontSize: '1.25rem' }}>📊</span>
              <span>Category Progress</span>
            </button>

            <button
              onClick={() => setShowShareModal(true)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: '0.95rem',
                fontWeight: '500',
                color: '#1f2937',
                transition: 'all 0.2s',
                textAlign: 'left'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              <span style={{ fontSize: '1.25rem' }}>🔗</span>
              <span>Share This Page</span>
            </button>

            {/* Theme Settings Section */}
            <div style={{
              padding: '0.75rem 1rem',
              borderRadius: '8px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '0.75rem'
              }}>
                <span style={{ fontSize: '1.25rem' }}>⚙️</span>
                <span style={{
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  color: '#1f2937'
                }}>Settings</span>
              </div>

              {/* Theme Toggle */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingLeft: '2rem'
              }}>
                <span style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  fontWeight: '500'
                }}>Theme</span>
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  backgroundColor: '#f3f4f6',
                  padding: '0.25rem',
                  borderRadius: '8px'
                }}>
                  <button
                    onClick={() => {
                      setTheme('light')
                      localStorage.setItem('app_theme', 'light')
                      document.body.setAttribute('data-theme', 'light')
                      window.dispatchEvent(new CustomEvent('themeChange', { detail: 'light' }))
                    }}
                    style={{
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      backgroundColor: theme === 'light' ? 'white' : 'transparent',
                      color: theme === 'light' ? '#1f2937' : '#6b7280',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: theme === 'light' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
                    }}
                  >
                    ☀️ Light
                  </button>
                  <button
                    onClick={() => {
                      setTheme('dark')
                      localStorage.setItem('app_theme', 'dark')
                      document.body.setAttribute('data-theme', 'dark')
                      window.dispatchEvent(new CustomEvent('themeChange', { detail: 'dark' }))
                    }}
                    style={{
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      backgroundColor: theme === 'dark' ? '#1f2937' : 'transparent',
                      color: theme === 'dark' ? 'white' : '#6b7280',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: theme === 'dark' ? '0 2px 4px rgba(0,0,0,0.2)' : 'none'
                    }}
                  >
                    🌙 Dark
                  </button>
                </div>
              </div>
            </div>

            <div style={{
              height: '1px',
              backgroundColor: '#e5e7eb',
              margin: '0.5rem 0'
            }} />

            <button
              onClick={handleSignOut}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: '0.95rem',
                fontWeight: '500',
                color: '#ef4444',
                transition: 'all 0.2s',
                textAlign: 'left'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#fef2f2'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              <span style={{ fontSize: '1.25rem' }}>🚪</span>
              <span>Log Out</span>
            </button>
          </>
        )}
      </div>

      {/* Footer - Only show when authenticated */}
      {authUser && userInfo && (
        <div style={{
          padding: '0.75rem 1rem',
          backgroundColor: '#f9fafb',
          borderTop: '1px solid #e5e7eb',
          fontSize: '0.75rem',
          color: '#6b7280',
          textAlign: 'center'
        }}>
          Member since {new Date(userInfo.joinedDate).toLocaleDateString()}
        </div>
      )}
    </div>

    {/* Sign In Modal */}
    {showSignInModal && createPortal(
      <SignInModal
        isOpen={showSignInModal}
        onClose={handleSignInClose}
      />,
      document.body
    )}

    {/* Category Progress Modal */}
    <CategoryProgressModal
      isOpen={showCategoryModal}
      onClose={() => setShowCategoryModal(false)}
      categoryStats={categoryStats}
      onCategoryClick={(category) => {
        // Close modals first
        setShowCategoryModal(false)
        onClose()

        // Navigate to Practice page
        setTimeout(() => {
          if (onGoToPractice) {
            // Navigate to Practice page - user can then choose specific practice component
            onGoToPractice('Practice')
          }
        }, 50)
      }}
    />

    {/* Share Modal */}
    {showShareModal && createPortal(
      <div
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
        onClick={() => setShowShareModal(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            maxWidth: '500px',
            width: '100%',
            maxHeight: '90vh',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            overflow: 'auto',
            margin: 'auto'
          }}
        >
          <div style={{
            padding: '1.5rem',
            borderBottom: '2px solid #e5e7eb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700', color: '#1f2937' }}>
              🔗 Share This Page
            </h2>
            <button
              onClick={() => setShowShareModal(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#6b7280',
                padding: '0.25rem'
              }}
            >
              ✕
            </button>
          </div>
          <div style={{ padding: '1.5rem' }}>
            <p style={{ margin: '0 0 1.5rem 0', color: '#6b7280', fontSize: '0.95rem' }}>
              Help others discover this Java learning platform! Share on social media or copy the link.
            </p>
            <SocialShare
              title={document.title}
              description="Master Java, Design Patterns, System Design & more with interactive tutorials and practice problems"
              hashtags={['Java', 'Programming', 'LearnToCode', 'SoftwareEngineering']}
              showLabel={false}
              size="large"
              layout="vertical"
            />
          </div>
        </div>
      </div>,
      document.body
    )}
  </>
  )
}

export default AccountDropdown
