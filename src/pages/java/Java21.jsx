import { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

// Normalize indentation helper
const normalizeIndentation = (code) => {
  const lines = code.split('\n')
  const nonEmptyLines = lines.filter(line => line.trim().length > 0)
  if (nonEmptyLines.length === 0) return code
  const minIndent = Math.min(...nonEmptyLines.map(line => {
    const match = line.match(/^(\s*)/)
    return match ? match[1].length : 0
  }))
  return lines.map(line => line.substring(minIndent)).join('\n')
}

// Simple syntax highlighter for Java code
const SyntaxHighlighter = ({ code }) => {
  const highlightJava = (code) => {
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    const protectedContent = []
    let placeholder = 0

    highlighted = highlighted.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, (match) => {
      const id = `___COMMENT_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #6a9955; font-style: italic;">${match}</span>` })
      return id
    })

    highlighted = highlighted.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, (match) => {
      const id = `___STRING_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #ce9178;">${match}</span>` })
      return id
    })

    highlighted = highlighted
      .replace(/\b(public|private|protected|static|final|class|interface|extends|implements|new|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|import|package|void|abstract|synchronized|volatile|transient|native|strictfp|super|this|null|sealed|permits|non-sealed|record|instanceof|var|default|yield)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(true|false|int|double|float|long|short|byte|char|boolean)\b/g, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(String|List|ArrayList|LinkedList|HashMap|TreeMap|HashSet|TreeSet|Map|Set|Queue|Deque|Collection|Arrays|Collections|Thread|Runnable|Executor|ExecutorService|CompletableFuture|Stream|Optional|Path|Files|Pattern|Matcher|StringBuilder|StringBuffer|Integer|Double|Float|Long|Short|Byte|Character|Boolean|Object|System|Math|Scanner|BufferedReader|FileReader|FileWriter|PrintWriter|InputStream|OutputStream|Exception|RuntimeException|IOException|SQLException|Function|Consumer|Supplier|Predicate|Comparator)\b/g, '<span style="color: #4ec9b0;">$1</span>')
      .replace(/(@\w+)/g, '<span style="color: #dcdcaa;">$1</span>')
      .replace(/\b(\d+\.?\d*[fLdD]?)\b/g, '<span style="color: #b5cea8;">$1</span>')
      .replace(/\b([a-z_]\w*)\s*\(/g, '<span style="color: #dcdcaa;">$1</span>(')

    protectedContent.forEach(({ id, replacement }) => {
      highlighted = highlighted.replace(id, replacement)
    })

    return highlighted
  }

  return (
    <pre style={{
      margin: 0,
      fontFamily: '"Fira Code", "Consolas", "Monaco", "Courier New", monospace',
      fontSize: '0.9rem',
      lineHeight: '1.7',
      letterSpacing: '0.02em',
      color: '#d4d4d4',
      whiteSpace: 'pre',
      overflowX: 'auto',
      textAlign: 'left',
      padding: '1.25rem',
      tabSize: 4,
      MozTabSize: 4
    }}>
      <code dangerouslySetInnerHTML={{ __html: highlightJava(code) }} />
    </pre>
  )
}

function Java21({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedConcept, setSelectedConcept] = useState(null)

  const parseCodeSections = (code) => {
    const sections = []
    const lines = code.split('\n')
    let currentSection = null
    let currentContent = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      if (line.includes('// ═══════════════════════════════════════════════════════════════════════════')) {
        if (currentSection) {
          sections.push({
            title: currentSection,
            code: currentContent.join('\n')
          })
          currentContent = []
        }

        if (i + 1 < lines.length && lines[i + 1].includes('// ✦')) {
          currentSection = lines[i + 1].replace('// ✦', '').trim()
          i += 2
          continue
        }
      }

      if (currentSection) {
        currentContent.push(line)
      }
    }

    if (currentSection && currentContent.length > 0) {
      sections.push({
        title: currentSection,
        code: currentContent.join('\n')
      })
    }

    // Combine sections with fewer than 3 meaningful lines
    const combinedSections = []
    let tempCombined = null

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i]
      const meaningfulLines = section.code.split('\n').filter(line =>
        line.trim() && !line.trim().startsWith('//') && line.trim() !== '}'
      ).length

      if (meaningfulLines < 3 && i < sections.length - 1) {
        if (!tempCombined) {
          tempCombined = { title: section.title, code: section.code }
        } else {
          tempCombined.code += '\n\n' + section.code
        }
      } else {
        if (tempCombined) {
          tempCombined.code += '\n\n' + section.code
          combinedSections.push(tempCombined)
          tempCombined = null
        } else {
          combinedSections.push(section)
        }
      }
    }

    if (tempCombined) {
      combinedSections.push(tempCombined)
    }

    return combinedSections.length > 0 ? combinedSections : sections
  }

  const handleConceptClick = (concept) => {
    setSelectedConcept(concept)
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        // Close modal entirely - both concept and category
        if (selectedConcept || selectedCategory) {
          setSelectedConcept(null)
          setSelectedCategory(null)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedConcept, selectedCategory])

  const concepts = [
    {
      name: 'Lightweight Threads',
      icon: '🔹',
      explanation: `**What are Virtual Threads:**

• JVM-managed lightweight threads, not OS threads
• Can create millions with minimal overhead
• Each uses only KB vs MB for platform threads
• Revolutionary for concurrent programming

**Memory Benefits:**

• Platform thread: ~1-2 MB stack memory
• Virtual thread: ~few KB heap memory
• Enable million+ concurrent tasks
• No OS thread pool limits`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Lightweight Threads - Implementation
// ═══════════════════════════════════════════════════════════════════════════

import java.time.Duration;

// Creating millions of virtual threads - Java 21
public class VirtualThreadsDemo {
    public static void main(String[] args) throws InterruptedException {
        // Old way - platform threads (limited scalability)
        // Thread platformThread = new Thread(() -> {
        //     System.out.println("Platform thread: " + Thread.currentThread());
        // });
        // platformThread.start();

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

        // Wait for all threads to complete
        for (Thread t : threads) {
            t.join();
        }

        long duration = System.currentTimeMillis() - start;
        System.out.println("Completed 1M tasks in " + duration + "ms");

        // Output:
        // Virtual thread: VirtualThread[#21]/runnable@ForkJoinPool-1-worker-1
        // Is virtual: true
        // Task 0 completed
        // Task 100000 completed
        // ...
        // Completed 1M tasks in ~150ms (uses only ~10 platform threads!)
    }
}`
    },
    {
      name: 'Simple Threading Model',
      icon: '🔹',
      explanation: `**Programming Model:**

• Write thread-per-request code that scales
• No reactive programming complexity needed
• Blocking operations automatically yield
• Simple, synchronous code style

**Automatic Thread Management:**

• Blocking calls release carrier thread
• JVM handles scheduling automatically
• No manual async/await needed
• Natural flow control preserved

**Benefits:**

• Dramatically simpler concurrent code
• Easier to read and maintain
• Debugger-friendly stack traces
• Familiar imperative style`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Simple Threading Model - Implementation
// ═══════════════════════════════════════════════════════════════════════════

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

// Thread-per-request pattern with Virtual Threads - Java 21
public class ThreadPerRequestDemo {
    public static void main(String[] args) throws InterruptedException {
        HttpClient client = HttpClient.newHttpClient();

        // Create virtual thread executor - NEW in Java 21
        // Perfect for handling thousands of concurrent requests
        try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {

            // Simulate 10,000 concurrent HTTP requests
            for (int i = 0; i < 10_000; i++) {
                final int requestId = i;

                executor.submit(() -> {
                    try {
                        // Simple blocking code - no callbacks, no reactive complexity!
                        HttpRequest request = HttpRequest.newBuilder()
                            .uri(URI.create("https://api.example.com/data/" + requestId))
                            .build();

                        // This blocks the virtual thread, NOT the platform thread
                        HttpResponse<String> response = client.send(
                            request,
                            HttpResponse.BodyHandlers.ofString()
                        );

                        // More blocking operations - still efficient!
                        Thread.sleep(100); // Simulate processing

                        if (requestId % 1000 == 0) {
                            System.out.println("Request " + requestId +
                                " completed: " + response.statusCode());
                        }

                    } catch (Exception e) {
                        System.err.println("Request " + requestId + " failed: " + e);
                    }
                });
            }

            // Executor closes automatically, waits for all tasks
            System.out.println("All 10,000 requests submitted");
        }

        System.out.println("All requests completed!");

        // Output:
        // All 10,000 requests submitted
        // Request 0 completed: 200
        // Request 1000 completed: 200
        // ...
        // All requests completed!
        //
        // Benefits: Simple code, no callbacks, handles 10K concurrent requests
        // with only ~10 platform threads instead of 10,000!
    }
}`
    },
    {
      name: 'Thread.startVirtualThread()',
      icon: '🔹',
      explanation: `**Creation Methods:**

• Thread.startVirtualThread(runnable) - Start immediately
• Executors.newVirtualThreadPerTaskExecutor() - Executor service
• Thread.ofVirtual().start(runnable) - Builder pattern
• Thread.ofVirtual().factory() - Thread factory

**Drop-in Replacement:**

• Works with existing blocking APIs
• No code changes required
• Compatible with legacy code
• Transparent to existing frameworks`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Thread.startVirtualThread() - Implementation
// ═══════════════════════════════════════════════════════════════════════════

import java.util.concurrent.*;

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
                System.out.println("Method 3: Running in " + Thread.currentThread());
                return "Result from virtual thread";
            });

            System.out.println("Got result: " + future.get());
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

        // Method 5: Converting existing platform thread code
        // OLD: new Thread(() -> doWork()).start();
        // NEW: Thread.startVirtualThread(() -> doWork());

        Thread.startVirtualThread(() -> doWork());

        Thread.sleep(100); // Wait for completion

        // Output:
        // Method 1: VirtualThread[#21]/runnable@ForkJoinPool-1-worker-1
        // Method 2: my-virtual-thread
        // Method 3: Running in VirtualThread[#23]/runnable@ForkJoinPool-1-worker-2
        // Got result: Result from virtual thread
        // Method 4: worker-0
        // Doing work in: VirtualThread[#25]/runnable@ForkJoinPool-1-worker-1
    }

    static void doWork() {
        System.out.println("Doing work in: " + Thread.currentThread());
    }
}`
    },
    {
      name: 'Carrier Threads',
      icon: '🔹',
      explanation: `**Platform Thread Pool:**

• Virtual threads run on carrier platform threads
• Uses ForkJoinPool by default
• Number of carriers ≈ CPU cores
• Small fixed pool, unlimited virtual threads

**Automatic Scheduling:**

• Blocked virtual thread unmounts from carrier
• Carrier freed for other virtual threads
• Work-stealing algorithm for load balancing
• Optimal CPU utilization

**Thread Mounting:**

• Virtual thread mounts to carrier when runnable
• Can move between different carriers
• Transparent to application code`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Carrier Threads - Implementation
// ═══════════════════════════════════════════════════════════════════════════

import java.time.Duration;
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
        // Print which carrier thread is being used
        System.out.println("Virtual thread " + threadNum +
          " running on: " + Thread.currentThread());

        try {
          // Simulate I/O operation (blocks virtual thread)
          Thread.sleep(Duration.ofMillis(100));

          // After waking up, might be on different carrier thread!
          System.out.println("Virtual thread " + threadNum +
            " resumed on: " + Thread.currentThread());

          // CPU-bound work - stays on same carrier
          long sum = 0;
          for (long j = 0; j < 1_000_000; j++) {
            sum += j;
          }

          // Another blocking operation
          LockSupport.parkNanos(Duration.ofMillis(10).toNanos());

          System.out.println("Virtual thread " + threadNum +
            " finished on: " + Thread.currentThread());

        } catch (InterruptedException e) {
          Thread.currentThread().interrupt();
        }
      });
    }

    Thread.sleep(2000); // Wait for all to complete

    // Output (example):
    // Available processors: 8
    // Virtual thread 0 running on: VirtualThread[#21]/runnable@ForkJoinPool-1-worker-1
    // Virtual thread 1 running on: VirtualThread[#22]/runnable@ForkJoinPool-1-worker-2
    // ...
    // Virtual thread 0 resumed on: VirtualThread[#21]/runnable@ForkJoinPool-1-worker-3
    //   ^ Notice: Same virtual thread, different carrier (worker-3 vs worker-1)
    //
    // Key insight: 100 virtual threads sharing only ~8-10 carrier threads!
    // When virtual thread blocks, carrier is freed for other virtual threads
  }
}`
    },
    {
      name: 'Performance Benefits',
      icon: '🔹',
      explanation: `**Scalability:**

• Handle millions of concurrent requests
• Modest hardware requirements
• No thread pool size limits
• Automatic scaling with load

**Simplicity:**

• Eliminates thread pool tuning complexity
• No executor service configuration
• Natural thread-per-task model
• Better resource utilization

**Performance Characteristics:**

• Ideal for I/O-bound workloads
• Perfect for web services and APIs
• Minimal overhead compared to async`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Performance Benefits - Implementation
// ═══════════════════════════════════════════════════════════════════════════

import java.time.Duration;
import java.time.Instant;
import java.util.concurrent.*;

// Performance comparison: Platform vs Virtual Threads - Java 21
public class PerformanceComparison {

  static void simulateIoOperation() throws InterruptedException {
    // Simulate I/O (database call, HTTP request, etc.)
    Thread.sleep(Duration.ofMillis(100));
  }

  // OLD WAY: Platform thread pool (limited scalability)
  static void platformThreadApproach() throws Exception {
    Instant start = Instant.now();

    // Can only handle ~1000 concurrent tasks efficiently
    ExecutorService executor = Executors.newFixedThreadPool(1000);
    CountDownLatch latch = new CountDownLatch(10_000);

    for (int i = 0; i < 10_000; i++) {
      executor.submit(() -> {
        try {
          simulateIoOperation();
        } catch (InterruptedException e) {
          Thread.currentThread().interrupt();
        } finally {
          latch.countDown();
        }
      });
    }

    latch.await();
    executor.shutdown();

    Duration duration = Duration.between(start, Instant.now());
    System.out.println("Platform threads (pool=1000): " +
      duration.toMillis() + "ms");
    // Result: ~1000ms (10 waves of 1000 threads)
  }

  // NEW WAY: Virtual threads (unlimited scalability)
  static void virtualThreadApproach() throws Exception {
    Instant start = Instant.now();

    // Can handle millions of concurrent tasks!
    ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor();
    CountDownLatch latch = new CountDownLatch(10_000);

    for (int i = 0; i < 10_000; i++) {
      executor.submit(() -> {
        try {
          simulateIoOperation();
        } catch (InterruptedException e) {
          Thread.currentThread().interrupt();
        } finally {
          latch.countDown();
        }
      });
    }

    latch.await();
    executor.shutdown();

    Duration duration = Duration.between(start, Instant.now());
    System.out.println("Virtual threads (unlimited): " +
      duration.toMillis() + "ms");
    // Result: ~100ms (all 10,000 run concurrently!)
  }

  public static void main(String[] args) throws Exception {
    System.out.println("Testing 10,000 I/O-bound tasks...\n");

    platformThreadApproach();
    virtualThreadApproach();

    // Output:
    // Testing 10,000 I/O-bound tasks...
    //
    // Platform threads (pool=1000): 1050ms
    // Virtual threads (unlimited): 105ms
    //
    // Virtual threads are 10x faster!
    // - No thread pool tuning needed
    // - Better resource utilization
    // - Simpler code (thread-per-request model)
  }
}`
    },
    {
      name: 'Debugging Support',
      icon: '🔹',
      explanation: `**Tooling Support:**

• Full debugger support in IDEs
• Profiler integration (JFR, etc.)
• Thread dumps include virtual threads
• Stack traces work normally

**Monitoring:**

• JFR events for virtual thread lifecycle
• VisualVM and JConsole support
• Standard JMX monitoring
• Performance analysis tools

**ThreadLocal Considerations:**

• Works but use carefully
• Creates instance per virtual thread
• Can lead to high memory usage
• Prefer scoped values in Java 21+`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Debugging Support - Implementation
// ═══════════════════════════════════════════════════════════════════════════

import java.util.concurrent.Executors;

// Debugging Virtual Threads - Java 21
public class VirtualThreadDebugging {

  // ThreadLocal works but use carefully - many virtual threads!
  private static final ThreadLocal<String> threadLocal =
    ThreadLocal.withInitial(() -> "default-value");

  public static void main(String[] args) throws InterruptedException {

    // 1. Checking if thread is virtual
    Thread.startVirtualThread(() -> {
      Thread current = Thread.currentThread();
      System.out.println("Thread: " + current);
      System.out.println("Is virtual: " + current.isVirtual());
      System.out.println("Is daemon: " + current.isDaemon()); // Always true
      System.out.println("Thread ID: " + current.threadId());
    }).join();

    // 2. Thread dumps include virtual threads
    // Run: jcmd <pid> Thread.dump_to_file threads.txt
    // Or programmatically:
    Thread.getAllStackTraces().forEach((thread, stack) -> {
      if (thread.isVirtual()) {
        System.out.println("\nVirtual thread: " + thread);
        // Stack trace available for debugging
      }
    });

    // 3. ThreadLocal usage (be careful - many threads!)
    try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
      for (int i = 0; i < 10; i++) {
        final int taskId = i;
        executor.submit(() -> {
          // Each virtual thread gets its own ThreadLocal value
          threadLocal.set("task-" + taskId);
          System.out.println("Task " + taskId + ": " + threadLocal.get());

          // WARNING: With millions of virtual threads,
          // ThreadLocal can use lots of memory!
          // Consider using regular variables or scoped values instead
        });
      }
    }

    // 4. Profiling with JFR (Java Flight Recorder)
    // jcmd <pid> JFR.start name=myrecording settings=profile
    // Virtual threads show up in JFR with events:
    // - jdk.VirtualThreadStart
    // - jdk.VirtualThreadEnd
    // - jdk.VirtualThreadPinned (when carrier thread is pinned)

    Thread.sleep(100);

    // 5. Monitoring virtual threads
    Thread vThread = Thread.ofVirtual().name("monitored-thread").start(() -> {
      try {
        Thread.sleep(1000);
      } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
      }
    });

    System.out.println("\nMonitoring virtual thread:");
    System.out.println("Name: " + vThread.getName());
    System.out.println("State: " + vThread.getState());
    System.out.println("Alive: " + vThread.isAlive());

    vThread.join();

    // Output:
    // Thread: VirtualThread[#21]/runnable@ForkJoinPool-1-worker-1
    // Is virtual: true
    // Is daemon: true
    // Thread ID: 21
    // ...
    // Task 0: task-0
    // Task 1: task-1
    // ...
    // Monitoring virtual thread:
    // Name: monitored-thread
    // State: TIMED_WAITING
    // Alive: true
  }
}`
    },
    {
      name: 'Type Patterns',
      icon: '🔹',
      explanation: `**Syntax:**

• case String s -> ... - Match and bind type
• case Integer i -> ... - Pattern variable creation
• Pattern variable automatically scoped
• Type inference in switch branches

**Benefits:**

• Eliminates cascading if-instanceof chains
• Works with sealed classes
• Exhaustive checking with sealed types
• Cleaner, more readable code

**Integration:**

• Combines with switch expressions
• No default case needed for sealed types
• Pattern variable scope limited to branch`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Type Patterns - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Type Patterns in Switch - Java 21
public class TypePatternsDemo {

  // OLD WAY: Ugly if-instanceof chains
  static String formatOld(Object obj) {
    if (obj instanceof String s) {
      return "String: " + s.toUpperCase();
    } else if (obj instanceof Integer i) {
      return "Integer: " + (i * 2);
    } else if (obj instanceof Double d) {
      return "Double: " + String.format("%.2f", d);
    } else if (obj == null) {
      return "null";
    } else {
      return "Unknown: " + obj;
    }
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
    System.out.println(formatNew("hello"));
    System.out.println(formatNew(42));
    System.out.println(formatNew(3.14));
    System.out.println(formatNew(null));

    Shape circle = new Circle(5.0);
    System.out.println("Circle area: " + calculateArea(circle));

    // Output:
    // String: HELLO
    // Integer: 84
    // Double: 3.14
    // null
    // Circle area: 78.53981633974483
  }
}`
    },
    {
      name: 'Guarded Patterns',
      icon: '🔹',
      explanation: `**When Clause:**

• case String s when s.length() > 5 -> ...
• Add conditions to type patterns
• Guards evaluated after pattern match
• Multiple guards for same type allowed

**Use Cases:**

• Combines type checking and value conditions
• More expressive than separate if statements
• Clean range checking
• Complex conditional logic

**Evaluation Order:**

• Patterns matched top to bottom
• First matching guarded pattern wins
• Fall through to next case if guard fails`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Guarded Patterns - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Guarded Patterns with 'when' clause - Java 21
public class GuardedPatternsDemo {

  static String categorize(Object obj) {
    return switch (obj) {
      // Guards with 'when' - NEW in Java 21
      case String s when s.isEmpty()     -> "Empty string";
      case String s when s.length() < 5  -> "Short string: " + s;
      case String s when s.length() < 10 -> "Medium string: " + s;
      case String s                      -> "Long string: " + s.substring(0, 10) + "...";

      case Integer i when i < 0          -> "Negative: " + i;
      case Integer i when i == 0         -> "Zero";
      case Integer i when i < 100        -> "Small positive: " + i;
      case Integer i                     -> "Large positive: " + i;

      case null                          -> "null value";
      default                            -> "Unknown type";
    };
  }

  // Complex guards example
  record Person(String name, int age, boolean isStudent) {}

  static String describePersonStatus(Object obj) {
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
    System.out.println(categorize(""));
    System.out.println(categorize("Hi"));
    System.out.println(categorize("Hello World"));
    System.out.println(categorize("This is a very long string"));
    System.out.println(categorize(-5));
    System.out.println(categorize(0));
    System.out.println(categorize(42));
    System.out.println(categorize(1000));

    System.out.println(describePersonStatus(new Person("Alice", 16, true)));
    System.out.println(describePersonStatus(new Person("Bob", 25, true)));
    System.out.println(describePersonStatus(new Person("Carol", 70, false)));

    // Output:
    // Empty string
    // Short string: Hi
    // Medium string: Hello World
    // Long string: This is a ...
    // Negative: -5
    // Zero
    // Small positive: 42
    // Large positive: 1000
    // Alice is a minor student
    // Bob is an adult student
    // Carol is a senior citizen
  }
}`
    },
    {
      name: 'Null Handling',
      icon: '🔹',
      explanation: `**Explicit Null Cases:**

• case null -> ... - Dedicated null handling
• case null, default -> ... - Combined handling
• No NullPointerException thrown
• Null handling is explicit and safe

**Before Java 21:**

• Switch on null threw NPE
• Required separate null check
• Awkward control flow
• Error-prone code

**Benefits:**

• Makes null handling visible
• Safer null processing
• Clean error handling
• Better code readability`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Null Handling - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Null Handling in Switch - Java 21
public class NullHandlingDemo {

  // OLD WAY: NullPointerException risk
  static String processOld(String value) {
    // This throws NPE if value is null!
    // return switch (value) {
    //   case "foo" -> "Found foo";
    //   case "bar" -> "Found bar";
    //   default -> "Other: " + value;
    // };

    // Had to check null separately
    if (value == null) {
      return "null value";
    }
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
      case null, default -> "Not foo or bar"; // null and default together
    };
  }

  // Null with type patterns
  static String describeObject(Object obj) {
    return switch (obj) {
      case null           -> "Got null";
      case String s       -> "String: " + s;
      case Integer i      -> "Integer: " + i;
      case Double d       -> "Double: " + d;
      case Object o       -> "Other object: " + o.getClass().getSimpleName();
    };
  }

  // Null with guards
  static String categorizeString(String s) {
    return switch (s) {
      case null                        -> "null";
      case String str when str.isEmpty() -> "empty";
      case String str when str.isBlank() -> "blank";
      case String str                    -> "value: " + str;
    };
  }

  public static void main(String[] args) {
    // Test explicit null case
    System.out.println(processNew(null));
    System.out.println(processNew("foo"));
    System.out.println(processNew("bar"));
    System.out.println(processNew("baz"));

    // Test null with default
    System.out.println(processNullAsDefault(null));
    System.out.println(processNullAsDefault("hello"));

    // Test with objects
    System.out.println(describeObject(null));
    System.out.println(describeObject("test"));
    System.out.println(describeObject(42));

    // Test null with guards
    System.out.println(categorizeString(null));
    System.out.println(categorizeString(""));
    System.out.println(categorizeString("  "));
    System.out.println(categorizeString("hello"));

    // Output:
    // null value
    // Found foo
    // Found bar
    // Other: baz
    // Not foo or bar
    // Not foo or bar
    // Got null
    // String: test
    // Integer: 42
    // null
    // empty
    // blank
    // value: hello
  }
}`
    },
    {
      name: 'Record Patterns',
      icon: '🔹',
      explanation: `**Destructuring Syntax:**

• case Point(int x, int y) -> ... - Extract components
• Nested patterns for complex types
• Direct access to record components
• No manual getters needed

**Pattern Matching:**

• Enables functional-style data extraction
• Combines with sealed types
• Type-safe component access
• Clean, expressive code

**Use Cases:**

• Complex data structure navigation
• Algebraic data type processing
• Nested record handling`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Record Patterns - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Record Patterns in Switch - Java 21
public class RecordPatternsSwitch {
  record Point(int x, int y) {}
  record Circle(Point center, int radius) {}
  record Rectangle(Point topLeft, Point bottomRight) {}

  // Simple record pattern
  static String describe(Point p) {
    return switch (p) {
      case Point(int x, int y) when x == 0 && y == 0 -> "Origin";
      case Point(int x, int y) when x == y -> "On diagonal at " + x;
      case Point(int x, int y) when x == 0 -> "On Y-axis at " + y;
      case Point(int x, int y) when y == 0 -> "On X-axis at " + x;
      case Point(int x, int y) -> "Point at (" + x + ", " + y + ")";
    };
  }

  // Nested record patterns - NEW in Java 21!
  static String describeShape(Object shape) {
    return switch (shape) {
      // Destructure nested records in one line!
      case Circle(Point(int x, int y), int r) when x == 0 && y == 0 ->
        "Circle at origin with radius " + r;

      case Circle(Point(int x, int y), int r) ->
        "Circle at (" + x + ", " + y + ") with radius " + r;

      case Rectangle(Point(int x1, int y1), Point(int x2, int y2)) ->
        "Rectangle from (" + x1 + "," + y1 + ") to (" + x2 + "," + y2 + ")";

      case Point(int x, int y) ->
        "Just a point at (" + x + ", " + y + ")";

      case null -> "null shape";
      default -> "Unknown shape";
    };
  }

  // Sealed types with record patterns
  sealed interface JsonValue {}
  record JsonString(String value) implements JsonValue {}
  record JsonNumber(double value) implements JsonValue {}
  record JsonBoolean(boolean value) implements JsonValue {}
  record JsonArray(java.util.List<JsonValue> values) implements JsonValue {}
  record JsonObject(java.util.Map<String, JsonValue> fields) implements JsonValue {}

  static String formatJson(JsonValue json) {
    // Exhaustive matching - no default needed!
    return switch (json) {
      case JsonString(String s)  -> "\"" + s + "\"";
      case JsonNumber(double n)  -> String.valueOf(n);
      case JsonBoolean(boolean b) -> String.valueOf(b);
      case JsonArray(var values) -> values.toString();
      case JsonObject(var fields) -> fields.toString();
    };
  }

  public static void main(String[] args) {
    Point origin = new Point(0, 0);
    Point diagonal = new Point(5, 5);
    Point onXAxis = new Point(3, 0);

    System.out.println(describe(origin));
    System.out.println(describe(diagonal));
    System.out.println(describe(onXAxis));

    Circle circle1 = new Circle(new Point(0, 0), 10);
    Circle circle2 = new Circle(new Point(5, 5), 7);
    Rectangle rect = new Rectangle(new Point(0, 0), new Point(10, 20));

    System.out.println(describeShape(circle1));
    System.out.println(describeShape(circle2));
    System.out.println(describeShape(rect));

    JsonValue str = new JsonString("hello");
    JsonValue num = new JsonNumber(42.5);
    JsonValue bool = new JsonBoolean(true);

    System.out.println(formatJson(str));
    System.out.println(formatJson(num));
    System.out.println(formatJson(bool));

    // Output:
    // Origin
    // On diagonal at 5
    // On X-axis at 3
    // Circle at origin with radius 10
    // Circle at (5, 5) with radius 7
    // Rectangle from (0,0) to (10,20)
    // "hello"
    // 42.5
    // true
  }
}`
    },
    {
      name: 'Exhaustiveness',
      icon: '🔹',
      explanation: `**Compile-Time Safety:**

• Compiler ensures all cases covered
• No default needed for sealed types
• Catches missing cases at compilation
• Guaranteed completeness

**Sealed Type Integration:**

• Works with sealed interfaces/classes
• Compiler knows all possible subtypes
• Exhaustiveness checking automatic
• Type-safe pattern matching

**Benefits:**

• Prevents runtime surprises
• Refactoring safety
• Self-documenting code
• Maintenance advantages`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Exhaustiveness - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Exhaustiveness Checking - Java 21
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
        name + " is a bird that " + (canFly ? "can fly" : "cannot fly");
      // No default needed - compiler knows all cases covered!
    };
  }

  // If you forget a case, compiler error!
  // static String describeIncomplete(Animal animal) {
  //   return switch (animal) {
  //     case Dog d -> "Dog";
  //     case Cat c -> "Cat";
  //     // COMPILE ERROR: missing case for Bird!
  //   };
  // }

  // Sealed types for payment methods
  sealed interface PaymentMethod permits CreditCard, PayPal, BankTransfer {}
  record CreditCard(String number, String cvv) implements PaymentMethod {}
  record PayPal(String email) implements PaymentMethod {}
  record BankTransfer(String accountNumber, String routingNumber) implements PaymentMethod {}

  static String processPayment(PaymentMethod method, double amount) {
    // Exhaustive - compiler ensures all payment types handled
    return switch (method) {
      case CreditCard(String num, String cvv) ->
        "Charging $" + amount + " to card ending in " + num.substring(num.length() - 4);
      case PayPal(String email) ->
        "Charging $" + amount + " to PayPal account " + email;
      case BankTransfer(String account, String routing) ->
        "Transferring $" + amount + " from account " + account;
    };
  }

  // Sealed types with nullable handling
  static String describeWithNull(Animal animal) {
    return switch (animal) {
      case null -> "No animal";
      case Dog d -> "Dog";
      case Cat c -> "Cat";
      case Bird b -> "Bird";
      // Still exhaustive!
    };
  }

  public static void main(String[] args) {
    Animal dog = new Dog("Buddy", "Golden Retriever");
    Animal cat = new Cat("Whiskers", true);
    Animal bird = new Bird("Tweety", true);

    System.out.println(describe(dog));
    System.out.println(describe(cat));
    System.out.println(describe(bird));

    PaymentMethod card = new CreditCard("1234567890123456", "123");
    PaymentMethod paypal = new PayPal("user@example.com");
    PaymentMethod bank = new BankTransfer("9876543210", "123456789");

    System.out.println(processPayment(card, 99.99));
    System.out.println(processPayment(paypal, 49.99));
    System.out.println(processPayment(bank, 199.99));

    System.out.println(describeWithNull(null));
    System.out.println(describeWithNull(dog));

    // Output:
    // Buddy is a Golden Retriever dog
    // Whiskers is an indoor cat
    // Tweety is a bird that can fly
    // Charging $99.99 to card ending in 3456
    // Charging $49.99 to PayPal account user@example.com
    // Transferring $199.99 from account 9876543210
    // No animal
    // Dog
  }
}`
    },
    {
      name: 'Arrow vs Colon',
      icon: '🔹',
      explanation: `**Arrow Syntax (Recommended):**

• case X -> ... - Modern style
• No fall-through errors
• Can return values directly
• Cleaner and safer code

**Colon Syntax (Legacy):**

• case X: ... break; - Traditional style
• Requires explicit break
• Fall-through prone
• More verbose

**Arrow Benefits:**

• Multiple cases: case A, B, C ->
• Block expressions with yield
• Expression-oriented programming`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Arrow vs Colon - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Arrow vs Colon Syntax - Java 21
public class ArrowVsColonDemo {

  // OLD: Traditional colon syntax (error-prone)
  static String getDayTypeOld(String day) {
    String result;
    switch (day) {
      case "Monday":
      case "Tuesday":
      case "Wednesday":
      case "Thursday":
      case "Friday":
        result = "Weekday";
        break;
      case "Saturday":
      case "Sunday":
        result = "Weekend";
        break;
      default:
        result = "Invalid day";
        break;
    }
    return result;
  }

  // NEW in Java 21: Arrow syntax (no fall-through, can return)
  static String getDayTypeNew(String day) {
    return switch (day) {
      case "Monday", "Tuesday", "Wednesday", "Thursday", "Friday" -> "Weekday";
      case "Saturday", "Sunday" -> "Weekend";
      default -> "Invalid day";
    };
  }

  // Arrow syntax with multiple statements
  static String analyzeNumber(int num) {
    return switch (num) {
      case 0 -> "Zero";

      case 1, 2, 3, 4, 5 -> {
        String result = "Small positive: " + num;
        System.out.println("Processing: " + result);
        yield result; // yield for block expressions
      }

      case -1, -2, -3, -4, -5 -> {
        String result = "Small negative: " + num;
        System.out.println("Processing: " + result);
        yield result;
      }

      default -> {
        if (num > 0) {
          yield "Large positive: " + num;
        } else {
          yield "Large negative: " + num;
        }
      }
    };
  }

  // Pattern matching with arrow syntax
  static String formatValue(Object obj) {
    return switch (obj) {
      case null -> "null";
      case String s -> "String of length " + s.length();
      case Integer i when i < 0 -> "Negative integer";
      case Integer i -> "Positive integer: " + i;
      case Double d -> String.format("Double: %.2f", d);
      case Object o -> "Unknown: " + o.getClass().getSimpleName();
    };
  }

  // Can still use colon syntax if needed (not recommended)
  static void demonstrateColonSyntax(int value) {
    switch (value) {
      case 1:
        System.out.println("One");
        break;
      case 2:
        System.out.println("Two");
        break;
      default:
        System.out.println("Other");
        break;
    }
  }

  public static void main(String[] args) {
    // Compare old vs new
    System.out.println(getDayTypeOld("Monday"));
    System.out.println(getDayTypeNew("Monday"));
    System.out.println(getDayTypeNew("Saturday"));
    System.out.println(getDayTypeNew("InvalidDay"));

    // Multiple statements with yield
    System.out.println(analyzeNumber(3));
    System.out.println(analyzeNumber(-2));
    System.out.println(analyzeNumber(100));
    System.out.println(analyzeNumber(-100));

    // Pattern matching
    System.out.println(formatValue(null));
    System.out.println(formatValue("Hello"));
    System.out.println(formatValue(-5));
    System.out.println(formatValue(42));
    System.out.println(formatValue(3.14));

    // Output:
    // Weekday
    // Weekday
    // Weekend
    // Invalid day
    // Processing: Small positive: 3
    // Small positive: 3
    // Processing: Small negative: -2
    // Small negative: -2
    // Large positive: 100
    // Large negative: -100
    // null
    // String of length 5
    // Negative integer
    // Positive integer: 42
    // Double: 3.14
  }
}`
    },
    {
      name: 'Pattern Destructuring',
      icon: '🔹',
      explanation: `**Inline Extraction:**

• if (obj instanceof Point(int x, int y))
• Extract components without accessor calls
• Components automatically scoped
• Clean, concise syntax

**Comparison:**

• Old: Point p = (Point) obj; int x = p.x();
• New: if (obj instanceof Point(int x, int y))
• Eliminates intermediate variables
• More readable code

**Benefits:**

• Concise data extraction
• Type-safe pattern matching
• Works with nested records`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Pattern Destructuring - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Record Pattern Destructuring - Java 21
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

  // Destructuring in if-statements
  static String describeDistance(Object obj) {
    if (obj instanceof Point(int x, int y)) {
      double distance = Math.sqrt(x * x + y * y);
      return "Distance from origin: " + distance;
    }
    return "Not a point";
  }

  // Multiple instanceof with destructuring
  static String describe(Object obj) {
    if (obj instanceof Point(int x, int y)) {
      return "Point: x=" + x + ", y=" + y;
    } else if (obj instanceof Person(String name, int age)) {
      return "Person: " + name + ", age " + age;
    } else if (obj instanceof Employee(Person(String name, int age), String dept, double salary)) {
      return name + " (age " + age + ") works in " + dept + ", earns $" + salary;
    }
    return "Unknown";
  }

  // Destructuring with guards
  static boolean isOnAxisOrOrigin(Object obj) {
    return obj instanceof Point(int x, int y) && (x == 0 || y == 0);
  }

  static boolean isHighEarner(Object obj) {
    return obj instanceof Employee(Person p, String dept, double salary)
           && salary > 100000;
  }

  public static void main(String[] args) {
    Point p1 = new Point(3, 4);
    Point p2 = new Point(0, 5);
    Person person = new Person("Alice", 30);
    Employee emp = new Employee(new Person("Bob", 35), "Engineering", 120000);

    printPointNew(p1);
    System.out.println(describeDistance(p1));
    System.out.println(isOnAxisOrOrigin(p2));

    System.out.println(describe(p1));
    System.out.println(describe(person));
    System.out.println(describe(emp));

    System.out.println("Is high earner? " + isHighEarner(emp));

    // Output:
    // Point at (3, 4)
    // Distance from origin: 5.0
    // true
    // Point: x=3, y=4
    // Person: Alice, age 30
    // Bob (age 35) works in Engineering, earns $120000.0
    // Is high earner? true
  }
}`
    },
    {
      name: 'Nested Patterns',
      icon: '🔹',
      explanation: `**Deep Destructuring:**

• case Line(Point(int x1, int y1), Point(int x2, int y2))
• Arbitrary nesting depth supported
• Destructure entire object graphs
• Single pattern for complex structures

**Hierarchical Data:**

• Perfect for tree structures
• Nested record extraction
• Clean navigation of complex types
• Type-safe all the way down

**Power and Clarity:**

• Eliminates nested accessor chains
• One pattern replaces many method calls
• Readable complex data access`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Nested Patterns - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Nested Record Patterns - Java 21
public class NestedPatternsDemo {
  record Point(int x, int y) {}
  record Line(Point start, Point end) {}
  record Triangle(Point a, Point b, Point c) {}
  record BoundingBox(Point topLeft, Point bottomRight) {}
  record Shape(String name, BoundingBox box) {}

  // Simple nesting
  static double lineLength(Line line) {
    // Destructure nested Point records!
    if (line instanceof Line(Point(int x1, int y1), Point(int x2, int y2))) {
      int dx = x2 - x1;
      int dy = y2 - y1;
      return Math.sqrt(dx * dx + dy * dy);
    }
    return 0;
  }

  // Deep nesting with switch
  static String analyzeShape(Object obj) {
    return switch (obj) {
      // 3 levels deep!
      case Shape(String name, BoundingBox(Point(int x1, int y1), Point(int x2, int y2))) -> {
        int width = x2 - x1;
        int height = y2 - y1;
        yield name + " bounds: " + width + "x" + height +
              " at (" + x1 + "," + y1 + ")";
      }

      case Triangle(Point(int x1, int y1), Point(int x2, int y2), Point(int x3, int y3)) -> {
        // Calculate area using coordinates
        double area = Math.abs((x1 * (y2 - y3) +
                                x2 * (y3 - y1) +
                                x3 * (y1 - y2)) / 2.0);
        yield "Triangle area: " + area;
      }

      case Line(Point(int x1, int y1), Point(int x2, int y2))
           when x1 == x2 ->
        "Vertical line at x=" + x1;

      case Line(Point(int x1, int y1), Point(int x2, int y2))
           when y1 == y2 ->
        "Horizontal line at y=" + y1;

      case Line(Point(int x1, int y1), Point(int x2, int y2)) ->
        "Diagonal line from (" + x1 + "," + y1 + ") to (" + x2 + "," + y2 + ")";

      case Point(int x, int y) ->
        "Point at (" + x + ", " + y + ")";

      case null -> "null";
      default -> "Unknown shape";
    };
  }

  // Complex nested structure
  record Company(String name, Employee ceo) {}
  record Employee(Person person, Department dept) {}
  record Person(String firstName, String lastName, int age) {}
  record Department(String name, Location location) {}
  record Location(String city, String country) {}

  static String getCompanyInfo(Company company) {
    // Destructure entire hierarchy!
    if (company instanceof Company(
         String companyName,
         Employee(
           Person(String firstName, String lastName, int age),
           Department(String deptName, Location(String city, String country))
         )
       )) {
      return companyName + " CEO: " + firstName + " " + lastName +
             " (age " + age + "), " + deptName + " dept in " + city + ", " + country;
    }
    return "Invalid company";
  }

  public static void main(String[] args) {
    Line line1 = new Line(new Point(0, 0), new Point(3, 4));
    Line line2 = new Line(new Point(2, 5), new Point(2, 10));

    System.out.println("Length: " + lineLength(line1));
    System.out.println(analyzeShape(line1));
    System.out.println(analyzeShape(line2));

    Triangle tri = new Triangle(new Point(0, 0), new Point(4, 0), new Point(2, 3));
    System.out.println(analyzeShape(tri));

    Shape shape = new Shape("Rectangle",
                            new BoundingBox(new Point(10, 20), new Point(50, 80)));
    System.out.println(analyzeShape(shape));

    Company company = new Company(
      "TechCorp",
      new Employee(
        new Person("Jane", "Doe", 45),
        new Department("Engineering", new Location("San Francisco", "USA"))
      )
    );
    System.out.println(getCompanyInfo(company));

    // Output:
    // Length: 5.0
    // Diagonal line from (0,0) to (3,4)
    // Vertical line at x=2
    // Triangle area: 6.0
    // Rectangle bounds: 40x60 at (10,20)
    // TechCorp CEO: Jane Doe (age 45), Engineering dept in San Francisco, USA
  }
}`
    },
    {
      name: 'Switch Integration',
      icon: '🔹',
      explanation: `**Switch Expressions:**

• Use record patterns in switch
• case Circle(Point center, int radius) -> ...
• Type-safe data extraction
• Compile-time verification

**Sealed Types:**

• Combined with sealed hierarchies
• Exhaustive matching guaranteed
• No default case needed
• Compiler-verified completeness

**Benefits:**

• Clean pattern matching syntax
• Guards with when clauses
• Nested destructuring support`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Switch Integration - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Record Patterns in Switch - Java 21
public class RecordSwitchIntegration {
  record Point(int x, int y) {}
  record Circle(Point center, int radius) {}
  record Rectangle(Point corner, int width, int height) {}

  // Sealed hierarchy with records
  sealed interface Shape permits CircleShape, RectShape, TriangleShape {}
  record CircleShape(Point center, double radius) implements Shape {}
  record RectShape(Point topLeft, double width, double height) implements Shape {}
  record TriangleShape(Point p1, Point p2, Point p3) implements Shape {}

  // Switch with record patterns
  static double calculateArea(Shape shape) {
    // Exhaustive matching with destructuring!
    return switch (shape) {
      case CircleShape(Point center, double r) ->
        Math.PI * r * r;

      case RectShape(Point corner, double w, double h) ->
        w * h;

      case TriangleShape(Point(int x1, int y1), Point(int x2, int y2), Point(int x3, int y3)) -> {
        // Heron's formula
        double a = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        double b = Math.sqrt(Math.pow(x3 - x2, 2) + Math.pow(y3 - y2, 2));
        double c = Math.sqrt(Math.pow(x1 - x3, 2) + Math.pow(y1 - y3, 2));
        double s = (a + b + c) / 2;
        yield Math.sqrt(s * (s - a) * (s - b) * (s - c));
      }
    };
  }

  // Guards with record patterns
  static String categorizeShape(Shape shape) {
    return switch (shape) {
      case CircleShape(Point(int x, int y), double r)
           when x == 0 && y == 0 && r < 10 ->
        "Small circle at origin";

      case CircleShape(Point(int x, int y), double r)
           when x == 0 && y == 0 ->
        "Circle at origin, radius " + r;

      case CircleShape(Point center, double r)
           when r < 5 ->
        "Small circle";

      case CircleShape(Point center, double r) ->
        "Circle with radius " + r;

      case RectShape(Point corner, double w, double h)
           when w == h ->
        "Square " + w + "x" + h;

      case RectShape(Point corner, double w, double h) ->
        "Rectangle " + w + "x" + h;

      case TriangleShape t ->
        "Triangle";
    };
  }

  // Complex example: Expression evaluation
  sealed interface Expr {}
  record Const(int value) implements Expr {}
  record Add(Expr left, Expr right) implements Expr {}
  record Mul(Expr left, Expr right) implements Expr {}
  record Neg(Expr expr) implements Expr {}

  static int eval(Expr expr) {
    return switch (expr) {
      case Const(int value) -> value;
      case Neg(Expr e) -> -eval(e);
      case Add(Expr left, Expr right) -> eval(left) + eval(right);
      case Mul(Expr left, Expr right) -> eval(left) * eval(right);
    };
  }

  public static void main(String[] args) {
    Shape circle1 = new CircleShape(new Point(0, 0), 5.0);
    Shape circle2 = new CircleShape(new Point(10, 10), 3.0);
    Shape rect1 = new RectShape(new Point(0, 0), 5.0, 5.0);
    Shape rect2 = new RectShape(new Point(0, 0), 10.0, 20.0);
    Shape tri = new TriangleShape(new Point(0, 0), new Point(4, 0), new Point(2, 3));

    System.out.println("Circle area: " + calculateArea(circle1));
    System.out.println("Rectangle area: " + calculateArea(rect2));
    System.out.println("Triangle area: " + calculateArea(tri));

    System.out.println(categorizeShape(circle1));
    System.out.println(categorizeShape(circle2));
    System.out.println(categorizeShape(rect1));
    System.out.println(categorizeShape(rect2));

    // Expression evaluation
    // (3 + 5) * 2
    Expr expr = new Mul(new Add(new Const(3), new Const(5)), new Const(2));
    System.out.println("Expression result: " + eval(expr));

    // Output:
    // Circle area: 78.53981633974483
    // Rectangle area: 200.0
    // Triangle area: 6.0
    // Circle at origin, radius 5.0
    // Small circle
    // Square 5.0x5.0
    // Rectangle 10.0x20.0
    // Expression result: 16
  }
}`
    },
    {
      name: 'Unnamed Patterns',
      icon: '🔹',
      explanation: `**Underscore Syntax:**

• case Point(int x, _) -> ... - Ignore component
• Explicitly ignore unused components
• Makes intent clear
• Compiler validates but doesn't bind

**Use Cases:**

• Partial matching scenarios
• Focus on relevant components only
• Nested patterns with _
• Multiple underscores allowed

**Benefits:**

• Clear intent in code
• Avoid unused variable warnings
• Better readability`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Unnamed Patterns - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Unnamed Patterns with Underscore - Java 21
public class UnnamedPatternsDemo {
  record Point(int x, int y) {}
  record Point3D(int x, int y, int z) {}
  record Person(String name, int age, String email) {}
  record RGB(int red, int green, int blue) {}

  // Ignore unused components with _
  static String describeX(Object obj) {
    return switch (obj) {
      // Only care about x, ignore y
      case Point(int x, _) -> "x coordinate: " + x;
      case Point3D(int x, _, _) -> "x coordinate: " + x;
      default -> "Not a point";
    };
  }

  static String describeY(Object obj) {
    return switch (obj) {
      // Only care about y, ignore x
      case Point(_, int y) -> "y coordinate: " + y;
      case Point3D(_, int y, _) -> "y coordinate: " + y;
      default -> "Not a point";
    };
  }

  // Partial matching with guards
  static boolean isRed(RGB color) {
    // Only check red, ignore green and blue
    return switch (color) {
      case RGB(int r, _, _) when r > 200 -> true;
      case RGB(_, _, _) -> false;
    };
  }

  static boolean isAdult(Person person) {
    // Only care about age, ignore name and email
    return switch (person) {
      case Person(_, int age, _) when age >= 18 -> true;
      case Person(_, _, _) -> false;
    };
  }

  // Multiple unnamed patterns
  record Matrix2D(int a, int b, int c, int d) {}

  static int getDeterminant(Matrix2D matrix) {
    // Extract only diagonal elements
    if (matrix instanceof Matrix2D(int a, _, _, int d)) {
      // Simplified for 2D: det = ad - bc
      // But if we only care about diagonal: a * d
      return a * d;
    }
    return 0;
  }

  // Nested unnamed patterns
  record Line(Point start, Point end) {}

  static boolean isHorizontal(Line line) {
    // Only care about y coordinates
    return switch (line) {
      case Line(Point(_, int y1), Point(_, int y2)) when y1 == y2 -> true;
      case Line(_, _) -> false;
    };
  }

  static boolean isVertical(Line line) {
    // Only care about x coordinates
    return switch (line) {
      case Line(Point(int x1, _), Point(int x2, _)) when x1 == x2 -> true;
      case Line(_, _) -> false;
    };
  }

  // Unnamed in complex patterns
  record Employee(Person person, String department, double salary) {}

  static String getEmployeeName(Employee emp) {
    // Only extract name, ignore everything else
    return switch (emp) {
      case Employee(Person(String name, _, _), _, _) -> name;
    };
  }

  static boolean isHighPaidEngineer(Employee emp) {
    // Check department and salary, ignore person details
    return switch (emp) {
      case Employee(_, String dept, double salary)
           when dept.equals("Engineering") && salary > 150000 -> true;
      case Employee(_, _, _) -> false;
    };
  }

  public static void main(String[] args) {
    Point p = new Point(5, 10);
    Point3D p3d = new Point3D(1, 2, 3);

    System.out.println(describeX(p));
    System.out.println(describeX(p3d));
    System.out.println(describeY(p));
    System.out.println(describeY(p3d));

    RGB red = new RGB(255, 50, 50);
    RGB blue = new RGB(50, 50, 255);
    System.out.println("Is red? " + isRed(red));
    System.out.println("Is red? " + isRed(blue));

    Person child = new Person("Alice", 15, "alice@example.com");
    Person adult = new Person("Bob", 25, "bob@example.com");
    System.out.println("Alice is adult? " + isAdult(child));
    System.out.println("Bob is adult? " + isAdult(adult));

    Line horizontal = new Line(new Point(1, 5), new Point(10, 5));
    Line vertical = new Line(new Point(3, 1), new Point(3, 10));
    Line diagonal = new Line(new Point(0, 0), new Point(5, 5));

    System.out.println("Is horizontal? " + isHorizontal(horizontal));
    System.out.println("Is vertical? " + isVertical(vertical));
    System.out.println("Is horizontal? " + isHorizontal(diagonal));

    Employee emp = new Employee(
      new Person("Carol", 30, "carol@example.com"),
      "Engineering",
      160000
    );
    System.out.println("Employee name: " + getEmployeeName(emp));
    System.out.println("High paid engineer? " + isHighPaidEngineer(emp));

    // Output:
    // x coordinate: 5
    // x coordinate: 1
    // y coordinate: 10
    // y coordinate: 2
    // Is red? true
    // Is red? false
    // Alice is adult? false
    // Bob is adult? true
    // Is horizontal? true
    // Is vertical? true
    // Is horizontal? false
    // Employee name: Carol
    // High paid engineer? true
  }
}`
    },
    {
      name: 'Type Inference',
      icon: '🔹',
      explanation: `**Automatic Inference:**

• Compiler infers types from context
• Works with generics and complex hierarchies
• Pattern variables properly scoped
• Type-safe throughout

**Generic Support:**

• Infers type parameters automatically
• Complex generic patterns supported
• Nested generic types handled
• No explicit type annotations needed

**Safety:**

• Compile-time type checking
• Safe and convenient extraction
• No runtime type errors`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Type Inference - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Type Inference in Record Patterns - Java 21
public class TypeInferenceDemo {
  record Box<T>(T value) {}
  record Pair<A, B>(A first, B second) {}
  record Triple<A, B, C>(A first, B second, C third) {}

  // Generic type inference
  static <T> String describeBox(Box<T> box) {
    // Type T is inferred from context
    if (box instanceof Box(var value)) {
      return "Box contains: " + value +
             " (" + value.getClass().getSimpleName() + ")";
    }
    return "Empty box";
  }

  // Nested generic inference
  static <A, B> String describePair(Pair<A, B> pair) {
    if (pair instanceof Pair(var first, var second)) {
      return "Pair: " + first + " (" + first.getClass().getSimpleName() +
             ") and " + second + " (" + second.getClass().getSimpleName() + ")";
    }
    return "Empty pair";
  }

  // Complex generic patterns
  record Container<T>(Box<T> box, String label) {}

  static <T> String describeContainer(Container<T> container) {
    // Nested generic type inference!
    if (container instanceof Container(Box(var value), var label)) {
      return label + ": " + value;
    }
    return "Empty";
  }

  // Inference with sealed types
  sealed interface Result<T> {}
  record Success<T>(T value) implements Result<T> {}
  record Failure<T>(String error) implements Result<T> {}

  static <T> String handleResult(Result<T> result) {
    return switch (result) {
      // Type T inferred for both cases
      case Success(var value) ->
        "Success: " + value;
      case Failure(var error) ->
        "Failure: " + error;
    };
  }

  // Multiple type parameters
  static <A, B, C> String describeTriple(Triple<A, B, C> triple) {
    return switch (triple) {
      case Triple(var a, var b, var c) ->
        a + ", " + b + ", " + c;
    };
  }

  // Inference with wildcards
  static String describeWildcard(Box<?> box) {
    if (box instanceof Box(var value)) {
      // Type inferred as Object (upper bound of ?)
      return "Contains: " + value;
    }
    return "Empty";
  }

  // Bounded type parameters
  record NumberBox<T extends Number>(T value) {}

  static <T extends Number> double getDoubleValue(NumberBox<T> box) {
    if (box instanceof NumberBox(var value)) {
      // value inferred as T extends Number
      return value.doubleValue(); // Can call Number methods!
    }
    return 0.0;
  }

  // Complex nested inference
  record Node<T>(T value, Box<Node<T>> next) {}

  static <T> String describeNode(Node<T> node) {
    return switch (node) {
      case Node(var value, Box(var next)) when next != null ->
        value + " -> " + next.value;
      case Node(var value, Box(var next)) ->
        value + " (end)";
      case Node(var value, _) ->
        value.toString();
    };
  }

  public static void main(String[] args) {
    // Basic generic inference
    Box<String> strBox = new Box<>("Hello");
    Box<Integer> intBox = new Box<>(42);
    System.out.println(describeBox(strBox));
    System.out.println(describeBox(intBox));

    // Pair inference
    Pair<String, Integer> pair = new Pair<>("answer", 42);
    System.out.println(describePair(pair));

    // Nested generics
    Container<String> container = new Container<>(new Box<>("data"), "myLabel");
    System.out.println(describeContainer(container));

    // Result types
    Result<Integer> success = new Success<>(100);
    Result<Integer> failure = new Failure<>("Error occurred");
    System.out.println(handleResult(success));
    System.out.println(handleResult(failure));

    // Triple
    Triple<String, Integer, Boolean> triple = new Triple<>("test", 42, true);
    System.out.println(describeTriple(triple));

    // Wildcard
    Box<?> wildcardBox = new Box<>(3.14);
    System.out.println(describeWildcard(wildcardBox));

    // Bounded types
    NumberBox<Integer> numBox = new NumberBox<>(42);
    System.out.println("Double value: " + getDoubleValue(numBox));

    // Nested nodes
    Node<String> node2 = new Node<>("World", new Box<>(null));
    Node<String> node1 = new Node<>("Hello", new Box<>(node2));
    System.out.println(describeNode(node1));
    System.out.println(describeNode(node2));

    // Output:
    // Box contains: Hello (String)
    // Box contains: 42 (Integer)
    // Pair: answer (String) and 42 (Integer)
    // myLabel: data
    // Success: 100
    // Failure: Error occurred
    // test, 42, true
    // Contains: 3.14
    // Double value: 42.0
    // Hello -> World
    // World (end)
  }
}`
    },
    {
      name: 'Unified API',
      icon: '🔹',
      explanation: `**New Interfaces:**

• SequencedCollection - Base interface
• SequencedSet - For sets with order
• SequencedMap - For maps with order
• Consistent API across all

**Design Goals:**

• Uniform operations for ordered collections
• Fill gaps in Collections API
• Retroactively applied to existing types
• Better developer experience

**Hierarchy:**

• List, Deque implement SequencedCollection
• LinkedHashSet, TreeSet implement SequencedSet
• LinkedHashMap, TreeMap implement SequencedMap`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Unified API - Implementation
// ═══════════════════════════════════════════════════════════════════════════

import java.util.*;

// Sequenced Collections Unified API - Java 21
public class SequencedAPIDemo {
  public static void main(String[] args) {
    // NEW in Java 21: Sequenced Collection hierarchy
    // SequencedCollection <- List, Deque
    // SequencedSet <- LinkedHashSet, SortedSet
    // SequencedMap <- LinkedHashMap, SortedMap

    // Before Java 21: Different APIs for different collections
    List<String> list = new ArrayList<>(List.of("A", "B", "C"));
    Deque<String> deque = new ArrayDeque<>(List.of("A", "B", "C"));
    LinkedHashSet<String> set = new LinkedHashSet<>(List.of("A", "B", "C"));

    // OLD WAY: Inconsistent APIs
    // list.get(0) - first element
    // deque.getFirst() - first element
    // set.iterator().next() - first element (awkward!)

    // NEW in Java 21: Uniform API!
    System.out.println("=== Uniform getFirst() ===");
    System.out.println("List first: " + list.getFirst());
    System.out.println("Deque first: " + deque.getFirst());
    System.out.println("Set first: " + set.getFirst());

    System.out.println("\n=== Uniform getLast() ===");
    System.out.println("List last: " + list.getLast());
    System.out.println("Deque last: " + deque.getLast());
    System.out.println("Set last: " + set.getLast());

    // Sequenced Map
    LinkedHashMap<String, Integer> map = new LinkedHashMap<>();
    map.put("first", 1);
    map.put("second", 2);
    map.put("third", 3);

    System.out.println("\n=== Sequenced Map ===");
    System.out.println("First entry: " + map.firstEntry());
    System.out.println("Last entry: " + map.lastEntry());
    System.out.println("First key: " + map.sequencedKeySet().getFirst());
    System.out.println("Last key: " + map.sequencedKeySet().getLast());

    // Output:
    // === Uniform getFirst() ===
    // List first: A
    // Deque first: A
    // Set first: A
    //
    // === Uniform getLast() ===
    // List last: C
    // Deque last: C
    // Set last: C
    //
    // === Sequenced Map ===
    // First entry: first=1
    // Last entry: third=3
    // First key: first
    // Last key: third
  }
}`
    },
    {
      name: 'Common Operations',
      icon: '🔹',
      explanation: `**Core Methods:**

• getFirst() - Access first element
• getLast() - Access last element
• addFirst(E) - Add at beginning
• addLast(E) - Add at end
• removeFirst() - Remove and return first
• removeLast() - Remove and return last

**Consistency:**

• Same API across List, Deque, Set
• No more type-specific patterns
• Eliminates awkward workarounds
• Clean, uniform interface

**Benefits:**

• Easier to learn and remember
• Code works with any sequenced collection
• Improved API ergonomics`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Common Operations - Implementation
// ═══════════════════════════════════════════════════════════════════════════

import java.util.*;

// Common Operations on Sequenced Collections - Java 21
public class SequencedOperationsDemo {
  public static void main(String[] args) {
    // All sequenced collections support the same operations!
    List<String> list = new ArrayList<>();
    Deque<String> deque = new LinkedList<>();
    LinkedHashSet<String> set = new LinkedHashSet<>();

    // addFirst() - works on all!
    System.out.println("=== addFirst() ===");
    list.addFirst("First");
    deque.addFirst("First");
    set.addFirst("First");
    System.out.println("List: " + list);
    System.out.println("Deque: " + deque);
    System.out.println("Set: " + set);

    // addLast() - works on all!
    System.out.println("\n=== addLast() ===");
    list.addLast("Last");
    deque.addLast("Last");
    set.addLast("Last");
    System.out.println("List: " + list);
    System.out.println("Deque: " + deque);
    System.out.println("Set: " + set);

    // Add middle elements
    list.add("Middle");
    deque.add("Middle");
    set.add("Middle");

    // getFirst() and getLast()
    System.out.println("\n=== get operations ===");
    System.out.println("List first: " + list.getFirst() + ", last: " + list.getLast());
    System.out.println("Deque first: " + deque.getFirst() + ", last: " + deque.getLast());
    System.out.println("Set first: " + set.getFirst() + ", last: " + set.getLast());

    // removeFirst() and removeLast()
    System.out.println("\n=== remove operations ===");
    System.out.println("List removed first: " + list.removeFirst());
    System.out.println("Deque removed last: " + deque.removeLast());
    System.out.println("Set removed first: " + set.removeFirst());

    System.out.println("\nAfter removals:");
    System.out.println("List: " + list);
    System.out.println("Deque: " + deque);
    System.out.println("Set: " + set);

    // Works with TreeSet too!
    TreeSet<Integer> sortedSet = new TreeSet<>(List.of(5, 2, 8, 1, 9));
    System.out.println("\n=== TreeSet (SequencedSet) ===");
    System.out.println("First: " + sortedSet.getFirst());  // 1 (smallest)
    System.out.println("Last: " + sortedSet.getLast());    // 9 (largest)
    sortedSet.addFirst(0);  // Adds to set (maintains order)
    System.out.println("After addFirst(0): " + sortedSet);

    // Output:
    // === addFirst() ===
    // List: [First]
    // Deque: [First]
    // Set: [First]
    //
    // === addLast() ===
    // List: [First, Last]
    // Deque: [First, Last]
    // Set: [First, Last]
    //
    // === get operations ===
    // List first: First, last: Last
    // Deque first: First, last: Last
    // Set first: First, last: Last
    //
    // === remove operations ===
    // List removed first: First
    // Deque removed last: Last
    // Set removed first: First
    //
    // After removals:
    // List: [Middle, Last]
    // Deque: [First, Middle]
    // Set: [Last, Middle]
    //
    // === TreeSet (SequencedSet) ===
    // First: 1
    // Last: 9
    // After addFirst(0): [0, 1, 2, 5, 8, 9]
  }
}`
    },
    {
      name: 'Reversed Views',
      icon: '🔹',
      explanation: `**View Pattern:**

• reversed() returns a view, not a copy
• Backed by original collection
• Changes reflect in both directions
• Efficient - no data duplication

**Operations:**

• Iterate in reverse without copying
• Modify through reversed view
• Works with all sequenced collections
• Double reversal returns original

**Performance:**

• O(1) view creation
• No memory overhead
• Maintains collection semantics`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Reversed Views - Implementation
// ═══════════════════════════════════════════════════════════════════════════

import java.util.*;

// Reversed Views - Java 21
public class ReversedViewsDemo {
  public static void main(String[] args) {
    List<String> list = new ArrayList<>(List.of("A", "B", "C", "D", "E"));

    // NEW in Java 21: reversed() creates a view (not a copy!)
    List<String> reversedView = list.reversed();

    System.out.println("Original: " + list);
    System.out.println("Reversed view: " + reversedView);

    // Modifications to original reflect in reversed view
    list.add("F");
    System.out.println("\nAfter adding 'F' to original:");
    System.out.println("Original: " + list);
    System.out.println("Reversed view: " + reversedView);

    // Modifications to reversed view reflect in original!
    reversedView.addFirst("Z");  // Adds to end of original
    System.out.println("\nAfter adding 'Z' to reversed view:");
    System.out.println("Original: " + list);
    System.out.println("Reversed view: " + reversedView);

    // Efficient iteration in reverse (no copying!)
    System.out.println("\n=== Iterate in reverse ===");
    for (String s : reversedView) {
      System.out.print(s + " ");
    }

    // Works with Deque
    Deque<Integer> deque = new ArrayDeque<>(List.of(1, 2, 3, 4, 5));
    Deque<Integer> reversedDeque = deque.reversed();
    System.out.println("\n\n=== Deque ===");
    System.out.println("Original deque: " + deque);
    System.out.println("Reversed deque: " + reversedDeque);

    // Works with LinkedHashMap
    LinkedHashMap<String, Integer> map = new LinkedHashMap<>();
    map.put("first", 1);
    map.put("second", 2);
    map.put("third", 3);

    SequencedMap<String, Integer> reversedMap = map.reversed();
    System.out.println("\n=== LinkedHashMap ===");
    System.out.println("Original: " + map);
    System.out.println("Reversed: " + reversedMap);

    // Double reversal gives original
    List<String> doubleReversed = list.reversed().reversed();
    System.out.println("\n=== Double reversal ===");
    System.out.println("Original: " + list);
    System.out.println("Reversed twice: " + doubleReversed);
    System.out.println("Same reference? " + (list == doubleReversed));

    // Output:
    // Original: [A, B, C, D, E]
    // Reversed view: [E, D, C, B, A]
    //
    // After adding 'F' to original:
    // Original: [A, B, C, D, E, F]
    // Reversed view: [F, E, D, C, B, A]
    //
    // After adding 'Z' to reversed view:
    // Original: [A, B, C, D, E, F, Z]
    // Reversed view: [Z, F, E, D, C, B, A]
    //
    // === Iterate in reverse ===
    // Z F E D C B A
    //
    // === Deque ===
    // Original deque: [1, 2, 3, 4, 5]
    // Reversed deque: [5, 4, 3, 2, 1]
    //
    // === LinkedHashMap ===
    // Original: {first=1, second=2, third=3}
    // Reversed: {third=3, second=2, first=1}
    //
    // === Double reversal ===
    // Original: [A, B, C, D, E, F, Z]
    // Reversed twice: [A, B, C, D, E, F, Z]
    // Same reference? true
  }
}`
    },
    {
      name: 'Retrofitted Collections',
      icon: '🔹',
      explanation: `**Retrofitted Types:**

• List (ArrayList, LinkedList)
• Deque (ArrayDeque, LinkedList)
• LinkedHashSet
• SortedSet (TreeSet)
• LinkedHashMap
• SortedMap (TreeMap)

**Backward Compatibility:**

• No breaking changes to existing code
• All previous APIs still work
• New methods added to interfaces
• Default implementations provided

**Migration:**

• Existing code continues to work
• Can adopt new APIs incrementally
• No code changes required`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Retrofitted Collections - Implementation
// ═══════════════════════════════════════════════════════════════════════════

import java.util.*;

// Retrofitted Collections - Java 21
public class RetrofittedCollectionsDemo {
  public static void main(String[] args) {
    // All these existing collections now support Sequenced operations!

    // 1. ArrayList (List -> SequencedCollection)
    ArrayList<String> arrayList = new ArrayList<>(List.of("a", "b", "c"));
    System.out.println("=== ArrayList ===");
    System.out.println("First: " + arrayList.getFirst());
    System.out.println("Last: " + arrayList.getLast());
    System.out.println("Reversed: " + arrayList.reversed());

    // 2. LinkedList (List, Deque -> SequencedCollection)
    LinkedList<String> linkedList = new LinkedList<>(List.of("x", "y", "z"));
    System.out.println("\n=== LinkedList ===");
    linkedList.addFirst("w");
    linkedList.addLast("!");
    System.out.println("LinkedList: " + linkedList);

    // 3. ArrayDeque (Deque -> SequencedCollection)
    ArrayDeque<Integer> arrayDeque = new ArrayDeque<>(List.of(1, 2, 3));
    System.out.println("\n=== ArrayDeque ===");
    System.out.println("First: " + arrayDeque.getFirst());
    System.out.println("Last: " + arrayDeque.getLast());

    // 4. LinkedHashSet (Set -> SequencedSet)
    LinkedHashSet<String> linkedHashSet = new LinkedHashSet<>(List.of("one", "two", "three"));
    System.out.println("\n=== LinkedHashSet ===");
    System.out.println("First: " + linkedHashSet.getFirst());
    System.out.println("Last: " + linkedHashSet.getLast());
    System.out.println("Reversed: " + linkedHashSet.reversed());

    // 5. TreeSet (SortedSet -> SequencedSet)
    TreeSet<Integer> treeSet = new TreeSet<>(List.of(5, 2, 8, 1, 9));
    System.out.println("\n=== TreeSet ===");
    System.out.println("First (min): " + treeSet.getFirst());
    System.out.println("Last (max): " + treeSet.getLast());
    System.out.println("Reversed: " + treeSet.reversed());

    // 6. LinkedHashMap (Map -> SequencedMap)
    LinkedHashMap<String, Integer> linkedHashMap = new LinkedHashMap<>();
    linkedHashMap.put("A", 1);
    linkedHashMap.put("B", 2);
    linkedHashMap.put("C", 3);
    System.out.println("\n=== LinkedHashMap ===");
    System.out.println("First entry: " + linkedHashMap.firstEntry());
    System.out.println("Last entry: " + linkedHashMap.lastEntry());
    System.out.println("Reversed: " + linkedHashMap.reversed());

    // 7. TreeMap (SortedMap -> SequencedMap)
    TreeMap<String, Integer> treeMap = new TreeMap<>();
    treeMap.put("Z", 26);
    treeMap.put("A", 1);
    treeMap.put("M", 13);
    System.out.println("\n=== TreeMap ===");
    System.out.println("First entry: " + treeMap.firstEntry());
    System.out.println("Last entry: " + treeMap.lastEntry());
    System.out.println("Reversed: " + treeMap.reversed());

    // Backward compatibility - existing code works unchanged!
    List<String> oldList = new ArrayList<>(List.of("old", "code"));
    oldList.add("works");  // Existing API
    oldList.addLast("new API");  // New API
    System.out.println("\n=== Backward Compatibility ===");
    System.out.println("Old and new API together: " + oldList);

    // Output:
    // === ArrayList ===
    // First: a
    // Last: c
    // Reversed: [c, b, a]
    //
    // === LinkedList ===
    // LinkedList: [w, x, y, z, !]
    //
    // === ArrayDeque ===
    // First: 1
    // Last: 3
    //
    // === LinkedHashSet ===
    // First: one
    // Last: three
    // Reversed: [three, two, one]
    //
    // === TreeSet ===
    // First (min): 1
    // Last (max): 9
    // Reversed: [9, 8, 5, 2, 1]
    //
    // === LinkedHashMap ===
    // First entry: A=1
    // Last entry: C=3
    // Reversed: {C=3, B=2, A=1}
    //
    // === TreeMap ===
    // First entry: A=1
    // Last entry: Z=26
    // Reversed: {Z=26, M=13, A=1}
    //
    // === Backward Compatibility ===
    // Old and new API together: [old, code, works, new API]
  }
}`
    },
    {
      name: 'Bidirectional Access',
      icon: '🔹',
      explanation: `**Uniform Access:**

• Access elements from both ends
• Same API for all ordered collections
• First/last element access consistent
• Add/remove from either end

**Simplification:**

• Code works with any sequenced collection
• No type-specific patterns needed
• Generic methods possible
• Better API consistency

**Use Cases:**

• Queue and deque operations
• LRU cache implementations
• Double-ended processing
• Sliding window algorithms`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Bidirectional Access - Implementation
// ═══════════════════════════════════════════════════════════════════════════

import java.util.*;

// Bidirectional Access - Java 21
public class BidirectionalAccessDemo {

  // Generic method works with any SequencedCollection!
  static <T> void processEnds(SequencedCollection<T> collection) {
    System.out.println("First element: " + collection.getFirst());
    System.out.println("Last element: " + collection.getLast());
    System.out.println("Collection: " + collection);
  }

  // Process map ends
  static <K, V> void processMapEnds(SequencedMap<K, V> map) {
    System.out.println("First entry: " + map.firstEntry());
    System.out.println("Last entry: " + map.lastEntry());
  }

  public static void main(String[] args) {
    // Works with any sequenced collection!
    System.out.println("=== List ===");
    processEnds(new ArrayList<>(List.of(1, 2, 3, 4, 5)));

    System.out.println("\n=== Deque ===");
    processEnds(new ArrayDeque<>(List.of("A", "B", "C")));

    System.out.println("\n=== LinkedHashSet ===");
    processEnds(new LinkedHashSet<>(List.of("X", "Y", "Z")));

    System.out.println("\n=== TreeSet ===");
    processEnds(new TreeSet<>(List.of(10, 5, 15, 20, 1)));

    // Bidirectional iteration
    List<String> list = new ArrayList<>(List.of("A", "B", "C", "D", "E"));

    System.out.println("\n=== Forward iteration ===");
    for (String s : list) {
      System.out.print(s + " ");
    }

    System.out.println("\n\n=== Backward iteration ===");
    for (String s : list.reversed()) {
      System.out.print(s + " ");
    }

    // Uniform access pattern for maps
    System.out.println("\n\n=== LinkedHashMap ===");
    LinkedHashMap<String, Integer> map1 = new LinkedHashMap<>();
    map1.put("first", 1);
    map1.put("second", 2);
    map1.put("third", 3);
    processMapEnds(map1);

    System.out.println("\n=== TreeMap ===");
    TreeMap<String, Integer> map2 = new TreeMap<>();
    map2.put("Z", 26);
    map2.put("A", 1);
    map2.put("M", 13);
    processMapEnds(map2);

    // Remove from both ends uniformly
    System.out.println("\n=== Remove from ends ===");
    List<Integer> numbers = new ArrayList<>(List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));
    System.out.println("Original: " + numbers);

    numbers.removeFirst();  // Remove 1
    numbers.removeLast();   // Remove 10
    System.out.println("After removing ends: " + numbers);

    numbers.removeFirst();  // Remove 2
    numbers.removeLast();   // Remove 9
    System.out.println("After removing ends again: " + numbers);

    // Output:
    // === List ===
    // First element: 1
    // Last element: 5
    // Collection: [1, 2, 3, 4, 5]
    //
    // === Deque ===
    // First element: A
    // Last element: C
    // Collection: [A, B, C]
    //
    // === LinkedHashSet ===
    // First element: X
    // Last element: Z
    // Collection: [X, Y, Z]
    //
    // === TreeSet ===
    // First element: 1
    // Last element: 20
    // Collection: [1, 5, 10, 15, 20]
    //
    // === Forward iteration ===
    // A B C D E
    //
    // === Backward iteration ===
    // E D C B A
    //
    // === LinkedHashMap ===
    // First entry: first=1
    // Last entry: third=3
    //
    // === TreeMap ===
    // First entry: A=1
    // Last entry: Z=26
    //
    // === Remove from ends ===
    // Original: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    // After removing ends: [2, 3, 4, 5, 6, 7, 8, 9]
    // After removing ends again: [3, 4, 5, 6, 7, 8]
  }
}`
    },
    {
      name: 'Use Cases',
      icon: '🔹',
      explanation: `**Common Patterns:**

• LRU caches - Access both ends efficiently
• Queue processing - FIFO operations
• Ordered data structures - Maintain insertion order
• Bidirectional iteration - Forward and reverse

**Algorithms:**

• Sliding window algorithms
• Deque-based solutions
• Time-series data processing
• History/undo stacks

**Benefits:**

• Simplifies collection operations
• More intuitive APIs
• Better algorithm implementations
• Clean, readable code`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Use Cases - Implementation
// ═══════════════════════════════════════════════════════════════════════════

import java.util.*;

// Sequenced Collections Use Cases - Java 21
public class SequencedUseCasesDemo {

  // Use Case 1: Simple LRU Cache using LinkedHashMap
  static class LRUCache<K, V> {
    private final int capacity;
    private final LinkedHashMap<K, V> cache;

    public LRUCache(int capacity) {
      this.capacity = capacity;
      this.cache = new LinkedHashMap<>();
    }

    public V get(K key) {
      V value = cache.remove(key);
      if (value != null) {
        cache.put(key, value);  // Move to end (most recently used)
      }
      return value;
    }

    public void put(K key, V value) {
      cache.remove(key);  // Remove if exists
      cache.put(key, value);  // Add at end

      // NEW in Java 21: Easy access to oldest entry!
      if (cache.size() > capacity) {
        cache.pollFirstEntry();  // Remove oldest (LRU)
      }
    }

    public void display() {
      System.out.println("Cache (MRU to LRU): " + cache.reversed());
    }
  }

  // Use Case 2: Deque-based sliding window
  static List<Integer> maxSlidingWindow(int[] nums, int k) {
    List<Integer> result = new ArrayList<>();
    Deque<Integer> deque = new ArrayDeque<>();

    for (int i = 0; i < nums.length; i++) {
      // Remove elements outside window
      while (!deque.isEmpty() && deque.getFirst() < i - k + 1) {
        deque.removeFirst();
      }

      // Remove smaller elements (not useful)
      while (!deque.isEmpty() && nums[deque.getLast()] < nums[i]) {
        deque.removeLast();
      }

      deque.addLast(i);

      if (i >= k - 1) {
        result.add(nums[deque.getFirst()]);
      }
    }
    return result;
  }

  // Use Case 3: Undo/Redo stack
  static class UndoRedoManager<T> {
    private final Deque<T> undoStack = new ArrayDeque<>();
    private final Deque<T> redoStack = new ArrayDeque<>();

    public void execute(T action) {
      undoStack.addLast(action);
      redoStack.clear();
      System.out.println("Executed: " + action);
    }

    public void undo() {
      if (!undoStack.isEmpty()) {
        T action = undoStack.removeLast();
        redoStack.addLast(action);
        System.out.println("Undid: " + action);
      }
    }

    public void redo() {
      if (!redoStack.isEmpty()) {
        T action = redoStack.removeLast();
        undoStack.addLast(action);
        System.out.println("Redid: " + action);
      }
    }

    public void showState() {
      System.out.println("Can undo: " + !undoStack.isEmpty());
      System.out.println("Can redo: " + !redoStack.isEmpty());
      if (!undoStack.isEmpty()) {
        System.out.println("Last action: " + undoStack.getLast());
      }
    }
  }

  public static void main(String[] args) {
    // Use Case 1: LRU Cache
    System.out.println("=== LRU Cache ===");
    LRUCache<String, Integer> cache = new LRUCache<>(3);
    cache.put("A", 1);
    cache.put("B", 2);
    cache.put("C", 3);
    cache.display();

    cache.get("A");  // Access A (moves to end)
    cache.display();

    cache.put("D", 4);  // Evicts B (least recently used)
    cache.display();

    // Use Case 2: Sliding Window Maximum
    System.out.println("\n=== Sliding Window Maximum ===");
    int[] nums = {1, 3, -1, -3, 5, 3, 6, 7};
    int k = 3;
    System.out.println("Array: " + Arrays.toString(nums));
    System.out.println("Window size: " + k);
    System.out.println("Max in each window: " + maxSlidingWindow(nums, k));

    // Use Case 3: Undo/Redo
    System.out.println("\n=== Undo/Redo Manager ===");
    UndoRedoManager<String> manager = new UndoRedoManager<>();
    manager.execute("Type 'Hello'");
    manager.execute("Type ' World'");
    manager.execute("Type '!'");
    manager.showState();

    System.out.println();
    manager.undo();
    manager.undo();
    manager.showState();

    System.out.println();
    manager.redo();
    manager.showState();

    // Use Case 4: Bidirectional queue processing
    System.out.println("\n=== Priority Queue Processing ===");
    Deque<String> queue = new ArrayDeque<>();
    queue.addLast("Normal task 1");
    queue.addLast("Normal task 2");
    queue.addFirst("HIGH PRIORITY");  // Add to front!
    queue.addLast("Normal task 3");

    System.out.println("Processing order:");
    while (!queue.isEmpty()) {
      System.out.println("  " + queue.removeFirst());
    }

    // Output:
    // === LRU Cache ===
    // Cache (MRU to LRU): {C=3, B=2, A=1}
    // Cache (MRU to LRU): {A=1, C=3, B=2}
    // Cache (MRU to LRU): {D=4, A=1, C=3}
    //
    // === Sliding Window Maximum ===
    // Array: [1, 3, -1, -3, 5, 3, 6, 7]
    // Window size: 3
    // Max in each window: [3, 3, 5, 5, 6, 7]
    //
    // === Undo/Redo Manager ===
    // Executed: Type 'Hello'
    // Executed: Type ' World'
    // Executed: Type '!'
    // Can undo: true
    // Can redo: false
    // Last action: Type '!'
    //
    // Undid: Type '!'
    // Undid: Type ' World'
    // Can undo: true
    // Can redo: true
    // Last action: Type 'Hello'
    //
    // Redid: Type ' World'
    // Can undo: true
    // Can redo: true
    // Last action: Type ' World'
    //
    // === Priority Queue Processing ===
    // Processing order:
    //   HIGH PRIORITY
    //   Normal task 1
    //   Normal task 2
    //   Normal task 3
  }
}`
    }
  ]

  const categories = [
    {
      id: 'virtual-threads',
      name: 'Virtual Threads',
      icon: '🧵',
      color: '#8b5cf6',
      description: 'Lightweight threads managed by JVM for massive concurrency',
      conceptIds: [0, 1, 2, 3, 4, 5]
    },
    {
      id: 'pattern-matching',
      name: 'Pattern Matching for Switch',
      icon: '🔀',
      color: '#3b82f6',
      description: 'Enhanced switch expressions with type patterns and guards',
      conceptIds: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
    },
    {
      id: 'sequenced-collections',
      name: 'Sequenced Collections',
      icon: '📋',
      color: '#10b981',
      description: 'Unified API for collections with defined encounter order',
      conceptIds: [17, 18, 19, 20, 21, 22]
    }
  ]

  return (
    <div style={{
      padding: '1.5rem',
      maxWidth: '80rem',
      margin: '0 auto',
      background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)',
      color: 'white',
      minHeight: '100vh',
      borderRadius: '16px',
      boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
      border: '3px solid rgba(245, 158, 11, 0.4)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={onBack}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              background: '#f59e0b',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#d97706'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#f59e0b'}
          >
            ← Back to Java
          </button>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '800',
            background: 'linear-gradient(to right, #fbbf24, #f97316)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
            Java 21 LTS
          </h1>
          {currentSubcategory && (
            <span style={{
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
              fontWeight: '600',
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              color: '#fbbf24',
              borderRadius: '8px',
              marginLeft: '1rem',
              border: '1px solid #f59e0b'
            }}>
              {currentSubcategory}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {onPrevious && (
            <button
              onClick={onPrevious}
              style={{
                padding: '0.75rem 1.25rem',
                fontSize: '1rem',
                fontWeight: '600',
                background: '#2563eb',
                color: 'white',
                border: '1px solid #f59e0b',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(55, 65, 81, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#1d4ed8'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#2563eb'}
            >
              ← {previousName}
            </button>
          )}
          {onNext && (
            <button
              onClick={onNext}
              style={{
                padding: '0.75rem 1.25rem',
                fontSize: '1rem',
                fontWeight: '600',
                background: '#2563eb',
                color: 'white',
                border: '1px solid #f59e0b',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(55, 65, 81, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#1d4ed8'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#2563eb'}
            >
              {nextName} →
            </button>
          )}
        </div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      <div style={{
        background: 'linear-gradient(to bottom right, #1f2937, #111827)', padding: '2.5rem 10rem',
        borderRadius: '16px', border: '2px solid #f59e0b', marginBottom: '2rem'
      }}>
        <p style={{
          fontSize: '1.3rem', color: '#d1d5db', fontWeight: '500', margin: 0,
          lineHeight: '1.8', textAlign: 'center'
        }}>
          Experience Java 21 LTS with Virtual Threads, Pattern Matching for switch, Record Patterns, and Sequenced Collections.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedConcept ? '350px 1fr' : selectedCategory ? '350px 1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {!selectedCategory && !selectedConcept && (
          categories.map((category) => (
            <div key={category.id} onClick={() => {
              setSelectedCategory(category);
              setSelectedConcept(concepts[category.conceptIds[0]]);
            }} style={{
                background: 'linear-gradient(to bottom right, #1f2937, #111827)', padding: '2rem',
                borderRadius: '16px', border: '2px solid #f59e0b',
                cursor: 'pointer', transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.15)'
                e.currentTarget.style.borderColor = '#fbbf24'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                e.currentTarget.style.borderColor = '#f59e0b'
              }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>
                {category.icon}
              </div>
              <h3 style={{
                fontSize: '1.5rem', fontWeight: '700', color: '#fbbf24',
                marginBottom: '1rem', textAlign: 'center'
              }}>{category.name}</h3>
              <p style={{
                fontSize: '1rem', color: '#d1d5db', lineHeight: '1.6', textAlign: 'center'
              }}>
                {category.description}
              </p>
            </div>
          ))
        )}
      </div>

      {selectedConcept && selectedCategory && (
        <div
          onClick={() => {
            setSelectedConcept(null);
            setSelectedCategory(null);
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
          }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{
            background: 'linear-gradient(to bottom right, #111827, #1f2937)',
            borderRadius: '16px',
            maxWidth: '1400px',
            width: '100%',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            overflow: 'hidden',
            border: '2px solid #f59e0b'
          }}>
            {/* Modal Header */}
            <div style={{
              background: 'linear-gradient(to right, #1f2937, #374151)',
              padding: '1.5rem 2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '2px solid #f59e0b'
            }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#fbbf24',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                {selectedCategory.icon} {selectedCategory.name}
              </h2>
              <button
                onClick={() => {
                  setSelectedConcept(null);
                  setSelectedCategory(null);
                }}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.5rem 1rem',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontWeight: 'bold'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Content with Sidebar */}
            <div style={{
              display: 'flex',
              flex: 1,
              overflow: 'hidden'
            }}>
              {/* Left Sidebar - Concepts List */}
              <div style={{
                width: '300px',
                borderRight: '2px solid #f59e0b',
                overflowY: 'auto',
                background: 'linear-gradient(to bottom, #1f2937, #111827)',
                padding: '1.5rem'
              }}>
                {selectedCategory.conceptIds.map((conceptId) => {
                  const concept = concepts[conceptId]
                  const isActive = selectedConcept?.name === concept.name
                  return (
                    <button
                      key={conceptId}
                      onClick={() => handleConceptClick(concept)}
                      style={{
                        width: '100%',
                        padding: '1rem',
                        marginBottom: '0.5rem',
                        background: isActive
                          ? 'linear-gradient(to right, #374151, #1f2937)'
                          : '#1f2937',
                        border: isActive
                          ? '2px solid #f59e0b'
                          : '2px solid #374151',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s ease',
                        fontWeight: isActive ? '700' : '600',
                        color: isActive ? '#fbbf24' : '#d1d5db',
                        fontSize: '0.95rem'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = '#2563eb'
                          e.currentTarget.style.borderColor = '#f59e0b'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = '#1f2937'
                          e.currentTarget.style.borderColor = '#374151'
                        }
                      }}
                    >
                      {concept.icon || '🔹'} {concept.name}
                    </button>
                  )
                })}
              </div>

              {/* Right Content Area */}
              <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '2rem',
                background: 'linear-gradient(to bottom right, #111827, #1f2937)'
              }}>
                <h2 style={{
                  fontSize: '2.25rem',
                  fontWeight: '700',
                  color: '#fbbf24',
                  marginBottom: '1.5rem'
                }}>
                  {selectedConcept.icon || '🔹'} {selectedConcept.name}
                </h2>

                {/* Description */}
                <div style={{
                  background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                  padding: '2rem',
                  borderRadius: '12px',
                  border: '2px solid #f59e0b',
                  marginBottom: '2rem'
                }}>
                  {selectedConcept.explanation.split('\n\n').map((section, idx) => {
                    // Check if section starts with **Header:**
                    if (section.startsWith('**') && section.includes(':**')) {
                      const headerMatch = section.match(/\*\*(.*?):\*\*/)
                      if (headerMatch) {
                        const header = headerMatch[1]
                        const content = section.substring(headerMatch[0].length).trim()

                        return (
                          <div key={idx} style={{ marginBottom: idx < selectedConcept.explanation.split('\n\n').length - 1 ? '1.5rem' : 0 }}>
                            <h3 style={{
                              fontSize: '1.3rem',
                              fontWeight: '700',
                              color: '#fbbf24',
                              marginBottom: '0.75rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem'
                            }}>
                              <span style={{
                                width: '4px',
                                height: '1.3rem',
                                backgroundColor: '#fbbf24',
                                borderRadius: '2px'
                              }}></span>
                              {header}
                            </h3>
                            <div style={{
                              fontSize: '1.05rem',
                              lineHeight: '1.8',
                              color: '#d1d5db'
                            }}>
                              {content.split('\n').map((line, lineIdx) => {
                                const trimmedLine = line.trim()

                                // Main bullet point (•)
                                if (trimmedLine.startsWith('•')) {
                                  const bulletContent = trimmedLine.substring(1).trim()
                                  // Check if it contains " - " for name-description format
                                  const dashIndex = bulletContent.indexOf(' - ')
                                  if (dashIndex > 0) {
                                    const name = bulletContent.substring(0, dashIndex)
                                    const description = bulletContent.substring(dashIndex + 3)
                                    return (
                                      <div key={lineIdx} style={{
                                        display: 'flex',
                                        gap: '0.5rem',
                                        marginBottom: '0.5rem',
                                        marginLeft: '0.5rem'
                                      }}>
                                        <span style={{
                                          color: '#fbbf24',
                                          fontWeight: 'bold',
                                          minWidth: '0.5rem'
                                        }}>•</span>
                                        <span>
                                          <strong style={{ color: '#fbbf24' }}>{name}</strong>
                                          {' - '}
                                          {description}
                                        </span>
                                      </div>
                                    )
                                  }
                                  return (
                                    <div key={lineIdx} style={{
                                      display: 'flex',
                                      gap: '0.5rem',
                                      marginBottom: '0.5rem',
                                      marginLeft: '0.5rem'
                                    }}>
                                      <span style={{
                                        color: '#fbbf24',
                                        fontWeight: 'bold',
                                        minWidth: '0.5rem'
                                      }}>•</span>
                                      <span>{bulletContent}</span>
                                    </div>
                                  )
                                }

                                // Sub-bullet point (-)
                                if (trimmedLine.startsWith('-')) {
                                  const bulletContent = trimmedLine.substring(1).trim()
                                  return (
                                    <div key={lineIdx} style={{
                                      display: 'flex',
                                      gap: '0.5rem',
                                      marginBottom: '0.4rem',
                                      marginLeft: '2rem'
                                    }}>
                                      <span style={{
                                        color: '#9ca3af',
                                        minWidth: '0.5rem'
                                      }}>◦</span>
                                      <span style={{ color: '#d1d5db' }}>{bulletContent}</span>
                                    </div>
                                  )
                                }

                                // Regular text
                                if (trimmedLine) {
                                  return <p key={lineIdx} style={{ marginBottom: '0.5rem' }}>{line}</p>
                                }
                                return null
                              })}
                            </div>
                          </div>
                        )
                      }
                    }

                    // Regular paragraph
                    return (
                      <p key={idx} style={{
                        fontSize: '1.1rem',
                        color: '#d1d5db',
                        lineHeight: '1.8',
                        marginBottom: idx < selectedConcept.explanation.split('\n\n').length - 1 ? '1rem' : 0
                      }}>
                        {section}
                      </p>
                    )
                  })}
                </div>

                {/* Code Examples */}
                {selectedConcept.codeExample && (() => {
                  const sections = parseCodeSections(selectedConcept.codeExample)
                  return sections.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {sections.map((section, idx) => (
                        <div key={idx} style={{
                          backgroundColor: '#1e293b',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          border: '2px solid #334155'
                        }}>
                          <div style={{
                            padding: '1rem 1.5rem',
                            backgroundColor: '#334155',
                            color: '#60a5fa',
                            fontSize: '1rem',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}>
                            <span>💻 {section.title}</span>
                          </div>
                          <SyntaxHighlighter code={section.code} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{
                      backgroundColor: '#1e293b',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      border: '2px solid #334155'
                    }}>
                      <SyntaxHighlighter code={selectedConcept.codeExample} />
                    </div>
                  )
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Java21
