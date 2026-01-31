import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation'
import Breadcrumb from '../components/Breadcrumb'

const FRAMEWORK_COLORS = {
  primary: '#4ade80',
  primaryHover: '#86efac',
  bg: 'rgba(16, 185, 129, 0.1)',
  border: 'rgba(16, 185, 129, 0.3)',
  arrow: '#10b981',
  hoverBg: 'rgba(16, 185, 129, 0.2)',
  topicBg: 'rgba(16, 185, 129, 0.2)'
}

function Frameworks({ onBack, onSelectItem, breadcrumb }) {
  const frameworkItems = [
    {
      id: 'Spring',
      name: 'Spring Framework',
      icon: '🌱',
      color: '#10b981',
      description: 'Comprehensive Spring Framework covering IoC, AOP, Spring MVC, and enterprise application development.'
    },
    {
      id: 'Spring Boot',
      name: 'Spring Boot',
      icon: '🚀',
      color: '#059669',
      description: 'Spring Boot for rapid application development with auto-configuration and production-ready features.'
    },
    {
      id: 'Hibernate',
      name: 'Hibernate ORM',
      icon: '🔧',
      color: '#8b5cf6',
      description: 'Object-Relational Mapping framework for Java, covering entity mappings, caching, and JPA implementation.'
    },
    {
      id: 'REST API',
      name: 'REST API Design',
      icon: '🔌',
      color: '#047857',
      description: 'RESTful API design principles, best practices, versioning, and documentation with Spring.'
    },
    {
      id: 'gRPC',
      name: 'gRPC',
      icon: '⚡',
      color: '#3b82f6',
      description: 'High-performance RPC framework using Protocol Buffers for microservices communication.'
    },
    {
      id: 'SOAP',
      name: 'SOAP Web Services',
      icon: '📡',
      color: '#f59e0b',
      description: 'SOAP protocol, WSDL, XML messaging, and enterprise web services integration.'
    },
    {
      id: 'React',
      name: 'React',
      icon: '⚛️',
      color: '#06b6d4',
      description: 'Modern JavaScript library for building user interfaces with components, hooks, and state management.'
    },
    {
      id: 'Dependency Injection',
      name: 'Dependency Injection',
      icon: '💉',
      color: '#ec4899',
      description: 'Dependency Injection patterns and IoC containers for loosely coupled, testable applications.'
    },
    {
      id: 'Zipkin',
      name: 'Zipkin',
      icon: '🔍',
      color: '#8b5cf6',
      description: 'Distributed tracing system for monitoring and troubleshooting microservices architectures.'
    },
    {
      id: 'Actuator',
      name: 'Spring Boot Actuator',
      icon: '📊',
      color: '#14b8a6',
      description: 'Production-ready monitoring and management endpoints for Spring Boot applications.'
    }
  ]

  const { focusedIndex, itemRefs } = useKeyboardNavigation({
    items: frameworkItems,
    onSelect: (item) => onSelectItem(item.id),
    onBack,
    enabled: true,
    gridColumns: 2,
    loop: true
  })

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #064e3b, #111827)',
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
              onClick={onBack}
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
              ← Back to Menu
            </button>
            <h1 style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #6ee7b7, #34d399)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              🌱 Frameworks
            </h1>
          </div>
        </div>

        {/* Breadcrumb */}
        <Breadcrumb
          breadcrumbStack={[
            { name: 'Frameworks', icon: '🌱' }
          ]}
          colors={FRAMEWORK_COLORS}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
        />

        <p style={{
          fontSize: '1.2rem',
          color: '#d1d5db',
          textAlign: 'center',
          marginBottom: '3rem',
          lineHeight: '1.8'
        }}>
          Master enterprise Java frameworks for building robust, scalable applications with Spring ecosystem.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '1.5rem'
        }}>
          {frameworkItems.map((item, index) => (
            <button
              key={item.id}
              ref={(el) => itemRefs.current[index] = el}
              onClick={() => onSelectItem(item.id)}
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
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#6ee7b7',
                  marginBottom: '0.25rem'
                }}>
                  {item.name}
                </h3>
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
                <span>Explore Topic</span>
                <span>→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Frameworks
