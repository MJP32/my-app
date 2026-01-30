/**
 * Keyboard Navigation Utilities
 * Centralized utilities for implementing consistent keyboard navigation across the application
 */

import React from 'react';

// Keyboard event constants
export const KEYS = {
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  TAB: 'Tab',
  HOME: 'Home',
  END: 'End',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown'
};

// Global keyboard shortcuts
export const SHORTCUTS = {
  BACK: ['b', 'B'],
  HELP: ['h', 'H', '?'],
  SEARCH: ['/'],
  MAIN_MENU: ['m', 'M'],
  FIRST_ITEM: ['Home'],
  LAST_ITEM: ['End']
};

/**
 * Grid navigation utility for 2D layouts
 * @param {number} currentIndex - Current focused index
 * @param {number} totalItems - Total number of items
 * @param {number} columns - Number of columns in grid
 * @param {string} direction - Direction to move ('up', 'down', 'left', 'right')
 * @returns {number} New index after navigation
 */
export const navigateGrid = (currentIndex, totalItems, columns, direction) => {
  const rows = Math.ceil(totalItems / columns);
  const currentRow = Math.floor(currentIndex / columns);
  // currentCol is used implicitly in index calculations

  switch (direction) {
    case 'up':
      if (currentRow > 0) {
        return Math.max(0, currentIndex - columns);
      }
      return currentIndex; // Stay at current position if at top

    case 'down':
      if (currentRow < rows - 1) {
        return Math.min(totalItems - 1, currentIndex + columns);
      }
      return currentIndex; // Stay at current position if at bottom

    case 'left':
      return currentIndex > 0 ? currentIndex - 1 : currentIndex;

    case 'right':
      return currentIndex < totalItems - 1 ? currentIndex + 1 : currentIndex;

    default:
      return currentIndex;
  }
};

/**
 * Linear navigation utility for 1D layouts
 * @param {number} currentIndex - Current focused index
 * @param {number} totalItems - Total number of items
 * @param {string} direction - Direction to move ('next', 'previous', 'first', 'last')
 * @param {boolean} wrap - Whether to wrap around at boundaries
 * @returns {number} New index after navigation
 */
export const navigateLinear = (currentIndex, totalItems, direction, wrap = false) => {
  switch (direction) {
    case 'next':
      if (currentIndex < totalItems - 1) {
        return currentIndex + 1;
      }
      return wrap ? 0 : currentIndex;

    case 'previous':
      if (currentIndex > 0) {
        return currentIndex - 1;
      }
      return wrap ? totalItems - 1 : currentIndex;

    case 'first':
      return 0;

    case 'last':
      return totalItems - 1;

    default:
      return currentIndex;
  }
};

/**
 * Focus management utility
 */
export const FocusManager = {
  /**
   * Set focus to element with proper keyboard focus styling
   * @param {HTMLElement} element - Element to focus
   * @param {boolean} addKeyboardClass - Whether to add keyboard focus class
   */
  setFocus: (element, addKeyboardClass = true) => {
    if (!element) return;
    
    element.focus();
    if (addKeyboardClass) {
      element.classList.add('keyboard-focus');
    }
  },

  /**
   * Remove keyboard focus styling from element
   * @param {HTMLElement} element - Element to remove styling from
   */
  removeFocus: (element) => {
    if (!element) return;
    element.classList.remove('keyboard-focus');
  },

  /**
   * Focus element by selector within container
   * @param {HTMLElement} container - Container to search within
   * @param {string} selector - CSS selector for element to focus
   * @param {number} index - Index of element if multiple matches
   */
  focusBySelector: (container, selector, index = 0) => {
    if (!container) return;
    
    const elements = container.querySelectorAll(selector);
    if (elements[index]) {
      FocusManager.setFocus(elements[index]);
    }
  },

  /**
   * Get all focusable elements within container
   * @param {HTMLElement} container - Container to search within
   * @returns {NodeList} List of focusable elements
   */
  getFocusableElements: (container) => {
    if (!container) return [];
    
    return container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [role="button"], [role="menuitem"]'
    );
  }
};

/**
 * ARIA utilities for accessibility
 */
export const AriaUtils = {
  /**
   * Set ARIA attributes for navigation elements
   * @param {HTMLElement} element - Element to set attributes on
   * @param {Object} attributes - ARIA attributes to set
   */
  setAttributes: (element, attributes) => {
    if (!element) return;
    
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  },

  /**
   * Announce text to screen readers
   * @param {string} text - Text to announce
   * @param {string} priority - Priority level ('polite' or 'assertive')
   */
  announce: (text, priority = 'polite') => {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
    
    document.body.appendChild(announcer);
    announcer.textContent = text;
    
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  }
};

/**
 * Keyboard event handler utility
 * @param {KeyboardEvent} event - Keyboard event
 * @param {Object} handlers - Object mapping keys to handler functions
 * @param {boolean} preventDefault - Whether to prevent default behavior
 */
export const handleKeyboardEvent = (event, handlers, preventDefault = true) => {
  // Don't handle if typing in input fields
  if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
    return;
  }

  const handler = handlers[event.key];
  if (handler) {
    if (preventDefault) {
      event.preventDefault();
    }
    handler(event);
  }
};

/**
 * Custom React hook for keyboard navigation in components
 * @param {Object} config - Configuration object
 * @returns {Object} Navigation state and handlers
 */
export const useKeyboardNavigation = (config) => {
  const {
    items = [],
    columns = 1,
    onSelect,
    onBack,
    onEscape,
    initialIndex = 0,
    wrap = false
  } = config;

  const [focusedIndex, setFocusedIndex] = React.useState(initialIndex);

  const handleKeyDown = React.useCallback((event) => {
    const handlers = {
      [KEYS.ARROW_UP]: () => {
        if (columns > 1) {
          setFocusedIndex(prev => navigateGrid(prev, items.length, columns, 'up'));
        } else {
          setFocusedIndex(prev => navigateLinear(prev, items.length, 'previous', wrap));
        }
      },
      [KEYS.ARROW_DOWN]: () => {
        if (columns > 1) {
          setFocusedIndex(prev => navigateGrid(prev, items.length, columns, 'down'));
        } else {
          setFocusedIndex(prev => navigateLinear(prev, items.length, 'next', wrap));
        }
      },
      [KEYS.ARROW_LEFT]: () => {
        if (columns > 1) {
          setFocusedIndex(prev => navigateGrid(prev, items.length, columns, 'left'));
        } else {
          setFocusedIndex(prev => navigateLinear(prev, items.length, 'previous', wrap));
        }
      },
      [KEYS.ARROW_RIGHT]: () => {
        if (columns > 1) {
          setFocusedIndex(prev => navigateGrid(prev, items.length, columns, 'right'));
        } else {
          setFocusedIndex(prev => navigateLinear(prev, items.length, 'next', wrap));
        }
      },
      [KEYS.ENTER]: () => onSelect && onSelect(items[focusedIndex], focusedIndex),
      [KEYS.SPACE]: () => onSelect && onSelect(items[focusedIndex], focusedIndex),
      [KEYS.ESCAPE]: () => onEscape && onEscape(),
      [KEYS.HOME]: () => setFocusedIndex(0),
      [KEYS.END]: () => setFocusedIndex(items.length - 1)
    };

    // Handle back button shortcut
    if (SHORTCUTS.BACK.includes(event.key) && onBack) {
      event.preventDefault();
      onBack();
      return;
    }

    handleKeyboardEvent(event, handlers);
  }, [items, columns, focusedIndex, onSelect, onBack, onEscape, wrap]);

  return {
    focusedIndex,
    setFocusedIndex,
    handleKeyDown
  };
};
