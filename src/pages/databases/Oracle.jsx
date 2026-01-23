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

function Oracle({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'plsql',
      name: 'PL/SQL Programming',
      icon: '📜',
      color: '#ef4444',
      description: 'Advanced PL/SQL programming including stored procedures, triggers, cursors, exception handling, and dynamic SQL',
      details: [
        {
          name: 'Stored Procedures & Functions',
          explanation: 'PL/SQL procedures for business logic encapsulation. Functions return single values. Packages group related procedures and functions. Public and private declarations. Package state persistence within session. Overloading for polymorphism.'
        },
        {
          name: 'Triggers',
          explanation: 'Before/after triggers on DML operations. Statement-level and row-level triggers. Instead-of triggers for views. Compound triggers for performance. Mutating table challenges and solutions. Audit and logging use cases.'
        },
        {
          name: 'Cursors & Bulk Processing',
          explanation: 'Explicit cursors for row-by-row processing. Cursor FOR loops for simplicity. REF cursors for dynamic result sets. BULK COLLECT for array fetching. FORALL for bulk DML. Optimize PL/SQL with bulk operations.'
        },
        {
          name: 'Exception Handling',
          explanation: 'Predefined exceptions like NO_DATA_FOUND, TOO_MANY_ROWS. User-defined exceptions with RAISE. EXCEPTION_INIT pragma for error mapping. SQLCODE and SQLERRM for error details. Propagation and handling hierarchy.'
        },
        {
          name: 'Collections & Records',
          explanation: 'Associative arrays (INDEX BY tables). Nested tables and VARRAYs. Record types for structured data. Collection methods (COUNT, FIRST, LAST, DELETE). Bulk operations with collections.'
        },
        {
          name: 'Dynamic SQL',
          explanation: 'EXECUTE IMMEDIATE for dynamic DDL and DML. DBMS_SQL for complex dynamic queries. Bind variables to prevent SQL injection. Dynamic PL/SQL blocks. Ref cursor with dynamic queries.'
        }
      ]
    },
    {
      id: 'performance-tuning',
      name: 'Performance Tuning',
      icon: '⚡',
      color: '#f59e0b',
      description: 'Oracle performance tuning including execution plans, AWR analysis, optimizer hints, and partitioning strategies',
      details: [
        {
          name: 'Execution Plans & AWR',
          explanation: 'EXPLAIN PLAN shows query execution strategy. Automatic Workload Repository (AWR) for historical analysis. ADDM for automated diagnostics. SQL Tuning Advisor for recommendations. Trace files with TKPROF for deep analysis.'
        },
        {
          name: 'Optimizer & Hints',
          explanation: 'Cost-based optimizer (CBO) uses statistics. Hints guide optimizer decisions (INDEX, FULL, PARALLEL). Cardinality feedback for iterative tuning. Adaptive query optimization. SQL Plan Management for stability.'
        },
        {
          name: 'Indexing Strategies',
          explanation: 'B-tree indexes for range queries. Bitmap indexes for low-cardinality columns. Function-based indexes for expressions. Invisible indexes for testing. Index compression and partitioned indexes. Monitor index usage with V$OBJECT_USAGE.'
        },
        {
          name: 'Partitioning',
          explanation: 'Range, list, hash, and composite partitioning. Partition pruning for query optimization. Local and global indexes. Partition exchange for data loading. Interval partitioning for automatic management. Reference partitioning for child tables.'
        },
        {
          name: 'SQL Tuning Techniques',
          explanation: 'Rewrite queries to avoid full table scans. Use bind variables for cursor sharing. Avoid implicit data type conversions. Minimize context switches between SQL and PL/SQL. Star transformation for data warehouses.'
        },
        {
          name: 'Memory & Buffer Management',
          explanation: 'SGA components: shared pool, buffer cache, log buffer. PGA for session-specific memory. Automatic Memory Management (AMM). Result cache for frequently accessed data. Keep pool for hot tables.'
        }
      ]
    },
    {
      id: 'rac-ha',
      name: 'RAC & High Availability',
      icon: '🔁',
      color: '#8b5cf6',
      description: 'High availability solutions including RAC clustering, Data Guard replication, RMAN backups, and ASM storage',
      details: [
        {
          name: 'Real Application Clusters',
          explanation: 'Multiple instances accessing single database. Cache Fusion for inter-instance communication. Transparent Application Failover (TAF). Services for load balancing. Fast Application Notification (FAN) for connection failover.'
        },
        {
          name: 'Data Guard',
          explanation: 'Physical standby for exact replica. Logical standby for read-write reporting. Active Data Guard for read-only queries. Fast-Start Failover for automatic failover. Observer process monitors primary and standby.'
        },
        {
          name: 'RMAN Backup & Recovery',
          explanation: 'Recovery Manager for backups. Full, incremental, and cumulative backups. Block change tracking for efficiency. Backup compression and encryption. Point-in-time recovery (PITR). Flashback technology for data recovery.'
        },
        {
          name: 'ASM & Storage',
          explanation: 'Automatic Storage Management for database files. Disk groups with redundancy. ASM rebalancing for load distribution. ACFS for cluster file systems. Intelligent data placement.'
        },
        {
          name: 'Grid Infrastructure',
          explanation: 'Clusterware for cluster management. Oracle Restart for single-instance HA. Resource management and monitoring. Voting disk and OCR for cluster integrity. Network configuration with SCAN.'
        },
        {
          name: 'Flashback Technologies',
          explanation: 'Flashback Query for historical data. Flashback Table to undo changes. Flashback Drop for undelete. Flashback Database for point-in-time recovery. Total Recall for long-term archival.'
        }
      ]
    },
    {
      id: 'security',
      name: 'Security & Auditing',
      icon: '🔒',
      color: '#3b82f6',
      description: 'Oracle security features including VPD, TDE encryption, comprehensive auditing, and Database Vault',
      details: [
        {
          name: 'Fine-Grained Access',
          explanation: 'Virtual Private Database (VPD) for row-level security. DBMS_RLS policies. Application contexts for session attributes. Secure application roles. Label security for classified data.'
        },
        {
          name: 'Encryption',
          explanation: 'Transparent Data Encryption (TDE) for tablespaces and columns. Network encryption with SSL/TLS. Encrypted backup sets. Wallet management for keys. Advanced Encryption Standard (AES).'
        },
        {
          name: 'Auditing',
          explanation: 'Unified Audit Trail for comprehensive logging. Fine-grained audit (FGA) for specific access patterns. Mandatory auditing for privileged users. AUDIT_ADMIN role for audit management. Audit policies and conditions.'
        },
        {
          name: 'User Management',
          explanation: 'Database users and schemas. Password policies and profiles. Account locking and expiration. External authentication with LDAP/Kerberos. Proxy authentication for application users.'
        },
        {
          name: 'Privilege Management',
          explanation: 'System and object privileges. Roles for privilege grouping. WITH ADMIN OPTION for role grants. Secure application roles with procedures. Privilege analysis to identify excessive grants.'
        },
        {
          name: 'Database Vault',
          explanation: 'Separation of duties with realms. Command rules to restrict operations. Multi-factor authorization for sensitive operations. Trusted paths for privileged access. Database Vault administrator roles.'
        }
      ]
    },
    {
      id: 'data-warehousing',
      name: 'Data Warehousing',
      icon: '📊',
      color: '#10b981',
      description: 'Data warehousing features including materialized views, star schema, parallel processing, and columnar compression',
      details: [
        {
          name: 'Materialized Views',
          explanation: 'Pre-computed query results for performance. Fast refresh with materialized view logs. Complete and incremental refresh. Query rewrite for transparent use. Refresh on commit or on demand. Partition change tracking (PCT).'
        },
        {
          name: 'Star Schema Design',
          explanation: 'Fact tables with measures and foreign keys. Dimension tables with attributes. Star queries with bitmap indexes. Bitmap join indexes for optimization. Dimension hierarchies and aggregations.'
        },
        {
          name: 'Parallel Processing',
          explanation: 'Parallel query execution across CPUs. Parallel DML for bulk operations. Parallel DDL for index creation. Degree of parallelism (DOP) tuning. Parallel execution servers and queuing.'
        },
        {
          name: 'Data Loading',
          explanation: 'SQL*Loader for external file loading. External tables for direct access. Direct-path insert for bulk loading. Parallel loading for performance. Error handling and bad file logging.'
        },
        {
          name: 'Analytical Functions',
          explanation: 'Window functions (ROW_NUMBER, RANK, DENSE_RANK). Aggregations with OVER clause. LAG and LEAD for time-series analysis. PIVOT and UNPIVOT for data transformation. MODEL clause for spreadsheet-like calculations.'
        },
        {
          name: 'Compression & Storage',
          explanation: 'Table compression (basic, advanced, hybrid columnar). Compress for OLTP and query high. Compression advisor for recommendations. Partitioning with compression. Deduplication and space savings.'
        }
      ]
    },
    {
      id: 'advanced-features',
      name: 'Advanced Features',
      icon: '🚀',
      color: '#14b8a6',
      description: 'Advanced Oracle features including in-memory column store, multitenant architecture, JSON support, and spatial data',
      details: [
        {
          name: 'In-Memory Column Store',
          explanation: 'Dual-format architecture (row and column). In-memory aggregation and analytics. Automatic DML synchronization. In-memory expressions for computed columns. Population strategies (on demand, priority). Dramatic query speedup.'
        },
        {
          name: 'Edition-Based Redefinition',
          explanation: 'Online application upgrades without downtime. Multiple code versions (editions). Cross-edition triggers for data transformation. Edition retirement after deployment. Backward compatibility during transition.'
        },
        {
          name: 'JSON & XML Support',
          explanation: 'Native JSON data type. JSON_TABLE for relational projection. JSON path expressions. XML storage with XMLType. XQuery for XML querying. JSON and XML indexing.'
        },
        {
          name: 'Multitenant Architecture',
          explanation: 'Container database (CDB) with pluggable databases (PDBs). Resource isolation and management. Rapid provisioning with cloning. Easier patching and upgrades. Consolidation benefits.'
        },
        {
          name: 'Advanced Queueing',
          explanation: 'Message queuing with DBMS_AQ. Persistent message storage. Publish-subscribe and point-to-point. Message transformation and propagation. JMS compatibility for Java integration.'
        },
        {
          name: 'Spatial & Graph',
          explanation: 'Oracle Spatial for geographic data. Geometric data types and operators. Spatial indexing (R-tree, quadtree). Network data model for graphs. Shortest path and reachability queries.'
        }
      ]
    },
    {
      id: 'oracle-cloud',
      name: 'Oracle Cloud & Exadata',
      icon: '☁️',
      color: '#6366f1',
      description: 'Oracle Cloud and Exadata including Autonomous Database, cloud services, migration tools, and REST APIs',
      details: [
        {
          name: 'Autonomous Database',
          explanation: 'Self-driving database with machine learning. Self-securing against threats. Self-repairing for high availability. Automated patching and tuning. Workload types: OLTP, data warehouse, JSON, APEX.'
        },
        {
          name: 'Exadata Architecture',
          explanation: 'Engineered system for Oracle Database. Smart Scan offloads processing to storage. Hybrid Columnar Compression. InfiniBand interconnect for low latency. Flash cache for frequently accessed data.'
        },
        {
          name: 'Cloud Services',
          explanation: 'Oracle Database Cloud Service (DBCS). Bare metal and virtual machines. Automated backups and patching. Scaling compute and storage independently. Data Guard integration for DR.'
        },
        {
          name: 'Database Migration',
          explanation: 'Data Pump for logical migration. GoldenGate for real-time replication. Zero Downtime Migration (ZDM) tools. Cloud migration utilities. Assessment and planning tools.'
        },
        {
          name: 'Container Databases',
          explanation: 'CDB architecture with PDBs. Pluggable database cloning. Snapshot copies for dev/test. Easier management at scale. Multi-tenant consolidation.'
        },
        {
          name: 'Oracle REST Data Services',
          explanation: 'RESTful web services for database access. Auto-REST for tables and views. OAuth 2.0 security. JSON document store (SODA). Low-code development with APEX.'
        }
      ]
    },
    {
      id: 'dba-operations',
      name: 'DBA Operations',
      icon: '⚙️',
      color: '#ec4899',
      description: 'Database administration including database creation, space management, maintenance tasks, and monitoring',
      details: [
        {
          name: 'Database Creation',
          explanation: 'DBCA for graphical creation. Manual database creation with scripts. Database configuration parameters. Character set selection. Undo and redo sizing. Control file multiplexing.'
        },
        {
          name: 'Space Management',
          explanation: 'Tablespace administration (permanent, temporary, undo). Segment space management (auto vs manual). Resumable space allocation. Shrinking segments to reclaim space. Monitoring space usage and growth.'
        },
        {
          name: 'Maintenance Tasks',
          explanation: 'Statistics gathering with DBMS_STATS. Optimizer statistics management. Segment advisor for fragmentation. SQL Tuning Advisor. ADDM for performance recommendations. Health checks.'
        },
        {
          name: 'Monitoring & Diagnostics',
          explanation: 'Enterprise Manager Cloud Control. AWR reports for performance analysis. ASH (Active Session History). Wait event analysis. Alert log monitoring. V$ and DBA_ views for system state.'
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
      stack.push({ name: 'Oracle Database', icon: '🗄️', onClick: () => { setSelectedConceptIndex(null); setSelectedDetailIndex(0) } })
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    } else {
      stack.push({ name: 'Oracle Database', icon: '🗄️' })
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
          <h1 style={titleStyle}>Oracle Database</h1>
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

export default Oracle
