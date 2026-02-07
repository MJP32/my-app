import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock authService before importing drawingService
vi.mock('./authService', () => ({
  getCurrentUser: vi.fn()
}))

import { getCurrentUser } from './authService'
import {
  getDrawingsStorageKey,
  loadDrawings,
  saveDrawings,
  addDrawing,
  deleteDrawing
} from './drawingService'

describe('drawingService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.getItem.mockReturnValue(null)
    localStorage.setItem.mockClear()
  })

  describe('getDrawingsStorageKey', () => {
    it('returns base key when no user is logged in', () => {
      getCurrentUser.mockReturnValue(null)
      expect(getDrawingsStorageKey()).toBe('recursion-scratchpad-drawings')
    })

    it('returns user-specific key when user is logged in', () => {
      getCurrentUser.mockReturnValue({ uid: 'user123' })
      expect(getDrawingsStorageKey()).toBe('recursion-scratchpad-drawings_user123')
    })

    it('returns different keys for different users', () => {
      getCurrentUser.mockReturnValue({ uid: 'alice' })
      const keyA = getDrawingsStorageKey()

      getCurrentUser.mockReturnValue({ uid: 'bob' })
      const keyB = getDrawingsStorageKey()

      expect(keyA).not.toBe(keyB)
      expect(keyA).toBe('recursion-scratchpad-drawings_alice')
      expect(keyB).toBe('recursion-scratchpad-drawings_bob')
    })
  })

  describe('loadDrawings', () => {
    it('returns empty array when nothing is stored', () => {
      getCurrentUser.mockReturnValue(null)
      localStorage.getItem.mockReturnValue(null)

      expect(loadDrawings()).toEqual([])
    })

    it('returns parsed drawings from localStorage', () => {
      getCurrentUser.mockReturnValue(null)
      const drawings = [
        { name: 'Drawing 1', data: 'data:image/png;base64,abc', date: '2026-01-01' }
      ]
      localStorage.getItem.mockReturnValue(JSON.stringify(drawings))

      expect(loadDrawings()).toEqual(drawings)
    })

    it('loads from user-specific key when logged in', () => {
      getCurrentUser.mockReturnValue({ uid: 'user123' })
      const drawings = [{ name: 'My Drawing', data: 'data:...', date: '2026-01-01' }]
      localStorage.getItem.mockReturnValue(JSON.stringify(drawings))

      loadDrawings()

      expect(localStorage.getItem).toHaveBeenCalledWith('recursion-scratchpad-drawings_user123')
    })

    it('loads from base key when not logged in', () => {
      getCurrentUser.mockReturnValue(null)

      loadDrawings()

      expect(localStorage.getItem).toHaveBeenCalledWith('recursion-scratchpad-drawings')
    })

    it('returns empty array when localStorage contains invalid JSON', () => {
      getCurrentUser.mockReturnValue(null)
      localStorage.getItem.mockReturnValue('not valid json{{{')

      expect(loadDrawings()).toEqual([])
    })

    it('returns empty array when localStorage throws', () => {
      getCurrentUser.mockReturnValue(null)
      localStorage.getItem.mockImplementation(() => {
        throw new Error('Storage error')
      })

      expect(loadDrawings()).toEqual([])
    })

    it('returns multiple drawings in order', () => {
      getCurrentUser.mockReturnValue(null)
      const drawings = [
        { name: 'First', data: 'data:1', date: '2026-01-01' },
        { name: 'Second', data: 'data:2', date: '2026-01-02' },
        { name: 'Third', data: 'data:3', date: '2026-01-03' }
      ]
      localStorage.getItem.mockReturnValue(JSON.stringify(drawings))

      const result = loadDrawings()
      expect(result).toHaveLength(3)
      expect(result[0].name).toBe('First')
      expect(result[2].name).toBe('Third')
    })
  })

  describe('saveDrawings', () => {
    it('saves drawings to localStorage with user-specific key', () => {
      getCurrentUser.mockReturnValue({ uid: 'user123' })
      const drawings = [{ name: 'Test', data: 'data:...', date: '2026-01-01' }]

      saveDrawings(drawings)

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'recursion-scratchpad-drawings_user123',
        JSON.stringify(drawings)
      )
    })

    it('saves drawings to base key when not logged in', () => {
      getCurrentUser.mockReturnValue(null)
      const drawings = [{ name: 'Test', data: 'data:...', date: '2026-01-01' }]

      saveDrawings(drawings)

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'recursion-scratchpad-drawings',
        JSON.stringify(drawings)
      )
    })

    it('saves empty array', () => {
      getCurrentUser.mockReturnValue(null)

      saveDrawings([])

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'recursion-scratchpad-drawings',
        '[]'
      )
    })
  })

  describe('addDrawing', () => {
    it('adds a drawing to the list and persists', () => {
      getCurrentUser.mockReturnValue(null)
      const existing = [{ name: 'Old', data: 'data:old', date: '2026-01-01' }]

      const result = addDrawing(existing, 'New Drawing', 'data:image/png;base64,new')

      expect(result).toHaveLength(2)
      expect(result[0].name).toBe('Old')
      expect(result[1].name).toBe('New Drawing')
      expect(result[1].data).toBe('data:image/png;base64,new')
      expect(result[1].date).toBeDefined()
    })

    it('adds to empty list', () => {
      getCurrentUser.mockReturnValue(null)

      const result = addDrawing([], 'First Drawing', 'data:first')

      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('First Drawing')
    })

    it('persists to localStorage after adding', () => {
      getCurrentUser.mockReturnValue({ uid: 'user123' })

      addDrawing([], 'Test', 'data:test')

      expect(localStorage.setItem).toHaveBeenCalledTimes(1)
      const savedData = JSON.parse(localStorage.setItem.mock.calls[0][1])
      expect(savedData).toHaveLength(1)
      expect(savedData[0].name).toBe('Test')
    })

    it('does not mutate the original array', () => {
      getCurrentUser.mockReturnValue(null)
      const original = [{ name: 'A', data: 'data:a', date: '2026-01-01' }]

      const result = addDrawing(original, 'B', 'data:b')

      expect(original).toHaveLength(1)
      expect(result).toHaveLength(2)
    })

    it('includes an ISO date string', () => {
      getCurrentUser.mockReturnValue(null)

      const result = addDrawing([], 'Test', 'data:test')

      expect(() => new Date(result[0].date)).not.toThrow()
      expect(new Date(result[0].date).toISOString()).toBe(result[0].date)
    })
  })

  describe('deleteDrawing', () => {
    const drawings = [
      { name: 'A', data: 'data:a', date: '2026-01-01' },
      { name: 'B', data: 'data:b', date: '2026-01-02' },
      { name: 'C', data: 'data:c', date: '2026-01-03' }
    ]

    it('removes the drawing at the given index', () => {
      getCurrentUser.mockReturnValue(null)

      const result = deleteDrawing(drawings, 1)

      expect(result).toHaveLength(2)
      expect(result[0].name).toBe('A')
      expect(result[1].name).toBe('C')
    })

    it('removes the first drawing', () => {
      getCurrentUser.mockReturnValue(null)

      const result = deleteDrawing(drawings, 0)

      expect(result).toHaveLength(2)
      expect(result[0].name).toBe('B')
    })

    it('removes the last drawing', () => {
      getCurrentUser.mockReturnValue(null)

      const result = deleteDrawing(drawings, 2)

      expect(result).toHaveLength(2)
      expect(result[1].name).toBe('B')
    })

    it('persists to localStorage after deleting', () => {
      getCurrentUser.mockReturnValue({ uid: 'user456' })

      deleteDrawing(drawings, 0)

      expect(localStorage.setItem).toHaveBeenCalledTimes(1)
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'recursion-scratchpad-drawings_user456',
        expect.any(String)
      )
      const savedData = JSON.parse(localStorage.setItem.mock.calls[0][1])
      expect(savedData).toHaveLength(2)
    })

    it('does not mutate the original array', () => {
      getCurrentUser.mockReturnValue(null)
      const original = [...drawings]

      deleteDrawing(original, 1)

      expect(original).toHaveLength(3)
    })

    it('returns empty array when deleting the only drawing', () => {
      getCurrentUser.mockReturnValue(null)
      const single = [{ name: 'Only', data: 'data:only', date: '2026-01-01' }]

      const result = deleteDrawing(single, 0)

      expect(result).toEqual([])
    })
  })

  describe('user isolation', () => {
    it('different users have isolated storage', () => {
      // User A saves a drawing
      getCurrentUser.mockReturnValue({ uid: 'userA' })
      addDrawing([], 'UserA Drawing', 'data:a')

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'recursion-scratchpad-drawings_userA',
        expect.any(String)
      )

      // User B saves a drawing
      getCurrentUser.mockReturnValue({ uid: 'userB' })
      addDrawing([], 'UserB Drawing', 'data:b')

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'recursion-scratchpad-drawings_userB',
        expect.any(String)
      )
    })

    it('anonymous user uses base key', () => {
      getCurrentUser.mockReturnValue(null)
      addDrawing([], 'Anon Drawing', 'data:anon')

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'recursion-scratchpad-drawings',
        expect.any(String)
      )
    })
  })
})
