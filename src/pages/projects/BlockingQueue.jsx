import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, Code, ArrowLeft, Layers, Zap, Lock, AlertTriangle, CheckCircle, ArrowRightLeft } from 'lucide-react';
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

const BlockingQueue = ({ onBack, breadcrumb }) => {
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
      title: 'Why BlockingQueue?',
      icon: <Zap className="w-5 h-5" />,
      content: `BlockingQueue solves the Producer-Consumer problem elegantly by providing thread-safe operations that automatically handle synchronization.

Why use BlockingQueue instead of regular Queue?

1. Thread Safety: All operations are atomic and thread-safe
2. Blocking Operations: Threads wait when queue is empty/full instead of failing
3. No Manual Synchronization: No need for explicit locks or wait/notify
4. Backpressure: Bounded queues prevent memory overflow
5. Decoupling: Producers and consumers work independently

Common Use Cases:
• Thread pools (ExecutorService uses BlockingQueue internally)
• Message passing between threads
• Event-driven architectures
• Rate limiting and throttling
• Work distribution in parallel processing`,
      code: `// Without BlockingQueue - manual synchronization needed
class ManualQueue<T> {
    private Queue<T> queue = new LinkedList<>();
    private int capacity;

    public synchronized void put(T item) throws InterruptedException {
        while (queue.size() == capacity) {
            wait();  // Wait if full
        }
        queue.add(item);
        notifyAll();  // Wake up consumers
    }

    public synchronized T take() throws InterruptedException {
        while (queue.isEmpty()) {
            wait();  // Wait if empty
        }
        T item = queue.poll();
        notifyAll();  // Wake up producers
        return item;
    }
}

// With BlockingQueue - clean and simple!
BlockingQueue<Task> queue = new ArrayBlockingQueue<>(100);
queue.put(task);    // Blocks if full
Task t = queue.take();  // Blocks if empty`
    },
    {
      title: 'BlockingQueue Interface',
      icon: <Layers className="w-5 h-5" />,
      content: `BlockingQueue extends Queue and adds blocking operations. It provides four forms of operations:

| Operation | Throws Exception | Returns Special Value | Blocks | Times Out |
|-----------|-----------------|----------------------|--------|-----------|
| Insert    | add(e)          | offer(e)             | put(e) | offer(e, time, unit) |
| Remove    | remove()        | poll()               | take() | poll(time, unit) |
| Examine   | element()       | peek()               | N/A    | N/A |

Choosing the right method:
• Use put/take for producer-consumer patterns
• Use offer/poll with timeout for graceful degradation
• Use add/remove when you want exceptions on failure`,
      code: `public interface BlockingQueue<E> extends Queue<E> {

    // Blocking operations
    void put(E e) throws InterruptedException;
    E take() throws InterruptedException;

    // Timed operations
    boolean offer(E e, long timeout, TimeUnit unit)
        throws InterruptedException;
    E poll(long timeout, TimeUnit unit)
        throws InterruptedException;

    // Non-blocking operations (inherited from Queue)
    boolean offer(E e);      // Returns false if full
    E poll();                // Returns null if empty

    // Throws exception if fails
    boolean add(E e);        // Throws IllegalStateException if full
    E remove();              // Throws NoSuchElementException if empty

    // Query operations
    int remainingCapacity(); // Space left in bounded queue
    boolean contains(Object o);
    int drainTo(Collection<? super E> c);  // Bulk remove
}`
    },
    {
      title: 'ArrayBlockingQueue',
      icon: <Lock className="w-5 h-5" />,
      content: `ArrayBlockingQueue is a bounded, array-backed blocking queue. It's the most commonly used implementation.

Characteristics:
• Fixed capacity (set at construction time)
• FIFO ordering
• Uses single ReentrantLock for both put and take
• Optional fairness policy (FIFO thread ordering)
• Good for bounded producer-consumer scenarios

Internal Structure:
• Circular array buffer
• Two indices: putIndex and takeIndex
• count variable tracks number of elements
• Condition variables: notEmpty and notFull`,
      code: `// Creating ArrayBlockingQueue
BlockingQueue<Task> queue = new ArrayBlockingQueue<>(100);

// With fairness (FIFO thread ordering, slightly slower)
BlockingQueue<Task> fairQueue = new ArrayBlockingQueue<>(100, true);

// Internal implementation (simplified)
public class ArrayBlockingQueue<E> {
    final Object[] items;      // The array buffer
    int takeIndex;             // Next position to take
    int putIndex;              // Next position to put
    int count;                 // Number of elements

    final ReentrantLock lock;  // Single lock for all operations
    private final Condition notEmpty;  // Signals when not empty
    private final Condition notFull;   // Signals when not full

    public void put(E e) throws InterruptedException {
        final ReentrantLock lock = this.lock;
        lock.lockInterruptibly();
        try {
            while (count == items.length)
                notFull.await();  // Wait until not full
            enqueue(e);
        } finally {
            lock.unlock();
        }
    }

    public E take() throws InterruptedException {
        final ReentrantLock lock = this.lock;
        lock.lockInterruptibly();
        try {
            while (count == 0)
                notEmpty.await();  // Wait until not empty
            return dequeue();
        } finally {
            lock.unlock();
        }
    }

    private void enqueue(E e) {
        items[putIndex] = e;
        if (++putIndex == items.length)
            putIndex = 0;  // Wrap around
        count++;
        notEmpty.signal();  // Wake up one consumer
    }

    private E dequeue() {
        E e = (E) items[takeIndex];
        items[takeIndex] = null;  // Help GC
        if (++takeIndex == items.length)
            takeIndex = 0;  // Wrap around
        count--;
        notFull.signal();  // Wake up one producer
        return e;
    }
}`
    },
    {
      title: 'LinkedBlockingQueue',
      icon: <ArrowRightLeft className="w-5 h-5" />,
      content: `LinkedBlockingQueue is a linked-node based blocking queue with optional capacity.

Characteristics:
• Optionally bounded (Integer.MAX_VALUE by default)
• FIFO ordering
• Uses TWO separate locks (putLock and takeLock)
• Higher throughput than ArrayBlockingQueue under contention
• Slightly higher memory overhead per element

When to use LinkedBlockingQueue vs ArrayBlockingQueue:
• Use LinkedBlockingQueue when producers and consumers are equally fast
• Use ArrayBlockingQueue when you need strict bounded capacity
• LinkedBlockingQueue has better concurrent performance (two locks)`,
      code: `// Unbounded (capacity = Integer.MAX_VALUE)
BlockingQueue<Task> unbounded = new LinkedBlockingQueue<>();

// Bounded
BlockingQueue<Task> bounded = new LinkedBlockingQueue<>(1000);

// Internal implementation (simplified)
public class LinkedBlockingQueue<E> {
    private final int capacity;
    private final AtomicInteger count = new AtomicInteger();

    // Linked list nodes
    static class Node<E> {
        E item;
        Node<E> next;
        Node(E x) { item = x; }
    }

    transient Node<E> head;  // Dummy head
    private transient Node<E> last;  // Tail

    // TWO separate locks for better concurrency!
    private final ReentrantLock takeLock = new ReentrantLock();
    private final Condition notEmpty = takeLock.newCondition();

    private final ReentrantLock putLock = new ReentrantLock();
    private final Condition notFull = putLock.newCondition();

    public void put(E e) throws InterruptedException {
        int c = -1;
        Node<E> node = new Node<E>(e);
        final ReentrantLock putLock = this.putLock;
        final AtomicInteger count = this.count;

        putLock.lockInterruptibly();
        try {
            while (count.get() == capacity)
                notFull.await();
            enqueue(node);
            c = count.getAndIncrement();
            if (c + 1 < capacity)
                notFull.signal();  // More space available
        } finally {
            putLock.unlock();
        }
        if (c == 0)
            signalNotEmpty();  // Was empty, wake consumer
    }

    public E take() throws InterruptedException {
        E x;
        int c = -1;
        final AtomicInteger count = this.count;
        final ReentrantLock takeLock = this.takeLock;

        takeLock.lockInterruptibly();
        try {
            while (count.get() == 0)
                notEmpty.await();
            x = dequeue();
            c = count.getAndDecrement();
            if (c > 1)
                notEmpty.signal();  // More items available
        } finally {
            takeLock.unlock();
        }
        if (c == capacity)
            signalNotFull();  // Was full, wake producer
        return x;
    }
}`
    },
    {
      title: 'Other Implementations',
      icon: <Layers className="w-5 h-5" />,
      content: `Java provides several specialized BlockingQueue implementations:

PriorityBlockingQueue:
• Unbounded queue with priority ordering
• Elements must be Comparable or provide Comparator
• take() returns highest priority element

DelayQueue:
• Elements must implement Delayed interface
• Elements can only be taken when their delay has expired
• Useful for scheduled tasks, caching expiration

SynchronousQueue:
• Zero capacity - direct handoff between threads
• put() blocks until another thread calls take()
• Used in Executors.newCachedThreadPool()

LinkedTransferQueue (Java 7+):
• Unbounded queue with transfer semantics
• transfer() blocks until element is consumed
• Combines features of SynchronousQueue and LinkedBlockingQueue`,
      code: `// PriorityBlockingQueue - priority ordering
BlockingQueue<Task> priorityQueue = new PriorityBlockingQueue<>();
priorityQueue.put(new Task(3, "Low priority"));
priorityQueue.put(new Task(1, "High priority"));
Task t = priorityQueue.take();  // Returns high priority first

// DelayQueue - delayed elements
class DelayedTask implements Delayed {
    private final long executeTime;
    private final String name;

    public DelayedTask(String name, long delayMs) {
        this.name = name;
        this.executeTime = System.currentTimeMillis() + delayMs;
    }

    @Override
    public long getDelay(TimeUnit unit) {
        long diff = executeTime - System.currentTimeMillis();
        return unit.convert(diff, TimeUnit.MILLISECONDS);
    }

    @Override
    public int compareTo(Delayed o) {
        return Long.compare(this.executeTime,
            ((DelayedTask) o).executeTime);
    }
}

DelayQueue<DelayedTask> delayQueue = new DelayQueue<>();
delayQueue.put(new DelayedTask("Task1", 5000));  // 5 sec delay
DelayedTask task = delayQueue.take();  // Blocks for 5 seconds

// SynchronousQueue - direct handoff
BlockingQueue<Task> syncQueue = new SynchronousQueue<>();
// In producer thread:
syncQueue.put(task);  // Blocks until consumer takes
// In consumer thread:
Task t = syncQueue.take();  // Blocks until producer puts

// LinkedTransferQueue - transfer semantics
LinkedTransferQueue<Task> transferQueue = new LinkedTransferQueue<>();
transferQueue.transfer(task);  // Blocks until consumed
// vs
transferQueue.put(task);  // Returns immediately`
    },
    {
      title: 'Producer-Consumer Pattern',
      icon: <ArrowRightLeft className="w-5 h-5" />,
      content: `The Producer-Consumer pattern is the classic use case for BlockingQueue. It decouples data production from consumption.

Benefits:
• Producers and consumers work at different speeds
• Queue acts as buffer between them
• Automatic backpressure with bounded queues
• Clean shutdown with poison pills or interrupts

Best Practices:
• Use bounded queues to prevent memory issues
• Handle InterruptedException properly
• Consider using multiple consumers for parallelism
• Use poison pill pattern for graceful shutdown`,
      code: `// Complete Producer-Consumer Example
public class ProducerConsumerExample {

    private static final int CAPACITY = 100;
    private static final Task POISON_PILL = new Task("STOP");

    public static void main(String[] args) throws InterruptedException {
        BlockingQueue<Task> queue = new ArrayBlockingQueue<>(CAPACITY);

        // Start producers
        Thread producer1 = new Thread(new Producer(queue, "P1"));
        Thread producer2 = new Thread(new Producer(queue, "P2"));

        // Start consumers
        Thread consumer1 = new Thread(new Consumer(queue, "C1"));
        Thread consumer2 = new Thread(new Consumer(queue, "C2"));

        producer1.start();
        producer2.start();
        consumer1.start();
        consumer2.start();

        // Wait for producers to finish
        producer1.join();
        producer2.join();

        // Send poison pills to stop consumers
        queue.put(POISON_PILL);
        queue.put(POISON_PILL);

        consumer1.join();
        consumer2.join();
    }
}

class Producer implements Runnable {
    private final BlockingQueue<Task> queue;
    private final String name;

    Producer(BlockingQueue<Task> queue, String name) {
        this.queue = queue;
        this.name = name;
    }

    @Override
    public void run() {
        try {
            for (int i = 0; i < 100; i++) {
                Task task = new Task(name + "-Task-" + i);
                queue.put(task);  // Blocks if queue is full
                System.out.println(name + " produced: " + task);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}

class Consumer implements Runnable {
    private final BlockingQueue<Task> queue;
    private final String name;

    Consumer(BlockingQueue<Task> queue, String name) {
        this.queue = queue;
        this.name = name;
    }

    @Override
    public void run() {
        try {
            while (true) {
                Task task = queue.take();  // Blocks if queue is empty
                if (task == POISON_PILL) {
                    System.out.println(name + " received poison pill, stopping");
                    break;
                }
                process(task);
                System.out.println(name + " consumed: " + task);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    private void process(Task task) {
        // Simulate work
        try { Thread.sleep(10); } catch (InterruptedException e) {}
    }
}`
    },
    {
      title: 'Custom BlockingQueue Implementation',
      icon: <Code className="w-5 h-5" />,
      content: `Understanding how to implement a BlockingQueue from scratch is a common interview question. Here's a complete implementation using ReentrantLock and Conditions.

Key concepts:
• ReentrantLock for mutual exclusion
• Condition variables for wait/signal
• Proper handling of spurious wakeups (while loop)
• Thread interruption handling`,
      code: `public class CustomBlockingQueue<E> {
    private final Object[] items;
    private int head = 0;      // Index for next take
    private int tail = 0;      // Index for next put
    private int count = 0;     // Number of elements

    private final ReentrantLock lock = new ReentrantLock();
    private final Condition notEmpty = lock.newCondition();
    private final Condition notFull = lock.newCondition();

    public CustomBlockingQueue(int capacity) {
        if (capacity <= 0) throw new IllegalArgumentException();
        this.items = new Object[capacity];
    }

    public void put(E item) throws InterruptedException {
        if (item == null) throw new NullPointerException();

        lock.lockInterruptibly();
        try {
            // Wait while queue is full (use while for spurious wakeups)
            while (count == items.length) {
                notFull.await();
            }

            // Add item at tail
            items[tail] = item;
            tail = (tail + 1) % items.length;  // Circular increment
            count++;

            // Signal one waiting consumer
            notEmpty.signal();
        } finally {
            lock.unlock();
        }
    }

    @SuppressWarnings("unchecked")
    public E take() throws InterruptedException {
        lock.lockInterruptibly();
        try {
            // Wait while queue is empty
            while (count == 0) {
                notEmpty.await();
            }

            // Remove item from head
            E item = (E) items[head];
            items[head] = null;  // Help GC
            head = (head + 1) % items.length;  // Circular increment
            count--;

            // Signal one waiting producer
            notFull.signal();

            return item;
        } finally {
            lock.unlock();
        }
    }

    public boolean offer(E item, long timeout, TimeUnit unit)
            throws InterruptedException {
        if (item == null) throw new NullPointerException();
        long nanos = unit.toNanos(timeout);

        lock.lockInterruptibly();
        try {
            while (count == items.length) {
                if (nanos <= 0) return false;
                nanos = notFull.awaitNanos(nanos);  // Timed wait
            }
            items[tail] = item;
            tail = (tail + 1) % items.length;
            count++;
            notEmpty.signal();
            return true;
        } finally {
            lock.unlock();
        }
    }

    @SuppressWarnings("unchecked")
    public E poll(long timeout, TimeUnit unit)
            throws InterruptedException {
        long nanos = unit.toNanos(timeout);

        lock.lockInterruptibly();
        try {
            while (count == 0) {
                if (nanos <= 0) return null;
                nanos = notEmpty.awaitNanos(nanos);
            }
            E item = (E) items[head];
            items[head] = null;
            head = (head + 1) % items.length;
            count--;
            notFull.signal();
            return item;
        } finally {
            lock.unlock();
        }
    }

    public int size() {
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
      title: 'Interview Questions',
      icon: <AlertTriangle className="w-5 h-5" />,
      content: `Common BlockingQueue interview questions:

Q1: Difference between put() and offer()?
A: put() blocks indefinitely if full; offer() returns false immediately.

Q2: Why use while loop instead of if for await()?
A: To handle spurious wakeups - thread may wake without signal.

Q3: ArrayBlockingQueue vs LinkedBlockingQueue?
A: Array uses single lock, Linked uses two locks (better concurrency). Array has fixed capacity, Linked can be unbounded.

Q4: How does ExecutorService use BlockingQueue?
A: ThreadPoolExecutor uses it to hold pending tasks. Workers take() tasks from queue.

Q5: How to implement bounded buffer with BlockingQueue?
A: Use ArrayBlockingQueue with fixed capacity - it handles all synchronization.`,
      code: `// Q6: Implement a rate limiter using BlockingQueue
class RateLimiter {
    private final BlockingQueue<Long> tokens;

    public RateLimiter(int permitsPerSecond) {
        tokens = new ArrayBlockingQueue<>(permitsPerSecond);
        // Fill with initial tokens
        for (int i = 0; i < permitsPerSecond; i++) {
            tokens.offer(System.currentTimeMillis());
        }
        // Refill tokens periodically
        ScheduledExecutorService scheduler =
            Executors.newScheduledThreadPool(1);
        scheduler.scheduleAtFixedRate(() -> {
            tokens.offer(System.currentTimeMillis());
        }, 1000 / permitsPerSecond, 1000 / permitsPerSecond,
           TimeUnit.MILLISECONDS);
    }

    public void acquire() throws InterruptedException {
        tokens.take();  // Blocks if no tokens available
    }
}

// Q7: How does ThreadPoolExecutor use BlockingQueue?
// Simplified ThreadPoolExecutor internals
class SimpleThreadPool {
    private final BlockingQueue<Runnable> workQueue;
    private final List<Worker> workers;

    public void execute(Runnable task) {
        workQueue.offer(task);  // Add to queue
    }

    class Worker implements Runnable {
        public void run() {
            while (!Thread.interrupted()) {
                try {
                    Runnable task = workQueue.take();  // Block for task
                    task.run();
                } catch (InterruptedException e) {
                    break;
                }
            }
        }
    }
}

// Q8: SynchronousQueue use case?
// Direct handoff - useful for cached thread pools
ExecutorService cachedPool = Executors.newCachedThreadPool();
// Internally uses SynchronousQueue:
// new ThreadPoolExecutor(0, Integer.MAX_VALUE, 60L, TimeUnit.SECONDS,
//     new SynchronousQueue<Runnable>());`
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
            BlockingQueue - Deep Dive
          </h1>
          <p className="text-lg" style={{ color: colors.textSecondary }}>
            Why, how, and implementation of Java's BlockingQueue - essential for concurrency interviews
          </p>
        </div>

        {/* Quick Facts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Thread Safe', value: 'Yes', icon: <CheckCircle className="w-5 h-5" /> },
            { label: 'Blocking Ops', value: 'put/take' },
            { label: 'Main Use', value: 'Producer-Consumer' },
            { label: 'Package', value: 'java.util.concurrent' }
          ].map((fact, i) => (
            <div
              key={i}
              className="p-4 rounded-lg text-center"
              style={{ backgroundColor: colors.card }}
            >
              <div className="text-xl font-bold flex items-center justify-center gap-2" style={{ color: colors.primary }}>
                {fact.icon}
                {fact.value}
              </div>
              <div className="text-sm" style={{ color: colors.textSecondary }}>
                {fact.label}
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mb-8 p-4 rounded-lg overflow-x-auto" style={{ backgroundColor: colors.card }}>
          <h3 className="text-lg font-bold mb-3" style={{ color: colors.text }}>
            Implementation Comparison
          </h3>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                <th className="text-left p-2" style={{ color: colors.text }}>Implementation</th>
                <th className="text-left p-2" style={{ color: colors.text }}>Bounded</th>
                <th className="text-left p-2" style={{ color: colors.text }}>Locks</th>
                <th className="text-left p-2" style={{ color: colors.text }}>Ordering</th>
                <th className="text-left p-2" style={{ color: colors.text }}>Best For</th>
              </tr>
            </thead>
            <tbody style={{ color: colors.textSecondary }}>
              <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                <td className="p-2 font-medium" style={{ color: colors.primary }}>ArrayBlockingQueue</td>
                <td className="p-2">Yes (fixed)</td>
                <td className="p-2">1 lock</td>
                <td className="p-2">FIFO</td>
                <td className="p-2">Bounded buffer</td>
              </tr>
              <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                <td className="p-2 font-medium" style={{ color: colors.primary }}>LinkedBlockingQueue</td>
                <td className="p-2">Optional</td>
                <td className="p-2">2 locks</td>
                <td className="p-2">FIFO</td>
                <td className="p-2">High throughput</td>
              </tr>
              <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                <td className="p-2 font-medium" style={{ color: colors.primary }}>PriorityBlockingQueue</td>
                <td className="p-2">No</td>
                <td className="p-2">1 lock</td>
                <td className="p-2">Priority</td>
                <td className="p-2">Priority tasks</td>
              </tr>
              <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                <td className="p-2 font-medium" style={{ color: colors.primary }}>SynchronousQueue</td>
                <td className="p-2">0 capacity</td>
                <td className="p-2">N/A</td>
                <td className="p-2">Direct</td>
                <td className="p-2">Handoff</td>
              </tr>
              <tr>
                <td className="p-2 font-medium" style={{ color: colors.primary }}>DelayQueue</td>
                <td className="p-2">No</td>
                <td className="p-2">1 lock</td>
                <td className="p-2">Delay</td>
                <td className="p-2">Scheduled tasks</td>
              </tr>
            </tbody>
          </table>
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
            Visual: Producer-Consumer with BlockingQueue
          </h3>
          <pre
            className="text-xs md:text-sm overflow-x-auto p-4 rounded"
            style={{ backgroundColor: colors.background, color: colors.textSecondary }}
          >
{`Producer-Consumer Pattern with BlockingQueue:

    PRODUCERS                    BLOCKING QUEUE                   CONSUMERS
    ─────────                    ──────────────                   ─────────

  ┌──────────┐                                                  ┌──────────┐
  │Producer 1│──┐                                           ┌──▶│Consumer 1│
  └──────────┘  │                                           │   └──────────┘
                │   put()    ┌───┬───┬───┬───┬───┐  take()  │
  ┌──────────┐  ├──────────▶ │ T │ T │ T │ T │   │ ────────┼──▶┌──────────┐
  │Producer 2│──┤   blocks   │ 1 │ 2 │ 3 │ 4 │   │  blocks │   │Consumer 2│
  └──────────┘  │   if full  └───┴───┴───┴───┴───┘ if empty│   └──────────┘
                │              ▲               ▲            │
  ┌──────────┐  │              │   Bounded     │            └──▶┌──────────┐
  │Producer 3│──┘             tail           head               │Consumer 3│
  └──────────┘                                                  └──────────┘


ArrayBlockingQueue Internal Structure:
─────────────────────────────────────

                     Single Lock (ReentrantLock)
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
    ┌─────────────────────────────────────────────┐
    │  Circular Array Buffer                      │
    │  ┌───┬───┬───┬───┬───┬───┬───┬───┐        │
    │  │ 0 │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │        │
    │  └───┴───┴───┴───┴───┴───┴───┴───┘        │
    │        ▲               ▲                   │
    │        │               │                   │
    │      head            tail                  │
    │    (takeIndex)     (putIndex)              │
    │                                            │
    │  Conditions:                               │
    │  - notEmpty: signaled on put()             │
    │  - notFull: signaled on take()             │
    └─────────────────────────────────────────────┘


LinkedBlockingQueue Internal Structure:
──────────────────────────────────────

    Put Lock                              Take Lock
        │                                     │
        ▼                                     ▼
    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐
    │ HEAD  │───▶│ Node1 │───▶│ Node2 │───▶│ TAIL  │
    │(dummy)│    │ Task1 │    │ Task2 │    │ Task3 │
    └───────┘    └───────┘    └───────┘    └───────┘
        │                                     │
        └──── Two separate locks ─────────────┘
              (Better concurrency!)`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default BlockingQueue;
