import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

const ETRADING_COLORS = {
  primary: '#4ade80',
  primaryHover: '#86efac',
  bg: 'rgba(34, 197, 94, 0.1)',
  border: 'rgba(34, 197, 94, 0.3)',
  arrow: '#22c55e',
  hoverBg: 'rgba(34, 197, 94, 0.2)',
  topicBg: 'rgba(34, 197, 94, 0.2)'
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

// JVM Memory Layout Diagram
const JVMMemoryDiagram = () => (
  <svg viewBox="0 0 700 280" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">JVM Memory Layout for Low Latency</text>
    {/* Heap */}
    <rect x="50" y="50" width="400" height="180" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="250" y="75" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">Heap Memory</text>
    {/* Young Gen */}
    <rect x="70" y="90" width="170" height="120" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="155" y="115" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Young Generation</text>
    <rect x="80" y="130" width="70" height="35" rx="4" fill="#22c55e"/>
    <text x="115" y="152" textAnchor="middle" fill="white" fontSize="9">Eden</text>
    <rect x="80" y="170" width="30" height="30" rx="4" fill="#16a34a"/>
    <text x="95" y="189" textAnchor="middle" fill="white" fontSize="8">S0</text>
    <rect x="115" y="170" width="30" height="30" rx="4" fill="#16a34a"/>
    <text x="130" y="189" textAnchor="middle" fill="white" fontSize="8">S1</text>
    {/* Old Gen */}
    <rect x="260" y="90" width="170" height="120" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="345" y="115" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">Old Generation</text>
    <text x="345" y="160" textAnchor="middle" fill="#ddd6fe" fontSize="10">Long-lived objects</text>
    <text x="345" y="180" textAnchor="middle" fill="#ddd6fe" fontSize="9">(Pre-allocate to avoid GC)</text>
    {/* Off-Heap */}
    <rect x="480" y="50" width="180" height="180" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="570" y="75" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">Off-Heap Memory</text>
    <rect x="500" y="95" width="140" height="40" rx="4" fill="#f59e0b"/>
    <text x="570" y="120" textAnchor="middle" fill="white" fontSize="10">DirectByteBuffer</text>
    <rect x="500" y="145" width="140" height="40" rx="4" fill="#d97706"/>
    <text x="570" y="170" textAnchor="middle" fill="white" fontSize="10">Mapped Files</text>
    <rect x="500" y="195" width="140" height="25" rx="4" fill="#b45309"/>
    <text x="570" y="212" textAnchor="middle" fill="white" fontSize="9">No GC pauses!</text>
    <text x="350" y="260" textAnchor="middle" fill="#4ade80" fontSize="10">Target: Zero allocations on hot path • Pre-allocate all objects • Use object pools</text>
  </svg>
)

// Latency Histogram Diagram
const LatencyHistogramDiagram = () => (
  <svg viewBox="0 0 700 230" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Latency Distribution (HdrHistogram)</text>
    {/* Histogram bars */}
    <rect x="50" y="45" width="550" height="140" rx="6" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" strokeWidth="2"/>
    {[100, 140, 180, 150, 90, 50, 25, 15, 8, 5, 3].map((h, i) => (
      <rect key={i} x={70 + i * 47} y={175 - h} width="40" height={h} fill={i < 7 ? '#22c55e' : i < 9 ? '#f59e0b' : '#ef4444'} rx="2"/>
    ))}
    {/* X-axis labels */}
    <text x="70" y="195" fill="#64748b" fontSize="8">1μs</text>
    <text x="164" y="195" fill="#64748b" fontSize="8">10μs</text>
    <text x="258" y="195" fill="#64748b" fontSize="8">100μs</text>
    <text x="352" y="195" fill="#64748b" fontSize="8">1ms</text>
    <text x="446" y="195" fill="#64748b" fontSize="8">10ms</text>
    <text x="540" y="195" fill="#64748b" fontSize="8">100ms</text>
    {/* Percentile markers */}
    <line x1="350" y1="50" x2="350" y2="175" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4"/>
    <text x="350" y="42" textAnchor="middle" fill="#60a5fa" fontSize="9">p50: 45μs</text>
    <line x1="445" y1="50" x2="445" y2="175" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4"/>
    <text x="445" y="42" textAnchor="middle" fill="#fbbf24" fontSize="9">p99: 2ms</text>
    <line x1="520" y1="50" x2="520" y2="175" stroke="#ef4444" strokeWidth="2" strokeDasharray="4"/>
    <text x="520" y="42" textAnchor="middle" fill="#f87171" fontSize="9">p99.9: 15ms</text>
    <text x="350" y="220" textAnchor="middle" fill="#64748b" fontSize="10">Focus on tail latencies (p99, p99.9) - they matter most for trading</text>
  </svg>
)

// JVM Tuning Diagram
const JVMTuningDiagram = () => (
  <svg viewBox="0 0 700 200" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">JVM Tuning for Low Latency</text>
    <rect x="50" y="40" width="140" height="60" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="120" y="65" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Memory Config</text>
    <text x="120" y="85" textAnchor="middle" fill="#fef3c7" fontSize="8">-Xms=Xmx, PreTouch</text>
    <rect x="210" y="40" width="140" height="60" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="280" y="65" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">GC Selection</text>
    <text x="280" y="85" textAnchor="middle" fill="#bbf7d0" fontSize="8">ZGC / Shenandoah</text>
    <rect x="370" y="40" width="140" height="60" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="440" y="65" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">JIT Tuning</text>
    <text x="440" y="85" textAnchor="middle" fill="#bfdbfe" fontSize="8">Compile Threshold</text>
    <rect x="530" y="40" width="140" height="60" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="600" y="65" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Disable Features</text>
    <text x="600" y="85" textAnchor="middle" fill="#fecaca" fontSize="8">Biased Locking OFF</text>
    <rect x="150" y="130" width="400" height="50" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="350" y="155" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Target: Sub-millisecond GC pauses, fast warmup</text>
    <text x="350" y="170" textAnchor="middle" fill="#64748b" fontSize="9">Profile → Tune → Measure → Repeat</text>
  </svg>
)

// Object Allocation Diagram
const ObjectAllocationDiagram = () => (
  <svg viewBox="0 0 700 200" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Zero-Allocation Hot Path</text>
    <rect x="50" y="50" width="180" height="70" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="140" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Allocation on Hot Path</text>
    <text x="140" y="95" textAnchor="middle" fill="#fecaca" fontSize="9">GC pressure, cache misses</text>
    <text x="140" y="110" textAnchor="middle" fill="#fecaca" fontSize="8">❌ AVOID</text>
    <text x="300" y="90" textAnchor="middle" fill="#4ade80" fontSize="24">→</text>
    <rect x="370" y="50" width="180" height="70" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="460" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Pre-allocated Objects</text>
    <text x="460" y="95" textAnchor="middle" fill="#bbf7d0" fontSize="9">Object pools, primitives</text>
    <text x="460" y="110" textAnchor="middle" fill="#bbf7d0" fontSize="8">✓ USE</text>
    <rect x="100" y="140" width="500" height="40" rx="4" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6"/>
    <text x="350" y="165" textAnchor="middle" fill="#60a5fa" fontSize="10">Flyweight pattern • MutableOrder • DirectBuffer • Fixed-point arithmetic</text>
  </svg>
)

// Lock-Free Diagram
const LockFreeDiagram = () => (
  <svg viewBox="0 0 700 200" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Lock-Free vs Locked Data Structures</text>
    <rect x="50" y="45" width="200" height="80" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="150" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">synchronized / Lock</text>
    <text x="150" y="90" textAnchor="middle" fill="#fecaca" fontSize="9">Context switches</text>
    <text x="150" y="105" textAnchor="middle" fill="#fecaca" fontSize="9">Thread blocking</text>
    <text x="150" y="120" textAnchor="middle" fill="#fecaca" fontSize="8">~1-10μs latency</text>
    <rect x="450" y="45" width="200" height="80" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="550" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">CAS / AtomicLong</text>
    <text x="550" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="9">No blocking</text>
    <text x="550" y="105" textAnchor="middle" fill="#bbf7d0" fontSize="9">Single CPU instruction</text>
    <text x="550" y="120" textAnchor="middle" fill="#bbf7d0" fontSize="8">~10-100ns latency</text>
    <text x="350" y="90" textAnchor="middle" fill="#fbbf24" fontSize="28">→</text>
    <text x="350" y="160" textAnchor="middle" fill="#64748b" fontSize="10">SPSC Queue • Disruptor • JCTools • lazySet for publish</text>
  </svg>
)

// Kernel Bypass Diagram
const KernelBypassDiagram = () => (
  <svg viewBox="0 0 700 220" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Kernel Bypass Networking</text>
    <rect x="50" y="40" width="250" height="150" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="175" y="60" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">Traditional Stack</text>
    <rect x="70" y="75" width="80" height="30" rx="4" fill="#3b82f6"/>
    <text x="110" y="95" textAnchor="middle" fill="white" fontSize="9">Application</text>
    <rect x="70" y="115" width="80" height="30" rx="4" fill="#f59e0b"/>
    <text x="110" y="135" textAnchor="middle" fill="white" fontSize="9">Kernel</text>
    <rect x="70" y="155" width="80" height="25" rx="4" fill="#22c55e"/>
    <text x="110" y="172" textAnchor="middle" fill="white" fontSize="9">NIC</text>
    <text x="200" y="130" textAnchor="middle" fill="#ef4444" fontSize="9">20-100μs</text>
    <rect x="400" y="40" width="250" height="150" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="525" y="60" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Kernel Bypass</text>
    <rect x="420" y="75" width="80" height="30" rx="4" fill="#3b82f6"/>
    <text x="460" y="95" textAnchor="middle" fill="white" fontSize="9">Application</text>
    <line x1="460" y1="105" x2="460" y2="155" stroke="#4ade80" strokeWidth="2"/>
    <rect x="420" y="155" width="80" height="25" rx="4" fill="#22c55e"/>
    <text x="460" y="172" textAnchor="middle" fill="white" fontSize="9">NIC</text>
    <text x="550" y="130" textAnchor="middle" fill="#4ade80" fontSize="9">1-5μs</text>
    <text x="350" y="210" textAnchor="middle" fill="#64748b" fontSize="10">DPDK • Solarflare ef_vi • Mellanox RDMA</text>
  </svg>
)

// Protocol Optimization Diagram
const ProtocolOptimDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Binary vs Text Protocols</text>
    <rect x="50" y="45" width="150" height="100" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="125" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">JSON/XML</text>
    <text x="125" y="90" textAnchor="middle" fill="#fecaca" fontSize="9">String parsing</text>
    <text x="125" y="105" textAnchor="middle" fill="#fecaca" fontSize="9">Object allocation</text>
    <text x="125" y="125" textAnchor="middle" fill="#fecaca" fontSize="8">~50-500μs</text>
    <rect x="275" y="45" width="150" height="100" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="350" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Protobuf</text>
    <text x="350" y="90" textAnchor="middle" fill="#fef3c7" fontSize="9">Binary encoding</text>
    <text x="350" y="105" textAnchor="middle" fill="#fef3c7" fontSize="9">Schema evolution</text>
    <text x="350" y="125" textAnchor="middle" fill="#fef3c7" fontSize="8">~5-20μs</text>
    <rect x="500" y="45" width="150" height="100" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="575" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">SBE</text>
    <text x="575" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="9">Zero-copy flyweight</text>
    <text x="575" y="105" textAnchor="middle" fill="#bbf7d0" fontSize="9">Fixed-size messages</text>
    <text x="575" y="125" textAnchor="middle" fill="#bbf7d0" fontSize="8">~100ns-1μs</text>
    <text x="350" y="165" textAnchor="middle" fill="#64748b" fontSize="10">Simple Binary Encoding for lowest latency trading messages</text>
  </svg>
)

// Co-location Diagram
const CoLocationDiagram = () => (
  <svg viewBox="0 0 700 200" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Exchange Co-location</text>
    <rect x="250" y="40" width="200" height="80" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="350" y="70" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Exchange</text>
    <text x="350" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="10">Matching Engine</text>
    <text x="350" y="105" textAnchor="middle" fill="#bfdbfe" fontSize="8">~10μs processing</text>
    <rect x="50" y="140" width="120" height="50" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="110" y="160" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Colo Server</text>
    <text x="110" y="175" textAnchor="middle" fill="#bbf7d0" fontSize="8">~500ns fiber</text>
    <rect x="530" y="140" width="120" height="50" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="590" y="160" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Remote</text>
    <text x="590" y="175" textAnchor="middle" fill="#fef3c7" fontSize="8">~10-100ms</text>
    <line x1="170" y1="140" x2="250" y2="120" stroke="#4ade80" strokeWidth="2"/>
    <line x1="450" y1="120" x2="530" y2="140" stroke="#fbbf24" strokeWidth="2"/>
    <text x="200" y="125" fill="#4ade80" fontSize="8">Cross-connect</text>
    <text x="480" y="125" fill="#fbbf24" fontSize="8">Internet</text>
  </svg>
)

// Thread Affinity Diagram
const ThreadAffinityDiagram = () => (
  <svg viewBox="0 0 700 200" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">CPU Thread Affinity</text>
    <rect x="50" y="45" width="600" height="60" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="350" y="65" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">CPU Cores (isolcpus=4,5,6,7)</text>
    {[0,1,2,3,4,5,6,7].map((i) => (
      <g key={i}>
        <rect x={70 + i * 72} y="75" width="60" height="25" rx="3" fill={i >= 4 ? '#22c55e' : '#64748b'}/>
        <text x={100 + i * 72} y="92" textAnchor="middle" fill="white" fontSize="9">Core {i}</text>
      </g>
    ))}
    <rect x="70" y="130" width="200" height="50" rx="4" fill="rgba(100, 116, 139, 0.3)" stroke="#64748b"/>
    <text x="170" y="155" textAnchor="middle" fill="#94a3b8" fontSize="9">OS + Other Processes</text>
    <text x="170" y="170" textAnchor="middle" fill="#64748b" fontSize="8">Cores 0-3</text>
    <rect x="358" y="130" width="280" height="50" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e"/>
    <text x="498" y="155" textAnchor="middle" fill="#4ade80" fontSize="9">Trading Critical Path (Pinned)</text>
    <text x="498" y="170" textAnchor="middle" fill="#22c55e" fontSize="8">Cores 4-7: No context switches</text>
  </svg>
)

// Cache Optimization Diagram
const CacheOptDiagram = () => (
  <svg viewBox="0 0 700 200" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">CPU Cache Hierarchy</text>
    <rect x="250" y="40" width="200" height="35" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="350" y="63" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">L1 Cache: ~1ns, 32KB</text>
    <rect x="200" y="85" width="300" height="35" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="350" y="108" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">L2 Cache: ~4ns, 256KB</text>
    <rect x="150" y="130" width="400" height="35" rx="4" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="350" y="153" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">L3 Cache: ~10ns, 8MB+</text>
    <rect x="50" y="175" width="300" height="20" rx="3" fill="#ef4444"/>
    <text x="200" y="189" textAnchor="middle" fill="white" fontSize="9">RAM: ~100ns - Cache Miss!</text>
    <text x="550" y="105" textAnchor="middle" fill="#64748b" fontSize="9">@Contended</text>
    <text x="550" y="120" textAnchor="middle" fill="#64748b" fontSize="8">prevents false sharing</text>
    <text x="550" y="185" textAnchor="middle" fill="#64748b" fontSize="9">Sequential access</text>
    <text x="550" y="200" textAnchor="middle" fill="#64748b" fontSize="8">prefetch friendly</text>
  </svg>
)

// Busy Spin Diagram
const BusySpinDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Busy Spin Strategies</text>
    <rect x="50" y="45" width="140" height="70" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="120" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Pure Spin</text>
    <text x="120" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">Lowest latency</text>
    <text x="120" y="105" textAnchor="middle" fill="#bbf7d0" fontSize="8">Highest CPU</text>
    <rect x="210" y="45" width="140" height="70" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="280" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">PAUSE Spin</text>
    <text x="280" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">onSpinWait()</text>
    <text x="280" y="105" textAnchor="middle" fill="#bfdbfe" fontSize="8">Power efficient</text>
    <rect x="370" y="45" width="140" height="70" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="440" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Yield</text>
    <text x="440" y="90" textAnchor="middle" fill="#fef3c7" fontSize="8">Thread.yield()</text>
    <text x="440" y="105" textAnchor="middle" fill="#fef3c7" fontSize="8">Moderate latency</text>
    <rect x="530" y="45" width="140" height="70" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="600" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Park</text>
    <text x="600" y="90" textAnchor="middle" fill="#fecaca" fontSize="8">LockSupport.park</text>
    <text x="600" y="105" textAnchor="middle" fill="#fecaca" fontSize="8">Higher latency</text>
    <line x1="50" y1="140" x2="670" y2="140" stroke="#4ade80" strokeWidth="2"/>
    <text x="120" y="155" fill="#4ade80" fontSize="8">Low Latency</text>
    <text x="600" y="155" fill="#ef4444" fontSize="8">Low CPU</text>
    <text x="350" y="170" textAnchor="middle" fill="#64748b" fontSize="9">Choose based on latency requirements vs CPU budget</text>
  </svg>
)

// Benchmark Diagram
const BenchmarkDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">JMH Benchmarking Workflow</text>
    <rect x="50" y="50" width="130" height="50" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="115" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Warmup</text>
    <text x="115" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">JIT compilation</text>
    <text x="195" y="75" fill="#4ade80" fontSize="16">→</text>
    <rect x="210" y="50" width="130" height="50" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="275" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Measure</text>
    <text x="275" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">Multiple iterations</text>
    <text x="355" y="75" fill="#4ade80" fontSize="16">→</text>
    <rect x="370" y="50" width="130" height="50" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="435" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Analyze</text>
    <text x="435" y="90" textAnchor="middle" fill="#fef3c7" fontSize="8">Statistics, outliers</text>
    <text x="515" y="75" fill="#4ade80" fontSize="16">→</text>
    <rect x="530" y="50" width="130" height="50" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="595" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Report</text>
    <text x="595" y="90" textAnchor="middle" fill="#ddd6fe" fontSize="8">ns/op, throughput</text>
    <rect x="150" y="120" width="400" height="45" rx="4" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e"/>
    <text x="350" y="142" textAnchor="middle" fill="#4ade80" fontSize="10">@BenchmarkMode(Mode.SampleTime) • @Fork(2) • Blackhole consumption</text>
    <text x="350" y="158" textAnchor="middle" fill="#64748b" fontSize="8">Avoid dead code elimination, ensure realistic measurements</text>
  </svg>
)

// Production Monitor Diagram
const ProductionMonitorDiagram = () => (
  <svg viewBox="0 0 700 200" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Production Latency Monitoring</text>
    <rect x="50" y="45" width="150" height="60" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="125" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Record Latency</text>
    <text x="125" y="90" textAnchor="middle" fill="#bfdbfe" fontSize="8">HdrHistogram</text>
    <rect x="230" y="45" width="150" height="60" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="305" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Export Metrics</text>
    <text x="305" y="90" textAnchor="middle" fill="#bbf7d0" fontSize="8">P50, P99, P99.9</text>
    <rect x="410" y="45" width="150" height="60" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="485" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Detect Anomaly</text>
    <text x="485" y="90" textAnchor="middle" fill="#fef3c7" fontSize="8">vs Baseline</text>
    <rect x="590" y="45" width="80" height="60" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="630" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Alert</text>
    <text x="630" y="90" textAnchor="middle" fill="#fecaca" fontSize="8">PagerDuty</text>
    <line x1="200" y1="75" x2="225" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="380" y1="75" x2="405" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="560" y1="75" x2="585" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <rect x="100" y="130" width="500" height="55" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6"/>
    <text x="350" y="152" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Correlate with System Events</text>
    <text x="350" y="170" textAnchor="middle" fill="#64748b" fontSize="9">GC pauses • CPU throttling • Network congestion • Deployment changes</text>
  </svg>
)

// Single Writer Diagram
const SingleWriterDiagram = () => (
  <svg viewBox="0 0 700 200" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Single-Writer Principle (LMAX Disruptor)</text>
    <rect x="50" y="50" width="100" height="50" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="80" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Producer</text>
    <line x1="150" y1="75" x2="200" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <ellipse cx="350" cy="100" rx="140" ry="70" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="350" y="85" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Ring Buffer</text>
    <text x="350" y="105" textAnchor="middle" fill="#22c55e" fontSize="9">Pre-allocated events</text>
    <text x="350" y="120" textAnchor="middle" fill="#22c55e" fontSize="8">Sequence barriers</text>
    <line x1="490" y1="60" x2="550" y2="50" stroke="#4ade80" strokeWidth="2"/>
    <line x1="490" y1="100" x2="550" y2="100" stroke="#4ade80" strokeWidth="2"/>
    <line x1="490" y1="140" x2="550" y2="150" stroke="#4ade80" strokeWidth="2"/>
    <rect x="550" y="35" width="100" height="35" rx="4" fill="#f59e0b"/>
    <text x="600" y="57" textAnchor="middle" fill="white" fontSize="9">Consumer 1</text>
    <rect x="550" y="85" width="100" height="35" rx="4" fill="#f59e0b"/>
    <text x="600" y="107" textAnchor="middle" fill="white" fontSize="9">Consumer 2</text>
    <rect x="550" y="135" width="100" height="35" rx="4" fill="#f59e0b"/>
    <text x="600" y="157" textAnchor="middle" fill="white" fontSize="9">Consumer 3</text>
    <text x="350" y="190" textAnchor="middle" fill="#64748b" fontSize="9">Single writer → no locks → no contention → predictable latency</text>
  </svg>
)

// Event Sourcing Diagram
const EventSourcingDiagram = () => (
  <svg viewBox="0 0 700 200" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Event Sourcing for Trading</text>
    <rect x="50" y="50" width="100" height="45" rx="4" fill="#3b82f6"/>
    <text x="100" y="77" textAnchor="middle" fill="white" fontSize="9">Command</text>
    <line x1="150" y1="72" x2="180" y2="72" stroke="#4ade80" strokeWidth="2"/>
    <rect x="180" y="50" width="100" height="45" rx="4" fill="#22c55e"/>
    <text x="230" y="77" textAnchor="middle" fill="white" fontSize="9">Event</text>
    <line x1="280" y1="72" x2="310" y2="72" stroke="#4ade80" strokeWidth="2"/>
    <rect x="310" y="40" width="200" height="65" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="410" y="62" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Event Store</text>
    <text x="410" y="80" textAnchor="middle" fill="#fef3c7" fontSize="8">Append-only log</text>
    <text x="410" y="95" textAnchor="middle" fill="#fef3c7" fontSize="8">Immutable history</text>
    <line x1="510" y1="72" x2="540" y2="72" stroke="#4ade80" strokeWidth="2"/>
    <rect x="540" y="50" width="100" height="45" rx="4" fill="#8b5cf6"/>
    <text x="590" y="77" textAnchor="middle" fill="white" fontSize="9">State</text>
    <rect x="100" y="130" width="500" height="50" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6"/>
    <text x="350" y="152" textAnchor="middle" fill="#60a5fa" fontSize="10">Replay events → Rebuild state at any point in time</text>
    <text x="350" y="170" textAnchor="middle" fill="#64748b" fontSize="9">Complete audit trail • Point-in-time recovery • Debugging</text>
  </svg>
)

// CQRS Diagram
const CQRSDiagram = () => (
  <svg viewBox="0 0 700 220" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">CQRS - Command Query Responsibility Segregation</text>
    <rect x="50" y="45" width="250" height="80" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="175" y="65" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Command Side (Write)</text>
    <text x="175" y="85" textAnchor="middle" fill="#bfdbfe" fontSize="9">Validation, business rules</text>
    <text x="175" y="100" textAnchor="middle" fill="#bfdbfe" fontSize="9">Event generation</text>
    <text x="175" y="115" textAnchor="middle" fill="#bfdbfe" fontSize="8">Consistency optimized</text>
    <rect x="400" y="45" width="250" height="80" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="525" y="65" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Query Side (Read)</text>
    <text x="525" y="85" textAnchor="middle" fill="#bbf7d0" fontSize="9">Denormalized views</text>
    <text x="525" y="100" textAnchor="middle" fill="#bbf7d0" fontSize="9">Pre-computed aggregates</text>
    <text x="525" y="115" textAnchor="middle" fill="#bbf7d0" fontSize="8">Performance optimized</text>
    <rect x="250" y="150" width="200" height="50" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="350" y="175" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Event Bus</text>
    <text x="350" y="190" textAnchor="middle" fill="#fef3c7" fontSize="8">Kafka / RabbitMQ</text>
    <line x1="175" y1="125" x2="175" y2="145" stroke="#3b82f6" strokeWidth="2"/>
    <line x1="175" y1="145" x2="250" y2="175" stroke="#3b82f6" strokeWidth="2"/>
    <line x1="450" y1="175" x2="525" y2="145" stroke="#22c55e" strokeWidth="2"/>
    <line x1="525" y1="145" x2="525" y2="125" stroke="#22c55e" strokeWidth="2"/>
  </svg>
)

// Low Latency Architecture Diagram
const LowLatencyArchDiagram = () => (
  <svg viewBox="0 0 750 250" style={{ width: '100%', maxWidth: '750px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="llArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>
    <text x="375" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Low Latency Trading Architecture</text>
    {/* Network */}
    <rect x="30" y="60" width="120" height="70" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="90" y="90" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Network</text>
    <text x="90" y="108" textAnchor="middle" fill="#fecaca" fontSize="8">Kernel Bypass</text>
    <text x="90" y="120" textAnchor="middle" fill="#fecaca" fontSize="8">DPDK / Solarflare</text>
    {/* Messaging */}
    <rect x="180" y="60" width="120" height="70" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="240" y="90" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Messaging</text>
    <text x="240" y="108" textAnchor="middle" fill="#fef3c7" fontSize="8">Aeron / Chronicle</text>
    <text x="240" y="120" textAnchor="middle" fill="#fef3c7" fontSize="8">Lock-free queues</text>
    {/* Processing */}
    <rect x="330" y="60" width="120" height="70" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="390" y="90" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Processing</text>
    <text x="390" y="108" textAnchor="middle" fill="#bbf7d0" fontSize="8">Single-threaded</text>
    <text x="390" y="120" textAnchor="middle" fill="#bbf7d0" fontSize="8">Mechanical sympathy</text>
    {/* Memory */}
    <rect x="480" y="60" width="120" height="70" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="540" y="90" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Memory</text>
    <text x="540" y="108" textAnchor="middle" fill="#bfdbfe" fontSize="8">Off-heap storage</text>
    <text x="540" y="120" textAnchor="middle" fill="#bfdbfe" fontSize="8">Pre-allocation</text>
    {/* JVM */}
    <rect x="630" y="60" width="90" height="70" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="675" y="90" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">JVM</text>
    <text x="675" y="108" textAnchor="middle" fill="#ddd6fe" fontSize="8">ZGC/Shenandoah</text>
    <text x="675" y="120" textAnchor="middle" fill="#ddd6fe" fontSize="8">No GC pauses</text>
    {/* Arrows */}
    <line x1="150" y1="95" x2="175" y2="95" stroke="#4ade80" strokeWidth="2" markerEnd="url(#llArrow)"/>
    <line x1="300" y1="95" x2="325" y2="95" stroke="#4ade80" strokeWidth="2" markerEnd="url(#llArrow)"/>
    <line x1="450" y1="95" x2="475" y2="95" stroke="#4ade80" strokeWidth="2" markerEnd="url(#llArrow)"/>
    <line x1="600" y1="95" x2="625" y2="95" stroke="#4ade80" strokeWidth="2" markerEnd="url(#llArrow)"/>
    {/* Latency targets */}
    <rect x="180" y="160" width="400" height="60" rx="6" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" strokeWidth="2"/>
    <text x="380" y="185" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Latency Targets</text>
    <text x="250" y="205" fill="#64748b" fontSize="9">{`Network: &lt;1μs`}</text>
    <text x="350" y="205" fill="#64748b" fontSize="9">{`Processing: &lt;10μs`}</text>
    <text x="470" y="205" fill="#64748b" fontSize="9">{`End-to-end: &lt;50μs`}</text>
  </svg>
)

function LowLatency({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'java-performance',
      name: 'Java Performance',
      icon: '☕',
      color: '#f59e0b',
      description: 'Optimizing Java applications for low-latency trading',
      diagram: JVMMemoryDiagram,
      details: [
        {
          name: 'JVM Tuning',
          diagram: JVMTuningDiagram,
          explanation: 'Low-latency Java requires careful JVM configuration. Use latest JDK (21+) for improvements. Choose GC: ZGC or Shenandoah for sub-millisecond pauses, or Epsilon for zero-GC applications. Heap sizing, JIT compilation settings, and memory layout all impact latency.',
          codeExample: `# Low-Latency JVM Arguments
java \\
  # Memory
  -Xms8g -Xmx8g \\                    # Fixed heap size (no resizing)
  -XX:+AlwaysPreTouch \\              # Pre-fault heap pages
  -XX:+UseNUMA \\                     # NUMA-aware allocation

  # Garbage Collection (choose one)
  -XX:+UseZGC \\                      # ZGC: <1ms pauses
  -XX:+ZUncommit \\                   # Return memory to OS
  # OR
  -XX:+UseEpsilonGC \\                # No GC (for zero-alloc apps)

  # JIT Compilation
  -XX:+TieredCompilation \\
  -XX:CompileThreshold=1000 \\        # Faster warmup
  -XX:+UseCompressedOops \\           # Smaller object references

  # Disable features that add latency
  -XX:-UseBiasedLocking \\            # Biased locking adds pauses
  -XX:+DisableExplicitGC \\           # Ignore System.gc() calls
  -XX:-UseCounterDecay \\             # Stable profiling

  # Diagnostic (for tuning)
  -Xlog:gc*:file=gc.log \\            # GC logging
  -XX:+PrintCompilation \\            # JIT compilation events

  -jar trading-app.jar`
        },
        {
          name: 'Object Allocation',
          diagram: ObjectAllocationDiagram,
          explanation: 'Minimize object allocation on the critical path. Use primitive types instead of wrappers. Object pooling for frequently used objects. Flyweight pattern for encoding/decoding. Stack allocation via escape analysis. Monitor allocation rate with JFR.',
          codeExample: `// Zero-Allocation Trading Code
public class ZeroAllocOrderProcessor {
    // Pre-allocated buffer pool
    private final ObjectPool<MutableOrder> orderPool;
    private final ObjectPool<UnsafeBuffer> bufferPool;

    // Primitive-based order representation
    private static class MutableOrder {
        long orderId;
        long timestamp;
        int symbolId;      // Use int ID instead of String
        int side;          // 0=BUY, 1=SELL
        long quantity;
        long priceFixed;   // Fixed-point: price * 100000000

        void reset() {
            orderId = 0;
            timestamp = 0;
            symbolId = 0;
            side = 0;
            quantity = 0;
            priceFixed = 0;
        }
    }

    // Process without allocation
    public void processOrder(DirectBuffer buffer, int offset) {
        MutableOrder order = orderPool.acquire();
        try {
            // Decode directly into pooled object
            order.orderId = buffer.getLong(offset);
            order.timestamp = buffer.getLong(offset + 8);
            order.symbolId = buffer.getInt(offset + 16);
            order.side = buffer.getInt(offset + 20);
            order.quantity = buffer.getLong(offset + 24);
            order.priceFixed = buffer.getLong(offset + 32);

            // Process order (no allocation)
            matchOrder(order);
        } finally {
            order.reset();
            orderPool.release(order);
        }
    }

    // Fixed-point arithmetic for prices (avoid double allocation)
    public static long multiplyPrice(long priceFixed, long quantity) {
        // Price in fixed-point (8 decimal places)
        // Result needs scaling
        return (priceFixed * quantity) / 100_000_000L;
    }
}`
        },
        {
          name: 'Lock-Free Data Structures',
          diagram: LockFreeDiagram,
          explanation: 'Avoid locks on the critical path - they cause context switches. Use lock-free queues (LMAX Disruptor, JCTools). Compare-and-swap (CAS) operations for atomicity. Single-writer principle eliminates contention. Memory barriers ensure visibility.',
          codeExample: `// Lock-Free Single-Producer Single-Consumer Queue
import java.util.concurrent.atomic.AtomicLong;
import sun.misc.Contended;

public class SPSCQueue<T> {
    private final Object[] buffer;
    private final int mask;

    @Contended  // Prevent false sharing
    private final AtomicLong producerIndex = new AtomicLong(0);

    @Contended
    private final AtomicLong consumerIndex = new AtomicLong(0);

    public SPSCQueue(int capacity) {
        // Capacity must be power of 2
        int actualCapacity = Integer.highestOneBit(capacity - 1) << 1;
        this.buffer = new Object[actualCapacity];
        this.mask = actualCapacity - 1;
    }

    public boolean offer(T element) {
        long producerIdx = producerIndex.get();
        long consumerIdx = consumerIndex.get();

        // Check if queue is full
        if (producerIdx - consumerIdx >= buffer.length) {
            return false;  // Queue full
        }

        // Store element
        buffer[(int)(producerIdx & mask)] = element;

        // Publish (store barrier ensures element visible before index)
        producerIndex.lazySet(producerIdx + 1);
        return true;
    }

    @SuppressWarnings("unchecked")
    public T poll() {
        long consumerIdx = consumerIndex.get();
        long producerIdx = producerIndex.get();

        // Check if queue is empty
        if (consumerIdx >= producerIdx) {
            return null;  // Queue empty
        }

        // Load element
        T element = (T) buffer[(int)(consumerIdx & mask)];
        buffer[(int)(consumerIdx & mask)] = null;  // Help GC

        // Advance consumer (store barrier)
        consumerIndex.lazySet(consumerIdx + 1);
        return element;
    }
}`
        }
      ]
    },
    {
      id: 'network-optimization',
      name: 'Network Optimization',
      icon: '🌐',
      color: '#3b82f6',
      description: 'Minimizing network latency for trading systems',
      details: [
        {
          name: 'Kernel Bypass',
          diagram: KernelBypassDiagram,
          explanation: 'Traditional network stack adds microseconds of latency. Kernel bypass technologies (DPDK, Solarflare ef_vi) eliminate kernel involvement. User-space networking provides sub-microsecond latencies. Requires specialized NICs and dedicated CPU cores.',
          codeExample: `// Conceptual Kernel Bypass vs Traditional
// Traditional Socket (adds ~10-50us latency)
Socket socket = new Socket("exchange.com", 9000);
OutputStream out = socket.getOutputStream();
out.write(orderBytes);  // Goes through kernel

// Kernel Bypass with Solarflare ef_vi (conceptual)
// Direct NIC access, bypassing kernel entirely
ef_vi vi = ef_vi_alloc();  // Allocate virtual interface
ef_vi_transmit(vi, orderBytes, length);  // Direct to NIC

// Typical latency comparison:
// Traditional TCP: 20-100 microseconds
// Kernel bypass:   1-5 microseconds
// FPGA:           100-500 nanoseconds

// Linux Socket Optimization (when kernel bypass not available)
int fd = socket(AF_INET, SOCK_STREAM, 0);

// Disable Nagle's algorithm
int flag = 1;
setsockopt(fd, IPPROTO_TCP, TCP_NODELAY, &flag, sizeof(flag));

// Enable TCP quickack
setsockopt(fd, IPPROTO_TCP, TCP_QUICKACK, &flag, sizeof(flag));

// Increase socket buffers
int bufSize = 4 * 1024 * 1024;  // 4MB
setsockopt(fd, SOL_SOCKET, SO_RCVBUF, &bufSize, sizeof(bufSize));
setsockopt(fd, SOL_SOCKET, SO_SNDBUF, &bufSize, sizeof(bufSize));`
        },
        {
          name: 'Protocol Optimization',
          diagram: ProtocolOptimDiagram,
          explanation: 'Binary protocols (SBE, Protobuf) faster than text (JSON, XML). Fixed-size messages enable zero-copy parsing. Batch multiple orders in single packet. Compress only if bandwidth-constrained. Consider UDP for one-way messages.',
          codeExample: `// Simple Binary Encoding (SBE) for Trading
// SBE Schema (order.xml)
/*
<sbe:message name="NewOrder" id="1">
    <field name="orderId" id="1" type="uint64"/>
    <field name="symbolId" id="2" type="uint32"/>
    <field name="side" id="3" type="Side"/>
    <field name="quantity" id="4" type="uint64"/>
    <field name="price" id="5" type="uint64"/>
    <field name="timestamp" id="6" type="uint64"/>
</sbe:message>
*/

// Generated encoder (flyweight pattern)
public class NewOrderEncoder {
    private MutableDirectBuffer buffer;
    private int offset;

    public NewOrderEncoder wrap(MutableDirectBuffer buffer, int offset) {
        this.buffer = buffer;
        this.offset = offset;
        return this;
    }

    public NewOrderEncoder orderId(long value) {
        buffer.putLong(offset + 0, value, ByteOrder.LITTLE_ENDIAN);
        return this;
    }

    public NewOrderEncoder symbolId(int value) {
        buffer.putInt(offset + 8, value, ByteOrder.LITTLE_ENDIAN);
        return this;
    }

    // ... other fields

    public static int encodedLength() {
        return 48;  // Fixed size, known at compile time
    }
}

// Usage - zero allocation
NewOrderEncoder encoder = new NewOrderEncoder();  // Reuse
UnsafeBuffer buffer = new UnsafeBuffer(new byte[48]);  // Pre-allocated

encoder.wrap(buffer, 0)
    .orderId(123456789L)
    .symbolId(1001)
    .side(Side.BUY)
    .quantity(100)
    .price(15025000000L)  // Fixed-point
    .timestamp(System.nanoTime());

// Send buffer directly - no serialization overhead`
        },
        {
          name: 'Co-location',
          diagram: CoLocationDiagram,
          explanation: 'Physical proximity to exchange reduces network latency. Co-location places servers in exchange data centers. Cross-connects provide direct fiber to matching engine. Every meter of fiber adds ~5 nanoseconds. Microwave links for inter-exchange communication.',
          codeExample: `// Co-location Network Configuration and Monitoring
public class CoLocationConfig {

    // Latency targets for co-located environment
    public static final long CROSS_CONNECT_LATENCY_NS = 500;     // ~500ns direct fiber
    public static final long SWITCH_LATENCY_NS = 200;            // Low-latency switch
    public static final long NIC_LATENCY_NS = 1000;              // Kernel bypass NIC
    public static final long TOTAL_NETWORK_BUDGET_NS = 2000;     // 2 microseconds max

    // Network interface configuration
    public NetworkConfig getOptimalConfig() {
        return NetworkConfig.builder()
            // Use kernel bypass for lowest latency
            .useKernelBypass(true)
            .nicDriver("solarflare_ef_vi")  // Or "mellanox_rdma"

            // Disable features that add latency
            .disableNagle(true)
            .disableDelayedAck(true)
            .enableTcpQuickAck(true)

            // Buffer tuning
            .socketSendBuffer(4 * 1024 * 1024)   // 4MB
            .socketRecvBuffer(4 * 1024 * 1024)

            // Interrupt coalescing (trade throughput for latency)
            .rxCoalesceUsecs(0)   // No coalescing
            .txCoalesceUsecs(0)

            // CPU affinity for NIC interrupts
            .nicIrqCpu(2)         // Dedicated core
            .pollCpu(3)           // Dedicated poll thread

            .build();
    }

    // Monitor network latency
    @Scheduled(fixedRate = 1000)
    public void monitorLatency() {
        long pingLatencyNs = measurePingLatency();

        if (pingLatencyNs > TOTAL_NETWORK_BUDGET_NS * 1.5) {
            alerting.sendAlert(
                "Network latency degraded: " + pingLatencyNs + "ns " +
                "(budget: " + TOTAL_NETWORK_BUDGET_NS + "ns)"
            );
        }

        metrics.recordLatency("network.ping", pingLatencyNs);
    }

    private long measurePingLatency() {
        long start = System.nanoTime();
        // Send minimal packet to exchange gateway
        exchangeGateway.ping();
        return System.nanoTime() - start;
    }
}`
        }
      ]
    },
    {
      id: 'cpu-optimization',
      name: 'CPU Optimization',
      icon: '💻',
      color: '#22c55e',
      description: 'Maximizing CPU efficiency for trading workloads',
      details: [
        {
          name: 'Thread Affinity',
          diagram: ThreadAffinityDiagram,
          explanation: 'Pin critical threads to dedicated CPU cores. Prevents context switches and cache pollution. Isolate cores from OS scheduler (isolcpus). Use taskset or cgroups for pinning. NUMA-aware allocation for multi-socket systems.',
          codeExample: `// Thread Affinity in Java with Affinity Library
import net.openhft.affinity.AffinityLock;
import net.openhft.affinity.AffinityStrategies;

public class AffinityExample {

    public void runCriticalPath() {
        // Acquire exclusive lock on a CPU core
        try (AffinityLock lock = AffinityLock.acquireLock()) {
            System.out.println("Running on CPU: " + lock.cpuId());

            // Critical path runs on dedicated core
            while (running) {
                processOrders();
            }
        }
        // Lock released, core available for other threads
    }

    public void runWithSpecificCore(int coreId) {
        // Pin to specific core
        try (AffinityLock lock = AffinityLock.acquireLock(coreId)) {
            // Thread pinned to coreId
            runTradingLoop();
        }
    }

    // Linux: Use isolcpus kernel parameter
    // GRUB_CMDLINE_LINUX="isolcpus=4,5,6,7"
    //
    // Then pin trading threads to isolated cores:
    // taskset -c 4 java -jar trading.jar

    // Check current affinity
    public static void printAffinity() {
        BitSet affinity = Affinity.getAffinity();
        System.out.println("Thread can run on CPUs: " + affinity);
    }
}`
        },
        {
          name: 'Cache Optimization',
          diagram: CacheOptDiagram,
          explanation: 'CPU cache misses add 100+ nanoseconds. Keep hot data in L1/L2 cache. Avoid false sharing with @Contended. Sequential memory access patterns. Prefetch data before it is needed. Profile with perf or VTune.',
          codeExample: `// Cache-Friendly Data Layout
import sun.misc.Contended;

// BAD: False sharing - adjacent fields on same cache line
public class BadCounters {
    volatile long counter1;  // Thread 1 writes
    volatile long counter2;  // Thread 2 writes
    // Both on same 64-byte cache line = contention!
}

// GOOD: Prevent false sharing
public class GoodCounters {
    @Contended
    volatile long counter1;  // Own cache line

    @Contended
    volatile long counter2;  // Own cache line
}

// Cache-friendly order book
public class CacheFriendlyOrderBook {
    // Store orders in contiguous array (cache-friendly)
    private final long[] orderIds;
    private final long[] prices;
    private final long[] quantities;
    private final int[] sides;

    // Structure of Arrays (SoA) vs Array of Structures (AoS)
    // SoA is more cache-friendly for columnar access

    // Prefetch hint (JVM may optimize)
    public void processOrders(int start, int end) {
        for (int i = start; i < end; i++) {
            // Access pattern is sequential = cache-friendly
            long orderId = orderIds[i];
            long price = prices[i];
            long qty = quantities[i];

            // Process order...
        }
    }

    // Pad arrays to cache line boundaries
    private static final int CACHE_LINE_SIZE = 64;
    private byte[] padding = new byte[CACHE_LINE_SIZE];
}`
        },
        {
          name: 'Busy Spinning',
          diagram: BusySpinDiagram,
          explanation: 'Avoid sleeping or yielding on critical path. Busy spin wastes CPU but provides lowest latency. Use backoff strategies for efficiency. PAUSE instruction reduces power consumption. Consider hybrid approach: spin then park.',
          codeExample: `// Busy Spin Strategies
public class BusySpinStrategies {

    // Pure busy spin - lowest latency, highest CPU
    public void busySpinWait(Supplier<Boolean> condition) {
        while (!condition.get()) {
            // Spin - do nothing
        }
    }

    // With PAUSE instruction - reduces power, helps hyperthreading
    public void pauseSpinWait(Supplier<Boolean> condition) {
        while (!condition.get()) {
            Thread.onSpinWait();  // Intrinsic for PAUSE instruction
        }
    }

    // Exponential backoff - balances latency vs CPU
    public void backoffSpinWait(Supplier<Boolean> condition) {
        int spins = 0;
        while (!condition.get()) {
            if (spins < 10) {
                // Phase 1: Pure spin
                spins++;
            } else if (spins < 20) {
                // Phase 2: Spin with pause
                Thread.onSpinWait();
                spins++;
            } else if (spins < 50) {
                // Phase 3: Yield
                Thread.yield();
                spins++;
            } else {
                // Phase 4: Park briefly
                LockSupport.parkNanos(1000);  // 1 microsecond
            }
        }
    }

    // LMAX-style idle strategy
    public interface IdleStrategy {
        void idle(int workCount);
    }

    public class BusySpinIdleStrategy implements IdleStrategy {
        public void idle(int workCount) {
            // Do nothing - pure busy spin
        }
    }

    public class YieldingIdleStrategy implements IdleStrategy {
        public void idle(int workCount) {
            if (workCount == 0) {
                Thread.yield();
            }
        }
    }
}`
        }
      ]
    },
    {
      id: 'measurement',
      name: 'Latency Measurement',
      icon: '📏',
      color: '#ef4444',
      description: 'Accurately measuring and analyzing system latency',
      diagram: LatencyHistogramDiagram,
      details: [
        {
          name: 'Latency Histograms',
          explanation: 'Measure percentiles, not averages. P50, P99, P99.9, P99.99 tell different stories. Use HdrHistogram for accurate percentiles. Coordinated omission skews results. Measure end-to-end, not just components.',
          codeExample: `// HdrHistogram for Latency Measurement
import org.HdrHistogram.Histogram;

public class LatencyTracker {
    // Record latencies up to 1 second with 3 significant digits
    private final Histogram histogram = new Histogram(
        1_000_000_000L,  // Max value: 1 second in nanos
        3                 // Significant digits
    );

    public void recordLatency(long startNanos) {
        long latency = System.nanoTime() - startNanos;
        histogram.recordValue(latency);
    }

    public void printStatistics() {
        System.out.printf("Count:   %d%n", histogram.getTotalCount());
        System.out.printf("Min:     %d ns%n", histogram.getMinValue());
        System.out.printf("Max:     %d ns%n", histogram.getMaxValue());
        System.out.printf("Mean:    %.2f ns%n", histogram.getMean());
        System.out.printf("StdDev:  %.2f ns%n", histogram.getStdDeviation());
        System.out.println();
        System.out.printf("P50:     %d ns%n", histogram.getValueAtPercentile(50));
        System.out.printf("P90:     %d ns%n", histogram.getValueAtPercentile(90));
        System.out.printf("P99:     %d ns%n", histogram.getValueAtPercentile(99));
        System.out.printf("P99.9:   %d ns%n", histogram.getValueAtPercentile(99.9));
        System.out.printf("P99.99:  %d ns%n", histogram.getValueAtPercentile(99.99));
    }

    // Export for visualization
    public void exportToFile(String filename) throws IOException {
        try (PrintStream out = new PrintStream(filename)) {
            histogram.outputPercentileDistribution(out, 1.0);
        }
    }

    // Reset for next interval
    public Histogram getAndReset() {
        Histogram copy = histogram.copy();
        histogram.reset();
        return copy;
    }
}

// Usage in trading system
LatencyTracker orderLatency = new LatencyTracker();
LatencyTracker marketDataLatency = new LatencyTracker();

void processOrder(Order order) {
    long start = System.nanoTime();

    // Process order...
    matchingEngine.submit(order);

    orderLatency.recordLatency(start);
}`
        },
        {
          name: 'Benchmarking',
          diagram: BenchmarkDiagram,
          explanation: 'JMH (Java Microbenchmark Harness) for component benchmarks. Warm up JIT compiler before measuring. Control for GC pauses. Measure under realistic load conditions. Compare against baseline measurements.',
          codeExample: `// JMH Benchmark for Trading Components
import org.openjdk.jmh.annotations.*;

@BenchmarkMode(Mode.SampleTime)
@OutputTimeUnit(TimeUnit.NANOSECONDS)
@State(Scope.Thread)
@Warmup(iterations = 5, time = 1)
@Measurement(iterations = 10, time = 1)
@Fork(value = 2, jvmArgs = {
    "-Xms4g", "-Xmx4g",
    "-XX:+UseZGC",
    "-XX:+AlwaysPreTouch"
})
public class OrderBookBenchmark {

    private OrderBook orderBook;
    private Order buyOrder;
    private Order sellOrder;

    @Setup(Level.Trial)
    public void setup() {
        orderBook = new OrderBook("AAPL");
        // Pre-populate order book
        for (int i = 0; i < 1000; i++) {
            orderBook.addOrder(createOrder(Side.BUY, 150.00 - i * 0.01));
            orderBook.addOrder(createOrder(Side.SELL, 150.01 + i * 0.01));
        }
        buyOrder = createOrder(Side.BUY, 149.95);
        sellOrder = createOrder(Side.SELL, 150.05);
    }

    @Benchmark
    public void addLimitOrder(Blackhole bh) {
        Order order = createOrder(Side.BUY, 149.50);
        bh.consume(orderBook.addOrder(order));
    }

    @Benchmark
    public void matchMarketOrder(Blackhole bh) {
        Order marketOrder = createMarketOrder(Side.BUY, 100);
        bh.consume(orderBook.match(marketOrder));
    }

    @Benchmark
    public void cancelOrder(Blackhole bh) {
        Order order = createOrder(Side.BUY, 149.00);
        long orderId = orderBook.addOrder(order);
        bh.consume(orderBook.cancelOrder(orderId));
    }
}

// Run: java -jar benchmarks.jar OrderBookBenchmark`
        },
        {
          name: 'Production Monitoring',
          diagram: ProductionMonitorDiagram,
          explanation: 'Continuous latency monitoring in production. Sample-based profiling to minimize overhead. Correlate latency with system events. Alert on percentile degradation. Store historical data for trend analysis.',
          codeExample: `// Production Latency Monitoring System
@Service
public class ProductionLatencyMonitor {
    private final Histogram orderLatency = new Histogram(1_000_000_000L, 3);
    private final Histogram marketDataLatency = new Histogram(1_000_000_000L, 3);
    private final AlertService alertService;
    private final MetricsExporter metricsExporter;

    // Baseline percentiles (set during normal operation)
    private volatile long baselineP99 = 1_000_000;  // 1ms default
    private volatile long baselineP999 = 5_000_000; // 5ms default

    public void recordOrderLatency(long startNanos) {
        long latency = System.nanoTime() - startNanos;
        orderLatency.recordValue(latency);

        // Check for tail latency spikes
        if (latency > baselineP999 * 2) {
            alertService.sendWarning("Order latency spike: " +
                (latency / 1000) + " microseconds");
        }
    }

    // Periodic percentile check and export
    @Scheduled(fixedRate = 10000)  // Every 10 seconds
    public void exportMetrics() {
        // Current percentiles
        long p50 = orderLatency.getValueAtPercentile(50);
        long p99 = orderLatency.getValueAtPercentile(99);
        long p999 = orderLatency.getValueAtPercentile(99.9);

        // Export to monitoring system
        metricsExporter.gauge("order.latency.p50", p50);
        metricsExporter.gauge("order.latency.p99", p99);
        metricsExporter.gauge("order.latency.p999", p999);

        // Detect degradation
        if (p99 > baselineP99 * 1.5) {
            alertService.sendAlert(AlertLevel.WARNING,
                String.format("P99 latency degraded: %d us (baseline: %d us)",
                    p99 / 1000, baselineP99 / 1000));
        }

        // Correlate with system events
        GCStats gcStats = getRecentGCStats();
        if (gcStats.getPauseTimeMs() > 1 && p999 > baselineP999) {
            alertService.sendInfo(
                "Latency spike correlated with GC pause: " +
                gcStats.getPauseTimeMs() + "ms");
        }

        // Reset for next interval (optional - depends on use case)
        Histogram snapshot = orderLatency.copy();
        orderLatency.reset();

        // Store for historical analysis
        historicalStore.save(Instant.now(), snapshot);
    }

    // Update baseline during stable periods
    @Scheduled(cron = "0 0 2 * * *")  // 2 AM daily
    public void updateBaseline() {
        baselineP99 = orderLatency.getValueAtPercentile(99);
        baselineP999 = orderLatency.getValueAtPercentile(99.9);
        log.info("Updated latency baselines: P99={}, P999={}",
            baselineP99, baselineP999);
    }
}`
        }
      ]
    },
    {
      id: 'architecture-patterns',
      name: 'Architecture Patterns',
      icon: '🏗️',
      color: '#8b5cf6',
      description: 'System design patterns for low-latency trading',
      diagram: LowLatencyArchDiagram,
      details: [
        {
          name: 'Single-Writer Principle',
          diagram: SingleWriterDiagram,
          explanation: 'Only one thread writes to any data structure. Eliminates locks and memory barriers. Other threads read eventually-consistent data. Enables lock-free algorithms. LMAX Disruptor is built on this principle.',
          codeExample: `// Single-Writer Pattern with Disruptor
import com.lmax.disruptor.*;
import com.lmax.disruptor.dsl.Disruptor;

public class SingleWriterTradingEngine {

    // Event class (pre-allocated in ring buffer)
    public static class OrderEvent {
        long orderId;
        int symbolId;
        int side;
        long quantity;
        long price;

        public void clear() {
            orderId = 0;
            symbolId = 0;
            side = 0;
            quantity = 0;
            price = 0;
        }
    }

    // Single writer publishes to ring buffer
    private final RingBuffer<OrderEvent> ringBuffer;

    public void publishOrder(long orderId, int symbol, int side,
                             long qty, long price) {
        // Claim next slot (single writer, no contention)
        long sequence = ringBuffer.next();
        try {
            OrderEvent event = ringBuffer.get(sequence);
            event.orderId = orderId;
            event.symbolId = symbol;
            event.side = side;
            event.quantity = qty;
            event.price = price;
        } finally {
            // Publish (memory barrier)
            ringBuffer.publish(sequence);
        }
    }

    // Multiple readers process events
    public class OrderProcessor implements EventHandler<OrderEvent> {
        @Override
        public void onEvent(OrderEvent event, long sequence,
                           boolean endOfBatch) {
            // Process order (read-only, no contention)
            processOrder(event);
        }
    }

    // Setup
    public void initialize() {
        Disruptor<OrderEvent> disruptor = new Disruptor<>(
            OrderEvent::new,
            1024 * 1024,  // Ring buffer size
            DaemonThreadFactory.INSTANCE,
            ProducerType.SINGLE,  // Single writer
            new BusySpinWaitStrategy()  // Lowest latency
        );

        disruptor.handleEventsWith(new OrderProcessor());
        this.ringBuffer = disruptor.start();
    }
}`
        },
        {
          name: 'Event Sourcing',
          diagram: EventSourcingDiagram,
          explanation: 'Store all state changes as immutable events. Replay events to rebuild state. Enables point-in-time recovery. Provides complete audit trail. Decouples command processing from state storage.',
          codeExample: `// Event Sourcing for Trading System
public class EventSourcedOrderBook {
    private final EventStore eventStore;
    private final OrderBookState state;
    private long lastSequence = 0;

    // All mutations are events
    public interface OrderBookEvent {
        long getSequence();
        long getTimestamp();
    }

    public record OrderAdded(long sequence, long timestamp, long orderId,
        String symbol, Side side, long price, long quantity) implements OrderBookEvent {}

    public record OrderCancelled(long sequence, long timestamp,
        long orderId, String reason) implements OrderBookEvent {}

    public record OrderMatched(long sequence, long timestamp, long buyOrderId,
        long sellOrderId, long price, long quantity) implements OrderBookEvent {}

    // Commands produce events
    public OrderAdded addOrder(Order order) {
        // Validate
        validateOrder(order);

        // Create event
        OrderAdded event = new OrderAdded(
            ++lastSequence,
            System.nanoTime(),
            order.getOrderId(),
            order.getSymbol(),
            order.getSide(),
            order.getPrice(),
            order.getQuantity()
        );

        // Persist event (append-only, never mutate)
        eventStore.append(event);

        // Apply to current state
        applyEvent(event);

        return event;
    }

    // Rebuild state from events
    public void replayFromStart() {
        state.reset();
        lastSequence = 0;

        eventStore.readAll().forEach(this::applyEvent);
    }

    // Point-in-time recovery
    public OrderBookState getStateAt(long timestamp) {
        OrderBookState historicalState = new OrderBookState();

        eventStore.readAll()
            .takeWhile(e -> e.getTimestamp() <= timestamp)
            .forEach(event -> applyToState(historicalState, event));

        return historicalState;
    }

    private void applyEvent(OrderBookEvent event) {
        switch (event) {
            case OrderAdded e -> state.addOrder(e);
            case OrderCancelled e -> state.cancelOrder(e);
            case OrderMatched e -> state.recordMatch(e);
            default -> throw new UnknownEventException(event);
        }
        lastSequence = event.getSequence();
    }

    // Snapshots for faster recovery
    @Scheduled(fixedRate = 60000)
    public void createSnapshot() {
        Snapshot snapshot = new Snapshot(lastSequence, state.copy());
        snapshotStore.save(snapshot);
    }
}`
        },
        {
          name: 'CQRS',
          diagram: CQRSDiagram,
          explanation: 'Command Query Responsibility Segregation. Separate write model from read model. Optimize each for its purpose. Write model: consistency, validation. Read model: denormalized, fast queries. Connected via events.',
          codeExample: `// CQRS Pattern for Trading System
// COMMAND SIDE - Optimized for consistency and validation
@Service
public class OrderCommandService {
    private final EventStore eventStore;
    private final OrderValidator validator;

    public void submitOrder(SubmitOrderCommand cmd) {
        // Validate business rules
        validator.validate(cmd);

        // Create and persist event
        OrderSubmittedEvent event = new OrderSubmittedEvent(
            cmd.getOrderId(), cmd.getSymbol(), cmd.getSide(),
            cmd.getQuantity(), cmd.getPrice(), Instant.now()
        );

        eventStore.append(event);
        eventPublisher.publish(event);  // Notify read side
    }

    public void cancelOrder(CancelOrderCommand cmd) {
        // Load order state from events
        Order order = orderRepository.loadFromEvents(cmd.getOrderId());

        if (order.isCancellable()) {
            OrderCancelledEvent event = new OrderCancelledEvent(
                cmd.getOrderId(), cmd.getReason(), Instant.now()
            );
            eventStore.append(event);
            eventPublisher.publish(event);
        }
    }
}

// QUERY SIDE - Optimized for fast reads
@Service
public class OrderQueryService {
    // Denormalized read model - pre-computed for fast queries
    private final Map<String, OrderBookView> orderBooks = new ConcurrentHashMap<>();
    private final Map<Long, OrderDetailView> orderDetails = new ConcurrentHashMap<>();

    // Event handler updates read model
    @EventListener
    public void on(OrderSubmittedEvent event) {
        // Update order book view
        orderBooks.computeIfAbsent(event.getSymbol(), OrderBookView::new)
            .addOrder(event);

        // Update order detail view
        orderDetails.put(event.getOrderId(), new OrderDetailView(event));
    }

    @EventListener
    public void on(OrderMatchedEvent event) {
        orderBooks.get(event.getSymbol()).recordMatch(event);
        orderDetails.get(event.getBuyOrderId()).addFill(event);
        orderDetails.get(event.getSellOrderId()).addFill(event);
    }

    // Fast queries on read model
    public OrderBookView getOrderBook(String symbol) {
        return orderBooks.get(symbol);  // O(1) lookup
    }

    public List<OrderDetailView> getActiveOrders(String symbol) {
        return orderDetails.values().stream()
            .filter(o -> o.getSymbol().equals(symbol))
            .filter(OrderDetailView::isActive)
            .toList();
    }

    // No need to join tables or compute - already denormalized
    public PositionSummary getPositions(String accountId) {
        return positionViews.get(accountId);  // Pre-aggregated
    }
}`
        }
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
    const stack = [
      { name: 'eTrading', icon: '📈', page: 'eTrading' },
      { name: 'Low Latency Systems', icon: '🚀', page: 'Low Latency' }
    ]
    if (selectedConcept) {
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    }
    return stack
  }

  const handleBreadcrumbClick = (index, item) => {
    if (index === 0) {
      onBack()
    } else if (index === 1 && selectedConcept) {
      setSelectedConceptIndex(null)
    }
  }

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
  }, [selectedConcept, selectedConceptIndex, onBack])

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #164e63 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #22d3ee, #06b6d4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(6, 182, 212, 0.2)',
    border: '1px solid rgba(6, 182, 212, 0.3)',
    borderRadius: '0.5rem',
    color: '#22d3ee',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Low Latency Systems</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(6, 182, 212, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(6, 182, 212, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          ← Back to eTrading
        </button>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu}
          colors={ETRADING_COLORS}
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
              colors={ETRADING_COLORS}
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
                  {DiagramComponent && (
                    <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.5rem', border: '1px solid #334155' }}>
                      <DiagramComponent />
                    </div>
                  )}
                  <h3 style={{ color: '#e2e8f0', marginBottom: '0.75rem', fontSize: '1.1rem' }}>{detail.name}</h3>
                  <p style={{ color: '#e2e8f0', lineHeight: '1.8', marginBottom: '1rem', background: colorScheme.bg, border: `1px solid ${colorScheme.border}`, borderRadius: '0.5rem', padding: '1rem', textAlign: 'left' }}>{detail.explanation}</p>
                  {detail.codeExample && (
                    <SyntaxHighlighter language="java" style={vscDarkPlus} customStyle={{ padding: '1rem', margin: 0, borderRadius: '0.5rem', fontSize: '0.8rem', border: '1px solid #334155', background: '#0f172a' }} codeTagProps={{ style: { background: 'transparent' } }}>{detail.codeExample}</SyntaxHighlighter>
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

export default LowLatency
