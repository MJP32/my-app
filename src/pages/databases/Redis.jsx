import { useState, useEffect } from 'react'

function Redis({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory }) {
  const [selectedConcept, setSelectedConcept] = useState(null)

  // Handle Escape key for modal navigation
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation() // Prevent event from reaching parent handlers

        if (selectedConcept) {
          // If viewing a concept, go back to concept list
          setSelectedConcept(null)
        } else {
          // If on concept list, close the modal
          onBack()
        }
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [selectedConcept, onBack])

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

  const handleConceptClick = (concept) => {
    setSelectedConcept(concept)
  }

  const handleBackToGrid = () => {
    setSelectedConcept(null)
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1600px', margin: '0 auto' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={onBack}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
            }}
          >
            ← Back to Menu
          </button>
          <div>
            <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: '800', color: '#1f2937' }}>
              ⚡ Redis
            </h1>
            {currentSubcategory && (
              <span style={{
                padding: '0.25rem 0.75rem',
                fontSize: '0.85rem',
                fontWeight: '600',
                backgroundColor: '#fee2e2',
                color: '#991b1b',
                borderRadius: '6px',
                marginTop: '0.25rem',
                display: 'inline-block'
              }}>
                {currentSubcategory}
              </span>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {onPrevious && (
            <button
              onClick={onPrevious}
              style={{
                padding: '0.75rem 1.25rem',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
            >
              ← {previousName}
            </button>
          )}
          {onNext && (
            <button
              onClick={onNext}
              style={{
                padding: '0.75rem 1.25rem',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
            >
              {nextName} →
            </button>
          )}
        </div>
      </div>

      <p style={{
        textAlign: 'center',
        fontSize: '1.1rem',
        color: '#4b5563',
        marginBottom: '2rem',
        maxWidth: '900px',
        margin: '0 auto 2rem'
      }}>
        In-memory data structure store for caching, messaging, streaming, and real-time applications
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedConcept ? '350px 1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {!selectedConcept ? (
          concepts.map((concept, idx) => (
            <div
              key={idx}
              onClick={() => handleConceptClick(concept)}
              style={{
                backgroundColor: `${concept.color}0D`,
                padding: '2rem',
                borderRadius: '12px',
                border: `2px solid ${concept.color}33`,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                height: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = `0 8px 24px ${concept.color}40`
                e.currentTarget.style.borderColor = `${concept.color}66`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = `${concept.color}33`
              }}
            >
              <div>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
                  {concept.icon}
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  margin: '0 0 0.5rem 0'
                }}>
                  {concept.name}
                </h3>
              </div>
              <p style={{
                fontSize: '0.95rem',
                color: '#4b5563',
                margin: 0,
                lineHeight: '1.5'
              }}>
                {concept.description}
              </p>
            </div>
          ))
        ) : (
          <>
            {/* Sidebar */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <button
                onClick={handleBackToGrid}
                style={{
                  padding: '0.75rem 1rem',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  backgroundColor: '#f3f4f6',
                  color: '#1f2937',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  marginBottom: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e5e7eb'
                  e.currentTarget.style.borderColor = '#d1d5db'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f4f6'
                  e.currentTarget.style.borderColor = '#e5e7eb'
                }}
              >
                ← Back to All
              </button>

              {concepts.map((concept) => (
                <div
                  key={concept.id}
                  onClick={() => handleConceptClick(concept)}
                  style={{
                    padding: '1rem',
                    borderRadius: '8px',
                    backgroundColor: selectedConcept.id === concept.id ? `${concept.color}1A` : '#f9fafb',
                    border: `2px solid ${selectedConcept.id === concept.id ? concept.color : '#e5e7eb'}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedConcept.id !== concept.id) {
                      e.currentTarget.style.backgroundColor = '#f3f4f6'
                      e.currentTarget.style.borderColor = '#d1d5db'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedConcept.id !== concept.id) {
                      e.currentTarget.style.backgroundColor = '#f9fafb'
                      e.currentTarget.style.borderColor = '#e5e7eb'
                    }
                  }}
                >
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
                    {concept.icon}
                  </div>
                  <div style={{
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    color: '#1f2937'
                  }}>
                    {concept.name}
                  </div>
                </div>
              ))}
            </div>

            {/* Main content area */}
            <div>
              <div style={{
                backgroundColor: `${selectedConcept.color}0D`,
                padding: '2rem',
                borderRadius: '12px',
                border: `2px solid ${selectedConcept.color}33`,
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '3rem' }}>
                    {selectedConcept.icon}
                  </div>
                  <div>
                    <h2 style={{
                      fontSize: '2rem',
                      fontWeight: '800',
                      color: '#1f2937',
                      margin: 0
                    }}>
                      {selectedConcept.name}
                    </h2>
                    <p style={{
                      fontSize: '1.1rem',
                      color: '#4b5563',
                      margin: '0.5rem 0 0 0',
                      lineHeight: '1.6'
                    }}>
                      {selectedConcept.description}
                    </p>
                  </div>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gap: '1.5rem'
              }}>
                {selectedConcept.details.map((detail, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: 'white',
                      padding: '1.5rem',
                      borderRadius: '10px',
                      border: '2px solid #e5e7eb',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = selectedConcept.color
                      e.currentTarget.style.boxShadow = `0 4px 12px ${selectedConcept.color}20`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e5e7eb'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <h3 style={{
                      fontSize: '1.2rem',
                      fontWeight: '700',
                      color: '#1f2937',
                      margin: '0 0 0.75rem 0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span style={{
                        backgroundColor: selectedConcept.color,
                        color: 'white',
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.9rem',
                        fontWeight: '700'
                      }}>
                        {idx + 1}
                      </span>
                      {detail.name}
                    </h3>
                    <p style={{
                      fontSize: '1rem',
                      color: '#374151',
                      margin: 0,
                      lineHeight: '1.7',
                      paddingLeft: '2.25rem'
                    }}>
                      {detail.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Redis
