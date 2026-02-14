import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import JMeter from './JMeter'

vi.mock('../../components/Breadcrumb', () => ({
  default: () => <div data-testid="breadcrumb" />
}))

vi.mock('../../components/CollapsibleSidebar', () => ({
  default: () => <div data-testid="sidebar" />
}))

describe('JMeter', () => {
  const mockOnBack = vi.fn()
  const mockBreadcrumb = { onMainMenu: vi.fn() }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders all 5 concept cards', () => {
    render(<JMeter onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

    expect(screen.getByText('JMeter Fundamentals')).toBeInTheDocument()
    expect(screen.getByText('Data-Driven Testing')).toBeInTheDocument()
    expect(screen.getByText('Distributed Testing')).toBeInTheDocument()
    expect(screen.getByText('Analysis & Reporting')).toBeInTheDocument()
    expect(screen.getByText('Advanced Techniques')).toBeInTheDocument()
  })

  describe('JMeter Fundamentals concept', () => {
    it('opens modal when card clicked', () => {
      render(<JMeter onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('JMeter Fundamentals'))
      expect(screen.getByText('✕')).toBeInTheDocument()
    })

    it('shows all 5 detail tabs', () => {
      render(<JMeter onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('JMeter Fundamentals'))

      expect(screen.getAllByText('Test Plan Structure').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Thread Groups').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('HTTP Samplers').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Timers & Pacing').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Running from CLI').length).toBeGreaterThanOrEqual(1)
    })

    it('switches detail when tab clicked', () => {
      render(<JMeter onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('JMeter Fundamentals'))
      fireEvent.click(screen.getByText('Thread Groups'))

      // The h3 heading and tab button should both show Thread Groups
      expect(screen.getAllByText('Thread Groups').length).toBeGreaterThanOrEqual(2)
    })
  })

  describe('Data-Driven Testing concept', () => {
    it('opens and shows all detail tabs', () => {
      render(<JMeter onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Data-Driven Testing'))

      expect(screen.getAllByText('CSV Data Set Config').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Extractors & Variables').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Assertions').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Logic Controllers').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('JDBC & Database Testing').length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('Distributed Testing concept', () => {
    it('opens and shows all detail tabs', () => {
      render(<JMeter onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Distributed Testing'))

      expect(screen.getAllByText('Controller-Worker Setup').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Docker & Kubernetes').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Plugins & Extensions').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('CI/CD Integration').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Cloud Load Testing').length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('Analysis & Reporting concept', () => {
    it('opens and shows all detail tabs', () => {
      render(<JMeter onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Analysis & Reporting'))

      expect(screen.getAllByText('HTML Dashboard Report').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Real-time with Grafana').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Key Metrics & SLAs').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Bottleneck Identification').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Test Types & Strategies').length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('Advanced Techniques concept', () => {
    it('opens and shows all detail tabs', () => {
      render(<JMeter onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Advanced Techniques'))

      expect(screen.getAllByText('Groovy Scripting').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('WebSocket Testing').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Correlation Patterns').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('JMeter vs Alternatives').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Interview Scenarios').length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('modal interactions', () => {
    it('closes modal when close button clicked', () => {
      render(<JMeter onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('JMeter Fundamentals'))
      expect(screen.getByText('✕')).toBeInTheDocument()

      fireEvent.click(screen.getByText('✕'))
      expect(screen.queryByText('✕')).not.toBeInTheDocument()
    })

    it('closes modal on Escape key', () => {
      render(<JMeter onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('JMeter Fundamentals'))
      expect(screen.getByText('✕')).toBeInTheDocument()

      fireEvent.keyDown(document, { key: 'Escape' })
      expect(screen.queryByText('✕')).not.toBeInTheDocument()
    })
  })
})
