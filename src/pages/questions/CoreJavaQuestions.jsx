import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

function CoreJavaQuestions({ onBack, breadcrumb }) {
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
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
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
    }
  ]

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
      'Performance': '#14b8a6'
    }
    return colors[category] || '#6b7280'
  }

  const getDifficultyColor = (difficulty) => {
    return difficulty === 'Medium' ? '#f59e0b' : '#dc2626'
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
          Core Java Interview Questions
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

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
