# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React application built with Vite, using React 19 with ES modules. The project follows a minimal setup with Hot Module Replacement (HMR) and modern tooling.

## Key Technologies

- **React 19**: Latest React version with modern features
- **Vite**: Build tool and dev server using Rolldown (experimental bundler)
- **ESLint**: Code linting with React-specific rules
- **JavaScript**: No TypeScript - uses JSX files

## Development Commands

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Run ESLint
npm run lint

# Preview production build
npm run preview
```

## Project Structure

- `src/main.jsx`: Application entry point with React 19's createRoot
- `src/App.jsx`: Main application component
- `src/assets/`: Static assets (images, etc.)
- `public/`: Public static files served by Vite
- `index.html`: Main HTML template

## Notable Configuration

- Uses `rolldown-vite@7.1.12` instead of standard Vite (experimental bundler)
- ESLint configured for React hooks and refresh patterns
- No TypeScript configuration - pure JavaScript/JSX project
- React StrictMode enabled in development

## Development Notes

- The project uses React 19's modern patterns (createRoot, StrictMode)
- Hot reloading works through Vite's built-in HMR
- ESLint is configured to ignore unused variables that start with uppercase or underscore
- No test framework is currently configured