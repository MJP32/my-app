import { useState, useEffect } from 'react'

function Design({ onBack, onSelectItem, initialCategory }) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || null)

  // Update selectedCategory when initialCategory prop changes
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory)
    }
  }, [initialCategory])

  const categories = [
    {
      id: 'patterns',
      name: 'Software Patterns',
      icon: '🎨',
      color: '#8b5cf6',
      description: 'Classic software design patterns including Gang of Four patterns, object-oriented design principles, and functional programming paradigms.',
      topics: [
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
        }
      ]
    },
    {
      id: 'architecture',
      name: 'Architecture',
      icon: '🏛️',
      color: '#6366f1',
      description: 'Large-scale system architecture, distributed systems design, and architectural patterns for building scalable applications.',
      topics: [
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
        }
      ]
    },
    {
      id: 'interview',
      name: 'System Design Interview',
      icon: '🎯',
      color: '#f97316',
      description: 'System design interview questions organized by experience level. Progress from basic OOD and API design to complex distributed systems like YouTube and Google Search.',
      topics: [
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
        }
      ]
    },
    {
      id: 'concepts',
      name: 'System Design Topics',
      icon: '🧠',
      color: '#10b981',
      description: 'Core system design concepts and building blocks for designing scalable, reliable distributed systems. Master these fundamentals before tackling complex system design interviews.',
      topics: [
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
    }
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #581c87, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
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
              background: 'linear-gradient(to right, #a855f7, #c084fc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {selectedCategory
                ? `${categories.find(c => c.id === selectedCategory)?.icon} ${categories.find(c => c.id === selectedCategory)?.name}`
                : '🎨 Design & Architecture'}
            </h1>
          </div>
        </div>

        {/* Dark themed Breadcrumb */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1rem',
          backgroundColor: 'rgba(168, 85, 247, 0.1)',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          border: '1px solid rgba(168, 85, 247, 0.3)'
        }}>
          <button
            onClick={onBack}
            style={{
              background: 'none',
              border: 'none',
              color: '#c084fc',
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
              e.currentTarget.style.backgroundColor = 'rgba(168, 85, 247, 0.2)'
              e.currentTarget.style.color = '#d8b4fe'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#c084fc'
            }}
          >
            <span>🎨</span> Design
          </button>
          {selectedCategory && (
            <>
              <span style={{ color: '#a855f7', fontSize: '0.9rem' }}>→</span>
              <button
                onClick={() => setSelectedCategory(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#c084fc',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(168, 85, 247, 0.2)'
                  e.currentTarget.style.color = '#d8b4fe'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = '#c084fc'
                }}
              >
                {categories.find(c => c.id === selectedCategory)?.name}
              </button>
            </>
          )}
          <span style={{ color: '#a855f7', fontSize: '0.9rem' }}>→</span>
          <span style={{
            color: '#e2e8f0',
            fontSize: '0.9rem',
            fontWeight: '600',
            padding: '0.25rem 0.75rem',
            backgroundColor: 'rgba(168, 85, 247, 0.2)',
            borderRadius: '4px'
          }}>
            {selectedCategory ? 'Topics' : 'Design & Architecture'}
          </span>
        </div>

        <p style={{
          fontSize: '1.2rem',
          color: '#d1d5db',
          textAlign: 'center',
          marginBottom: '3rem',
          lineHeight: '1.8'
        }}>
          {selectedCategory
            ? categories.find(c => c.id === selectedCategory)?.description
            : 'Master software design patterns, architectural principles, and best practices for building scalable, maintainable systems.'}
        </p>

        {/* Categories View */}
        {!selectedCategory && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                  padding: '2rem',
                  borderRadius: '0.75rem',
                  border: `2px solid ${category.color}`,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  textAlign: 'left',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-0.5rem)'
                  e.currentTarget.style.boxShadow = `0 25px 50px -12px ${category.color}40`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <span style={{ fontSize: '2.5rem' }}>{category.icon}</span>
                  <div>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: category.color,
                      marginBottom: '0.25rem'
                    }}>
                      {category.name}
                    </h3>
                    <span style={{
                      fontSize: '0.875rem',
                      color: '#9ca3af'
                    }}>
                      {category.topics.length} {category.topics.length === 1 ? 'topic' : 'topics'}
                    </span>
                  </div>
                </div>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#d1d5db',
                  lineHeight: '1.6',
                  marginBottom: '1rem'
                }}>
                  {category.description}
                </p>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  {category.topics.slice(0, 3).map(topic => (
                    <span
                      key={topic.id}
                      style={{
                        padding: '0.25rem 0.5rem',
                        backgroundColor: '#374151',
                        borderRadius: '0.25rem',
                        fontSize: '0.75rem',
                        color: '#d1d5db'
                      }}
                    >
                      {topic.name}
                    </span>
                  ))}
                  {category.topics.length > 3 && (
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      backgroundColor: category.color,
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      color: 'white'
                    }}>
                      +{category.topics.length - 3} more
                    </span>
                  )}
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  color: category.color,
                  fontWeight: '600',
                  marginTop: '1rem'
                }}>
                  <span>Explore</span>
                  <span>→</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Topics within Category View */}
        {selectedCategory && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {categories
              .find(c => c.id === selectedCategory)
              ?.topics.map(topic => (
                <button
                  key={topic.id}
                  onClick={() => onSelectItem(topic.id)}
                  style={{
                    background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                    padding: '1.5rem',
                    borderRadius: '0.75rem',
                    border: `2px solid ${topic.color}`,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    textAlign: 'left',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-0.5rem)'
                    e.currentTarget.style.boxShadow = `0 25px 50px -12px ${topic.color}50`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1rem'
                  }}>
                    <span style={{ fontSize: '2.5rem' }}>{topic.icon}</span>
                    <div>
                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        color: '#c084fc',
                        marginBottom: '0.25rem'
                      }}>
                        {topic.name}
                      </h3>
                      <span style={{
                        display: 'inline-block',
                        padding: '0.2rem 0.6rem',
                        backgroundColor: topic.color,
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        borderRadius: '0.25rem'
                      }}>
                        {topic.complexity}
                      </span>
                    </div>
                  </div>
                  <p style={{
                    fontSize: '0.9rem',
                    color: '#d1d5db',
                    lineHeight: '1.6',
                    marginBottom: '1rem'
                  }}>
                    {topic.description}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '0.5rem',
                    fontSize: '0.9rem',
                    color: topic.color,
                    fontWeight: '600',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid #374151'
                  }}>
                    <span>Open Topic</span>
                    <span>→</span>
                  </div>
                </button>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Design
