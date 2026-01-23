import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  KEYS,
  SHORTCUTS,
  navigateGrid,
  navigateLinear,
  FocusManager,
  AriaUtils,
  handleKeyboardEvent
} from './keyboardNavigation'

describe('keyboardNavigation', () => {
  describe('KEYS constants', () => {
    it('should have correct key values', () => {
      expect(KEYS.ARROW_UP).toBe('ArrowUp')
      expect(KEYS.ARROW_DOWN).toBe('ArrowDown')
      expect(KEYS.ARROW_LEFT).toBe('ArrowLeft')
      expect(KEYS.ARROW_RIGHT).toBe('ArrowRight')
      expect(KEYS.ENTER).toBe('Enter')
      expect(KEYS.SPACE).toBe(' ')
      expect(KEYS.ESCAPE).toBe('Escape')
      expect(KEYS.TAB).toBe('Tab')
      expect(KEYS.HOME).toBe('Home')
      expect(KEYS.END).toBe('End')
    })
  })

  describe('SHORTCUTS constants', () => {
    it('should have correct shortcut values', () => {
      expect(SHORTCUTS.BACK).toContain('b')
      expect(SHORTCUTS.BACK).toContain('B')
      expect(SHORTCUTS.HELP).toContain('h')
      expect(SHORTCUTS.HELP).toContain('?')
      expect(SHORTCUTS.SEARCH).toContain('/')
      expect(SHORTCUTS.MAIN_MENU).toContain('m')
    })
  })

  describe('navigateGrid', () => {
    // Test with 3x3 grid (9 items, 3 columns)
    // Index layout:
    // 0 1 2
    // 3 4 5
    // 6 7 8

    it('should navigate up within bounds', () => {
      expect(navigateGrid(4, 9, 3, 'up')).toBe(1) // center to top-center
      expect(navigateGrid(7, 9, 3, 'up')).toBe(4) // bottom-center to center
    })

    it('should stay at current position when navigating up from top row', () => {
      expect(navigateGrid(0, 9, 3, 'up')).toBe(0)
      expect(navigateGrid(1, 9, 3, 'up')).toBe(1)
      expect(navigateGrid(2, 9, 3, 'up')).toBe(2)
    })

    it('should navigate down within bounds', () => {
      expect(navigateGrid(1, 9, 3, 'down')).toBe(4) // top-center to center
      expect(navigateGrid(4, 9, 3, 'down')).toBe(7) // center to bottom-center
    })

    it('should stay at current position when navigating down from bottom row', () => {
      expect(navigateGrid(6, 9, 3, 'down')).toBe(6)
      expect(navigateGrid(7, 9, 3, 'down')).toBe(7)
      expect(navigateGrid(8, 9, 3, 'down')).toBe(8)
    })

    it('should navigate left within bounds', () => {
      expect(navigateGrid(4, 9, 3, 'left')).toBe(3)
      expect(navigateGrid(2, 9, 3, 'left')).toBe(1)
    })

    it('should stay at current position when navigating left from first item', () => {
      expect(navigateGrid(0, 9, 3, 'left')).toBe(0)
    })

    it('should navigate right within bounds', () => {
      expect(navigateGrid(4, 9, 3, 'right')).toBe(5)
      expect(navigateGrid(0, 9, 3, 'right')).toBe(1)
    })

    it('should stay at current position when navigating right from last item', () => {
      expect(navigateGrid(8, 9, 3, 'right')).toBe(8)
    })

    it('should handle incomplete last row', () => {
      // 10 items, 3 columns:
      // 0 1 2
      // 3 4 5
      // 6 7 8
      // 9
      expect(navigateGrid(4, 10, 3, 'down')).toBe(7)
      expect(navigateGrid(5, 10, 3, 'down')).toBe(8) // should stay at 8, not go to non-existent index
    })

    it('should return current index for invalid direction', () => {
      expect(navigateGrid(4, 9, 3, 'invalid')).toBe(4)
    })
  })

  describe('navigateLinear', () => {
    const totalItems = 5

    describe('without wrapping', () => {
      it('should navigate to next item', () => {
        expect(navigateLinear(0, totalItems, 'next', false)).toBe(1)
        expect(navigateLinear(2, totalItems, 'next', false)).toBe(3)
      })

      it('should stay at last item when navigating next at end', () => {
        expect(navigateLinear(4, totalItems, 'next', false)).toBe(4)
      })

      it('should navigate to previous item', () => {
        expect(navigateLinear(4, totalItems, 'previous', false)).toBe(3)
        expect(navigateLinear(2, totalItems, 'previous', false)).toBe(1)
      })

      it('should stay at first item when navigating previous at start', () => {
        expect(navigateLinear(0, totalItems, 'previous', false)).toBe(0)
      })
    })

    describe('with wrapping', () => {
      it('should wrap to first item when navigating next at end', () => {
        expect(navigateLinear(4, totalItems, 'next', true)).toBe(0)
      })

      it('should wrap to last item when navigating previous at start', () => {
        expect(navigateLinear(0, totalItems, 'previous', true)).toBe(4)
      })
    })

    it('should navigate to first item', () => {
      expect(navigateLinear(3, totalItems, 'first')).toBe(0)
    })

    it('should navigate to last item', () => {
      expect(navigateLinear(1, totalItems, 'last')).toBe(4)
    })

    it('should return current index for invalid direction', () => {
      expect(navigateLinear(2, totalItems, 'invalid')).toBe(2)
    })
  })

  describe('FocusManager', () => {
    let mockElement

    beforeEach(() => {
      mockElement = {
        focus: vi.fn(),
        classList: {
          add: vi.fn(),
          remove: vi.fn()
        }
      }
    })

    describe('setFocus', () => {
      it('should focus element and add keyboard-focus class', () => {
        FocusManager.setFocus(mockElement)

        expect(mockElement.focus).toHaveBeenCalled()
        expect(mockElement.classList.add).toHaveBeenCalledWith('keyboard-focus')
      })

      it('should focus element without adding class when addKeyboardClass is false', () => {
        FocusManager.setFocus(mockElement, false)

        expect(mockElement.focus).toHaveBeenCalled()
        expect(mockElement.classList.add).not.toHaveBeenCalled()
      })

      it('should handle null element gracefully', () => {
        expect(() => FocusManager.setFocus(null)).not.toThrow()
      })
    })

    describe('removeFocus', () => {
      it('should remove keyboard-focus class from element', () => {
        FocusManager.removeFocus(mockElement)

        expect(mockElement.classList.remove).toHaveBeenCalledWith('keyboard-focus')
      })

      it('should handle null element gracefully', () => {
        expect(() => FocusManager.removeFocus(null)).not.toThrow()
      })
    })

    describe('focusBySelector', () => {
      it('should focus element by selector', () => {
        const container = {
          querySelectorAll: vi.fn().mockReturnValue([mockElement])
        }

        FocusManager.focusBySelector(container, '.test-selector')

        expect(container.querySelectorAll).toHaveBeenCalledWith('.test-selector')
        expect(mockElement.focus).toHaveBeenCalled()
      })

      it('should focus element at specific index', () => {
        const mockElements = [
          { focus: vi.fn(), classList: { add: vi.fn() } },
          { focus: vi.fn(), classList: { add: vi.fn() } }
        ]
        const container = {
          querySelectorAll: vi.fn().mockReturnValue(mockElements)
        }

        FocusManager.focusBySelector(container, '.test-selector', 1)

        expect(mockElements[1].focus).toHaveBeenCalled()
        expect(mockElements[0].focus).not.toHaveBeenCalled()
      })

      it('should handle null container gracefully', () => {
        expect(() => FocusManager.focusBySelector(null, '.test')).not.toThrow()
      })
    })

    describe('getFocusableElements', () => {
      it('should return focusable elements', () => {
        const mockElements = [mockElement]
        const container = {
          querySelectorAll: vi.fn().mockReturnValue(mockElements)
        }

        const result = FocusManager.getFocusableElements(container)

        expect(result).toBe(mockElements)
        expect(container.querySelectorAll).toHaveBeenCalledWith(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [role="button"], [role="menuitem"]'
        )
      })

      it('should return empty array for null container', () => {
        const result = FocusManager.getFocusableElements(null)

        expect(result).toEqual([])
      })
    })
  })

  describe('AriaUtils', () => {
    describe('setAttributes', () => {
      it('should set ARIA attributes on element', () => {
        const mockElement = {
          setAttribute: vi.fn()
        }

        AriaUtils.setAttributes(mockElement, {
          'aria-label': 'Test label',
          'aria-expanded': 'true'
        })

        expect(mockElement.setAttribute).toHaveBeenCalledWith('aria-label', 'Test label')
        expect(mockElement.setAttribute).toHaveBeenCalledWith('aria-expanded', 'true')
      })

      it('should handle null element gracefully', () => {
        expect(() => AriaUtils.setAttributes(null, { 'aria-label': 'test' })).not.toThrow()
      })
    })

    describe('announce', () => {
      beforeEach(() => {
        vi.useFakeTimers()
      })

      afterEach(() => {
        vi.useRealTimers()
      })

      it('should create and remove announcer element', () => {
        const appendChildSpy = vi.spyOn(document.body, 'appendChild')
        const removeChildSpy = vi.spyOn(document.body, 'removeChild')

        AriaUtils.announce('Test announcement')

        expect(appendChildSpy).toHaveBeenCalled()

        const announcerElement = appendChildSpy.mock.calls[0][0]
        expect(announcerElement.getAttribute('aria-live')).toBe('polite')
        expect(announcerElement.textContent).toBe('Test announcement')

        vi.advanceTimersByTime(1000)

        expect(removeChildSpy).toHaveBeenCalledWith(announcerElement)
      })

      it('should use assertive priority when specified', () => {
        const appendChildSpy = vi.spyOn(document.body, 'appendChild')

        AriaUtils.announce('Urgent announcement', 'assertive')

        const announcerElement = appendChildSpy.mock.calls[0][0]
        expect(announcerElement.getAttribute('aria-live')).toBe('assertive')
      })
    })
  })

  describe('handleKeyboardEvent', () => {
    it('should call handler for matching key', () => {
      const handler = vi.fn()
      const event = {
        key: 'Enter',
        target: { tagName: 'DIV' },
        preventDefault: vi.fn()
      }

      handleKeyboardEvent(event, { Enter: handler })

      expect(handler).toHaveBeenCalledWith(event)
      expect(event.preventDefault).toHaveBeenCalled()
    })

    it('should not call handler for non-matching key', () => {
      const handler = vi.fn()
      const event = {
        key: 'Escape',
        target: { tagName: 'DIV' },
        preventDefault: vi.fn()
      }

      handleKeyboardEvent(event, { Enter: handler })

      expect(handler).not.toHaveBeenCalled()
    })

    it('should not handle events from input elements', () => {
      const handler = vi.fn()
      const event = {
        key: 'Enter',
        target: { tagName: 'INPUT' },
        preventDefault: vi.fn()
      }

      handleKeyboardEvent(event, { Enter: handler })

      expect(handler).not.toHaveBeenCalled()
    })

    it('should not handle events from textarea elements', () => {
      const handler = vi.fn()
      const event = {
        key: 'Enter',
        target: { tagName: 'TEXTAREA' },
        preventDefault: vi.fn()
      }

      handleKeyboardEvent(event, { Enter: handler })

      expect(handler).not.toHaveBeenCalled()
    })

    it('should not prevent default when preventDefault is false', () => {
      const handler = vi.fn()
      const event = {
        key: 'Enter',
        target: { tagName: 'DIV' },
        preventDefault: vi.fn()
      }

      handleKeyboardEvent(event, { Enter: handler }, false)

      expect(handler).toHaveBeenCalled()
      expect(event.preventDefault).not.toHaveBeenCalled()
    })
  })
})
