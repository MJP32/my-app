import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import LanguageToggle from './LanguageToggle'

// Mock the language service
vi.mock('../services/languageService', () => ({
  getPreferredLanguage: vi.fn(() => 'java'),
  setPreferredLanguage: vi.fn()
}))

import { getPreferredLanguage, setPreferredLanguage } from '../services/languageService'

describe('LanguageToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders Java and Python buttons', () => {
    render(<LanguageToggle />)

    expect(screen.getByText('Java')).toBeInTheDocument()
    expect(screen.getByText('Python')).toBeInTheDocument()
  })

  it('shows Java as selected by default', () => {
    getPreferredLanguage.mockReturnValue('java')
    render(<LanguageToggle />)

    const javaButton = screen.getByText('Java')
    expect(javaButton).toHaveStyle({ backgroundColor: '#3b82f6' })
  })

  it('shows Python as selected when preferred', () => {
    getPreferredLanguage.mockReturnValue('python')
    render(<LanguageToggle />)

    const pythonButton = screen.getByText('Python')
    expect(pythonButton).toHaveStyle({ backgroundColor: '#3b82f6' })
  })

  it('calls setPreferredLanguage when Java clicked', () => {
    getPreferredLanguage.mockReturnValue('python')
    render(<LanguageToggle />)

    fireEvent.click(screen.getByText('Java'))
    expect(setPreferredLanguage).toHaveBeenCalledWith('java')
  })

  it('calls setPreferredLanguage when Python clicked', () => {
    getPreferredLanguage.mockReturnValue('java')
    render(<LanguageToggle />)

    fireEvent.click(screen.getByText('Python'))
    expect(setPreferredLanguage).toHaveBeenCalledWith('python')
  })

  it('updates visual state after clicking', () => {
    getPreferredLanguage.mockReturnValue('java')
    render(<LanguageToggle />)

    const pythonButton = screen.getByText('Python')
    fireEvent.click(pythonButton)

    // After click, Python should appear selected
    expect(pythonButton).toHaveStyle({ backgroundColor: '#3b82f6' })
  })
})
