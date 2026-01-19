import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, ArrowLeft, Layers, Zap, Lock, Unlock, Users, Clock, AlertTriangle, Settings } from 'lucide-react';
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

const ReentrantLockInternals = ({ onBack, breadcrumb }) => {
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
      title: 'Why ReentrantLock?',
      icon: <Zap className="w-5 h-5" />,
      content: `ReentrantLock provides more flexibility than synchronized keyword.

Advantages over synchronized:
• Interruptible lock acquisition (lockInterruptibly)
• Timed lock attempts (tryLock with timeout)
• Non-blocking try (tryLock)
• Fairness option (FIFO ordering)
• Multiple Conditions per lock
• Can check if lock is held

When to use ReentrantLock:
• Need tryLock or lockInterruptibly
• Need fairness guarantee
• Need multiple wait/notify conditions
• Need to check lock status

When synchronized is enough:
• Simple critical sections
• No need for advanced features
• Simpler code, less error-prone`,
      code: `// synchronized - simple but limited
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
}

// Non-blocking try
if (lock.tryLock()) {
    try {
        // Got the lock
    } finally {
        lock.unlock();
    }
} else {
    // Couldn't get lock, do something else
}

// With timeout
if (lock.tryLock(1, TimeUnit.SECONDS)) {
    try {
        // Got the lock within 1 second
    } finally {
        lock.unlock();
    }
}

// Interruptible - can be interrupted while waiting
lock.lockInterruptibly();  // throws InterruptedException`
    },
    {
      title: 'Internal Structure (AQS)',
      icon: <Layers className="w-5 h-5" />,
      content: `ReentrantLock is built on AbstractQueuedSynchronizer (AQS).

AQS provides:
• State management (volatile int state)
• Wait queue for blocked threads
• CAS-based operations
• Template methods for lock implementations

ReentrantLock's state:
• state = 0: unlocked
• state > 0: locked (value = hold count)

Reentrancy:
• Same thread can acquire lock multiple times
• Each lock() increments state
• Each unlock() decrements state
• Released when state reaches 0`,
      code: `// Simplified ReentrantLock structure
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

    // Non-fair sync (default)
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
    }
}`
    },
    {
      title: 'Lock Acquisition',
      icon: <Lock className="w-5 h-5" />,
      content: `Lock acquisition uses CAS to atomically update state.

Non-fair (default):
1. CAS try to set state 0→1
2. If successful, set owner thread
3. If fails, check if reentrant
4. If not reentrant, enqueue and block

Fair:
1. Check if queue has waiters first
2. Only try CAS if no waiters (or reentrant)
3. FIFO order guaranteed

Reentrancy check:
• If owner == current thread, increment state
• Up to Integer.MAX_VALUE reentrancies`,
      code: `// Non-fair tryAcquire
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
}

// Fair tryAcquire
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
      title: 'AQS Wait Queue',
      icon: <Users className="w-5 h-5" />,
      content: `When a thread can't acquire the lock, it's added to CLH queue.

CLH Queue (Craig, Landin, Hagersten):
• Doubly-linked list of Nodes
• Each Node holds a thread reference
• Threads spin briefly, then park

Node states:
• CANCELLED (1): Thread gave up
• SIGNAL (-1): Must unpark successor
• CONDITION (-2): Waiting on Condition
• PROPAGATE (-3): For shared mode

When lock is released:
• Head node's successor is unpacked
• Unparked thread retries acquisition`,
      code: `// AQS Node structure
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
//                   waiting     waiting

// Enqueue when lock acquisition fails
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

// After enqueue - spin/park loop
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
      title: 'Condition Variables',
      icon: <Clock className="w-5 h-5" />,
      content: `ReentrantLock supports multiple Condition objects (vs single wait/notify).

Condition methods:
• await() - release lock and wait
• signal() - wake one waiting thread
• signalAll() - wake all waiting threads

Advantages over wait/notify:
• Multiple conditions per lock
• Can have separate queues for different events
• More readable code

Common pattern:
• One condition for "not full"
• Another condition for "not empty"`,
      code: `// Producer-Consumer with Conditions
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
}

// vs synchronized (only one wait set)
synchronized (lock) {
    while (condition)
        lock.wait();  // All waiters in same queue
    lock.notifyAll(); // Wake all, even unrelated
}`
    },
    {
      title: 'Fair vs Non-Fair',
      icon: <Settings className="w-5 h-5" />,
      content: `Fairness determines lock acquisition order.

Non-fair (default):
• Threads can "barge" - skip queue if lock is free
• Higher throughput (less context switches)
• Possible starvation

Fair:
• FIFO order strictly enforced
• Lower throughput (always checks queue)
• No starvation

Performance:
• Non-fair can be 10x faster under contention
• Fair prevents starvation but slower
• Default to non-fair unless fairness required`,
      code: `// Non-fair lock (default) - can barge
ReentrantLock unfairLock = new ReentrantLock();

// Thread 1 releases lock
// Thread 2 was waiting in queue
// Thread 3 just called lock()
// Thread 3 may acquire before Thread 2! (barging)

// Fair lock - FIFO order
ReentrantLock fairLock = new ReentrantLock(true);

// Thread 1 releases lock
// Thread 2 was waiting in queue
// Thread 3 just called lock()
// Thread 2 WILL acquire before Thread 3

// Fair tryAcquire checks queue first
protected final boolean tryAcquire(int acquires) {
    // ...
    if (c == 0) {
        if (!hasQueuedPredecessors() &&  // Fair check!
            compareAndSetState(0, acquires)) {
            // ...
        }
    }
    // ...
}

// hasQueuedPredecessors - check if others waiting
public final boolean hasQueuedPredecessors() {
    Node t = tail;
    Node h = head;
    Node s;
    return h != t &&
        ((s = h.next) == null || s.thread != Thread.currentThread());
}`
    },
    {
      title: 'Interview Questions',
      icon: <AlertTriangle className="w-5 h-5" />,
      content: `Common ReentrantLock interview questions:

Q1: ReentrantLock vs synchronized?
A: tryLock, timeout, interruptible, fairness, conditions

Q2: What is AQS?
A: Abstract framework for building synchronizers using state + wait queue

Q3: What does "reentrant" mean?
A: Same thread can acquire lock multiple times

Q4: Fair vs non-fair performance?
A: Non-fair is faster (barging), fair prevents starvation

Q5: Why always use try-finally?
A: Ensure unlock even if exception occurs

Q6: What is a Condition?
A: Like wait/notify but can have multiple per lock`,
      code: `// Q1: Key differences demo
ReentrantLock lock = new ReentrantLock();

// tryLock - non-blocking
if (lock.tryLock()) { /* ... */ }

// Timeout
if (lock.tryLock(1, TimeUnit.SECONDS)) { /* ... */ }

// Interruptible
lock.lockInterruptibly();

// Fairness
ReentrantLock fair = new ReentrantLock(true);

// Multiple conditions
Condition c1 = lock.newCondition();
Condition c2 = lock.newCondition();

// Q3: Reentrancy example
lock.lock();     // state = 1
lock.lock();     // state = 2 (same thread OK)
lock.unlock();   // state = 1
lock.unlock();   // state = 0 (released)

// Q5: Always use try-finally!
// BAD:
lock.lock();
doSomething();  // If exception, lock never released!
lock.unlock();

// GOOD:
lock.lock();
try {
    doSomething();
} finally {
    lock.unlock();  // Always executed
}

// Q6: Multiple conditions
Lock lock = new ReentrantLock();
Condition notFull = lock.newCondition();
Condition notEmpty = lock.newCondition();
// Threads waiting on notFull don't wake for notEmpty.signal()`
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
            <Lock className={`w-8 h-8 ${colors.accent}`} />
            <h1 className={`text-3xl font-bold ${colors.heading}`}>ReentrantLock - Internal Workings</h1>
          </div>
          <p className={`text-lg ${colors.secondary} mb-6`}>
            Deep dive into ReentrantLock: AQS framework, fairness, conditions, and lock acquisition internals.
          </p>

          <div className={`${colors.card} rounded-xl p-4 mb-6 border ${colors.border}`}>
            <h3 className={`font-semibold ${colors.heading} mb-2`}>Architecture Overview</h3>
            <pre className={`text-sm ${colors.secondary} font-mono whitespace-pre overflow-x-auto`}>
{`ReentrantLock
└── Sync (extends AQS)
    ├── NonfairSync (default)
    └── FairSync

AQS (AbstractQueuedSynchronizer):
├── state (int)           → 0=unlocked, >0=hold count
├── exclusiveOwnerThread  → thread holding lock
└── CLH Queue             → waiting threads
    head ←→ node1 ←→ node2 ←→ tail`}
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

export default ReentrantLockInternals;
