import { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

function ORM({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
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
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
            >
              ← Back to Databases
            </button>
            <div>
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                background: 'linear-gradient(to right, #93c5fd, #60a5fa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                margin: 0
              }}>
                Object-Relational Mapping
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

      <p style={{
        fontSize: '1.2rem',
        color: '#9ca3af',
        textAlign: 'center',
        marginBottom: '3rem',
        lineHeight: '1.8'
      }}>
        Object-Relational Mapping: Hibernate and JPA frameworks enabling transparent persistence,
        entity mapping strategies, query optimization techniques, caching layers, transaction management,
        lazy/eager loading patterns, and solving the N+1 query problem.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedConcept ? '350px 1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {selectedConcept ? (
          <>
            {/* Sidebar */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <button
                onClick={() => setSelectedConcept(null)}
                style={{
                  padding: '0.75rem',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  backgroundColor: '#f59e0b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  marginBottom: '0.5rem'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#d97706'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#f59e0b'}
              >
                ← Back to All Concepts
              </button>
              {concepts.map((concept) => (
                <div
                  key={concept.id}
                  onClick={() => setSelectedConcept(concept)}
                  style={{
                    padding: '1rem',
                    backgroundColor: selectedConcept.id === concept.id ? concept.color + '20' : '#1f2937',
                    border: `2px solid ${selectedConcept.id === concept.id ? concept.color : '#374151'}`,
                    borderRadius: '8px',
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
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{concept.icon}</div>
                  <div style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: 'white'
                  }}>
                    {concept.name}
                  </div>
                </div>
              ))}
            </div>

            {/* Main content */}
            <div>
              <div style={{
                backgroundColor: selectedConcept.color + '10',
                padding: '2rem',
                borderRadius: '12px',
                border: `3px solid ${selectedConcept.color}40`,
                marginBottom: '2rem'
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{selectedConcept.icon}</div>
                <h2 style={{
                  fontSize: '2rem',
                  fontWeight: '800',
                  color: 'white',
                  marginBottom: '1rem'
                }}>
                  {selectedConcept.name}
                </h2>
                <p style={{
                  fontSize: '1.1rem',
                  color: '#9ca3af',
                  lineHeight: '1.8'
                }}>
                  {selectedConcept.description}
                </p>
              </div>

              <div style={{
                display: 'grid',
                gap: '1.5rem'
              }}>
                {selectedConcept.details.map((detail, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: '#1f2937',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      border: `2px solid #374151`,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '0.75rem'
                    }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: selectedConcept.color,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.9rem',
                        fontWeight: '700'
                      }}>
                        {index + 1}
                      </div>
                      <h3 style={{
                        fontSize: '1.1rem',
                        fontWeight: '700',
                        color: 'white',
                        margin: 0
                      }}>
                        {detail.name}
                      </h3>
                    </div>
                    <p style={{
                      fontSize: '1rem',
                      color: '#9ca3af',
                      lineHeight: '1.7',
                      margin: 0
                    }}>
                      {detail.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          concepts.map((concept) => (
            <div
              key={concept.id}
              onClick={() => setSelectedConcept(concept)}
              style={{
                backgroundColor: concept.color + '10',
                padding: '2rem',
                borderRadius: '12px',
                border: `3px solid ${concept.color}40`,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: 'translateY(0)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{concept.icon}</div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: 'white',
                marginBottom: '0.75rem'
              }}>
                {concept.name}
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: '#9ca3af',
                lineHeight: '1.6',
                marginBottom: '1rem'
              }}>
                {concept.description}
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem',
                color: concept.color,
                fontWeight: '600'
              }}>
                <span>Learn more</span>
                <span>→</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </div>
  )
}

export default ORM
