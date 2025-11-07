import { useState, useEffect } from 'react'
import { getPreferredLanguage, setPreferredLanguage } from '../services/languageService'

function LanguageToggle() {
  const [language, setLanguage] = useState(getPreferredLanguage())

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage)
    setPreferredLanguage(newLanguage)
  }

  return (
    <div style={{
      display: 'inline-flex',
      backgroundColor: '#f3f4f6',
      borderRadius: '8px',
      padding: '4px',
      gap: '4px'
    }}>
      <button
        onClick={() => handleLanguageChange('java')}
        style={{
          padding: '0.5rem 1rem',
          fontSize: '0.875rem',
          fontWeight: '600',
          backgroundColor: language === 'java' ? '#3b82f6' : 'transparent',
          color: language === 'java' ? 'white' : '#6b7280',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
      >
        Java
      </button>
      <button
        onClick={() => handleLanguageChange('python')}
        style={{
          padding: '0.5rem 1rem',
          fontSize: '0.875rem',
          fontWeight: '600',
          backgroundColor: language === 'python' ? '#3b82f6' : 'transparent',
          color: language === 'python' ? 'white' : '#6b7280',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
      >
        Python
      </button>
    </div>
  )
}

export default LanguageToggle
