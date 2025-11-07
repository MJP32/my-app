# Project Structure

## Root Directory Organization

### Configuration Files
- `package.json` - Node.js dependencies and scripts
- `vite.config.js` - Vite build configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `eslint.config.js` - ESLint configuration
- `.env` - Environment variables
- `.env.example` - Example environment variables template
- `.gitignore` - Git ignore rules
- `requirements.txt` - Python dependencies

### Application Files
- `index.html` - Main HTML entry point
- `system_design_topics.json` - System design topics data

### Source Code (`src/`)
- `App.jsx` - Main application component
- `main.jsx` - Application entry point
- `App.css` - Application styles
- `index.css` - Global styles
- `idea-syntax-darcula.css` - Syntax highlighting theme

#### Subdirectories
- **`components/`** - Reusable React components (15 items)
  - Modals, navigation, UI components, SEO, analytics
- **`pages/`** - Page components (201 items)
  - `algorithms/` - Algorithm problem pages
  - `cloud/` - Cloud platform pages (AWS, GCP, Azure)
  - `databases/` - Database-related pages
  - `design/` - System design pages
  - `devops/` - DevOps tool pages
  - `frameworks/` - Framework pages
  - `java/` - Java topic pages
  - `messaging/` - Messaging system pages
  - `practice/` - Practice problem pages
  - `projects/` - Project showcase pages
  - `python/` - Python topic pages
  - `questions/` - Interview question pages
  - `security/` - Security topic pages
  - `spring/` - Spring framework pages
  - Root-level pages: `Frameworks.jsx`, `Java.jsx`, `Practice.jsx`, `Python.jsx`, `Questions.jsx`, `SecurityPage.jsx`
- **`config/`** - Configuration files
- **`hooks/`** - Custom React hooks
- **`services/`** - API and service layer
- **`utils/`** - Utility functions

### Development Tools (`tools/`)
Organized development scripts and utilities:

- **`builders/`** - Build and generation scripts (3 items)
- **`converters/`** - Content conversion scripts (4 items)
- **`fixers/`** - Fix and update scripts (14 items)
- **`shell/`** - Shell scripts and automation (4 items)
- **`utilities/`** - Analysis and verification tools (6 items)

See `tools/README.md` for detailed documentation.

### Templates (`templates/`)
Python problem templates and reference implementations (3 items):
- Design problems
- LRU Cache
- Rate Limiter

See `templates/README.md` for details.

### Tests (`tests/`)
Test files for various features (4 items):
- Firebase integration tests
- Syntax highlighting tests
- HTML tests

See `tests/README.md` for details.

### Build Output
- **`dist/`** - Production build output
- **`public/`** - Static assets

### Other Directories
- **`node_modules/`** - NPM dependencies
- **`server/`** - Backend server code
- **`.git/`** - Git repository data
- **`.claude/`** - Claude AI workspace data

## Recent Reorganization

The following changes were made to improve project organization:

1. **Created `tools/` directory** with subdirectories for different script types
2. **Created `templates/` directory** for Python problem templates
3. **Created `tests/` directory** for test files
4. **Moved page components** from `src/` root to `src/pages/`
5. **Updated imports** in `App.jsx` to reflect new paths
6. **Removed 34 unused markdown files** from documentation

## Development

- **Framework**: React + Vite
- **Styling**: Tailwind CSS
- **State Management**: React hooks
- **Backend**: Node.js server (in `server/` directory)
- **Database**: Firebase (based on test files)
