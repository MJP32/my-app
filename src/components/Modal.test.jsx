import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Modal from './Modal'
import { ThemeProvider } from '../contexts/ThemeContext'

// Wrapper component to provide theme context
const renderWithTheme = (ui) => {
  return render(
    <ThemeProvider>
      {ui}
    </ThemeProvider>
  )
}

describe('Modal', () => {
  beforeEach(() => {
    // Reset body overflow style
    document.body.style.overflow = ''
  })

  afterEach(() => {
    document.body.style.overflow = ''
  })

  it('renders nothing when isOpen is false', () => {
    const { container } = renderWithTheme(
      <Modal isOpen={false} onClose={vi.fn()}>
        <div>Modal Content</div>
      </Modal>
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders children when isOpen is true', () => {
    renderWithTheme(
      <Modal isOpen={true} onClose={vi.fn()}>
        <div>Modal Content</div>
      </Modal>
    )
    expect(screen.getByText('Modal Content')).toBeInTheDocument()
  })

  it('shows close button by default', () => {
    renderWithTheme(
      <Modal isOpen={true} onClose={vi.fn()}>
        <div>Content</div>
      </Modal>
    )
    expect(screen.getByText('×')).toBeInTheDocument()
  })

  it('hides close button when showCloseButton is false', () => {
    renderWithTheme(
      <Modal isOpen={true} onClose={vi.fn()} showCloseButton={false}>
        <div>Content</div>
      </Modal>
    )
    expect(screen.queryByText('×')).not.toBeInTheDocument()
  })

  it('calls onClose when close button clicked', () => {
    const onClose = vi.fn()
    renderWithTheme(
      <Modal isOpen={true} onClose={onClose}>
        <div>Content</div>
      </Modal>
    )

    fireEvent.click(screen.getByText('×'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when backdrop clicked', () => {
    const onClose = vi.fn()
    const { container } = renderWithTheme(
      <Modal isOpen={true} onClose={onClose}>
        <div>Content</div>
      </Modal>
    )

    // Click on the backdrop (outermost div)
    fireEvent.click(container.firstChild)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('does not call onClose when backdrop clicked if closeOnBackdrop is false', () => {
    const onClose = vi.fn()
    const { container } = renderWithTheme(
      <Modal isOpen={true} onClose={onClose} closeOnBackdrop={false}>
        <div>Content</div>
      </Modal>
    )

    fireEvent.click(container.firstChild)
    expect(onClose).not.toHaveBeenCalled()
  })

  it('does not close when clicking inside modal content', () => {
    const onClose = vi.fn()
    renderWithTheme(
      <Modal isOpen={true} onClose={onClose}>
        <div>Content</div>
      </Modal>
    )

    fireEvent.click(screen.getByText('Content'))
    expect(onClose).not.toHaveBeenCalled()
  })

  it('calls onClose when Escape key pressed', () => {
    const onClose = vi.fn()
    renderWithTheme(
      <Modal isOpen={true} onClose={onClose}>
        <div>Content</div>
      </Modal>
    )

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('does not call onClose on Escape when closeOnEscape is false', () => {
    const onClose = vi.fn()
    renderWithTheme(
      <Modal isOpen={true} onClose={onClose} closeOnEscape={false}>
        <div>Content</div>
      </Modal>
    )

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).not.toHaveBeenCalled()
  })

  it('sets body overflow to hidden when open', () => {
    renderWithTheme(
      <Modal isOpen={true} onClose={vi.fn()}>
        <div>Content</div>
      </Modal>
    )
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('restores body overflow when closed', () => {
    const { rerender } = renderWithTheme(
      <Modal isOpen={true} onClose={vi.fn()}>
        <div>Content</div>
      </Modal>
    )

    rerender(
      <ThemeProvider>
        <Modal isOpen={false} onClose={vi.fn()}>
          <div>Content</div>
        </Modal>
      </ThemeProvider>
    )

    expect(document.body.style.overflow).toBe('')
  })

  it('applies custom maxWidth', () => {
    renderWithTheme(
      <Modal isOpen={true} onClose={vi.fn()} maxWidth="500px">
        <div data-testid="content">Content</div>
      </Modal>
    )

    const modalContent = screen.getByTestId('content').parentElement
    expect(modalContent).toHaveStyle({ width: '500px' })
  })

  it('applies custom zIndex', () => {
    const { container } = renderWithTheme(
      <Modal isOpen={true} onClose={vi.fn()} zIndex={9999}>
        <div>Content</div>
      </Modal>
    )

    expect(container.firstChild).toHaveStyle({ zIndex: 9999 })
  })
})
