/**
 * BlockingQueue - Deep Dive
 *
 * Comprehensive guide to Java's BlockingQueue - essential for concurrency interviews.
 * Covers all implementations, producer-consumer patterns, and custom implementation.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const BLOCKING_QUEUE_COLORS = {
  primary: '#f59e0b',           // Amber
  primaryHover: '#fbbf24',      // Lighter amber
  bg: 'rgba(245, 158, 11, 0.1)', // Background with transparency
  border: 'rgba(245, 158, 11, 0.3)', // Border color
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

const ProducerConsumerDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-yellow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
      <marker id="arrow-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
      </marker>
    </defs>

    {/* Title */}
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Producer-Consumer Pattern with BlockingQueue
    </text>

    {/* Producers */}
    <rect x="30" y="60" width="100" height="40" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="80" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Producer 1</text>

    <rect x="30" y="115" width="100" height="40" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="80" y="140" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Producer 2</text>

    <rect x="30" y="170" width="100" height="40" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="80" y="195" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Producer 3</text>

    {/* BlockingQueue */}
    <rect x="270" y="90" width="260" height="90" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="400" y="115" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">BlockingQueue</text>

    {/* Queue slots */}
    <rect x="290" y="130" width="40" height="35" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="1"/>
    <text x="310" y="152" textAnchor="middle" fill="#94a3b8" fontSize="10">T1</text>

    <rect x="340" y="130" width="40" height="35" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="1"/>
    <text x="360" y="152" textAnchor="middle" fill="#94a3b8" fontSize="10">T2</text>

    <rect x="390" y="130" width="40" height="35" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="1"/>
    <text x="410" y="152" textAnchor="middle" fill="#94a3b8" fontSize="10">T3</text>

    <rect x="440" y="130" width="40" height="35" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="1"/>
    <text x="460" y="152" textAnchor="middle" fill="#64748b" fontSize="10">...</text>

    <rect x="490" y="130" width="40" height="35" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="1"/>

    {/* Consumers */}
    <rect x="670" y="60" width="100" height="40" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="720" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Consumer 1</text>

    <rect x="670" y="115" width="100" height="40" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="720" y="140" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Consumer 2</text>

    <rect x="670" y="170" width="100" height="40" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="720" y="195" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Consumer 3</text>

    {/* Arrows from producers */}
    <line x1="130" y1="80" x2="180" y2="135" stroke="#f59e0b" strokeWidth="2"/>
    <line x1="130" y1="135" x2="265" y2="135" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-yellow)"/>
    <line x1="130" y1="190" x2="180" y2="135" stroke="#f59e0b" strokeWidth="2"/>

    {/* put() label */}
    <text x="190" y="115" fill="#f59e0b" fontSize="10" fontWeight="bold">put()</text>
    <text x="175" y="160" fill="#94a3b8" fontSize="9">blocks if full</text>

    {/* Arrows to consumers */}
    <line x1="535" y1="135" x2="620" y2="135" stroke="#22c55e" strokeWidth="2"/>
    <line x1="620" y1="135" x2="665" y2="80" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-green)"/>
    <line x1="620" y1="135" x2="665" y2="135" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-green)"/>
    <line x1="620" y1="135" x2="665" y2="190" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-green)"/>

    {/* take() label */}
    <text x="575" y="115" fill="#22c55e" fontSize="10" fontWeight="bold">take()</text>
    <text x="560" y="160" fill="#94a3b8" fontSize="9">blocks if empty</text>

    {/* Labels */}
    <text x="80" y="235" textAnchor="middle" fill="#3b82f6" fontSize="10">PRODUCERS</text>
    <text x="400" y="235" textAnchor="middle" fill="#f59e0b" fontSize="10">BOUNDED BUFFER</text>
    <text x="720" y="235" textAnchor="middle" fill="#22c55e" fontSize="10">CONSUMERS</text>

    {/* Benefits */}
    <text x="400" y="260" textAnchor="middle" fill="#64748b" fontSize="9">Thread-safe | Auto-blocking | Backpressure | Decoupled</text>
  </svg>
)

const QueueOperationsDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-ops" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
      </marker>
    </defs>

    {/* Title */}
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      BlockingQueue Operation Categories
    </text>

    {/* Column Headers */}
    <text x="200" y="55" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">Throws Exception</text>
    <text x="350" y="55" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">Returns Special Value</text>
    <text x="500" y="55" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">Blocks</text>
    <text x="650" y="55" textAnchor="middle" fill="#8b5cf6" fontSize="11" fontWeight="bold">Times Out</text>

    {/* Row: Insert */}
    <text x="80" y="90" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">Insert</text>
    <rect x="150" y="70" width="100" height="30" rx="4" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="1"/>
    <text x="200" y="90" textAnchor="middle" fill="#ef4444" fontSize="10">add(e)</text>

    <rect x="300" y="70" width="100" height="30" rx="4" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="350" y="90" textAnchor="middle" fill="#f59e0b" fontSize="10">offer(e)</text>

    <rect x="450" y="70" width="100" height="30" rx="4" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="1"/>
    <text x="500" y="90" textAnchor="middle" fill="#22c55e" fontSize="10">put(e)</text>

    <rect x="600" y="70" width="100" height="30" rx="4" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="650" y="90" textAnchor="middle" fill="#8b5cf6" fontSize="10">offer(e,t,u)</text>

    {/* Row: Remove */}
    <text x="80" y="130" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">Remove</text>
    <rect x="150" y="110" width="100" height="30" rx="4" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="1"/>
    <text x="200" y="130" textAnchor="middle" fill="#ef4444" fontSize="10">remove()</text>

    <rect x="300" y="110" width="100" height="30" rx="4" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="350" y="130" textAnchor="middle" fill="#f59e0b" fontSize="10">poll()</text>

    <rect x="450" y="110" width="100" height="30" rx="4" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="1"/>
    <text x="500" y="130" textAnchor="middle" fill="#22c55e" fontSize="10">take()</text>

    <rect x="600" y="110" width="100" height="30" rx="4" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="650" y="130" textAnchor="middle" fill="#8b5cf6" fontSize="10">poll(t,u)</text>

    {/* Row: Examine */}
    <text x="80" y="170" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">Examine</text>
    <rect x="150" y="150" width="100" height="30" rx="4" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="1"/>
    <text x="200" y="170" textAnchor="middle" fill="#ef4444" fontSize="10">element()</text>

    <rect x="300" y="150" width="100" height="30" rx="4" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="350" y="170" textAnchor="middle" fill="#f59e0b" fontSize="10">peek()</text>

    <rect x="450" y="150" width="100" height="30" rx="4" fill="rgba(100, 116, 139, 0.2)" stroke="#64748b" strokeWidth="1"/>
    <text x="500" y="170" textAnchor="middle" fill="#64748b" fontSize="10">N/A</text>

    <rect x="600" y="150" width="100" height="30" rx="4" fill="rgba(100, 116, 139, 0.2)" stroke="#64748b" strokeWidth="1"/>
    <text x="650" y="170" textAnchor="middle" fill="#64748b" fontSize="10">N/A</text>

    {/* Usage hint */}
    <text x="400" y="205" textAnchor="middle" fill="#64748b" fontSize="9">Use put/take for producer-consumer | offer/poll with timeout for graceful handling</text>
  </svg>
)

const ArrayBlockingQueueDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-abq" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
    </defs>

    {/* Title */}
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      ArrayBlockingQueue Internal Structure
    </text>

    {/* Single Lock Box */}
    <rect x="280" y="45" width="240" height="35" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="400" y="68" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">Single ReentrantLock</text>

    {/* Arrow from lock */}
    <line x1="400" y1="80" x2="400" y2="105" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-abq)"/>

    {/* Circular Array */}
    <rect x="150" y="110" width="500" height="90" rx="8" fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="400" y="130" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">Circular Array Buffer</text>

    {/* Array slots */}
    <rect x="170" y="145" width="50" height="40" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="1"/>
    <text x="195" y="160" textAnchor="middle" fill="#64748b" fontSize="9">0</text>
    <text x="195" y="175" textAnchor="middle" fill="#22c55e" fontSize="10">T1</text>

    <rect x="230" y="145" width="50" height="40" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="1"/>
    <text x="255" y="160" textAnchor="middle" fill="#64748b" fontSize="9">1</text>
    <text x="255" y="175" textAnchor="middle" fill="#22c55e" fontSize="10">T2</text>

    <rect x="290" y="145" width="50" height="40" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="1"/>
    <text x="315" y="160" textAnchor="middle" fill="#64748b" fontSize="9">2</text>
    <text x="315" y="175" textAnchor="middle" fill="#22c55e" fontSize="10">T3</text>

    <rect x="350" y="145" width="50" height="40" rx="4" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="375" y="160" textAnchor="middle" fill="#64748b" fontSize="9">3</text>
    <text x="375" y="175" textAnchor="middle" fill="#f59e0b" fontSize="10">put</text>

    <rect x="410" y="145" width="50" height="40" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="1"/>
    <text x="435" y="160" textAnchor="middle" fill="#64748b" fontSize="9">4</text>

    <rect x="470" y="145" width="50" height="40" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="1"/>
    <text x="495" y="160" textAnchor="middle" fill="#64748b" fontSize="9">5</text>

    <rect x="530" y="145" width="50" height="40" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="1"/>
    <text x="555" y="160" textAnchor="middle" fill="#64748b" fontSize="9">6</text>

    <rect x="590" y="145" width="50" height="40" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="1"/>
    <text x="615" y="160" textAnchor="middle" fill="#64748b" fontSize="9">7</text>

    {/* Index pointers */}
    <line x1="195" y1="195" x2="195" y2="215" stroke="#3b82f6" strokeWidth="2"/>
    <text x="195" y="230" textAnchor="middle" fill="#3b82f6" fontSize="9" fontWeight="bold">takeIndex</text>

    <line x1="375" y1="195" x2="375" y2="215" stroke="#f59e0b" strokeWidth="2"/>
    <text x="375" y="230" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold">putIndex</text>

    {/* Conditions */}
    <rect x="150" y="245" width="150" height="25" rx="4" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="225" y="262" textAnchor="middle" fill="#3b82f6" fontSize="9">notEmpty: signal on put()</text>

    <rect x="500" y="245" width="150" height="25" rx="4" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="575" y="262" textAnchor="middle" fill="#8b5cf6" fontSize="9">notFull: signal on take()</text>
  </svg>
)

const LinkedBlockingQueueDiagram = () => (
  <svg viewBox="0 0 800 250" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-lbq" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
      </marker>
    </defs>

    {/* Title */}
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      LinkedBlockingQueue - Two Separate Locks
    </text>

    {/* Take Lock */}
    <rect x="80" y="50" width="120" height="35" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="140" y="73" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">Take Lock</text>

    {/* Put Lock */}
    <rect x="600" y="50" width="120" height="35" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="660" y="73" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">Put Lock</text>

    {/* Lock arrows */}
    <line x1="140" y1="85" x2="140" y2="115" stroke="#3b82f6" strokeWidth="2"/>
    <line x1="660" y1="85" x2="660" y2="115" stroke="#f59e0b" strokeWidth="2"/>

    {/* Linked Nodes */}
    <rect x="80" y="120" width="90" height="50" rx="6" fill="rgba(100, 116, 139, 0.2)" stroke="#64748b" strokeWidth="2"/>
    <text x="125" y="140" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="bold">HEAD</text>
    <text x="125" y="158" textAnchor="middle" fill="#475569" fontSize="9">(dummy)</text>

    <line x1="170" y1="145" x2="220" y2="145" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-lbq)"/>

    <rect x="225" y="120" width="90" height="50" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="270" y="140" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">Node 1</text>
    <text x="270" y="158" textAnchor="middle" fill="#94a3b8" fontSize="9">Task 1</text>

    <line x1="315" y1="145" x2="365" y2="145" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-lbq)"/>

    <rect x="370" y="120" width="90" height="50" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="415" y="140" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">Node 2</text>
    <text x="415" y="158" textAnchor="middle" fill="#94a3b8" fontSize="9">Task 2</text>

    <line x1="460" y1="145" x2="510" y2="145" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-lbq)"/>

    <rect x="515" y="120" width="90" height="50" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="560" y="140" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">Node 3</text>
    <text x="560" y="158" textAnchor="middle" fill="#94a3b8" fontSize="9">Task 3</text>

    <line x1="605" y1="145" x2="655" y2="145" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-lbq)"/>

    <rect x="660" y="120" width="90" height="50" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="705" y="140" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">TAIL</text>
    <text x="705" y="158" textAnchor="middle" fill="#94a3b8" fontSize="9">last</text>

    {/* AtomicInteger count */}
    <rect x="320" y="195" width="160" height="30" rx="4" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="400" y="215" textAnchor="middle" fill="#8b5cf6" fontSize="10">AtomicInteger count</text>

    {/* Benefits */}
    <text x="400" y="245" textAnchor="middle" fill="#64748b" fontSize="9">Two locks = Producers and Consumers can work simultaneously = Higher throughput</text>
  </svg>
)

const ImplementationComparisonDiagram = () => (
  <svg viewBox="0 0 800 320" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    {/* Title */}
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      BlockingQueue Implementations Comparison
    </text>

    {/* ArrayBlockingQueue */}
    <rect x="30" y="50" width="170" height="120" rx="8" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="115" y="75" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">ArrayBlockingQueue</text>
    <text x="115" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">Fixed capacity</text>
    <text x="115" y="110" textAnchor="middle" fill="#94a3b8" fontSize="9">1 lock (simpler)</text>
    <text x="115" y="125" textAnchor="middle" fill="#94a3b8" fontSize="9">FIFO ordering</text>
    <text x="115" y="145" textAnchor="middle" fill="#22c55e" fontSize="9">Best: Bounded buffer</text>

    {/* LinkedBlockingQueue */}
    <rect x="220" y="50" width="170" height="120" rx="8" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2"/>
    <text x="305" y="75" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">LinkedBlockingQueue</text>
    <text x="305" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">Optional capacity</text>
    <text x="305" y="110" textAnchor="middle" fill="#94a3b8" fontSize="9">2 locks (faster)</text>
    <text x="305" y="125" textAnchor="middle" fill="#94a3b8" fontSize="9">FIFO ordering</text>
    <text x="305" y="145" textAnchor="middle" fill="#22c55e" fontSize="9">Best: High throughput</text>

    {/* PriorityBlockingQueue */}
    <rect x="410" y="50" width="170" height="120" rx="8" fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="495" y="75" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">PriorityBlockingQueue</text>
    <text x="495" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">Unbounded</text>
    <text x="495" y="110" textAnchor="middle" fill="#94a3b8" fontSize="9">1 lock</text>
    <text x="495" y="125" textAnchor="middle" fill="#94a3b8" fontSize="9">Priority ordering</text>
    <text x="495" y="145" textAnchor="middle" fill="#22c55e" fontSize="9">Best: Priority tasks</text>

    {/* SynchronousQueue */}
    <rect x="600" y="50" width="170" height="120" rx="8" fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="685" y="75" textAnchor="middle" fill="#8b5cf6" fontSize="11" fontWeight="bold">SynchronousQueue</text>
    <text x="685" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">Zero capacity</text>
    <text x="685" y="110" textAnchor="middle" fill="#94a3b8" fontSize="9">Direct handoff</text>
    <text x="685" y="125" textAnchor="middle" fill="#94a3b8" fontSize="9">No storage</text>
    <text x="685" y="145" textAnchor="middle" fill="#22c55e" fontSize="9">Best: Thread handoff</text>

    {/* DelayQueue */}
    <rect x="125" y="190" width="170" height="120" rx="8" fill="rgba(236, 72, 153, 0.1)" stroke="#ec4899" strokeWidth="2"/>
    <text x="210" y="215" textAnchor="middle" fill="#ec4899" fontSize="11" fontWeight="bold">DelayQueue</text>
    <text x="210" y="235" textAnchor="middle" fill="#94a3b8" fontSize="9">Unbounded</text>
    <text x="210" y="250" textAnchor="middle" fill="#94a3b8" fontSize="9">Delayed interface</text>
    <text x="210" y="265" textAnchor="middle" fill="#94a3b8" fontSize="9">Time-based ordering</text>
    <text x="210" y="285" textAnchor="middle" fill="#22c55e" fontSize="9">Best: Scheduled tasks</text>

    {/* LinkedTransferQueue */}
    <rect x="505" y="190" width="170" height="120" rx="8" fill="rgba(6, 182, 212, 0.1)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="590" y="215" textAnchor="middle" fill="#06b6d4" fontSize="11" fontWeight="bold">LinkedTransferQueue</text>
    <text x="590" y="235" textAnchor="middle" fill="#94a3b8" fontSize="9">Unbounded</text>
    <text x="590" y="250" textAnchor="middle" fill="#94a3b8" fontSize="9">Transfer semantics</text>
    <text x="590" y="265" textAnchor="middle" fill="#94a3b8" fontSize="9">Combines features</text>
    <text x="590" y="285" textAnchor="middle" fill="#22c55e" fontSize="9">Best: Flexible handoff</text>
  </svg>
)

const CustomImplementationDiagram = () => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-custom" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
    </defs>

    {/* Title */}
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Custom BlockingQueue - Key Components
    </text>

    {/* ReentrantLock */}
    <rect x="300" y="45" width="200" height="40" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="400" y="70" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">ReentrantLock</text>

    {/* Arrow down */}
    <line x1="400" y1="85" x2="400" y2="110" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-custom)"/>

    {/* Condition Variables */}
    <rect x="150" y="115" width="200" height="50" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="250" y="138" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="bold">notEmpty Condition</text>
    <text x="250" y="155" textAnchor="middle" fill="#94a3b8" fontSize="9">await() when empty</text>

    <rect x="450" y="115" width="200" height="50" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="550" y="138" textAnchor="middle" fill="#8b5cf6" fontSize="10" fontWeight="bold">notFull Condition</text>
    <text x="550" y="155" textAnchor="middle" fill="#94a3b8" fontSize="9">await() when full</text>

    {/* Circular Buffer */}
    <rect x="200" y="185" width="400" height="70" rx="8" fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="400" y="205" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">Object[] items - Circular Buffer</text>

    {/* Buffer slots */}
    <rect x="220" y="215" width="35" height="30" rx="3" fill="#0f172a" stroke="#475569" strokeWidth="1"/>
    <rect x="265" y="215" width="35" height="30" rx="3" fill="#0f172a" stroke="#475569" strokeWidth="1"/>
    <rect x="310" y="215" width="35" height="30" rx="3" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <rect x="355" y="215" width="35" height="30" rx="3" fill="#0f172a" stroke="#475569" strokeWidth="1"/>
    <rect x="400" y="215" width="35" height="30" rx="3" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <rect x="445" y="215" width="35" height="30" rx="3" fill="#0f172a" stroke="#475569" strokeWidth="1"/>
    <rect x="490" y="215" width="35" height="30" rx="3" fill="#0f172a" stroke="#475569" strokeWidth="1"/>
    <rect x="535" y="215" width="35" height="30" rx="3" fill="#0f172a" stroke="#475569" strokeWidth="1"/>

    {/* Pointers */}
    <text x="327" y="260" textAnchor="middle" fill="#3b82f6" fontSize="8" fontWeight="bold">head</text>
    <text x="417" y="260" textAnchor="middle" fill="#f59e0b" fontSize="8" fontWeight="bold">tail</text>

    {/* Count */}
    <rect x="620" y="200" width="80" height="40" rx="4" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="1"/>
    <text x="660" y="215" textAnchor="middle" fill="#22c55e" fontSize="9" fontWeight="bold">count</text>
    <text x="660" y="230" textAnchor="middle" fill="#94a3b8" fontSize="9">int</text>

    {/* Key points */}
    <text x="400" y="285" textAnchor="middle" fill="#64748b" fontSize="9">lockInterruptibly() | while loop for spurious wakeups | signal() after state change</text>
  </svg>
)

const InterviewConceptsDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    {/* Title */}
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Key Interview Concepts
    </text>

    {/* put vs offer */}
    <rect x="30" y="50" width="230" height="70" rx="6" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="145" y="75" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">put() vs offer()</text>
    <text x="145" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">put() blocks indefinitely if full</text>
    <text x="145" y="110" textAnchor="middle" fill="#94a3b8" fontSize="9">offer() returns false immediately</text>

    {/* while vs if */}
    <rect x="285" y="50" width="230" height="70" rx="6" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">while vs if for await()</text>
    <text x="400" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">Use while for spurious wakeups</text>
    <text x="400" y="110" textAnchor="middle" fill="#94a3b8" fontSize="9">Thread may wake without signal</text>

    {/* Array vs Linked */}
    <rect x="540" y="50" width="230" height="70" rx="6" fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="655" y="75" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">Array vs Linked</text>
    <text x="655" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">Array: 1 lock, fixed capacity</text>
    <text x="655" y="110" textAnchor="middle" fill="#94a3b8" fontSize="9">Linked: 2 locks, better concurrency</text>

    {/* ThreadPoolExecutor */}
    <rect x="100" y="145" width="230" height="70" rx="6" fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="215" y="170" textAnchor="middle" fill="#8b5cf6" fontSize="11" fontWeight="bold">ThreadPoolExecutor</text>
    <text x="215" y="190" textAnchor="middle" fill="#94a3b8" fontSize="9">Uses BlockingQueue for tasks</text>
    <text x="215" y="205" textAnchor="middle" fill="#94a3b8" fontSize="9">Workers take() from queue</text>

    {/* SynchronousQueue */}
    <rect x="470" y="145" width="230" height="70" rx="6" fill="rgba(236, 72, 153, 0.1)" stroke="#ec4899" strokeWidth="2"/>
    <text x="585" y="170" textAnchor="middle" fill="#ec4899" fontSize="11" fontWeight="bold">SynchronousQueue Use</text>
    <text x="585" y="190" textAnchor="middle" fill="#94a3b8" fontSize="9">CachedThreadPool uses it</text>
    <text x="585" y="205" textAnchor="middle" fill="#94a3b8" fontSize="9">Direct handoff, no storage</text>

    {/* Poison Pill Pattern */}
    <rect x="285" y="235" width="230" height="40" rx="6" fill="rgba(6, 182, 212, 0.1)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="400" y="255" textAnchor="middle" fill="#06b6d4" fontSize="11" fontWeight="bold">Poison Pill Pattern</text>
    <text x="400" y="270" textAnchor="middle" fill="#94a3b8" fontSize="9">Special message for graceful shutdown</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function BlockingQueue({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'why-blockingqueue',
      name: 'Why BlockingQueue?',
      icon: '\u26A1',
      color: '#f59e0b',
      description: 'Thread-safe queues that solve the Producer-Consumer problem with automatic synchronization and blocking operations.',
      diagram: ProducerConsumerDiagram,
      details: [
        {
          name: 'Problem It Solves',
          diagram: ProducerConsumerDiagram,
          explanation: 'BlockingQueue solves the Producer-Consumer problem elegantly. Without it, you need manual synchronization with locks, wait/notify, and careful handling of edge cases. With BlockingQueue, all operations are atomic and thread-safe, threads wait when queue is empty/full instead of failing, there is no need for explicit locks or wait/notify, bounded queues prevent memory overflow through backpressure, and producers and consumers work independently (decoupled).',
          codeExample: `// Without BlockingQueue - manual synchronization needed
class ManualQueue<T> {
    private Queue<T> queue = new LinkedList<>();
    private int capacity;

    public synchronized void put(T item) throws InterruptedException {
        while (queue.size() == capacity) {
            wait();  // Wait if full
        }
        queue.add(item);
        notifyAll();  // Wake up consumers
    }

    public synchronized T take() throws InterruptedException {
        while (queue.isEmpty()) {
            wait();  // Wait if empty
        }
        T item = queue.poll();
        notifyAll();  // Wake up producers
        return item;
    }
}

// With BlockingQueue - clean and simple!
BlockingQueue<Task> queue = new ArrayBlockingQueue<>(100);
queue.put(task);        // Blocks if full
Task t = queue.take();  // Blocks if empty`
        },
        {
          name: 'Common Use Cases',
          explanation: 'BlockingQueue is essential in many concurrent scenarios: Thread pools (ExecutorService uses BlockingQueue internally to hold pending tasks), Message passing between threads for event-driven architectures, Rate limiting and throttling by controlling the flow of requests, Work distribution in parallel processing systems, and Producer-consumer patterns where production and consumption rates differ.',
          codeExample: `// Thread Pool - internally uses BlockingQueue
ExecutorService pool = Executors.newFixedThreadPool(10);
// Uses LinkedBlockingQueue<Runnable> internally

// Message passing between threads
BlockingQueue<Message> messageQueue = new LinkedBlockingQueue<>();
// Producer thread
messageQueue.put(new Message("Hello"));
// Consumer thread
Message msg = messageQueue.take();

// Rate limiting with bounded queue
BlockingQueue<Request> rateLimiter = new ArrayBlockingQueue<>(100);
// Producers block when 100 requests are pending

// Work distribution
BlockingQueue<Task> workQueue = new ArrayBlockingQueue<>(1000);
// Multiple workers take() from same queue
for (int i = 0; i < numWorkers; i++) {
    new Thread(() -> {
        while (true) {
            Task task = workQueue.take();
            process(task);
        }
    }).start();
}`
        },
        {
          name: 'Key Benefits',
          explanation: 'BlockingQueue provides several advantages over manual synchronization: Thread Safety - all operations are atomic without explicit locking. Blocking Operations - threads wait efficiently instead of busy-waiting or polling. Backpressure - bounded queues naturally limit memory usage. Fairness - optional fair ordering prevents thread starvation. Simplicity - cleaner code with less room for concurrency bugs.',
          codeExample: `// Benefit 1: Thread Safety - no explicit synchronization
BlockingQueue<Task> queue = new ArrayBlockingQueue<>(100);

// Multiple producers can call put() concurrently
// Multiple consumers can call take() concurrently
// No race conditions, no data corruption

// Benefit 2: Backpressure
BlockingQueue<Request> bounded = new ArrayBlockingQueue<>(1000);
// When queue is full, producers slow down automatically
// Prevents OutOfMemoryError from unbounded growth

// Benefit 3: Fairness (optional)
BlockingQueue<Task> fairQueue = new ArrayBlockingQueue<>(100, true);
// Threads are served in FIFO order
// Prevents starvation of long-waiting threads

// Benefit 4: Clean shutdown
final Task POISON = new Task("STOP");
// Producer signals shutdown
queue.put(POISON);
// Consumer checks for poison pill
Task task = queue.take();
if (task == POISON) return;`
        }
      ]
    },
    {
      id: 'interface-operations',
      name: 'BlockingQueue Interface',
      icon: '\uD83D\uDCCB',
      color: '#3b82f6',
      description: 'Four forms of operations: throws exception, returns special value, blocks, and times out.',
      diagram: QueueOperationsDiagram,
      details: [
        {
          name: 'Operation Categories',
          diagram: QueueOperationsDiagram,
          explanation: 'BlockingQueue extends Queue and adds blocking operations. It provides four forms of operations for each action. For Insert: add(e) throws exception, offer(e) returns false, put(e) blocks, offer(e,t,u) times out. For Remove: remove() throws exception, poll() returns null, take() blocks, poll(t,u) times out. For Examine: element() throws exception, peek() returns null, no blocking or timeout versions exist.',
          codeExample: `public interface BlockingQueue<E> extends Queue<E> {

    // Blocking operations (most common for producer-consumer)
    void put(E e) throws InterruptedException;
    E take() throws InterruptedException;

    // Timed operations (graceful degradation)
    boolean offer(E e, long timeout, TimeUnit unit)
        throws InterruptedException;
    E poll(long timeout, TimeUnit unit)
        throws InterruptedException;

    // Non-blocking operations (inherited from Queue)
    boolean offer(E e);  // Returns false if full
    E poll();            // Returns null if empty

    // Throws exception if fails
    boolean add(E e);    // Throws IllegalStateException if full
    E remove();          // Throws NoSuchElementException if empty

    // Query operations
    int remainingCapacity();
    boolean contains(Object o);
    int drainTo(Collection<? super E> c);
}`
        },
        {
          name: 'Choosing the Right Method',
          explanation: 'Use put/take for typical producer-consumer patterns where you want threads to wait. Use offer/poll with timeout for scenarios requiring graceful degradation - if operation cannot complete in time, handle it gracefully. Use add/remove when you want exceptions on failure (rare in producer-consumer). Use offer/poll without timeout for non-blocking attempts.',
          codeExample: `// Producer-Consumer: Use put/take
BlockingQueue<Task> queue = new ArrayBlockingQueue<>(100);

// Producer - blocks if queue full
queue.put(task);

// Consumer - blocks if queue empty
Task t = queue.take();

// Graceful degradation: Use timed offer/poll
boolean added = queue.offer(task, 5, TimeUnit.SECONDS);
if (!added) {
    // Handle timeout - log, retry, reject, etc.
    logger.warn("Could not add task within timeout");
}

Task t = queue.poll(10, TimeUnit.SECONDS);
if (t == null) {
    // Handle timeout - maybe shutdown
    logger.info("No tasks available, shutting down");
    return;
}

// Non-blocking check: Use offer/poll
if (queue.offer(task)) {
    // Added successfully
} else {
    // Queue was full, handle immediately
    rejectTask(task);
}`
        },
        {
          name: 'Bulk Operations',
          explanation: 'BlockingQueue also provides bulk operations for efficiency. drainTo() removes all elements and adds them to a collection - useful for batch processing. remainingCapacity() returns available space. Note that bulk operations are NOT atomic across multiple elements.',
          codeExample: `BlockingQueue<Task> queue = new ArrayBlockingQueue<>(1000);

// Drain all available elements to a list (efficient batch processing)
List<Task> batch = new ArrayList<>();
int drained = queue.drainTo(batch);
System.out.println("Processing " + drained + " tasks");
batch.forEach(this::process);

// Drain up to maxElements
List<Task> limitedBatch = new ArrayList<>();
queue.drainTo(limitedBatch, 100);  // At most 100 elements

// Check remaining capacity
int space = queue.remainingCapacity();
if (space > 100) {
    // Enough space for batch insert
    tasks.forEach(queue::put);
}

// Contains check (O(n) - use sparingly)
if (queue.contains(urgentTask)) {
    // Task is still pending
}

// WARNING: Bulk operations are NOT atomic!
// Another thread could modify queue between elements`
        }
      ]
    },
    {
      id: 'arrayblockingqueue',
      name: 'ArrayBlockingQueue',
      icon: '\uD83D\uDCE6',
      color: '#22c55e',
      description: 'Bounded, array-backed blocking queue with single lock. Most commonly used implementation.',
      diagram: ArrayBlockingQueueDiagram,
      details: [
        {
          name: 'Characteristics',
          diagram: ArrayBlockingQueueDiagram,
          explanation: 'ArrayBlockingQueue is a bounded, array-backed blocking queue. Key characteristics: Fixed capacity set at construction time, FIFO ordering for elements, uses single ReentrantLock for both put and take operations, optional fairness policy (FIFO thread ordering), good for bounded producer-consumer scenarios. Internally it uses a circular array buffer with putIndex and takeIndex pointers, a count variable tracking elements, and Condition variables notEmpty and notFull.',
          codeExample: `// Creating ArrayBlockingQueue
BlockingQueue<Task> queue = new ArrayBlockingQueue<>(100);

// With fairness (FIFO thread ordering, slightly slower)
BlockingQueue<Task> fairQueue = new ArrayBlockingQueue<>(100, true);

// Pre-populate with initial elements
Collection<Task> initial = Arrays.asList(task1, task2, task3);
BlockingQueue<Task> preloaded = new ArrayBlockingQueue<>(100, false, initial);

// Internal structure (fields)
public class ArrayBlockingQueue<E> {
    final Object[] items;      // The array buffer
    int takeIndex;             // Next position to take
    int putIndex;              // Next position to put
    int count;                 // Number of elements

    final ReentrantLock lock;  // Single lock for all operations
    private final Condition notEmpty;  // Signals when not empty
    private final Condition notFull;   // Signals when not full
}`
        },
        {
          name: 'Put Implementation',
          explanation: 'The put() method acquires the lock interruptibly, then waits in a while loop while queue is full (handling spurious wakeups), enqueues the element using circular increment of putIndex, increments count, and signals notEmpty to wake one waiting consumer.',
          codeExample: `public void put(E e) throws InterruptedException {
    checkNotNull(e);
    final ReentrantLock lock = this.lock;
    lock.lockInterruptibly();  // Allow interruption while waiting for lock
    try {
        // While loop handles spurious wakeups
        while (count == items.length) {
            notFull.await();  // Wait until not full
        }
        enqueue(e);
    } finally {
        lock.unlock();
    }
}

private void enqueue(E e) {
    final Object[] items = this.items;
    items[putIndex] = e;

    // Circular increment
    if (++putIndex == items.length) {
        putIndex = 0;  // Wrap around to start
    }
    count++;

    notEmpty.signal();  // Wake up ONE waiting consumer
}`
        },
        {
          name: 'Take Implementation',
          explanation: 'The take() method mirrors put(): acquires lock interruptibly, waits while queue is empty, dequeues from head using circular increment of takeIndex, decrements count, nulls out the slot to help GC, and signals notFull to wake one waiting producer.',
          codeExample: `public E take() throws InterruptedException {
    final ReentrantLock lock = this.lock;
    lock.lockInterruptibly();
    try {
        // While loop handles spurious wakeups
        while (count == 0) {
            notEmpty.await();  // Wait until not empty
        }
        return dequeue();
    } finally {
        lock.unlock();
    }
}

private E dequeue() {
    final Object[] items = this.items;
    @SuppressWarnings("unchecked")
    E e = (E) items[takeIndex];
    items[takeIndex] = null;  // Help GC

    // Circular increment
    if (++takeIndex == items.length) {
        takeIndex = 0;  // Wrap around to start
    }
    count--;

    notFull.signal();  // Wake up ONE waiting producer
    return e;
}`
        }
      ]
    },
    {
      id: 'linkedblockingqueue',
      name: 'LinkedBlockingQueue',
      icon: '\uD83D\uDD17',
      color: '#8b5cf6',
      description: 'Linked-node based queue with two separate locks for higher throughput under contention.',
      diagram: LinkedBlockingQueueDiagram,
      details: [
        {
          name: 'Two-Lock Design',
          diagram: LinkedBlockingQueueDiagram,
          explanation: 'LinkedBlockingQueue uses TWO separate locks - putLock for producers and takeLock for consumers. This allows producers and consumers to work simultaneously without blocking each other. Key characteristics: Optionally bounded (Integer.MAX_VALUE by default), FIFO ordering, higher throughput than ArrayBlockingQueue under contention, slightly higher memory overhead per element due to node objects, uses AtomicInteger for count to allow lock-free size checking.',
          codeExample: `// Unbounded (capacity = Integer.MAX_VALUE)
BlockingQueue<Task> unbounded = new LinkedBlockingQueue<>();

// Bounded
BlockingQueue<Task> bounded = new LinkedBlockingQueue<>(1000);

// Internal structure
public class LinkedBlockingQueue<E> {
    private final int capacity;
    private final AtomicInteger count = new AtomicInteger();

    static class Node<E> {
        E item;
        Node<E> next;
        Node(E x) { item = x; }
    }

    transient Node<E> head;        // Dummy head node
    private transient Node<E> last; // Tail node

    // TWO separate locks!
    private final ReentrantLock takeLock = new ReentrantLock();
    private final Condition notEmpty = takeLock.newCondition();

    private final ReentrantLock putLock = new ReentrantLock();
    private final Condition notFull = putLock.newCondition();
}`
        },
        {
          name: 'Put Implementation',
          explanation: 'Put acquires only the putLock, adds node at tail, uses AtomicInteger for count (avoiding need to hold both locks). If queue was empty before put, it signals notEmpty under takeLock. Uses cascade signaling - if more space available, signals other waiting producers.',
          codeExample: `public void put(E e) throws InterruptedException {
    if (e == null) throw new NullPointerException();
    int c = -1;
    Node<E> node = new Node<E>(e);
    final ReentrantLock putLock = this.putLock;
    final AtomicInteger count = this.count;

    putLock.lockInterruptibly();  // Only acquire PUT lock
    try {
        while (count.get() == capacity) {
            notFull.await();
        }
        enqueue(node);  // Add at tail
        c = count.getAndIncrement();

        // Cascade: if more space, wake another producer
        if (c + 1 < capacity) {
            notFull.signal();
        }
    } finally {
        putLock.unlock();
    }

    // If queue was empty, wake consumer
    // Must acquire takeLock to signal notEmpty
    if (c == 0) {
        signalNotEmpty();
    }
}

private void signalNotEmpty() {
    final ReentrantLock takeLock = this.takeLock;
    takeLock.lock();
    try {
        notEmpty.signal();
    } finally {
        takeLock.unlock();
    }
}`
        },
        {
          name: 'When to Choose',
          explanation: 'Use LinkedBlockingQueue when producers and consumers operate at similar speeds (two locks benefit from parallelism), when you need optional unbounded capacity, when throughput matters more than memory. Use ArrayBlockingQueue when you need strict bounded capacity guarantee, when memory per element matters, or when the simpler single-lock design is sufficient.',
          codeExample: `// Choose LinkedBlockingQueue for high throughput
// Two locks = producers and consumers don't block each other
BlockingQueue<Task> highThroughput = new LinkedBlockingQueue<>(10000);

// Throughput comparison (conceptual)
// ArrayBlockingQueue: put() blocks take(), take() blocks put()
// LinkedBlockingQueue: put() and take() can run simultaneously!

// Use ArrayBlockingQueue for strict bounds
// Memory: Array allocates all slots upfront
// Linked: Only allocates nodes as needed, but each node has overhead

// Thread pool example - uses LinkedBlockingQueue by default
ExecutorService fixed = Executors.newFixedThreadPool(10);
// Internally: new LinkedBlockingQueue<Runnable>()

// CachedThreadPool uses SynchronousQueue for direct handoff
ExecutorService cached = Executors.newCachedThreadPool();
// Internally: new SynchronousQueue<Runnable>()

// Performance tip: Profile your actual workload!
// The "better" choice depends on:
// - Number of producers vs consumers
// - Put/take ratio
// - Contention level`
        }
      ]
    },
    {
      id: 'other-implementations',
      name: 'Specialized Implementations',
      icon: '\uD83C\uDFAF',
      color: '#f59e0b',
      description: 'PriorityBlockingQueue, DelayQueue, SynchronousQueue, and LinkedTransferQueue for specific use cases.',
      diagram: ImplementationComparisonDiagram,
      details: [
        {
          name: 'PriorityBlockingQueue',
          diagram: ImplementationComparisonDiagram,
          explanation: 'PriorityBlockingQueue is an unbounded queue with priority ordering. Elements must be Comparable or provide a Comparator. take() always returns the highest priority element. Note: put() never blocks (unbounded), but take() blocks if empty. Useful for task scheduling where some tasks are more urgent.',
          codeExample: `// Elements must be Comparable
class PriorityTask implements Comparable<PriorityTask> {
    int priority;  // Lower = higher priority
    String name;

    public int compareTo(PriorityTask other) {
        return Integer.compare(this.priority, other.priority);
    }
}

BlockingQueue<PriorityTask> priorityQueue = new PriorityBlockingQueue<>();
priorityQueue.put(new PriorityTask(3, "Low priority"));
priorityQueue.put(new PriorityTask(1, "High priority"));
priorityQueue.put(new PriorityTask(2, "Medium priority"));

// take() returns in priority order
PriorityTask t1 = priorityQueue.take();  // "High priority" (1)
PriorityTask t2 = priorityQueue.take();  // "Medium priority" (2)
PriorityTask t3 = priorityQueue.take();  // "Low priority" (3)

// With custom Comparator
BlockingQueue<Task> queue = new PriorityBlockingQueue<>(11,
    Comparator.comparing(Task::getDeadline));`
        },
        {
          name: 'DelayQueue',
          explanation: 'DelayQueue holds elements that implement Delayed interface. Elements can only be taken when their delay has expired. Perfect for scheduled tasks, cache expiration, retry with backoff. The queue is unbounded and ordered by delay time.',
          codeExample: `class DelayedTask implements Delayed {
    private final long executeTime;
    private final String name;

    public DelayedTask(String name, long delayMs) {
        this.name = name;
        this.executeTime = System.currentTimeMillis() + delayMs;
    }

    @Override
    public long getDelay(TimeUnit unit) {
        long diff = executeTime - System.currentTimeMillis();
        return unit.convert(diff, TimeUnit.MILLISECONDS);
    }

    @Override
    public int compareTo(Delayed o) {
        return Long.compare(this.executeTime,
            ((DelayedTask) o).executeTime);
    }
}

DelayQueue<DelayedTask> delayQueue = new DelayQueue<>();

// Schedule tasks with different delays
delayQueue.put(new DelayedTask("Task1", 5000));  // 5 sec
delayQueue.put(new DelayedTask("Task2", 1000));  // 1 sec
delayQueue.put(new DelayedTask("Task3", 3000));  // 3 sec

// Take blocks until delay expires
// Returns in order: Task2 (after 1s), Task3 (after 3s), Task1 (after 5s)
while (!delayQueue.isEmpty()) {
    DelayedTask task = delayQueue.take();
    System.out.println("Executing: " + task.name);
}`
        },
        {
          name: 'SynchronousQueue',
          explanation: 'SynchronousQueue has zero capacity - it is a direct handoff between threads. put() blocks until another thread calls take(). No storage, no buffering. Used in Executors.newCachedThreadPool() for immediate task handoff. Optional fairness for FIFO ordering.',
          codeExample: `// Zero capacity - direct handoff
BlockingQueue<Task> syncQueue = new SynchronousQueue<>();

// Producer thread - blocks until consumer takes
new Thread(() -> {
    try {
        System.out.println("Putting task...");
        syncQueue.put(new Task("Work"));  // BLOCKS here
        System.out.println("Task was taken!");
    } catch (InterruptedException e) {}
}).start();

// Consumer thread - blocks until producer puts
new Thread(() -> {
    try {
        Thread.sleep(2000);  // Simulate delay
        System.out.println("Taking task...");
        Task t = syncQueue.take();  // Unblocks producer
        System.out.println("Got: " + t);
    } catch (InterruptedException e) {}
}).start();

// CachedThreadPool uses SynchronousQueue
// When task submitted:
// 1. Try to hand off to idle worker
// 2. If no idle worker, create new thread
ExecutorService cached = Executors.newCachedThreadPool();
// Equivalent to:
new ThreadPoolExecutor(0, Integer.MAX_VALUE,
    60L, TimeUnit.SECONDS,
    new SynchronousQueue<Runnable>());`
        },
        {
          name: 'LinkedTransferQueue',
          explanation: 'LinkedTransferQueue (Java 7+) combines features of SynchronousQueue and LinkedBlockingQueue. transfer() blocks until element is consumed (like SynchronousQueue), while put() returns immediately (like LinkedBlockingQueue). Unbounded capacity. Useful when you sometimes need guaranteed handoff.',
          codeExample: `LinkedTransferQueue<Task> transferQueue = new LinkedTransferQueue<>();

// put() - returns immediately (buffered)
transferQueue.put(new Task("Buffered"));

// transfer() - blocks until consumed (direct handoff)
new Thread(() -> {
    try {
        System.out.println("Transferring...");
        transferQueue.transfer(new Task("Direct"));  // BLOCKS
        System.out.println("Transfer complete!");
    } catch (InterruptedException e) {}
}).start();

// tryTransfer() - non-blocking attempt at handoff
boolean transferred = transferQueue.tryTransfer(new Task("Try"));
if (!transferred) {
    // No waiting consumer, element not added
}

// tryTransfer with timeout
boolean done = transferQueue.tryTransfer(
    new Task("Timed"),
    5, TimeUnit.SECONDS);

// hasWaitingConsumer() - check if consumers waiting
if (transferQueue.hasWaitingConsumer()) {
    transferQueue.transfer(urgentTask);  // Won't block
}`
        }
      ]
    },
    {
      id: 'producer-consumer',
      name: 'Producer-Consumer Pattern',
      icon: '\uD83D\uDD04',
      color: '#ec4899',
      description: 'Classic concurrency pattern with BlockingQueue. Includes poison pill shutdown and multiple workers.',
      diagram: ProducerConsumerDiagram,
      details: [
        {
          name: 'Basic Pattern',
          diagram: ProducerConsumerDiagram,
          explanation: 'The Producer-Consumer pattern decouples data production from consumption. Benefits: Producers and consumers work at different speeds, queue acts as buffer, automatic backpressure with bounded queues, clean shutdown with poison pills or interrupts. Best practices: Use bounded queues, handle InterruptedException properly, consider multiple consumers for parallelism.',
          codeExample: `public class ProducerConsumerExample {
    private static final int CAPACITY = 100;

    public static void main(String[] args) throws InterruptedException {
        BlockingQueue<Task> queue = new ArrayBlockingQueue<>(CAPACITY);

        // Start producers
        Thread producer1 = new Thread(new Producer(queue, "P1"));
        Thread producer2 = new Thread(new Producer(queue, "P2"));

        // Start consumers
        Thread consumer1 = new Thread(new Consumer(queue, "C1"));
        Thread consumer2 = new Thread(new Consumer(queue, "C2"));

        producer1.start();
        producer2.start();
        consumer1.start();
        consumer2.start();

        // Wait for completion...
    }
}

class Producer implements Runnable {
    private final BlockingQueue<Task> queue;
    private final String name;

    public void run() {
        try {
            for (int i = 0; i < 100; i++) {
                Task task = new Task(name + "-Task-" + i);
                queue.put(task);  // Blocks if full
                System.out.println(name + " produced: " + task);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}`
        },
        {
          name: 'Poison Pill Shutdown',
          explanation: 'The poison pill pattern provides graceful shutdown. Producer puts a special sentinel object, consumers check for it and exit. Important: Need one poison pill per consumer. Alternative: Use interrupt() but requires careful handling throughout the code.',
          codeExample: `public class GracefulShutdown {
    private static final Task POISON_PILL = new Task("STOP");

    public static void main(String[] args) throws InterruptedException {
        BlockingQueue<Task> queue = new ArrayBlockingQueue<>(100);
        int numConsumers = 3;

        // Start consumers
        List<Thread> consumers = new ArrayList<>();
        for (int i = 0; i < numConsumers; i++) {
            Thread c = new Thread(new Consumer(queue, "C" + i));
            consumers.add(c);
            c.start();
        }

        // Start producer
        Thread producer = new Thread(new Producer(queue));
        producer.start();
        producer.join();  // Wait for producer to finish

        // Send poison pills - ONE PER CONSUMER
        for (int i = 0; i < numConsumers; i++) {
            queue.put(POISON_PILL);
        }

        // Wait for all consumers to finish
        for (Thread c : consumers) {
            c.join();
        }
    }
}

class Consumer implements Runnable {
    private final BlockingQueue<Task> queue;

    public void run() {
        try {
            while (true) {
                Task task = queue.take();
                if (task == POISON_PILL) {
                    System.out.println("Received poison pill, stopping");
                    break;  // Exit gracefully
                }
                process(task);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}`
        },
        {
          name: 'Multiple Workers',
          explanation: 'Scale consumers horizontally for parallelism. All workers take from the same queue. Work is automatically distributed. Consider: Number of workers based on CPU cores or I/O bound nature, batch processing with drainTo() for efficiency, monitoring queue size for backpressure.',
          codeExample: `public class WorkerPool {
    public static void main(String[] args) {
        BlockingQueue<Task> queue = new ArrayBlockingQueue<>(1000);
        int numWorkers = Runtime.getRuntime().availableProcessors();

        // Start worker threads
        ExecutorService workers = Executors.newFixedThreadPool(numWorkers);
        for (int i = 0; i < numWorkers; i++) {
            workers.submit(new Worker(queue));
        }

        // Submit tasks
        for (Task task : tasks) {
            queue.put(task);
        }
    }
}

class Worker implements Runnable {
    private final BlockingQueue<Task> queue;

    public void run() {
        while (!Thread.interrupted()) {
            try {
                // Batch processing for efficiency
                List<Task> batch = new ArrayList<>();
                Task first = queue.take();  // Block for at least one
                batch.add(first);
                queue.drainTo(batch, 99);   // Drain up to 99 more

                // Process batch
                for (Task task : batch) {
                    process(task);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                break;
            }
        }
    }
}

// Monitor queue health
ScheduledExecutorService monitor = Executors.newScheduledThreadPool(1);
monitor.scheduleAtFixedRate(() -> {
    int size = queue.size();
    if (size > 800) {
        logger.warn("Queue backlog: " + size);
    }
}, 0, 1, TimeUnit.SECONDS);`
        }
      ]
    },
    {
      id: 'custom-implementation',
      name: 'Custom Implementation',
      icon: '\uD83D\uDD27',
      color: '#06b6d4',
      description: 'Build your own BlockingQueue from scratch - common interview question demonstrating concurrency knowledge.',
      diagram: CustomImplementationDiagram,
      details: [
        {
          name: 'Core Structure',
          diagram: CustomImplementationDiagram,
          explanation: 'A custom BlockingQueue needs: ReentrantLock for mutual exclusion, two Condition variables (notEmpty and notFull), circular array buffer with head/tail pointers, count to track elements. Key concepts: lockInterruptibly() allows interruption while waiting for lock, while loop (not if) for spurious wakeups, signal() after state change.',
          codeExample: `public class CustomBlockingQueue<E> {
    private final Object[] items;
    private int head = 0;      // Index for next take
    private int tail = 0;      // Index for next put
    private int count = 0;     // Number of elements

    private final ReentrantLock lock = new ReentrantLock();
    private final Condition notEmpty = lock.newCondition();
    private final Condition notFull = lock.newCondition();

    public CustomBlockingQueue(int capacity) {
        if (capacity <= 0) throw new IllegalArgumentException();
        this.items = new Object[capacity];
    }

    public int size() {
        lock.lock();
        try {
            return count;
        } finally {
            lock.unlock();
        }
    }

    public int remainingCapacity() {
        lock.lock();
        try {
            return items.length - count;
        } finally {
            lock.unlock();
        }
    }
}`
        },
        {
          name: 'Put and Take',
          explanation: 'put() acquires lock interruptibly, waits while full using while loop, adds at tail with circular increment, signals notEmpty. take() mirrors this: waits while empty, removes from head, signals notFull. Always use while loop for await() to handle spurious wakeups correctly.',
          codeExample: `public void put(E item) throws InterruptedException {
    if (item == null) throw new NullPointerException();

    lock.lockInterruptibly();  // Can be interrupted
    try {
        // WHILE loop - handles spurious wakeups!
        while (count == items.length) {
            notFull.await();  // Release lock and wait
        }

        // Add item at tail
        items[tail] = item;
        tail = (tail + 1) % items.length;  // Circular
        count++;

        notEmpty.signal();  // Wake ONE waiting consumer
    } finally {
        lock.unlock();
    }
}

@SuppressWarnings("unchecked")
public E take() throws InterruptedException {
    lock.lockInterruptibly();
    try {
        // WHILE loop - handles spurious wakeups!
        while (count == 0) {
            notEmpty.await();
        }

        // Remove item from head
        E item = (E) items[head];
        items[head] = null;  // Help GC
        head = (head + 1) % items.length;  // Circular
        count--;

        notFull.signal();  // Wake ONE waiting producer

        return item;
    } finally {
        lock.unlock();
    }
}`
        },
        {
          name: 'Timed Operations',
          explanation: 'offer(e, timeout, unit) and poll(timeout, unit) use awaitNanos() for timed waiting. Returns remaining nanos, so loop continues with reduced timeout. Return false/null if timeout expires before operation succeeds.',
          codeExample: `public boolean offer(E item, long timeout, TimeUnit unit)
        throws InterruptedException {
    if (item == null) throw new NullPointerException();
    long nanos = unit.toNanos(timeout);

    lock.lockInterruptibly();
    try {
        while (count == items.length) {
            if (nanos <= 0) return false;  // Timeout!
            nanos = notFull.awaitNanos(nanos);  // Timed wait
        }
        items[tail] = item;
        tail = (tail + 1) % items.length;
        count++;
        notEmpty.signal();
        return true;
    } finally {
        lock.unlock();
    }
}

@SuppressWarnings("unchecked")
public E poll(long timeout, TimeUnit unit)
        throws InterruptedException {
    long nanos = unit.toNanos(timeout);

    lock.lockInterruptibly();
    try {
        while (count == 0) {
            if (nanos <= 0) return null;  // Timeout!
            nanos = notEmpty.awaitNanos(nanos);
        }
        E item = (E) items[head];
        items[head] = null;
        head = (head + 1) % items.length;
        count--;
        notFull.signal();
        return item;
    } finally {
        lock.unlock();
    }
}`
        }
      ]
    },
    {
      id: 'interview-questions',
      name: 'Interview Questions',
      icon: '\u2753',
      color: '#ef4444',
      description: 'Common BlockingQueue interview questions with answers. Rate limiter, ThreadPoolExecutor internals, and more.',
      diagram: InterviewConceptsDiagram,
      details: [
        {
          name: 'Conceptual Questions',
          diagram: InterviewConceptsDiagram,
          explanation: 'Q1: Difference between put() and offer()? A: put() blocks indefinitely if full; offer() returns false immediately. Q2: Why use while loop instead of if for await()? A: To handle spurious wakeups - thread may wake without signal. Q3: ArrayBlockingQueue vs LinkedBlockingQueue? A: Array uses single lock, Linked uses two locks (better concurrency). Array has fixed capacity, Linked can be unbounded. Q4: How does ExecutorService use BlockingQueue? A: ThreadPoolExecutor uses it to hold pending tasks. Workers take() tasks from queue.',
          codeExample: `// Q: What happens if you use 'if' instead of 'while'?
// WRONG - vulnerable to spurious wakeups
if (count == 0) {
    notEmpty.await();  // May wake up spuriously!
}
// Thread continues even if queue is still empty!

// CORRECT - always re-check condition
while (count == 0) {
    notEmpty.await();
}
// Only proceeds when condition is actually satisfied

// Q: Why does LinkedBlockingQueue have better throughput?
// Two separate locks allow concurrent put() and take()
class LinkedBlockingQueue {
    ReentrantLock putLock;   // For producers
    ReentrantLock takeLock;  // For consumers
    // Producers don't block consumers!
}

class ArrayBlockingQueue {
    ReentrantLock lock;  // Single lock
    // put() blocks take(), take() blocks put()
}`
        },
        {
          name: 'Rate Limiter Implementation',
          explanation: 'Common interview question: Implement a rate limiter using BlockingQueue. Tokens represent permits, blocking queue provides natural rate limiting. Refill tokens periodically with ScheduledExecutorService.',
          codeExample: `// Implement rate limiter with BlockingQueue
class RateLimiter {
    private final BlockingQueue<Long> tokens;
    private final ScheduledExecutorService scheduler;

    public RateLimiter(int permitsPerSecond) {
        tokens = new ArrayBlockingQueue<>(permitsPerSecond);

        // Fill with initial tokens
        for (int i = 0; i < permitsPerSecond; i++) {
            tokens.offer(System.currentTimeMillis());
        }

        // Refill tokens periodically
        scheduler = Executors.newScheduledThreadPool(1);
        long intervalMs = 1000 / permitsPerSecond;
        scheduler.scheduleAtFixedRate(() -> {
            tokens.offer(System.currentTimeMillis());
        }, intervalMs, intervalMs, TimeUnit.MILLISECONDS);
    }

    public void acquire() throws InterruptedException {
        tokens.take();  // Blocks if no tokens available
    }

    public boolean tryAcquire(long timeout, TimeUnit unit)
            throws InterruptedException {
        return tokens.poll(timeout, unit) != null;
    }

    public void shutdown() {
        scheduler.shutdown();
    }
}

// Usage
RateLimiter limiter = new RateLimiter(10);  // 10 requests/sec
for (Request request : requests) {
    limiter.acquire();  // Blocks if rate exceeded
    process(request);
}`
        },
        {
          name: 'ThreadPoolExecutor Internals',
          explanation: 'Understanding how ThreadPoolExecutor uses BlockingQueue internally is a common interview topic. Worker threads run a loop calling take() on the work queue. Different queue types affect behavior: LinkedBlockingQueue for fixed pools, SynchronousQueue for cached pools.',
          codeExample: `// Simplified ThreadPoolExecutor internals
class SimpleThreadPool {
    private final BlockingQueue<Runnable> workQueue;
    private final List<Worker> workers = new ArrayList<>();
    private volatile boolean shutdown = false;

    public SimpleThreadPool(int nThreads, BlockingQueue<Runnable> queue) {
        this.workQueue = queue;
        for (int i = 0; i < nThreads; i++) {
            Worker w = new Worker();
            workers.add(w);
            new Thread(w).start();
        }
    }

    public void execute(Runnable task) {
        if (shutdown) throw new RejectedExecutionException();
        workQueue.offer(task);  // Add to queue
    }

    class Worker implements Runnable {
        public void run() {
            while (!shutdown || !workQueue.isEmpty()) {
                try {
                    // Block waiting for task
                    Runnable task = workQueue.poll(1, TimeUnit.SECONDS);
                    if (task != null) {
                        task.run();
                    }
                } catch (InterruptedException e) {
                    break;
                }
            }
        }
    }
}

// Different pools use different queues:
// FixedThreadPool: LinkedBlockingQueue (unbounded)
// CachedThreadPool: SynchronousQueue (direct handoff)
// SingleThreadExecutor: LinkedBlockingQueue`
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
      { name: 'My Projects', icon: '\uD83D\uDCBC', page: 'My Projects' },
      { name: 'BlockingQueue', icon: '\uD83D\uDD12', page: 'BlockingQueue' }
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
      } else if (e.key === 'b' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const tag = e.target.tagName.toLowerCase()
        if (tag !== 'input' && tag !== 'textarea' && !e.target.isContentEditable) {
          e.preventDefault()
          if (selectedConcept) {
            setSelectedConceptIndex(null)
          } else {
            onBack()
          }
        }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #422006 50%, #0f172a 100%)',
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
      {/* Header with title and back button */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>BlockingQueue Deep Dive</h1>
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
          \u2190 Back to Projects
        </button>
      </div>

      {/* Breadcrumb navigation */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          colors={BLOCKING_QUEUE_COLORS}
        />
      </div>

      {/* Quick Facts */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto 2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1rem'
      }}>
        {[
          { label: 'Thread Safe', value: 'Yes', color: '#22c55e' },
          { label: 'Blocking Ops', value: 'put/take', color: '#3b82f6' },
          { label: 'Main Use', value: 'Producer-Consumer', color: '#f59e0b' },
          { label: 'Package', value: 'j.u.concurrent', color: '#8b5cf6' }
        ].map((fact, i) => (
          <div
            key={i}
            style={{
              background: 'rgba(15, 23, 42, 0.8)',
              borderRadius: '0.75rem',
              padding: '1rem',
              textAlign: 'center',
              border: `1px solid ${fact.color}40`
            }}
          >
            <div style={{ color: fact.color, fontSize: '1.1rem', fontWeight: '600' }}>{fact.value}</div>
            <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{fact.label}</div>
          </div>
        ))}
      </div>

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
              {concept.details.length} topics \u2022 Click to explore
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
              maxWidth: '1200px',
              width: '100%',
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
              colors={BLOCKING_QUEUE_COLORS}
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
                >\u2190</button>
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
                >\u2192</button>
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
                >\u2715</button>
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

export default BlockingQueue
