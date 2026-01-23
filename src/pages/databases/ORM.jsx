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

function ORM({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'hibernate',
      name: 'Hibernate Framework',
      icon: '🔄',
      color: '#f59e0b',
      description: 'Popular Java ORM framework providing transparent persistence with sophisticated caching, query APIs, and relationship management',
      details: [
        {
          name: 'Object-Relational Mapping',
          explanation: 'Maps Java objects to database tables automatically. Classes become tables, fields become columns, instances become rows. Eliminates manual SQL writing for CRUD operations. Annotations or XML for mapping configuration. Natural object-oriented programming.'
        },
        {
          name: 'Session Management',
          explanation: 'Session represents conversation with database. First-level cache stores entities in session scope. Manages entity lifecycle states: transient, persistent, detached, removed. Automatic dirty checking and synchronization. Transaction boundaries.'
        },
        {
          name: 'HQL & Criteria API',
          explanation: 'HQL (Hibernate Query Language) is object-oriented query language. Query entities instead of tables. Criteria API for programmatic type-safe queries. QueryDSL integration. Named queries for reusability. Compile-time safety.'
        },
        {
          name: 'Caching Layers',
          explanation: 'First-level cache (session scope), second-level cache (session factory scope), query cache. Integration with EhCache, Hazelcast, Infinispan. Dramatically reduces database hits. Configurable per entity. Cache strategies: read-only, read-write, nonstrict-read-write, transactional.'
        },
        {
          name: 'Relationship Mapping',
          explanation: 'Support for @OneToOne, @OneToMany, @ManyToOne, @ManyToMany relationships. Bidirectional and unidirectional associations. Cascade operations. Orphan removal. Join tables and foreign keys managed automatically. Complex object graphs.'
        },
        {
          name: 'Interceptors & Events',
          explanation: 'Lifecycle event listeners for entity state changes. Pre/post insert, update, delete, load callbacks. Custom interceptors for cross-cutting concerns. Audit logging, validation, security. Envers for entity versioning and auditing.'
        }
      ]
    },
    {
      id: 'jpa',
      name: 'JPA (Java Persistence API)',
      icon: '☕',
      color: '#ea580c',
      description: 'Standard Java specification for ORM providing portable, vendor-neutral persistence layer with rich annotations and JPQL',
      details: [
        {
          name: 'Standard Specification',
          explanation: 'Java EE/Jakarta EE standard for ORM. Provider-agnostic API. Implementations: Hibernate, EclipseLink, OpenJPA. Write once, switch providers easily. Industry standard annotations and patterns. Portable across application servers.'
        },
        {
          name: 'Entity Annotations',
          explanation: '@Entity, @Table, @Id, @GeneratedValue, @Column annotations define mapping. @Embedded for value objects. @Inheritance strategies. @Enumerated for enums. Rich annotation set for all mapping scenarios. Convention over configuration.'
        },
        {
          name: 'EntityManager',
          explanation: 'Core interface for persistence operations. persist(), merge(), remove(), find() methods. Manages persistence context. Query creation. Transaction management. Similar to Hibernate Session but standardized.'
        },
        {
          name: 'JPQL',
          explanation: 'Java Persistence Query Language - object-oriented SQL-like syntax. Query entities and their fields. Supports joins, subqueries, aggregations, projections. Named and native queries. Parameter binding. Pagination support.'
        },
        {
          name: 'Transaction Management',
          explanation: 'Integration with JTA (Java Transaction API). Container-managed or application-managed transactions. @Transactional annotation (with Spring). ACID guarantees. Rollback on exceptions. Isolation levels.'
        },
        {
          name: 'Bean Validation',
          explanation: 'Integration with JSR 380 Bean Validation. @NotNull, @Size, @Min, @Max, @Pattern constraints. Automatic validation before persist/update. Custom validators. Consistent validation across layers. Fail-fast with meaningful errors.'
        }
      ]
    },
    {
      id: 'entity-mapping',
      name: 'Entity Mapping',
      icon: '🗺️',
      color: '#dc2626',
      description: 'Configuration of how Java entities map to database tables using annotations for fields, relationships, and strategies',
      details: [
        {
          name: 'Table & Column Mapping',
          explanation: '@Table specifies database table name. @Column for column properties: name, length, nullable, unique. @Temporal for dates. @Lob for large objects. @Transient for non-persistent fields. Explicit control over schema mapping.'
        },
        {
          name: 'Primary Keys',
          explanation: '@Id marks primary key. @GeneratedValue strategies: AUTO, IDENTITY, SEQUENCE, TABLE. @SequenceGenerator and @TableGenerator for custom generation. Composite keys with @EmbeddedId or @IdClass. Natural vs surrogate keys.'
        },
        {
          name: 'Embeddable Objects',
          explanation: '@Embeddable for value objects embedded in entities. Reusable components. @Embedded in entity class. No separate table. Useful for addresses, names, coordinates. Flattened into entity table.'
        },
        {
          name: 'Inheritance Mapping',
          explanation: 'Three strategies: SINGLE_TABLE (default), TABLE_PER_CLASS, JOINED. @Inheritance annotation. @DiscriminatorColumn for single table. Trade-offs between normalization and performance. Polymorphic queries.'
        },
        {
          name: 'Collection Mapping',
          explanation: '@ElementCollection for collections of basic types or embeddables. @OneToMany/@ManyToMany for entity relationships. List, Set, Map support. @OrderBy, @OrderColumn for ordering. Lazy/eager fetch types.'
        },
        {
          name: 'Converter & Enumerated',
          explanation: '@Converter for custom type conversions. Convert Java types to database columns. @Enumerated(STRING/ORDINAL) for enums. AttributeConverter interface. Centralized conversion logic. Type safety.'
        }
      ]
    },
    {
      id: 'query-optimization',
      name: 'Query Optimization',
      icon: '⚡',
      color: '#8b5cf6',
      description: 'Techniques for optimizing ORM queries including fetch strategies, solving N+1 problems, and using projections',
      details: [
        {
          name: 'Fetch Strategies',
          explanation: 'EAGER loads data immediately. LAZY loads on-demand. @Fetch(FetchMode.JOIN/SELECT/SUBSELECT) controls SQL generation. Entity graphs for dynamic fetch plans. Balance between data loading and performance. Avoid unnecessary queries.'
        },
        {
          name: 'N+1 Query Problem',
          explanation: 'One query loads entities, N queries load relationships. Use JOIN FETCH in JPQL. Batch fetching with @BatchSize. Entity graphs. Show SQL to detect. Major performance bottleneck if unaddressed. Monitor query counts.'
        },
        {
          name: 'Projections & DTOs',
          explanation: 'Select only needed columns with constructor expressions in JPQL. ResultTransformer for custom mappings. Blaze-Persistence for advanced projections. Spring Data Projections. Reduce data transfer and memory usage.'
        },
        {
          name: 'Query Hints',
          explanation: 'JPA query hints for optimization. Timeout hints. Cache retrieval/store modes. Flush modes. Lock modes. Fetch size. Read-only hints. Provider-specific optimizations. Fine-tune query execution.'
        },
        {
          name: 'Index Awareness',
          explanation: 'Design queries to use database indexes. @Index annotation on columns. Avoid functions on indexed columns. Leading column in composite indexes. WHERE, JOIN, ORDER BY considerations. Explain plans.'
        },
        {
          name: 'Pagination & Streaming',
          explanation: 'setFirstResult() and setMaxResults() for pagination. Stream API for large result sets. Cursor-based pagination. Avoid offset on large datasets. ScrollableResults. Memory-efficient processing.'
        }
      ]
    },
    {
      id: 'caching',
      name: 'Caching Strategies',
      icon: '💾',
      color: '#10b981',
      description: 'Multi-level caching mechanisms to reduce database access including session, application, and query caches',
      details: [
        {
          name: 'First-Level Cache',
          explanation: 'Session/EntityManager scope cache. Automatic and mandatory. Stores entities within single session. Ensures repeatable reads. Cleared on session close. Prevents duplicate queries for same entity in transaction.'
        },
        {
          name: 'Second-Level Cache',
          explanation: 'SessionFactory/EntityManagerFactory scope. Shared across sessions. Optional, configurable per entity. @Cacheable annotation. Cache providers: EhCache, Hazelcast, Infinispan. Dramatically reduces database load. Invalidation strategies.'
        },
        {
          name: 'Query Cache',
          explanation: 'Caches query result sets by query string and parameters. Must enable second-level cache first. query.setCacheable(true). Invalidated when related entity data changes. Useful for repeated queries with same parameters.'
        },
        {
          name: 'Cache Modes',
          explanation: 'CacheStoreMode: USE, BYPASS, REFRESH. CacheRetrieveMode: USE, BYPASS. Control cache behavior per query. Force database hit when needed. Refresh stale data. Balance consistency and performance.'
        },
        {
          name: 'Eviction & Expiration',
          explanation: 'TTL (time-to-live) for cache entries. LRU/LFU eviction policies. Manual eviction with cache.evict(). Clear entire cache. Memory management. Stale data prevention. Configuration per entity or globally.'
        },
        {
          name: 'Distributed Caching',
          explanation: 'Hazelcast, Infinispan for clustered deployments. Cache replication across nodes. Invalidation messages. Near cache optimization. Scalability in multi-server environments. Consistent caching.'
        }
      ]
    },
    {
      id: 'transaction-management',
      name: 'Transaction Management',
      icon: '🔐',
      color: '#3b82f6',
      description: 'Managing database transactions with ACID guarantees, isolation levels, and optimistic/pessimistic locking strategies',
      details: [
        {
          name: 'ACID Properties',
          explanation: 'Atomicity: all or nothing. Consistency: valid state transitions. Isolation: concurrent transaction handling. Durability: committed changes persist. ORM ensures ACID through transaction boundaries. Data integrity guarantees.'
        },
        {
          name: 'Programmatic Transactions',
          explanation: 'Manual transaction control with transaction.begin(), commit(), rollback(). Try-finally blocks for cleanup. Exception handling. Fine-grained control. Useful for complex transaction logic. Resource management.'
        },
        {
          name: 'Declarative Transactions',
          explanation: '@Transactional annotation (Spring/Jakarta EE). AOP-based transaction proxies. Automatic rollback on unchecked exceptions. Propagation behaviors: REQUIRED, REQUIRES_NEW, NESTED, etc. Simpler, cleaner code.'
        },
        {
          name: 'Isolation Levels',
          explanation: 'READ_UNCOMMITTED, READ_COMMITTED, REPEATABLE_READ, SERIALIZABLE. Control concurrent transaction behavior. Trade-off between consistency and performance. Database-dependent. Prevent dirty reads, phantom reads, lost updates.'
        },
        {
          name: 'Optimistic Locking',
          explanation: '@Version field for optimistic locking. Detects concurrent modifications. OptimisticLockException on conflict. Better concurrency than pessimistic locks. Last-commit-wins or retry strategies. Suitable for low contention.'
        },
        {
          name: 'Pessimistic Locking',
          explanation: 'LockModeType.PESSIMISTIC_READ/WRITE/FORCE_INCREMENT. Database-level locks. Prevents concurrent modifications. Higher consistency, lower concurrency. SELECT FOR UPDATE queries. Use sparingly for critical sections.'
        }
      ]
    },
    {
      id: 'lazy-eager',
      name: 'Lazy/Eager Loading',
      icon: '🎯',
      color: '#ec4899',
      description: 'Loading strategies for entity relationships balancing between immediate data retrieval and on-demand loading',
      details: [
        {
          name: 'Lazy Loading',
          explanation: 'Data loaded on first access. Proxy objects for unloaded data. Reduces initial query overhead. LazyInitializationException if session closed. Requires open persistence context. Default for collections and *ToMany relationships.'
        },
        {
          name: 'Eager Loading',
          explanation: 'Data loaded immediately with parent entity. Single query or separate queries. JOIN FETCH in queries. Simpler programming model. Risk of loading too much data. Default for *ToOne relationships. Memory considerations.'
        },
        {
          name: 'Fetch Joins',
          explanation: 'JPQL: SELECT u FROM User u JOIN FETCH u.orders. Single query loads parent and children. Prevents N+1 problem. Can cause cartesian product with multiple collections. Distinct results. Most efficient loading strategy.'
        },
        {
          name: 'Entity Graphs',
          explanation: 'JPA 2.1+ feature for dynamic fetch plans. @NamedEntityGraph annotation or programmatic. Override default fetch types. Mix of LAZY and EAGER per query. More flexible than static annotations. Query-specific optimization.'
        },
        {
          name: 'Batch Fetching',
          explanation: '@BatchSize(size=10) annotation. Loads collections in batches. Reduces number of queries without JOIN FETCH. Multiple IDs in IN clause. Middle ground between lazy and eager. Configuration per relationship.'
        },
        {
          name: 'Fetch Strategy Trade-offs',
          explanation: 'Lazy: fewer initial queries, risk of LazyInitializationException. Eager: simpler code, potentially wasteful. Choose based on use case. Different strategies for different scenarios. Profile actual usage patterns.'
        }
      ]
    },
    {
      id: 'n-plus-one',
      name: 'N+1 Problem',
      icon: '⚠️',
      color: '#ef4444',
      description: 'Common ORM performance anti-pattern where loading parent entities triggers N additional queries for relationships',
      details: [
        {
          name: 'Problem Description',
          explanation: 'One query loads N parent entities, then N additional queries load children for each parent. Extremely common performance issue. 1 + N total queries. Linear growth with data size. Can bring system to crawl. Often invisible until production load.'
        },
        {
          name: 'Detection',
          explanation: 'Enable SQL logging: hibernate.show_sql=true. Look for repeated similar queries. APM tools show query patterns. Performance testing with realistic data volumes. Monitoring query counts. SQL explain plans.'
        },
        {
          name: 'JOIN FETCH Solution',
          explanation: 'Use JOIN FETCH in JPQL/HQL: FROM User u JOIN FETCH u.orders. Single query loads everything. Most efficient solution. Watch for cartesian products with multiple collections. Use SET to deduplicate results.'
        },
        {
          name: 'Batch Fetching',
          explanation: '@BatchSize(size=10) annotation loads in batches. Fewer queries than N+1 but more than JOIN FETCH. Good for collections that are rarely accessed. Reduces N+1 impact without complex queries.'
        },
        {
          name: 'Entity Graphs',
          explanation: 'Define fetch graph dynamically. entityGraph.addAttributeNodes("orders"). Applied per query. Overrides default lazy loading. Clean separation of mapping and fetching strategy. Multiple graphs for different use cases.'
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
      stack.push({ name: 'Object-Relational Mapping', icon: '🔗', onClick: () => { setSelectedConceptIndex(null); setSelectedDetailIndex(0) } })
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    } else {
      stack.push({ name: 'Object-Relational Mapping', icon: '🔗' })
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
          <h1 style={titleStyle}>Object-Relational Mapping</h1>
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

export default ORM
