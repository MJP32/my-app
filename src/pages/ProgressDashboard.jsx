import { useState, useEffect } from 'react'
import { getCompletedProblems } from '../services/progressService'
import { getBookmarks, getBookmarksByCategory } from '../services/bookmarkService'
import Breadcrumb from '../components/Breadcrumb'

function ProgressDashboard({ onBack, onNavigate }) {
  const [completedProblems, setCompletedProblems] = useState([])
  const [bookmarks, setBookmarks] = useState([])
  const [activeTab, setActiveTab] = useState('overview')
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    loadData()

    const handleProgressUpdate = () => {
      setRefreshKey(prev => prev + 1)
      loadData()
    }
    const handleBookmarkUpdate = () => loadData()

    window.addEventListener('progressUpdate', handleProgressUpdate)
    window.addEventListener('bookmarkUpdate', handleBookmarkUpdate)

    return () => {
      window.removeEventListener('progressUpdate', handleProgressUpdate)
      window.removeEventListener('bookmarkUpdate', handleBookmarkUpdate)
    }
  }, [])

  const loadData = () => {
    const completed = getCompletedProblems()
    setCompletedProblems(completed)
    setBookmarks(getBookmarks())
  }

  // Convert problemId to page name for navigation
  const getPageNameFromProblemId = (problemId) => {
    // problemId format: PageName-number
    // e.g., "Arrays-1" -> "Arrays"
    // e.g., "Dynamic Programming-5" -> "Dynamic Programming"
    // e.g., "Hash Tables-3" -> "Hash Tables"

    // Find the last dash followed by a number
    const lastDashIndex = problemId.lastIndexOf('-')
    if (lastDashIndex > 0) {
      const afterDash = problemId.substring(lastDashIndex + 1)
      // Check if what's after the dash is a number
      if (/^\d+$/.test(afterDash)) {
        // Return everything before the last dash
        return problemId.substring(0, lastDashIndex)
      }
    }
    // If no number found, return as-is
    return problemId
  }

  const handleProblemClick = (problemId) => {
    const pageName = getPageNameFromProblemId(problemId)
    if (onNavigate) {
      onNavigate(pageName)
    }
  }

  // Parse problem IDs to extract categories
  const parseCategory = (problemId) => {
    // Use the same logic as getPageNameFromProblemId to extract category name
    const lastDashIndex = problemId.lastIndexOf('-')
    if (lastDashIndex > 0) {
      const afterDash = problemId.substring(lastDashIndex + 1)
      // Check if what's after the dash is a number
      if (/^\d+$/.test(afterDash)) {
        // Return everything before the last dash as the category
        return problemId.substring(0, lastDashIndex)
      }
    }
    return problemId
  }

  // Group completed problems by category
  const completedByCategory = completedProblems.reduce((acc, problemId) => {
    const category = parseCategory(problemId)
    if (!acc[category]) acc[category] = []
    acc[category].push(problemId)
    return acc
  }, {})

  // Calculate statistics
  const totalCompleted = completedProblems.length
  const totalBookmarked = bookmarks.length
  const categoriesStarted = Object.keys(completedByCategory).length

  // Recent activity (last 10)
  const recentActivity = [...completedProblems].slice(-10).reverse()

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'completed', label: 'Completed', icon: '✅' },
    { id: 'bookmarks', label: 'Bookmarks', icon: '⭐' },
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #1f2937)',
      color: 'white',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ textAlign: 'left' }}>
            <button
              onClick={onBack}
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                marginBottom: '1rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
            >
              ← Back
            </button>
          </div>

          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            background: 'linear-gradient(to right, #f59e0b, #fbbf24)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>
            Progress Dashboard
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '1.1rem' }}>
            Track your learning journey and achievements
          </p>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <StatCard
            icon="✅"
            value={totalCompleted}
            label="Problems Completed"
            color="#10b981"
          />
          <StatCard
            icon="⭐"
            value={totalBookmarked}
            label="Bookmarked"
            color="#f59e0b"
          />
          <StatCard
            icon="📁"
            value={categoriesStarted}
            label="Categories Started"
            color="#3b82f6"
          />
          <StatCard
            icon="🔥"
            value={calculateStreak(completedProblems)}
            label="Day Streak"
            color="#ef4444"
          />
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2rem',
          borderBottom: '1px solid #374151',
          paddingBottom: '0.5rem'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: activeTab === tab.id ? '#374151' : 'transparent',
                color: activeTab === tab.id ? '#f59e0b' : '#9ca3af',
                border: 'none',
                borderRadius: '8px 8px 0 0',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s'
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {/* Progress by Category */}
            <div style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid #374151'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#f59e0b', marginBottom: '1rem' }}>
                Progress by Category
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {Object.entries(completedByCategory).slice(0, 8).map(([category, problems]) => (
                  <button
                    key={category}
                    onClick={() => handleProblemClick(problems[0])}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      textAlign: 'left',
                      width: '100%',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      const progressBar = e.currentTarget.querySelector('.progress-fill')
                      if (progressBar) progressBar.style.backgroundColor = '#22c55e'
                    }}
                    onMouseLeave={(e) => {
                      const progressBar = e.currentTarget.querySelector('.progress-fill')
                      if (progressBar) progressBar.style.backgroundColor = '#10b981'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span style={{ color: '#d1d5db', fontSize: '0.9rem' }}>{category}</span>
                      <span style={{ color: '#10b981', fontWeight: '600' }}>{problems.length}</span>
                    </div>
                    <div style={{
                      height: '6px',
                      backgroundColor: '#374151',
                      borderRadius: '3px',
                      overflow: 'hidden'
                    }}>
                      <div
                        className="progress-fill"
                        style={{
                          height: '100%',
                          width: `${Math.min(problems.length * 10, 100)}%`,
                          backgroundColor: '#10b981',
                          borderRadius: '3px',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid #374151'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#f59e0b', marginBottom: '1rem' }}>
                Recent Activity
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {recentActivity.length > 0 ? recentActivity.map((problemId, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleProblemClick(problemId)}
                    style={{
                      padding: '0.75rem',
                      backgroundColor: '#374151',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      width: '100%',
                      textAlign: 'left'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4b5563'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#374151'}
                  >
                    <span style={{ color: '#10b981' }}>✓</span>
                    <span style={{ color: '#d1d5db', fontSize: '0.9rem' }}>
                      {problemId.replace(/-/g, ' ')}
                    </span>
                  </button>
                )) : (
                  <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem' }}>
                    No completed problems yet. Start practicing!
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'completed' && (
          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid #374151'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#10b981', marginBottom: '1rem' }}>
              All Completed Problems ({totalCompleted})
            </h3>
            {Object.entries(completedByCategory).map(([category, problems]) => (
              <div key={category} style={{ marginBottom: '1.5rem' }}>
                <button
                  onClick={() => handleProblemClick(problems[0])}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    marginBottom: '0.75rem',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  <h4 style={{ color: '#f59e0b', margin: 0 }}>
                    {category} ({problems.length})
                  </h4>
                </button>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {problems.map(problemId => (
                    <button
                      key={problemId}
                      onClick={() => handleProblemClick(problemId)}
                      style={{
                        padding: '0.5rem 0.75rem',
                        backgroundColor: '#374151',
                        borderRadius: '6px',
                        fontSize: '0.85rem',
                        color: '#d1d5db',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#4b5563'
                        e.currentTarget.style.color = '#10b981'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#374151'
                        e.currentTarget.style.color = '#d1d5db'
                      }}
                    >
                      {problemId.split('-').pop()}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {totalCompleted === 0 && (
              <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem' }}>
                No completed problems yet. Start practicing!
              </p>
            )}
          </div>
        )}

        {activeTab === 'bookmarks' && (
          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid #374151'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#f59e0b', marginBottom: '1rem' }}>
              Bookmarked Problems ({totalBookmarked})
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {bookmarks.length > 0 ? bookmarks.map((bookmark, idx) => (
                <button
                  key={idx}
                  onClick={() => handleProblemClick(bookmark.problemId)}
                  style={{
                    padding: '1rem',
                    backgroundColor: '#374151',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    width: '100%',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4b5563'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#374151'}
                >
                  <div>
                    <div style={{ color: '#f9fafb', fontWeight: '600' }}>
                      {bookmark.title || bookmark.problemId}
                    </div>
                    {bookmark.category && (
                      <div style={{ color: '#9ca3af', fontSize: '0.85rem' }}>
                        {bookmark.category}
                      </div>
                    )}
                  </div>
                  {bookmark.difficulty && (
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      backgroundColor:
                        bookmark.difficulty === 'Easy' ? 'rgba(16, 185, 129, 0.2)' :
                        bookmark.difficulty === 'Medium' ? 'rgba(245, 158, 11, 0.2)' :
                        'rgba(239, 68, 68, 0.2)',
                      color:
                        bookmark.difficulty === 'Easy' ? '#10b981' :
                        bookmark.difficulty === 'Medium' ? '#f59e0b' :
                        '#ef4444'
                    }}>
                      {bookmark.difficulty}
                    </span>
                  )}
                </button>
              )) : (
                <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem' }}>
                  No bookmarked problems. Click the star icon on any problem to bookmark it!
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Stat Card Component
function StatCard({ icon, value, label, color }) {
  return (
    <div style={{
      background: 'linear-gradient(to bottom right, #1f2937, #111827)',
      borderRadius: '12px',
      padding: '1.5rem',
      border: '1px solid #374151',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{icon}</div>
      <div style={{ fontSize: '2.5rem', fontWeight: '800', color, marginBottom: '0.25rem' }}>
        {value}
      </div>
      <div style={{ color: '#9ca3af', fontSize: '0.9rem' }}>{label}</div>
    </div>
  )
}

// Calculate streak (simplified - would need timestamp data for real implementation)
function calculateStreak(completedProblems) {
  // Placeholder - return count as "streak" for demo
  return Math.min(completedProblems.length, 30)
}

export default ProgressDashboard
