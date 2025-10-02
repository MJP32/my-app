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
          <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#1e40af" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#059669" stopOpacity="0.9"/>
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
          <rect x="50" y="180" width="420" height="200" rx="16" fill="#ef4444" />
          <text x="260" y="210" textAnchor="middle" fontSize="14" fontWeight="700" fill="#dc2626" opacity="0.6">
            Layer 1
          </text>

          <rect x="550" y="80" width="420" height="560" rx="16" fill="#f59e0b" />
          <text x="760" y="110" textAnchor="middle" fontSize="14" fontWeight="700" fill="#d97706" opacity="0.6">
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
            executes
          </text>

          <line x1="430" y1="300" x2="580" y2="400" stroke="#1e293b" strokeWidth="3" strokeOpacity="0.8" markerEnd="url(#arrowSolid)"/>
          <text x="505" y="360" fontSize="11" fontWeight="600" fill="#1e293b" textAnchor="middle">
            manages
          </text>

          <line x1="930" y1="200" x2="1080" y2="300" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="1005" y="240" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            scales
          </text>

          <line x1="930" y1="400" x2="1080" y2="500" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="1005" y="460" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            replicates
          </text>

          <line x1="430" y1="500" x2="580" y2="600" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="505" y="560" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            optimizes
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

function Oracle({ onBack }) {
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedConcept, setSelectedConcept] = useState(null)
  const [focusedComponentIndex, setFocusedComponentIndex] = useState(0)

  const components = [
    {
      id: 'plsql', x: 80, y: 240, width: 350, height: 160,
      icon: '📜', title: 'PL/SQL Programming', color: 'red',
      details: [
        { name: 'Stored Procedures & Functions', explanation: 'PL/SQL procedures for business logic encapsulation. Functions return single values. Packages group related procedures and functions. Public and private declarations. Package state persistence within session. Overloading for polymorphism.' },
        { name: 'Triggers', explanation: 'Before/after triggers on DML operations. Statement-level and row-level triggers. Instead-of triggers for views. Compound triggers for performance. Mutating table challenges and solutions. Audit and logging use cases.' },
        { name: 'Cursors & Bulk Processing', explanation: 'Explicit cursors for row-by-row processing. Cursor FOR loops for simplicity. REF cursors for dynamic result sets. BULK COLLECT for array fetching. FORALL for bulk DML. Optimize PL/SQL with bulk operations.' },
        { name: 'Exception Handling', explanation: 'Predefined exceptions like NO_DATA_FOUND, TOO_MANY_ROWS. User-defined exceptions with RAISE. EXCEPTION_INIT pragma for error mapping. SQLCODE and SQLERRM for error details. Propagation and handling hierarchy.' },
        { name: 'Collections & Records', explanation: 'Associative arrays (INDEX BY tables). Nested tables and VARRAYs. Record types for structured data. Collection methods (COUNT, FIRST, LAST, DELETE). Bulk operations with collections.' },
        { name: 'Dynamic SQL', explanation: 'EXECUTE IMMEDIATE for dynamic DDL and DML. DBMS_SQL for complex dynamic queries. Bind variables to prevent SQL injection. Dynamic PL/SQL blocks. Ref cursor with dynamic queries.' }
      ],
      description: 'Advanced PL/SQL programming including stored procedures, triggers, cursors, exception handling, and dynamic SQL.'
    },
    {
      id: 'performance-tuning', x: 580, y: 140, width: 350, height: 160,
      icon: '⚡', title: 'Performance Tuning', color: 'orange',
      details: [
        { name: 'Execution Plans & AWR', explanation: 'EXPLAIN PLAN shows query execution strategy. Automatic Workload Repository (AWR) for historical analysis. ADDM for automated diagnostics. SQL Tuning Advisor for recommendations. Trace files with TKPROF for deep analysis.' },
        { name: 'Optimizer & Hints', explanation: 'Cost-based optimizer (CBO) uses statistics. Hints guide optimizer decisions (INDEX, FULL, PARALLEL). Cardinality feedback for iterative tuning. Adaptive query optimization. SQL Plan Management for stability.' },
        { name: 'Indexing Strategies', explanation: 'B-tree indexes for range queries. Bitmap indexes for low-cardinality columns. Function-based indexes for expressions. Invisible indexes for testing. Index compression and partitioned indexes. Monitor index usage with V$OBJECT_USAGE.' },
        { name: 'Partitioning', explanation: 'Range, list, hash, and composite partitioning. Partition pruning for query optimization. Local and global indexes. Partition exchange for data loading. Interval partitioning for automatic management. Reference partitioning for child tables.' },
        { name: 'SQL Tuning Techniques', explanation: 'Rewrite queries to avoid full table scans. Use bind variables for cursor sharing. Avoid implicit data type conversions. Minimize context switches between SQL and PL/SQL. Star transformation for data warehouses.' },
        { name: 'Memory & Buffer Management', explanation: 'SGA components: shared pool, buffer cache, log buffer. PGA for session-specific memory. Automatic Memory Management (AMM). Result cache for frequently accessed data. Keep pool for hot tables.' }
      ],
      description: 'Oracle performance tuning including execution plans, AWR analysis, optimizer hints, and partitioning strategies.'
    },
    {
      id: 'rac-ha', x: 580, y: 340, width: 350, height: 160,
      icon: '🔁', title: 'RAC & High Availability', color: 'purple',
      details: [
        { name: 'Real Application Clusters', explanation: 'Multiple instances accessing single database. Cache Fusion for inter-instance communication. Transparent Application Failover (TAF). Services for load balancing. Fast Application Notification (FAN) for connection failover.' },
        { name: 'Data Guard', explanation: 'Physical standby for exact replica. Logical standby for read-write reporting. Active Data Guard for read-only queries. Fast-Start Failover for automatic failover. Observer process monitors primary and standby.' },
        { name: 'RMAN Backup & Recovery', explanation: 'Recovery Manager for backups. Full, incremental, and cumulative backups. Block change tracking for efficiency. Backup compression and encryption. Point-in-time recovery (PITR). Flashback technology for data recovery.' },
        { name: 'ASM & Storage', explanation: 'Automatic Storage Management for database files. Disk groups with redundancy. ASM rebalancing for load distribution. ACFS for cluster file systems. Intelligent data placement.' },
        { name: 'Grid Infrastructure', explanation: 'Clusterware for cluster management. Oracle Restart for single-instance HA. Resource management and monitoring. Voting disk and OCR for cluster integrity. Network configuration with SCAN.' },
        { name: 'Flashback Technologies', explanation: 'Flashback Query for historical data. Flashback Table to undo changes. Flashback Drop for undelete. Flashback Database for point-in-time recovery. Total Recall for long-term archival.' }
      ],
      description: 'High availability solutions including RAC clustering, Data Guard replication, RMAN backups, and ASM storage.'
    },
    {
      id: 'security', x: 80, y: 440, width: 350, height: 160,
      icon: '🔒', title: 'Security & Auditing', color: 'blue',
      details: [
        { name: 'Fine-Grained Access', explanation: 'Virtual Private Database (VPD) for row-level security. DBMS_RLS policies. Application contexts for session attributes. Secure application roles. Label security for classified data.' },
        { name: 'Encryption', explanation: 'Transparent Data Encryption (TDE) for tablespaces and columns. Network encryption with SSL/TLS. Encrypted backup sets. Wallet management for keys. Advanced Encryption Standard (AES).' },
        { name: 'Auditing', explanation: 'Unified Audit Trail for comprehensive logging. Fine-grained audit (FGA) for specific access patterns. Mandatory auditing for privileged users. AUDIT_ADMIN role for audit management. Audit policies and conditions.' },
        { name: 'User Management', explanation: 'Database users and schemas. Password policies and profiles. Account locking and expiration. External authentication with LDAP/Kerberos. Proxy authentication for application users.' },
        { name: 'Privilege Management', explanation: 'System and object privileges. Roles for privilege grouping. WITH ADMIN OPTION for role grants. Secure application roles with procedures. Privilege analysis to identify excessive grants.' },
        { name: 'Database Vault', explanation: 'Separation of duties with realms. Command rules to restrict operations. Multi-factor authorization for sensitive operations. Trusted paths for privileged access. Database Vault administrator roles.' }
      ],
      description: 'Oracle security features including VPD, TDE encryption, comprehensive auditing, and Database Vault.'
    },
    {
      id: 'data-warehousing', x: 580, y: 540, width: 350, height: 160,
      icon: '📊', title: 'Data Warehousing', color: 'green',
      details: [
        { name: 'Materialized Views', explanation: 'Pre-computed query results for performance. Fast refresh with materialized view logs. Complete and incremental refresh. Query rewrite for transparent use. Refresh on commit or on demand. Partition change tracking (PCT).' },
        { name: 'Star Schema Design', explanation: 'Fact tables with measures and foreign keys. Dimension tables with attributes. Star queries with bitmap indexes. Bitmap join indexes for optimization. Dimension hierarchies and aggregations.' },
        { name: 'Parallel Processing', explanation: 'Parallel query execution across CPUs. Parallel DML for bulk operations. Parallel DDL for index creation. Degree of parallelism (DOP) tuning. Parallel execution servers and queuing.' },
        { name: 'Data Loading', explanation: 'SQL*Loader for external file loading. External tables for direct access. Direct-path insert for bulk loading. Parallel loading for performance. Error handling and bad file logging.' },
        { name: 'Analytical Functions', explanation: 'Window functions (ROW_NUMBER, RANK, DENSE_RANK). Aggregations with OVER clause. LAG and LEAD for time-series analysis. PIVOT and UNPIVOT for data transformation. MODEL clause for spreadsheet-like calculations.' },
        { name: 'Compression & Storage', explanation: 'Table compression (basic, advanced, hybrid columnar). Compress for OLTP and query high. Compression advisor for recommendations. Partitioning with compression. Deduplication and space savings.' }
      ],
      description: 'Data warehousing features including materialized views, star schema, parallel processing, and columnar compression.'
    },
    {
      id: 'advanced-features', x: 1080, y: 240, width: 350, height: 160,
      icon: '🚀', title: 'Advanced Features', color: 'teal',
      details: [
        { name: 'In-Memory Column Store', explanation: 'Dual-format architecture (row and column). In-memory aggregation and analytics. Automatic DML synchronization. In-memory expressions for computed columns. Population strategies (on demand, priority). Dramatic query speedup.' },
        { name: 'Edition-Based Redefinition', explanation: 'Online application upgrades without downtime. Multiple code versions (editions). Cross-edition triggers for data transformation. Edition retirement after deployment. Backward compatibility during transition.' },
        { name: 'JSON & XML Support', explanation: 'Native JSON data type. JSON_TABLE for relational projection. JSON path expressions. XML storage with XMLType. XQuery for XML querying. JSON and XML indexing.' },
        { name: 'Multitenant Architecture', explanation: 'Container database (CDB) with pluggable databases (PDBs). Resource isolation and management. Rapid provisioning with cloning. Easier patching and upgrades. Consolidation benefits.' },
        { name: 'Advanced Queueing', explanation: 'Message queuing with DBMS_AQ. Persistent message storage. Publish-subscribe and point-to-point. Message transformation and propagation. JMS compatibility for Java integration.' },
        { name: 'Spatial & Graph', explanation: 'Oracle Spatial for geographic data. Geometric data types and operators. Spatial indexing (R-tree, quadtree). Network data model for graphs. Shortest path and reachability queries.' }
      ],
      description: 'Advanced Oracle features including in-memory column store, multitenant architecture, JSON support, and spatial data.'
    },
    {
      id: 'oracle-cloud', x: 1080, y: 440, width: 350, height: 160,
      icon: '☁️', title: 'Oracle Cloud & Exadata', color: 'indigo',
      details: [
        { name: 'Autonomous Database', explanation: 'Self-driving database with machine learning. Self-securing against threats. Self-repairing for high availability. Automated patching and tuning. Workload types: OLTP, data warehouse, JSON, APEX.' },
        { name: 'Exadata Architecture', explanation: 'Engineered system for Oracle Database. Smart Scan offloads processing to storage. Hybrid Columnar Compression. InfiniBand interconnect for low latency. Flash cache for frequently accessed data.' },
        { name: 'Cloud Services', explanation: 'Oracle Database Cloud Service (DBCS). Bare metal and virtual machines. Automated backups and patching. Scaling compute and storage independently. Data Guard integration for DR.' },
        { name: 'Database Migration', explanation: 'Data Pump for logical migration. GoldenGate for real-time replication. Zero Downtime Migration (ZDM) tools. Cloud migration utilities. Assessment and planning tools.' },
        { name: 'Container Databases', explanation: 'CDB architecture with PDBs. Pluggable database cloning. Snapshot copies for dev/test. Easier management at scale. Multi-tenant consolidation.' },
        { name: 'Oracle REST Data Services', explanation: 'RESTful web services for database access. Auto-REST for tables and views. OAuth 2.0 security. JSON document store (SODA). Low-code development with APEX.' }
      ],
      description: 'Oracle Cloud and Exadata including Autonomous Database, cloud services, migration tools, and REST APIs.'
    },
    {
      id: 'dba-operations', x: 1080, y: 640, width: 350, height: 140,
      icon: '⚙️', title: 'DBA Operations', color: 'pink',
      details: [
        { name: 'Database Creation', explanation: 'DBCA for graphical creation. Manual database creation with scripts. Database configuration parameters. Character set selection. Undo and redo sizing. Control file multiplexing.' },
        { name: 'Space Management', explanation: 'Tablespace administration (permanent, temporary, undo). Segment space management (auto vs manual). Resumable space allocation. Shrinking segments to reclaim space. Monitoring space usage and growth.' },
        { name: 'Maintenance Tasks', explanation: 'Statistics gathering with DBMS_STATS. Optimizer statistics management. Segment advisor for fragmentation. SQL Tuning Advisor. ADDM for performance recommendations. Health checks.' },
        { name: 'Monitoring & Diagnostics', explanation: 'Enterprise Manager Cloud Control. AWR reports for performance analysis. ASH (Active Session History). Wait event analysis. Alert log monitoring. V$ and DBA_ views for system state.' }
      ],
      description: 'Database administration including database creation, space management, maintenance tasks, and monitoring.'
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
      border: '3px solid rgba(239, 68, 68, 0.4)'
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
          🔴 Oracle Database Mastery
        </h1>
        <div style={{ width: '120px' }}></div>
      </div>

      <div style={{
        backgroundColor: 'rgba(239, 68, 68, 0.05)',
        padding: '2.5rem 10rem',
        borderRadius: '16px',
        border: '3px solid rgba(239, 68, 68, 0.3)',
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
          Enterprise Oracle Database expertise covering PL/SQL programming, performance tuning, RAC clustering,
          Data Guard replication, advanced security, data warehousing, in-memory column store, Autonomous Database,
          and comprehensive DBA operations for mission-critical enterprise systems.
        </p>
      </div>

      <ModernDiagram
        components={components}
        onComponentClick={handleComponentClick}
        title="Oracle Database Enterprise Architecture"
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
            border: '3px solid rgba(239, 68, 68, 0.4)'
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
              backgroundColor: 'rgba(239, 68, 68, 0.05)',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '2px solid rgba(239, 68, 68, 0.2)',
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
                          ? 'rgba(239, 68, 68, 0.15)'
                          : 'rgba(239, 68, 68, 0.1)',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        border: selectedConcept?.name === detail.name
                          ? '2px solid rgba(239, 68, 68, 0.4)'
                          : '2px solid rgba(239, 68, 68, 0.2)',
                        fontSize: '0.95rem',
                        fontWeight: '500',
                        color: selectedConcept?.name === detail.name
                          ? '#dc2626'
                          : '#991b1b',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        transform: 'scale(1)'
                      }}
                      onMouseEnter={(e) => {
                        if (selectedConcept?.name !== detail.name) {
                          e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.15)'
                          e.target.style.transform = 'scale(1.02)'
                          e.target.style.borderColor = 'rgba(239, 68, 68, 0.4)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedConcept?.name !== detail.name) {
                          e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'
                          e.target.style.transform = 'scale(1)'
                          e.target.style.borderColor = 'rgba(239, 68, 68, 0.2)'
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
                    backgroundColor: 'rgba(239, 68, 68, 0.05)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '2px solid rgba(239, 68, 68, 0.2)',
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
                      {selectedConcept.name} is essential for building enterprise-grade Oracle Database systems with optimal performance, high availability, and robust security for mission-critical applications.
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

export default Oracle
