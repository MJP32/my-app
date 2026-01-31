import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CompletionCheckbox from '../../components/CompletionCheckbox'

function Java21Questions({ onBack, breadcrumb }) {
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

      // Check for code block start/end
      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          // Start of code block
          inCodeBlock = true
          codeLanguage = line.trim().substring(3) || 'java'
          codeLines = []
        } else {
          // End of code block
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

      // Empty lines for spacing
      if (line.trim() === '') {
        result.push(<div key={lineIndex} style={{ height: '0.5rem' }}></div>)
        continue
      }

      // Bullet points (lines starting with -)
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
              •
            </span>
            <span style={{ flex: 1 }}>{bulletContent}</span>
          </div>
        )
        continue
      }

      // Bold section headers (e.g., **What is RFQ?**)
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

      // Numbered section headers (e.g., **1. Client Initiates:**)
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

      // Regular text with subtle left padding
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
      category: 'Virtual Threads',
      question: 'What are Virtual Threads in Java 21 and how do they improve concurrency?',
      answer: `**Virtual Threads (JEP 444):**
- Lightweight threads managed by the JVM (Project Loom)
- Dramatically reduce cost of creating and managing threads
- Enable simple thread-per-request programming model
- Scale to millions of threads
- Standard feature in Java 21 LTS

**Traditional Threads vs Virtual Threads:**

**Platform Threads (Traditional):**
\`\`\`java
// Platform thread - heavyweight, expensive
Thread thread = new Thread(() -> {
    // Do work
});
thread.start();

// Limited by OS - typically 1000s of threads max
\`\`\`

**Virtual Threads:**
\`\`\`java
// Virtual thread - lightweight, cheap
Thread vThread = Thread.startVirtualThread(() -> {
    // Do work
});

// Can create millions of virtual threads
\`\`\`

**Creating Virtual Threads:**

**1. Using Thread.startVirtualThread():**
\`\`\`java
Thread.startVirtualThread(() -> {
    System.out.println("Running in virtual thread");
});
\`\`\`

**2. Using Thread.ofVirtual():**
\`\`\`java
Thread thread = Thread.ofVirtual()
    .name("virtual-thread-1")
    .start(() -> {
        System.out.println("Virtual thread with name");
    });
\`\`\`

**3. Using Executors:**
\`\`\`java
// Virtual thread executor
try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {
    executor.submit(() -> {
        System.out.println("Task in virtual thread");
    });
}
\`\`\`

**Real-World Example - HTTP Server:**

**Before (Platform Threads - Limited Scalability):**
\`\`\`java
// Thread pool - limited to 200 concurrent requests
ExecutorService executor = Executors.newFixedThreadPool(200);

void handleRequest(Request req) {
    executor.submit(() -> {
        // Blocking I/O - wastes thread while waiting
        String data = database.query(req);
        String result = externalAPI.call(data);
        return result;
    });
}
// Can handle ~200 concurrent requests
\`\`\`

**After (Virtual Threads - Massive Scalability):**
\`\`\`java
// Virtual thread per request - can handle millions
ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor();

void handleRequest(Request req) {
    executor.submit(() -> {
        // Blocking I/O - virtual thread is parked, not wasted
        String data = database.query(req);  // Blocks, thread parked
        String result = externalAPI.call(data);  // Blocks, thread parked
        return result;
    });
}
// Can handle 10,000+ concurrent requests easily
\`\`\`

**Key Benefits:**

**1. Simple Programming Model:**
\`\`\`java
// No need for async/await, callbacks, or reactive streams
// Write simple blocking code

void processOrders() {
    for (Order order : orders) {
        Thread.startVirtualThread(() -> {
            // Simple sequential code
            Customer customer = fetchCustomer(order.customerId());
            Inventory inventory = checkInventory(order.items());
            Payment payment = processPayment(order.amount());
            sendConfirmation(customer, payment);
        });
    }
}
\`\`\`

**2. Resource Efficiency:**
\`\`\`java
// Before: Need thread pool sizing, worry about exhaustion
ExecutorService pool = Executors.newFixedThreadPool(100);

// After: Just create threads as needed
ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor();
\`\`\`

**3. Better Throughput:**
\`\`\`java
// Handle many concurrent I/O operations
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    List<Future<String>> futures = new ArrayList<>();

    // Launch 10,000 concurrent requests
    for (int i = 0; i < 10_000; i++) {
        futures.add(executor.submit(() -> {
            return httpClient.send(request);
        }));
    }

    // Collect results
    List<String> results = futures.stream()
        .map(f -> {
            try { return f.get(); }
            catch (Exception e) { return "error"; }
        })
        .toList();
}
\`\`\`

**How Virtual Threads Work:**

**1. Mounted on Platform Threads:**
- JVM schedules virtual threads on platform threads (carriers)
- When virtual thread blocks on I/O, it's unmounted
- Platform thread can run other virtual threads
- When I/O completes, virtual thread is remounted

**2. Parking:**
\`\`\`java
// When virtual thread blocks on I/O
socket.read();  // Virtual thread parks, platform thread freed

// Platform thread runs other virtual threads while waiting

// When I/O ready
// Virtual thread unparks, continues on any available platform thread
\`\`\`

**When to Use Virtual Threads:**

**Good Use Cases:**
- Web servers handling many concurrent requests
- Microservices with I/O-bound tasks
- Database query processing
- API calls to external services
- File I/O operations
- Network communications

**Not Ideal For:**
- CPU-intensive tasks (no benefit)
- Tasks that hold locks for long periods
- Existing code with ThreadLocal heavy usage

**Migration Example:**

**Before (Platform Threads):**
\`\`\`java
ExecutorService executor = Executors.newFixedThreadPool(100);

public CompletableFuture<Result> processAsync(Request req) {
    return CompletableFuture.supplyAsync(() -> {
        // Complex async chain to avoid blocking
        return process(req);
    }, executor);
}
\`\`\`

**After (Virtual Threads):**
\`\`\`java
ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor();

public Result process(Request req) {
    // Simple blocking code - naturally concurrent
    return process(req);
}
\`\`\`

**Best Practices:**

**1. Use with Blocking APIs:**
\`\`\`java
// Virtual threads work great with blocking I/O
String data = Files.readString(path);  // OK to block
String response = httpClient.send(request);  // OK to block
\`\`\`

**2. Don't Pool Virtual Threads:**
\`\`\`java
// BAD - Don't pool virtual threads
ExecutorService pool = Executors.newFixedThreadPool(100,
    Thread.ofVirtual().factory());

// GOOD - Create on demand
ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor();
\`\`\`

**3. Avoid Long-Running CPU Work:**
\`\`\`java
// BAD - CPU-bound work in virtual thread
Thread.startVirtualThread(() -> {
    while(true) { compute(); }  // Monopolizes carrier thread
});

// GOOD - Use platform thread for CPU work
Thread.ofPlatform().start(() -> {
    while(condition) { compute(); }
});
\`\`\``
    },
    {
      id: 2,
      category: 'Pattern Matching',
      question: 'Explain Pattern Matching for switch in Java 21',
      answer: `**Pattern Matching for switch (JEP 441):**
- Extends switch to work with patterns
- Enables sophisticated data-oriented queries
- Eliminates type casting and null checks
- Supports guarded patterns and when clauses
- Standard feature in Java 21

**Traditional Switch (Limited):**
\`\`\`java
// Old switch - only primitives, enums, Strings
switch (value) {
    case 1:
        System.out.println("One");
        break;
    case 2:
        System.out.println("Two");
        break;
    default:
        System.out.println("Other");
}
\`\`\`

**Pattern Matching Switch (Powerful):**
\`\`\`java
// New switch - patterns, types, guards
switch (obj) {
    case String s -> System.out.println("String: " + s);
    case Integer i -> System.out.println("Integer: " + i);
    case null -> System.out.println("Null");
    default -> System.out.println("Other");
}
\`\`\`

**Type Patterns:**

**Basic Type Matching:**
\`\`\`java
Object obj = getObject();

String result = switch (obj) {
    case String s -> "String of length " + s.length();
    case Integer i -> "Integer: " + i;
    case Double d -> "Double: " + d;
    case null -> "Null value";
    default -> "Unknown type";
};
\`\`\`

**With Record Patterns:**
\`\`\`java
record Point(int x, int y) {}
record Circle(Point center, double radius) {}
record Rectangle(Point topLeft, Point bottomRight) {}

double getArea(Object shape) {
    return switch (shape) {
        case Circle(Point(int x, int y), double r) ->
            Math.PI * r * r;
        case Rectangle(Point(int x1, int y1), Point(int x2, int y2)) ->
            Math.abs((x2 - x1) * (y2 - y1));
        default -> 0.0;
    };
}
\`\`\`

**Guarded Patterns (when clause):**

**Simple Guards:**
\`\`\`java
String classify(Object obj) {
    return switch (obj) {
        case String s when s.length() > 10 -> "Long string";
        case String s when s.length() > 5 -> "Medium string";
        case String s -> "Short string";
        case Integer i when i > 0 -> "Positive integer";
        case Integer i when i < 0 -> "Negative integer";
        case Integer i -> "Zero";
        default -> "Other type";
    };
}
\`\`\`

**Complex Guards:**
\`\`\`java
String processRequest(Object request) {
    return switch (request) {
        case String s when s.startsWith("/api/") && s.length() < 100 ->
            "Valid API request";
        case String s when s.contains("admin") ->
            "Admin request";
        case Integer i when i >= 200 && i < 300 ->
            "Success status";
        case Integer i when i >= 400 && i < 500 ->
            "Client error";
        case null -> "Null request";
        default -> "Unknown request";
    };
}
\`\`\`

**Null Handling:**

**Explicit null case:**
\`\`\`java
String describe(Object obj) {
    return switch (obj) {
        case null -> "It's null";
        case String s -> "String: " + s;
        case Integer i -> "Integer: " + i;
        default -> "Something else";
    };
}
\`\`\`

**Combining null with type:**
\`\`\`java
String handle(String s) {
    return switch (s) {
        case null, "" -> "Empty";
        case String str when str.length() < 5 -> "Short";
        case String str -> "Long: " + str;
    };
}
\`\`\`

**Real-World Examples:**

**1. Processing Different Message Types:**
\`\`\`java
sealed interface Message permits TextMessage, ImageMessage, VideoMessage {}
record TextMessage(String content) implements Message {}
record ImageMessage(String url, int width, int height) implements Message {}
record VideoMessage(String url, int duration) implements Message {}

String processMessage(Message msg) {
    return switch (msg) {
        case TextMessage(String content) when content.length() > 100 ->
            "Long text: " + content.substring(0, 100) + "...";
        case TextMessage(String content) ->
            "Text: " + content;
        case ImageMessage(String url, int w, int h) when w > 1920 ->
            "High-res image: " + url;
        case ImageMessage(String url, int w, int h) ->
            "Image: " + url + " (" + w + "x" + h + ")";
        case VideoMessage(String url, int duration) when duration > 600 ->
            "Long video: " + url;
        case VideoMessage(String url, int duration) ->
            "Video: " + url + " (" + duration + "s)";
    };
}
\`\`\`

**2. Expression Tree Evaluation:**
\`\`\`java
sealed interface Expr permits Constant, Add, Multiply, Negate {}
record Constant(int value) implements Expr {}
record Add(Expr left, Expr right) implements Expr {}
record Multiply(Expr left, Expr right) implements Expr {}
record Negate(Expr expr) implements Expr {}

int eval(Expr expr) {
    return switch (expr) {
        case Constant(int value) -> value;
        case Add(Expr left, Expr right) -> eval(left) + eval(right);
        case Multiply(Expr left, Expr right) -> eval(left) * eval(right);
        case Negate(Expr e) -> -eval(e);
    };
}
\`\`\`

**3. HTTP Response Handling:**
\`\`\`java
sealed interface Response permits Success, ClientError, ServerError {}
record Success(int code, String body) implements Response {}
record ClientError(int code, String message) implements Response {}
record ServerError(int code, String error) implements Response {}

String handleResponse(Response response) {
    return switch (response) {
        case Success(int code, String body) when code == 200 ->
            "OK: " + body;
        case Success(int code, String body) when code == 201 ->
            "Created: " + body;
        case Success(int code, String body) ->
            "Success: " + code;
        case ClientError(int code, String msg) when code == 404 ->
            "Not found: " + msg;
        case ClientError(int code, String msg) ->
            "Client error " + code + ": " + msg;
        case ServerError(int code, String error) ->
            "Server error " + code + ": " + error;
    };
}
\`\`\`

**Switch Expressions vs Statements:**

**Expression (returns value):**
\`\`\`java
String result = switch (value) {
    case 1 -> "One";
    case 2 -> "Two";
    default -> "Other";
};
\`\`\`

**Statement (performs action):**
\`\`\`java
switch (value) {
    case 1 -> System.out.println("One");
    case 2 -> System.out.println("Two");
    default -> System.out.println("Other");
}
\`\`\`

**Exhaustiveness:**

**Compiler ensures all cases covered:**
\`\`\`java
sealed interface Shape permits Circle, Square {}
record Circle(double radius) implements Shape {}
record Square(double side) implements Shape {}

// No default needed - compiler knows all types
double area(Shape shape) {
    return switch (shape) {
        case Circle(double r) -> Math.PI * r * r;
        case Square(double s) -> s * s;
        // Compiler error if any case missing!
    };
}
\`\`\`

**Benefits:**

**1. Type Safety:**
- No casting needed
- Compiler verifies all cases

**2. Null Safety:**
- Explicit null handling
- No NullPointerException

**3. Exhaustiveness:**
- Compiler ensures completeness
- Refactoring safety

**4. Readability:**
- Clear and concise
- Self-documenting code`
    },
    {
      id: 3,
      category: 'Sequenced Collections',
      question: 'What are Sequenced Collections in Java 21?',
      answer: `**Sequenced Collections (JEP 431):**
- New interfaces for collections with defined encounter order
- Uniform API for accessing first/last elements
- Reverse views of collections
- Fills long-standing gap in Collections Framework
- Standard feature in Java 21

**The Problem Before Java 21:**
\`\`\`java
// Getting first element - inconsistent APIs
List<String> list = new ArrayList<>();
String first = list.get(0);  // List way

Deque<String> deque = new ArrayDeque<>();
String first = deque.getFirst();  // Deque way

SortedSet<String> set = new TreeSet<>();
String first = set.first();  // SortedSet way

// Getting last element - even worse
String last = list.get(list.size() - 1);  // List
String last = deque.getLast();  // Deque
String last = set.last();  // SortedSet

// No standard way to reverse!
\`\`\`

**New Interface Hierarchy:**

\`\`\`
SequencedCollection
    ├── List
    ├── Deque
    └── SequencedSet
            └── SortedSet
                    └── NavigableSet

SequencedMap
    └── SortedMap
            └── NavigableMap
\`\`\`

**SequencedCollection Methods:**

\`\`\`java
interface SequencedCollection<E> extends Collection<E> {
    // Access first/last
    E getFirst();
    E getLast();

    // Add first/last
    void addFirst(E e);
    void addLast(E e);

    // Remove first/last
    E removeFirst();
    E removeLast();

    // Reverse view
    SequencedCollection<E> reversed();
}
\`\`\`

**Using SequencedCollection:**

**1. Uniform Access:**
\`\`\`java
List<String> list = List.of("A", "B", "C");
String first = list.getFirst();  // "A"
String last = list.getLast();    // "C"

Deque<String> deque = new ArrayDeque<>(List.of("X", "Y", "Z"));
String first = deque.getFirst();  // "X"
String last = deque.getLast();    // "Z"

LinkedHashSet<String> set = new LinkedHashSet<>(List.of("1", "2", "3"));
String first = set.getFirst();  // "1"
String last = set.getLast();    // "3"
\`\`\`

**2. Reversed Views:**
\`\`\`java
List<String> list = List.of("A", "B", "C", "D");

// Create reversed view
SequencedCollection<String> reversed = list.reversed();

// Iterate in reverse
for (String s : reversed) {
    System.out.println(s);  // D, C, B, A
}

// Changes to original reflect in reversed
List<String> mutable = new ArrayList<>(list);
SequencedCollection<String> rev = mutable.reversed();
mutable.add("E");
System.out.println(rev.getFirst());  // "E"
\`\`\`

**3. Add/Remove First/Last:**
\`\`\`java
List<String> list = new ArrayList<>();
list.addFirst("First");  // Add at beginning
list.addLast("Last");    // Add at end

String first = list.removeFirst();  // Remove and return first
String last = list.removeLast();    // Remove and return last
\`\`\`

**SequencedSet:**

\`\`\`java
interface SequencedSet<E> extends Set<E>, SequencedCollection<E> {
    SequencedSet<E> reversed();  // Returns SequencedSet
}

// Usage
LinkedHashSet<Integer> set = new LinkedHashSet<>();
set.addFirst(1);
set.addLast(3);
set.addLast(2);

System.out.println(set);  // [1, 3, 2]
System.out.println(set.reversed());  // [2, 3, 1]

Integer first = set.getFirst();  // 1
Integer last = set.getLast();    // 2
\`\`\`

**SequencedMap:**

\`\`\`java
interface SequencedMap<K,V> extends Map<K,V> {
    // Access first/last entries
    Map.Entry<K,V> firstEntry();
    Map.Entry<K,V> lastEntry();

    // Remove first/last entries
    Map.Entry<K,V> pollFirstEntry();
    Map.Entry<K,V> pollLastEntry();

    // Add first/last
    V putFirst(K k, V v);
    V putLast(K k, V v);

    // Reversed view
    SequencedMap<K,V> reversed();

    // Sequenced views
    SequencedSet<K> sequencedKeySet();
    SequencedCollection<V> sequencedValues();
    SequencedSet<Entry<K,V>> sequencedEntrySet();
}
\`\`\`

**Using SequencedMap:**

\`\`\`java
LinkedHashMap<String, Integer> map = new LinkedHashMap<>();
map.put("one", 1);
map.put("two", 2);
map.put("three", 3);

// Access first/last
Map.Entry<String, Integer> first = map.firstEntry();  // one=1
Map.Entry<String, Integer> last = map.lastEntry();    // three=3

// Add at ends
map.putFirst("zero", 0);  // Adds at beginning
map.putLast("four", 4);   // Adds at end

// Reversed view
SequencedMap<String, Integer> reversed = map.reversed();
for (var entry : reversed.sequencedEntrySet()) {
    System.out.println(entry);  // four=4, three=3, two=2, one=1, zero=0
}

// Remove first/last
Map.Entry<String, Integer> removed = map.pollFirstEntry();  // Removes zero=0
\`\`\`

**Real-World Examples:**

**1. LRU Cache:**
\`\`\`java
class LRUCache<K, V> {
    private final LinkedHashMap<K, V> cache = new LinkedHashMap<>();
    private final int capacity;

    public LRUCache(int capacity) {
        this.capacity = capacity;
    }

    public V get(K key) {
        V value = cache.remove(key);
        if (value != null) {
            cache.putLast(key, value);  // Move to end (most recent)
        }
        return value;
    }

    public void put(K key, V value) {
        cache.remove(key);
        if (cache.size() >= capacity) {
            cache.pollFirstEntry();  // Remove least recently used
        }
        cache.putLast(key, value);  // Add as most recent
    }
}
\`\`\`

**2. Task Queue with Priority:**
\`\`\`java
class TaskQueue {
    private final LinkedHashSet<Task> tasks = new LinkedHashSet<>();

    public void addUrgent(Task task) {
        tasks.addFirst(task);  // High priority at front
    }

    public void addNormal(Task task) {
        tasks.addLast(task);  // Normal priority at end
    }

    public Task getNext() {
        return tasks.isEmpty() ? null : tasks.removeFirst();
    }

    public void processInReverse() {
        for (Task task : tasks.reversed()) {
            process(task);  // Process from last to first
        }
    }
}
\`\`\`

**3. Browser History:**
\`\`\`java
class BrowserHistory {
    private final LinkedHashSet<String> history = new LinkedHashSet<>();

    public void visit(String url) {
        history.remove(url);  // Remove if exists
        history.addLast(url);  // Add to end (most recent)
    }

    public String currentPage() {
        return history.getLast();  // Most recent
    }

    public List<String> getRecentHistory(int count) {
        return history.reversed().stream()
            .limit(count)
            .toList();  // Most recent first
    }
}
\`\`\`

**Migration Guide:**

**Before Java 21:**
\`\`\`java
List<String> list = new ArrayList<>();
list.add(0, "first");  // Add at beginning
String last = list.get(list.size() - 1);  // Get last

// Reverse iteration - awkward
for (int i = list.size() - 1; i >= 0; i--) {
    String element = list.get(i);
}
\`\`\`

**After Java 21:**
\`\`\`java
List<String> list = new ArrayList<>();
list.addFirst("first");  // Clearer intent
String last = list.getLast();  // Simpler

// Reverse iteration - elegant
for (String element : list.reversed()) {
    // Process element
}
\`\`\`

**Benefits:**

**1. Consistency:**
- Same API across collection types
- No need to remember different methods

**2. Efficiency:**
- reversed() creates view, not copy
- O(1) operations

**3. Clarity:**
- Intent is clear
- Less error-prone

**4. Functionality:**
- Operations previously missing or awkward
- Standard way to reverse collections`
    },
    {
      id: 4,
      category: 'Record Patterns',
      question: 'Explain Record Patterns in Java 21',
      answer: `**Record Patterns (JEP 440):**
- Deconstruct record values in pattern matching
- Extract components in single expression
- Enables nested pattern matching
- Works with instanceof and switch
- Standard feature in Java 21

**Basic Record Pattern:**

**Without Record Patterns:**
\`\`\`java
record Point(int x, int y) {}

// Old way - verbose
if (obj instanceof Point) {
    Point p = (Point) obj;
    int x = p.x();
    int y = p.y();
    System.out.println("Point: " + x + ", " + y);
}
\`\`\`

**With Record Patterns:**
\`\`\`java
// New way - concise
if (obj instanceof Point(int x, int y)) {
    System.out.println("Point: " + x + ", " + y);
}
\`\`\`

**In Switch Expressions:**

**Simple Record Matching:**
\`\`\`java
record Point(int x, int y) {}
record Circle(Point center, double radius) {}
record Rectangle(Point topLeft, Point bottomRight) {}

String describe(Object shape) {
    return switch (shape) {
        case Point(int x, int y) ->
            "Point at (" + x + ", " + y + ")";
        case Circle(Point(int x, int y), double r) ->
            "Circle at (" + x + ", " + y + ") with radius " + r;
        case Rectangle(Point(int x1, int y1), Point(int x2, int y2)) ->
            "Rectangle from (" + x1 + "," + y1 + ") to (" + x2 + "," + y2 + ")";
        default -> "Unknown shape";
    };
}
\`\`\`

**Nested Patterns:**

**Deep Nesting:**
\`\`\`java
record Address(String street, String city, String zip) {}
record Person(String name, Address address) {}
record Employee(Person person, String employeeId) {}

String getCity(Object obj) {
    return switch (obj) {
        case Employee(Person(String name, Address(var street, var city, var zip)), var id) ->
            "Employee " + name + " works in " + city;
        case Person(String name, Address(var street, var city, var zip)) ->
            name + " lives in " + city;
        case Address(var street, var city, var zip) ->
            "City: " + city;
        default -> "Unknown";
    };
}
\`\`\`

**Partial Matching:**
\`\`\`java
record Person(String name, int age, Address address) {}

// Only extract what you need
if (obj instanceof Person(String name, _, _)) {
    System.out.println("Person named: " + name);
}

// Or use var for unused components
if (obj instanceof Person(String name, var age, var address)) {
    System.out.println("Just the name: " + name);
}
\`\`\`

**Guards with Record Patterns:**

**Combining Patterns and Conditions:**
\`\`\`java
record Box(Object content) {}

String analyze(Object obj) {
    return switch (obj) {
        case Box(String s) when s.length() > 10 ->
            "Box with long string";
        case Box(String s) ->
            "Box with short string: " + s;
        case Box(Integer i) when i > 100 ->
            "Box with large integer";
        case Box(Integer i) ->
            "Box with small integer: " + i;
        case Box(null) ->
            "Empty box";
        default -> "Not a box";
    };
}
\`\`\`

**Real-World Examples:**

**1. JSON-like Data Processing:**
\`\`\`java
sealed interface JsonValue {}
record JsonObject(Map<String, JsonValue> fields) implements JsonValue {}
record JsonArray(List<JsonValue> elements) implements JsonValue {}
record JsonString(String value) implements JsonValue {}
record JsonNumber(double value) implements JsonValue {}
record JsonBoolean(boolean value) implements JsonValue {}
record JsonNull() implements JsonValue {}

String prettyPrint(JsonValue json, int indent) {
    String spaces = " ".repeat(indent);
    return switch (json) {
        case JsonObject(var fields) -> {
            StringBuilder sb = new StringBuilder("{\\n");
            for (var entry : fields.entrySet()) {
                sb.append(spaces).append("  ")
                  .append(entry.getKey()).append(": ")
                  .append(prettyPrint(entry.getValue(), indent + 2))
                  .append("\\n");
            }
            yield sb.append(spaces).append("}").toString();
        }
        case JsonArray(var elements) -> {
            StringBuilder sb = new StringBuilder("[\\n");
            for (var element : elements) {
                sb.append(spaces).append("  ")
                  .append(prettyPrint(element, indent + 2))
                  .append(",\\n");
            }
            yield sb.append(spaces).append("]").toString();
        }
        case JsonString(var value) -> "\\"" + value + "\\"";
        case JsonNumber(var value) -> String.valueOf(value);
        case JsonBoolean(var value) -> String.valueOf(value);
        case JsonNull() -> "null";
    };
}
\`\`\`

**2. Expression Trees:**
\`\`\`java
sealed interface Expr {}
record Const(int value) implements Expr {}
record Add(Expr left, Expr right) implements Expr {}
record Mul(Expr left, Expr right) implements Expr {}
record Neg(Expr expr) implements Expr {}

// Evaluate with pattern matching
int eval(Expr expr) {
    return switch (expr) {
        case Const(int value) -> value;
        case Add(Expr left, Expr right) -> eval(left) + eval(right);
        case Mul(Expr left, Expr right) -> eval(left) * eval(right);
        case Neg(Expr e) -> -eval(e);
    };
}

// Simplify expressions
Expr simplify(Expr expr) {
    return switch (expr) {
        case Add(Const(0), Expr e) -> simplify(e);  // 0 + e = e
        case Add(Expr e, Const(0)) -> simplify(e);  // e + 0 = e
        case Mul(Const(0), Expr e) -> new Const(0);  // 0 * e = 0
        case Mul(Expr e, Const(0)) -> new Const(0);  // e * 0 = 0
        case Mul(Const(1), Expr e) -> simplify(e);  // 1 * e = e
        case Mul(Expr e, Const(1)) -> simplify(e);  // e * 1 = e
        case Neg(Neg(Expr e)) -> simplify(e);  // --e = e
        case Add(Expr l, Expr r) -> new Add(simplify(l), simplify(r));
        case Mul(Expr l, Expr r) -> new Mul(simplify(l), simplify(r));
        case Neg(Expr e) -> new Neg(simplify(e));
        default -> expr;
    };
}
\`\`\`

**3. Message Processing:**
\`\`\`java
sealed interface Message {}
record TextMessage(String sender, String content, long timestamp) implements Message {}
record ImageMessage(String sender, byte[] image, String caption) implements Message {}
record SystemMessage(String type, Map<String, Object> data) implements Message {}

void processMessage(Message msg) {
    switch (msg) {
        case TextMessage(var sender, var content, var timestamp)
            when content.contains("@admin") -> {
            notifyAdmin(sender, content);
        }
        case TextMessage(var sender, var content, var timestamp) -> {
            displayText(sender, content, formatTime(timestamp));
        }
        case ImageMessage(var sender, var image, var caption)
            when image.length > 1_000_000 -> {
            compressAndStore(sender, image, caption);
        }
        case ImageMessage(var sender, var image, var caption) -> {
            displayImage(sender, image, caption);
        }
        case SystemMessage("user_joined", var data) -> {
            String username = (String) data.get("username");
            showNotification(username + " joined");
        }
        case SystemMessage("user_left", var data) -> {
            String username = (String) data.get("username");
            showNotification(username + " left");
        }
        case SystemMessage(var type, var data) -> {
            logSystemEvent(type, data);
        }
    }
}
\`\`\`

**Generic Record Patterns:**

\`\`\`java
record Box<T>(T content) {}

// Generic pattern matching
String processBox(Box<?> box) {
    return switch (box) {
        case Box(String s) -> "String: " + s;
        case Box(Integer i) -> "Integer: " + i;
        case Box(List<?> list) -> "List of size " + list.size();
        default -> "Other box";
    };
}
\`\`\`

**Benefits:**

**1. Conciseness:**
- Extract all components in one line
- No explicit getters needed

**2. Safety:**
- Type checked by compiler
- No ClassCastException

**3. Readability:**
- Clear intent
- Pattern shows structure

**4. Composability:**
- Nest patterns arbitrarily deep
- Combine with guards

**Best Practices:**

**1. Use When Structure Matters:**
\`\`\`java
// Good - structure is relevant
case Circle(Point(int x, int y), double r) -> ...

// Less good - only need one field
case Person p -> ... p.name() ...
\`\`\`

**2. Combine with Sealed Types:**
\`\`\`java
// Sealed + Record Patterns = Exhaustive matching
sealed interface Shape permits Circle, Rectangle {}
record Circle(double radius) implements Shape {}
record Rectangle(double width, double height) implements Shape {}

// Compiler ensures all cases covered
double area(Shape shape) {
    return switch (shape) {
        case Circle(double r) -> Math.PI * r * r;
        case Rectangle(double w, double h) -> w * h;
    };
}
\`\`\``
    },
    {
      id: 5,
      category: 'Generational ZGC',
      difficulty: 'Hard',
      question: 'Explain Generational ZGC in Java 21. How does it improve upon non-generational ZGC?',
      answer: `**Generational ZGC (Java 21):**

**Overview:**
Java 21 made ZGC generational by default, adding generation-aware garbage collection to ZGC's already impressive low-latency characteristics. This combines the benefits of generational GC with ZGC's sub-millisecond pause times.

**Why Generational GC:**

**Weak Generational Hypothesis:**
- Most objects die young
- Young objects collected more frequently
- Old objects collected less frequently
- Reduces total GC work

**Before Java 21 (Non-Generational ZGC):**
\`\`\`
Problems:
- All objects treated equally
- More GC cycles needed
- More memory bandwidth used
- Less efficient for typical workloads
\`\`\`

**After Java 21 (Generational ZGC):**
\`\`\`
Benefits:
- Young generation collected frequently (minor GC)
- Old generation collected infrequently (major GC)
- Lower overall CPU usage
- Better throughput
- Still sub-millisecond pauses
\`\`\`

**Architecture:**

**Memory Layout:**
\`\`\`
┌─────────────────────────────────────┐
│         ZGC Heap                    │
├─────────────────────────────────────┤
│  Young Generation                   │
│  - Eden space                       │
│  - Recently allocated objects       │
│  - Collected frequently             │
├─────────────────────────────────────┤
│  Old Generation                     │
│  - Long-lived objects               │
│  - Promoted from young              │
│  - Collected infrequently           │
└─────────────────────────────────────┘
\`\`\`

**GC Cycles:**

**1. Minor GC (Young Generation):**
\`\`\`
Frequency: High
Pause Time: < 1ms
Work: Collect young generation
Result: Dead young objects freed, survivors promoted
\`\`\`

**2. Major GC (Full Heap):**
\`\`\`
Frequency: Low
Pause Time: < 1ms
Work: Collect entire heap
Result: Both young and old objects collected
\`\`\`

**Enabling Generational ZGC:**

**Java 21+:**
\`\`\`bash
# Generational ZGC enabled by default
java -XX:+UseZGC MyApplication

# Explicitly enable (redundant in Java 21+)
java -XX:+UseZGC -XX:+ZGenerational MyApplication

# Disable generational (use old non-generational)
java -XX:+UseZGC -XX:-ZGenerational MyApplication
\`\`\`

**Configuration:**

**Young Generation Size:**
\`\`\`bash
# Set max young generation size (% of heap)
-XX:ZYoungGenerationSizePercent=25  # Default

# Adaptive sizing (default: enabled)
-XX:+ZGenerationalAdaptive
-XX:-ZGenerationalAdaptive  # Disable adaptive sizing
\`\`\`

**Performance Comparison:**

**Non-Generational vs Generational ZGC:**
\`\`\`
Metric                  | Non-Gen ZGC | Gen ZGC
------------------------|-------------|----------
Pause Time (avg)        | 0.5ms       | 0.3ms
Pause Time (p99)        | 1.0ms       | 0.8ms
Throughput              | 95%         | 98%
CPU Usage               | High        | Medium
Memory Overhead         | 10-15%      | 8-12%
GC Frequency            | High        | Lower
\`\`\`

**Real-World Example:**

**Application with High Allocation Rate:**
\`\`\`java
public class HighThroughputService {
    // Creates many temporary objects
    public Response processRequest(Request req) {
        // Allocate temporary objects (die young)
        var parser = new RequestParser();
        var validator = new Validator();
        var transformer = new Transformer();

        // Process (many intermediate objects created)
        var parsed = parser.parse(req);
        var validated = validator.validate(parsed);
        var result = transformer.transform(validated);

        return result;  // Only this survives
    }
}

// Run with Generational ZGC
// java -XX:+UseZGC -Xms16g -Xmx16g \\
//      -Xlog:gc* HighThroughputService

// Results:
// - Temporary objects collected in young gen (frequent minor GCs)
// - Long-lived objects promoted to old gen (infrequent major GCs)
// - Lower CPU usage than non-generational
// - Same sub-millisecond pause times
\`\`\`

**GC Logging:**

**Monitor Generational ZGC:**
\`\`\`bash
# Basic GC logging
java -XX:+UseZGC -Xlog:gc MyApp

# Detailed generational info
java -XX:+UseZGC -Xlog:gc*,gc+age*,gc+phases* MyApp

# Example output:
[0.234s][info][gc] GC(0) Garbage Collection (Minor)
[0.234s][info][gc] GC(0) Young: 512M->64M, Old: 2G->2G
[0.235s][info][gc] GC(0) Pause Mark Start 0.025ms
[0.245s][info][gc] GC(0) Concurrent Mark
[0.256s][info][gc] GC(0) Pause Mark End 0.028ms
[0.267s][info][gc] GC(0) Concurrent Relocate
[0.278s][info][gc] GC(0) Garbage Collection (Minor) 512M->64M 44ms

[5.432s][info][gc] GC(10) Garbage Collection (Major)
[5.432s][info][gc] GC(10) Young: 512M->32M, Old: 4G->3.2G
[5.433s][info][gc] GC(10) Pause Mark Start 0.032ms
...
\`\`\`

**Tuning Guidelines:**

**1. Young Generation Size:**
\`\`\`bash
# Larger young gen = fewer minor GCs but more work per GC
-XX:ZYoungGenerationSizePercent=30  # 30% of heap

# Smaller young gen = more frequent minor GCs but less work per GC
-XX:ZYoungGenerationSizePercent=20  # 20% of heap

# Default (25%) works well for most workloads
\`\`\`

**2. Heap Size:**
\`\`\`bash
# Set heap size (always set both)
-Xms16g -Xmx16g

# Rule of thumb: 2-3x live set size
# Live set 8GB → Heap 16-24GB
\`\`\`

**3. Concurrent GC Threads:**
\`\`\`bash
# Number of concurrent GC threads
-XX:ConcGCThreads=4  # Default: cores/8

# More threads = faster GC but more CPU usage
# Fewer threads = less CPU but slower GC
\`\`\`

**Use Cases:**

**✓ Ideal For:**
- High allocation rate applications
- Latency-sensitive services
- Large heaps (> 50GB)
- Trading systems
- Real-time analytics
- Gaming servers
- Microservices

**Example: Trading Platform:**
\`\`\`java
public class TradingEngine {
    // High object allocation rate
    // Many temporary calculation objects
    // Need consistent low latency

    public void processTrade(Trade trade) {
        // Allocates many temporary objects
        var calculator = new PriceCalculator();
        var validator = new RiskValidator();

        // These objects die quickly
        var price = calculator.calculate(trade);
        var risk = validator.assess(trade, price);

        if (risk.isAcceptable()) {
            executeTrade(trade, price);  // Long-lived
        }
    }
}

// Configuration:
// java -XX:+UseZGC \\
//      -Xms32g -Xmx32g \\
//      -XX:ZYoungGenerationSizePercent=25 \\
//      -XX:ConcGCThreads=4 \\
//      TradingEngine

// Benefits:
// - Sub-millisecond GC pauses
// - Temporary objects collected in young gen
// - Low CPU overhead
// - Consistent latency
\`\`\`

**Monitoring:**

**JMX Metrics:**
\`\`\`java
import java.lang.management.*;
import com.sun.management.GarbageCollectorMXBean;

// Monitor GC stats
for (GarbageCollectorMXBean gcBean : ManagementFactory.getGarbageCollectorMXBeans()) {
    if (gcBean.getName().contains("ZGC")) {
        System.out.println("GC: " + gcBean.getName());
        System.out.println("Collections: " + gcBean.getCollectionCount());
        System.out.println("Time: " + gcBean.getCollectionTime() + "ms");

        // ZGC-specific metrics (if available)
        if (gcBean instanceof com.sun.management.GarbageCollectorMXBean) {
            var zgcBean = (com.sun.management.GarbageCollectorMXBean) gcBean;
            System.out.println("Last GC duration: " +
                zgcBean.getLastGcInfo().getDuration() + "ms");
        }
    }
}
\`\`\`

**Troubleshooting:**

**1. High Minor GC Frequency:**
\`\`\`bash
# Increase young generation size
-XX:ZYoungGenerationSizePercent=30

# Or increase total heap size
-Xmx32g  # Larger heap
\`\`\`

**2. High CPU Usage:**
\`\`\`bash
# Reduce concurrent GC threads
-XX:ConcGCThreads=2

# Or increase heap size to reduce GC frequency
-Xmx24g
\`\`\`

**3. Frequent Major GCs:**
\`\`\`bash
# Indicates heap too small or memory leak
# Increase heap size
-Xmx48g

# Or investigate memory leaks
# Use heap dump analysis
jmap -dump:live,format=b,file=heap.bin <pid>
\`\`\`

**Benefits Summary:**

✓ **Better Throughput:**
- 5-10% improvement over non-generational
- Less total GC work
- More efficient memory usage

✓ **Lower CPU Usage:**
- Fewer GC cycles
- Less memory bandwidth
- Better for cloud deployments

✓ **Same Low Latency:**
- Still sub-millisecond pauses
- No latency regression
- Consistent performance

✓ **Automatic Tuning:**
- Adaptive young generation sizing
- Self-optimizing
- Less manual tuning needed

**Migration from Non-Generational:**

**No Code Changes:**
\`\`\`bash
# Old (Java 11-20)
java -XX:+UseZGC -XX:-ZGenerational MyApp

# New (Java 21+)
java -XX:+UseZGC MyApp  # Generational by default
\`\`\`

**Best Practices:**

✓ Use generational ZGC (default in Java 21)
✓ Set heap size appropriately (2-3x live set)
✓ Monitor GC logs initially
✓ Use default settings first
✓ Tune only if needed
✓ Monitor CPU usage and throughput
✓ Use JMX for runtime metrics

**Summary:**
Java 21's Generational ZGC combines the benefits of generational garbage collection (efficient handling of short-lived objects) with ZGC's ultra-low pause times (< 1ms). This results in better throughput, lower CPU usage, and the same great latency characteristics, making it ideal for latency-sensitive applications with high allocation rates.`
    },
    {
      id: 6,
      category: 'Structured Concurrency',
      difficulty: 'Hard',
      question: 'Explain Structured Concurrency (Preview) in Java 21. How does it improve concurrent programming?',
      answer: `**Structured Concurrency (Preview - Java 21):**

**Overview:**
Structured Concurrency treats multiple concurrent tasks as a single unit of work, with a clear lifecycle and error handling. It simplifies concurrent programming by ensuring that concurrent operations complete before their parent completes.

**The Problem with Traditional Concurrency:**

**Traditional ExecutorService:**
\`\`\`java
// Unstructured concurrency - easy to get wrong
ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor();

try {
    Future<String> future1 = executor.submit(() -> fetchUser());
    Future<String> future2 = executor.submit(() -> fetchOrders());

    // Problems:
    // 1. What if one fails?
    // 2. Need to cancel the other manually
    // 3. Easy to forget cleanup
    // 4. Can leak threads
    // 5. Error handling is complex

    String user = future1.get();
    String orders = future2.get();

    return combine(user, orders);
} finally {
    executor.shutdown();  // Easy to forget!
}
\`\`\`

**Structured Concurrency Solution:**
\`\`\`java
// Structured concurrency - clean and safe
try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
    Subtask<String> user = scope.fork(() -> fetchUser());
    Subtask<String> orders = scope.fork(() -> fetchOrders());

    scope.join();           // Wait for all tasks
    scope.throwIfFailed();  // Propagate exceptions

    // Both completed successfully
    return combine(user.get(), orders.get());
}
// Scope automatically closes, cancelling unfinished tasks
\`\`\`

**Key Concepts:**

**1. StructuredTaskScope:**
Manages a group of concurrent subtasks as a single unit

**2. Subtask:**
A fork operation that returns a Subtask handle

**3. join():**
Wait for subtasks to complete or scope policy to trigger

**4. Automatic Cleanup:**
Scope implements AutoCloseable, ensuring cleanup

**Basic Usage:**

**ShutdownOnFailure Policy:**
\`\`\`java
import java.util.concurrent.*;

// Cancels all tasks if any fail
try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
    Subtask<String> task1 = scope.fork(() -> {
        Thread.sleep(1000);
        return "Result 1";
    });

    Subtask<String> task2 = scope.fork(() -> {
        Thread.sleep(500);
        throw new RuntimeException("Task 2 failed!");
    });

    // Wait for completion or failure
    scope.join();

    // Check for failures
    scope.throwIfFailed();  // Throws if any failed

    // This won't execute due to failure above
    String result1 = task1.get();
    String result2 = task2.get();
}
// task1 automatically cancelled when task2 fails
\`\`\`

**ShutdownOnSuccess Policy:**
\`\`\`java
// Returns as soon as any task succeeds
try (var scope = new StructuredTaskScope.ShutdownOnSuccess<String>()) {
    scope.fork(() -> {
        Thread.sleep(2000);
        return "Slow server";
    });

    scope.fork(() -> {
        Thread.sleep(100);
        return "Fast server";
    });

    // Wait for first success
    scope.join();

    // Get first successful result
    String result = scope.result();  // "Fast server"
    // Other tasks automatically cancelled
}
\`\`\`

**Real-World Examples:**

**1. Parallel API Calls:**
\`\`\`java
public class UserService {
    record UserData(User user, List<Order> orders, List<Review> reviews) {}

    public UserData getUserData(String userId) throws Exception {
        try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
            // Fork multiple API calls
            Subtask<User> userTask = scope.fork(() -> fetchUser(userId));
            Subtask<List<Order>> ordersTask = scope.fork(() -> fetchOrders(userId));
            Subtask<List<Review>> reviewsTask = scope.fork(() -> fetchReviews(userId));

            // Wait for all to complete
            scope.join()
                 .throwIfFailed();

            // All succeeded, combine results
            return new UserData(
                userTask.get(),
                ordersTask.get(),
                reviewsTask.get()
            );
        }
        // If any API call fails, all others are automatically cancelled
    }
}
\`\`\`

**2. Timeout Handling:**
\`\`\`java
public String fetchWithTimeout(String url) throws Exception {
    try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
        Subtask<String> task = scope.fork(() -> fetchData(url));

        // Wait with timeout
        scope.joinUntil(Instant.now().plusSeconds(5));

        scope.throwIfFailed();

        return task.get();
    } catch (TimeoutException e) {
        throw new RuntimeException("Request timed out", e);
    }
    // Task automatically cancelled on timeout
}
\`\`\`

**3. Fan-Out Pattern (First Success):**
\`\`\`java
public String fetchFromMultipleServers(List<String> servers) throws Exception {
    try (var scope = new StructuredTaskScope.ShutdownOnSuccess<String>()) {
        // Fork requests to all servers
        for (String server : servers) {
            scope.fork(() -> fetchFromServer(server));
        }

        // Wait for first success
        scope.join();

        // Return first successful result
        return scope.result();
    }
    // All other requests automatically cancelled
}
\`\`\`

**4. Error Aggregation:**
\`\`\`java
public class BatchProcessor {
    record BatchResult(List<String> successes, List<Exception> failures) {}

    public BatchResult processBatch(List<Item> items) throws Exception {
        try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
            List<Subtask<String>> tasks = items.stream()
                .map(item -> scope.fork(() -> processItem(item)))
                .toList();

            scope.join();

            // Collect results and errors
            List<String> successes = new ArrayList<>();
            List<Exception> failures = new ArrayList<>();

            for (Subtask<String> task : tasks) {
                switch (task.state()) {
                    case SUCCESS -> successes.add(task.get());
                    case FAILED -> failures.add(task.exception());
                    case UNAVAILABLE -> failures.add(
                        new Exception("Task cancelled or not completed")
                    );
                }
            }

            return new BatchResult(successes, failures);
        }
    }
}
\`\`\`

**5. Nested Scopes:**
\`\`\`java
public Report generateReport(String userId) throws Exception {
    try (var outerScope = new StructuredTaskScope.ShutdownOnFailure()) {
        // Outer scope: High-level operations
        Subtask<UserStats> statsTask = outerScope.fork(() -> {
            // Inner scope: Parallel sub-operations
            try (var innerScope = new StructuredTaskScope.ShutdownOnFailure()) {
                Subtask<Integer> orders = innerScope.fork(() -> countOrders(userId));
                Subtask<Integer> reviews = innerScope.fork(() -> countReviews(userId));

                innerScope.join().throwIfFailed();

                return new UserStats(orders.get(), reviews.get());
            }
        });

        Subtask<List<Activity>> activityTask = outerScope.fork(() ->
            fetchRecentActivity(userId)
        );

        outerScope.join().throwIfFailed();

        return new Report(statsTask.get(), activityTask.get());
    }
}
\`\`\`

**Custom Policies:**

**Custom ShutdownPolicy:**
\`\`\`java
public class CollectAllResults<T> extends StructuredTaskScope<T> {
    private final List<T> results = Collections.synchronizedList(new ArrayList<>());
    private final List<Throwable> exceptions = Collections.synchronizedList(new ArrayList<>());

    @Override
    protected void handleComplete(Subtask<? extends T> subtask) {
        switch (subtask.state()) {
            case SUCCESS -> results.add(subtask.get());
            case FAILED -> exceptions.add(subtask.exception());
            case UNAVAILABLE -> {}  // Ignore cancelled
        }
    }

    public List<T> results() {
        return List.copyOf(results);
    }

    public List<Throwable> exceptions() {
        return List.copyOf(exceptions);
    }
}

// Usage
try (var scope = new CollectAllResults<String>()) {
    scope.fork(() -> task1());
    scope.fork(() -> task2());
    scope.fork(() -> task3());

    scope.join();

    List<String> results = scope.results();
    List<Throwable> errors = scope.exceptions();

    System.out.println("Successes: " + results.size());
    System.out.println("Failures: " + errors.size());
}
\`\`\`

**With Virtual Threads:**

**Perfect Combination:**
\`\`\`java
// Structured concurrency + Virtual threads = Scalable & Safe
public List<Result> processLargeDataset(List<Item> items) throws Exception {
    try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
        // Fork thousands of virtual threads
        List<Subtask<Result>> tasks = items.stream()
            .map(item -> scope.fork(() -> processItem(item)))
            .toList();

        scope.join().throwIfFailed();

        return tasks.stream()
            .map(Subtask::get)
            .toList();
    }
    // All virtual threads cleaned up automatically
}

// Can handle millions of items with minimal resource usage
\`\`\`

**Benefits:**

✓ **Automatic Cleanup:**
- Scope closes all subtasks
- No thread leaks
- Exception-safe

✓ **Simplified Error Handling:**
- Unified exception handling
- Automatic cancellation on failure
- Clear error propagation

✓ **Clear Lifecycle:**
- Tasks bound to scope lifecycle
- Parent-child relationship explicit
- Easy to reason about

✓ **Cancellation Propagation:**
- Failing task cancels others
- Timeout cancels all
- No orphaned tasks

✓ **Thread Safety:**
- Scope enforces structure
- No concurrent modification issues
- Safe by design

**Comparison:**

**ExecutorService vs Structured Concurrency:**
\`\`\`
Feature                | ExecutorService | Structured Concurrency
-----------------------|-----------------|------------------------
Automatic cleanup      | Manual          | Automatic
Error handling         | Complex         | Simple
Cancellation           | Manual          | Automatic
Thread safety          | Manual          | Built-in
Code clarity           | Verbose         | Concise
Resource leaks         | Possible        | Prevented
\`\`\`

**Best Practices:**

✓ Use with virtual threads
✓ Keep scopes small and focused
✓ Use ShutdownOnFailure for fail-fast
✓ Use ShutdownOnSuccess for first-wins
✓ Nest scopes for hierarchical operations
✓ Let scope handle cancellation
✓ Use try-with-resources always

**Limitations (Preview):**

- Still in preview (subject to change)
- Requires --enable-preview flag
- API may evolve in future versions

**Usage:**
\`\`\`bash
# Compile
javac --enable-preview --release 21 MyApp.java

# Run
java --enable-preview MyApp
\`\`\`

**Summary:**
Structured Concurrency in Java 21 provides a clean, safe way to handle concurrent operations. It ensures that related concurrent tasks are managed as a single unit, with automatic cleanup, simplified error handling, and clear lifecycle. Combined with virtual threads, it enables writing highly concurrent applications that are both performant and maintainable.`
    },
    {
      id: 7,
      category: 'Scoped Values',
      difficulty: 'Hard',
      question: 'Explain Scoped Values (Preview) in Java 21. How do they improve upon ThreadLocal?',
      answer: `**Scoped Values (Preview - Java 21):**

**Overview:**
Scoped Values provide a better alternative to ThreadLocal for sharing immutable data within a bounded scope. They are designed for use with virtual threads and structured concurrency, offering better performance and clearer semantics.

**Problems with ThreadLocal:**

**1. Mutable State:**
\`\`\`java
// ThreadLocal allows mutation
static ThreadLocal<User> currentUser = new ThreadLocal<>();

currentUser.set(user1);
// ... somewhere else in code
currentUser.set(user2);  // Mutated!

// Hard to reason about who changed it
\`\`\`

**2. Memory Leaks:**
\`\`\`java
// Must remember to clean up
static ThreadLocal<Resource> resource = new ThreadLocal<>();

try {
    resource.set(expensiveResource);
    // Use resource
} finally {
    resource.remove();  // Easy to forget!
}
// If not removed, held until thread dies
\`\`\`

**3. Inheritance Complexity:**
\`\`\`java
// InheritableThreadLocal copies to child threads
static InheritableThreadLocal<Context> context = new InheritableThreadLocal<>();

// Complex inheritance behavior
// Copying overhead
// Unclear semantics with virtual threads
\`\`\`

**4. Virtual Thread Inefficiency:**
\`\`\`java
// With millions of virtual threads
// Each ThreadLocal copy wastes memory
// Slow context propagation
\`\`\`

**Scoped Values Solution:**

**Immutable and Scoped:**
\`\`\`java
public class ScopedValueExample {
    // Define scoped value
    private static final ScopedValue<User> CURRENT_USER = ScopedValue.newInstance();

    public void processRequest(User user) {
        // Bind value to scope
        ScopedValue.where(CURRENT_USER, user)
            .run(() -> {
                // Value available in this scope
                handleRequest();
            });
        // Value automatically unbound after scope
    }

    private void handleRequest() {
        // Access value anywhere in scope
        User user = CURRENT_USER.get();
        System.out.println("Processing for: " + user.name());

        // Call other methods - value propagates
        doSomething();
    }

    private void doSomething() {
        // Still available
        User user = CURRENT_USER.get();
    }
}
\`\`\`

**Key Features:**

**1. Immutability:**
\`\`\`java
static final ScopedValue<String> VALUE = ScopedValue.newInstance();

ScopedValue.where(VALUE, "immutable")
    .run(() -> {
        String val = VALUE.get();  // "immutable"
        // Cannot change value within scope
        // Would need new scope with where()
    });
\`\`\`

**2. Automatic Cleanup:**
\`\`\`java
// No cleanup needed
ScopedValue.where(VALUE, "data")
    .run(() -> {
        // Use value
    });
// Automatically unbound
// No memory leaks
\`\`\`

**3. Propagation to Child Tasks:**
\`\`\`java
static final ScopedValue<RequestContext> CONTEXT = ScopedValue.newInstance();

public void handleRequest(RequestContext ctx) {
    ScopedValue.where(CONTEXT, ctx)
        .run(() -> {
            // Spawn virtual threads
            try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
                scope.fork(() -> {
                    // Context automatically available
                    RequestContext context = CONTEXT.get();
                    return processTask1(context);
                });

                scope.fork(() -> {
                    // Same context available
                    RequestContext context = CONTEXT.get();
                    return processTask2(context);
                });

                scope.join().throwIfFailed();
            }
        });
}
\`\`\`

**Real-World Examples:**

**1. Request Context Propagation:**
\`\`\`java
public class RequestHandler {
    record RequestContext(String requestId, String userId, Instant timestamp) {}

    private static final ScopedValue<RequestContext> REQUEST_CONTEXT =
        ScopedValue.newInstance();

    public Response handleRequest(HttpRequest request) {
        // Create context
        var context = new RequestContext(
            UUID.randomUUID().toString(),
            request.getHeader("User-Id"),
            Instant.now()
        );

        // Bind context and process
        return ScopedValue.where(REQUEST_CONTEXT, context)
            .call(() -> {
                log("Processing request");

                // Context available in all methods
                var data = fetchData();
                var processed = processData(data);
                var response = formatResponse(processed);

                log("Request complete");
                return response;
            });
    }

    private void log(String message) {
        RequestContext ctx = REQUEST_CONTEXT.get();
        System.out.printf("[%s] [%s] %s%n",
            ctx.requestId(),
            ctx.userId(),
            message
        );
    }

    private Data fetchData() {
        // Context automatically available
        RequestContext ctx = REQUEST_CONTEXT.get();
        // Use context for logging, metrics, etc.
        return dataService.fetch(ctx.userId());
    }
}
\`\`\`

**2. Security Context:**
\`\`\`java
public class SecurityService {
    record SecurityContext(String username, Set<String> permissions) {}

    private static final ScopedValue<SecurityContext> SECURITY_CONTEXT =
        ScopedValue.newInstance();

    public void executeAsUser(String username, Set<String> permissions, Runnable task) {
        var context = new SecurityContext(username, permissions);

        ScopedValue.where(SECURITY_CONTEXT, context)
            .run(task);
    }

    public void checkPermission(String permission) {
        SecurityContext ctx = SECURITY_CONTEXT.get();
        if (!ctx.permissions().contains(permission)) {
            throw new SecurityException(
                "User " + ctx.username() + " lacks permission: " + permission
            );
        }
    }

    public void performSecureOperation() {
        // Automatically checks current user's permissions
        checkPermission("ADMIN");
        // ... perform operation
    }
}

// Usage
securityService.executeAsUser("john", Set.of("READ", "WRITE"), () -> {
    // All code here runs in security context
    service.performSecureOperation();
});
\`\`\`

**3. Database Transaction Context:**
\`\`\`java
public class TransactionManager {
    private static final ScopedValue<Transaction> CURRENT_TRANSACTION =
        ScopedValue.newInstance();

    public <T> T inTransaction(Supplier<T> operation) {
        Transaction tx = beginTransaction();

        try {
            return ScopedValue.where(CURRENT_TRANSACTION, tx)
                .call(() -> {
                    T result = operation.get();
                    tx.commit();
                    return result;
                });
        } catch (Exception e) {
            tx.rollback();
            throw e;
        }
    }

    public void executeQuery(String sql) {
        // Automatically uses current transaction
        Transaction tx = CURRENT_TRANSACTION.get();
        tx.execute(sql);
    }
}

// Usage
T result = transactionManager.inTransaction(() -> {
    // All database operations use same transaction
    dao.insert(record1);
    dao.update(record2);
    dao.delete(record3);
    return computeResult();
});
\`\`\`

**4. Locale/Internationalization:**
\`\`\`java
public class I18nService {
    private static final ScopedValue<Locale> CURRENT_LOCALE =
        ScopedValue.newInstance();

    public String getMessage(String key) {
        Locale locale = CURRENT_LOCALE.get();
        return ResourceBundle.getBundle("messages", locale)
            .getString(key);
    }

    public void processInLocale(Locale locale, Runnable task) {
        ScopedValue.where(CURRENT_LOCALE, locale)
            .run(task);
    }
}

// Usage
i18nService.processInLocale(Locale.FRENCH, () -> {
    // All i18n operations use French
    String welcome = i18nService.getMessage("welcome");
    String goodbye = i18nService.getMessage("goodbye");
});
\`\`\`

**Multiple Scoped Values:**

**Binding Multiple Values:**
\`\`\`java
static final ScopedValue<User> USER = ScopedValue.newInstance();
static final ScopedValue<Locale> LOCALE = ScopedValue.newInstance();
static final ScopedValue<ZoneId> TIMEZONE = ScopedValue.newInstance();

public void handleRequest(User user, Locale locale, ZoneId timezone) {
    ScopedValue.where(USER, user)
        .where(LOCALE, locale)
        .where(TIMEZONE, timezone)
        .run(() -> {
            // All three values available
            processRequest();
        });
}
\`\`\`

**Nested Scopes:**

**Override Value in Inner Scope:**
\`\`\`java
static final ScopedValue<String> CONTEXT = ScopedValue.newInstance();

ScopedValue.where(CONTEXT, "outer")
    .run(() -> {
        System.out.println(CONTEXT.get());  // "outer"

        // Create inner scope with different value
        ScopedValue.where(CONTEXT, "inner")
            .run(() -> {
                System.out.println(CONTEXT.get());  // "inner"
            });

        System.out.println(CONTEXT.get());  // "outer" (restored)
    });
\`\`\`

**Performance Benefits:**

**Memory Efficiency:**
\`\`\`
ThreadLocal:
- Per-thread storage
- With 1M virtual threads = 1M copies
- High memory overhead

ScopedValue:
- Shared immutable data
- Efficient propagation
- Minimal memory overhead
\`\`\`

**Access Speed:**
\`\`\`
ThreadLocal.get(): ~2-3 ns
ScopedValue.get(): ~1-2 ns

ScopedValue is faster due to:
- No hash lookup
- Direct access
- JVM optimizations
\`\`\`

**Comparison:**

| Feature | ThreadLocal | ScopedValue |
|---------|-------------|-------------|
| Mutability | Mutable | Immutable |
| Cleanup | Manual | Automatic |
| Memory | Per-thread | Shared |
| Virtual threads | Inefficient | Optimized |
| Semantics | Complex | Simple |
| Performance | Slower | Faster |
| Safety | Error-prone | Safe |

**Best Practices:**

✓ Use for immutable context data
✓ Prefer over ThreadLocal
✓ Use with virtual threads
✓ Combine with structured concurrency
✓ Keep scopes small and focused
✓ Use descriptive names
✓ Document scoped values

**Common Patterns:**

**1. Web Request Context:**
\`\`\`java
ScopedValue.where(REQUEST_ID, uuid)
    .where(USER_ID, userId)
    .where(TRACE_ID, traceId)
    .run(() -> handleRequest());
\`\`\`

**2. Batch Processing:**
\`\`\`java
ScopedValue.where(BATCH_ID, batchId)
    .where(START_TIME, now)
    .run(() -> processBatch(items));
\`\`\`

**3. Test Fixtures:**
\`\`\`java
@Test
void testWithContext() {
    ScopedValue.where(TEST_USER, mockUser)
        .where(TEST_DATA, mockData)
        .run(() -> {
            // Test code with context
            service.performOperation();
        });
}
\`\`\`

**Limitations (Preview):**

- Still in preview (subject to change)
- Requires --enable-preview flag
- Immutable only (by design)
- Cannot remove from scope explicitly

**Usage:**
\`\`\`bash
# Compile
javac --enable-preview --release 21 MyApp.java

# Run
java --enable-preview MyApp
\`\`\`

**Summary:**
Scoped Values in Java 21 provide a modern, efficient alternative to ThreadLocal for sharing immutable context data. They offer better performance with virtual threads, automatic cleanup, and clearer semantics. Combined with structured concurrency, they enable writing concurrent code that is both performant and maintainable.`
    },
    {
      id: 8,
      category: 'String Templates',
      difficulty: 'Medium',
      question: 'What are String Templates (Preview) in Java 21? How do they improve upon string concatenation?',
      answer: `**String Templates (Preview - Java 21):**

**Overview:**
String Templates provide a safer, more expressive way to compose strings with embedded expressions. They address security issues and readability problems with traditional string concatenation and formatting.

**Problems with Current Approaches:**

**1. String Concatenation (Verbose):**
\`\`\`java
String name = "Alice";
int age = 30;
String message = "Hello, " + name + "! You are " + age + " years old.";
// Verbose, hard to read
\`\`\`

**2. String.format() (Not Type-Safe):**
\`\`\`java
String message = String.format("Hello, %s! You are %d years old.", name, age);
// Format string separate from variables
// Type mismatches caught at runtime
// Easy to mess up order
\`\`\`

**3. StringBuilder (Even More Verbose):**
\`\`\`java
StringBuilder sb = new StringBuilder();
sb.append("Hello, ").append(name).append("! You are ").append(age).append(" years old.");
String message = sb.toString();
\`\`\`

**4. Security Issues (SQL Injection):**
\`\`\`java
// UNSAFE - SQL Injection vulnerability
String userId = request.getParameter("id");
String query = "SELECT * FROM users WHERE id = '" + userId + "'";
// If userId = "1' OR '1'='1" - disaster!
\`\`\`

**String Templates Solution:**

**Basic Syntax:**
\`\`\`java
String name = "Alice";
int age = 30;

// String template
String message = STR."Hello, \\{name}! You are \\{age} years old.";
// Result: "Hello, Alice! You are 30 years old."

// Expressions allowed
String message2 = STR."Next year you'll be \\{age + 1}.";
// Result: "Next year you'll be 31."
\`\`\`

**Template Processors:**

**1. STR - String Interpolation:**
\`\`\`java
// STR is the standard processor
String result = STR."2 + 2 = \\{2 + 2}";  // "2 + 2 = 4"

// Method calls
String greeting = STR."Hello, \\{getName()}!";

// Object properties
Person person = new Person("Bob", 25);
String info = STR."Name: \\{person.name()}, Age: \\{person.age()}";
\`\`\`

**2. FMT - Formatted Output:**
\`\`\`java
// FMT processor with format specifiers
double value = 123.456;
String formatted = FMT."Value: %.2f\\{value}";  // "Value: 123.46"

// Alignment
String aligned = FMT."%10s\\{name}";  // Right-aligned, width 10

// Multiple values
String table = FMT."""
    Name: %-20s\\{person.name()}
    Age:  %5d\\{person.age()}
    Salary: $%,10.2f\\{person.salary()}
    """;
\`\`\`

**3. RAW - Access Template Parts:**
\`\`\`java
// Get fragments and values separately
StringTemplate template = RAW."x = \\{x}, y = \\{y}";

List<String> fragments = template.fragments();  // ["x = ", ", y = ", ""]
List<Object> values = template.values();        // [xValue, yValue]
\`\`\`

**Real-World Examples:**

**1. SQL Queries (Safe):**
\`\`\`java
public class SafeSQL {
    // Custom processor for SQL
    static StringTemplate.Processor<PreparedStatement, SQLException> SQL =
        template -> {
            StringBuilder sql = new StringBuilder();
            List<Object> params = new ArrayList<>();

            // Build SQL with placeholders
            List<String> fragments = template.fragments();
            for (int i = 0; i < fragments.size(); i++) {
                sql.append(fragments.get(i));
                if (i < template.values().size()) {
                    sql.append("?");
                    params.add(template.values().get(i));
                }
            }

            // Create prepared statement
            PreparedStatement stmt = connection.prepareStatement(sql.toString());

            // Bind parameters
            for (int i = 0; i < params.size(); i++) {
                stmt.setObject(i + 1, params.get(i));
            }

            return stmt;
        };

    public List<User> findUsers(String name, int minAge) throws SQLException {
        // Safe - uses prepared statement
        PreparedStatement stmt = SQL."""
            SELECT * FROM users
            WHERE name LIKE \\{name}
            AND age >= \\{minAge}
            """;

        // Execute safely
        return executeQuery(stmt);
    }
}
\`\`\`

**2. HTML Generation (Escaped):**
\`\`\`java
public class HTML {
    // Custom processor that escapes HTML
    static StringTemplate.Processor<String, RuntimeException> HTML =
        template -> {
            StringBuilder html = new StringBuilder();
            List<String> fragments = template.fragments();
            List<Object> values = template.values();

            for (int i = 0; i < fragments.size(); i++) {
                html.append(fragments.get(i));
                if (i < values.size()) {
                    // Escape HTML entities
                    html.append(escapeHtml(String.valueOf(values.get(i))));
                }
            }

            return html.toString();
        };

    private static String escapeHtml(String str) {
        return str.replace("&", "&amp;")
                  .replace("<", "&lt;")
                  .replace(">", "&gt;")
                  .replace("\\"", "&quot;");
    }

    public String generateProfile(String username, String bio) {
        // Safe - HTML entities escaped
        return HTML."""
            <div class="profile">
                <h1>\\{username}</h1>
                <p>\\{bio}</p>
            </div>
            """;
        // If bio = "<script>alert('xss')</script>"
        // Output: &lt;script&gt;alert('xss')&lt;/script&gt;
    }
}
\`\`\`

**3. JSON Generation:**
\`\`\`java
public class JSONBuilder {
    static StringTemplate.Processor<String, RuntimeException> JSON =
        template -> {
            StringBuilder json = new StringBuilder();
            List<String> fragments = template.fragments();
            List<Object> values = template.values();

            for (int i = 0; i < fragments.size(); i++) {
                json.append(fragments.get(i));
                if (i < values.size()) {
                    Object value = values.get(i);
                    // Properly escape JSON values
                    if (value instanceof String) {
                        json.append("\\"")
                            .append(escapeJson((String) value))
                            .append("\\"");
                    } else {
                        json.append(value);
                    }
                }
            }

            return json.toString();
        };

    private static String escapeJson(String str) {
        return str.replace("\\\\", "\\\\\\\\")
                  .replace("\\"", "\\\\\\"")
                  .replace("\\n", "\\\\n")
                  .replace("\\r", "\\\\r")
                  .replace("\\t", "\\\\t");
    }

    public String createUserJson(User user) {
        return JSON."""
            {
                "id": \\{user.id()},
                "name": \\{user.name()},
                "email": \\{user.email()},
                "active": \\{user.isActive()}
            }
            """;
    }
}
\`\`\`

**4. Logging:**
\`\`\`java
public class Logger {
    public void info(StringTemplate template) {
        // Only evaluate template if logging level enabled
        if (isInfoEnabled()) {
            String message = STR.process(template);
            log("INFO", message);
        }
        // Lazy evaluation - template not processed if logging disabled
    }

    public void logUserAction(String username, String action) {
        info(STR."User \\{username} performed: \\{action}");
    }
}
\`\`\`

**5. Multi-line Templates:**
\`\`\`java
record Order(int id, String customer, List<Item> items, double total) {}

String generateReceipt(Order order) {
    String itemsList = order.items().stream()
        .map(item -> STR."  - \\{item.name()}: $\\{item.price()}")
        .collect(Collectors.joining("\\n"));

    return STR."""
        ╔════════════════════════════════╗
        ║         ORDER RECEIPT          ║
        ╠════════════════════════════════╣
        ║ Order ID: #\\{order.id()}
        ║ Customer: \\{order.customer()}
        ╠════════════════════════════════╣
        ║ Items:
        \\{itemsList}
        ╠════════════════════════════════╣
        ║ Total: $\\{String.format("%.2f", order.total())}
        ╚════════════════════════════════╝
        """;
}
\`\`\`

**Custom Template Processor:**

**Creating Custom Processor:**
\`\`\`java
public class CustomProcessors {
    // CSV processor
    static StringTemplate.Processor<String, RuntimeException> CSV =
        template -> {
            StringBuilder csv = new StringBuilder();
            List<String> fragments = template.fragments();
            List<Object> values = template.values();

            for (int i = 0; i < fragments.size(); i++) {
                csv.append(fragments.get(i));
                if (i < values.size()) {
                    String value = String.valueOf(values.get(i));
                    // Escape commas and quotes
                    if (value.contains(",") || value.contains("\\"")) {
                        value = "\\"" + value.replace("\\"", "\\"\\"") + "\\"";
                    }
                    csv.append(value);
                }
            }

            return csv.toString();
        };

    // URL encoder
    static StringTemplate.Processor<String, RuntimeException> URL =
        template -> {
            StringBuilder url = new StringBuilder();
            List<String> fragments = template.fragments();
            List<Object> values = template.values();

            for (int i = 0; i < fragments.size(); i++) {
                url.append(fragments.get(i));
                if (i < values.size()) {
                    String encoded = URLEncoder.encode(
                        String.valueOf(values.get(i)),
                        StandardCharsets.UTF_8
                    );
                    url.append(encoded);
                }
            }

            return url.toString();
        };
}

// Usage
String csv = CSV."\\{name},\\{age},\\{city}";
String url = URL."https://api.example.com/search?q=\\{query}&page=\\{page}";
\`\`\`

**Benefits:**

✓ **Readability:**
- Inline expressions
- Clear variable placement
- Natural syntax

✓ **Safety:**
- Type-checked at compile time
- Custom processors can validate/escape
- Prevents injection attacks

✓ **Performance:**
- Optimized by compiler
- Lazy evaluation possible
- No unnecessary string allocations

✓ **Flexibility:**
- Custom processors for any use case
- Built-in processors for common needs
- Composable and reusable

**Comparison:**

| Feature | Concat | format() | Templates |
|---------|--------|----------|-----------|
| Readability | Poor | Medium | Excellent |
| Type safety | No | No | Yes |
| Security | Risky | Risky | Safe (with processor) |
| Performance | Good | Medium | Excellent |
| Extensibility | No | No | Yes |

**Best Practices:**

✓ Use STR for simple string building
✓ Use FMT for formatted output
✓ Create custom processors for security-sensitive contexts
✓ Use templates with text blocks for multi-line
✓ Validate/escape in custom processors
✓ Keep expressions simple

**Limitations (Preview):**

- Still in preview (subject to change)
- Requires --enable-preview flag
- API may evolve

**Usage:**
\`\`\`bash
# Compile
javac --enable-preview --release 21 MyApp.java

# Run
java --enable-preview MyApp
\`\`\`

**Summary:**
String Templates in Java 21 provide a modern, safe, and expressive way to compose strings with embedded expressions. They offer better readability than concatenation, type safety, and extensibility through custom processors. With built-in security features and performance optimizations, they represent a significant improvement over traditional string composition methods.`
    }
  ]

  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id)
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Virtual Threads': '#f59e0b',
      'Pattern Matching': '#3b82f6',
      'Sequenced Collections': '#8b5cf6',
      'Record Patterns': '#10b981',
      'Generational ZGC': '#ef4444',
      'Scoped Values': '#ec4899',
      'String Templates': '#06b6d4',
      'Structured Concurrency': '#a855f7'
    }
    return colors[category] || '#6b7280'
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', minHeight: '100vh' }}>
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
          ← Back to Questions
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#93c5fd',
          margin: 0
        }}>
          Java 21 Interview Questions
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

      <p style={{
        fontSize: '1.1rem',
        color: '#d1d5db',
        textAlign: 'left',
        marginBottom: '2rem',
        lineHeight: '1.6'
      }}>
        Java 21 LTS interview questions covering Virtual Threads, Pattern Matching, Records, Sealed Classes, and more.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {questions.map((q) => (
          <div
            key={q.id}
            style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              borderRadius: '12px',
              border: `3px solid ${expandedQuestion === q.id ? getCategoryColor(q.category) : '#374151'}`,
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              boxShadow: expandedQuestion === q.id
                ? '0 8px 16px rgba(0,0,0,0.3)'
                : '0 2px 8px rgba(0,0,0,0.2)'
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
                <div style={{
                  display: 'inline-block',
                  padding: '0.25rem 0.75rem',
                  backgroundColor: getCategoryColor(q.category),
                  color: 'white',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem'
                }}>
                  {q.category}
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
              <div style={{
                fontSize: '1.5rem',
                color: getCategoryColor(q.category),
                fontWeight: 'bold',
                marginLeft: '1rem',
                transform: expandedQuestion === q.id ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease'
              }}>
                ▼
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
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        borderRadius: '12px',
        border: '2px solid #6366f1'
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#a5b4fc', marginBottom: '0.5rem', textAlign: 'left' }}>
          Java 21 LTS Key Features
        </h3>
        <ul style={{ color: '#d1d5db', lineHeight: '1.8', margin: '0.5rem 0' }}>
          <li>Long-Term Support (LTS) Release - Support until 2031</li>
          <li>Virtual Threads (Project Loom) - Lightweight concurrency</li>
          <li>Pattern Matching for switch - Enhanced switch expressions</li>
          <li>Record Patterns - Deconstruct records in patterns</li>
          <li>Sequenced Collections - Uniform API for ordered collections</li>
          <li>String Templates (Preview) - Simplified string interpolation</li>
        </ul>
      </div>
    </div>
  )
}

export default Java21Questions
