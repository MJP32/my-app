import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

function L4SystemDesign({ onBack }) {
  const [expandedProblem, setExpandedProblem] = useState(null)

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

  const problems = [
    {
      id: 'url-shortener',
      title: 'Design URL Shortener (bit.ly)',
      icon: '🔗',
      color: '#3b82f6',
      difficulty: 'Medium',
      timeEstimate: '35-45 min',
      topics: ['Hashing', 'Database', 'Caching', 'Analytics'],
      requirements: [
        'Shorten long URLs to short aliases',
        'Redirect short URLs to original URLs',
        'Custom aliases (optional)',
        'Analytics: click count, geographic data',
        'Expiration for URLs'
      ],
      components: [
        { name: 'API Gateway', desc: 'Handle incoming requests, rate limiting' },
        { name: 'Application Servers', desc: 'URL generation and redirection logic' },
        { name: 'Database', desc: 'Store URL mappings (NoSQL preferred)' },
        { name: 'Cache', desc: 'Redis for hot URLs' },
        { name: 'Analytics Service', desc: 'Track clicks asynchronously' }
      ],
      keyDecisions: [
        'Short URL generation: Base62 encoding of auto-increment ID or MD5 hash',
        'Database choice: NoSQL (Cassandra/DynamoDB) for high write throughput',
        'Caching strategy: Cache popular URLs, 80-20 rule',
        'Handle collisions: Check existence, retry or append random chars'
      ],
      scaling: [
        'Horizontal scaling of application servers',
        'Database sharding by hash of short URL',
        'CDN for static redirects',
        'Read replicas for analytics queries'
      ]
    },
    {
      id: 'chat-app',
      title: 'Design Basic Chat Application',
      icon: '💬',
      color: '#10b981',
      difficulty: 'Medium',
      timeEstimate: '40-50 min',
      topics: ['WebSockets', 'Message Queue', 'Presence', 'Storage'],
      requirements: [
        '1:1 messaging between users',
        'Group chats (up to 100 members)',
        'Online/offline status',
        'Message delivery status (sent, delivered, read)',
        'Message history persistence'
      ],
      components: [
        { name: 'WebSocket Servers', desc: 'Maintain persistent connections' },
        { name: 'Chat Service', desc: 'Message routing and delivery' },
        { name: 'Presence Service', desc: 'Track user online status' },
        { name: 'Message Store', desc: 'Persist messages (Cassandra)' },
        { name: 'Push Notification', desc: 'For offline users' }
      ],
      keyDecisions: [
        'Connection protocol: WebSocket for real-time, fallback to long polling',
        'Message ordering: Per-conversation sequence numbers',
        'Delivery guarantees: At-least-once with deduplication',
        'Group message fan-out: Push to all members vs pull model'
      ],
      scaling: [
        'Consistent hashing to route users to WebSocket servers',
        'Message queue (Kafka) for async processing',
        'Shard messages by conversation ID',
        'Cache recent messages and user presence'
      ]
    },
    {
      id: 'social-feed',
      title: 'Design Social Media Feed',
      icon: '📱',
      color: '#f59e0b',
      difficulty: 'Medium',
      timeEstimate: '40-50 min',
      topics: ['Fan-out', 'Ranking', 'Caching', 'Timeline'],
      requirements: [
        'Users can post content (text, images)',
        'Users follow other users',
        'Home feed shows posts from followed users',
        'Posts sorted by relevance/recency',
        'Like and comment on posts'
      ],
      components: [
        { name: 'Post Service', desc: 'Create and store posts' },
        { name: 'Feed Service', desc: 'Generate and serve feeds' },
        { name: 'Social Graph', desc: 'Store follow relationships' },
        { name: 'Ranking Service', desc: 'Score and order posts' },
        { name: 'Media Service', desc: 'Store and serve images/videos' }
      ],
      keyDecisions: [
        'Fan-out on write vs read: Hybrid approach based on follower count',
        'Feed storage: Pre-computed feeds in cache for active users',
        'Ranking algorithm: Recency + engagement + affinity',
        'Celebrity handling: Fan-out on read for users with millions of followers'
      ],
      scaling: [
        'Shard user data by user ID',
        'Cache pre-computed feeds in Redis',
        'CDN for media content',
        'Async fan-out using message queues'
      ]
    },
    {
      id: 'file-storage',
      title: 'Design File Storage System',
      icon: '📁',
      color: '#8b5cf6',
      difficulty: 'Medium',
      timeEstimate: '35-45 min',
      topics: ['Object Storage', 'Chunking', 'Deduplication', 'Sync'],
      requirements: [
        'Upload and download files',
        'Organize files in folders',
        'Share files with other users',
        'Version history',
        'Sync across devices'
      ],
      components: [
        { name: 'API Servers', desc: 'Handle file operations' },
        { name: 'Metadata Service', desc: 'Store file/folder metadata' },
        { name: 'Block Storage', desc: 'Store actual file chunks (S3)' },
        { name: 'Sync Service', desc: 'Handle device synchronization' },
        { name: 'Notification Service', desc: 'Notify about file changes' }
      ],
      keyDecisions: [
        'Chunking: Split files into 4MB blocks for efficient sync',
        'Deduplication: Hash-based to avoid storing duplicate blocks',
        'Sync protocol: Delta sync to minimize bandwidth',
        'Conflict resolution: Last-write-wins or manual resolution'
      ],
      scaling: [
        'Metadata sharding by user ID',
        'Block storage on distributed object store',
        'CDN for frequently accessed files',
        'Queue-based processing for large uploads'
      ]
    },
    {
      id: 'web-crawler',
      title: 'Design Basic Web Crawler',
      icon: '🕷️',
      color: '#ef4444',
      difficulty: 'Medium',
      timeEstimate: '35-45 min',
      topics: ['Distributed Systems', 'Politeness', 'Deduplication', 'Storage'],
      requirements: [
        'Crawl web pages starting from seed URLs',
        'Extract and follow links',
        'Respect robots.txt',
        'Handle duplicate URLs',
        'Store crawled content'
      ],
      components: [
        { name: 'URL Frontier', desc: 'Queue of URLs to crawl (prioritized)' },
        { name: 'Fetcher', desc: 'Download web pages' },
        { name: 'Parser', desc: 'Extract links and content' },
        { name: 'URL Filter', desc: 'Deduplicate and validate URLs' },
        { name: 'Content Store', desc: 'Store downloaded pages' }
      ],
      keyDecisions: [
        'Politeness: Rate limit per domain, respect crawl-delay',
        'URL prioritization: PageRank, freshness, domain importance',
        'Deduplication: Bloom filter for seen URLs, content hashing',
        'robots.txt: Cache and respect crawler rules'
      ],
      scaling: [
        'Distribute crawling by domain hash',
        'Multiple fetcher workers per domain',
        'Distributed URL frontier (Kafka)',
        'Horizontal scaling of parsers'
      ]
    },
    {
      id: 'parking-lot',
      title: 'Design Parking Lot System',
      icon: '🚗',
      color: '#06b6d4',
      difficulty: 'Medium',
      timeEstimate: '30-40 min',
      topics: ['OOD', 'Concurrency', 'State Management', 'Pricing'],
      requirements: [
        'Multiple floors and spot types (compact, regular, large)',
        'Vehicle entry and exit',
        'Find available spots',
        'Calculate parking fee',
        'Display board showing availability'
      ],
      components: [
        { name: 'ParkingLot', desc: 'Main class managing floors and spots' },
        { name: 'ParkingFloor', desc: 'Contains spots and display panel' },
        { name: 'ParkingSpot', desc: 'Individual spot with type and status' },
        { name: 'Vehicle', desc: 'Car, Motorcycle, Truck classes' },
        { name: 'Ticket/Payment', desc: 'Track entry time and calculate fee' }
      ],
      keyDecisions: [
        'Spot assignment: Nearest available vs any available',
        'Concurrency: Lock spot during assignment to prevent double booking',
        'Pricing: Hourly rate, different rates for spot types',
        'Spot finding: Keep count per type, or search all spots'
      ],
      scaling: [
        'Multiple entry/exit points with distributed processing',
        'Real-time availability updates via WebSocket',
        'Database for persistent state, cache for availability',
        'Event-driven updates to display boards'
      ]
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
            Mid-level system design questions. Focus on complete system architecture,
            component interaction, and basic scaling strategies.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '1.5rem'
        }}>
          {problems.map(problem => (
            <div
              key={problem.id}
              style={{
                background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                borderRadius: '12px',
                border: `2px solid ${problem.color}`,
                overflow: 'hidden'
              }}
            >
              <div style={{ padding: '1.5rem' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '2rem' }}>{problem.icon}</span>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: problem.color }}>
                      {problem.title}
                    </h2>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  <span style={{
                    background: getDifficultyColor(problem.difficulty),
                    color: 'white',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {problem.difficulty}
                  </span>
                  <span style={{
                    background: '#374151',
                    color: '#d1d5db',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem'
                  }}>
                    {problem.timeEstimate}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  {problem.topics.map((topic, i) => (
                    <span
                      key={i}
                      style={{
                        background: 'rgba(59, 130, 246, 0.2)',
                        color: '#93c5fd',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.75rem'
                      }}
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setExpandedProblem(expandedProblem === problem.id ? null : problem.id)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: problem.color,
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  {expandedProblem === problem.id ? 'Hide Details' : 'View Solution Approach'}
                  <span>{expandedProblem === problem.id ? '↑' : '↓'}</span>
                </button>
              </div>

              {expandedProblem === problem.id && (
                <div style={{
                  padding: '0 1.5rem 1.5rem',
                  borderTop: '1px solid #374151'
                }}>
                  <div style={{ marginTop: '1rem' }}>
                    <h4 style={{ color: '#9ca3af', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                      Requirements
                    </h4>
                    <ul style={{ paddingLeft: '1.25rem', color: '#d1d5db', fontSize: '0.9rem' }}>
                      {problem.requirements.map((req, i) => (
                        <li key={i} style={{ marginBottom: '0.25rem' }}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ marginTop: '1rem' }}>
                    <h4 style={{ color: '#9ca3af', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                      Key Components
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {problem.components.map((comp, i) => (
                        <div key={i} style={{
                          background: '#1f2937',
                          padding: '0.5rem 0.75rem',
                          borderRadius: '4px',
                          fontSize: '0.85rem'
                        }}>
                          <span style={{ color: problem.color, fontWeight: '600' }}>{comp.name}: </span>
                          <span style={{ color: '#d1d5db' }}>{comp.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginTop: '1rem' }}>
                    <h4 style={{ color: '#9ca3af', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                      Key Design Decisions
                    </h4>
                    <ul style={{ paddingLeft: '1.25rem', color: '#d1d5db', fontSize: '0.85rem' }}>
                      {problem.keyDecisions.map((dec, i) => (
                        <li key={i} style={{ marginBottom: '0.25rem' }}>{dec}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ marginTop: '1rem' }}>
                    <h4 style={{ color: '#9ca3af', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                      Scaling Considerations
                    </h4>
                    <ul style={{ paddingLeft: '1.25rem', color: '#d1d5db', fontSize: '0.85rem' }}>
                      {problem.scaling.map((scale, i) => (
                        <li key={i} style={{ marginBottom: '0.25rem' }}>{scale}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default L4SystemDesign
