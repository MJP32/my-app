import { useState, useEffect, useRef } from 'react'

const ModernDiagram = ({ components, onComponentClick, title, width = 1400, height = 800, containerWidth = 1800, focusedIndex }) => {
  const [hoveredComponent, setHoveredComponent] = useState(null)

  return (
    <div style={{
      width: '100%',
      maxWidth: `${containerWidth}px`,
      margin: '0 auto',
      backgroundColor: '#f8fafc',
      borderRadius: '16px',
      padding: '2rem',
      boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1)',
      border: '2px solid #e2e8f0'
    }}>
      <h3 style={{
        textAlign: 'center',
        marginBottom: '2rem',
        fontSize: '1.75rem',
        fontWeight: '800',
        color: '#1e293b',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        {title}
      </h3>

      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#1e40af" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#059669" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="tealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#0d9488" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="indigoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#db2777" stopOpacity="0.9"/>
          </linearGradient>

          {/* Arrow markers */}
          <marker id="arrowSolid" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#1e293b" />
          </marker>
          <marker id="arrowDashed" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#64748b" />
          </marker>
        </defs>

        {/* Architectural layer backgrounds */}
        <g opacity="0.1">
          <rect x="50" y="180" width="420" height="200" rx="16" fill="#3b82f6" />
          <text x="260" y="210" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e40af" opacity="0.6">
            Layer 1
          </text>

          <rect x="550" y="80" width="420" height="560" rx="16" fill="#10b981" />
          <text x="760" y="110" textAnchor="middle" fontSize="14" fontWeight="700" fill="#059669" opacity="0.6">
            Layer 2
          </text>

          <rect x="1050" y="180" width="420" height="520" rx="16" fill="#8b5cf6" />
          <text x="1260" y="210" textAnchor="middle" fontSize="14" fontWeight="700" fill="#7c3aed" opacity="0.6">
            Layer 3
          </text>
        </g>

        {/* Connecting lines with arrows and labels */}
        <g fill="none">
          <line x1="430" y1="300" x2="580" y2="200" stroke="#1e293b" strokeWidth="3" strokeOpacity="0.8" markerEnd="url(#arrowSolid)"/>
          <text x="505" y="240" fontSize="11" fontWeight="600" fill="#1e293b" textAnchor="middle">
            interacts
          </text>

          <line x1="430" y1="300" x2="580" y2="400" stroke="#1e293b" strokeWidth="3" strokeOpacity="0.8" markerEnd="url(#arrowSolid)"/>
          <text x="505" y="360" fontSize="11" fontWeight="600" fill="#1e293b" textAnchor="middle">
            uses
          </text>

          <line x1="930" y1="200" x2="1080" y2="300" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="1005" y="240" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            depends
          </text>

          <line x1="930" y1="400" x2="1080" y2="500" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="1005" y="460" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            provides
          </text>

          <line x1="430" y1="500" x2="580" y2="600" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="505" y="560" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            extends
          </text>

          <line x1="930" y1="500" x2="760" y2="600" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="845" y="560" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            integrates
          </text>
        </g>

        {/* Component rectangles */}
        {components.map((component, index) => {
          const isFocused = focusedIndex === index
          const isHovered = hoveredComponent === component.id
          const isHighlighted = isFocused || isHovered

          return (
          <g key={component.id}>
            {/* Focused ring indicator */}
            {isFocused && (
              <rect
                x={component.x - 6}
                y={component.y - 6}
                width={component.width + 12}
                height={component.height + 12}
                rx="16"
                ry="16"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="4"
                style={{
                  opacity: 0.9,
                  filter: 'drop-shadow(0 0 12px rgba(251, 191, 36, 0.6))'
                }}
              />
            )}
            <rect
              x={component.x}
              y={component.y}
              width={component.width}
              height={component.height}
              rx="12"
              ry="12"
              fill={`url(#${component.color}Gradient)`}
              stroke={isHighlighted ? '#1e293b' : '#64748b'}
              strokeWidth={isHighlighted ? '4' : '2'}
              style={{
                cursor: 'pointer',
                filter: isHighlighted ? 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))' : 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                transform: isHighlighted ? 'scale(1.05)' : 'scale(1)',
                transformOrigin: `${component.x + component.width/2}px ${component.y + component.height/2}px`,
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={() => setHoveredComponent(component.id)}
              onMouseLeave={() => setHoveredComponent(null)}
              onClick={() => onComponentClick && onComponentClick(component)}
            />

            {/* Icon */}
            <text
              x={component.x + component.width/2}
              y={component.y + 35}
              textAnchor="middle"
              fontSize="48"
              style={{ userSelect: 'none', pointerEvents: 'none' }}
            >
              {component.icon}
            </text>

            {/* Title */}
            <text
              x={component.x + component.width/2}
              y={component.y + 75}
              textAnchor="middle"
              fontSize="18"
              fontWeight="700"
              fill="white"
              style={{ userSelect: 'none', pointerEvents: 'none' }}
            >
              {component.title}
            </text>

            {/* Details */}
            {component.details && component.details.slice(0, 3).map((detail, idx) => (
              <text
                key={idx}
                x={component.x + component.width/2}
                y={component.y + 100 + (idx * 15)}
                textAnchor="middle"
                fontSize="10"
                fontWeight="500"
                fill="rgba(255,255,255,0.9)"
                style={{ userSelect: 'none', pointerEvents: 'none' }}
              >
                {detail.name.length > 18 ? detail.name.substring(0, 15) + '...' : detail.name}
              </text>
            ))}
            {component.details && component.details.length > 3 && (
              <text
                x={component.x + component.width/2}
                y={component.y + 145}
                textAnchor="middle"
                fontSize="10"
                fontWeight="500"
                fill="rgba(255,255,255,0.7)"
                style={{ userSelect: 'none', pointerEvents: 'none' }}
              >
                +{component.details.length - 3} more topics...
              </text>
            )}
          </g>
        )})}
      </svg>
    </div>
  )
}

function SQL({ onBack }) {
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedConcept, setSelectedConcept] = useState(null)
  const [focusedComponentIndex, setFocusedComponentIndex] = useState(0)

  const components = [
    {
      id: 'query-optimization', x: 80, y: 240, width: 350, height: 160,
      icon: '⚡', title: 'Query Optimization', color: 'blue',
      details: [
        { name: 'Execution Plans', explanation: 'EXPLAIN and EXPLAIN ANALYZE show query execution strategy. Identify sequential scans, index scans, joins algorithms. Understand cost estimates and actual execution times. Query planner statistics and optimizer hints. Optimize based on actual execution metrics.' },
        { name: 'Indexing Strategy', explanation: 'B-tree indexes for equality and range queries. Hash indexes for exact matches. GiST and GIN for full-text and geometric data. Covering indexes to avoid table lookups. Index-only scans for optimal performance. Balance index maintenance cost vs query speed.' },
        { name: 'Query Rewriting', explanation: 'Transform correlated subqueries to joins. Use EXISTS instead of IN for large subqueries. Predicate pushdown to filter early. Common table expressions (CTEs) for readability and reuse. Avoid functions on indexed columns in WHERE clauses.' },
        { name: 'Join Optimization', explanation: 'Nested loop, hash, and merge join algorithms. Join order affects performance dramatically. Filter data before joining. Use appropriate join types (INNER, LEFT, etc.). Analyze cardinality for join optimization. Denormalization for frequently joined tables.' },
        { name: 'Statistics & Analyze', explanation: 'ANALYZE updates table statistics for planner. Accurate row estimates improve query plans. Auto-vacuum and manual vacuum analyze. Histogram statistics for column distributions. Extended statistics for correlated columns.' },
        { name: 'Partitioning', explanation: 'Range, list, and hash partitioning strategies. Partition pruning eliminates unnecessary scans. Partition-wise joins for parallel processing. Local vs global indexes. Archive old data for maintenance performance.' }
      ],
      description: 'Advanced query optimization techniques including execution plans, indexing strategies, and query rewriting for optimal performance.'
    },
    {
      id: 'database-design', x: 580, y: 140, width: 350, height: 160,
      icon: '🏗️', title: 'Database Design', color: 'green',
      details: [
        { name: 'Normalization', explanation: '1NF: atomic values, unique rows. 2NF: remove partial dependencies. 3NF: remove transitive dependencies. BCNF: every determinant is candidate key. Reduce redundancy and update anomalies. Balance with denormalization needs.' },
        { name: 'Entity-Relationship', explanation: 'Entities represent business objects. Relationships with cardinality (one-to-one, one-to-many, many-to-many). Attributes and candidate keys. ER diagrams for visualization. Convert to relational schema with foreign keys.' },
        { name: 'Schema Patterns', explanation: 'Star schema for data warehouses. Snowflake schema for normalized dimensions. Fact and dimension tables. Slowly changing dimensions (SCD Type 1, 2, 3). Temporal tables for history tracking.' },
        { name: 'Denormalization', explanation: 'Strategic redundancy for read performance. Materialized views for aggregates. Duplicate frequently accessed data. Trade-off: read speed vs write complexity. Calculated columns and summary tables.' },
        { name: 'Constraints & Integrity', explanation: 'Primary keys enforce uniqueness. Foreign keys maintain referential integrity. CHECK constraints for business rules. UNIQUE constraints and NULL handling. Cascading updates and deletes. Deferred constraint checking.' },
        { name: 'Data Types Selection', explanation: 'Choose appropriate types for storage efficiency. VARCHAR vs TEXT for strings. INT vs BIGINT based on range. DECIMAL for financial precision. Date/time types with timezone awareness. JSON for semi-structured data.' }
      ],
      description: 'Database design principles including normalization, ER modeling, schema patterns, and data integrity constraints.'
    },
    {
      id: 'transactions', x: 580, y: 340, width: 350, height: 160,
      icon: '🔄', title: 'Transactions & ACID', color: 'purple',
      details: [
        { name: 'ACID Properties', explanation: 'Atomicity: all or nothing execution. Consistency: valid state transitions. Isolation: concurrent execution appears serial. Durability: committed changes persist. Foundation for reliable database operations.' },
        { name: 'Isolation Levels', explanation: 'Read Uncommitted: dirty reads possible. Read Committed: prevents dirty reads. Repeatable Read: prevents non-repeatable reads. Serializable: full isolation, prevents phantoms. Trade-off between consistency and concurrency.' },
        { name: 'Locking Mechanisms', explanation: 'Shared (read) locks and exclusive (write) locks. Row-level, page-level, table-level locking. Deadlock detection and resolution. Lock timeout configuration. Optimistic vs pessimistic locking strategies.' },
        { name: 'MVCC', explanation: 'Multi-Version Concurrency Control for high concurrency. Readers never block writers, writers never block readers. Each transaction sees consistent snapshot. PostgreSQL uses MVCC extensively. Reduces lock contention dramatically.' },
        { name: 'Savepoints', explanation: 'Partial rollback within transactions. SAVEPOINT creates named transaction point. ROLLBACK TO SAVEPOINT for selective undo. Nested transaction-like behavior. Error recovery without full rollback.' },
        { name: 'Two-Phase Commit', explanation: 'Distributed transaction coordination. Prepare phase checks all participants. Commit phase completes transaction. All-or-nothing across multiple databases. XA protocol for heterogeneous systems.' }
      ],
      description: 'Transaction management with ACID properties, isolation levels, locking mechanisms, and MVCC for concurrent access.'
    },
    {
      id: 'performance-tuning', x: 80, y: 440, width: 350, height: 160,
      icon: '🎯', title: 'Performance Tuning', color: 'orange',
      details: [
        { name: 'Connection Pooling', explanation: 'Reuse database connections to reduce overhead. Pool size tuning based on workload. Connection timeout and validation. PgBouncer, HikariCP for connection management. Monitor pool utilization and wait times.' },
        { name: 'Caching Strategies', explanation: 'Query result caching with Redis or Memcached. Application-level cache for frequently accessed data. Database query cache (MySQL). Materialized views for expensive aggregations. Cache invalidation strategies.' },
        { name: 'Buffer Pool Tuning', explanation: 'Shared buffers for database pages in memory. Effective cache size for query planner. Work memory for sorting and hashing. Maintenance work memory for VACUUM. Balance with OS file system cache.' },
        { name: 'Batch Processing', explanation: 'Bulk inserts with COPY or batch INSERT. Multi-row INSERT statements. Disable indexes during bulk loads. Use UNLOGGED tables for temporary data. Prepare statements for repeated execution.' },
        { name: 'Vacuum & Maintenance', explanation: 'VACUUM reclaims space and updates statistics. VACUUM FULL compacts tables but locks. Auto-vacuum for automatic maintenance. REINDEX for index bloat. CLUSTER for physical ordering.' },
        { name: 'Monitoring & Profiling', explanation: 'Slow query log analysis. pg_stat_statements for query statistics. Active query monitoring. Lock and deadlock monitoring. I/O and cache hit ratio metrics. Database size and growth tracking.' }
      ],
      description: 'Performance tuning techniques including connection pooling, caching, buffer management, and monitoring strategies.'
    },
    {
      id: 'advanced-sql', x: 580, y: 540, width: 350, height: 160,
      icon: '🧙', title: 'Advanced SQL Features', color: 'red',
      details: [
        { name: 'Window Functions', explanation: 'ROW_NUMBER(), RANK(), DENSE_RANK() for rankings. LAG(), LEAD() for accessing adjacent rows. Aggregate functions with OVER clause. Partitioning and ordering within windows. Running totals and moving averages.' },
        { name: 'Common Table Expressions', explanation: 'WITH clause for named subqueries. Recursive CTEs for hierarchical data. Better readability than nested subqueries. Multiple CTEs in single query. Optimization and materialization control.' },
        { name: 'JSON/JSONB Support', explanation: 'Store and query JSON documents. JSONB for binary storage and indexing. JSON path expressions for querying. JSON aggregation functions. GIN indexes for fast JSON queries. Bridge between relational and document models.' },
        { name: 'Full-Text Search', explanation: 'tsvector and tsquery types for text search. Ranking and relevance scoring. Stemming and stop words. Multiple language support. Trigram indexes for fuzzy matching. Combined with other queries for filtering.' },
        { name: 'Array & Range Types', explanation: 'Array columns for multiple values. Array operators and functions. Range types for intervals. Overlapping and containment operators. GiST indexes for efficient range queries.' },
        { name: 'Generated Columns', explanation: 'Virtual and stored generated columns. Computed values from other columns. Automatically maintained by database. Index generated columns for query optimization. Useful for denormalization and derived data.' }
      ],
      description: 'Advanced SQL features including window functions, CTEs, JSON support, full-text search, and specialized data types.'
    },
    {
      id: 'replication-ha', x: 1080, y: 240, width: 350, height: 160,
      icon: '🔁', title: 'Replication & High Availability', color: 'teal',
      details: [
        { name: 'Streaming Replication', explanation: 'PostgreSQL streaming replication for hot standby. Asynchronous and synchronous modes. Replication slots for reliable WAL retention. Cascading replication for hierarchical setups. Monitoring replication lag.' },
        { name: 'Master-Slave Architecture', explanation: 'Primary handles writes, replicas handle reads. Read scaling through multiple replicas. Automatic failover with tools like Patroni. Load balancing across replicas. Geographic distribution for disaster recovery.' },
        { name: 'Logical Replication', explanation: 'Selective table replication. Publish-subscribe model. Cross-version replication. Bidirectional replication patterns. Useful for migrations and multi-tenant systems.' },
        { name: 'Backup Strategies', explanation: 'Physical backups with pg_basebackup. Logical dumps with pg_dump/pg_dumpall. Point-in-time recovery (PITR) with WAL archiving. Incremental and differential backups. Automated backup validation and restoration testing.' },
        { name: 'Failover & Recovery', explanation: 'Automatic failover with connection pooling. Promote replica to primary. Fencing to prevent split-brain. Testing failover procedures regularly. Recovery time objective (RTO) optimization.' },
        { name: 'Sharding', explanation: 'Horizontal partitioning across servers. Shard key selection critical for distribution. Foreign data wrappers for accessing shards. Citus extension for distributed PostgreSQL. Application-level vs database-level sharding.' }
      ],
      description: 'High availability solutions including streaming replication, failover strategies, backup approaches, and sharding.'
    },
    {
      id: 'security', x: 1080, y: 440, width: 350, height: 160,
      icon: '🔒', title: 'Security & Access Control', color: 'indigo',
      details: [
        { name: 'Authentication', explanation: 'Password, certificate, LDAP, Kerberos authentication. pg_hba.conf for host-based auth. Connection encryption with SSL/TLS. SCRAM-SHA-256 for secure passwords. Two-factor authentication integration.' },
        { name: 'Authorization & Roles', explanation: 'Role-based access control (RBAC). GRANT and REVOKE permissions. Schema-level and table-level privileges. Column-level security. Role hierarchies and inheritance. Principle of least privilege.' },
        { name: 'Row-Level Security', explanation: 'Fine-grained access control at row level. Policies based on user context. Multi-tenant data isolation. Transparent to application code. Performance considerations for RLS policies.' },
        { name: 'Encryption', explanation: 'At-rest encryption for data files. In-transit encryption with SSL. Transparent data encryption (TDE). Column-level encryption for sensitive data. Key management and rotation strategies.' },
        { name: 'Audit Logging', explanation: 'Track all database access and changes. pg_audit extension for PostgreSQL. Login attempts and permission changes. Query-level auditing. Compliance with SOX, GDPR, HIPAA requirements.' },
        { name: 'SQL Injection Prevention', explanation: 'Parameterized queries and prepared statements. Input validation and sanitization. Principle of least privilege for database users. Avoid dynamic SQL construction. Use ORM frameworks safely.' }
      ],
      description: 'Database security including authentication, authorization, encryption, row-level security, and audit logging.'
    },
    {
      id: 'data-warehousing', x: 1080, y: 640, width: 350, height: 140,
      icon: '📊', title: 'Data Warehousing & Analytics', color: 'pink',
      details: [
        { name: 'Star & Snowflake Schema', explanation: 'Fact tables with measures and foreign keys. Dimension tables with descriptive attributes. Star schema for denormalized dimensions. Snowflake schema for normalized dimensions. Optimized for analytics queries.' },
        { name: 'ETL Processes', explanation: 'Extract data from operational systems. Transform: cleansing, aggregation, enrichment. Load into data warehouse. Incremental vs full loads. Error handling and data quality checks. Scheduling and orchestration.' },
        { name: 'Columnar Storage', explanation: 'Column-oriented storage for analytics. Better compression ratios. Efficient aggregation queries. PostgreSQL cstore_fdw extension. Redshift and Vertica use columnar storage. Trade-off with transactional workloads.' },
        { name: 'OLAP Operations', explanation: 'Roll-up, drill-down, slice, dice, pivot operations. CUBE and ROLLUP for multi-dimensional aggregations. Window functions for complex analytics. Materialized views for pre-aggregation. Analytical query optimization.' }
      ],
      description: 'Data warehousing concepts including dimensional modeling, ETL processes, columnar storage, and OLAP operations.'
    }
  ]

  const handleComponentClick = (component) => {
    setSelectedComponent(component)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedComponent(null)
    setSelectedConcept(null)


  }

  // Use refs to access current modal state in event handler
  const selectedConceptRef = useRef(selectedConcept)
  useEffect(() => {
    selectedConceptRef.current = selectedConcept
  }, [selectedConcept])


  // Set initial focus on mount
  useEffect(() => {
    setFocusedComponentIndex(0)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      const currentSelectedConcept = selectedConceptRef.current
      // Handle Escape to close modal or go back to menu
      if (e.key === 'Escape') {
        if (currentSelectedConcept) {
          e.preventDefault()
          e.stopImmediatePropagation()
          setSelectedConcept(null)
          return
        }
        return
      }

      if (currentSelectedConcept) {
        // Modal is open, don't handle other keys
        return
      }

      // Navigation when modal is closed
      const componentCount = components.length

      switch(e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault()
          setFocusedComponentIndex((prev) => (prev + 1) % componentCount)
          break
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault()
          setFocusedComponentIndex((prev) => (prev - 1 + componentCount) % componentCount)
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          if (components[focusedComponentIndex]) {
            handleComponentClick(components[focusedComponentIndex])
          }
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [focusedComponentIndex])

  const handleConceptClick = (concept) => {
    setSelectedConcept(concept)
  }

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '95%',
      margin: '120px auto 0',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
      border: '3px solid rgba(59, 130, 246, 0.4)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <button
          onClick={onBack}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          ← Back to Menu
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#1f2937',
          margin: 0,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          🗃️ SQL Database Mastery
        </h1>
        <div style={{ width: '120px' }}></div>
      </div>

      <div style={{
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
        padding: '2.5rem 10rem',
        borderRadius: '16px',
        border: '3px solid rgba(59, 130, 246, 0.3)',
        marginBottom: '2rem'
      }}>
        <p style={{
          fontSize: '1.3rem',
          color: '#374151',
          fontWeight: '500',
          margin: 0,
          lineHeight: '1.8',
          textAlign: 'center'
        }}>
          Comprehensive SQL database expertise covering query optimization, database design patterns, transaction management,
          performance tuning, advanced SQL features, replication strategies, security practices, and data warehousing concepts
          for enterprise-grade database systems.
        </p>
      </div>

      <ModernDiagram
        components={components}
        onComponentClick={handleComponentClick}
        title="SQL Database Architecture & Optimization"
        width={1400}
        height={800}
        containerWidth={1800}
      
        focusedIndex={focusedComponentIndex}
      />

      {/* Modal */}
      {isModalOpen && selectedComponent && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 99999
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2.5rem',
            borderRadius: '16px',
            maxWidth: '1400px',
            width: '95%',
            maxHeight: '85vh',
            overflowY: 'auto',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            border: '3px solid rgba(59, 130, 246, 0.4)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '800',
                color: '#1f2937',
                margin: 0,
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                {selectedComponent.icon} {selectedComponent.title}
              </h2>
              <button
                onClick={closeModal}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                ✕
              </button>
            </div>

            <div style={{
              backgroundColor: 'rgba(59, 130, 246, 0.05)',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '2px solid rgba(59, 130, 246, 0.2)',
              marginBottom: '2rem'
            }}>
              <p style={{
                fontSize: '1.1rem',
                color: '#374151',
                fontWeight: '500',
                margin: 0,
                lineHeight: '1.6'
              }}>
                {selectedComponent.description}
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: selectedConcept ? '1fr 1fr' : '1fr',
              gap: '2rem'
            }}>
              <div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '1rem'
                }}>
                  Key Concepts
                </h3>
                <div style={{
                  display: 'grid',
                  gap: '0.75rem'
                }}>
                  {selectedComponent.details.map((detail, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleConceptClick(detail)}
                      style={{
                        backgroundColor: selectedConcept?.name === detail.name
                          ? 'rgba(59, 130, 246, 0.15)'
                          : 'rgba(59, 130, 246, 0.1)',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        border: selectedConcept?.name === detail.name
                          ? '2px solid rgba(59, 130, 246, 0.4)'
                          : '2px solid rgba(59, 130, 246, 0.2)',
                        fontSize: '0.95rem',
                        fontWeight: '500',
                        color: selectedConcept?.name === detail.name
                          ? '#1e40af'
                          : '#1e3a8a',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        transform: 'scale(1)'
                      }}
                      onMouseEnter={(e) => {
                        if (selectedConcept?.name !== detail.name) {
                          e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.15)'
                          e.target.style.transform = 'scale(1.02)'
                          e.target.style.borderColor = 'rgba(59, 130, 246, 0.4)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedConcept?.name !== detail.name) {
                          e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.1)'
                          e.target.style.transform = 'scale(1)'
                          e.target.style.borderColor = 'rgba(59, 130, 246, 0.2)'
                        }
                      }}
                    >
                      • {detail.name}
                      {selectedConcept?.name === detail.name && (
                        <span style={{
                          fontSize: '0.8rem',
                          opacity: 0.8,
                          marginLeft: '0.5rem',
                          fontWeight: '600'
                        }}>
                          ← Selected
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {selectedConcept && (
                <div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#1f2937',
                    marginBottom: '1rem'
                  }}>
                    {selectedConcept.name}
                  </h3>

                  <div style={{
                    backgroundColor: 'rgba(59, 130, 246, 0.05)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '2px solid rgba(59, 130, 246, 0.2)',
                    marginBottom: '1.5rem'
                  }}>
                    <p style={{
                      fontSize: '1rem',
                      color: '#374151',
                      fontWeight: '500',
                      margin: 0,
                      lineHeight: '1.7',
                      textAlign: 'justify'
                    }}>
                      {selectedConcept.explanation}
                    </p>
                  </div>

                  <div style={{
                    backgroundColor: 'rgba(16, 185, 129, 0.05)',
                    padding: '1.25rem',
                    borderRadius: '12px',
                    border: '2px solid rgba(16, 185, 129, 0.2)'
                  }}>
                    <h4 style={{
                      fontSize: '1rem',
                      fontWeight: '700',
                      color: '#047857',
                      margin: '0 0 0.75rem 0'
                    }}>
                      💡 Key Takeaway
                    </h4>
                    <p style={{
                      fontSize: '0.9rem',
                      color: '#047857',
                      fontWeight: '500',
                      margin: 0,
                      lineHeight: '1.5',
                      fontStyle: 'italic'
                    }}>
                      {selectedConcept.name} is essential for building high-performance, scalable, and reliable database systems that power modern enterprise applications.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default SQL
