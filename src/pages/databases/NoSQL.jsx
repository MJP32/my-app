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

function NoSQL({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'mongodb',
      name: 'MongoDB',
      icon: '🍃',
      color: '#10b981',
      description: 'Leading document database with flexible schema and powerful aggregation',
      details: [
        {
          name: 'Document Database',
          explanation: 'MongoDB stores data as flexible JSON-like BSON documents. Schema-less design allows dynamic fields per document, perfect for evolving data structures. Documents can contain nested arrays and objects for hierarchical data. Natural mapping to programming language objects.'
        },
        {
          name: 'Aggregation Framework',
          explanation: 'Powerful pipeline-based data processing with stages like $match, $group, $project, $sort, and $lookup. Perform complex transformations and analytics directly in the database. MapReduce alternative with better performance. Support for joins via $lookup stage.'
        },
        {
          name: 'Indexing Strategies',
          explanation: 'Support for single field, compound, multikey, text, geospatial, and hashed indexes. Index intersection for using multiple indexes in queries. Partial indexes for subset of documents. Covered queries serve entirely from index. Critical for query performance.'
        },
        {
          name: 'Replication',
          explanation: 'Replica sets provide high availability with automatic failover. Primary handles writes, secondaries replicate data. Automatic election of new primary on failure. Read preference options for distributing load. Ensures data durability and availability.'
        },
        {
          name: 'Sharding',
          explanation: 'Horizontal scaling through data distribution across shards. Shard key determines data distribution. Range-based or hash-based sharding strategies. Automatic balancing of data. Handles massive datasets and high throughput workloads.'
        },
        {
          name: 'ACID Transactions',
          explanation: 'Multi-document ACID transactions since MongoDB 4.0. Snapshot isolation level. Transactions work across shards and replica sets. Provides consistency guarantees when needed. Balance between NoSQL flexibility and SQL guarantees.'
        }
      ]
    },
    {
      id: 'cassandra',
      name: 'Apache Cassandra',
      icon: '💎',
      color: '#8b5cf6',
      description: 'Highly scalable column-family database with masterless architecture',
      details: [
        {
          name: 'Column-Family Store',
          explanation: 'Wide-column store organizing data into column families. Rows can have varying columns. Optimized for write-heavy workloads. Columns grouped by access patterns. Inspired by Google Bigtable design for massive scale.'
        },
        {
          name: 'Ring Architecture',
          explanation: 'Peer-to-peer distributed system with no single point of failure. Data distributed via consistent hashing across a ring topology. Every node is identical in responsibilities. Gossip protocol for cluster communication. Enables linear scalability.'
        },
        {
          name: 'Tunable Consistency',
          explanation: 'Configurable consistency levels from ONE to ALL. Quorum reads/writes balance consistency and availability. Choose per-operation consistency level. CAP theorem trade-offs controlled by application. Eventual consistency by default for maximum availability.'
        },
        {
          name: 'Partition Keys',
          explanation: 'Partition key determines data distribution across nodes. Clustering keys define sort order within partition. Proper key design critical for performance. Avoid hot partitions that overload specific nodes. Data modeling driven by query patterns.'
        },
        {
          name: 'Write-Optimized',
          explanation: 'Sequential write path using commit log and memtables. No read-before-write operations. Updates are inserts with timestamps. Compaction merges data files periodically. Delivers exceptionally high write throughput.'
        },
        {
          name: 'Multi-DC Replication',
          explanation: 'Built-in support for multiple data centers. Network topology awareness for smart routing. Configurable replication factor per DC. Local and remote consistency levels. Enables disaster recovery and geographic distribution.'
        }
      ]
    },
    {
      id: 'redis',
      name: 'Redis',
      icon: '🔴',
      color: '#ef4444',
      description: 'Ultra-fast in-memory data store with rich data structures',
      details: [
        {
          name: 'In-Memory Store',
          explanation: 'All data kept in RAM for microsecond latency. Optional persistence to disk via snapshots or AOF. Dramatically faster than disk-based databases. Perfect for caching, sessions, and real-time applications. Memory as the primary storage medium.'
        },
        {
          name: 'Rich Data Structures',
          explanation: 'Native support for strings, hashes, lists, sets, sorted sets, bitmaps, hyperloglogs, and streams. Operations optimized for each type. Atomic operations on complex types. Enables sophisticated caching and data modeling patterns beyond simple key-value.'
        },
        {
          name: 'Pub/Sub Messaging',
          explanation: 'Built-in publish/subscribe messaging pattern. Channels for topic-based messaging. Pattern matching subscriptions for flexible routing. Real-time event distribution. Foundation for message queues and real-time notifications.'
        },
        {
          name: 'Transactions',
          explanation: 'MULTI/EXEC for transaction blocks. All commands executed atomically. WATCH for optimistic locking. Pipeline commands for better performance. Lua scripting for server-side atomic operations with complex logic.'
        },
        {
          name: 'Persistence Options',
          explanation: 'RDB snapshots for point-in-time backups. AOF (Append Only File) logs every write operation. Hybrid mode combining both strategies. Trade-off between performance and durability. Configurable fsync policies for different durability requirements.'
        },
        {
          name: 'Clustering & Sentinel',
          explanation: 'Redis Cluster for automatic sharding across nodes. Hash slots for data distribution. Redis Sentinel for high availability and monitoring. Automatic failover on master failure. Master-replica replication for redundancy.'
        }
      ]
    },
    {
      id: 'dynamodb',
      name: 'Amazon DynamoDB',
      icon: '⚡',
      color: '#f59e0b',
      description: 'Fully managed, serverless NoSQL database with automatic scaling',
      details: [
        {
          name: 'Managed Service',
          explanation: 'Fully managed by AWS - no servers to provision or manage. Automatic scaling based on traffic patterns. Built-in backup and restore capabilities. Point-in-time recovery for data protection. Multi-region replication. Focus on application development, not database operations.'
        },
        {
          name: 'Key-Value & Document',
          explanation: 'Supports both key-value and document data models. Store complex nested structures. Flexible schema per item. Primary key required (partition key or partition + sort key). Items up to 400 KB. Versatile for different use cases.'
        },
        {
          name: 'Provisioned & On-Demand',
          explanation: 'Provisioned capacity mode with predictable performance and cost. On-demand mode for variable workloads with pay-per-request billing. Auto-scaling for provisioned capacity. Switch between modes as workload changes. Flexibility in cost and performance management.'
        },
        {
          name: 'Global Tables',
          explanation: 'Multi-region, multi-master replication. Active-active configuration across regions. Automatic conflict resolution with last-writer-wins. Single-digit millisecond latency globally. Built-in disaster recovery and geographic data distribution.'
        },
        {
          name: 'DynamoDB Streams',
          explanation: 'Change data capture streams for real-time processing. Time-ordered sequence of item modifications. Lambda triggers for serverless event processing. Enable event-driven architectures. Maintain derived data stores and implement complex workflows.'
        },
        {
          name: 'Secondary Indexes',
          explanation: 'Global Secondary Indexes (GSI) for alternate query patterns. Local Secondary Indexes (LSI) with same partition key. Project specific attributes to indexes. Eventually consistent GSIs. Provides query flexibility beyond primary key access patterns.'
        }
      ]
    },
    {
      id: 'document-stores',
      name: 'Document Stores',
      icon: '📄',
      color: '#06b6d4',
      description: 'Database paradigm storing data as self-contained documents',
      details: [
        {
          name: 'Schema Flexibility',
          explanation: 'Documents can have different fields and structures without predefined schema. Add/remove fields without migrations. Perfect for evolving requirements and rapid development. Natural representation of object-oriented data. Each document is self-contained.'
        },
        {
          name: 'Nested Structures',
          explanation: 'Support for embedded documents and arrays. Hierarchical data modeling without joins. Denormalization for query performance. Reduce complex joins by embedding related data. Single document reads instead of multiple table queries.'
        },
        {
          name: 'Rich Query Languages',
          explanation: 'Query capabilities beyond simple key lookups. Filter by nested field values. Projection to return specific fields. Sorting and pagination support. Aggregation and analytics. Index-backed queries for high performance.'
        },
        {
          name: 'ACID Properties',
          explanation: 'Atomic operations on single documents guaranteed. Modern document databases support multi-document transactions. Isolation levels for consistency. Durability guarantees for committed data. Balance between NoSQL flexibility and traditional ACID guarantees.'
        }
      ]
    },
    {
      id: 'key-value-stores',
      name: 'Key-Value Stores',
      icon: '🔑',
      color: '#ec4899',
      description: 'Simplest NoSQL model optimized for high-performance lookups',
      details: [
        {
          name: 'Simple Model',
          explanation: 'Simplest NoSQL model - unique key maps to value. Value is opaque to database. No complex query language needed. PUT, GET, DELETE operations only. Blazing fast lookups via direct hash-based access. Foundation for other NoSQL types.'
        },
        {
          name: 'Extreme Performance',
          explanation: 'Optimized for extremely high throughput and low latency. Direct hash-based lookup without query parsing overhead. In-memory implementations deliver microsecond response times. Linear scalability as you add nodes. Ideal for high-traffic applications.'
        },
        {
          name: 'Caching Layer',
          explanation: 'Primary use case as cache in front of databases. Store session data, user preferences, and temporary data. TTL (time-to-live) for automatic expiration. Implement cache-aside, read-through, and write-through patterns. Reduces database load dramatically.'
        },
        {
          name: 'Distributed Hash Tables',
          explanation: 'Consistent hashing for data distribution across nodes. Minimal data movement when adding/removing nodes. Replication for high availability. Eventually consistent by design. Based on Amazon Dynamo paper principles.'
        }
      ]
    },
    {
      id: 'column-family',
      name: 'Column-Family Databases',
      icon: '📊',
      color: '#6366f1',
      description: 'Databases organizing data by column families for analytics',
      details: [
        {
          name: 'Wide-Column Model',
          explanation: 'Tables with rows and dynamic columns. Columns grouped into column families. Each row can have different columns for sparse data representation. Two-dimensional key-value store (row key, column key). Flexible schema per row.'
        },
        {
          name: 'Data Locality',
          explanation: 'Columns accessed together stored together physically. Column family design based on query patterns. Reduces I/O for analytical queries. Compression works better on similar data types stored together. Columnar storage benefits for analytics.'
        },
        {
          name: 'Versioning',
          explanation: 'Multiple versions of cell values with timestamps. Time-travel queries to retrieve historical data. Automatic garbage collection of old versions. Enables audit trails and temporal data analysis without application-level complexity.'
        },
        {
          name: 'Compression',
          explanation: 'Columnar layout enables efficient compression. Similar values in columns compress exceptionally well. Reduce storage costs significantly. Lower I/O requirements improve query performance. Multiple compression algorithms per column family.'
        },
        {
          name: 'Analytics Workloads',
          explanation: 'Optimized for analytical queries scanning columns. Aggregations across large datasets. Perfect for time-series data, data warehousing, IoT sensor data, and log aggregation. Write-heavy workloads and petabyte-scale deployments.'
        }
      ]
    },
    {
      id: 'graph-databases',
      name: 'Graph Databases',
      icon: '🕸️',
      color: '#14b8a6',
      description: 'Specialized databases for highly connected data',
      details: [
        {
          name: 'Nodes & Relationships',
          explanation: 'Store data as nodes (entities) and edges (relationships). Relationships are first-class citizens with properties. Both nodes and edges can have properties. Labels for typing. Natural representation of highly connected data.'
        },
        {
          name: 'Traversal Queries',
          explanation: 'Query by traversing relationships between nodes. Find paths between entities. Shortest path algorithms built-in. Depth and breadth-first traversal. Pattern matching for complex queries. Much faster than SQL joins for connected data.'
        },
        {
          name: 'Query Languages',
          explanation: 'Cypher (Neo4j) with intuitive ASCII-art syntax. Gremlin (TinkerPop) for traversal-based queries. SPARQL for RDF graphs. Declarative pattern matching. Optimized for graph operations. Much more intuitive than complex SQL joins.'
        },
        {
          name: 'Use Cases',
          explanation: 'Social networks and friend-of-friend queries. Recommendation engines. Fraud detection analyzing transaction patterns. Knowledge graphs. Network and IT operations. Master data management. Identity and access management. Any domain with complex relationships.'
        },
        {
          name: 'Performance',
          explanation: 'Constant time traversals regardless of database size. Index-free adjacency - relationships stored with nodes. Dramatically faster than joins for multi-hop queries. Enables real-time recommendations and fraud detection on massive graphs.'
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
      stack.push({ name: 'NoSQL', icon: '🗄️', onClick: () => { setSelectedConceptIndex(null); setSelectedDetailIndex(0) } })
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    } else {
      stack.push({ name: 'NoSQL', icon: '🗄️' })
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
          <h1 style={titleStyle}>NoSQL Databases</h1>
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

export default NoSQL
