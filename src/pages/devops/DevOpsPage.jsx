import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function DevOpsPage({ onBack, onSelectItem }) {
  const devopsItems = [
    {
      id: 'Deployment',
      name: 'Deployment Strategies',
      icon: '📦',
      color: '#0284c7',
      description: 'Blue-green deployments, canary releases, rolling updates, and deployment automation.'
    },
    {
      id: 'Docker',
      name: 'Docker & Containers',
      icon: '🐳',
      color: '#0369a1',
      description: 'Containerization with Docker, image creation, orchestration, and container best practices.'
    },
    {
      id: 'Kubernetes',
      name: 'Kubernetes',
      icon: '☸️',
      color: '#075985',
      description: 'Container orchestration with Kubernetes, deployments, services, and cluster management.'
    },
    {
      id: 'Testing',
      name: 'Testing & QA',
      icon: '🧪',
      color: '#0c4a6e',
      description: 'Unit testing, integration testing, E2E testing, and test automation strategies.'
    },
    {
      id: 'CI/CD',
      name: 'CI/CD Pipelines',
      icon: '🔄',
      color: '#38bdf8',
      description: 'Building automated CI/CD pipelines with Jenkins, GitLab CI, GitHub Actions, and more.'
    },
    {
      id: 'Agile Scrum',
      name: 'Agile & Scrum',
      icon: '🏃',
      color: '#0891b2',
      description: 'Agile methodologies, Scrum framework, sprint planning, and team collaboration.'
    },
    {
      id: 'Production Support',
      name: 'Production Support',
      icon: '🛟',
      color: '#06b6d4',
      description: 'Incident management, monitoring, troubleshooting, and maintaining production systems.'
    },
    {
      id: 'TeamCity',
      name: 'TeamCity',
      icon: '🏗️',
      color: '#3b82f6',
      description: 'Continuous Integration and Deployment with TeamCity by JetBrains. Build configurations, pipelines, and testing.'
    },
    {
      id: 'Jenkins',
      name: 'Jenkins',
      icon: '🔧',
      color: '#d62728',
      description: 'Open-source automation server for CI/CD pipelines. Pipeline as code, plugins, and Docker integration.'
    },
    {
      id: 'Prometheus',
      name: 'Prometheus',
      icon: '📊',
      color: '#e85d1f',
      description: 'Open-source monitoring and alerting toolkit. Time-series database, PromQL, and service discovery.'
    },
    {
      id: 'Grafana',
      name: 'Grafana',
      icon: '📈',
      color: '#f57c00',
      description: 'Open-source analytics and monitoring platform. Dashboards, data sources, alerting, and provisioning.'
    },
    {
      id: 'Security OWASP',
      name: 'Security & OWASP',
      icon: '🔒',
      color: '#dc2626',
      description: 'Application security fundamentals, OWASP Top 10 vulnerabilities, secure coding practices, and security testing.'
    }
  ]

  const { focusedIndex, itemRefs } = useKeyboardNavigation({
    items: devopsItems,
    onSelect: (item) => onSelectItem(item.id),
    onBack,
    enabled: true,
    gridColumns: 2,
    loop: true
  })

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', backgroundColor: '#cffafe', minHeight: '100vh' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <button
          onClick={onBack}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#4b5563'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#6b7280'}
        >
          ← Back to Menu
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#1f2937',
          margin: 0
        }}>
          🛠️ DevOps
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <p style={{
        fontSize: '1.2rem',
        color: '#4b5563',
        textAlign: 'center',
        marginBottom: '3rem',
        lineHeight: '1.8'
      }}>
        Master DevOps practices, tools, and methodologies for efficient software delivery and operations.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '2rem'
      }}>
        {devopsItems.map((item, index) => (
          <button
            key={item.id}
            ref={(el) => itemRefs.current[index] = el}
            onClick={() => onSelectItem(item.id)}
            tabIndex={focusedIndex === index ? 0 : -1}
            role="link"
            aria-label={`${item.name}. ${item.description}`}
            style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '12px',
              border: `3px solid ${item.color}`,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: focusedIndex === index ? 'translateY(-8px)' : 'translateY(0)',
              boxShadow: focusedIndex === index
                ? `0 0 0 4px ${item.color}40, 0 12px 24px rgba(0,0,0,0.2)`
                : '0 4px 12px rgba(0,0,0,0.1)',
              textAlign: 'left',
              width: '100%'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)'
              e.currentTarget.style.boxShadow = `0 0 0 4px ${item.color}40, 0 12px 24px rgba(0,0,0,0.2)`
            }}
            onMouseLeave={(e) => {
              if (focusedIndex !== index) {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
              }
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{
                fontSize: '3rem',
                lineHeight: 1
              }}>
                {item.icon}
              </div>
              <h3 style={{
                fontSize: '1.4rem',
                fontWeight: '700',
                color: '#1f2937',
                margin: 0
              }}>
                {item.name}
              </h3>
            </div>

            <p style={{
              fontSize: '0.95rem',
              color: '#6b7280',
              lineHeight: '1.6',
              margin: '1rem 0'
            }}>
              {item.description}
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '0.5rem',
              fontSize: '0.9rem',
              color: item.color,
              fontWeight: '600',
              marginTop: '1.5rem'
            }}>
              <span>Explore Topic</span>
              <span>→</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default DevOpsPage
