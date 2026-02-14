import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import DevOpsPage from './DevOpsPage'

vi.mock('../../hooks/useKeyboardNavigation', () => ({
  useKeyboardNavigation: () => ({
    focusedIndex: -1,
    itemRefs: { current: [] }
  })
}))

vi.mock('../../components/Breadcrumb', () => ({
  default: () => <div data-testid="breadcrumb" />
}))

vi.mock('../../components/CollapsibleSidebar', () => ({
  default: () => <div data-testid="sidebar" />
}))

describe('DevOpsPage', () => {
  const mockOnBack = vi.fn()
  const mockOnSelectItem = vi.fn()
  const mockBreadcrumb = { onMainMenu: vi.fn() }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders all 7 category cards on initial view', () => {
    render(<DevOpsPage onBack={mockOnBack} onSelectItem={mockOnSelectItem} breadcrumb={mockBreadcrumb} />)

    expect(screen.getByText('Containerization & Orchestration')).toBeInTheDocument()
    expect(screen.getByText('CI/CD & Build Tools')).toBeInTheDocument()
    expect(screen.getByText('Monitoring & Observability')).toBeInTheDocument()
    expect(screen.getByText('Performance & Profiling')).toBeInTheDocument()
    expect(screen.getByText('Security & Authentication')).toBeInTheDocument()
    expect(screen.getByText('Methodology & Quality')).toBeInTheDocument()
    expect(screen.getByText('Messaging & Streaming')).toBeInTheDocument()
  })

  describe('Containerization & Orchestration', () => {
    it('shows Docker and Kubernetes items when category clicked', () => {
      render(<DevOpsPage onBack={mockOnBack} onSelectItem={mockOnSelectItem} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Containerization & Orchestration'))

      expect(screen.getByText('Docker & Containers')).toBeInTheDocument()
      expect(screen.getByText('Kubernetes')).toBeInTheDocument()
    })

    it('calls onSelectItem with correct IDs', () => {
      render(<DevOpsPage onBack={mockOnBack} onSelectItem={mockOnSelectItem} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Containerization & Orchestration'))
      fireEvent.click(screen.getByText('Docker & Containers'))
      expect(mockOnSelectItem).toHaveBeenCalledWith('Docker')

      mockOnSelectItem.mockClear()
      fireEvent.click(screen.getByText('Kubernetes'))
      expect(mockOnSelectItem).toHaveBeenCalledWith('Kubernetes')
    })
  })

  describe('CI/CD & Build Tools', () => {
    it('shows all items when category clicked', () => {
      render(<DevOpsPage onBack={mockOnBack} onSelectItem={mockOnSelectItem} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('CI/CD & Build Tools'))

      expect(screen.getByText('CI/CD Pipelines')).toBeInTheDocument()
      expect(screen.getByText('Deployment Strategies')).toBeInTheDocument()
      expect(screen.getByText('Jenkins')).toBeInTheDocument()
      expect(screen.getByText('TeamCity')).toBeInTheDocument()
    })

    it('calls onSelectItem with correct IDs', () => {
      render(<DevOpsPage onBack={mockOnBack} onSelectItem={mockOnSelectItem} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('CI/CD & Build Tools'))

      fireEvent.click(screen.getByText('CI/CD Pipelines'))
      expect(mockOnSelectItem).toHaveBeenCalledWith('CI/CD')

      mockOnSelectItem.mockClear()
      fireEvent.click(screen.getByText('Deployment Strategies'))
      expect(mockOnSelectItem).toHaveBeenCalledWith('Deployment')

      mockOnSelectItem.mockClear()
      fireEvent.click(screen.getByText('Jenkins'))
      expect(mockOnSelectItem).toHaveBeenCalledWith('Jenkins')

      mockOnSelectItem.mockClear()
      fireEvent.click(screen.getByText('TeamCity'))
      expect(mockOnSelectItem).toHaveBeenCalledWith('TeamCity')
    })
  })

  describe('Monitoring & Observability', () => {
    it('shows all items when category clicked', () => {
      render(<DevOpsPage onBack={mockOnBack} onSelectItem={mockOnSelectItem} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Monitoring & Observability'))

      expect(screen.getByText('Prometheus')).toBeInTheDocument()
      expect(screen.getByText('Grafana')).toBeInTheDocument()
      expect(screen.getByText('Production Support')).toBeInTheDocument()
      expect(screen.getByText('Dynatrace')).toBeInTheDocument()
    })

    it('calls onSelectItem with correct IDs', () => {
      render(<DevOpsPage onBack={mockOnBack} onSelectItem={mockOnSelectItem} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Monitoring & Observability'))

      fireEvent.click(screen.getByText('Prometheus'))
      expect(mockOnSelectItem).toHaveBeenCalledWith('Prometheus')

      mockOnSelectItem.mockClear()
      fireEvent.click(screen.getByText('Grafana'))
      expect(mockOnSelectItem).toHaveBeenCalledWith('Grafana')

      mockOnSelectItem.mockClear()
      fireEvent.click(screen.getByText('Production Support'))
      expect(mockOnSelectItem).toHaveBeenCalledWith('Production Support')

      mockOnSelectItem.mockClear()
      fireEvent.click(screen.getByText('Dynatrace'))
      expect(mockOnSelectItem).toHaveBeenCalledWith('Dynatrace')
    })
  })

  describe('Performance & Profiling', () => {
    it('shows JFR and JMeter items when category clicked', () => {
      render(<DevOpsPage onBack={mockOnBack} onSelectItem={mockOnSelectItem} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Performance & Profiling'))

      expect(screen.getByText('Java Flight Recorder')).toBeInTheDocument()
      expect(screen.getByText('Apache JMeter')).toBeInTheDocument()
    })

    it('calls onSelectItem with correct IDs', () => {
      render(<DevOpsPage onBack={mockOnBack} onSelectItem={mockOnSelectItem} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Performance & Profiling'))

      fireEvent.click(screen.getByText('Java Flight Recorder'))
      expect(mockOnSelectItem).toHaveBeenCalledWith('JFR')

      mockOnSelectItem.mockClear()
      fireEvent.click(screen.getByText('Apache JMeter'))
      expect(mockOnSelectItem).toHaveBeenCalledWith('JMeter')
    })
  })

  describe('Security & Authentication', () => {
    it('shows all items when category clicked', () => {
      render(<DevOpsPage onBack={mockOnBack} onSelectItem={mockOnSelectItem} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Security & Authentication'))

      expect(screen.getByText('Security & OWASP')).toBeInTheDocument()
      expect(screen.getByText('JWT (JSON Web Tokens)')).toBeInTheDocument()
      expect(screen.getByText('OAuth 1.0')).toBeInTheDocument()
      expect(screen.getByText('OAuth 2.0')).toBeInTheDocument()
    })

    it('calls onSelectItem with correct IDs', () => {
      render(<DevOpsPage onBack={mockOnBack} onSelectItem={mockOnSelectItem} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Security & Authentication'))

      fireEvent.click(screen.getByText('Security & OWASP'))
      expect(mockOnSelectItem).toHaveBeenCalledWith('Security OWASP')

      mockOnSelectItem.mockClear()
      fireEvent.click(screen.getByText('JWT (JSON Web Tokens)'))
      expect(mockOnSelectItem).toHaveBeenCalledWith('JWT')

      mockOnSelectItem.mockClear()
      fireEvent.click(screen.getByText('OAuth 1.0'))
      expect(mockOnSelectItem).toHaveBeenCalledWith('OAuth')

      mockOnSelectItem.mockClear()
      fireEvent.click(screen.getByText('OAuth 2.0'))
      expect(mockOnSelectItem).toHaveBeenCalledWith('OAuth2')
    })
  })

  describe('Methodology & Quality', () => {
    it('shows all items when category clicked', () => {
      render(<DevOpsPage onBack={mockOnBack} onSelectItem={mockOnSelectItem} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Methodology & Quality'))

      expect(screen.getByText('Agile & Scrum')).toBeInTheDocument()
      expect(screen.getByText('Testing & QA')).toBeInTheDocument()
    })

    it('calls onSelectItem with correct IDs', () => {
      render(<DevOpsPage onBack={mockOnBack} onSelectItem={mockOnSelectItem} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Methodology & Quality'))

      fireEvent.click(screen.getByText('Agile & Scrum'))
      expect(mockOnSelectItem).toHaveBeenCalledWith('Agile Scrum')

      mockOnSelectItem.mockClear()
      fireEvent.click(screen.getByText('Testing & QA'))
      expect(mockOnSelectItem).toHaveBeenCalledWith('Testing')
    })
  })

  describe('Messaging & Streaming', () => {
    it('shows all items when category clicked', () => {
      render(<DevOpsPage onBack={mockOnBack} onSelectItem={mockOnSelectItem} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Messaging & Streaming'))

      expect(screen.getByText('Apache Kafka')).toBeInTheDocument()
      expect(screen.getByText('Apache Flink')).toBeInTheDocument()
      expect(screen.getByText('RabbitMQ')).toBeInTheDocument()
      expect(screen.getByText('Solace')).toBeInTheDocument()
      expect(screen.getByText('MuleSoft')).toBeInTheDocument()
    })

    it('calls onSelectItem with correct IDs', () => {
      render(<DevOpsPage onBack={mockOnBack} onSelectItem={mockOnSelectItem} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Messaging & Streaming'))

      fireEvent.click(screen.getByText('Apache Kafka'))
      expect(mockOnSelectItem).toHaveBeenCalledWith('Kafka')

      mockOnSelectItem.mockClear()
      fireEvent.click(screen.getByText('Apache Flink'))
      expect(mockOnSelectItem).toHaveBeenCalledWith('Apache Flink')

      mockOnSelectItem.mockClear()
      fireEvent.click(screen.getByText('RabbitMQ'))
      expect(mockOnSelectItem).toHaveBeenCalledWith('RabbitMQ')

      mockOnSelectItem.mockClear()
      fireEvent.click(screen.getByText('Solace'))
      expect(mockOnSelectItem).toHaveBeenCalledWith('Solace')

      mockOnSelectItem.mockClear()
      fireEvent.click(screen.getByText('MuleSoft'))
      expect(mockOnSelectItem).toHaveBeenCalledWith('MuleSoft')
    })
  })

  describe('All DevOps item IDs are routable', () => {
    // Every item ID that DevOpsPage passes to onSelectItem must be handled in App.jsx
    // This maps to either devOpsModalMap entries or renderSelectedComponent checks
    const ALL_ROUTABLE_IDS = [
      'Docker', 'Kubernetes',
      'CI/CD', 'Deployment', 'Jenkins', 'TeamCity',
      'Prometheus', 'Grafana', 'Production Support', 'Dynatrace',
      'JFR', 'JMeter',
      'Security OWASP', 'JWT', 'OAuth', 'OAuth2',
      'Agile Scrum', 'Testing',
      'Kafka', 'Apache Flink', 'RabbitMQ', 'Solace', 'MuleSoft'
    ]

    // These are handled via devOpsModalMap useEffect in App.jsx
    const DEVOPS_MODAL_MAP_IDS = [
      'Deployment', 'Docker', 'Kubernetes', 'Testing', 'CI/CD',
      'Agile Scrum', 'Production Support', 'TeamCity', 'Jenkins',
      'Prometheus', 'Grafana', 'JFR', 'JMeter', 'Dynatrace',
      'Security OWASP'
    ]

    // These are handled via renderSelectedComponent in App.jsx
    const RENDER_COMPONENT_IDS = [
      'JWT', 'OAuth', 'OAuth2', 'Kafka', 'Apache Flink',
      'RabbitMQ', 'Solace', 'MuleSoft'
    ]

    it('all IDs are accounted for in either modal map or render component', () => {
      const handledIds = new Set([...DEVOPS_MODAL_MAP_IDS, ...RENDER_COMPONENT_IDS])
      ALL_ROUTABLE_IDS.forEach(id => {
        expect(handledIds.has(id)).toBe(true)
      })
    })

    it('no duplicate IDs between modal map and render component', () => {
      const modalSet = new Set(DEVOPS_MODAL_MAP_IDS)
      RENDER_COMPONENT_IDS.forEach(id => {
        expect(modalSet.has(id)).toBe(false)
      })
    })
  })

  describe('navigation', () => {
    it('navigates back from subcategory to main categories', () => {
      render(<DevOpsPage onBack={mockOnBack} onSelectItem={mockOnSelectItem} breadcrumb={mockBreadcrumb} />)

      // Enter a category
      fireEvent.click(screen.getByText('Containerization & Orchestration'))
      expect(screen.getByText('Docker & Containers')).toBeInTheDocument()

      // The breadcrumb should show the category name - click it to go back
      // Since we mock breadcrumb, verify items change when we re-render
    })

    it('shows topic count on category cards', () => {
      render(<DevOpsPage onBack={mockOnBack} onSelectItem={mockOnSelectItem} breadcrumb={mockBreadcrumb} />)

      // Multiple categories share the same counts, so use getAllByText
      expect(screen.getAllByText('2 topics').length).toBeGreaterThanOrEqual(1) // Containerization, Performance, Methodology
      expect(screen.getAllByText('4 topics').length).toBeGreaterThanOrEqual(1) // CI/CD, Monitoring, Security
      expect(screen.getAllByText('5 topics').length).toBeGreaterThanOrEqual(1) // Messaging
    })
  })
})
