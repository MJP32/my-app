import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Breadcrumb from './Breadcrumb'

describe('Breadcrumb', () => {
  describe('returns null when no props', () => {
    it('returns null when neither breadcrumb nor breadcrumbStack provided', () => {
      const { container } = render(<Breadcrumb />)
      expect(container.firstChild).toBeNull()
    })
  })

  describe('legacy format', () => {
    it('renders section and topic', () => {
      const breadcrumb = {
        section: { name: 'Python', icon: '🐍', onClick: vi.fn() },
        topic: 'Variables'
      }
      render(<Breadcrumb breadcrumb={breadcrumb} />)

      expect(screen.getByText('Python')).toBeInTheDocument()
      expect(screen.getByText('Variables')).toBeInTheDocument()
    })

    it('renders section with category and topic', () => {
      const breadcrumb = {
        section: { name: 'Java', icon: '☕', onClick: vi.fn() },
        category: { name: 'Core Java', onClick: vi.fn() },
        topic: 'Streams'
      }
      render(<Breadcrumb breadcrumb={breadcrumb} />)

      expect(screen.getByText('Java')).toBeInTheDocument()
      expect(screen.getByText('Core Java')).toBeInTheDocument()
      expect(screen.getByText('Streams')).toBeInTheDocument()
    })

    it('calls onClick when section button clicked', () => {
      const sectionClick = vi.fn()
      const breadcrumb = {
        section: { name: 'Python', onClick: sectionClick },
        topic: 'Functions'
      }
      render(<Breadcrumb breadcrumb={breadcrumb} />)

      fireEvent.click(screen.getByText('Python'))
      expect(sectionClick).toHaveBeenCalledTimes(1)
    })

    it('calls onClick when category button clicked', () => {
      const categoryClick = vi.fn()
      const breadcrumb = {
        section: { name: 'Java', onClick: vi.fn() },
        category: { name: 'Spring', onClick: categoryClick },
        topic: 'Boot'
      }
      render(<Breadcrumb breadcrumb={breadcrumb} />)

      fireEvent.click(screen.getByText('Spring'))
      expect(categoryClick).toHaveBeenCalledTimes(1)
    })

    it('renders arrows between items', () => {
      const breadcrumb = {
        section: { name: 'Design', onClick: vi.fn() },
        category: { name: 'Patterns', onClick: vi.fn() },
        topic: 'Singleton'
      }
      render(<Breadcrumb breadcrumb={breadcrumb} />)

      const arrows = screen.getAllByText('→')
      expect(arrows.length).toBe(2)
    })
  })

  describe('stack format', () => {
    it('renders all items in stack', () => {
      const stack = [
        { name: 'Home', icon: '🏠' },
        { name: 'Algorithms' },
        { name: 'Arrays' }
      ]
      render(<Breadcrumb breadcrumbStack={stack} onBreadcrumbClick={vi.fn()} />)

      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('Algorithms')).toBeInTheDocument()
      expect(screen.getByText('Arrays')).toBeInTheDocument()
    })

    it('last item is not clickable', () => {
      const stack = [
        { name: 'Home' },
        { name: 'Current' }
      ]
      const onClick = vi.fn()
      render(<Breadcrumb breadcrumbStack={stack} onBreadcrumbClick={onClick} />)

      // Last item should be a span, not a button
      const currentItem = screen.getByText('Current')
      expect(currentItem.tagName).toBe('SPAN')
    })

    it('calls onBreadcrumbClick with index when clicked', () => {
      const stack = [
        { name: 'First' },
        { name: 'Second' },
        { name: 'Third' }
      ]
      const onClick = vi.fn()
      render(<Breadcrumb breadcrumbStack={stack} onBreadcrumbClick={onClick} />)

      fireEvent.click(screen.getByText('First'))
      expect(onClick).toHaveBeenCalledWith(0, stack[0])

      fireEvent.click(screen.getByText('Second'))
      expect(onClick).toHaveBeenCalledWith(1, stack[1])
    })

    it('renders arrows between items except after last', () => {
      const stack = [
        { name: 'A' },
        { name: 'B' },
        { name: 'C' }
      ]
      render(<Breadcrumb breadcrumbStack={stack} onBreadcrumbClick={vi.fn()} />)

      const arrows = screen.getAllByText('→')
      expect(arrows.length).toBe(2) // Not after the last item
    })
  })

  describe('custom colors', () => {
    it('applies custom colors from props', () => {
      const colors = {
        primary: '#ff0000',
        bg: 'rgba(255, 0, 0, 0.1)',
        border: 'rgba(255, 0, 0, 0.3)'
      }
      const breadcrumb = {
        section: { name: 'Test', onClick: vi.fn() },
        topic: 'Topic'
      }
      const { container } = render(<Breadcrumb breadcrumb={breadcrumb} colors={colors} />)

      const wrapper = container.firstChild
      expect(wrapper).toHaveStyle({ backgroundColor: colors.bg })
    })
  })
})
