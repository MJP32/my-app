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

// MongoDB Document Model Diagram
const MongoDBDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">MongoDB Document Model</text>
    <rect x="50" y="45" width="200" height="110" rx="6" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="2"/>
    <text x="150" y="65" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">Document (BSON)</text>
    <text x="70" y="85" fill="#4ade80" fontSize="8">{"{"} _id: ObjectId(...),</text>
    <text x="70" y="100" fill="#4ade80" fontSize="8">  name: "John",</text>
    <text x="70" y="115" fill="#4ade80" fontSize="8">  address: {"{"} city: "NYC" {"}"},</text>
    <text x="70" y="130" fill="#4ade80" fontSize="8">  orders: [ ... ]</text>
    <text x="70" y="145" fill="#4ade80" fontSize="8">{"}"}</text>
    <rect x="280" y="45" width="150" height="50" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="355" y="70" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Collection</text>
    <text x="355" y="85" textAnchor="middle" fill="#c4b5fd" fontSize="7">Group of Documents</text>
    <rect x="280" y="105" width="150" height="50" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="355" y="130" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Database</text>
    <text x="355" y="145" textAnchor="middle" fill="#fcd34d" fontSize="7">Group of Collections</text>
    <rect x="460" y="45" width="190" height="110" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="555" y="65" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Aggregation Pipeline</text>
    <text x="480" y="85" fill="#93c5fd" fontSize="8">$match → filter</text>
    <text x="480" y="100" fill="#93c5fd" fontSize="8">$group → aggregate</text>
    <text x="480" y="115" fill="#93c5fd" fontSize="8">$project → reshape</text>
    <text x="480" y="130" fill="#93c5fd" fontSize="8">$lookup → join</text>
    <text x="480" y="145" fill="#93c5fd" fontSize="8">$sort → order</text>
    <text x="350" y="172" textAnchor="middle" fill="#64748b" fontSize="9">Flexible schema • Embedded documents • Horizontal scaling</text>
  </svg>
)

// Cassandra Ring Architecture Diagram
const CassandraDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Cassandra Ring Architecture</text>
    <circle cx="200" cy="100" r="60" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="5"/>
    <circle cx="200" cy="40" r="15" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="200" y="44" textAnchor="middle" fill="white" fontSize="8">N1</text>
    <circle cx="260" cy="100" r="15" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="260" y="104" textAnchor="middle" fill="white" fontSize="8">N2</text>
    <circle cx="200" cy="160" r="15" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="200" y="164" textAnchor="middle" fill="white" fontSize="8">N3</text>
    <circle cx="140" cy="100" r="15" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="140" y="104" textAnchor="middle" fill="white" fontSize="8">N4</text>
    <rect x="320" y="40" width="160" height="55" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="400" y="60" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Consistent Hashing</text>
    <text x="400" y="78" textAnchor="middle" fill="#fcd34d" fontSize="8">Token ranges per node</text>
    <text x="400" y="90" textAnchor="middle" fill="#fcd34d" fontSize="7">Automatic rebalancing</text>
    <rect x="320" y="105" width="160" height="55" rx="6" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="2"/>
    <text x="400" y="125" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Tunable Consistency</text>
    <text x="400" y="143" textAnchor="middle" fill="#86efac" fontSize="8">ONE / QUORUM / ALL</text>
    <text x="400" y="155" textAnchor="middle" fill="#86efac" fontSize="7">Per-operation control</text>
    <rect x="510" y="40" width="160" height="120" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="590" y="60" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">Column Family</text>
    <text x="530" y="80" fill="#fca5a5" fontSize="7">Row Key: user123</text>
    <text x="530" y="95" fill="#fca5a5" fontSize="7">├─ name: "Alice"</text>
    <text x="530" y="110" fill="#fca5a5" fontSize="7">├─ email: "a@b.c"</text>
    <text x="530" y="125" fill="#fca5a5" fontSize="7">└─ created: ts</text>
    <text x="590" y="150" textAnchor="middle" fill="#fca5a5" fontSize="7">Dynamic columns</text>
    <text x="350" y="172" textAnchor="middle" fill="#64748b" fontSize="9">Masterless • Linear scalability • Write-optimized</text>
  </svg>
)

// Redis In-Memory Diagram
const RedisDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Redis In-Memory Architecture</text>
    <rect x="50" y="50" width="120" height="70" rx="6" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <text x="110" y="75" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">RAM</text>
    <text x="110" y="95" textAnchor="middle" fill="#fca5a5" fontSize="8">μs latency</text>
    <text x="110" y="110" textAnchor="middle" fill="#fca5a5" fontSize="7">All data in memory</text>
    <rect x="200" y="50" width="200" height="70" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="300" y="70" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Data Structures</text>
    <text x="220" y="90" fill="#fcd34d" fontSize="7">String • Hash • List</text>
    <text x="220" y="105" fill="#fcd34d" fontSize="7">Set • Sorted Set • Stream</text>
    <rect x="430" y="50" width="120" height="70" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="490" y="75" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Persistence</text>
    <text x="490" y="95" textAnchor="middle" fill="#93c5fd" fontSize="8">RDB / AOF</text>
    <text x="490" y="110" textAnchor="middle" fill="#93c5fd" fontSize="7">Optional disk</text>
    <rect x="580" y="50" width="90" height="70" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="625" y="75" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Cluster</text>
    <text x="625" y="95" textAnchor="middle" fill="#c4b5fd" fontSize="8">Sharding</text>
    <text x="625" y="110" textAnchor="middle" fill="#c4b5fd" fontSize="7">Sentinel HA</text>
    <line x1="170" y1="85" x2="195" y2="85" stroke="#4ade80" strokeWidth="2"/>
    <line x1="400" y1="85" x2="425" y2="85" stroke="#4ade80" strokeWidth="2"/>
    <line x1="550" y1="85" x2="575" y2="85" stroke="#4ade80" strokeWidth="2"/>
    <text x="350" y="145" textAnchor="middle" fill="#64748b" fontSize="9">Sub-millisecond • Atomic operations • Pub/Sub messaging</text>
  </svg>
)

// DynamoDB Diagram
const DynamoDBDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Amazon DynamoDB Architecture</text>
    <rect x="50" y="45" width="180" height="80" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="140" y="65" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Table Structure</text>
    <text x="70" y="85" fill="#fcd34d" fontSize="8">Partition Key (PK)</text>
    <text x="70" y="100" fill="#fcd34d" fontSize="8">+ Sort Key (SK)</text>
    <text x="70" y="115" fill="#fcd34d" fontSize="8">= Primary Key</text>
    <rect x="260" y="45" width="180" height="80" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="350" y="65" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Capacity Modes</text>
    <text x="280" y="85" fill="#93c5fd" fontSize="8">Provisioned: Fixed RCU/WCU</text>
    <text x="280" y="100" fill="#93c5fd" fontSize="8">On-Demand: Pay-per-request</text>
    <text x="280" y="115" fill="#93c5fd" fontSize="8">Auto-scaling available</text>
    <rect x="470" y="45" width="180" height="80" rx="6" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="2"/>
    <text x="560" y="65" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Global Tables</text>
    <text x="490" y="85" fill="#86efac" fontSize="8">Multi-region replication</text>
    <text x="490" y="100" fill="#86efac" fontSize="8">Active-active writes</text>
    <text x="490" y="115" fill="#86efac" fontSize="8">Single-digit ms latency</text>
    <rect x="150" y="135" width="400" height="30" rx="4" fill="rgba(139, 92, 246, 0.15)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="350" y="155" textAnchor="middle" fill="#a78bfa" fontSize="9">DynamoDB Streams → Lambda triggers → Event-driven architecture</text>
    <text x="350" y="175" textAnchor="middle" fill="#64748b" fontSize="9">Fully managed • Serverless • Automatic scaling • GSI/LSI indexes</text>
  </svg>
)

// Document Store Diagram
const DocumentStoreDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Document Store Model</text>
    <rect x="50" y="45" width="180" height="90" rx="6" fill="rgba(6, 182, 212, 0.2)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="140" y="65" textAnchor="middle" fill="#22d3ee" fontSize="10" fontWeight="bold">JSON/BSON Document</text>
    <text x="70" y="85" fill="#67e8f9" fontSize="8">{"{"} id: 1,</text>
    <text x="70" y="98" fill="#67e8f9" fontSize="8">  nested: {"{"} ... {"}"},</text>
    <text x="70" y="111" fill="#67e8f9" fontSize="8">  array: [ ... ]</text>
    <text x="70" y="124" fill="#67e8f9" fontSize="8">{"}"}</text>
    <rect x="260" y="45" width="180" height="90" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="350" y="65" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Schema Flexibility</text>
    <text x="280" y="85" fill="#fcd34d" fontSize="8">• No predefined schema</text>
    <text x="280" y="100" fill="#fcd34d" fontSize="8">• Fields vary per doc</text>
    <text x="280" y="115" fill="#fcd34d" fontSize="8">• Easy migrations</text>
    <text x="280" y="130" fill="#fcd34d" fontSize="8">• Rapid development</text>
    <rect x="470" y="45" width="180" height="90" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="560" y="65" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Query Capabilities</text>
    <text x="490" y="85" fill="#c4b5fd" fontSize="8">• Rich query language</text>
    <text x="490" y="100" fill="#c4b5fd" fontSize="8">• Filter nested fields</text>
    <text x="490" y="115" fill="#c4b5fd" fontSize="8">• Aggregation support</text>
    <text x="490" y="130" fill="#c4b5fd" fontSize="8">• Index optimization</text>
    <text x="350" y="152" textAnchor="middle" fill="#64748b" fontSize="9">Self-contained documents • Natural object mapping • Embedded relationships</text>
  </svg>
)

// Key-Value Store Diagram
const KeyValueDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Key-Value Store Model</text>
    <rect x="50" y="50" width="200" height="80" rx="6" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899" strokeWidth="2"/>
    <text x="150" y="72" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold">Simple Model</text>
    <text x="70" y="95" fill="#f9a8d4" fontSize="9">Key → Value</text>
    <text x="70" y="112" fill="#f9a8d4" fontSize="8">"user:123" → {"{"} ... {"}"}</text>
    <rect x="280" y="50" width="200" height="80" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="380" y="72" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Operations</text>
    <text x="300" y="92" fill="#86efac" fontSize="9">PUT(key, value)</text>
    <text x="300" y="107" fill="#86efac" fontSize="9">GET(key) → value</text>
    <text x="300" y="122" fill="#86efac" fontSize="9">DELETE(key)</text>
    <rect x="510" y="50" width="140" height="80" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="580" y="72" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Use Cases</text>
    <text x="530" y="92" fill="#93c5fd" fontSize="8">• Caching</text>
    <text x="530" y="107" fill="#93c5fd" fontSize="8">• Sessions</text>
    <text x="530" y="122" fill="#93c5fd" fontSize="8">• Counters</text>
    <text x="350" y="148" textAnchor="middle" fill="#64748b" fontSize="9">O(1) lookups • Maximum throughput • Horizontal scaling via consistent hashing</text>
  </svg>
)

// Column-Family Diagram
const ColumnFamilyDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Column-Family Database Model</text>
    <rect x="50" y="45" width="280" height="100" rx="6" fill="rgba(99, 102, 241, 0.2)" stroke="#6366f1" strokeWidth="2"/>
    <text x="190" y="65" textAnchor="middle" fill="#818cf8" fontSize="10" fontWeight="bold">Wide Column Structure</text>
    <line x1="70" y1="80" x2="310" y2="80" stroke="#6366f1" strokeWidth="1"/>
    <text x="80" y="95" fill="#a5b4fc" fontSize="8" fontWeight="bold">Row</text>
    <text x="130" y="95" fill="#a5b4fc" fontSize="8">Col1</text>
    <text x="180" y="95" fill="#a5b4fc" fontSize="8">Col2</text>
    <text x="230" y="95" fill="#a5b4fc" fontSize="8">Col3</text>
    <text x="280" y="95" fill="#a5b4fc" fontSize="8">...</text>
    <line x1="70" y1="102" x2="310" y2="102" stroke="#6366f1" strokeWidth="1"/>
    <text x="80" y="117" fill="#c7d2fe" fontSize="8">r1</text>
    <text x="130" y="117" fill="#c7d2fe" fontSize="8">v1</text>
    <text x="180" y="117" fill="#c7d2fe" fontSize="8">v2</text>
    <text x="230" y="117" fill="#c7d2fe" fontSize="8">-</text>
    <text x="80" y="132" fill="#c7d2fe" fontSize="8">r2</text>
    <text x="130" y="132" fill="#c7d2fe" fontSize="8">-</text>
    <text x="180" y="132" fill="#c7d2fe" fontSize="8">v3</text>
    <text x="230" y="132" fill="#c7d2fe" fontSize="8">v4</text>
    <rect x="360" y="45" width="150" height="50" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="435" y="70" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Column Families</text>
    <text x="435" y="85" textAnchor="middle" fill="#fcd34d" fontSize="7">Group related columns</text>
    <rect x="360" y="105" width="150" height="40" rx="6" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="2"/>
    <text x="435" y="125" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Versioning</text>
    <text x="435" y="140" textAnchor="middle" fill="#86efac" fontSize="7">Timestamps per cell</text>
    <rect x="540" y="45" width="130" height="100" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="605" y="65" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">Benefits</text>
    <text x="555" y="85" fill="#fca5a5" fontSize="7">• Sparse data</text>
    <text x="555" y="100" fill="#fca5a5" fontSize="7">• Compression</text>
    <text x="555" y="115" fill="#fca5a5" fontSize="7">• Analytics</text>
    <text x="555" y="130" fill="#fca5a5" fontSize="7">• Time-series</text>
    <text x="350" y="165" textAnchor="middle" fill="#64748b" fontSize="9">HBase • Bigtable • Cassandra • Optimized for write-heavy analytics</text>
  </svg>
)

// Graph Database Diagram
const GraphDatabaseDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Graph Database Model</text>
    <circle cx="100" cy="90" r="25" fill="rgba(20, 184, 166, 0.3)" stroke="#14b8a6" strokeWidth="2"/>
    <text x="100" y="95" textAnchor="middle" fill="#2dd4bf" fontSize="9">User</text>
    <circle cx="220" cy="60" r="25" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="220" y="65" textAnchor="middle" fill="#60a5fa" fontSize="9">Product</text>
    <circle cx="220" cy="130" r="25" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="220" y="135" textAnchor="middle" fill="#a78bfa" fontSize="9">Order</text>
    <line x1="125" y1="80" x2="195" y2="65" stroke="#4ade80" strokeWidth="2"/>
    <text x="155" y="62" fill="#4ade80" fontSize="7">VIEWED</text>
    <line x1="125" y1="100" x2="195" y2="120" stroke="#f59e0b" strokeWidth="2"/>
    <text x="155" y="125" fill="#fbbf24" fontSize="7">PLACED</text>
    <line x1="220" y1="85" x2="220" y2="105" stroke="#ec4899" strokeWidth="2"/>
    <text x="235" y="98" fill="#f472b6" fontSize="7">CONTAINS</text>
    <rect x="300" y="45" width="170" height="90" rx="6" fill="rgba(20, 184, 166, 0.15)" stroke="#14b8a6" strokeWidth="1"/>
    <text x="385" y="65" textAnchor="middle" fill="#2dd4bf" fontSize="9" fontWeight="bold">Graph Elements</text>
    <text x="320" y="85" fill="#5eead4" fontSize="8">Nodes: Entities</text>
    <text x="320" y="100" fill="#5eead4" fontSize="8">Edges: Relationships</text>
    <text x="320" y="115" fill="#5eead4" fontSize="8">Properties: Attributes</text>
    <text x="320" y="130" fill="#5eead4" fontSize="8">Labels: Types</text>
    <rect x="500" y="45" width="170" height="90" rx="6" fill="rgba(236, 72, 153, 0.15)" stroke="#ec4899" strokeWidth="1"/>
    <text x="585" y="65" textAnchor="middle" fill="#f472b6" fontSize="9" fontWeight="bold">Use Cases</text>
    <text x="520" y="85" fill="#f9a8d4" fontSize="8">• Social networks</text>
    <text x="520" y="100" fill="#f9a8d4" fontSize="8">• Recommendations</text>
    <text x="520" y="115" fill="#f9a8d4" fontSize="8">• Fraud detection</text>
    <text x="520" y="130" fill="#f9a8d4" fontSize="8">• Knowledge graphs</text>
    <text x="350" y="165" textAnchor="middle" fill="#64748b" fontSize="9">Neo4j • Neptune • Cypher/Gremlin • O(1) traversals</text>
  </svg>
)

// Syntax highlighter for NoSQL code examples (MongoDB shell, Java drivers, Redis, CQL)
const SyntaxHighlighter = ({ code }) => {
  const highlightCode = (code) => {
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    const protectedContent = []
    let placeholder = 0

    highlighted = highlighted.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/|#.*$)/gm, (match) => {
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
      .replace(/\b(db|use|find|insert|update|delete|aggregate|createIndex|createCollection|drop|sort|limit|skip|count|distinct|lookup|unwind|match|group|project|set|push|pull|addToSet|inc|put|get|scan|query|batch|execute|connect|close|create|new|return|var|let|const|if|else|for|while|function|class|public|private|static|void|import|try|catch|finally|throw|this|null|true|false)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(String|Map|List|HashMap|ArrayList|Document|MongoClient|MongoDatabase|MongoCollection|BasicDBObject|Table|Item|DynamoDB|Jedis|RedisTemplate|Session|Cluster|ResultSet)\b/g, '<span style="color: #4ec9b0;">$1</span>')
      .replace(/(@\w+)/g, '<span style="color: #dcdcaa;">$1</span>')
      .replace(/\b(\d+\.?\d*)\b/g, '<span style="color: #b5cea8;">$1</span>')
      .replace(/(\$\w+)/g, '<span style="color: #569cd6;">$1</span>')

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

function NoSQL({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'mongodb',
      name: 'MongoDB',
      icon: '🍃',
      color: '#10b981',
      description: 'Leading document database with flexible schema and powerful aggregation',
      diagram: MongoDBDiagram,
      details: [
        {
          name: 'Document Database',
          explanation: 'MongoDB stores data as flexible JSON-like BSON documents. Schema-less design allows dynamic fields per document, perfect for evolving data structures. Documents can contain nested arrays and objects for hierarchical data. Natural mapping to programming language objects.',
          codeExample: `// Insert a document with nested structure
db.users.insertOne({
  name: "Alice Johnson",
  email: "alice@example.com",
  address: {
    city: "New York",
    zip: "10001"
  },
  orders: [
    { product: "Laptop", price: 999.99 },
    { product: "Mouse", price: 29.99 }
  ]
})

// Query with nested field filter
db.users.find({ "address.city": "New York" })

// Update nested field
db.users.updateOne(
  { email: "alice@example.com" },
  { $set: { "address.zip": "10002" } }
)`
        },
        {
          name: 'Aggregation Framework',
          explanation: 'Powerful pipeline-based data processing with stages like $match, $group, $project, $sort, and $lookup. Perform complex transformations and analytics directly in the database. MapReduce alternative with better performance. Support for joins via $lookup stage.',
          codeExample: `// Aggregation pipeline: sales report by category
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $unwind: "$items" },
  { $group: {
      _id: "$items.category",
      totalRevenue: { $sum: "$items.price" },
      count: { $sum: 1 }
  }},
  { $sort: { totalRevenue: -1 } },
  { $limit: 10 },
  { $project: {
      category: "$_id",
      totalRevenue: 1,
      count: 1,
      _id: 0
  }}
])

// $lookup for joining collections
db.orders.aggregate([
  { $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "customer"
  }}
])`
        },
        {
          name: 'Indexing Strategies',
          explanation: 'Support for single field, compound, multikey, text, geospatial, and hashed indexes. Index intersection for using multiple indexes in queries. Partial indexes for subset of documents. Covered queries serve entirely from index. Critical for query performance.',
          codeExample: `// Single field index
db.users.createIndex({ email: 1 }, { unique: true })

// Compound index (order matters for queries)
db.orders.createIndex({ userId: 1, createdAt: -1 })

// Text index for full-text search
db.articles.createIndex({ title: "text", body: "text" })
db.articles.find({ $text: { $search: "mongodb" } })

// Partial index - only index active users
db.users.createIndex(
  { email: 1 },
  { partialFilterExpression: { status: "active" } }
)

// Check index usage with explain
db.users.find({ email: "a@b.com" }).explain("executionStats")`
        },
        {
          name: 'Replication',
          explanation: 'Replica sets provide high availability with automatic failover. Primary handles writes, secondaries replicate data. Automatic election of new primary on failure. Read preference options for distributing load. Ensures data durability and availability.',
          codeExample: `// Initialize a replica set (mongosh)
rs.initiate({
  _id: "myReplicaSet",
  members: [
    { _id: 0, host: "mongo1:27017" },
    { _id: 1, host: "mongo2:27017" },
    { _id: 2, host: "mongo3:27017" }
  ]
})

// Check replica set status
rs.status()

// Read from secondary (Java driver)
MongoClient client = MongoClients.create(
  "mongodb://mongo1,mongo2,mongo3/?replicaSet=myReplicaSet"
);
MongoCollection<Document> col = client
  .getDatabase("mydb")
  .getCollection("users")
  .withReadPreference(ReadPreference.secondaryPreferred());`
        },
        {
          name: 'Sharding',
          explanation: 'Horizontal scaling through data distribution across shards. Shard key determines data distribution. Range-based or hash-based sharding strategies. Automatic balancing of data. Handles massive datasets and high throughput workloads.'
        },
        {
          name: 'ACID Transactions',
          explanation: 'Multi-document ACID transactions since MongoDB 4.0. Snapshot isolation level. Transactions work across shards and replica sets. Provides consistency guarantees when needed. Balance between NoSQL flexibility and SQL guarantees.'
        }
      ]
    },
    {
      id: 'cassandra',
      name: 'Apache Cassandra',
      icon: '💎',
      color: '#8b5cf6',
      description: 'Highly scalable column-family database with masterless architecture',
      diagram: CassandraDiagram,
      details: [
        {
          name: 'Column-Family Store',
          explanation: 'Wide-column store organizing data into column families. Rows can have varying columns. Optimized for write-heavy workloads. Columns grouped by access patterns. Inspired by Google Bigtable design for massive scale.',
          codeExample: `-- Create a keyspace with replication
CREATE KEYSPACE ecommerce
  WITH replication = {
    'class': 'NetworkTopologyStrategy',
    'dc1': 3, 'dc2': 2
  };

USE ecommerce;

-- Create a table (column family)
CREATE TABLE users (
  user_id UUID PRIMARY KEY,
  name TEXT,
  email TEXT,
  created_at TIMESTAMP
);

-- Insert a row
INSERT INTO users (user_id, name, email, created_at)
VALUES (uuid(), 'Alice', 'alice@co.com', toTimestamp(now()));`
        },
        {
          name: 'Ring Architecture',
          explanation: 'Peer-to-peer distributed system with no single point of failure. Data distributed via consistent hashing across a ring topology. Every node is identical in responsibilities. Gossip protocol for cluster communication. Enables linear scalability.',
          codeExample: `-- Check cluster ring status
nodetool status

-- View token ownership
nodetool ring

-- Java driver: connect to cluster
Cluster cluster = Cluster.builder()
    .addContactPoints("node1", "node2", "node3")
    .withLoadBalancingPolicy(
        DCAwareRoundRobinPolicy.builder()
            .withLocalDc("dc1")
            .build()
    )
    .build();
Session session = cluster.connect("ecommerce");

-- Decommission a node gracefully
nodetool decommission`
        },
        {
          name: 'Tunable Consistency',
          explanation: 'Configurable consistency levels from ONE to ALL. Quorum reads/writes balance consistency and availability. Choose per-operation consistency level. CAP theorem trade-offs controlled by application. Eventual consistency by default for maximum availability.',
          codeExample: `-- CQL: set consistency per query
CONSISTENCY QUORUM;
SELECT * FROM users WHERE user_id = ?;

-- Java driver: per-statement consistency
Statement stmt = new SimpleStatement(
    "SELECT * FROM users WHERE user_id = ?", userId
).setConsistencyLevel(ConsistencyLevel.QUORUM);
ResultSet rs = session.execute(stmt);

// Write with LOCAL_QUORUM for cross-DC safety
Statement insert = new SimpleStatement(
    "INSERT INTO users (user_id, name) VALUES (?, ?)",
    userId, "Bob"
).setConsistencyLevel(ConsistencyLevel.LOCAL_QUORUM);
session.execute(insert);`
        },
        {
          name: 'Partition Keys',
          explanation: 'Partition key determines data distribution across nodes. Clustering keys define sort order within partition. Proper key design critical for performance. Avoid hot partitions that overload specific nodes. Data modeling driven by query patterns.',
          codeExample: `-- Partition key + clustering key design
CREATE TABLE user_activity (
  user_id UUID,           -- partition key
  activity_time TIMESTAMP, -- clustering key
  action TEXT,
  details TEXT,
  PRIMARY KEY (user_id, activity_time)
) WITH CLUSTERING ORDER BY (activity_time DESC);

-- Composite partition key for even distribution
CREATE TABLE sensor_data (
  sensor_id TEXT,
  day TEXT,               -- bucket by day
  reading_time TIMESTAMP,
  value DOUBLE,
  PRIMARY KEY ((sensor_id, day), reading_time)
);

-- Query within a single partition (efficient)
SELECT * FROM user_activity
  WHERE user_id = ? AND activity_time > '2024-01-01';`
        },
        {
          name: 'Write-Optimized',
          explanation: 'Sequential write path using commit log and memtables. No read-before-write operations. Updates are inserts with timestamps. Compaction merges data files periodically. Delivers exceptionally high write throughput.'
        },
        {
          name: 'Multi-DC Replication',
          explanation: 'Built-in support for multiple data centers. Network topology awareness for smart routing. Configurable replication factor per DC. Local and remote consistency levels. Enables disaster recovery and geographic distribution.'
        }
      ]
    },
    {
      id: 'redis',
      name: 'Redis',
      icon: '🔴',
      color: '#ef4444',
      description: 'Ultra-fast in-memory data store with rich data structures',
      diagram: RedisDiagram,
      details: [
        {
          name: 'In-Memory Store',
          explanation: 'All data kept in RAM for microsecond latency. Optional persistence to disk via snapshots or AOF. Dramatically faster than disk-based databases. Perfect for caching, sessions, and real-time applications. Memory as the primary storage medium.',
          codeExample: `# Basic string operations
SET user:1001 "Alice"
GET user:1001              # "Alice"

# Set with expiration (TTL)
SET session:abc123 "data" EX 3600   # expires in 1 hour
TTL session:abc123                   # seconds remaining

# Java with Jedis client
Jedis jedis = new Jedis("localhost", 6379);
jedis.set("user:1001", "Alice");
String name = jedis.get("user:1001");

// Set with TTL
jedis.setex("session:abc", 3600, "sessionData");
jedis.close();`
        },
        {
          name: 'Rich Data Structures',
          explanation: 'Native support for strings, hashes, lists, sets, sorted sets, bitmaps, hyperloglogs, and streams. Operations optimized for each type. Atomic operations on complex types. Enables sophisticated caching and data modeling patterns beyond simple key-value.',
          codeExample: `# Hash - store user as object
HSET user:1001 name "Alice" email "a@b.com" age 30
HGET user:1001 name           # "Alice"
HGETALL user:1001             # all fields

# List - message queue
LPUSH queue:tasks "task1" "task2"
RPOP queue:tasks              # "task1"

# Sorted Set - leaderboard
ZADD leaderboard 100 "player1" 200 "player2"
ZRANGE leaderboard 0 -1 WITHSCORES   # sorted
ZREVRANK leaderboard "player2"        # rank 0

# Set - unique tags
SADD article:1:tags "java" "nosql" "redis"
SISMEMBER article:1:tags "java"       # 1 (true)
SINTER article:1:tags article:2:tags  # common tags`
        },
        {
          name: 'Pub/Sub Messaging',
          explanation: 'Built-in publish/subscribe messaging pattern. Channels for topic-based messaging. Pattern matching subscriptions for flexible routing. Real-time event distribution. Foundation for message queues and real-time notifications.',
          codeExample: `# Subscribe to a channel (terminal 1)
SUBSCRIBE notifications

# Publish a message (terminal 2)
PUBLISH notifications "New order received"

# Pattern-based subscription
PSUBSCRIBE order.*         # matches order.created, order.shipped

# Java Jedis pub/sub
Jedis subscriber = new Jedis("localhost");
subscriber.subscribe(new JedisPubSub() {
    public void onMessage(String channel, String msg) {
        System.out.println(channel + ": " + msg);
    }
}, "notifications");

// Publisher
Jedis publisher = new Jedis("localhost");
publisher.publish("notifications", "Hello!");`
        },
        {
          name: 'Transactions',
          explanation: 'MULTI/EXEC for transaction blocks. All commands executed atomically. WATCH for optimistic locking. Pipeline commands for better performance. Lua scripting for server-side atomic operations with complex logic.',
          codeExample: `# Atomic transaction
MULTI
SET account:1 900
SET account:2 1100
EXEC                # both execute atomically

# Optimistic locking with WATCH
WATCH account:1
val = GET account:1
MULTI
SET account:1 (val - 100)
EXEC                # fails if account:1 changed

# Lua script for atomic operations
EVAL "
  local current = redis.call('GET', KEYS[1])
  if tonumber(current) >= tonumber(ARGV[1]) then
    redis.call('DECRBY', KEYS[1], ARGV[1])
    return 1
  end
  return 0
" 1 account:1 100`
        },
        {
          name: 'Persistence Options',
          explanation: 'RDB snapshots for point-in-time backups. AOF (Append Only File) logs every write operation. Hybrid mode combining both strategies. Trade-off between performance and durability. Configurable fsync policies for different durability requirements.'
        },
        {
          name: 'Clustering & Sentinel',
          explanation: 'Redis Cluster for automatic sharding across nodes. Hash slots for data distribution. Redis Sentinel for high availability and monitoring. Automatic failover on master failure. Master-replica replication for redundancy.'
        }
      ]
    },
    {
      id: 'dynamodb',
      name: 'Amazon DynamoDB',
      icon: '⚡',
      color: '#f59e0b',
      description: 'Fully managed, serverless NoSQL database with automatic scaling',
      diagram: DynamoDBDiagram,
      details: [
        {
          name: 'Managed Service',
          explanation: 'Fully managed by AWS - no servers to provision or manage. Automatic scaling based on traffic patterns. Built-in backup and restore capabilities. Point-in-time recovery for data protection. Multi-region replication. Focus on application development, not database operations.',
          codeExample: `// AWS SDK v2 - Create DynamoDB table
DynamoDbClient ddb = DynamoDbClient.builder()
    .region(Region.US_EAST_1).build();

CreateTableRequest request = CreateTableRequest.builder()
    .tableName("Users")
    .keySchema(
        KeySchemaElement.builder()
            .attributeName("userId")
            .keyType(KeyType.HASH).build()
    )
    .attributeDefinitions(
        AttributeDefinition.builder()
            .attributeName("userId")
            .attributeType(ScalarAttributeType.S).build()
    )
    .billingMode(BillingMode.PAY_PER_REQUEST)
    .build();

ddb.createTable(request);`
        },
        {
          name: 'Key-Value & Document',
          explanation: 'Supports both key-value and document data models. Store complex nested structures. Flexible schema per item. Primary key required (partition key or partition + sort key). Items up to 400 KB. Versatile for different use cases.',
          codeExample: `// Put item with nested attributes
Map<String, AttributeValue> item = new HashMap<>();
item.put("userId", AttributeValue.builder().s("u123").build());
item.put("name", AttributeValue.builder().s("Alice").build());
item.put("age", AttributeValue.builder().n("30").build());
item.put("address", AttributeValue.builder().m(Map.of(
    "city", AttributeValue.builder().s("NYC").build(),
    "zip", AttributeValue.builder().s("10001").build()
)).build());

ddb.putItem(PutItemRequest.builder()
    .tableName("Users").item(item).build());

// Get item by key
GetItemResponse resp = ddb.getItem(GetItemRequest.builder()
    .tableName("Users")
    .key(Map.of("userId",
        AttributeValue.builder().s("u123").build()))
    .build());`
        },
        {
          name: 'Provisioned & On-Demand',
          explanation: 'Provisioned capacity mode with predictable performance and cost. On-demand mode for variable workloads with pay-per-request billing. Auto-scaling for provisioned capacity. Switch between modes as workload changes. Flexibility in cost and performance management.',
          codeExample: `// Provisioned capacity with auto-scaling
CreateTableRequest request = CreateTableRequest.builder()
    .tableName("Orders")
    .billingMode(BillingMode.PROVISIONED)
    .provisionedThroughput(ProvisionedThroughput.builder()
        .readCapacityUnits(100L)
        .writeCapacityUnits(50L)
        .build())
    .build();

// Switch to on-demand (via update)
ddb.updateTable(UpdateTableRequest.builder()
    .tableName("Orders")
    .billingMode(BillingMode.PAY_PER_REQUEST)
    .build());

// AWS CLI equivalent
// aws dynamodb update-table \
//   --table-name Orders \
//   --billing-mode PAY_PER_REQUEST`
        },
        {
          name: 'Global Tables',
          explanation: 'Multi-region, multi-master replication. Active-active configuration across regions. Automatic conflict resolution with last-writer-wins. Single-digit millisecond latency globally. Built-in disaster recovery and geographic data distribution.',
          codeExample: `// Create global table replica (AWS CLI)
// aws dynamodb create-table \
//   --table-name Users \
//   --billing-mode PAY_PER_REQUEST \
//   --key-schema AttributeName=userId,KeyType=HASH \
//   --attribute-definitions AttributeName=userId,AttributeType=S \
//   --region us-east-1

// Add replica in eu-west-1
// aws dynamodb update-table \
//   --table-name Users \
//   --replica-updates \
//     '[{"Create": {"RegionName": "eu-west-1"}}]' \
//   --region us-east-1

// Java: write in us-east-1, read in eu-west-1
DynamoDbClient euClient = DynamoDbClient.builder()
    .region(Region.EU_WEST_1).build();
// Reads local replica with single-digit ms latency`
        },
        {
          name: 'DynamoDB Streams',
          explanation: 'Change data capture streams for real-time processing. Time-ordered sequence of item modifications. Lambda triggers for serverless event processing. Enable event-driven architectures. Maintain derived data stores and implement complex workflows.'
        },
        {
          name: 'Secondary Indexes',
          explanation: 'Global Secondary Indexes (GSI) for alternate query patterns. Local Secondary Indexes (LSI) with same partition key. Project specific attributes to indexes. Eventually consistent GSIs. Provides query flexibility beyond primary key access patterns.'
        }
      ]
    },
    {
      id: 'document-stores',
      name: 'Document Stores',
      icon: '📄',
      color: '#06b6d4',
      description: 'Database paradigm storing data as self-contained documents',
      diagram: DocumentStoreDiagram,
      details: [
        {
          name: 'Schema Flexibility',
          explanation: 'Documents can have different fields and structures without predefined schema. Add/remove fields without migrations. Perfect for evolving requirements and rapid development. Natural representation of object-oriented data. Each document is self-contained.',
          codeExample: `// Different documents in the same collection
db.products.insertMany([
  {
    name: "Laptop",
    specs: { ram: "16GB", cpu: "i7" },
    price: 999
  },
  {
    name: "T-Shirt",
    size: "L", color: "blue",
    price: 25
    // no "specs" field - that's fine!
  },
  {
    name: "eBook",
    format: "PDF", pages: 350,
    price: 15
    // completely different fields
  }
])`
        },
        {
          name: 'Nested Structures',
          explanation: 'Support for embedded documents and arrays. Hierarchical data modeling without joins. Denormalization for query performance. Reduce complex joins by embedding related data. Single document reads instead of multiple table queries.',
          codeExample: `// Embedded document pattern (denormalized)
db.blogPosts.insertOne({
  title: "NoSQL Guide",
  author: { name: "Alice", email: "alice@co.com" },
  comments: [
    { user: "Bob", text: "Great post!", date: new Date() },
    { user: "Carol", text: "Very helpful", date: new Date() }
  ],
  tags: ["nosql", "mongodb", "tutorial"]
})

// Query nested fields directly
db.blogPosts.find({ "author.name": "Alice" })

// Query inside arrays
db.blogPosts.find({ "comments.user": "Bob" })

// Update nested array element
db.blogPosts.updateOne(
  { title: "NoSQL Guide", "comments.user": "Bob" },
  { $set: { "comments.$.text": "Updated comment" } }
)`
        },
        {
          name: 'Rich Query Languages',
          explanation: 'Query capabilities beyond simple key lookups. Filter by nested field values. Projection to return specific fields. Sorting and pagination support. Aggregation and analytics. Index-backed queries for high performance.',
          codeExample: `// Filter with comparison operators
db.products.find({
  price: { $gte: 10, $lte: 100 },
  tags: { $in: ["sale", "featured"] }
})

// Projection - return only specific fields
db.products.find(
  { category: "electronics" },
  { name: 1, price: 1, _id: 0 }
)

// Sort + paginate
db.products.find({ status: "active" })
  .sort({ price: -1 })
  .skip(20)
  .limit(10)

// Regex search
db.products.find({ name: { $regex: /laptop/i } })`
        },
        {
          name: 'ACID Properties',
          explanation: 'Atomic operations on single documents guaranteed. Modern document databases support multi-document transactions. Isolation levels for consistency. Durability guarantees for committed data. Balance between NoSQL flexibility and traditional ACID guarantees.'
        }
      ]
    },
    {
      id: 'key-value-stores',
      name: 'Key-Value Stores',
      icon: '🔑',
      color: '#ec4899',
      description: 'Simplest NoSQL model optimized for high-performance lookups',
      diagram: KeyValueDiagram,
      details: [
        {
          name: 'Simple Model',
          explanation: 'Simplest NoSQL model - unique key maps to value. Value is opaque to database. No complex query language needed. PUT, GET, DELETE operations only. Blazing fast lookups via direct hash-based access. Foundation for other NoSQL types.',
          codeExample: `# Redis key-value basics
SET user:1001 "Alice"
GET user:1001             # "Alice"
DEL user:1001             # removes key
EXISTS user:1001          # 0 (false)

# Store JSON as value
SET config:app '{"theme":"dark","lang":"en"}'
GET config:app

# Atomic increment (counters)
SET page:views 0
INCR page:views           # 1
INCRBY page:views 10      # 11

# Key patterns
KEYS user:*               # find all user keys
SCAN 0 MATCH user:* COUNT 100  # safer iteration`
        },
        {
          name: 'Extreme Performance',
          explanation: 'Optimized for extremely high throughput and low latency. Direct hash-based lookup without query parsing overhead. In-memory implementations deliver microsecond response times. Linear scalability as you add nodes. Ideal for high-traffic applications.',
          codeExample: `// Java Jedis - pipeline for bulk operations
Jedis jedis = new Jedis("localhost", 6379);

// Pipeline: batch commands (reduce round trips)
Pipeline pipe = jedis.pipelined();
for (int i = 0; i < 10000; i++) {
    pipe.set("key:" + i, "value:" + i);
}
pipe.sync();  // send all at once

// MGET/MSET for batch key-value
jedis.mset("k1", "v1", "k2", "v2", "k3", "v3");
List<String> vals = jedis.mget("k1", "k2", "k3");

// Benchmark: redis-benchmark -q -n 100000
// SET: ~150,000 ops/sec
// GET: ~150,000 ops/sec`
        },
        {
          name: 'Caching Layer',
          explanation: 'Primary use case as cache in front of databases. Store session data, user preferences, and temporary data. TTL (time-to-live) for automatic expiration. Implement cache-aside, read-through, and write-through patterns. Reduces database load dramatically.',
          codeExample: `// Cache-aside pattern in Java
public User getUser(String userId) {
    // 1. Check cache first
    String cached = jedis.get("user:" + userId);
    if (cached != null) {
        return deserialize(cached);
    }

    // 2. Cache miss - query database
    User user = database.findById(userId);

    // 3. Store in cache with TTL
    jedis.setex("user:" + userId, 3600,
        serialize(user));

    return user;
}

// Invalidate on update
public void updateUser(User user) {
    database.save(user);
    jedis.del("user:" + user.getId());
}`
        },
        {
          name: 'Distributed Hash Tables',
          explanation: 'Consistent hashing for data distribution across nodes. Minimal data movement when adding/removing nodes. Replication for high availability. Eventually consistent by design. Based on Amazon Dynamo paper principles.'
        }
      ]
    },
    {
      id: 'column-family',
      name: 'Column-Family Databases',
      icon: '📊',
      color: '#6366f1',
      description: 'Databases organizing data by column families for analytics',
      diagram: ColumnFamilyDiagram,
      details: [
        {
          name: 'Wide-Column Model',
          explanation: 'Tables with rows and dynamic columns. Columns grouped into column families. Each row can have different columns for sparse data representation. Two-dimensional key-value store (row key, column key). Flexible schema per row.',
          codeExample: `-- Cassandra: wide-column with clustering keys
CREATE TABLE timeseries (
  sensor_id TEXT,
  ts TIMESTAMP,
  temperature DOUBLE,
  humidity DOUBLE,
  PRIMARY KEY (sensor_id, ts)
);

-- Each sensor_id is a row with many timestamp columns
INSERT INTO timeseries (sensor_id, ts, temperature, humidity)
VALUES ('sensor-1', '2024-01-01 12:00:00', 22.5, 45.0);

-- Range query within a partition
SELECT * FROM timeseries
WHERE sensor_id = 'sensor-1'
  AND ts >= '2024-01-01' AND ts < '2024-02-01';`
        },
        {
          name: 'Data Locality',
          explanation: 'Columns accessed together stored together physically. Column family design based on query patterns. Reduces I/O for analytical queries. Compression works better on similar data types stored together. Columnar storage benefits for analytics.',
          codeExample: `-- Design table around query patterns
-- Query: "Get all orders for a user, newest first"
CREATE TABLE user_orders (
  user_id UUID,
  order_date TIMESTAMP,
  order_id UUID,
  total DECIMAL,
  status TEXT,
  PRIMARY KEY (user_id, order_date)
) WITH CLUSTERING ORDER BY (order_date DESC);

-- Data for same user stored together on disk
-- Efficient sequential read for one user's orders
SELECT * FROM user_orders
WHERE user_id = ? LIMIT 20;

-- Anti-pattern: avoid queries across partitions
-- BAD: SELECT * FROM user_orders WHERE status = 'pending'
-- This scans ALL partitions (full table scan)`
        },
        {
          name: 'Versioning',
          explanation: 'Multiple versions of cell values with timestamps. Time-travel queries to retrieve historical data. Automatic garbage collection of old versions. Enables audit trails and temporal data analysis without application-level complexity.',
          codeExample: `-- Cassandra: TTL and WRITETIME for versioning
INSERT INTO users (user_id, name, email)
VALUES (uuid(), 'Alice', 'alice@v1.com')
USING TTL 86400;    -- auto-delete after 24 hours

-- Check when a value was written
SELECT name, WRITETIME(name), TTL(name)
FROM users WHERE user_id = ?;

-- HBase: explicit versioning (Java API)
// Put with timestamp
Put put = new Put(Bytes.toBytes("row1"));
put.addColumn(
    Bytes.toBytes("cf"), Bytes.toBytes("name"),
    timestamp, Bytes.toBytes("Alice")
);
table.put(put);

// Get specific number of versions
Get get = new Get(Bytes.toBytes("row1"));
get.readVersions(3);  // last 3 versions`
        },
        {
          name: 'Compression',
          explanation: 'Columnar layout enables efficient compression. Similar values in columns compress exceptionally well. Reduce storage costs significantly. Lower I/O requirements improve query performance. Multiple compression algorithms per column family.',
          codeExample: `-- Cassandra: enable compression per table
CREATE TABLE logs (
  app TEXT,
  log_time TIMESTAMP,
  level TEXT,
  message TEXT,
  PRIMARY KEY (app, log_time)
) WITH compression = {
  'class': 'LZ4Compressor',
  'chunk_length_in_kb': 64
};

-- Alternative compressors
ALTER TABLE logs WITH compression = {
  'class': 'ZstdCompressor',
  'compression_level': 3
};

-- Check compression ratio
nodetool tablestats keyspace.logs
-- SSTable Compression Ratio: 0.35 (65% savings)`
        },
        {
          name: 'Analytics Workloads',
          explanation: 'Optimized for analytical queries scanning columns. Aggregations across large datasets. Perfect for time-series data, data warehousing, IoT sensor data, and log aggregation. Write-heavy workloads and petabyte-scale deployments.'
        }
      ]
    },
    {
      id: 'graph-databases',
      name: 'Graph Databases',
      icon: '🕸️',
      color: '#14b8a6',
      description: 'Specialized databases for highly connected data',
      diagram: GraphDatabaseDiagram,
      details: [
        {
          name: 'Nodes & Relationships',
          explanation: 'Store data as nodes (entities) and edges (relationships). Relationships are first-class citizens with properties. Both nodes and edges can have properties. Labels for typing. Natural representation of highly connected data.',
          codeExample: `// Neo4j Cypher: create nodes and relationships
CREATE (alice:User {name: "Alice", age: 30})
CREATE (bob:User {name: "Bob", age: 28})
CREATE (laptop:Product {name: "Laptop", price: 999})

// Create relationships with properties
CREATE (alice)-[:FRIENDS_WITH {since: 2020}]->(bob)
CREATE (alice)-[:PURCHASED {date: "2024-01-15"}]->(laptop)
CREATE (bob)-[:VIEWED]->(laptop)

// Query: find Alice's friends
MATCH (alice:User {name: "Alice"})-[:FRIENDS_WITH]->(friend)
RETURN friend.name`
        },
        {
          name: 'Traversal Queries',
          explanation: 'Query by traversing relationships between nodes. Find paths between entities. Shortest path algorithms built-in. Depth and breadth-first traversal. Pattern matching for complex queries. Much faster than SQL joins for connected data.',
          codeExample: `// Friends of friends (2 hops)
MATCH (user:User {name: "Alice"})
      -[:FRIENDS_WITH*2]->(fof)
WHERE fof <> user
RETURN DISTINCT fof.name

// Shortest path between two users
MATCH path = shortestPath(
  (a:User {name: "Alice"})
  -[:FRIENDS_WITH*..6]-
  (b:User {name: "Zara"})
)
RETURN path, length(path)

// Variable-length traversal (1 to 5 hops)
MATCH (start:User {name: "Alice"})
      -[:FOLLOWS*1..5]->(reached)
RETURN reached.name, min(length(path)) AS distance
ORDER BY distance`
        },
        {
          name: 'Query Languages',
          explanation: 'Cypher (Neo4j) with intuitive ASCII-art syntax. Gremlin (TinkerPop) for traversal-based queries. SPARQL for RDF graphs. Declarative pattern matching. Optimized for graph operations. Much more intuitive than complex SQL joins.',
          codeExample: `// Cypher: pattern matching (Neo4j)
MATCH (u:User)-[:PURCHASED]->(p:Product)
      <-[:PURCHASED]-(other:User)
WHERE u.name = "Alice" AND other <> u
RETURN other.name, p.name

// Gremlin: traversal-based (TinkerPop)
g.V().has("User", "name", "Alice")
  .out("PURCHASED").in("PURCHASED")
  .where(neq("alice"))
  .values("name")

// Cypher: aggregation
MATCH (u:User)-[:PURCHASED]->(p:Product)
RETURN u.name, count(p) AS purchases,
       sum(p.price) AS totalSpent
ORDER BY totalSpent DESC
LIMIT 10`
        },
        {
          name: 'Use Cases',
          explanation: 'Social networks and friend-of-friend queries. Recommendation engines. Fraud detection analyzing transaction patterns. Knowledge graphs. Network and IT operations. Master data management. Identity and access management. Any domain with complex relationships.',
          codeExample: `// Recommendation: "users who bought X also bought"
MATCH (u:User)-[:PURCHASED]->(p:Product {name: "Laptop"})
      -[:IN_CATEGORY]->(cat:Category)
      <-[:IN_CATEGORY]-(rec:Product)
WHERE NOT (u)-[:PURCHASED]->(rec)
RETURN rec.name, count(*) AS score
ORDER BY score DESC LIMIT 5

// Fraud detection: circular money transfers
MATCH path = (a:Account)-[:TRANSFER*3..6]->(a)
WHERE ALL(t IN relationships(path)
      WHERE t.amount > 10000)
RETURN path

// Social: mutual friends count
MATCH (a:User {name: "Alice"})-[:FRIENDS_WITH]-(mutual)
      -[:FRIENDS_WITH]-(b:User {name: "Bob"})
RETURN count(mutual) AS mutualFriends`
        },
        {
          name: 'Performance',
          explanation: 'Constant time traversals regardless of database size. Index-free adjacency - relationships stored with nodes. Dramatically faster than joins for multi-hop queries. Enables real-time recommendations and fraud detection on massive graphs.'
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
      stack.push({ name: 'NoSQL', icon: '🗄️', onClick: () => { setSelectedConceptIndex(null); setSelectedDetailIndex(0) } })
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    } else {
      stack.push({ name: 'NoSQL', icon: '🗄️' })
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
          <h1 style={titleStyle}>NoSQL Databases</h1>
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

export default NoSQL
