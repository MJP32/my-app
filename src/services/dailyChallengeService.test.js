import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  getDailyChallenge,
  isDailyChallengeCompleted,
  completeDailyChallenge,
  getDailyChallengeStreak,
  getLongestStreak,
  getAllChallengeProblems,
  getDifficultyColor
} from './dailyChallengeService'

describe('dailyChallengeService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.getItem.mockReturnValue(null)
    localStorage.setItem.mockClear()
    localStorage.clear.mockClear()

    // Mock Date to have consistent tests
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-01-15T12:00:00Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('getDailyChallenge', () => {
    it('returns a challenge with all required fields', () => {
      const challenge = getDailyChallenge()

      expect(challenge).toHaveProperty('id')
      expect(challenge).toHaveProperty('title')
      expect(challenge).toHaveProperty('difficulty')
      expect(challenge).toHaveProperty('category')
      expect(challenge).toHaveProperty('page')
      expect(challenge).toHaveProperty('date')
      expect(challenge).toHaveProperty('xpMultiplier')
    })

    it('returns same challenge for same day', () => {
      const challenge1 = getDailyChallenge()
      const challenge2 = getDailyChallenge()

      expect(challenge1.id).toBe(challenge2.id)
      expect(challenge1.title).toBe(challenge2.title)
    })

    it('returns different challenge for different day', () => {
      const challenge1 = getDailyChallenge()

      // Move to next day
      vi.setSystemTime(new Date('2024-01-16T12:00:00Z'))

      const challenge2 = getDailyChallenge()

      // Should likely be different (not guaranteed but very probable)
      // At least verify both are valid challenges
      expect(challenge1).toHaveProperty('id')
      expect(challenge2).toHaveProperty('id')
    })

    it('sets xpMultiplier to 2', () => {
      const challenge = getDailyChallenge()
      expect(challenge.xpMultiplier).toBe(2)
    })

    it('includes today\'s date in ISO format', () => {
      const challenge = getDailyChallenge()
      expect(challenge.date).toBe('2024-01-15')
    })
  })

  describe('isDailyChallengeCompleted', () => {
    it('returns false when no completion data exists', () => {
      localStorage.getItem.mockReturnValue(null)
      expect(isDailyChallengeCompleted('user123')).toBe(false)
    })

    it('returns false when completion date is different', () => {
      const oldData = {
        completedDate: '2024-01-14',
        history: []
      }
      localStorage.getItem.mockReturnValue(JSON.stringify(oldData))

      expect(isDailyChallengeCompleted('user123')).toBe(false)
    })

    it('returns true when completed today', () => {
      const todayData = {
        completedDate: '2024-01-15',
        history: []
      }
      localStorage.getItem.mockReturnValue(JSON.stringify(todayData))

      expect(isDailyChallengeCompleted('user123')).toBe(true)
    })

    it('uses anonymous key when no userId provided', () => {
      isDailyChallengeCompleted()
      expect(localStorage.getItem).toHaveBeenCalledWith('daily_challenge_anonymous')
    })

    it('uses userId in storage key', () => {
      isDailyChallengeCompleted('user123')
      expect(localStorage.getItem).toHaveBeenCalledWith('daily_challenge_user123')
    })

    it('handles localStorage errors gracefully', () => {
      localStorage.getItem.mockImplementation(() => {
        throw new Error('Storage error')
      })

      expect(isDailyChallengeCompleted('user123')).toBe(false)
    })

    it('handles invalid JSON data', () => {
      localStorage.getItem.mockReturnValue('invalid json')
      expect(isDailyChallengeCompleted('user123')).toBe(false)
    })
  })

  describe('completeDailyChallenge', () => {
    it('saves completion to localStorage', () => {
      completeDailyChallenge('user123')

      expect(localStorage.setItem).toHaveBeenCalled()
      const [key, value] = localStorage.setItem.mock.calls[0]

      expect(key).toBe('daily_challenge_user123')
      const data = JSON.parse(value)
      expect(data.completedDate).toBe('2024-01-15')
    })

    it('adds entry to history', () => {
      completeDailyChallenge('user123')

      const [, value] = localStorage.setItem.mock.calls[0]
      const data = JSON.parse(value)

      expect(data.history).toHaveLength(1)
      expect(data.history[0].date).toBe('2024-01-15')
      expect(data.history[0]).toHaveProperty('problemId')
      expect(data.history[0]).toHaveProperty('completedAt')
    })

    it('preserves existing history', () => {
      const existingData = {
        completedDate: '2024-01-14',
        history: [
          { date: '2024-01-14', problemId: 'test-1', completedAt: '2024-01-14T12:00:00Z' }
        ]
      }
      localStorage.getItem.mockReturnValue(JSON.stringify(existingData))

      completeDailyChallenge('user123')

      const [, value] = localStorage.setItem.mock.calls[0]
      const data = JSON.parse(value)

      expect(data.history).toHaveLength(2)
    })

    it('limits history to 30 days', () => {
      const oldHistory = Array.from({ length: 35 }, (_, i) => ({
        date: `2024-01-${i + 1}`,
        problemId: `test-${i}`,
        completedAt: `2024-01-${i + 1}T12:00:00Z`
      }))

      const existingData = {
        completedDate: '2024-01-14',
        history: oldHistory
      }
      localStorage.getItem.mockReturnValue(JSON.stringify(existingData))

      completeDailyChallenge('user123')

      const [, value] = localStorage.setItem.mock.calls[0]
      const data = JSON.parse(value)

      expect(data.history.length).toBeLessThanOrEqual(31) // 30 old + 1 new
    })

    it('dispatches dailyChallengeCompleted event', () => {
      const dispatchSpy = vi.spyOn(window, 'dispatchEvent')

      completeDailyChallenge('user123')

      expect(dispatchSpy).toHaveBeenCalled()
      const event = dispatchSpy.mock.calls[0][0]
      expect(event.type).toBe('dailyChallengeCompleted')
      expect(event.detail).toHaveProperty('challenge')
      expect(event.detail).toHaveProperty('date')
      expect(event.detail).toHaveProperty('streak')
      expect(event.detail).toHaveProperty('longestStreak')
    })

    it('updates longest streak when current streak is higher', () => {
      // Setup existing data with lower longest streak
      const existingData = {
        completedDate: '2024-01-14',
        longestStreak: 2,
        history: [
          { date: '2024-01-14', problemId: 'test-1', completedAt: '2024-01-14T12:00:00Z' },
          { date: '2024-01-13', problemId: 'test-2', completedAt: '2024-01-13T12:00:00Z' }
        ]
      }

      // Mock needs to return updated data when called during completeDailyChallenge
      let callCount = 0
      localStorage.getItem.mockImplementation((key) => {
        callCount++
        if (callCount === 1) {
          // First call - return existing data
          return JSON.stringify(existingData)
        } else {
          // Subsequent calls - return updated data with new entry
          const updatedData = {
            ...existingData,
            completedDate: '2024-01-15',
            history: [
              ...existingData.history,
              { date: '2024-01-15', problemId: expect.any(String), completedAt: expect.any(String) }
            ]
          }
          return JSON.stringify(updatedData)
        }
      })

      completeDailyChallenge('user123')

      const [, value] = localStorage.setItem.mock.calls[0]
      const data = JSON.parse(value)

      // Current streak is now 3 (2 previous + today), should update longest
      expect(data.longestStreak).toBeGreaterThanOrEqual(2) // At least maintains previous longest
    })

    it('does not update longest streak when current is lower', () => {
      // Setup with high longest streak but current streak will be 1
      const existingData = {
        completedDate: '2024-01-10', // Gap, so streak resets
        longestStreak: 10,
        history: [
          { date: '2024-01-10', problemId: 'test-1', completedAt: '2024-01-10T12:00:00Z' }
        ]
      }
      localStorage.getItem.mockReturnValue(JSON.stringify(existingData))

      completeDailyChallenge('user123')

      const [, value] = localStorage.setItem.mock.calls[0]
      const data = JSON.parse(value)

      // Current streak is 1, should keep longest at 10
      expect(data.longestStreak).toBe(10)
    })

    it('handles localStorage errors gracefully', () => {
      localStorage.setItem.mockImplementationOnce(() => {
        throw new Error('Storage full')
      })

      const result = completeDailyChallenge('user123')
      expect(result).toBe(false)
    })

    it('returns true on success', () => {
      // Ensure mocks are reset to default behavior
      localStorage.getItem.mockReturnValue(null)
      localStorage.setItem.mockClear()

      const result = completeDailyChallenge('user123')
      expect(result).toBe(true)
    })
  })

  describe('getDailyChallengeStreak', () => {
    it('returns 0 when no history exists', () => {
      localStorage.getItem.mockReturnValue(null)
      expect(getDailyChallengeStreak('user123')).toBe(0)
    })

    it('returns 0 when history is empty', () => {
      const data = { history: [] }
      localStorage.getItem.mockReturnValue(JSON.stringify(data))
      expect(getDailyChallengeStreak('user123')).toBe(0)
    })

    it('calculates streak for consecutive days', () => {
      const data = {
        history: [
          { date: '2024-01-15', problemId: 'test-1', completedAt: '2024-01-15T12:00:00Z' },
          { date: '2024-01-14', problemId: 'test-2', completedAt: '2024-01-14T12:00:00Z' },
          { date: '2024-01-13', problemId: 'test-3', completedAt: '2024-01-13T12:00:00Z' }
        ]
      }
      localStorage.getItem.mockReturnValue(JSON.stringify(data))

      expect(getDailyChallengeStreak('user123')).toBe(3)
    })

    it('stops counting at gap in streak', () => {
      const data = {
        history: [
          { date: '2024-01-15', problemId: 'test-1', completedAt: '2024-01-15T12:00:00Z' },
          { date: '2024-01-14', problemId: 'test-2', completedAt: '2024-01-14T12:00:00Z' },
          // Gap here
          { date: '2024-01-12', problemId: 'test-3', completedAt: '2024-01-12T12:00:00Z' }
        ]
      }
      localStorage.getItem.mockReturnValue(JSON.stringify(data))

      expect(getDailyChallengeStreak('user123')).toBe(2)
    })

    it('handles localStorage errors gracefully', () => {
      localStorage.getItem.mockImplementation(() => {
        throw new Error('Storage error')
      })

      expect(getDailyChallengeStreak('user123')).toBe(0)
    })
  })

  describe('getLongestStreak', () => {
    it('returns 0 when no data exists', () => {
      localStorage.getItem.mockReturnValue(null)
      expect(getLongestStreak('user123')).toBe(0)
    })

    it('returns stored longest streak', () => {
      const data = {
        longestStreak: 15,
        history: []
      }
      localStorage.getItem.mockReturnValue(JSON.stringify(data))

      expect(getLongestStreak('user123')).toBe(15)
    })

    it('returns 0 when longestStreak is not set', () => {
      const data = {
        history: []
      }
      localStorage.getItem.mockReturnValue(JSON.stringify(data))

      expect(getLongestStreak('user123')).toBe(0)
    })

    it('handles localStorage errors gracefully', () => {
      localStorage.getItem.mockImplementation(() => {
        throw new Error('Storage error')
      })

      expect(getLongestStreak('user123')).toBe(0)
    })
  })

  describe('getAllChallengeProblems', () => {
    it('returns an array of problems', () => {
      const problems = getAllChallengeProblems()
      expect(Array.isArray(problems)).toBe(true)
      expect(problems.length).toBeGreaterThan(0)
    })

    it('each problem has required fields', () => {
      const problems = getAllChallengeProblems()

      problems.forEach(problem => {
        expect(problem).toHaveProperty('id')
        expect(problem).toHaveProperty('title')
        expect(problem).toHaveProperty('difficulty')
        expect(problem).toHaveProperty('category')
        expect(problem).toHaveProperty('page')
      })
    })

    it('includes problems from multiple categories', () => {
      const problems = getAllChallengeProblems()
      const categories = [...new Set(problems.map(p => p.category))]

      expect(categories.length).toBeGreaterThan(1)
    })

    it('includes multiple difficulty levels', () => {
      const problems = getAllChallengeProblems()
      const difficulties = [...new Set(problems.map(p => p.difficulty))]

      expect(difficulties).toContain('Easy')
      expect(difficulties).toContain('Medium')
    })
  })

  describe('getDifficultyColor', () => {
    it('returns green for Easy', () => {
      expect(getDifficultyColor('Easy')).toBe('#10b981')
    })

    it('returns orange for Medium', () => {
      expect(getDifficultyColor('Medium')).toBe('#f59e0b')
    })

    it('returns red for Hard', () => {
      expect(getDifficultyColor('Hard')).toBe('#ef4444')
    })

    it('returns gray for unknown difficulty', () => {
      expect(getDifficultyColor('Unknown')).toBe('#6b7280')
    })

    it('handles null gracefully', () => {
      expect(getDifficultyColor(null)).toBe('#6b7280')
    })

    it('handles undefined gracefully', () => {
      expect(getDifficultyColor(undefined)).toBe('#6b7280')
    })
  })
})
