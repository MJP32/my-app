import { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

function DatabaseOptimization({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
  const [selectedConcept, setSelectedConcept] = useState(null)

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()

        if (selectedConcept) {
          setSelectedConcept(null)
        } else {
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
      description: 'Techniques to improve SQL query performance and reduce execution time',
      details: [
        {
          name: 'SELECT Optimization',
          explanation: 'Select only needed columns, never use SELECT *. Avoid selecting computed columns when not needed. Use column aliases for clarity. Consider covering indexes for frequently selected column sets. Projection pushdown filters columns early in execution.'
        },
        {
          name: 'WHERE Clause Optimization',
          explanation: 'Use indexed columns in predicates. Avoid functions on indexed columns (prevents index usage). Use BETWEEN instead of >= AND <=. Prefer EXISTS over IN for subqueries. Use specific data types to avoid implicit conversions. Order conditions by selectivity.'
        },
        {
          name: 'JOIN Optimization',
          explanation: 'Join on indexed columns. Reduce result sets before joining with WHERE filters. Choose appropriate join types (INNER, LEFT, etc.). Consider join order for optimal performance. Use hash joins for large unsorted data. Nested loops for small result sets with indexes.'
        },
        {
          name: 'Subquery vs JOIN',
          explanation: 'Correlated subqueries execute once per row (slow). Uncorrelated subqueries execute once (faster). JOINs often outperform subqueries. EXISTS more efficient than IN for existence checks. Consider CTEs for readability without performance loss. Analyze execution plans to compare.'
        },
        {
          name: 'UNION Optimization',
          explanation: 'UNION ALL faster than UNION (no duplicate elimination). Use UNION only when duplicates need removal. Consider replacing with OR conditions when possible. Index columns used in ORDER BY after UNION. Ensure compatible data types across UNION branches.'
        },
        {
          name: 'Pagination Optimization',
          explanation: 'OFFSET/LIMIT slow for large offsets. Use keyset pagination (WHERE id > last_id). Index ORDER BY columns. Consider cursor-based pagination. Cache page counts separately. Limit maximum page depth for performance.'
        }
      ]
    },
    {
      id: 'indexing',
      name: 'Indexing Strategies',
      icon: '📑',
      color: '#10b981',
      description: 'Creating and managing indexes for optimal query performance',
      details: [
        {
          name: 'B-Tree Indexes',
          explanation: 'Default index type in most databases. Optimal for equality and range queries. Maintains sorted order for efficient lookups. Supports prefix matching for LIKE patterns. Column order matters in composite indexes. Balance between read speed and write overhead.'
        },
        {
          name: 'Composite Indexes',
          explanation: 'Multi-column indexes for complex queries. Leftmost prefix rule: index (a,b,c) supports queries on a, (a,b), or (a,b,c). Column order affects query coverage. Include highly selective columns first. Consider query patterns when designing. Avoid redundant single-column indexes.'
        },
        {
          name: 'Covering Indexes',
          explanation: 'Include all columns needed by query. Avoids table lookups (index-only scan). INCLUDE clause adds non-key columns. Trade storage for query speed. Monitor index size growth. Perfect for read-heavy workloads.'
        },
        {
          name: 'Partial/Filtered Indexes',
          explanation: 'Index subset of rows with WHERE clause. Smaller index size, faster maintenance. Ideal for queries on specific conditions. Example: index only active users. Reduces storage and improves write performance. Query must match filter condition to use index.'
        },
        {
          name: 'Hash Indexes',
          explanation: 'O(1) lookup for equality conditions only. No range query support. Memory-optimized tables in SQL Server. PostgreSQL hash indexes now WAL-logged. Consider for exact match heavy workloads. Limited use cases compared to B-tree.'
        },
        {
          name: 'Index Maintenance',
          explanation: 'Regular REINDEX reduces fragmentation. ANALYZE updates statistics for query planner. Monitor index usage with system views. Drop unused indexes to improve writes. Online index rebuilds minimize downtime. Schedule maintenance during low activity.'
        }
      ]
    },
    {
      id: 'execution-plans',
      name: 'Execution Plans',
      icon: '🗺️',
      color: '#f59e0b',
      description: 'Understanding and analyzing query execution plans',
      details: [
        {
          name: 'Reading Execution Plans',
          explanation: 'EXPLAIN shows planned execution strategy. EXPLAIN ANALYZE includes actual runtime statistics. Read from innermost to outermost operations. Cost estimates help compare alternatives. Row estimates indicate selectivity accuracy. Execution time reveals actual bottlenecks.'
        },
        {
          name: 'Scan Operations',
          explanation: 'Sequential Scan: reads entire table (avoid for large tables). Index Scan: uses index then fetches rows. Index Only Scan: all data from index (ideal). Bitmap Scan: combines multiple indexes. Identify unexpected full scans as optimization targets.'
        },
        {
          name: 'Join Algorithms',
          explanation: 'Nested Loop: good for small result sets with indexes. Hash Join: efficient for large unsorted data. Merge Join: optimal for pre-sorted data. Sort Merge: sorts then merges. Query planner chooses based on statistics. Poor joins often indicate missing indexes.'
        },
        {
          name: 'Sort Operations',
          explanation: 'External sort uses disk (slow). In-memory sort much faster. Create indexes to avoid runtime sorts. ORDER BY on indexed columns efficient. Reduce result set before sorting. Consider removing unnecessary ORDER BY.'
        },
        {
          name: 'Estimated vs Actual Rows',
          explanation: 'Large differences indicate stale statistics. Run ANALYZE to update statistics. Poor estimates cause suboptimal plans. Histograms improve distribution estimates. Extended statistics for correlated columns. Regular maintenance prevents plan degradation.'
        },
        {
          name: 'Plan Caching',
          explanation: 'Compiled plans reused for performance. Parameter sniffing can cause issues. RECOMPILE hint forces new plan. Plan cache bloat from ad-hoc queries. Parameterized queries improve caching. Monitor plan cache hit ratios.'
        }
      ]
    },
    {
      id: 'performance-tuning',
      name: 'Performance Tuning',
      icon: '🔧',
      color: '#ef4444',
      description: 'Database configuration and server-level optimizations',
      details: [
        {
          name: 'Memory Configuration',
          explanation: 'Buffer pool/shared buffers for caching data pages. Sort memory for in-memory operations. Hash memory for hash joins. Work mem per-operation allocation. Avoid memory pressure and swapping. Monitor hit ratios and adjust accordingly.'
        },
        {
          name: 'Connection Pooling',
          explanation: 'Reduce connection overhead with pooling. PgBouncer, HikariCP, connection pool settings. Transaction vs session pooling modes. Size pool based on expected concurrency. Monitor connection wait times. Avoid connection leaks in application.'
        },
        {
          name: 'Parallel Query',
          explanation: 'Utilize multiple CPU cores for queries. Configure max parallel workers. Parallel-safe functions required. Parallel scans for large tables. Aggregate operations parallelizable. Monitor CPU usage during parallel execution.'
        },
        {
          name: 'I/O Optimization',
          explanation: 'SSD storage dramatically improves I/O. Separate data and log files. RAID configuration for redundancy and speed. Sequential vs random I/O patterns. Reduce unnecessary I/O with better queries. Monitor disk queue lengths.'
        },
        {
          name: 'Lock Contention',
          explanation: 'Identify blocking and blocked sessions. Reduce transaction duration. Use appropriate isolation levels. Avoid lock escalation with smaller batches. Deadlock detection and resolution. Consider optimistic concurrency patterns.'
        },
        {
          name: 'Temp Table Usage',
          explanation: 'tempdb/temp tablespace sizing. Minimize temp table operations. Use CTEs instead when possible. Index temp tables for repeated access. Clean up temp tables promptly. Monitor temp space usage.'
        }
      ]
    },
    {
      id: 'profiling',
      name: 'Profiling & Monitoring',
      icon: '📊',
      color: '#8b5cf6',
      description: 'Tools and techniques for identifying performance bottlenecks',
      details: [
        {
          name: 'Slow Query Log',
          explanation: 'Enable slow query logging with threshold. Analyze patterns in slow queries. Identify candidates for optimization. Log execution plans for slow queries. Regularly review and address. Set appropriate thresholds for your SLA.'
        },
        {
          name: 'Query Statistics',
          explanation: 'pg_stat_statements for PostgreSQL. Query Store for SQL Server. Track execution counts and times. Identify top resource consumers. Compare before/after optimization. Reset statistics after major changes.'
        },
        {
          name: 'Wait Statistics',
          explanation: 'Identify what queries wait for. CPU, I/O, lock, network waits. sys.dm_os_wait_stats in SQL Server. pg_stat_activity in PostgreSQL. Target highest wait types. Correlate waits with specific queries.'
        },
        {
          name: 'Index Usage Statistics',
          explanation: 'Track index scans vs sequential scans. Identify unused indexes for removal. Find missing index recommendations. Monitor index maintenance overhead. Balance read improvement vs write cost. Regular index usage reviews.'
        },
        {
          name: 'Resource Monitoring',
          explanation: 'CPU, memory, disk, network utilization. Baseline normal performance. Alert on anomalies. Correlate with query activity. Capacity planning based on trends. Tools: Grafana, Datadog, cloud monitoring.'
        },
        {
          name: 'Baseline Comparison',
          explanation: 'Establish performance baselines. Compare after changes. Detect regression early. Document optimization history. A/B testing for major changes. Rollback plan for degradations.'
        }
      ]
    },
    {
      id: 'data-modeling',
      name: 'Data Modeling for Performance',
      icon: '🏗️',
      color: '#06b6d4',
      description: 'Designing database schemas optimized for query performance',
      details: [
        {
          name: 'Normalization Trade-offs',
          explanation: 'Normalized: reduces redundancy, more joins. Denormalized: faster reads, update anomalies. Choose based on read/write ratio. OLTP typically more normalized. OLAP often denormalized. Hybrid approaches common.'
        },
        {
          name: 'Partitioning',
          explanation: 'Range partitioning by date/value ranges. List partitioning for discrete values. Hash partitioning for even distribution. Partition pruning eliminates unnecessary scans. Maintenance per partition. Consider partition-wise joins.'
        },
        {
          name: 'Vertical Partitioning',
          explanation: 'Split wide tables into narrow ones. Separate frequently accessed columns. Reduce I/O for specific queries. Join back when all columns needed. Consider column-store for analytics. Balance normalization with performance.'
        },
        {
          name: 'Materialized Views',
          explanation: 'Pre-computed query results. Refresh strategies: on-demand, scheduled, incremental. Trade storage for query speed. Perfect for complex aggregations. Monitor staleness. Index materialized views.'
        },
        {
          name: 'Data Types',
          explanation: 'Use smallest appropriate type. INT vs BIGINT based on range. VARCHAR sizing impacts storage. Avoid implicit type conversions. Fixed vs variable length trade-offs. Consider compression-friendly types.'
        },
        {
          name: 'Denormalization Patterns',
          explanation: 'Summary tables for aggregations. Duplicate columns to avoid joins. Calculated columns stored. JSON for flexible attributes. Trade consistency for speed. Maintain with triggers or ETL.'
        }
      ]
    },
    {
      id: 'write-optimization',
      name: 'Write Optimization',
      icon: '✍️',
      color: '#ec4899',
      description: 'Optimizing INSERT, UPDATE, and DELETE operations',
      details: [
        {
          name: 'Batch Operations',
          explanation: 'Multi-row INSERT reduces overhead. Batch size 1000-10000 rows typical. Use COPY/BULK INSERT for large loads. Disable indexes during bulk load. Reduce transaction log overhead. Parallel loading for maximum throughput.'
        },
        {
          name: 'UPSERT Patterns',
          explanation: 'INSERT ON CONFLICT (PostgreSQL). MERGE statement (SQL Server, Oracle). Avoid check-then-insert race conditions. Single statement atomic operation. Use with appropriate conflict target. Consider performance vs separate statements.'
        },
        {
          name: 'Minimal Logging',
          explanation: 'Bulk-logged recovery model for loads. UNLOGGED tables for temp data. Reduce WAL generation. Faster but less durable. Use for recoverable data only. Re-enable logging after bulk operations.'
        },
        {
          name: 'Index Impact on Writes',
          explanation: 'Each index slows INSERT/UPDATE. Drop indexes during bulk loads. Consider filtered indexes for writes. Balance read vs write performance. Defer index creation after loads. Monitor index maintenance time.'
        },
        {
          name: 'Delete Strategies',
          explanation: 'Batch deletes to avoid lock escalation. Use TRUNCATE for full table clear. Soft delete with status column. Partition and drop for time-series. Archive before delete. Consider cascade impact.'
        },
        {
          name: 'Constraint Deferral',
          explanation: 'Defer constraint checking to commit. Enables circular references. Faster bulk loads. SET CONSTRAINTS DEFERRED. Validate at transaction end. Use with caution for data integrity.'
        }
      ]
    },
    {
      id: 'caching',
      name: 'Database Caching',
      icon: '💾',
      color: '#14b8a6',
      description: 'Caching strategies to reduce database load',
      details: [
        {
          name: 'Query Result Caching',
          explanation: 'Cache frequently accessed query results. Redis/Memcached for distributed caching. Cache invalidation strategies critical. TTL-based expiration simple but imprecise. Event-driven invalidation more accurate. Consider cache warming on startup.'
        },
        {
          name: 'Application-Level Caching',
          explanation: 'ORM caching (Hibernate L2 cache). Request-scoped caching. Read-through/write-through patterns. Cache-aside pattern for flexibility. Consider cache coherence. Monitor cache hit ratios.'
        },
        {
          name: 'Buffer Pool Optimization',
          explanation: 'Increase buffer pool for hot data. Monitor hit ratio (target >95%). Identify pages causing cache misses. Consider multiple buffer pools. Pin critical tables in memory. Avoid cache pollution from full scans.'
        },
        {
          name: 'Connection Caching',
          explanation: 'Prepared statement caching. Plan cache utilization. Connection pool statement cache. Reduce parsing overhead. Monitor cache sizes. Clear cache when plans go stale.'
        },
        {
          name: 'CDN for Static Data',
          explanation: 'Cache static/infrequently changing data. Edge caching reduces latency. Perfect for read-heavy lookup data. Invalidation via versioning or purge. Combine with database caching. Consider data freshness requirements.'
        },
        {
          name: 'Cache Invalidation',
          explanation: 'Time-based: simple but may serve stale data. Event-based: accurate but complex. Version-based: append version to cache key. Write-through: update cache on write. Invalidation cascading for related data. Test invalidation thoroughly.'
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
      background: 'linear-gradient(to bottom right, #111827, #065f46, #111827)',
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
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
          >
            ← Back to Databases
          </button>
          <div>
            <h1 style={{
              margin: 0,
              fontSize: '2rem',
              fontWeight: '800',
              background: 'linear-gradient(to right, #6ee7b7, #34d399)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Database Optimization
            </h1>
            {currentSubcategory && (
              <span style={{
                padding: '0.25rem 0.75rem',
                fontSize: '0.85rem',
                fontWeight: '600',
                backgroundColor: '#065f46',
                color: '#6ee7b7',
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
                ← Back to Categories
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

export default DatabaseOptimization
