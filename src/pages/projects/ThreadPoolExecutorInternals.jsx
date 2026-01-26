/**
 * ThreadPoolExecutor Internals - Tab Template Format
 *
 * Deep dive into Java's ThreadPoolExecutor implementation
 * Essential for concurrency interviews
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const THREADPOOL_COLORS = {
  primary: '#22c55e',
  primaryHover: '#4ade80',
  bg: 'rgba(34, 197, 94, 0.1)',
  border: 'rgba(34, 197, 94, 0.3)',
  arrow: '#22c55e',
  hoverBg: 'rgba(34, 197, 94, 0.2)',
  topicBg: 'rgba(34, 197, 94, 0.2)'
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

const ThreadPoolArchitectureDiagram = () => (
  <svg viewBox="0 0 800 320" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      ThreadPoolExecutor Architecture
    </text>

    {/* Submit Tasks */}
    <rect x="30" y="60" width="100" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="80" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">submit()</text>
    <text x="80" y="100" textAnchor="middle" fill="#93c5fd" fontSize="9">execute()</text>

    {/* Arrow to decision */}
    <line x1="130" y1="85" x2="175" y2="85" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowhead)"/>

    {/* Core Pool Decision */}
    <polygon points="220,60 280,85 220,110 160,85" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="220" y="82" textAnchor="middle" fill="#fbbf24" fontSize="8">workers</text>
    <text x="220" y="92" textAnchor="middle" fill="#fbbf24" fontSize="8">&lt; core?</text>

    {/* Arrow down to add worker */}
    <line x1="220" y1="110" x2="220" y2="140" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    <text x="210" y="130" fill="#94a3b8" fontSize="8">YES</text>

    {/* Add Core Worker */}
    <rect x="170" y="145" width="100" height="40" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="220" y="165" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">addWorker</text>
    <text x="220" y="177" textAnchor="middle" fill="#bbf7d0" fontSize="8">(core=true)</text>

    {/* Arrow right to queue */}
    <line x1="280" y1="85" x2="320" y2="85" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    <text x="300" y="75" fill="#94a3b8" fontSize="8">NO</text>

    {/* Work Queue */}
    <rect x="325" y="55" width="140" height="60" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="395" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Work Queue</text>
    <text x="395" y="90" textAnchor="middle" fill="#c4b5fd" fontSize="8">BlockingQueue</text>
    <text x="395" y="102" textAnchor="middle" fill="#c4b5fd" fontSize="8">[task1, task2, ...]</text>

    {/* Queue Full Decision */}
    <polygon points="560,60 620,85 560,110 500,85" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="560" y="82" textAnchor="middle" fill="#fbbf24" fontSize="8">queue</text>
    <text x="560" y="92" textAnchor="middle" fill="#fbbf24" fontSize="8">full?</text>

    <line x1="465" y1="85" x2="500" y2="85" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowhead)"/>

    {/* Arrow down for non-core worker */}
    <line x1="560" y1="110" x2="560" y2="140" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    <text x="548" y="130" fill="#94a3b8" fontSize="8">YES</text>

    {/* Max Pool Decision */}
    <polygon points="560,145 620,170 560,195 500,170" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="560" y="165" textAnchor="middle" fill="#fbbf24" fontSize="8">workers</text>
    <text x="560" y="177" textAnchor="middle" fill="#fbbf24" fontSize="8">&lt; max?</text>

    {/* Add Non-Core Worker */}
    <line x1="560" y1="195" x2="560" y2="220" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    <text x="548" y="212" fill="#94a3b8" fontSize="8">YES</text>
    <rect x="510" y="225" width="100" height="40" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="560" y="245" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">addWorker</text>
    <text x="560" y="257" textAnchor="middle" fill="#bbf7d0" fontSize="8">(core=false)</text>

    {/* Reject */}
    <line x1="620" y1="170" x2="680" y2="170" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    <text x="650" y="160" fill="#94a3b8" fontSize="8">NO</text>
    <rect x="685" y="145" width="90" height="50" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="730" y="170" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">REJECT</text>
    <text x="730" y="185" textAnchor="middle" fill="#fecaca" fontSize="8">(policy)</text>

    {/* Worker Pool */}
    <rect x="325" y="220" width="140" height="80" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="395" y="240" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Worker Pool</text>
    <rect x="335" y="250" width="35" height="20" rx="4" fill="#22c55e"/>
    <text x="352" y="264" textAnchor="middle" fill="white" fontSize="7">W1</text>
    <rect x="375" y="250" width="35" height="20" rx="4" fill="#22c55e"/>
    <text x="392" y="264" textAnchor="middle" fill="white" fontSize="7">W2</text>
    <rect x="415" y="250" width="35" height="20" rx="4" fill="#22c55e"/>
    <text x="432" y="264" textAnchor="middle" fill="white" fontSize="7">W3</text>
    <rect x="355" y="275" width="35" height="20" rx="4" fill="#22c55e" opacity="0.5"/>
    <text x="372" y="289" textAnchor="middle" fill="white" fontSize="7">...</text>
    <rect x="395" y="275" width="35" height="20" rx="4" fill="#22c55e" opacity="0.5"/>
    <text x="412" y="289" textAnchor="middle" fill="white" fontSize="7">Wn</text>

    {/* Arrow from queue to workers */}
    <line x1="395" y1="115" x2="395" y2="215" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    <text x="405" y="170" fill="#94a3b8" fontSize="8">getTask()</text>
  </svg>
)

const WorkQueueDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Work Queue Types Comparison
    </text>

    {/* LinkedBlockingQueue */}
    <rect x="30" y="50" width="170" height="70" rx="8" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="115" y="72" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">LinkedBlockingQueue</text>
    <text x="115" y="88" textAnchor="middle" fill="#fecaca" fontSize="9">Unbounded (danger!)</text>
    <text x="115" y="102" textAnchor="middle" fill="#fca5a5" fontSize="8">maxPoolSize ignored</text>
    <text x="115" y="115" textAnchor="middle" fill="#fca5a5" fontSize="8">OOM risk</text>

    {/* ArrayBlockingQueue */}
    <rect x="220" y="50" width="170" height="70" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="305" y="72" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">ArrayBlockingQueue</text>
    <text x="305" y="88" textAnchor="middle" fill="#bbf7d0" fontSize="9">Bounded (safe)</text>
    <text x="305" y="102" textAnchor="middle" fill="#86efac" fontSize="8">Uses maxPoolSize</text>
    <text x="305" y="115" textAnchor="middle" fill="#86efac" fontSize="8">Backpressure</text>

    {/* SynchronousQueue */}
    <rect x="410" y="50" width="170" height="70" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="495" y="72" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">SynchronousQueue</text>
    <text x="495" y="88" textAnchor="middle" fill="#93c5fd" fontSize="9">Zero capacity</text>
    <text x="495" y="102" textAnchor="middle" fill="#93c5fd" fontSize="8">Direct handoff</text>
    <text x="495" y="115" textAnchor="middle" fill="#93c5fd" fontSize="8">Short-lived tasks</text>

    {/* PriorityBlockingQueue */}
    <rect x="600" y="50" width="170" height="70" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="685" y="72" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">PriorityBlockingQueue</text>
    <text x="685" y="88" textAnchor="middle" fill="#c4b5fd" fontSize="9">Ordered by priority</text>
    <text x="685" y="102" textAnchor="middle" fill="#c4b5fd" fontSize="8">Unbounded</text>
    <text x="685" y="115" textAnchor="middle" fill="#c4b5fd" fontSize="8">Priority scheduling</text>

    {/* Factory Methods */}
    <text x="400" y="150" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">
      Factory Methods Use:
    </text>

    <rect x="80" y="165" width="150" height="35" rx="6" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="1"/>
    <text x="155" y="187" textAnchor="middle" fill="#f87171" fontSize="9">newFixedThreadPool</text>

    <rect x="250" y="165" width="150" height="35" rx="6" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="325" y="187" textAnchor="middle" fill="#60a5fa" fontSize="9">newCachedThreadPool</text>

    <rect x="420" y="165" width="150" height="35" rx="6" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="1"/>
    <text x="495" y="187" textAnchor="middle" fill="#f87171" fontSize="9">newSingleThreadExec</text>

    <rect x="590" y="165" width="150" height="35" rx="6" fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="665" y="187" textAnchor="middle" fill="#a78bfa" fontSize="9">newScheduledPool</text>
  </svg>
)

const RejectionPoliciesDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow3" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Rejection Policies
    </text>

    {/* Task Rejected */}
    <rect x="320" y="45" width="160" height="40" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="400" y="70" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Task Rejected!</text>

    {/* Four policies */}
    <line x1="400" y1="85" x2="100" y2="120" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow3)"/>
    <line x1="400" y1="85" x2="300" y2="120" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow3)"/>
    <line x1="400" y1="85" x2="500" y2="120" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow3)"/>
    <line x1="400" y1="85" x2="700" y2="120" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow3)"/>

    {/* AbortPolicy */}
    <rect x="30" y="125" width="140" height="60" rx="8" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="100" y="147" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">AbortPolicy</text>
    <text x="100" y="162" textAnchor="middle" fill="#fecaca" fontSize="8">(default)</text>
    <text x="100" y="177" textAnchor="middle" fill="#fca5a5" fontSize="8">Throws Exception</text>

    {/* CallerRunsPolicy */}
    <rect x="230" y="125" width="140" height="60" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="300" y="147" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">CallerRunsPolicy</text>
    <text x="300" y="162" textAnchor="middle" fill="#bbf7d0" fontSize="8">(recommended)</text>
    <text x="300" y="177" textAnchor="middle" fill="#86efac" fontSize="8">Caller runs task</text>

    {/* DiscardPolicy */}
    <rect x="430" y="125" width="140" height="60" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="500" y="147" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">DiscardPolicy</text>
    <text x="500" y="162" textAnchor="middle" fill="#fde68a" fontSize="8">(silent drop)</text>
    <text x="500" y="177" textAnchor="middle" fill="#fcd34d" fontSize="8">Task lost</text>

    {/* DiscardOldestPolicy */}
    <rect x="630" y="125" width="140" height="60" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="700" y="147" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">DiscardOldest</text>
    <text x="700" y="162" textAnchor="middle" fill="#c4b5fd" fontSize="8">(drop oldest)</text>
    <text x="700" y="177" textAnchor="middle" fill="#c4b5fd" fontSize="8">Retry new</text>
  </svg>
)

const CtlFieldDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      ctl Field Structure (AtomicInteger - 32 bits)
    </text>

    {/* 32-bit field */}
    <rect x="100" y="50" width="600" height="50" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>

    {/* State bits (3 bits) */}
    <rect x="100" y="50" width="90" height="50" rx="8" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <text x="145" y="75" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">State</text>
    <text x="145" y="90" textAnchor="middle" fill="#fca5a5" fontSize="9">3 bits</text>

    {/* Worker count (29 bits) */}
    <rect x="190" y="50" width="510" height="50" rx="8" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="445" y="75" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Worker Count</text>
    <text x="445" y="90" textAnchor="middle" fill="#86efac" fontSize="9">29 bits (~500 million max)</text>

    {/* State values */}
    <text x="100" y="130" fill="#f87171" fontSize="10">RUNNING (-1)</text>
    <text x="220" y="130" fill="#fbbf24" fontSize="10">SHUTDOWN (0)</text>
    <text x="340" y="130" fill="#60a5fa" fontSize="10">STOP (1)</text>
    <text x="450" y="130" fill="#a78bfa" fontSize="10">TIDYING (2)</text>
    <text x="580" y="130" fill="#4ade80" fontSize="10">TERMINATED (3)</text>

    {/* State flow */}
    <text x="400" y="160" textAnchor="middle" fill="#64748b" fontSize="10">
      RUNNING → SHUTDOWN → TIDYING → TERMINATED (or RUNNING → STOP → TIDYING → TERMINATED)
    </text>
  </svg>
)

const WorkerLifecycleDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow4" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Worker Thread Lifecycle
    </text>

    {/* Created */}
    <rect x="50" y="60" width="100" height="40" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Created</text>

    <line x1="150" y1="80" x2="190" y2="80" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow4)"/>

    {/* runWorker */}
    <rect x="195" y="60" width="100" height="40" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="245" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">runWorker()</text>

    <line x1="295" y1="80" x2="335" y2="80" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow4)"/>

    {/* Main Loop */}
    <rect x="340" y="45" width="200" height="140" rx="8" fill="rgba(34, 197, 94, 0.15)" stroke="#22c55e" strokeWidth="2"/>
    <text x="440" y="70" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Main Loop</text>

    {/* getTask */}
    <rect x="360" y="85" width="80" height="35" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="400" y="107" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">getTask()</text>

    <line x1="440" y1="102" x2="460" y2="102" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow4)"/>

    {/* task.run */}
    <rect x="465" y="85" width="60" height="35" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1"/>
    <text x="495" y="107" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">run()</text>

    {/* Loop arrow */}
    <path d="M 440 130 Q 440 155 400 155 Q 360 155 360 130" fill="none" stroke="#22c55e" strokeWidth="2"/>
    <polygon points="360,130 355,140 365,140" fill="#22c55e"/>

    {/* Exit condition */}
    <line x1="540" y1="115" x2="600" y2="115" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow4)"/>
    <text x="570" y="105" fill="#94a3b8" fontSize="8">null</text>

    {/* processWorkerExit */}
    <rect x="605" y="95" width="120" height="40" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="665" y="115" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">processWorkerExit</text>
    <text x="665" y="127" textAnchor="middle" fill="#fecaca" fontSize="8">Worker dies</text>

    {/* Hooks */}
    <rect x="360" y="200" width="180" height="60" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="450" y="220" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Hooks (override)</text>
    <text x="450" y="238" textAnchor="middle" fill="#c4b5fd" fontSize="9">beforeExecute()</text>
    <text x="450" y="252" textAnchor="middle" fill="#c4b5fd" fontSize="9">afterExecute()</text>

    <line x1="440" y1="185" x2="440" y2="195" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4"/>
  </svg>
)

const ShutdownDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow5" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
      </marker>
      <marker id="arrow6" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Shutdown Methods Comparison
    </text>

    {/* shutdown() */}
    <rect x="50" y="50" width="300" height="130" rx="10" fill="rgba(34, 197, 94, 0.15)" stroke="#22c55e" strokeWidth="2"/>
    <text x="200" y="75" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">shutdown()</text>
    <text x="200" y="95" textAnchor="middle" fill="#86efac" fontSize="9">Graceful shutdown</text>

    <rect x="70" y="105" width="120" height="25" rx="4" fill="rgba(34, 197, 94, 0.3)"/>
    <text x="130" y="122" textAnchor="middle" fill="#4ade80" fontSize="8">No new tasks</text>

    <rect x="70" y="135" width="120" height="25" rx="4" fill="rgba(34, 197, 94, 0.3)"/>
    <text x="130" y="152" textAnchor="middle" fill="#4ade80" fontSize="8">Process queue</text>

    <rect x="210" y="105" width="120" height="25" rx="4" fill="rgba(34, 197, 94, 0.3)"/>
    <text x="270" y="122" textAnchor="middle" fill="#4ade80" fontSize="8">Interrupt idle</text>

    <rect x="210" y="135" width="120" height="25" rx="4" fill="rgba(34, 197, 94, 0.3)"/>
    <text x="270" y="152" textAnchor="middle" fill="#4ade80" fontSize="8">Wait for tasks</text>

    {/* shutdownNow() */}
    <rect x="450" y="50" width="300" height="130" rx="10" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" strokeWidth="2"/>
    <text x="600" y="75" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="bold">shutdownNow()</text>
    <text x="600" y="95" textAnchor="middle" fill="#fca5a5" fontSize="9">Immediate stop</text>

    <rect x="470" y="105" width="120" height="25" rx="4" fill="rgba(239, 68, 68, 0.3)"/>
    <text x="530" y="122" textAnchor="middle" fill="#f87171" fontSize="8">No new tasks</text>

    <rect x="470" y="135" width="120" height="25" rx="4" fill="rgba(239, 68, 68, 0.3)"/>
    <text x="530" y="152" textAnchor="middle" fill="#f87171" fontSize="8">Stop processing</text>

    <rect x="610" y="105" width="120" height="25" rx="4" fill="rgba(239, 68, 68, 0.3)"/>
    <text x="670" y="122" textAnchor="middle" fill="#f87171" fontSize="8">Interrupt ALL</text>

    <rect x="610" y="135" width="120" height="25" rx="4" fill="rgba(239, 68, 68, 0.3)"/>
    <text x="670" y="152" textAnchor="middle" fill="#f87171" fontSize="8">Return pending</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function ThreadPoolExecutorInternals({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'why-threadpool',
      name: 'Why ThreadPoolExecutor?',
      icon: '⚡',
      color: '#22c55e',
      description: 'Understanding thread pool benefits over manual thread creation and the problems it solves.',
      diagram: ThreadPoolArchitectureDiagram,
      details: [
        {
          name: 'Problems with Manual Threads',
          explanation: `Creating threads manually for each task causes serious problems:

• Thread creation is expensive - memory allocation, OS resources
• Too many threads = context switching overhead
• No control over resource usage - can exhaust system
• Hard to manage thread lifecycle
• No task queuing - lose tasks during bursts`,
          codeExample: `// BAD - Creating threads manually
for (int i = 0; i < 10000; i++) {
    new Thread(() -> processTask()).start();  // 10000 threads!
    // Memory exhaustion, poor performance
}

// Each thread:
// - Allocates ~1MB stack space
// - OS overhead for scheduling
// - Context switching between threads
// - No way to limit or control`
        },
        {
          name: 'ThreadPoolExecutor Benefits',
          diagram: ThreadPoolArchitectureDiagram,
          explanation: `ThreadPoolExecutor solves all these problems:

• Thread reuse - workers execute multiple tasks
• Bounded thread count - prevents resource exhaustion
• Task queuing - handles bursts of tasks gracefully
• Configurable policies - rejection, thread factory, hooks
• Built-in monitoring - pool size, completed tasks, queue size
• Graceful shutdown - orderly task completion`,
          codeExample: `// GOOD - Using ThreadPoolExecutor
ExecutorService executor = new ThreadPoolExecutor(
    10,                      // corePoolSize
    20,                      // maximumPoolSize
    60L, TimeUnit.SECONDS,   // keepAliveTime
    new LinkedBlockingQueue<>(100)  // workQueue
);

for (int i = 0; i < 10000; i++) {
    executor.submit(() -> processTask());  // Reuses 10-20 threads
}

executor.shutdown();`
        },
        {
          name: 'Factory Methods',
          explanation: `ThreadPoolExecutor is the foundation for all Executors factory methods:

• newFixedThreadPool(n) - fixed number of threads
• newCachedThreadPool() - elastic pool, grows/shrinks
• newSingleThreadExecutor() - sequential execution
• newScheduledThreadPool(n) - delayed/periodic tasks

WARNING: Factory methods hide dangerous defaults! Prefer explicit construction.`,
          codeExample: `// Factory methods (convenient but dangerous)
ExecutorService fixed = Executors.newFixedThreadPool(10);
ExecutorService cached = Executors.newCachedThreadPool();
ExecutorService single = Executors.newSingleThreadExecutor();
ScheduledExecutorService scheduled = Executors.newScheduledThreadPool(4);

// What they actually create (hidden dangers):
// newFixedThreadPool(n):
//   new ThreadPoolExecutor(n, n, 0L, MILLISECONDS,
//       new LinkedBlockingQueue<>());  // UNBOUNDED QUEUE!

// newCachedThreadPool():
//   new ThreadPoolExecutor(0, MAX_VALUE, 60L, SECONDS,
//       new SynchronousQueue<>());  // UNLIMITED THREADS!`
        }
      ]
    },
    {
      id: 'core-parameters',
      name: 'Core Parameters',
      icon: '⚙️',
      color: '#3b82f6',
      description: 'The 7 key parameters that control ThreadPoolExecutor behavior and task flow.',
      diagram: ThreadPoolArchitectureDiagram,
      details: [
        {
          name: 'Constructor Parameters',
          diagram: ThreadPoolArchitectureDiagram,
          explanation: `ThreadPoolExecutor has 7 key parameters:

1. corePoolSize: Minimum threads kept alive (even if idle)
2. maximumPoolSize: Maximum threads allowed
3. keepAliveTime: How long excess threads wait before terminating
4. unit: Time unit for keepAliveTime
5. workQueue: Queue for holding tasks before execution
6. threadFactory: Factory for creating new threads
7. handler: Policy when queue is full and max threads reached`,
          codeExample: `public ThreadPoolExecutor(
    int corePoolSize,           // Min threads (always kept alive)
    int maximumPoolSize,        // Max threads allowed
    long keepAliveTime,         // Idle time before excess thread dies
    TimeUnit unit,              // Time unit
    BlockingQueue<Runnable> workQueue,  // Task queue
    ThreadFactory threadFactory,         // Creates threads
    RejectedExecutionHandler handler     // Rejection policy
)`
        },
        {
          name: 'Task Submission Flow',
          diagram: ThreadPoolArchitectureDiagram,
          explanation: `When a task is submitted, this is the decision flow:

1. If threads < corePoolSize → create new core thread
2. If threads >= corePoolSize → add task to queue
3. If queue is full AND threads < maxPoolSize → create new non-core thread
4. If queue is full AND threads >= maxPoolSize → reject task (using handler)

This ensures core threads are created first, queue is used next, then scale up, then reject.`,
          codeExample: `// Example: Web server thread pool
ThreadPoolExecutor webPool = new ThreadPoolExecutor(
    10,                              // 10 core threads (always ready)
    100,                             // Scale up to 100 under load
    30L, TimeUnit.SECONDS,           // Idle threads die after 30s
    new ArrayBlockingQueue<>(500),   // Queue 500 tasks max
    new ThreadFactory() {
        private int count = 0;
        public Thread newThread(Runnable r) {
            return new Thread(r, "WebWorker-" + count++);
        }
    },
    new ThreadPoolExecutor.CallerRunsPolicy()  // Backpressure
);`
        },
        {
          name: 'Core Thread Timeout',
          explanation: `By default, core threads live forever even when idle. You can change this with allowCoreThreadTimeOut(true).

When enabled:
• Core threads can timeout and die
• Pool can shrink to 0 threads when idle
• More elastic - saves resources during quiet periods
• Good for services with variable load`,
          codeExample: `ThreadPoolExecutor pool = new ThreadPoolExecutor(
    10, 50, 60L, TimeUnit.SECONDS,
    new ArrayBlockingQueue<>(100)
);

// Allow core threads to timeout too (for elasticity)
pool.allowCoreThreadTimeOut(true);

// Now if no tasks for 60 seconds, even core threads die
// Pool can shrink from 10 to 0 threads during idle periods

// Check current settings
boolean allowsTimeout = pool.allowsCoreThreadTimeOut();
int coreSize = pool.getCorePoolSize();
int maxSize = pool.getMaximumPoolSize();
long keepAlive = pool.getKeepAliveTime(TimeUnit.SECONDS);`
        }
      ]
    },
    {
      id: 'work-queues',
      name: 'Work Queue Types',
      icon: '📦',
      color: '#8b5cf6',
      description: 'Different queue implementations dramatically affect pool behavior and scalability.',
      diagram: WorkQueueDiagram,
      details: [
        {
          name: 'LinkedBlockingQueue',
          diagram: WorkQueueDiagram,
          explanation: `LinkedBlockingQueue (unbounded) - DANGER!

• Default for newFixedThreadPool()
• Never creates threads beyond corePoolSize
• Can grow infinitely → OOM risk!
• maximumPoolSize is effectively IGNORED

When to use: Only when you have external rate limiting and trust the load.`,
          codeExample: `// LinkedBlockingQueue - DANGER: unbounded!
// maxPoolSize is IGNORED because queue never fills up
ExecutorService fixed = new ThreadPoolExecutor(
    10, 100,  // maxPoolSize=100 is useless!
    60L, TimeUnit.SECONDS,
    new LinkedBlockingQueue<>()  // Unbounded - tasks queue forever
);
// Tasks keep queuing, threads stay at 10, may OOM

// This is what newFixedThreadPool() creates:
// new ThreadPoolExecutor(n, n, 0L, MILLISECONDS,
//     new LinkedBlockingQueue<>());  // OOM waiting to happen!`
        },
        {
          name: 'ArrayBlockingQueue',
          diagram: WorkQueueDiagram,
          explanation: `ArrayBlockingQueue (bounded) - RECOMMENDED

• Fixed capacity - you control memory usage
• Enables maxPoolSize to be used
• Provides backpressure - rejects when overloaded
• Requires rejection handler for overflow

This is the safest choice for production systems.`,
          codeExample: `// ArrayBlockingQueue - bounded, uses maxPoolSize
ExecutorService bounded = new ThreadPoolExecutor(
    10, 100,  // Will actually scale from 10 to 100
    60L, TimeUnit.SECONDS,
    new ArrayBlockingQueue<>(50),  // Only 50 tasks queued
    new ThreadPoolExecutor.CallerRunsPolicy()
);

// Flow:
// 1. First 10 tasks → create core threads
// 2. Next 50 tasks → queue
// 3. Next 90 tasks → create non-core threads (up to 100)
// 4. Beyond that → CallerRunsPolicy (caller runs the task)`
        },
        {
          name: 'SynchronousQueue',
          diagram: WorkQueueDiagram,
          explanation: `SynchronousQueue (zero capacity) - Direct Handoff

• Default for newCachedThreadPool()
• No queuing at all - direct handoff
• Always creates new thread if none available
• Great for short-lived, burst-y tasks
• Danger: Can create unlimited threads!`,
          codeExample: `// SynchronousQueue - direct handoff, no queuing
ExecutorService cached = new ThreadPoolExecutor(
    0, Integer.MAX_VALUE,  // 0 core, unlimited max
    60L, TimeUnit.SECONDS,
    new SynchronousQueue<>()  // No queue!
);

// Every task gets a thread immediately (or blocks producer)
// Threads die after 60s idle

// This is what newCachedThreadPool() creates:
// Good for: short-lived tasks, variable load
// Bad for: long-running tasks, sustained high load
//          (can create thousands of threads!)`
        },
        {
          name: 'PriorityBlockingQueue',
          explanation: `PriorityBlockingQueue - Priority Ordering

• Tasks ordered by Comparator or natural ordering
• Unbounded (like LinkedBlockingQueue)
• Good for priority-based scheduling
• Tasks must implement Comparable or provide Comparator`,
          codeExample: `// PriorityBlockingQueue - tasks ordered by priority
class PriorityTask implements Runnable, Comparable<PriorityTask> {
    private final int priority;
    private final Runnable task;

    public PriorityTask(int priority, Runnable task) {
        this.priority = priority;
        this.task = task;
    }

    @Override
    public int compareTo(PriorityTask other) {
        return Integer.compare(other.priority, this.priority);
    }

    @Override
    public void run() { task.run(); }
}

ExecutorService priorityPool = new ThreadPoolExecutor(
    5, 10, 60L, TimeUnit.SECONDS,
    new PriorityBlockingQueue<>()
);

// Higher priority tasks execute first
priorityPool.submit(new PriorityTask(1, () -> handleLowPriority()));
priorityPool.submit(new PriorityTask(10, () -> handleHighPriority()));`
        }
      ]
    },
    {
      id: 'rejection-policies',
      name: 'Rejection Policies',
      icon: '🚫',
      color: '#ef4444',
      description: 'What happens when the pool cannot accept more tasks - four built-in strategies.',
      diagram: RejectionPoliciesDiagram,
      details: [
        {
          name: 'AbortPolicy (Default)',
          diagram: RejectionPoliciesDiagram,
          explanation: `AbortPolicy throws RejectedExecutionException when a task cannot be accepted.

• This is the DEFAULT policy
• Caller must handle the exception
• Task is not executed
• Good when you want explicit failure handling

Use when: You need to know immediately when tasks are rejected.`,
          codeExample: `// AbortPolicy (default) - throws exception
ThreadPoolExecutor pool = new ThreadPoolExecutor(
    1, 1, 0L, TimeUnit.SECONDS,
    new ArrayBlockingQueue<>(1),
    new ThreadPoolExecutor.AbortPolicy()
);

try {
    pool.submit(task);
} catch (RejectedExecutionException e) {
    // Handle rejection - maybe retry later
    log.error("Task rejected!", e);
    saveToRetryQueue(task);
}`
        },
        {
          name: 'CallerRunsPolicy',
          diagram: RejectionPoliciesDiagram,
          explanation: `CallerRunsPolicy makes the calling thread execute the task itself.

• No task is lost
• Provides natural backpressure
• Slows down task submission
• The calling thread blocks while running the task

RECOMMENDED for most production use cases!`,
          codeExample: `// CallerRunsPolicy - caller executes task (recommended!)
ThreadPoolExecutor pool = new ThreadPoolExecutor(
    10, 100, 60L, TimeUnit.SECONDS,
    new ArrayBlockingQueue<>(500),
    new ThreadPoolExecutor.CallerRunsPolicy()
);

// If rejected, the submitting thread runs the task
// This provides natural backpressure:
// - Producer slows down when pool is saturated
// - No tasks are lost
// - System degrades gracefully`
        },
        {
          name: 'DiscardPolicy',
          diagram: RejectionPoliciesDiagram,
          explanation: `DiscardPolicy silently drops the rejected task.

• Task is lost with no notification
• No exception thrown
• Caller has no idea task was dropped
• Use only when task loss is acceptable

WARNING: Only use when you truly don't care about losing tasks.`,
          codeExample: `// DiscardPolicy - silently drops task
ThreadPoolExecutor pool = new ThreadPoolExecutor(
    1, 1, 0L, TimeUnit.SECONDS,
    new ArrayBlockingQueue<>(1),
    new ThreadPoolExecutor.DiscardPolicy()
);

// Task is lost - no exception, no execution
// Use for: optional work, stats collection, logging
// DON'T use for: critical tasks, user requests`
        },
        {
          name: 'DiscardOldestPolicy',
          diagram: RejectionPoliciesDiagram,
          explanation: `DiscardOldestPolicy drops the oldest queued task and retries the new one.

• Oldest task in queue is discarded
• New task is submitted again
• May discard important tasks
• Prioritizes newer work over older`,
          codeExample: `// DiscardOldestPolicy - drops oldest, retries new
ThreadPoolExecutor pool = new ThreadPoolExecutor(
    1, 1, 0L, TimeUnit.SECONDS,
    new ArrayBlockingQueue<>(1),
    new ThreadPoolExecutor.DiscardOldestPolicy()
);
// Oldest task in queue is dropped, new task is queued`
        },
        {
          name: 'Custom Handler',
          explanation: `You can implement your own RejectedExecutionHandler for custom behavior:

• Log to monitoring systems
• Persist to database for retry
• Send to dead letter queue
• Implement circuit breaker pattern
• Rate limit the caller`,
          codeExample: `// Custom rejection handler
RejectedExecutionHandler customHandler = (r, executor) -> {
    // Log to monitoring
    log.warn("Task rejected: " + r.toString());
    metrics.increment("executor.rejected");

    // Persist to dead letter queue
    saveToDeadLetterQueue(r);

    // Or implement circuit breaker
    if (rejectionCount.incrementAndGet() > 100) {
        throw new ServiceOverloadedException("Too many rejections");
    }
};

ThreadPoolExecutor pool = new ThreadPoolExecutor(
    10, 100, 60L, TimeUnit.SECONDS,
    new ArrayBlockingQueue<>(500),
    customHandler
);`
        }
      ]
    },
    {
      id: 'internal-state',
      name: 'Internal State (ctl)',
      icon: '🔢',
      color: '#f59e0b',
      description: 'How ThreadPoolExecutor packs state and worker count into a single atomic integer.',
      diagram: CtlFieldDiagram,
      details: [
        {
          name: 'The ctl Field',
          diagram: CtlFieldDiagram,
          explanation: `ThreadPoolExecutor packs both pool state and worker count into a single AtomicInteger called 'ctl'.

ctl structure (32 bits):
• Upper 3 bits: runState
• Lower 29 bits: workerCount (up to ~500 million)

This allows atomic updates to both state and count simultaneously.`,
          codeExample: `// The ctl field packs state + count into one AtomicInteger
private final AtomicInteger ctl = new AtomicInteger(ctlOf(RUNNING, 0));

// Bit layout
private static final int COUNT_BITS = Integer.SIZE - 3;  // 29 bits
private static final int CAPACITY   = (1 << COUNT_BITS) - 1;  // ~500 million

// Extract state and count from ctl
private static int runStateOf(int c)     { return c & ~CAPACITY; }
private static int workerCountOf(int c)  { return c & CAPACITY; }
private static int ctlOf(int rs, int wc) { return rs | wc; }`
        },
        {
          name: 'Pool States',
          diagram: CtlFieldDiagram,
          explanation: `Five pool states stored in the upper 3 bits:

1. RUNNING (-1): Accept new tasks, process queued tasks
2. SHUTDOWN (0): Don't accept new, process queued
3. STOP (1): Don't accept new, don't process queued, interrupt running
4. TIDYING (2): All tasks terminated, workerCount = 0
5. TERMINATED (3): terminated() hook completed`,
          codeExample: `// States stored in high 3 bits
private static final int RUNNING    = -1 << COUNT_BITS;  // 111...
private static final int SHUTDOWN   =  0 << COUNT_BITS;  // 000...
private static final int STOP       =  1 << COUNT_BITS;  // 001...
private static final int TIDYING    =  2 << COUNT_BITS;  // 010...
private static final int TERMINATED =  3 << COUNT_BITS;  // 011...

// State checks
private static boolean isRunning(int c) {
    return c < SHUTDOWN;  // RUNNING is negative
}

// Example: ctl value interpretation
// ctl = -536870900 (binary: 111...01100)
// runState = RUNNING (111...)
// workerCount = 12 (01100)`
        },
        {
          name: 'State Transitions',
          diagram: CtlFieldDiagram,
          explanation: `State transitions are one-way and follow these rules:

RUNNING → SHUTDOWN: Called shutdown()
RUNNING/SHUTDOWN → STOP: Called shutdownNow()
SHUTDOWN → TIDYING: Queue and pool empty
STOP → TIDYING: Pool empty
TIDYING → TERMINATED: terminated() completes

States only move forward, never backward.`,
          codeExample: `// State transition methods
private void advanceRunState(int targetState) {
    for (;;) {
        int c = ctl.get();
        if (runStateAtLeast(c, targetState) ||
            ctl.compareAndSet(c, ctlOf(targetState, workerCountOf(c))))
            break;
    }
}

// Atomic increment/decrement of worker count
private boolean compareAndIncrementWorkerCount(int expect) {
    return ctl.compareAndSet(expect, expect + 1);
}

private boolean compareAndDecrementWorkerCount(int expect) {
    return ctl.compareAndSet(expect, expect - 1);
}`
        }
      ]
    },
    {
      id: 'worker-implementation',
      name: 'Worker Implementation',
      icon: '👷',
      color: '#ec4899',
      description: 'How Worker class wraps threads and manages task execution with AQS-based locking.',
      diagram: WorkerLifecycleDiagram,
      details: [
        {
          name: 'Worker Class Structure',
          diagram: WorkerLifecycleDiagram,
          explanation: `Each thread in the pool is wrapped in a Worker object. Worker extends AbstractQueuedSynchronizer (AQS) for simple non-reentrant locking.

Worker responsibilities:
• Holds the actual Thread object
• Tracks the initial task (firstTask)
• Counts completed tasks
• Provides non-reentrant lock for interruption control`,
          codeExample: `private final class Worker
    extends AbstractQueuedSynchronizer
    implements Runnable {

    final Thread thread;      // The actual thread
    Runnable firstTask;       // First task to run (may be null)
    volatile long completedTasks;  // Completed task count

    Worker(Runnable firstTask) {
        setState(-1);  // Inhibit interrupts until runWorker
        this.firstTask = firstTask;
        this.thread = getThreadFactory().newThread(this);
    }

    public void run() {
        runWorker(this);  // Delegate to outer class method
    }
}`
        },
        {
          name: 'Worker Locking',
          explanation: `Worker uses AQS for a simple non-reentrant lock. This controls when a worker can be interrupted.

Why non-reentrant?
• Prevents worker from acquiring its own lock
• Allows detecting if worker is actively running a task
• Used by interruptIdleWorkers() to avoid interrupting busy workers`,
          codeExample: `// Worker's AQS-based lock (non-reentrant)
protected boolean tryAcquire(int unused) {
    if (compareAndSetState(0, 1)) {
        setExclusiveOwnerThread(Thread.currentThread());
        return true;
    }
    return false;
}

protected boolean tryRelease(int unused) {
    setExclusiveOwnerThread(null);
    setState(0);
    return true;
}

public void lock()        { acquire(1); }
public boolean tryLock()  { return tryAcquire(1); }
public void unlock()      { release(1); }

// Initial state is -1 to prevent interruption during startup
// setState(0) when runWorker begins`
        },
        {
          name: 'Workers Collection',
          explanation: `Workers are stored in a HashSet protected by a ReentrantLock. This lock is used for all worker set modifications and some state updates.`,
          codeExample: `// Workers are stored in a HashSet
private final HashSet<Worker> workers = new HashSet<>();

// Main lock for workers set and other state
private final ReentrantLock mainLock = new ReentrantLock();

// Condition for awaitTermination
private final Condition termination = mainLock.newCondition();

// Track largest pool size for monitoring
private int largestPoolSize;

// Track completed task count
private long completedTaskCount;

// Adding a worker
mainLock.lock();
try {
    workers.add(worker);
    int s = workers.size();
    if (s > largestPoolSize)
        largestPoolSize = s;
} finally {
    mainLock.unlock();
}`
        }
      ]
    },
    {
      id: 'task-execution',
      name: 'Task Execution Flow',
      icon: '▶️',
      color: '#06b6d4',
      description: 'How execute() and runWorker() coordinate task submission and execution.',
      diagram: WorkerLifecycleDiagram,
      details: [
        {
          name: 'execute() Method',
          diagram: ThreadPoolArchitectureDiagram,
          explanation: `The execute() method is the entry point for task submission. It implements the task flow decision logic:

1. Try to add core worker if below corePoolSize
2. Try to queue the task if pool is running
3. Try to add non-core worker if queue is full
4. Reject if all else fails`,
          codeExample: `public void execute(Runnable command) {
    if (command == null) throw new NullPointerException();

    int c = ctl.get();

    // Step 1: Try to add core worker
    if (workerCountOf(c) < corePoolSize) {
        if (addWorker(command, true))  // true = core
            return;
        c = ctl.get();
    }

    // Step 2: Try to queue task
    if (isRunning(c) && workQueue.offer(command)) {
        int recheck = ctl.get();
        // Double-check: if not running, remove and reject
        if (!isRunning(recheck) && remove(command))
            reject(command);
        // If no workers, add one to process queue
        else if (workerCountOf(recheck) == 0)
            addWorker(null, false);
    }
    // Step 3: Try to add non-core worker
    else if (!addWorker(command, false))  // false = non-core
        reject(command);  // Rejection policy
}`
        },
        {
          name: 'runWorker() Loop',
          diagram: WorkerLifecycleDiagram,
          explanation: `runWorker() is the main execution loop for each worker thread. It:

1. Runs firstTask if present
2. Loops calling getTask() to get more work
3. For each task: acquires lock, runs hooks, executes task
4. Exits when getTask() returns null
5. Calls processWorkerExit() for cleanup`,
          codeExample: `final void runWorker(Worker w) {
    Thread wt = Thread.currentThread();
    Runnable task = w.firstTask;
    w.firstTask = null;
    w.unlock();  // Allow interrupts now
    boolean completedAbruptly = true;
    try {
        // Main loop: get tasks and execute
        while (task != null || (task = getTask()) != null) {
            w.lock();
            // Check for pool stop
            if ((runStateAtLeast(ctl.get(), STOP) ||
                 (Thread.interrupted() &&
                  runStateAtLeast(ctl.get(), STOP)))
                && !wt.isInterrupted())
                wt.interrupt();
            try {
                beforeExecute(wt, task);  // Hook
                try {
                    task.run();  // EXECUTE THE TASK
                } finally {
                    afterExecute(task, null);  // Hook
                }
            } finally {
                task = null;
                w.completedTasks++;
                w.unlock();
            }
        }
        completedAbruptly = false;
    } finally {
        processWorkerExit(w, completedAbruptly);
    }
}`
        },
        {
          name: 'Exception Handling',
          explanation: `When a task throws an exception, runWorker() handles it carefully:

• Exception is caught and passed to afterExecute()
• Worker is flagged as completedAbruptly = true
• processWorkerExit() will create a replacement worker
• The exception propagates (visible via UncaughtExceptionHandler)`,
          codeExample: `// Exception handling in runWorker
try {
    beforeExecute(wt, task);
    Throwable thrown = null;
    try {
        task.run();  // Task execution
    } catch (RuntimeException | Error x) {
        thrown = x;
        throw x;  // Re-throw after recording
    } finally {
        afterExecute(task, thrown);  // Hook receives exception
    }
} finally {
    w.unlock();
}

// If task throws, completedAbruptly = true
// processWorkerExit will replace the dead worker

// To handle exceptions, either:
// 1. Wrap tasks in try-catch
// 2. Override afterExecute()
// 3. Set Thread.setUncaughtExceptionHandler()
// 4. Use submit() and check Future.get()`
        }
      ]
    },
    {
      id: 'get-task',
      name: 'getTask() - Worker Blocking',
      icon: '⏳',
      color: '#a855f7',
      description: 'How workers block waiting for tasks and when they decide to terminate.',
      details: [
        {
          name: 'getTask() Overview',
          explanation: `getTask() is where workers block waiting for tasks. This method controls thread lifecycle.

getTask() returns null when worker should die:
• Pool is SHUTDOWN and queue is empty
• Pool is STOP (or greater)
• Worker timed out AND (allowCoreThreadTimeOut OR workerCount > corePoolSize)

Otherwise, it blocks until a task is available.`,
          codeExample: `private Runnable getTask() {
    boolean timedOut = false;

    for (;;) {
        int c = ctl.get();
        int rs = runStateOf(c);

        // Check if pool is shutting down
        if (rs >= SHUTDOWN && (rs >= STOP || workQueue.isEmpty())) {
            decrementWorkerCount();
            return null;  // Worker will exit
        }

        int wc = workerCountOf(c);

        // Should this worker use timed poll?
        boolean timed = allowCoreThreadTimeOut || wc > corePoolSize;

        // Check if worker should die
        if ((wc > maximumPoolSize || (timed && timedOut))
            && (wc > 1 || workQueue.isEmpty())) {
            if (compareAndDecrementWorkerCount(c))
                return null;  // Worker will exit
            continue;
        }

        // ... blocking logic follows
    }
}`
        },
        {
          name: 'Blocking Behavior',
          explanation: `How workers block depends on whether they should timeout:

• Core threads (unless allowCoreThreadTimeOut): block indefinitely with queue.take()
• Non-core threads: block with timeout using queue.poll(keepAliveTime)
• If poll() returns null (timeout), worker will exit on next iteration

This is how the pool shrinks back to corePoolSize during idle periods.`,
          codeExample: `// Blocking for task in getTask()
try {
    // Choose blocking strategy
    Runnable r = timed ?
        // Non-core: wait with timeout
        workQueue.poll(keepAliveTime, TimeUnit.NANOSECONDS) :
        // Core: wait forever
        workQueue.take();

    if (r != null)
        return r;  // Got a task!
    timedOut = true;  // poll() returned null = timed out
} catch (InterruptedException retry) {
    timedOut = false;  // Interrupted, try again
}`
        },
        {
          name: 'Worker Lifecycle Summary',
          diagram: WorkerLifecycleDiagram,
          explanation: `Complete worker thread lifecycle:

1. Created → runs runWorker()
2. runWorker() calls getTask() in loop
3. getTask() blocks on queue
4. When task available → getTask() returns it
5. runWorker() executes task with hooks
6. Repeat from step 2
7. getTask() returns null → runWorker() exits
8. processWorkerExit() cleans up`,
          codeExample: `// Worker thread lifecycle visualization
//
// addWorker()
//     |
//     v
// new Worker(task)
//     |
//     v
// worker.thread.start()
//     |
//     v
// runWorker(worker)
//     |
//     v
// +---> getTask() -----> task.run() ----+
// |                                      |
// +--------------------------------------+
//     |
//     | (getTask returns null)
//     v
// processWorkerExit()
//     |
//     v
// Thread terminates`
        }
      ]
    },
    {
      id: 'shutdown',
      name: 'Shutdown Mechanisms',
      icon: '🛑',
      color: '#f97316',
      description: 'Graceful shutdown() vs immediate shutdownNow() and best practices.',
      diagram: ShutdownDiagram,
      details: [
        {
          name: 'shutdown()',
          diagram: ShutdownDiagram,
          explanation: `shutdown() initiates orderly shutdown:

• No new tasks accepted (RejectedExecutionException)
• Previously submitted tasks are executed
• Idle workers are interrupted
• Threads terminate after queue is empty`,
          codeExample: `public void shutdown() {
    final ReentrantLock mainLock = this.mainLock;
    mainLock.lock();
    try {
        checkShutdownAccess();
        advanceRunState(SHUTDOWN);  // Set state to SHUTDOWN
        interruptIdleWorkers();     // Interrupt idle workers
        onShutdown();               // Hook for subclasses
    } finally {
        mainLock.unlock();
    }
    tryTerminate();
}

// After shutdown():
// - isShutdown() returns true
// - isTerminated() returns false (until all tasks complete)
// - new tasks are rejected
// - queued tasks still execute`
        },
        {
          name: 'shutdownNow()',
          diagram: ShutdownDiagram,
          explanation: `shutdownNow() attempts immediate termination:

• State changes to STOP
• No new tasks accepted
• Halts processing of waiting tasks
• Interrupts ALL worker threads (even busy ones)
• Returns list of tasks that never started`,
          codeExample: `public List<Runnable> shutdownNow() {
    List<Runnable> tasks;
    final ReentrantLock mainLock = this.mainLock;
    mainLock.lock();
    try {
        checkShutdownAccess();
        advanceRunState(STOP);      // Set state to STOP
        interruptWorkers();         // Interrupt ALL workers
        tasks = drainQueue();       // Remove all queued tasks
    } finally {
        mainLock.unlock();
    }
    tryTerminate();
    return tasks;  // Return tasks that never started
}

// Returns list of tasks that were waiting in queue
List<Runnable> pending = executor.shutdownNow();
for (Runnable task : pending) {
    saveForLater(task);  // Handle unexecuted tasks
}`
        },
        {
          name: 'Best Practice Pattern',
          explanation: `Recommended shutdown pattern for production:

1. Call shutdown() to stop accepting new tasks
2. Call awaitTermination() with reasonable timeout
3. If timeout, call shutdownNow() for force
4. Handle InterruptedException properly`,
          codeExample: `// Recommended shutdown pattern
ExecutorService executor = Executors.newFixedThreadPool(10);
// ... submit tasks ...

executor.shutdown();  // Stop accepting new tasks
try {
    // Wait for existing tasks to complete
    if (!executor.awaitTermination(60, TimeUnit.SECONDS)) {
        // Timeout - force shutdown
        List<Runnable> pending = executor.shutdownNow();
        log.warn("Forcing shutdown, {} tasks pending", pending.size());

        // Wait again for tasks to respond to cancellation
        if (!executor.awaitTermination(60, TimeUnit.SECONDS))
            log.error("Pool did not terminate");
    }
} catch (InterruptedException ie) {
    // Current thread was interrupted
    executor.shutdownNow();
    Thread.currentThread().interrupt();  // Preserve status
}`
        }
      ]
    },
    {
      id: 'hooks-monitoring',
      name: 'Hooks and Monitoring',
      icon: '📊',
      color: '#14b8a6',
      description: 'Extension points and monitoring methods for production observability.',
      details: [
        {
          name: 'Extension Hooks',
          explanation: `ThreadPoolExecutor provides three hooks (override in subclass):

• beforeExecute(Thread t, Runnable r) - Called before each task
• afterExecute(Runnable r, Throwable t) - Called after each task
• terminated() - Called when pool terminates

These are useful for monitoring, logging, timing, and cleanup.`,
          codeExample: `// Custom ThreadPoolExecutor with hooks
public class MonitoredThreadPool extends ThreadPoolExecutor {

    private final ThreadLocal<Long> startTime = new ThreadLocal<>();
    private final AtomicLong totalTime = new AtomicLong();
    private final AtomicInteger taskCount = new AtomicInteger();

    public MonitoredThreadPool(int coreSize, int maxSize,
                               BlockingQueue<Runnable> queue) {
        super(coreSize, maxSize, 60L, TimeUnit.SECONDS, queue);
    }

    @Override
    protected void beforeExecute(Thread t, Runnable r) {
        super.beforeExecute(t, r);
        startTime.set(System.nanoTime());
        log.debug("Starting: {} on {}", r, t.getName());
    }

    @Override
    protected void afterExecute(Runnable r, Throwable t) {
        try {
            long elapsed = System.nanoTime() - startTime.get();
            totalTime.addAndGet(elapsed);
            taskCount.incrementAndGet();
            if (t != null) {
                log.error("Task {} failed", r, t);
            }
        } finally {
            super.afterExecute(r, t);
        }
    }

    @Override
    protected void terminated() {
        log.info("Pool terminated. Tasks: {}", taskCount.get());
        super.terminated();
    }
}`
        },
        {
          name: 'Monitoring Methods',
          explanation: `ThreadPoolExecutor provides methods for runtime monitoring:

• getPoolSize() - Current number of threads
• getActiveCount() - Threads actively executing (approximate)
• getCompletedTaskCount() - Total completed tasks
• getTaskCount() - Total scheduled tasks (completed + active + queued)
• getQueue() - Access to the work queue
• getLargestPoolSize() - Peak thread count ever`,
          codeExample: `ThreadPoolExecutor pool = (ThreadPoolExecutor)
    Executors.newFixedThreadPool(10);

// Schedule periodic monitoring
ScheduledExecutorService monitor =
    Executors.newScheduledThreadPool(1);

monitor.scheduleAtFixedRate(() -> {
    System.out.println("Pool Size: " + pool.getPoolSize());
    System.out.println("Active: " + pool.getActiveCount());
    System.out.println("Queued: " + pool.getQueue().size());
    System.out.println("Completed: " + pool.getCompletedTaskCount());
    System.out.println("Largest: " + pool.getLargestPoolSize());
    System.out.println("Task Count: " + pool.getTaskCount());
}, 0, 1, TimeUnit.SECONDS);

// Check pool health
boolean isHealthy = pool.getQueue().size() < 1000
    && pool.getActiveCount() < pool.getMaximumPoolSize();`
        },
        {
          name: 'Metrics Integration',
          explanation: `Example of integrating with metrics libraries like Micrometer for production monitoring.`,
          codeExample: `// Micrometer metrics integration
public class MetricsThreadPool extends ThreadPoolExecutor {
    private final MeterRegistry registry;
    private final Timer taskTimer;
    private final Counter rejectedCounter;

    public MetricsThreadPool(int core, int max,
                             MeterRegistry registry) {
        super(core, max, 60L, TimeUnit.SECONDS,
              new ArrayBlockingQueue<>(1000),
              (r, executor) -> {
                  // Custom rejection with metrics
              });
        this.registry = registry;
        this.taskTimer = registry.timer("executor.task.duration");
        this.rejectedCounter = registry.counter("executor.rejected");

        // Gauge for pool size
        Gauge.builder("executor.pool.size", this,
            ThreadPoolExecutor::getPoolSize)
            .register(registry);

        // Gauge for queue size
        Gauge.builder("executor.queue.size", this,
            e -> e.getQueue().size())
            .register(registry);
    }

    @Override
    protected void beforeExecute(Thread t, Runnable r) {
        // Store start time in task wrapper
    }

    @Override
    protected void afterExecute(Runnable r, Throwable t) {
        // Record duration to timer
        taskTimer.record(duration, TimeUnit.NANOSECONDS);
    }
}`
        }
      ]
    },
    {
      id: 'interview-questions',
      name: 'Interview Questions',
      icon: '💡',
      color: '#eab308',
      description: 'Common ThreadPoolExecutor interview questions and answers.',
      details: [
        {
          name: 'Core Concepts',
          explanation: `Q1: What happens when you submit a task?
A: Check corePoolSize → try queue → check maxPoolSize → reject

Q2: Why prefer ThreadPoolExecutor over Executors factory methods?
A: Factory methods hide dangerous defaults (unbounded queues, unlimited threads)

Q3: What's the difference between execute() and submit()?
A: execute() takes Runnable, no return. submit() returns Future, handles exceptions.

Q4: How to handle exceptions in thread pool?
A: Use submit() + Future.get(), or override afterExecute(), or set UncaughtExceptionHandler

Q5: What is CallerRunsPolicy good for?
A: Provides backpressure - slows down task submission when pool is saturated`,
          codeExample: `// Q: Fixed pool vs Cached pool?
// Fixed: bounded threads, unbounded queue - for consistent load
// Cached: unbounded threads, no queue - for burst of short tasks

// Q: Why is this dangerous?
ExecutorService pool = Executors.newFixedThreadPool(10);
// Uses LinkedBlockingQueue (unbounded) - can OOM!

// Better:
ExecutorService pool = new ThreadPoolExecutor(
    10, 10, 0L, TimeUnit.MILLISECONDS,
    new ArrayBlockingQueue<>(1000),  // Bounded!
    new ThreadPoolExecutor.CallerRunsPolicy()
);`
        },
        {
          name: 'Advanced Questions',
          explanation: `Q6: How does the pool know when a worker should die?
A: getTask() returns null when pool is shutting down, or worker timed out and count > corePoolSize

Q7: What is the ctl field?
A: AtomicInteger packing runState (3 bits) and workerCount (29 bits) for atomic updates

Q8: How does shutdown() differ from shutdownNow()?
A: shutdown() finishes queue, shutdownNow() interrupts all and returns pending tasks

Q9: Why does Worker extend AQS?
A: For non-reentrant lock to control interruption of running tasks

Q10: What is allowCoreThreadTimeOut?
A: Allows core threads to die after keepAliveTime, making pool fully elastic`,
          codeExample: `// Q: How to get result from execute()?
// execute() doesn't return result. Use submit() instead:
Future<String> future = executor.submit(() -> {
    return "result";
});
String result = future.get();  // Blocks until complete

// Q: How does the pool know when a worker should die?
// getTask() returns null when:
// - Pool is SHUTDOWN and queue is empty
// - Pool is STOP
// - Worker timed out and count > corePoolSize`
        },
        {
          name: 'Sizing Questions',
          explanation: `Q: How to size a thread pool?

CPU-bound tasks (computation heavy):
• cores + 1 (or just cores)
• More threads = more context switching overhead

IO-bound tasks (waiting on network, disk):
• cores * (1 + waitTime/computeTime)
• More waiting = more threads useful

Mixed workloads:
• cores * targetUtilization * (1 + W/C)
• Consider separate pools for CPU and IO work`,
          codeExample: `// CPU-bound tasks: cores + 1
int cpuPool = Runtime.getRuntime().availableProcessors() + 1;

// IO-bound tasks: cores * (1 + waitTime/computeTime)
// Example: 50ms wait, 5ms compute on 8 cores
int waitTime = 50;
int computeTime = 5;
int cores = 8;
int ioPool = cores * (1 + waitTime/computeTime);  // = 88 threads

// Or use: cores * targetUtilization * (1 + W/C)
// For 80% utilization: 8 * 0.8 * 11 = 70 threads

// Best practice: measure and tune!
// Start conservative, monitor queue size and latency`
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
      { name: 'ThreadPoolExecutor', icon: '⚙️', page: 'ThreadPoolExecutorInternals' }
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
    background: 'linear-gradient(135deg, #4ade80, #22c55e)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(34, 197, 94, 0.2)',
    border: '1px solid rgba(34, 197, 94, 0.3)',
    borderRadius: '0.5rem',
    color: '#4ade80',
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
        <h1 style={titleStyle}>ThreadPoolExecutor Internals</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(34, 197, 94, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(34, 197, 94, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          ← Back to Projects
        </button>
      </div>

      {/* Breadcrumb */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          colors={THREADPOOL_COLORS}
        />
      </div>

      {/* Subtitle */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem', color: '#94a3b8' }}>
        <p style={{ fontSize: '1.1rem', margin: 0 }}>
          Deep dive into Java's thread pool implementation - essential for concurrency interviews
        </p>
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
          { label: 'Core Parameters', value: '7' },
          { label: 'Pool States', value: '5' },
          { label: 'Rejection Policies', value: '4' },
          { label: 'Package', value: 'j.u.concurrent' }
        ].map((fact, i) => (
          <div
            key={i}
            style={{
              background: 'rgba(15, 23, 42, 0.8)',
              borderRadius: '0.75rem',
              padding: '1rem',
              textAlign: 'center',
              border: '1px solid rgba(34, 197, 94, 0.3)'
            }}
          >
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#22c55e' }}>
              {fact.value}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
              {fact.label}
            </div>
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
              colors={THREADPOOL_COLORS}
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

            {/* Detail Tabs */}
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

            {/* Selected Detail Content */}
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
                  <div style={{
                    color: '#e2e8f0',
                    lineHeight: '1.8',
                    marginBottom: '1rem',
                    background: colorScheme.bg,
                    border: `1px solid ${colorScheme.border}`,
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    whiteSpace: 'pre-line'
                  }}>
                    {detail.explanation}
                  </div>

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

export default ThreadPoolExecutorInternals
