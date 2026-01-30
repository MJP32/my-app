/**
 * Virtual Threads Internals - Java 21 Project Loom Deep Dive
 *
 * Converted to tab_template format with:
 * - VIRTUAL_THREADS_COLORS (purple theme #a855f7)
 * - SVG diagrams for concepts and details
 * - Modal navigation with concept/detail tabs
 * - Breadcrumb navigation
 * - Keyboard navigation (Escape, ArrowLeft, ArrowRight)
 * - SyntaxHighlighter with vscDarkPlus
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const VIRTUAL_THREADS_COLORS = {
  primary: '#a855f7',           // Purple - main accent color
  primaryHover: '#c084fc',      // Lighter purple for hover
  bg: 'rgba(168, 85, 247, 0.1)', // Background with transparency
  border: 'rgba(168, 85, 247, 0.3)', // Border color
  arrow: '#a855f7',             // Arrow/indicator color
  hoverBg: 'rgba(168, 85, 247, 0.2)', // Hover background
  topicBg: 'rgba(168, 85, 247, 0.2)'  // Topic card background
}

const SUBTOPIC_COLORS = [
  { bg: 'rgba(168, 85, 247, 0.15)', border: 'rgba(168, 85, 247, 0.3)' },     // purple
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },       // green
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },     // amber
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },     // blue
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },     // pink
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },       // cyan
]

// =============================================================================
// SVG DIAGRAM COMPONENTS
// =============================================================================

/**
 * Virtual Thread Architecture Overview Diagram
 */
const VirtualThreadArchitectureDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="vt-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#a855f7" />
      </marker>
      <linearGradient id="vtGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#c084fc" />
      </linearGradient>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Virtual Threads Architecture - Java 21+
    </text>

    {/* Virtual Threads Layer */}
    <rect x="50" y="50" width="700" height="60" rx="8" fill="rgba(168, 85, 247, 0.2)" stroke="#a855f7" strokeWidth="2"/>
    <text x="400" y="72" textAnchor="middle" fill="#a855f7" fontSize="12" fontWeight="bold">Virtual Threads (Millions)</text>
    {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
      <g key={i}>
        <rect x={80 + i * 80} y="80" width="50" height="20" rx="4" fill="#a855f7" opacity="0.8"/>
        <text x={105 + i * 80} y="94" textAnchor="middle" fill="white" fontSize="9">VT{i + 1}</text>
      </g>
    ))}
    <text x="720" y="94" fill="#64748b" fontSize="10">...</text>

    {/* Arrow down */}
    <line x1="400" y1="115" x2="400" y2="140" stroke="#a855f7" strokeWidth="2" markerEnd="url(#vt-arrow)"/>
    <text x="420" y="132" fill="#94a3b8" fontSize="10">mount/unmount</text>

    {/* Carrier Threads Layer */}
    <rect x="150" y="150" width="500" height="50" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="400" y="172" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">Carrier Threads (= CPU Cores)</text>
    {[0, 1, 2, 3].map(i => (
      <g key={i}>
        <rect x={200 + i * 100} y="178" width="60" height="16" rx="4" fill="#22c55e" opacity="0.8"/>
        <text x={230 + i * 100} y="190" textAnchor="middle" fill="white" fontSize="9">CT{i + 1}</text>
      </g>
    ))}

    {/* Arrow down */}
    <line x1="400" y1="205" x2="400" y2="230" stroke="#22c55e" strokeWidth="2" markerEnd="url(#vt-arrow)"/>

    {/* OS Threads Layer */}
    <rect x="200" y="240" width="400" height="30" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="400" y="260" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">OS Threads (Kernel Managed)</text>
  </svg>
)

/**
 * Carrier Thread Mounting/Unmounting Diagram
 */
const CarrierThreadDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="ct-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#a855f7" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Virtual Thread Lifecycle on Carrier
    </text>

    {/* Timeline */}
    <line x1="50" y1="100" x2="750" y2="100" stroke="#475569" strokeWidth="2"/>

    {/* States */}
    <rect x="60" y="70" width="100" height="40" rx="6" fill="#a855f7" stroke="#c084fc" strokeWidth="2"/>
    <text x="110" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Running</text>

    <rect x="200" y="70" width="100" height="40" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="250" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Block (I/O)</text>

    <rect x="340" y="70" width="100" height="40" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="390" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Unmount</text>

    <rect x="480" y="70" width="100" height="40" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="530" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Parked</text>

    <rect x="620" y="70" width="100" height="40" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="670" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Resume</text>

    {/* Arrows */}
    <path d="M160 90 L195 90" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#ct-arrow)" fill="none"/>
    <path d="M300 90 L335 90" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#ct-arrow)" fill="none"/>
    <path d="M440 90 L475 90" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#ct-arrow)" fill="none"/>
    <path d="M580 90 L615 90" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#ct-arrow)" fill="none"/>

    {/* Labels below */}
    <text x="110" y="135" textAnchor="middle" fill="#64748b" fontSize="10">On Carrier</text>
    <text x="250" y="135" textAnchor="middle" fill="#64748b" fontSize="10">socket.read()</text>
    <text x="390" y="135" textAnchor="middle" fill="#64748b" fontSize="10">Save Stack</text>
    <text x="530" y="135" textAnchor="middle" fill="#64748b" fontSize="10">Waiting</text>
    <text x="670" y="135" textAnchor="middle" fill="#64748b" fontSize="10">Re-mount</text>

    {/* Carrier indicator */}
    <rect x="60" y="160" width="200" height="30" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="160" y="180" textAnchor="middle" fill="#22c55e" fontSize="10">Carrier Busy with VT</text>

    <rect x="340" y="160" width="240" height="30" rx="4" fill="rgba(168, 85, 247, 0.3)" stroke="#a855f7" strokeWidth="1"/>
    <text x="460" y="180" textAnchor="middle" fill="#a855f7" fontSize="10">Carrier Free for Other VTs</text>

    <rect x="620" y="160" width="100" height="30" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="670" y="180" textAnchor="middle" fill="#22c55e" fontSize="10">Carrier Busy</text>
  </svg>
)

/**
 * Memory Comparison Diagram
 */
const MemoryComparisonDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Memory Comparison: Platform vs Virtual Threads
    </text>

    {/* Platform Threads */}
    <rect x="50" y="50" width="300" height="120" rx="8" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="200" y="75" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">Platform Threads</text>

    {[0, 1, 2, 3, 4].map(i => (
      <rect key={i} x={70 + i * 55} y="90" width="45" height="60" rx="4" fill="#ef4444" opacity="0.6"/>
    ))}
    <text x="200" y="115" textAnchor="middle" fill="white" fontSize="10">~1MB each</text>
    <text x="200" y="165" textAnchor="middle" fill="#f87171" fontSize="11">10K threads = 10GB RAM</text>

    {/* Virtual Threads */}
    <rect x="450" y="50" width="300" height="120" rx="8" fill="rgba(168, 85, 247, 0.2)" stroke="#a855f7" strokeWidth="2"/>
    <text x="600" y="75" textAnchor="middle" fill="#a855f7" fontSize="12" fontWeight="bold">Virtual Threads</text>

    {[...Array(20)].map((_, i) => (
      <rect key={i} x={465 + (i % 10) * 27} y={90 + Math.floor(i / 10) * 25} width="22" height="20" rx="2" fill="#a855f7" opacity="0.6"/>
    ))}
    <text x="600" y="115" textAnchor="middle" fill="white" fontSize="9">~1KB initial</text>
    <text x="600" y="165" textAnchor="middle" fill="#c084fc" fontSize="11">1M threads = ~1GB RAM</text>
  </svg>
)

/**
 * Thread Pinning Diagram
 */
const ThreadPinningDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="pin-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Thread Pinning: When Virtual Threads Get Stuck
    </text>

    {/* BAD: Synchronized */}
    <rect x="50" y="50" width="320" height="150" rx="8" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" strokeWidth="2"/>
    <text x="210" y="75" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">synchronized (PINNED)</text>

    <rect x="80" y="90" width="80" height="40" rx="4" fill="#a855f7"/>
    <text x="120" y="115" textAnchor="middle" fill="white" fontSize="10">VT1</text>

    <rect x="80" y="145" width="80" height="40" rx="4" fill="#ef4444"/>
    <text x="120" y="170" textAnchor="middle" fill="white" fontSize="10">Carrier1</text>

    <line x1="120" y1="130" x2="120" y2="143" stroke="#ef4444" strokeWidth="3"/>
    <text x="190" y="125" fill="#f87171" fontSize="10">STUCK!</text>
    <text x="190" y="145" fill="#94a3b8" fontSize="9">Cannot unmount</text>
    <text x="190" y="165" fill="#94a3b8" fontSize="9">Carrier blocked</text>

    {/* GOOD: ReentrantLock */}
    <rect x="430" y="50" width="320" height="150" rx="8" fill="rgba(34, 197, 94, 0.15)" stroke="#22c55e" strokeWidth="2"/>
    <text x="590" y="75" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">ReentrantLock (FREE)</text>

    <rect x="460" y="90" width="80" height="40" rx="4" fill="#a855f7"/>
    <text x="500" y="115" textAnchor="middle" fill="white" fontSize="10">VT1</text>

    <rect x="460" y="145" width="80" height="40" rx="4" fill="#22c55e"/>
    <text x="500" y="170" textAnchor="middle" fill="white" fontSize="10">Carrier1</text>

    <path d="M520 110 Q560 110 560 140 Q560 165 600 165" stroke="#22c55e" strokeWidth="2" fill="none" strokeDasharray="5,3"/>
    <text x="630" y="125" fill="#4ade80" fontSize="10">Unmount OK</text>
    <text x="630" y="145" fill="#94a3b8" fontSize="9">Carrier serves</text>
    <text x="630" y="165" fill="#94a3b8" fontSize="9">other VTs</text>
  </svg>
)

/**
 * Blocking Operations Diagram
 */
const BlockingOperationsDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Blocking Operations and Virtual Thread Behavior
    </text>

    {/* Friendly Operations */}
    <rect x="50" y="50" width="320" height="130" rx="8" fill="rgba(34, 197, 94, 0.15)" stroke="#22c55e" strokeWidth="2"/>
    <text x="210" y="75" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">VT-Friendly (Auto Unmount)</text>

    {['Thread.sleep()', 'Socket I/O', 'BlockingQueue', 'Lock.lock()'].map((op, i) => (
      <g key={i}>
        <rect x={70 + (i % 2) * 145} y={90 + Math.floor(i / 2) * 40} width="130" height="30" rx="4" fill="#22c55e" opacity="0.7"/>
        <text x={135 + (i % 2) * 145} y={110 + Math.floor(i / 2) * 40} textAnchor="middle" fill="white" fontSize="10">{op}</text>
      </g>
    ))}

    {/* Pinning Operations */}
    <rect x="430" y="50" width="320" height="130" rx="8" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" strokeWidth="2"/>
    <text x="590" y="75" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">Causes Pinning (Avoid)</text>

    {['synchronized', 'JNI / Native', 'Foreign Calls'].map((op, i) => (
      <g key={i}>
        <rect x={460 + (i % 2) * 145} y={90 + Math.floor(i / 2) * 40} width="130" height="30" rx="4" fill="#ef4444" opacity="0.7"/>
        <text x={525 + (i % 2) * 145} y={110 + Math.floor(i / 2) * 40} textAnchor="middle" fill="white" fontSize="10">{op}</text>
      </g>
    ))}
  </svg>
)

/**
 * Structured Concurrency Diagram
 */
const StructuredConcurrencyDiagram = () => (
  <svg viewBox="0 0 800 240" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="sc-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#a855f7" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Structured Concurrency: Parent-Child Task Relationship
    </text>

    {/* Parent Scope */}
    <rect x="300" y="45" width="200" height="45" rx="8" fill="#a855f7" stroke="#c084fc" strokeWidth="2"/>
    <text x="400" y="73" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">StructuredTaskScope</text>

    {/* Fork arrows */}
    <line x1="350" y1="90" x2="200" y2="130" stroke="#a855f7" strokeWidth="2" markerEnd="url(#sc-arrow)"/>
    <line x1="400" y1="90" x2="400" y2="130" stroke="#a855f7" strokeWidth="2" markerEnd="url(#sc-arrow)"/>
    <line x1="450" y1="90" x2="600" y2="130" stroke="#a855f7" strokeWidth="2" markerEnd="url(#sc-arrow)"/>

    <text x="260" y="115" fill="#94a3b8" fontSize="9">fork()</text>
    <text x="415" y="115" fill="#94a3b8" fontSize="9">fork()</text>
    <text x="535" y="115" fill="#94a3b8" fontSize="9">fork()</text>

    {/* Child Tasks */}
    <rect x="120" y="135" width="150" height="40" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="195" y="160" textAnchor="middle" fill="white" fontSize="10">fetchUser()</text>

    <rect x="325" y="135" width="150" height="40" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="400" y="160" textAnchor="middle" fill="white" fontSize="10">fetchOrder()</text>

    <rect x="530" y="135" width="150" height="40" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="605" y="160" textAnchor="middle" fill="white" fontSize="10">fetchInventory()</text>

    {/* Join arrows */}
    <line x1="195" y1="175" x2="350" y2="205" stroke="#c084fc" strokeWidth="2" strokeDasharray="5,3"/>
    <line x1="400" y1="175" x2="400" y2="205" stroke="#c084fc" strokeWidth="2" strokeDasharray="5,3"/>
    <line x1="605" y1="175" x2="450" y2="205" stroke="#c084fc" strokeWidth="2" strokeDasharray="5,3"/>

    {/* Join */}
    <rect x="300" y="205" width="200" height="30" rx="6" fill="rgba(168, 85, 247, 0.3)" stroke="#a855f7" strokeWidth="2"/>
    <text x="400" y="225" textAnchor="middle" fill="#c084fc" fontSize="10" fontWeight="bold">scope.join() - Wait All</text>
  </svg>
)

/**
 * Continuation State Diagram
 */
const ContinuationDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Virtual Thread Internal: Continuation Object
    </text>

    <rect x="200" y="50" width="400" height="110" rx="10" fill="rgba(168, 85, 247, 0.15)" stroke="#a855f7" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#a855f7" fontSize="12" fontWeight="bold">VirtualThread extends Thread</text>

    <rect x="230" y="90" width="150" height="55" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="305" y="110" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Continuation</text>
    <text x="305" y="125" textAnchor="middle" fill="#94a3b8" fontSize="9">Stack frames</text>
    <text x="305" y="138" textAnchor="middle" fill="#94a3b8" fontSize="9">Local variables</text>

    <rect x="420" y="90" width="150" height="55" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="495" y="110" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">State</text>
    <text x="495" y="125" textAnchor="middle" fill="#94a3b8" fontSize="9">RUNNING | PARKED</text>
    <text x="495" y="138" textAnchor="middle" fill="#94a3b8" fontSize="9">parkBlocker</text>
  </svg>
)

/**
 * ForkJoinPool Scheduler Diagram
 */
const SchedulerDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="sched-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#a855f7" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Default Scheduler: ForkJoinPool
    </text>

    {/* VT Queue */}
    <rect x="50" y="50" width="200" height="80" rx="8" fill="rgba(168, 85, 247, 0.2)" stroke="#a855f7" strokeWidth="2"/>
    <text x="150" y="75" textAnchor="middle" fill="#a855f7" fontSize="11" fontWeight="bold">Virtual Threads Queue</text>
    {[0, 1, 2, 3].map(i => (
      <rect key={i} x={65 + i * 45} y={90} width="35" height="25" rx="4" fill="#a855f7" opacity="0.7"/>
    ))}

    {/* Arrow */}
    <line x1="255" y1="90" x2="320" y2="90" stroke="#a855f7" strokeWidth="2" markerEnd="url(#sched-arrow)"/>
    <text x="287" y="80" fill="#94a3b8" fontSize="9">schedule</text>

    {/* Scheduler */}
    <rect x="325" y="50" width="200" height="80" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="425" y="75" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">ForkJoinPool</text>
    <text x="425" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">parallelism = CPU cores</text>
    <text x="425" y="110" textAnchor="middle" fill="#94a3b8" fontSize="9">Work-stealing</text>

    {/* Arrow */}
    <line x1="530" y1="90" x2="595" y2="90" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#sched-arrow)"/>
    <text x="562" y="80" fill="#94a3b8" fontSize="9">dispatch</text>

    {/* Carrier Threads */}
    <rect x="600" y="50" width="150" height="80" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="675" y="75" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">Carrier Threads</text>
    {[0, 1].map(i => (
      <rect key={i} x={620 + i * 55} y={90} width="45" height="25" rx="4" fill="#22c55e" opacity="0.7"/>
    ))}

    {/* Config note */}
    <text x="400" y="160" textAnchor="middle" fill="#64748b" fontSize="10">
      Configure: -Djdk.virtualThreadScheduler.parallelism=N
    </text>
    <text x="400" y="180" textAnchor="middle" fill="#64748b" fontSize="10">
      Default: Runtime.getRuntime().availableProcessors()
    </text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function VirtualThreadsInternals({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'why-virtual-threads',
      name: 'Why Virtual Threads?',
      icon: '⚡',
      color: '#f59e0b',
      description: 'Understanding the motivation behind Project Loom and how virtual threads solve the scalability problem of platform threads.',
      diagram: VirtualThreadArchitectureDiagram,
      details: [
        {
          name: 'The Platform Thread Problem',
          diagram: MemoryComparisonDiagram,
          explanation: 'Traditional Java threads (platform threads) map 1:1 to OS threads. Each thread consumes approximately 1MB of stack memory, limiting practical concurrency to around 10,000 threads. With 10K threads consuming 10GB of RAM just for stacks, plus expensive OS context switching, this model cannot scale to handle millions of concurrent connections needed in modern cloud applications.',
          codeExample: `// Platform thread limitation
// Each thread = ~1MB stack + OS resources
for (int i = 0; i < 10_000; i++) {
    new Thread(() -> {
        // 10K threads = ~10GB memory
        // OS struggles with context switching
        doBlockingWork();
    }).start();
}

// Result: OutOfMemoryError or severe performance degradation
// OS thread limits: typically 10K-30K max`
        },
        {
          name: 'Virtual Thread Solution',
          diagram: VirtualThreadArchitectureDiagram,
          explanation: 'Virtual threads are lightweight threads managed by the JVM, not the OS. They start with only ~1KB of stack (growing as needed) and many virtual threads share a small pool of carrier threads (platform threads). This allows creating millions of concurrent virtual threads using only a few GB of memory, enabling "thread-per-request" programming at massive scale.',
          codeExample: `// Virtual thread solution - Java 21+
// Start 1 million concurrent threads!
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    for (int i = 0; i < 1_000_000; i++) {
        executor.submit(() -> {
            // Each gets its own virtual thread
            // Total memory: ~1-2GB (not 1TB!)
            return fetchData();
        });
    }
}

// Or create directly
Thread vt = Thread.startVirtualThread(() -> doWork());

// Builder pattern
Thread vt2 = Thread.ofVirtual()
    .name("my-vt-", 1)
    .start(() -> doWork());`
        },
        {
          name: 'Project Loom History',
          explanation: 'Project Loom was initiated in 2017 to bring lightweight concurrency to Java. After years of development, virtual threads were previewed in Java 19-20 and finalized in Java 21 (September 2023). The project also includes Structured Concurrency and Scoped Values as complementary features. Virtual threads are a fundamental change to Java\'s concurrency model, enabling simpler synchronous code that scales like asynchronous code.',
          codeExample: `// Evolution of Java concurrency
// Java 1.0 (1996): Thread class
Thread t = new Thread(runnable);

// Java 5 (2004): ExecutorService
ExecutorService pool = Executors.newFixedThreadPool(100);

// Java 8 (2014): CompletableFuture
CompletableFuture.supplyAsync(() -> fetchData())
    .thenApply(data -> process(data));

// Java 21 (2023): Virtual Threads
Thread.startVirtualThread(() -> {
    // Write simple blocking code
    // JVM handles scalability!
    var data = fetchData();      // blocks, but doesn't waste resources
    var result = process(data);
    return result;
});`
        }
      ]
    },
    {
      id: 'how-virtual-threads-work',
      name: 'How Virtual Threads Work',
      icon: '🔧',
      color: '#0ea5e9',
      description: 'Deep dive into the internal mechanics: carrier threads, continuations, mounting/unmounting, and the ForkJoinPool scheduler.',
      diagram: CarrierThreadDiagram,
      details: [
        {
          name: 'Carrier Threads',
          diagram: CarrierThreadDiagram,
          explanation: 'Carrier threads are platform threads that actually execute virtual thread code. When a virtual thread runs, it is "mounted" on a carrier. The number of carrier threads defaults to the number of CPU cores. Multiple virtual threads time-share each carrier thread, with the JVM automatically managing the switching. This is similar to how an OS schedules processes on CPU cores, but at the JVM level.',
          codeExample: `// Carrier thread pool configuration
// Default: ForkJoinPool with parallelism = CPU cores
// Customize with JVM flag:
// -Djdk.virtualThreadScheduler.parallelism=16

// Check current carrier
Thread.startVirtualThread(() -> {
    // Which carrier am I on?
    // Use JFR events or debugging to see
    System.out.println(Thread.currentThread());
    // Output: VirtualThread[#21]/runnable@ForkJoinPool-1-worker-1
    //         ^virtual thread     ^carrier thread
});

// Carrier threads are managed automatically
// You cannot manually assign VTs to carriers`
        },
        {
          name: 'Continuations',
          diagram: ContinuationDiagram,
          explanation: 'A continuation represents the saved execution state of a virtual thread - its stack frames, local variables, and program counter. When a virtual thread blocks, its continuation is saved (yielded) and the carrier is freed. When the blocking operation completes, the continuation is resumed on any available carrier. This allows millions of "paused" virtual threads to exist without consuming carrier thread resources.',
          codeExample: `// Conceptual view of VirtualThread internals
class VirtualThread extends Thread {
    private Continuation continuation;  // Saved execution state
    private volatile int state;         // NEW, STARTED, RUNNING, PARKING, PARKED, etc.
    private Object parkBlocker;         // What caused parking

    // When VT needs to block
    void park() {
        state = PARKING;
        // Save entire stack to heap
        continuation.yield();
        // Carrier thread is now FREE
        state = PARKED;
    }

    // When blocking operation completes
    void unpark() {
        state = RUNNABLE;
        // Submit to scheduler
        scheduler.execute(() -> {
            // Will run on next available carrier
            continuation.run();
        });
    }
}`
        },
        {
          name: 'Scheduler & ForkJoinPool',
          diagram: SchedulerDiagram,
          explanation: 'Virtual threads are scheduled by a ForkJoinPool that uses work-stealing for efficiency. When a virtual thread is ready to run, it\'s submitted to this pool. Carrier threads (ForkJoinPool workers) pick up virtual threads from their work queues. If a carrier\'s queue is empty, it can steal work from other carriers. This provides excellent load balancing without complex manual tuning.',
          codeExample: `// Default scheduler configuration
// Parallelism (number of carrier threads):
// -Djdk.virtualThreadScheduler.parallelism=N
// Default: Runtime.getRuntime().availableProcessors()

// Max pool size (rarely needed):
// -Djdk.virtualThreadScheduler.maxPoolSize=256
// Default: 256

// Min runnable (for work stealing):
// -Djdk.virtualThreadScheduler.minRunnable=1

// The scheduler is a ForkJoinPool
// - Uses work-stealing algorithm
// - Carriers grab VTs from queues
// - Idle carriers steal from busy carriers

// You generally don't need to tune this!
// The defaults work well for most workloads`
        },
        {
          name: 'Mount/Unmount Lifecycle',
          diagram: CarrierThreadDiagram,
          explanation: 'A virtual thread\'s lifecycle involves mounting and unmounting from carriers. Created virtual threads are scheduled but not mounted. When a carrier picks one up, it\'s mounted and executes. On blocking operations, it unmounts (continuation saved), freeing the carrier. When unblocked, it\'s rescheduled and will mount on the next available carrier (might be different from before).',
          codeExample: `// Virtual Thread State Machine
// NEW → STARTED → RUNNING → PARKING → PARKED → RUNNABLE → RUNNING → TERMINATED

Thread vt = Thread.ofVirtual().unstarted(() -> {
    // State: NEW
    System.out.println("Starting work");
    // State: RUNNING (mounted on carrier)

    Thread.sleep(1000);
    // State: PARKING → PARKED (unmounted)
    // Carrier is FREE to run other VTs

    // After 1 second...
    // State: RUNNABLE (waiting for carrier)
    // State: RUNNING (mounted, maybe different carrier)

    System.out.println("Done");
    // State: TERMINATED
});

vt.start();  // State: STARTED → RUNNING
vt.join();   // Wait for TERMINATED`
        }
      ]
    },
    {
      id: 'blocking-operations',
      name: 'Blocking Operations',
      icon: '⏳',
      color: '#22c55e',
      description: 'How virtual threads handle blocking I/O, which operations trigger unmounting, and the transparent yielding mechanism.',
      diagram: BlockingOperationsDiagram,
      details: [
        {
          name: 'VT-Friendly Operations',
          diagram: BlockingOperationsDiagram,
          explanation: 'Most Java blocking operations have been updated to be virtual-thread-friendly. When a virtual thread calls these operations, it automatically yields (unmounts) from its carrier, allowing other virtual threads to run. This includes Thread.sleep(), socket I/O, BlockingQueue operations, Lock.lock(), and most java.util.concurrent primitives.',
          codeExample: `// All these operations unmount the virtual thread
Thread.startVirtualThread(() -> {
    // 1. Sleep - yields immediately
    Thread.sleep(Duration.ofSeconds(1));

    // 2. Socket I/O - yields on read/write
    Socket socket = new Socket(host, port);
    socket.getInputStream().read();  // yields

    // 3. BlockingQueue - yields while waiting
    BlockingQueue<String> queue = new LinkedBlockingQueue<>();
    queue.take();  // yields until element available

    // 4. Lock - yields if lock not available
    ReentrantLock lock = new ReentrantLock();
    lock.lock();  // yields if contended

    // 5. Semaphore - yields while waiting
    Semaphore sem = new Semaphore(0);
    sem.acquire();  // yields until permit available

    // All these free the carrier for other VTs!
});`
        },
        {
          name: 'Transparent Yielding',
          explanation: 'The magic of virtual threads is that yielding is completely transparent to your code. You write normal blocking code, and the JVM automatically handles the mounting/unmounting. Your code doesn\'t need to use callbacks, Promises, or async/await. The sequential code structure is preserved, making it easier to read, write, and debug compared to reactive or callback-based alternatives.',
          codeExample: `// Virtual threads: Write blocking code, get async performance

// Your code looks like this (simple, blocking)
String fetchUserData(long userId) {
    User user = userService.getUser(userId);        // blocks, yields
    List<Order> orders = orderService.getOrders(userId);  // blocks, yields
    Profile profile = profileService.getProfile(userId);  // blocks, yields
    return formatResponse(user, orders, profile);
}

// But it performs like this (concurrent, efficient)
// - Each blocking call yields the carrier
// - Carrier runs other virtual threads while waiting
// - No thread pool tuning needed
// - No callback hell
// - Normal try/catch/finally works
// - Stack traces are complete and readable

// Compare to reactive (more complex):
Mono<String> fetchUserDataReactive(long userId) {
    return Mono.zip(
        userService.getUser(userId),
        orderService.getOrders(userId),
        profileService.getProfile(userId)
    ).map(tuple -> formatResponse(tuple.getT1(), tuple.getT2(), tuple.getT3()));
}`
        },
        {
          name: 'I/O and Network Operations',
          explanation: 'Network I/O operations in java.net and java.nio have been updated for virtual threads. SocketInputStream.read() and SocketOutputStream.write() now yield instead of blocking the carrier. HttpClient operations also benefit. File I/O yields on supported platforms (Linux with io_uring). Database operations benefit if the JDBC driver is updated for virtual threads.',
          codeExample: `// Network I/O with virtual threads
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    List<Future<String>> futures = new ArrayList<>();

    // 10,000 concurrent HTTP requests!
    for (String url : urls) {
        futures.add(executor.submit(() -> {
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .build();

            // This yields, doesn't block carrier
            HttpResponse<String> response = client.send(
                request, HttpResponse.BodyHandlers.ofString());

            return response.body();
        }));
    }

    // Collect results
    for (Future<String> f : futures) {
        results.add(f.get());
    }
}
// 10K concurrent requests with just a few carrier threads!`
        }
      ]
    },
    {
      id: 'thread-pinning',
      name: 'Thread Pinning',
      icon: '📌',
      color: '#ef4444',
      description: 'Understanding when virtual threads get stuck on carriers, how to detect pinning, and strategies to avoid it.',
      diagram: ThreadPinningDiagram,
      details: [
        {
          name: 'What Causes Pinning',
          diagram: ThreadPinningDiagram,
          explanation: 'Thread pinning occurs when a virtual thread cannot unmount from its carrier, effectively blocking the carrier thread. This happens in three scenarios: (1) inside a synchronized block or method, (2) during native code execution via JNI, and (3) during foreign function calls. When pinned, the carrier cannot serve other virtual threads, reducing concurrency.',
          codeExample: `// PINNING SCENARIO 1: synchronized
class PinningExample {
    private final Object lock = new Object();

    void badMethod() {
        synchronized (lock) {
            // Virtual thread is PINNED here
            Thread.sleep(1000);  // Carrier thread blocked for 1 second!
            // No other VTs can use this carrier
        }
    }
}

// PINNING SCENARIO 2: Native code (JNI)
public native void nativeMethod();  // VT pinned during call

// PINNING SCENARIO 3: Foreign functions
// Using Panama FFI - VT pinned during foreign call

// Why pinning is bad:
// - 1 pinned VT = 1 carrier thread blocked
// - If all carriers pinned, no VTs can run
// - Defeats the purpose of virtual threads`
        },
        {
          name: 'Detecting Pinning',
          explanation: 'Java provides JVM flags to detect and diagnose thread pinning. The -Djdk.tracePinnedThreads flag prints stack traces when pinning occurs. JDK Flight Recorder (JFR) also has events for pinned threads. Use these tools during development and testing to identify problematic code paths that need refactoring.',
          codeExample: `// Detect pinning with JVM flags
// -Djdk.tracePinnedThreads=full   (detailed stack trace)
// -Djdk.tracePinnedThreads=short  (brief output)

// Example output:
// Thread[#21,ForkJoinPool-1-worker-1,5,CarrierThreads]
//     java.base/java.lang.Object.wait0(Native Method)
//     java.base/java.lang.Object.wait(Object.java:366)
//     com.example.MyClass.synchronizedMethod(MyClass.java:42) <== monitors:1

// Using JFR for pinning events
// jdk.VirtualThreadPinned event

// Programmatic detection (testing)
Thread.startVirtualThread(() -> {
    synchronized (lock) {
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            // Check console for pinning message
        }
    }
});`
        },
        {
          name: 'Avoiding Pinning',
          explanation: 'The primary solution for pinning is to replace synchronized with java.util.concurrent locks. ReentrantLock, ReadWriteLock, and StampedLock all allow virtual threads to unmount while waiting for the lock. For third-party libraries using synchronized, check for updated versions or report the issue. For native code, consider moving blocking operations outside the native call.',
          codeExample: `// BAD: synchronized causes pinning
class OldStyle {
    private final Object lock = new Object();

    void process() {
        synchronized (lock) {
            Thread.sleep(1000);  // PINNED!
        }
    }
}

// GOOD: ReentrantLock allows unmounting
class NewStyle {
    private final ReentrantLock lock = new ReentrantLock();

    void process() throws InterruptedException {
        lock.lock();
        try {
            Thread.sleep(1000);  // NOT pinned! Carrier free
        } finally {
            lock.unlock();
        }
    }
}

// Migration checklist:
// ✓ Replace synchronized(obj) with ReentrantLock
// ✓ Replace synchronized methods with lock.lock()/unlock()
// ✓ Update libraries to VT-friendly versions
// ✓ Test with -Djdk.tracePinnedThreads=full
// ✓ Review JNI/native code for blocking operations`
        },
        {
          name: 'Library Compatibility',
          explanation: 'Many popular libraries have been updated for virtual thread compatibility. JDBC drivers (PostgreSQL, MySQL, Oracle) have releases that avoid pinning. Web frameworks (Spring Boot 3.2+, Quarkus, Micronaut) support virtual threads. However, some older libraries may still use synchronized internally. Always test with pinning detection enabled and check library release notes for virtual thread support.',
          codeExample: `// Check library compatibility

// JDBC Drivers (check for VT-friendly versions)
// - PostgreSQL JDBC 42.6.0+ : VT-ready
// - MySQL Connector/J 8.1+ : VT-ready
// - Oracle JDBC 23c+ : VT-ready

// Web Frameworks
// - Spring Boot 3.2+: spring.threads.virtual.enabled=true
// - Quarkus 3.0+: quarkus.virtual-threads.enabled=true
// - Micronaut 4.0+: Built-in support

// Testing for compatibility
@Test
void testLibraryDoesNotPin() {
    // Run with -Djdk.tracePinnedThreads=full
    try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
        for (int i = 0; i < 100; i++) {
            executor.submit(() -> {
                // Call library methods
                // Check console for pinning warnings
                libraryMethod();
            });
        }
    }
}`
        }
      ]
    },
    {
      id: 'structured-concurrency',
      name: 'Structured Concurrency',
      icon: '🌳',
      color: '#8b5cf6',
      description: 'Managing virtual thread lifetimes with StructuredTaskScope, ensuring proper cleanup, and handling failures gracefully.',
      diagram: StructuredConcurrencyDiagram,
      details: [
        {
          name: 'StructuredTaskScope Basics',
          diagram: StructuredConcurrencyDiagram,
          explanation: 'Structured Concurrency (preview in Java 21+) provides a way to treat multiple concurrent tasks as a single unit of work. StructuredTaskScope ensures that child tasks are contained within their parent\'s lifetime. When the scope closes, all subtasks are guaranteed to be completed or cancelled. This prevents orphaned threads and makes concurrent code easier to reason about.',
          codeExample: `// Structured Concurrency (--enable-preview in Java 21)
import java.util.concurrent.StructuredTaskScope;

Response handleRequest() throws Exception {
    // Create a scope that fails fast on any subtask failure
    try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {

        // Fork concurrent subtasks (each runs in its own VT)
        Subtask<User> userTask = scope.fork(() -> fetchUser());
        Subtask<Order> orderTask = scope.fork(() -> fetchOrder());
        Subtask<Inventory> invTask = scope.fork(() -> fetchInventory());

        // Wait for all subtasks to complete
        scope.join();

        // Propagate any exception from failed subtasks
        scope.throwIfFailed();

        // All succeeded - get results
        return new Response(
            userTask.get(),
            orderTask.get(),
            invTask.get()
        );
    }
    // Scope close guarantees all subtasks are done
}`
        },
        {
          name: 'ShutdownOnFailure',
          explanation: 'ShutdownOnFailure is a policy that cancels all remaining subtasks when any one subtask fails. This is ideal for operations where you need all results to succeed (like fetching user + order + payment for a checkout). If any fetch fails, the entire operation should fail fast, cancelling the others to avoid wasted work.',
          codeExample: `// Fail-fast: If any task fails, cancel the rest
Response checkout(long userId, long orderId) throws Exception {
    try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {

        Subtask<User> user = scope.fork(() -> fetchUser(userId));
        Subtask<Order> order = scope.fork(() -> fetchOrder(orderId));
        Subtask<Payment> payment = scope.fork(() -> authorizePayment(orderId));

        scope.join();  // Wait for completion or first failure
        scope.throwIfFailed();  // Throws if any task failed

        // All three succeeded
        return processCheckout(user.get(), order.get(), payment.get());
    }
    // If fetchUser() fails:
    // - Other tasks are cancelled (interrupted)
    // - scope.throwIfFailed() throws the exception
    // - Caller sees the original exception
}`
        },
        {
          name: 'ShutdownOnSuccess',
          explanation: 'ShutdownOnSuccess returns the first successful result and cancels remaining tasks. This is perfect for racing multiple sources (like fetching from multiple servers) or implementing timeouts with fallbacks. The first task to complete successfully "wins" and others are cancelled.',
          codeExample: `// First success wins: Race multiple sources
String fetchFromFastestServer() throws Exception {
    try (var scope = new StructuredTaskScope.ShutdownOnSuccess<String>()) {

        scope.fork(() -> fetchFromServer1());
        scope.fork(() -> fetchFromServer2());
        scope.fork(() -> fetchFromServer3());

        scope.join();  // Wait for first success

        return scope.result();  // Returns first successful result
    }
    // First server to respond wins
    // Other tasks are cancelled
}

// Timeout with fallback
String fetchWithTimeout() throws Exception {
    try (var scope = new StructuredTaskScope.ShutdownOnSuccess<String>()) {
        scope.fork(() -> fetchFromPrimary());
        scope.fork(() -> {
            Thread.sleep(Duration.ofSeconds(1));  // Timeout
            return fetchFromCache();  // Fallback
        });
        scope.join();
        return scope.result();
    }
}`
        },
        {
          name: 'Custom Scopes',
          explanation: 'You can create custom StructuredTaskScope implementations for advanced use cases. Override handleComplete() to implement custom completion policies. Examples include collecting all results (even if some fail), implementing quorum-based decisions, or aggregating partial results. Custom scopes give you full control over subtask lifecycle management.',
          codeExample: `// Custom scope: Collect all results, ignore failures
class CollectingScope<T> extends StructuredTaskScope<T> {
    private final List<T> results = Collections.synchronizedList(new ArrayList<>());
    private final List<Throwable> errors = Collections.synchronizedList(new ArrayList<>());

    @Override
    protected void handleComplete(Subtask<? extends T> subtask) {
        if (subtask.state() == Subtask.State.SUCCESS) {
            results.add(subtask.get());
        } else if (subtask.state() == Subtask.State.FAILED) {
            errors.add(subtask.exception());
        }
    }

    public List<T> getResults() { return results; }
    public List<Throwable> getErrors() { return errors; }
}

// Usage
try (var scope = new CollectingScope<String>()) {
    scope.fork(() -> fetchA());
    scope.fork(() -> fetchB());  // might fail
    scope.fork(() -> fetchC());

    scope.join();

    // Get successful results, log errors
    List<String> results = scope.getResults();
    scope.getErrors().forEach(e -> log.warn("Task failed", e));
}`
        }
      ]
    },
    {
      id: 'interview-questions',
      name: 'Interview Questions',
      icon: '💼',
      color: '#ec4899',
      description: 'Common interview questions about virtual threads, best practices, and when to use them.',
      details: [
        {
          name: 'Basic Questions',
          explanation: 'Foundational questions covering the what, why, and how of virtual threads. These questions test understanding of the core concepts: the difference between platform and virtual threads, the problem virtual threads solve, and basic creation/usage patterns.',
          codeExample: `// Q1: What is the difference between platform and virtual threads?
// A: Platform threads = 1:1 mapping to OS threads, ~1MB stack each
//    Virtual threads = JVM-managed, ~1KB initial stack, millions possible

// Demonstration
Thread platform = new Thread(() -> doWork());  // OS thread, heavy
Thread virtual = Thread.startVirtualThread(() -> doWork());  // JVM thread, light

// Q2: How many virtual threads can you create?
// A: Millions (limited by heap memory, not OS resources)

for (int i = 0; i < 1_000_000; i++) {
    Thread.startVirtualThread(() -> {
        Thread.sleep(Duration.ofSeconds(10));
    });
}
// Uses ~1GB heap, not 1TB!

// Q3: When should you use virtual threads?
// A: For I/O-bound workloads (web servers, microservices, database apps)
//    NOT for CPU-bound workloads (computation, image processing)`
        },
        {
          name: 'Advanced Questions',
          explanation: 'Deeper questions about internals, pinning, and best practices. These questions test understanding of how virtual threads work under the hood and common pitfalls to avoid.',
          codeExample: `// Q4: What is thread pinning and how do you avoid it?
// A: Pinning = VT stuck on carrier (can't unmount)
//    Causes: synchronized, JNI, foreign functions
//    Solution: Use ReentrantLock instead of synchronized

// BAD
synchronized (lock) { Thread.sleep(1000); }  // PINS carrier

// GOOD
lock.lock();
try { Thread.sleep(1000); }  // Carrier free
finally { lock.unlock(); }

// Q5: What is the carrier thread?
// A: Platform thread that executes virtual thread code
//    Default pool size = CPU cores (ForkJoinPool)

// Q6: Are virtual threads preemptive?
// A: NO! They only yield at blocking points
//    CPU-bound loops will monopolize the carrier

// BAD: Starves other virtual threads
Thread.startVirtualThread(() -> {
    while (true) {
        compute();  // Never yields!
    }
});`
        },
        {
          name: 'Best Practices',
          explanation: 'Questions about proper usage patterns, anti-patterns, and migration strategies. These test practical knowledge of how to effectively use virtual threads in real applications.',
          codeExample: `// Q7: Should you pool virtual threads?
// A: NO! Create new ones for each task (they're cheap)

// BAD - unnecessary complexity
ExecutorService pool = Executors.newFixedThreadPool(100);  // Don't reuse VTs

// GOOD - one VT per task
ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor();

// Q8: How do you configure the carrier thread pool?
// A: JVM flags (usually don't need to change defaults)
// -Djdk.virtualThreadScheduler.parallelism=N

// Q9: What's the migration path from reactive code?
// A: Replace reactive chains with simple blocking code

// Before (reactive)
return userService.getUser(id)
    .flatMap(user -> orderService.getOrders(user.getId()))
    .collectList();

// After (virtual threads)
User user = userService.getUser(id);      // blocks, yields
List<Order> orders = orderService.getOrders(user.getId());
return orders;  // Simple!`
        },
        {
          name: 'Gotchas & Pitfalls',
          explanation: 'Common mistakes and edge cases that interviewers like to ask about. Understanding these shows deep knowledge of virtual thread limitations and proper usage.',
          codeExample: `// GOTCHA 1: ThreadLocal can cause memory issues
// VTs don't reuse threads, so ThreadLocal accumulates

// BAD - ThreadLocal per million VTs = memory leak
static final ThreadLocal<byte[]> cache = ThreadLocal.withInitial(() -> new byte[1024]);

// BETTER - Use ScopedValue (preview) or pass explicitly

// GOTCHA 2: synchronized in dependencies
// Your code might be fine, but libraries might pin

// Always test with:
// -Djdk.tracePinnedThreads=full

// GOTCHA 3: Expecting CPU-bound speedup
// VTs don't help with computation

// This won't be faster with VTs:
IntStream.range(0, 1000)
    .parallel()
    .mapToDouble(i -> computeExpensive(i))
    .sum();

// GOTCHA 4: Debugging differences
// Stack traces work normally
// But profilers may need updates for VT support`
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
      { name: 'Projects', icon: '📁', page: 'Projects' },
      { name: 'Virtual Threads', icon: '⚡', page: 'Virtual Threads Internals' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #3b0764 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #c084fc, #a855f7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(168, 85, 247, 0.2)',
    border: '1px solid rgba(168, 85, 247, 0.3)',
    borderRadius: '0.5rem',
    color: '#c084fc',
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
        <h1 style={titleStyle}>Virtual Threads Internals</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(168, 85, 247, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(168, 85, 247, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          ← Back to Projects
        </button>
      </div>

      {/* Breadcrumb navigation */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu}
          colors={VIRTUAL_THREADS_COLORS}
        />
      </div>

      {/* Overview Diagram */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto 2rem',
        background: 'rgba(15, 23, 42, 0.8)',
        borderRadius: '1rem',
        padding: '1.5rem',
        border: '1px solid rgba(168, 85, 247, 0.3)'
      }}>
        <VirtualThreadArchitectureDiagram />
        <p style={{ color: '#94a3b8', textAlign: 'center', margin: '1rem 0 0', fontSize: '0.9rem' }}>
          Java 21 Virtual Threads: Millions of lightweight threads sharing a small pool of carrier threads
        </p>
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
              onMainMenu={breadcrumb?.onMainMenu}
              colors={VIRTUAL_THREADS_COLORS}
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

export default VirtualThreadsInternals
