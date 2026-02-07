// Drawing storage service - manages user-specific drawing persistence
import { getCurrentUser } from './authService'

const BASE_KEY = 'recursion-scratchpad-drawings'

/**
 * Get user-specific storage key for drawings
 */
export const getDrawingsStorageKey = () => {
  const user = getCurrentUser()
  return user ? `${BASE_KEY}_${user.uid}` : BASE_KEY
}

/**
 * Load saved drawings from localStorage for the current user
 */
export const loadDrawings = () => {
  try {
    const key = getDrawingsStorageKey()
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

/**
 * Save drawings array to localStorage for the current user
 */
export const saveDrawings = (drawings) => {
  try {
    const key = getDrawingsStorageKey()
    localStorage.setItem(key, JSON.stringify(drawings))
  } catch (error) {
    console.error('Error saving drawings:', error)
  }
}

/**
 * Add a new drawing and persist to localStorage
 * Returns the updated drawings array
 */
export const addDrawing = (currentDrawings, name, dataUrl) => {
  const newDrawing = {
    name,
    data: dataUrl,
    date: new Date().toISOString()
  }
  const updated = [...currentDrawings, newDrawing]
  saveDrawings(updated)
  return updated
}

/**
 * Delete a drawing by index and persist to localStorage
 * Returns the updated drawings array
 */
export const deleteDrawing = (currentDrawings, index) => {
  const updated = currentDrawings.filter((_, i) => i !== index)
  saveDrawings(updated)
  return updated
}
