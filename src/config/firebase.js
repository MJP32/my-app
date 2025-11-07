import { initializeApp } from 'firebase/app'
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Firebase configuration
// NOTE: Replace these with your actual Firebase project credentials
// Get these from Firebase Console > Project Settings > General > Your apps
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDEMO_KEY_REPLACE_WITH_YOUR_ACTUAL_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "your-project.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef123456"
}

// Debug: Log Firebase configuration (remove in production)
console.log('🔥 Firebase Configuration Loaded:')
console.log('Project ID:', firebaseConfig.projectId)
console.log('Auth Domain:', firebaseConfig.authDomain)
console.log('API Key:', firebaseConfig.apiKey ? '✓ Loaded' : '✗ Missing')
console.log('Environment variables:', {
  VITE_FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY ? '✓' : '✗',
  VITE_FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? '✓' : '✗',
  VITE_FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID ? '✓' : '✗',
  VITE_FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ? '✓' : '✗',
  VITE_FIREBASE_MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ? '✓' : '✗',
  VITE_FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID ? '✓' : '✗'
})

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)

// Set auth persistence to LOCAL to ensure auth state persists across sessions
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log('✅ Firebase auth persistence set to LOCAL')
  })
  .catch((error) => {
    console.error('❌ Error setting Firebase auth persistence:', error)
  })

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)

export default app
