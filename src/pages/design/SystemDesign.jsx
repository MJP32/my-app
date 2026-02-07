import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const TOPIC_COLORS = {
  primary: '#a78bfa',
  primaryHover: '#c4b5fd',
  bg: 'rgba(139, 92, 246, 0.1)',
  border: 'rgba(139, 92, 246, 0.3)',
  arrow: '#8b5cf6',
  hoverBg: 'rgba(139, 92, 246, 0.2)',
  topicBg: 'rgba(139, 92, 246, 0.2)'
}

const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
]

// =============================================================================
// DIAGRAM COMPONENTS
// =============================================================================

const ScalabilityDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="scaleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#1e40af" stopOpacity="0.1"/>
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="690" height="150" rx="10" fill="url(#scaleGrad)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#60a5fa" fontSize="14" fontWeight="bold">Scalability Patterns</text>
    <rect x="20" y="40" width="150" height="105" rx="6" fill="#1e3a5f" stroke="#10b981" strokeWidth="2"/>
    <text x="95" y="58" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">Horizontal Scaling</text>
    <rect x="35" y="68" width="35" height="30" rx="3" fill="#374151" stroke="#10b981" strokeWidth="1"/>
    <text x="52" y="87" textAnchor="middle" fill="#94a3b8" fontSize="8">S1</text>
    <rect x="77" y="68" width="35" height="30" rx="3" fill="#374151" stroke="#10b981" strokeWidth="1"/>
    <text x="94" y="87" textAnchor="middle" fill="#94a3b8" fontSize="8">S2</text>
    <rect x="119" y="68" width="35" height="30" rx="3" fill="#374151" stroke="#10b981" strokeWidth="1"/>
    <text x="136" y="87" textAnchor="middle" fill="#94a3b8" fontSize="8">S3</text>
    <text x="95" y="115" textAnchor="middle" fill="#94a3b8" fontSize="8">Add more servers</text>
    <text x="95" y="130" textAnchor="middle" fill="#6b7280" fontSize="7">Better fault tolerance</text>
    <rect x="190" y="40" width="150" height="105" rx="6" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="2"/>
    <text x="265" y="58" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Vertical Scaling</text>
    <rect x="220" y="68" width="90" height="60" rx="3" fill="#374151" stroke="#f59e0b" strokeWidth="1"/>
    <text x="265" y="90" textAnchor="middle" fill="#fbbf24" fontSize="9">Server</text>
    <text x="265" y="105" textAnchor="middle" fill="#94a3b8" fontSize="7">+CPU +RAM</text>
    <text x="265" y="120" textAnchor="middle" fill="#94a3b8" fontSize="7">+Storage</text>
    <text x="265" y="140" textAnchor="middle" fill="#6b7280" fontSize="7">Limited by hardware</text>
    <rect x="360" y="40" width="150" height="105" rx="6" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="435" y="58" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Database Sharding</text>
    <rect x="370" y="68" width="40" height="25" rx="3" fill="#374151" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="390" y="85" textAnchor="middle" fill="#94a3b8" fontSize="7">Shard1</text>
    <rect x="420" y="68" width="40" height="25" rx="3" fill="#374151" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="440" y="85" textAnchor="middle" fill="#94a3b8" fontSize="7">Shard2</text>
    <rect x="470" y="68" width="40" height="25" rx="3" fill="#374151" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="490" y="85" textAnchor="middle" fill="#94a3b8" fontSize="7">Shard3</text>
    <text x="435" y="110" textAnchor="middle" fill="#94a3b8" fontSize="8">Partition by key</text>
    <text x="435" y="125" textAnchor="middle" fill="#6b7280" fontSize="7">Hash/Range/Geo</text>
    <rect x="530" y="40" width="150" height="105" rx="6" fill="#1e3a5f" stroke="#ec4899" strokeWidth="2"/>
    <text x="605" y="58" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold">Read Replicas</text>
    <rect x="550" y="68" width="50" height="30" rx="3" fill="#374151" stroke="#3b82f6" strokeWidth="1"/>
    <text x="575" y="87" textAnchor="middle" fill="#60a5fa" fontSize="7">Primary</text>
    <path d="M600 83 L620 73" stroke="#ec4899" strokeWidth="1"/>
    <path d="M600 83 L620 93" stroke="#ec4899" strokeWidth="1"/>
    <rect x="620" y="65" width="45" height="18" rx="2" fill="#374151"/>
    <text x="642" y="77" textAnchor="middle" fill="#94a3b8" fontSize="6">Replica</text>
    <rect x="620" y="85" width="45" height="18" rx="2" fill="#374151"/>
    <text x="642" y="97" textAnchor="middle" fill="#94a3b8" fontSize="6">Replica</text>
    <text x="605" y="120" textAnchor="middle" fill="#94a3b8" fontSize="8">Distribute reads</text>
    <text x="605" y="135" textAnchor="middle" fill="#6b7280" fontSize="7">Eventual consistency</text>
  </svg>
)

const HighAvailabilityDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="haGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#059669" stopOpacity="0.1"/>
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="690" height="150" rx="10" fill="url(#haGrad)" stroke="#10b981" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#34d399" fontSize="14" fontWeight="bold">High Availability Architecture</text>
    <rect x="280" y="35" width="140" height="35" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2"/>
    <text x="350" y="57" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Load Balancer</text>
    <path d="M320 70 L200 95" stroke="#3b82f6" strokeWidth="2"/>
    <path d="M350 70 L350 95" stroke="#3b82f6" strokeWidth="2"/>
    <path d="M380 70 L500 95" stroke="#3b82f6" strokeWidth="2"/>
    <rect x="130" y="95" width="140" height="55" rx="6" fill="#1e3a5f" stroke="#10b981" strokeWidth="2"/>
    <text x="200" y="115" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">Zone A</text>
    <rect x="140" y="120" width="55" height="25" rx="3" fill="#374151"/>
    <text x="167" y="136" textAnchor="middle" fill="#94a3b8" fontSize="7">Server 1</text>
    <rect x="205" y="120" width="55" height="25" rx="3" fill="#374151"/>
    <text x="232" y="136" textAnchor="middle" fill="#94a3b8" fontSize="7">Server 2</text>
    <rect x="280" y="95" width="140" height="55" rx="6" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="2"/>
    <text x="350" y="115" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Zone B</text>
    <rect x="290" y="120" width="55" height="25" rx="3" fill="#374151"/>
    <text x="317" y="136" textAnchor="middle" fill="#94a3b8" fontSize="7">Server 3</text>
    <rect x="355" y="120" width="55" height="25" rx="3" fill="#374151"/>
    <text x="382" y="136" textAnchor="middle" fill="#94a3b8" fontSize="7">Server 4</text>
    <rect x="430" y="95" width="140" height="55" rx="6" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="500" y="115" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Zone C</text>
    <rect x="440" y="120" width="55" height="25" rx="3" fill="#374151"/>
    <text x="467" y="136" textAnchor="middle" fill="#94a3b8" fontSize="7">Server 5</text>
    <rect x="505" y="120" width="55" height="25" rx="3" fill="#374151"/>
    <text x="532" y="136" textAnchor="middle" fill="#94a3b8" fontSize="7">Server 6</text>
    <rect x="590" y="60" width="95" height="85" rx="6" fill="#1e3a5f" stroke="#ef4444" strokeWidth="2"/>
    <text x="637" y="78" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">HA Metrics</text>
    <text x="637" y="95" textAnchor="middle" fill="#94a3b8" fontSize="7">99.9% = 8.76h/yr</text>
    <text x="637" y="110" textAnchor="middle" fill="#94a3b8" fontSize="7">99.99% = 52m/yr</text>
    <text x="637" y="125" textAnchor="middle" fill="#94a3b8" fontSize="7">99.999% = 5m/yr</text>
    <text x="637" y="140" textAnchor="middle" fill="#6b7280" fontSize="6">{`Failover &lt; 30s`}</text>
    <rect x="20" y="75" width="95" height="70" rx="6" fill="#1e3a5f" stroke="#ec4899" strokeWidth="2"/>
    <text x="67" y="93" textAnchor="middle" fill="#f472b6" fontSize="9" fontWeight="bold">Strategies</text>
    <text x="67" y="110" textAnchor="middle" fill="#94a3b8" fontSize="7">Active-Active</text>
    <text x="67" y="125" textAnchor="middle" fill="#94a3b8" fontSize="7">Active-Passive</text>
    <text x="67" y="140" textAnchor="middle" fill="#6b7280" fontSize="6">Auto failover</text>
  </svg>
)

const CachingDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="cacheGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#d97706" stopOpacity="0.1"/>
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="690" height="150" rx="10" fill="url(#cacheGrad)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#fbbf24" fontSize="14" fontWeight="bold">Caching Strategies</text>
    <rect x="20" y="40" width="100" height="50" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2"/>
    <text x="70" y="60" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Client</text>
    <text x="70" y="78" textAnchor="middle" fill="#94a3b8" fontSize="7">Browser Cache</text>
    <path d="M120 65 L160 65" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowCache)"/>
    <rect x="160" y="40" width="100" height="50" rx="6" fill="#1e3a5f" stroke="#10b981" strokeWidth="2"/>
    <text x="210" y="60" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">CDN</text>
    <text x="210" y="78" textAnchor="middle" fill="#94a3b8" fontSize="7">Edge Cache</text>
    <path d="M260 65 L300 65" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowCache2)"/>
    <rect x="300" y="40" width="100" height="50" rx="6" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="350" y="60" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">App Cache</text>
    <text x="350" y="78" textAnchor="middle" fill="#94a3b8" fontSize="7">Redis/Memcached</text>
    <path d="M400 65 L440 65" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowCache3)"/>
    <rect x="440" y="40" width="100" height="50" rx="6" fill="#1e3a5f" stroke="#ec4899" strokeWidth="2"/>
    <text x="490" y="60" textAnchor="middle" fill="#f472b6" fontSize="9" fontWeight="bold">Database</text>
    <text x="490" y="78" textAnchor="middle" fill="#94a3b8" fontSize="7">Query Cache</text>
    <rect x="20" y="100" width="130" height="45" rx="6" fill="#1e3a5f" stroke="#ef4444" strokeWidth="2"/>
    <text x="85" y="118" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">Cache-Aside</text>
    <text x="85" y="135" textAnchor="middle" fill="#94a3b8" fontSize="7">App manages cache</text>
    <rect x="165" y="100" width="130" height="45" rx="6" fill="#1e3a5f" stroke="#06b6d4" strokeWidth="2"/>
    <text x="230" y="118" textAnchor="middle" fill="#22d3ee" fontSize="9" fontWeight="bold">Write-Through</text>
    <text x="230" y="135" textAnchor="middle" fill="#94a3b8" fontSize="7">Sync write to cache+DB</text>
    <rect x="310" y="100" width="130" height="45" rx="6" fill="#1e3a5f" stroke="#84cc16" strokeWidth="2"/>
    <text x="375" y="118" textAnchor="middle" fill="#a3e635" fontSize="9" fontWeight="bold">Write-Behind</text>
    <text x="375" y="135" textAnchor="middle" fill="#94a3b8" fontSize="7">Async write to DB</text>
    <rect x="455" y="100" width="130" height="45" rx="6" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="2"/>
    <text x="520" y="118" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Read-Through</text>
    <text x="520" y="135" textAnchor="middle" fill="#94a3b8" fontSize="7">Cache loads from DB</text>
    <rect x="560" y="40" width="125" height="50" rx="6" fill="#1e3a5f" stroke="#ef4444" strokeWidth="2"/>
    <text x="622" y="58" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">Eviction</text>
    <text x="622" y="73" textAnchor="middle" fill="#94a3b8" fontSize="7">LRU / LFU / TTL</text>
    <text x="622" y="85" textAnchor="middle" fill="#6b7280" fontSize="6">Cache invalidation</text>
    <defs>
      <marker id="arrowCache" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/></marker>
      <marker id="arrowCache2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#10b981"/></marker>
      <marker id="arrowCache3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#8b5cf6"/></marker>
    </defs>
  </svg>
)

const LoadBalancingDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="lbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ec4899" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#db2777" stopOpacity="0.1"/>
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="690" height="150" rx="10" fill="url(#lbGrad)" stroke="#ec4899" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#f472b6" fontSize="14" fontWeight="bold">Load Balancing Strategies</text>
    <rect x="20" y="45" width="80" height="40" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2"/>
    <text x="60" y="70" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Clients</text>
    <path d="M100 65 L150 65" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowLB)"/>
    <rect x="150" y="35" width="130" height="120" rx="6" fill="#1e3a5f" stroke="#10b981" strokeWidth="2"/>
    <text x="215" y="55" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">Load Balancer</text>
    <text x="215" y="75" textAnchor="middle" fill="#94a3b8" fontSize="7">L4 (TCP/UDP)</text>
    <text x="215" y="90" textAnchor="middle" fill="#94a3b8" fontSize="7">L7 (HTTP/HTTPS)</text>
    <text x="215" y="108" textAnchor="middle" fill="#6b7280" fontSize="6">Health Checks</text>
    <text x="215" y="123" textAnchor="middle" fill="#6b7280" fontSize="6">SSL Termination</text>
    <text x="215" y="138" textAnchor="middle" fill="#6b7280" fontSize="6">Session Affinity</text>
    <path d="M280 55 L320 55" stroke="#10b981" strokeWidth="1"/>
    <path d="M280 75 L320 75" stroke="#10b981" strokeWidth="1"/>
    <path d="M280 95 L320 95" stroke="#10b981" strokeWidth="1"/>
    <rect x="320" y="40" width="70" height="30" rx="4" fill="#374151" stroke="#f59e0b" strokeWidth="1"/>
    <text x="355" y="59" textAnchor="middle" fill="#fbbf24" fontSize="8">Server 1</text>
    <rect x="320" y="75" width="70" height="30" rx="4" fill="#374151" stroke="#f59e0b" strokeWidth="1"/>
    <text x="355" y="94" textAnchor="middle" fill="#fbbf24" fontSize="8">Server 2</text>
    <rect x="320" y="110" width="70" height="30" rx="4" fill="#374151" stroke="#f59e0b" strokeWidth="1"/>
    <text x="355" y="129" textAnchor="middle" fill="#fbbf24" fontSize="8">Server 3</text>
    <rect x="410" y="40" width="130" height="50" rx="6" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="475" y="58" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Algorithms</text>
    <text x="475" y="75" textAnchor="middle" fill="#94a3b8" fontSize="7">Round Robin / Weighted</text>
    <text x="475" y="87" textAnchor="middle" fill="#6b7280" fontSize="6">Least Connections</text>
    <rect x="410" y="95" width="130" height="50" rx="6" fill="#1e3a5f" stroke="#ef4444" strokeWidth="2"/>
    <text x="475" y="113" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">Patterns</text>
    <text x="475" y="130" textAnchor="middle" fill="#94a3b8" fontSize="7">IP Hash / Geo-based</text>
    <text x="475" y="142" textAnchor="middle" fill="#6b7280" fontSize="6">Resource-based</text>
    <rect x="560" y="40" width="120" height="105" rx="6" fill="#1e3a5f" stroke="#06b6d4" strokeWidth="2"/>
    <text x="620" y="58" textAnchor="middle" fill="#22d3ee" fontSize="9" fontWeight="bold">Types</text>
    <text x="620" y="78" textAnchor="middle" fill="#94a3b8" fontSize="7">Hardware LB</text>
    <text x="620" y="93" textAnchor="middle" fill="#94a3b8" fontSize="7">Software LB</text>
    <text x="620" y="108" textAnchor="middle" fill="#94a3b8" fontSize="7">DNS LB</text>
    <text x="620" y="123" textAnchor="middle" fill="#94a3b8" fontSize="7">Cloud LB</text>
    <text x="620" y="138" textAnchor="middle" fill="#6b7280" fontSize="6">AWS ALB/NLB</text>
    <defs>
      <marker id="arrowLB" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/></marker>
    </defs>
  </svg>
)

const CAPTheoremDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="capGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#dc2626" stopOpacity="0.1"/>
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="690" height="150" rx="10" fill="url(#capGrad)" stroke="#ef4444" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#f87171" fontSize="14" fontWeight="bold">CAP Theorem - Pick Two</text>
    <polygon points="200,45 100,140 300,140" fill="none" stroke="#f87171" strokeWidth="2"/>
    <circle cx="200" cy="45" r="25" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2"/>
    <text x="200" y="42" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">C</text>
    <text x="200" y="55" textAnchor="middle" fill="#60a5fa" fontSize="7">Consistency</text>
    <circle cx="100" cy="140" r="25" fill="#1e3a5f" stroke="#10b981" strokeWidth="2"/>
    <text x="100" y="137" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">A</text>
    <text x="100" y="150" textAnchor="middle" fill="#34d399" fontSize="7">Availability</text>
    <circle cx="300" cy="140" r="25" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="2"/>
    <text x="300" y="137" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">P</text>
    <text x="300" y="150" textAnchor="middle" fill="#fbbf24" fontSize="7">Partition</text>
    <rect x="350" y="40" width="160" height="50" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2"/>
    <text x="430" y="58" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">CP Systems</text>
    <text x="430" y="75" textAnchor="middle" fill="#94a3b8" fontSize="7">MongoDB, HBase, Redis</text>
    <text x="430" y="87" textAnchor="middle" fill="#6b7280" fontSize="6">Strong consistency, may block</text>
    <rect x="350" y="95" width="160" height="50" rx="6" fill="#1e3a5f" stroke="#10b981" strokeWidth="2"/>
    <text x="430" y="113" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">AP Systems</text>
    <text x="430" y="130" textAnchor="middle" fill="#94a3b8" fontSize="7">Cassandra, DynamoDB, CouchDB</text>
    <text x="430" y="142" textAnchor="middle" fill="#6b7280" fontSize="6">Always available, eventual consistency</text>
    <rect x="530" y="40" width="150" height="105" rx="6" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="605" y="58" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Trade-offs</text>
    <text x="605" y="78" textAnchor="middle" fill="#94a3b8" fontSize="7">Network partitions</text>
    <text x="605" y="93" textAnchor="middle" fill="#94a3b8" fontSize="7">are inevitable</text>
    <text x="605" y="110" textAnchor="middle" fill="#6b7280" fontSize="7">Choose between</text>
    <text x="605" y="125" textAnchor="middle" fill="#6b7280" fontSize="7">C or A during</text>
    <text x="605" y="140" textAnchor="middle" fill="#6b7280" fontSize="7">partition</text>
  </svg>
)

const DatabaseDesignDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="dbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#0891b2" stopOpacity="0.1"/>
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="690" height="150" rx="10" fill="url(#dbGrad)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#22d3ee" fontSize="14" fontWeight="bold">Database Design Patterns</text>
    <rect x="20" y="40" width="130" height="105" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2"/>
    <text x="85" y="58" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">SQL (Relational)</text>
    <text x="85" y="78" textAnchor="middle" fill="#94a3b8" fontSize="7">ACID transactions</text>
    <text x="85" y="93" textAnchor="middle" fill="#94a3b8" fontSize="7">Strong consistency</text>
    <text x="85" y="108" textAnchor="middle" fill="#94a3b8" fontSize="7">Complex queries</text>
    <text x="85" y="123" textAnchor="middle" fill="#6b7280" fontSize="6">MySQL, PostgreSQL</text>
    <text x="85" y="138" textAnchor="middle" fill="#6b7280" fontSize="6">Oracle, SQL Server</text>
    <rect x="165" y="40" width="130" height="105" rx="6" fill="#1e3a5f" stroke="#10b981" strokeWidth="2"/>
    <text x="230" y="58" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">NoSQL Types</text>
    <text x="230" y="78" textAnchor="middle" fill="#94a3b8" fontSize="7">Document: MongoDB</text>
    <text x="230" y="93" textAnchor="middle" fill="#94a3b8" fontSize="7">Key-Value: Redis</text>
    <text x="230" y="108" textAnchor="middle" fill="#94a3b8" fontSize="7">Column: Cassandra</text>
    <text x="230" y="123" textAnchor="middle" fill="#94a3b8" fontSize="7">Graph: Neo4j</text>
    <text x="230" y="138" textAnchor="middle" fill="#6b7280" fontSize="6">Schema flexibility</text>
    <rect x="310" y="40" width="130" height="105" rx="6" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="2"/>
    <text x="375" y="58" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Indexing</text>
    <text x="375" y="78" textAnchor="middle" fill="#94a3b8" fontSize="7">B-Tree indexes</text>
    <text x="375" y="93" textAnchor="middle" fill="#94a3b8" fontSize="7">Composite indexes</text>
    <text x="375" y="108" textAnchor="middle" fill="#94a3b8" fontSize="7">Covering indexes</text>
    <text x="375" y="123" textAnchor="middle" fill="#94a3b8" fontSize="7">Full-text search</text>
    <text x="375" y="138" textAnchor="middle" fill="#6b7280" fontSize="6">Query optimization</text>
    <rect x="455" y="40" width="115" height="105" rx="6" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="512" y="58" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Normalization</text>
    <text x="512" y="78" textAnchor="middle" fill="#94a3b8" fontSize="7">1NF-3NF</text>
    <text x="512" y="93" textAnchor="middle" fill="#94a3b8" fontSize="7">Reduce redundancy</text>
    <text x="512" y="108" textAnchor="middle" fill="#94a3b8" fontSize="7">Data integrity</text>
    <text x="512" y="123" textAnchor="middle" fill="#6b7280" fontSize="6">Denormalize for</text>
    <text x="512" y="138" textAnchor="middle" fill="#6b7280" fontSize="6">read performance</text>
    <rect x="585" y="40" width="95" height="105" rx="6" fill="#1e3a5f" stroke="#ec4899" strokeWidth="2"/>
    <text x="632" y="58" textAnchor="middle" fill="#f472b6" fontSize="9" fontWeight="bold">Replication</text>
    <text x="632" y="78" textAnchor="middle" fill="#94a3b8" fontSize="7">Master-Slave</text>
    <text x="632" y="93" textAnchor="middle" fill="#94a3b8" fontSize="7">Multi-Master</text>
    <text x="632" y="108" textAnchor="middle" fill="#94a3b8" fontSize="7">Sync vs Async</text>
    <text x="632" y="123" textAnchor="middle" fill="#6b7280" fontSize="6">Read replicas</text>
    <text x="632" y="138" textAnchor="middle" fill="#6b7280" fontSize="6">Failover</text>
  </svg>
)

const DisasterRecoveryDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="drGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#dc2626" stopOpacity="0.1"/>
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="690" height="150" rx="10" fill="url(#drGrad)" stroke="#ef4444" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#f87171" fontSize="14" fontWeight="bold">Disaster Recovery Strategies</text>
    <rect x="20" y="40" width="130" height="105" rx="6" fill="#1e3a5f" stroke="#ef4444" strokeWidth="2"/>
    <text x="85" y="58" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">Backup and Restore</text>
    <text x="85" y="78" textAnchor="middle" fill="#94a3b8" fontSize="7">RTO: Hours</text>
    <text x="85" y="93" textAnchor="middle" fill="#94a3b8" fontSize="7">RPO: Hours</text>
    <text x="85" y="110" textAnchor="middle" fill="#6b7280" fontSize="6">Lowest cost</text>
    <text x="85" y="125" textAnchor="middle" fill="#6b7280" fontSize="6">Cold standby</text>
    <text x="85" y="140" textAnchor="middle" fill="#f87171" fontSize="7">$</text>
    <rect x="165" y="40" width="130" height="105" rx="6" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="2"/>
    <text x="230" y="58" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Pilot Light</text>
    <text x="230" y="78" textAnchor="middle" fill="#94a3b8" fontSize="7">RTO: 10s of min</text>
    <text x="230" y="93" textAnchor="middle" fill="#94a3b8" fontSize="7">RPO: Minutes</text>
    <text x="230" y="110" textAnchor="middle" fill="#6b7280" fontSize="6">Core services</text>
    <text x="230" y="125" textAnchor="middle" fill="#6b7280" fontSize="6">always running</text>
    <text x="230" y="140" textAnchor="middle" fill="#fbbf24" fontSize="7">$$</text>
    <rect x="310" y="40" width="130" height="105" rx="6" fill="#1e3a5f" stroke="#10b981" strokeWidth="2"/>
    <text x="375" y="58" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">Warm Standby</text>
    <text x="375" y="78" textAnchor="middle" fill="#94a3b8" fontSize="7">RTO: Minutes</text>
    <text x="375" y="93" textAnchor="middle" fill="#94a3b8" fontSize="7">RPO: Seconds</text>
    <text x="375" y="110" textAnchor="middle" fill="#6b7280" fontSize="6">Scaled-down</text>
    <text x="375" y="125" textAnchor="middle" fill="#6b7280" fontSize="6">full environment</text>
    <text x="375" y="140" textAnchor="middle" fill="#34d399" fontSize="7">$$$</text>
    <rect x="455" y="40" width="130" height="105" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2"/>
    <text x="520" y="58" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Multi-Site Active</text>
    <text x="520" y="78" textAnchor="middle" fill="#94a3b8" fontSize="7">RTO: Real-time</text>
    <text x="520" y="93" textAnchor="middle" fill="#94a3b8" fontSize="7">RPO: Zero</text>
    <text x="520" y="110" textAnchor="middle" fill="#6b7280" fontSize="6">Full redundancy</text>
    <text x="520" y="125" textAnchor="middle" fill="#6b7280" fontSize="6">Active-Active</text>
    <text x="520" y="140" textAnchor="middle" fill="#60a5fa" fontSize="7">$$$$</text>
    <rect x="600" y="40" width="85" height="105" rx="6" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="642" y="58" textAnchor="middle" fill="#a78bfa" fontSize="8" fontWeight="bold">Metrics</text>
    <text x="642" y="78" textAnchor="middle" fill="#94a3b8" fontSize="6">RTO: Recovery</text>
    <text x="642" y="90" textAnchor="middle" fill="#94a3b8" fontSize="6">Time Objective</text>
    <text x="642" y="108" textAnchor="middle" fill="#94a3b8" fontSize="6">RPO: Recovery</text>
    <text x="642" y="120" textAnchor="middle" fill="#94a3b8" fontSize="6">Point Objective</text>
    <text x="642" y="138" textAnchor="middle" fill="#6b7280" fontSize="5">Data loss tolerance</text>
  </svg>
)

const PerformanceDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="perfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#84cc16" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#65a30d" stopOpacity="0.1"/>
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="690" height="150" rx="10" fill="url(#perfGrad)" stroke="#84cc16" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#a3e635" fontSize="14" fontWeight="bold">Performance Optimization</text>
    <rect x="20" y="40" width="130" height="105" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2"/>
    <text x="85" y="58" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Caching</text>
    <text x="85" y="78" textAnchor="middle" fill="#94a3b8" fontSize="7">CDN edge cache</text>
    <text x="85" y="93" textAnchor="middle" fill="#94a3b8" fontSize="7">App-level cache</text>
    <text x="85" y="108" textAnchor="middle" fill="#94a3b8" fontSize="7">Query cache</text>
    <text x="85" y="123" textAnchor="middle" fill="#94a3b8" fontSize="7">Object cache</text>
    <text x="85" y="138" textAnchor="middle" fill="#6b7280" fontSize="6">Redis/Memcached</text>
    <rect x="165" y="40" width="130" height="105" rx="6" fill="#1e3a5f" stroke="#10b981" strokeWidth="2"/>
    <text x="230" y="58" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">Database</text>
    <text x="230" y="78" textAnchor="middle" fill="#94a3b8" fontSize="7">Index optimization</text>
    <text x="230" y="93" textAnchor="middle" fill="#94a3b8" fontSize="7">Query tuning</text>
    <text x="230" y="108" textAnchor="middle" fill="#94a3b8" fontSize="7">Connection pool</text>
    <text x="230" y="123" textAnchor="middle" fill="#94a3b8" fontSize="7">Read replicas</text>
    <text x="230" y="138" textAnchor="middle" fill="#6b7280" fontSize="6">Sharding</text>
    <rect x="310" y="40" width="130" height="105" rx="6" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="2"/>
    <text x="375" y="58" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Async Processing</text>
    <text x="375" y="78" textAnchor="middle" fill="#94a3b8" fontSize="7">Message queues</text>
    <text x="375" y="93" textAnchor="middle" fill="#94a3b8" fontSize="7">Event-driven</text>
    <text x="375" y="108" textAnchor="middle" fill="#94a3b8" fontSize="7">Background jobs</text>
    <text x="375" y="123" textAnchor="middle" fill="#94a3b8" fontSize="7">Batch processing</text>
    <text x="375" y="138" textAnchor="middle" fill="#6b7280" fontSize="6">Kafka/RabbitMQ</text>
    <rect x="455" y="40" width="115" height="105" rx="6" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="512" y="58" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Network</text>
    <text x="512" y="78" textAnchor="middle" fill="#94a3b8" fontSize="7">Compression</text>
    <text x="512" y="93" textAnchor="middle" fill="#94a3b8" fontSize="7">HTTP/2, HTTP/3</text>
    <text x="512" y="108" textAnchor="middle" fill="#94a3b8" fontSize="7">Connection reuse</text>
    <text x="512" y="123" textAnchor="middle" fill="#94a3b8" fontSize="7">Edge computing</text>
    <text x="512" y="138" textAnchor="middle" fill="#6b7280" fontSize="6">gRPC</text>
    <rect x="585" y="40" width="95" height="105" rx="6" fill="#1e3a5f" stroke="#ec4899" strokeWidth="2"/>
    <text x="632" y="58" textAnchor="middle" fill="#f472b6" fontSize="9" fontWeight="bold">Metrics</text>
    <text x="632" y="78" textAnchor="middle" fill="#94a3b8" fontSize="7">Latency p50/99</text>
    <text x="632" y="93" textAnchor="middle" fill="#94a3b8" fontSize="7">Throughput</text>
    <text x="632" y="108" textAnchor="middle" fill="#94a3b8" fontSize="7">Error rate</text>
    <text x="632" y="123" textAnchor="middle" fill="#94a3b8" fontSize="7">Saturation</text>
    <text x="632" y="138" textAnchor="middle" fill="#6b7280" fontSize="6">RED/USE</text>
  </svg>
)

const CalculationsDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="calcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f472b6" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#ec4899" stopOpacity="0.1"/>
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="690" height="150" rx="10" fill="url(#calcGrad)" stroke="#ec4899" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#f472b6" fontSize="14" fontWeight="bold">System Design Calculations</text>
    <rect x="20" y="40" width="150" height="105" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2"/>
    <text x="95" y="58" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Traffic Estimates</text>
    <text x="95" y="78" textAnchor="middle" fill="#94a3b8" fontSize="7">DAU x actions/user</text>
    <text x="95" y="93" textAnchor="middle" fill="#94a3b8" fontSize="7">= requests/day</text>
    <text x="95" y="110" textAnchor="middle" fill="#6b7280" fontSize="6">Peak = 3x average</text>
    <text x="95" y="125" textAnchor="middle" fill="#6b7280" fontSize="6">QPS = reqs/86400</text>
    <text x="95" y="140" textAnchor="middle" fill="#60a5fa" fontSize="6">1M DAU = ~12 QPS</text>
    <rect x="185" y="40" width="150" height="105" rx="6" fill="#1e3a5f" stroke="#10b981" strokeWidth="2"/>
    <text x="260" y="58" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">Storage Estimates</text>
    <text x="260" y="78" textAnchor="middle" fill="#94a3b8" fontSize="7">objects x size x years</text>
    <text x="260" y="93" textAnchor="middle" fill="#94a3b8" fontSize="7">+ replication factor</text>
    <text x="260" y="110" textAnchor="middle" fill="#6b7280" fontSize="6">1KB x 1M/day x 365</text>
    <text x="260" y="125" textAnchor="middle" fill="#6b7280" fontSize="6">= 365 GB/year</text>
    <text x="260" y="140" textAnchor="middle" fill="#34d399" fontSize="6">x 3 replicas = 1TB</text>
    <rect x="350" y="40" width="150" height="105" rx="6" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="2"/>
    <text x="425" y="58" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Bandwidth</text>
    <text x="425" y="78" textAnchor="middle" fill="#94a3b8" fontSize="7">QPS x response size</text>
    <text x="425" y="93" textAnchor="middle" fill="#94a3b8" fontSize="7">= bytes/second</text>
    <text x="425" y="110" textAnchor="middle" fill="#6b7280" fontSize="6">1000 QPS x 1KB</text>
    <text x="425" y="125" textAnchor="middle" fill="#6b7280" fontSize="6">= 1 MB/s = 8 Mbps</text>
    <text x="425" y="140" textAnchor="middle" fill="#fbbf24" fontSize="6">Peak: 24 Mbps</text>
    <rect x="515" y="40" width="165" height="105" rx="6" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="597" y="58" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Memory/Cache</text>
    <text x="597" y="78" textAnchor="middle" fill="#94a3b8" fontSize="7">20% of data = hot data</text>
    <text x="597" y="93" textAnchor="middle" fill="#94a3b8" fontSize="7">Cache hit ratio: 80%+</text>
    <text x="597" y="110" textAnchor="middle" fill="#6b7280" fontSize="6">1TB data = 200GB cache</text>
    <text x="597" y="125" textAnchor="middle" fill="#6b7280" fontSize="6">Key size: ~100 bytes</text>
    <text x="597" y="140" textAnchor="middle" fill="#a78bfa" fontSize="6">1B keys = 100GB</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function SystemDesign({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'scalability',
      name: 'Scalability',
      icon: '📈',
      color: '#3b82f6',
      description: 'Horizontal and vertical scaling strategies for handling increased load and traffic growth.',
      diagram: ScalabilityDiagram,
      details: [
        {
          name: 'Horizontal Scaling',
          explanation: 'Horizontal scaling (scale-out) adds more servers to distribute the load. This approach provides better fault tolerance since if one server fails, others can handle the traffic. It is preferred for cloud environments because you can dynamically add or remove instances based on demand. Challenges include state management (sessions must be externalized) and data consistency across nodes.',
          codeExample: `// Spring Cloud LoadBalancer - Horizontal Scaling
@Configuration
public class LoadBalancerConfig {

  @Bean
  @LoadBalanced
  public RestTemplate restTemplate() {
    return new RestTemplate();
  }
}

@Service
public class UserService {
  @Autowired
  @LoadBalanced
  private RestTemplate restTemplate;

  public User getUser(Long id) {
    // Load balancer distributes across instances
    return restTemplate.getForObject(
      "http://user-service/api/users/" + id,
      User.class
    );
  }
}`
        },
        {
          name: 'Vertical Scaling',
          explanation: 'Vertical scaling (scale-up) adds more resources (CPU, RAM, storage) to existing servers. It is simpler to implement but has hardware limits. Suitable for databases and applications with state that is difficult to distribute. Consider vertical scaling when horizontal scaling introduces too much complexity or when the application is not designed for distribution.',
          codeExample: `// Vertical Scaling - Resource Configuration
@Configuration
public class VerticalScalingConfig {

  @Bean
  public ThreadPoolTaskExecutor taskExecutor() {
    ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
    executor.setCorePoolSize(20);      // Increased cores
    executor.setMaxPoolSize(100);      // Higher max
    executor.setQueueCapacity(500);    // Larger queue
    executor.initialize();
    return executor;
  }

  @Bean
  public HikariDataSource dataSource() {
    HikariConfig config = new HikariConfig();
    config.setMaximumPoolSize(50);     // More connections
    config.setMinimumIdle(20);
    return new HikariDataSource(config);
  }
}`
        },
        {
          name: 'Database Sharding',
          explanation: 'Database sharding partitions data across multiple database instances using a shard key. Common strategies include hash-based (user_id % num_shards), range-based (dates, alphabetical), and geographic sharding. Sharding enables horizontal scaling of databases but introduces complexity for cross-shard queries and transactions. Choose shard keys carefully to ensure even distribution and minimize cross-shard operations.',
          codeExample: `// Database Sharding Strategy
@Service
public class ShardingService {

  private final Map<Integer, DataSource> shards = new HashMap<>();

  public ShardingService() {
    shards.put(0, createDataSource("shard-0"));
    shards.put(1, createDataSource("shard-1"));
    shards.put(2, createDataSource("shard-2"));
  }

  // Hash-based sharding
  public int getShardId(Long userId) {
    return Math.abs(userId.hashCode() % shards.size());
  }

  // Range-based sharding
  public int getShardByRange(Long userId) {
    if (userId < 1000000) return 0;
    if (userId < 2000000) return 1;
    return 2;
  }

  // Geographic sharding
  public int getShardByRegion(String region) {
    return switch (region) {
      case "US-EAST" -> 0;
      case "EU" -> 1;
      case "ASIA" -> 2;
      default -> 0;
    };
  }
}`
        }
      ]
    },
    {
      id: 'high-availability',
      name: 'High Availability',
      icon: '🔄',
      color: '#10b981',
      description: 'Ensuring system uptime and reliability through redundancy, failover, and fault tolerance mechanisms.',
      diagram: HighAvailabilityDiagram,
      details: [
        {
          name: 'Redundancy Patterns',
          explanation: 'High Availability eliminates single points of failure through redundancy. Active-Active configurations have all nodes serving traffic simultaneously, providing better resource utilization. Active-Passive has standby nodes that activate on failure. Multi-zone deployment distributes across availability zones for regional resilience. Target availability levels: 99.9% (8.76h/yr downtime), 99.99% (52min/yr), 99.999% (5min/yr).',
          codeExample: `// Active-Active Kubernetes Deployment
/*
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
spec:
  replicas: 3  # Multiple active instances
  selector:
    matchLabels:
      app: user-service
  template:
    spec:
      affinity:
        podAntiAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
          - labelSelector:
              matchLabels:
                app: user-service
            topologyKey: "topology.kubernetes.io/zone"
      containers:
      - name: user-service
        image: user-service:latest
        livenessProbe:
          httpGet:
            path: /health/live
            port: 8080
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health/ready
            port: 8080
          periodSeconds: 5
*/`
        },
        {
          name: 'Circuit Breaker Pattern',
          explanation: 'Circuit breakers prevent cascading failures by stopping requests to failing services. When the failure rate exceeds a threshold, the circuit opens and rejects requests immediately. After a timeout, it enters half-open state to test if the service has recovered. Libraries like Resilience4j provide circuit breaker implementations with configurable thresholds, timeouts, and fallback methods.',
          codeExample: `// Resilience4j Circuit Breaker
@Service
public class PaymentService {

  private final CircuitBreaker circuitBreaker;

  public PaymentService(CircuitBreakerRegistry registry) {
    this.circuitBreaker = registry.circuitBreaker("payment");
  }

  public PaymentResponse process(PaymentRequest request) {
    return circuitBreaker.executeSupplier(() -> {
      return restTemplate.postForObject(
        "http://payment-gateway/process",
        request,
        PaymentResponse.class
      );
    });
  }

  // With fallback
  public PaymentResponse processWithFallback(PaymentRequest req) {
    return Try.ofSupplier(
      CircuitBreaker.decorateSupplier(circuitBreaker,
        () -> callPaymentGateway(req)))
      .recover(ex -> {
        log.warn("Fallback triggered", ex);
        return PaymentResponse.pending();
      }).get();
  }
}`
        },
        {
          name: 'Health Checks and Failover',
          explanation: 'Health checks monitor service availability. Liveness probes determine if an application is running. Readiness probes determine if it can serve traffic. Failover mechanisms automatically redirect traffic to healthy instances. Implement health endpoints that check database connectivity, cache availability, and external dependencies. Configure appropriate timeouts and retry policies.',
          codeExample: `// Health Check Implementation
@RestController
public class HealthController {

  @Autowired
  private DataSource dataSource;
  @Autowired
  private RedisTemplate<String, String> redis;

  @GetMapping("/health")
  public ResponseEntity<HealthStatus> health() {
    HealthStatus status = new HealthStatus();

    // Check database
    try (Connection conn = dataSource.getConnection()) {
      status.setDatabase("UP");
    } catch (SQLException e) {
      status.setDatabase("DOWN");
      status.setHealthy(false);
    }

    // Check cache
    try {
      redis.opsForValue().get("health-check");
      status.setCache("UP");
    } catch (Exception e) {
      status.setCache("DOWN");
      status.setHealthy(false);
    }

    return status.isHealthy()
      ? ResponseEntity.ok(status)
      : ResponseEntity.status(503).body(status);
  }
}`
        }
      ]
    },
    {
      id: 'caching',
      name: 'Caching Strategies',
      icon: '⚡',
      color: '#f59e0b',
      description: 'Cache patterns for improving performance by storing frequently accessed data in fast storage.',
      diagram: CachingDiagram,
      details: [
        {
          name: 'Cache-Aside Pattern',
          explanation: 'Cache-aside (lazy loading) is the most common caching pattern. The application first checks the cache; on a miss, it loads from the database and populates the cache. The application manages both cache reads and writes. This pattern is simple but requires handling cache invalidation carefully. Works well for read-heavy workloads where data changes infrequently.',
          codeExample: `// Cache-Aside Pattern
@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;
  @Autowired
  private RedisTemplate<String, User> redisTemplate;

  private static final long CACHE_TTL = 3600; // 1 hour

  public User getUserById(Long id) {
    String cacheKey = "user:" + id;

    // Try cache first
    User cached = redisTemplate.opsForValue().get(cacheKey);
    if (cached != null) {
      log.debug("Cache hit for user: {}", id);
      return cached;
    }

    // Cache miss - load from database
    log.debug("Cache miss for user: {}", id);
    User user = userRepository.findById(id).orElseThrow();

    // Update cache
    redisTemplate.opsForValue().set(
      cacheKey, user, CACHE_TTL, TimeUnit.SECONDS);

    return user;
  }
}`
        },
        {
          name: 'Write-Through and Write-Behind',
          explanation: 'Write-through updates cache and database synchronously, ensuring consistency but adding latency. Write-behind (write-back) writes to cache immediately and asynchronously persists to database, providing better write performance but risking data loss. Choose write-through for critical data requiring consistency; use write-behind for high-throughput scenarios where eventual consistency is acceptable.',
          codeExample: `// Write-Through Pattern
@Service
public class WriteThroughService {

  @Transactional
  public Product updateProduct(Product product) {
    // Write to database first
    Product saved = productRepository.save(product);

    // Write to cache synchronously
    String key = "product:" + product.getId();
    redisTemplate.opsForValue().set(key, saved, 1, TimeUnit.HOURS);

    return saved;
  }
}

// Write-Behind Pattern
@Service
public class WriteBehindService {

  private final BlockingQueue<Order> writeQueue =
    new LinkedBlockingQueue<>();

  public Order createOrder(Order order) {
    // Write to cache immediately
    String key = "order:" + order.getId();
    redisTemplate.opsForValue().set(key, order);

    // Queue for async database write
    writeQueue.offer(order);

    return order;  // Return immediately
  }

  @Async
  public void processQueue() {
    Order order = writeQueue.take();
    orderRepository.save(order);
  }
}`
        },
        {
          name: 'Cache Invalidation',
          explanation: 'Cache invalidation is one of the hardest problems in computing. Strategies include TTL-based expiration (simple but may serve stale data), event-based invalidation (accurate but requires infrastructure), and pattern-based invalidation (flexible but can be slow). For distributed systems, consider using pub/sub for cache invalidation events. Always have a fallback for cache failures.',
          codeExample: `// Cache Invalidation Strategies
@Service
public class CacheInvalidationService {

  // TTL-based invalidation
  public void setWithTtl(String key, Object value, long ttl) {
    redisTemplate.opsForValue().set(
      key, value, ttl, TimeUnit.SECONDS);
  }

  // Event-based invalidation
  @EventListener
  public void onUserUpdated(UserUpdatedEvent event) {
    String key = "user:" + event.getUserId();
    redisTemplate.delete(key);
    log.info("Cache invalidated for user: {}", event.getUserId());
  }

  // Pattern-based invalidation
  public void invalidateByPattern(String pattern) {
    Set<String> keys = redisTemplate.keys(pattern);
    if (keys != null && !keys.isEmpty()) {
      redisTemplate.delete(keys);
      log.info("Invalidated {} keys", keys.size());
    }
  }

  // Spring Cache annotations
  @CacheEvict(value = "users", key = "#id")
  public void deleteUser(Long id) {
    userRepository.deleteById(id);
  }
}`
        }
      ]
    },
    {
      id: 'load-balancing',
      name: 'Load Balancing',
      icon: '⚖️',
      color: '#ec4899',
      description: 'Distributing traffic across multiple servers to optimize resource usage and ensure high availability.',
      diagram: LoadBalancingDiagram,
      details: [
        {
          name: 'Load Balancing Algorithms',
          explanation: 'Round-robin distributes requests sequentially across servers, simple but ignores server capacity. Weighted round-robin assigns more traffic to powerful servers. Least connections routes to the server with fewest active connections, good for varying request complexity. IP hash ensures the same client always reaches the same server, useful for session persistence.',
          codeExample: `// Custom Load Balancer Implementation
public class CustomLoadBalancer {

  private final List<Server> servers = new CopyOnWriteArrayList<>();
  private final AtomicInteger currentIndex = new AtomicInteger(0);

  // Round-robin algorithm
  public Server roundRobin() {
    int index = currentIndex.getAndIncrement() % servers.size();
    return servers.get(index);
  }

  // Least connections
  public Server leastConnections() {
    return servers.stream()
      .filter(Server::isHealthy)
      .min(Comparator.comparingInt(Server::getActiveConnections))
      .orElseThrow(NoAvailableServersException::new);
  }

  // Weighted round-robin
  public Server weightedRoundRobin() {
    int totalWeight = servers.stream()
      .mapToInt(Server::getWeight).sum();
    int random = ThreadLocalRandom.current().nextInt(totalWeight);
    int weightSum = 0;
    for (Server server : servers) {
      weightSum += server.getWeight();
      if (random < weightSum) return server;
    }
    return servers.get(0);
  }
}`
        },
        {
          name: 'L4 vs L7 Load Balancing',
          explanation: 'Layer 4 (L4) load balancing operates at the transport layer (TCP/UDP), making routing decisions based on IP addresses and ports. It is faster but less flexible. Layer 7 (L7) operates at the application layer (HTTP/HTTPS), enabling content-based routing, SSL termination, and advanced features. Use L4 for raw performance; use L7 for application-aware routing.',
          codeExample: `# Nginx L7 Load Balancer Configuration
upstream backend {
  # Round-robin (default)
  server backend1.example.com:8080;
  server backend2.example.com:8080;
}

upstream weighted_backend {
  server backend1.example.com:8080 weight=3;
  server backend2.example.com:8080 weight=1;
}

upstream least_conn_backend {
  least_conn;
  server backend1.example.com:8080;
  server backend2.example.com:8080;
}

server {
  listen 80;

  # L7 routing based on URI
  location /api/ {
    proxy_pass http://backend;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }

  location /admin/ {
    proxy_pass http://admin_backend;
  }
}`
        },
        {
          name: 'Sticky Sessions',
          explanation: 'Sticky sessions (session affinity) route requests from the same client to the same server, maintaining session state. Implemented via cookies or IP hashing. While useful for stateful applications, it reduces load distribution effectiveness and complicates failover. Consider externalizing session state to Redis/Memcached for better scalability and fault tolerance.',
          codeExample: `// Sticky Session Implementation
@Component
public class StickySessionLoadBalancer {

  private final Map<String, Server> sessionToServer =
    new ConcurrentHashMap<>();
  private final LoadBalancer loadBalancer;

  public Server getServer(String sessionId) {
    // Check if session already mapped
    if (sessionId != null && sessionToServer.containsKey(sessionId)) {
      Server server = sessionToServer.get(sessionId);
      if (server.isHealthy()) {
        return server;
      }
    }

    // Assign new server
    Server server = loadBalancer.selectServer();
    if (sessionId != null) {
      sessionToServer.put(sessionId, server);
    }
    return server;
  }

  public void removeSession(String sessionId) {
    sessionToServer.remove(sessionId);
  }
}

# Kubernetes sticky sessions
apiVersion: v1
kind: Service
spec:
  sessionAffinity: ClientIP
  sessionAffinityConfig:
    clientIP:
      timeoutSeconds: 10800`
        }
      ]
    },
    {
      id: 'cap-theorem',
      name: 'CAP Theorem',
      icon: '🔺',
      color: '#ef4444',
      description: 'Understanding the trade-offs between Consistency, Availability, and Partition Tolerance in distributed systems.',
      diagram: CAPTheoremDiagram,
      details: [
        {
          name: 'CAP Trade-offs',
          explanation: 'CAP theorem states that distributed systems can only guarantee two of three properties: Consistency (all nodes see the same data), Availability (every request receives a response), and Partition Tolerance (system works despite network failures). Since network partitions are inevitable in distributed systems, you must choose between CP (consistent but may be unavailable) or AP (available but eventually consistent).',
          codeExample: `// CP System - Strong Consistency (Banking)
@Service
@Transactional
public class BankingService {

  public void transfer(Long fromId, Long toId, BigDecimal amount) {
    // Acquire locks in order to prevent deadlock
    Long firstLock = Math.min(fromId, toId);
    Long secondLock = Math.max(fromId, toId);

    synchronized (getLock(firstLock)) {
      synchronized (getLock(secondLock)) {
        Account from = accountRepository.findById(fromId).orElseThrow();
        Account to = accountRepository.findById(toId).orElseThrow();

        if (from.getBalance().compareTo(amount) < 0) {
          throw new InsufficientFundsException();
        }

        // Both updates happen atomically
        from.setBalance(from.getBalance().subtract(amount));
        to.setBalance(to.getBalance().add(amount));

        accountRepository.save(from);
        accountRepository.save(to);
      }
    }
  }
}`
        },
        {
          name: 'Eventual Consistency',
          explanation: 'Eventual consistency accepts that updates may not be immediately visible to all nodes, but the system will eventually converge to a consistent state. Used by AP systems like Cassandra and DynamoDB. Suitable for social media feeds, product catalogs, and analytics. Implement conflict resolution using strategies like last-write-wins (LWW) or CRDTs (Conflict-free Replicated Data Types).',
          codeExample: `// AP System - Eventual Consistency (Social Media)
@Service
public class SocialMediaService {

  @Autowired
  private KafkaTemplate<String, PostEvent> kafkaTemplate;

  public Post createPost(Post post) {
    // Write to local database (available)
    Post saved = postRepository.save(post);

    // Asynchronously propagate to other regions
    PostEvent event = new PostEvent(saved.getId(), saved.getContent());
    kafkaTemplate.send("post-events", event);

    // Return immediately without waiting
    return saved;
  }

  @KafkaListener(topics = "post-events")
  public void handlePostEvent(PostEvent event) {
    // Eventually consistent - update local copy
    Post post = new Post();
    post.setId(event.getPostId());
    post.setContent(event.getContent());
    postRepository.save(post);
  }
}`
        },
        {
          name: 'Quorum and Consensus',
          explanation: 'Quorum-based systems require a majority of nodes to agree before committing operations. Write quorum (W) and read quorum (R) can be tuned: W + R > N ensures strong consistency. Consensus protocols like Raft and Paxos provide strong consistency guarantees. BASE (Basically Available, Soft state, Eventual consistency) is an alternative to ACID for distributed systems that prioritizes availability.',
          codeExample: `// Quorum-based Consistency
@Service
public class QuorumService {

  private final List<DataNode> nodes;
  private final int writeQuorum;
  private final int readQuorum;

  public QuorumService(List<DataNode> nodes) {
    this.nodes = nodes;
    // W + R > N ensures consistency
    this.writeQuorum = (nodes.size() / 2) + 1;
    this.readQuorum = (nodes.size() / 2) + 1;
  }

  public void write(String key, String value) {
    int successCount = 0;
    for (DataNode node : nodes) {
      try {
        if (node.write(key, value)) {
          successCount++;
          if (successCount >= writeQuorum) {
            return;  // Quorum reached
          }
        }
      } catch (Exception e) {
        log.warn("Write failed on node", e);
      }
    }
    throw new QuorumNotReachedException();
  }
}`
        }
      ]
    },
    {
      id: 'database-design',
      name: 'Database Design',
      icon: '🗄️',
      color: '#06b6d4',
      description: 'SQL vs NoSQL, indexing strategies, normalization, and data modeling patterns.',
      diagram: DatabaseDesignDiagram,
      details: [
        {
          name: 'SQL vs NoSQL',
          explanation: 'SQL databases (MySQL, PostgreSQL) provide ACID transactions, strong consistency, and complex query capabilities through structured schemas. NoSQL databases offer flexibility and horizontal scalability. Document stores (MongoDB) store JSON-like documents. Key-value stores (Redis) provide fast lookups. Column stores (Cassandra) excel at time-series data. Graph databases (Neo4j) handle relationship-heavy data.',
          codeExample: `// SQL - Relational Database with JPA
@Entity
@Table(name = "orders")
public class Order {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
  @JoinColumn(name = "order_id")
  private List<OrderItem> items = new ArrayList<>();

  @Column(nullable = false)
  private BigDecimal totalAmount;

  @Enumerated(EnumType.STRING)
  private OrderStatus status;
}

// NoSQL - MongoDB Document
{
  "_id": ObjectId("..."),
  "userId": "user123",
  "items": [
    { "productId": "prod1", "quantity": 2, "price": 29.99 },
    { "productId": "prod2", "quantity": 1, "price": 49.99 }
  ],
  "totalAmount": 109.97,
  "status": "PENDING",
  "createdAt": ISODate("2024-01-15T10:30:00Z")
}`
        },
        {
          name: 'Indexing Strategies',
          explanation: 'Indexes accelerate query performance by creating sorted data structures. B-tree indexes are most common, suitable for equality and range queries. Composite indexes cover multiple columns (order matters). Covering indexes include all query columns, avoiding table lookups. Full-text indexes enable text search. Monitor index usage and remove unused indexes that slow down writes.',
          codeExample: `-- Create indexes on frequently queried columns
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);

-- Composite index for multiple columns
-- Supports: WHERE user_id = ? AND status = ?
CREATE INDEX idx_orders_user_status ON orders(user_id, status);

-- Covering index includes all query columns
CREATE INDEX idx_orders_covering
  ON orders(user_id, created_at, status, total_amount);

-- Check index usage
EXPLAIN ANALYZE
SELECT * FROM orders
WHERE user_id = 123 AND status = 'PENDING';

-- View all indexes
SHOW INDEX FROM orders;

-- Remove unused indexes
DROP INDEX idx_old_unused ON orders;`
        },
        {
          name: 'Data Modeling Patterns',
          explanation: 'Normalization (1NF-3NF) reduces data redundancy and maintains integrity but may require joins that impact performance. Denormalization duplicates data for read performance, common in NoSQL and read-heavy systems. Use embedded documents in MongoDB for one-to-few relationships. Use references for one-to-many or many-to-many. Consider CQRS (Command Query Responsibility Segregation) to separate read and write models.',
          codeExample: `// CQRS - Separate Read/Write Models
// Command Model - Normalized for writes
@Entity
@Table(name = "orders")
public class OrderCommand {
  @Id private Long id;
  private Long userId;
  private BigDecimal totalAmount;
  @Version private Long version;
}

// Query Model - Denormalized for reads
@Entity
@Table(name = "order_views")
public class OrderView {
  @Id private Long orderId;
  private String userName;
  private String userEmail;
  private List<String> productNames;
  private BigDecimal totalAmount;
  private String status;
}

// Event handler to sync models
@EventListener
public void onOrderCreated(OrderCreatedEvent event) {
  Order order = event.getOrder();
  User user = userRepository.findById(order.getUserId());

  OrderView view = new OrderView();
  view.setOrderId(order.getId());
  view.setUserName(user.getName());
  view.setTotalAmount(order.getTotalAmount());

  orderViewRepository.save(view);
}`
        }
      ]
    },
    {
      id: 'disaster-recovery',
      name: 'Disaster Recovery',
      icon: '🛡️',
      color: '#ef4444',
      description: 'Planning for system failures with backup strategies, RTO/RPO objectives, and multi-region deployment.',
      diagram: DisasterRecoveryDiagram,
      details: [
        {
          name: 'RTO and RPO',
          explanation: 'Recovery Time Objective (RTO) is the maximum acceptable downtime before business impact becomes unacceptable. Recovery Point Objective (RPO) is the maximum acceptable data loss measured in time. These metrics guide backup frequency, infrastructure investment, and DR strategy selection. A 4-hour RTO means you must recover within 4 hours. A 1-hour RPO means you can lose at most 1 hour of data.',
          codeExample: `// RTO/RPO Configuration
@Configuration
public class DisasterRecoveryConfig {

  // RTO: 4 hours - Maximum acceptable downtime
  private final Duration RTO = Duration.ofHours(4);

  // RPO: 1 hour - Maximum acceptable data loss
  private final Duration RPO = Duration.ofHours(1);

  @Bean
  public BackupScheduler backupScheduler() {
    // Backup frequency based on RPO
    return new BackupScheduler(RPO);
  }

  @Bean
  public FailoverCoordinator failoverCoordinator() {
    // Failover must complete within RTO
    return new FailoverCoordinator(RTO);
  }
}

// DR Strategy Tiers:
// Backup/Restore: RTO hours, RPO hours, Cost $
// Pilot Light:    RTO ~10min, RPO minutes, Cost $$
// Warm Standby:   RTO minutes, RPO seconds, Cost $$$
// Multi-Site:     RTO real-time, RPO zero, Cost $$$$`
        },
        {
          name: 'Backup Strategies',
          explanation: 'Full backups capture the entire database but are slow and storage-intensive. Incremental backups capture only changes since the last backup, faster but require full backup for restore. Differential backups capture changes since the last full backup. Point-in-time recovery uses transaction logs to restore to any moment. Store backups in multiple locations, including off-site/cloud storage.',
          codeExample: `// Backup Service Implementation
@Service
public class BackupService {

  @Scheduled(cron = "0 0 2 * * ?")  // Daily at 2 AM
  public void performFullBackup() {
    String timestamp = LocalDateTime.now()
      .format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
    String backupFile = "backup_full_" + timestamp + ".sql";

    ProcessBuilder pb = new ProcessBuilder(
      "mysqldump",
      "--host=" + dbHost,
      "--databases", dbName,
      "--result-file=" + backupFile
    );

    Process process = pb.start();
    if (process.waitFor() == 0) {
      uploadToS3(backupFile);
      log.info("Full backup completed: {}", backupFile);
    }
  }

  @Scheduled(cron = "0 0 */6 * * ?")  // Every 6 hours
  public void performIncrementalBackup() {
    // Binary log-based incremental backup
    mysqlBinlogBackup(backupFile);
    uploadToS3(backupFile);
  }
}`
        },
        {
          name: 'Multi-Region Failover',
          explanation: 'Multi-region deployment provides geographic redundancy against regional failures. Active-passive has a standby region that activates on failure. Active-active serves traffic from multiple regions with data replication. Implement health monitoring and automated failover. Test failover procedures regularly through DR drills. Consider data sovereignty and latency requirements when choosing regions.',
          codeExample: `// Multi-Region Failover Service
@Service
public class MultiRegionService {

  private final Map<String, RegionEndpoint> regions = Map.of(
    "us-east-1", new RegionEndpoint("https://api.us-east-1.example.com"),
    "us-west-2", new RegionEndpoint("https://api.us-west-2.example.com"),
    "eu-west-1", new RegionEndpoint("https://api.eu-west-1.example.com")
  );
  private volatile String primaryRegion = "us-east-1";

  public <T> T executeRequest(Function<RegionEndpoint, T> request) {
    try {
      return request.apply(regions.get(primaryRegion));
    } catch (Exception e) {
      log.error("Primary region failed, failing over", e);
      return executeWithFailover(request);
    }
  }

  private <T> T executeWithFailover(Function<RegionEndpoint, T> request) {
    for (var entry : regions.entrySet()) {
      if (entry.getKey().equals(primaryRegion)) continue;
      try {
        T result = request.apply(entry.getValue());
        log.info("Failover to region: {}", entry.getKey());
        primaryRegion = entry.getKey();
        return result;
      } catch (Exception e) {
        log.warn("Failover to {} failed", entry.getKey());
      }
    }
    throw new AllRegionsFailedException();
  }
}`
        }
      ]
    },
    {
      id: 'performance',
      name: 'Performance Optimization',
      icon: '🚀',
      color: '#84cc16',
      description: 'System performance tuning through caching, query optimization, async processing, and profiling.',
      diagram: PerformanceDiagram,
      details: [
        {
          name: 'Database Performance',
          explanation: 'Database performance optimization starts with proper indexing on WHERE, JOIN, and ORDER BY columns. Use EXPLAIN to analyze query plans. Avoid SELECT * and N+1 query problems. Configure connection pools appropriately (HikariCP). Use read replicas for read-heavy workloads. Consider query caching for frequently executed queries. Monitor slow query logs to identify bottlenecks.',
          codeExample: `// Connection Pool - HikariCP Configuration
@Configuration
public class DataSourceConfig {

  @Bean
  public DataSource dataSource() {
    HikariConfig config = new HikariConfig();
    config.setJdbcUrl("jdbc:mysql://localhost:3306/mydb");

    // Performance tuning
    config.setMaximumPoolSize(20);
    config.setMinimumIdle(5);
    config.setConnectionTimeout(30000);
    config.setIdleTimeout(600000);

    // Statement caching
    config.setCachePrepStmts(true);
    config.setPrepStmtCacheSize(250);
    config.setPrepStmtCacheSqlLimit(2048);

    return new HikariDataSource(config);
  }
}

// Avoid N+1 Query - Use JOIN FETCH
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

  @Query("SELECT o FROM Order o JOIN FETCH o.user")
  List<Order> findAllWithUsers();  // Single query
}`
        },
        {
          name: 'Async Processing',
          explanation: 'Asynchronous processing improves response times by offloading long-running tasks. Use @Async annotation for fire-and-forget operations. Use CompletableFuture for parallel execution and result aggregation. Message queues (Kafka, RabbitMQ) handle high-throughput async workloads. Background jobs process batch operations during off-peak hours. Monitor async execution and implement proper error handling.',
          codeExample: `// Async Processing Configuration
@Configuration
@EnableAsync
public class AsyncConfig {

  @Bean
  public Executor taskExecutor() {
    ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
    executor.setCorePoolSize(10);
    executor.setMaxPoolSize(50);
    executor.setQueueCapacity(200);
    executor.setRejectedExecutionHandler(
      new ThreadPoolExecutor.CallerRunsPolicy());
    return executor;
  }
}

@Service
public class OrderService {

  @Autowired
  private EmailService emailService;

  public Order createOrder(OrderRequest request) {
    Order order = orderRepository.save(new Order(request));

    // Send email asynchronously (non-blocking)
    emailService.sendEmailAsync(
      order.getUserEmail(),
      "Order Confirmation",
      "Your order " + order.getId() + " has been placed"
    );

    return order;  // Return immediately
  }
}

@Service
public class EmailService {

  @Async
  public CompletableFuture<Void> sendEmailAsync(
      String to, String subject, String body) {
    // Email sending logic
    return CompletableFuture.completedFuture(null);
  }
}`
        },
        {
          name: 'Profiling and Metrics',
          explanation: 'Profiling identifies performance bottlenecks in code execution. Use JProfiler or VisualVM for JVM profiling. Spring Boot Actuator provides runtime metrics. Instrument code with Micrometer for custom metrics. Track latency percentiles (p50, p95, p99), not just averages. Monitor using RED (Rate, Errors, Duration) or USE (Utilization, Saturation, Errors) methods. Set up alerting for anomalies.',
          codeExample: `// Micrometer Metrics
@Configuration
public class MetricsConfig {

  @Bean
  public MeterRegistryCustomizer<MeterRegistry> commonTags() {
    return registry -> registry.config()
      .commonTags("application", "order-service");
  }
}

@Service
public class ProfiledService {

  private final Timer orderTimer;
  private final Counter failureCounter;

  public ProfiledService(MeterRegistry registry) {
    this.orderTimer = registry.timer("order.creation");
    this.failureCounter = registry.counter("order.failures");
  }

  public Order createOrder(OrderRequest request) {
    return orderTimer.record(() -> {
      try {
        return orderRepository.save(new Order(request));
      } catch (Exception e) {
        failureCounter.increment();
        throw e;
      }
    });
  }
}

// Spring Boot Actuator endpoints
// GET /actuator/metrics/order.creation
// GET /actuator/prometheus (for Grafana)`
        }
      ]
    },
    {
      id: 'calculations',
      name: 'System Design Calculations',
      icon: '🔢',
      color: '#ec4899',
      description: 'Capacity planning formulas for storage, bandwidth, QPS, and memory estimation.',
      diagram: CalculationsDiagram,
      details: [
        {
          name: 'Storage Calculations',
          explanation: 'Storage estimation considers data per user/action, user growth, and retention period. Calculate daily storage as: DAU x actions/day x data/action. Annual storage multiplies by 365. Factor in replication (usually 3x) and growth buffer (20%). Example: 50M DAU x 2 tweets x 430 bytes = 43GB/day text + 4TB/day photos. With 3x replication over 5 years = ~22PB total.',
          codeExample: `// Storage Calculator
@Service
public class StorageCalculator {

  public StorageEstimate calculate(StorageParams params) {
    // Example: Twitter-like platform
    // 500M users, 10% DAU = 50M DAU
    // 2 tweets/day, 430 bytes/tweet
    // 1 photo per 5 tweets, 200KB each

    long tweetsPerDay = params.getDailyActiveUsers()
                        * params.getTweetsPerUser();
    long textStoragePerDay = tweetsPerDay * params.getAvgTweetSize();
    long photoStoragePerDay = (tweetsPerDay / 5) * 200 * 1024;
    long totalDailyStorage = textStoragePerDay + photoStoragePerDay;

    // Annual and multi-year with replication
    long annualStorage = totalDailyStorage * 365;
    long totalStorage = annualStorage
                       * params.getRetentionYears()
                       * params.getReplicationFactor();

    // Add 20% growth buffer
    return new StorageEstimate(totalStorage * 1.2);
  }
}

// Quick formula:
// Storage = Users x Actions/Day x Data/Action x Days x Replicas`
        },
        {
          name: 'QPS and Bandwidth',
          explanation: 'QPS (Queries Per Second) estimates: Average QPS = Daily requests / 86,400 seconds. Peak QPS typically 2-3x average. Database connections needed = Peak QPS x Average latency x 1.3 buffer. Bandwidth calculation: QPS x response size x 8 bits = Mbps. Example: 10M DAU x 50 requests = 500M/day = ~5,800 QPS average, ~17,400 QPS peak.',
          codeExample: `// QPS Calculator
@Service
public class QPSCalculator {

  public QPSEstimate calculate(TrafficParams params) {
    // Example: E-commerce platform
    // 10M DAU, 50 requests/user/day

    long dailyRequests = params.getDailyActiveUsers()
                         * params.getRequestsPerUser();

    // Average and peak QPS
    double avgQPS = dailyRequests / 86400.0;
    double peakQPS = avgQPS * params.getPeakMultiplier(); // 3x

    // Read/Write split (100:1 ratio)
    double readQPS = peakQPS * 0.99;
    double writeQPS = peakQPS * 0.01;

    // DB connections = QPS x latency x buffer
    int connections = (int) (peakQPS * 0.05 * 1.3);

    // Bandwidth = QPS x size x 8 / 1,000,000
    double bandwidth = peakQPS * params.getAvgResponseKB() * 8 / 1000;

    return new QPSEstimate(avgQPS, peakQPS, connections, bandwidth);
  }
}

// Quick formulas:
// QPS = Daily Requests / 86,400
// Bandwidth (Mbps) = QPS x KB x 8 / 1000`
        },
        {
          name: 'Cache Memory Sizing',
          explanation: 'Cache sizing depends on working set size and hit ratio targets. Hot data (frequently accessed) is typically 20% of total data. Target 80-95% cache hit ratio. Session cache = Concurrent users x session size. Memory overhead for Redis is ~20%. Example: 5M concurrent users x 10KB session = 50GB. With hot data (12.5GB) and 20% overhead = 75GB needed, recommend 100GB cluster.',
          codeExample: `// Cache Size Calculator
@Service
public class CacheCalculator {

  public CacheEstimate calculate(CacheParams params) {
    // Example: 50M DAU, 10% concurrent = 5M
    // Session: 10KB, Products: 5KB, Users: 2KB

    long concurrentUsers = params.getConcurrentUsers();
    long sessionCacheMB = (concurrentUsers * 10) / 1024;

    // Hot data cache
    long productCacheMB = (100_000 * 5) / 1024;  // 100K products
    long userCacheMB = (1_000_000 * 2) / 1024;   // 1M hot users
    long hotDataMB = productCacheMB + userCacheMB + 10240; // +10GB misc

    // Total with 20% overhead
    long totalMB = (long)((sessionCacheMB + hotDataMB) * 1.2);

    // Round up to 32GB increments
    long recommendedGB = ((totalMB / 1024) / 32 + 1) * 32;

    return new CacheEstimate(sessionCacheMB, hotDataMB, recommendedGB);
  }
}

// Quick formula:
// Cache = (Hot Data + Sessions) x 1.2 overhead`
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
      { name: 'Design', icon: '🏗️', page: 'Design' },
      { name: 'System Design', icon: '📐', page: 'System Design' }
    ]
    if (selectedConcept) {
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    }
    return stack
  }

  const handleBreadcrumbClick = (index) => {
    if (index === 0) {
      onBack()
    } else if (index === 1 && selectedConcept) {
      setSelectedConceptIndex(null)
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
    background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(139, 92, 246, 0.2)',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    borderRadius: '0.5rem',
    color: '#a78bfa',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>System Design</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(139, 92, 246, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(139, 92, 246, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          ← Back to Design
        </button>
      </div>

      {/* Breadcrumb */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={TOPIC_COLORS}
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
        primaryColor={TOPIC_COLORS.primary}
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
              {concept.details.length} topics - Click to explore
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
              border: `1px solid ${selectedConcept.color}40`,
              width: '100%'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Breadcrumb */}
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
              onMainMenu={breadcrumb?.onMainMenu || onBack}
              colors={TOPIC_COLORS}
            />

            {/* Modal Header */}
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

export default SystemDesign
