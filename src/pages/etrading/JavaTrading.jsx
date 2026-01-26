import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

const ETRADING_COLORS = {
  primary: '#4ade80', primaryHover: '#86efac', bg: 'rgba(34, 197, 94, 0.1)',
  border: 'rgba(34, 197, 94, 0.3)', arrow: '#22c55e', hoverBg: 'rgba(34, 197, 94, 0.2)', topicBg: 'rgba(34, 197, 94, 0.2)'
}

// Background colors for subtopic descriptions
const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },    // blue
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },      // green
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },    // amber
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },    // purple
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },    // pink
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },      // cyan
]

// Thread Safety Diagram
const ThreadSafetyDiagram = () => (
  <svg viewBox="0 0 700 220" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Lock-Striping for Concurrent Order Book</text>
    {/* Order Book */}
    <rect x="200" y="50" width="300" height="140" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="350" y="75" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">Order Book (Price Levels)</text>
    {/* Lock stripes */}
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <rect x={220 + i * 65} y="90" width="55" height="80" rx="4" fill={['#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'][i]} opacity="0.7"/>
        <text x={247 + i * 65} y="115" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Lock {i}</text>
        <text x={247 + i * 65} y="135" textAnchor="middle" fill="white" fontSize="8">Prices</text>
        <text x={247 + i * 65} y="150" textAnchor="middle" fill="white" fontSize="8">{`${i*25}-${(i+1)*25-1}`}</text>
      </g>
    ))}
    {/* Threads */}
    <rect x="50" y="80" width="80" height="30" rx="4" fill="#3b82f6"/>
    <text x="90" y="100" textAnchor="middle" fill="white" fontSize="9">Thread 1</text>
    <rect x="50" y="120" width="80" height="30" rx="4" fill="#8b5cf6"/>
    <text x="90" y="140" textAnchor="middle" fill="white" fontSize="9">Thread 2</text>
    <rect x="570" y="80" width="80" height="30" rx="4" fill="#f59e0b"/>
    <text x="610" y="100" textAnchor="middle" fill="white" fontSize="9">Thread 3</text>
    <rect x="570" y="120" width="80" height="30" rx="4" fill="#ef4444"/>
    <text x="610" y="140" textAnchor="middle" fill="white" fontSize="9">Thread 4</text>
    {/* Arrows */}
    <line x1="130" y1="95" x2="215" y2="115" stroke="#3b82f6" strokeWidth="2"/>
    <line x1="130" y1="135" x2="280" y2="135" stroke="#8b5cf6" strokeWidth="2"/>
    <line x1="570" y1="95" x2="480" y2="115" stroke="#f59e0b" strokeWidth="2"/>
    <line x1="570" y1="135" x2="415" y2="135" stroke="#ef4444" strokeWidth="2"/>
    <text x="350" y="210" textAnchor="middle" fill="#64748b" fontSize="10">Multiple threads access different locks concurrently = Higher throughput</text>
  </svg>
)

// Executor Services Diagram
const ExecutorServicesDiagram = () => (
  <svg viewBox="0 0 700 200" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Thread Pool Strategy by Workload</text>
    <rect x="50" y="45" width="180" height="70" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="140" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">CPU-Bound Pool</text>
    <text x="140" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">Fixed: N = CPU cores</text>
    <text x="140" y="105" textAnchor="middle" fill="#bfdbfe" fontSize="8">Computation, matching</text>
    <rect x="260" y="45" width="180" height="70" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="350" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">I/O-Bound Pool</text>
    <text x="350" y="90" textAnchor="middle" fill="#fef3c7" fontSize="8">Larger: 50-200 threads</text>
    <text x="350" y="105" textAnchor="middle" fill="#fef3c7" fontSize="8">Network, database calls</text>
    <rect x="470" y="45" width="180" height="70" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="560" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Scheduled Pool</text>
    <text x="560" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">4-8 threads</text>
    <text x="560" y="105" textAnchor="middle" fill="#bbf7d0" fontSize="8">Heartbeats, timeouts</text>
    <rect x="100" y="140" width="500" height="45" rx="4" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444"/>
    <text x="350" y="163" textAnchor="middle" fill="#f87171" fontSize="10">Rejection Policy: CallerRunsPolicy for back-pressure</text>
    <text x="350" y="178" textAnchor="middle" fill="#64748b" fontSize="8">Prevent OOM by throttling submitters when pool saturated</text>
  </svg>
)

// CompletableFuture Diagram
const CompletableFutureDiagram = () => (
  <svg viewBox="0 0 700 200" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Async Order Processing Pipeline</text>
    <rect x="50" y="50" width="100" height="45" rx="4" fill="#3b82f6"/>
    <text x="100" y="77" textAnchor="middle" fill="white" fontSize="9">Validate</text>
    <line x1="150" y1="72" x2="175" y2="72" stroke="#4ade80" strokeWidth="2"/>
    <text x="162" y="90" fill="#64748b" fontSize="7">thenCompose</text>
    <rect x="175" y="50" width="100" height="45" rx="4" fill="#f59e0b"/>
    <text x="225" y="77" textAnchor="middle" fill="white" fontSize="9">Enrich</text>
    <line x1="275" y1="72" x2="300" y2="72" stroke="#4ade80" strokeWidth="2"/>
    <text x="287" y="90" fill="#64748b" fontSize="7">thenCompose</text>
    <rect x="300" y="50" width="100" height="45" rx="4" fill="#22c55e"/>
    <text x="350" y="77" textAnchor="middle" fill="white" fontSize="9">Route</text>
    <line x1="400" y1="72" x2="425" y2="72" stroke="#4ade80" strokeWidth="2"/>
    <text x="412" y="90" fill="#64748b" fontSize="7">thenApply</text>
    <rect x="425" y="50" width="100" height="45" rx="4" fill="#8b5cf6"/>
    <text x="475" y="77" textAnchor="middle" fill="white" fontSize="9">Book</text>
    <line x1="525" y1="72" x2="550" y2="72" stroke="#4ade80" strokeWidth="2"/>
    <rect x="550" y="50" width="100" height="45" rx="4" fill="#06b6d4"/>
    <text x="600" y="77" textAnchor="middle" fill="white" fontSize="9">Result</text>
    <rect x="200" y="120" width="300" height="60" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444"/>
    <text x="350" y="145" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">exceptionally()</text>
    <text x="350" y="165" textAnchor="middle" fill="#fecaca" fontSize="9">Handle failures at any stage, return fallback result</text>
  </svg>
)

// Primitive Collections Diagram
const PrimitiveCollectionsDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Primitive vs Boxed Collections - Memory Usage</text>
    <rect x="50" y="45" width="250" height="80" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="175" y="68" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">HashMap&lt;Long, Long&gt;</text>
    <text x="175" y="88" textAnchor="middle" fill="#fecaca" fontSize="9">1M entries: ~80MB</text>
    <text x="175" y="105" textAnchor="middle" fill="#fecaca" fontSize="8">Boxing overhead + object headers</text>
    <text x="175" y="118" textAnchor="middle" fill="#ef4444" fontSize="8">GC pressure from wrapper objects</text>
    <rect x="400" y="45" width="250" height="80" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="525" y="68" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">LongLongHashMap</text>
    <text x="525" y="88" textAnchor="middle" fill="#bbf7d0" fontSize="9">1M entries: ~24MB</text>
    <text x="525" y="105" textAnchor="middle" fill="#bbf7d0" fontSize="8">Raw primitives, no boxing</text>
    <text x="525" y="118" textAnchor="middle" fill="#22c55e" fontSize="8">70% memory savings</text>
    <text x="350" y="90" textAnchor="middle" fill="#fbbf24" fontSize="24">→</text>
    <text x="350" y="160" textAnchor="middle" fill="#64748b" fontSize="10">Eclipse Collections • Trove • FastUtil • HPPC</text>
  </svg>
)

// Concurrent Collections Diagram
const ConcurrentCollectionsDiagram = () => (
  <svg viewBox="0 0 700 200" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Choosing Concurrent Collections</text>
    <rect x="50" y="45" width="180" height="65" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="140" y="68" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">ConcurrentHashMap</text>
    <text x="140" y="85" textAnchor="middle" fill="#bfdbfe" fontSize="8">High concurrency reads/writes</text>
    <text x="140" y="100" textAnchor="middle" fill="#bfdbfe" fontSize="8">Quote cache, symbol lookup</text>
    <rect x="260" y="45" width="180" height="65" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="350" y="68" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">ConcurrentSkipListMap</text>
    <text x="350" y="85" textAnchor="middle" fill="#bbf7d0" fontSize="8">Sorted + concurrent access</text>
    <text x="350" y="100" textAnchor="middle" fill="#bbf7d0" fontSize="8">Order book price levels</text>
    <rect x="470" y="45" width="180" height="65" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="560" y="68" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">CopyOnWriteArrayList</text>
    <text x="560" y="85" textAnchor="middle" fill="#fef3c7" fontSize="8">Read-heavy, rare writes</text>
    <text x="560" y="100" textAnchor="middle" fill="#fef3c7" fontSize="8">Subscriber lists, configs</text>
    <rect x="100" y="130" width="500" height="50" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6"/>
    <text x="350" y="152" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Key Methods: compute(), merge(), computeIfAbsent()</text>
    <text x="350" y="170" textAnchor="middle" fill="#64748b" fontSize="9">Atomic read-modify-write without explicit locking</text>
  </svg>
)

// Off-Heap Storage Diagram
const OffHeapDiagram = () => (
  <svg viewBox="0 0 700 200" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Off-Heap Memory - Bypass GC</text>
    <rect x="50" y="45" width="250" height="100" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="175" y="65" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">JVM Heap</text>
    <text x="175" y="85" textAnchor="middle" fill="#bfdbfe" fontSize="9">Managed by GC</text>
    <text x="175" y="105" textAnchor="middle" fill="#bfdbfe" fontSize="9">GC pauses affect latency</text>
    <rect x="70" y="115" width="80" height="25" rx="3" fill="#ef4444"/>
    <text x="110" y="132" textAnchor="middle" fill="white" fontSize="8">GC Pause</text>
    <text x="180" y="132" fill="#fecaca" fontSize="8">10-100ms</text>
    <rect x="400" y="45" width="250" height="100" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="525" y="65" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Off-Heap Memory</text>
    <text x="525" y="85" textAnchor="middle" fill="#bbf7d0" fontSize="9">DirectByteBuffer, Chronicle</text>
    <text x="525" y="105" textAnchor="middle" fill="#bbf7d0" fontSize="9">No GC interference</text>
    <rect x="420" y="115" width="80" height="25" rx="3" fill="#22c55e"/>
    <text x="460" y="132" textAnchor="middle" fill="white" fontSize="8">No pauses</text>
    <text x="550" y="132" fill="#bbf7d0" fontSize="8">Consistent</text>
    <text x="350" y="170" textAnchor="middle" fill="#64748b" fontSize="10">Chronicle Map • DirectByteBuffer • Memory-mapped files</text>
    <text x="350" y="185" textAnchor="middle" fill="#64748b" fontSize="8">Use for large caches and position stores</text>
  </svg>
)

// Event-Driven Spring Diagram
const EventDrivenSpringDiagram = () => (
  <svg viewBox="0 0 700 200" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Spring Cloud Stream - Event-Driven Trading</text>
    <rect x="50" y="50" width="120" height="50" rx="6" fill="#3b82f6"/>
    <text x="110" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Order Service</text>
    <text x="110" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="7">@StreamListener</text>
    <rect x="200" y="110" width="300" height="40" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="350" y="135" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Kafka: order-events</text>
    <rect x="530" y="50" width="120" height="50" rx="6" fill="#22c55e"/>
    <text x="590" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Risk Service</text>
    <text x="590" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="7">@SendTo</text>
    <line x1="110" y1="100" x2="110" y2="105" stroke="#4ade80" strokeWidth="2"/>
    <line x1="110" y1="105" x2="200" y2="130" stroke="#4ade80" strokeWidth="2"/>
    <line x1="500" y1="130" x2="590" y2="105" stroke="#4ade80" strokeWidth="2"/>
    <line x1="590" y1="105" x2="590" y2="100" stroke="#4ade80" strokeWidth="2"/>
    <rect x="200" y="165" width="300" height="25" rx="4" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6"/>
    <text x="350" y="182" textAnchor="middle" fill="#a78bfa" fontSize="9">Transactional Outbox Pattern for reliability</text>
  </svg>
)

// Binary Protocols Diagram
const BinaryProtocolsDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">SBE Flyweight Pattern - Zero Allocation</text>
    <rect x="50" y="45" width="250" height="70" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="175" y="68" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Direct Buffer</text>
    <rect x="70" y="80" width="30" height="25" rx="2" fill="#3b82f6"/>
    <text x="85" y="97" textAnchor="middle" fill="white" fontSize="7">orderId</text>
    <rect x="105" y="80" width="30" height="25" rx="2" fill="#22c55e"/>
    <text x="120" y="97" textAnchor="middle" fill="white" fontSize="7">symbol</text>
    <rect x="140" y="80" width="30" height="25" rx="2" fill="#f59e0b"/>
    <text x="155" y="97" textAnchor="middle" fill="white" fontSize="7">side</text>
    <rect x="175" y="80" width="30" height="25" rx="2" fill="#ef4444"/>
    <text x="190" y="97" textAnchor="middle" fill="white" fontSize="7">qty</text>
    <rect x="210" y="80" width="30" height="25" rx="2" fill="#8b5cf6"/>
    <text x="225" y="97" textAnchor="middle" fill="white" fontSize="7">price</text>
    <rect x="400" y="45" width="250" height="70" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="525" y="68" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Encoder (Flyweight)</text>
    <text x="525" y="88" textAnchor="middle" fill="#bbf7d0" fontSize="9">wrap(buffer, offset)</text>
    <text x="525" y="105" textAnchor="middle" fill="#bbf7d0" fontSize="8">No object creation</text>
    <line x1="300" y1="80" x2="400" y2="80" stroke="#4ade80" strokeWidth="2"/>
    <text x="350" y="75" fill="#64748b" fontSize="8">writes to</text>
    <text x="350" y="145" textAnchor="middle" fill="#64748b" fontSize="10">Fixed-size messages • Known offsets • Direct memory access</text>
    <text x="350" y="165" textAnchor="middle" fill="#64748b" fontSize="8">Serialize/deserialize in ~100ns vs 10μs+ for JSON</text>
  </svg>
)

// Object Pooling Diagram
const ObjectPoolingDiagram = () => (
  <svg viewBox="0 0 700 200" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Object Pool - Reuse Without Allocation</text>
    <rect x="200" y="45" width="300" height="90" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="350" y="68" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Object Pool</text>
    {[0,1,2,3,4].map((i) => (
      <rect key={i} x={220 + i * 55} y="80" width="45" height="40" rx="4" fill={i < 3 ? '#22c55e' : '#64748b'}/>
    ))}
    <text x="350" y="125" textAnchor="middle" fill="#bbf7d0" fontSize="8">Pre-allocated objects</text>
    <rect x="50" y="65" width="100" height="50" rx="6" fill="#3b82f6"/>
    <text x="100" y="90" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">acquire()</text>
    <text x="100" y="105" textAnchor="middle" fill="#bfdbfe" fontSize="7">Get from pool</text>
    <rect x="550" y="65" width="100" height="50" rx="6" fill="#f59e0b"/>
    <text x="600" y="90" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">release()</text>
    <text x="600" y="105" textAnchor="middle" fill="#fef3c7" fontSize="7">Return to pool</text>
    <line x1="150" y1="90" x2="195" y2="90" stroke="#4ade80" strokeWidth="2"/>
    <line x1="505" y1="90" x2="545" y2="90" stroke="#fbbf24" strokeWidth="2"/>
    <rect x="100" y="155" width="500" height="35" rx="4" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444"/>
    <text x="350" y="177" textAnchor="middle" fill="#f87171" fontSize="10">reset() object before returning • Bounded pool prevents memory leak</text>
  </svg>
)

// Spring Microservices Diagram
const SpringMicroservicesDiagram = () => (
  <svg viewBox="0 0 750 250" style={{ width: '100%', maxWidth: '750px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="springArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>
    <text x="375" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Spring Boot Trading Microservices</text>
    {/* API Gateway */}
    <rect x="300" y="45" width="150" height="45" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="375" y="72" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">API Gateway</text>
    {/* Services */}
    <rect x="50" y="130" width="120" height="70" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="110" y="160" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Order Service</text>
    <text x="110" y="180" textAnchor="middle" fill="#bbf7d0" fontSize="8">@RestController</text>
    <rect x="200" y="130" width="120" height="70" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="260" y="160" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Pricing Service</text>
    <text x="260" y="180" textAnchor="middle" fill="#fef3c7" fontSize="8">@Cacheable</text>
    <rect x="350" y="130" width="120" height="70" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="410" y="160" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Risk Service</text>
    <text x="410" y="180" textAnchor="middle" fill="#fecaca" fontSize="8">@Async</text>
    <rect x="500" y="130" width="120" height="70" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="560" y="160" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Position Service</text>
    <text x="560" y="180" textAnchor="middle" fill="#ddd6fe" fontSize="8">@Transactional</text>
    {/* Kafka */}
    <rect x="200" y="220" width="350" height="25" rx="4" fill="rgba(6, 182, 212, 0.3)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="375" y="238" textAnchor="middle" fill="#22d3ee" fontSize="10" fontWeight="bold">Kafka Event Bus (order-events, price-updates)</text>
    {/* Arrows */}
    <line x1="375" y1="90" x2="110" y2="125" stroke="#4ade80" strokeWidth="1.5"/>
    <line x1="375" y1="90" x2="260" y2="125" stroke="#4ade80" strokeWidth="1.5"/>
    <line x1="375" y1="90" x2="410" y2="125" stroke="#4ade80" strokeWidth="1.5"/>
    <line x1="375" y1="90" x2="560" y2="125" stroke="#4ade80" strokeWidth="1.5"/>
    <line x1="110" y1="200" x2="110" y2="215" stroke="#06b6d4" strokeWidth="1.5"/>
    <line x1="260" y1="200" x2="260" y2="215" stroke="#06b6d4" strokeWidth="1.5"/>
    <line x1="410" y1="200" x2="410" y2="215" stroke="#06b6d4" strokeWidth="1.5"/>
    <line x1="560" y1="200" x2="560" y2="215" stroke="#06b6d4" strokeWidth="1.5"/>
  </svg>
)

// GC-Free Programming Diagram
const GCFreeDiagram = () => (
  <svg viewBox="0 0 700 200" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">GC-Free Programming Techniques</text>
    <rect x="50" y="45" width="180" height="65" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="140" y="68" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">❌ Allocation Sources</text>
    <text x="140" y="85" textAnchor="middle" fill="#fecaca" fontSize="8">Boxing (int → Integer)</text>
    <text x="140" y="100" textAnchor="middle" fill="#fecaca" fontSize="8">String concatenation</text>
    <rect x="260" y="45" width="180" height="65" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="350" y="68" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">✓ GC-Free Techniques</text>
    <text x="350" y="85" textAnchor="middle" fill="#bbf7d0" fontSize="8">Object pooling</text>
    <text x="350" y="100" textAnchor="middle" fill="#bbf7d0" fontSize="8">Flyweight pattern</text>
    <rect x="470" y="45" width="180" height="65" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="560" y="68" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Off-Heap Memory</text>
    <text x="560" y="85" textAnchor="middle" fill="#bfdbfe" fontSize="8">DirectByteBuffer</text>
    <text x="560" y="100" textAnchor="middle" fill="#bfdbfe" fontSize="8">Unsafe / Foreign Memory</text>
    <rect x="100" y="130" width="500" height="55" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6"/>
    <text x="350" y="152" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">Target: Zero Allocations in Hot Path</text>
    <text x="350" y="172" textAnchor="middle" fill="#64748b" fontSize="9">Pre-allocate everything • Reuse objects • Avoid varargs, lambdas, autoboxing</text>
  </svg>
)

// Cache Line Diagram
const CacheLineDiagram = () => (
  <svg viewBox="0 0 700 200" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Cache-Friendly Data Layout (64-byte cache lines)</text>
    <rect x="50" y="45" width="280" height="70" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="190" y="68" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">❌ Array of Objects (cache misses)</text>
    {[0,1,2,3].map((i) => (
      <g key={i}>
        <rect x={70 + i * 65} y="80" width="50" height="25" rx="3" fill="#ef4444"/>
        <text x={95 + i * 65} y="97" textAnchor="middle" fill="white" fontSize="7">ptr→obj</text>
      </g>
    ))}
    <rect x="370" y="45" width="280" height="70" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="510" y="68" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">✓ Struct of Arrays (cache hits)</text>
    <rect x="390" y="80" width="240" height="25" rx="3" fill="#22c55e"/>
    <text x="510" y="97" textAnchor="middle" fill="white" fontSize="8">long[] prices | long[] quantities</text>
    <rect x="100" y="135" width="500" height="50" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6"/>
    <text x="350" y="155" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">@Contended for false sharing prevention</text>
    <text x="350" y="172" textAnchor="middle" fill="#64748b" fontSize="9">Pad fields to separate cache lines • Align hot data • Minimize pointer chasing</text>
  </svg>
)

// Mechanical Sympathy Diagram
const MechanicalSympathyDiagram = () => (
  <svg viewBox="0 0 700 200" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">CPU & Memory Hierarchy for Low Latency</text>
    <rect x="50" y="45" width="100" height="40" rx="4" fill="#ef4444"/>
    <text x="100" y="62" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">L1 Cache</text>
    <text x="100" y="77" textAnchor="middle" fill="#fecaca" fontSize="7">~1ns • 32KB</text>
    <rect x="170" y="45" width="100" height="40" rx="4" fill="#f59e0b"/>
    <text x="220" y="62" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">L2 Cache</text>
    <text x="220" y="77" textAnchor="middle" fill="#fef3c7" fontSize="7">~4ns • 256KB</text>
    <rect x="290" y="45" width="100" height="40" rx="4" fill="#22c55e"/>
    <text x="340" y="62" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">L3 Cache</text>
    <text x="340" y="77" textAnchor="middle" fill="#bbf7d0" fontSize="7">~12ns • 8MB</text>
    <rect x="410" y="45" width="100" height="40" rx="4" fill="#3b82f6"/>
    <text x="460" y="62" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">RAM</text>
    <text x="460" y="77" textAnchor="middle" fill="#bfdbfe" fontSize="7">~100ns</text>
    <rect x="530" y="45" width="100" height="40" rx="4" fill="#8b5cf6"/>
    <text x="580" y="62" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Disk/SSD</text>
    <text x="580" y="77" textAnchor="middle" fill="#ddd6fe" fontSize="7">~10μs-10ms</text>
    <rect x="100" y="105" width="500" height="80" rx="6" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e"/>
    <text x="350" y="125" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Low Latency Techniques</text>
    <text x="200" y="145" textAnchor="middle" fill="#94a3b8" fontSize="8">• CPU pinning (isolcpus)</text>
    <text x="350" y="145" textAnchor="middle" fill="#94a3b8" fontSize="8">• NUMA-aware allocation</text>
    <text x="500" y="145" textAnchor="middle" fill="#94a3b8" fontSize="8">• Busy-spin vs blocking</text>
    <text x="200" y="165" textAnchor="middle" fill="#94a3b8" fontSize="8">• Branch prediction hints</text>
    <text x="350" y="165" textAnchor="middle" fill="#94a3b8" fontSize="8">• Prefetch instructions</text>
    <text x="500" y="165" textAnchor="middle" fill="#94a3b8" fontSize="8">• Lock-free algorithms</text>
  </svg>
)

function JavaTrading({ onBack }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'concurrency', name: 'Concurrency Patterns', icon: '🧵', color: '#fbbf24', diagram: ThreadSafetyDiagram,
      description: 'Multithreading patterns for trading systems',
      details: [
        { name: 'Thread Safety', explanation: 'Trading systems require careful thread safety. Shared mutable state causes race conditions. Use immutable objects where possible. Synchronization primitives: synchronized, locks, atomics. Lock-free algorithms for hot paths.',
          codeExample: `// Thread-Safe Order Book
public class ConcurrentOrderBook {
    // Lock-striping for reduced contention
    private final int NUM_STRIPES = 16;
    private final ReentrantLock[] locks = new ReentrantLock[NUM_STRIPES];
    private final ConcurrentSkipListMap<Long, PriceLevel> bids;
    private final ConcurrentSkipListMap<Long, PriceLevel> asks;

    public ConcurrentOrderBook() {
        for (int i = 0; i < NUM_STRIPES; i++) {
            locks[i] = new ReentrantLock();
        }
        this.bids = new ConcurrentSkipListMap<>(Comparator.reverseOrder());
        this.asks = new ConcurrentSkipListMap<>();
    }

    public void addOrder(Order order) {
        long priceKey = order.getPriceAsLong();
        int stripe = Math.abs((int)(priceKey % NUM_STRIPES));

        locks[stripe].lock();
        try {
            ConcurrentSkipListMap<Long, PriceLevel> book =
                order.getSide() == Side.BUY ? bids : asks;

            book.compute(priceKey, (price, level) -> {
                if (level == null) level = new PriceLevel(price);
                level.addOrder(order);
                return level;
            });
        } finally {
            locks[stripe].unlock();
        }
    }

    // Lock-free read for best bid/ask
    public Quote getTopOfBook() {
        Map.Entry<Long, PriceLevel> bestBid = bids.firstEntry();
        Map.Entry<Long, PriceLevel> bestAsk = asks.firstEntry();
        return new Quote(
            bestBid != null ? bestBid.getValue().getPrice() : null,
            bestAsk != null ? bestAsk.getValue().getPrice() : null
        );
    }
}` },
        { name: 'Executor Services', diagram: ExecutorServicesDiagram, explanation: 'Manage thread pools for different workloads. Separate pools for I/O vs CPU-bound tasks. Fixed pools for predictable behavior. Cached pools for bursty workloads. Custom rejection policies for overload.',
          codeExample: `// Custom Thread Pool for Trading
public class TradingExecutors {
    // CPU-bound tasks: core count threads
    private final ExecutorService computePool = new ThreadPoolExecutor(
        Runtime.getRuntime().availableProcessors(),
        Runtime.getRuntime().availableProcessors(),
        0L, TimeUnit.MILLISECONDS,
        new LinkedBlockingQueue<>(10000),
        new ThreadFactoryBuilder().setNameFormat("compute-%d").build(),
        new ThreadPoolExecutor.CallerRunsPolicy()  // Back-pressure
    );

    // I/O-bound tasks: more threads for waiting
    private final ExecutorService ioPool = new ThreadPoolExecutor(
        50, 200,
        60L, TimeUnit.SECONDS,
        new SynchronousQueue<>(),
        new ThreadFactoryBuilder().setNameFormat("io-%d").build(),
        new ThreadPoolExecutor.AbortPolicy()
    );

    // Scheduled tasks for heartbeats, timeouts
    private final ScheduledExecutorService scheduler =
        Executors.newScheduledThreadPool(4,
            new ThreadFactoryBuilder().setNameFormat("scheduler-%d").build());

    public void submitOrder(Order order) {
        computePool.submit(() -> processOrder(order));
    }

    public void fetchMarketData(String symbol) {
        ioPool.submit(() -> marketDataClient.fetch(symbol));
    }

    public void scheduleTimeout(Order order, Duration timeout) {
        scheduler.schedule(
            () -> cancelIfPending(order),
            timeout.toMillis(),
            TimeUnit.MILLISECONDS
        );
    }
}` },
        { name: 'CompletableFuture', diagram: CompletableFutureDiagram, explanation: 'Async programming for non-blocking operations. Chain operations with thenApply, thenCompose. Combine multiple futures with allOf, anyOf. Handle errors with exceptionally. Critical for I/O-heavy trading operations.',
          codeExample: `// Async Order Processing
public class AsyncOrderProcessor {
    private final ExecutorService executor = Executors.newFixedThreadPool(10);

    public CompletableFuture<OrderResult> processOrderAsync(Order order) {
        return CompletableFuture
            .supplyAsync(() -> validateOrder(order), executor)
            .thenCompose(validated -> enrichOrderAsync(validated))
            .thenCompose(enriched -> routeOrderAsync(enriched))
            .thenApply(routed -> bookOrder(routed))
            .exceptionally(ex -> {
                log.error("Order processing failed", ex);
                return OrderResult.failed(order, ex.getMessage());
            });
    }

    // Parallel risk checks
    public CompletableFuture<RiskResult> checkRiskParallel(Order order) {
        CompletableFuture<Boolean> creditCheck =
            CompletableFuture.supplyAsync(() -> checkCredit(order));
        CompletableFuture<Boolean> positionCheck =
            CompletableFuture.supplyAsync(() -> checkPosition(order));
        CompletableFuture<Boolean> limitCheck =
            CompletableFuture.supplyAsync(() -> checkLimits(order));

        return CompletableFuture.allOf(creditCheck, positionCheck, limitCheck)
            .thenApply(v -> new RiskResult(
                creditCheck.join(), positionCheck.join(), limitCheck.join()));
    }
}` }
      ]
    },
    {
      id: 'collections', name: 'High-Performance Collections', icon: '📦', color: '#3b82f6',
      description: 'Specialized data structures for trading',
      details: [
        { name: 'Primitive Collections', diagram: PrimitiveCollectionsDiagram, explanation: 'Avoid boxing overhead with primitive collections. Eclipse Collections, Trove, FastUtil libraries. Significant memory and CPU savings. Critical for high-frequency data processing.',
          codeExample: `// Primitive Collections for Performance
import org.eclipse.collections.impl.map.mutable.primitive.*;
import org.eclipse.collections.impl.list.mutable.primitive.*;

public class EfficientPositionTracker {
    // Avoid Long boxing with primitive map
    // Key: instrumentId (long), Value: position (long)
    private final LongLongHashMap positions = new LongLongHashMap();

    // Price tracking with primitive list
    private final DoubleArrayList recentPrices = new DoubleArrayList(1000);

    public void updatePosition(long instrumentId, long quantity) {
        positions.addToValue(instrumentId, quantity);
    }

    public long getPosition(long instrumentId) {
        return positions.getIfAbsent(instrumentId, 0L);
    }

    // Memory comparison:
    // HashMap<Long, Long> with 1M entries: ~80MB
    // LongLongHashMap with 1M entries: ~24MB
}` },
        { name: 'Concurrent Collections', diagram: ConcurrentCollectionsDiagram, explanation: 'ConcurrentHashMap for thread-safe caching. ConcurrentSkipListMap for sorted concurrent access. CopyOnWriteArrayList for read-heavy workloads. Choose based on read/write ratio and ordering needs.',
          codeExample: `// Concurrent Collections for Trading
public class MarketDataCache {
    // ConcurrentHashMap for symbol -> price cache
    private final ConcurrentHashMap<String, Quote> quoteCache =
        new ConcurrentHashMap<>(1000, 0.75f, 16);

    // ConcurrentSkipListMap for sorted order book levels
    private final ConcurrentSkipListMap<Long, PriceLevel> bidLevels =
        new ConcurrentSkipListMap<>(Comparator.reverseOrder());

    // CopyOnWriteArrayList for rarely-changing subscriber list
    private final CopyOnWriteArrayList<MarketDataListener> listeners =
        new CopyOnWriteArrayList<>();

    public void updateQuote(String symbol, Quote quote) {
        // Atomic compute for thread-safe update
        quoteCache.compute(symbol, (key, existing) -> {
            if (existing == null || quote.getTimestamp() > existing.getTimestamp()) {
                return quote;
            }
            return existing;
        });
        notifyListeners(symbol, quote);
    }

    public Quote getQuote(String symbol) {
        return quoteCache.get(symbol);
    }

    // Lock-free iteration - snapshot semantics
    public void notifyListeners(String symbol, Quote quote) {
        for (MarketDataListener listener : listeners) {
            listener.onQuote(symbol, quote);
        }
    }

    public void addBidLevel(long price, PriceLevel level) {
        bidLevels.put(price, level);
    }

    public PriceLevel getBestBid() {
        Map.Entry<Long, PriceLevel> first = bidLevels.firstEntry();
        return first != null ? first.getValue() : null;
    }
}` },
        { name: 'Off-Heap Storage', diagram: OffHeapDiagram, explanation: 'Store large datasets outside JVM heap. Avoid GC pauses for large caches. Chronicle Map for persistent off-heap maps. DirectByteBuffer for manual memory management.',
          codeExample: `// Off-Heap Storage with Chronicle Map
public class OffHeapPositionStore {
    private final ChronicleMap<Long, Position> positionMap;

    public OffHeapPositionStore() {
        this.positionMap = ChronicleMap
            .of(Long.class, Position.class)
            .name("positions")
            .entries(1_000_000)           // Expected entries
            .averageValueSize(128)         // Avg serialized size
            .createPersistedTo(new File("/data/positions.dat"));
    }

    public void updatePosition(long accountId, Position position) {
        positionMap.put(accountId, position);
    }

    public Position getPosition(long accountId) {
        return positionMap.get(accountId);
    }

    // DirectByteBuffer for market data ring buffer
    private final ByteBuffer ringBuffer =
        ByteBuffer.allocateDirect(64 * 1024 * 1024);  // 64MB off-heap

    public void writeMarketData(MarketData data) {
        int pos = (int) (sequence.getAndIncrement() % RING_SIZE) * ENTRY_SIZE;
        ringBuffer.putLong(pos, data.getTimestamp());
        ringBuffer.putLong(pos + 8, data.getInstrumentId());
        ringBuffer.putDouble(pos + 16, data.getPrice());
        ringBuffer.putLong(pos + 24, data.getQuantity());
    }

    // Benefits:
    // - No GC pressure from large data sets
    // - Persisted data survives restarts
    // - Memory-mapped I/O for speed
}` }
      ]
    },
    {
      id: 'spring-trading', name: 'Spring Boot Trading', icon: '🌱', color: '#22c55e', diagram: SpringMicroservicesDiagram,
      description: 'Spring Boot patterns for trading applications',
      details: [
        { name: 'Microservices Architecture', explanation: 'Decompose trading system into services. Order Service, Pricing Service, Risk Service. Spring Cloud for service discovery. API Gateway for routing. Event-driven communication between services.',
          codeExample: `// Trading Microservice with Spring Boot
@SpringBootApplication
@EnableDiscoveryClient
public class OrderServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(OrderServiceApplication.class, args);
    }
}

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;
    private final KafkaTemplate<String, OrderEvent> kafkaTemplate;

    @PostMapping
    public ResponseEntity<OrderResponse> submitOrder(@Valid @RequestBody OrderRequest request) {
        Order order = orderService.createOrder(request);

        // Publish event for downstream consumers
        kafkaTemplate.send("order-events", order.getId(),
            new OrderCreatedEvent(order));

        return ResponseEntity.ok(new OrderResponse(order));
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrder(@PathVariable String orderId) {
        return orderService.findById(orderId)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
}

// Service with caching
@Service
public class PricingService {
    @Cacheable(value = "prices", key = "#symbol")
    public Price getPrice(String symbol) {
        return marketDataClient.getPrice(symbol);
    }

    @CacheEvict(value = "prices", key = "#symbol")
    public void invalidatePrice(String symbol) {
        // Cache evicted
    }
}` },
        { name: 'Event-Driven Spring', diagram: EventDrivenSpringDiagram, explanation: 'Spring Integration for message flows. Spring Cloud Stream for Kafka/RabbitMQ. ApplicationEvent for internal events. Transactional outbox pattern for reliability.',
          codeExample: `// Event-Driven Trading with Spring Cloud Stream
@EnableBinding(TradingChannels.class)
public class OrderEventProcessor {

    @StreamListener(TradingChannels.ORDER_INPUT)
    @SendTo(TradingChannels.EXECUTION_OUTPUT)
    public ExecutionEvent processOrder(OrderEvent event) {
        Order order = event.getOrder();
        ExecutionResult result = matchingEngine.execute(order);
        return new ExecutionEvent(order.getId(), result);
    }
}

// Custom channels
public interface TradingChannels {
    String ORDER_INPUT = "order-input";
    String EXECUTION_OUTPUT = "execution-output";

    @Input(ORDER_INPUT)
    SubscribableChannel orderInput();

    @Output(EXECUTION_OUTPUT)
    MessageChannel executionOutput();
}

// Transactional Outbox Pattern
@Service
public class OrderService {
    @Transactional
    public Order createOrder(OrderRequest request) {
        Order order = orderRepository.save(new Order(request));

        // Store event in outbox table (same transaction)
        outboxRepository.save(new OutboxEvent(
            "OrderCreated",
            objectMapper.writeValueAsString(order)
        ));

        return order;
    }
}

// Outbox publisher (separate process)
@Scheduled(fixedDelay = 100)
public void publishOutboxEvents() {
    List<OutboxEvent> events = outboxRepository.findUnpublished();
    for (OutboxEvent event : events) {
        kafkaTemplate.send("order-events", event.getPayload());
        event.markPublished();
    }
}` }
      ]
    },
    {
      id: 'serialization', name: 'Fast Serialization', icon: '⚡', color: '#ef4444',
      description: 'High-performance serialization for trading messages',
      details: [
        { name: 'Binary Protocols', diagram: BinaryProtocolsDiagram, explanation: 'SBE (Simple Binary Encoding) for lowest latency. Protocol Buffers for flexibility. Avro for schema evolution. Avoid JSON on critical paths.',
          codeExample: `// SBE Flyweight Pattern
// Generated from schema - zero allocation
public class OrderEncoder {
    private MutableDirectBuffer buffer;
    private int offset;

    public OrderEncoder wrap(MutableDirectBuffer buffer, int offset) {
        this.buffer = buffer;
        this.offset = offset;
        return this;
    }

    public OrderEncoder orderId(long value) {
        buffer.putLong(offset + 0, value, ByteOrder.LITTLE_ENDIAN);
        return this;
    }

    public OrderEncoder symbol(CharSequence value) {
        buffer.putStringWithoutLengthAscii(offset + 8, value);
        return this;
    }

    // Chained builder pattern for clean API
    // No object allocation during encoding
}

// Usage
OrderEncoder encoder = new OrderEncoder();
UnsafeBuffer buffer = new UnsafeBuffer(ByteBuffer.allocateDirect(256));

encoder.wrap(buffer, 0)
    .orderId(12345L)
    .symbol("AAPL")
    .side(Side.BUY)
    .quantity(100)
    .price(15025000000L);  // Fixed point

// Send buffer directly to network` },
        { name: 'Object Pooling', diagram: ObjectPoolingDiagram, explanation: 'Reuse objects to avoid allocation. Pool encoders, decoders, buffers. Reset and return to pool after use. Bounded pools prevent memory leaks.',
          codeExample: `// Object Pool for Zero-Allocation Trading
public class OrderPool {
    private final Queue<Order> pool = new ConcurrentLinkedQueue<>();
    private final int maxSize;
    private final AtomicInteger size = new AtomicInteger(0);

    public OrderPool(int maxSize) {
        this.maxSize = maxSize;
        // Pre-allocate objects
        for (int i = 0; i < maxSize / 2; i++) {
            pool.offer(new Order());
            size.incrementAndGet();
        }
    }

    public Order acquire() {
        Order order = pool.poll();
        if (order != null) {
            return order;
        }
        // Create new if pool empty and under limit
        if (size.get() < maxSize) {
            size.incrementAndGet();
            return new Order();
        }
        // Block or throw if at limit
        throw new PoolExhaustedException("Order pool exhausted");
    }

    public void release(Order order) {
        order.reset();  // Clear all fields
        pool.offer(order);
    }
}

// Usage in hot path
public class OrderProcessor {
    private final OrderPool orderPool = new OrderPool(10000);

    public void processMessage(ByteBuffer buffer) {
        Order order = orderPool.acquire();
        try {
            order.decode(buffer);
            matchingEngine.match(order);
        } finally {
            orderPool.release(order);  // Always return to pool
        }
    }
}

// Resettable order for pooling
public class Order {
    private long orderId;
    private String symbol;
    private Side side;
    private long quantity;
    private long price;

    public void reset() {
        this.orderId = 0;
        this.symbol = null;
        this.side = null;
        this.quantity = 0;
        this.price = 0;
    }
}` }
      ]
    },
    {
      id: 'gc-free', name: 'GC-Free Programming', icon: '🚀', color: '#ec4899', diagram: GCFreeDiagram,
      description: 'Zero-allocation techniques for ultra-low latency trading',
      details: [
        { name: 'Allocation Avoidance', explanation: 'GC pauses are unacceptable in trading. Avoid all allocations in the hot path. Common sources: boxing, String concat, varargs, lambdas, iterators. Use primitive types, pre-allocated buffers, and flyweight patterns.',
          codeExample: `// GC-Free Order Processing
public class GCFreeOrderHandler {
    // Pre-allocated reusable objects
    private final MutableDirectBuffer buffer = new UnsafeBuffer(
        ByteBuffer.allocateDirect(4096));
    private final OrderDecoder decoder = new OrderDecoder();
    private final StringBuilder symbolBuilder = new StringBuilder(32);

    // Primitive arrays instead of collections
    private final long[] orderIds = new long[10000];
    private final long[] prices = new long[10000];
    private final long[] quantities = new long[10000];
    private int orderCount = 0;

    // Avoid boxing - use primitive specializations
    private final LongLongHashMap orderLookup = new LongLongHashMap();

    public void processOrder(long orderId, long price, long qty) {
        // No allocation in this method
        int idx = orderCount++;
        orderIds[idx] = orderId;
        prices[idx] = price;
        quantities[idx] = qty;
        orderLookup.put(orderId, idx);
    }

    // Avoid String allocation for symbol lookup
    public void lookupSymbol(CharSequence symbol) {
        symbolBuilder.setLength(0);
        symbolBuilder.append(symbol);  // Reuse StringBuilder
        // Use CharSequence-based map lookup
    }

    // Avoid iterator allocation
    public void iterateOrders() {
        for (int i = 0; i < orderCount; i++) {
            processOrderAt(orderIds[i], prices[i], quantities[i]);
        }
    }
}` },
        { name: 'Cache-Friendly Design', diagram: CacheLineDiagram, explanation: 'Modern CPUs are memory-bound. Cache misses cost 100x vs cache hits. Use Struct of Arrays (SoA) instead of Array of Structs (AoS). Align data to cache lines. Use @Contended to prevent false sharing.',
          codeExample: `// Cache-Friendly Order Book
public class CacheFriendlyOrderBook {
    // Struct of Arrays - cache-friendly layout
    // All prices in contiguous memory = prefetch works
    private final long[] bidPrices = new long[MAX_LEVELS];
    private final long[] bidQuantities = new long[MAX_LEVELS];
    private final long[] askPrices = new long[MAX_LEVELS];
    private final long[] askQuantities = new long[MAX_LEVELS];
    private int bidCount = 0;
    private int askCount = 0;

    // Compare to: PriceLevel[] levels (pointer chasing, cache misses)

    // Prevent false sharing between threads
    @sun.misc.Contended
    private volatile long lastUpdateNanos;

    @sun.misc.Contended
    private volatile long messageCount;

    // Process all bids - excellent cache utilization
    public long getTotalBidQuantity() {
        long total = 0;
        // Sequential memory access = hardware prefetch
        for (int i = 0; i < bidCount; i++) {
            total += bidQuantities[i];
        }
        return total;
    }

    // Binary search on sorted array - cache efficient
    public int findPriceLevel(long price, boolean isBid) {
        long[] prices = isBid ? bidPrices : askPrices;
        int count = isBid ? bidCount : askCount;
        return Arrays.binarySearch(prices, 0, count, price);
    }
}

// Cache line padding for concurrent access
public class PaddedAtomicLong {
    // 64 bytes = typical cache line size
    private long p1, p2, p3, p4, p5, p6, p7;
    private volatile long value;
    private long p8, p9, p10, p11, p12, p13, p14;
}` },
        { name: 'Mechanical Sympathy', diagram: MechanicalSympathyDiagram, explanation: 'Understand hardware to write fast code. CPU affinity pins threads to cores. NUMA-aware allocation keeps memory local. Busy-spin avoids context switch overhead. Branch-free code for predictable performance.',
          codeExample: `// Low-Latency Thread Configuration
public class LowLatencyThreading {

    // Pin thread to specific CPU core
    public static void pinToCore(int coreId) {
        // Linux: taskset or Affinity library
        Affinity.setAffinity(1L << coreId);
    }

    // Busy-spin waiting (no OS context switch)
    public class BusySpinWaitStrategy implements WaitStrategy {
        @Override
        public long waitFor(long sequence, Sequence cursor,
                           Sequence dependentSequence,
                           SequenceBarrier barrier) {
            long availableSequence;
            while ((availableSequence = dependentSequence.get()) < sequence) {
                Thread.onSpinWait();  // CPU hint for spin-wait
            }
            return availableSequence;
        }
    }

    // Branch-free min/max (avoid branch misprediction)
    public static long branchFreeMin(long a, long b) {
        return b ^ ((a ^ b) & -(a < b ? 1L : 0L));
    }

    // Prefetch hints for upcoming data access
    public void prefetchOrderBook(long[] prices, int startIdx) {
        // JVM may inline to prefetch instructions
        Unsafe.getUnsafe().prefetchReadStatic(
            prices, Unsafe.ARRAY_LONG_BASE_OFFSET + startIdx * 8L);
    }

    // Lock-free single-writer pattern
    public class SingleWriterRingBuffer {
        private final long[] buffer;
        private volatile long writePos = 0;
        private long cachedReadPos = 0;

        // Only one writer thread - no CAS needed
        public boolean offer(long value) {
            long currentWrite = writePos;
            if (currentWrite - cachedReadPos >= buffer.length) {
                cachedReadPos = readPos;  // Refresh cached read position
                if (currentWrite - cachedReadPos >= buffer.length) {
                    return false;  // Buffer full
                }
            }
            buffer[(int)(currentWrite & (buffer.length - 1))] = value;
            writePos = currentWrite + 1;  // Volatile write publishes
            return true;
        }
    }
}` },
        { name: 'GC Tuning for Trading', explanation: 'When you cannot eliminate GC, minimize its impact. Use ZGC or Shenandoah for sub-millisecond pauses. Size heap to avoid frequent GCs. Pre-touch memory to avoid page faults. Monitor with GC logs and JFR.',
          codeExample: `// JVM Flags for Low-Latency Trading
// Zero pause GC (Java 15+)
// -XX:+UseZGC -XX:+ZGenerational
// -Xms16g -Xmx16g  (Fixed heap, no resizing)
// -XX:+AlwaysPreTouch  (Pre-fault pages)
// -XX:+UseNUMA  (NUMA-aware allocation)

// Or Shenandoah for sub-ms pauses
// -XX:+UseShenandoahGC
// -XX:ShenandoahGCHeuristics=compact

// GC-Free validation with JFR
public class GCFreeValidator {

    public void runWithGCMonitoring(Runnable task) {
        // Before
        long gcCountBefore = getGCCount();
        long allocBefore = getAllocatedBytes();

        // Run task
        for (int i = 0; i < 1_000_000; i++) {
            task.run();
        }

        // After
        long gcCountAfter = getGCCount();
        long allocAfter = getAllocatedBytes();

        if (gcCountAfter > gcCountBefore) {
            throw new AssertionError("GC occurred during test!");
        }
        if (allocAfter > allocBefore) {
            System.err.println("Allocated: " + (allocAfter - allocBefore) + " bytes");
        }
    }

    private long getGCCount() {
        return ManagementFactory.getGarbageCollectorMXBeans()
            .stream()
            .mapToLong(GarbageCollectorMXBean::getCollectionCount)
            .sum();
    }

    private long getAllocatedBytes() {
        return ((com.sun.management.ThreadMXBean)
            ManagementFactory.getThreadMXBean())
            .getThreadAllocatedBytes(Thread.currentThread().getId());
    }
}

// Epsilon GC for testing (no-op GC)
// -XX:+UnlockExperimentalVMOptions -XX:+UseEpsilonGC
// Use to verify zero-allocation code` }
      ]
    }
  ]

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

  const buildBreadcrumbStack = () => {
    const stack = [{ name: 'eTrading', icon: '📈' }, { name: 'Java for Trading', icon: '☕' }]
    if (selectedConcept) stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    return stack
  }

  const handleBreadcrumbClick = (index) => {
    if (index === 0) onBack()
    else if (index === 1 && selectedConcept) setSelectedConceptIndex(null)
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        selectedConceptIndex !== null ? setSelectedConceptIndex(null) : onBack()
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

  const containerStyle = { minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #78350f 50%, #0f172a 100%)', padding: '2rem', fontFamily: 'system-ui, -apple-system, sans-serif' }

  return (
    <div style={containerStyle}>
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', background: 'linear-gradient(135deg, #fde047, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>Java for Trading</h1>
        <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', background: 'rgba(251, 191, 36, 0.2)', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '0.5rem', color: '#fde047', cursor: 'pointer', fontSize: '1rem', transition: 'all 0.2s' }}
          onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(251, 191, 36, 0.3)' }}
          onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(251, 191, 36, 0.2)' }}>← Back to eTrading</button>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}><Breadcrumb breadcrumbStack={buildBreadcrumbStack()} onBreadcrumbClick={handleBreadcrumbClick} colors={ETRADING_COLORS} /></div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        {concepts.map((c, index) => (
          <div key={c.id} onClick={() => setSelectedConceptIndex(index)} style={{ background: 'rgba(15, 23, 42, 0.8)', borderRadius: '1rem', padding: '1.5rem', border: `1px solid ${c.color}40`, cursor: 'pointer', transition: 'all 0.3s' }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = c.color }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = `${c.color}40` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}><span style={{ fontSize: '2.5rem' }}>{c.icon}</span><h3 style={{ color: c.color, margin: 0, fontSize: '1.25rem' }}>{c.name}</h3></div>
            <p style={{ color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>{c.description}</p>
            <div style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.875rem' }}>{c.details.length} topics</div>
          </div>
        ))}
      </div>

      {selectedConcept && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '2rem' }} onClick={() => setSelectedConceptIndex(null)}>
          <div style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', borderRadius: '1rem', padding: '2rem', maxWidth: '1200px', maxHeight: '92vh', overflow: 'auto', border: `1px solid ${selectedConcept.color}40` }} onClick={(e) => e.stopPropagation()}>
            <Breadcrumb breadcrumbStack={buildBreadcrumbStack()} onBreadcrumbClick={handleBreadcrumbClick} colors={ETRADING_COLORS} />
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
                  {DiagramComponent && (
                    <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.5rem', border: '1px solid #334155' }}>
                      <DiagramComponent />
                    </div>
                  )}
                  <h3 style={{ color: '#e2e8f0', marginBottom: '0.75rem', fontSize: '1.1rem' }}>{detail.name}</h3>
                  <p style={{ color: '#e2e8f0', lineHeight: '1.8', marginBottom: '1rem', background: colorScheme.bg, border: `1px solid ${colorScheme.border}`, borderRadius: '0.5rem', padding: '1rem', textAlign: 'left' }}>{detail.explanation}</p>
                  {detail.codeExample && <SyntaxHighlighter language="java" style={vscDarkPlus} customStyle={{ padding: '1rem', margin: 0, borderRadius: '0.5rem', fontSize: '0.8rem', border: '1px solid #334155', background: '#0f172a' }} codeTagProps={{ style: { background: 'transparent' } }}>{detail.codeExample}</SyntaxHighlighter>}
                </div>
              )
            })()}

          </div>
        </div>
      )}
    </div>
  )
}

export default JavaTrading
