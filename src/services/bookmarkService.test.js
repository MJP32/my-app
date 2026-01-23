import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  getBookmarks,
  isBookmarked,
  toggleBookmark,
  addBookmark,
  removeBookmark,
  getBookmarksByCategory,
  getBookmarkCount,
  clearAllBookmarks,
  migrateBookmarks
} from './bookmarkService'

describe('bookmarkService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.getItem.mockReset()
    localStorage.setItem.mockReset()
    localStorage.removeItem.mockReset()
    window.dispatchEvent.mockReset()
  })

  const mockUserBookmarks = [
    { problemId: 'arrays-1', title: 'Two Sum', category: 'Arrays', difficulty: 'Easy', bookmarkedAt: '2024-01-01' },
    { problemId: 'strings-2', title: 'Valid Palindrome', category: 'Strings', difficulty: 'Medium', bookmarkedAt: '2024-01-02' }
  ]

  describe('getBookmarks', () => {
    it('should return empty array when no bookmarks exist', () => {
      localStorage.getItem.mockReturnValue(null)

      const result = getBookmarks()

      expect(result).toEqual([])
    })

    it('should return parsed bookmarks from localStorage', () => {
      localStorage.getItem.mockImplementation((key) => {
        if (key === 'user') return JSON.stringify({ uid: 'user123' })
        if (key === 'bookmarked_problems_user123') return JSON.stringify(mockUserBookmarks)
        return null
      })

      const result = getBookmarks()

      expect(result).toEqual(mockUserBookmarks)
    })

    it('should return empty array on parse error', () => {
      localStorage.getItem.mockReturnValue('invalid json')

      const result = getBookmarks()

      expect(result).toEqual([])
    })
  })

  describe('isBookmarked', () => {
    it('should return true when problem is bookmarked', () => {
      localStorage.getItem.mockImplementation((key) => {
        if (key === 'user') return JSON.stringify({ uid: 'user123' })
        if (key === 'bookmarked_problems_user123') return JSON.stringify(mockUserBookmarks)
        return null
      })

      expect(isBookmarked('arrays-1')).toBe(true)
    })

    it('should return false when problem is not bookmarked', () => {
      localStorage.getItem.mockImplementation((key) => {
        if (key === 'user') return JSON.stringify({ uid: 'user123' })
        if (key === 'bookmarked_problems_user123') return JSON.stringify(mockUserBookmarks)
        return null
      })

      expect(isBookmarked('nonexistent-problem')).toBe(false)
    })
  })

  describe('toggleBookmark', () => {
    it('should add bookmark when not already bookmarked', () => {
      localStorage.getItem.mockImplementation((key) => {
        if (key === 'user') return JSON.stringify({ uid: 'user123' })
        if (key === 'bookmarked_problems_user123') return JSON.stringify([])
        return null
      })

      const result = toggleBookmark('arrays-1', { title: 'Two Sum', category: 'Arrays', difficulty: 'Easy' })

      expect(result).toBe(true) // Now bookmarked
      expect(localStorage.setItem).toHaveBeenCalled()
      expect(window.dispatchEvent).toHaveBeenCalled()
    })

    it('should remove bookmark when already bookmarked', () => {
      localStorage.getItem.mockImplementation((key) => {
        if (key === 'user') return JSON.stringify({ uid: 'user123' })
        if (key === 'bookmarked_problems_user123') return JSON.stringify(mockUserBookmarks)
        return null
      })

      const result = toggleBookmark('arrays-1')

      expect(result).toBe(false) // No longer bookmarked
      expect(localStorage.setItem).toHaveBeenCalled()
    })

    it('should dispatch bookmarkUpdate event', () => {
      localStorage.getItem.mockImplementation((key) => {
        if (key === 'user') return JSON.stringify({ uid: 'user123' })
        if (key === 'bookmarked_problems_user123') return JSON.stringify([])
        return null
      })

      toggleBookmark('arrays-1', {})

      const dispatchedEvent = window.dispatchEvent.mock.calls[0][0]
      expect(dispatchedEvent.type).toBe('bookmarkUpdate')
      expect(dispatchedEvent.detail.problemId).toBe('arrays-1')
    })
  })

  describe('addBookmark', () => {
    it('should add bookmark if not already bookmarked', () => {
      localStorage.getItem.mockImplementation((key) => {
        if (key === 'user') return JSON.stringify({ uid: 'user123' })
        if (key === 'bookmarked_problems_user123') return JSON.stringify([])
        return null
      })

      const result = addBookmark('arrays-1', { title: 'Two Sum' })

      expect(result).toBe(true)
    })

    it('should return true without adding if already bookmarked', () => {
      localStorage.getItem.mockImplementation((key) => {
        if (key === 'user') return JSON.stringify({ uid: 'user123' })
        if (key === 'bookmarked_problems_user123') return JSON.stringify(mockUserBookmarks)
        return null
      })

      const result = addBookmark('arrays-1', { title: 'Two Sum' })

      expect(result).toBe(true)
      // Should not call setItem since already bookmarked
    })
  })

  describe('removeBookmark', () => {
    it('should remove bookmark if bookmarked', () => {
      localStorage.getItem.mockImplementation((key) => {
        if (key === 'user') return JSON.stringify({ uid: 'user123' })
        if (key === 'bookmarked_problems_user123') return JSON.stringify(mockUserBookmarks)
        return null
      })

      const result = removeBookmark('arrays-1')

      expect(result).toBe(true)
    })

    it('should return true if already not bookmarked', () => {
      localStorage.getItem.mockImplementation((key) => {
        if (key === 'user') return JSON.stringify({ uid: 'user123' })
        if (key === 'bookmarked_problems_user123') return JSON.stringify([])
        return null
      })

      const result = removeBookmark('nonexistent')

      expect(result).toBe(true)
    })
  })

  describe('getBookmarksByCategory', () => {
    it('should group bookmarks by category', () => {
      localStorage.getItem.mockImplementation((key) => {
        if (key === 'user') return JSON.stringify({ uid: 'user123' })
        if (key === 'bookmarked_problems_user123') return JSON.stringify(mockUserBookmarks)
        return null
      })

      const result = getBookmarksByCategory()

      expect(result.Arrays).toHaveLength(1)
      expect(result.Strings).toHaveLength(1)
      expect(result.Arrays[0].problemId).toBe('arrays-1')
    })

    it('should group uncategorized bookmarks under Uncategorized', () => {
      const bookmarksWithoutCategory = [
        { problemId: 'test-1', title: 'Test' }
      ]
      localStorage.getItem.mockImplementation((key) => {
        if (key === 'user') return JSON.stringify({ uid: 'user123' })
        if (key === 'bookmarked_problems_user123') return JSON.stringify(bookmarksWithoutCategory)
        return null
      })

      const result = getBookmarksByCategory()

      expect(result.Uncategorized).toHaveLength(1)
    })
  })

  describe('getBookmarkCount', () => {
    it('should return correct bookmark count', () => {
      localStorage.getItem.mockImplementation((key) => {
        if (key === 'user') return JSON.stringify({ uid: 'user123' })
        if (key === 'bookmarked_problems_user123') return JSON.stringify(mockUserBookmarks)
        return null
      })

      const result = getBookmarkCount()

      expect(result).toBe(2)
    })

    it('should return 0 when no bookmarks', () => {
      localStorage.getItem.mockReturnValue(null)

      const result = getBookmarkCount()

      expect(result).toBe(0)
    })
  })

  describe('clearAllBookmarks', () => {
    it('should remove all bookmarks from localStorage', () => {
      localStorage.getItem.mockImplementation((key) => {
        if (key === 'user') return JSON.stringify({ uid: 'user123' })
        return null
      })

      const result = clearAllBookmarks()

      expect(result).toBe(true)
      expect(localStorage.removeItem).toHaveBeenCalledWith('bookmarked_problems_user123')
    })

    it('should dispatch bookmarkUpdate event with cleared flag', () => {
      localStorage.getItem.mockImplementation((key) => {
        if (key === 'user') return JSON.stringify({ uid: 'user123' })
        return null
      })

      clearAllBookmarks()

      const dispatchedEvent = window.dispatchEvent.mock.calls[0][0]
      expect(dispatchedEvent.detail.cleared).toBe(true)
    })
  })

  describe('migrateBookmarks', () => {
    it('should migrate anonymous bookmarks to user account', () => {
      const anonymousBookmarks = [
        { problemId: 'test-1', title: 'Test Problem' }
      ]
      localStorage.getItem.mockImplementation((key) => {
        if (key === 'bookmarked_problems_anonymous') return JSON.stringify(anonymousBookmarks)
        if (key === 'bookmarked_problems_user123') return JSON.stringify([])
        return null
      })

      const result = migrateBookmarks('user123')

      expect(result).toBe(1)
      expect(localStorage.setItem).toHaveBeenCalled()
      expect(localStorage.removeItem).toHaveBeenCalledWith('bookmarked_problems_anonymous')
    })

    it('should avoid duplicate bookmarks during migration', () => {
      const anonymousBookmarks = [
        { problemId: 'test-1', title: 'Test Problem' }
      ]
      const userBookmarks = [
        { problemId: 'test-1', title: 'Test Problem' } // Same problem
      ]
      localStorage.getItem.mockImplementation((key) => {
        if (key === 'bookmarked_problems_anonymous') return JSON.stringify(anonymousBookmarks)
        if (key === 'bookmarked_problems_user123') return JSON.stringify(userBookmarks)
        return null
      })

      const result = migrateBookmarks('user123')

      expect(result).toBe(1) // Only the existing one, no duplicate added
    })

    it('should return 0 on error', () => {
      localStorage.getItem.mockImplementation(() => {
        throw new Error('Storage error')
      })

      const result = migrateBookmarks('user123')

      expect(result).toBe(0)
    })
  })
})
