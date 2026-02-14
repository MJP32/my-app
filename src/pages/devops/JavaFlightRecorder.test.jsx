import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import JavaFlightRecorder from './JavaFlightRecorder'

vi.mock('../../components/Breadcrumb', () => ({
  default: () => <div data-testid="breadcrumb" />
}))

vi.mock('../../components/CollapsibleSidebar', () => ({
  default: () => <div data-testid="sidebar" />
}))

describe('JavaFlightRecorder', () => {
  const mockOnBack = vi.fn()
  const mockBreadcrumb = { onMainMenu: vi.fn() }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders all 5 concept cards', () => {
    render(<JavaFlightRecorder onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

    expect(screen.getByText('JFR Architecture & Setup')).toBeInTheDocument()
    expect(screen.getByText('JFR Event Categories')).toBeInTheDocument()
    expect(screen.getByText('JDK Mission Control (JMC)')).toBeInTheDocument()
    expect(screen.getByText('Production Profiling')).toBeInTheDocument()
    expect(screen.getByText('async-profiler Integration')).toBeInTheDocument()
  })

  describe('JFR Architecture & Setup concept', () => {
    it('opens modal when card clicked', () => {
      render(<JavaFlightRecorder onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('JFR Architecture & Setup'))
      expect(screen.getByText('✕')).toBeInTheDocument()
    })

    it('shows all 5 detail tabs', () => {
      render(<JavaFlightRecorder onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('JFR Architecture & Setup'))

      expect(screen.getAllByText('How JFR Works').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Programmatic API').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Recording Configurations').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Custom Events').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('JFR with Containers').length).toBeGreaterThanOrEqual(1)
    })

    it('switches detail when tab clicked', () => {
      render(<JavaFlightRecorder onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('JFR Architecture & Setup'))
      fireEvent.click(screen.getByText('Programmatic API'))

      // The h3 heading and tab button should both show Programmatic API
      expect(screen.getAllByText('Programmatic API').length).toBeGreaterThanOrEqual(2)
    })
  })

  describe('JFR Event Categories concept', () => {
    it('opens and shows all detail tabs', () => {
      render(<JavaFlightRecorder onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('JFR Event Categories'))

      expect(screen.getAllByText('GC & Memory Events').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Thread & Lock Events').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('I/O & Network Events').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('JIT & Class Loading').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('CPU & OS Events').length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('JDK Mission Control concept', () => {
    it('opens and shows all detail tabs', () => {
      render(<JavaFlightRecorder onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('JDK Mission Control (JMC)'))

      expect(screen.getAllByText('Automated Analysis').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Flame Graph View').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Memory Leak Detection').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Thread Analysis').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('JFR in CI/CD Pipelines').length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('Production Profiling concept', () => {
    it('opens and shows all detail tabs', () => {
      render(<JavaFlightRecorder onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Production Profiling'))

      expect(screen.getAllByText('Always-On Recording').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Event Streaming to Metrics').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Troubleshooting Latency').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('JFR vs Other Profilers').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Interview Scenarios').length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('async-profiler Integration concept', () => {
    it('opens and shows all detail tabs', () => {
      render(<JavaFlightRecorder onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('async-profiler Integration'))

      expect(screen.getAllByText('CPU Profiling').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Allocation Profiling').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('JFR Sync Mode').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Flame Graph Patterns').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Continuous Profiling').length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('modal interactions', () => {
    it('closes modal when close button clicked', () => {
      render(<JavaFlightRecorder onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('JFR Architecture & Setup'))
      expect(screen.getByText('✕')).toBeInTheDocument()

      fireEvent.click(screen.getByText('✕'))
      expect(screen.queryByText('✕')).not.toBeInTheDocument()
    })

    it('closes modal on Escape key', () => {
      render(<JavaFlightRecorder onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('JFR Architecture & Setup'))
      expect(screen.getByText('✕')).toBeInTheDocument()

      fireEvent.keyDown(document, { key: 'Escape' })
      expect(screen.queryByText('✕')).not.toBeInTheDocument()
    })
  })
})
