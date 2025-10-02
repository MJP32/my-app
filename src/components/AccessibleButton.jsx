import React, { forwardRef } from 'react';

/**
 * Accessible Button Component
 * Provides consistent keyboard navigation, focus indicators, and ARIA support
 */
const AccessibleButton = forwardRef(({
  children,
  onClick,
  onKeyDown,
  disabled = false,
  variant = 'primary',
  size = 'medium',
  isExpanded,
  hasPopup = false,
  ariaLabel,
  ariaDescribedBy,
  className = '',
  style = {},
  focusedIndex,
  currentIndex,
  colorTheme,
  ...props
}, ref) => {
  const isFocused = focusedIndex === currentIndex;

  const baseStyles = {
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
    fontSize: size === 'small' ? '0.875rem' : size === 'large' ? '1.125rem' : '1rem',
    fontWeight: '500',
    borderRadius: '8px',
    padding: size === 'small' ? '0.5rem 1rem' : size === 'large' ? '1rem 1.5rem' : '0.75rem 1.25rem',
    opacity: disabled ? 0.6 : 1,
    position: 'relative',
    ...style
  };

  const variantStyles = {
    primary: {
      backgroundColor: colorTheme?.primary || '#3b82f6',
      color: 'white',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    secondary: {
      backgroundColor: colorTheme?.secondary || '#f3f4f6',
      color: colorTheme?.primary || '#374151',
      border: `1px solid ${colorTheme?.primary || '#d1d5db'}`
    },
    ghost: {
      backgroundColor: 'transparent',
      color: colorTheme?.primary || '#374151',
      border: '1px solid transparent'
    },
    card: {
      backgroundColor: 'white',
      color: '#374151',
      border: `2px solid ${colorTheme?.primary || '#e5e7eb'}30`,
      boxShadow: `0 4px 6px -1px ${colorTheme?.primary || '#000000'}20`,
      padding: '1.5rem',
      width: '100%',
      textAlign: 'left',
      justifyContent: 'space-between'
    }
  };

  const focusStyles = isFocused ? {
    outline: `3px solid ${colorTheme?.primary || '#3b82f6'}`,
    outlineOffset: '2px',
    boxShadow: `0 0 0 2px rgba(59, 130, 246, 0.3), ${variantStyles[variant]?.boxShadow || ''}`,
    transform: 'scale(1.02)',
    zIndex: 10
  } : {};

  const hoverStyles = !disabled && !isFocused ? {
    transform: 'translateY(-1px)',
    boxShadow: `0 4px 8px rgba(0, 0, 0, 0.15), ${variantStyles[variant]?.boxShadow || ''}`
  } : {};

  const handleKeyDown = (e) => {
    if (disabled) return;

    // Handle Enter and Space as click
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(e);
    }

    // Pass through other key events
    onKeyDown?.(e);
  };

  const handleClick = (e) => {
    if (disabled) return;
    onClick?.(e);
  };

  return (
    <button
      ref={ref}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-expanded={isExpanded !== undefined ? isExpanded : undefined}
      aria-haspopup={hasPopup}
      className={`accessible-button ${className}`}
      style={{
        ...baseStyles,
        ...variantStyles[variant],
        ...focusStyles,
        ...hoverStyles
      }}
      {...props}
    >
      {children}
    </button>
  );
});

AccessibleButton.displayName = 'AccessibleButton';

export default AccessibleButton;
