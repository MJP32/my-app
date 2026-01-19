import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, ArrowLeft, Layers, Zap, GitFork, GitMerge, Shuffle, Settings } from 'lucide-react';
import { KEYS } from '../../utils/keyboardNavigation.js';
import Breadcrumb from '../../components/Breadcrumb';
import { useTheme } from '../../contexts/ThemeContext';

const highlightCode = (code) => {
  let highlighted = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const placeholders = [];
  const store = (html) => { placeholders.push(html); return `___P${placeholders.length - 1}___`; };
  highlighted = highlighted.replace(/\/\*[\s\S]*?\*\//g, (m) => store(`<span class="token comment">${m}</span>`));
  highlighted = highlighted.replace(/\/\/.*$/gm, (m) => store(`<span class="token comment">${m}</span>`));
  highlighted = highlighted.replace(/"(?:\\.|[^"\\])*"/g, (m) => store(`<span class="token string">${m}</span>`));
  highlighted = highlighted.replace(/@\w+/g, (m) => store(`<span class="token annotation">${m}</span>`));
  highlighted = highlighted.replace(/\b\d+(?:\.\d+)?\b/g, (m) => store(`<span class="token number">${m}</span>`));
  highlighted = highlighted.replace(/\b(true|false|null)\b/g, (m) => store(`<span class="token boolean">${m}</span>`));
  const keywords = 'abstract assert boolean break byte case catch char class const continue default do double else enum extends final finally float for if implements import instanceof int interface long native new package private protected public return short static super switch synchronized this throw throws transient try void volatile while var';
  highlighted = highlighted.replace(new RegExp('\\b(' + keywords.split(' ').join('|') + ')\\b', 'g'), (m) => store(`<span class="token keyword">${m}</span>`));
  highlighted = highlighted.replace(/\b([A-Z][A-Za-z0-9_]*)\b/g, (m) => store(`<span class="token class-name">${m}</span>`));
  highlighted = highlighted.replace(/\b([a-z_$][a-zA-Z0-9_$]*)\s*(?=\()/g, (m) => store(`<span class="token function">${m}</span>`));
  highlighted = highlighted.replace(/___P(\d+)___/g, (_, n) => placeholders[Number(n)]);
  return highlighted;
};

const ForkJoinPoolInternals = ({ onBack, breadcrumb }) => {
  const { colors } = useTheme();
  const [expandedSections, setExpandedSections] = useState({ 0: true });
  const backButtonRef = useRef(null);

  const toggleSection = (index) => setExpandedSections(prev => ({ ...prev, [index]: !prev[index] }));

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === KEYS.B && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const tag = e.target.tagName.toLowerCase();
        if (tag !== 'input' && tag !== 'textarea' && !e.target.isContentEditable) {
          e.preventDefault();
          onBack();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  const sections = [
    {
      title: 'Fork/Join Framework Overview',
      icon: <Zap className="w-5 h-5" />,
      content: `ForkJoinPool is designed for divide-and-conquer parallelism.

Key concepts:
• Fork: Split task into subtasks
• Join: Wait for subtasks to complete
• Work-stealing: Idle threads steal from busy threads

Components:
• ForkJoinPool: Thread pool with work-stealing
• ForkJoinTask: Base class for tasks
• RecursiveTask: Returns a result
• RecursiveAction: No return value

Advantages over ExecutorService:
• Better for recursive decomposition
• Work-stealing prevents thread starvation
• Used by parallel streams internally`,
      code: `// Basic structure
ForkJoinPool pool = ForkJoinPool.commonPool();
// Or: new ForkJoinPool(parallelism)

// RecursiveTask - returns value
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

        left.fork();           // Submit left to pool
        Long rightResult = right.compute();  // Compute right directly
        Long leftResult = left.join();       // Wait for left

        return leftResult + rightResult;
    }
}

// Usage
int[] array = new int[10000];
Arrays.fill(array, 1);
ForkJoinPool pool = ForkJoinPool.commonPool();
Long sum = pool.invoke(new SumTask(array, 0, array.length));
System.out.println(sum);  // 10000`
    },
    {
      title: 'Work-Stealing Algorithm',
      icon: <Shuffle className="w-5 h-5" />,
      content: `Work-stealing is the key innovation of ForkJoinPool.

Each worker thread has a deque (double-ended queue):
• Push/pop own tasks from tail (LIFO - like a stack)
• Steal tasks from other threads' head (FIFO)

Why this works:
• LIFO for own work: better cache locality
• FIFO for stealing: steal oldest (largest) tasks
• Balances load automatically

Stealing process:
1. Thread finishes its queue
2. Randomly picks another thread
3. Steals from head of victim's queue
4. Repeat until all queues empty`,
      code: `// Work-stealing visualization
//
// Thread 1 Queue (deque):     Thread 2 Queue:
// ┌───────────────────┐      ┌───────────────────┐
// │ Task A (oldest)   │ ←    │ Task X            │
// │ Task B            │ Steal│ Task Y            │
// │ Task C            │      │ Task Z (newest)   │
// │ Task D (newest)   │      └───────────────────┘
// └───────────────────┘              ↑
//         ↓                     Push/Pop own
//    Pop own work
//
// Thread 1: Pushes new tasks at tail, pops from tail
// Thread 2: When idle, steals from Thread 1's head

// ForkJoinPool internal structure
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
}

// Work-stealing benefits
// 1. Load balancing - idle threads help busy ones
// 2. Cache efficiency - threads work on own data first
// 3. Scalability - minimal contention between threads`
    },
    {
      title: 'Fork and Join Operations',
      icon: <GitFork className="w-5 h-5" />,
      content: `fork() and join() are the core operations.

fork():
• Submits task to current thread's queue
• Does NOT wait for completion
• Returns immediately

join():
• Waits for task to complete
• Returns result (for RecursiveTask)
• May help compute other tasks while waiting

Common pattern:
• fork() left subtask
• compute() right subtask directly
• join() left subtask

Why compute one directly?
• Avoids unnecessary task creation overhead
• Current thread stays busy`,
      code: `// Correct fork/join pattern
@Override
protected Long compute() {
    if (size <= THRESHOLD) {
        return computeDirectly();
    }

    Task left = new Task(leftHalf);
    Task right = new Task(rightHalf);

    // Pattern 1: Fork both (less efficient)
    left.fork();
    right.fork();
    return left.join() + right.join();

    // Pattern 2: Fork one, compute other (better!)
    left.fork();
    Long rightResult = right.compute();  // Use current thread
    Long leftResult = left.join();
    return leftResult + rightResult;

    // Pattern 3: invokeAll (convenient)
    invokeAll(left, right);
    return left.join() + right.join();
}

// join() behavior
// If task is done: return result immediately
// If task is in current thread's queue: pop and execute
// If task is being stolen: wait
// While waiting: help execute other tasks (work-stealing)

// ForkJoinTask states
// NORMAL    = completed normally
// CANCELLED = was cancelled
// SIGNAL    = someone is waiting for this task
// EXCEPTIONAL = completed with exception

// Example: Parallel merge sort
class MergeSortTask extends RecursiveAction {
    private final int[] array;
    private final int start, end;

    @Override
    protected void compute() {
        if (end - start <= 16) {
            Arrays.sort(array, start, end);
            return;
        }

        int mid = (start + end) / 2;
        MergeSortTask left = new MergeSortTask(array, start, mid);
        MergeSortTask right = new MergeSortTask(array, mid, end);

        invokeAll(left, right);  // Fork both, wait for both
        merge(array, start, mid, end);
    }
}`
    },
    {
      title: 'Common Pool and Configuration',
      icon: <Layers className="w-5 h-5" />,
      content: `ForkJoinPool.commonPool() is a shared pool for all parallel operations.

Common pool properties:
• Shared by parallel streams
• Default parallelism: Runtime.availableProcessors() - 1
• Lazily initialized on first use
• Cannot be shut down

Configuration options:
• -Djava.util.concurrent.ForkJoinPool.common.parallelism=N
• -Djava.util.concurrent.ForkJoinPool.common.threadFactory=class
• Custom pool for isolation`,
      code: `// Common pool
ForkJoinPool common = ForkJoinPool.commonPool();
System.out.println(common.getParallelism());  // Usually cores - 1

// Parallel streams use common pool
Arrays.asList(1, 2, 3, 4, 5)
    .parallelStream()
    .map(x -> x * 2)  // Runs in common pool
    .collect(Collectors.toList());

// Custom pool for isolation
ForkJoinPool customPool = new ForkJoinPool(4);  // 4 threads

// Submit parallel stream to custom pool
List<Integer> result = customPool.submit(() ->
    Arrays.asList(1, 2, 3, 4, 5)
        .parallelStream()
        .map(x -> x * 2)
        .collect(Collectors.toList())
).join();

// Configuration via system properties
// java -Djava.util.concurrent.ForkJoinPool.common.parallelism=8

// Or programmatically before first use
System.setProperty(
    "java.util.concurrent.ForkJoinPool.common.parallelism",
    "8"
);

// Pool statistics
ForkJoinPool pool = ForkJoinPool.commonPool();
pool.getPoolSize();        // Current number of threads
pool.getActiveThreadCount(); // Threads executing tasks
pool.getQueuedTaskCount(); // Tasks waiting in queues
pool.getStealCount();      // Total stolen tasks

// Shutdown (not for common pool!)
ForkJoinPool myPool = new ForkJoinPool(4);
myPool.shutdown();
myPool.awaitTermination(1, TimeUnit.MINUTES);`
    },
    {
      title: 'ManagedBlocker for Blocking Operations',
      icon: <GitMerge className="w-5 h-5" />,
      content: `ManagedBlocker handles blocking operations in ForkJoinPool.

Problem:
• ForkJoinPool assumes tasks don't block
• Blocking wastes threads, reduces parallelism

Solution:
• ManagedBlocker signals potential blocking
• Pool can compensate by adding threads

Use cases:
• I/O operations
• Waiting for external resources
• Synchronization with other systems`,
      code: `// ManagedBlocker interface
interface ManagedBlocker {
    boolean block() throws InterruptedException;
    boolean isReleasable();
}

// Using ManagedBlocker for blocking I/O
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
                    return true;
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
}

// How managedBlock works:
// 1. Calls isReleasable() - if true, returns immediately
// 2. If false, may create compensation thread
// 3. Calls block() to perform blocking operation
// 4. Extra thread handles work while blocked

// Phaser uses ManagedBlocker internally
Phaser phaser = new Phaser(1);
ForkJoinPool.commonPool().submit(() -> {
    phaser.arriveAndAwaitAdvance();  // Uses managedBlock
});

// CompletableFuture.join() also uses managedBlock
CompletableFuture<String> cf = CompletableFuture.supplyAsync(() -> {
    return expensiveOperation();
});
cf.join();  // Won't starve ForkJoinPool`
    },
    {
      title: 'Interview Questions',
      icon: <Settings className="w-5 h-5" />,
      content: `Common ForkJoinPool interview questions:

Q1: What is work-stealing?
A: Idle threads steal tasks from busy threads' queues

Q2: RecursiveTask vs RecursiveAction?
A: RecursiveTask returns value, RecursiveAction doesn't

Q3: When to use ForkJoinPool vs ThreadPoolExecutor?
A: ForkJoinPool for divide-and-conquer parallelism

Q4: What uses the common pool?
A: Parallel streams, CompletableFuture (default)

Q5: How to avoid blocking issues?
A: Use ManagedBlocker or custom pool`,
      code: `// Q1: Work-stealing benefit
// - Automatic load balancing
// - No central queue contention
// - Cache-friendly (own work is local)

// Q2: Task types
class MyTask extends RecursiveTask<Integer> {
    protected Integer compute() {
        return 42;  // Returns value
    }
}

class MyAction extends RecursiveAction {
    protected void compute() {
        // No return value
    }
}

// Q3: When to use which
// ForkJoinPool: Recursive tasks, parallel streams
// ThreadPoolExecutor: Independent tasks, I/O bound work

// Q4: Avoiding common pool
// Wrap parallel stream in custom pool
ForkJoinPool custom = new ForkJoinPool(4);
custom.submit(() ->
    list.parallelStream()
        .map(x -> expensiveOp(x))
        .collect(toList())
).join();

// Q5: Common pitfalls
// 1. Blocking in common pool
// BAD:
list.parallelStream()
    .map(x -> {
        Thread.sleep(1000);  // Blocks pool thread!
        return x;
    });

// GOOD: Use ManagedBlocker or async I/O

// 2. Too fine-grained tasks
// BAD: Threshold = 1 (too much overhead)
// GOOD: Threshold = 1000-10000

// 3. Forgetting to join
left.fork();
right.fork();
// Must join!
return left.join() + right.join();`
    }
  ];

  return (
    <div className={`min-h-screen ${colors.background}`}>
      <div className="max-w-6xl mx-auto p-6">
{breadcrumb && <Breadcrumb breadcrumb={breadcrumb} />}
        <div className="flex items-center gap-3 mt-4">
          <button ref={backButtonRef} onClick={onBack}
            className={`flex items-center gap-2 px-4 py-2 ${colors.buttonBg} text-white rounded-lg transition-all duration-200 hover:scale-105`}>
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
        <div className="mt-6">
          <div className="flex items-center gap-3 mb-2">
            <GitFork className={`w-8 h-8 ${colors.accent}`} />
            <h1 className={`text-3xl font-bold ${colors.heading}`}>ForkJoinPool - Internal Workings</h1>
          </div>
          <p className={`text-lg ${colors.secondary} mb-6`}>
            Deep dive into ForkJoinPool: work-stealing algorithm, fork/join operations, and parallel task execution.
          </p>

          <div className={`${colors.card} rounded-xl p-4 mb-6 border ${colors.border}`}>
            <h3 className={`font-semibold ${colors.heading} mb-2`}>Work-Stealing Architecture</h3>
            <pre className={`text-sm ${colors.secondary} font-mono whitespace-pre overflow-x-auto`}>
{`Fork/Join Framework:

  ┌─────────────────────────────────────────────────────┐
  │                   ForkJoinPool                       │
  │  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
  │  │ Worker 1 │  │ Worker 2 │  │ Worker 3 │  ...     │
  │  │  Queue   │  │  Queue   │  │  Queue   │          │
  │  │ ┌─────┐  │  │ ┌─────┐  │  │ ┌─────┐  │          │
  │  │ │Task │←─┼──┼─│     │  │  │ │Task │  │  Steal   │
  │  │ │Task │  │  │ │     │  │  │ │Task │  │          │
  │  │ │Task │  │  │ │     │  │  │ │Task │  │          │
  │  │ └─────┘  │  │ └─────┘  │  │ └─────┘  │          │
  │  └──────────┘  └──────────┘  └──────────┘          │
  └─────────────────────────────────────────────────────┘

Work-Stealing: Idle workers steal from busy workers' queues
Own work: Push/Pop from tail (LIFO)
Stealing:  Take from head (FIFO) - steals largest tasks`}
            </pre>
          </div>

          <div className="space-y-4">
            {sections.map((section, index) => (
              <div key={index} className={`${colors.card} rounded-xl border ${colors.border} overflow-hidden`}>
                <button onClick={() => toggleSection(index)}
                  className={`w-full flex items-center justify-between p-4 ${colors.cardHover} transition-colors duration-200`}>
                  <div className="flex items-center gap-3">
                    <span className={colors.accent}>{section.icon}</span>
                    <span className={`font-semibold ${colors.heading}`}>{section.title}</span>
                  </div>
                  {expandedSections[index] ? <ChevronDown className={`w-5 h-5 ${colors.secondary}`} /> : <ChevronRight className={`w-5 h-5 ${colors.secondary}`} />}
                </button>
                {expandedSections[index] && (
                  <div className="p-4 pt-0">
                    <div className={`${colors.secondary} whitespace-pre-line mb-4`}>{section.content}</div>
                    {section.code && (
                      <div className="relative">
                        <div className={`absolute top-2 right-2 text-xs px-2 py-1 rounded ${colors.tag}`}>Java</div>
                        <pre className={`${colors.codeBg} rounded-lg p-4 overflow-x-auto text-sm`}>
                          <code className="font-mono" dangerouslySetInnerHTML={{ __html: highlightCode(section.code) }} />
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForkJoinPoolInternals;
