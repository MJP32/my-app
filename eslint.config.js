import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['warn', {
        varsIgnorePattern: '^[A-Z_]|^(show|set[A-Z]).*',
        argsIgnorePattern: '^_|^(item|index|key|event|e|err|error)$',
        ignoreRestSiblings: true,
        destructuredArrayIgnorePattern: '^_',
        caughtErrors: 'none',
      }],
      'no-dupe-keys': 'warn',
    },
  },
  // Node.js files (server, tools, config files)
  {
    files: ['server/**/*.js', 'tools/**/*.js', 'tests/**/*.js', '*.config.js', 'claude-demo.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'react-hooks/rules-of-hooks': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react-refresh/only-export-components': 'off',
    },
  },
  // Test files
  {
    files: ['**/*.test.js', '**/*.spec.js', 'src/test/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        vi: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        test: 'readonly',
      },
    },
  },
  // main.jsx doesn't need exports warning
  {
    files: ['src/main.jsx'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
  // Files that export both components and utility functions
  {
    files: [
      'src/components/GoogleAnalytics.jsx',
      'src/components/SEOHead.jsx',
      'src/contexts/ThemeContext.jsx',
    ],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
  // Files with code examples that have shell variable syntax
  {
    files: [
      'src/pages/design/MobileWeatherApp.jsx',
      'src/pages/devops/**/*.jsx',
      'src/pages/messaging/RabbitMQ.jsx',
      'src/pages/questions/JenkinsQuestions.jsx',
      'src/pages/questions/TeamCityQuestions.jsx',
    ],
    rules: {
      'no-useless-escape': 'off',
    },
  },
])
