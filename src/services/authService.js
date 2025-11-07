import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth'
import { auth } from '../config/firebase'
import { updateUserInfo } from './progressService'

// Google Auth Provider
const googleProvider = new GoogleAuthProvider()

/**
 * Sign up with email and password
 */
export const signUpWithEmail = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)

    // Update user profile with display name
    if (displayName) {
      await updateProfile(userCredential.user, {
        displayName: displayName
      })
    }

    // Update local user info
    updateUserInfo({
      username: displayName || email.split('@')[0],
      email: email,
      uid: userCredential.user.uid,
      joinedDate: new Date().toISOString()
    })

    return {
      success: true,
      user: userCredential.user
    }
  } catch (error) {
    console.error('Sign up error:', error)
    return {
      success: false,
      error: getErrorMessage(error.code)
    }
  }
}

/**
 * Sign in with email and password
 */
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)

    // Update local user info
    updateUserInfo({
      username: userCredential.user.displayName || email.split('@')[0],
      email: userCredential.user.email,
      uid: userCredential.user.uid
    })

    return {
      success: true,
      user: userCredential.user
    }
  } catch (error) {
    console.error('Sign in error:', error)
    return {
      success: false,
      error: getErrorMessage(error.code)
    }
  }
}

/**
 * Sign in with Google
 */
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider)

    // Update local user info
    updateUserInfo({
      username: result.user.displayName || result.user.email.split('@')[0],
      email: result.user.email,
      uid: result.user.uid,
      photoURL: result.user.photoURL
    })

    return {
      success: true,
      user: result.user
    }
  } catch (error) {
    console.error('Google sign in error:', error)
    return {
      success: false,
      error: getErrorMessage(error.code)
    }
  }
}

/**
 * Sign out
 */
export const logOut = async () => {
  try {
    await signOut(auth)
    return {
      success: true
    }
  } catch (error) {
    console.error('Sign out error:', error)
    return {
      success: false,
      error: getErrorMessage(error.code)
    }
  }
}

/**
 * Listen to auth state changes
 */
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      updateUserInfo({
        username: user.displayName || user.email.split('@')[0],
        email: user.email,
        uid: user.uid,
        photoURL: user.photoURL
      })
      callback(user)
    } else {
      // User is signed out
      callback(null)
    }
  })
}

/**
 * Get current user
 */
export const getCurrentUser = () => {
  return auth.currentUser
}

/**
 * Get user-friendly error messages
 */
const getErrorMessage = (errorCode) => {
  const errorMessages = {
    'auth/email-already-in-use': 'This email is already registered. Please sign in instead.',
    'auth/invalid-email': 'Invalid email address.',
    'auth/operation-not-allowed': 'Email/password accounts are not enabled. Please contact support.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/user-disabled': 'This account has been disabled. Please contact support.',
    'auth/user-not-found': 'No account found with this email. Please sign up.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
    'auth/popup-closed-by-user': 'Sign in cancelled.',
    'auth/cancelled-popup-request': 'Only one popup request is allowed at a time.'
  }

  return errorMessages[errorCode] || 'An error occurred. Please try again.'
}

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  return !!auth.currentUser
}
