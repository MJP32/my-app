import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import Breadcrumb from '../../components/Breadcrumb'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function Multithreading({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory, breadcrumb }) {
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [showSolution, setShowSolution] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [userCode, setUserCode] = useState('')
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [language, setLanguage] = useState(getPreferredLanguage())
  const [showDrawing, setShowDrawing] = useState(false)
  const [currentDrawing, setCurrentDrawing] = useState(null)
  const [expandedSections, setExpandedSections] = useState({
    Easy: true,
    Medium: true,
    Hard: true
  })

  useEffect(() => {
    const handleProgressUpdate = () => setRefreshKey(prev => prev + 1)
    window.addEventListener('progressUpdate', handleProgressUpdate)
    return () => window.removeEventListener('progressUpdate', handleProgressUpdate)
  }, [])

  useEffect(() => {
    const handleLanguageChange = (e) => {
      setLanguage(e.detail)
      if (selectedQuestion) {
        setUserCode(selectedQuestion.code[e.detail].starterCode)
      }
    }
    window.addEventListener('languageChange', handleLanguageChange)
    return () => window.removeEventListener('languageChange', handleLanguageChange)
  }, [selectedQuestion])

  const questions = [
    {
      id: 1,
      title: 'ExecutorService Thread Pool',
      difficulty: 'Easy',
      description: 'Create a fixed thread pool using ExecutorService to process multiple tasks concurrently. Submit 10 tasks to a pool with 3 threads and properly shutdown the executor.',
      examples: [
        { input: '10 tasks, 3 threads', output: 'All tasks execute concurrently with thread pool management' },
        { input: 'Proper shutdown', output: 'Executor shuts down gracefully after task completion' }
      ],
      code: {
        java: {
          starterCode: `import java.util.concurrent.*;

class Task implements Runnable {
    private int id;

    public Task(int id) {
        this.id = id;
    }

    public void run() {
        System.out.println("Task " + id + " started by " + Thread.currentThread().getName());
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        System.out.println("Task " + id + " completed");
    }
}

class Main {
    public static void main(String[] args) throws InterruptedException {
        // TODO: Create ExecutorService with 3 threads, submit 10 tasks, and shutdown properly

    }
}`,
          solution: `import java.util.concurrent.*;

class Task implements Runnable {
    private int id;

    public Task(int id) {
        this.id = id;
    }

    public void run() {
        System.out.println("Task " + id + " started by " + Thread.currentThread().getName());
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        System.out.println("Task " + id + " completed");
    }
}

class Main {
    public static void main(String[] args) throws InterruptedException {
        // Create fixed thread pool with 3 threads
        ExecutorService executor = Executors.newFixedThreadPool(3);

        // Submit 10 tasks
        for (int i = 0; i < 10; i++) {
            executor.submit(new Task(i));
        }

        // Shutdown executor
        executor.shutdown();

        // Wait for all tasks to complete
        if (!executor.awaitTermination(60, TimeUnit.SECONDS)) {
            executor.shutdownNow();
        }

        System.out.println("All tasks completed!");
    }
}`
        },
        python: {
          starterCode: `from concurrent.futures import ThreadPoolExecutor
import time
import threading

def task(task_id):
    """Execute a task with the given ID"""
    print(f"Task {task_id} started by {threading.current_thread().name}")
    time.sleep(0.5)
    print(f"Task {task_id} completed")

# TODO: Create thread pool with 3 workers, submit 10 tasks
`,
          solution: `from concurrent.futures import ThreadPoolExecutor
import time
import threading

def task(task_id):
    """Execute a task with the given ID"""
    print(f"Task {task_id} started by {threading.current_thread().name}")
    time.sleep(0.5)
    print(f"Task {task_id} completed")

# Create thread pool with 3 workers
with ThreadPoolExecutor(max_workers=3) as executor:
    # Submit 10 tasks
    futures = [executor.submit(task, i) for i in range(10)]

    # Wait for all tasks to complete
    for future in futures:
        future.result()

print("All tasks completed!")`
        }
      },
      explanation: 'ExecutorService manages thread pools efficiently. Use newFixedThreadPool() for fixed size, submit() to add tasks, shutdown() to stop accepting new tasks, and awaitTermination() to wait for completion.',
      timeComplexity: 'O(n) for n tasks',
      spaceComplexity: 'O(t) where t is thread pool size'
    },
    {
      id: 2,
      title: 'Callable and Future',
      difficulty: 'Easy',
      description: 'Use Callable and Future to calculate factorial of numbers in parallel. Submit 3 tasks that calculate factorial of 5, 10, and 15, then retrieve and print the results.',
      examples: [
        { input: 'Calculate 5!, 10!, 15!', output: '120, 3628800, 1307674368000' },
        { input: 'Parallel execution', output: 'All calculations run concurrently' }
      ],
      code: {
        java: {
          starterCode: `import java.util.concurrent.*;

class FactorialTask implements Callable<Long> {
    private int n;

    public FactorialTask(int n) {
        this.n = n;
    }

    public Long call() {
        System.out.println("Calculating factorial of " + n + " in " + Thread.currentThread().getName());
        long result = 1;
        for (int i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }
}

class Main {
    public static void main(String[] args) throws Exception {
        // TODO: Create executor, submit 3 factorial tasks (5, 10, 15), get results, and shutdown

    }
}`,
          solution: `import java.util.concurrent.*;

class FactorialTask implements Callable<Long> {
    private int n;

    public FactorialTask(int n) {
        this.n = n;
    }

    public Long call() {
        System.out.println("Calculating factorial of " + n + " in " + Thread.currentThread().getName());
        long result = 1;
        for (int i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }
}

class Main {
    public static void main(String[] args) throws Exception {
        // Create executor
        ExecutorService executor = Executors.newFixedThreadPool(3);

        // Submit tasks and get Futures
        Future<Long> future1 = executor.submit(new FactorialTask(5));
        Future<Long> future2 = executor.submit(new FactorialTask(10));
        Future<Long> future3 = executor.submit(new FactorialTask(15));

        // Retrieve results (blocks until available)
        System.out.println("5! = " + future1.get());
        System.out.println("10! = " + future2.get());
        System.out.println("15! = " + future3.get());

        executor.shutdown();
    }
}`
        },
        python: {
          starterCode: `from concurrent.futures import ThreadPoolExecutor
import threading

def factorial(n):
    """Calculate factorial of n"""
    print(f"Calculating factorial of {n} in {threading.current_thread().name}")
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result

# TODO: Create executor, submit tasks for 5, 10, 15, get results
`,
          solution: `from concurrent.futures import ThreadPoolExecutor
import threading

def factorial(n):
    """Calculate factorial of n"""
    print(f"Calculating factorial of {n} in {threading.current_thread().name}")
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result

# Create executor with 3 workers
with ThreadPoolExecutor(max_workers=3) as executor:
    # Submit tasks and get Futures
    future1 = executor.submit(factorial, 5)
    future2 = executor.submit(factorial, 10)
    future3 = executor.submit(factorial, 15)

    # Retrieve results (blocks until available)
    print(f"5! = {future1.result()}")
    print(f"10! = {future2.result()}")
    print(f"15! = {future3.result()}")`
        }
      },
      explanation: 'Callable returns a value (unlike Runnable). Future represents the result of asynchronous computation. Use future.get() to retrieve the result (blocks until available).',
      timeComplexity: 'O(n) for factorial calculation',
      spaceComplexity: 'O(1)'
    },
    {
      id: 3,
      title: 'CountDownLatch',
      difficulty: 'Medium',
      description: 'Use CountDownLatch to wait for 3 worker threads to complete initialization before starting main work. Each worker simulates initialization with a random delay.',
      examples: [
        { input: '3 workers initializing', output: 'Main thread waits for all workers' },
        { input: 'All workers ready', output: 'Main work begins after latch reaches 0' }
      ],
      code: {
        java: {
          starterCode: `import java.util.concurrent.*;

class Worker implements Runnable {
    private CountDownLatch latch;
    private String name;

    public Worker(CountDownLatch latch, String name) {
        this.latch = latch;
        this.name = name;
    }

    public void run() {
        try {
            System.out.println(name + " initializing...");
            Thread.sleep((long)(Math.random() * 2000));
            System.out.println(name + " ready!");
            latch.countDown();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}

class Main {
    public static void main(String[] args) throws InterruptedException {
        // TODO: Create latch with count 3, start 3 workers, wait for all to complete

    }
}`,
          solution: `import java.util.concurrent.*;

class Worker implements Runnable {
    private CountDownLatch latch;
    private String name;

    public Worker(CountDownLatch latch, String name) {
        this.latch = latch;
        this.name = name;
    }

    public void run() {
        try {
            System.out.println(name + " initializing...");
            Thread.sleep((long)(Math.random() * 2000));
            System.out.println(name + " ready!");
            latch.countDown();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}

class Main {
    public static void main(String[] args) throws InterruptedException {
        int numWorkers = 3;
        CountDownLatch latch = new CountDownLatch(numWorkers);

        // Start workers
        for (int i = 0; i < numWorkers; i++) {
            new Thread(new Worker(latch, "Worker-" + i)).start();
        }

        System.out.println("Main thread waiting for workers...");
        latch.await();  // Block until count reaches 0

        System.out.println("All workers ready! Starting main work...");
    }
}`
        },
        python: {
          starterCode: `import threading
import time
import random

def worker(latch, name):
    """Worker that initializes then counts down the latch"""
    print(f"{name} initializing...")
    time.sleep(random.uniform(0, 2))
    print(f"{name} ready!")
    # TODO: Count down the latch

# TODO: Create latch, start workers, wait for completion
`,
          solution: `import threading
import time
import random

class CountDownLatch:
    def __init__(self, count):
        self.count = count
        self.lock = threading.Lock()
        self.event = threading.Event()

    def count_down(self):
        with self.lock:
            self.count -= 1
            if self.count <= 0:
                self.event.set()

    def await(self):
        self.event.wait()

def worker(latch, name):
    """Worker that initializes then counts down the latch"""
    print(f"{name} initializing...")
    time.sleep(random.uniform(0, 2))
    print(f"{name} ready!")
    latch.count_down()

# Create latch with count 3
num_workers = 3
latch = CountDownLatch(num_workers)

# Start workers
threads = []
for i in range(num_workers):
    thread = threading.Thread(target=worker, args=(latch, f"Worker-{i}"))
    threads.append(thread)
    thread.start()

print("Main thread waiting for workers...")
latch.await()

print("All workers ready! Starting main work...")`
        }
      },
      explanation: 'CountDownLatch allows threads to wait until a set of operations completes. Initialize with count, each thread calls countDown(), main thread calls await() to block until count reaches zero.',
      timeComplexity: 'O(1) for countDown and await',
      spaceComplexity: 'O(1)'
    },
    {
      id: 4,
      title: 'ThreadLocal',
      difficulty: 'Medium',
      description: 'Use ThreadLocal to store thread-specific user context. Each thread should set its own context and verify it sees only its own data, demonstrating thread isolation.',
      examples: [
        { input: 'Thread-1 sets context', output: 'Thread-1 sees only its own context' },
        { input: 'Thread-2 sets context', output: 'Thread-2 sees different context' }
      ],
      code: {
        java: {
          starterCode: `import java.util.*;

class UserContext {
    private String userId;
    private String sessionId;

    // TODO: Create ThreadLocal, implement setContext/getContext/clear methods

    public UserContext(String userId, String sessionId) {
        this.userId = userId;
        this.sessionId = sessionId;
    }

    @Override
    public String toString() {
        return "UserContext{userId='" + userId + "', sessionId='" + sessionId + "'}";
    }
}

class Main {
    public static void main(String[] args) throws InterruptedException {
        Runnable task = () -> {
            String threadName = Thread.currentThread().getName();
            UserContext context = new UserContext("user-" + threadName, "session-" + threadName);

            UserContext.setContext(context);

            System.out.println(threadName + " sees: " + UserContext.getContext());

            UserContext.clear();
        };

        Thread t1 = new Thread(task, "Thread-1");
        Thread t2 = new Thread(task, "Thread-2");
        Thread t3 = new Thread(task, "Thread-3");

        t1.start();
        t2.start();
        t3.start();

        t1.join();
        t2.join();
        t3.join();
    }
}`,
          solution: `import java.util.*;

class UserContext {
    private String userId;
    private String sessionId;

    // ThreadLocal variable
    private static final ThreadLocal<UserContext> contextHolder = new ThreadLocal<>();

    public UserContext(String userId, String sessionId) {
        this.userId = userId;
        this.sessionId = sessionId;
    }

    public static void setContext(UserContext context) {
        contextHolder.set(context);
    }

    public static UserContext getContext() {
        return contextHolder.get();
    }

    public static void clear() {
        contextHolder.remove();  // Prevent memory leaks!
    }

    @Override
    public String toString() {
        return "UserContext{userId='" + userId + "', sessionId='" + sessionId + "'}";
    }
}

class Main {
    public static void main(String[] args) throws InterruptedException {
        Runnable task = () -> {
            String threadName = Thread.currentThread().getName();
            UserContext context = new UserContext("user-" + threadName, "session-" + threadName);

            UserContext.setContext(context);

            System.out.println(threadName + " sees: " + UserContext.getContext());

            UserContext.clear();
        };

        Thread t1 = new Thread(task, "Thread-1");
        Thread t2 = new Thread(task, "Thread-2");
        Thread t3 = new Thread(task, "Thread-3");

        t1.start();
        t2.start();
        t3.start();

        t1.join();
        t2.join();
        t3.join();
    }
}`
        },
        python: {
          starterCode: `import threading

# TODO: Create thread-local storage
local = threading.local()

class UserContext:
    def __init__(self, user_id, session_id):
        self.user_id = user_id
        self.session_id = session_id

    def __str__(self):
        return f"UserContext(user_id='{self.user_id}', session_id='{self.session_id}')"

# TODO: Implement set_context, get_context functions

def worker():
    """Each worker thread stores its own context"""
    thread_name = threading.current_thread().name
    context = UserContext(f"user-{thread_name}", f"session-{thread_name}")

    # TODO: Set and retrieve context

# TODO: Create and start threads
`,
          solution: `import threading

# Thread-local storage
local = threading.local()

class UserContext:
    def __init__(self, user_id, session_id):
        self.user_id = user_id
        self.session_id = session_id

    def __str__(self):
        return f"UserContext(user_id='{self.user_id}', session_id='{self.session_id}')"

def set_context(context):
    local.context = context

def get_context():
    return getattr(local, 'context', None)

def clear_context():
    if hasattr(local, 'context'):
        del local.context

def worker():
    """Each worker thread stores its own context"""
    thread_name = threading.current_thread().name
    context = UserContext(f"user-{thread_name}", f"session-{thread_name}")

    set_context(context)
    print(f"{thread_name} sees: {get_context()}")
    clear_context()

# Create and start threads
threads = []
for i in range(3):
    thread = threading.Thread(target=worker, name=f"Thread-{i+1}")
    threads.append(thread)
    thread.start()

for thread in threads:
    thread.join()`
        }
      },
      explanation: 'ThreadLocal provides thread-specific variables. Each thread has its own isolated copy. Useful for storing per-thread context like user sessions. Always call remove() to prevent memory leaks.',
      timeComplexity: 'O(1) for get/set',
      spaceComplexity: 'O(t) where t is number of threads'
    }
  ]

  // Calculate completion status
  const getCompletionStats = () => {
    const completed = questions.filter(q => isProblemCompleted(`Multithreading-${q.id}`)).length
    return { completed, total: questions.length, percentage: Math.round((completed / questions.length) * 100) }
  }

  const stats = getCompletionStats()

  // Group questions by difficulty
  const groupedQuestions = {
    Easy: questions.filter(q => q.difficulty === 'Easy'),
    Medium: questions.filter(q => q.difficulty === 'Medium'),
    Hard: questions.filter(q => q.difficulty === 'Hard')
  }

  const selectQuestion = (question) => {
    setSelectedQuestion(question)
    setShowSolution(false)
    setShowExplanation(false)
    setUserCode(question.code[language].starterCode)
    setOutput('')
    setShowDrawing(false)
  }

  const toggleSection = (difficulty) => {
    setExpandedSections(prev => ({ ...prev, [difficulty]: !prev[difficulty] }))
  }

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return '#10b981'
      case 'Medium': return '#f59e0b'
      case 'Hard': return '#ef4444'
      default: return '#6b7280'
    }
  }

  if (selectedQuestion) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', color: 'white', padding: '1.5rem' }}>
        <div style={{ maxWidth: '1800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={() => setSelectedQuestion(null)} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d97706'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f59e0b'}>
            ← Back to Java
          </button>
          <LanguageToggle />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Problem Description */}
          <div style={{ background: 'linear-gradient(to bottom right, #1f2937, #111827)', padding: '2rem', borderRadius: '12px', border: '2px solid #374151', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.75rem', background: 'linear-gradient(to right, #fbbf24, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>{selectedQuestion.title}</h2>
              <span style={{ padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '600', backgroundColor: getDifficultyColor(selectedQuestion.difficulty) + '20', color: getDifficultyColor(selectedQuestion.difficulty) }}>
                {selectedQuestion.difficulty}
              </span>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <CompletionCheckbox problemId={`Multithreading-${selectedQuestion.id}`} />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#fbbf24', marginBottom: '0.75rem' }}>Description</h3>
              <p style={{ fontSize: '1rem', color: '#d1d5db', lineHeight: '1.6' }}>{selectedQuestion.description}</p>
            </div>

            {selectedQuestion.examples && selectedQuestion.examples.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#fbbf24', marginBottom: '0.75rem' }}>Examples</h3>
                {selectedQuestion.examples.map((example, idx) => (
                  <div key={idx} style={{ background: 'linear-gradient(to bottom right, #1f2937, #111827)', padding: '1rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid #374151', color: '#d1d5db' }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong style={{ color: '#fbbf24' }}>Input:</strong> <code style={{ color: '#d1d5db' }}>{example.input}</code>
                    </div>
                    <div>
                      <strong style={{ color: '#fbbf24' }}>Output:</strong> <code style={{ color: '#d1d5db' }}>{example.output}</code>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedQuestion.explanation && (
              <div style={{ marginTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#fbbf24', marginBottom: '0.75rem' }}>Explanation</h3>
                <p style={{ fontSize: '0.95rem', color: '#d1d5db', lineHeight: '1.6' }}>{selectedQuestion.explanation}</p>
              </div>
            )}

            {(selectedQuestion.timeComplexity || selectedQuestion.spaceComplexity) && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'linear-gradient(to bottom right, #1f2937, #111827)', borderRadius: '8px', border: '1px solid #374151' }}>
                <h3 style={{ fontSize: '1rem', color: '#fbbf24', marginBottom: '0.5rem' }}>Complexity</h3>
                {selectedQuestion.timeComplexity && <div style={{ fontSize: '0.9rem', color: '#d1d5db' }}>Time: {selectedQuestion.timeComplexity}</div>}
                {selectedQuestion.spaceComplexity && <div style={{ fontSize: '0.9rem', color: '#d1d5db' }}>Space: {selectedQuestion.spaceComplexity}</div>}
              </div>
            )}
          </div>

          {/* Code Editor */}
          <div style={{ background: 'linear-gradient(to bottom right, #1f2937, #111827)', padding: '2rem', borderRadius: '12px', border: '2px solid #374151', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <button onClick={() => { setShowSolution(!showSolution); if (!showSolution) setUserCode(selectedQuestion.code[language].solution) }} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                {showSolution ? 'Hide' : 'Show'} Solution
              </button>
              <button onClick={() => setUserCode(selectedQuestion.code[language].starterCode)} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Reset Code
              </button>
            </div>

            <textarea value={userCode} onChange={(e) => setUserCode(e.target.value)} style={{ flex: 1, width: '100%', padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem', border: '2px solid #374151', borderRadius: '8px', resize: 'none', lineHeight: '1.5', backgroundColor: '#111827', color: '#d1d5db' }} spellCheck={false} />

            {output && (
              <div style={{ marginTop: '1rem' }}>
                <h3 style={{ fontSize: '1rem', color: '#9ca3af', marginBottom: '0.5rem' }}>Output</h3>
                <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #374151', overflow: 'auto', fontSize: '0.875rem', maxHeight: '150px', color: '#d1d5db' }}>{output}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', minHeight: '100vh' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          ← Back
        </button>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'white', marginBottom: '0.5rem' }}>Multithreading</h1>
        <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>Master thread pools, executors, futures, and thread coordination</p>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
          <div style={{ padding: '1rem 2rem', backgroundColor: '#1f2937', borderRadius: '12px', border: '2px solid #374151' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#3b82f6' }}>{stats.completed}/{stats.total}</div>
            <div style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '0.25rem' }}>Completed</div>
          </div>
          <div style={{ padding: '1rem 2rem', backgroundColor: '#1f2937', borderRadius: '12px', border: '2px solid #374151' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10b981' }}>{stats.percentage}%</div>
            <div style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '0.25rem' }}>Progress</div>
          </div>
        </div>
      </div>

      {Object.entries(groupedQuestions).map(([difficulty, difficultyQuestions]) => (
        difficultyQuestions.length > 0 && (
          <div key={difficulty} style={{ marginBottom: '2rem' }}>
            <button onClick={() => toggleSection(difficulty)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', backgroundColor: '#1f2937', border: '2px solid #374151', borderRadius: '12px', cursor: 'pointer', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: '700', color: getDifficultyColor(difficulty) }}>{difficulty}</span>
                <span style={{ fontSize: '0.875rem', color: '#9ca3af' }}>({difficultyQuestions.length} problems)</span>
              </div>
              <span style={{ fontSize: '1.25rem', color: '#9ca3af' }}>{expandedSections[difficulty] ? '▼' : '▶'}</span>
            </button>

            {expandedSections[difficulty] && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1rem' }}>
                {difficultyQuestions.map((question) => (
                  <div key={question.id} onClick={() => selectQuestion(question)} style={{ backgroundColor: '#1f2937', padding: '1.5rem', borderRadius: '12px', border: '2px solid #374151', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)' }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'white', margin: 0, flex: 1 }}>{question.id}. {question.title}</h3>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: '#9ca3af', lineHeight: '1.5', marginBottom: '1rem' }}>{question.description.substring(0, 100)}...</p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600', backgroundColor: getDifficultyColor(question.difficulty) + '20', color: getDifficultyColor(question.difficulty) }}>{question.difficulty}</span>
                      <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ transform: 'scale(0.85)' }}>
                          <CompletionCheckbox problemId={`Multithreading-${question.id}`} />
                        </div>
                        {question.leetcodeUrl && (
                          <a
                            href={question.leetcodeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ padding: '0.25rem 0.75rem', backgroundColor: '#FFA116', color: 'white', borderRadius: '6px', textDecoration: 'none', fontSize: '0.75rem', fontWeight: '600', display: 'inline-block' }}
                          >
                            LeetCode ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      ))}
    </div>
  )
}

export default Multithreading
