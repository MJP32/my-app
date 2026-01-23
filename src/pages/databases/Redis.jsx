import { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

const DATABASE_COLORS = {
  primary: '#60a5fa',
  primaryHover: '#93c5fd',
  bg: 'rgba(59, 130, 246, 0.1)',
  border: 'rgba(59, 130, 246, 0.3)',
  arrow: '#3b82f6',
  hoverBg: 'rgba(59, 130, 246, 0.2)',
  topicBg: 'rgba(59, 130, 246, 0.2)'
}

// Background colors for subtopic descriptions
const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
]

function Redis({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'data-structures',
      name: 'Data Structures',
      icon: '📦',
      color: '#ef4444',
      description: 'Rich data structures beyond simple key-value pairs',
      details: [
        {
          name: 'Strings',
          explanation: 'Most basic Redis data type, can store text or binary data up to 512 MB. Use GET/SET commands. Supports atomic operations like INCR, DECR for counters. APPEND for string concatenation. Perfect for caching, session storage, and simple values.'
        },
        {
          name: 'Hashes',
          explanation: 'Maps between string fields and string values. Like mini Redis instances inside a key. Use HGET, HSET, HMGET, HMSET. Perfect for representing objects (e.g., user:1000 → {name, email, age}). More memory efficient than multiple string keys. Can increment fields with HINCRBY.'
        },
        {
          name: 'Lists',
          explanation: 'Linked lists of string elements. LPUSH/RPUSH to add elements at head/tail. LPOP/RPOP to remove and return elements. Blocking operations with BLPOP/BRPOP for queue implementations. Use LRANGE to get a range. Perfect for message queues, activity feeds, recent items.'
        },
        {
          name: 'Sets',
          explanation: 'Unordered collection of unique strings. SADD to add members, SISMEMBER to check membership. Set operations: SUNION, SINTER, SDIFF for union, intersection, difference. SPOP for random element removal. Perfect for unique visitors, tags, and relationships.'
        },
        {
          name: 'Sorted Sets',
          explanation: 'Sets where every member has an associated score for ordering. ZADD to add with score. ZRANGE/ZREVRANGE for range queries by rank. ZRANGEBYSCORE for score-based queries. Atomic increment with ZINCRBY. Perfect for leaderboards, priority queues, time series.'
        },
        {
          name: 'Bitmaps & HyperLogLog',
          explanation: 'Bitmaps for bit-level operations on strings. SETBIT/GETBIT for individual bits. BITCOUNT for counting set bits. HyperLogLog for cardinality estimation using minimal memory. PFADD to add elements, PFCOUNT for approximate count. Perfect for analytics and unique counting.'
        },
        {
          name: 'Streams',
          explanation: 'Append-only log data structure. XADD to add entries, XREAD to read. Consumer groups for distributed processing. XACK for acknowledging processed messages. Time-based or ID-based queries. Perfect for event sourcing, activity streams, and message brokers.'
        }
      ]
    },
    {
      id: 'persistence',
      name: 'Persistence',
      icon: '💾',
      color: '#f59e0b',
      description: 'Options for saving data to disk for durability',
      details: [
        {
          name: 'RDB Snapshots',
          explanation: 'Point-in-time snapshots of entire dataset saved to disk. Compact binary format. Configured with "save" directives (e.g., save after 900 seconds if 1 key changed). BGSAVE for manual snapshot. Fast restarts from snapshot. Minimal impact on performance. Good for backups and disaster recovery.'
        },
        {
          name: 'AOF (Append Only File)',
          explanation: 'Logs every write operation. Can replay the log to reconstruct dataset. More durable than RDB. Three fsync policies: always (slow, most durable), everysec (good balance), no (fast, less durable). AOF rewrite compacts the log. Better for minimizing data loss.'
        },
        {
          name: 'Hybrid Persistence',
          explanation: 'Combine RDB and AOF for best of both. Use RDB for fast restarts and AOF for durability. On restart, AOF is preferred for recovery. RDB as fallback. Configurable with "aof-use-rdb-preamble" directive. Balances performance and data safety.'
        },
        {
          name: 'No Persistence',
          explanation: 'Pure in-memory mode for maximum performance. No disk writes. Data lost on restart. Perfect for pure caching where source data exists elsewhere. Disable with save "" and appendonly no. Useful for session stores with short TTLs.'
        }
      ]
    },
    {
      id: 'caching',
      name: 'Caching Strategies',
      icon: '⚡',
      color: '#10b981',
      description: 'Common patterns for using Redis as a cache',
      details: [
        {
          name: 'Cache-Aside',
          explanation: 'Application checks cache first. On miss, fetch from database and populate cache. SET with TTL to avoid stale data. Simple and widely used. Application controls caching logic. Best for read-heavy workloads. Lazy loading pattern.'
        },
        {
          name: 'Write-Through',
          explanation: 'On write, update both cache and database. Cache always in sync with database. Higher write latency. No cache misses for recently written data. Ensures consistency. Good for write-heavy workloads where reads must be fast.'
        },
        {
          name: 'Write-Behind',
          explanation: 'Write to cache immediately, asynchronously write to database. Lower write latency. Risk of data loss if cache fails before DB write. Batch database writes for efficiency. Complex to implement correctly. Best for very high write throughput.'
        },
        {
          name: 'Eviction Policies',
          explanation: 'When max memory reached, Redis can evict keys. Policies: noeviction (error on memory limit), allkeys-lru (evict least recently used), volatile-lru (only keys with TTL), allkeys-random, volatile-ttl (evict soonest TTL). Configure with maxmemory-policy. Choose based on access patterns.'
        }
      ]
    },
    {
      id: 'clustering',
      name: 'Clustering & HA',
      icon: '🔄',
      color: '#8b5cf6',
      description: 'High availability and horizontal scaling',
      details: [
        {
          name: 'Replication',
          explanation: 'Master-slave replication for data redundancy. Master handles writes, slaves handle reads. Asynchronous replication. REPLICAOF command to make a server a replica. Read scaling by adding replicas. Automatic reconnection and partial resync.'
        },
        {
          name: 'Redis Sentinel',
          explanation: 'Automated monitoring, notification, and failover. Monitors master and replicas. Automatic failover when master fails. Promotes replica to master. Service discovery for clients. Quorum-based decisions. High availability without Redis Cluster.'
        },
        {
          name: 'Redis Cluster',
          explanation: 'Automatic sharding across multiple nodes. 16384 hash slots distributed across nodes. No single point of failure. Automatic rebalancing. Each node has replicas. Horizontal scalability. CRC16 hash of key for slot assignment. Multi-key operations limited to same slot.'
        },
        {
          name: 'Connection Handling',
          explanation: 'Use connection pooling in applications. Pipelining for batching commands. Pub/Sub for event-driven architecture. Connection multiplexing. RESP protocol for client-server communication. Client libraries handle reconnection.'
        }
      ]
    },
    {
      id: 'transactions',
      name: 'Transactions & Lua',
      icon: '🔐',
      color: '#06b6d4',
      description: 'Atomic operations and server-side scripting',
      details: [
        {
          name: 'MULTI/EXEC',
          explanation: 'Queue commands with MULTI, execute atomically with EXEC. All commands executed serially. No other commands interleave. DISCARD to abort transaction. Errors don\'t rollback executed commands. Use for ensuring consistency of multiple operations.'
        },
        {
          name: 'WATCH',
          explanation: 'Optimistic locking mechanism. WATCH keys before MULTI. Transaction aborts if watched keys change. Check-and-set pattern. UNWATCH to clear watches. Prevents race conditions. Retry transaction on conflict.'
        },
        {
          name: 'Lua Scripting',
          explanation: 'Execute scripts atomically on server side. EVAL command to run Lua scripts. Scripts cached with SCRIPT LOAD. Access Redis commands via redis.call() and redis.pcall(). Complex atomic operations. Reduces network round trips. Can return structured data.'
        },
        {
          name: 'Pipelining',
          explanation: 'Send multiple commands without waiting for responses. Reduces network latency. Responses returned in order. Not atomic like transactions. Significantly improves throughput. Use client libraries\' pipeline APIs. Perfect for batch operations.'
        }
      ]
    },
    {
      id: 'pubsub',
      name: 'Pub/Sub & Messaging',
      icon: '📡',
      color: '#ec4899',
      description: 'Real-time messaging patterns',
      details: [
        {
          name: 'Publish/Subscribe',
          explanation: 'Pub/Sub messaging pattern. Publishers send messages to channels. Subscribers receive messages from channels. PUBLISH to send message. SUBSCRIBE to receive. Pattern-based subscriptions with PSUBSCRIBE. Fire-and-forget delivery. Messages not persisted.'
        },
        {
          name: 'Redis Streams',
          explanation: 'Persistent message queue. Messages have IDs. XADD to append. XREAD to consume. Consumer groups for distributed processing. XACK to acknowledge. Claiming pending messages. Perfect for reliable message queues. Time-based or ID-based range queries.'
        },
        {
          name: 'Message Patterns',
          explanation: 'Fan-out: one publisher, many subscribers. Work queue: multiple consumers competing for messages. Priority queue using sorted sets. Delayed messages with TTL. Request-response using blocking lists. Event sourcing with streams.'
        }
      ]
    },
    {
      id: 'use-cases',
      name: 'Common Use Cases',
      icon: '🎯',
      color: '#14b8a6',
      description: 'Real-world applications of Redis',
      details: [
        {
          name: 'Session Store',
          explanation: 'Store user sessions with TTL. Fast read/write for every request. Scale sessions independently. Shared sessions across app servers. Automatic expiration with EXPIRE. Hash data type for session attributes.'
        },
        {
          name: 'Leaderboards',
          explanation: 'Sorted sets perfect for rankings. ZADD to update scores. ZREVRANGE for top N. ZRANK for user\'s rank. Atomic score updates with ZINCRBY. Real-time leaderboards at scale. Use in gaming, social media, analytics.'
        },
        {
          name: 'Rate Limiting',
          explanation: 'Track request counts per time window. Sliding window with sorted sets. Fixed window with INCR and EXPIRE. Distributed rate limiting across servers. Protect APIs from abuse. Token bucket algorithm implementation.'
        },
        {
          name: 'Caching',
          explanation: 'Cache database query results. API response caching. Computed values and aggregations. Session data. Static content. Set TTL to prevent stale data. Dramatic performance improvement. Reduce database load.'
        },
        {
          name: 'Real-time Analytics',
          explanation: 'Count unique visitors with HyperLogLog. Track user activity with streams. Time-series data with sorted sets. Bitmaps for event tracking. Fast aggregations. Dashboard data. Metrics and monitoring.'
        },
        {
          name: 'Geospatial',
          explanation: 'GEOADD to store locations. GEODIST for distance. GEORADIUS for nearby locations. GEOPOS to get coordinates. Perfect for location-based services. Store with latitude/longitude. Sorted set implementation underneath.'
        }
      ]
    },
    {
      id: 'performance',
      name: 'Performance & Best Practices',
      icon: '⚡',
      color: '#f43f5e',
      description: 'Optimizing Redis for production',
      details: [
        {
          name: 'Memory Optimization',
          explanation: 'Use hashes for small objects. Compression with Redis encoding. Monitor memory with INFO memory. Set maxmemory limit. Configure eviction policies. Use smaller data types when possible. Remove debugging/DEV data.'
        },
        {
          name: 'Key Design',
          explanation: 'Use consistent naming convention (e.g., object:id:field). Avoid very long key names. Use namespaces. Set appropriate TTLs. Use hashes for related data. Avoid Big Keys (>10KB). Plan for key distribution in cluster.'
        },
        {
          name: 'Monitoring',
          explanation: 'Use MONITOR for debugging (not in production). INFO command for metrics. SLOWLOG for slow queries. Track memory usage, CPU, network. Use Redis monitoring tools: RedisInsight, Prometheus exporter. Alert on latency spikes.'
        },
        {
          name: 'Security',
          explanation: 'Enable AUTH with strong password. Bind to specific interfaces. Use TLS for encryption. Rename dangerous commands (FLUSHDB, FLUSHALL, CONFIG). Disable dangerous commands in production. Network isolation. Regular security updates.'
        },
        {
          name: 'Connection Management',
          explanation: 'Use connection pooling. Set appropriate timeout values. Monitor connection count. Reuse connections. Handle connection failures. Implement retry logic with exponential backoff. Use persistent connections.'
        }
      ]
    }
  ]

  const selectedConcept = selectedConceptIndex !== null ? concepts[selectedConceptIndex] : null

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        if (selectedConceptIndex !== null) {
          setSelectedConceptIndex(null)
          setSelectedDetailIndex(0)
        } else {
          onBack()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedConceptIndex, onBack])

  const handlePreviousConcept = () => {
    if (selectedConceptIndex > 0) {
      setSelectedConceptIndex(selectedConceptIndex - 1)
      setSelectedDetailIndex(0)
    }
  }

  const handleNextConcept = () => {
    if (selectedConceptIndex < concepts.length - 1) {
      setSelectedConceptIndex(selectedConceptIndex + 1)
      setSelectedDetailIndex(0)
    }
  }

  const buildBreadcrumbStack = () => {
    const stack = [
      { name: 'Databases', icon: '🗃️', onClick: onBack }
    ]

    if (selectedConcept) {
      stack.push({ name: 'Redis', icon: '🔴', onClick: () => { setSelectedConceptIndex(null); setSelectedDetailIndex(0) } })
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    } else {
      stack.push({ name: 'Redis', icon: '🔴' })
    }

    return stack
  }

  const handleBreadcrumbClick = (index) => {
    const stack = buildBreadcrumbStack()
    if (stack[index].onClick) {
      stack[index].onClick()
    }
  }

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)',
    padding: '2rem',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  }

  const headerStyle = {
    maxWidth: '1400px',
    margin: '0 auto 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem'
  }

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #93c5fd, #60a5fa)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(59, 130, 246, 0.2)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    borderRadius: '0.5rem',
    color: '#60a5fa',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  const navButtonStyle = {
    padding: '0.75rem 1.25rem',
    background: 'rgba(16, 185, 129, 0.2)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    borderRadius: '0.5rem',
    color: '#4ade80',
    cursor: 'pointer',
    fontSize: '0.95rem',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            style={backButtonStyle}
            onClick={onBack}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.3)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            ← Back to Databases
          </button>
          <h1 style={titleStyle}>Redis</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {onPrevious && (
            <button
              style={navButtonStyle}
              onClick={onPrevious}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.3)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              ← {previousName}
            </button>
          )}
          {onNext && (
            <button
              style={navButtonStyle}
              onClick={onNext}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.3)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {nextName} →
            </button>
          )}
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          colors={DATABASE_COLORS}
        />
      </div>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '1.5rem'
      }}>
        {concepts.map((concept, index) => (
          <div
            key={concept.id}
            onClick={() => setSelectedConceptIndex(index)}
            style={{
              background: 'rgba(15, 23, 42, 0.8)',
              borderRadius: '1rem',
              padding: '1.5rem',
              border: `1px solid ${concept.color}40`,
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = `0 20px 40px ${concept.color}20`
              e.currentTarget.style.borderColor = concept.color
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.borderColor = `${concept.color}40`
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2.5rem' }}>{concept.icon}</span>
              <h3 style={{ color: concept.color, margin: 0, fontSize: '1.25rem' }}>{concept.name}</h3>
            </div>
            <p style={{ color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>{concept.description}</p>
            <div style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.875rem' }}>
              {concept.details.length} topics • Click to explore
            </div>
          </div>
        ))}
      </div>

      {/* Concept Detail Modal */}
      {selectedConcept && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
          }}
          onClick={() => setSelectedConceptIndex(null)}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #1e293b, #0f172a)',
              borderRadius: '1rem',
              padding: '2rem',
              maxWidth: '1200px',
              maxHeight: '92vh',
              overflow: 'auto',
              border: `1px solid ${selectedConcept.color}40`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Breadcrumb */}
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
              colors={DATABASE_COLORS}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #334155' }}>
              <h2 style={{ color: selectedConcept.color, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem' }}>
                <span>{selectedConcept.icon}</span>
                {selectedConcept.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <button onClick={handlePreviousConcept} disabled={selectedConceptIndex === 0} style={{ padding: '0.4rem 0.75rem', background: 'rgba(100, 116, 139, 0.2)', border: '1px solid rgba(100, 116, 139, 0.3)', borderRadius: '0.375rem', color: selectedConceptIndex === 0 ? '#475569' : '#94a3b8', cursor: selectedConceptIndex === 0 ? 'not-allowed' : 'pointer', fontSize: '0.8rem' }}>←</button>
                <span style={{ color: '#64748b', fontSize: '0.75rem', padding: '0 0.5rem' }}>{selectedConceptIndex + 1}/{concepts.length}</span>
                <button onClick={handleNextConcept} disabled={selectedConceptIndex === concepts.length - 1} style={{ padding: '0.4rem 0.75rem', background: 'rgba(100, 116, 139, 0.2)', border: '1px solid rgba(100, 116, 139, 0.3)', borderRadius: '0.375rem', color: selectedConceptIndex === concepts.length - 1 ? '#475569' : '#94a3b8', cursor: selectedConceptIndex === concepts.length - 1 ? 'not-allowed' : 'pointer', fontSize: '0.8rem' }}>→</button>
                <button onClick={() => setSelectedConceptIndex(null)} style={{ padding: '0.4rem 0.75rem', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '0.375rem', color: '#f87171', cursor: 'pointer', fontSize: '0.8rem', marginLeft: '0.5rem' }}>✕</button>
              </div>
            </div>

            {/* Subtopic Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {selectedConcept.details.map((detail, i) => (
                <button key={i} onClick={() => setSelectedDetailIndex(i)} style={{ padding: '0.5rem 1rem', background: selectedDetailIndex === i ? `${selectedConcept.color}30` : 'rgba(100, 116, 139, 0.2)', border: `1px solid ${selectedDetailIndex === i ? selectedConcept.color : 'rgba(100, 116, 139, 0.3)'}`, borderRadius: '0.5rem', color: selectedDetailIndex === i ? selectedConcept.color : '#94a3b8', cursor: 'pointer', fontSize: '0.85rem', fontWeight: selectedDetailIndex === i ? '600' : '400', transition: 'all 0.2s' }}>{detail.name}</button>
              ))}
            </div>

            {/* Selected Subtopic Content */}
            {(() => {
              const detail = selectedConcept.details[selectedDetailIndex]
              const colorScheme = SUBTOPIC_COLORS[selectedDetailIndex % SUBTOPIC_COLORS.length]
              return (
                <div>
                  <h3 style={{ color: '#e2e8f0', marginBottom: '0.75rem', fontSize: '1.1rem' }}>{detail.name}</h3>
                  <p style={{ color: '#e2e8f0', lineHeight: '1.8', marginBottom: '1rem', background: colorScheme.bg, border: `1px solid ${colorScheme.border}`, borderRadius: '0.5rem', padding: '1rem', textAlign: 'left' }}>{detail.explanation}</p>
                </div>
              )
            })()}

          </div>
        </div>
      )}
    </div>
  )
}

export default Redis
