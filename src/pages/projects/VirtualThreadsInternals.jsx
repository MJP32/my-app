import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, ArrowLeft, Layers, Zap, Cpu, Users, Activity, Settings, GitBranch } from 'lucide-react';
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

const VirtualThreadsInternals = ({ onBack, breadcrumb }) => {
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
      title: 'Why Virtual Threads?',
      icon: <Zap className="w-5 h-5" />,
      content: `Virtual Threads (Java 21+) enable millions of concurrent threads efficiently.

Problem with Platform Threads:
• 1 OS thread per Java thread
• ~1MB stack per thread
• 10K threads = 10GB memory
• Context switching is expensive

Virtual Threads solution:
• Many virtual threads share few OS threads
• ~1KB initial stack (grows as needed)
• Millions of concurrent threads possible
• JVM handles scheduling

Project Loom brought this to Java 21.`,
      code: `// Platform thread (traditional) - limited to ~10K
Thread platformThread = new Thread(() -> {
    // Runs on dedicated OS thread
    doWork();
});

// Virtual thread (Java 21+) - millions possible
Thread virtualThread = Thread.startVirtualThread(() -> {
    // Runs on shared carrier thread
    doWork();
});

// Or using builder
Thread vt = Thread.ofVirtual()
    .name("my-virtual-thread")
    .start(() -> doWork());

// ExecutorService for virtual threads
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    // Each task gets its own virtual thread!
    for (int i = 0; i < 1_000_000; i++) {
        executor.submit(() -> {
            // 1 million concurrent operations
            return fetchData();
        });
    }
}

// Comparison:
// Platform threads: ~10K max, 10GB memory
// Virtual threads: 1M+, ~few GB memory`
    },
    {
      title: 'How Virtual Threads Work',
      icon: <Layers className="w-5 h-5" />,
      content: `Virtual threads are mounted on carrier threads (platform threads).

Execution model:
• Virtual thread runs on carrier thread
• Blocking operation → unmount from carrier
• Carrier picks up another virtual thread
• Operation completes → mount on available carrier

Key components:
• Virtual Thread - lightweight, JVM managed
• Carrier Thread - platform thread, runs virtual threads
• Scheduler - ForkJoinPool (default)

This is called "continuation" based scheduling.`,
      code: `// Carrier thread pool (default: ForkJoinPool)
// Size = number of CPU cores

// Virtual thread lifecycle:
// 1. Created (not yet scheduled)
Thread vt = Thread.ofVirtual().unstarted(() -> task());

// 2. Started (scheduled, waiting for carrier)
vt.start();

// 3. Running (mounted on carrier)
// Executes until blocking or completion

// 4. Parked (unmounted - waiting for I/O)
// socket.read() → virtual thread parks
// carrier thread runs another virtual thread

// 5. Unparked (ready to continue)
// I/O completes → virtual thread can continue

// 6. Terminated (completed)

// Internal structure (simplified)
class VirtualThread extends Thread {
    private Continuation continuation;  // Execution state
    private volatile int state;         // RUNNING, PARKED, etc.
    private Object parkBlocker;         // Why parked

    void park() {
        // Save state, unmount from carrier
        continuation.yield();
    }

    void unpark() {
        // Schedule to continue on carrier
        scheduler.execute(this::run);
    }
}`
    },
    {
      title: 'Blocking Operations',
      icon: <Activity className="w-5 h-5" />,
      content: `Virtual threads automatically yield on blocking operations.

Blocking-friendly operations:
• Thread.sleep()
• Socket I/O (read, write)
• BlockingQueue.take/put
• Lock acquisition
• File I/O (on Linux with io_uring)

What happens on blocking:
1. Virtual thread saves its stack (continuation)
2. Unmounts from carrier
3. Carrier picks up next virtual thread
4. When unblocked, virtual thread re-scheduled`,
      code: `// Blocking doesn't block the carrier!
Thread.startVirtualThread(() -> {
    // Virtual thread mounted on carrier

    Thread.sleep(1000);  // Blocking!
    // Virtual thread unmounts
    // Carrier runs other virtual threads
    // After 1s, virtual thread re-scheduled

    socket.read(buffer);  // More blocking
    // Same unmount/remount behavior

    processData(buffer);
});

// Why this is powerful:
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    List<Future<String>> futures = new ArrayList<>();

    // 10,000 concurrent HTTP requests!
    for (String url : urls) {
        futures.add(executor.submit(() -> {
            // Each blocks on I/O, but carrier isn't blocked
            return httpClient.send(request, bodyHandler);
        }));
    }

    // All run concurrently with just a few carrier threads
    for (Future<String> f : futures) {
        results.add(f.get());
    }
}

// What blocks the carrier (pinning):
// 1. synchronized block/method
// 2. Native code (JNI)
// Use ReentrantLock instead of synchronized!`
    },
    {
      title: 'Thread Pinning',
      icon: <Users className="w-5 h-5" />,
      content: `Pinning occurs when a virtual thread cannot unmount from its carrier.

Causes of pinning:
• synchronized block or method
• Native code via JNI
• Foreign function calls

Pinning is bad because:
• Carrier thread is blocked
• Reduces effective parallelism
• Defeats purpose of virtual threads

Solution: Use java.util.concurrent locks!`,
      code: `// BAD: synchronized causes pinning
class BadExample {
    private final Object lock = new Object();

    void process() {
        synchronized (lock) {
            Thread.sleep(1000);  // PINNED! Carrier blocked
        }
    }
}

// GOOD: ReentrantLock allows unmounting
class GoodExample {
    private final ReentrantLock lock = new ReentrantLock();

    void process() throws InterruptedException {
        lock.lock();
        try {
            Thread.sleep(1000);  // NOT pinned, carrier free
        } finally {
            lock.unlock();
        }
    }
}

// Detect pinning
// -Djdk.tracePinnedThreads=full
// -Djdk.tracePinnedThreads=short

// Output when pinned:
// Thread[#21,ForkJoinPool-1-worker-1,5,CarrierThreads]
//     at Object.wait(Native Method)
//     at MyClass.synchronized method (MyClass.java:10) <== monitors:1

// Common pinning sources:
// - Old libraries using synchronized
// - Database drivers (check for updates)
// - Legacy code

// Migration checklist:
// ✓ Replace synchronized with ReentrantLock
// ✓ Update libraries to virtual-thread-friendly versions
// ✓ Test with -Djdk.tracePinnedThreads`
    },
    {
      title: 'Structured Concurrency',
      icon: <GitBranch className="w-5 h-5" />,
      content: `Structured Concurrency (preview) helps manage virtual thread lifetimes.

Benefits:
• Parent waits for all children
• Cancellation propagates to children
• Clear ownership and lifetime
• No orphaned threads

StructuredTaskScope:
• ShutdownOnFailure - fail fast
• ShutdownOnSuccess - first result wins`,
      code: `// Structured Concurrency (preview in Java 21)
// --enable-preview required

Response handleRequest() throws Exception {
    try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
        // Fork subtasks
        Future<User> userFuture = scope.fork(() -> fetchUser());
        Future<Order> orderFuture = scope.fork(() -> fetchOrder());

        // Wait for all
        scope.join();           // Waits for both
        scope.throwIfFailed();  // Propagates exceptions

        // Both succeeded
        return new Response(userFuture.resultNow(),
                           orderFuture.resultNow());
    }
    // scope.close() cancels any incomplete tasks
}

// ShutdownOnSuccess - return first result
try (var scope = new StructuredTaskScope.ShutdownOnSuccess<String>()) {
    scope.fork(() -> fetchFromServer1());
    scope.fork(() -> fetchFromServer2());
    scope.fork(() -> fetchFromServer3());

    scope.join();
    return scope.result();  // First successful result
    // Other tasks are cancelled
}

// Custom scope
class MyScope extends StructuredTaskScope<String> {
    @Override
    protected void handleComplete(Future<String> future) {
        // Custom completion handling
    }
}`
    },
    {
      title: 'Interview Questions',
      icon: <Settings className="w-5 h-5" />,
      content: `Common Virtual Threads interview questions:

Q1: Virtual vs Platform threads?
A: Virtual=JVM-managed, lightweight; Platform=OS thread

Q2: How many virtual threads can you create?
A: Millions (limited by memory, not OS)

Q3: What is thread pinning?
A: Virtual thread stuck on carrier, can't unmount

Q4: How to avoid pinning?
A: Use ReentrantLock instead of synchronized

Q5: What is the carrier thread?
A: Platform thread that executes virtual threads

Q6: Are virtual threads preemptive?
A: No, they yield at blocking points`,
      code: `// Q1: Comparison
Thread platform = new Thread(() -> {});  // ~1MB stack
Thread virtual = Thread.ofVirtual().start(() -> {});  // ~1KB initial

// Q2: Create millions
for (int i = 0; i < 1_000_000; i++) {
    Thread.startVirtualThread(() -> {
        Thread.sleep(Duration.ofSeconds(1));
    });
}

// Q3 & Q4: Pinning
// BAD
synchronized (lock) { sleep(); }  // Pins carrier

// GOOD
lock.lock();
try { sleep(); }  // Carrier free
finally { lock.unlock(); }

// Q5: Carrier threads
// Default: ForkJoinPool.commonPool()
// Size: Runtime.availableProcessors()
// Customize: -Djdk.virtualThreadScheduler.parallelism=N

// Q6: Non-preemptive
Thread.startVirtualThread(() -> {
    while (true) {
        // CPU-bound loop - never yields!
        // Carrier is monopolized
        compute();
    }
});
// Virtual threads work best with I/O-bound tasks

// Best practices:
// ✓ Use for I/O-bound workloads
// ✓ Avoid synchronized, use j.u.c locks
// ✓ Don't pool virtual threads
// ✓ Use Executors.newVirtualThreadPerTaskExecutor()`
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
            <Cpu className={`w-8 h-8 ${colors.accent}`} />
            <h1 className={`text-3xl font-bold ${colors.heading}`}>Virtual Threads - Internal Workings</h1>
          </div>
          <p className={`text-lg ${colors.secondary} mb-6`}>
            Deep dive into Java 21 Virtual Threads: Project Loom, carrier threads, and million-thread scalability.
          </p>

          <div className={`${colors.card} rounded-xl p-4 mb-6 border ${colors.border}`}>
            <h3 className={`font-semibold ${colors.heading} mb-2`}>Virtual Thread Model</h3>
            <pre className={`text-sm ${colors.secondary} font-mono whitespace-pre overflow-x-auto`}>
{`Traditional Model:              Virtual Thread Model:
┌─────────────────────┐         ┌─────────────────────────────────┐
│   Platform Thread   │         │         Virtual Threads         │
│   (1 per request)   │         │  VT1  VT2  VT3  ...  VT1000000 │
└─────────────────────┘         └─────────────┬───────────────────┘
          │                                   │ mounted/unmounted
          ▼                                   ▼
┌─────────────────────┐         ┌─────────────────────────────────┐
│     OS Thread       │         │     Carrier Threads (few)       │
│   ~1MB per thread   │         │  CT1    CT2    CT3    CT4       │
└─────────────────────┘         └─────────────────────────────────┘
                                              │
10K threads = 10GB                            ▼
                                ┌─────────────────────────────────┐
                                │     OS Threads (= CPU cores)    │
                                └─────────────────────────────────┘
                                1M virtual threads ≈ few GB`}
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

export default VirtualThreadsInternals;
