import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, ArrowLeft, Layers, Zap, Lock, Unlock, Activity, Settings, Shield } from 'lucide-react';
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

const SynchronizedInternals = ({ onBack, breadcrumb }) => {
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
      title: 'How synchronized Works',
      icon: <Zap className="w-5 h-5" />,
      content: `synchronized provides mutual exclusion using object monitors.

Every Java object has:
• Monitor (lock) - for synchronization
• Wait set - threads waiting on this object

synchronized behavior:
1. Acquire monitor (lock the object)
2. Execute critical section
3. Release monitor (unlock)

If monitor is held by another thread:
• Current thread blocks until monitor released
• Threads compete to acquire on release`,
      code: `// synchronized block
Object lock = new Object();
synchronized (lock) {
    // Only one thread can be here at a time
    // Holding lock's monitor
}

// synchronized method
class Counter {
    private int count = 0;

    public synchronized void increment() {
        // Locks on 'this' object
        count++;
    }

    public synchronized int getCount() {
        // Same lock as increment()
        return count;
    }
}

// static synchronized method
class StaticCounter {
    private static int count = 0;

    public static synchronized void increment() {
        // Locks on StaticCounter.class object
        count++;
    }
}

// Equivalent explicit locking:
synchronized (StaticCounter.class) {
    StaticCounter.count++;
}`
    },
    {
      title: 'Object Monitor Internals',
      icon: <Layers className="w-5 h-5" />,
      content: `The monitor is stored in the object's header (Mark Word).

Mark Word contains (64-bit):
• Lock state bits
• Hash code
• GC age
• Thread ID (when locked)

Lock states:
• Unlocked - no thread holds lock
• Biased - optimized for single-thread access
• Thin/Lightweight - uses CAS spinning
• Fat/Heavyweight - uses OS mutex

Lock inflation:
unlocked → biased → thin → fat`,
      code: `// Object header layout (64-bit JVM)
// ┌────────────────────────────────────────────────────────────┐
// │                    Mark Word (64 bits)                      │
// ├────────────────────────────────────────────────────────────┤
// │ Unlocked:  | unused:25 | hash:31 | unused:1 | age:4 | 01  │
// │ Biased:    | thread:54 | epoch:2 | unused:1 | age:4 | 101 │
// │ Thin Lock: |              ptr to lock record       | 00   │
// │ Fat Lock:  |           ptr to ObjectMonitor        | 10   │
// │ GC Mark:   |                                       | 11   │
// └────────────────────────────────────────────────────────────┘

// ObjectMonitor structure (fat lock)
class ObjectMonitor {
    void* _owner;           // Thread holding lock
    ObjectWaiter* _WaitSet; // Threads in wait()
    ObjectWaiter* _EntryList; // Threads trying to acquire
    volatile int _count;     // Recursion count
};

// Bytecode instructions
// synchronized (obj) { ... }
//
// monitorenter        // Acquire monitor
//   ... code ...
// monitorexit         // Release monitor
//
// Also has monitorexit in exception handler`
    },
    {
      title: 'Biased Locking',
      icon: <Shield className="w-5 h-5" />,
      content: `Biased locking optimizes for single-threaded access (disabled in Java 15+).

Observation: Most locks are never contended
• Same thread acquires lock repeatedly
• No need for atomic operations

Biased lock:
• First acquisition: bias to this thread
• Subsequent acquisitions: just check thread ID
• No CAS operations needed!

Revocation:
• Another thread tries to acquire
• Stop-the-world to unbias
• Upgrade to thin lock`,
      code: `// Biased locking (deprecated in Java 15)
// -XX:+UseBiasedLocking     Enable (pre-Java 15)
// -XX:-UseBiasedLocking     Disable
// -XX:BiasedLockingStartupDelay=0  Start immediately

// How biased locking works:
// Thread 1:
synchronized (obj) {  // First time
    // Check: is obj biased?
    // No → CAS to bias toward Thread 1
    // Mark Word now has Thread 1's ID
}

synchronized (obj) {  // Second time
    // Check: biased to me (Thread 1)?
    // Yes → no CAS, just enter!
}

// Thread 2 tries to acquire:
synchronized (obj) {
    // Check: biased to me?
    // No → bias revocation needed
    // Stop-the-world, unbias, inflate to thin lock
}

// Why deprecated in Java 15:
// - Complexity in JVM
// - Modern hardware has fast CAS
// - Containers/cloud: short-lived processes
// - Revocation cost outweighs benefits

// Biased locking was fully removed in Java 18`
    },
    {
      title: 'Thin and Fat Locks',
      icon: <Lock className="w-5 h-5" />,
      content: `Thin locks use CAS spinning. Fat locks use OS mutex.

Thin Lock (Lightweight):
• CAS on Mark Word
• Spin briefly if contended
• Low overhead for short critical sections

Fat Lock (Heavyweight):
• Allocates ObjectMonitor
• Uses OS mutex/condition
• Threads blocked at OS level

Inflation:
• Too much spinning → inflate to fat
• Never deflates (in most JVMs)`,
      code: `// Thin lock acquisition
// 1. CAS lock record pointer into Mark Word
// 2. If successful, acquired!
// 3. If failed, spin and retry

// Thin lock structure:
// Stack (thread's):
// ┌─────────────────┐
// │  Lock Record    │ ← Contains displaced Mark Word
// │  (on stack)     │
// └─────────────────┘
//         ↑
// Object Mark Word points here

// Fat lock (ObjectMonitor)
// ┌─────────────────────────────┐
// │ ObjectMonitor               │
// │ _owner: Thread*             │ ← Current owner
// │ _EntryList: ObjectWaiter*   │ ← Waiting to acquire
// │ _WaitSet: ObjectWaiter*     │ ← In wait()
// │ _count: int                 │ ← Recursion count
// └─────────────────────────────┘

// When inflation happens:
// 1. Contention detected (CAS failures)
// 2. wait()/notify() called
// 3. hashCode() on locked object

// Spin tuning:
// -XX:PreBlockSpin=10  (iterations before blocking)

// Monitor inflation example:
Object lock = new Object();

// Thread 1 and 2 contend
// After threshold spins, lock inflates to ObjectMonitor
// Thread 2 blocks at OS level (syscall)`
    },
    {
      title: 'wait() and notify()',
      icon: <Activity className="w-5 h-5" />,
      content: `wait() and notify() work with the object's monitor.

wait():
1. Release the monitor
2. Add thread to wait set
3. Block until notified
4. Re-acquire monitor when woken

notify():
1. Pick one thread from wait set
2. Move to entry list (ready to acquire)
3. Thread competes for monitor

notifyAll():
• Move ALL threads from wait set to entry list`,
      code: `// wait/notify pattern
class BlockingQueue<E> {
    private final Queue<E> queue = new LinkedList<>();
    private final int capacity;

    public synchronized void put(E item) throws InterruptedException {
        while (queue.size() == capacity) {
            wait();  // Release monitor, wait
        }
        queue.add(item);
        notifyAll();  // Wake waiting consumers
    }

    public synchronized E take() throws InterruptedException {
        while (queue.isEmpty()) {
            wait();  // Release monitor, wait
        }
        E item = queue.remove();
        notifyAll();  // Wake waiting producers
        return item;
    }
}

// CRITICAL: Always use while, not if!
// BAD:
if (queue.isEmpty())
    wait();
// After wakeup, queue might be empty again (spurious wakeup)

// GOOD:
while (queue.isEmpty())
    wait();
// Re-check condition after wakeup

// notify() vs notifyAll()
notify();    // Wake one thread (which one? undefined)
notifyAll(); // Wake all threads (they compete for lock)

// Rule: Use notifyAll() unless you're sure
// notify() can cause missed signals`
    },
    {
      title: 'Interview Questions',
      icon: <Settings className="w-5 h-5" />,
      content: `Common synchronized interview questions:

Q1: What is a monitor?
A: Lock mechanism in every Java object

Q2: synchronized method vs block?
A: Method locks 'this', block can lock any object

Q3: What are lock states?
A: Biased→Thin→Fat (lock inflation)

Q4: Why use while with wait()?
A: Guard against spurious wakeups

Q5: notify() vs notifyAll()?
A: notify=one thread, notifyAll=all threads

Q6: Can static method be synchronized?
A: Yes, locks on Class object`,
      code: `// Q1: Monitor demo
Object obj = new Object();
synchronized (obj) {  // Acquire obj's monitor
    // Critical section
}  // Release monitor

// Q2: Equivalence
public synchronized void method() { }
// is equivalent to:
public void method() {
    synchronized (this) { }
}

// Q3: Lock inflation
// Unlocked → Biased → Thin → Fat
// (Biased removed in Java 18)

// Q4: Spurious wakeup handling
synchronized (lock) {
    while (!condition) {  // WHILE, not IF
        lock.wait();
    }
}

// Q5: notify() danger
// 2 producers, 2 consumers, single-slot buffer
// Producer 1: puts item, notify()
// Happens to wake Producer 2 (already waiting)
// Producer 2: buffer full, waits
// Consumer 1 & 2: never woken!
// DEADLOCK with notify()
// notifyAll() would avoid this

// Q6: Static synchronized
class Example {
    public static synchronized void method() {
        // Locks on Example.class
    }
}

// Different locks:
synchronized (this)          // Instance lock
synchronized (Example.class) // Class lock
// Both can run simultaneously!`
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
            <h1 className={`text-3xl font-bold ${colors.heading}`}>Synchronized - Internal Workings</h1>
          </div>
          <p className={`text-lg ${colors.secondary} mb-6`}>
            Deep dive into synchronized: object monitors, lock inflation, biased locking, and wait/notify.
          </p>

          <div className={`${colors.card} rounded-xl p-4 mb-6 border ${colors.border}`}>
            <h3 className={`font-semibold ${colors.heading} mb-2`}>Lock States</h3>
            <pre className={`text-sm ${colors.secondary} font-mono whitespace-pre overflow-x-auto`}>
{`Lock Inflation (only inflates, never deflates):

  Unlocked ──→ Biased ──→ Thin ──→ Fat
     │          │          │        │
     │          │          │        └─ OS mutex (heavyweight)
     │          │          └─ CAS spinning (lightweight)
     │          └─ Single thread optimization (deprecated)
     └─ No lock held

Mark Word Layout (64-bit):
┌──────────────────────────────────────────────────────────┐
│ Unlocked: |   hash code   |   age   | 0 | 01            │
│ Biased:   |   thread ID   | epoch |age| 1 | 01          │
│ Thin:     |      ptr to lock record         | 00        │
│ Fat:      |      ptr to ObjectMonitor       | 10        │
└──────────────────────────────────────────────────────────┘`}
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

export default SynchronizedInternals;
