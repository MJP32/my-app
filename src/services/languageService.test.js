import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getPreferredLanguage, setPreferredLanguage } from './languageService'

describe('languageService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.getItem.mockReset()
    localStorage.setItem.mockReset()
  })

  describe('getPreferredLanguage', () => {
    it('should return stored language when available', () => {
      localStorage.getItem.mockReturnValue('python')

      const result = getPreferredLanguage()

      expect(result).toBe('python')
      expect(localStorage.getItem).toHaveBeenCalledWith('preferredLanguage')
    })

    it('should return java as default when no language stored', () => {
      localStorage.getItem.mockReturnValue(null)

      const result = getPreferredLanguage()

      expect(result).toBe('java')
    })

    it('should return java when localStorage throws error', () => {
      localStorage.getItem.mockImplementation(() => {
        throw new Error('Storage error')
      })

      const result = getPreferredLanguage()

      expect(result).toBe('java')
    })
  })

  describe('setPreferredLanguage', () => {
    it('should save language to localStorage', () => {
      setPreferredLanguage('python')

      expect(localStorage.setItem).toHaveBeenCalledWith('preferredLanguage', 'python')
    })

    it('should dispatch languageChange event', () => {
      setPreferredLanguage('python')

      expect(window.dispatchEvent).toHaveBeenCalled()
      const dispatchedEvent = window.dispatchEvent.mock.calls[0][0]
      expect(dispatchedEvent.type).toBe('languageChange')
      expect(dispatchedEvent.detail).toBe('python')
    })

    it('should handle localStorage errors gracefully', () => {
      localStorage.setItem.mockImplementation(() => {
        throw new Error('Storage error')
      })

      expect(() => setPreferredLanguage('python')).not.toThrow()
    })
  })
})
