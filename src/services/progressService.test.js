import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock authService before importing progressService
vi.mock('./authService', () => ({
  getCurrentUser: vi.fn()
}))

import { getCurrentUser } from './authService'
import {
  getCompletedProblems,
  toggleProblemCompletion,
  isProblemCompleted,
  getAllPracticeProblems,
  getProgressStats,
  getCategoryGroupings,
  saveUserCode,
  getUserCode,
  getSavedCode,
  clearUserCode,
  resetProgress
} from './progressService'

describe('progressService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.getItem.mockReset()
    localStorage.setItem.mockReset()
    localStorage.removeItem.mockReset()
    getCurrentUser.mockReset()
  })

  describe('getCompletedProblems', () => {
    it('should return empty array when no user is logged in', () => {
      getCurrentUser.mockReturnValue(null)

      const result = getCompletedProblems()

      expect(result).toEqual([])
    })

    it('should return completed problems for logged in user', () => {
      const mockUser = { uid: 'user123' }
      const completedProblems = ['arrays-1', 'strings-2']

      getCurrentUser.mockReturnValue(mockUser)
      localStorage.getItem.mockImplementation((key) => {
        if (key === 'completed_problems_user123') return JSON.stringify(completedProblems)
        return null
      })

      const result = getCompletedProblems()

      expect(result).toEqual(completedProblems)
    })
  })

  describe('toggleProblemCompletion', () => {
    it('should not toggle when user is not logged in', () => {
      getCurrentUser.mockReturnValue(null)

      const result = toggleProblemCompletion('arrays-1', true)

      expect(result).toBeUndefined()
      expect(localStorage.setItem).not.toHaveBeenCalled()
    })

    it('should add problem to completed list when marking as complete', () => {
      const mockUser = { uid: 'user123' }
      getCurrentUser.mockReturnValue(mockUser)
      localStorage.getItem.mockImplementation((key) => {
        if (key === 'completed_problems_user123') return JSON.stringify([])
        return null
      })

      const result = toggleProblemCompletion('arrays-1', true)

      expect(result).toContain('arrays-1')
      expect(localStorage.setItem).toHaveBeenCalled()
    })

    it('should not add duplicate when problem already completed', () => {
      const mockUser = { uid: 'user123' }
      getCurrentUser.mockReturnValue(mockUser)
      localStorage.getItem.mockImplementation((key) => {
        if (key === 'completed_problems_user123') return JSON.stringify(['arrays-1'])
        return null
      })

      const result = toggleProblemCompletion('arrays-1', true)

      expect(result.filter(id => id === 'arrays-1')).toHaveLength(1)
    })

    it('should remove problem from completed list when uncompleting', () => {
      const mockUser = { uid: 'user123' }
      getCurrentUser.mockReturnValue(mockUser)
      localStorage.getItem.mockImplementation((key) => {
        if (key === 'completed_problems_user123') return JSON.stringify(['arrays-1', 'strings-2'])
        return null
      })

      const result = toggleProblemCompletion('arrays-1', false)

      expect(result).not.toContain('arrays-1')
      expect(result).toContain('strings-2')
    })
  })

  describe('isProblemCompleted', () => {
    it('should return true when problem is completed', () => {
      const mockUser = { uid: 'user123' }
      getCurrentUser.mockReturnValue(mockUser)
      localStorage.getItem.mockImplementation((key) => {
        if (key === 'completed_problems_user123') return JSON.stringify(['arrays-1'])
        return null
      })

      expect(isProblemCompleted('arrays-1')).toBe(true)
    })

    it('should return false when problem is not completed', () => {
      const mockUser = { uid: 'user123' }
      getCurrentUser.mockReturnValue(mockUser)
      localStorage.getItem.mockImplementation((key) => {
        if (key === 'completed_problems_user123') return JSON.stringify([])
        return null
      })

      expect(isProblemCompleted('arrays-1')).toBe(false)
    })
  })

  describe('getAllPracticeProblems', () => {
    it('should return object with practice topics and counts', () => {
      const problems = getAllPracticeProblems()

      expect(problems).toBeTypeOf('object')
      expect(problems.Arrays).toBeDefined()
      expect(problems.Arrays).toBeTypeOf('number')
      expect(problems.Arrays).toBeGreaterThan(0)
    })

    it('should include all expected categories', () => {
      const problems = getAllPracticeProblems()

      expect(problems['Dynamic Programming']).toBeDefined()
      expect(problems.Strings).toBeDefined()
      expect(problems.Graphs).toBeDefined()
      expect(problems.Streams).toBeDefined()
    })
  })

  describe('getProgressStats', () => {
    it('should return zero stats when no user logged in', () => {
      getCurrentUser.mockReturnValue(null)

      const stats = getProgressStats()

      expect(stats.total).toBe(0)
      expect(stats.completed).toBe(0)
      expect(stats.remaining).toBe(0)
      expect(stats.progressPercent).toBe(0)
    })

    it('should calculate correct progress stats for logged in user', () => {
      const mockUser = { uid: 'user123' }
      getCurrentUser.mockReturnValue(mockUser)
      localStorage.getItem.mockImplementation((key) => {
        if (key === 'completed_problems_user123') return JSON.stringify(['arrays-1', 'arrays-2', 'strings-1'])
        return null
      })

      const stats = getProgressStats()

      expect(stats.total).toBeGreaterThan(0)
      expect(stats.completed).toBe(3)
      expect(stats.remaining).toBe(stats.total - 3)
      expect(stats.progressPercent).toBeGreaterThanOrEqual(0)
      expect(stats.progressPercent).toBeLessThanOrEqual(100)
    })
  })

  describe('getCategoryGroupings', () => {
    it('should return category groupings object', () => {
      const groupings = getCategoryGroupings()

      expect(groupings).toBeTypeOf('object')
      expect(groupings['Practice - Algorithms']).toBeDefined()
      expect(Array.isArray(groupings['Practice - Algorithms'])).toBe(true)
    })

    it('should include Arrays in Algorithms category', () => {
      const groupings = getCategoryGroupings()

      expect(groupings['Practice - Algorithms']).toContain('Arrays')
    })

    it('should include Streams in Java Features category', () => {
      const groupings = getCategoryGroupings()

      expect(groupings['Practice - Java Features']).toContain('Streams')
    })
  })

  describe('saveUserCode and getUserCode', () => {
    it('should save user code to localStorage', () => {
      localStorage.getItem.mockReturnValue(JSON.stringify({}))

      saveUserCode('arrays-1', 'console.log("test")', 'java')

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'saved_code',
        expect.stringContaining('arrays-1-java')
      )
    })

    it('should retrieve saved user code', () => {
      const savedCode = {
        'arrays-1-java': {
          code: 'console.log("test")',
          lastModified: '2024-01-01'
        }
      }
      localStorage.getItem.mockReturnValue(JSON.stringify(savedCode))

      const result = getUserCode('arrays-1', 'java')

      expect(result).toBe('console.log("test")')
    })

    it('should return null when no code is saved', () => {
      localStorage.getItem.mockReturnValue(JSON.stringify({}))

      const result = getUserCode('nonexistent', 'java')

      expect(result).toBeNull()
    })
  })

  describe('getSavedCode', () => {
    it('should return empty object when no saved code', () => {
      localStorage.getItem.mockReturnValue(null)

      const result = getSavedCode()

      expect(result).toEqual({})
    })

    it('should return parsed saved code', () => {
      const savedCode = { 'arrays-1-java': { code: 'test' } }
      localStorage.getItem.mockReturnValue(JSON.stringify(savedCode))

      const result = getSavedCode()

      expect(result).toEqual(savedCode)
    })
  })

  describe('clearUserCode', () => {
    it('should clear code for specific language', () => {
      const savedCode = {
        'arrays-1-java': { code: 'java code' },
        'arrays-1-python': { code: 'python code' }
      }
      localStorage.getItem.mockReturnValue(JSON.stringify(savedCode))

      clearUserCode('arrays-1', 'java')

      const setItemCall = localStorage.setItem.mock.calls[0]
      const savedData = JSON.parse(setItemCall[1])
      expect(savedData['arrays-1-java']).toBeUndefined()
      expect(savedData['arrays-1-python']).toBeDefined()
    })

    it('should clear code for all languages when language not specified', () => {
      const savedCode = {
        'arrays-1-java': { code: 'java code' },
        'arrays-1-python': { code: 'python code' },
        'strings-1-java': { code: 'other code' }
      }
      localStorage.getItem.mockReturnValue(JSON.stringify(savedCode))

      clearUserCode('arrays-1')

      const setItemCall = localStorage.setItem.mock.calls[0]
      const savedData = JSON.parse(setItemCall[1])
      expect(savedData['arrays-1-java']).toBeUndefined()
      expect(savedData['arrays-1-python']).toBeUndefined()
      expect(savedData['strings-1-java']).toBeDefined()
    })
  })

  describe('resetProgress', () => {
    it('should reset progress for logged in user', () => {
      const mockUser = { uid: 'user123' }
      getCurrentUser.mockReturnValue(mockUser)
      localStorage.getItem.mockReturnValue(JSON.stringify([]))

      const stats = resetProgress()

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'completed_problems_user123',
        JSON.stringify([])
      )
      expect(stats.completed).toBe(0)
    })
  })
})
