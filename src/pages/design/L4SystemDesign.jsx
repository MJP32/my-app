import { useState, Suspense, lazy } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import LoadingSpinner from '../../components/LoadingSpinner'

// Lazy load existing design pages
const TinyURL = lazy(() => import('./TinyURL.jsx'))
const WhatsApp = lazy(() => import('./WhatsApp.jsx'))
const Newsfeed = lazy(() => import('./Newsfeed.jsx'))
const Dropbox = lazy(() => import('./Dropbox.jsx'))
const FoodDelivery = lazy(() => import('./FoodDelivery.jsx'))

function L4SystemDesign({ onBack }) {
  const [selectedTopic, setSelectedTopic] = useState(null)

  const breadcrumb = {
    section: { name: 'Design', icon: '🎨', onClick: onBack },
    category: { name: 'System Design Interview', onClick: onBack },
    topic: 'L4 Level (Mid)',
    colors: {
      primary: '#3b82f6',
      primaryHover: '#60a5fa',
      bg: 'rgba(59, 130, 246, 0.1)',
      border: 'rgba(59, 130, 246, 0.3)',
      arrow: '#3b82f6',
      hoverBg: 'rgba(59, 130, 246, 0.2)',
      topicBg: 'rgba(59, 130, 246, 0.2)'
    }
  }

  const topics = [
    {
      id: 'url-shortener',
      title: 'URL Shortener (bit.ly)',
      icon: '🔗',
      color: '#06b6d4',
      difficulty: 'Medium',
      hasExistingPage: true,
      component: TinyURL,
      description: 'Design a URL shortening service with short URL generation, redirection, and analytics.'
    },
    {
      id: 'chat-app',
      title: 'Basic Chat Application',
      icon: '💬',
      color: '#25d366',
      difficulty: 'Medium',
      hasExistingPage: true,
      component: WhatsApp,
      description: 'Design a messaging application with 1:1 chat, group messaging, and real-time delivery.'
    },
    {
      id: 'social-feed',
      title: 'Social Media Feed',
      icon: '📱',
      color: '#f59e0b',
      difficulty: 'Medium',
      hasExistingPage: true,
      component: Newsfeed,
      description: 'Design a news feed system with posts from followed users, ranking, and real-time updates.'
    },
    {
      id: 'file-storage',
      title: 'File Storage System',
      icon: '📁',
      color: '#3b82f6',
      difficulty: 'Medium',
      hasExistingPage: true,
      component: Dropbox,
      description: 'Design a cloud file storage and sync service like Dropbox or Google Drive.'
    },
    {
      id: 'web-crawler',
      title: 'Web Crawler',
      icon: '🕷️',
      color: '#ef4444',
      difficulty: 'Medium',
      hasExistingPage: false,
      description: 'Design a distributed web crawler that can index billions of web pages.',
      content: {
        requirements: [
          'Crawl web pages starting from seed URLs',
          'Extract and follow links to discover new pages',
          'Respect robots.txt and crawl policies',
          'Handle duplicates and avoid infinite loops',
          'Store crawled content for indexing'
        ],
        components: [
          { name: 'URL Frontier', desc: 'Priority queue of URLs to crawl, organized by domain' },
          { name: 'Fetcher', desc: 'HTTP client to download web pages with retry logic' },
          { name: 'Parser', desc: 'Extract links, text, and metadata from HTML' },
          { name: 'URL Filter', desc: 'Deduplicate URLs, filter by rules' },
          { name: 'Content Store', desc: 'Store raw HTML and extracted content' },
          { name: 'DNS Resolver', desc: 'Cache DNS lookups for performance' }
        ],
        keyDecisions: [
          'Politeness: Rate limit per domain (1 req/sec), respect Crawl-Delay',
          'URL prioritization: PageRank, freshness, domain authority',
          'Deduplication: Bloom filter for seen URLs, content fingerprinting',
          'robots.txt: Cache and respect, refresh periodically'
        ],
        architecture: [
          '1. Seed URLs added to URL Frontier',
          '2. Fetcher pulls URLs, checks robots.txt, downloads page',
          '3. Parser extracts links and content',
          '4. URL Filter removes duplicates and invalid URLs',
          '5. Valid URLs added back to Frontier',
          '6. Content stored for later indexing'
        ],
        scaling: [
          'Distribute crawling by domain hash to workers',
          'Use Kafka for URL Frontier for durability',
          'Multiple fetcher threads per domain',
          'Checkpoint progress for crash recovery'
        ]
      }
    },
    {
      id: 'parking-lot',
      title: 'Parking Lot System',
      icon: '🚗',
      color: '#8b5cf6',
      difficulty: 'Medium',
      hasExistingPage: false,
      description: 'Design a parking lot management system with spots, vehicles, and payments.',
      content: {
        requirements: [
          'Multiple floors with different spot types (compact, regular, large)',
          'Track vehicle entry and exit',
          'Find available parking spots',
          'Calculate parking fees based on duration',
          'Display real-time availability'
        ],
        entities: [
          { name: 'ParkingLot', attrs: 'name, address, floors[], capacity' },
          { name: 'ParkingFloor', attrs: 'floorNumber, spots[], displayBoard' },
          { name: 'ParkingSpot', attrs: 'spotNumber, type, isAvailable, vehicle' },
          { name: 'Vehicle', attrs: 'licensePlate, type (car/motorcycle/truck)' },
          { name: 'ParkingTicket', attrs: 'ticketId, vehicle, spot, entryTime, exitTime, fee' },
          { name: 'Payment', attrs: 'ticketId, amount, method, timestamp' }
        ],
        keyMethods: [
          'getAvailableSpots(vehicleType) → List<ParkingSpot>',
          'parkVehicle(vehicle) → ParkingTicket',
          'unparkVehicle(ticketId) → Payment',
          'calculateFee(ticket) → amount',
          'getAvailabilityByFloor() → Map<Floor, Count>'
        ],
        spotAssignment: [
          'Strategy 1: Nearest to entrance/exit',
          'Strategy 2: Fill one floor before moving to next',
          'Strategy 3: Balance across floors',
          'Consider: compact cars can use regular spots if no compact available'
        ],
        concurrency: [
          'Lock spot during assignment to prevent double booking',
          'Atomic operations for spot status updates',
          'Optimistic locking with version numbers',
          'Queue requests during high traffic'
        ],
        pricing: [
          'Hourly rate based on spot type',
          'Different rates for peak/off-peak hours',
          'Daily maximum cap',
          'Monthly passes and reservations'
        ]
      }
    },
    {
      id: 'food-delivery',
      title: 'Food Delivery (Uber Eats)',
      icon: '🍕',
      color: '#ff6347',
      difficulty: 'Medium',
      hasExistingPage: true,
      component: FoodDelivery,
      description: 'Design a food delivery platform with restaurant discovery, real-time order tracking, driver routing, and dynamic pricing.'
    }
  ]

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '#22c55e'
      case 'Medium': return '#f59e0b'
      case 'Hard': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const renderExistingPageModal = (topic) => {
    const PageComponent = topic.component
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          zIndex: 1000,
          overflow: 'auto'
        }}
      >
        <button
          onClick={() => setSelectedTopic(null)}
          style={{
            position: 'fixed',
            top: '1rem',
            right: '1rem',
            background: '#ef4444',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            zIndex: 1001,
            fontSize: '1rem'
          }}
        >
          ✕ Close
        </button>
        <Suspense fallback={<LoadingSpinner fullScreen text={`Loading ${topic.title}...`} />}>
          <PageComponent onBack={() => setSelectedTopic(null)} />
        </Suspense>
      </div>
    )
  }

  const renderCustomModal = (topic) => {
    const content = topic.content

    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}
        onClick={() => setSelectedTopic(null)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            borderRadius: '16px',
            maxWidth: '900px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            border: `2px solid ${topic.color}`,
            boxShadow: `0 25px 50px -12px ${topic.color}40`
          }}
        >
          <div style={{
            padding: '1.5rem',
            borderBottom: '1px solid #374151',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            background: '#1f2937',
            zIndex: 10
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '2rem' }}>{topic.icon}</span>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: topic.color, margin: 0 }}>
                  {topic.title}
                </h2>
                <span style={{
                  background: getDifficultyColor(topic.difficulty),
                  color: 'white',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  {topic.difficulty}
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelectedTopic(null)}
              style={{
                background: '#374151',
                border: 'none',
                color: '#9ca3af',
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '1.25rem'
              }}
            >
              ×
            </button>
          </div>

          <div style={{ padding: '1.5rem' }}>
            <p style={{ color: '#d1d5db', marginBottom: '1.5rem', fontSize: '1rem' }}>
              {topic.description}
            </p>

            {content.requirements && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#22c55e', marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: '600' }}>
                  Requirements
                </h3>
                <ul style={{ paddingLeft: '1.5rem', color: '#d1d5db' }}>
                  {content.requirements.map((req, i) => (
                    <li key={i} style={{ marginBottom: '0.4rem' }}>{req}</li>
                  ))}
                </ul>
              </div>
            )}

            {content.components && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#3b82f6', marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: '600' }}>
                  Key Components
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.75rem' }}>
                  {content.components.map((comp, i) => (
                    <div key={i} style={{ background: '#374151', padding: '0.75rem', borderRadius: '6px' }}>
                      <span style={{ color: topic.color, fontWeight: '600' }}>{comp.name}</span>
                      <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginTop: '0.25rem' }}>{comp.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {content.entities && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#3b82f6', marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: '600' }}>
                  Key Entities
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.75rem' }}>
                  {content.entities.map((entity, i) => (
                    <div key={i} style={{ background: '#374151', padding: '0.75rem', borderRadius: '6px' }}>
                      <span style={{ color: topic.color, fontWeight: '600' }}>{entity.name}</span>
                      <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginTop: '0.25rem' }}>{entity.attrs}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {content.keyDecisions && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#f59e0b', marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: '600' }}>
                  Key Design Decisions
                </h3>
                <ul style={{ paddingLeft: '1.5rem', color: '#d1d5db' }}>
                  {content.keyDecisions.map((dec, i) => (
                    <li key={i} style={{ marginBottom: '0.4rem' }}>{dec}</li>
                  ))}
                </ul>
              </div>
            )}

            {content.keyMethods && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#ec4899', marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: '600' }}>
                  Key Methods
                </h3>
                <div style={{ background: '#374151', padding: '1rem', borderRadius: '6px' }}>
                  {content.keyMethods.map((method, i) => (
                    <code key={i} style={{ display: 'block', color: '#22d3ee', marginBottom: '0.4rem', fontSize: '0.9rem' }}>
                      {method}
                    </code>
                  ))}
                </div>
              </div>
            )}

            {content.architecture && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#8b5cf6', marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: '600' }}>
                  Data Flow
                </h3>
                <ol style={{ paddingLeft: '1.5rem', color: '#d1d5db' }}>
                  {content.architecture.map((step, i) => (
                    <li key={i} style={{ marginBottom: '0.4rem' }}>{step}</li>
                  ))}
                </ol>
              </div>
            )}

            {content.spotAssignment && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#06b6d4', marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: '600' }}>
                  Spot Assignment Strategies
                </h3>
                <ul style={{ paddingLeft: '1.5rem', color: '#d1d5db' }}>
                  {content.spotAssignment.map((strategy, i) => (
                    <li key={i} style={{ marginBottom: '0.4rem' }}>{strategy}</li>
                  ))}
                </ul>
              </div>
            )}

            {content.concurrency && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#ef4444', marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: '600' }}>
                  Concurrency Handling
                </h3>
                <ul style={{ paddingLeft: '1.5rem', color: '#d1d5db' }}>
                  {content.concurrency.map((item, i) => (
                    <li key={i} style={{ marginBottom: '0.4rem' }}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {content.scaling && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#10b981', marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: '600' }}>
                  Scaling Considerations
                </h3>
                <ul style={{ paddingLeft: '1.5rem', color: '#d1d5db' }}>
                  {content.scaling.map((item, i) => (
                    <li key={i} style={{ marginBottom: '0.4rem' }}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {content.pricing && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#f59e0b', marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: '600' }}>
                  Pricing Model
                </h3>
                <ul style={{ paddingLeft: '1.5rem', color: '#d1d5db' }}>
                  {content.pricing.map((item, i) => (
                    <li key={i} style={{ marginBottom: '0.4rem' }}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #1e3a8a, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <button
          onClick={onBack}
          style={{
            background: '#3b82f6',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '1.5rem',
            fontWeight: '500'
          }}
        >
          ← Back
        </button>

        <Breadcrumb breadcrumb={breadcrumb} />

        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            background: 'linear-gradient(to right, #3b82f6, #60a5fa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            🚀 L4 Level System Design
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
            Mid-level system design questions. Click any topic to view detailed architecture and solution approach.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}>
          {topics.map(topic => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              style={{
                background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                padding: '1.5rem',
                borderRadius: '12px',
                border: `2px solid ${topic.color}40`,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = topic.color
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = `0 15px 40px -10px ${topic.color}50`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${topic.color}40`
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '2.5rem' }}>{topic.icon}</span>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#f3f4f6', margin: 0 }}>
                    {topic.title}
                  </h3>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <span style={{
                      background: getDifficultyColor(topic.difficulty),
                      color: 'white',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      {topic.difficulty}
                    </span>
                    {topic.hasExistingPage && (
                      <span style={{
                        background: '#374151',
                        color: '#9ca3af',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.75rem'
                      }}>
                        Full Guide
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem', lineHeight: '1.5' }}>
                {topic.description}
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '0.5rem',
                marginTop: '1rem',
                color: topic.color,
                fontSize: '0.9rem',
                fontWeight: '600'
              }}>
                {topic.hasExistingPage ? 'Open Full Guide →' : 'View Solution →'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedTopic && (
        selectedTopic.hasExistingPage
          ? renderExistingPageModal(selectedTopic)
          : renderCustomModal(selectedTopic)
      )}
    </div>
  )
}

export default L4SystemDesign
