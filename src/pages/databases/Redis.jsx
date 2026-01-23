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

// Redis Data Structures Diagram
const DataStructuresDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Redis Data Structures</text>
    <rect x="30" y="50" width="90" height="50" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="75" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">String</text>
    <text x="75" y="88" textAnchor="middle" fill="#fecaca" fontSize="7">GET/SET</text>
    <rect x="130" y="50" width="90" height="50" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="175" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Hash</text>
    <text x="175" y="88" textAnchor="middle" fill="#fef3c7" fontSize="7">HGET/HSET</text>
    <rect x="230" y="50" width="90" height="50" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="275" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">List</text>
    <text x="275" y="88" textAnchor="middle" fill="#bbf7d0" fontSize="7">LPUSH/RPOP</text>
    <rect x="330" y="50" width="90" height="50" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="375" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Set</text>
    <text x="375" y="88" textAnchor="middle" fill="#bfdbfe" fontSize="7">SADD/SINTER</text>
    <rect x="430" y="50" width="90" height="50" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="475" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Sorted Set</text>
    <text x="475" y="88" textAnchor="middle" fill="#ddd6fe" fontSize="7">ZADD/ZRANGE</text>
    <rect x="530" y="50" width="90" height="50" rx="6" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="575" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Stream</text>
    <text x="575" y="88" textAnchor="middle" fill="#a5f3fc" fontSize="7">XADD/XREAD</text>
    <rect x="100" y="115" width="500" height="45" rx="6" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="1"/>
    <text x="350" y="140" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">All operations are atomic • O(1) or O(log n) complexity</text>
    <text x="350" y="155" textAnchor="middle" fill="#fca5a5" fontSize="8">Choose data structure based on access pattern</text>
  </svg>
)

// Redis Persistence Diagram
const PersistenceDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Redis Persistence Options</text>
    <rect x="50" y="50" width="180" height="70" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="140" y="75" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">RDB Snapshots</text>
    <text x="140" y="95" textAnchor="middle" fill="#93c5fd" fontSize="8">Point-in-time backup</text>
    <text x="140" y="110" textAnchor="middle" fill="#93c5fd" fontSize="7">Fast restart • Compact</text>
    <rect x="260" y="50" width="180" height="70" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="350" y="75" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">AOF Log</text>
    <text x="350" y="95" textAnchor="middle" fill="#fcd34d" fontSize="8">Append every write</text>
    <text x="350" y="110" textAnchor="middle" fill="#fcd34d" fontSize="7">Durable • Replayable</text>
    <rect x="470" y="50" width="180" height="70" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="560" y="75" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Hybrid</text>
    <text x="560" y="95" textAnchor="middle" fill="#86efac" fontSize="8">RDB + AOF together</text>
    <text x="560" y="110" textAnchor="middle" fill="#86efac" fontSize="7">Best of both worlds</text>
    <text x="350" y="145" textAnchor="middle" fill="#64748b" fontSize="9">RDB = Performance • AOF = Durability • Hybrid = Balanced</text>
  </svg>
)

// Redis Caching Diagram
const CachingDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Cache-Aside Pattern</text>
    <rect x="50" y="55" width="100" height="60" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="90" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">App</text>
    <rect x="200" y="55" width="120" height="60" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="260" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Redis Cache</text>
    <text x="260" y="102" textAnchor="middle" fill="#fecaca" fontSize="7">TTL-based</text>
    <rect x="370" y="55" width="120" height="60" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="430" y="90" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Database</text>
    <path d="M 150 75 L 195 75" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrow)"/>
    <text x="172" y="68" textAnchor="middle" fill="#4ade80" fontSize="7">1. GET</text>
    <path d="M 195 95 L 150 95" stroke="#ef4444" strokeWidth="2" strokeDasharray="4"/>
    <text x="172" y="108" textAnchor="middle" fill="#ef4444" fontSize="7">HIT</text>
    <path d="M 320 85 Q 345 50 370 85" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4"/>
    <text x="345" y="48" textAnchor="middle" fill="#fbbf24" fontSize="7">2. MISS → Query DB</text>
    <path d="M 370 95 Q 345 130 320 95" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="345" y="140" textAnchor="middle" fill="#a78bfa" fontSize="7">3. SET cache</text>
    <rect x="530" y="55" width="130" height="60" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="595" y="75" textAnchor="middle" fill="#a78bfa" fontSize="8" fontWeight="bold">Eviction</text>
    <text x="595" y="92" textAnchor="middle" fill="#c4b5fd" fontSize="7">LRU/LFU/TTL</text>
    <text x="595" y="107" textAnchor="middle" fill="#c4b5fd" fontSize="7">maxmemory</text>
  </svg>
)

// Redis Cluster Diagram
const ClusterDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Redis Cluster - Hash Slots Distribution</text>
    <rect x="50" y="50" width="150" height="70" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="125" y="75" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Node 1</text>
    <text x="125" y="95" textAnchor="middle" fill="#93c5fd" fontSize="8">Slots 0-5460</text>
    <text x="125" y="110" textAnchor="middle" fill="#93c5fd" fontSize="7">+ Replica</text>
    <rect x="230" y="50" width="150" height="70" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="305" y="75" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Node 2</text>
    <text x="305" y="95" textAnchor="middle" fill="#86efac" fontSize="8">Slots 5461-10922</text>
    <text x="305" y="110" textAnchor="middle" fill="#86efac" fontSize="7">+ Replica</text>
    <rect x="410" y="50" width="150" height="70" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="485" y="75" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Node 3</text>
    <text x="485" y="95" textAnchor="middle" fill="#fcd34d" fontSize="8">Slots 10923-16383</text>
    <text x="485" y="110" textAnchor="middle" fill="#fcd34d" fontSize="7">+ Replica</text>
    <rect x="200" y="135" width="300" height="30" rx="4" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="350" y="155" textAnchor="middle" fill="#a78bfa" fontSize="9">CRC16(key) % 16384 → Slot assignment</text>
    <line x1="200" y1="85" x2="225" y2="85" stroke="#64748b" strokeWidth="1" strokeDasharray="3"/>
    <line x1="380" y1="85" x2="405" y2="85" stroke="#64748b" strokeWidth="1" strokeDasharray="3"/>
  </svg>
)

// Redis Transactions Diagram
const TransactionsDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Redis Transactions - MULTI/EXEC</text>
    <rect x="50" y="50" width="100" height="50" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="80" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">MULTI</text>
    <rect x="170" y="50" width="100" height="50" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="220" y="72" textAnchor="middle" fill="#fbbf24" fontSize="9">INCR x</text>
    <text x="220" y="88" textAnchor="middle" fill="#fcd34d" fontSize="8">QUEUED</text>
    <rect x="290" y="50" width="100" height="50" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="340" y="72" textAnchor="middle" fill="#fbbf24" fontSize="9">DECR y</text>
    <text x="340" y="88" textAnchor="middle" fill="#fcd34d" fontSize="8">QUEUED</text>
    <rect x="410" y="50" width="100" height="50" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="460" y="72" textAnchor="middle" fill="#fbbf24" fontSize="9">SET z 100</text>
    <text x="460" y="88" textAnchor="middle" fill="#fcd34d" fontSize="8">QUEUED</text>
    <rect x="530" y="50" width="100" height="50" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="580" y="80" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">EXEC</text>
    <line x1="150" y1="75" x2="165" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="270" y1="75" x2="285" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="390" y1="75" x2="405" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="510" y1="75" x2="525" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <text x="350" y="125" textAnchor="middle" fill="#64748b" fontSize="9">All commands execute atomically • No interleaving • WATCH for optimistic locking</text>
  </svg>
)

// Redis Pub/Sub Diagram
const PubSubDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Redis Pub/Sub Messaging</text>
    <rect x="50" y="70" width="100" height="50" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Publisher</text>
    <rect x="250" y="50" width="200" height="90" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="350" y="75" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Channel: orders</text>
    <text x="350" y="95" textAnchor="middle" fill="#fca5a5" fontSize="8">PUBLISH orders "msg"</text>
    <text x="350" y="115" textAnchor="middle" fill="#fca5a5" fontSize="7">Fire-and-forget delivery</text>
    <rect x="550" y="40" width="100" height="40" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="600" y="65" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Sub 1</text>
    <rect x="550" y="90" width="100" height="40" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="600" y="115" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Sub 2</text>
    <rect x="550" y="140" width="100" height="40" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="600" y="165" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Sub 3</text>
    <line x1="150" y1="95" x2="245" y2="95" stroke="#3b82f6" strokeWidth="2"/>
    <line x1="450" y1="60" x2="545" y2="60" stroke="#22c55e" strokeWidth="2"/>
    <line x1="450" y1="95" x2="545" y2="110" stroke="#22c55e" strokeWidth="2"/>
    <line x1="450" y1="130" x2="545" y2="160" stroke="#22c55e" strokeWidth="2"/>
    <text x="200" y="85" textAnchor="middle" fill="#60a5fa" fontSize="7">PUBLISH</text>
    <text x="500" y="50" textAnchor="middle" fill="#4ade80" fontSize="7">SUBSCRIBE</text>
  </svg>
)

// Redis Use Cases Diagram
const UseCasesDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Common Redis Use Cases</text>
    <rect x="30" y="50" width="100" height="60" rx="6" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <text x="80" y="75" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">Session</text>
    <text x="80" y="92" textAnchor="middle" fill="#fca5a5" fontSize="7">Store</text>
    <rect x="145" y="50" width="100" height="60" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="195" y="75" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Leader</text>
    <text x="195" y="92" textAnchor="middle" fill="#fcd34d" fontSize="7">boards</text>
    <rect x="260" y="50" width="100" height="60" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="310" y="75" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Rate</text>
    <text x="310" y="92" textAnchor="middle" fill="#86efac" fontSize="7">Limiting</text>
    <rect x="375" y="50" width="100" height="60" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="425" y="75" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Cache</text>
    <text x="425" y="92" textAnchor="middle" fill="#93c5fd" fontSize="7">Layer</text>
    <rect x="490" y="50" width="100" height="60" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="540" y="75" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Real-time</text>
    <text x="540" y="92" textAnchor="middle" fill="#c4b5fd" fontSize="7">Analytics</text>
    <rect x="605" y="50" width="70" height="60" rx="6" fill="rgba(6, 182, 212, 0.3)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="640" y="75" textAnchor="middle" fill="#22d3ee" fontSize="8" fontWeight="bold">Geo</text>
    <text x="640" y="92" textAnchor="middle" fill="#67e8f9" fontSize="7">Spatial</text>
    <text x="350" y="135" textAnchor="middle" fill="#64748b" fontSize="9">Sub-millisecond latency • Rich data structures • High throughput</text>
  </svg>
)

function Redis({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'data-structures',
      name: 'Data Structures',
      icon: '📦',
      color: '#ef4444',
      description: 'Rich data structures beyond simple key-value pairs',
      diagram: DataStructuresDiagram,
      details: [
        {
          name: 'Strings',
          explanation: 'Most basic Redis data type, can store text or binary data up to 512 MB. Use GET/SET commands. Supports atomic operations like INCR, DECR for counters. APPEND for string concatenation. Perfect for caching, session storage, and simple values.'
        },
        {
          name: 'Hashes',
          explanation: 'Maps between string fields and string values. Like mini Redis instances inside a key. Use HGET, HSET, HMGET, HMSET. Perfect for representing objects (e.g., user:1000 → {name, email, age}). More memory efficient than multiple string keys. Can increment fields with HINCRBY.'
        },
        {
          name: 'Lists',
          explanation: 'Linked lists of string elements. LPUSH/RPUSH to add elements at head/tail. LPOP/RPOP to remove and return elements. Blocking operations with BLPOP/BRPOP for queue implementations. Use LRANGE to get a range. Perfect for message queues, activity feeds, recent items.'
        },
        {
          name: 'Sets',
          explanation: 'Unordered collection of unique strings. SADD to add members, SISMEMBER to check membership. Set operations: SUNION, SINTER, SDIFF for union, intersection, difference. SPOP for random element removal. Perfect for unique visitors, tags, and relationships.'
        },
        {
          name: 'Sorted Sets',
          explanation: 'Sets where every member has an associated score for ordering. ZADD to add with score. ZRANGE/ZREVRANGE for range queries by rank. ZRANGEBYSCORE for score-based queries. Atomic increment with ZINCRBY. Perfect for leaderboards, priority queues, time series.'
        },
        {
          name: 'Bitmaps & HyperLogLog',
          explanation: 'Bitmaps for bit-level operations on strings. SETBIT/GETBIT for individual bits. BITCOUNT for counting set bits. HyperLogLog for cardinality estimation using minimal memory. PFADD to add elements, PFCOUNT for approximate count. Perfect for analytics and unique counting.'
        },
        {
          name: 'Streams',
          explanation: 'Append-only log data structure. XADD to add entries, XREAD to read. Consumer groups for distributed processing. XACK for acknowledging processed messages. Time-based or ID-based queries. Perfect for event sourcing, activity streams, and message brokers.'
        }
      ]
    },
    {
      id: 'persistence',
      name: 'Persistence',
      icon: '💾',
      color: '#f59e0b',
      description: 'Options for saving data to disk for durability',
      diagram: PersistenceDiagram,
      details: [
        {
          name: 'RDB Snapshots',
          explanation: 'Point-in-time snapshots of entire dataset saved to disk. Compact binary format. Configured with "save" directives (e.g., save after 900 seconds if 1 key changed). BGSAVE for manual snapshot. Fast restarts from snapshot. Minimal impact on performance. Good for backups and disaster recovery.'
        },
        {
          name: 'AOF (Append Only File)',
          explanation: 'Logs every write operation. Can replay the log to reconstruct dataset. More durable than RDB. Three fsync policies: always (slow, most durable), everysec (good balance), no (fast, less durable). AOF rewrite compacts the log. Better for minimizing data loss.'
        },
        {
          name: 'Hybrid Persistence',
          explanation: 'Combine RDB and AOF for best of both. Use RDB for fast restarts and AOF for durability. On restart, AOF is preferred for recovery. RDB as fallback. Configurable with "aof-use-rdb-preamble" directive. Balances performance and data safety.'
        },
        {
          name: 'No Persistence',
          explanation: 'Pure in-memory mode for maximum performance. No disk writes. Data lost on restart. Perfect for pure caching where source data exists elsewhere. Disable with save "" and appendonly no. Useful for session stores with short TTLs.'
        }
      ]
    },
    {
      id: 'caching',
      name: 'Caching Strategies',
      icon: '⚡',
      color: '#10b981',
      description: 'Common patterns for using Redis as a cache',
      diagram: CachingDiagram,
      details: [
        {
          name: 'Cache-Aside',
          explanation: 'Application checks cache first. On miss, fetch from database and populate cache. SET with TTL to avoid stale data. Simple and widely used. Application controls caching logic. Best for read-heavy workloads. Lazy loading pattern.'
        },
        {
          name: 'Write-Through',
          explanation: 'On write, update both cache and database. Cache always in sync with database. Higher write latency. No cache misses for recently written data. Ensures consistency. Good for write-heavy workloads where reads must be fast.'
        },
        {
          name: 'Write-Behind',
          explanation: 'Write to cache immediately, asynchronously write to database. Lower write latency. Risk of data loss if cache fails before DB write. Batch database writes for efficiency. Complex to implement correctly. Best for very high write throughput.'
        },
        {
          name: 'Eviction Policies',
          explanation: 'When max memory reached, Redis can evict keys. Policies: noeviction (error on memory limit), allkeys-lru (evict least recently used), volatile-lru (only keys with TTL), allkeys-random, volatile-ttl (evict soonest TTL). Configure with maxmemory-policy. Choose based on access patterns.'
        }
      ]
    },
    {
      id: 'clustering',
      name: 'Clustering & HA',
      icon: '🔄',
      color: '#8b5cf6',
      description: 'High availability and horizontal scaling',
      diagram: ClusterDiagram,
      details: [
        {
          name: 'Replication',
          explanation: 'Master-slave replication for data redundancy. Master handles writes, slaves handle reads. Asynchronous replication. REPLICAOF command to make a server a replica. Read scaling by adding replicas. Automatic reconnection and partial resync.'
        },
        {
          name: 'Redis Sentinel',
          explanation: 'Automated monitoring, notification, and failover. Monitors master and replicas. Automatic failover when master fails. Promotes replica to master. Service discovery for clients. Quorum-based decisions. High availability without Redis Cluster.'
        },
        {
          name: 'Redis Cluster',
          explanation: 'Automatic sharding across multiple nodes. 16384 hash slots distributed across nodes. No single point of failure. Automatic rebalancing. Each node has replicas. Horizontal scalability. CRC16 hash of key for slot assignment. Multi-key operations limited to same slot.'
        },
        {
          name: 'Connection Handling',
          explanation: 'Use connection pooling in applications. Pipelining for batching commands. Pub/Sub for event-driven architecture. Connection multiplexing. RESP protocol for client-server communication. Client libraries handle reconnection.'
        }
      ]
    },
    {
      id: 'transactions',
      name: 'Transactions & Lua',
      icon: '🔐',
      color: '#06b6d4',
      description: 'Atomic operations and server-side scripting',
      diagram: TransactionsDiagram,
      details: [
        {
          name: 'MULTI/EXEC',
          explanation: 'Queue commands with MULTI, execute atomically with EXEC. All commands executed serially. No other commands interleave. DISCARD to abort transaction. Errors don\'t rollback executed commands. Use for ensuring consistency of multiple operations.'
        },
        {
          name: 'WATCH',
          explanation: 'Optimistic locking mechanism. WATCH keys before MULTI. Transaction aborts if watched keys change. Check-and-set pattern. UNWATCH to clear watches. Prevents race conditions. Retry transaction on conflict.'
        },
        {
          name: 'Lua Scripting',
          explanation: 'Execute scripts atomically on server side. EVAL command to run Lua scripts. Scripts cached with SCRIPT LOAD. Access Redis commands via redis.call() and redis.pcall(). Complex atomic operations. Reduces network round trips. Can return structured data.'
        },
        {
          name: 'Pipelining',
          explanation: 'Send multiple commands without waiting for responses. Reduces network latency. Responses returned in order. Not atomic like transactions. Significantly improves throughput. Use client libraries\' pipeline APIs. Perfect for batch operations.'
        }
      ]
    },
    {
      id: 'pubsub',
      name: 'Pub/Sub & Messaging',
      icon: '📡',
      color: '#ec4899',
      description: 'Real-time messaging patterns',
      diagram: PubSubDiagram,
      details: [
        {
          name: 'Publish/Subscribe',
          explanation: 'Pub/Sub messaging pattern. Publishers send messages to channels. Subscribers receive messages from channels. PUBLISH to send message. SUBSCRIBE to receive. Pattern-based subscriptions with PSUBSCRIBE. Fire-and-forget delivery. Messages not persisted.'
        },
        {
          name: 'Redis Streams',
          explanation: 'Persistent message queue. Messages have IDs. XADD to append. XREAD to consume. Consumer groups for distributed processing. XACK to acknowledge. Claiming pending messages. Perfect for reliable message queues. Time-based or ID-based range queries.'
        },
        {
          name: 'Message Patterns',
          explanation: 'Fan-out: one publisher, many subscribers. Work queue: multiple consumers competing for messages. Priority queue using sorted sets. Delayed messages with TTL. Request-response using blocking lists. Event sourcing with streams.'
        }
      ]
    },
    {
      id: 'use-cases',
      name: 'Common Use Cases',
      icon: '🎯',
      color: '#14b8a6',
      description: 'Real-world applications of Redis',
      diagram: UseCasesDiagram,
      details: [
        {
          name: 'Session Store',
          explanation: 'Store user sessions with TTL. Fast read/write for every request. Scale sessions independently. Shared sessions across app servers. Automatic expiration with EXPIRE. Hash data type for session attributes.'
        },
        {
          name: 'Leaderboards',
          explanation: 'Sorted sets perfect for rankings. ZADD to update scores. ZREVRANGE for top N. ZRANK for user\'s rank. Atomic score updates with ZINCRBY. Real-time leaderboards at scale. Use in gaming, social media, analytics.'
        },
        {
          name: 'Rate Limiting',
          explanation: 'Track request counts per time window. Sliding window with sorted sets. Fixed window with INCR and EXPIRE. Distributed rate limiting across servers. Protect APIs from abuse. Token bucket algorithm implementation.'
        },
        {
          name: 'Caching',
          explanation: 'Cache database query results. API response caching. Computed values and aggregations. Session data. Static content. Set TTL to prevent stale data. Dramatic performance improvement. Reduce database load.'
        },
        {
          name: 'Real-time Analytics',
          explanation: 'Count unique visitors with HyperLogLog. Track user activity with streams. Time-series data with sorted sets. Bitmaps for event tracking. Fast aggregations. Dashboard data. Metrics and monitoring.'
        },
        {
          name: 'Geospatial',
          explanation: 'GEOADD to store locations. GEODIST for distance. GEORADIUS for nearby locations. GEOPOS to get coordinates. Perfect for location-based services. Store with latitude/longitude. Sorted set implementation underneath.'
        }
      ]
    },
    {
      id: 'performance',
      name: 'Performance & Best Practices',
      icon: '⚡',
      color: '#f43f5e',
      description: 'Optimizing Redis for production',
      details: [
        {
          name: 'Memory Optimization',
          explanation: 'Use hashes for small objects. Compression with Redis encoding. Monitor memory with INFO memory. Set maxmemory limit. Configure eviction policies. Use smaller data types when possible. Remove debugging/DEV data.'
        },
        {
          name: 'Key Design',
          explanation: 'Use consistent naming convention (e.g., object:id:field). Avoid very long key names. Use namespaces. Set appropriate TTLs. Use hashes for related data. Avoid Big Keys (>10KB). Plan for key distribution in cluster.'
        },
        {
          name: 'Monitoring',
          explanation: 'Use MONITOR for debugging (not in production). INFO command for metrics. SLOWLOG for slow queries. Track memory usage, CPU, network. Use Redis monitoring tools: RedisInsight, Prometheus exporter. Alert on latency spikes.'
        },
        {
          name: 'Security',
          explanation: 'Enable AUTH with strong password. Bind to specific interfaces. Use TLS for encryption. Rename dangerous commands (FLUSHDB, FLUSHALL, CONFIG). Disable dangerous commands in production. Network isolation. Regular security updates.'
        },
        {
          name: 'Connection Management',
          explanation: 'Use connection pooling. Set appropriate timeout values. Monitor connection count. Reuse connections. Handle connection failures. Implement retry logic with exponential backoff. Use persistent connections.'
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
      stack.push({ name: 'Redis', icon: '🔴', onClick: () => { setSelectedConceptIndex(null); setSelectedDetailIndex(0) } })
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    } else {
      stack.push({ name: 'Redis', icon: '🔴' })
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
          <h1 style={titleStyle}>Redis</h1>
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
              maxWidth: '1200px',
              maxHeight: '92vh',
              overflow: 'auto',
              border: `1px solid ${selectedConcept.color}40`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Breadcrumb */}
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
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

export default Redis
