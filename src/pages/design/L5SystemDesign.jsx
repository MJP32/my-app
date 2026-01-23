import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

function L5SystemDesign({ onBack }) {
  const [expandedProblem, setExpandedProblem] = useState(null)
  const [activeTab, setActiveTab] = useState({})

  const breadcrumb = {
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

  const problems = [
    {
      id: 'youtube',
      title: 'Design YouTube / Video Streaming',
      icon: '📺',
      color: '#ef4444',
      difficulty: 'Hard',
      timeEstimate: '45-60 min',
      topics: ['CDN', 'Transcoding', 'Streaming', 'Recommendations'],
      overview: 'Build a video sharing platform supporting upload, transcoding, streaming, and discovery.',
      requirements: [
        'Video upload and processing',
        'Adaptive bitrate streaming',
        'Video recommendations',
        'Comments, likes, subscriptions',
        'Live streaming support'
      ],
      architecture: {
        components: [
          { name: 'Upload Service', desc: 'Handle large file uploads with resumable uploads' },
          { name: 'Transcoding Pipeline', desc: 'Convert to multiple resolutions/codecs (HLS/DASH)' },
          { name: 'Video Storage', desc: 'Object storage (S3) for video segments' },
          { name: 'CDN', desc: 'Edge caching for video delivery worldwide' },
          { name: 'Metadata Service', desc: 'Video info, user data, engagement metrics' },
          { name: 'Recommendation Engine', desc: 'ML-based personalized suggestions' },
          { name: 'Search Service', desc: 'Elasticsearch for video discovery' }
        ],
        dataFlow: [
          '1. User uploads video → Upload Service stores raw file',
          '2. Message queue triggers Transcoding Pipeline',
          '3. Transcoded segments stored in Object Storage',
          '4. CDN pulls and caches segments from origin',
          '5. Client requests manifest, streams adaptive segments'
        ]
      },
      deepDive: {
        'Video Processing': [
          'Chunked upload with resumption support',
          'Transcode to multiple resolutions: 360p, 480p, 720p, 1080p, 4K',
          'Generate HLS/DASH manifests for adaptive streaming',
          'Create thumbnails at multiple timestamps',
          'Content moderation pipeline (ML + manual review)'
        ],
        'Streaming': [
          'Adaptive Bitrate Streaming (ABR) based on bandwidth',
          'CDN with geographic distribution and edge caching',
          'Prefetch next segments for smooth playback',
          'Handle seek operations efficiently',
          'Live streaming: RTMP ingest → HLS/DASH output'
        ],
        'Scale': [
          'Distributed transcoding workers (K8s jobs)',
          'Tiered storage: hot (SSD) → warm → cold (Glacier)',
          'Database sharding by video ID and user ID',
          'Cache video metadata and user engagement',
          '~500 hours of video uploaded per minute at YouTube scale'
        ]
      }
    },
    {
      id: 'google-search',
      title: 'Design Google Search',
      icon: '🔍',
      color: '#4285f4',
      difficulty: 'Hard',
      timeEstimate: '50-60 min',
      topics: ['Crawling', 'Indexing', 'Ranking', 'Query Processing'],
      overview: 'Build a web search engine with crawling, indexing, and ranking capabilities.',
      requirements: [
        'Crawl billions of web pages',
        'Build searchable index',
        'Rank results by relevance',
        'Sub-second query response',
        'Handle 100K+ QPS'
      ],
      architecture: {
        components: [
          { name: 'Web Crawler', desc: 'Distributed crawler respecting robots.txt' },
          { name: 'URL Frontier', desc: 'Prioritized queue of URLs to crawl' },
          { name: 'Document Store', desc: 'Store raw HTML and parsed content' },
          { name: 'Indexer', desc: 'Build inverted index from documents' },
          { name: 'Index Servers', desc: 'Serve index shards for query processing' },
          { name: 'Ranking Service', desc: 'PageRank + 200+ signals' },
          { name: 'Query Processor', desc: 'Parse, expand, and route queries' }
        ],
        dataFlow: [
          '1. Crawler fetches pages → stores in Document Store',
          '2. Indexer processes documents → builds inverted index',
          '3. Index partitioned and distributed to Index Servers',
          '4. Query comes in → Query Processor parses and expands',
          '5. Scatter query to index shards → gather and rank results'
        ]
      },
      deepDive: {
        'Indexing': [
          'Inverted index: term → list of (docID, positions, frequency)',
          'Forward index: docID → document metadata and features',
          'Index sharding: by document (horizontal) or term (vertical)',
          'Incremental indexing for fresh content',
          'Compression: variable-byte encoding, delta encoding'
        ],
        'Ranking': [
          'PageRank: importance based on link structure',
          'TF-IDF: term frequency-inverse document frequency',
          'User signals: click-through rate, dwell time',
          'Freshness: recency for time-sensitive queries',
          'Machine learning: Learning to Rank (LTR) models'
        ],
        'Scale': [
          'Trillions of documents indexed',
          'Index size: hundreds of petabytes',
          'Query fanout to thousands of index shards',
          'Caching: query cache, result cache, snippet cache',
          'Multiple data centers with geographic routing'
        ]
      }
    },
    {
      id: 'google-maps',
      title: 'Design Google Maps',
      icon: '🗺️',
      color: '#34a853',
      difficulty: 'Hard',
      timeEstimate: '45-60 min',
      topics: ['Geospatial', 'Routing', 'Tile Rendering', 'Real-time Traffic'],
      overview: 'Build a mapping service with navigation, real-time traffic, and location search.',
      requirements: [
        'Display map tiles at various zoom levels',
        'Search for places and addresses',
        'Turn-by-turn navigation',
        'Real-time traffic updates',
        'Offline maps support'
      ],
      architecture: {
        components: [
          { name: 'Tile Service', desc: 'Pre-rendered map tiles at 20+ zoom levels' },
          { name: 'Geocoding Service', desc: 'Address ↔ coordinates conversion' },
          { name: 'Places Service', desc: 'POI search with location context' },
          { name: 'Routing Engine', desc: 'Calculate optimal routes (Dijkstra/A*)' },
          { name: 'Traffic Service', desc: 'Real-time traffic data aggregation' },
          { name: 'ETA Service', desc: 'Predict arrival times with ML' },
          { name: 'Location Service', desc: 'Track user location, share with others' }
        ],
        dataFlow: [
          '1. Client requests tiles for viewport → Tile Service returns cached tiles',
          '2. User searches → Geocoding/Places returns coordinates',
          '3. Route request → Routing Engine calculates path with traffic',
          '4. During navigation → continuous traffic updates and rerouting',
          '5. Crowdsourced location data improves traffic accuracy'
        ]
      },
      deepDive: {
        'Map Tiles': [
          'Quadtree structure for spatial indexing',
          'Pre-render tiles at zoom levels 0-20',
          'Vector tiles vs raster tiles trade-off',
          'Tile caching at CDN edge locations',
          'Dynamic layers: traffic, transit, terrain'
        ],
        'Routing': [
          'Graph representation of road network',
          'Contraction Hierarchies for fast routing',
          'Consider: distance, time, tolls, road type',
          'Alternative routes generation',
          'Real-time rerouting based on traffic'
        ],
        'Scale': [
          'Billions of map tile requests per day',
          'Road network: 100M+ road segments',
          'Hierarchical data: country → region → city → street',
          'Partition by geographic regions (geohash)',
          'Edge computing for low-latency navigation'
        ]
      }
    },
    {
      id: 'distributed-cache',
      title: 'Design Distributed Cache System',
      icon: '💾',
      color: '#f59e0b',
      difficulty: 'Hard',
      timeEstimate: '40-50 min',
      topics: ['Consistent Hashing', 'Replication', 'Eviction', 'Partitioning'],
      overview: 'Build a distributed in-memory cache like Redis or Memcached.',
      requirements: [
        'Key-value storage with O(1) operations',
        'Distributed across multiple nodes',
        'High availability with replication',
        'Support for eviction policies',
        'Cluster management and rebalancing'
      ],
      architecture: {
        components: [
          { name: 'Cache Nodes', desc: 'Store data partitions in memory' },
          { name: 'Coordinator', desc: 'Route requests to correct node' },
          { name: 'Cluster Manager', desc: 'Track node health, handle failures' },
          { name: 'Replication Manager', desc: 'Sync data to replicas' },
          { name: 'Client Library', desc: 'Handle partitioning, failover' }
        ],
        dataFlow: [
          '1. Client hashes key → determines partition',
          '2. Request routed to primary node for partition',
          '3. Write: replicate to N-1 replica nodes',
          '4. Read: serve from primary or any replica',
          '5. Node failure: promote replica, rebalance'
        ]
      },
      deepDive: {
        'Partitioning': [
          'Consistent hashing with virtual nodes',
          'Each physical node owns multiple virtual nodes',
          'Adding/removing nodes moves minimal data',
          'Hash ring for deterministic routing',
          'Rebalancing triggered on topology changes'
        ],
        'Replication': [
          'Replicate each partition to N nodes (typically N=3)',
          'Synchronous vs asynchronous replication trade-off',
          'Quorum reads/writes for consistency',
          'Handle network partitions gracefully',
          'Anti-entropy for eventual consistency'
        ],
        'Operations': [
          'LRU, LFU, TTL-based eviction policies',
          'Memory management and OOM handling',
          'Atomic operations: CAS, increment',
          'Pub/sub for cache invalidation',
          'Persistence options: RDB, AOF'
        ]
      }
    },
    {
      id: 'google-drive',
      title: 'Design Google Drive',
      icon: '📂',
      color: '#4285f4',
      difficulty: 'Hard',
      timeEstimate: '45-55 min',
      topics: ['File Sync', 'Chunking', 'Conflict Resolution', 'Collaboration'],
      overview: 'Build a cloud file storage and sync service with real-time collaboration.',
      requirements: [
        'File upload/download with folder hierarchy',
        'Sync files across multiple devices',
        'Real-time collaboration on documents',
        'Version history and recovery',
        'Sharing and permissions'
      ],
      architecture: {
        components: [
          { name: 'API Gateway', desc: 'Authentication, rate limiting' },
          { name: 'Metadata Service', desc: 'File/folder structure, permissions' },
          { name: 'Block Server', desc: 'Handle file chunks' },
          { name: 'Object Storage', desc: 'Store actual file blocks (S3)' },
          { name: 'Sync Service', desc: 'Track changes, sync to devices' },
          { name: 'Notification Service', desc: 'Push updates to clients' }
        ],
        dataFlow: [
          '1. File change detected → compute delta',
          '2. Upload changed blocks → Block Server',
          '3. Update metadata with new block references',
          '4. Notify other devices via long-poll/WebSocket',
          '5. Other devices pull changed blocks'
        ]
      },
      deepDive: {
        'Sync Algorithm': [
          'Split files into fixed-size blocks (4-8 MB)',
          'Content-defined chunking for better dedup',
          'Block-level deduplication across users',
          'Delta sync: only transfer changed blocks',
          'Client maintains local cache of blocks'
        ],
        'Conflict Resolution': [
          'Optimistic concurrency with version vectors',
          'Last-writer-wins for simple conflicts',
          'Create conflict copies for complex cases',
          'Operational Transform for real-time editing',
          'CRDT for eventual consistency'
        ],
        'Scale': [
          'Metadata sharded by user ID',
          'Block storage distributed by content hash',
          'Cold storage tier for old versions',
          'Edge caching for frequently accessed files',
          'Billions of files, petabytes of storage'
        ]
      }
    },
    {
      id: 'gmail',
      title: 'Design Gmail',
      icon: '📧',
      color: '#ea4335',
      difficulty: 'Hard',
      timeEstimate: '45-55 min',
      topics: ['Email Protocol', 'Search', 'Spam Filter', 'Storage'],
      overview: 'Build an email service handling billions of messages with search and spam filtering.',
      requirements: [
        'Send and receive emails (SMTP/IMAP)',
        'Full-text search across emails',
        'Spam and phishing detection',
        'Labels, filters, and organization',
        'Attachments and large files'
      ],
      architecture: {
        components: [
          { name: 'SMTP Gateway', desc: 'Send/receive emails' },
          { name: 'Mail Processor', desc: 'Parse, classify, route messages' },
          { name: 'Spam Filter', desc: 'ML-based spam detection' },
          { name: 'Message Store', desc: 'Store emails with metadata' },
          { name: 'Search Index', desc: 'Full-text search capability' },
          { name: 'Attachment Store', desc: 'Object storage for files' }
        ],
        dataFlow: [
          '1. Incoming email → SMTP Gateway',
          '2. Spam Filter scores message',
          '3. Mail Processor applies user filters',
          '4. Store message and index for search',
          '5. Notify user via push/poll'
        ]
      },
      deepDive: {
        'Email Processing': [
          'SMTP for sending, IMAP/POP3 for retrieval',
          'DKIM, SPF, DMARC for authentication',
          'Parse MIME structure for body/attachments',
          'Apply user-defined filters and labels',
          'Thread grouping by subject and references'
        ],
        'Spam Detection': [
          'Content analysis: keywords, patterns',
          'Sender reputation scoring',
          'User behavior signals (mark as spam)',
          'ML models: Naive Bayes, neural networks',
          'Real-time threat intelligence'
        ],
        'Scale': [
          'Billions of active users',
          'Hundreds of billions of emails per day',
          'Shard mailboxes by user ID',
          'Per-user search indexes',
          'Attachment deduplication across users'
        ]
      }
    },
    {
      id: 'google-docs',
      title: 'Design Google Docs (Collaborative Editing)',
      icon: '📝',
      color: '#4285f4',
      difficulty: 'Hard',
      timeEstimate: '50-60 min',
      topics: ['OT/CRDT', 'Real-time Sync', 'Presence', 'Conflict Resolution'],
      overview: 'Build a real-time collaborative document editor supporting multiple concurrent users.',
      requirements: [
        'Real-time collaborative editing',
        'See other users\' cursors and selections',
        'Offline editing with sync',
        'Version history and restore',
        'Comments and suggestions'
      ],
      architecture: {
        components: [
          { name: 'Collaboration Server', desc: 'Handle real-time operations' },
          { name: 'OT/CRDT Engine', desc: 'Transform concurrent operations' },
          { name: 'Document Store', desc: 'Persist document state' },
          { name: 'Presence Service', desc: 'Track user cursors/selections' },
          { name: 'History Service', desc: 'Store operation log for versioning' },
          { name: 'WebSocket Gateway', desc: 'Real-time bidirectional communication' }
        ],
        dataFlow: [
          '1. User types → local operation generated',
          '2. Send operation to Collaboration Server',
          '3. Server transforms operation against concurrent ops',
          '4. Broadcast transformed op to all clients',
          '5. Clients apply operation to local document'
        ]
      },
      deepDive: {
        'Operational Transform': [
          'Transform(op1, op2) → (op1\', op2\')',
          'Preserve user intent despite concurrent edits',
          'Server maintains canonical operation order',
          'Client optimistically applies local ops',
          'Convergence: all clients reach same state'
        ],
        'CRDT Alternative': [
          'Conflict-free Replicated Data Types',
          'No central server needed for consistency',
          'Commutative, associative, idempotent operations',
          'Higher bandwidth but simpler coordination',
          'Examples: Yjs, Automerge'
        ],
        'Scale': [
          'One collaboration server per document',
          'Shard documents across servers',
          'Compress operation history',
          'Checkpoint document state periodically',
          'Handle reconnection and sync'
        ]
      }
    },
    {
      id: 'rate-limiter',
      title: 'Design Rate Limiter',
      icon: '🚦',
      color: '#f59e0b',
      difficulty: 'Medium-Hard',
      timeEstimate: '35-45 min',
      topics: ['Algorithms', 'Distributed Systems', 'Redis', 'API Gateway'],
      overview: 'Build a distributed rate limiting system to protect APIs from abuse.',
      requirements: [
        'Limit requests per user/IP/API key',
        'Multiple rate limit rules (per second, minute, day)',
        'Distributed across multiple servers',
        'Low latency impact on requests',
        'Graceful handling of bursts'
      ],
      architecture: {
        components: [
          { name: 'Rate Limiter Middleware', desc: 'Check limits before request processing' },
          { name: 'Rules Engine', desc: 'Configure limits per endpoint/user' },
          { name: 'Counter Store', desc: 'Track request counts (Redis)' },
          { name: 'Rate Limit Headers', desc: 'Return remaining quota to clients' }
        ],
        dataFlow: [
          '1. Request arrives at API Gateway',
          '2. Extract rate limit key (user ID, IP, API key)',
          '3. Check counter in Redis against limit',
          '4. Allow or reject with 429 Too Many Requests',
          '5. Increment counter, return rate limit headers'
        ]
      },
      deepDive: {
        'Algorithms': [
          'Token Bucket: tokens refill at fixed rate, request consumes token',
          'Leaky Bucket: requests processed at fixed rate, overflow rejected',
          'Fixed Window: count requests in time window',
          'Sliding Window Log: track timestamps of requests',
          'Sliding Window Counter: hybrid of fixed windows'
        ],
        'Distributed': [
          'Centralized Redis counter (simple, single point of failure)',
          'Race conditions: use Lua scripts or MULTI/EXEC',
          'Sticky sessions to route to same rate limiter',
          'Eventually consistent: allow some overflow',
          'Local counters with periodic sync'
        ],
        'Production': [
          'Multiple dimensions: IP + user + endpoint',
          'Different limits for different tiers',
          'Bypass for internal services',
          'Monitoring and alerting on rate limit hits',
          'Graceful degradation under load'
        ]
      }
    },
    {
      id: 'notification-system',
      title: 'Design Notification System',
      icon: '🔔',
      color: '#8b5cf6',
      difficulty: 'Medium-Hard',
      timeEstimate: '40-50 min',
      topics: ['Push', 'Email', 'SMS', 'Queueing', 'Preferences'],
      overview: 'Build a multi-channel notification system supporting push, email, SMS, and in-app.',
      requirements: [
        'Multiple channels: push, email, SMS, in-app',
        'User notification preferences',
        'Template management',
        'Delivery tracking and analytics',
        'Rate limiting and batching'
      ],
      architecture: {
        components: [
          { name: 'Notification Service', desc: 'API to trigger notifications' },
          { name: 'Preference Service', desc: 'User channel and frequency preferences' },
          { name: 'Template Service', desc: 'Manage notification templates' },
          { name: 'Message Queue', desc: 'Buffer notifications for processing' },
          { name: 'Channel Workers', desc: 'Send via specific channels' },
          { name: 'Delivery Tracker', desc: 'Track delivery status' }
        ],
        dataFlow: [
          '1. Event triggers notification request',
          '2. Fetch user preferences and template',
          '3. Render notification, enqueue for each channel',
          '4. Channel workers process queue, call external providers',
          '5. Track delivery status, handle retries'
        ]
      },
      deepDive: {
        'Channels': [
          'Push: APNs (iOS), FCM (Android) - device tokens',
          'Email: SMTP, SES, SendGrid - handle bounces',
          'SMS: Twilio, SNS - expensive, use sparingly',
          'In-app: WebSocket or polling',
          'Webhook: for B2B integrations'
        ],
        'Reliability': [
          'Retry with exponential backoff',
          'Dead letter queue for failed deliveries',
          'Idempotency to prevent duplicates',
          'Priority queues for urgent notifications',
          'Circuit breaker for failing providers'
        ],
        'Scale': [
          'Partition queues by notification type',
          'Batch similar notifications (digest emails)',
          'Rate limit per user to prevent spam',
          'Millions of notifications per minute',
          'Multi-region for low latency'
        ]
      }
    },
    {
      id: 'whatsapp',
      title: 'Design WhatsApp / Messaging System',
      icon: '💬',
      color: '#25d366',
      difficulty: 'Hard',
      timeEstimate: '50-60 min',
      topics: ['WebSocket', 'E2E Encryption', 'Message Queue', 'Presence'],
      overview: 'Build a messaging platform supporting billions of users with end-to-end encryption.',
      requirements: [
        '1:1 and group messaging',
        'End-to-end encryption',
        'Message delivery status (sent, delivered, read)',
        'Online/offline presence',
        'Media sharing (images, videos, documents)'
      ],
      architecture: {
        components: [
          { name: 'Gateway Service', desc: 'WebSocket connection management' },
          { name: 'Chat Service', desc: 'Message routing and delivery' },
          { name: 'Group Service', desc: 'Manage group membership and fan-out' },
          { name: 'Presence Service', desc: 'Track online status' },
          { name: 'Message Store', desc: 'Persist messages until delivered' },
          { name: 'Media Service', desc: 'Store and serve media files' },
          { name: 'Push Service', desc: 'Wake up offline devices' }
        ],
        dataFlow: [
          '1. User connects → assigned to Gateway server',
          '2. Send message → route to recipient\'s Gateway',
          '3. If offline → store message, send push notification',
          '4. Recipient connects → deliver pending messages',
          '5. Delivery receipts flow back to sender'
        ]
      },
      deepDive: {
        'Real-time Messaging': [
          'Long-lived WebSocket connections',
          'Consistent hashing to assign users to servers',
          'Message ordering per conversation',
          'Optimistic local delivery, server confirmation',
          'Heartbeat for connection health'
        ],
        'Encryption': [
          'Signal Protocol for E2E encryption',
          'Pre-key bundles for async key exchange',
          'Double Ratchet for forward secrecy',
          'Server cannot read message content',
          'Media encrypted with random key, key sent in message'
        ],
        'Scale': [
          '2+ billion users, 100B+ messages/day',
          'Minimal server storage (messages deleted after delivery)',
          'Erlang/Elixir for massive concurrency',
          'Shard by user ID for message storage',
          'Regional data centers for latency'
        ]
      }
    },
    {
      id: 'google-photos',
      title: 'Design Google Photos',
      icon: '📸',
      color: '#4285f4',
      difficulty: 'Hard',
      timeEstimate: '45-55 min',
      topics: ['ML/AI', 'Object Storage', 'Search', 'Compression'],
      overview: 'Build a photo storage service with ML-powered organization and search.',
      requirements: [
        'Photo/video upload and storage',
        'Automatic organization (faces, places, things)',
        'Search by content (no tags needed)',
        'Shared albums and collaboration',
        'Free tier with storage optimization'
      ],
      architecture: {
        components: [
          { name: 'Upload Service', desc: 'Handle photo/video uploads' },
          { name: 'Processing Pipeline', desc: 'Analyze, compress, generate thumbnails' },
          { name: 'ML Services', desc: 'Face detection, object recognition, OCR' },
          { name: 'Object Storage', desc: 'Store originals and processed versions' },
          { name: 'Search Service', desc: 'Index ML features for content search' },
          { name: 'Album Service', desc: 'Manage albums and sharing' }
        ],
        dataFlow: [
          '1. Photo uploaded → stored in Object Storage',
          '2. Processing pipeline generates thumbnails',
          '3. ML services extract features (faces, objects, text)',
          '4. Index features in Search Service',
          '5. User searches → query ML features → return results'
        ]
      },
      deepDive: {
        'ML Features': [
          'Face detection and clustering (group by person)',
          'Object and scene recognition',
          'OCR for text in images',
          'Location extraction from EXIF/reverse geocoding',
          'Auto-generated albums (trips, events)'
        ],
        'Storage Optimization': [
          'Lossy compression for "high quality" tier',
          'Deduplication using perceptual hashing',
          'Progressive image loading (blur → full)',
          'Adaptive quality based on viewing device',
          'Cold storage for old, rarely accessed photos'
        ],
        'Scale': [
          'Billions of photos uploaded daily',
          'Petabytes of storage',
          'GPU clusters for ML inference',
          'CDN for thumbnail delivery',
          'Batch processing for bulk analysis'
        ]
      }
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

  const getTabForProblem = (problemId) => activeTab[problemId] || 'overview'
  const setTabForProblem = (problemId, tab) => setActiveTab({ ...activeTab, [problemId]: tab })

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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
              <button
                onClick={() => setExpandedProblem(expandedProblem === problem.id ? null : problem.id)}
                style={{
                  width: '100%',
                  padding: '1.5rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '2.5rem' }}>{problem.icon}</span>
                  <div style={{ textAlign: 'left' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: problem.color }}>
                      {problem.title}
                    </h2>
                    <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                      {problem.overview}
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <span style={{
                      background: getDifficultyColor(problem.difficulty),
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      {problem.difficulty}
                    </span>
                    <span style={{
                      background: '#374151',
                      color: '#d1d5db',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '4px',
                      fontSize: '0.8rem'
                    }}>
                      {problem.timeEstimate}
                    </span>
                  </div>
                  <span style={{ color: problem.color, fontSize: '1.5rem' }}>
                    {expandedProblem === problem.id ? '−' : '+'}
                  </span>
                </div>
              </button>

              {expandedProblem === problem.id && (
                <div style={{ padding: '0 1.5rem 1.5rem', borderTop: '1px solid #374151' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    {problem.topics.map((topic, i) => (
                      <span
                        key={i}
                        style={{
                          background: `${problem.color}30`,
                          color: problem.color,
                          padding: '0.3rem 0.6rem',
                          borderRadius: '4px',
                          fontSize: '0.8rem',
                          fontWeight: '500'
                        }}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid #374151', paddingBottom: '0.5rem' }}>
                    {['overview', 'architecture', 'deepDive'].map(tab => (
                      <button
                        key={tab}
                        onClick={() => setTabForProblem(problem.id, tab)}
                        style={{
                          padding: '0.5rem 1rem',
                          background: getTabForProblem(problem.id) === tab ? problem.color : 'transparent',
                          color: getTabForProblem(problem.id) === tab ? 'white' : '#9ca3af',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontWeight: '500',
                          fontSize: '0.9rem'
                        }}
                      >
                        {tab === 'overview' ? 'Requirements' : tab === 'architecture' ? 'Architecture' : 'Deep Dive'}
                      </button>
                    ))}
                  </div>

                  {getTabForProblem(problem.id) === 'overview' && (
                    <div>
                      <h4 style={{ color: '#d1d5db', marginBottom: '0.75rem', fontSize: '1rem' }}>Functional Requirements</h4>
                      <ul style={{ paddingLeft: '1.5rem', color: '#9ca3af' }}>
                        {problem.requirements.map((req, i) => (
                          <li key={i} style={{ marginBottom: '0.5rem' }}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {getTabForProblem(problem.id) === 'architecture' && (
                    <div>
                      <h4 style={{ color: '#d1d5db', marginBottom: '0.75rem', fontSize: '1rem' }}>Key Components</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        {problem.architecture.components.map((comp, i) => (
                          <div key={i} style={{
                            background: '#1f2937',
                            padding: '0.75rem',
                            borderRadius: '6px',
                            border: '1px solid #374151'
                          }}>
                            <span style={{ color: problem.color, fontWeight: '600' }}>{comp.name}</span>
                            <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginTop: '0.25rem' }}>{comp.desc}</p>
                          </div>
                        ))}
                      </div>

                      <h4 style={{ color: '#d1d5db', marginBottom: '0.75rem', fontSize: '1rem' }}>Data Flow</h4>
                      <div style={{ background: '#1f2937', padding: '1rem', borderRadius: '6px', border: '1px solid #374151' }}>
                        {problem.architecture.dataFlow.map((step, i) => (
                          <p key={i} style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{step}</p>
                        ))}
                      </div>
                    </div>
                  )}

                  {getTabForProblem(problem.id) === 'deepDive' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                      {Object.entries(problem.deepDive).map(([title, points]) => (
                        <div key={title} style={{
                          background: '#1f2937',
                          padding: '1rem',
                          borderRadius: '6px',
                          border: '1px solid #374151'
                        }}>
                          <h5 style={{ color: problem.color, marginBottom: '0.75rem', fontWeight: '600' }}>{title}</h5>
                          <ul style={{ paddingLeft: '1.25rem', color: '#9ca3af', fontSize: '0.85rem' }}>
                            {points.map((point, i) => (
                              <li key={i} style={{ marginBottom: '0.4rem' }}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default L5SystemDesign
