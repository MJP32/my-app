/**
 * Java Topic Page - Tab Template Format
 *
 * Direct topic page with concepts and details modals.
 * No intermediate navigation - content is immediately accessible.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const JAVA_COLORS = {
  primary: '#f59e0b',
  primaryHover: '#fbbf24',
  bg: 'rgba(245, 158, 11, 0.1)',
  border: 'rgba(245, 158, 11, 0.3)',
  arrow: '#f97316',
  hoverBg: 'rgba(245, 158, 11, 0.2)',
  topicBg: 'rgba(245, 158, 11, 0.2)'
}

const SUBTOPIC_COLORS = [
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
]

// =============================================================================
// DIAGRAM COMPONENTS
// =============================================================================

const JavaOverviewDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="javaArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Java Platform Overview</text>
    <rect x="50" y="50" width="140" height="50" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="120" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Java Source</text>
    <rect x="250" y="50" width="140" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="320" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Bytecode</text>
    <rect x="450" y="50" width="140" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="520" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">JVM</text>
    <rect x="650" y="50" width="100" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="700" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Native</text>
    <line x1="190" y1="75" x2="245" y2="75" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#javaArrow)"/>
    <line x1="390" y1="75" x2="445" y2="75" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#javaArrow)"/>
    <line x1="590" y1="75" x2="645" y2="75" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#javaArrow)"/>
    <text x="217" y="65" textAnchor="middle" fill="#94a3b8" fontSize="9">javac</text>
    <text x="417" y="65" textAnchor="middle" fill="#94a3b8" fontSize="9">load</text>
    <text x="617" y="65" textAnchor="middle" fill="#94a3b8" fontSize="9">JIT</text>
    <rect x="200" y="130" width="400" height="50" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="400" y="160" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Write Once, Run Anywhere - Platform Independence</text>
  </svg>
)

const LambdaStreamDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="streamArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Stream Pipeline</text>
    <rect x="30" y="60" width="120" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="90" y="90" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Source</text>
    <rect x="180" y="60" width="120" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="240" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">filter()</text>
    <text x="240" y="100" textAnchor="middle" fill="#bfdbfe" fontSize="8">Intermediate</text>
    <rect x="330" y="60" width="120" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="390" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">map()</text>
    <text x="390" y="100" textAnchor="middle" fill="#ddd6fe" fontSize="8">Intermediate</text>
    <rect x="480" y="60" width="120" height="50" rx="8" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="540" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">sorted()</text>
    <text x="540" y="100" textAnchor="middle" fill="#fbcfe8" fontSize="8">Intermediate</text>
    <rect x="630" y="60" width="120" height="50" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="690" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">collect()</text>
    <text x="690" y="100" textAnchor="middle" fill="#fef3c7" fontSize="8">Terminal</text>
    <line x1="150" y1="85" x2="175" y2="85" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#streamArrow)"/>
    <line x1="300" y1="85" x2="325" y2="85" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#streamArrow)"/>
    <line x1="450" y1="85" x2="475" y2="85" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#streamArrow)"/>
    <line x1="600" y1="85" x2="625" y2="85" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#streamArrow)"/>
    <text x="400" y="150" textAnchor="middle" fill="#64748b" fontSize="10">Lazy evaluation - only executes when terminal operation is called</text>
  </svg>
)

const ConcurrencyDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Java Concurrency Model</text>
    <rect x="50" y="50" width="150" height="60" rx="8" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="125" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Thread Pool</text>
    <text x="125" y="95" textAnchor="middle" fill="#fbcfe8" fontSize="9">ExecutorService</text>
    <rect x="250" y="50" width="150" height="60" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="325" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Synchronization</text>
    <text x="325" y="95" textAnchor="middle" fill="#ddd6fe" fontSize="9">Locks, Semaphores</text>
    <rect x="450" y="50" width="150" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="525" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Concurrent Collections</text>
    <text x="525" y="95" textAnchor="middle" fill="#bfdbfe" fontSize="9">ConcurrentHashMap</text>
    <rect x="650" y="50" width="100" height="60" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="700" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Atomics</text>
    <text x="700" y="95" textAnchor="middle" fill="#bbf7d0" fontSize="9">AtomicInteger</text>
    <rect x="200" y="130" width="400" height="35" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="400" y="153" textAnchor="middle" fill="#a78bfa" fontSize="10">CompletableFuture - Async Programming</text>
  </svg>
)

const VirtualThreadsDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Virtual Threads (Java 21+)</text>
    <rect x="50" y="50" width="200" height="100" rx="8" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <text x="150" y="75" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">Platform Threads</text>
    <text x="150" y="95" textAnchor="middle" fill="#fca5a5" fontSize="9">1:1 with OS threads</text>
    <text x="150" y="115" textAnchor="middle" fill="#fca5a5" fontSize="9">~1MB stack each</text>
    <text x="150" y="135" textAnchor="middle" fill="#fca5a5" fontSize="9">Limited scalability</text>
    <rect x="300" y="50" width="200" height="100" rx="8" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Virtual Threads</text>
    <text x="400" y="95" textAnchor="middle" fill="#86efac" fontSize="9">M:N with carriers</text>
    <text x="400" y="115" textAnchor="middle" fill="#86efac" fontSize="9">~1KB stack each</text>
    <text x="400" y="135" textAnchor="middle" fill="#86efac" fontSize="9">Millions possible</text>
    <rect x="550" y="50" width="200" height="100" rx="8" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="650" y="75" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Benefits</text>
    <text x="650" y="95" textAnchor="middle" fill="#93c5fd" fontSize="9">Simple blocking code</text>
    <text x="650" y="115" textAnchor="middle" fill="#93c5fd" fontSize="9">High throughput</text>
    <text x="650" y="135" textAnchor="middle" fill="#93c5fd" fontSize="9">Easy debugging</text>
  </svg>
)

const CollectionsDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Collections Framework Hierarchy</text>
    <rect x="325" y="40" width="150" height="35" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="400" y="63" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Iterable</text>
    <rect x="325" y="90" width="150" height="35" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="400" y="113" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Collection</text>
    <line x1="400" y1="75" x2="400" y2="90" stroke="#94a3b8" strokeWidth="1.5"/>
    <rect x="50" y="145" width="100" height="35" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="100" y="168" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">List</text>
    <rect x="200" y="145" width="100" height="35" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="250" y="168" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Set</text>
    <rect x="350" y="145" width="100" height="35" rx="6" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="400" y="168" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Queue</text>
    <rect x="500" y="145" width="100" height="35" rx="6" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="550" y="168" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Deque</text>
    <rect x="650" y="145" width="100" height="35" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="700" y="168" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Map</text>
    <line x1="400" y1="125" x2="100" y2="145" stroke="#94a3b8" strokeWidth="1"/>
    <line x1="400" y1="125" x2="250" y2="145" stroke="#94a3b8" strokeWidth="1"/>
    <line x1="400" y1="125" x2="400" y2="145" stroke="#94a3b8" strokeWidth="1"/>
    <line x1="400" y1="125" x2="550" y2="145" stroke="#94a3b8" strokeWidth="1"/>
  </svg>
)

const OOPDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">OOP Principles</text>
    <rect x="50" y="50" width="160" height="60" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="130" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Encapsulation</text>
    <text x="130" y="95" textAnchor="middle" fill="#fef3c7" fontSize="9">Data hiding</text>
    <rect x="230" y="50" width="160" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="310" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Inheritance</text>
    <text x="310" y="95" textAnchor="middle" fill="#bfdbfe" fontSize="9">Code reuse</text>
    <rect x="410" y="50" width="160" height="60" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="490" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Polymorphism</text>
    <text x="490" y="95" textAnchor="middle" fill="#bbf7d0" fontSize="9">Many forms</text>
    <rect x="590" y="50" width="160" height="60" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="670" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Abstraction</text>
    <text x="670" y="95" textAnchor="middle" fill="#ddd6fe" fontSize="9">Hide complexity</text>
    <rect x="150" y="130" width="500" height="35" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="400" y="153" textAnchor="middle" fill="#fbbf24" fontSize="10">SOLID Principles: Single Responsibility, Open-Closed, Liskov, Interface Segregation, Dependency Inversion</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function Java({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'oop',
      name: 'OOP & Classes',
      icon: '📦',
      color: '#f59e0b',
      description: 'Object-oriented programming principles, class design, inheritance, and SOLID principles.',
      diagram: OOPDiagram,
      details: [
        {
          name: 'Encapsulation',
          explanation: 'Encapsulation bundles data and methods that operate on that data within a single unit (class), restricting direct access to some components. Use private fields with public getters/setters, validate data in setters, and expose only necessary operations.',
          codeExample: `public class BankAccount {
    private double balance;  // Hidden from outside
    private String accountId;

    public BankAccount(String accountId, double initialBalance) {
        this.accountId = accountId;
        this.balance = initialBalance;
    }

    public double getBalance() {
        return balance;
    }

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }

    public boolean withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            return true;
        }
        return false;
    }
}`
        },
        {
          name: 'Inheritance & Polymorphism',
          explanation: 'Inheritance enables code reuse through IS-A relationships. Polymorphism allows objects to be treated as their parent type while executing child-specific behavior. Prefer composition over inheritance for flexibility.',
          codeExample: `// Base class
abstract class Shape {
    abstract double area();
    abstract double perimeter();
}

// Inheritance with polymorphism
class Circle extends Shape {
    private double radius;

    Circle(double radius) { this.radius = radius; }

    @Override
    double area() { return Math.PI * radius * radius; }

    @Override
    double perimeter() { return 2 * Math.PI * radius; }
}

class Rectangle extends Shape {
    private double width, height;

    Rectangle(double w, double h) { width = w; height = h; }

    @Override
    double area() { return width * height; }

    @Override
    double perimeter() { return 2 * (width + height); }
}

// Polymorphic usage
List<Shape> shapes = List.of(new Circle(5), new Rectangle(4, 6));
double totalArea = shapes.stream()
    .mapToDouble(Shape::area)
    .sum();`
        },
        {
          name: 'SOLID Principles',
          explanation: 'SOLID: Single Responsibility (one reason to change), Open-Closed (open for extension, closed for modification), Liskov Substitution (subtypes substitutable), Interface Segregation (specific interfaces), Dependency Inversion (depend on abstractions).',
          codeExample: `// Single Responsibility - each class has one job
class UserValidator { boolean validate(User u) { /*...*/ } }
class UserRepository { void save(User u) { /*...*/ } }
class EmailService { void sendWelcome(User u) { /*...*/ } }

// Dependency Inversion - depend on abstractions
interface PaymentProcessor {
    void process(Payment payment);
}

class StripeProcessor implements PaymentProcessor {
    public void process(Payment payment) { /* Stripe logic */ }
}

class PayPalProcessor implements PaymentProcessor {
    public void process(Payment payment) { /* PayPal logic */ }
}

// High-level module depends on abstraction
class OrderService {
    private final PaymentProcessor processor;

    OrderService(PaymentProcessor processor) {
        this.processor = processor;  // Injected dependency
    }

    void checkout(Order order) {
        processor.process(order.getPayment());
    }
}`
        }
      ]
    },
    {
      id: 'streams',
      name: 'Streams & Lambdas',
      icon: '🌊',
      color: '#3b82f6',
      description: 'Functional programming with lambda expressions, Stream API for data processing, and method references.',
      diagram: LambdaStreamDiagram,
      details: [
        {
          name: 'Lambda Expressions',
          explanation: 'Lambdas provide concise syntax for functional interfaces. Syntax: (parameters) -> expression or (parameters) -> { statements }. Use method references (Class::method) for cleaner code when the lambda just calls an existing method.',
          codeExample: `// Lambda syntax variations
Runnable r = () -> System.out.println("Hello");
Consumer<String> c = s -> System.out.println(s);
BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;

// Method references
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
names.forEach(System.out::println);  // Instance method ref
names.stream().map(String::toUpperCase);  // Instance method ref
names.stream().map(String::length);  // Instance method ref

// Functional interfaces
@FunctionalInterface
interface Calculator {
    int calculate(int a, int b);
}

Calculator multiply = (a, b) -> a * b;
Calculator divide = (a, b) -> a / b;`
        },
        {
          name: 'Stream Operations',
          explanation: 'Streams provide declarative data processing. Intermediate operations (filter, map, flatMap, sorted) are lazy. Terminal operations (collect, reduce, forEach, count) trigger execution. Streams can only be consumed once.',
          codeExample: `List<Person> people = getPeople();

// Chained stream operations
List<String> adultNames = people.stream()
    .filter(p -> p.getAge() >= 18)           // Intermediate
    .sorted(Comparator.comparing(Person::getName))  // Intermediate
    .map(Person::getName)                     // Intermediate
    .distinct()                               // Intermediate
    .limit(10)                                // Intermediate
    .collect(Collectors.toList());            // Terminal

// Reduce operation
int totalAge = people.stream()
    .mapToInt(Person::getAge)
    .sum();

// Grouping with Collectors
Map<String, List<Person>> byCity = people.stream()
    .collect(Collectors.groupingBy(Person::getCity));

// FlatMap for nested structures
List<String> allSkills = people.stream()
    .flatMap(p -> p.getSkills().stream())
    .distinct()
    .collect(Collectors.toList());`
        },
        {
          name: 'Parallel Streams',
          explanation: 'Parallel streams split work across multiple threads using the ForkJoinPool. Use for CPU-intensive operations on large datasets. Avoid for I/O-bound operations or small collections. Ensure thread-safe operations.',
          codeExample: `// Parallel stream processing
List<Integer> numbers = IntStream.rangeClosed(1, 1_000_000)
    .boxed()
    .collect(Collectors.toList());

// Parallel computation
long sum = numbers.parallelStream()
    .filter(n -> n % 2 == 0)
    .mapToLong(Integer::longValue)
    .sum();

// When to use parallel streams:
// ✓ Large datasets (>10,000 elements)
// ✓ CPU-intensive operations
// ✓ Independent element processing
// ✗ Small collections (overhead > benefit)
// ✗ I/O operations (use async instead)
// ✗ Order-dependent operations

// Custom thread pool for parallel streams
ForkJoinPool customPool = new ForkJoinPool(4);
List<Result> results = customPool.submit(() ->
    data.parallelStream()
        .map(this::processItem)
        .collect(Collectors.toList())
).get();`
        }
      ]
    },
    {
      id: 'concurrency',
      name: 'Concurrency',
      icon: '🔄',
      color: '#ec4899',
      description: 'Multithreading, ExecutorService, synchronization, locks, and concurrent collections.',
      diagram: ConcurrencyDiagram,
      details: [
        {
          name: 'Thread Pools',
          explanation: 'ExecutorService manages thread pools for efficient task execution. Fixed pools for bounded concurrency, cached pools for short-lived tasks, scheduled pools for delayed/periodic execution. Always shutdown executors properly.',
          codeExample: `// Fixed thread pool
ExecutorService fixed = Executors.newFixedThreadPool(4);

// Submit tasks
Future<String> future = fixed.submit(() -> {
    return computeResult();
});
String result = future.get();  // Blocks until complete

// Execute multiple tasks
List<Callable<Integer>> tasks = List.of(
    () -> compute(1),
    () -> compute(2),
    () -> compute(3)
);
List<Future<Integer>> futures = fixed.invokeAll(tasks);

// Scheduled execution
ScheduledExecutorService scheduled =
    Executors.newScheduledThreadPool(2);
scheduled.scheduleAtFixedRate(
    () -> System.out.println("Tick"),
    0, 1, TimeUnit.SECONDS
);

// Proper shutdown
fixed.shutdown();
try {
    if (!fixed.awaitTermination(60, TimeUnit.SECONDS)) {
        fixed.shutdownNow();
    }
} catch (InterruptedException e) {
    fixed.shutdownNow();
}`
        },
        {
          name: 'Synchronization',
          explanation: 'Synchronization ensures thread-safe access to shared resources. Use synchronized blocks/methods, ReentrantLock for advanced control, ReadWriteLock for read-heavy workloads. Volatile ensures visibility across threads.',
          codeExample: `// Synchronized method
class Counter {
    private int count = 0;

    public synchronized void increment() {
        count++;
    }

    public synchronized int getCount() {
        return count;
    }
}

// ReentrantLock for more control
class BetterCounter {
    private final ReentrantLock lock = new ReentrantLock();
    private int count = 0;

    public void increment() {
        lock.lock();
        try {
            count++;
        } finally {
            lock.unlock();
        }
    }
}

// ReadWriteLock for read-heavy scenarios
class Cache<K, V> {
    private final Map<K, V> map = new HashMap<>();
    private final ReadWriteLock rwLock = new ReentrantReadWriteLock();

    public V get(K key) {
        rwLock.readLock().lock();
        try {
            return map.get(key);
        } finally {
            rwLock.readLock().unlock();
        }
    }

    public void put(K key, V value) {
        rwLock.writeLock().lock();
        try {
            map.put(key, value);
        } finally {
            rwLock.writeLock().unlock();
        }
    }
}`
        },
        {
          name: 'CompletableFuture',
          explanation: 'CompletableFuture enables async programming with composable operations. Chain operations with thenApply, thenCompose, thenCombine. Handle errors with exceptionally or handle. Combine multiple futures with allOf/anyOf.',
          codeExample: `// Async computation
CompletableFuture<String> future = CompletableFuture
    .supplyAsync(() -> fetchData())
    .thenApply(data -> process(data))
    .thenApply(result -> format(result));

// Combine multiple futures
CompletableFuture<User> userFuture = fetchUserAsync(id);
CompletableFuture<List<Order>> ordersFuture = fetchOrdersAsync(id);

CompletableFuture<UserProfile> profile = userFuture
    .thenCombine(ordersFuture, (user, orders) ->
        new UserProfile(user, orders));

// Error handling
CompletableFuture<String> withFallback = fetchAsync()
    .exceptionally(ex -> "default value")
    .thenApply(String::toUpperCase);

// Wait for all
CompletableFuture<Void> allDone = CompletableFuture.allOf(
    future1, future2, future3
);
allDone.thenRun(() -> System.out.println("All complete"));

// Timeout (Java 9+)
future.orTimeout(5, TimeUnit.SECONDS)
      .exceptionally(ex -> "Timeout fallback");`
        }
      ]
    },
    {
      id: 'collections',
      name: 'Collections',
      icon: '📚',
      color: '#8b5cf6',
      description: 'Collection framework: List, Set, Map, Queue implementations, and concurrent collections.',
      diagram: CollectionsDiagram,
      details: [
        {
          name: 'List & Set',
          explanation: 'ArrayList: O(1) random access, O(n) insert/delete. LinkedList: O(n) access, O(1) insert/delete at ends. HashSet: O(1) operations, no order. TreeSet: O(log n), sorted. LinkedHashSet: O(1), insertion order.',
          codeExample: `// ArrayList - most common, fast random access
List<String> arrayList = new ArrayList<>();
arrayList.add("A");
arrayList.get(0);  // O(1)

// LinkedList - fast insert/remove at ends
LinkedList<String> linkedList = new LinkedList<>();
linkedList.addFirst("A");  // O(1)
linkedList.addLast("B");   // O(1)

// HashSet - unique elements, no order
Set<String> hashSet = new HashSet<>();
hashSet.add("A");
hashSet.contains("A");  // O(1)

// TreeSet - sorted unique elements
Set<Integer> treeSet = new TreeSet<>();
treeSet.add(3);
treeSet.add(1);
treeSet.add(2);
// Iteration: 1, 2, 3 (sorted)

// Immutable collections (Java 9+)
List<String> immutable = List.of("A", "B", "C");
Set<Integer> immutableSet = Set.of(1, 2, 3);`
        },
        {
          name: 'Map Implementations',
          explanation: 'HashMap: O(1) average operations, allows null key/values. TreeMap: O(log n), sorted by keys. LinkedHashMap: O(1), maintains insertion/access order. ConcurrentHashMap: thread-safe, high concurrency.',
          codeExample: `// HashMap - most common
Map<String, Integer> hashMap = new HashMap<>();
hashMap.put("one", 1);
hashMap.getOrDefault("two", 0);  // Returns 0

// Compute operations
hashMap.computeIfAbsent("three", k -> 3);
hashMap.merge("one", 1, Integer::sum);  // Increment

// TreeMap - sorted by key
Map<String, Integer> treeMap = new TreeMap<>();
treeMap.put("b", 2);
treeMap.put("a", 1);
// Keys in order: a, b

// LinkedHashMap - access-order for LRU cache
Map<String, String> lruCache = new LinkedHashMap<>(16, 0.75f, true) {
    @Override
    protected boolean removeEldestEntry(Map.Entry<String, String> eldest) {
        return size() > 100;  // Max 100 entries
    }
};

// Immutable map
Map<String, Integer> immutable = Map.of("a", 1, "b", 2);`
        },
        {
          name: 'Concurrent Collections',
          explanation: 'ConcurrentHashMap: thread-safe with segment locking. CopyOnWriteArrayList: safe iteration, expensive writes. BlockingQueue: producer-consumer pattern. ConcurrentLinkedQueue: non-blocking thread-safe queue.',
          codeExample: `// ConcurrentHashMap - thread-safe map
ConcurrentHashMap<String, Integer> concurrentMap = new ConcurrentHashMap<>();
concurrentMap.put("key", 1);
concurrentMap.compute("key", (k, v) -> v + 1);  // Atomic update

// Atomic operations
concurrentMap.putIfAbsent("new", 0);
concurrentMap.replace("key", 2, 3);  // CAS operation

// BlockingQueue - producer/consumer
BlockingQueue<Task> queue = new LinkedBlockingQueue<>(100);

// Producer
queue.put(task);  // Blocks if full

// Consumer
Task task = queue.take();  // Blocks if empty

// CopyOnWriteArrayList - safe iteration
List<String> cowList = new CopyOnWriteArrayList<>();
// Safe to iterate while others modify
for (String s : cowList) {
    // No ConcurrentModificationException
}`
        }
      ]
    },
    {
      id: 'modern-java',
      name: 'Modern Java (8-21)',
      icon: '🚀',
      color: '#22c55e',
      description: 'Modern Java features: Optional, records, sealed classes, pattern matching, and virtual threads.',
      diagram: VirtualThreadsDiagram,
      details: [
        {
          name: 'Optional & Records',
          explanation: 'Optional wraps potentially null values, enabling functional null handling. Records (Java 14+) provide immutable data carriers with auto-generated constructors, accessors, equals, hashCode, and toString.',
          codeExample: `// Optional - avoid null checks
Optional<User> findUser(String id) {
    return Optional.ofNullable(userMap.get(id));
}

String name = findUser("123")
    .map(User::getName)
    .orElse("Unknown");

// Chained Optional operations
Optional<String> city = findUser("123")
    .flatMap(User::getAddress)
    .map(Address::getCity);

// Records - immutable data carriers
record Point(int x, int y) {
    // Compact constructor for validation
    public Point {
        if (x < 0 || y < 0) {
            throw new IllegalArgumentException("Negative coordinates");
        }
    }

    // Additional methods
    public double distanceFromOrigin() {
        return Math.sqrt(x * x + y * y);
    }
}

Point p = new Point(3, 4);
int x = p.x();  // Accessor
System.out.println(p);  // Point[x=3, y=4]`
        },
        {
          name: 'Pattern Matching',
          explanation: 'Pattern matching (Java 16+) simplifies type checks and casts. Switch expressions (Java 14+) return values and support pattern matching. Sealed classes (Java 17) restrict which classes can extend them.',
          codeExample: `// Pattern matching for instanceof
Object obj = getObject();
if (obj instanceof String s && s.length() > 5) {
    System.out.println(s.toUpperCase());
}

// Pattern matching in switch (Java 21)
String describe(Object obj) {
    return switch (obj) {
        case Integer i -> "Integer: " + i;
        case String s when s.length() > 5 -> "Long string: " + s;
        case String s -> "Short string: " + s;
        case null -> "null value";
        default -> "Unknown: " + obj;
    };
}

// Sealed classes
sealed interface Shape permits Circle, Rectangle, Triangle {}

record Circle(double radius) implements Shape {}
record Rectangle(double w, double h) implements Shape {}
final class Triangle implements Shape { /*...*/ }

// Exhaustive switch on sealed type
double area(Shape shape) {
    return switch (shape) {
        case Circle c -> Math.PI * c.radius() * c.radius();
        case Rectangle r -> r.w() * r.h();
        case Triangle t -> t.calculateArea();
    };
}`
        },
        {
          name: 'Virtual Threads',
          explanation: 'Virtual threads (Java 21) are lightweight threads managed by the JVM. They enable simple blocking code that scales to millions of concurrent operations. Use for I/O-bound workloads, not CPU-bound tasks.',
          codeExample: `// Create virtual thread
Thread vThread = Thread.ofVirtual().start(() -> {
    System.out.println("Running in virtual thread");
});

// Virtual thread executor
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    // Submit millions of tasks
    IntStream.range(0, 100_000).forEach(i -> {
        executor.submit(() -> {
            // Blocking I/O is efficient with virtual threads
            String result = fetchFromDatabase(i);
            return processResult(result);
        });
    });
}

// Structured concurrency (Preview)
try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
    Future<User> userFuture = scope.fork(() -> fetchUser(id));
    Future<List<Order>> ordersFuture = scope.fork(() -> fetchOrders(id));

    scope.join();           // Wait for both
    scope.throwIfFailed();  // Propagate errors

    return new UserProfile(userFuture.resultNow(),
                          ordersFuture.resultNow());
}`
        }
      ]
    },
    {
      id: 'jvm',
      name: 'JVM & Performance',
      icon: '⚙️',
      color: '#06b6d4',
      description: 'JVM internals, memory management, garbage collection, and performance optimization.',
      diagram: JavaOverviewDiagram,
      details: [
        {
          name: 'Memory Model',
          explanation: 'JVM memory: Heap (objects, GC-managed), Stack (method frames, thread-local), Metaspace (class metadata). Young generation (Eden + Survivor) for short-lived objects, Old generation for long-lived. GC algorithms: G1 (default), ZGC (low latency), Shenandoah.',
          codeExample: `// JVM memory configuration
// -Xms512m        Initial heap size
// -Xmx4g          Maximum heap size
// -XX:MetaspaceSize=256m
// -XX:+UseG1GC    Use G1 garbage collector
// -XX:+UseZGC     Use ZGC (low latency)

// Memory-efficient coding
// 1. Avoid creating unnecessary objects
String result = new StringBuilder()
    .append(a)
    .append(b)
    .toString();  // Better than a + b in loops

// 2. Use primitives over wrappers
int count = 0;  // Not Integer count = 0;

// 3. Proper collection sizing
List<String> list = new ArrayList<>(expectedSize);
Map<String, Integer> map = new HashMap<>(expectedSize * 4 / 3);

// 4. Use try-with-resources
try (InputStream is = new FileInputStream(file)) {
    // Auto-closed, no resource leaks
}`
        },
        {
          name: 'Garbage Collection',
          explanation: 'G1 GC: default, balances throughput and latency. ZGC: sub-millisecond pauses, good for large heaps. Shenandoah: concurrent compaction, low pause times. Monitor with -Xlog:gc* or tools like VisualVM, JFR.',
          codeExample: `// G1 GC tuning (default in Java 9+)
// -XX:+UseG1GC
// -XX:MaxGCPauseMillis=200    Target pause time
// -XX:G1HeapRegionSize=16m    Region size
// -XX:InitiatingHeapOccupancyPercent=45

// ZGC for low latency (Java 15+)
// -XX:+UseZGC
// -XX:+ZGenerational          (Java 21+)

// GC logging
// -Xlog:gc*:file=gc.log:time,level,tags

// Monitoring tools
// jstat -gc <pid> 1000       GC statistics
// jmap -heap <pid>           Heap summary
// jcmd <pid> GC.heap_info    Heap info

// Avoid GC pressure
// - Reuse objects (object pools)
// - Avoid finalizers (use Cleaner)
// - Use weak/soft references for caches
WeakReference<ExpensiveObject> weakRef =
    new WeakReference<>(expensive);
SoftReference<byte[]> cache =
    new SoftReference<>(new byte[1024 * 1024]);`
        },
        {
          name: 'Performance Tips',
          explanation: 'Profile before optimizing (JFR, async-profiler). Use StringBuilder for string concatenation in loops. Prefer primitives and arrays over wrappers and collections for hot paths. Cache expensive computations. Use appropriate data structures.',
          codeExample: `// 1. String concatenation
// Bad in loop
String result = "";
for (String s : items) {
    result += s;  // Creates new String each iteration
}

// Good
StringBuilder sb = new StringBuilder();
for (String s : items) {
    sb.append(s);
}
String result = sb.toString();

// 2. Use primitive streams
int sum = list.stream()
    .mapToInt(Integer::intValue)  // Avoid boxing
    .sum();

// 3. Lazy initialization
private volatile ExpensiveObject instance;

public ExpensiveObject getInstance() {
    ExpensiveObject result = instance;
    if (result == null) {
        synchronized (this) {
            result = instance;
            if (result == null) {
                instance = result = new ExpensiveObject();
            }
        }
    }
    return result;
}

// 4. Use appropriate collections
// EnumSet/EnumMap for enum keys
EnumSet<Day> weekend = EnumSet.of(Day.SATURDAY, Day.SUNDAY);
EnumMap<Day, String> schedule = new EnumMap<>(Day.class);`
        }
      ]
    }
  ]

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedConceptIndex === null) return

      const concept = concepts[selectedConceptIndex]
      if (e.key === 'Escape') {
        setSelectedConceptIndex(null)
        setSelectedDetailIndex(0)
      } else if (e.key === 'ArrowRight') {
        setSelectedDetailIndex(prev =>
          prev < concept.details.length - 1 ? prev + 1 : 0
        )
      } else if (e.key === 'ArrowLeft') {
        setSelectedDetailIndex(prev =>
          prev > 0 ? prev - 1 : concept.details.length - 1
        )
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedConceptIndex, concepts])

  const selectedConcept = selectedConceptIndex !== null ? concepts[selectedConceptIndex] : null

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1a0f 50%, #0f172a 100%)',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <Breadcrumb
            section={{ name: 'Home', onClick: onBack }}
            category={{ name: 'Java', icon: '☕' }}
            colors={{
              primary: JAVA_COLORS.primary,
              secondary: '#fbbf24',
              background: JAVA_COLORS.bg,
              border: JAVA_COLORS.border
            }}
          />
        </div>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #fbbf24, #f59e0b, #d97706)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem'
          }}>
            ☕ Java Programming
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Master Java from OOP fundamentals to modern features like virtual threads and pattern matching.
          </p>
        </div>

        {/* Concept Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: '1.5rem'
        }}>
          {concepts.map((concept, index) => (
            <button
              key={concept.id}
              onClick={() => {
                setSelectedConceptIndex(index)
                setSelectedDetailIndex(0)
              }}
              style={{
                background: 'linear-gradient(145deg, #1e293b, #0f172a)',
                border: `2px solid ${concept.color}40`,
                borderRadius: '16px',
                padding: '1.5rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = `0 20px 40px -12px ${concept.color}30`
                e.currentTarget.style.borderColor = concept.color
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = `${concept.color}40`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '2.5rem' }}>{concept.icon}</span>
                <div>
                  <h3 style={{ color: '#f1f5f9', fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>
                    {concept.name}
                  </h3>
                  <span style={{ color: '#64748b', fontSize: '0.85rem' }}>
                    {concept.details.length} topics
                  </span>
                </div>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
                {concept.description}
              </p>
              <div style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                color: concept.color,
                fontSize: '0.85rem',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                Explore <span>→</span>
              </div>
            </button>
          ))}
        </div>

        {/* Modal */}
        {selectedConcept && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '2rem'
            }}
            onClick={() => {
              setSelectedConceptIndex(null)
              setSelectedDetailIndex(0)
            }}
          >
            <div
              style={{
                background: 'linear-gradient(145deg, #1e293b, #0f172a)',
                borderRadius: '20px',
                width: '100%',
                maxWidth: '1000px',
                maxHeight: '90vh',
                overflow: 'auto',
                border: `2px solid ${selectedConcept.color}`,
                boxShadow: `0 25px 50px -12px ${selectedConcept.color}40`
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div style={{
                padding: '1.5rem',
                borderBottom: '1px solid #334155',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'sticky',
                top: 0,
                background: 'linear-gradient(145deg, #1e293b, #0f172a)',
                zIndex: 10
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '2rem' }}>{selectedConcept.icon}</span>
                  <h2 style={{ color: '#f1f5f9', fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>
                    {selectedConcept.name}
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setSelectedConceptIndex(null)
                    setSelectedDetailIndex(0)
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#94a3b8',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    padding: '0.5rem'
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Diagram */}
              {selectedConcept.diagram && (
                <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #334155' }}>
                  <selectedConcept.diagram />
                </div>
              )}

              {/* Detail Tabs */}
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                padding: '1rem 1.5rem',
                borderBottom: '1px solid #334155',
                overflowX: 'auto'
              }}>
                {selectedConcept.details.map((detail, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedDetailIndex(idx)}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      border: 'none',
                      background: selectedDetailIndex === idx ? selectedConcept.color : '#334155',
                      color: selectedDetailIndex === idx ? 'white' : '#94a3b8',
                      cursor: 'pointer',
                      fontWeight: '500',
                      fontSize: '0.9rem',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.2s'
                    }}
                  >
                    {detail.name}
                  </button>
                ))}
              </div>

              {/* Detail Content */}
              <div style={{ padding: '1.5rem' }}>
                {(() => {
                  const detail = selectedConcept.details[selectedDetailIndex]
                  const colorScheme = SUBTOPIC_COLORS[selectedDetailIndex % SUBTOPIC_COLORS.length]

                  return (
                    <div>
                      <h3 style={{ color: '#f1f5f9', fontSize: '1.25rem', marginBottom: '1rem' }}>
                        {detail.name}
                      </h3>
                      <p style={{
                        color: '#e2e8f0',
                        lineHeight: '1.8',
                        marginBottom: '1.5rem',
                        background: colorScheme.bg,
                        border: `1px solid ${colorScheme.border}`,
                        borderRadius: '8px',
                        padding: '1rem'
                      }}>
                        {detail.explanation}
                      </p>
                      {detail.codeExample && (
                        <SyntaxHighlighter
                          language="java"
                          style={vscDarkPlus}
                          customStyle={{
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            margin: 0
                          }}
                        >
                          {detail.codeExample}
                        </SyntaxHighlighter>
                      )}
                    </div>
                  )
                })()}
              </div>

              {/* Navigation hint */}
              <div style={{
                padding: '1rem 1.5rem',
                borderTop: '1px solid #334155',
                textAlign: 'center',
                color: '#64748b',
                fontSize: '0.85rem'
              }}>
                Use ← → arrow keys to navigate topics • Press Escape to close
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Java
