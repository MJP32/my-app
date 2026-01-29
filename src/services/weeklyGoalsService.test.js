import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  getWeeklyGoalsData,
  initializeWeeklyGoals,
  getWeeklyGoalProgress,
  setWeeklyGoal,
  recordWeeklyProblem,
  getWeeklyStats
} from './weeklyGoalsService'

// Mock authService
vi.mock('./authService', () => ({
  getCurrentUser: vi.fn(() => ({ uid: 'test-user-123' }))
}))

describe('Weekly Goals Service', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  describe('initializeWeeklyGoals', () => {
    it('creates new weekly goal data', () => {
      const data = initializeWeeklyGoals('user123', 5)

      expect(data).toBeDefined()
      expect(data.goal).toBe(5)
      expect(data.completed).toBe(0)
      expect(data.problems).toEqual([])
      expect(data).toHaveProperty('weekId')
      expect(data).toHaveProperty('weekStart')
    })

    it('stores data in localStorage', () => {
      initializeWeeklyGoals('user123', 7)

      const stored = localStorage.getItem('weekly_goals_user123')
      expect(stored).toBeDefined()

      const data = JSON.parse(stored)
      expect(data.goal).toBe(7)
    })

    it('uses default goal of 5', () => {
      const data = initializeWeeklyGoals('user123')

      expect(data.goal).toBe(5)
    })
  })

  describe('getWeeklyGoalsData', () => {
    it('returns null when no data exists', () => {
      expect(getWeeklyGoalsData('user123')).toBeNull()
    })

    it('returns stored data for current week', () => {
      const weeklyData = initializeWeeklyGoals('user123', 5)

      const retrieved = getWeeklyGoalsData('user123')

      expect(retrieved).toBeDefined()
      expect(retrieved.goal).toBe(5)
      expect(retrieved.weekId).toBe(weeklyData.weekId)
    })

    it('returns null for old week data', () => {
      // Create data for "old" week
      const oldWeekData = {
        weekId: '2023-W01',
        weekStart: '2023-01-02',
        goal: 5,
        completed: 3,
        problems: ['test-1', 'test-2', 'test-3']
      }
      localStorage.setItem('weekly_goals_user123', JSON.stringify(oldWeekData))

      const data = getWeeklyGoalsData('user123')

      // Should return null because week ID doesn't match current week
      expect(data).toBeNull()
    })

    it('handles localStorage errors gracefully', () => {
      localStorage.setItem('weekly_goals_user123', 'invalid json')

      expect(getWeeklyGoalsData('user123')).toBeNull()
    })
  })

  describe('getWeeklyGoalProgress', () => {
    it('initializes if no data exists', () => {
      const progress = getWeeklyGoalProgress('user123')

      expect(progress).toBeDefined()
      expect(progress.goal).toBe(5) // Default goal
      expect(progress.completed).toBe(0)
      expect(progress.percent).toBe(0)
    })

    it('calculates progress percentage correctly', () => {
      initializeWeeklyGoals('user123', 10)
      recordWeeklyProblem('user123', 'problem-1')
      recordWeeklyProblem('user123', 'problem-2')
      recordWeeklyProblem('user123', 'problem-3')

      const progress = getWeeklyGoalProgress('user123')

      expect(progress.completed).toBe(3)
      expect(progress.goal).toBe(10)
      expect(progress.percent).toBe(30) // 3/10 = 30%
      expect(progress.remaining).toBe(7)
    })

    it('marks as complete when goal is met', () => {
      initializeWeeklyGoals('user123', 3)
      recordWeeklyProblem('user123', 'problem-1')
      recordWeeklyProblem('user123', 'problem-2')
      recordWeeklyProblem('user123', 'problem-3')

      const progress = getWeeklyGoalProgress('user123')

      expect(progress.isComplete).toBe(true)
      expect(progress.percent).toBe(100)
    })

    it('caps percent at 100 when exceeding goal', () => {
      initializeWeeklyGoals('user123', 3)
      recordWeeklyProblem('user123', 'problem-1')
      recordWeeklyProblem('user123', 'problem-2')
      recordWeeklyProblem('user123', 'problem-3')
      recordWeeklyProblem('user123', 'problem-4')
      recordWeeklyProblem('user123', 'problem-5')

      const progress = getWeeklyGoalProgress('user123')

      expect(progress.completed).toBe(5)
      expect(progress.isComplete).toBe(true)
    })
  })

  describe('setWeeklyGoal', () => {
    it('updates goal for current week', () => {
      initializeWeeklyGoals('user123', 5)

      setWeeklyGoal('user123', 10)

      const progress = getWeeklyGoalProgress('user123')
      expect(progress.goal).toBe(10)
    })

    it('dispatches weeklyGoalUpdated event', () => {
      const dispatchSpy = vi.spyOn(window, 'dispatchEvent')

      setWeeklyGoal('user123', 7)

      expect(dispatchSpy).toHaveBeenCalled()
      const event = dispatchSpy.mock.calls.find(call => call[0].type === 'weeklyGoalUpdated')?.[0]
      expect(event).toBeDefined()
      expect(event.detail.goal).toBe(7)
    })

    it('initializes data if not exists', () => {
      setWeeklyGoal('user123', 8)

      const progress = getWeeklyGoalProgress('user123')
      expect(progress.goal).toBe(8)
    })
  })

  describe('recordWeeklyProblem', () => {
    it('records new problem completion', () => {
      initializeWeeklyGoals('user123', 5)

      recordWeeklyProblem('user123', 'problem-1')

      const progress = getWeeklyGoalProgress('user123')
      expect(progress.completed).toBe(1)
      expect(progress.problems).toContain('problem-1')
    })

    it('does not duplicate problem entries', () => {
      initializeWeeklyGoals('user123', 5)

      recordWeeklyProblem('user123', 'problem-1')
      recordWeeklyProblem('user123', 'problem-1') // Same problem again

      const progress = getWeeklyGoalProgress('user123')
      expect(progress.completed).toBe(1) // Should still be 1
      expect(progress.problems).toHaveLength(1)
    })

    it('dispatches weeklyProgressUpdated event', () => {
      const dispatchSpy = vi.spyOn(window, 'dispatchEvent')
      initializeWeeklyGoals('user123', 5)

      recordWeeklyProblem('user123', 'problem-1')

      const event = dispatchSpy.mock.calls.find(call => call[0].type === 'weeklyProgressUpdated')?.[0]
      expect(event).toBeDefined()
      expect(event.detail.completed).toBe(1)
      expect(event.detail.goal).toBe(5)
    })

    it('dispatches weeklyGoalCompleted event when goal is met', () => {
      const dispatchSpy = vi.spyOn(window, 'dispatchEvent')
      initializeWeeklyGoals('user123', 2)

      recordWeeklyProblem('user123', 'problem-1')
      vi.clearAllMocks() // Clear previous events

      recordWeeklyProblem('user123', 'problem-2') // This should complete the goal

      const event = dispatchSpy.mock.calls.find(call => call[0].type === 'weeklyGoalCompleted')?.[0]
      expect(event).toBeDefined()
      expect(event.detail.completed).toBe(2)
      expect(event.detail.goal).toBe(2)
    })

    it('only dispatches completion event once', () => {
      const dispatchSpy = vi.spyOn(window, 'dispatchEvent')
      initializeWeeklyGoals('user123', 2)

      recordWeeklyProblem('user123', 'problem-1')
      recordWeeklyProblem('user123', 'problem-2') // Completes goal
      vi.clearAllMocks()

      recordWeeklyProblem('user123', 'problem-3') // Exceeds goal

      const completionEvents = dispatchSpy.mock.calls.filter(call => call[0].type === 'weeklyGoalCompleted')
      expect(completionEvents).toHaveLength(0) // Should not dispatch again
    })

    it('initializes data if not exists', () => {
      recordWeeklyProblem('user123', 'problem-1')

      const progress = getWeeklyGoalProgress('user123')
      expect(progress.completed).toBe(1)
    })
  })

  describe('getWeeklyStats', () => {
    it('returns stats for current week only when no history', () => {
      initializeWeeklyGoals('user123', 5)
      recordWeeklyProblem('user123', 'problem-1')
      recordWeeklyProblem('user123', 'problem-2')

      const stats = getWeeklyStats('user123')

      expect(stats.totalWeeks).toBe(1)
      expect(stats.completedWeeks).toBe(0) // Goal not met
      expect(stats.averageCompletion).toBe(2)
      expect(stats.currentStreak).toBe(0)
    })

    it('calculates stats with history', () => {
      // Setup history
      const history = [
        { weekId: '2024-W01', goal: 5, completed: 5, isComplete: true },
        { weekId: '2024-W02', goal: 5, completed: 3, isComplete: false },
        { weekId: '2024-W03', goal: 5, completed: 5, isComplete: true }
      ]
      localStorage.setItem('weekly_goals_history_user123', JSON.stringify(history))

      // Current week
      initializeWeeklyGoals('user123', 5)
      recordWeeklyProblem('user123', 'problem-1')
      recordWeeklyProblem('user123', 'problem-2')

      const stats = getWeeklyStats('user123')

      expect(stats.totalWeeks).toBe(4) // 3 history + 1 current
      expect(stats.completedWeeks).toBe(2) // 2 complete from history
      expect(stats.averageCompletion).toBe(4) // (5+3+5+2)/4 = 3.75 rounded to 4
      expect(stats.completionRate).toBe(50) // 2/4 = 50%
    })

    it('calculates completion rate correctly', () => {
      const history = [
        { weekId: '2024-W01', goal: 5, completed: 5, isComplete: true },
        { weekId: '2024-W02', goal: 5, completed: 5, isComplete: true },
        { weekId: '2024-W03', goal: 5, completed: 5, isComplete: true }
      ]
      localStorage.setItem('weekly_goals_history_user123', JSON.stringify(history))

      initializeWeeklyGoals('user123', 5)
      for (let i = 1; i <= 5; i++) {
        recordWeeklyProblem('user123', `problem-${i}`)
      }

      const stats = getWeeklyStats('user123')

      expect(stats.completionRate).toBe(100) // All weeks complete
    })

    it('calculates current streak correctly', () => {
      const history = [
        { weekId: '2024-W01', goal: 5, completed: 3, isComplete: false },
        { weekId: '2024-W02', goal: 5, completed: 5, isComplete: true },
        { weekId: '2024-W03', goal: 5, completed: 5, isComplete: true }
      ]
      localStorage.setItem('weekly_goals_history_user123', JSON.stringify(history))

      initializeWeeklyGoals('user123', 5)
      for (let i = 1; i <= 5; i++) {
        recordWeeklyProblem('user123', `problem-${i}`)
      }

      const stats = getWeeklyStats('user123')

      expect(stats.currentStreak).toBe(3) // W02, W03, current
    })

    it('resets streak when goal not met', () => {
      const history = [
        { weekId: '2024-W01', goal: 5, completed: 5, isComplete: true },
        { weekId: '2024-W02', goal: 5, completed: 5, isComplete: true }
      ]
      localStorage.setItem('weekly_goals_history_user123', JSON.stringify(history))

      initializeWeeklyGoals('user123', 5)
      recordWeeklyProblem('user123', 'problem-1') // Only 1, goal not met

      const stats = getWeeklyStats('user123')

      expect(stats.currentStreak).toBe(0) // Streak broken
    })
  })
})
