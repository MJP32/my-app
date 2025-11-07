/**
 * Focus Management Utilities
 * Handles focus restoration, automatic focus setting, and focus trapping for accessibility
 */
import React from 'react';

/**
 * Focus history stack to track focus restoration points
 */
class FocusHistory {
  constructor() {
    this.stack = [];
  }

  /**
   * Push a focus restoration point onto the stack
   * @param {HTMLElement} element - Element to restore focus to
   * @param {string} context - Context description for debugging
   */
  push(element, context = '') {
    if (element && element.focus) {
      this.stack.push({
        element,
        context,
        timestamp: Date.now()
      });
      console.log(`Focus history: Pushed ${context}`, element);
    }
  }

  /**
   * Pop and restore focus to the most recent element
   * @param {string} context - Context description for debugging
   * @returns {boolean} - Whether focus was successfully restored
   */
  pop(context = '') {
    const entry = this.stack.pop();
    if (entry && entry.element && document.contains(entry.element)) {
      try {
        entry.element.focus();
        console.log(`Focus history: Restored to ${entry.context} from ${context}`, entry.element);
        return true;
      } catch (error) {
        console.warn('Failed to restore focus:', error);
      }
    }
    return false;
  }

  /**
   * Clear the focus history stack
   */
  clear() {
    this.stack = [];
    console.log('Focus history: Cleared');
  }

  /**
   * Get the current stack size
   */
  size() {
    return this.stack.length;
  }
}

// Global focus history instance
export const focusHistory = new FocusHistory();

/**
 * Focus Management Utilities
 */
export const FocusManager = {
  /**
   * Find the first focusable element within a container
   * @param {HTMLElement} container - Container to search within
   * @returns {HTMLElement|null} - First focusable element or null
   */
  getFirstFocusableElement: (container) => {
    if (!container) return null;

    const focusableSelectors = [
      'button:not([disabled])',
      '[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[role="button"]:not([disabled])',
      '[role="menuitem"]:not([disabled])',
      '[contenteditable="true"]'
    ].join(', ');

    const focusableElements = container.querySelectorAll(focusableSelectors);
    return focusableElements.length > 0 ? focusableElements[0] : null;
  },

  /**
   * Find the last focusable element within a container
   * @param {HTMLElement} container - Container to search within
   * @returns {HTMLElement|null} - Last focusable element or null
   */
  getLastFocusableElement: (container) => {
    if (!container) return null;

    const focusableSelectors = [
      'button:not([disabled])',
      '[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[role="button"]:not([disabled])',
      '[role="menuitem"]:not([disabled])',
      '[contenteditable="true"]'
    ].join(', ');

    const focusableElements = container.querySelectorAll(focusableSelectors);
    return focusableElements.length > 0 ? focusableElements[focusableElements.length - 1] : null;
  },

  /**
   * Set focus to the first interactive element in a container
   * @param {HTMLElement} container - Container to search within
   * @param {number} delay - Delay in milliseconds before focusing
   * @returns {boolean} - Whether focus was successfully set
   */
  focusFirstElement: (container, delay = 0) => {
    const focusElement = () => {
      const firstElement = FocusManager.getFirstFocusableElement(container);
      if (firstElement) {
        try {
          firstElement.focus();
          firstElement.classList.add('keyboard-focus');
          return true;
        } catch (error) {
          console.warn('Failed to focus first element:', error);
        }
      }
      return false;
    };

    if (delay > 0) {
      setTimeout(focusElement, delay);
      return true; // Assume success for delayed focus
    } else {
      return focusElement();
    }
  },

  /**
   * Save current focus and set focus to first element in new view
   * @param {HTMLElement} triggerElement - Element that triggered the view change
   * @param {HTMLElement} newContainer - New view container
   * @param {string} context - Context description
   */
  transitionFocus: (triggerElement, newContainer, context = 'view transition') => {
    // Save current focus for restoration
    if (triggerElement) {
      focusHistory.push(triggerElement, context);
    }

    // Focus first element in new view
    setTimeout(() => {
      FocusManager.focusFirstElement(newContainer, 100);
    }, 50);
  },

  /**
   * Restore focus to the element that triggered the current view
   * @param {string} context - Context description
   * @returns {boolean} - Whether focus was successfully restored
   */
  restoreFocus: (context = 'view close') => {
    return focusHistory.pop(context);
  },

  /**
   * Create a focus trap within a container (for modals/dialogs)
   * @param {HTMLElement} container - Container to trap focus within
   * @returns {Function} - Cleanup function to remove the trap
   */
  createFocusTrap: (container) => {
    // DISABLED TEMPORARILY - BLOCKING INPUT IN SIGN-IN MODAL
    return () => {};

    if (!container) return () => {};

    const firstElement = FocusManager.getFirstFocusableElement(container);
    const lastElement = FocusManager.getLastFocusableElement(container);

    // Focus first element initially
    if (firstElement) {
      firstElement.focus();
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          // Shift + Tab: moving backward
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          // Tab: moving forward
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleKeyDown);

    // Return cleanup function
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  },

  /**
   * Announce focus changes to screen readers
   * @param {string} message - Message to announce
   * @param {string} priority - Priority level ('polite' or 'assertive')
   */
  announce: (message, priority = 'polite') => {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
    
    document.body.appendChild(announcer);
    announcer.textContent = message;
    
    setTimeout(() => {
      if (document.body.contains(announcer)) {
        document.body.removeChild(announcer);
      }
    }, 1000);
  }
};

/**
 * React hook for focus management
 * @param {Object} options - Configuration options
 * @returns {Object} - Focus management utilities
 */
export const useFocusManagement = (options = {}) => {
  const {
    autoFocusFirst = true,
    restoreOnUnmount = true,
    trapFocus = false,
    container = null
  } = options;

  const containerRef = React.useRef(container);
  const cleanupRef = React.useRef(null);

  React.useEffect(() => {
    const currentContainer = containerRef.current;

    if (autoFocusFirst && currentContainer) {
      FocusManager.focusFirstElement(currentContainer, 100);
    }

    if (trapFocus && currentContainer) {
      cleanupRef.current = FocusManager.createFocusTrap(currentContainer);
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
      if (restoreOnUnmount) {
        FocusManager.restoreFocus('component unmount');
      }
    };
  }, [autoFocusFirst, restoreOnUnmount, trapFocus]);

  return {
    containerRef,
    focusFirst: () => FocusManager.focusFirstElement(containerRef.current),
    restoreFocus: () => FocusManager.restoreFocus(),
    transitionFocus: (triggerElement, context) => 
      FocusManager.transitionFocus(triggerElement, containerRef.current, context)
  };
};

export default FocusManager;
