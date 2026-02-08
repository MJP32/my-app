import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SQLFundamentals from './SQLFundamentals'

// Mock SyntaxHighlighter to avoid heavy rendering
vi.mock('react-syntax-highlighter', () => ({
  Prism: ({ children }) => <pre data-testid="code-block">{children}</pre>
}))

vi.mock('react-syntax-highlighter/dist/esm/styles/prism', () => ({
  vscDarkPlus: {}
}))

vi.mock('../../components/Breadcrumb', () => ({
  default: () => <div data-testid="breadcrumb" />
}))

vi.mock('../../components/CollapsibleSidebar', () => ({
  default: () => <div data-testid="sidebar" />
}))

describe('SQLFundamentals', () => {
  const mockOnBack = vi.fn()
  const mockBreadcrumb = { onMainMenu: vi.fn() }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders all 8 concept cards', () => {
    render(<SQLFundamentals onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

    expect(screen.getByText('SQL Vocabulary')).toBeInTheDocument()
    expect(screen.getByText('JOIN Types')).toBeInTheDocument()
    expect(screen.getByText('Subqueries')).toBeInTheDocument()
    expect(screen.getByText('CTEs (WITH Clause)')).toBeInTheDocument()
    expect(screen.getByText('Aggregate Functions')).toBeInTheDocument()
    expect(screen.getByText('Window Functions')).toBeInTheDocument()
    expect(screen.getByText('Schema Management')).toBeInTheDocument()
    expect(screen.getByText('Essential SQL Operations')).toBeInTheDocument()
  })

  it('calls onBack when back button clicked', () => {
    render(<SQLFundamentals onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

    fireEvent.click(screen.getByText('← Back to Databases'))
    expect(mockOnBack).toHaveBeenCalledTimes(1)
  })

  describe('Schema Management concept', () => {
    it('opens modal when card clicked', () => {
      render(<SQLFundamentals onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Schema Management'))
      expect(screen.getByText('✕ Close')).toBeInTheDocument()
    })

    it('shows all 5 detail tabs', () => {
      render(<SQLFundamentals onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Schema Management'))

      // Detail names appear as both tab button and h3, so use getAllByText
      expect(screen.getAllByText('ALTER TABLE — Column Changes').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('ALTER TABLE — Constraints').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('ALTER TABLE — Table Operations').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('DCL — Data Control').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('TCL — Transaction Control').length).toBeGreaterThanOrEqual(1)
    })

    it('shows code example for first detail by default', () => {
      render(<SQLFundamentals onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Schema Management'))

      const codeBlocks = screen.getAllByTestId('code-block')
      expect(codeBlocks.length).toBeGreaterThan(0)
      expect(codeBlocks[0].textContent).toContain('ALTER TABLE')
    })

    it('switches detail when tab clicked', () => {
      render(<SQLFundamentals onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Schema Management'))
      fireEvent.click(screen.getByText('DCL — Data Control'))

      const codeBlocks = screen.getAllByTestId('code-block')
      expect(codeBlocks[0].textContent).toContain('GRANT')
    })

    it('shows TCL transaction content', () => {
      render(<SQLFundamentals onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Schema Management'))
      fireEvent.click(screen.getByText('TCL — Transaction Control'))

      const codeBlocks = screen.getAllByTestId('code-block')
      expect(codeBlocks[0].textContent).toContain('BEGIN')
      expect(codeBlocks[0].textContent).toContain('COMMIT')
      expect(codeBlocks[0].textContent).toContain('SAVEPOINT')
    })
  })

  describe('Essential SQL Operations concept', () => {
    it('opens modal when card clicked', () => {
      render(<SQLFundamentals onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Essential SQL Operations'))
      expect(screen.getByText('✕ Close')).toBeInTheDocument()
    })

    it('shows all 5 detail tabs', () => {
      render(<SQLFundamentals onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Essential SQL Operations'))

      // Detail names appear as both tab button and h3, so use getAllByText
      expect(screen.getAllByText('Set Operations').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('CASE Expressions').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Type Casting & Conversion').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('String Functions').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Date & Time Functions').length).toBeGreaterThanOrEqual(1)
    })

    it('shows Set Operations code by default', () => {
      render(<SQLFundamentals onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Essential SQL Operations'))

      const codeBlocks = screen.getAllByTestId('code-block')
      expect(codeBlocks[0].textContent).toContain('UNION')
    })

    it('shows CASE Expressions content when tab clicked', () => {
      render(<SQLFundamentals onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Essential SQL Operations'))
      fireEvent.click(screen.getByText('CASE Expressions'))

      const codeBlocks = screen.getAllByTestId('code-block')
      expect(codeBlocks[0].textContent).toContain('CASE')
      expect(codeBlocks[0].textContent).toContain('WHEN')
    })

    it('shows Date & Time content when tab clicked', () => {
      render(<SQLFundamentals onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Essential SQL Operations'))
      fireEvent.click(screen.getByText('Date & Time Functions'))

      const codeBlocks = screen.getAllByTestId('code-block')
      expect(codeBlocks[0].textContent).toContain('CURRENT_DATE')
      expect(codeBlocks[0].textContent).toContain('EXTRACT')
    })
  })

  describe('modal interactions', () => {
    it('closes modal when close button clicked', () => {
      render(<SQLFundamentals onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Schema Management'))
      expect(screen.getByText('✕ Close')).toBeInTheDocument()

      fireEvent.click(screen.getByText('✕ Close'))
      expect(screen.queryByText('✕ Close')).not.toBeInTheDocument()
    })

    it('closes modal on Escape key', () => {
      render(<SQLFundamentals onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Schema Management'))
      expect(screen.getByText('✕ Close')).toBeInTheDocument()

      fireEvent.keyDown(window, { key: 'Escape' })
      expect(screen.queryByText('✕ Close')).not.toBeInTheDocument()
    })

    it('calls onBack on Escape when no modal is open', () => {
      render(<SQLFundamentals onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.keyDown(window, { key: 'Escape' })
      expect(mockOnBack).toHaveBeenCalledTimes(1)
    })
  })
})
