import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'
import useVoiceConceptNavigation from '../../hooks/useVoiceConceptNavigation'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const KAFKA_COLORS = {
  primary: '#f43f5e',           // Pink
  primaryHover: '#fb7185',      // Lighter pink
  bg: 'rgba(244, 63, 94, 0.1)', // Pink background with transparency
  border: 'rgba(244, 63, 94, 0.3)', // Pink border
  arrow: '#f43f5e',             // Pink arrow
  hoverBg: 'rgba(244, 63, 94, 0.2)', // Pink hover background
  topicBg: 'rgba(244, 63, 94, 0.2)'  // Pink topic background
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

// Kafka Producer Diagram
const ProducerDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
      </marker>
    </defs>

    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Kafka Producer Architecture</text>

    <rect x="50" y="45" width="120" height="60" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="110" y="70" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Producer</text>
    <text x="110" y="88" textAnchor="middle" fill="#93c5fd" fontSize="8">send(record)</text>

    <rect x="220" y="45" width="120" height="60" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="280" y="65" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Serializer</text>
    <text x="280" y="82" textAnchor="middle" fill="#fcd34d" fontSize="8">Key + Value</text>
    <text x="280" y="96" textAnchor="middle" fill="#fcd34d" fontSize="8">JSON/Avro</text>

    <rect x="390" y="45" width="120" height="60" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="450" y="65" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Partitioner</text>
    <text x="450" y="82" textAnchor="middle" fill="#c4b5fd" fontSize="8">hash(key)</text>
    <text x="450" y="96" textAnchor="middle" fill="#c4b5fd" fontSize="8">round-robin</text>

    <rect x="560" y="45" width="120" height="60" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="620" y="65" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Record Batch</text>
    <text x="620" y="82" textAnchor="middle" fill="#86efac" fontSize="8">Compression</text>
    <text x="620" y="96" textAnchor="middle" fill="#86efac" fontSize="8">linger.ms</text>

    <rect x="560" y="120" width="180" height="45" rx="6" fill="rgba(236, 72, 153, 0.3)" stroke="#ec4899" strokeWidth="2"/>
    <text x="650" y="140" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold">Kafka Broker</text>
    <text x="650" y="155" textAnchor="middle" fill="#fbcfe8" fontSize="8">Topic Partitions</text>

    <path d="M 170 75 L 215 75" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
    <path d="M 340 75 L 385 75" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
    <path d="M 510 75 L 555 75" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
    <path d="M 620 105 L 620 115" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
  </svg>
)

// Kafka Cluster Diagram
const ClusterDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Kafka Cluster Architecture</text>

    <rect x="50" y="45" width="100" height="130" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="100" y="65" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Broker 1</text>
    <rect x="60" y="75" width="80" height="25" rx="3" fill="rgba(34, 197, 94, 0.4)" stroke="#22c55e" strokeWidth="1"/>
    <text x="100" y="92" textAnchor="middle" fill="#4ade80" fontSize="8">P0 (Leader)</text>
    <rect x="60" y="105" width="80" height="25" rx="3" fill="rgba(245, 158, 11, 0.4)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="100" y="122" textAnchor="middle" fill="#fbbf24" fontSize="8">P1 (Replica)</text>
    <rect x="60" y="135" width="80" height="25" rx="3" fill="rgba(139, 92, 246, 0.4)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="100" y="152" textAnchor="middle" fill="#a78bfa" fontSize="8">P2 (Replica)</text>

    <rect x="180" y="45" width="100" height="130" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="230" y="65" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Broker 2</text>
    <rect x="190" y="75" width="80" height="25" rx="3" fill="rgba(34, 197, 94, 0.4)" stroke="#22c55e" strokeWidth="1"/>
    <text x="230" y="92" textAnchor="middle" fill="#4ade80" fontSize="8">P0 (Replica)</text>
    <rect x="190" y="105" width="80" height="25" rx="3" fill="rgba(245, 158, 11, 0.4)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="230" y="122" textAnchor="middle" fill="#fbbf24" fontSize="8">P1 (Leader)</text>
    <rect x="190" y="135" width="80" height="25" rx="3" fill="rgba(139, 92, 246, 0.4)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="230" y="152" textAnchor="middle" fill="#a78bfa" fontSize="8">P2 (Replica)</text>

    <rect x="310" y="45" width="100" height="130" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="360" y="65" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Broker 3</text>
    <rect x="320" y="75" width="80" height="25" rx="3" fill="rgba(34, 197, 94, 0.4)" stroke="#22c55e" strokeWidth="1"/>
    <text x="360" y="92" textAnchor="middle" fill="#4ade80" fontSize="8">P0 (Replica)</text>
    <rect x="320" y="105" width="80" height="25" rx="3" fill="rgba(245, 158, 11, 0.4)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="360" y="122" textAnchor="middle" fill="#fbbf24" fontSize="8">P1 (Replica)</text>
    <rect x="320" y="135" width="80" height="25" rx="3" fill="rgba(139, 92, 246, 0.4)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="360" y="152" textAnchor="middle" fill="#a78bfa" fontSize="8">P2 (Leader)</text>

    <rect x="480" y="70" width="120" height="80" rx="6" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899" strokeWidth="2"/>
    <text x="540" y="95" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold">ZooKeeper/</text>
    <text x="540" y="112" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold">KRaft</text>
    <text x="540" y="135" textAnchor="middle" fill="#fbcfe8" fontSize="8">Metadata</text>

    <rect x="650" y="45" width="120" height="130" rx="6" fill="rgba(6, 182, 212, 0.2)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="710" y="70" textAnchor="middle" fill="#22d3ee" fontSize="10" fontWeight="bold">Topic: orders</text>
    <text x="710" y="95" textAnchor="middle" fill="#a5f3fc" fontSize="8">Partitions: 3</text>
    <text x="710" y="115" textAnchor="middle" fill="#a5f3fc" fontSize="8">Replication: 3</text>
    <text x="710" y="135" textAnchor="middle" fill="#a5f3fc" fontSize="8">Retention: 7d</text>
  </svg>
)

// Kafka Consumer Diagram
const ConsumerDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Kafka Consumer Group</text>

    <rect x="50" y="50" width="150" height="110" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="125" y="70" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Topic: orders</text>
    <rect x="60" y="80" width="60" height="25" rx="3" fill="rgba(34, 197, 94, 0.4)" stroke="#22c55e" strokeWidth="1"/>
    <text x="90" y="97" textAnchor="middle" fill="#4ade80" fontSize="8">P0</text>
    <rect x="60" y="110" width="60" height="25" rx="3" fill="rgba(245, 158, 11, 0.4)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="90" y="127" textAnchor="middle" fill="#fbbf24" fontSize="8">P1</text>
    <rect x="130" y="80" width="60" height="25" rx="3" fill="rgba(139, 92, 246, 0.4)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="160" y="97" textAnchor="middle" fill="#a78bfa" fontSize="8">P2</text>
    <rect x="130" y="110" width="60" height="25" rx="3" fill="rgba(236, 72, 153, 0.4)" stroke="#ec4899" strokeWidth="1"/>
    <text x="160" y="127" textAnchor="middle" fill="#f472b6" fontSize="8">P3</text>

    <rect x="300" y="40" width="200" height="120" rx="8" fill="rgba(100, 116, 139, 0.1)" stroke="#64748b" strokeWidth="2"/>
    <text x="400" y="60" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">Consumer Group: order-service</text>
    <rect x="320" y="75" width="70" height="35" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="355" y="97" textAnchor="middle" fill="#4ade80" fontSize="8">Consumer 1</text>
    <rect x="320" y="115" width="70" height="35" rx="4" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="355" y="137" textAnchor="middle" fill="#fbbf24" fontSize="8">Consumer 2</text>
    <rect x="410" y="75" width="70" height="35" rx="4" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="445" y="97" textAnchor="middle" fill="#a78bfa" fontSize="8">Consumer 3</text>

    <path d="M 200 92 L 315 92" stroke="#22c55e" strokeWidth="2"/>
    <path d="M 200 122 L 315 132" stroke="#f59e0b" strokeWidth="2"/>
    <path d="M 200 92 L 405 92" stroke="#8b5cf6" strokeWidth="2"/>

    <rect x="580" y="65" width="180" height="70" rx="6" fill="rgba(6, 182, 212, 0.2)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="670" y="90" textAnchor="middle" fill="#22d3ee" fontSize="10" fontWeight="bold">Offset Management</text>
    <text x="670" y="110" textAnchor="middle" fill="#a5f3fc" fontSize="8">__consumer_offsets</text>
    <text x="670" y="125" textAnchor="middle" fill="#a5f3fc" fontSize="8">auto.commit / manual</text>
  </svg>
)

// Kafka Streams Diagram
const StreamsDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Kafka Streams Processing</text>

    <rect x="50" y="50" width="100" height="55" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="100" y="75" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Source</text>
    <text x="100" y="92" textAnchor="middle" fill="#93c5fd" fontSize="8">Input Topic</text>

    <rect x="190" y="50" width="100" height="55" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="240" y="75" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Filter</text>
    <text x="240" y="92" textAnchor="middle" fill="#fcd34d" fontSize="8">Predicate</text>

    <rect x="330" y="50" width="100" height="55" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="380" y="75" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Map</text>
    <text x="380" y="92" textAnchor="middle" fill="#86efac" fontSize="8">Transform</text>

    <rect x="470" y="50" width="100" height="55" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="520" y="75" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Aggregate</text>
    <text x="520" y="92" textAnchor="middle" fill="#c4b5fd" fontSize="8">GroupByKey</text>

    <rect x="610" y="50" width="100" height="55" rx="6" fill="rgba(236, 72, 153, 0.3)" stroke="#ec4899" strokeWidth="2"/>
    <text x="660" y="75" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold">Sink</text>
    <text x="660" y="92" textAnchor="middle" fill="#fbcfe8" fontSize="8">Output Topic</text>

    <path d="M 150 77 L 185 77" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
    <path d="M 290 77 L 325 77" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
    <path d="M 430 77 L 465 77" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
    <path d="M 570 77 L 605 77" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>

    <rect x="250" y="125" width="300" height="40" rx="6" fill="rgba(6, 182, 212, 0.2)" stroke="#06b6d4" strokeWidth="1"/>
    <text x="400" y="145" textAnchor="middle" fill="#22d3ee" fontSize="9" fontWeight="bold">State Store (RocksDB) - Windowed aggregations, Joins</text>
  </svg>
)

// Schema Registry Diagram
const SchemaRegistryDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Confluent Schema Registry</text>

    <rect x="50" y="50" width="120" height="60" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="110" y="75" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Producer</text>
    <text x="110" y="92" textAnchor="middle" fill="#93c5fd" fontSize="8">Avro Serializer</text>

    <rect x="300" y="40" width="200" height="80" rx="8" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="400" y="65" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">Schema Registry</text>
    <text x="400" y="85" textAnchor="middle" fill="#c4b5fd" fontSize="8">Version Control</text>
    <text x="400" y="100" textAnchor="middle" fill="#c4b5fd" fontSize="8">Compatibility Check</text>
    <text x="400" y="115" textAnchor="middle" fill="#c4b5fd" fontSize="8">BACKWARD/FORWARD/FULL</text>

    <rect x="630" y="50" width="120" height="60" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="690" y="75" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Consumer</text>
    <text x="690" y="92" textAnchor="middle" fill="#86efac" fontSize="8">Avro Deserializer</text>

    <rect x="300" y="135" width="200" height="35" rx="4" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="400" y="157" textAnchor="middle" fill="#fbbf24" fontSize="9">Kafka: _schemas topic</text>

    <path d="M 170 70 L 295 70" stroke="#64748b" strokeWidth="2"/>
    <text x="230" y="62" textAnchor="middle" fill="#94a3b8" fontSize="8">Register/Get Schema</text>
    <path d="M 505 70 L 625 70" stroke="#64748b" strokeWidth="2"/>
    <text x="565" y="62" textAnchor="middle" fill="#94a3b8" fontSize="8">Get Schema</text>
    <path d="M 400 120 L 400 130" stroke="#64748b" strokeWidth="1" strokeDasharray="3"/>
  </svg>
)

// Kafka Connect Diagram
const ConnectDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Kafka Connect Architecture</text>

    <rect x="50" y="50" width="140" height="100" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="120" y="72" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Source Systems</text>
    <text x="120" y="92" textAnchor="middle" fill="#93c5fd" fontSize="8">MySQL, PostgreSQL</text>
    <text x="120" y="107" textAnchor="middle" fill="#93c5fd" fontSize="8">MongoDB, S3</text>
    <text x="120" y="122" textAnchor="middle" fill="#93c5fd" fontSize="8">APIs, Files</text>

    <rect x="250" y="50" width="120" height="100" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="310" y="72" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Source</text>
    <text x="310" y="87" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Connectors</text>
    <text x="310" y="107" textAnchor="middle" fill="#fcd34d" fontSize="8">Debezium CDC</text>
    <text x="310" y="122" textAnchor="middle" fill="#fcd34d" fontSize="8">JDBC Source</text>

    <rect x="420" y="50" width="120" height="100" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="480" y="72" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Kafka</text>
    <text x="480" y="92" textAnchor="middle" fill="#86efac" fontSize="8">Topics</text>
    <text x="480" y="112" textAnchor="middle" fill="#86efac" fontSize="8">Connect Cluster</text>

    <rect x="590" y="50" width="120" height="100" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="650" y="72" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Sink</text>
    <text x="650" y="87" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Connectors</text>
    <text x="650" y="107" textAnchor="middle" fill="#c4b5fd" fontSize="8">Elasticsearch</text>
    <text x="650" y="122" textAnchor="middle" fill="#c4b5fd" fontSize="8">HDFS, S3</text>

    <path d="M 190 100 L 245 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
    <path d="M 370 100 L 415 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
    <path d="M 540 100 L 585 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
  </svg>
)

// Kafka Monitoring Diagram
const MonitoringDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Kafka Monitoring Stack</text>

    <rect x="50" y="50" width="140" height="80" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="120" y="75" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Kafka Cluster</text>
    <text x="120" y="95" textAnchor="middle" fill="#93c5fd" fontSize="8">JMX Metrics</text>
    <text x="120" y="110" textAnchor="middle" fill="#93c5fd" fontSize="8">Broker metrics</text>

    <rect x="240" y="50" width="140" height="80" rx="6" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <text x="310" y="75" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Prometheus</text>
    <text x="310" y="95" textAnchor="middle" fill="#fca5a5" fontSize="8">JMX Exporter</text>
    <text x="310" y="110" textAnchor="middle" fill="#fca5a5" fontSize="8">kafka_* metrics</text>

    <rect x="430" y="50" width="140" height="80" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="500" y="75" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Grafana</text>
    <text x="500" y="95" textAnchor="middle" fill="#fcd34d" fontSize="8">Dashboards</text>
    <text x="500" y="110" textAnchor="middle" fill="#fcd34d" fontSize="8">Alerts</text>

    <rect x="620" y="50" width="140" height="80" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="690" y="75" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Key Metrics</text>
    <text x="690" y="92" textAnchor="middle" fill="#c4b5fd" fontSize="8">Consumer Lag</text>
    <text x="690" y="105" textAnchor="middle" fill="#c4b5fd" fontSize="8">Throughput</text>
    <text x="690" y="118" textAnchor="middle" fill="#c4b5fd" fontSize="8">ISR Count</text>

    <path d="M 190 90 L 235 90" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
    <path d="M 380 90 L 425 90" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
    <path d="M 570 90 L 615 90" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function ApacheKafka({ onBack, breadcrumb }) {
  // State for modal navigation
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'producers',
      name: 'Kafka Producers',
      icon: '📤',
      color: '#3b82f6',
      description: 'High-performance message producers with batching, compression, partitioning strategies, and delivery guarantees',
      diagram: ProducerDiagram,
      details: [
        {
          name: 'High Throughput APIs',
          explanation: 'Kafka Producer API enables asynchronous message sending with callbacks for high throughput. Send thousands of messages with non-blocking operations. Configure acks, batch size, and linger time for optimal performance. Automatic retries and error handling. Monitor partition assignments and offsets.',
          codeExample: `// High-throughput Kafka Producer
import org.apache.kafka.clients.producer.*;
import java.util.Properties;

public class KafkaProducerExample {
    public static void main(String[] args) {
        // Producer configuration
        Properties props = new Properties();
        props.put("bootstrap.servers", "kafka1:9092,kafka2:9092,kafka3:9092");
        props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

        // Performance tuning
        props.put("acks", "all");  // Wait for all replicas
        props.put("batch.size", 32768);  // 32KB batch size
        props.put("linger.ms", 10);  // Wait 10ms for batching
        props.put("compression.type", "snappy");  // Compression
        props.put("buffer.memory", 33554432);  // 32MB buffer

        // Create producer
        KafkaProducer<String, String> producer = new KafkaProducer<>(props);

        // Async send with callback
        for (int i = 0; i < 1000; i++) {
            ProducerRecord<String, String> record =
                new ProducerRecord<>("orders", "order-" + i, "Order data " + i);

            producer.send(record, new Callback() {
                @Override
                public void onCompletion(RecordMetadata metadata, Exception e) {
                    if (e != null) {
                        System.err.println("Error sending message: " + e.getMessage());
                    } else {
                        System.out.printf("Sent to partition %d, offset %d%n",
                            metadata.partition(), metadata.offset());
                    }
                }
            });
        }

        producer.flush();
        producer.close();
    }
}`
        },
        {
          name: 'Batching & Compression',
          explanation: 'Batch messages together for efficiency. Configure batch.size (32KB-64KB) and linger.ms (wait time). Compression reduces network bandwidth: snappy (fast), gzip (high compression), lz4, zstd. Buffer memory controls producer memory usage. Dramatically improves throughput for high-volume workloads.',
          codeExample: `// Batching & Compression Configuration
Properties props = new Properties();
props.put("bootstrap.servers", "localhost:9092");
props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

// Batching settings
props.put("batch.size", 65536);       // 64KB batch size (default 16KB)
props.put("linger.ms", 20);           // Wait up to 20ms for more records
props.put("buffer.memory", 67108864); // 64MB total buffer memory

// Compression - choose one:
// "snappy"  - Fast compression, moderate ratio (recommended for throughput)
// "gzip"    - High compression ratio, slower (recommended for bandwidth)
// "lz4"     - Fastest compression, lower ratio
// "zstd"    - Best compression ratio, good speed (Kafka 2.1+)
props.put("compression.type", "snappy");

// Request size limits
props.put("max.request.size", 1048576);  // 1MB max request size

KafkaProducer<String, String> producer = new KafkaProducer<>(props);

// Send many records - they will be batched automatically
for (int i = 0; i < 10000; i++) {
    ProducerRecord<String, String> record =
        new ProducerRecord<>("events", "key-" + i, "payload-" + i);
    producer.send(record);  // Non-blocking, records are batched
}

// flush() forces all buffered records to be sent
producer.flush();

// Metrics to monitor batching effectiveness
Map<MetricName, ? extends Metric> metrics = producer.metrics();
// Look for: batch-size-avg, record-send-rate, compression-rate-avg

producer.close();`
        },
        {
          name: 'Partitioning Strategy',
          explanation: 'Control message distribution across partitions. Default: hash of key determines partition. Custom partitioners for specific routing logic. Round-robin for keyless messages. Partition affinity for related messages. Balance load across brokers while maintaining order within partitions.',
          codeExample: `// Custom Partitioner Implementation
import org.apache.kafka.clients.producer.Partitioner;
import org.apache.kafka.common.Cluster;

public class CustomPartitioner implements Partitioner {
    @Override
    public int partition(String topic, Object key, byte[] keyBytes,
                        Object value, byte[] valueBytes, Cluster cluster) {
        int numPartitions = cluster.partitionCountForTopic(topic);

        // Custom logic: VIP customers go to partition 0
        if (key != null && key.toString().startsWith("VIP-")) {
            return 0;
        }

        // Regular customers distributed by hash
        return Math.abs(key.hashCode()) % numPartitions;
    }

    @Override
    public void close() {}

    @Override
    public void configure(Map<String, ?> configs) {}
}

// Usage in producer
Properties props = new Properties();
props.put("bootstrap.servers", "localhost:9092");
props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");
props.put("partitioner.class", "com.example.CustomPartitioner");

KafkaProducer<String, String> producer = new KafkaProducer<>(props);

// Send to specific partition
ProducerRecord<String, String> record =
    new ProducerRecord<>("orders", "VIP-123", "High priority order");
producer.send(record);`
        },
        {
          name: 'Retry Mechanisms',
          explanation: 'Automatic retry on transient failures. Configure retries count and retry backoff. Delivery timeout for total send time. Enable idempotence to avoid duplicates on retry. Handle permanent vs transient errors differently. Exponential backoff prevents overwhelming brokers.',
          codeExample: `// Producer Retry Configuration
Properties props = new Properties();
props.put("bootstrap.servers", "localhost:9092");
props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

// Retry settings
props.put("retries", Integer.MAX_VALUE);    // Retry indefinitely
props.put("retry.backoff.ms", 100);         // Wait 100ms between retries
props.put("delivery.timeout.ms", 120000);   // Total timeout: 2 minutes
props.put("request.timeout.ms", 30000);     // Per-request timeout: 30s

// Idempotence prevents duplicates on retry
props.put("enable.idempotence", true);
props.put("acks", "all");

// Control in-flight requests (max 5 with idempotence enabled)
props.put("max.in.flight.requests.per.connection", 5);

KafkaProducer<String, String> producer = new KafkaProducer<>(props);

// Send with error handling
ProducerRecord<String, String> record =
    new ProducerRecord<>("orders", "order-1", "Order data");

producer.send(record, (metadata, exception) -> {
    if (exception != null) {
        if (exception instanceof RetriableException) {
            // Kafka already retried - this is final failure
            System.err.println("Retriable error exhausted: " + exception.getMessage());
        } else {
            // Non-retriable error (e.g., SerializationException, RecordTooLargeException)
            System.err.println("Fatal error: " + exception.getMessage());
        }
        // Send to dead letter queue or alert
        handleFailedRecord(record, exception);
    } else {
        System.out.printf("Success: topic=%s partition=%d offset=%d%n",
            metadata.topic(), metadata.partition(), metadata.offset());
    }
});

producer.close();`
        },
        {
          name: 'Idempotent Writes',
          explanation: 'Exactly-once delivery semantics within a session. Enable with enable.idempotence=true. Producer assigns sequence numbers to detect duplicates. Automatic retry without duplicates. Combined with transactions for multi-topic atomicity. Critical for financial and mission-critical systems.',
          codeExample: `// Idempotent Producer with Transactions
Properties props = new Properties();
props.put("bootstrap.servers", "localhost:9092");
props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

// Enable idempotence
props.put("enable.idempotence", true);
props.put("acks", "all");
props.put("retries", Integer.MAX_VALUE);
props.put("max.in.flight.requests.per.connection", 5);

// Enable transactions for multi-topic atomicity
props.put("transactional.id", "my-transactional-producer");

KafkaProducer<String, String> producer = new KafkaProducer<>(props);

// Initialize transactions
producer.initTransactions();

try {
    // Begin transaction
    producer.beginTransaction();

    // Send messages to multiple topics atomically
    producer.send(new ProducerRecord<>("orders", "order-123", "Order data"));
    producer.send(new ProducerRecord<>("inventory", "item-456", "Update inventory"));
    producer.send(new ProducerRecord<>("audit", "txn-789", "Audit log"));

    // Commit transaction (all or nothing)
    producer.commitTransaction();
} catch (Exception e) {
    // Rollback on error
    producer.abortTransaction();
    System.err.println("Transaction failed: " + e.getMessage());
} finally {
    producer.close();
}

// Benefits:
// - No duplicates even with retries
// - Atomic writes across multiple partitions/topics
// - Exactly-once semantics end-to-end`
        },
        {
          name: 'Custom Serializers',
          explanation: 'Convert objects to bytes for transmission. Built-in: String, Integer, ByteArray serializers. Custom serializers for complex types. Avro/Protobuf for schema evolution. Serialize keys and values independently. Handle serialization errors gracefully.',
          codeExample: `// Custom JSON Serializer for Kafka
import org.apache.kafka.common.serialization.Serializer;
import org.apache.kafka.common.serialization.Deserializer;
import com.fasterxml.jackson.databind.ObjectMapper;

// Domain object
public class Order {
    private String orderId;
    private String customerId;
    private double amount;
    private String status;
    // getters and setters
}

// Custom Serializer
public class OrderSerializer implements Serializer<Order> {
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public byte[] serialize(String topic, Order data) {
        if (data == null) return null;
        try {
            return objectMapper.writeValueAsBytes(data);
        } catch (Exception e) {
            throw new SerializationException("Error serializing Order", e);
        }
    }
}

// Custom Deserializer
public class OrderDeserializer implements Deserializer<Order> {
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public Order deserialize(String topic, byte[] data) {
        if (data == null) return null;
        try {
            return objectMapper.readValue(data, Order.class);
        } catch (Exception e) {
            throw new SerializationException("Error deserializing Order", e);
        }
    }
}

// Usage with Producer
Properties props = new Properties();
props.put("bootstrap.servers", "localhost:9092");
props.put("key.serializer", StringSerializer.class.getName());
props.put("value.serializer", OrderSerializer.class.getName());

KafkaProducer<String, Order> producer = new KafkaProducer<>(props);

Order order = new Order();
order.setOrderId("ORD-001");
order.setCustomerId("CUST-123");
order.setAmount(99.99);

producer.send(new ProducerRecord<>("orders", order.getOrderId(), order));
producer.close();`
        }
      ]
    },
    {
      id: 'kafka-cluster',
      name: 'Kafka Cluster',
      icon: '🏗️',
      color: '#10b981',
      description: 'Distributed broker architecture with partitioning, replication, leader election, and log management',
      diagram: ClusterDiagram,
      details: [
        {
          name: 'Distributed Brokers',
          explanation: 'Multiple brokers form a cluster managed by ZooKeeper or KRaft. Each broker handles subset of partitions. Load distribution and fault tolerance. Horizontal scaling by adding brokers. Bootstrap servers for client connections. Controller broker manages cluster metadata.',
          codeExample: `// Kafka Broker Configuration (server.properties)
// Each broker in the cluster needs a unique ID

// Broker 1 - server.properties
broker.id=1
listeners=PLAINTEXT://broker1:9092
advertised.listeners=PLAINTEXT://broker1:9092
log.dirs=/var/kafka/data
num.partitions=6
default.replication.factor=3

// KRaft mode (no ZooKeeper - Kafka 3.3+)
process.roles=broker,controller
node.id=1
controller.quorum.voters=1@broker1:9093,2@broker2:9093,3@broker3:9093
controller.listener.names=CONTROLLER

// Client connecting to cluster
Properties props = new Properties();
// List multiple brokers for failover
props.put("bootstrap.servers", "broker1:9092,broker2:9092,broker3:9092");

// AdminClient for cluster operations
AdminClient admin = AdminClient.create(props);

// Describe cluster
DescribeClusterResult cluster = admin.describeCluster();
System.out.println("Cluster ID: " + cluster.clusterId().get());
System.out.println("Controller: " + cluster.controller().get());

// List all brokers
Collection<Node> nodes = cluster.nodes().get();
for (Node node : nodes) {
    System.out.printf("Broker %d: %s:%d%n",
        node.id(), node.host(), node.port());
}

admin.close();`
        },
        {
          name: 'Topic Partitions',
          explanation: 'Topics divided into partitions for parallelism. Each partition is ordered log of messages. Partition count determines max consumer parallelism. Choose partition count based on throughput needs. Cannot easily change partition count later. Messages within partition maintain order.',
          codeExample: `// Topic and Partition Management with AdminClient
import org.apache.kafka.clients.admin.*;
import org.apache.kafka.common.TopicPartitionInfo;

Properties props = new Properties();
props.put("bootstrap.servers", "localhost:9092");
AdminClient admin = AdminClient.create(props);

// Create topic with specific partition count
NewTopic ordersTopic = new NewTopic("orders", 12, (short) 3);
// 12 partitions, replication factor 3

// Configure topic settings
Map<String, String> topicConfigs = new HashMap<>();
topicConfigs.put("retention.ms", "604800000");     // 7 days
topicConfigs.put("cleanup.policy", "delete");
topicConfigs.put("min.insync.replicas", "2");
ordersTopic.configs(topicConfigs);

admin.createTopics(Collections.singleton(ordersTopic)).all().get();

// Describe topic partitions
DescribeTopicsResult result = admin.describeTopics(Arrays.asList("orders"));
TopicDescription description = result.values().get("orders").get();

System.out.println("Topic: " + description.name());
System.out.println("Partitions: " + description.partitions().size());

for (TopicPartitionInfo partition : description.partitions()) {
    System.out.printf("  Partition %d: Leader=%d, Replicas=%s, ISR=%s%n",
        partition.partition(),
        partition.leader().id(),
        partition.replicas(),
        partition.isr());
}

// Increase partition count (cannot decrease)
Map<String, NewPartitions> newPartitions = new HashMap<>();
newPartitions.put("orders", NewPartitions.increaseTo(24));
admin.createPartitions(newPartitions).all().get();

admin.close();`
        },
        {
          name: 'Replication Factor',
          explanation: 'Each partition replicated across multiple brokers. Replication factor (RF) = number of copies. RF=3 typical for production. Leader handles reads/writes, followers replicate. In-sync replicas (ISR) track healthy replicas. Survives broker failures up to RF-1.',
          codeExample: `// Replication Configuration and Verification
import org.apache.kafka.clients.admin.*;

Properties props = new Properties();
props.put("bootstrap.servers", "localhost:9092");
AdminClient admin = AdminClient.create(props);

// Create topic with replication factor 3
NewTopic topic = new NewTopic("critical-events", 6, (short) 3);
Map<String, String> configs = new HashMap<>();
configs.put("min.insync.replicas", "2");  // At least 2 replicas must acknowledge
topic.configs(configs);
admin.createTopics(Collections.singleton(topic)).all().get();

// Producer must use acks=all with min.insync.replicas
Properties producerProps = new Properties();
producerProps.put("bootstrap.servers", "localhost:9092");
producerProps.put("acks", "all");  // Wait for ALL ISR replicas
producerProps.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
producerProps.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

// With RF=3 and min.insync.replicas=2:
// - Tolerates 1 broker failure (still have 2 ISR)
// - If 2 brokers fail, writes are rejected (NOT_ENOUGH_REPLICAS)
// - Reads still work from surviving replica

// Check ISR status
DescribeTopicsResult result = admin.describeTopics(Arrays.asList("critical-events"));
TopicDescription desc = result.values().get("critical-events").get();

for (TopicPartitionInfo p : desc.partitions()) {
    int replicaCount = p.replicas().size();
    int isrCount = p.isr().size();
    boolean underReplicated = isrCount < replicaCount;

    System.out.printf("Partition %d: Replicas=%d, ISR=%d %s%n",
        p.partition(), replicaCount, isrCount,
        underReplicated ? "[UNDER-REPLICATED]" : "[OK]");
}

admin.close();`
        },
        {
          name: 'Leader Election',
          explanation: 'One replica elected as partition leader. Leader handles all client requests. Followers fetch from leader to stay in sync. Automatic failover when leader fails. New leader elected from ISR. Unclean leader election trades data loss for availability.',
          codeExample: `// Leader Election Configuration (server.properties)

// Controller settings (broker that manages leader election)
controller.socket.timeout.ms=30000

// ISR (In-Sync Replica) settings
replica.lag.time.max.ms=30000    // Max lag before removing from ISR
replica.lag.max.messages=4000    // Max message lag (deprecated in newer versions)

// Unclean leader election (DANGEROUS - may lose data)
unclean.leader.election.enable=false  // Default: false (recommended)
// If true: allows out-of-sync replica to become leader (data loss risk)
// If false: partition goes offline if no ISR available (data safety)

// Preferred leader election
auto.leader.rebalance.enable=true
leader.imbalance.check.interval.seconds=300
leader.imbalance.per.broker.percentage=10

// Manually trigger preferred leader election via AdminClient
Properties props = new Properties();
props.put("bootstrap.servers", "localhost:9092");
AdminClient admin = AdminClient.create(props);

// Elect preferred leaders for specific partitions
Set<TopicPartition> partitions = new HashSet<>();
partitions.add(new TopicPartition("orders", 0));
partitions.add(new TopicPartition("orders", 1));

// Preferred election (choose preferred replica from ISR)
admin.electLeaders(ElectionType.PREFERRED, partitions).all().get();

// Unclean election (force leader even if not in ISR - last resort)
// admin.electLeaders(ElectionType.UNCLEAN, partitions).all().get();

System.out.println("Leader election completed successfully");
admin.close();`
        },
        {
          name: 'Log Compaction',
          explanation: 'Retain only latest value per key. Background compaction process. Useful for state snapshots and changelog topics. Compacted topics serve as durable key-value stores. Cleanup policy: delete or compact. Preserves at least one value per key.',
          codeExample: `// Log Compaction - Create a Compacted Topic
import org.apache.kafka.clients.admin.*;

Properties props = new Properties();
props.put("bootstrap.servers", "localhost:9092");
AdminClient admin = AdminClient.create(props);

// Create compacted topic (acts as a key-value store)
NewTopic compactedTopic = new NewTopic("user-profiles", 6, (short) 3);
Map<String, String> configs = new HashMap<>();
configs.put("cleanup.policy", "compact");           // Enable compaction
configs.put("min.cleanable.dirty.ratio", "0.5");    // Compact when 50% dirty
configs.put("delete.retention.ms", "86400000");     // Keep tombstones 24h
configs.put("segment.ms", "604800000");             // 7-day segments
configs.put("min.compaction.lag.ms", "3600000");    // Wait 1h before compacting
admin.createTopics(Collections.singleton(compactedTopic)).all().get();

// Producer: send updates - only latest per key is retained
KafkaProducer<String, String> producer = new KafkaProducer<>(producerProps);

// Update user profile multiple times
producer.send(new ProducerRecord<>("user-profiles", "user-123",
    "{\\"name\\":\\"John\\",\\"email\\":\\"john@v1.com\\"}"));
producer.send(new ProducerRecord<>("user-profiles", "user-123",
    "{\\"name\\":\\"John\\",\\"email\\":\\"john@v2.com\\"}"));
// After compaction, only the latest value for "user-123" is retained

// Delete a key by sending tombstone (null value)
producer.send(new ProducerRecord<>("user-profiles", "user-456", null));
// Tombstone is kept for delete.retention.ms, then removed

// Both delete + compact policy
// configs.put("cleanup.policy", "compact,delete");
// Compacts AND deletes old segments (useful for bounded compacted topics)

producer.close();
admin.close();`
        },
        {
          name: 'Retention Policies',
          explanation: 'Control how long messages are stored. Time-based: retention.ms (default 7 days). Size-based: retention.bytes per partition. Whichever limit reached first triggers deletion. Segment files enable efficient deletion. Infinite retention for critical data.',
          codeExample: `// Retention Policy Configuration
import org.apache.kafka.clients.admin.*;

Properties props = new Properties();
props.put("bootstrap.servers", "localhost:9092");
AdminClient admin = AdminClient.create(props);

// Topic with time-based retention (7 days)
NewTopic eventsTopic = new NewTopic("events", 12, (short) 3);
Map<String, String> eventConfigs = new HashMap<>();
eventConfigs.put("retention.ms", "604800000");        // 7 days
eventConfigs.put("retention.bytes", "-1");             // No size limit
eventConfigs.put("segment.bytes", "1073741824");       // 1GB segments
eventConfigs.put("segment.ms", "86400000");            // Roll segment daily
eventsTopic.configs(eventConfigs);

// Topic with size-based retention (10GB per partition)
NewTopic logsTopic = new NewTopic("logs", 6, (short) 2);
Map<String, String> logConfigs = new HashMap<>();
logConfigs.put("retention.ms", "-1");                  // No time limit
logConfigs.put("retention.bytes", "10737418240");      // 10GB per partition
logsTopic.configs(logConfigs);

// Topic with infinite retention (audit/compliance)
NewTopic auditTopic = new NewTopic("audit-trail", 3, (short) 3);
Map<String, String> auditConfigs = new HashMap<>();
auditConfigs.put("retention.ms", "-1");                // Never delete
auditConfigs.put("retention.bytes", "-1");             // No size limit
auditConfigs.put("cleanup.policy", "delete");          // Standard deletion
auditTopic.configs(auditConfigs);

admin.createTopics(Arrays.asList(eventsTopic, logsTopic, auditTopic)).all().get();

// Alter retention on existing topic
Map<ConfigResource, Collection<AlterConfigOp>> alterConfigs = new HashMap<>();
ConfigResource resource = new ConfigResource(ConfigResource.Type.TOPIC, "events");
AlterConfigOp op = new AlterConfigOp(
    new ConfigEntry("retention.ms", "259200000"),  // Change to 3 days
    AlterConfigOp.OpType.SET
);
alterConfigs.put(resource, Collections.singleton(op));
admin.incrementalAlterConfigs(alterConfigs).all().get();

admin.close();`
        }
      ]
    },
    {
      id: 'consumers',
      name: 'Kafka Consumers',
      icon: '📥',
      color: '#8b5cf6',
      description: 'Consumer groups with offset management, parallel processing, and rebalancing strategies',
      diagram: ConsumerDiagram,
      details: [
        {
          name: 'Consumer Groups',
          explanation: 'Multiple consumers in a group share partition load. Each partition consumed by one consumer in group. Horizontal scaling by adding consumers (up to partition count). Different groups can consume same topic independently. Group coordinator manages membership.',
          codeExample: `// Kafka Consumer with Consumer Groups
import org.apache.kafka.clients.consumer.*;
import java.time.Duration;
import java.util.*;

public class KafkaConsumerExample {
    public static void main(String[] args) {
        // Consumer configuration
        Properties props = new Properties();
        props.put("bootstrap.servers", "kafka1:9092,kafka2:9092,kafka3:9092");
        props.put("group.id", "order-processing-group");
        props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");

        // Consumer group settings
        props.put("enable.auto.commit", false);  // Manual commit
        props.put("auto.offset.reset", "earliest");  // Start from beginning
        props.put("max.poll.records", 500);  // Batch size
        props.put("session.timeout.ms", 30000);  // Heartbeat timeout

        KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);

        // Subscribe to topics
        consumer.subscribe(Arrays.asList("orders", "payments"));

        try {
            while (true) {
                // Poll for messages
                ConsumerRecords<String, String> records =
                    consumer.poll(Duration.ofMillis(100));

                for (ConsumerRecord<String, String> record : records) {
                    System.out.printf("Partition %d, Offset %d: %s = %s%n",
                        record.partition(), record.offset(),
                        record.key(), record.value());

                    // Process message
                    processOrder(record.value());
                }

                // Commit offsets after processing batch
                consumer.commitSync();
            }
        } finally {
            consumer.close();
        }
    }

    private static void processOrder(String order) {
        // Business logic here
    }
}`
        },
        {
          name: 'Offset Management',
          explanation: 'Offset tracks consumer position in partition. Commit offset to mark messages as processed. Stored in __consumer_offsets topic. Committed offset survives consumer restart. Seek to specific offset for replay. Latest vs earliest offset strategies.',
          codeExample: `// Offset Management - Seek, Reset, and Replay
import org.apache.kafka.clients.consumer.*;
import org.apache.kafka.common.TopicPartition;

Properties props = new Properties();
props.put("bootstrap.servers", "localhost:9092");
props.put("group.id", "offset-demo-group");
props.put("enable.auto.commit", false);
props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");

// auto.offset.reset: what to do when no committed offset exists
props.put("auto.offset.reset", "earliest");  // "latest", "earliest", or "none"

KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);
consumer.subscribe(Arrays.asList("events"));

// Force assignment before seeking
consumer.poll(Duration.ofMillis(0));

// Seek to beginning of all assigned partitions (replay all)
consumer.seekToBeginning(consumer.assignment());

// Seek to end (skip to latest)
consumer.seekToEnd(consumer.assignment());

// Seek to specific offset
TopicPartition partition0 = new TopicPartition("events", 0);
consumer.seek(partition0, 1000);  // Jump to offset 1000

// Seek to timestamp (replay from specific time)
Map<TopicPartition, Long> timestampMap = new HashMap<>();
long oneDayAgo = System.currentTimeMillis() - 86400000;
for (TopicPartition tp : consumer.assignment()) {
    timestampMap.put(tp, oneDayAgo);
}
Map<TopicPartition, OffsetAndTimestamp> offsets =
    consumer.offsetsForTimes(timestampMap);

for (Map.Entry<TopicPartition, OffsetAndTimestamp> entry : offsets.entrySet()) {
    if (entry.getValue() != null) {
        consumer.seek(entry.getKey(), entry.getValue().offset());
    }
}

// Get current position and committed offset
for (TopicPartition tp : consumer.assignment()) {
    long position = consumer.position(tp);
    OffsetAndMetadata committed = consumer.committed(Set.of(tp)).get(tp);
    System.out.printf("Partition %d: position=%d, committed=%d%n",
        tp.partition(), position,
        committed != null ? committed.offset() : -1);
}

consumer.close();`
        },
        {
          name: 'Parallel Processing',
          explanation: 'Each consumer in group processes different partitions. Partition assignment strategies: range, round-robin, sticky, cooperative. Process messages in parallel across consumers. Single-threaded per consumer for simplicity. Scale processing by adding consumers.',
          codeExample: `// Multi-threaded Kafka Consumer for Parallel Processing
import org.apache.kafka.clients.consumer.*;
import java.util.concurrent.*;

public class ParallelConsumerApp {
    private final int numConsumers;
    private final ExecutorService executor;
    private final List<KafkaConsumer<String, String>> consumers;

    public ParallelConsumerApp(int numConsumers) {
        this.numConsumers = numConsumers;
        this.executor = Executors.newFixedThreadPool(numConsumers);
        this.consumers = new ArrayList<>();
    }

    public void start() {
        for (int i = 0; i < numConsumers; i++) {
            Properties props = new Properties();
            props.put("bootstrap.servers", "localhost:9092");
            props.put("group.id", "parallel-group");  // Same group
            props.put("key.deserializer",
                "org.apache.kafka.common.serialization.StringDeserializer");
            props.put("value.deserializer",
                "org.apache.kafka.common.serialization.StringDeserializer");
            props.put("enable.auto.commit", false);

            // Partition assignment strategy
            props.put("partition.assignment.strategy",
                "org.apache.kafka.clients.consumer.CooperativeStickyAssignor");
            // CooperativeSticky: minimal partition movement during rebalance
            // RangeAssignor: default, assigns contiguous ranges
            // RoundRobinAssignor: distributes evenly

            KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);
            consumers.add(consumer);

            final int consumerId = i;
            executor.submit(() -> {
                consumer.subscribe(Arrays.asList("events"));
                try {
                    while (!Thread.currentThread().isInterrupted()) {
                        ConsumerRecords<String, String> records =
                            consumer.poll(Duration.ofMillis(100));

                        for (ConsumerRecord<String, String> record : records) {
                            System.out.printf("Consumer %d: [P%d] %s%n",
                                consumerId, record.partition(), record.key());
                            processRecord(record);
                        }
                        consumer.commitSync();
                    }
                } finally {
                    consumer.close();
                }
            });
        }
    }

    public void shutdown() {
        executor.shutdownNow();
    }
}

// Launch: 3 consumers sharing 12 partitions = 4 partitions each
ParallelConsumerApp app = new ParallelConsumerApp(3);
app.start();`
        },
        {
          name: 'Auto-commit',
          explanation: 'Automatically commit offsets periodically. enable.auto.commit=true with auto.commit.interval.ms. Simple but risks duplicate or lost messages. Commits happen in background during poll(). Trade convenience for at-least-once semantics. Good for non-critical workloads.',
          codeExample: `// Auto-commit Consumer Configuration
Properties props = new Properties();
props.put("bootstrap.servers", "localhost:9092");
props.put("group.id", "auto-commit-group");
props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");

// Auto-commit settings
props.put("enable.auto.commit", true);          // Enable auto-commit
props.put("auto.commit.interval.ms", 5000);     // Commit every 5 seconds
props.put("auto.offset.reset", "latest");        // Start from latest

KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);
consumer.subscribe(Arrays.asList("notifications"));

// Simple consume loop - offsets committed automatically
try {
    while (true) {
        ConsumerRecords<String, String> records =
            consumer.poll(Duration.ofMillis(100));

        for (ConsumerRecord<String, String> record : records) {
            // Process message
            sendNotification(record.value());

            // WARNING: If consumer crashes between poll() and next commit,
            // messages processed since last auto-commit will be reprocessed
            // This gives AT-LEAST-ONCE semantics (possible duplicates)
        }
        // Auto-commit happens inside the next poll() call
        // based on auto.commit.interval.ms
    }
} finally {
    consumer.close();  // Triggers final commit on close
}

// When to use auto-commit:
// - Non-critical data (logs, metrics, analytics)
// - Idempotent processing (duplicate messages are harmless)
// - Simplicity is more important than exactly-once
//
// When NOT to use auto-commit:
// - Financial transactions
// - Stateful processing where duplicates cause errors
// - When you need exactly-once guarantees`
        },
        {
          name: 'Manual Commit',
          explanation: 'Explicit offset commits for precise control. commitSync() blocks until acknowledged. commitAsync() with callback for non-blocking. Commit per record, batch, or partition. Enables exactly-once processing with transactions. Critical for financial and stateful applications.',
          codeExample: `// Manual Offset Management with Exactly-Once
Properties props = new Properties();
props.put("bootstrap.servers", "localhost:9092");
props.put("group.id", "payment-processor");
props.put("enable.auto.commit", false);  // Manual commit
props.put("isolation.level", "read_committed");  // Read only committed messages
props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");

KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);
consumer.subscribe(Arrays.asList("payments"));

try {
    while (true) {
        ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));

        // Process records by partition
        for (TopicPartition partition : records.partitions()) {
            List<ConsumerRecord<String, String>> partitionRecords =
                records.records(partition);

            for (ConsumerRecord<String, String> record : partitionRecords) {
                try {
                    // Process message (database write, external API call, etc.)
                    processPayment(record.value());

                    // Commit after each record for exactly-once
                    Map<TopicPartition, OffsetAndMetadata> offsets = new HashMap<>();
                    offsets.put(partition,
                        new OffsetAndMetadata(record.offset() + 1));
                    consumer.commitSync(offsets);

                } catch (Exception e) {
                    System.err.println("Error processing record: " + e.getMessage());
                    // Don't commit - will reprocess this message
                    break;
                }
            }
        }

        // Alternative: Async commit for better throughput
        consumer.commitAsync((offsets, exception) -> {
            if (exception != null) {
                System.err.println("Commit failed: " + exception.getMessage());
            }
        });
    }
} finally {
    // Final sync commit before closing
    try {
        consumer.commitSync();
    } finally {
        consumer.close();
    }
}`
        },
        {
          name: 'Rebalancing',
          explanation: 'Redistribute partitions when consumers join/leave. Cooperative rebalancing avoids stop-the-world pauses. RebalanceListener hooks for cleanup/initialization. Save state before rebalance, restore after. Rebalance triggered by heartbeat failure or session timeout. Static membership reduces rebalances.',
          codeExample: `// Consumer Rebalance Listener for Graceful Rebalancing
import org.apache.kafka.clients.consumer.*;
import org.apache.kafka.common.TopicPartition;

Properties props = new Properties();
props.put("bootstrap.servers", "localhost:9092");
props.put("group.id", "rebalance-demo");
props.put("enable.auto.commit", false);
props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");

// Static membership - reduces rebalancing on transient failures
props.put("group.instance.id", "consumer-instance-1");  // Unique per instance
props.put("session.timeout.ms", 300000);  // 5 min timeout for static members

// Cooperative rebalancing (incremental, no stop-the-world)
props.put("partition.assignment.strategy",
    "org.apache.kafka.clients.consumer.CooperativeStickyAssignor");

KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);

// Subscribe with rebalance listener
consumer.subscribe(Arrays.asList("orders"), new ConsumerRebalanceListener() {
    @Override
    public void onPartitionsRevoked(Collection<TopicPartition> partitions) {
        // Called BEFORE partitions are taken away
        System.out.println("Revoking: " + partitions);

        // Commit current offsets before losing partitions
        consumer.commitSync();

        // Flush any buffered state
        flushBatchBuffer();
    }

    @Override
    public void onPartitionsAssigned(Collection<TopicPartition> partitions) {
        // Called AFTER new partitions are assigned
        System.out.println("Assigned: " + partitions);

        // Initialize state for new partitions
        for (TopicPartition tp : partitions) {
            initializePartitionState(tp);
        }
    }

    @Override
    public void onPartitionsLost(Collection<TopicPartition> partitions) {
        // Called when partitions are lost unexpectedly (cooperative only)
        System.out.println("Lost: " + partitions);
        // Clean up without committing (partitions already reassigned)
        cleanupPartitionState(partitions);
    }
});

// Consume with graceful rebalance handling
while (true) {
    ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));
    processRecords(records);
    consumer.commitSync();
}`
        }
      ]
    },
    {
      id: 'stream-processing',
      name: 'Kafka Streams',
      icon: '🌊',
      color: '#ef4444',
      description: 'Stream processing library with stateful operations, windowing, joins, and exactly-once semantics',
      diagram: StreamsDiagram,
      details: [
        {
          name: 'Stateful Processing',
          explanation: 'Maintain state across messages with state stores. RocksDB for persistent local state. Changelog topics for fault tolerance. Restore state from changelog on failure. Aggregate, reduce, count operations. Interactive queries for external state access.',
          codeExample: `// Kafka Streams Stateful Processing
import org.apache.kafka.streams.*;
import org.apache.kafka.streams.kstream.*;

Properties props = new Properties();
props.put(StreamsConfig.APPLICATION_ID_CONFIG, "order-aggregator");
props.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
props.put(StreamsConfig.DEFAULT_KEY_SERDE_CLASS_CONFIG, Serdes.String().getClass());
props.put(StreamsConfig.DEFAULT_VALUE_SERDE_CLASS_CONFIG, Serdes.String().getClass());

StreamsBuilder builder = new StreamsBuilder();

// Input stream
KStream<String, String> orders = builder.stream("orders");

// Stateful aggregation: count orders per customer
KTable<String, Long> orderCounts = orders
    .groupByKey()
    .count(Materialized.as("order-counts-store"));  // State store

// Stateful aggregation: total amount per customer
KTable<String, Double> orderTotals = orders
    .mapValues(value -> Double.parseDouble(value))
    .groupByKey()
    .reduce(
        (aggValue, newValue) -> aggValue + newValue,
        Materialized.as("order-totals-store")  // Persistent state
    );

// Join two KTables (both stateful)
KTable<String, String> customerStats = orderCounts
    .join(orderTotals,
        (count, total) -> String.format("Count: %d, Total: %.2f", count, total)
    );

// Write results to output topic
customerStats.toStream().to("customer-statistics");

// Start streams application
KafkaStreams streams = new KafkaStreams(builder.build(), props);
streams.start();

// Query state store from external application
ReadOnlyKeyValueStore<String, Long> store =
    streams.store(
        StoreQueryParameters.fromNameAndType(
            "order-counts-store",
            QueryableStoreTypes.keyValueStore()
        )
    );

Long count = store.get("customer-123");  // Interactive query`
        },
        {
          name: 'Windowing Operations',
          explanation: 'Group events by time windows. Tumbling windows (fixed, non-overlapping). Hopping windows (fixed, overlapping). Sliding windows (continuous). Session windows (activity-based gaps). Grace period handles late-arriving events. Window results to output topics.',
          codeExample: `// Kafka Streams Windowing Examples
StreamsBuilder builder = new StreamsBuilder();
KStream<String, Double> transactions = builder.stream("transactions");

// 1. Tumbling Window (5-minute, non-overlapping)
KTable<Windowed<String>, Double> tumblingSum = transactions
    .groupByKey()
    .windowedBy(TimeWindows.ofSizeWithNoGrace(Duration.ofMinutes(5)))
    .reduce((aggValue, newValue) -> aggValue + newValue);

// 2. Hopping Window (10-minute window, advance by 5 minutes)
KTable<Windowed<String>, Long> hoppingCount = transactions
    .groupByKey()
    .windowedBy(
        TimeWindows
            .ofSizeWithNoGrace(Duration.ofMinutes(10))
            .advanceBy(Duration.ofMinutes(5))
    )
    .count();

// 3. Session Window (30-minute inactivity gap)
KTable<Windowed<String>, Long> sessionCount = transactions
    .groupByKey()
    .windowedBy(SessionWindows.ofInactivityGapWithNoGrace(Duration.ofMinutes(30)))
    .count();

// 4. Sliding Window (continuous, 1-hour window)
KTable<Windowed<String>, Double> slidingAvg = transactions
    .groupByKey()
    .windowedBy(SlidingWindows.ofTimeDifferenceWithNoGrace(Duration.ofHours(1)))
    .aggregate(
        () -> new AverageAggregator(),
        (key, value, agg) -> agg.add(value),
        Materialized.with(Serdes.String(), new AverageAggregatorSerde())
    );

// 5. Window with grace period for late arrivals
KTable<Windowed<String>, Long> gracefulCount = transactions
    .groupByKey()
    .windowedBy(
        TimeWindows
            .ofSizeAndGrace(Duration.ofMinutes(5), Duration.ofMinutes(1))
    )
    .count();

// Output windowed results
tumblingSum
    .toStream()
    .map((windowedKey, value) ->
        KeyValue.pair(
            windowedKey.key() + "@" + windowedKey.window().start(),
            value
        )
    )
    .to("windowed-results");`
        },
        {
          name: 'Joins & Aggregations',
          explanation: 'Join streams with streams or tables. Inner, left, outer join semantics. Co-partitioned topics for join performance. Windowed joins for bounded state. Aggregations: count, sum, reduce. GroupBy for key changes. KTable for table semantics.',
          codeExample: `// Kafka Streams Joins and Aggregations
StreamsBuilder builder = new StreamsBuilder();

// KStream: unbounded stream of events
KStream<String, String> orders = builder.stream("orders");
KStream<String, String> payments = builder.stream("payments");

// KTable: changelog stream (latest value per key)
KTable<String, String> customers = builder.table("customers");

// 1. KStream-KTable Join (enrich orders with customer data)
KStream<String, String> enrichedOrders = orders.join(
    customers,
    (order, customer) -> order + " | Customer: " + customer
    // Inner join: only if customer exists
);

// Left join: include orders even without customer match
KStream<String, String> allOrders = orders.leftJoin(
    customers,
    (order, customer) -> order + " | Customer: " +
        (customer != null ? customer : "UNKNOWN")
);

// 2. KStream-KStream Join (windowed - match orders with payments)
KStream<String, String> matched = orders.join(
    payments,
    (order, payment) -> "Matched: " + order + " <-> " + payment,
    JoinWindows.ofTimeDifferenceWithNoGrace(Duration.ofMinutes(5))
    // Join events within 5-minute window
);

// 3. Aggregations
// Count events per key
KTable<String, Long> orderCounts = orders
    .groupByKey()
    .count();

// Custom aggregation with initializer and adder
KTable<String, String> orderSummary = orders
    .groupByKey()
    .aggregate(
        () -> "",                       // Initializer
        (key, value, agg) -> agg + "," + value,  // Adder
        Materialized.as("order-summary-store")
    );

// GroupBy to change key, then aggregate
KTable<String, Long> ordersByRegion = orders
    .groupBy((key, value) -> extractRegion(value))  // Re-key by region
    .count(Materialized.as("region-counts"));

// Write join results to output topic
enrichedOrders.to("enriched-orders");
ordersByRegion.toStream().to("orders-by-region");`
        },
        {
          name: 'Exactly-Once Semantics',
          explanation: 'End-to-end exactly-once processing with transactions. processing.guarantee=exactly_once_v2. Atomic writes across multiple partitions. Transaction markers in log. Idempotent producers prevent duplicates. Read committed isolation level. Performance overhead vs at-least-once.',
          codeExample: `// Exactly-Once Semantics in Kafka Streams
Properties props = new Properties();
props.put(StreamsConfig.APPLICATION_ID_CONFIG, "eos-processor");
props.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");

// Enable exactly-once semantics (v2 - Kafka 3.0+)
props.put(StreamsConfig.PROCESSING_GUARANTEE_CONFIG,
    StreamsConfig.EXACTLY_ONCE_V2);  // Uses transactions internally

// EOS requires these settings (set automatically):
// - enable.idempotence=true (on internal producer)
// - isolation.level=read_committed (on internal consumer)
// - transactional.id=<auto-generated> (per task)

StreamsBuilder builder = new StreamsBuilder();

// Process: read -> transform -> write (all atomic)
KStream<String, String> input = builder.stream("raw-transactions");

KStream<String, String> processed = input
    .filter((key, value) -> isValid(value))
    .mapValues(value -> enrichTransaction(value));

// Output and offset commit happen in same transaction
processed.to("processed-transactions");

KafkaStreams streams = new KafkaStreams(builder.build(), props);
streams.start();

// How EOS works internally:
// 1. Consumer reads batch of records
// 2. Application processes records
// 3. Producer begins transaction
// 4. Producer writes output records
// 5. Producer sends consumer offset commits
// 6. Producer commits transaction
// All of steps 4-6 are atomic: all succeed or all fail

// Manual EOS with Producer/Consumer (without Streams):
KafkaProducer<String, String> producer = new KafkaProducer<>(eosProps);
producer.initTransactions();

try {
    producer.beginTransaction();

    // Consume, process, produce in one transaction
    ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));
    for (ConsumerRecord<String, String> record : records) {
        producer.send(new ProducerRecord<>("output", process(record.value())));
    }

    // Commit consumer offsets as part of the transaction
    producer.sendOffsetsToTransaction(
        getOffsetsToCommit(records), consumer.groupMetadata());

    producer.commitTransaction();
} catch (Exception e) {
    producer.abortTransaction();
}`
        },
        {
          name: 'Interactive Queries',
          explanation: 'Query state stores from external applications. REST API for state access. ReadOnlyKeyValueStore interface. Distributed queries across application instances. Metadata for routing queries to correct instance. Real-time materialized views.',
          codeExample: `// Interactive Queries - Query State Stores via REST API
import org.apache.kafka.streams.*;
import org.apache.kafka.streams.state.*;

// Configure streams with application server for discovery
Properties props = new Properties();
props.put(StreamsConfig.APPLICATION_ID_CONFIG, "queryable-app");
props.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
props.put(StreamsConfig.APPLICATION_SERVER_CONFIG, "localhost:8080");

StreamsBuilder builder = new StreamsBuilder();

// Create queryable state stores
KTable<String, Long> wordCounts = builder.stream("text-input")
    .flatMapValues(value -> Arrays.asList(value.split("\\\\s+")))
    .groupBy((key, word) -> word)
    .count(Materialized.as("word-count-store"));  // Named store

KafkaStreams streams = new KafkaStreams(builder.build(), props);
streams.start();

// Query local state store
ReadOnlyKeyValueStore<String, Long> store = streams.store(
    StoreQueryParameters.fromNameAndType(
        "word-count-store",
        QueryableStoreTypes.keyValueStore()
    )
);

// Point lookup
Long count = store.get("kafka");
System.out.println("kafka count: " + count);

// Range scan
KeyValueIterator<String, Long> range = store.range("a", "z");
while (range.hasNext()) {
    KeyValue<String, Long> entry = range.next();
    System.out.printf("%s: %d%n", entry.key, entry.value);
}
range.close();

// Iterate all entries
KeyValueIterator<String, Long> all = store.all();
while (all.hasNext()) {
    KeyValue<String, Long> entry = all.next();
    System.out.printf("%s = %d%n", entry.key, entry.value);
}
all.close();

// Discover which instance hosts a key (for distributed queries)
KeyQueryMetadata metadata = streams.queryMetadataForKey(
    "word-count-store", "kafka", new StringSerializer());

if (metadata.activeHost().equals(HostInfo.unavailable())) {
    System.out.println("Store not yet ready");
} else {
    System.out.printf("Key hosted on: %s:%d%n",
        metadata.activeHost().host(), metadata.activeHost().port());
}`
        },
        {
          name: 'Topology Optimization',
          explanation: 'Optimize stream processing DAG. Reduce repartition operations. Co-locate related operations. Named topologies for modular code. Describe topology for debugging. Tune parallelism with thread count. Monitor lag and processing rate.',
          codeExample: `// Topology Optimization and Debugging
import org.apache.kafka.streams.*;

Properties props = new Properties();
props.put(StreamsConfig.APPLICATION_ID_CONFIG, "optimized-app");
props.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");

// Enable topology optimization (merges repartition topics)
props.put(StreamsConfig.TOPOLOGY_OPTIMIZATION_CONFIG,
    StreamsConfig.OPTIMIZE);

// Thread and performance tuning
props.put(StreamsConfig.NUM_STREAM_THREADS_CONFIG, 4);       // Parallelism
props.put(StreamsConfig.CACHE_MAX_BYTES_BUFFERING_CONFIG,
    10 * 1024 * 1024);                                         // 10MB cache
props.put(StreamsConfig.COMMIT_INTERVAL_MS_CONFIG, 1000);     // Commit every 1s
props.put(StreamsConfig.POLL_MS_CONFIG, 100);                 // Poll interval

StreamsBuilder builder = new StreamsBuilder();

// Build optimized topology
KStream<String, String> input = builder.stream("input-topic");

// Avoid unnecessary repartitions by keeping the same key
KStream<String, String> filtered = input
    .filter((key, value) -> value != null && !value.isEmpty())
    .mapValues(value -> value.toUpperCase());  // mapValues doesn't change key

// GroupByKey doesn't cause repartition (key unchanged)
KTable<String, Long> counts = filtered
    .groupByKey()  // No repartition needed
    .count(Materialized.as("optimized-counts"));

// groupBy() DOES cause repartition (key changes)
KTable<String, Long> rekeyed = filtered
    .groupBy((key, value) -> value.substring(0, 3))  // Repartition!
    .count();

counts.toStream().to("output-counts");

// Build and describe topology
Topology topology = builder.build(props);

// Print topology description for debugging
System.out.println(topology.describe());
// Output shows: Sub-topologies, Source/Sink nodes, State stores,
// Repartition topics, Processor nodes

KafkaStreams streams = new KafkaStreams(topology, props);

// Monitor state transitions
streams.setStateListener((newState, oldState) -> {
    System.out.printf("State changed: %s -> %s%n", oldState, newState);
});

// Handle uncaught exceptions
streams.setUncaughtExceptionHandler(exception -> {
    System.err.println("Uncaught: " + exception.getMessage());
    return StreamsUncaughtExceptionHandler.StreamThreadExceptionResponse
        .REPLACE_THREAD;  // Replace failed thread
});

streams.start();`
        }
      ]
    },
    {
      id: 'schema-registry',
      name: 'Schema Registry',
      icon: '📋',
      color: '#f59e0b',
      description: 'Centralized schema management with evolution, versioning, and compatibility enforcement',
      diagram: SchemaRegistryDiagram,
      details: [
        {
          name: 'Schema Evolution',
          explanation: 'Evolve schemas over time without breaking consumers. Add optional fields with defaults. Remove optional fields. Forward, backward, full compatibility. Schema Registry validates compatibility. Prevents breaking changes. Decouple producer/consumer deployments.',
          codeExample: `// Schema Registry with Avro
import io.confluent.kafka.serializers.KafkaAvroSerializer;
import io.confluent.kafka.serializers.KafkaAvroDeserializer;
import org.apache.avro.Schema;
import org.apache.avro.generic.GenericRecord;
import org.apache.avro.generic.GenericData;

// V1 Schema
String schemaV1 = "{"
    + "\\"type\\": \\"record\\","
    + "\\"name\\": \\"Customer\\","
    + "\\"fields\\": ["
    + "  {\\"name\\": \\"id\\", \\"type\\": \\"string\\"},"
    + "  {\\"name\\": \\"name\\", \\"type\\": \\"string\\"}"
    + "]"
    + "}";

// V2 Schema - backward compatible (added optional field with default)
String schemaV2 = "{"
    + "\\"type\\": \\"record\\","
    + "\\"name\\": \\"Customer\\","
    + "\\"fields\\": ["
    + "  {\\"name\\": \\"id\\", \\"type\\": \\"string\\"},"
    + "  {\\"name\\": \\"name\\", \\"type\\": \\"string\\"},"
    + "  {\\"name\\": \\"email\\", \\"type\\": \\"string\\", \\"default\\": \\"\\"}"
    + "]"
    + "}";

// Producer with Schema Registry
Properties producerProps = new Properties();
producerProps.put("bootstrap.servers", "localhost:9092");
producerProps.put("key.serializer", StringSerializer.class);
producerProps.put("value.serializer", KafkaAvroSerializer.class);
producerProps.put("schema.registry.url", "http://localhost:8081");

KafkaProducer<String, GenericRecord> producer = new KafkaProducer<>(producerProps);

Schema.Parser parser = new Schema.Parser();
Schema schema = parser.parse(schemaV2);

GenericRecord customer = new GenericData.Record(schema);
customer.put("id", "123");
customer.put("name", "John Doe");
customer.put("email", "john@example.com");

producer.send(new ProducerRecord<>("customers", "123", customer));

// Consumer automatically gets schema from registry
Properties consumerProps = new Properties();
consumerProps.put("bootstrap.servers", "localhost:9092");
consumerProps.put("group.id", "customer-processor");
consumerProps.put("key.deserializer", StringDeserializer.class);
consumerProps.put("value.deserializer", KafkaAvroDeserializer.class);
consumerProps.put("schema.registry.url", "http://localhost:8081");
consumerProps.put("specific.avro.reader", false);

KafkaConsumer<String, GenericRecord> consumer = new KafkaConsumer<>(consumerProps);`
        },
        {
          name: 'Avro/JSON Support',
          explanation: 'Avro for compact binary serialization. JSON Schema for human-readable format. Protobuf support available. Schema ID embedded in message. Registry stores schemas centrally. Automatic serializer/deserializer generation. Type safety and documentation.',
          codeExample: `// Avro with Specific Record (Generated Classes)
// 1. Define schema: src/main/avro/Order.avsc
// {
//   "type": "record",
//   "name": "Order",
//   "namespace": "com.example.avro",
//   "fields": [
//     {"name": "orderId", "type": "string"},
//     {"name": "amount", "type": "double"},
//     {"name": "timestamp", "type": "long", "logicalType": "timestamp-millis"}
//   ]
// }

// 2. Generate Java class with Avro Maven plugin, then use:
import com.example.avro.Order;
import io.confluent.kafka.serializers.KafkaAvroSerializer;
import io.confluent.kafka.serializers.KafkaAvroDeserializer;
import io.confluent.kafka.serializers.KafkaAvroDeserializerConfig;

// Producer with Avro Specific Record
Properties producerProps = new Properties();
producerProps.put("bootstrap.servers", "localhost:9092");
producerProps.put("key.serializer", StringSerializer.class);
producerProps.put("value.serializer", KafkaAvroSerializer.class);
producerProps.put("schema.registry.url", "http://localhost:8081");

KafkaProducer<String, Order> producer = new KafkaProducer<>(producerProps);

Order order = Order.newBuilder()
    .setOrderId("ORD-001")
    .setAmount(149.99)
    .setTimestamp(System.currentTimeMillis())
    .build();

producer.send(new ProducerRecord<>("orders-avro", order.getOrderId(), order));

// Consumer with Avro Specific Record
Properties consumerProps = new Properties();
consumerProps.put("bootstrap.servers", "localhost:9092");
consumerProps.put("group.id", "avro-consumer");
consumerProps.put("key.deserializer", StringDeserializer.class);
consumerProps.put("value.deserializer", KafkaAvroDeserializer.class);
consumerProps.put("schema.registry.url", "http://localhost:8081");
consumerProps.put(KafkaAvroDeserializerConfig.SPECIFIC_AVRO_READER_CONFIG, true);

KafkaConsumer<String, Order> consumer = new KafkaConsumer<>(consumerProps);
consumer.subscribe(Arrays.asList("orders-avro"));

ConsumerRecords<String, Order> records = consumer.poll(Duration.ofMillis(1000));
for (ConsumerRecord<String, Order> record : records) {
    Order o = record.value();
    System.out.printf("Order: %s, Amount: %.2f%n", o.getOrderId(), o.getAmount());
}`
        },
        {
          name: 'Compatibility Checks',
          explanation: 'Enforce compatibility rules before registration. BACKWARD: new schema reads old data. FORWARD: old schema reads new data. FULL: both directions. NONE: no checks. Subject-level or global settings. Reject incompatible schemas.',
          codeExample: `// Schema Registry Compatibility via REST API
// Check and set compatibility levels

// GET global compatibility level
// curl http://localhost:8081/config
// Response: {"compatibilityLevel": "BACKWARD"}

// SET global compatibility level
// curl -X PUT -H "Content-Type: application/json" \\
//   --data '{"compatibility": "FULL"}' \\
//   http://localhost:8081/config

// SET subject-level compatibility
// curl -X PUT -H "Content-Type: application/json" \\
//   --data '{"compatibility": "BACKWARD_TRANSITIVE"}' \\
//   http://localhost:8081/config/orders-value

// Compatibility Levels:
// BACKWARD           - New schema can read old data (add optional fields)
// BACKWARD_TRANSITIVE - Compatible with ALL previous versions
// FORWARD            - Old schema can read new data (remove optional fields)
// FORWARD_TRANSITIVE  - All old versions can read new data
// FULL               - Both backward and forward compatible
// FULL_TRANSITIVE     - Full compatibility with ALL versions
// NONE               - No compatibility checks

// Java: Test compatibility before registering
import io.confluent.kafka.schemaregistry.client.CachedSchemaRegistryClient;

SchemaRegistryClient client =
    new CachedSchemaRegistryClient("http://localhost:8081", 100);

// Check if new schema is compatible
String newSchema = "{\\"type\\":\\"record\\",\\"name\\":\\"Order\\","
    + "\\"fields\\":["
    + "{\\"name\\":\\"id\\",\\"type\\":\\"string\\"},"
    + "{\\"name\\":\\"amount\\",\\"type\\":\\"double\\"},"
    + "{\\"name\\":\\"notes\\",\\"type\\":[\\"null\\",\\"string\\"],"
    + "\\"default\\":null}"  // Optional field with default
    + "]}";

boolean compatible = client.testCompatibility("orders-value",
    new AvroSchema(new Schema.Parser().parse(newSchema)));

if (compatible) {
    // Safe to register
    int schemaId = client.register("orders-value",
        new AvroSchema(new Schema.Parser().parse(newSchema)));
    System.out.println("Registered schema ID: " + schemaId);
} else {
    System.out.println("Schema is NOT compatible - registration blocked");
}`
        },
        {
          name: 'Version Management',
          explanation: 'Every schema change creates new version. Immutable versions prevent conflicts. List all versions for a subject. Fetch schema by version or ID. Rollback to previous version. Soft delete with option to permanently delete.',
          codeExample: `// Schema Version Management via REST API and Java Client
import io.confluent.kafka.schemaregistry.client.CachedSchemaRegistryClient;

SchemaRegistryClient client =
    new CachedSchemaRegistryClient("http://localhost:8081", 100);

// List all subjects (topics with schemas)
Collection<String> subjects = client.getAllSubjects();
// ["orders-key", "orders-value", "customers-value"]

// List all versions for a subject
List<Integer> versions = client.getAllVersions("orders-value");
// [1, 2, 3]

// Get schema by version
SchemaMetadata metadata = client.getSchemaMetadata("orders-value", 2);
System.out.println("Schema ID: " + metadata.getId());
System.out.println("Version: " + metadata.getVersion());
System.out.println("Schema: " + metadata.getSchema());

// Get latest schema
SchemaMetadata latest = client.getLatestSchemaMetadata("orders-value");

// Get schema by global ID (shared across subjects)
ParsedSchema schema = client.getSchemaById(42);

// REST API equivalents:
// GET /subjects                           - List all subjects
// GET /subjects/orders-value/versions     - List versions
// GET /subjects/orders-value/versions/2   - Get version 2
// GET /subjects/orders-value/versions/latest - Get latest
// GET /schemas/ids/42                     - Get by global ID

// Soft delete a version
// DELETE /subjects/orders-value/versions/2
client.deleteSchemaVersion("orders-value", "2");

// Soft delete entire subject
// DELETE /subjects/orders-value
client.deleteSubject("orders-value");

// Permanent delete (after soft delete)
// DELETE /subjects/orders-value/versions/2?permanent=true
// DELETE /subjects/orders-value?permanent=true

// Register new version (auto-increments version number)
String newSchema = "{\\"type\\":\\"record\\",\\"name\\":\\"Order\\","
    + "\\"fields\\":[{\\"name\\":\\"id\\",\\"type\\":\\"string\\"}]}";
int id = client.register("orders-value",
    new AvroSchema(new Schema.Parser().parse(newSchema)));`
        },
        {
          name: 'Schema Validation',
          explanation: 'Validate messages against registered schemas. Serialization fails for invalid data. Deserialization with schema ID lookup. Client-side caching for performance. Fail-fast on schema errors. Integration with Connect and Streams.',
          codeExample: `// Schema Validation - Broker-side and Client-side
// 1. Broker-side validation (Confluent Platform)
// Enabled per topic - broker rejects invalid messages

// Create topic with schema validation enabled
// kafka-configs --bootstrap-server localhost:9092 \\
//   --alter --entity-type topics --entity-name orders \\
//   --add-config confluent.value.schema.validation=true

// 2. Client-side validation (automatic with Avro serializer)
Properties props = new Properties();
props.put("bootstrap.servers", "localhost:9092");
props.put("key.serializer", StringSerializer.class);
props.put("value.serializer", KafkaAvroSerializer.class);
props.put("schema.registry.url", "http://localhost:8081");

// Cache schemas locally for performance (default: 1000)
props.put("max.schemas.per.subject", 1000);

// Auto-register new schemas (disable in production)
props.put("auto.register.schemas", false);   // Require pre-registration
props.put("use.latest.version", true);        // Use latest registered schema

KafkaProducer<String, GenericRecord> producer = new KafkaProducer<>(props);

// Valid record - serialization succeeds
Schema schema = new Schema.Parser().parse(schemaString);
GenericRecord validRecord = new GenericData.Record(schema);
validRecord.put("id", "123");
validRecord.put("amount", 99.99);
producer.send(new ProducerRecord<>("orders", "123", validRecord));

// Invalid record - SerializationException thrown
try {
    GenericRecord invalidRecord = new GenericData.Record(schema);
    // Missing required field "id" - will fail validation
    invalidRecord.put("amount", 99.99);
    producer.send(new ProducerRecord<>("orders", "bad", invalidRecord)).get();
} catch (ExecutionException e) {
    if (e.getCause() instanceof SerializationException) {
        System.err.println("Schema validation failed: " + e.getMessage());
        // Log to dead letter queue or alert
    }
}

// Consumer-side: deserialization validates against writer schema
// Schema ID is embedded in first 5 bytes of message
// Byte 0: Magic byte (0x0)
// Bytes 1-4: Schema ID (4 bytes, big-endian)
// Bytes 5+: Avro-encoded payload`
        }
      ]
    },
    {
      id: 'connect',
      name: 'Kafka Connect',
      icon: '🔌',
      color: '#14b8a6',
      description: 'Scalable data integration framework with source and sink connectors for external systems',
      diagram: ConnectDiagram,
      details: [
        {
          name: 'Source Connectors',
          explanation: 'Import data from external systems into Kafka. JDBC, file, database CDC connectors. Poll or push-based data ingestion. Schema discovery and evolution. Offset tracking for incremental loads. Hundreds of connectors available. Custom connectors possible.',
          codeExample: `// Kafka Connect JDBC Source Connector Configuration (JSON)
{
  "name": "jdbc-source-connector",
  "config": {
    "connector.class": "io.confluent.connect.jdbc.JdbcSourceConnector",
    "tasks.max": "3",
    "connection.url": "jdbc:postgresql://localhost:5432/mydb",
    "connection.user": "dbuser",
    "connection.password": "dbpass",

    // Table monitoring
    "table.whitelist": "customers,orders,products",
    "mode": "incrementing",
    "incrementing.column.name": "id",
    "timestamp.column.name": "updated_at",
    "poll.interval.ms": "5000",

    // Topic naming
    "topic.prefix": "postgres-",

    // Schema evolution
    "schema.registry.url": "http://localhost:8081",
    "key.converter": "io.confluent.connect.avro.AvroConverter",
    "value.converter": "io.confluent.connect.avro.AvroConverter",

    // Transformations (SMT)
    "transforms": "addPrefix,maskPII",
    "transforms.addPrefix.type": "org.apache.kafka.connect.transforms.RegexRouter",
    "transforms.addPrefix.regex": ".*",
    "transforms.addPrefix.replacement": "source-$0",
    "transforms.maskPII.type": "org.apache.kafka.connect.transforms.MaskField$Value",
    "transforms.maskPII.fields": "ssn,credit_card"
  }
}

// Deploy connector via REST API
POST http://localhost:8083/connectors
Content-Type: application/json

// Sink Connector Example - Write to Elasticsearch
{
  "name": "elasticsearch-sink",
  "config": {
    "connector.class": "io.confluent.connect.elasticsearch.ElasticsearchSinkConnector",
    "tasks.max": "3",
    "topics": "orders,customers",
    "connection.url": "http://elasticsearch:9200",
    "type.name": "_doc",
    "key.ignore": "false",
    "schema.ignore": "false",
    "behavior.on.malformed.documents": "warn"
  }
}`
        },
        {
          name: 'Sink Connectors',
          explanation: 'Export data from Kafka to external systems. Write to databases, filesystems, data warehouses. Batch writes for efficiency. Exactly-once delivery with idempotent writes. Schema integration with Registry. Error handling and dead letter queues.',
          codeExample: `// Kafka Connect Sink Connector Configurations

// 1. JDBC Sink Connector - Write to PostgreSQL
{
  "name": "jdbc-sink-orders",
  "config": {
    "connector.class": "io.confluent.connect.jdbc.JdbcSinkConnector",
    "tasks.max": "3",
    "topics": "orders",
    "connection.url": "jdbc:postgresql://localhost:5432/warehouse",
    "connection.user": "dbuser",
    "connection.password": "dbpass",

    // Insert mode
    "insert.mode": "upsert",            // insert, update, or upsert
    "pk.mode": "record_key",            // Primary key from record key
    "pk.fields": "order_id",

    // Auto-create and evolve table schema
    "auto.create": true,
    "auto.evolve": true,

    // Batch for performance
    "batch.size": 3000,

    // Error handling with Dead Letter Queue
    "errors.tolerance": "all",
    "errors.deadletterqueue.topic.name": "dlq-jdbc-sink",
    "errors.deadletterqueue.topic.replication.factor": 3,
    "errors.deadletterqueue.context.headers.enable": true
  }
}

// 2. S3 Sink Connector - Write to AWS S3
{
  "name": "s3-sink-events",
  "config": {
    "connector.class": "io.confluent.connect.s3.S3SinkConnector",
    "tasks.max": "6",
    "topics": "events",
    "s3.bucket.name": "my-kafka-archive",
    "s3.region": "us-east-1",
    "flush.size": 10000,                 // Flush every 10K records
    "rotate.interval.ms": 600000,        // Or every 10 minutes
    "storage.class": "io.confluent.connect.s3.storage.S3Storage",
    "format.class": "io.confluent.connect.s3.format.parquet.ParquetFormat",
    "partitioner.class":
      "io.confluent.connect.storage.partitioner.TimeBasedPartitioner",
    "partition.duration.ms": 3600000,    // Hourly partitions
    "path.format": "'year'=YYYY/'month'=MM/'day'=dd/'hour'=HH",
    "locale": "en-US",
    "timezone": "UTC"
  }
}`
        },
        {
          name: 'Transform SMTs',
          explanation: 'Single Message Transforms modify messages in-flight. InsertField, ReplaceField, MaskField, Cast. Filter unwanted messages. Flatten nested structures. Chain multiple transformations. Lightweight processing without Streams. Declarative configuration.',
          codeExample: `// Single Message Transforms (SMT) Configuration
// SMTs modify records as they flow through Connect

{
  "name": "orders-connector",
  "config": {
    "connector.class": "io.confluent.connect.jdbc.JdbcSourceConnector",
    "topics": "raw-orders",

    // Chain multiple transforms (applied in order)
    "transforms": "insertTimestamp,maskPII,filterNull,rename,flatten",

    // 1. InsertField - Add processing timestamp
    "transforms.insertTimestamp.type":
      "org.apache.kafka.connect.transforms.InsertField$Value",
    "transforms.insertTimestamp.timestamp.field": "processed_at",

    // 2. MaskField - Mask sensitive data (PII)
    "transforms.maskPII.type":
      "org.apache.kafka.connect.transforms.MaskField$Value",
    "transforms.maskPII.fields": "ssn,credit_card,password",
    "transforms.maskPII.replacement": "****",

    // 3. Filter - Drop records with null values
    "transforms.filterNull.type":
      "org.apache.kafka.connect.transforms.Filter",
    "transforms.filterNull.condition": "value != null",

    // 4. ReplaceField - Rename and exclude fields
    "transforms.rename.type":
      "org.apache.kafka.connect.transforms.ReplaceField$Value",
    "transforms.rename.renames": "customer_name:name,customer_id:id",
    "transforms.rename.exclude": "internal_notes,debug_info",

    // 5. Flatten - Flatten nested JSON structures
    "transforms.flatten.type":
      "org.apache.kafka.connect.transforms.Flatten$Value",
    "transforms.flatten.delimiter": "_"
    // {"address": {"city": "NYC"}} -> {"address_city": "NYC"}
  }
}

// Other useful SMTs:
// Cast$Value       - Convert field types (e.g., string to int)
// TimestampRouter  - Route to topics based on timestamp
// RegexRouter      - Route to topics based on regex pattern
// HeaderFrom$Value - Copy fields to record headers
// ExtractField     - Extract single field from struct
// SetSchemaMetadata - Override schema name/version`
        },
        {
          name: 'Distributed Mode',
          explanation: 'Run Connect as a cluster for scalability. REST API for connector management. Automatic load balancing and failover. Share configuration in Kafka topics. Worker nodes execute tasks. Horizontal scaling for throughput. Centralized monitoring.',
          codeExample: `// Kafka Connect Distributed Mode Configuration
// connect-distributed.properties

// Cluster identification
group.id=connect-cluster
bootstrap.servers=kafka1:9092,kafka2:9092,kafka3:9092

// Internal topics for state storage
config.storage.topic=connect-configs
config.storage.replication.factor=3
offset.storage.topic=connect-offsets
offset.storage.replication.factor=3
offset.storage.partitions=25
status.storage.topic=connect-status
status.storage.replication.factor=3

// REST API settings
rest.port=8083
rest.advertised.host.name=connect-worker-1

// Converters
key.converter=org.apache.kafka.connect.storage.StringConverter
value.converter=io.confluent.connect.avro.AvroConverter
value.converter.schema.registry.url=http://localhost:8081

// REST API Operations (manage connectors):

// List all connectors
// GET http://localhost:8083/connectors

// Create a new connector
// POST http://localhost:8083/connectors
// Body: {"name": "my-connector", "config": {...}}

// Get connector status
// GET http://localhost:8083/connectors/my-connector/status

// Pause connector
// PUT http://localhost:8083/connectors/my-connector/pause

// Resume connector
// PUT http://localhost:8083/connectors/my-connector/resume

// Restart failed task
// POST http://localhost:8083/connectors/my-connector/tasks/0/restart

// Update connector config
// PUT http://localhost:8083/connectors/my-connector/config
// Body: {"connector.class": "...", "tasks.max": "5", ...}

// Delete connector
// DELETE http://localhost:8083/connectors/my-connector

// List installed connector plugins
// GET http://localhost:8083/connector-plugins`
        },
        {
          name: 'Schema Integration',
          explanation: 'Seamless Schema Registry integration. Automatic schema registration on ingest. Schema evolution handling. Avro/JSON converters. Schema-aware transformations. Type conversions between systems. Maintain schema compatibility across pipeline.',
          codeExample: `// Kafka Connect Schema Integration Configuration

// Connect worker with Schema Registry converters
// connect-distributed.properties:
key.converter=io.confluent.connect.avro.AvroConverter
key.converter.schema.registry.url=http://localhost:8081
value.converter=io.confluent.connect.avro.AvroConverter
value.converter.schema.registry.url=http://localhost:8081

// Connector with schema-aware pipeline
{
  "name": "schema-aware-pipeline",
  "config": {
    "connector.class": "io.confluent.connect.jdbc.JdbcSourceConnector",
    "connection.url": "jdbc:postgresql://localhost:5432/mydb",
    "table.whitelist": "customers",
    "mode": "timestamp+incrementing",
    "incrementing.column.name": "id",
    "timestamp.column.name": "updated_at",

    // Schema Registry integration
    "key.converter": "io.confluent.connect.avro.AvroConverter",
    "key.converter.schema.registry.url": "http://localhost:8081",
    "value.converter": "io.confluent.connect.avro.AvroConverter",
    "value.converter.schema.registry.url": "http://localhost:8081",

    // Schema evolution handling
    "value.converter.enhanced.avro.schema.support": true,
    "value.converter.connect.meta.data": false,

    // Auto-register schemas discovered from source
    "value.converter.auto.register.schemas": true,

    // Topic naming strategy for schema subjects
    "value.subject.name.strategy":
      "io.confluent.kafka.serializers.subject.TopicNameStrategy"
    // TopicNameStrategy: <topic>-value (default)
    // RecordNameStrategy: <record-name>
    // TopicRecordNameStrategy: <topic>-<record-name>
  }
}

// JSON Schema converter (human-readable alternative to Avro)
{
  "config": {
    "value.converter": "io.confluent.connect.json.JsonSchemaConverter",
    "value.converter.schema.registry.url": "http://localhost:8081"
  }
}

// Protobuf converter
{
  "config": {
    "value.converter": "io.confluent.connect.protobuf.ProtobufConverter",
    "value.converter.schema.registry.url": "http://localhost:8081"
  }
}`
        }
      ]
    },
    {
      id: 'monitoring',
      name: 'Monitoring & Operations',
      icon: '📊',
      color: '#6366f1',
      description: 'Operational monitoring with JMX metrics, lag tracking, health checks, and alerting',
      diagram: MonitoringDiagram,
      details: [
        {
          name: 'JMX Metrics',
          explanation: 'Java Management Extensions expose internal metrics. Producer/consumer/broker metrics. Throughput, latency, error rates. Request queue sizes. Network thread utilization. Export to Prometheus, Grafana, Datadog. Real-time operational visibility.',
          codeExample: `// JMX Metrics - Accessing Kafka Metrics Programmatically
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.common.Metric;
import org.apache.kafka.common.MetricName;

// Enable JMX on Kafka broker (set in kafka-server-start.sh)
// export KAFKA_JMX_OPTS="-Dcom.sun.management.jmxremote
//   -Dcom.sun.management.jmxremote.port=9999
//   -Dcom.sun.management.jmxremote.authenticate=false"

// Key Broker JMX Metrics:
// kafka.server:type=BrokerTopicMetrics,name=MessagesInPerSec
// kafka.server:type=BrokerTopicMetrics,name=BytesInPerSec
// kafka.server:type=BrokerTopicMetrics,name=BytesOutPerSec
// kafka.server:type=ReplicaManager,name=UnderReplicatedPartitions
// kafka.server:type=ReplicaManager,name=IsrShrinksPerSec
// kafka.network:type=RequestMetrics,name=RequestsPerSec,request=Produce
// kafka.controller:type=KafkaController,name=ActiveControllerCount

// Access metrics from Java client (producer/consumer)
KafkaProducer<String, String> producer = new KafkaProducer<>(props);

// After some sends, query metrics
Map<MetricName, ? extends Metric> metrics = producer.metrics();

for (Map.Entry<MetricName, ? extends Metric> entry : metrics.entrySet()) {
    MetricName name = entry.getKey();
    Metric metric = entry.getValue();

    // Filter for key producer metrics
    if (name.group().equals("producer-metrics")) {
        switch (name.name()) {
            case "record-send-rate":
                System.out.printf("Send rate: %.2f records/sec%n",
                    metric.metricValue());
                break;
            case "record-error-rate":
                System.out.printf("Error rate: %.2f errors/sec%n",
                    metric.metricValue());
                break;
            case "request-latency-avg":
                System.out.printf("Avg latency: %.2f ms%n",
                    metric.metricValue());
                break;
            case "batch-size-avg":
                System.out.printf("Avg batch size: %.0f bytes%n",
                    metric.metricValue());
                break;
            case "compression-rate-avg":
                System.out.printf("Compression ratio: %.2f%n",
                    metric.metricValue());
                break;
        }
    }
}

// Prometheus JMX Exporter (jmx_prometheus_javaagent)
// Add to broker startup:
// -javaagent:jmx_prometheus_javaagent.jar=7071:kafka_broker.yml`
        },
        {
          name: 'Lag Monitoring',
          explanation: 'Track consumer lag (messages behind). Current offset vs log end offset. Per-partition lag metrics. Consumer group lag API. Alert on excessive lag. Identifies slow consumers. Scale consumers or optimize processing. Critical for SLA compliance.',
          codeExample: `// Consumer Lag Monitoring with AdminClient
import org.apache.kafka.clients.admin.*;
import org.apache.kafka.clients.consumer.OffsetAndMetadata;
import org.apache.kafka.common.TopicPartition;

Properties props = new Properties();
props.put("bootstrap.servers", "localhost:9092");
AdminClient admin = AdminClient.create(props);

String groupId = "order-processing-group";

// 1. Get committed offsets for consumer group
Map<TopicPartition, OffsetAndMetadata> committedOffsets =
    admin.listConsumerGroupOffsets(groupId)
         .partitionsToOffsetAndMetadata()
         .get();

// 2. Get end offsets (latest offset per partition)
Set<TopicPartition> partitions = committedOffsets.keySet();
Map<TopicPartition, ListOffsetsResult.ListOffsetsResultInfo> endOffsets =
    admin.listOffsets(
        partitions.stream().collect(Collectors.toMap(
            tp -> tp,
            tp -> OffsetSpec.latest()
        ))
    ).all().get();

// 3. Calculate lag per partition
long totalLag = 0;
for (TopicPartition tp : partitions) {
    long committed = committedOffsets.get(tp).offset();
    long end = endOffsets.get(tp).offset();
    long lag = end - committed;
    totalLag += lag;

    System.out.printf("  %s-P%d: committed=%d, end=%d, lag=%d%n",
        tp.topic(), tp.partition(), committed, end, lag);
}
System.out.printf("Total lag: %d messages%n", totalLag);

// 4. List all consumer groups and their state
Collection<ConsumerGroupListing> groups =
    admin.listConsumerGroups().all().get();

for (ConsumerGroupListing group : groups) {
    ConsumerGroupDescription desc = admin.describeConsumerGroups(
        Collections.singleton(group.groupId())).all().get()
        .get(group.groupId());

    System.out.printf("Group: %s, State: %s, Members: %d%n",
        group.groupId(), desc.state(), desc.members().size());

    // List member assignments
    for (MemberDescription member : desc.members()) {
        System.out.printf("  Member: %s, Partitions: %s%n",
            member.consumerId(), member.assignment().topicPartitions());
    }
}

admin.close();

// CLI equivalent:
// kafka-consumer-groups.sh --bootstrap-server localhost:9092 \\
//   --group order-processing-group --describe`
        },
        {
          name: 'Broker Health',
          explanation: 'Monitor broker health and performance. Under-replicated partitions. Offline partitions. Leader election rate. Disk usage and I/O. Network saturation. ZooKeeper/KRaft health. Cluster controller status. Proactive issue detection.',
          codeExample: `// Broker Health Check with AdminClient
import org.apache.kafka.clients.admin.*;
import org.apache.kafka.common.Node;

Properties props = new Properties();
props.put("bootstrap.servers", "localhost:9092");
props.put("request.timeout.ms", 5000);  // Fast timeout for health checks
AdminClient admin = AdminClient.create(props);

// 1. Cluster health overview
DescribeClusterResult cluster = admin.describeCluster();
Node controller = cluster.controller().get();
Collection<Node> nodes = cluster.nodes().get();

System.out.println("=== Cluster Health ===");
System.out.println("Controller: Broker " + controller.id());
System.out.println("Brokers online: " + nodes.size());

for (Node node : nodes) {
    System.out.printf("  Broker %d: %s:%d%n",
        node.id(), node.host(), node.port());
}

// 2. Check for under-replicated and offline partitions
Map<String, TopicDescription> topics =
    admin.describeTopics(admin.listTopics().names().get()).allTopicNames().get();

int underReplicated = 0;
int offline = 0;

for (TopicDescription topic : topics.values()) {
    for (TopicPartitionInfo partition : topic.partitions()) {
        if (partition.isr().size() < partition.replicas().size()) {
            underReplicated++;
            System.out.printf("  UNDER-REPLICATED: %s-P%d (ISR: %d/%d)%n",
                topic.name(), partition.partition(),
                partition.isr().size(), partition.replicas().size());
        }
        if (partition.leader() == null) {
            offline++;
            System.out.printf("  OFFLINE: %s-P%d%n",
                topic.name(), partition.partition());
        }
    }
}

System.out.printf("Under-replicated partitions: %d%n", underReplicated);
System.out.printf("Offline partitions: %d%n", offline);

// 3. Check broker configs
ConfigResource broker0 = new ConfigResource(ConfigResource.Type.BROKER, "0");
Config config = admin.describeConfigs(Collections.singleton(broker0))
    .all().get().get(broker0);

// Key broker health configs
String[] healthConfigs = {
    "log.dirs", "num.io.threads", "num.network.threads",
    "num.replica.fetchers", "log.retention.hours"
};
for (String key : healthConfigs) {
    ConfigEntry entry = config.get(key);
    if (entry != null) {
        System.out.printf("  %s = %s%n", key, entry.value());
    }
}

admin.close();`
        },
        {
          name: 'Topic Analytics',
          explanation: 'Analyze topic-level metrics. Message rate and size distribution. Partition balance across brokers. Retention and compaction effectiveness. Producer/consumer distribution. Hot partitions. Storage usage trends. Capacity planning.',
          codeExample: `// Topic Analytics - Partition Distribution and Size Analysis
import org.apache.kafka.clients.admin.*;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.common.TopicPartition;

Properties adminProps = new Properties();
adminProps.put("bootstrap.servers", "localhost:9092");
AdminClient admin = AdminClient.create(adminProps);

// 1. List all topics with partition info
Map<String, TopicDescription> topics =
    admin.describeTopics(admin.listTopics().names().get())
         .allTopicNames().get();

for (TopicDescription topic : topics.values()) {
    System.out.printf("Topic: %s, Partitions: %d%n",
        topic.name(), topic.partitions().size());

    // Check leader distribution (detect hot brokers)
    Map<Integer, Integer> leaderCounts = new HashMap<>();
    for (TopicPartitionInfo p : topic.partitions()) {
        int leaderId = p.leader().id();
        leaderCounts.merge(leaderId, 1, Integer::sum);
    }
    System.out.println("  Leader distribution: " + leaderCounts);
}

// 2. Get partition sizes (beginning and end offsets)
Properties consumerProps = new Properties();
consumerProps.put("bootstrap.servers", "localhost:9092");
consumerProps.put("key.deserializer",
    "org.apache.kafka.common.serialization.StringDeserializer");
consumerProps.put("value.deserializer",
    "org.apache.kafka.common.serialization.StringDeserializer");

KafkaConsumer<String, String> consumer = new KafkaConsumer<>(consumerProps);

String topicName = "orders";
List<TopicPartition> partitions = consumer.partitionsFor(topicName).stream()
    .map(info -> new TopicPartition(topicName, info.partition()))
    .collect(Collectors.toList());

Map<TopicPartition, Long> beginOffsets = consumer.beginningOffsets(partitions);
Map<TopicPartition, Long> endOffsets = consumer.endOffsets(partitions);

long totalMessages = 0;
for (TopicPartition tp : partitions) {
    long begin = beginOffsets.get(tp);
    long end = endOffsets.get(tp);
    long messageCount = end - begin;
    totalMessages += messageCount;

    System.out.printf("  P%d: begin=%d, end=%d, messages=%d%n",
        tp.partition(), begin, end, messageCount);
}
System.out.printf("Total messages in topic: %d%n", totalMessages);

// 3. Get topic configuration
ConfigResource resource = new ConfigResource(ConfigResource.Type.TOPIC, topicName);
Config config = admin.describeConfigs(Collections.singleton(resource))
    .all().get().get(resource);

System.out.printf("Retention: %s ms, Cleanup: %s, Compression: %s%n",
    config.get("retention.ms").value(),
    config.get("cleanup.policy").value(),
    config.get("compression.type").value());

consumer.close();
admin.close();`
        },
        {
          name: 'Alert Management',
          explanation: 'Configure alerts for critical conditions. Under-replicated partitions. Consumer lag thresholds. Broker failures. Disk space warnings. Latency spikes. Integration with PagerDuty, Slack. Runbook automation. Incident response workflows.',
          codeExample: `// Kafka Health Monitor with Alerting
import org.apache.kafka.clients.admin.*;

public class KafkaHealthMonitor {
    private final AdminClient admin;
    private final long lagThreshold;
    private final AlertService alertService;

    public KafkaHealthMonitor(String bootstrapServers, long lagThreshold) {
        Properties props = new Properties();
        props.put("bootstrap.servers", bootstrapServers);
        this.admin = AdminClient.create(props);
        this.lagThreshold = lagThreshold;
        this.alertService = new AlertService();
    }

    // Run periodic health checks
    public void checkClusterHealth() {
        checkBrokerHealth();
        checkConsumerLag();
        checkPartitionHealth();
    }

    private void checkBrokerHealth() {
        try {
            Collection<Node> nodes = admin.describeCluster()
                .nodes().get(10, TimeUnit.SECONDS);
            int expectedBrokers = 3;

            if (nodes.size() < expectedBrokers) {
                alertService.sendAlert("CRITICAL",
                    String.format("Broker down! Expected %d, found %d",
                        expectedBrokers, nodes.size()));
            }
        } catch (Exception e) {
            alertService.sendAlert("CRITICAL",
                "Cannot connect to Kafka cluster: " + e.getMessage());
        }
    }

    private void checkConsumerLag() {
        try {
            Collection<ConsumerGroupListing> groups =
                admin.listConsumerGroups().all().get();

            for (ConsumerGroupListing group : groups) {
                Map<TopicPartition, OffsetAndMetadata> offsets =
                    admin.listConsumerGroupOffsets(group.groupId())
                         .partitionsToOffsetAndMetadata().get();

                // Calculate total lag
                long totalLag = calculateTotalLag(offsets);

                if (totalLag > lagThreshold) {
                    alertService.sendAlert("WARNING",
                        String.format("Consumer lag high! Group: %s, Lag: %d",
                            group.groupId(), totalLag));
                }
            }
        } catch (Exception e) {
            alertService.sendAlert("ERROR",
                "Lag check failed: " + e.getMessage());
        }
    }

    private void checkPartitionHealth() {
        try {
            Map<String, TopicDescription> topics = admin.describeTopics(
                admin.listTopics().names().get()).allTopicNames().get();

            for (TopicDescription topic : topics.values()) {
                for (TopicPartitionInfo p : topic.partitions()) {
                    if (p.leader() == null) {
                        alertService.sendAlert("CRITICAL",
                            topic.name() + "-P" + p.partition() + " OFFLINE");
                    }
                    if (p.isr().size() < p.replicas().size()) {
                        alertService.sendAlert("WARNING",
                            topic.name() + "-P" + p.partition() +
                            " under-replicated");
                    }
                }
            }
        } catch (Exception e) {
            alertService.sendAlert("ERROR", "Health check error: " + e.getMessage());
        }
    }
}

// Schedule: run every 30 seconds
ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
KafkaHealthMonitor monitor = new KafkaHealthMonitor("localhost:9092", 10000);
scheduler.scheduleAtFixedRate(monitor::checkClusterHealth, 0, 30, TimeUnit.SECONDS);`
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
      { name: 'Messaging', icon: '📨', page: 'Messaging' },
      { name: 'Apache Kafka', icon: '📤', page: 'Apache Kafka' }
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
      setSelectedConceptIndex(null)  // Close modal, stay on Kafka page
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
    background: 'linear-gradient(135deg, #0f172a 0%, #831843 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #f43f5e, #ec4899)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(244, 63, 94, 0.2)',
    border: '1px solid rgba(244, 63, 94, 0.3)',
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
        <h1 style={titleStyle}>Apache Kafka</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(244, 63, 94, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(244, 63, 94, 0.2)'
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
          colors={KAFKA_COLORS}
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
        primaryColor={KAFKA_COLORS.primary}
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
              colors={KAFKA_COLORS}
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

export default ApacheKafka
