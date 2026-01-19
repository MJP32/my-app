import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, Code, ArrowLeft, Layers, Zap, Users, Settings, AlertTriangle, Clock, PlayCircle, XCircle, Activity } from 'lucide-react';
import { KEYS } from '../../utils/keyboardNavigation.js';
import Breadcrumb from '../../components/Breadcrumb';
import { useTheme } from '../../contexts/ThemeContext';

const highlightCode = (code) => {
  code = code
    .replace(/<\s*(?:span|font)[^>]*>/gi, '')
    .replace(/<\s*\/\s*(?:span|font)\s*>/gi, '')
    .replace(/\s*(?:style|color|bgcolor)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '');

  let highlighted = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const placeholders = [];
  const store = (html) => {
    placeholders.push(html);
    return `___P${placeholders.length - 1}___`;
  };

  highlighted = highlighted.replace(/\/\*[\s\S]*?\*\//g, (m) => store(`<span class="token comment">${m}</span>`));
  highlighted = highlighted.replace(/\/\/.*$/gm, (m) => store(`<span class="token comment">${m}</span>`));
  highlighted = highlighted.replace(/"(?:\\.|[^"\\])*"/g, (m) => store(`<span class="token string">${m}</span>`));
  highlighted = highlighted.replace(/'(?:\\.|[^'\\])+'/g, (m) => store(`<span class="token char">${m}</span>`));
  highlighted = highlighted.replace(/@\w+/g, (m) => store(`<span class="token annotation">${m}</span>`));
  highlighted = highlighted.replace(/\b\d+(?:\.\d+)?\b/g, (m) => store(`<span class="token number">${m}</span>`));
  highlighted = highlighted.replace(/\b(true|false|null)\b/g, (m) => store(`<span class="token boolean">${m}</span>`));

  const keywords = 'abstract assert boolean break byte case catch char class const continue default do double else enum export extends final finally float for goto if implements import instanceof int interface long native new package private protected public return short static strictfp super switch synchronized this throw throws transient try var void volatile while';
  const kwRegex = new RegExp('\\b(' + keywords.trim().split(/\\s+/).join('|') + ')\\b', 'g');
  highlighted = highlighted.replace(kwRegex, (m) => store(`<span class="token keyword">${m}</span>`));
  highlighted = highlighted.replace(/\b([A-Z][A-Za-z0-9_]*)\b/g, (m) => store(`<span class="token class-name">${m}</span>`));
  highlighted = highlighted.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g, (m) => store(`<span class="token function">${m}</span>`));
  highlighted = highlighted.replace(/([{}()[\];,.<>+\-*/=%!:|&^~?]+)/g, (m) => `<span class="token punctuation">${m}</span>`);
  highlighted = highlighted.replace(/___P(\d+)___/g, (_, n) => placeholders[Number(n)]);

  return highlighted;
};

const ThreadPoolExecutorInternals = ({ onBack, breadcrumb }) => {
  const { colors } = useTheme();
  const [expandedSections, setExpandedSections] = useState({ 0: true });
  const backButtonRef = useRef(null);

  const toggleSection = (index) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

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
      title: 'Why ThreadPoolExecutor?',
      icon: <Zap className="w-5 h-5" />,
      content: `ThreadPoolExecutor manages a pool of worker threads to execute tasks efficiently, avoiding the overhead of creating new threads for each task.

Problems with creating threads manually:
• Thread creation is expensive (memory, OS resources)
• Too many threads = context switching overhead
• No control over resource usage
• Hard to manage thread lifecycle

ThreadPoolExecutor benefits:
• Thread reuse - workers execute multiple tasks
• Bounded thread count - prevents resource exhaustion
• Task queuing - handles bursts of tasks
• Configurable policies - rejection, thread factory, hooks
• Built-in monitoring - pool size, completed tasks, etc.

ThreadPoolExecutor is the foundation for:
• Executors.newFixedThreadPool()
• Executors.newCachedThreadPool()
• Executors.newSingleThreadExecutor()
• Executors.newScheduledThreadPool()`,
      code: `// BAD - Creating threads manually
for (int i = 0; i < 10000; i++) {
    new Thread(() -> processTask()).start();  // 10000 threads!
    // Memory exhaustion, poor performance
}

// GOOD - Using ThreadPoolExecutor
ExecutorService executor = new ThreadPoolExecutor(
    10,                      // corePoolSize
    20,                      // maximumPoolSize
    60L, TimeUnit.SECONDS,   // keepAliveTime
    new LinkedBlockingQueue<>(100)  // workQueue
);

for (int i = 0; i < 10000; i++) {
    executor.submit(() -> processTask());  // Reuses 10-20 threads
}

executor.shutdown();

// Or use factory methods
ExecutorService fixed = Executors.newFixedThreadPool(10);
ExecutorService cached = Executors.newCachedThreadPool();
ExecutorService single = Executors.newSingleThreadExecutor();`
    },
    {
      title: 'Core Parameters',
      icon: <Settings className="w-5 h-5" />,
      content: `ThreadPoolExecutor has 7 key parameters that control its behavior:

1. corePoolSize: Minimum threads kept alive (even if idle)
2. maximumPoolSize: Maximum threads allowed
3. keepAliveTime: How long excess threads wait before terminating
4. unit: Time unit for keepAliveTime
5. workQueue: Queue for holding tasks before execution
6. threadFactory: Factory for creating new threads
7. handler: Policy when queue is full and max threads reached

Task submission flow:
1. If threads < corePoolSize → create new thread
2. If threads >= corePoolSize → add to queue
3. If queue is full AND threads < maxPoolSize → create new thread
4. If queue is full AND threads >= maxPoolSize → reject task`,
      code: `public ThreadPoolExecutor(
    int corePoolSize,           // Min threads (always kept alive)
    int maximumPoolSize,        // Max threads allowed
    long keepAliveTime,         // Idle time before excess thread dies
    TimeUnit unit,              // Time unit
    BlockingQueue<Runnable> workQueue,  // Task queue
    ThreadFactory threadFactory,         // Creates threads
    RejectedExecutionHandler handler     // Rejection policy
)

// Example: Web server thread pool
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
    new ThreadPoolExecutor.CallerRunsPolicy()  // Caller runs if rejected
);

// Allow core threads to timeout too (for elasticity)
webPool.allowCoreThreadTimeOut(true);`
    },
    {
      title: 'Work Queue Types',
      icon: <Layers className="w-5 h-5" />,
      content: `The work queue choice dramatically affects ThreadPoolExecutor behavior:

1. LinkedBlockingQueue (unbounded):
   • Default for newFixedThreadPool()
   • Never creates threads beyond corePoolSize
   • Can grow infinitely → OOM risk!

2. ArrayBlockingQueue (bounded):
   • Fixed capacity
   • Enables maxPoolSize to be used
   • Provides backpressure

3. SynchronousQueue (zero capacity):
   • Default for newCachedThreadPool()
   • Direct handoff - no queuing
   • Always creates new thread if none available
   • Great for short-lived tasks

4. PriorityBlockingQueue:
   • Tasks ordered by priority
   • Good for priority-based scheduling`,
      code: `// LinkedBlockingQueue - DANGER: unbounded!
// maxPoolSize is IGNORED because queue never fills up
ExecutorService fixed = new ThreadPoolExecutor(
    10, 100,  // maxPoolSize=100 is useless!
    60L, TimeUnit.SECONDS,
    new LinkedBlockingQueue<>()  // Unbounded - tasks queue forever
);
// Tasks keep queuing, threads stay at 10, may OOM

// ArrayBlockingQueue - bounded, uses maxPoolSize
ExecutorService bounded = new ThreadPoolExecutor(
    10, 100,  // Will scale from 10 to 100
    60L, TimeUnit.SECONDS,
    new ArrayBlockingQueue<>(50)  // Only 50 tasks queued
);
// When queue fills, creates more threads up to 100

// SynchronousQueue - direct handoff, no queuing
ExecutorService cached = new ThreadPoolExecutor(
    0, Integer.MAX_VALUE,  // 0 core, unlimited max
    60L, TimeUnit.SECONDS,
    new SynchronousQueue<>()  // No queue!
);
// Every task gets a thread immediately (or blocks producer)

// What Executors factory methods actually create:
// newFixedThreadPool(n):
//   new ThreadPoolExecutor(n, n, 0L, MILLISECONDS,
//       new LinkedBlockingQueue<>());

// newCachedThreadPool():
//   new ThreadPoolExecutor(0, MAX_VALUE, 60L, SECONDS,
//       new SynchronousQueue<>());

// newSingleThreadExecutor():
//   new ThreadPoolExecutor(1, 1, 0L, MILLISECONDS,
//       new LinkedBlockingQueue<>());`
    },
    {
      title: 'Rejection Policies',
      icon: <XCircle className="w-5 h-5" />,
      content: `When the queue is full AND maximum threads are running, new tasks are rejected. Four built-in policies:

1. AbortPolicy (default):
   • Throws RejectedExecutionException
   • Caller must handle the exception

2. CallerRunsPolicy:
   • Caller's thread executes the task
   • Provides backpressure - slows down submission
   • No task is lost

3. DiscardPolicy:
   • Silently discards the task
   • Task is lost with no notification

4. DiscardOldestPolicy:
   • Discards oldest queued task
   • Retries submitting new task
   • May discard important tasks`,
      code: `// AbortPolicy (default) - throws exception
ThreadPoolExecutor pool1 = new ThreadPoolExecutor(
    1, 1, 0L, TimeUnit.SECONDS,
    new ArrayBlockingQueue<>(1),
    new ThreadPoolExecutor.AbortPolicy()
);
try {
    pool1.submit(task);
} catch (RejectedExecutionException e) {
    // Handle rejection - maybe retry later
    log.error("Task rejected!", e);
}

// CallerRunsPolicy - caller executes task (recommended!)
ThreadPoolExecutor pool2 = new ThreadPoolExecutor(
    1, 1, 0L, TimeUnit.SECONDS,
    new ArrayBlockingQueue<>(1),
    new ThreadPoolExecutor.CallerRunsPolicy()
);
// If rejected, the submitting thread runs the task
// This provides natural backpressure

// DiscardPolicy - silently drops task
ThreadPoolExecutor pool3 = new ThreadPoolExecutor(
    1, 1, 0L, TimeUnit.SECONDS,
    new ArrayBlockingQueue<>(1),
    new ThreadPoolExecutor.DiscardPolicy()
);
// Task is lost - no exception, no execution

// DiscardOldestPolicy - drops oldest, retries new
ThreadPoolExecutor pool4 = new ThreadPoolExecutor(
    1, 1, 0L, TimeUnit.SECONDS,
    new ArrayBlockingQueue<>(1),
    new ThreadPoolExecutor.DiscardOldestPolicy()
);
// Oldest task in queue is dropped, new task is queued

// Custom rejection handler
RejectedExecutionHandler customHandler = (r, executor) -> {
    // Log, persist to DB, send to another queue, etc.
    log.warn("Task rejected: " + r.toString());
    saveToDeadLetterQueue(r);
};`
    },
    {
      title: 'Internal State (ctl field)',
      icon: <Activity className="w-5 h-5" />,
      content: `ThreadPoolExecutor packs both pool state and worker count into a single AtomicInteger called 'ctl'.

ctl structure (32 bits):
• Upper 3 bits: runState (RUNNING, SHUTDOWN, STOP, TIDYING, TERMINATED)
• Lower 29 bits: workerCount (number of threads)

Pool States:
1. RUNNING: Accept new tasks, process queued tasks
2. SHUTDOWN: Don't accept new, process queued
3. STOP: Don't accept new, don't process queued, interrupt running
4. TIDYING: All tasks terminated, workerCount = 0
5. TERMINATED: terminated() hook completed

State transitions:
RUNNING → SHUTDOWN (shutdown())
RUNNING/SHUTDOWN → STOP (shutdownNow())
SHUTDOWN → TIDYING (queue and pool empty)
STOP → TIDYING (pool empty)
TIDYING → TERMINATED (terminated() completes)`,
      code: `// The ctl field packs state + count into one AtomicInteger
private final AtomicInteger ctl = new AtomicInteger(ctlOf(RUNNING, 0));

// Bit layout
private static final int COUNT_BITS = Integer.SIZE - 3;  // 29 bits
private static final int CAPACITY   = (1 << COUNT_BITS) - 1;  // ~500 million

// States stored in high 3 bits
private static final int RUNNING    = -1 << COUNT_BITS;  // 111...
private static final int SHUTDOWN   =  0 << COUNT_BITS;  // 000...
private static final int STOP       =  1 << COUNT_BITS;  // 001...
private static final int TIDYING    =  2 << COUNT_BITS;  // 010...
private static final int TERMINATED =  3 << COUNT_BITS;  // 011...

// Extract state and count from ctl
private static int runStateOf(int c)     { return c & ~CAPACITY; }
private static int workerCountOf(int c)  { return c & CAPACITY; }
private static int ctlOf(int rs, int wc) { return rs | wc; }

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
      title: 'Worker Thread Implementation',
      icon: <Users className="w-5 h-5" />,
      content: `Each thread in the pool is wrapped in a Worker object. Worker extends AbstractQueuedSynchronizer (AQS) for simple locking.

Worker responsibilities:
• Holds the actual Thread object
• Tracks the initial task (firstTask)
• Counts completed tasks
• Provides non-reentrant lock for interruption

Worker lifecycle:
1. Created with optional firstTask
2. Thread starts, runs runWorker() loop
3. Gets tasks from queue (getTask())
4. Executes task with before/afterExecute hooks
5. When getTask() returns null, worker exits
6. Worker removed from workers set`,
      code: `private final class Worker
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

    // Non-reentrant lock for interruption control
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
}

// Workers are stored in a HashSet
private final HashSet<Worker> workers = new HashSet<>();

// Main lock for workers set and other state
private final ReentrantLock mainLock = new ReentrantLock();`
    },
    {
      title: 'Task Execution Flow',
      icon: <PlayCircle className="w-5 h-5" />,
      content: `The execute() method is the entry point. Here's the complete flow:

execute() logic:
1. If workerCount < corePoolSize:
   → addWorker(task, true) - create core worker with task
2. If pool is RUNNING and queue.offer(task) succeeds:
   → Task queued, recheck state
   → If not RUNNING, remove task and reject
   → If workerCount == 0, addWorker(null, false)
3. If can't queue, try addWorker(task, false):
   → Create non-core worker
   → If fails (max reached), reject task

runWorker() loop:
1. Run firstTask if present
2. Loop: getTask() from queue
3. For each task: lock, beforeExecute, run, afterExecute, unlock
4. When getTask() returns null, exit loop
5. processWorkerExit() - cleanup`,
      code: `public void execute(Runnable command) {
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
}

final void runWorker(Worker w) {
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
                 (Thread.interrupted() && runStateAtLeast(ctl.get(), STOP)))
                && !wt.isInterrupted())
                wt.interrupt();
            try {
                beforeExecute(wt, task);  // Hook
                Throwable thrown = null;
                try {
                    task.run();  // EXECUTE THE TASK
                } catch (RuntimeException | Error x) {
                    thrown = x; throw x;
                } finally {
                    afterExecute(task, thrown);  // Hook
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
      title: 'getTask() - Worker Blocking',
      icon: <Clock className="w-5 h-5" />,
      content: `getTask() is where workers block waiting for tasks. This method controls thread lifecycle.

getTask() returns null when worker should die:
• Pool is SHUTDOWN and queue is empty
• Pool is STOP (or greater)
• Worker timed out AND (allowCoreThreadTimeOut OR workerCount > corePoolSize)

Blocking behavior:
• Core threads: block indefinitely on queue.take()
• Non-core threads: block with timeout using queue.poll(keepAliveTime)
• If allowCoreThreadTimeOut=true: all threads use timeout`,
      code: `private Runnable getTask() {
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

        try {
            // Block for task
            Runnable r = timed ?
                workQueue.poll(keepAliveTime, TimeUnit.NANOSECONDS) :  // Timeout
                workQueue.take();  // Block forever

            if (r != null)
                return r;
            timedOut = true;  // poll() returned null = timed out
        } catch (InterruptedException retry) {
            timedOut = false;
        }
    }
}

// Worker thread lifecycle:
// 1. Created → runs runWorker()
// 2. runWorker() calls getTask() in loop
// 3. getTask() blocks on queue
// 4. When task available → getTask() returns it
// 5. runWorker() executes task
// 6. Repeat from step 2
// 7. getTask() returns null → runWorker() exits
// 8. processWorkerExit() cleans up`
    },
    {
      title: 'Shutdown Mechanisms',
      icon: <XCircle className="w-5 h-5" />,
      content: `Two ways to shut down a ThreadPoolExecutor:

shutdown():
• Initiates orderly shutdown
• No new tasks accepted
• Previously submitted tasks are executed
• Threads terminate after queue is empty

shutdownNow():
• Attempts to stop all actively executing tasks
• Halts processing of waiting tasks
• Returns list of tasks that never started
• Interrupts all worker threads

Best practice:
1. Call shutdown()
2. Call awaitTermination() with timeout
3. If timeout, call shutdownNow()
4. Handle interrupted exception`,
      code: `public void shutdown() {
    final ReentrantLock mainLock = this.mainLock;
    mainLock.lock();
    try {
        checkShutdownAccess();
        advanceRunState(SHUTDOWN);  // Set state to SHUTDOWN
        interruptIdleWorkers();     // Interrupt idle workers
        onShutdown();               // Hook for ScheduledThreadPoolExecutor
    } finally {
        mainLock.unlock();
    }
    tryTerminate();
}

public List<Runnable> shutdownNow() {
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

// Recommended shutdown pattern
ExecutorService executor = Executors.newFixedThreadPool(10);
// ... submit tasks ...

executor.shutdown();  // Stop accepting new tasks
try {
    // Wait for existing tasks to complete
    if (!executor.awaitTermination(60, TimeUnit.SECONDS)) {
        executor.shutdownNow();  // Force shutdown
        // Wait again for tasks to respond to cancellation
        if (!executor.awaitTermination(60, TimeUnit.SECONDS))
            System.err.println("Pool did not terminate");
    }
} catch (InterruptedException ie) {
    executor.shutdownNow();
    Thread.currentThread().interrupt();
}`
    },
    {
      title: 'Hooks and Monitoring',
      icon: <Activity className="w-5 h-5" />,
      content: `ThreadPoolExecutor provides hooks for monitoring and customization:

Hooks (override in subclass):
• beforeExecute(Thread t, Runnable r) - Before each task
• afterExecute(Runnable r, Throwable t) - After each task
• terminated() - When pool terminates

Monitoring methods:
• getPoolSize() - Current number of threads
• getActiveCount() - Threads actively executing
• getCompletedTaskCount() - Total completed tasks
• getTaskCount() - Total scheduled tasks
• getQueue() - Access to the work queue
• getLargestPoolSize() - Peak thread count`,
      code: `// Custom ThreadPoolExecutor with hooks
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
        log.debug("Starting task: {} on thread: {}", r, t.getName());
    }

    @Override
    protected void afterExecute(Runnable r, Throwable t) {
        try {
            long elapsed = System.nanoTime() - startTime.get();
            totalTime.addAndGet(elapsed);
            taskCount.incrementAndGet();

            if (t != null) {
                log.error("Task {} failed with exception", r, t);
            } else {
                log.debug("Task {} completed in {} ms", r,
                    TimeUnit.NANOSECONDS.toMillis(elapsed));
            }
        } finally {
            super.afterExecute(r, t);
        }
    }

    @Override
    protected void terminated() {
        log.info("Pool terminated. Total tasks: {}, Avg time: {} ms",
            taskCount.get(),
            TimeUnit.NANOSECONDS.toMillis(totalTime.get() / taskCount.get()));
        super.terminated();
    }

    public double getAverageTaskTime() {
        return taskCount.get() > 0 ?
            (double) totalTime.get() / taskCount.get() : 0;
    }
}

// Monitoring a running pool
ThreadPoolExecutor pool = (ThreadPoolExecutor)
    Executors.newFixedThreadPool(10);

// Schedule periodic monitoring
ScheduledExecutorService monitor = Executors.newScheduledThreadPool(1);
monitor.scheduleAtFixedRate(() -> {
    System.out.println("Pool Size: " + pool.getPoolSize());
    System.out.println("Active: " + pool.getActiveCount());
    System.out.println("Queued: " + pool.getQueue().size());
    System.out.println("Completed: " + pool.getCompletedTaskCount());
}, 0, 1, TimeUnit.SECONDS);`
    },
    {
      title: 'Interview Questions',
      icon: <AlertTriangle className="w-5 h-5" />,
      content: `Common ThreadPoolExecutor interview questions:

Q1: What happens when you submit a task?
A: Check corePoolSize → try queue → check maxPoolSize → reject

Q2: Why prefer ThreadPoolExecutor over Executors factory methods?
A: Factory methods hide dangerous defaults (unbounded queues, unlimited threads)

Q3: What's the difference between execute() and submit()?
A: execute() takes Runnable, no return. submit() returns Future, handles exceptions.

Q4: How to handle exceptions in thread pool?
A: Use submit() + Future.get(), or override afterExecute(), or set UncaughtExceptionHandler

Q5: What is CallerRunsPolicy good for?
A: Provides backpressure - slows down task submission when pool is saturated`,
      code: `// Q6: Fixed pool vs Cached pool?
// Fixed: bounded threads, unbounded queue - for consistent load
// Cached: unbounded threads, no queue - for burst of short tasks

// Q7: Why is this dangerous?
ExecutorService pool = Executors.newFixedThreadPool(10);
// Uses LinkedBlockingQueue (unbounded) - can OOM!

// Better:
ExecutorService pool = new ThreadPoolExecutor(
    10, 10, 0L, TimeUnit.MILLISECONDS,
    new ArrayBlockingQueue<>(1000),  // Bounded!
    new ThreadPoolExecutor.CallerRunsPolicy()
);

// Q8: How to get result from execute()?
// execute() doesn't return result. Use submit() instead:
Future<String> future = executor.submit(() -> {
    return "result";
});
String result = future.get();  // Blocks until complete

// Q9: How does the pool know when a worker should die?
// getTask() returns null when:
// - Pool is SHUTDOWN and queue is empty
// - Pool is STOP
// - Worker timed out (keepAliveTime) and count > corePoolSize

// Q10: How to size a thread pool?
// CPU-bound tasks: cores + 1
int cpuPool = Runtime.getRuntime().availableProcessors() + 1;

// IO-bound tasks: cores * (1 + waitTime/computeTime)
// Example: 50ms wait, 5ms compute on 8 cores
int ioPool = 8 * (1 + 50/5);  // = 88 threads

// Or use: cores * targetUtilization * (1 + W/C)
// For 80% utilization: 8 * 0.8 * 11 = 70 threads`
    }
  ];

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ backgroundColor: colors.background }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            ref={backButtonRef}
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors"
            style={{
              backgroundColor: colors.card,
              color: colors.primary
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
{breadcrumb && <Breadcrumb breadcrumb={breadcrumb} />}
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: colors.text }}>
            ThreadPoolExecutor - Internal Workings
          </h1>
          <p className="text-lg" style={{ color: colors.textSecondary }}>
            Deep dive into Java's thread pool implementation - essential for concurrency interviews
          </p>
        </div>

        {/* Quick Facts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Core Parameters', value: '7' },
            { label: 'Pool States', value: '5' },
            { label: 'Rejection Policies', value: '4' },
            { label: 'Package', value: 'j.u.concurrent' }
          ].map((fact, i) => (
            <div
              key={i}
              className="p-4 rounded-lg text-center"
              style={{ backgroundColor: colors.card }}
            >
              <div className="text-xl font-bold" style={{ color: colors.primary }}>
                {fact.value}
              </div>
              <div className="text-sm" style={{ color: colors.textSecondary }}>
                {fact.label}
              </div>
            </div>
          ))}
        </div>

        {/* Executors Factory Methods Comparison */}
        <div className="mb-8 p-4 rounded-lg overflow-x-auto" style={{ backgroundColor: colors.card }}>
          <h3 className="text-lg font-bold mb-3" style={{ color: colors.text }}>
            Executors Factory Methods Comparison
          </h3>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                <th className="text-left p-2" style={{ color: colors.text }}>Method</th>
                <th className="text-left p-2" style={{ color: colors.text }}>Core</th>
                <th className="text-left p-2" style={{ color: colors.text }}>Max</th>
                <th className="text-left p-2" style={{ color: colors.text }}>Queue</th>
                <th className="text-left p-2" style={{ color: colors.text }}>Use Case</th>
              </tr>
            </thead>
            <tbody style={{ color: colors.textSecondary }}>
              <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                <td className="p-2 font-medium" style={{ color: colors.primary }}>newFixedThreadPool(n)</td>
                <td className="p-2">n</td>
                <td className="p-2">n</td>
                <td className="p-2 text-yellow-400">LinkedBlocking (unbounded!)</td>
                <td className="p-2">Consistent load</td>
              </tr>
              <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                <td className="p-2 font-medium" style={{ color: colors.primary }}>newCachedThreadPool()</td>
                <td className="p-2">0</td>
                <td className="p-2 text-yellow-400">MAX_VALUE</td>
                <td className="p-2">SynchronousQueue</td>
                <td className="p-2">Short-lived tasks</td>
              </tr>
              <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                <td className="p-2 font-medium" style={{ color: colors.primary }}>newSingleThreadExecutor()</td>
                <td className="p-2">1</td>
                <td className="p-2">1</td>
                <td className="p-2 text-yellow-400">LinkedBlocking (unbounded!)</td>
                <td className="p-2">Sequential tasks</td>
              </tr>
              <tr>
                <td className="p-2 font-medium" style={{ color: colors.primary }}>newScheduledThreadPool(n)</td>
                <td className="p-2">n</td>
                <td className="p-2 text-yellow-400">MAX_VALUE</td>
                <td className="p-2">DelayedWorkQueue</td>
                <td className="p-2">Scheduled tasks</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-2 text-xs" style={{ color: colors.warning || '#f59e0b' }}>
            Warning: Factory methods have dangerous defaults. Prefer explicit ThreadPoolExecutor construction.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {sections.map((section, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden"
              style={{ backgroundColor: colors.card }}
            >
              <button
                onClick={() => toggleSection(index)}
                className="w-full flex items-center gap-3 p-4 text-left transition-colors hover:opacity-80"
              >
                <span style={{ color: colors.primary }}>{section.icon}</span>
                <span className="flex-1 font-semibold" style={{ color: colors.text }}>
                  {section.title}
                </span>
                {expandedSections[index] ? (
                  <ChevronDown className="w-5 h-5" style={{ color: colors.textSecondary }} />
                ) : (
                  <ChevronRight className="w-5 h-5" style={{ color: colors.textSecondary }} />
                )}
              </button>

              {expandedSections[index] && (
                <div className="px-4 pb-4 border-t" style={{ borderColor: colors.border }}>
                  <div className="mt-4 whitespace-pre-line" style={{ color: colors.textSecondary }}>
                    {section.content}
                  </div>
                  {section.code && (
                    <pre
                      className="mt-4 p-4 rounded-lg overflow-x-auto text-sm"
                      style={{ backgroundColor: colors.background }}
                    >
                      <code
                        dangerouslySetInnerHTML={{ __html: highlightCode(section.code) }}
                        style={{ color: colors.text }}
                      />
                    </pre>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Visual Diagram */}
        <div className="mt-8 p-6 rounded-lg" style={{ backgroundColor: colors.card }}>
          <h3 className="text-xl font-bold mb-4" style={{ color: colors.text }}>
            Visual: ThreadPoolExecutor Task Flow
          </h3>
          <pre
            className="text-xs md:text-sm overflow-x-auto p-4 rounded"
            style={{ backgroundColor: colors.background, color: colors.textSecondary }}
          >
{`ThreadPoolExecutor Task Submission Flow:
═══════════════════════════════════════

                                    execute(task)
                                         │
                                         ▼
                              ┌─────────────────────┐
                              │ workerCount < core? │
                              └─────────────────────┘
                                    │         │
                                   YES        NO
                                    │         │
                                    ▼         ▼
                           ┌─────────────┐ ┌─────────────────┐
                           │ addWorker   │ │ queue.offer()   │
                           │ (core=true) │ │ succeeded?      │
                           └─────────────┘ └─────────────────┘
                                  │              │         │
                               SUCCESS          YES        NO
                                  │              │         │
                                  ▼              ▼         ▼
                              ┌──────┐    ┌──────────┐ ┌─────────────────┐
                              │ DONE │    │ Task     │ │ workerCount     │
                              └──────┘    │ Queued   │ │ < maxPoolSize?  │
                                          └──────────┘ └─────────────────┘
                                                              │         │
                                                             YES        NO
                                                              │         │
                                                              ▼         ▼
                                                      ┌─────────────┐ ┌──────────┐
                                                      │ addWorker   │ │ REJECT   │
                                                      │ (core=false)│ │ (policy) │
                                                      └─────────────┘ └──────────┘


Worker Thread Lifecycle:
════════════════════════

  ┌────────────┐
  │  Created   │ ◄── new Worker(firstTask)
  └─────┬──────┘
        │
        ▼
  ┌────────────┐
  │ runWorker()│ ◄── Main execution loop starts
  └─────┬──────┘
        │
        ▼
  ┌────────────────────────────────────────────────┐
  │                  MAIN LOOP                      │
  │  ┌──────────────────────────────────────────┐  │
  │  │         task = getTask()                 │  │
  │  │  ┌──────────────────────────────────┐    │  │
  │  │  │ Core thread: queue.take()        │    │  │◄─── Blocks here
  │  │  │ Non-core: queue.poll(keepAlive)  │    │  │     waiting for task
  │  │  └──────────────────────────────────┘    │  │
  │  └──────────────────────────────────────────┘  │
  │                      │                          │
  │              task != null?                      │
  │                │         │                      │
  │               YES        NO                     │
  │                │         │                      │
  │                ▼         └──────────────────────┼───► Worker Exit
  │  ┌──────────────────────────────────────────┐  │
  │  │ beforeExecute(thread, task)              │  │
  │  │ task.run()          ◄── EXECUTE TASK     │  │
  │  │ afterExecute(task, exception)            │  │
  │  └──────────────────────────────────────────┘  │
  │                │                                │
  │                └────────────────────────────────┘
  └────────────────────────────────────────────────┘


Pool States (stored in ctl upper 3 bits):
═════════════════════════════════════════

  RUNNING ──────► SHUTDOWN ──────► TIDYING ──────► TERMINATED
     │               │                 ▲
     │               │                 │
     └───────────► STOP ───────────────┘

  RUNNING (-1):    Accept tasks, process queue
  SHUTDOWN (0):    No new tasks, process queue
  STOP (1):        No new tasks, don't process queue, interrupt workers
  TIDYING (2):     All tasks done, workerCount = 0
  TERMINATED (3):  terminated() hook completed


ctl Field Structure (AtomicInteger):
════════════════════════════════════

  ┌───┬───┬───┬───────────────────────────────────┐
  │ R │ S │ S │         Worker Count               │
  │ U │ T │ T │         (29 bits)                  │
  │ N │ A │ A │         ~500 million max           │
  │   │ T │ T │                                    │
  │   │ E │ E │                                    │
  └───┴───┴───┴───────────────────────────────────┘
   │         │
   └────┬────┘
        │
   3 bits for state`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ThreadPoolExecutorInternals;
