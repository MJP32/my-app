import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

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
          explanation: 'Batch messages together for efficiency. Configure batch.size (32KB-64KB) and linger.ms (wait time). Compression reduces network bandwidth: snappy (fast), gzip (high compression), lz4, zstd. Buffer memory controls producer memory usage. Dramatically improves throughput for high-volume workloads.'
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
          explanation: 'Automatic retry on transient failures. Configure retries count and retry backoff. Delivery timeout for total send time. Enable idempotence to avoid duplicates on retry. Handle permanent vs transient errors differently. Exponential backoff prevents overwhelming brokers.'
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
          explanation: 'Convert objects to bytes for transmission. Built-in: String, Integer, ByteArray serializers. Custom serializers for complex types. Avro/Protobuf for schema evolution. Serialize keys and values independently. Handle serialization errors gracefully.'
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
          explanation: 'Multiple brokers form a cluster managed by ZooKeeper or KRaft. Each broker handles subset of partitions. Load distribution and fault tolerance. Horizontal scaling by adding brokers. Bootstrap servers for client connections. Controller broker manages cluster metadata.'
        },
        {
          name: 'Topic Partitions',
          explanation: 'Topics divided into partitions for parallelism. Each partition is ordered log of messages. Partition count determines max consumer parallelism. Choose partition count based on throughput needs. Cannot easily change partition count later. Messages within partition maintain order.'
        },
        {
          name: 'Replication Factor',
          explanation: 'Each partition replicated across multiple brokers. Replication factor (RF) = number of copies. RF=3 typical for production. Leader handles reads/writes, followers replicate. In-sync replicas (ISR) track healthy replicas. Survives broker failures up to RF-1.'
        },
        {
          name: 'Leader Election',
          explanation: 'One replica elected as partition leader. Leader handles all client requests. Followers fetch from leader to stay in sync. Automatic failover when leader fails. New leader elected from ISR. Unclean leader election trades data loss for availability.'
        },
        {
          name: 'Log Compaction',
          explanation: 'Retain only latest value per key. Background compaction process. Useful for state snapshots and changelog topics. Compacted topics serve as durable key-value stores. Cleanup policy: delete or compact. Preserves at least one value per key.'
        },
        {
          name: 'Retention Policies',
          explanation: 'Control how long messages are stored. Time-based: retention.ms (default 7 days). Size-based: retention.bytes per partition. Whichever limit reached first triggers deletion. Segment files enable efficient deletion. Infinite retention for critical data.'
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
          explanation: 'Offset tracks consumer position in partition. Commit offset to mark messages as processed. Stored in __consumer_offsets topic. Committed offset survives consumer restart. Seek to specific offset for replay. Latest vs earliest offset strategies.'
        },
        {
          name: 'Parallel Processing',
          explanation: 'Each consumer in group processes different partitions. Partition assignment strategies: range, round-robin, sticky, cooperative. Process messages in parallel across consumers. Single-threaded per consumer for simplicity. Scale processing by adding consumers.'
        },
        {
          name: 'Auto-commit',
          explanation: 'Automatically commit offsets periodically. enable.auto.commit=true with auto.commit.interval.ms. Simple but risks duplicate or lost messages. Commits happen in background during poll(). Trade convenience for at-least-once semantics. Good for non-critical workloads.'
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
          explanation: 'Redistribute partitions when consumers join/leave. Cooperative rebalancing avoids stop-the-world pauses. RebalanceListener hooks for cleanup/initialization. Save state before rebalance, restore after. Rebalance triggered by heartbeat failure or session timeout. Static membership reduces rebalances.'
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
          explanation: 'Join streams with streams or tables. Inner, left, outer join semantics. Co-partitioned topics for join performance. Windowed joins for bounded state. Aggregations: count, sum, reduce. GroupBy for key changes. KTable for table semantics.'
        },
        {
          name: 'Exactly-Once Semantics',
          explanation: 'End-to-end exactly-once processing with transactions. processing.guarantee=exactly_once_v2. Atomic writes across multiple partitions. Transaction markers in log. Idempotent producers prevent duplicates. Read committed isolation level. Performance overhead vs at-least-once.'
        },
        {
          name: 'Interactive Queries',
          explanation: 'Query state stores from external applications. REST API for state access. ReadOnlyKeyValueStore interface. Distributed queries across application instances. Metadata for routing queries to correct instance. Real-time materialized views.'
        },
        {
          name: 'Topology Optimization',
          explanation: 'Optimize stream processing DAG. Reduce repartition operations. Co-locate related operations. Named topologies for modular code. Describe topology for debugging. Tune parallelism with thread count. Monitor lag and processing rate.'
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
          explanation: 'Avro for compact binary serialization. JSON Schema for human-readable format. Protobuf support available. Schema ID embedded in message. Registry stores schemas centrally. Automatic serializer/deserializer generation. Type safety and documentation.'
        },
        {
          name: 'Compatibility Checks',
          explanation: 'Enforce compatibility rules before registration. BACKWARD: new schema reads old data. FORWARD: old schema reads new data. FULL: both directions. NONE: no checks. Subject-level or global settings. Reject incompatible schemas.'
        },
        {
          name: 'Version Management',
          explanation: 'Every schema change creates new version. Immutable versions prevent conflicts. List all versions for a subject. Fetch schema by version or ID. Rollback to previous version. Soft delete with option to permanently delete.'
        },
        {
          name: 'Schema Validation',
          explanation: 'Validate messages against registered schemas. Serialization fails for invalid data. Deserialization with schema ID lookup. Client-side caching for performance. Fail-fast on schema errors. Integration with Connect and Streams.'
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
          explanation: 'Export data from Kafka to external systems. Write to databases, filesystems, data warehouses. Batch writes for efficiency. Exactly-once delivery with idempotent writes. Schema integration with Registry. Error handling and dead letter queues.'
        },
        {
          name: 'Transform SMTs',
          explanation: 'Single Message Transforms modify messages in-flight. InsertField, ReplaceField, MaskField, Cast. Filter unwanted messages. Flatten nested structures. Chain multiple transformations. Lightweight processing without Streams. Declarative configuration.'
        },
        {
          name: 'Distributed Mode',
          explanation: 'Run Connect as a cluster for scalability. REST API for connector management. Automatic load balancing and failover. Share configuration in Kafka topics. Worker nodes execute tasks. Horizontal scaling for throughput. Centralized monitoring.'
        },
        {
          name: 'Schema Integration',
          explanation: 'Seamless Schema Registry integration. Automatic schema registration on ingest. Schema evolution handling. Avro/JSON converters. Schema-aware transformations. Type conversions between systems. Maintain schema compatibility across pipeline.'
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
          explanation: 'Java Management Extensions expose internal metrics. Producer/consumer/broker metrics. Throughput, latency, error rates. Request queue sizes. Network thread utilization. Export to Prometheus, Grafana, Datadog. Real-time operational visibility.'
        },
        {
          name: 'Lag Monitoring',
          explanation: 'Track consumer lag (messages behind). Current offset vs log end offset. Per-partition lag metrics. Consumer group lag API. Alert on excessive lag. Identifies slow consumers. Scale consumers or optimize processing. Critical for SLA compliance.'
        },
        {
          name: 'Broker Health',
          explanation: 'Monitor broker health and performance. Under-replicated partitions. Offline partitions. Leader election rate. Disk usage and I/O. Network saturation. ZooKeeper/KRaft health. Cluster controller status. Proactive issue detection.'
        },
        {
          name: 'Topic Analytics',
          explanation: 'Analyze topic-level metrics. Message rate and size distribution. Partition balance across brokers. Retention and compaction effectiveness. Producer/consumer distribution. Hot partitions. Storage usage trends. Capacity planning.'
        },
        {
          name: 'Alert Management',
          explanation: 'Configure alerts for critical conditions. Under-replicated partitions. Consumer lag thresholds. Broker failures. Disk space warnings. Latency spikes. Integration with PagerDuty, Slack. Runbook automation. Incident response workflows.'
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
          onMainMenu={breadcrumb?.onMainMenu}
          colors={KAFKA_COLORS}
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
