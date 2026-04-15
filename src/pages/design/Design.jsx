import { useState, useEffect } from 'react'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'
import { useTheme } from '../../contexts/ThemeContext'

const DESIGN_COLORS = {
  primary: '#c084fc',
  primaryHover: '#d8b4fe',
  bg: 'rgba(168, 85, 247, 0.1)',
  border: 'rgba(168, 85, 247, 0.3)',
  arrow: '#a855f7',
  hoverBg: 'rgba(168, 85, 247, 0.2)',
  topicBg: 'rgba(168, 85, 247, 0.2)'
}

const tabCategories = {
  all: { label: 'All', ids: null },
  patterns: { label: 'Software Patterns', ids: ['Design Patterns', 'Class', 'Module', 'Function', 'Interface'] },
  architecture: { label: 'Architecture', ids: ['System Design', 'Microservice Design Patterns', 'Event Driven Architecture', 'Domain Driven Design'] },
  interview: { label: 'Design Interview', ids: ['L3 System Design', 'L4 System Design', 'L5 System Design'] },
  concepts: { label: 'Design Topics', ids: ['Load Balancing', 'Caching Strategies', 'CAP Theorem', 'Consistency Patterns', 'Database Sharding', 'Database Replication', 'Consistent Hashing', 'Message Queues', 'CDN', 'Proxies', 'API Design', 'Scaling', 'Data Partitioning', 'SQL vs NoSQL', 'WebSockets', 'Blob Storage'] }
}

function Design({ onBack, onSelectItem, initialCategory, onInitialCategoryUsed, breadcrumb }) {
  const { colors, isDark } = useTheme()
  const [activeCategory, setActiveCategory] = useState(initialCategory || 'all')

  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory)
      onInitialCategoryUsed?.()
    }
  }, [initialCategory])

  const designItems = [
    // Software Patterns
    {
      id: 'Design Patterns',
      name: 'Design Patterns',
      icon: '🎨',
      color: '#8b5cf6',
      complexity: 'Intermediate to Advanced',
      description: 'Classic and modern software design patterns including Gang of Four patterns, architectural patterns, and enterprise integration patterns.'
    },
    {
      id: 'Class',
      name: 'Object-Oriented Design',
      icon: '🏗️',
      color: '#7c3aed',
      complexity: 'Intermediate',
      description: 'Object-oriented design principles, encapsulation, inheritance, composition, and OOP best practices.'
    },
    {
      id: 'Module',
      name: 'Module System',
      icon: '📦',
      color: '#9333ea',
      complexity: 'Intermediate',
      description: 'Java Module System (JPMS), modular application design, and dependency management.'
    },
    {
      id: 'Function',
      name: 'Functional Programming',
      icon: '⚡',
      color: '#7e22ce',
      complexity: 'Intermediate to Advanced',
      description: 'Functional programming paradigms, lambda expressions, stream processing, and immutability.'
    },
    {
      id: 'Interface',
      name: 'Interface Design',
      icon: '🔌',
      color: '#6b21a8',
      complexity: 'Intermediate',
      description: 'Contract programming with interfaces, abstraction, polymorphism, and API design principles.'
    },
    // Architecture
    {
      id: 'System Design',
      name: 'System Design',
      icon: '⚙️',
      color: '#a855f7',
      complexity: 'Advanced',
      description: 'Large-scale system design, distributed systems, scalability, reliability, and architectural decision-making.'
    },
    {
      id: 'Microservice Design Patterns',
      name: 'Microservice Patterns',
      icon: '🔷',
      color: '#6366f1',
      complexity: 'Advanced',
      description: 'Microservices architecture patterns including API Gateway, Circuit Breaker, Service Discovery, and Event Sourcing.'
    },
    {
      id: 'Event Driven Architecture',
      name: 'Event Driven Architecture',
      icon: '📡',
      color: '#ec4899',
      complexity: 'Advanced',
      description: 'Event-driven systems, message queuing, pub/sub patterns, event sourcing, CQRS, and asynchronous communication.'
    },
    {
      id: 'Domain Driven Design',
      name: 'Domain Driven Design',
      icon: '🏛️',
      color: '#14b8a6',
      complexity: 'Advanced',
      description: 'Strategic and tactical patterns for complex domain modeling including bounded contexts, aggregates, entities, value objects, and ubiquitous language.'
    },
    // System Design Interview
    {
      id: 'L3 System Design',
      name: 'L3 Level (Junior)',
      icon: '🌱',
      color: '#22c55e',
      complexity: 'Entry Level',
      description: 'Basic object-oriented design questions, simple API design, and data structure choice discussions. Perfect for new graduates and junior engineers.'
    },
    {
      id: 'L4 System Design',
      name: 'L4 Level (Mid)',
      icon: '🚀',
      color: '#3b82f6',
      complexity: 'Intermediate',
      description: 'Design URL shortener, basic chat application, social media feed, file storage system, web crawler, and parking lot system.'
    },
    {
      id: 'L5 System Design',
      name: 'L5-L6+ Level (Senior)',
      icon: '⭐',
      color: '#a855f7',
      complexity: 'Advanced',
      description: 'Design YouTube, Google Search, Google Maps, distributed cache, Google Drive, Gmail, Google Photos, Google Docs, rate limiter, notification system, and WhatsApp.'
    },
    // System Design Topics
    {
      id: 'Load Balancing',
      name: 'Load Balancing',
      icon: '⚖️',
      color: '#10b981',
      complexity: 'Intermediate',
      description: 'Distribute incoming traffic across multiple servers to ensure high availability and reliability. Learn about L4/L7 load balancers, algorithms (round-robin, least connections, IP hash), health checks, and sticky sessions.'
    },
    {
      id: 'Caching Strategies',
      name: 'Caching Strategies',
      icon: '💾',
      color: '#059669',
      complexity: 'Intermediate',
      description: 'Speed up data retrieval and reduce database load using caching. Covers cache-aside, write-through, write-behind patterns, cache invalidation, TTL, eviction policies (LRU, LFU), and distributed caching with Redis/Memcached.'
    },
    {
      id: 'CAP Theorem',
      name: 'CAP Theorem',
      icon: '🔺',
      color: '#047857',
      complexity: 'Intermediate',
      description: 'Understand the fundamental trade-offs in distributed systems: Consistency, Availability, and Partition Tolerance. Learn when to choose CP vs AP systems and real-world examples of each approach.'
    },
    {
      id: 'Consistency Patterns',
      name: 'Consistency Patterns',
      icon: '🔄',
      color: '#065f46',
      complexity: 'Advanced',
      description: 'Deep dive into consistency models: strong consistency, eventual consistency, causal consistency, and read-your-writes. Understand quorum-based systems, vector clocks, and conflict resolution strategies.'
    },
    {
      id: 'Database Sharding',
      name: 'Database Sharding',
      icon: '🗂️',
      color: '#0d9488',
      complexity: 'Advanced',
      description: 'Horizontally partition data across multiple database instances. Learn sharding strategies (hash-based, range-based, geographic), shard key selection, cross-shard queries, and rebalancing techniques.'
    },
    {
      id: 'Database Replication',
      name: 'Database Replication',
      icon: '📋',
      color: '#14b8a6',
      complexity: 'Intermediate',
      description: 'Replicate data across multiple database nodes for fault tolerance and read scaling. Covers master-slave, master-master replication, synchronous vs asynchronous replication, and handling replication lag.'
    },
    {
      id: 'Consistent Hashing',
      name: 'Consistent Hashing',
      icon: '🎯',
      color: '#2dd4bf',
      complexity: 'Advanced',
      description: 'Distribute data evenly across nodes while minimizing redistribution when nodes join or leave. Essential for distributed caches, databases, and load balancers. Learn virtual nodes and implementation details.'
    },
    {
      id: 'Message Queues',
      name: 'Message Queues',
      icon: '📨',
      color: '#f59e0b',
      complexity: 'Intermediate',
      description: 'Decouple system components with asynchronous communication. Covers message brokers (Kafka, RabbitMQ, SQS), delivery guarantees (at-most-once, at-least-once, exactly-once), ordering, and dead letter queues.'
    },
    {
      id: 'CDN',
      name: 'Content Delivery Network',
      icon: '🌐',
      color: '#d97706',
      complexity: 'Intermediate',
      description: 'Serve static content from edge servers geographically close to users. Learn push vs pull CDNs, cache invalidation, origin shield, and optimizing for performance with proper cache headers.'
    },
    {
      id: 'Proxies',
      name: 'Proxies',
      icon: '🔀',
      color: '#b45309',
      complexity: 'Intermediate',
      description: 'Intermediary servers that handle requests between clients and servers. Covers forward proxies, reverse proxies (Nginx, HAProxy), API gateways, and use cases like caching, security, and load balancing.'
    },
    {
      id: 'API Design',
      name: 'API Design',
      icon: '🔌',
      color: '#78350f',
      complexity: 'Intermediate',
      description: 'Design clean, maintainable APIs. Covers REST principles, GraphQL, gRPC, versioning strategies, pagination, rate limiting, authentication, error handling, and documentation best practices.'
    },
    {
      id: 'Scaling',
      name: 'Scaling Strategies',
      icon: '📈',
      color: '#3b82f6',
      complexity: 'Intermediate',
      description: 'Scale systems to handle growing load. Covers vertical vs horizontal scaling, stateless design, auto-scaling, capacity planning, and identifying bottlenecks through performance testing.'
    },
    {
      id: 'Data Partitioning',
      name: 'Data Partitioning',
      icon: '🧩',
      color: '#2563eb',
      complexity: 'Advanced',
      description: 'Divide data into smaller, manageable pieces. Learn horizontal (sharding) vs vertical partitioning, partition keys, hotspots, and strategies for different data access patterns.'
    },
    {
      id: 'SQL vs NoSQL',
      name: 'SQL vs NoSQL',
      icon: '🗄️',
      color: '#1d4ed8',
      complexity: 'Intermediate',
      description: 'Choose the right database for your use case. Compare relational databases (ACID, joins, normalization) with NoSQL options (document, key-value, column-family, graph) and their trade-offs.'
    },
    {
      id: 'WebSockets',
      name: 'WebSockets',
      icon: '🔗',
      color: '#1e40af',
      complexity: 'Intermediate',
      description: 'Enable real-time, bidirectional communication between clients and servers. Learn WebSocket protocol, connection management, scaling with pub/sub, and alternatives like Server-Sent Events and long polling.'
    },
    {
      id: 'Blob Storage',
      name: 'Blob Storage',
      icon: '📦',
      color: '#1e3a8a',
      complexity: 'Intermediate',
      description: 'Store and serve large binary objects like images, videos, and files. Covers object storage services (S3, GCS, Azure Blob), access patterns, lifecycle policies, and integration with CDNs.'
    }
  ]

  const filteredItems = activeCategory === 'all'
    ? designItems
    : designItems.filter(item => tabCategories[activeCategory].ids.includes(item.id))

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
        ? 'linear-gradient(to bottom right, #111827, #581c87, #111827)'
        : 'linear-gradient(to bottom right, #f8fafc, #f3e8ff, #f8fafc)',
      color: colors.textPrimary,
      padding: '1.5rem'
    }}>
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto'
      }}>
        {/* Breadcrumb */}
        <Breadcrumb
          breadcrumbStack={[{ name: 'Design', icon: '🎨' }]}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={DESIGN_COLORS}
        />

        {/* Collapsible Sidebar for quick topic navigation */}
        <CollapsibleSidebar
          items={filteredItems}
          selectedIndex={-1}
          onSelect={(index) => onSelectItem(filteredItems[index].id)}
          title="Topics"
          getItemLabel={(item) => item.name}
          getItemIcon={(item) => item.icon}
          primaryColor={DESIGN_COLORS.primary}
        />

        <p style={{
          fontSize: '1.2rem',
          color: isDark ? '#d1d5db' : '#4b5563',
          textAlign: 'center',
          marginBottom: '2rem',
          lineHeight: '1.8'
        }}>
          Master software design patterns, architectural principles, and best practices for building scalable, maintainable systems.
        </p>

        {/* Category Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2rem',
          borderBottom: isDark ? '2px solid #374151' : '2px solid #e5e7eb',
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
                backgroundColor: activeCategory === key ? '#a855f7' : 'transparent',
                color: activeCategory === key ? 'white' : (isDark ? '#9ca3af' : '#6b7280'),
                border: 'none',
                borderRadius: '8px 8px 0 0',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== key) {
                  e.target.style.backgroundColor = isDark ? '#374151' : '#e5e7eb'
                  e.target.style.color = isDark ? '#d1d5db' : '#374151'
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== key) {
                  e.target.style.backgroundColor = 'transparent'
                  e.target.style.color = isDark ? '#9ca3af' : '#6b7280'
                }
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Topic Cards Grid */}
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
                background: isDark
                  ? 'linear-gradient(to bottom right, #1f2937, #111827)'
                  : 'linear-gradient(to bottom right, #ffffff, #f9fafb)',
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
                    color: isDark ? '#c084fc' : '#7c3aed',
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
                color: isDark ? '#d1d5db' : '#4b5563',
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
                borderTop: isDark ? '1px solid #374151' : '1px solid #e5e7eb'
              }}>
                <span>Open Topic</span>
                <span>→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Design
