import { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

function SQL({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
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
      id: 'query-optimization',
      name: 'Query Optimization',
      icon: '⚡',
      color: '#3b82f6',
      description: 'Advanced query optimization techniques including execution plans and indexing strategies',
      details: [
        {
          name: 'Execution Plans',
          explanation: 'EXPLAIN and EXPLAIN ANALYZE show query execution strategy. Identify sequential scans, index scans, and join algorithms. Understand cost estimates and actual execution times. Query planner statistics and optimizer hints help optimize based on actual execution metrics.'
        },
        {
          name: 'Indexing Strategy',
          explanation: 'B-tree indexes for equality and range queries. Hash indexes for exact matches. GiST and GIN for full-text and geometric data. Covering indexes avoid table lookups. Index-only scans provide optimal performance. Balance index maintenance cost vs query speed.'
        },
        {
          name: 'Query Rewriting',
          explanation: 'Transform correlated subqueries to joins. Use EXISTS instead of IN for large subqueries. Predicate pushdown filters data early. Common table expressions (CTEs) improve readability and reuse. Avoid functions on indexed columns in WHERE clauses.'
        },
        {
          name: 'Join Optimization',
          explanation: 'Nested loop, hash, and merge join algorithms. Join order affects performance dramatically. Filter data before joining. Use appropriate join types (INNER, LEFT, etc.). Analyze cardinality for join optimization. Consider denormalization for frequently joined tables.'
        },
        {
          name: 'Statistics & Analyze',
          explanation: 'ANALYZE updates table statistics for the query planner. Accurate row estimates improve query plans. Auto-vacuum and manual vacuum analyze maintain statistics. Histogram statistics track column distributions. Extended statistics handle correlated columns.'
        },
        {
          name: 'Partitioning',
          explanation: 'Range, list, and hash partitioning strategies. Partition pruning eliminates unnecessary scans. Partition-wise joins enable parallel processing. Choose between local vs global indexes. Archive old data to improve maintenance performance.'
        }
      ]
    },
    {
      id: 'database-design',
      name: 'Database Design',
      icon: '🏗️',
      color: '#10b981',
      description: 'Database design principles including normalization and ER modeling',
      details: [
        {
          name: 'Normalization',
          explanation: '1NF: atomic values, unique rows. 2NF: remove partial dependencies. 3NF: remove transitive dependencies. BCNF: every determinant is a candidate key. Reduce redundancy and update anomalies. Balance normalization with denormalization needs based on query patterns.'
        },
        {
          name: 'Entity-Relationship Modeling',
          explanation: 'Entities represent business objects. Relationships with cardinality (one-to-one, one-to-many, many-to-many). Define attributes and candidate keys. ER diagrams visualize data structure. Convert to relational schema with foreign keys to maintain referential integrity.'
        },
        {
          name: 'Schema Patterns',
          explanation: 'Star schema for data warehouses with fact and dimension tables. Snowflake schema for normalized dimensions. Slowly changing dimensions (SCD Type 1, 2, 3) track historical changes. Temporal tables provide built-in history tracking.'
        },
        {
          name: 'Denormalization',
          explanation: 'Strategic redundancy improves read performance. Materialized views pre-compute aggregates. Duplicate frequently accessed data to reduce joins. Trade-off: read speed vs write complexity. Use calculated columns and summary tables judiciously.'
        },
        {
          name: 'Constraints & Integrity',
          explanation: 'Primary keys enforce uniqueness. Foreign keys maintain referential integrity. CHECK constraints implement business rules. UNIQUE constraints prevent duplicates. Handle NULL values carefully. Cascading updates and deletes propagate changes. Deferred constraint checking for bulk operations.'
        },
        {
          name: 'Data Types Selection',
          explanation: 'Choose appropriate types for storage efficiency. VARCHAR vs TEXT for strings. INT vs BIGINT based on value range. DECIMAL for financial precision. Date/time types with timezone awareness. JSON for semi-structured data. Consider storage and performance implications.'
        }
      ]
    },
    {
      id: 'transactions',
      name: 'Transactions & ACID',
      icon: '🔄',
      color: '#8b5cf6',
      description: 'Transaction management with ACID properties and isolation levels',
      details: [
        {
          name: 'ACID Properties',
          explanation: 'Atomicity: all-or-nothing execution of transactions. Consistency: valid state transitions maintain database integrity. Isolation: concurrent execution appears serial to avoid conflicts. Durability: committed changes persist through system failures. Foundation for reliable database operations.'
        },
        {
          name: 'Isolation Levels',
          explanation: 'Read Uncommitted allows dirty reads. Read Committed prevents dirty reads. Repeatable Read prevents non-repeatable reads. Serializable provides full isolation and prevents phantoms. Trade-off between data consistency and concurrency performance.'
        },
        {
          name: 'Locking Mechanisms',
          explanation: 'Shared (read) locks and exclusive (write) locks coordinate access. Row-level, page-level, and table-level locking granularities. Deadlock detection and resolution strategies. Lock timeout configuration prevents indefinite waits. Choose between optimistic and pessimistic locking.'
        },
        {
          name: 'MVCC',
          explanation: 'Multi-Version Concurrency Control enables high concurrency. Readers never block writers, writers never block readers. Each transaction sees a consistent snapshot of data. PostgreSQL uses MVCC extensively. Dramatically reduces lock contention in high-throughput systems.'
        },
        {
          name: 'Savepoints',
          explanation: 'Enable partial rollback within transactions. SAVEPOINT creates named transaction checkpoints. ROLLBACK TO SAVEPOINT allows selective undo. Provides nested transaction-like behavior. Useful for error recovery without full transaction rollback.'
        },
        {
          name: 'Two-Phase Commit',
          explanation: 'Coordinates distributed transactions across multiple databases. Prepare phase validates all participants can commit. Commit phase completes the transaction atomically. All-or-nothing guarantee across systems. XA protocol supports heterogeneous database systems.'
        }
      ]
    },
    {
      id: 'performance-tuning',
      name: 'Performance Tuning',
      icon: '🎯',
      color: '#f59e0b',
      description: 'Performance tuning techniques including connection pooling and caching',
      details: [
        {
          name: 'Connection Pooling',
          explanation: 'Reuse database connections to reduce overhead. Tune pool size based on workload characteristics. Configure connection timeout and validation. PgBouncer and HikariCP provide connection management. Monitor pool utilization and wait times to avoid bottlenecks.'
        },
        {
          name: 'Caching Strategies',
          explanation: 'Query result caching with Redis or Memcached. Application-level cache for frequently accessed data. Database query cache (MySQL). Materialized views for expensive aggregations. Implement effective cache invalidation strategies to maintain consistency.'
        },
        {
          name: 'Buffer Pool Tuning',
          explanation: 'Shared buffers cache database pages in memory. Effective cache size guides the query planner. Work memory for sorting and hashing operations. Maintenance work memory for VACUUM operations. Balance database cache with OS file system cache.'
        },
        {
          name: 'Batch Processing',
          explanation: 'Bulk inserts with COPY or batch INSERT statements. Multi-row INSERT reduces round trips. Disable indexes during bulk loads for speed. Use UNLOGGED tables for temporary data. Prepare statements for repeated execution to reduce parsing overhead.'
        },
        {
          name: 'Vacuum & Maintenance',
          explanation: 'VACUUM reclaims space and updates statistics. VACUUM FULL compacts tables but requires locks. Auto-vacuum provides automatic maintenance. REINDEX rebuilds indexes to reduce bloat. CLUSTER reorders table data physically for better performance.'
        },
        {
          name: 'Monitoring & Profiling',
          explanation: 'Slow query log analysis identifies bottlenecks. pg_stat_statements tracks query statistics. Monitor active queries and resource usage. Track locks and deadlocks. Measure I/O and cache hit ratios. Monitor database size and growth trends over time.'
        }
      ]
    },
    {
      id: 'advanced-sql',
      name: 'Advanced SQL Features',
      icon: '🧙',
      color: '#ef4444',
      description: 'Advanced SQL features including window functions and CTEs',
      details: [
        {
          name: 'Window Functions',
          explanation: 'ROW_NUMBER(), RANK(), DENSE_RANK() for rankings. LAG() and LEAD() access adjacent rows. Aggregate functions with OVER clause. Partition and order data within windows. Calculate running totals and moving averages without self-joins.'
        },
        {
          name: 'Common Table Expressions',
          explanation: 'WITH clause creates named subqueries. Recursive CTEs query hierarchical data. Better readability than deeply nested subqueries. Multiple CTEs in a single query. Control optimization and materialization behavior for performance.'
        },
        {
          name: 'JSON/JSONB Support',
          explanation: 'Store and query JSON documents in relational databases. JSONB provides binary storage and indexing. JSON path expressions for querying nested data. JSON aggregation functions. GIN indexes enable fast JSON queries. Bridge between relational and document models.'
        },
        {
          name: 'Full-Text Search',
          explanation: 'tsvector and tsquery types for text search. Ranking and relevance scoring of results. Stemming and stop word removal. Multiple language support. Trigram indexes for fuzzy matching. Combine with other queries for filtering and sorting.'
        },
        {
          name: 'Array & Range Types',
          explanation: 'Array columns store multiple values in a single field. Array operators and functions for manipulation. Range types represent intervals. Overlapping and containment operators. GiST indexes enable efficient range queries for scheduling and temporal data.'
        },
        {
          name: 'Generated Columns',
          explanation: 'Virtual and stored generated columns. Computed values automatically derived from other columns. Maintained automatically by the database. Index generated columns for query optimization. Useful for denormalization and storing derived data.'
        }
      ]
    },
    {
      id: 'replication-ha',
      name: 'Replication & High Availability',
      icon: '🔁',
      color: '#14b8a6',
      description: 'High availability solutions including streaming replication and failover',
      details: [
        {
          name: 'Streaming Replication',
          explanation: 'PostgreSQL streaming replication for hot standby. Asynchronous mode for performance, synchronous for consistency. Replication slots ensure reliable WAL retention. Cascading replication enables hierarchical setups. Monitor replication lag to detect issues early.'
        },
        {
          name: 'Master-Slave Architecture',
          explanation: 'Primary handles all writes, replicas handle read queries. Read scaling through multiple replicas. Automatic failover with tools like Patroni. Load balancing distributes reads across replicas. Geographic distribution for disaster recovery and reduced latency.'
        },
        {
          name: 'Logical Replication',
          explanation: 'Selective table replication for flexibility. Publish-subscribe model for distributed systems. Cross-version replication during upgrades. Bidirectional replication patterns for multi-master setups. Useful for migrations and multi-tenant systems.'
        },
        {
          name: 'Backup Strategies',
          explanation: 'Physical backups with pg_basebackup for full copies. Logical dumps with pg_dump/pg_dumpall. Point-in-time recovery (PITR) with WAL archiving. Incremental and differential backups reduce storage. Automated backup validation and regular restoration testing.'
        },
        {
          name: 'Failover & Recovery',
          explanation: 'Automatic failover with connection pooling and health checks. Promote replica to primary during failures. Fencing prevents split-brain scenarios. Test failover procedures regularly. Optimize recovery time objective (RTO) and recovery point objective (RPO).'
        },
        {
          name: 'Sharding',
          explanation: 'Horizontal partitioning distributes data across servers. Shard key selection critical for even distribution. Foreign data wrappers access remote shards. Citus extension provides distributed PostgreSQL. Choose between application-level and database-level sharding.'
        }
      ]
    },
    {
      id: 'security',
      name: 'Security & Access Control',
      icon: '🔒',
      color: '#6366f1',
      description: 'Database security including authentication, authorization, and encryption',
      details: [
        {
          name: 'Authentication',
          explanation: 'Password, certificate, LDAP, and Kerberos authentication methods. pg_hba.conf configures host-based authentication. Connection encryption with SSL/TLS protects data in transit. SCRAM-SHA-256 for secure password storage. Two-factor authentication integration for sensitive systems.'
        },
        {
          name: 'Authorization & Roles',
          explanation: 'Role-based access control (RBAC) manages permissions. GRANT and REVOKE control access. Schema-level and table-level privileges. Column-level security for sensitive data. Role hierarchies and inheritance. Follow the principle of least privilege.'
        },
        {
          name: 'Row-Level Security',
          explanation: 'Fine-grained access control at the row level. Policies based on user context and attributes. Multi-tenant data isolation within shared tables. Transparent to application code. Consider performance implications of complex RLS policies.'
        },
        {
          name: 'Encryption',
          explanation: 'At-rest encryption protects stored data files. In-transit encryption with SSL/TLS. Transparent data encryption (TDE) for compliance. Column-level encryption for highly sensitive data. Implement proper key management and rotation strategies.'
        },
        {
          name: 'Audit Logging',
          explanation: 'Track all database access and changes for compliance. pg_audit extension for PostgreSQL auditing. Log login attempts and permission changes. Query-level auditing for sensitive operations. Meet SOX, GDPR, HIPAA audit requirements.'
        },
        {
          name: 'SQL Injection Prevention',
          explanation: 'Parameterized queries and prepared statements prevent injection. Input validation and sanitization at application layer. Principle of least privilege for database users. Avoid dynamic SQL construction. Use ORM frameworks safely with proper configuration.'
        }
      ]
    },
    {
      id: 'data-warehousing',
      name: 'Data Warehousing & Analytics',
      icon: '📊',
      color: '#ec4899',
      description: 'Data warehousing concepts including dimensional modeling and ETL',
      details: [
        {
          name: 'Star & Snowflake Schema',
          explanation: 'Fact tables contain measures and foreign keys to dimensions. Dimension tables store descriptive attributes. Star schema uses denormalized dimensions for simplicity. Snowflake schema normalizes dimensions to reduce redundancy. Optimized for analytics queries with fewer joins.'
        },
        {
          name: 'ETL Processes',
          explanation: 'Extract data from operational systems. Transform: cleansing, aggregation, enrichment. Load into data warehouse efficiently. Incremental vs full loads trade-offs. Implement error handling and data quality checks. Schedule and orchestrate ETL pipelines.'
        },
        {
          name: 'Columnar Storage',
          explanation: 'Column-oriented storage optimized for analytics. Achieves better compression ratios. Efficient aggregation queries read only needed columns. PostgreSQL cstore_fdw extension. Redshift and Vertica use columnar storage. Trade-off with transactional workload performance.'
        },
        {
          name: 'OLAP Operations',
          explanation: 'Roll-up, drill-down, slice, dice, and pivot operations for analysis. CUBE and ROLLUP for multi-dimensional aggregations. Window functions enable complex analytics. Materialized views pre-compute aggregations. Optimize analytical queries with proper indexing.'
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
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
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
              SQL Database Mastery
            </h1>
            {currentSubcategory && (
              <span style={{
                padding: '0.25rem 0.75rem',
                fontSize: '0.85rem',
                fontWeight: '600',
                backgroundColor: '#1e3a5f',
                color: '#93c5fd',
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

export default SQL
