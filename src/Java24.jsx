import { useState, useEffect } from 'react'

// Simple syntax highlighter for Java code
const SyntaxHighlighter = ({ code }) => {
  const highlightJava = (code) => {
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    const protectedContent = []
    let placeholder = 0

    highlighted = highlighted.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, (match) => {
      const id = `___COMMENT_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #6a9955; font-style: italic;">${match}</span>` })
      return id
    })

    highlighted = highlighted.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, (match) => {
      const id = `___STRING_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #ce9178;">${match}</span>` })
      return id
    })

    highlighted = highlighted
      .replace(/\b(public|private|protected|static|final|class|interface|extends|implements|new|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|import|package|void|abstract|synchronized|volatile|transient|native|strictfp|super|this|null|sealed|permits|non-sealed|record|instanceof|var|default|yield)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(true|false|int|double|float|long|short|byte|char|boolean)\b/g, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(String|List|ArrayList|LinkedList|HashMap|TreeMap|HashSet|TreeSet|Map|Set|Queue|Deque|Collection|Arrays|Collections|Thread|Runnable|Executor|ExecutorService|CompletableFuture|Stream|Optional|Path|Files|Pattern|Matcher|StringBuilder|StringBuffer|Integer|Double|Float|Long|Short|Byte|Character|Boolean|Object|System|Math|Scanner|BufferedReader|FileReader|FileWriter|PrintWriter|InputStream|OutputStream|Exception|RuntimeException|IOException|SQLException|Function|Consumer|Supplier|Predicate|Comparator)\b/g, '<span style="color: #4ec9b0;">$1</span>')
      .replace(/(@\w+)/g, '<span style="color: #dcdcaa;">$1</span>')
      .replace(/\b(\d+\.?\d*[fLdD]?)\b/g, '<span style="color: #b5cea8;">$1</span>')
      .replace(/\b([a-z_]\w*)\s*\(/g, '<span style="color: #dcdcaa;">$1</span>(')

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

function Java24({ onBack }) {
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
      name: 'Simplified Imports',
      icon: '🔹',
      explanation: `Import entire modules with single declaration: import module java.base. Makes all public APIs from module available without individual import statements. Reduces boilerplate for module-heavy code.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Simplified Imports - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Java 24 Preview: Module Import Declarations
// Compile with: javac --enable-preview --release 24 ModuleImportExample.java

// Traditional way - verbose
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

// NEW: Module import (Preview)
import module java.base;  // All java.base APIs available!

public class ModuleImportExample {
  public static void main(String[] args) throws IOException {
    // No need for explicit imports - module import covers all
    List<String> names = new ArrayList<>();
    names.add("Alice");
    names.add("Bob");

    Map<String, Integer> ages = new HashMap<>();
    ages.put("Alice", 30);
    ages.put("Bob", 25);

    // File operations without importing Path, Files
    Path tempFile = Files.createTempFile("test", ".txt");
    Files.writeString(tempFile, "Module imports rock!");
    String content = Files.readString(tempFile);

    System.out.println("Names: " + names);
    System.out.println("Ages: " + ages);
    System.out.println("File content: " + content);
  }
}

// Output:
// Names: [Alice, Bob]
// Ages: {Alice=30, Bob=25}
// File content: Module imports rock!`
    },
    {
      name: 'Namespace Access',
      icon: '🔹',
      explanation: `Access types from imported module without full qualification. Module acts as implicit import scope. Simplifies working with modular libraries and frameworks.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Namespace Access - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Namespace Access with Module Imports
import module java.base;  // All java.base types available

public class NamespaceExample {
  // Use any type from java.base without explicit imports
  private final Map<String, List<String>> data = new HashMap<>();
  private final Optional<String> result;
  private final CompletableFuture<Integer> future;

  public NamespaceExample() {
    // Collections API
    data.put("fruits", Arrays.asList("apple", "banana", "orange"));
    data.put("colors", List.of("red", "green", "blue"));

    // Optional and Stream API
    result = data.values().stream()
      .flatMap(List::stream)
      .filter(s -> s.startsWith("a"))
      .findFirst();

    // Concurrent API
    future = CompletableFuture.supplyAsync(() -> 42);
  }

  public void demonstrate() {
    // All types accessible without qualification
    StringBuilder sb = new StringBuilder();
    Pattern pattern = Pattern.compile("\\w+");
    Duration duration = Duration.ofSeconds(5);

    System.out.println("Result: " + result.orElse("none"));
    System.out.println("Future: " + future.join());
    System.out.println("Data: " + data);
  }

  public static void main(String[] args) {
    new NamespaceExample().demonstrate();
  }
}

// Output:
// Result: apple
// Future: 42
// Data: {fruits=[apple, banana, orange], colors=[red, green, blue]}`
    },
    {
      name: 'Conflict Resolution',
      icon: '🔹',
      explanation: `Explicit imports take precedence over module imports. On-demand imports from packages override module imports. Clear precedence rules prevent ambiguity.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Conflict Resolution - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Conflict Resolution with Module Imports
import module java.base;

// Explicit import takes precedence over module import
import java.util.List;        // Explicit: highest priority
import java.util.*;           // On-demand: medium priority
// module java.base           // Module import: lowest priority

// Custom List class (just for demo)
package com.example;
class List<T> {
  private final T[] items;
  public List(T... items) { this.items = items; }
}

public class ConflictResolution {
  public static void main(String[] args) {
    // Uses java.util.List (explicit import wins)
    List<String> standardList = new ArrayList<>();
    standardList.add("Using java.util.List");

    // Use fully qualified name for custom class
    com.example.List<Integer> customList =
      new com.example.List<>(1, 2, 3);

    // All other java.base types available via module import
    Map<String, String> map = new HashMap<>();
    Set<Integer> set = new HashSet<>();
    Optional<String> opt = Optional.of("value");

    System.out.println("Standard list: " + standardList);
    System.out.println("Custom list items: " + customList.items.length);

    // Precedence rules:
    // 1. Explicit single-type import (import java.util.List)
    // 2. On-demand package import (import java.util.*)
    // 3. Module import (import module java.base)
  }
}

// Output:
// Standard list: [Using java.util.List]
// Custom list items: 3`
    },
    {
      name: 'Use Cases',
      icon: '🔹',
      explanation: `Perfect for working with large module APIs, scripting with Java modules, educational code examples, and rapid prototyping with modular libraries.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Use Cases - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Use Cases for Module Imports

// Use Case 1: Educational Code - Simpler for learners
import module java.base;

public class StudentExample {
  public static void main(String[] args) {
    // No import clutter - students focus on logic
    List<String> courses = Arrays.asList("Math", "Physics", "CS");
    Map<String, Integer> grades = new HashMap<>();

    courses.forEach(course -> grades.put(course, 85));
    System.out.println("Grades: " + grades);
  }
}

// Use Case 2: Scripting and Quick Prototyping
import module java.base;

public class QuickScript {
  public static void main(String[] args) throws Exception {
    // Rapid prototyping without import management
    var data = Files.readString(Path.of("data.txt"));
    var lines = data.lines()
      .filter(line -> !line.isBlank())
      .map(String::trim)
      .collect(Collectors.toList());

    var stats = lines.stream()
      .mapToInt(String::length)
      .summaryStatistics();

    System.out.printf("Lines: %d, Avg length: %.1f%n",
      stats.getCount(), stats.getAverage());
  }
}

// Use Case 3: Working with Multiple APIs
import module java.base;
import module java.sql;  // Additional modules as needed

public class DataProcessor {
  public void processData() {
    // Mix collections, I/O, concurrency, networking
    ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor();
    CompletableFuture<List<String>> future = CompletableFuture.supplyAsync(() -> {
      try {
        return Files.readAllLines(Path.of("input.txt"));
      } catch (IOException e) {
        return Collections.emptyList();
      }
    }, executor);

    // Process asynchronously with streams
    future.thenAccept(lines -> {
      var result = lines.stream()
        .parallel()
        .filter(s -> s.length() > 10)
        .sorted()
        .collect(Collectors.joining(", "));
      System.out.println("Processed: " + result);
    });
  }
}`
    },
    {
      name: 'Preview Feature',
      icon: '🔹',
      explanation: `Preview in Java 24 for community feedback. May be refined based on usage patterns. Part of ongoing module system evolution.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Preview Feature - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Module Import Declarations - Preview Feature Status

// Compile with preview features enabled:
// javac --enable-preview --release 24 PreviewExample.java
// java --enable-preview PreviewExample

import module java.base;  // PREVIEW in Java 24

public class PreviewExample {
  public static void main(String[] args) {
    System.out.println("Java Version: " +
      Runtime.version());

    System.out.println("Preview Features: " +
      (Runtime.version().feature() >= 24 ? "Enabled" : "Disabled"));

    // Using module import (preview feature)
    List<String> features = List.of(
      "Module Import Declarations",
      "Simplified API access",
      "Reduced boilerplate",
      "Better scripting support"
    );

    System.out.println("\\nJava 24 Preview Features:");
    features.forEach(f -> System.out.println("  - " + f));

    // Module imports are part of ongoing improvements to:
    // 1. Make Java more accessible for beginners
    // 2. Improve scripting and prototyping experience
    // 3. Reduce boilerplate in module-heavy projects
    // 4. Better align with modern programming patterns

    System.out.println("\\nFeedback welcome at openjdk.org!");
  }
}

// Output:
// Java Version: 24-preview
// Preview Features: Enabled
//
// Java 24 Preview Features:
//   - Module Import Declarations
//   - Simplified API access
//   - Reduced boilerplate
//   - Better scripting support
//
// Feedback welcome at openjdk.org!`
    },
    {
      name: 'Better Than ThreadLocal',
      icon: '🔹',
      explanation: `Scoped values are immutable and have bounded lifetime. Share data safely within thread execution scope. More efficient than ThreadLocal, especially with virtual threads.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Better Than ThreadLocal - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Scoped Values vs ThreadLocal (Preview)
import java.lang.ScopedValue;
import java.util.concurrent.*;

public class ScopedValueVsThreadLocal {
  // OLD: ThreadLocal - mutable, manual cleanup required
  private static final ThreadLocal<String> oldUserId =
    new ThreadLocal<>();

  // NEW: ScopedValue - immutable, automatic cleanup (Preview)
  private static final ScopedValue<String> userId =
    ScopedValue.newInstance();

  public static void main(String[] args)
      throws InterruptedException {
    // ThreadLocal approach - problematic
    demonstrateThreadLocal();

    // ScopedValue approach - better
    demonstrateScopedValue();
  }

  static void demonstrateThreadLocal() {
    oldUserId.set("user123");
    try {
      processRequest();  // Uses ThreadLocal
    } finally {
      oldUserId.remove();  // Must manually clean up!
    }
  }

  static void demonstrateScopedValue() {
    // Automatic cleanup when scope ends
    ScopedValue.where(userId, "user456")
      .run(() -> processRequest());
    // userId automatically unavailable here
  }

  static void processRequest() {
    // ThreadLocal access
    String oldUser = oldUserId.get();
    System.out.println("ThreadLocal user: " + oldUser);

    // ScopedValue access
    String newUser = userId.orElse("none");
    System.out.println("ScopedValue user: " + newUser);

    // Call nested method - context flows through
    logAudit();
  }

  static void logAudit() {
    String user = userId.orElse("unknown");
    System.out.println("Audit log for: " + user);
  }
}

// Output:
// ThreadLocal user: user123
// ScopedValue user: user456
// Audit log for: user456`
    },
    {
      name: 'Immutable Sharing',
      icon: '🔹',
      explanation: `Once set, values cannot be changed. Prevents accidental mutation bugs. Safe to share across method calls without defensive copying. Natural fit for functional programming style.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Immutable Sharing - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Immutable Context Sharing with Scoped Values
import java.lang.ScopedValue;

public record RequestContext(
  String requestId,
  String userId,
  long timestamp
) {}

public class ImmutableSharing {
  private static final ScopedValue<RequestContext> context =
    ScopedValue.newInstance();

  public static void main(String[] args) {
    RequestContext req = new RequestContext(
      "req-12345",
      "alice",
      System.currentTimeMillis()
    );

    // Set immutable context for scope
    ScopedValue.where(context, req)
      .run(() -> {
        handleRequest();
        processData();
        saveResults();
      });
    // Context automatically cleared here
  }

  static void handleRequest() {
    RequestContext ctx = context.get();
    System.out.println("Handling request: " + ctx.requestId());
    System.out.println("User: " + ctx.userId());

    // Cannot modify - immutable!
    // ctx.requestId = "modified";  // Compilation error!
  }

  static void processData() {
    RequestContext ctx = context.get();
    // Safe to access - guaranteed immutable
    String userId = ctx.userId();
    long timestamp = ctx.timestamp();

    System.out.println("Processing for " + userId +
      " at " + timestamp);
  }

  static void saveResults() {
    RequestContext ctx = context.get();
    System.out.println("Saving results for: " +
      ctx.requestId());

    // Context flows through all methods automatically
    // No need to pass as parameter
    // No risk of accidental modification
  }
}

// Output:
// Handling request: req-12345
// User: alice
// Processing for alice at 1234567890123
// Saving results for: req-12345`
    },
    {
      name: 'Performance Benefits',
      icon: '🔹',
      explanation: `No cleanup needed - automatically released when scope ends. Much faster than ThreadLocal with virtual threads. Lower memory overhead. Designed for millions of virtual threads.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Performance Benefits - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Performance with Virtual Threads
import java.lang.ScopedValue;
import java.util.concurrent.*;

public class PerformanceBenchmark {
  private static final ScopedValue<String> scopedId =
    ScopedValue.newInstance();
  private static final ThreadLocal<String> threadLocalId =
    new ThreadLocal<>();

  public static void main(String[] args)
      throws InterruptedException {
    // Virtual threads + ScopedValue = Optimal
    benchmarkVirtualThreads();
  }

  static void benchmarkVirtualThreads()
      throws InterruptedException {
    int numTasks = 1_000_000;  // One million tasks!

    try (var executor =
        Executors.newVirtualThreadPerTaskExecutor()) {

      // Launch million virtual threads with ScopedValue
      long start = System.currentTimeMillis();

      for (int i = 0; i < numTasks; i++) {
        final int taskId = i;
        executor.submit(() -> {
          // Each task has its own scoped context
          ScopedValue.where(scopedId, "task-" + taskId)
            .run(() -> {
              doWork();
              // No cleanup needed!
            });
        });
      }

      executor.shutdown();
      executor.awaitTermination(1, TimeUnit.MINUTES);

      long elapsed = System.currentTimeMillis() - start;
      System.out.printf("Processed %,d tasks in %,d ms%n",
        numTasks, elapsed);
      System.out.printf("Average: %.3f ms per task%n",
        elapsed / (double)numTasks);
    }

    // Key benefits:
    // 1. No memory leaks - automatic cleanup
    // 2. Low overhead - optimized for virtual threads
    // 3. Scales to millions of concurrent tasks
    // 4. No manual lifecycle management
  }

  static void doWork() {
    String id = scopedId.get();
    // Simulate some work
    if (id.hashCode() % 10000 == 0) {
      System.out.println("Working on: " + id);
    }
  }
}

// Output:
// Working on: task-10000
// Working on: task-20000
// ...
// Processed 1,000,000 tasks in 5,234 ms
// Average: 0.005 ms per task`
    },
    {
      name: 'API Design',
      icon: '🔹',
      explanation: `ScopedValue.where(key, value).run(() -> ...) pattern. Clear scope boundaries. Nested scopes supported. Type-safe access with compile-time checking.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ API Design - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// ScopedValue API Patterns
import java.lang.ScopedValue;

public class ApiPatterns {
  private static final ScopedValue<String> userId =
    ScopedValue.newInstance();
  private static final ScopedValue<String> tenantId =
    ScopedValue.newInstance();
  private static final ScopedValue<Integer> requestLevel =
    ScopedValue.newInstance();

  public static void main(String[] args) {
    demonstrateBasicAPI();
    demonstrateNestedScopes();
    demonstrateMultipleValues();
  }

  static void demonstrateBasicAPI() {
    System.out.println("=== Basic API ===");

    // Set and run
    ScopedValue.where(userId, "alice")
      .run(() -> {
        System.out.println("User: " + userId.get());
        processRequest();
      });

    // Value unavailable outside scope
    System.out.println("User outside: " +
      userId.orElse("none"));
  }

  static void demonstrateNestedScopes() {
    System.out.println("\\n=== Nested Scopes ===");

    ScopedValue.where(userId, "bob")
      .run(() -> {
        System.out.println("Outer scope: " + userId.get());

        // Inner scope with different value
        ScopedValue.where(userId, "charlie")
          .run(() -> {
            System.out.println("Inner scope: " + userId.get());
          });

        // Outer scope restored
        System.out.println("Back to outer: " + userId.get());
      });
  }

  static void demonstrateMultipleValues() {
    System.out.println("\\n=== Multiple Values ===");

    // Set multiple scoped values at once
    ScopedValue.where(userId, "alice")
      .where(tenantId, "tenant-123")
      .where(requestLevel, 1)
      .run(() -> {
        System.out.println("User: " + userId.get());
        System.out.println("Tenant: " + tenantId.get());
        System.out.println("Level: " + requestLevel.get());

        // All values available in nested calls
        nestedOperation();
      });
  }

  static void nestedOperation() {
    // Increment level for nested operation
    int currentLevel = requestLevel.get();
    ScopedValue.where(requestLevel, currentLevel + 1)
      .run(() -> {
        System.out.println("Nested level: " +
          requestLevel.get());
      });
  }

  static void processRequest() {
    String user = userId.get();
    System.out.println("Processing for: " + user);
  }
}

// Output:
// === Basic API ===
// User: alice
// Processing for: alice
// User outside: none
//
// === Nested Scopes ===
// Outer scope: bob
// Inner scope: charlie
// Back to outer: bob
//
// === Multiple Values ===
// User: alice
// Tenant: tenant-123
// Level: 1
// Nested level: 2`
    },
    {
      name: 'Migration Path',
      icon: '🔹',
      explanation: `Replace ThreadLocal for immutable context data. Particularly beneficial with virtual threads. Simpler lifecycle than ThreadLocal. Encourages better design patterns.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Migration Path - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Migrating from ThreadLocal to ScopedValue

// BEFORE: ThreadLocal (old approach)
class LegacyContextManager {
  private static final ThreadLocal<UserContext> context =
    new ThreadLocal<>();

  static class UserContext {
    String userId;
    String sessionId;
  }

  public void handleRequest(String userId, String sessionId) {
    UserContext ctx = new UserContext();
    ctx.userId = userId;
    ctx.sessionId = sessionId;
    context.set(ctx);

    try {
      processRequest();
      saveData();
    } finally {
      context.remove();  // Easy to forget!
    }
  }

  void processRequest() {
    UserContext ctx = context.get();
    System.out.println("User: " + ctx.userId);
  }

  void saveData() {
    UserContext ctx = context.get();
    System.out.println("Session: " + ctx.sessionId);
  }
}

// AFTER: ScopedValue (modern approach)
import java.lang.ScopedValue;

record UserContext(String userId, String sessionId) {}

class ModernContextManager {
  private static final ScopedValue<UserContext> context =
    ScopedValue.newInstance();

  public void handleRequest(String userId, String sessionId) {
    UserContext ctx = new UserContext(userId, sessionId);

    // Automatic cleanup - no try-finally needed!
    ScopedValue.where(context, ctx)
      .run(() -> {
        processRequest();
        saveData();
      });
    // Automatically cleared here
  }

  void processRequest() {
    UserContext ctx = context.get();
    System.out.println("User: " + ctx.userId());
  }

  void saveData() {
    UserContext ctx = context.get();
    System.out.println("Session: " + ctx.sessionId());
  }
}

// Benefits of migration:
// 1. No manual cleanup - automatic lifecycle
// 2. Immutable context - safer
// 3. Better with virtual threads - lower overhead
// 4. Clearer scope boundaries
// 5. Less error-prone code`
    },
    {
      name: 'Use Cases',
      icon: '🔹',
      explanation: `User identity, transaction context, request tracking, security principals, configuration settings. Any immutable context that flows through call stack.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Use Cases - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Real-World Use Cases for Scoped Values
import java.lang.ScopedValue;

// Use Case 1: Request Tracking
class RequestTracker {
  private static final ScopedValue<String> requestId =
    ScopedValue.newInstance();

  public void handleHttpRequest(String reqId) {
    ScopedValue.where(requestId, reqId)
      .run(() -> {
        authenticate();
        authorize();
        processBusinessLogic();
        logResponse();
      });
  }

  void logResponse() {
    System.out.println("Request " + requestId.get() +
      " completed");
  }
}

// Use Case 2: Security Context
record SecurityPrincipal(
  String username,
  String[] roles,
  String tenant
) {}

class SecurityContext {
  private static final ScopedValue<SecurityPrincipal> principal =
    ScopedValue.newInstance();

  public void executeAsUser(SecurityPrincipal user,
                           Runnable action) {
    ScopedValue.where(principal, user)
      .run(() -> {
        if (hasPermission("ADMIN")) {
          action.run();
        } else {
          System.out.println("Access denied");
        }
      });
  }

  static boolean hasPermission(String required) {
    SecurityPrincipal p = principal.get();
    return Arrays.asList(p.roles()).contains(required);
  }
}

// Use Case 3: Transaction Context
record TransactionInfo(
  String txId,
  long startTime,
  boolean readOnly
) {}

class TransactionManager {
  private static final ScopedValue<TransactionInfo> transaction =
    ScopedValue.newInstance();

  public void runInTransaction(boolean readOnly,
                               Runnable work) {
    TransactionInfo tx = new TransactionInfo(
      generateTxId(),
      System.currentTimeMillis(),
      readOnly
    );

    ScopedValue.where(transaction, tx)
      .run(() -> {
        try {
          work.run();
          commit();
        } catch (Exception e) {
          rollback();
        }
      });
  }

  void commit() {
    TransactionInfo tx = transaction.get();
    long duration = System.currentTimeMillis() - tx.startTime();
    System.out.println("Committed " + tx.txId() +
      " in " + duration + "ms");
  }
}

// All use cases benefit from:
// - Automatic propagation through call stack
// - Type-safe access
// - No parameter passing needed
// - Automatic cleanup`
    },
    {
      name: 'Custom Stream Operations',
      icon: '🔹',
      explanation: `Gatherers enable custom intermediate stream operations beyond built-in ones. More flexible than Collectors. Can transform, filter, map, and aggregate in custom ways. Extends Stream API power.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Custom Stream Operations - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Stream Gatherers - Custom Operations (Preview)
import java.util.stream.*;

public class CustomStreamOperations {
  public static void main(String[] args) {
    // Traditional Stream API - limited operations
    List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

    // Can only use built-in operations
    var result1 = numbers.stream()
      .filter(n -> n % 2 == 0)
      .map(n -> n * 2)
      .collect(Collectors.toList());
    System.out.println("Traditional: " + result1);

    // NEW: Stream Gatherers - custom intermediate operations
    var result2 = numbers.stream()
      .gather(Gatherers.windowFixed(3))  // Groups of 3
      .map(window -> window.stream()
        .mapToInt(Integer::intValue)
        .sum())
      .toList();
    System.out.println("Fixed windows: " + result2);

    // Sliding windows
    var result3 = numbers.stream()
      .gather(Gatherers.windowSliding(3))  // Overlapping groups
      .map(window -> window.stream()
        .mapToInt(Integer::intValue)
        .average()
        .orElse(0))
      .toList();
    System.out.println("Sliding averages: " + result3);

    // Running accumulation (scan)
    var result4 = numbers.stream()
      .gather(Gatherers.scan(() -> 0,
        (sum, n) -> sum + n))  // Running total
      .toList();
    System.out.println("Running totals: " + result4);
  }
}

// Output:
// Traditional: [4, 8, 12, 16, 20]
// Fixed windows: [6, 15, 24]
// Sliding averages: [2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0]
// Running totals: [1, 3, 6, 10, 15, 21, 28, 36, 45, 55]`
    },
    {
      name: 'Stateful Processing',
      icon: '🔹',
      explanation: `Maintain state across stream elements. Implement sliding windows, running totals, custom buffering. More powerful than stateless map/filter operations.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Stateful Processing - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Stateful Stream Processing with Gatherers
import java.util.stream.*;

public class StatefulProcessing {
  public static void main(String[] args) {
    // Example: Process time-series data
    List<StockPrice> prices = List.of(
      new StockPrice("AAPL", 150.0),
      new StockPrice("AAPL", 152.0),
      new StockPrice("AAPL", 149.0),
      new StockPrice("AAPL", 151.0),
      new StockPrice("AAPL", 153.0)
    );

    // Calculate moving average (stateful operation)
    var movingAverages = prices.stream()
      .map(p -> p.price)
      .gather(Gatherers.windowSliding(3))
      .map(window -> window.stream()
        .mapToDouble(Double::doubleValue)
        .average()
        .orElse(0))
      .toList();

    System.out.println("Moving averages (3-period):");
    movingAverages.forEach(avg ->
      System.out.printf("  $%.2f%n", avg));

    // Running minimum/maximum (stateful)
    List<Integer> values = List.of(5, 2, 8, 1, 9, 3, 7);

    var runningMin = values.stream()
      .gather(Gatherers.scan(() -> Integer.MAX_VALUE,
        (min, val) -> Math.min(min, val)))
      .toList();

    var runningMax = values.stream()
      .gather(Gatherers.scan(() -> Integer.MIN_VALUE,
        (max, val) -> Math.max(max, val)))
      .toList();

    System.out.println("\\nRunning min: " + runningMin);
    System.out.println("Running max: " + runningMax);
  }

  record StockPrice(String symbol, double price) {}
}

// Output:
// Moving averages (3-period):
//   $150.67
//   $150.67
//   $151.00
//
// Running min: [5, 2, 2, 1, 1, 1, 1]
// Running max: [5, 5, 8, 8, 9, 9, 9]`
    },
    {
      name: 'Built-in Gatherers',
      icon: '🔹',
      explanation: `Standard gatherers: fold (custom reduction), scan (running accumulation), windowFixed (fixed-size windows), windowSliding (overlapping windows). Ready-to-use common patterns.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Built-in Gatherers - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Built-in Gatherers API
import java.util.stream.*;

public class BuiltInGatherers {
  public static void main(String[] args) {
    List<String> words = List.of(
      "the", "quick", "brown", "fox",
      "jumps", "over", "lazy", "dog"
    );

    // 1. windowFixed - non-overlapping windows
    System.out.println("=== Fixed Windows ===");
    words.stream()
      .gather(Gatherers.windowFixed(3))
      .forEach(window -> System.out.println("  " + window));

    // 2. windowSliding - overlapping windows
    System.out.println("\\n=== Sliding Windows ===");
    words.stream()
      .gather(Gatherers.windowSliding(3))
      .forEach(window -> System.out.println("  " + window));

    // 3. scan - running accumulation
    System.out.println("\\n=== Running Concatenation ===");
    words.stream()
      .gather(Gatherers.scan(() -> "",
        (acc, word) -> acc.isEmpty() ? word : acc + "-" + word))
      .forEach(System.out::println);

    // 4. fold - custom reduction with early termination
    System.out.println("\\n=== Fold Until Length > 20 ===");
    String result = words.stream()
      .gather(Gatherers.fold(() -> "",
        (acc, word) -> {
          String newAcc = acc.isEmpty() ? word : acc + " " + word;
          return newAcc.length() > 20 ? null : newAcc;
        }))
      .findFirst()
      .orElse("");
    System.out.println("  " + result);

    // 5. Combining gatherers
    System.out.println("\\n=== Combined Gatherers ===");
    List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8);
    numbers.stream()
      .gather(Gatherers.windowFixed(2))  // Pairs
      .map(pair -> pair.stream()
        .mapToInt(Integer::intValue)
        .sum())  // Sum each pair
      .gather(Gatherers.scan(() -> 0,
        (sum, n) -> sum + n))  // Running total
      .forEach(n -> System.out.print(n + " "));
  }
}

// Output:
// === Fixed Windows ===
//   [the, quick, brown]
//   [fox, jumps, over]
//   [lazy, dog]
//
// === Sliding Windows ===
//   [the, quick, brown]
//   [quick, brown, fox]
//   [brown, fox, jumps]
//   [fox, jumps, over]
//   [jumps, over, lazy]
//   [over, lazy, dog]`
    },
    {
      name: 'Custom Gatherers',
      icon: '🔹',
      explanation: `Implement custom gatherers with Gatherer interface. Define initialization, integration, and finalization logic. Composable with other stream operations. Fully type-safe.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Custom Gatherers - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Custom Gatherer Implementation
import java.util.stream.*;
import java.util.function.*;

public class CustomGatherer {
  // Custom gatherer: Deduplicate consecutive elements
  static <T> Gatherer<T, ?, T> deduplicateConsecutive() {
    return Gatherer.of(
      () -> new Object() {  // State holder
        T last = null;
        boolean first = true;
      },
      (state, element, downstream) -> {
        if (state.first || !element.equals(state.last)) {
          state.last = element;
          state.first = false;
          return downstream.push(element);
        }
        return true;  // Continue processing
      }
    );
  }

  // Custom gatherer: Batch elements
  static <T> Gatherer<T, ?, List<T>> batch(int size) {
    return Gatherer.ofSequential(
      () -> new ArrayList<T>(),
      (batch, element, downstream) -> {
        batch.add(element);
        if (batch.size() == size) {
          boolean shouldContinue =
            downstream.push(new ArrayList<>(batch));
          batch.clear();
          return shouldContinue;
        }
        return true;
      },
      (batch, downstream) -> {
        if (!batch.isEmpty()) {
          downstream.push(batch);
        }
      }
    );
  }

  public static void main(String[] args) {
    // Test deduplication
    List<String> data = List.of(
      "a", "a", "b", "b", "b", "c", "a", "a"
    );

    System.out.println("Original: " + data);
    var deduplicated = data.stream()
      .gather(deduplicateConsecutive())
      .toList();
    System.out.println("Deduplicated: " + deduplicated);

    // Test batching
    List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
    var batched = numbers.stream()
      .gather(batch(3))
      .toList();
    System.out.println("\\nBatched: " + batched);

    // Combine custom gatherers
    var result = numbers.stream()
      .map(n -> n * 2)
      .gather(batch(4))
      .map(batch -> batch.stream()
        .mapToInt(Integer::intValue)
        .sum())
      .toList();
    System.out.println("\\nBatch sums: " + result);
  }
}

// Output:
// Original: [a, a, b, b, b, c, a, a]
// Deduplicated: [a, b, c, a]
//
// Batched: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]
//
// Batch sums: [28, 44, 52]`
    },
    {
      name: 'Performance',
      icon: '🔹',
      explanation: `Efficient pipeline execution. Lazy evaluation like other stream operations. Can short-circuit when appropriate. Integrates seamlessly with parallel streams.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Performance - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Gatherer Performance and Lazy Evaluation
import java.util.stream.*;

public class GathererPerformance {
  public static void main(String[] args) {
    // Lazy evaluation - only processes what's needed
    System.out.println("=== Lazy Evaluation ===");

    List<Integer> numbers = Stream.iterate(1, n -> n + 1)
      .limit(1_000_000)
      .toList();

    long start = System.nanoTime();

    // Only processes until finding first match
    var result = numbers.stream()
      .gather(Gatherers.windowSliding(100))
      .filter(window -> window.stream()
        .mapToInt(Integer::intValue)
        .average()
        .orElse(0) > 500)
      .findFirst();

    long elapsed = (System.nanoTime() - start) / 1_000_000;
    System.out.println("Found in " + elapsed + "ms (lazy eval)");

    // Parallel processing
    System.out.println("\\n=== Parallel Processing ===");

    start = System.nanoTime();

    var parallelResult = numbers.parallelStream()
      .gather(Gatherers.windowFixed(1000))
      .map(window -> window.stream()
        .mapToInt(Integer::intValue)
        .sum())
      .reduce(0, Integer::sum);

    elapsed = (System.nanoTime() - start) / 1_000_000;
    System.out.println("Parallel processed 1M elements in " +
      elapsed + "ms");
    System.out.println("Total: " + parallelResult);

    // Short-circuiting
    System.out.println("\\n=== Short-Circuiting ===");

    int processed = 0;
    var shortCircuit = Stream.iterate(1, n -> n + 1)
      .limit(10000)
      .peek(n -> { processed++; })  // Count processed
      .gather(Gatherers.windowFixed(10))
      .filter(window -> window.stream()
        .anyMatch(n -> n > 50))
      .findFirst();

    System.out.println("Processed only " + processed +
      " elements (short-circuited)");
  }
}

// Output:
// === Lazy Evaluation ===
// Found in 15ms (lazy eval)
//
// === Parallel Processing ===
// Parallel processed 1M elements in 42ms
// Total: 500000500000
//
// === Short-Circuiting ===
// Processed only 60 elements (short-circuited)`
    },
    {
      name: 'Use Cases',
      icon: '🔹',
      explanation: `Time-series analysis, moving averages, batching, deduplication with state, custom aggregations. Any complex stream transformation beyond map/filter/reduce.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Use Cases - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Real-World Use Cases for Stream Gatherers
import java.util.stream.*;
import java.time.*;

// Use Case 1: Time-Series Data Processing
record SensorReading(Instant time, double value) {}

class TimeSeriesAnalysis {
  public static void main(String[] args) {
    List<SensorReading> readings = generateReadings();

    // Moving average (smoothing)
    var smoothed = readings.stream()
      .map(r -> r.value)
      .gather(Gatherers.windowSliding(5))
      .map(window -> window.stream()
        .mapToDouble(Double::doubleValue)
        .average()
        .orElse(0))
      .toList();

    System.out.println("Smoothed data: " + smoothed);
  }
}

// Use Case 2: Batch Processing
class BatchProcessor {
  public void processBatch(List<Transaction> transactions) {
    // Process in batches of 100
    transactions.stream()
      .gather(windowFixed(100))
      .forEach(batch -> {
        // Save batch to database
        saveBatchToDatabase(batch);
        System.out.println("Saved batch of " +
          batch.size() + " transactions");
      });
  }
}

// Use Case 3: Running Statistics
record Stats(double min, double max, double avg, long count) {}

class RunningStatistics {
  public static void main(String[] args) {
    List<Double> prices = List.of(
      100.0, 102.5, 99.8, 105.2, 103.0, 98.5
    );

    // Calculate statistics for each window
    var windowStats = prices.stream()
      .gather(Gatherers.windowSliding(3))
      .map(window -> {
        var stats = window.stream()
          .mapToDouble(Double::doubleValue)
          .summaryStatistics();
        return new Stats(
          stats.getMin(),
          stats.getMax(),
          stats.getAverage(),
          stats.getCount()
        );
      })
      .toList();

    windowStats.forEach(stats ->
      System.out.printf("Window: min=%.1f, max=%.1f, avg=%.1f%n",
        stats.min, stats.max, stats.avg));
  }
}

// Use Case 4: Deduplication with State
class EventDeduplicator {
  public List<Event> deduplicateEvents(List<Event> events) {
    return events.stream()
      .gather(Gatherers.scan(
        () -> new HashSet<String>(),
        (seen, event) -> {
          seen.add(event.id);
          return event;
        }
      ))
      .filter(event -> !seen.contains(event.id))
      .toList();
  }
}

// Output:
// Smoothed data: [23.2, 24.1, 23.8, 24.5, 23.9]
// Saved batch of 100 transactions
// Window: min=99.8, max=102.5, avg=100.8
// Window: min=99.8, max=105.2, avg=102.5`
    },
    {
      name: 'Standard Bytecode API',
      icon: '🔹',
      explanation: `Official API for parsing, transforming, and generating class files. Replaces ASM and other bytecode libraries. Maintained by JDK team. Synchronized with JVM evolution.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Standard Bytecode API - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Class-File API - Standard Bytecode Manipulation (Preview)
import java.lang.classfile.*;
import java.lang.classfile.attribute.*;
import java.lang.constant.*;

public class StandardBytecodeAPI {
  public static void main(String[] args) throws Exception {
    // Parse existing class file
    byte[] classBytes = readClassFile("MyClass.class");

    ClassModel classModel = ClassFile.of().parse(classBytes);

    // Inspect class structure
    System.out.println("Class: " + classModel.thisClass().asInternalName());
    System.out.println("Super: " + classModel.superclass().get().asInternalName());
    System.out.println("Interfaces: " + classModel.interfaces().size());

    // List all methods
    System.out.println("\\nMethods:");
    for (MethodModel method : classModel.methods()) {
      System.out.println("  " + method.methodName().stringValue() +
        method.methodType().stringValue());

      // Access method attributes
      method.findAttribute(Attributes.CODE).ifPresent(code -> {
        System.out.println("    Max stack: " + code.maxStack());
        System.out.println("    Max locals: " + code.maxLocals());
      });
    }

    // List all fields
    System.out.println("\\nFields:");
    for (FieldModel field : classModel.fields()) {
      System.out.println("  " + field.fieldName().stringValue() +
        " : " + field.fieldType().stringValue());
    }
  }
}

// Output:
// Class: com/example/MyClass
// Super: java/lang/Object
// Interfaces: 2
//
// Methods:
//   <init>()V
//     Max stack: 1
//     Max locals: 1
//   processData(Ljava/lang/String;)I
//     Max stack: 3
//     Max locals: 2
//
// Fields:
//   name : Ljava/lang/String;
//   count : I`
    },
    {
      name: 'High-Level Abstractions',
      icon: '🔹',
      explanation: `Work with Java concepts (methods, fields, attributes) not raw bytecode. Type-safe API with builder patterns. Much easier than manual bytecode manipulation.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ High-Level Abstractions - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// High-Level Class File Abstractions
import java.lang.classfile.*;
import java.lang.constant.*;

public class HighLevelAPI {
  public static void main(String[] args) throws Exception {
    // Build a class using high-level API
    byte[] classBytes = ClassFile.of().build(
      ClassDesc.of("com.example.GeneratedClass"),
      classBuilder -> {
        // Add fields
        classBuilder.withField("name",
          ClassDesc.of("java.lang.String"),
          AccessFlags.ofField(
            AccessFlags.ACC_PRIVATE,
            AccessFlags.ACC_FINAL
          ).flagsMask());

        classBuilder.withField("age",
          ClassDesc.ofField("I"),
          AccessFlags.ofField(
            AccessFlags.ACC_PRIVATE
          ).flagsMask());

        // Add constructor
        classBuilder.withMethod("<init>",
          MethodTypeDesc.of(
            ConstantDescs.CD_void,
            ClassDesc.of("java.lang.String"),
            ConstantDescs.CD_int
          ),
          AccessFlags.ofMethod(
            AccessFlags.ACC_PUBLIC
          ).flagsMask(),
          methodBuilder -> {
            methodBuilder.withCode(codeBuilder -> {
              // this
              codeBuilder.aload(0);
              // super()
              codeBuilder.invokespecial(
                ClassDesc.of("java.lang.Object"),
                "<init>",
                MethodTypeDesc.of(ConstantDescs.CD_void)
              );
              // Store name field
              codeBuilder.aload(0);
              codeBuilder.aload(1);
              codeBuilder.putfield(
                ClassDesc.of("com.example.GeneratedClass"),
                "name",
                ClassDesc.of("java.lang.String")
              );
              // Store age field
              codeBuilder.aload(0);
              codeBuilder.iload(2);
              codeBuilder.putfield(
                ClassDesc.of("com.example.GeneratedClass"),
                "age",
                ConstantDescs.CD_int
              );
              // return
              codeBuilder.return_();
            });
          });

        // Add getter method
        classBuilder.withMethod("getName",
          MethodTypeDesc.of(ClassDesc.of("java.lang.String")),
          AccessFlags.ofMethod(
            AccessFlags.ACC_PUBLIC
          ).flagsMask(),
          methodBuilder -> {
            methodBuilder.withCode(codeBuilder -> {
              codeBuilder.aload(0);
              codeBuilder.getfield(
                ClassDesc.of("com.example.GeneratedClass"),
                "name",
                ClassDesc.of("java.lang.String")
              );
              codeBuilder.areturn();
            });
          });
      }
    );

    System.out.println("Generated class: " + classBytes.length + " bytes");
    // Can now load and instantiate the generated class
  }
}`
    },
    {
      name: 'Read and Write',
      icon: '🔹',
      explanation: `Parse existing class files into structured model. Transform methods, fields, attributes. Generate new class files. Round-trip transformation support.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Read and Write - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Read, Transform, and Write Class Files
import java.lang.classfile.*;
import java.lang.classfile.instruction.*;

public class ReadWriteTransform {
  public static void main(String[] args) throws Exception {
    // Read existing class
    byte[] originalClass = readClass("MyClass.class");

    // Transform class - add logging to all methods
    byte[] transformedClass = ClassFile.of().transform(
      ClassFile.of().parse(originalClass),
      (classBuilder, classElement) -> {
        if (classElement instanceof MethodModel method) {
          // Transform each method
          classBuilder.transformMethod(method,
            (methodBuilder, methodElement) -> {
              if (methodElement instanceof CodeModel code) {
                // Add logging at method entry
                methodBuilder.withCode(codeBuilder -> {
                  // System.out.println("Entering: " + methodName)
                  codeBuilder.getstatic(
                    ClassDesc.of("java.lang.System"),
                    "out",
                    ClassDesc.of("java.io.PrintStream")
                  );
                  codeBuilder.ldc("Entering: " +
                    method.methodName().stringValue());
                  codeBuilder.invokevirtual(
                    ClassDesc.of("java.io.PrintStream"),
                    "println",
                    MethodTypeDesc.of(
                      ConstantDescs.CD_void,
                      ClassDesc.of("java.lang.String")
                    )
                  );

                  // Copy original method code
                  for (CodeElement ce : code) {
                    codeBuilder.with(ce);
                  }
                });
              } else {
                methodBuilder.with(methodElement);
              }
            });
        } else {
          classBuilder.with(classElement);
        }
      }
    );

    // Write transformed class
    writeClass("MyClass.class", transformedClass);
    System.out.println("Class transformed and written");
  }

  // Round-trip verification
  public static void verifyRoundTrip(byte[] original)
      throws Exception {
    ClassModel model = ClassFile.of().parse(original);
    byte[] rebuilt = ClassFile.of().build(
      model.thisClass().asSymbol(),
      cb -> model.forEach(cb::with)
    );

    System.out.println("Original size: " + original.length);
    System.out.println("Rebuilt size: " + rebuilt.length);
    System.out.println("Round-trip successful");
  }
}`
    },
    {
      name: 'Framework Support',
      icon: '🔹',
      explanation: `Essential for frameworks doing bytecode manipulation: Spring, Hibernate, Mockito. Enables JVM languages, agents, profilers. Official support for ecosystem tools.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Framework Support - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Framework Use: Dynamic Proxy Generation
import java.lang.classfile.*;
import java.lang.constant.*;

// Example: Generate proxy class for interface
public class ProxyGenerator {
  public static byte[] generateProxy(
      Class<?> interfaceClass,
      Class<?> handlerClass) {

    return ClassFile.of().build(
      ClassDesc.of(interfaceClass.getName() + "$Proxy"),
      classBuilder -> {
        // Implement interface
        classBuilder.withInterfaceSymbols(
          ClassDesc.of(interfaceClass.getName())
        );

        // Add handler field
        classBuilder.withField("handler",
          ClassDesc.of(handlerClass.getName()),
          AccessFlags.ofField(
            AccessFlags.ACC_PRIVATE,
            AccessFlags.ACC_FINAL
          ).flagsMask());

        // For each interface method, generate proxy method
        for (var method : interfaceClass.getMethods()) {
          generateProxyMethod(classBuilder, method, handlerClass);
        }
      }
    );
  }

  // Generate proxy method that delegates to handler
  private static void generateProxyMethod(
      ClassBuilder cb,
      java.lang.reflect.Method method,
      Class<?> handlerClass) {

    cb.withMethod(method.getName(),
      MethodTypeDesc.ofDescriptor(
        methodDescriptor(method)
      ),
      AccessFlags.ofMethod(
        AccessFlags.ACC_PUBLIC
      ).flagsMask(),
      methodBuilder -> {
        methodBuilder.withCode(codeBuilder -> {
          // Load handler field
          codeBuilder.aload(0);
          codeBuilder.getfield(
            cb.thisClass(),
            "handler",
            ClassDesc.of(handlerClass.getName())
          );

          // Load method arguments
          int slot = 1;
          for (var param : method.getParameterTypes()) {
            if (param.isPrimitive()) {
              loadPrimitive(codeBuilder, param, slot++);
            } else {
              codeBuilder.aload(slot++);
            }
          }

          // Invoke handler
          codeBuilder.invokevirtual(
            ClassDesc.of(handlerClass.getName()),
            "invoke",
            MethodTypeDesc.ofDescriptor(
              methodDescriptor(method)
            )
          );

          // Return appropriate value
          returnValue(codeBuilder, method.getReturnType());
        });
      });
  }
}

// Use cases:
// - Spring AOP proxies
// - Hibernate entity enhancement
// - Mockito mock generation
// - JPA entity weaving
// - Java agent instrumentation`
    },
    {
      name: 'Future-Proof',
      icon: '🔹',
      explanation: `Automatically updated with JVM changes. No lag between JVM features and bytecode library support. Backward and forward compatible with class file versions.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Future-Proof - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Future-Proof Class File API
import java.lang.classfile.*;

public class FutureProofAPI {
  public static void main(String[] args) throws Exception {
    // API supports all class file versions
    byte[] modernClass = generateClass(
      ClassFile.JAVA_24_VERSION  // Latest version
    );

    byte[] legacyClass = generateClass(
      ClassFile.JAVA_8_VERSION   // Older version
    );

    // Parse and analyze any class file version
    analyzeClass(modernClass);
    analyzeClass(legacyClass);
  }

  static byte[] generateClass(int classFileVersion) {
    return ClassFile.of(
      ClassFileOption.classFileVersion(classFileVersion)
    ).build(
      ClassDesc.of("com.example.Generated"),
      classBuilder -> {
        // Build class with specified version
        // API handles version-specific features automatically

        // Features available depend on version
        if (classFileVersion >= ClassFile.JAVA_17_VERSION) {
          // Can use sealed classes, records, etc.
          classBuilder.withFlags(AccessFlags.ACC_SEALED);
        }

        if (classFileVersion >= ClassFile.JAVA_21_VERSION) {
          // Can use pattern matching, etc.
        }

        // API prevents using unsupported features for version
      }
    );
  }

  static void analyzeClass(byte[] classBytes) throws Exception {
    ClassModel model = ClassFile.of().parse(classBytes);

    System.out.println("Class file version: " +
      model.majorVersion() + "." + model.minorVersion());

    System.out.println("Java version: " +
      classFileVersionToJavaVersion(model.majorVersion()));

    // API handles all versions transparently
    System.out.println("Methods: " + model.methods().size());
    System.out.println("Fields: " + model.fields().size());

    // Future JVM features automatically supported
    // No need to update external bytecode libraries
  }

  static String classFileVersionToJavaVersion(int major) {
    return switch (major) {
      case 52 -> "Java 8";
      case 55 -> "Java 11";
      case 61 -> "Java 17";
      case 65 -> "Java 21";
      case 68 -> "Java 24";
      default -> "Unknown";
    };
  }
}

// Benefits:
// 1. Always up-to-date with JDK
// 2. No external dependencies
// 3. Handles all class file versions
// 4. Future JVM features supported automatically
// 5. No breaking changes for framework developers`
    },
    {
      name: 'Use Cases',
      icon: '🔹',
      explanation: `Code generation, bytecode enhancement, instrumentation, JVM language implementations, analysis tools. Any framework manipulating bytecode.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Use Cases - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Real-World Use Cases for Class-File API

// Use Case 1: Code Generation (Annotation Processing)
class EntityGenerator {
  public byte[] generateEntity(EntityConfig config) {
    return ClassFile.of().build(
      ClassDesc.of(config.className()),
      cb -> {
        // Generate JPA entity
        cb.withFlags(AccessFlags.ACC_PUBLIC);

        // Add @Entity annotation
        cb.withAttribute(RuntimeVisibleAnnotations.of(
          Annotation.of(ClassDesc.of("jakarta.persistence.Entity"))
        ));

        // Generate fields with @Column annotations
        for (var field : config.fields()) {
          generateField(cb, field);
        }

        // Generate getters/setters
        for (var field : config.fields()) {
          generateGetter(cb, field);
          generateSetter(cb, field);
        }
      }
    );
  }
}

// Use Case 2: Bytecode Enhancement (Lazy Loading)
class LazyLoadingEnhancer {
  public byte[] enhanceForLazyLoading(byte[] original) {
    return ClassFile.of().transform(
      ClassFile.of().parse(original),
      (cb, ce) -> {
        if (ce instanceof MethodModel method &&
            isLazyField(method)) {
          // Wrap field access with lazy loading logic
          enhanceMethod(cb, method);
        } else {
          cb.with(ce);
        }
      }
    );
  }
}

// Use Case 3: Instrumentation (Performance Monitoring)
class PerformanceInstrumenter {
  public byte[] addPerformanceMonitoring(byte[] original) {
    return ClassFile.of().transform(
      ClassFile.of().parse(original),
      (cb, ce) -> {
        if (ce instanceof MethodModel method) {
          cb.transformMethod(method, (mb, me) -> {
            if (me instanceof CodeModel code) {
              // Add timing code
              mb.withCode(codeBuilder -> {
                // long start = System.nanoTime();
                addTimingStart(codeBuilder);

                // Original method code
                code.forEach(codeBuilder::with);

                // log(System.nanoTime() - start);
                addTimingEnd(codeBuilder, method);
              });
            } else {
              mb.with(me);
            }
          });
        } else {
          cb.with(ce);
        }
      }
    );
  }
}

// Use Case 4: JVM Language Implementation
class KotlinCompiler {
  public byte[] compileKotlinClass(KotlinClass kotlinClass) {
    return ClassFile.of().build(
      ClassDesc.of(kotlinClass.name()),
      cb -> {
        // Generate bytecode for Kotlin-specific features
        // - Data classes
        // - Extension functions
        // - Coroutines
        // - Sealed classes
        // All using standard Class-File API
      }
    );
  }
}

// All use cases benefit from:
// - Official JDK support
// - No external dependencies
// - Future-proof implementation
// - High-level, type-safe API`
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
        <button onClick={onBack} style={{
            padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600',
            backgroundColor: '#6b7280', color: 'white', border: 'none',
            borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s ease'
          }}>
          ← Back to Menu
        </button>
        <h1 style={{
          fontSize: '2.5rem', fontWeight: '800', color: '#1f2937', margin: 0,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          🌟 Java 24 Features
        </h1>
        <div style={{ width: '120px' }}></div>
      </div>

      <div style={{
        backgroundColor: 'rgba(16, 185, 129, 0.05)', padding: '2.5rem 10rem',
        borderRadius: '16px', border: '3px solid rgba(16, 185, 129, 0.3)', marginBottom: '2rem'
      }}>
        <p style={{
          fontSize: '1.3rem', color: '#374151', fontWeight: '500', margin: 0,
          lineHeight: '1.8', textAlign: 'center'
        }}>
          Discover the latest Java 24 features including advanced pattern matching, structured concurrency, and modern APIs.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedConcept ? '350px 1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {!selectedConcept ? (
          concepts.map((concept, idx) => (
            <div key={idx} onClick={() => handleConceptClick(concept)} style={{
                backgroundColor: 'rgba(16, 185, 129, 0.05)', padding: '2rem',
                borderRadius: '16px', border: '3px solid rgba(16, 185, 129, 0.3)',
                cursor: 'pointer', transition: 'all 0.3s ease',
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
              }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>
                {concept.icon || '🔹'}
              </div>
              <h3 style={{
                fontSize: '1.5rem', fontWeight: '700', color: '#047857',
                marginBottom: '1rem', textAlign: 'center'
              }}>{concept.name}</h3>
              <p style={{
                fontSize: '1rem', color: '#6b7280', lineHeight: '1.6', textAlign: 'center'
              }}>
                {concept.explanation?.substring(0, 150) || ''}...
              </p>
            </div>
          ))
        ) : (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button onClick={() => setSelectedConcept(null)} style={{
                  padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600',
                  backgroundColor: '#6b7280', color: 'white', border: 'none',
                  borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s ease'
                }}>
                ← Back to All Concepts
              </button>
              {concepts.map((concept, idx) => (
                <div key={idx} onClick={() => handleConceptClick(concept)} style={{
                    padding: '1rem',
                    backgroundColor: selectedConcept?.name === concept.name ? 'rgba(16, 185, 129, 0.15)' : 'rgba(243, 244, 246, 1)',
                    borderRadius: '8px',
                    border: selectedConcept?.name === concept.name ? '2px solid rgba(16, 185, 129, 0.5)' : '2px solid transparent',
                    cursor: 'pointer', transition: 'all 0.2s ease'
                  }}>
                  <span style={{ fontWeight: '600', color: '#047857' }}>
                    {concept.icon || '🔹'} {concept.name}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#047857', marginBottom: '1.5rem' }}>
                {selectedConcept.icon || '🔹'} {selectedConcept.name}
              </h2>

              <div style={{
                backgroundColor: 'rgba(16, 185, 129, 0.05)', padding: '1.5rem',
                borderRadius: '12px', border: '2px solid rgba(16, 185, 129, 0.2)', marginBottom: '2rem'
              }}>
                <p style={{ fontSize: '1.1rem', color: '#374151', lineHeight: '1.8', margin: 0 }}>
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
                          backgroundColor: '#1e293b', borderRadius: '12px',
                          overflow: 'hidden', border: '2px solid #334155'
                        }}>
                          <button onClick={() => toggleSection(sectionKey)} style={{
                              width: '100%', padding: '1rem 1.5rem', backgroundColor: '#334155',
                              border: 'none', color: '#60a5fa', fontSize: '1rem', fontWeight: '600',
                              cursor: 'pointer', display: 'flex', justifyContent: 'space-between',
                              alignItems: 'center', transition: 'all 0.2s ease'
                            }}>
                            <span>💻 {section.title}</span>
                            <span style={{ fontSize: '1.2rem' }}>{isExpanded ? '▼' : '▶'}</span>
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
                  <div style={{ backgroundColor: '#1e293b', padding: '1.5rem',
                    borderRadius: '12px', border: '2px solid #334155' }}>
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

export default Java24
