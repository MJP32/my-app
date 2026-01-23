import { useState } from 'react'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'
import Breadcrumb from '../../components/Breadcrumb'

function DevOpsPage({ onBack, onSelectItem, breadcrumb, initialCategory, onInitialCategoryUsed }) {
  const [selectedCategory, setSelectedCategory] = useState(() => {
    // If initialCategory is provided, find the matching category
    if (initialCategory) {
      setTimeout(() => onInitialCategoryUsed?.(), 0)
      return initialCategory
    }
    return null
  })

  const categories = [
    {
      id: 'containerization',
      name: 'Containerization & Orchestration',
      icon: '🐳',
      color: '#0369a1',
      description: 'Docker containers and Kubernetes orchestration for scalable deployments.',
      items: [
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
        }
      ]
    },
    {
      id: 'cicd',
      name: 'CI/CD & Build Tools',
      icon: '🔄',
      color: '#38bdf8',
      description: 'Continuous integration, deployment pipelines, and build automation tools.',
      items: [
        {
          id: 'CI/CD',
          name: 'CI/CD Pipelines',
          icon: '🔄',
          color: '#38bdf8',
          description: 'Building automated CI/CD pipelines with Jenkins, GitLab CI, GitHub Actions, and more.'
        },
        {
          id: 'Deployment',
          name: 'Deployment Strategies',
          icon: '📦',
          color: '#0284c7',
          description: 'Blue-green deployments, canary releases, rolling updates, and deployment automation.'
        },
        {
          id: 'Jenkins',
          name: 'Jenkins',
          icon: '🔧',
          color: '#d62728',
          description: 'Open-source automation server for CI/CD pipelines. Pipeline as code, plugins, and Docker integration.'
        },
        {
          id: 'TeamCity',
          name: 'TeamCity',
          icon: '🏗️',
          color: '#3b82f6',
          description: 'Continuous Integration and Deployment with TeamCity by JetBrains. Build configurations, pipelines, and testing.'
        }
      ]
    },
    {
      id: 'monitoring',
      name: 'Monitoring & Observability',
      icon: '📊',
      color: '#e85d1f',
      description: 'System monitoring, metrics collection, dashboards, and production support.',
      items: [
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
          id: 'Production Support',
          name: 'Production Support',
          icon: '🛟',
          color: '#06b6d4',
          description: 'Incident management, monitoring, troubleshooting, and maintaining production systems.'
        }
      ]
    },
    {
      id: 'security',
      name: 'Security & Authentication',
      icon: '🔒',
      color: '#dc2626',
      description: 'Application security, authentication protocols, and secure coding practices.',
      items: [
        {
          id: 'Security OWASP',
          name: 'Security & OWASP',
          icon: '🔒',
          color: '#dc2626',
          description: 'Application security fundamentals, OWASP Top 10 vulnerabilities, secure coding practices, and security testing.'
        },
        {
          id: 'JWT',
          name: 'JWT (JSON Web Tokens)',
          icon: '🔑',
          color: '#8b5cf6',
          description: 'Stateless authentication tokens, token structure (header, payload, signature), signing algorithms, and security best practices.'
        },
        {
          id: 'OAuth',
          name: 'OAuth 1.0',
          icon: '🔐',
          color: '#3b82f6',
          description: 'OAuth 1.0 protocol, three-legged authentication, signature-based security, request tokens, and authorization flow.'
        },
        {
          id: 'OAuth2',
          name: 'OAuth 2.0',
          icon: '🛡️',
          color: '#10b981',
          description: 'OAuth 2.0 framework, authorization flows (authorization code, implicit, client credentials, password), access tokens, refresh tokens, and PKCE.'
        }
      ]
    },
    {
      id: 'methodology',
      name: 'Methodology & Quality',
      icon: '🏃',
      color: '#0891b2',
      description: 'Agile practices, testing strategies, and quality assurance processes.',
      items: [
        {
          id: 'Agile Scrum',
          name: 'Agile & Scrum',
          icon: '🏃',
          color: '#0891b2',
          description: 'Agile methodologies, Scrum framework, sprint planning, and team collaboration.'
        },
        {
          id: 'Testing',
          name: 'Testing & QA',
          icon: '🧪',
          color: '#0c4a6e',
          description: 'Unit testing, integration testing, E2E testing, and test automation strategies.'
        }
      ]
    },
    {
      id: 'messaging',
      name: 'Messaging & Streaming',
      icon: '📨',
      color: '#f43f5e',
      description: 'Message brokers, event streaming, and asynchronous communication systems.',
      items: [
        {
          id: 'Kafka',
          name: 'Apache Kafka',
          icon: '📊',
          color: '#f43f5e',
          description: 'Distributed event streaming platform for high-throughput, fault-tolerant messaging and real-time data pipelines.'
        },
        {
          id: 'Apache Flink',
          name: 'Apache Flink',
          icon: '⚡',
          color: '#e11d48',
          description: 'Stream processing framework for stateful computations over data streams with exactly-once semantics.'
        },
        {
          id: 'RabbitMQ',
          name: 'RabbitMQ',
          icon: '🐰',
          color: '#fb7185',
          description: 'Open-source message broker supporting multiple messaging protocols, queues, and exchange patterns.'
        },
        {
          id: 'Solace',
          name: 'Solace',
          icon: '🌐',
          color: '#be123c',
          description: 'Enterprise messaging platform for event-driven architecture, pub/sub, and message queuing.'
        },
        {
          id: 'MuleSoft',
          name: 'MuleSoft',
          icon: '🔗',
          color: '#00a1e0',
          description: 'Integration platform for connecting applications, data, and devices with APIs and microservices.'
        }
      ]
    }
  ]

  const currentItems = selectedCategory
    ? categories.find(c => c.id === selectedCategory)?.items || []
    : categories

  const { focusedIndex, itemRefs } = useKeyboardNavigation({
    items: currentItems,
    onSelect: (item) => {
      if (selectedCategory) {
        onSelectItem(item.id)
      } else {
        setSelectedCategory(item.id)
      }
    },
    onBack: selectedCategory ? () => setSelectedCategory(null) : onBack,
    enabled: true,
    gridColumns: 2,
    loop: true
  })

  const handleBack = () => {
    if (selectedCategory) {
      setSelectedCategory(null)
    } else {
      onBack()
    }
  }

  const currentCategory = categories.find(c => c.id === selectedCategory)

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={handleBack}
              style={{
                background: '#2563eb',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: '500',
                fontSize: '1rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1d4ed8'
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#2563eb'
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            >
              ← {selectedCategory ? 'Back to Categories' : 'Back to Menu'}
            </button>
            <h1 style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #93c5fd, #60a5fa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {selectedCategory ? `${currentCategory?.icon} ${currentCategory?.name}` : '🛠️ DevOps'}
            </h1>
          </div>
        </div>

        {/* Dark themed Breadcrumb */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1rem',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          border: '1px solid rgba(59, 130, 246, 0.3)'
        }}>
          <button
            onClick={() => {
              setSelectedCategory(null)
              if (!selectedCategory) onBack()
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#93c5fd',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '500',
              padding: '0.25rem 0.5rem',
              borderRadius: '4px',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.2)'
              e.currentTarget.style.color = '#bfdbfe'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#93c5fd'
            }}
          >
            <span>🛠️</span> DevOps
          </button>
          {selectedCategory && (
            <>
              <span style={{ color: '#3b82f6', fontSize: '0.9rem' }}>→</span>
              <span style={{
                color: '#e2e8f0',
                fontSize: '0.9rem',
                fontWeight: '600',
                padding: '0.25rem 0.75rem',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderRadius: '4px'
              }}>
                {currentCategory?.name}
              </span>
            </>
          )}
          {!selectedCategory && (
            <>
              <span style={{ color: '#3b82f6', fontSize: '0.9rem' }}>→</span>
              <span style={{
                color: '#e2e8f0',
                fontSize: '0.9rem',
                fontWeight: '600',
                padding: '0.25rem 0.75rem',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderRadius: '4px'
              }}>
                Categories
              </span>
            </>
          )}
        </div>

        <p style={{
          fontSize: '1.2rem',
          color: '#d1d5db',
          textAlign: 'center',
          marginBottom: '3rem',
          lineHeight: '1.8'
        }}>
          {selectedCategory
            ? currentCategory?.description
            : 'Master DevOps practices, tools, and methodologies for efficient software delivery and operations.'}
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '1.5rem'
        }}>
          {currentItems.map((item, index) => (
            <button
              key={item.id}
              ref={(el) => itemRefs.current[index] = el}
              onClick={() => {
                if (selectedCategory) {
                  onSelectItem(item.id)
                } else {
                  setSelectedCategory(item.id)
                }
              }}
              tabIndex={focusedIndex === index ? 0 : -1}
              role="link"
              aria-label={`${item.name}. ${item.description}`}
              style={{
                background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                padding: '1.5rem',
                borderRadius: '0.75rem',
                border: `2px solid ${item.color}`,
                cursor: 'pointer',
                transition: 'all 0.3s',
                transform: focusedIndex === index ? 'translateY(-0.5rem)' : 'translateY(0)',
                boxShadow: focusedIndex === index
                  ? `0 25px 50px -12px ${item.color}50`
                  : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                textAlign: 'left',
                width: '100%'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-0.5rem)'
                e.currentTarget.style.boxShadow = `0 25px 50px -12px ${item.color}50`
              }}
              onMouseLeave={(e) => {
                if (focusedIndex !== index) {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1rem'
              }}>
                <span style={{ fontSize: '2.5rem' }}>{item.icon}</span>
                <div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: '#93c5fd',
                    marginBottom: '0.25rem'
                  }}>
                    {item.name}
                  </h3>
                  {!selectedCategory && item.items && (
                    <span style={{
                      fontSize: '0.85rem',
                      color: '#9ca3af'
                    }}>
                      {item.items.length} topics
                    </span>
                  )}
                </div>
              </div>

              <p style={{
                fontSize: '0.9rem',
                color: '#d1d5db',
                lineHeight: '1.6',
                marginBottom: '1rem'
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
                paddingTop: '0.75rem',
                borderTop: '1px solid #374151'
              }}>
                <span>{selectedCategory ? 'Explore Topic' : 'View Topics'}</span>
                <span>→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DevOpsPage
