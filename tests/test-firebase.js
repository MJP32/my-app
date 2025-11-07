// Quick Firebase Configuration Test
// Run this with: node test-firebase.js

console.log('🔍 Checking Firebase Configuration...\n')

// Check environment variables
console.log('Environment Variables from .env:')
console.log('VITE_FIREBASE_API_KEY:', process.env.VITE_FIREBASE_API_KEY || '❌ NOT SET')
console.log('VITE_FIREBASE_AUTH_DOMAIN:', process.env.VITE_FIREBASE_AUTH_DOMAIN || '❌ NOT SET')
console.log('VITE_FIREBASE_PROJECT_ID:', process.env.VITE_FIREBASE_PROJECT_ID || '❌ NOT SET')
console.log('VITE_FIREBASE_STORAGE_BUCKET:', process.env.VITE_FIREBASE_STORAGE_BUCKET || '❌ NOT SET')
console.log('VITE_FIREBASE_MESSAGING_SENDER_ID:', process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '❌ NOT SET')
console.log('VITE_FIREBASE_APP_ID:', process.env.VITE_FIREBASE_APP_ID || '❌ NOT SET')

console.log('\n⚠️  IMPORTANT NOTES:')
console.log('1. Vite only loads VITE_* env vars in the browser, not in Node.js')
console.log('2. This test script will show "NOT SET" - that\'s expected')
console.log('3. The actual values are loaded in your browser by Vite')
console.log('4. Open browser DevTools Console to see the actual loaded config')

console.log('\n📋 TO DEBUG IN BROWSER:')
console.log('1. Open http://localhost:5175/')
console.log('2. Open Browser DevTools (F12)')
console.log('3. Go to Console tab')
console.log('4. Type: import.meta.env')
console.log('5. Check if all VITE_FIREBASE_* variables are loaded')

console.log('\n✅ STEPS TO FIX:')
console.log('1. Go to Firebase Console: https://console.firebase.google.com/')
console.log('2. Select project: my-app-b85b3')
console.log('3. Click "Authentication" in left sidebar')
console.log('4. Click "Sign-in method" tab')
console.log('5. Find "Email/Password" provider')
console.log('6. Click on it and ensure BOTH toggles are enabled:')
console.log('   - Email/Password: ENABLED')
console.log('   - Email link (passwordless sign-in): Can be disabled')
console.log('7. Click "Save"')
console.log('8. Clear browser cache (Ctrl+Shift+Delete)')
console.log('9. Restart dev server: Ctrl+C then npm run dev')
