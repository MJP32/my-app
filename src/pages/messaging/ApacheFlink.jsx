/**
 * Apache Flink - Stream Processing Framework
 *
 * Converted to tab_template format with modal-based navigation
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'
import useVoiceConceptNavigation from '../../hooks/useVoiceConceptNavigation'

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
    <text x="120" y="102" textAnchor="middle" fill="#4ade80" fontSize="8">{`ValueState<T>`}</text>
    <rect x="60" y="115" width="120" height="25" rx="3" fill="rgba(245, 158, 11, 0.4)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="120" y="132" textAnchor="middle" fill="#fbbf24" fontSize="8">{`ListState<T>`}</text>
    <rect x="60" y="145" width="120" height="25" rx="3" fill="rgba(139, 92, 246, 0.4)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="120" y="162" textAnchor="middle" fill="#a78bfa" fontSize="8">{`MapState<K,V>`}</text>

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
          explanation: 'Query state from external applications. Expose state over network. Key-based lookups for dashboards. Real-time materialized views. Client API for queries. No impact on processing performance. Alternative to writing state to external database.',
          codeExample: `// Queryable State - expose state for external queries
public class QueryableStateFunction extends KeyedProcessFunction<String, Event, Void> {

    private ValueState<UserStats> userStatsState;

    @Override
    public void open(Configuration parameters) {
        ValueStateDescriptor<UserStats> descriptor = new ValueStateDescriptor<>(
            "user-stats",  // State name used for querying
            UserStats.class
        );

        // Make state queryable with a unique name
        descriptor.setQueryable("user-stats-query");

        userStatsState = getRuntimeContext().getState(descriptor);
    }

    @Override
    public void processElement(Event event, Context ctx, Collector<Void> out) throws Exception {
        UserStats stats = userStatsState.value();
        if (stats == null) {
            stats = new UserStats();
        }
        stats.addEvent(event);
        userStatsState.update(stats);
    }
}

// Client-side: Query state from external application
QueryableStateClient client = new QueryableStateClient("localhost", 9069);

// Query by key
CompletableFuture<ValueState<UserStats>> future = client.getKvState(
    JobID.fromHexString("abc123..."),
    "user-stats-query",                   // Queryable state name
    "user-42",                            // Key to look up
    BasicTypeInfo.STRING_TYPE_INFO,       // Key type
    new ValueStateDescriptor<>("user-stats", UserStats.class)
);

UserStats stats = future.get().value();
System.out.println("User stats: " + stats);`
        },
        {
          name: 'Savepoints',
          explanation: 'Manually triggered snapshots for versioning. Upgrade applications with state migration. A/B testing with state forking. State evolution with serializer upgrades. Relocate jobs across clusters. Debug production issues. Externalized state for disaster recovery.',
          codeExample: `// Savepoint operations via CLI and programmatic API

// 1. Trigger a savepoint via CLI
// $ bin/flink savepoint <jobId> s3://my-bucket/savepoints/
// $ bin/flink savepoint <jobId> --dispose  (dispose after cancel)

// 2. Cancel job with savepoint
// $ bin/flink cancel -s s3://my-bucket/savepoints/ <jobId>

// 3. Resume job from savepoint
// $ bin/flink run -s s3://my-bucket/savepoints/savepoint-abc123 myJob.jar

// 4. Programmatic savepoint trigger via REST API
public class SavepointManager {

    private final RestClusterClient<String> client;

    public CompletableFuture<String> triggerSavepoint(JobID jobId, String targetDir) {
        return client.triggerSavepoint(jobId, targetDir)
            .thenApply(savepointPath -> {
                System.out.println("Savepoint created at: " + savepointPath);
                return savepointPath;
            });
    }

    // State migration: upgrade job with modified state schema
    public void upgradeJob(String savepointPath, String newJarPath) throws Exception {
        // Stop current job with savepoint
        // Start new version from savepoint
        PackagedProgram program = PackagedProgram.newBuilder()
            .setJarFile(new File(newJarPath))
            .setArguments("--fromSavepoint", savepointPath)
            .build();

        // Allow non-restored state for removed operators
        SavepointRestoreSettings restoreSettings =
            SavepointRestoreSettings.forPath(savepointPath, true);

        client.submitJob(program, restoreSettings);
    }
}`
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
          explanation: 'Distributed snapshot algorithm for stream processing. Barriers flow with data through DAG. Snapshot taken when barrier reaches operator. Consistent global state without stopping processing. Handles multiple input streams. Foundation for exactly-once semantics.',
          codeExample: `// Chandy-Lamport in Flink: Barrier Alignment
// Flink injects checkpoint barriers into the data stream.
// Each operator aligns barriers from all input channels.

// Conceptual view of barrier alignment in a multi-input operator:
public class BarrierAlignmentExample extends AbstractStreamOperator<String>
    implements TwoInputStreamOperator<String, String, String> {

    // When barrier arrives from input 1:
    // 1. Buffer records from input 1 (after barrier)
    // 2. Continue processing records from input 2
    // 3. When barrier arrives from input 2 -> snapshot state

    @Override
    public void processElement1(StreamRecord<String> record) throws Exception {
        // Process records from stream 1
        output.collect(new StreamRecord<>(transform(record.getValue())));
    }

    @Override
    public void processElement2(StreamRecord<String> record) throws Exception {
        // Process records from stream 2
        output.collect(new StreamRecord<>(transform(record.getValue())));
    }

    @Override
    public void snapshotState(StateSnapshotContext context) throws Exception {
        // Called when barriers from ALL inputs are aligned
        // Snapshot operator state to checkpoint storage
        super.snapshotState(context);
        // Persist any internal state
    }

    @Override
    public void initializeState(StateInitializationContext context) throws Exception {
        // Restore state from checkpoint during recovery
        super.initializeState(context);
    }
}

// Timeline visualization:
// Input 1: [data] [data] [barrier-n] [data] [data]
// Input 2: [data] [data] [data] [barrier-n] [data]
//                                     ^
//                          Both barriers received
//                          -> Take snapshot of state`
        },
        {
          name: 'Recovery Mechanism',
          explanation: 'Restore state from latest checkpoint. Rewind source offsets (Kafka, Kinesis). Replay events since checkpoint. Coordinate recovery across tasks. Restart strategies: fixed delay, exponential backoff, failure rate. Regional and global failover. Minimal data loss.',
          codeExample: `// Restart strategy configuration
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

// 1. Fixed delay restart strategy
// Restart up to 3 times with 10 second delay between attempts
env.setRestartStrategy(RestartStrategies.fixedDelayRestart(
    3,                              // Max restart attempts
    Time.seconds(10)                // Delay between restarts
));

// 2. Exponential delay restart strategy
env.setRestartStrategy(RestartStrategies.exponentialDelayRestart(
    Time.milliseconds(1),           // Initial backoff
    Time.seconds(120),              // Max backoff
    1.5,                            // Backoff multiplier
    Time.hours(1),                  // Reset backoff threshold
    0.1                             // Jitter
));

// 3. Failure rate restart strategy
// Allow 3 failures within 5 minutes, with 10 second delay
env.setRestartStrategy(RestartStrategies.failureRateRestart(
    3,                              // Max failures per interval
    Time.minutes(5),                // Failure rate interval
    Time.seconds(10)                // Delay between restarts
));

// 4. No restart (fail immediately)
env.setRestartStrategy(RestartStrategies.noRestart());

// 5. Configure failover strategy in flink-conf.yaml:
// jobmanager.execution.failover-strategy: region
// (regional restart only restarts affected pipeline regions)

// Recovery process:
// 1. Detect failure (TaskManager heartbeat timeout)
// 2. Cancel affected tasks
// 3. Load latest completed checkpoint
// 4. Restore operator state from checkpoint
// 5. Reset source offsets to checkpoint position
// 6. Resume processing from checkpoint`
        },
        {
          name: 'Incremental Checkpoints',
          explanation: 'Only snapshot state changes since last checkpoint. Dramatically reduces checkpoint size. RocksDB backend support. Faster checkpoints for large state. Lower storage costs. Asynchronous materialization. Critical for terabyte-scale state.',
          codeExample: `// Incremental Checkpoints with RocksDB
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

// Enable RocksDB state backend with incremental checkpoints
EmbeddedRocksDBStateBackend rocksDBBackend = new EmbeddedRocksDBStateBackend(true);
// true = enable incremental checkpointing
env.setStateBackend(rocksDBBackend);

// Configure checkpoint storage
env.getCheckpointConfig().setCheckpointStorage("s3://my-bucket/checkpoints");

// Enable checkpointing
env.enableCheckpointing(60000); // Every 60 seconds

// How incremental checkpoints work:
// Checkpoint 1: Full snapshot (all SST files uploaded)
//   State size: 10 GB -> Upload: 10 GB
//
// Checkpoint 2: Only new/changed SST files since CP 1
//   State size: 12 GB -> Upload: 2 GB (only delta)
//
// Checkpoint 3: Only new/changed SST files since CP 2
//   State size: 15 GB -> Upload: 3 GB (only delta)

// RocksDB-specific tuning for incremental checkpoints
Configuration config = new Configuration();

// Number of checkpoints to retain (for incremental base)
config.set(CheckpointingOptions.MAX_RETAINED_CHECKPOINTS, 3);

// Async snapshots (non-blocking)
config.set(CheckpointingOptions.ASYNC_SNAPSHOTS, true);

// Local recovery (faster restarts from local disk)
config.set(CheckpointingOptions.LOCAL_RECOVERY, true);

// Configure RocksDB write buffer for better compaction
config.set(RocksDBConfigurableOptions.WRITE_BUFFER_SIZE, MemorySize.parse("128m"));
config.set(RocksDBConfigurableOptions.MAX_WRITE_BUFFER_NUMBER, 4);`
        },
        {
          name: 'Unaligned Checkpoints',
          explanation: 'Skip barrier alignment for faster checkpoints. Reduce back-pressure during checkpointing. Include in-flight data in snapshot. Lower checkpoint latency. Trade storage for speed. Useful for high-throughput pipelines with skew.',
          codeExample: `// Unaligned Checkpoints Configuration
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

// Enable checkpointing
env.enableCheckpointing(60000);
CheckpointConfig config = env.getCheckpointConfig();

// Enable unaligned checkpoints
config.enableUnalignedCheckpoints();

// Configure unaligned checkpoint timeout
// Falls back to aligned checkpoints if unaligned takes too long
config.setAlignedCheckpointTimeout(Duration.ofSeconds(30));

// Must use EXACTLY_ONCE mode
config.setCheckpointingMode(CheckpointingMode.EXACTLY_ONCE);

// How unaligned checkpoints work:
//
// ALIGNED (traditional):
// Input 1: [data][data][barrier]----wait----[data]
// Input 2: [data]-------[data][data][barrier][data]
//                                      ^
//                           Barrier aligned, then snapshot
// Problem: slow input blocks fast input (back-pressure)
//
// UNALIGNED:
// Input 1: [data][data][barrier][data][data]
// Input 2: [data][data][data]---[barrier][data]
//                         ^
//           Snapshot immediately when first barrier arrives
//           In-flight buffers included in checkpoint
//
// Trade-offs:
// + No alignment wait -> lower checkpoint latency
// + Reduced back-pressure during checkpoints
// - Larger checkpoint size (includes in-flight data)
// - Higher I/O during checkpoint
// - Cannot be used with AT_LEAST_ONCE mode`
        },
        {
          name: 'Recovery Time',
          explanation: 'Fast recovery with distributed restore. Parallel state loading from checkpoint. Local recovery from TaskManager disk. Rescale jobs during recovery. Checkpoint retention policies. RTO and RPO guarantees. Minimize downtime.',
          codeExample: `// Recovery Time Optimization Configuration
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
CheckpointConfig config = env.getCheckpointConfig();

// 1. Enable local recovery (avoid network transfer on restart)
Configuration flinkConfig = new Configuration();
flinkConfig.set(CheckpointingOptions.LOCAL_RECOVERY, true);

// 2. Retain checkpoints on cancellation for fast restart
config.enableExternalizedCheckpoints(
    CheckpointConfig.ExternalizedCheckpointCleanup.RETAIN_ON_CANCELLATION
);

// 3. Configure number of retained checkpoints
config.setMaxRetainedCheckpoints(3);

// 4. Faster checkpoint frequency = lower RPO
env.enableCheckpointing(30000); // 30 seconds

// 5. Configure task-local state recovery
// In flink-conf.yaml:
// state.backend.local-recovery: true
// taskmanager.state.local.root-dirs: /local/ssd/state

// 6. Fine-grained recovery with region failover
// In flink-conf.yaml:
// jobmanager.execution.failover-strategy: region

// Recovery Timeline:
// T0: Failure detected (heartbeat timeout ~30s)
// T1: Cancel affected tasks (~1s)
// T2: Allocate new resources (~5s on Kubernetes)
// T3: Restore state from checkpoint
//     - Local recovery: ~seconds (from local disk)
//     - Remote recovery: ~minutes (from S3/HDFS)
// T4: Reset source offsets
// T5: Resume processing
// Total RTO: seconds (local) to minutes (remote)
// RPO: bounded by checkpoint interval`
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
          explanation: 'Single API for batch and streaming. Bounded tables (batch) and unbounded tables (streaming). Automatic mode detection. Unified semantics across modes. Append, retract, upsert modes. Dynamic tables continuously updated. SQL queries on streams.',
          codeExample: `// Unified Batch & Stream with Table API
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
StreamTableEnvironment tableEnv = StreamTableEnvironment.create(env);

// Streaming mode (default): process unbounded data
// Batch mode: process bounded data with optimizations
// tableEnv.getConfig().set("execution.runtime-mode", "BATCH");

// 1. Create a streaming table (unbounded)
tableEnv.executeSql(
    "CREATE TABLE orders (" +
    "  order_id STRING," +
    "  amount DECIMAL(10,2)," +
    "  order_time TIMESTAMP(3)," +
    "  WATERMARK FOR order_time AS order_time - INTERVAL '5' SECOND" +
    ") WITH (" +
    "  'connector' = 'kafka'," +
    "  'topic' = 'orders'," +
    "  'format' = 'json'" +
    ")"
);

// 2. Create a batch table (bounded)
tableEnv.executeSql(
    "CREATE TABLE historical_orders (" +
    "  order_id STRING," +
    "  amount DECIMAL(10,2)," +
    "  order_date DATE" +
    ") WITH (" +
    "  'connector' = 'filesystem'," +
    "  'path' = 's3://data/orders/'," +
    "  'format' = 'parquet'" +
    ")"
);

// 3. Same SQL query works for both bounded and unbounded tables
Table result = tableEnv.sqlQuery(
    "SELECT DATE_FORMAT(order_time, 'yyyy-MM-dd') as day, " +
    "SUM(amount) as total FROM orders GROUP BY DATE_FORMAT(order_time, 'yyyy-MM-dd')"
);

// 4. Convert between DataStream and Table
DataStream<Order> orderStream = env.fromSource(kafkaSource, watermarks, "orders");
Table orderTable = tableEnv.fromDataStream(orderStream);
DataStream<Row> resultStream = tableEnv.toChangelogStream(result);`
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
          explanation: 'Catalog API for metadata management. Hive Metastore integration. Table schemas and configurations. File, JDBC, Kafka, Elasticsearch connectors. Format support: JSON, Avro, Parquet, ORC. Automatic schema inference. Dynamic table options.',
          codeExample: `// Catalogs & Connectors Configuration
StreamTableEnvironment tableEnv = StreamTableEnvironment.create(env);

// 1. Register Hive Catalog for metadata management
HiveCatalog hiveCatalog = new HiveCatalog(
    "myhive",                    // Catalog name
    "default",                   // Default database
    "/etc/hive/conf"            // Hive conf directory
);
tableEnv.registerCatalog("myhive", hiveCatalog);
tableEnv.useCatalog("myhive");

// 2. Kafka connector with JSON format
tableEnv.executeSql(
    "CREATE TABLE kafka_events (" +
    "  event_id STRING," +
    "  user_id STRING," +
    "  event_type STRING," +
    "  payload STRING," +
    "  event_time TIMESTAMP(3)," +
    "  WATERMARK FOR event_time AS event_time - INTERVAL '5' SECOND" +
    ") WITH (" +
    "  'connector' = 'kafka'," +
    "  'topic' = 'events'," +
    "  'properties.bootstrap.servers' = 'kafka:9092'," +
    "  'format' = 'json'," +
    "  'json.fail-on-missing-field' = 'false'," +
    "  'json.ignore-parse-errors' = 'true'" +
    ")"
);

// 3. JDBC connector for database sink
tableEnv.executeSql(
    "CREATE TABLE jdbc_sink (" +
    "  user_id STRING," +
    "  total_events BIGINT," +
    "  last_event_time TIMESTAMP(3)," +
    "  PRIMARY KEY (user_id) NOT ENFORCED" +
    ") WITH (" +
    "  'connector' = 'jdbc'," +
    "  'url' = 'jdbc:mysql://localhost:3306/analytics'," +
    "  'table-name' = 'user_stats'," +
    "  'username' = 'flink'," +
    "  'password' = 'secret'," +
    "  'sink.buffer-flush.max-rows' = '1000'," +
    "  'sink.buffer-flush.interval' = '5s'" +
    ")"
);

// 4. Elasticsearch connector
tableEnv.executeSql(
    "CREATE TABLE es_sink (" +
    "  user_id STRING," +
    "  event_count BIGINT" +
    ") WITH (" +
    "  'connector' = 'elasticsearch-7'," +
    "  'hosts' = 'http://elasticsearch:9200'," +
    "  'index' = 'user-events'" +
    ")"
);`
        },
        {
          name: 'Table Ecosystem',
          explanation: 'Python, Java, Scala Table API. Pyflink for Python data scientists. Pandas integration. Jupyter notebook support. Table descriptors and environments. Convert between DataStream and Table. Hybrid pipelines.',
          codeExample: `// Table Ecosystem - Java Table API
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
StreamTableEnvironment tableEnv = StreamTableEnvironment.create(env);

// 1. Programmatic Table API (type-safe, IDE auto-complete)
Table orders = tableEnv.from("orders");

Table result = orders
    .filter($("amount").isGreater(100))
    .groupBy($("user_id"))
    .select(
        $("user_id"),
        $("amount").sum().as("total_amount"),
        $("order_id").count().as("order_count")
    );

// 2. Convert DataStream to Table and back
DataStream<Order> orderStream = env.fromSource(source, watermarks, "orders");

// DataStream -> Table
Table orderTable = tableEnv.fromDataStream(
    orderStream,
    $("orderId"),
    $("amount"),
    $("timestamp").rowtime()  // Use event time
);

// Table -> DataStream (append mode for insert-only)
DataStream<Row> appendStream = tableEnv.toDataStream(result);

// Table -> DataStream (changelog mode for updates/deletes)
DataStream<Row> changelogStream = tableEnv.toChangelogStream(result);

// 3. User-Defined Functions (UDFs)
public class ParseJson extends ScalarFunction {
    public String eval(String json, String field) {
        return JsonParser.parse(json).get(field).asText();
    }
}

// Register and use UDF
tableEnv.createTemporarySystemFunction("parseJson", ParseJson.class);
tableEnv.sqlQuery("SELECT parseJson(payload, 'name') FROM events");

// 4. Table-valued functions (UDTF)
public class SplitFunction extends TableFunction<Row> {
    public void eval(String str) {
        for (String s : str.split(",")) {
            collect(Row.of(s, s.length()));
        }
    }
}`
        },
        {
          name: 'Continuous Queries',
          explanation: 'Long-running SQL queries on streams. Results continuously updated. Changelog streams with retractions. Upsert semantics for point queries. Windowed aggregations. Temporal patterns with MATCH_RECOGNIZE. Real-time materialized views.',
          codeExample: `// Continuous Queries - always-running SQL on streams
StreamTableEnvironment tableEnv = StreamTableEnvironment.create(env);

// 1. Continuous aggregation (emits updates as new data arrives)
tableEnv.executeSql(
    "SELECT user_id, COUNT(*) as event_count, SUM(amount) as total " +
    "FROM orders GROUP BY user_id"
    // This query continuously updates as new orders arrive
    // Emits changelog: +I (insert), -U (update before), +U (update after)
);

// 2. MATCH_RECOGNIZE - temporal pattern matching in SQL
tableEnv.executeSql(
    "SELECT * FROM orders " +
    "MATCH_RECOGNIZE (" +
    "  PARTITION BY user_id " +
    "  ORDER BY order_time " +
    "  MEASURES " +
    "    FIRST(A.order_time) AS start_time," +
    "    LAST(B.order_time) AS end_time," +
    "    SUM(A.amount) + B.amount AS total_amount " +
    "  PATTERN (A+ B) " +
    "  DEFINE " +
    "    A AS A.amount < 100," +
    "    B AS B.amount >= 500" +
    ")"
    // Detects: sequence of small orders followed by large order
);

// 3. Temporal table join (point-in-time lookup)
tableEnv.executeSql(
    "SELECT o.order_id, o.amount, o.amount * r.rate AS converted " +
    "FROM orders AS o " +
    "JOIN currency_rates FOR SYSTEM_TIME AS OF o.order_time AS r " +
    "ON o.currency = r.currency"
    // Joins each order with the exchange rate valid at order time
);

// 4. Deduplication with continuous query
tableEnv.executeSql(
    "SELECT * FROM (" +
    "  SELECT *, ROW_NUMBER() OVER (" +
    "    PARTITION BY order_id ORDER BY event_time DESC" +
    "  ) AS row_num FROM orders" +
    ") WHERE row_num = 1"
    // Keeps only the latest version of each order
);`
        },
        {
          name: 'Query Optimization',
          explanation: 'Volcano/Cascades optimizer for SQL. Rule-based and cost-based optimization. Predicate pushdown. Join reordering. Operator fusion. Statistics-based optimization. Explain plan for debugging. Incremental aggregation optimization.',
          codeExample: `// Query Optimization - understanding Flink's optimizer
StreamTableEnvironment tableEnv = StreamTableEnvironment.create(env);

// 1. Explain plan for debugging query optimization
String explanation = tableEnv.explainSql(
    "SELECT user_id, SUM(amount) FROM orders " +
    "WHERE amount > 100 GROUP BY user_id",
    ExplainDetail.ESTIMATED_COST,
    ExplainDetail.CHANGELOG_MODE,
    ExplainDetail.JSON_EXECUTION_PLAN
);
System.out.println(explanation);
// Output shows: logical plan, optimized plan, physical plan
// Optimizations applied: predicate pushdown, projection pruning

// 2. Table API explain
Table result = tableEnv.from("orders")
    .filter($("amount").isGreater(100))
    .groupBy($("user_id"))
    .select($("user_id"), $("amount").sum().as("total"));

System.out.println(result.explain());

// 3. Optimizer hints for join strategy
tableEnv.executeSql(
    "SELECT /*+ BROADCAST(dim) */ " +
    "  f.user_id, f.amount, dim.user_name " +
    "FROM fact_orders f " +
    "JOIN dim_users dim ON f.user_id = dim.user_id"
    // Hint: broadcast the smaller dimension table
);

// 4. Configure optimizer rules
Configuration config = tableEnv.getConfig().getConfiguration();
// Enable mini-batch aggregation (buffer and aggregate in batches)
config.setString("table.exec.mini-batch.enabled", "true");
config.setString("table.exec.mini-batch.allow-latency", "5s");
config.setString("table.exec.mini-batch.size", "5000");

// Enable two-phase aggregation (local + global)
config.setString("table.optimizer.agg-phase-strategy", "TWO_PHASE");

// Enable distinct aggregation splitting
config.setString("table.optimizer.distinct-agg.split.enabled", "true");`
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
          explanation: 'Standalone cluster mode. YARN for Hadoop environments. Kubernetes native deployment. Mesos support. Session vs per-job vs application mode. Run on-premise or cloud (AWS, GCP, Azure). Docker containers. Embedded mode for testing.',
          codeExample: `// Deployment modes and configuration

// 1. Application Mode (recommended for production)
// Each application runs its own JobManager
// $ bin/flink run-application -t kubernetes-application \\
//     -Dkubernetes.cluster-id=my-app \\
//     -Dkubernetes.container.image=my-flink-app:latest \\
//     local:///opt/flink/usrlib/my-app.jar

// 2. Session Mode (shared cluster for multiple jobs)
// $ bin/flink run -t kubernetes-session \\
//     -Dkubernetes.cluster-id=my-session \\
//     myJob.jar

// 3. Standalone cluster setup (flink-conf.yaml)
// jobmanager.rpc.address: jobmanager-host
// jobmanager.rpc.port: 6123
// jobmanager.memory.process.size: 4096m
// taskmanager.memory.process.size: 8192m
// taskmanager.numberOfTaskSlots: 4
// parallelism.default: 8

// 4. YARN deployment
// $ bin/flink run -t yarn-per-job \\
//     -Djobmanager.memory.process.size=4096m \\
//     -Dtaskmanager.memory.process.size=8192m \\
//     -Dtaskmanager.numberOfTaskSlots=4 \\
//     myJob.jar

// 5. Embedded mode for testing
public class EmbeddedFlinkTest {
    @Test
    public void testPipeline() throws Exception {
        StreamExecutionEnvironment env =
            StreamExecutionEnvironment.createLocalEnvironment(2);

        env.fromElements("hello", "world")
            .map(String::toUpperCase)
            .print();

        env.execute("Test Job");
    }
}`
        },
        {
          name: 'Dynamic Scaling',
          explanation: 'Rescale jobs without downtime. Savepoint → stop → change parallelism → restore. Reactive mode auto-scales based on available resources. Key groups enable rescaling keyed state. Rebalance partitions. Kubernetes HPA integration. Elastic resource allocation.',
          codeExample: `// Dynamic Scaling - rescale with savepoints

// 1. Stop job with savepoint
// $ bin/flink stop --savepointPath s3://savepoints/ <jobId>

// 2. Restart with new parallelism
// $ bin/flink run -s s3://savepoints/savepoint-abc123 \\
//     -p 16 myJob.jar  // Changed from 8 to 16

// 3. Reactive Mode - auto-scale based on TaskManagers
// In flink-conf.yaml:
// scheduler-mode: reactive
// When TaskManagers are added/removed, Flink automatically
// adjusts parallelism to use all available slots

// 4. Programmatic parallelism configuration
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

// Set default parallelism
env.setParallelism(8);

// Set per-operator parallelism
DataStream<Event> events = env.fromSource(source, watermarks, "src");

events
    .map(new ExpensiveTransform())
    .setParallelism(16)           // Higher parallelism for CPU-intensive
    .keyBy(Event::getKey)
    .window(TumblingEventTimeWindows.of(Time.minutes(5)))
    .aggregate(new MyAggregator())
    .setParallelism(8)
    .addSink(new MySink())
    .setParallelism(4);           // Lower parallelism for sink

// 5. Max parallelism (determines key groups for rescaling)
env.setMaxParallelism(128);
// Key groups = max parallelism
// Actual parallelism must be <= max parallelism
// Set max parallelism at job creation (cannot change later)

// 6. Kubernetes HPA for reactive scaling
// apiVersion: autoscaling/v2
// kind: HorizontalPodAutoscaler
// spec:
//   scaleTargetRef:
//     apiVersion: apps/v1
//     kind: Deployment
//     name: flink-taskmanager
//   minReplicas: 2
//   maxReplicas: 10`
        },
        {
          name: 'Resource Management',
          explanation: 'TaskManager and JobManager architecture. Slot sharing for efficiency. Task chaining reduces network overhead. Memory configuration: heap, off-heap, network buffers. CPU and memory profiles. Resource isolation. Workload-specific tuning.',
          codeExample: `// Resource Management Configuration

// 1. TaskManager Memory Configuration (flink-conf.yaml)
// taskmanager.memory.process.size: 8192m
// taskmanager.memory.flink.size: 6144m
//
// Memory breakdown:
// taskmanager.memory.framework.heap.size: 128m
// taskmanager.memory.task.heap.size: 2048m
// taskmanager.memory.managed.size: 2048m     (for RocksDB, sorting)
// taskmanager.memory.network.min: 256m
// taskmanager.memory.network.max: 1024m
// taskmanager.memory.task.off-heap.size: 256m

// 2. JobManager Memory Configuration
// jobmanager.memory.process.size: 4096m
// jobmanager.memory.heap.size: 2048m
// jobmanager.memory.off-heap.size: 256m

// 3. Slot sharing and resource groups
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

DataStream<Event> events = env.fromSource(source, watermarks, "src");

// Default: all operators share same slot (slot sharing group "default")
events
    .map(new LightTransform())      // Shares slot with source
    .keyBy(Event::getKey)
    .process(new HeavyProcessor())  // Shares slot
    .addSink(new MySink());         // Shares slot

// Custom slot sharing groups for resource isolation
events
    .map(new LightTransform())
    .slotSharingGroup("lightweight")   // Separate slot group
    .keyBy(Event::getKey)
    .process(new HeavyProcessor())
    .slotSharingGroup("heavyweight")   // Separate slot group
    .addSink(new MySink())
    .slotSharingGroup("io-intensive"); // Separate slot group

// 4. Disable operator chaining for debugging
env.disableOperatorChaining();
// Or per-operator:
events.map(new MyMapper()).disableChaining();`
        },
        {
          name: 'High Availability',
          explanation: 'Multiple JobManager instances with ZooKeeper. Leader election for active JobManager. TaskManager failure recovery. Checkpointing for state recovery. Region-based failover for localized failures. Split-brain prevention. Application master HA on YARN.',
          codeExample: `// High Availability Configuration

// 1. ZooKeeper-based HA (flink-conf.yaml)
// high-availability: zookeeper
// high-availability.zookeeper.quorum: zk1:2181,zk2:2181,zk3:2181
// high-availability.zookeeper.path.root: /flink
// high-availability.cluster-id: my-flink-cluster
// high-availability.storageDir: s3://ha-storage/

// 2. Kubernetes HA (flink-conf.yaml)
// high-availability: kubernetes
// high-availability.cluster-id: my-flink-cluster
// high-availability.storageDir: s3://ha-storage/
// kubernetes.cluster-id: my-flink-cluster

// 3. Programmatic HA configuration
Configuration config = new Configuration();
config.set(HighAvailabilityOptions.HA_MODE, "zookeeper");
config.set(HighAvailabilityOptions.HA_ZOOKEEPER_QUORUM, "zk1:2181,zk2:2181");
config.set(HighAvailabilityOptions.HA_STORAGE_PATH, "s3://ha-storage/");

StreamExecutionEnvironment env =
    StreamExecutionEnvironment.createRemoteEnvironment("jobmanager", 6123, config);

// 4. Masters file for standalone HA (conf/masters)
// jobmanager1:8081
// jobmanager2:8081
// (Both run as standby, ZK elects leader)

// 5. YARN HA setup
// yarn.application-attempts: 10
// (YARN restarts ApplicationMaster on failure)

// HA Architecture:
// JobManager 1 (Leader)  <--> ZooKeeper Quorum <--> Checkpoint Storage
// JobManager 2 (Standby) <--> (ZK Leader Election)
// JobManager 3 (Standby)
//
// On leader failure:
// 1. ZK detects heartbeat loss
// 2. New leader elected from standby
// 3. New leader recovers jobs from checkpoint storage
// 4. Processing resumes with minimal downtime`
        },
        {
          name: 'Monitoring & Metrics',
          explanation: 'REST API for job metrics. Prometheus, Grafana integration. Throughput, latency, backpressure metrics. Checkpoint statistics. Memory and CPU usage. Watermark monitoring. Web UI for visualization. Custom metrics reporters.',
          codeExample: `// Monitoring & Metrics Configuration

// 1. Prometheus metrics reporter (flink-conf.yaml)
// metrics.reporter.prom.factory.class:
//   org.apache.flink.metrics.prometheus.PrometheusReporterFactory
// metrics.reporter.prom.port: 9249

// 2. Custom metrics in operators
public class MonitoredProcessor extends RichMapFunction<Event, Result> {

    private transient Counter eventCounter;
    private transient Meter throughputMeter;
    private transient Histogram latencyHistogram;
    private transient Gauge<Long> pendingGauge;
    private long pendingCount = 0;

    @Override
    public void open(Configuration parameters) {
        // Counter - counts events
        eventCounter = getRuntimeContext()
            .getMetricGroup()
            .counter("processed_events");

        // Meter - tracks throughput (events/sec)
        throughputMeter = getRuntimeContext()
            .getMetricGroup()
            .meter("throughput", new MeterView(60));

        // Histogram - tracks latency distribution
        latencyHistogram = getRuntimeContext()
            .getMetricGroup()
            .histogram("processing_latency",
                new DescriptiveStatisticsHistogram(1000));

        // Gauge - tracks current value
        getRuntimeContext()
            .getMetricGroup()
            .gauge("pending_count", () -> pendingCount);
    }

    @Override
    public Result map(Event event) {
        long start = System.currentTimeMillis();

        Result result = process(event);

        // Update metrics
        eventCounter.inc();
        throughputMeter.markEvent();
        latencyHistogram.update(System.currentTimeMillis() - start);
        pendingCount = calculatePending();

        return result;
    }
}

// 3. REST API endpoints
// GET /jobs                          - List all jobs
// GET /jobs/<jobId>                  - Job details
// GET /jobs/<jobId>/checkpoints      - Checkpoint stats
// GET /taskmanagers                  - TaskManager list
// GET /taskmanagers/<tmId>/metrics   - TM metrics`
        },
        {
          name: 'Kubernetes Native',
          explanation: 'Native Kubernetes deployment mode. Dynamic resource allocation. Pod templates for customization. Service accounts and RBAC. ConfigMaps for configuration. Persistent volume claims for checkpoints. Operator for complex deployments. Multi-tenancy support.',
          codeExample: `// Kubernetes Native Deployment

// 1. Application mode deployment via CLI
// $ bin/flink run-application \\
//     --target kubernetes-application \\
//     -Dkubernetes.cluster-id=my-flink-app \\
//     -Dkubernetes.container.image=registry/my-app:v1.0 \\
//     -Dkubernetes.jobmanager.cpu=2 \\
//     -Dkubernetes.taskmanager.cpu=4 \\
//     -Dkubernetes.namespace=flink-prod \\
//     -Dkubernetes.service-account=flink-sa \\
//     local:///opt/flink/usrlib/my-app.jar

// 2. Kubernetes configuration (flink-conf.yaml)
// kubernetes.cluster-id: my-flink-app
// kubernetes.container.image: registry/my-app:v1.0
// kubernetes.namespace: flink-prod
// kubernetes.service-account: flink-sa
// kubernetes.jobmanager.replicas: 1
// kubernetes.taskmanager.cpu: 4
// kubernetes.rest-service.exposed.type: LoadBalancer

// 3. Pod template for customization
// kubernetes.pod-template-file: /opt/flink/pod-template.yaml
//
// apiVersion: v1
// kind: Pod
// spec:
//   containers:
//     - name: flink-main-container
//       resources:
//         requests:
//           memory: "8Gi"
//           cpu: "4"
//         limits:
//           memory: "12Gi"
//           cpu: "8"
//       volumeMounts:
//         - name: checkpoint-pvc
//           mountPath: /checkpoints
//   volumes:
//     - name: checkpoint-pvc
//       persistentVolumeClaim:
//         claimName: flink-checkpoints
//   tolerations:
//     - key: "dedicated"
//       operator: "Equal"
//       value: "flink"
//       effect: "NoSchedule"
//   nodeSelector:
//     workload-type: stream-processing

// 4. Flink Kubernetes Operator (FlinkDeployment CRD)
// apiVersion: flink.apache.org/v1beta1
// kind: FlinkDeployment
// metadata:
//   name: my-flink-app
// spec:
//   image: registry/my-app:v1.0
//   flinkVersion: v1_17
//   flinkConfiguration:
//     taskmanager.numberOfTaskSlots: "4"
//   jobManager:
//     resource: { memory: "4096m", cpu: 2 }
//   taskManager:
//     resource: { memory: "8192m", cpu: 4 }
//     replicas: 3
//   job:
//     jarURI: local:///opt/flink/usrlib/my-app.jar
//     parallelism: 12
//     upgradeMode: savepoint`
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
          explanation: 'HDFS, S3, Azure Blob storage connectors. Parquet, ORC, Avro, CSV formats. Streaming file monitoring with continuous ingestion. Bucketing for exactly-once file sinks. Rolling policies for file rotation. Partition pruning. Compaction strategies.',
          codeExample: `// File System Source & Sink
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

// 1. File Source - continuously monitor directory for new files
FileSource<String> fileSource = FileSource
    .forRecordStreamFormat(
        new TextLineInputFormat(),
        new Path("s3://my-bucket/input/")
    )
    .monitorContinuously(Duration.ofMinutes(1))  // Check every minute
    .build();

DataStream<String> lines = env.fromSource(
    fileSource,
    WatermarkStrategy.noWatermarks(),
    "File Source"
);

// 2. Parquet file source (bounded/batch)
FileSource<GenericRecord> parquetSource = FileSource
    .forBulkFileFormat(
        new ParquetAvroInputFormat<>(schema),
        new Path("s3://my-bucket/data/")
    )
    .build();

// 3. FileSink with bucketing and rolling policies
FileSink<String> fileSink = FileSink
    .forRowFormat(
        new Path("s3://my-bucket/output/"),
        new SimpleStringEncoder<String>("UTF-8")
    )
    // Bucket by date (creates partitioned output)
    .withBucketAssigner(new DateTimeBucketAssigner<>("yyyy-MM-dd--HH"))
    // Roll file after 15 minutes or 1 GB
    .withRollingPolicy(
        DefaultRollingPolicy.builder()
            .withRolloverInterval(Duration.ofMinutes(15))
            .withInactivityInterval(Duration.ofMinutes(5))
            .withMaxPartSize(MemorySize.ofMebiBytes(1024))
            .build()
    )
    .build();

// 4. Parquet bulk format sink
FileSink<GenericRecord> parquetSink = FileSink
    .forBulkFormat(
        new Path("s3://my-bucket/parquet-output/"),
        ParquetAvroWriters.forGenericRecord(schema)
    )
    .withBucketAssigner(new DateTimeBucketAssigner<>("yyyy/MM/dd"))
    .build();

processedStream.sinkTo(fileSink);`
        },
        {
          name: 'Databases',
          explanation: 'JDBC connector for relational databases. Change Data Capture (CDC) connectors: Debezium, Canal. Elasticsearch for search and analytics. MongoDB, Cassandra connectors. HBase integration. Upsert mode for databases. Connection pooling. Batch writes.',
          codeExample: `// Database Connectors
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

// 1. JDBC Sink - write to relational database
DataStream<Order> orders = ...;

orders.addSink(JdbcSink.sink(
    "INSERT INTO orders (order_id, user_id, amount, status) " +
    "VALUES (?, ?, ?, ?) " +
    "ON DUPLICATE KEY UPDATE status = ?, amount = ?",
    (ps, order) -> {
        ps.setString(1, order.getOrderId());
        ps.setString(2, order.getUserId());
        ps.setBigDecimal(3, order.getAmount());
        ps.setString(4, order.getStatus());
        ps.setString(5, order.getStatus());     // For upsert
        ps.setBigDecimal(6, order.getAmount());  // For upsert
    },
    JdbcExecutionOptions.builder()
        .withBatchSize(1000)
        .withBatchIntervalMs(5000)
        .withMaxRetries(3)
        .build(),
    new JdbcConnectionOptions.JdbcConnectionOptionsBuilder()
        .withUrl("jdbc:mysql://localhost:3306/mydb")
        .withDriverName("com.mysql.cj.jdbc.Driver")
        .withUsername("flink")
        .withPassword("secret")
        .build()
));

// 2. CDC Source (Debezium) - capture database changes
// Table API:
// CREATE TABLE products_cdc (
//   id INT,
//   name STRING,
//   price DECIMAL(10,2),
//   PRIMARY KEY (id) NOT ENFORCED
// ) WITH (
//   'connector' = 'mysql-cdc',
//   'hostname' = 'mysql-host',
//   'port' = '3306',
//   'username' = 'cdc_user',
//   'password' = 'secret',
//   'database-name' = 'inventory',
//   'table-name' = 'products'
// );
// Captures INSERT, UPDATE, DELETE in real-time

// 3. Elasticsearch Sink
DataStream<Event> events = ...;

events.sinkTo(
    new Elasticsearch7SinkBuilder<Event>()
        .setHosts(new HttpHost("elasticsearch", 9200, "http"))
        .setEmitter((event, ctx, indexer) -> {
            indexer.add(Requests.indexRequest()
                .index("events-" + event.getDate())
                .source(event.toJson(), XContentType.JSON));
        })
        .setBulkFlushMaxActions(1000)
        .setBulkFlushInterval(5000)
        .build()
);`
        },
        {
          name: 'AWS Services',
          explanation: 'Kinesis Data Streams source and sink. DynamoDB sink. S3 StreamingFileSink. AWS SDK authentication. IAM role support. Enhanced fan-out for Kinesis. Cross-region replication. Glue catalog integration. EMR deployment.',
          codeExample: `// AWS Services Integration
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

// 1. Kinesis Data Streams Source
Properties kinesisProps = new Properties();
kinesisProps.setProperty(AWSConfigConstants.AWS_REGION, "us-east-1");
kinesisProps.setProperty(AWSConfigConstants.AWS_CREDENTIALS_PROVIDER, "AUTO");
kinesisProps.setProperty(ConsumerConfigConstants.STREAM_INITIAL_POSITION, "LATEST");
// Enhanced Fan-Out for dedicated throughput
kinesisProps.setProperty(ConsumerConfigConstants.RECORD_PUBLISHER_TYPE, "EFO");
kinesisProps.setProperty(ConsumerConfigConstants.EFO_CONSUMER_NAME, "flink-consumer");

FlinkKinesisConsumer<String> kinesisSource = new FlinkKinesisConsumer<>(
    "my-kinesis-stream",
    new SimpleStringSchema(),
    kinesisProps
);

DataStream<String> kinesisStream = env.addSource(kinesisSource);

// 2. Kinesis Data Streams Sink
Properties sinkProps = new Properties();
sinkProps.setProperty(AWSConfigConstants.AWS_REGION, "us-east-1");

KinesisStreamsSink<String> kinesisSink = KinesisStreamsSink.<String>builder()
    .setKinesisClientProperties(sinkProps)
    .setStreamName("output-stream")
    .setSerializationSchema(new SimpleStringSchema())
    .setPartitionKeyGenerator(element -> String.valueOf(element.hashCode()))
    .build();

processedStream.sinkTo(kinesisSink);

// 3. S3 File Sink with checkpointing
FileSink<String> s3Sink = FileSink
    .forRowFormat(
        new Path("s3://my-bucket/flink-output/"),
        new SimpleStringEncoder<String>("UTF-8")
    )
    .withBucketAssigner(new DateTimeBucketAssigner<>())
    .build();

// 4. DynamoDB Sink
DynamoDbSink<Event> dynamoSink = DynamoDbSink.<Event>builder()
    .setTableName("events")
    .setElementConverter(new EventToDynamoConverter())
    .setDynamoDbProperties(sinkProps)
    .setMaxBatchSize(25)
    .build();

// 5. AWS Glue Catalog for Table API
// CREATE CATALOG glue_catalog WITH (
//   'type' = 'glue',
//   'aws.region' = 'us-east-1'
// );
// USE CATALOG glue_catalog;`
        },
        {
          name: 'Message Queues',
          explanation: 'RabbitMQ, Pulsar connectors. JMS support for enterprise messaging. MQTT for IoT scenarios. NATS connector. Exactly-once delivery guarantees. Queue discovery. Message acknowledgment strategies. Dead letter queues.',
          codeExample: `// Message Queue Connectors
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

// 1. RabbitMQ Source
RMQConnectionConfig rmqConfig = new RMQConnectionConfig.Builder()
    .setHost("rabbitmq-host")
    .setPort(5672)
    .setVirtualHost("/")
    .setUserName("guest")
    .setPassword("guest")
    .build();

DataStream<String> rmqStream = env.addSource(
    new RMQSource<>(
        rmqConfig,
        "my-queue",
        true,  // Use correlation IDs for exactly-once
        new SimpleStringSchema()
    )
).setParallelism(1); // RabbitMQ source must be single-threaded

// 2. RabbitMQ Sink
rmqStream
    .map(new MyTransform())
    .addSink(new RMQSink<>(
        rmqConfig,
        "output-queue",
        new SimpleStringSchema()
    ));

// 3. Apache Pulsar Source
PulsarSource<String> pulsarSource = PulsarSource.builder()
    .setServiceUrl("pulsar://pulsar-host:6650")
    .setAdminUrl("http://pulsar-host:8080")
    .setStartCursor(StartCursor.earliest())
    .setTopics("persistent://public/default/my-topic")
    .setDeserializationSchema(
        PulsarDeserializationSchema.flinkSchema(new SimpleStringSchema())
    )
    .setSubscriptionName("flink-sub")
    .setSubscriptionType(SubscriptionType.Exclusive)
    .build();

DataStream<String> pulsarStream = env.fromSource(
    pulsarSource,
    WatermarkStrategy.noWatermarks(),
    "Pulsar Source"
);

// 4. Pulsar Sink
PulsarSink<String> pulsarSink = PulsarSink.builder()
    .setServiceUrl("pulsar://pulsar-host:6650")
    .setAdminUrl("http://pulsar-host:8080")
    .setTopics("persistent://public/default/output-topic")
    .setSerializationSchema(
        PulsarSerializationSchema.flinkSchema(new SimpleStringSchema())
    )
    .setDeliveryGuarantee(DeliveryGuarantee.EXACTLY_ONCE)
    .build();

processedStream.sinkTo(pulsarSink);`
        },
        {
          name: 'Custom Connectors',
          explanation: 'Implement SourceFunction or SinkFunction interfaces. RichFunction for initialization. Async I/O for external lookups. Table connector SDK for Table API. FLIP-27 source interface. Watermark strategies. Exactly-once sink implementation patterns.',
          codeExample: `// Custom Connector Implementation

// 1. Custom Source (FLIP-27 Source API)
public class CustomSource implements Source<Event, CustomSplit, CustomEnumState> {

    @Override
    public Boundedness getBoundedness() {
        return Boundedness.CONTINUOUS_UNBOUNDED;
    }

    @Override
    public SplitEnumerator<CustomSplit, CustomEnumState> createEnumerator(
            SplitEnumeratorContext<CustomSplit> ctx) {
        return new CustomSplitEnumerator(ctx);
    }

    @Override
    public SourceReader<Event, CustomSplit> createReader(SourceReaderContext ctx) {
        return new CustomSourceReader(ctx);
    }
}

// 2. Custom Sink (SinkFunction)
public class CustomDatabaseSink extends RichSinkFunction<Event> {

    private transient Connection connection;
    private transient PreparedStatement statement;

    @Override
    public void open(Configuration parameters) throws Exception {
        connection = DriverManager.getConnection("jdbc:...");
        statement = connection.prepareStatement(
            "INSERT INTO events (id, data, ts) VALUES (?, ?, ?)"
        );
    }

    @Override
    public void invoke(Event event, Context context) throws Exception {
        statement.setString(1, event.getId());
        statement.setString(2, event.getData());
        statement.setTimestamp(3, new Timestamp(event.getTimestamp()));
        statement.executeUpdate();
    }

    @Override
    public void close() throws Exception {
        if (statement != null) statement.close();
        if (connection != null) connection.close();
    }
}

// 3. Async I/O for external service lookups
public class AsyncEnrichmentFunction
    extends RichAsyncFunction<Event, EnrichedEvent> {

    private transient AsyncHttpClient httpClient;

    @Override
    public void open(Configuration parameters) {
        httpClient = new AsyncHttpClient();
    }

    @Override
    public void asyncInvoke(Event event,
                            ResultFuture<EnrichedEvent> resultFuture) {
        CompletableFuture<UserProfile> future =
            httpClient.getUser(event.getUserId());

        future.thenAccept(profile -> {
            resultFuture.complete(
                Collections.singleton(new EnrichedEvent(event, profile))
            );
        });
    }

    @Override
    public void timeout(Event event, ResultFuture<EnrichedEvent> out) {
        out.complete(Collections.singleton(
            new EnrichedEvent(event, UserProfile.unknown())
        ));
    }
}

// Usage:
AsyncDataStream.unorderedWait(
    events, new AsyncEnrichmentFunction(),
    5000, TimeUnit.MILLISECONDS, 100
);`
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
          explanation: 'Streaming execution without batch boundaries. Data flows through operators without materialization. Lower latency than batch. Credit-based flow control for back-pressure. Network buffers for efficiency. No disk spilling in streaming mode.',
          codeExample: `// Pipelined Execution - data flows through operator chain
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

// Operators are chained into a single task when possible
// This avoids serialization/deserialization between operators
DataStream<Event> events = env.fromSource(source, watermarks, "src");

DataStream<Result> results = events
    // These operators will be chained together
    .filter(e -> e.isValid())          // Chained: no serialization
    .map(e -> transform(e))            // Chained: direct function call
    .flatMap(new EnrichFunction())     // Chained: direct function call
    // KeyBy forces a network shuffle (new chain starts)
    .keyBy(Event::getKey)
    // New chain after shuffle
    .process(new StatefulProcessor()); // Chained with window

// Control chaining behavior
events
    .map(new ExpensiveMapper())
    .startNewChain()                   // Force new chain
    .keyBy(Event::getKey)
    .process(new MyProcessor())
    .disableChaining();                // Isolate this operator

// Network buffer configuration (flink-conf.yaml)
// taskmanager.network.memory.min: 256mb
// taskmanager.network.memory.max: 1gb
// taskmanager.network.memory.fraction: 0.1
// taskmanager.network.memory.buffers-per-channel: 2
// taskmanager.network.memory.floating-buffers-per-gate: 8

// Credit-based flow control:
// - Receiver tells sender how many buffers it can accept (credits)
// - Sender only sends data when credits are available
// - Prevents buffer bloat and excessive memory usage
// - Back-pressure propagates naturally upstream`
        },
        {
          name: 'Memory Management',
          explanation: 'Off-heap memory management with Flink-managed memory. Binary format in memory. Sorting and hashing without JVM heap. Prevents OutOfMemoryErrors. Spill to disk for large state. Memory pools. Garbage collection reduction. RocksDB memory integration.',
          codeExample: `// Memory Management Configuration

// TaskManager Memory Model (flink-conf.yaml):
//
// Total Process Memory: 8192m
// |-- JVM Heap
// |   |-- Framework Heap: 128m (Flink runtime)
// |   |-- Task Heap: 2048m (user code)
// |-- Off-Heap
// |   |-- Managed Memory: 2048m (RocksDB, sorting, caching)
// |   |-- Framework Off-Heap: 128m
// |   |-- Task Off-Heap: 256m
// |   |-- Network Memory: 1024m (shuffle buffers)
// |-- JVM Metaspace: 256m
// |-- JVM Overhead: 192m (native, thread stacks)

// Configuration:
// taskmanager.memory.process.size: 8192m
// taskmanager.memory.task.heap.size: 2048m
// taskmanager.memory.managed.fraction: 0.4
// taskmanager.memory.network.fraction: 0.1
// taskmanager.memory.jvm-metaspace.size: 256m
// taskmanager.memory.jvm-overhead.fraction: 0.1

// RocksDB memory configuration
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

// RocksDB uses managed memory by default
EmbeddedRocksDBStateBackend rocksDB = new EmbeddedRocksDBStateBackend();
env.setStateBackend(rocksDB);

// Fine-tune RocksDB memory
Configuration config = new Configuration();
// Use managed memory for RocksDB (recommended)
config.set(RocksDBConfigurableOptions.USE_MANAGED_MEMORY, true);
// Fixed memory for RocksDB block cache and write buffers
config.set(RocksDBConfigurableOptions.FIX_PER_TM_MEMORY_SIZE,
    MemorySize.parse("2gb"));

// JVM Garbage Collection tuning
// For low-latency: use G1GC
// env.java.opts.taskmanager: -XX:+UseG1GC
//   -XX:MaxGCPauseMillis=100
//   -XX:ParallelGCThreads=4
// For throughput: use ZGC (JDK 15+)
// env.java.opts.taskmanager: -XX:+UseZGC`
        },
        {
          name: 'Network Stack',
          explanation: 'Netty-based network communication. Zero-copy network transfers. Network buffer tuning. Compression for network traffic. Batch shuffle for batch jobs. Credit-based flow control prevents buffer bloat. SSL/TLS encryption. Network bandwidth management.',
          codeExample: `// Network Stack Configuration

// 1. Network buffer tuning (flink-conf.yaml)
// taskmanager.network.memory.min: 256mb
// taskmanager.network.memory.max: 1gb
// taskmanager.network.memory.fraction: 0.1
// taskmanager.network.memory.buffers-per-channel: 2
// taskmanager.network.memory.floating-buffers-per-gate: 8

// 2. Network compression (reduce bandwidth)
// taskmanager.network.compression.codec: lz4  (or zstd, snappy)
// Compresses shuffle data between operators
// Trade CPU for network bandwidth

// 3. SSL/TLS encryption
// security.ssl.internal.enabled: true
// security.ssl.internal.keystore: /path/to/keystore.jks
// security.ssl.internal.keystore-password: keystore-pass
// security.ssl.internal.truststore: /path/to/truststore.jks
// security.ssl.internal.truststore-password: truststore-pass
//
// security.ssl.rest.enabled: true  (encrypt REST API)

// 4. Batch shuffle configuration for batch mode
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
env.setRuntimeMode(RuntimeExecutionMode.BATCH);

// Sort-shuffle (default for batch)
// taskmanager.network.sort-shuffle.min-parallelism: 1
// taskmanager.network.sort-shuffle.min-buffers: 512

// Hash-shuffle (alternative)
// taskmanager.network.blocking-shuffle.type: hash

// 5. Netty configuration
// taskmanager.network.netty.num-arenas: 4
// taskmanager.network.netty.server.numThreads: 4
// taskmanager.network.netty.client.numThreads: 4
// taskmanager.network.netty.transport: auto  (epoll on Linux, nio elsewhere)

// 6. Buffer timeout for latency tuning
env.setBufferTimeout(100); // Flush every 100ms (default)
// env.setBufferTimeout(0);  // Flush immediately (lowest latency)
// env.setBufferTimeout(-1); // Flush only when buffer is full (highest throughput)`
        },
        {
          name: 'Operator Chaining',
          explanation: 'Combine multiple operators into single task. Reduce serialization overhead. Function calls instead of network. Parallel execution in single thread. Disable for debugging. Start new chain for specific operators. Slot sharing groups.',
          codeExample: `// Operator Chaining - fuse operators into single task
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

// By default, Flink chains compatible operators together
// Chained operators run in the same thread, no serialization needed
DataStream<Event> events = env.fromSource(source, watermarks, "src");

// Example: these 3 operators will be chained into ONE task
DataStream<String> result = events
    .filter(e -> e.getType().equals("CLICK"))  // Chained
    .map(e -> e.getUserId())                    // Chained
    .flatMap((userId, out) -> {                 // Chained
        out.collect(userId.toUpperCase());
    });
// Without chaining: Source -> [network] -> Filter -> [network] -> Map -> [network] -> FlatMap
// With chaining:    [Source | Filter | Map | FlatMap] (single task, no network)

// Control chaining per operator
events
    .map(new Step1())
    .name("step1")                       // Name for web UI
    .startNewChain()                     // Break chain, start new one here
    .map(new Step2())                    // Chained with Step1's new chain
    .disableChaining()                   // This operator runs alone
    .map(new Step3());                   // Starts yet another chain

// Globally disable chaining (useful for debugging)
env.disableOperatorChaining();

// Chaining conditions (operators are chained when ALL are true):
// 1. Same parallelism
// 2. Same slot sharing group
// 3. Neither has disableChaining()
// 4. Connected by FORWARD or REBALANCE partitioner
// 5. Downstream operator has single input
// 6. ChainingStrategy is not NEVER

// Slot sharing groups for resource isolation
events
    .map(new CpuIntensive()).slotSharingGroup("cpu-heavy")
    .keyBy(Event::getKey)
    .process(new IoIntensive()).slotSharingGroup("io-heavy");`
        },
        {
          name: 'Batch Processing Mode',
          explanation: 'Optimized execution for bounded data. Sort-based aggregations and joins. Blocking shuffles for efficiency. Adaptive query execution. Statistics-based optimization. Hash joins vs sort-merge joins. Memory budget allocation. Batch vs streaming trade-offs.',
          codeExample: `// Batch Processing Mode
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

// Set execution mode to BATCH for bounded data
env.setRuntimeMode(RuntimeExecutionMode.BATCH);
// AUTOMATIC: Flink decides based on source boundedness
// env.setRuntimeMode(RuntimeExecutionMode.AUTOMATIC);

// Read bounded data source
FileSource<String> source = FileSource
    .forRecordStreamFormat(new TextLineInputFormat(), new Path("s3://data/input/"))
    .build();

DataStream<String> input = env.fromSource(
    source, WatermarkStrategy.noWatermarks(), "File Source"
);

// Same API works for batch and streaming
DataStream<Tuple2<String, Integer>> wordCounts = input
    .flatMap((line, out) -> {
        for (String word : line.split("\\\\s+")) {
            out.collect(Tuple2.of(word, 1));
        }
    })
    .returns(Types.TUPLE(Types.STRING, Types.INT))
    .keyBy(t -> t.f0)
    .sum(1);

wordCounts.sinkTo(fileSink);

// Batch mode optimizations (flink-conf.yaml):
// execution.batch-shuffle-mode: ALL_EXCHANGES_BLOCKING
// (Blocking shuffle: write all data before downstream reads)

// Sort-based shuffle for large data
// taskmanager.network.sort-shuffle.min-parallelism: 1

// Memory for sorting and hashing
// taskmanager.memory.managed.fraction: 0.4

// Batch-specific Table API optimizations
// table.exec.resource.default-parallelism: 16
// table.optimizer.join.broadcast-threshold: 10485760  (10MB)

env.execute("Batch Word Count");`
        },
        {
          name: 'Benchmarks',
          explanation: 'Industry-leading performance. Yahoo Streaming Benchmark results. TPC-DS for SQL performance. Nexmark benchmark for streaming auctions. Lower latency than alternatives. High throughput sustained. Stateful streaming at scale. Terabyte-scale state management.',
          codeExample: `// Benchmark and Performance Testing Setup

// 1. Nexmark Benchmark - streaming auction simulation
// Measures: throughput, latency for common streaming patterns
// $ bin/flink run nexmark-flink.jar \\
//     --query q5 \\
//     --events-num 100000000 \\
//     --parallelism 8

// 2. Simple throughput benchmark
public class ThroughputBenchmark {
    public static void main(String[] args) throws Exception {
        StreamExecutionEnvironment env =
            StreamExecutionEnvironment.getExecutionEnvironment();
        env.setParallelism(8);

        // Generate 100M events as fast as possible
        DataStream<Event> events = env.addSource(new EventGenerator(100_000_000));

        events
            .keyBy(Event::getKey)
            .window(TumblingProcessingTimeWindows.of(Time.seconds(10)))
            .aggregate(new CountAggregate())
            .addSink(new DiscardingSink<>());

        JobExecutionResult result = env.execute("Throughput Benchmark");

        long elapsed = result.getNetRuntime(TimeUnit.MILLISECONDS);
        System.out.println("Throughput: " +
            (100_000_000 * 1000L / elapsed) + " events/sec");
        System.out.println("Runtime: " + elapsed + " ms");
    }
}

// 3. Latency measurement with LatencyMarker
// In flink-conf.yaml:
// metrics.latency.interval: 2000  (emit latency marker every 2s)
// metrics.latency.granularity: operator
// Access via: Flink Web UI > Task Metrics > latency

// Typical benchmark results (8-node cluster):
// Throughput: 10-50M events/sec (depending on complexity)
// Latency: 10-100ms (p99, end-to-end)
// State: handles TBs of state with RocksDB
// Checkpointing: < 1 second for 100GB state (incremental)

// 4. Performance comparison dimensions:
// vs Spark Streaming: Lower latency (true streaming vs micro-batch)
// vs Kafka Streams: Better for complex topologies, larger state
// vs Storm: Higher throughput, exactly-once guarantees
// Flink advantage: unified batch+stream, managed state`
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
          explanation: 'Streaming dashboards and KPIs. Aggregations over tumbling/sliding windows. Real-time reports and alerts. Business intelligence on fresh data. Customer behavior analytics. Application performance monitoring. Ad-hoc queries on streams with SQL.',
          codeExample: `// Real-time Analytics Dashboard Pipeline
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
StreamTableEnvironment tableEnv = StreamTableEnvironment.create(env);

// 1. Ingest clickstream events from Kafka
tableEnv.executeSql(
    "CREATE TABLE clickstream (" +
    "  user_id STRING," +
    "  page_url STRING," +
    "  event_type STRING," +
    "  device STRING," +
    "  event_time TIMESTAMP(3)," +
    "  WATERMARK FOR event_time AS event_time - INTERVAL '10' SECOND" +
    ") WITH (" +
    "  'connector' = 'kafka'," +
    "  'topic' = 'clickstream'," +
    "  'format' = 'json'" +
    ")"
);

// 2. Real-time KPIs with windowed aggregation
tableEnv.executeSql(
    "CREATE VIEW realtime_kpis AS " +
    "SELECT " +
    "  TUMBLE_START(event_time, INTERVAL '1' MINUTE) as window_start," +
    "  COUNT(DISTINCT user_id) as active_users," +
    "  COUNT(*) as total_events," +
    "  COUNT(CASE WHEN event_type = 'PURCHASE' THEN 1 END) as purchases," +
    "  SUM(CASE WHEN event_type = 'PURCHASE' THEN 1.0 ELSE 0 END) / " +
    "    COUNT(DISTINCT user_id) as conversion_rate " +
    "FROM clickstream " +
    "GROUP BY TUMBLE(event_time, INTERVAL '1' MINUTE)"
);

// 3. Sink to Elasticsearch for Kibana dashboard
tableEnv.executeSql(
    "CREATE TABLE dashboard_sink (" +
    "  window_start TIMESTAMP(3)," +
    "  active_users BIGINT," +
    "  total_events BIGINT," +
    "  purchases BIGINT," +
    "  conversion_rate DOUBLE" +
    ") WITH (" +
    "  'connector' = 'elasticsearch-7'," +
    "  'hosts' = 'http://elasticsearch:9200'," +
    "  'index' = 'realtime-kpis'" +
    ")"
);

tableEnv.executeSql(
    "INSERT INTO dashboard_sink SELECT * FROM realtime_kpis"
);`
        },
        {
          name: 'ETL Pipelines',
          explanation: 'Extract-Transform-Load for data lakes and warehouses. Streaming ingestion from multiple sources. Data cleansing and enrichment. Schema evolution and validation. Compaction and deduplication. Incremental updates to data warehouse. Medallion architecture (bronze/silver/gold).',
          codeExample: `// Streaming ETL Pipeline - Medallion Architecture
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
env.enableCheckpointing(60000);

// Bronze Layer: Raw ingestion from multiple sources
DataStream<String> rawOrders = env.fromSource(kafkaOrdersSource, watermarks, "orders");
DataStream<String> rawPayments = env.fromSource(kafkaPaymentsSource, watermarks, "payments");

// Silver Layer: Cleansed, validated, enriched data
DataStream<Order> cleanOrders = rawOrders
    .map(json -> Order.fromJson(json))
    .filter(order -> order.isValid())           // Remove invalid records
    .map(order -> {
        // Data cleansing
        order.setEmail(order.getEmail().toLowerCase().trim());
        order.setAmount(order.getAmount().setScale(2, RoundingMode.HALF_UP));
        return order;
    })
    .keyBy(Order::getOrderId)
    .process(new DeduplicationFunction());       // Remove duplicates

// Enrichment: join with dimension data
DataStream<EnrichedOrder> enrichedOrders = cleanOrders
    .keyBy(Order::getCustomerId)
    .connect(customerDimStream.keyBy(Customer::getId))
    .process(new EnrichmentFunction());

// Gold Layer: Business aggregations
DataStream<DailyRevenue> dailyRevenue = enrichedOrders
    .keyBy(order -> order.getRegion())
    .window(TumblingEventTimeWindows.of(Time.days(1)))
    .aggregate(new RevenueAggregator());

// Sink to data lake (Parquet on S3)
enrichedOrders.sinkTo(FileSink
    .forBulkFormat(
        new Path("s3://data-lake/silver/orders/"),
        ParquetAvroWriters.forReflectRecord(EnrichedOrder.class)
    )
    .withBucketAssigner(new DateTimeBucketAssigner<>("yyyy/MM/dd"))
    .build()
);

// Sink aggregations to data warehouse
dailyRevenue.addSink(JdbcSink.sink(
    "INSERT INTO daily_revenue (region, date, total) VALUES (?, ?, ?)" +
    " ON CONFLICT (region, date) DO UPDATE SET total = ?",
    (ps, rev) -> {
        ps.setString(1, rev.getRegion());
        ps.setDate(2, rev.getDate());
        ps.setBigDecimal(3, rev.getTotal());
        ps.setBigDecimal(4, rev.getTotal());
    },
    jdbcOptions, jdbcConnectionOptions
));`
        },
        {
          name: 'Fraud Detection',
          explanation: 'Real-time transaction monitoring. Pattern detection with CEP. Machine learning model scoring. Rule engines for complex logic. Risk scoring and alerting. Multi-level aggregations. Session-based analysis. Low-latency requirements (milliseconds).',
          codeExample: `// Real-time Fraud Detection System
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

DataStream<Transaction> transactions = env.fromSource(kafkaSource, watermarks, "txn");

// 1. Rule-based fraud detection with stateful processing
DataStream<FraudAlert> ruleAlerts = transactions
    .keyBy(Transaction::getAccountId)
    .process(new FraudRuleEngine());

public class FraudRuleEngine extends KeyedProcessFunction<String, Transaction, FraudAlert> {
    private ValueState<Double> runningTotal;
    private ValueState<Long> transactionCount;
    private ListState<Transaction> recentTransactions;

    @Override
    public void open(Configuration params) {
        runningTotal = getRuntimeContext().getState(
            new ValueStateDescriptor<>("total", Double.class));
        transactionCount = getRuntimeContext().getState(
            new ValueStateDescriptor<>("count", Long.class));
        recentTransactions = getRuntimeContext().getListState(
            new ListStateDescriptor<>("recent", Transaction.class));
    }

    @Override
    public void processElement(Transaction txn, Context ctx, Collector<FraudAlert> out) throws Exception {
        Double total = runningTotal.value();
        if (total == null) total = 0.0;
        Long count = transactionCount.value();
        if (count == null) count = 0L;

        // Rule 1: Single large transaction
        if (txn.getAmount() > 10000) {
            out.collect(new FraudAlert(txn, "HIGH_AMOUNT", 0.8));
        }

        // Rule 2: Velocity check (>5 transactions in 1 minute)
        recentTransactions.add(txn);
        if (count > 5) {
            out.collect(new FraudAlert(txn, "HIGH_VELOCITY", 0.7));
        }

        // Rule 3: Unusual location
        // (compare with historical pattern using broadcast state)

        runningTotal.update(total + txn.getAmount());
        transactionCount.update(count + 1);

        // Register cleanup timer (reset counters every hour)
        ctx.timerService().registerEventTimeTimer(
            txn.getTimestamp() + 3600000);
    }

    @Override
    public void onTimer(long timestamp, OnTimerContext ctx, Collector<FraudAlert> out) {
        transactionCount.clear();
        runningTotal.clear();
        recentTransactions.clear();
    }
}

// 2. CEP pattern: small transaction followed by large withdrawal
Pattern<Transaction, ?> fraudPattern = Pattern.<Transaction>begin("small")
    .where(SimpleCondition.of(t -> t.getAmount() < 1.0))
    .followedBy("large")
    .where(SimpleCondition.of(t -> t.getAmount() > 5000))
    .within(Time.minutes(5));`
        },
        {
          name: 'IoT & Sensors',
          explanation: 'Process telemetry from millions of devices. Time-series aggregations. Anomaly detection on sensor data. Predictive maintenance. Device state management. Geo-spatial processing. Protocol conversion (MQTT, CoAP). Edge computing integration.',
          codeExample: `// IoT Sensor Data Processing Pipeline
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

// Ingest sensor data from MQTT/Kafka
DataStream<SensorReading> readings = env.fromSource(sensorSource, watermarks, "sensors");

// 1. Per-device state management and anomaly detection
DataStream<Alert> anomalies = readings
    .keyBy(SensorReading::getDeviceId)
    .process(new AnomalyDetector());

public class AnomalyDetector extends KeyedProcessFunction<String, SensorReading, Alert> {
    private ValueState<Double> avgTemperature;
    private ValueState<Double> stdDeviation;
    private ValueState<Long> readingCount;

    @Override
    public void open(Configuration params) {
        avgTemperature = getRuntimeContext().getState(
            new ValueStateDescriptor<>("avg-temp", Double.class));
        stdDeviation = getRuntimeContext().getState(
            new ValueStateDescriptor<>("std-dev", Double.class));
        readingCount = getRuntimeContext().getState(
            new ValueStateDescriptor<>("count", Long.class));
    }

    @Override
    public void processElement(SensorReading reading, Context ctx,
                                Collector<Alert> out) throws Exception {
        Double avg = avgTemperature.value();
        Double std = stdDeviation.value();
        Long count = readingCount.value();

        if (avg != null && std != null && std > 0) {
            double zScore = Math.abs(reading.getTemperature() - avg) / std;
            if (zScore > 3.0) {
                out.collect(new Alert(
                    reading.getDeviceId(),
                    "TEMPERATURE_ANOMALY",
                    "Z-score: " + zScore
                ));
            }
        }

        // Update running statistics
        count = (count == null) ? 1L : count + 1;
        avg = (avg == null) ? reading.getTemperature() :
            avg + (reading.getTemperature() - avg) / count;

        avgTemperature.update(avg);
        readingCount.update(count);
    }
}

// 2. Time-series aggregation (5-minute windows)
DataStream<DeviceStats> stats = readings
    .keyBy(SensorReading::getDeviceId)
    .window(TumblingEventTimeWindows.of(Time.minutes(5)))
    .aggregate(new AggregateFunction<SensorReading, StatsAccumulator, DeviceStats>() {
        public StatsAccumulator createAccumulator() { return new StatsAccumulator(); }
        public StatsAccumulator add(SensorReading r, StatsAccumulator acc) {
            acc.addReading(r.getTemperature());
            return acc;
        }
        public DeviceStats getResult(StatsAccumulator acc) {
            return new DeviceStats(acc.getMin(), acc.getMax(), acc.getAvg(), acc.getCount());
        }
        public StatsAccumulator merge(StatsAccumulator a, StatsAccumulator b) {
            return a.merge(b);
        }
    });`
        },
        {
          name: 'Recommendation Engines',
          explanation: 'Real-time personalization. Feature engineering on user behavior. Online model inference. A/B testing analytics. Collaborative filtering. Content-based recommendations. Session-based recommendations. Contextual bandits with online learning.',
          codeExample: `// Real-time Recommendation Engine
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

// 1. Feature engineering from user activity stream
DataStream<UserActivity> activities = env.fromSource(activitySource, watermarks, "activity");

// Compute real-time user features
DataStream<UserFeatures> userFeatures = activities
    .keyBy(UserActivity::getUserId)
    .process(new FeatureEngineering());

public class FeatureEngineering extends KeyedProcessFunction<String, UserActivity, UserFeatures> {
    private MapState<String, Integer> categoryViews;    // Category view counts
    private ValueState<Long> sessionStart;              // Session tracking
    private ListState<String> recentProducts;           // Recent product views

    @Override
    public void open(Configuration params) {
        categoryViews = getRuntimeContext().getMapState(
            new MapStateDescriptor<>("cat-views", String.class, Integer.class));
        sessionStart = getRuntimeContext().getState(
            new ValueStateDescriptor<>("session-start", Long.class));
        recentProducts = getRuntimeContext().getListState(
            new ListStateDescriptor<>("recent", String.class));
    }

    @Override
    public void processElement(UserActivity activity, Context ctx,
                                Collector<UserFeatures> out) throws Exception {
        // Update category preferences
        String category = activity.getCategory();
        Integer count = categoryViews.get(category);
        categoryViews.put(category, (count == null ? 0 : count) + 1);

        // Track recent products (keep last 50)
        recentProducts.add(activity.getProductId());

        // Compute session duration
        Long start = sessionStart.value();
        if (start == null || activity.getTimestamp() - start > 1800000) {
            sessionStart.update(activity.getTimestamp());
        }

        // Emit feature vector
        UserFeatures features = new UserFeatures(
            activity.getUserId(),
            getCategoryDistribution(categoryViews),
            getRecentProductsList(recentProducts),
            activity.getTimestamp() - sessionStart.value()
        );
        out.collect(features);
    }
}

// 2. Online model scoring with AsyncIO
DataStream<Recommendation> recommendations = AsyncDataStream.orderedWait(
    userFeatures,
    new AsyncFunction<UserFeatures, Recommendation>() {
        @Override
        public void asyncInvoke(UserFeatures features,
                                ResultFuture<Recommendation> resultFuture) {
            // Call ML model serving endpoint
            mlClient.predict(features).thenAccept(prediction -> {
                resultFuture.complete(Collections.singleton(
                    new Recommendation(features.getUserId(), prediction.getTopK(10))
                ));
            });
        }
    },
    5000, TimeUnit.MILLISECONDS, 100
);`
        }
      ]
    }
  ]

  useVoiceConceptNavigation(concepts, setSelectedConceptIndex, setSelectedDetailIndex)

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
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={FLINK_COLORS}
        />
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
        primaryColor={FLINK_COLORS.primary}
      />


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
              onMainMenu={breadcrumb?.onMainMenu || onBack}
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
