import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, ArrowLeft, Layers, Zap, Clock, RotateCcw, Users, Settings } from 'lucide-react';
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

const CountDownLatchCyclicBarrier = ({ onBack, breadcrumb }) => {
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
      title: 'CountDownLatch - One-Time Gate',
      icon: <Clock className="w-5 h-5" />,
      content: `CountDownLatch allows threads to wait until a count reaches zero.

Key characteristics:
• One-shot: count can only go down, never reset
• Threads wait at await() until count reaches 0
• countDown() decrements by 1 (non-blocking)
• When count hits 0, all waiting threads released

Use cases:
• Wait for N threads to complete
• Wait for N events to occur
• Starting gun pattern (count = 1)`,
      code: `// CountDownLatch structure
public class CountDownLatch {
    private final Sync sync;

    // Uses AQS state as the count
    private static final class Sync extends AbstractQueuedSynchronizer {
        Sync(int count) {
            setState(count);
        }

        int getCount() {
            return getState();
        }

        // tryAcquireShared: succeed if count is 0
        protected int tryAcquireShared(int acquires) {
            return (getState() == 0) ? 1 : -1;
        }

        // tryReleaseShared: decrement count, signal if zero
        protected boolean tryReleaseShared(int releases) {
            for (;;) {
                int c = getState();
                if (c == 0) return false;
                int next = c - 1;
                if (compareAndSetState(c, next))
                    return next == 0;  // Signal if reached 0
            }
        }
    }
}

// Example: Wait for workers to complete
CountDownLatch latch = new CountDownLatch(3);

for (int i = 0; i < 3; i++) {
    new Thread(() -> {
        doWork();
        latch.countDown();  // Decrement count
    }).start();
}

latch.await();  // Wait until count reaches 0
System.out.println("All workers done!");

// Example: Starting gun pattern
CountDownLatch startSignal = new CountDownLatch(1);
CountDownLatch doneSignal = new CountDownLatch(5);

for (int i = 0; i < 5; i++) {
    new Thread(() -> {
        startSignal.await();  // Wait for start
        doWork();
        doneSignal.countDown();
    }).start();
}

// All threads ready, fire!
startSignal.countDown();
doneSignal.await();  // Wait for all to finish`
    },
    {
      title: 'CyclicBarrier - Reusable Sync Point',
      icon: <RotateCcw className="w-5 h-5" />,
      content: `CyclicBarrier allows threads to wait for each other at a sync point.

Key characteristics:
• Reusable: resets after all threads arrive
• All threads must call await() before any proceed
• Optional barrier action runs when all arrive
• Supports timeout and broken barrier handling

Use cases:
• Phased computation
• Parallel algorithms with sync points
• Simulations with discrete time steps`,
      code: `// CyclicBarrier structure
public class CyclicBarrier {
    private final ReentrantLock lock = new ReentrantLock();
    private final Condition trip = lock.newCondition();
    private final int parties;
    private final Runnable barrierCommand;
    private Generation generation = new Generation();
    private int count;  // Threads still waiting

    // Generation tracks each barrier cycle
    private static class Generation {
        boolean broken = false;
    }
}

// Basic usage
CyclicBarrier barrier = new CyclicBarrier(3, () -> {
    System.out.println("All threads arrived!");  // Barrier action
});

for (int i = 0; i < 3; i++) {
    new Thread(() -> {
        while (true) {
            doPhaseWork();
            barrier.await();  // Wait for others
            // All threads continue together
        }
    }).start();
}

// Example: Parallel matrix computation
class MatrixMultiplier {
    int[][] A, B, C;
    int numWorkers;
    CyclicBarrier barrier;

    void compute() {
        barrier = new CyclicBarrier(numWorkers, () -> {
            // Runs when all workers finish a phase
            System.out.println("Phase complete");
        });

        for (int w = 0; w < numWorkers; w++) {
            final int worker = w;
            new Thread(() -> {
                for (int phase = 0; phase < numPhases; phase++) {
                    computeMyRows(worker, phase);
                    barrier.await();  // Sync before next phase
                }
            }).start();
        }
    }
}

// await() behavior
int await() throws InterruptedException, BrokenBarrierException {
    final ReentrantLock lock = this.lock;
    lock.lock();
    try {
        int index = --count;  // One more arrived
        if (index == 0) {  // Last one!
            // Run barrier action
            if (barrierCommand != null)
                barrierCommand.run();
            // Wake everyone and reset
            nextGeneration();
            return 0;
        }

        // Not last, wait
        while (count > 0 && !generation.broken) {
            trip.await();
        }
        return index;
    } finally {
        lock.unlock();
    }
}`
    },
    {
      title: 'CountDownLatch vs CyclicBarrier',
      icon: <Users className="w-5 h-5" />,
      content: `Key differences between the two synchronizers:

CountDownLatch:
• One-shot (cannot reset)
• Any thread can countDown()
• Waiting threads != counting threads
• count can exceed number of threads

CyclicBarrier:
• Reusable (automatic reset)
• Waiting thread is counting thread
• Parties must equal waiting threads
• Optional barrier action

Choose based on use case:
• Waiting for events: CountDownLatch
• Threads syncing together: CyclicBarrier`,
      code: `// Comparison table
//
// Feature          | CountDownLatch    | CyclicBarrier
// -----------------+-------------------+------------------
// Reusable?        | No                | Yes
// Reset possible?  | No                | Yes (automatic)
// Barrier action?  | No                | Yes
// Who counts?      | Any thread        | Waiting threads
// Blocks on        | count > 0         | count > 0
// Released when    | count == 0        | all parties arrive

// CountDownLatch: N events before proceeding
CountDownLatch latch = new CountDownLatch(5);

// Multiple countDown() from same or different threads
latch.countDown();  // From any thread
latch.countDown();  // Any thread can call
latch.await();      // Different threads wait

// CyclicBarrier: N threads meet at sync point
CyclicBarrier barrier = new CyclicBarrier(3);

// Each waiting thread counts as one arrival
barrier.await();  // Thread 1 waits AND counts
barrier.await();  // Thread 2 waits AND counts
barrier.await();  // Thread 3 waits AND counts, all released!

// CyclicBarrier reuse
CyclicBarrier barrier = new CyclicBarrier(3);
for (int i = 0; i < 3; i++) {
    new Thread(() -> {
        for (int round = 0; round < 5; round++) {
            work();
            barrier.await();  // Reuses automatically
        }
    }).start();
}

// CountDownLatch cannot be reused
CountDownLatch latch = new CountDownLatch(3);
// ... after count reaches 0 ...
latch.await();  // Returns immediately forever
// Must create new CountDownLatch for reuse`
    },
    {
      title: 'Phaser - Advanced Synchronization',
      icon: <Layers className="w-5 h-5" />,
      content: `Phaser is a more flexible barrier introduced in Java 7.

Advantages over CyclicBarrier:
• Dynamic party registration/deregistration
• Multiple phases with different parties
• Supports tree-structured phasers
• Termination support

Use when:
• Number of parties varies
• Need to add/remove participants
• Complex multi-phase coordination`,
      code: `// Phaser structure
public class Phaser {
    private volatile long state;  // Encodes phase, parties, unarrived

    // State encoding:
    // [phase: 31 bits][parties: 16 bits][unarrived: 16 bits]
}

// Basic usage
Phaser phaser = new Phaser(3);  // 3 parties

for (int i = 0; i < 3; i++) {
    new Thread(() -> {
        for (int phase = 0; phase < 5; phase++) {
            work();
            phaser.arriveAndAwaitAdvance();
        }
    }).start();
}

// Dynamic registration
Phaser phaser = new Phaser(1);  // Self registered

new Thread(() -> {
    phaser.register();  // Add party dynamically
    work();
    phaser.arriveAndDeregister();  // Remove party
}).start();

phaser.arriveAndAwaitAdvance();
phaser.arriveAndDeregister();

// Phaser vs CyclicBarrier vs CountDownLatch
//
// Feature          | CountDownLatch | CyclicBarrier | Phaser
// -----------------+----------------+---------------+--------
// Reusable         | No             | Yes           | Yes
// Dynamic parties  | No             | No            | Yes
// Barrier action   | No             | Yes           | Yes*
// Termination      | No             | No            | Yes
// Tree structure   | No             | No            | Yes

// Termination example
Phaser phaser = new Phaser() {
    @Override
    protected boolean onAdvance(int phase, int parties) {
        return phase >= 5 || parties == 0;  // Terminate condition
    }
};

// Arrival without waiting
phaser.arrive();  // Arrive but don't wait
phaser.arriveAndAwaitAdvance();  // Arrive and wait`
    },
    {
      title: 'Internal Implementation (AQS)',
      icon: <Zap className="w-5 h-5" />,
      content: `Both CountDownLatch and CyclicBarrier use AQS internally.

CountDownLatch:
• Uses AQS shared mode
• State = remaining count
• Release when state becomes 0

CyclicBarrier:
• Uses ReentrantLock + Condition
• Not directly using AQS acquire/release
• Manual count and wait management`,
      code: `// CountDownLatch internal
public class CountDownLatch {
    private final Sync sync;

    private static final class Sync extends AbstractQueuedSynchronizer {
        Sync(int count) {
            setState(count);
        }

        // await() calls this
        protected int tryAcquireShared(int acquires) {
            return (getState() == 0) ? 1 : -1;
        }

        // countDown() calls this
        protected boolean tryReleaseShared(int releases) {
            for (;;) {
                int c = getState();
                if (c == 0) return false;
                int nextc = c - 1;
                if (compareAndSetState(c, nextc))
                    return nextc == 0;
            }
        }
    }

    public void await() throws InterruptedException {
        sync.acquireSharedInterruptibly(1);
    }

    public void countDown() {
        sync.releaseShared(1);
    }
}

// CyclicBarrier internal
public class CyclicBarrier {
    private final ReentrantLock lock = new ReentrantLock();
    private final Condition trip = lock.newCondition();
    private int count;

    public int await() throws InterruptedException, BrokenBarrierException {
        final ReentrantLock lock = this.lock;
        lock.lock();
        try {
            int index = --count;
            if (index == 0) {
                // Run barrier action, wake all
                final Runnable command = barrierCommand;
                if (command != null) command.run();
                nextGeneration();
                return 0;
            }

            for (;;) {
                trip.await();  // Wait on condition
                if (generation.broken)
                    throw new BrokenBarrierException();
                // Check if we should proceed
            }
        } finally {
            lock.unlock();
        }
    }
}`
    },
    {
      title: 'Interview Questions',
      icon: <Settings className="w-5 h-5" />,
      content: `Common interview questions:

Q1: CountDownLatch vs CyclicBarrier?
A: Latch is one-shot, Barrier is reusable

Q2: Can CountDownLatch be reset?
A: No, create a new one instead

Q3: What happens if await() times out in CyclicBarrier?
A: BrokenBarrierException for all waiting threads

Q4: What is Phaser?
A: Flexible barrier with dynamic party registration

Q5: Which uses AQS directly?
A: CountDownLatch uses AQS, CyclicBarrier uses Lock+Condition`,
      code: `// Q1: Key difference
// CountDownLatch: events → threads wait
// CyclicBarrier: threads → sync point

// Q2: Reset workaround
CountDownLatch latch = new CountDownLatch(n);
// ... after use ...
latch = new CountDownLatch(n);  // Create new

// Q3: Timeout handling
try {
    barrier.await(1, TimeUnit.SECONDS);
} catch (TimeoutException e) {
    // This thread timed out
} catch (BrokenBarrierException e) {
    // Another thread broke the barrier
}

// Broken barrier cascades to all waiting threads
CyclicBarrier barrier = new CyclicBarrier(3);
// Thread 1: barrier.await(1, SECONDS) - timeout
// Thread 2: barrier.await() - BrokenBarrierException!
// Thread 3: barrier.await() - BrokenBarrierException!

// Reset after broken
barrier.reset();  // Makes barrier usable again

// Q4: Phaser advantages
// - Dynamic party count
// - Termination support
// - More flexible than barrier

// Q5: Common pitfalls
// 1. CountDownLatch count too high
CountDownLatch latch = new CountDownLatch(10);
// Only 5 threads call countDown()
latch.await();  // Hangs forever!

// 2. CyclicBarrier wrong party count
CyclicBarrier barrier = new CyclicBarrier(3);
// Only 2 threads call await()
// All threads hang!

// 3. Forgetting timeout
latch.await(5, TimeUnit.SECONDS);  // Better!
barrier.await(5, TimeUnit.SECONDS);`
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
            <Users className={`w-8 h-8 ${colors.accent}`} />
            <h1 className={`text-3xl font-bold ${colors.heading}`}>CountDownLatch & CyclicBarrier</h1>
          </div>
          <p className={`text-lg ${colors.secondary} mb-6`}>
            Deep dive into thread synchronization: CountDownLatch, CyclicBarrier, and Phaser internals.
          </p>

          <div className={`${colors.card} rounded-xl p-4 mb-6 border ${colors.border}`}>
            <h3 className={`font-semibold ${colors.heading} mb-2`}>Synchronization Comparison</h3>
            <pre className={`text-sm ${colors.secondary} font-mono whitespace-pre overflow-x-auto`}>
{`CountDownLatch (One-shot):          CyclicBarrier (Reusable):
  count = 3                           parties = 3
     │                                    │
  countDown() ─────┐                  await() ───┐
  countDown() ─────┼──→ count=0       await() ───┼──→ all arrive
  countDown() ─────┘        │         await() ───┘        │
                            ↓                             ↓
                   await() returns            all released, reset

Use CountDownLatch for:              Use CyclicBarrier for:
- Waiting for N events               - N threads meeting at sync point
- One-time coordination              - Repeated synchronization
- Different counters/waiters         - All threads must participate`}
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

export default CountDownLatchCyclicBarrier;
