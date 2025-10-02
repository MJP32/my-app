import React, { useEffect, useRef } from 'react';
import { X, Keyboard, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { FocusManager as FocusManagerUtil, focusHistory } from '../utils/focusManagement.js';

const KeyboardShortcutsDialog = ({ isOpen, onClose, triggerElement = null }) => {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const cleanupFocusTrapRef = useRef(null);

  // Focus management and focus trapping
  useEffect(() => {
    if (isOpen) {
      // Save the triggering element for focus restoration
      if (triggerElement) {
        focusHistory.push(triggerElement, 'keyboard shortcuts dialog');
      }

      // Set up focus trap
      if (dialogRef.current) {
        cleanupFocusTrapRef.current = FocusManagerUtil.createFocusTrap(dialogRef.current);
      }

      // Focus the close button
      if (closeButtonRef.current) {
        closeButtonRef.current.focus();
      }

      // Announce dialog opening
      FocusManagerUtil.announce('Keyboard shortcuts dialog opened', 'assertive');
    }

    return () => {
      // Cleanup focus trap
      if (cleanupFocusTrapRef.current) {
        cleanupFocusTrapRef.current();
        cleanupFocusTrapRef.current = null;
      }
    };
  }, [isOpen, triggerElement]);

  // Handle dialog close with focus restoration
  const handleClose = () => {
    // Restore focus to the triggering element
    const restored = focusHistory.pop('keyboard shortcuts dialog close');
    if (!restored && triggerElement) {
      // Fallback: restore to saved trigger element
      try {
        triggerElement.focus();
        triggerElement.classList.add('keyboard-focus');
      } catch (error) {
        console.warn('Failed to restore focus to trigger element:', error);
      }
    }

    // Announce dialog closing
    FocusManagerUtil.announce('Keyboard shortcuts dialog closed', 'polite');

    // Call the original onClose
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Trap focus within dialog
      const focusableElements = dialogRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements?.length > 0) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        const handleTabKey = (e) => {
          if (e.key === 'Tab') {
            if (e.shiftKey) {
              if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
              }
            } else {
              if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
              }
            }
          }
        };

        document.addEventListener('keydown', handleTabKey);
        return () => {
          document.removeEventListener('keydown', handleTabKey);
        };
      }
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const shortcuts = [
    {
      category: 'Navigation',
      items: [
        { keys: ['Tab'], description: 'Move to next element' },
        { keys: ['Shift', 'Tab'], description: 'Move to previous element' },
        { keys: ['↑', '↓', '←', '→'], description: 'Navigate grids and menus' },
        { keys: ['Enter', 'Space'], description: 'Activate focused element' },
        { keys: ['Escape'], description: 'Go back or close dialogs' }
      ]
    },
    {
      category: 'Quick Actions',
      items: [
        { keys: ['B'], description: 'Focus Back button' },
        { keys: ['H', '?'], description: 'Show this help dialog' },
        { keys: ['M'], description: 'Return to main menu' },
        { keys: ['/'], description: 'Quick search (future)' }
      ]
    },
    {
      category: 'List Navigation',
      items: [
        { keys: ['Home'], description: 'Go to first item' },
        { keys: ['End'], description: 'Go to last item' },
        { keys: ['Page Up'], description: 'Scroll up (future)' },
        { keys: ['Page Down'], description: 'Scroll down (future)' }
      ]
    }
  ];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '2rem'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-title"
      aria-describedby="shortcuts-description"
    >
      <div
        ref={dialogRef}
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '80vh',
          overflow: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(0, 0, 0, 0.1)'
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Keyboard className="w-6 h-6" style={{ color: '#3b82f6' }} />
            <h2
              id="shortcuts-title"
              style={{
                margin: 0,
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#1f2937'
              }}
            >
              Keyboard Shortcuts
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            onClick={handleClose}
            style={{
              padding: '0.5rem',
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              color: '#6b7280',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Close keyboard shortcuts dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p
          id="shortcuts-description"
          style={{
            margin: '0 0 2rem 0',
            color: '#6b7280',
            lineHeight: '1.6'
          }}
        >
          Use these keyboard shortcuts to navigate the application efficiently. All functionality is available via keyboard.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {shortcuts.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h3 style={{
                margin: '0 0 1rem 0',
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#374151',
                borderBottom: '2px solid #e5e7eb',
                paddingBottom: '0.5rem'
              }}>
                {category.category}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {category.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem',
                      backgroundColor: '#f9fafb',
                      borderRadius: '6px',
                      border: '1px solid #e5e7eb'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      flex: 1
                    }}>
                      {item.keys.map((key, keyIndex) => (
                        <React.Fragment key={keyIndex}>
                          {keyIndex > 0 && (
                            <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>+</span>
                          )}
                          <kbd style={{
                            padding: '0.25rem 0.5rem',
                            backgroundColor: 'white',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            color: '#374151',
                            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                          }}>
                            {key === '↑' ? <ArrowUp className="w-3 h-3" /> :
                             key === '↓' ? <ArrowDown className="w-3 h-3" /> :
                             key === '←' ? <ArrowLeft className="w-3 h-3" /> :
                             key === '→' ? <ArrowRight className="w-3 h-3" /> :
                             key}
                          </kbd>
                        </React.Fragment>
                      ))}
                    </div>
                    <span style={{
                      color: '#6b7280',
                      fontSize: '0.875rem',
                      marginLeft: '1rem'
                    }}>
                      {item.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#eff6ff',
          borderRadius: '8px',
          border: '1px solid #bfdbfe'
        }}>
          <p style={{
            margin: 0,
            fontSize: '0.875rem',
            color: '#1e40af',
            lineHeight: '1.5'
          }}>
            <strong>Tip:</strong> Press <kbd style={{
              padding: '0.125rem 0.25rem',
              backgroundColor: 'white',
              border: '1px solid #93c5fd',
              borderRadius: '3px',
              fontSize: '0.75rem'
            }}>H</kbd> or <kbd style={{
              padding: '0.125rem 0.25rem',
              backgroundColor: 'white',
              border: '1px solid #93c5fd',
              borderRadius: '3px',
              fontSize: '0.75rem'
            }}>?</kbd> at any time to show this help dialog.
          </p>
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcutsDialog;
