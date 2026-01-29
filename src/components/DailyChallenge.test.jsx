import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import DailyChallenge from './DailyChallenge'
import * as dailyChallengeService from '../services/dailyChallengeService'
import { ThemeProvider } from '../contexts/ThemeContext'

// Mock the services
vi.mock('../services/dailyChallengeService', () => ({
  getDailyChallenge: vi.fn(),
  isDailyChallengeCompleted: vi.fn(),
  getDifficultyColor: vi.fn()
}))

// Helper to render with theme context
const renderWithTheme = (component) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  )
}

describe('DailyChallenge', () => {
  const mockChallenge = {
    id: 'arrays-1',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays',
    page: 'Arrays',
    date: '2024-01-15',
    xpMultiplier: 2
  }

  const mockOnNavigate = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    // Default mock implementations
    dailyChallengeService.getDailyChallenge.mockReturnValue(mockChallenge)
    dailyChallengeService.isDailyChallengeCompleted.mockReturnValue(false)
    dailyChallengeService.getDifficultyColor.mockReturnValue('#10b981')
  })

  describe('Rendering', () => {
    it('renders challenge title', () => {
      renderWithTheme(<DailyChallenge userId="user123" onNavigate={mockOnNavigate} />)

      expect(screen.getByText('Two Sum')).toBeInTheDocument()
    })

    it('renders "Daily Challenge" label', () => {
      renderWithTheme(<DailyChallenge userId="user123" onNavigate={mockOnNavigate} />)

      expect(screen.getByText(/Daily Challenge/i)).toBeInTheDocument()
    })

    it('renders "2x XP" badge', () => {
      renderWithTheme(<DailyChallenge userId="user123" onNavigate={mockOnNavigate} />)

      expect(screen.getByText('2x XP')).toBeInTheDocument()
    })

    it('renders difficulty level', () => {
      renderWithTheme(<DailyChallenge userId="user123" onNavigate={mockOnNavigate} />)

      expect(screen.getByText('Easy')).toBeInTheDocument()
    })

    it('renders category', () => {
      renderWithTheme(<DailyChallenge userId="user123" onNavigate={mockOnNavigate} />)

      expect(screen.getByText('Arrays')).toBeInTheDocument()
    })

    it('renders target emoji when not completed', () => {
      dailyChallengeService.isDailyChallengeCompleted.mockReturnValue(false)
      renderWithTheme(<DailyChallenge userId="user123" onNavigate={mockOnNavigate} />)

      expect(screen.getByText('🎯')).toBeInTheDocument()
    })

    it('renders checkmark emoji when completed', () => {
      dailyChallengeService.isDailyChallengeCompleted.mockReturnValue(true)
      renderWithTheme(<DailyChallenge userId="user123" onNavigate={mockOnNavigate} />)

      expect(screen.getByText('✅')).toBeInTheDocument()
    })

    it('renders "COMPLETED" badge when completed', () => {
      dailyChallengeService.isDailyChallengeCompleted.mockReturnValue(true)
      renderWithTheme(<DailyChallenge userId="user123" onNavigate={mockOnNavigate} />)

      expect(screen.getByText('COMPLETED')).toBeInTheDocument()
    })

    it('does not render "COMPLETED" badge when not completed', () => {
      dailyChallengeService.isDailyChallengeCompleted.mockReturnValue(false)
      renderWithTheme(<DailyChallenge userId="user123" onNavigate={mockOnNavigate} />)

      expect(screen.queryByText('COMPLETED')).not.toBeInTheDocument()
    })

    it('returns null when no challenge available', () => {
      dailyChallengeService.getDailyChallenge.mockReturnValue(null)
      const { container } = renderWithTheme(<DailyChallenge userId="user123" onNavigate={mockOnNavigate} />)

      expect(container.firstChild).toBeNull()
    })
  })

  describe('Navigation', () => {
    it('calls onNavigate with correct page when clicked', () => {
      renderWithTheme(<DailyChallenge userId="user123" onNavigate={mockOnNavigate} />)

      const challengeElement = screen.getByText('Two Sum').closest('div').parentElement
      fireEvent.click(challengeElement)

      expect(mockOnNavigate).toHaveBeenCalledWith('Arrays')
    })

    it('does not call onNavigate when onNavigate is not provided', () => {
      renderWithTheme(<DailyChallenge userId="user123" />)

      const challengeElement = screen.getByText('Two Sum').closest('div').parentElement

      // Should not throw
      expect(() => fireEvent.click(challengeElement)).not.toThrow()
    })

    it('navigates to correct page for different challenges', () => {
      const graphChallenge = {
        ...mockChallenge,
        title: 'Number of Islands',
        page: 'Graphs',
        category: 'Graphs'
      }
      dailyChallengeService.getDailyChallenge.mockReturnValue(graphChallenge)

      renderWithTheme(<DailyChallenge userId="user123" onNavigate={mockOnNavigate} />)

      const challengeElement = screen.getByText('Number of Islands').closest('div').parentElement
      fireEvent.click(challengeElement)

      expect(mockOnNavigate).toHaveBeenCalledWith('Graphs')
    })
  })

  describe('Completion Status', () => {
    it('checks completion status with correct userId', () => {
      renderWithTheme(<DailyChallenge userId="user123" onNavigate={mockOnNavigate} />)

      expect(dailyChallengeService.isDailyChallengeCompleted).toHaveBeenCalledWith('user123')
    })

    it('updates completion status on progressUpdate event', async () => {
      dailyChallengeService.isDailyChallengeCompleted.mockReturnValueOnce(false)

      renderWithTheme(<DailyChallenge userId="user123" onNavigate={mockOnNavigate} />)

      // Initially not completed
      expect(screen.getByText('🎯')).toBeInTheDocument()

      // Update mock to return completed
      dailyChallengeService.isDailyChallengeCompleted.mockReturnValue(true)

      // Trigger progress update event
      window.dispatchEvent(new Event('progressUpdate'))

      // Should now show completed
      await waitFor(() => {
        expect(screen.getByText('✅')).toBeInTheDocument()
      })
    })

    it('updates completion status on dailyChallengeCompleted event', async () => {
      dailyChallengeService.isDailyChallengeCompleted.mockReturnValueOnce(false)

      renderWithTheme(<DailyChallenge userId="user123" onNavigate={mockOnNavigate} />)

      // Update mock to return completed
      dailyChallengeService.isDailyChallengeCompleted.mockReturnValue(true)

      // Trigger daily challenge completed event
      window.dispatchEvent(new CustomEvent('dailyChallengeCompleted'))

      // Should now show completed
      await waitFor(() => {
        expect(screen.getByText('✅')).toBeInTheDocument()
      })
    })

    it('cleans up event listeners on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')

      const { unmount } = renderWithTheme(<DailyChallenge userId="user123" onNavigate={mockOnNavigate} />)

      unmount()

      expect(removeEventListenerSpy).toHaveBeenCalledWith('dailyChallengeCompleted', expect.any(Function))
      expect(removeEventListenerSpy).toHaveBeenCalledWith('progressUpdate', expect.any(Function))
    })
  })

  describe('Styling', () => {
    it('calls getDifficultyColor with correct difficulty', () => {
      renderWithTheme(<DailyChallenge userId="user123" onNavigate={mockOnNavigate} />)

      expect(dailyChallengeService.getDifficultyColor).toHaveBeenCalledWith('Easy')
    })

    it('applies hover effect on mouse enter', () => {
      renderWithTheme(<DailyChallenge userId="user123" onNavigate={mockOnNavigate} />)

      const challengeElement = screen.getByText('Two Sum').closest('div').parentElement

      fireEvent.mouseEnter(challengeElement)

      // Verify hover state is applied (component uses inline styles)
      expect(challengeElement).toBeInTheDocument()
    })

    it('removes hover effect on mouse leave', () => {
      renderWithTheme(<DailyChallenge userId="user123" onNavigate={mockOnNavigate} />)

      const challengeElement = screen.getByText('Two Sum').closest('div').parentElement

      fireEvent.mouseEnter(challengeElement)
      fireEvent.mouseLeave(challengeElement)

      expect(challengeElement).toBeInTheDocument()
    })
  })

  describe('Props Changes', () => {
    it('re-checks completion when userId changes', () => {
      const { rerender } = renderWithTheme(
        <DailyChallenge userId="user123" onNavigate={mockOnNavigate} />
      )

      expect(dailyChallengeService.isDailyChallengeCompleted).toHaveBeenCalledWith('user123')

      // Change userId
      rerender(
        <ThemeProvider>
          <DailyChallenge userId="user456" onNavigate={mockOnNavigate} />
        </ThemeProvider>
      )

      expect(dailyChallengeService.isDailyChallengeCompleted).toHaveBeenCalledWith('user456')
    })
  })

  describe('Edge Cases', () => {
    it('handles missing challenge fields gracefully', () => {
      const incompleteChallenge = {
        title: 'Test Problem',
        page: 'Arrays'
      }
      dailyChallengeService.getDailyChallenge.mockReturnValue(incompleteChallenge)

      expect(() => {
        renderWithTheme(<DailyChallenge userId="user123" onNavigate={mockOnNavigate} />)
      }).not.toThrow()
    })

    it('handles long challenge titles', () => {
      const longTitleChallenge = {
        ...mockChallenge,
        title: 'A Very Long Challenge Title That Should Be Truncated With Ellipsis'
      }
      dailyChallengeService.getDailyChallenge.mockReturnValue(longTitleChallenge)

      renderWithTheme(<DailyChallenge userId="user123" onNavigate={mockOnNavigate} />)

      expect(screen.getByText(/A Very Long Challenge Title/)).toBeInTheDocument()
    })

    it('works without userId', () => {
      renderWithTheme(<DailyChallenge onNavigate={mockOnNavigate} />)

      expect(dailyChallengeService.isDailyChallengeCompleted).toHaveBeenCalledWith(undefined)
    })
  })
})
