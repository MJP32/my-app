import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import './idea-syntax-darcula.css'
import App from './App.jsx'
// Import Firebase to initialize it on app startup
import './config/firebase'

console.log('🚀 App Starting...')
console.log('Environment Check:', {
  isDev: import.meta.env.DEV,
  mode: import.meta.env.MODE,
  hasFirebaseKey: !!import.meta.env.VITE_FIREBASE_API_KEY
})

const rootElement = document.getElementById('root')

// Use hydrate for pre-rendered content (react-snap), otherwise use render
if (rootElement.hasChildNodes()) {
  // Page was pre-rendered by react-snap, use hydration
  hydrateRoot(
    rootElement,
    <StrictMode>
      <App />
    </StrictMode>
  )
} else {
  // Standard client-side rendering for development
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}
