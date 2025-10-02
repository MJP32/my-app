import { useState, useEffect, useCallback, useRef } from 'react';
import { KEYS, SHORTCUTS, navigateGrid, navigateLinear, AriaUtils } from '../utils/keyboardNavigation.js';

/**
 * Custom hook for keyboard navigation
 * Provides consistent keyboard navigation patterns across components
 */
export const useKeyboardNavigation = ({
  items = [],
  columns = 1,
  onSelect,
  onBack,
  onEscape,
  initialIndex = 0,
  wrap = false,
  announceNavigation = true,
  backButtonRef = null,
  itemRefs = null
}) => {
  const [focusedIndex, setFocusedIndex] = useState(initialIndex);
  const [isKeyboardUser, setIsKeyboardUser] = useState(false);

  // Detect keyboard usage
  useEffect(() => {
    const handleKeyDown = () => setIsKeyboardUser(true);
    const handleMouseDown = () => setIsKeyboardUser(false);

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  // Focus management
  const focusItem = useCallback((index) => {
    if (itemRefs?.current?.[index]) {
      itemRefs.current[index].focus();
    }
  }, [itemRefs]);

  // Navigation handlers
  const navigateUp = useCallback(() => {
    if (columns > 1) {
      const newIndex = navigateGrid(focusedIndex, items.length, columns, 'up');
      setFocusedIndex(newIndex);
      if (announceNavigation && newIndex !== focusedIndex) {
        AriaUtils.announce(`Item ${newIndex + 1} of ${items.length}`);
      }
    } else {
      const newIndex = navigateLinear(focusedIndex, items.length, 'previous', wrap);
      setFocusedIndex(newIndex);
      if (announceNavigation && newIndex !== focusedIndex) {
        AriaUtils.announce(`Item ${newIndex + 1} of ${items.length}`);
      }
    }
  }, [focusedIndex, items.length, columns, wrap, announceNavigation]);

  const navigateDown = useCallback(() => {
    if (columns > 1) {
      const newIndex = navigateGrid(focusedIndex, items.length, columns, 'down');
      setFocusedIndex(newIndex);
      if (announceNavigation && newIndex !== focusedIndex) {
        AriaUtils.announce(`Item ${newIndex + 1} of ${items.length}`);
      }
    } else {
      const newIndex = navigateLinear(focusedIndex, items.length, 'next', wrap);
      setFocusedIndex(newIndex);
      if (announceNavigation && newIndex !== focusedIndex) {
        AriaUtils.announce(`Item ${newIndex + 1} of ${items.length}`);
      }
    }
  }, [focusedIndex, items.length, columns, wrap, announceNavigation]);

  const navigateLeft = useCallback(() => {
    if (columns > 1) {
      const newIndex = navigateGrid(focusedIndex, items.length, columns, 'left');
      setFocusedIndex(newIndex);
      if (announceNavigation && newIndex !== focusedIndex) {
        AriaUtils.announce(`Item ${newIndex + 1} of ${items.length}`);
      }
    } else {
      navigateUp();
    }
  }, [focusedIndex, items.length, columns, navigateUp, announceNavigation]);

  const navigateRight = useCallback(() => {
    if (columns > 1) {
      const newIndex = navigateGrid(focusedIndex, items.length, columns, 'right');
      setFocusedIndex(newIndex);
      if (announceNavigation && newIndex !== focusedIndex) {
        AriaUtils.announce(`Item ${newIndex + 1} of ${items.length}`);
      }
    } else {
      navigateDown();
    }
  }, [focusedIndex, items.length, columns, navigateDown, announceNavigation]);

  const selectCurrent = useCallback(() => {
    if (onSelect && items[focusedIndex]) {
      onSelect(items[focusedIndex], focusedIndex);
    }
  }, [onSelect, items, focusedIndex]);

  const goToFirst = useCallback(() => {
    setFocusedIndex(0);
    if (announceNavigation) {
      AriaUtils.announce('First item');
    }
  }, [announceNavigation]);

  const goToLast = useCallback(() => {
    setFocusedIndex(items.length - 1);
    if (announceNavigation) {
      AriaUtils.announce('Last item');
    }
  }, [items.length, announceNavigation]);

  // Main keyboard event handler
  const handleKeyDown = useCallback((e) => {
    // Don't handle if typing in input fields
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      return;
    }

    // Global shortcuts
    if (SHORTCUTS.BACK.includes(e.key) && backButtonRef?.current) {
      e.preventDefault();
      backButtonRef.current.focus();
      return;
    }

    if (SHORTCUTS.MAIN_MENU.includes(e.key) && onBack) {
      e.preventDefault();
      onBack();
      return;
    }

    // Navigation keys
    switch (e.key) {
      case KEYS.ARROW_UP:
        e.preventDefault();
        navigateUp();
        break;

      case KEYS.ARROW_DOWN:
        e.preventDefault();
        navigateDown();
        break;

      case KEYS.ARROW_LEFT:
        e.preventDefault();
        navigateLeft();
        break;

      case KEYS.ARROW_RIGHT:
        e.preventDefault();
        navigateRight();
        break;

      case KEYS.ENTER:
      case KEYS.SPACE:
        e.preventDefault();
        selectCurrent();
        break;

      case KEYS.ESCAPE:
        e.preventDefault();
        if (onEscape) {
          onEscape();
        } else if (onBack) {
          onBack();
        }
        break;

      case KEYS.HOME:
        e.preventDefault();
        goToFirst();
        break;

      case KEYS.END:
        e.preventDefault();
        goToLast();
        break;

      default:
        // Let other keys pass through
        break;
    }
  }, [
    navigateUp, navigateDown, navigateLeft, navigateRight,
    selectCurrent, goToFirst, goToLast,
    onBack, onEscape, backButtonRef
  ]);

  // Set up keyboard event listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Focus current item when index changes
  useEffect(() => {
    if (isKeyboardUser) {
      focusItem(focusedIndex);
    }
  }, [focusedIndex, isKeyboardUser, focusItem]);

  return {
    focusedIndex,
    setFocusedIndex,
    isKeyboardUser,
    setIsKeyboardUser,
    handleKeyDown,
    navigateUp,
    navigateDown,
    navigateLeft,
    navigateRight,
    selectCurrent,
    goToFirst,
    goToLast
  };
};

export default useKeyboardNavigation;
