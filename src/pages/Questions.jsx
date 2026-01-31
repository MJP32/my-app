import { useState, useEffect } from 'react'
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation'
import Breadcrumb from '../components/Breadcrumb'

const QUESTIONS_COLORS = {
  primary: '#a78bfa',
  primaryHover: '#c4b5fd',
  bg: 'rgba(139, 92, 246, 0.1)',
  border: 'rgba(139, 92, 246, 0.3)',
  arrow: '#8b5cf6',
  hoverBg: 'rgba(139, 92, 246, 0.2)',
  topicBg: 'rgba(139, 92, 246, 0.2)'
}

function Questions({ onBack, onSelectItem, initialCategory, breadcrumb }) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || null)

  // Update selectedCategory when initialCategory prop changes
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory)
    }
  }, [initialCategory])

  const categories = [
    {
      id: 'backend-frameworks',
      name: 'Backend Frameworks',
      icon: '🏗️',
      color: '#10b981',
      description: 'Master Spring Framework, Hibernate, and other essential backend technologies for building robust enterprise applications.',
      topics: [
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
        }
      ]
    },
    {
      id: 'programming-languages',
      name: 'Programming Languages',
      icon: '💻',
      color: '#f59e0b',
      description: 'Core language features, version-specific enhancements, and essential programming concepts for technical interviews.',
      topics: [
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
        }
      ]
    },
    {
      id: 'databases',
      name: 'Databases',
      icon: '🗄️',
      color: '#0ea5e9',
      description: 'Master database technologies from SQL to NoSQL, including query optimization, data modeling, and ORM frameworks.',
      topics: [
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
        }
      ]
    },
    {
      id: 'messaging-streaming',
      name: 'Messaging & Streaming',
      icon: '📨',
      color: '#ef4444',
      description: 'Event-driven architectures, message brokers, and real-time data streaming technologies.',
      topics: [
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
        }
      ]
    },
    {
      id: 'apis-services',
      name: 'APIs & Services',
      icon: '🌐',
      color: '#6366f1',
      description: 'RESTful API design, best practices, and building scalable web services.',
      topics: [
        {
          id: 'REST API Questions',
          name: 'REST API',
          icon: '🌐',
          color: '#6366f1',
          complexity: 'Intermediate',
          description: 'RESTful principles, HTTP methods, status codes, API versioning, and documentation.'
        }
      ]
    },
    {
      id: 'architecture-design',
      name: 'Architecture & Design',
      icon: '🏛️',
      color: '#8b5cf6',
      description: 'System design concepts, scalability patterns, distributed systems, and architectural best practices.',
      topics: [
        {
          id: 'System Design Questions',
          name: 'System Design',
          icon: '🏛️',
          color: '#8b5cf6',
          complexity: 'Advanced',
          description: 'Scalability, load balancing, caching, database sharding, CAP theorem, and microservices patterns.'
        }
      ]
    },
    {
      id: 'devops-monitoring',
      name: 'DevOps & Monitoring',
      icon: '🚀',
      color: '#14b8a6',
      description: 'CI/CD pipelines, observability, and monitoring tools for production systems.',
      topics: [
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
        }
      ]
    },
    {
      id: 'etrading',
      name: 'eTrading Systems',
      icon: '📈',
      color: '#22c55e',
      description: 'Electronic trading systems, protocols, and low-latency architectures used in financial markets.',
      topics: [
        {
          id: 'eTrading Questions',
          name: 'eTrading Systems',
          icon: '📈',
          color: '#22c55e',
          complexity: 'Advanced',
          description: 'RFQ systems, order management, FIX protocol, low-latency trading, and market making.'
        }
      ]
    }
  ]

  // Build breadcrumb stack based on current navigation state
  const buildBreadcrumbStack = () => {
    const stack = [{ name: 'Questions', icon: '❓' }]
    if (selectedCategory) {
      const cat = categories.find(c => c.id === selectedCategory)
      if (cat) {
        stack.push({ name: cat.name, icon: cat.icon })
      }
    }
    return stack
  }

  const handleBreadcrumbClick = (index) => {
    if (index === 0) {
      // Clicked on Questions - go back to main categories
      setSelectedCategory(null)
    }
  }

  // Get current topics for navigation based on view
  const currentTopics = selectedCategory
    ? categories.find(c => c.id === selectedCategory)?.topics || []
    : []

  // Keyboard navigation for category view
  const { focusedIndex: focusedCategoryIndex, itemRefs: categoryRefs } = useKeyboardNavigation({
    items: categories,
    onSelect: (category) => setSelectedCategory(category.id),
    onBack,
    enabled: !selectedCategory,
    gridColumns: 2,
    loop: true
  })

  // Keyboard navigation for topics view within a category
  const { focusedIndex: focusedTopicIndex, itemRefs: topicRefs } = useKeyboardNavigation({
    items: currentTopics,
    onSelect: (topic) => onSelectItem(topic.id),
    onBack: () => setSelectedCategory(null),
    enabled: !!selectedCategory,
    gridColumns: 2,
    loop: true
  })

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #4c1d95, #111827)',
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
              background: 'linear-gradient(to right, #a78bfa, #c4b5fd)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {selectedCategory
                ? `${categories.find(c => c.id === selectedCategory)?.icon} ${categories.find(c => c.id === selectedCategory)?.name}`
                : '❓ Interview Questions'}
            </h1>
          </div>
        </div>

        {/* Breadcrumb */}
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={QUESTIONS_COLORS}
        />

        <p style={{
          fontSize: '1.2rem',
          color: '#d1d5db',
          textAlign: 'left',
          marginBottom: '3rem',
          lineHeight: '1.8'
        }}>
          {selectedCategory
            ? categories.find(c => c.id === selectedCategory)?.description
            : 'Prepare for technical interviews with comprehensive question sets. Master frameworks, languages, and tools that employers are looking for.'}
        </p>

        {/* Categories View */}
        {!selectedCategory && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}>
            {categories.map((category, index) => (
              <button
                key={category.id}
                ref={(el) => categoryRefs.current[index] = el}
                onClick={() => setSelectedCategory(category.id)}
                tabIndex={focusedCategoryIndex === index ? 0 : -1}
                role="link"
                aria-label={`${category.name}. ${category.topics.length} topics.`}
                style={{
                  background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                  padding: '2rem',
                  borderRadius: '0.75rem',
                  border: `2px solid ${category.color}`,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  textAlign: 'left',
                  transform: focusedCategoryIndex === index ? 'translateY(-0.5rem)' : 'translateY(0)',
                  boxShadow: focusedCategoryIndex === index
                    ? `0 25px 50px -12px ${category.color}40`
                    : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-0.5rem)'
                  e.currentTarget.style.boxShadow = `0 25px 50px -12px ${category.color}40`
                }}
                onMouseLeave={(e) => {
                  if (focusedCategoryIndex !== index) {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }
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
            {currentTopics.map((topic, index) => (
                <button
                  key={topic.id}
                  ref={(el) => topicRefs.current[index] = el}
                  onClick={() => onSelectItem(topic.id)}
                  tabIndex={focusedTopicIndex === index ? 0 : -1}
                  role="link"
                  aria-label={`${topic.name}. ${topic.complexity}.`}
                  style={{
                    background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                    padding: '1.5rem',
                    borderRadius: '0.75rem',
                    border: `2px solid ${topic.color}`,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    textAlign: 'left',
                    transform: focusedTopicIndex === index ? 'translateY(-0.5rem)' : 'translateY(0)',
                    boxShadow: focusedTopicIndex === index
                      ? `0 25px 50px -12px ${topic.color}50`
                      : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-0.5rem)'
                    e.currentTarget.style.boxShadow = `0 25px 50px -12px ${topic.color}50`
                  }}
                  onMouseLeave={(e) => {
                    if (focusedTopicIndex !== index) {
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
                    <span style={{ fontSize: '2.5rem' }}>{topic.icon}</span>
                    <div>
                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        color: topic.color,
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
                    <span>Start Questions</span>
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

export default Questions
