# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based technical learning platform focused on Java, algorithms, system design, and related technologies. The application features interactive coding exercises, completion tracking via Firebase, and a comprehensive navigation system for browsing hundreds of technical topics.

## Build and Development Commands

### Development
```bash
npm run dev              # Start both Vite dev server and backend server concurrently
npm run dev:vite         # Start only Vite dev server (port 5173)
npm run dev:server       # Start only Node.js backend server (port 3001)
npm run server           # Alternative command to start backend server
```

### Production
```bash
npm run build            # Build for production (includes react-snap post-build for SSR)
npm run preview          # Preview production build
```

### Code Quality
```bash
npm run lint             # Run ESLint on all files
```

## Architecture

### Application Structure

**Core Navigation Flow:**
- `src/App.jsx` (9293 lines) is the central routing component that handles all navigation state
- Navigation hierarchy: Main menu → Category pages → Subcategory pages → Individual topic/problem pages
- Each page receives navigation props (`onBack`, `onNext`, `onPrevious`, etc.) for consistent navigation

**Key Architecture Patterns:**

1. **Centralized Routing in App.jsx:**
   - All 200+ page imports are in App.jsx
   - Uses conditional rendering based on `currentPage` state
   - Navigation handled via callback props passed down to child components

2. **Service Layer:**
   - `src/services/authService.js` - Firebase authentication (email/password, Google OAuth)
   - `src/services/progressService.js` - Progress tracking using localStorage with user-specific keys
   - `src/services/languageService.js` - Language preference (Java/Python) management

3. **Global State Management:**
   - Uses React hooks (useState, useEffect) for state
   - Custom events for cross-component communication:
     - `progressUpdate` - Notify components when problem completion status changes
     - `languageChange` - Notify when user switches between Java/Python

4. **Keyboard Navigation System:**
   - `src/utils/keyboardNavigation.js` - Centralized keyboard navigation utilities
   - `src/hooks/useKeyboardNavigation` - Custom hook for implementing keyboard shortcuts
   - Global shortcuts: `b` for back, `h` or `?` for help, `/` for search, `m` for main menu

### Page Component Pattern

Algorithm/problem pages follow this structure:
- Use `CompletionCheckbox` component for tracking progress
- Support dual-language code examples (Java/Python) via `LanguageToggle`
- Include `DrawingCanvas` for visual problem-solving
- Contain structured problem data: title, difficulty, LeetCode URL, description, explanation, pseudocode, code solutions
- Group problems by difficulty level (Easy/Medium/Hard) with collapsible sections

### Backend Server

**Location:** `server/server.js`
**Port:** 3001
**Purpose:** Execute Java and Python code submissions

Key features:
- Handles code execution in temporary files
- WSL-aware Java execution (detects WSL and uses Windows Java binaries)
- Path conversion for cross-platform compatibility
- Endpoints:
  - `/api/execute-java` - Compile and run Java code
  - `/api/execute-python` - Run Python code

### Firebase Integration

**Authentication:**
- Email/password authentication
- Google OAuth provider
- Persistent sessions via `browserLocalPersistence`

**Configuration:**
- All Firebase config is in `src/config/firebase.js`
- Uses environment variables (see `.env.example`)
- Required env vars: `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, etc.

**Progress Storage:**
- User completion data stored in localStorage with user-specific keys
- Format: `completed_problems_${uid}`
- Migration logic exists to move anonymous data to user accounts

### Component Organization

**Reusable Components (`src/components/`):**
- `CompletionCheckbox.jsx` - Problem completion tracking with Firebase auth integration
- `DrawingCanvas.jsx` - Canvas for drawing/visualizing problem solutions
- `GlobalSearch.jsx` - Search across all topics and problems
- `KeyboardShortcutsDialog.jsx` - Help dialog for keyboard shortcuts
- `LanguageToggle.jsx` - Switch between Java/Python code examples
- `AccountDropdown.jsx` - User account management
- `SignInModal.jsx` - Authentication modal
- SEO components: `SEOHead.jsx`, `GoogleAnalytics.jsx`, `SocialShare.jsx`

**Page Organization (`src/pages/`):**
- `algorithms/` - 28 algorithm topic pages (Arrays, Strings, DynamicProgramming, etc.)
- `java/` - Java language feature pages
- `spring/` - Spring framework pages
- `messaging/` - Message broker pages (Kafka, RabbitMQ, Solace, Flink)
- `databases/` - Database technology pages
- `cloud/` - Cloud platform pages (AWS, GCP, Azure)
- `devops/` - DevOps tool pages
- `security/` - Security topic pages (JWT, OAuth)
- `design/` - System design pages
- `questions/` - Interview question pages
- `projects/` - Project showcase pages
- `practice/` - Practice problem collections
- Root level: `Practice.jsx`, `Java.jsx`, `Python.jsx`, `Questions.jsx`, etc.

### Problem ID Format

Each problem has a unique ID following this pattern:
```
{category}-{subcategory}-{index}
```
Examples:
- `data-structures-arrays-1` (Product of Array Except Self)
- `algorithms-dynamic-programming-5` (Longest Palindromic Substring)

This ID is used for:
- Progress tracking in localStorage
- Drawing canvas storage
- Saved code storage

## Development Workflow

### Adding a New Algorithm/Problem Page

1. **Create page file:** `src/pages/algorithms/YourTopic.jsx`
2. **Import in App.jsx:** Add import statement with other algorithm imports
3. **Add to routing:** Add conditional render block in App.jsx's main render
4. **Update Practice.jsx:** Add entry to `problemCounts` object and subcategory mappings
5. **Use standard pattern:** Include CompletionCheckbox, LanguageToggle, and problem structure

### Adding Features to Existing Pages

When modifying algorithm pages:
- Maintain the existing problem data structure (id, title, difficulty, description, explanation, pseudocode, code)
- Preserve the dual-language support (Java/Python)
- Keep CompletionCheckbox integration
- Ensure problemId format matches pattern: `{category}-{subcategory}-{index}`

### Environment Setup

1. Copy `.env.example` to `.env`
2. Configure Firebase credentials from Firebase Console
3. (Optional) Add Google Analytics ID and social media links

## Important Notes

### WSL Development
- The server detects WSL and automatically uses Windows Java binaries
- Path conversion handled automatically for Java execution
- Development works seamlessly in WSL environment

### Large App.jsx File
- The 9293-line App.jsx is intentional - it's the central router
- Contains all page imports and routing logic
- When adding new pages, follow existing import and routing patterns
- Consider the file size when making large-scale changes

### Progress Tracking
- Anonymous users can track progress in localStorage
- Signed-in users get user-specific progress storage
- Migration logic moves anonymous progress to authenticated accounts

### Styling
- Uses Tailwind CSS for all styling
- Custom syntax highlighting theme: `idea-syntax-darcula.css`
- Responsive design with mobile support

### SEO & Performance
- react-snap used for pre-rendering (runs after build)
- Manual code splitting configured in vite.config.js
- Meta tags and social sharing support via SEO components
