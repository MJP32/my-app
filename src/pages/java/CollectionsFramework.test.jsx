import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import CollectionsFramework from './CollectionsFramework'

vi.mock('../../components/Breadcrumb', () => ({
  default: () => <div data-testid="breadcrumb" />
}))

vi.mock('../../components/CollapsibleSidebar', () => ({
  default: () => <div data-testid="sidebar" />
}))

vi.mock('../../components/CompletionCheckbox', () => ({
  default: () => <div data-testid="completion-checkbox" />
}))

vi.mock('../../services/progressService', () => ({
  isProblemCompleted: () => false
}))

describe('CollectionsFramework', () => {
  const mockOnBack = vi.fn()
  const mockBreadcrumb = { onMainMenu: vi.fn() }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders without crashing', () => {
    render(<CollectionsFramework onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)
  })

  it('renders all 6 concept cards', () => {
    render(<CollectionsFramework onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

    expect(screen.getByText('Collection Hierarchy')).toBeInTheDocument()
    expect(screen.getByText('List Implementations')).toBeInTheDocument()
    expect(screen.getByText('Set Implementations')).toBeInTheDocument()
    expect(screen.getByText('Map Implementations')).toBeInTheDocument()
    expect(screen.getByText('Queue & Deque')).toBeInTheDocument()
    expect(screen.getByText('Advanced Patterns')).toBeInTheDocument()
  })

  describe('Collection Hierarchy concept', () => {
    it('opens modal when card clicked', () => {
      render(<CollectionsFramework onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Collection Hierarchy'))
      expect(screen.getByText('✕')).toBeInTheDocument()
    })

    it('shows all 3 detail tabs', () => {
      render(<CollectionsFramework onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Collection Hierarchy'))

      expect(screen.getAllByText('Framework Overview').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Core Interfaces').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Choosing the Right Collection').length).toBeGreaterThanOrEqual(1)
    })

    it('switches detail when tab clicked', () => {
      render(<CollectionsFramework onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Collection Hierarchy'))
      fireEvent.click(screen.getByText('Core Interfaces'))

      expect(screen.getAllByText('Core Interfaces').length).toBeGreaterThanOrEqual(2)
    })
  })

  describe('List Implementations concept', () => {
    it('opens and shows detail tabs', () => {
      render(<CollectionsFramework onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('List Implementations'))

      expect(screen.getAllByText('ArrayList Internals').length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('Set Implementations concept', () => {
    it('opens and shows detail tabs', () => {
      render(<CollectionsFramework onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Set Implementations'))

      expect(screen.getAllByText('HashSet Implementation').length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('Map Implementations concept', () => {
    it('opens and shows detail tabs', () => {
      render(<CollectionsFramework onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Map Implementations'))

      expect(screen.getAllByText('HashMap Internals').length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('Queue & Deque concept', () => {
    it('opens and shows detail tabs', () => {
      render(<CollectionsFramework onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Queue & Deque'))

      expect(screen.getAllByText('PriorityQueue').length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('Advanced Patterns concept', () => {
    it('opens and shows all 4 detail tabs', () => {
      render(<CollectionsFramework onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Advanced Patterns'))

      expect(screen.getAllByText('LRU Cache Design').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Iterator & Fail-Fast').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Fail-Safe Iterators').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Utility Methods').length).toBeGreaterThanOrEqual(1)
    })

    it('renders Fail-Safe Iterators detail content', () => {
      render(<CollectionsFramework onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Advanced Patterns'))
      fireEvent.click(screen.getByText('Fail-Safe Iterators'))

      expect(screen.getAllByText('Fail-Safe Iterators').length).toBeGreaterThanOrEqual(2)
    })

    it('renders Iterator & Fail-Fast detail content', () => {
      render(<CollectionsFramework onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Advanced Patterns'))
      fireEvent.click(screen.getByText('Iterator & Fail-Fast'))

      expect(screen.getAllByText('Iterator & Fail-Fast').length).toBeGreaterThanOrEqual(2)
    })
  })

  describe('modal interactions', () => {
    it('closes modal when close button clicked', () => {
      render(<CollectionsFramework onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Collection Hierarchy'))
      expect(screen.getByText('✕')).toBeInTheDocument()

      fireEvent.click(screen.getByText('✕'))
      expect(screen.queryByText('✕')).not.toBeInTheDocument()
    })

    it('closes modal on Escape key', () => {
      render(<CollectionsFramework onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Collection Hierarchy'))
      expect(screen.getByText('✕')).toBeInTheDocument()

      fireEvent.keyDown(document, { key: 'Escape' })
      expect(screen.queryByText('✕')).not.toBeInTheDocument()
    })
  })
})
