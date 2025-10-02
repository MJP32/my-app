# Keyboard Navigation Guide

## Overview
The application is fully navigable using keyboard only. Every interactive element supports keyboard access with logical tab order, focus indicators, and keyboard shortcuts. The implementation follows WCAG 2.1 AA standards and provides comprehensive screen reader support.

## Global Shortcuts

### Main Navigation
- **Tab** / **Shift+Tab** - Move through interactive elements in order
- **Arrow Keys** - Navigate between menu items and cards (grid and linear navigation)
- **Enter** / **Space** - Activate focused element
- **Escape** - Go back to previous level or close dialogs
- **B** - Focus the Back button (when available)

### New Global Shortcuts
- **H** or **?** - Show keyboard shortcuts help dialog
- **M** - Return to main menu from any component
- **Home** - Jump to first item in current context
- **End** - Jump to last item in current context

## Navigation Hierarchy

### Level 1: Main Menu (App.jsx)
**Category Selection:**
- **Arrow Left/Right** - Navigate between category buttons horizontally
- **Arrow Up/Down** - Navigate between category buttons (also up/down)
- **Enter** / **Space** - Expand selected category to show items
- **Escape** - Close expanded category

**Item Selection (when category is expanded):**
- **Arrow Left/Right** - Navigate between items horizontally
- **Arrow Up/Down** - Navigate between items vertically
- **Arrow Up** (on first item) - Return to category buttons
- **Enter** / **Space** - Select and open item
- **Escape** - Collapse items and return to categories

### Level 2: Component View (Java 8/11/15/21/24, etc.)
**Category Cards:**
- **Arrow Keys** - Navigate grid of category cards (3 columns)
  - **Right/Left** - Move horizontally
  - **Up/Down** - Move vertically (by 3 positions)
- **Enter** / **Space** - Select category and view concepts
- **Escape** - Go back to main menu
- **B** - Focus the Back button

**Concept Cards (within selected category):**
- **Arrow Keys** - Navigate grid of concept cards (3 columns)
  - **Right/Left** - Move horizontally
  - **Up/Down** - Move vertically (by 3 positions)
- **Enter** / **Space** - View concept details
- **Escape** - Go back to categories
- **B** - Focus the Back button

**Concept Details:**
- **Escape** - Go back to concept list
- **Tab** - Navigate code section toggle buttons
- **Enter** / **Space** - Toggle code section expansion
- **B** - Focus the Back button

### Level 3: Project Components (VarCvar3, DarkPoolEngine3, etc.)
- **Tab** - Navigate through tabs and interactive elements
- **Arrow Keys** - Navigate between topics in sidebar
- **Enter** / **Space** - Select topic
- **Escape** - Close detail view or go back

## ARIA Labels & Screen Reader Support

### Semantic HTML
- `<nav>` for navigation sections
- `role="menubar"` for category selection
- `role="menuitem"` for menu items
- `role="button"` for interactive cards

### ARIA Attributes
- `aria-label` - Descriptive labels for all interactive elements
- `aria-expanded` - State of expandable elements
- `aria-haspopup` - Indicates popup/dropdown menus
- All elements have meaningful labels for screen readers

## Focus Indicators

### Visual Focus States
- **Thick border** - 4px solid border in component color when focused
- **Glow effect** - Box shadow ring around focused element
- **Scale transform** - Slight enlargement (1.02x) on focus
- **Color highlight** - Background color change on focus

### Focus Management
- Focus automatically moves to appropriate element when:
  - Entering a new view
  - Going back to previous view
  - Selecting categories/concepts
- Back button can be focused with **B** key from anywhere

## Tab Order

### Logical Flow
1. Back button (ref-based, accessible via B key)
2. Main heading/title
3. Category/concept cards (in grid order, left-to-right, top-to-bottom)
4. Code section toggles (when viewing concept details)
5. Sidebar navigation (when available)

### Tab Index Management
- Interactive elements: `tabIndex={0}` (in tab order)
- Non-interactive: No tabIndex (not focusable)
- Focus order follows visual layout

## Testing Checklist

### Basic Navigation
- [ ] Tab through all elements in logical order
- [ ] Shift+Tab goes backward correctly
- [ ] All interactive elements are reachable via keyboard
- [ ] No keyboard traps (can always escape)

### Arrow Key Navigation
- [ ] Arrow keys work on category grids
- [ ] Arrow keys work on concept grids
- [ ] Grid navigation wraps correctly at boundaries
- [ ] Arrow keys don't interfere with other controls

### Activation
- [ ] Enter activates focused buttons
- [ ] Space activates focused buttons
- [ ] Both work for all interactive elements

### Escape Behavior
- [ ] Escape closes concept details
- [ ] Escape returns from concepts to categories
- [ ] Escape returns from categories to main menu
- [ ] Escape never causes errors

### Focus Indicators
- [ ] All focused elements have visible indicators
- [ ] Focus indicators are clearly visible
- [ ] Indicators have sufficient contrast
- [ ] Hover and focus states are distinct

### Screen Reader Compatibility
- [ ] All elements have meaningful labels
- [ ] Navigation structure is announced correctly
- [ ] State changes are announced
- [ ] ARIA attributes work as expected

## Keyboard Shortcuts Summary

| Key | Action | Context |
|-----|--------|---------|
| **Tab** | Next element | Global |
| **Shift+Tab** | Previous element | Global |
| **Arrow Keys** | Navigate grids | Card grids |
| **Enter/Space** | Activate | All buttons |
| **Escape** | Go back/Close | All levels |
| **B** | Focus Back button | When available |

## Accessibility Standards Compliance

### WCAG 2.1 Level AA
- ✅ 2.1.1 Keyboard - All functionality available via keyboard
- ✅ 2.1.2 No Keyboard Trap - Focus can always move away
- ✅ 2.4.3 Focus Order - Logical and predictable
- ✅ 2.4.7 Focus Visible - Clear focus indicators
- ✅ 4.1.2 Name, Role, Value - Proper ARIA labels

### ARIA Implementation
- Semantic landmarks (`<nav>`, roles)
- Descriptive labels for all interactive elements
- State indication (expanded, selected)
- Keyboard navigation patterns follow ARIA best practices

## Browser Compatibility

Keyboard navigation tested and working in:
- Chrome/Edge (Chromium)
- Firefox
- Safari
- Screen readers: NVDA, JAWS, VoiceOver

## New Features

### Enhanced Focus Indicators
- **High Contrast Support**: Focus indicators work in high contrast mode
- **Consistent Styling**: 3px solid blue outline with 2px offset
- **Scale Animation**: Focused elements scale to 1.02x for better visibility
- **Color Theming**: Focus indicators adapt to component color themes

### Keyboard Shortcuts Dialog
- **Activation**: Press H or ? to open help dialog
- **Focus Trapping**: Tab navigation contained within dialog
- **Categorized Shortcuts**: Organized by Navigation, Quick Actions, and List Navigation
- **Visual Indicators**: Arrow key icons and keyboard key styling

### Screen Reader Enhancements
- **Live Announcements**: Navigation changes announced via aria-live regions
- **Contextual Information**: Item counts and positions announced
- **State Changes**: Expansion/collapse states communicated
- **Error Handling**: Graceful degradation with accessibility maintained

## Implementation Notes

### Core Architecture
1. **Keyboard Navigation Utilities** (`src/utils/keyboardNavigation.js`)
   - Centralized keyboard event handling
   - Grid and linear navigation algorithms
   - ARIA announcement utilities
   - Focus management helpers

2. **Custom Hook** (`src/hooks/useKeyboardNavigation.js`)
   - Reusable keyboard navigation logic
   - Configurable grid/linear navigation
   - Automatic focus management
   - Screen reader integration

3. **Accessible Button Component** (`src/components/AccessibleButton.jsx`)
   - Consistent keyboard interaction
   - ARIA attributes built-in
   - Focus indicator styling
   - Multiple variants and sizes

### Components with Full Keyboard Support
1. **App.jsx** - Enhanced main navigation menu
   - Category buttons with improved arrow key navigation
   - ARIA announcements for navigation changes
   - Skip link for keyboard users
   - Keyboard shortcuts help integration

2. **TechnicalDetails.jsx** - Enhanced project component
   - Arrow key navigation between sections
   - Improved focus management
   - Back button keyboard shortcut (B key)
   - Screen reader announcements

3. **Java8.jsx** - Modernized with new navigation system
   - Uses useKeyboardNavigation hook
   - Grid navigation for categories and concepts
   - Enhanced ARIA support
   - Consistent focus indicators

4. **KeyboardShortcutsDialog.jsx** - New help dialog
   - Complete keyboard shortcuts reference
   - Focus trapping within modal
   - Escape key to close
   - Accessible design with proper ARIA labels

### Enhanced Components
- **Java11.jsx, Java15.jsx, Java21.jsx, Java24.jsx**: Ready for upgrade to new system
- **VarCvar3, DarkPoolEngine3, etc.**: Basic keyboard support, can be enhanced with new utilities

## Future Enhancements

1. **Customizable Hotkeys** - Allow users to configure shortcuts
2. **Search with /key** - Quick search activation
3. **Number keys** - Jump to specific categories (1-9)
4. **H key** - Show keyboard shortcuts help dialog
5. **Home/End** - Jump to first/last item in lists

## Support

For issues or suggestions regarding keyboard navigation:
- Check browser console for any errors
- Verify focus indicators are visible
- Test with screen reader if available
- Report issues with specific key combinations that don't work
