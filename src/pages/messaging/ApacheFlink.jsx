/**
 * Apache Flink - Stream Processing Framework
 *
 * Converted to tab_template format with modal-based navigation
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const FLINK_COLORS = {
  primary: '#e11d48',           // Crimson
  primaryHover: '#f43f5e',      // Lighter crimson
  bg: 'rgba(225, 29, 72, 0.1)', // Background with transparency
  border: 'rgba(225, 29, 72, 0.3)', // Border color
  arrow: '#e11d48',             // Arrow/indicator color
  hoverBg: 'rgba(225, 29, 72, 0.2)', // Hover background
  topicBg: 'rgba(225, 29, 72, 0.2)'  // Topic card background
}

const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },    // blue
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },      // green
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },    // amber
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },    // purple
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },    // pink
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },      // cyan
]

// =============================================================================
// DIAGRAM COMPONENTS
// =============================================================================

const StreamProcessingDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-stream" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
      </marker>
    </defs>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Flink Stream Processing Architecture</text>

    <rect x="30" y="45" width="100" height="55" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="80" y="68" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Source</text>
    <text x="80" y="85" textAnchor="middle" fill="#93c5fd" fontSize="8">Kafka/Kinesis</text>

    <rect x="170" y="45" width="100" height="55" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="220" y="68" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Watermark</text>
    <text x="220" y="85" textAnchor="middle" fill="#fcd34d" fontSize="8">Event Time</text>

    <rect x="310" y="45" width="100" height="55" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="360" y="68" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Transform</text>
    <text x="360" y="85" textAnchor="middle" fill="#c4b5fd" fontSize="8">Map/Filter</text>

    <rect x="450" y="45" width="100" height="55" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="500" y="68" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Window</text>
    <text x="500" y="85" textAnchor="middle" fill="#86efac" fontSize="8">Tumbling/Sliding</text>

    <rect x="590" y="45" width="100" height="55" rx="6" fill="rgba(236, 72, 153, 0.3)" stroke="#ec4899" strokeWidth="2"/>
    <text x="640" y="68" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold">Aggregate</text>
    <text x="640" y="85" textAnchor="middle" fill="#fbcfe8" fontSize="8">Sum/Count</text>

    <rect x="700" y="45" width="70" height="55" rx="6" fill="rgba(6, 182, 212, 0.3)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="735" y="68" textAnchor="middle" fill="#22d3ee" fontSize="10" fontWeight="bold">Sink</text>
    <text x="735" y="85" textAnchor="middle" fill="#a5f3fc" fontSize="8">Output</text>

    <path d="M 130 72 L 165 72" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-stream)"/>
    <path d="M 270 72 L 305 72" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-stream)"/>
    <path d="M 410 72 L 445 72" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-stream)"/>
    <path d="M 550 72 L 585 72" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-stream)"/>
    <path d="M 690 72 L 695 72" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-stream)"/>

    <rect x="200" y="125" width="400" height="55" rx="6" fill="rgba(100, 116, 139, 0.15)" stroke="#64748b" strokeWidth="1" strokeDasharray="4"/>
    <text x="400" y="148" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">Distributed Dataflow Runtime</text>
    <text x="400" y="165" textAnchor="middle" fill="#64748b" fontSize="8">Parallel Execution | Back-pressure | Checkpointing</text>
  </svg>
)

const StatefulComputingDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-state" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
      </marker>
    </defs>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Flink Stateful Computing</text>

    <rect x="50" y="50" width="140" height="130" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="120" y="72" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Keyed State</text>
    <rect x="60" y="85" width="120" height="25" rx="3" fill="rgba(34, 197, 94, 0.4)" stroke="#22c55e" strokeWidth="1"/>
    <text x="120" y="102" textAnchor="middle" fill="#4ade80" fontSize="8">{`ValueState&lt;T&gt;`}</text>
    <rect x="60" y="115" width="120" height="25" rx="3" fill="rgba(245, 158, 11, 0.4)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="120" y="132" textAnchor="middle" fill="#fbbf24" fontSize="8">{`ListState&lt;T&gt;`}</text>
    <rect x="60" y="145" width="120" height="25" rx="3" fill="rgba(139, 92, 246, 0.4)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="120" y="162" textAnchor="middle" fill="#a78bfa" fontSize="8">{`MapState&lt;K,V&gt;`}</text>

    <rect x="250" y="50" width="140" height="130" rx="6" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899" strokeWidth="2"/>
    <text x="320" y="72" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold">State Backend</text>
    <rect x="260" y="85" width="120" height="35" rx="3" fill="rgba(6, 182, 212, 0.3)" stroke="#06b6d4" strokeWidth="1"/>
    <text x="320" y="100" textAnchor="middle" fill="#22d3ee" fontSize="8">HashMapState</text>
    <text x="320" y="112" textAnchor="middle" fill="#a5f3fc" fontSize="7">(In-Memory)</text>
    <rect x="260" y="125" width="120" height="35" rx="3" fill="rgba(99, 102, 241, 0.3)" stroke="#6366f1" strokeWidth="1"/>
    <text x="320" y="140" textAnchor="middle" fill="#818cf8" fontSize="8">RocksDB</text>
    <text x="320" y="152" textAnchor="middle" fill="#a5b4fc" fontSize="7">(Large State)</text>

    <rect x="450" y="50" width="140" height="130" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="520" y="72" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Checkpoint Storage</text>
    <rect x="460" y="85" width="120" height="80" rx="3" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="520" y="105" textAnchor="middle" fill="#fbbf24" fontSize="9">S3 / HDFS</text>
    <text x="520" y="125" textAnchor="middle" fill="#fcd34d" fontSize="8">Periodic Snapshots</text>
    <text x="520" y="145" textAnchor="middle" fill="#fcd34d" fontSize="8">Incremental Backup</text>

    <rect x="650" y="75" width="120" height="80" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="710" y="100" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">State TTL</text>
    <text x="710" y="120" textAnchor="middle" fill="#c4b5fd" fontSize="8">Auto Cleanup</text>
    <text x="710" y="138" textAnchor="middle" fill="#c4b5fd" fontSize="8">Expiration Rules</text>

    <path d="M 190 115 L 245 115" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-state)"/>
    <path d="M 390 115 L 445 115" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-state)"/>
    <path d="M 590 115 L 645 115" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-state)"/>
  </svg>
)

const FaultToleranceDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">{`Flink Checkpointing & Recovery`}</text>

    <rect x="30" y="50" width="80" height="50" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="70" y="72" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Source</text>
    <text x="70" y="88" textAnchor="middle" fill="#93c5fd" fontSize="7">Offset: 100</text>

    <rect x="150" y="50" width="100" height="50" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="200" y="72" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Operator A</text>
    <text x="200" y="88" textAnchor="middle" fill="#fcd34d" fontSize="7">State: {'{ ... }'}</text>

    <rect x="290" y="50" width="100" height="50" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="340" y="72" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Operator B</text>
    <text x="340" y="88" textAnchor="middle" fill="#c4b5fd" fontSize="7">State: {'{ ... }'}</text>

    <rect x="430" y="50" width="80" height="50" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="470" y="72" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Sink</text>
    <text x="470" y="88" textAnchor="middle" fill="#86efac" fontSize="7">Commit</text>

    <line x1="70" y1="110" x2="470" y2="110" stroke="#ec4899" strokeWidth="2" strokeDasharray="8,4"/>
    <text x="270" y="125" textAnchor="middle" fill="#f472b6" fontSize="8" fontWeight="bold">Checkpoint Barrier</text>

    <rect x="550" y="45" width="220" height="60" rx="6" fill="rgba(6, 182, 212, 0.2)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="660" y="68" textAnchor="middle" fill="#22d3ee" fontSize="10" fontWeight="bold">Checkpoint Storage</text>
    <text x="660" y="88" textAnchor="middle" fill="#a5f3fc" fontSize="8">S3/HDFS | Consistent Snapshot</text>

    <rect x="100" y="140" width="200" height="45" rx="6" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899" strokeWidth="2"/>
    <text x="200" y="160" textAnchor="middle" fill="#f472b6" fontSize="9" fontWeight="bold">Chandy-Lamport Algorithm</text>
    <text x="200" y="175" textAnchor="middle" fill="#fbcfe8" fontSize="7">Distributed Snapshots without Pausing</text>

    <rect x="350" y="140" width="200" height="45" rx="6" fill="rgba(99, 102, 241, 0.2)" stroke="#6366f1" strokeWidth="2"/>
    <text x="450" y="160" textAnchor="middle" fill="#818cf8" fontSize="9" fontWeight="bold">Recovery Process</text>
    <text x="450" y="175" textAnchor="middle" fill="#a5b4fc" fontSize="7">Restore State + Rewind Offsets</text>
  </svg>
)

const TableSQLDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-table" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
      </marker>
    </defs>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">{`Flink Table API & SQL`}</text>

    <rect x="50" y="50" width="150" height="60" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="125" y="75" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">SQL Query</text>
    <text x="125" y="95" textAnchor="middle" fill="#93c5fd" fontSize="8">SELECT * FROM stream</text>

    <rect x="250" y="50" width="150" height="60" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="325" y="75" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Query Optimizer</text>
    <text x="325" y="95" textAnchor="middle" fill="#fcd34d" fontSize="8">Volcano/Cascades</text>

    <rect x="450" y="50" width="150" height="60" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="525" y="75" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Execution Plan</text>
    <text x="525" y="95" textAnchor="middle" fill="#c4b5fd" fontSize="8">DataStream API</text>

    <rect x="650" y="50" width="120" height="60" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="710" y="75" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Runtime</text>
    <text x="710" y="95" textAnchor="middle" fill="#86efac" fontSize="8">Parallel Exec</text>

    <path d="M 200 80 L 245 80" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-table)"/>
    <path d="M 400 80 L 445 80" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-table)"/>
    <path d="M 600 80 L 645 80" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-table)"/>

    <rect x="100" y="130" width="140" height="55" rx="6" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899" strokeWidth="2"/>
    <text x="170" y="152" textAnchor="middle" fill="#f472b6" fontSize="9" fontWeight="bold">Dynamic Tables</text>
    <text x="170" y="170" textAnchor="middle" fill="#fbcfe8" fontSize="7">Continuous Queries</text>

    <rect x="280" y="130" width="140" height="55" rx="6" fill="rgba(6, 182, 212, 0.2)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="350" y="152" textAnchor="middle" fill="#22d3ee" fontSize="9" fontWeight="bold">Catalogs</text>
    <text x="350" y="170" textAnchor="middle" fill="#a5f3fc" fontSize="7">Hive/JDBC/Memory</text>

    <rect x="460" y="130" width="140" height="55" rx="6" fill="rgba(99, 102, 241, 0.2)" stroke="#6366f1" strokeWidth="2"/>
    <text x="530" y="152" textAnchor="middle" fill="#818cf8" fontSize="9" fontWeight="bold">Connectors</text>
    <text x="530" y="170" textAnchor="middle" fill="#a5b4fc" fontSize="7">Kafka/FS/JDBC</text>
  </svg>
)

const DeploymentDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Flink Cluster Architecture</text>

    <rect x="300" y="40" width="200" height="55" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="400" y="62" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">JobManager</text>
    <text x="400" y="80" textAnchor="middle" fill="#fcd34d" fontSize="8">Scheduler | Checkpoint Coordinator</text>

    <rect x="50" y="120" width="160" height="70" rx="6" fill="rgba(59, 130, 246, 0.25)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="130" y="142" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">TaskManager 1</text>
    <rect x="60" y="152" width="60" height="28" rx="3" fill="rgba(34, 197, 94, 0.4)" stroke="#22c55e" strokeWidth="1"/>
    <text x="90" y="170" textAnchor="middle" fill="#4ade80" fontSize="7">Slot 1</text>
    <rect x="130" y="152" width="60" height="28" rx="3" fill="rgba(139, 92, 246, 0.4)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="160" y="170" textAnchor="middle" fill="#a78bfa" fontSize="7">Slot 2</text>

    <rect x="250" y="120" width="160" height="70" rx="6" fill="rgba(59, 130, 246, 0.25)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="330" y="142" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">TaskManager 2</text>
    <rect x="260" y="152" width="60" height="28" rx="3" fill="rgba(236, 72, 153, 0.4)" stroke="#ec4899" strokeWidth="1"/>
    <text x="290" y="170" textAnchor="middle" fill="#f472b6" fontSize="7">Slot 3</text>
    <rect x="330" y="152" width="60" height="28" rx="3" fill="rgba(6, 182, 212, 0.4)" stroke="#06b6d4" strokeWidth="1"/>
    <text x="360" y="170" textAnchor="middle" fill="#22d3ee" fontSize="7">Slot 4</text>

    <rect x="450" y="120" width="160" height="70" rx="6" fill="rgba(59, 130, 246, 0.25)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="530" y="142" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">TaskManager 3</text>
    <rect x="460" y="152" width="60" height="28" rx="3" fill="rgba(99, 102, 241, 0.4)" stroke="#6366f1" strokeWidth="1"/>
    <text x="490" y="170" textAnchor="middle" fill="#818cf8" fontSize="7">Slot 5</text>
    <rect x="530" y="152" width="60" height="28" rx="3" fill="rgba(245, 158, 11, 0.4)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="560" y="170" textAnchor="middle" fill="#fbbf24" fontSize="7">Slot 6</text>

    <rect x="650" y="100" width="120" height="90" rx="6" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899" strokeWidth="2"/>
    <text x="710" y="125" textAnchor="middle" fill="#f472b6" fontSize="9" fontWeight="bold">Deployment</text>
    <text x="710" y="145" textAnchor="middle" fill="#fbcfe8" fontSize="7">Kubernetes</text>
    <text x="710" y="160" textAnchor="middle" fill="#fbcfe8" fontSize="7">YARN</text>
    <text x="710" y="175" textAnchor="middle" fill="#fbcfe8" fontSize="7">Standalone</text>

    <path d="M 400 95 L 130 115" stroke="#64748b" strokeWidth="1.5"/>
    <path d="M 400 95 L 330 115" stroke="#64748b" strokeWidth="1.5"/>
    <path d="M 400 95 L 530 115" stroke="#64748b" strokeWidth="1.5"/>
  </svg>
)

const ConnectorsDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-conn" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
      </marker>
    </defs>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Flink Connectors Ecosystem</text>

    <rect x="50" y="45" width="120" height="70" rx="6" fill="rgba(59, 130, 246, 0.25)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="110" y="68" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Sources</text>
    <text x="110" y="85" textAnchor="middle" fill="#93c5fd" fontSize="7">Kafka | Kinesis</text>
    <text x="110" y="98" textAnchor="middle" fill="#93c5fd" fontSize="7">Files | JDBC</text>
    <text x="110" y="111" textAnchor="middle" fill="#93c5fd" fontSize="7">CDC</text>

    <rect x="300" y="35" width="200" height="90" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="400" y="58" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Apache Flink</text>
    <text x="400" y="78" textAnchor="middle" fill="#fcd34d" fontSize="8">{`Stream & Batch Processing`}</text>
    <rect x="320" y="88" width="70" height="25" rx="3" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="355" y="105" textAnchor="middle" fill="#a78bfa" fontSize="7">DataStream</text>
    <rect x="410" y="88" width="70" height="25" rx="3" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="445" y="105" textAnchor="middle" fill="#4ade80" fontSize="7">Table/SQL</text>

    <rect x="630" y="45" width="120" height="70" rx="6" fill="rgba(236, 72, 153, 0.25)" stroke="#ec4899" strokeWidth="2"/>
    <text x="690" y="68" textAnchor="middle" fill="#f472b6" fontSize="9" fontWeight="bold">Sinks</text>
    <text x="690" y="85" textAnchor="middle" fill="#fbcfe8" fontSize="7">Kafka | ES</text>
    <text x="690" y="98" textAnchor="middle" fill="#fbcfe8" fontSize="7">JDBC | S3</text>
    <text x="690" y="111" textAnchor="middle" fill="#fbcfe8" fontSize="7">Redis</text>

    <rect x="100" y="140" width="150" height="45" rx="6" fill="rgba(6, 182, 212, 0.2)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="175" y="160" textAnchor="middle" fill="#22d3ee" fontSize="9" fontWeight="bold">Message Queues</text>
    <text x="175" y="175" textAnchor="middle" fill="#a5f3fc" fontSize="7">RabbitMQ | Pulsar | NATS</text>

    <rect x="300" y="140" width="150" height="45" rx="6" fill="rgba(99, 102, 241, 0.2)" stroke="#6366f1" strokeWidth="2"/>
    <text x="375" y="160" textAnchor="middle" fill="#818cf8" fontSize="9" fontWeight="bold">Databases</text>
    <text x="375" y="175" textAnchor="middle" fill="#a5b4fc" fontSize="7">MySQL | Postgres | MongoDB</text>

    <rect x="500" y="140" width="150" height="45" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="575" y="160" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Cloud Services</text>
    <text x="575" y="175" textAnchor="middle" fill="#86efac" fontSize="7">AWS | GCP | Azure</text>

    <path d="M 170 80 L 295 80" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-conn)"/>
    <path d="M 500 80 L 625 80" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-conn)"/>
  </svg>
)

const PerformanceDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Flink Performance Architecture</text>

    <rect x="50" y="45" width="200" height="70" rx="6" fill="rgba(59, 130, 246, 0.25)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="150" y="68" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Pipelined Execution</text>
    <text x="150" y="88" textAnchor="middle" fill="#93c5fd" fontSize="8">No Batch Boundaries</text>
    <text x="150" y="103" textAnchor="middle" fill="#93c5fd" fontSize="8">Credit-based Flow Control</text>

    <rect x="300" y="45" width="200" height="70" rx="6" fill="rgba(245, 158, 11, 0.25)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="400" y="68" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Memory Management</text>
    <text x="400" y="88" textAnchor="middle" fill="#fcd34d" fontSize="8">Off-Heap Binary Format</text>
    <text x="400" y="103" textAnchor="middle" fill="#fcd34d" fontSize="8">Zero GC Pressure</text>

    <rect x="550" y="45" width="200" height="70" rx="6" fill="rgba(139, 92, 246, 0.25)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="650" y="68" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Network Stack</text>
    <text x="650" y="88" textAnchor="middle" fill="#c4b5fd" fontSize="8">Netty Zero-Copy</text>
    <text x="650" y="103" textAnchor="middle" fill="#c4b5fd" fontSize="8">Compression</text>

    <rect x="100" y="135" width="180" height="55" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="190" y="158" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Operator Chaining</text>
    <text x="190" y="175" textAnchor="middle" fill="#86efac" fontSize="7">Reduce Serialization Overhead</text>

    <rect x="320" y="135" width="180" height="55" rx="6" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899" strokeWidth="2"/>
    <text x="410" y="158" textAnchor="middle" fill="#f472b6" fontSize="9" fontWeight="bold">Slot Sharing</text>
    <text x="410" y="175" textAnchor="middle" fill="#fbcfe8" fontSize="7">Efficient Resource Usage</text>

    <rect x="540" y="135" width="180" height="55" rx="6" fill="rgba(6, 182, 212, 0.2)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="630" y="158" textAnchor="middle" fill="#22d3ee" fontSize="9" fontWeight="bold">Back-Pressure</text>
    <text x="630" y="175" textAnchor="middle" fill="#a5f3fc" fontSize="7">Automatic Flow Control</text>
  </svg>
)

const UseCasesDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Flink Use Cases</text>

    <rect x="300" y="40" width="200" height="50" rx="25" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="400" y="70" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">Apache Flink</text>

    <rect x="50" y="60" width="130" height="50" rx="6" fill="rgba(59, 130, 246, 0.25)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="115" y="82" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Real-time</text>
    <text x="115" y="98" textAnchor="middle" fill="#93c5fd" fontSize="7">Analytics</text>

    <rect x="620" y="60" width="130" height="50" rx="6" fill="rgba(139, 92, 246, 0.25)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="685" y="82" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">ETL</text>
    <text x="685" y="98" textAnchor="middle" fill="#c4b5fd" fontSize="7">Pipelines</text>

    <rect x="50" y="130" width="130" height="50" rx="6" fill="rgba(236, 72, 153, 0.25)" stroke="#ec4899" strokeWidth="2"/>
    <text x="115" y="152" textAnchor="middle" fill="#f472b6" fontSize="9" fontWeight="bold">Fraud</text>
    <text x="115" y="168" textAnchor="middle" fill="#fbcfe8" fontSize="7">Detection</text>

    <rect x="220" y="140" width="130" height="50" rx="6" fill="rgba(34, 197, 94, 0.25)" stroke="#22c55e" strokeWidth="2"/>
    <text x="285" y="162" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">IoT</text>
    <text x="285" y="178" textAnchor="middle" fill="#86efac" fontSize="7">Processing</text>

    <rect x="450" y="140" width="130" height="50" rx="6" fill="rgba(6, 182, 212, 0.25)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="515" y="162" textAnchor="middle" fill="#22d3ee" fontSize="9" fontWeight="bold">ML Feature</text>
    <text x="515" y="178" textAnchor="middle" fill="#a5f3fc" fontSize="7">Engineering</text>

    <rect x="620" y="130" width="130" height="50" rx="6" fill="rgba(99, 102, 241, 0.25)" stroke="#6366f1" strokeWidth="2"/>
    <text x="685" y="152" textAnchor="middle" fill="#818cf8" fontSize="9" fontWeight="bold">Event-Driven</text>
    <text x="685" y="168" textAnchor="middle" fill="#a5b4fc" fontSize="7">Applications</text>

    <path d="M 295 65 L 180 70" stroke="#64748b" strokeWidth="1.5"/>
    <path d="M 500 65 L 615 70" stroke="#64748b" strokeWidth="1.5"/>
    <path d="M 300 85 L 180 125" stroke="#64748b" strokeWidth="1.5"/>
    <path d="M 350 90 L 285 135" stroke="#64748b" strokeWidth="1.5"/>
    <path d="M 450 90 L 515 135" stroke="#64748b" strokeWidth="1.5"/>
    <path d="M 500 85 L 620 125" stroke="#64748b" strokeWidth="1.5"/>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function ApacheFlink({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'stream-processing',
      name: 'Stream Processing',
      icon: '🌊',
      color: '#3b82f6',
      description: 'Unified stream and batch processing framework with event-time handling, windowing, and rich operators',
      diagram: StreamProcessingDiagram,
      details: [
        {
          name: 'Unbounded Streams',
          explanation: 'Process infinite event streams with no defined end. Continuous data ingestion from sources like Kafka, Kinesis. Streaming-first architecture. Handle late-arriving data gracefully. Back-pressure mechanism prevents overwhelming downstream. Native support for real-time analytics and complex event processing.',
          codeExample: `// Reading from Kafka and processing unbounded stream
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

// Kafka source configuration
KafkaSource<String> source = KafkaSource.<String>builder()
    .setBootstrapServers("localhost:9092")
    .setTopics("events")
    .setGroupId("flink-consumer")
    .setStartingOffsets(OffsetsInitializer.earliest())
    .setValueOnlyDeserializer(new SimpleStringSchema())
    .build();

// Process unbounded stream
DataStream<String> stream = env.fromSource(
    source,
    WatermarkStrategy.noWatermarks(),
    "Kafka Source"
);

stream
    .map(event -> processEvent(event))
    .filter(event -> event.isValid())
    .print();

env.execute("Unbounded Stream Processing");`
        },
        {
          name: 'Event Time Processing',
          explanation: 'Process events based on their actual occurrence time, not processing time. Watermarks track event-time progress. Handle out-of-order events. Deterministic results regardless of processing speed. Critical for accurate time-based computations. Allowed lateness for late data.',
          codeExample: `// Event time processing with watermarks
public class EventTimeExample {
    public static void main(String[] args) throws Exception {
        StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

        // Define watermark strategy
        WatermarkStrategy<Event> watermarkStrategy = WatermarkStrategy
            .<Event>forBoundedOutOfOrderness(Duration.ofSeconds(5))
            .withTimestampAssigner((event, timestamp) -> event.getEventTime());

        DataStream<Event> stream = env
            .fromSource(kafkaSource, watermarkStrategy, "Events")
            .keyBy(Event::getUserId)
            .window(TumblingEventTimeWindows.of(Time.minutes(1)))
            .allowedLateness(Time.seconds(10))
            .process(new EventTimeWindowFunction());

        env.execute("Event Time Processing");
    }
}

class EventTimeWindowFunction extends ProcessWindowFunction<Event, Result, String, TimeWindow> {
    @Override
    public void process(String key, Context context, Iterable<Event> events, Collector<Result> out) {
        long count = 0;
        for (Event event : events) {
            count++;
        }
        out.collect(new Result(key, count, context.window().getStart(), context.window().getEnd()));
    }
}`
        },
        {
          name: 'Windowing',
          explanation: 'Group events into finite sets for processing. Tumbling (fixed, non-overlapping), sliding (fixed, overlapping), session (gap-based) windows. Count, processing-time, event-time windows. Triggers control when windows emit. Evictors remove elements. Custom window logic supported.',
          codeExample: `// Various window types demonstration
// 1. Tumbling Window (non-overlapping, fixed size)
stream
    .keyBy(event -> event.getUserId())
    .window(TumblingEventTimeWindows.of(Time.minutes(5)))
    .sum("amount");

// 2. Sliding Window (overlapping, fixed size and slide)
stream
    .keyBy(event -> event.getUserId())
    .window(SlidingEventTimeWindows.of(Time.minutes(10), Time.minutes(5)))
    .aggregate(new AverageAggregate());

// 3. Session Window (dynamic, based on inactivity gap)
stream
    .keyBy(event -> event.getSessionId())
    .window(EventTimeSessionWindows.withGap(Time.minutes(30)))
    .process(new SessionWindowFunction());

// 4. Count Window
stream
    .keyBy(event -> event.getUserId())
    .countWindow(100) // Window of 100 elements
    .reduce((event1, event2) -> combine(event1, event2));

// 5. Global Window with custom trigger
stream
    .keyBy(event -> event.getKey())
    .window(GlobalWindows.create())
    .trigger(CountTrigger.of(1000))
    .evictor(TimeEvictor.of(Time.seconds(100)))
    .apply(new WindowFunction<...>() { ... });`
        },
        {
          name: 'Complex Event Processing',
          explanation: 'Detect patterns in event streams. CEP library for pattern matching. Sequence detection with timing constraints. State machines for complex patterns. AFTER, FOLLOWED BY, NOT patterns. Pattern groups and iterations. Real-time alerting and monitoring use cases.',
          codeExample: `// Complex Event Processing with Flink CEP
import org.apache.flink.cep.CEP;
import org.apache.flink.cep.PatternStream;
import org.apache.flink.cep.pattern.Pattern;
import org.apache.flink.cep.pattern.conditions.SimpleCondition;

DataStream<Event> events = ...;

// Pattern: Detect login followed by payment within 10 minutes
Pattern<Event, ?> pattern = Pattern.<Event>begin("login")
    .where(new SimpleCondition<Event>() {
        @Override
        public boolean filter(Event event) {
            return event.getType().equals("LOGIN");
        }
    })
    .followedBy("payment")
    .where(new SimpleCondition<Event>() {
        @Override
        public boolean filter(Event event) {
            return event.getType().equals("PAYMENT") && event.getAmount() > 1000;
        }
    })
    .within(Time.minutes(10));

// Apply pattern to stream
PatternStream<Event> patternStream = CEP.pattern(
    events.keyBy(Event::getUserId),
    pattern
);

// Extract matched patterns
DataStream<Alert> alerts = patternStream.select(
    (Map<String, List<Event>> pattern) -> {
        Event login = pattern.get("login").get(0);
        Event payment = pattern.get("payment").get(0);
        return new Alert(login.getUserId(), "High-value payment after login", payment.getAmount());
    }
);`
        },
        {
          name: 'Rich Operators',
          explanation: 'Map, FlatMap, Filter, KeyBy, Reduce operations. Windows and time-based operations. Joins (stream-stream, stream-table). CoProcess for multi-input streams. Broadcast state pattern. AsyncIO for external lookups. Process functions for custom logic with state and timers.',
          codeExample: `// Rich Operators demonstration
DataStream<Event> events = ...;

// 1. Map - transform each element
DataStream<String> userIds = events.map(event -> event.getUserId());

// 2. FlatMap - produce 0, 1, or multiple outputs per input
DataStream<String> words = events.flatMap((event, out) -> {
    for (String word : event.getMessage().split(" ")) {
        out.collect(word);
    }
});

// 3. Filter - keep only matching elements
DataStream<Event> highValue = events.filter(event -> event.getAmount() > 1000);

// 4. KeyBy and Reduce
DataStream<Event> maxByUser = events
    .keyBy(Event::getUserId)
    .reduce((e1, e2) -> e1.getAmount() > e2.getAmount() ? e1 : e2);

// 5. Stream-to-stream join (interval join)
DataStream<Order> orders = ...;
DataStream<Payment> payments = ...;

DataStream<OrderPayment> joined = orders
    .keyBy(Order::getOrderId)
    .intervalJoin(payments.keyBy(Payment::getOrderId))
    .between(Time.minutes(-10), Time.minutes(10))
    .process(new ProcessJoinFunction<Order, Payment, OrderPayment>() {
        @Override
        public void processElement(Order order, Payment payment, Context ctx,
                                   Collector<OrderPayment> out) {
            out.collect(new OrderPayment(order, payment));
        }
    });

// 6. AsyncIO - async external lookup
AsyncDataStream.unorderedWait(
    events,
    new AsyncDatabaseRequest(),
    1000, TimeUnit.MILLISECONDS,
    100  // capacity
);`
        }
      ]
    },
    {
      id: 'stateful-computing',
      name: 'Stateful Computing',
      icon: '💾',
      color: '#10b981',
      description: 'Managed state with multiple backends, queryable state, broadcast patterns, and TTL management',
      diagram: StatefulComputingDiagram,
      details: [
        {
          name: 'Managed State',
          explanation: 'Flink manages state distribution and checkpointing. ValueState for single values. ListState for lists. MapState for key-value pairs. ReducingState and AggregatingState for incremental aggregations. Per-key state partitioning. Automatic state migration on rebalancing.',
          codeExample: `// Stateful processing with various state types
public class StatefulProcessor extends KeyedProcessFunction<String, Event, Result> {

    // ValueState: stores a single value
    private transient ValueState<Long> countState;

    // ListState: stores a list of values
    private transient ListState<Event> eventsState;

    // MapState: stores key-value pairs
    private transient MapState<String, Double> aggregatesState;

    @Override
    public void open(Configuration parameters) {
        // Initialize ValueState
        ValueStateDescriptor<Long> countDescriptor =
            new ValueStateDescriptor<>("count", Long.class);
        countState = getRuntimeContext().getState(countDescriptor);

        // Initialize ListState
        ListStateDescriptor<Event> eventsDescriptor =
            new ListStateDescriptor<>("events", Event.class);
        eventsState = getRuntimeContext().getListState(eventsDescriptor);

        // Initialize MapState
        MapStateDescriptor<String, Double> aggregatesDescriptor =
            new MapStateDescriptor<>("aggregates", String.class, Double.class);
        aggregatesState = getRuntimeContext().getMapState(aggregatesDescriptor);
    }

    @Override
    public void processElement(Event event, Context ctx, Collector<Result> out) throws Exception {
        // Update ValueState
        Long count = countState.value();
        if (count == null) count = 0L;
        countState.update(count + 1);

        // Update ListState
        eventsState.add(event);

        // Update MapState
        aggregatesState.put(event.getCategory(), event.getValue());

        // Register timer for cleanup
        ctx.timerService().registerEventTimeTimer(event.getTimestamp() + 3600000);
    }
}`
        },
        {
          name: 'State Backends',
          explanation: 'MemoryStateBackend for small state (development). FsStateBackend stores state in filesystem (moderate scale). RocksDBStateBackend for large state (incremental checkpoints). Async snapshotting. Trade-offs between latency and scalability. Pluggable backend architecture.',
          codeExample: `// State Backend Configuration
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

// 1. HashMapStateBackend (formerly MemoryStateBackend)
// Best for: Small state, development, testing
env.setStateBackend(new HashMapStateBackend());
env.getCheckpointConfig().setCheckpointStorage("file:///checkpoints");

// 2. EmbeddedRocksDBStateBackend (formerly RocksDBStateBackend)
// Best for: Large state (GBs to TBs), incremental checkpoints
EmbeddedRocksDBStateBackend rocksDBBackend = new EmbeddedRocksDBStateBackend();

// Enable incremental checkpoints (only checkpoint state changes)
rocksDBBackend.enableIncrementalCheckpointing(true);

// Configure RocksDB options
rocksDBBackend.setDbStoragePath("/tmp/rocksdb");
rocksDBBackend.setPredefinedOptions(PredefinedOptions.SPINNING_DISK_OPTIMIZED);
// or: PredefinedOptions.FLASH_SSD_OPTIMIZED

env.setStateBackend(rocksDBBackend);
env.getCheckpointConfig().setCheckpointStorage("s3://my-bucket/checkpoints");

// 3. Custom RocksDB configuration
DBOptions dbOptions = new DBOptions()
    .setMaxBackgroundJobs(4)
    .setMaxOpenFiles(-1);

ColumnFamilyOptions columnOptions = new ColumnFamilyOptions()
    .setCompactionStyle(CompactionStyle.LEVEL)
    .setWriteBufferSize(64 * 1024 * 1024)  // 64 MB
    .setMaxWriteBufferNumber(3)
    .setTargetFileSizeBase(64 * 1024 * 1024);`
        },
        {
          name: 'Broadcast State',
          explanation: 'Replicate low-volume stream to all parallel instances. Rules, configurations, patterns broadcast to all tasks. Update broadcast state dynamically. Join high-volume stream with broadcast state. MapStateDescriptor for broadcast state. Control stream vs data stream pattern.',
          codeExample: `// Broadcast State Pattern - Dynamic Rules
// Low-volume rule stream broadcasted to all parallel instances
DataStream<Rule> ruleStream = ...;
DataStream<Event> eventStream = ...;

// Descriptor for broadcast state
MapStateDescriptor<String, Rule> ruleStateDescriptor = new MapStateDescriptor<>(
    "RulesBroadcastState",
    String.class,
    Rule.class
);

// Broadcast the rule stream
BroadcastStream<Rule> ruleBroadcastStream = ruleStream
    .broadcast(ruleStateDescriptor);

// Connect data stream with broadcast stream
DataStream<Alert> alerts = eventStream
    .keyBy(Event::getUserId)
    .connect(ruleBroadcastStream)
    .process(new BroadcastProcessFunction<String, Event, Rule, Alert>() {

        @Override
        public void processElement(Event event, ReadOnlyContext ctx, Collector<Alert> out) throws Exception {
            // Access broadcast state (read-only in processElement)
            ReadOnlyBroadcastState<String, Rule> rules = ctx.getBroadcastState(ruleStateDescriptor);

            // Apply all rules to the event
            for (Map.Entry<String, Rule> entry : rules.immutableEntries()) {
                Rule rule = entry.getValue();
                if (rule.matches(event)) {
                    out.collect(new Alert(event, rule));
                }
            }
        }

        @Override
        public void processBroadcastElement(Rule rule, Context ctx, Collector<Alert> out) throws Exception {
            // Update broadcast state (can write in processBroadcastElement)
            BroadcastState<String, Rule> rules = ctx.getBroadcastState(ruleStateDescriptor);

            if (rule.isActive()) {
                // Add or update rule
                rules.put(rule.getId(), rule);
            } else {
                // Remove rule
                rules.remove(rule.getId());
            }
        }
    });`
        },
        {
          name: 'State TTL',
          explanation: 'Automatically clean up expired state. Configure time-to-live per state descriptor. Full or incremental cleanup strategies. Background cleanup in RocksDB. Prevents unbounded state growth. Configurable update and visibility semantics. Memory management for long-running jobs.',
          codeExample: `// State TTL Configuration
public class StateTTLExample extends KeyedProcessFunction<String, Event, Result> {

    private ValueState<Long> countState;
    private ListState<Event> recentEvents;

    @Override
    public void open(Configuration parameters) {
        // Configure TTL - state expires after 1 hour of inactivity
        StateTtlConfig ttlConfig = StateTtlConfig
            .newBuilder(Time.hours(1))
            // Update TTL on creation and write
            .setUpdateType(StateTtlConfig.UpdateType.OnCreateAndWrite)
            // Never return expired state
            .setStateVisibility(StateTtlConfig.StateVisibility.NeverReturnExpired)
            // Cleanup strategy
            .cleanupFullSnapshot()  // Clean on full snapshot
            .cleanupIncrementally(1000, true)  // Incremental cleanup
            .build();

        // Apply TTL to ValueState
        ValueStateDescriptor<Long> countDescriptor = new ValueStateDescriptor<>(
            "count-state",
            Long.class
        );
        countDescriptor.enableTimeToLive(ttlConfig);
        countState = getRuntimeContext().getState(countDescriptor);

        // TTL config for ListState with RocksDB compaction cleanup
        StateTtlConfig listTtlConfig = StateTtlConfig
            .newBuilder(Time.days(7))
            .setUpdateType(StateTtlConfig.UpdateType.OnReadAndWrite)
            .setStateVisibility(StateTtlConfig.StateVisibility.ReturnExpiredIfNotCleanedUp)
            .cleanupInRocksdbCompactFilter(1000)  // Cleanup during RocksDB compaction
            .build();

        ListStateDescriptor<Event> eventsDescriptor = new ListStateDescriptor<>(
            "events-state",
            Event.class
        );
        eventsDescriptor.enableTimeToLive(listTtlConfig);
        recentEvents = getRuntimeContext().getListState(eventsDescriptor);
    }

    @Override
    public void processElement(Event event, Context ctx, Collector<Result> out) throws Exception {
        // State automatically cleaned up when expired
        Long count = countState.value();
        if (count == null) count = 0L;
        countState.update(count + 1);

        recentEvents.add(event);
    }
}`
        },
        {
          name: 'Queryable State',
          explanation: 'Query state from external applications. Expose state over network. Key-based lookups for dashboards. Real-time materialized views. Client API for queries. No impact on processing performance. Alternative to writing state to external database.'
        },
        {
          name: 'Savepoints',
          explanation: 'Manually triggered snapshots for versioning. Upgrade applications with state migration. A/B testing with state forking. State evolution with serializer upgrades. Relocate jobs across clusters. Debug production issues. Externalized state for disaster recovery.'
        }
      ]
    },
    {
      id: 'fault-tolerance',
      name: 'Fault Tolerance',
      icon: '🛡️',
      color: '#8b5cf6',
      description: 'Distributed snapshots with checkpointing, Chandy-Lamport algorithm, and fast recovery mechanisms',
      diagram: FaultToleranceDiagram,
      details: [
        {
          name: 'Checkpointing',
          explanation: 'Periodic snapshots of application state. Distributed snapshots across all tasks. Configurable interval (e.g., 60 seconds). Alignment of barriers across inputs. Persistent storage (HDFS, S3). Recovery from checkpoint on failure. Minimal impact on throughput.',
          codeExample: `// Configuring checkpointing for fault tolerance
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

// Enable checkpointing every 60 seconds
env.enableCheckpointing(60000);

// Checkpoint configuration
CheckpointConfig config = env.getCheckpointConfig();

// Set checkpointing mode (EXACTLY_ONCE or AT_LEAST_ONCE)
config.setCheckpointingMode(CheckpointingMode.EXACTLY_ONCE);

// Minimum time between checkpoints (pause between checkpoints)
config.setMinPauseBetweenCheckpoints(30000);

// Checkpoint timeout
config.setCheckpointTimeout(600000);

// Allow only one checkpoint to be in progress at the same time
config.setMaxConcurrentCheckpoints(1);

// Enable externalized checkpoints (retained after job cancellation)
config.enableExternalizedCheckpoints(
    CheckpointConfig.ExternalizedCheckpointCleanup.RETAIN_ON_CANCELLATION
);

// Checkpoint storage location (S3, HDFS, etc.)
config.setCheckpointStorage("s3://my-bucket/checkpoints");

// Enable unaligned checkpoints for faster checkpointing
config.enableUnalignedCheckpoints();

// State backend configuration
env.setStateBackend(new HashMapStateBackend());
// Or for large state:
// env.setStateBackend(new EmbeddedRocksDBStateBackend());`
        },
        {
          name: 'Chandy-Lamport Algorithm',
          explanation: 'Distributed snapshot algorithm for stream processing. Barriers flow with data through DAG. Snapshot taken when barrier reaches operator. Consistent global state without stopping processing. Handles multiple input streams. Foundation for exactly-once semantics.'
        },
        {
          name: 'Recovery Mechanism',
          explanation: 'Restore state from latest checkpoint. Rewind source offsets (Kafka, Kinesis). Replay events since checkpoint. Coordinate recovery across tasks. Restart strategies: fixed delay, exponential backoff, failure rate. Regional and global failover. Minimal data loss.'
        },
        {
          name: 'Incremental Checkpoints',
          explanation: 'Only snapshot state changes since last checkpoint. Dramatically reduces checkpoint size. RocksDB backend support. Faster checkpoints for large state. Lower storage costs. Asynchronous materialization. Critical for terabyte-scale state.'
        },
        {
          name: 'Unaligned Checkpoints',
          explanation: 'Skip barrier alignment for faster checkpoints. Reduce back-pressure during checkpointing. Include in-flight data in snapshot. Lower checkpoint latency. Trade storage for speed. Useful for high-throughput pipelines with skew.'
        },
        {
          name: 'Recovery Time',
          explanation: 'Fast recovery with distributed restore. Parallel state loading from checkpoint. Local recovery from TaskManager disk. Rescale jobs during recovery. Checkpoint retention policies. RTO and RPO guarantees. Minimize downtime.'
        }
      ]
    },
    {
      id: 'table-sql',
      name: 'Table API & SQL',
      icon: '📊',
      color: '#ef4444',
      description: 'Unified batch and streaming with ANSI SQL, catalogs, continuous queries, and optimization',
      diagram: TableSQLDiagram,
      details: [
        {
          name: 'Unified Batch & Stream',
          explanation: 'Single API for batch and streaming. Bounded tables (batch) and unbounded tables (streaming). Automatic mode detection. Unified semantics across modes. Append, retract, upsert modes. Dynamic tables continuously updated. SQL queries on streams.'
        },
        {
          name: 'ANSI SQL Support',
          explanation: 'Standard SQL syntax for stream processing. SELECT, WHERE, JOIN, GROUP BY, OVER windows. Temporal table joins for dimension lookups. Deduplication with ROW_NUMBER. Top-N queries. User-defined functions (UDF, UDAF, UDTF). SQL DDL for table creation.',
          codeExample: `// Table API & SQL examples
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
StreamTableEnvironment tableEnv = StreamTableEnvironment.create(env);

// 1. Create table from Kafka
tableEnv.executeSql(
    "CREATE TABLE transactions ( " +
    "  user_id STRING, " +
    "  amount DECIMAL(10, 2), " +
    "  transaction_time TIMESTAMP(3), " +
    "  WATERMARK FOR transaction_time AS transaction_time - INTERVAL '5' SECOND " +
    ") WITH ( " +
    "  'connector' = 'kafka', " +
    "  'topic' = 'transactions', " +
    "  'properties.bootstrap.servers' = 'localhost:9092', " +
    "  'format' = 'json' " +
    ")"
);

// 2. Windowed aggregation query
Table result = tableEnv.sqlQuery(
    "SELECT " +
    "  user_id, " +
    "  TUMBLE_START(transaction_time, INTERVAL '1' HOUR) as window_start, " +
    "  SUM(amount) as total_amount, " +
    "  COUNT(*) as transaction_count " +
    "FROM transactions " +
    "GROUP BY user_id, TUMBLE(transaction_time, INTERVAL '1' HOUR)"
);

// 3. Top-N query (top 5 users by transaction amount)
tableEnv.executeSql(
    "CREATE VIEW top_users AS " +
    "SELECT * FROM ( " +
    "  SELECT *, " +
    "    ROW_NUMBER() OVER (PARTITION BY window_start ORDER BY total_amount DESC) as rank " +
    "  FROM hourly_aggregates " +
    ") WHERE rank <= 5"
);

// 4. Stream-to-stream join
tableEnv.executeSql(
    "SELECT o.order_id, o.amount, p.payment_method " +
    "FROM orders o " +
    "JOIN payments p ON o.order_id = p.order_id " +
    "WHERE o.order_time BETWEEN p.payment_time - INTERVAL '10' MINUTE AND p.payment_time"
);`
        },
        {
          name: 'Catalogs & Connectors',
          explanation: 'Catalog API for metadata management. Hive Metastore integration. Table schemas and configurations. File, JDBC, Kafka, Elasticsearch connectors. Format support: JSON, Avro, Parquet, ORC. Automatic schema inference. Dynamic table options.'
        },
        {
          name: 'Table Ecosystem',
          explanation: 'Python, Java, Scala Table API. Pyflink for Python data scientists. Pandas integration. Jupyter notebook support. Table descriptors and environments. Convert between DataStream and Table. Hybrid pipelines.'
        },
        {
          name: 'Continuous Queries',
          explanation: 'Long-running SQL queries on streams. Results continuously updated. Changelog streams with retractions. Upsert semantics for point queries. Windowed aggregations. Temporal patterns with MATCH_RECOGNIZE. Real-time materialized views.'
        },
        {
          name: 'Query Optimization',
          explanation: 'Volcano/Cascades optimizer for SQL. Rule-based and cost-based optimization. Predicate pushdown. Join reordering. Operator fusion. Statistics-based optimization. Explain plan for debugging. Incremental aggregation optimization.'
        }
      ]
    },
    {
      id: 'deployment',
      name: 'Deployment & Scaling',
      icon: '🚀',
      color: '#f59e0b',
      description: 'Flexible deployment options with dynamic scaling, resource management, HA, and Kubernetes integration',
      diagram: DeploymentDiagram,
      details: [
        {
          name: 'Flexible Deployment',
          explanation: 'Standalone cluster mode. YARN for Hadoop environments. Kubernetes native deployment. Mesos support. Session vs per-job vs application mode. Run on-premise or cloud (AWS, GCP, Azure). Docker containers. Embedded mode for testing.'
        },
        {
          name: 'Dynamic Scaling',
          explanation: 'Rescale jobs without downtime. Savepoint → stop → change parallelism → restore. Reactive mode auto-scales based on available resources. Key groups enable rescaling keyed state. Rebalance partitions. Kubernetes HPA integration. Elastic resource allocation.'
        },
        {
          name: 'Resource Management',
          explanation: 'TaskManager and JobManager architecture. Slot sharing for efficiency. Task chaining reduces network overhead. Memory configuration: heap, off-heap, network buffers. CPU and memory profiles. Resource isolation. Workload-specific tuning.'
        },
        {
          name: 'High Availability',
          explanation: 'Multiple JobManager instances with ZooKeeper. Leader election for active JobManager. TaskManager failure recovery. Checkpointing for state recovery. Region-based failover for localized failures. Split-brain prevention. Application master HA on YARN.'
        },
        {
          name: 'Monitoring & Metrics',
          explanation: 'REST API for job metrics. Prometheus, Grafana integration. Throughput, latency, backpressure metrics. Checkpoint statistics. Memory and CPU usage. Watermark monitoring. Web UI for visualization. Custom metrics reporters.'
        },
        {
          name: 'Kubernetes Native',
          explanation: 'Native Kubernetes deployment mode. Dynamic resource allocation. Pod templates for customization. Service accounts and RBAC. ConfigMaps for configuration. Persistent volume claims for checkpoints. Operator for complex deployments. Multi-tenancy support.'
        }
      ]
    },
    {
      id: 'connectors',
      name: 'Connectors & Integration',
      icon: '🔌',
      color: '#14b8a6',
      description: 'Rich ecosystem of connectors for Kafka, filesystems, databases, AWS services, and custom integration',
      diagram: ConnectorsDiagram,
      details: [
        {
          name: 'Apache Kafka',
          explanation: 'First-class Kafka connector. Exactly-once semantics with transactional producers. Dynamic partition discovery. Watermark generation from Kafka timestamps. Consumer group offsets. Avro schema registry integration. Kafka 0.10+ support. High throughput optimizations.',
          codeExample: `// Advanced Kafka Source and Sink Configuration
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

// Kafka Source with all features
KafkaSource<Order> kafkaSource = KafkaSource.<Order>builder()
    .setBootstrapServers("kafka1:9092,kafka2:9092,kafka3:9092")
    .setTopics("orders", "returns")  // Multiple topics
    .setGroupId("flink-consumer-group")
    .setStartingOffsets(OffsetsInitializer.committedOffsets(OffsetResetStrategy.EARLIEST))
    .setDeserializer(KafkaRecordDeserializationSchema.of(new OrderDeserializer()))
    .setProperty("partition.discovery.interval.ms", "60000")  // Dynamic partition discovery
    .setProperty("commit.offsets.on.checkpoint", "true")
    .build();

// Watermark strategy from Kafka timestamp
WatermarkStrategy<Order> watermarkStrategy = WatermarkStrategy
    .<Order>forBoundedOutOfOrderness(Duration.ofSeconds(20))
    .withTimestampAssigner((order, recordTimestamp) -> order.getTimestamp())
    .withIdleness(Duration.ofMinutes(1));

DataStream<Order> orders = env.fromSource(
    kafkaSource,
    watermarkStrategy,
    "Kafka Orders Source"
);

// Process orders
DataStream<OrderResult> processed = orders
    .keyBy(Order::getCustomerId)
    .window(TumblingEventTimeWindows.of(Time.hours(1)))
    .aggregate(new OrderAggregator());

// Kafka Sink with exactly-once
KafkaSink<OrderResult> kafkaSink = KafkaSink.<OrderResult>builder()
    .setBootstrapServers("kafka1:9092,kafka2:9092,kafka3:9092")
    .setRecordSerializer(KafkaRecordSerializationSchema.<OrderResult>builder()
        .setTopic("processed-orders")
        .setKeySerializationSchema(new SimpleStringSchema())
        .setValueSerializationSchema(new JsonSerializationSchema<>())
        .build()
    )
    .setDeliveryGuarantee(DeliveryGuarantee.EXACTLY_ONCE)
    .setTransactionalIdPrefix("flink-txn")
    .setProperty("transaction.timeout.ms", "900000")
    .build();

processed.sinkTo(kafkaSink);

env.execute("Kafka Integration Example");`
        },
        {
          name: 'File Systems',
          explanation: 'HDFS, S3, Azure Blob storage connectors. Parquet, ORC, Avro, CSV formats. Streaming file monitoring with continuous ingestion. Bucketing for exactly-once file sinks. Rolling policies for file rotation. Partition pruning. Compaction strategies.'
        },
        {
          name: 'Databases',
          explanation: 'JDBC connector for relational databases. Change Data Capture (CDC) connectors: Debezium, Canal. Elasticsearch for search and analytics. MongoDB, Cassandra connectors. HBase integration. Upsert mode for databases. Connection pooling. Batch writes.'
        },
        {
          name: 'AWS Services',
          explanation: 'Kinesis Data Streams source and sink. DynamoDB sink. S3 StreamingFileSink. AWS SDK authentication. IAM role support. Enhanced fan-out for Kinesis. Cross-region replication. Glue catalog integration. EMR deployment.'
        },
        {
          name: 'Message Queues',
          explanation: 'RabbitMQ, Pulsar connectors. JMS support for enterprise messaging. MQTT for IoT scenarios. NATS connector. Exactly-once delivery guarantees. Queue discovery. Message acknowledgment strategies. Dead letter queues.'
        },
        {
          name: 'Custom Connectors',
          explanation: 'Implement SourceFunction or SinkFunction interfaces. RichFunction for initialization. Async I/O for external lookups. Table connector SDK for Table API. FLIP-27 source interface. Watermark strategies. Exactly-once sink implementation patterns.'
        }
      ]
    },
    {
      id: 'performance',
      name: 'Performance & Optimization',
      icon: '⚡',
      color: '#6366f1',
      description: 'Advanced performance features including pipelined execution, memory management, and operator chaining',
      diagram: PerformanceDiagram,
      details: [
        {
          name: 'Pipelined Execution',
          explanation: 'Streaming execution without batch boundaries. Data flows through operators without materialization. Lower latency than batch. Credit-based flow control for back-pressure. Network buffers for efficiency. No disk spilling in streaming mode.'
        },
        {
          name: 'Memory Management',
          explanation: 'Off-heap memory management with Flink-managed memory. Binary format in memory. Sorting and hashing without JVM heap. Prevents OutOfMemoryErrors. Spill to disk for large state. Memory pools. Garbage collection reduction. RocksDB memory integration.'
        },
        {
          name: 'Network Stack',
          explanation: 'Netty-based network communication. Zero-copy network transfers. Network buffer tuning. Compression for network traffic. Batch shuffle for batch jobs. Credit-based flow control prevents buffer bloat. SSL/TLS encryption. Network bandwidth management.'
        },
        {
          name: 'Operator Chaining',
          explanation: 'Combine multiple operators into single task. Reduce serialization overhead. Function calls instead of network. Parallel execution in single thread. Disable for debugging. Start new chain for specific operators. Slot sharing groups.'
        },
        {
          name: 'Batch Processing Mode',
          explanation: 'Optimized execution for bounded data. Sort-based aggregations and joins. Blocking shuffles for efficiency. Adaptive query execution. Statistics-based optimization. Hash joins vs sort-merge joins. Memory budget allocation. Batch vs streaming trade-offs.'
        },
        {
          name: 'Benchmarks',
          explanation: 'Industry-leading performance. Yahoo Streaming Benchmark results. TPC-DS for SQL performance. Nexmark benchmark for streaming auctions. Lower latency than alternatives. High throughput sustained. Stateful streaming at scale. Terabyte-scale state management.'
        }
      ]
    },
    {
      id: 'use-cases',
      name: 'Use Cases & Applications',
      icon: '🎯',
      color: '#ec4899',
      description: 'Real-world applications from real-time analytics to fraud detection, IoT processing, and recommendations',
      diagram: UseCasesDiagram,
      details: [
        {
          name: 'Real-time Analytics',
          explanation: 'Streaming dashboards and KPIs. Aggregations over tumbling/sliding windows. Real-time reports and alerts. Business intelligence on fresh data. Customer behavior analytics. Application performance monitoring. Ad-hoc queries on streams with SQL.'
        },
        {
          name: 'ETL Pipelines',
          explanation: 'Extract-Transform-Load for data lakes and warehouses. Streaming ingestion from multiple sources. Data cleansing and enrichment. Schema evolution and validation. Compaction and deduplication. Incremental updates to data warehouse. Medallion architecture (bronze/silver/gold).'
        },
        {
          name: 'Fraud Detection',
          explanation: 'Real-time transaction monitoring. Pattern detection with CEP. Machine learning model scoring. Rule engines for complex logic. Risk scoring and alerting. Multi-level aggregations. Session-based analysis. Low-latency requirements (milliseconds).'
        },
        {
          name: 'IoT & Sensors',
          explanation: 'Process telemetry from millions of devices. Time-series aggregations. Anomaly detection on sensor data. Predictive maintenance. Device state management. Geo-spatial processing. Protocol conversion (MQTT, CoAP). Edge computing integration.'
        },
        {
          name: 'Recommendation Engines',
          explanation: 'Real-time personalization. Feature engineering on user behavior. Online model inference. A/B testing analytics. Collaborative filtering. Content-based recommendations. Session-based recommendations. Contextual bandits with online learning.'
        }
      ]
    }
  ]

  // =============================================================================
  // NAVIGATION HANDLERS
  // =============================================================================

  const selectedConcept = selectedConceptIndex !== null ? concepts[selectedConceptIndex] : null

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

  // =============================================================================
  // BREADCRUMB CONFIGURATION
  // =============================================================================

  const buildBreadcrumbStack = () => {
    const stack = [
      { name: 'Messaging', icon: '💬', page: 'Messaging' },
      { name: 'Apache Flink', icon: '🌊', page: 'Apache Flink' }
    ]
    if (selectedConcept) {
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    }
    return stack
  }

  const handleBreadcrumbClick = (index, item) => {
    if (index === 0) {
      onBack()  // Go back to Messaging main page
    } else if (index === 1 && selectedConcept) {
      setSelectedConceptIndex(null)  // Close modal, stay on Apache Flink page
    }
  }

  // =============================================================================
  // KEYBOARD NAVIGATION
  // =============================================================================

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        if (selectedConcept) {
          setSelectedConceptIndex(null)
        } else {
          onBack()
        }
      } else if (e.key === 'ArrowLeft' && selectedConceptIndex !== null) {
        e.preventDefault()
        handlePreviousConcept()
      } else if (e.key === 'ArrowRight' && selectedConceptIndex !== null) {
        e.preventDefault()
        handleNextConcept()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedConceptIndex, onBack])

  // =============================================================================
  // STYLES
  // =============================================================================

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #7c2d12 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(225, 29, 72, 0.2)',
    border: '1px solid rgba(225, 29, 72, 0.3)',
    borderRadius: '0.5rem',
    color: '#f43f5e',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div style={containerStyle}>
      {/* Header with title and back button */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Apache Flink</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(225, 29, 72, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(225, 29, 72, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          ← Back to Messaging
        </button>
      </div>

      {/* Breadcrumb navigation */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu}
          colors={FLINK_COLORS}
        />
      </div>

      {/* Concept Cards Grid */}
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

      {/* Modal for Selected Concept */}
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
              colors={FLINK_COLORS}
            />

            {/* Modal Header with Navigation */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid #334155'
            }}>
              <h2 style={{
                color: selectedConcept.color,
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1.25rem'
              }}>
                <span>{selectedConcept.icon}</span>
                {selectedConcept.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <button
                  onClick={handlePreviousConcept}
                  disabled={selectedConceptIndex === 0}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(100, 116, 139, 0.2)',
                    border: '1px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '0.375rem',
                    color: selectedConceptIndex === 0 ? '#475569' : '#94a3b8',
                    cursor: selectedConceptIndex === 0 ? 'not-allowed' : 'pointer',
                    fontSize: '0.8rem'
                  }}
                >←</button>
                <span style={{ color: '#64748b', fontSize: '0.75rem', padding: '0 0.5rem' }}>
                  {selectedConceptIndex + 1}/{concepts.length}
                </span>
                <button
                  onClick={handleNextConcept}
                  disabled={selectedConceptIndex === concepts.length - 1}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(100, 116, 139, 0.2)',
                    border: '1px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '0.375rem',
                    color: selectedConceptIndex === concepts.length - 1 ? '#475569' : '#94a3b8',
                    cursor: selectedConceptIndex === concepts.length - 1 ? 'not-allowed' : 'pointer',
                    fontSize: '0.8rem'
                  }}
                >→</button>
                <button
                  onClick={() => setSelectedConceptIndex(null)}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '0.375rem',
                    color: '#f87171',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    marginLeft: '0.5rem'
                  }}
                >✕</button>
              </div>
            </div>

            {/* Subtopic Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {selectedConcept.details.map((detail, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDetailIndex(i)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: selectedDetailIndex === i ? `${selectedConcept.color}30` : 'rgba(100, 116, 139, 0.2)',
                    border: `1px solid ${selectedDetailIndex === i ? selectedConcept.color : 'rgba(100, 116, 139, 0.3)'}`,
                    borderRadius: '0.5rem',
                    color: selectedDetailIndex === i ? selectedConcept.color : '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: selectedDetailIndex === i ? '600' : '400',
                    transition: 'all 0.2s'
                  }}
                >
                  {detail.name}
                </button>
              ))}
            </div>

            {/* Selected Subtopic Content */}
            {(() => {
              const detail = selectedConcept.details[selectedDetailIndex]
              const colorScheme = SUBTOPIC_COLORS[selectedDetailIndex % SUBTOPIC_COLORS.length]
              const DiagramComponent = detail.diagram || selectedConcept.diagram
              return (
                <div>
                  {/* Diagram */}
                  {DiagramComponent && (
                    <div style={{
                      background: 'rgba(15, 23, 42, 0.6)',
                      borderRadius: '0.75rem',
                      padding: '1rem',
                      marginBottom: '1.5rem',
                      border: '1px solid #334155'
                    }}>
                      <DiagramComponent />
                    </div>
                  )}

                  {/* Detail Name */}
                  <h3 style={{ color: '#e2e8f0', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
                    {detail.name}
                  </h3>

                  {/* Explanation */}
                  <p style={{
                    color: '#e2e8f0',
                    lineHeight: '1.8',
                    marginBottom: '1rem',
                    background: colorScheme.bg,
                    border: `1px solid ${colorScheme.border}`,
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    textAlign: 'left'
                  }}>
                    {detail.explanation}
                  </p>

                  {/* Code Example */}
                  {detail.codeExample && (
                    <SyntaxHighlighter
                      language="java"
                      style={vscDarkPlus}
                      customStyle={{
                        padding: '1rem',
                        margin: 0,
                        borderRadius: '0.5rem',
                        fontSize: '0.8rem',
                        border: '1px solid #334155',
                        background: '#0f172a'
                      }}
                      codeTagProps={{ style: { background: 'transparent' } }}
                    >
                      {detail.codeExample}
                    </SyntaxHighlighter>
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

export default ApacheFlink
