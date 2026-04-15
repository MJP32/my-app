import { useEffect } from 'react'

/**
 * Listens for 'navigateToSection' custom events and auto-selects
 * the matching concept card by id.
 */
export default function useVoiceConceptNavigation(concepts, setSelectedConceptIndex, setSelectedDetailIndex) {
  useEffect(() => {
    const handler = (e) => {
      const { sectionId } = e.detail
      if (!sectionId || !concepts) return
      const index = concepts.findIndex(c => c.id === sectionId)
      if (index !== -1) {
        setSelectedConceptIndex(index)
        if (setSelectedDetailIndex) setSelectedDetailIndex(0)
      }
    }
    window.addEventListener('navigateToSection', handler)
    return () => window.removeEventListener('navigateToSection', handler)
  }, [concepts, setSelectedConceptIndex, setSelectedDetailIndex])
}
