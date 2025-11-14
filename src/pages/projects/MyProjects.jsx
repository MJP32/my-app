import { useState } from 'react'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function MyProjects({ onBack, onSelectItem }) {
  const [selectedConcept, setSelectedConcept] = useState('')

  // Organized into logical groups
  const projectGroups = [
    {
      title: 'System Design Concepts',
      icon: '📚',
      color: '#f97316',
      isDropdown: true,
      projects: [
        {
          id: 'Load Balancing',
          name: 'Load Balancing',
          icon: '⚖️',
          color: '#3b82f6',
          description: 'Distribute traffic across multiple servers. Learn algorithms (Round Robin, Least Connections, IP Hash), health checks, and Layer 4 vs Layer 7 load balancing.'
        },
        {
          id: 'Caching Strategies',
          name: 'Caching Strategies',
          icon: '💾',
          color: '#10b981',
          description: 'Improve performance with caching. Understand cache-aside, write-through, write-back patterns, cache eviction policies (LRU, LFU), and distributed caching with Redis/Memcached.'
        },
        {
          id: 'Database Sharding',
          name: 'Database Sharding',
          icon: '🗄️',
          color: '#8b5cf6',
          description: 'Scale databases horizontally by partitioning data. Learn sharding strategies (range, hash, directory-based), shard key selection, and resharding techniques.'
        },
        {
          id: 'CAP Theorem',
          name: 'CAP Theorem',
          icon: '🔺',
          color: '#ef4444',
          description: 'Understand the fundamental tradeoff: Consistency, Availability, Partition Tolerance. Learn why you can only pick 2 of 3, and real-world database examples (CP, AP, CA).'
        },
        {
          id: 'Consistency Patterns',
          name: 'Consistency Patterns',
          icon: '🔄',
          color: '#06b6d4',
          description: 'Master data consistency models: Strong Consistency, Eventual Consistency, Causal Consistency. Learn when to use each pattern and tradeoffs with availability and performance.'
        },
        {
          id: 'API Design',
          name: 'API Design & REST',
          icon: '🔌',
          color: '#f59e0b',
          description: 'Design scalable REST APIs. Learn HTTP methods, status codes, versioning, pagination, rate limiting, authentication (OAuth, JWT), and API gateway patterns.'
        },
        {
          id: 'Message Queues',
          name: 'Message Queues',
          icon: '📬',
          color: '#ec4899',
          description: 'Decouple systems with async messaging. Learn message queue patterns, pub/sub, topics, dead letter queues, and tools like RabbitMQ, Kafka, and SQS.'
        },
        {
          id: 'CDN',
          name: 'Content Delivery Network',
          icon: '🌐',
          color: '#14b8a6',
          description: 'Deliver content globally with low latency. Understand CDN architecture, edge locations, caching strategies, cache invalidation, and popular CDNs (CloudFront, Cloudflare, Akamai).'
        },
        {
          id: 'Database Replication',
          name: 'Database Replication',
          icon: '🔁',
          color: '#a855f7',
          description: 'Ensure high availability with database replication. Learn master-slave, master-master replication, read replicas, replication lag, and failover strategies.'
        },
        {
          id: 'Scaling',
          name: 'Horizontal vs Vertical Scaling',
          icon: '📈',
          color: '#0891b2',
          description: 'Scale your systems effectively. Understand when to scale up (vertical) vs scale out (horizontal), stateless vs stateful services, and auto-scaling strategies.'
        },
        {
          id: 'Proxies',
          name: 'Proxies & Reverse Proxies',
          icon: '🚪',
          color: '#6366f1',
          description: 'Learn proxy server patterns. Understand forward proxies, reverse proxies (Nginx, HAProxy), SSL termination, request routing, and API gateways.'
        },
        {
          id: 'Data Partitioning',
          name: 'Data Partitioning',
          icon: '📊',
          color: '#f97316',
          description: 'Partition data for better performance and scalability. Learn horizontal partitioning (sharding), vertical partitioning, and criteria for partitioning strategies.'
        },
        {
          id: 'SQL vs NoSQL',
          name: 'SQL vs NoSQL',
          icon: '🗃️',
          color: '#84cc16',
          description: 'Choose the right database for your use case. Compare relational (PostgreSQL, MySQL) vs NoSQL (MongoDB, Cassandra, DynamoDB) databases, ACID vs BASE, and when to use each.'
        },
        {
          id: 'Consistent Hashing',
          name: 'Consistent Hashing',
          icon: '🔑',
          color: '#eab308',
          description: 'Distribute data across nodes efficiently. Learn consistent hashing algorithm, virtual nodes, and how it solves the rehashing problem in distributed systems.'
        },
        {
          id: 'WebSockets',
          name: 'Long Polling vs WebSockets',
          icon: '🔌',
          color: '#22c55e',
          description: 'Enable real-time communication. Compare long polling, WebSockets, and Server-Sent Events (SSE). Learn when to use each pattern and implementation best practices.'
        },
        {
          id: 'Blob Storage',
          name: 'Blob Storage',
          icon: '📦',
          color: '#3b82f6',
          description: 'Store and serve large files efficiently. Learn about object storage (S3, Azure Blob, GCS), metadata management, access patterns, and cost optimization.'
        },
        {
          id: 'Microservices',
          name: 'Microservices Architecture',
          icon: '🧩',
          color: '#8b5cf6',
          description: 'Design distributed systems with microservices. Learn service decomposition, inter-service communication, service discovery, circuit breakers, and the saga pattern.'
        },
        {
          id: 'Event-Driven',
          name: 'Event-Driven Architecture',
          icon: '⚡',
          color: '#f59e0b',
          description: 'Build reactive systems with events. Learn event sourcing, CQRS, event streaming (Kafka), eventual consistency, and handling distributed transactions.'
        }
      ]
    },
    {
      title: 'Financial & Trading Systems',
      icon: '💰',
      color: '#10b981',
      projects: [
        {
          id: 'Var/CVar',
          name: 'Var/CVar',
          icon: '📈',
          color: '#10b981',
          description: 'Value at Risk and Conditional Value at Risk calculations for financial risk management.'
        },
        {
          id: 'Var/CVar - Advanced',
          name: 'Var/CVar - Advanced',
          icon: '📊',
          color: '#059669',
          description: 'Advanced VaR/CVaR techniques with Monte Carlo simulations and stress testing.'
        },
        {
          id: 'Var/CVar 3',
          name: 'Var/CVar 3',
          icon: '📉',
          color: '#047857',
          description: 'Enhanced VaR/CVaR system with real-time analytics and portfolio optimization.'
        },
        {
          id: 'Dark Pool Matching Engine',
          name: 'Dark Pool Matching Engine',
          icon: '🌑',
          color: '#6366f1',
          description: 'High-performance order matching engine for dark pool trading operations.'
        },
        {
          id: 'Dark Pool Matching Engine - Basic',
          name: 'Dark Pool Matching Engine - Basic',
          icon: '🌓',
          color: '#4f46e5',
          description: 'Simplified dark pool matching engine for learning trading system fundamentals.'
        },
        {
          id: 'Dark Pool Engine 3',
          name: 'Dark Pool Engine 3',
          icon: '🌚',
          color: '#3730a3',
          description: 'Latest iteration of dark pool engine with advanced features and optimizations.'
        },
        {
          id: 'Financial Banking',
          name: 'Financial Banking',
          icon: '🏦',
          color: '#f59e0b',
          description: 'Core banking system with transaction processing and account management.'
        },
        {
          id: 'Credit Card Portal',
          name: 'Credit Card Portal',
          icon: '💳',
          color: '#ec4899',
          description: 'Credit card management portal with transaction tracking, rewards, and payment processing.'
        },
        {
          id: 'Credit Card Portal 2',
          name: 'Credit Card Portal 2',
          icon: '💎',
          color: '#a855f7',
          description: 'Enhanced credit card portal with advanced analytics, fraud detection, and premium features.'
        },
        {
          id: 'Credit Card Portal 3',
          name: 'Credit Card Portal 3',
          icon: '🏗️',
          color: '#0891b2',
          description: 'System design interview preparation - Complete CQRS, Event Sourcing, Saga patterns for 10M users.'
        },
        {
          id: 'Virtual Numbers',
          name: 'Virtual Numbers',
          icon: '🔢',
          color: '#14b8a6',
          description: 'Deep dive into credit card number structure, network identifiers, Luhn Algorithm validation, and payment card industry standards.'
        }
      ]
    },
    {
      title: 'System Design Projects',
      icon: '🏛️',
      color: '#3b82f6',
      projects: [
        {
          id: 'Ride Share',
          name: 'Ride Share',
          icon: '🚗',
          color: '#10b981',
          description: 'Fault-tolerant ride sharing platform with real-time matching, geospatial routing, and high availability architecture.'
        },
        {
          id: 'Google Docs',
          name: 'Google Docs',
          icon: '📝',
          color: '#3b82f6',
          description: 'Understand the System Design of Google Docs, using different techniques to address storage, collaborative editing, and concurrency issues.'
        },
        {
          id: 'YouTube',
          name: 'YouTube',
          icon: '▶️',
          color: '#ff0000',
          description: 'Design a video streaming platform like YouTube. Handle video upload, transcoding, CDN delivery, recommendations, and scalability for millions of users.'
        },
        {
          id: 'Newsfeed System',
          name: 'Newsfeed System',
          icon: '📰',
          color: '#1877f2',
          description: 'Design a scalable newsfeed system like Facebook or Twitter. Handle fan-out strategies, ranking algorithms, real-time updates, and personalized content delivery.'
        },
        {
          id: 'TinyURL',
          name: 'TinyURL',
          icon: '🔗',
          color: '#06b6d4',
          description: 'Design a URL shortening service like TinyURL or Bitly. Handle short URL generation, redirection, analytics, rate limiting, and high-volume traffic.'
        },
        {
          id: 'WhatsApp',
          name: 'WhatsApp',
          icon: '💬',
          color: '#25d366',
          description: 'Design a messaging platform like WhatsApp. Handle real-time messaging, end-to-end encryption, group chats, media sharing, and billions of messages daily.'
        },
        {
          id: 'Type Ahead System',
          name: 'Type Ahead System',
          icon: '🔍',
          color: '#8b5cf6',
          description: 'Design an autocomplete/type-ahead system like Google Search. Handle prefix matching, ranking, caching, real-time suggestions, and billions of queries.'
        },
        {
          id: 'Instagram',
          name: 'Instagram',
          icon: '📸',
          color: '#e1306c',
          description: 'Design a photo-sharing platform like Instagram. Handle image upload/storage, feed generation, stories, likes/comments, followers, and billion-user scale.'
        },
        {
          id: 'Netflix',
          name: 'Netflix',
          icon: '🎬',
          color: '#e50914',
          description: 'Design a video streaming platform like Netflix. Handle video encoding, CDN architecture, personalized recommendations, adaptive bitrate streaming, and global scale for 200M+ users.'
        },
        {
          id: 'Twitter',
          name: 'Twitter/X',
          icon: '🐦',
          color: '#1da1f2',
          description: 'Design a social media platform like Twitter. Handle real-time tweets, timeline generation, trending topics, fan-out strategies, and billions of daily interactions.'
        },
        {
          id: 'Amazon',
          name: 'Amazon E-Commerce',
          icon: '🛒',
          color: '#ff9900',
          description: 'Design an e-commerce platform like Amazon. Handle product catalog, inventory management, shopping cart, order processing, payment gateway, and millions of SKUs.'
        },
        {
          id: 'Zoom',
          name: 'Zoom',
          icon: '📹',
          color: '#2d8cff',
          description: 'Design a video conferencing platform like Zoom. Handle WebRTC, real-time communication, screen sharing, recording, and scalable meetings for 1000+ participants.'
        },
        {
          id: 'Dropbox',
          name: 'Dropbox',
          icon: '📁',
          color: '#0061ff',
          description: 'Design a file storage and sync service like Dropbox. Handle file chunking, deduplication, conflict resolution, version history, and cross-device synchronization.'
        },
        {
          id: 'Notification System',
          name: 'Notification System',
          icon: '🔔',
          color: '#f59e0b',
          description: 'Design a scalable notification system. Handle push notifications, email, SMS, rate limiting, prioritization, delivery guarantees, and millions of notifications per second.'
        },
        {
          id: 'Rate Limiter',
          name: 'Rate Limiter',
          icon: '⏱️',
          color: '#8b5cf6',
          description: 'Design a distributed rate limiting system. Handle token bucket, sliding window algorithms, Redis-based implementation, and protect APIs from abuse at scale.'
        },
        {
          id: 'Food Delivery',
          name: 'Food Delivery',
          icon: '🍕',
          color: '#ff6347',
          description: 'Design a food delivery platform like Uber Eats. Handle restaurant discovery, real-time order tracking, driver routing, geospatial indexing, and dynamic pricing.'
        }
      ]
    },
    {
      title: 'Enterprise & Healthcare',
      icon: '🏢',
      color: '#8b5cf6',
      projects: [
        {
          id: 'Medi/Health',
          name: 'Medi/Health',
          icon: '🏥',
          color: '#ef4444',
          description: 'Healthcare management system with patient records and appointment scheduling.'
        },
        {
          id: 'Monolith to Microservice',
          name: 'Monolith to Microservice',
          icon: '🔄',
          color: '#8b5cf6',
          description: 'Migration journey from monolithic architecture to microservices-based system.'
        }
      ]
    },
    {
      title: 'Mobile & IoT',
      icon: '📱',
      color: '#0ea5e9',
      projects: [
        {
          id: 'Mobile Weather App',
          name: 'Mobile Weather App',
          icon: '🌤️',
          color: '#0ea5e9',
          description: 'Mobile weather application with real-time weather data, forecasts, location services, and weather alerts. Integrates with weather APIs and displays interactive weather maps.'
        },
        {
          id: 'Apartment Alarm System',
          name: 'Apartment Alarm System',
          icon: '🚨',
          color: '#dc2626',
          description: 'IoT-based security alarm system for apartment buildings. Real-time monitoring, sensor integration, mobile alerts, access control, and emergency response coordination.'
        }
      ]
    }
  ]

  // Flatten for navigation
  const projectItems = projectGroups.flatMap(group => group.projects)

  const { focusedIndex, itemRefs } = useKeyboardNavigation({
    items: projectItems,
    onSelect: (item) => onSelectItem(item.id),
    onBack,
    enabled: true,
    gridColumns: 3,
    loop: true
  })

  return (
    <div style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto', backgroundColor: '#d1fae5', minHeight: '100vh' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem'
      }}>
        <button
          onClick={onBack}
          style={{
            padding: '0.6rem 1.25rem',
            fontSize: '0.95rem',
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
          fontSize: '2rem',
          fontWeight: '800',
          color: '#1f2937',
          margin: 0
        }}>
          💼 My Projects
        </h1>
        <div style={{ width: '120px' }}></div>
      </div>

      <p style={{
        fontSize: '1rem',
        color: '#4b5563',
        textAlign: 'center',
        marginBottom: '1.5rem',
        lineHeight: '1.6'
      }}>
        Real-world projects spanning financial systems, healthcare, and enterprise applications showcasing practical implementations.
      </p>

      {projectGroups.map((group, groupIndex) => {
        const groupStartIndex = projectGroups
          .slice(0, groupIndex)
          .reduce((sum, g) => sum + g.projects.length, 0)

        return (
          <div key={group.title} style={{ marginBottom: '2rem' }}>
            {/* Group Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1rem',
              padding: '0.75rem 1rem',
              backgroundColor: 'white',
              borderRadius: '10px',
              borderLeft: `5px solid ${group.color}`,
              boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
            }}>
              <span style={{ fontSize: '1.5rem' }}>{group.icon}</span>
              <h2 style={{
                fontSize: '1.4rem',
                fontWeight: '700',
                color: '#1f2937',
                margin: 0
              }}>
                {group.title}
              </h2>
            </div>

            {/* Dropdown or Project Cards */}
            {group.isDropdown ? (
              <div style={{ marginBottom: '1rem' }}>
                <select
                  value={selectedConcept}
                  onChange={(e) => {
                    setSelectedConcept(e.target.value)
                    if (e.target.value) {
                      onSelectItem(e.target.value)
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#1f2937',
                    backgroundColor: 'white',
                    border: `2px solid ${group.color}`,
                    borderRadius: '10px',
                    cursor: 'pointer',
                    outline: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = group.color
                    e.target.style.boxShadow = `0 0 0 3px ${group.color}40, 0 2px 8px rgba(0,0,0,0.08)`
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = group.color
                    e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'
                  }}
                >
                  <option value="">Select a concept to learn...</option>
                  {group.projects.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.icon} {item.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1rem'
              }}>
                {group.projects.map((item, projIndex) => {
                  const index = groupStartIndex + projIndex
                  return (
                    <button
                      key={item.id}
                      ref={(el) => itemRefs.current[index] = el}
                      onClick={() => onSelectItem(item.id)}
                      tabIndex={focusedIndex === index ? 0 : -1}
                      role="link"
                      aria-label={`${item.name}. ${item.description}`}
                      style={{
                        backgroundColor: 'white',
                        padding: '1rem',
                        borderRadius: '10px',
                        border: `2px solid ${item.color}`,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        transform: focusedIndex === index ? 'translateY(-4px)' : 'translateY(0)',
                        boxShadow: focusedIndex === index
                          ? `0 0 0 3px ${item.color}40, 0 8px 16px rgba(0,0,0,0.15)`
                          : '0 2px 8px rgba(0,0,0,0.08)',
                        textAlign: 'left',
                        width: '100%'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)'
                        e.currentTarget.style.boxShadow = `0 0 0 3px ${item.color}40, 0 8px 16px rgba(0,0,0,0.15)`
                      }}
                      onMouseLeave={(e) => {
                        if (focusedIndex !== index) {
                          e.currentTarget.style.transform = 'translateY(0)'
                          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'
                        }
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '0.75rem'
                      }}>
                        <div style={{
                          fontSize: '2rem',
                          lineHeight: 1
                        }}>
                          {item.icon}
                        </div>
                        <h3 style={{
                          fontSize: '1.1rem',
                          fontWeight: '700',
                          color: '#1f2937',
                          margin: 0
                        }}>
                          {item.name}
                        </h3>
                      </div>

                      <p style={{
                        fontSize: '0.85rem',
                        color: '#6b7280',
                        lineHeight: '1.5',
                        margin: '0.5rem 0'
                      }}>
                        {item.description}
                      </p>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: '0.4rem',
                        fontSize: '0.8rem',
                        color: item.color,
                        fontWeight: '600',
                        marginTop: '0.75rem'
                      }}>
                        <span>Explore Project</span>
                        <span>→</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default MyProjects
