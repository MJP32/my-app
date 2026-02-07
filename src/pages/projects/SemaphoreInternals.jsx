/**
 * Semaphore Internals - Deep dive into Java Semaphore
 *
 * Covers permit-based synchronization, fair vs non-fair modes,
 * connection pooling, rate limiting, and comparison with mutex.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const SEMAPHORE_COLORS = {
  primary: '#6366f1',           // Indigo
  primaryHover: '#818cf8',      // Lighter indigo
  bg: 'rgba(99, 102, 241, 0.1)',
  border: 'rgba(99, 102, 241, 0.3)',
  arrow: '#6366f1',
  hoverBg: 'rgba(99, 102, 241, 0.2)',
  topicBg: 'rgba(99, 102, 241, 0.2)'
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

const PermitsDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="semArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Semaphore Permits Model
    </text>

    {/* Permit pool */}
    <rect x="300" y="50" width="200" height="60" rx="8" fill="rgba(99, 102, 241, 0.2)" stroke="#6366f1" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#a5b4fc" fontSize="11" fontWeight="bold">Permit Pool</text>
    <text x="400" y="95" textAnchor="middle" fill="#94a3b8" fontSize="10">state = available permits</text>

    {/* Permits */}
    <rect x="320" y="125" width="40" height="30" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="340" y="145" textAnchor="middle" fill="white" fontSize="9">P1</text>

    <rect x="370" y="125" width="40" height="30" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="390" y="145" textAnchor="middle" fill="white" fontSize="9">P2</text>

    <rect x="420" y="125" width="40" height="30" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="440" y="145" textAnchor="middle" fill="white" fontSize="9">P3</text>

    {/* Threads */}
    <rect x="50" y="120" width="80" height="40" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="90" y="145" textAnchor="middle" fill="white" fontSize="10">Thread 1</text>

    <rect x="670" y="120" width="80" height="40" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="710" y="145" textAnchor="middle" fill="white" fontSize="10">Thread 4</text>
    <text x="710" y="175" textAnchor="middle" fill="#f87171" fontSize="9">BLOCKED</text>

    {/* Arrows */}
    <line x1="130" y1="140" x2="310" y2="140" stroke="#6366f1" strokeWidth="2" markerEnd="url(#semArrow)"/>
    <text x="220" y="130" textAnchor="middle" fill="#94a3b8" fontSize="9">acquire()</text>

    <line x1="500" y1="140" x2="660" y2="140" stroke="#6366f1" strokeWidth="2" strokeDasharray="5,5"/>
    <text x="580" y="130" textAnchor="middle" fill="#94a3b8" fontSize="9">waiting...</text>

    {/* Legend */}
    <text x="400" y="210" textAnchor="middle" fill="#64748b" fontSize="10">
      Semaphore(3): 3 permits available, 4th thread blocks
    </text>
  </svg>
)

const FairnessDiagram = () => (
  <svg viewBox="0 0 800 260" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="fairArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Fair vs Non-Fair Semaphore
    </text>

    {/* Non-Fair side */}
    <text x="200" y="55" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">
      Non-Fair (default)
    </text>

    <rect x="50" y="70" width="300" height="80" rx="8" fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,4"/>

    <rect x="70" y="85" width="60" height="25" rx="4" fill="#64748b"/>
    <text x="100" y="102" textAnchor="middle" fill="white" fontSize="9">T1 wait</text>

    <rect x="140" y="85" width="60" height="25" rx="4" fill="#64748b"/>
    <text x="170" y="102" textAnchor="middle" fill="white" fontSize="9">T2 wait</text>

    <rect x="210" y="85" width="60" height="25" rx="4" fill="#22c55e"/>
    <text x="240" y="102" textAnchor="middle" fill="white" fontSize="9">T3 NEW</text>

    <line x1="240" y1="115" x2="240" y2="140" stroke="#22c55e" strokeWidth="2" markerEnd="url(#fairArrow)"/>
    <text x="290" y="135" textAnchor="start" fill="#22c55e" fontSize="9">T3 barges ahead!</text>

    {/* Fair side */}
    <text x="600" y="55" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">
      Fair (FIFO)
    </text>

    <rect x="450" y="70" width="300" height="80" rx="8" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="1" strokeDasharray="4,4"/>

    <rect x="470" y="85" width="60" height="25" rx="4" fill="#3b82f6"/>
    <text x="500" y="102" textAnchor="middle" fill="white" fontSize="9">T1 first</text>

    <rect x="540" y="85" width="60" height="25" rx="4" fill="#64748b"/>
    <text x="570" y="102" textAnchor="middle" fill="white" fontSize="9">T2 wait</text>

    <rect x="610" y="85" width="60" height="25" rx="4" fill="#64748b"/>
    <text x="640" y="102" textAnchor="middle" fill="white" fontSize="9">T3 wait</text>

    <line x1="500" y1="115" x2="500" y2="140" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#fairArrow)"/>
    <text x="550" y="135" textAnchor="start" fill="#3b82f6" fontSize="9">T1 goes first</text>

    {/* Comparison */}
    <rect x="100" y="170" width="250" height="60" rx="6" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="225" y="190" textAnchor="middle" fill="#fbbf24" fontSize="10">Higher throughput</text>
    <text x="225" y="210" textAnchor="middle" fill="#94a3b8" fontSize="9">Risk of starvation</text>

    <rect x="450" y="170" width="250" height="60" rx="6" fill="rgba(34, 197, 94, 0.15)" stroke="#22c55e" strokeWidth="1"/>
    <text x="575" y="190" textAnchor="middle" fill="#4ade80" fontSize="10">Guaranteed ordering</text>
    <text x="575" y="210" textAnchor="middle" fill="#94a3b8" fontSize="9">Lower throughput</text>
  </svg>
)

const AcquireReleaseDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="acqArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Acquire / Release Cycle
    </text>

    {/* Thread box */}
    <rect x="50" y="60" width="100" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Thread</text>

    {/* acquire arrow */}
    <line x1="150" y1="75" x2="280" y2="75" stroke="#22c55e" strokeWidth="2" markerEnd="url(#acqArrow)"/>
    <text x="215" y="65" textAnchor="middle" fill="#4ade80" fontSize="10">acquire()</text>

    {/* Semaphore */}
    <rect x="290" y="50" width="120" height="70" rx="8" fill="rgba(99, 102, 241, 0.3)" stroke="#6366f1" strokeWidth="2"/>
    <text x="350" y="75" textAnchor="middle" fill="#a5b4fc" fontSize="11" fontWeight="bold">Semaphore</text>
    <text x="350" y="95" textAnchor="middle" fill="#94a3b8" fontSize="10">permits--</text>

    {/* Critical section */}
    <line x1="410" y1="85" x2="490" y2="85" stroke="#6366f1" strokeWidth="2" markerEnd="url(#acqArrow)"/>

    <rect x="500" y="50" width="140" height="70" rx="8" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="570" y="75" textAnchor="middle" fill="#c4b5fd" fontSize="11" fontWeight="bold">Critical Section</text>
    <text x="570" y="95" textAnchor="middle" fill="#94a3b8" fontSize="10">use resource</text>

    {/* release arrow */}
    <path d="M 640 85 Q 700 85 700 130 Q 700 160 350 160" fill="none" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#acqArrow)"/>
    <text x="550" y="175" textAnchor="middle" fill="#fbbf24" fontSize="10">release()</text>

    {/* Semaphore after release */}
    <text x="350" y="145" textAnchor="middle" fill="#94a3b8" fontSize="10">permits++</text>
  </svg>
)

const ConnectionPoolDiagram = () => (
  <svg viewBox="0 0 800 240" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="poolArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Connection Pool with Semaphore
    </text>

    {/* Clients */}
    <rect x="30" y="60" width="80" height="35" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="70" y="82" textAnchor="middle" fill="white" fontSize="9">Client 1</text>

    <rect x="30" y="105" width="80" height="35" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="70" y="127" textAnchor="middle" fill="white" fontSize="9">Client 2</text>

    <rect x="30" y="150" width="80" height="35" rx="6" fill="#64748b" stroke="#94a3b8" strokeWidth="1"/>
    <text x="70" y="172" textAnchor="middle" fill="white" fontSize="9">Client 3</text>
    <text x="70" y="200" textAnchor="middle" fill="#f87171" fontSize="8">waiting</text>

    {/* Semaphore gate */}
    <rect x="170" y="55" width="100" height="140" rx="8" fill="rgba(99, 102, 241, 0.2)" stroke="#6366f1" strokeWidth="2"/>
    <text x="220" y="80" textAnchor="middle" fill="#a5b4fc" fontSize="10" fontWeight="bold">Semaphore</text>
    <text x="220" y="100" textAnchor="middle" fill="#94a3b8" fontSize="9">permits = 2</text>

    <rect x="185" y="115" width="25" height="20" rx="3" fill="#22c55e"/>
    <text x="197" y="129" textAnchor="middle" fill="white" fontSize="8">P1</text>

    <rect x="220" y="115" width="25" height="20" rx="3" fill="#22c55e"/>
    <text x="232" y="129" textAnchor="middle" fill="white" fontSize="8">P2</text>

    {/* Arrows to semaphore */}
    <line x1="110" y1="77" x2="165" y2="120" stroke="#22c55e" strokeWidth="1.5" markerEnd="url(#poolArrow)"/>
    <line x1="110" y1="122" x2="165" y2="130" stroke="#22c55e" strokeWidth="1.5" markerEnd="url(#poolArrow)"/>
    <line x1="110" y1="167" x2="165" y2="150" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,4"/>

    {/* Connection pool */}
    <rect x="330" y="55" width="150" height="140" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="405" y="80" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Connection Pool</text>

    <rect x="350" y="100" width="110" height="25" rx="4" fill="#3b82f6"/>
    <text x="405" y="117" textAnchor="middle" fill="white" fontSize="9">Connection 1</text>

    <rect x="350" y="135" width="110" height="25" rx="4" fill="#3b82f6"/>
    <text x="405" y="152" textAnchor="middle" fill="white" fontSize="9">Connection 2</text>

    {/* Arrows to pool */}
    <line x1="270" y1="120" x2="325" y2="112" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#poolArrow)"/>
    <line x1="270" y1="140" x2="325" y2="147" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#poolArrow)"/>

    {/* Database */}
    <ellipse cx="580" cy="125" rx="50" ry="30" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="580" y="130" textAnchor="middle" fill="#c4b5fd" fontSize="10" fontWeight="bold">Database</text>

    <line x1="480" y1="112" x2="525" y2="115" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#poolArrow)"/>
    <line x1="480" y1="147" x2="525" y2="135" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#poolArrow)"/>

    {/* Legend */}
    <text x="700" y="80" textAnchor="middle" fill="#22c55e" fontSize="9">permit acquired</text>
    <text x="700" y="100" textAnchor="middle" fill="#ef4444" fontSize="9">blocked (no permit)</text>
  </svg>
)

const RateLimitDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="rateArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Rate Limiting with Semaphore
    </text>

    {/* Time axis */}
    <line x1="50" y1="160" x2="750" y2="160" stroke="#64748b" strokeWidth="1"/>
    <text x="400" y="185" textAnchor="middle" fill="#64748b" fontSize="10">Time (seconds)</text>

    {/* Time markers */}
    <line x1="100" y1="155" x2="100" y2="165" stroke="#64748b" strokeWidth="1"/>
    <text x="100" y="175" textAnchor="middle" fill="#64748b" fontSize="9">0s</text>

    <line x1="300" y1="155" x2="300" y2="165" stroke="#64748b" strokeWidth="1"/>
    <text x="300" y="175" textAnchor="middle" fill="#64748b" fontSize="9">1s</text>

    <line x1="500" y1="155" x2="500" y2="165" stroke="#64748b" strokeWidth="1"/>
    <text x="500" y="175" textAnchor="middle" fill="#64748b" fontSize="9">2s</text>

    <line x1="700" y1="155" x2="700" y2="165" stroke="#64748b" strokeWidth="1"/>
    <text x="700" y="175" textAnchor="middle" fill="#64748b" fontSize="9">3s</text>

    {/* First second - permits */}
    <rect x="80" y="60" width="180" height="80" rx="6" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="1" strokeDasharray="4,4"/>
    <text x="170" y="80" textAnchor="middle" fill="#4ade80" fontSize="10">100 permits/sec</text>

    {/* Permit dots */}
    {[0, 1, 2, 3, 4].map((i) => (
      <circle key={i} cx={100 + i * 30} cy={110} r="8" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    ))}
    <text x="170" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9">requests processed</text>

    {/* Second second - replenish */}
    <rect x="280" y="60" width="180" height="80" rx="6" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4,4"/>
    <text x="370" y="80" textAnchor="middle" fill="#60a5fa" fontSize="10">replenish permits</text>

    <path d="M 320 100 Q 370 70 420 100" fill="none" stroke="#3b82f6" strokeWidth="2"/>
    <text x="370" y="130" textAnchor="middle" fill="#94a3b8" fontSize="9">scheduler adds permits</text>

    {/* Third second - more requests */}
    <rect x="480" y="60" width="180" height="80" rx="6" fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,4"/>
    <text x="570" y="80" textAnchor="middle" fill="#fbbf24" fontSize="10">excess blocked</text>

    {[0, 1, 2].map((i) => (
      <circle key={i} cx={510 + i * 30} cy={110} r="8" fill="#22c55e"/>
    ))}
    {[0, 1].map((i) => (
      <circle key={i} cx={600 + i * 30} cy={110} r="8" fill="#ef4444" stroke="#f87171" strokeWidth="1"/>
    ))}
    <text x="570" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9">over limit = wait</text>
  </svg>
)

const BinaryVsMutexDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Binary Semaphore vs Mutex (ReentrantLock)
    </text>

    {/* Binary Semaphore */}
    <rect x="50" y="50" width="320" height="150" rx="8" fill="rgba(99, 102, 241, 0.1)" stroke="#6366f1" strokeWidth="2"/>
    <text x="210" y="75" textAnchor="middle" fill="#a5b4fc" fontSize="12" fontWeight="bold">Binary Semaphore(1)</text>

    <rect x="70" y="90" width="130" height="40" rx="4" fill="#3b82f6"/>
    <text x="135" y="115" textAnchor="middle" fill="white" fontSize="10">Thread A: acquire</text>

    <rect x="220" y="90" width="130" height="40" rx="4" fill="#22c55e"/>
    <text x="285" y="115" textAnchor="middle" fill="white" fontSize="10">Thread B: release</text>

    <text x="210" y="155" textAnchor="middle" fill="#4ade80" fontSize="10">Any thread can release</text>
    <text x="210" y="175" textAnchor="middle" fill="#f87171" fontSize="10">NOT reentrant (deadlock)</text>

    {/* Mutex */}
    <rect x="430" y="50" width="320" height="150" rx="8" fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="590" y="75" textAnchor="middle" fill="#c4b5fd" fontSize="12" fontWeight="bold">ReentrantLock (Mutex)</text>

    <rect x="450" y="90" width="130" height="40" rx="4" fill="#3b82f6"/>
    <text x="515" y="115" textAnchor="middle" fill="white" fontSize="10">Thread A: lock</text>

    <rect x="600" y="90" width="130" height="40" rx="4" fill="#3b82f6"/>
    <text x="665" y="115" textAnchor="middle" fill="white" fontSize="10">Thread A: unlock</text>

    <text x="590" y="155" textAnchor="middle" fill="#4ade80" fontSize="10">Only owner can unlock</text>
    <text x="590" y="175" textAnchor="middle" fill="#4ade80" fontSize="10">Reentrant (safe)</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function SemaphoreInternals({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'fundamentals',
      name: 'Semaphore Fundamentals',
      icon: '🚦',
      color: '#6366f1',
      description: 'Core concepts of permit-based synchronization, AQS integration, and basic operations.',
      diagram: PermitsDiagram,
      details: [
        {
          name: 'Core Structure',
          diagram: PermitsDiagram,
          explanation: `Semaphore controls access to shared resources using permits. Built on AbstractQueuedSynchronizer (AQS), it uses the AQS state field to track available permits. Key characteristics:

- Permits can exceed initial count (release without prior acquire)
- Not tied to threads (can release from different thread than acquired)
- Supports both fair and non-fair modes
- All operations are atomic via CAS`,
          codeExample: `// Semaphore internal structure
public class Semaphore {
    private final Sync sync;

    // Uses AQS with state = permits
    abstract static class Sync extends AbstractQueuedSynchronizer {
        Sync(int permits) {
            setState(permits);
        }

        final int getPermits() {
            return getState();
        }

        // Non-fair tryAcquire
        final int nonfairTryAcquireShared(int acquires) {
            for (;;) {
                int available = getState();
                int remaining = available - acquires;
                if (remaining < 0 ||
                    compareAndSetState(available, remaining))
                    return remaining;
            }
        }

        // Release permits
        protected final boolean tryReleaseShared(int releases) {
            for (;;) {
                int current = getState();
                int next = current + releases;
                if (next < current) // overflow
                    throw new Error("Maximum permit count exceeded");
                if (compareAndSetState(current, next))
                    return true;
            }
        }
    }
}`
        },
        {
          name: 'Basic Operations',
          diagram: AcquireReleaseDiagram,
          explanation: `Core Semaphore operations for acquiring and releasing permits:

- acquire(): Blocks until a permit is available, then takes it
- release(): Returns a permit to the semaphore
- tryAcquire(): Non-blocking attempt to get a permit
- tryAcquire(timeout): Waits up to timeout for a permit
- availablePermits(): Returns current permit count`,
          codeExample: `// Basic usage
Semaphore semaphore = new Semaphore(3);  // 3 permits

// Thread 1, 2, 3: acquire immediately
semaphore.acquire();  // Permits: 3 -> 2
semaphore.acquire();  // Permits: 2 -> 1
semaphore.acquire();  // Permits: 1 -> 0

// Thread 4: blocks until permit available
semaphore.acquire();  // Blocks!

// Thread 1 releases
semaphore.release();  // Permits: 0 -> 1, Thread 4 unblocks

// Non-blocking attempt
if (semaphore.tryAcquire()) {
    try {
        // use resource
    } finally {
        semaphore.release();
    }
} else {
    // handle unavailable
}

// With timeout
if (semaphore.tryAcquire(5, TimeUnit.SECONDS)) {
    try {
        // use resource
    } finally {
        semaphore.release();
    }
}`
        },
        {
          name: 'Use Cases',
          explanation: `Common use cases for Semaphore in real applications:

- Connection pools: Limit concurrent database connections
- Rate limiting: Control request throughput
- Resource pooling: Manage limited resources like file handles
- Bounded collections: Limit queue/buffer size
- Licensing: Enforce concurrent user limits`,
          codeExample: `// Use case examples

// 1. Connection pool - limit concurrent connections
Semaphore connectionPool = new Semaphore(10);

// 2. Rate limiter - max 100 requests/second
Semaphore rateLimiter = new Semaphore(100);

// 3. Bounded buffer - limit queue size
Semaphore bufferSlots = new Semaphore(1000);

// 4. Resource gate - control access
Semaphore gate = new Semaphore(1, true); // fair

// Pattern: always release in finally
void useResource() throws InterruptedException {
    semaphore.acquire();
    try {
        // critical section
        doWork();
    } finally {
        semaphore.release();  // ALWAYS release
    }
}`
        }
      ]
    },
    {
      id: 'fairness',
      name: 'Fair vs Non-Fair',
      icon: '⚖️',
      color: '#22c55e',
      description: 'Understanding fairness modes: FIFO ordering vs barging for throughput.',
      diagram: FairnessDiagram,
      details: [
        {
          name: 'Non-Fair Mode',
          diagram: FairnessDiagram,
          explanation: `Non-fair mode (default) prioritizes throughput over ordering:

- Threads may "barge" ahead of waiting threads
- Better throughput under contention
- Possible starvation of waiting threads
- Recommended for most use cases

The barging optimization reduces context switches by allowing a running thread to acquire immediately rather than going to sleep and waking a queued thread.`,
          codeExample: `// Non-fair (default) - better performance
Semaphore nonFair = new Semaphore(5);

// Non-fair internal implementation
static final class NonfairSync extends Sync {
    NonfairSync(int permits) {
        super(permits);
    }

    protected int tryAcquireShared(int acquires) {
        return nonfairTryAcquireShared(acquires);  // May barge
    }
}

// Non-fair scenario:
// Thread A holds permit
// Thread B, C waiting in queue
// Thread A releases, Thread D arrives
// Thread D may acquire before B or C!

// Performance: ~2-3x faster under contention`
        },
        {
          name: 'Fair Mode',
          explanation: `Fair mode guarantees FIFO ordering of permit acquisition:

- Threads acquire permits in order of arrival
- No starvation - every waiting thread eventually gets a permit
- Lower throughput due to additional queue checks
- Use when ordering matters or starvation is unacceptable`,
          codeExample: `// Fair - FIFO ordering
Semaphore fair = new Semaphore(5, true);

// Fair internal implementation
static final class FairSync extends Sync {
    FairSync(int permits) {
        super(permits);
    }

    protected int tryAcquireShared(int acquires) {
        for (;;) {
            // Check if there are waiters before us
            if (hasQueuedPredecessors())
                return -1;  // Must wait in queue

            int available = getState();
            int remaining = available - acquires;
            if (remaining < 0 ||
                compareAndSetState(available, remaining))
                return remaining;
        }
    }
}

// Fair scenario:
// Thread A holds permit
// Thread B, C waiting in queue (in that order)
// Thread A releases, Thread D arrives
// Thread B gets permit (first in queue)
// Thread D goes to back of queue`
        },
        {
          name: 'When to Use Fair',
          explanation: `Choose fair mode when:

- Starvation is unacceptable (all threads must progress)
- Predictable ordering needed for debugging/testing
- Long-held permits (like connection pools)
- Critical that no thread waits indefinitely

Choose non-fair (default) when:
- Maximum throughput is important
- Occasional reordering is acceptable
- Short-held permits
- High contention scenarios`,
          codeExample: `// When to use which mode

// Use FAIR for connection pools (long-held resources)
ConnectionPool pool = new ConnectionPool(
    new Semaphore(10, true)  // fair
);

// Use NON-FAIR for rate limiting (short operations)
RateLimiter limiter = new RateLimiter(
    new Semaphore(100)  // non-fair, high throughput
);

// Use FAIR for testing (predictable behavior)
Semaphore testSem = new Semaphore(1, true);

// Benchmark comparison (typical results):
// Non-fair: 1,000,000 ops in 500ms
// Fair:     1,000,000 ops in 1500ms
// ~3x difference under high contention`
        }
      ]
    },
    {
      id: 'connection-pool',
      name: 'Connection Pool Pattern',
      icon: '🔌',
      color: '#3b82f6',
      description: 'Using Semaphore to build bounded connection pools with timeout support.',
      diagram: ConnectionPoolDiagram,
      details: [
        {
          name: 'Basic Pool',
          diagram: ConnectionPoolDiagram,
          explanation: `Connection pools use Semaphore to limit concurrent connections:

- Semaphore permits = maximum connections
- acquire() before getting a connection
- release() after returning connection
- Blocks when pool exhausted

This pattern prevents resource exhaustion and provides natural backpressure when the system is overloaded.`,
          codeExample: `// Connection pool with Semaphore
class ConnectionPool {
    private final Semaphore semaphore;
    private final BlockingQueue<Connection> pool;

    ConnectionPool(int maxConnections) {
        // Fair semaphore for connection pools
        this.semaphore = new Semaphore(maxConnections, true);
        this.pool = new LinkedBlockingQueue<>();

        // Pre-create connections
        for (int i = 0; i < maxConnections; i++) {
            pool.add(createConnection());
        }
    }

    Connection getConnection() throws InterruptedException {
        semaphore.acquire();  // Wait for permit
        return pool.poll();   // Get connection from pool
    }

    void releaseConnection(Connection conn) {
        pool.offer(conn);      // Return to pool
        semaphore.release();   // Release permit
    }
}`
        },
        {
          name: 'Timeout Support',
          explanation: `Production connection pools need timeout support to prevent indefinite blocking:

- tryAcquire(timeout, unit) waits up to timeout
- Throws exception or returns null on timeout
- Allows application to handle pool exhaustion gracefully
- Essential for maintaining responsiveness under load`,
          codeExample: `// Connection pool with timeout
class ConnectionPool {
    private final Semaphore semaphore;
    private final BlockingQueue<Connection> pool;
    private final long defaultTimeout;
    private final TimeUnit timeUnit;

    ConnectionPool(int max, long timeout, TimeUnit unit) {
        this.semaphore = new Semaphore(max, true);
        this.pool = new LinkedBlockingQueue<>();
        this.defaultTimeout = timeout;
        this.timeUnit = unit;

        for (int i = 0; i < max; i++) {
            pool.add(createConnection());
        }
    }

    Connection getConnection(long timeout, TimeUnit unit)
            throws InterruptedException, TimeoutException {
        if (semaphore.tryAcquire(timeout, unit)) {
            Connection conn = pool.poll();
            if (conn != null) return conn;
            // Edge case: permit but no connection
            semaphore.release();
        }
        throw new TimeoutException("No connection available");
    }

    void releaseConnection(Connection conn) {
        if (conn != null) {
            pool.offer(conn);
        }
        semaphore.release();
    }
}

// Usage with timeout
try {
    Connection conn = pool.getConnection(5, TimeUnit.SECONDS);
    try {
        // Use connection
    } finally {
        pool.releaseConnection(conn);
    }
} catch (TimeoutException e) {
    // Handle - maybe return error to client
    log.warn("Connection pool exhausted");
}`
        },
        {
          name: 'Production Features',
          explanation: `Production-ready connection pools need additional features:

- Health checking of connections
- Automatic connection recreation
- Metrics and monitoring
- Graceful shutdown
- Connection validation before use`,
          codeExample: `// Production-ready connection pool
class ProductionPool {
    private final Semaphore semaphore;
    private final BlockingQueue<PooledConnection> pool;
    private final AtomicBoolean shutdown = new AtomicBoolean();

    Connection getConnection(long timeout, TimeUnit unit)
            throws Exception {
        if (shutdown.get()) {
            throw new IllegalStateException("Pool is shut down");
        }

        if (!semaphore.tryAcquire(timeout, unit)) {
            metrics.incrementTimeouts();
            throw new TimeoutException("Pool exhausted");
        }

        try {
            PooledConnection conn = pool.poll();

            // Validate connection
            if (conn == null || !conn.isValid()) {
                conn = createNewConnection();
            }

            metrics.incrementAcquired();
            return conn;
        } catch (Exception e) {
            semaphore.release();
            throw e;
        }
    }

    void shutdown() {
        shutdown.set(true);
        // Drain permits to prevent new acquisitions
        semaphore.drainPermits();
        // Close all connections
        pool.forEach(Connection::close);
    }
}`
        }
      ]
    },
    {
      id: 'rate-limiting',
      name: 'Rate Limiting',
      icon: '⏱️',
      color: '#f59e0b',
      description: 'Implementing rate limiters with Semaphore and scheduled permit replenishment.',
      diagram: RateLimitDiagram,
      details: [
        {
          name: 'Simple Rate Limiter',
          diagram: RateLimitDiagram,
          explanation: `Semaphore can implement simple rate limiting:

- N permits = N operations per time window
- Scheduled task replenishes permits periodically
- acquire() rate-limits access
- Good for simple use cases

Note: For production, consider Guava RateLimiter or Resilience4j for smoother rate limiting.`,
          codeExample: `// Simple rate limiter
class RateLimiter {
    private final Semaphore semaphore;
    private final int permitsPerSecond;
    private final ScheduledExecutorService scheduler;

    RateLimiter(int permitsPerSecond) {
        this.permitsPerSecond = permitsPerSecond;
        // Start with 0 permits
        this.semaphore = new Semaphore(0);
        this.scheduler = Executors.newScheduledThreadPool(1);

        // Replenish permits every second
        scheduler.scheduleAtFixedRate(() -> {
            int current = semaphore.availablePermits();
            int toAdd = permitsPerSecond - current;
            if (toAdd > 0) {
                semaphore.release(toAdd);
            }
        }, 0, 1, TimeUnit.SECONDS);
    }

    void acquire() throws InterruptedException {
        semaphore.acquire();
    }

    boolean tryAcquire() {
        return semaphore.tryAcquire();
    }
}

// Usage
RateLimiter limiter = new RateLimiter(100);  // 100/sec

for (int i = 0; i < 1000; i++) {
    limiter.acquire();  // Rate limited
    makeApiCall();
}`
        },
        {
          name: 'Bounded Semaphore',
          explanation: `Standard Semaphore allows permits to exceed initial count. A bounded semaphore prevents this:

- Tracks maximum permits
- release() only adds permit if below max
- Useful when release without acquire could occur
- Prevents permit count from growing unbounded`,
          codeExample: `// Bounded semaphore (cannot exceed initial)
class BoundedSemaphore {
    private final Semaphore semaphore;
    private final int maxPermits;

    BoundedSemaphore(int permits) {
        this.semaphore = new Semaphore(permits);
        this.maxPermits = permits;
    }

    void acquire() throws InterruptedException {
        semaphore.acquire();
    }

    boolean tryAcquire() {
        return semaphore.tryAcquire();
    }

    synchronized void release() {
        if (semaphore.availablePermits() < maxPermits) {
            semaphore.release();
        }
        // else: silently ignore over-release
    }
}

// Problem with unbounded:
Semaphore sem = new Semaphore(3);
sem.release();  // Now 4 permits!
sem.release();  // Now 5 permits!
// Keeps growing...

// With bounded:
BoundedSemaphore bounded = new BoundedSemaphore(3);
bounded.release();  // Still 3 permits
bounded.release();  // Still 3 permits`
        },
        {
          name: 'Production Alternatives',
          explanation: `For production rate limiting, consider these alternatives:

- Guava RateLimiter: Token bucket algorithm, smooth rate
- Resilience4j: Circuit breaker + rate limiter
- Redis-based: Distributed rate limiting
- Bucket4j: Java rate limiting library

Semaphore-based rate limiting is good for simple cases but lacks smooth distribution of permits over time.`,
          codeExample: `// Production alternatives

// Guava RateLimiter (token bucket, smoother)
import com.google.common.util.concurrent.RateLimiter;

RateLimiter limiter = RateLimiter.create(100.0); // 100/sec

void makeRequest() {
    limiter.acquire();  // Blocks until permit
    doRequest();
}

// Resilience4j
RateLimiterConfig config = RateLimiterConfig.custom()
    .limitRefreshPeriod(Duration.ofSeconds(1))
    .limitForPeriod(100)
    .timeoutDuration(Duration.ofMillis(500))
    .build();

io.github.resilience4j.ratelimiter.RateLimiter rateLimiter =
    RateLimiter.of("api", config);

Supplier<String> decorated = RateLimiter
    .decorateSupplier(rateLimiter, this::doRequest);

// Redis-based (distributed)
// Using Redisson or similar
RRateLimiter limiter = redisson.getRateLimiter("myLimiter");
limiter.trySetRate(RateType.PER_CLIENT, 100, 1, RateIntervalUnit.SECONDS);
limiter.acquire();`
        }
      ]
    },
    {
      id: 'binary-vs-mutex',
      name: 'Binary Semaphore vs Mutex',
      icon: '🔐',
      color: '#8b5cf6',
      description: 'Key differences between binary semaphore (permits=1) and ReentrantLock.',
      diagram: BinaryVsMutexDiagram,
      details: [
        {
          name: 'Key Differences',
          diagram: BinaryVsMutexDiagram,
          explanation: `Binary Semaphore (permits=1) vs ReentrantLock (mutex):

Binary Semaphore:
- Not owner-based (any thread can release)
- Not reentrant (same thread acquiring twice = deadlock)
- Can be used for signaling between threads

Mutex (ReentrantLock):
- Owner-based (only owner can release)
- Reentrant (same thread can lock multiple times)
- Has Condition support for wait/notify
- For mutual exclusion only`,
          codeExample: `// Binary semaphore
Semaphore binarySem = new Semaphore(1);

// Thread 1
binarySem.acquire();
// critical section
binarySem.release();  // Any thread can release!

// Mutex
ReentrantLock mutex = new ReentrantLock();

// Thread 1
mutex.lock();
// critical section
mutex.unlock();  // Only owning thread can unlock

// Key difference: ownership
Semaphore sem = new Semaphore(1);
ReentrantLock lock = new ReentrantLock();

// This is VALID with semaphore:
new Thread(() -> {
    try { sem.acquire(); }
    catch (InterruptedException e) {}
}).start();
Thread.sleep(100);
sem.release();  // Different thread releases - OK!

// This THROWS with lock:
new Thread(() -> lock.lock()).start();
Thread.sleep(100);
lock.unlock();  // IllegalMonitorStateException!`
        },
        {
          name: 'Reentrancy',
          explanation: `Reentrancy is a critical difference:

- Semaphore is NOT reentrant: same thread acquiring twice causes deadlock
- ReentrantLock IS reentrant: same thread can lock multiple times, must unlock same number

Use ReentrantLock when you need to call methods that also acquire the same lock. Use Semaphore when you need to count resources or signal between threads.`,
          codeExample: `// Reentrancy difference

// DEADLOCK with semaphore!
Semaphore sem = new Semaphore(1);
sem.acquire();
sem.acquire();  // DEADLOCK! Thread waits for itself

// OK with ReentrantLock
ReentrantLock lock = new ReentrantLock();
lock.lock();    // hold count = 1
lock.lock();    // hold count = 2 (same thread)
lock.unlock();  // hold count = 1
lock.unlock();  // hold count = 0, released

// Why this matters - recursive methods:
class Counter {
    private final ReentrantLock lock = new ReentrantLock();
    private int count;

    void increment() {
        lock.lock();
        try {
            count++;
            if (count % 100 == 0) {
                log();  // Also needs lock - OK with reentrant
            }
        } finally {
            lock.unlock();
        }
    }

    void log() {
        lock.lock();  // Same thread, increments hold count
        try {
            System.out.println("Count: " + count);
        } finally {
            lock.unlock();
        }
    }
}`
        },
        {
          name: 'When to Use Which',
          explanation: `Choose the right synchronization primitive:

Use Semaphore when:
- Counting resources (connection pool, thread pool)
- Signaling between threads
- Limiting concurrent access to N
- Release from different thread than acquire

Use ReentrantLock/synchronized when:
- Mutual exclusion (one thread at a time)
- Need reentrant locking
- Need Condition variables (wait/notify)
- Protecting critical sections`,
          codeExample: `// When to use which

// SEMAPHORE: Resource counting
Semaphore pool = new Semaphore(10);  // 10 resources
pool.acquire();  // get resource
// use resource
pool.release();  // return resource

// SEMAPHORE: Thread signaling
Semaphore signal = new Semaphore(0);
// Thread A waits
signal.acquire();  // blocks
// Thread B signals
signal.release();  // unblocks A

// MUTEX: Mutual exclusion
ReentrantLock lock = new ReentrantLock();
lock.lock();
try {
    // only one thread here
} finally {
    lock.unlock();
}

// MUTEX: With conditions
ReentrantLock lock = new ReentrantLock();
Condition notEmpty = lock.newCondition();

lock.lock();
try {
    while (queue.isEmpty()) {
        notEmpty.await();  // wait for signal
    }
    return queue.remove();
} finally {
    lock.unlock();
}

// SUMMARY:
// Semaphore = counting, signaling
// Mutex = mutual exclusion, conditions`
        }
      ]
    },
    {
      id: 'interview',
      name: 'Interview Questions',
      icon: '💡',
      color: '#ec4899',
      description: 'Common Semaphore interview questions with detailed answers and code examples.',
      details: [
        {
          name: 'Basic Questions',
          explanation: `Common Semaphore interview questions:

Q1: What is the difference between Semaphore and Mutex?
A: Semaphore counts permits (0 to N), mutex is binary and owner-based

Q2: Can release() exceed initial permits?
A: Yes! Standard Semaphore permits can grow beyond initial count

Q3: What is the difference between fair and non-fair?
A: Fair = FIFO ordering, non-fair = threads may barge

Q4: What does acquire(n) do?
A: Acquires n permits atomically (all or none)

Q5: Are Semaphore operations thread-safe?
A: Yes, all operations are atomic (CAS-based via AQS)`,
          codeExample: `// Q1: Semaphore(1) vs Lock
Semaphore sem = new Semaphore(1);  // Not owner-based
ReentrantLock lock = new ReentrantLock();  // Owner-based

// Q2: Permits can grow
Semaphore sem = new Semaphore(3);
sem.release();  // Now 4 permits!
sem.release();  // Now 5 permits!
// No upper bound by default

// Q3: Fairness
Semaphore fair = new Semaphore(5, true);  // FIFO
Semaphore unfair = new Semaphore(5);  // May barge

// Q4: Acquire multiple
Semaphore sem = new Semaphore(5);
sem.acquire(3);  // Get 3 permits atomically
// availablePermits() = 2

// Q5: Available methods
sem.availablePermits();  // Current count
sem.drainPermits();  // Take all, return count
sem.getQueueLength();  // Waiting threads (estimate)`
        },
        {
          name: 'Common Pitfalls',
          explanation: `Common mistakes with Semaphore:

1. Forgetting to release in finally block
2. Releasing more times than acquired (permits grow)
3. Deadlock with binary semaphore (not reentrant)
4. Deadlock with multiple semaphores (lock ordering)
5. Using non-fair when fairness matters`,
          codeExample: `// Pitfall 1: Forgetting to release
// BAD:
sem.acquire();
doWork();  // Exception here = no release!
sem.release();

// GOOD:
sem.acquire();
try {
    doWork();
} finally {
    sem.release();  // Always in finally
}

// Pitfall 2: Releasing too many times
sem.acquire();
sem.release();
sem.release();  // Permits now exceeds initial!

// Pitfall 3: Binary semaphore deadlock
Semaphore sem = new Semaphore(1);
sem.acquire();
sem.acquire();  // DEADLOCK!

// Pitfall 4: Multiple semaphores deadlock
Semaphore a = new Semaphore(1);
Semaphore b = new Semaphore(1);
// Thread 1: a.acquire(); b.acquire();
// Thread 2: b.acquire(); a.acquire();
// DEADLOCK! (same as lock ordering problem)

// Pitfall 5: Wrong fairness choice
// Using non-fair for long-held resources
// can starve some threads indefinitely`
        },
        {
          name: 'Advanced Questions',
          explanation: `More advanced Semaphore questions:

Q6: How does Semaphore implement blocking?
A: Uses AQS CLH queue with park/unpark

Q7: Can you implement a mutex with Semaphore?
A: Yes, but loses reentrancy - not recommended

Q8: How to implement bounded Semaphore?
A: Track max permits, check before release

Q9: Semaphore vs CountDownLatch?
A: Semaphore is reusable, CDL is one-shot

Q10: How to implement reader-writer lock?
A: Use Semaphore(N) for readers, acquire all for writer`,
          codeExample: `// Q6: AQS blocking
// Semaphore extends AQS which uses:
// - CLH queue for waiting threads
// - LockSupport.park() to block
// - LockSupport.unpark() to wake

// Q7: Mutex with Semaphore (not recommended)
class PseudoMutex {
    private final Semaphore sem = new Semaphore(1);

    void lock() throws InterruptedException {
        sem.acquire();
    }

    void unlock() {
        sem.release();
    }
    // Problem: not reentrant, any thread can unlock
}

// Q8: Bounded Semaphore
class BoundedSemaphore {
    private final Semaphore sem;
    private final int max;

    synchronized void release() {
        if (sem.availablePermits() < max) {
            sem.release();
        }
    }
}

// Q9: Semaphore vs CountDownLatch
CountDownLatch cdl = new CountDownLatch(3);
cdl.countDown(); cdl.countDown(); cdl.countDown();
cdl.await();  // passes
// Cannot reset CDL!

Semaphore sem = new Semaphore(0);
sem.release(3);
sem.acquire(3);  // passes
sem.release(3);  // can use again!

// Q10: Reader-Writer with Semaphore
class RWLock {
    private final Semaphore sem = new Semaphore(10);

    void readLock() throws InterruptedException {
        sem.acquire(1);  // 1 permit for reader
    }

    void writeLock() throws InterruptedException {
        sem.acquire(10);  // ALL permits for writer
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
      { name: 'Projects', icon: '📁', page: 'projects' },
      { name: 'Semaphore Internals', icon: '🚦', page: 'semaphore-internals' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #312e81 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #818cf8, #6366f1)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(99, 102, 241, 0.2)',
    border: '1px solid rgba(99, 102, 241, 0.3)',
    borderRadius: '0.5rem',
    color: '#a5b4fc',
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
        <h1 style={titleStyle}>Semaphore Internals</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(99, 102, 241, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(99, 102, 241, 0.2)'
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
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={SEMAPHORE_COLORS}
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
        primaryColor={SEMAPHORE_COLORS.primary}
      />


      {/* Subtitle */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem', color: '#94a3b8', fontSize: '1.1rem' }}>
        Deep dive into Semaphore: permit-based synchronization, fair vs non-fair modes, and practical patterns.
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

      {/* Modal */}
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
              colors={SEMAPHORE_COLORS}
            />

            {/* Modal Header */}
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

            {/* Detail Content */}
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

                  {/* Detail Title */}
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

export default SemaphoreInternals
