import { useState, useEffect } from 'react'

function Oracle({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory }) {
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
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
          >
            ← Back to Menu
          </button>
          <div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: '#1f2937',
              margin: 0
            }}>
              🔴 Oracle Database
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

      <p style={{
        fontSize: '1.2rem',
        color: '#4b5563',
        textAlign: 'center',
        marginBottom: '3rem',
        lineHeight: '1.8'
      }}>
        Enterprise Oracle Database expertise covering PL/SQL programming, performance tuning, RAC clustering,
        Data Guard replication, advanced security, data warehousing, in-memory column store, Autonomous Database,
        and comprehensive DBA operations for mission-critical enterprise systems.
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
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  marginBottom: '0.5rem'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}
              >
                ← Back to All Concepts
              </button>
              {concepts.map((concept) => (
                <div
                  key={concept.id}
                  onClick={() => setSelectedConcept(concept)}
                  style={{
                    padding: '1rem',
                    backgroundColor: selectedConcept.id === concept.id ? concept.color + '20' : '#f9fafb',
                    border: `2px solid ${selectedConcept.id === concept.id ? concept.color : '#e5e7eb'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedConcept.id !== concept.id) {
                      e.currentTarget.style.backgroundColor = concept.color + '10'
                      e.currentTarget.style.borderColor = concept.color
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedConcept.id !== concept.id) {
                      e.currentTarget.style.backgroundColor = '#f9fafb'
                      e.currentTarget.style.borderColor = '#e5e7eb'
                    }
                  }}
                >
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{concept.icon}</div>
                  <div style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#1f2937'
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
                  color: '#1f2937',
                  marginBottom: '1rem'
                }}>
                  {selectedConcept.name}
                </h2>
                <p style={{
                  fontSize: '1.1rem',
                  color: '#4b5563',
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
                      backgroundColor: 'white',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      border: `2px solid ${selectedConcept.color}30`,
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
                        color: '#1f2937',
                        margin: 0
                      }}>
                        {detail.name}
                      </h3>
                    </div>
                    <p style={{
                      fontSize: '1rem',
                      color: '#4b5563',
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
                color: '#1f2937',
                marginBottom: '0.75rem'
              }}>
                {concept.name}
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: '#4b5563',
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
  )
}

export default Oracle
