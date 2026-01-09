import { useState } from 'react'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'
import Breadcrumb from '../../components/Breadcrumb'

function DevOpsPage({ onBack, onSelectItem, breadcrumb }) {
  const [selectedCategory, setSelectedCategory] = useState(null)

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
      padding: '2rem',
      maxWidth: '1400px',
      margin: '0 auto',
      background: 'linear-gradient(135deg, #0c4a6e 0%, #075985 50%, #0369a1 100%)',
      minHeight: '100vh'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <button
          onClick={handleBack}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            backgroundColor: 'rgba(255,255,255,0.15)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.25)'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.15)'}
        >
          ← {selectedCategory ? 'Back to Categories' : 'Back to Menu'}
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: 'white',
          margin: 0,
          textShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>
          {selectedCategory ? `${currentCategory?.icon} ${currentCategory?.name}` : '🛠️ DevOps'}
        </h1>
        <div style={{ width: '180px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      <p style={{
        fontSize: '1.2rem',
        color: 'rgba(255,255,255,0.9)',
        textAlign: 'center',
        marginBottom: '3rem',
        lineHeight: '1.8'
      }}>
        {selectedCategory
          ? currentCategory?.description
          : 'Master DevOps practices, tools, and methodologies for efficient software delivery and operations.'}
      </p>

      {!selectedCategory && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          {categories.map(cat => (
            <span
              key={cat.id}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '20px',
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.8)'
              }}
            >
              {cat.items.length} topics
            </span>
          ))}
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '2rem'
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
              background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
              padding: '2rem',
              borderRadius: '16px',
              border: `2px solid ${item.color}80`,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: focusedIndex === index ? 'translateY(-8px)' : 'translateY(0)',
              boxShadow: focusedIndex === index
                ? `0 0 0 4px ${item.color}60, 0 20px 40px rgba(0,0,0,0.3)`
                : '0 8px 32px rgba(0,0,0,0.2)',
              textAlign: 'left',
              width: '100%',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)'
              e.currentTarget.style.boxShadow = `0 0 0 4px ${item.color}60, 0 20px 40px rgba(0,0,0,0.3)`
              e.currentTarget.style.borderColor = item.color
            }}
            onMouseLeave={(e) => {
              if (focusedIndex !== index) {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)'
                e.currentTarget.style.borderColor = `${item.color}80`
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
                lineHeight: 1,
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
              }}>
                {item.icon}
              </div>
              <div>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: '700',
                  color: 'white',
                  margin: 0,
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                }}>
                  {item.name}
                </h3>
                {!selectedCategory && item.items && (
                  <span style={{
                    fontSize: '0.85rem',
                    color: 'rgba(255,255,255,0.7)',
                    marginTop: '0.25rem',
                    display: 'block'
                  }}>
                    {item.items.length} topics
                  </span>
                )}
              </div>
            </div>

            <p style={{
              fontSize: '0.95rem',
              color: 'rgba(255,255,255,0.8)',
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
              <span>{selectedCategory ? 'Explore Topic' : 'View Topics'}</span>
              <span>→</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default DevOpsPage
