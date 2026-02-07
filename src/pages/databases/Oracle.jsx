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
      diagram: PerformanceTuningDiagram,
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
      diagram: RACDiagram,
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
      diagram: SecurityDiagram,
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
      diagram: DataWarehousingDiagram,
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
      diagram: AdvancedFeaturesDiagram,
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
      diagram: CloudExadataDiagram,
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
      diagram: DBAOperationsDiagram,
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

export default Oracle
