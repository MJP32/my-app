/**
 * Java 21 LTS Features Page
 *
 * Covers Virtual Threads, Pattern Matching for Switch, Record Patterns, and Sequenced Collections.
 * Uses the tab_template format with modal-based navigation.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const JAVA21_COLORS = {
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

const VirtualThreadsDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowVT" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ec4899" />
      </marker>
      <linearGradient id="vtGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#ec4899" />
      </linearGradient>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Virtual Threads Architecture
    </text>
    <rect x="30" y="50" width="140" height="60" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="100" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Virtual Thread</text>
    <text x="100" y="95" textAnchor="middle" fill="#e0e7ff" fontSize="9">1M+ possible</text>
    <rect x="30" y="130" width="140" height="60" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="100" y="155" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Virtual Thread</text>
    <text x="100" y="175" textAnchor="middle" fill="#e0e7ff" fontSize="9">Few KB each</text>
    <line x1="170" y1="80" x2="280" y2="110" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrowVT)"/>
    <line x1="170" y1="160" x2="280" y2="130" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrowVT)"/>
    <rect x="290" y="80" width="160" height="80" rx="8" fill="url(#vtGrad)" stroke="#ec4899" strokeWidth="2"/>
    <text x="370" y="110" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Carrier Thread</text>
    <text x="370" y="130" textAnchor="middle" fill="white" fontSize="10">(Platform Thread)</text>
    <text x="370" y="150" textAnchor="middle" fill="#fce7f3" fontSize="9">~CPU cores count</text>
    <line x1="450" y1="120" x2="530" y2="120" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrowVT)"/>
    <rect x="540" y="80" width="120" height="80" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="600" y="110" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">ForkJoinPool</text>
    <text x="600" y="130" textAnchor="middle" fill="white" fontSize="10">Work Stealing</text>
    <text x="600" y="150" textAnchor="middle" fill="#dcfce7" fontSize="9">Scheduler</text>
    <line x1="660" y1="120" x2="730" y2="120" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowVT)"/>
    <rect x="740" y="95" width="50" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="765" y="125" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">OS</text>
    <text x="200" y="210" textAnchor="middle" fill="#94a3b8" fontSize="10">Lightweight</text>
    <text x="370" y="210" textAnchor="middle" fill="#94a3b8" fontSize="10">Mounts/Unmounts</text>
    <text x="600" y="210" textAnchor="middle" fill="#94a3b8" fontSize="10">Schedules</text>
  </svg>
)

const PatternMatchingDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowPM" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Pattern Matching for Switch
    </text>
    <rect x="50" y="60" width="120" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="110" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Object Input</text>
    <line x1="170" y1="85" x2="230" y2="85" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowPM)"/>
    <rect x="240" y="40" width="160" height="90" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="320" y="65" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">switch (obj)</text>
    <text x="320" y="85" textAnchor="middle" fill="#94a3b8" fontSize="10">{`case String s ->`}</text>
    <text x="320" y="100" textAnchor="middle" fill="#94a3b8" fontSize="10">{`case Integer i ->`}</text>
    <text x="320" y="115" textAnchor="middle" fill="#94a3b8" fontSize="10">{`case null ->`}</text>
    <line x1="400" y1="65" x2="470" y2="55" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowPM)"/>
    <line x1="400" y1="85" x2="470" y2="85" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowPM)"/>
    <line x1="400" y1="105" x2="470" y2="115" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowPM)"/>
    <rect x="480" y="35" width="130" height="35" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="545" y="57" textAnchor="middle" fill="white" fontSize="10">String Handler</text>
    <rect x="480" y="75" width="130" height="35" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="545" y="97" textAnchor="middle" fill="white" fontSize="10">Integer Handler</text>
    <rect x="480" y="115" width="130" height="35" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="545" y="137" textAnchor="middle" fill="white" fontSize="10">Null Handler</text>
    <line x1="610" y1="52" x2="670" y2="85" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowPM)"/>
    <line x1="610" y1="92" x2="670" y2="92" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowPM)"/>
    <line x1="610" y1="132" x2="670" y2="99" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowPM)"/>
    <rect x="680" y="60" width="100" height="65" rx="8" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="730" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Result</text>
    <text x="730" y="110" textAnchor="middle" fill="#fce7f3" fontSize="9">Type-safe</text>
    <text x="320" y="180" textAnchor="middle" fill="#64748b" fontSize="11">Type patterns + Guards + Null handling</text>
  </svg>
)

const RecordPatternsDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowRP" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Record Pattern Destructuring
    </text>
    <rect x="40" y="55" width="180" height="90" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="130" y="80" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Record</text>
    <text x="130" y="100" textAnchor="middle" fill="#e0e7ff" fontSize="10">Point(int x, int y)</text>
    <text x="130" y="120" textAnchor="middle" fill="#e0e7ff" fontSize="10">Circle(Point c, int r)</text>
    <text x="130" y="135" textAnchor="middle" fill="#c4b5fd" fontSize="9">Nested Records</text>
    <line x1="220" y1="100" x2="290" y2="100" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowRP)"/>
    <rect x="300" y="50" width="200" height="100" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">Pattern Match</text>
    <text x="400" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">case Point(int x, int y)</text>
    <text x="400" y="115" textAnchor="middle" fill="#94a3b8" fontSize="9">case Circle(Point(x,y), r)</text>
    <text x="400" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">+ when guards</text>
    <line x1="500" y1="75" x2="560" y2="65" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowRP)"/>
    <line x1="500" y1="100" x2="560" y2="100" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowRP)"/>
    <line x1="500" y1="125" x2="560" y2="135" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowRP)"/>
    <rect x="570" y="45" width="80" height="30" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="610" y="65" textAnchor="middle" fill="white" fontSize="10">x = 3</text>
    <rect x="570" y="85" width="80" height="30" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="610" y="105" textAnchor="middle" fill="white" fontSize="10">y = 4</text>
    <rect x="570" y="125" width="80" height="30" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="610" y="145" textAnchor="middle" fill="white" fontSize="10">r = 5</text>
    <line x1="650" y1="100" x2="700" y2="100" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrowRP)"/>
    <rect x="710" y="75" width="70" height="50" rx="8" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="745" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Use!</text>
    <text x="400" y="185" textAnchor="middle" fill="#64748b" fontSize="11">Destructure nested records in one expression</text>
  </svg>
)

const SequencedCollectionsDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowSC" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Sequenced Collections Hierarchy
    </text>
    <rect x="280" y="45" width="240" height="45" rx="8" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="400" y="72" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">{`SequencedCollection<E>`}</text>
    <line x1="320" y1="90" x2="200" y2="120" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowSC)"/>
    <line x1="480" y1="90" x2="600" y2="120" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowSC)"/>
    <rect x="100" y="125" width="200" height="40" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="200" y="150" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">{`SequencedSet<E>`}</text>
    <rect x="500" y="125" width="200" height="40" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="600" y="150" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">{`SequencedMap<K,V>`}</text>
    <line x1="200" y1="165" x2="200" y2="185" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowSC)"/>
    <line x1="600" y1="165" x2="600" y2="185" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowSC)"/>
    <rect x="80" y="190" width="100" height="25" rx="4" fill="rgba(59, 130, 246, 0.3)" stroke="#60a5fa" strokeWidth="1"/>
    <text x="130" y="207" textAnchor="middle" fill="#60a5fa" fontSize="9">LinkedHashSet</text>
    <rect x="200" y="190" width="80" height="25" rx="4" fill="rgba(59, 130, 246, 0.3)" stroke="#60a5fa" strokeWidth="1"/>
    <text x="240" y="207" textAnchor="middle" fill="#60a5fa" fontSize="9">TreeSet</text>
    <rect x="520" y="190" width="100" height="25" rx="4" fill="rgba(139, 92, 246, 0.3)" stroke="#a78bfa" strokeWidth="1"/>
    <text x="570" y="207" textAnchor="middle" fill="#a78bfa" fontSize="9">LinkedHashMap</text>
    <rect x="640" y="190" width="80" height="25" rx="4" fill="rgba(139, 92, 246, 0.3)" stroke="#a78bfa" strokeWidth="1"/>
    <text x="680" y="207" textAnchor="middle" fill="#a78bfa" fontSize="9">TreeMap</text>
    <text x="400" y="165" textAnchor="middle" fill="#64748b" fontSize="10">List, Deque implement SequencedCollection</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function Java21({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'virtual-threads',
      name: 'Virtual Threads',
      icon: '🧵',
      color: '#8b5cf6',
      description: 'Lightweight JVM-managed threads enabling massive concurrency with simple blocking code.',
      diagram: VirtualThreadsDiagram,
      details: [
        {
          name: 'Lightweight Threads',
          explanation: 'Virtual threads are JVM-managed lightweight threads, not OS threads. You can create millions with minimal overhead - each uses only KB vs MB for platform threads. This is revolutionary for concurrent programming, enabling massive scalability without complex async code.',
          codeExample: `import java.time.Duration;

// Creating millions of virtual threads - Java 21
public class VirtualThreadsDemo {
    public static void main(String[] args) throws InterruptedException {
        // NEW in Java 21 - Virtual threads (unlimited scalability)
        Thread virtualThread = Thread.startVirtualThread(() -> {
            System.out.println("Virtual thread: " + Thread.currentThread());
            System.out.println("Is virtual: " + Thread.currentThread().isVirtual());
        });
        virtualThread.join();

        // Creating 1 MILLION virtual threads - impossible with platform threads!
        long start = System.currentTimeMillis();
        Thread[] threads = new Thread[1_000_000];

        for (int i = 0; i < 1_000_000; i++) {
            final int taskId = i;
            threads[i] = Thread.startVirtualThread(() -> {
                try {
                    Thread.sleep(Duration.ofMillis(100));
                    if (taskId % 100000 == 0) {
                        System.out.println("Task " + taskId + " completed");
                    }
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            });
        }

        for (Thread t : threads) { t.join(); }
        System.out.println("Completed 1M tasks in " +
            (System.currentTimeMillis() - start) + "ms");
    }
}`
        },
        {
          name: 'Simple Threading Model',
          explanation: 'Write thread-per-request code that scales without reactive programming complexity. Blocking operations automatically yield the carrier thread. The JVM handles scheduling automatically - no manual async/await needed. This preserves natural flow control with simple, synchronous code style.',
          codeExample: `import java.net.URI;
import java.net.http.*;
import java.util.concurrent.*;

// Thread-per-request pattern with Virtual Threads - Java 21
public class ThreadPerRequestDemo {
    public static void main(String[] args) throws InterruptedException {
        HttpClient client = HttpClient.newHttpClient();

        // Create virtual thread executor - NEW in Java 21
        try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {
            // Simulate 10,000 concurrent HTTP requests
            for (int i = 0; i < 10_000; i++) {
                final int requestId = i;
                executor.submit(() -> {
                    try {
                        // Simple blocking code - no callbacks!
                        HttpRequest request = HttpRequest.newBuilder()
                            .uri(URI.create("https://api.example.com/data/" + requestId))
                            .build();

                        // This blocks virtual thread, NOT platform thread
                        HttpResponse<String> response = client.send(
                            request, HttpResponse.BodyHandlers.ofString());

                        Thread.sleep(100); // Simulate processing
                        if (requestId % 1000 == 0) {
                            System.out.println("Request " + requestId + ": " +
                                response.statusCode());
                        }
                    } catch (Exception e) {
                        System.err.println("Request " + requestId + " failed");
                    }
                });
            }
        }
        System.out.println("All 10,000 requests completed!");
    }
}`
        },
        {
          name: 'Creation Methods',
          explanation: 'Multiple ways to create virtual threads: Thread.startVirtualThread(runnable) starts immediately, Executors.newVirtualThreadPerTaskExecutor() provides an executor service, Thread.ofVirtual().start(runnable) uses builder pattern, and Thread.ofVirtual().factory() creates a thread factory. All work as drop-in replacements for existing blocking APIs.',
          codeExample: `import java.util.concurrent.*;

// Different ways to create Virtual Threads - Java 21
public class VirtualThreadCreation {
    public static void main(String[] args) throws Exception {
        // Method 1: Thread.startVirtualThread() - simple and direct
        Thread vThread1 = Thread.startVirtualThread(() -> {
            System.out.println("Method 1: " + Thread.currentThread());
        });
        vThread1.join();

        // Method 2: Thread.ofVirtual() - more control
        Thread vThread2 = Thread.ofVirtual()
            .name("my-virtual-thread")
            .unstarted(() -> {
                System.out.println("Method 2: " + Thread.currentThread().getName());
            });
        vThread2.start();
        vThread2.join();

        // Method 3: Virtual thread executor - best for many tasks
        try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {
            Future<String> future = executor.submit(() -> {
                return "Result from virtual thread";
            });
            System.out.println("Method 3: " + future.get());
        }

        // Method 4: Thread.Builder for custom configuration
        ThreadFactory factory = Thread.ofVirtual()
            .name("worker-", 0)
            .factory();

        Thread vThread4 = factory.newThread(() -> {
            System.out.println("Method 4: " + Thread.currentThread().getName());
        });
        vThread4.start();
        vThread4.join();
    }
}`
        },
        {
          name: 'Carrier Threads',
          explanation: 'Virtual threads run on carrier platform threads using ForkJoinPool by default. The number of carriers approximately equals CPU cores - a small fixed pool supports unlimited virtual threads. When a virtual thread blocks, it automatically unmounts from its carrier, freeing it for other virtual threads. Work-stealing ensures optimal CPU utilization.',
          codeExample: `import java.time.Duration;
import java.util.concurrent.locks.LockSupport;

// Understanding Carrier Threads - Java 21
public class CarrierThreadDemo {
    public static void main(String[] args) throws InterruptedException {
        System.out.println("Available processors: " +
            Runtime.getRuntime().availableProcessors());

        // Create 100 virtual threads, but only ~10 carrier threads
        for (int i = 0; i < 100; i++) {
            final int threadNum = i;
            Thread.startVirtualThread(() -> {
                System.out.println("VT " + threadNum + " on: " + Thread.currentThread());
                try {
                    // Blocks virtual thread, releases carrier
                    Thread.sleep(Duration.ofMillis(100));
                    // After waking, might be on different carrier!
                    System.out.println("VT " + threadNum + " resumed on: " +
                        Thread.currentThread());

                    // CPU-bound work - stays on same carrier
                    long sum = 0;
                    for (long j = 0; j < 1_000_000; j++) sum += j;

                    LockSupport.parkNanos(Duration.ofMillis(10).toNanos());
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            });
        }
        Thread.sleep(2000);
        // Key: 100 virtual threads sharing only ~8-10 carriers!
    }
}`
        },
        {
          name: 'Performance Benefits',
          explanation: 'Virtual threads handle millions of concurrent requests on modest hardware with no thread pool size limits. They automatically scale with load while eliminating thread pool tuning complexity. Ideal for I/O-bound workloads like web services and APIs, they provide minimal overhead compared to async alternatives.',
          codeExample: `import java.time.*;
import java.util.concurrent.*;

// Performance comparison: Platform vs Virtual Threads
public class PerformanceComparison {
    static void simulateIo() throws InterruptedException {
        Thread.sleep(Duration.ofMillis(100)); // Simulate I/O
    }

    // OLD WAY: Platform thread pool (limited scalability)
    static void platformThreadApproach() throws Exception {
        Instant start = Instant.now();
        ExecutorService executor = Executors.newFixedThreadPool(1000);
        CountDownLatch latch = new CountDownLatch(10_000);

        for (int i = 0; i < 10_000; i++) {
            executor.submit(() -> {
                try { simulateIo(); }
                catch (InterruptedException e) { Thread.currentThread().interrupt(); }
                finally { latch.countDown(); }
            });
        }
        latch.await();
        executor.shutdown();
        System.out.println("Platform (pool=1000): " +
            Duration.between(start, Instant.now()).toMillis() + "ms");
        // Result: ~1000ms (10 waves of 1000 threads)
    }

    // NEW WAY: Virtual threads (unlimited scalability)
    static void virtualThreadApproach() throws Exception {
        Instant start = Instant.now();
        ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor();
        CountDownLatch latch = new CountDownLatch(10_000);

        for (int i = 0; i < 10_000; i++) {
            executor.submit(() -> {
                try { simulateIo(); }
                catch (InterruptedException e) { Thread.currentThread().interrupt(); }
                finally { latch.countDown(); }
            });
        }
        latch.await();
        executor.shutdown();
        System.out.println("Virtual (unlimited): " +
            Duration.between(start, Instant.now()).toMillis() + "ms");
        // Result: ~100ms (all 10,000 concurrent!) - 10x faster!
    }

    public static void main(String[] args) throws Exception {
        platformThreadApproach();
        virtualThreadApproach();
    }
}`
        },
        {
          name: 'Debugging & Monitoring',
          explanation: 'Virtual threads have full debugger support in IDEs with proper stack traces. JFR (Java Flight Recorder) provides events for virtual thread lifecycle. Thread dumps include virtual threads, and standard JMX monitoring works. Note: ThreadLocal works but use carefully as it creates an instance per virtual thread, potentially using lots of memory with millions of threads.',
          codeExample: `import java.util.concurrent.Executors;

// Debugging Virtual Threads - Java 21
public class VirtualThreadDebugging {
    private static final ThreadLocal<String> threadLocal =
        ThreadLocal.withInitial(() -> "default");

    public static void main(String[] args) throws InterruptedException {
        // 1. Checking if thread is virtual
        Thread.startVirtualThread(() -> {
            Thread current = Thread.currentThread();
            System.out.println("Thread: " + current);
            System.out.println("Is virtual: " + current.isVirtual());
            System.out.println("Is daemon: " + current.isDaemon()); // Always true
            System.out.println("Thread ID: " + current.threadId());
        }).join();

        // 2. ThreadLocal usage (be careful - many threads!)
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 0; i < 10; i++) {
                final int taskId = i;
                executor.submit(() -> {
                    threadLocal.set("task-" + taskId);
                    System.out.println("Task " + taskId + ": " + threadLocal.get());
                    // WARNING: With 1M virtual threads, ThreadLocal uses lots of memory!
                });
            }
        }

        // 3. Monitoring virtual threads
        Thread vThread = Thread.ofVirtual().name("monitored-thread").start(() -> {
            try { Thread.sleep(1000); }
            catch (InterruptedException e) { Thread.currentThread().interrupt(); }
        });

        System.out.println("Name: " + vThread.getName());
        System.out.println("State: " + vThread.getState());
        System.out.println("Alive: " + vThread.isAlive());
        vThread.join();

        // JFR events: jdk.VirtualThreadStart, jdk.VirtualThreadEnd,
        // jdk.VirtualThreadPinned (when carrier is pinned)
    }
}`
        }
      ]
    },
    {
      id: 'pattern-matching-switch',
      name: 'Pattern Matching for Switch',
      icon: '🔀',
      color: '#3b82f6',
      description: 'Enhanced switch expressions with type patterns, guards, and null handling for cleaner code.',
      diagram: PatternMatchingDiagram,
      details: [
        {
          name: 'Type Patterns',
          explanation: 'Match and bind types directly in switch cases: case String s -> ... creates a pattern variable automatically scoped to the branch. This eliminates cascading if-instanceof chains and works with sealed classes for exhaustive checking. Type inference handles complex hierarchies automatically.',
          codeExample: `// Type Patterns in Switch - Java 21
public class TypePatternsDemo {
    // OLD WAY: Ugly if-instanceof chains
    static String formatOld(Object obj) {
        if (obj instanceof String s) {
            return "String: " + s.toUpperCase();
        } else if (obj instanceof Integer i) {
            return "Integer: " + (i * 2);
        } else if (obj == null) {
            return "null";
        }
        return "Unknown: " + obj;
    }

    // NEW in Java 21: Pattern matching switch
    static String formatNew(Object obj) {
        return switch (obj) {
            case String s  -> "String: " + s.toUpperCase();
            case Integer i -> "Integer: " + (i * 2);
            case Double d  -> "Double: " + String.format("%.2f", d);
            case null      -> "null";
            default        -> "Unknown: " + obj;
        };
    }

    // Works with sealed types for exhaustiveness
    sealed interface Shape permits Circle, Rectangle, Triangle {}
    record Circle(double radius) implements Shape {}
    record Rectangle(double width, double height) implements Shape {}
    record Triangle(double base, double height) implements Shape {}

    static double calculateArea(Shape shape) {
        // No default needed - compiler knows all types!
        return switch (shape) {
            case Circle c -> Math.PI * c.radius() * c.radius();
            case Rectangle r -> r.width() * r.height();
            case Triangle t -> 0.5 * t.base() * t.height();
        };
    }

    public static void main(String[] args) {
        System.out.println(formatNew("hello"));  // String: HELLO
        System.out.println(formatNew(42));       // Integer: 84
        System.out.println(calculateArea(new Circle(5.0))); // 78.54...
    }
}`
        },
        {
          name: 'Guarded Patterns',
          explanation: 'Add conditions to type patterns with the when clause: case String s when s.length() > 5 -> ... Guards are evaluated after the pattern matches. Multiple guards for the same type are allowed, and patterns are matched top to bottom with the first matching guarded pattern winning.',
          codeExample: `// Guarded Patterns with 'when' clause - Java 21
public class GuardedPatternsDemo {
    static String categorize(Object obj) {
        return switch (obj) {
            // Guards with 'when' - NEW in Java 21
            case String s when s.isEmpty()     -> "Empty string";
            case String s when s.length() < 5  -> "Short: " + s;
            case String s when s.length() < 10 -> "Medium: " + s;
            case String s -> "Long: " + s.substring(0, 10) + "...";

            case Integer i when i < 0          -> "Negative: " + i;
            case Integer i when i == 0         -> "Zero";
            case Integer i when i < 100        -> "Small positive: " + i;
            case Integer i                     -> "Large positive: " + i;

            case null                          -> "null value";
            default                            -> "Unknown type";
        };
    }

    record Person(String name, int age, boolean isStudent) {}

    static String describeStatus(Object obj) {
        return switch (obj) {
            case Person p when p.age() < 18 && p.isStudent() ->
                p.name() + " is a minor student";
            case Person p when p.age() < 18 ->
                p.name() + " is a minor";
            case Person p when p.age() >= 65 ->
                p.name() + " is a senior citizen";
            case Person p when p.isStudent() ->
                p.name() + " is an adult student";
            case Person p ->
                p.name() + " is an adult";
            case null -> "No person";
            default   -> "Not a person";
        };
    }

    public static void main(String[] args) {
        System.out.println(categorize("Hi"));   // Short: Hi
        System.out.println(categorize(-5));     // Negative: -5
        System.out.println(describeStatus(new Person("Alice", 16, true)));
        // Alice is a minor student
    }
}`
        },
        {
          name: 'Null Handling',
          explanation: 'Explicit null cases in switch: case null -> ... provides dedicated null handling without throwing NullPointerException. You can combine null with default: case null, default -> ... Before Java 21, switch on null threw NPE and required separate null checks.',
          codeExample: `// Null Handling in Switch - Java 21
public class NullHandlingDemo {
    // OLD WAY: NullPointerException risk
    static String processOld(String value) {
        if (value == null) return "null value";  // Required separate check
        return switch (value) {
            case "foo" -> "Found foo";
            case "bar" -> "Found bar";
            default -> "Other: " + value;
        };
    }

    // NEW in Java 21: Built-in null handling
    static String processNew(String value) {
        return switch (value) {
            case null  -> "null value";        // Explicit null case
            case "foo" -> "Found foo";
            case "bar" -> "Found bar";
            default    -> "Other: " + value;
        };
    }

    // Can combine null with default
    static String processNullAsDefault(String value) {
        return switch (value) {
            case "foo" -> "Found foo";
            case "bar" -> "Found bar";
            case null, default -> "Not foo or bar";
        };
    }

    // Null with type patterns
    static String describeObject(Object obj) {
        return switch (obj) {
            case null           -> "Got null";
            case String s       -> "String: " + s;
            case Integer i      -> "Integer: " + i;
            case Object o       -> "Other: " + o.getClass().getSimpleName();
        };
    }

    public static void main(String[] args) {
        System.out.println(processNew(null));     // null value
        System.out.println(processNew("foo"));    // Found foo
        System.out.println(describeObject(null)); // Got null
        System.out.println(describeObject("hi")); // String: hi
    }
}`
        },
        {
          name: 'Arrow vs Colon Syntax',
          explanation: 'Arrow syntax (case X -> ...) is the modern recommended style with no fall-through errors and direct value returns. Colon syntax (case X: ... break;) is the traditional style requiring explicit break statements. Arrow syntax supports multiple cases (case A, B, C ->) and block expressions with yield.',
          codeExample: `// Arrow vs Colon Syntax - Java 21
public class ArrowVsColonDemo {
    // OLD: Traditional colon syntax (error-prone)
    static String getDayTypeOld(String day) {
        String result;
        switch (day) {
            case "Monday": case "Tuesday": case "Wednesday":
            case "Thursday": case "Friday":
                result = "Weekday";
                break;
            case "Saturday": case "Sunday":
                result = "Weekend";
                break;
            default:
                result = "Invalid";
                break;
        }
        return result;
    }

    // NEW: Arrow syntax (no fall-through, can return)
    static String getDayTypeNew(String day) {
        return switch (day) {
            case "Monday", "Tuesday", "Wednesday",
                 "Thursday", "Friday" -> "Weekday";
            case "Saturday", "Sunday" -> "Weekend";
            default -> "Invalid";
        };
    }

    // Arrow syntax with blocks and yield
    static String analyzeNumber(int num) {
        return switch (num) {
            case 0 -> "Zero";
            case 1, 2, 3, 4, 5 -> {
                String result = "Small positive: " + num;
                System.out.println("Processing: " + result);
                yield result;  // yield for block expressions
            }
            default -> {
                if (num > 0) yield "Large positive: " + num;
                else yield "Negative: " + num;
            }
        };
    }

    public static void main(String[] args) {
        System.out.println(getDayTypeNew("Monday"));   // Weekday
        System.out.println(getDayTypeNew("Saturday")); // Weekend
        System.out.println(analyzeNumber(3));          // Small positive: 3
    }
}`
        }
      ]
    },
    {
      id: 'record-patterns',
      name: 'Record Patterns',
      icon: '📦',
      color: '#8b5cf6',
      description: 'Destructure records directly in switch and instanceof with nested pattern support.',
      diagram: RecordPatternsDiagram,
      details: [
        {
          name: 'Pattern Destructuring',
          explanation: 'Extract record components directly: if (obj instanceof Point(int x, int y)) gives you x and y without accessor calls. Components are automatically scoped and the syntax is concise. This eliminates intermediate variables and works with instanceof statements.',
          codeExample: `// Record Pattern Destructuring - Java 21
public class RecordDestructuringDemo {
    record Point(int x, int y) {}
    record Person(String name, int age) {}
    record Employee(Person person, String department, double salary) {}

    // OLD WAY: Manual accessor calls
    static void printPointOld(Object obj) {
        if (obj instanceof Point) {
            Point p = (Point) obj;
            int x = p.x();
            int y = p.y();
            System.out.println("Point at (" + x + ", " + y + ")");
        }
    }

    // NEW in Java 21: Direct destructuring
    static void printPointNew(Object obj) {
        if (obj instanceof Point(int x, int y)) {
            // x and y automatically extracted!
            System.out.println("Point at (" + x + ", " + y + ")");
        }
    }

    // Multiple instanceof with destructuring
    static String describe(Object obj) {
        if (obj instanceof Point(int x, int y)) {
            return "Point: x=" + x + ", y=" + y;
        } else if (obj instanceof Person(String name, int age)) {
            return "Person: " + name + ", age " + age;
        } else if (obj instanceof Employee(
                Person(String name, int age), String dept, double salary)) {
            return name + " (age " + age + ") in " + dept + ", $" + salary;
        }
        return "Unknown";
    }

    // Destructuring with guards
    static boolean isOnAxis(Object obj) {
        return obj instanceof Point(int x, int y) && (x == 0 || y == 0);
    }

    public static void main(String[] args) {
        printPointNew(new Point(3, 4));  // Point at (3, 4)
        System.out.println(describe(new Person("Alice", 30)));
        // Person: Alice, age 30
    }
}`
        },
        {
          name: 'Nested Patterns',
          explanation: 'Destructure entire object graphs with deep nesting: case Line(Point(int x1, int y1), Point(int x2, int y2)). Arbitrary nesting depth is supported - perfect for tree structures and complex types. One pattern replaces many method calls.',
          codeExample: `// Nested Record Patterns - Java 21
public class NestedPatternsDemo {
    record Point(int x, int y) {}
    record Line(Point start, Point end) {}
    record Triangle(Point a, Point b, Point c) {}
    record BoundingBox(Point topLeft, Point bottomRight) {}
    record Shape(String name, BoundingBox box) {}

    // Deep nesting with switch
    static String analyzeShape(Object obj) {
        return switch (obj) {
            // 3 levels deep!
            case Shape(String name,
                       BoundingBox(Point(int x1, int y1),
                                   Point(int x2, int y2))) -> {
                int width = x2 - x1;
                int height = y2 - y1;
                yield name + " bounds: " + width + "x" + height;
            }

            case Triangle(Point(int x1, int y1),
                          Point(int x2, int y2),
                          Point(int x3, int y3)) -> {
                double area = Math.abs((x1 * (y2 - y3) +
                                        x2 * (y3 - y1) +
                                        x3 * (y1 - y2)) / 2.0);
                yield "Triangle area: " + area;
            }

            case Line(Point(int x1, int y1), Point(int x2, int y2))
                 when x1 == x2 -> "Vertical line at x=" + x1;

            case Line(Point(int x1, int y1), Point(int x2, int y2))
                 when y1 == y2 -> "Horizontal line at y=" + y1;

            case Line(Point(int x1, int y1), Point(int x2, int y2)) ->
                "Diagonal from (" + x1 + "," + y1 + ") to (" + x2 + "," + y2 + ")";

            case null -> "null";
            default -> "Unknown shape";
        };
    }

    public static void main(String[] args) {
        Line line = new Line(new Point(0, 0), new Point(3, 4));
        System.out.println(analyzeShape(line));
        // Diagonal from (0,0) to (3,4)

        Shape shape = new Shape("Rectangle",
            new BoundingBox(new Point(10, 20), new Point(50, 80)));
        System.out.println(analyzeShape(shape));
        // Rectangle bounds: 40x60
    }
}`
        },
        {
          name: 'Switch Integration',
          explanation: 'Record patterns work seamlessly in switch expressions with sealed types for exhaustive matching. Combine with guards using when clauses. The compiler verifies all cases are covered when using sealed hierarchies - no default case needed.',
          codeExample: `// Record Patterns in Switch - Java 21
public class RecordSwitchIntegration {
    record Point(int x, int y) {}

    // Sealed hierarchy with records
    sealed interface Shape permits CircleShape, RectShape, TriangleShape {}
    record CircleShape(Point center, double radius) implements Shape {}
    record RectShape(Point topLeft, double width, double height) implements Shape {}
    record TriangleShape(Point p1, Point p2, Point p3) implements Shape {}

    static double calculateArea(Shape shape) {
        // Exhaustive matching with destructuring!
        return switch (shape) {
            case CircleShape(Point center, double r) ->
                Math.PI * r * r;
            case RectShape(Point corner, double w, double h) ->
                w * h;
            case TriangleShape(Point(int x1, int y1),
                               Point(int x2, int y2),
                               Point(int x3, int y3)) -> {
                double a = Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2));
                double b = Math.sqrt(Math.pow(x3-x2,2) + Math.pow(y3-y2,2));
                double c = Math.sqrt(Math.pow(x1-x3,2) + Math.pow(y1-y3,2));
                double s = (a + b + c) / 2;
                yield Math.sqrt(s * (s-a) * (s-b) * (s-c));
            }
        };
    }

    // Guards with record patterns
    static String categorize(Shape shape) {
        return switch (shape) {
            case CircleShape(Point(int x, int y), double r)
                 when x == 0 && y == 0 && r < 10 -> "Small circle at origin";
            case CircleShape(Point c, double r) when r < 5 -> "Small circle";
            case CircleShape(Point c, double r) -> "Circle radius " + r;
            case RectShape(Point c, double w, double h) when w == h -> "Square";
            case RectShape(Point c, double w, double h) -> "Rectangle";
            case TriangleShape t -> "Triangle";
        };
    }

    public static void main(String[] args) {
        Shape circle = new CircleShape(new Point(0, 0), 5.0);
        System.out.println(calculateArea(circle));  // 78.54...
        System.out.println(categorize(circle));     // Small circle at origin
    }
}`
        },
        {
          name: 'Unnamed Patterns',
          explanation: 'Use underscore (_) to explicitly ignore components you do not need: case Point(int x, _) -> ... This makes intent clear, avoids unused variable warnings, and improves readability. Multiple underscores are allowed in the same pattern.',
          codeExample: `// Unnamed Patterns with Underscore - Java 21
public class UnnamedPatternsDemo {
    record Point(int x, int y) {}
    record Point3D(int x, int y, int z) {}
    record RGB(int red, int green, int blue) {}
    record Person(String name, int age, String email) {}
    record Employee(Person person, String department, double salary) {}

    // Ignore unused components with _
    static String describeX(Object obj) {
        return switch (obj) {
            case Point(int x, _) -> "x coordinate: " + x;
            case Point3D(int x, _, _) -> "x coordinate: " + x;
            default -> "Not a point";
        };
    }

    static boolean isRed(RGB color) {
        return switch (color) {
            case RGB(int r, _, _) when r > 200 -> true;
            case RGB(_, _, _) -> false;
        };
    }

    // Nested unnamed patterns
    record Line(Point start, Point end) {}

    static boolean isHorizontal(Line line) {
        return switch (line) {
            case Line(Point(_, int y1), Point(_, int y2)) when y1 == y2 -> true;
            case Line(_, _) -> false;
        };
    }

    // Extract only what you need from deeply nested
    static String getEmployeeName(Employee emp) {
        return switch (emp) {
            case Employee(Person(String name, _, _), _, _) -> name;
        };
    }

    static boolean isHighPaidEngineer(Employee emp) {
        return switch (emp) {
            case Employee(_, String dept, double salary)
                 when dept.equals("Engineering") && salary > 150000 -> true;
            case Employee(_, _, _) -> false;
        };
    }

    public static void main(String[] args) {
        System.out.println(describeX(new Point(5, 10)));  // x coordinate: 5
        System.out.println(isRed(new RGB(255, 50, 50)));  // true

        Employee emp = new Employee(
            new Person("Carol", 30, "carol@example.com"),
            "Engineering", 160000);
        System.out.println(getEmployeeName(emp));         // Carol
        System.out.println(isHighPaidEngineer(emp));      // true
    }
}`
        },
        {
          name: 'Exhaustiveness & Sealed Types',
          explanation: 'The compiler ensures all cases are covered when switching on sealed types. No default case is needed because the compiler knows all possible subtypes. This catches missing cases at compilation time and provides refactoring safety - adding a new subtype will cause compile errors where handling is missing.',
          codeExample: `// Exhaustiveness Checking - Java 21
public class ExhaustivenessDemo {
    // Sealed type hierarchy
    sealed interface Animal permits Dog, Cat, Bird {}
    record Dog(String name, String breed) implements Animal {}
    record Cat(String name, boolean isIndoor) implements Animal {}
    record Bird(String name, boolean canFly) implements Animal {}

    // Exhaustive switch - no default needed!
    static String describe(Animal animal) {
        // Compiler verifies ALL subtypes are covered
        return switch (animal) {
            case Dog(String name, String breed) ->
                name + " is a " + breed + " dog";
            case Cat(String name, boolean isIndoor) ->
                name + " is an " + (isIndoor ? "indoor" : "outdoor") + " cat";
            case Bird(String name, boolean canFly) ->
                name + " " + (canFly ? "can fly" : "cannot fly");
            // No default needed - all cases covered!
        };
    }

    // If you forget a case, compiler error!
    // static String incomplete(Animal animal) {
    //     return switch (animal) {
    //         case Dog d -> "Dog";
    //         case Cat c -> "Cat";
    //         // COMPILE ERROR: missing case for Bird!
    //     };
    // }

    // Payment methods example
    sealed interface PaymentMethod permits CreditCard, PayPal, BankTransfer {}
    record CreditCard(String number, String cvv) implements PaymentMethod {}
    record PayPal(String email) implements PaymentMethod {}
    record BankTransfer(String account, String routing) implements PaymentMethod {}

    static String processPayment(PaymentMethod method, double amount) {
        return switch (method) {
            case CreditCard(String num, String cvv) ->
                "Charging $" + amount + " to card ending in " + num.substring(12);
            case PayPal(String email) ->
                "Charging $" + amount + " to PayPal: " + email;
            case BankTransfer(String acc, String routing) ->
                "Transferring $" + amount + " from account " + acc;
        };
    }

    public static void main(String[] args) {
        Animal dog = new Dog("Buddy", "Golden Retriever");
        System.out.println(describe(dog));
        // Buddy is a Golden Retriever dog

        PaymentMethod card = new CreditCard("1234567890123456", "123");
        System.out.println(processPayment(card, 99.99));
        // Charging $99.99 to card ending in 3456
    }
}`
        }
      ]
    },
    {
      id: 'sequenced-collections',
      name: 'Sequenced Collections',
      icon: '📋',
      color: '#10b981',
      description: 'Unified API for collections with defined encounter order - consistent access from both ends.',
      diagram: SequencedCollectionsDiagram,
      details: [
        {
          name: 'Unified API',
          explanation: 'New interfaces provide uniform operations: SequencedCollection for lists and deques, SequencedSet for ordered sets like LinkedHashSet and TreeSet, and SequencedMap for ordered maps like LinkedHashMap and TreeMap. This fills gaps in the Collections API with consistent methods across all ordered collections.',
          codeExample: `import java.util.*;

// Sequenced Collections Unified API - Java 21
public class SequencedAPIDemo {
    public static void main(String[] args) {
        // NEW: Sequenced Collection hierarchy
        // SequencedCollection <- List, Deque
        // SequencedSet <- LinkedHashSet, SortedSet
        // SequencedMap <- LinkedHashMap, SortedMap

        List<String> list = new ArrayList<>(List.of("A", "B", "C"));
        Deque<String> deque = new ArrayDeque<>(List.of("A", "B", "C"));
        LinkedHashSet<String> set = new LinkedHashSet<>(List.of("A", "B", "C"));

        // OLD WAY: Inconsistent APIs
        // list.get(0)           - first element
        // deque.getFirst()      - first element
        // set.iterator().next() - first element (awkward!)

        // NEW: Uniform getFirst() works on all!
        System.out.println("=== Uniform getFirst() ===");
        System.out.println("List first: " + list.getFirst());
        System.out.println("Deque first: " + deque.getFirst());
        System.out.println("Set first: " + set.getFirst());

        System.out.println("\\n=== Uniform getLast() ===");
        System.out.println("List last: " + list.getLast());
        System.out.println("Deque last: " + deque.getLast());
        System.out.println("Set last: " + set.getLast());

        // Sequenced Map
        LinkedHashMap<String, Integer> map = new LinkedHashMap<>();
        map.put("first", 1);
        map.put("second", 2);
        map.put("third", 3);

        System.out.println("\\n=== Sequenced Map ===");
        System.out.println("First entry: " + map.firstEntry());
        System.out.println("Last entry: " + map.lastEntry());
    }
}`
        },
        {
          name: 'Common Operations',
          explanation: 'Core methods available on all sequenced collections: getFirst(), getLast(), addFirst(E), addLast(E), removeFirst(), removeLast(). The same API works across List, Deque, and Set - no more type-specific patterns or awkward workarounds needed.',
          codeExample: `import java.util.*;

// Common Operations on Sequenced Collections - Java 21
public class SequencedOperationsDemo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        Deque<String> deque = new LinkedList<>();
        LinkedHashSet<String> set = new LinkedHashSet<>();

        // addFirst() - works on all!
        list.addFirst("First");
        deque.addFirst("First");
        set.addFirst("First");
        System.out.println("After addFirst: " + list);

        // addLast() - works on all!
        list.addLast("Last");
        deque.addLast("Last");
        set.addLast("Last");
        System.out.println("After addLast: " + list);

        // Add middle elements
        list.add("Middle");

        // getFirst() and getLast()
        System.out.println("First: " + list.getFirst() + ", Last: " + list.getLast());

        // removeFirst() and removeLast()
        System.out.println("Removed first: " + list.removeFirst());
        System.out.println("Removed last: " + list.removeLast());
        System.out.println("After removals: " + list);

        // Works with TreeSet too!
        TreeSet<Integer> sortedSet = new TreeSet<>(List.of(5, 2, 8, 1, 9));
        System.out.println("\\n=== TreeSet (SequencedSet) ===");
        System.out.println("First (min): " + sortedSet.getFirst());  // 1
        System.out.println("Last (max): " + sortedSet.getLast());    // 9
    }
}`
        },
        {
          name: 'Reversed Views',
          explanation: 'The reversed() method returns a view (not a copy) backed by the original collection. Changes reflect in both directions with no data duplication. This provides O(1) view creation with no memory overhead. Double reversal returns the original reference.',
          codeExample: `import java.util.*;

// Reversed Views - Java 21
public class ReversedViewsDemo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(List.of("A", "B", "C", "D", "E"));

        // NEW: reversed() creates a view (not a copy!)
        List<String> reversedView = list.reversed();

        System.out.println("Original: " + list);
        System.out.println("Reversed view: " + reversedView);

        // Modifications to original reflect in reversed view
        list.add("F");
        System.out.println("\\nAfter adding 'F' to original:");
        System.out.println("Original: " + list);
        System.out.println("Reversed view: " + reversedView);

        // Modifications to reversed view reflect in original!
        reversedView.addFirst("Z");  // Adds to end of original
        System.out.println("\\nAfter adding 'Z' to reversed:");
        System.out.println("Original: " + list);

        // Efficient iteration in reverse (no copying!)
        System.out.println("\\nIterate in reverse:");
        for (String s : reversedView) {
            System.out.print(s + " ");
        }

        // Works with LinkedHashMap
        LinkedHashMap<String, Integer> map = new LinkedHashMap<>();
        map.put("first", 1);
        map.put("second", 2);
        map.put("third", 3);

        SequencedMap<String, Integer> reversedMap = map.reversed();
        System.out.println("\\n\\n=== Map ===");
        System.out.println("Original: " + map);
        System.out.println("Reversed: " + reversedMap);

        // Double reversal gives original reference
        System.out.println("Same reference? " + (list == list.reversed().reversed()));
    }
}`
        },
        {
          name: 'Retrofitted Collections',
          explanation: 'All existing ordered collections now support sequenced operations: ArrayList, LinkedList, ArrayDeque (SequencedCollection), LinkedHashSet, TreeSet (SequencedSet), LinkedHashMap, TreeMap (SequencedMap). No breaking changes - existing code continues to work while new methods are available.',
          codeExample: `import java.util.*;

// Retrofitted Collections - Java 21
public class RetrofittedCollectionsDemo {
    public static void main(String[] args) {
        // 1. ArrayList (List -> SequencedCollection)
        ArrayList<String> arrayList = new ArrayList<>(List.of("a", "b", "c"));
        System.out.println("=== ArrayList ===");
        System.out.println("First: " + arrayList.getFirst());
        System.out.println("Last: " + arrayList.getLast());
        System.out.println("Reversed: " + arrayList.reversed());

        // 2. LinkedHashSet (Set -> SequencedSet)
        LinkedHashSet<String> linkedHashSet =
            new LinkedHashSet<>(List.of("one", "two", "three"));
        System.out.println("\\n=== LinkedHashSet ===");
        System.out.println("First: " + linkedHashSet.getFirst());
        System.out.println("Reversed: " + linkedHashSet.reversed());

        // 3. TreeSet (SortedSet -> SequencedSet)
        TreeSet<Integer> treeSet = new TreeSet<>(List.of(5, 2, 8, 1, 9));
        System.out.println("\\n=== TreeSet ===");
        System.out.println("First (min): " + treeSet.getFirst());
        System.out.println("Last (max): " + treeSet.getLast());

        // 4. LinkedHashMap (Map -> SequencedMap)
        LinkedHashMap<String, Integer> linkedHashMap = new LinkedHashMap<>();
        linkedHashMap.put("A", 1);
        linkedHashMap.put("B", 2);
        linkedHashMap.put("C", 3);
        System.out.println("\\n=== LinkedHashMap ===");
        System.out.println("First entry: " + linkedHashMap.firstEntry());
        System.out.println("Last entry: " + linkedHashMap.lastEntry());

        // 5. TreeMap (SortedMap -> SequencedMap)
        TreeMap<String, Integer> treeMap = new TreeMap<>();
        treeMap.put("Z", 26);
        treeMap.put("A", 1);
        treeMap.put("M", 13);
        System.out.println("\\n=== TreeMap ===");
        System.out.println("First entry: " + treeMap.firstEntry());
        System.out.println("Last entry: " + treeMap.lastEntry());

        // Backward compatibility - old and new API together
        List<String> list = new ArrayList<>(List.of("old", "code"));
        list.add("works");      // Existing API
        list.addLast("new API"); // New API
        System.out.println("\\nBackward compatible: " + list);
    }
}`
        },
        {
          name: 'Use Cases',
          explanation: 'Sequenced collections simplify common patterns: LRU caches (access both ends efficiently), queue processing (FIFO operations), sliding window algorithms, undo/redo stacks, and bidirectional iteration. Generic methods can work with any SequencedCollection for cleaner, more reusable code.',
          codeExample: `import java.util.*;

// Sequenced Collections Use Cases - Java 21
public class SequencedUseCasesDemo {
    // Use Case 1: Simple LRU Cache
    static class LRUCache<K, V> {
        private final int capacity;
        private final LinkedHashMap<K, V> cache = new LinkedHashMap<>();

        public LRUCache(int capacity) { this.capacity = capacity; }

        public V get(K key) {
            V value = cache.remove(key);
            if (value != null) cache.put(key, value);  // Move to end
            return value;
        }

        public void put(K key, V value) {
            cache.remove(key);
            cache.put(key, value);
            // NEW: Easy access to oldest entry!
            if (cache.size() > capacity) cache.pollFirstEntry();
        }

        public void display() {
            System.out.println("Cache (MRU to LRU): " + cache.reversed());
        }
    }

    // Use Case 2: Undo/Redo with Deque
    static class UndoRedo<T> {
        private final Deque<T> undoStack = new ArrayDeque<>();
        private final Deque<T> redoStack = new ArrayDeque<>();

        public void execute(T action) {
            undoStack.addLast(action);
            redoStack.clear();
        }
        public void undo() {
            if (!undoStack.isEmpty())
                redoStack.addLast(undoStack.removeLast());
        }
        public void redo() {
            if (!redoStack.isEmpty())
                undoStack.addLast(redoStack.removeLast());
        }
    }

    // Use Case 3: Generic method for any SequencedCollection
    static <T> void processEnds(SequencedCollection<T> coll) {
        System.out.println("First: " + coll.getFirst() +
                           ", Last: " + coll.getLast());
    }

    public static void main(String[] args) {
        // LRU Cache
        System.out.println("=== LRU Cache ===");
        LRUCache<String, Integer> cache = new LRUCache<>(3);
        cache.put("A", 1); cache.put("B", 2); cache.put("C", 3);
        cache.display();
        cache.get("A");  // Access A (moves to end)
        cache.display();
        cache.put("D", 4);  // Evicts B (LRU)
        cache.display();

        // Generic processing
        System.out.println("\\n=== Generic Processing ===");
        processEnds(new ArrayList<>(List.of(1, 2, 3, 4, 5)));
        processEnds(new LinkedHashSet<>(List.of("X", "Y", "Z")));
        processEnds(new TreeSet<>(List.of(10, 5, 15, 20, 1)));
    }
}`
        }
      ]
    },
    {
      id: 'string-templates',
      name: 'String Templates (Preview)',
      icon: '📝',
      color: '#f59e0b',
      description: 'Template expressions for safe, readable string interpolation with custom processors.',
      diagram: null,
      details: [
        {
          name: 'Basic String Interpolation',
          explanation: 'String templates (preview feature in Java 21) provide a cleaner way to embed expressions directly in strings using the STR template processor. Unlike concatenation or String.format(), templates use \\{expression} syntax which is more readable and less error-prone. The STR processor handles automatic conversion of expressions to strings and provides compile-time validation of embedded expressions.',
          codeExample: `// String Templates - Basic Interpolation (Java 21 Preview)
// Enable with: --enable-preview
public class StringTemplatesDemo {
    public static void main(String[] args) {
        String name = "Alice";
        int age = 30;
        double salary = 75000.50;

        // OLD WAY: String concatenation (hard to read)
        String oldWay1 = "Name: " + name + ", Age: " + age + ", Salary: $" + salary;

        // OLD WAY: String.format (positional arguments)
        String oldWay2 = String.format("Name: %s, Age: %d, Salary: $%.2f", name, age, salary);

        // NEW in Java 21: String Templates with STR processor
        String newWay = STR."Name: \\{name}, Age: \\{age}, Salary: $\\{salary}";

        System.out.println("Concatenation: " + oldWay1);
        System.out.println("String.format: " + oldWay2);
        System.out.println("STR template:  " + newWay);

        // Expressions in templates - not just variables!
        int x = 10, y = 20;
        String mathResult = STR."\\{x} + \\{y} = \\{x + y}";
        System.out.println(mathResult);  // 10 + 20 = 30

        // Method calls in templates
        String upper = STR."Name in uppercase: \\{name.toUpperCase()}";
        System.out.println(upper);  // Name in uppercase: ALICE

        // Ternary expressions
        boolean isAdult = age >= 18;
        String status = STR."\\{name} is \\{isAdult ? "an adult" : "a minor"}";
        System.out.println(status);  // Alice is an adult
    }
}`
        },
        {
          name: 'Multi-line Templates',
          explanation: 'String templates work seamlessly with text blocks (multi-line strings) introduced in Java 15. This combination enables clean, readable templates for JSON, HTML, SQL, and other structured text. The template processor handles proper escaping and formatting. Expressions can span the template naturally, making complex document generation straightforward.',
          codeExample: `// Multi-line String Templates (Java 21 Preview)
public class MultiLineTemplatesDemo {
    record Person(String name, int age, String email) {}
    record Product(String name, double price, int stock) {}

    public static void main(String[] args) {
        Person person = new Person("Bob", 25, "bob@example.com");

        // JSON template with text block
        String json = STR."""
            {
                "name": "\\{person.name()}",
                "age": \\{person.age()},
                "email": "\\{person.email()}",
                "isAdult": \\{person.age() >= 18}
            }
            """;
        System.out.println("JSON:\\n" + json);

        // HTML template
        String title = "Welcome Page";
        String content = "Hello, World!";
        String html = STR."""
            <!DOCTYPE html>
            <html>
            <head>
                <title>\\{title}</title>
            </head>
            <body>
                <h1>\\{content}</h1>
                <p>Generated at: \\{java.time.LocalDateTime.now()}</p>
            </body>
            </html>
            """;
        System.out.println("HTML:\\n" + html);

        // SQL template (use prepared statements in production!)
        String tableName = "products";
        double minPrice = 50.0;
        String sql = STR."""
            SELECT name, price, stock
            FROM \\{tableName}
            WHERE price >= \\{minPrice}
            ORDER BY price DESC
            """;
        System.out.println("SQL:\\n" + sql);

        // Loop output in template
        Product[] products = {
            new Product("Laptop", 999.99, 10),
            new Product("Mouse", 29.99, 50),
            new Product("Keyboard", 79.99, 30)
        };

        StringBuilder rows = new StringBuilder();
        for (Product p : products) {
            rows.append(STR."  <tr><td>\\{p.name()}</td><td>$\\{p.price()}</td></tr>\\n");
        }
        String table = STR."""
            <table>
            \\{rows}</table>
            """;
        System.out.println("Table:\\n" + table);
    }
}`
        },
        {
          name: 'Custom Template Processors',
          explanation: 'Beyond the built-in STR processor, Java 21 allows creating custom template processors for specialized use cases. The FMT processor provides printf-style formatting. You can create processors that validate input, escape SQL parameters, encode HTML entities, or transform templates in any way needed. This enables type-safe, domain-specific template handling.',
          codeExample: `import java.util.FormatProcessor;
import static java.util.FormatProcessor.FMT;

// Custom Template Processors (Java 21 Preview)
public class CustomProcessorsDemo {
    public static void main(String[] args) {
        // FMT processor - printf-style formatting
        double price = 1234.5678;
        int quantity = 42;
        String formatted = FMT."Price: $%.2f\\{price}, Quantity: %05d\\{quantity}";
        System.out.println(formatted);  // Price: $1234.57, Quantity: 00042

        // FMT with alignment
        String[] names = {"Alice", "Bob", "Charlie"};
        int[] scores = {95, 87, 92};
        System.out.println("\\n=== Score Report ===");
        for (int i = 0; i < names.length; i++) {
            System.out.println(FMT."%-10s\\{names[i]}: %3d\\{scores[i]} points");
        }

        // Scientific notation
        double bigNumber = 1234567890.123;
        System.out.println(FMT."\\nScientific: %e\\{bigNumber}");
        System.out.println(FMT."Fixed:      %.2f\\{bigNumber}");

        // Custom processor example concept
        // (In production, you'd implement StringTemplate.Processor)
        demonstrateProcessorConcept();
    }

    static void demonstrateProcessorConcept() {
        // Concept: Custom SQL processor that escapes values
        // In real code, implement StringTemplate.Processor<PreparedStatement>
        String userInput = "O'Brien; DROP TABLE users;--";

        // BAD: Direct interpolation (SQL injection risk!)
        // String badSql = STR."SELECT * FROM users WHERE name = '\\{userInput}'";

        // GOOD: Custom processor would handle escaping
        // PreparedStatement stmt = SQL."SELECT * FROM users WHERE name = \\{userInput}";

        System.out.println("\\n=== Custom Processor Concept ===");
        System.out.println("User input: " + userInput);
        System.out.println("A SQL processor would safely escape this value");
        System.out.println("and return a PreparedStatement with bound parameters.");

        // Concept: HTML processor that escapes entities
        String htmlInput = "<script>alert('xss')</script>";
        // Safe: HTML."<div>\\{htmlInput}</div>" would escape to <script>...
        System.out.println("\\nHTML input: " + htmlInput);
        System.out.println("An HTML processor would escape: <script>...");
    }
}

/*
 * Creating a custom processor (conceptual):
 *
 * public class SafeSqlProcessor implements StringTemplate.Processor<PreparedStatement, SQLException> {
 *     @Override
 *     public PreparedStatement process(StringTemplate template) throws SQLException {
 *         // Build SQL with ? placeholders
 *         // Bind values from template.values() safely
 *         // Return PreparedStatement
 *     }
 * }
 *
 * Usage: PreparedStatement ps = SAFE_SQL."SELECT * FROM users WHERE id = \\{userId}";
 */`
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
      { name: 'Java', icon: '☕', page: 'Java' },
      { name: 'Java 21 LTS', icon: '🚀', page: 'Java 21 LTS' }
    ]
    if (selectedConcept) {
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    }
    return stack
  }

  const handleBreadcrumbClick = (index) => {
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
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Java 21 LTS</h1>
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
          Back to Java
        </button>
      </div>

      {/* Breadcrumb */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={JAVA21_COLORS}
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
        primaryColor={JAVA21_COLORS.primary}
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
              {concept.details.length} topics - Click to explore
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
              colors={JAVA21_COLORS}
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
                ></button>
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
                ></button>
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
                ></button>
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
              const DiagramComponent = selectedConcept.diagram
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
                  <p style={{
                    color: '#e2e8f0',
                    lineHeight: '1.8',
                    marginBottom: '1rem',
                    background: colorScheme.bg,
                    border: `1px solid ${colorScheme.border}`,
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    textAlign: 'left'
                  }}>
                    {detail.explanation}
                  </p>

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

export default Java21
