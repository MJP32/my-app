import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Concurrency from './Concurrency'

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

vi.mock('../../components/CompletionCheckbox', () => ({
  default: () => <div data-testid="completion-checkbox" />
}))

vi.mock('../../services/progressService', () => ({
  isProblemCompleted: vi.fn(() => false)
}))

describe('Concurrency', () => {
  const mockOnBack = vi.fn()
  const mockBreadcrumb = { onMainMenu: vi.fn() }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the Executor Framework concept card', () => {
    render(<Concurrency onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

    expect(screen.getByText('Executor Framework')).toBeInTheDocument()
  })

  it('renders all existing concept cards alongside Executor Framework', () => {
    render(<Concurrency onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

    expect(screen.getByText('Synchronized Methods & Blocks')).toBeInTheDocument()
    expect(screen.getByText('ReentrantLock')).toBeInTheDocument()
    expect(screen.getByText('Atomic Variables')).toBeInTheDocument()
    expect(screen.getByText('ReadWriteLock')).toBeInTheDocument()
    expect(screen.getByText('Volatile & Memory Visibility')).toBeInTheDocument()
    expect(screen.getByText('Thread Pools & Executors')).toBeInTheDocument()
    expect(screen.getByText('Semaphore & Permits')).toBeInTheDocument()
    expect(screen.getByText('CountDownLatch & CyclicBarrier')).toBeInTheDocument()
    expect(screen.getByText('Concurrent Collections')).toBeInTheDocument()
    expect(screen.getByText('Executor Framework')).toBeInTheDocument()
  })

  describe('Executor Framework concept', () => {
    it('opens modal when card clicked', () => {
      render(<Concurrency onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Executor Framework'))

      // Concurrency page uses just "✕" for concept modal close button
      // Detail name appears as both tab and h3
      expect(screen.getAllByText('Executor Hierarchy').length).toBeGreaterThanOrEqual(1)
    })

    it('shows all 5 detail tabs', () => {
      render(<Concurrency onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Executor Framework'))

      // Detail names appear as both tab button and h3, so use getAllByText
      expect(screen.getAllByText('Executor Hierarchy').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Future & Callable').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('invokeAll & invokeAny').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('ForkJoinPool').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Advanced CompletableFuture').length).toBeGreaterThanOrEqual(1)
    })

    it('shows Executor Hierarchy code by default', () => {
      render(<Concurrency onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Executor Framework'))

      const codeBlocks = screen.getAllByTestId('code-block')
      const lastBlock = codeBlocks[codeBlocks.length - 1]
      expect(lastBlock.textContent).toContain('ExecutorService')
      expect(lastBlock.textContent).toContain('shutdown')
    })

    it('switches to Future & Callable tab', () => {
      render(<Concurrency onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Executor Framework'))
      fireEvent.click(screen.getByRole('button', { name: 'Future & Callable' }))

      const codeBlocks = screen.getAllByTestId('code-block')
      const lastBlock = codeBlocks[codeBlocks.length - 1]
      expect(lastBlock.textContent).toContain('Callable')
      expect(lastBlock.textContent).toContain('Future')
    })

    it('switches to invokeAll & invokeAny tab', () => {
      render(<Concurrency onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Executor Framework'))
      fireEvent.click(screen.getByRole('button', { name: 'invokeAll & invokeAny' }))

      const codeBlocks = screen.getAllByTestId('code-block')
      const lastBlock = codeBlocks[codeBlocks.length - 1]
      expect(lastBlock.textContent).toContain('invokeAll')
      expect(lastBlock.textContent).toContain('invokeAny')
    })

    it('switches to ForkJoinPool tab', () => {
      render(<Concurrency onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Executor Framework'))
      fireEvent.click(screen.getByRole('button', { name: 'ForkJoinPool' }))

      const codeBlocks = screen.getAllByTestId('code-block')
      const lastBlock = codeBlocks[codeBlocks.length - 1]
      expect(lastBlock.textContent).toContain('RecursiveTask')
      expect(lastBlock.textContent).toContain('fork')
    })

    it('switches to Advanced CompletableFuture tab', () => {
      render(<Concurrency onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Executor Framework'))
      fireEvent.click(screen.getByRole('button', { name: 'Advanced CompletableFuture' }))

      const codeBlocks = screen.getAllByTestId('code-block')
      const lastBlock = codeBlocks[codeBlocks.length - 1]
      expect(lastBlock.textContent).toContain('thenCompose')
      expect(lastBlock.textContent).toContain('allOf')
    })
  })

  describe('modal interactions', () => {
    it('closes modal when close button clicked', () => {
      render(<Concurrency onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Executor Framework'))
      // Verify modal is open by checking for detail tabs
      expect(screen.getAllByText('Executor Hierarchy').length).toBeGreaterThanOrEqual(1)

      // Concurrency page concept modal uses just "✕" for close
      const closeButtons = screen.getAllByText('✕')
      fireEvent.click(closeButtons[closeButtons.length - 1])

      // After closing, Executor Framework should only appear as the card title
      expect(screen.getByText('Executor Framework')).toBeInTheDocument()
    })

    it('closes modal on Escape key', () => {
      render(<Concurrency onBack={mockOnBack} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Executor Framework'))
      // Modal is open — detail name appears as tab + h3 (2 elements)
      expect(screen.getAllByText('Executor Hierarchy').length).toBe(2)

      // Concurrency page listens on document, not window
      fireEvent.keyDown(document, { key: 'Escape' })

      // Modal should be closed — detail tabs and h3 should be gone
      expect(screen.queryAllByText('Executor Hierarchy').length).toBe(0)
    })
  })
})
