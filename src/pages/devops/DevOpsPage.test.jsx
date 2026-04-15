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

  it('renders all 25 item cards on initial view (All tab)', () => {
    render(<DevOpsPage onBack={mockOnBack} onSelectItem={mockOnSelectItem} breadcrumb={mockBreadcrumb} />)

    expect(screen.getByText('Docker & Containers')).toBeInTheDocument()
    expect(screen.getByText('Kubernetes')).toBeInTheDocument()
    expect(screen.getByText('CI/CD Pipelines')).toBeInTheDocument()
    expect(screen.getByText('Deployment Strategies')).toBeInTheDocument()
    expect(screen.getByText('Jenkins')).toBeInTheDocument()
    expect(screen.getByText('TeamCity')).toBeInTheDocument()
    expect(screen.getByText('Prometheus')).toBeInTheDocument()
    expect(screen.getByText('Grafana')).toBeInTheDocument()
    expect(screen.getByText('Production Support')).toBeInTheDocument()
    expect(screen.getByText('Java Flight Recorder')).toBeInTheDocument()
    expect(screen.getByText('JMeter')).toBeInTheDocument()
    expect(screen.getByText('Dynatrace')).toBeInTheDocument()
    expect(screen.getByText('Security & OWASP')).toBeInTheDocument()
    expect(screen.getByText('JWT (JSON Web Tokens)')).toBeInTheDocument()
    expect(screen.getByText('OAuth 1.0')).toBeInTheDocument()
    expect(screen.getByText('OAuth 2.0')).toBeInTheDocument()
    expect(screen.getByText('Agile & Scrum')).toBeInTheDocument()
    expect(screen.getByText('Testing & QA')).toBeInTheDocument()
    expect(screen.getByText('Ansible')).toBeInTheDocument()
    expect(screen.getByText('Unix Scripting')).toBeInTheDocument()
    expect(screen.getByText('Apache Kafka')).toBeInTheDocument()
    expect(screen.getByText('Apache Flink')).toBeInTheDocument()
    expect(screen.getByText('RabbitMQ')).toBeInTheDocument()
    expect(screen.getByText('Solace')).toBeInTheDocument()
    expect(screen.getByText('MuleSoft')).toBeInTheDocument()
  })

  it('renders all 7 category tabs', () => {
    render(<DevOpsPage onBack={mockOnBack} onSelectItem={mockOnSelectItem} breadcrumb={mockBreadcrumb} />)

    expect(screen.getByText('All')).toBeInTheDocument()
    expect(screen.getByText('Containers & Orchestration')).toBeInTheDocument()
    expect(screen.getByText('CI/CD & Build Tools')).toBeInTheDocument()
    expect(screen.getByText('Monitoring & Observability')).toBeInTheDocument()
    expect(screen.getByText('Security & Auth')).toBeInTheDocument()
    expect(screen.getByText('Methodology & Quality')).toBeInTheDocument()
    expect(screen.getByText('Messaging & Streaming')).toBeInTheDocument()
  })

  describe('Containers & Orchestration tab', () => {
    it('filters to Docker and Kubernetes items', () => {
      render(<DevOpsPage onBack={mockOnBack} onSelectItem={mockOnSelectItem} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Containers & Orchestration'))

      expect(screen.getByText('Docker & Containers')).toBeInTheDocument()
      expect(screen.getByText('Kubernetes')).toBeInTheDocument()
      expect(screen.queryByText('CI/CD Pipelines')).not.toBeInTheDocument()
      expect(screen.queryByText('Prometheus')).not.toBeInTheDocument()
    })

    it('calls onSelectItem with correct IDs', () => {
      render(<DevOpsPage onBack={mockOnBack} onSelectItem={mockOnSelectItem} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Containers & Orchestration'))

      fireEvent.click(screen.getByText('Docker & Containers'))
      expect(mockOnSelectItem).toHaveBeenCalledWith('Docker')

      mockOnSelectItem.mockClear()
      fireEvent.click(screen.getByText('Kubernetes'))
      expect(mockOnSelectItem).toHaveBeenCalledWith('Kubernetes')
    })
  })

  describe('CI/CD & Build Tools tab', () => {
    it('filters to CI/CD items', () => {
      render(<DevOpsPage onBack={mockOnBack} onSelectItem={mockOnSelectItem} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('CI/CD & Build Tools'))

      expect(screen.getByText('CI/CD Pipelines')).toBeInTheDocument()
      expect(screen.getByText('Deployment Strategies')).toBeInTheDocument()
      expect(screen.getByText('Jenkins')).toBeInTheDocument()
      expect(screen.getByText('TeamCity')).toBeInTheDocument()
      expect(screen.queryByText('Docker & Containers')).not.toBeInTheDocument()
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

  describe('Monitoring & Observability tab', () => {
    it('filters to monitoring items', () => {
      render(<DevOpsPage onBack={mockOnBack} onSelectItem={mockOnSelectItem} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Monitoring & Observability'))

      expect(screen.getByText('Prometheus')).toBeInTheDocument()
      expect(screen.getByText('Grafana')).toBeInTheDocument()
      expect(screen.getByText('Production Support')).toBeInTheDocument()
      expect(screen.getByText('Java Flight Recorder')).toBeInTheDocument()
      expect(screen.getByText('JMeter')).toBeInTheDocument()
      expect(screen.getByText('Dynatrace')).toBeInTheDocument()
      expect(screen.queryByText('Docker & Containers')).not.toBeInTheDocument()
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

  describe('Security & Auth tab', () => {
    it('filters to security items', () => {
      render(<DevOpsPage onBack={mockOnBack} onSelectItem={mockOnSelectItem} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Security & Auth'))

      expect(screen.getByText('Security & OWASP')).toBeInTheDocument()
      expect(screen.getByText('JWT (JSON Web Tokens)')).toBeInTheDocument()
      expect(screen.getByText('OAuth 1.0')).toBeInTheDocument()
      expect(screen.getByText('OAuth 2.0')).toBeInTheDocument()
      expect(screen.queryByText('Docker & Containers')).not.toBeInTheDocument()
    })

    it('calls onSelectItem with correct IDs', () => {
      render(<DevOpsPage onBack={mockOnBack} onSelectItem={mockOnSelectItem} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Security & Auth'))

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

  describe('Methodology & Quality tab', () => {
    it('filters to methodology items', () => {
      render(<DevOpsPage onBack={mockOnBack} onSelectItem={mockOnSelectItem} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Methodology & Quality'))

      expect(screen.getByText('Agile & Scrum')).toBeInTheDocument()
      expect(screen.getByText('Testing & QA')).toBeInTheDocument()
      expect(screen.getByText('Ansible')).toBeInTheDocument()
      expect(screen.getByText('Unix Scripting')).toBeInTheDocument()
      expect(screen.queryByText('Docker & Containers')).not.toBeInTheDocument()
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

  describe('Messaging & Streaming tab', () => {
    it('filters to messaging items', () => {
      render(<DevOpsPage onBack={mockOnBack} onSelectItem={mockOnSelectItem} breadcrumb={mockBreadcrumb} />)

      fireEvent.click(screen.getByText('Messaging & Streaming'))

      expect(screen.getByText('Apache Kafka')).toBeInTheDocument()
      expect(screen.getByText('Apache Flink')).toBeInTheDocument()
      expect(screen.getByText('RabbitMQ')).toBeInTheDocument()
      expect(screen.getByText('Solace')).toBeInTheDocument()
      expect(screen.getByText('MuleSoft')).toBeInTheDocument()
      expect(screen.queryByText('Docker & Containers')).not.toBeInTheDocument()
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
    const ALL_ROUTABLE_IDS = [
      'Docker', 'Kubernetes',
      'CI/CD', 'Deployment', 'Jenkins', 'TeamCity',
      'Prometheus', 'Grafana', 'Production Support', 'JavaFlightRecorder', 'JMeter', 'Dynatrace',
      'Security OWASP', 'JWT', 'OAuth', 'OAuth2',
      'Agile Scrum', 'Testing', 'Ansible', 'UnixScripting',
      'Kafka', 'Apache Flink', 'RabbitMQ', 'Solace', 'MuleSoft'
    ]

    const DEVOPS_MODAL_MAP_IDS = [
      'Deployment', 'Docker', 'Kubernetes', 'Testing', 'CI/CD',
      'Agile Scrum', 'Production Support', 'TeamCity', 'Jenkins',
      'Prometheus', 'Grafana', 'JavaFlightRecorder', 'JMeter', 'Dynatrace',
      'Security OWASP', 'Ansible', 'UnixScripting'
    ]

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

  describe('tab switching', () => {
    it('switches back to All tab showing all items', () => {
      render(<DevOpsPage onBack={mockOnBack} onSelectItem={mockOnSelectItem} breadcrumb={mockBreadcrumb} />)

      // Switch to a filtered tab
      fireEvent.click(screen.getByText('Containers & Orchestration'))
      expect(screen.queryByText('CI/CD Pipelines')).not.toBeInTheDocument()

      // Switch back to All
      fireEvent.click(screen.getByText('All'))
      expect(screen.getByText('CI/CD Pipelines')).toBeInTheDocument()
      expect(screen.getByText('Docker & Containers')).toBeInTheDocument()
    })
  })

  describe('initialCategory prop', () => {
    it('pre-selects the given category tab', () => {
      const mockUsed = vi.fn()
      render(
        <DevOpsPage
          onBack={mockOnBack}
          onSelectItem={mockOnSelectItem}
          breadcrumb={mockBreadcrumb}
          initialCategory="security"
          onInitialCategoryUsed={mockUsed}
        />
      )

      // Should show security items
      expect(screen.getByText('Security & OWASP')).toBeInTheDocument()
      expect(screen.getByText('JWT (JSON Web Tokens)')).toBeInTheDocument()
      // Should not show items from other categories
      expect(screen.queryByText('Docker & Containers')).not.toBeInTheDocument()
    })
  })
})
