import { useState, useEffect } from 'react'
import { isProblemCompleted, toggleProblemCompletion, getCompletedProblems } from '../services/progressService'
import { getCurrentUser, onAuthStateChange } from '../services/authService'
import { recordProblemCompletion, recordProblemUncompletion } from '../services/gamificationService'
import { checkProblemCompletionAchievements } from '../services/achievementService'
import { logActivity } from '../services/activityLogService'

function CompletionCheckbox({ problemId, label = "Mark as Completed", onCompletionChange, difficulty = "Medium", compact = false }) {
  const [isCompleted, setIsCompleted] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [, setCurrentUser] = useState(null)

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setCurrentUser(user)
      // Re-check completion status when auth state changes
      setIsCompleted(isProblemCompleted(problemId))
    })

    return () => unsubscribe()
  }, [problemId])

  // Check completion status when problemId changes
  useEffect(() => {
    setIsCompleted(isProblemCompleted(problemId))
  }, [problemId])

  // Listen for progress updates from other checkboxes
  useEffect(() => {
    const handleProgressUpdate = () => {
      setIsCompleted(isProblemCompleted(problemId))
    }

    window.addEventListener('progressUpdate', handleProgressUpdate)
    return () => window.removeEventListener('progressUpdate', handleProgressUpdate)
  }, [problemId])

  const handleToggle = () => {
    const currentUser = getCurrentUser()

    // Show warning if user is not logged in and trying to mark as completed
    if (!currentUser && !isCompleted) {
      setShowWarning(true)
      setTimeout(() => setShowWarning(false), 4000) // Hide warning after 4 seconds
    }

    const newState = !isCompleted
    toggleProblemCompletion(problemId, newState)
    setIsCompleted(newState)

    // Award or remove XP based on completion state
    const userId = currentUser?.uid || 'anonymous'
    if (newState) {
      // Problem completed - award XP
      recordProblemCompletion(userId, problemId, difficulty)

      // Log activity for charts
      logActivity(userId)

      // Check for achievements
      const totalCompleted = getCompletedProblems().length
      checkProblemCompletionAchievements(userId, totalCompleted, difficulty)
    } else {
      // Problem uncompleted - record removal (XP is kept)
      recordProblemUncompletion(userId, problemId)
    }

    // Notify parent component if callback provided
    if (onCompletionChange) {
      onCompletionChange(newState)
    }

    // Dispatch custom event for account dropdown to update
    window.dispatchEvent(new CustomEvent('progressUpdate'))
  }

  return (
    <div style={{ position: 'relative' }}>
      <label
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: compact ? '0.35rem' : '0.5rem',
          cursor: 'pointer',
          padding: compact ? '0.25rem 0.5rem' : '0.5rem 0.75rem',
          backgroundColor: isCompleted ? '#d1fae5' : '#f3f4f6',
          borderRadius: compact ? '6px' : '8px',
          border: compact ? '1px solid' : '2px solid',
          borderColor: isCompleted ? '#10b981' : '#e5e7eb',
          transition: 'all 0.2s',
          fontWeight: '600',
          fontSize: compact ? '0.75rem' : '0.875rem',
          color: isCompleted ? '#065f46' : '#374151',
          userSelect: 'none'
        }}
        onMouseEnter={(e) => {
          if (!isCompleted) {
            e.currentTarget.style.backgroundColor = '#e5e7eb'
            e.currentTarget.style.borderColor = '#10b981'
          }
        }}
        onMouseLeave={(e) => {
          if (!isCompleted) {
            e.currentTarget.style.backgroundColor = '#f3f4f6'
            e.currentTarget.style.borderColor = '#e5e7eb'
          }
        }}
      >
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleToggle}
          style={{
            width: compact ? '14px' : '18px',
            height: compact ? '14px' : '18px',
            cursor: 'pointer',
            accentColor: '#10b981'
          }}
        />
        <span>{isCompleted ? (compact ? '✓ Done' : '✅ Completed') : (compact ? 'Complete' : label)}</span>
      </label>

      {showWarning && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '0.5rem',
            padding: '0.75rem 1rem',
            backgroundColor: '#fef3c7',
            border: '2px solid #f59e0b',
            borderRadius: '8px',
            fontSize: '0.875rem',
            color: '#92400e',
            fontWeight: '600',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            animation: 'fadeIn 0.3s ease',
            whiteSpace: 'nowrap'
          }}
        >
          ⚠️ Progress will not be saved. Please sign in to track your progress!
        </div>
      )}
    </div>
  )
}

export default CompletionCheckbox
