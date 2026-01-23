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

function SQL({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

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
          explanation: 'Batch inserts and updates reduce round trips. Use COPY command for bulk loading. Batch size tuning for optimal throughput. Disable indexes during bulk operations. Consider table locking for large batch operations.'
        },
        {
          name: 'Query Profiling',
          explanation: 'pg_stat_statements tracks query performance. Identify slow queries and high-frequency queries. Analyze wait events and lock contention. Monitor I/O patterns and memory usage. Set up alerting for performance degradation.'
        },
        {
          name: 'Maintenance Tasks',
          explanation: 'Regular VACUUM reclaims storage and updates statistics. REINDEX rebuilds fragmented indexes. Monitor table bloat and fragmentation. Schedule maintenance during low-traffic periods. Automate with pg_cron or external schedulers.'
        }
      ]
    },
    {
      id: 'advanced-sql',
      name: 'Advanced SQL Features',
      icon: '🚀',
      color: '#ec4899',
      description: 'Advanced SQL features including window functions and CTEs',
      details: [
        {
          name: 'Window Functions',
          explanation: 'ROW_NUMBER, RANK, DENSE_RANK for ranking. LAG/LEAD for accessing adjacent rows. SUM/AVG/COUNT OVER for running calculations. PARTITION BY divides result set. Frame specification (ROWS/RANGE) defines window bounds.'
        },
        {
          name: 'Common Table Expressions',
          explanation: 'WITH clause for readable subqueries. Recursive CTEs for hierarchical data traversal. Materialized vs non-materialized CTE behavior. Named intermediate results improve maintainability. Multiple CTEs can reference each other.'
        },
        {
          name: 'JSON Operations',
          explanation: 'JSONB type for efficient JSON storage. Operators: ->, ->>, @>, ?. GIN indexes for JSON queries. jsonb_agg for aggregating to JSON. json_table for converting JSON to relational format.'
        },
        {
          name: 'Full-Text Search',
          explanation: 'tsvector and tsquery types for text search. GIN and GiST indexes accelerate searches. Language-specific stemming and stop words. ts_rank for relevance scoring. Phrase search and proximity operators.'
        },
        {
          name: 'Lateral Joins',
          explanation: 'LATERAL allows subquery to reference preceding tables. Useful for correlated subqueries in FROM clause. Generate series and unnest with lateral. More flexible than traditional joins for certain patterns.'
        },
        {
          name: 'UPSERT Operations',
          explanation: 'INSERT ON CONFLICT for atomic upsert. DO UPDATE SET for merge operations. DO NOTHING for ignore duplicates. Conflict targets: constraints or columns. EXCLUDED pseudo-table references new values.'
        }
      ]
    },
    {
      id: 'replication-ha',
      name: 'Replication & High Availability',
      icon: '🔄',
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
      stack.push({ name: 'SQL', icon: '🗄️', onClick: () => { setSelectedConceptIndex(null); setSelectedDetailIndex(0) } })
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    } else {
      stack.push({ name: 'SQL', icon: '🗄️' })
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
          <h1 style={titleStyle}>SQL Database Mastery</h1>
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

export default SQL
