import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LoadingSpinner, { Skeleton, CardSkeleton } from './LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders spinner element', () => {
    const { container } = render(<LoadingSpinner />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders with text when provided', () => {
    render(<LoadingSpinner text="Loading..." />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders without text when not provided', () => {
    const { container } = render(<LoadingSpinner />)
    const textElements = container.querySelectorAll('p')
    expect(textElements.length).toBe(0)
  })

  it('renders fullscreen variant', () => {
    const { container } = render(<LoadingSpinner fullScreen />)
    const overlay = container.firstChild
    expect(overlay).toHaveStyle({ position: 'fixed' })
  })

  it('renders with different sizes without errors', () => {
    // Test that component renders correctly with all size options
    const { container: smallContainer } = render(<LoadingSpinner size="small" />)
    const { container: mediumContainer } = render(<LoadingSpinner size="medium" />)
    const { container: largeContainer } = render(<LoadingSpinner size="large" />)

    expect(smallContainer.firstChild).toBeInTheDocument()
    expect(mediumContainer.firstChild).toBeInTheDocument()
    expect(largeContainer.firstChild).toBeInTheDocument()
  })

  it('renders with custom color without errors', () => {
    const { container } = render(<LoadingSpinner color="#ff0000" />)
    expect(container.firstChild).toBeInTheDocument()
  })
})

describe('Skeleton', () => {
  it('renders with default props', () => {
    const { container } = render(<Skeleton />)
    const skeleton = container.firstChild
    expect(skeleton).toHaveStyle({ width: '100%', height: '1rem' })
  })

  it('renders with custom dimensions', () => {
    const { container } = render(<Skeleton width="200px" height="50px" />)
    const skeleton = container.firstChild
    expect(skeleton).toHaveStyle({ width: '200px', height: '50px' })
  })

  it('applies custom border radius', () => {
    const { container } = render(<Skeleton borderRadius="12px" />)
    const skeleton = container.firstChild
    expect(skeleton).toHaveStyle({ borderRadius: '12px' })
  })
})

describe('CardSkeleton', () => {
  it('renders single card by default', () => {
    const { container } = render(<CardSkeleton />)
    expect(container.children.length).toBe(1)
  })

  it('renders multiple cards when count specified', () => {
    const { container } = render(<CardSkeleton count={3} />)
    expect(container.children.length).toBe(3)
  })
})
