import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, ArrowLeft, Layers, Zap, Shield, Users, Lock, Settings } from 'lucide-react';
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

const SemaphoreInternals = ({ onBack, breadcrumb }) => {
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
      title: 'Semaphore Fundamentals',
      icon: <Zap className="w-5 h-5" />,
      content: `Semaphore controls access to a shared resource with N permits.

Core operations:
• acquire(): Get a permit (blocks if none available)
• release(): Return a permit
• tryAcquire(): Non-blocking attempt

Key properties:
• Permits can exceed initial count (release without acquire)
• Not tied to threads (can release from different thread)
• Fair vs non-fair mode

Use cases:
• Connection pools
• Rate limiting
• Resource pooling
• Bounded collections`,
      code: `// Semaphore structure
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
}

// Basic usage
Semaphore semaphore = new Semaphore(3);  // 3 permits

// Thread 1, 2, 3: acquire immediately
semaphore.acquire();  // Permits: 3 → 2
semaphore.acquire();  // Permits: 2 → 1
semaphore.acquire();  // Permits: 1 → 0

// Thread 4: blocks until permit available
semaphore.acquire();  // Blocks!

// Thread 1 releases
semaphore.release();  // Permits: 0 → 1, Thread 4 unblocks`
    },
    {
      title: 'Fair vs Non-Fair Semaphore',
      icon: <Shield className="w-5 h-5" />,
      content: `Semaphore supports both fair and non-fair modes.

Non-fair (default):
• Threads may "barge" ahead of waiting threads
• Better throughput
• Possible starvation of waiting threads

Fair:
• FIFO ordering of permit acquisition
• No starvation
• Lower throughput (more overhead)

Choose fair when:
• Starvation is unacceptable
• Predictable ordering needed`,
      code: `// Non-fair (default) - better performance
Semaphore nonFair = new Semaphore(5);

// Fair - FIFO ordering
Semaphore fair = new Semaphore(5, true);

// Non-fair internal
static final class NonfairSync extends Sync {
    NonfairSync(int permits) {
        super(permits);
    }

    protected int tryAcquireShared(int acquires) {
        return nonfairTryAcquireShared(acquires);  // May barge
    }
}

// Fair internal
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

// Fairness impact example
// Non-fair: Thread that just released may immediately reacquire
// Fair: Thread must go to back of queue

// Performance comparison (typical):
// Non-fair: ~2-3x faster under contention
// Fair: Guaranteed ordering, slower

// When to use fair:
// - Long-held permits (connection pools)
// - Critical that no thread starves
// - Debugging/testing (predictable behavior)`
    },
    {
      title: 'Connection Pool Example',
      icon: <Layers className="w-5 h-5" />,
      content: `Semaphore is commonly used for connection pooling.

Pattern:
• Semaphore permits = max connections
• acquire() before getting connection
• release() after returning connection

Benefits:
• Bounds concurrent connections
• Blocks when pool exhausted
• Timeout support with tryAcquire()`,
      code: `// Connection pool with Semaphore
class ConnectionPool {
    private final Semaphore semaphore;
    private final BlockingQueue<Connection> pool;

    ConnectionPool(int maxConnections) {
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

    Connection getConnection(long timeout, TimeUnit unit)
            throws InterruptedException {
        if (semaphore.tryAcquire(timeout, unit)) {
            return pool.poll();
        }
        throw new TimeoutException("No connection available");
    }

    void releaseConnection(Connection conn) {
        pool.offer(conn);      // Return to pool
        semaphore.release();   // Release permit
    }
}

// Usage
ConnectionPool pool = new ConnectionPool(10);

Connection conn = pool.getConnection();
try {
    // Use connection
} finally {
    pool.releaseConnection(conn);
}

// With timeout
try {
    Connection conn = pool.getConnection(5, TimeUnit.SECONDS);
    // ...
} catch (TimeoutException e) {
    // Handle no connection available
}`
    },
    {
      title: 'Rate Limiting with Semaphore',
      icon: <Lock className="w-5 h-5" />,
      content: `Semaphore can implement simple rate limiting.

Pattern:
• N permits = N concurrent operations
• Scheduled task replenishes permits
• acquire() rate-limits access

Note: For production rate limiting, consider:
• Guava RateLimiter (token bucket)
• Resilience4j
• Redis-based solutions`,
      code: `// Simple rate limiter
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
}

// Bounded semaphore (cannot exceed initial)
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

    synchronized void release() {
        if (semaphore.availablePermits() < maxPermits) {
            semaphore.release();
        }
    }
}`
    },
    {
      title: 'Binary Semaphore vs Mutex',
      icon: <Users className="w-5 h-5" />,
      content: `Binary semaphore (permits=1) vs ReentrantLock (mutex):

Binary Semaphore:
• Not owner-based
• Any thread can release
• Not reentrant
• Can be used for signaling

Mutex (ReentrantLock):
• Owner-based (only owner releases)
• Reentrant (same thread can lock again)
• Has Condition support
• For mutual exclusion only`,
      code: `// Binary semaphore
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

// This is valid with semaphore:
new Thread(() -> sem.acquire()).start();
Thread.sleep(100);
sem.release();  // Different thread releases!

// This throws with lock:
new Thread(() -> lock.lock()).start();
Thread.sleep(100);
lock.unlock();  // IllegalMonitorStateException!

// Reentrancy difference
Semaphore sem = new Semaphore(1);
sem.acquire();
sem.acquire();  // DEADLOCK! Not reentrant

ReentrantLock lock = new ReentrantLock();
lock.lock();
lock.lock();  // OK! Reentrant
lock.unlock();
lock.unlock();  // Must unlock same number of times

// When to use which:
// Semaphore: Resource counting, signaling between threads
// Mutex: Protecting critical sections, need Conditions`
    },
    {
      title: 'Interview Questions',
      icon: <Settings className="w-5 h-5" />,
      content: `Common Semaphore interview questions:

Q1: Semaphore vs Mutex?
A: Semaphore counts permits, mutex is binary and owner-based

Q2: Can release() exceed initial permits?
A: Yes! Permits can grow beyond initial count

Q3: Fair vs non-fair?
A: Fair=FIFO, non-fair=may barge

Q4: What does acquire(n) do?
A: Acquires n permits atomically

Q5: Thread safety of operations?
A: All operations are atomic (CAS-based)`,
      code: `// Q1: Semaphore(1) vs Lock
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
sem.getQueueLength();  // Waiting threads (estimate)

// Q6: Common pitfalls

// Forgetting to release
try {
    sem.acquire();
    doWork();
    // Exception here means no release!
} finally {
    sem.release();  // Always release in finally
}

// Releasing too many times
sem.acquire();
sem.release();
sem.release();  // Permits now exceeds initial!

// Deadlock with multiple semaphores
Semaphore a = new Semaphore(1);
Semaphore b = new Semaphore(1);
// Thread 1: a.acquire(); b.acquire();
// Thread 2: b.acquire(); a.acquire();
// DEADLOCK!`
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
            <Shield className={`w-8 h-8 ${colors.accent}`} />
            <h1 className={`text-3xl font-bold ${colors.heading}`}>Semaphore - Internal Workings</h1>
          </div>
          <p className={`text-lg ${colors.secondary} mb-6`}>
            Deep dive into Semaphore: permit-based synchronization, fair vs non-fair, and practical patterns.
          </p>

          <div className={`${colors.card} rounded-xl p-4 mb-6 border ${colors.border}`}>
            <h3 className={`font-semibold ${colors.heading} mb-2`}>Semaphore Operations</h3>
            <pre className={`text-sm ${colors.secondary} font-mono whitespace-pre overflow-x-auto`}>
{`Semaphore (permits = 3):

  acquire()     acquire()     acquire()     acquire()
      │             │             │             │
      ↓             ↓             ↓             ↓
  [permit 1]   [permit 2]   [permit 3]   [BLOCKED]
      │             │             │             │
      └─────────────┴─────────────┘             │
                    │                           │
                release()                       │
                    │                           │
                    └───────────────────────────┘
                                    │
                               [UNBLOCKED]

Key operations:
├─ acquire():  Get permit, block if none
├─ release():  Return permit
├─ tryAcquire(): Non-blocking attempt
└─ availablePermits(): Current count`}
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

export default SemaphoreInternals;
