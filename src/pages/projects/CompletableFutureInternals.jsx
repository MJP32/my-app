import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, Code, ArrowLeft, Layers, Zap, GitBranch, Settings, AlertTriangle, Clock, Link, Workflow, CheckCircle, XCircle, Activity } from 'lucide-react';
import { KEYS } from '../../utils/keyboardNavigation.js';
import Breadcrumb from '../../components/Breadcrumb';
import { useTheme } from '../../contexts/ThemeContext';

const highlightCode = (code) => {
  code = code
    .replace(/<\s*(?:span|font)[^>]*>/gi, '')
    .replace(/<\s*\/\s*(?:span|font)\s*>/gi, '')
    .replace(/\s*(?:style|color|bgcolor)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '');

  let highlighted = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const placeholders = [];
  const store = (html) => {
    placeholders.push(html);
    return `___P${placeholders.length - 1}___`;
  };

  highlighted = highlighted.replace(/\/\*[\s\S]*?\*\//g, (m) => store(`<span class="token comment">${m}</span>`));
  highlighted = highlighted.replace(/\/\/.*$/gm, (m) => store(`<span class="token comment">${m}</span>`));
  highlighted = highlighted.replace(/"(?:\\.|[^"\\])*"/g, (m) => store(`<span class="token string">${m}</span>`));
  highlighted = highlighted.replace(/'(?:\\.|[^'\\])+'/g, (m) => store(`<span class="token char">${m}</span>`));
  highlighted = highlighted.replace(/@\w+/g, (m) => store(`<span class="token annotation">${m}</span>`));
  highlighted = highlighted.replace(/\b\d+(?:\.\d+)?\b/g, (m) => store(`<span class="token number">${m}</span>`));
  highlighted = highlighted.replace(/\b(true|false|null)\b/g, (m) => store(`<span class="token boolean">${m}</span>`));

  const keywords = 'abstract assert boolean break byte case catch char class const continue default do double else enum export extends final finally float for goto if implements import instanceof int interface long native new package private protected public return short static strictfp super switch synchronized this throw throws transient try var void volatile while';
  const kwRegex = new RegExp('\\b(' + keywords.trim().split(/\\s+/).join('|') + ')\\b', 'g');
  highlighted = highlighted.replace(kwRegex, (m) => store(`<span class="token keyword">${m}</span>`));
  highlighted = highlighted.replace(/\b([A-Z][A-Za-z0-9_]*)\b/g, (m) => store(`<span class="token class-name">${m}</span>`));
  highlighted = highlighted.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g, (m) => store(`<span class="token function">${m}</span>`));
  highlighted = highlighted.replace(/([{}()[\];,.<>+\-*/=%!:|&^~?]+)/g, (m) => `<span class="token punctuation">${m}</span>`);
  highlighted = highlighted.replace(/___P(\d+)___/g, (_, n) => placeholders[Number(n)]);

  return highlighted;
};

const CompletableFutureInternals = ({ onBack, breadcrumb }) => {
  const { colors } = useTheme();
  const [expandedSections, setExpandedSections] = useState({ 0: true });
  const backButtonRef = useRef(null);

  const toggleSection = (index) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === KEYS.B && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const tag = e.target.tagName.toLowerCase();
        if (tag !== 'input' && tag !== 'textarea' && !e.target.isContentEditable) {
          e.preventDefault();
          onBack();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  const sections = [
    {
      title: 'Why CompletableFuture?',
      icon: <Zap className="w-5 h-5" />,
      content: `CompletableFuture (Java 8+) enables non-blocking asynchronous programming with a fluent API for composing, combining, and handling async operations.

Problems with traditional Future:
• Blocking get() - thread waits for result
• No way to chain operations
• No built-in exception handling
• Cannot combine multiple futures
• No callbacks for completion

CompletableFuture benefits:
• Non-blocking composition with thenApply, thenCompose
• Declarative exception handling with exceptionally, handle
• Combine futures with allOf, anyOf, thenCombine
• Async execution with configurable executors
• Completion callbacks without blocking

CompletableFuture implements:
• Future<T> - get(), isDone(), cancel()
• CompletionStage<T> - composition methods`,
      code: `// Traditional Future - BLOCKING
Future<String> future = executor.submit(() -> fetchData());
String result = future.get();  // BLOCKS until complete!
process(result);

// CompletableFuture - NON-BLOCKING
CompletableFuture.supplyAsync(() -> fetchData())
    .thenApply(data -> transform(data))      // Chain transformation
    .thenAccept(result -> process(result))   // Consume result
    .exceptionally(ex -> handleError(ex));   // Handle errors

// Combining multiple async operations
CompletableFuture<String> user = fetchUserAsync();
CompletableFuture<List<Order>> orders = fetchOrdersAsync();

user.thenCombine(orders, (u, o) -> createReport(u, o))
    .thenAccept(report -> sendEmail(report));

// Wait for all to complete
CompletableFuture.allOf(future1, future2, future3)
    .thenRun(() -> System.out.println("All done!"));`
    },
    {
      title: 'Internal Structure',
      icon: <Layers className="w-5 h-5" />,
      content: `CompletableFuture uses a lock-free design with CAS operations and a stack of dependent completions.

Key internal fields:
• result (Object): Stores the result or AltResult for exceptions
• stack (Completion): Linked list of dependent actions

State representation:
• result == null: Not yet completed
• result == value: Completed normally
• result == AltResult(null): Completed with null
• result == AltResult(exception): Completed exceptionally

AltResult wrapper:
• Wraps null values (since null means incomplete)
• Wraps exceptions as CompletionException

Completion stack:
• Each dependent action is a Completion node
• Nodes are pushed onto a stack (LIFO)
• On completion, all nodes are popped and triggered`,
      code: `// Simplified internal structure
public class CompletableFuture<T> {
    // Result field - volatile for visibility
    volatile Object result;  // null = incomplete

    // Stack of dependent completions
    volatile Completion stack;

    // Special wrapper for null/exception results
    static final class AltResult {
        final Throwable ex;  // null if result is null
        AltResult(Throwable x) { this.ex = x; }
    }

    // Completion node - linked list
    abstract static class Completion extends ForkJoinTask<Void> {
        volatile Completion next;  // Stack link

        abstract CompletableFuture<?> tryFire(int mode);
    }

    // Check if completed
    public boolean isDone() {
        return result != null;
    }

    // Complete with value
    public boolean complete(T value) {
        return completeValue(value);  // CAS on result
    }

    // Complete exceptionally
    public boolean completeExceptionally(Throwable ex) {
        return completeThrowable(ex);  // Wrap in AltResult
    }
}`
    },
    {
      title: 'Completion Pipeline',
      icon: <GitBranch className="w-5 h-5" />,
      content: `CompletableFuture builds a pipeline of stages, each represented by a Completion subclass.

Main completion types:
• UniApply - thenApply (transform result)
• UniAccept - thenAccept (consume result)
• UniRun - thenRun (run action)
• UniCompose - thenCompose (flatMap)
• UniHandle - handle (result + exception)
• UniWhenComplete - whenComplete (side effect)
• UniExceptionally - exceptionally (recover)

Bi-completions (two sources):
• BiApply - thenCombine
• BiAccept - thenAcceptBoth
• BiRun - runAfterBoth

Either completions (first to complete):
• OrApply - applyToEither
• OrAccept - acceptEither
• OrRun - runAfterEither

Execution modes:
• SYNC (0): Execute in completing thread
• ASYNC (1): Execute in async thread
• NESTED (-1): Internal nested call`,
      code: `// How thenApply works internally
public <U> CompletableFuture<U> thenApply(Function<T, U> fn) {
    return uniApplyStage(null, fn);  // null = sync executor
}

public <U> CompletableFuture<U> thenApplyAsync(Function<T, U> fn) {
    return uniApplyStage(defaultExecutor(), fn);
}

// UniApply completion node
static final class UniApply<T,V> extends UniCompletion<T,V> {
    Function<? super T, ? extends V> fn;

    UniApply(Executor e, CompletableFuture<V> dep,
             CompletableFuture<T> src, Function<T,V> fn) {
        super(e, dep, src);
        this.fn = fn;
    }

    final CompletableFuture<V> tryFire(int mode) {
        CompletableFuture<V> d; CompletableFuture<T> a;
        Object r; Throwable x; Function<? super T, ? extends V> f;

        if ((a = src) == null || (r = a.result) == null
            || (d = dep) == null || (f = fn) == null)
            return null;  // Not ready

        if (r instanceof AltResult) {
            x = ((AltResult)r).ex;
            if (x != null) {
                d.completeThrowable(x);  // Propagate exception
                return d;
            }
            r = null;  // Unwrap null result
        }

        try {
            if (mode <= 0 && !claim())  // Check execution mode
                return null;
            d.completeValue(f.apply((T) r));  // Apply function
        } catch (Throwable ex) {
            d.completeThrowable(ex);
        }
        return d;
    }
}`
    },
    {
      title: 'Async Execution',
      icon: <Workflow className="w-5 h-5" />,
      content: `CompletableFuture uses ForkJoinPool.commonPool() by default for async operations.

Async method variants:
• supplyAsync/runAsync - Start async computation
• thenApplyAsync - Transform asynchronously
• thenAcceptAsync - Consume asynchronously
• thenRunAsync - Run action asynchronously

Default executor selection:
1. If parallelism > 1: ForkJoinPool.commonPool()
2. If parallelism == 1: ThreadPerTaskExecutor
3. Custom executor via overloaded methods

Execution behavior:
• Non-async methods: Run in completing thread
• Async methods: Run in executor thread
• May inline if already in correct thread

When to use async variants:
• Long-running transformations
• Blocking operations
• Need specific thread pool`,
      code: `// Default executor
private static final Executor ASYNC_POOL = useCommonPool ?
    ForkJoinPool.commonPool() : new ThreadPerTaskExecutor();

// Using default executor
CompletableFuture.supplyAsync(() -> {
    // Runs in ForkJoinPool.commonPool()
    return expensiveOperation();
});

// Using custom executor
ExecutorService myPool = Executors.newFixedThreadPool(10);

CompletableFuture.supplyAsync(() -> {
    // Runs in myPool
    return expensiveOperation();
}, myPool);

// Async vs Sync execution
CompletableFuture<String> cf = CompletableFuture.supplyAsync(() -> "hello");

// Sync - runs in thread that completes cf
cf.thenApply(s -> s.toUpperCase());

// Async - runs in common pool
cf.thenApplyAsync(s -> s.toUpperCase());

// Async with custom executor
cf.thenApplyAsync(s -> s.toUpperCase(), myPool);

// Example: Avoiding blocking common pool
CompletableFuture.supplyAsync(() -> {
    return blockingIOOperation();  // BAD: blocks common pool
}, ioExecutor);  // GOOD: use dedicated IO pool`
    },
    {
      title: 'Exception Handling',
      icon: <AlertTriangle className="w-5 h-5" />,
      content: `CompletableFuture wraps exceptions in CompletionException and provides multiple handling strategies.

Exception propagation:
• Exceptions propagate through the pipeline
• Wrapped in CompletionException if not already
• All downstream stages skip until handled

Handling methods:
• exceptionally(fn): Recover from exception
• handle(fn): Handle both result and exception
• whenComplete(action): Side effect, doesn't transform

Key differences:
• exceptionally: Only called on exception, returns recovery value
• handle: Always called, receives result OR exception
• whenComplete: Always called, cannot change result

Exception unwrapping:
• get() throws ExecutionException
• join() throws CompletionException
• getNow() throws CompletionException`,
      code: `// exceptionally - Recover from exception
CompletableFuture.supplyAsync(() -> {
    if (error) throw new RuntimeException("Failed");
    return "success";
})
.exceptionally(ex -> {
    log.error("Error: " + ex.getMessage());
    return "default";  // Recovery value
});

// handle - Process both success and failure
CompletableFuture.supplyAsync(() -> fetchData())
.handle((result, ex) -> {
    if (ex != null) {
        log.error("Failed", ex);
        return "default";
    }
    return result.toUpperCase();
});

// whenComplete - Side effect without changing result
CompletableFuture.supplyAsync(() -> fetchData())
.whenComplete((result, ex) -> {
    if (ex != null) {
        metrics.recordFailure();
    } else {
        metrics.recordSuccess();
    }
});  // Result/exception passes through unchanged

// Exception propagation
CompletableFuture.supplyAsync(() -> {
    throw new RuntimeException("Step 1 failed");
})
.thenApply(s -> s + " - step 2")   // SKIPPED
.thenApply(s -> s + " - step 3")   // SKIPPED
.exceptionally(ex -> "recovered")   // CALLED
.thenApply(s -> s + " - step 4");   // CALLED with "recovered"

// Chaining exception handlers
cf.exceptionally(ex -> {
    if (ex instanceof IOException) {
        return retryOperation();
    }
    throw new CompletionException(ex);  // Re-throw
});`
    },
    {
      title: 'Combining Futures',
      icon: <Link className="w-5 h-5" />,
      content: `CompletableFuture provides powerful methods to combine multiple async operations.

Combine two futures:
• thenCombine: Combine results with BiFunction
• thenAcceptBoth: Consume both results
• runAfterBoth: Run after both complete

Either (first to complete):
• applyToEither: Apply to first result
• acceptEither: Consume first result
• runAfterEither: Run after first completes

Combine many futures:
• allOf: Complete when ALL complete (returns Void)
• anyOf: Complete when ANY completes (returns Object)

Key considerations:
• allOf doesn't return combined results (use join)
• anyOf returns Object (needs casting)
• Either methods may use result from either future`,
      code: `// thenCombine - Combine two results
CompletableFuture<String> user = fetchUserAsync();
CompletableFuture<List<Order>> orders = fetchOrdersAsync();

CompletableFuture<Report> report = user.thenCombine(orders,
    (u, o) -> new Report(u, o));

// thenCompose - FlatMap (chain dependent futures)
CompletableFuture<String> result = getUserIdAsync()
    .thenCompose(id -> fetchUserAsync(id))      // Returns CF<User>
    .thenCompose(user -> fetchOrdersAsync(user.getId()));

// allOf - Wait for all (returns CompletableFuture<Void>)
CompletableFuture<String> cf1 = fetchAsync("url1");
CompletableFuture<String> cf2 = fetchAsync("url2");
CompletableFuture<String> cf3 = fetchAsync("url3");

CompletableFuture.allOf(cf1, cf2, cf3)
    .thenApply(v -> {
        // All completed - get results
        return Stream.of(cf1, cf2, cf3)
            .map(CompletableFuture::join)
            .collect(Collectors.toList());
    });

// anyOf - First to complete
CompletableFuture<Object> fastest = CompletableFuture.anyOf(
    fetchFromServer1(),
    fetchFromServer2(),
    fetchFromServer3()
);
fastest.thenAccept(result -> process((String) result));

// Collecting results from multiple futures
List<CompletableFuture<String>> futures = urls.stream()
    .map(url -> fetchAsync(url))
    .collect(Collectors.toList());

CompletableFuture<List<String>> allResults = CompletableFuture
    .allOf(futures.toArray(new CompletableFuture[0]))
    .thenApply(v -> futures.stream()
        .map(CompletableFuture::join)
        .collect(Collectors.toList()));`
    },
    {
      title: 'How Completion Works',
      icon: <Activity className="w-5 h-5" />,
      content: `When a CompletableFuture completes, it triggers all dependent completions using a stack-based approach.

Completion process:
1. Set result using CAS (atomic)
2. Pop completion stack
3. Fire each completion (tryFire)
4. Each completion may trigger more completions

Stack management:
• New completions pushed to stack
• On completion, stack is atomically cleared
• Completions are fired in LIFO order

CAS operations ensure:
• Only one thread sets the result
• No completion is lost
• Thread-safe without locks

tryFire modes:
• SYNC (0): Direct execution
• ASYNC (1): Submit to executor
• NESTED (-1): Avoid stack overflow`,
      code: `// Completion triggering (simplified)
final void postComplete() {
    CompletableFuture<?> f = this;
    Completion h;

    // Process completions
    while ((h = f.stack) != null ||
           (f != this && (h = (f = this).stack) != null)) {
        CompletableFuture<?> d;
        Completion t;

        // CAS pop from stack
        if (STACK.compareAndSet(f, h, t = h.next)) {
            if (t != null) {
                if (f != this) {
                    // Push back for later
                    pushStack(h);
                    continue;
                }
                NEXT.compareAndSet(h, t, null);  // Detach
            }

            // Fire the completion
            f = (d = h.tryFire(NESTED)) == null ? this : d;
        }
    }
}

// CAS-based result setting
final boolean completeValue(T t) {
    return RESULT.compareAndSet(this, null,
        (t == null) ? NIL : t);
}

// Adding dependent completion
final void push(Completion c) {
    Completion h;
    do {
        h = stack;
        NEXT.set(c, h);  // Link to current head
    } while (!STACK.compareAndSet(this, h, c));  // CAS push
}

// When thenApply is called
public <U> CompletableFuture<U> thenApply(Function<T,U> fn) {
    CompletableFuture<U> d = new CompletableFuture<>();

    if (result == null) {
        // Not complete yet - push to stack
        push(new UniApply<>(null, d, this, fn));
    } else {
        // Already complete - execute immediately
        d.uniApply(this, fn, null);
    }

    return d;
}`
    },
    {
      title: 'Timeouts and Cancellation',
      icon: <Clock className="w-5 h-5" />,
      content: `Java 9+ added timeout methods. Cancellation completes exceptionally with CancellationException.

Timeout methods (Java 9+):
• orTimeout: Complete exceptionally after timeout
• completeOnTimeout: Complete with default value after timeout

Cancellation:
• cancel(mayInterrupt): Complete with CancellationException
• Doesn't actually interrupt the running task
• Just sets the result to cancelled

Timeout patterns for Java 8:
• Use separate scheduled executor
• Cancel original if timeout occurs
• Race between completion and timeout`,
      code: `// Java 9+ timeout methods
CompletableFuture<String> cf = fetchDataAsync();

// Fail with TimeoutException after 5 seconds
cf.orTimeout(5, TimeUnit.SECONDS)
  .exceptionally(ex -> {
      if (ex instanceof TimeoutException) {
          return "timeout default";
      }
      throw new CompletionException(ex);
  });

// Complete with default value after timeout
cf.completeOnTimeout("default", 5, TimeUnit.SECONDS);

// Cancellation
CompletableFuture<String> cf = CompletableFuture.supplyAsync(() -> {
    return longRunningTask();  // Still runs!
});

cf.cancel(true);  // mayInterruptIfRunning ignored
cf.isCompletedExceptionally();  // true
cf.isCancelled();  // true

// Java 8 timeout pattern
public static <T> CompletableFuture<T> withTimeout(
        CompletableFuture<T> future,
        long timeout, TimeUnit unit) {

    CompletableFuture<T> timeoutFuture = new CompletableFuture<>();

    ScheduledExecutorService scheduler =
        Executors.newSingleThreadScheduledExecutor();

    scheduler.schedule(() -> {
        timeoutFuture.completeExceptionally(
            new TimeoutException("Timeout after " + timeout));
    }, timeout, unit);

    return future.applyToEither(timeoutFuture, Function.identity());
}

// Usage
CompletableFuture<String> result = withTimeout(
    fetchDataAsync(),
    5, TimeUnit.SECONDS
);`
    },
    {
      title: 'Best Practices',
      icon: <CheckCircle className="w-5 h-5" />,
      content: `Follow these patterns for effective CompletableFuture usage.

Do's:
• Use custom executor for blocking operations
• Handle exceptions with exceptionally/handle
• Use thenCompose for dependent async ops
• Prefer join() over get() in non-interruptible contexts
• Cancel futures you no longer need

Don'ts:
• Don't block in common pool (default executor)
• Don't ignore exceptions
• Don't use thenApply for async operations (use thenCompose)
• Don't create too many nested callbacks
• Don't mix blocking and async code

Thread safety:
• CompletableFuture is thread-safe
• Result can only be set once
• Multiple threads can add completions`,
      code: `// DON'T: Block common pool with IO
CompletableFuture.supplyAsync(() -> {
    return blockingDatabaseCall();  // BAD!
});

// DO: Use dedicated IO executor
ExecutorService ioPool = Executors.newCachedThreadPool();
CompletableFuture.supplyAsync(() -> {
    return blockingDatabaseCall();
}, ioPool);

// DON'T: Nested thenApply for async ops
cf.thenApply(id -> fetchUser(id).join())  // BAD - blocks!

// DO: Use thenCompose
cf.thenCompose(id -> fetchUser(id))  // GOOD - async

// DON'T: Ignore exceptions
CompletableFuture.supplyAsync(() -> riskyOp());  // Lost exception!

// DO: Always handle exceptions
CompletableFuture.supplyAsync(() -> riskyOp())
    .exceptionally(ex -> {
        log.error("Failed", ex);
        return fallback;
    });

// DON'T: Pyramid of doom
cf1.thenCompose(r1 ->
    cf2.thenCompose(r2 ->
        cf3.thenCompose(r3 ->
            cf4.thenApply(r4 -> combine(r1, r2, r3, r4)))));

// DO: Use allOf or separate variables
CompletableFuture.allOf(cf1, cf2, cf3, cf4)
    .thenApply(v -> combine(
        cf1.join(), cf2.join(), cf3.join(), cf4.join()));

// Manual completion for testing
CompletableFuture<String> cf = new CompletableFuture<>();
cf.complete("test value");           // Normal completion
cf.completeExceptionally(new Ex());  // Exceptional completion
cf.obtrudeValue("force");            // Overwrite result (testing)`
    },
    {
      title: 'Interview Questions',
      icon: <Code className="w-5 h-5" />,
      content: `Common interview questions about CompletableFuture:

Q1: Future vs CompletableFuture?
• Future: Blocking get(), no chaining, no composition
• CompletableFuture: Non-blocking, fluent API, combinable

Q2: thenApply vs thenCompose?
• thenApply: Transform result (map) - Function<T,U>
• thenCompose: Chain futures (flatMap) - Function<T,CF<U>>

Q3: exceptionally vs handle?
• exceptionally: Only on exception, returns recovery
• handle: Always called, receives result OR exception

Q4: What executor does supplyAsync use?
• ForkJoinPool.commonPool() by default
• ThreadPerTaskExecutor if parallelism == 1

Q5: Is CompletableFuture thread-safe?
• Yes, uses CAS operations
• Result set atomically, only once

Q6: Does cancel() interrupt the task?
• No, just sets result to CancellationException
• Task continues running

Q7: How to implement timeout in Java 8?
• Use ScheduledExecutor + applyToEither`,
      code: `// Q1: Difference in usage
// Future - blocking
Future<String> f = executor.submit(() -> compute());
String result = f.get();  // BLOCKS
process(result);

// CompletableFuture - non-blocking
CompletableFuture.supplyAsync(() -> compute())
    .thenApply(r -> process(r));  // NO BLOCKING

// Q2: thenApply vs thenCompose
// thenApply - transform value
cf.thenApply(s -> s.toUpperCase())  // CF<String> -> CF<String>

// thenCompose - chain futures
cf.thenCompose(id -> fetchAsync(id))  // CF<Id> -> CF<User>

// Q3: Exception handling comparison
cf.exceptionally(ex -> defaultValue)  // Only on error
cf.handle((r, ex) -> ex != null ? def : r)  // Always called

// Q4: Custom executor usage
CompletableFuture.supplyAsync(() -> task(), customExecutor);

// Q5: Thread safety demo
CompletableFuture<String> cf = new CompletableFuture<>();
// Multiple threads can try to complete
executor1.submit(() -> cf.complete("A"));
executor2.submit(() -> cf.complete("B"));
// Only one wins (atomic CAS)

// Q6: Cancellation behavior
CompletableFuture<String> cf = CompletableFuture.supplyAsync(() -> {
    while (!Thread.interrupted()) {  // Won't be interrupted!
        doWork();
    }
    return "done";
});
cf.cancel(true);  // Sets result but doesn't stop task

// Q7: Java 8 timeout pattern (see previous section)`
    }
  ];

  return (
    <div className={`min-h-screen ${colors.background}`}>
      <div className="max-w-6xl mx-auto p-6">
{breadcrumb && <Breadcrumb breadcrumb={breadcrumb} />}

        <div className="flex items-center gap-3 mt-4">
          <button
            ref={backButtonRef}
            onClick={onBack}
            className={`flex items-center gap-2 px-4 py-2 ${colors.buttonBg} text-white rounded-lg transition-all duration-200 hover:scale-105`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        <div className="mt-6">
          <div className="flex items-center gap-3 mb-2">
            <Workflow className={`w-8 h-8 ${colors.accent}`} />
            <h1 className={`text-3xl font-bold ${colors.heading}`}>
              CompletableFuture - Internal Workings
            </h1>
          </div>
          <p className={`text-lg ${colors.secondary} mb-6`}>
            Deep dive into Java's CompletableFuture: non-blocking async programming, completion stages, and internal mechanics for technical interviews.
          </p>

          <div className={`${colors.card} rounded-xl p-4 mb-6 border ${colors.border}`}>
            <h3 className={`font-semibold ${colors.heading} mb-2`}>Architecture Overview</h3>
            <pre className={`text-sm ${colors.secondary} font-mono whitespace-pre overflow-x-auto`}>
{`CompletableFuture<T>
├── result (volatile Object)           // Value, AltResult(null), or AltResult(ex)
├── stack (volatile Completion)        // Linked list of dependent actions
│
├── Completion Types:
│   ├── UniApply       → thenApply(Function)
│   ├── UniAccept      → thenAccept(Consumer)
│   ├── UniRun         → thenRun(Runnable)
│   ├── UniCompose     → thenCompose(Function)
│   ├── UniHandle      → handle(BiFunction)
│   ├── UniWhenComplete→ whenComplete(BiConsumer)
│   ├── UniExceptionally→ exceptionally(Function)
│   ├── BiApply        → thenCombine(CF, BiFunction)
│   └── OrApply        → applyToEither(CF, Function)
│
├── Factory Methods:
│   ├── supplyAsync(Supplier)          // Start with value
│   ├── runAsync(Runnable)             // Start with action
│   ├── completedFuture(value)         // Already complete
│   ├── allOf(CF...)                   // All must complete
│   └── anyOf(CF...)                   // First to complete
│
└── Default Executor: ForkJoinPool.commonPool()`}
            </pre>
          </div>

          <div className={`${colors.card} rounded-xl p-4 mb-6 border ${colors.border}`}>
            <h3 className={`font-semibold ${colors.heading} mb-2`}>Completion Flow</h3>
            <pre className={`text-sm ${colors.secondary} font-mono whitespace-pre overflow-x-auto`}>
{`supplyAsync(() -> "data")              Thread Pool
         │                                  │
         ▼                                  │
   ┌─────────────┐                          │
   │   result    │ ◄── null (incomplete)    │
   │   stack     │ ◄── null                 │
   └─────────────┘                          │
         │                                  │
         │  .thenApply(s -> s.toUpperCase())│
         ▼                                  │
   ┌─────────────┐                          │
   │   result    │ ◄── null                 │
   │   stack     │ ◄── [UniApply] ──────────┤
   └─────────────┘                          │
         │                                  │
         │  Task completes with "data"      │
         ▼                                  │
   ┌─────────────┐    postComplete()        │
   │   result    │ ◄── "data" (CAS)         │
   │   stack     │ ◄── pop & fire ──────────┘
   └─────────────┘         │
                           ▼
                    UniApply.tryFire()
                           │
                           ▼
                    result = "DATA"`}
            </pre>
          </div>

          <div className="space-y-4">
            {sections.map((section, index) => (
              <div key={index} className={`${colors.card} rounded-xl border ${colors.border} overflow-hidden`}>
                <button
                  onClick={() => toggleSection(index)}
                  className={`w-full flex items-center justify-between p-4 ${colors.cardHover} transition-colors duration-200`}
                >
                  <div className="flex items-center gap-3">
                    <span className={colors.accent}>{section.icon}</span>
                    <span className={`font-semibold ${colors.heading}`}>{section.title}</span>
                  </div>
                  {expandedSections[index] ?
                    <ChevronDown className={`w-5 h-5 ${colors.secondary}`} /> :
                    <ChevronRight className={`w-5 h-5 ${colors.secondary}`} />
                  }
                </button>

                {expandedSections[index] && (
                  <div className="p-4 pt-0">
                    <div className={`${colors.secondary} whitespace-pre-line mb-4`}>
                      {section.content}
                    </div>
                    {section.code && (
                      <div className="relative">
                        <div className={`absolute top-2 right-2 text-xs px-2 py-1 rounded ${colors.tag}`}>
                          Java
                        </div>
                        <pre className={`${colors.codeBg} rounded-lg p-4 overflow-x-auto text-sm`}>
                          <code
                            className="font-mono"
                            dangerouslySetInnerHTML={{ __html: highlightCode(section.code) }}
                          />
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={`mt-6 ${colors.card} rounded-xl p-4 border ${colors.border}`}>
            <h3 className={`font-semibold ${colors.heading} mb-3`}>Key Takeaways</h3>
            <ul className={`space-y-2 ${colors.secondary}`}>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>Lock-free:</strong> Uses CAS operations for thread-safe completion without locks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>Stack-based:</strong> Dependent completions stored in LIFO stack, triggered on completion</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>Non-blocking:</strong> thenApply/thenCompose chain without blocking calling thread</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>Exception propagation:</strong> Exceptions wrapped in CompletionException, skip stages until handled</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>Default executor:</strong> ForkJoinPool.commonPool() - don't block it with IO operations</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletableFutureInternals;
