import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Dynatrace from './Dynatrace'

vi.mock('../../components/Breadcrumb', () => ({
  default: () => <div data-testid="breadcrumb" />
}))

vi.mock('../../components/CollapsibleSidebar', () => ({
  default: () => <div data-testid="sidebar" />
}))

describe('Dynatrace', () => {
  const mockOnBack = vi.fn()
  const mockBreadcrumb = { onMainMenu: vi.fn() }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders all 5 concept cards', () => {
    render(<Dynatrace onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

    expect(screen.getByText('OneAgent & Architecture')).toBeInTheDocument()
    expect(screen.getByText('Davis AI Engine')).toBeInTheDocument()
    expect(screen.getByText('PurePath Distributed Tracing')).toBeInTheDocument()
    expect(screen.getByText('SLOs & Service Level')).toBeInTheDocument()
    expect(screen.getByText('Workflows & Automation')).toBeInTheDocument()
  })

  describe('OneAgent & Architecture concept', () => {
    it('opens modal when card clicked', () => {
      render(<Dynatrace onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('OneAgent & Architecture'))
      expect(screen.getByText('✕')).toBeInTheDocument()
    })

    it('shows all 5 detail tabs', () => {
      render(<Dynatrace onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('OneAgent & Architecture'))

      expect(screen.getAllByText('OneAgent Deployment').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Smartscape Topology').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('ActiveGate').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Grail Data Lakehouse').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Dynatrace API').length).toBeGreaterThanOrEqual(1)
    })

    it('switches detail when tab clicked', () => {
      render(<Dynatrace onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('OneAgent & Architecture'))
      fireEvent.click(screen.getByText('Smartscape Topology'))

      // The h3 heading and tab button should both show Smartscape Topology
      expect(screen.getAllByText('Smartscape Topology').length).toBeGreaterThanOrEqual(2)
    })
  })

  describe('Davis AI Engine concept', () => {
    it('opens and shows all detail tabs', () => {
      render(<Dynatrace onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Davis AI Engine'))

      expect(screen.getAllByText('Anomaly Detection').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Root Cause Analysis').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Problem Notifications').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Davis CoPilot').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Custom Metrics & Events').length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('PurePath Distributed Tracing concept', () => {
    it('opens and shows all detail tabs', () => {
      render(<Dynatrace onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('PurePath Distributed Tracing'))

      expect(screen.getAllByText('End-to-End Tracing').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Service Flow Analysis').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Database Analysis').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('OpenTelemetry Integration').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Session Replay & RUM').length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('SLOs & Service Level concept', () => {
    it('opens and shows all detail tabs', () => {
      render(<Dynatrace onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('SLOs & Service Level'))

      expect(screen.getAllByText('Defining SLOs').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Burn Rate Alerting').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Management Zones').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Synthetic Monitoring').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Interview Scenarios').length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('Workflows & Automation concept', () => {
    it('opens and shows all detail tabs', () => {
      render(<Dynatrace onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Workflows & Automation'))

      expect(screen.getAllByText('Workflow Engine').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('CI/CD Integration').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Site Reliability Guardian').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Cloud Automation').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Log Management').length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('modal interactions', () => {
    it('closes modal when close button clicked', () => {
      render(<Dynatrace onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('OneAgent & Architecture'))
      expect(screen.getByText('✕')).toBeInTheDocument()

      fireEvent.click(screen.getByText('✕'))
      expect(screen.queryByText('✕')).not.toBeInTheDocument()
    })

    it('closes modal on Escape key', () => {
      render(<Dynatrace onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('OneAgent & Architecture'))
      expect(screen.getByText('✕')).toBeInTheDocument()

      fireEvent.keyDown(document, { key: 'Escape' })
      expect(screen.queryByText('✕')).not.toBeInTheDocument()
    })
  })
})
