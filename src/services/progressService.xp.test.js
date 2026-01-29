import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  getUserXP,
  addUserXP,
  calculateLevel,
  getUserLevel,
  getXPForNextLevel,
  getXPForDifficulty,
  getLevelInfo
} from './progressService'

// Create a stable mock user
const mockUser = { uid: 'test-user-123' }

// Mock authService
vi.mock('./authService', () => ({
  getCurrentUser: vi.fn(() => mockUser)
}))

// Mock weeklyGoalsService to avoid circular dependency
vi.mock('./weeklyGoalsService', () => ({
  recordWeeklyProblem: vi.fn()
}))

describe('XP and Level System', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  describe('getUserXP', () => {
    it('returns 0 when no XP data exists', () => {
      const result = getUserXP()
      expect(result).toBe(0)
    })

    it('returns stored XP', () => {
      const xpData = { totalXP: 500 }
      // First add XP to create the record
      addUserXP(500, 'test')

      const result = getUserXP()
      expect(result).toBe(500)
    })

    it('handles invalid JSON gracefully', () => {
      localStorage.setItem('user_xp_test-user-123', 'invalid json')

      const result = getUserXP()
      expect(result).toBe(0)
    })
  })

  describe('addUserXP', () => {
    it('adds XP to total', () => {
      addUserXP(50, 'test')

      expect(getUserXP()).toBe(50)
    })

    it('accumulates XP over multiple calls', () => {
      addUserXP(50, 'test1')
      addUserXP(30, 'test2')
      addUserXP(20, 'test3')

      expect(getUserXP()).toBe(100)
    })

    it('stores XP history', () => {
      addUserXP(50, 'problem-1')
      addUserXP(30, 'problem-2')

      const stored = localStorage.getItem('user_xp_test-user-123')
      const data = JSON.parse(stored)

      expect(data.history).toHaveLength(2)
      expect(data.history[0].xp).toBe(50)
      expect(data.history[0].source).toBe('problem-1')
      expect(data.history[1].xp).toBe(30)
      expect(data.history[1].source).toBe('problem-2')
    })

    it('limits history to 100 entries', () => {
      // Add 150 entries
      for (let i = 0; i < 150; i++) {
        addUserXP(10, `test-${i}`)
      }

      const stored = localStorage.getItem('user_xp_test-user-123')
      const data = JSON.parse(stored)

      expect(data.history.length).toBeLessThanOrEqual(100)
    })

    it('dispatches xpGained event', () => {
      const dispatchSpy = vi.spyOn(window, 'dispatchEvent')

      addUserXP(50, 'test')

      expect(dispatchSpy).toHaveBeenCalled()
      const event = dispatchSpy.mock.calls.find(call => call[0].type === 'xpGained')?.[0]
      expect(event).toBeDefined()
      expect(event.detail.xp).toBe(50)
      expect(event.detail.totalXP).toBe(50)
      expect(event.detail.source).toBe('test')
    })

    it('dispatches levelUp event when level increases', () => {
      const dispatchSpy = vi.spyOn(window, 'dispatchEvent')

      // Add enough XP to level up (Level 2 requires 100 XP)
      addUserXP(100, 'test')

      const levelUpEvent = dispatchSpy.mock.calls.find(call => call[0].type === 'levelUp')?.[0]
      expect(levelUpEvent).toBeDefined()
      expect(levelUpEvent.detail.oldLevel).toBe(1)
      expect(levelUpEvent.detail.newLevel).toBe(2)
    })
  })

  describe('calculateLevel', () => {
    it('returns level 1 for 0 XP', () => {
      expect(calculateLevel(0)).toBe(1)
    })

    it('returns level 2 for 100 XP', () => {
      expect(calculateLevel(100)).toBe(2)
    })

    it('returns level 3 for 250 XP', () => {
      expect(calculateLevel(250)).toBe(3)
    })

    it('returns level 5 for 1000 XP', () => {
      expect(calculateLevel(1000)).toBe(5)
    })

    it('returns level 10 for 2500 XP', () => {
      expect(calculateLevel(2500)).toBe(10)
    })

    it('returns level 50 for 100000 XP', () => {
      expect(calculateLevel(100000)).toBe(50)
    })

    it('stays at highest level for XP beyond max', () => {
      expect(calculateLevel(200000)).toBe(50)
    })
  })

  describe('getUserLevel', () => {
    it('returns level 1 with no XP', () => {
      expect(getUserLevel()).toBe(1)
    })

    it('returns correct level for stored XP', () => {
      const xpData = { totalXP: 500 }
      localStorage.setItem('user_xp_test-user-123', JSON.stringify(xpData))

      expect(getUserLevel()).toBe(4) // 500 XP = Level 4
    })
  })

  describe('getXPForNextLevel', () => {
    it('returns progress to next level', () => {
      const xpData = { totalXP: 150 }
      localStorage.setItem('user_xp_test-user-123', JSON.stringify(xpData))

      const info = getXPForNextLevel()

      expect(info.current).toBe(150)
      expect(info.nextLevel).toBe(3) // Next level after 2
      expect(info.needed).toBe(250) // Level 3 threshold
      expect(info.remaining).toBe(100) // 250 - 150
    })

    it('calculates percentage progress correctly', () => {
      const xpData = { totalXP: 175 } // Level 2 (100-249)
      localStorage.setItem('user_xp_test-user-123', JSON.stringify(xpData))

      const info = getXPForNextLevel()

      // Progress from 100 to 250: 175 is 75/150 = 50%
      expect(info.percent).toBe(50)
    })

    it('handles max level gracefully', () => {
      const xpData = { totalXP: 150000 } // Beyond max level
      localStorage.setItem('user_xp_test-user-123', JSON.stringify(xpData))

      const info = getXPForNextLevel()

      expect(info.nextLevel).toBe(50) // Max level
      expect(info.percent).toBe(100)
    })
  })

  describe('getXPForDifficulty', () => {
    it('returns 10 XP for Easy', () => {
      expect(getXPForDifficulty('Easy')).toBe(10)
    })

    it('returns 25 XP for Medium', () => {
      expect(getXPForDifficulty('Medium')).toBe(25)
    })

    it('returns 50 XP for Hard', () => {
      expect(getXPForDifficulty('Hard')).toBe(50)
    })

    it('applies multiplier correctly', () => {
      expect(getXPForDifficulty('Easy', 2)).toBe(20)
      expect(getXPForDifficulty('Medium', 2)).toBe(50)
      expect(getXPForDifficulty('Hard', 2)).toBe(100)
    })

    it('returns 0 for unknown difficulty', () => {
      expect(getXPForDifficulty('Unknown')).toBe(0)
    })
  })

  describe('getLevelInfo', () => {
    it('returns complete level information', () => {
      const xpData = { totalXP: 500 }
      localStorage.setItem('user_xp_test-user-123', JSON.stringify(xpData))

      const info = getLevelInfo()

      expect(info).toHaveProperty('level')
      expect(info).toHaveProperty('xp')
      expect(info).toHaveProperty('current')
      expect(info).toHaveProperty('needed')
      expect(info).toHaveProperty('remaining')
      expect(info).toHaveProperty('nextLevel')
      expect(info).toHaveProperty('percent')

      expect(info.level).toBe(4)
      expect(info.xp).toBe(500)
    })

    it('works with no stored XP', () => {
      const info = getLevelInfo()

      expect(info.level).toBe(1)
      expect(info.xp).toBe(0)
      expect(info.nextLevel).toBe(2)
    })
  })
})
