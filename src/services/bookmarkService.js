// Bookmark Service - manages user's bookmarked problems

const STORAGE_KEY = 'bookmarked_problems'

// Get current user's bookmark key
const getBookmarkKey = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const uid = user?.uid || 'anonymous'
  return `${STORAGE_KEY}_${uid}`
}

// Get all bookmarked problems
export const getBookmarks = () => {
  try {
    const key = getBookmarkKey()
    const bookmarks = localStorage.getItem(key)
    return bookmarks ? JSON.parse(bookmarks) : []
  } catch (error) {
    console.error('Error reading bookmarks:', error)
    return []
  }
}

// Check if a problem is bookmarked
export const isBookmarked = (problemId) => {
  const bookmarks = getBookmarks()
  return bookmarks.some(b => b.problemId === problemId)
}

// Toggle bookmark status
export const toggleBookmark = (problemId, problemData = {}) => {
  try {
    const key = getBookmarkKey()
    let bookmarks = getBookmarks()

    const existingIndex = bookmarks.findIndex(b => b.problemId === problemId)

    if (existingIndex >= 0) {
      // Remove bookmark
      bookmarks.splice(existingIndex, 1)
    } else {
      // Add bookmark with metadata
      bookmarks.push({
        problemId,
        title: problemData.title || problemId,
        category: problemData.category || '',
        difficulty: problemData.difficulty || '',
        bookmarkedAt: new Date().toISOString()
      })
    }

    localStorage.setItem(key, JSON.stringify(bookmarks))

    // Dispatch event for components to update
    window.dispatchEvent(new CustomEvent('bookmarkUpdate', {
      detail: { problemId, isBookmarked: existingIndex < 0 }
    }))

    return existingIndex < 0 // Returns true if now bookmarked
  } catch (error) {
    console.error('Error toggling bookmark:', error)
    return false
  }
}

// Add bookmark
export const addBookmark = (problemId, problemData = {}) => {
  if (!isBookmarked(problemId)) {
    return toggleBookmark(problemId, problemData)
  }
  return true
}

// Remove bookmark
export const removeBookmark = (problemId) => {
  if (isBookmarked(problemId)) {
    return !toggleBookmark(problemId)
  }
  return true
}

// Get bookmarks by category
export const getBookmarksByCategory = () => {
  const bookmarks = getBookmarks()
  const grouped = {}

  bookmarks.forEach(bookmark => {
    const category = bookmark.category || 'Uncategorized'
    if (!grouped[category]) {
      grouped[category] = []
    }
    grouped[category].push(bookmark)
  })

  return grouped
}

// Get bookmark count
export const getBookmarkCount = () => {
  return getBookmarks().length
}

// Clear all bookmarks
export const clearAllBookmarks = () => {
  try {
    const key = getBookmarkKey()
    localStorage.removeItem(key)
    window.dispatchEvent(new CustomEvent('bookmarkUpdate', { detail: { cleared: true } }))
    return true
  } catch (error) {
    console.error('Error clearing bookmarks:', error)
    return false
  }
}

// Migrate anonymous bookmarks to user account
export const migrateBookmarks = (userId) => {
  try {
    const anonymousKey = `${STORAGE_KEY}_anonymous`
    const userKey = `${STORAGE_KEY}_${userId}`

    const anonymousBookmarks = JSON.parse(localStorage.getItem(anonymousKey) || '[]')
    const userBookmarks = JSON.parse(localStorage.getItem(userKey) || '[]')

    if (anonymousBookmarks.length > 0) {
      // Merge bookmarks, avoiding duplicates
      const existingIds = new Set(userBookmarks.map(b => b.problemId))
      const newBookmarks = anonymousBookmarks.filter(b => !existingIds.has(b.problemId))

      const mergedBookmarks = [...userBookmarks, ...newBookmarks]
      localStorage.setItem(userKey, JSON.stringify(mergedBookmarks))
      localStorage.removeItem(anonymousKey)

      return mergedBookmarks.length
    }

    return userBookmarks.length
  } catch (error) {
    console.error('Error migrating bookmarks:', error)
    return 0
  }
}

export default {
  getBookmarks,
  isBookmarked,
  toggleBookmark,
  addBookmark,
  removeBookmark,
  getBookmarksByCategory,
  getBookmarkCount,
  clearAllBookmarks,
  migrateBookmarks
}
