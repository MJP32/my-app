/**
 * Atomic & CAS - Internal Workings
 *
 * Deep dive into Compare-And-Swap, AtomicInteger, AtomicReference, and lock-free programming
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

/**
 * Atomic Internals colors - teal theme
 */
const ATOMIC_COLORS = {
  primary: '#14b8a6',           // Teal accent color
  primaryHover: '#2dd4bf',      // Lighter teal hover
  bg: 'rgba(20, 184, 166, 0.1)', // Background with transparency
  border: 'rgba(20, 184, 166, 0.3)', // Border color
  arrow: '#14b8a6',             // Arrow/indicator color
  hoverBg: 'rgba(20, 184, 166, 0.2)', // Hover background
  topicBg: 'rgba(20, 184, 166, 0.2)'  // Topic card background
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
 * CAS Operation Flow Diagram
 */
const CASFlowDiagram = () => (
  <svg viewBox="0 0 800 380" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead-teal" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#14b8a6" />
      </marker>
    </defs>

    {/* Title */}
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Compare-And-Swap (CAS) Operation Flow
    </text>

    {/* Memory */}
    <rect x="330" y="60" width="140" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="400" y="82" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Memory Location</text>
    <text x="400" y="98" textAnchor="middle" fill="white" fontSize="10">[current_value]</text>

    {/* Read Value */}
    <line x1="400" y1="110" x2="400" y2="145" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowhead-teal)"/>
    <rect x="330" y="150" width="140" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="400" y="172" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Read Current</text>
    <text x="400" y="188" textAnchor="middle" fill="white" fontSize="10">current = memory</text>

    {/* Compare */}
    <line x1="400" y1="200" x2="400" y2="235" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowhead-teal)"/>
    <rect x="300" y="240" width="200" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="400" y="262" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Compare</text>
    <text x="400" y="278" textAnchor="middle" fill="white" fontSize="10">current == expected?</text>

    {/* YES branch */}
    <line x1="320" y1="290" x2="200" y2="315" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowhead-teal)"/>
    <text x="240" y="300" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">YES</text>
    <rect x="120" y="320" width="160" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="200" y="342" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Write New Value</text>
    <text x="200" y="358" textAnchor="middle" fill="white" fontSize="10">memory = newValue</text>

    {/* NO branch */}
    <line x1="480" y1="290" x2="600" y2="315" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowhead-teal)"/>
    <text x="560" y="300" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">NO</text>
    <rect x="520" y="320" width="160" height="50" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="600" y="342" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">No Write</text>
    <text x="600" y="358" textAnchor="middle" fill="white" fontSize="10">return false</text>

    {/* Success return */}
    <line x1="200" y1="370" x2="200" y2="315" stroke="#14b8a6" strokeWidth="2"/>
    <line x1="200" y1="315" x2="350" y2="315" stroke="#14b8a6" strokeWidth="2"/>
    <line x1="350" y1="315" x2="350" y2="345" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowhead-teal)"/>
    <rect x="280" y="350" width="140" height="25" rx="5" fill="rgba(34, 197, 94, 0.3)" stroke="#4ade80" strokeWidth="1"/>
    <text x="350" y="367" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">return true</text>

    {/* Failure return */}
    <line x1="600" y1="370" x2="600" y2="315" stroke="#14b8a6" strokeWidth="2"/>
    <line x1="600" y1="315" x2="450" y2="315" stroke="#14b8a6" strokeWidth="2"/>
    <line x1="450" y1="315" x2="450" y2="345" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowhead-teal)"/>
    <rect x="380" y="350" width="140" height="25" rx="5" fill="rgba(239, 68, 68, 0.3)" stroke="#f87171" strokeWidth="1"/>
    <text x="450" y="367" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">return false</text>
  </svg>
)

/**
 * CAS Loop Pattern Diagram
 */
const CASLoopDiagram = () => (
  <svg viewBox="0 0 800 320" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-loop" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#14b8a6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      CAS Retry Loop Pattern
    </text>

    {/* Start */}
    <rect x="330" y="60" width="140" height="40" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="400" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Start</text>

    {/* Read current */}
    <line x1="400" y1="100" x2="400" y2="125" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrow-loop)"/>
    <rect x="300" y="130" width="200" height="40" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="400" y="155" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">1. current = get()</text>

    {/* Compute new */}
    <line x1="400" y1="170" x2="400" y2="195" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrow-loop)"/>
    <rect x="300" y="200" width="200" height="40" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="400" y="225" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">2. next = compute(current)</text>

    {/* CAS attempt */}
    <line x1="400" y1="240" x2="400" y2="265" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrow-loop)"/>
    <rect x="280" y="270" width="240" height="40" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="400" y="295" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">3. CAS(current, next)</text>

    {/* Success */}
    <line x1="520" y1="290" x2="620" y2="290" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrow-loop)"/>
    <text x="570" y="283" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">SUCCESS</text>
    <rect x="625" y="270" width="100" height="40" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="675" y="295" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Return</text>

    {/* Failure - retry */}
    <line x1="280" y1="290" x2="180" y2="290" stroke="#14b8a6" strokeWidth="2"/>
    <text x="230" y="283" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">FAILURE</text>
    <line x1="180" y1="290" x2="180" y2="150" stroke="#14b8a6" strokeWidth="2"/>
    <line x1="180" y1="150" x2="295" y2="150" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrow-loop)"/>
    <text x="220" y="170" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">RETRY</text>
  </svg>
)

/**
 * AtomicInteger Structure Diagram
 */
const AtomicIntegerDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-atomic" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#14b8a6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      AtomicInteger Internal Structure
    </text>

    {/* AtomicInteger box */}
    <rect x="250" y="60" width="300" height="180" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="400" y="85" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">AtomicInteger</text>

    {/* volatile int value */}
    <rect x="280" y="100" width="240" height="40" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="400" y="125" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">volatile int value</text>

    {/* VarHandle */}
    <rect x="280" y="150" width="240" height="40" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="400" y="175" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">VarHandle VALUE</text>

    {/* Methods */}
    <text x="270" y="210" fill="#94a3b8" fontSize="10">get() / set()</text>
    <text x="270" y="225" fill="#94a3b8" fontSize="10">compareAndSet()</text>
    <text x="450" y="210" fill="#94a3b8" fontSize="10">getAndIncrement()</text>
    <text x="450" y="225" fill="#94a3b8" fontSize="10">incrementAndGet()</text>

    {/* CPU instruction indicator */}
    <rect x="80" y="160" width="140" height="50" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="150" y="182" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">CPU CAS</text>
    <text x="150" y="198" textAnchor="middle" fill="white" fontSize="9">Instruction</text>

    <line x1="220" y1="185" x2="275" y2="185" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrow-atomic)"/>
    <text x="247" y="178" textAnchor="middle" fill="#14b8a6" fontSize="9">uses</text>

    {/* Memory */}
    <rect x="580" y="160" width="140" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="650" y="182" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Main Memory</text>
    <text x="650" y="198" textAnchor="middle" fill="white" fontSize="9">Visibility</text>

    <line x1="550" y1="120" x2="575" y2="120" stroke="#14b8a6" strokeWidth="2"/>
    <line x1="575" y1="120" x2="575" y2="185" stroke="#14b8a6" strokeWidth="2"/>
    <line x1="575" y1="185" x2="575" y2="185" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrow-atomic)"/>
    <text x="610" y="120" fill="#14b8a6" fontSize="9">volatile</text>
  </svg>
)

/**
 * Lock-Free Stack Diagram
 */
const LockFreeStackDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-stack" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#14b8a6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Lock-Free Stack using AtomicReference
    </text>

    {/* AtomicReference head */}
    <rect x="50" y="80" width="180" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="140" y="102" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">AtomicReference</text>
    <text x="140" y="118" textAnchor="middle" fill="white" fontSize="10">&lt;Node&gt; head</text>

    {/* Arrow to stack */}
    <line x1="230" y1="105" x2="285" y2="105" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrow-stack)"/>

    {/* Stack nodes */}
    <rect x="290" y="80" width="100" height="50" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="340" y="102" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Node A</text>
    <text x="340" y="118" textAnchor="middle" fill="white" fontSize="9">value: 10</text>

    <line x1="340" y1="130" x2="340" y2="155" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrow-stack)"/>
    <text x="360" y="145" fill="#94a3b8" fontSize="8">next</text>

    <rect x="290" y="160" width="100" height="50" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="340" y="182" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Node B</text>
    <text x="340" y="198" textAnchor="middle" fill="white" fontSize="9">value: 20</text>

    <line x1="340" y1="210" x2="340" y2="235" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrow-stack)"/>
    <text x="360" y="225" fill="#94a3b8" fontSize="8">next</text>

    <rect x="290" y="240" width="100" height="30" rx="6" fill="#475569" stroke="#64748b" strokeWidth="2"/>
    <text x="340" y="260" textAnchor="middle" fill="#94a3b8" fontSize="10">null</text>

    {/* Push operation */}
    <text x="520" y="80" fill="#fbbf24" fontSize="12" fontWeight="bold">Push Operation:</text>
    <text x="520" y="105" fill="#94a3b8" fontSize="10">1. Create new node</text>
    <text x="520" y="125" fill="#94a3b8" fontSize="10">2. newNode.next = head</text>
    <text x="520" y="145" fill="#94a3b8" fontSize="10">3. CAS(head, newNode)</text>
    <text x="520" y="165" fill="#94a3b8" fontSize="10">4. Retry if CAS fails</text>

    {/* Pop operation */}
    <text x="520" y="195" fill="#4ade80" fontSize="12" fontWeight="bold">Pop Operation:</text>
    <text x="520" y="220" fill="#94a3b8" fontSize="10">1. current = head</text>
    <text x="520" y="240" fill="#94a3b8" fontSize="10">2. CAS(head, current.next)</text>
    <text x="520" y="260" fill="#94a3b8" fontSize="10">3. Retry if CAS fails</text>
  </svg>
)

/**
 * ABA Problem Diagram
 */
const ABAProblemDiagram = () => (
  <svg viewBox="0 0 800 320" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-aba" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#14b8a6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      ABA Problem Scenario
    </text>

    {/* Timeline */}
    <line x1="100" y1="60" x2="700" y2="60" stroke="#475569" strokeWidth="2"/>
    <text x="50" y="65" fill="#94a3b8" fontSize="10">Time:</text>

    {/* T1 initial state */}
    <text x="120" y="90" fill="#60a5fa" fontSize="11" fontWeight="bold">Thread 1</text>
    <rect x="100" y="100" width="80" height="40" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="140" y="125" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Reads: A</text>

    {/* T2 changes A → B → A */}
    <text x="320" y="90" fill="#22c55e" fontSize="11" fontWeight="bold">Thread 2</text>
    <rect x="250" y="100" width="80" height="40" rx="6" fill="rgba(34, 197, 94, 0.5)" stroke="#4ade80" strokeWidth="2"/>
    <text x="290" y="120" textAnchor="middle" fill="white" fontSize="9">A → B</text>

    <line x1="330" y1="120" x2="360" y2="120" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrow-aba)"/>

    <rect x="365" y="100" width="80" height="40" rx="6" fill="rgba(34, 197, 94, 0.7)" stroke="#4ade80" strokeWidth="2"/>
    <text x="405" y="120" textAnchor="middle" fill="white" fontSize="9">B → C</text>

    <line x1="445" y1="120" x2="475" y2="120" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrow-aba)"/>

    <rect x="480" y="100" width="80" height="40" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="520" y="120" textAnchor="middle" fill="white" fontSize="9">C → A</text>

    {/* T1 CAS succeeds incorrectly */}
    <rect x="600" y="100" width="90" height="40" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="645" y="115" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">T1 CAS</text>
    <text x="645" y="130" textAnchor="middle" fill="white" fontSize="9">SUCCESS!</text>

    {/* Warning */}
    <text x="645" y="160" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">⚠ BUG!</text>

    {/* Stack visualization */}
    <text x="100" y="200" fill="#94a3b8" fontSize="11" fontWeight="bold">Initial Stack:</text>
    <rect x="100" y="210" width="60" height="30" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="130" y="230" textAnchor="middle" fill="white" fontSize="10">A</text>
    <line x1="130" y1="240" x2="130" y2="260" stroke="#14b8a6" strokeWidth="1" markerEnd="url(#arrow-aba)"/>
    <rect x="100" y="265" width="60" height="30" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="130" y="285" textAnchor="middle" fill="white" fontSize="10">B</text>

    <text x="260" y="200" fill="#94a3b8" fontSize="11" fontWeight="bold">After T2:</text>
    <rect x="260" y="210" width="60" height="30" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="290" y="230" textAnchor="middle" fill="white" fontSize="10">A</text>
    <line x1="290" y1="240" x2="290" y2="260" stroke="#14b8a6" strokeWidth="1" markerEnd="url(#arrow-aba)"/>
    <rect x="260" y="265" width="60" height="30" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="290" y="285" textAnchor="middle" fill="white" fontSize="10">C</text>

    <text x="420" y="200" fill="#f87171" fontSize="11" fontWeight="bold">After T1 CAS:</text>
    <rect x="420" y="210" width="60" height="30" rx="4" fill="#ef4444" stroke="#f87171" strokeWidth="1"/>
    <text x="450" y="230" textAnchor="middle" fill="white" fontSize="10">A</text>
    <line x1="450" y1="240" x2="450" y2="260" stroke="#ef4444" strokeWidth="1" markerEnd="url(#arrow-aba)"/>
    <rect x="420" y="265" width="60" height="30" rx="4" fill="#ef4444" stroke="#f87171" strokeWidth="1"/>
    <text x="450" y="285" textAnchor="middle" fill="white" fontSize="10">?</text>

    <text x="550" y="250" fill="#f87171" fontSize="10">Corrupted!</text>

    {/* Solution */}
    <text x="600" y="200" fill="#fbbf24" fontSize="11" fontWeight="bold">Solution:</text>
    <text x="600" y="220" fill="#94a3b8" fontSize="10">AtomicStampedReference</text>
    <text x="600" y="240" fill="#94a3b8" fontSize="9">(checks version stamp)</text>
  </svg>
)

/**
 * LongAdder Structure Diagram
 */
const LongAdderDiagram = () => (
  <svg viewBox="0 0 800 320" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-adder" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#14b8a6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      LongAdder: Striped Cell Architecture
    </text>

    {/* AtomicLong comparison */}
    <text x="150" y="70" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">AtomicLong (Single Cell)</text>
    <rect x="80" y="85" width="140" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="150" y="115" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">value</text>

    {/* Multiple threads competing */}
    <line x1="120" y1="75" x2="120" y2="85" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-adder)"/>
    <line x1="150" y1="75" x2="150" y2="85" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-adder)"/>
    <line x1="180" y1="75" x2="180" y2="85" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-adder)"/>
    <text x="100" y="70" fill="#f59e0b" fontSize="8">T1</text>
    <text x="150" y="65" fill="#f59e0b" fontSize="8">T2</text>
    <text x="190" y="70" fill="#f59e0b" fontSize="8">T3</text>

    <text x="150" y="155" textAnchor="middle" fill="#f87171" fontSize="10">High Contention!</text>

    {/* LongAdder */}
    <text x="550" y="70" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">LongAdder (Striped Cells)</text>

    {/* Base cell */}
    <rect x="480" y="90" width="100" height="40" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="530" y="115" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">base</text>

    {/* Cell array */}
    <text x="550" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">Cell[] cells</text>

    <rect x="420" y="170" width="80" height="40" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="460" y="195" textAnchor="middle" fill="white" fontSize="10">Cell[0]</text>

    <rect x="510" y="170" width="80" height="40" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="550" y="195" textAnchor="middle" fill="white" fontSize="10">Cell[1]</text>

    <rect x="600" y="170" width="80" height="40" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="640" y="195" textAnchor="middle" fill="white" fontSize="10">Cell[2]</text>

    {/* Threads to cells */}
    <line x1="440" y1="160" x2="440" y2="170" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-adder)"/>
    <text x="425" y="158" fill="#f59e0b" fontSize="8">T1</text>

    <line x1="550" y1="160" x2="550" y2="170" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-adder)"/>
    <text x="535" y="158" fill="#f59e0b" fontSize="8">T2</text>

    <line x1="660" y1="160" x2="660" y2="170" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-adder)"/>
    <text x="645" y="158" fill="#f59e0b" fontSize="8">T3</text>

    <text x="550" y="235" textAnchor="middle" fill="#4ade80" fontSize="10">No Contention!</text>

    {/* Sum operation */}
    <rect x="475" y="260" width="150" height="40" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="550" y="285" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">sum() = base + Σcells</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

/**
 * AtomicInternals Component
 */
function AtomicInternals({ onBack, breadcrumb }) {
  // State for modal navigation
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'what-is-cas',
      name: 'What is CAS?',
      icon: '⚡',
      color: '#14b8a6',
      description: 'Compare-And-Swap is a CPU instruction for lock-free atomic operations. Understanding CAS is fundamental to lock-free programming.',
      diagram: CASFlowDiagram,
      details: [
        {
          name: 'CAS Fundamentals',
          diagram: CASFlowDiagram,
          explanation: 'Compare-And-Swap (CAS) is an atomic CPU instruction that forms the foundation of lock-free programming. The operation reads a value from memory, compares it with an expected value, and only writes a new value if they match. All three steps happen atomically as a single CPU instruction, making it impossible for other threads to interfere mid-operation.',
          codeExample: `// CAS pseudo-code
boolean compareAndSwap(address, expectedValue, newValue) {
    // Atomic operation - CPU guarantees
    if (*address == expectedValue) {
        *address = newValue;
        return true;  // Success
    }
    return false;  // Failed - value changed
}`
        },
        {
          name: 'Hardware Support',
          explanation: 'CAS is directly supported by modern CPUs through specific instructions. x86/x64 processors use the CMPXCHG instruction, ARM uses LDREX/STREX, and other architectures have equivalent instructions. The JVM abstracts these differences, providing a uniform CAS interface through Unsafe and VarHandle classes.',
          codeExample: `// Java CAS using Unsafe (internal)
public final int getAndIncrement() {
    return U.getAndAddInt(this, VALUE, 1);
}

// Unsafe.getAndAddInt implementation
public final int getAndAddInt(Object o, long offset, int delta) {
    int v;
    do {
        v = getIntVolatile(o, offset);  // Read current
    } while (!compareAndSwapInt(o, offset, v, v + delta));  // CAS loop
    return v;
}`
        },
        {
          name: 'VarHandle API',
          explanation: 'Java 9 introduced VarHandle as a modern, safer alternative to Unsafe. VarHandle provides typed access to variables with atomic operations, memory ordering guarantees, and better performance. It is now the preferred way to implement atomic operations in Java.',
          codeExample: `// VarHandle CAS (Java 9+)
VarHandle VH = MethodHandles.lookup()
    .findVarHandle(MyClass.class, "value", int.class);

// Compare and set
VH.compareAndSet(this, expectedValue, newValue);

// Weak CAS (may spuriously fail, but faster)
VH.weakCompareAndSet(this, expectedValue, newValue);

// Get and add atomically
int previous = (int) VH.getAndAdd(this, delta);`
        }
      ]
    },
    {
      id: 'atomic-integer',
      name: 'AtomicInteger',
      icon: '🔢',
      color: '#3b82f6',
      description: 'AtomicInteger provides lock-free atomic operations on int values using volatile and CAS. Thread-safe without locks!',
      diagram: AtomicIntegerDiagram,
      details: [
        {
          name: 'Internal Structure',
          diagram: AtomicIntegerDiagram,
          explanation: 'AtomicInteger consists of a volatile int field and a VarHandle for CAS operations. The volatile keyword ensures visibility across threads - when one thread modifies the value, all other threads immediately see the change. The VarHandle provides efficient access to the underlying memory with atomic guarantees.',
          codeExample: `// AtomicInteger structure
public class AtomicInteger extends Number {
    private static final VarHandle VALUE;
    private volatile int value;

    static {
        VALUE = MethodHandles.lookup()
            .findVarHandle(AtomicInteger.class, "value", int.class);
    }

    public AtomicInteger(int initialValue) {
        value = initialValue;
    }
}`
        },
        {
          name: 'Basic Operations',
          explanation: 'AtomicInteger provides simple operations like get() and set() which are just volatile reads and writes. These operations are atomic and ensure visibility but do not provide compare-and-swap semantics. For compound operations like increment, CAS loops are used internally.',
          codeExample: `// Simple volatile read
public final int get() {
    return value;
}

// Simple volatile write
public final void set(int newValue) {
    value = newValue;
}

// Lazy set - eventual visibility (faster)
public final void lazySet(int newValue) {
    VALUE.setRelease(this, newValue);
}`
        },
        {
          name: 'CAS Operations',
          explanation: 'The compareAndSet method attempts to atomically update the value if it matches the expected value. It returns true on success and false if another thread changed the value. This single-attempt CAS is the building block for more complex atomic operations.',
          codeExample: `// CAS - single attempt
public final boolean compareAndSet(int expectedValue, int newValue) {
    return VALUE.compareAndSet(this, expectedValue, newValue);
}

// Example usage
AtomicInteger counter = new AtomicInteger(5);
boolean success = counter.compareAndSet(5, 10);  // true
boolean fail = counter.compareAndSet(5, 20);     // false (value is 10)`
        },
        {
          name: 'Increment Operations',
          explanation: 'Increment operations use CAS loops internally. The getAndIncrement method reads the current value, computes the new value, and attempts to CAS. If the CAS fails (another thread modified the value), it retries. This loop continues until successful.',
          codeExample: `// CAS loop for increment
public final int getAndIncrement() {
    return (int) VALUE.getAndAdd(this, 1);
}

// Increment and get
public final int incrementAndGet() {
    return (int) VALUE.getAndAdd(this, 1) + 1;
}

// Custom update function
public final int updateAndGet(IntUnaryOperator updateFunction) {
    int prev = get(), next = 0;
    for (boolean haveNext = false;;) {
        if (!haveNext)
            next = updateFunction.applyAsInt(prev);
        if (VALUE.weakCompareAndSet(this, prev, next))
            return next;
        haveNext = (prev == (prev = get()));
    }
}`
        }
      ]
    },
    {
      id: 'cas-loop',
      name: 'CAS Loop Pattern',
      icon: '🔄',
      color: '#f59e0b',
      description: 'CAS may fail if another thread modified the value. The solution is a retry loop - the fundamental pattern of lock-free programming.',
      diagram: CASLoopDiagram,
      details: [
        {
          name: 'Why Loops Are Needed',
          diagram: CASLoopDiagram,
          explanation: 'CAS is not guaranteed to succeed. If another thread modifies the value between your read and CAS attempt, the CAS fails. The retry loop is the solution: read the current value, compute the new value, attempt CAS, and if it fails, start over. This is called optimistic locking.',
          codeExample: `// CAS loop example: atomic increment
public int incrementAndGet() {
    while (true) {
        int current = get();         // 1. Read current
        int next = current + 1;      // 2. Compute new
        if (compareAndSet(current, next))  // 3. Try CAS
            return next;              // Success!
        // Failed - another thread changed value, retry
    }
}`
        },
        {
          name: 'Complex Operations',
          explanation: 'CAS loops work for any computation, not just simple increments. You can implement atomic multiply, divide, or any custom operation. The pattern is always the same: read, compute, CAS, retry on failure.',
          codeExample: `// Atomic multiply
public int multiplyAndGet(int factor) {
    while (true) {
        int current = get();
        int next = current * factor;
        if (compareAndSet(current, next))
            return next;
        // Retry...
    }
}

// Atomic max
public int maxAndGet(int value) {
    while (true) {
        int current = get();
        int next = Math.max(current, value);
        if (compareAndSet(current, next))
            return next;
    }
}`
        },
        {
          name: 'updateAndGet Pattern',
          explanation: 'Java provides updateAndGet and accumulateAndGet methods for cleaner code. Instead of manually writing CAS loops, you pass a function that computes the new value. The method handles the CAS loop internally.',
          codeExample: `// Using updateAndGet (cleaner)
AtomicInteger counter = new AtomicInteger(0);
counter.updateAndGet(x -> x * 2);  // Atomic double

// Accumulator pattern
counter.accumulateAndGet(5, (current, delta) -> current + delta);

// Custom logic
counter.updateAndGet(x -> {
    if (x < 0) return 0;
    if (x > 100) return 100;
    return x + 1;
});`
        },
        {
          name: 'Failure Scenarios',
          explanation: 'Understanding when and why CAS fails is crucial. Thread 1 reads value 10. Thread 2 reads 10, successfully CAS to 11. Now Thread 1 attempts CAS from 10 to 11, but the value is already 11, so CAS fails. Thread 1 must retry with the new value 11.',
          codeExample: `// CAS can fail scenario:
// Initial value: 10

// Thread 1: read 10
// Thread 2: read 10, CAS 10→11, success
// Thread 1: CAS 10→11 FAILS (value is now 11)
// Thread 1: retry, read 11, CAS 11→12, success

// Visualizing the race:
AtomicInteger ai = new AtomicInteger(10);

// T1 execution:
int t1Current = ai.get();  // reads 10
// ... context switch to T2 ...
// T2 does: ai.compareAndSet(10, 11) // succeeds
// ... back to T1 ...
boolean t1Success = ai.compareAndSet(t1Current, 11);  // false!
// T1 must retry with current value 11`
        }
      ]
    },
    {
      id: 'atomic-reference',
      name: 'AtomicReference',
      icon: '🔗',
      color: '#8b5cf6',
      description: 'AtomicReference provides CAS for object references, enabling lock-free data structures like stacks and queues.',
      diagram: LockFreeStackDiagram,
      details: [
        {
          name: 'Reference CAS',
          explanation: 'AtomicReference works like AtomicInteger but for object references. It uses reference equality (==) not object equality (equals). This is crucial for lock-free data structures where you need to atomically swap one node for another.',
          codeExample: `// AtomicReference usage
AtomicReference<String> ref = new AtomicReference<>("initial");

// Get current value
String current = ref.get();

// Set new value
ref.set("new value");

// Compare and set
boolean success = ref.compareAndSet("initial", "updated");

// Atomic update
ref.updateAndGet(s -> s.toUpperCase());

// Important: CAS uses reference equality!
String s1 = new String("hello");
String s2 = new String("hello");
ref.set(s1);
ref.compareAndSet(s2, "world");  // false! s1 != s2`
        },
        {
          name: 'Lock-Free Stack',
          diagram: LockFreeStackDiagram,
          explanation: 'A lock-free stack uses AtomicReference for the head pointer. Push creates a new node pointing to the current head, then CAS swaps the head. If CAS fails (another thread modified head), retry with the new head. Pop works similarly, CAS to move head to next node.',
          codeExample: `// Lock-free stack using AtomicReference
class LockFreeStack<T> {
    private final AtomicReference<Node<T>> head = new AtomicReference<>();

    public void push(T value) {
        Node<T> newNode = new Node<>(value);
        while (true) {
            Node<T> currentHead = head.get();
            newNode.next = currentHead;
            if (head.compareAndSet(currentHead, newNode))
                return;  // Success
        }
    }

    public T pop() {
        while (true) {
            Node<T> currentHead = head.get();
            if (currentHead == null)
                return null;
            if (head.compareAndSet(currentHead, currentHead.next))
                return currentHead.value;
        }
    }
}`
        },
        {
          name: 'Immutable Updates',
          explanation: 'A common pattern with AtomicReference is using immutable objects. Instead of modifying an object in place, create a new immutable object and CAS swap it. This avoids many concurrency issues and makes the code easier to reason about.',
          codeExample: `// Immutable configuration example
record Config(int timeout, int retries, boolean debug) {}

AtomicReference<Config> config =
    new AtomicReference<>(new Config(1000, 3, false));

// Update timeout atomically
config.updateAndGet(old -> new Config(2000, old.retries(), old.debug()));

// Multiple updates are atomic
config.updateAndGet(old ->
    new Config(old.timeout(), old.retries() + 1, true)
);`
        },
        {
          name: 'AtomicStampedReference',
          explanation: 'AtomicStampedReference solves the ABA problem by adding a version stamp. Each CAS checks both the reference and the stamp. Even if the reference is the same, if the stamp changed, CAS fails. This detects when a value was modified and changed back.',
          codeExample: `// AtomicStampedReference - solves ABA problem
AtomicStampedReference<String> stamped =
    new AtomicStampedReference<>("value", 0);

// Get value and stamp
int[] stampHolder = new int[1];
String value = stamped.get(stampHolder);
int stamp = stampHolder[0];

// CAS checks both reference and stamp
boolean success = stamped.compareAndSet(
    value,           // expected reference
    "new",           // new reference
    stamp,           // expected stamp
    stamp + 1        // new stamp
);

// Usage in lock-free data structure
AtomicStampedReference<Node> head =
    new AtomicStampedReference<>(initialHead, 0);

public Node pop() {
    while (true) {
        int[] stampHolder = new int[1];
        Node currentHead = head.get(stampHolder);
        int stamp = stampHolder[0];
        if (currentHead == null) return null;
        Node newHead = currentHead.next;
        if (head.compareAndSet(currentHead, newHead, stamp, stamp + 1))
            return currentHead;
    }
}`
        }
      ]
    },
    {
      id: 'aba-problem',
      name: 'ABA Problem',
      icon: '⚠️',
      color: '#ef4444',
      description: 'The ABA problem occurs when CAS sees the same value but the state has changed. Understanding and solving this is critical for correct lock-free algorithms.',
      diagram: ABAProblemDiagram,
      details: [
        {
          name: 'The Problem',
          diagram: ABAProblemDiagram,
          explanation: 'The ABA problem happens when Thread 1 reads value A, Thread 2 changes A to B then back to A, and Thread 1\'s CAS succeeds because it still sees A. But the state has changed! This can corrupt data structures. For example, in a stack, a node might be freed and reallocated at the same address.',
          codeExample: `// ABA Problem Example
// Lock-free stack pop:
// Stack: A → B → C

// Thread 1: reads head = A, next = B
// Thread 1: about to CAS(A, B)

// Thread 2: pop A  → Stack: B → C
// Thread 2: pop B  → Stack: C
// Thread 2: push A → Stack: A → C  (A recycled!)

// Thread 1: CAS(A, B) SUCCEEDS! (head is A)
// But now stack is corrupt: points to freed memory!`
        },
        {
          name: 'When It Matters',
          explanation: 'The ABA problem mainly affects lock-free data structures with memory reuse. If you only use immutable objects or never reuse memory, ABA is not a problem. It is most critical in lock-free stacks, queues, and linked lists where nodes can be freed and reallocated.',
          codeExample: `// ABA is NOT a problem here (immutable objects)
AtomicReference<String> ref = new AtomicReference<>("A");
// Even if "A" → "B" → "A", they are different objects
// No memory reuse, no corruption possible

// ABA IS a problem here (node reuse)
class Node {
    Object value;
    Node next;
}
AtomicReference<Node> head = new AtomicReference<>();
// Nodes can be freed and reallocated
// Must use AtomicStampedReference!`
        },
        {
          name: 'Solution: Stamped',
          explanation: 'AtomicStampedReference adds a version counter (stamp) that increments with each update. CAS checks both the reference and the stamp. Even if the reference matches, if the stamp changed, CAS fails. This detects the A→B→A scenario.',
          codeExample: `// Solution: AtomicStampedReference
AtomicStampedReference<Node> head =
    new AtomicStampedReference<>(initialHead, 0);

public Node pop() {
    while (true) {
        int[] stampHolder = new int[1];
        Node currentHead = head.get(stampHolder);
        int stamp = stampHolder[0];

        if (currentHead == null)
            return null;

        Node newHead = currentHead.next;

        // CAS checks BOTH reference AND stamp
        if (head.compareAndSet(currentHead, newHead,
                                stamp, stamp + 1)) {
            return currentHead;
        }
    }
}

// Now the ABA scenario fails:
// T1 reads: head=A, stamp=0
// T2: A→B (stamp=1), B→C (stamp=2), C→A (stamp=3)
// T1 CAS: fails! stamp is 3, not 0`
        },
        {
          name: 'Solution: Markable',
          explanation: 'AtomicMarkableReference is simpler than stamped - it just adds a boolean flag. This is useful when you only need to mark nodes as deleted without tracking version numbers. It is lighter weight than stamped reference.',
          codeExample: `// AtomicMarkableReference - simpler boolean flag
AtomicMarkableReference<Node> ref =
    new AtomicMarkableReference<>(node, false);

// Get value and mark
boolean[] markHolder = new boolean[1];
Node n = ref.get(markHolder);
boolean marked = markHolder[0];

// CAS with mark
ref.compareAndSet(n, newNode, false, true);

// Common pattern: mark-and-sweep
// Mark node as deleted
ref.compareAndSet(node, node, false, true);
// Then remove if marked
if (ref.isMarked()) {
    ref.compareAndSet(node, node.next, true, false);
}`
        }
      ]
    },
    {
      id: 'long-adder',
      name: 'LongAdder',
      icon: '🚀',
      color: '#22c55e',
      description: 'LongAdder solves AtomicLong\'s high-contention problem using striped cells. Much faster for counters with many threads.',
      diagram: LongAdderDiagram,
      details: [
        {
          name: 'The Contention Problem',
          explanation: 'AtomicLong uses a single variable that all threads CAS. Under high contention (many threads), most CAS attempts fail and retry, causing poor performance. LongAdder solves this by giving each thread its own cell to update, eliminating contention.',
          codeExample: `// AtomicLong - all threads compete
AtomicLong counter = new AtomicLong();
counter.incrementAndGet();  // CAS contention!

// With 100 threads all incrementing:
// - Most CAS attempts fail
// - Threads spin in retry loops
// - Poor throughput

// Benchmark results (100 threads):
// AtomicLong:  ~100M ops/sec
// LongAdder:   ~1000M ops/sec (10x faster!)`
        },
        {
          name: 'Striped Architecture',
          diagram: LongAdderDiagram,
          explanation: 'LongAdder maintains a base value plus an array of Cell objects. Each thread is assigned to a cell based on a hash of its thread ID. Threads update their own cells without contention. To get the sum, add the base plus all cell values.',
          codeExample: `// LongAdder - striped cells
LongAdder adder = new LongAdder();
adder.increment();  // Updates thread's cell
long sum = adder.sum();  // Sum all cells

// LongAdder internal structure
public class LongAdder extends Striped64 {
    // From Striped64:
    transient volatile Cell[] cells;  // Striped counters
    transient volatile long base;     // Base counter

    public void add(long x) {
        Cell[] cs; long b, v; int m; Cell c;
        if ((cs = cells) != null ||
            !casBase(b = base, b + x)) {  // Try base first
            // Contention - use cells
            int index = getProbe() & m;   // Thread's cell
            if ((c = cs[index]) == null ||
                !c.cas(v = c.value, v + x)) {
                longAccumulate(x, null, uncontended);
            }
        }
    }
}`
        },
        {
          name: 'Sum Operation',
          explanation: 'The sum method reads the base value plus all cell values. This is not atomic! The sum is a snapshot that may be slightly stale. For high-frequency counting where exact values are not critical (metrics, statistics), this is acceptable and much faster.',
          codeExample: `public long sum() {
    Cell[] cs = cells;
    long sum = base;
    if (cs != null) {
        for (Cell c : cs)
            if (c != null)
                sum += c.value;
    }
    return sum;
}

// Important: sum() is NOT atomic
// It's a snapshot across multiple variables
// Values may change during summation

// Use case: high-frequency counters
LongAdder requests = new LongAdder();
// Many threads increment
requests.increment();
// Periodically read (not every op)
long total = requests.sum();  // Fast snapshot`
        },
        {
          name: 'When to Use Each',
          explanation: 'Use AtomicLong when you need exact values frequently or have low contention. Use LongAdder for high-contention counting where you only read the sum occasionally. LongAdder uses more memory but provides much better throughput under contention.',
          codeExample: `// When to use AtomicLong:
// - Need exact value frequently
// - Low contention (few threads)
// - Strict consistency required
AtomicLong sequenceNumber = new AtomicLong();
long nextId = sequenceNumber.incrementAndGet();

// When to use LongAdder:
// - High contention (many threads)
// - Read sum infrequently
// - Metrics, statistics, monitoring
LongAdder requestCount = new LongAdder();
// Many threads:
requestCount.increment();
// Read occasionally:
long total = requestCount.sum();

// Memory usage:
// AtomicLong: 8 bytes
// LongAdder: ~8 bytes + (num_threads * 8 bytes)
// Trade memory for performance`
        },
        {
          name: 'DoubleAdder',
          explanation: 'DoubleAdder is the floating-point equivalent of LongAdder. It uses the same striped cell architecture for high-throughput double accumulation. Useful for statistics, averages, and metrics that require floating-point precision.',
          codeExample: `// DoubleAdder for floating-point
DoubleAdder average = new DoubleAdder();

// Add values from many threads
average.add(3.14);
average.add(2.71);

// Get sum
double sum = average.sum();

// Common pattern: computing average
DoubleAdder total = new DoubleAdder();
LongAdder count = new LongAdder();

// Multiple threads:
total.add(value);
count.increment();

// Compute average:
double avg = total.sum() / count.sum();`
        }
      ]
    },
    {
      id: 'interview-questions',
      name: 'Interview Questions',
      icon: '💡',
      color: '#ec4899',
      description: 'Common CAS and atomic interview questions with detailed answers and code examples.',
      details: [
        {
          name: 'Q1: What is CAS?',
          explanation: 'Compare-And-Swap (CAS) is an atomic CPU instruction used for lock-free synchronization. It takes three parameters: a memory location, an expected value, and a new value. Atomically, it compares the memory location with the expected value, and if they match, updates it to the new value. Returns true on success, false if the value changed.',
          codeExample: `// Q1: CAS demonstration
AtomicInteger ai = new AtomicInteger(5);

// CAS succeeds - value is 5
boolean success = ai.compareAndSet(5, 10);  // true
System.out.println(ai.get());  // 10

// CAS fails - value is now 10, not 5
boolean fail = ai.compareAndSet(5, 20);  // false
System.out.println(ai.get());  // still 10

// CAS is atomic - all or nothing
// No other thread can see intermediate state`
        },
        {
          name: 'Q2: How does AtomicInteger work?',
          explanation: 'AtomicInteger uses a volatile int field for visibility and VarHandle (or Unsafe) for CAS operations. Simple operations like get/set are volatile reads/writes. Complex operations like increment use a CAS loop: read current value, compute new value, attempt CAS, retry if it fails.',
          codeExample: `// Q2: Implementing counter without locks
class LockFreeCounter {
    private final AtomicInteger count = new AtomicInteger(0);

    public void increment() {
        count.incrementAndGet();
    }

    public int get() {
        return count.get();
    }
}

// Internally, incrementAndGet is:
public final int incrementAndGet() {
    while (true) {
        int current = get();
        int next = current + 1;
        if (compareAndSet(current, next))
            return next;
    }
}`
        },
        {
          name: 'Q3: What is the ABA problem?',
          explanation: 'The ABA problem occurs when a value changes from A to B and back to A. A CAS operation sees A and succeeds, unaware that the value changed in between. This can corrupt lock-free data structures when memory is reused. Solution: AtomicStampedReference adds a version counter to detect changes.',
          codeExample: `// Q3: ABA solution
AtomicStampedReference<Integer> ref =
    new AtomicStampedReference<>(1, 0);

// Thread 1 reads value and stamp
int[] stamp = new int[1];
Integer value = ref.get(stamp);  // value=1, stamp[0]=0

// Thread 2 changes: 1→2 (stamp=1), 2→1 (stamp=2)

// Thread 1 CAS fails! Stamp changed from 0 to 2
boolean success = ref.compareAndSet(
    1,           // expected value
    100,         // new value
    stamp[0],    // expected stamp = 0
    stamp[0]+1   // new stamp
);  // false - stamp is now 2, not 0`
        },
        {
          name: 'Q4: AtomicLong vs LongAdder?',
          explanation: 'AtomicLong uses a single variable that all threads CAS, causing contention under high load. LongAdder uses multiple cells - each thread updates its own cell, eliminating contention. sum() adds all cells. LongAdder is 10x faster under high contention but uses more memory and sum() is not atomic.',
          codeExample: `// Q4: Performance comparison
// High contention scenario (100 threads):

AtomicLong atomicLong = new AtomicLong();
// Many threads incrementing:
atomicLong.incrementAndGet();
// Lots of CAS failures and retries
// ~100M ops/sec

LongAdder longAdder = new LongAdder();
// Many threads incrementing:
longAdder.increment();
// Each thread updates its own cell
// ~1000M ops/sec (10x faster!)

// Trade-off:
// AtomicLong: exact value, atomic, 8 bytes
// LongAdder: eventual sum, snapshot, more memory`
        },
        {
          name: 'Q5: Can CAS fail?',
          explanation: 'Yes! CAS fails if another thread modified the value between your read and CAS attempt. This is not an error - it is expected in concurrent scenarios. The solution is a retry loop: keep trying until CAS succeeds. This is called optimistic locking.',
          codeExample: `// Q5: CAS retry pattern
public int getAndDouble() {
    while (true) {
        int current = value.get();
        int next = current * 2;
        if (value.compareAndSet(current, next))
            return current;
        // CAS failed - another thread changed value
        // Retry with updated value
    }
}

// Why CAS can fail:
// T1: reads value = 10
// T2: reads value = 10
// T2: CAS(10, 11) succeeds
// T1: CAS(10, 11) FAILS - value is now 11
// T1: retries with current value 11`
        },
        {
          name: 'Q6: Why is CAS better than synchronized?',
          explanation: 'CAS is lock-free, meaning threads never block waiting for a lock. No deadlock is possible, no priority inversion, and no expensive context switches. Under low contention, CAS is much faster. Under high contention, lock-free algorithms can still make progress while locks would cause threads to block.',
          codeExample: `// Q6: Lock-free advantages

// Synchronized (locks):
private int counter = 0;
public synchronized void increment() {
    counter++;  // Blocks other threads
}
// Disadvantages:
// - Threads block and wait
// - Context switches are expensive
// - Deadlock possible
// - Priority inversion

// AtomicInteger (CAS):
private AtomicInteger counter = new AtomicInteger(0);
public void increment() {
    counter.incrementAndGet();  // Lock-free
}
// Advantages:
// - No blocking
// - No context switches
// - No deadlock possible
// - Better scalability
// - Lower latency

// Performance comparison (4 threads):
// synchronized:      ~50M ops/sec
// AtomicInteger:     ~200M ops/sec (4x faster!)`
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
      { name: 'Projects', icon: '🚀', page: 'Projects' },
      { name: 'Atomic Internals', icon: '⚡', page: 'Atomic Internals' }
    ]
    if (selectedConcept) {
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    }
    return stack
  }

  const handleBreadcrumbClick = (index, item) => {
    if (index === 0) {
      onBack()  // Go back to Projects page
    } else if (index === 1 && selectedConcept) {
      setSelectedConceptIndex(null)  // Close modal, stay on Atomic Internals page
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
    background: 'linear-gradient(135deg, #0f172a 0%, #115e59 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #5eead4, #14b8a6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(20, 184, 166, 0.2)',
    border: '1px solid rgba(20, 184, 166, 0.3)',
    borderRadius: '0.5rem',
    color: '#5eead4',
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
        <h1 style={titleStyle}>⚡ Atomic & CAS - Internal Workings</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(20, 184, 166, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(20, 184, 166, 0.2)'
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
          colors={ATOMIC_COLORS}
        />
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
              colors={ATOMIC_COLORS}
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

export default AtomicInternals
