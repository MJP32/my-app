import { useState, useEffect, Suspense, lazy } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'
import LoadingSpinner from '../../components/LoadingSpinner'

// Lazy load existing design pages
const YouTube = lazy(() => import('./YouTube.jsx'))
const GoogleDocs = lazy(() => import('./GoogleDocs.jsx'))
const TypeAhead = lazy(() => import('./TypeAhead.jsx'))
const Netflix = lazy(() => import('./Netflix.jsx'))
const Amazon = lazy(() => import('./Amazon.jsx'))
const Zoom = lazy(() => import('./Zoom.jsx'))
const RideShare = lazy(() => import('./RideShare.jsx'))

function L6SystemDesign({ onBack, breadcrumb: propBreadcrumb }) {
  const [selectedTopic, setSelectedTopic] = useState(null)

  useEffect(() => {
    const handler = (e) => {
      const match = topics.find(t => t.id === e.detail?.sectionId)
      if (match) setSelectedTopic(match)
    }
    window.addEventListener('navigateToSection', handler)
    return () => window.removeEventListener('navigateToSection', handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const breadcrumb = {
    onMainMenu: propBreadcrumb?.onMainMenu,
    section: { name: 'Design', icon: '🎨', onClick: onBack },
    category: { name: 'System Design Interview', onClick: onBack },
    topic: 'L6+ Level (Staff)',
    colors: {
      primary: '#f59e0b',
      primaryHover: '#fbbf24',
      bg: 'rgba(245, 158, 11, 0.1)',
      border: 'rgba(245, 158, 11, 0.3)',
      arrow: '#f59e0b',
      hoverBg: 'rgba(245, 158, 11, 0.2)',
      topicBg: 'rgba(245, 158, 11, 0.2)'
    }
  }

  const topics = [
    {
      id: 'youtube',
      title: 'YouTube / Video Streaming',
      icon: '📺',
      color: '#ef4444',
      difficulty: 'Hard',
      hasExistingPage: true,
      component: YouTube,
      description: 'Design a video sharing platform with upload, transcoding, streaming, and recommendations.'
    },
    {
      id: 'google-search',
      title: 'Google Search',
      icon: '🔍',
      color: '#4285f4',
      difficulty: 'Hard',
      hasExistingPage: true,
      component: TypeAhead,
      description: 'Design a web search engine with crawling, indexing, ranking, and query processing.'
    },
    {
      id: 'google-maps',
      title: 'Google Maps',
      icon: '🗺️',
      color: '#34a853',
      difficulty: 'Hard',
      hasExistingPage: false,
      description: 'Design a mapping service with navigation, real-time traffic, and location search.',
      content: {
        requirements: [
          'Display map tiles at various zoom levels',
          'Search for places and addresses (geocoding)',
          'Turn-by-turn navigation with route calculation',
          'Real-time traffic updates',
          'Offline maps support'
        ],
        components: [
          { name: 'Tile Service', desc: 'Pre-rendered map tiles at 20+ zoom levels' },
          { name: 'Geocoding Service', desc: 'Convert addresses ↔ coordinates' },
          { name: 'Places Service', desc: 'POI search with location context' },
          { name: 'Routing Engine', desc: 'Calculate optimal routes using graph algorithms' },
          { name: 'Traffic Service', desc: 'Aggregate real-time traffic data' },
          { name: 'ETA Service', desc: 'Predict arrival times using ML' }
        ],
        keyDecisions: [
          'Map tiles: Quadtree structure, pre-render at zoom 0-20',
          'Vector vs raster tiles: Vector for flexibility, raster for simplicity',
          'Routing: Contraction Hierarchies for fast point-to-point routing',
          'Traffic: Crowdsourced GPS data + historical patterns'
        ],
        architecture: [
          '1. Client requests tiles for viewport → CDN serves cached tiles',
          '2. User searches → Geocoding returns coordinates',
          '3. Route request → Graph traversal with traffic weights',
          '4. During navigation → continuous traffic updates',
          '5. ETA updates based on current conditions'
        ],
        scaling: [
          'CDN edge caching for map tiles',
          'Partition road graph by geographic regions',
          'Pre-compute routes between major points',
          'Real-time traffic via streaming pipeline'
        ]
      }
    },
    {
      id: 'google-docs',
      title: 'Google Docs (Collaborative Editing)',
      icon: '📝',
      color: '#4285f4',
      difficulty: 'Hard',
      hasExistingPage: true,
      component: GoogleDocs,
      description: 'Design real-time collaborative document editing with conflict resolution.'
    },
    {
      id: 'netflix',
      title: 'Netflix',
      icon: '🎬',
      color: '#e50914',
      difficulty: 'Hard',
      hasExistingPage: true,
      component: Netflix,
      description: 'Design a video streaming platform with encoding, CDN, recommendations, and adaptive bitrate for 200M+ users.'
    },
    {
      id: 'amazon',
      title: 'Amazon E-Commerce',
      icon: '🛒',
      color: '#ff9900',
      difficulty: 'Hard',
      hasExistingPage: true,
      component: Amazon,
      description: 'Design an e-commerce platform with product catalog, inventory, cart, orders, and payment processing.'
    },
    {
      id: 'zoom',
      title: 'Zoom',
      icon: '📹',
      color: '#2d8cff',
      difficulty: 'Hard',
      hasExistingPage: true,
      component: Zoom,
      description: 'Design a video conferencing platform with WebRTC, screen sharing, recording, and 1000+ participant meetings.'
    },
    {
      id: 'rideshare',
      title: 'Ride Share (Uber/Lyft)',
      icon: '🚗',
      color: '#10b981',
      difficulty: 'Hard',
      hasExistingPage: true,
      component: RideShare,
      description: 'Design a ride-sharing platform with real-time matching, geospatial routing, and high availability.'
    }
  ]

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Medium': return '#f59e0b'
      case 'Medium-Hard': return '#f97316'
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
            maxWidth: '950px',
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
              <span style={{ fontSize: '2.5rem' }}>{topic.icon}</span>
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
            <p style={{ color: '#d1d5db', marginBottom: '1.5rem', fontSize: '1.05rem' }}>
              {topic.description}
            </p>

            {content.requirements && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#22c55e', marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: '600' }}>
                  Functional Requirements
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
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
                  {content.components.map((comp, i) => (
                    <div key={i} style={{ background: '#374151', padding: '0.75rem', borderRadius: '6px' }}>
                      <span style={{ color: topic.color, fontWeight: '600' }}>{comp.name}</span>
                      <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginTop: '0.25rem' }}>{comp.desc}</p>
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

            {content.operations && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#ec4899', marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: '600' }}>
                  Operations
                </h3>
                <ul style={{ paddingLeft: '1.5rem', color: '#d1d5db' }}>
                  {content.operations.map((op, i) => (
                    <li key={i} style={{ marginBottom: '0.4rem' }}>{op}</li>
                  ))}
                </ul>
              </div>
            )}

            {content.eviction && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#06b6d4', marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: '600' }}>
                  Eviction Policies
                </h3>
                <ul style={{ paddingLeft: '1.5rem', color: '#d1d5db' }}>
                  {content.eviction.map((item, i) => (
                    <li key={i} style={{ marginBottom: '0.4rem' }}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {content.emailFlow && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#8b5cf6', marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: '600' }}>
                  Email Processing Flow
                </h3>
                <ol style={{ paddingLeft: '1.5rem', color: '#d1d5db' }}>
                  {content.emailFlow.map((step, i) => (
                    <li key={i} style={{ marginBottom: '0.4rem' }}>{step}</li>
                  ))}
                </ol>
              </div>
            )}

            {content.mlFeatures && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#f59e0b', marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: '600' }}>
                  ML Features
                </h3>
                <ul style={{ paddingLeft: '1.5rem', color: '#d1d5db' }}>
                  {content.mlFeatures.map((feature, i) => (
                    <li key={i} style={{ marginBottom: '0.4rem' }}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {content.storageOptimization && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#14b8a6', marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: '600' }}>
                  Storage Optimization
                </h3>
                <ul style={{ paddingLeft: '1.5rem', color: '#d1d5db' }}>
                  {content.storageOptimization.map((item, i) => (
                    <li key={i} style={{ marginBottom: '0.4rem' }}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {content.scaling && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#10b981', marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: '600' }}>
                  Scale Considerations
                </h3>
                <ul style={{ paddingLeft: '1.5rem', color: '#d1d5db' }}>
                  {content.scaling.map((item, i) => (
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
      background: 'linear-gradient(to bottom right, #111827, #581c87, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '90rem', margin: '0 auto' }}>
        <button
          onClick={onBack}
          style={{
            background: '#f59e0b',
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

        <CollapsibleSidebar
          items={topics}
          selectedIndex={selectedTopic ? topics.findIndex(t => t.id === selectedTopic.id) : -1}
          onSelect={(index) => setSelectedTopic(topics[index])}
          title="Topics"
          getItemLabel={(item) => item.title}
          getItemIcon={(item) => item.icon}
          primaryColor="#f59e0b"
        />

        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            background: 'linear-gradient(to right, #f59e0b, #fbbf24)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            🏆 L6+ Level System Design
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto' }}>
            Staff/Principal-level system design questions. Planet-scale, multi-system platforms
            requiring deep expertise in distributed consensus, real-time data, and cross-cutting trade-offs.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
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

export default L6SystemDesign
