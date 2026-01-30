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

// Query Optimization Diagram
const QueryOptDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Query Optimization Techniques</text>
    <rect x="50" y="50" width="140" height="60" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="120" y="72" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">SELECT</text>
    <text x="120" y="90" textAnchor="middle" fill="#93c5fd" fontSize="7">Only needed cols</text>
    <rect x="210" y="50" width="140" height="60" rx="6" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" strokeWidth="2"/>
    <text x="280" y="72" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">WHERE</text>
    <text x="280" y="90" textAnchor="middle" fill="#86efac" fontSize="7">Indexed columns</text>
    <rect x="370" y="50" width="140" height="60" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="440" y="72" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">JOIN</text>
    <text x="440" y="90" textAnchor="middle" fill="#fcd34d" fontSize="7">Proper order</text>
    <rect x="530" y="50" width="120" height="60" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="590" y="72" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">INDEX</text>
    <text x="590" y="90" textAnchor="middle" fill="#c4b5fd" fontSize="7">Covering</text>
    <text x="350" y="135" textAnchor="middle" fill="#64748b" fontSize="9">Avoid SELECT * • Use EXISTS over IN • Prefer JOINs over subqueries</text>
  </svg>
)

// Indexing Strategies Diagram
const IndexingDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">{`Index Types & Usage`}</text>
    <rect x="50" y="45" width="150" height="55" rx="6" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" strokeWidth="2"/>
    <text x="125" y="67" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">B-Tree</text>
    <text x="125" y="85" textAnchor="middle" fill="#86efac" fontSize="7">{`Range & equality`}</text>
    <rect x="220" y="45" width="150" height="55" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="295" y="67" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Composite</text>
    <text x="295" y="85" textAnchor="middle" fill="#93c5fd" fontSize="7">Multi-column</text>
    <rect x="390" y="45" width="150" height="55" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="465" y="67" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Covering</text>
    <text x="465" y="85" textAnchor="middle" fill="#c4b5fd" fontSize="7">Index-only scan</text>
    <rect x="560" y="45" width="100" height="55" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="610" y="67" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Partial</text>
    <text x="610" y="85" textAnchor="middle" fill="#fcd34d" fontSize="7">Filtered</text>
    <rect x="150" y="115" width="400" height="45" rx="6" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" strokeWidth="1"/>
    <text x="350" y="135" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">Leftmost Prefix Rule</text>
    <text x="350" y="152" textAnchor="middle" fill="#fca5a5" fontSize="8">Index (a,b,c) works for queries on a, (a,b), or (a,b,c)</text>
    <text x="350" y="175" textAnchor="middle" fill="#64748b" fontSize="9">Balance read speed vs write overhead • Monitor index usage</text>
  </svg>
)

// Execution Plans Diagram
const ExecPlansDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Execution Plan Analysis</text>
    <rect x="50" y="55" width="120" height="50" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="110" y="85" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">EXPLAIN</text>
    <rect x="200" y="55" width="140" height="50" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="270" y="78" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Plan Operations</text>
    <text x="270" y="95" textAnchor="middle" fill="#93c5fd" fontSize="7">Scan/Seek/Join</text>
    <rect x="370" y="55" width="140" height="50" rx="6" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" strokeWidth="2"/>
    <text x="440" y="78" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Cost Metrics</text>
    <text x="440" y="95" textAnchor="middle" fill="#86efac" fontSize="7">Rows • I/O • CPU</text>
    <rect x="540" y="55" width="120" height="50" rx="6" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <text x="600" y="78" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">Bottlenecks</text>
    <text x="600" y="95" textAnchor="middle" fill="#fca5a5" fontSize="7">Full scans</text>
    <line x1="170" y1="80" x2="195" y2="80" stroke="#4ade80" strokeWidth="2"/>
    <line x1="340" y1="80" x2="365" y2="80" stroke="#4ade80" strokeWidth="2"/>
    <line x1="510" y1="80" x2="535" y2="80" stroke="#4ade80" strokeWidth="2"/>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">{`Index Seek > Index Scan > Table Scan • Compare estimated vs actual rows`}</text>
  </svg>
)

// Performance Tuning Diagram
const PerfTuningDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Performance Tuning Cycle</text>
    <rect x="100" y="50" width="120" height="50" rx="6" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <text x="160" y="80" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">Identify</text>
    <rect x="250" y="50" width="120" height="50" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="310" y="80" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Analyze</text>
    <rect x="400" y="50" width="120" height="50" rx="6" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" strokeWidth="2"/>
    <text x="460" y="80" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Optimize</text>
    <rect x="550" y="50" width="100" height="50" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="600" y="80" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Monitor</text>
    <line x1="220" y1="75" x2="245" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="370" y1="75" x2="395" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="520" y1="75" x2="545" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <path d="M 600 100 Q 600 130 350 130 Q 100 130 100 100" stroke="#64748b" strokeWidth="1" fill="none" strokeDasharray="4"/>
    <text x="350" y="150" textAnchor="middle" fill="#64748b" fontSize="9">Slow query logs • Statistics updates • Index analysis • Connection pooling</text>
  </svg>
)

// Profiling Diagram
const ProfilingDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Database Profiling Tools</text>
    <rect x="50" y="50" width="180" height="70" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="140" y="72" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Query Profiler</text>
    <text x="140" y="90" textAnchor="middle" fill="#c4b5fd" fontSize="7">Execution time</text>
    <text x="140" y="105" textAnchor="middle" fill="#c4b5fd" fontSize="7">Resource usage</text>
    <rect x="260" y="50" width="180" height="70" rx="6" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" strokeWidth="2"/>
    <text x="350" y="72" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Wait Statistics</text>
    <text x="350" y="90" textAnchor="middle" fill="#86efac" fontSize="7">Lock waits</text>
    <text x="350" y="105" textAnchor="middle" fill="#86efac" fontSize="7">I/O bottlenecks</text>
    <rect x="470" y="50" width="180" height="70" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="560" y="72" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">System Views</text>
    <text x="560" y="90" textAnchor="middle" fill="#fcd34d" fontSize="7">pg_stat / sys.dm_</text>
    <text x="560" y="105" textAnchor="middle" fill="#fcd34d" fontSize="7">Real-time metrics</text>
    <text x="350" y="145" textAnchor="middle" fill="#64748b" fontSize="9">{`Baseline → Identify anomalies → Root cause analysis → Fix & verify`}</text>
  </svg>
)

// Data Modeling Diagram
const DataModelingDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Data Modeling for Performance</text>
    <rect x="50" y="50" width="180" height="60" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="140" y="75" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Normalization</text>
    <text x="140" y="93" textAnchor="middle" fill="#93c5fd" fontSize="7">Reduce redundancy</text>
    <rect x="260" y="50" width="180" height="60" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="350" y="75" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Denormalization</text>
    <text x="350" y="93" textAnchor="middle" fill="#fcd34d" fontSize="7">Read performance</text>
    <rect x="470" y="50" width="180" height="60" rx="6" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" strokeWidth="2"/>
    <text x="560" y="75" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Partitioning</text>
    <text x="560" y="93" textAnchor="middle" fill="#86efac" fontSize="7">Large table mgmt</text>
    <text x="350" y="135" textAnchor="middle" fill="#64748b" fontSize="9">Balance integrity vs performance • Choose based on workload patterns</text>
  </svg>
)

// Write Optimization Diagram
const WriteOptDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Write Optimization</text>
    <rect x="50" y="50" width="140" height="60" rx="6" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <text x="120" y="75" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">Batch Inserts</text>
    <text x="120" y="93" textAnchor="middle" fill="#fca5a5" fontSize="7">Multi-row VALUES</text>
    <rect x="210" y="50" width="140" height="60" rx="6" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" strokeWidth="2"/>
    <text x="280" y="75" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Bulk Load</text>
    <text x="280" y="93" textAnchor="middle" fill="#86efac" fontSize="7">COPY / BULK INSERT</text>
    <rect x="370" y="50" width="140" height="60" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="440" y="75" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Index Mgmt</text>
    <text x="440" y="93" textAnchor="middle" fill="#c4b5fd" fontSize="7">Disable during load</text>
    <rect x="530" y="50" width="120" height="60" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="590" y="75" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Tx Batching</text>
    <text x="590" y="93" textAnchor="middle" fill="#fcd34d" fontSize="7">Commit groups</text>
    <text x="350" y="135" textAnchor="middle" fill="#64748b" fontSize="9">UPSERT/MERGE • Minimize index updates • Use appropriate isolation levels</text>
  </svg>
)

// Caching Diagram
const CachingOptDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Database Caching Layers</text>
    <rect x="50" y="50" width="140" height="60" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="120" y="75" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Buffer Pool</text>
    <text x="120" y="93" textAnchor="middle" fill="#93c5fd" fontSize="7">Data pages</text>
    <rect x="210" y="50" width="140" height="60" rx="6" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" strokeWidth="2"/>
    <text x="280" y="75" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Query Cache</text>
    <text x="280" y="93" textAnchor="middle" fill="#86efac" fontSize="7">Result sets</text>
    <rect x="370" y="50" width="140" height="60" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="440" y="75" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Plan Cache</text>
    <text x="440" y="93" textAnchor="middle" fill="#fcd34d" fontSize="7">Execution plans</text>
    <rect x="530" y="50" width="120" height="60" rx="6" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <text x="590" y="75" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">App Cache</text>
    <text x="590" y="93" textAnchor="middle" fill="#fca5a5" fontSize="7">Redis/Memcached</text>
    <text x="350" y="135" textAnchor="middle" fill="#64748b" fontSize="9">Memory sizing • Cache hit ratios • Invalidation strategies • TTL management</text>
  </svg>
)

function DatabaseOptimization({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'query-optimization',
      name: 'Query Optimization',
      icon: '⚡',
      color: '#3b82f6',
      description: 'Techniques to improve SQL query performance and reduce execution time',
      diagram: QueryOptDiagram,
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
      diagram: IndexingDiagram,
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
      diagram: ExecPlansDiagram,
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
      diagram: PerfTuningDiagram,
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
      diagram: ProfilingDiagram,
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
      diagram: DataModelingDiagram,
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
      diagram: WriteOptDiagram,
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
      diagram: CachingOptDiagram,
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
      stack.push({ name: 'Database Optimization', icon: '⚡', onClick: () => { setSelectedConceptIndex(null); setSelectedDetailIndex(0) } })
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    } else {
      stack.push({ name: 'Database Optimization', icon: '⚡' })
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
          <h1 style={titleStyle}>Database Optimization</h1>
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
          onMainMenu={breadcrumb?.onMainMenu}
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
              width: '95vw', maxWidth: '1400px', height: '90vh',
              overflow: 'auto',
              border: `1px solid ${selectedConcept.color}40`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Breadcrumb */}
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
              onMainMenu={breadcrumb?.onMainMenu}
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
              const DiagramComponent = detail.diagram || selectedConcept.diagram
              return (
                <div>
                  <h3 style={{ color: '#e2e8f0', marginBottom: '0.75rem', fontSize: '1.1rem' }}>{detail.name}</h3>
                  {DiagramComponent && (
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                      <DiagramComponent />
                    </div>
                  )}
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

export default DatabaseOptimization
