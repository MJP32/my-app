import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import DependencyInjection from './DependencyInjection'

vi.mock('../../components/Breadcrumb', () => ({
  default: () => <div data-testid="breadcrumb" />
}))

vi.mock('../../components/CollapsibleSidebar', () => ({
  default: () => <div data-testid="sidebar" />
}))

describe('DependencyInjection', () => {
  const mockOnBack = vi.fn()
  const mockBreadcrumb = { onMainMenu: vi.fn() }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders all 7 concept cards', () => {
    render(<DependencyInjection onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

    expect(screen.getByText('Constructor Injection')).toBeInTheDocument()
    expect(screen.getByText('Setter Injection')).toBeInTheDocument()
    expect(screen.getByText('Interface Injection')).toBeInTheDocument()
    expect(screen.getByText('Field Injection')).toBeInTheDocument()
    expect(screen.getByText('Popular DI Frameworks')).toBeInTheDocument()
    expect(screen.getByText('Best Practices')).toBeInTheDocument()
    expect(screen.getByText('DI Architecture')).toBeInTheDocument()
  })

  describe('Constructor Injection concept', () => {
    it('opens modal when card clicked', () => {
      render(<DependencyInjection onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Constructor Injection'))
      expect(screen.getByText('✕')).toBeInTheDocument()
    })

    it('shows all 5 detail tabs', () => {
      render(<DependencyInjection onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Constructor Injection'))

      expect(screen.getAllByText('Overview').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Code Example').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Spring Configuration').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Benefits').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Best Practices').length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('Interface Injection concept', () => {
    it('opens modal when card clicked', () => {
      render(<DependencyInjection onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Interface Injection'))
      expect(screen.getByText('✕')).toBeInTheDocument()
    })

    it('shows all 5 detail tabs', () => {
      render(<DependencyInjection onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Interface Injection'))

      expect(screen.getAllByText('Overview').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Interface Pattern').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Jakarta EE Resource Injection').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Benefits').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Use Cases').length).toBeGreaterThanOrEqual(1)
    })

    it('shows Interface Pattern code when tab clicked', () => {
      render(<DependencyInjection onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Interface Injection'))
      fireEvent.click(screen.getByText('Interface Pattern'))

      expect(screen.getByText(/ServiceInjector/)).toBeInTheDocument()
    })

    it('shows Jakarta EE content when tab clicked', () => {
      render(<DependencyInjection onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Interface Injection'))
      fireEvent.click(screen.getByText('Jakarta EE Resource Injection'))

      expect(screen.getByText(/@Resource/)).toBeInTheDocument()
    })

    it('shows Benefits content when tab clicked', () => {
      render(<DependencyInjection onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Interface Injection'))
      fireEvent.click(screen.getByText('Benefits'))

      expect(screen.getByText(/Decouples the injection mechanism/)).toBeInTheDocument()
    })

    it('shows Use Cases content when tab clicked', () => {
      render(<DependencyInjection onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Interface Injection'))
      fireEvent.click(screen.getByText('Use Cases'))

      expect(screen.getByText(/Plugin systems/)).toBeInTheDocument()
    })
  })

  describe('Setter Injection concept', () => {
    it('opens and shows all detail tabs', () => {
      render(<DependencyInjection onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Setter Injection'))

      expect(screen.getAllByText('Overview').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Code Example').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('XML Configuration').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Benefits').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Drawbacks').length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('Field Injection concept', () => {
    it('opens and shows all detail tabs', () => {
      render(<DependencyInjection onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Field Injection'))

      expect(screen.getAllByText('Overview').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Spring Example').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Guice Example').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Benefits').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Drawbacks').length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('Popular DI Frameworks concept', () => {
    it('opens and shows all detail tabs', () => {
      render(<DependencyInjection onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Popular DI Frameworks'))

      expect(screen.getAllByText('Spring Framework (Java)').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Google Guice (Java)').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('.NET Core DI (C#)').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Angular DI (TypeScript)').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Dagger (Java/Android)').length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('DI Architecture concept', () => {
    it('opens and shows all detail tabs', () => {
      render(<DependencyInjection onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('DI Architecture'))

      expect(screen.getAllByText('Without DI (Tight Coupling)').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('With DI (Loose Coupling)').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('IoC Container Role').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Bean Lifecycle').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Dependency Resolution').length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('modal interactions', () => {
    it('closes modal when close button clicked', () => {
      render(<DependencyInjection onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Interface Injection'))
      expect(screen.getByText('✕')).toBeInTheDocument()

      fireEvent.click(screen.getByText('✕'))
      expect(screen.queryByText('✕')).not.toBeInTheDocument()
    })

    it('closes modal on Escape key', () => {
      render(<DependencyInjection onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Interface Injection'))
      expect(screen.getByText('✕')).toBeInTheDocument()

      fireEvent.keyDown(document, { key: 'Escape' })
      expect(screen.queryByText('✕')).not.toBeInTheDocument()
    })
  })
})
