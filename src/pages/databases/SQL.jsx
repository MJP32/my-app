import { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

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
const QueryOptimizationDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Query Execution Pipeline</text>
    <rect x="30" y="50" width="90" height="50" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="75" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">SQL Query</text>
    <text x="75" y="88" textAnchor="middle" fill="#bfdbfe" fontSize="7">SELECT...</text>
    <rect x="140" y="50" width="90" height="50" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="185" y="72" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Parser</text>
    <text x="185" y="88" textAnchor="middle" fill="#ddd6fe" fontSize="7">AST</text>
    <rect x="250" y="50" width="90" height="50" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="295" y="72" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Optimizer</text>
    <text x="295" y="88" textAnchor="middle" fill="#fef3c7" fontSize="7">Cost-based</text>
    <rect x="360" y="50" width="90" height="50" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="405" y="72" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Exec Plan</text>
    <text x="405" y="88" textAnchor="middle" fill="#bbf7d0" fontSize="7">EXPLAIN</text>
    <rect x="470" y="50" width="90" height="50" rx="6" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="515" y="72" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Executor</text>
    <text x="515" y="88" textAnchor="middle" fill="#a5f3fc" fontSize="7">Scan/Join</text>
    <rect x="580" y="50" width="90" height="50" rx="6" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="625" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Results</text>
    <text x="625" y="88" textAnchor="middle" fill="#fbcfe8" fontSize="7">Rows</text>
    <line x1="120" y1="75" x2="135" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="230" y1="75" x2="245" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="340" y1="75" x2="355" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="450" y1="75" x2="465" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="560" y1="75" x2="575" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Parse → Optimize → Plan → Execute • Use EXPLAIN ANALYZE to profile</text>
  </svg>
)

// Database Design Diagram
const DatabaseDesignDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Normalization Forms</text>
    <rect x="50" y="50" width="120" height="60" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="110" y="75" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">1NF</text>
    <text x="110" y="92" textAnchor="middle" fill="#93c5fd" fontSize="8">Atomic values</text>
    <text x="110" y="105" textAnchor="middle" fill="#93c5fd" fontSize="7">No repeating groups</text>
    <rect x="190" y="50" width="120" height="60" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="250" y="75" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">2NF</text>
    <text x="250" y="92" textAnchor="middle" fill="#86efac" fontSize="8">No partial deps</text>
    <text x="250" y="105" textAnchor="middle" fill="#86efac" fontSize="7">Full key dependency</text>
    <rect x="330" y="50" width="120" height="60" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="390" y="75" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">3NF</text>
    <text x="390" y="92" textAnchor="middle" fill="#fcd34d" fontSize="8">No transitive deps</text>
    <text x="390" y="105" textAnchor="middle" fill="#fcd34d" fontSize="7">Non-key → Non-key</text>
    <rect x="470" y="50" width="120" height="60" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="530" y="75" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">BCNF</text>
    <text x="530" y="92" textAnchor="middle" fill="#c4b5fd" fontSize="8">Every determinant</text>
    <text x="530" y="105" textAnchor="middle" fill="#c4b5fd" fontSize="7">is candidate key</text>
    <line x1="170" y1="80" x2="185" y2="80" stroke="#4ade80" strokeWidth="2"/>
    <line x1="310" y1="80" x2="325" y2="80" stroke="#4ade80" strokeWidth="2"/>
    <line x1="450" y1="80" x2="465" y2="80" stroke="#4ade80" strokeWidth="2"/>
    <rect x="150" y="125" width="400" height="35" rx="4" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899" strokeWidth="1"/>
    <text x="350" y="147" textAnchor="middle" fill="#f472b6" fontSize="9">Higher NF = Less redundancy, More joins • Balance with query performance</text>
  </svg>
)

// ACID Transactions Diagram
const ACIDDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">ACID Transaction Properties</text>
    <rect x="50" y="50" width="130" height="70" rx="6" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <text x="115" y="75" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">Atomicity</text>
    <text x="115" y="95" textAnchor="middle" fill="#fca5a5" fontSize="8">All or nothing</text>
    <text x="115" y="110" textAnchor="middle" fill="#fca5a5" fontSize="7">Rollback on failure</text>
    <rect x="200" y="50" width="130" height="70" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="265" y="75" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Consistency</text>
    <text x="265" y="95" textAnchor="middle" fill="#86efac" fontSize="8">Valid state only</text>
    <text x="265" y="110" textAnchor="middle" fill="#86efac" fontSize="7">Constraints hold</text>
    <rect x="350" y="50" width="130" height="70" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="415" y="75" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Isolation</text>
    <text x="415" y="95" textAnchor="middle" fill="#93c5fd" fontSize="8">Concurrent txns</text>
    <text x="415" y="110" textAnchor="middle" fill="#93c5fd" fontSize="7">appear serial</text>
    <rect x="500" y="50" width="130" height="70" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="565" y="75" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">Durability</text>
    <text x="565" y="95" textAnchor="middle" fill="#c4b5fd" fontSize="8">Committed = Safe</text>
    <text x="565" y="110" textAnchor="middle" fill="#c4b5fd" fontSize="7">Survives crash</text>
    <text x="350" y="145" textAnchor="middle" fill="#64748b" fontSize="9">Foundation of reliable database operations</text>
  </svg>
)

// Performance Tuning Diagram
const PerformanceDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Database Performance Layers</text>
    <rect x="50" y="50" width="120" height="70" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="110" y="75" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Connection</text>
    <text x="110" y="92" textAnchor="middle" fill="#93c5fd" fontSize="8">Pool</text>
    <text x="110" y="107" textAnchor="middle" fill="#93c5fd" fontSize="7">HikariCP</text>
    <rect x="190" y="50" width="120" height="70" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="250" y="75" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Query Cache</text>
    <text x="250" y="92" textAnchor="middle" fill="#fcd34d" fontSize="8">Redis/Memcached</text>
    <text x="250" y="107" textAnchor="middle" fill="#fcd34d" fontSize="7">Result cache</text>
    <rect x="330" y="50" width="120" height="70" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="390" y="75" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Buffer Pool</text>
    <text x="390" y="92" textAnchor="middle" fill="#c4b5fd" fontSize="8">Page cache</text>
    <text x="390" y="107" textAnchor="middle" fill="#c4b5fd" fontSize="7">shared_buffers</text>
    <rect x="470" y="50" width="120" height="70" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="530" y="75" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Indexes</text>
    <text x="530" y="92" textAnchor="middle" fill="#86efac" fontSize="8">B-tree/Hash</text>
    <text x="530" y="107" textAnchor="middle" fill="#86efac" fontSize="7">GIN/GiST</text>
    <line x1="170" y1="85" x2="185" y2="85" stroke="#4ade80" strokeWidth="2"/>
    <line x1="310" y1="85" x2="325" y2="85" stroke="#4ade80" strokeWidth="2"/>
    <line x1="450" y1="85" x2="465" y2="85" stroke="#4ade80" strokeWidth="2"/>
    <text x="350" y="145" textAnchor="middle" fill="#64748b" fontSize="9">Optimize at each layer • Monitor with pg_stat_statements</text>
  </svg>
)

// Window Functions Diagram
const WindowFunctionsDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Window Functions - OVER Clause</text>
    <rect x="50" y="50" width="180" height="90" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="140" y="70" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Ranking</text>
    <text x="140" y="90" textAnchor="middle" fill="#93c5fd" fontSize="8">ROW_NUMBER()</text>
    <text x="140" y="105" textAnchor="middle" fill="#93c5fd" fontSize="8">RANK(), DENSE_RANK()</text>
    <text x="140" y="120" textAnchor="middle" fill="#93c5fd" fontSize="8">NTILE(n)</text>
    <rect x="260" y="50" width="180" height="90" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="350" y="70" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Navigation</text>
    <text x="350" y="90" textAnchor="middle" fill="#86efac" fontSize="8">LAG(), LEAD()</text>
    <text x="350" y="105" textAnchor="middle" fill="#86efac" fontSize="8">FIRST_VALUE()</text>
    <text x="350" y="120" textAnchor="middle" fill="#86efac" fontSize="8">LAST_VALUE()</text>
    <rect x="470" y="50" width="180" height="90" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="560" y="70" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Aggregate</text>
    <text x="560" y="90" textAnchor="middle" fill="#fcd34d" fontSize="8">SUM() OVER</text>
    <text x="560" y="105" textAnchor="middle" fill="#fcd34d" fontSize="8">AVG() OVER</text>
    <text x="560" y="120" textAnchor="middle" fill="#fcd34d" fontSize="8">COUNT() OVER</text>
    <text x="350" y="160" textAnchor="middle" fill="#64748b" fontSize="9">PARTITION BY groups • ORDER BY sorts • ROWS/RANGE defines frame</text>
  </svg>
)

// Replication Diagram
const ReplicationDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">{`Database Replication & High Availability`}</text>
    <rect x="250" y="45" width="200" height="55" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="350" y="72" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Primary (Master)</text>
    <text x="350" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">Handles all writes</text>
    <rect x="50" y="120" width="150" height="45" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="125" y="140" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Replica 1</text>
    <text x="125" y="155" textAnchor="middle" fill="#86efac" fontSize="7">Read queries</text>
    <rect x="275" y="120" width="150" height="45" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="350" y="140" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Replica 2</text>
    <text x="350" y="155" textAnchor="middle" fill="#86efac" fontSize="7">Read queries</text>
    <rect x="500" y="120" width="150" height="45" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="575" y="140" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Replica 3</text>
    <text x="575" y="155" textAnchor="middle" fill="#86efac" fontSize="7">Read queries</text>
    <line x1="280" y1="100" x2="125" y2="115" stroke="#f59e0b" strokeWidth="2"/>
    <line x1="350" y1="100" x2="350" y2="115" stroke="#f59e0b" strokeWidth="2"/>
    <line x1="420" y1="100" x2="575" y2="115" stroke="#f59e0b" strokeWidth="2"/>
    <text x="200" y="108" textAnchor="middle" fill="#fbbf24" fontSize="7">WAL stream</text>
    <text x="500" y="108" textAnchor="middle" fill="#fbbf24" fontSize="7">WAL stream</text>
  </svg>
)

// Security Diagram
const SecurityDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Database Security Layers</text>
    <rect x="50" y="50" width="120" height="70" rx="6" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <text x="110" y="75" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">Network</text>
    <text x="110" y="92" textAnchor="middle" fill="#fca5a5" fontSize="8">SSL/TLS</text>
    <text x="110" y="107" textAnchor="middle" fill="#fca5a5" fontSize="7">pg_hba.conf</text>
    <rect x="190" y="50" width="120" height="70" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="250" y="75" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Auth</text>
    <text x="250" y="92" textAnchor="middle" fill="#fcd34d" fontSize="8">SCRAM-256</text>
    <text x="250" y="107" textAnchor="middle" fill="#fcd34d" fontSize="7">LDAP/Kerberos</text>
    <rect x="330" y="50" width="120" height="70" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="390" y="75" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">RBAC</text>
    <text x="390" y="92" textAnchor="middle" fill="#86efac" fontSize="8">GRANT/REVOKE</text>
    <text x="390" y="107" textAnchor="middle" fill="#86efac" fontSize="7">Role hierarchy</text>
    <rect x="470" y="50" width="120" height="70" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="530" y="75" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">RLS</text>
    <text x="530" y="92" textAnchor="middle" fill="#c4b5fd" fontSize="8">Row-Level</text>
    <text x="530" y="107" textAnchor="middle" fill="#c4b5fd" fontSize="7">Security policies</text>
    <line x1="170" y1="85" x2="185" y2="85" stroke="#4ade80" strokeWidth="2"/>
    <line x1="310" y1="85" x2="325" y2="85" stroke="#4ade80" strokeWidth="2"/>
    <line x1="450" y1="85" x2="465" y2="85" stroke="#4ade80" strokeWidth="2"/>
    <text x="350" y="145" textAnchor="middle" fill="#64748b" fontSize="9">Defense in depth • Principle of least privilege</text>
  </svg>
)


// Query Execution Flow Diagram (Parser -> Optimizer -> Execution Engine -> Results)
const QueryExecutionDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="sqlArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">Query Execution Flow</text>
    <rect x="30" y="60" width="100" height="70" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="80" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">SQL Query</text>
    <text x="80" y="108" textAnchor="middle" fill="#bfdbfe" fontSize="9">SELECT * FROM</text>
    <rect x="180" y="60" width="100" height="70" rx="8" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="230" y="85" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">Parser</text>
    <text x="230" y="103" textAnchor="middle" fill="#93c5fd" fontSize="9">Syntax Check</text>
    <text x="230" y="118" textAnchor="middle" fill="#93c5fd" fontSize="9">Build AST</text>
    <rect x="330" y="60" width="100" height="70" rx="8" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="380" y="85" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">Optimizer</text>
    <text x="380" y="103" textAnchor="middle" fill="#93c5fd" fontSize="9">Cost Analysis</text>
    <text x="380" y="118" textAnchor="middle" fill="#93c5fd" fontSize="9">Plan Selection</text>
    <rect x="480" y="60" width="120" height="70" rx="8" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="540" y="85" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">Execution</text>
    <text x="540" y="103" textAnchor="middle" fill="#93c5fd" fontSize="9">Run Plan</text>
    <text x="540" y="118" textAnchor="middle" fill="#93c5fd" fontSize="9">Fetch Data</text>
    <rect x="650" y="60" width="100" height="70" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="700" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Results</text>
    <text x="700" y="108" textAnchor="middle" fill="#bfdbfe" fontSize="9">Result Set</text>
    <line x1="130" y1="95" x2="175" y2="95" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#sqlArrow)"/>
    <line x1="280" y1="95" x2="325" y2="95" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#sqlArrow)"/>
    <line x1="430" y1="95" x2="475" y2="95" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#sqlArrow)"/>
    <line x1="600" y1="95" x2="645" y2="95" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#sqlArrow)"/>
    <text x="400" y="165" textAnchor="middle" fill="#64748b" fontSize="10">Use EXPLAIN ANALYZE to inspect execution plans and identify bottlenecks</text>
  </svg>
)


// Normalization Diagram (1NF -> 2NF -> 3NF -> BCNF)
const NormalizationDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="normArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">Database Normalization Progression</text>
    <rect x="50" y="50" width="140" height="100" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="120" y="75" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">1NF</text>
    <text x="120" y="95" textAnchor="middle" fill="#60a5fa" fontSize="10">Atomic Values</text>
    <text x="120" y="112" textAnchor="middle" fill="#93c5fd" fontSize="9">No repeating groups</text>
    <text x="120" y="127" textAnchor="middle" fill="#93c5fd" fontSize="9">Unique rows</text>
    <text x="120" y="142" textAnchor="middle" fill="#93c5fd" fontSize="9">Single value per cell</text>
    <rect x="230" y="50" width="140" height="100" rx="8" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="300" y="75" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">2NF</text>
    <text x="300" y="95" textAnchor="middle" fill="#60a5fa" fontSize="10">Full Dependency</text>
    <text x="300" y="112" textAnchor="middle" fill="#93c5fd" fontSize="9">1NF + No partial</text>
    <text x="300" y="127" textAnchor="middle" fill="#93c5fd" fontSize="9">dependencies on</text>
    <text x="300" y="142" textAnchor="middle" fill="#93c5fd" fontSize="9">composite keys</text>
    <rect x="410" y="50" width="140" height="100" rx="8" fill="rgba(59, 130, 246, 0.4)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="480" y="75" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">3NF</text>
    <text x="480" y="95" textAnchor="middle" fill="#60a5fa" fontSize="10">No Transitive Deps</text>
    <text x="480" y="112" textAnchor="middle" fill="#93c5fd" fontSize="9">2NF + Non-key cols</text>
    <text x="480" y="127" textAnchor="middle" fill="#93c5fd" fontSize="9">depend only on</text>
    <text x="480" y="142" textAnchor="middle" fill="#93c5fd" fontSize="9">primary key</text>
    <rect x="590" y="50" width="140" height="100" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="660" y="75" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">BCNF</text>
    <text x="660" y="95" textAnchor="middle" fill="#bfdbfe" fontSize="10">Boyce-Codd</text>
    <text x="660" y="112" textAnchor="middle" fill="#bfdbfe" fontSize="9">3NF + Every</text>
    <text x="660" y="127" textAnchor="middle" fill="#bfdbfe" fontSize="9">determinant is a</text>
    <text x="660" y="142" textAnchor="middle" fill="#bfdbfe" fontSize="9">candidate key</text>
    <line x1="190" y1="100" x2="225" y2="100" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#normArrow)"/>
    <line x1="370" y1="100" x2="405" y2="100" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#normArrow)"/>
    <line x1="550" y1="100" x2="585" y2="100" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#normArrow)"/>
    <rect x="200" y="170" width="400" height="35" rx="6" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="400" y="192" textAnchor="middle" fill="#60a5fa" fontSize="10">Higher normalization = Less redundancy, More joins | Balance based on query patterns</text>
  </svg>
)


// B-tree Index Structure Diagram
const IndexStructureDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">B-tree Index Structure</text>
    <rect x="300" y="45" width="200" height="45" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="400" y="63" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Root Node</text>
    <text x="400" y="80" textAnchor="middle" fill="#bfdbfe" fontSize="10">50 | 100</text>
    <rect x="100" y="120" width="150" height="45" rx="6" fill="rgba(59, 130, 246, 0.4)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="175" y="138" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Branch Node</text>
    <text x="175" y="155" textAnchor="middle" fill="#93c5fd" fontSize="9">10 | 25 | 40</text>
    <rect x="325" y="120" width="150" height="45" rx="6" fill="rgba(59, 130, 246, 0.4)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="400" y="138" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Branch Node</text>
    <text x="400" y="155" textAnchor="middle" fill="#93c5fd" fontSize="9">60 | 75 | 90</text>
    <rect x="550" y="120" width="150" height="45" rx="6" fill="rgba(59, 130, 246, 0.4)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="625" y="138" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Branch Node</text>
    <text x="625" y="155" textAnchor="middle" fill="#93c5fd" fontSize="9">110 | 130 | 150</text>
    <rect x="30" y="195" width="90" height="40" rx="4" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="75" y="212" textAnchor="middle" fill="#60a5fa" fontSize="8" fontWeight="bold">Leaf</text>
    <text x="75" y="225" textAnchor="middle" fill="#93c5fd" fontSize="8">1,5,8,9</text>
    <rect x="130" y="195" width="90" height="40" rx="4" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="175" y="212" textAnchor="middle" fill="#60a5fa" fontSize="8" fontWeight="bold">Leaf</text>
    <text x="175" y="225" textAnchor="middle" fill="#93c5fd" fontSize="8">11,15,20</text>
    <rect x="230" y="195" width="90" height="40" rx="4" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="275" y="212" textAnchor="middle" fill="#60a5fa" fontSize="8" fontWeight="bold">Leaf</text>
    <text x="275" y="225" textAnchor="middle" fill="#93c5fd" fontSize="8">26,30,38</text>
    <rect x="355" y="195" width="90" height="40" rx="4" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="400" y="212" textAnchor="middle" fill="#60a5fa" fontSize="8" fontWeight="bold">Leaf</text>
    <text x="400" y="225" textAnchor="middle" fill="#93c5fd" fontSize="8">51,55,58</text>
    <rect x="480" y="195" width="90" height="40" rx="4" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="525" y="212" textAnchor="middle" fill="#60a5fa" fontSize="8" fontWeight="bold">Leaf</text>
    <text x="525" y="225" textAnchor="middle" fill="#93c5fd" fontSize="8">101,105</text>
    <rect x="580" y="195" width="90" height="40" rx="4" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="625" y="212" textAnchor="middle" fill="#60a5fa" fontSize="8" fontWeight="bold">Leaf</text>
    <text x="625" y="225" textAnchor="middle" fill="#93c5fd" fontSize="8">111,120</text>
    <rect x="680" y="195" width="90" height="40" rx="4" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="725" y="212" textAnchor="middle" fill="#60a5fa" fontSize="8" fontWeight="bold">Leaf</text>
    <text x="725" y="225" textAnchor="middle" fill="#93c5fd" fontSize="8">131,145</text>
    <line x1="340" y1="90" x2="200" y2="120" stroke="#60a5fa" strokeWidth="1.5"/>
    <line x1="400" y1="90" x2="400" y2="120" stroke="#60a5fa" strokeWidth="1.5"/>
    <line x1="460" y1="90" x2="600" y2="120" stroke="#60a5fa" strokeWidth="1.5"/>
    <line x1="130" y1="165" x2="75" y2="195" stroke="#60a5fa" strokeWidth="1"/>
    <line x1="175" y1="165" x2="175" y2="195" stroke="#60a5fa" strokeWidth="1"/>
    <line x1="220" y1="165" x2="275" y2="195" stroke="#60a5fa" strokeWidth="1"/>
    <line x1="400" y1="165" x2="400" y2="195" stroke="#60a5fa" strokeWidth="1"/>
    <line x1="595" y1="165" x2="525" y2="195" stroke="#60a5fa" strokeWidth="1"/>
    <line x1="625" y1="165" x2="625" y2="195" stroke="#60a5fa" strokeWidth="1"/>
    <line x1="655" y1="165" x2="725" y2="195" stroke="#60a5fa" strokeWidth="1"/>
    <text x="400" y="260" textAnchor="middle" fill="#64748b" fontSize="10">O(log n) search | Balanced tree | Leaf nodes contain data pointers</text>
  </svg>
)


// ACID Transaction Diagram with connections
const TransactionDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">ACID Transaction Properties</text>
    <circle cx="400" cy="120" r="40" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="400" y="115" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">TXN</text>
    <text x="400" y="130" textAnchor="middle" fill="#bfdbfe" fontSize="8">BEGIN...COMMIT</text>
    <rect x="80" y="50" width="130" height="70" rx="8" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="145" y="75" textAnchor="middle" fill="#3b82f6" fontSize="13" fontWeight="bold">Atomicity</text>
    <text x="145" y="95" textAnchor="middle" fill="#60a5fa" fontSize="9">All or Nothing</text>
    <text x="145" y="110" textAnchor="middle" fill="#93c5fd" fontSize="8">Complete success or</text>
    <text x="145" y="122" textAnchor="middle" fill="#93c5fd" fontSize="8">full rollback</text>
    <line x1="210" y1="95" x2="360" y2="110" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="4"/>
    <rect x="80" y="135" width="130" height="70" rx="8" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="145" y="160" textAnchor="middle" fill="#3b82f6" fontSize="13" fontWeight="bold">Consistency</text>
    <text x="145" y="180" textAnchor="middle" fill="#60a5fa" fontSize="9">Valid States Only</text>
    <text x="145" y="195" textAnchor="middle" fill="#93c5fd" fontSize="8">Constraints enforced</text>
    <line x1="210" y1="160" x2="360" y2="130" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="4"/>
    <rect x="590" y="50" width="130" height="70" rx="8" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="655" y="75" textAnchor="middle" fill="#3b82f6" fontSize="13" fontWeight="bold">Isolation</text>
    <text x="655" y="95" textAnchor="middle" fill="#60a5fa" fontSize="9">Concurrent Safety</text>
    <text x="655" y="110" textAnchor="middle" fill="#93c5fd" fontSize="8">Transactions appear</text>
    <text x="655" y="122" textAnchor="middle" fill="#93c5fd" fontSize="8">serial to each other</text>
    <line x1="440" y1="110" x2="590" y2="95" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="4"/>
    <rect x="590" y="135" width="130" height="70" rx="8" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="655" y="160" textAnchor="middle" fill="#3b82f6" fontSize="13" fontWeight="bold">Durability</text>
    <text x="655" y="180" textAnchor="middle" fill="#60a5fa" fontSize="9">Permanent</text>
    <text x="655" y="195" textAnchor="middle" fill="#93c5fd" fontSize="8">Committed data</text>
    <text x="655" y="207" textAnchor="middle" fill="#93c5fd" fontSize="8">survives crashes</text>
    <line x1="440" y1="130" x2="590" y2="160" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="4"/>
  </svg>
)


// Join Types Diagram with Venn diagrams
const JoinTypesDiagram = () => (
  <svg viewBox="0 0 800 240" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">SQL Join Types</text>
    <g transform="translate(60, 60)">
      <circle cx="50" cy="60" r="40" fill="none" stroke="#3b82f6" strokeWidth="2"/>
      <circle cx="90" cy="60" r="40" fill="none" stroke="#3b82f6" strokeWidth="2"/>
      <path d="M 70 28 A 40 40 0 0 1 70 92 A 40 40 0 0 1 70 28" fill="#3b82f6" opacity="0.6"/>
      <text x="70" y="130" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">INNER JOIN</text>
      <text x="70" y="145" textAnchor="middle" fill="#93c5fd" fontSize="9">Matching rows only</text>
      <text x="35" y="60" textAnchor="middle" fill="#60a5fa" fontSize="10">A</text>
      <text x="105" y="60" textAnchor="middle" fill="#60a5fa" fontSize="10">B</text>
    </g>
    <g transform="translate(220, 60)">
      <circle cx="50" cy="60" r="40" fill="#3b82f6" opacity="0.4" stroke="#3b82f6" strokeWidth="2"/>
      <circle cx="90" cy="60" r="40" fill="none" stroke="#3b82f6" strokeWidth="2"/>
      <path d="M 70 28 A 40 40 0 0 1 70 92 A 40 40 0 0 1 70 28" fill="#3b82f6" opacity="0.6"/>
      <text x="70" y="130" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">LEFT JOIN</text>
      <text x="70" y="145" textAnchor="middle" fill="#93c5fd" fontSize="9">All from A + matches</text>
      <text x="35" y="60" textAnchor="middle" fill="white" fontSize="10">A</text>
      <text x="105" y="60" textAnchor="middle" fill="#60a5fa" fontSize="10">B</text>
    </g>
    <g transform="translate(380, 60)">
      <circle cx="50" cy="60" r="40" fill="none" stroke="#3b82f6" strokeWidth="2"/>
      <circle cx="90" cy="60" r="40" fill="#3b82f6" opacity="0.4" stroke="#3b82f6" strokeWidth="2"/>
      <path d="M 70 28 A 40 40 0 0 1 70 92 A 40 40 0 0 1 70 28" fill="#3b82f6" opacity="0.6"/>
      <text x="70" y="130" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">RIGHT JOIN</text>
      <text x="70" y="145" textAnchor="middle" fill="#93c5fd" fontSize="9">All from B + matches</text>
      <text x="35" y="60" textAnchor="middle" fill="#60a5fa" fontSize="10">A</text>
      <text x="105" y="60" textAnchor="middle" fill="white" fontSize="10">B</text>
    </g>
    <g transform="translate(540, 60)">
      <circle cx="50" cy="60" r="40" fill="#3b82f6" opacity="0.4" stroke="#3b82f6" strokeWidth="2"/>
      <circle cx="90" cy="60" r="40" fill="#3b82f6" opacity="0.4" stroke="#3b82f6" strokeWidth="2"/>
      <path d="M 70 28 A 40 40 0 0 1 70 92 A 40 40 0 0 1 70 28" fill="#3b82f6" opacity="0.6"/>
      <text x="70" y="130" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">FULL OUTER</text>
      <text x="70" y="145" textAnchor="middle" fill="#93c5fd" fontSize="9">All from both tables</text>
      <text x="35" y="60" textAnchor="middle" fill="white" fontSize="10">A</text>
      <text x="105" y="60" textAnchor="middle" fill="white" fontSize="10">B</text>
    </g>
    <text x="400" y="225" textAnchor="middle" fill="#64748b" fontSize="10">Choose join type based on whether you need unmatched rows from left, right, or both tables</text>
  </svg>
)


// Master-Slave Replication Diagram
const MasterSlaveReplicationDiagram = () => (
  <svg viewBox="0 0 800 250" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="repArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">Master-Slave Replication Flow</text>
    <rect x="340" y="45" width="120" height="40" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="400" y="70" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Application</text>
    <rect x="300" y="110" width="200" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="400" y="135" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Master (Primary)</text>
    <text x="400" y="155" textAnchor="middle" fill="#bfdbfe" fontSize="10">Reads + Writes</text>
    <rect x="530" y="120" width="80" height="40" rx="4" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="570" y="138" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">WAL</text>
    <text x="570" y="152" textAnchor="middle" fill="#93c5fd" fontSize="8">Binary Log</text>
    <rect x="100" y="195" width="140" height="50" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="170" y="218" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Slave 1</text>
    <text x="170" y="235" textAnchor="middle" fill="#93c5fd" fontSize="9">Read Replica</text>
    <rect x="330" y="195" width="140" height="50" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="400" y="218" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Slave 2</text>
    <text x="400" y="235" textAnchor="middle" fill="#93c5fd" fontSize="9">Read Replica</text>
    <rect x="560" y="195" width="140" height="50" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="630" y="218" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Slave 3</text>
    <text x="630" y="235" textAnchor="middle" fill="#93c5fd" fontSize="9">Read Replica</text>
    <line x1="400" y1="85" x2="400" y2="105" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#repArrow)"/>
    <line x1="500" y1="140" x2="525" y2="140" stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#repArrow)"/>
    <path d="M 320 170 Q 250 185, 200 195" fill="none" stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#repArrow)"/>
    <line x1="400" y1="170" x2="400" y2="190" stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#repArrow)"/>
    <path d="M 480 170 Q 550 185, 600 195" fill="none" stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#repArrow)"/>
    <text x="260" y="182" fill="#93c5fd" fontSize="8">Async/Sync</text>
    <text x="520" y="182" fill="#93c5fd" fontSize="8">Async/Sync</text>
  </svg>
)

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
      diagram: QueryExecutionDiagram,
      details: [
        {
          name: 'Execution Plans',
          explanation: 'EXPLAIN and EXPLAIN ANALYZE show query execution strategy. Identify sequential scans, index scans, and join algorithms. Understand cost estimates and actual execution times. Query planner statistics and optimizer hints help optimize based on actual execution metrics.'
        },
        {
          name: 'Indexing Strategy',
          explanation: 'B-tree indexes for equality and range queries. Hash indexes for exact matches. GiST and GIN for full-text and geometric data. Covering indexes avoid table lookups. Index-only scans provide optimal performance. Balance index maintenance cost vs query speed.',
          diagram: IndexStructureDiagram
        },
        {
          name: 'Query Rewriting',
          explanation: 'Transform correlated subqueries to joins. Use EXISTS instead of IN for large subqueries. Predicate pushdown filters data early. Common table expressions (CTEs) improve readability and reuse. Avoid functions on indexed columns in WHERE clauses.'
        },
        {
          name: 'Join Optimization',
          explanation: 'Nested loop, hash, and merge join algorithms. Join order affects performance dramatically. Filter data before joining. Use appropriate join types (INNER, LEFT, etc.). Analyze cardinality for join optimization. Consider denormalization for frequently joined tables.',
          diagram: JoinTypesDiagram
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
      diagram: NormalizationDiagram,
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
      diagram: TransactionDiagram,
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
      diagram: PerformanceDiagram,
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
      diagram: WindowFunctionsDiagram,
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
      diagram: MasterSlaveReplicationDiagram,
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
      diagram: SecurityDiagram,
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
