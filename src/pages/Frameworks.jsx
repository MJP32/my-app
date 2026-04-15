import { useState, useEffect } from 'react'
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation'
import Breadcrumb from '../components/Breadcrumb'
import CollapsibleSidebar from '../components/CollapsibleSidebar'
import { useTheme } from '../contexts/ThemeContext'

const FRAMEWORK_COLORS = {
  primary: '#4ade80',
  primaryHover: '#86efac',
  bg: 'rgba(16, 185, 129, 0.1)',
  border: 'rgba(16, 185, 129, 0.3)',
  arrow: '#10b981',
  hoverBg: 'rgba(16, 185, 129, 0.2)',
  topicBg: 'rgba(16, 185, 129, 0.2)'
}

const categories = {
  all: { label: 'All', ids: null },
  spring: { label: 'Spring Ecosystem', ids: ['Spring', 'Spring Boot', 'Hibernate', 'Dependency Injection', 'Actuator', 'Zipkin', 'Spring Batch', 'Spring Security', 'Ehcache'] },
  api: { label: 'API Development', ids: ['REST API', 'gRPC', 'SOAP', 'GraphQL'] },
  frontend: { label: 'Frontend', ids: ['React', 'Angular'] }
}

function Frameworks({ onBack, onSelectItem, breadcrumb, initialCategory, onInitialCategoryUsed }) {
  const { colors, isDark } = useTheme()
  const [activeCategory, setActiveCategory] = useState(initialCategory || 'all')

  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory)
      onInitialCategoryUsed?.()
    }
  }, [initialCategory])

  const frameworkItems = [
    // Spring Ecosystem
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
      id: 'Dependency Injection',
      name: 'Dependency Injection',
      icon: '💉',
      color: '#ec4899',
      description: 'Dependency Injection patterns and IoC containers for loosely coupled, testable applications.'
    },
    {
      id: 'Actuator',
      name: 'Spring Boot Actuator',
      icon: '📊',
      color: '#14b8a6',
      description: 'Production-ready monitoring and management endpoints for Spring Boot applications.'
    },
    {
      id: 'Zipkin',
      name: 'Zipkin',
      icon: '🔍',
      color: '#8b5cf6',
      description: 'Distributed tracing system for monitoring and troubleshooting microservices architectures.'
    },
    {
      id: 'Spring Batch',
      name: 'Spring Batch',
      icon: '⚙️',
      color: '#f59e0b',
      description: 'Robust batch processing framework for enterprise jobs, chunk-oriented processing, readers, processors, and writers.'
    },
    {
      id: 'Spring Security',
      name: 'Spring Security',
      icon: '🛡️',
      color: '#ef4444',
      description: 'Comprehensive authentication and authorization framework for securing Spring applications with JWT, OAuth2, CSRF protection, and method-level security.'
    },
    {
      id: 'Ehcache',
      name: 'Ehcache',
      icon: '💾',
      color: '#f97316',
      description: 'Java-based caching library with tiered storage, Spring Cache integration, Hibernate L2 cache support, and distributed clustering.'
    },
    // API Development
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
      id: 'GraphQL',
      name: 'GraphQL',
      icon: '◈',
      color: '#e535ab',
      description: 'Query language for APIs that lets clients request exactly the data they need, with strong typing, introspection, and real-time subscriptions.'
    },
    // Frontend
    {
      id: 'React',
      name: 'React',
      icon: '⚛️',
      color: '#06b6d4',
      description: 'Modern JavaScript library for building user interfaces with components, hooks, and state management.'
    },
    {
      id: 'Angular',
      name: 'Angular',
      icon: '🅰️',
      color: '#dd0031',
      description: 'Full-featured TypeScript framework for building scalable single-page applications with components, services, and dependency injection.'
    }
  ]

  const filteredItems = activeCategory === 'all'
    ? frameworkItems
    : frameworkItems.filter(item => categories[activeCategory].ids.includes(item.id))

  const { focusedIndex, itemRefs } = useKeyboardNavigation({
    items: filteredItems,
    onSelect: (item) => onSelectItem(item.id),
    onBack,
    enabled: true,
    gridColumns: 2,
    loop: true
  })

  return (
    <div style={{
      minHeight: '100vh',
      background: isDark
        ? 'linear-gradient(to bottom right, #111827, #064e3b, #111827)'
        : 'linear-gradient(to bottom right, #f8fafc, #d1fae5, #f8fafc)',
      color: colors.textPrimary,
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        {/* Breadcrumb */}
        <Breadcrumb
          breadcrumbStack={[
            { name: 'Frameworks', icon: '🌱' }
          ]}
          colors={FRAMEWORK_COLORS}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
        />

        {/* Collapsible Sidebar for quick topic navigation */}
        <CollapsibleSidebar
          items={filteredItems}
          selectedIndex={-1}
          onSelect={(index) => onSelectItem(filteredItems[index].id)}
          title="Frameworks"
          getItemLabel={(item) => item.name}
          getItemIcon={(item) => item.icon}
          primaryColor={FRAMEWORK_COLORS.primary}
        />

        <p style={{
          fontSize: '1.2rem',
          color: '#d1d5db',
          textAlign: 'center',
          marginBottom: '2rem',
          lineHeight: '1.8'
        }}>
          Master enterprise Java frameworks for building robust, scalable applications with Spring ecosystem.
        </p>

        {/* Category Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2rem',
          borderBottom: '2px solid #374151',
          overflowX: 'auto'
        }}>
          {Object.entries(categories).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              style={{
                padding: '1rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: activeCategory === key ? '#10b981' : 'transparent',
                color: activeCategory === key ? 'white' : '#9ca3af',
                border: 'none',
                borderRadius: '8px 8px 0 0',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== key) {
                  e.target.style.backgroundColor = '#374151'
                  e.target.style.color = '#d1d5db'
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== key) {
                  e.target.style.backgroundColor = 'transparent'
                  e.target.style.color = '#9ca3af'
                }
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredItems.map((item, index) => (
            <button
              key={item.id}
              ref={(el) => itemRefs.current[index] = el}
              onClick={() => onSelectItem(item.id)}
              tabIndex={focusedIndex === index ? 0 : -1}
              role="link"
              aria-label={`${item.name}. ${item.description}`}
              style={{
                background: isDark ? 'linear-gradient(to bottom right, #1f2937, #111827)' : 'linear-gradient(to bottom right, #ffffff, #f9fafb)',
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
