import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CompletionCheckbox from '../../components/CompletionCheckbox'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

function CoreJavaQuestions({ onBack, breadcrumb, problemLimit }) {
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
    }
  ]

  // Filter questions based on problemLimit (for Top 100/300 mode)
  const displayQuestions = problemLimit ? questions.slice(0, problemLimit) : questions

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
      'Reflection API': '#0ea5e9'
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
        marginBottom: '2rem',
        lineHeight: '1.6'
      }}>
        Comprehensive Core Java questions covering fundamental and advanced concepts. Medium and Hard difficulty levels to prepare for senior-level interviews.
      </p>

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
