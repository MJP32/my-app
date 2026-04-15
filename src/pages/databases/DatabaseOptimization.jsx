import { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'
import useVoiceConceptNavigation from '../../hooks/useVoiceConceptNavigation'

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

// SQL-oriented syntax highlighter
const SyntaxHighlighter = ({ code }) => {
  const highlightCode = (code) => {
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    const protectedContent = []
    let placeholder = 0

    highlighted = highlighted.replace(/(--.*$|\/\*[\s\S]*?\*\/)/gm, (match) => {
      const id = `___COMMENT_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #6a9955; font-style: italic;">${match}</span>` })
      return id
    })

    highlighted = highlighted.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, (match) => {
      const id = `___STRING_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #ce9178;">${match}</span>` })
      return id
    })

    highlighted = highlighted
      .replace(/\b(SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|OUTER|ON|AND|OR|NOT|IN|EXISTS|BETWEEN|LIKE|IS|NULL|AS|ORDER|BY|GROUP|HAVING|LIMIT|OFFSET|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|ALTER|DROP|INDEX|PRIMARY|KEY|FOREIGN|REFERENCES|UNIQUE|CONSTRAINT|DEFAULT|CHECK|CASCADE|DISTINCT|UNION|ALL|CASE|WHEN|THEN|ELSE|END|WITH|OVER|PARTITION|ROW_NUMBER|RANK|DENSE_RANK|COUNT|SUM|AVG|MIN|MAX|EXPLAIN|ANALYZE|VACUUM|USING|HASH|BTREE|GIN|GIST|BRIN|CONCURRENTLY|REINDEX|CLUSTER|TABLESPACE|MATERIALIZED|VIEW|REFRESH|PARALLEL|SEQUENTIAL|BITMAP|NESTED|MERGE|FULL|SCAN|COST|ROWS|WIDTH|BUFFERS|TIMING|FORMAT|VERBOSE|SETTINGS|TEMP|TEMPORARY|UNLOGGED|GENERATED|ALWAYS|IDENTITY|STORED|INCLUDE|FILLFACTOR|AUTOVACUUM|TOAST|CACHE|CYCLE|OWNED|NONE|REPLICA)\b/gi, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(INT|INTEGER|BIGINT|SMALLINT|SERIAL|VARCHAR|CHAR|TEXT|BOOLEAN|DATE|TIMESTAMP|NUMERIC|DECIMAL|FLOAT|DOUBLE|REAL|JSON|JSONB|UUID|ARRAY|BYTEA|MONEY|INTERVAL)\b/gi, '<span style="color: #4ec9b0;">$1</span>')
      .replace(/\b(\d+\.?\d*)\b/g, '<span style="color: #b5cea8;">$1</span>')

    protectedContent.forEach(({ id, replacement }) => {
      highlighted = highlighted.replace(id, replacement)
    })

    return highlighted
  }

  return (
    <pre style={{
      margin: 0,
      fontFamily: '"Consolas", "Monaco", "Courier New", monospace',
      fontSize: '0.85rem',
      lineHeight: '1.6',
      color: '#d4d4d4',
      whiteSpace: 'pre',
      overflowX: 'auto',
      textAlign: 'left',
      padding: 0
    }}>
      <code dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
    </pre>
  )
}

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
          explanation: 'Select only needed columns, never use SELECT *. Avoid selecting computed columns when not needed. Use column aliases for clarity. Consider covering indexes for frequently selected column sets. Projection pushdown filters columns early in execution.',
          codeExample: `-- BAD: SELECT * fetches all columns
SELECT * FROM orders WHERE status = 'PENDING';

-- GOOD: Select only needed columns
SELECT order_id, customer_id, total_amount
FROM orders
WHERE status = 'PENDING';

-- GOOD: Use aliases and avoid computed cols
SELECT o.order_id,
       c.name AS customer_name,
       o.total_amount
FROM orders o
JOIN customers c ON o.customer_id = c.id
WHERE o.status = 'PENDING';`
        },
        {
          name: 'WHERE Clause Optimization',
          explanation: 'Use indexed columns in predicates. Avoid functions on indexed columns (prevents index usage). Use BETWEEN instead of >= AND <=. Prefer EXISTS over IN for subqueries. Use specific data types to avoid implicit conversions. Order conditions by selectivity.',
          codeExample: `-- BAD: Function on indexed column prevents index use
SELECT * FROM orders
WHERE YEAR(created_at) = 2024;

-- GOOD: Use range to preserve index usage
SELECT * FROM orders
WHERE created_at >= '2024-01-01'
  AND created_at < '2025-01-01';

-- GOOD: EXISTS instead of IN for large sets
SELECT * FROM customers c
WHERE EXISTS (
    SELECT 1 FROM orders o
    WHERE o.customer_id = c.id
      AND o.total_amount > 1000
);`
        },
        {
          name: 'JOIN Optimization',
          explanation: 'Join on indexed columns. Reduce result sets before joining with WHERE filters. Choose appropriate join types (INNER, LEFT, etc.). Consider join order for optimal performance. Use hash joins for large unsorted data. Nested loops for small result sets with indexes.',
          codeExample: `-- BAD: Joining without filtering first
SELECT o.*, p.name
FROM orders o
JOIN products p ON o.product_id = p.id
JOIN customers c ON o.customer_id = c.id;

-- GOOD: Filter early, join on indexed columns
SELECT o.order_id, p.name, o.total_amount
FROM orders o
JOIN products p ON o.product_id = p.id
WHERE o.status = 'SHIPPED'
  AND o.created_at > CURRENT_DATE - INTERVAL '30 days';

-- Ensure join columns are indexed
CREATE INDEX idx_orders_product_id
  ON orders(product_id);`
        },
        {
          name: 'Subquery vs JOIN',
          explanation: 'Correlated subqueries execute once per row (slow). Uncorrelated subqueries execute once (faster). JOINs often outperform subqueries. EXISTS more efficient than IN for existence checks. Consider CTEs for readability without performance loss. Analyze execution plans to compare.',
          codeExample: `-- BAD: Correlated subquery (runs per row)
SELECT name, (
    SELECT COUNT(*) FROM orders o
    WHERE o.customer_id = c.id
) AS order_count
FROM customers c;

-- GOOD: Rewrite as JOIN with aggregation
SELECT c.name, COUNT(o.id) AS order_count
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
GROUP BY c.name;

-- GOOD: CTE for complex logic
WITH monthly_totals AS (
    SELECT customer_id, SUM(amount) AS total
    FROM orders
    WHERE created_at >= '2024-01-01'
    GROUP BY customer_id
)
SELECT c.name, mt.total
FROM customers c
JOIN monthly_totals mt ON c.id = mt.customer_id;`
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
          explanation: 'Default index type in most databases. Optimal for equality and range queries. Maintains sorted order for efficient lookups. Supports prefix matching for LIKE patterns. Column order matters in composite indexes. Balance between read speed and write overhead.',
          codeExample: `-- Standard B-Tree index for equality lookups
CREATE INDEX idx_users_email
  ON users(email);

-- B-Tree supports range queries efficiently
SELECT * FROM orders
WHERE created_at BETWEEN '2024-01-01' AND '2024-12-31';

-- Verify index is being used
EXPLAIN ANALYZE
SELECT * FROM users WHERE email = 'alice@example.com';
-- Expected: Index Scan using idx_users_email
-- Cost: 0.29..8.31  rows=1  actual time=0.02..0.03

-- LIKE prefix matching works with B-Tree
SELECT * FROM products WHERE name LIKE 'Widget%';
-- Uses index! But 'Widget%' only, NOT '%Widget'`
        },
        {
          name: 'Composite Indexes',
          explanation: 'Multi-column indexes for complex queries. Leftmost prefix rule: index (a,b,c) supports queries on a, (a,b), or (a,b,c). Column order affects query coverage. Include highly selective columns first. Consider query patterns when designing. Avoid redundant single-column indexes.',
          codeExample: `-- Composite index: column order matters!
CREATE INDEX idx_orders_status_date
  ON orders(status, created_at);

-- USES index (leftmost prefix match)
SELECT * FROM orders WHERE status = 'PENDING';
SELECT * FROM orders
  WHERE status = 'PENDING' AND created_at > '2024-01-01';

-- DOES NOT use index (skips leftmost column)
SELECT * FROM orders WHERE created_at > '2024-01-01';

-- Verify with EXPLAIN
EXPLAIN ANALYZE
SELECT * FROM orders
WHERE status = 'SHIPPED'
  AND created_at > CURRENT_DATE - INTERVAL '7 days';`
        },
        {
          name: 'Covering Indexes',
          explanation: 'Include all columns needed by query. Avoids table lookups (index-only scan). INCLUDE clause adds non-key columns. Trade storage for query speed. Monitor index size growth. Perfect for read-heavy workloads.',
          codeExample: `-- Covering index: all queried columns in the index
CREATE INDEX idx_orders_covering
  ON orders(status, created_at)
  INCLUDE (customer_id, total_amount);

-- This query uses index-only scan (no table lookup)
EXPLAIN ANALYZE
SELECT customer_id, total_amount
FROM orders
WHERE status = 'SHIPPED'
  AND created_at > '2024-06-01';
-- Expected: Index Only Scan
-- Much faster than Index Scan + heap fetch

-- Check for index-only scan opportunities
SELECT schemaname, relname, idx_scan, idx_tup_fetch
FROM pg_stat_user_indexes
WHERE idx_scan > 0
ORDER BY idx_tup_fetch DESC;`
        },
        {
          name: 'Partial/Filtered Indexes',
          explanation: 'Index subset of rows with WHERE clause. Smaller index size, faster maintenance. Ideal for queries on specific conditions. Example: index only active users. Reduces storage and improves write performance. Query must match filter condition to use index.',
          codeExample: `-- Partial index: only index active orders
CREATE INDEX idx_orders_pending
  ON orders(created_at)
  WHERE status = 'PENDING';

-- Much smaller than indexing all rows
-- Only useful for queries matching the WHERE clause
SELECT * FROM orders
WHERE status = 'PENDING'
  AND created_at > '2024-06-01';

-- Partial unique index: enforce uniqueness conditionally
CREATE UNIQUE INDEX idx_users_active_email
  ON users(email)
  WHERE is_deleted = false;

-- Compare index sizes
SELECT pg_size_pretty(pg_relation_size('idx_orders_pending'))
  AS partial_size;`
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
          explanation: 'EXPLAIN shows planned execution strategy. EXPLAIN ANALYZE includes actual runtime statistics. Read from innermost to outermost operations. Cost estimates help compare alternatives. Row estimates indicate selectivity accuracy. Execution time reveals actual bottlenecks.',
          codeExample: `-- Basic EXPLAIN: shows planned strategy
EXPLAIN
SELECT * FROM orders WHERE customer_id = 42;

-- EXPLAIN ANALYZE: includes actual execution stats
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT o.id, c.name, o.total_amount
FROM orders o
JOIN customers c ON o.customer_id = c.id
WHERE o.status = 'PENDING';
-- Output:
-- Hash Join (cost=10.5..85.2 rows=12 width=48)
--           (actual time=0.3..1.2 rows=15 loops=1)
--   Buffers: shared hit=24
--   -> Seq Scan on orders (actual time=0.01..0.5)
--   -> Hash (actual time=0.2..0.2)
--     -> Seq Scan on customers`
        },
        {
          name: 'Scan Operations',
          explanation: 'Sequential Scan: reads entire table (avoid for large tables). Index Scan: uses index then fetches rows. Index Only Scan: all data from index (ideal). Bitmap Scan: combines multiple indexes. Identify unexpected full scans as optimization targets.',
          codeExample: `-- Sequential Scan (full table read - often slow)
EXPLAIN ANALYZE
SELECT * FROM orders WHERE notes LIKE '%urgent%';
-- Seq Scan on orders  cost=0..15420  rows=500

-- Index Scan (uses index + fetches from table)
EXPLAIN ANALYZE
SELECT * FROM orders WHERE customer_id = 42;
-- Index Scan using idx_orders_customer_id
--   cost=0.29..8.31  rows=5

-- Index Only Scan (best: no table access)
EXPLAIN ANALYZE
SELECT customer_id, total_amount FROM orders
WHERE customer_id = 42;
-- Index Only Scan using idx_orders_covering

-- Force index use for testing
SET enable_seqscan = off;
EXPLAIN ANALYZE SELECT * FROM orders WHERE status = 'NEW';
SET enable_seqscan = on;`
        },
        {
          name: 'Join Algorithms',
          explanation: 'Nested Loop: good for small result sets with indexes. Hash Join: efficient for large unsorted data. Merge Join: optimal for pre-sorted data. Sort Merge: sorts then merges. Query planner chooses based on statistics. Poor joins often indicate missing indexes.',
          codeExample: `-- Nested Loop Join (small result + indexed lookup)
EXPLAIN ANALYZE
SELECT o.id, c.name
FROM orders o
JOIN customers c ON o.customer_id = c.id
WHERE o.id = 42;
-- Nested Loop (actual time=0.02..0.04 rows=1)
--   -> Index Scan on orders (rows=1)
--   -> Index Scan on customers (rows=1)

-- Hash Join (larger datasets, no useful index)
EXPLAIN ANALYZE
SELECT c.name, COUNT(o.id)
FROM customers c
JOIN orders o ON o.customer_id = c.id
GROUP BY c.name;
-- HashAggregate
--   -> Hash Join (actual time=5.2..28.4 rows=9500)
--     -> Seq Scan on orders
--     -> Hash -> Seq Scan on customers`
        },
        {
          name: 'Sort Operations',
          explanation: 'External sort uses disk (slow). In-memory sort much faster. Create indexes to avoid runtime sorts. ORDER BY on indexed columns efficient. Reduce result set before sorting. Consider removing unnecessary ORDER BY.',
          codeExample: `-- BAD: Sort requires extra work on large result set
EXPLAIN ANALYZE
SELECT * FROM orders ORDER BY created_at DESC;
-- Sort (cost=18500..18750)
-- Sort Method: external merge  Disk: 45000kB

-- GOOD: Index eliminates the sort operation
CREATE INDEX idx_orders_created_desc
  ON orders(created_at DESC);

EXPLAIN ANALYZE
SELECT * FROM orders ORDER BY created_at DESC
LIMIT 20;
-- Index Scan Backward using idx_orders_created_desc
-- No sort needed! Direct index traversal

-- Check work_mem for in-memory sorts
SHOW work_mem;  -- default 4MB
SET work_mem = '64MB';  -- increase for session`
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
          explanation: 'Buffer pool/shared buffers for caching data pages. Sort memory for in-memory operations. Hash memory for hash joins. Work mem per-operation allocation. Avoid memory pressure and swapping. Monitor hit ratios and adjust accordingly.',
          codeExample: `-- PostgreSQL: Check and tune memory settings
SHOW shared_buffers;    -- Data page cache (25% of RAM)
SHOW work_mem;          -- Per-operation sort/hash memory
SHOW effective_cache_size;  -- OS cache estimate

-- Check buffer cache hit ratio (target > 95%)
SELECT
  sum(heap_blks_hit) * 100.0 /
    nullif(sum(heap_blks_hit) + sum(heap_blks_read), 0)
    AS cache_hit_ratio
FROM pg_statio_user_tables;

-- Tune in postgresql.conf
-- shared_buffers = '4GB'
-- work_mem = '64MB'
-- maintenance_work_mem = '512MB'
-- effective_cache_size = '12GB'`
        },
        {
          name: 'Connection Pooling',
          explanation: 'Reduce connection overhead with pooling. PgBouncer, HikariCP, connection pool settings. Transaction vs session pooling modes. Size pool based on expected concurrency. Monitor connection wait times. Avoid connection leaks in application.',
          codeExample: `-- Check current connections
SELECT count(*) AS total_connections,
       state,
       usename
FROM pg_stat_activity
GROUP BY state, usename;

-- Monitor connection limits
SHOW max_connections;  -- default 100

-- Find long-running idle connections
SELECT pid, now() - state_change AS idle_time,
       query, usename
FROM pg_stat_activity
WHERE state = 'idle'
  AND now() - state_change > INTERVAL '5 minutes'
ORDER BY idle_time DESC;

-- Terminate idle connections
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE state = 'idle'
  AND now() - state_change > INTERVAL '30 minutes';`
        },
        {
          name: 'Parallel Query',
          explanation: 'Utilize multiple CPU cores for queries. Configure max parallel workers. Parallel-safe functions required. Parallel scans for large tables. Aggregate operations parallelizable. Monitor CPU usage during parallel execution.',
          codeExample: `-- Check parallel query settings
SHOW max_parallel_workers_per_gather;  -- default 2
SHOW max_parallel_workers;             -- default 8
SHOW parallel_tuple_cost;

-- See parallel plan in action
EXPLAIN ANALYZE
SELECT status, COUNT(*), AVG(total_amount)
FROM orders
GROUP BY status;
-- Finalize Aggregate
--   -> Gather (Workers Planned: 2)
--     -> Partial Aggregate
--       -> Parallel Seq Scan on orders

-- Increase parallelism for large queries
SET max_parallel_workers_per_gather = 4;

-- Force parallel scan (for testing)
SET parallel_tuple_cost = 0;
SET parallel_setup_cost = 0;`
        },
        {
          name: 'I/O Optimization',
          explanation: 'SSD storage dramatically improves I/O. Separate data and log files. RAID configuration for redundancy and speed. Sequential vs random I/O patterns. Reduce unnecessary I/O with better queries. Monitor disk queue lengths.',
          codeExample: `-- Identify I/O-heavy tables
SELECT schemaname, relname,
       heap_blks_read AS disk_reads,
       heap_blks_hit AS cache_hits,
       round(100.0 * heap_blks_hit /
         nullif(heap_blks_hit + heap_blks_read, 0), 2)
         AS hit_pct
FROM pg_statio_user_tables
ORDER BY heap_blks_read DESC
LIMIT 10;

-- Find tables needing VACUUM (reduce bloat)
SELECT relname,
       n_dead_tup,
       n_live_tup,
       round(n_dead_tup * 100.0 /
         nullif(n_live_tup, 0), 2) AS dead_pct
FROM pg_stat_user_tables
WHERE n_dead_tup > 1000
ORDER BY n_dead_tup DESC;

-- Run VACUUM to reclaim space
VACUUM (VERBOSE, ANALYZE) orders;`
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
          explanation: 'Enable slow query logging with threshold. Analyze patterns in slow queries. Identify candidates for optimization. Log execution plans for slow queries. Regularly review and address. Set appropriate thresholds for your SLA.',
          codeExample: `-- PostgreSQL: Enable slow query logging
-- In postgresql.conf:
-- log_min_duration_statement = 500  (ms)
-- log_statement = 'none'

-- Check current setting
SHOW log_min_duration_statement;

-- Auto-explain logs plans for slow queries
-- shared_preload_libraries = 'auto_explain'
-- auto_explain.log_min_duration = '500ms'
-- auto_explain.log_analyze = true
-- auto_explain.log_buffers = true

-- Find currently running slow queries
SELECT pid, now() - query_start AS duration,
       query, state
FROM pg_stat_activity
WHERE state = 'active'
  AND now() - query_start > INTERVAL '5 seconds'
ORDER BY duration DESC;`
        },
        {
          name: 'Query Statistics',
          explanation: 'pg_stat_statements for PostgreSQL. Query Store for SQL Server. Track execution counts and times. Identify top resource consumers. Compare before/after optimization. Reset statistics after major changes.',
          codeExample: `-- Enable pg_stat_statements extension
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- Top 10 slowest queries by total time
SELECT query,
       calls,
       round(total_exec_time::numeric, 2) AS total_ms,
       round(mean_exec_time::numeric, 2) AS avg_ms,
       rows
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 10;

-- Top queries by calls (most frequent)
SELECT query, calls,
       round(mean_exec_time::numeric, 2) AS avg_ms
FROM pg_stat_statements
ORDER BY calls DESC
LIMIT 10;

-- Reset statistics after optimization
SELECT pg_stat_statements_reset();`
        },
        {
          name: 'Wait Statistics',
          explanation: 'Identify what queries wait for. CPU, I/O, lock, network waits. sys.dm_os_wait_stats in SQL Server. pg_stat_activity in PostgreSQL. Target highest wait types. Correlate waits with specific queries.',
          codeExample: `-- PostgreSQL: Check what queries are waiting on
SELECT pid, wait_event_type, wait_event,
       state, query
FROM pg_stat_activity
WHERE wait_event IS NOT NULL
  AND state = 'active';

-- Find blocking locks
SELECT blocked.pid AS blocked_pid,
       blocked.query AS blocked_query,
       blocking.pid AS blocking_pid,
       blocking.query AS blocking_query
FROM pg_stat_activity blocked
JOIN pg_locks bl ON bl.pid = blocked.pid
JOIN pg_locks kl ON kl.locktype = bl.locktype
  AND kl.relation = bl.relation
  AND kl.pid != bl.pid
JOIN pg_stat_activity blocking
  ON kl.pid = blocking.pid
WHERE NOT bl.granted;`
        },
        {
          name: 'Index Usage Statistics',
          explanation: 'Track index scans vs sequential scans. Identify unused indexes for removal. Find missing index recommendations. Monitor index maintenance overhead. Balance read improvement vs write cost. Regular index usage reviews.',
          codeExample: `-- Find unused indexes (candidates for removal)
SELECT schemaname, relname, indexrelname,
       idx_scan AS times_used,
       pg_size_pretty(pg_relation_size(indexrelid))
         AS index_size
FROM pg_stat_user_indexes
WHERE idx_scan = 0
ORDER BY pg_relation_size(indexrelid) DESC;

-- Tables with high sequential scan ratio
SELECT relname,
       seq_scan, idx_scan,
       round(100.0 * seq_scan /
         nullif(seq_scan + idx_scan, 0), 2)
         AS seq_pct
FROM pg_stat_user_tables
WHERE seq_scan + idx_scan > 100
ORDER BY seq_pct DESC;

-- Total index size per table
SELECT relname,
       pg_size_pretty(pg_indexes_size(relid)) AS idx_size
FROM pg_stat_user_tables
ORDER BY pg_indexes_size(relid) DESC;`
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
          explanation: 'Normalized: reduces redundancy, more joins. Denormalized: faster reads, update anomalies. Choose based on read/write ratio. OLTP typically more normalized. OLAP often denormalized. Hybrid approaches common.',
          codeExample: `-- Normalized: separate tables, no redundancy
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);
CREATE TABLE addresses (
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(id),
    city VARCHAR(100),
    zip VARCHAR(10)
);

-- Denormalized: fewer joins, faster reads
CREATE TABLE orders_denormalized (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100),  -- duplicated
    customer_email VARCHAR(200), -- duplicated
    total_amount NUMERIC(10,2),
    created_at TIMESTAMP
);
-- Trades storage for read speed`
        },
        {
          name: 'Partitioning',
          explanation: 'Range partitioning by date/value ranges. List partitioning for discrete values. Hash partitioning for even distribution. Partition pruning eliminates unnecessary scans. Maintenance per partition. Consider partition-wise joins.',
          codeExample: `-- Range partitioning by date
CREATE TABLE orders (
    id SERIAL,
    customer_id INT,
    total_amount NUMERIC(10,2),
    created_at TIMESTAMP NOT NULL
) PARTITION BY RANGE (created_at);

-- Create partitions per quarter
CREATE TABLE orders_2024_q1 PARTITION OF orders
  FOR VALUES FROM ('2024-01-01') TO ('2024-04-01');
CREATE TABLE orders_2024_q2 PARTITION OF orders
  FOR VALUES FROM ('2024-04-01') TO ('2024-07-01');

-- Partition pruning: only scans relevant partition
EXPLAIN ANALYZE
SELECT * FROM orders
WHERE created_at >= '2024-02-01'
  AND created_at < '2024-03-01';
-- Scans only orders_2024_q1`
        },
        {
          name: 'Vertical Partitioning',
          explanation: 'Split wide tables into narrow ones. Separate frequently accessed columns. Reduce I/O for specific queries. Join back when all columns needed. Consider column-store for analytics. Balance normalization with performance.',
          codeExample: `-- Wide table with mixed access patterns
-- Split into hot (frequently queried) and cold data

-- Hot table: small, frequently accessed columns
CREATE TABLE products_core (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price NUMERIC(10,2),
    stock INT,
    category_id INT
);

-- Cold table: large, rarely accessed columns
CREATE TABLE products_details (
    product_id INT PRIMARY KEY
      REFERENCES products_core(id),
    description TEXT,
    specifications JSONB,
    images BYTEA[]
);

-- Most queries only hit the smaller core table
SELECT name, price FROM products_core
WHERE category_id = 5 AND stock > 0;`
        },
        {
          name: 'Materialized Views',
          explanation: 'Pre-computed query results. Refresh strategies: on-demand, scheduled, incremental. Trade storage for query speed. Perfect for complex aggregations. Monitor staleness. Index materialized views.',
          codeExample: `-- Create materialized view for expensive aggregation
CREATE MATERIALIZED VIEW monthly_sales_summary AS
SELECT
    date_trunc('month', created_at) AS month,
    category_id,
    COUNT(*) AS order_count,
    SUM(total_amount) AS revenue,
    AVG(total_amount) AS avg_order_value
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
GROUP BY date_trunc('month', created_at), category_id;

-- Index the materialized view
CREATE INDEX idx_monthly_sales_month
  ON monthly_sales_summary(month);

-- Refresh when data changes
REFRESH MATERIALIZED VIEW CONCURRENTLY
  monthly_sales_summary;`
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
          explanation: 'Multi-row INSERT reduces overhead. Batch size 1000-10000 rows typical. Use COPY/BULK INSERT for large loads. Disable indexes during bulk load. Reduce transaction log overhead. Parallel loading for maximum throughput.',
          codeExample: `-- BAD: Single-row inserts (slow, high overhead)
INSERT INTO orders VALUES (1, 100, 29.99);
INSERT INTO orders VALUES (2, 101, 49.99);
INSERT INTO orders VALUES (3, 102, 19.99);

-- GOOD: Multi-row INSERT
INSERT INTO orders (customer_id, total_amount)
VALUES
    (100, 29.99),
    (101, 49.99),
    (102, 19.99),
    (103, 39.99);

-- BEST: COPY for bulk loading (PostgreSQL)
COPY orders (customer_id, total_amount, created_at)
FROM '/data/orders.csv'
WITH (FORMAT csv, HEADER true);

-- Wrap bulk operations in single transaction
BEGIN;
INSERT INTO orders VALUES ...;  -- batch 1
INSERT INTO orders VALUES ...;  -- batch 2
COMMIT;`
        },
        {
          name: 'UPSERT Patterns',
          explanation: 'INSERT ON CONFLICT (PostgreSQL). MERGE statement (SQL Server, Oracle). Avoid check-then-insert race conditions. Single statement atomic operation. Use with appropriate conflict target. Consider performance vs separate statements.',
          codeExample: `-- PostgreSQL: INSERT ON CONFLICT (UPSERT)
INSERT INTO products (sku, name, price, stock)
VALUES ('WDG-001', 'Widget', 29.99, 100)
ON CONFLICT (sku)
DO UPDATE SET
    price = EXCLUDED.price,
    stock = products.stock + EXCLUDED.stock;

-- Upsert with conditional update
INSERT INTO daily_stats (date, page, views)
VALUES ('2024-06-15', '/home', 1)
ON CONFLICT (date, page)
DO UPDATE SET views = daily_stats.views + 1;

-- Bulk upsert
INSERT INTO inventory (sku, warehouse, qty)
VALUES
    ('A001', 'US-EAST', 50),
    ('A002', 'US-WEST', 30)
ON CONFLICT (sku, warehouse)
DO UPDATE SET qty = EXCLUDED.qty;`
        },
        {
          name: 'Minimal Logging',
          explanation: 'Bulk-logged recovery model for loads. UNLOGGED tables for temp data. Reduce WAL generation. Faster but less durable. Use for recoverable data only. Re-enable logging after bulk operations.',
          codeExample: `-- UNLOGGED tables: no WAL, much faster writes
CREATE UNLOGGED TABLE staging_import (
    id SERIAL,
    raw_data JSONB,
    processed BOOLEAN DEFAULT false
);

-- Load data quickly into unlogged table
COPY staging_import (raw_data)
FROM '/data/import.json';

-- Process and move to permanent table
INSERT INTO orders (customer_id, amount)
SELECT
    (raw_data->>'customer_id')::INT,
    (raw_data->>'amount')::NUMERIC
FROM staging_import
WHERE NOT processed;

-- WARNING: UNLOGGED tables are truncated on crash
-- Only use for data that can be recreated
DROP TABLE staging_import;`
        },
        {
          name: 'Index Impact on Writes',
          explanation: 'Each index slows INSERT/UPDATE. Drop indexes during bulk loads. Consider filtered indexes for writes. Balance read vs write performance. Defer index creation after loads. Monitor index maintenance time.',
          codeExample: `-- Check how many indexes slow down writes
SELECT tablename,
       COUNT(*) AS index_count,
       pg_size_pretty(pg_indexes_size(
         (schemaname||'.'||tablename)::regclass
       )) AS total_index_size
FROM pg_indexes
WHERE schemaname = 'public'
GROUP BY schemaname, tablename
ORDER BY index_count DESC;

-- Strategy: drop indexes before bulk load
DROP INDEX idx_orders_status;
DROP INDEX idx_orders_date;

-- Perform bulk load (much faster)
COPY orders FROM '/data/bulk_orders.csv' WITH CSV;

-- Rebuild indexes after load
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX CONCURRENTLY idx_orders_date
  ON orders(created_at);
-- CONCURRENTLY avoids locking the table`
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
          explanation: 'Cache frequently accessed query results. Redis/Memcached for distributed caching. Cache invalidation strategies critical. TTL-based expiration simple but imprecise. Event-driven invalidation more accurate. Consider cache warming on startup.',
          codeExample: `-- Identify queries that benefit from caching:
-- frequent, expensive, stable results

-- Find top repeated queries
SELECT query, calls, mean_exec_time,
       round(total_exec_time::numeric, 2) AS total_ms
FROM pg_stat_statements
WHERE calls > 100
  AND mean_exec_time > 10
ORDER BY total_exec_time DESC
LIMIT 10;

-- Example: Cache this expensive aggregation
-- instead of running it every request
SELECT category, COUNT(*) AS product_count,
       AVG(price) AS avg_price,
       MIN(price) AS min_price
FROM products
WHERE active = true
GROUP BY category;
-- Cache result in Redis with 5min TTL`
        },
        {
          name: 'Application-Level Caching',
          explanation: 'ORM caching (Hibernate L2 cache). Request-scoped caching. Read-through/write-through patterns. Cache-aside pattern for flexibility. Consider cache coherence. Monitor cache hit ratios.',
          codeExample: `-- Identify hot tables for app-level caching
SELECT relname,
       seq_scan + idx_scan AS total_reads,
       n_tup_ins + n_tup_upd + n_tup_del AS total_writes,
       round(
         (seq_scan + idx_scan)::numeric /
         nullif(n_tup_ins + n_tup_upd + n_tup_del, 0),
         2
       ) AS read_write_ratio
FROM pg_stat_user_tables
ORDER BY total_reads DESC
LIMIT 10;

-- High read/write ratio = great cache candidates
-- Example results:
-- categories    | reads: 50000 | writes: 5    | ratio: 10000
-- config        | reads: 30000 | writes: 10   | ratio: 3000
-- products      | reads: 25000 | writes: 500  | ratio: 50`
        },
        {
          name: 'Buffer Pool Optimization',
          explanation: 'Increase buffer pool for hot data. Monitor hit ratio (target >95%). Identify pages causing cache misses. Consider multiple buffer pools. Pin critical tables in memory. Avoid cache pollution from full scans.',
          codeExample: `-- Check overall buffer cache hit ratio
SELECT
  sum(blks_hit) * 100.0 /
    nullif(sum(blks_hit) + sum(blks_read), 0)
    AS overall_hit_ratio
FROM pg_stat_database;

-- Per-table cache hit ratios
SELECT relname,
       heap_blks_hit,
       heap_blks_read,
       round(100.0 * heap_blks_hit /
         nullif(heap_blks_hit + heap_blks_read, 0), 2)
         AS hit_pct
FROM pg_statio_user_tables
WHERE heap_blks_hit + heap_blks_read > 0
ORDER BY hit_pct ASC
LIMIT 10;

-- Pin frequently accessed table using pg_prewarm
CREATE EXTENSION pg_prewarm;
SELECT pg_prewarm('products');  -- load into cache`
        },
        {
          name: 'Connection Caching',
          explanation: 'Prepared statement caching. Plan cache utilization. Connection pool statement cache. Reduce parsing overhead. Monitor cache sizes. Clear cache when plans go stale.',
          codeExample: `-- Prepared statements reduce parse overhead
PREPARE order_lookup (INT) AS
SELECT id, customer_id, total_amount
FROM orders
WHERE customer_id = $1
  AND status = 'ACTIVE';

-- Execute cached prepared statement
EXECUTE order_lookup(42);
EXECUTE order_lookup(99);

-- View all prepared statements
SELECT name, statement, prepare_time
FROM pg_prepared_statements;

-- Deallocate when no longer needed
DEALLOCATE order_lookup;
DEALLOCATE ALL;  -- remove all prepared statements`
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

  useVoiceConceptNavigation(concepts, setSelectedConceptIndex, setSelectedDetailIndex)

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
          onMainMenu={breadcrumb?.onMainMenu || onBack}
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

      {/* Collapsible Sidebar for quick concept navigation */}
      <CollapsibleSidebar
        items={concepts}
        selectedIndex={selectedConceptIndex ?? -1}
        onSelect={(index) => {
          setSelectedConceptIndex(index)
          setSelectedDetailIndex(0)
        }}
        title="Concepts"
        getItemLabel={(item) => item.name}
        getItemIcon={(item) => item.icon}
        primaryColor={DATABASE_COLORS.primary}
      />


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
              onMainMenu={breadcrumb?.onMainMenu || onBack}
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
                  {detail.codeExample && (
                    <div style={{
                      backgroundColor: '#1e293b',
                      padding: '1.5rem',
                      borderRadius: '0.5rem',
                      borderLeft: `4px solid ${selectedConcept.color}`,
                      overflow: 'auto',
                      marginTop: '1rem'
                    }}>
                      <SyntaxHighlighter code={detail.codeExample} />
                    </div>
                  )}
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
