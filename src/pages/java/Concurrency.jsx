/**
 * Java Concurrency Page
 *
 * Covers thread safety, synchronization, locks, and atomic operations.
 * Uses modal-based navigation with concepts and details.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const CONCURRENCY_COLORS = {
  primary: '#10b981',           // Green - main accent color
  primaryHover: '#34d399',      // Hover state
  bg: 'rgba(16, 185, 129, 0.1)', // Background with transparency
  border: 'rgba(16, 185, 129, 0.3)', // Border color
  arrow: '#10b981',             // Arrow/indicator color
  hoverBg: 'rgba(16, 185, 129, 0.2)', // Hover background
  topicBg: 'rgba(16, 185, 129, 0.2)'  // Topic card background
}

const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },    // blue
  { bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.3)' },    // green
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },    // amber
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },    // purple
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },    // pink
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },      // cyan
]

// =============================================================================
// DIAGRAM COMPONENTS
// =============================================================================

const ThreadPoolDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowGreen" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Thread Pool Architecture
    </text>

    {/* Task Queue */}
    <rect x="50" y="60" width="150" height="80" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="125" y="85" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">Task Queue</text>
    <rect x="65" y="100" width="50" height="25" rx="4" fill="#3b82f6" opacity="0.6"/>
    <text x="90" y="117" textAnchor="middle" fill="white" fontSize="9">Task 1</text>
    <rect x="125" y="100" width="50" height="25" rx="4" fill="#3b82f6" opacity="0.6"/>
    <text x="150" y="117" textAnchor="middle" fill="white" fontSize="9">Task 2</text>

    {/* Thread Pool */}
    <rect x="280" y="40" width="240" height="200" rx="8" fill="rgba(16, 185, 129, 0.1)" stroke="#10b981" strokeWidth="2"/>
    <text x="400" y="65" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold">Thread Pool</text>

    {/* Worker Threads */}
    <rect x="300" y="85" width="80" height="35" rx="6" fill="#10b981" stroke="#34d399" strokeWidth="1"/>
    <text x="340" y="107" textAnchor="middle" fill="white" fontSize="10">Thread 1</text>

    <rect x="300" y="130" width="80" height="35" rx="6" fill="#10b981" stroke="#34d399" strokeWidth="1"/>
    <text x="340" y="152" textAnchor="middle" fill="white" fontSize="10">Thread 2</text>

    <rect x="300" y="175" width="80" height="35" rx="6" fill="#10b981" stroke="#34d399" strokeWidth="1"/>
    <text x="340" y="197" textAnchor="middle" fill="white" fontSize="10">Thread 3</text>

    <rect x="420" y="85" width="80" height="35" rx="6" fill="#10b981" stroke="#34d399" strokeWidth="1"/>
    <text x="460" y="107" textAnchor="middle" fill="white" fontSize="10">Thread 4</text>

    <rect x="420" y="130" width="80" height="35" rx="6" fill="#10b981" stroke="#34d399" strokeWidth="1" strokeDasharray="4"/>
    <text x="460" y="152" textAnchor="middle" fill="#10b981" fontSize="10">Idle</text>

    {/* Results */}
    <rect x="600" y="60" width="150" height="80" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="675" y="85" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontWeight="bold">Results</text>
    <rect x="615" y="100" width="50" height="25" rx="4" fill="#8b5cf6" opacity="0.6"/>
    <text x="640" y="117" textAnchor="middle" fill="white" fontSize="9">Done</text>
    <rect x="675" y="100" width="50" height="25" rx="4" fill="#8b5cf6" opacity="0.6"/>
    <text x="700" y="117" textAnchor="middle" fill="white" fontSize="9">Done</text>

    {/* Arrows */}
    <line x1="200" y1="100" x2="275" y2="100" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowGreen)"/>
    <line x1="520" y1="100" x2="595" y2="100" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowGreen)"/>

    <text x="237" y="90" textAnchor="middle" fill="#94a3b8" fontSize="9">submit</text>
    <text x="557" y="90" textAnchor="middle" fill="#94a3b8" fontSize="9">complete</text>
  </svg>
)

const LockDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowLock" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Lock Acquisition Flow
    </text>

    {/* Thread 1 */}
    <rect x="50" y="60" width="120" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="110" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Thread 1</text>

    {/* Lock */}
    <rect x="280" y="50" width="120" height="70" rx="8" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="2"/>
    <text x="340" y="75" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">Lock</text>
    <text x="340" y="100" textAnchor="middle" fill="#6ee7b7" fontSize="10">state: LOCKED</text>

    {/* Critical Section */}
    <rect x="500" y="50" width="140" height="70" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="570" y="75" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">Critical Section</text>
    <text x="570" y="100" textAnchor="middle" fill="#fbbf24" fontSize="10">shared.count++</text>

    {/* Thread 2 - Waiting */}
    <rect x="50" y="140" width="120" height="50" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="110" y="165" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Thread 2</text>
    <text x="110" y="180" textAnchor="middle" fill="#fca5a5" fontSize="9">WAITING</text>

    {/* Arrows */}
    <line x1="170" y1="85" x2="275" y2="85" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowLock)"/>
    <line x1="400" y1="85" x2="495" y2="85" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowLock)"/>
    <line x1="170" y1="165" x2="220" y2="165" stroke="#ef4444" strokeWidth="2"/>
    <line x1="220" y1="165" x2="220" y2="105" stroke="#ef4444" strokeWidth="2" strokeDasharray="4"/>
    <text x="235" y="140" fill="#ef4444" fontSize="9">blocked</text>

    <text x="222" y="75" textAnchor="middle" fill="#94a3b8" fontSize="9">acquire</text>
    <text x="447" y="75" textAnchor="middle" fill="#94a3b8" fontSize="9">enter</text>
  </svg>
)

const SynchronizedDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowSync" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Synchronized Method Execution
    </text>

    {/* Object Monitor */}
    <rect x="300" y="50" width="200" height="130" rx="10" fill="rgba(16, 185, 129, 0.1)" stroke="#10b981" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold">Object Monitor</text>

    {/* Entry Set */}
    <rect x="320" y="90" width="70" height="40" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="1"/>
    <text x="355" y="115" textAnchor="middle" fill="#ef4444" fontSize="9">Entry Set</text>

    {/* Owner */}
    <rect x="410" y="90" width="70" height="40" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="445" y="115" textAnchor="middle" fill="#3b82f6" fontSize="9">Owner</text>

    {/* Wait Set */}
    <rect x="320" y="140" width="160" height="30" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="400" y="160" textAnchor="middle" fill="#8b5cf6" fontSize="9">Wait Set (wait/notify)</text>

    {/* Threads */}
    <rect x="50" y="80" width="100" height="40" rx="6" fill="#3b82f6"/>
    <text x="100" y="105" textAnchor="middle" fill="white" fontSize="10">Thread A</text>

    <rect x="50" y="130" width="100" height="40" rx="6" fill="#ef4444"/>
    <text x="100" y="155" textAnchor="middle" fill="white" fontSize="10">Thread B</text>

    <rect x="600" y="80" width="150" height="60" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="675" y="105" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">synchronized</text>
    <text x="675" y="125" textAnchor="middle" fill="#fbbf24" fontSize="9">method()</text>

    {/* Arrows */}
    <line x1="150" y1="100" x2="295" y2="100" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowSync)"/>
    <line x1="500" y1="110" x2="595" y2="110" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowSync)"/>
  </svg>
)

const AtomicDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowAtomic" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Compare-And-Swap (CAS) Operation
    </text>

    {/* Step 1: Read */}
    <rect x="50" y="60" width="150" height="70" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="125" y="85" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">1. Read</text>
    <text x="125" y="105" textAnchor="middle" fill="#60a5fa" fontSize="10">expected = 5</text>
    <text x="125" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">get current value</text>

    {/* Step 2: Compare */}
    <rect x="250" y="60" width="150" height="70" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="325" y="85" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">2. Compare</text>
    <text x="325" y="105" textAnchor="middle" fill="#fbbf24" fontSize="10">current == 5 ?</text>
    <text x="325" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">check unchanged</text>

    {/* Step 3: Swap */}
    <rect x="450" y="60" width="150" height="70" rx="8" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="2"/>
    <text x="525" y="85" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">3. Swap</text>
    <text x="525" y="105" textAnchor="middle" fill="#6ee7b7" fontSize="10">value = 6</text>
    <text x="525" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">atomic update</text>

    {/* Result */}
    <rect x="650" y="60" width="120" height="70" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="710" y="85" textAnchor="middle" fill="#8b5cf6" fontSize="11" fontWeight="bold">Result</text>
    <text x="710" y="105" textAnchor="middle" fill="#a78bfa" fontSize="10">true/false</text>
    <text x="710" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">retry if false</text>

    {/* Arrows */}
    <line x1="200" y1="95" x2="245" y2="95" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowAtomic)"/>
    <line x1="400" y1="95" x2="445" y2="95" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowAtomic)"/>
    <line x1="600" y1="95" x2="645" y2="95" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowAtomic)"/>

    {/* Bottom note */}
    <rect x="200" y="150" width="400" height="35" rx="6" fill="rgba(16, 185, 129, 0.1)" stroke="#10b981" strokeWidth="1"/>
    <text x="400" y="172" textAnchor="middle" fill="#10b981" fontSize="10">
      All three steps execute as single atomic CPU instruction
    </text>
  </svg>
)

const ReadWriteLockDiagram = () => (
  <svg viewBox="0 0 800 240" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowRW" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      ReadWriteLock - Multiple Readers OR One Writer
    </text>

    {/* Readers */}
    <rect x="50" y="50" width="200" height="80" rx="8" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="150" y="75" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">Read Lock (Shared)</text>
    <rect x="70" y="90" width="50" height="25" rx="4" fill="#3b82f6"/>
    <text x="95" y="107" textAnchor="middle" fill="white" fontSize="9">Reader 1</text>
    <rect x="130" y="90" width="50" height="25" rx="4" fill="#3b82f6"/>
    <text x="155" y="107" textAnchor="middle" fill="white" fontSize="9">Reader 2</text>
    <rect x="190" y="90" width="50" height="25" rx="4" fill="#3b82f6"/>
    <text x="215" y="107" textAnchor="middle" fill="white" fontSize="9">Reader 3</text>

    {/* Shared Resource */}
    <rect x="320" y="50" width="160" height="140" rx="8" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="2"/>
    <text x="400" y="80" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold">Shared Data</text>
    <rect x="340" y="95" width="120" height="40" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="400" y="120" textAnchor="middle" fill="#f59e0b" fontSize="10">Cache Map</text>
    <text x="400" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9">get(), put()</text>

    {/* Writer */}
    <rect x="550" y="50" width="200" height="80" rx="8" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="2"/>
    <text x="650" y="75" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">Write Lock (Exclusive)</text>
    <rect x="600" y="90" width="100" height="25" rx="4" fill="#ef4444"/>
    <text x="650" y="107" textAnchor="middle" fill="white" fontSize="9">Writer (blocked)</text>

    {/* Arrows */}
    <line x1="250" y1="90" x2="315" y2="90" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowRW)"/>
    <line x1="545" y1="90" x2="485" y2="90" stroke="#ef4444" strokeWidth="2" strokeDasharray="4"/>

    <text x="282" y="80" textAnchor="middle" fill="#94a3b8" fontSize="9">concurrent</text>
    <text x="515" y="80" textAnchor="middle" fill="#ef4444" fontSize="9">waiting</text>

    {/* Legend */}
    <rect x="50" y="200" width="700" height="30" rx="6" fill="rgba(16, 185, 129, 0.1)" stroke="#10b981" strokeWidth="1"/>
    <text x="400" y="220" textAnchor="middle" fill="#94a3b8" fontSize="10">
      Multiple readers can read simultaneously | Writers wait for all readers to finish | Writers have exclusive access
    </text>
  </svg>
)

const ReentrantLockDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowReentrant" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      ReentrantLock - Same Thread Can Re-acquire
    </text>

    {/* Thread */}
    <rect x="50" y="60" width="120" height="100" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="110" y="85" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">Thread A</text>
    <text x="110" y="105" textAnchor="middle" fill="#60a5fa" fontSize="9">methodA()</text>
    <text x="110" y="120" textAnchor="middle" fill="#60a5fa" fontSize="9">→ methodB()</text>
    <text x="110" y="135" textAnchor="middle" fill="#60a5fa" fontSize="9">→ methodC()</text>
    <text x="110" y="150" textAnchor="middle" fill="#94a3b8" fontSize="8">nested calls</text>

    {/* Lock */}
    <rect x="280" y="60" width="160" height="100" rx="8" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="2"/>
    <text x="360" y="85" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">ReentrantLock</text>
    <text x="360" y="110" textAnchor="middle" fill="#6ee7b7" fontSize="10">owner: Thread A</text>
    <text x="360" y="130" textAnchor="middle" fill="#6ee7b7" fontSize="10">holdCount: 3</text>
    <rect x="310" y="140" width="100" height="15" rx="4" fill="#10b981" opacity="0.3"/>
    <rect x="310" y="140" width="100" height="15" rx="4" fill="#10b981" opacity="0.6"/>

    {/* Unlock sequence */}
    <rect x="520" y="60" width="230" height="100" rx="8" fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="635" y="85" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">Unlock Sequence</text>
    <text x="635" y="110" textAnchor="middle" fill="#fbbf24" fontSize="9">unlock() → holdCount: 2</text>
    <text x="635" y="130" textAnchor="middle" fill="#fbbf24" fontSize="9">unlock() → holdCount: 1</text>
    <text x="635" y="150" textAnchor="middle" fill="#fbbf24" fontSize="9">unlock() → holdCount: 0 (released)</text>

    {/* Arrows */}
    <line x1="170" y1="110" x2="275" y2="110" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowReentrant)"/>
    <line x1="440" y1="110" x2="515" y2="110" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowReentrant)"/>

    <text x="222" y="100" textAnchor="middle" fill="#94a3b8" fontSize="9">lock() x3</text>
  </svg>
)

const VolatileDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      volatile - Memory Visibility Guarantee
    </text>

    {/* CPU 1 */}
    <rect x="50" y="50" width="150" height="100" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="125" y="75" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">CPU Core 1</text>
    <rect x="70" y="90" width="110" height="25" rx="4" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="1" strokeDasharray="3"/>
    <text x="125" y="107" textAnchor="middle" fill="#ef4444" fontSize="9">L1 Cache (stale)</text>
    <text x="125" y="135" textAnchor="middle" fill="#60a5fa" fontSize="9">Thread 1</text>

    {/* Main Memory */}
    <rect x="300" y="50" width="200" height="100" rx="8" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">Main Memory</text>
    <rect x="320" y="90" width="160" height="30" rx="4" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" strokeWidth="1"/>
    <text x="400" y="110" textAnchor="middle" fill="#10b981" fontSize="10">volatile flag = true</text>
    <text x="400" y="140" textAnchor="middle" fill="#6ee7b7" fontSize="9">always read from here</text>

    {/* CPU 2 */}
    <rect x="600" y="50" width="150" height="100" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="675" y="75" textAnchor="middle" fill="#8b5cf6" fontSize="11" fontWeight="bold">CPU Core 2</text>
    <rect x="620" y="90" width="110" height="25" rx="4" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="1" strokeDasharray="3"/>
    <text x="675" y="107" textAnchor="middle" fill="#ef4444" fontSize="9">L1 Cache (stale)</text>
    <text x="675" y="135" textAnchor="middle" fill="#a78bfa" fontSize="9">Thread 2</text>

    {/* Arrows showing direct memory access */}
    <path d="M 180 100 Q 240 50 300 100" fill="none" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowGreen)"/>
    <path d="M 620 100 Q 560 50 500 100" fill="none" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowGreen)"/>

    <text x="240" y="55" textAnchor="middle" fill="#10b981" fontSize="9">write</text>
    <text x="560" y="55" textAnchor="middle" fill="#10b981" fontSize="9">read</text>

    {/* Legend */}
    <text x="400" y="180" textAnchor="middle" fill="#94a3b8" fontSize="10">
      volatile bypasses CPU cache - all reads/writes go directly to main memory
    </text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function Concurrency({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'synchronized',
      name: 'Synchronized Methods & Blocks',
      icon: '🔐',
      color: '#3b82f6',
      description: 'Use the synchronized keyword for intrinsic locking. Ensures only one thread can execute a synchronized method/block at a time on the same object.',
      diagram: SynchronizedDiagram,
      details: [
        {
          name: 'Synchronized Methods',
          diagram: SynchronizedDiagram,
          explanation: 'Use synchronized keyword on methods to ensure thread safety. Only one thread can execute a synchronized method at a time on the same object instance. The thread acquires the object\'s intrinsic lock (monitor) before entering and releases it upon exit. Prevents race conditions where multiple threads modify shared data concurrently.',
          codeExample: `class Counter {
    private int count = 0;

    // synchronized ensures only one thread can execute this at a time
    public synchronized void increment() {
        count++;  // read-modify-write is now atomic
    }

    public synchronized int getCount() {
        return count;
    }
}

// Usage with 1000 threads
Counter counter = new Counter();
Thread[] threads = new Thread[1000];

for (int i = 0; i < 1000; i++) {
    threads[i] = new Thread(() -> counter.increment());
    threads[i].start();
}

for (Thread t : threads) {
    t.join();
}

System.out.println("Final count: " + counter.getCount());
// Always prints: Final count: 1000`
        },
        {
          name: 'Synchronized Blocks',
          explanation: 'Synchronized blocks provide finer-grained locking than synchronized methods. You can lock on any object, not just "this". Allows different locks for different critical sections, reducing contention. Only the code inside the block is protected.',
          codeExample: `class BankAccount {
    private double balance;
    private final Object balanceLock = new Object();
    private List<String> transactions = new ArrayList<>();
    private final Object txLock = new Object();

    public void deposit(double amount) {
        // Lock only for balance modification
        synchronized (balanceLock) {
            balance += amount;
        }
        // Separate lock for transaction log
        synchronized (txLock) {
            transactions.add("Deposit: " + amount);
        }
    }

    public void withdraw(double amount) {
        synchronized (balanceLock) {
            if (balance >= amount) {
                balance -= amount;
            }
        }
        synchronized (txLock) {
            transactions.add("Withdraw: " + amount);
        }
    }
}`
        },
        {
          name: 'Static Synchronization',
          explanation: 'Static synchronized methods lock on the Class object itself, not an instance. All instances share the same lock. Useful for protecting static fields or implementing class-level thread safety.',
          codeExample: `class SingletonRegistry {
    private static Map<String, Object> registry = new HashMap<>();

    // Locks on SingletonRegistry.class
    public static synchronized void register(String key, Object value) {
        registry.put(key, value);
    }

    public static synchronized Object get(String key) {
        return registry.get(key);
    }

    // Equivalent to:
    public static Object getAlt(String key) {
        synchronized (SingletonRegistry.class) {
            return registry.get(key);
        }
    }
}`
        }
      ]
    },
    {
      id: 'reentrant-lock',
      name: 'ReentrantLock',
      icon: '🔒',
      color: '#10b981',
      description: 'Explicit locking with more control than synchronized. Supports try-lock, timed lock, interruptible lock acquisition, and fairness policies.',
      diagram: ReentrantLockDiagram,
      details: [
        {
          name: 'Basic Usage',
          diagram: ReentrantLockDiagram,
          explanation: 'ReentrantLock offers more control than synchronized. Always unlock in finally block to prevent deadlocks. Supports fairness (threads acquire in order), timed waits, and multiple condition variables. The lock is "reentrant" - the same thread can acquire it multiple times.',
          codeExample: `import java.util.concurrent.locks.*;

class LockedCounter {
    private int count = 0;
    private final ReentrantLock lock = new ReentrantLock();

    public void increment() {
        lock.lock();  // Acquire lock
        try {
            count++;
        } finally {
            lock.unlock();  // ALWAYS unlock in finally
        }
    }

    public int getCount() {
        lock.lock();
        try {
            return count;
        } finally {
            lock.unlock();
        }
    }
}`
        },
        {
          name: 'Try Lock',
          explanation: 'tryLock() attempts to acquire the lock without blocking. Returns immediately with true (lock acquired) or false (lock unavailable). Useful for avoiding deadlocks and implementing timeout-based locking strategies.',
          codeExample: `class DeadlockFreeTransfer {
    private final ReentrantLock lock = new ReentrantLock();
    private double balance;

    public boolean transfer(DeadlockFreeTransfer target, double amount) {
        // Try to acquire both locks without blocking
        while (true) {
            if (this.lock.tryLock()) {
                try {
                    if (target.lock.tryLock()) {
                        try {
                            if (this.balance >= amount) {
                                this.balance -= amount;
                                target.balance += amount;
                                return true;
                            }
                            return false;
                        } finally {
                            target.lock.unlock();
                        }
                    }
                } finally {
                    this.lock.unlock();
                }
            }
            // Failed to get both locks, retry
            Thread.yield();
        }
    }
}`
        },
        {
          name: 'Timed & Interruptible Lock',
          explanation: 'lockInterruptibly() allows thread interruption while waiting. tryLock(timeout, unit) waits for a specified time before giving up. Essential for responsive applications that need to handle cancellation.',
          codeExample: `class InterruptibleTask {
    private final ReentrantLock lock = new ReentrantLock();

    public void performTask() throws InterruptedException {
        // Can be interrupted while waiting
        lock.lockInterruptibly();
        try {
            doWork();
        } finally {
            lock.unlock();
        }
    }

    public boolean performWithTimeout() throws InterruptedException {
        // Wait at most 5 seconds for the lock
        if (lock.tryLock(5, TimeUnit.SECONDS)) {
            try {
                doWork();
                return true;
            } finally {
                lock.unlock();
            }
        }
        return false;  // Couldn't acquire lock in time
    }
}`
        },
        {
          name: 'Fair Lock',
          explanation: 'Fair locks grant access in FIFO order - threads that have waited longest get the lock first. Prevents starvation but has lower throughput. Use when fairness is more important than performance.',
          codeExample: `class FairResourcePool {
    // Fair lock - threads acquire in order they requested
    private final ReentrantLock fairLock = new ReentrantLock(true);
    private final List<Resource> resources = new ArrayList<>();

    public Resource acquire() throws InterruptedException {
        fairLock.lockInterruptibly();
        try {
            while (resources.isEmpty()) {
                // Wait for resource (covered in Condition section)
            }
            return resources.remove(0);
        } finally {
            fairLock.unlock();
        }
    }

    // Check if threads are waiting
    public boolean hasQueuedThreads() {
        return fairLock.hasQueuedThreads();
    }

    public int getQueueLength() {
        return fairLock.getQueueLength();
    }
}`
        }
      ]
    },
    {
      id: 'atomic',
      name: 'Atomic Variables',
      icon: '⚛️',
      color: '#8b5cf6',
      description: 'Lock-free thread-safe operations using CAS (Compare-And-Swap). High performance for simple counters and numeric operations without blocking.',
      diagram: AtomicDiagram,
      details: [
        {
          name: 'AtomicInteger',
          diagram: AtomicDiagram,
          explanation: 'AtomicInteger provides lock-free thread safety using hardware-level atomic operations (CAS - Compare And Swap). More efficient than locks for simple operations. No blocking, no deadlocks. Ideal for counters, sequence generators, and statistics.',
          codeExample: `import java.util.concurrent.atomic.*;

class AtomicCounter {
    private final AtomicInteger count = new AtomicInteger(0);

    public void increment() {
        count.incrementAndGet();  // Atomic: read + increment + write
    }

    public int getAndIncrement() {
        return count.getAndIncrement();  // Returns old value
    }

    public int addAndGet(int delta) {
        return count.addAndGet(delta);  // Add and return new value
    }

    public boolean compareAndSet(int expect, int update) {
        // Only sets if current value == expect
        return count.compareAndSet(expect, update);
    }

    public int get() {
        return count.get();
    }
}`
        },
        {
          name: 'AtomicReference',
          explanation: 'AtomicReference provides atomic operations on object references. Useful for lock-free data structures and implementing non-blocking algorithms. compareAndSet ensures atomic reference updates.',
          codeExample: `import java.util.concurrent.atomic.*;

class AtomicStack<E> {
    private final AtomicReference<Node<E>> top = new AtomicReference<>();

    private static class Node<E> {
        final E item;
        Node<E> next;
        Node(E item, Node<E> next) {
            this.item = item;
            this.next = next;
        }
    }

    public void push(E item) {
        Node<E> newHead = new Node<>(item, null);
        Node<E> oldHead;
        do {
            oldHead = top.get();
            newHead.next = oldHead;
        } while (!top.compareAndSet(oldHead, newHead));
    }

    public E pop() {
        Node<E> oldHead;
        Node<E> newHead;
        do {
            oldHead = top.get();
            if (oldHead == null) return null;
            newHead = oldHead.next;
        } while (!top.compareAndSet(oldHead, newHead));
        return oldHead.item;
    }
}`
        },
        {
          name: 'LongAdder & Accumulators',
          explanation: 'LongAdder is optimized for high contention scenarios where multiple threads frequently update the same counter. It maintains multiple cells internally, reducing contention. Better than AtomicLong for statistics and metrics collection.',
          codeExample: `import java.util.concurrent.atomic.*;

class HighThroughputMetrics {
    // LongAdder - optimized for high contention
    private final LongAdder requestCount = new LongAdder();
    private final LongAdder errorCount = new LongAdder();

    // DoubleAdder for floating point
    private final DoubleAdder totalLatency = new DoubleAdder();

    public void recordRequest(double latencyMs, boolean success) {
        requestCount.increment();
        totalLatency.add(latencyMs);
        if (!success) {
            errorCount.increment();
        }
    }

    public long getRequestCount() {
        return requestCount.sum();  // Aggregate all cells
    }

    public double getAverageLatency() {
        long count = requestCount.sum();
        return count > 0 ? totalLatency.sum() / count : 0;
    }

    public void reset() {
        requestCount.reset();
        errorCount.reset();
        totalLatency.reset();
    }
}`
        }
      ]
    },
    {
      id: 'readwrite-lock',
      name: 'ReadWriteLock',
      icon: '📖',
      color: '#f59e0b',
      description: 'Allow multiple concurrent readers but exclusive access for writers. Optimized for read-heavy workloads like caches and configuration stores.',
      diagram: ReadWriteLockDiagram,
      details: [
        {
          name: 'Basic ReadWriteLock',
          diagram: ReadWriteLockDiagram,
          explanation: 'ReadWriteLock allows multiple concurrent readers OR one exclusive writer. Optimizes read-heavy workloads where reads vastly outnumber writes. Read lock is shared, write lock is exclusive. Perfect for caches, configuration, and lookup tables.',
          codeExample: `import java.util.concurrent.locks.*;
import java.util.*;

class ThreadSafeCache<K, V> {
    private final Map<K, V> map = new HashMap<>();
    private final ReadWriteLock rwLock = new ReentrantReadWriteLock();
    private final Lock readLock = rwLock.readLock();
    private final Lock writeLock = rwLock.writeLock();

    public V get(K key) {
        readLock.lock();  // Multiple readers allowed
        try {
            return map.get(key);
        } finally {
            readLock.unlock();
        }
    }

    public void put(K key, V value) {
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
          name: 'Lock Downgrading',
          explanation: 'Lock downgrading converts a write lock to a read lock without releasing. Acquire read lock, then release write lock. Useful when you need to modify data and then continue reading it. Note: upgrading (read to write) is NOT supported.',
          codeExample: `class CachedData {
    private Object data;
    private volatile boolean cacheValid;
    private final ReentrantReadWriteLock rwl = new ReentrantReadWriteLock();

    public Object processCachedData() {
        rwl.readLock().lock();
        if (!cacheValid) {
            // Must release read lock before acquiring write lock
            rwl.readLock().unlock();
            rwl.writeLock().lock();
            try {
                // Recheck state - another thread might have acquired
                // write lock and changed state before we did
                if (!cacheValid) {
                    data = loadDataFromDatabase();
                    cacheValid = true;
                }
                // Downgrade by acquiring read lock before releasing write
                rwl.readLock().lock();
            } finally {
                rwl.writeLock().unlock();
            }
        }
        try {
            return use(data);
        } finally {
            rwl.readLock().unlock();
        }
    }
}`
        },
        {
          name: 'StampedLock',
          explanation: 'StampedLock (Java 8+) offers optimistic reading for even better read performance. tryOptimisticRead() doesn\'t actually acquire a lock - just returns a stamp. If no writes occurred, the stamp remains valid. Excellent for read-mostly scenarios.',
          codeExample: `import java.util.concurrent.locks.*;

class Point {
    private double x, y;
    private final StampedLock sl = new StampedLock();

    public void move(double deltaX, double deltaY) {
        long stamp = sl.writeLock();
        try {
            x += deltaX;
            y += deltaY;
        } finally {
            sl.unlockWrite(stamp);
        }
    }

    public double distanceFromOrigin() {
        // Optimistic read - no actual locking
        long stamp = sl.tryOptimisticRead();
        double currentX = x, currentY = y;

        if (!sl.validate(stamp)) {
            // A write occurred, fallback to read lock
            stamp = sl.readLock();
            try {
                currentX = x;
                currentY = y;
            } finally {
                sl.unlockRead(stamp);
            }
        }
        return Math.sqrt(currentX * currentX + currentY * currentY);
    }
}`
        }
      ]
    },
    {
      id: 'volatile',
      name: 'Volatile & Memory Visibility',
      icon: '👁️',
      color: '#ec4899',
      description: 'Ensure visibility of changes across threads. Volatile prevents CPU cache inconsistencies and establishes happens-before relationships.',
      diagram: VolatileDiagram,
      details: [
        {
          name: 'Volatile Keyword',
          diagram: VolatileDiagram,
          explanation: 'The volatile keyword ensures visibility of changes across threads. Without volatile, threads may see stale cached values. Volatile forces reads/writes directly to main memory, bypassing CPU caches. Use for flags, status variables, and simple publishers.',
          codeExample: `class TaskRunner {
    // Without volatile, running might be cached in CPU registers
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

// Double-checked locking (correct version)
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
        },
        {
          name: 'Happens-Before',
          explanation: 'Java Memory Model defines happens-before relationships that guarantee visibility. A volatile write happens-before subsequent volatile reads of the same variable. This creates a synchronization point without using locks.',
          codeExample: `class DataPublisher {
    private int data;
    private volatile boolean ready = false;

    public void publish(int value) {
        data = value;        // (1) Write data
        ready = true;        // (2) Volatile write - publishes (1)
    }

    public int consume() {
        while (!ready) {}    // (3) Volatile read
        return data;         // (4) Guaranteed to see value from (1)
    }
}

// Happens-before chain:
// (1) happens-before (2) - program order
// (2) happens-before (3) - volatile write/read
// (3) happens-before (4) - program order
// Therefore: (1) happens-before (4)`
        },
        {
          name: 'Volatile vs Atomic',
          explanation: 'Volatile only guarantees visibility, not atomicity. count++ on a volatile int is still NOT thread-safe (it\'s read-modify-write). Use AtomicInteger for compound operations. Volatile is cheaper than atomic when you only need visibility.',
          codeExample: `class VolatileVsAtomic {
    // WRONG - not thread-safe for increment
    private volatile int volatileCount = 0;

    // RIGHT - thread-safe increment
    private AtomicInteger atomicCount = new AtomicInteger(0);

    public void unsafeIncrement() {
        volatileCount++;  // NOT atomic: read, increment, write
    }

    public void safeIncrement() {
        atomicCount.incrementAndGet();  // Atomic operation
    }

    // Volatile IS sufficient for simple assignment
    private volatile boolean flag;

    public void setFlag() {
        flag = true;  // This is safe - single write
    }
}`
        }
      ]
    },
    {
      id: 'thread-pool',
      name: 'Thread Pools & Executors',
      icon: '🏊',
      color: '#06b6d4',
      description: 'Manage thread lifecycle efficiently with ExecutorService. Avoid the overhead of creating threads for each task.',
      diagram: ThreadPoolDiagram,
      details: [
        {
          name: 'ExecutorService Basics',
          diagram: ThreadPoolDiagram,
          explanation: 'ExecutorService manages a pool of reusable threads. Avoids the overhead of creating new threads for each task. Provides submit() for Callable/Runnable and shutdown() for graceful termination. Always shut down executors to release resources.',
          codeExample: `import java.util.concurrent.*;

class ThreadPoolExample {
    public static void main(String[] args) throws Exception {
        // Fixed pool of 4 threads
        ExecutorService executor = Executors.newFixedThreadPool(4);

        // Submit tasks
        List<Future<Integer>> futures = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            final int taskId = i;
            Future<Integer> future = executor.submit(() -> {
                Thread.sleep(100);
                return taskId * 2;
            });
            futures.add(future);
        }

        // Collect results
        for (Future<Integer> f : futures) {
            System.out.println("Result: " + f.get());
        }

        // Shutdown
        executor.shutdown();
        executor.awaitTermination(1, TimeUnit.MINUTES);
    }
}`
        },
        {
          name: 'Thread Pool Types',
          explanation: 'Java provides several pre-configured thread pools: FixedThreadPool for bounded concurrency, CachedThreadPool for short-lived tasks, SingleThreadExecutor for sequential execution, and ScheduledThreadPool for delayed/periodic tasks.',
          codeExample: `import java.util.concurrent.*;

class ThreadPoolTypes {
    // Fixed size - bounded queue, predictable resource usage
    ExecutorService fixed = Executors.newFixedThreadPool(4);

    // Cached - creates threads as needed, reuses idle threads
    // Good for short-lived async tasks
    ExecutorService cached = Executors.newCachedThreadPool();

    // Single thread - tasks execute sequentially
    ExecutorService single = Executors.newSingleThreadExecutor();

    // Scheduled - for delayed and periodic tasks
    ScheduledExecutorService scheduled =
        Executors.newScheduledThreadPool(2);

    public void scheduleExamples() {
        // Run after 5 seconds
        scheduled.schedule(() -> {
            System.out.println("Delayed task");
        }, 5, TimeUnit.SECONDS);

        // Run every 10 seconds
        scheduled.scheduleAtFixedRate(() -> {
            System.out.println("Periodic task");
        }, 0, 10, TimeUnit.SECONDS);
    }
}`
        },
        {
          name: 'Custom ThreadPoolExecutor',
          explanation: 'For production systems, configure ThreadPoolExecutor directly for control over core/max pool size, queue capacity, rejection policy, and thread factory. Avoid unbounded queues to prevent memory issues.',
          codeExample: `import java.util.concurrent.*;

class CustomThreadPool {
    public static ExecutorService createBoundedPool() {
        return new ThreadPoolExecutor(
            4,                      // corePoolSize
            8,                      // maximumPoolSize
            60L, TimeUnit.SECONDS,  // keepAliveTime for excess threads
            new ArrayBlockingQueue<>(100),  // bounded queue
            new ThreadFactory() {
                private int count = 0;
                public Thread newThread(Runnable r) {
                    Thread t = new Thread(r, "worker-" + count++);
                    t.setDaemon(false);
                    return t;
                }
            },
            new ThreadPoolExecutor.CallerRunsPolicy()  // rejection policy
        );
    }
}

// Rejection Policies:
// AbortPolicy - throws RejectedExecutionException (default)
// CallerRunsPolicy - caller thread runs the task
// DiscardPolicy - silently discards the task
// DiscardOldestPolicy - discards oldest queued task`
        },
        {
          name: 'CompletableFuture',
          explanation: 'CompletableFuture provides async programming with composition. Chain operations with thenApply, thenCompose, thenCombine. Handle errors with exceptionally. Non-blocking and composable.',
          codeExample: `import java.util.concurrent.*;

class CompletableFutureExample {
    public CompletableFuture<String> fetchUserData(int userId) {
        return CompletableFuture.supplyAsync(() -> {
            // Simulate API call
            return "User-" + userId;
        });
    }

    public void chainedOperations() {
        CompletableFuture<String> result = fetchUserData(123)
            .thenApply(user -> user.toUpperCase())    // transform
            .thenCompose(this::enrichUser)            // flatMap
            .exceptionally(ex -> "Error: " + ex);     // error handling

        // Combine multiple futures
        CompletableFuture<String> user1 = fetchUserData(1);
        CompletableFuture<String> user2 = fetchUserData(2);

        CompletableFuture<String> combined = user1.thenCombine(user2,
            (u1, u2) -> u1 + " and " + u2);

        // Wait for all
        CompletableFuture.allOf(user1, user2).join();
    }
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
      { name: 'Concurrency', icon: '🔄', page: 'Concurrency' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #064e3b 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #34d399, #10b981)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(16, 185, 129, 0.2)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    borderRadius: '0.5rem',
    color: '#34d399',
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
        <h1 style={titleStyle}>Java Concurrency</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(16, 185, 129, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'
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
          colors={CONCURRENCY_COLORS}
        />
      </div>

      {/* Subtitle */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem', textAlign: 'center' }}>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', margin: 0 }}>
          Master thread safety with synchronized blocks, locks, atomic operations, and thread pools
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
              maxWidth: '1200px',
              maxHeight: '92vh',
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
              colors={CONCURRENCY_COLORS}
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

export default Concurrency
