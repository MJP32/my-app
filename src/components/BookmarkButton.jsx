import { useState, useEffect } from 'react'
import { isBookmarked, toggleBookmark } from '../services/bookmarkService'

function BookmarkButton({
  problemId,
  problemData = {},
  size = 'medium',
  showLabel = false,
  style = {}
}) {
  const [bookmarked, setBookmarked] = useState(false)

  useEffect(() => {
    setBookmarked(isBookmarked(problemId))

    const handleUpdate = (e) => {
      if (e.detail.problemId === problemId || e.detail.cleared) {
        setBookmarked(isBookmarked(problemId))
      }
    }

    window.addEventListener('bookmarkUpdate', handleUpdate)
    return () => window.removeEventListener('bookmarkUpdate', handleUpdate)
  }, [problemId])

  const handleClick = (e) => {
    e.stopPropagation()
    const nowBookmarked = toggleBookmark(problemId, problemData)
    setBookmarked(nowBookmarked)
  }

  const sizes = {
    small: { padding: '0.25rem 0.5rem', fontSize: '0.875rem', iconSize: '1rem' },
    medium: { padding: '0.5rem 0.75rem', fontSize: '1rem', iconSize: '1.25rem' },
    large: { padding: '0.75rem 1rem', fontSize: '1.125rem', iconSize: '1.5rem' }
  }

  const { padding, fontSize, iconSize } = sizes[size] || sizes.medium

  return (
    <button
      onClick={handleClick}
      title={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: showLabel ? padding : '0.5rem',
        fontSize: iconSize,
        backgroundColor: bookmarked ? '#fef3c7' : 'transparent',
        color: bookmarked ? '#f59e0b' : '#9ca3af',
        border: `1px solid ${bookmarked ? '#f59e0b' : '#d1d5db'}`,
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        ...style
      }}
      onMouseEnter={(e) => {
        if (!bookmarked) {
          e.currentTarget.style.borderColor = '#f59e0b'
          e.currentTarget.style.color = '#f59e0b'
        }
      }}
      onMouseLeave={(e) => {
        if (!bookmarked) {
          e.currentTarget.style.borderColor = '#d1d5db'
          e.currentTarget.style.color = '#9ca3af'
        }
      }}
    >
      <span>{bookmarked ? '★' : '☆'}</span>
      {showLabel && (
        <span style={{ fontSize }}>
          {bookmarked ? 'Bookmarked' : 'Bookmark'}
        </span>
      )}
    </button>
  )
}

export default BookmarkButton
