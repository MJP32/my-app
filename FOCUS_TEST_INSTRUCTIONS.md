# 🧪 Focus Management Test Instructions

## Quick Test Steps

### **Test 1: Opening Components (Focus moves to first interactive element)**

1. **Open the application** at http://localhost:5175/
2. **Use Tab key** to navigate to any menu item (e.g., "VaR/CVaR" or "Java 8")
3. **Press Enter** or click the button
4. **✅ EXPECTED**: Focus should automatically move to the Back button (first interactive element) in the opened component
5. **✅ EXPECTED**: You should see a blue focus outline around the Back button

### **Test 2: Returning to Main Menu (Focus returns to triggering element)**

1. **From any opened component**, press **Escape** or click the **Back** button
2. **✅ EXPECTED**: Focus should return to the exact menu item that opened the component
3. **✅ EXPECTED**: You should see the blue focus outline on the original menu button

### **Test 3: Help Dialog Focus Management**

1. **From anywhere in the app**, press **H** or **?** key
2. **✅ EXPECTED**: Help dialog opens with focus on the Close button
3. **Press Escape** or click Close
4. **✅ EXPECTED**: Focus returns to where you were before opening the dialog

### **Test 4: Keyboard Navigation Within Components**

1. **Navigate to VaR/CVaR component**
2. **✅ EXPECTED**: Focus should be on the Back button
3. **Press Tab** to move through expand/collapse buttons
4. **Press Enter** on any expand button
5. **✅ EXPECTED**: Section expands, focus stays on the button (no page disappearing)

## 🔍 What to Look For

### **✅ Success Indicators**
- Blue focus outline is always visible on the focused element
- Focus never gets "lost" (always on some element)
- When opening components, focus immediately moves to Back button
- When going back, focus returns to the original menu button
- Help dialog properly traps and restores focus
- All interactions work without using a mouse

### **❌ Failure Indicators**
- No visible focus outline
- Focus disappears or gets lost
- Focus doesn't move when opening components
- Focus doesn't return to original element when going back
- Page "disappears" when clicking buttons (this was the original bug)

## 🐛 If Something Doesn't Work

1. **Check Browser Console** (F12 → Console tab)
   - Look for any JavaScript errors
   - Focus management errors will be logged

2. **Try Different Browsers**
   - Test in Chrome, Firefox, Edge
   - Focus behavior should be consistent

3. **Test with Screen Reader** (Optional)
   - Use NVDA (free) or built-in Windows Narrator
   - Should announce focus changes and component loading

## 📋 Expected Behavior Summary

| Action | Expected Focus Behavior |
|--------|------------------------|
| Open VaR/CVaR | Focus → VaR/CVaR Back button |
| Open Java 8 | Focus → Java 8 Back button |
| Press Escape in component | Focus → Original menu button |
| Press H for help | Focus → Help dialog Close button |
| Close help dialog | Focus → Element that opened dialog |
| Tab through menu | Focus moves through menu items |
| Arrow keys in components | Focus moves through sections |

## 🎯 Technical Implementation

The focus management system uses:
- **Focus History Stack**: Remembers where focus came from
- **Auto-focus**: Components automatically focus first interactive element
- **Focus Restoration**: Returns focus to triggering element when going back
- **Screen Reader Support**: Announces focus changes
- **Error Handling**: Graceful fallbacks if focus restoration fails

This implementation meets WCAG 2.1 Level AA accessibility requirements for focus management.
