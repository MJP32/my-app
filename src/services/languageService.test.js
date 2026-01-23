import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getPreferredLanguage, setPreferredLanguage } from './languageService'

describe('languageService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.getItem.mockReturnValue(null)
    localStorage.setItem.mockClear()
  })

  describe('getPreferredLanguage', () => {
    it('returns stored language when available', () => {
      localStorage.getItem.mockReturnValue('python')
      expect(getPreferredLanguage()).toBe('python')
    })

    it('returns java as default when nothing stored', () => {
      localStorage.getItem.mockReturnValue(null)
      expect(getPreferredLanguage()).toBe('java')
    })

    it('returns java when localStorage throws error', () => {
      localStorage.getItem.mockImplementation(() => {
        throw new Error('Storage error')
      })
      expect(getPreferredLanguage()).toBe('java')
    })
  })

  describe('setPreferredLanguage', () => {
    it('saves language to localStorage', () => {
      setPreferredLanguage('python')
      expect(localStorage.setItem).toHaveBeenCalledWith('preferredLanguage', 'python')
    })

    it('dispatches languageChange event', () => {
      const dispatchSpy = vi.spyOn(window, 'dispatchEvent')
      setPreferredLanguage('java')

      expect(dispatchSpy).toHaveBeenCalled()
      const event = dispatchSpy.mock.calls[0][0]
      expect(event.type).toBe('languageChange')
      expect(event.detail).toBe('java')
    })

    it('handles localStorage errors gracefully', () => {
      localStorage.setItem.mockImplementation(() => {
        throw new Error('Storage full')
      })

      // Should not throw
      expect(() => setPreferredLanguage('python')).not.toThrow()
    })
  })
})
