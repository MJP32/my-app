# Keyboard Navigation Testing Guide

## Overview
This guide provides comprehensive testing procedures to verify that the application is fully navigable using only the keyboard, meeting WCAG 2.1 AA accessibility standards.

## Pre-Testing Setup

### Browser Configuration
1. **Disable Mouse**: Unplug mouse or use browser extensions to disable mouse input
2. **Enable Screen Reader**: Test with NVDA (Windows), JAWS (Windows), or VoiceOver (Mac)
3. **High Contrast Mode**: Test with system high contrast mode enabled
4. **Zoom Testing**: Test at 200% and 400% zoom levels

### Testing Environment
- **Browsers**: Chrome, Firefox, Safari, Edge
- **Screen Readers**: NVDA, JAWS, VoiceOver
- **Operating Systems**: Windows, macOS, Linux

## Core Navigation Tests

### 1. Tab Order and Focus Management

#### Test 1.1: Basic Tab Navigation
**Steps:**
1. Load the application
2. Press Tab repeatedly
3. Verify focus moves through all interactive elements in logical order

**Expected Results:**
- [ ] Focus moves to skip link first
- [ ] Focus moves through category buttons left-to-right, top-to-bottom
- [ ] Focus moves through expanded items in logical order
- [ ] Focus indicators are clearly visible
- [ ] No elements are skipped or unreachable

#### Test 1.2: Reverse Tab Navigation
**Steps:**
1. Navigate to the last focusable element
2. Press Shift+Tab repeatedly
3. Verify focus moves backward through all elements

**Expected Results:**
- [ ] Focus moves in reverse order correctly
- [ ] All elements are reachable in reverse
- [ ] Focus indicators remain visible

### 2. Arrow Key Navigation

#### Test 2.1: Category Grid Navigation
**Steps:**
1. Focus on first category button
2. Use arrow keys to navigate the grid
3. Test all four directions

**Expected Results:**
- [ ] Right arrow moves to next category
- [ ] Left arrow moves to previous category
- [ ] Down arrow moves down one row (3 positions)
- [ ] Up arrow moves up one row (3 positions)
- [ ] Navigation wraps appropriately at boundaries
- [ ] Screen reader announces current position

#### Test 2.2: Item List Navigation
**Steps:**
1. Expand a category
2. Use arrow keys to navigate items
3. Test vertical navigation

**Expected Results:**
- [ ] Down arrow moves to next item
- [ ] Up arrow moves to previous item
- [ ] Navigation wraps at boundaries
- [ ] Screen reader announces item names

### 3. Activation and Selection

#### Test 3.1: Enter Key Activation
**Steps:**
1. Focus on various interactive elements
2. Press Enter to activate
3. Verify correct actions occur

**Expected Results:**
- [ ] Enter expands/collapses categories
- [ ] Enter selects items
- [ ] Enter activates buttons
- [ ] Enter opens components

#### Test 3.2: Space Key Activation
**Steps:**
1. Focus on various interactive elements
2. Press Space to activate
3. Verify same behavior as Enter

**Expected Results:**
- [ ] Space works identically to Enter
- [ ] No page scrolling occurs when Space is pressed on buttons

### 4. Escape Key Behavior

#### Test 4.1: Navigation Hierarchy
**Steps:**
1. Navigate deep into the application
2. Press Escape at each level
3. Verify proper back navigation

**Expected Results:**
- [ ] Escape closes expanded categories
- [ ] Escape returns from item view to category view
- [ ] Escape returns from component to main menu
- [ ] Focus returns to appropriate element

### 5. Keyboard Shortcuts

#### Test 5.1: Global Shortcuts
**Steps:**
1. Test each global shortcut from different contexts
2. Verify shortcuts work consistently

**Shortcuts to Test:**
- [ ] **H** or **?** - Opens keyboard shortcuts dialog
- [ ] **B** - Focuses back button (when available)
- [ ] **M** - Returns to main menu
- [ ] **Escape** - Goes back one level

#### Test 5.2: Help Dialog
**Steps:**
1. Press H or ? to open help dialog
2. Navigate within dialog using Tab
3. Close dialog with Escape

**Expected Results:**
- [ ] Dialog opens and receives focus
- [ ] Tab navigation works within dialog
- [ ] Focus is trapped within dialog
- [ ] Escape closes dialog and returns focus

### 6. Screen Reader Compatibility

#### Test 6.1: Semantic Structure
**Steps:**
1. Navigate with screen reader
2. Use heading navigation (H key)
3. Use landmark navigation

**Expected Results:**
- [ ] Proper heading hierarchy announced
- [ ] Navigation landmarks identified
- [ ] Button roles announced correctly
- [ ] Expanded/collapsed states announced

#### Test 6.2: Dynamic Content
**Steps:**
1. Expand categories and select items
2. Listen for announcements
3. Verify state changes are communicated

**Expected Results:**
- [ ] Category expansion announced
- [ ] Item selection announced
- [ ] Navigation changes announced
- [ ] Error states announced (if any)

### 7. Focus Indicators

#### Test 7.1: Visual Focus
**Steps:**
1. Navigate through all elements
2. Verify focus indicators are visible
3. Test in high contrast mode

**Expected Results:**
- [ ] Focus indicators have sufficient contrast (3:1 minimum)
- [ ] Focus indicators are clearly visible
- [ ] Focus indicators work in high contrast mode
- [ ] Focus indicators don't obscure content

#### Test 7.2: Focus Persistence
**Steps:**
1. Navigate to an element
2. Trigger actions that change content
3. Verify focus behavior

**Expected Results:**
- [ ] Focus returns to logical element after actions
- [ ] Focus doesn't get lost during content changes
- [ ] Focus moves to first element in new views

### 8. Component-Specific Tests

#### Test 8.1: TechnicalDetails Component
**Steps:**
1. Navigate to VaR/CVaR component
2. Test keyboard navigation within component
3. Test section expansion/collapse

**Expected Results:**
- [ ] Arrow keys navigate between sections
- [ ] Enter/Space expand/collapse sections
- [ ] Back button accessible via B key
- [ ] Escape returns to main menu

#### Test 8.2: Java Components
**Steps:**
1. Navigate to any Java component
2. Test category and concept navigation
3. Test code section interaction

**Expected Results:**
- [ ] Grid navigation works for categories
- [ ] Grid navigation works for concepts
- [ ] Code sections are accessible
- [ ] Navigation hierarchy is maintained

### 9. Error Handling

#### Test 9.1: Keyboard Traps
**Steps:**
1. Navigate through entire application
2. Verify no keyboard traps exist
3. Test escape routes from all contexts

**Expected Results:**
- [ ] No elements trap keyboard focus
- [ ] Always possible to navigate away
- [ ] Escape key provides exit route

#### Test 9.2: Error Recovery
**Steps:**
1. Test navigation during loading states
2. Test navigation with network errors
3. Verify graceful degradation

**Expected Results:**
- [ ] Navigation remains functional during loading
- [ ] Error states are keyboard accessible
- [ ] Recovery actions are keyboard accessible

## Performance Tests

### Test 10.1: Navigation Speed
**Steps:**
1. Time navigation between major sections
2. Test with large datasets
3. Verify responsive navigation

**Expected Results:**
- [ ] Navigation responds within 100ms
- [ ] No lag during arrow key navigation
- [ ] Smooth transitions between states

## Accessibility Standards Compliance

### WCAG 2.1 Level AA Checklist
- [ ] **2.1.1 Keyboard** - All functionality available via keyboard
- [ ] **2.1.2 No Keyboard Trap** - Focus can always move away
- [ ] **2.1.4 Character Key Shortcuts** - Can be turned off or remapped
- [ ] **2.4.3 Focus Order** - Logical and predictable
- [ ] **2.4.7 Focus Visible** - Clear focus indicators
- [ ] **4.1.2 Name, Role, Value** - Proper ARIA implementation

### Additional Accessibility Features
- [ ] Skip links provided
- [ ] Heading structure is logical
- [ ] Landmarks are properly defined
- [ ] Color is not the only means of conveying information
- [ ] Text has sufficient contrast

## Test Reporting

### Pass Criteria
- All core navigation tests pass
- No keyboard traps exist
- Screen reader compatibility verified
- WCAG 2.1 AA compliance achieved

### Failure Documentation
For each failed test, document:
1. **Test ID**: Reference to specific test
2. **Browser/OS**: Testing environment
3. **Steps to Reproduce**: Exact steps that cause failure
4. **Expected vs Actual**: What should happen vs what happens
5. **Severity**: Critical, High, Medium, Low
6. **Screenshots**: Visual evidence of issues

### Test Sign-off
- [ ] **Developer Testing**: All tests pass in development
- [ ] **QA Testing**: Independent verification complete
- [ ] **Accessibility Expert Review**: Specialist approval
- [ ] **User Testing**: Real users with disabilities test successfully

## Continuous Testing

### Automated Tests
- Implement automated keyboard navigation tests
- Set up CI/CD pipeline checks
- Regular accessibility audits

### Manual Testing Schedule
- **Weekly**: Core navigation smoke tests
- **Monthly**: Full regression testing
- **Release**: Complete accessibility audit

This comprehensive testing ensures the application meets the highest standards for keyboard accessibility and provides an excellent experience for all users.
