import { useEffect, useRef } from 'react'

/**
 * Custom hook for managing modal focus behavior
 * - Auto-focuses first interactive element
 * - Traps focus within modal
 * - Handles ESC key to close modal
 * - Restores focus to previous element on close
 *
 * Usage: const { modalRef, firstFocusableRef } = useModalFocus(onClose)
 * - Wrap your modal content with modalRef
 * - Attach firstFocusableRef to the first focusable element (e.g., back button)
 */
export const useModalFocus = (onClose) => {
  const modalRef = useRef(null)
  const previousFocusRef = useRef(null)
  const firstFocusableRef = useRef(null)

  useEffect(() => {
    // Store the currently focused element
    previousFocusRef.current = document.activeElement

    // Focus the first focusable element after a brief delay
    const focusTimeout = setTimeout(() => {
      if (firstFocusableRef.current) {
        firstFocusableRef.current.focus()
      }
    }, 100)

    // Handle ESC key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        onClose()
      }
    }

    // Handle focus trap
    const handleTab = (e) => {
      if (e.key !== 'Tab' || !modalRef.current) return

      const focusableElements = modalRef.current.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (!firstElement) return

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault()
        lastElement?.focus()
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault()
        firstElement?.focus()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('keydown', handleTab)

    return () => {
      clearTimeout(focusTimeout)
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('keydown', handleTab)

      // Restore focus to previous element when modal unmounts
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        setTimeout(() => {
          previousFocusRef.current.focus()
        }, 0)
      }
    }
  }, [onClose])

  return { modalRef, firstFocusableRef }
}
