import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

function Java21Questions({ onBack, breadcrumb }) {
  const [expandedQuestion, setExpandedQuestion] = useState(null)

  const renderFormattedAnswer = (text) => {
    const lines = text.split('\n')
    const colors = ['#2563eb', '#7c3aed', '#059669', '#dc2626', '#ea580c', '#0891b2']
    let colorIndex = 0

    return lines.map((line, lineIndex) => {
      const boldMatch = line.match(/^\*\*(.+?):\*\*/)
      if (boldMatch) {
        const color = colors[colorIndex % colors.length]
        colorIndex++
        return (
          <div key={lineIndex} style={{ marginTop: lineIndex > 0 ? '1rem' : 0 }}>
            <span style={{
              fontWeight: '700',
              color: color,
              fontSize: '1.05rem'
            }}>
              {boldMatch[1]}:
            </span>
            {line.substring(boldMatch[0].length)}
          </div>
        )
      }

      const numberedMatch = line.match(/^\*\*(\d+\.\s+.+?):\*\*/)
      if (numberedMatch) {
        const color = colors[colorIndex % colors.length]
        colorIndex++
        return (
          <div key={lineIndex} style={{ marginTop: lineIndex > 0 ? '1rem' : 0 }}>
            <span style={{
              fontWeight: '700',
              color: color,
              fontSize: '1.05rem'
            }}>
              {numberedMatch[1]}:
            </span>
            {line.substring(numberedMatch[0].length)}
          </div>
        )
      }

      return <div key={lineIndex}>{line}</div>
    })
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
      'Record Patterns': '#10b981'
    }
    return colors[category] || '#6b7280'
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#dcfce7', minHeight: '100vh' }}>
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
          color: '#1f2937',
          margin: 0
        }}>
          Java 21 Interview Questions
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      <p style={{
        fontSize: '1.1rem',
        color: '#4b5563',
        textAlign: 'center',
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
              backgroundColor: 'white',
              borderRadius: '12px',
              border: `3px solid ${expandedQuestion === q.id ? getCategoryColor(q.category) : '#e5e7eb'}`,
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
                  : 'white',
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
                  e.currentTarget.style.backgroundColor = '#f9fafb'
                }
              }}
              onMouseLeave={(e) => {
                if (expandedQuestion !== q.id) {
                  e.currentTarget.style.backgroundColor = 'white'
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
                  color: '#1f2937',
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
                backgroundColor: '#fafafa',
                borderTop: `2px solid ${getCategoryColor(q.category)}40`
              }}>
                <div style={{
                  fontSize: '1rem',
                  lineHeight: '1.8',
                  color: '#374151',
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
        backgroundColor: '#d1fae5',
        borderRadius: '12px',
        border: '2px solid #10b981'
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#065f46', marginBottom: '0.5rem', textAlign: 'left' }}>
          💡 Java 21 LTS Key Features
        </h3>
        <ul style={{ color: '#047857', lineHeight: '1.8', margin: '0.5rem 0' }}>
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
