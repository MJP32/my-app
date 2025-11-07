const LANGUAGE_KEY = 'preferredLanguage'

export const getPreferredLanguage = () => {
  try {
    const stored = localStorage.getItem(LANGUAGE_KEY)
    return stored || 'java' // Default to Java
  } catch (error) {
    console.error('Error reading language preference:', error)
    return 'java'
  }
}

export const setPreferredLanguage = (language) => {
  try {
    localStorage.setItem(LANGUAGE_KEY, language)
    window.dispatchEvent(new CustomEvent('languageChange', { detail: language }))
  } catch (error) {
    console.error('Error saving language preference:', error)
  }
}
