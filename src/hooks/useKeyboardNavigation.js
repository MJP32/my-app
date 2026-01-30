import { useEffect, useRef, useState } from 'react'

/**
 * Custom hook for comprehensive keyboard navigation
 * Supports arrow keys, Tab, Enter, Space, and Esc
 */
export function useKeyboardNavigation({
  items = [],
  onSelect,
  onBack,
  onEscape,
  enabled = true,
  gridColumns = 1,
  loop = true
}) {
  const [focusedIndex, setFocusedIndex] = useState(0)
  const itemRefs = useRef({})
  const initialFocusAttempted = useRef(false)

  // Focus the current item
  useEffect(() => {
    if (enabled && itemRefs.current[focusedIndex]) {
      itemRefs.current[focusedIndex].focus()
    }
  }, [focusedIndex, enabled])

  // Initial focus when component becomes enabled
  useEffect(() => {
    if (enabled && items.length > 0 && !initialFocusAttempted.current) {
      // Small delay to ensure refs are populated
      const timer = setTimeout(() => {
        if (itemRefs.current[0]) {
          itemRefs.current[0].focus()
          initialFocusAttempted.current = true
        }
      }, 50)
      return () => clearTimeout(timer)
    }

    // Reset when disabled
    if (!enabled) {
      initialFocusAttempted.current = false
    }
  }, [enabled, items.length])

  const handleKeyDown = (e) => {
    if (!enabled) return

    const totalItems = items.length
    if (totalItems === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (gridColumns === 1) {
          // Single column - move to next item
          setFocusedIndex(prev => {
            const next = prev + 1
            return loop ? next % totalItems : Math.min(next, totalItems - 1)
          })
        } else {
          // Grid layout - move down one row
          setFocusedIndex(prev => {
            const next = prev + gridColumns
            if (next >= totalItems) {
              return loop ? next % totalItems : prev
            }
            return next
          })
        }
        break

      case 'ArrowUp':
        e.preventDefault()
        if (gridColumns === 1) {
          // Single column - move to previous item
          setFocusedIndex(prev => {
            const next = prev - 1
            return loop ? (next < 0 ? totalItems - 1 : next) : Math.max(next, 0)
          })
        } else {
          // Grid layout - move up one row
          setFocusedIndex(prev => {
            const next = prev - gridColumns
            if (next < 0) {
              return loop ? totalItems + next : prev
            }
            return next
          })
        }
        break

      case 'ArrowRight':
        e.preventDefault()
        setFocusedIndex(prev => {
          const next = prev + 1
          return loop ? next % totalItems : Math.min(next, totalItems - 1)
        })
        break

      case 'ArrowLeft':
        e.preventDefault()
        setFocusedIndex(prev => {
          const next = prev - 1
          return loop ? (next < 0 ? totalItems - 1 : next) : Math.max(next, 0)
        })
        break

      case 'Home':
        e.preventDefault()
        setFocusedIndex(0)
        break

      case 'End':
        e.preventDefault()
        setFocusedIndex(totalItems - 1)
        break

      case 'Enter':
      case ' ':
        e.preventDefault()
        if (onSelect && items[focusedIndex]) {
          onSelect(items[focusedIndex])
        }
        break

      case 'Escape': {
        e.preventDefault()
        // Use onEscape if provided, otherwise fall back to onBack
        const escapeHandler = onEscape || onBack
        if (escapeHandler) {
          escapeHandler()
        }
        break
      }

      default:
        break
    }
  }

  // Attach keyboard listener
  useEffect(() => {
    if (!enabled) return

    const keyDownHandler = (e) => {
      // Don't interfere with input fields, textareas, or contenteditable elements
      const target = e.target
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.contentEditable === 'true' ||
        target.closest('[contenteditable="true"]')
      ) {
        return
      }

      handleKeyDown(e)
    }

    window.addEventListener('keydown', keyDownHandler)
    return () => window.removeEventListener('keydown', keyDownHandler)
  }, [enabled, focusedIndex, items, gridColumns, loop, onEscape, handleKeyDown])

  return {
    focusedIndex,
    setFocusedIndex,
    itemRefs,
    handleKeyDown
  }
}

/**
 * Hook for managing focus trap in modals
 */
export function useFocusTrap(isActive = true) {
  const containerRef = useRef(null)
  const previousFocusRef = useRef(null)

  useEffect(() => {
    if (!isActive || !containerRef.current) return

    // Save the currently focused element
    previousFocusRef.current = document.activeElement

    // Get all focusable elements in the container
    const getFocusableElements = () => {
      if (!containerRef.current) return []
      return containerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    }

    // Focus the first element
    const focusableElements = getFocusableElements()
    if (focusableElements.length > 0) {
      focusableElements[0].focus()
    }

    // Handle Tab key to trap focus
    const handleKeyDown = (e) => {
      if (e.key !== 'Tab') return

      const focusableElements = getFocusableElements()
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    // Restore focus when component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      if (previousFocusRef.current) {
        previousFocusRef.current.focus()
      }
    }
  }, [isActive])

  return containerRef
}
