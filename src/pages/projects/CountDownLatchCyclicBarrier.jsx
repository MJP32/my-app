/**
 * CountDownLatch & CyclicBarrier - Thread Synchronization
 *
 * Comprehensive guide to Java's synchronization utilities including
 * CountDownLatch, CyclicBarrier, and Phaser with internal implementations.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

/**
 * Cyan theme colors for CountDownLatch & CyclicBarrier topic
 */
const COUNTDOWN_COLORS = {
  primary: '#06b6d4',           // Cyan main color
  primaryHover: '#22d3ee',      // Cyan hover
  bg: 'rgba(6, 182, 212, 0.1)', // Cyan background
  border: 'rgba(6, 182, 212, 0.3)', // Cyan border
  arrow: '#06b6d4',             // Cyan arrow
  hoverBg: 'rgba(6, 182, 212, 0.2)', // Cyan hover background
  topicBg: 'rgba(6, 182, 212, 0.2)'  // Cyan topic card background
}

/**
 * Alternating colors for subtopic detail explanations
 */
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

/**
 * CountDownLatch Concept Diagram - Shows one-time gate mechanism
 */
const CountDownLatchDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead-cdl" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#06b6d4" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      CountDownLatch Flow - One-Shot Synchronization
    </text>

    {/* Initial state */}
    <rect x="50" y="60" width="140" height="60" rx="8" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="120" y="85" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">CountDownLatch</text>
    <text x="120" y="105" textAnchor="middle" fill="#ef4444" fontSize="10">count = 3</text>

    {/* CountDown calls */}
    <rect x="260" y="50" width="100" height="30" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="310" y="70" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">countDown()</text>

    <rect x="260" y="95" width="100" height="30" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="310" y="115" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">countDown()</text>

    <rect x="260" y="140" width="100" height="30" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="310" y="160" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">countDown()</text>

    {/* Arrows to zero state */}
    <line x1="190" y1="65" x2="255" y2="65" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowhead-cdl)"/>
    <line x1="190" y1="90" x2="240" y2="100" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowhead-cdl)"/>
    <line x1="190" y1="110" x2="240" y2="155" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowhead-cdl)"/>

    {/* Count = 0 state */}
    <rect x="430" y="80" width="140" height="60" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="500" y="105" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">Count Reached 0</text>
    <text x="500" y="125" textAnchor="middle" fill="#22c55e" fontSize="10">Gate Opens!</text>

    <line x1="360" y1="65" x2="425" y2="100" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowhead-cdl)"/>
    <line x1="360" y1="110" x2="425" y2="110" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowhead-cdl)"/>
    <line x1="360" y1="155" x2="425" y2="120" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowhead-cdl)"/>

    {/* Waiting threads */}
    <text x="400" y="190" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">Waiting Threads</text>

    <rect x="250" y="210" width="80" height="40" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="290" y="233" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="bold">Thread 1</text>

    <rect x="360" y="210" width="80" height="40" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="400" y="233" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="bold">Thread 2</text>

    <rect x="470" y="210" width="80" height="40" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="510" y="233" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="bold">Thread 3</text>

    {/* Released threads */}
    <rect x="650" y="80" width="100" height="60" rx="8" fill="rgba(6, 182, 212, 0.2)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="700" y="105" textAnchor="middle" fill="#06b6d4" fontSize="11" fontWeight="bold">All Released</text>
    <text x="700" y="125" textAnchor="middle" fill="#06b6d4" fontSize="10">Continue!</text>

    <line x1="570" y1="110" x2="645" y2="110" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowhead-cdl)"/>
    <line x1="500" y1="140" x2="700" y2="140" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowhead-cdl)"/>
  </svg>
)

/**
 * CyclicBarrier Concept Diagram - Shows reusable sync point
 */
const CyclicBarrierDiagram = () => (
  <svg viewBox="0 0 800 320" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead-cb" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#06b6d4" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      CyclicBarrier Flow - Reusable Synchronization Point
    </text>

    {/* Phase 1 */}
    <text x="120" y="60" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">Phase 1</text>

    <rect x="60" y="75" width="120" height="45" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="120" y="95" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="bold">Thread 1</text>
    <text x="120" y="110" textAnchor="middle" fill="#3b82f6" fontSize="9">await()</text>

    <rect x="60" y="135" width="120" height="45" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="120" y="155" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="bold">Thread 2</text>
    <text x="120" y="170" textAnchor="middle" fill="#3b82f6" fontSize="9">await()</text>

    <rect x="60" y="195" width="120" height="45" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="120" y="215" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="bold">Thread 3</text>
    <text x="120" y="230" textAnchor="middle" fill="#3b82f6" fontSize="9">await()</text>

    {/* Barrier */}
    <rect x="250" y="75" width="120" height="165" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="310" y="105" textAnchor="middle" fill="#8b5cf6" fontSize="11" fontWeight="bold">CyclicBarrier</text>
    <text x="310" y="125" textAnchor="middle" fill="#8b5cf6" fontSize="10">parties = 3</text>
    <text x="310" y="145" textAnchor="middle" fill="#94a3b8" fontSize="9">Wait for all</text>
    <text x="310" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9">to arrive...</text>
    <text x="310" y="200" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">All arrived!</text>
    <text x="310" y="220" textAnchor="middle" fill="#22c55e" fontSize="9">Run barrier action</text>

    <line x1="180" y1="97" x2="245" y2="120" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowhead-cb)"/>
    <line x1="180" y1="157" x2="245" y2="157" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowhead-cb)"/>
    <line x1="180" y1="217" x2="245" y2="194" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowhead-cb)"/>

    {/* Released threads */}
    <rect x="440" y="75" width="120" height="45" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="500" y="95" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">Thread 1</text>
    <text x="500" y="110" textAnchor="middle" fill="#22c55e" fontSize="9">Released!</text>

    <rect x="440" y="135" width="120" height="45" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="500" y="155" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">Thread 2</text>
    <text x="500" y="170" textAnchor="middle" fill="#22c55e" fontSize="9">Released!</text>

    <rect x="440" y="195" width="120" height="45" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="500" y="215" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">Thread 3</text>
    <text x="500" y="230" textAnchor="middle" fill="#22c55e" fontSize="9">Released!</text>

    <line x1="370" y1="120" x2="435" y2="97" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowhead-cb)"/>
    <line x1="370" y1="157" x2="435" y2="157" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowhead-cb)"/>
    <line x1="370" y1="194" x2="435" y2="217" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowhead-cb)"/>

    {/* Reset arrow */}
    <text x="310" y="270" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">Automatic Reset</text>
    <path d="M 560 230 Q 700 200, 700 140 Q 700 80, 560 50 Q 450 20, 310 50"
          fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowhead-cb)"/>
    <text x="650" y="120" textAnchor="middle" fill="#f59e0b" fontSize="9">Reusable!</text>
    <text x="650" y="135" textAnchor="middle" fill="#f59e0b" fontSize="9">Ready for Phase 2</text>
  </svg>
)

/**
 * Comparison Diagram - CountDownLatch vs CyclicBarrier
 */
const ComparisonDiagram = () => (
  <svg viewBox="0 0 800 250" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      CountDownLatch vs CyclicBarrier
    </text>

    {/* CountDownLatch side */}
    <text x="200" y="60" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">CountDownLatch</text>

    <rect x="100" y="75" width="200" height="140" rx="8" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="2"/>
    <text x="200" y="95" textAnchor="middle" fill="#94a3b8" fontSize="10">• One-shot (no reset)</text>
    <text x="200" y="115" textAnchor="middle" fill="#94a3b8" fontSize="10">• Any thread can count</text>
    <text x="200" y="135" textAnchor="middle" fill="#94a3b8" fontSize="10">• Waiters ≠ Counters</text>
    <text x="200" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">• Uses AQS</text>
    <text x="200" y="175" textAnchor="middle" fill="#94a3b8" fontSize="10">• Event-based</text>
    <text x="200" y="195" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="bold">Good for: N events</text>

    {/* CyclicBarrier side */}
    <text x="600" y="60" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">CyclicBarrier</text>

    <rect x="500" y="75" width="200" height="140" rx="8" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2"/>
    <text x="600" y="95" textAnchor="middle" fill="#94a3b8" fontSize="10">• Reusable (auto reset)</text>
    <text x="600" y="115" textAnchor="middle" fill="#94a3b8" fontSize="10">• Waiter = Counter</text>
    <text x="600" y="135" textAnchor="middle" fill="#94a3b8" fontSize="10">• All must participate</text>
    <text x="600" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">• Lock + Condition</text>
    <text x="600" y="175" textAnchor="middle" fill="#94a3b8" fontSize="10">• Thread-based</text>
    <text x="600" y="195" textAnchor="middle" fill="#22c55e" fontSize="9" fontWeight="bold">Good for: N threads sync</text>

    {/* VS */}
    <circle cx="400" cy="145" r="30" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="400" y="155" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="bold">VS</text>
  </svg>
)

/**
 * Phaser Architecture Diagram
 */
const PhaserDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead-phaser" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#06b6d4" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Phaser - Multi-Phase Synchronization
    </text>

    {/* Phase 0 */}
    <rect x="50" y="60" width="150" height="180" rx="8" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="125" y="80" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">Phase 0</text>
    <rect x="70" y="90" width="110" height="30" rx="4" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="125" y="110" textAnchor="middle" fill="#94a3b8" fontSize="9">Thread 1 work</text>
    <rect x="70" y="130" width="110" height="30" rx="4" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="125" y="150" textAnchor="middle" fill="#94a3b8" fontSize="9">Thread 2 work</text>
    <rect x="70" y="170" width="110" height="30" rx="4" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="125" y="190" textAnchor="middle" fill="#94a3b8" fontSize="9">Thread 3 work</text>
    <text x="125" y="225" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="bold">arriveAndAwaitAdvance()</text>

    {/* Phase 1 */}
    <rect x="250" y="60" width="150" height="180" rx="8" fill="rgba(34, 197, 94, 0.15)" stroke="#22c55e" strokeWidth="2"/>
    <text x="325" y="80" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">Phase 1</text>
    <rect x="270" y="90" width="110" height="30" rx="4" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="1"/>
    <text x="325" y="110" textAnchor="middle" fill="#94a3b8" fontSize="9">Thread 1 work</text>
    <rect x="270" y="130" width="110" height="30" rx="4" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="1"/>
    <text x="325" y="150" textAnchor="middle" fill="#94a3b8" fontSize="9">Thread 2 work</text>
    <rect x="270" y="170" width="110" height="30" rx="4" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="1"/>
    <text x="325" y="190" textAnchor="middle" fill="#94a3b8" fontSize="9">Thread 3 work</text>
    <text x="325" y="225" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">arriveAndAwaitAdvance()</text>

    {/* Phase 2 */}
    <rect x="450" y="60" width="150" height="180" rx="8" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="525" y="80" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">Phase 2</text>
    <rect x="470" y="90" width="110" height="30" rx="4" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="525" y="110" textAnchor="middle" fill="#94a3b8" fontSize="9">Thread 1 work</text>
    <rect x="470" y="130" width="110" height="30" rx="4" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="525" y="150" textAnchor="middle" fill="#94a3b8" fontSize="9">Thread 2 work</text>
    <text x="525" y="180" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="bold">Thread 3 deregistered</text>
    <text x="525" y="225" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">Dynamic parties!</text>

    <line x1="200" y1="150" x2="245" y2="150" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowhead-phaser)"/>
    <line x1="400" y1="150" x2="445" y2="150" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowhead-phaser)"/>

    <text x="222" y="145" textAnchor="middle" fill="#06b6d4" fontSize="9">sync</text>
    <text x="422" y="145" textAnchor="middle" fill="#06b6d4" fontSize="9">sync</text>

    {/* Legend */}
    <text x="650" y="100" textAnchor="start" fill="#8b5cf6" fontSize="10" fontWeight="bold">Features:</text>
    <text x="650" y="120" textAnchor="start" fill="#94a3b8" fontSize="9">• Reusable phases</text>
    <text x="650" y="140" textAnchor="start" fill="#94a3b8" fontSize="9">• Dynamic parties</text>
    <text x="650" y="160" textAnchor="start" fill="#94a3b8" fontSize="9">• Termination support</text>
    <text x="650" y="180" textAnchor="start" fill="#94a3b8" fontSize="9">• Flexible arrival</text>
  </svg>
)

/**
 * AQS Internal Implementation Diagram
 */
const AQSInternalDiagram = () => (
  <svg viewBox="0 0 800 240" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead-aqs" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#06b6d4" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      CountDownLatch AQS Implementation
    </text>

    {/* CountDownLatch */}
    <rect x="50" y="60" width="180" height="80" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="140" y="85" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">CountDownLatch</text>
    <text x="140" y="105" textAnchor="middle" fill="#94a3b8" fontSize="10">await() → acquireShared()</text>
    <text x="140" y="125" textAnchor="middle" fill="#94a3b8" fontSize="10">countDown() → releaseShared()</text>

    {/* AQS Sync */}
    <rect x="300" y="60" width="200" height="150" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="400" y="85" textAnchor="middle" fill="#8b5cf6" fontSize="11" fontWeight="bold">AQS Sync Inner Class</text>

    <rect x="320" y="100" width="160" height="40" rx="4" fill="rgba(139, 92, 246, 0.15)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="400" y="115" textAnchor="middle" fill="#94a3b8" fontSize="9">tryAcquireShared():</text>
    <text x="400" y="130" textAnchor="middle" fill="#94a3b8" fontSize="9">return state == 0 ? 1 : -1</text>

    <rect x="320" y="155" width="160" height="40" rx="4" fill="rgba(139, 92, 246, 0.15)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="400" y="170" textAnchor="middle" fill="#94a3b8" fontSize="9">tryReleaseShared():</text>
    <text x="400" y="185" textAnchor="middle" fill="#94a3b8" fontSize="9">CAS(state, state - 1)</text>

    {/* State */}
    <rect x="570" y="90" width="180" height="90" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="660" y="115" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">AQS State</text>
    <text x="660" y="140" textAnchor="middle" fill="#94a3b8" fontSize="10">volatile int state</text>
    <text x="660" y="160" textAnchor="middle" fill="#94a3b8" fontSize="10">= remaining count</text>

    <line x1="230" y1="100" x2="295" y2="100" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowhead-aqs)"/>
    <line x1="500" y1="130" x2="565" y2="130" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowhead-aqs)"/>

    <text x="262" y="95" textAnchor="middle" fill="#06b6d4" fontSize="9">extends</text>
    <text x="532" y="125" textAnchor="middle" fill="#06b6d4" fontSize="9">uses</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

/**
 * CountDownLatchCyclicBarrier Component
 */
function CountDownLatchCyclicBarrier({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'countdown-latch',
      name: 'CountDownLatch',
      icon: '⏱️',
      color: '#ef4444',
      description: 'One-shot synchronization gate that allows threads to wait until a count reaches zero. Perfect for waiting for N events to complete.',
      diagram: CountDownLatchDiagram,
      details: [
        {
          name: 'Basic Concept',
          diagram: CountDownLatchDiagram,
          explanation: 'CountDownLatch is a one-time synchronization aid that allows threads to wait until a set of operations completes. It uses a count that can only decrease (never reset). Threads wait at await() until the count reaches zero, at which point all waiting threads are released. The countDown() method decrements the count by 1 and is non-blocking.',
          codeExample: `// CountDownLatch structure
public class CountDownLatch {
    private final Sync sync;

    // Uses AQS state as the count
    private static final class Sync extends AbstractQueuedSynchronizer {
        Sync(int count) {
            setState(count);
        }

        int getCount() {
            return getState();
        }

        // tryAcquireShared: succeed if count is 0
        protected int tryAcquireShared(int acquires) {
            return (getState() == 0) ? 1 : -1;
        }

        // tryReleaseShared: decrement count, signal if zero
        protected boolean tryReleaseShared(int releases) {
            for (;;) {
                int c = getState();
                if (c == 0) return false;
                int next = c - 1;
                if (compareAndSetState(c, next))
                    return next == 0;  // Signal if reached 0
            }
        }
    }
}`
        },
        {
          name: 'Common Patterns',
          explanation: 'CountDownLatch supports two main patterns: (1) Waiting for worker threads to complete - create a latch with count = N workers, each worker calls countDown() when done, main thread waits with await(). (2) Starting gun pattern - create a latch with count = 1, all threads call await(), then a single thread calls countDown() to release all threads simultaneously.',
          codeExample: `// Pattern 1: Wait for workers to complete
CountDownLatch latch = new CountDownLatch(3);

for (int i = 0; i < 3; i++) {
    new Thread(() -> {
        doWork();
        latch.countDown();  // Decrement count
    }).start();
}

latch.await();  // Wait until count reaches 0
System.out.println("All workers done!");

// Pattern 2: Starting gun pattern
CountDownLatch startSignal = new CountDownLatch(1);
CountDownLatch doneSignal = new CountDownLatch(5);

for (int i = 0; i < 5; i++) {
    new Thread(() -> {
        startSignal.await();  // Wait for start
        doWork();
        doneSignal.countDown();
    }).start();
}

// All threads ready, fire!
startSignal.countDown();
doneSignal.await();  // Wait for all to finish`
        },
        {
          name: 'Key Characteristics',
          explanation: 'CountDownLatch has several important characteristics: It is one-shot only - the count can only decrease and never be reset. Any thread can call countDown(), not just waiting threads. The number of waiting threads does not need to equal the count. It uses AQS (AbstractQueuedSynchronizer) shared mode internally. Once the count reaches zero, all future calls to await() return immediately without blocking.',
          codeExample: `// Key characteristics demonstrated
CountDownLatch latch = new CountDownLatch(3);

// Characteristic 1: One-shot (cannot reset)
latch.countDown();
latch.countDown();
latch.countDown();
latch.await();  // Returns immediately
latch.await();  // Still returns immediately - no reset!

// Characteristic 2: Any thread can countDown()
new Thread(() -> latch.countDown()).start();  // Worker thread
latch.countDown();  // Main thread - both valid!

// Characteristic 3: Waiters != Counters
CountDownLatch latch2 = new CountDownLatch(5);
// 10 threads can wait, but only 5 countDown() calls needed

// Characteristic 4: Timeout support
boolean completed = latch2.await(5, TimeUnit.SECONDS);
if (!completed) {
    System.out.println("Timed out!");
}`
        }
      ]
    },
    {
      id: 'cyclic-barrier',
      name: 'CyclicBarrier',
      icon: '🔄',
      color: '#22c55e',
      description: 'Reusable synchronization point where threads wait for each other. Automatically resets after all parties arrive, perfect for phased computations.',
      diagram: CyclicBarrierDiagram,
      details: [
        {
          name: 'Basic Concept',
          diagram: CyclicBarrierDiagram,
          explanation: 'CyclicBarrier is a reusable synchronization point that allows a set of threads to wait for each other at a common barrier point. Unlike CountDownLatch, it automatically resets after all parties arrive. All threads must call await() before any can proceed. It supports an optional barrier action that runs when all threads arrive.',
          codeExample: `// CyclicBarrier structure
public class CyclicBarrier {
    private final ReentrantLock lock = new ReentrantLock();
    private final Condition trip = lock.newCondition();
    private final int parties;
    private final Runnable barrierCommand;
    private Generation generation = new Generation();
    private int count;  // Threads still waiting

    // Generation tracks each barrier cycle
    private static class Generation {
        boolean broken = false;
    }
}

// Basic usage
CyclicBarrier barrier = new CyclicBarrier(3, () -> {
    System.out.println("All threads arrived!");  // Barrier action
});

for (int i = 0; i < 3; i++) {
    new Thread(() -> {
        while (true) {
            doPhaseWork();
            barrier.await();  // Wait for others
            // All threads continue together
        }
    }).start();
}`
        },
        {
          name: 'Phased Computation',
          explanation: 'CyclicBarrier excels at phased computations where threads need to synchronize at multiple points. Each thread does work, calls await() to sync with others, then proceeds to the next phase. The barrier automatically resets after all threads arrive, making it perfect for iterative algorithms and simulations with discrete time steps.',
          codeExample: `// Example: Parallel matrix computation
class MatrixMultiplier {
    int[][] A, B, C;
    int numWorkers;
    CyclicBarrier barrier;

    void compute() {
        barrier = new CyclicBarrier(numWorkers, () -> {
            // Runs when all workers finish a phase
            System.out.println("Phase complete");
        });

        for (int w = 0; w < numWorkers; w++) {
            final int worker = w;
            new Thread(() -> {
                for (int phase = 0; phase < numPhases; phase++) {
                    computeMyRows(worker, phase);
                    barrier.await();  // Sync before next phase
                }
            }).start();
        }
    }
}

// Multi-phase simulation example
CyclicBarrier barrier = new CyclicBarrier(3);
for (int i = 0; i < 3; i++) {
    new Thread(() -> {
        for (int round = 0; round < 5; round++) {
            work();
            barrier.await();  // Reuses automatically
        }
    }).start();
}`
        },
        {
          name: 'Internal Implementation',
          explanation: 'CyclicBarrier uses ReentrantLock and Condition for synchronization, not AQS directly. When await() is called, the count is decremented. The last arriving thread (when count reaches 0) runs the barrier action, signals all waiting threads via the Condition, and resets the barrier for the next cycle. The Generation class tracks barrier cycles and broken states.',
          codeExample: `// await() implementation details
int await() throws InterruptedException, BrokenBarrierException {
    final ReentrantLock lock = this.lock;
    lock.lock();
    try {
        int index = --count;  // One more arrived
        if (index == 0) {  // Last one!
            // Run barrier action
            if (barrierCommand != null)
                barrierCommand.run();
            // Wake everyone and reset
            nextGeneration();
            return 0;
        }

        // Not last, wait
        while (count > 0 && !generation.broken) {
            trip.await();
        }
        return index;
    } finally {
        lock.unlock();
    }
}

// Broken barrier handling
try {
    barrier.await(1, TimeUnit.SECONDS);
} catch (TimeoutException e) {
    // This thread timed out
} catch (BrokenBarrierException e) {
    // Another thread broke the barrier
}

// Reset after broken
barrier.reset();  // Makes barrier usable again`
        }
      ]
    },
    {
      id: 'comparison',
      name: 'Latch vs Barrier',
      icon: '⚖️',
      color: '#8b5cf6',
      description: 'Understand the key differences between CountDownLatch and CyclicBarrier to choose the right synchronizer for your use case.',
      diagram: ComparisonDiagram,
      details: [
        {
          name: 'Key Differences',
          diagram: ComparisonDiagram,
          explanation: 'CountDownLatch and CyclicBarrier serve different purposes. Latch is one-shot (cannot reset) and used for waiting for events, where any thread can count down. Barrier is reusable (automatic reset) and used for threads syncing together, where waiting threads are the counting threads. Latch separates waiters from counters, while Barrier requires all parties to participate.',
          codeExample: `// Comparison table
//
// Feature          | CountDownLatch    | CyclicBarrier
// -----------------+-------------------+------------------
// Reusable?        | No                | Yes
// Reset possible?  | No                | Yes (automatic)
// Barrier action?  | No                | Yes
// Who counts?      | Any thread        | Waiting threads
// Blocks on        | count > 0         | count > 0
// Released when    | count == 0        | all parties arrive

// CountDownLatch: N events before proceeding
CountDownLatch latch = new CountDownLatch(5);

// Multiple countDown() from same or different threads
latch.countDown();  // From any thread
latch.countDown();  // Any thread can call
latch.await();      // Different threads wait

// CyclicBarrier: N threads meet at sync point
CyclicBarrier barrier = new CyclicBarrier(3);

// Each waiting thread counts as one arrival
barrier.await();  // Thread 1 waits AND counts
barrier.await();  // Thread 2 waits AND counts
barrier.await();  // Thread 3 waits AND counts, all released!`
        },
        {
          name: 'Reusability',
          explanation: 'The most significant difference is reusability. CyclicBarrier automatically resets after all parties arrive, allowing the same barrier instance to be used for multiple synchronization cycles. CountDownLatch cannot be reused - once the count reaches zero, it stays at zero forever. To reuse the latch pattern, you must create a new CountDownLatch instance.',
          codeExample: `// CyclicBarrier reuse - automatic
CyclicBarrier barrier = new CyclicBarrier(3);
for (int i = 0; i < 3; i++) {
    new Thread(() -> {
        for (int round = 0; round < 5; round++) {
            work();
            barrier.await();  // Reuses automatically!
        }
    }).start();
}

// CountDownLatch cannot be reused
CountDownLatch latch = new CountDownLatch(3);
// ... after count reaches 0 ...
latch.await();  // Returns immediately forever

// Must create new CountDownLatch for reuse
for (int round = 0; round < 5; round++) {
    CountDownLatch roundLatch = new CountDownLatch(3);  // New instance
    for (int i = 0; i < 3; i++) {
        new Thread(() -> {
            work();
            roundLatch.countDown();
        }).start();
    }
    roundLatch.await();
}`
        },
        {
          name: 'Use Case Selection',
          explanation: 'Choose CountDownLatch when waiting for N independent events to complete, when the counting threads and waiting threads are different, or when you need one-time coordination. Choose CyclicBarrier when N threads need to meet at a synchronization point, when you need repeated synchronization cycles, or when you want to run a barrier action when all threads arrive.',
          codeExample: `// Use CountDownLatch for: Waiting for N events
// Example: Wait for services to start
CountDownLatch servicesReady = new CountDownLatch(3);

new Thread(() -> { startDatabase(); servicesReady.countDown(); }).start();
new Thread(() -> { startCache(); servicesReady.countDown(); }).start();
new Thread(() -> { startMessageQueue(); servicesReady.countDown(); }).start();

servicesReady.await();  // Main thread waits for all services
System.out.println("All services started!");

// Use CyclicBarrier for: N threads syncing together
// Example: Parallel sort with phases
CyclicBarrier barrier = new CyclicBarrier(4, () -> {
    System.out.println("Phase complete, merging results");
});

for (int i = 0; i < 4; i++) {
    final int partition = i;
    new Thread(() -> {
        for (int phase = 0; phase < 3; phase++) {
            sortPartition(partition, phase);
            barrier.await();  // All threads sync before next phase
        }
    }).start();
}`
        }
      ]
    },
    {
      id: 'phaser',
      name: 'Phaser',
      icon: '🎯',
      color: '#f59e0b',
      description: 'Advanced multi-phase synchronizer with dynamic party registration, termination support, and tree-structured coordination.',
      diagram: PhaserDiagram,
      details: [
        {
          name: 'Overview',
          diagram: PhaserDiagram,
          explanation: 'Phaser is a flexible, reusable synchronization barrier introduced in Java 7. It provides capabilities beyond CyclicBarrier, including dynamic party registration and deregistration, multiple phases with different party counts, tree-structured phasers for scalability, and termination support via onAdvance() callback.',
          codeExample: `// Phaser structure
public class Phaser {
    private volatile long state;  // Encodes phase, parties, unarrived

    // State encoding:
    // [phase: 31 bits][parties: 16 bits][unarrived: 16 bits]
}

// Basic usage
Phaser phaser = new Phaser(3);  // 3 parties

for (int i = 0; i < 3; i++) {
    new Thread(() -> {
        for (int phase = 0; phase < 5; phase++) {
            work();
            phaser.arriveAndAwaitAdvance();
        }
    }).start();
}

// Phaser vs CyclicBarrier vs CountDownLatch
//
// Feature          | CountDownLatch | CyclicBarrier | Phaser
// -----------------+----------------+---------------+--------
// Reusable         | No             | Yes           | Yes
// Dynamic parties  | No             | No            | Yes
// Barrier action   | No             | Yes           | Yes*
// Termination      | No             | No            | Yes
// Tree structure   | No             | No            | Yes`
        },
        {
          name: 'Dynamic Registration',
          explanation: 'Unlike CyclicBarrier where the number of parties is fixed at creation, Phaser allows threads to dynamically register() and deregister(). This is useful when the number of participants varies over time or when threads can join or leave the synchronization group. The arriveAndDeregister() method combines arrival with removal from future phases.',
          codeExample: `// Dynamic registration
Phaser phaser = new Phaser(1);  // Self registered

new Thread(() -> {
    phaser.register();  // Add party dynamically
    work();
    phaser.arriveAndDeregister();  // Remove party
}).start();

phaser.arriveAndAwaitAdvance();
phaser.arriveAndDeregister();

// Example: Variable worker pool
Phaser phaser = new Phaser();
List<Thread> workers = new ArrayList<>();

// Add workers dynamically
for (int i = 0; i < initialWorkers; i++) {
    phaser.register();
    workers.add(new Thread(() -> {
        while (!phaser.isTerminated()) {
            doWork();
            phaser.arriveAndAwaitAdvance();
        }
    }));
}

// Later: add more workers
if (needMoreWorkers) {
    phaser.register();
    workers.add(new Thread(...));
}`
        },
        {
          name: 'Arrival Variants',
          explanation: 'Phaser provides multiple arrival methods for different scenarios: arriveAndAwaitAdvance() arrives and waits for others (like barrier.await()), arrive() arrives without waiting (useful for async tasks), arriveAndDeregister() arrives and removes self from future phases, and awaitAdvance(phase) waits for a specific phase to complete.',
          codeExample: `// Arrival without waiting
phaser.arrive();  // Arrive but don't wait

// Arrive and wait (most common)
phaser.arriveAndAwaitAdvance();  // Like CyclicBarrier.await()

// Arrive and leave
phaser.arriveAndDeregister();  // Remove from future phases

// Wait for specific phase
int currentPhase = phaser.getPhase();
doAsyncWork();
phaser.awaitAdvance(currentPhase);  // Wait for phase to complete

// Example: Producer-consumer with phases
Phaser phaser = new Phaser(2);

// Producer: doesn't wait
new Thread(() -> {
    for (int i = 0; i < 10; i++) {
        produce();
        phaser.arrive();  // Signal completion, continue
    }
}).start();

// Consumer: waits for producer
new Thread(() -> {
    for (int i = 0; i < 10; i++) {
        int phase = phaser.arrive();
        phaser.awaitAdvance(phase);  // Wait for producer
        consume();
    }
}).start();`
        },
        {
          name: 'Termination',
          explanation: 'Phaser supports termination via the onAdvance() method. Override this method to specify termination conditions based on the current phase number and registered parties. Return true to terminate the phaser, false to continue. Once terminated, all waiting threads are released and future operations complete immediately.',
          codeExample: `// Termination example
Phaser phaser = new Phaser() {
    @Override
    protected boolean onAdvance(int phase, int parties) {
        // Terminate after 5 phases or if no parties
        return phase >= 5 || parties == 0;
    }
};

phaser.register();
for (int i = 0; i < 10; i++) {
    if (phaser.isTerminated()) {
        System.out.println("Phaser terminated at phase " + i);
        break;
    }
    doWork();
    phaser.arriveAndAwaitAdvance();
}

// Example: Terminate when work complete
Phaser phaser = new Phaser(3) {
    @Override
    protected boolean onAdvance(int phase, int parties) {
        System.out.println("Phase " + phase + " complete");
        return allWorkDone() || parties == 0;
    }
};`
        }
      ]
    },
    {
      id: 'aqs-internals',
      name: 'AQS Internals',
      icon: '⚙️',
      color: '#3b82f6',
      description: 'Deep dive into AbstractQueuedSynchronizer (AQS) and how CountDownLatch and CyclicBarrier implement synchronization.',
      diagram: AQSInternalDiagram,
      details: [
        {
          name: 'CountDownLatch AQS',
          diagram: AQSInternalDiagram,
          explanation: 'CountDownLatch uses AQS in shared mode. The AQS state represents the remaining count. The tryAcquireShared() method succeeds (returns 1) when state is 0, allowing waiting threads to proceed. The tryReleaseShared() method uses CAS to decrement the state and returns true when it reaches 0, triggering a signal to all waiting threads.',
          codeExample: `// CountDownLatch internal
public class CountDownLatch {
    private final Sync sync;

    private static final class Sync extends AbstractQueuedSynchronizer {
        Sync(int count) {
            setState(count);
        }

        // await() calls this
        protected int tryAcquireShared(int acquires) {
            return (getState() == 0) ? 1 : -1;
        }

        // countDown() calls this
        protected boolean tryReleaseShared(int releases) {
            for (;;) {
                int c = getState();
                if (c == 0) return false;
                int nextc = c - 1;
                if (compareAndSetState(c, nextc))
                    return nextc == 0;
            }
        }
    }

    public void await() throws InterruptedException {
        sync.acquireSharedInterruptibly(1);
    }

    public void countDown() {
        sync.releaseShared(1);
    }
}`
        },
        {
          name: 'CyclicBarrier Lock',
          explanation: 'CyclicBarrier does not use AQS directly. Instead, it uses ReentrantLock and Condition for synchronization. The lock protects the count and generation state. The Condition (trip) is used to wait and signal threads. The last arriving thread runs the barrier action, signals all waiting threads, and resets the barrier for the next cycle.',
          codeExample: `// CyclicBarrier internal
public class CyclicBarrier {
    private final ReentrantLock lock = new ReentrantLock();
    private final Condition trip = lock.newCondition();
    private int count;

    public int await() throws InterruptedException, BrokenBarrierException {
        final ReentrantLock lock = this.lock;
        lock.lock();
        try {
            int index = --count;
            if (index == 0) {
                // Run barrier action, wake all
                final Runnable command = barrierCommand;
                if (command != null) command.run();
                nextGeneration();
                return 0;
            }

            for (;;) {
                trip.await();  // Wait on condition
                if (generation.broken)
                    throw new BrokenBarrierException();
                // Check if we should proceed
            }
        } finally {
            lock.unlock();
        }
    }
}`
        },
        {
          name: 'AQS Shared Mode',
          explanation: 'AQS supports both exclusive mode (like ReentrantLock) and shared mode (like CountDownLatch). In shared mode, multiple threads can acquire the synchronizer simultaneously. The tryAcquireShared() method returns negative on failure, zero on success without propagation, and positive on success with propagation to other threads. CountDownLatch returns 1 when count reaches zero, propagating the release to all waiting threads.',
          codeExample: `// AQS shared mode in CountDownLatch
abstract class AbstractQueuedSynchronizer {
    volatile int state;

    // Acquire in shared mode
    public final void acquireSharedInterruptibly(int arg) {
        if (Thread.interrupted())
            throw new InterruptedException();
        if (tryAcquireShared(arg) < 0)
            doAcquireSharedInterruptibly(arg);  // Park thread
    }

    // Release in shared mode
    public final boolean releaseShared(int arg) {
        if (tryReleaseShared(arg)) {
            doReleaseShared();  // Unpark waiting threads
            return true;
        }
        return false;
    }
}

// CountDownLatch implementation
protected int tryAcquireShared(int acquires) {
    // Success if count is 0, failure otherwise
    return (getState() == 0) ? 1 : -1;
}

protected boolean tryReleaseShared(int releases) {
    // Decrement count atomically
    for (;;) {
        int c = getState();
        if (c == 0) return false;  // Already zero
        int next = c - 1;
        if (compareAndSetState(c, next))
            return next == 0;  // Signal if reached 0
    }
}`
        }
      ]
    },
    {
      id: 'interview-questions',
      name: 'Interview Questions',
      icon: '💡',
      color: '#ec4899',
      description: 'Common interview questions about CountDownLatch, CyclicBarrier, and thread synchronization with detailed answers and examples.',
      details: [
        {
          name: 'Common Questions',
          explanation: 'Q1: What is the main difference between CountDownLatch and CyclicBarrier? A: CountDownLatch is one-shot and cannot be reset, used for waiting for events. CyclicBarrier is reusable and automatically resets, used for threads syncing together at a barrier point.',
          codeExample: `// Q1: Key difference
// CountDownLatch: events → threads wait
CountDownLatch latch = new CountDownLatch(3);
// Any thread can countDown, different threads can wait
latch.countDown();  // Worker thread
latch.await();      // Main thread

// CyclicBarrier: threads → sync point
CyclicBarrier barrier = new CyclicBarrier(3);
// Each thread both waits AND counts
barrier.await();  // Thread waits and is counted

// Q2: Can CountDownLatch be reset?
// A: No, create a new one instead
CountDownLatch latch = new CountDownLatch(n);
// ... after use ...
latch = new CountDownLatch(n);  // Create new instance`
        },
        {
          name: 'Timeout & Errors',
          explanation: 'Q3: What happens if await() times out in CyclicBarrier? A: The barrier becomes broken and BrokenBarrierException is thrown to all waiting threads. The barrier must be reset with reset() to be usable again. This cascading failure ensures all threads are aware when the barrier fails.',
          codeExample: `// Q3: Timeout handling
CyclicBarrier barrier = new CyclicBarrier(3);

try {
    barrier.await(1, TimeUnit.SECONDS);
} catch (TimeoutException e) {
    // This thread timed out
    System.out.println("I timed out");
} catch (BrokenBarrierException e) {
    // Another thread broke the barrier
    System.out.println("Barrier was broken by another thread");
}

// Broken barrier cascades to all waiting threads
// Thread 1: barrier.await(1, SECONDS) - TimeoutException
// Thread 2: barrier.await() - BrokenBarrierException!
// Thread 3: barrier.await() - BrokenBarrierException!

// Reset after broken
barrier.reset();  // Makes barrier usable again`
        },
        {
          name: 'Common Pitfalls',
          explanation: 'Q5: What are common mistakes when using these synchronizers? A: (1) CountDownLatch count too high - if fewer threads call countDown() than the initial count, await() hangs forever. (2) CyclicBarrier wrong party count - if fewer threads call await() than parties, all threads hang. (3) Forgetting timeouts - always use timeout versions in production to prevent indefinite blocking.',
          codeExample: `// Common pitfalls

// Pitfall 1: CountDownLatch count too high
CountDownLatch latch = new CountDownLatch(10);
// Only 5 threads call countDown()
for (int i = 0; i < 5; i++) {
    new Thread(() -> {
        work();
        latch.countDown();
    }).start();
}
latch.await();  // Hangs forever! Count never reaches 0

// Pitfall 2: CyclicBarrier wrong party count
CyclicBarrier barrier = new CyclicBarrier(3);
// Only 2 threads call await()
new Thread(() -> barrier.await()).start();
new Thread(() -> barrier.await()).start();
// All threads hang! Third thread never arrives

// Pitfall 3: Forgetting timeout
// Bad - can hang forever
latch.await();
barrier.await();

// Good - timeout protection
boolean success = latch.await(5, TimeUnit.SECONDS);
if (!success) {
    System.out.println("Timed out waiting for latch");
}
barrier.await(5, TimeUnit.SECONDS);`
        },
        {
          name: 'Advanced Topics',
          explanation: 'Q4: What is Phaser and when should you use it? A: Phaser is a flexible barrier with dynamic party registration, termination support, and multiple arrival modes. Use it when the number of parties varies, when you need to add/remove participants dynamically, or for complex multi-phase coordination. Q6: Which synchronizer uses AQS directly? A: CountDownLatch uses AQS shared mode. CyclicBarrier uses ReentrantLock and Condition. Phaser uses its own state management with CAS operations.',
          codeExample: `// Q4: Phaser advantages
Phaser phaser = new Phaser();

// Dynamic party registration
phaser.register();  // Add party
phaser.arriveAndDeregister();  // Remove party

// Termination support
Phaser phaser2 = new Phaser() {
    @Override
    protected boolean onAdvance(int phase, int parties) {
        return phase >= 5 || parties == 0;  // Terminate condition
    }
};

// Q6: AQS usage
// CountDownLatch uses AQS
class Sync extends AbstractQueuedSynchronizer {
    protected int tryAcquireShared(int acquires) {
        return (getState() == 0) ? 1 : -1;
    }
}

// CyclicBarrier uses Lock + Condition
private final ReentrantLock lock = new ReentrantLock();
private final Condition trip = lock.newCondition();`
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
      { name: 'My Projects', icon: '💼', page: 'MyProjects' },
      { name: 'CountDownLatch & CyclicBarrier', icon: '⏱️', page: 'CountDownLatchCyclicBarrier' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #0e4a5f 50%, #0f172a 100%)',
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

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div style={containerStyle}>
      {/* Header with title and back button */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>CountDownLatch & CyclicBarrier</h1>
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
          ← Back to My Projects
        </button>
      </div>

      {/* Breadcrumb navigation */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu}
          colors={COUNTDOWN_COLORS}
        />
      </div>

      {/* Subtitle */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <p style={{ color: '#94a3b8', fontSize: '1.125rem', lineHeight: '1.75' }}>
          Deep dive into Java's thread synchronization utilities: CountDownLatch for one-shot coordination,
          CyclicBarrier for reusable sync points, and Phaser for advanced multi-phase synchronization.
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
              colors={COUNTDOWN_COLORS}
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

export default CountDownLatchCyclicBarrier
