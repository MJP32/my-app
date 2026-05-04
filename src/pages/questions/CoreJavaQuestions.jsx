import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CompletionCheckbox from '../../components/CompletionCheckbox'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

function CoreJavaQuestions({ onBack, breadcrumb, problemLimit }) {
  const [expandedQuestion, setExpandedQuestion] = useState(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeDifficulty, setActiveDifficulty] = useState('All')

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
      category: 'OOP Principles',
      difficulty: 'Medium',
      question: 'Explain the four pillars of Object-Oriented Programming with real-world examples',
      answer: `**Four Pillars of OOP:**

**1. Encapsulation:** Bundling data and methods together, hiding internal state
\`\`\`java
public class BankAccount {
    private double balance;  // Hidden from outside

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }

    public double getBalance() {
        return balance;  // Controlled access
    }
}
\`\`\`

**Benefits:**
- Data hiding and security
- Flexibility to change implementation
- Better maintainability
- Controlled access to data

**2. Inheritance:** IS-A relationship, code reusability
\`\`\`java
public class Animal {
    protected String name;

    public void eat() {
        System.out.println(name + " is eating");
    }
}

public class Dog extends Animal {
    public void bark() {
        System.out.println(name + " is barking");
    }
}

Dog dog = new Dog();
dog.name = "Buddy";
dog.eat();   // Inherited from Animal
dog.bark();  // Dog's own method
\`\`\`

**Benefits:**
- Code reusability
- Method overriding
- Hierarchical classification
- Polymorphism support

**3. Polymorphism:** Same interface, different implementations
\`\`\`java
// Method Overloading (Compile-time polymorphism)
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }

    public double add(double a, double b) {
        return a + b;
    }

    public int add(int a, int b, int c) {
        return a + b + c;
    }
}

// Method Overriding (Runtime polymorphism)
public class Shape {
    public void draw() {
        System.out.println("Drawing shape");
    }
}

public class Circle extends Shape {
    @Override
    public void draw() {
        System.out.println("Drawing circle");
    }
}

public class Rectangle extends Shape {
    @Override
    public void draw() {
        System.out.println("Drawing rectangle");
    }
}

// Polymorphism in action
Shape shape1 = new Circle();
Shape shape2 = new Rectangle();
shape1.draw();  // "Drawing circle"
shape2.draw();  // "Drawing rectangle"
\`\`\`

**Benefits:**
- Flexibility and extensibility
- Code organization
- Interface implementation
- Dynamic method dispatch

**4. Abstraction:** Hiding complexity, showing only essentials
\`\`\`java
// Abstract class
public abstract class Payment {
    protected double amount;

    public abstract void processPayment();

    public void printReceipt() {
        System.out.println("Amount: $" + amount);
    }
}

public class CreditCardPayment extends Payment {
    @Override
    public void processPayment() {
        // Credit card specific logic
        System.out.println("Processing credit card payment");
    }
}

public class PayPalPayment extends Payment {
    @Override
    public void processPayment() {
        // PayPal specific logic
        System.out.println("Processing PayPal payment");
    }
}

// Using abstraction
Payment payment = new CreditCardPayment();
payment.processPayment();  // Don't care about internal details
\`\`\`

**Benefits:**
- Reduces complexity
- Improves code organization
- Easy to maintain and extend
- Security through hiding implementation`
    },
    {
      id: 2,
      category: 'Collections Framework',
      difficulty: 'Medium',
      question: 'Compare HashMap, HashTable, and ConcurrentHashMap. When would you use each?',
      answer: `**HashMap vs HashTable vs ConcurrentHashMap:**

**1. HashMap (Not thread-safe):**
\`\`\`java
Map<String, Integer> hashMap = new HashMap<>();
hashMap.put("One", 1);
hashMap.put("Two", 2);
hashMap.put(null, 3);      // Allows one null key
hashMap.put("Four", null); // Allows null values
\`\`\`

**Characteristics:**
- NOT synchronized (not thread-safe)
- Allows one null key and multiple null values
- Fast performance (no synchronization overhead)
- Fail-fast iterator (throws ConcurrentModificationException)
- Introduced in Java 1.2

**When to use:**
- Single-threaded applications
- When synchronization is not needed
- Better performance is priority

**2. HashTable (Legacy, thread-safe):**
\`\`\`java
Map<String, Integer> hashTable = new Hashtable<>();
hashTable.put("One", 1);
hashTable.put("Two", 2);
// hashTable.put(null, 3);   // NullPointerException
// hashTable.put("Four", null); // NullPointerException
\`\`\`

**Characteristics:**
- Synchronized (thread-safe) - locks entire table
- Does NOT allow null keys or values
- Slower performance due to synchronization
- Legacy class (since Java 1.0)
- All methods are synchronized

**When to use:**
- Legacy code maintenance
- Generally NOT recommended (use ConcurrentHashMap instead)

**3. ConcurrentHashMap (Modern, thread-safe):**
\`\`\`java
Map<String, Integer> concurrentMap = new ConcurrentHashMap<>();
concurrentMap.put("One", 1);
concurrentMap.put("Two", 2);
// concurrentMap.put(null, 3);   // NullPointerException
// concurrentMap.put("Four", null); // NullPointerException
\`\`\`

**Characteristics:**
- Thread-safe with better performance
- Segment-based locking (locks only portion of map)
- Does NOT allow null keys or values
- Fail-safe iterator (doesn't throw ConcurrentModificationException)
- Introduced in Java 1.5 (improved in Java 8)

**Internal Working:**
\`\`\`java
// Java 7 and earlier: Segment-based locking
// Map divided into 16 segments by default
// Each segment locked independently
// Allows 16 concurrent writes

// Java 8 and later: Node-based locking
// Uses CAS (Compare-And-Swap) operations
// Even better concurrency
// No segment concept
\`\`\`

**When to use:**
- Multi-threaded applications
- High concurrency requirements
- Better performance than synchronized HashMap or HashTable

**Performance Comparison:**

**Single-threaded:**
HashMap > ConcurrentHashMap > HashTable

**Multi-threaded:**
ConcurrentHashMap > HashTable > synchronized HashMap

**Example: Thread-Safe Operations:**
\`\`\`java
// HashMap - NOT thread-safe
Map<String, Integer> map = new HashMap<>();
// Need explicit synchronization
Map<String, Integer> syncMap = Collections.synchronizedMap(map);

// HashTable - Thread-safe but locks entire table
Map<String, Integer> table = new Hashtable<>();

// ConcurrentHashMap - Thread-safe with better concurrency
Map<String, Integer> concurrentMap = new ConcurrentHashMap<>();

// Atomic operations in ConcurrentHashMap
concurrentMap.putIfAbsent("key", 1);
concurrentMap.computeIfAbsent("key", k -> computeValue(k));
concurrentMap.merge("key", 1, Integer::sum);
\`\`\`

**Key Differences Table:**

| Feature | HashMap | HashTable | ConcurrentHashMap |
|---------|---------|-----------|-------------------|
| Thread-safe | No | Yes | Yes |
| Null key | Yes (one) | No | No |
| Null values | Yes | No | No |
| Performance | Fast | Slow | Good |
| Locking | None | Full table | Segment/Node |
| Iterator | Fail-fast | Fail-fast | Fail-safe |
| Since | Java 1.2 | Java 1.0 | Java 1.5 |

**Best Practice:**
- Single-threaded: Use HashMap
- Multi-threaded: Use ConcurrentHashMap
- Avoid: HashTable (legacy)`
    },
    {
      id: 3,
      category: 'Exception Handling',
      difficulty: 'Medium',
      question: 'Explain the exception hierarchy and difference between checked and unchecked exceptions',
      answer: `**Exception Hierarchy:**
\`\`\`
Object
  └── Throwable
       ├── Error (Unchecked)
       │    ├── OutOfMemoryError
       │    ├── StackOverflowError
       │    └── VirtualMachineError
       │
       └── Exception
            ├── RuntimeException (Unchecked)
            │    ├── NullPointerException
            │    ├── ArrayIndexOutOfBoundsException
            │    ├── ArithmeticException
            │    ├── IllegalArgumentException
            │    └── NumberFormatException
            │
            └── Checked Exceptions
                 ├── IOException
                 ├── SQLException
                 ├── FileNotFoundException
                 ├── ClassNotFoundException
                 └── InterruptedException
\`\`\`

**1. Checked Exceptions:**
- Checked at compile time
- Must be handled or declared
- Extend Exception (but not RuntimeException)
- Represent recoverable conditions

\`\`\`java
// Must handle with try-catch
public void readFile(String path) {
    try {
        FileReader reader = new FileReader(path);
        // Read file
    } catch (FileNotFoundException e) {
        System.out.println("File not found");
    }
}

// Or declare with throws
public void readFile(String path) throws FileNotFoundException {
    FileReader reader = new FileReader(path);
}
\`\`\`

**Common Checked Exceptions:**
- IOException - I/O operations fail
- FileNotFoundException - File doesn't exist
- SQLException - Database access error
- ClassNotFoundException - Class not found
- InterruptedException - Thread interrupted

**2. Unchecked Exceptions (RuntimeException):**
- NOT checked at compile time
- No need to handle or declare
- Extend RuntimeException
- Represent programming errors

\`\`\`java
// No need to catch
public int divide(int a, int b) {
    return a / b;  // May throw ArithmeticException
}

// Can catch if needed
public int safeDivide(int a, int b) {
    try {
        return a / b;
    } catch (ArithmeticException e) {
        return 0;
    }
}
\`\`\`

**Common Unchecked Exceptions:**
- NullPointerException - Null reference access
- ArrayIndexOutOfBoundsException - Invalid array index
- ArithmeticException - Divide by zero
- IllegalArgumentException - Invalid method argument
- NumberFormatException - Invalid number format

**3. Errors:**
- Serious problems (usually unrecoverable)
- Should NOT be caught
- Indicate JVM issues

\`\`\`java
// These are ERRORS (don't catch)
OutOfMemoryError
StackOverflowError
VirtualMachineError
\`\`\`

**Try-Catch-Finally:**
\`\`\`java
public void processFile(String path) {
    FileReader reader = null;
    try {
        reader = new FileReader(path);
        // Process file
    } catch (FileNotFoundException e) {
        System.out.println("File not found: " + e.getMessage());
    } catch (IOException e) {
        System.out.println("IO error: " + e.getMessage());
    } finally {
        // Always executes (even if exception occurs)
        if (reader != null) {
            try {
                reader.close();
            } catch (IOException e) {
                System.out.println("Error closing file");
            }
        }
    }
}
\`\`\`

**Try-with-Resources (Java 7+):**
\`\`\`java
// Automatic resource management
public void processFile(String path) {
    try (FileReader reader = new FileReader(path);
         BufferedReader br = new BufferedReader(reader)) {
        String line = br.readLine();
        // Process file
    } catch (IOException e) {
        System.out.println("Error: " + e.getMessage());
    }
    // Resources automatically closed
}
\`\`\`

**Custom Exceptions:**
\`\`\`java
// Checked custom exception
public class InsufficientBalanceException extends Exception {
    public InsufficientBalanceException(String message) {
        super(message);
    }
}

// Unchecked custom exception
public class InvalidAccountException extends RuntimeException {
    public InvalidAccountException(String message) {
        super(message);
    }
}

// Usage
public void withdraw(double amount) throws InsufficientBalanceException {
    if (amount > balance) {
        throw new InsufficientBalanceException("Not enough balance");
    }
    balance -= amount;
}
\`\`\`

**Best Practices:**
- Catch specific exceptions, not generic Exception
- Don't catch Throwable or Error
- Clean up resources in finally or use try-with-resources
- Create custom exceptions when appropriate
- Don't use exceptions for flow control
- Log exceptions properly
- Don't ignore exceptions (empty catch block)

**When to Use:**
- **Checked:** For recoverable conditions user can handle
- **Unchecked:** For programming errors that shouldn't occur`
    },
    {
      id: 4,
      category: 'Multithreading',
      difficulty: 'Hard',
      question: 'Explain thread synchronization, volatile keyword, and how to prevent deadlock',
      answer: `**Thread Synchronization:**

**1. Synchronized Method:**
\`\`\`java
public class Counter {
    private int count = 0;

    // Synchronized method - locks entire object
    public synchronized void increment() {
        count++;
    }

    public synchronized int getCount() {
        return count;
    }
}
\`\`\`

**2. Synchronized Block:**
\`\`\`java
public class Counter {
    private int count = 0;
    private Object lock = new Object();

    public void increment() {
        // Only lock critical section
        synchronized(lock) {
            count++;
        }
    }
}
\`\`\`

**3. Volatile Keyword:**
\`\`\`java
public class SharedData {
    // Without volatile - thread may cache value
    private boolean flag = false;

    // With volatile - always read from main memory
    private volatile boolean volatileFlag = false;

    // Thread 1
    public void setFlag() {
        volatileFlag = true;  // Immediately visible to other threads
    }

    // Thread 2
    public void checkFlag() {
        while (!volatileFlag) {  // Will see updated value
            // Wait
        }
        System.out.println("Flag is true!");
    }
}
\`\`\`

**Volatile vs Synchronized:**

**Volatile:**
- Ensures visibility across threads
- No locking/atomicity
- Lighter weight
- Good for flags, status variables

**Synchronized:**
- Ensures both visibility AND atomicity
- Provides mutual exclusion
- Heavier weight
- Good for critical sections

**Example: Race Condition:**
\`\`\`java
public class BankAccount {
    private int balance = 1000;

    // NOT thread-safe
    public void withdraw(int amount) {
        if (balance >= amount) {
            // Thread can be interrupted here!
            balance -= amount;
        }
    }

    // Thread-safe
    public synchronized void safeWithdraw(int amount) {
        if (balance >= amount) {
            balance -= amount;
        }
    }
}
\`\`\`

**Deadlock:**
Two or more threads waiting for each other indefinitely

\`\`\`java
// DEADLOCK EXAMPLE
public class DeadlockExample {
    private Object lock1 = new Object();
    private Object lock2 = new Object();

    public void method1() {
        synchronized(lock1) {
            System.out.println("Thread 1: Holding lock1");
            Thread.sleep(100);

            synchronized(lock2) {  // Waiting for lock2
                System.out.println("Thread 1: Holding lock1 and lock2");
            }
        }
    }

    public void method2() {
        synchronized(lock2) {
            System.out.println("Thread 2: Holding lock2");

            synchronized(lock1) {  // Waiting for lock1
                System.out.println("Thread 2: Holding lock1 and lock2");
            }
        }
    }
}
\`\`\`

**Preventing Deadlock:**

**1. Lock Ordering:**
\`\`\`java
// Always acquire locks in same order
public void method1() {
    synchronized(lock1) {  // Always lock1 first
        synchronized(lock2) {  // Then lock2
            // Critical section
        }
    }
}

public void method2() {
    synchronized(lock1) {  // Same order: lock1 first
        synchronized(lock2) {  // Then lock2
            // Critical section
        }
    }
}
\`\`\`

**2. Lock Timeout:**
\`\`\`java
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class TimeoutExample {
    private Lock lock1 = new ReentrantLock();
    private Lock lock2 = new ReentrantLock();

    public void method() throws InterruptedException {
        while (true) {
            if (lock1.tryLock(1000, TimeUnit.MILLISECONDS)) {
                try {
                    if (lock2.tryLock(1000, TimeUnit.MILLISECONDS)) {
                        try {
                            // Both locks acquired
                            return;
                        } finally {
                            lock2.unlock();
                        }
                    }
                } finally {
                    lock1.unlock();
                }
            }
            // Retry after releasing locks
        }
    }
}
\`\`\`

**3. Deadlock Detection:**
\`\`\`java
// Use ThreadMXBean to detect deadlocks
import java.lang.management.*;

ThreadMXBean threadMXBean = ManagementFactory.getThreadMXBean();
long[] deadlockedThreads = threadMXBean.findDeadlockedThreads();

if (deadlockedThreads != null) {
    System.out.println("Deadlock detected!");
    ThreadInfo[] threadInfos = threadMXBean.getThreadInfo(deadlockedThreads);
    for (ThreadInfo threadInfo : threadInfos) {
        System.out.println(threadInfo.getThreadName());
    }
}
\`\`\`

**Modern Concurrency Utilities:**
\`\`\`java
import java.util.concurrent.*;

// 1. ReentrantLock - More flexible than synchronized
Lock lock = new ReentrantLock();
lock.lock();
try {
    // Critical section
} finally {
    lock.unlock();
}

// 2. ReadWriteLock - Multiple readers, single writer
ReadWriteLock rwLock = new ReentrantReadWriteLock();
rwLock.readLock().lock();   // Multiple threads can read
rwLock.writeLock().lock();  // Exclusive write access

// 3. Semaphore - Limit concurrent access
Semaphore semaphore = new Semaphore(3);  // Max 3 threads
semaphore.acquire();
try {
    // Access resource
} finally {
    semaphore.release();
}

// 4. CountDownLatch - Wait for multiple threads
CountDownLatch latch = new CountDownLatch(3);
latch.countDown();  // Decrement count
latch.await();      // Wait until count reaches 0

// 5. CyclicBarrier - Synchronization point for threads
CyclicBarrier barrier = new CyclicBarrier(3);
barrier.await();  // Wait for all threads to reach barrier
\`\`\`

**Best Practices:**
- Minimize synchronized block scope
- Use concurrent collections (ConcurrentHashMap, CopyOnWriteArrayList)
- Prefer java.util.concurrent utilities over wait/notify
- Always acquire locks in same order
- Use try-finally with locks
- Avoid nested locks when possible
- Use volatile for simple flags
- Test with multiple threads`
    },
    {
      id: 5,
      category: 'JVM Internals',
      difficulty: 'Hard',
      question: 'Explain JVM memory structure, garbage collection, and memory leaks in Java',
      answer: `**JVM Memory Structure:**

**1. Heap Memory (Shared):**
\`\`\`
Heap
├── Young Generation
│   ├── Eden Space (new objects)
│   ├── Survivor Space 0 (S0)
│   └── Survivor Space 1 (S1)
│
└── Old Generation (Tenured)
    └── Long-lived objects
\`\`\`

**Characteristics:**
- Stores all objects and instance variables
- Shared among all threads
- Garbage collected
- Size: -Xms (initial), -Xmx (maximum)

**2. Stack Memory (Per Thread):**
\`\`\`java
public void method1() {
    int x = 10;        // Stored in stack
    String name = "John";  // Reference in stack, object in heap
    method2(x);
}
\`\`\`

**Characteristics:**
- Stores local variables and method calls
- One stack per thread
- LIFO (Last In First Out)
- Automatically cleaned when method returns
- Size: -Xss

**3. Method Area (Metaspace in Java 8+):**
- Class metadata, static variables
- Constant pool
- Method bytecode
- Previously called PermGen (before Java 8)

**4. PC Register:**
- Current instruction address
- One per thread

**5. Native Method Stack:**
- Native method information
- JNI calls

**Garbage Collection:**

**How it works:**
\`\`\`
1. Mark: Identify live objects (reachable from roots)
2. Sweep: Remove dead objects
3. Compact: Defragment memory (optional)
\`\`\`

**GC Roots:**
- Local variables in stack
- Active threads
- Static variables
- JNI references

**Generational GC:**

**Young Generation GC (Minor GC):**
\`\`\`
1. New objects → Eden Space
2. Eden full → Minor GC
3. Survivors → S0 or S1
4. Multiple GC survivors → Old Generation
\`\`\`

**Old Generation GC (Major GC / Full GC):**
- Triggered when Old Gen fills up
- Slower than Minor GC
- Stop-the-world event

**GC Algorithms:**

**1. Serial GC:**
\`\`\`bash
-XX:+UseSerialGC
# Single thread
# Good for small apps
\`\`\`

**2. Parallel GC (Default):**
\`\`\`bash
-XX:+UseParallelGC
# Multiple threads for Young Gen
# Good for throughput
\`\`\`

**3. CMS (Concurrent Mark Sweep):**
\`\`\`bash
-XX:+UseConcMarkSweepGC
# Low pause times
# Deprecated in Java 14
\`\`\`

**4. G1GC (Garbage First):**
\`\`\`bash
-XX:+UseG1GC
# Default in Java 9+
# Balanced throughput and latency
# Divides heap into regions
\`\`\`

**5. ZGC (Java 11+):**
\`\`\`bash
-XX:+UseZGC
# Ultra-low pause times (<10ms)
# Scalable (TB heaps)
\`\`\`

**Memory Leaks in Java:**

**What is a Memory Leak:**
- Objects no longer needed but still referenced
- GC cannot collect them
- Heap memory grows over time
- Eventually OutOfMemoryError

**Common Causes:**

**1. Unclosed Resources:**
\`\`\`java
// BAD: Resource not closed
public void readFile(String path) {
    FileInputStream fis = new FileInputStream(path);
    // File handle leaked if exception occurs
}

// GOOD: Try-with-resources
public void readFile(String path) {
    try (FileInputStream fis = new FileInputStream(path)) {
        // Auto-closed
    }
}
\`\`\`

**2. Static Collections:**
\`\`\`java
// BAD: Static collection grows indefinitely
public class Cache {
    private static Map<String, Object> cache = new HashMap<>();

    public void add(String key, Object value) {
        cache.put(key, value);  // Never removed!
    }
}

// GOOD: Use WeakHashMap or bounded cache
public class Cache {
    private static Map<String, Object> cache = new WeakHashMap<>();
    // Or use LRU cache with size limit
}
\`\`\`

**3. Listeners Not Removed:**
\`\`\`java
// BAD: Listener not removed
public class UI {
    private List<EventListener> listeners = new ArrayList<>();

    public void addListener(EventListener listener) {
        listeners.add(listener);
    }
    // No removeListener() method!
}

// GOOD: Provide removal method
public void removeListener(EventListener listener) {
    listeners.remove(listener);
}
\`\`\`

**4. Thread Locals:**
\`\`\`java
// BAD: ThreadLocal not cleaned
public class ThreadLocalLeak {
    private static ThreadLocal<HeavyObject> threadLocal =
        new ThreadLocal<>();

    public void doWork() {
        threadLocal.set(new HeavyObject());
        // Never removed!
    }
}

// GOOD: Clean up ThreadLocal
public void doWork() {
    try {
        threadLocal.set(new HeavyObject());
        // Use object
    } finally {
        threadLocal.remove();  // Clean up
    }
}
\`\`\`

**5. Inner Classes Holding References:**
\`\`\`java
// BAD: Non-static inner class holds outer reference
public class Outer {
    private byte[] data = new byte[1000000];

    public class Inner {
        public void doSomething() {
            // Implicitly holds reference to Outer
        }
    }
}

// GOOD: Use static inner class if possible
public static class Inner {
    // No implicit reference to Outer
}
\`\`\`

**Detecting Memory Leaks:**

**1. Heap Dump Analysis:**
\`\`\`bash
# Generate heap dump
jmap -dump:live,format=b,file=heap.bin <pid>

# Analyze with tools:
# - Eclipse MAT (Memory Analyzer Tool)
# - VisualVM
# - JProfiler
\`\`\`

**2. JVM Monitoring:**
\`\`\`bash
# Monitor memory usage
jstat -gc <pid> 1000  # Every 1 second

# GC logs
-XX:+PrintGCDetails
-XX:+PrintGCDateStamps
-Xloggc:gc.log
\`\`\`

**3. Programmatic Monitoring:**
\`\`\`java
MemoryMXBean memoryBean = ManagementFactory.getMemoryMXBean();
MemoryUsage heapUsage = memoryBean.getHeapMemoryUsage();

long used = heapUsage.getUsed();
long max = heapUsage.getMax();
double percentage = (used * 100.0) / max;

System.out.println("Heap usage: " + percentage + "%");
\`\`\`

**Best Practices:**
- Always close resources (use try-with-resources)
- Remove listeners when done
- Clean up ThreadLocal variables
- Use weak references for caches
- Monitor memory usage in production
- Analyze heap dumps for suspicious objects
- Limit size of static collections
- Prefer static inner classes
- Use profiling tools regularly`
    },
    {
      id: 6,
      category: 'String Manipulation',
      difficulty: 'Medium',
      question: 'Explain String immutability, String pool, and when to use String vs StringBuilder vs StringBuffer',
      answer: `**String Immutability:**

**What is Immutability:**
- Once created, String value cannot be changed
- Any modification creates new String object
- Original String remains unchanged

\`\`\`java
String str = "Hello";
str.concat(" World");  // Creates new String, str unchanged
System.out.println(str);  // "Hello" (not "Hello World")

String str2 = str.concat(" World");
System.out.println(str2);  // "Hello World" (new object)
\`\`\`

**Why Immutable:**
- Thread safety (multiple threads can share)
- String Pool optimization
- Security (passwords, URLs, file paths)
- Hashcode caching (better HashMap performance)
- No need for defensive copying

**String Pool (String Intern Pool):**

**How it works:**
\`\`\`java
// String literals go to pool
String s1 = "Hello";
String s2 = "Hello";
System.out.println(s1 == s2);  // true (same reference)

// new keyword creates new object in heap
String s3 = new String("Hello");
String s4 = new String("Hello");
System.out.println(s3 == s4);  // false (different objects)

// equals() compares content
System.out.println(s1.equals(s3));  // true (same content)

// intern() adds to pool
String s5 = s3.intern();
System.out.println(s1 == s5);  // true (now same reference)
\`\`\`

**String Pool Memory:**
\`\`\`
Heap Memory
├── String Pool (Interned Strings)
│   └── "Hello" (single copy)
│
└── Regular Heap Objects
    ├── new String("Hello") - Object 1
    └── new String("Hello") - Object 2
\`\`\`

**Performance Issue with String Concatenation:**
\`\`\`java
// BAD: Creates many intermediate String objects
String result = "";
for (int i = 0; i < 1000; i++) {
    result += i;  // Creates new String each iteration!
}
// Creates 1000 String objects in memory
\`\`\`

**String vs StringBuilder vs StringBuffer:**

**1. String (Immutable):**
\`\`\`java
String str = "Hello";
str = str + " World";  // New object created
\`\`\`

**Characteristics:**
- Immutable (cannot be changed)
- Thread-safe (due to immutability)
- Slower for concatenation
- Use when: Value won't change

**2. StringBuilder (Mutable, Not synchronized):**
\`\`\`java
StringBuilder sb = new StringBuilder("Hello");
sb.append(" World");  // Same object modified
String result = sb.toString();
\`\`\`

**Characteristics:**
- Mutable (can be changed)
- NOT thread-safe
- Faster than String for concatenation
- Use when: Single thread, many modifications

**3. StringBuffer (Mutable, Synchronized):**
\`\`\`java
StringBuffer sbf = new StringBuffer("Hello");
sbf.append(" World");  // Same object modified (synchronized)
String result = sbf.toString();
\`\`\`

**Characteristics:**
- Mutable (can be changed)
- Thread-safe (synchronized)
- Slower than StringBuilder (synchronization overhead)
- Use when: Multiple threads, many modifications

**Performance Comparison:**
\`\`\`java
// String concatenation (SLOW)
long start = System.currentTimeMillis();
String str = "";
for (int i = 0; i < 100000; i++) {
    str += i;
}
long end = System.currentTimeMillis();
System.out.println("String: " + (end - start) + "ms");  // ~5000ms

// StringBuilder (FAST)
start = System.currentTimeMillis();
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 100000; i++) {
    sb.append(i);
}
String result = sb.toString();
end = System.currentTimeMillis();
System.out.println("StringBuilder: " + (end - start) + "ms");  // ~10ms

// StringBuffer (MEDIUM)
start = System.currentTimeMillis();
StringBuffer sbf = new StringBuffer();
for (int i = 0; i < 100000; i++) {
    sbf.append(i);
}
result = sbf.toString();
end = System.currentTimeMillis();
System.out.println("StringBuffer: " + (end - start) + "ms");  // ~15ms
\`\`\`

**Common StringBuilder/StringBuffer Methods:**
\`\`\`java
StringBuilder sb = new StringBuilder("Hello");

sb.append(" World");        // "Hello World"
sb.insert(5, ",");          // "Hello, World"
sb.delete(5, 6);            // "Hello World"
sb.reverse();               // "dlroW olleH"
sb.replace(0, 5, "Hi");     // "Hi olleH"
sb.charAt(0);               // 'H'
sb.length();                // Length
sb.capacity();              // Current capacity
sb.toString();              // Convert to String
\`\`\`

**Capacity Management:**
\`\`\`java
// Default capacity: 16
StringBuilder sb1 = new StringBuilder();
System.out.println(sb1.capacity());  // 16

// Custom capacity
StringBuilder sb2 = new StringBuilder(100);
System.out.println(sb2.capacity());  // 100

// From String: length + 16
StringBuilder sb3 = new StringBuilder("Hello");
System.out.println(sb3.capacity());  // 21 (5 + 16)

// Auto-expansion: (oldCapacity * 2) + 2
\`\`\`

**When to Use:**

**String:**
\`\`\`java
// Few concatenations
String fullName = firstName + " " + lastName;

// Constants
public static final String API_URL = "https://api.example.com";

// Method parameters/returns
public String getName() {
    return name;
}
\`\`\`

**StringBuilder:**
\`\`\`java
// Loop concatenations (single thread)
StringBuilder html = new StringBuilder();
for (Item item : items) {
    html.append("<li>").append(item.getName()).append("</li>");
}

// Complex string building
StringBuilder query = new StringBuilder()
    .append("SELECT * FROM users WHERE ")
    .append("age > ").append(minAge)
    .append(" AND city = '").append(city).append("'");
\`\`\`

**StringBuffer:**
\`\`\`java
// Multi-threaded string building
public class SharedBuilder {
    private StringBuffer buffer = new StringBuffer();

    public synchronized void append(String text) {
        buffer.append(text);  // Thread-safe
    }
}
\`\`\`

**Comparison Table:**

| Feature | String | StringBuilder | StringBuffer |
|---------|--------|---------------|--------------|
| Mutable | No | Yes | Yes |
| Thread-safe | Yes | No | Yes |
| Performance | Slow | Fast | Medium |
| Use case | Immutable | Single thread | Multi-thread |
| Since | Java 1.0 | Java 1.5 | Java 1.0 |

**Best Practices:**
- Use String for simple, unchanging text
- Use StringBuilder for single-threaded concatenation
- Use StringBuffer only when thread safety needed
- Avoid += in loops with String
- Specify initial capacity for large builds
- Use String.join() for joining collections (Java 8+)`
    },
    {
      id: 7,
      category: 'Design Patterns',
      difficulty: 'Hard',
      question: 'Implement the Singleton pattern with thread-safety and explain different approaches',
      answer: `**Singleton Pattern:**
Ensures only one instance of a class exists and provides global access point

**1. Eager Initialization (Thread-safe):**
\`\`\`java
public class Singleton {
    // Instance created at class loading time
    private static final Singleton INSTANCE = new Singleton();

    private Singleton() {
        // Private constructor prevents instantiation
    }

    public static Singleton getInstance() {
        return INSTANCE;
    }
}
\`\`\`

**Pros:**
- Simple and thread-safe
- No synchronization overhead

**Cons:**
- Instance created even if not used (waste if expensive)
- No exception handling

**2. Lazy Initialization (NOT thread-safe):**
\`\`\`java
public class Singleton {
    private static Singleton instance;

    private Singleton() {}

    // NOT thread-safe!
    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();  // Multiple threads can create instances
        }
        return instance;
    }
}
\`\`\`

**Problem:**
Two threads can create multiple instances simultaneously

**3. Synchronized Method (Thread-safe but slow):**
\`\`\`java
public class Singleton {
    private static Singleton instance;

    private Singleton() {}

    // Thread-safe but slow (locks every time)
    public static synchronized Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}
\`\`\`

**Pros:**
- Thread-safe
- Lazy initialization

**Cons:**
- Synchronized on every call (performance hit)
- Unnecessary locking after first creation

**4. Double-Checked Locking (Efficient and thread-safe):**
\`\`\`java
public class Singleton {
    // volatile ensures visibility across threads
    private static volatile Singleton instance;

    private Singleton() {}

    public static Singleton getInstance() {
        // First check (no locking)
        if (instance == null) {
            synchronized (Singleton.class) {
                // Second check (with locking)
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}
\`\`\`

**Why volatile needed:**
- Prevents instruction reordering
- Ensures visibility of changes across threads
- Without volatile, partially constructed object may be visible

**How it works:**
\`\`\`
Thread 1:
1. Checks instance == null (true)
2. Acquires lock
3. Checks again (still null)
4. Creates instance
5. Releases lock

Thread 2 (later):
1. Checks instance == null (false)
2. Returns instance (no locking needed)
\`\`\`

**5. Bill Pugh Singleton (Best approach):**
\`\`\`java
public class Singleton {

    private Singleton() {}

    // Inner static class - loaded only when getInstance() is called
    private static class SingletonHelper {
        private static final Singleton INSTANCE = new Singleton();
    }

    public static Singleton getInstance() {
        return SingletonHelper.INSTANCE;
    }
}
\`\`\`

**Pros:**
- Lazy initialization
- Thread-safe (class loading is thread-safe)
- No synchronization overhead
- Simple and elegant

**How it works:**
- SingletonHelper not loaded until getInstance() called
- JVM guarantees thread-safe class loading
- No explicit synchronization needed

**6. Enum Singleton (Most robust):**
\`\`\`java
public enum Singleton {
    INSTANCE;

    private int value;

    public void doSomething() {
        System.out.println("Doing something");
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }
}

// Usage
Singleton.INSTANCE.doSomething();
Singleton.INSTANCE.setValue(42);
\`\`\`

**Pros:**
- Thread-safe
- Serialization-safe
- Reflection-proof
- Concise

**Cons:**
- Cannot extend class (enum limitation)
- Less flexible

**Breaking Singleton and Prevention:**

**1. Reflection Attack:**
\`\`\`java
// Attack: Create instance using reflection
Constructor<Singleton> constructor = Singleton.class.getDeclaredConstructor();
constructor.setAccessible(true);
Singleton instance1 = constructor.newInstance();
Singleton instance2 = constructor.newInstance();
// Two different instances!

// Prevention: Throw exception in constructor
private Singleton() {
    if (instance != null) {
        throw new IllegalStateException("Already initialized");
    }
}
\`\`\`

**2. Serialization Attack:**
\`\`\`java
// Attack: Deserialize creates new instance
ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream("singleton.ser"));
out.writeObject(Singleton.getInstance());

ObjectInputStream in = new ObjectInputStream(new FileInputStream("singleton.ser"));
Singleton instance = (Singleton) in.readObject();
// New instance created!

// Prevention: Implement readResolve()
public class Singleton implements Serializable {
    // ... singleton implementation

    // Prevent new instance during deserialization
    protected Object readResolve() {
        return getInstance();
    }
}
\`\`\`

**3. Cloning Attack:**
\`\`\`java
// Prevention: Override clone()
@Override
protected Object clone() throws CloneNotSupportedException {
    throw new CloneNotSupportedException("Cloning not allowed");
}
\`\`\`

**Comparison:**

| Approach | Thread-safe | Lazy | Performance | Complexity |
|----------|-------------|------|-------------|------------|
| Eager | Yes | No | Good | Low |
| Lazy | No | Yes | Good | Low |
| Synchronized | Yes | Yes | Poor | Low |
| Double-checked | Yes | Yes | Good | Medium |
| Bill Pugh | Yes | Yes | Excellent | Low |
| Enum | Yes | No | Excellent | Low |

**Best Practices:**
- Use Bill Pugh for regular singletons
- Use Enum for maximum safety
- Make constructor private
- Consider whether you truly need singleton
- Document singleton behavior
- Be aware of serialization/reflection issues

**When NOT to use Singleton:**
- When you need multiple instances
- In unit testing (hard to mock)
- When it creates tight coupling
- For dependency injection frameworks (they handle scope)`
    },
    {
      id: 8,
      category: 'Performance',
      difficulty: 'Hard',
      question: 'How do you optimize Java application performance? Explain key techniques and tools',
      answer: `**Performance Optimization Techniques:**

**1. Algorithm and Data Structure Selection:**
\`\`\`java
// BAD: O(n) lookup for each element = O(n²)
List<String> list = new ArrayList<>();
for (String item : items) {
    if (list.contains(item)) {  // O(n) for each check
        // Process
    }
}

// GOOD: O(1) lookup = O(n)
Set<String> set = new HashSet<>(list);
for (String item : items) {
    if (set.contains(item)) {  // O(1) for each check
        // Process
    }
}
\`\`\`

**Choose right collection:**
- ArrayList: Fast random access, slow insert/delete
- LinkedList: Fast insert/delete, slow random access
- HashSet: Fast lookup, no duplicates
- HashMap: Fast key-value lookup
- TreeMap: Sorted keys, O(log n) operations

**2. String Optimization:**
\`\`\`java
// BAD: Multiple String objects created
String result = "";
for (int i = 0; i < 10000; i++) {
    result += i;  // Creates new String each time
}

// GOOD: Single StringBuilder object
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 10000; i++) {
    sb.append(i);
}
String result = sb.toString();
\`\`\`

**3. Object Creation Minimization:**
\`\`\`java
// BAD: Creates object in loop
for (int i = 0; i < 1000000; i++) {
    String temp = new String("temp");  // Unnecessary object creation
    // Process
}

// GOOD: Reuse or use literals
String temp = "temp";  // String pool
for (int i = 0; i < 1000000; i++) {
    // Use temp
}

// GOOD: Object pooling for expensive objects
ObjectPool<ExpensiveObject> pool = new ObjectPool<>();
ExpensiveObject obj = pool.borrowObject();
try {
    // Use object
} finally {
    pool.returnObject(obj);
}
\`\`\`

**4. Lazy Initialization:**
\`\`\`java
public class ExpensiveResource {
    private HeavyObject heavyObject;

    // BAD: Always initialize (even if not used)
    public ExpensiveResource() {
        heavyObject = new HeavyObject();  // Expensive!
    }

    // GOOD: Initialize only when needed
    public HeavyObject getHeavyObject() {
        if (heavyObject == null) {
            heavyObject = new HeavyObject();
        }
        return heavyObject;
    }
}
\`\`\`

**5. Caching:**
\`\`\`java
// Cache expensive computations
public class FibonacciCalculator {
    private Map<Integer, Long> cache = new HashMap<>();

    public long fibonacci(int n) {
        if (n <= 1) return n;

        // Check cache first
        if (cache.containsKey(n)) {
            return cache.get(n);
        }

        // Compute and cache
        long result = fibonacci(n - 1) + fibonacci(n - 2);
        cache.put(n, result);
        return result;
    }
}

// Use LRU cache for bounded memory
import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;

Cache<String, Object> cache = CacheBuilder.newBuilder()
    .maximumSize(1000)
    .expireAfterWrite(10, TimeUnit.MINUTES)
    .build();
\`\`\`

**6. Database Optimization:**
\`\`\`java
// BAD: N+1 query problem
List<Order> orders = orderRepository.findAll();
for (Order order : orders) {
    Customer customer = customerRepository.findById(order.getCustomerId());
    // One query per order!
}

// GOOD: Join fetch or batch query
@Query("SELECT o FROM Order o JOIN FETCH o.customer")
List<Order> findAllWithCustomer();

// Use connection pooling
HikariConfig config = new HikariConfig();
config.setMaximumPoolSize(10);
config.setMinimumIdle(5);
HikariDataSource ds = new HikariDataSource(config);

// Use batch operations
PreparedStatement ps = conn.prepareStatement("INSERT INTO users VALUES (?, ?)");
for (User user : users) {
    ps.setString(1, user.getName());
    ps.setInt(2, user.getAge());
    ps.addBatch();
}
ps.executeBatch();  // Execute all at once
\`\`\`

**7. Stream API Optimization:**
\`\`\`java
// Use parallel streams for large datasets (CPU-bound)
long count = list.parallelStream()
    .filter(s -> s.length() > 5)
    .count();

// But be careful: parallel has overhead
// Only use for large datasets or expensive operations

// Sequential for small datasets
list.stream()  // Better for < 10000 elements
    .filter(s -> s.length() > 5)
    .collect(Collectors.toList());
\`\`\`

**8. JVM Tuning:**
\`\`\`bash
# Heap size
-Xms2g -Xmx4g  # Initial 2GB, Max 4GB

# GC selection
-XX:+UseG1GC              # G1 (default Java 9+)
-XX:+UseZGC               # ZGC (low latency)
-XX:+UseShenandoahGC      # Shenandoah (low pause)

# GC logging
-Xlog:gc*:file=gc.log

# String deduplication (saves memory)
-XX:+UseStringDeduplication

# Optimize for throughput
-XX:+UseParallelGC
-XX:ParallelGCThreads=4

# Optimize for latency
-XX:MaxGCPauseMillis=200
\`\`\`

**9. Profiling and Monitoring:**

**JVM Monitoring Tools:**
\`\`\`bash
# Memory usage
jstat -gc <pid> 1000  # Every 1 second

# Thread dump
jstack <pid> > threads.txt

# Heap dump
jmap -dump:live,format=b,file=heap.bin <pid>

# Memory histogram
jmap -histo <pid>

# JVM flags
jinfo -flags <pid>
\`\`\`

**Profiling Tools:**
- VisualVM: Free, basic profiling
- JProfiler: Commercial, comprehensive
- YourKit: Commercial, excellent
- Async Profiler: Low overhead sampling
- JMH: Microbenchmarking framework

**10. Code Profiling Example:**
\`\`\`java
// Use JMH for microbenchmarking
@Benchmark
@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.MICROSECONDS)
public void testMethod() {
    // Code to benchmark
}

// Use try-finally for timing
long start = System.nanoTime();
try {
    // Code to measure
} finally {
    long duration = System.nanoTime() - start;
    logger.info("Operation took: " + duration + " ns");
}
\`\`\`

**11. Lock Optimization:**
\`\`\`java
// BAD: Synchronized entire method
public synchronized void process() {
    doNonCriticalWork();
    doCriticalWork();
    doMoreNonCriticalWork();
}

// GOOD: Minimize synchronized block
public void process() {
    doNonCriticalWork();

    synchronized(this) {
        doCriticalWork();  // Only lock critical section
    }

    doMoreNonCriticalWork();
}

// BETTER: Use concurrent collections
ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();
// No external synchronization needed
\`\`\`

**12. I/O Optimization:**
\`\`\`java
// Use buffered I/O
BufferedReader reader = new BufferedReader(
    new FileReader("file.txt"),
    8192  // 8KB buffer
);

// Use NIO for large files
Path path = Paths.get("largefile.txt");
List<String> lines = Files.readAllLines(path);

// Stream large files
try (Stream<String> stream = Files.lines(path)) {
    stream.forEach(System.out::println);
}
\`\`\`

**Performance Checklist:**
✓ Choose appropriate data structures
✓ Minimize object creation
✓ Use StringBuilder for string concatenation
✓ Implement caching where appropriate
✓ Optimize database queries (indexes, batch operations)
✓ Use connection pooling
✓ Profile before optimizing (measure, don't guess)
✓ Tune JVM parameters
✓ Minimize synchronized blocks
✓ Use concurrent collections
✓ Lazy initialization for expensive objects
✓ Consider parallel streams for large datasets
✓ Monitor GC behavior
✓ Use try-with-resources

**Premature Optimization Warning:**
"Premature optimization is the root of all evil" - Donald Knuth

**Process:**
1. Write correct code first
2. Measure performance (profiling)
3. Identify bottlenecks
4. Optimize critical paths
5. Measure again
6. Repeat

**Key Metrics to Monitor:**
- Response time
- Throughput (requests/second)
- Memory usage
- GC pause times
- CPU utilization
- Thread count
- Database query times`
    },
    {
      id: 9,
      category: 'Reflection API',
      difficulty: 'Hard',
      question: 'Explain Java Reflection API with real-world use cases. When should and shouldn\'t you use it?',
      answer: `**Java Reflection API:**

**What is Reflection:**
Reflection allows runtime inspection and modification of classes, methods, fields, and constructors. It enables programs to examine or modify their own structure and behavior at runtime.

**Core Reflection Classes:**
\`\`\`java
import java.lang.reflect.*;

// Main classes:
// - Class<?> - Represents classes and interfaces
// - Method - Represents methods
// - Field - Represents fields
// - Constructor - Represents constructors
// - Modifier - Decode access modifiers
\`\`\`

**1. Inspecting Classes:**
\`\`\`java
// Get Class object
Class<?> clazz = String.class;
Class<?> clazz2 = "hello".getClass();
Class<?> clazz3 = Class.forName("java.lang.String");

// Get class information
String className = clazz.getName();           // "java.lang.String"
String simpleName = clazz.getSimpleName();    // "String"
Package pkg = clazz.getPackage();             // java.lang
Class<?> superclass = clazz.getSuperclass();  // Object.class
Class<?>[] interfaces = clazz.getInterfaces();
int modifiers = clazz.getModifiers();

System.out.println(Modifier.isPublic(modifiers));    // true
System.out.println(Modifier.isFinal(modifiers));     // true
System.out.println(Modifier.isAbstract(modifiers));  // false
\`\`\`

**2. Accessing Fields:**
\`\`\`java
public class User {
    private String name;
    public int age;

    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

// Accessing public fields
Class<?> clazz = User.class;
Field ageField = clazz.getField("age");  // Only public
System.out.println(ageField.getName());  // "age"
System.out.println(ageField.getType());  // int

// Accessing private fields
Field nameField = clazz.getDeclaredField("name");
nameField.setAccessible(true);  // Bypass access control

User user = new User("John", 30);
String name = (String) nameField.get(user);  // "John"
nameField.set(user, "Jane");                 // Change private field!

// Get all fields
Field[] publicFields = clazz.getFields();           // Public only
Field[] allFields = clazz.getDeclaredFields();      // All fields
\`\`\`

**3. Invoking Methods:**
\`\`\`java
public class Calculator {
    private int add(int a, int b) {
        return a + b;
    }

    public int multiply(int a, int b) {
        return a * b;
    }
}

// Invoke public method
Class<?> clazz = Calculator.class;
Calculator calc = new Calculator();

Method multiplyMethod = clazz.getMethod("multiply", int.class, int.class);
Object result = multiplyMethod.invoke(calc, 5, 3);
System.out.println(result);  // 15

// Invoke private method
Method addMethod = clazz.getDeclaredMethod("add", int.class, int.class);
addMethod.setAccessible(true);  // Bypass access control
Object result2 = addMethod.invoke(calc, 5, 3);
System.out.println(result2);  // 8

// Get method information
String methodName = addMethod.getName();           // "add"
Class<?> returnType = addMethod.getReturnType();   // int
Class<?>[] paramTypes = addMethod.getParameterTypes();  // [int, int]
int modifiers = addMethod.getModifiers();
\`\`\`

**4. Creating Instances:**
\`\`\`java
// Using no-arg constructor
Class<?> clazz = ArrayList.class;
Object obj = clazz.newInstance();  // Deprecated in Java 9+
Object obj2 = clazz.getDeclaredConstructor().newInstance();  // Better way

// Using parameterized constructor
Class<?> userClass = User.class;
Constructor<?> constructor = userClass.getConstructor(String.class, int.class);
User user = (User) constructor.newInstance("John", 30);

// Get all constructors
Constructor<?>[] constructors = clazz.getDeclaredConstructors();
\`\`\`

**5. Working with Arrays:**
\`\`\`java
// Create array dynamically
Object array = Array.newInstance(String.class, 5);
Array.set(array, 0, "Hello");
Array.set(array, 1, "World");
String value = (String) Array.get(array, 0);  // "Hello"
int length = Array.getLength(array);  // 5

// Multi-dimensional array
Object matrix = Array.newInstance(int.class, 3, 3);
\`\`\`

**Real-World Use Cases:**

**1. Dependency Injection Frameworks (Spring, Guice):**
\`\`\`java
// Spring uses reflection for @Autowired
@Autowired
private UserService userService;

// Spring internally does:
Field field = clazz.getDeclaredField("userService");
field.setAccessible(true);
field.set(bean, userServiceInstance);
\`\`\`

**2. Serialization/Deserialization (Jackson, Gson):**
\`\`\`java
// JSON to Object without calling constructor
String json = "{\\"name\\":\\"John\\",\\"age\\":30}";
User user = objectMapper.readValue(json, User.class);

// Internally uses reflection:
Constructor<?> constructor = clazz.getDeclaredConstructor();
constructor.setAccessible(true);
Object obj = constructor.newInstance();

for (Field field : clazz.getDeclaredFields()) {
    field.setAccessible(true);
    field.set(obj, jsonValue);
}
\`\`\`

**3. ORM Frameworks (Hibernate, JPA):**
\`\`\`java
@Entity
public class User {
    @Id
    private Long id;
    private String name;
}

// Hibernate uses reflection to map DB columns to fields
Field[] fields = clazz.getDeclaredFields();
for (Field field : fields) {
    if (field.isAnnotationPresent(Id.class)) {
        // Set primary key
    }
}
\`\`\`

**4. Testing Frameworks (JUnit, Mockito):**
\`\`\`java
// JUnit finds and runs @Test methods
for (Method method : clazz.getDeclaredMethods()) {
    if (method.isAnnotationPresent(Test.class)) {
        method.invoke(testInstance);
    }
}

// Mockito injects mocks into private fields
@InjectMocks
private UserService userService;
\`\`\`

**5. Generic Type Inspection:**
\`\`\`java
public class GenericInspector<T> {
    public void inspect() {
        Type superclass = getClass().getGenericSuperclass();
        if (superclass instanceof ParameterizedType) {
            Type[] types = ((ParameterizedType) superclass).getActualTypeArguments();
            System.out.println("Generic type: " + types[0]);
        }
    }
}
\`\`\`

**6. Plugin Architectures:**
\`\`\`java
// Load plugins dynamically
public interface Plugin {
    void execute();
}

// Load plugin class at runtime
Class<?> pluginClass = Class.forName("com.example.MyPlugin");
Plugin plugin = (Plugin) pluginClass.getDeclaredConstructor().newInstance();
plugin.execute();
\`\`\`

**Performance Impact:**
\`\`\`java
// Direct method call: ~1 ns
user.getName();

// Reflection method call: ~100 ns (100x slower)
Method method = clazz.getMethod("getName");
method.invoke(user);

// Mitigation: Cache Method objects
private static final Method GET_NAME_METHOD;
static {
    try {
        GET_NAME_METHOD = User.class.getMethod("getName");
    } catch (Exception e) {
        throw new RuntimeException(e);
    }
}
// Reuse cached method (still ~50 ns but better)
GET_NAME_METHOD.invoke(user);
\`\`\`

**When to Use Reflection:**
✓ Dependency injection frameworks
✓ Serialization/deserialization libraries
✓ ORM frameworks
✓ Testing frameworks (mocking, test runners)
✓ Plugin architectures
✓ Generic libraries (working with unknown types)
✓ Debugging and development tools
✓ Annotation processing at runtime

**When NOT to Use Reflection:**
✗ Regular application code (use interfaces/polymorphism)
✗ Performance-critical paths
✗ When compile-time safety is important
✗ When code clarity is priority
✗ Simple CRUD operations

**Drawbacks:**
- **Performance:** 10-100x slower than direct calls
- **Security:** Bypasses access control (private fields/methods)
- **Type Safety:** Errors caught at runtime, not compile-time
- **Complexity:** Harder to read and maintain
- **Breaks Encapsulation:** Violates OOP principles

**Best Practices:**
- Cache Class, Method, Field objects
- Use sparingly in application code
- Prefer interfaces and polymorphism when possible
- Document why reflection is necessary
- Handle exceptions properly (ReflectiveOperationException)
- Check security manager permissions
- Use MethodHandles for better performance (Java 7+)

**Modern Alternative: MethodHandles (Java 7+):**
\`\`\`java
// Faster than reflection
MethodHandles.Lookup lookup = MethodHandles.lookup();
MethodHandle methodHandle = lookup.findVirtual(
    User.class,
    "getName",
    MethodType.methodType(String.class)
);
String name = (String) methodHandle.invoke(user);

// ~5-10x faster than reflection
// Type-safe at compile time
// Better JIT optimization
\`\`\`

**Security Considerations:**
\`\`\`java
// Check if SecurityManager allows reflection
SecurityManager sm = System.getSecurityManager();
if (sm != null) {
    sm.checkPermission(new ReflectPermission("suppressAccessChecks"));
}

// In production, restrict reflection via security policies
\`\`\``
    },
    {
      id: 10,
      category: 'Memory Model',
      difficulty: 'Hard',
      question: 'Explain Java Memory Model (JMM) and happens-before relationship. How does it ensure thread safety?',
      answer: `**Java Memory Model (JMM):**

**What is JMM:**
The Java Memory Model defines how threads interact through memory and what behaviors are allowed in concurrent execution. It specifies when changes made by one thread become visible to other threads.

**Memory Visibility Problem:**
\`\`\`java
// Thread 1
public void writer() {
    a = 1;  // Write to shared variable
    b = 2;
}

// Thread 2
public void reader() {
    int r1 = b;  // May see: 0, 2
    int r2 = a;  // May see: 0, 1
    // Possible results: (0,0), (1,0), (1,2), (2,1), (2,2)
}

// Without synchronization, thread 2 may:
// 1. Not see writes at all (cached in CPU)
// 2. See writes out of order (compiler/CPU reordering)
\`\`\`

**Memory Architecture:**
\`\`\`
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Thread 1   │    │  Thread 2   │    │  Thread 3   │
├─────────────┤    ├─────────────┤    ├─────────────┤
│ CPU Cache   │    │ CPU Cache   │    │ CPU Cache   │
│ (L1, L2)    │    │ (L1, L2)    │    │ (L1, L2)    │
└──────┬──────┘    └──────┬──────┘    └──────┬──────┘
       │                  │                  │
       └──────────────────┼──────────────────┘
                          │
                  ┌───────▼───────┐
                  │  Main Memory  │
                  │  (Heap, etc)  │
                  └───────────────┘

Problem: Each thread has its own cache, changes may not be visible!
\`\`\`

**Happens-Before Relationship:**

The happens-before relationship guarantees that if action A happens-before action B, then memory effects of A are visible to B.

**Happens-Before Rules:**

**1. Program Order Rule:**
\`\`\`java
// Within a single thread, actions happen in program order
int a = 1;  // Action 1
int b = 2;  // Action 2 (sees a = 1)
int c = a + b;  // Action 3 (sees a = 1, b = 2)
\`\`\`

**2. Monitor Lock Rule:**
\`\`\`java
// Unlock happens-before subsequent lock of same monitor
public class Counter {
    private int count = 0;

    public synchronized void increment() {
        count++;  // Action A
    }  // Unlock happens here

    public synchronized int getCount() {
        // Lock acquisition sees effects of Action A
        return count;
    }
}

// Thread 1: increment() unlocks
// Thread 2: getCount() locks -> sees increment's effects
\`\`\`

**3. Volatile Variable Rule:**
\`\`\`java
// Write to volatile happens-before subsequent read
private volatile boolean flag = false;
private int value = 0;

// Thread 1
public void writer() {
    value = 42;      // Action 1
    flag = true;     // Action 2 (volatile write)
}

// Thread 2
public void reader() {
    if (flag) {      // Volatile read sees flag = true
        // GUARANTEED to see value = 42
        System.out.println(value);  // Prints 42
    }
}

// Volatile write happens-before volatile read
// All writes before volatile write are visible after volatile read
\`\`\`

**4. Thread Start Rule:**
\`\`\`java
// Actions before thread.start() happen-before thread's actions
int x = 0;

Thread t = new Thread(() -> {
    // Guaranteed to see x = 42
    System.out.println(x);
});

x = 42;  // Action before start()
t.start();  // Thread sees all previous actions
\`\`\`

**5. Thread Join Rule:**
\`\`\`java
// Actions in thread happen-before join() returns
int result = 0;

Thread t = new Thread(() -> {
    result = compute();  // Action in thread
});

t.start();
t.join();  // Wait for completion
// Guaranteed to see result value
System.out.println(result);
\`\`\`

**6. Transitivity:**
\`\`\`java
// If A happens-before B, and B happens-before C,
// then A happens-before C

// Thread 1
value = 42;       // A
flag = true;      // B (volatile write)

// Thread 2
if (flag) {       // C (volatile read, sees B)
    // Sees A due to transitivity
    System.out.println(value);  // 42
}
\`\`\`

**Volatile Keyword Deep Dive:**

**What volatile guarantees:**
\`\`\`java
private volatile int counter = 0;

// Guarantees:
// 1. Visibility: Changes immediately visible to all threads
// 2. Ordering: Prevents reordering around volatile operations
// 3. Atomicity: For reads/writes (NOT for compound operations)

// Safe operations:
counter = 5;      // Safe (atomic write)
int x = counter;  // Safe (atomic read)

// UNSAFE operations:
counter++;        // NOT safe (read + write = not atomic)
// Equivalent to:
// int temp = counter;  // Read
// temp = temp + 1;     // Modify
// counter = temp;      // Write
// Another thread can interfere between operations!
\`\`\`

**Volatile vs Synchronized:**
\`\`\`java
// Volatile: Visibility only
private volatile boolean flag;

public void setFlag() {
    flag = true;  // Visible immediately
}

public boolean checkFlag() {
    return flag;  // Sees latest value
}

// Synchronized: Visibility + Atomicity + Mutual exclusion
private int counter;

public synchronized void increment() {
    counter++;  // Atomic, thread-safe
}
\`\`\`

**Double-Checked Locking (Before Java 5):**
\`\`\`java
// BROKEN without volatile (before Java 5)
public class Singleton {
    private static Singleton instance;

    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();  // Problem!
                }
            }
        }
        return instance;
    }
}

// Problem: Object construction is not atomic
// 1. Allocate memory
// 2. Initialize object
// 3. Assign reference
// Steps 2 and 3 can be reordered!

// Thread 1: Allocate → Assign → (interrupted)
// Thread 2: Sees non-null but uninitialized object!
\`\`\`

**Fixed with volatile (Java 5+):**
\`\`\`java
// CORRECT with volatile
public class Singleton {
    private static volatile Singleton instance;

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

// volatile prevents reordering
// Guarantees fully initialized object before assignment
\`\`\`

**Safe Publication:**

**Unsafe publication:**
\`\`\`java
public class UnsafePublication {
    private int[] arr;

    public void initialize() {
        arr = new int[10];
        arr[0] = 42;
    }

    public int getValue() {
        return arr[0];  // May see 0 (default) instead of 42!
    }
}
\`\`\`

**Safe publication patterns:**
\`\`\`java
// 1. Final fields (immutable)
public class SafePublication {
    private final int[] arr;

    public SafePublication() {
        arr = new int[10];
        arr[0] = 42;
    }  // Happens-before guarantee for final fields

    public int getValue() {
        return arr[0];  // Always sees 42
    }
}

// 2. Volatile reference
private volatile int[] arr;

// 3. Synchronized access
private int[] arr;
public synchronized void setArr(int[] arr) { this.arr = arr; }
public synchronized int[] getArr() { return arr; }

// 4. Concurrent collections
ConcurrentHashMap<String, Object> map = new ConcurrentHashMap<>();
\`\`\`

**Atomicity vs Visibility:**
\`\`\`java
// Atomicity: Operation completes fully or not at all
private AtomicInteger counter = new AtomicInteger(0);
counter.incrementAndGet();  // Atomic

// Visibility: Changes visible to other threads
private volatile boolean flag;
flag = true;  // Visible immediately

// Both needed for thread safety:
private int count;  // Neither atomic nor visible!

public synchronized void increment() {
    count++;  // Both atomic AND visible
}
\`\`\`

**Common Pitfalls:**

**1. Assuming atomicity:**
\`\`\`java
private volatile int counter = 0;

// WRONG: Not thread-safe
public void increment() {
    counter++;  // Not atomic!
}

// RIGHT: Use AtomicInteger
private AtomicInteger counter = new AtomicInteger(0);
public void increment() {
    counter.incrementAndGet();
}
\`\`\`

**2. Forgetting happens-before:**
\`\`\`java
private Map<String, String> map = new HashMap<>();

// WRONG: No happens-before guarantee
public void put(String key, String value) {
    map.put(key, value);
}

// RIGHT: Use ConcurrentHashMap
private Map<String, String> map = new ConcurrentHashMap<>();
\`\`\`

**Memory Barriers:**
\`\`\`java
// Low-level concept: Memory barriers prevent reordering

// LoadLoad: Prevent reordering of two loads
load1
LoadLoad barrier
load2

// StoreStore: Prevent reordering of two stores
store1
StoreStore barrier
store2

// Volatile write inserts: StoreStore + StoreLoad
// Volatile read inserts: LoadLoad + LoadStore

// Java abstracts this via happens-before
\`\`\`

**Best Practices:**
✓ Use synchronized for compound operations
✓ Use volatile for simple flags/status
✓ Use AtomicXxx for lock-free counters
✓ Use concurrent collections
✓ Prefer immutable objects
✓ Minimize shared mutable state
✓ Document synchronization policy
✓ Understand happens-before rules

**Summary:**
The Java Memory Model ensures thread safety through happens-before relationships. Key mechanisms:
- **synchronized**: Provides mutual exclusion, atomicity, and visibility
- **volatile**: Provides visibility and ordering guarantees
- **final**: Provides safe publication of immutable data
- **Concurrent utilities**: Built on JMM guarantees

Understanding JMM is crucial for writing correct concurrent code!`
    },
    {
      id: 11,
      category: 'Class Loading',
      difficulty: 'Hard',
      question: 'Explain custom class loaders in Java. When and how would you implement one?',
      answer: `**Class Loading in Java:**

**Class Loader Hierarchy:**
\`\`\`
┌──────────────────────────┐
│  Bootstrap ClassLoader   │  (native code, loads core Java classes)
│  (rt.jar, java.*, etc)   │
└────────────┬─────────────┘
             │
             │ parent
             ▼
┌──────────────────────────┐
│  Extension ClassLoader   │  (loads from jre/lib/ext)
│  (javax.*, com.sun.*)    │
└────────────┬─────────────┘
             │
             │ parent
             ▼
┌──────────────────────────┐
│  Application/System      │  (loads from CLASSPATH)
│  ClassLoader             │
└────────────┬─────────────┘
             │
             │ parent
             ▼
┌──────────────────────────┐
│  Custom ClassLoader      │  (your custom logic)
└──────────────────────────┘
\`\`\`

**Class Loading Process:**
\`\`\`java
1. Loading: Read .class file bytes
2. Linking:
   a. Verification: Verify bytecode validity
   b. Preparation: Allocate memory for static fields
   c. Resolution: Resolve symbolic references
3. Initialization: Execute static initializers
\`\`\`

**Class Loading Delegation Model:**
\`\`\`java
// When loading class, ClassLoader:
1. Check if class already loaded (cache)
2. Delegate to parent ClassLoader
3. If parent can't load, load itself
4. If still can't load, throw ClassNotFoundException

// This ensures:
// - Core Java classes loaded by Bootstrap (security)
// - No duplicate loading
// - Consistent class resolution
\`\`\`

**Basic ClassLoader Methods:**
\`\`\`java
public abstract class ClassLoader {
    // Load class by name
    public Class<?> loadClass(String name) throws ClassNotFoundException

    // Define class from bytes (protected)
    protected final Class<?> defineClass(String name, byte[] b, int off, int len)

    // Find class (override this for custom loading)
    protected Class<?> findClass(String name) throws ClassNotFoundException

    // Get resource
    public URL getResource(String name)

    // Get parent ClassLoader
    public final ClassLoader getParent()
}
\`\`\`

**Simple Custom ClassLoader:**
\`\`\`java
public class SimpleClassLoader extends ClassLoader {
    private String classPath;

    public SimpleClassLoader(String classPath) {
        super(ClassLoader.getSystemClassLoader());  // Set parent
        this.classPath = classPath;
    }

    @Override
    protected Class<?> findClass(String name) throws ClassNotFoundException {
        try {
            // Convert class name to file path
            // com.example.MyClass -> com/example/MyClass.class
            String fileName = name.replace('.', '/') + ".class";
            String filePath = classPath + File.separator + fileName;

            // Read class bytes from file
            byte[] classBytes = loadClassBytes(filePath);

            // Define class from bytes
            return defineClass(name, classBytes, 0, classBytes.length);
        } catch (IOException e) {
            throw new ClassNotFoundException("Could not load class: " + name, e);
        }
    }

    private byte[] loadClassBytes(String filePath) throws IOException {
        Path path = Paths.get(filePath);
        return Files.readAllBytes(path);
    }
}

// Usage
SimpleClassLoader loader = new SimpleClassLoader("/custom/classes");
Class<?> clazz = loader.loadClass("com.example.MyClass");
Object instance = clazz.getDeclaredConstructor().newInstance();
\`\`\`

**Loading from Network:**
\`\`\`java
public class NetworkClassLoader extends ClassLoader {
    private String baseUrl;

    public NetworkClassLoader(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    @Override
    protected Class<?> findClass(String name) throws ClassNotFoundException {
        try {
            String url = baseUrl + "/" + name.replace('.', '/') + ".class";
            byte[] classBytes = downloadClassBytes(url);
            return defineClass(name, classBytes, 0, classBytes.length);
        } catch (IOException e) {
            throw new ClassNotFoundException("Could not load class from: " + baseUrl, e);
        }
    }

    private byte[] downloadClassBytes(String urlString) throws IOException {
        URL url = new URL(urlString);
        try (InputStream in = url.openStream()) {
            return in.readAllBytes();
        }
    }
}

// Load class from remote server
NetworkClassLoader loader = new NetworkClassLoader("http://example.com/classes");
Class<?> clazz = loader.loadClass("com.example.RemoteClass");
\`\`\`

**Encrypted ClassLoader:**
\`\`\`java
public class EncryptedClassLoader extends ClassLoader {
    private String classPath;
    private SecretKey key;

    public EncryptedClassLoader(String classPath, SecretKey key) {
        this.classPath = classPath;
        this.key = key;
    }

    @Override
    protected Class<?> findClass(String name) throws ClassNotFoundException {
        try {
            String fileName = name.replace('.', '/') + ".encrypted";
            String filePath = classPath + File.separator + fileName;

            // Read encrypted bytes
            byte[] encryptedBytes = Files.readAllBytes(Paths.get(filePath));

            // Decrypt
            byte[] classBytes = decrypt(encryptedBytes, key);

            // Define class
            return defineClass(name, classBytes, 0, classBytes.length);
        } catch (Exception e) {
            throw new ClassNotFoundException("Could not load encrypted class: " + name, e);
        }
    }

    private byte[] decrypt(byte[] encrypted, SecretKey key) throws Exception {
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.DECRYPT_MODE, key);
        return cipher.doFinal(encrypted);
    }
}
\`\`\`

**Hot Reloading ClassLoader:**
\`\`\`java
public class HotReloadClassLoader extends ClassLoader {
    private String classPath;

    public HotReloadClassLoader(String classPath) {
        super(null);  // No parent delegation (reload every time)
        this.classPath = classPath;
    }

    @Override
    public Class<?> loadClass(String name) throws ClassNotFoundException {
        // Don't delegate for application classes
        if (name.startsWith("com.myapp")) {
            return findClass(name);
        }
        // Use parent for Java system classes
        return super.loadClass(name);
    }

    @Override
    protected Class<?> findClass(String name) throws ClassNotFoundException {
        // Always reload from disk (no caching)
        String fileName = name.replace('.', '/') + ".class";
        String filePath = classPath + File.separator + fileName;

        try {
            byte[] classBytes = Files.readAllBytes(Paths.get(filePath));
            return defineClass(name, classBytes, 0, classBytes.length);
        } catch (IOException e) {
            throw new ClassNotFoundException(name, e);
        }
    }
}

// Hot reload in action
while (true) {
    // Create new ClassLoader (discards old classes)
    HotReloadClassLoader loader = new HotReloadClassLoader("/app/classes");

    // Load class (fresh from disk)
    Class<?> clazz = loader.loadClass("com.myapp.MyPlugin");
    Object plugin = clazz.getDeclaredConstructor().newInstance();

    // Execute plugin
    Method execute = clazz.getMethod("execute");
    execute.invoke(plugin);

    // Sleep and reload (picks up changes)
    Thread.sleep(5000);
}
\`\`\`

**Real-World Use Cases:**

**1. Application Servers (Tomcat, JBoss):**
\`\`\`java
// Each web app has its own ClassLoader
WebAppClassLoader app1Loader = new WebAppClassLoader("/tomcat/webapps/app1");
WebAppClassLoader app2Loader = new WebAppClassLoader("/tomcat/webapps/app2");

// Apps can use different versions of same library
// app1: uses Guava 20.0
// app2: uses Guava 30.0
// No conflict because different ClassLoaders!
\`\`\`

**2. Plugin Systems:**
\`\`\`java
public class PluginManager {
    private Map<String, ClassLoader> pluginLoaders = new HashMap<>();

    public void loadPlugin(String pluginPath) throws Exception {
        // Create isolated ClassLoader for plugin
        URLClassLoader loader = new URLClassLoader(
            new URL[]{new File(pluginPath).toURI().toURL()}
        );

        // Load plugin class
        Class<?> pluginClass = loader.loadClass("com.example.Plugin");
        Plugin plugin = (Plugin) pluginClass.getDeclaredConstructor().newInstance();

        pluginLoaders.put(pluginPath, loader);
    }

    public void unloadPlugin(String pluginPath) throws IOException {
        ClassLoader loader = pluginLoaders.remove(pluginPath);
        if (loader instanceof URLClassLoader) {
            ((URLClassLoader) loader).close();
        }
        // Hint to GC to collect classes
        System.gc();
    }
}
\`\`\`

**3. OSGi Framework:**
\`\`\`java
// Each OSGi bundle has own ClassLoader
// Bundles can specify dependencies
Bundle-SymbolicName: com.example.mybundle
Import-Package: org.osgi.framework;version="[1.8,2.0)"
Export-Package: com.example.api

// ClassLoader enforces bundle boundaries
\`\`\`

**4. JDBC Drivers:**
\`\`\`java
// DriverManager uses ContextClassLoader
ClassLoader contextLoader = Thread.currentThread().getContextClassLoader();

// Load JDBC driver from application ClassLoader
Class.forName("com.mysql.jdbc.Driver", true, contextLoader);
\`\`\`

**5. Test Isolation (JUnit):**
\`\`\`java
// Each test class loaded with fresh ClassLoader
// Ensures no static state pollution between tests
ClassLoader testLoader = new CustomTestClassLoader();
Class<?> testClass = testLoader.loadClass("com.example.MyTest");
\`\`\`

**ClassLoader Context:**
\`\`\`java
// Get current ClassLoader
ClassLoader classLoader = MyClass.class.getClassLoader();

// Get context ClassLoader (thread-specific)
ClassLoader contextLoader = Thread.currentThread().getContextClassLoader();

// Set context ClassLoader
Thread.currentThread().setContextClassLoader(customLoader);

// This is important for frameworks that use reflection
// (e.g., JNDI, JAXB, JDBC)
\`\`\`

**Common Pitfalls:**

**1. Class Identity Problem:**
\`\`\`java
// Same class loaded by different ClassLoaders are DIFFERENT types!
ClassLoader loader1 = new CustomClassLoader("/path1");
ClassLoader loader2 = new CustomClassLoader("/path2");

Class<?> class1 = loader1.loadClass("com.example.MyClass");
Class<?> class2 = loader2.loadClass("com.example.MyClass");

System.out.println(class1 == class2);  // FALSE!

Object obj1 = class1.newInstance();
Object obj2 = class2.newInstance();

// This will throw ClassCastException!
MyClass myObj = (MyClass) obj2;  // Different class definition!
\`\`\`

**2. Memory Leaks:**
\`\`\`java
// ClassLoaders hold references to all loaded classes
// Classes hold references to ClassLoader
// If ClassLoader not released, classes not GC'd

// Common causes:
// - ThreadLocal holding class reference
// - Static fields holding objects
// - Long-lived threads with context ClassLoader

// Prevention:
1. Close URLClassLoader when done
2. Clear ThreadLocal variables
3. Null out static references
4. Use weak references for caches
\`\`\`

**3. Parent Delegation Bypass:**
\`\`\`java
// Be careful overriding loadClass()
// Can break delegation model

// WRONG: Bypasses parent (can load duplicate classes)
@Override
public Class<?> loadClass(String name) throws ClassNotFoundException {
    return findClass(name);  // Always load yourself
}

// RIGHT: Delegate first, then load
@Override
public Class<?> loadClass(String name) throws ClassNotFoundException {
    return super.loadClass(name);  // Delegates to parent first
}
\`\`\`

**Best Practices:**
✓ Override findClass(), not loadClass()
✓ Always call super() in constructor
✓ Close URLClassLoader when done
✓ Use parent delegation model
✓ Document class loading behavior
✓ Test with different ClassLoaders
✓ Be aware of class identity issues
✓ Monitor for ClassLoader memory leaks
✓ Use SecurityManager for untrusted code

**When to Use Custom ClassLoader:**
- Loading classes from non-standard sources (network, database)
- Encrypting class files for IP protection
- Hot reloading for development
- Plugin architectures
- Application isolation (containers, OSGi)
- Instrumentation and bytecode manipulation
- Class versioning and dependency management

**Summary:**
Custom class loaders provide powerful capabilities for dynamic class loading, isolation, and hot reloading. However, they require careful handling to avoid memory leaks and class identity issues.`
    },
    {
      id: 12,
      category: 'Functional Programming',
      difficulty: 'Hard',
      question: 'Explain functional interfaces, method references, and advanced Stream operations with practical examples',
      answer: `**Functional Interfaces:**

**What is a Functional Interface:**
An interface with exactly one abstract method (SAM - Single Abstract Method). Can have multiple default/static methods.

**@FunctionalInterface Annotation:**
\`\`\`java
@FunctionalInterface
public interface Calculator {
    int calculate(int a, int b);  // Single abstract method

    // Default methods are allowed
    default int square(int x) {
        return calculate(x, x);
    }

    // Static methods are allowed
    static int add(int a, int b) {
        return a + b;
    }
}

// Before Java 8: Anonymous inner class
Calculator calc = new Calculator() {
    @Override
    public int calculate(int a, int b) {
        return a + b;
    }
};

// Java 8: Lambda expression
Calculator calc = (a, b) -> a + b;
\`\`\`

**Built-in Functional Interfaces:**

**1. Function<T, R> - Transform input to output:**
\`\`\`java
Function<String, Integer> stringLength = s -> s.length();
Integer length = stringLength.apply("Hello");  // 5

// Chaining functions
Function<String, Integer> parse = Integer::parseInt;
Function<Integer, Integer> square = x -> x * x;
Function<String, Integer> parseAndSquare = parse.andThen(square);
System.out.println(parseAndSquare.apply("5"));  // 25

// Composing functions
Function<Integer, Integer> multiplyByTwo = x -> x * 2;
Function<Integer, Integer> addOne = x -> x + 1;
Function<Integer, Integer> composed = multiplyByTwo.compose(addOne);
System.out.println(composed.apply(3));  // (3 + 1) * 2 = 8
\`\`\`

**2. Predicate<T> - Test a condition:**
\`\`\`java
Predicate<String> isEmpty = String::isEmpty;
Predicate<String> isLong = s -> s.length() > 10;

boolean result = isEmpty.test("");  // true

// Combining predicates
Predicate<String> isEmptyOrLong = isEmpty.or(isLong);
Predicate<String> isNotEmpty = isEmpty.negate();
Predicate<String> isShortAndNotEmpty = isNotEmpty.and(s -> s.length() < 10);

List<String> names = List.of("Alice", "Bob", "Christopher");
names.stream()
    .filter(isShortAndNotEmpty)
    .forEach(System.out::println);  // Alice, Bob
\`\`\`

**3. Consumer<T> - Consume input (void):**
\`\`\`java
Consumer<String> print = System.out::println;
Consumer<String> printUpper = s -> System.out.println(s.toUpperCase());

print.accept("hello");  // hello

// Chaining consumers
Consumer<String> printBoth = print.andThen(printUpper);
printBoth.accept("hello");  // hello\nHELLO

// BiConsumer - Two inputs
BiConsumer<String, Integer> printWithCount =
    (name, count) -> System.out.println(name + ": " + count);
printWithCount.accept("Items", 5);  // Items: 5
\`\`\`

**4. Supplier<T> - Supply a value:**
\`\`\`java
Supplier<String> randomString = () -> UUID.randomUUID().toString();
String uuid = randomString.get();

Supplier<List<String>> listFactory = ArrayList::new;
List<String> list = listFactory.get();

// Lazy evaluation with Supplier
public class ExpensiveObject {
    public ExpensiveObject() {
        // Expensive initialization
    }
}

// Only create when needed
Supplier<ExpensiveObject> lazyInit = ExpensiveObject::new;
ExpensiveObject obj = lazyInit.get();  // Created here
\`\`\`

**5. UnaryOperator<T> - Function<T, T>:**
\`\`\`java
UnaryOperator<Integer> square = x -> x * x;
UnaryOperator<String> toUpper = String::toUpperCase;

Integer result = square.apply(5);  // 25
String upper = toUpper.apply("hello");  // HELLO

// Replace all in list
List<Integer> numbers = List.of(1, 2, 3, 4, 5);
numbers.replaceAll(x -> x * 2);  // [2, 4, 6, 8, 10]
\`\`\`

**6. BinaryOperator<T> - BiFunction<T, T, T>:**
\`\`\`java
BinaryOperator<Integer> add = (a, b) -> a + b;
BinaryOperator<Integer> max = Integer::max;

Integer sum = add.apply(5, 3);  // 8
Integer maximum = max.apply(5, 3);  // 5

// Reduce stream with BinaryOperator
List<Integer> numbers = List.of(1, 2, 3, 4, 5);
Integer total = numbers.stream()
    .reduce(0, Integer::sum);  // 15
\`\`\`

**Method References:**

**1. Static Method Reference:**
\`\`\`java
// Lambda: x -> Integer.parseInt(x)
Function<String, Integer> parse = Integer::parseInt;

// Lambda: (a, b) -> Integer.max(a, b)
BinaryOperator<Integer> max = Integer::max;

List<String> numbers = List.of("1", "2", "3");
numbers.stream()
    .map(Integer::parseInt)  // Static method reference
    .forEach(System.out::println);
\`\`\`

**2. Instance Method Reference (Object):**
\`\`\`java
String str = "Hello";

// Lambda: () -> str.length()
Supplier<Integer> lengthSupplier = str::length;

// Lambda: () -> str.toUpperCase()
Supplier<String> upperSupplier = str::toUpperCase;

System.out.println(lengthSupplier.get());  // 5
\`\`\`

**3. Instance Method Reference (Class):**
\`\`\`java
// Lambda: s -> s.toLowerCase()
Function<String, String> toLower = String::toLowerCase;

// Lambda: s -> s.isEmpty()
Predicate<String> isEmpty = String::isEmpty;

List<String> words = List.of("HELLO", "WORLD");
words.stream()
    .map(String::toLowerCase)  // Instance method reference
    .forEach(System.out::println);
\`\`\`

**4. Constructor Reference:**
\`\`\`java
// No-arg constructor: () -> new ArrayList<>()
Supplier<List<String>> listFactory = ArrayList::new;

// Constructor with arg: size -> new ArrayList<>(size)
Function<Integer, List<String>> sizedListFactory = ArrayList::new;

// Array constructor: size -> new String[size]
IntFunction<String[]> arrayFactory = String[]::new;

List<String> names = List.of("Alice", "Bob", "Charlie");
String[] array = names.stream()
    .toArray(String[]::new);  // Constructor reference
\`\`\`

**Advanced Stream Operations:**

**1. flatMap - Flatten nested structures:**
\`\`\`java
List<List<Integer>> nested = List.of(
    List.of(1, 2, 3),
    List.of(4, 5),
    List.of(6, 7, 8, 9)
);

// Flatten to single stream
List<Integer> flattened = nested.stream()
    .flatMap(List::stream)
    .collect(Collectors.toList());  // [1,2,3,4,5,6,7,8,9]

// Practical example: Get all words from sentences
List<String> sentences = List.of(
    "Hello world",
    "Java streams are powerful"
);

List<String> words = sentences.stream()
    .map(s -> s.split(" "))
    .flatMap(Arrays::stream)
    .collect(Collectors.toList());
\`\`\`

**2. collect - Advanced collectors:**
\`\`\`java
List<Person> people = List.of(
    new Person("Alice", 30),
    new Person("Bob", 25),
    new Person("Charlie", 30)
);

// Group by age
Map<Integer, List<Person>> byAge = people.stream()
    .collect(Collectors.groupingBy(Person::getAge));

// Partition by condition
Map<Boolean, List<Person>> partitioned = people.stream()
    .collect(Collectors.partitioningBy(p -> p.getAge() >= 30));

// Count by age
Map<Integer, Long> counts = people.stream()
    .collect(Collectors.groupingBy(
        Person::getAge,
        Collectors.counting()
    ));

// Average age by name length
Map<Integer, Double> avgAge = people.stream()
    .collect(Collectors.groupingBy(
        p -> p.getName().length(),
        Collectors.averagingInt(Person::getAge)
    ));

// Join names
String names = people.stream()
    .map(Person::getName)
    .collect(Collectors.joining(", ", "[", "]"));  // [Alice, Bob, Charlie]

// To Map
Map<String, Integer> nameToAge = people.stream()
    .collect(Collectors.toMap(
        Person::getName,
        Person::getAge,
        (age1, age2) -> age1  // Merge function for duplicates
    ));
\`\`\`

**3. reduce - Custom aggregation:**
\`\`\`java
List<Integer> numbers = List.of(1, 2, 3, 4, 5);

// Sum
Integer sum = numbers.stream()
    .reduce(0, Integer::sum);  // 15

// Product
Integer product = numbers.stream()
    .reduce(1, (a, b) -> a * b);  // 120

// Max
Optional<Integer> max = numbers.stream()
    .reduce(Integer::max);  // Optional[5]

// Complex reduction: Concatenate strings with custom separator
List<String> words = List.of("Hello", "World", "Java");
String result = words.stream()
    .reduce("", (acc, word) -> acc.isEmpty() ? word : acc + "-" + word);
    // "Hello-World-Java"
\`\`\`

**4. Parallel Streams:**
\`\`\`java
List<Integer> largeList = IntStream.rangeClosed(1, 1_000_000)
    .boxed()
    .collect(Collectors.toList());

// Sequential
long sum = largeList.stream()
    .mapToLong(Integer::longValue)
    .sum();

// Parallel (uses ForkJoinPool)
long parallelSum = largeList.parallelStream()
    .mapToLong(Integer::longValue)
    .sum();

// Control parallelism
ForkJoinPool customPool = new ForkJoinPool(4);
long customSum = customPool.submit(() ->
    largeList.parallelStream()
        .mapToLong(Integer::longValue)
        .sum()
).get();
\`\`\`

**5. Infinite Streams:**
\`\`\`java
// Generate infinite stream
Stream.generate(Math::random)
    .limit(5)
    .forEach(System.out::println);

// Iterate infinite stream
Stream.iterate(0, n -> n + 1)  // 0, 1, 2, 3, ...
    .limit(10)
    .forEach(System.out::println);

// Fibonacci sequence
Stream.iterate(new int[]{0, 1}, arr -> new int[]{arr[1], arr[0] + arr[1]})
    .map(arr -> arr[0])
    .limit(10)
    .forEach(System.out::println);  // 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
\`\`\`

**6. peek - Debug streams:**
\`\`\`java
List<Integer> result = Stream.of(1, 2, 3, 4, 5)
    .peek(x -> System.out.println("Original: " + x))
    .filter(x -> x % 2 == 0)
    .peek(x -> System.out.println("Filtered: " + x))
    .map(x -> x * 2)
    .peek(x -> System.out.println("Mapped: " + x))
    .collect(Collectors.toList());
\`\`\`

**7. Custom Collector:**
\`\`\`java
// Collect to immutable list
Collector<String, ?, List<String>> toImmutableList = Collector.of(
    ArrayList::new,              // Supplier: Create container
    List::add,                   // Accumulator: Add element
    (list1, list2) -> {          // Combiner: Merge containers
        list1.addAll(list2);
        return list1;
    },
    Collections::unmodifiableList  // Finisher: Convert to immutable
);

List<String> immutable = Stream.of("a", "b", "c")
    .collect(toImmutableList);
\`\`\`

**Practical Real-World Examples:**

**1. Data Processing Pipeline:**
\`\`\`java
List<Transaction> transactions = getTransactions();

Map<String, Double> totalByCategory = transactions.stream()
    .filter(t -> t.getYear() == 2024)
    .filter(t -> t.getAmount() > 100)
    .collect(Collectors.groupingBy(
        Transaction::getCategory,
        Collectors.summingDouble(Transaction::getAmount)
    ));
\`\`\`

**2. Error Handling in Streams:**
\`\`\`java
List<String> urls = List.of("url1", "url2", "url3");

List<String> results = urls.stream()
    .map(url -> {
        try {
            return fetchData(url);
        } catch (IOException e) {
            return null;  // or use Optional
        }
    })
    .filter(Objects::nonNull)
    .collect(Collectors.toList());
\`\`\`

**Best Practices:**
✓ Use appropriate functional interface
✓ Prefer method references over lambdas when possible
✓ Use parallel streams for large datasets (CPU-bound)
✓ Avoid side effects in lambda expressions
✓ Use Optional to avoid null checks
✓ Chain operations for readability
✓ Use peek() only for debugging
✓ Be aware of lazy evaluation
✓ Consider performance of parallel streams

**When NOT to use Streams:**
✗ Simple loops (streams have overhead)
✗ Modifying external state
✗ Exception-heavy operations
✗ Debugging complex logic (hard to debug)
✗ Small collections (<100 elements usually)`
    },
    {
      id: 13,
      category: 'JVM Internals',
      difficulty: 'Easy',
      question: 'Why is the Java platform independent?',
      answer: `**Java\'s "Write Once, Run Anywhere" Promise:**

Java achieves platform independence through a two-step compilation/execution model that decouples source code from the underlying operating system.

**The Mechanism:**

**1. Compile Once → Bytecode:**
\`\`\`
.java (source)  →  javac  →  .class (bytecode)
\`\`\`
The Java compiler (\`javac\`) does NOT produce native machine code. Instead, it produces **bytecode** — an intermediate, platform-independent instruction set defined by the JVM specification.

**2. Run Anywhere → JVM:**
\`\`\`
.class (bytecode)  →  JVM (platform-specific)  →  native code → CPU
\`\`\`
The JVM is platform-specific (Windows JVM ≠ Linux JVM ≠ macOS JVM), but every JVM implements the same bytecode contract. The JVM interprets / JIT-compiles bytecode into native instructions for whatever CPU it runs on.

**Why bytecode is portable:**
- Defined by the JVM specification — every conforming JVM understands it identically
- Uses an abstract stack machine (no CPU-specific registers, calling conventions, or memory layouts)
- Verified at load time for type safety
- Same .class file works on x86, ARM, RISC-V, mainframe — anywhere a JVM exists

**Compare to C/C++:**
\`\`\`
.c → gcc (Windows) → .exe   ← runs ONLY on Windows x86
.c → gcc (Linux)   → .out   ← needs separate compilation per OS
\`\`\`
C compiles directly to native code per target — you must recompile for each platform.

**Key Insight:**
- **Java code** is platform-independent (the .class file)
- **JVM** is platform-dependent (different binary per OS/architecture)
- The JVM's job is to bridge bytecode → native, hiding platform differences

**What can still break portability:**
- Native methods (JNI)
- File path separators (\`/\` vs \`\\\\\`)
- Line endings (\`\\n\` vs \`\\r\\n\`)
- Hardcoded OS commands

**Summary:**
Java is platform-independent because its code targets the JVM (a virtual CPU), not the real CPU. The JVM translates bytecode to native code at runtime, making the same compiled program runnable on any system with a compatible JVM.`
    },
    {
      id: 14,
      category: 'JVM Internals',
      difficulty: 'Easy',
      question: 'Difference between JDK, JRE, and JVM?',
      answer: `**Three Nested Concepts: JDK ⊃ JRE ⊃ JVM**

**1. JVM (Java Virtual Machine):**
The runtime engine that executes Java bytecode. Platform-specific binary that translates \`.class\` files to native CPU instructions.

**JVM Components:**
- **ClassLoader Subsystem** — loads .class files
- **Runtime Data Areas** — Heap, Stack, Method Area (Metaspace), PC Register, Native Method Stack
- **Execution Engine** — Interpreter + JIT compiler + Garbage Collector

**2. JRE (Java Runtime Environment):**
\`\`\`
JRE = JVM + Java standard libraries (java.*, javax.*)
\`\`\`
What end-users install to **RUN** Java applications. Contains everything needed to execute a Java program but no development tools.

**3. JDK (Java Development Kit):**
\`\`\`
JDK = JRE + development tools (javac, javadoc, jdb, jar, jlink, jpackage)
\`\`\`
What developers install to **BUILD** Java applications. Includes the compiler, debugger, and other tooling.

**Quick Comparison Table:**

| Component | Purpose | Includes Compiler? | For Whom |
|-----------|---------|-------------------|----------|
| JVM | Run bytecode | No | Internal to JRE |
| JRE | Run Java apps | No | End users |
| JDK | Build + run | Yes | Developers |

**Visual:**
\`\`\`
┌──────────────────────────────────────┐
│ JDK                                  │
│ ┌──────────────────────────────────┐ │
│ │ JRE                              │ │
│ │ ┌──────────────────────────────┐ │ │
│ │ │ JVM                          │ │ │
│ │ │ - ClassLoader                │ │ │
│ │ │ - Runtime Memory             │ │ │
│ │ │ - Execution Engine + JIT     │ │ │
│ │ │ - Garbage Collector          │ │ │
│ │ └──────────────────────────────┘ │ │
│ │ + Class libraries (java.*, javax.*)│
│ └──────────────────────────────────┘ │
│ + javac, javadoc, jdb, jar, jlink     │
└──────────────────────────────────────┘
\`\`\`

**JDK Tools (NOT in JRE):**
- \`javac\` — Java compiler (.java → .class)
- \`javadoc\` — generate API documentation
- \`jdb\` — debugger
- \`jar\` — package classes into JAR files
- \`jlink\` — build custom slim runtime images
- \`jpackage\` — package as native installer

**Java 9+ Change:**
Oracle stopped distributing JRE separately starting Java 11. Use \`jlink\` to build a custom runtime with only the modules your app needs — much smaller than a full JRE.

**Summary:**
- **JVM** runs bytecode (the engine)
- **JRE** runs Java apps (engine + libraries)
- **JDK** builds Java apps (engine + libraries + dev tools)`
    },
    {
      id: 15,
      category: 'JVM Internals',
      difficulty: 'Medium',
      question: 'Java is platform independent, so are JVM, JRE, and JDK also platform independent?',
      answer: `**Short Answer: NO — only Java code (bytecode) is platform-independent. JVM, JRE, and JDK are all PLATFORM-DEPENDENT.**

**Why the JVM Must Be Platform-Specific:**

The JVM\'s job is to translate platform-independent bytecode into platform-specific native machine code. To do that, the JVM itself must understand:
- The target CPU\'s instruction set (x86, ARM, RISC-V, etc.)
- The OS\'s system calls (Windows API vs POSIX)
- The OS\'s threading model
- The OS\'s memory management
- The OS\'s file system conventions

**Different Binaries Per Platform:**
\`\`\`
Windows JVM: jvm.dll        (x86_64 PE binary)
Linux JVM:   libjvm.so       (x86_64 ELF binary)
macOS JVM:   libjvm.dylib    (ARM64/x86_64 Mach-O binary)
\`\`\`

You must download a JVM/JRE/JDK that matches your OS and CPU architecture. They are NOT interchangeable.

**The Magic Trick:**
\`\`\`
Same .class file
        │
        ▼
   ┌────┴────┬─────────┬─────────┐
   ▼         ▼         ▼         ▼
Windows   Linux     macOS     Android
  JVM      JVM       JVM       Dalvik/ART
   │         │         │         │
   ▼         ▼         ▼         ▼
  x86      x86       ARM        ARM
 native   native    native     native
\`\`\`

The bytecode is the same; the JVM (and what it produces) is different per platform.

**Why This Design?**

If Java were "platform-independent all the way down," it would have to:
- Either run as bytecode on a native bytecode CPU (doesn\'t exist commercially)
- Or be re-compiled per platform (which defeats the point)

Instead, Java offloads platform specifics to the JVM, which is **written and compiled separately for each platform**. The JVM is the "translator" between universal bytecode and specific hardware.

**Real-World Impact:**

When you download Java from Oracle / OpenJDK / Adoptium, you select:
- **Operating System:** Windows / Linux / macOS / AIX / Solaris
- **Architecture:** x64 / x86 / ARM64 / ARM32 / PPC64
- **Bundle:** JDK / JRE

Each combination = a different binary build of the JVM/JDK.

**Common Misconception:**
"Java is platform-independent" means **Java code** is portable — not that the **Java platform itself** is. The whole point of the JVM\'s existence is to be the platform-DEPENDENT layer that lets programs be platform-INDEPENDENT.

**Analogy:**
A PDF file is platform-independent — you can email it anywhere. But your PDF reader (Adobe / Preview / Foxit) is platform-specific — you need a different one per OS.

**Summary:**
- ✅ **.class files (bytecode)** are platform-independent
- ❌ **JVM** is platform-dependent (different binary per OS/CPU)
- ❌ **JRE** is platform-dependent (contains the platform-specific JVM)
- ❌ **JDK** is platform-dependent (contains the platform-specific JRE + tools)`
    },
    {
      id: 16,
      category: 'Memory Model',
      difficulty: 'Medium',
      question: 'What are the different types of memory locations in Java?',
      answer: `**JVM Memory Areas:**

The JVM divides runtime memory into several distinct regions, each with a specific purpose.

**1. Heap (shared across threads):**
- Stores all **objects, arrays, and instance fields**
- Garbage-collected
- Subdivided into generations:
  - **Young Generation:** Eden + 2 Survivor spaces (S0, S1) — short-lived objects
  - **Old (Tenured) Generation:** long-lived objects
- Sizing: \`-Xms\` (initial), \`-Xmx\` (max)
- Errors: \`OutOfMemoryError: Java heap space\`

**2. Stack (one per thread):**
- Stores **method call frames** in LIFO order
- Each frame holds:
  - Local primitive variables (\`int\`, \`boolean\`, etc.)
  - Object **references** (not the object — that\'s on the heap)
  - Method parameters
  - Partial computation results
  - Return address
- Sizing: \`-Xss\` (default ~512KB–1MB)
- Errors: \`StackOverflowError\` (typically from deep recursion)

**3. Method Area / Metaspace (shared):**
- Stores **class metadata**: class structure, method bytecode, field info, runtime constant pool
- Java 8+: replaced PermGen with **Metaspace** (off-heap, native memory)
- Auto-grows by default (set max with \`-XX:MaxMetaspaceSize\`)
- Errors: \`OutOfMemoryError: Metaspace\` (often from classloader leaks)

**4. PC Register (one per thread):**
- Stores the **address of the current bytecode instruction**
- Each thread has its own PC register
- Tiny — just enough to hold a pointer

**5. Native Method Stack (one per thread):**
- Used by native methods (JNI calls to C/C++ libraries)
- Separate from the Java stack

**Visual Layout:**
\`\`\`
┌─────────────────────────────────────────────┐
│ JVM Memory                                  │
│                                             │
│  ┌────────────────────────────────────┐    │
│  │ HEAP (shared)                      │    │
│  │   Young Gen: Eden | S0 | S1        │    │
│  │   Old Gen                          │    │
│  └────────────────────────────────────┘    │
│                                             │
│  ┌────────────────────────────────────┐    │
│  │ Metaspace (off-heap, shared)       │    │
│  │   Class metadata, method bytecode  │    │
│  └────────────────────────────────────┘    │
│                                             │
│  Per-thread:                                │
│  ┌────────────┐ ┌────────────┐ ┌────────┐  │
│  │ Stack      │ │ PC Register│ │ Native │  │
│  │ (frames)   │ │            │ │ Stack  │  │
│  └────────────┘ └────────────┘ └────────┘  │
└─────────────────────────────────────────────┘
\`\`\`

**Concrete Example:**
\`\`\`java
public void process() {                  // new STACK frame
    int count = 5;                       // primitive on STACK
    User user = new User("Alice");       // 'user' (ref) on STACK
                                          // User OBJECT on HEAP
    String name = user.getName();         // 'name' (ref) on STACK
                                          // "Alice" on HEAP (string pool)
    helper(user);                         // pushes new frame
}                                         // frame popped; refs gone;
                                          // GC may collect heap objects
\`\`\`

**Special Heap Region — String Pool:**
- Located inside the heap (since Java 7)
- Caches string literals to enable interning
- \`String s = "hello"\` → pool reference (cached)
- \`String s = new String("hello")\` → new heap object (not cached)

**Summary Table:**

| Region | Per-Thread? | What it holds | GC managed? | OOM error |
|--------|-------------|---------------|-------------|-----------|
| Heap | Shared | Objects, arrays | Yes | Java heap space |
| Stack | Per thread | Local primitives, refs | No (auto-popped) | StackOverflowError |
| Metaspace | Shared | Class metadata | No (off-heap) | Metaspace |
| PC Register | Per thread | Current instruction | No | (rare) |
| Native Stack | Per thread | JNI frames | No | (rare) |

**Tuning Flags:**
\`\`\`
-Xms512m              Initial heap size
-Xmx4g                Max heap size
-Xss512k              Stack size per thread
-XX:MetaspaceSize=128m
-XX:MaxMetaspaceSize=512m
\`\`\``
    },
    {
      id: 17,
      category: 'Class Loading',
      difficulty: 'Medium',
      question: 'What are the different types of class loaders in Java?',
      answer: `**Class Loader Hierarchy (Parent Delegation Model):**

Java uses three built-in class loaders organized hierarchically. Each child loader delegates to its parent first before loading itself.

**1. Bootstrap ClassLoader (Primordial):**
- Written in **native code** (C/C++)
- Loads core JDK classes from \`java.lang.*\`, \`java.util.*\`, \`java.io.*\` (rt.jar pre-Java 9, lib/modules in Java 9+)
- The "root" of the hierarchy — has no parent
- \`String.class.getClassLoader()\` returns \`null\` (because it\'s native)

**2. Platform ClassLoader (was Extension before Java 9):**
- Loads platform-level classes — \`javax.*\`, JDBC, JAXB, etc.
- Java 9+ renamed from "Extension" → "Platform"
- Parent: Bootstrap

**3. Application ClassLoader (System):**
- Loads classes from your **CLASSPATH** / \`-cp\` argument
- This is what loads YOUR application code
- Parent: Platform

**4. Custom ClassLoaders (user-defined):**
- You can create your own by extending \`ClassLoader\`
- Used for: plugins, hot reload, encrypted class files, application servers, OSGi

**Visual Hierarchy:**
\`\`\`
Bootstrap ClassLoader (native)
        │
        ▼
Platform ClassLoader (was Extension)
        │
        ▼
Application/System ClassLoader
        │
        ▼
Custom ClassLoader(s) (e.g. WebappClassLoader in Tomcat)
\`\`\`

**Parent Delegation Algorithm:**
\`\`\`java
public Class<?> loadClass(String name) {
    // 1. Check if already loaded
    Class<?> c = findLoadedClass(name);
    if (c != null) return c;

    // 2. Delegate to parent FIRST
    try {
        c = parent.loadClass(name);
        if (c != null) return c;
    } catch (ClassNotFoundException e) {
        // parent couldn't find it
    }

    // 3. Try to find ourselves
    return findClass(name);
}
\`\`\`

**Why Parent Delegation?**
- **Security:** Prevents someone from creating a malicious \`java.lang.String\` — bootstrap always wins
- **Uniqueness:** Same class loaded by same loader = single Class object
- **Avoids duplicate loading**

**Code Example:**
\`\`\`java
ClassLoader stringLoader = String.class.getClassLoader();
// → null (Bootstrap, native code)

ClassLoader appLoader = MyClass.class.getClassLoader();
// → jdk.internal.loader.ClassLoaders$AppClassLoader

ClassLoader platformLoader = appLoader.getParent();
// → jdk.internal.loader.ClassLoaders$PlatformClassLoader

ClassLoader bootstrapLoader = platformLoader.getParent();
// → null (Bootstrap)
\`\`\`

**Custom ClassLoader Example:**
\`\`\`java
public class MyClassLoader extends ClassLoader {
    @Override
    protected Class<?> findClass(String name) throws ClassNotFoundException {
        byte[] bytes = loadBytecode(name);   // from disk, network, encrypted
        return defineClass(name, bytes, 0, bytes.length);
    }
}

ClassLoader loader = new MyClassLoader();
Class<?> cls = loader.loadClass("com.example.Plugin");
Object instance = cls.getDeclaredConstructor().newInstance();
\`\`\`

**Class Loading Phases:**
1. **Loading** — read .class bytes into method area
2. **Linking** — verify bytecode, prepare static fields, resolve symbolic references
3. **Initialization** — run \`<clinit>\` (static blocks, static field assignments)

**Real-World Custom Loaders:**
- **Tomcat WebappClassLoader** — isolates each webapp, breaks parent delegation (looks LOCAL FIRST)
- **OSGi** — module-based class loading with versioning
- **Spring Boot LaunchedURLClassLoader** — loads classes from a fat JAR
- **JDBC drivers** — DriverManager uses Thread Context ClassLoader (TCCL)

**Summary:**
- **Bootstrap** → core JDK (native code, no parent)
- **Platform** → platform modules (javax.*)
- **Application** → your classpath code
- **Custom** → your specialized loading needs

Each child delegates to its parent before loading; this guarantees core classes are always loaded by Bootstrap, providing security and consistency.`
    },
    {
      id: 18,
      category: 'Memory Model',
      difficulty: 'Medium',
      question: 'What is garbage collection and how does it work?',
      answer: `**Garbage Collection (GC):**

Automatic memory management where the JVM identifies and reclaims memory occupied by objects that are no longer reachable from any GC root.

**Why GC Exists:**
- Manual memory management (C/C++ \`free()\`) is error-prone — leaks, double-frees, dangling pointers
- GC eliminates these bugs at the cost of some overhead and unpredictability

**Core Algorithm: Mark & Sweep**

**Phase 1: Mark**
Trace from **GC Roots** and mark every reachable object as "live."

**GC Roots include:**
- Local variables in active stack frames
- Static fields
- Active threads
- JNI references (native code)
- Synchronized monitors

**Phase 2: Sweep**
Walk the heap; reclaim memory of unmarked objects (garbage).

**Phase 3: Compact (optional)**
Move live objects together to eliminate fragmentation.

**Visual:**
\`\`\`
Before GC:                  After Mark & Sweep:
[A][B][garbage][C][garbage] [A][B][   ][C][   ]
                            (free space, but fragmented)

After Compaction:
[A][B][C][        free        ]
\`\`\`

**Generational Hypothesis:**
*"Most objects die young."* So divide the heap by age:

\`\`\`
HEAP:
┌─────────────────┬──────────────┬─────────┐
│ Young Gen       │ Old Gen      │         │
│ Eden | S0 | S1  │ (Tenured)    │         │
└─────────────────┴──────────────┴─────────┘
       │                  │
       ▼                  ▼
   Minor GC           Major GC
   (frequent,        (rare,
    cheap)            expensive)
\`\`\`

**Object Lifecycle:**
1. **New object** → allocated in **Eden**
2. **Eden fills** → **Minor GC** runs:
   - Live objects move from Eden → Survivor (S0)
   - Surviving objects from S0 → S1 (or vice versa)
   - After surviving N collections (\`tenuring threshold\`) → **promoted to Old Gen**
3. **Old Gen fills** → **Major GC** (or "Full GC") — slower, scans whole heap

**Modern Garbage Collectors:**

| Collector | Best For | Pause Time | Notes |
|-----------|----------|------------|-------|
| **Serial** | Single-thread small apps | High | Default for client mode |
| **Parallel** | Throughput | High | Default Java 7-8 |
| **G1** | Balanced | Medium (~200ms) | Default Java 9+ |
| **ZGC** | Low latency | Sub-ms | Java 15+ GA, large heaps |
| **Shenandoah** | Low latency | Sub-ms | Concurrent compaction |

**G1 GC (default since Java 9):**
- Heap divided into ~2000 equal-sized **regions**
- Concurrent marking + parallel evacuation
- Targets pause time goal: \`-XX:MaxGCPauseMillis=200\`

**Code Example:**
\`\`\`java
Object obj = new Object();   // allocated in Eden
obj = null;                   // no more references → eligible for GC

// GC may reclaim later — not immediately
// You can SUGGEST GC, but JVM may ignore
System.gc();                  // hint only

// Detect GC-collectable objects
WeakReference<Heavy> weak = new WeakReference<>(new Heavy());
// If only the WeakReference holds it, GC will collect on next cycle
\`\`\`

**Triggering GC (you can\'t force):**
- \`System.gc()\` and \`Runtime.getRuntime().gc()\` are **suggestions** — JVM may ignore
- \`-XX:+DisableExplicitGC\` makes them no-ops

**Tuning Flags:**
\`\`\`
-Xms512m -Xmx4g                    Heap sizing
-XX:+UseG1GC                       G1 (default Java 9+)
-XX:+UseZGC                        ZGC (low latency)
-XX:MaxGCPauseMillis=100           Target pause
-Xlog:gc*:file=gc.log              GC log
\`\`\`

**Common GC Issues:**
- **Memory leak** — unintended strong references prevent collection (e.g., static collections)
- **GC pressure** — too many short-lived allocations cause frequent minor GCs
- **Long pauses** — old gen too large; Full GC stops the world

**Monitoring Tools:**
- \`jstat -gc <pid> 1000\` — GC stats
- \`jmap -heap <pid>\` — heap summary
- VisualVM, JProfiler, async-profiler — visual analysis
- **Java Flight Recorder (JFR)** — low-overhead profiling

**Summary:**
- GC automatically frees unreachable objects
- Foundation algorithm: **Mark & Sweep**, often with compaction
- Modern collectors are **generational** (Young/Old gen)
- **G1 GC** is the modern default (Java 9+)
- **You hint with \`System.gc()\`** but cannot force collection
- Goal: balance throughput vs pause time per app needs`
    },
    {
      id: 19,
      category: 'Memory Model',
      difficulty: 'Easy',
      question: 'What do System.gc() and Runtime.gc() do?',
      answer: `**Both Are Suggestions, Not Commands.**

**\`System.gc()\` — Static convenience method:**
\`\`\`java
public static void gc() {
    Runtime.getRuntime().gc();   // delegates to Runtime
}
\`\`\`

**\`Runtime.getRuntime().gc()\` — Instance method:**
\`\`\`java
public native void gc();   // native implementation
\`\`\`

**They are functionally equivalent.** \`System.gc()\` just calls \`Runtime.gc()\` under the hood.

**What They Do:**
**Suggest** to the JVM that this might be a good time to run garbage collection. The JVM is **free to ignore the request** entirely.

\`\`\`java
public class GcDemo {
    public static void main(String[] args) {
        Object o = new Object();
        o = null;                    // eligible for GC
        System.gc();                  // hint to JVM
        // JVM MAY run GC here. Or not. Or later. Or never.
    }
}
\`\`\`

**Why You Generally Should NOT Call Them:**

**1. The JVM is smarter than you.**
Modern collectors (G1, ZGC) are tuned to balance throughput and latency. Calling \`gc()\` can:
- Trigger a full STW (stop-the-world) pause unnecessarily
- Disrupt the generational hypothesis the GC is leveraging
- Worsen application latency

**2. It\'s non-deterministic.**
Even if it runs, you have no guarantee of:
- WHEN it runs (could be minutes later)
- WHAT gets collected (depends on reachability at collection time)
- HOW much memory is freed

**3. JVM flags can disable it:**
\`\`\`
-XX:+DisableExplicitGC
\`\`\`
With this flag, \`System.gc()\` becomes a **no-op**. Many production deployments enable this.

**4. Better alternatives exist:**
- Set objects to \`null\` if they\'re no longer needed (rarely necessary)
- Use weak/soft references for caches
- Tune JVM flags (\`-Xmx\`, \`-XX:+UseG1GC\`)
- Profile and fix actual leaks

**When You MIGHT Call It (Rare Cases):**

**1. Benchmarking:**
Force a clean state before measuring something else.
\`\`\`java
@Setup
public void setup() {
    System.gc();   // try to start each iteration with a clean heap
}
\`\`\`

**2. Right before a known long pause:**
E.g., before serving a request after long idle time, you might prefer the GC pause now rather than mid-request.

**3. After freeing many large objects:**
If you\'ve just dropped references to a large structure, hinting can help. Even then, prefer trusting the JVM.

**Real Behavior Differences:**

\`\`\`java
// Both equivalent:
System.gc();
Runtime.getRuntime().gc();

// Both behave like:
// "Dear JVM, please consider running garbage collection now. K thx."

// Both may be ignored if -XX:+DisableExplicitGC is set
\`\`\`

**\`System.gc()\` vs \`finalize()\`:**
- \`gc()\` triggers collection eligibility check
- \`finalize()\` is called during collection (deprecated since Java 9 — use \`Cleaner\` API instead)

**Production Anti-Pattern:**
\`\`\`java
// ❌ DON\'T do this
public void processLargeFile(File f) {
    var data = readEntireFile(f);
    process(data);
    data = null;
    System.gc();   // ← unnecessary; JVM will GC when needed
}
\`\`\`

**Summary:**
- \`System.gc()\` and \`Runtime.gc()\` are **identical** (former delegates to latter)
- Both are **hints**, not commands
- JVM is free to ignore them
- Can be disabled via \`-XX:+DisableExplicitGC\`
- **Almost never use them in production** — let the GC do its job
- Useful in benchmarks or extremely specific perf-sensitive cases`
    },
    {
      id: 20,
      category: 'Serialization',
      difficulty: 'Medium',
      question: 'Difference between serialization and deserialization?',
      answer: `**Serialization vs Deserialization:**

These are inverse operations for converting between in-memory Java objects and a byte stream that can be persisted or transmitted.

**Serialization:**
**Object → byte stream**
\`\`\`java
ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream("user.ser"));
User user = new User("Alice", 30);
out.writeObject(user);   // Object → bytes → file
out.close();
\`\`\`

**Deserialization:**
**byte stream → Object**
\`\`\`java
ObjectInputStream in = new ObjectInputStream(new FileInputStream("user.ser"));
User restored = (User) in.readObject();   // bytes → Object
in.close();
\`\`\`

**Visual:**
\`\`\`
   Serialization              Deserialization
┌──────────┐                 ┌──────────┐
│ User obj │ ─── bytes ───►  │ user.ser │
│ in heap  │                 │ on disk  │
└──────────┘                 └──────────┘
                                   │
                                   ▼
┌──────────┐                 ┌──────────┐
│ User obj │ ◄── bytes ───   │ user.ser │
│ in heap  │                 │ on disk  │
└──────────┘                 └──────────┘
\`\`\`

**Requirements:**

**Class must implement \`Serializable\`:**
\`\`\`java
import java.io.Serializable;

public class User implements Serializable {
    private static final long serialVersionUID = 1L;

    private String name;
    private int age;
    private transient String password;   // skipped during serialization

    // constructors, getters, setters
}
\`\`\`

**\`Serializable\` is a marker interface** — has no methods. It just signals "I can be serialized."

**Key Properties:**

| Aspect | Serialization | Deserialization |
|--------|---------------|-----------------|
| Direction | Object → bytes | bytes → Object |
| Method | \`writeObject()\` | \`readObject()\` |
| Calls constructor? | N/A | NO (uses reflection) |
| Output | Stream / file / network | Live object in memory |
| Use case | Save state, send over network | Restore, receive |

**Important: Deserialization Skips the Constructor!**
\`\`\`java
public class User implements Serializable {
    public User(String name) {
        System.out.println("Constructor called");   // NOT printed during deserialization
    }
}

User u = (User) in.readObject();   // No "Constructor called" output
// Object is reconstructed from bytes via reflection
\`\`\`

**The \`transient\` Keyword:**
Marks fields that should be **excluded** from serialization.
\`\`\`java
public class Session implements Serializable {
    String userId;             // serialized
    transient String secret;    // NOT serialized (security)
    transient Connection conn;  // NOT serialized (not serializable)
}
\`\`\`

**\`static\` Fields Are NOT Serialized:**
Static fields belong to the class, not the instance, so they\'re skipped.

**Common Use Cases:**
- **Persistence:** Save object state to disk
- **Network communication:** Send objects across processes (RMI, RPC)
- **Caching:** Serialize to Redis, Memcached
- **Deep cloning:** Serialize then deserialize an object (a hack, but works)
- **Session storage:** Save HTTP session state

**Performance & Security Concerns:**

**Performance:**
Java\'s default serialization is **slow and produces large output**. Alternatives:
- **JSON** (Jackson, Gson) — human-readable
- **Protocol Buffers** — fast, compact, schema-evolving
- **Kryo** — faster Java serialization
- **MessagePack, Avro** — efficient binary

**Security:**
Deserialization is a major attack vector. Maliciously crafted byte streams can execute arbitrary code (Java deserialization vulnerabilities).
- Use **\`ObjectInputFilter\`** (Java 9+) to whitelist classes
- Avoid Java serialization for untrusted input
- Prefer JSON/Proto for external boundaries

**Modern Alternative — Java 14+ Records:**
Records are inherently serializable with built-in equals/hashCode/toString.

**Summary:**
- **Serialization:** Object → bytes (\`writeObject\`)
- **Deserialization:** bytes → Object (\`readObject\`, **skips constructor**)
- Class must implement **\`Serializable\`**
- Use \`transient\` to skip fields; \`static\` fields are auto-skipped
- Java\'s default serialization is **slow and risky** — prefer JSON / Proto Buf for production`
    },
    {
      id: 21,
      category: 'Serialization',
      difficulty: 'Medium',
      question: 'What is serialVersionUID?',
      answer: `**serialVersionUID:**

A \`static final long\` field that uniquely identifies a class\'s serialized form. Used during deserialization to verify that the sender and receiver of a serialized object have loaded **compatible classes**.

**Declaration:**
\`\`\`java
public class User implements Serializable {
    private static final long serialVersionUID = 1L;

    private String name;
    private int age;
}
\`\`\`

**Why It Exists:**

When you serialize an object, the JVM stores a "version stamp" with the bytes. When deserializing, it compares the stamp on disk with the current class\'s \`serialVersionUID\`:

- **Match** → proceed with deserialization ✓
- **Mismatch** → throw \`InvalidClassException\` ✗

This protects you from accidentally deserializing data into an incompatible class.

**Example:**
\`\`\`java
// Version 1 — saved to disk
class User implements Serializable {
    private static final long serialVersionUID = 1L;
    String name;
}

User u1 = new User();
u1.name = "Alice";
serialize(u1, "user.ser");
\`\`\`

\`\`\`java
// Version 2 — class evolved
class User implements Serializable {
    private static final long serialVersionUID = 1L;   // SAME UID = compatible
    String name;
    int age;     // new field — defaults to 0 on deserialize
}

User u2 = (User) deserialize("user.ser");
// u2.name = "Alice", u2.age = 0    ✓ Works fine
\`\`\`

**Mismatch Example:**
\`\`\`java
// Version 3 — incompatible change
class User implements Serializable {
    private static final long serialVersionUID = 2L;   // CHANGED
    String name;
}

User u3 = (User) deserialize("user.ser");
// java.io.InvalidClassException:
//   local class incompatible:
//   stream classdesc serialVersionUID = 1
//   local class serialVersionUID = 2
\`\`\`

**What If You DON\'T Declare It?**

The JVM **auto-generates** one based on:
- Class name
- Modifiers
- Implemented interfaces
- Fields, methods, and their signatures

This is **dangerous** because:
- Auto-generated value depends on compiler version (different IDEs/JDKs may produce different values)
- ANY change to the class (even adding a private method) can change the auto-generated UID
- Causes \`InvalidClassException\` on minor refactoring

**Best Practice:**
**Always explicitly declare \`serialVersionUID\`** for any \`Serializable\` class:

\`\`\`java
public class User implements Serializable {
    private static final long serialVersionUID = 1L;   // ← always declare
    // ...
}
\`\`\`

**When to Increment serialVersionUID:**

Increment ONLY when you make **incompatible** changes:
- Removing a field
- Changing field type
- Changing class hierarchy
- Renaming a field

**Compatible changes** (keep UID the same):
- Adding new fields (old serialized data deserializes with default values)
- Adding new methods
- Removing methods
- Changing transient/static modifiers

**IDE Support:**
Most IDEs (IntelliJ, Eclipse) warn or auto-generate \`serialVersionUID\` for serializable classes. In IntelliJ:
\`\`\`
Settings → Inspections → Java → Serialization issues
→ "Serializable class without serialVersionUID"
\`\`\`

**Computing UIDs Manually:**
Use the JDK tool:
\`\`\`bash
serialver -classpath . com.example.User
# → static final long serialVersionUID = 1234567890L;
\`\`\`

**Common Pattern: Version 1**
\`\`\`java
private static final long serialVersionUID = 1L;
\`\`\`

Most teams just start at \`1L\` and increment only on incompatible changes. The exact value doesn\'t matter — only that sender and receiver agree.

**Convention by Some Teams:**
\`\`\`java
private static final long serialVersionUID = 20240115L;   // YYYYMMDD
\`\`\`

**Modern Alternatives:**
For new code, prefer:
- **JSON** with versioning headers
- **Protocol Buffers** with explicit schema versioning
- **Avro** with schema evolution

These avoid Java serialization\'s versioning headaches entirely.

**Summary:**
- \`serialVersionUID\` = version stamp for serializable classes
- **Always declare it explicitly** (auto-generation is fragile)
- **Same UID** across versions = compatible
- **Different UID** = \`InvalidClassException\`
- Increment **only** on incompatible changes (field removal/type change)
- Common starting value: \`1L\``
    },
    {
      id: 22,
      category: 'OOP Principles',
      difficulty: 'Medium',
      question: 'How many ways are there to create an object in Java?',
      answer: `**Five Main Ways to Create Objects:**

**1. \`new\` keyword (most common — ~99% of cases):**
\`\`\`java
User user = new User("Alice", 30);
\`\`\`
Calls a constructor; allocates on heap; runs all field initializers and static blocks (first time).

**2. Reflection — \`Class.newInstance()\` / \`Constructor.newInstance()\`:**
\`\`\`java
// Old way (deprecated since Java 9 — limited to no-arg ctors)
Class<?> cls = Class.forName("com.example.User");
User u1 = (User) cls.newInstance();

// Modern way
Constructor<?> ctor = cls.getDeclaredConstructor(String.class, int.class);
User u2 = (User) ctor.newInstance("Bob", 25);
\`\`\`

Used by frameworks: Spring DI, Hibernate, Jackson, JUnit.

**3. \`clone()\` — copy an existing object:**
\`\`\`java
public class User implements Cloneable {
    String name;

    @Override
    public User clone() throws CloneNotSupportedException {
        return (User) super.clone();   // shallow copy by default
    }
}

User a = new User("Alice");
User b = a.clone();   // separate object, same field values
\`\`\`

**Shallow vs deep clone:**
- Default \`clone()\` is **shallow** — nested object references are shared
- For deep copy, override and recursively clone

**4. Deserialization — \`ObjectInputStream.readObject()\`:**
\`\`\`java
try (ObjectInputStream in = new ObjectInputStream(new FileInputStream("user.ser"))) {
    User u = (User) in.readObject();
}
\`\`\`

**Important: deserialization does NOT call any constructor!** The object is reconstructed from bytes via reflection.

**5. Factory methods (static factory pattern):**
\`\`\`java
List<Integer> list = List.of(1, 2, 3);          // factory in JDK
LocalDate today = LocalDate.now();               // factory
User u = User.named("Alice");                    // user-defined factory
String s = String.valueOf(123);                   // primitive → String
Optional<User> opt = Optional.of(user);          // wrapper factory
\`\`\`

Static factories can:
- Return cached instances (\`Boolean.TRUE\`, \`Integer.valueOf()\`)
- Return subtypes
- Have descriptive names (clearer than overloaded constructors)

**Bonus: Less Common Ways**

**6. \`Class.getDeclaredConstructor().newInstance()\` (preferred over deprecated \`Class.newInstance()\`):**
\`\`\`java
User u = User.class.getDeclaredConstructor().newInstance();
\`\`\`

**7. \`Unsafe.allocateInstance()\` (avoid in production):**
\`\`\`java
Unsafe unsafe = ...;
User u = (User) unsafe.allocateInstance(User.class);
// Bypasses constructor entirely — fields are zeroed/null
\`\`\`

**8. Lambda / Functional Interface (creates anonymous instance):**
\`\`\`java
Runnable r = () -> System.out.println("hi");   // creates Runnable instance
\`\`\`

**Comparison Table:**

| Method | Calls Constructor? | Use Case |
|--------|-------------------|----------|
| \`new\` | Yes | Standard |
| Reflection | Yes | Frameworks (DI, ORM) |
| \`clone()\` | NO | Copy existing |
| Deserialization | NO | Restore from bytes |
| Factory method | Calls \`new\` internally | Controlled creation |
| \`Unsafe\` | NO | Internal/advanced |

**Best Practices (from Effective Java by Joshua Bloch):**

**Avoid \`clone()\`:**
- Broken by design (Cloneable is a fragile marker)
- Doesn\'t call constructors → bypasses validation
- **Prefer copy constructors** or **static factory methods**:

\`\`\`java
// Copy constructor
public User(User other) {
    this.name = other.name;
    this.age = other.age;
}

// Or static factory
public static User copyOf(User other) {
    return new User(other.name, other.age);
}
\`\`\`

**Prefer static factories over constructors:**
- Named (clearer intent)
- Can return cached/subtypes
- Don\'t need to create new instance every time

**Summary:**
- **5 main ways:** \`new\`, reflection, \`clone()\`, deserialization, factory methods
- **\`new\`** is the standard
- **Reflection** powers frameworks
- **\`clone()\` and deserialization** bypass constructors — be careful
- **Static factories** are often the cleanest approach
- Joshua Bloch recommends avoiding \`clone()\` in favor of copy constructors or factories`
    },
    {
      id: 23,
      category: 'OOP Principles',
      difficulty: 'Easy',
      question: 'Difference between constructor and method?',
      answer: `**Constructor vs Method:**

| Aspect | Constructor | Method |
|--------|-------------|--------|
| **Purpose** | Initialize object | Perform behavior |
| **Name** | Same as class | Any valid identifier |
| **Return type** | None (not even \`void\`) | Mandatory (any type or \`void\`) |
| **Inherited?** | NO | YES (unless private) |
| **Can be overridden?** | NO | YES |
| **Can be overloaded?** | YES | YES |
| **Modifiers allowed** | public, protected, private (not abstract/static/final) | All access modifiers + static, final, abstract |
| **Called automatically?** | YES (on \`new\`) | NO (must invoke) |
| **\`this()\` / \`super()\`** | Allowed (must be first) | Not allowed |

**Examples:**

**Constructor:**
\`\`\`java
public class User {
    private String name;
    private int age;

    // Constructor — same name as class, no return type
    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Default constructor (no-arg)
    public User() {
        this("Anonymous", 0);   // calls other constructor
    }
}

User u = new User("Alice", 30);   // constructor invoked automatically
\`\`\`

**Method:**
\`\`\`java
public class User {
    public String getName() {        // method — has return type
        return this.name;
    }

    public void setName(String name) {   // void return
        this.name = name;
    }

    public static User create() {     // static method — no instance needed
        return new User();
    }
}

User u = new User();
String name = u.getName();           // method invoked explicitly
\`\`\`

**Detailed Differences:**

**1. Name:**
- **Constructor:** MUST match the class name exactly
\`\`\`java
public class User {
    public User() { ... }   // ✓ matches class
    public class User user() { ... }   // ✗ this is a method, not constructor
}
\`\`\`

- **Method:** any valid identifier

**2. Return Type:**
- **Constructor:** No return type at all
\`\`\`java
public User() { ... }       // ✓
public void User() { ... }  // ✗ this is a METHOD named "User", not a constructor
\`\`\`

- **Method:** Must declare a return type (\`void\` for none)

**3. Inheritance:**
\`\`\`java
class Animal {
    public Animal() { ... }
    public void eat() { ... }
}

class Dog extends Animal {
    // Inherits eat() — can call directly
    // Does NOT inherit constructor — must call super(...)
    public Dog() {
        super();   // explicit call to parent constructor
    }
}

Dog d = new Dog();
d.eat();           // ✓ inherited method
new Dog().new Animal();   // ✗ can\'t call inherited constructor
\`\`\`

**4. Can\'t Override Constructors:**
\`\`\`java
class Parent {
    public Parent(int x) { ... }
}

class Child extends Parent {
    // public Parent(int x) { ... }   ← This would just be a new constructor of Child
    //                                   that happens to share the name. NOT overriding.

    public Child(int x) {              // Child has its OWN constructor
        super(x);                       // calls Parent\'s
    }
}
\`\`\`

**5. Special Calls in Constructors:**
\`\`\`java
public Foo() {
    super();      // call parent constructor — must be FIRST line
    this(arg);    // call another constructor — must be FIRST line
                  // can\'t use both
}

public void method() {
    super();      // ✗ ERROR — not allowed in methods
}
\`\`\`

**6. Modifier Restrictions:**

**Constructor:**
- ✓ \`public\`, \`protected\`, \`private\`, package-private
- ✗ \`static\` — constructors are tied to instance creation
- ✗ \`abstract\` — must have a body
- ✗ \`final\` — pointless (can\'t override anyway)
- ✗ \`synchronized\` — pointless (no other thread can see partially-constructed object)

**Method:**
- ✓ All access modifiers
- ✓ \`static\`, \`final\`, \`abstract\`, \`synchronized\`, \`native\`, \`strictfp\`

**7. Default Constructor:**
If you don\'t declare any constructor, the compiler adds a public no-arg one:
\`\`\`java
public class User {
    // implicit: public User() { super(); }
}
\`\`\`

If you declare ANY constructor, the default is NOT added.

**8. Object Initialization Order:**
1. Static blocks (once on class load)
2. Instance fields and instance initializer blocks
3. Constructor body

**Common Confusion — "Constructor with void":**
\`\`\`java
public class User {
    public void User() {   // ⚠️ This is a METHOD named "User", NOT a constructor!
        ...
    }
}

User u = new User();   // calls the IMPLICIT default constructor (compiler-generated)
                       // NOT the void User() method
\`\`\`

**Summary:**
- **Constructor** initializes a new object
- **Method** performs an operation
- Constructor: same name as class, no return type, called automatically on \`new\`
- Method: any name, has return type, called explicitly
- Both can be overloaded; only methods can be overridden`
    },
    {
      id: 24,
      category: 'OOP Principles',
      difficulty: 'Medium',
      question: 'What is a private constructor?',
      answer: `**Private Constructor:**

A constructor with the \`private\` access modifier — preventing instantiation from outside the class. Powerful enabler of several design patterns.

**Syntax:**
\`\`\`java
public class Database {
    private Database() {   // ← private — can\'t be called from outside
        // initialization
    }
}

Database db = new Database();   // ❌ COMPILE ERROR
\`\`\`

**4 Main Use Cases:**

**1. Singleton Pattern:**
Ensure only ONE instance of a class exists.
\`\`\`java
public class Database {
    private static final Database INSTANCE = new Database();

    private Database() { }   // can\'t be called from outside

    public static Database getInstance() {
        return INSTANCE;
    }
}

Database db = Database.getInstance();   // ✓
Database db2 = new Database();           // ✗ compile error
\`\`\`

**Eager initialization** — created at class load.

**Lazy Singleton (thread-safe with double-checked locking):**
\`\`\`java
public class Database {
    private static volatile Database instance;

    private Database() { }

    public static Database getInstance() {
        if (instance == null) {
            synchronized (Database.class) {
                if (instance == null) {
                    instance = new Database();
                }
            }
        }
        return instance;
    }
}
\`\`\`

**Best Singleton (Java 5+) — \`enum\`:**
\`\`\`java
public enum Database {
    INSTANCE;

    public void query(String sql) { ... }
}

Database.INSTANCE.query("SELECT 1");   // thread-safe, serialization-safe
\`\`\`

**2. Utility / Helper Classes:**
Classes with only static members — instantiation makes no sense.
\`\`\`java
public final class StringUtils {
    private StringUtils() {
        throw new AssertionError("No instances!");   // also blocks reflection
    }

    public static boolean isEmpty(String s) {
        return s == null || s.isEmpty();
    }

    public static String reverse(String s) { ... }
}

StringUtils.isEmpty("foo");   // ✓
new StringUtils();             // ✗ compile error
\`\`\`

JDK examples: \`Math\`, \`Collections\`, \`Arrays\`, \`Objects\` — all have private constructors.

**3. Static Factory Methods (controlled creation):**
Allow construction only through named methods.
\`\`\`java
public class User {
    private final String name;
    private final boolean admin;

    private User(String name, boolean admin) {
        this.name = name;
        this.admin = admin;
    }

    public static User regular(String name) {
        return new User(name, false);
    }

    public static User admin(String name) {
        return new User(name, true);
    }
}

User u1 = User.regular("Alice");   // clearer intent than constructor
User u2 = User.admin("Bob");
new User("Carol", false);           // ✗ compile error
\`\`\`

**Benefits:**
- Named methods (clearer than \`new User(true, false, 30)\`)
- Can return cached/subtype instances
- Can\'t accidentally subclass

**4. Builder Pattern:**
The constructor is private; only the Builder calls it.
\`\`\`java
public class Pizza {
    private final String size;
    private final List<String> toppings;

    private Pizza(Builder b) {              // private — only Builder calls this
        this.size = b.size;
        this.toppings = b.toppings;
    }

    public static class Builder {
        private String size;
        private List<String> toppings = new ArrayList<>();

        public Builder size(String s) { this.size = s; return this; }
        public Builder addTopping(String t) { toppings.add(t); return this; }
        public Pizza build() { return new Pizza(this); }
    }
}

Pizza p = new Pizza.Builder()
    .size("large")
    .addTopping("mushroom")
    .addTopping("pepper")
    .build();
\`\`\`

**Key Side Effect: Cannot Be Subclassed**

A class with **only private constructors cannot be extended** — children can\'t call any \`super(...)\`:

\`\`\`java
public class Final {
    private Final() {}
}

class Child extends Final {   // ❌ ERROR
    public Child() {
        super();              // can\'t access private constructor
    }
}
\`\`\`

This effectively makes the class **\`final\` without the \`final\` keyword**.

**Comparison: \`final\` vs Private Constructor:**

| Approach | Subclassing? | Instantiation outside? |
|----------|--------------|------------------------|
| \`final\` class | ❌ blocked | ✓ allowed |
| Private constructor only | ❌ blocked | ❌ blocked |
| Both | ❌ blocked | ❌ blocked |

**Bypass Attempts:**

**Reflection** can break private constructor:
\`\`\`java
Constructor<?> c = Database.class.getDeclaredConstructor();
c.setAccessible(true);
Database hack = (Database) c.newInstance();   // bypasses private!
\`\`\`

**Defense:** throw in the constructor if instance count exceeds 1:
\`\`\`java
private Database() {
    if (INSTANCE != null) {
        throw new IllegalStateException("Already instantiated");
    }
}
\`\`\`

**Or use \`enum\`** — reflection cannot create new enum instances.

**Summary:**
- Private constructor **blocks external instantiation**
- Used in **Singleton, utility classes, static factory pattern, Builder**
- Side effect: class **cannot be subclassed**
- Combine with \`final\` for double-protection
- Reflection can bypass — use \`enum\` for bulletproof singletons`
    },
    {
      id: 25,
      category: 'OOP Principles',
      difficulty: 'Medium',
      question: 'What is the Java static keyword and its uses?',
      answer: `**\`static\` Keyword:**

\`static\` indicates a member belongs to the **class itself**, not to any instance. One copy is shared across all instances and accessible without instantiation.

**5 Uses of \`static\`:**

**1. Static Fields (Class Variables):**
\`\`\`java
public class Counter {
    private static int totalCount = 0;     // shared across all instances
    private final int id;

    public Counter() {
        id = ++totalCount;                  // each instance increments shared counter
    }
}

Counter a = new Counter();    // totalCount = 1
Counter b = new Counter();    // totalCount = 2
Counter c = new Counter();    // totalCount = 3
\`\`\`

**Common patterns:**
- Constants: \`public static final int MAX_SIZE = 100;\`
- Counters / IDs
- Caches: \`private static Map<Key, Value> cache = ...;\`
- Configuration: \`public static final String VERSION = "1.0";\`

**2. Static Methods:**
\`\`\`java
public class Counter {
    private static int totalCount = 0;

    public static int getTotal() {       // static — no instance needed
        return totalCount;
    }
}

Counter.getTotal();   // ✓ called via class name
\`\`\`

**Restrictions:**
- Cannot access **instance** fields/methods directly (no \`this\`)
- Cannot use \`this\` or \`super\`
- Cannot be **overridden** (only **hidden** — resolved at compile time by reference type)

**Common patterns:**
- Utility methods: \`Math.sqrt()\`, \`Arrays.sort()\`
- Factory methods: \`List.of()\`, \`User.named()\`
- \`main()\` entry point

**3. Static Blocks (Initializer Blocks):**
\`\`\`java
public class Config {
    private static Map<String, String> settings;

    static {
        // Runs ONCE, when the class is loaded
        settings = new HashMap<>();
        settings.put("env", System.getenv("ENV"));
        settings.put("version", "1.0");
    }
}
\`\`\`

Used for complex static field initialization that needs:
- Multiple statements
- Exception handling
- Loading native libraries: \`System.loadLibrary("nativeLib");\`

**4. Static Nested Classes:**
\`\`\`java
public class Outer {
    public static class Inner {     // static nested — no implicit Outer reference
        public void hello() { ... }
    }
}

Outer.Inner inner = new Outer.Inner();   // can be created standalone
\`\`\`

**vs non-static (inner) class:**
\`\`\`java
public class Outer {
    public class Inner {            // non-static — holds Outer.this
    }
}

Outer.Inner inner = new Outer().new Inner();   // requires Outer instance
\`\`\`

Static nested classes don\'t hold a reference to the outer instance — useful for memory efficiency and avoiding accidental leaks.

**5. Static Imports:**
\`\`\`java
import static java.lang.Math.*;
import static java.util.Arrays.asList;

double r = sqrt(2);              // no Math. prefix
List<Integer> list = asList(1, 2, 3);
\`\`\`

Reduces verbosity but use sparingly — can hurt readability if overused.

**Bonus: \`static final\` for Constants:**
\`\`\`java
public class HttpStatus {
    public static final int OK = 200;
    public static final int NOT_FOUND = 404;
    public static final int SERVER_ERROR = 500;
}

if (response.code == HttpStatus.OK) { ... }
\`\`\`

**Initialization Order (when class is loaded):**
1. **Static fields** initialized in source order
2. **Static blocks** run in source order
3. (Then per instance) instance fields → instance blocks → constructor

\`\`\`java
public class Order {
    static int counter;
    int id;

    static    { counter = 0;    System.out.println("static block"); }
    {           id = ++counter;  System.out.println("instance: " + id); }

    public Order() {             System.out.println("ctor: " + id); }
}

new Order();   // static block (once), instance: 1, ctor: 1
new Order();   // instance: 2, ctor: 2  (no static again)
\`\`\`

**Pitfalls:**

**1. Threading:**
Static fields are shared across threads → race conditions without synchronization.
\`\`\`java
private static int counter = 0;

public static void increment() {
    counter++;   // ⚠️ NOT atomic!
}

// Fix:
private static AtomicInteger counter = new AtomicInteger(0);
public static void increment() { counter.incrementAndGet(); }
\`\`\`

**2. Memory leaks:**
Static collections that grow forever.
\`\`\`java
private static List<User> activeUsers = new ArrayList<>();   // ⚠️ never cleared
\`\`\`

**3. Hidden methods (NOT overridden):**
\`\`\`java
class Parent {
    public static void greet() { System.out.println("Parent"); }
}
class Child extends Parent {
    public static void greet() { System.out.println("Child"); }   // hides, not overrides
}

Parent p = new Child();
p.greet();   // "Parent" — resolved by reference type, not runtime type!
\`\`\`

**4. Tight coupling:**
Static methods are hard to mock in tests. Prefer instance methods + dependency injection.

**5. Order of Initialization issues:**
Forward references between static fields can cause subtle bugs:
\`\`\`java
static int a = b + 1;   // b not yet initialized → a = 1
static int b = 10;       // b initialized to 10 AFTER a
\`\`\`

**Best Practices:**
- Use \`static\` for utility methods and constants
- Avoid static **mutable** state (testing nightmare, threading risk)
- Prefer \`enum\` for stateful "static" patterns
- Use static nested classes when nested class doesn\'t need the outer

**Summary:**
- **\`static\` field** = one copy shared by all instances
- **\`static\` method** = called via class, no \`this\`
- **\`static\` block** = runs once when class is loaded
- **\`static\` nested class** = no outer reference
- **\`static\` import** = use without class prefix
- Use sparingly — static state is global state, with all the problems that implies`
    },
    {
      id: 26,
      category: 'JVM Internals',
      difficulty: 'Easy',
      question: 'Explain public static void main(String args[])',
      answer: `**The Java Entry Point: \`public static void main(String[] args)\`**

This signature is the conventional starting point for any Java application. The JVM looks for this exact signature when you run \`java MyClass\`.

**Breaking Down Each Keyword:**

**1. \`public\`:**
- Access modifier
- The JVM (which is OUTSIDE your class\'s package) needs to call this method
- Must be \`public\` so the JVM can access it from any package

**2. \`static\`:**
- Belongs to the class itself, not to an instance
- The JVM doesn\'t want to instantiate your class to call \`main\` — chicken-and-egg problem
- \`static\` allows calling without \`new MyClass()\` first

**3. \`void\`:**
- No return value
- Programs return exit codes via \`System.exit(int)\` instead
- Java doesn\'t use the C-style \`int main()\` convention

**4. \`main\`:**
- The conventional method name JVM looks up
- Must be exactly \`main\` (case-sensitive)
- Hardcoded in the JVM specification

**5. \`String[] args\`:**
- Receives command-line arguments
- Each argument is an element in the array
- Empty array if no arguments (NOT null)

**Visual:**
\`\`\`
public  static  void  main  (String[]  args)
   │       │      │     │       │         │
   │       │      │     │       │         └── command-line arguments
   │       │      │     │       └── parameter type
   │       │      │     └── method name (fixed)
   │       │      └── return type (no return value)
   │       └── no instance needed
   └── accessible by JVM
\`\`\`

**Example:**
\`\`\`java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.println("Got " + args.length + " arguments:");
        for (int i = 0; i < args.length; i++) {
            System.out.println("  args[" + i + "] = " + args[i]);
        }
    }
}
\`\`\`

\`\`\`bash
$ java Hello foo bar baz
Hello, World!
Got 3 arguments:
  args[0] = foo
  args[1] = bar
  args[2] = baz
\`\`\`

**Allowed Variations:**

**Different array syntax:**
\`\`\`java
public static void main(String[] args)    // most common
public static void main(String args[])    // C-style — also legal
\`\`\`

**Varargs:**
\`\`\`java
public static void main(String... args)   // ✓ also legal (varargs is just String[])
\`\`\`

**Different parameter name:**
\`\`\`java
public static void main(String[] arguments)   // ✓ name doesn\'t matter
public static void main(String[] x)            // ✓ also fine
\`\`\`

**Modifier order can vary:**
\`\`\`java
static public void main(String[] args)   // ✓ legal but unconventional
\`\`\`

**Required Properties:**
- ✅ Must be \`public\`
- ✅ Must be \`static\`
- ✅ Must return \`void\`
- ✅ Must be named \`main\`
- ✅ Must take \`String[]\` (or \`String...\`) parameter

**Common Mistakes:**

\`\`\`java
public void main(String[] args) { ... }
// ❌ Missing static — JVM can\'t call (would need an instance)

public static int main(String[] args) { ... }
// ❌ Wrong return type — must be void

public static void main(String args) { ... }
// ❌ Wrong parameter type — must be array

public static void Main(String[] args) { ... }
// ❌ Wrong case — JVM looks for "main" specifically

private static void main(String[] args) { ... }
// ❌ Not public — JVM can\'t call
\`\`\`

**Exit Codes:**
\`\`\`java
public static void main(String[] args) {
    if (args.length == 0) {
        System.err.println("Usage: java MyApp <input>");
        System.exit(1);   // non-zero = error
    }
    // ... process
    System.exit(0);   // optional — 0 is implicit if main returns normally
}
\`\`\`

**Multiple main Methods (Overloading):**
\`\`\`java
public class App {
    public static void main(String[] args) {        // ← JVM calls this
        main("custom");
    }

    public static void main(String s) {              // overload — only callable from code
        System.out.println(s);
    }
}
\`\`\`

JVM only calls the canonical \`main(String[])\`. Other overloads are just regular methods.

**\`args\` is Never \`null\`:**
\`\`\`java
public static void main(String[] args) {
    if (args.length == 0) {                        // safe to check length
        // no arguments — args is an empty array, NOT null
    }
}
\`\`\`

**Java 21+ — Simplified Entry Points (JEP 445, Preview):**
\`\`\`java
// Hello.java — no class needed!
void main() {
    System.out.println("Hello, world!");
}
\`\`\`

JEP 445 lets you skip \`public\`, \`static\`, the class declaration, and even \`String[] args\`.

**Run with:** \`java --enable-preview --source 21 Hello.java\`

**Summary:**
- \`public\` — JVM needs access
- \`static\` — no instance needed
- \`void\` — no return value
- \`main\` — fixed name (case-sensitive)
- \`String[] args\` — command-line arguments
- All five components are **required** (until Java 21+ preview features relax this)`
    },
    {
      id: 27,
      category: 'JVM Internals',
      difficulty: 'Easy',
      question: 'Can we run a program with `static void main(String args[])` (without public)?',
      answer: `**Short Answer: NO (in pre-Java 21 / standard Java).**

The JVM specifically requires \`public static void main(String[] args)\`. Without \`public\`, the JVM cannot find/access the method and reports:

\`\`\`
Error: Main method not found in class Test, please define the main method as:
   public static void main(String[] args)
\`\`\`

**Demonstration:**
\`\`\`java
class Test {
    static void main(String[] args) {        // missing 'public'
        System.out.println("Hello");
    }
}
\`\`\`

\`\`\`bash
$ javac Test.java
$ java Test
Error: Main method not found in class Test, please define the main method as:
   public static void main(String[] args)
or a JavaFX application class must extend javafx.application.Application
\`\`\`

**Why \`public\` Is Required:**

The JVM is launching from outside your class — typically via \`sun.launcher.LauncherHelper\`. Java\'s access control requires the method to be **publicly accessible** for the launcher to call it.

**What\'s Checked at Launch:**

The launcher specifically looks for a method matching:
\`\`\`java
public static void main(String[])
\`\`\`

It checks:
1. ✅ Method named \`main\`
2. ✅ Returns \`void\`
3. ✅ Takes \`String[]\` parameter
4. ✅ Is \`static\`
5. ✅ Is \`public\`   ← **fails here without it**

If any check fails, you get the "Main method not found" error.

**Other Modifier Variations:**

**Without \`static\`:**
\`\`\`java
public void main(String[] args) { ... }
\`\`\`
❌ Same error — JVM would need an instance, but cannot create one without the chicken-and-egg.

**\`private\`:**
\`\`\`java
private static void main(String[] args) { ... }
\`\`\`
❌ Same error — not accessible.

**\`protected\`:**
\`\`\`java
protected static void main(String[] args) { ... }
\`\`\`
❌ Same error — not public.

**Package-private (default):**
\`\`\`java
static void main(String[] args) { ... }
\`\`\`
❌ Same error — not accessible from JVM\'s package.

**\`final\`:**
\`\`\`java
public static final void main(String[] args) { ... }
\`\`\`
✅ Works! \`final\` is allowed (just unusual).

**\`synchronized\`:**
\`\`\`java
public static synchronized void main(String[] args) { ... }
\`\`\`
✅ Works (also unusual).

**Different Return Type:**
\`\`\`java
public static int main(String[] args) { ... }
\`\`\`
❌ Same error — must be \`void\`.

**Wrong Parameter:**
\`\`\`java
public static void main(int[] args) { ... }
public static void main()              { ... }
public static void main(String args)   { ... }
\`\`\`
❌ Must be \`String[]\` (or varargs \`String...\` which is the same thing).

**Java 21+ Game-Changer (JEP 445, Preview):**

In Java 21+, "Unnamed Classes and Instance Main Methods" relaxes ALL these rules:

\`\`\`java
// Hello.java — no class declaration needed!
void main() {
    System.out.println("Hello!");
}
\`\`\`

Allowed variations:
\`\`\`java
void main()                              // simplest
void main(String[] args)                 // with args
public void main()                       // explicit public — works too
static void main()                       // optional static
public static void main(String[] args)    // traditional, still works
\`\`\`

**Run with preview flag:**
\`\`\`bash
java --enable-preview --source 21 Hello.java
\`\`\`

**Why JEP 445?**
Lower the barrier for beginners — they shouldn\'t need to know about \`public static void\` and class declarations on day one.

**Common Interview Followup Questions:**

**Q: Can main be private?**
A: No (pre-Java 21). The JVM cannot access a private method from outside.

**Q: Can main be in a private class?**
A: No — JVM cannot load a private top-level class. Inner classes can\'t hold static unless they\'re also static — getting complicated quickly.

**Q: Can you have multiple \`main\` methods?**
A: Yes, via overloading — but only \`main(String[])\` is the JVM entry point:
\`\`\`java
public class App {
    public static void main(String[] args) {        // ← JVM calls this
        main("from main");
        main(42);
    }
    public static void main(String s) { ... }       // overload (callable from code)
    public static void main(int n)    { ... }       // overload
}
\`\`\`

**Q: Can main be in an interface?**
A: Yes! Since Java 8 added static methods on interfaces:
\`\`\`java
public interface App {
    public static void main(String[] args) {
        System.out.println("From an interface!");
    }
}
\`\`\`
\`java App\` runs this fine.

**Summary:**
- ❌ **Can\'t run \`static void main\`** without \`public\` (pre-Java 21)
- The JVM needs \`public\` to access \`main\` from outside your package
- Removing any of \`public\`, \`static\`, \`void\`, or \`String[]\` causes the same "Main method not found" error
- ✅ **Java 21+ preview** (JEP 445) allows dropping \`public\`, \`static\`, the class itself, and even \`args\``
    },
    {
      id: 28,
      category: 'JVM Internals',
      difficulty: 'Easy',
      question: 'What is System.out.println()?',
      answer: `**Breaking Down \`System.out.println()\`:**

This is the most common output statement in Java, but each part has a specific role.

**Three Components:**

**1. \`System\`:**
A \`final class\` in the \`java.lang\` package. Provides:
- Standard input/output streams (\`in\`, \`out\`, \`err\`)
- Environment variables (\`System.getenv\`)
- System properties (\`System.getProperty\`)
- Current time (\`System.currentTimeMillis\`)
- Process exit (\`System.exit\`)

\`\`\`java
public final class System {
    public static final InputStream  in;     // standard input
    public static final PrintStream  out;    // standard output
    public static final PrintStream  err;    // standard error

    private System() { }   // can\'t be instantiated
}
\`\`\`

**2. \`out\`:**
A \`public static final PrintStream\` field of \`System\`.

- **\`public\`** — accessible everywhere
- **\`static\`** — accessed via class (not instance)
- **\`final\`** — cannot be reassigned... but wait, \`System.setOut()\` exists?! (See below.)
- **\`PrintStream\`** — the class that knows how to print to a stream

The JVM initializes \`System.out\` at startup, connecting it to the OS\'s standard output (usually the console).

**3. \`println()\`:**
An **instance method** on \`PrintStream\`. Prints the argument followed by a newline.

\`\`\`java
public class PrintStream extends FilterOutputStream {
    public void println(String x) {
        synchronized (this) {        // ⚠️ synchronized
            print(x);
            newLine();
        }
    }
}
\`\`\`

**Visual:**
\`\`\`
System . out . println ( "Hello" )
   │       │       │           │
   │       │       │           └── argument
   │       │       └── method on PrintStream (prints + newline)
   │       └── PrintStream field (standard output)
   └── java.lang.System class
\`\`\`

**Variants:**
\`\`\`java
System.out.println();              // empty line (just newline)
System.out.println("text");         // text + newline
System.out.println(42);             // converts int → String
System.out.println(true);           // converts boolean → String
System.out.println(myObject);       // calls myObject.toString()

System.out.print("text");           // NO newline
System.out.printf("%d%n", n);       // formatted
System.out.write(byte);              // write raw byte
\`\`\`

**Why \`out\` Is Static:**
Lets you write \`System.out.println(...)\` instead of:
\`\`\`java
new System().out.println(...);   // ❌ System has private constructor anyway
\`\`\`

**Redirecting Output (despite \`final\`!):**
\`\`\`java
PrintStream original = System.out;
System.setOut(new PrintStream(new FileOutputStream("log.txt")));
System.out.println("This goes to log.txt");
System.setOut(original);   // restore
\`\`\`

**How does \`setOut\` work despite \`final\`?**
\`System.setOut()\` uses a **native method** to bypass Java\'s \`final\` modifier — a special hatch reserved for redirecting standard streams.

\`\`\`java
public static void setOut(PrintStream out) {
    checkIO();
    setOut0(out);   // native method — bypasses 'final'
}

private static native void setOut0(PrintStream out);
\`\`\`

**Performance Pitfall — Synchronization:**

\`println()\` is **\`synchronized\` on the \`PrintStream\`**. This means concurrent threads serialize through it:

\`\`\`java
// In a tight loop, this is SLOW:
for (int i = 0; i < 1_000_000; i++) {
    System.out.println(i);    // ⚠️ synchronized — bottleneck under load
}
\`\`\`

**Production-grade alternatives:**
\`\`\`java
// SLF4J — async appenders, lazy formatting, log levels
logger.info("User {} logged in", user.id);

// Formatted output
System.out.printf("%d items%n", count);
System.out.println(String.format("%.2f", price));

// Lazy supplier (avoid expensive toString if log level disabled)
log.debug(() -> "Heavy: " + heavyToString(obj));
\`\`\`

**Auto-flushing:**
\`System.out\` is created with **auto-flush enabled** — it flushes after every \`println()\` (but not \`print()\`). This is why output appears in the console immediately.

**\`System.out\` vs \`System.err\`:**
\`\`\`java
System.out.println("normal output");   // stdout (often buffered)
System.err.println("error output");     // stderr (typically unbuffered)
\`\`\`

In shells:
\`\`\`bash
java MyApp > out.txt 2> err.txt   # redirect each separately
java MyApp 2>&1 | grep ERROR       # merge stderr into stdout
\`\`\`

**Internal Mechanism (simplified):**
\`\`\`
System.out.println("Hello")
   │
   ▼ println() calls print() then newLine()
PrintStream.print("Hello")
   │
   ▼ writes UTF-8 bytes to underlying OutputStream
FilterOutputStream → BufferedOutputStream → FileOutputStream(stdout fd)
   │
   ▼ OS write() syscall
Console / Terminal
\`\`\`

**Common Misconceptions:**

**Myth:** "\`System.out\` is a method."
**Reality:** It\'s a **field** of type \`PrintStream\`. \`println\` is the method.

**Myth:** "\`println\` is async."
**Reality:** It\'s synchronous and auto-flushing. Use logging frameworks for async.

**Myth:** "\`final\` means \`out\` can\'t be changed."
**Reality:** Java code can\'t reassign it, but \`System.setOut()\` uses native code to swap it.

**Modern Alternatives:**
\`\`\`java
// Java 9+ — System.out improvements
System.out.println("hello");                    // classic

// Logging (preferred in apps)
import org.slf4j.Logger;
logger.info("structured message: {}", obj);

// java.util.logging
java.util.logging.Logger.getLogger(...).info(...);

// Console
System.console().writer().println("interactive");
\`\`\`

**Summary:**
- **\`System\`** — class providing standard streams
- **\`out\`** — \`public static final PrintStream\` field for stdout
- **\`println\`** — synchronized method that prints + newline
- Auto-flushing means output appears immediately
- \`System.setOut()\` can redirect (uses native code despite \`final\`)
- **For production logging, use SLF4J / Log4j** — not \`System.out\``
    },
    {
      id: 29,
      category: 'OOP Principles',
      difficulty: 'Easy',
      question: 'What is a static block?',
      answer: `**Static Initializer Block:**

A block of code marked with \`static {}\` that runs **ONCE** when the class is first loaded by the JVM — **before** any constructor, **before** \`main()\`, **before** any static method is called.

**Syntax:**
\`\`\`java
public class Config {
    static int maxConnections;
    static Map<String, String> settings;

    static {                                  // ← static block
        System.out.println("Class loaded");
        maxConnections = 10;
        settings = new HashMap<>();
        settings.put("env", System.getenv("ENV"));
    }
}
\`\`\`

**When It Runs:**
The first time the class is **loaded** — typically when:
- You first reference the class (\`Config.someField\`)
- You first create an instance (\`new Config()\`)
- You call a static method (\`Config.someMethod()\`)
- You explicitly load it (\`Class.forName("Config")\`)

**It does NOT re-run** for subsequent uses.

**Multiple Static Blocks:**
\`\`\`java
public class MultiBlock {
    static int x;
    static int y;

    static {
        x = 10;
        System.out.println("First block: x = " + x);
    }

    static int z = 20;        // static field initializer

    static {
        y = x + z;
        System.out.println("Second block: y = " + y);
    }
}

// Output (in order):
// First block: x = 10
// Second block: y = 30
\`\`\`

Static blocks and static field initializers run **in source order**.

**Common Use Cases:**

**1. Loading Native Libraries:**
\`\`\`java
public class NativeWrapper {
    static {
        System.loadLibrary("nativeLib");   // load JNI library at class load
    }

    public native int compute(int x);
}
\`\`\`

**2. Reading Configuration:**
\`\`\`java
public class AppConfig {
    static Properties props;

    static {
        props = new Properties();
        try (InputStream in = AppConfig.class.getResourceAsStream("/app.properties")) {
            props.load(in);
        } catch (IOException e) {
            throw new ExceptionInInitializerError(e);
        }
    }
}
\`\`\`

**3. Initializing Complex Static Fields:**
\`\`\`java
public class Lookup {
    private static final Map<String, Integer> ROMAN_NUMERALS;

    static {
        ROMAN_NUMERALS = new HashMap<>();
        ROMAN_NUMERALS.put("I", 1);
        ROMAN_NUMERALS.put("V", 5);
        ROMAN_NUMERALS.put("X", 10);
        ROMAN_NUMERALS.put("L", 50);
        // ... etc
    }
}
\`\`\`

**4. Driver Registration (legacy JDBC):**
\`\`\`java
public class Driver {
    static {
        DriverManager.registerDriver(new Driver());
    }
}

// Class.forName("com.mysql.jdbc.Driver") triggers the static block
\`\`\`

**Initialization Order:**

When you create an instance of a class, the order is:
1. **Static blocks** + static field initializers (only on first class load)
2. **Instance initializer blocks** + instance field initializers
3. **Constructor body**

**Example showing order:**
\`\`\`java
public class Order {
    static int counter = 0;
    int id;

    static {
        System.out.println("static block");
        counter = 0;
    }

    {
        id = ++counter;
        System.out.println("instance block: " + id);
    }

    public Order() {
        System.out.println("ctor: " + id);
    }
}

// Test:
new Order();   // static block, instance block: 1, ctor: 1
new Order();   // instance block: 2, ctor: 2  (static block does NOT run again)
\`\`\`

**Inheritance Order:**
For \`Child extends Parent\`:
1. \`Parent\` static blocks
2. \`Child\` static blocks
3. \`Parent\` instance blocks + constructor
4. \`Child\` instance blocks + constructor

\`\`\`java
class Parent {
    static { System.out.println("Parent static"); }
    { System.out.println("Parent instance"); }
    Parent() { System.out.println("Parent ctor"); }
}

class Child extends Parent {
    static { System.out.println("Child static"); }
    { System.out.println("Child instance"); }
    Child() { System.out.println("Child ctor"); }
}

new Child();
// Parent static
// Child static
// Parent instance
// Parent ctor
// Child instance
// Child ctor
\`\`\`

**Static Block vs Instance Block:**

| Feature | Static Block | Instance Block |
|---------|--------------|----------------|
| Syntax | \`static { }\` | \`{ }\` |
| Runs when | Class loaded (once) | Each \`new\` (per instance) |
| Can access | Static members only | Static + instance members |
| Has \`this\`? | No | Yes |

**Pitfalls:**

**1. Exceptions:**
If a static block throws, the class **fails to load** and you get \`ExceptionInInitializerError\`. The class becomes unusable for the JVM lifetime.

\`\`\`java
public class Broken {
    static {
        throw new RuntimeException("oops");
    }
}

new Broken();   // ExceptionInInitializerError
new Broken();   // NoClassDefFoundError (class is now permanently broken)
\`\`\`

**2. Forward References:**
\`\`\`java
public class ForwardRef {
    static int a = b + 1;   // ⚠️ b not yet initialized → 0 + 1 = 1
    static int b = 10;       // initialized to 10
    // a remains 1, NOT 11!
}
\`\`\`

**3. Cyclic Initialization:**
\`\`\`java
class A {
    static int x = B.y;
}
class B {
    static int y = A.x;
}
// Both end up as 0 — JVM detects cycle, breaks it with default values
\`\`\`

**4. Order of Class Loading is Lazy:**
\`\`\`java
class Util {
    static { System.out.println("Util loaded"); }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("Before reference");
        Util.someMethod();   // Util is loaded HERE, not earlier
        System.out.println("After reference");
    }
}

// Output:
// Before reference
// Util loaded
// After reference
\`\`\`

**Comparison: Constructor vs Static Block:**

| Feature | Constructor | Static Block |
|---------|-------------|--------------|
| Runs per | instance | class load |
| Number of times | Many (1 per \`new\`) | Once |
| Can reference \`this\` | Yes | No |
| Initializes | Instance fields | Static fields |
| Inherited? | No (called via super) | No (parent\'s runs first) |

**Summary:**
- **Static block** = code that runs **once** when class is loaded
- Used for **complex static initialization** (multi-line, exception-prone, native libs)
- Runs **before** constructors and \`main()\`
- Multiple blocks run in **source order**
- \`Parent\` static → \`Child\` static → instance setup
- Exceptions → \`ExceptionInInitializerError\` → class permanently broken`
    },
    {
      id: 30,
      category: 'JVM Internals',
      difficulty: 'Medium',
      question: 'Can we execute a program without the main() method?',
      answer: `**Short Answer:**

- **Pre-Java 7:** YES — using static initializer blocks (the classic trick)
- **Java 7+:** NO — JVM checks for \`main\` BEFORE class initialization runs
- **Java 21+ (preview):** YES — using JEP 445 instance main methods

**The Classic Pre-Java 7 Trick:**

\`\`\`java
public class NoMain {
    static {
        System.out.println("Hello without main!");
        System.exit(0);   // ← exit before JVM looks up main()
    }
}
\`\`\`

\`\`\`bash
$ java NoMain
\`\`\`

**Java 6 output:**
\`\`\`
Hello without main!
\`\`\`
✓ Worked. The static block ran first, called \`System.exit(0)\`, and the JVM never got around to checking for \`main\`.

**Java 7+ output:**
\`\`\`
Hello without main!
Error: Main method not found in class NoMain
\`\`\`
The static block still runs, but the JVM **also** complains afterward.

**Why It Stopped Working in Java 7:**

In Java 7+, the JVM\'s main-method lookup happens **BEFORE class initialization**. So even \`System.exit()\` in a static block can\'t prevent the "Main method not found" error.

**Order of Operations:**

**Java 6:**
\`\`\`
1. Load class
2. Initialize class (run static blocks)   ← System.exit happens here
3. Look up main method
4. Invoke main
\`\`\`

**Java 7+:**
\`\`\`
1. Load class
2. Look up main method                     ← FAILS HERE if no main
3. Initialize class (run static blocks)
4. Invoke main
\`\`\`

**Other Ways to "Run Code Without main":**

**1. Library / Utility Classes (most common):**
\`\`\`java
public class StringUtils {
    public static boolean isEmpty(String s) {
        return s == null || s.isEmpty();
    }
}
\`\`\`
Used by other code: \`StringUtils.isEmpty("foo")\` — never has \`main\`, never started directly.

**2. Servlets — Container Provides Entry:**
\`\`\`java
public class MyServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) {
        // entry point — Tomcat/Jetty calls this
    }
}
\`\`\`
Tomcat does have a \`main\` somewhere internally; your servlet doesn\'t need one.

**3. JUnit Tests — Test Runner Entry:**
\`\`\`java
public class MyTest {
    @Test
    void testSomething() {
        assertEquals(1, 1);   // runner provides entry, no main here
    }
}
\`\`\`

\`mvn test\` or \`./gradlew test\` invokes the JUnit runner, which loads test classes and calls \`@Test\` methods reflectively.

**4. Spring Boot Apps — Has main, but barely:**
\`\`\`java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);   // 1-line main
    }
}
\`\`\`
Technically has \`main\`, but the bulk of your code (controllers, services) doesn\'t.

**5. \`@FunctionalInterface\` Lambda Shorthand:**
\`\`\`java
public interface Greeter {
    void greet(String name);
}
\`\`\`
Has no \`main\` — used as type for lambdas.

**6. Java 11+ — Source File Mode:**
\`\`\`bash
java HelloWorld.java
\`\`\`
Still needs \`main\` in the file, but skips the explicit \`javac\` step.

**7. JShell (Java 9+) — REPL:**
\`\`\`bash
$ jshell
jshell> System.out.println("No main needed!");
No main needed!
\`\`\`
JShell evaluates code interactively. No \`main\` anywhere.

**8. Java 21+ JEP 445 — Instance Main Methods (Preview):**
\`\`\`java
// Hello.java — no class, no static, no public!
void main() {
    System.out.println("Hello!");
}
\`\`\`

Run with:
\`\`\`bash
java --enable-preview --source 21 Hello.java
\`\`\`

**The Modern Answer:**

If asked in 2024+:
- **Static block trick** worked in Java 6, broke in Java 7
- **Library / framework code** doesn\'t need its own main — it relies on whoever loads it
- **Java 21\'s JEP 445** lets you write code without \`public static void main\` ceremony

**Test Yourself:**

\`\`\`java
public class Tricky {
    static int x = init();

    static int init() {
        System.out.println("Hi from init!");
        System.exit(0);
        return 0;
    }
}
\`\`\`
\`\`\`bash
$ java Tricky    # Java 7+
Error: Main method not found in class Tricky
\`\`\`

The static field initializer never even runs — JVM checks for \`main\` first.

**Bonus: \`main\` in Interface (Java 8+):**
\`\`\`java
public interface App {
    public static void main(String[] args) {
        System.out.println("Main in interface!");
    }
}
\`\`\`
\`\`\`bash
$ java App
Main in interface!
\`\`\`

Yes — Java 8+ allows static methods on interfaces, including \`main\`. The JVM finds it just fine.

**Summary:**
- **Pre-Java 7:** YES, with \`static { System.exit(0); }\` trick
- **Java 7-20:** NO, JVM checks for \`main\` first
- **Java 21+ preview:** YES, with JEP 445 instance main methods
- **Always YES** in libraries, frameworks, servlets, tests — they don\'t need their own \`main\`
- **JShell:** evaluates code with no \`main\` at all`
    },
    {
      id: 31,
      category: 'OOP Principles',
      difficulty: 'Easy',
      question: 'this and super keywords in Java?',
      answer: `**\`this\` Keyword:**

A reference to the **current object** — the instance the method/constructor was called on.

**Uses of \`this\`:**

**1. Disambiguate field from parameter:**
\`\`\`java
public class User {
    private String name;

    public User(String name) {
        this.name = name;        // this.name (field) vs name (parameter)
    }

    public void setName(String name) {
        this.name = name;
    }
}
\`\`\`

**2. Call another constructor in the same class (\`this(...)\`):**
\`\`\`java
public class Pizza {
    private String size;
    private List<String> toppings;

    public Pizza(String size) {
        this(size, new ArrayList<>());   // delegate to other constructor
    }

    public Pizza(String size, List<String> toppings) {
        this.size = size;
        this.toppings = toppings;
    }
}
\`\`\`
**Must be the FIRST line of the constructor.**

**3. Return current instance for method chaining:**
\`\`\`java
public class Builder {
    public Builder name(String n) { this.name = n; return this; }
    public Builder age(int a)     { this.age = a;  return this; }
}

new Builder().name("Alice").age(30);
\`\`\`

**4. Pass current instance as argument:**
\`\`\`java
public class Component {
    public void register(Registry r) {
        r.add(this);   // pass me to the registry
    }
}
\`\`\`

**5. Inside an inner class to refer to outer instance (\`OuterClass.this\`):**
\`\`\`java
public class Outer {
    int x = 10;
    class Inner {
        int x = 20;
        void show() {
            System.out.println(this.x);          // 20 (Inner.this)
            System.out.println(Outer.this.x);    // 10 (Outer.this)
        }
    }
}
\`\`\`

**\`super\` Keyword:**

A reference to the **immediate parent class** — used to access parent\'s constructor, methods, or fields when they\'re hidden/overridden in the child.

**Uses of \`super\`:**

**1. Call parent constructor (\`super(...)\`):**
\`\`\`java
public class Animal {
    protected String name;
    public Animal(String name) {
        this.name = name;
    }
}

public class Dog extends Animal {
    private String breed;

    public Dog(String name, String breed) {
        super(name);             // call parent constructor — must be FIRST
        this.breed = breed;
    }
}
\`\`\`

If you don\'t write \`super(...)\`, the compiler inserts \`super()\` (no-arg). If parent has no no-arg constructor, you must call \`super(args)\` explicitly.

**2. Call parent\'s overridden method:**
\`\`\`java
public class Animal {
    public void speak() {
        System.out.println("Generic animal sound");
    }
}

public class Dog extends Animal {
    @Override
    public void speak() {
        super.speak();                    // call parent\'s speak()
        System.out.println("Woof!");
    }
}

new Dog().speak();
// Generic animal sound
// Woof!
\`\`\`

**3. Access parent\'s hidden field:**
\`\`\`java
public class Parent {
    protected int x = 10;
}

public class Child extends Parent {
    private int x = 20;            // hides parent\'s x

    public void show() {
        System.out.println(this.x);    // 20 (Child\'s)
        System.out.println(super.x);    // 10 (Parent\'s)
    }
}
\`\`\`

**Comparison Table:**

| Aspect | \`this\` | \`super\` |
|--------|---------|----------|
| References | Current instance | Parent class |
| Constructor call | \`this(...)\` — same class | \`super(...)\` — parent class |
| Method call | \`this.method()\` — current | \`super.method()\` — parent\'s version |
| Field access | \`this.field\` | \`super.field\` |
| Position in constructor | First line | First line |
| Allowed together? | NO — only one can be first | NO — only one can be first |
| Allowed in static? | NO | NO |

**Combined Example:**
\`\`\`java
public class Vehicle {
    protected int wheels;

    public Vehicle(int wheels) {
        this.wheels = wheels;
    }

    public void describe() {
        System.out.println("Vehicle with " + wheels + " wheels");
    }
}

public class Car extends Vehicle {
    private String model;

    public Car(String model) {
        this(model, 4);                   // delegate to other ctor
    }

    public Car(String model, int wheels) {
        super(wheels);                     // call parent ctor
        this.model = model;
    }

    @Override
    public void describe() {
        super.describe();                  // parent\'s description first
        System.out.println("Model: " + model);
    }
}

new Car("Tesla").describe();
// Vehicle with 4 wheels
// Model: Tesla
\`\`\`

**Compile Errors / Pitfalls:**

**1. \`super(...)\` / \`this(...)\` not first:**
\`\`\`java
public Foo(int x) {
    this.x = x;
    super();   // ❌ ERROR — must be first
}
\`\`\`

**2. Both \`this()\` and \`super()\`:**
\`\`\`java
public Foo() {
    this(0);    // ❌ ERROR — can\'t use both
    super();
}
\`\`\`

**3. In static methods:**
\`\`\`java
public static void test() {
    this.x = 5;   // ❌ ERROR — no instance
    super.x = 5;  // ❌ ERROR
}
\`\`\`

**4. Recursive constructor cycle:**
\`\`\`java
public Foo() {
    this(0);
}
public Foo(int x) {
    this();   // ❌ ERROR — recursive constructor invocation
}
\`\`\`

**5. \`super\` to access grandparent:**
\`\`\`java
class A {
    public void hello() { System.out.println("A"); }
}
class B extends A {
    public void hello() { System.out.println("B"); }
}
class C extends B {
    public void hello() {
        super.hello();         // calls B\'s hello — \`super\` is IMMEDIATE parent
        // super.super.hello();   // ❌ ERROR — no way to reach grandparent
    }
}
\`\`\`

You cannot reach grandparent (A) from C through \`super\`. This is intentional — encapsulation.

**Constructor Chain Example:**
\`\`\`java
class A {
    A() { System.out.println("A"); }
}
class B extends A {
    B() {
        // implicit super();
        System.out.println("B");
    }
}
class C extends B {
    C() {
        // implicit super();
        System.out.println("C");
    }
}

new C();
// A
// B
// C
\`\`\`
Constructor calls walk UP to Object first, then run DOWN.

**Summary:**

**\`this\`** — refers to the current instance:
- \`this.field\` / \`this.method()\` — disambiguate
- \`this(...)\` — call another constructor in the same class
- \`return this\` — method chaining
- \`OuterClass.this\` — reach outer instance from inner class

**\`super\`** — refers to the parent class:
- \`super(...)\` — call parent constructor (must be first)
- \`super.method()\` — call parent\'s overridden method
- \`super.field\` — access parent\'s hidden field

**Both are required to be the first statement in a constructor; cannot be used in static contexts.**`
    },
    {
      id: 32,
      category: 'OOP Principles',
      difficulty: 'Medium',
      question: 'Difference between final, finally, and finalize?',
      answer: `**Three Java Concepts That Sound Similar But Are Completely Different:**

| Keyword/Method | Type | Purpose | Status |
|----------------|------|---------|--------|
| \`final\` | Keyword | Immutability / no override / no extend | Active |
| \`finally\` | Keyword | Always-execute block in try/catch | Active |
| \`finalize()\` | Method | Object cleanup before GC | **DEPRECATED since Java 9** |

**1. \`final\` Keyword (Modifier):**

Used to restrict modification. Has 3 distinct uses depending on context.

**\`final\` variable — value cannot change:**
\`\`\`java
final int MAX_SIZE = 100;
MAX_SIZE = 200;   // ❌ COMPILE ERROR

// final reference: can\'t reassign, but the OBJECT can mutate
final List<String> list = new ArrayList<>();
list.add("foo");      // ✓ OK — modifying contents
list = new ArrayList<>();   // ❌ ERROR — reassigning reference
\`\`\`

**\`final\` parameter:**
\`\`\`java
public void process(final String name) {
    name = "other";   // ❌ ERROR — can\'t reassign
}
\`\`\`

**\`final\` method — cannot be overridden:**
\`\`\`java
public class Parent {
    public final void critical() { ... }   // can\'t be overridden
}

public class Child extends Parent {
    @Override
    public void critical() { ... }   // ❌ ERROR
}
\`\`\`

**\`final\` class — cannot be subclassed:**
\`\`\`java
public final class String { ... }   // can\'t extend
public final class Math   { ... }   // can\'t extend

public class MyString extends String { ... }   // ❌ ERROR
\`\`\`

**\`final\` instance field — must be assigned exactly once:**
\`\`\`java
public class User {
    private final String name;

    public User(String name) {
        this.name = name;        // assigned in constructor
    }
    // Cannot reassign anywhere else
}
\`\`\`

**\`final static\` (constants):**
\`\`\`java
public static final double PI = 3.14159;
public static final int MAX_THREADS = 16;
\`\`\`

**Effectively Final (Java 8+):**
A variable that\'s never reassigned, even without the \`final\` keyword. Lambdas can capture effectively-final variables.
\`\`\`java
String name = "Alice";   // not declared final, but never changed
Runnable r = () -> System.out.println(name);   // ✓ OK — effectively final
\`\`\`

**2. \`finally\` Keyword (Block):**

A block that ALWAYS runs after a \`try\` (and optional \`catch\`), regardless of whether an exception occurred.

\`\`\`java
try {
    riskyOperation();
} catch (IOException e) {
    handle(e);
} finally {
    cleanup();   // ALWAYS runs — exception or not, return or not
}
\`\`\`

**Execution Scenarios:**
\`\`\`
try succeeds       → try → finally
try throws (caught) → try → catch → finally
try throws (uncaught) → try → finally → exception propagates
try has return     → try → finally → return value
\`\`\`

**Common Use — Resource Cleanup:**
\`\`\`java
FileInputStream fis = null;
try {
    fis = new FileInputStream("data.txt");
    // ... use fis
} finally {
    if (fis != null) {
        try { fis.close(); } catch (IOException ignored) {}
    }
}
\`\`\`

**Modern Replacement — try-with-resources (Java 7+):**
\`\`\`java
try (FileInputStream fis = new FileInputStream("data.txt")) {
    // ... use fis
} // auto-closed, no need for finally
\`\`\`

**Pitfall — \`return\` in \`finally\` swallows exceptions:**
\`\`\`java
public int bad() {
    try {
        throw new RuntimeException("oops");
    } finally {
        return 42;   // ⚠️ swallows the exception, returns 42
    }
}
\`\`\`

**Pitfall — \`finally\` does NOT run if JVM exits:**
\`\`\`java
try {
    System.exit(0);   // ⚠️ JVM exits — finally does NOT run
} finally {
    System.out.println("never printed");
}
\`\`\`

**3. \`finalize()\` Method (Deprecated):**

A method on \`Object\` called by GC before the object is reclaimed. Used for cleanup of native resources.

\`\`\`java
public class Resource {
    @Override
    protected void finalize() throws Throwable {
        try {
            // cleanup logic
            releaseNativeMemory();
        } finally {
            super.finalize();
        }
    }
}
\`\`\`

**Why It\'s Deprecated (since Java 9):**

**1. Unpredictable timing** — runs whenever GC decides; could be never
**2. Performance penalty** — finalizer queue and second GC pass
**3. Object resurrection** — finalizer can save the object: \`SuperGlobal.cache = this;\`
**4. Exception silent swallowing** — exceptions in finalize are ignored
**5. Security risks** — finalizer attacks (resurrection of partially-constructed objects)
**6. \`finalize()\` may NEVER run** — if JVM exits, object never reclaimed

**Modern Replacement — \`Cleaner\` API (Java 9+):**
\`\`\`java
public class Resource implements AutoCloseable {
    private static final Cleaner cleaner = Cleaner.create();
    private final Cleaner.Cleanable cleanable;

    public Resource() {
        // register cleanup action
        cleanable = cleaner.register(this, () -> releaseNativeMemory());
    }

    @Override
    public void close() {
        cleanable.clean();
    }
}
\`\`\`

**Or — try-with-resources (deterministic):**
\`\`\`java
try (Resource r = new Resource()) {
    // ... use r
} // r.close() called automatically
\`\`\`

**Side-by-Side Code Comparison:**

\`\`\`java
public class Demo {

    // 'final' — cannot be reassigned
    final int VALUE = 42;
    public final void doSomething() { }   // can\'t override

    public void doStuff() {
        try {
            // ... risky work
        }
        // 'finally' — always runs
        finally {
            cleanup();
        }
    }

    // 'finalize()' — DEPRECATED, called by GC
    @Override
    protected void finalize() throws Throwable {
        // cleanup before reclamation (don\'t use!)
        super.finalize();
    }
}
\`\`\`

**Summary Table:**

| Keyword | Where Used | When | What It Does |
|---------|-----------|------|--------------|
| \`final\` | Modifier on var/param/method/class/field | Compile time | Prevents change/override/extend |
| \`finally\` | Block in try/catch | Runtime | Guarantees execution after try |
| \`finalize()\` | Method on Object | Before GC | Pre-collection cleanup (deprecated) |

**Memorize Differences:**

- **\`final\`** keeps things **fixed**
- **\`finally\`** runs at **the end**
- **\`finalize()\`** is the **finalizer** (deprecated, don\'t use!)`
    },
    {
      id: 33,
      category: 'OOP Principles',
      difficulty: 'Easy',
      question: 'What is method overloading and method overriding in Java?',
      answer: `**Two Different Polymorphism Mechanisms:**

| Aspect | Method Overloading | Method Overriding |
|--------|-------------------|-------------------|
| **Polymorphism** | Compile-time (static) | Runtime (dynamic) |
| **Where** | Same class (or subclass) | Subclass (extends/implements) |
| **Method signature** | DIFFERENT (params) | IDENTICAL |
| **Return type** | Can differ | Must be same/covariant |
| **Access modifier** | Any | Cannot be more restrictive |
| **Exceptions** | Can differ | Cannot throw broader checked exceptions |
| **Static methods** | Can be overloaded | Cannot be overridden (only hidden) |
| **\`@Override\` annotation** | No | Recommended |
| **Resolved at** | Compile time | Runtime |

**Method Overloading (Compile-Time Polymorphism):**

Multiple methods in the same class (or hierarchy) with the **same name** but **different parameter lists**.

\`\`\`java
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }

    public double add(double a, double b) {       // overload — different param types
        return a + b;
    }

    public int add(int a, int b, int c) {           // overload — different param count
        return a + b + c;
    }

    public String add(String a, String b) {        // overload — concatenation
        return a + b;
    }
}

Calculator calc = new Calculator();
calc.add(1, 2);              // calls int version
calc.add(1.5, 2.5);          // calls double version
calc.add(1, 2, 3);           // calls 3-arg version
calc.add("Hello, ", "World"); // calls String version
\`\`\`

**Rules for Overloading:**

Overloads must differ in **at least one** of:
- Number of parameters
- Type of parameters
- Order of parameters

\`\`\`java
public void foo(int x, String s) { }
public void foo(String s, int x) { }   // ✓ different order
\`\`\`

**Cannot overload by return type alone:**
\`\`\`java
public int foo() { return 1; }
public double foo() { return 1.0; }   // ❌ COMPILE ERROR
\`\`\`

**Method Overriding (Runtime Polymorphism):**

A subclass provides a **specific implementation** of a method already defined in its superclass. Same name, same parameters, same (or covariant) return type.

\`\`\`java
public class Animal {
    public void speak() {
        System.out.println("Generic sound");
    }
}

public class Dog extends Animal {
    @Override
    public void speak() {                   // overriding
        System.out.println("Woof!");
    }
}

public class Cat extends Animal {
    @Override
    public void speak() {                   // overriding
        System.out.println("Meow!");
    }
}

Animal a1 = new Dog();
Animal a2 = new Cat();
a1.speak();   // "Woof!" — runtime dispatch
a2.speak();   // "Meow!"
\`\`\`

**The Rules of Overriding:**

**1. Same method signature:**
\`\`\`java
public void speak() { ... }            // parent
public void speak() { ... }             // ✓ valid override
public void speak(String x) { ... }     // ❌ not override — overload
\`\`\`

**2. Return type — same or covariant (subtype):**
\`\`\`java
class Animal {
    public Animal create() { return new Animal(); }
}

class Dog extends Animal {
    @Override
    public Dog create() { return new Dog(); }   // ✓ covariant return
}
\`\`\`

**3. Access modifier — same or LESS restrictive:**
\`\`\`java
class Parent {
    protected void method() { }
}

class Child extends Parent {
    public void method() { }       // ✓ widening from protected to public
    private void method() { }       // ❌ ERROR — narrowing not allowed
}
\`\`\`

**4. Exceptions — cannot throw NEW or BROADER checked exceptions:**
\`\`\`java
class Parent {
    public void method() throws IOException { }
}

class Child extends Parent {
    @Override
    public void method() throws FileNotFoundException { }   // ✓ narrower

    @Override
    public void method() throws Exception { }                // ❌ broader
}
\`\`\`

**Static Methods — Hidden, NOT Overridden:**
\`\`\`java
class Parent {
    public static void greet() { System.out.println("Parent"); }
}

class Child extends Parent {
    public static void greet() { System.out.println("Child"); }   // hides
}

Parent p = new Child();
p.greet();    // "Parent" — resolved by REFERENCE TYPE, not runtime type
((Child)p).greet();   // "Child"
\`\`\`

This is a key difference from instance methods.

**Visual Comparison:**

\`\`\`
OVERLOADING (same class, same name, different params):
┌────────────────────────┐
│ class Calculator       │
│ ┌────────────────────┐ │
│ │ add(int, int)      │ │
│ │ add(double, double)│ │
│ │ add(int, int, int) │ │
│ └────────────────────┘ │
└────────────────────────┘
        Compile-time resolution

OVERRIDING (parent → child, same signature):
┌──────────────┐
│ class Animal │
│  speak()     │ ← parent
└──────┬───────┘
       │ extends
       ▼
┌──────────────┐
│ class Dog    │
│  speak() ←   │ ← override
└──────────────┘
        Runtime resolution
\`\`\`

**Combined Example:**

\`\`\`java
public class Shape {
    public double area() { return 0; }                    // OVERRIDDEN by subclasses
    public double area(double scale) {                     // OVERLOAD of area
        return area() * scale;
    }
}

public class Circle extends Shape {
    private double radius;

    public Circle(double r) { this.radius = r; }

    @Override
    public double area() {                                  // OVERRIDE
        return Math.PI * radius * radius;
    }
}

public class Rectangle extends Shape {
    private double w, h;

    public Rectangle(double w, double h) { this.w = w; this.h = h; }

    @Override
    public double area() {                                  // OVERRIDE
        return w * h;
    }
}

Shape s1 = new Circle(5);
Shape s2 = new Rectangle(3, 4);

s1.area();        // 78.54 (Circle\'s overridden area)
s2.area();        // 12.0 (Rectangle\'s overridden area)
s1.area(2);       // 157.08 (Shape\'s overload — uses overridden Circle area)
\`\`\`

**\`@Override\` Annotation — Use It!**

The \`@Override\` annotation tells the compiler "I intend to override." If your signature doesn\'t match a parent method, you get a compile error — preventing typos.

\`\`\`java
class Parent {
    public void foo() { }
}

class Child extends Parent {
    @Override
    public void Foo() { }   // ❌ ERROR — different name; would otherwise create new method
}
\`\`\`

**What CANNOT Be Overridden:**

- \`final\` methods
- \`static\` methods (hidden, not overridden)
- \`private\` methods (not visible to subclass)
- Constructors (not inherited)

**Summary:**

**Overloading:**
- **Same class**, same method name
- Different **parameters** (number, type, or order)
- **Compile-time** resolution (early binding)
- Can change return type, access modifier, exceptions

**Overriding:**
- **Subclass** redefines a parent method
- **Same signature** (same params, same/covariant return)
- **Runtime** resolution (late binding via vtable)
- Access cannot be more restrictive
- Checked exceptions cannot be broader

**Memorize:**
- **Overloading** is at **compile time** in the **same class**
- **Overriding** is at **runtime** across **inherited classes**`
    },
    {
      id: 34,
      category: 'OOP Principles',
      difficulty: 'Easy',
      question: 'Difference between == and equals()?',
      answer: `**\`==\` (Reference / Value Comparison):**

For **primitives** → compares values.
For **objects** → compares **references** (memory addresses).

**\`equals()\` (Content Comparison):**

A method on \`Object\`. Default implementation uses \`==\`. Most classes (\`String\`, wrappers, collections) **override** it to compare content.

\`\`\`java
String a = new String("hello");
String b = new String("hello");

a == b           // false — different objects in heap
a.equals(b)      // true  — same content

String c = "hello";
String d = "hello";
c == d           // true  — both point to same String pool entry
c.equals(d)      // true
\`\`\`

**Integer Cache Pitfall:**
\`\`\`java
Integer x = 100;
Integer y = 100;
x == y           // true  — cached (-128..127)

Integer p = 200;
Integer q = 200;
p == q           // false — not cached!
p.equals(q)      // true  — always use equals for wrappers
\`\`\`

**Custom equals():**
\`\`\`java
public class User {
    String name;
    int age;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User)) return false;
        User u = (User) o;
        return age == u.age && Objects.equals(name, u.name);
    }

    @Override
    public int hashCode() {       // ALWAYS override hashCode with equals
        return Objects.hash(name, age);
    }
}
\`\`\`

**Rule:** Use \`==\` for primitives and reference identity. Use \`equals()\` for content comparison.`
    },
    {
      id: 35,
      category: 'JVM Internals',
      difficulty: 'Easy',
      question: 'Can we override the Java main method?',
      answer: `**No — \`main\` is \`static\`, and static methods cannot be overridden — only HIDDEN.**

**Why static methods can\'t be overridden:**
Method overriding relies on **dynamic dispatch** (resolved at runtime via the object\'s actual type). Static methods belong to the class, resolved at **compile time** by the reference type.

**Hiding (NOT overriding):**
\`\`\`java
class Parent {
    public static void main(String[] args) {
        System.out.println("Parent main");
    }
}

class Child extends Parent {
    public static void main(String[] args) {   // hides — not overrides
        System.out.println("Child main");
    }
}

// Both work as JVM entry points:
java Parent   // → "Parent main"
java Child    // → "Child main"
\`\`\`

**The "hiding" semantics:**
\`\`\`java
Parent.main(new String[]{});  // Parent main
Child.main(new String[]{});   // Child main

Parent p = new Child();
// You cannot call main on instance — it's static
// But if you could: would resolve by reference type (Parent), not runtime type
\`\`\`

**Overloading is allowed:**
\`\`\`java
public class App {
    public static void main(String[] args) {
        main(42);                    // call overload
    }
    public static void main(int x) { ... }   // overload — fine
    public static void main(String s) { ... } // overload — fine
}
\`\`\`

The JVM only invokes \`main(String[])\` as the entry point; other overloads are just regular methods.

**Summary:**
- ❌ Cannot override (static methods aren\'t overridable)
- ✅ Can hide in subclass (same signature)
- ✅ Can overload (different parameters)
- The JVM always invokes \`public static void main(String[])\` as the entry point`
    },
    {
      id: 36,
      category: 'OOP Principles',
      difficulty: 'Easy',
      question: 'What is Abstraction in Java?',
      answer: `**Abstraction:** Hiding implementation details and exposing only essential features. "What" the object does, not "how."

**Two ways to achieve abstraction:**

**1. Abstract Classes (0-100% abstraction):**
\`\`\`java
public abstract class Vehicle {
    public abstract void start();    // abstract — no body

    public void stop() {              // concrete — shared
        System.out.println("Stopping");
    }
}

public class Car extends Vehicle {
    @Override
    public void start() {
        System.out.println("Car ignition on");
    }
}
\`\`\`

**2. Interfaces (typically 100% abstraction):**
\`\`\`java
public interface Payable {
    void pay(double amount);   // implicitly public abstract
}

public class CreditCard implements Payable {
    @Override
    public void pay(double amount) { ... }
}
\`\`\`

**Real-World Analogy:**
You drive a car using the steering wheel, pedals, and gear — you don\'t need to know about the engine\'s internal combustion or transmission gears. The interface (controls) is exposed; the implementation (engine) is hidden.

**Benefits:**
- **Reduces complexity** — users see a clean API
- **Enables polymorphism** — swap implementations
- **Easier maintenance** — change internals without breaking callers
- **Encourages contract-driven design**

**Abstraction vs Encapsulation:**
- **Abstraction** — hide IMPLEMENTATION, show INTERFACE (what it does)
- **Encapsulation** — hide DATA, expose CONTROLLED ACCESS (private + getters/setters)

They work together. Abstraction is the "what"; encapsulation is the "how to protect."`
    },
    {
      id: 37,
      category: 'OOP Principles',
      difficulty: 'Medium',
      question: 'Difference between Abstract Class and Interface?',
      answer: `**Quick Comparison:**

| Aspect | Abstract Class | Interface |
|--------|---------------|-----------|
| Keyword | \`abstract class\` | \`interface\` |
| Methods | Abstract + concrete | Abstract + default + static + private (Java 9+) |
| Variables | Any (instance, static) | Implicitly \`public static final\` |
| Constructor | YES | NO |
| Multiple inheritance | NO (single parent) | YES (multiple) |
| Access modifiers on methods | Any | \`public\` (implicit before Java 9) |
| Use case | Shared state + behavior | Contract for unrelated types |

**Abstract Class:**
\`\`\`java
public abstract class Animal {
    protected String name;        // instance field

    public Animal(String name) {  // constructor
        this.name = name;
    }

    public abstract void sound();  // abstract

    public void sleep() {           // concrete
        System.out.println(name + " sleeping");
    }
}
\`\`\`

**Interface:**
\`\`\`java
public interface Soundable {
    String DEFAULT = "...";       // public static final

    void sound();                  // public abstract

    default void describe() {      // default (Java 8+)
        System.out.println("Makes " + DEFAULT);
    }

    static Soundable silent() {    // static (Java 8+)
        return () -> {};
    }

    private void helper() { }      // private (Java 9+)
}
\`\`\`

**Multiple Inheritance:**
\`\`\`java
class Dog extends Animal implements Soundable, Trainable, Swimmer {
    // Can extend ONE class but implement MANY interfaces
}
\`\`\`

**Key Differences:**

**1. State:**
Abstract classes can hold instance state (fields). Interfaces cannot have instance fields, only constants.

**2. Constructors:**
Abstract classes have constructors (called via \`super(...)\`). Interfaces cannot.

**3. Inheritance:**
Java allows extending only ONE class — even abstract. But you can implement MANY interfaces.

**4. Default methods (Java 8+):**
Interfaces can now provide method bodies via \`default\` — closing the historical gap with abstract classes. But interfaces still can\'t have instance state.

**5. Diamond problem:**
With multiple interface inheritance + default methods, conflicts must be resolved by overriding.

**When to choose:**
- **Abstract class** — when subclasses share STATE and BEHAVIOR ("is-a" relationship)
- **Interface** — when defining a CONTRACT for unrelated classes ("can-do" capability)`
    },
    {
      id: 38,
      category: 'OOP Principles',
      difficulty: 'Easy',
      question: 'Can we instantiate an abstract class?',
      answer: `**No — abstract classes cannot be instantiated directly.**

\`\`\`java
abstract class Animal {
    abstract void speak();
}

Animal a = new Animal();   // ❌ COMPILE ERROR
\`\`\`

**Why?** An abstract class may have abstract methods (no implementation). Instantiating it would create an object with incomplete behavior.

**You CAN do these instead:**

**1. Subclass and instantiate the subclass:**
\`\`\`java
class Dog extends Animal {
    @Override
    void speak() { System.out.println("Woof"); }
}

Animal a = new Dog();   // ✓ instantiate the concrete subclass, type as Animal
a.speak();              // "Woof"
\`\`\`

**2. Anonymous inner class (instantiate while overriding):**
\`\`\`java
Animal a = new Animal() {
    @Override
    void speak() { System.out.println("Anonymous"); }
};
a.speak();   // "Anonymous"
\`\`\`

This isn\'t actually instantiating Animal — it\'s creating an anonymous subclass on the fly.

**Constructor exists but can\'t be called externally:**
\`\`\`java
abstract class Vehicle {
    public Vehicle() {                       // constructor exists
        System.out.println("Vehicle init");
    }
}

class Car extends Vehicle {
    public Car() {
        super();   // ✓ called from subclass
    }
}

new Vehicle();   // ❌ ERROR
new Car();        // ✓ runs Vehicle's ctor too via super()
\`\`\`

**Summary:**
- ❌ \`new AbstractClass()\` — not allowed
- ✅ \`new ConcreteSubclass()\` — works (and runs the abstract class\'s constructor via super)
- ✅ Anonymous inner class — instantiates a hidden subclass`
    },
    {
      id: 39,
      category: 'OOP Principles',
      difficulty: 'Medium',
      question: 'Can abstract class have static methods? Static and default methods in interface?',
      answer: `**Abstract class — YES, can have static methods:**
\`\`\`java
public abstract class MathUtils {
    public static int square(int x) {
        return x * x;
    }

    public abstract void compute();
}

MathUtils.square(5);   // ✓ called via class — no instance needed
\`\`\`

Static methods in abstract classes work the same as in regular classes — they belong to the class, not the instance.

**Interface — Static Methods (Java 8+):**
\`\`\`java
public interface Calculator {
    int calculate(int a, int b);

    static Calculator adder() {            // static factory in interface
        return (a, b) -> a + b;
    }
}

Calculator add = Calculator.adder();      // call via interface name
\`\`\`

**Interface — Default Methods (Java 8+):**
\`\`\`java
public interface Vehicle {
    void start();                          // abstract — must implement

    default void stop() {                   // default — provided implementation
        System.out.println("Stopping");
    }
}

public class Car implements Vehicle {
    @Override
    public void start() { ... }
    // stop() inherited as-is, or override if needed
}
\`\`\`

**Why default methods matter:**
Added to enable interface evolution — adding new methods to an interface without breaking existing implementations.

**Java 9+ — Private Methods in Interfaces:**
\`\`\`java
public interface Logger {
    default void info(String msg)  { log("INFO", msg); }
    default void error(String msg) { log("ERROR", msg); }

    private void log(String level, String msg) {   // private — shared helper
        System.out.println("[" + level + "] " + msg);
    }
}
\`\`\`

**Diamond Problem with Default Methods:**
\`\`\`java
interface A { default void hello() { System.out.println("A"); } }
interface B { default void hello() { System.out.println("B"); } }

class C implements A, B {
    @Override
    public void hello() {
        A.super.hello();   // explicitly choose A's version
    }
}
\`\`\`

**Summary:**
- ✅ Abstract class can have static methods (always could)
- ✅ Interface can have static methods (Java 8+)
- ✅ Interface can have default methods (Java 8+)
- ✅ Interface can have private methods (Java 9+)
- ❌ Interfaces still cannot have instance state (only \`public static final\` constants)`
    },
    {
      id: 40,
      category: 'OOP Principles',
      difficulty: 'Easy',
      question: 'Can abstract class have a constructor?',
      answer: `**Yes — abstract classes can (and often do) have constructors.**

The abstract class\'s constructor is called via \`super(...)\` from a concrete subclass. It cannot be called directly to instantiate the abstract class.

**Example:**
\`\`\`java
public abstract class Animal {
    protected String name;
    protected int age;

    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
        System.out.println("Animal created: " + name);
    }

    public abstract void speak();
}

public class Dog extends Animal {
    public Dog(String name, int age) {
        super(name, age);   // calls Animal's constructor
    }

    @Override
    public void speak() {
        System.out.println("Woof!");
    }
}

new Dog("Rex", 3);
// Output: Animal created: Rex
\`\`\`

**Why have constructors in abstract classes?**

**1. Initialize shared state:**
The abstract class holds fields shared by all subclasses; its constructor sets them up.

**2. Enforce required parameters:**
If abstract class declares a parameterized constructor (and no no-arg one), subclasses MUST call it explicitly:
\`\`\`java
public abstract class Validated {
    public Validated(String name) {
        if (name == null) throw new IllegalArgumentException();
        this.name = name;
    }
}

public class User extends Validated {
    public User(String name) {
        super(name);   // REQUIRED — no default super exists
    }
}
\`\`\`

**3. Run setup logic:**
Logging, registration, validation that should always happen.

**Default Constructor Rules:**
- If abstract class has NO constructor → compiler adds public no-arg one
- Subclass\'s constructor implicitly calls \`super()\` if not specified
- If only parameterized constructor exists → subclass MUST call \`super(args)\` explicitly

**Constructor cannot be:**
- \`abstract\` — constructors must have a body
- \`static\` — they\'re tied to instance creation
- \`final\` — pointless (can\'t override constructors)

**Summary:**
- ✅ Abstract classes CAN have constructors
- They run when a subclass is instantiated (via implicit or explicit \`super(...)\`)
- Used to initialize shared fields and enforce invariants`
    },
    {
      id: 41,
      category: 'OOP Principles',
      difficulty: 'Medium',
      question: 'When to use abstract class vs interface?',
      answer: `**Decision Guide:**

**Use ABSTRACT CLASS when:**
- Subclasses share **common state** (instance fields)
- Subclasses share **partial behavior** (concrete methods)
- You want a **base implementation** with selective overrides
- You need **constructors** to enforce setup
- Modeling a clear **"is-a" hierarchy** (Dog IS-A Animal)
- Subclasses are **closely related** in a single hierarchy

**Use INTERFACE when:**
- Defining a **contract** for unrelated classes
- A class needs to expose **multiple capabilities**
- You want to allow **multiple inheritance** of behavior
- Modeling **"can-do" capabilities** (Bird CAN-DO Flyable, Fish CAN-DO Swimmable)
- Sharing **behavior across unrelated types** (default methods)
- Type can vary widely; only the contract matters

**Concrete Examples:**

**Abstract class — shared state + hierarchy:**
\`\`\`java
public abstract class Employee {
    protected String name;
    protected double baseSalary;

    public Employee(String name, double baseSalary) {
        this.name = name;
        this.baseSalary = baseSalary;
    }

    public abstract double calculateBonus();

    public double calculatePay() {
        return baseSalary + calculateBonus();   // shared behavior
    }
}

public class Engineer extends Employee { ... }
public class Manager extends Employee { ... }
\`\`\`

**Interface — capabilities for unrelated types:**
\`\`\`java
public interface Comparable<T> { int compareTo(T o); }
public interface Serializable { }
public interface Closeable extends AutoCloseable { void close() throws IOException; }

// Used by VERY different classes:
class String implements Comparable<String>, Serializable { ... }
class FileInputStream implements Closeable { ... }
\`\`\`

**Combining Both:**
\`\`\`java
public abstract class AbstractList<E> implements List<E> {
    // Provides default implementation of List interface
    // Subclasses (ArrayList, LinkedList) extend this base
    // Get most of List's contract for free
}
\`\`\`

This pattern is common in JDK collections — Skeleton implementations.

**Quick Heuristic:**
- "Subclasses share fields" → abstract class
- "Multiple unrelated types share a capability" → interface
- "I need both" → abstract class implementing interface(s)

**Java 8+ Twist:**
With default methods, interfaces can provide partial implementation — narrowing the gap. But interfaces still can\'t hold instance state, so abstract classes remain useful for that.

**Summary:**
- **Abstract class** = shared blueprint with state
- **Interface** = contract / capability mixin
- Use BOTH together when appropriate (abstract class implementing interface)`
    },
    {
      id: 42,
      category: 'OOP Principles',
      difficulty: 'Easy',
      question: 'What are the different access modifiers in Java?',
      answer: `**Four Access Levels (most → least restrictive):**

| Modifier | Same Class | Same Package | Subclass (any pkg) | Anywhere |
|----------|:----------:|:------------:|:------------------:|:--------:|
| \`private\` | ✓ | ✗ | ✗ | ✗ |
| **default** (no modifier) | ✓ | ✓ | ✗ | ✗ |
| \`protected\` | ✓ | ✓ | ✓ | ✗ |
| \`public\` | ✓ | ✓ | ✓ | ✓ |

**1. \`private\`:**
Visible only within the declaring class.
\`\`\`java
public class Account {
    private double balance;          // hidden completely

    private void log() { ... }       // internal helper
}
\`\`\`

**2. default (package-private):**
No keyword — visible within the same package.
\`\`\`java
package com.example;

class Helper {                       // package-private class
    void utility() { ... }            // package-private method
}
\`\`\`

Common for package-internal APIs not meant for external use.

**3. \`protected\`:**
Visible in same package OR in subclasses (even in other packages).
\`\`\`java
public class Animal {
    protected String name;            // accessible to subclasses
    protected void breathe() { ... }
}

// in another package
public class Dog extends Animal {
    public void test() {
        name = "Rex";                 // ✓ inherited via subclass
        breathe();                     // ✓
    }
}
\`\`\`

**4. \`public\`:**
Accessible from anywhere.
\`\`\`java
public class API {
    public String version() { return "1.0"; }
}
\`\`\`

**Where Each Can Be Applied:**

| Modifier | Top-level class | Inner class | Field | Method | Constructor |
|----------|:---------------:|:-----------:|:-----:|:------:|:-----------:|
| \`private\` | ❌ | ✓ | ✓ | ✓ | ✓ |
| default | ✓ | ✓ | ✓ | ✓ | ✓ |
| \`protected\` | ❌ | ✓ | ✓ | ✓ | ✓ |
| \`public\` | ✓ | ✓ | ✓ | ✓ | ✓ |

**Top-level classes** can only be \`public\` or default — not \`private\`/\`protected\`.

**Java 9+ Module System:**
Adds another layer — \`exports\` keyword in \`module-info.java\` controls visibility across modules. A package can be \`public\` but only exported to specific modules.

**Best Practices:**
- Make fields **\`private\`** by default (encapsulation)
- Provide \`public\` getters/setters as needed
- Use \`protected\` for hooks subclasses should override
- Use default for package-internal helpers
- Minimize \`public\` API surface — easier to maintain compatibility

**Summary:**
- 4 levels: \`private\` → default → \`protected\` → \`public\`
- Restrict by default; widen only when needed
- Top-level classes: only \`public\` or default`
    },
    {
      id: 43,
      category: 'OOP Principles',
      difficulty: 'Medium',
      question: 'Explain shallow copy and deep copy?',
      answer: `**Shallow Copy:** Copies the object\'s top-level fields. Nested object references are SHARED with the original.

**Deep Copy:** Recursively copies the object AND all nested objects — fully independent.

**Visual:**
\`\`\`
Shallow Copy:
    Original ──────► Address("123 Main")
                          ▲
                          │
    Copy     ────────────┘  (shared reference!)

Deep Copy:
    Original ──────► Address("123 Main")
    Copy     ──────► Address("123 Main") (separate object)
\`\`\`

**Default \`clone()\` is shallow:**
\`\`\`java
public class User implements Cloneable {
    String name;
    Address address;

    @Override
    public User clone() throws CloneNotSupportedException {
        return (User) super.clone();   // shallow — copies name (immutable)
                                        // and address REFERENCE (shared!)
    }
}

User u1 = new User("Alice", new Address("123 Main"));
User u2 = u1.clone();

u2.name = "Bob";                       // u1 unchanged (String is immutable)
u2.address.street = "456 Oak";         // ⚠️ u1.address.street is ALSO "456 Oak"!
\`\`\`

**Deep Copy Implementation:**

**Option 1 — Override \`clone()\` recursively:**
\`\`\`java
@Override
public User clone() throws CloneNotSupportedException {
    User copy = (User) super.clone();
    copy.address = this.address.clone();   // recursively clone
    return copy;
}
\`\`\`
Requires \`Address\` to also implement \`Cloneable\`.

**Option 2 — Copy constructor (preferred):**
\`\`\`java
public User(User other) {
    this.name = other.name;
    this.address = new Address(other.address);   // copy nested
}

User u2 = new User(u1);
\`\`\`

**Option 3 — Serialization (works for any depth):**
\`\`\`java
public static <T extends Serializable> T deepCopy(T obj) throws Exception {
    ByteArrayOutputStream bos = new ByteArrayOutputStream();
    new ObjectOutputStream(bos).writeObject(obj);
    return (T) new ObjectInputStream(new ByteArrayInputStream(bos.toByteArray())).readObject();
}
\`\`\`
Slow but completely independent — handles arbitrary nesting and cycles.

**Option 4 — Apache Commons / library:**
\`\`\`java
User u2 = SerializationUtils.clone(u1);
\`\`\`

**When Shallow Is Enough:**
- All fields are **primitives** or **immutable** types (String, Integer, LocalDate)
- You explicitly want shared references (intentional aliasing)

**When Deep Is Needed:**
- Nested mutable collections (List, Map)
- Nested mutable objects (Address, Order line items)
- Anywhere mutating the copy must NOT affect the original

**Summary:**
- **Shallow** = top-level fields copied; nested references shared
- **Deep** = entire graph cloned independently
- Default \`clone()\` is shallow; override for deep
- **Prefer copy constructors** over \`Cloneable\` (Joshua Bloch recommendation)
- For complex cases, use serialization or libraries`
    },
    {
      id: 44,
      category: 'OOP Principles',
      difficulty: 'Easy',
      question: 'What is encapsulation and how does making variables private help?',
      answer: `**Encapsulation:** Bundling data + methods, restricting direct access to internal state.

\`\`\`java
public class BankAccount {
    private double balance;        // hidden internal state

    public void deposit(double amount) {
        if (amount <= 0) throw new IllegalArgumentException();
        balance += amount;
    }

    public double getBalance() { return balance; }
}
\`\`\`

**Why \`private\` matters:**

**1. Validation / invariants:** Direct access bypasses rules; private forces methods that enforce them.

**2. Implementation freedom:** Refactor internals without breaking callers.
\`\`\`java
private double balance;             // V1
private BigDecimal balance;          // V2 — public API unchanged
\`\`\`

**3. Read-only fields via getters:**
\`\`\`java
private final String id;
public String getId() { return id; }   // no setter
\`\`\`

**4. Thread safety:** Private + synchronized methods enforce safety; public field would be raceable.

**5. Refactoring safety:** Private fields are not part of API.

**Encapsulation vs Abstraction:**
- **Encapsulation** — hide STATE, expose CONTROLLED ACCESS
- **Abstraction** — hide IMPLEMENTATION, expose INTERFACE

**Records (Java 14+):** Auto-encapsulation for immutable data:
\`\`\`java
public record Person(String name, int age) { }
\`\`\``
    },
    {
      id: 45,
      category: 'OOP Principles',
      difficulty: 'Medium',
      question: 'Difference between aggregation and composition?',
      answer: `Both express **HAS-A** but differ in **lifetime coupling**.

**Aggregation (weak HAS-A):** Parts can exist independently; parent destroyed → child SURVIVES.
\`\`\`java
public class Department {
    private List<Employee> employees;   // injected, owned externally
    public Department(List<Employee> employees) { this.employees = employees; }
}
// Employee outlives Department
\`\`\`

**Composition (strong HAS-A):** Parts cannot exist without the whole; parent destroyed → child DIES.
\`\`\`java
public class Car {
    private final Engine engine;       // created internally
    public Car() { this.engine = new Engine(); }
}
// Engine has no life outside Car
\`\`\`

**UML:** ◇ aggregation, ◆ composition.

**Heuristics:**

| Sign | Aggregation | Composition |
|------|-------------|-------------|
| Object passed in (DI) | ✓ | rarely |
| Object created internally | rarely | ✓ |
| Part shareable across wholes | ✓ | ✗ |
| Lifetime tied | No | Yes |

**Examples:**
- **Composition:** House→Rooms, Order→OrderItems, Page→Paragraphs
- **Aggregation:** Library→Books, Team→Players, University→Students

**Why it matters:** lifecycle management, DB cascading, GC reachability, testability.`
    },
    {
      id: 46,
      category: 'OOP Principles',
      difficulty: 'Easy',
      question: 'What is HAS-A and IS-A relationship?',
      answer: `**IS-A → Inheritance.** Implemented via \`extends\` or \`implements\`.
\`\`\`java
class Dog extends Animal { ... }     // Dog IS-A Animal
class Bird implements Flyable { ... }  // Bird IS-A Flyable
\`\`\`

**HAS-A → Composition / Aggregation.** Implemented via field reference.
\`\`\`java
class Car {
    private Engine engine;            // Car HAS-A Engine
}
\`\`\`

**Quick test:**
- "X is a Y"? → IS-A (inheritance)
- "X has a Y"? → HAS-A (composition)

**Examples:**

| Relationship | Type |
|--------------|------|
| Dog **is a** Animal | IS-A |
| Car **has a** Engine | HAS-A |
| ArrayList **is a** List | IS-A |
| Order **has a** Customer | HAS-A |

**When to use:**
- IS-A: true specialization, Liskov substitutability
- HAS-A: code reuse without specialization, capability mixing

**Inheritance pitfall:**
\`\`\`java
class Stack extends ArrayList<Integer> {
    public void push(int x) { add(x); }
}
new Stack().add(0, 999);   // ⚠️ ArrayList method breaks stack invariants
\`\`\`

**Composition fix:**
\`\`\`java
class Stack {
    private final List<Integer> data = new ArrayList<>();   // HAS-A
    public void push(int x) { data.add(x); }
}
\`\`\`

**Summary:** IS-A = inheritance, HAS-A = composition. **Favor composition over inheritance** (Joshua Bloch).`
    },
    {
      id: 47,
      category: 'OOP Principles',
      difficulty: 'Medium',
      question: 'Association, Aggregation, and Composition examples?',
      answer: `**Three levels of relationship — loosest to tightest:**

**1. Association** (generic "uses-a" — no ownership):
\`\`\`java
public class Doctor {
    public void treat(Patient p) { p.takeMedicine(); }
}
// Doctor and Patient interact; neither owns the other
\`\`\`

Examples: Doctor↔Patient, Teacher↔Student, Customer↔Order

**2. Aggregation** (weak HAS-A — part can exist independently):
\`\`\`java
public class Department {
    private List<Employee> employees;
    public Department(List<Employee> employees) {
        this.employees = employees;     // injected, externally owned
    }
}
\`\`\`

Examples: Department→Employees, Library→Books, Team→Players

**3. Composition** (strong HAS-A — part dies with whole):
\`\`\`java
public class Car {
    private final Engine engine;
    public Car() {
        this.engine = new Engine();    // created internally
    }
}
\`\`\`

Examples: Car→Engine, House→Rooms, Order→OrderItems

**Comparison:**

| Aspect | Association | Aggregation | Composition |
|--------|:-----------:|:-----------:|:-----------:|
| Strength | Weakest | Medium | Strongest |
| Lifetime tied | No | No | Yes |
| Object created | External | External | Internal |
| Sharing allowed | Yes | Yes | No |
| UML symbol | line | ◇ | ◆ |

**Decision heuristic:**
- "X uses Y temporarily" → Association
- "X holds Y, but Y can outlive X" → Aggregation
- "X owns Y; Y dies with X" → Composition`
    },
    {
      id: 48,
      category: 'OOP Principles',
      difficulty: 'Medium',
      question: 'How to create hashCode and toString methods, and what are they used for?',
      answer: `Both inherited from \`Object\`. Override them for meaningful behavior.

**\`toString()\` — Human-Readable Description:**
\`\`\`java
@Override
public String toString() {
    return "User{name='" + name + "', age=" + age + "}";
}
\`\`\`

Default returns \`ClassName@hashHex\` — useless for debugging.

**Use cases:** logging, debugging (IDE inspectors), error messages.

**\`hashCode()\` — Integer for Hash Tables:**
\`\`\`java
@Override
public int hashCode() {
    return Objects.hash(name, age);
}
\`\`\`

**Default:** memory-based identity hash.

**Use cases:** \`HashMap\`, \`HashSet\`, \`Hashtable\`, \`ConcurrentHashMap\`.

**The CONTRACT — must hold whenever you override equals():**

> If \`a.equals(b)\`, then \`a.hashCode() == b.hashCode()\`.

\`\`\`java
@Override
public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof User)) return false;
    User u = (User) o;
    return age == u.age && Objects.equals(name, u.name);
}

@Override
public int hashCode() {
    return Objects.hash(name, age);   // SAME fields used by equals
}
\`\`\`

**Violation = bugs:**
\`\`\`java
Set<User> set = new HashSet<>();
set.add(new User("Alice"));
set.contains(new User("Alice"));   // FALSE if hashCode not overridden!
\`\`\`

**Modern alternatives:**
- **Records (Java 14+):** auto-generates equals/hashCode/toString
\`\`\`java
public record User(String name, int age) { }
\`\`\`
- **Lombok:** \`@EqualsAndHashCode\`, \`@ToString\`
- **Apache Commons:** \`HashCodeBuilder\`

**Best practices:**
1. Always override BOTH together
2. Use SAME fields in both
3. Use \`Objects.hash()\` for simplicity
4. Prefer records to eliminate boilerplate`
    },
    {
      id: 49,
      category: 'OOP Principles',
      difficulty: 'Easy',
      question: 'Can we call a static method from a non-static method? And vice versa?',
      answer: `**Static from Non-Static: ✓ YES.**
**Non-Static from Static: ⚠️ Need an instance.**

**Static from non-static (works):**
\`\`\`java
public class Calculator {
    public static int square(int x) { return x * x; }

    public int compute(int n) {        // instance method
        return square(n) + 10;          // ✓ direct call
    }
}
\`\`\`

**Non-static from static (NOT direct):**
\`\`\`java
public class Calculator {
    public int counter;                 // instance field

    public int incrementCounter() { return ++counter; }

    public static int test() {
        return ++counter;               // ❌ ERROR — no instance
        return incrementCounter();      // ❌ ERROR
    }
}
\`\`\`

**Why?** Static has no \`this\` — no instance to find \`counter\` on.

**Workaround — pass an instance:**
\`\`\`java
public static int test(Calculator c) {  // accept instance
    return c.incrementCounter();        // ✓
}

public static int testInternal() {
    return new Calculator().incrementCounter();   // ✓ create one
}
\`\`\`

**\`main\` example:**
\`\`\`java
public class App {
    int data = 42;
    public void process() { System.out.println(data); }

    public static void main(String[] args) {
        new App().process();    // ✓ instance, then call
    }
}
\`\`\`

**Rules:**

| From → To | Static method | Non-static method |
|-----------|:-------------:|:-----------------:|
| Static method | ✓ | ✗ (need instance) |
| Non-static method | ✓ | ✓ |

**Reason:** non-static methods always have \`this\`; static methods don\'t.`
    },
    {
      id: 50,
      category: 'OOP Principles',
      difficulty: 'Easy',
      question: 'Have you used the ternary operator? Give an example.',
      answer: `**Syntax:** \`condition ? valueIfTrue : valueIfFalse\`

A compact alternative to simple \`if-else\`.

\`\`\`java
int age = 20;
String status = (age >= 18) ? "adult" : "minor";
\`\`\`

**Common uses:**

**1. Default values:**
\`\`\`java
String name = (input != null) ? input : "Anonymous";
// Modern: Optional.ofNullable(input).orElse("Anonymous")
\`\`\`

**2. Math:**
\`\`\`java
int abs = (n < 0) ? -n : n;
int max = (a > b) ? a : b;
\`\`\`

**3. String formatting:**
\`\`\`java
System.out.println(count + (count == 1 ? " item" : " items"));
\`\`\`

**4. Compare:**
\`\`\`java
public int compare(int a, int b) {
    return (a < b) ? -1 : (a > b) ? 1 : 0;
}
\`\`\`

**Nesting (use sparingly):**
\`\`\`java
String grade = (score >= 90) ? "A"
             : (score >= 80) ? "B"
             : (score >= 70) ? "C"
             : "F";
\`\`\`

Modern alternative — switch expression (Java 14+):
\`\`\`java
String grade = switch ((int) (score / 10)) {
    case 10, 9 -> "A";
    case 8     -> "B";
    case 7     -> "C";
    default    -> "F";
};
\`\`\`

**Pitfalls:**
- Don\'t deeply nest (unreadable)
- Type mismatch errors: both branches must unify
- NPE on autounboxing: \`int x = condition ? 1 : null\` ⚠️

**Best practice:** Use for simple, single-line conditionals. Avoid for side-effects.`
    },
    {
      id: 51,
      category: 'OOP Principles',
      difficulty: 'Medium',
      question: 'Why does Java not support multiple inheritance? What is the diamond problem?',
      answer: `**Java forbids multiple class inheritance.**
\`\`\`java
class C extends A, B { }   // ❌ COMPILE ERROR
\`\`\`

**The Diamond Problem:**
If two parents have the same method, which does the child inherit?

\`\`\`
        A
       / \\
      B   C        ← both override A.method()
       \\ /
        D           ← inherits from B and C — WHICH method?
\`\`\`

\`\`\`java
class A { public void greet() { System.out.println("A"); } }
class B extends A { public void greet() { System.out.println("B"); } }
class C extends A { public void greet() { System.out.println("C"); } }
class D extends B, C { }   // hypothetical — which greet()?
\`\`\`

Java prevents the ambiguity by forbidding multiple class inheritance entirely.

**Java\'s solution: multiple INTERFACE inheritance.**
\`\`\`java
interface A { void hello(); }
interface B { void world(); }
class C implements A, B { ... }   // ✓ multiple INTERFACES
\`\`\`

Originally safe because interfaces had no method bodies — no ambiguity.

**Java 8 default methods reintroduced the diamond:**
\`\`\`java
interface Flyable   { default void move() { System.out.println("Fly"); } }
interface Swimmable { default void move() { System.out.println("Swim"); } }

class Duck implements Flyable, Swimmable { }   // ❌ ERROR — must resolve
\`\`\`

**Resolution rule:** **class wins, then most-specific interface.** If conflict isn\'t auto-resolvable, you must override:
\`\`\`java
class Duck implements Flyable, Swimmable {
    @Override
    public void move() {
        Flyable.super.move();   // explicitly choose
    }
}
\`\`\`

**Why multiple interface inheritance works in Java:**
- No instance state in interfaces (no field duplication)
- Default methods work on \`this\` only
- Compiler forces explicit conflict resolution

**Summary:**
- **No multiple class inheritance** — avoids diamond ambiguity
- **Yes multiple interface inheritance** — interfaces are stateless, conflicts must be resolved`
    },
    {
      id: 52,
      category: 'OOP Principles',
      difficulty: 'Easy',
      question: 'What is a marker interface? Examples?',
      answer: `**Marker interface:** An empty interface that "marks" a class as having some property — used by JVM/frameworks to alter behavior.

\`\`\`java
public interface Serializable { }   // empty marker

public class User implements Serializable { ... }   // marked
\`\`\`

**Built-in markers:**

- **\`Serializable\`** — class can be serialized (used by ObjectOutputStream)
- **\`Cloneable\`** — \`Object.clone()\` is legal (else throws CloneNotSupportedException)
- **\`Remote\`** (RMI) — interface invokable remotely
- **\`RandomAccess\`** — List supports O(1) indexed access (ArrayList yes, LinkedList no)
- **\`EventListener\`** — class is an event listener

**Detection via instanceof:**
\`\`\`java
List<Integer> list = ...;
if (list instanceof RandomAccess) {
    for (int i = 0; i < list.size(); i++) list.get(i);   // efficient
} else {
    for (int x : list) { ... }                            // iterator-friendly
}
\`\`\`

**Custom marker:**
\`\`\`java
public interface Auditable { }

public class AuditService {
    public void save(Object entity) {
        if (entity instanceof Auditable) {
            log("Saved auditable: " + entity);
        }
        repository.save(entity);
    }
}
\`\`\`

**Modern alternative — Annotations (Java 5+):**

\`\`\`java
@Auditable
public class User { ... }

if (entity.getClass().isAnnotationPresent(Auditable.class)) { ... }
\`\`\`

**Marker interface vs annotation:**

| Aspect | Marker Interface | Annotation |
|--------|------------------|------------|
| Defines a TYPE | Yes (\`Auditable\`) | No |
| Polymorphism | Yes (\`List<Auditable>\`) | No |
| Inherited | Yes | Optional via \`@Inherited\` |
| Detection | \`instanceof\` | Reflection |

**When to use:**
- **Marker interface** when you need the marker as a type in signatures
- **Annotation** for pure metadata (modern preference)`
    },
    {
      id: 53,
      category: 'OOP Principles',
      difficulty: 'Easy',
      question: 'What is a wrapper class and what are its uses?',
      answer: `**Wrapper class:** Object representation of a primitive type.

| Primitive | Wrapper |
|-----------|---------|
| \`byte\` | \`Byte\` |
| \`short\` | \`Short\` |
| \`int\` | \`Integer\` |
| \`long\` | \`Long\` |
| \`float\` | \`Float\` |
| \`double\` | \`Double\` |
| \`char\` | \`Character\` |
| \`boolean\` | \`Boolean\` |

**Why wrappers exist:** primitives aren\'t objects — wrappers fill that gap.

**Uses:**

**1. Generics (need objects):**
\`\`\`java
List<int> ints = ...;          // ❌ no primitives
List<Integer> ints = ...;      // ✓
\`\`\`

**2. Collections:**
\`\`\`java
Map<String, Integer> ages = new HashMap<>();
ages.put("Alice", 30);          // autoboxing
\`\`\`

**3. Nullable:**
\`\`\`java
int x = null;          // ❌
Integer y = null;      // ✓
\`\`\`

**4. Type-specific utilities:**
\`\`\`java
Integer.parseInt("42")
Integer.MAX_VALUE
Boolean.parseBoolean("true")
Character.isDigit('5')
\`\`\`

**Autoboxing / unboxing (Java 5+):**
\`\`\`java
Integer i = 5;          // autobox
int n = i;              // unbox
list.add(10);           // autobox
int sum = list.get(0) + 1;   // unbox
\`\`\`

**Pitfalls:**

**1. Integer cache (-128..127):**
\`\`\`java
Integer a = 100, b = 100;
a == b;                  // true (cached)
Integer x = 200, y = 200;
x == y;                  // FALSE — always use .equals()
\`\`\`

**2. NPE on unboxing null:**
\`\`\`java
int count = map.get("missing");   // throws NPE
int count = map.getOrDefault("missing", 0);   // safe
\`\`\`

**3. Boxing in tight loops kills performance:**
\`\`\`java
Long sum = 0L;                              // ⚠️ boxed
for (long i = 0; i < 1_000_000; i++) sum += i;
// 1M Long allocations → GC pressure

long sum = 0L;                               // ✓ primitive
\`\`\`

**Rule:** Use **primitives** in hot paths; **wrappers** for collections, generics, nullable values.`
    },
    {
      id: 54,
      category: 'OOP Principles',
      difficulty: 'Medium',
      question: 'What are Generics and their advantages?',
      answer: `**Generics (Java 5+):** Parameterize types — write code that works with any type while keeping COMPILE-TIME type safety.

\`\`\`java
// Without generics
List list = new ArrayList();
list.add("hello");
String s = (String) list.get(0);   // explicit cast

// With generics
List<String> list = new ArrayList<>();
String s = list.get(0);             // no cast
\`\`\`

**Generic class:**
\`\`\`java
public class Box<T> {
    private T value;
    public T get() { return value; }
    public void set(T value) { this.value = value; }
}

Box<String> sb = new Box<>();
Box<Integer> ib = new Box<>();
\`\`\`

**Generic method:**
\`\`\`java
public static <T> T firstOrNull(List<T> list) {
    return list.isEmpty() ? null : list.get(0);
}
\`\`\`

**Bounded types:**
\`\`\`java
public static <T extends Number> double sum(List<T> nums) { ... }
\`\`\`

**Wildcards (PECS — Producer Extends, Consumer Super):**
\`\`\`java
List<? extends Number> nums;     // upper bound — read
List<? super Integer> ints;      // lower bound — write
List<?> any;                      // unbounded
\`\`\`

**Advantages:**

**1. Type safety at compile time:**
\`\`\`java
List<String> list = new ArrayList<>();
list.add(42);                     // ❌ compile error
\`\`\`

**2. No casting required:**
\`\`\`java
String s = list.get(0);            // no (String) cast
\`\`\`

**3. Reusability:** one generic class works for any type.

**4. Self-documenting APIs:**
\`\`\`java
public <T> List<T> filter(List<T> list, Predicate<T> pred) { ... }
\`\`\`

**Type erasure (limitation):**
At runtime, \`List<String>\` and \`List<Integer>\` are both just \`List\`. Consequences:

- ❌ \`o instanceof T\`
- ❌ \`new T[size]\`
- ❌ \`new T()\`
- ❌ \`catch (T e)\`
- ❌ Static fields of type \`T\`

**Workaround — pass \`Class<T>\` token:**
\`\`\`java
public class Bad<T> {
    private final Class<T> type;
    public Bad(Class<T> type) { this.type = type; }
    public boolean check(Object o) { return type.isInstance(o); }
}
\`\`\`

**Summary:**
- Type-parameterized classes/methods/interfaces
- Compile-time safety, no casts, reusability
- Type erasure is the main constraint at runtime`
    },
    {
      id: 55,
      category: 'Design Patterns',
      difficulty: 'Hard',
      question: 'How would you design a Payment System using OOP?',
      answer: `**Goals:** support multiple payment methods (CreditCard, PayPal, BankTransfer, Crypto), be open to new ones without modifying existing code (Open-Closed Principle), and handle validation, processing, and notifications.

**Step 1 — Common abstraction (Strategy pattern):**
\`\`\`java
public interface PaymentMethod {
    PaymentResult pay(Money amount);
    boolean validate();
}

public abstract class AbstractPaymentMethod implements PaymentMethod {
    protected final String accountHolder;

    protected AbstractPaymentMethod(String accountHolder) {
        this.accountHolder = accountHolder;
    }

    @Override
    public final PaymentResult pay(Money amount) {
        if (!validate()) return PaymentResult.failed("Validation failed");
        return doPay(amount);
    }

    protected abstract PaymentResult doPay(Money amount);
}
\`\`\`

**Step 2 — Concrete implementations:**
\`\`\`java
public class CreditCardPayment extends AbstractPaymentMethod {
    private final String cardNumber;
    private final String cvv;

    @Override
    public boolean validate() {
        return luhnCheck(cardNumber) && cvv.matches("\\\\d{3,4}");
    }

    @Override
    protected PaymentResult doPay(Money amount) {
        return cardGateway.charge(cardNumber, amount);
    }
}

public class PayPalPayment extends AbstractPaymentMethod {
    private final String email;

    @Override
    public boolean validate() { return email.contains("@"); }

    @Override
    protected PaymentResult doPay(Money amount) {
        return paypalApi.charge(email, amount);
    }
}

public class CryptoPayment extends AbstractPaymentMethod { /* ... */ }
\`\`\`

**Step 3 — Service / orchestrator:**
\`\`\`java
public class PaymentService {
    private final List<PaymentObserver> observers;

    public PaymentResult processPayment(Order order, PaymentMethod method) {
        PaymentResult result = method.pay(order.getTotal());
        observers.forEach(o -> o.notify(order, result));
        return result;
    }
}
\`\`\`

**Step 4 — Factory for instantiation:**
\`\`\`java
public class PaymentMethodFactory {
    public static PaymentMethod create(PaymentRequest req) {
        return switch (req.type()) {
            case CARD   -> new CreditCardPayment(req.cardNumber(), req.cvv());
            case PAYPAL -> new PayPalPayment(req.email());
            case CRYPTO -> new CryptoPayment(req.wallet());
        };
    }
}
\`\`\`

**OOP Principles Applied:**

- **Encapsulation** — internal state (card numbers, CVV) hidden as private final fields
- **Inheritance** — concrete payment methods extend \`AbstractPaymentMethod\`
- **Polymorphism** — \`PaymentService\` works against \`PaymentMethod\` interface, not concrete types
- **Abstraction** — interface defines contract; clients depend on contract not implementation

**Design Patterns Used:**
- **Strategy** — interchangeable payment algorithms
- **Template Method** — \`pay()\` defines skeleton; \`doPay()\` is the variable step
- **Factory** — encapsulates creation
- **Observer** — notify on payment events (email, audit log)

**SOLID:**
- **S**ingle Responsibility — each class has one reason to change
- **O**pen-Closed — add new payment methods without modifying existing
- **L**iskov Substitution — any \`PaymentMethod\` works in \`PaymentService\`
- **I**nterface Segregation — \`PaymentMethod\` is small and focused
- **D**ependency Inversion — \`PaymentService\` depends on abstraction, not concretes`
    },
    {
      id: 56,
      category: 'OOP Principles',
      difficulty: 'Medium',
      question: 'What is SOLID Principle?',
      answer: `**SOLID** = five OOP design principles by Robert C. Martin (Uncle Bob) for maintainable, extensible code.

**1. S — Single Responsibility Principle (SRP):**
> A class should have ONE reason to change.

\`\`\`java
// ❌ BAD — does too much
class User {
    void save() { /* DB code */ }
    void sendEmail() { /* SMTP code */ }
    void generateReport() { /* PDF code */ }
}

// ✓ GOOD — one responsibility each
class User { /* domain data */ }
class UserRepository { void save(User u) {...} }
class EmailService    { void send(User u) {...} }
class ReportGenerator { void generate(User u) {...} }
\`\`\`

**2. O — Open/Closed Principle (OCP):**
> Open for extension, CLOSED for modification.

\`\`\`java
// ❌ BAD — adding new shape requires modifying calculate()
class AreaCalculator {
    double calculate(Object shape) {
        if (shape instanceof Circle) return Math.PI * r * r;
        if (shape instanceof Square) return s * s;
        // adding Triangle requires editing here
    }
}

// ✓ GOOD — add new shapes by extension
interface Shape { double area(); }
class Circle   implements Shape { ... }
class Square   implements Shape { ... }
class Triangle implements Shape { ... }   // NEW — no modifications

class AreaCalculator {
    double calculate(Shape shape) { return shape.area(); }
}
\`\`\`

**3. L — Liskov Substitution Principle (LSP):**
> Subtypes must be substitutable for their base types — without breaking behavior.

\`\`\`java
// ❌ BAD — Square breaks Rectangle's contract
class Rectangle {
    void setWidth(int w);
    void setHeight(int h);
}
class Square extends Rectangle {
    void setWidth(int w) { width = height = w; }   // unexpected!
}

Rectangle r = new Square();
r.setWidth(5);
r.setHeight(10);
assert r.area() == 50;   // FAILS — area = 100
\`\`\`

**Fix:** don\'t inherit if you can\'t honor the contract.

**4. I — Interface Segregation Principle (ISP):**
> Clients should not be forced to depend on methods they don\'t use.

\`\`\`java
// ❌ BAD — fat interface
interface Worker {
    void work();
    void eat();
    void sleep();
}
class Robot implements Worker {
    void eat()   { throw new UnsupportedOperationException(); }   // ⚠️
    void sleep() { throw new UnsupportedOperationException(); }
}

// ✓ GOOD — split into focused interfaces
interface Workable { void work(); }
interface Eatable  { void eat(); }
interface Sleepable { void sleep(); }

class Human implements Workable, Eatable, Sleepable { ... }
class Robot implements Workable { ... }
\`\`\`

**5. D — Dependency Inversion Principle (DIP):**
> Depend on abstractions, not concretions. High-level modules shouldn\'t depend on low-level modules; both should depend on interfaces.

\`\`\`java
// ❌ BAD — high-level service tightly coupled to MySQL
class OrderService {
    private MySQLDatabase db = new MySQLDatabase();
    void save(Order o) { db.insert(o); }
}

// ✓ GOOD — depend on abstraction
interface Database { void insert(Object o); }
class MySQLDatabase implements Database { ... }
class PostgresDatabase implements Database { ... }

class OrderService {
    private final Database db;        // injected
    public OrderService(Database db) { this.db = db; }
    void save(Order o) { db.insert(o); }
}
\`\`\`

**Why SOLID Matters:**
- **Maintainable** — small changes don\'t cascade
- **Testable** — easy to mock dependencies
- **Extensible** — add features without rewriting
- **Reusable** — components compose well
- **Loosely coupled** — independent components

**SOLID + Design Patterns:** SOLID guides WHY; design patterns provide HOW.`
    },
    {
      id: 57,
      category: 'Exception Handling',
      difficulty: 'Easy',
      question: 'Difference between checked and unchecked exceptions in Java?',
      answer: `**Two categories of exceptions, distinguished at the compiler level.**

**Hierarchy:**
\`\`\`
Throwable
├── Error                    (unchecked — JVM problems, don't catch)
│   ├── OutOfMemoryError
│   └── StackOverflowError
└── Exception
    ├── (most subclasses)    (CHECKED — must declare/handle)
    │   ├── IOException
    │   ├── SQLException
    │   ├── ClassNotFoundException
    │   └── InterruptedException
    └── RuntimeException     (UNCHECKED — optional)
        ├── NullPointerException
        ├── IllegalArgumentException
        ├── ArithmeticException
        └── IndexOutOfBoundsException
\`\`\`

**Checked exceptions:**
- Compiler enforces handling — must declare \`throws\` or wrap in try-catch
- Represent recoverable conditions caller can act on
- Examples: file not found, network failure, invalid SQL

\`\`\`java
public void readFile(String path) throws IOException {   // declared
    Files.readAllLines(Path.of(path));
}

// Caller must:
try {
    readFile("a.txt");
} catch (IOException e) {
    log(e);
}
// OR declare 'throws IOException' itself
\`\`\`

**Unchecked exceptions (RuntimeException):**
- Not enforced by compiler
- Represent programming errors
- Examples: null reference, array out of bounds, illegal arg

\`\`\`java
public int divide(int a, int b) {
    return a / b;          // can throw ArithmeticException — no declaration needed
}

// Caller can choose to handle or not
divide(10, 0);             // throws ArithmeticException at runtime
\`\`\`

**Comparison:**

| Aspect | Checked | Unchecked |
|--------|---------|-----------|
| Compiler enforces | YES | NO |
| Must declare \`throws\` | YES | Optional |
| Common examples | IOException, SQLException | NPE, IllegalArgumentException |
| Use case | Recoverable, expected failures | Programming errors, contract violations |
| Inherits from | Exception (not RuntimeException) | RuntimeException |

**Errors (a third category):**
\`\`\`java
OutOfMemoryError, StackOverflowError, NoClassDefFoundError
\`\`\`
JVM-level problems — don\'t catch them; let the app crash.

**When to use which:**
- **Checked** — operations that can fail in expected, recoverable ways (I/O, network)
- **Unchecked** — programming bugs (null check, range check, validation)

**Modern view:** Many developers prefer unchecked exceptions even for recoverable failures, citing checked-exception fatigue (Spring, Hibernate wrap checked → runtime).

**Custom exceptions:**
\`\`\`java
public class InvalidOrderException extends RuntimeException { ... }   // unchecked
public class InsufficientFundsException extends Exception { ... }     // checked
\`\`\`

**Summary:**
- **Checked** — must handle, compile-time enforcement
- **Unchecked** (RuntimeException) — optional handling, runtime
- **Errors** — JVM problems, don\'t catch`
    },
    {
      id: 58,
      category: 'Exception Handling',
      difficulty: 'Easy',
      question: 'Can we use try without catch?',
      answer: `**Yes — try can pair with \`finally\` OR be a try-with-resources block. But \`try\` alone is invalid.**

**Three valid forms of \`try\`:**

**1. \`try-catch\`:**
\`\`\`java
try {
    riskyOperation();
} catch (IOException e) {
    handle(e);
}
\`\`\`

**2. \`try-finally\` (no catch):**
\`\`\`java
try {
    riskyOperation();
} finally {
    cleanup();          // runs whether exception or not
}
\`\`\`
The exception propagates up, but cleanup always runs.

**3. \`try-catch-finally\`:**
\`\`\`java
try {
    riskyOperation();
} catch (IOException e) {
    log(e);
} finally {
    cleanup();
}
\`\`\`

**4. \`try-with-resources\` (Java 7+):**
\`\`\`java
try (FileInputStream in = new FileInputStream("data.txt")) {
    // use in
}   // in.close() called automatically — no catch or finally needed!
\`\`\`

**INVALID:**
\`\`\`java
try {
    risky();
}   // ❌ COMPILE ERROR — must have catch, finally, or both
\`\`\`

**Why \`try-finally\` (without catch)?**

Useful when you don\'t want to handle the exception (let it propagate) but DO need cleanup:

\`\`\`java
public Connection openConnection() throws SQLException {
    Connection conn = pool.acquire();
    try {
        conn.beginTransaction();
        return conn;
    } finally {
        if (conn != null && !conn.isHealthy()) {
            pool.release(conn);   // cleanup; exception still propagates
        }
    }
}
\`\`\`

**Modern equivalent — try-with-resources:**

If your resource implements \`AutoCloseable\`, prefer:
\`\`\`java
try (var conn = pool.acquire()) {
    conn.beginTransaction();
}   // auto-close, no finally needed
\`\`\`

**Multi-resource:**
\`\`\`java
try (var in = new FileInputStream("a"); var out = new FileOutputStream("b")) {
    in.transferTo(out);
}   // both closed in REVERSE order
\`\`\`

**Pitfalls:**

**\`finally\` runs even on \`return\`:**
\`\`\`java
public int test() {
    try {
        return 1;
    } finally {
        System.out.println("runs!");
        // return 2;  // would override the try's return — DON'T DO THIS
    }
}
\`\`\`

**\`finally\` does NOT run if JVM exits:**
\`\`\`java
try {
    System.exit(0);   // JVM dies — finally NOT executed
} finally {
    cleanup();         // never runs
}
\`\`\`

**Summary:**
- ✅ \`try-finally\` (no catch) — valid; cleanup without handling
- ✅ \`try-with-resources\` — no catch needed for AutoCloseable
- ❌ \`try\` alone — illegal`
    },
    {
      id: 59,
      category: 'Exception Handling',
      difficulty: 'Easy',
      question: 'Can we use multiple catch blocks?',
      answer: `**Yes — handle different exception types separately.**

\`\`\`java
try {
    riskyOperation();
} catch (IOException e) {
    log("IO failure: " + e);
} catch (SQLException e) {
    log("DB failure: " + e);
} catch (Exception e) {
    log("Other: " + e);
}
\`\`\`

**Order matters — most specific FIRST.**

\`\`\`java
// ✓ correct — specific before general
try { ... }
catch (FileNotFoundException e) { ... }   // subclass first
catch (IOException e) { ... }              // parent
catch (Exception e) { ... }                 // grandparent

// ❌ COMPILE ERROR — Exception caught first; subclasses unreachable
try { ... }
catch (Exception e) { ... }
catch (IOException e) { ... }   // unreachable!
\`\`\`

**Multi-catch (Java 7+) — share handler:**
\`\`\`java
try {
    riskyOperation();
} catch (IOException | SQLException e) {     // pipe-separated
    log("Failure: " + e.getMessage());
    cleanup();
}
\`\`\`

**Restrictions:**
- The combined exceptions cannot share an inheritance relationship (compiler rejects \`IOException | FileNotFoundException\` since FileNotFoundException already covers IOException)
- The variable \`e\` is implicitly \`final\` — cannot reassign

**Common pattern — different actions per exception:**
\`\`\`java
try {
    parseConfig(file);
} catch (FileNotFoundException e) {
    useDefaults();                      // recoverable
} catch (IOException e) {
    System.exit(1);                     // fatal
} catch (ParseException e) {
    askUser(file);                      // can prompt user
}
\`\`\`

**With finally:**
\`\`\`java
try {
    work();
} catch (IOException e) {
    log(e);
} catch (RuntimeException e) {
    audit(e);
    throw e;                            // rethrow
} finally {
    cleanup();
}
\`\`\`

**Try-with-resources + multi-catch:**
\`\`\`java
try (var fis = new FileInputStream(file)) {
    process(fis);
} catch (FileNotFoundException | SecurityException e) {
    log(e);
}
\`\`\`

**Summary:**
- ✅ Multiple catch blocks allowed
- ✅ Order: most specific to most general
- ✅ Java 7+ multi-catch: \`catch (A | B | C e)\`
- ❌ Compile error if order is wrong (parent before child)`
    },
    {
      id: 60,
      category: 'Exception Handling',
      difficulty: 'Easy',
      question: 'Difference between throw and throws?',
      answer: `**\`throw\` — actually throws an exception** (statement inside a method).

**\`throws\` — declares that a method MAY throw an exception** (method signature).

**Comparison:**

| Aspect | \`throw\` | \`throws\` |
|--------|----------|-----------|
| Where used | Inside method body | Method signature |
| Followed by | Exception INSTANCE | Exception CLASS(ES) |
| Multiples | One per statement | Comma-separated list |
| Purpose | Actually fire exception | Declare possible exceptions |

**\`throw\` example:**
\`\`\`java
public void deposit(double amount) {
    if (amount <= 0) {
        throw new IllegalArgumentException("Amount must be positive");
    }
    // ...
}
\`\`\`

**\`throws\` example:**
\`\`\`java
public void readFile(String path) throws IOException {   // declares
    // body might throw IOException
    Files.readAllLines(Path.of(path));
}
\`\`\`

**Both together:**
\`\`\`java
public void process(String input) throws IOException, ParseException {  // declares
    if (input == null) {
        throw new IllegalArgumentException("input null");   // unchecked, no declaration needed
    }

    if (!Files.exists(Path.of(input))) {
        throw new IOException("File missing");                // declared
    }

    // ...
}
\`\`\`

**Multiple in \`throws\`:**
\`\`\`java
public void op() throws IOException, SQLException, InterruptedException {
    // ...
}
\`\`\`

**Multiple \`throw\` statements (same method):**
\`\`\`java
public int divide(int a, int b) {
    if (b == 0) throw new ArithmeticException("div by zero");
    if (a < 0)  throw new IllegalArgumentException("negative a");
    return a / b;
}
\`\`\`

**Re-throwing:**
\`\`\`java
try {
    work();
} catch (IOException e) {
    log(e);
    throw e;                                  // re-throw same exception
}
\`\`\`

**Wrap and rethrow:**
\`\`\`java
try {
    work();
} catch (IOException e) {
    throw new ServiceException("Failed", e);   // wrap with cause
}
\`\`\`

**\`throws\` is part of the method signature:**

When overriding, the subclass cannot declare BROADER checked exceptions than the parent:
\`\`\`java
class Parent {
    public void op() throws IOException { }
}
class Child extends Parent {
    @Override
    public void op() throws Exception { }    // ❌ broader than parent
    @Override
    public void op() throws FileNotFoundException { }   // ✓ narrower OK
}
\`\`\`

**Mnemonic:**
- \`throw\` — at the moment you fire it
- \`throws\` — declares ahead what could happen

**Summary:**
- \`throw\` — actually throws an exception instance
- \`throws\` — declares possible exceptions in the method signature
- \`throws\` only needed for CHECKED exceptions; unchecked optional but documents intent`
    },
    {
      id: 61,
      category: 'Exception Handling',
      difficulty: 'Easy',
      question: 'What is the parent of Exception class in Java?',
      answer: `**\`java.lang.Exception\` extends \`java.lang.Throwable\`.**

**Hierarchy:**
\`\`\`
java.lang.Object
└── java.lang.Throwable
    ├── java.lang.Error                         (unchecked — JVM problems)
    │   ├── OutOfMemoryError
    │   ├── StackOverflowError
    │   ├── NoClassDefFoundError
    │   └── AssertionError
    └── java.lang.Exception                     (mostly checked)
        ├── IOException                          (checked)
        ├── SQLException                          (checked)
        ├── ClassNotFoundException                (checked)
        ├── InterruptedException                  (checked)
        └── java.lang.RuntimeException            (unchecked)
            ├── NullPointerException
            ├── IllegalArgumentException
            ├── ArithmeticException
            ├── IndexOutOfBoundsException
            ├── ClassCastException
            └── ConcurrentModificationException
\`\`\`

**Two main branches under Throwable:**

**1. \`Error\` — Don\'t Catch:**
JVM-level fatal conditions. Recovery is generally impossible.
\`\`\`java
OutOfMemoryError       // heap exhausted
StackOverflowError      // recursion too deep
NoClassDefFoundError   // class missing at runtime
VirtualMachineError    // JVM internal failure
\`\`\`

**2. \`Exception\` — Application Errors:**
Conditions your code might be able to handle.

**Subdivision of Exception:**

**a. Checked Exceptions (compile-time enforced):**
- Direct subclasses of \`Exception\` (excluding RuntimeException)
- Compiler requires \`throws\` declaration or try/catch
\`\`\`java
IOException, SQLException, ClassNotFoundException
\`\`\`

**b. Unchecked Exceptions (runtime):**
- Subclasses of \`RuntimeException\`
- No declaration required
\`\`\`java
NullPointerException, IllegalArgumentException
\`\`\`

**Why Throwable at the top?**

Both \`Error\` and \`Exception\` extend \`Throwable\` so they share the catch-and-throw machinery:
\`\`\`java
try {
    risky();
} catch (Throwable t) {           // catches BOTH Error and Exception
    log(t);
}
\`\`\`

**Generally NOT recommended to catch Throwable** — you\'ll catch fatal Errors too. Prefer:
\`\`\`java
try { ... } catch (Exception e) { ... }   // application errors only
\`\`\`

**Throwable methods (inherited by all):**
- \`getMessage()\` — error message
- \`getStackTrace()\` — array of stack frames
- \`getCause()\` — wrapped cause
- \`getSuppressed()\` — suppressed exceptions (try-with-resources)
- \`printStackTrace()\` — print to stderr

**Custom Exceptions:**
\`\`\`java
public class MyException extends Exception { ... }            // checked
public class MyException extends RuntimeException { ... }     // unchecked
\`\`\`

**Don\'t do this:**
\`\`\`java
public class MyException extends Throwable { ... }    // ⚠️ technically legal
public class MyException extends Error { ... }         // very wrong
\`\`\`

**Summary:**
- \`Exception\` extends \`Throwable\`
- Two main Throwable branches: \`Error\` (JVM problems) and \`Exception\` (app problems)
- \`RuntimeException\` is a special unchecked subtree of Exception
- All exceptions inherit Throwable\'s methods (getMessage, getCause, etc.)`
    },
    {
      id: 62,
      category: 'Exception Handling',
      difficulty: 'Easy',
      question: 'How to create a custom exception?',
      answer: `**Extend \`Exception\` (checked) or \`RuntimeException\` (unchecked) and add constructors as needed.**

**1. Custom Checked Exception:**
\`\`\`java
public class InsufficientFundsException extends Exception {
    public InsufficientFundsException() { }

    public InsufficientFundsException(String message) {
        super(message);
    }

    public InsufficientFundsException(String message, Throwable cause) {
        super(message, cause);
    }
}
\`\`\`

**Use:**
\`\`\`java
public void withdraw(double amount) throws InsufficientFundsException {
    if (amount > balance) {
        throw new InsufficientFundsException("Cannot withdraw $" + amount);
    }
    balance -= amount;
}

// Caller MUST handle or declare
try {
    account.withdraw(1000);
} catch (InsufficientFundsException e) {
    log(e);
}
\`\`\`

**2. Custom Unchecked Exception:**
\`\`\`java
public class InvalidOrderException extends RuntimeException {
    public InvalidOrderException(String message) {
        super(message);
    }

    public InvalidOrderException(String message, Throwable cause) {
        super(message, cause);
    }
}
\`\`\`

**Use:**
\`\`\`java
public void processOrder(Order order) {
    if (order.items().isEmpty()) {
        throw new InvalidOrderException("Order has no items");
    }
    // ...
}

// Caller can handle (no requirement)
try {
    process(order);
} catch (InvalidOrderException e) {
    notifyUser(e);
}
\`\`\`

**3. Custom Exception with Additional Context:**
\`\`\`java
public class ApiException extends RuntimeException {
    private final int statusCode;
    private final String endpoint;

    public ApiException(String message, int statusCode, String endpoint) {
        super(message);
        this.statusCode = statusCode;
        this.endpoint = endpoint;
    }

    public ApiException(String message, int statusCode, String endpoint, Throwable cause) {
        super(message, cause);
        this.statusCode = statusCode;
        this.endpoint = endpoint;
    }

    public int getStatusCode() { return statusCode; }
    public String getEndpoint() { return endpoint; }
}

// Use
throw new ApiException("Server error", 500, "/api/users");
\`\`\`

**4. Hierarchy of Custom Exceptions:**
\`\`\`java
public class BankException extends RuntimeException { ... }

public class InsufficientFundsException extends BankException { ... }
public class AccountFrozenException extends BankException { ... }
public class InvalidPinException extends BankException { ... }

// Catch any bank exception
try { ... } catch (BankException e) { ... }

// Or specific
try { ... } catch (InsufficientFundsException e) { ... }
\`\`\`

**Best Practices:**

**1. Provide all 4 standard constructors** (or at least message + message+cause):
\`\`\`java
public class MyException extends RuntimeException {
    public MyException() { super(); }
    public MyException(String message) { super(message); }
    public MyException(String message, Throwable cause) { super(message, cause); }
    public MyException(Throwable cause) { super(cause); }
}
\`\`\`

**2. Use checked when caller MUST handle (e.g., business rule violations).**
**Use unchecked when it\'s a programming or contract error.**

**3. Wrap underlying exceptions:**
\`\`\`java
try {
    db.query(sql);
} catch (SQLException e) {
    throw new ApiException("Failed to fetch", 500, endpoint, e);   // preserve cause
}
\`\`\`

**4. Name with \`Exception\` suffix** (convention).

**5. Prefer specific to general** — multiple custom exceptions, not one big \`AppException\`.

**Modern frameworks often use unchecked:** Spring (\`DataAccessException\`), Hibernate (\`HibernateException\`), Jackson — wrap checked into runtime to reduce boilerplate.

**Summary:**
- Extend \`Exception\` for **checked**, \`RuntimeException\` for **unchecked**
- Provide standard constructors (message, message+cause)
- Add domain-specific fields if useful
- Always preserve the original cause when wrapping`
    },
    {
      id: 63,
      category: 'Exception Handling',
      difficulty: 'Hard',
      question: 'Exception override rules — what compiles? (4 code scenarios)',
      answer: `**Rule:** A subclass\'s overriding method **cannot declare BROADER or NEW CHECKED exceptions** than the parent. It CAN declare narrower checked exceptions, runtime exceptions, or no exceptions.

**Why?** Liskov Substitution Principle — caller of \`Parent.msg()\` only handles \`Parent\`\'s declared exceptions; if \`Child.msg()\` declares more, the caller is unprepared.

**Rules:**
- ✅ Same exception
- ✅ Subclass of declared exception
- ✅ Any \`RuntimeException\` (unchecked)
- ✅ No exception
- ❌ Broader checked exception
- ❌ NEW checked exception parent didn\'t declare

**Scenario 1 — Child throws NEW checked exception:**
\`\`\`java
class Parent {
    void msg() { System.out.println("parent"); }    // no exceptions
}

class Child extends Parent {
    void msg() throws IOException {                  // ❌ NEW checked
        System.out.println("child");
    }
}
\`\`\`
**Output:** **Compile-Time Error.** Parent\'s caller doesn\'t expect IOException.

**Scenario 2 — Child throws RuntimeException:**
\`\`\`java
class Parent {
    void msg() { System.out.println("parent"); }
}

class Child extends Parent {
    void msg() throws ArithmeticException {           // ✓ runtime — allowed
        System.out.println("child");
    }
}

Parent p = new Child();
p.msg();
\`\`\`
**Output:** **child.** Runtime exceptions don\'t need to be declared and can be added freely.

**Scenario 3 — Child throws BROADER checked exception:**
\`\`\`java
class Parent {
    void msg() throws ArithmeticException { ... }   // narrower
}

class Child extends Parent {
    void msg() throws Exception { ... }              // ❌ broader
}
\`\`\`
**Output:** **Compile-Time Error.** \`Exception\` is broader than \`ArithmeticException\`.

**Scenario 4 — Child throws SAME or NARROWER:**
\`\`\`java
class Parent {
    void msg() throws Exception { ... }
}

class Child extends Parent {
    void msg() throws Exception { ... }              // ✓ same
}

class Child2 extends Parent {
    void msg() throws IOException { ... }             // ✓ narrower (IOException extends Exception)
}

class Child3 extends Parent {
    void msg() { ... }                                // ✓ no exceptions
}
\`\`\`
**Output:** **child.** All compile and work.

**Summary Table:**

| Parent declares | Child declares | Compiles? |
|-----------------|----------------|:---------:|
| (nothing) | (nothing) | ✓ |
| (nothing) | RuntimeException | ✓ |
| (nothing) | IOException (checked) | ❌ |
| IOException | IOException | ✓ |
| IOException | FileNotFoundException (subclass) | ✓ |
| IOException | (nothing) | ✓ |
| IOException | Exception (broader) | ❌ |
| IOException | SQLException (sibling) | ❌ |
| Exception | RuntimeException | ✓ |
| Exception | IOException (subclass) | ✓ |
| Exception | Throwable (broader) | ❌ |

**Key Insights:**
- **Unchecked exceptions are ALWAYS allowed** in overrides (parent doesn\'t need to declare them)
- **Checked exceptions:** narrower or same — never broader, never new
- The rule applies to **method signatures**, not body behavior
- Constructors follow similar rules — can\'t declare broader checked exceptions than the parent\'s constructor used in \`super(...)\``
    },
    {
      id: 64,
      category: 'Exception Handling',
      difficulty: 'Medium',
      question: 'Order of catch blocks — what compiles?',
      answer: `**Rule:** Catch blocks must be ordered **from most specific to most general**. Subclass exceptions MUST appear before parent exceptions. Otherwise the parent catch makes the subclass catch UNREACHABLE → compile error.

**Exception hierarchy refresher:**
\`\`\`
Exception
├── ArithmeticException
├── ArrayIndexOutOfBoundsException (extends IndexOutOfBoundsException)
├── NullPointerException
└── ... (many more)
\`\`\`

**RIGHT order — specific first:**
\`\`\`java
try {
    String s = null;
    System.out.println(s.length());          // throws NPE
}
catch (ArithmeticException e) {
    System.out.println("Arithmetic Exception");
}
catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("Array Exception");
}
catch (Exception e) {                          // most general LAST
    System.out.println("Parent Exception occurs");
}
System.out.println("rest of the code");
\`\`\`
**✓ Compiles.**
**Output:** \`Parent Exception occurs\` then \`rest of the code\`.
The NPE doesn\'t match Arithmetic or Array; it matches Exception.

**WRONG order — general first:**
\`\`\`java
try {
    int[] a = new int[5];
    a[5] = 30/0;                                // throws ArrayIndexOutOfBounds
}
catch (Exception e) { ... }                     // ⚠️ catches everything
catch (ArithmeticException e) { ... }            // ❌ unreachable
catch (ArrayIndexOutOfBoundsException e) { ... } // ❌ unreachable
\`\`\`
**❌ Compile-Time Error.**

The compiler error is something like:
\`\`\`
error: exception ArithmeticException has already been caught
\`\`\`

**Why?** Once \`Exception\` catches everything, more specific catches can never be reached.

**Visualization:**

\`\`\`
RIGHT (specific → general):
┌─────────────────────────────────────────┐
│ try { ... }                             │
│ catch (ArithmeticException e) { ... }   │  ← specific
│ catch (ArrayIndexException e) { ... }   │  ← specific
│ catch (Exception e) { ... }             │  ← general (last)
└─────────────────────────────────────────┘
   ✓ Compiles, all branches reachable

WRONG (general → specific):
┌─────────────────────────────────────────┐
│ try { ... }                             │
│ catch (Exception e) { ... }             │  ← general (catches everything)
│ catch (ArithmeticException e) { ... }   │  ← UNREACHABLE
│ catch (ArrayIndexException e) { ... }   │  ← UNREACHABLE
└─────────────────────────────────────────┘
   ❌ Compile error
\`\`\`

**Sibling exceptions (no inheritance) — ANY order works:**
\`\`\`java
try { ... }
catch (IOException e) { ... }      // sibling of SQL
catch (SQLException e) { ... }     // sibling of IO
catch (Exception e) { ... }         // parent — LAST
\`\`\`

**Multi-catch (Java 7+) avoids ordering issue when handlers are identical:**
\`\`\`java
try { ... }
catch (ArithmeticException | ArrayIndexOutOfBoundsException e) {
    // handle both — same logic
}
catch (Exception e) {
    // catch-all
}
\`\`\`

**Restriction on multi-catch:** Combined types cannot have inheritance relationship:
\`\`\`java
catch (IOException | FileNotFoundException e) { }   // ❌ FNFE extends IOE — redundant
\`\`\`

**Quick Mental Model:**
1. List all exceptions you want to catch
2. Sort by specificity (subclass first, parent last)
3. Compiler verifies each catch is reachable

**Summary:**
- ✅ Order: most specific to most general
- ❌ Parent first → subclass unreachable → compile error
- Sibling exceptions (no inheritance) — any order works
- Multi-catch (\`A | B | C\`) groups handlers; combined types must not be related`
    }
  ]

  // Filter questions based on problemLimit (for Top 100/300 mode)
  const limitedQuestions = problemLimit ? questions.slice(0, problemLimit) : questions

  // Available categories with counts (for tab filter)
  const categoryCounts = limitedQuestions.reduce((acc, q) => {
    acc[q.category] = (acc[q.category] || 0) + 1
    return acc
  }, {})
  const availableCategories = ['All', ...Object.keys(categoryCounts).sort((a, b) => {
    const diff = categoryCounts[b] - categoryCounts[a]
    return diff !== 0 ? diff : a.localeCompare(b)
  })]

  // Available difficulties with counts (for difficulty filter)
  const difficultyOrder = ['Easy', 'Medium', 'Hard']
  const difficultyCounts = limitedQuestions.reduce((acc, q) => {
    acc[q.difficulty] = (acc[q.difficulty] || 0) + 1
    return acc
  }, {})
  const availableDifficulties = ['All', ...difficultyOrder.filter(d => difficultyCounts[d])]

  // Apply both filters
  const displayQuestions = limitedQuestions.filter(q =>
    (activeCategory === 'All' || q.category === activeCategory) &&
    (activeDifficulty === 'All' || q.difficulty === activeDifficulty)
  )

  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id)
  }

  const getCategoryColor = (category) => {
    const colors = {
      'OOP Principles': '#8b5cf6',
      'Collections Framework': '#3b82f6',
      'Exception Handling': '#10b981',
      'Multithreading': '#ef4444',
      'JVM Internals': '#f59e0b',
      'String Manipulation': '#ec4899',
      'Design Patterns': '#06b6d4',
      'Performance': '#14b8a6',
      'Class Loading': '#a855f7',
      'Functional Programming': '#22c55e',
      'Memory Model': '#f97316',
      'Reflection API': '#0ea5e9',
      'Serialization': '#0891b2'
    }
    return colors[category] || '#6b7280'
  }

  const getDifficultyColor = (difficulty) => {
    return difficulty === 'Medium' ? '#f59e0b' : '#dc2626'
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', minHeight: '100vh' }}>
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
          Core Java Interview Questions
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

      <CollapsibleSidebar
        items={displayQuestions}
        selectedIndex={expandedQuestion ? displayQuestions.findIndex(q => q.id === expandedQuestion) : -1}
        onSelect={(index) => toggleQuestion(displayQuestions[index].id)}
        title="Questions"
        getItemLabel={(item) => `${item.id}. ${item.category}`}
        getItemIcon={() => '❓'}
        primaryColor="#3b82f6"
      />

      <p style={{
        fontSize: '1.1rem',
        color: '#d1d5db',
        textAlign: 'left',
        marginBottom: '1rem',
        lineHeight: '1.6'
      }}>
        Comprehensive Core Java questions covering fundamental and advanced concepts. Medium and Hard difficulty levels to prepare for senior-level interviews.
      </p>

      {/* Difficulty Filter Tabs */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        marginBottom: '0.75rem',
        alignItems: 'center'
      }}>
        <span style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: '600', marginRight: '0.25rem' }}>Difficulty:</span>
        {availableDifficulties.map((diff) => {
          const isActive = activeDifficulty === diff
          const count = diff === 'All' ? limitedQuestions.length : (difficultyCounts[diff] || 0)
          const color = diff === 'Easy' ? '#22c55e' : diff === 'Medium' ? '#f59e0b' : diff === 'Hard' ? '#ef4444' : '#3b82f6'
          return (
            <button
              key={diff}
              onClick={() => setActiveDifficulty(diff)}
              style={{
                padding: '0.4rem 0.8rem',
                fontSize: '0.8rem',
                fontWeight: isActive ? '700' : '500',
                background: isActive ? `${color}25` : 'rgba(31, 41, 55, 0.6)',
                color: isActive ? color : '#9ca3af',
                border: `1px solid ${isActive ? color : '#374151'}`,
                borderRadius: '999px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = `${color}15`
                  e.currentTarget.style.color = color
                  e.currentTarget.style.borderColor = `${color}80`
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(31, 41, 55, 0.6)'
                  e.currentTarget.style.color = '#9ca3af'
                  e.currentTarget.style.borderColor = '#374151'
                }
              }}
            >
              <span>{diff}</span>
              <span style={{
                fontSize: '0.7rem',
                padding: '0.1rem 0.4rem',
                borderRadius: '999px',
                background: isActive ? color : '#374151',
                color: isActive ? '#fff' : '#9ca3af',
                fontWeight: '700',
                minWidth: '1.5rem',
                textAlign: 'center'
              }}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Category Filter Tabs */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        marginBottom: '1.5rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid #374151'
      }}>
        {availableCategories.map((cat) => {
          const isActive = activeCategory === cat
          const count = cat === 'All' ? limitedQuestions.length : (categoryCounts[cat] || 0)
          const color = cat === 'All' ? '#3b82f6' : getCategoryColor(cat)
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.5rem 0.9rem',
                fontSize: '0.85rem',
                fontWeight: isActive ? '700' : '500',
                background: isActive ? `${color}25` : 'rgba(31, 41, 55, 0.6)',
                color: isActive ? color : '#9ca3af',
                border: `1px solid ${isActive ? color : '#374151'}`,
                borderRadius: '999px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = `${color}15`
                  e.currentTarget.style.color = color
                  e.currentTarget.style.borderColor = `${color}80`
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(31, 41, 55, 0.6)'
                  e.currentTarget.style.color = '#9ca3af'
                  e.currentTarget.style.borderColor = '#374151'
                }
              }}
            >
              <span>{cat}</span>
              <span style={{
                fontSize: '0.7rem',
                padding: '0.1rem 0.45rem',
                borderRadius: '999px',
                background: isActive ? color : '#374151',
                color: isActive ? '#fff' : '#9ca3af',
                fontWeight: '700',
                minWidth: '1.5rem',
                textAlign: 'center'
              }}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {displayQuestions.map((q) => (
          <div
            key={q.id}
            style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              borderRadius: '12px',
              border: `3px solid ${expandedQuestion === q.id ? getCategoryColor(q.category) : '#374151'}`,
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
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    backgroundColor: getCategoryColor(q.category),
                    color: 'white',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {q.category}
                  </div>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    backgroundColor: getDifficultyColor(q.difficulty),
                    color: 'white',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {q.difficulty}
                  </div>
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div onClick={(e) => e.stopPropagation()} style={{ transform: 'scale(0.85)' }}>
                  <CompletionCheckbox problemId={`CoreJavaQuestions-${q.id}`} />
                </div>
                <div style={{
                  fontSize: '1.5rem',
                  color: getCategoryColor(q.category),
                  fontWeight: 'bold',
                  transform: expandedQuestion === q.id ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}>
                  ▼
                </div>
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
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#a5b4fc', marginBottom: '0.5rem' }}>
          💡 Core Java Mastery Path
        </h3>
        <ul style={{ color: '#c7d2fe', lineHeight: '1.8', margin: '0.5rem 0' }}>
          <li>Master OOP principles - foundation of Java programming</li>
          <li>Understand Collections framework - essential for data manipulation</li>
          <li>Learn exception handling - write robust, error-resistant code</li>
          <li>Study multithreading - leverage modern multi-core processors</li>
          <li>Explore JVM internals - optimize performance and memory</li>
          <li>Practice design patterns - write maintainable, scalable code</li>
        </ul>
      </div>
    </div>
  )
}

export default CoreJavaQuestions
