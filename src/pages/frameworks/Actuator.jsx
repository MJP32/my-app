import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

function Actuator({ onBack, breadcrumb }) {
  const [activeSection, setActiveSection] = useState('overview')

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #064e3b, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
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
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
        >
          Back to Frameworks
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          background: 'linear-gradient(to right, #6ee7b7, #34d399)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          margin: 0
        }}>
          Spring Boot Actuator
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

      <p style={{
        fontSize: '1.1rem',
        color: '#d1d5db',
        marginBottom: '2rem',
        lineHeight: '1.6'
      }}>
        Production-ready features to help monitor and manage Spring Boot applications
      </p>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '2rem',
        borderBottom: '2px solid #374151',
        overflowX: 'auto'
      }}>
        {['overview', 'endpoints', 'metrics', 'health', 'configuration'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSection(tab)}
            style={{
              padding: '1rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              backgroundColor: activeSection === tab ? '#10b981' : 'transparent',
              color: activeSection === tab ? 'white' : '#9ca3af',
              border: 'none',
              borderRadius: '8px 8px 0 0',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textTransform: 'capitalize',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              if (activeSection !== tab) {
                e.target.style.backgroundColor = '#374151'
                e.target.style.color = '#d1d5db'
              }
            }}
            onMouseLeave={(e) => {
              if (activeSection !== tab) {
                e.target.style.backgroundColor = 'transparent'
                e.target.style.color = '#9ca3af'
              }
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Section */}
      {activeSection === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              What is Spring Boot Actuator?
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Spring Boot Actuator provides production-ready features for monitoring and managing Spring Boot applications.
              It includes built-in endpoints for health checks, metrics, application info, and more.
            </p>
            <div style={{
              backgroundColor: '#064e3b',
              padding: '1rem',
              borderRadius: '8px',
              borderLeft: '4px solid #10b981'
            }}>
              <p style={{ fontSize: '0.95rem', color: '#6ee7b7', margin: 0 }}>
                <strong>Key Benefit:</strong> Out-of-the-box observability without writing custom monitoring code
              </p>
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              Key Features
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {[
                { icon: '📊', title: 'Metrics Collection', desc: 'JVM metrics, HTTP request metrics, database connection pool stats' },
                { icon: '💚', title: 'Health Checks', desc: 'Monitor application health and dependencies status' },
                { icon: '📝', title: 'Application Info', desc: 'Build info, git commit details, custom application metadata' },
                { icon: '⚙️', title: 'Configuration', desc: 'View application configuration and environment properties' },
                { icon: '🔍', title: 'Auditing', desc: 'Track security events and user actions' },
                { icon: '🎯', title: 'HTTP Trace', desc: 'View recent HTTP requests and responses' }
              ].map((feature, index) => (
                <div key={index} style={{
                  backgroundColor: '#1f2937',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: '1px solid #374151'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{feature.icon}</div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#d1d5db', marginBottom: '0.5rem' }}>
                    {feature.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#9ca3af', margin: 0 }}>
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Endpoints Section */}
      {activeSection === 'endpoints' && (
        <div style={{
          background: 'linear-gradient(to bottom right, #1f2937, #111827)',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid #374151'
        }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
            Common Actuator Endpoints
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { endpoint: '/actuator/health', method: 'GET', desc: 'Shows application health status', color: '#10b981' },
              { endpoint: '/actuator/info', method: 'GET', desc: 'Display application information', color: '#3b82f6' },
              { endpoint: '/actuator/metrics', method: 'GET', desc: 'List all available metrics', color: '#8b5cf6' },
              { endpoint: '/actuator/metrics/{name}', method: 'GET', desc: 'Get specific metric details', color: '#8b5cf6' },
              { endpoint: '/actuator/env', method: 'GET', desc: 'Show environment properties', color: '#f59e0b' },
              { endpoint: '/actuator/beans', method: 'GET', desc: 'List all Spring beans', color: '#06b6d4' },
              { endpoint: '/actuator/mappings', method: 'GET', desc: 'Display all @RequestMapping paths', color: '#ec4899' },
              { endpoint: '/actuator/prometheus', method: 'GET', desc: 'Prometheus-formatted metrics', color: '#ef4444' }
            ].map((item, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                backgroundColor: '#1f2937',
                borderRadius: '8px',
                border: '1px solid #374151'
              }}>
                <div style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: item.color,
                  color: 'white',
                  borderRadius: '6px',
                  fontWeight: '600',
                  fontSize: '0.875rem'
                }}>
                  {item.method}
                </div>
                <div style={{ flex: 1 }}>
                  <code style={{
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    color: '#6ee7b7',
                    backgroundColor: '#064e3b',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px'
                  }}>
                    {item.endpoint}
                  </code>
                  <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: '0.25rem 0 0 0' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Metrics Section */}
      {activeSection === 'metrics' && (
        <div style={{
          background: 'linear-gradient(to bottom right, #1f2937, #111827)',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid #374151'
        }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
            Available Metrics
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            {[
              { category: 'JVM Metrics', metrics: ['jvm.memory.used', 'jvm.memory.max', 'jvm.gc.pause', 'jvm.threads.live'] },
              { category: 'HTTP Metrics', metrics: ['http.server.requests', 'http.server.requests.count', 'http.server.requests.max'] },
              { category: 'Database Metrics', metrics: ['jdbc.connections.active', 'jdbc.connections.max', 'hikaricp.connections.usage'] },
              { category: 'System Metrics', metrics: ['system.cpu.usage', 'system.load.average.1m', 'process.uptime'] }
            ].map((group, index) => (
              <div key={index} style={{
                backgroundColor: '#1f2937',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid #374151'
              }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#d1d5db', marginBottom: '1rem' }}>
                  {group.category}
                </h3>
                <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                  {group.metrics.map((metric, idx) => (
                    <li key={idx} style={{ fontSize: '0.9rem', color: '#9ca3af', marginBottom: '0.5rem' }}>
                      <code style={{ backgroundColor: '#064e3b', color: '#6ee7b7', padding: '0.125rem 0.375rem', borderRadius: '3px' }}>
                        {metric}
                      </code>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Health Section */}
      {activeSection === 'health' && (
        <div style={{
          background: 'linear-gradient(to bottom right, #1f2937, #111827)',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid #374151'
        }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
            Health Indicators
          </h2>
          <p style={{ fontSize: '1rem', color: '#9ca3af', marginBottom: '1.5rem' }}>
            Actuator automatically configures health indicators based on dependencies in your classpath:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            {[
              { name: 'Database', indicator: 'db', status: 'UP' },
              { name: 'Disk Space', indicator: 'diskSpace', status: 'UP' },
              { name: 'Redis', indicator: 'redis', status: 'UP' },
              { name: 'RabbitMQ', indicator: 'rabbit', status: 'UP' },
              { name: 'Elasticsearch', indicator: 'elasticsearch', status: 'UP' },
              { name: 'MongoDB', indicator: 'mongo', status: 'UP' }
            ].map((health, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                backgroundColor: '#064e3b',
                borderRadius: '8px',
                border: '2px solid #10b981'
              }}>
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: '600', color: '#d1d5db' }}>{health.name}</div>
                  <code style={{ fontSize: '0.8rem', color: '#9ca3af' }}>{health.indicator}</code>
                </div>
                <div style={{
                  padding: '0.25rem 0.75rem',
                  backgroundColor: '#10b981',
                  color: 'white',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  {health.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Configuration Section */}
      {activeSection === 'configuration' && (
        <div style={{
          background: 'linear-gradient(to bottom right, #1f2937, #111827)',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid #374151'
        }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
            Configuration Example
          </h2>
          <div style={{
            backgroundColor: '#1f2937',
            color: '#e5e7eb',
            padding: '1.5rem',
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '0.9rem',
            overflowX: 'auto'
          }}>
            <pre style={{ margin: 0 }}>{`# application.yml
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
      base-path: /actuator

  endpoint:
    health:
      show-details: when-authorized
      probes:
        enabled: true

  metrics:
    export:
      prometheus:
        enabled: true
    tags:
      application: \${spring.application.name}
      environment: \${spring.profiles.active}

# Enable specific endpoints
info:
  app:
    name: My Application
    version: 1.0.0
    description: Production Spring Boot App`}</pre>
          </div>

          <div style={{
            marginTop: '1.5rem',
            backgroundColor: '#064e3b',
            padding: '1rem',
            borderRadius: '8px',
            borderLeft: '4px solid #10b981'
          }}>
            <p style={{ fontSize: '0.95rem', color: '#6ee7b7', margin: 0 }}>
              <strong>Security Note:</strong> Always secure your actuator endpoints in production! Use Spring Security to restrict access.
            </p>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default Actuator
