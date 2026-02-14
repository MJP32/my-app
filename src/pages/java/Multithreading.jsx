/**
 * Multithreading - Java Concurrency Guide
 *
 * Comprehensive guide to Java multithreading covering thread pools,
 * executors, futures, synchronization, and thread coordination.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'
import CompletionCheckbox from '../../components/CompletionCheckbox'
import { isProblemCompleted } from '../../services/progressService'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const MULTITHREADING_COLORS = {
  primary: '#06b6d4',           // Cyan - main accent
  primaryHover: '#22d3ee',      // Lighter cyan for hover
  bg: 'rgba(6, 182, 212, 0.1)', // Background with transparency
  border: 'rgba(6, 182, 212, 0.3)', // Border color
  arrow: '#06b6d4',             // Arrow/indicator color
  hoverBg: 'rgba(6, 182, 212, 0.2)', // Hover background
  topicBg: 'rgba(6, 182, 212, 0.2)'  // Topic card background
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

const ThreadLifecycleDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="threadArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Thread Lifecycle States
    </text>

    {/* NEW */}
    <rect x="50" y="60" width="100" height="45" rx="8" fill="#6366f1" stroke="#818cf8" strokeWidth="2"/>
    <text x="100" y="87" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">NEW</text>

    {/* RUNNABLE */}
    <rect x="200" y="60" width="100" height="45" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="250" y="87" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">RUNNABLE</text>

    {/* RUNNING */}
    <rect x="350" y="60" width="100" height="45" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="400" y="87" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">RUNNING</text>

    {/* TERMINATED */}
    <rect x="650" y="60" width="100" height="45" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="700" y="87" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">TERMINATED</text>

    {/* BLOCKED */}
    <rect x="280" y="160" width="100" height="45" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="330" y="187" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">BLOCKED</text>

    {/* WAITING */}
    <rect x="420" y="160" width="100" height="45" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="470" y="187" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">WAITING</text>

    {/* TIMED_WAITING */}
    <rect x="350" y="230" width="120" height="40" rx="8" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="410" y="255" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">TIMED_WAITING</text>

    {/* Arrows */}
    <line x1="150" y1="82" x2="195" y2="82" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#threadArrow)"/>
    <text x="172" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">start()</text>

    <line x1="300" y1="82" x2="345" y2="82" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#threadArrow)"/>
    <text x="322" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">scheduled</text>

    <line x1="450" y1="82" x2="645" y2="82" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#threadArrow)"/>
    <text x="547" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">run() completes</text>

    {/* To BLOCKED */}
    <path d="M 380 105 Q 380 135, 360 155" fill="none" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#threadArrow)"/>
    <text x="355" y="135" textAnchor="middle" fill="#94a3b8" fontSize="8">lock</text>

    {/* From BLOCKED */}
    <path d="M 300 160 Q 280 130, 280 105" fill="none" stroke="#22c55e" strokeWidth="2" markerEnd="url(#threadArrow)"/>
    <text x="270" y="135" textAnchor="middle" fill="#94a3b8" fontSize="8">acquired</text>

    {/* To WAITING */}
    <path d="M 420 105 Q 440 135, 460 155" fill="none" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#threadArrow)"/>
    <text x="455" y="135" textAnchor="middle" fill="#94a3b8" fontSize="8">wait()</text>

    {/* From WAITING */}
    <path d="M 520 160 Q 540 130, 320 105" fill="none" stroke="#22c55e" strokeWidth="2" markerEnd="url(#threadArrow)"/>
    <text x="530" y="125" textAnchor="middle" fill="#94a3b8" fontSize="8">notify()</text>
  </svg>
)

const ExecutorServiceDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="execArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      ExecutorService Thread Pool Architecture
    </text>

    {/* Task Queue */}
    <rect x="40" y="70" width="130" height="120" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="105" y="95" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">Task Queue</text>
    <rect x="55" y="105" width="100" height="20" rx="4" fill="#8b5cf6"/>
    <text x="105" y="119" textAnchor="middle" fill="white" fontSize="9">Task 1</text>
    <rect x="55" y="130" width="100" height="20" rx="4" fill="#8b5cf6"/>
    <text x="105" y="144" textAnchor="middle" fill="white" fontSize="9">Task 2</text>
    <rect x="55" y="155" width="100" height="20" rx="4" fill="#8b5cf6"/>
    <text x="105" y="169" textAnchor="middle" fill="white" fontSize="9">Task 3</text>

    {/* Thread Pool */}
    <rect x="250" y="50" width="280" height="160" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="390" y="75" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Thread Pool (Fixed Size: 3)</text>

    <rect x="270" y="95" width="75" height="40" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="307" y="120" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Thread-1</text>

    <rect x="355" y="95" width="75" height="40" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="392" y="120" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Thread-2</text>

    <rect x="440" y="95" width="75" height="40" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="477" y="120" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Thread-3</text>

    <text x="390" y="170" textAnchor="middle" fill="#94a3b8" fontSize="9">Threads reused for multiple tasks</text>

    {/* Results */}
    <rect x="610" y="70" width="140" height="120" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="680" y="95" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Future Results</text>
    <rect x="625" y="110" width="110" height="20" rx="4" fill="#22c55e"/>
    <text x="680" y="124" textAnchor="middle" fill="white" fontSize="9">{`Future<T>`}</text>
    <text x="680" y="155" textAnchor="middle" fill="#94a3b8" fontSize="9">get() blocks</text>
    <text x="680" y="170" textAnchor="middle" fill="#94a3b8" fontSize="9">until complete</text>

    {/* Arrows */}
    <line x1="170" y1="130" x2="245" y2="130" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#execArrow)"/>
    <text x="207" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">submit()</text>

    <line x1="530" y1="130" x2="605" y2="130" stroke="#22c55e" strokeWidth="2" markerEnd="url(#execArrow)"/>
    <text x="567" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">returns</text>
  </svg>
)

const SynchronizationDiagram = () => (
  <svg viewBox="0 0 800 240" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="syncArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Synchronization and Lock Mechanisms
    </text>

    {/* Thread 1 */}
    <rect x="50" y="60" width="100" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Thread-1</text>

    {/* Thread 2 */}
    <rect x="50" y="140" width="100" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="100" y="170" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Thread-2</text>

    {/* Lock/Monitor */}
    <rect x="250" y="80" width="140" height="90" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="320" y="105" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Monitor Lock</text>
    <text x="320" y="125" textAnchor="middle" fill="#94a3b8" fontSize="9">synchronized</text>
    <rect x="270" y="135" width="100" height="25" rx="4" fill="#f59e0b"/>
    <text x="320" y="152" textAnchor="middle" fill="white" fontSize="9">intrinsic lock</text>

    {/* Critical Section */}
    <rect x="480" y="60" width="160" height="130" rx="8" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="560" y="85" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">Critical Section</text>
    <rect x="500" y="100" width="120" height="25" rx="4" fill="#ef4444"/>
    <text x="560" y="117" textAnchor="middle" fill="white" fontSize="9">Shared Resource</text>
    <text x="560" y="150" textAnchor="middle" fill="#94a3b8" fontSize="9">Only ONE thread</text>
    <text x="560" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9">can access at a time</text>

    {/* Arrows */}
    <line x1="150" y1="85" x2="245" y2="115" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#syncArrow)"/>
    <text x="185" y="90" textAnchor="middle" fill="#60a5fa" fontSize="8">acquires</text>

    <line x1="150" y1="165" x2="245" y2="135" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="5,3"/>
    <text x="185" y="165" textAnchor="middle" fill="#a78bfa" fontSize="8">waits</text>

    <line x1="390" y1="125" x2="475" y2="125" stroke="#22c55e" strokeWidth="2" markerEnd="url(#syncArrow)"/>
    <text x="432" y="115" textAnchor="middle" fill="#4ade80" fontSize="8">enters</text>
  </svg>
)

const CountDownLatchDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="latchArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      CountDownLatch Coordination
    </text>

    {/* Workers */}
    <rect x="50" y="60" width="80" height="40" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="90" y="84" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Worker-1</text>

    <rect x="50" y="110" width="80" height="40" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="90" y="134" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Worker-2</text>

    <rect x="50" y="160" width="80" height="40" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="90" y="184" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Worker-3</text>

    {/* Latch */}
    <rect x="250" y="80" width="140" height="100" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="320" y="105" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">CountDownLatch</text>
    <text x="320" y="125" textAnchor="middle" fill="#94a3b8" fontSize="9">Initial count: 3</text>
    <rect x="280" y="135" width="30" height="30" rx="4" fill="#f59e0b"/>
    <text x="295" y="155" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">3</text>
    <text x="320" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">{`->`}</text>
    <rect x="330" y="135" width="30" height="30" rx="4" fill="#22c55e"/>
    <text x="345" y="155" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">0</text>

    {/* Main Thread */}
    <rect x="500" y="80" width="120" height="100" rx="8" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="560" y="105" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">Main Thread</text>
    <text x="560" y="130" textAnchor="middle" fill="#94a3b8" fontSize="9">await()</text>
    <text x="560" y="150" textAnchor="middle" fill="#94a3b8" fontSize="9">blocks until</text>
    <text x="560" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9">count = 0</text>

    {/* Continue */}
    <rect x="680" y="105" width="100" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="730" y="135" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Continue</text>

    {/* Arrows */}
    <line x1="130" y1="80" x2="245" y2="120" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#latchArrow)"/>
    <line x1="130" y1="130" x2="245" y2="130" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#latchArrow)"/>
    <line x1="130" y1="180" x2="245" y2="140" stroke="#22c55e" strokeWidth="2" markerEnd="url(#latchArrow)"/>
    <text x="180" y="105" textAnchor="middle" fill="#94a3b8" fontSize="8">countDown()</text>

    <line x1="390" y1="130" x2="495" y2="130" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#latchArrow)"/>
    <line x1="620" y1="130" x2="675" y2="130" stroke="#22c55e" strokeWidth="2" markerEnd="url(#latchArrow)"/>
    <text x="650" y="120" textAnchor="middle" fill="#94a3b8" fontSize="8">released</text>
  </svg>
)

const ThreadLocalDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="tlArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      ThreadLocal - Thread-Isolated Storage
    </text>

    {/* Thread 1 */}
    <rect x="80" y="55" width="200" height="70" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="180" y="78" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Thread-1</text>
    <rect x="100" y="88" width="160" height="25" rx="4" fill="#3b82f6"/>
    <text x="180" y="105" textAnchor="middle" fill="white" fontSize="9">context: User-A</text>

    {/* Thread 2 */}
    <rect x="80" y="140" width="200" height="70" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="180" y="163" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">Thread-2</text>
    <rect x="100" y="173" width="160" height="25" rx="4" fill="#8b5cf6"/>
    <text x="180" y="190" textAnchor="middle" fill="white" fontSize="9">context: User-B</text>

    {/* ThreadLocal Storage */}
    <rect x="380" y="55" width="180" height="155" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="470" y="80" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">{`ThreadLocal<Context>`}</text>

    <rect x="400" y="95" width="140" height="25" rx="4" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6"/>
    <text x="470" y="112" textAnchor="middle" fill="#60a5fa" fontSize="9">{`T1 -> User-A`}</text>

    <rect x="400" y="130" width="140" height="25" rx="4" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6"/>
    <text x="470" y="147" textAnchor="middle" fill="#a78bfa" fontSize="9">{`T2 -> User-B`}</text>

    <text x="470" y="180" textAnchor="middle" fill="#94a3b8" fontSize="9">Each thread sees</text>
    <text x="470" y="195" textAnchor="middle" fill="#94a3b8" fontSize="9">only its own copy</text>

    {/* Isolation indicator */}
    <rect x="620" y="90" width="130" height="80" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="685" y="115" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Thread Safety</text>
    <text x="685" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">No locks needed</text>
    <text x="685" y="150" textAnchor="middle" fill="#94a3b8" fontSize="9">Zero contention</text>

    {/* Arrows */}
    <line x1="280" y1="90" x2="375" y2="107" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#tlArrow)"/>
    <line x1="280" y1="175" x2="375" y2="142" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#tlArrow)"/>
    <text x="320" y="90" textAnchor="middle" fill="#94a3b8" fontSize="8">set()</text>
    <text x="320" y="165" textAnchor="middle" fill="#94a3b8" fontSize="8">set()</text>
  </svg>
)

const FutureCallableDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="futureArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Callable and Future Pattern
    </text>

    {/* Main Thread */}
    <rect x="40" y="60" width="120" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Main Thread</text>
    <text x="100" y="105" textAnchor="middle" fill="#bfdbfe" fontSize="9">submit(callable)</text>

    {/* Callable Task */}
    <rect x="240" y="60" width="140" height="60" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="310" y="85" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">{`Callable<T>`}</text>
    <text x="310" y="105" textAnchor="middle" fill="#94a3b8" fontSize="9">call() returns T</text>

    {/* Executor */}
    <rect x="240" y="140" width="140" height="45" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="310" y="167" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">ExecutorService</text>

    {/* Future */}
    <rect x="460" y="60" width="140" height="60" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="530" y="85" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">{`Future<T>`}</text>
    <text x="530" y="105" textAnchor="middle" fill="#94a3b8" fontSize="9">get() blocks</text>

    {/* Result */}
    <rect x="680" y="60" width="100" height="60" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="730" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Result T</text>
    <text x="730" y="105" textAnchor="middle" fill="#fecaca" fontSize="9">or Exception</text>

    {/* Arrows */}
    <line x1="160" y1="90" x2="235" y2="90" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#futureArrow)"/>
    <text x="197" y="80" textAnchor="middle" fill="#94a3b8" fontSize="8">submit</text>

    <line x1="310" y1="120" x2="310" y2="135" stroke="#22c55e" strokeWidth="2" markerEnd="url(#futureArrow)"/>

    <line x1="380" y1="90" x2="455" y2="90" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#futureArrow)"/>
    <text x="417" y="80" textAnchor="middle" fill="#94a3b8" fontSize="8">returns</text>

    <line x1="600" y1="90" x2="675" y2="90" stroke="#ef4444" strokeWidth="2" markerEnd="url(#futureArrow)"/>
    <text x="637" y="80" textAnchor="middle" fill="#94a3b8" fontSize="8">get()</text>
  </svg>
)

const VolatileDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="volArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Volatile Memory Visibility
    </text>

    {/* Thread 1 CPU Cache */}
    <rect x="50" y="55" width="150" height="80" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="125" y="78" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Thread-1 Cache</text>
    <rect x="70" y="90" width="110" height="30" rx="4" fill="#3b82f6"/>
    <text x="125" y="110" textAnchor="middle" fill="white" fontSize="9">flag = true</text>

    {/* Thread 2 CPU Cache */}
    <rect x="50" y="150" width="150" height="40" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="125" y="175" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Thread-2 Cache</text>

    {/* Main Memory */}
    <rect x="320" y="70" width="160" height="110" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="400" y="95" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Main Memory</text>
    <rect x="340" y="110" width="120" height="30" rx="4" fill="#f59e0b"/>
    <text x="400" y="130" textAnchor="middle" fill="white" fontSize="9">volatile flag</text>
    <text x="400" y="160" textAnchor="middle" fill="#94a3b8" fontSize="8">Always synchronized</text>

    {/* Without volatile */}
    <rect x="570" y="55" width="180" height="50" rx="8" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="660" y="75" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Without volatile</text>
    <text x="660" y="92" textAnchor="middle" fill="#94a3b8" fontSize="9">Stale cached values</text>

    {/* With volatile */}
    <rect x="570" y="120" width="180" height="50" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="660" y="140" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">With volatile</text>
    <text x="660" y="157" textAnchor="middle" fill="#94a3b8" fontSize="9">Always reads from memory</text>

    {/* Arrows */}
    <line x1="200" y1="105" x2="315" y2="125" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#volArrow)"/>
    <text x="250" y="105" textAnchor="middle" fill="#94a3b8" fontSize="8">write</text>

    <line x1="315" y1="140" x2="200" y2="165" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#volArrow)"/>
    <text x="250" y="165" textAnchor="middle" fill="#94a3b8" fontSize="8">read</text>
  </svg>
)

const AtomicOperationsDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="atomicArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Atomic Operations vs Non-Atomic
    </text>

    {/* Non-atomic */}
    <rect x="50" y="50" width="300" height="130" rx="8" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" strokeWidth="2"/>
    <text x="200" y="75" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">Non-Atomic: count++</text>

    <rect x="70" y="90" width="80" height="25" rx="4" fill="#ef4444"/>
    <text x="110" y="107" textAnchor="middle" fill="white" fontSize="9">1. Read</text>

    <rect x="160" y="90" width="80" height="25" rx="4" fill="#ef4444"/>
    <text x="200" y="107" textAnchor="middle" fill="white" fontSize="9">2. Modify</text>

    <rect x="250" y="90" width="80" height="25" rx="4" fill="#ef4444"/>
    <text x="290" y="107" textAnchor="middle" fill="white" fontSize="9">3. Write</text>

    <text x="200" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9">Race condition possible</text>
    <text x="200" y="155" textAnchor="middle" fill="#94a3b8" fontSize="9">between steps</text>

    {/* Atomic */}
    <rect x="430" y="50" width="320" height="130" rx="8" fill="rgba(34, 197, 94, 0.15)" stroke="#22c55e" strokeWidth="2"/>
    <text x="590" y="75" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Atomic: AtomicInteger.incrementAndGet()</text>

    <rect x="500" y="90" width="180" height="35" rx="4" fill="#22c55e"/>
    <text x="590" y="112" textAnchor="middle" fill="white" fontSize="10">Single Atomic Operation</text>

    <text x="590" y="145" textAnchor="middle" fill="#94a3b8" fontSize="9">CAS (Compare-And-Swap)</text>
    <text x="590" y="160" textAnchor="middle" fill="#94a3b8" fontSize="9">Hardware-level guarantee</text>

    {/* Arrows */}
    <line x1="150" y1="102" x2="155" y2="102" stroke="#f87171" strokeWidth="2" markerEnd="url(#atomicArrow)"/>
    <line x1="240" y1="102" x2="245" y2="102" stroke="#f87171" strokeWidth="2" markerEnd="url(#atomicArrow)"/>
  </svg>
)

const SemaphoreDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="semArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Semaphore - Limited Resource Access
    </text>

    {/* Waiting Threads */}
    <rect x="40" y="55" width="140" height="150" rx="8" fill="rgba(139, 92, 246, 0.15)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="110" y="78" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Waiting Queue</text>

    <rect x="55" y="90" width="110" height="25" rx="4" fill="#8b5cf6"/>
    <text x="110" y="107" textAnchor="middle" fill="white" fontSize="9">Thread-4</text>
    <rect x="55" y="120" width="110" height="25" rx="4" fill="#8b5cf6"/>
    <text x="110" y="137" textAnchor="middle" fill="white" fontSize="9">Thread-5</text>
    <rect x="55" y="150" width="110" height="25" rx="4" fill="#8b5cf6"/>
    <text x="110" y="167" textAnchor="middle" fill="white" fontSize="9">Thread-6</text>

    {/* Semaphore */}
    <rect x="260" y="55" width="160" height="150" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="340" y="78" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Semaphore(3)</text>
    <text x="340" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">permits = 3</text>

    <circle cx="300" cy="130" r="15" fill="#22c55e"/>
    <circle cx="340" cy="130" r="15" fill="#22c55e"/>
    <circle cx="380" cy="130" r="15" fill="#22c55e"/>

    <text x="340" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9">acquire() / release()</text>
    <text x="340" y="185" textAnchor="middle" fill="#94a3b8" fontSize="9">controls access</text>

    {/* Resources */}
    <rect x="500" y="55" width="250" height="150" rx="8" fill="rgba(34, 197, 94, 0.15)" stroke="#22c55e" strokeWidth="2"/>
    <text x="625" y="78" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Limited Resource Pool</text>

    <rect x="520" y="95" width="70" height="40" rx="4" fill="#3b82f6" stroke="#60a5fa"/>
    <text x="555" y="110" textAnchor="middle" fill="white" fontSize="8">Thread-1</text>
    <text x="555" y="125" textAnchor="middle" fill="#bfdbfe" fontSize="7">using DB</text>

    <rect x="600" y="95" width="70" height="40" rx="4" fill="#3b82f6" stroke="#60a5fa"/>
    <text x="635" y="110" textAnchor="middle" fill="white" fontSize="8">Thread-2</text>
    <text x="635" y="125" textAnchor="middle" fill="#bfdbfe" fontSize="7">using DB</text>

    <rect x="680" y="95" width="70" height="40" rx="4" fill="#3b82f6" stroke="#60a5fa"/>
    <text x="715" y="110" textAnchor="middle" fill="white" fontSize="8">Thread-3</text>
    <text x="715" y="125" textAnchor="middle" fill="#bfdbfe" fontSize="7">using DB</text>

    <text x="625" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9">Max 3 concurrent connections</text>

    {/* Arrows */}
    <line x1="180" y1="130" x2="255" y2="130" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="5,3"/>
    <text x="217" y="120" textAnchor="middle" fill="#94a3b8" fontSize="8">waiting</text>

    <line x1="420" y1="130" x2="495" y2="130" stroke="#22c55e" strokeWidth="2" markerEnd="url(#semArrow)"/>
    <text x="457" y="120" textAnchor="middle" fill="#94a3b8" fontSize="8">acquired</text>
  </svg>
)

const ReentrantLockDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="reentrantArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      ReentrantLock vs synchronized
    </text>

    {/* synchronized */}
    <rect x="50" y="50" width="300" height="130" rx="8" fill="rgba(139, 92, 246, 0.15)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="200" y="75" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">synchronized</text>

    <text x="200" y="100" textAnchor="middle" fill="#94a3b8" fontSize="9">+ Simple syntax</text>
    <text x="200" y="118" textAnchor="middle" fill="#94a3b8" fontSize="9">+ Auto release on exception</text>
    <text x="200" y="136" textAnchor="middle" fill="#f87171" fontSize="9">- No timeout</text>
    <text x="200" y="154" textAnchor="middle" fill="#f87171" fontSize="9">- No interruptible</text>
    <text x="200" y="172" textAnchor="middle" fill="#f87171" fontSize="9">- No try-lock</text>

    {/* ReentrantLock */}
    <rect x="430" y="50" width="320" height="130" rx="8" fill="rgba(34, 197, 94, 0.15)" stroke="#22c55e" strokeWidth="2"/>
    <text x="590" y="75" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">ReentrantLock</text>

    <text x="590" y="100" textAnchor="middle" fill="#4ade80" fontSize="9">+ tryLock() with timeout</text>
    <text x="590" y="118" textAnchor="middle" fill="#4ade80" fontSize="9">+ lockInterruptibly()</text>
    <text x="590" y="136" textAnchor="middle" fill="#4ade80" fontSize="9">+ Fair lock option</text>
    <text x="590" y="154" textAnchor="middle" fill="#4ade80" fontSize="9">+ Multiple conditions</text>
    <text x="590" y="172" textAnchor="middle" fill="#f87171" fontSize="9">- Must manually unlock</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function Multithreading({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)
  const [refreshKey, setRefreshKey] = useState(0)
  const [selectedProblem, setSelectedProblem] = useState(null)
  const [userCode, setUserCode] = useState('')
  const [showSolution, setShowSolution] = useState(false)

  useEffect(() => {
    const handleProgressUpdate = () => setRefreshKey(prev => prev + 1)
    window.addEventListener('progressUpdate', handleProgressUpdate)
    return () => window.removeEventListener('progressUpdate', handleProgressUpdate)
  }, [])

  const openProblem = (problem) => { setSelectedProblem(problem); setUserCode(problem.starterCode); setShowSolution(false) }
  const closeProblem = () => { setSelectedProblem(null); setUserCode(''); setShowSolution(false) }

  const practiceProblems = [
    { id: 1, title: 'ExecutorService Basics', difficulty: 'Easy', description: 'Create a fixed thread pool and submit multiple tasks.', example: 'ExecutorService with 4 threads processing 10 tasks',
      instructions: `Create a thread pool using ExecutorService.

**Requirements:**
1. Create a fixed thread pool with 4 threads
2. Submit 10 tasks to the pool
3. Shutdown the executor properly`,
      starterCode: `import java.util.concurrent.*;

public class ThreadPoolDemo {
    public static void main(String[] args) {
        // TODO: Create a fixed thread pool with 4 threads
        ExecutorService executor = null;
        
        // Submit 10 tasks
        for (int i = 1; i <= 10; i++) {
            final int taskId = i;
            // TODO: Submit task to executor
        }
        
        // TODO: Shutdown executor
    }
}`,
      solution: `import java.util.concurrent.*;

public class ThreadPoolDemo {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(4);
        
        for (int i = 1; i <= 10; i++) {
            final int taskId = i;
            executor.submit(() -> {
                System.out.println("Task " + taskId + " running on " + Thread.currentThread().getName());
                try { Thread.sleep(100); } catch (InterruptedException e) {}
            });
        }
        
        executor.shutdown();
        try {
            executor.awaitTermination(5, TimeUnit.SECONDS);
        } catch (InterruptedException e) {
            executor.shutdownNow();
        }
    }
}`
    },
    { id: 2, title: 'CompletableFuture Chain', difficulty: 'Medium', description: 'Chain multiple async operations using CompletableFuture.', example: 'fetchUser().thenApply(getOrders).thenAccept(display)',
      instructions: `Chain async operations with CompletableFuture.

**Requirements:**
1. Create async operation to fetch user
2. Chain with thenApply to process data
3. Chain with thenAccept to display result`,
      starterCode: `import java.util.concurrent.*;

public class CompletableFutureChain {
    public static void main(String[] args) {
        // TODO: Create a CompletableFuture chain
        // 1. supplyAsync to fetch user name
        // 2. thenApply to convert to uppercase
        // 3. thenAccept to print result
        
        CompletableFuture<Void> future = null;
        
        future.join(); // Wait for completion
    }
}`,
      solution: `import java.util.concurrent.*;

public class CompletableFutureChain {
    public static void main(String[] args) {
        CompletableFuture<Void> future = CompletableFuture
            .supplyAsync(() -> {
                System.out.println("Fetching user...");
                return "john_doe";
            })
            .thenApply(name -> {
                System.out.println("Processing: " + name);
                return name.toUpperCase();
            })
            .thenAccept(result -> {
                System.out.println("Result: " + result);
            });
        
        future.join();
    }
}`
    },
    { id: 3, title: 'CountDownLatch Usage', difficulty: 'Medium', description: 'Coordinate multiple threads to start simultaneously using CountDownLatch.', example: 'Race simulation - all threads start at once',
      instructions: `Use CountDownLatch to synchronize thread start.

**Requirements:**
1. Create a latch that all threads wait on
2. Release all threads simultaneously
3. Wait for all threads to complete`,
      starterCode: `import java.util.concurrent.*;

public class RaceSimulation {
    public static void main(String[] args) throws InterruptedException {
        int numRunners = 5;
        // TODO: Create CountDownLatch for start signal
        CountDownLatch startSignal = null;
        // TODO: Create CountDownLatch to wait for all to finish
        CountDownLatch doneSignal = null;
        
        for (int i = 1; i <= numRunners; i++) {
            final int runner = i;
            new Thread(() -> {
                try {
                    System.out.println("Runner " + runner + " ready");
                    // TODO: Wait for start signal
                    System.out.println("Runner " + runner + " running!");
                    Thread.sleep((long)(Math.random() * 1000));
                    System.out.println("Runner " + runner + " finished!");
                    // TODO: Signal done
                } catch (InterruptedException e) {}
            }).start();
        }
        
        Thread.sleep(1000);
        System.out.println("GO!");
        // TODO: Release start signal
        // TODO: Wait for all to finish
        System.out.println("Race complete!");
    }
}`,
      solution: `import java.util.concurrent.*;

public class RaceSimulation {
    public static void main(String[] args) throws InterruptedException {
        int numRunners = 5;
        CountDownLatch startSignal = new CountDownLatch(1);
        CountDownLatch doneSignal = new CountDownLatch(numRunners);
        
        for (int i = 1; i <= numRunners; i++) {
            final int runner = i;
            new Thread(() -> {
                try {
                    System.out.println("Runner " + runner + " ready");
                    startSignal.await();
                    System.out.println("Runner " + runner + " running!");
                    Thread.sleep((long)(Math.random() * 1000));
                    System.out.println("Runner " + runner + " finished!");
                    doneSignal.countDown();
                } catch (InterruptedException e) {}
            }).start();
        }
        
        Thread.sleep(1000);
        System.out.println("GO!");
        startSignal.countDown();
        doneSignal.await();
        System.out.println("Race complete!");
    }
}`
    },
    { id: 4, title: 'Semaphore Rate Limiting', difficulty: 'Hard', description: 'Implement rate limiting using Semaphore to control concurrent access.', example: 'Allow max 3 concurrent database connections',
      instructions: `Use Semaphore to limit concurrent access.

**Requirements:**
1. Create Semaphore with 3 permits
2. Acquire permit before accessing resource
3. Release permit after done`,
      starterCode: `import java.util.concurrent.*;

public class ConnectionPool {
    // TODO: Create Semaphore with 3 permits
    private static Semaphore semaphore = null;
    
    public static void useConnection(int id) {
        try {
            // TODO: Acquire permit
            System.out.println("Connection " + id + " acquired");
            Thread.sleep(2000); // Simulate work
            System.out.println("Connection " + id + " released");
        } catch (InterruptedException e) {
        } finally {
            // TODO: Release permit
        }
    }
    
    public static void main(String[] args) {
        for (int i = 1; i <= 10; i++) {
            final int id = i;
            new Thread(() -> useConnection(id)).start();
        }
    }
}`,
      solution: `import java.util.concurrent.*;

public class ConnectionPool {
    private static Semaphore semaphore = new Semaphore(3);
    
    public static void useConnection(int id) {
        try {
            semaphore.acquire();
            System.out.println("Connection " + id + " acquired (available: " + semaphore.availablePermits() + ")");
            Thread.sleep(2000);
            System.out.println("Connection " + id + " released");
        } catch (InterruptedException e) {
        } finally {
            semaphore.release();
        }
    }
    
    public static void main(String[] args) {
        for (int i = 1; i <= 10; i++) {
            final int id = i;
            new Thread(() -> useConnection(id)).start();
        }
    }
}`
    }
  ]

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'thread-lifecycle',
      name: 'Thread Lifecycle',
      icon: '🔄',
      color: '#3b82f6',
      description: 'Understanding thread states, creation, and lifecycle management in Java.',
      diagram: ThreadLifecycleDiagram,
      details: [
        {
          name: 'Thread States',
          diagram: ThreadLifecycleDiagram,
          explanation: 'A thread can be in one of six states: NEW (created but not started), RUNNABLE (ready to run or running), BLOCKED (waiting for monitor lock), WAITING (waiting indefinitely), TIMED_WAITING (waiting with timeout), and TERMINATED (completed execution). Understanding these states is crucial for debugging concurrency issues.',
          codeExample: `// Thread states demonstration
Thread thread = new Thread(() -> {
    try {
        Thread.sleep(1000);  // TIMED_WAITING
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    }
});

System.out.println(thread.getState());  // NEW
thread.start();
System.out.println(thread.getState());  // RUNNABLE
thread.join();
System.out.println(thread.getState());  // TERMINATED`
        },
        {
          name: 'Creating Threads',
          explanation: 'There are two main ways to create threads: extending Thread class or implementing Runnable interface. The Runnable approach is preferred as it allows your class to extend other classes and promotes composition over inheritance.',
          codeExample: `// Method 1: Extend Thread
class MyThread extends Thread {
    public void run() {
        System.out.println("Thread running: " + getName());
    }
}

// Method 2: Implement Runnable (preferred)
class MyRunnable implements Runnable {
    public void run() {
        System.out.println("Runnable: " + Thread.currentThread().getName());
    }
}

// Method 3: Lambda (Java 8+)
Thread lambdaThread = new Thread(() -> {
    System.out.println("Lambda thread running");
});

// Start threads
new MyThread().start();
new Thread(new MyRunnable()).start();
lambdaThread.start();`
        },
        {
          name: 'Thread Priority',
          explanation: 'Thread priority (1-10) suggests to the scheduler which threads should get more CPU time. MIN_PRIORITY=1, NORM_PRIORITY=5, MAX_PRIORITY=10. Priority is just a hint - the actual scheduling depends on the OS.',
          codeExample: `Thread highPriority = new Thread(() -> {
    System.out.println("High priority task");
});
highPriority.setPriority(Thread.MAX_PRIORITY);  // 10

Thread lowPriority = new Thread(() -> {
    System.out.println("Low priority task");
});
lowPriority.setPriority(Thread.MIN_PRIORITY);   // 1

// Get current thread priority
int priority = Thread.currentThread().getPriority();
System.out.println("Current priority: " + priority);  // Default: 5`
        },
        {
          name: 'Daemon Threads',
          explanation: 'Daemon threads are background threads that do not prevent the JVM from exiting. They are typically used for services like garbage collection. When all non-daemon threads finish, the JVM terminates, killing any remaining daemon threads.',
          codeExample: `Thread daemonThread = new Thread(() -> {
    while (true) {
        System.out.println("Daemon running...");
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            break;
        }
    }
});

// Must set daemon BEFORE starting
daemonThread.setDaemon(true);
daemonThread.start();

System.out.println("Is daemon: " + daemonThread.isDaemon());  // true
// JVM will exit even if daemon is still running`
        }
      ]
    },
    {
      id: 'executor-service',
      name: 'ExecutorService & Thread Pools',
      icon: '🏊',
      color: '#22c55e',
      description: 'Manage thread pools efficiently with ExecutorService for optimal resource utilization.',
      diagram: ExecutorServiceDiagram,
      details: [
        {
          name: 'Fixed Thread Pool',
          diagram: ExecutorServiceDiagram,
          explanation: 'A fixed thread pool maintains a constant number of threads. Tasks wait in a queue when all threads are busy. Use this when you have predictable, steady workloads and want to limit resource usage.',
          codeExample: `import java.util.concurrent.*;

// Create fixed pool with 3 threads
ExecutorService executor = Executors.newFixedThreadPool(3);

// Submit 10 tasks - only 3 run concurrently
for (int i = 0; i < 10; i++) {
    final int taskId = i;
    executor.submit(() -> {
        System.out.println("Task " + taskId + " on " +
            Thread.currentThread().getName());
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    });
}

// Proper shutdown
executor.shutdown();
try {
    if (!executor.awaitTermination(60, TimeUnit.SECONDS)) {
        executor.shutdownNow();
    }
} catch (InterruptedException e) {
    executor.shutdownNow();
}`
        },
        {
          name: 'Cached Thread Pool',
          explanation: 'A cached thread pool creates new threads as needed and reuses idle threads. Threads idle for 60 seconds are terminated. Best for many short-lived tasks but can grow unbounded with long-running tasks.',
          codeExample: `// Creates threads as needed, reuses idle threads
ExecutorService cached = Executors.newCachedThreadPool();

// Good for: burst of short-lived tasks
for (int i = 0; i < 100; i++) {
    cached.submit(() -> {
        // Quick task
        return Math.random() * 100;
    });
}

// WARNING: Can create too many threads with slow tasks
// Use fixed pool for long-running or blocking tasks
cached.shutdown();`
        },
        {
          name: 'Scheduled Thread Pool',
          explanation: 'ScheduledExecutorService runs tasks after a delay or periodically. It is more reliable than Timer and supports multiple threads. Use scheduleAtFixedRate for fixed interval from start, scheduleWithFixedDelay for fixed delay between end and start.',
          codeExample: `import java.util.concurrent.*;

ScheduledExecutorService scheduler =
    Executors.newScheduledThreadPool(2);

// Run once after 5 seconds delay
scheduler.schedule(() -> {
    System.out.println("Delayed task");
}, 5, TimeUnit.SECONDS);

// Run every 2 seconds (from start of each run)
scheduler.scheduleAtFixedRate(() -> {
    System.out.println("Fixed rate: " + System.currentTimeMillis());
}, 0, 2, TimeUnit.SECONDS);

// Run with 2 second delay between end of one and start of next
scheduler.scheduleWithFixedDelay(() -> {
    System.out.println("Fixed delay task");
    try { Thread.sleep(500); } catch (Exception e) {}
}, 0, 2, TimeUnit.SECONDS);`
        },
        {
          name: 'Custom ThreadPoolExecutor',
          explanation: 'For fine-grained control, create ThreadPoolExecutor directly. Configure core/max pool size, keep-alive time, work queue type, thread factory, and rejection policy.',
          codeExample: `import java.util.concurrent.*;

ThreadPoolExecutor executor = new ThreadPoolExecutor(
    2,                      // corePoolSize
    4,                      // maximumPoolSize
    60L,                    // keepAliveTime
    TimeUnit.SECONDS,       // time unit
    new ArrayBlockingQueue<>(10),  // work queue
    new ThreadPoolExecutor.CallerRunsPolicy()  // rejection policy
);

// Rejection policies:
// AbortPolicy - throws RejectedExecutionException (default)
// CallerRunsPolicy - caller thread runs the task
// DiscardPolicy - silently discard
// DiscardOldestPolicy - discard oldest queued task

// Monitor pool stats
System.out.println("Pool size: " + executor.getPoolSize());
System.out.println("Active: " + executor.getActiveCount());
System.out.println("Queue size: " + executor.getQueue().size());`
        }
      ]
    },
    {
      id: 'callable-future',
      name: 'Callable & Future',
      icon: '📦',
      color: '#f59e0b',
      description: 'Return values and handle exceptions from asynchronous tasks with Callable and Future.',
      diagram: FutureCallableDiagram,
      details: [
        {
          name: 'Callable vs Runnable',
          diagram: FutureCallableDiagram,
          explanation: 'Callable returns a value and can throw checked exceptions, unlike Runnable. Use Callable when you need a result from your async task. The call() method returns V, whereas run() returns void.',
          codeExample: `import java.util.concurrent.*;

// Runnable - no return value, no checked exceptions
Runnable runnable = () -> System.out.println("No return");

// Callable - returns value, can throw exceptions
Callable<Integer> callable = () -> {
    Thread.sleep(1000);
    return 42;
};

// Submit and get result
ExecutorService executor = Executors.newSingleThreadExecutor();
Future<Integer> future = executor.submit(callable);

try {
    Integer result = future.get();  // Blocks until complete
    System.out.println("Result: " + result);  // 42
} catch (InterruptedException | ExecutionException e) {
    e.printStackTrace();
}
executor.shutdown();`
        },
        {
          name: 'Future Operations',
          explanation: 'Future represents the result of an async computation. Use get() to retrieve the result (blocking), get(timeout) to wait with timeout, isDone() to check completion, isCancelled() to check cancellation, and cancel() to attempt cancellation.',
          codeExample: `ExecutorService executor = Executors.newSingleThreadExecutor();

Future<String> future = executor.submit(() -> {
    Thread.sleep(2000);
    return "Completed!";
});

// Check status without blocking
System.out.println("Is done: " + future.isDone());  // false

// Get with timeout
try {
    String result = future.get(1, TimeUnit.SECONDS);
} catch (TimeoutException e) {
    System.out.println("Timeout! Still running...");
}

// Cancel the task
boolean cancelled = future.cancel(true);  // true = interrupt if running
System.out.println("Cancelled: " + future.isCancelled());

// Get blocks until done or cancelled
try {
    String result = future.get();
} catch (CancellationException e) {
    System.out.println("Task was cancelled");
}
executor.shutdown();`
        },
        {
          name: 'CompletableFuture',
          explanation: 'CompletableFuture provides a powerful API for async programming with chaining, combining, and exception handling. It supports both async callbacks (thenApply, thenAccept) and blocking operations.',
          codeExample: `import java.util.concurrent.*;

// Create async task
CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
    return "Hello";
});

// Chain transformations
CompletableFuture<String> result = future
    .thenApply(s -> s + " World")           // Transform
    .thenApply(String::toUpperCase)          // Transform again
    .exceptionally(ex -> "Error: " + ex);    // Handle errors

// Non-blocking callback
result.thenAccept(System.out::println);  // HELLO WORLD

// Combine multiple futures
CompletableFuture<String> f1 = CompletableFuture.supplyAsync(() -> "Hello");
CompletableFuture<String> f2 = CompletableFuture.supplyAsync(() -> "World");

f1.thenCombine(f2, (s1, s2) -> s1 + " " + s2)
  .thenAccept(System.out::println);  // Hello World

// Wait for all
CompletableFuture.allOf(f1, f2).join();`
        },
        {
          name: 'invokeAll & invokeAny',
          explanation: 'ExecutorService provides invokeAll() to run all tasks and get all results, and invokeAny() to run tasks and return the first successful result. Useful for parallel processing with collection of tasks.',
          codeExample: `ExecutorService executor = Executors.newFixedThreadPool(3);

List<Callable<Integer>> tasks = Arrays.asList(
    () -> { Thread.sleep(2000); return 1; },
    () -> { Thread.sleep(1000); return 2; },
    () -> { Thread.sleep(3000); return 3; }
);

// invokeAll - execute all, wait for all to complete
List<Future<Integer>> futures = executor.invokeAll(tasks);
for (Future<Integer> f : futures) {
    System.out.println(f.get());  // 1, 2, 3 (in order)
}

// invokeAny - return first successful result
// Other tasks are cancelled
Integer fastest = executor.invokeAny(tasks);
System.out.println("Fastest: " + fastest);  // 2 (finished first)

executor.shutdown();`
        }
      ]
    },
    {
      id: 'synchronization',
      name: 'Synchronization',
      icon: '🔒',
      color: '#ef4444',
      description: 'Protect shared resources and prevent race conditions with synchronization mechanisms.',
      diagram: SynchronizationDiagram,
      details: [
        {
          name: 'synchronized Keyword',
          diagram: SynchronizationDiagram,
          explanation: 'The synchronized keyword ensures only one thread can execute a block of code at a time. It uses intrinsic locks (monitors) on objects. Use synchronized methods or blocks to protect shared mutable state.',
          codeExample: `class Counter {
    private int count = 0;

    // Synchronized method - locks 'this'
    public synchronized void increment() {
        count++;  // Now thread-safe
    }

    // Synchronized block - more granular
    public void incrementBlock() {
        synchronized (this) {
            count++;
        }
    }

    // Static synchronized - locks Class object
    private static int staticCount = 0;
    public static synchronized void incrementStatic() {
        staticCount++;
    }

    // Synchronized on specific lock object
    private final Object lock = new Object();
    public void incrementWithLock() {
        synchronized (lock) {
            count++;
        }
    }
}`
        },
        {
          name: 'ReentrantLock',
          diagram: ReentrantLockDiagram,
          explanation: 'ReentrantLock provides more flexibility than synchronized: tryLock with timeout, interruptible locking, fair ordering, and multiple conditions. Always use try-finally to ensure unlock.',
          codeExample: `import java.util.concurrent.locks.*;

class SafeCounter {
    private int count = 0;
    private final ReentrantLock lock = new ReentrantLock();

    public void increment() {
        lock.lock();
        try {
            count++;
        } finally {
            lock.unlock();  // ALWAYS in finally!
        }
    }

    public boolean tryIncrement() {
        // Non-blocking attempt
        if (lock.tryLock()) {
            try {
                count++;
                return true;
            } finally {
                lock.unlock();
            }
        }
        return false;  // Couldn't acquire lock
    }

    public void incrementWithTimeout() throws InterruptedException {
        // Wait up to 1 second
        if (lock.tryLock(1, TimeUnit.SECONDS)) {
            try {
                count++;
            } finally {
                lock.unlock();
            }
        }
    }
}`
        },
        {
          name: 'ReadWriteLock',
          explanation: 'ReadWriteLock allows multiple concurrent readers OR a single writer. Use when reads are much more frequent than writes. Readers do not block other readers, but writers have exclusive access.',
          codeExample: `import java.util.concurrent.locks.*;

class Cache {
    private final Map<String, String> map = new HashMap<>();
    private final ReadWriteLock rwLock = new ReentrantReadWriteLock();
    private final Lock readLock = rwLock.readLock();
    private final Lock writeLock = rwLock.writeLock();

    public String get(String key) {
        readLock.lock();  // Multiple readers allowed
        try {
            return map.get(key);
        } finally {
            readLock.unlock();
        }
    }

    public void put(String key, String value) {
        writeLock.lock();  // Exclusive access
        try {
            map.put(key, value);
        } finally {
            writeLock.unlock();
        }
    }

    public int size() {
        readLock.lock();
        try {
            return map.size();
        } finally {
            readLock.unlock();
        }
    }
}`
        },
        {
          name: 'Deadlock Prevention',
          explanation: 'Deadlock occurs when threads wait for each other indefinitely. Prevent by: always acquiring locks in the same order, using tryLock with timeout, avoiding nested locks, and using lock ordering.',
          codeExample: `// DEADLOCK EXAMPLE - DON'T DO THIS
class DeadlockExample {
    private final Object lock1 = new Object();
    private final Object lock2 = new Object();

    // Thread 1 calls this
    public void method1() {
        synchronized (lock1) {
            synchronized (lock2) {  // Waits for lock2
                // ...
            }
        }
    }

    // Thread 2 calls this - DEADLOCK!
    public void method2() {
        synchronized (lock2) {
            synchronized (lock1) {  // Waits for lock1
                // ...
            }
        }
    }
}

// SOLUTION: Always acquire locks in same order
public void safeMethods() {
    synchronized (lock1) {  // Always lock1 first
        synchronized (lock2) {
            // ...
        }
    }
}

// Or use tryLock with timeout
public void tryLockApproach() {
    while (true) {
        if (lock1.tryLock()) {
            try {
                if (lock2.tryLock()) {
                    try {
                        // Got both locks
                        return;
                    } finally { lock2.unlock(); }
                }
            } finally { lock1.unlock(); }
        }
        Thread.sleep(50);  // Back off and retry
    }
}`
        }
      ]
    },
    {
      id: 'thread-coordination',
      name: 'Thread Coordination',
      icon: '🤝',
      color: '#8b5cf6',
      description: 'Coordinate thread execution with latches, barriers, semaphores, and wait/notify.',
      diagram: CountDownLatchDiagram,
      details: [
        {
          name: 'CountDownLatch',
          diagram: CountDownLatchDiagram,
          explanation: 'CountDownLatch allows threads to wait until a set of operations completes. Initialize with a count, threads call countDown(), waiting threads call await(). Cannot be reset - use CyclicBarrier if you need reuse.',
          codeExample: `import java.util.concurrent.*;

// Wait for 3 workers to initialize
CountDownLatch latch = new CountDownLatch(3);

for (int i = 0; i < 3; i++) {
    final int workerId = i;
    new Thread(() -> {
        System.out.println("Worker " + workerId + " initializing...");
        try {
            Thread.sleep((long)(Math.random() * 2000));
        } catch (InterruptedException e) {}
        System.out.println("Worker " + workerId + " ready!");
        latch.countDown();  // Decrease count by 1
    }).start();
}

System.out.println("Main waiting for workers...");
latch.await();  // Block until count reaches 0
System.out.println("All workers ready! Starting main work...");

// With timeout
boolean completed = latch.await(5, TimeUnit.SECONDS);
if (!completed) {
    System.out.println("Timeout - not all workers ready");
}`
        },
        {
          name: 'CyclicBarrier',
          explanation: 'CyclicBarrier lets a set of threads wait for each other at a common barrier point. Unlike CountDownLatch, it can be reused. Optional barrier action runs when all parties arrive.',
          codeExample: `import java.util.concurrent.*;

// 3 parties must reach barrier
CyclicBarrier barrier = new CyclicBarrier(3, () -> {
    // Runs when all parties arrive
    System.out.println("=== All parties at barrier ===");
});

for (int i = 0; i < 3; i++) {
    final int partyId = i;
    new Thread(() -> {
        try {
            System.out.println("Party " + partyId + " working on phase 1...");
            Thread.sleep((long)(Math.random() * 1000));
            System.out.println("Party " + partyId + " waiting at barrier");
            barrier.await();  // Wait for others

            // Phase 2 - barrier is reset automatically
            System.out.println("Party " + partyId + " working on phase 2...");
            Thread.sleep((long)(Math.random() * 1000));
            barrier.await();  // Can reuse barrier

            System.out.println("Party " + partyId + " done!");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }).start();
}`
        },
        {
          name: 'Semaphore',
          diagram: SemaphoreDiagram,
          explanation: 'Semaphore limits the number of threads that can access a resource concurrently. Use acquire() to get a permit (blocks if none available) and release() to return it. Great for connection pools and rate limiting.',
          codeExample: `import java.util.concurrent.*;

// Allow max 3 concurrent database connections
Semaphore dbPool = new Semaphore(3);

for (int i = 0; i < 10; i++) {
    final int userId = i;
    new Thread(() -> {
        try {
            System.out.println("User " + userId + " waiting for connection...");
            dbPool.acquire();  // Get permit, blocks if none available
            try {
                System.out.println("User " + userId + " connected!");
                Thread.sleep(2000);  // Use connection
            } finally {
                System.out.println("User " + userId + " releasing connection");
                dbPool.release();  // Return permit
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }).start();
}

// Check available permits
System.out.println("Available: " + dbPool.availablePermits());

// Try acquire with timeout
boolean acquired = dbPool.tryAcquire(1, TimeUnit.SECONDS);`
        },
        {
          name: 'wait/notify',
          explanation: 'wait() releases the lock and waits for notification. notify() wakes one waiting thread, notifyAll() wakes all. Always call in synchronized block and use while loop (not if) to check condition.',
          codeExample: `class BlockingQueue<T> {
    private final Queue<T> queue = new LinkedList<>();
    private final int capacity;

    public BlockingQueue(int capacity) {
        this.capacity = capacity;
    }

    public synchronized void put(T item) throws InterruptedException {
        // MUST use while, not if (spurious wakeups)
        while (queue.size() == capacity) {
            wait();  // Release lock and wait
        }
        queue.add(item);
        notifyAll();  // Wake up consumers
    }

    public synchronized T take() throws InterruptedException {
        while (queue.isEmpty()) {
            wait();  // Release lock and wait
        }
        T item = queue.poll();
        notifyAll();  // Wake up producers
        return item;
    }
}

// Usage
BlockingQueue<String> bq = new BlockingQueue<>(10);

// Producer thread
new Thread(() -> {
    bq.put("item1");
}).start();

// Consumer thread
new Thread(() -> {
    String item = bq.take();
}).start();`
        }
      ]
    },
    {
      id: 'thread-local',
      name: 'ThreadLocal',
      icon: '📍',
      color: '#ec4899',
      description: 'Store thread-specific data without synchronization using ThreadLocal variables.',
      diagram: ThreadLocalDiagram,
      details: [
        {
          name: 'Basic ThreadLocal',
          diagram: ThreadLocalDiagram,
          explanation: 'ThreadLocal provides thread-isolated variables. Each thread has its own independent copy, so no synchronization is needed. Perfect for per-thread context like user sessions, transactions, or database connections.',
          codeExample: `public class UserContext {
    // Each thread gets its own copy
    private static final ThreadLocal<String> currentUser =
        new ThreadLocal<>();

    public static void setUser(String user) {
        currentUser.set(user);
    }

    public static String getUser() {
        return currentUser.get();
    }

    public static void clear() {
        currentUser.remove();  // Prevent memory leaks!
    }
}

// Usage in different threads
new Thread(() -> {
    UserContext.setUser("Alice");
    System.out.println(UserContext.getUser());  // Alice
    UserContext.clear();
}, "Thread-1").start();

new Thread(() -> {
    UserContext.setUser("Bob");
    System.out.println(UserContext.getUser());  // Bob
    UserContext.clear();
}, "Thread-2").start();`
        },
        {
          name: 'Initial Value',
          explanation: 'Use withInitial() to provide a default value lazily when the thread first accesses it. The supplier is called once per thread. Useful for creating per-thread resources like formatters or random generators.',
          codeExample: `// With initial value using supplier
private static final ThreadLocal<SimpleDateFormat> dateFormat =
    ThreadLocal.withInitial(() -> new SimpleDateFormat("yyyy-MM-dd"));

// Each thread gets its own SimpleDateFormat instance
public String formatDate(Date date) {
    return dateFormat.get().format(date);  // Thread-safe!
}

// ThreadLocal Random
private static final ThreadLocal<Random> random =
    ThreadLocal.withInitial(Random::new);

public int nextInt() {
    return random.get().nextInt();  // No contention
}

// Request context
private static final ThreadLocal<RequestContext> requestContext =
    ThreadLocal.withInitial(RequestContext::new);`
        },
        {
          name: 'InheritableThreadLocal',
          explanation: 'InheritableThreadLocal allows child threads to inherit values from parent thread. The value is copied when the child thread is created. Useful for propagating context to child threads.',
          codeExample: `// Child threads inherit value from parent
private static final InheritableThreadLocal<String> inheritedContext =
    new InheritableThreadLocal<>();

public static void main(String[] args) {
    inheritedContext.set("ParentValue");

    new Thread(() -> {
        // Child inherits parent's value
        System.out.println(inheritedContext.get());  // ParentValue

        // Child can modify its own copy
        inheritedContext.set("ChildValue");
        System.out.println(inheritedContext.get());  // ChildValue
    }).start();

    Thread.sleep(100);
    // Parent still has original value
    System.out.println(inheritedContext.get());  // ParentValue
}

// Note: Does NOT work with thread pools!
// Use TransmittableThreadLocal from alibaba/transmittable-thread-local`
        },
        {
          name: 'Memory Leak Prevention',
          explanation: 'ThreadLocal can cause memory leaks in thread pools because threads are reused. Always call remove() when done, especially in web applications. Use try-finally to ensure cleanup.',
          codeExample: `public class SafeThreadLocal {
    private static final ThreadLocal<ExpensiveObject> context =
        new ThreadLocal<>();

    // ALWAYS clean up in thread pools
    public void processRequest(Request request) {
        try {
            context.set(new ExpensiveObject(request));

            // Process request using context
            doWork();

        } finally {
            // CRITICAL: Remove to prevent memory leak
            context.remove();
        }
    }

    // For web apps, use Filter/Interceptor
    public class ContextFilter implements Filter {
        public void doFilter(ServletRequest req, ServletResponse res,
                           FilterChain chain) throws IOException {
            try {
                context.set(createContext(req));
                chain.doFilter(req, res);
            } finally {
                context.remove();  // Clean up after every request
            }
        }
    }
}`
        }
      ]
    },
    {
      id: 'volatile-atomic',
      name: 'Volatile & Atomics',
      icon: '⚛️',
      color: '#06b6d4',
      description: 'Ensure memory visibility and thread-safe operations without locks.',
      diagram: VolatileDiagram,
      details: [
        {
          name: 'volatile Keyword',
          diagram: VolatileDiagram,
          explanation: 'volatile ensures visibility - writes by one thread are immediately visible to other threads. It prevents CPU caching issues but does NOT provide atomicity for compound operations like count++.',
          codeExample: `class VisibilityExample {
    // Without volatile, other threads may see stale value
    private volatile boolean running = true;

    public void run() {
        while (running) {  // Always reads from main memory
            doWork();
        }
    }

    public void stop() {
        running = false;  // Immediately visible to other threads
    }
}

// Double-checked locking pattern
class Singleton {
    // volatile prevents instruction reordering
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
}

// volatile does NOT make this thread-safe!
private volatile int count = 0;
count++;  // NOT atomic: read, increment, write`
        },
        {
          name: 'AtomicInteger',
          diagram: AtomicOperationsDiagram,
          explanation: 'AtomicInteger provides thread-safe integer operations without locks using CAS (Compare-And-Swap). Use for counters, sequence generators, and statistics in concurrent code.',
          codeExample: `import java.util.concurrent.atomic.*;

AtomicInteger counter = new AtomicInteger(0);

// Atomic increment
int value = counter.incrementAndGet();  // Returns new value
int old = counter.getAndIncrement();    // Returns old value

// Atomic add
counter.addAndGet(10);      // Add and return new
counter.getAndAdd(10);      // Return old, then add

// Compare and swap
boolean success = counter.compareAndSet(20, 30);  // If 20, set to 30

// Update with function
counter.updateAndGet(x -> x * 2);  // Double the value atomically

// Accumulate
counter.accumulateAndGet(5, Integer::max);  // Set to max of current and 5

// Use in concurrent counter
class ConcurrentCounter {
    private final AtomicInteger count = new AtomicInteger(0);

    public void increment() { count.incrementAndGet(); }
    public int get() { return count.get(); }
}`
        },
        {
          name: 'AtomicReference',
          explanation: 'AtomicReference provides atomic operations on object references. Use for lock-free data structures, immutable object updates, and the compare-and-swap pattern with objects.',
          codeExample: `import java.util.concurrent.atomic.*;

// Atomic reference to immutable object
AtomicReference<ImmutableConfig> config =
    new AtomicReference<>(new ImmutableConfig());

// Atomic update
config.set(newConfig);
ImmutableConfig current = config.get();

// Compare and swap
ImmutableConfig expected = config.get();
ImmutableConfig newValue = expected.withProperty("key", "value");
boolean updated = config.compareAndSet(expected, newValue);

// Update atomically using function
config.updateAndGet(c -> c.withProperty("key", "value"));

// Lock-free stack (simplified)
class LockFreeStack<T> {
    private final AtomicReference<Node<T>> top =
        new AtomicReference<>();

    public void push(T item) {
        Node<T> newHead = new Node<>(item);
        Node<T> oldHead;
        do {
            oldHead = top.get();
            newHead.next = oldHead;
        } while (!top.compareAndSet(oldHead, newHead));
    }
}`
        },
        {
          name: 'LongAdder',
          explanation: 'LongAdder is more efficient than AtomicLong for high-contention counters. It spreads updates across cells and sums them when needed. Use for statistics and metrics with many concurrent updates.',
          codeExample: `import java.util.concurrent.atomic.*;

// AtomicLong - single variable, more contention
AtomicLong atomicLong = new AtomicLong();

// LongAdder - spreads across cells, better for high contention
LongAdder adder = new LongAdder();

// Both are thread-safe, but LongAdder scales better
for (int i = 0; i < 100; i++) {
    new Thread(() -> {
        for (int j = 0; j < 10000; j++) {
            adder.increment();  // Low contention
        }
    }).start();
}

// Get the sum (may be slightly stale during updates)
long sum = adder.sum();
long sumThenReset = adder.sumThenReset();

// LongAccumulator - custom accumulation
LongAccumulator maxFinder = new LongAccumulator(Long::max, 0);
maxFinder.accumulate(5);
maxFinder.accumulate(10);
maxFinder.accumulate(3);
System.out.println(maxFinder.get());  // 10`
        }
      ]
    },
    {
      id: 'concurrent-collections',
      name: 'Concurrent Collections',
      icon: '📚',
      color: '#84cc16',
      description: 'Thread-safe collections designed for concurrent access without external synchronization.',
      details: [
        {
          name: 'ConcurrentHashMap',
          explanation: 'ConcurrentHashMap allows concurrent reads and writes with minimal contention. It uses lock striping for better scalability. Use compute(), merge(), and putIfAbsent() for atomic operations.',
          codeExample: `import java.util.concurrent.*;

ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();

// Basic operations
map.put("key", 1);
Integer value = map.get("key");

// Atomic operations
map.putIfAbsent("key", 0);  // Only if not present

// Atomic compute
map.compute("counter", (k, v) -> (v == null) ? 1 : v + 1);

// Atomic merge
map.merge("counter", 1, Integer::sum);  // Add or initialize

// Parallel operations (Java 8+)
map.forEach(2, (k, v) -> System.out.println(k + ": " + v));

long sum = map.reduceValues(2, Integer::sum);

// Search until found
String found = map.search(2, (k, v) -> v > 100 ? k : null);

// DO NOT iterate and modify separately
// BAD: if (map.containsKey(k)) map.put(k, newValue)
// GOOD: map.compute(k, (key, old) -> newValue)`
        },
        {
          name: 'CopyOnWriteArrayList',
          explanation: 'CopyOnWriteArrayList creates a new copy on every modification. Reads never block and see a consistent snapshot. Use when reads vastly outnumber writes, like event listener lists.',
          codeExample: `import java.util.concurrent.*;

// Ideal for: rarely modified, frequently iterated
CopyOnWriteArrayList<String> listeners = new CopyOnWriteArrayList<>();

// Modifications create a new copy
listeners.add("listener1");
listeners.addIfAbsent("listener1");  // No duplicate

// Iteration is safe - uses snapshot
for (String listener : listeners) {
    // Can safely modify during iteration
    if (shouldRemove(listener)) {
        listeners.remove(listener);  // Modifies different copy
    }
}

// Event listener pattern
class EventSource {
    private final CopyOnWriteArrayList<EventListener> listeners =
        new CopyOnWriteArrayList<>();

    public void addListener(EventListener l) { listeners.add(l); }
    public void removeListener(EventListener l) { listeners.remove(l); }

    public void fireEvent(Event e) {
        // No synchronization needed
        for (EventListener l : listeners) {
            l.onEvent(e);
        }
    }
}`
        },
        {
          name: 'BlockingQueue',
          explanation: 'BlockingQueue provides thread-safe queues with blocking operations. put() blocks when full, take() blocks when empty. Perfect for producer-consumer patterns.',
          codeExample: `import java.util.concurrent.*;

// Fixed capacity - blocks when full
BlockingQueue<Task> queue = new ArrayBlockingQueue<>(100);

// Unbounded (careful with memory!)
BlockingQueue<Task> linked = new LinkedBlockingQueue<>();

// Priority ordering
BlockingQueue<Task> priority = new PriorityBlockingQueue<>();

// Producer
executor.submit(() -> {
    while (true) {
        Task task = createTask();
        queue.put(task);  // Blocks if queue is full
    }
});

// Consumer
executor.submit(() -> {
    while (true) {
        Task task = queue.take();  // Blocks if queue is empty
        process(task);
    }
});

// Non-blocking alternatives
boolean added = queue.offer(task);  // Returns false if full
Task polled = queue.poll();  // Returns null if empty

// With timeout
boolean added = queue.offer(task, 1, TimeUnit.SECONDS);
Task task = queue.poll(1, TimeUnit.SECONDS);`
        },
        {
          name: 'ConcurrentLinkedQueue',
          explanation: 'ConcurrentLinkedQueue is an unbounded, lock-free queue using CAS operations. Ideal for high-throughput scenarios. Use offer/poll methods - add/remove throw exceptions.',
          codeExample: `import java.util.concurrent.*;

// Lock-free, unbounded queue
ConcurrentLinkedQueue<String> queue = new ConcurrentLinkedQueue<>();

// Non-blocking operations
queue.offer("item1");  // Always returns true (unbounded)
queue.offer("item2");

String head = queue.poll();  // Returns null if empty
String peeked = queue.peek();  // Look without removing

// Size is O(n) - avoid in hot path!
int size = queue.size();  // Traverses entire queue

// Better to check isEmpty
if (!queue.isEmpty()) {
    String item = queue.poll();
}

// Work stealing pattern
class WorkStealer {
    private final ConcurrentLinkedQueue<Task>[] queues;

    public Task steal(int from) {
        return queues[from].poll();  // Lock-free steal
    }
}`
        }
      ]
    },
    {
      id: 'best-practices',
      name: 'Best Practices',
      icon: '✅',
      color: '#f97316',
      description: 'Guidelines and patterns for writing safe, efficient, and maintainable concurrent code.',
      details: [
        {
          name: 'Immutability',
          explanation: 'Immutable objects are inherently thread-safe. No synchronization needed for objects that cannot change. Use final fields, no setters, and defensive copies for safe publication.',
          codeExample: `// Immutable class - inherently thread-safe
public final class ImmutableUser {
    private final String name;
    private final List<String> roles;

    public ImmutableUser(String name, List<String> roles) {
        this.name = name;
        // Defensive copy to prevent external modification
        this.roles = List.copyOf(roles);  // Java 10+
        // Or: Collections.unmodifiableList(new ArrayList<>(roles))
    }

    public String getName() { return name; }
    public List<String> getRoles() { return roles; }  // Already immutable

    // Create modified copy instead of mutating
    public ImmutableUser withName(String newName) {
        return new ImmutableUser(newName, roles);
    }
}

// Safe publication of immutable objects
private volatile ImmutableUser currentUser;

public void updateUser(String name, List<String> roles) {
    currentUser = new ImmutableUser(name, roles);  // Atomic update
}`
        },
        {
          name: 'Thread Confinement',
          explanation: 'Thread confinement ensures data is only accessed by one thread, eliminating the need for synchronization. Use stack confinement, ThreadLocal, or single-threaded executors.',
          codeExample: `// Stack confinement - local variables are thread-safe
public int calculate(int[] data) {
    int sum = 0;  // Stack confined - thread safe
    for (int val : data) {
        sum += val;
    }
    return sum;
}

// ThreadLocal confinement
private static final ThreadLocal<SimpleDateFormat> dateFormat =
    ThreadLocal.withInitial(() -> new SimpleDateFormat("yyyy-MM-dd"));

public String format(Date date) {
    return dateFormat.get().format(date);  // Each thread has own instance
}

// Single-threaded executor confinement
ExecutorService singleThread = Executors.newSingleThreadExecutor();

// All tasks access shared state, but run sequentially
class StateManager {
    private Map<String, Object> state = new HashMap<>();  // Not thread-safe!

    public void update(String key, Object value) {
        singleThread.submit(() -> state.put(key, value));  // Safe!
    }
}`
        },
        {
          name: 'Avoid Common Pitfalls',
          explanation: 'Common concurrency bugs include race conditions, deadlocks, livelocks, and starvation. Use established patterns, minimize shared mutable state, and prefer higher-level concurrency utilities.',
          codeExample: `// PITFALL 1: Check-then-act race condition
// BAD
if (!map.containsKey(key)) {
    map.put(key, value);  // Another thread might add between check and put
}
// GOOD
map.putIfAbsent(key, value);

// PITFALL 2: Compound actions
// BAD
if (counter.get() < MAX) {
    counter.incrementAndGet();  // Race condition!
}
// GOOD
counter.updateAndGet(c -> c < MAX ? c + 1 : c);

// PITFALL 3: Publishing incomplete objects
// BAD - object might be seen before fully constructed
public static Holder holder;
public void initialize() {
    holder = new Holder(42);  // Unsafe publication
}
// GOOD - use volatile or AtomicReference
public static volatile Holder holder;

// PITFALL 4: Deadlock from inconsistent lock ordering
// Always acquire locks in consistent order
// Use tryLock with timeout
// Avoid calling unknown code while holding locks`
        },
        {
          name: 'Testing Concurrent Code',
          explanation: 'Concurrent bugs are hard to reproduce. Use stress testing, thread sanitizers, and concurrent testing frameworks. Run tests with many threads and iterations to increase chance of finding bugs.',
          codeExample: `import java.util.concurrent.*;

// Stress test a concurrent counter
public void testConcurrentCounter() throws InterruptedException {
    Counter counter = new Counter();
    int threads = 100;
    int iterations = 10000;
    CountDownLatch latch = new CountDownLatch(threads);

    for (int i = 0; i < threads; i++) {
        new Thread(() -> {
            for (int j = 0; j < iterations; j++) {
                counter.increment();
            }
            latch.countDown();
        }).start();
    }

    latch.await();
    assertEquals(threads * iterations, counter.get());
}

// Use CyclicBarrier to maximize contention
public void testRaceCondition() throws Exception {
    int threads = 10;
    CyclicBarrier barrier = new CyclicBarrier(threads + 1);
    SharedState state = new SharedState();

    for (int i = 0; i < threads; i++) {
        new Thread(() -> {
            barrier.await();  // All threads start together
            state.modify();
            barrier.await();  // Wait for all to finish
        }).start();
    }

    barrier.await();  // Release all threads
    barrier.await();  // Wait for completion
    state.verify();
}`
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
      { name: 'Multithreading', icon: '🧵', page: 'Multithreading' }
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

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div style={containerStyle}>
      {/* Header with title and back button */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Java Multithreading</h1>
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
          ← Back to Java
        </button>
      </div>

      {/* Breadcrumb navigation */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={MULTITHREADING_COLORS}
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
        primaryColor={MULTITHREADING_COLORS.primary}
      />


      {/* Introduction */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto 2rem',
        padding: '1.5rem',
        background: 'rgba(6, 182, 212, 0.1)',
        border: '1px solid rgba(6, 182, 212, 0.2)',
        borderRadius: '1rem'
      }}>
        <p style={{ color: '#94a3b8', lineHeight: '1.8', margin: 0, fontSize: '1.1rem' }}>
          Master Java concurrency with thread pools, executors, synchronization primitives, and coordination mechanisms.
          Learn to write safe, efficient multithreaded code using modern Java concurrency utilities.
        </p>
      </div>

      {/* Practice Exercises Section */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem', background: 'rgba(15, 23, 42, 0.8)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
        <h2 style={{ color: '#06b6d4', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span>📝</span> Practice Exercises</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1rem' }}>Click on an exercise to practice. Complete the code challenge and mark as done.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {practiceProblems.map((problem) => {
            const problemId = `Multithreading-${problem.id}`
            const isCompleted = isProblemCompleted(problemId)
            return (
              <div key={problem.id} onClick={() => openProblem(problem)} style={{ background: isCompleted ? 'rgba(34, 197, 94, 0.1)' : 'rgba(30, 41, 59, 0.8)', borderRadius: '0.75rem', padding: '1rem', border: `1px solid ${isCompleted ? '#22c55e' : '#334155'}`, cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#06b6d4'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(6, 182, 212, 0.2)' }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = isCompleted ? '#22c55e' : '#334155'; e.currentTarget.style.boxShadow = 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                  <h4 style={{ color: '#e2e8f0', margin: 0, fontSize: '0.95rem' }}>{problem.title}</h4>
                  <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '600', backgroundColor: problem.difficulty === 'Easy' ? 'rgba(34, 197, 94, 0.2)' : problem.difficulty === 'Medium' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)', color: problem.difficulty === 'Easy' ? '#22c55e' : problem.difficulty === 'Medium' ? '#f59e0b' : '#ef4444' }}>{problem.difficulty}</span>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0.5rem 0', lineHeight: '1.4' }}>{problem.description}</p>
                <p style={{ color: '#64748b', fontSize: '0.75rem', margin: '0.5rem 0', fontStyle: 'italic' }}>{problem.example}</p>
                <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#06b6d4', fontSize: '0.8rem', fontWeight: '500' }}>Click to practice →</span>
                  <div onClick={(e) => e.stopPropagation()}><CompletionCheckbox problemId={problemId} compact /></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Practice Problem Modal */}
      {selectedProblem && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }} onClick={closeProblem}>
          <div style={{ backgroundColor: '#1f2937', borderRadius: '1rem', width: '95vw', maxWidth: '1400px', height: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '2px solid #06b6d4' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #374151', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <h2 style={{ color: '#e2e8f0', margin: 0, fontSize: '1.5rem' }}>{selectedProblem.title}</h2>
                <span style={{ padding: '0.3rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600', backgroundColor: selectedProblem.difficulty === 'Easy' ? 'rgba(34, 197, 94, 0.2)' : selectedProblem.difficulty === 'Medium' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)', color: selectedProblem.difficulty === 'Easy' ? '#22c55e' : selectedProblem.difficulty === 'Medium' ? '#f59e0b' : '#ef4444' }}>{selectedProblem.difficulty}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <CompletionCheckbox problemId={`Multithreading-${selectedProblem.id}`} compact />
                <button onClick={closeProblem} style={{ padding: '0.5rem 1rem', backgroundColor: '#374151', color: '#e2e8f0', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem' }}>✕ Close</button>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', flex: 1, overflow: 'hidden' }}>
              <div style={{ padding: '1.5rem', borderRight: '1px solid #374151', overflowY: 'auto' }}>
                <h3 style={{ color: '#06b6d4', marginTop: 0, marginBottom: '1rem' }}>📋 Instructions</h3>
                <div style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{selectedProblem.instructions.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} style={{ color: '#e2e8f0' }}>{part}</strong> : part)}</div>
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  <button onClick={() => { setShowSolution(!showSolution); if (!showSolution) setUserCode(selectedProblem.solution) }} style={{ padding: '0.5rem 1rem', backgroundColor: showSolution ? '#ef4444' : '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>{showSolution ? '🔒 Hide Solution' : '💡 Show Solution'}</button>
                  <button onClick={() => { setUserCode(selectedProblem.starterCode); setShowSolution(false) }} style={{ padding: '0.5rem 1rem', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>🔄 Reset Code</button>
                  <button onClick={() => navigator.clipboard.writeText(userCode)} style={{ padding: '0.5rem 1rem', backgroundColor: '#6366f1', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>📋 Copy Code</button>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                  <textarea value={userCode} onChange={(e) => setUserCode(e.target.value)} style={{ flex: 1, width: '100%', padding: '1rem', fontFamily: 'Consolas, Monaco, "Courier New", monospace', fontSize: '0.9rem', backgroundColor: '#111827', color: '#e2e8f0', border: '1px solid #374151', borderRadius: '8px', resize: 'none', lineHeight: '1.5' }} spellCheck={false} />
                </div>
                <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.75rem', marginBottom: 0 }}>💡 Copy this code to your IDE to run and test. Mark as complete when you've solved it!</p>
              </div>
            </div>
          </div>
        </div>
      )}

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
              border: `1px solid ${selectedConcept.color}40`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Breadcrumb */}
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
              onMainMenu={breadcrumb?.onMainMenu || onBack}
              colors={MULTITHREADING_COLORS}
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

export default Multithreading
