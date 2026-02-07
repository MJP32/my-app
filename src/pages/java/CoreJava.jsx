/**
 * Core Java Fundamentals Page
 *
 * Covers foundational Java concepts including:
 * - Generics
 * - Collections Framework
 * - Encapsulation
 * - Thread Management
 * - Synchronization
 * - Locks & Semaphores
 * - Executor Framework
 * - CompletableFuture
 * - Class Loading
 * - Bytecode
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const COREJAVA_COLORS = {
  primary: '#fbbf24',           // Amber main accent
  primaryHover: '#fcd34d',      // Lighter amber for hover
  bg: 'rgba(245, 158, 11, 0.1)', // Amber background with transparency
  border: 'rgba(245, 158, 11, 0.3)', // Amber border
  arrow: '#f59e0b',             // Arrow/indicator color
  hoverBg: 'rgba(245, 158, 11, 0.2)', // Hover background
  topicBg: 'rgba(245, 158, 11, 0.2)'  // Topic card background
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

const GenericsDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead-gen" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#fbbf24" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Java Generics Type System
    </text>
    <rect x="50" y="60" width="140" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="120" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Generic Class</text>
    <text x="120" y="105" textAnchor="middle" fill="#93c5fd" fontSize="10">{`Box&lt;T&gt;`}</text>
    <rect x="250" y="60" width="140" height="60" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="320" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Type Parameter</text>
    <text x="320" y="105" textAnchor="middle" fill="#86efac" fontSize="10">T, E, K, V</text>
    <rect x="450" y="60" width="140" height="60" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="520" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Bounded Types</text>
    <text x="520" y="105" textAnchor="middle" fill="#c4b5fd" fontSize="10">{`&lt;T extends Number&gt;`}</text>
    <rect x="650" y="60" width="120" height="60" rx="8" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="710" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Wildcards</text>
    <text x="710" y="105" textAnchor="middle" fill="#f9a8d4" fontSize="10">{`&lt;? extends/super&gt;`}</text>
    <line x1="190" y1="90" x2="245" y2="90" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrowhead-gen)"/>
    <line x1="390" y1="90" x2="445" y2="90" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrowhead-gen)"/>
    <line x1="590" y1="90" x2="645" y2="90" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrowhead-gen)"/>
    <rect x="200" y="150" width="400" height="50" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="400" y="180" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">Type Erasure: Generics removed at compile time for backward compatibility</text>
  </svg>
)

const CollectionsDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead-col" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#fbbf24" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Java Collections Framework Hierarchy
    </text>
    <rect x="320" y="45" width="160" height="40" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="400" y="70" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">{`Iterable&lt;E&gt;`}</text>
    <line x1="400" y1="85" x2="400" y2="105" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrowhead-col)"/>
    <rect x="320" y="110" width="160" height="40" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="400" y="135" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">{`Collection&lt;E&gt;`}</text>
    <line x1="280" y1="130" x2="140" y2="180" stroke="#fbbf24" strokeWidth="2"/>
    <line x1="400" y1="150" x2="400" y2="180" stroke="#fbbf24" strokeWidth="2"/>
    <line x1="520" y1="130" x2="660" y2="180" stroke="#fbbf24" strokeWidth="2"/>
    <rect x="60" y="185" width="140" height="40" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="130" y="210" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">{`List&lt;E&gt;`}</text>
    <rect x="330" y="185" width="140" height="40" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="400" y="210" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">{`Set&lt;E&gt;`}</text>
    <rect x="590" y="185" width="140" height="40" rx="8" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="660" y="210" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">{`Queue&lt;E&gt;`}</text>
    <text x="130" y="250" textAnchor="middle" fill="#86efac" fontSize="10">ArrayList, LinkedList</text>
    <text x="400" y="250" textAnchor="middle" fill="#c4b5fd" fontSize="10">HashSet, TreeSet</text>
    <text x="660" y="250" textAnchor="middle" fill="#f9a8d4" fontSize="10">PriorityQueue, Deque</text>
  </svg>
)

const EncapsulationDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">{`
      Encapsulation: Data Hiding & Controlled Access
    `}</text>
    <rect x="250" y="50" width="300" height="130" rx="12" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">Class (Protective Barrier)</text>
    <rect x="280" y="90" width="120" height="70" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="340" y="115" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Private Fields</text>
    <text x="340" y="135" textAnchor="middle" fill="#fca5a5" fontSize="9">-balance</text>
    <text x="340" y="150" textAnchor="middle" fill="#fca5a5" fontSize="9">-accountNumber</text>
    <rect x="420" y="90" width="110" height="70" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="475" y="115" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Public Methods</text>
    <text x="475" y="135" textAnchor="middle" fill="#93c5fd" fontSize="9">+getBalance()</text>
    <text x="475" y="150" textAnchor="middle" fill="#93c5fd" fontSize="9">+deposit()</text>
    <rect x="50" y="100" width="100" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="100" y="130" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">External Code</text>
    <line x1="150" y1="125" x2="410" y2="125" stroke="#fbbf24" strokeWidth="2" strokeDasharray="5,5"/>
    <text x="280" y="195" textAnchor="middle" fill="#94a3b8" fontSize="10">Cannot access directly</text>
    <text x="520" y="195" textAnchor="middle" fill="#4ade80" fontSize="10">Controlled access via methods</text>
  </svg>
)

const ThreadDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead-thread" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#fbbf24" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Thread Lifecycle States
    </text>
    <rect x="30" y="70" width="100" height="45" rx="8" fill="#6b7280" stroke="#9ca3af" strokeWidth="2"/>
    <text x="80" y="97" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">NEW</text>
    <rect x="170" y="70" width="110" height="45" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="225" y="97" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">RUNNABLE</text>
    <rect x="320" y="70" width="100" height="45" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="370" y="97" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">BLOCKED</text>
    <rect x="460" y="70" width="100" height="45" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="510" y="97" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">WAITING</text>
    <rect x="600" y="70" width="120" height="45" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="660" y="97" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">TIMED_WAIT</text>
    <rect x="320" y="150" width="120" height="45" rx="8" fill="#1f2937" stroke="#374151" strokeWidth="2"/>
    <text x="380" y="177" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">TERMINATED</text>
    <line x1="130" y1="92" x2="165" y2="92" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrowhead-thread)"/>
    <text x="147" y="85" textAnchor="middle" fill="#94a3b8" fontSize="8">start()</text>
    <line x1="280" y1="92" x2="315" y2="92" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrowhead-thread)"/>
    <line x1="420" y1="92" x2="455" y2="92" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrowhead-thread)"/>
    <line x1="560" y1="92" x2="595" y2="92" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrowhead-thread)"/>
    <line x1="225" y1="115" x2="225" y2="145" stroke="#fbbf24" strokeWidth="2"/>
    <line x1="225" y1="145" x2="315" y2="172" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrowhead-thread)"/>
  </svg>
)

const SyncDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Synchronization: Mutual Exclusion
    </text>
    <rect x="50" y="60" width="120" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="110" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Thread 1</text>
    <rect x="50" y="130" width="120" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="110" y="160" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Thread 2</text>
    <rect x="280" y="70" width="240" height="100" rx="12" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="3"/>
    <text x="400" y="95" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">synchronized block</text>
    <rect x="310" y="110" width="180" height="45" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="400" y="137" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Critical Section</text>
    <line x1="170" y1="85" x2="275" y2="120" stroke="#4ade80" strokeWidth="2" strokeDasharray="5,5"/>
    <text x="220" y="95" textAnchor="middle" fill="#4ade80" fontSize="9">acquired</text>
    <line x1="170" y1="155" x2="275" y2="140" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5"/>
    <text x="220" y="155" textAnchor="middle" fill="#ef4444" fontSize="9">blocked</text>
    <rect x="620" y="95" width="150" height="50" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="695" y="115" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Monitor Lock</text>
    <text x="695" y="132" textAnchor="middle" fill="#86efac" fontSize="9">Intrinsic lock per object</text>
  </svg>
)

const LocksDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead-lock" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#fbbf24" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Advanced Locking Mechanisms
    </text>
    <rect x="50" y="55" width="160" height="70" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="130" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">ReentrantLock</text>
    <text x="130" y="100" textAnchor="middle" fill="#93c5fd" fontSize="9">lock() / unlock()</text>
    <text x="130" y="115" textAnchor="middle" fill="#93c5fd" fontSize="9">tryLock(timeout)</text>
    <rect x="250" y="55" width="160" height="70" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="330" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">ReadWriteLock</text>
    <text x="330" y="100" textAnchor="middle" fill="#86efac" fontSize="9">Multiple readers OR</text>
    <text x="330" y="115" textAnchor="middle" fill="#86efac" fontSize="9">Single writer</text>
    <rect x="450" y="55" width="140" height="70" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="520" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Semaphore</text>
    <text x="520" y="100" textAnchor="middle" fill="#c4b5fd" fontSize="9">Permit-based access</text>
    <text x="520" y="115" textAnchor="middle" fill="#c4b5fd" fontSize="9">acquire() / release()</text>
    <rect x="630" y="55" width="140" height="70" rx="8" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="700" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">CountDownLatch</text>
    <text x="700" y="100" textAnchor="middle" fill="#f9a8d4" fontSize="9">One-time barrier</text>
    <text x="700" y="115" textAnchor="middle" fill="#f9a8d4" fontSize="9">await() / countDown()</text>
    <rect x="200" y="150" width="400" height="50" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="400" y="180" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">java.util.concurrent.locks - More control than synchronized</text>
  </svg>
)

const ExecutorDiagram = () => (
  <svg viewBox="0 0 800 240" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead-exec" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#fbbf24" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Executor Framework Architecture
    </text>
    <rect x="50" y="60" width="120" height="80" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="110" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Task Queue</text>
    <text x="110" y="105" textAnchor="middle" fill="#93c5fd" fontSize="9">Runnable</text>
    <text x="110" y="120" textAnchor="middle" fill="#93c5fd" fontSize="9">{`Callable&lt;V&gt;`}</text>
    <rect x="260" y="50" width="280" height="100" rx="12" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Thread Pool</text>
    <rect x="280" y="90" width="70" height="45" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="315" y="117" textAnchor="middle" fill="white" fontSize="9">Thread 1</text>
    <rect x="365" y="90" width="70" height="45" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="400" y="117" textAnchor="middle" fill="white" fontSize="9">Thread 2</text>
    <rect x="450" y="90" width="70" height="45" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="485" y="117" textAnchor="middle" fill="white" fontSize="9">Thread N</text>
    <rect x="630" y="70" width="120" height="60" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="690" y="95" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">{`Future&lt;V&gt;`}</text>
    <text x="690" y="115" textAnchor="middle" fill="#c4b5fd" fontSize="9">get() result</text>
    <line x1="170" y1="100" x2="255" y2="100" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrowhead-exec)"/>
    <line x1="540" y1="100" x2="625" y2="100" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrowhead-exec)"/>
    <text x="210" y="90" textAnchor="middle" fill="#94a3b8" fontSize="9">submit()</text>
    <text x="580" y="90" textAnchor="middle" fill="#94a3b8" fontSize="9">returns</text>
    <rect x="100" y="180" width="200" height="40" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="200" y="205" textAnchor="middle" fill="#fbbf24" fontSize="10">newFixedThreadPool(n)</text>
    <rect x="320" y="180" width="180" height="40" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="410" y="205" textAnchor="middle" fill="#fbbf24" fontSize="10">newCachedThreadPool()</text>
    <rect x="520" y="180" width="200" height="40" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="620" y="205" textAnchor="middle" fill="#fbbf24" fontSize="10">newScheduledThreadPool(n)</text>
  </svg>
)

const CompletableFutureDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead-cf" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#fbbf24" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      CompletableFuture Pipeline
    </text>
    <rect x="30" y="70" width="130" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="95" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">supplyAsync()</text>
    <rect x="190" y="70" width="120" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="250" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">thenApply()</text>
    <rect x="340" y="70" width="120" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="400" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">thenCompose()</text>
    <rect x="490" y="70" width="120" height="50" rx="8" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="550" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">thenAccept()</text>
    <rect x="640" y="70" width="130" height="50" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="705" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">exceptionally()</text>
    <line x1="160" y1="95" x2="185" y2="95" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrowhead-cf)"/>
    <line x1="310" y1="95" x2="335" y2="95" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrowhead-cf)"/>
    <line x1="460" y1="95" x2="485" y2="95" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrowhead-cf)"/>
    <line x1="610" y1="95" x2="635" y2="95" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrowhead-cf)"/>
    <rect x="200" y="150" width="180" height="50" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="290" y="170" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">thenCombine()</text>
    <text x="290" y="185" textAnchor="middle" fill="#93c5fd" fontSize="9">Parallel composition</text>
    <rect x="420" y="150" width="180" height="50" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="510" y="170" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">allOf() / anyOf()</text>
    <text x="510" y="185" textAnchor="middle" fill="#86efac" fontSize="9">Multiple futures</text>
  </svg>
)

const ClassLoaderDiagram = () => (
  <svg viewBox="0 0 800 260" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead-cl" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#fbbf24" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">{`
      ClassLoader Hierarchy & Delegation
    `}</text>
    <rect x="300" y="45" width="200" height="45" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="400" y="72" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Bootstrap ClassLoader</text>
    <text x="400" y="85" textAnchor="middle" fill="#fca5a5" fontSize="9">(Native code - rt.jar)</text>
    <rect x="300" y="110" width="200" height="45" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="400" y="137" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Platform ClassLoader</text>
    <text x="400" y="150" textAnchor="middle" fill="#fcd34d" fontSize="9">(Extension classes)</text>
    <rect x="300" y="175" width="200" height="45" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="400" y="202" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Application ClassLoader</text>
    <text x="400" y="215" textAnchor="middle" fill="#93c5fd" fontSize="9">(Classpath classes)</text>
    <line x1="400" y1="90" x2="400" y2="105" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrowhead-cl)"/>
    <line x1="400" y1="155" x2="400" y2="170" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrowhead-cl)"/>
    <rect x="570" y="100" width="180" height="80" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="660" y="125" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Parent Delegation</text>
    <text x="660" y="145" textAnchor="middle" fill="#86efac" fontSize="9">1. Delegate to parent</text>
    <text x="660" y="160" textAnchor="middle" fill="#86efac" fontSize="9">2. Parent tries first</text>
    <text x="660" y="175" textAnchor="middle" fill="#86efac" fontSize="9">3. Load if parent fails</text>
    <line x1="505" y1="130" x2="565" y2="130" stroke="#22c55e" strokeWidth="2" strokeDasharray="5,5"/>
  </svg>
)

const BytecodeDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead-bc" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#fbbf24" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">{`
      Java Compilation & Bytecode Execution
    `}</text>
    <rect x="30" y="70" width="130" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="95" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Source Code</text>
    <text x="95" y="115" textAnchor="middle" fill="#93c5fd" fontSize="10">.java</text>
    <rect x="200" y="70" width="100" height="60" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="250" y="105" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">javac</text>
    <rect x="340" y="70" width="130" height="60" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="405" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Bytecode</text>
    <text x="405" y="115" textAnchor="middle" fill="#86efac" fontSize="10">.class</text>
    <rect x="510" y="70" width="100" height="60" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="560" y="105" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">JVM</text>
    <rect x="650" y="70" width="120" height="60" rx="8" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="710" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Native Code</text>
    <text x="710" y="115" textAnchor="middle" fill="#f9a8d4" fontSize="10">(JIT compiled)</text>
    <line x1="160" y1="100" x2="195" y2="100" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrowhead-bc)"/>
    <line x1="300" y1="100" x2="335" y2="100" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrowhead-bc)"/>
    <line x1="470" y1="100" x2="505" y2="100" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrowhead-bc)"/>
    <line x1="610" y1="100" x2="645" y2="100" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrowhead-bc)"/>
    <rect x="250" y="160" width="300" height="45" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="400" y="180" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Stack-based VM: iload, iadd, invokevirtual, etc.</text>
    <text x="400" y="195" textAnchor="middle" fill="#fcd34d" fontSize="9">~200 opcodes for platform independence</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function CoreJava({ onBack, onPrevious, onNext, previousName, nextName, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'generics',
      name: 'Generics',
      icon: '🔤',
      color: '#f59e0b',
      description: 'Parameterized types enabling compile-time type safety and code reuse.',
      diagram: GenericsDiagram,
      details: [
        {
          name: 'Type Parameters',
          explanation: 'Generics use type parameters (T, E, K, V, N) as placeholders for actual types. They enable classes and methods to operate on specified types while providing compile-time type safety. Type inference with diamond operator (<>) simplifies instantiation in Java 7+.',
          codeExample: `// Generic class with single type parameter
class Box<T> {
    private T item;

    public void set(T item) { this.item = item; }
    public T get() { return item; }
}

// Usage with type inference
Box<String> stringBox = new Box<>();
stringBox.set("Hello");
String value = stringBox.get();  // No casting needed

// Multiple type parameters
class Pair<K, V> {
    private K key;
    private V value;
    public Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }
}
Pair<String, Integer> pair = new Pair<>("Age", 25);`
        },
        {
          name: 'Bounded Types',
          explanation: 'Bounded type parameters restrict types to specific class hierarchies. Upper bounds (<T extends Number>) accept a class and its subclasses. Multiple bounds (<T extends Class & Interface>) combine constraints. This enables calling specific methods on type parameters.',
          codeExample: `// Upper bounded - accepts Number and subclasses
class NumberBox<T extends Number> {
    private T number;

    public NumberBox(T number) {
        this.number = number;
    }

    public double doubleValue() {
        return number.doubleValue();  // Can call Number methods
    }
}

NumberBox<Integer> intBox = new NumberBox<>(100);
NumberBox<Double> doubleBox = new NumberBox<>(3.14);

// Multiple bounds - class must come first
class Processor<T extends Document & Printable> {
    public void process(T item) {
        item.print();        // Printable method
        item.getContent();   // Document method
    }
}`
        },
        {
          name: 'Wildcards',
          explanation: 'Wildcards (?) represent unknown types. Unbounded (<?>) accepts any type. Upper bounded (<? extends T>) is covariant for reading (Producer Extends). Lower bounded (<? super T>) is contravariant for writing (Consumer Super). The PECS principle guides proper wildcard usage.',
          codeExample: `// Unbounded wildcard - accepts any type
public static void printList(List<?> list) {
    for (Object item : list) {
        System.out.println(item);
    }
}

// Upper bounded (Producer Extends) - read from
public static double sum(List<? extends Number> list) {
    double total = 0;
    for (Number num : list) {
        total += num.doubleValue();
    }
    return total;
}

// Lower bounded (Consumer Super) - write to
public static void addIntegers(List<? super Integer> list) {
    list.add(1);
    list.add(2);
    list.add(3);
}

// PECS: Producer Extends, Consumer Super
List<Integer> integers = Arrays.asList(1, 2, 3);
List<Number> numbers = new ArrayList<>();
double result = sum(integers);      // extends - reading
addIntegers(numbers);               // super - writing`
        },
        {
          name: 'Type Erasure',
          explanation: 'Generics are removed during compilation for backward compatibility. Generic types are replaced with Object or their bound type. Bridge methods maintain polymorphism. Limitations: cannot create arrays of parameterized types, use primitives as type parameters, or perform instanceof checks on parameterized types.',
          codeExample: `// Before type erasure
public class Box<T> {
    private T item;
    public T get() { return item; }
}

// After type erasure (what JVM sees)
public class Box {
    private Object item;
    public Object get() { return item; }
}

// Bridge method example
class StringBox extends Box<String> {
    @Override
    public String get() { return super.get(); }
    // Compiler generates bridge method:
    // public Object get() { return get(); }
}

// Limitations due to type erasure
// Cannot do: new T(), new T[], T.class
// Cannot do: List<int> (must use Integer)
// Cannot do: obj instanceof List<String>`
        }
      ]
    },
    {
      id: 'collections',
      name: 'Collections Framework',
      icon: '📦',
      color: '#3b82f6',
      description: 'Unified architecture for representing and manipulating groups of objects.',
      diagram: CollectionsDiagram,
      details: [
        {
          name: 'List Implementations',
          explanation: 'List maintains insertion order and allows duplicates. ArrayList uses resizable array for O(1) random access but O(n) insertion. LinkedList uses doubly-linked nodes for O(1) insertion but O(n) access. Choose ArrayList for most cases, LinkedList when frequent insertions/deletions at ends are needed.',
          codeExample: `import java.util.*;

// ArrayList - resizable array, fast random access
List<String> arrayList = new ArrayList<>();
arrayList.add("Java");
arrayList.add("Python");
arrayList.add(1, "C++");  // Insert at index
String lang = arrayList.get(0);  // O(1) access
// Output: [Java, C++, Python]

// LinkedList - doubly-linked, fast insertion/deletion
LinkedList<Integer> linkedList = new LinkedList<>();
linkedList.add(10);
linkedList.addFirst(5);   // O(1) at ends
linkedList.addLast(30);
int first = linkedList.getFirst();  // O(1)
int middle = linkedList.get(1);     // O(n)
// Output: [5, 10, 30]

// When to use which:
// ArrayList: Random access, most general use
// LinkedList: Queue/Deque operations, frequent insertions`
        },
        {
          name: 'Set Implementations',
          explanation: 'Set ensures no duplicate elements. HashSet uses hash table for O(1) operations with no ordering guarantee. LinkedHashSet maintains insertion order with slight overhead. TreeSet uses Red-Black tree for O(log n) sorted operations. EnumSet is highly optimized for enum types.',
          codeExample: `import java.util.*;

// HashSet - no duplicates, no order, O(1) operations
Set<String> hashSet = new HashSet<>();
hashSet.add("Apple");
hashSet.add("Banana");
hashSet.add("Apple");  // Duplicate ignored
boolean has = hashSet.contains("Banana");  // O(1)
// Output: [Apple, Banana] (order may vary)

// LinkedHashSet - maintains insertion order
Set<String> linkedSet = new LinkedHashSet<>();
linkedSet.add("First");
linkedSet.add("Second");
linkedSet.add("Third");
// Output: [First, Second, Third] (insertion order)

// TreeSet - sorted order, O(log n)
Set<Integer> treeSet = new TreeSet<>();
treeSet.add(50);
treeSet.add(20);
treeSet.add(70);
// Output: [20, 50, 70] (natural sorted order)

// NavigableSet operations
TreeSet<Integer> navSet = new TreeSet<>(Arrays.asList(1, 3, 5, 7));
Integer lower = navSet.lower(5);    // 3
Integer higher = navSet.higher(5);  // 7`
        },
        {
          name: 'Map Implementations',
          explanation: 'Map stores key-value pairs with unique keys. HashMap provides O(1) average operations. LinkedHashMap preserves insertion or access order. TreeMap maintains sorted key order with O(log n) operations. ConcurrentHashMap enables thread-safe operations without locking the entire map.',
          codeExample: `import java.util.*;

// HashMap - O(1) average, no order guarantee
Map<String, Integer> hashMap = new HashMap<>();
hashMap.put("Alice", 25);
hashMap.put("Bob", 30);
hashMap.put("Alice", 26);  // Updates existing
Integer age = hashMap.get("Alice");  // 26
boolean hasKey = hashMap.containsKey("Bob");
// Methods: getOrDefault, putIfAbsent, computeIfAbsent

// LinkedHashMap - insertion order or access order
Map<String, String> linkedMap = new LinkedHashMap<>();
linkedMap.put("First", "1");
linkedMap.put("Second", "2");
// Maintains insertion order during iteration

// TreeMap - sorted by keys, O(log n)
Map<Integer, String> treeMap = new TreeMap<>();
treeMap.put(3, "Three");
treeMap.put(1, "One");
treeMap.put(2, "Two");
// Output: {1=One, 2=Two, 3=Three}

// NavigableMap operations
TreeMap<Integer, String> navMap = new TreeMap<>();
Integer lowerKey = navMap.lowerKey(2);
Map.Entry<Integer, String> ceiling = navMap.ceilingEntry(2);`
        },
        {
          name: 'Queue & Deque',
          explanation: 'Queue provides FIFO ordering with offer/poll operations. PriorityQueue orders elements by natural order or Comparator. ArrayDeque is efficient for both stack and queue operations. Deque supports double-ended access with addFirst/addLast and pollFirst/pollLast.',
          codeExample: `import java.util.*;

// PriorityQueue - min-heap by default
PriorityQueue<Integer> pq = new PriorityQueue<>();
pq.offer(50);
pq.offer(20);
pq.offer(70);
while (!pq.isEmpty()) {
    System.out.print(pq.poll() + " ");  // 20 50 70 (min first)
}

// Max-heap with Comparator
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(
    Collections.reverseOrder()
);

// ArrayDeque - efficient stack and queue
Deque<String> deque = new ArrayDeque<>();
deque.addFirst("Front");  // Stack push
deque.addLast("Back");    // Queue add
deque.offerFirst("New Front");
String first = deque.pollFirst();
String last = deque.pollLast();

// Use as Stack (faster than Stack class)
Deque<Integer> stack = new ArrayDeque<>();
stack.push(1);
stack.push(2);
int top = stack.pop();  // 2

// Use as Queue
Deque<Integer> queue = new ArrayDeque<>();
queue.offer(1);
queue.offer(2);
int head = queue.poll();  // 1`
        }
      ]
    },
    {
      id: 'encapsulation',
      name: 'Encapsulation',
      icon: '🔐',
      color: '#22c55e',
      description: 'Data hiding principle bundling fields and methods within protective barriers.',
      diagram: EncapsulationDiagram,
      details: [
        {
          name: 'Access Modifiers',
          explanation: 'Access modifiers control visibility. private: only within the class. package-private (default): within the same package. protected: package + subclasses. public: accessible everywhere. Use the most restrictive access level that makes sense.',
          codeExample: `public class AccessDemo {
    private int privateField;      // This class only
    int packageField;              // Same package only
    protected int protectedField;  // Package + subclasses
    public int publicField;        // Everywhere

    // Private method - internal implementation
    private void internalLogic() {
        // Only callable within this class
    }

    // Public method - part of API
    public void publicMethod() {
        internalLogic();  // Can call private methods
    }
}

// In another package/class
class External {
    void test() {
        AccessDemo demo = new AccessDemo();
        // demo.privateField;     // Compile error
        // demo.packageField;     // Error if different package
        demo.publicField = 10;    // OK
        demo.publicMethod();      // OK
    }
}`
        },
        {
          name: 'Getters and Setters',
          explanation: 'Getters and setters provide controlled access to private fields. Setters can include validation logic to maintain data integrity. Getters may return copies of mutable objects to prevent external modification. This pattern enables changing internal representation without affecting external code.',
          codeExample: `public class BankAccount {
    private double balance;
    private String accountNumber;
    private List<String> transactions;

    public BankAccount(String accountNumber) {
        this.accountNumber = accountNumber;
        this.balance = 0.0;
        this.transactions = new ArrayList<>();
    }

    // Getter - simple read access
    public double getBalance() {
        return balance;
    }

    // Getter - return defensive copy
    public List<String> getTransactions() {
        return new ArrayList<>(transactions);  // Defensive copy
    }

    // Setter with validation
    public void deposit(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Amount must be positive");
        }
        balance += amount;
        transactions.add("Deposit: " + amount);
    }

    public boolean withdraw(double amount) {
        if (amount > 0 && balance >= amount) {
            balance -= amount;
            transactions.add("Withdraw: " + amount);
            return true;
        }
        return false;
    }
}`
        },
        {
          name: 'Immutable Objects',
          explanation: 'Immutable objects cannot be modified after creation, making them inherently thread-safe. Make all fields final and private, provide no setters, ensure exclusive access to mutable components through defensive copying. String, Integer, and LocalDate are examples of immutable classes.',
          codeExample: `// Immutable class pattern
public final class ImmutablePerson {
    private final String name;
    private final int age;
    private final List<String> hobbies;

    public ImmutablePerson(String name, int age, List<String> hobbies) {
        this.name = name;
        this.age = age;
        // Defensive copy of mutable input
        this.hobbies = new ArrayList<>(hobbies);
    }

    public String getName() { return name; }
    public int getAge() { return age; }

    // Return defensive copy
    public List<String> getHobbies() {
        return new ArrayList<>(hobbies);
    }

    // "Modifier" returns new instance
    public ImmutablePerson withAge(int newAge) {
        return new ImmutablePerson(name, newAge, hobbies);
    }
}

// Java 14+ Record - concise immutable data class
public record Point(int x, int y) {
    // Automatically: constructor, getters, equals, hashCode, toString
}
Point p = new Point(10, 20);
int x = p.x();  // Accessor method`
        }
      ]
    },
    {
      id: 'threads',
      name: 'Thread Management',
      icon: '🧵',
      color: '#8b5cf6',
      description: 'Creating, controlling, and coordinating concurrent execution paths.',
      diagram: ThreadDiagram,
      details: [
        {
          name: 'Creating Threads',
          explanation: 'Threads can be created by extending Thread class or implementing Runnable interface. Runnable is preferred as it allows extending other classes. Java 8+ lambda expressions provide concise syntax for simple tasks. Always call start() not run() to create a new execution thread.',
          codeExample: `// Method 1: Extend Thread class
class MyThread extends Thread {
    @Override
    public void run() {
        for (int i = 0; i < 3; i++) {
            System.out.println(getName() + ": " + i);
            try { Thread.sleep(100); } catch (InterruptedException e) {}
        }
    }
}

MyThread thread1 = new MyThread();
thread1.setName("Worker-1");
thread1.start();  // Not run() - start creates new thread

// Method 2: Implement Runnable (preferred)
class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println(Thread.currentThread().getName() + " executing");
    }
}

Thread thread2 = new Thread(new MyRunnable(), "Worker-2");
thread2.start();

// Method 3: Lambda expression (Java 8+)
Thread thread3 = new Thread(() -> {
    System.out.println("Lambda thread: " + Thread.currentThread().getId());
});
thread3.start();`
        },
        {
          name: 'Thread Lifecycle',
          explanation: 'Thread states: NEW (created), RUNNABLE (ready/running), BLOCKED (waiting for lock), WAITING (indefinite wait), TIMED_WAITING (bounded wait), TERMINATED (completed). State transitions occur via methods like start(), sleep(), wait(), join(), and lock acquisition.',
          codeExample: `Thread thread = new Thread(() -> {
    try {
        Thread.sleep(1000);
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    }
});

// NEW state - thread created but not started
System.out.println(thread.getState());  // NEW

thread.start();
// RUNNABLE state - ready to run or running
System.out.println(thread.getState());  // RUNNABLE

Thread.sleep(100);
// TIMED_WAITING state - sleeping
System.out.println(thread.getState());  // TIMED_WAITING

thread.join();
// TERMINATED state - execution completed
System.out.println(thread.getState());  // TERMINATED

// WAITING example
Object lock = new Object();
Thread waiter = new Thread(() -> {
    synchronized (lock) {
        try {
            lock.wait();  // WAITING until notified
        } catch (InterruptedException e) {}
    }
});

// BLOCKED example - waiting for synchronized lock
// Thread trying to enter synchronized block held by another thread`
        },
        {
          name: 'Thread Control',
          explanation: 'Control threads with sleep() for pausing, join() for waiting, interrupt() for signaling. Daemon threads run in background and terminate when all user threads finish. Thread priorities (1-10) provide hints to scheduler but behavior is platform-dependent.',
          codeExample: `// Thread.sleep() - pause execution
Thread.sleep(1000);  // Sleep 1 second

// Thread.join() - wait for thread completion
Thread worker = new Thread(() -> {
    // Long running task
    System.out.println("Work done");
});
worker.start();
worker.join();  // Wait for worker to complete
System.out.println("After worker");

// Thread.interrupt() - signal interruption
Thread task = new Thread(() -> {
    while (!Thread.currentThread().isInterrupted()) {
        // Do work
    }
    System.out.println("Thread interrupted, cleaning up...");
});
task.start();
Thread.sleep(100);
task.interrupt();  // Request interruption

// Daemon threads - background threads
Thread daemon = new Thread(() -> {
    while (true) {
        System.out.println("Daemon running...");
        try { Thread.sleep(500); } catch (InterruptedException e) {}
    }
});
daemon.setDaemon(true);  // Must set before start()
daemon.start();
// Daemon terminates when all user threads finish

// Thread priorities (hint to scheduler)
thread.setPriority(Thread.MAX_PRIORITY);  // 10
thread.setPriority(Thread.MIN_PRIORITY);  // 1
thread.setPriority(Thread.NORM_PRIORITY); // 5 (default)`
        }
      ]
    },
    {
      id: 'synchronization',
      name: 'Synchronization',
      icon: '🔒',
      color: '#ef4444',
      description: 'Coordinating access to shared resources and preventing race conditions.',
      diagram: SyncDiagram,
      details: [
        {
          name: 'Synchronized Keyword',
          explanation: 'The synchronized keyword provides mutual exclusion using intrinsic locks (monitors). Synchronized methods lock on this (instance) or Class object (static). Synchronized blocks allow finer-grained locking on specific objects. Only one thread can hold a lock at a time.',
          codeExample: `class Counter {
    private int count = 0;

    // Synchronized method - locks on 'this'
    public synchronized void increment() {
        count++;
    }

    public synchronized int getCount() {
        return count;
    }

    // Synchronized block - more fine-grained
    public void incrementBlock() {
        synchronized (this) {
            count++;
        }
    }

    // Lock on specific object
    private final Object lock = new Object();

    public void safeIncrement() {
        synchronized (lock) {
            count++;
        }
    }

    // Static synchronized - locks on Class object
    private static int staticCount = 0;

    public static synchronized void staticIncrement() {
        staticCount++;  // Locks on Counter.class
    }
}

// Usage
Counter counter = new Counter();
Thread t1 = new Thread(() -> {
    for (int i = 0; i < 1000; i++) counter.increment();
});
Thread t2 = new Thread(() -> {
    for (int i = 0; i < 1000; i++) counter.increment();
});
t1.start(); t2.start();
t1.join(); t2.join();
System.out.println(counter.getCount());  // Always 2000`
        },
        {
          name: 'Wait and Notify',
          explanation: 'wait() releases the lock and waits for notification. notify() wakes one waiting thread, notifyAll() wakes all. Must be called within synchronized block on the same object. Use while loops (not if) to recheck conditions after waking to handle spurious wakeups.',
          codeExample: `class SharedBuffer {
    private int data;
    private boolean hasData = false;

    public synchronized void produce(int value)
            throws InterruptedException {
        while (hasData) {
            wait();  // Release lock and wait
        }
        data = value;
        hasData = true;
        System.out.println("Produced: " + value);
        notify();  // Wake up consumer
    }

    public synchronized int consume()
            throws InterruptedException {
        while (!hasData) {
            wait();  // Release lock and wait
        }
        hasData = false;
        System.out.println("Consumed: " + data);
        notify();  // Wake up producer
        return data;
    }
}

// Producer-Consumer usage
SharedBuffer buffer = new SharedBuffer();

Thread producer = new Thread(() -> {
    for (int i = 1; i <= 5; i++) {
        try {
            buffer.produce(i);
        } catch (InterruptedException e) {}
    }
});

Thread consumer = new Thread(() -> {
    for (int i = 1; i <= 5; i++) {
        try {
            buffer.consume();
        } catch (InterruptedException e) {}
    }
});

producer.start();
consumer.start();`
        },
        {
          name: 'Volatile Keyword',
          explanation: 'volatile ensures visibility of changes across threads by forcing reads from main memory. It prevents instruction reordering but does NOT provide atomicity for compound operations (i++). Use for simple flags or when one thread writes and others only read.',
          codeExample: `class VolatileExample {
    // Without volatile - change may not be visible to other threads
    private volatile boolean running = true;

    public void stop() {
        running = false;  // Immediately visible to all threads
    }

    public void run() {
        while (running) {
            // Process...
        }
        System.out.println("Stopped");
    }
}

// Volatile does NOT make compound operations atomic
class UnsafeCounter {
    private volatile int count = 0;

    public void increment() {
        count++;  // NOT atomic: read-modify-write
        // Multiple threads can still cause race condition
    }
}

// For atomic compound operations, use AtomicInteger
import java.util.concurrent.atomic.AtomicInteger;

class SafeCounter {
    private AtomicInteger count = new AtomicInteger(0);

    public void increment() {
        count.incrementAndGet();  // Atomic operation
    }

    public int get() {
        return count.get();
    }
}

// Double-checked locking pattern (uses volatile)
class Singleton {
    private static volatile Singleton instance;

    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}`
        }
      ]
    },
    {
      id: 'locks',
      name: 'Locks & Semaphores',
      icon: '🔑',
      color: '#06b6d4',
      description: 'Advanced synchronization primitives with fine-grained control.',
      diagram: LocksDiagram,
      details: [
        {
          name: 'ReentrantLock',
          explanation: 'ReentrantLock provides explicit lock/unlock control with try-finally pattern. Offers tryLock() for non-blocking attempts, tryLock(timeout) for timed waits, and fairness option for FIFO ordering. More flexible than synchronized but requires manual unlock.',
          codeExample: `import java.util.concurrent.locks.*;

class BankAccount {
    private double balance = 0;
    private final ReentrantLock lock = new ReentrantLock();

    public void deposit(double amount) {
        lock.lock();  // Acquire lock
        try {
            balance += amount;
            System.out.println("Balance: " + balance);
        } finally {
            lock.unlock();  // Always unlock in finally
        }
    }

    // Non-blocking lock attempt
    public boolean tryDeposit(double amount) {
        if (lock.tryLock()) {
            try {
                balance += amount;
                return true;
            } finally {
                lock.unlock();
            }
        }
        return false;  // Could not acquire lock
    }

    // Timed lock attempt
    public boolean timedDeposit(double amount)
            throws InterruptedException {
        if (lock.tryLock(1, TimeUnit.SECONDS)) {
            try {
                balance += amount;
                return true;
            } finally {
                lock.unlock();
            }
        }
        return false;  // Timeout
    }
}

// Fair lock - threads acquire in FIFO order
ReentrantLock fairLock = new ReentrantLock(true);`
        },
        {
          name: 'ReadWriteLock',
          explanation: 'ReadWriteLock allows multiple concurrent readers OR a single exclusive writer. ReentrantReadWriteLock implementation improves performance in read-heavy scenarios. Writers have exclusive access, readers can share. Useful for caches and configuration data.',
          codeExample: `import java.util.concurrent.locks.*;

class Cache<K, V> {
    private final Map<K, V> data = new HashMap<>();
    private final ReadWriteLock rwLock = new ReentrantReadWriteLock();
    private final Lock readLock = rwLock.readLock();
    private final Lock writeLock = rwLock.writeLock();

    // Multiple threads can read concurrently
    public V get(K key) {
        readLock.lock();
        try {
            return data.get(key);
        } finally {
            readLock.unlock();
        }
    }

    // Only one thread can write at a time
    public void put(K key, V value) {
        writeLock.lock();
        try {
            data.put(key, value);
        } finally {
            writeLock.unlock();
        }
    }

    // Read-then-write pattern
    public V getOrCompute(K key, Function<K, V> compute) {
        readLock.lock();
        try {
            V value = data.get(key);
            if (value != null) return value;
        } finally {
            readLock.unlock();
        }

        writeLock.lock();
        try {
            // Double-check after acquiring write lock
            V value = data.get(key);
            if (value == null) {
                value = compute.apply(key);
                data.put(key, value);
            }
            return value;
        } finally {
            writeLock.unlock();
        }
    }
}`
        },
        {
          name: 'Semaphore & Latch',
          explanation: 'Semaphore controls access to limited resources via permits. acquire() blocks if no permits available, release() returns a permit. CountDownLatch is a one-time barrier where threads wait until count reaches zero. CyclicBarrier is reusable for synchronized phases.',
          codeExample: `import java.util.concurrent.*;

// Semaphore - limit concurrent access
Semaphore semaphore = new Semaphore(3);  // 3 permits

for (int i = 0; i < 10; i++) {
    int id = i;
    new Thread(() -> {
        try {
            semaphore.acquire();  // Get permit (blocks if none)
            System.out.println("Thread " + id + " acquired");
            Thread.sleep(1000);
            semaphore.release();  // Return permit
            System.out.println("Thread " + id + " released");
        } catch (InterruptedException e) {}
    }).start();
}
// Only 3 threads run concurrently

// CountDownLatch - wait for multiple events
CountDownLatch latch = new CountDownLatch(3);

for (int i = 0; i < 3; i++) {
    int id = i;
    new Thread(() -> {
        System.out.println("Task " + id + " completed");
        latch.countDown();  // Decrement count
    }).start();
}

latch.await();  // Block until count reaches 0
System.out.println("All tasks done!");

// CyclicBarrier - reusable synchronization point
CyclicBarrier barrier = new CyclicBarrier(3, () -> {
    System.out.println("All threads reached barrier");
});

for (int i = 0; i < 3; i++) {
    new Thread(() -> {
        try {
            System.out.println(Thread.currentThread().getName() + " waiting");
            barrier.await();  // Wait for all threads
            System.out.println(Thread.currentThread().getName() + " continued");
        } catch (Exception e) {}
    }).start();
}`
        }
      ]
    },
    {
      id: 'executor',
      name: 'Executor Framework',
      icon: '⚙️',
      color: '#ec4899',
      description: 'High-level API for managing thread pools and asynchronous task execution.',
      diagram: ExecutorDiagram,
      details: [
        {
          name: 'Thread Pool Types',
          explanation: 'Executors factory creates common pool configurations. FixedThreadPool has fixed size with unbounded queue. CachedThreadPool creates threads as needed and reuses idle ones. SingleThreadExecutor ensures sequential execution. ScheduledThreadPool handles delayed/periodic tasks.',
          codeExample: `import java.util.concurrent.*;

// Fixed thread pool - best for bounded tasks
ExecutorService fixed = Executors.newFixedThreadPool(4);
// Uses 4 threads, tasks queue if all busy

// Cached thread pool - best for short-lived tasks
ExecutorService cached = Executors.newCachedThreadPool();
// Creates threads as needed, reuses idle threads (60s timeout)

// Single thread - sequential execution
ExecutorService single = Executors.newSingleThreadExecutor();
// One thread, tasks execute in order

// Scheduled thread pool - delayed/periodic tasks
ScheduledExecutorService scheduled = Executors.newScheduledThreadPool(2);

// Work-stealing pool (Java 8+) - parallelism
ExecutorService workStealing = Executors.newWorkStealingPool();
// Uses all available processors

// Custom ThreadPoolExecutor
ThreadPoolExecutor custom = new ThreadPoolExecutor(
    2,                      // Core pool size
    4,                      // Maximum pool size
    60, TimeUnit.SECONDS,   // Keep-alive time
    new LinkedBlockingQueue<>(100),  // Work queue
    new ThreadPoolExecutor.CallerRunsPolicy()  // Rejection policy
);

// Always shutdown executors
fixed.shutdown();
fixed.awaitTermination(5, TimeUnit.SECONDS);`
        },
        {
          name: 'Submitting Tasks',
          explanation: 'submit() returns Future for tracking task results. Runnable tasks have no return value, Callable tasks return results and can throw exceptions. invokeAll() executes multiple tasks and waits for all. invokeAny() returns first successful result.',
          codeExample: `import java.util.concurrent.*;

ExecutorService executor = Executors.newFixedThreadPool(3);

// Submit Runnable - no return value
executor.submit(() -> {
    System.out.println("Runnable task executed");
});

// Submit Callable - returns result
Future<Integer> future = executor.submit(() -> {
    Thread.sleep(1000);
    return 42;
});

// Get result (blocks until complete)
try {
    Integer result = future.get();  // Blocking
    Integer timedResult = future.get(2, TimeUnit.SECONDS);  // With timeout
} catch (ExecutionException | TimeoutException e) {
    e.printStackTrace();
}

// Check status
boolean isDone = future.isDone();
boolean cancelled = future.cancel(true);  // May interrupt

// invokeAll - execute multiple tasks, wait for all
List<Callable<String>> tasks = Arrays.asList(
    () -> "Task 1",
    () -> "Task 2",
    () -> "Task 3"
);
List<Future<String>> results = executor.invokeAll(tasks);
for (Future<String> f : results) {
    System.out.println(f.get());
}

// invokeAny - return first successful result
String first = executor.invokeAny(tasks);

executor.shutdown();`
        },
        {
          name: 'Scheduled Execution',
          explanation: 'ScheduledExecutorService supports delayed and periodic task execution. schedule() runs once after delay. scheduleAtFixedRate() runs periodically from start times. scheduleWithFixedDelay() waits fixed delay between task completions.',
          codeExample: `import java.util.concurrent.*;

ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(2);

// Run once after delay
scheduler.schedule(() -> {
    System.out.println("Executed after 2 seconds");
}, 2, TimeUnit.SECONDS);

// Run periodically at fixed rate
// If task takes longer than period, next starts immediately after
ScheduledFuture<?> fixedRate = scheduler.scheduleAtFixedRate(() -> {
    System.out.println("Fixed rate: " + System.currentTimeMillis());
}, 0, 1, TimeUnit.SECONDS);
// initial delay: 0, period: 1 second

// Run with fixed delay between completions
// Waits fixed time after each completion before next start
ScheduledFuture<?> fixedDelay = scheduler.scheduleWithFixedDelay(() -> {
    System.out.println("Fixed delay: " + System.currentTimeMillis());
    try { Thread.sleep(500); } catch (InterruptedException e) {}
}, 0, 1, TimeUnit.SECONDS);
// Actual period = task duration + 1 second

// Cancel scheduled task
Thread.sleep(5000);
fixedRate.cancel(false);  // Stop periodic execution

// Scheduled Callable - returns ScheduledFuture
ScheduledFuture<String> result = scheduler.schedule(
    () -> "Delayed result",
    3, TimeUnit.SECONDS
);
String value = result.get();  // Blocks until complete

scheduler.shutdown();`
        }
      ]
    },
    {
      id: 'completable-future',
      name: 'CompletableFuture',
      icon: '🔮',
      color: '#10b981',
      description: 'Powerful asynchronous programming with chainable operations and error handling.',
      diagram: CompletableFutureDiagram,
      details: [
        {
          name: 'Creating & Chaining',
          explanation: 'supplyAsync() runs task asynchronously and returns result. thenApply() transforms result synchronously, thenApplyAsync() transforms in new thread. thenAccept() consumes result without returning. thenRun() executes action after completion. Chain methods for fluent pipelines.',
          codeExample: `import java.util.concurrent.*;

// Create async task
CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
    // Runs in ForkJoinPool.commonPool()
    return "Hello";
});

// Chain transformations
CompletableFuture<String> result = CompletableFuture
    .supplyAsync(() -> "Hello")
    .thenApply(s -> s + " World")        // Transform result
    .thenApply(String::toUpperCase);     // Chain more transforms

System.out.println(result.get());  // "HELLO WORLD"

// Consume result without returning
CompletableFuture.supplyAsync(() -> "Message")
    .thenAccept(System.out::println);    // Consumes, returns void

// Run action after completion
CompletableFuture.supplyAsync(() -> "Done")
    .thenRun(() -> System.out.println("Task finished"));

// Use custom executor
ExecutorService executor = Executors.newFixedThreadPool(4);
CompletableFuture<String> custom = CompletableFuture.supplyAsync(
    () -> "Custom pool",
    executor
);

// Async variants - run in different thread
CompletableFuture<String> async = CompletableFuture
    .supplyAsync(() -> "Start")
    .thenApplyAsync(s -> s + " End");  // New thread for transform

executor.shutdown();`
        },
        {
          name: 'Combining Futures',
          explanation: 'thenCompose() chains dependent async operations (flatMap). thenCombine() runs two futures in parallel and combines results. allOf() waits for all futures, anyOf() completes when first finishes. These enable complex async workflows.',
          codeExample: `import java.util.concurrent.*;

// thenCompose - sequential async operations (flatMap)
CompletableFuture<String> composed = CompletableFuture
    .supplyAsync(() -> "user123")
    .thenCompose(userId -> fetchUserData(userId));  // Returns CF

private CompletableFuture<String> fetchUserData(String userId) {
    return CompletableFuture.supplyAsync(() -> "Data for " + userId);
}

// thenCombine - parallel execution, combine results
CompletableFuture<Integer> price = CompletableFuture.supplyAsync(() -> 100);
CompletableFuture<Integer> quantity = CompletableFuture.supplyAsync(() -> 5);

CompletableFuture<Integer> total = price.thenCombine(
    quantity,
    (p, q) -> p * q  // Combine when both complete
);
System.out.println(total.get());  // 500

// allOf - wait for all futures
CompletableFuture<String> f1 = CompletableFuture.supplyAsync(() -> "One");
CompletableFuture<String> f2 = CompletableFuture.supplyAsync(() -> "Two");
CompletableFuture<String> f3 = CompletableFuture.supplyAsync(() -> "Three");

CompletableFuture<Void> allDone = CompletableFuture.allOf(f1, f2, f3);
allDone.join();  // Wait for all

// Collect results after allOf
List<String> results = Stream.of(f1, f2, f3)
    .map(CompletableFuture::join)
    .collect(Collectors.toList());

// anyOf - first to complete
CompletableFuture<Object> anyDone = CompletableFuture.anyOf(f1, f2, f3);
System.out.println("First: " + anyDone.get());`
        },
        {
          name: 'Error Handling',
          explanation: 'exceptionally() handles exceptions and provides fallback value. handle() processes both success and failure cases. whenComplete() executes cleanup regardless of outcome. Exceptions propagate through the chain until handled.',
          codeExample: `import java.util.concurrent.*;

// exceptionally - handle exceptions with fallback
CompletableFuture<String> withFallback = CompletableFuture
    .supplyAsync(() -> {
        if (Math.random() > 0.5) {
            throw new RuntimeException("Failed!");
        }
        return "Success";
    })
    .exceptionally(ex -> {
        System.out.println("Error: " + ex.getMessage());
        return "Fallback value";  // Recovery value
    });

// handle - process success or failure
CompletableFuture<String> handled = CompletableFuture
    .supplyAsync(() -> {
        throw new RuntimeException("Error");
    })
    .handle((result, ex) -> {
        if (ex != null) {
            return "Handled: " + ex.getMessage();
        }
        return result;
    });

// whenComplete - cleanup action (doesn't change result)
CompletableFuture<String> withCleanup = CompletableFuture
    .supplyAsync(() -> "Result")
    .whenComplete((result, ex) -> {
        if (ex != null) {
            System.out.println("Failed: " + ex);
        } else {
            System.out.println("Completed: " + result);
        }
        // Cleanup resources
    });

// Timeout handling (Java 9+)
CompletableFuture<String> withTimeout = CompletableFuture
    .supplyAsync(() -> {
        try { Thread.sleep(5000); } catch (InterruptedException e) {}
        return "Slow result";
    })
    .orTimeout(2, TimeUnit.SECONDS)  // Throws TimeoutException
    .exceptionally(ex -> "Timeout fallback");

// Complete on timeout with default (Java 9+)
CompletableFuture<String> defaultOnTimeout = CompletableFuture
    .supplyAsync(() -> slowOperation())
    .completeOnTimeout("Default", 2, TimeUnit.SECONDS);`
        }
      ]
    },
    {
      id: 'classloading',
      name: 'Class Loading',
      icon: '📂',
      color: '#f97316',
      description: 'Dynamic loading of Java classes into JVM memory at runtime.',
      diagram: ClassLoaderDiagram,
      details: [
        {
          name: 'Loading Process',
          explanation: 'Class loading has three phases: Loading (read .class file, create Class object), Linking (verify bytecode, allocate static fields, resolve references), and Initialization (execute static initializers). Classes are loaded lazily on first use.',
          codeExample: `// Class loading triggers
public class LoadingDemo {
    static {
        System.out.println("Static initializer executed");
    }

    static int value = initValue();

    static int initValue() {
        System.out.println("Static field initialized");
        return 42;
    }
}

// Loading triggers:
// 1. Creating instance
LoadingDemo demo = new LoadingDemo();

// 2. Accessing static field
int val = LoadingDemo.value;

// 3. Calling static method
LoadingDemo.staticMethod();

// 4. Class.forName()
Class<?> clazz = Class.forName("LoadingDemo");

// 5. Subclass initialization loads parent
class Child extends LoadingDemo {}
new Child();  // Loads LoadingDemo first

// Does NOT trigger loading:
// - Referencing Class literal (LoadingDemo.class)
// - Accessing compile-time constant (static final primitive)
public static final int CONSTANT = 100;  // Not loading trigger`
        },
        {
          name: 'ClassLoader Hierarchy',
          explanation: 'Bootstrap ClassLoader (native) loads core Java classes. Platform/Extension ClassLoader loads standard extensions. Application ClassLoader loads classpath classes. Custom ClassLoaders can load from any source. Parent delegation ensures consistent class loading.',
          codeExample: `// View ClassLoader hierarchy
ClassLoader appLoader = ClassLoader.getSystemClassLoader();
ClassLoader platformLoader = appLoader.getParent();
ClassLoader bootstrapLoader = platformLoader.getParent();

System.out.println("App: " + appLoader);
// jdk.internal.loader.ClassLoaders$AppClassLoader
System.out.println("Platform: " + platformLoader);
// jdk.internal.loader.ClassLoaders$PlatformClassLoader
System.out.println("Bootstrap: " + bootstrapLoader);
// null (native implementation)

// Check which loader loaded a class
ClassLoader stringLoader = String.class.getClassLoader();
System.out.println("String loader: " + stringLoader);  // null (bootstrap)

ClassLoader myLoader = MyClass.class.getClassLoader();
System.out.println("MyClass loader: " + myLoader);  // AppClassLoader

// Parent delegation model:
// 1. AppClassLoader receives loadClass("com.example.MyClass")
// 2. Delegates to PlatformClassLoader
// 3. Delegates to BootstrapClassLoader
// 4. Bootstrap can't find it, returns to Platform
// 5. Platform can't find it, returns to App
// 6. App loads the class

// Load class explicitly
Class<?> loaded = Class.forName("com.example.MyClass");
Class<?> noInit = Class.forName(
    "com.example.MyClass",
    false,  // Don't initialize
    ClassLoader.getSystemClassLoader()
);`
        },
        {
          name: 'Custom ClassLoader',
          explanation: 'Custom ClassLoaders enable loading from non-standard sources (network, database, encrypted). Override findClass() to implement loading logic. Use defineClass() to convert bytecode to Class object. Useful for hot deployment, plugins, and isolation.',
          codeExample: `// Custom ClassLoader implementation
class NetworkClassLoader extends ClassLoader {
    private String baseUrl;

    public NetworkClassLoader(String baseUrl, ClassLoader parent) {
        super(parent);
        this.baseUrl = baseUrl;
    }

    @Override
    protected Class<?> findClass(String name)
            throws ClassNotFoundException {
        try {
            // Convert class name to path
            String path = name.replace('.', '/') + ".class";
            URL url = new URL(baseUrl + path);

            // Read bytecode
            byte[] classData = readFromNetwork(url);

            // Define the class
            return defineClass(name, classData, 0, classData.length);
        } catch (Exception e) {
            throw new ClassNotFoundException(name, e);
        }
    }

    private byte[] readFromNetwork(URL url) throws IOException {
        try (InputStream is = url.openStream()) {
            return is.readAllBytes();
        }
    }
}

// Usage
NetworkClassLoader loader = new NetworkClassLoader(
    "https://example.com/classes/",
    getClass().getClassLoader()
);

Class<?> remoteClass = loader.loadClass("com.example.RemotePlugin");
Object instance = remoteClass.getDeclaredConstructor().newInstance();

// Hot reloading pattern
// Create new ClassLoader to reload modified class
NetworkClassLoader newLoader = new NetworkClassLoader(
    "https://example.com/classes/",
    getClass().getClassLoader()
);
Class<?> reloadedClass = newLoader.loadClass("com.example.RemotePlugin");
// newLoader.loadClass returns different Class object`
        }
      ]
    },
    {
      id: 'bytecode',
      name: 'Bytecode',
      icon: '🔢',
      color: '#6366f1',
      description: 'Platform-independent intermediate representation executed by JVM.',
      diagram: BytecodeDiagram,
      details: [
        {
          name: 'Bytecode Basics',
          explanation: 'Java source compiles to bytecode (.class files) executed by JVM. Stack-based architecture uses operand stack for operations. ~200 opcodes cover load/store, arithmetic, control flow, method calls, and object operations. Platform independence through abstract instruction set.',
          codeExample: `// Source code
public class BytecodeDemo {
    public int add(int a, int b) {
        return a + b;
    }

    public int calculate(int x) {
        int y = 10;
        int z = x + y;
        return z * 2;
    }
}

// Bytecode (javap -c BytecodeDemo):
/*
public int add(int, int);
  Code:
    0: iload_1        // Load int from local var 1 (a) onto stack
    1: iload_2        // Load int from local var 2 (b) onto stack
    2: iadd           // Pop two ints, push their sum
    3: ireturn        // Return int on top of stack

public int calculate(int);
  Code:
    0: bipush 10      // Push byte 10 onto stack
    2: istore_2       // Store to local var 2 (y)
    3: iload_1        // Load x
    4: iload_2        // Load y
    5: iadd           // x + y
    6: istore_3       // Store to z
    7: iload_3        // Load z
    8: iconst_2       // Push constant 2
    9: imul           // z * 2
    10: ireturn       // Return result
*/

// View bytecode with javap
// javap -c -verbose BytecodeDemo.class`
        },
        {
          name: 'Common Instructions',
          explanation: 'Load instructions (iload, aload) push values onto stack. Store instructions (istore, astore) pop and save. Arithmetic (iadd, imul) operates on stack. Method invocation: invokevirtual (instance), invokestatic, invokeinterface, invokespecial (constructor/super/private).',
          codeExample: `// Instruction categories with examples

// LOAD/STORE - stack <-> local variables
iload_0   // Load int from local var 0
aload_1   // Load reference from local var 1
istore_2  // Store int to local var 2
astore_3  // Store reference to local var 3

// CONSTANTS - push values onto stack
iconst_0  // Push int 0 (-1 to 5 have dedicated opcodes)
bipush 10 // Push byte as int
ldc "str" // Load from constant pool

// ARITHMETIC - operate on stack values
iadd      // int add
isub      // int subtract
imul      // int multiply
idiv      // int divide

// COMPARISONS & BRANCHING
if_icmpeq // if int comparison equals, branch
if_icmpgt // if greater than
goto      // unconditional jump
ifeq      // if top of stack == 0

// METHOD INVOCATION
invokevirtual   // Instance method (virtual dispatch)
invokestatic    // Static method
invokespecial   // Constructor, private, super
invokeinterface // Interface method
invokedynamic   // Dynamic (lambdas, method handles)

// OBJECT OPERATIONS
new           // Create new object
newarray      // Create array
getfield      // Get instance field
putfield      // Set instance field
getstatic     // Get static field

// Example: object.method(arg)
aload_1           // Push object reference
iload_2           // Push int argument
invokevirtual #4  // Call method (ref in constant pool)`
        },
        {
          name: 'JIT Compilation',
          explanation: 'JVM interprets bytecode initially, then JIT compiles hot code paths to native machine code. Tiered compilation uses C1 (quick compilation) and C2 (optimized) compilers. Optimizations include inlining, loop unrolling, escape analysis, and dead code elimination.',
          codeExample: `// JIT compilation flow
/*
1. Interpretation phase:
   - JVM interprets bytecode directly
   - Profiles execution (method call counts, branch frequencies)

2. C1 Compilation (Client Compiler):
   - Quick compilation with basic optimizations
   - Triggered after method reaches threshold (~1500 calls)
   - Continues profiling for more optimization data

3. C2 Compilation (Server Compiler):
   - Aggressive optimizations based on profile data
   - Triggered after ~10000 calls
   - Inlining, escape analysis, loop optimizations
*/

// JVM flags to observe JIT
// -XX:+PrintCompilation       Print compiled methods
// -XX:+UnlockDiagnosticVMOptions -XX:+PrintInlining
// -XX:CompileThreshold=10000  Set compilation threshold

// JIT optimizations example
public class JITDemo {
    // Before JIT - separate allocations, method calls
    public int compute() {
        Point p = new Point(10, 20);
        return p.getX() + p.getY();
    }

    // After JIT with escape analysis and inlining:
    // - Point allocation eliminated (scalar replacement)
    // - getX()/getY() inlined
    // Effectively becomes: return 10 + 20; -> return 30;
}

// Warm-up loops for benchmarks
for (int i = 0; i < 10000; i++) {
    methodToOptimize();  // Trigger JIT compilation
}
// Now measure performance with optimized code

// @Warmup annotation in JMH (Java Microbenchmark Harness)
// handles warm-up automatically for accurate benchmarks`
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
      { name: 'Java', icon: '☕', page: 'Java' },
      { name: 'Core Java', icon: '🔧', page: 'Core Java' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #78350f 50%, #0f172a 100%)',
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
    background: 'rgba(245, 158, 11, 0.2)',
    border: '1px solid rgba(245, 158, 11, 0.3)',
    borderRadius: '0.5rem',
    color: '#fbbf24',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div style={containerStyle}>
      {/* Header with title and navigation buttons */}
      <div style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            style={backButtonStyle}
            onClick={onBack}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(245, 158, 11, 0.3)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(245, 158, 11, 0.2)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            ← Back to Java
          </button>
          <h1 style={titleStyle}>Core Java Fundamentals</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {onPrevious && (
            <button
              onClick={onPrevious}
              style={{
                padding: '0.75rem 1.25rem',
                background: 'rgba(59, 130, 246, 0.2)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '0.5rem',
                color: '#60a5fa',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.3)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)'
              }}
            >
              ← {previousName}
            </button>
          )}
          {onNext && (
            <button
              onClick={onNext}
              style={{
                padding: '0.75rem 1.25rem',
                background: 'rgba(59, 130, 246, 0.2)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '0.5rem',
                color: '#60a5fa',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.3)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)'
              }}
            >
              {nextName} →
            </button>
          )}
        </div>
      </div>

      {/* Breadcrumb navigation */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={COREJAVA_COLORS}
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
        primaryColor={COREJAVA_COLORS.primary}
      />

      {/* Description */}
      <p style={{
        maxWidth: '1400px',
        margin: '0 auto 2rem',
        fontSize: '1.1rem',
        color: '#94a3b8',
        textAlign: 'center',
        lineHeight: '1.8'
      }}>
        Master the foundational concepts of Java programming including OOP principles,
        data structures, concurrency, and JVM internals.
      </p>

      {/* Concept Cards Grid */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
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
              border: `1px solid ${selectedConcept.color}40`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Breadcrumb */}
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
              onMainMenu={breadcrumb?.onMainMenu || onBack}
              colors={COREJAVA_COLORS}
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
              const DiagramComponent = selectedConcept.diagram
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

export default CoreJava
