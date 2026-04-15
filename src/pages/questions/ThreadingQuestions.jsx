import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CompletionCheckbox from '../../components/CompletionCheckbox'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

function ThreadingQuestions({ onBack, breadcrumb, problemLimit }) {
  const [expandedQuestion, setExpandedQuestion] = useState(null)

  const renderFormattedAnswer = (text) => {
    const lines = text.split('\n')
    const colors = ['#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4']
    let colorIndex = 0
    const result = []
    let inCodeBlock = false
    let codeLines = []
    let codeLanguage = 'java'

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex]

      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true
          codeLanguage = line.trim().substring(3) || 'java'
          codeLines = []
        } else {
          inCodeBlock = false
          const codeString = codeLines.join('\n')
          result.push(
            <div key={`code-${lineIndex}`} style={{ margin: '1.5rem 0', textAlign: 'left' }}>
              <SyntaxHighlighter
                language={codeLanguage}
                style={vscDarkPlus}
                customStyle={{
                  borderRadius: '0.5rem',
                  fontSize: '0.9rem',
                  padding: '1rem',
                  textAlign: 'left',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                  backgroundColor: '#000000'
                }}
              >
                {codeString}
              </SyntaxHighlighter>
            </div>
          )
          codeLines = []
        }
        continue
      }

      if (inCodeBlock) {
        codeLines.push(line)
        continue
      }

      if (line.trim() === '') {
        result.push(<div key={lineIndex} style={{ height: '0.5rem' }}></div>)
        continue
      }

      const bulletMatch = line.match(/^(\s*)-\s+(.+)$/)
      if (bulletMatch) {
        const indentLevel = bulletMatch[1].length
        const bulletContent = bulletMatch[2]
        result.push(
          <div
            key={lineIndex}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              marginLeft: `${indentLevel * 0.5 + 1}rem`,
              marginTop: '0.5rem',
              textAlign: 'left',
              lineHeight: '1.6'
            }}
          >
            <span style={{
              color: '#3b82f6',
              marginRight: '0.5rem',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              lineHeight: '1.4'
            }}>
              &bull;
            </span>
            <span style={{ flex: 1 }}>{bulletContent}</span>
          </div>
        )
        continue
      }

      const boldMatch = line.match(/^\*\*(.+?):\*\*/)
      if (boldMatch) {
        const color = colors[colorIndex % colors.length]
        colorIndex++
        result.push(
          <div
            key={lineIndex}
            style={{
              marginTop: '1.5rem',
              marginBottom: '0.5rem',
              textAlign: 'left',
              paddingBottom: '0.25rem',
              borderBottom: `2px solid ${color}33`
            }}
          >
            <span style={{
              fontWeight: '700',
              color: color,
              fontSize: '1.1rem',
              letterSpacing: '0.02em'
            }}>
              {boldMatch[1]}:
            </span>
            {line.substring(boldMatch[0].length)}
          </div>
        )
        continue
      }

      const numberedMatch = line.match(/^\*\*(\d+\.\s+.+?):\*\*/)
      if (numberedMatch) {
        const color = colors[colorIndex % colors.length]
        colorIndex++
        result.push(
          <div
            key={lineIndex}
            style={{
              marginTop: '1.5rem',
              marginBottom: '0.5rem',
              textAlign: 'left',
              paddingBottom: '0.25rem',
              borderBottom: `2px solid ${color}33`
            }}
          >
            <span style={{
              fontWeight: '700',
              color: color,
              fontSize: '1.1rem',
              letterSpacing: '0.02em'
            }}>
              {numberedMatch[1]}:
            </span>
            {line.substring(numberedMatch[0].length)}
          </div>
        )
        continue
      }

      result.push(
        <div
          key={lineIndex}
          style={{
            textAlign: 'left',
            marginTop: '0.25rem',
            paddingLeft: '0.5rem',
            lineHeight: '1.6',
            color: '#e5e7eb'
          }}
        >
          {line}
        </div>
      )
    }

    return result
  }

  const questions = [
    {
      id: 1,
      category: 'Race Conditions & Synchronization',
      difficulty: 'Hard',
      question: 'Bank Account Transfer \u2014 Two threads simultaneously transfer money between accounts A\u2192B and B\u2192A. What can go wrong, and how do you fix it without deadlock?',
      answer: `**The Problem:** Thread 1 locks A, waits for B. Thread 2 locks B, waits for A. Classic deadlock.

\`\`\`java
// BROKEN - deadlock prone
public void transfer(Account from, Account to, int amount) {
    synchronized (from) {
        synchronized (to) {  // Thread 2 is already holding 'to'!
            from.debit(amount);
            to.credit(amount);
        }
    }
}

// FIXED - consistent lock ordering by ID
public void transfer(Account from, Account to, int amount) {
    Account first  = from.getId() < to.getId() ? from : to;
    Account second = from.getId() < to.getId() ? to : from;

    synchronized (first) {
        synchronized (second) {
            from.debit(amount);
            to.credit(amount);
        }
    }
}
\`\`\`

**Key insight:** Always acquire locks in a globally consistent order. Using a unique ID to determine ordering eliminates the circular wait condition.`
    },
    {
      id: 2,
      category: 'Race Conditions & Synchronization',
      difficulty: 'Medium',
      question: 'Singleton Pattern \u2014 A getInstance() method creates a singleton lazily. What happens if two threads call it at the same time? How does double-checked locking help, and why does volatile matter in Java?',
      answer: `**The Problem:** Two threads both see instance == null, both enter the constructor, and two objects are created.

\`\`\`java
// BROKEN - not thread safe
public static Singleton getInstance() {
    if (instance == null)           // Thread A and B both pass this
        instance = new Singleton(); // Both create an instance
    return instance;
}

// BROKEN SUBTLY - double-checked without volatile
private static Singleton instance;
public static Singleton getInstance() {
    if (instance == null) {
        synchronized (Singleton.class) {
            if (instance == null)
                instance = new Singleton(); // JVM can reorder: assign ref BEFORE constructor finishes
        }
    }
    return instance; // Thread B may see a partially constructed object!
}

// CORRECT - volatile prevents instruction reordering
private static volatile Singleton instance;
public static Singleton getInstance() {
    if (instance == null) {
        synchronized (Singleton.class) {
            if (instance == null)
                instance = new Singleton();
        }
    }
    return instance;
}

// BEST - initialization-on-demand holder (no synchronization needed)
public class Singleton {
    private Singleton() {}
    private static class Holder {
        static final Singleton INSTANCE = new Singleton(); // JVM guarantees safe publication
    }
    public static Singleton getInstance() { return Holder.INSTANCE; }
}
\`\`\`

**Why volatile matters:** Without it, the JVM can reorder instance = new Singleton() into: (1) allocate memory, (2) assign reference to instance, (3) run constructor. Thread B can see a non-null but unconstructed object.`
    },
    {
      id: 3,
      category: 'Race Conditions & Synchronization',
      difficulty: 'Medium',
      question: 'Counter Increment \u2014 Multiple threads increment a shared int counter. Why does counter++ fail even though it looks atomic? How does AtomicInteger solve this?',
      answer: `**The Problem:** counter++ compiles to three operations: READ \u2192 INCREMENT \u2192 WRITE. Two threads can interleave these steps.

Thread A: reads counter = 5
Thread B: reads counter = 5
Thread A: writes counter = 6
Thread B: writes counter = 6   \u2190 increment lost!

\`\`\`java
// BROKEN
int counter = 0;
counter++; // Not atomic!

// FIXED with AtomicInteger (lock-free, uses CPU CAS instruction)
AtomicInteger counter = new AtomicInteger(0);
counter.incrementAndGet(); // Atomic, no locks needed

// FIXED with synchronized (heavier, but needed for compound actions)
synchronized (this) { counter++; }
\`\`\`

\`\`\`python
# Python has the same problem despite the GIL for non-atomic ops
import threading
from threading import Lock

counter = 0
lock = Lock()

def increment():
    global counter
    with lock:
        counter += 1  # Now safe
\`\`\``
    },
    {
      id: 4,
      category: 'Deadlocks',
      difficulty: 'Hard',
      question: 'Dining Philosophers \u2014 Five philosophers share five chopsticks. Each picks up the left one first, then the right. When does deadlock occur, and what are three strategies to prevent it?',
      answer: `**Setup:** 5 philosophers, 5 chopsticks. Each needs 2 chopsticks to eat. Philosopher i picks up chopstick i then i+1.

**Deadlock condition:** All pick up their left chopstick simultaneously \u2014 everyone waits forever.

**Three prevention strategies:**

\`\`\`java
// Strategy 1: Break circular wait via ordering (one philosopher picks right first)
if (id == 4) {
    pickUp(rightChopstick); // Last philosopher reverses order
    pickUp(leftChopstick);
} else {
    pickUp(leftChopstick);
    pickUp(rightChopstick);
}

// Strategy 2: Resource hierarchy - always pick lower-numbered chopstick first
int first  = Math.min(left, right);
int second = Math.max(left, right);
pickUp(chopsticks[first]);
pickUp(chopsticks[second]);

// Strategy 3: Arbitrator/waiter - ask permission before picking up both
synchronized (waiter) {
    pickUp(leftChopstick);
    pickUp(rightChopstick);
}
// Only one philosopher tries to grab chopsticks at a time
\`\`\`

**The four conditions for deadlock (all must hold):** Mutual exclusion, Hold & Wait, No preemption, Circular wait. Breaking any one prevents deadlock.`
    },
    {
      id: 5,
      category: 'Deadlocks',
      difficulty: 'Medium',
      question: 'Lock Ordering \u2014 Thread 1 locks resourceA then resourceB. Thread 2 locks resourceB then resourceA. Trace the deadlock and fix it.',
      answer: `**The Problem:**
Thread 1: lock(A) \u2192 waiting for B
Thread 2: lock(B) \u2192 waiting for A
\u2191 Circular wait \u2014 deadlock!

\`\`\`java
// BROKEN
// Thread 1
synchronized (resourceA) { synchronized (resourceB) { ... } }
// Thread 2
synchronized (resourceB) { synchronized (resourceA) { ... } }

// FIXED - enforce global lock ordering everywhere
Object first  = System.identityHashCode(resourceA) < System.identityHashCode(resourceB)
                ? resourceA : resourceB;
Object second = first == resourceA ? resourceB : resourceA;
synchronized (first) { synchronized (second) { ... } }
\`\`\`

**Rule:** Every thread in the system must acquire the same set of locks in the same order.`
    },
    {
      id: 6,
      category: 'Deadlocks',
      difficulty: 'Medium',
      question: 'Database Transactions \u2014 Two transactions each hold a row lock and wait for the other\u2019s row. How do databases detect and resolve this?',
      answer: `**The Problem:**

\`\`\`sql
-- Transaction 1            -- Transaction 2
BEGIN;                       BEGIN;
UPDATE orders SET ...        UPDATE payments SET ...
WHERE id = 1;  -- locks row1  WHERE id = 2; -- locks row2
UPDATE payments SET ...      UPDATE orders SET ...
WHERE id = 2;  -- waits!     WHERE id = 1; -- waits! DEADLOCK
\`\`\`

**Detection & Resolution:**
- Databases run a wait-for graph detector periodically
- When a cycle is found, the DB picks a victim (usually the youngest/cheapest transaction) and rolls it back
- The other transaction proceeds

**Prevention strategies:**
- Always access tables/rows in consistent order
- Use SELECT ... FOR UPDATE to lock upfront
- Keep transactions short
- Use optimistic locking (version numbers) for low-contention scenarios`
    },
    {
      id: 7,
      category: 'Producer-Consumer',
      difficulty: 'Hard',
      question: 'Bounded Buffer \u2014 A producer adds items to a fixed-size queue; consumers remove them. What happens if the producer doesn\u2019t wait when full? Implement using wait()/notifyAll() or a BlockingQueue.',
      answer: `**Manual implementation with wait/notifyAll:**

\`\`\`java
// Using wait/notifyAll (manual)
class BoundedBuffer<T> {
    private final Queue<T> queue = new LinkedList<>();
    private final int capacity;

    public synchronized void put(T item) throws InterruptedException {
        while (queue.size() == capacity)
            wait(); // Release lock and sleep until notified
        queue.add(item);
        notifyAll(); // Wake up waiting consumers
    }

    public synchronized T take() throws InterruptedException {
        while (queue.isEmpty())
            wait();
        T item = queue.poll();
        notifyAll(); // Wake up waiting producers
        return item;
    }
}

// Much simpler with BlockingQueue (prefer this in production)
BlockingQueue<Task> queue = new ArrayBlockingQueue<>(100);

// Producer
queue.put(task);    // Blocks if full

// Consumer
Task t = queue.take(); // Blocks if empty
\`\`\`

\`\`\`python
# Python equivalent
from queue import Queue
import threading

q = Queue(maxsize=100)

def producer():
    while True:
        q.put(generate_item())  # Blocks if full

def consumer():
    while True:
        item = q.get()          # Blocks if empty
        process(item)
        q.task_done()
\`\`\`

**Why notifyAll() over notify()?** notify() wakes one random thread \u2014 if it\u2019s another producer (when you need a consumer), you get a livelock. notifyAll() is safer.`
    },
    {
      id: 8,
      category: 'Producer-Consumer',
      difficulty: 'Medium',
      question: 'Task Scheduler \u2014 A thread pool of 5 workers pulls tasks from a shared queue. How do you safely shut down without losing in-flight tasks?',
      answer: `**Graceful shutdown pattern:**

\`\`\`java
ExecutorService pool = Executors.newFixedThreadPool(5);

// Submit tasks
for (Task t : tasks) pool.submit(t);

// GRACEFUL shutdown
pool.shutdown();                          // Stop accepting new tasks
pool.awaitTermination(30, TimeUnit.SECONDS); // Wait for in-flight tasks

// FORCEFUL shutdown (if graceful times out)
if (!pool.isTerminated()) {
    List<Runnable> abandoned = pool.shutdownNow(); // Interrupt workers
    log.warn("Abandoned tasks: " + abandoned.size());
}
\`\`\`

**Key distinction:**
- shutdown() \u2014 drains the queue, finishes running tasks, then terminates
- shutdownNow() \u2014 sends interrupt signals, returns unstarted tasks, may abandon in-flight work`
    },
    {
      id: 9,
      category: 'Producer-Consumer',
      difficulty: 'Medium',
      question: 'Read-Write Lock \u2014 A config object is read frequently but written rarely. Why is a plain synchronized method wasteful here, and how does ReadWriteLock improve throughput?',
      answer: `**The Problem:** synchronized allows only one thread at a time \u2014 even concurrent reads block each other, which is wasteful since reads don\u2019t conflict.

\`\`\`java
// SLOW - readers block each other unnecessarily
public synchronized Config getConfig() { return config; }

// FAST - multiple readers allowed simultaneously
private final ReadWriteLock rwLock = new ReentrantReadWriteLock();
private final Lock readLock  = rwLock.readLock();
private final Lock writeLock = rwLock.writeLock();

public Config getConfig() {
    readLock.lock();
    try { return config; }
    finally { readLock.unlock(); }
}

public void updateConfig(Config newConfig) {
    writeLock.lock(); // Exclusive - blocks all readers and writers
    try { this.config = newConfig; }
    finally { writeLock.unlock(); }
}
\`\`\`

**Tradeoff:** ReadWriteLock has higher overhead per operation. It\u2019s only faster when reads heavily outnumber writes (e.g., 95%+ reads).`
    },
    {
      id: 10,
      category: 'Visibility & Ordering',
      difficulty: 'Medium',
      question: 'Stale Cache Flag \u2014 A boolean running = true flag is checked in a loop by one thread and set to false by another. The loop never exits. Why? How does volatile fix it?',
      answer: `**The Problem:** JVM caches the variable in a CPU register for the loop thread.

\`\`\`java
// BROKEN - JVM caches 'running' in a CPU register for the loop thread
boolean running = true;

// Thread A (loop)          // Thread B
while (running) { ... }    running = false; // Thread A never sees this!

// FIXED
volatile boolean running = true;
// volatile forces: every read goes to main memory, every write flushes to main memory
\`\`\`

\`\`\`python
# Python doesn't have volatile, but the GIL generally ensures visibility
# Use threading.Event for flag-based coordination instead
import threading

stop_event = threading.Event()

def worker():
    while not stop_event.is_set():
        do_work()

def stopper():
    stop_event.set()  # Thread-safe, visible to all threads
\`\`\``
    },
    {
      id: 11,
      category: 'Visibility & Ordering',
      difficulty: 'Hard',
      question: 'Lazy Initialization \u2014 Without volatile, can a thread see a partially constructed object from double-checked locking? Why does the JVM\u2019s memory model allow this?',
      answer: `**The Problem:** The JVM memory model allows reordering of instructions as long as the result is correct within a single thread.

The statement instance = new Singleton() can be reordered to:

**1. Allocate memory for Singleton:**
**2. Assign memory address to instance:** \u2190 another thread can see non-null here
**3. Run Singleton() constructor:** \u2190 but fields aren\u2019t initialized yet!

Thread B calls getInstance(), sees instance != null, and uses an object with uninitialized fields \u2014 a silent, hard-to-reproduce bug.

**The Fix:** volatile prevents this by establishing a happens-before relationship: the constructor must fully complete before the reference is written to instance.`
    },
    {
      id: 12,
      category: 'Thread Pools & Performance',
      difficulty: 'Medium',
      question: 'Thread Pool Sizing \u2014 When should you use a large thread pool vs. a small one? How does CPU-bound work differ from I/O-bound work in this decision?',
      answer: `**Sizing rules:**
- CPU-bound: N + 1 (N = CPU cores) \u2014 more threads just cause context switching
- I/O-bound: N * (1 + wait_time / cpu_time) \u2014 threads sleep during I/O, so more can run
- Mixed: profile and tune \u2014 depends on ratio

\`\`\`java
int cores = Runtime.getRuntime().availableProcessors();

// CPU-bound (e.g., image processing, encryption)
ExecutorService cpuPool = Executors.newFixedThreadPool(cores + 1);

// I/O-bound (e.g., DB calls, HTTP requests)
ExecutorService ioPool = Executors.newFixedThreadPool(cores * 20); // tune empirically

// Better: Use virtual threads in Java 21+ for I/O-bound work
ExecutorService virtualPool = Executors.newVirtualThreadPerTaskExecutor();
\`\`\`

\`\`\`python
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor

# I/O-bound
with ThreadPoolExecutor(max_workers=50) as pool:
    results = pool.map(fetch_url, urls)

# CPU-bound (bypasses GIL)
with ProcessPoolExecutor(max_workers=os.cpu_count()) as pool:
    results = pool.map(compute_heavy, data)
\`\`\``
    },
    {
      id: 13,
      category: 'Thread Pools & Performance',
      difficulty: 'Hard',
      question: 'Fork/Join \u2014 You need to merge-sort a list of 1 million items in parallel. How would you use Java\u2019s ForkJoinPool or Python\u2019s concurrent.futures to split and merge the work?',
      answer: `**Java Fork/Join pattern:**

\`\`\`java
class MergeSortTask extends RecursiveAction {
    private int[] arr;
    private int lo, hi;
    static final int THRESHOLD = 10_000;

    protected void compute() {
        if (hi - lo < THRESHOLD) {
            Arrays.sort(arr, lo, hi); // Small enough - do it directly
            return;
        }
        int mid = (lo + hi) / 2;
        MergeSortTask left  = new MergeSortTask(arr, lo, mid);
        MergeSortTask right = new MergeSortTask(arr, mid, hi);

        invokeAll(left, right); // Fork both, join when done
        merge(arr, lo, mid, hi);
    }
}

ForkJoinPool pool = new ForkJoinPool();
pool.invoke(new MergeSortTask(array, 0, array.length));
\`\`\`

\`\`\`python
from concurrent.futures import ProcessPoolExecutor

def parallel_merge_sort(arr):
    if len(arr) <= 10_000:
        return sorted(arr)
    mid = len(arr) // 2
    with ProcessPoolExecutor(max_workers=2) as ex:
        left  = ex.submit(parallel_merge_sort, arr[:mid])
        right = ex.submit(parallel_merge_sort, arr[mid:])
        return merge(left.result(), right.result())
\`\`\`

**Key principle:** Split until subproblem is small enough for direct solution (the threshold). Too small \u2192 overhead dominates. Too large \u2192 poor parallelism.`
    },
    {
      id: 14,
      category: 'Thread Pools & Performance',
      difficulty: 'Hard',
      question: 'Thundering Herd \u2014 A cache expires and 500 threads simultaneously try to recompute the same value. How do you prevent this?',
      answer: `**The Problem:** All threads miss cache at the same moment and do redundant expensive work.

\`\`\`java
// BROKEN - 500 threads recompute simultaneously when cache expires
String value = cache.get(key);
if (value == null) {
    value = expensiveCompute(key); // All 500 threads do this at once!
    cache.put(key, value);
}

// FIXED with computeIfAbsent (atomic check-then-act)
ConcurrentHashMap<String, String> cache = new ConcurrentHashMap<>();
String value = cache.computeIfAbsent(key, k -> expensiveCompute(k));
// Only ONE thread computes - others block and receive the result

// For distributed caches: probabilistic early expiration
// Recompute slightly before expiry based on compute time x random factor
// Prevents synchronized expiry across many nodes
\`\`\``
    },
    {
      id: 15,
      category: 'Python-Specific',
      difficulty: 'Medium',
      question: 'GIL Limitations \u2014 You write a multithreaded Python app to speed up a CPU-heavy computation, but it\u2019s no faster. Why does the GIL cause this, and when should you use multiprocessing instead?',
      answer: `**The Problem:** Python\u2019s Global Interpreter Lock (GIL) allows only one thread to execute Python bytecode at a time, even on multi-core machines.

**Why threading fails for CPU-bound work:**
- The GIL serializes all CPU-bound threads onto a single core
- Context switching between threads adds overhead with no parallelism benefit
- Result: multithreaded CPU-bound code can be slower than single-threaded

**When threading still works:**
- I/O-bound tasks (network, disk) \u2014 the GIL is released during I/O waits
- Calling C extensions (NumPy, etc.) \u2014 many release the GIL internally

\`\`\`python
import time
from threading import Thread
from multiprocessing import Process

def cpu_heavy(n):
    total = 0
    for i in range(n):
        total += i * i
    return total

# SLOW - threads don't parallelize CPU work due to GIL
threads = [Thread(target=cpu_heavy, args=(10_000_000,)) for _ in range(4)]
for t in threads: t.start()
for t in threads: t.join()

# FAST - processes bypass the GIL entirely
from concurrent.futures import ProcessPoolExecutor
with ProcessPoolExecutor(max_workers=4) as pool:
    results = list(pool.map(cpu_heavy, [10_000_000] * 4))
\`\`\`

**Rule of thumb:** Use threading for I/O-bound work, multiprocessing for CPU-bound work in Python.`
    },
    {
      id: 16,
      category: 'Python-Specific',
      difficulty: 'Medium',
      question: 'asyncio vs. threads \u2014 When would you choose asyncio over threading in Python for a high-concurrency web scraper?',
      answer: `**Choose asyncio when:**
- You have thousands of concurrent I/O operations (HTTP requests, DB queries)
- You need lightweight concurrency \u2014 coroutines use ~1KB vs ~8MB per thread
- You want cooperative scheduling with no race conditions on shared state

**Choose threading when:**
- You\u2019re calling blocking libraries that don\u2019t support async
- You need true parallelism for CPU work (combined with multiprocessing)
- The codebase is already synchronous and hard to migrate

\`\`\`python
# THREADING approach - works but heavy at scale
import requests
from concurrent.futures import ThreadPoolExecutor

def fetch(url):
    return requests.get(url).text

with ThreadPoolExecutor(max_workers=50) as pool:
    results = list(pool.map(fetch, urls))  # 50 OS threads

# ASYNCIO approach - lightweight, handles thousands of connections
import aiohttp
import asyncio

async def fetch(session, url):
    async with session.get(url) as resp:
        return await resp.text()

async def main():
    async with aiohttp.ClientSession() as session:
        tasks = [fetch(session, url) for url in urls]
        results = await asyncio.gather(*tasks)  # Single thread, thousands of coroutines

asyncio.run(main())
\`\`\`

**Key tradeoff:** asyncio is more efficient at high concurrency but requires all libraries in the call chain to be async-compatible. Threading works with any library but consumes more memory and OS resources.`
    },
    {
      id: 17,
      category: 'Coordination Primitives',
      difficulty: 'Hard',
      question: 'Microservice Health Gate \u2014 Your application depends on 5 microservices. All 5 must report healthy before the app starts accepting traffic. How do you coordinate this with CountDownLatch, and how is CyclicBarrier different?',
      answer: `**CountDownLatch \u2014 one-shot gate:**

\`\`\`java
CountDownLatch allHealthy = new CountDownLatch(5);

// Each health checker runs in its own thread
for (String service : services) {
    executor.submit(() -> {
        while (!checkHealth(service)) {
            Thread.sleep(1000); // Retry
        }
        allHealthy.countDown(); // Signal this service is ready
    });
}

// Main thread blocks until all 5 services report healthy
allHealthy.await(60, TimeUnit.SECONDS);
startAcceptingTraffic();
\`\`\`

**CyclicBarrier \u2014 reusable rendezvous point:**

\`\`\`java
// All threads must arrive before ANY can proceed - and it resets
CyclicBarrier barrier = new CyclicBarrier(5, () -> {
    System.out.println("All threads reached checkpoint, proceeding...");
});

// Each thread calls barrier.await() at the sync point
barrier.await(); // Blocks until all 5 arrive, then releases everyone
// Can be used again for the next phase!
\`\`\`

**Key differences:**
- CountDownLatch: one-time use, count goes to zero and stays there. Waiting threads are separate from counting threads
- CyclicBarrier: reusable, all participating threads both wait AND signal. Resets after each use
- CountDownLatch: N threads signal, M threads wait. CyclicBarrier: all N threads both signal and wait`
    },
    {
      id: 18,
      category: 'Coordination Primitives',
      difficulty: 'Medium',
      question: 'API Rate Limiter \u2014 Your service is allowed 10 concurrent requests to a downstream API. Thread 11 must block until a slot frees up. How do you implement this with a Semaphore?',
      answer: `**Semaphore as a concurrency limiter:**

\`\`\`java
Semaphore permits = new Semaphore(10); // 10 concurrent slots

public Response callDownstreamAPI(Request req) throws InterruptedException {
    permits.acquire(); // Blocks if all 10 slots are taken
    try {
        return httpClient.send(req); // Only 10 threads can be here at once
    } finally {
        permits.release(); // Free the slot for the next waiting thread
    }
}
\`\`\`

**Why not just use a thread pool of 10?**
- A Semaphore limits concurrency without limiting the total number of threads
- Your service might have 100 threads handling requests, but only 10 are allowed to hit the downstream API concurrently
- Other threads can do pre-processing, logging, caching checks, etc. while waiting

**Timed variant \u2014 fail fast instead of blocking forever:**

\`\`\`java
if (permits.tryAcquire(2, TimeUnit.SECONDS)) {
    try {
        return httpClient.send(req);
    } finally {
        permits.release();
    }
} else {
    throw new RateLimitedException("Downstream API busy, try again later");
}
\`\`\`

\`\`\`python
import asyncio

# Python asyncio equivalent
semaphore = asyncio.Semaphore(10)

async def call_api(session, url):
    async with semaphore:  # Limits to 10 concurrent
        async with session.get(url) as resp:
            return await resp.json()
\`\`\``
    },
    {
      id: 19,
      category: 'Coordination Primitives',
      difficulty: 'Hard',
      question: 'Async Order Pipeline \u2014 An e-commerce order goes through: validate \u2192 charge payment \u2192 reserve inventory \u2192 send confirmation email. Each step is an async API call. How do you chain them with CompletableFuture and handle partial failures?',
      answer: `**Chained async pipeline:**

\`\`\`java
CompletableFuture<OrderResult> processOrder(Order order) {
    return CompletableFuture
        .supplyAsync(() -> validateOrder(order))          // Step 1
        .thenApplyAsync(validated -> chargePayment(validated))  // Step 2
        .thenApplyAsync(charged -> reserveInventory(charged))   // Step 3
        .thenApplyAsync(reserved -> sendConfirmation(reserved)) // Step 4
        .exceptionally(ex -> {
            log.error("Order failed at: " + ex.getMessage());
            compensate(order, ex); // Rollback completed steps
            return OrderResult.failed(ex);
        });
}
\`\`\`

**Handling partial failures with compensation:**

\`\`\`java
CompletableFuture<OrderResult> processOrderSafe(Order order) {
    return CompletableFuture
        .supplyAsync(() -> validateOrder(order))
        .thenComposeAsync(validated ->
            chargePayment(validated)
                .thenComposeAsync(charged ->
                    reserveInventory(charged)
                        .exceptionally(ex -> {
                            refundPayment(charged); // Compensate step 2
                            throw new CompletionException(ex);
                        })
                )
                .thenApplyAsync(reserved -> sendConfirmation(reserved))
        );
}
\`\`\`

**Fan-out / fan-in \u2014 parallel independent checks:**

\`\`\`java
CompletableFuture<Void> allChecks = CompletableFuture.allOf(
    CompletableFuture.runAsync(() -> checkFraud(order)),
    CompletableFuture.runAsync(() -> checkInventory(order)),
    CompletableFuture.runAsync(() -> checkCredit(order))
);
allChecks.join(); // Wait for ALL to complete, then proceed
\`\`\`

**Key insight:** Use thenApplyAsync for linear chains, allOf for fan-out, and exceptionally/handle at each stage for fine-grained rollback.`
    },
    {
      id: 20,
      category: 'Real-World Scenarios',
      difficulty: 'Medium',
      question: 'Request Context Leaking \u2014 Your web app stores the current user in a ThreadLocal. After deploying to a thread pool, User A occasionally sees User B\u2019s data. What went wrong?',
      answer: `**The Problem:** Thread pools reuse threads. A ThreadLocal set during Request A persists when the same thread handles Request B.

\`\`\`java
// BROKEN - ThreadLocal leaks across requests in a thread pool
private static final ThreadLocal<User> currentUser = new ThreadLocal<>();

public void handleRequest(Request req) {
    currentUser.set(req.getUser());
    // ... process request ...
    // Forgot to clean up! Next request on this thread sees stale user
}

// FIXED - always clean up in a finally block
public void handleRequest(Request req) {
    currentUser.set(req.getUser());
    try {
        processRequest(req);
    } finally {
        currentUser.remove(); // CRITICAL - prevent leaking to next request
    }
}
\`\`\`

**Even better \u2014 use framework support:**

\`\`\`java
// Spring's RequestContextHolder does this automatically
// Servlet filters can wrap the lifecycle

public class ContextCleanupFilter implements Filter {
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        try {
            UserContext.set(extractUser(req));
            chain.doFilter(req, res);
        } finally {
            UserContext.clear(); // Guaranteed cleanup
        }
    }
}
\`\`\`

**With virtual threads (Java 21+):** Use ScopedValue instead of ThreadLocal \u2014 it\u2019s immutable and automatically scoped to the call, preventing leaks entirely.

\`\`\`java
static final ScopedValue<User> CURRENT_USER = ScopedValue.newInstance();

ScopedValue.where(CURRENT_USER, user).run(() -> {
    processRequest(); // CURRENT_USER.get() works here
}); // Automatically gone after this block
\`\`\``
    },
    {
      id: 21,
      category: 'Real-World Scenarios',
      difficulty: 'Hard',
      question: 'Livelock in Retry Logic \u2014 Two payment processors both detect a conflict and back off, then retry at the same time, conflict again, and repeat forever. How is this different from deadlock, and how do you fix it?',
      answer: `**The Problem:** Unlike deadlock (threads frozen), livelock means threads are active but making no progress \u2014 they keep reacting to each other.

\`\`\`java
// LIVELOCK - both processors keep deferring to each other
public void processPayment(Account account) {
    while (true) {
        if (account.tryLock()) {
            try {
                if (conflictDetected()) {
                    account.unlock();
                    // Both threads reach here simultaneously, retry immediately
                    continue; // LIVELOCK - they'll conflict again!
                }
                doPayment(account);
                return;
            } finally {
                account.unlock();
            }
        }
    }
}

// FIXED - randomized backoff breaks the symmetry
public void processPayment(Account account) {
    Random random = new Random();
    int maxRetries = 10;

    for (int attempt = 0; attempt < maxRetries; attempt++) {
        if (account.tryLock()) {
            try {
                if (!conflictDetected()) {
                    doPayment(account);
                    return;
                }
            } finally {
                account.unlock();
            }
        }
        // Random backoff - threads desynchronize naturally
        Thread.sleep(random.nextInt(50) + (attempt * 10));
    }
    throw new RetryExhaustedException("Could not process after " + maxRetries + " attempts");
}
\`\`\`

**Key differences:**
- Deadlock: threads blocked, doing nothing, waiting forever
- Livelock: threads running, actively retrying, but never succeeding
- Starvation: some threads proceed while others never get a turn

**Fixes for livelock:**
- Randomized backoff (like Ethernet CSMA/CD)
- Exponential backoff with jitter
- Priority ordering so one thread always wins
- Arbitrator pattern \u2014 a coordinator decides who goes first`
    },
    {
      id: 22,
      category: 'Real-World Scenarios',
      difficulty: 'Medium',
      question: 'ConcurrentModificationException \u2014 You iterate over an ArrayList of active sessions while another thread removes expired ones. The app crashes. What are three ways to fix it?',
      answer: `**The Problem:** ArrayList\u2019s iterator is fail-fast \u2014 it detects structural modification during iteration and throws.

\`\`\`java
// BROKEN - ConcurrentModificationException
List<Session> sessions = new ArrayList<>();

// Thread 1 - iterating
for (Session s : sessions) {
    if (s.isActive()) process(s);
}

// Thread 2 - modifying (concurrently!)
sessions.removeIf(Session::isExpired); // BOOM
\`\`\`

**Fix 1: CopyOnWriteArrayList (best for read-heavy workloads)**

\`\`\`java
List<Session> sessions = new CopyOnWriteArrayList<>();
// Reads never block, writes create a new internal array
// Safe iteration guaranteed - iterators see a snapshot
for (Session s : sessions) { process(s); } // Always safe
\`\`\`

**Fix 2: Synchronized block (simple but coarse)**

\`\`\`java
List<Session> sessions = Collections.synchronizedList(new ArrayList<>());
synchronized (sessions) {
    for (Session s : sessions) { process(s); }
}
// Other threads block during iteration - bad for throughput
\`\`\`

**Fix 3: ConcurrentHashMap as a set (best for read+write balance)**

\`\`\`java
Set<Session> sessions = ConcurrentHashMap.newKeySet();
// Iterators are weakly consistent - no exception, may miss concurrent updates
for (Session s : sessions) { process(s); } // Safe, lock-free

// For maps:
ConcurrentHashMap<String, Session> map = new ConcurrentHashMap<>();
map.forEach((key, session) -> process(session)); // Built-in safe iteration
\`\`\`

**Tradeoffs:**
- CopyOnWriteArrayList: O(n) writes, O(1) reads \u2014 great for 95%+ reads
- synchronizedList: simple but serializes all access
- ConcurrentHashMap: balanced reads/writes, but no ordering guarantees`
    },
    {
      id: 23,
      category: 'Real-World Scenarios',
      difficulty: 'Hard',
      question: 'Virtual Threads Pitfall \u2014 You migrate a Spring Boot app to Java 21 virtual threads and performance degrades. Profiling shows threads pinned to carrier threads during synchronized blocks. What\u2019s happening and how do you fix it?',
      answer: `**The Problem:** Virtual threads are cheap and plentiful, but they get "pinned" to their carrier (platform) thread when inside a synchronized block or native method. This defeats the purpose of virtual threads.

\`\`\`java
// BROKEN - virtual thread gets pinned during synchronized
private final Object lock = new Object();

public String fetchData() {
    synchronized (lock) {  // Virtual thread is PINNED here
        return httpClient.send(request); // Long I/O while pinned!
        // Carrier thread is blocked - can't run other virtual threads
    }
}
\`\`\`

**Fix: Replace synchronized with ReentrantLock**

\`\`\`java
// FIXED - ReentrantLock allows virtual thread to unmount during I/O
private final ReentrantLock lock = new ReentrantLock();

public String fetchData() {
    lock.lock(); // Virtual thread can unmount while waiting for lock
    try {
        return httpClient.send(request); // I/O - virtual thread unmounts
        // Carrier thread is FREE to run other virtual threads
    } finally {
        lock.unlock();
    }
}
\`\`\`

**Detecting pinning:**

\`\`\`java
// JVM flag to detect pinning at runtime
// -Djdk.tracePinnedThreads=full

// Or use JFR (Java Flight Recorder) events:
// jdk.VirtualThreadPinned
\`\`\`

**Common pinning sources in Spring Boot:**
- JDBC drivers using synchronized internally (upgrade to virtual-thread-friendly drivers)
- Older libraries with synchronized connection pools
- Native JNI calls
- Logging frameworks holding locks during I/O

**Key principle:** Virtual threads shine for I/O-bound work with thousands of concurrent tasks. But they require lock-free or ReentrantLock-based synchronization \u2014 any synchronized keyword risks pinning.`
    },
    {
      id: 24,
      category: 'Atomic Operations',
      difficulty: 'Medium',
      question: 'Check-Then-Act \u2014 Your cache checks if a key exists, and if not, computes and inserts the value. Two threads both see the key missing and compute twice. Why doesn\u2019t a ConcurrentHashMap\u2019s get() + put() prevent this?',
      answer: `**The Problem:** Each individual operation on ConcurrentHashMap is thread-safe, but the compound check-then-act is NOT atomic.

\`\`\`java
// BROKEN - race condition between get() and put()
ConcurrentHashMap<String, Data> cache = new ConcurrentHashMap<>();

public Data getData(String key) {
    Data value = cache.get(key);     // Thread A: null
    if (value == null) {              // Thread B: also null (race!)
        value = expensiveCompute(key); // Both threads compute!
        cache.put(key, value);         // Second write overwrites first
    }
    return value;
}

// FIXED - atomic compound operation
public Data getData(String key) {
    return cache.computeIfAbsent(key, k -> expensiveCompute(k));
    // Only ONE thread computes for a given key
    // Other threads block on that key only (fine-grained locking)
}
\`\`\`

**Other atomic compound operations:**

\`\`\`java
// Update if present
cache.computeIfPresent(key, (k, existing) -> transform(existing));

// Merge with existing value
cache.merge(key, newValue, (existing, incoming) -> existing + incoming);

// Replace only if current value matches expected
cache.replace(key, expectedOld, newValue); // CAS semantics
\`\`\`

\`\`\`python
# Python doesn't have ConcurrentHashMap, but you can use locking
from threading import Lock
from functools import lru_cache

cache = {}
lock = Lock()

def get_data(key):
    if key not in cache:
        with lock:
            if key not in cache:  # Double-check after acquiring lock
                cache[key] = expensive_compute(key)
    return cache[key]
\`\`\`

**Key principle:** Individual thread-safe operations don\u2019t guarantee compound atomicity. Always use the map\u2019s built-in atomic methods for check-then-act patterns.`
    },
    {
      id: 25,
      category: 'Atomic Operations',
      difficulty: 'Hard',
      question: 'Thread Interruption \u2014 You call shutdownNow() on a thread pool, but worker threads ignore the interrupt and keep running. What\u2019s wrong, and how should threads properly handle interruption?',
      answer: `**The Problem:** shutdownNow() sends an interrupt signal, but if threads don\u2019t check for it, nothing happens.

\`\`\`java
// BROKEN - ignores interruption
public void run() {
    while (true) {  // Never checks Thread.interrupted()
        doWork();
    }
}

// BROKEN - swallows InterruptedException
public void run() {
    while (true) {
        try {
            Thread.sleep(1000);
            doWork();
        } catch (InterruptedException e) {
            // Swallowed! Thread keeps running
            System.out.println("Interrupted, but ignoring...");
        }
    }
}

// FIXED - proper interruption handling
public void run() {
    while (!Thread.currentThread().isInterrupted()) { // Check flag
        try {
            Task task = queue.take(); // Blocking call - throws on interrupt
            process(task);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt(); // Restore the flag!
            break; // Exit gracefully
        }
    }
    cleanup(); // Release resources
}
\`\`\`

**The three rules of interruption:**

**1. If you call a blocking method, handle InterruptedException:**
\`\`\`java
try {
    Thread.sleep(5000);
} catch (InterruptedException e) {
    Thread.currentThread().interrupt(); // Always re-set the flag
    return; // Or break out of loop
}
\`\`\`

**2. If you do CPU work in a loop, check the flag periodically:**
\`\`\`java
for (int i = 0; i < data.length; i++) {
    if (Thread.currentThread().isInterrupted()) {
        saveProgress(i); // Checkpoint
        return;
    }
    heavyComputation(data[i]);
}
\`\`\`

**3. Never swallow InterruptedException without restoring the flag:**
- Thread.currentThread().interrupt() re-sets it so callers higher up the stack can also detect the interruption

**Key insight:** Interruption is cooperative in Java \u2014 the runtime asks the thread to stop, but the thread must agree. Well-written code checks the flag and exits cleanly.`
    },
    {
      id: 26,
      category: 'Real-World Scenarios',
      difficulty: 'Medium',
      question: 'Writer Starvation \u2014 Your read-write lock has 100 reader threads and 1 writer thread. The writer never gets to write because new readers keep arriving before existing ones finish. How do you fix this?',
      answer: `**The Problem:** With an unfair ReadWriteLock, readers can continuously acquire the read lock, starving the writer indefinitely.

\`\`\`java
// UNFAIR - writer can starve if readers arrive continuously
ReadWriteLock rwLock = new ReentrantReadWriteLock(); // unfair by default

// 100 reader threads - always at least one holds the lock
readers.forEach(r -> executor.submit(() -> {
    rwLock.readLock().lock();
    try { readData(); } // Takes 50ms
    finally { rwLock.readLock().unlock(); }
    // Next reader acquires immediately before writer can
}));

// Writer thread - STARVED
executor.submit(() -> {
    rwLock.writeLock().lock(); // Waits forever...
    try { writeData(); }
    finally { rwLock.writeLock().unlock(); }
});
\`\`\`

**Fix: Use a fair lock**

\`\`\`java
// FAIR - writer gets priority once it starts waiting
ReadWriteLock rwLock = new ReentrantReadWriteLock(true); // fair = true
// Once the writer requests the lock, new readers queue behind it
// Existing readers finish, then writer proceeds, then queued readers
\`\`\`

**Fix: StampedLock for optimistic reads (Java 8+)**

\`\`\`java
StampedLock sl = new StampedLock();

// Optimistic read - no actual lock acquired, doesn't block writers
public double readBalance() {
    long stamp = sl.tryOptimisticRead(); // No lock!
    double balance = this.balance;
    if (!sl.validate(stamp)) { // Check if a write happened
        stamp = sl.readLock();  // Fall back to pessimistic read
        try { balance = this.balance; }
        finally { sl.unlockRead(stamp); }
    }
    return balance;
}

// Write - exclusive as always
public void updateBalance(double amount) {
    long stamp = sl.writeLock();
    try { this.balance += amount; }
    finally { sl.unlockWrite(stamp); }
}
\`\`\`

**Tradeoffs:**
- Fair ReentrantReadWriteLock: eliminates starvation but reduces throughput (~10-20% slower)
- StampedLock: highest throughput for read-heavy loads, but more complex API and not reentrant
- For most apps: start with fair=true, optimize to StampedLock only if profiling shows contention`
    }
  ]

  const displayQuestions = problemLimit ? questions.slice(0, problemLimit) : questions

  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id)
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Race Conditions & Synchronization': '#ef4444',
      'Deadlocks': '#f59e0b',
      'Producer-Consumer': '#3b82f6',
      'Visibility & Ordering': '#8b5cf6',
      'Thread Pools & Performance': '#10b981',
      'Python-Specific': '#06b6d4',
      'Coordination Primitives': '#a855f7',
      'Real-World Scenarios': '#f97316',
      'Atomic Operations': '#14b8a6'
    }
    return colors[category] || '#6b7280'
  }

  const getDifficultyColor = (difficulty) => {
    return difficulty === 'Medium' ? '#f59e0b' : '#dc2626'
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', minHeight: '100vh' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <button
          onClick={onBack}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
        >
          &larr; Back to Questions
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#93c5fd',
          margin: 0
        }}>
          Threading &amp; Concurrency Interview Questions
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

      <CollapsibleSidebar
        items={displayQuestions}
        selectedIndex={expandedQuestion ? displayQuestions.findIndex(q => q.id === expandedQuestion) : -1}
        onSelect={(index) => toggleQuestion(displayQuestions[index].id)}
        title="Questions"
        getItemLabel={(item) => `${item.id}. ${item.category}`}
        getItemIcon={() => '&#10067;'}
        primaryColor="#ec4899"
      />

      <p style={{
        fontSize: '1.1rem',
        color: '#d1d5db',
        textAlign: 'left',
        marginBottom: '2rem',
        lineHeight: '1.6'
      }}>
        Comprehensive threading and concurrency questions covering race conditions, deadlocks, producer-consumer patterns, visibility, thread pools, and Python-specific concurrency. Medium and Hard difficulty levels to prepare for senior-level interviews.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {displayQuestions.map((q) => (
          <div
            key={q.id}
            style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              borderRadius: '12px',
              border: `3px solid ${expandedQuestion === q.id ? getCategoryColor(q.category) : '#374151'}`,
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              boxShadow: expandedQuestion === q.id
                ? '0 8px 16px rgba(0,0,0,0.1)'
                : '0 2px 8px rgba(0,0,0,0.05)'
            }}
          >
            <button
              onClick={() => toggleQuestion(q.id)}
              style={{
                width: '100%',
                padding: '1.5rem',
                backgroundColor: expandedQuestion === q.id
                  ? `${getCategoryColor(q.category)}15`
                  : 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
              onMouseEnter={(e) => {
                if (expandedQuestion !== q.id) {
                  e.currentTarget.style.backgroundColor = '#374151'
                }
              }}
              onMouseLeave={(e) => {
                if (expandedQuestion !== q.id) {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    backgroundColor: getCategoryColor(q.category),
                    color: 'white',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {q.category}
                  </div>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    backgroundColor: getDifficultyColor(q.difficulty),
                    color: 'white',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {q.difficulty}
                  </div>
                </div>
                <h3 style={{
                  fontSize: '1.15rem',
                  fontWeight: '700',
                  color: '#e2e8f0',
                  margin: 0
                }}>
                  Q{q.id}. {q.question}
                </h3>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div onClick={(e) => e.stopPropagation()} style={{ transform: 'scale(0.85)' }}>
                  <CompletionCheckbox problemId={`ThreadingQuestions-${q.id}`} />
                </div>
                <div style={{
                  fontSize: '1.5rem',
                  color: getCategoryColor(q.category),
                  fontWeight: 'bold',
                  transform: expandedQuestion === q.id ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}>
                  &#9660;
                </div>
              </div>
            </button>

            {expandedQuestion === q.id && (
              <div style={{
                padding: '1.5rem',
                backgroundColor: '#1e293b',
                borderTop: `2px solid ${getCategoryColor(q.category)}40`
              }}>
                <div style={{
                  fontSize: '1rem',
                  lineHeight: '1.8',
                  color: '#d1d5db',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  textAlign: 'left'
                }}>
                  {renderFormattedAnswer(q.answer)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        backgroundColor: 'rgba(236, 72, 153, 0.15)',
        borderRadius: '12px',
        border: '2px solid #ec4899'
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#f9a8d4', marginBottom: '0.5rem' }}>
          Threading &amp; Concurrency Mastery Path
        </h3>
        <ul style={{ color: '#fbcfe8', lineHeight: '1.8', margin: '0.5rem 0' }}>
          <li>Master race conditions and synchronization primitives</li>
          <li>Understand deadlock conditions and prevention strategies</li>
          <li>Learn producer-consumer patterns with blocking queues</li>
          <li>Study Java memory model, volatile, and happens-before</li>
          <li>Optimize thread pool sizing for CPU-bound vs I/O-bound work</li>
          <li>Know Python GIL limitations and when to use multiprocessing</li>
        </ul>
      </div>
    </div>
  )
}

export default ThreadingQuestions
