import { useState, Suspense, lazy } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'
import LoadingSpinner from '../../components/LoadingSpinner'

// Lazy load existing design pages
const YouTube = lazy(() => import('./YouTube.jsx'))
const GoogleDocs = lazy(() => import('./GoogleDocs.jsx'))
const WhatsApp = lazy(() => import('./WhatsApp.jsx'))
const NotificationSystem = lazy(() => import('./NotificationSystem.jsx'))
const RateLimiter = lazy(() => import('./RateLimiter.jsx'))
const Dropbox = lazy(() => import('./Dropbox.jsx'))
const TypeAhead = lazy(() => import('./TypeAhead.jsx'))
const Instagram = lazy(() => import('./Instagram.jsx'))
const Netflix = lazy(() => import('./Netflix.jsx'))
const Twitter = lazy(() => import('./Twitter.jsx'))
const Amazon = lazy(() => import('./Amazon.jsx'))
const Zoom = lazy(() => import('./Zoom.jsx'))
const RideShare = lazy(() => import('./RideShare.jsx'))

function L5SystemDesign({ onBack, breadcrumb: propBreadcrumb }) {
  const [selectedTopic, setSelectedTopic] = useState(null)

  const breadcrumb = {
    onMainMenu: propBreadcrumb?.onMainMenu,
    section: { name: 'Design', icon: '🎨', onClick: onBack },
    category: { name: 'System Design Interview', onClick: onBack },
    topic: 'L5-L6+ Level (Senior)',
    colors: {
      primary: '#a855f7',
      primaryHover: '#c084fc',
      bg: 'rgba(168, 85, 247, 0.1)',
      border: 'rgba(168, 85, 247, 0.3)',
      arrow: '#a855f7',
      hoverBg: 'rgba(168, 85, 247, 0.2)',
      topicBg: 'rgba(168, 85, 247, 0.2)'
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
      id: 'distributed-cache',
      title: 'Distributed Cache',
      icon: '💾',
      color: '#f59e0b',
      difficulty: 'Hard',
      hasExistingPage: false,
      description: 'Design a distributed in-memory cache system like Redis or Memcached.',
      content: {
        requirements: [
          'Key-value storage with O(1) get/put',
          'Distributed across multiple nodes',
          'High availability with replication',
          'Support eviction policies (LRU, LFU, TTL)',
          'Cluster management and rebalancing'
        ],
        components: [
          { name: 'Cache Nodes', desc: 'Store data partitions in memory' },
          { name: 'Coordinator', desc: 'Route requests to correct node' },
          { name: 'Cluster Manager', desc: 'Track node health, handle failures' },
          { name: 'Replication Manager', desc: 'Sync data across replicas' }
        ],
        keyDecisions: [
          'Partitioning: Consistent hashing with virtual nodes',
          'Replication: N replicas per partition (typically N=3)',
          'Consistency: Quorum reads/writes (R + W > N)',
          'Failure detection: Heartbeats + gossip protocol'
        ],
        operations: [
          'GET: Hash key → find partition → route to any replica',
          'PUT: Hash key → route to primary → replicate to secondaries',
          'Node join: Claim virtual nodes, copy data from neighbors',
          'Node failure: Promote replica, rebalance'
        ],
        eviction: [
          'LRU: Doubly linked list + hashmap',
          'LFU: Min-heap by frequency',
          'TTL: Lazy expiration + periodic cleanup',
          'Memory pressure: Evict when approaching limit'
        ]
      }
    },
    {
      id: 'google-drive',
      title: 'Google Drive',
      icon: '📂',
      color: '#4285f4',
      difficulty: 'Hard',
      hasExistingPage: true,
      component: Dropbox,
      description: 'Design cloud file storage with sync, sharing, and collaboration.'
    },
    {
      id: 'gmail',
      title: 'Gmail',
      icon: '📧',
      color: '#ea4335',
      difficulty: 'Hard',
      hasExistingPage: false,
      description: 'Design an email service with billions of messages, search, and spam filtering.',
      content: {
        requirements: [
          'Send and receive emails (SMTP/IMAP)',
          'Full-text search across all emails',
          'Spam and phishing detection',
          'Labels, filters, and organization',
          'Attachment handling'
        ],
        components: [
          { name: 'SMTP Gateway', desc: 'Send/receive emails, handle protocols' },
          { name: 'Mail Processor', desc: 'Parse, classify, route messages' },
          { name: 'Spam Filter', desc: 'ML-based spam detection' },
          { name: 'Message Store', desc: 'Store emails with metadata' },
          { name: 'Search Index', desc: 'Full-text search using Elasticsearch' },
          { name: 'Attachment Store', desc: 'Object storage for files' }
        ],
        keyDecisions: [
          'Storage: Shard mailboxes by user ID',
          'Search: Per-user inverted index for privacy',
          'Spam: ML model + sender reputation + user signals',
          'Threading: Group by subject and references header'
        ],
        emailFlow: [
          '1. Incoming email → SMTP Gateway validates sender',
          '2. Spam Filter scores message (0-100)',
          '3. Mail Processor applies user filters/labels',
          '4. Store message and update search index',
          '5. Push notification to connected clients'
        ],
        scaling: [
          'Billions of users, 100B+ emails/day',
          'Attachment deduplication across users',
          'Tiered storage: hot → warm → cold',
          'Regional data centers for latency'
        ]
      }
    },
    {
      id: 'google-photos',
      title: 'Google Photos',
      icon: '📸',
      color: '#4285f4',
      difficulty: 'Hard',
      hasExistingPage: false,
      description: 'Design a photo service with ML-powered organization and search.',
      content: {
        requirements: [
          'Photo/video upload and storage',
          'Automatic organization by faces, places, things',
          'Search by content without manual tags',
          'Shared albums and collaboration',
          'Storage optimization (free tier)'
        ],
        components: [
          { name: 'Upload Service', desc: 'Handle chunked uploads with resume' },
          { name: 'Processing Pipeline', desc: 'Generate thumbnails, extract metadata' },
          { name: 'ML Services', desc: 'Face detection, object recognition, OCR' },
          { name: 'Object Storage', desc: 'Store originals and processed versions' },
          { name: 'Search Service', desc: 'Index ML features for content search' },
          { name: 'Album Service', desc: 'Manage albums, shares, permissions' }
        ],
        mlFeatures: [
          'Face detection → clustering by person',
          'Object/scene recognition (1000+ categories)',
          'OCR for text in images',
          'Location from EXIF or landmark detection',
          'Auto-generated memories and albums'
        ],
        storageOptimization: [
          'Lossy compression for "high quality" tier',
          'Perceptual hashing for deduplication',
          'Progressive loading (blur → full)',
          'Cold storage for rarely accessed photos'
        ],
        scaling: [
          'Billions of photos uploaded daily',
          'GPU clusters for ML inference',
          'CDN for thumbnail delivery',
          'Batch processing for bulk analysis'
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
      id: 'rate-limiter',
      title: 'Rate Limiter',
      icon: '🚦',
      color: '#f59e0b',
      difficulty: 'Medium-Hard',
      hasExistingPage: true,
      component: RateLimiter,
      description: 'Design a distributed rate limiting system to protect APIs.'
    },
    {
      id: 'notification-system',
      title: 'Notification System',
      icon: '🔔',
      color: '#8b5cf6',
      difficulty: 'Medium-Hard',
      hasExistingPage: true,
      component: NotificationSystem,
      description: 'Design multi-channel notifications with push, email, SMS, and in-app.'
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp / Messaging',
      icon: '💬',
      color: '#25d366',
      difficulty: 'Hard',
      hasExistingPage: true,
      component: WhatsApp,
      description: 'Design messaging platform with E2E encryption and billions of users.'
    },
    {
      id: 'instagram',
      title: 'Instagram',
      icon: '📸',
      color: '#e1306c',
      difficulty: 'Hard',
      hasExistingPage: true,
      component: Instagram,
      description: 'Design a photo-sharing platform with feed generation, stories, likes, comments, and billion-user scale.'
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
      id: 'twitter',
      title: 'Twitter / X',
      icon: '🐦',
      color: '#1da1f2',
      difficulty: 'Hard',
      hasExistingPage: true,
      component: Twitter,
      description: 'Design a social platform with real-time tweets, timeline generation, trending topics, and fan-out strategies.'
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
                <h3 style={{ color: '#a855f7', marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: '600' }}>
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
            background: '#a855f7',
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
          primaryColor="#a855f7"
        />

        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            background: 'linear-gradient(to right, #a855f7, #c084fc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            ⭐ L5-L6+ Level System Design
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto' }}>
            Senior-level system design questions. Complex distributed systems requiring deep
            knowledge of scalability, reliability, and trade-offs.
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

export default L5SystemDesign
