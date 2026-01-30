import { useState, useEffect } from 'react'
import { useFocusTrap } from '../hooks/useKeyboardNavigation'

function StudyGuideModal({ isOpen, onClose }) {
  const [selectedTopics, setSelectedTopics] = useState([])
  const [format, setFormat] = useState('markdown')
  const [includeInterviewEnhancements, setIncludeInterviewEnhancements] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const modalRef = useFocusTrap(isOpen)

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault()
        e.stopPropagation() // Prevent event from reaching global handlers
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const allTopics = [
    { id: 'core-java', label: 'Core Java', category: 'Java' },
    { id: 'java-8', label: 'Java 8', category: 'Java' },
    { id: 'java-11', label: 'Java 11', category: 'Java' },
    { id: 'java-21', label: 'Java 21', category: 'Java' },
    { id: 'oop', label: 'OOP Principles', category: 'Core Programming' },
    { id: 'collections', label: 'Collections Framework', category: 'Practice' },
    { id: 'concurrency', label: 'Concurrency & Threads', category: 'Practice' },
    { id: 'multithreading', label: 'Multithreading', category: 'Practice' },
    { id: 'jvm', label: 'JVM Internals', category: 'Practice' },
    { id: 'memory', label: 'Memory Management', category: 'Practice' },
    { id: 'exception-handling', label: 'Exception Handling', category: 'Practice' },
    { id: 'streams', label: 'Streams & Lambdas', category: 'Practice' },
    { id: 'functional-interfaces', label: 'Functional Interfaces', category: 'Practice' },
    { id: 'design-patterns', label: 'Design Patterns', category: 'Design' },
    { id: 'spring', label: 'Spring Framework', category: 'Frameworks' },
    { id: 'spring-boot', label: 'Spring Boot', category: 'Frameworks' },
    { id: 'data-structures', label: 'Data Structures', category: 'Practice' },
    { id: 'algorithms', label: 'Algorithms', category: 'Practice' },
    { id: 'dynamic-programming', label: 'Dynamic Programming', category: 'Practice' },
    { id: 'trees', label: 'Trees', category: 'Practice' },
    { id: 'graphs', label: 'Graphs', category: 'Practice' },
    { id: 'system-design', label: 'System Design', category: 'Architecture' }
  ]

  const handleSelectAll = () => {
    if (selectedTopics.length === allTopics.length) {
      setSelectedTopics([])
    } else {
      setSelectedTopics(allTopics.map(t => t.id))
    }
  }

  const handleTopicToggle = (topicId) => {
    setSelectedTopics(prev =>
      prev.includes(topicId)
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    )
  }

  const generateStudyGuide = async () => {
    if (selectedTopics.length === 0) {
      alert('Please select at least one topic')
      return
    }

    setIsGenerating(true)

    // Simulate generation delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    const content = generateContent(false)
    downloadFile(content, 'study-guide')

    setIsGenerating(false)
  }

  const generateCheatsheet = async () => {
    if (selectedTopics.length === 0) {
      alert('Please select at least one topic')
      return
    }

    setIsGenerating(true)

    // Simulate generation delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    const content = generateContent(true)
    downloadFile(content, 'cheatsheet')

    setIsGenerating(false)
  }

  const generateContent = (isCheatsheet = false) => {
    const selectedTopicData = allTopics.filter(t => selectedTopics.includes(t.id))

    let content = ''

    if (format === 'markdown') {
      content = isCheatsheet ? generateCheatsheetMarkdown(selectedTopicData) : generateMarkdown(selectedTopicData)
    } else if (format === 'txt') {
      content = isCheatsheet ? generateCheatsheetPlainText(selectedTopicData) : generatePlainText(selectedTopicData)
    } else if (format === 'pdf') {
      // For PDF, we'll generate HTML that can be printed to PDF
      content = isCheatsheet ? generateCheatsheetHTML(selectedTopicData) : generateHTML(selectedTopicData)
    }

    return content
  }

  const generateMarkdown = (topics) => {
    let md = `# Java Technical Interview Study Guide\n\n`
    md += `*Generated on ${new Date().toLocaleDateString()}*\n\n`
    md += `## Selected Topics\n\n`

    topics.forEach(topic => {
      md += `- ${topic.label}\n`
    })

    md += `\n---\n\n`

    topics.forEach(topic => {
      md += `## ${topic.label}\n\n`
      md += getTopicContent(topic.id)
      md += `\n---\n\n`
    })

    return md
  }

  const generatePlainText = (topics) => {
    let txt = `JAVA TECHNICAL INTERVIEW STUDY GUIDE\n`
    txt += `Generated on ${new Date().toLocaleDateString()}\n`
    txt += `${'='.repeat(60)}\n\n`
    txt += `SELECTED TOPICS:\n\n`

    topics.forEach(topic => {
      txt += `  - ${topic.label}\n`
    })

    txt += `\n${'='.repeat(60)}\n\n`

    topics.forEach(topic => {
      txt += `${topic.label.toUpperCase()}\n`
      txt += `${'-'.repeat(60)}\n\n`
      txt += getTopicContentPlain(topic.id)
      txt += `\n${'='.repeat(60)}\n\n`
    })

    return txt
  }

  const generateHTML = (topics) => {
    let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Java Study Guide</title>
  <style>
    * { box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
      line-height: 1.7; 
      max-width: 900px; 
      margin: 0 auto; 
      padding: 40px 30px;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      color: #1f2937;
    }
    .container {
      background: white;
      padding: 40px;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    }
    h1 { 
      color: #1f2937;
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: 800;
    }
    .subtitle {
      color: #6b7280;
      font-size: 1.1rem;
      margin-bottom: 2rem;
      padding-bottom: 1.5rem;
      border-bottom: 3px solid #e5e7eb;
    }
    h2 { 
      color: #1f2937;
      font-size: 1.875rem;
      margin-top: 3rem;
      margin-bottom: 1.5rem;
      padding: 1rem 1.5rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }
    h3 { 
      color: #374151;
      font-size: 1.25rem;
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
      padding-left: 1rem;
      border-left: 4px solid #667eea;
      font-weight: 700;
    }
    p { 
      margin: 1rem 0;
      color: #4b5563;
    }
    ul, ol {
      margin: 1rem 0;
      padding-left: 2rem;
    }
    li {
      margin: 0.5rem 0;
      color: #374151;
      line-height: 1.8;
    }
    code { 
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      color: #92400e;
      padding: 3px 8px;
      border-radius: 5px;
      font-family: 'Courier New', Consolas, Monaco, monospace;
      font-size: 0.9em;
      font-weight: 600;
      border: 1px solid #fbbf24;
    }
    pre { 
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
      color: #e2e8f0;
      padding: 20px;
      border-radius: 12px;
      overflow-x: auto;
      margin: 1.5rem 0;
      border: 2px solid #334155;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
      font-size: 0.95rem;
      line-height: 1.6;
    }
    pre code {
      background: none;
      color: inherit;
      padding: 0;
      border: none;
      font-weight: normal;
    }
    /* Syntax highlighting for Java keywords */
    .keyword { color: #c792ea; font-weight: 600; }
    .string { color: #c3e88d; }
    .comment { color: #546e7a; font-style: italic; }
    .function { color: #82aaff; }
    .number { color: #f78c6c; }
    
    .interview-tip { 
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      border-left: 5px solid #f59e0b;
      padding: 1.25rem 1.5rem;
      margin: 1.5rem 0;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2);
    }
    .interview-tip strong {
      color: #92400e;
      font-size: 1.1rem;
    }
    .best-practice { 
      background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
      border-left: 5px solid #10b981;
      padding: 1.25rem 1.5rem;
      margin: 1.5rem 0;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
    }
    .best-practice strong {
      color: #065f46;
      font-size: 1.1rem;
    }
    .pitfall { 
      background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
      border-left: 5px solid #ef4444;
      padding: 1.25rem 1.5rem;
      margin: 1.5rem 0;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
    }
    .pitfall strong {
      color: #991b1b;
      font-size: 1.1rem;
    }
    .toc {
      background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
      padding: 1.5rem;
      border-radius: 12px;
      margin: 2rem 0;
      border: 2px solid #3b82f6;
    }
    .toc h2 {
      margin-top: 0;
      font-size: 1.5rem;
      background: none;
      color: #1e40af;
      padding: 0;
      box-shadow: none;
    }
    .toc ul {
      margin: 0;
    }
    .toc li {
      color: #1e40af;
      font-weight: 500;
    }
    strong {
      color: #1f2937;
      font-weight: 700;
    }
    em {
      color: #6b7280;
    }
    hr {
      border: none;
      border-top: 2px solid #e5e7eb;
      margin: 3rem 0;
    }
    @media print { 
      body { 
        max-width: 100%;
        background: white;
        padding: 20px;
      }
      .container {
        box-shadow: none;
        padding: 0;
      }
      h2 {
        page-break-after: avoid;
      }
      pre {
        page-break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📚 Java Technical Interview Study Guide</h1>
    <p class="subtitle">Generated on ${new Date().toLocaleDateString()} • Comprehensive preparation material</p>
    <div class="toc">
      <h2>📋 Selected Topics</h2>
      <ul>
`

    topics.forEach(topic => {
      html += `        <li>${topic.label}</li>\n`
    })

    html += `      </ul>\n    </div>\n    <hr>\n`

    topics.forEach(topic => {
      html += `  <h2>${topic.label}</h2>\n`
      html += getTopicContentHTML(topic.id)
      html += `  <hr>\n`
    })

    html += `  </div>\n</body>\n</html>`
    return html
  }

  const getTopicContent = (topicId) => {
    const enhancedContent = includeInterviewEnhancements

    const content = {
      'core-java': `
### Concept Summary
Core Java encompasses fundamental programming concepts including OOP principles, data types, control structures, and basic syntax. Essential for all Java development.

${enhancedContent ? `### Common Interview Questions
1. **What is the difference between JDK, JRE, and JVM?**
   - JDK (Java Development Kit): Complete development toolkit including compiler, debugger
   - JRE (Java Runtime Environment): Runtime libraries needed to run Java applications
   - JVM (Java Virtual Machine): Executes bytecode and provides platform independence

2. **Explain the main principles of OOP**
   - Encapsulation: Bundling data and methods together
   - Inheritance: Code reuse through parent-child relationships
   - Polymorphism: Multiple forms of the same entity
   - Abstraction: Hiding implementation details

3. **What are access modifiers in Java?**
   - public: Accessible everywhere
   - private: Only within the same class
   - protected: Within package and subclasses
   - default (package-private): Within the same package

### Code Examples
\`\`\`java
// Encapsulation Example
public class BankAccount {
    private double balance;

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }

    public double getBalance() {
        return balance;
    }
}

// Polymorphism Example
interface Animal {
    void makeSound();
}

class Dog implements Animal {
    public void makeSound() {
        System.out.println("Woof!");
    }
}
\`\`\`

### Best Practices
- Always use appropriate access modifiers
- Follow naming conventions (camelCase for variables/methods)
- Write self-documenting code with clear variable names
- Use final keyword for constants
- Prefer composition over inheritance

### Common Pitfalls
- Forgetting to override equals() and hashCode() together
- Not closing resources (use try-with-resources)
- Using == instead of .equals() for String comparison
- Not handling null pointer exceptions

### Complexity Notes
- String concatenation in loops: O(n²) - use StringBuilder instead
- ArrayList get/set: O(1), remove: O(n)
- LinkedList get: O(n), add/remove: O(1)
` : ''}
`,
      'collections': `
### Concept Summary
Java Collections Framework provides data structures and algorithms for storing and manipulating groups of objects. Key interfaces: List, Set, Map, Queue.

${enhancedContent ? `### Common Interview Questions
1. **Difference between ArrayList and LinkedList?**
   - ArrayList: Dynamic array, fast random access O(1), slow insertion/deletion O(n)
   - LinkedList: Doubly-linked list, slow access O(n), fast insertion/deletion O(1)

2. **How does HashMap work internally?**
   - Uses hash table (array of buckets)
   - Calculates hash code to determine bucket
   - Handles collisions with chaining (linked list/tree)
   - Load factor 0.75, initial capacity 16

3. **What's the difference between HashMap and ConcurrentHashMap?**
   - HashMap: Not thread-safe
   - ConcurrentHashMap: Thread-safe with segment locking, better concurrency

### Code Examples
\`\`\`java
// List Operations
List<String> list = new ArrayList<>();
list.add("Java");
list.add("Python");
Collections.sort(list);

// Map Operations
Map<String, Integer> map = new HashMap<>();
map.put("one", 1);
map.computeIfAbsent("two", k -> 2);
map.merge("one", 10, Integer::sum);

// Set Operations
Set<Integer> set = new HashSet<>();
set.add(1);
set.add(2);
boolean contains = set.contains(1);
\`\`\`

### Time Complexity Cheat Sheet
- ArrayList: get/set O(1), add/remove O(n)
- LinkedList: get O(n), add/remove O(1)
- HashMap: get/put O(1) average, O(n) worst
- TreeMap: get/put O(log n)
- HashSet: add/contains O(1) average
- TreeSet: add/contains O(log n)
` : ''}
`,
      'concurrency': `
### Concept Summary
Concurrency enables multiple tasks to execute simultaneously. Java provides threads, synchronization mechanisms, and concurrent utilities.

${enhancedContent ? `### Common Interview Questions
1. **What's the difference between Thread and Runnable?**
   - Thread: Class that represents a thread of execution
   - Runnable: Interface for defining work to be done by a thread
   - Prefer Runnable for better separation of concerns

2. **Explain synchronized keyword**
   - Provides mutual exclusion for critical sections
   - Can be applied to methods or blocks
   - Acquires intrinsic lock on object

3. **What are the states of a thread?**
   - NEW: Created but not started
   - RUNNABLE: Executing or ready to execute
   - BLOCKED: Waiting for monitor lock
   - WAITING: Waiting indefinitely for another thread
   - TIMED_WAITING: Waiting for specified time
   - TERMINATED: Completed execution

### Code Examples
\`\`\`java
// Thread Creation
Thread thread = new Thread(() -> {
    System.out.println("Running in: " + Thread.currentThread().getName());
});
thread.start();

// ExecutorService
ExecutorService executor = Executors.newFixedThreadPool(5);
executor.submit(() -> System.out.println("Task executed"));
executor.shutdown();

// Synchronized Method
public synchronized void increment() {
    count++;
}

// ReentrantLock
ReentrantLock lock = new ReentrantLock();
lock.lock();
try {
    // Critical section
} finally {
    lock.unlock();
}

// CountDownLatch
CountDownLatch latch = new CountDownLatch(3);
latch.countDown();
latch.await();
\`\`\`

### Best Practices
- Use ExecutorService instead of creating threads manually
- Always release locks in finally blocks
- Prefer atomic variables for simple counters
- Use concurrent collections for thread-safe data structures
- Avoid nested locks to prevent deadlocks
` : ''}
`,
      'streams': `
### Concept Summary
Java 8 Streams API provides functional-style operations on collections. Enables declarative data processing with lazy evaluation.

${enhancedContent ? `### Common Interview Questions
1. **What's the difference between intermediate and terminal operations?**
   - Intermediate: Lazy, return Stream (map, filter, sorted)
   - Terminal: Eager, trigger execution (collect, forEach, reduce)

2. **Explain flatMap vs map**
   - map: One-to-one transformation (T -> R)
   - flatMap: One-to-many transformation (T -> Stream<R>)

### Code Examples
\`\`\`java
// Basic Stream Operations
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
List<Integer> evenSquares = numbers.stream()
    .filter(n -> n % 2 == 0)
    .map(n -> n * n)
    .collect(Collectors.toList());

// Collectors
Map<Boolean, List<String>> partitioned = names.stream()
    .collect(Collectors.partitioningBy(name -> name.length() > 5));

// Reduce
int sum = numbers.stream()
    .reduce(0, Integer::sum);

// Parallel Stream
long count = bigList.parallelStream()
    .filter(predicate)
    .count();
\`\`\`
` : ''}
`,
      'java-8': `
### Concept Summary
Java 8 introduced revolutionary features including lambda expressions, Stream API, functional interfaces, and the new Date/Time API.

${enhancedContent ? `### Common Interview Questions
1. **What are lambda expressions?**
   - Anonymous functions for functional programming
   - Syntax: (parameters) -> expression or (parameters) -> { statements; }
   - Enable treating functionality as method argument

2. **What is a functional interface?**
   - Interface with exactly one abstract method
   - Can have multiple default and static methods
   - Annotated with @FunctionalInterface

### Code Examples
\`\`\`java
// Lambda Expression
List<String> names = Arrays.asList("John", "Jane", "Bob");
names.forEach(name -> System.out.println(name));

// Method Reference
names.forEach(System.out::println);

// Functional Interface
@FunctionalInterface
interface Calculator {
    int calculate(int a, int b);
}

Calculator add = (a, b) -> a + b;
\`\`\`
` : ''}
`,
      'java-11': `
### Concept Summary
Java 11 LTS added local variable type inference (var), new String methods, HTTP Client API, and performance improvements.

${enhancedContent ? `### Key Features
- var keyword for local variable type inference
- New String methods: isBlank(), lines(), strip(), repeat()
- Standard HTTP Client API
- Running Java files directly: java HelloWorld.java

### Code Examples
\`\`\`java
// var keyword
var list = List.of("a", "b", "c");
var map = Map.of("key", "value");

// String methods
String multiline = "Line 1\\nLine 2\\nLine 3";
multiline.lines().forEach(System.out::println);

// HTTP Client
HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com"))
    .build();
\`\`\`
` : ''}
`,
      'java-21': `
### Concept Summary
Java 21 LTS introduces virtual threads (Project Loom), pattern matching, record patterns, and sequenced collections.

${enhancedContent ? `### Key Features
- Virtual threads for lightweight concurrency
- Pattern matching for switch
- Record patterns
- Sequenced collections with first/last methods

### Code Examples
\`\`\`java
// Virtual Threads
Thread.startVirtualThread(() -> {
    System.out.println("Virtual thread!");
});

// Pattern Matching for Switch
String formatted = switch (obj) {
    case Integer i -> "int: " + i;
    case String s -> "String: " + s;
    case null -> "null value";
    default -> "Unknown";
};

// Record Patterns
record Point(int x, int y) {}
if (obj instanceof Point(int x, int y)) {
    System.out.println("x=" + x + ", y=" + y);
}
\`\`\`
` : ''}
`,
      'oop': `
### Concept Summary
Object-Oriented Programming principles: Encapsulation, Inheritance, Polymorphism, and Abstraction.

${enhancedContent ? `### Four Pillars of OOP
1. **Encapsulation**: Bundling data and methods, hiding implementation
2. **Inheritance**: Code reuse through IS-A relationships
3. **Polymorphism**: Many forms - method overloading and overriding
4. **Abstraction**: Hiding complexity, showing only essential features

### Code Examples
\`\`\`java
// Encapsulation
public class Employee {
    private String name;
    private double salary;

    public void setSalary(double salary) {
        if (salary > 0) this.salary = salary;
    }
}

// Inheritance
class Animal {
    void eat() { System.out.println("Eating..."); }
}
class Dog extends Animal {
    void bark() { System.out.println("Barking..."); }
}

// Polymorphism
interface Shape {
    double area();
}
class Circle implements Shape {
    public double area() { return Math.PI * r * r; }
}
\`\`\`
` : ''}
`,
      'multithreading': `
### Concept Summary
Creating and managing multiple threads of execution. ExecutorService, thread pools, and synchronization mechanisms.

${enhancedContent ? `### Common Interview Questions
1. **Difference between Thread and Runnable?**
   - Thread: Class, cannot extend another class
   - Runnable: Interface, better for separation of concerns

2. **What is thread pool?**
   - Reusable pool of worker threads
   - Avoids overhead of creating new threads
   - Managed by ExecutorService

### Code Examples
\`\`\`java
// Thread Pool
ExecutorService executor = Executors.newFixedThreadPool(10);
executor.submit(() -> {
    System.out.println("Task executed");
});
executor.shutdown();

// Callable with Future
Future<Integer> future = executor.submit(() -> {
    return 42;
});
int result = future.get();
\`\`\`
` : ''}
`,
      'jvm': `
### Concept Summary
JVM architecture: Class Loader, Runtime Data Areas, Execution Engine, and Garbage Collector.

${enhancedContent ? `### JVM Components
1. **Class Loader**: Loads .class files
2. **Method Area**: Stores class metadata
3. **Heap**: Object storage
4. **Stack**: Thread-specific method frames
5. **PC Register**: Current instruction pointer
6. **Native Method Stack**: Native code execution

### Memory Areas
- **Heap**: Young Generation (Eden, S0, S1) + Old Generation
- **Stack**: Local variables, method calls
- **Metaspace**: Class metadata (Java 8+)
` : ''}
`,
      'memory': `
### Concept Summary
Java memory management including heap vs stack, garbage collection algorithms, and memory leaks.

${enhancedContent ? `### Memory Management
**Heap**: Objects, instance variables (GC managed)
**Stack**: Local variables, method frames (automatic)

### Garbage Collection
- **Minor GC**: Young generation (Eden + Survivor spaces)
- **Major GC**: Old generation (Tenured)
- **Full GC**: Entire heap

### GC Algorithms
- Serial GC: Single-threaded
- Parallel GC: Multiple threads
- CMS: Concurrent Mark Sweep (deprecated)
- G1GC: Garbage First (default Java 9+)
- ZGC: Scalable low-latency (Java 11+)

### Common Memory Leaks
\`\`\`java
// Memory Leak Example
static List<Object> list = new ArrayList<>();
public void leak() {
    list.add(new Object()); // Never removed!
}

// Fix: Clear when done
public void cleanup() {
    list.clear();
}
\`\`\`
` : ''}
`,
      'exception-handling': `
### Concept Summary
Exception handling with try-catch-finally, custom exceptions, and try-with-resources.

${enhancedContent ? `### Exception Hierarchy
- Throwable
  - Error (unchecked): OutOfMemoryError, StackOverflowError
  - Exception
    - RuntimeException (unchecked): NullPointerException, IllegalArgumentException
    - Checked exceptions: IOException, SQLException

### Code Examples
\`\`\`java
// Try-with-resources
try (FileReader fr = new FileReader("file.txt");
     BufferedReader br = new BufferedReader(fr)) {
    String line = br.readLine();
} catch (IOException e) {
    e.printStackTrace();
}

// Custom Exception
class InvalidAgeException extends Exception {
    public InvalidAgeException(String message) {
        super(message);
    }
}

// Multi-catch
try {
    // code
} catch (IOException | SQLException e) {
    e.printStackTrace();
}
\`\`\`

### Best Practices
- Catch specific exceptions first
- Don't catch Throwable or Error
- Use try-with-resources for AutoCloseable
- Create custom exceptions for business logic
- Log exceptions properly
` : ''}
`,
      'functional-interfaces': `
### Concept Summary
Built-in functional interfaces: Predicate, Function, Consumer, Supplier, and custom functional interfaces.

${enhancedContent ? `### Built-in Functional Interfaces
- **Predicate<T>**: T -> boolean (test)
- **Function<T,R>**: T -> R (apply)
- **Consumer<T>**: T -> void (accept)
- **Supplier<T>**: () -> T (get)
- **UnaryOperator<T>**: T -> T
- **BinaryOperator<T>**: (T,T) -> T

### Code Examples
\`\`\`java
// Predicate
Predicate<Integer> isEven = n -> n % 2 == 0;
System.out.println(isEven.test(4)); // true

// Function
Function<String, Integer> length = String::length;
System.out.println(length.apply("Hello")); // 5

// Consumer
Consumer<String> printer = System.out::println;
printer.accept("Hello World");

// Supplier
Supplier<Double> random = Math::random;
System.out.println(random.get());

// Custom Functional Interface
@FunctionalInterface
interface TriFunction<T,U,V,R> {
    R apply(T t, U u, V v);
}
\`\`\`
` : ''}
`,
      'design-patterns': `
### Concept Summary
Gang of Four design patterns: Creational, Structural, and Behavioral patterns.

${enhancedContent ? `### Creational Patterns
- **Singleton**: One instance per JVM
- **Factory**: Create objects without specifying exact class
- **Builder**: Construct complex objects step by step
- **Prototype**: Clone existing objects

### Structural Patterns
- **Adapter**: Make incompatible interfaces work together
- **Decorator**: Add behavior dynamically
- **Proxy**: Control access to objects
- **Facade**: Simplified interface to complex subsystem

### Behavioral Patterns
- **Observer**: Subscribe to events
- **Strategy**: Encapsulate algorithms
- **Template Method**: Define algorithm skeleton
- **Command**: Encapsulate requests as objects

### Code Examples
\`\`\`java
// Singleton
public class Singleton {
    private static volatile Singleton instance;
    private Singleton() {}
    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}

// Builder Pattern
User user = new User.Builder("John")
    .age(30)
    .email("john@example.com")
    .build();
\`\`\`
` : ''}
`,
      'spring': `
### Concept Summary
Spring Framework: IoC container, Dependency Injection, AOP, and enterprise features.

${enhancedContent ? `### Core Concepts
- **IoC (Inversion of Control)**: Framework controls object lifecycle
- **DI (Dependency Injection)**: Objects receive dependencies from container
- **AOP (Aspect-Oriented Programming)**: Cross-cutting concerns
- **Spring Beans**: Objects managed by Spring container

### Code Examples
\`\`\`java
// Component Annotation
@Component
public class UserService {
    private final UserRepository repository;

    @Autowired
    public UserService(UserRepository repository) {
        this.repository = repository;
    }
}

// Configuration
@Configuration
public class AppConfig {
    @Bean
    public DataSource dataSource() {
        return new HikariDataSource();
    }
}

// AOP
@Aspect
@Component
public class LoggingAspect {
    @Before("execution(* com.example.service.*.*(..))")
    public void logBefore(JoinPoint joinPoint) {
        System.out.println("Method: " + joinPoint.getSignature());
    }
}
\`\`\`
` : ''}
`,
      'spring-boot': `
### Concept Summary
Spring Boot: Auto-configuration, embedded servers, starter dependencies, and production-ready features.

${enhancedContent ? `### Key Features
- **Auto-configuration**: Automatically configures Spring application
- **Starter Dependencies**: Pre-configured dependency bundles
- **Embedded Servers**: Tomcat, Jetty, Undertow
- **Actuator**: Production monitoring and management
- **Spring Boot CLI**: Command-line interface

### Code Examples
\`\`\`java
// Main Application
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

// REST Controller
@RestController
@RequestMapping("/api/users")
public class UserController {
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.findById(id);
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.save(user);
    }
}

// application.yml
server:
  port: 8080
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/mydb
\`\`\`
` : ''}
`,
      'data-structures': `
### Concept Summary
Fundamental data structures: Arrays, Lists, Sets, Maps, Trees, Graphs, Heaps, and their implementations.

${enhancedContent ? `### Common Data Structures
- **Array**: Fixed size, O(1) access
- **ArrayList**: Dynamic array, O(1) access, O(n) insertion
- **LinkedList**: Doubly-linked, O(n) access, O(1) insertion
- **HashMap**: Key-value pairs, O(1) average operations
- **TreeMap**: Sorted map, O(log n) operations
- **HashSet**: Unique elements, O(1) operations
- **PriorityQueue**: Heap-based, O(log n) insertion

### Time Complexity
| Operation | ArrayList | LinkedList | HashMap | TreeMap |
|-----------|-----------|------------|---------|---------|
| Get       | O(1)      | O(n)       | O(1)    | O(log n)|
| Add       | O(1)*     | O(1)       | O(1)    | O(log n)|
| Remove    | O(n)      | O(1)       | O(1)    | O(log n)|
| Contains  | O(n)      | O(n)       | O(1)    | O(log n)|
` : ''}
`,
      'algorithms': `
### Concept Summary
Algorithm design and analysis including sorting, searching, and optimization techniques.

${enhancedContent ? `### Common Algorithms
**Sorting**:
- Bubble Sort: O(n²)
- Selection Sort: O(n²)
- Insertion Sort: O(n²)
- Merge Sort: O(n log n)
- Quick Sort: O(n log n) average
- Heap Sort: O(n log n)

**Searching**:
- Linear Search: O(n)
- Binary Search: O(log n) - requires sorted array
- BFS: O(V + E)
- DFS: O(V + E)

**Techniques**:
- Divide and Conquer
- Dynamic Programming
- Greedy Algorithms
- Backtracking
- Two Pointers
- Sliding Window
` : ''}
`,
      'dynamic-programming': `
### Concept Summary
Optimization technique using memoization and tabulation to solve problems with overlapping subproblems.

${enhancedContent ? `### Key Concepts
- **Overlapping Subproblems**: Same problem solved multiple times
- **Optimal Substructure**: Optimal solution contains optimal solutions to subproblems
- **Memoization**: Top-down (recursion + cache)
- **Tabulation**: Bottom-up (iterative + table)

### Classic Problems
\`\`\`java
// Fibonacci (Memoization)
public int fib(int n, int[] memo) {
    if (n <= 1) return n;
    if (memo[n] != 0) return memo[n];
    memo[n] = fib(n-1, memo) + fib(n-2, memo);
    return memo[n];
}

// 0/1 Knapsack
public int knapsack(int[] weights, int[] values, int W) {
    int[][] dp = new int[weights.length + 1][W + 1];
    for (int i = 1; i <= weights.length; i++) {
        for (int w = 1; w <= W; w++) {
            if (weights[i-1] <= w) {
                dp[i][w] = Math.max(
                    dp[i-1][w],
                    values[i-1] + dp[i-1][w - weights[i-1]]
                );
            } else {
                dp[i][w] = dp[i-1][w];
            }
        }
    }
    return dp[weights.length][W];
}
\`\`\`
` : ''}
`,
      'trees': `
### Concept Summary
Binary trees, Binary Search Trees, AVL trees, and tree traversal algorithms.

${enhancedContent ? `### Tree Operations
**Traversals**:
- In-order: Left → Root → Right (gives sorted order for BST)
- Pre-order: Root → Left → Right
- Post-order: Left → Right → Root
- Level-order: BFS using queue

### Code Examples
\`\`\`java
// Tree Node
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}

// In-order Traversal
void inorder(TreeNode root) {
    if (root == null) return;
    inorder(root.left);
    System.out.println(root.val);
    inorder(root.right);
}

// Level-order Traversal
void levelOrder(TreeNode root) {
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    while (!queue.isEmpty()) {
        TreeNode node = queue.poll();
        System.out.println(node.val);
        if (node.left != null) queue.offer(node.left);
        if (node.right != null) queue.offer(node.right);
    }
}
\`\`\`
` : ''}
`,
      'graphs': `
### Concept Summary
Graph data structures and algorithms including DFS, BFS, shortest path, and cycle detection.

${enhancedContent ? `### Graph Representations
- **Adjacency Matrix**: 2D array, O(1) edge lookup, O(V²) space
- **Adjacency List**: List of lists, O(V+E) space

### Algorithms
\`\`\`java
// DFS (Depth-First Search)
void dfs(int node, boolean[] visited, List<List<Integer>> graph) {
    visited[node] = true;
    System.out.println(node);
    for (int neighbor : graph.get(node)) {
        if (!visited[neighbor]) {
            dfs(neighbor, visited, graph);
        }
    }
}

// BFS (Breadth-First Search)
void bfs(int start, List<List<Integer>> graph) {
    Queue<Integer> queue = new LinkedList<>();
    boolean[] visited = new boolean[graph.size()];
    queue.offer(start);
    visited[start] = true;

    while (!queue.isEmpty()) {
        int node = queue.poll();
        System.out.println(node);
        for (int neighbor : graph.get(node)) {
            if (!visited[neighbor]) {
                queue.offer(neighbor);
                visited[neighbor] = true;
            }
        }
    }
}
\`\`\`
` : ''}
`,
      'system-design': `
### Concept Summary
System design principles including scalability, availability, CAP theorem, load balancing, and distributed systems.

${enhancedContent ? `### Key Concepts
- **Scalability**: Vertical (bigger machines) vs Horizontal (more machines)
- **Load Balancing**: Distribute traffic across servers
- **Caching**: Redis, Memcached, CDN
- **Database**: SQL vs NoSQL, sharding, replication
- **CAP Theorem**: Consistency, Availability, Partition Tolerance (choose 2)

### Design Patterns
- **API Gateway**: Single entry point for microservices
- **Circuit Breaker**: Prevent cascading failures
- **CQRS**: Separate read and write models
- **Event Sourcing**: Store state changes as events
- **Saga Pattern**: Distributed transactions

### Common Interview Questions
1. Design URL shortener (like bit.ly)
2. Design Twitter feed
3. Design rate limiter
4. Design notification system
5. Design distributed cache
` : ''}
`
    }

    return content[topicId] || `### ${topicId}\n\nContent for this topic will be available soon.\n\n`
  }

  const getTopicContentPlain = (topicId) => {
    // Simplified plain text version
    return getTopicContent(topicId).replace(/###/g, '').replace(/```java/g, '').replace(/```/g, '').replace(/\*/g, '')
  }

  const getTopicContentHTML = (topicId) => {
    const markdown = getTopicContent(topicId)

    // Simple markdown to HTML conversion
    return markdown
      .replace(/### (.*)/g, '<h3>$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/```java\n([\s\S]*?)\n```/g, '<pre><code>$1</code></pre>')
      .replace(/- (.*)/g, '<li>$1</li>')
      .replace(/\n\n/g, '<p></p>')
  }

  // Cheatsheet generation functions (condensed versions)
  const generateCheatsheetMarkdown = (topics) => {
    let md = `# Java Quick Reference Cheatsheet 📝\n\n`
    md += `*Generated on ${new Date().toLocaleDateString()}*\n\n`
    md += `> **Quick reference guide with essential concepts and syntax**\n\n`
    
    topics.forEach(topic => {
      md += `## ${topic.label}\n\n`
      md += getCheatsheetContent(topic.id)
      md += `\n`
    })
    
    return md
  }

  const generateCheatsheetPlainText = (topics) => {
    let txt = `JAVA QUICK REFERENCE CHEATSHEET\n`
    txt += `Generated on ${new Date().toLocaleDateString()}\n`
    txt += `${'='.repeat(60)}\n\n`
    
    topics.forEach(topic => {
      txt += `${topic.label.toUpperCase()}\n`
      txt += `${'-'.repeat(40)}\n`
      txt += getCheatsheetContent(topic.id).replace(/###/g, '').replace(/\*\*/g, '').replace(/`/g, '')
      txt += `\n`
    })
    
    return txt
  }

  const generateCheatsheetHTML = (topics) => {
    let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Java Cheatsheet</title>
  <style>
    * { box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
      line-height: 1.5; 
      max-width: 1000px; 
      margin: 0 auto; 
      padding: 30px 20px; 
      font-size: 13px;
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    }
    .container {
      background: white;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
    }
    h1 { 
      color: #1f2937;
      font-size: 2rem;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: 800;
    }
    .subtitle {
      color: #6b7280;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid #e5e7eb;
    }
    h2 { 
      color: white;
      margin-top: 2rem;
      font-size: 1.25rem;
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      padding: 0.75rem 1rem;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(245, 158, 11, 0.3);
      font-weight: 700;
    }
    h3 { 
      color: #374151;
      font-size: 1rem;
      margin: 1rem 0 0.5rem 0;
      padding-left: 0.75rem;
      border-left: 3px solid #f59e0b;
      font-weight: 700;
    }
    p {
      color: #4b5563;
      margin: 0.5rem 0;
    }
    code { 
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      color: #92400e;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: 'Courier New', Consolas, monospace;
      font-size: 0.9em;
      font-weight: 600;
      border: 1px solid #fbbf24;
    }
    pre { 
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
      color: #e2e8f0;
      padding: 15px;
      border-radius: 8px;
      overflow-x: auto;
      font-size: 0.85rem;
      margin: 1rem 0;
      border: 2px solid #334155;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      line-height: 1.5;
    }
    pre code {
      background: none;
      color: inherit;
      padding: 0;
      border: none;
      font-weight: normal;
    }
    ul { 
      margin: 0.5rem 0;
      padding-left: 1.5rem;
    }
    li { 
      margin: 0.4rem 0;
      color: #374151;
      line-height: 1.6;
    }
    strong {
      color: #1f2937;
      font-weight: 700;
    }
    .banner {
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      padding: 1rem 1.25rem;
      border-radius: 8px;
      border: 2px solid #f59e0b;
      margin-bottom: 1.5rem;
      box-shadow: 0 4px 10px rgba(245, 158, 11, 0.2);
    }
    .banner strong {
      color: #92400e;
      font-size: 1rem;
    }
    @media print { 
      body { 
        max-width: 100%;
        font-size: 11px;
        background: white;
        padding: 15px;
      }
      .container {
        box-shadow: none;
        padding: 0;
      }
      h1 { font-size: 1.5rem; }
      h2 { 
        font-size: 1.1rem;
        page-break-after: avoid;
      }
      pre {
        page-break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📝 Java Quick Reference Cheatsheet</h1>
    <p class="subtitle"><em>Generated on ${new Date().toLocaleDateString()}</em></p>
    <div class="banner">
      <strong>⚡ Quick Reference:</strong> Essential concepts and syntax for ${topics.length} topics
    </div>
`
    
    topics.forEach(topic => {
      html += `    <h2>${topic.label}</h2>\n`
      html += `    <div>${getCheatsheetContentHTML(topic.id)}</div>\n`
    })
    
    html += `  </div>\n</body>\n</html>`
    return html
  }

  const getCheatsheetContent = (topicId) => {
    // Condensed content for cheatsheet - key points only
    const cheatsheetContent = {
      'core-java': `### Key Concepts
- **Primitives**: byte, short, int, long, float, double, char, boolean
- **Wrapper Classes**: Integer, Double, Character, Boolean, etc.
- **String**: Immutable, use StringBuilder for concatenation
- **Arrays**: Fixed size, \`int[] arr = new int[5]\`

### Essential Syntax
\`\`\`java
// Variable declaration
int x = 10;
String name = "Java";

// Control flow
if (condition) { } else { }
for (int i = 0; i < n; i++) { }
while (condition) { }

// Methods
public static int add(int a, int b) {
    return a + b;
}
\`\`\``,

      'java-8': `### Lambda Expressions
\`\`\`java
(params) -> expression
(params) -> { statements; }
list.forEach(item -> System.out.println(item));
\`\`\`

### Stream API
\`\`\`java
list.stream()
    .filter(x -> x > 10)
    .map(x -> x * 2)
    .collect(Collectors.toList());
\`\`\`

### Optional
\`\`\`java
Optional<String> opt = Optional.ofNullable(value);
opt.ifPresent(v -> System.out.println(v));
String result = opt.orElse("default");
\`\`\``,

      'collections': `### List
\`\`\`java
List<String> list = new ArrayList<>();
list.add("item");
list.get(0);
list.remove(0);
\`\`\`

### Set
\`\`\`java
Set<Integer> set = new HashSet<>();
set.add(1);
set.contains(1);
\`\`\`

### Map
\`\`\`java
Map<String, Integer> map = new HashMap<>();
map.put("key", 1);
map.get("key");
map.getOrDefault("key", 0);
\`\`\``,

      'concurrency': `### Thread Creation
\`\`\`java
Thread t = new Thread(() -> { /* code */ });
t.start();
\`\`\`

### Synchronized
\`\`\`java
synchronized(lock) {
    // critical section
}
\`\`\`

### ExecutorService
\`\`\`java
ExecutorService executor = Executors.newFixedThreadPool(5);
executor.submit(() -> { /* task */ });
executor.shutdown();
\`\`\``,

      'design-patterns': `### Singleton
\`\`\`java
private static volatile Instance instance;
public static Instance getInstance() {
    if (instance == null) {
        synchronized(Instance.class) {
            if (instance == null) instance = new Instance();
        }
    }
    return instance;
}
\`\`\`

### Factory
\`\`\`java
public interface Shape { void draw(); }
public class ShapeFactory {
    public Shape getShape(String type) {
        if (type.equals("CIRCLE")) return new Circle();
        return null;
    }
}
\`\`\`

### Observer
\`\`\`java
interface Observer { void update(String message); }
class Subject {
    List<Observer> observers = new ArrayList<>();
    void attach(Observer o) { observers.add(o); }
    void notifyObservers(String msg) {
        observers.forEach(o -> o.update(msg));
    }
}
\`\`\``,

      'java-11': `### Key Features
- **var keyword**: Local variable type inference
- **String methods**: isBlank(), lines(), strip(), repeat()
- **HTTP Client**: Standard HTTP/2 client
- **Run files**: \`java HelloWorld.java\`

\`\`\`java
var list = List.of("a", "b", "c");
String text = "  hello  ".strip();
HttpClient client = HttpClient.newHttpClient();
\`\`\``,

      'java-21': `### Virtual Threads
\`\`\`java
Thread.startVirtualThread(() -> {
    System.out.println("Virtual thread!");
});
\`\`\`

### Pattern Matching
\`\`\`java
String result = switch (obj) {
    case Integer i -> "int: " + i;
    case String s -> "String: " + s;
    default -> "Unknown";
};
\`\`\``,

      'oop': `### Four Pillars
- **Encapsulation**: Hide data, expose methods
- **Inheritance**: IS-A relationship, code reuse
- **Polymorphism**: Method overloading/overriding
- **Abstraction**: Hide complexity

\`\`\`java
class Animal { void eat() {} }
class Dog extends Animal { void bark() {} }
\`\`\``,

      'multithreading': `### Thread Pool
\`\`\`java
ExecutorService executor = Executors.newFixedThreadPool(10);
executor.submit(() -> System.out.println("Task"));
executor.shutdown();
\`\`\`

### Future
\`\`\`java
Future<Integer> future = executor.submit(() -> 42);
int result = future.get();
\`\`\``,

      'jvm': `### JVM Components
- **Class Loader**: Loads .class files
- **Heap**: Object storage (Young + Old Gen)
- **Stack**: Method frames, local variables
- **Metaspace**: Class metadata (Java 8+)

### Memory Areas
- **Young Gen**: Eden + S0 + S1
- **Old Gen**: Long-lived objects`,

      'memory': `### Heap vs Stack
- **Heap**: Objects, GC managed
- **Stack**: Local vars, auto-managed

### GC Types
- **Minor GC**: Young generation
- **Major GC**: Old generation
- **Full GC**: Entire heap

### GC Algorithms
- Serial, Parallel, G1GC, ZGC`,

      'exception-handling': `### Exception Hierarchy
- **Checked**: IOException, SQLException
- **Unchecked**: RuntimeException, NullPointerException

\`\`\`java
try (FileReader fr = new FileReader("file.txt")) {
    // auto-closeable
} catch (IOException e) {
    e.printStackTrace();
}

// Multi-catch
catch (IOException | SQLException e) {}
\`\`\``,

      'streams': `### Stream Operations
\`\`\`java
list.stream()
    .filter(x -> x > 0)
    .map(x -> x * 2)
    .sorted()
    .collect(Collectors.toList());

// flatMap
list.stream()
    .flatMap(List::stream)
    .collect(Collectors.toList());
\`\`\``,

      'functional-interfaces': `### Built-in Interfaces
\`\`\`java
Predicate<Integer> isEven = n -> n % 2 == 0;
Function<String, Integer> len = String::length;
Consumer<String> print = System.out::println;
Supplier<Double> random = Math::random;

// Custom
@FunctionalInterface
interface Calculator {
    int calculate(int a, int b);
}
\`\`\``,

      'spring': `### Core Annotations
\`\`\`java
@Component
@Service
@Repository
@Controller

@Autowired
public UserService(UserRepository repo) {
    this.repo = repo;
}

@Configuration
public class AppConfig {
    @Bean
    public DataSource dataSource() {
        return new HikariDataSource();
    }
}
\`\`\``,

      'spring-boot': `### Quick Start
\`\`\`java
@SpringBootApplication
public class App {
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }
}

@RestController
@RequestMapping("/api")
public class UserController {
    @GetMapping("/{id}")
    public User get(@PathVariable Long id) {
        return service.findById(id);
    }
}
\`\`\``,

      'data-structures': `### Time Complexity
| DS | Get | Add | Remove |
|----|-----|-----|--------|
| ArrayList | O(1) | O(1) | O(n) |
| LinkedList | O(n) | O(1) | O(1) |
| HashMap | O(1) | O(1) | O(1) |
| TreeMap | O(log n) | O(log n) | O(log n) |`,

      'algorithms': `### Sorting
- Bubble: O(n²)
- Merge: O(n log n)
- Quick: O(n log n) avg

### Searching
- Linear: O(n)
- Binary: O(log n)

### Techniques
- Two Pointers
- Sliding Window
- Divide & Conquer`,

      'dynamic-programming': `### Key Concepts
- **Memoization**: Top-down + cache
- **Tabulation**: Bottom-up + table

\`\`\`java
// Fibonacci
int fib(int n, int[] memo) {
    if (n <= 1) return n;
    if (memo[n] != 0) return memo[n];
    memo[n] = fib(n-1, memo) + fib(n-2, memo);
    return memo[n];
}
\`\`\``,

      'trees': `### Traversals
\`\`\`java
// In-order (Left-Root-Right)
void inorder(TreeNode root) {
    if (root == null) return;
    inorder(root.left);
    visit(root);
    inorder(root.right);
}

// Level-order (BFS)
Queue<TreeNode> q = new LinkedList<>();
q.offer(root);
while (!q.isEmpty()) {
    TreeNode node = q.poll();
    visit(node);
    if (node.left != null) q.offer(node.left);
    if (node.right != null) q.offer(node.right);
}
\`\`\``,

      'graphs': `### DFS & BFS
\`\`\`java
// DFS
void dfs(int node, boolean[] visited, List<List<Integer>> graph) {
    visited[node] = true;
    for (int neighbor : graph.get(node)) {
        if (!visited[neighbor]) dfs(neighbor, visited, graph);
    }
}

// BFS
Queue<Integer> q = new LinkedList<>();
q.offer(start);
visited[start] = true;
while (!q.isEmpty()) {
    int node = q.poll();
    for (int neighbor : graph.get(node)) {
        if (!visited[neighbor]) {
            q.offer(neighbor);
            visited[neighbor] = true;
        }
    }
}
\`\`\``,

      'system-design': `### Key Concepts
- **Scalability**: Vertical vs Horizontal
- **Load Balancing**: Distribute traffic
- **Caching**: Redis, Memcached, CDN
- **CAP Theorem**: Consistency, Availability, Partition Tolerance

### Patterns
- API Gateway
- Circuit Breaker
- CQRS
- Event Sourcing
- Saga Pattern

### Common Questions
- URL shortener
- Twitter feed
- Rate limiter
- Notification system`
    }

    return cheatsheetContent[topicId] || `### ${topicId}\n\n**Key Points**: Essential concepts and syntax\n\n`
  }

  const getCheatsheetContentHTML = (topicId) => {
    const markdown = getCheatsheetContent(topicId)
    return markdown
      .replace(/### (.*)/g, '<h3>$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/```java\n([\s\S]*?)\n```/g, '<pre><code>$1</code></pre>')
      .replace(/- (.*)/g, '<li>$1</li>')
      .replace(/\n\n/g, '<br>')
  }

  const downloadFile = (content, type = 'study-guide') => {
    let blob, filename

    const prefix = type === 'cheatsheet' ? 'java-cheatsheet' : 'java-study-guide'
    
    if (format === 'markdown') {
      blob = new Blob([content], { type: 'text/markdown' })
      filename = `${prefix}.md`
    } else if (format === 'txt') {
      blob = new Blob([content], { type: 'text/plain' })
      filename = `${prefix}.txt`
    } else if (format === 'pdf') {
      blob = new Blob([content], { type: 'text/html' })
      filename = `${prefix}.html`
      alert('HTML file generated! Open it in your browser and use Print > Save as PDF to create a PDF.')
    }

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Group topics by category
  const groupedTopics = allTopics.reduce((acc, topic) => {
    if (!acc[topic.category]) {
      acc[topic.category] = []
    }
    acc[topic.category].push(topic)
    return acc
  }, {})

  return (
    <div
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
        zIndex: 1000000,
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '2rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          position: 'sticky',
          top: 0,
          zIndex: 1,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '2.5rem' }}>📚</span>
                <h2 style={{ margin: 0, fontSize: '1.875rem', color: 'white', fontWeight: '700' }}>
                  Study Guide Generator
                </h2>
              </div>
              <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.95rem' }}>
                Create personalized study materials for your Java interview prep
              </p>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: 'white',
                padding: '0.5rem',
                borderRadius: '8px',
                transition: 'all 0.2s',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '2rem', maxHeight: 'calc(90vh - 200px)', overflowY: 'auto' }}>
          {/* Select All Checkbox */}
          <div style={{ marginBottom: '2rem' }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer',
                padding: '1rem 1.25rem',
                background: selectedTopics.length === allTopics.length ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                borderRadius: '12px',
                fontWeight: '600',
                fontSize: '1rem',
                color: selectedTopics.length === allTopics.length ? 'white' : '#1f2937',
                border: '2px solid',
                borderColor: selectedTopics.length === allTopics.length ? '#667eea' : '#d1d5db',
                transition: 'all 0.3s',
                boxShadow: selectedTopics.length === allTopics.length ? '0 4px 12px rgba(102, 126, 234, 0.3)' : '0 2px 4px rgba(0, 0, 0, 0.05)'
              }}
              onMouseEnter={(e) => {
                if (selectedTopics.length !== allTopics.length) {
                  e.currentTarget.style.backgroundColor = '#e5e7eb'
                }
              }}
              onMouseLeave={(e) => {
                if (selectedTopics.length !== allTopics.length) {
                  e.currentTarget.style.backgroundColor = '#f3f4f6'
                }
              }}
            >
              <input
                type="checkbox"
                checked={selectedTopics.length === allTopics.length}
                onChange={handleSelectAll}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              Select All Topics ({allTopics.length})
            </label>
          </div>

          {/* Topics by Category */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ 
              fontSize: '1.125rem', 
              color: '#1f2937', 
              marginBottom: '1.25rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ fontSize: '1.25rem' }}>🎯</span>
              Select Topics
            </h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {Object.entries(groupedTopics).map(([category, topics]) => (
                <div key={category}>
                  <div style={{
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    color: '#667eea',
                    marginBottom: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <div style={{ width: '3px', height: '16px', backgroundColor: '#667eea', borderRadius: '2px' }}></div>
                    {category}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
                    {topics.map(topic => (
                      <label
                        key={topic.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          cursor: 'pointer',
                          padding: '0.875rem 1rem',
                          borderRadius: '10px',
                          backgroundColor: selectedTopics.includes(topic.id) ? '#eff6ff' : 'white',
                          border: '2px solid',
                          borderColor: selectedTopics.includes(topic.id) ? '#667eea' : '#e5e7eb',
                          transition: 'all 0.2s',
                          boxShadow: selectedTopics.includes(topic.id) ? '0 4px 8px rgba(102, 126, 234, 0.15)' : '0 1px 3px rgba(0, 0, 0, 0.05)'
                        }}
                        onMouseEnter={(e) => {
                          if (!selectedTopics.includes(topic.id)) {
                            e.currentTarget.style.backgroundColor = '#f9fafb'
                            e.currentTarget.style.borderColor = '#d1d5db'
                            e.currentTarget.style.transform = 'translateY(-2px)'
                            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!selectedTopics.includes(topic.id)) {
                            e.currentTarget.style.backgroundColor = 'white'
                            e.currentTarget.style.borderColor = '#e5e7eb'
                            e.currentTarget.style.transform = 'translateY(0)'
                            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)'
                          }
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedTopics.includes(topic.id)}
                          onChange={() => handleTopicToggle(topic.id)}
                          style={{ 
                            cursor: 'pointer',
                            width: '18px',
                            height: '18px',
                            accentColor: '#667eea'
                          }}
                        />
                        <span style={{ 
                          fontSize: '0.9rem', 
                          color: selectedTopics.includes(topic.id) ? '#1f2937' : '#4b5563', 
                          fontWeight: selectedTopics.includes(topic.id) ? '600' : '500',
                          flex: 1
                        }}>
                          {topic.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Format Selection */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ 
              fontSize: '1.125rem', 
              color: '#1f2937', 
              marginBottom: '1rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ fontSize: '1.25rem' }}>📋</span>
              Choose Format
            </h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {[
                { value: 'markdown', label: 'Markdown', icon: '📝' },
                { value: 'txt', label: 'Plain Text', icon: '📄' },
                { value: 'pdf', label: 'PDF (HTML)', icon: '📕' }
              ].map(fmt => (
                <label
                  key={fmt.value}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1rem 1.5rem',
                    border: '2px solid',
                    borderColor: format === fmt.value ? '#667eea' : '#e5e7eb',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    backgroundColor: format === fmt.value ? '#eff6ff' : 'white',
                    transition: 'all 0.2s',
                    boxShadow: format === fmt.value ? '0 4px 12px rgba(102, 126, 234, 0.2)' : '0 2px 4px rgba(0, 0, 0, 0.05)',
                    flex: '1',
                    minWidth: '150px'
                  }}
                  onMouseEnter={(e) => {
                    if (format !== fmt.value) {
                      e.currentTarget.style.borderColor = '#d1d5db'
                      e.currentTarget.style.backgroundColor = '#f9fafb'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (format !== fmt.value) {
                      e.currentTarget.style.borderColor = '#e5e7eb'
                      e.currentTarget.style.backgroundColor = 'white'
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)'
                    }
                  }}
                >
                  <input
                    type="radio"
                    name="format"
                    value={fmt.value}
                    checked={format === fmt.value}
                    onChange={(e) => setFormat(e.target.value)}
                    style={{ 
                      cursor: 'pointer',
                      width: '18px',
                      height: '18px',
                      accentColor: '#667eea'
                    }}
                  />
                  <span style={{ fontSize: '1.5rem' }}>{fmt.icon}</span>
                  <span style={{ 
                    fontSize: '0.95rem', 
                    fontWeight: '600', 
                    color: format === fmt.value ? '#1f2937' : '#4b5563',
                    flex: 1
                  }}>
                    {fmt.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Interview Enhancements Toggle */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'flex',
              alignItems: 'start',
              gap: '1rem',
              cursor: 'pointer',
              padding: '1.25rem',
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              borderRadius: '12px',
              border: '2px solid #f59e0b',
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.2)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(245, 158, 11, 0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.2)'
            }}>
              <input
                type="checkbox"
                checked={includeInterviewEnhancements}
                onChange={(e) => setIncludeInterviewEnhancements(e.target.checked)}
                style={{ 
                  marginTop: '0.25rem', 
                  cursor: 'pointer',
                  width: '20px',
                  height: '20px',
                  accentColor: '#f59e0b'
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontWeight: '700', 
                  color: '#92400e', 
                  marginBottom: '0.5rem',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{ fontSize: '1.25rem' }}>🎯</span>
                  Include Technical Interview Enhancements
                </div>
                <div style={{ fontSize: '0.9rem', color: '#78350f', lineHeight: '1.5' }}>
                  Add interview tips, common pitfalls, sample questions, complexity analysis, and best practices to your study guide
                </div>
              </div>
            </label>
          </div>

          {/* Selected Count */}
          {selectedTopics.length > 0 && (
            <div style={{
              padding: '1rem 1.25rem',
              background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
              borderRadius: '12px',
              marginBottom: '1rem',
              fontSize: '1rem',
              color: '#1e40af',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              border: '2px solid #3b82f6',
              boxShadow: '0 2px 8px rgba(59, 130, 246, 0.15)'
            }}>
              <span style={{ fontSize: '1.25rem' }}>✓</span>
              <span>{selectedTopics.length} topic{selectedTopics.length !== 1 ? 's' : ''} selected</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '1.75rem 2rem',
          borderTop: '2px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '1rem',
          position: 'sticky',
          bottom: 0,
          backgroundColor: 'white',
          boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.05)'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '0.875rem 1.75rem',
              fontSize: '1rem',
              backgroundColor: 'white',
              color: '#4b5563',
              border: '2px solid #d1d5db',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f9fafb'
              e.currentTarget.style.borderColor = '#9ca3af'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white'
              e.currentTarget.style.borderColor = '#d1d5db'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Cancel
          </button>
          <button
            onClick={generateCheatsheet}
            disabled={isGenerating || selectedTopics.length === 0}
            style={{
              padding: '0.875rem 1.75rem',
              fontSize: '1rem',
              background: isGenerating || selectedTopics.length === 0 ? '#9ca3af' : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: isGenerating || selectedTopics.length === 0 ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s',
              boxShadow: isGenerating || selectedTopics.length === 0 ? 'none' : '0 4px 12px rgba(245, 158, 11, 0.3)'
            }}
            onMouseEnter={(e) => {
              if (!isGenerating && selectedTopics.length > 0) {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(245, 158, 11, 0.4)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isGenerating && selectedTopics.length > 0) {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.3)'
              }
            }}
          >
            {isGenerating ? (
              <>
                <span>Generating...</span>
                <span style={{ animation: 'spin 1s linear infinite' }}>⚙️</span>
              </>
            ) : (
              <>
                <span>📝</span>
                <span>Generate Cheatsheet</span>
              </>
            )}
          </button>
          <button
            onClick={generateStudyGuide}
            disabled={isGenerating || selectedTopics.length === 0}
            style={{
              padding: '0.875rem 1.75rem',
              fontSize: '1rem',
              background: isGenerating || selectedTopics.length === 0 ? '#9ca3af' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: isGenerating || selectedTopics.length === 0 ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s',
              boxShadow: isGenerating || selectedTopics.length === 0 ? 'none' : '0 4px 12px rgba(102, 126, 234, 0.3)'
            }}
            onMouseEnter={(e) => {
              if (!isGenerating && selectedTopics.length > 0) {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.4)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isGenerating && selectedTopics.length > 0) {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)'
              }
            }}
          >
            {isGenerating ? (
              <>
                <span>Generating...</span>
                <span style={{ animation: 'spin 1s linear infinite' }}>⚙️</span>
              </>
            ) : (
              <>
                <span>📥</span>
                <span>Generate Study Guide</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default StudyGuideModal
