import { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

function NoSQL({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
  const [selectedConcept, setSelectedConcept] = useState(null)

  // Handle Escape key for modal navigation
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation() // Prevent event from reaching parent handlers

        if (selectedConcept) {
          // If viewing a concept (e.g., MongoDB), go back to concept list
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

  const handleConceptClick = (concept) => {
    setSelectedConcept(concept)
  }

  const handleBackToGrid = () => {
    setSelectedConcept(null)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #1e3a8a, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
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
              ← Back to Databases
            </button>
            <div>
              <h1 style={{
                margin: 0,
                fontSize: '2rem',
                fontWeight: '800',
                background: 'linear-gradient(to right, #93c5fd, #60a5fa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                NoSQL Databases
              </h1>
            {currentSubcategory && (
              <span style={{
                padding: '0.25rem 0.75rem',
                fontSize: '0.85rem',
                fontWeight: '600',
                backgroundColor: '#dbeafe',
                color: '#1e40af',
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

      <Breadcrumb breadcrumb={breadcrumb} />

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
                  color: 'white',
                  margin: '0 0 0.5rem 0'
                }}>
                  {concept.name}
                </h3>
              </div>
              <p style={{
                fontSize: '0.95rem',
                color: '#9ca3af',
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
                  backgroundColor: '#1f2937',
                  color: 'white',
                  border: '2px solid #374151',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  marginBottom: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#374151'
                  e.currentTarget.style.borderColor = '#4b5563'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#1f2937'
                  e.currentTarget.style.borderColor = '#374151'
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
                    backgroundColor: selectedConcept.id === concept.id ? `${concept.color}1A` : '#1f2937',
                    border: `2px solid ${selectedConcept.id === concept.id ? concept.color : '#374151'}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedConcept.id !== concept.id) {
                      e.currentTarget.style.backgroundColor = '#374151'
                      e.currentTarget.style.borderColor = '#4b5563'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedConcept.id !== concept.id) {
                      e.currentTarget.style.backgroundColor = '#1f2937'
                      e.currentTarget.style.borderColor = '#374151'
                    }
                  }}
                >
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
                    {concept.icon}
                  </div>
                  <div style={{
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    color: 'white'
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
                      color: 'white',
                      margin: 0
                    }}>
                      {selectedConcept.name}
                    </h2>
                    <p style={{
                      fontSize: '1.1rem',
                      color: '#9ca3af',
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
                      backgroundColor: '#1f2937',
                      padding: '1.5rem',
                      borderRadius: '10px',
                      border: '2px solid #374151',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = selectedConcept.color
                      e.currentTarget.style.boxShadow = `0 4px 12px ${selectedConcept.color}20`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#374151'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <h3 style={{
                      fontSize: '1.2rem',
                      fontWeight: '700',
                      color: 'white',
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
                      color: '#9ca3af',
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
    </div>
  )
}

export default NoSQL
