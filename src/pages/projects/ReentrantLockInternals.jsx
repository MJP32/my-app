/**
 * ReentrantLock Internals - Tab Template Format
 *
 * Deep dive into ReentrantLock: AQS framework, fairness, conditions, and lock acquisition internals.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

/**
 * ReentrantLock colors - emerald theme (#10b981)
 */
const REENTRANTLOCK_COLORS = {
  primary: '#10b981',           // Emerald accent
  primaryHover: '#34d399',      // Lighter emerald
  bg: 'rgba(16, 185, 129, 0.1)', // Background with transparency
  border: 'rgba(16, 185, 129, 0.3)', // Border color
  arrow: '#10b981',             // Arrow/indicator color
  hoverBg: 'rgba(16, 185, 129, 0.2)', // Hover background
  topicBg: 'rgba(16, 185, 129, 0.2)'  // Topic card background
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
 * Architecture Overview Diagram - Shows ReentrantLock internal structure
 */
const ArchitectureDiagram = () => (
  <svg viewBox="0 0 800 320" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
      </marker>
    </defs>

    {/* Title */}
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      ReentrantLock Architecture
    </text>

    {/* ReentrantLock */}
    <rect x="280" y="50" width="240" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">ReentrantLock</text>
    <text x="400" y="95" textAnchor="middle" fill="#e0e7ff" fontSize="10">implements Lock</text>

    {/* Sync */}
    <rect x="280" y="140" width="240" height="60" rx="8" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="400" y="165" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Sync</text>
    <text x="400" y="185" textAnchor="middle" fill="#d1fae5" fontSize="10">extends AQS</text>

    {/* Arrow from Lock to Sync */}
    <line x1="400" y1="110" x2="400" y2="135" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowhead)"/>

    {/* NonfairSync and FairSync */}
    <rect x="100" y="230" width="180" height="60" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="190" y="255" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">NonfairSync</text>
    <text x="190" y="275" textAnchor="middle" fill="#fef3c7" fontSize="9">(default - barging)</text>

    <rect x="520" y="230" width="180" height="60" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="610" y="255" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">FairSync</text>
    <text x="610" y="275" textAnchor="middle" fill="#ede9fe" fontSize="9">(FIFO ordering)</text>

    {/* Arrows from Sync to implementations */}
    <line x1="340" y1="200" x2="190" y2="225" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    <line x1="460" y1="200" x2="610" y2="225" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowhead)"/>

    {/* Labels */}
    <text x="250" y="215" textAnchor="middle" fill="#94a3b8" fontSize="9">extends</text>
    <text x="550" y="215" textAnchor="middle" fill="#94a3b8" fontSize="9">extends</text>
  </svg>
)

/**
 * AQS State Diagram - Shows state transitions
 */
const AQSStateDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-state" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      AQS State Management
    </text>

    {/* Unlocked state */}
    <rect x="100" y="70" width="140" height="100" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="170" y="95" textAnchor="middle" fill="#22c55e" fontSize="13" fontWeight="bold">UNLOCKED</text>
    <text x="170" y="115" textAnchor="middle" fill="#94a3b8" fontSize="11">state = 0</text>
    <text x="170" y="135" textAnchor="middle" fill="#94a3b8" fontSize="10">owner = null</text>
    <text x="170" y="155" textAnchor="middle" fill="#64748b" fontSize="9">Lock available</text>

    {/* Locked state */}
    <rect x="330" y="70" width="140" height="100" rx="8" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="400" y="95" textAnchor="middle" fill="#ef4444" fontSize="13" fontWeight="bold">LOCKED</text>
    <text x="400" y="115" textAnchor="middle" fill="#94a3b8" fontSize="11">state = 1</text>
    <text x="400" y="135" textAnchor="middle" fill="#94a3b8" fontSize="10">owner = Thread</text>
    <text x="400" y="155" textAnchor="middle" fill="#64748b" fontSize="9">First acquire</text>

    {/* Reentrant state */}
    <rect x="560" y="70" width="140" height="100" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="630" y="95" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="bold">REENTRANT</text>
    <text x="630" y="115" textAnchor="middle" fill="#94a3b8" fontSize="11">state = 2+</text>
    <text x="630" y="135" textAnchor="middle" fill="#94a3b8" fontSize="10">owner = Thread</text>
    <text x="630" y="155" textAnchor="middle" fill="#64748b" fontSize="9">Same thread</text>

    {/* Arrows */}
    <line x1="240" y1="110" x2="325" y2="110" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-state)"/>
    <text x="282" y="100" textAnchor="middle" fill="#94a3b8" fontSize="9">lock()</text>

    <line x1="470" y1="110" x2="555" y2="110" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-state)"/>
    <text x="512" y="100" textAnchor="middle" fill="#94a3b8" fontSize="9">lock()</text>

    <line x1="555" y1="140" x2="470" y2="140" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-state)"/>
    <text x="512" y="158" textAnchor="middle" fill="#94a3b8" fontSize="9">unlock()</text>

    <line x1="325" y1="140" x2="240" y2="140" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-state)"/>
    <text x="282" y="158" textAnchor="middle" fill="#94a3b8" fontSize="9">unlock()</text>

    {/* Loop arrow for reentrant */}
    <path d="M 630 70 Q 680 50 680 120 Q 680 170 640 170"
          stroke="#f59e0b" strokeWidth="2" fill="none" markerEnd="url(#arrow-state)"/>
    <text x="705" y="120" textAnchor="start" fill="#94a3b8" fontSize="9">lock()/unlock()</text>
  </svg>
)

/**
 * CLH Queue Diagram - Shows waiting threads
 */
const CLHQueueDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-queue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      CLH Wait Queue Structure
    </text>

    {/* Head pointer */}
    <text x="80" y="90" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="bold">head</text>
    <line x1="80" y1="95" x2="120" y2="120" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-queue)"/>

    {/* Dummy node */}
    <rect x="120" y="120" width="100" height="60" rx="6" fill="rgba(100, 116, 139, 0.2)" stroke="#64748b" strokeWidth="2"/>
    <text x="170" y="145" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">Dummy</text>
    <text x="170" y="165" textAnchor="middle" fill="#64748b" fontSize="9">head node</text>

    {/* Node 1 */}
    <rect x="250" y="120" width="100" height="60" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="300" y="140" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">Node 1</text>
    <text x="300" y="155" textAnchor="middle" fill="#94a3b8" fontSize="9">Thread A</text>
    <text x="300" y="170" textAnchor="middle" fill="#64748b" fontSize="9">SIGNAL</text>

    {/* Node 2 */}
    <rect x="380" y="120" width="100" height="60" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="430" y="140" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">Node 2</text>
    <text x="430" y="155" textAnchor="middle" fill="#94a3b8" fontSize="9">Thread B</text>
    <text x="430" y="170" textAnchor="middle" fill="#64748b" fontSize="9">SIGNAL</text>

    {/* Node 3 */}
    <rect x="510" y="120" width="100" height="60" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="560" y="140" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">Node 3</text>
    <text x="560" y="155" textAnchor="middle" fill="#94a3b8" fontSize="9">Thread C</text>
    <text x="560" y="170" textAnchor="middle" fill="#64748b" fontSize="9">SIGNAL</text>

    {/* Tail pointer */}
    <text x="670" y="90" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="bold">tail</text>
    <line x1="670" y1="95" x2="610" y2="120" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-queue)"/>

    {/* Forward arrows */}
    <line x1="220" y1="150" x2="245" y2="150" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-queue)"/>
    <line x1="350" y1="150" x2="375" y2="150" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-queue)"/>
    <line x1="480" y1="150" x2="505" y2="150" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-queue)"/>

    {/* Backward arrows */}
    <line x1="245" y1="160" x2="220" y2="160" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow-queue)"/>
    <line x1="375" y1="160" x2="350" y2="160" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow-queue)"/>
    <line x1="505" y1="160" x2="480" y2="160" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow-queue)"/>

    {/* Labels */}
    <text x="232" y="145" textAnchor="middle" fill="#10b981" fontSize="7">next</text>
    <text x="362" y="145" textAnchor="middle" fill="#10b981" fontSize="7">next</text>
    <text x="492" y="145" textAnchor="middle" fill="#10b981" fontSize="7">next</text>
    <text x="232" y="172" textAnchor="middle" fill="#8b5cf6" fontSize="7">prev</text>
    <text x="362" y="172" textAnchor="middle" fill="#8b5cf6" fontSize="7">prev</text>
    <text x="492" y="172" textAnchor="middle" fill="#8b5cf6" fontSize="7">prev</text>
  </svg>
)

/**
 * Lock Acquisition Flow Diagram
 */
const LockAcquisitionDiagram = () => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-acq" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Lock Acquisition Flow
    </text>

    {/* lock() called */}
    <rect x="320" y="50" width="160" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="400" y="80" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">lock() called</text>

    {/* tryAcquire */}
    <rect x="320" y="130" width="160" height="50" rx="8" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="400" y="160" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">tryAcquire()</text>

    {/* Success branch */}
    <rect x="120" y="210" width="160" height="60" rx="8" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="200" y="235" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">SUCCESS</text>
    <text x="200" y="252" textAnchor="middle" fill="#94a3b8" fontSize="10">Set owner thread</text>

    {/* Fail branch */}
    <rect x="520" y="210" width="160" height="60" rx="8" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <text x="600" y="230" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">FAIL</text>
    <text x="600" y="247" textAnchor="middle" fill="#94a3b8" fontSize="10">Enqueue thread</text>
    <text x="600" y="262" textAnchor="middle" fill="#64748b" fontSize="9">Park and wait</text>

    {/* Arrows */}
    <line x1="400" y1="100" x2="400" y2="125" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-acq)"/>

    <line x1="320" y1="155" x2="240" y2="205" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-acq)"/>
    <text x="260" y="175" textAnchor="middle" fill="#22c55e" fontSize="9">state=0 or</text>
    <text x="260" y="188" textAnchor="middle" fill="#22c55e" fontSize="9">reentrant</text>

    <line x1="480" y1="155" x2="560" y2="205" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-acq)"/>
    <text x="540" y="175" textAnchor="middle" fill="#ef4444" fontSize="9">locked by</text>
    <text x="540" y="188" textAnchor="middle" fill="#ef4444" fontSize="9">other thread</text>
  </svg>
)

/**
 * Condition Variables Diagram
 */
const ConditionDiagram = () => (
  <svg viewBox="0 0 800 250" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-cond" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Multiple Condition Queues
    </text>

    {/* Lock */}
    <rect x="320" y="60" width="160" height="60" rx="8" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="400" y="85" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">ReentrantLock</text>
    <text x="400" y="105" textAnchor="middle" fill="#d1fae5" fontSize="10">One lock, multiple conditions</text>

    {/* Condition 1 - notFull */}
    <rect x="80" y="170" width="180" height="60" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="170" y="195" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">notFull Condition</text>
    <text x="170" y="215" textAnchor="middle" fill="#94a3b8" fontSize="9">Producers wait here</text>

    {/* Condition 2 - notEmpty */}
    <rect x="540" y="170" width="180" height="60" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="630" y="195" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">notEmpty Condition</text>
    <text x="630" y="215" textAnchor="middle" fill="#94a3b8" fontSize="9">Consumers wait here</text>

    {/* Arrows */}
    <line x1="350" y1="120" x2="200" y2="165" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-cond)"/>
    <text x="250" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9">await() on notFull</text>

    <line x1="450" y1="120" x2="600" y2="165" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-cond)"/>
    <text x="550" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9">await() on notEmpty</text>
  </svg>
)

/**
 * Fair vs Non-Fair Diagram
 */
const FairVsNonFairDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-fair" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
      </marker>
      <marker id="arrow-barge" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Fair vs Non-Fair Lock Acquisition
    </text>

    {/* Non-Fair */}
    <text x="200" y="60" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Non-Fair (Default)</text>

    <rect x="120" y="80" width="80" height="50" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="160" y="105" textAnchor="middle" fill="#22c55e" fontSize="10">Lock</text>
    <text x="160" y="120" textAnchor="middle" fill="#64748b" fontSize="8">available</text>

    <rect x="230" y="80" width="70" height="50" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="265" y="110" textAnchor="middle" fill="#3b82f6" fontSize="9">Thread A</text>
    <text x="265" y="122" textAnchor="middle" fill="#64748b" fontSize="7">waiting</text>

    <rect x="120" y="160" width="80" height="50" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="160" y="185" textAnchor="middle" fill="#ef4444" fontSize="10">Thread B</text>
    <text x="160" y="200" textAnchor="middle" fill="#64748b" fontSize="8">just arrived</text>

    {/* B barges ahead */}
    <line x1="160" y1="160" x2="160" y2="135" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow-barge)"/>
    <text x="180" y="150" textAnchor="start" fill="#ef4444" fontSize="8" fontWeight="bold">BARGE!</text>

    {/* Fair */}
    <text x="600" y="60" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontWeight="bold">Fair</text>

    <rect x="520" y="80" width="80" height="50" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="560" y="105" textAnchor="middle" fill="#22c55e" fontSize="10">Lock</text>
    <text x="560" y="120" textAnchor="middle" fill="#64748b" fontSize="8">available</text>

    <rect x="630" y="80" width="70" height="50" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="665" y="110" textAnchor="middle" fill="#3b82f6" fontSize="9">Thread A</text>
    <text x="665" y="122" textAnchor="middle" fill="#64748b" fontSize="7">waiting</text>

    <rect x="520" y="160" width="80" height="50" rx="6" fill="rgba(100, 116, 139, 0.2)" stroke="#64748b" strokeWidth="2"/>
    <text x="560" y="185" textAnchor="middle" fill="#94a3b8" fontSize="10">Thread B</text>
    <text x="560" y="200" textAnchor="middle" fill="#64748b" fontSize="8">must wait</text>

    {/* A gets lock (fair) */}
    <line x1="630" y1="105" x2="605" y2="105" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-fair)"/>
    <text x="617" y="98" textAnchor="middle" fill="#10b981" fontSize="8">FIFO</text>

    {/* Bottom comparison */}
    <text x="200" y="250" textAnchor="middle" fill="#94a3b8" fontSize="10">Higher throughput, possible starvation</text>
    <text x="600" y="250" textAnchor="middle" fill="#94a3b8" fontSize="10">Lower throughput, no starvation</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

/**
 * ReentrantLockInternals Component
 */
function ReentrantLockInternals({ onBack, breadcrumb }) {
  // State for modal navigation
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'why-reentrantlock',
      name: 'Why ReentrantLock?',
      icon: '⚡',
      color: '#3b82f6',
      description: 'Understand when and why to use ReentrantLock over synchronized keyword.',
      diagram: ArchitectureDiagram,
      details: [
        {
          name: 'Advantages',
          explanation: 'ReentrantLock provides more flexibility than the synchronized keyword. Key advantages include: interruptible lock acquisition (lockInterruptibly), timed lock attempts (tryLock with timeout), non-blocking try (tryLock), fairness option (FIFO ordering), multiple Conditions per lock, and the ability to check if a lock is held.',
          codeExample: `// synchronized - simple but limited
synchronized (object) {
    // critical section
}

// ReentrantLock - more control
ReentrantLock lock = new ReentrantLock();

// Basic usage - always use try-finally!
lock.lock();
try {
    // critical section
} finally {
    lock.unlock();  // MUST unlock in finally
}`
        },
        {
          name: 'Non-Blocking Try',
          explanation: 'The tryLock() method attempts to acquire the lock without blocking. If the lock is available, it acquires it and returns true. If not, it immediately returns false, allowing your code to do something else instead of waiting.',
          codeExample: `// Non-blocking try
if (lock.tryLock()) {
    try {
        // Got the lock
        performCriticalOperation();
    } finally {
        lock.unlock();
    }
} else {
    // Couldn't get lock, do something else
    performAlternativeOperation();
}`
        },
        {
          name: 'Timed Lock',
          explanation: 'ReentrantLock supports timed lock acquisition with tryLock(timeout, unit). This allows your thread to wait for the lock for a specified duration and then give up if it cannot acquire it, preventing indefinite blocking.',
          codeExample: `// With timeout
if (lock.tryLock(1, TimeUnit.SECONDS)) {
    try {
        // Got the lock within 1 second
        processData();
    } finally {
        lock.unlock();
    }
} else {
    // Timeout - couldn't get lock in 1 second
    handleTimeout();
}`
        },
        {
          name: 'Interruptible Lock',
          explanation: 'The lockInterruptibly() method allows a thread waiting for a lock to be interrupted. This is crucial for responsive applications where you need to be able to cancel waiting threads. Unlike lock(), which ignores interrupts until it acquires the lock, lockInterruptibly() throws InterruptedException when interrupted.',
          codeExample: `// Interruptible - can be interrupted while waiting
try {
    lock.lockInterruptibly();
    try {
        // Got the lock
        performLongOperation();
    } finally {
        lock.unlock();
    }
} catch (InterruptedException e) {
    // Thread was interrupted while waiting
    Thread.currentThread().interrupt();
    handleInterruption();
}`
        },
        {
          name: 'When to Use',
          explanation: 'Use ReentrantLock when you need tryLock, lockInterruptibly, fairness guarantees, multiple wait/notify conditions, or to check lock status. Use synchronized for simple critical sections where you do not need advanced features—it is simpler and less error-prone.',
          codeExample: `// Use ReentrantLock when:
// - Need tryLock or lockInterruptibly
// - Need fairness guarantee
// - Need multiple wait/notify conditions
// - Need to check lock status

// Use synchronized when:
// - Simple critical sections
// - No need for advanced features
// - Simpler code, less error-prone

synchronized (object) {
    // Simple, automatic release
}`
        }
      ]
    },
    {
      id: 'internal-structure',
      name: 'Internal Structure (AQS)',
      icon: '🏗️',
      color: '#10b981',
      description: 'Deep dive into AbstractQueuedSynchronizer (AQS) and how ReentrantLock uses it.',
      diagram: AQSStateDiagram,
      details: [
        {
          name: 'AQS Overview',
          diagram: ArchitectureDiagram,
          explanation: 'ReentrantLock is built on AbstractQueuedSynchronizer (AQS), which provides state management (volatile int state), a wait queue for blocked threads, CAS-based operations, and template methods for lock implementations. AQS is the foundation for most concurrent utilities in java.util.concurrent.',
          codeExample: `// Simplified ReentrantLock structure
public class ReentrantLock implements Lock {
    private final Sync sync;

    abstract static class Sync extends AbstractQueuedSynchronizer {
        // Try to acquire lock
        abstract boolean tryLock();

        // Check if current thread holds lock
        final boolean isHeldExclusively() {
            return getExclusiveOwnerThread() == Thread.currentThread();
        }

        // Acquire (called by lock())
        final void lock() {
            if (!tryAcquire(1))
                acquire(1);  // AQS method - enqueue and block
        }
    }
}`
        },
        {
          name: 'State Management',
          diagram: AQSStateDiagram,
          explanation: 'ReentrantLock uses the AQS state field to track lock status. State = 0 means unlocked. State > 0 means locked, with the value representing the hold count for reentrancy. Each lock() call by the same thread increments state, and each unlock() decrements it. The lock is only released when state reaches 0.',
          codeExample: `// AQS state field
private volatile int state;

// Lock states:
// state = 0: unlocked
// state = 1: locked once
// state = 2: locked twice (reentrant)
// state = n: locked n times

// Reentrancy example:
lock.lock();     // state: 0 -> 1
lock.lock();     // state: 1 -> 2 (same thread OK)
lock.unlock();   // state: 2 -> 1
lock.unlock();   // state: 1 -> 0 (released)`
        },
        {
          name: 'Sync Implementations',
          explanation: 'ReentrantLock has two inner classes that extend Sync: NonfairSync (default) and FairSync. NonfairSync allows threads to "barge" and acquire the lock immediately if available, even if other threads are waiting. FairSync enforces strict FIFO ordering by checking the queue before attempting acquisition.',
          codeExample: `// Non-fair sync (default)
static final class NonfairSync extends Sync {
    final boolean tryAcquire(int acquires) {
        return nonfairTryAcquire(acquires);
    }
}

// Fair sync
static final class FairSync extends Sync {
    final boolean tryAcquire(int acquires) {
        // Check queue first - FIFO
        if (hasQueuedPredecessors())
            return false;
        return nonfairTryAcquire(acquires);
    }
}

public ReentrantLock() {
    sync = new NonfairSync();  // Default
}

public ReentrantLock(boolean fair) {
    sync = fair ? new FairSync() : new NonfairSync();
}`
        },
        {
          name: 'Reentrancy',
          explanation: 'Reentrancy means the same thread can acquire the lock multiple times without deadlocking itself. Each successful lock() call increments the hold count, and each unlock() decrements it. The lock is only fully released when the count reaches zero. This is essential for recursive methods and nested synchronized regions.',
          codeExample: `// Reentrancy check in tryAcquire
if (current == getExclusiveOwnerThread()) {
    // Reentrant - same thread, increment count
    int nextc = c + acquires;
    if (nextc < 0) // Overflow
        throw new Error("Maximum lock count exceeded");
    setState(nextc);
    return true;
}

// Practical example:
public void outerMethod() {
    lock.lock();
    try {
        innerMethod();  // Can safely call
    } finally {
        lock.unlock();
    }
}

public void innerMethod() {
    lock.lock();  // Same thread - succeeds!
    try {
        // Do work
    } finally {
        lock.unlock();
    }
}`
        }
      ]
    },
    {
      id: 'lock-acquisition',
      name: 'Lock Acquisition',
      icon: '🔒',
      color: '#f59e0b',
      description: 'How threads acquire locks using CAS operations and handle reentrancy.',
      diagram: LockAcquisitionDiagram,
      details: [
        {
          name: 'Non-Fair Acquisition',
          diagram: LockAcquisitionDiagram,
          explanation: 'Non-fair lock acquisition (default) follows these steps: 1) Use CAS to try setting state from 0 to 1, 2) If successful, set the owner thread, 3) If it fails, check if the current thread already owns the lock (reentrant), 4) If not reentrant, enqueue the thread and block it. This allows "barging" where new threads can acquire the lock before waiting threads.',
          codeExample: `// Non-fair tryAcquire
final boolean nonfairTryAcquire(int acquires) {
    final Thread current = Thread.currentThread();
    int c = getState();

    if (c == 0) {
        // Lock is free - try to acquire
        if (compareAndSetState(0, acquires)) {
            setExclusiveOwnerThread(current);
            return true;
        }
    }
    else if (current == getExclusiveOwnerThread()) {
        // Reentrant - same thread, increment count
        int nextc = c + acquires;
        if (nextc < 0) // Overflow
            throw new Error("Maximum lock count exceeded");
        setState(nextc);
        return true;
    }

    return false;  // Failed - will be enqueued
}`
        },
        {
          name: 'Fair Acquisition',
          explanation: 'Fair lock acquisition enforces FIFO ordering. Before attempting to acquire the lock, it checks if there are any threads already waiting in the queue using hasQueuedPredecessors(). Only if the queue is empty (or the current thread is reentrant) will it attempt CAS. This prevents barging and ensures waiting threads are served in order.',
          codeExample: `// Fair tryAcquire
protected final boolean tryAcquire(int acquires) {
    final Thread current = Thread.currentThread();
    int c = getState();

    if (c == 0) {
        // Check queue FIRST - fairness!
        if (!hasQueuedPredecessors() &&
            compareAndSetState(0, acquires)) {
            setExclusiveOwnerThread(current);
            return true;
        }
    }
    else if (current == getExclusiveOwnerThread()) {
        int nextc = c + acquires;
        if (nextc < 0)
            throw new Error("Maximum lock count exceeded");
        setState(nextc);
        return true;
    }

    return false;
}`
        },
        {
          name: 'CAS Operations',
          explanation: 'Compare-And-Set (CAS) is an atomic operation that updates a value only if it matches an expected value. AQS uses CAS to atomically change the state from 0 (unlocked) to 1 (locked). This lock-free operation is much faster than traditional locking and forms the foundation of non-blocking concurrent algorithms.',
          codeExample: `// CAS operation in AQS
protected final boolean compareAndSetState(int expect, int update) {
    // Atomic operation:
    // if (state == expect) {
    //     state = update;
    //     return true;
    // }
    // return false;
    return unsafe.compareAndSwapInt(this, stateOffset, expect, update);
}

// Usage in tryAcquire
if (c == 0) {  // Lock appears free
    if (compareAndSetState(0, 1)) {
        // Success! Atomically changed state from 0 to 1
        setExclusiveOwnerThread(current);
        return true;
    }
    // Failed - another thread got it first
}`
        },
        {
          name: 'Hold Count',
          explanation: 'The hold count tracks how many times the current thread has acquired the lock. It starts at 1 on the first acquisition and increments with each additional lock() call by the same thread. The lock is only fully released when the hold count returns to 0, which requires an equal number of unlock() calls.',
          codeExample: `// Hold count management
private transient Thread exclusiveOwnerThread;

// First acquisition
if (c == 0) {
    if (compareAndSetState(0, 1)) {
        setExclusiveOwnerThread(current);  // Hold count = 1
        return true;
    }
}

// Reentrant acquisition
else if (current == getExclusiveOwnerThread()) {
    int nextc = c + 1;  // Increment hold count
    if (nextc < 0)
        throw new Error("Maximum lock count exceeded");
    setState(nextc);  // Hold count = 2, 3, 4...
    return true;
}

// Must unlock same number of times
lock.lock();    // count = 1
lock.lock();    // count = 2
lock.unlock();  // count = 1
lock.unlock();  // count = 0 (released)`
        }
      ]
    },
    {
      id: 'aqs-wait-queue',
      name: 'AQS Wait Queue',
      icon: '👥',
      color: '#8b5cf6',
      description: 'How the CLH queue manages threads waiting for lock acquisition.',
      diagram: CLHQueueDiagram,
      details: [
        {
          name: 'CLH Queue Structure',
          diagram: CLHQueueDiagram,
          explanation: 'When a thread cannot acquire the lock, it is added to the CLH (Craig, Landin, Hagersten) queue. This is a doubly-linked list of Node objects, where each Node holds a thread reference. The queue has a dummy head node, and threads are added at the tail. Threads spin briefly and then park (block) until signaled.',
          codeExample: `// AQS Node structure
static final class Node {
    volatile int waitStatus;
    volatile Node prev;
    volatile Node next;
    volatile Thread thread;
    Node nextWaiter;  // For Condition queues

    static final int CANCELLED =  1;
    static final int SIGNAL    = -1;
    static final int CONDITION = -2;
    static final int PROPAGATE = -3;
}

// Queue structure:
// head → [dummy] → [thread1] → [thread2] → tail
//                   waiting     waiting`
        },
        {
          name: 'Node States',
          explanation: 'Each Node in the queue has a waitStatus field. CANCELLED (1) means the thread gave up waiting. SIGNAL (-1) means the node must unpark its successor when releasing. CONDITION (-2) means the thread is waiting on a Condition. PROPAGATE (-3) is used for shared mode locks. These states coordinate the wakeup protocol.',
          codeExample: `// Node wait statuses
static final int CANCELLED =  1;  // Thread gave up
static final int SIGNAL    = -1;  // Must unpark successor
static final int CONDITION = -2;  // Waiting on Condition
static final int PROPAGATE = -3;  // For shared mode

// Setting SIGNAL status
private static boolean shouldParkAfterFailedAcquire(
        Node pred, Node node) {
    int ws = pred.waitStatus;
    if (ws == Node.SIGNAL)
        return true;  // Predecessor will signal us
    if (ws > 0) {
        // Skip cancelled nodes
        do {
            node.prev = pred = pred.prev;
        } while (pred.waitStatus > 0);
        pred.next = node;
    } else {
        // Set predecessor to SIGNAL
        compareAndSetWaitStatus(pred, ws, Node.SIGNAL);
    }
    return false;
}`
        },
        {
          name: 'Enqueue Process',
          explanation: 'When a thread fails to acquire the lock, it creates a Node and adds it to the tail of the queue. The addWaiter() method uses a fast path with CAS to atomically set the tail. If that fails (due to contention or queue initialization), it falls back to the full enq() method which handles initialization and retry loops.',
          codeExample: `// Enqueue when lock acquisition fails
private Node addWaiter(Node mode) {
    Node node = new Node(Thread.currentThread(), mode);

    // Fast path - try to enqueue at tail
    Node pred = tail;
    if (pred != null) {
        node.prev = pred;
        if (compareAndSetTail(pred, node)) {
            pred.next = node;
            return node;
        }
    }

    // Full enqueue (handles initialization)
    enq(node);
    return node;
}

// Full enqueue with initialization
private Node enq(final Node node) {
    for (;;) {
        Node t = tail;
        if (t == null) {  // Queue not initialized
            if (compareAndSetHead(new Node()))
                tail = head;  // Create dummy head
        } else {
            node.prev = t;
            if (compareAndSetTail(t, node)) {
                t.next = node;
                return t;
            }
        }
    }
}`
        },
        {
          name: 'Acquire Loop',
          explanation: 'After enqueuing, the thread enters acquireQueued(), which loops trying to acquire the lock. If the thread is at the head of the queue (meaning it is next in line), it attempts acquisition. If unsuccessful or not at the head, it checks if it should park. The thread is unparked when the lock is released by the current holder.',
          codeExample: `// After enqueue - spin/park loop
final boolean acquireQueued(final Node node, int arg) {
    try {
        boolean interrupted = false;
        for (;;) {
            final Node p = node.predecessor();
            if (p == head && tryAcquire(arg)) {
                setHead(node);
                p.next = null;  // Help GC
                return interrupted;
            }
            if (shouldParkAfterFailedAcquire(p, node) &&
                parkAndCheckInterrupt())
                interrupted = true;
        }
    } catch (Throwable t) {
        cancelAcquire(node);
        throw t;
    }
}`
        },
        {
          name: 'Wake-up Protocol',
          explanation: 'When a lock is released, the releasing thread unpacks the successor of the head node. The unpacked thread wakes up, retries acquisition (which should succeed since it is at the head), and becomes the new lock holder. This handoff is efficient and maintains queue ordering (for fair locks).',
          codeExample: `// Release unpacks successor
public final boolean release(int arg) {
    if (tryRelease(arg)) {
        Node h = head;
        if (h != null && h.waitStatus != 0)
            unparkSuccessor(h);
        return true;
    }
    return false;
}

// Unpark the next waiting thread
private void unparkSuccessor(Node node) {
    int ws = node.waitStatus;
    if (ws < 0)
        compareAndSetWaitStatus(node, ws, 0);

    Node s = node.next;
    if (s == null || s.waitStatus > 0) {
        s = null;
        // Find from tail in case next is null
        for (Node t = tail; t != null && t != node; t = t.prev)
            if (t.waitStatus <= 0)
                s = t;
    }
    if (s != null)
        LockSupport.unpark(s.thread);  // Wake up!
}`
        }
      ]
    },
    {
      id: 'condition-variables',
      name: 'Condition Variables',
      icon: '🔔',
      color: '#ec4899',
      description: 'Multiple condition queues for sophisticated wait/notify patterns.',
      diagram: ConditionDiagram,
      details: [
        {
          name: 'Condition Overview',
          diagram: ConditionDiagram,
          explanation: 'ReentrantLock supports multiple Condition objects, unlike the single wait set associated with synchronized. Each Condition provides await(), signal(), and signalAll() methods. The key advantage is having separate queues for different events, making code more readable and efficient.',
          codeExample: `// Creating multiple conditions
Lock lock = new ReentrantLock();
Condition notFull = lock.newCondition();
Condition notEmpty = lock.newCondition();

// vs synchronized (only one wait set)
synchronized (lock) {
    while (condition)
        lock.wait();  // All waiters in same queue
    lock.notifyAll(); // Wake all, even unrelated
}`
        },
        {
          name: 'await() Method',
          explanation: 'The await() method releases the lock and waits until signaled. It is equivalent to Object.wait() but must be called while holding the lock. When signaled, the thread re-acquires the lock before returning. Always use await() in a loop to handle spurious wakeups.',
          codeExample: `// await() releases lock and waits
lock.lock();
try {
    while (!conditionMet) {
        condition.await();  // Release lock, wait, re-acquire
    }
    // Lock is held here
    performAction();
} finally {
    lock.unlock();
}

// With timeout
if (!condition.await(1, TimeUnit.SECONDS)) {
    // Timeout occurred
}

// Uninterruptible
condition.awaitUninterruptibly();`
        },
        {
          name: 'signal() Method',
          explanation: 'The signal() method wakes up one thread waiting on this Condition. The awakened thread moves from the condition queue to the lock wait queue and must re-acquire the lock. Use signal() when you know exactly one thread should wake up (e.g., after adding one item to a queue).',
          codeExample: `// signal() wakes one waiting thread
lock.lock();
try {
    produceItem();
    notEmpty.signal();  // Wake one consumer
} finally {
    lock.unlock();
}

// signalAll() wakes all waiting threads
lock.lock();
try {
    criticalStateChange();
    condition.signalAll();  // Wake all waiters
} finally {
    lock.unlock();
}`
        },
        {
          name: 'Producer-Consumer',
          explanation: 'A classic use of multiple Conditions is the producer-consumer pattern. Producers wait on notFull and signal notEmpty. Consumers wait on notEmpty and signal notFull. This is more efficient than using notifyAll() with synchronized, which wakes all threads unnecessarily.',
          codeExample: `// Producer-Consumer with Conditions
class BoundedBuffer<E> {
    final Lock lock = new ReentrantLock();
    final Condition notFull = lock.newCondition();
    final Condition notEmpty = lock.newCondition();

    final Object[] items = new Object[100];
    int putptr, takeptr, count;

    public void put(E x) throws InterruptedException {
        lock.lock();
        try {
            while (count == items.length)
                notFull.await();  // Wait until not full

            items[putptr] = x;
            if (++putptr == items.length) putptr = 0;
            ++count;

            notEmpty.signal();  // Signal not empty
        } finally {
            lock.unlock();
        }
    }

    public E take() throws InterruptedException {
        lock.lock();
        try {
            while (count == 0)
                notEmpty.await();  // Wait until not empty

            E x = (E) items[takeptr];
            if (++takeptr == items.length) takeptr = 0;
            --count;

            notFull.signal();  // Signal not full
            return x;
        } finally {
            lock.unlock();
        }
    }
}`
        },
        {
          name: 'Condition Queue',
          explanation: 'Each Condition maintains its own queue of waiting threads, separate from the lock wait queue. When await() is called, the thread moves from the lock wait queue to the condition queue. When signaled, it moves back to the lock wait queue to re-acquire the lock.',
          codeExample: `// Condition queue structure
// Lock wait queue: head → [thread1] → tail
// Condition1 queue: firstWaiter → [thread2] → lastWaiter
// Condition2 queue: firstWaiter → [thread3] → lastWaiter

// Internal Condition implementation
public class ConditionObject implements Condition {
    private transient Node firstWaiter;
    private transient Node lastWaiter;

    public final void await() throws InterruptedException {
        Node node = addConditionWaiter();
        int savedState = fullyRelease(node);
        while (!isOnSyncQueue(node)) {
            LockSupport.park(this);
        }
        acquireQueued(node, savedState);
    }
}`
        }
      ]
    },
    {
      id: 'fair-vs-nonfair',
      name: 'Fair vs Non-Fair',
      icon: '⚖️',
      color: '#06b6d4',
      description: 'Performance tradeoffs between fair and non-fair lock acquisition.',
      diagram: FairVsNonFairDiagram,
      details: [
        {
          name: 'Non-Fair (Default)',
          diagram: FairVsNonFairDiagram,
          explanation: 'Non-fair locks (default) allow threads to "barge"—skip the queue if the lock is available when they call lock(). This provides higher throughput because it reduces context switches. However, it can lead to starvation where some threads wait indefinitely while others keep acquiring the lock.',
          codeExample: `// Non-fair lock (default) - can barge
ReentrantLock unfairLock = new ReentrantLock();

// Thread 1 releases lock
// Thread 2 was waiting in queue
// Thread 3 just called lock()
// Thread 3 may acquire before Thread 2! (barging)

// Higher throughput:
// - Less context switching
// - Better CPU cache utilization
// - Faster overall execution

// But possible starvation:
// - Some threads may wait very long
// - No guarantee of acquisition order`
        },
        {
          name: 'Fair Lock',
          explanation: 'Fair locks enforce strict FIFO ordering. Threads are served in the order they requested the lock. This prevents starvation but reduces throughput because every acquisition must check the queue. Fair locks can be 10x slower under high contention but are necessary when predictable ordering is required.',
          codeExample: `// Fair lock - FIFO order
ReentrantLock fairLock = new ReentrantLock(true);

// Thread 1 releases lock
// Thread 2 was waiting in queue
// Thread 3 just called lock()
// Thread 2 WILL acquire before Thread 3

// Advantages:
// - No starvation
// - Predictable ordering
// - Better for time-sensitive tasks

// Disadvantages:
// - Lower throughput (more context switches)
// - Always checks queue before acquisition
// - Can be 10x slower under contention`
        },
        {
          name: 'hasQueuedPredecessors',
          explanation: 'The hasQueuedPredecessors() method is the key to fairness. It checks if any threads are waiting in the queue ahead of the current thread. Fair locks call this before attempting CAS. If predecessors exist, the acquisition attempt is skipped, and the thread joins the queue.',
          codeExample: `// hasQueuedPredecessors - check if others waiting
public final boolean hasQueuedPredecessors() {
    Node t = tail;
    Node h = head;
    Node s;
    return h != t &&
        ((s = h.next) == null || s.thread != Thread.currentThread());
}

// Fair tryAcquire uses it
protected final boolean tryAcquire(int acquires) {
    // ...
    if (c == 0) {
        if (!hasQueuedPredecessors() &&  // Fair check!
            compareAndSetState(0, acquires)) {
            // Only acquire if no one waiting
        }
    }
    // ...
}`
        },
        {
          name: 'Performance Impact',
          explanation: 'Non-fair locks can be significantly faster under contention because they avoid the overhead of checking the queue and reduce context switches. However, for applications requiring predictable response times or where starvation is unacceptable (e.g., real-time systems), fair locks are necessary despite the performance cost.',
          codeExample: `// Performance comparison (under high contention)
// Non-fair: ~10,000 ops/sec
ReentrantLock unfair = new ReentrantLock(false);

// Fair: ~1,000 ops/sec (10x slower)
ReentrantLock fair = new ReentrantLock(true);

// Default to non-fair unless fairness required
// Benchmark results:
// Non-fair: Better throughput, unpredictable latency
// Fair: Lower throughput, bounded latency

// Choose fair when:
// - Starvation is unacceptable
// - Predictable order required
// - Real-time constraints

// Choose non-fair when:
// - Maximum throughput needed
// - Short critical sections
// - Low contention`
        },
        {
          name: 'Barging Behavior',
          explanation: 'Barging is when a newly arriving thread acquires the lock before threads already waiting in the queue. This happens in non-fair locks when the lock becomes available just as a new thread calls lock(). The new thread can immediately acquire it via CAS without ever entering the queue.',
          codeExample: `// Barging scenario (non-fair)
// Time T0: Thread A holds lock
// Time T1: Thread B calls lock(), enters queue
// Time T2: Thread A unlocks
// Time T3: Thread C calls lock()
// Time T4: Thread C acquires lock (barges ahead of B!)

// Non-fair tryAcquire allows barging
if (c == 0) {
    if (compareAndSetState(0, acquires)) {
        // New thread got it! No queue check
        setExclusiveOwnerThread(current);
        return true;
    }
}

// Fair tryAcquire prevents barging
if (c == 0) {
    if (!hasQueuedPredecessors() &&  // Check queue first!
        compareAndSetState(0, acquires)) {
        setExclusiveOwnerThread(current);
        return true;
    }
}`
        }
      ]
    },
    {
      id: 'interview-questions',
      name: 'Interview Questions',
      icon: '💡',
      color: '#ef4444',
      description: 'Common ReentrantLock interview questions and best practices.',
      details: [
        {
          name: 'Key Differences',
          explanation: 'ReentrantLock vs synchronized: ReentrantLock provides tryLock (non-blocking), timeout support, interruptible lock acquisition, fairness options, and multiple Condition variables. Synchronized is simpler and automatically releases the lock. Use ReentrantLock when you need these advanced features; otherwise, prefer synchronized for its simplicity.',
          codeExample: `// Q: ReentrantLock vs synchronized?
// A: Key differences:

// 1. tryLock - non-blocking
if (lock.tryLock()) { /* ... */ }

// 2. Timeout
if (lock.tryLock(1, TimeUnit.SECONDS)) { /* ... */ }

// 3. Interruptible
lock.lockInterruptibly();

// 4. Fairness
ReentrantLock fair = new ReentrantLock(true);

// 5. Multiple conditions
Condition c1 = lock.newCondition();
Condition c2 = lock.newCondition();

// 6. Lock status
boolean isLocked = lock.isLocked();
boolean isHeldByMe = lock.isHeldByCurrentThread();`
        },
        {
          name: 'What is AQS?',
          explanation: 'AbstractQueuedSynchronizer (AQS) is an abstract framework for building synchronizers. It provides a state field managed via CAS, a FIFO wait queue for blocking threads, and template methods (tryAcquire, tryRelease) that subclasses implement. Most java.util.concurrent synchronizers (ReentrantLock, Semaphore, CountDownLatch) are built on AQS.',
          codeExample: `// Q: What is AQS?
// A: Abstract framework for building synchronizers

// AQS provides:
// 1. State management (volatile int state)
private volatile int state;

// 2. Wait queue (CLH queue)
private transient volatile Node head;
private transient volatile Node tail;

// 3. Template methods
protected boolean tryAcquire(int arg);
protected boolean tryRelease(int arg);

// 4. Acquire/release framework
public final void acquire(int arg) {
    if (!tryAcquire(arg))
        addWaiter();  // Enqueue and block
}

// Used by: ReentrantLock, Semaphore, CountDownLatch,
//          ReentrantReadWriteLock, FutureTask, etc.`
        },
        {
          name: 'Reentrancy Meaning',
          explanation: 'Reentrant means a thread can acquire the same lock multiple times without deadlocking itself. Each acquisition increments a hold count, and each release decrements it. The lock is fully released only when the count reaches zero. This is crucial for recursive methods and nested synchronization.',
          codeExample: `// Q: What does "reentrant" mean?
// A: Same thread can acquire lock multiple times

lock.lock();     // state = 1, hold count = 1
lock.lock();     // state = 2, hold count = 2 (same thread OK!)
lock.unlock();   // state = 1, hold count = 1
lock.unlock();   // state = 0, hold count = 0 (released)

// Why it matters:
public void outerMethod() {
    lock.lock();
    try {
        innerMethod();  // Would deadlock if not reentrant!
    } finally {
        lock.unlock();
    }
}

public void innerMethod() {
    lock.lock();  // Same thread - succeeds because reentrant
    try {
        // Do work
    } finally {
        lock.unlock();
    }
}`
        },
        {
          name: 'Fair vs Non-Fair Performance',
          explanation: 'Non-fair locks are faster (higher throughput) because they allow barging, which reduces context switches and improves CPU cache utilization. Fair locks prevent starvation by enforcing FIFO order but have lower throughput due to queue checking overhead. Non-fair can be 10x faster under high contention.',
          codeExample: `// Q: Fair vs non-fair performance?
// A: Non-fair is faster (barging), fair prevents starvation

// Non-fair (default):
// - Higher throughput (10x faster under contention)
// - Less context switching
// - Possible starvation
// - Better CPU cache utilization

ReentrantLock unfair = new ReentrantLock();

// Fair:
// - Lower throughput
// - No starvation (FIFO order)
// - More context switching
// - Predictable latency

ReentrantLock fair = new ReentrantLock(true);

// Use non-fair for: max throughput
// Use fair for: starvation prevention`
        },
        {
          name: 'Try-Finally Pattern',
          explanation: 'Always use try-finally with ReentrantLock to ensure the lock is released even if an exception occurs. Unlike synchronized (which automatically releases), ReentrantLock requires manual release. Forgetting to unlock in finally can cause permanent thread blocking and application deadlock.',
          codeExample: `// Q: Why always use try-finally?
// A: Ensure unlock even if exception occurs

// BAD - lock never released on exception:
lock.lock();
doSomething();  // If exception, lock never released!
lock.unlock();  // Never reached

// GOOD - lock always released:
lock.lock();
try {
    doSomething();  // Even if exception...
} finally {
    lock.unlock();  // ...this ALWAYS executes
}

// Critical: Without try-finally, an exception
// leaves the lock permanently held, blocking
// all other threads trying to acquire it!`
        },
        {
          name: 'What is Condition?',
          explanation: 'A Condition is like wait/notify but associated with a specific lock, and you can have multiple Conditions per lock. Each Condition has its own wait queue. Use await() to wait, signal() to wake one thread, and signalAll() to wake all. This is more efficient and readable than synchronized with notifyAll().',
          codeExample: `// Q: What is a Condition?
// A: Like wait/notify but can have multiple per lock

Lock lock = new ReentrantLock();
Condition notFull = lock.newCondition();
Condition notEmpty = lock.newCondition();

// Separate queues for different conditions
// Producer waits on notFull
lock.lock();
try {
    while (isFull())
        notFull.await();
    produce();
    notEmpty.signal();  // Wake one consumer
} finally {
    lock.unlock();
}

// Consumer waits on notEmpty
lock.lock();
try {
    while (isEmpty())
        notEmpty.await();
    consume();
    notFull.signal();  // Wake one producer
} finally {
    lock.unlock();
}

// More efficient than notifyAll() which wakes everyone!`
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
      { name: 'My Projects', icon: '🚀', page: 'My Projects' },
      { name: 'ReentrantLock Internals', icon: '🔒', page: 'ReentrantLock Internals' }
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
        <h1 style={titleStyle}>ReentrantLock - Internal Workings</h1>
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
          ← Back to My Projects
        </button>
      </div>

      {/* Breadcrumb navigation */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu}
          colors={REENTRANTLOCK_COLORS}
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
              colors={REENTRANTLOCK_COLORS}
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

export default ReentrantLockInternals
