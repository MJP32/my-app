import { useState, useEffect } from 'react'
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation'
import Breadcrumb from '../components/Breadcrumb'
import CollapsibleSidebar from '../components/CollapsibleSidebar'
import { useTheme } from '../contexts/ThemeContext'

const QUESTIONS_COLORS = {
  primary: '#a78bfa',
  primaryHover: '#c4b5fd',
  bg: 'rgba(139, 92, 246, 0.1)',
  border: 'rgba(139, 92, 246, 0.3)',
  arrow: '#8b5cf6',
  hoverBg: 'rgba(139, 92, 246, 0.2)',
  topicBg: 'rgba(139, 92, 246, 0.2)'
}

const tabCategories = {
  all: { label: 'All', ids: null },
  'backend-frameworks': { label: 'Backend Frameworks', ids: ['Spring Core Questions', 'Spring Boot Questions', 'Spring Security Questions', 'Spring Data JPA Questions', 'Spring Annotations Questions', 'Hibernate Questions'] },
  'programming-languages': { label: 'Languages', ids: ['Core Java Questions', 'Java 8 Questions', 'Java 11 Questions', 'Java 15 Questions', 'Java 21 Questions', 'Java 24 Questions'] },
  databases: { label: 'Databases', ids: ['SQL Questions', 'NoSQL Questions', 'ORM Questions', 'PostgreSQL Questions', 'SQL Fundamentals Questions'] },
  'messaging-streaming': { label: 'Messaging', ids: ['Kafka Questions', 'Apache Flink Questions', 'RabbitMQ Questions', 'Solace Questions'] },
  'apis-services': { label: 'APIs & Design', ids: ['REST API Questions', 'System Design Questions'] },
  'devops-monitoring': { label: 'DevOps', ids: ['Jenkins Questions', 'TeamCity Questions', 'Prometheus Questions', 'Grafana Questions', 'Zipkin Questions', 'Actuator Questions'] },
  etrading: { label: 'eTrading', ids: ['eTrading Questions'] },
  threading: { label: 'Threading', ids: ['Threading Questions'] }
}

function Questions({ onBack, onSelectItem, initialCategory, onInitialCategoryUsed, breadcrumb }) {
  const { colors, isDark } = useTheme()
  const [activeCategory, setActiveCategory] = useState(initialCategory || 'all')

  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory)
      onInitialCategoryUsed?.()
    }
  }, [initialCategory])

  const questionItems = [
    // Backend Frameworks
    {
      id: 'Spring Core Questions',
      name: 'Spring Core',
      icon: '🌱',
      color: '#10b981',
      complexity: 'Intermediate',
      description: 'Deep dive into Spring Core concepts including IoC, dependency injection, bean lifecycle, and application context.'
    },
    {
      id: 'Spring Boot Questions',
      name: 'Spring Boot',
      icon: '🚀',
      color: '#22c55e',
      complexity: 'Intermediate',
      description: 'Auto-configuration, starters, actuators, and building production-ready microservices with Spring Boot.'
    },
    {
      id: 'Spring Security Questions',
      name: 'Spring Security',
      icon: '🔐',
      color: '#14b8a6',
      complexity: 'Advanced',
      description: 'Authentication, authorization, OAuth2, JWT tokens, and securing Spring applications.'
    },
    {
      id: 'Spring Data JPA Questions',
      name: 'Spring Data JPA',
      icon: '💾',
      color: '#06b6d4',
      complexity: 'Intermediate',
      description: 'Repository patterns, query methods, transactions, and database integration with Spring Data JPA.'
    },
    {
      id: 'Spring Annotations Questions',
      name: 'Spring Annotations',
      icon: '🏷️',
      color: '#0891b2',
      complexity: 'Intermediate',
      description: 'Essential annotations for configuration, dependency injection, web MVC, and data access.'
    },
    {
      id: 'Hibernate Questions',
      name: 'Hibernate',
      icon: '🔧',
      color: '#8b5cf6',
      complexity: 'Advanced',
      description: 'ORM fundamentals, entity mapping, caching, lazy loading, and performance optimization.'
    },
    // Programming Languages
    {
      id: 'Core Java Questions',
      name: 'Core Java',
      icon: '☕',
      color: '#f59e0b',
      complexity: 'Beginner to Advanced',
      description: 'OOP principles, collections, multithreading, exception handling, and JVM internals.'
    },
    {
      id: 'Java 8 Questions',
      name: 'Java 8',
      icon: '🎯',
      color: '#3b82f6',
      complexity: 'Intermediate',
      description: 'Lambda expressions, Stream API, functional interfaces, Optional, and date/time API.'
    },
    {
      id: 'Java 11 Questions',
      name: 'Java 11',
      icon: '🔧',
      color: '#8b5cf6',
      complexity: 'Intermediate',
      description: 'HTTP Client, local-variable syntax, String methods, and collection factory methods.'
    },
    {
      id: 'Java 15 Questions',
      name: 'Java 15',
      icon: '📝',
      color: '#10b981',
      complexity: 'Advanced',
      description: 'Text blocks, sealed classes, records, pattern matching, and hidden classes.'
    },
    {
      id: 'Java 21 Questions',
      name: 'Java 21',
      icon: '🚀',
      color: '#ec4899',
      complexity: 'Advanced',
      description: 'Virtual threads, pattern matching, record patterns, and sequenced collections.'
    },
    {
      id: 'Java 24 Questions',
      name: 'Java 24',
      icon: '🔮',
      color: '#06b6d4',
      complexity: 'Expert Level',
      description: 'Preview features, advanced pattern matching, and next-generation JVM capabilities.'
    },
    // Databases
    {
      id: 'SQL Questions',
      name: 'SQL',
      icon: '🗃️',
      color: '#3b82f6',
      complexity: 'Intermediate',
      description: 'Query optimization, joins, subqueries, window functions, indexes, and database design principles.'
    },
    {
      id: 'NoSQL Questions',
      name: 'NoSQL',
      icon: '🍃',
      color: '#10b981',
      complexity: 'Intermediate to Advanced',
      description: 'MongoDB, Redis, Cassandra, DynamoDB - document stores, key-value, column-family, and graph databases.'
    },
    {
      id: 'ORM Questions',
      name: 'ORM',
      icon: '🔗',
      color: '#8b5cf6',
      complexity: 'Intermediate',
      description: 'Object-Relational Mapping concepts, JPA, Hibernate mappings, lazy loading, caching, and N+1 problems.'
    },
    {
      id: 'PostgreSQL Questions',
      name: 'PostgreSQL',
      icon: '🐘',
      color: '#336791',
      complexity: 'Intermediate to Advanced',
      description: 'PostgreSQL-specific features, JSONB, extensions, replication, and performance tuning.'
    },
    {
      id: 'SQL Fundamentals Questions',
      name: 'SQL Fundamentals',
      icon: '📖',
      color: '#06b6d4',
      complexity: 'Beginner to Intermediate',
      description: 'Core SQL concepts: JOINs, subqueries, CTEs, window functions, and aggregates.'
    },
    // Messaging & Streaming
    {
      id: 'Kafka Questions',
      name: 'Apache Kafka',
      icon: '📨',
      color: '#ef4444',
      complexity: 'Advanced',
      description: 'Topics, partitions, consumer groups, exactly-once semantics, and Kafka Streams.'
    },
    {
      id: 'Apache Flink Questions',
      name: 'Apache Flink',
      icon: '⚡',
      color: '#f97316',
      complexity: 'Expert Level',
      description: 'Stream processing, windowing, state management, and exactly-once processing.'
    },
    {
      id: 'RabbitMQ Questions',
      name: 'RabbitMQ',
      icon: '🐰',
      color: '#ec4899',
      complexity: 'Intermediate',
      description: 'Exchanges, queues, bindings, message acknowledgment, and clustering.'
    },
    {
      id: 'Solace Questions',
      name: 'Solace',
      icon: '📡',
      color: '#a855f7',
      complexity: 'Advanced',
      description: 'Event mesh, message routing, guaranteed messaging, and enterprise integration.'
    },
    // APIs & Design
    {
      id: 'REST API Questions',
      name: 'REST API',
      icon: '🌐',
      color: '#6366f1',
      complexity: 'Intermediate',
      description: 'RESTful principles, HTTP methods, status codes, API versioning, and documentation.'
    },
    {
      id: 'System Design Questions',
      name: 'System Design',
      icon: '🏛️',
      color: '#8b5cf6',
      complexity: 'Advanced',
      description: 'Scalability, load balancing, caching, database sharding, CAP theorem, and microservices patterns.'
    },
    // DevOps & Monitoring
    {
      id: 'Jenkins Questions',
      name: 'Jenkins',
      icon: '🔨',
      color: '#f59e0b',
      complexity: 'Intermediate',
      description: 'Pipeline as code, build automation, plugins, and continuous integration practices.'
    },
    {
      id: 'TeamCity Questions',
      name: 'TeamCity',
      icon: '🏢',
      color: '#3b82f6',
      complexity: 'Intermediate',
      description: 'Build configurations, agents, build chains, and enterprise CI/CD workflows.'
    },
    {
      id: 'Prometheus Questions',
      name: 'Prometheus',
      icon: '📊',
      color: '#14b8a6',
      complexity: 'Advanced',
      description: 'Metrics collection, PromQL queries, alerting rules, and service discovery.'
    },
    {
      id: 'Grafana Questions',
      name: 'Grafana',
      icon: '📈',
      color: '#f97316',
      complexity: 'Intermediate',
      description: 'Dashboard creation, data sources, alerting, and visualization best practices.'
    },
    {
      id: 'Zipkin Questions',
      name: 'Zipkin',
      icon: '🔍',
      color: '#8b5cf6',
      complexity: 'Advanced',
      description: 'Distributed tracing, span collection, trace analysis, and performance debugging.'
    },
    {
      id: 'Actuator Questions',
      name: 'Spring Actuator',
      icon: '⚙️',
      color: '#10b981',
      complexity: 'Intermediate',
      description: 'Health checks, metrics endpoints, custom endpoints, and production readiness.'
    },
    // eTrading
    {
      id: 'eTrading Questions',
      name: 'eTrading Systems',
      icon: '📈',
      color: '#22c55e',
      complexity: 'Advanced',
      description: 'RFQ systems, order management, FIX protocol, low-latency trading, and market making.'
    },
    // Threading
    {
      id: 'Threading Questions',
      name: 'Threading & Concurrency',
      icon: '🔀',
      color: '#ec4899',
      complexity: 'Advanced',
      description: 'Race conditions, deadlocks, producer-consumer, visibility, thread pools, and Python-specific concurrency.'
    }
  ]

  const filteredItems = activeCategory === 'all'
    ? questionItems
    : questionItems.filter(item => tabCategories[activeCategory].ids.includes(item.id))

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
        ? 'linear-gradient(to bottom right, #111827, #4c1d95, #111827)'
        : 'linear-gradient(to bottom right, #f8fafc, #ede9fe, #f8fafc)',
      color: colors.textPrimary,
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        {/* Breadcrumb */}
        <Breadcrumb
          breadcrumbStack={[{ name: 'Questions', icon: '❓' }]}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={QUESTIONS_COLORS}
        />

        {/* Collapsible Sidebar for quick topic navigation */}
        <CollapsibleSidebar
          items={filteredItems}
          selectedIndex={-1}
          onSelect={(index) => onSelectItem(filteredItems[index].id)}
          title="Questions"
          getItemLabel={(item) => item.name}
          getItemIcon={(item) => item.icon}
          primaryColor={QUESTIONS_COLORS.primary}
        />

        <p style={{
          fontSize: '1.2rem',
          color: '#d1d5db',
          textAlign: 'center',
          marginBottom: '2rem',
          lineHeight: '1.8'
        }}>
          Prepare for technical interviews with comprehensive question sets covering frameworks, languages, databases, and tools.
        </p>

        {/* Category Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2rem',
          borderBottom: '2px solid #374151',
          overflowX: 'auto'
        }}>
          {Object.entries(tabCategories).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              style={{
                padding: '1rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: activeCategory === key ? '#8b5cf6' : 'transparent',
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredItems.map((item, index) => (
            <button
              key={item.id}
              ref={(el) => itemRefs.current[index] = el}
              onClick={() => onSelectItem(item.id)}
              tabIndex={focusedIndex === index ? 0 : -1}
              role="link"
              aria-label={`${item.name}. ${item.complexity}.`}
              style={{
                background: isDark ? 'linear-gradient(to bottom right, #1f2937, #111827)' : 'linear-gradient(to bottom right, #ffffff, #f9fafb)',
                padding: '1.5rem',
                borderRadius: '0.75rem',
                border: `2px solid ${item.color}`,
                cursor: 'pointer',
                transition: 'all 0.3s',
                textAlign: 'left',
                width: '100%',
                transform: focusedIndex === index ? 'translateY(-0.5rem)' : 'translateY(0)',
                boxShadow: focusedIndex === index
                  ? `0 25px 50px -12px ${item.color}50`
                  : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
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
                    color: item.color,
                    marginBottom: '0.25rem'
                  }}>
                    {item.name}
                  </h3>
                  <span style={{
                    display: 'inline-block',
                    padding: '0.2rem 0.6rem',
                    backgroundColor: item.color,
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    borderRadius: '0.25rem'
                  }}>
                    {item.complexity}
                  </span>
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
                <span>Start Questions</span>
                <span>→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Questions
