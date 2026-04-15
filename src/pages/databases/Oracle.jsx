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

// PL/SQL Programming Diagram
const PLSQLDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">PL/SQL Architecture</text>
    <rect x="50" y="45" width="140" height="60" rx="6" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <text x="120" y="70" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Procedures</text>
    <text x="120" y="88" textAnchor="middle" fill="#fca5a5" fontSize="8">Business logic</text>
    <rect x="210" y="45" width="140" height="60" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="280" y="70" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Functions</text>
    <text x="280" y="88" textAnchor="middle" fill="#fcd34d" fontSize="8">Return values</text>
    <rect x="370" y="45" width="140" height="60" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="440" y="70" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Triggers</text>
    <text x="440" y="88" textAnchor="middle" fill="#c4b5fd" fontSize="8">Event handlers</text>
    <rect x="530" y="45" width="140" height="60" rx="6" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" strokeWidth="2"/>
    <text x="600" y="70" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Packages</text>
    <text x="600" y="88" textAnchor="middle" fill="#86efac" fontSize="8">Encapsulation</text>
    <rect x="150" y="120" width="400" height="40" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="350" y="145" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">BULK COLLECT • FORALL • Exception Handling</text>
    <text x="350" y="175" textAnchor="middle" fill="#64748b" fontSize="9">Server-side execution • Reduced network overhead • Strong typing</text>
  </svg>
)

// Performance Tuning Diagram
const PerformanceTuningDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Oracle Performance Tuning Workflow</text>
    <rect x="50" y="50" width="120" height="55" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="110" y="75" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">AWR/ADDM</text>
    <text x="110" y="92" textAnchor="middle" fill="#fcd34d" fontSize="7">Diagnostics</text>
    <rect x="190" y="50" width="120" height="55" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="250" y="75" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Explain Plan</text>
    <text x="250" y="92" textAnchor="middle" fill="#93c5fd" fontSize="7">Execution path</text>
    <rect x="330" y="50" width="120" height="55" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="390" y="75" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Optimizer</text>
    <text x="390" y="92" textAnchor="middle" fill="#c4b5fd" fontSize="7">{`Hints & stats`}</text>
    <rect x="470" y="50" width="120" height="55" rx="6" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" strokeWidth="2"/>
    <text x="530" y="75" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Indexing</text>
    <text x="530" y="92" textAnchor="middle" fill="#86efac" fontSize="7">B-tree/Bitmap</text>
    <line x1="170" y1="77" x2="185" y2="77" stroke="#4ade80" strokeWidth="2"/>
    <line x1="310" y1="77" x2="325" y2="77" stroke="#4ade80" strokeWidth="2"/>
    <line x1="450" y1="77" x2="465" y2="77" stroke="#4ade80" strokeWidth="2"/>
    <rect x="150" y="120" width="400" height="40" rx="6" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" strokeWidth="1"/>
    <text x="350" y="140" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">Partitioning • Parallel Query • Result Cache</text>
    <text x="350" y="155" textAnchor="middle" fill="#fca5a5" fontSize="8">Scale large datasets efficiently</text>
    <text x="350" y="175" textAnchor="middle" fill="#64748b" fontSize="9">Identify → Analyze → Optimize → Monitor</text>
  </svg>
)

// RAC & High Availability Diagram
const RACDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Oracle RAC Architecture</text>
    <rect x="100" y="45" width="100" height="50" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="150" y="70" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Instance 1</text>
    <text x="150" y="85" textAnchor="middle" fill="#c4b5fd" fontSize="7">SGA + PGA</text>
    <rect x="220" y="45" width="100" height="50" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="270" y="70" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Instance 2</text>
    <text x="270" y="85" textAnchor="middle" fill="#c4b5fd" fontSize="7">SGA + PGA</text>
    <rect x="340" y="45" width="100" height="50" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="390" y="70" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Instance N</text>
    <text x="390" y="85" textAnchor="middle" fill="#c4b5fd" fontSize="7">SGA + PGA</text>
    <rect x="100" y="105" width="340" height="30" rx="4" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="2"/>
    <text x="270" y="125" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Cache Fusion (Interconnect)</text>
    <rect x="100" y="145" width="340" height="25" rx="4" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="270" y="162" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Shared Storage (ASM)</text>
    <rect x="480" y="45" width="170" height="90" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="565" y="65" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Data Guard</text>
    <text x="500" y="85" fill="#fcd34d" fontSize="7">• Physical standby</text>
    <text x="500" y="100" fill="#fcd34d" fontSize="7">• Logical standby</text>
    <text x="500" y="115" fill="#fcd34d" fontSize="7">• Auto failover</text>
    <text x="500" y="130" fill="#fcd34d" fontSize="7">• Active Data Guard</text>
    <text x="350" y="175" textAnchor="middle" fill="#64748b" fontSize="9">No single point of failure • Linear scalability • Automatic failover</text>
  </svg>
)

// Security & Auditing Diagram
const SecurityDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Oracle Security Layers</text>
    <rect x="50" y="50" width="120" height="70" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="110" y="75" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Authentication</text>
    <text x="110" y="92" textAnchor="middle" fill="#93c5fd" fontSize="7">Users/Roles</text>
    <text x="110" y="107" textAnchor="middle" fill="#93c5fd" fontSize="7">LDAP/Kerberos</text>
    <rect x="190" y="50" width="120" height="70" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="250" y="75" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">VPD</text>
    <text x="250" y="92" textAnchor="middle" fill="#c4b5fd" fontSize="7">Row-level security</text>
    <text x="250" y="107" textAnchor="middle" fill="#c4b5fd" fontSize="7">Policy functions</text>
    <rect x="330" y="50" width="120" height="70" rx="6" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" strokeWidth="2"/>
    <text x="390" y="75" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">TDE</text>
    <text x="390" y="92" textAnchor="middle" fill="#86efac" fontSize="7">Data encryption</text>
    <text x="390" y="107" textAnchor="middle" fill="#86efac" fontSize="7">Wallet mgmt</text>
    <rect x="470" y="50" width="120" height="70" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="530" y="75" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Audit</text>
    <text x="530" y="92" textAnchor="middle" fill="#fcd34d" fontSize="7">Unified audit</text>
    <text x="530" y="107" textAnchor="middle" fill="#fcd34d" fontSize="7">Fine-grained</text>
    <rect x="150" y="130" width="400" height="20" rx="4" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" strokeWidth="1"/>
    <text x="350" y="145" textAnchor="middle" fill="#f87171" fontSize="9">Database Vault • Label Security • Data Redaction</text>
  </svg>
)

// Data Warehousing Diagram
const DataWarehousingDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Oracle Data Warehouse Architecture</text>
    <rect x="50" y="50" width="130" height="70" rx="6" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" strokeWidth="2"/>
    <text x="115" y="72" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Star Schema</text>
    <text x="115" y="90" textAnchor="middle" fill="#86efac" fontSize="7">Fact + Dimensions</text>
    <text x="115" y="105" textAnchor="middle" fill="#86efac" fontSize="7">Bitmap indexes</text>
    <rect x="200" y="50" width="130" height="70" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="265" y="72" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Materialized Views</text>
    <text x="265" y="90" textAnchor="middle" fill="#93c5fd" fontSize="7">Pre-aggregation</text>
    <text x="265" y="105" textAnchor="middle" fill="#93c5fd" fontSize="7">Query rewrite</text>
    <rect x="350" y="50" width="130" height="70" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="415" y="72" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Parallel Query</text>
    <text x="415" y="90" textAnchor="middle" fill="#c4b5fd" fontSize="7">Multi-CPU scaling</text>
    <text x="415" y="105" textAnchor="middle" fill="#c4b5fd" fontSize="7">DOP tuning</text>
    <rect x="500" y="50" width="150" height="70" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="575" y="72" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Analytics</text>
    <text x="575" y="90" textAnchor="middle" fill="#fcd34d" fontSize="7">Window functions</text>
    <text x="575" y="105" textAnchor="middle" fill="#fcd34d" fontSize="7">PIVOT/MODEL</text>
    <rect x="150" y="135" width="400" height="30" rx="4" fill="rgba(236, 72, 153, 0.15)" stroke="#ec4899" strokeWidth="1"/>
    <text x="350" y="155" textAnchor="middle" fill="#f472b6" fontSize="9">Compression • Partitioning • Direct-Path Load • External Tables</text>
    <text x="350" y="175" textAnchor="middle" fill="#64748b" fontSize="9">Optimized for analytical queries and large-scale data processing</text>
  </svg>
)

// Advanced Features Diagram
const AdvancedFeaturesDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Oracle Advanced Features</text>
    <rect x="50" y="50" width="140" height="60" rx="6" fill="rgba(20, 184, 166, 0.3)" stroke="#14b8a6" strokeWidth="2"/>
    <text x="120" y="72" textAnchor="middle" fill="#2dd4bf" fontSize="9" fontWeight="bold">In-Memory</text>
    <text x="120" y="90" textAnchor="middle" fill="#5eead4" fontSize="7">Column store</text>
    <text x="120" y="102" textAnchor="middle" fill="#5eead4" fontSize="7">Analytics boost</text>
    <rect x="210" y="50" width="140" height="60" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="280" y="72" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Multitenant</text>
    <text x="280" y="90" textAnchor="middle" fill="#fcd34d" fontSize="7">CDB + PDBs</text>
    <text x="280" y="102" textAnchor="middle" fill="#fcd34d" fontSize="7">Consolidation</text>
    <rect x="370" y="50" width="140" height="60" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="440" y="72" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">JSON/XML</text>
    <text x="440" y="90" textAnchor="middle" fill="#93c5fd" fontSize="7">Native types</text>
    <text x="440" y="102" textAnchor="middle" fill="#93c5fd" fontSize="7">Path queries</text>
    <rect x="530" y="50" width="140" height="60" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="600" y="72" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Spatial/Graph</text>
    <text x="600" y="90" textAnchor="middle" fill="#c4b5fd" fontSize="7">Geographic data</text>
    <text x="600" y="102" textAnchor="middle" fill="#c4b5fd" fontSize="7">Network models</text>
    <text x="350" y="135" textAnchor="middle" fill="#64748b" fontSize="9">Edition-Based Redefinition • Advanced Queuing • Sharding</text>
  </svg>
)

// Oracle Cloud & Exadata Diagram
const CloudExadataDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">{`Oracle Cloud & Exadata`}</text>
    <rect x="50" y="50" width="180" height="80" rx="6" fill="rgba(99, 102, 241, 0.3)" stroke="#6366f1" strokeWidth="2"/>
    <text x="140" y="72" textAnchor="middle" fill="#818cf8" fontSize="10" fontWeight="bold">Autonomous DB</text>
    <text x="140" y="92" textAnchor="middle" fill="#a5b4fc" fontSize="8">Self-driving</text>
    <text x="140" y="107" textAnchor="middle" fill="#a5b4fc" fontSize="8">Self-securing</text>
    <text x="140" y="122" textAnchor="middle" fill="#a5b4fc" fontSize="8">Self-repairing</text>
    <rect x="260" y="50" width="180" height="80" rx="6" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <text x="350" y="72" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Exadata</text>
    <text x="350" y="92" textAnchor="middle" fill="#fca5a5" fontSize="8">Smart Scan</text>
    <text x="350" y="107" textAnchor="middle" fill="#fca5a5" fontSize="8">Flash cache</text>
    <text x="350" y="122" textAnchor="middle" fill="#fca5a5" fontSize="8">InfiniBand</text>
    <rect x="470" y="50" width="180" height="80" rx="6" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" strokeWidth="2"/>
    <text x="560" y="72" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Cloud Services</text>
    <text x="560" y="92" textAnchor="middle" fill="#86efac" fontSize="8">DBCS / VMDB</text>
    <text x="560" y="107" textAnchor="middle" fill="#86efac" fontSize="8">Auto backups</text>
    <text x="560" y="122" textAnchor="middle" fill="#86efac" fontSize="8">Scaling</text>
    <rect x="150" y="145" width="400" height="25" rx="4" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="350" y="162" textAnchor="middle" fill="#fbbf24" fontSize="9">ORDS REST APIs • GoldenGate • Zero Downtime Migration</text>
    <text x="350" y="180" textAnchor="middle" fill="#64748b" fontSize="9">Machine learning optimization • Automatic tuning • Elastic resources</text>
  </svg>
)

// DBA Operations Diagram
const DBAOperationsDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Oracle DBA Operations</text>
    <rect x="50" y="50" width="140" height="60" rx="6" fill="rgba(236, 72, 153, 0.3)" stroke="#ec4899" strokeWidth="2"/>
    <text x="120" y="72" textAnchor="middle" fill="#f472b6" fontSize="9" fontWeight="bold">DB Creation</text>
    <text x="120" y="90" textAnchor="middle" fill="#f9a8d4" fontSize="7">DBCA • Scripts</text>
    <text x="120" y="102" textAnchor="middle" fill="#f9a8d4" fontSize="7">Parameters</text>
    <rect x="210" y="50" width="140" height="60" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="280" y="72" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Space Mgmt</text>
    <text x="280" y="90" textAnchor="middle" fill="#93c5fd" fontSize="7">Tablespaces</text>
    <text x="280" y="102" textAnchor="middle" fill="#93c5fd" fontSize="7">Segments</text>
    <rect x="370" y="50" width="140" height="60" rx="6" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" strokeWidth="2"/>
    <text x="440" y="72" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Maintenance</text>
    <text x="440" y="90" textAnchor="middle" fill="#86efac" fontSize="7">Statistics</text>
    <text x="440" y="102" textAnchor="middle" fill="#86efac" fontSize="7">Advisors</text>
    <rect x="530" y="50" width="140" height="60" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="600" y="72" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Monitoring</text>
    <text x="600" y="90" textAnchor="middle" fill="#fcd34d" fontSize="7">EM Cloud Control</text>
    <text x="600" y="102" textAnchor="middle" fill="#fcd34d" fontSize="7">V$ / DBA_ views</text>
    <text x="350" y="135" textAnchor="middle" fill="#64748b" fontSize="9">RMAN • Data Pump • Alert logs • Wait events • ASH/AWR</text>
  </svg>
)

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
      .replace(/\b(SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|OUTER|CROSS|ON|AND|OR|NOT|IN|EXISTS|BETWEEN|LIKE|IS|NULL|AS|ORDER|BY|GROUP|HAVING|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|ALTER|DROP|INDEX|PRIMARY|KEY|FOREIGN|REFERENCES|UNIQUE|CONSTRAINT|DEFAULT|CHECK|CASCADE|DISTINCT|UNION|ALL|CASE|WHEN|THEN|ELSE|END|WITH|OVER|PARTITION|ROW_NUMBER|RANK|DENSE_RANK|CONNECT|START|PRIOR|LEVEL|ROWNUM|ROWID|SYSDATE|DUAL|DECODE|NVL|NVL2|TO_CHAR|TO_DATE|TO_NUMBER|TRUNC|ROUND|SUBSTR|INSTR|REPLACE|TRIM|UPPER|LOWER|INITCAP|CONCAT|LENGTH|COUNT|SUM|AVG|MIN|MAX|GRANT|REVOKE|COMMIT|ROLLBACK|SAVEPOINT|BEGIN|END|DECLARE|EXCEPTION|RAISE|LOOP|EXIT|CURSOR|OPEN|CLOSE|FETCH|FOR|IF|ELSIF|PROCEDURE|FUNCTION|PACKAGE|BODY|RETURN|TYPE|RECORD|BULK|COLLECT|FORALL|EXECUTE|IMMEDIATE|MERGE|USING|MATCHED|TABLESPACE|SEQUENCE|SYNONYM|VIEW|TRIGGER|BEFORE|AFTER|EACH|ROW|INSTEAD|OF|PRAGMA|AUTONOMOUS_TRANSACTION|DBMS_OUTPUT|PUT_LINE)\b/gi, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(NUMBER|VARCHAR2|CHAR|DATE|TIMESTAMP|CLOB|BLOB|NVARCHAR2|NCLOB|RAW|LONG|BINARY_FLOAT|BINARY_DOUBLE|BOOLEAN|PLS_INTEGER|BINARY_INTEGER|SYS_REFCURSOR|EXCEPTION|XMLTYPE|SDO_GEOMETRY)\b/gi, '<span style="color: #4ec9b0;">$1</span>')
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
      diagram: PLSQLDiagram,
      details: [
        {
          name: 'Stored Procedures & Functions',
          explanation: 'PL/SQL procedures for business logic encapsulation. Functions return single values. Packages group related procedures and functions. Public and private declarations. Package state persistence within session. Overloading for polymorphism.',
          codeExample: `-- Procedure with IN/OUT parameters
CREATE OR REPLACE PROCEDURE transfer_funds(
  p_from_acct IN NUMBER,
  p_to_acct   IN NUMBER,
  p_amount    IN NUMBER,
  p_status    OUT VARCHAR2
) AS
BEGIN
  UPDATE accounts SET balance = balance - p_amount
    WHERE account_id = p_from_acct;
  UPDATE accounts SET balance = balance + p_amount
    WHERE account_id = p_to_acct;
  p_status := 'SUCCESS';
  COMMIT;
EXCEPTION
  WHEN OTHERS THEN
    ROLLBACK;
    p_status := 'ERROR: ' || SQLERRM;
END transfer_funds;`
        },
        {
          name: 'Triggers',
          explanation: 'Before/after triggers on DML operations. Statement-level and row-level triggers. Instead-of triggers for views. Compound triggers for performance. Mutating table challenges and solutions. Audit and logging use cases.',
          codeExample: `-- Audit trigger: log all changes to employees
CREATE OR REPLACE TRIGGER trg_emp_audit
BEFORE UPDATE OR DELETE ON employees
FOR EACH ROW
BEGIN
  INSERT INTO emp_audit_log (
    action, emp_id, old_salary, new_salary,
    changed_by, changed_at
  ) VALUES (
    CASE WHEN UPDATING THEN 'UPDATE' ELSE 'DELETE' END,
    :OLD.employee_id,
    :OLD.salary,
    NVL(:NEW.salary, :OLD.salary),
    USER,
    SYSDATE
  );
END;`
        },
        {
          name: 'Cursors & Bulk Processing',
          explanation: 'Explicit cursors for row-by-row processing. Cursor FOR loops for simplicity. REF cursors for dynamic result sets. BULK COLLECT for array fetching. FORALL for bulk DML. Optimize PL/SQL with bulk operations.',
          codeExample: `-- BULK COLLECT + FORALL for efficient processing
DECLARE
  TYPE t_emp_ids IS TABLE OF employees.employee_id%TYPE;
  l_ids t_emp_ids;
BEGIN
  SELECT employee_id BULK COLLECT INTO l_ids
    FROM employees
    WHERE department_id = 50;

  FORALL i IN l_ids.FIRST .. l_ids.LAST
    UPDATE employees
      SET salary = salary * 1.10
      WHERE employee_id = l_ids(i);

  DBMS_OUTPUT.PUT_LINE(l_ids.COUNT || ' rows updated');
  COMMIT;
END;`
        },
        {
          name: 'Exception Handling',
          explanation: 'Predefined exceptions like NO_DATA_FOUND, TOO_MANY_ROWS. User-defined exceptions with RAISE. EXCEPTION_INIT pragma for error mapping. SQLCODE and SQLERRM for error details. Propagation and handling hierarchy.',
          codeExample: `-- Custom exception with PRAGMA EXCEPTION_INIT
DECLARE
  e_salary_too_high EXCEPTION;
  PRAGMA EXCEPTION_INIT(e_salary_too_high, -20001);
  l_salary NUMBER;
BEGIN
  SELECT salary INTO l_salary
    FROM employees WHERE employee_id = 100;

  IF l_salary > 50000 THEN
    RAISE_APPLICATION_ERROR(-20001,
      'Salary exceeds limit: ' || TO_CHAR(l_salary));
  END IF;
EXCEPTION
  WHEN NO_DATA_FOUND THEN
    DBMS_OUTPUT.PUT_LINE('Employee not found');
  WHEN e_salary_too_high THEN
    DBMS_OUTPUT.PUT_LINE(SQLERRM);
END;`
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
      diagram: PerformanceTuningDiagram,
      details: [
        {
          name: 'Execution Plans & AWR',
          explanation: 'EXPLAIN PLAN shows query execution strategy. Automatic Workload Repository (AWR) for historical analysis. ADDM for automated diagnostics. SQL Tuning Advisor for recommendations. Trace files with TKPROF for deep analysis.',
          codeExample: `-- View execution plan for a query
EXPLAIN PLAN FOR
SELECT e.last_name, d.department_name
  FROM employees e
  JOIN departments d ON e.department_id = d.department_id
  WHERE e.salary > 10000;

SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY(
  format => 'ALL +PREDICATE +COST'));

-- Generate AWR report between two snapshots
SELECT * FROM TABLE(
  DBMS_WORKLOAD_REPOSITORY.AWR_REPORT_TEXT(
    l_dbid     => (SELECT dbid FROM v$database),
    l_inst_num => 1,
    l_bid      => 100,  -- begin snapshot
    l_eid      => 110   -- end snapshot
));`
        },
        {
          name: 'Optimizer & Hints',
          explanation: 'Cost-based optimizer (CBO) uses statistics. Hints guide optimizer decisions (INDEX, FULL, PARALLEL). Cardinality feedback for iterative tuning. Adaptive query optimization. SQL Plan Management for stability.',
          codeExample: `-- Use hints to guide the optimizer
SELECT /*+ INDEX(e idx_emp_dept) PARALLEL(e, 4) */
       e.employee_id, e.last_name, e.salary
  FROM employees e
  WHERE e.department_id = 50
  ORDER BY e.salary DESC;

-- Gather fresh optimizer statistics
BEGIN
  DBMS_STATS.GATHER_TABLE_STATS(
    ownname    => 'HR',
    tabname    => 'EMPLOYEES',
    method_opt => 'FOR ALL COLUMNS SIZE AUTO',
    degree     => 4,
    cascade    => TRUE
  );
END;`
        },
        {
          name: 'Indexing Strategies',
          explanation: 'B-tree indexes for range queries. Bitmap indexes for low-cardinality columns. Function-based indexes for expressions. Invisible indexes for testing. Index compression and partitioned indexes. Monitor index usage with V$OBJECT_USAGE.',
          codeExample: `-- Function-based index for case-insensitive search
CREATE INDEX idx_emp_upper_name
  ON employees (UPPER(last_name));

SELECT * FROM employees
  WHERE UPPER(last_name) = 'SMITH';

-- Bitmap index for low-cardinality column
CREATE BITMAP INDEX idx_emp_status
  ON employees (employment_status);

-- Invisible index: test without affecting plans
CREATE INDEX idx_emp_hire INVISIBLE
  ON employees (hire_date);
ALTER INDEX idx_emp_hire VISIBLE;`
        },
        {
          name: 'Partitioning',
          explanation: 'Range, list, hash, and composite partitioning. Partition pruning for query optimization. Local and global indexes. Partition exchange for data loading. Interval partitioning for automatic management. Reference partitioning for child tables.',
          codeExample: `-- Range partitioning by date with interval
CREATE TABLE orders (
  order_id   NUMBER PRIMARY KEY,
  order_date DATE,
  amount     NUMBER(10,2),
  status     VARCHAR2(20)
)
PARTITION BY RANGE (order_date)
INTERVAL (NUMTOYMINTERVAL(1, 'MONTH'))
(
  PARTITION p_2024_jan VALUES LESS THAN
    (TO_DATE('2024-02-01','YYYY-MM-DD')),
  PARTITION p_2024_feb VALUES LESS THAN
    (TO_DATE('2024-03-01','YYYY-MM-DD'))
);

-- Query uses partition pruning automatically
SELECT * FROM orders
  WHERE order_date >= TO_DATE('2024-03-01','YYYY-MM-DD');`
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
      diagram: RACDiagram,
      details: [
        {
          name: 'Real Application Clusters',
          explanation: 'Multiple instances accessing single database. Cache Fusion for inter-instance communication. Transparent Application Failover (TAF). Services for load balancing. Fast Application Notification (FAN) for connection failover.',
          codeExample: `-- Check RAC instance status
SELECT inst_id, instance_name, status,
       host_name, startup_time
  FROM gv$instance ORDER BY inst_id;

-- Monitor Cache Fusion (global cache) performance
SELECT inst_id,
  SUM(DECODE(name,'gc cr blocks received',value,0)) cr_recv,
  SUM(DECODE(name,'gc current blocks received',value,0)) cur_recv
  FROM gv$sysstat
  WHERE name LIKE 'gc%blocks received'
  GROUP BY inst_id;

-- Create a RAC service for load balancing
BEGIN
  DBMS_SERVICE.CREATE_SERVICE(
    service_name => 'APP_SVC',
    aq_ha_notifications => TRUE,
    failover_method => 'BASIC',
    failover_type => 'SELECT'
  );
END;`
        },
        {
          name: 'Data Guard',
          explanation: 'Physical standby for exact replica. Logical standby for read-write reporting. Active Data Guard for read-only queries. Fast-Start Failover for automatic failover. Observer process monitors primary and standby.',
          codeExample: `-- Check Data Guard status from primary
SELECT dest_id, status, error,
       DECODE(protection_mode,
         'MAXIMUM PERFORMANCE','MaxPerf',
         'MAXIMUM AVAILABILITY','MaxAvail') mode
  FROM v$archive_dest_status
  WHERE type = 'PHYSICAL';

-- Verify sync between primary and standby
SELECT sequence#, applied, archived
  FROM v$archived_log
  WHERE dest_id = 2
  ORDER BY sequence# DESC
  FETCH FIRST 5 ROWS ONLY;

-- Switchover to standby (run on primary)
ALTER DATABASE COMMIT TO SWITCHOVER
  TO PHYSICAL STANDBY WITH SESSION SHUTDOWN;`
        },
        {
          name: 'RMAN Backup & Recovery',
          explanation: 'Recovery Manager for backups. Full, incremental, and cumulative backups. Block change tracking for efficiency. Backup compression and encryption. Point-in-time recovery (PITR). Flashback technology for data recovery.',
          codeExample: `-- RMAN incremental backup with compression
-- Run from RMAN command line
CONFIGURE COMPRESSION ALGORITHM 'ZSTD';

BACKUP INCREMENTAL LEVEL 0
  DATABASE PLUS ARCHIVELOG
  TAG 'WEEKLY_FULL';

BACKUP INCREMENTAL LEVEL 1
  DATABASE PLUS ARCHIVELOG
  TAG 'DAILY_INCR';

-- Point-in-time recovery
RUN {
  SET UNTIL TIME "TO_DATE('2024-06-15 14:00','YYYY-MM-DD HH24:MI')";
  RESTORE DATABASE;
  RECOVER DATABASE;
}
ALTER DATABASE OPEN RESETLOGS;`
        },
        {
          name: 'ASM & Storage',
          explanation: 'Automatic Storage Management for database files. Disk groups with redundancy. ASM rebalancing for load distribution. ACFS for cluster file systems. Intelligent data placement.',
          codeExample: `-- Create ASM disk group with normal redundancy
CREATE DISKGROUP data_dg
  NORMAL REDUNDANCY
  FAILGROUP fg1 DISK '/dev/sdb1', '/dev/sdc1'
  FAILGROUP fg2 DISK '/dev/sdd1', '/dev/sde1'
  ATTRIBUTE 'compatible.asm' = '19.0';

-- Check ASM disk group usage
SELECT name, total_mb, free_mb,
  ROUND((1 - free_mb/total_mb) * 100, 1) pct_used
  FROM v$asm_diskgroup;

-- Add disk and rebalance
ALTER DISKGROUP data_dg ADD DISK '/dev/sdf1'
  REBALANCE POWER 8;`
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
      diagram: SecurityDiagram,
      details: [
        {
          name: 'Fine-Grained Access',
          explanation: 'Virtual Private Database (VPD) for row-level security. DBMS_RLS policies. Application contexts for session attributes. Secure application roles. Label security for classified data.',
          codeExample: `-- VPD policy: users only see their department
CREATE OR REPLACE FUNCTION dept_security_policy(
  p_schema IN VARCHAR2, p_table IN VARCHAR2
) RETURN VARCHAR2 AS
BEGIN
  RETURN 'department_id = SYS_CONTEXT(''APP_CTX'',''DEPT_ID'')';
END;
/

-- Attach policy to employees table
BEGIN
  DBMS_RLS.ADD_POLICY(
    object_schema   => 'HR',
    object_name     => 'EMPLOYEES',
    policy_name     => 'DEPT_FILTER',
    function_schema => 'HR',
    policy_function => 'DEPT_SECURITY_POLICY',
    statement_types => 'SELECT,UPDATE,DELETE'
  );
END;`
        },
        {
          name: 'Encryption',
          explanation: 'Transparent Data Encryption (TDE) for tablespaces and columns. Network encryption with SSL/TLS. Encrypted backup sets. Wallet management for keys. Advanced Encryption Standard (AES).',
          codeExample: `-- Create encrypted tablespace with TDE
ALTER SYSTEM SET ENCRYPTION KEY
  IDENTIFIED BY "wallet_password";

CREATE TABLESPACE secure_ts
  DATAFILE '/oradata/secure01.dbf' SIZE 500M
  ENCRYPTION USING 'AES256'
  DEFAULT STORAGE(ENCRYPT);

-- Encrypt individual column
ALTER TABLE customers MODIFY (
  credit_card_num ENCRYPT USING 'AES256'
);

-- Verify encryption status
SELECT tablespace_name, encrypted
  FROM dba_tablespaces
  WHERE encrypted = 'YES';`
        },
        {
          name: 'Auditing',
          explanation: 'Unified Audit Trail for comprehensive logging. Fine-grained audit (FGA) for specific access patterns. Mandatory auditing for privileged users. AUDIT_ADMIN role for audit management. Audit policies and conditions.',
          codeExample: `-- Create unified audit policy for salary access
CREATE AUDIT POLICY salary_audit_pol
  ACTIONS SELECT ON hr.employees
  WHEN 'SYS_CONTEXT(''USERENV'',''SESSION_USER'') != ''HR'''
  EVALUATE PER SESSION;

AUDIT POLICY salary_audit_pol;

-- Fine-grained auditing on sensitive columns
BEGIN
  DBMS_FGA.ADD_POLICY(
    object_schema => 'HR',
    object_name   => 'EMPLOYEES',
    policy_name   => 'FGA_SALARY',
    audit_column  => 'SALARY,COMMISSION_PCT',
    audit_condition => 'SALARY > 15000'
  );
END;

-- Query audit trail
SELECT event_timestamp, dbusername, action_name,
       object_name, sql_text
  FROM unified_audit_trail
  WHERE unified_audit_policies = 'SALARY_AUDIT_POL';`
        },
        {
          name: 'User Management',
          explanation: 'Database users and schemas. Password policies and profiles. Account locking and expiration. External authentication with LDAP/Kerberos. Proxy authentication for application users.',
          codeExample: `-- Create user with password profile
CREATE PROFILE app_user_profile LIMIT
  FAILED_LOGIN_ATTEMPTS 5
  PASSWORD_LIFE_TIME 90
  PASSWORD_REUSE_MAX 10
  PASSWORD_LOCK_TIME 1;

CREATE USER app_user
  IDENTIFIED BY "SecureP@ss123"
  DEFAULT TABLESPACE users
  QUOTA 500M ON users
  PROFILE app_user_profile;

GRANT CREATE SESSION, CREATE TABLE TO app_user;

-- Proxy authentication for app connections
ALTER USER app_user
  GRANT CONNECT THROUGH proxy_user;`
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
      diagram: DataWarehousingDiagram,
      details: [
        {
          name: 'Materialized Views',
          explanation: 'Pre-computed query results for performance. Fast refresh with materialized view logs. Complete and incremental refresh. Query rewrite for transparent use. Refresh on commit or on demand. Partition change tracking (PCT).',
          codeExample: `-- Create MV log for fast refresh
CREATE MATERIALIZED VIEW LOG ON sales
  WITH ROWID, PRIMARY KEY (product_id, sale_date, amount)
  INCLUDING NEW VALUES;

-- Materialized view with fast refresh
CREATE MATERIALIZED VIEW mv_daily_sales
  REFRESH FAST ON DEMAND
  ENABLE QUERY REWRITE
AS
SELECT product_id,
       TRUNC(sale_date) sale_day,
       SUM(amount) total_amount,
       COUNT(*) sale_count
  FROM sales
  GROUP BY product_id, TRUNC(sale_date);

-- Manual refresh
BEGIN
  DBMS_MVIEW.REFRESH('MV_DAILY_SALES', 'F');
END;`
        },
        {
          name: 'Star Schema Design',
          explanation: 'Fact tables with measures and foreign keys. Dimension tables with attributes. Star queries with bitmap indexes. Bitmap join indexes for optimization. Dimension hierarchies and aggregations.',
          codeExample: `-- Fact table with dimension foreign keys
CREATE TABLE fact_sales (
  sale_id      NUMBER PRIMARY KEY,
  product_key  NUMBER REFERENCES dim_product(product_key),
  time_key     NUMBER REFERENCES dim_time(time_key),
  store_key    NUMBER REFERENCES dim_store(store_key),
  quantity     NUMBER,
  revenue      NUMBER(12,2)
);

-- Bitmap index on dimension FK (low cardinality)
CREATE BITMAP INDEX bm_sales_store
  ON fact_sales (store_key);

-- Star transformation query
SELECT /*+ STAR_TRANSFORMATION */
  p.category, t.quarter, SUM(f.revenue)
  FROM fact_sales f, dim_product p, dim_time t
  WHERE f.product_key = p.product_key
    AND f.time_key = t.time_key
    AND p.category = 'Electronics'
  GROUP BY p.category, t.quarter;`
        },
        {
          name: 'Parallel Processing',
          explanation: 'Parallel query execution across CPUs. Parallel DML for bulk operations. Parallel DDL for index creation. Degree of parallelism (DOP) tuning. Parallel execution servers and queuing.',
          codeExample: `-- Enable parallel DML for bulk operations
ALTER SESSION ENABLE PARALLEL DML;

-- Parallel insert from staging
INSERT /*+ APPEND PARALLEL(t, 8) */
  INTO fact_sales t
  SELECT /*+ PARALLEL(s, 8) */ *
    FROM staging_sales s
    WHERE s.load_date = TRUNC(SYSDATE);

COMMIT;

-- Parallel index rebuild
ALTER INDEX idx_sales_date REBUILD
  PARALLEL 8 NOLOGGING;
ALTER INDEX idx_sales_date NOPARALLEL;

-- Check parallel execution stats
SELECT px_servers_requested, px_servers_allocated
  FROM v$sql_monitor
  WHERE sql_id = 'abc123def';`
        },
        {
          name: 'Data Loading',
          explanation: 'SQL*Loader for external file loading. External tables for direct access. Direct-path insert for bulk loading. Parallel loading for performance. Error handling and bad file logging.',
          codeExample: `-- External table for CSV file access
CREATE TABLE ext_sales_data (
  product_id NUMBER,
  sale_date  DATE,
  amount     NUMBER(10,2),
  region     VARCHAR2(50)
)
ORGANIZATION EXTERNAL (
  TYPE ORACLE_LOADER
  DEFAULT DIRECTORY data_dir
  ACCESS PARAMETERS (
    RECORDS DELIMITED BY NEWLINE
    FIELDS TERMINATED BY ','
    OPTIONALLY ENCLOSED BY '"'
    MISSING FIELD VALUES ARE NULL
    (product_id, sale_date DATE 'YYYY-MM-DD',
     amount, region)
  )
  LOCATION ('sales_2024.csv')
)
REJECT LIMIT UNLIMITED;

-- Direct-path load from external table
INSERT /*+ APPEND */ INTO sales
  SELECT * FROM ext_sales_data;`
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
      diagram: AdvancedFeaturesDiagram,
      details: [
        {
          name: 'In-Memory Column Store',
          explanation: 'Dual-format architecture (row and column). In-memory aggregation and analytics. Automatic DML synchronization. In-memory expressions for computed columns. Population strategies (on demand, priority). Dramatic query speedup.',
          codeExample: `-- Enable In-Memory on a table
ALTER TABLE sales INMEMORY
  PRIORITY CRITICAL
  MEMCOMPRESS FOR QUERY HIGH;

-- Check In-Memory population status
SELECT segment_name, inmemory_size,
       bytes_not_populated, populate_status
  FROM v$im_segments;

-- Query benefits from columnar scan automatically
SELECT region, TRUNC(sale_date,'Q') quarter,
       SUM(amount) total, COUNT(*) cnt
  FROM sales
  WHERE sale_date >= TO_DATE('2024-01-01','YYYY-MM-DD')
  GROUP BY region, TRUNC(sale_date,'Q')
  ORDER BY total DESC;`
        },
        {
          name: 'Edition-Based Redefinition',
          explanation: 'Online application upgrades without downtime. Multiple code versions (editions). Cross-edition triggers for data transformation. Edition retirement after deployment. Backward compatibility during transition.',
          codeExample: `-- Create a new edition for v2 deployment
CREATE EDITION v2_release;

-- Switch session to the new edition
ALTER SESSION SET EDITION = v2_release;

-- Modify procedure in new edition only
CREATE OR REPLACE PROCEDURE calc_bonus(
  p_emp_id NUMBER
) AS
  l_salary NUMBER;
BEGIN
  SELECT salary INTO l_salary
    FROM employees WHERE employee_id = p_emp_id;
  -- New logic in v2: tiered bonus
  UPDATE employees SET commission_pct =
    CASE WHEN l_salary > 10000 THEN 0.15
         WHEN l_salary > 5000  THEN 0.10
         ELSE 0.05 END
    WHERE employee_id = p_emp_id;
END;`
        },
        {
          name: 'JSON & XML Support',
          explanation: 'Native JSON data type. JSON_TABLE for relational projection. JSON path expressions. XML storage with XMLType. XQuery for XML querying. JSON and XML indexing.',
          codeExample: `-- Table with JSON column
CREATE TABLE products (
  id   NUMBER PRIMARY KEY,
  data JSON
);

INSERT INTO products VALUES (1,
  '{"name":"Laptop","specs":{"ram":16,"storage":512},"tags":["electronics","portable"]}');

-- Query JSON with dot notation and JSON_TABLE
SELECT p.data.name,
       p.data.specs.ram AS ram_gb,
       jt.tag
  FROM products p,
  JSON_TABLE(p.data, '$.tags[*]'
    COLUMNS (tag VARCHAR2(50) PATH '$')
  ) jt;

-- JSON search index for full-text queries
CREATE SEARCH INDEX idx_prod_json
  ON products (data) FOR JSON;`
        },
        {
          name: 'Multitenant Architecture',
          explanation: 'Container database (CDB) with pluggable databases (PDBs). Resource isolation and management. Rapid provisioning with cloning. Easier patching and upgrades. Consolidation benefits.',
          codeExample: `-- Create a pluggable database from seed
CREATE PLUGGABLE DATABASE sales_pdb
  ADMIN USER pdb_admin IDENTIFIED BY "P@ss123"
  FILE_NAME_CONVERT = (
    '/oradata/pdbseed/', '/oradata/sales_pdb/'
  )
  STORAGE (MAXSIZE 50G);

ALTER PLUGGABLE DATABASE sales_pdb OPEN;

-- Clone an existing PDB for dev/test
CREATE PLUGGABLE DATABASE sales_dev
  FROM sales_pdb
  FILE_NAME_CONVERT = (
    '/oradata/sales_pdb/', '/oradata/sales_dev/'
  );

-- List all PDBs in the CDB
SELECT pdb_id, pdb_name, status, open_mode
  FROM dba_pdbs ORDER BY pdb_id;`
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
      diagram: CloudExadataDiagram,
      details: [
        {
          name: 'Autonomous Database',
          explanation: 'Self-driving database with machine learning. Self-securing against threats. Self-repairing for high availability. Automated patching and tuning. Workload types: OLTP, data warehouse, JSON, APEX.',
          codeExample: `-- Connect and query Autonomous Database
-- Uses wallet-based authentication
SELECT instance_name, version, status
  FROM v$instance;

-- Auto-scaling is managed, but check resource usage
SELECT cpu_count, max_cpu_count,
       pga_target, sga_target
  FROM v$parameter
  WHERE name IN ('cpu_count','pga_aggregate_target',
                 'sga_target');

-- Schedule automatic maintenance window
BEGIN
  DBMS_CLOUD_ADMIN.SET_MAINTENANCE_WINDOW(
    window_start => '02:00',
    window_end   => '06:00',
    day_of_week  => 'SUNDAY'
  );
END;`
        },
        {
          name: 'Exadata Architecture',
          explanation: 'Engineered system for Oracle Database. Smart Scan offloads processing to storage. Hybrid Columnar Compression. InfiniBand interconnect for low latency. Flash cache for frequently accessed data.',
          codeExample: `-- Check Smart Scan offload statistics
SELECT name, value FROM v$mystat m
  JOIN v$statname s ON m.statistic# = s.statistic#
  WHERE s.name LIKE 'cell%smart%';

-- Enable Hybrid Columnar Compression (HCC)
ALTER TABLE historical_orders COMPRESS
  FOR QUERY HIGH;

-- Monitor flash cache hit ratio
SELECT cell_name,
  ROUND(fc_io_bytes_saved /
    NULLIF(fc_io_bytes_saved + fc_io_bytes_eligible, 0)
    * 100, 1) flash_hit_pct
  FROM v$cell_state
  WHERE statistics_type = 'FLASHCACHE';

-- Check Exadata cell server status
SELECT cell_name, status FROM v$cell;`
        },
        {
          name: 'Cloud Services',
          explanation: 'Oracle Database Cloud Service (DBCS). Bare metal and virtual machines. Automated backups and patching. Scaling compute and storage independently. Data Guard integration for DR.',
          codeExample: `-- OCI CLI: create DB system (command line)
-- oci db system launch --compartment-id <ocid>
--   --shape VM.Standard2.4
--   --db-version 19.0.0.0
--   --display-name "ProdDB"

-- Scale OCPU count dynamically
BEGIN
  DBMS_CLOUD_ADMIN.SCALE_RESOURCE(
    resource_name => 'COMPUTE',
    resource_value => 8  -- scale to 8 OCPUs
  );
END;

-- Verify automated backup schedule
SELECT backup_type, start_time, status,
       output_bytes_display
  FROM v$rman_backup_job_details
  WHERE start_time > SYSDATE - 7
  ORDER BY start_time DESC;`
        },
        {
          name: 'Database Migration',
          explanation: 'Data Pump for logical migration. GoldenGate for real-time replication. Zero Downtime Migration (ZDM) tools. Cloud migration utilities. Assessment and planning tools.',
          codeExample: `-- Data Pump export for migration
-- Run from OS command line:
-- expdp system/password@source_db
--   FULL=Y DIRECTORY=dp_dir
--   DUMPFILE=full_export_%U.dmp
--   PARALLEL=4 COMPRESSION=ALL

-- Data Pump import into target
-- impdp system/password@target_db
--   FULL=Y DIRECTORY=dp_dir
--   DUMPFILE=full_export_%U.dmp
--   PARALLEL=4 TRANSFORM=SEGMENT_ATTRIBUTES:N

-- Check Data Pump job status
SELECT owner_name, job_name, state,
       attached_sessions
  FROM dba_datapump_jobs
  WHERE state = 'EXECUTING';`
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
      diagram: DBAOperationsDiagram,
      details: [
        {
          name: 'Database Creation',
          explanation: 'DBCA for graphical creation. Manual database creation with scripts. Database configuration parameters. Character set selection. Undo and redo sizing. Control file multiplexing.',
          codeExample: `-- Key init parameters for new database
ALTER SYSTEM SET db_name = 'PRODDB' SCOPE=SPFILE;
ALTER SYSTEM SET memory_target = 4G SCOPE=SPFILE;
ALTER SYSTEM SET processes = 500 SCOPE=SPFILE;
ALTER SYSTEM SET open_cursors = 300 SCOPE=SPFILE;
ALTER SYSTEM SET db_recovery_file_dest_size = 50G
  SCOPE=SPFILE;

-- Create tablespaces after DB creation
CREATE TABLESPACE app_data
  DATAFILE '/oradata/PRODDB/app_data01.dbf'
  SIZE 1G AUTOEXTEND ON NEXT 500M MAXSIZE 10G
  SEGMENT SPACE MANAGEMENT AUTO;

CREATE TEMPORARY TABLESPACE app_temp
  TEMPFILE '/oradata/PRODDB/app_temp01.dbf'
  SIZE 500M AUTOEXTEND ON;`
        },
        {
          name: 'Space Management',
          explanation: 'Tablespace administration (permanent, temporary, undo). Segment space management (auto vs manual). Resumable space allocation. Shrinking segments to reclaim space. Monitoring space usage and growth.',
          codeExample: `-- Monitor tablespace usage
SELECT tablespace_name,
  ROUND(used_space * 8192 / 1024 / 1024) used_mb,
  ROUND(tablespace_size * 8192 / 1024 / 1024) total_mb,
  ROUND(used_percent, 1) pct_used
  FROM dba_tablespace_usage_metrics
  ORDER BY used_percent DESC;

-- Find large segments consuming space
SELECT segment_name, segment_type,
  ROUND(bytes / 1024 / 1024) size_mb
  FROM dba_segments
  WHERE tablespace_name = 'APP_DATA'
  ORDER BY bytes DESC
  FETCH FIRST 10 ROWS ONLY;

-- Shrink a fragmented table
ALTER TABLE orders ENABLE ROW MOVEMENT;
ALTER TABLE orders SHRINK SPACE CASCADE;`
        },
        {
          name: 'Maintenance Tasks',
          explanation: 'Statistics gathering with DBMS_STATS. Optimizer statistics management. Segment advisor for fragmentation. SQL Tuning Advisor. ADDM for performance recommendations. Health checks.',
          codeExample: `-- Gather schema statistics with auto-sampling
BEGIN
  DBMS_STATS.GATHER_SCHEMA_STATS(
    ownname    => 'HR',
    options    => 'GATHER AUTO',
    degree     => DBMS_STATS.AUTO_DEGREE,
    cascade    => TRUE,
    no_invalidate => FALSE
  );
END;

-- Run SQL Tuning Advisor on a slow query
DECLARE
  l_task VARCHAR2(64);
BEGIN
  l_task := DBMS_SQLTUNE.CREATE_TUNING_TASK(
    sql_id => 'abc123def456',
    scope  => 'COMPREHENSIVE',
    time_limit => 300
  );
  DBMS_SQLTUNE.EXECUTE_TUNING_TASK(l_task);
END;

-- View tuning recommendations
SELECT DBMS_SQLTUNE.REPORT_TUNING_TASK('task_name')
  FROM DUAL;`
        },
        {
          name: 'Monitoring & Diagnostics',
          explanation: 'Enterprise Manager Cloud Control. AWR reports for performance analysis. ASH (Active Session History). Wait event analysis. Alert log monitoring. V$ and DBA_ views for system state.',
          codeExample: `-- Top wait events in the last hour (ASH)
SELECT event, COUNT(*) samples,
  ROUND(COUNT(*) * 100 /
    SUM(COUNT(*)) OVER(), 1) pct
  FROM v$active_session_history
  WHERE sample_time > SYSDATE - 1/24
    AND event IS NOT NULL
  GROUP BY event
  ORDER BY samples DESC
  FETCH FIRST 10 ROWS ONLY;

-- Find long-running SQL statements
SELECT sql_id, elapsed_time / 1e6 elapsed_sec,
  executions, buffer_gets,
  SUBSTR(sql_text, 1, 80) sql_preview
  FROM v$sql
  WHERE elapsed_time > 10 * 1e6
  ORDER BY elapsed_time DESC
  FETCH FIRST 10 ROWS ONLY;

-- Check alert log for recent errors
SELECT originating_timestamp, message_text
  FROM v$diag_alert_ext
  WHERE originating_timestamp > SYSDATE - 1
    AND message_text LIKE '%ORA-%';`
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

export default Oracle
