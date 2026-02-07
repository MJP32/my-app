/**
 * ForkJoinPool Internals Page
 *
 * Deep dive into ForkJoinPool: work-stealing algorithm, fork/join operations,
 * and parallel task execution.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const FORKJOIN_COLORS = {
  primary: '#ec4899',
  primaryHover: '#f472b6',
  bg: 'rgba(236, 72, 153, 0.1)',
  border: 'rgba(236, 72, 153, 0.3)',
  arrow: '#db2777',
  hoverBg: 'rgba(236, 72, 153, 0.2)',
  topicBg: 'rgba(236, 72, 153, 0.2)'
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

const ForkJoinOverviewDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="fj-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ec4899" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Fork/Join Framework Overview
    </text>

    {/* Main Task */}
    <rect x="325" y="45" width="150" height="40" rx="6" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="400" y="70" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Main Task</text>

    {/* Fork arrows */}
    <line x1="350" y1="85" x2="200" y2="130" stroke="#ec4899" strokeWidth="2" markerEnd="url(#fj-arrow)"/>
    <line x1="450" y1="85" x2="600" y2="130" stroke="#ec4899" strokeWidth="2" markerEnd="url(#fj-arrow)"/>
    <text x="265" y="105" fill="#f472b6" fontSize="10">fork()</text>
    <text x="510" y="105" fill="#f472b6" fontSize="10">fork()</text>

    {/* Subtasks */}
    <rect x="125" y="135" width="150" height="40" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="200" y="160" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Left Subtask</text>

    <rect x="525" y="135" width="150" height="40" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="600" y="160" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Right Subtask</text>

    {/* Join arrows */}
    <line x1="200" y1="175" x2="350" y2="220" stroke="#22c55e" strokeWidth="2" markerEnd="url(#fj-arrow)"/>
    <line x1="600" y1="175" x2="450" y2="220" stroke="#22c55e" strokeWidth="2" markerEnd="url(#fj-arrow)"/>
    <text x="265" y="210" fill="#4ade80" fontSize="10">join()</text>
    <text x="510" y="210" fill="#4ade80" fontSize="10">join()</text>

    {/* Result */}
    <rect x="325" y="225" width="150" height="40" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="400" y="250" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Combined Result</text>
  </svg>
)

const WorkStealingDiagram = () => (
  <svg viewBox="0 0 800 320" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="ws-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ec4899" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Work-Stealing Algorithm
    </text>

    {/* Thread 1 Queue */}
    <rect x="80" y="50" width="200" height="200" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="180" y="75" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">Thread 1 Queue</text>

    <rect x="100" y="90" width="160" height="30" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="180" y="110" textAnchor="middle" fill="white" fontSize="10">Task A (oldest)</text>

    <rect x="100" y="125" width="160" height="30" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="180" y="145" textAnchor="middle" fill="white" fontSize="10">Task B</text>

    <rect x="100" y="160" width="160" height="30" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="180" y="180" textAnchor="middle" fill="white" fontSize="10">Task C</text>

    <rect x="100" y="195" width="160" height="30" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="180" y="215" textAnchor="middle" fill="white" fontSize="10">Task D (newest)</text>

    <text x="180" y="265" textAnchor="middle" fill="#94a3b8" fontSize="10">Push/Pop own (LIFO)</text>
    <path d="M 180 235 L 180 255" stroke="#4ade80" strokeWidth="2" markerEnd="url(#ws-arrow)"/>

    {/* Thread 2 Queue (empty) */}
    <rect x="520" y="50" width="200" height="200" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="620" y="75" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">Thread 2 Queue</text>
    <text x="620" y="150" textAnchor="middle" fill="#64748b" fontSize="11">(idle - stealing)</text>

    {/* Steal arrow */}
    <path d="M 520 105 C 420 105, 380 105, 280 105" stroke="#f59e0b" strokeWidth="3" strokeDasharray="8,4" markerEnd="url(#ws-arrow)" fill="none"/>
    <text x="400" y="85" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">STEAL from head</text>

    {/* Legend */}
    <rect x="300" y="280" width="200" height="30" rx="4" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="400" y="300" textAnchor="middle" fill="#fbbf24" fontSize="10">Steals oldest (largest) tasks</text>
  </svg>
)

const DequeDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="dq-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ec4899" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Double-Ended Queue (Deque) Structure
    </text>

    {/* Deque */}
    <rect x="150" y="60" width="500" height="60" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>

    {/* Elements */}
    <rect x="170" y="75" width="80" height="30" rx="4" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="1"/>
    <text x="210" y="95" textAnchor="middle" fill="white" fontSize="10">base (head)</text>

    <rect x="260" y="75" width="80" height="30" rx="4" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="1"/>
    <text x="300" y="95" textAnchor="middle" fill="white" fontSize="10">Task 2</text>

    <rect x="350" y="75" width="80" height="30" rx="4" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="1"/>
    <text x="390" y="95" textAnchor="middle" fill="white" fontSize="10">Task 3</text>

    <rect x="440" y="75" width="80" height="30" rx="4" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="1"/>
    <text x="480" y="95" textAnchor="middle" fill="white" fontSize="10">Task 4</text>

    <rect x="530" y="75" width="100" height="30" rx="4" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="580" y="95" textAnchor="middle" fill="white" fontSize="10">top (tail)</text>

    {/* Arrows */}
    <path d="M 210 130 L 210 150" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#dq-arrow)"/>
    <text x="210" y="175" textAnchor="middle" fill="#fbbf24" fontSize="10">Thieves steal</text>

    <path d="M 580 130 L 580 150" stroke="#4ade80" strokeWidth="2" markerEnd="url(#dq-arrow)"/>
    <text x="580" y="175" textAnchor="middle" fill="#4ade80" fontSize="10">Owner push/pop</text>
  </svg>
)

const ForkJoinPatternDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="fjp-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ec4899" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Optimal Fork/Join Pattern
    </text>

    {/* Task */}
    <rect x="325" y="45" width="150" height="35" rx="6" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="400" y="67" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">compute()</text>

    {/* Fork left */}
    <line x1="350" y1="80" x2="200" y2="115" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#fjp-arrow)"/>
    <text x="255" y="95" fill="#fbbf24" fontSize="9">left.fork()</text>

    {/* Compute right directly */}
    <line x1="450" y1="80" x2="600" y2="115" stroke="#4ade80" strokeWidth="2" markerEnd="url(#fjp-arrow)"/>
    <text x="540" y="95" fill="#4ade80" fontSize="9">right.compute()</text>

    {/* Left subtask */}
    <rect x="100" y="120" width="180" height="35" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="190" y="142" textAnchor="middle" fill="white" fontSize="10">Submitted to pool</text>

    {/* Right subtask */}
    <rect x="520" y="120" width="180" height="35" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="610" y="142" textAnchor="middle" fill="white" fontSize="10">Uses current thread</text>

    {/* Join */}
    <line x1="190" y1="155" x2="350" y2="190" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#fjp-arrow)"/>
    <text x="250" y="185" fill="#a78bfa" fontSize="9">left.join()</text>

    {/* Result */}
    <rect x="325" y="195" width="150" height="25" rx="4" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="1"/>
    <text x="400" y="212" textAnchor="middle" fill="white" fontSize="9">return left + right</text>
  </svg>
)

const CommonPoolDiagram = () => (
  <svg viewBox="0 0 800 250" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="cp-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ec4899" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Common Pool Architecture
    </text>

    {/* Common Pool */}
    <rect x="275" y="45" width="250" height="80" rx="8" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899" strokeWidth="2"/>
    <text x="400" y="70" textAnchor="middle" fill="#f472b6" fontSize="12" fontWeight="bold">ForkJoinPool.commonPool()</text>
    <text x="400" y="90" textAnchor="middle" fill="#94a3b8" fontSize="10">Parallelism: cores - 1</text>
    <text x="400" y="108" textAnchor="middle" fill="#94a3b8" fontSize="10">Shared across JVM</text>

    {/* Clients */}
    <rect x="80" y="160" width="140" height="40" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="150" y="185" textAnchor="middle" fill="white" fontSize="10">Parallel Streams</text>

    <rect x="250" y="160" width="140" height="40" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="320" y="185" textAnchor="middle" fill="white" fontSize="10">CompletableFuture</text>

    <rect x="420" y="160" width="140" height="40" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="490" y="185" textAnchor="middle" fill="white" fontSize="10">ForkJoinTask</text>

    <rect x="590" y="160" width="130" height="40" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="655" y="185" textAnchor="middle" fill="white" fontSize="10">Custom Tasks</text>

    {/* Arrows */}
    <line x1="150" y1="160" x2="320" y2="130" stroke="#ec4899" strokeWidth="2" markerEnd="url(#cp-arrow)"/>
    <line x1="320" y1="160" x2="360" y2="130" stroke="#ec4899" strokeWidth="2" markerEnd="url(#cp-arrow)"/>
    <line x1="490" y1="160" x2="440" y2="130" stroke="#ec4899" strokeWidth="2" markerEnd="url(#cp-arrow)"/>
    <line x1="655" y1="160" x2="480" y2="130" stroke="#ec4899" strokeWidth="2" markerEnd="url(#cp-arrow)"/>

    {/* Warning */}
    <text x="400" y="235" textAnchor="middle" fill="#fbbf24" fontSize="10">Use custom pool for long-running or blocking tasks!</text>
  </svg>
)

const ManagedBlockerDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="mb-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ec4899" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      ManagedBlocker Flow
    </text>

    {/* Steps */}
    <rect x="80" y="55" width="150" height="50" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="155" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">1. isReleasable()</text>
    <text x="155" y="92" textAnchor="middle" fill="#bfdbfe" fontSize="9">Check if ready</text>

    <rect x="280" y="55" width="150" height="50" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="355" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">2. Compensate</text>
    <text x="355" y="92" textAnchor="middle" fill="#fef3c7" fontSize="9">Add temp thread</text>

    <rect x="480" y="55" width="150" height="50" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="555" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">3. block()</text>
    <text x="555" y="92" textAnchor="middle" fill="#ddd6fe" fontSize="9">Perform blocking I/O</text>

    <rect x="680" y="55" width="100" height="50" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="730" y="82" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Done</text>

    {/* Arrows */}
    <line x1="230" y1="80" x2="275" y2="80" stroke="#ec4899" strokeWidth="2" markerEnd="url(#mb-arrow)"/>
    <line x1="430" y1="80" x2="475" y2="80" stroke="#ec4899" strokeWidth="2" markerEnd="url(#mb-arrow)"/>
    <line x1="630" y1="80" x2="675" y2="80" stroke="#ec4899" strokeWidth="2" markerEnd="url(#mb-arrow)"/>

    {/* Benefit */}
    <rect x="200" y="140" width="400" height="60" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="400" y="165" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Benefit: Pool maintains parallelism</text>
    <text x="400" y="185" textAnchor="middle" fill="#94a3b8" fontSize="10">Extra thread handles work while main thread blocks</text>
  </svg>
)

const TaskTypeDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      ForkJoinTask Hierarchy
    </text>

    {/* ForkJoinTask */}
    <rect x="300" y="45" width="200" height="40" rx="6" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="400" y="70" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">{`ForkJoinTask&lt;V&gt;`}</text>

    {/* Lines to children */}
    <line x1="350" y1="85" x2="200" y2="115" stroke="#64748b" strokeWidth="2"/>
    <line x1="450" y1="85" x2="600" y2="115" stroke="#64748b" strokeWidth="2"/>

    {/* RecursiveTask */}
    <rect x="100" y="115" width="200" height="50" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="200" y="137" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">{`RecursiveTask&lt;V&gt;`}</text>
    <text x="200" y="155" textAnchor="middle" fill="#bfdbfe" fontSize="9">Returns a result</text>

    {/* RecursiveAction */}
    <rect x="500" y="115" width="200" height="50" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="600" y="137" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">RecursiveAction</text>
    <text x="600" y="155" textAnchor="middle" fill="#bbf7d0" fontSize="9">No return value (void)</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function ForkJoinPoolInternals({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'framework-overview',
      name: 'Fork/Join Framework Overview',
      icon: '⚡',
      color: '#ec4899',
      description: 'ForkJoinPool is designed for divide-and-conquer parallelism. Split tasks recursively, process in parallel, and combine results.',
      diagram: ForkJoinOverviewDiagram,
      details: [
        {
          name: 'Core Concepts',
          diagram: ForkJoinOverviewDiagram,
          explanation: `Fork/Join Framework is built around divide-and-conquer parallelism:

• Fork: Split a task into smaller subtasks
• Join: Wait for subtasks to complete and combine results
• Work-stealing: Idle threads steal work from busy threads

This is different from traditional ExecutorService because it's optimized for recursive decomposition of problems.`,
          codeExample: `// Basic structure
ForkJoinPool pool = ForkJoinPool.commonPool();
// Or: new ForkJoinPool(parallelism)

// Submit a task
Long result = pool.invoke(new SumTask(array, 0, array.length));`
        },
        {
          name: 'RecursiveTask vs RecursiveAction',
          diagram: TaskTypeDiagram,
          explanation: `ForkJoinTask has two main implementations:

• RecursiveTask<V>: Returns a result of type V
  - Use for computations that produce a value
  - Example: summing array elements, merge sort result

• RecursiveAction: No return value (void)
  - Use for side-effect operations
  - Example: sorting in-place, updating counters`,
          codeExample: `// RecursiveTask - returns value
class SumTask extends RecursiveTask<Long> {
    private final int[] array;
    private final int start, end;
    private static final int THRESHOLD = 1000;

    SumTask(int[] array, int start, int end) {
        this.array = array;
        this.start = start;
        this.end = end;
    }

    @Override
    protected Long compute() {
        if (end - start <= THRESHOLD) {
            // Base case: compute directly
            long sum = 0;
            for (int i = start; i < end; i++) {
                sum += array[i];
            }
            return sum;
        }

        // Recursive case: fork subtasks
        int mid = (start + end) / 2;
        SumTask left = new SumTask(array, start, mid);
        SumTask right = new SumTask(array, mid, end);

        left.fork();                    // Submit left to pool
        Long rightResult = right.compute();  // Compute right directly
        Long leftResult = left.join();       // Wait for left

        return leftResult + rightResult;
    }
}`
        },
        {
          name: 'Advantages over ExecutorService',
          explanation: `ForkJoinPool excels at recursive decomposition:

• Better for divide-and-conquer: Designed for tasks that spawn subtasks
• Work-stealing prevents thread starvation: Idle threads help busy ones
• Used by parallel streams internally: Same pool powers Java 8+ parallel streams
• Lower overhead for fine-grained tasks: Optimized task queue implementation

When NOT to use ForkJoinPool:
• I/O-bound tasks (use regular ExecutorService)
• Tasks that don't decompose naturally
• Long-running blocking operations`,
          codeExample: `// Usage example
int[] array = new int[10000];
Arrays.fill(array, 1);

ForkJoinPool pool = ForkJoinPool.commonPool();
Long sum = pool.invoke(new SumTask(array, 0, array.length));
System.out.println(sum);  // 10000

// Compare with parallel stream (uses same pool)
long streamSum = Arrays.stream(array)
    .parallel()
    .sum();`
        }
      ]
    },
    {
      id: 'work-stealing',
      name: 'Work-Stealing Algorithm',
      icon: '🔄',
      color: '#8b5cf6',
      description: 'Work-stealing is the key innovation. Idle threads steal tasks from busy threads to balance load automatically.',
      diagram: WorkStealingDiagram,
      details: [
        {
          name: 'Deque Per Worker',
          diagram: DequeDiagram,
          explanation: `Each worker thread has a deque (double-ended queue):

• Push/pop own tasks from tail (LIFO - like a stack)
  - Better cache locality - works on recently created tasks
  - Tasks are "hot" in cache

• Steal tasks from other threads' head (FIFO)
  - Steals oldest (usually largest) tasks
  - Less contention - owner and thief work on opposite ends`,
          codeExample: `// ForkJoinPool internal structure
public class ForkJoinPool extends AbstractExecutorService {
    // Array of work queues, one per worker
    WorkQueue[] workQueues;

    // Each WorkQueue is a deque
    static final class WorkQueue {
        ForkJoinTask<?>[] array;  // The deque
        int base;   // Index for stealing (head)
        int top;    // Index for push/pop (tail)

        // Owner pushes at top (LIFO)
        final void push(ForkJoinTask<?> task) {
            // ... push at top
        }

        // Owner pops from top (LIFO)
        final ForkJoinTask<?> pop() {
            // ... pop from top
        }

        // Thieves poll from base (FIFO)
        final ForkJoinTask<?> poll() {
            // ... steal from base (uses CAS)
        }
    }
}`
        },
        {
          name: 'Stealing Process',
          diagram: WorkStealingDiagram,
          explanation: `The stealing process is designed for minimal contention:

1. Thread finishes its own queue (becomes idle)
2. Randomly picks another thread as victim
3. Steals from head (base) of victim's queue using CAS
4. Repeats until all queues are empty

Why random victim selection?
• Avoids thundering herd on busy threads
• Distributes stealing attempts evenly
• Simple and effective in practice`,
          codeExample: `// Work-stealing benefits
// 1. Load balancing - idle threads help busy ones
// 2. Cache efficiency - threads work on own data first
// 3. Scalability - minimal contention between threads

// Visualization:
//
// Thread 1 Queue (deque):     Thread 2 Queue:
// ┌───────────────────┐      ┌───────────────────┐
// │ Task A (oldest)   │ ←    │ Task X            │
// │ Task B            │ Steal│ Task Y            │
// │ Task C            │      │ Task Z (newest)   │
// │ Task D (newest)   │      └───────────────────┘
// └───────────────────┘              ↑
//         ↓                     Push/Pop own
//    Pop own work`
        },
        {
          name: 'Why LIFO for Own, FIFO for Steal',
          explanation: `The asymmetric access pattern is crucial for performance:

LIFO for owner (push/pop from tail):
• Better temporal locality - recent tasks likely in cache
• Depth-first exploration - processes subtree before siblings
• Natural recursive pattern alignment

FIFO for stealing (take from head):
• Steals oldest = usually largest tasks
• Big tasks generate more subtasks
• Reduces total number of steals needed
• Amortizes stealing overhead`,
          codeExample: `// Example: Array sum with 8 elements, threshold 2
// Initial: [1,2,3,4,5,6,7,8]

// Thread 1's perspective (LIFO):
// Queue: [sum(0,8)]
// Fork left, compute right directly
// Queue: [sum(0,4)] -> pops this next
// Very deep recursion first

// Thread 2 steals (FIFO):
// Steals sum(0,4) - a big chunk
// Now both threads have substantial work
// Less stealing needed overall`
        }
      ]
    },
    {
      id: 'fork-join-ops',
      name: 'Fork and Join Operations',
      icon: '🔀',
      color: '#22c55e',
      description: 'Fork submits tasks to the pool, Join waits for completion. Understanding the optimal pattern is key to performance.',
      diagram: ForkJoinPatternDiagram,
      details: [
        {
          name: 'fork() Operation',
          explanation: `fork() submits a task to the current thread's queue:

• Does NOT wait for completion - returns immediately
• Task is pushed to tail of current worker's deque
• Other threads can steal it from head
• Lightweight operation - just a deque push

Important: fork() is cheap, but don't over-fork!
Too many tiny tasks = overhead exceeds parallelism benefit.`,
          codeExample: `// fork() example
SumTask left = new SumTask(array, start, mid);
SumTask right = new SumTask(array, mid, end);

left.fork();  // Push to queue, return immediately
// Left task is now available for stealing

// Current thread continues working
// Other threads may steal 'left' and execute it`
        },
        {
          name: 'join() Operation',
          diagram: ForkJoinPatternDiagram,
          explanation: `join() waits for a task to complete and returns its result:

• If task is done: returns result immediately
• If task is in current thread's queue: pop and execute it directly
• If task is being executed by another thread: wait
• While waiting: may help execute other tasks (not just idle!)

The "helping" behavior is key - threads waiting on join() stay productive.`,
          codeExample: `// join() behavior scenarios
ForkJoinTask<Long> task = new SumTask(...);
task.fork();

// ... later ...
Long result = task.join();

// What happens in join():
// 1. If task completed -> return result
// 2. If task in my queue -> pop and execute myself
// 3. If task running elsewhere -> help by:
//    - Executing other tasks from my queue
//    - Stealing from other threads
// 4. Eventually task completes -> return result`
        },
        {
          name: 'Optimal Pattern',
          diagram: ForkJoinPatternDiagram,
          explanation: `The recommended fork/join pattern:

1. Fork ONE subtask (usually left)
2. Compute the OTHER subtask directly (right)
3. Join the forked subtask

Why fork one, compute other?
• Avoids creating unnecessary tasks
• Current thread stays busy (computes right)
• Left task can be stolen if another thread is idle
• No thread sits idle waiting for fork`,
          codeExample: `// Correct fork/join pattern
@Override
protected Long compute() {
    if (size <= THRESHOLD) {
        return computeDirectly();
    }

    Task left = new Task(leftHalf);
    Task right = new Task(rightHalf);

    // Pattern 1: Fork both (LESS EFFICIENT)
    left.fork();
    right.fork();
    return left.join() + right.join();

    // Pattern 2: Fork one, compute other (BETTER!)
    left.fork();
    Long rightResult = right.compute();  // Use current thread
    Long leftResult = left.join();
    return leftResult + rightResult;

    // Pattern 3: invokeAll (CONVENIENT)
    invokeAll(left, right);  // Forks both, joins both
    return left.join() + right.join();
}`
        },
        {
          name: 'Task States',
          explanation: `ForkJoinTask has internal states that control execution:

• NORMAL: Task completed successfully
• CANCELLED: Task was cancelled before/during execution
• SIGNAL: Another task is waiting for this one (join called)
• EXCEPTIONAL: Task completed with exception

Understanding states helps debug issues:
• If join() hangs: task might be blocked or deadlocked
• If result is wrong: check for exceptions (getRawResult)`,
          codeExample: `// Checking task state
ForkJoinTask<Long> task = new SumTask(...);
pool.execute(task);

// Check if done
if (task.isDone()) {
    if (task.isCompletedNormally()) {
        Long result = task.join();  // Safe to join
    } else if (task.isCompletedAbnormally()) {
        Throwable ex = task.getException();
        // Handle exception
    } else if (task.isCancelled()) {
        // Task was cancelled
    }
}

// Force cancel
boolean cancelled = task.cancel(true);

// Get result without waiting (may return null)
Long raw = task.getRawResult();`
        }
      ]
    },
    {
      id: 'common-pool',
      name: 'Common Pool and Configuration',
      icon: '⚙️',
      color: '#3b82f6',
      description: 'ForkJoinPool.commonPool() is a shared pool used by parallel streams and CompletableFuture. Learn when to use it vs custom pools.',
      diagram: CommonPoolDiagram,
      details: [
        {
          name: 'Common Pool Properties',
          diagram: CommonPoolDiagram,
          explanation: `ForkJoinPool.commonPool() is a JVM-wide shared pool:

• Shared by all parallel streams in the JVM
• Used by CompletableFuture when no executor specified
• Default parallelism: Runtime.availableProcessors() - 1
• Lazily initialized on first use
• CANNOT be shut down (ignores shutdown calls)

Benefits:
• No need to create/manage pools
• Efficient resource sharing
• Good for short CPU-bound tasks`,
          codeExample: `// Common pool
ForkJoinPool common = ForkJoinPool.commonPool();
System.out.println(common.getParallelism());  // Usually cores - 1

// Parallel streams use common pool automatically
Arrays.asList(1, 2, 3, 4, 5)
    .parallelStream()
    .map(x -> x * 2)  // Runs in common pool
    .collect(Collectors.toList());

// CompletableFuture uses common pool by default
CompletableFuture.supplyAsync(() -> {
    // Runs in common pool
    return expensiveComputation();
});`
        },
        {
          name: 'Custom Pool for Isolation',
          explanation: `Use a custom pool to isolate workloads:

When to use custom pool:
• Long-running tasks that might block common pool
• I/O-bound operations
• Tasks with different priority/characteristics
• Need to control thread count precisely

Warning: Blocking the common pool affects ALL parallel streams in your JVM!`,
          codeExample: `// Custom pool for isolation
ForkJoinPool customPool = new ForkJoinPool(4);  // 4 threads

// Submit parallel stream to custom pool
List<Integer> result = customPool.submit(() ->
    Arrays.asList(1, 2, 3, 4, 5)
        .parallelStream()
        .map(x -> x * 2)
        .collect(Collectors.toList())
).join();

// Always shutdown custom pools when done
customPool.shutdown();
customPool.awaitTermination(1, TimeUnit.MINUTES);

// Why isolate?
// - Blocking in common pool starves parallel streams
// - Long tasks hog shared resources
// - Different workloads need different parallelism`
        },
        {
          name: 'Configuration Options',
          explanation: `Configure ForkJoinPool via system properties or constructor:

System properties (set before first use):
• java.util.concurrent.ForkJoinPool.common.parallelism
• java.util.concurrent.ForkJoinPool.common.threadFactory
• java.util.concurrent.ForkJoinPool.common.exceptionHandler

Constructor parameters:
• parallelism: number of worker threads
• factory: ThreadFactory for creating workers
• handler: UncaughtExceptionHandler
• asyncMode: FIFO vs LIFO scheduling`,
          codeExample: `// Configuration via system properties
// java -Djava.util.concurrent.ForkJoinPool.common.parallelism=8

// Or programmatically BEFORE first use
System.setProperty(
    "java.util.concurrent.ForkJoinPool.common.parallelism",
    "8"
);

// Custom pool with full configuration
ForkJoinPool custom = new ForkJoinPool(
    4,                                    // parallelism
    ForkJoinPool.defaultForkJoinWorkerThreadFactory,
    null,                                 // exception handler
    false                                 // asyncMode (LIFO)
);`
        },
        {
          name: 'Pool Statistics',
          explanation: `Monitor pool health with built-in statistics:

• getPoolSize(): Current number of worker threads
• getActiveThreadCount(): Threads actively running tasks
• getQueuedTaskCount(): Tasks waiting in all queues
• getStealCount(): Total tasks stolen between threads
• getRunningThreadCount(): Threads not blocked

High steal count = good load balancing
Low active vs pool size = possible blocking`,
          codeExample: `// Pool statistics
ForkJoinPool pool = ForkJoinPool.commonPool();

// Basic stats
int poolSize = pool.getPoolSize();           // Worker threads
int active = pool.getActiveThreadCount();    // Running tasks
long queued = pool.getQueuedTaskCount();     // Waiting tasks
long steals = pool.getStealCount();          // Stolen tasks

System.out.println("Pool Size: " + poolSize);
System.out.println("Active: " + active);
System.out.println("Queued: " + queued);
System.out.println("Steals: " + steals);

// Detect problems
if (active == 0 && queued > 0) {
    System.out.println("Warning: Tasks queued but no active threads!");
    System.out.println("Possible blocking or deadlock");
}

// High steal ratio = good work distribution
double stealRatio = (double) steals / (poolSize * 1000);`
        }
      ]
    },
    {
      id: 'managed-blocker',
      name: 'ManagedBlocker for Blocking',
      icon: '🔒',
      color: '#f59e0b',
      description: 'ManagedBlocker signals potential blocking to the pool, allowing it to compensate by adding threads.',
      diagram: ManagedBlockerDiagram,
      details: [
        {
          name: 'The Blocking Problem',
          diagram: ManagedBlockerDiagram,
          explanation: `ForkJoinPool assumes tasks are CPU-bound and non-blocking:

Problem with blocking:
• Blocking wastes worker threads (they sit idle)
• Reduces effective parallelism
• Can cause thread starvation
• Common pool especially vulnerable

Examples of blocking:
• Network I/O (HTTP calls, database queries)
• File I/O (reading/writing files)
• Waiting on locks (synchronized, ReentrantLock)
• Thread.sleep() or Object.wait()`,
          codeExample: `// BAD: Blocking in ForkJoinPool
list.parallelStream()
    .map(x -> {
        Thread.sleep(1000);  // Blocks pool thread!
        return x * 2;
    });

// This can starve other parallel operations
// because common pool has limited threads`
        },
        {
          name: 'ManagedBlocker Interface',
          explanation: `ManagedBlocker tells the pool about potential blocking:

Two methods to implement:
• isReleasable(): Returns true if blocking is no longer needed
  - Called first to check if we can skip blocking
  - Called repeatedly during block()

• block(): Performs the blocking operation
  - Returns true when blocking is complete
  - Pool may spawn compensation thread before this

The pool uses these to maintain parallelism even during blocking.`,
          codeExample: `// ManagedBlocker interface
interface ManagedBlocker {
    // Returns true if no blocking is needed
    boolean isReleasable();

    // Performs the blocking operation
    // Returns true when done
    boolean block() throws InterruptedException;
}

// How the pool uses it:
// 1. Calls isReleasable() - if true, done!
// 2. If false, may create compensation thread
// 3. Calls block() to perform blocking
// 4. Compensation thread handles other work
// 5. When block() returns, original thread resumes`
        },
        {
          name: 'Implementing ManagedBlocker',
          diagram: ManagedBlockerDiagram,
          explanation: `Wrap blocking operations in ManagedBlocker:

Pattern:
1. Create result holder (array or AtomicReference)
2. Create ManagedBlocker implementation
3. Call ForkJoinPool.managedBlock(blocker)
4. Result is available after managedBlock returns

This allows the pool to spawn compensation threads to maintain throughput.`,
          codeExample: `// Using ManagedBlocker for blocking I/O
class BlockingIOTask extends RecursiveTask<String> {
    @Override
    protected String compute() {
        final String[] result = new String[1];

        try {
            ForkJoinPool.managedBlock(new ForkJoinPool.ManagedBlocker() {
                @Override
                public boolean block() throws InterruptedException {
                    // Perform blocking I/O
                    result[0] = readFromNetwork();
                    return true;  // Done blocking
                }

                @Override
                public boolean isReleasable() {
                    // Return true if result already available
                    return result[0] != null;
                }
            });
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        return result[0];
    }
}`
        },
        {
          name: 'Built-in Usage',
          explanation: `Several JDK classes use ManagedBlocker internally:

• Phaser.arriveAndAwaitAdvance() - phase synchronization
• CompletableFuture.join() - waiting for async results
• CountedCompleter - completion handling

This is why these classes work well in ForkJoinPool - they properly signal blocking.`,
          codeExample: `// Phaser uses ManagedBlocker internally
Phaser phaser = new Phaser(1);
ForkJoinPool.commonPool().submit(() -> {
    phaser.arriveAndAwaitAdvance();  // Uses managedBlock!
});

// CompletableFuture.join() also uses managedBlock
CompletableFuture<String> cf = CompletableFuture.supplyAsync(() -> {
    return expensiveOperation();
});
cf.join();  // Won't starve ForkJoinPool!

// Correct pattern for I/O in parallel streams:
// Use custom pool OR ManagedBlocker
ForkJoinPool ioPool = new ForkJoinPool(20);  // More threads for I/O
ioPool.submit(() ->
    urls.parallelStream()
        .map(url -> fetchUrl(url))  // OK - separate pool
        .collect(toList())
).join();`
        }
      ]
    },
    {
      id: 'interview-questions',
      name: 'Interview Questions',
      icon: '💡',
      color: '#06b6d4',
      description: 'Common interview questions about ForkJoinPool, work-stealing, and parallel task execution.',
      details: [
        {
          name: 'What is Work-Stealing?',
          diagram: WorkStealingDiagram,
          explanation: `Answer: Work-stealing is a load-balancing technique where idle threads steal tasks from busy threads.

Key points to mention:
• Each thread has its own deque (double-ended queue)
• Owner uses LIFO (better cache locality)
• Thief uses FIFO (steals large tasks)
• Minimizes contention (work on opposite ends)
• Automatically balances load`,
          codeExample: `// Work-stealing benefits to mention:
// 1. Automatic load balancing - no manual work distribution
// 2. Cache efficiency - threads work on own data first
// 3. Scalability - minimal contention between threads
// 4. Steals largest tasks - reduces total steal count`
        },
        {
          name: 'RecursiveTask vs RecursiveAction?',
          diagram: TaskTypeDiagram,
          explanation: `Answer: Both extend ForkJoinTask but differ in return value:

RecursiveTask<V>:
• Returns a result of type V
• Use compute() that returns V
• Example: calculating sum, finding max

RecursiveAction:
• No return value (void compute())
• For side-effect operations
• Example: sorting in place, updating counters`,
          codeExample: `// RecursiveTask - returns value
class SumTask extends RecursiveTask<Integer> {
    protected Integer compute() {
        return 42;  // Returns a value
    }
}

// RecursiveAction - no return
class SortTask extends RecursiveAction {
    protected void compute() {
        // Sorts in place, no return
    }
}

// Usage
Integer sum = pool.invoke(new SumTask());
pool.invoke(new SortTask());  // No result`
        },
        {
          name: 'ForkJoinPool vs ThreadPoolExecutor?',
          explanation: `Answer: Different use cases for different workloads:

ForkJoinPool:
• Divide-and-conquer parallelism
• Tasks that spawn subtasks recursively
• Work-stealing for load balancing
• Powers parallel streams

ThreadPoolExecutor:
• Independent, unrelated tasks
• I/O-bound work
• Fixed/cached/scheduled pools
• More configuration options`,
          codeExample: `// ForkJoinPool: Recursive tasks
class SumTask extends RecursiveTask<Long> {
    protected Long compute() {
        if (small) return directCompute();

        SumTask left = new SumTask(...);
        SumTask right = new SumTask(...);
        left.fork();
        return right.compute() + left.join();
    }
}

// ThreadPoolExecutor: Independent tasks
ExecutorService executor = Executors.newFixedThreadPool(4);
for (Request req : requests) {
    executor.submit(() -> processRequest(req));  // Independent
}`
        },
        {
          name: 'What Uses Common Pool?',
          diagram: CommonPoolDiagram,
          explanation: `Answer: Several Java APIs use the common pool by default:

• Parallel streams (Arrays.stream().parallel())
• CompletableFuture async methods (without executor)
• Arrays.parallelSort()
• Any ForkJoinTask without explicit pool

Warning: Blocking in any of these can affect ALL parallel operations in your JVM!`,
          codeExample: `// All use common pool by default:

// 1. Parallel streams
list.parallelStream()
    .map(x -> compute(x))
    .collect(toList());

// 2. CompletableFuture
CompletableFuture.supplyAsync(() -> compute());

// 3. Arrays.parallelSort
Arrays.parallelSort(array);

// Isolate with custom pool:
ForkJoinPool custom = new ForkJoinPool(4);
custom.submit(() ->
    list.parallelStream()
        .map(x -> compute(x))
        .collect(toList())
).join();`
        },
        {
          name: 'Common Pitfalls',
          explanation: `Common mistakes to avoid:

1. Blocking in common pool - starves parallel streams
2. Too fine-grained tasks - overhead exceeds benefit
3. Forgetting to join - tasks may not complete
4. Wrong fork pattern - forking both instead of fork/compute
5. Ignoring exceptions - use getException() to check`,
          codeExample: `// Pitfall 1: Blocking in common pool
// BAD:
list.parallelStream()
    .map(x -> {
        Thread.sleep(1000);  // BLOCKS pool thread!
        return x;
    });

// GOOD: Use custom pool or ManagedBlocker

// Pitfall 2: Too fine threshold
// BAD: Threshold = 1 (too much overhead)
// GOOD: Threshold = 1000-10000

// Pitfall 3: Forgetting join
left.fork();
right.fork();
// MUST join to get results!
return left.join() + right.join();

// Pitfall 4: Fork both (less efficient)
// BETTER: fork one, compute other
left.fork();
Long rightResult = right.compute();
return left.join() + rightResult;`
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
      { name: 'ForkJoinPool Internals', icon: '🔀', page: 'ForkJoinPool Internals' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #831843 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #f472b6, #ec4899)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(236, 72, 153, 0.2)',
    border: '1px solid rgba(236, 72, 153, 0.3)',
    borderRadius: '0.5rem',
    color: '#f472b6',
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
        <h1 style={titleStyle}>ForkJoinPool Internals</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(236, 72, 153, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(236, 72, 153, 0.2)'
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
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={FORKJOIN_COLORS}
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
        primaryColor={FORKJOIN_COLORS.primary}
      />


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
              onMainMenu={breadcrumb?.onMainMenu || onBack}
              colors={FORKJOIN_COLORS}
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
                  <div style={{
                    color: '#e2e8f0',
                    lineHeight: '1.8',
                    marginBottom: '1rem',
                    background: colorScheme.bg,
                    border: `1px solid ${colorScheme.border}`,
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    textAlign: 'left',
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

export default ForkJoinPoolInternals
