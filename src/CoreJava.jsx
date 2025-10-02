import { useState, useEffect } from 'react'

// Simple syntax highlighter for Java code
const SyntaxHighlighter = ({ code }) => {
  const highlightJava = (code) => {
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    // Store protected content with placeholders
    const protectedContent = []
    let placeholder = 0

    // Protect comments first
    highlighted = highlighted.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, (match) => {
      const id = `___COMMENT_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #6a9955; font-style: italic;">${match}</span>` })
      return id
    })

    // Protect strings
    highlighted = highlighted.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, (match) => {
      const id = `___STRING_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #ce9178;">${match}</span>` })
      return id
    })

    // Apply syntax highlighting to remaining code
    highlighted = highlighted
      // Keywords - purple
      .replace(/\b(public|private|protected|static|final|class|interface|extends|implements|new|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|import|package|void|abstract|synchronized|volatile|transient|native|strictfp|super|this|null|sealed|permits|non-sealed|record|instanceof|var)\b/g, '<span style="color: #c586c0;">$1</span>')

      // Boolean and primitives - blue
      .replace(/\b(true|false|int|double|float|long|short|byte|char|boolean)\b/g, '<span style="color: #569cd6;">$1</span>')

      // Types and classes - light green
      .replace(/\b(String|List|ArrayList|LinkedList|HashMap|TreeMap|HashSet|TreeSet|Map|Set|Queue|Deque|Collection|Arrays|Collections|Thread|Runnable|Executor|ExecutorService|CompletableFuture|Stream|Optional|Path|Files|Pattern|Matcher|StringBuilder|StringBuffer|Integer|Double|Float|Long|Short|Byte|Character|Boolean|Object|System|Math|Scanner|BufferedReader|FileReader|FileWriter|PrintWriter|InputStream|OutputStream|Exception|RuntimeException|IOException|SQLException|WeakReference|SoftReference|PhantomReference|ReferenceQueue)\b/g, '<span style="color: #4ec9b0;">$1</span>')

      // Annotations - yellow
      .replace(/(@\w+)/g, '<span style="color: #dcdcaa;">$1</span>')

      // Numbers - light green
      .replace(/\b(\d+\.?\d*[fLdD]?)\b/g, '<span style="color: #b5cea8;">$1</span>')

      // Method calls - yellow
      .replace(/\b([a-z_]\w*)\s*\(/g, '<span style="color: #dcdcaa;">$1</span>(')

    // Restore protected content
    protectedContent.forEach(({ id, replacement }) => {
      highlighted = highlighted.replace(id, replacement)
    })

    return highlighted
  }

  return (
    <pre style={{
      margin: 0,
      fontFamily: '"Consolas", "Monaco", "Courier New", monospace',
      fontSize: '0.85rem',
      lineHeight: '1.6',
      color: '#d4d4d4',
      whiteSpace: 'pre',
      overflowX: 'auto',
      textAlign: 'left',
      padding: 0
    }}>
      <code dangerouslySetInnerHTML={{ __html: highlightJava(code) }} />
    </pre>
  )
}

function CoreJava({ onBack }) {
  const [selectedConcept, setSelectedConcept] = useState(null)
  const [expandedSections, setExpandedSections] = useState({})

  const toggleSection = (sectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }))
  }

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

    return sections
  }

  const handleConceptClick = (concept) => {
    setSelectedConcept(concept)
  }

  // Keyboard navigation - Escape to deselect
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedConcept) {
        setSelectedConcept(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedConcept])

  const concepts = [
    {
      name: 'Encapsulation',
      icon: '🔹',
      explanation: `Bundling data and methods that operate on that data within a single unit (class). Provides data hiding through access modifiers (private, protected, public) to control access to internal state.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ BankAccount
// ═══════════════════════════════════════════════════════════════════════════
// Encapsulation - hiding internal state

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Controlled access through public methods
// ═══════════════════════════════════════════════════════════════════════════
public class BankAccount {
private double balance;  // private field
private String accountNumber;

public BankAccount(String accountNumber) {
this.accountNumber = accountNumber;
this.balance = 0.0;
}


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Getter with validation
// ═══════════════════════════════════════════════════════════════════════════
// Controlled access through public methods
public void deposit(double amount) {
if (amount > 0) {
balance += amount;
}
}

public boolean withdraw(double amount) {
if (amount > 0 && balance >= amount) {
balance -= amount;
return true;
}
return false;
}


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Implementation
// ═══════════════════════════════════════════════════════════════════════════
// Getter with validation
public double getBalance() {
return balance;
}
}

// Usage
BankAccount account = new BankAccount("123456");
account.deposit(1000.0);
account.withdraw(250.0);
System.out.println(account.getBalance());
// Output: 750.0`
    },
    {
      name: 'Thread Management',
      icon: '🔹',
      explanation: `Creating and managing threads using Thread class, Runnable interface, and thread lifecycle (new, runnable, blocked, waiting, terminated). Thread priorities and daemon threads.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ MyThread
// ═══════════════════════════════════════════════════════════════════════════
// Method 1: Extend Thread class

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Method 2: Implement Runnable
// ═══════════════════════════════════════════════════════════════════════════
class MyThread extends Thread {
public void run() {
for (int i = 0; i < 3; i++) {
System.out.println(Thread.currentThread().getName() + ": " + i);
try { Thread.sleep(100); } catch (InterruptedException e) {}
}
}
}


// ═══════════════════════════════════════════════════════════════════════════
// ✦ MyRunnable
// ═══════════════════════════════════════════════════════════════════════════
// Method 2: Implement Runnable

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Creating and starting threads
// ═══════════════════════════════════════════════════════════════════════════
class MyRunnable implements Runnable {
public void run() {
System.out.println(Thread.currentThread().getName() + " executing");
}
}


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Lambda with Runnable
// ═══════════════════════════════════════════════════════════════════════════
// Creating and starting threads
MyThread thread1 = new MyThread();
thread1.setName("Worker-1");
thread1.start();
// Output: Worker-1: 0
// Output: Worker-1: 1
// Output: Worker-1: 2

Thread thread2 = new Thread(new MyRunnable());
thread2.start();
// Output: Thread-1 executing


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Daemon thread - runs in background
// ═══════════════════════════════════════════════════════════════════════════
// Lambda with Runnable
Thread thread3 = new Thread(() -> {
System.out.println("Lambda thread: " + Thread.currentThread().getId());
});
thread3.start();
// Output: Lambda thread: 15


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Thread priorities
// ═══════════════════════════════════════════════════════════════════════════
// Daemon thread - runs in background
Thread daemon = new Thread(() -> {
while (true) {
System.out.println("Daemon running...");
try { Thread.sleep(500); } catch (InterruptedException e) {}
}
});
daemon.setDaemon(true);
daemon.start();


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Implementation
// ═══════════════════════════════════════════════════════════════════════════
// Thread priorities
thread1.setPriority(Thread.MAX_PRIORITY);  // 10
thread2.setPriority(Thread.MIN_PRIORITY);  // 1
System.out.println("Thread 1 priority: " + thread1.getPriority());
// Output: Thread 1 priority: 10`
    },
    {
      name: 'Synchronization',
      icon: '🔹',
      explanation: `Coordinating access to shared resources using synchronized keyword, wait/notify mechanism, and volatile variables. Prevents race conditions and ensures memory visibility.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Synchronized method
// ═══════════════════════════════════════════════════════════════════════════
class Counter {
private int count = 0;


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Synchronized block
// ═══════════════════════════════════════════════════════════════════════════
// Synchronized method
public synchronized void increment() {
count++;
}

public synchronized int getCount() {
return count;
}


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Usage - thread-safe counter
// ═══════════════════════════════════════════════════════════════════════════
// Synchronized block
public void incrementBlock() {
synchronized(this) {
count++;
}
}
}


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Wait/Notify pattern - Producer/Consumer
// ═══════════════════════════════════════════════════════════════════════════
// Usage - thread-safe counter
Counter counter = new Counter();
Thread t1 = new Thread(() -> {
for (int i = 0; i < 1000; i++) counter.increment();
});
Thread t2 = new Thread(() -> {
for (int i = 0; i < 1000; i++) counter.increment();
});
t1.start();
t2.start();
t1.join();
t2.join();
System.out.println("Final count: " + counter.getCount());
// Output: Final count: 2000 (correct with synchronization)


// ═══════════════════════════════════════════════════════════════════════════
// ✦ SharedResource
// ═══════════════════════════════════════════════════════════════════════════
// Wait/Notify pattern - Producer/Consumer

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Volatile keyword - memory visibility
// ═══════════════════════════════════════════════════════════════════════════
class SharedResource {
private int data;
private boolean hasData = false;

public synchronized void produce(int value) throws InterruptedException {
while (hasData) {
wait();  // Wait until consumed
}
data = value;
hasData = true;
System.out.println("Produced: " + value);
notify();  // Notify consumer
}

public synchronized int consume() throws InterruptedException {
while (!hasData) {
wait();  // Wait until produced
}
hasData = false;
System.out.println("Consumed: " + data);
notify();  // Notify producer
return data;
}
}


// ═══════════════════════════════════════════════════════════════════════════
// ✦ VolatileExample
// ═══════════════════════════════════════════════════════════════════════════
// Volatile keyword - memory visibility

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Implementation
// ═══════════════════════════════════════════════════════════════════════════
class VolatileExample {
private volatile boolean flag = false;

public void writer() {
flag = true;  // Visible to all threads immediately
}

public void reader() {
if (flag) {
System.out.println("Flag is true!");
}
}
}`
    },
    {
      name: 'Locks & Semaphores',
      icon: '🔹',
      explanation: `Advanced synchronization primitives: ReentrantLock for flexible locking, ReadWriteLock for reader-writer scenarios, Semaphore for resource counting, CountDownLatch for coordination.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ ReentrantLock - more flexible than synch
// ═══════════════════════════════════════════════════════════════════════════
import java.util.concurrent.locks.*;
import java.util.concurrent.*;


// ═══════════════════════════════════════════════════════════════════════════
// ✦ BankAccount
// ═══════════════════════════════════════════════════════════════════════════
// ReentrantLock - more flexible than synchronized

// ═══════════════════════════════════════════════════════════════════════════
// ✦ ReadWriteLock - multiple readers, single
// ═══════════════════════════════════════════════════════════════════════════
class BankAccount {
private double balance = 0;
private ReentrantLock lock = new ReentrantLock();

public void deposit(double amount) {
lock.lock();
try {
balance += amount;
System.out.println("Deposited: " + amount + ", Balance: " + balance);
} finally {
lock.unlock();  // Always unlock in finally
}
}

public boolean tryDeposit(double amount) {
if (lock.tryLock()) {  // Non-blocking attempt
try {
balance += amount;
return true;
} finally {
lock.unlock();
}
}
return false;
}
}


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Cache
// ═══════════════════════════════════════════════════════════════════════════
// ReadWriteLock - multiple readers, single writer

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Semaphore - limit concurrent access
// ═══════════════════════════════════════════════════════════════════════════
class Cache {
private Map<String, String> data = new HashMap<>();
private ReadWriteLock rwLock = new ReentrantReadWriteLock();

public String read(String key) {
rwLock.readLock().lock();
try {
return data.get(key);
} finally {
rwLock.readLock().unlock();
}
}

public void write(String key, String value) {
rwLock.writeLock().lock();
try {
data.put(key, value);
System.out.println("Written: " + key + " = " + value);
} finally {
rwLock.writeLock().unlock();
}
}
}


// ═══════════════════════════════════════════════════════════════════════════
// ✦ CountDownLatch - wait for multiple threa
// ═══════════════════════════════════════════════════════════════════════════
// Semaphore - limit concurrent access
Semaphore semaphore = new Semaphore(3);  // Allow 3 concurrent threads
for (int i = 0; i < 5; i++) {
int id = i;
new Thread(() -> {
try {
semaphore.acquire();
System.out.println("Thread " + id + " acquired permit");
Thread.sleep(1000);
semaphore.release();
System.out.println("Thread " + id + " released permit");
} catch (InterruptedException e) {}
}).start();
}
// Output: Only 3 threads execute concurrently


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Implementation
// ═══════════════════════════════════════════════════════════════════════════
// CountDownLatch - wait for multiple threads
CountDownLatch latch = new CountDownLatch(3);
for (int i = 0; i < 3; i++) {
new Thread(() -> {
System.out.println("Task completed");
latch.countDown();
}).start();
}
latch.await();  // Wait for all 3 threads
System.out.println("All tasks completed!");
// Output: All tasks completed! (after 3 countDowns)`
    },
    {
      name: 'Executor Framework',
      icon: '🔹',
      explanation: `High-level concurrency API for managing thread pools. ThreadPoolExecutor, ScheduledExecutorService, and ForkJoinPool for different workload patterns and task scheduling.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Fixed thread pool
// ═══════════════════════════════════════════════════════════════════════════
import java.util.concurrent.*;


// ═══════════════════════════════════════════════════════════════════════════
// ✦ (pool reuses threads for remaining tasks
// ═══════════════════════════════════════════════════════════════════════════
// Fixed thread pool
ExecutorService executor = Executors.newFixedThreadPool(3);
for (int i = 0; i < 5; i++) {
int taskId = i;
executor.submit(() -> {
System.out.println("Task " + taskId + " by " + Thread.currentThread().getName());
return taskId * taskId;
});
}
executor.shutdown();
// Output: Task 0 by pool-1-thread-1
// Output: Task 1 by pool-1-thread-2
// Output: Task 2 by pool-1-thread-3

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Callable with Future - returns result
// ═══════════════════════════════════════════════════════════════════════════
// (pool reuses threads for remaining tasks)


// ═══════════════════════════════════════════════════════════════════════════
// ✦ ScheduledExecutorService - delayed/perio
// ═══════════════════════════════════════════════════════════════════════════
// Callable with Future - returns result
ExecutorService exec = Executors.newSingleThreadExecutor();
Future<Integer> future = exec.submit(() -> {
Thread.sleep(1000);
return 42;
});
System.out.println("Waiting for result...");
Integer result = future.get();  // Blocks until complete
System.out.println("Result: " + result);
// Output: Waiting for result...
// Output: Result: 42 (after 1 second)
exec.shutdown();


// ═══════════════════════════════════════════════════════════════════════════
// ✦ (repeats every second)
// ═══════════════════════════════════════════════════════════════════════════
// ScheduledExecutorService - delayed/periodic tasks
ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(2);
scheduler.schedule(() -> {
System.out.println("Executed after 2 seconds");
}, 2, TimeUnit.SECONDS);

scheduler.scheduleAtFixedRate(() -> {
System.out.println("Periodic task: " + System.currentTimeMillis());
}, 0, 1, TimeUnit.SECONDS);
// Output: Periodic task: 1234567890
// Output: Periodic task: 1234567891

// ═══════════════════════════════════════════════════════════════════════════
// ✦ invokeAll - execute multiple tasks
// ═══════════════════════════════════════════════════════════════════════════
// (repeats every second)


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Implementation
// ═══════════════════════════════════════════════════════════════════════════
// invokeAll - execute multiple tasks
List<Callable<String>> tasks = Arrays.asList(
() -> "Task 1",
() -> "Task 2",
() -> "Task 3"
);
ExecutorService pool = Executors.newFixedThreadPool(3);
List<Future<String>> results = pool.invokeAll(tasks);
for (Future<String> f : results) {
System.out.println(f.get());
}
// Output: Task 1
// Output: Task 2
// Output: Task 3
pool.shutdown();`
    },
    {
      name: 'CompletableFuture',
      icon: '🔹',
      explanation: `Asynchronous programming with composable futures. Supports chaining operations, combining multiple futures, and handling exceptions in async workflows.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Simple async execution
// ═══════════════════════════════════════════════════════════════════════════
import java.util.concurrent.*;


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Chaining operations
// ═══════════════════════════════════════════════════════════════════════════
// Simple async execution
CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
try { Thread.sleep(1000); } catch (InterruptedException e) {}
return "Hello";
});
System.out.println("Doing other work...");
System.out.println("Result: " + future.get());
// Output: Doing other work...
// Output: Result: Hello (after 1 second)


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Combining multiple futures
// ═══════════════════════════════════════════════════════════════════════════
// Chaining operations
CompletableFuture.supplyAsync(() -> "Hello")
.thenApply(s -> s + " World")
.thenApply(String::toUpperCase)
.thenAccept(System.out::println);
// Output: HELLO WORLD


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Exception handling
// ═══════════════════════════════════════════════════════════════════════════
// Combining multiple futures
CompletableFuture<Integer> future1 = CompletableFuture.supplyAsync(() -> 10);
CompletableFuture<Integer> future2 = CompletableFuture.supplyAsync(() -> 20);
CompletableFuture<Integer> combined = future1.thenCombine(future2, (a, b) -> a + b);
System.out.println("Combined result: " + combined.get());
// Output: Combined result: 30


// ═══════════════════════════════════════════════════════════════════════════
// ✦ allOf - wait for multiple futures
// ═══════════════════════════════════════════════════════════════════════════
// Exception handling
CompletableFuture.supplyAsync(() -> {
if (Math.random() > 0.5) throw new RuntimeException("Error!");
return "Success";
})
.exceptionally(ex -> "Recovered from: " + ex.getMessage())
.thenAccept(System.out::println);
// Output: Success OR Recovered from: Error!


// ═══════════════════════════════════════════════════════════════════════════
// ✦ anyOf - complete when any future complet
// ═══════════════════════════════════════════════════════════════════════════
// allOf - wait for multiple futures
CompletableFuture<String> f1 = CompletableFuture.supplyAsync(() -> "Task1");
CompletableFuture<String> f2 = CompletableFuture.supplyAsync(() -> "Task2");
CompletableFuture<String> f3 = CompletableFuture.supplyAsync(() -> "Task3");
CompletableFuture<Void> allDone = CompletableFuture.allOf(f1, f2, f3);
allDone.join();
System.out.println("All completed: " + f1.get() + ", " + f2.get() + ", " + f3.get());
// Output: All completed: Task1, Task2, Task3


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Implementation
// ═══════════════════════════════════════════════════════════════════════════
// anyOf - complete when any future completes
CompletableFuture<Object> any = CompletableFuture.anyOf(f1, f2, f3);
System.out.println("First completed: " + any.get());
// Output: First completed: Task1 (or Task2 or Task3)`
    },
    {
      name: 'Class Loading',
      icon: '🔹',
      explanation: `Three-phase process: loading (finding class files), linking (verification, preparation, resolution), and initialization. Bootstrap, extension, and application classloaders.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ CustomClassLoader
// ═══════════════════════════════════════════════════════════════════════════
// Custom class loader

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Using custom class loader
// ═══════════════════════════════════════════════════════════════════════════
class CustomClassLoader extends ClassLoader {
@Override
public Class<?> loadClass(String name) throws ClassNotFoundException {
System.out.println("Loading class: " + name);
return super.loadClass(name);
}
}


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Class loader hierarchy
// ═══════════════════════════════════════════════════════════════════════════
// Using custom class loader
CustomClassLoader loader = new CustomClassLoader();
try {
Class<?> clazz = loader.loadClass("java.lang.String");
System.out.println("Loaded: " + clazz.getName());
} catch (ClassNotFoundException e) {
System.out.println("Error: " + e.getMessage());
}
// Output: Loading class: java.lang.String
// Output: Loaded: java.lang.String


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Loading class from different loader
// ═══════════════════════════════════════════════════════════════════════════
// Class loader hierarchy
ClassLoader appLoader = ClassLoader.getSystemClassLoader();
ClassLoader extLoader = appLoader.getParent();
ClassLoader bootLoader = extLoader.getParent();

System.out.println("App ClassLoader: " + appLoader.getClass().getName());
System.out.println("Platform ClassLoader: " + extLoader.getClass().getName());
System.out.println("Bootstrap ClassLoader: " + bootLoader);  // null (native)
// Output: App ClassLoader: jdk.internal.loader.ClassLoaders$AppClassLoader
// Output: Platform ClassLoader: jdk.internal.loader.ClassLoaders$PlatformClassLoader
// Output: Bootstrap ClassLoader: null


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Class initialization
// ═══════════════════════════════════════════════════════════════════════════
// Loading class from different loader
Class<?> stringClass = String.class;
ClassLoader stringLoader = stringClass.getClassLoader();
System.out.println("String class loader: " + stringLoader);  // null (bootstrap)
// Output: String class loader: null

Class<?> myClass = CustomClassLoader.class;
System.out.println("Custom class loader: " + myClass.getClassLoader());
// Output: Custom class loader: jdk.internal.loader.ClassLoaders$AppClassLoader


// ═══════════════════════════════════════════════════════════════════════════
// ✦ InitDemo
// ═══════════════════════════════════════════════════════════════════════════
// Class initialization

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Class.forName() with initialization
// ═══════════════════════════════════════════════════════════════════════════
class InitDemo {
static {
System.out.println("Static block executed");
}
static int value = initialize();

static int initialize() {
System.out.println("Static initializer called");
return 42;
}
}

System.out.println("Before class usage");
int val = InitDemo.value;  // Triggers class initialization
System.out.println("Value: " + val);
// Output: Before class usage
// Output: Static block executed
// Output: Static initializer called
// Output: Value: 42


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Implementation
// ═══════════════════════════════════════════════════════════════════════════
// Class.forName() with initialization
try {
Class.forName("InitDemo");  // Initializes class
System.out.println("Class loaded and initialized");
} catch (ClassNotFoundException e) {
System.out.println("Error: " + e.getMessage());
}`
    },
    {
      name: 'Bytecode',
      icon: '🔹',
      explanation: `Platform-independent intermediate representation of Java source code. Stack-based instruction set with ~200 opcodes for arithmetic, control flow, and method invocation.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Simple method to demonstrate bytecode
// ═══════════════════════════════════════════════════════════════════════════
import java.io.*;


// ═══════════════════════════════════════════════════════════════════════════
// ✦ BytecodeDemo
// ═══════════════════════════════════════════════════════════════════════════
// Simple method to demonstrate bytecode

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Bytecode for add method (javap -c Byteco
// ═══════════════════════════════════════════════════════════════════════════
public class BytecodeDemo {
public int add(int a, int b) {
return a + b;
}
}


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Analyzing bytecode at runtime
// ═══════════════════════════════════════════════════════════════════════════
// Bytecode for add method (javap -c BytecodeDemo):
/*
public int add(int, int);
Code:
0: iload_1        // Load first parameter onto stack
1: iload_2        // Load second parameter onto stack
2: iadd           // Add top two stack values
3: ireturn        // Return integer result
*/


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Common bytecode instructions:
// ═══════════════════════════════════════════════════════════════════════════
// Analyzing bytecode at runtime
try {
Class<?> clazz = BytecodeDemo.class;
System.out.println("Class: " + clazz.getName());

// Get methods
for (java.lang.reflect.Method method : clazz.getDeclaredMethods()) {
System.out.println("Method: " + method.getName());
System.out.println("Parameters: " + method.getParameterCount());
System.out.println("Return type: " + method.getReturnType().getName());
}
} catch (Exception e) {
System.out.println("Error: " + e.getMessage());
}
// Output: Class: BytecodeDemo
// Output: Method: add
// Output: Parameters: 2
// Output: Return type: int


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Load instructions: iload, aload, lload, 
// ═══════════════════════════════════════════════════════════════════════════
// Common bytecode instructions:

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Store instructions: istore, astore, lsto
// ═══════════════════════════════════════════════════════════════════════════
// Load instructions: iload, aload, lload, fload, dload

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Arithmetic: iadd, isub, imul, idiv
// ═══════════════════════════════════════════════════════════════════════════
// Store instructions: istore, astore, lstore, fstore, dstore

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Control flow: if_icmpeq, goto, ifeq, ifn
// ═══════════════════════════════════════════════════════════════════════════
// Arithmetic: iadd, isub, imul, idiv

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Method invocation: invokevirtual, invoke
// ═══════════════════════════════════════════════════════════════════════════
// Control flow: if_icmpeq, goto, ifeq, ifne

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Object operations: new, newarray, getfie
// ═══════════════════════════════════════════════════════════════════════════
// Method invocation: invokevirtual, invokespecial, invokestatic

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Stack-based execution example
// ═══════════════════════════════════════════════════════════════════════════
// Object operations: new, newarray, getfield, putfield


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Bytecode (conceptual):
// ═══════════════════════════════════════════════════════════════════════════
// Stack-based execution example
public int calculate(int x) {
int y = 10;
int z = x + y;
return z * 2;
}


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Bytecode verification
// ═══════════════════════════════════════════════════════════════════════════
// Bytecode (conceptual):
/*
0: bipush 10      // Push 10 onto stack
2: istore_2       // Store in local variable y
3: iload_1        // Load x onto stack
4: iload_2        // Load y onto stack
5: iadd           // Add: stack now has x+y
6: istore_3       // Store in z
7: iload_3        // Load z
8: iconst_2       // Push 2
9: imul           // Multiply: z*2
10: ireturn       // Return result
*/

System.out.println("Result: " + new BytecodeDemo().calculate(5));
// Output: Result: 30


// ═══════════════════════════════════════════════════════════════════════════
// ✦ JVM verifies: correct types, no stack ov
// ═══════════════════════════════════════════════════════════════════════════
// Bytecode verification

// ═══════════════════════════════════════════════════════════════════════════
// ✦ valid method calls, proper exception han
// ═══════════════════════════════════════════════════════════════════════════
// JVM verifies: correct types, no stack overflow/underflow,

// ═══════════════════════════════════════════════════════════════════════════
// ✦ VerificationDemo
// ═══════════════════════════════════════════════════════════════════════════
// valid method calls, proper exception handling


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Bytecode verifier ensures null check bef
// ═══════════════════════════════════════════════════════════════════════════
class VerificationDemo {
public void safeMethod(String str) {
if (str != null) {
System.out.println(str.length());
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Implementation
// ═══════════════════════════════════════════════════════════════════════════
// Bytecode verifier ensures null check before dereference
}
}`
    }
  ]

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '95%',
      margin: '120px auto 0',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
      border: '3px solid rgba(16, 185, 129, 0.4)'
    }}>
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
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          ← Back to Menu
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#1f2937',
          margin: 0,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          ☕ Core Java Fundamentals
        </h1>
        <div style={{ width: '120px' }}></div>
      </div>

      <div style={{
        backgroundColor: 'rgba(16, 185, 129, 0.05)',
        padding: '2.5rem 10rem',
        borderRadius: '16px',
        border: '3px solid rgba(16, 185, 129, 0.3)',
        marginBottom: '2rem'
      }}>
        <p style={{
          fontSize: '1.3rem',
          color: '#374151',
          fontWeight: '500',
          margin: 0,
          lineHeight: '1.8',
          textAlign: 'center'
        }}>
          Master the foundational concepts of Java programming including OOP principles, data structures, exception handling, and core APIs.
        </p>
      </div>

      
      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedConcept ? '350px 1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {!selectedConcept ? (
          concepts.map((concept, idx) => (
            <div
              key={idx}
              onClick={() => handleConceptClick(concept)}
              style={{
                backgroundColor: 'rgba(16, 185, 129, 0.05)',
                padding: '2rem',
                borderRadius: '16px',
                border: '3px solid rgba(16, 185, 129, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.15)'
                e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.3)'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>
                {concept.icon || '🔹'}
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#047857',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                {concept.name}
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#6b7280',
                lineHeight: '1.6',
                textAlign: 'center'
              }}>
                {concept.explanation?.substring(0, 150) || ''}...
              </p>
            </div>
          ))
        ) : (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button
                onClick={() => setSelectedConcept(null)}
                style={{
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                ← Back to All Concepts
              </button>
              
              {concepts.map((concept, idx) => (
                <div
                  key={idx}
                  onClick={() => handleConceptClick(concept)}
                  style={{
                    padding: '1rem',
                    backgroundColor: selectedConcept?.name === concept.name 
                      ? 'rgba(16, 185, 129, 0.15)' 
                      : 'rgba(243, 244, 246, 1)',
                    borderRadius: '8px',
                    border: selectedConcept?.name === concept.name 
                      ? '2px solid rgba(16, 185, 129, 0.5)' 
                      : '2px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span style={{ fontWeight: '600', color: '#047857' }}>
                    {concept.icon || '🔹'} {concept.name}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#047857',
                marginBottom: '1.5rem'
              }}>
                {selectedConcept.icon || '🔹'} {selectedConcept.name}
              </h2>

              <div style={{
                backgroundColor: 'rgba(16, 185, 129, 0.05)',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '2px solid rgba(16, 185, 129, 0.2)',
                marginBottom: '2rem'
              }}>
                <p style={{
                  fontSize: '1.1rem',
                  color: '#374151',
                  lineHeight: '1.8',
                  margin: 0
                }}>
                  {selectedConcept.explanation}
                </p>
              </div>

              {selectedConcept.codeExample && (() => {
                const sections = parseCodeSections(selectedConcept.codeExample)
                return sections.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {sections.map((section, idx) => {
                      const sectionKey = `${selectedConcept.name}-${idx}`
                      const isExpanded = expandedSections[sectionKey]
                      
                      return (
                        <div key={idx} style={{
                          backgroundColor: '#1e293b',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          border: '2px solid #334155'
                        }}>
                          <button
                            onClick={() => toggleSection(sectionKey)}
                            style={{
                              width: '100%',
                              padding: '1rem 1.5rem',
                              backgroundColor: '#334155',
                              border: 'none',
                              color: '#60a5fa',
                              fontSize: '1rem',
                              fontWeight: '600',
                              cursor: 'pointer',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <span>💻 {section.title}</span>
                            <span style={{ fontSize: '1.2rem' }}>
                              {isExpanded ? '▼' : '▶'}
                            </span>
                          </button>
                          
                          {isExpanded && (
                            <div style={{ padding: '1.5rem' }}>
                              <SyntaxHighlighter code={section.code} />
                            </div>
                          )}
                        </div>
                      )
                    })}
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
          </>
        )}
      </div>

    </div>
  )
}

export default CoreJava
