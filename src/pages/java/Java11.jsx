import { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

// Normalize indentation by removing common leading whitespace
const normalizeIndentation = (code) => {
  const lines = code.split('\n')
  const nonEmptyLines = lines.filter(line => line.trim().length > 0)
  if (nonEmptyLines.length === 0) return code

  const minIndent = Math.min(...nonEmptyLines.map(line => {
    const match = line.match(/^(\s*)/)
    return match ? match[1].length : 0
  }))

  return lines.map(line => line.substring(minIndent)).join('\n')
}

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
      fontFamily: '"Fira Code", "Consolas", "Monaco", "Courier New", monospace',
      fontSize: '0.9rem',
      lineHeight: '1.7',
      letterSpacing: '0.02em',
      color: '#d4d4d4',
      whiteSpace: 'pre',
      overflowX: 'auto',
      textAlign: 'left',
      padding: '1.25rem',
      tabSize: 4,
      MozTabSize: 4
    }}>
      <code dangerouslySetInnerHTML={{ __html: highlightJava(code) }} />
    </pre>
  )
}

function Java11({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedConcept, setSelectedConcept] = useState(null)

  // Compute extended breadcrumb based on selection state
  const activeBreadcrumb = selectedConcept && selectedCategory ? {
    section: breadcrumb.section,
    category: breadcrumb.category,
    subcategory: {
      name: breadcrumb.topic,
      onClick: () => {
        setSelectedCategory(null)
        setSelectedConcept(null)
      }
    },
    subsubcategory: {
      name: selectedCategory.name,
      onClick: () => setSelectedConcept(null)
    },
    topic: selectedConcept.name,
    colors: breadcrumb.colors
  } : selectedCategory ? {
    section: breadcrumb.section,
    category: breadcrumb.category,
    subcategory: {
      name: breadcrumb.topic,
      onClick: () => setSelectedCategory(null)
    },
    topic: selectedCategory.name,
    colors: breadcrumb.colors
  } : breadcrumb

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

    // Combine small sections (< 3 meaningful lines)
    const meaningfulSections = []
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i]
      const codeLines = section.code.trim().split('\n').filter(line => {
        const trimmed = line.trim()
        return trimmed && !trimmed.startsWith('//') && trimmed !== ''
      })

      if (codeLines.length < 3 && i < sections.length - 1) {
        // Combine with next section
        sections[i + 1].title = `${section.title} & ${sections[i + 1].title}`
        sections[i + 1].code = `${section.code}\n\n${sections[i + 1].code}`
      } else {
        meaningfulSections.push(section)
      }
    }

    return meaningfulSections
  }

  const handleConceptClick = (concept) => {
    setSelectedConcept(concept)
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        // Close modal entirely - both concept and category
        if (selectedConcept || selectedCategory) {
          setSelectedConcept(null)
          setSelectedCategory(null)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedConcept, selectedCategory])

  // Category groupings for better organization
  const categories = [
    {
      id: 'var-inference',
      name: 'Local Variable Type Inference',
      icon: '🔹',
      color: '#8b5cf6',
      description: 'Enhanced var keyword for local variable type inference and lambda parameters',
      conceptIds: [0, 1, 2, 3] // var Keyword, Lambda Parameters, Best Practices, Limitations
    },
    {
      id: 'http-client',
      name: 'HTTP Client API',
      icon: '🌐',
      color: '#3b82f6',
      description: 'Modern HTTP/2 client with async operations and WebSocket support',
      conceptIds: [4, 5, 6, 7] // Modern HTTP/2, Async Operations, WebSocket Support, Request/Response
    },
    {
      id: 'string-methods',
      name: 'String Enhancements',
      icon: '📝',
      color: '#10b981',
      description: 'New String methods for modern text processing and manipulation',
      conceptIds: [8, 9, 10, 11] // isBlank() & strip(), lines() Stream, repeat(), Unicode Support
    },
    {
      id: 'jfr',
      name: 'Java Flight Recorder',
      icon: '✈️',
      color: '#f59e0b',
      description: 'Production-ready profiling with low overhead for performance monitoring',
      conceptIds: [12, 13, 14, 15] // Low-Overhead Profiling, Event Recording, JFR Analysis, Production Ready
    },
    {
      id: 'files-api',
      name: 'Files API Enhancements',
      icon: '📁',
      color: '#ec4899',
      description: 'Simplified file operations with new convenience methods',
      conceptIds: [16, 17, 18, 19] // readString() & writeString(), Path Operations, Unicode Support, Performance
    },
    {
      id: 'collections',
      name: 'Collection & Optional',
      icon: '📦',
      color: '#ef4444',
      description: 'Enhanced collections API and Optional improvements',
      conceptIds: [20, 21, 22, 23] // toArray() Enhancement, Immutable Collections, Predicate Methods, Optional Enhancement
    },
    {
      id: 'performance',
      name: 'Performance & Reflection',
      icon: '⚡',
      color: '#f97316',
      description: 'Performance improvements and reflection API enhancements',
      conceptIds: [24, 25, 26] // Reflection API, Performance, Security
    },
    {
      id: 'gc',
      name: 'Garbage Collection',
      icon: '🗑️',
      color: '#6366f1',
      description: 'Z Garbage Collector and GC interface improvements',
      conceptIds: [27, 28] // ZGC Improvements, GC Interface
    }
  ]

  const concepts = [
    {
      name: 'var Keyword',
      icon: '🔹',
      explanation: `**Core Concept:**
• Local variable type inference introduced in Java 10 and enhanced in Java 11
• Compiler automatically infers type from the initializer expression
• Reduces boilerplate code while maintaining strong static typing
• Makes code more readable, especially with complex generic types

**Where var Works:**
• Local Variables - Inside methods for variable declarations
• For-Loops - Enhanced for-loops and traditional for-loops
• Try-with-Resources - Resource declarations in try statements
• Lambda Parameters - New in Java 11 for lambda expressions

**Type Inference:**
• Type determined at compile time from right-hand side
• Still statically typed - NOT dynamic typing
• Cannot change type after declaration
• Full IDE support with autocomplete and refactoring

**Key Benefits:**
• Readability - Less visual clutter with long generic type names
• Maintainability - Changes to implementation types don't require updating declarations
• Less Boilerplate - Eliminates redundant type information
• Focus on Intent - Variable name becomes more important than type

**Restrictions:**
• Cannot use without initializer - var x; is invalid
• Cannot use for null - var x = null; is invalid
• Cannot use for lambda without explicit types
• Cannot use for method return types or fields
• Cannot use in multi-variable declarations`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ var Keyword - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Basic var usage - type inference
var message = "Hello Java 11";  // Inferred as String
var count = 100;                // Inferred as int
var price = 19.99;              // Inferred as double

// Works great with complex generic types
var list = new ArrayList<String>();
var map = new HashMap<String, List<Integer>>();

// For-loop usage
var numbers = List.of(1, 2, 3, 4, 5);
for (var num : numbers) {
    System.out.println(num);
}

// Try-with-resources
try (var reader = new BufferedReader(new FileReader("file.txt"))) {
    var line = reader.readLine();
    System.out.println(line);
} catch (IOException e) {
    e.printStackTrace();
}

// Diamond operator works well with var
var students = new ArrayList<>();  // Inferred as ArrayList<Object>
students.add("Alice");

// Output:
// 1
// 2
// 3
// 4
// 5
// (file content)`
    },
    {
      name: 'Lambda Parameters',
      icon: '🔹',
      explanation: `**Core Concept:**
• Java 11 extended var to work with lambda expression parameters
• Enables annotations on inferred parameter types in lambdas
• Provides consistency between var usage in methods and lambdas
• Maintains full type safety and inference

**Why var in Lambdas:**
• Annotation Support - Main reason for this feature
• Consistency - Same var syntax across all local variables
• Type Modifiers - Can apply annotations like @NonNull, @Nullable
• Uniformity - Consistent code style throughout application

**Syntax Rules:**
• Must use var for ALL parameters or NONE - no mixing
• (var x, var y) -> x + y ✓ Valid
• (var x, y) -> x + y ✗ Invalid (mixing)
• (x, y) -> x + y ✓ Valid (implicit types)
• Can combine var with annotations - (@NonNull var x) -> x

**Use Cases:**
• Adding parameter annotations for validation
• Nullability checking with @Nullable/@NonNull
• Framework-specific annotations
• Consistency in codebases using var extensively

**Comparison with Traditional Lambda:**
• Without var: (s1, s2) -> s1 + s2 (implicit types)
• With var: (var s1, var s2) -> s1 + s2 (explicit var, still inferred)
• With annotations: (@NonNull var s1, var s2) -> s1 + s2

**Benefits:**
• Enables static analysis tools to check parameters
• Clearer null-safety contracts
• Better IDE warnings and error detection
• Consistent with regular local variable declarations`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Lambda Parameters - Implementation
// ═══════════════════════════════════════════════════════════════════════════

import java.util.*;
import java.util.function.*;

// Java 11: var in lambda parameters
BiFunction<String, String, String> concat = (var s1, var s2) -> s1 + s2;
System.out.println(concat.apply("Hello ", "World"));

// Use case: Annotations on lambda parameters
List<String> names = List.of("Alice", "Bob", "Charlie");
names.stream()
  .map((@NonNull var name) -> name.toUpperCase())
  .forEach(System.out::println);

// Consistent with regular var usage
Consumer<String> printer = (var text) -> {
  var uppercased = text.toUpperCase();
  System.out.println(uppercased);
};
printer.accept("java 11");

// Multiple parameters with var
BiPredicate<String, Integer> checker = (var str, var len) ->
  str.length() > len;
System.out.println(checker.test("Hello", 3));

// Note: Either all parameters use var or none
// Valid: (var x, var y) -> x + y
// Invalid: (var x, y) -> x + y

// Output:
// Hello World
// ALICE
// BOB
// CHARLIE
// JAVA 11
// true`
    },
    {
      name: 'Best Practices',
      icon: '🔹',
      explanation: `**Core Principle:**
• Use var when type is obvious from right-hand side expression
• Improves readability by reducing visual clutter
• Focus on clear, descriptive variable names
• Balance between brevity and clarity

**When to Use var:**
• Complex Generic Types - Map<String, List<Customer>> becomes much more readable
• Constructor Calls - Type already visible on right side (new ArrayList<>())
• Factory Methods - Type clear from method name (getUserList(), createConnection())
• Builder Patterns - Long builder chains benefit from var
• For-Loops - Especially with complex collection types

**When to Avoid var:**
• Unclear Types - var result = process() (what type is result?)
• Primitive Promotions - var x = 1 (int not Integer - might matter)
• Numeric Literals - Be explicit about int vs long vs double
• Method Returns - If return type isn't obvious from method name
• Public APIs - Keep explicit types for better documentation

**Naming Becomes Critical:**
• Good: var customerList = getCustomers()
• Bad: var data = get()
• Good: var activeUserMap = filterActiveUsers(users)
• Bad: var result = filter(data)

**Code Readability Examples:**
• Before: Map<String, List<Map<String, Object>>> complexData = ...
• After: var complexData = new HashMap<String, List<Map<String, Object>>>()
• Improvement: Eliminates redundant left-side type declaration

**Team Guidelines:**
• Establish consistent var usage patterns
• Use in same contexts across codebase
• Document when to use vs avoid
• Consider code review discussions`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Best Practices - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// GOOD: Type is clear from right side
var customer = new Customer("John");
var totalPrice = calculatePrice(items);
var userList = getUsersFromDatabase();

// BAD: Type not obvious
var result = process();  // What type is result?
var data = get();        // What is data?

// GOOD: With meaningful names
var employeeSalaryMap = new HashMap<String, Double>();
var activeUserList = filterActiveUsers(allUsers);

// GOOD: Complex generics become readable
// Before Java 10:
Map<String, List<Map<String, Object>>> complexMap =
  new HashMap<String, List<Map<String, Object>>>();

// With var:
var complexMap = new HashMap<String, List<Map<String, Object>>>();

// GOOD: Fluent APIs
var stream = list.stream()
  .filter(x -> x > 10)
  .map(x -> x * 2);

// AVOID: Losing important type information
var value = 10;  // Is it int, long, or Integer?
// Better: int value = 10;

// AVOID: With literals that might be ambiguous
var amount = 100;     // int
var amount = 100L;    // long - needs suffix
var price = 10.0;     // double
var price = 10.0f;    // float - needs suffix

System.out.println("Best practices demonstrated");

// Output:
// Best practices demonstrated`
    },
    {
      name: 'Limitations',
      icon: '🔹',
      explanation: `**Core Restrictions:**
• var is ONLY for local variables - not fields, parameters, or return types
• Requires initialization at declaration - cannot defer initialization
• Cannot initialize to null without a cast
• Must have clear, unambiguous type that compiler can infer

**Cannot Use For:**
• Class Fields - var field = 0; ✗ Compile error
• Method Parameters - void method(var param) ✗ Not allowed
• Method Return Types - var method() ✗ Not allowed
• Constructor Parameters - Constructor(var param) ✗ Not allowed
• Exception Catches - catch (var e) ✗ Must specify exception type

**Initialization Requirements:**
• Must Initialize Immediately - var x; ✗ Error
• Cannot Be Null - var x = null; ✗ Cannot infer type
• Need Type Context - var lambda = x -> x * 2; ✗ No target type
• Array Initializers - var arr = {1, 2, 3}; ✗ Must use new int[]

**Workarounds:**
• Null with Cast - var x = (String) null; ✓ Type is String
• Lambda with Type - Function<Integer, Integer> f = x -> x * 2; ✓
• Ternary with Common Type - var x = condition ? "yes" : "no"; ✓

**Why These Limitations:**
• Type Inference Scope - Compiler needs local context
• API Clarity - Public APIs should have explicit types
• Backward Compatibility - Cannot change existing method signatures
• Prevents Ambiguity - Ensures clear type resolution

**Common Mistakes:**
• Trying to use var at class level
• Declaring var without immediate initialization
• Using var for method signatures thinking it's like generics
• Expecting dynamic typing behavior (var is still static!)`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Limitations - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// VALID: Local variable with initialization
public class VarDemo {
    public void method() {
        var name = "John";  // OK
    }
}

// INVALID: Cannot use for fields
public class Example {
    // var count = 0;  // Compile error!
    private int count = 0;  // Must specify type
}

// INVALID: Cannot use for method parameters
// public void process(var data) { }  // Compile error!
public class ParamDemo {
    public void process(String data) { }  // Must specify type
}

// INVALID: Cannot use for return types
// public var getData() { }  // Compile error!
public class ReturnDemo {
    public String getData() { return "data"; }
}

// INVALID: Must initialize
public class InitDemo {
    public void test() {
        // var x;  // Compile error!
        var x = 10;  // OK
    }
}

// INVALID: Cannot initialize to null
public class NullDemo {
    public void nullTest() {
        // var value = null;  // Compile error!
        String value = null;  // OK with explicit type
    }
}

// INVALID: Array initializer needs explicit type
// var array = {1, 2, 3};  // Compile error!
var array = new int[]{1, 2, 3};  // OK

// VALID: var with null cast
var nullValue = (String) null;  // OK - type is String

// INVALID: Lambda without context
// var lambda = x -> x * 2;  // Compile error!
Function<Integer, Integer> lambda = x -> x * 2;  // OK

System.out.println("var limitations demonstrated");

// Output:
// var limitations demonstrated`
    },
    {
      name: 'Modern HTTP/2',
      icon: '🔹',
      explanation: `**Core Concept:**
• Native HTTP/2 client introduced in Java 11 as standard API
• Replaces legacy HttpURLConnection with modern, fluent API
• Full HTTP/2 protocol support with multiplexing and performance optimizations
• Builder pattern for request and client configuration

**HTTP/2 Features:**
• Multiplexing - Multiple requests over single TCP connection
• Server Push - Server can proactively send resources
• Header Compression - Reduces overhead with HPACK compression
• Stream Prioritization - Control resource loading priority
• Binary Protocol - More efficient than HTTP/1.1 text protocol

**Key Advantages:**
• Better Performance - Faster page loads with multiplexing
• Lower Latency - Single connection reduces overhead
• Resource Efficiency - Connection pooling and reuse
• Modern API - Fluent, immutable builder pattern
• Type Safety - Strongly typed request/response handling

**HttpClient Features:**
• Connection Pooling - Automatic connection management
• Redirect Handling - Configurable redirect policies (ALWAYS, NORMAL, NEVER)
• Cookie Management - Built-in cookie handler support
• Authentication - Authenticator support for credentials
• Proxy Support - HTTP and SOCKS proxy configuration

**Compared to HttpURLConnection:**
• Cleaner API - Builder pattern vs setter methods
• HTTP/2 Support - Native vs requires external library
• Async Support - Built-in CompletableFuture integration
• Better Defaults - Sensible configuration out of the box
• Thread Safe - Immutable requests, reusable client

**Configuration Options:**
• HTTP Version - HTTP/1.1, HTTP/2, or automatic
• Timeouts - Connection and request timeouts
• SSL/TLS - Custom SSL context and parameters
• Executor - Custom executor for async operations`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Modern HTTP/2 - Implementation
// ═══════════════════════════════════════════════════════════════════════════

import java.net.http.*;
import java.net.*;

// Create HTTP Client with HTTP/2 support
HttpClient client = HttpClient.newBuilder()
  .version(HttpClient.Version.HTTP_2)
  .followRedirects(HttpClient.Redirect.NORMAL)
  .build();

// Simple GET request
HttpRequest request = HttpRequest.newBuilder()
  .uri(URI.create("https://api.example.com/users"))
  .GET()
  .build();

HttpResponse<String> response = client.send(request,
  HttpResponse.BodyHandlers.ofString());

System.out.println("Status: " + response.statusCode());
System.out.println("Body: " + response.body());

// POST request with JSON
String json = "{\\"name\\":\\"John\\",\\"age\\":30}";
HttpRequest postRequest = HttpRequest.newBuilder()
  .uri(URI.create("https://api.example.com/users"))
  .header("Content-Type", "application/json")
  .POST(HttpRequest.BodyPublishers.ofString(json))
  .build();

HttpResponse<String> postResponse = client.send(postRequest,
  HttpResponse.BodyHandlers.ofString());
System.out.println("Created: " + postResponse.statusCode());

// HTTP/2 benefits: multiplexing multiple requests
// automatically uses same connection

// Output:
// Status: 200
// Body: [{"id":1,"name":"Alice"},{"id":2,"name":"Bob"}]
// Created: 201`
    },
    {
      name: 'Async Operations',
      icon: '🔹',
      explanation: `**Core Concept:**
• Built-in asynchronous HTTP operations using CompletableFuture
• Non-blocking I/O for better resource utilization and scalability
• Both sync (send) and async (sendAsync) methods available
• Seamless integration with reactive programming patterns

**Synchronous vs Asynchronous:**
• send() - Blocks current thread until response received
• sendAsync() - Returns CompletableFuture<HttpResponse<T>> immediately
• Choose sync for simple scripts, async for high-performance applications
• Async enables parallel requests without blocking threads

**CompletableFuture Integration:**
• sendAsync() returns CompletableFuture for composition
• Chain operations with thenApply(), thenAccept(), thenCompose()
• Combine multiple requests with allOf(), anyOf()
• Full async programming capabilities

**Timeout Control:**
• Connection Timeout - On HttpClient for initial connection
• Request Timeout - On HttpRequest for entire request/response cycle
• Fine-grained control prevents hanging requests
• Configurable per-request or client-wide

**Performance Benefits:**
• Non-Blocking - Thread not blocked waiting for response
• Resource Efficient - Handle many concurrent requests with few threads
• Scalability - Better throughput in high-concurrency scenarios
• Parallel Requests - Execute multiple requests simultaneously

**Use Cases:**
• High-volume API clients
• Microservice communication
• Parallel data fetching from multiple endpoints
• Responsive UI applications (avoid blocking main thread)
• Event-driven architectures

**Best Practices:**
• Use async for I/O-bound operations
• Set appropriate timeouts to prevent resource leaks
• Handle errors with exceptionally() or handle()
• Consider custom Executor for fine control`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Async Operations - Implementation
// ═══════════════════════════════════════════════════════════════════════════

import java.net.http.*;
import java.net.*;
import java.time.Duration;
import java.util.concurrent.*;

HttpClient client = HttpClient.newBuilder()
  .connectTimeout(Duration.ofSeconds(10))
  .build();

// Asynchronous GET request
HttpRequest request = HttpRequest.newBuilder()
  .uri(URI.create("https://api.example.com/data"))
  .timeout(Duration.ofSeconds(30))
  .GET()
  .build();

// Send async - returns CompletableFuture
CompletableFuture<HttpResponse<String>> futureResponse =
  client.sendAsync(request, HttpResponse.BodyHandlers.ofString());

// Non-blocking: continue with other work
System.out.println("Request sent, doing other work...");

// Process response when available
futureResponse.thenApply(HttpResponse::body)
  .thenAccept(body -> System.out.println("Response: " + body))
  .join();  // Wait for completion

// Multiple parallel requests
CompletableFuture<String> future1 = client
  .sendAsync(HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/users"))
    .build(), HttpResponse.BodyHandlers.ofString())
  .thenApply(HttpResponse::body);

CompletableFuture<String> future2 = client
  .sendAsync(HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/posts"))
    .build(), HttpResponse.BodyHandlers.ofString())
  .thenApply(HttpResponse::body);

// Wait for all to complete
CompletableFuture.allOf(future1, future2).join();
System.out.println("All requests completed");

// Output:
// Request sent, doing other work...
// Response: {"status":"ok","data":[...]}
// All requests completed`
    },
    {
      name: 'WebSocket Support',
      icon: '🔹',
      explanation: `**Core Concept:**
• Native WebSocket client implementation introduced in Java 11
• Full-duplex bidirectional communication over single TCP connection
• Event-driven API with listener callbacks for lifecycle management
• Supports both text and binary message types

**Key Features:**
• Bidirectional Communication - Client and server can both send messages
• Real-Time Updates - Push notifications from server to client
• Low Latency - Persistent connection eliminates HTTP overhead
• Efficient Protocol - Minimal framing overhead for messages
• Standardized - Follows WebSocket protocol RFC 6455

**WebSocket.Listener Interface:**
• onOpen() - Called when connection established
• onText() - Receive text messages
• onBinary() - Receive binary messages
• onPing() / onPong() - Handle ping/pong frames for keep-alive
• onClose() - Connection closed gracefully
• onError() - Handle errors and connection failures

**Message Flow Control:**
• Demand-based system - request(n) to receive n messages
• Prevents overwhelming receiver with too many messages
• Backpressure support for flow control
• Manual control over message processing rate

**Use Cases:**
• Real-time chat applications
• Live data feeds (stock prices, sports scores)
• Collaborative editing tools
• Gaming with real-time interaction
• IoT device communication
• Server push notifications

**Lifecycle Management:**
• Automatic connection setup with buildAsync()
• Graceful shutdown with sendClose()
• Error handling with onError callback
• Reconnection strategies can be implemented

**Message Types:**
• Text Messages - UTF-8 encoded strings
• Binary Messages - Raw byte data (ByteBuffer)
• Control Frames - Ping, Pong, Close
• Fragmented Messages - Large messages split across frames`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ WebSocket Support - Implementation
// ═══════════════════════════════════════════════════════════════════════════

import java.net.http.*;
import java.net.*;
import java.util.concurrent.*;

// WebSocket listener
WebSocket.Listener listener = new WebSocket.Listener() {
  @Override
  public void onOpen(WebSocket webSocket) {
    System.out.println("WebSocket opened");
    webSocket.request(1);  // Request one message
  }

  @Override
  public CompletionStage<?> onText(WebSocket webSocket,
                                    CharSequence data,
                                    boolean last) {
    System.out.println("Received: " + data);
    webSocket.request(1);  // Request next message
    return null;
  }

  @Override
  public CompletionStage<?> onClose(WebSocket webSocket,
                                     int statusCode,
                                     String reason) {
    System.out.println("Closed: " + reason);
    return null;
  }

  @Override
  public void onError(WebSocket webSocket, Throwable error) {
    System.out.println("Error: " + error.getMessage());
  }
};

// Create WebSocket connection
HttpClient client = HttpClient.newHttpClient();
CompletableFuture<WebSocket> ws = client.newWebSocketBuilder()
  .buildAsync(URI.create("ws://echo.websocket.org"), listener);

WebSocket webSocket = ws.join();

// Send messages
webSocket.sendText("Hello WebSocket", true);
webSocket.sendText("Java 11 WebSocket", true);

// Send ping
webSocket.sendPing(java.nio.ByteBuffer.wrap("ping".getBytes()));

Thread.sleep(2000);  // Wait for responses

webSocket.sendClose(WebSocket.NORMAL_CLOSURE, "Goodbye");

// Output:
// WebSocket opened
// Received: Hello WebSocket
// Received: Java 11 WebSocket`
    },
    {
      name: 'Request/Response',
      icon: '🔹',
      explanation: `**Core Concept:**
• Fluent builder pattern for constructing HTTP requests
• Immutable request and response objects for thread safety
• Flexible body handling with pre-built and custom handlers
• Rich metadata access for headers, status codes, and more

**Request Building:**
• HttpRequest.newBuilder() - Start building request
• uri(URI) - Set request URI
• Method Shortcuts - GET(), POST(), PUT(), DELETE(), PATCH()
• method(String, BodyPublisher) - Generic method specification
• Immutable - Cannot modify after building

**Request Headers:**
• header(name, value) - Add single header
• headers(name1, value1, name2, value2, ...) - Add multiple headers
• setHeader(name, value) - Replace existing header
• Common headers: Content-Type, Authorization, Accept, User-Agent
• Case-insensitive header names

**Request Bodies (BodyPublishers):**
• ofString(String) - Send string data
• ofFile(Path) - Send file contents
• ofByteArray(byte[]) - Send binary data
• ofInputStream(Supplier<InputStream>) - Send stream data
• noBody() - For GET/DELETE requests
• Custom - Implement your own BodyPublisher

**Response Bodies (BodyHandlers):**
• ofString() - Response as String
• ofFile(Path) - Save directly to file
• ofByteArray() - Response as byte[]
• ofInputStream() - Response as InputStream
• ofLines() - Response as Stream<String> (line by line)
• discarding() - Discard response body
• Custom - Process response your way

**Response Metadata:**
• statusCode() - HTTP status code (200, 404, etc.)
• headers() - Access response headers
• uri() - Final URI (after redirects)
• version() - HTTP version used
• body() - Processed response body

**Authentication & Cookies:**
• Authenticator - Handle authentication challenges
• CookieHandler - Manage cookies automatically
• Built-in support for Basic and Digest authentication
• Custom authentication schemes supported`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Request/Response - Implementation
// ═══════════════════════════════════════════════════════════════════════════

import java.net.http.*;
import java.net.*;
import java.nio.file.*;

HttpClient client = HttpClient.newHttpClient();

// Request with custom headers
HttpRequest request = HttpRequest.newBuilder()
  .uri(URI.create("https://api.example.com/data"))
  .header("Authorization", "Bearer token123")
  .header("Accept", "application/json")
  .header("User-Agent", "Java11-HttpClient")
  .GET()
  .build();

// Response as String
HttpResponse<String> stringResponse = client.send(request,
  HttpResponse.BodyHandlers.ofString());
System.out.println("String body: " + stringResponse.body());

// Response to File
HttpResponse<Path> fileResponse = client.send(request,
  HttpResponse.BodyHandlers.ofFile(Paths.get("response.json")));
System.out.println("Saved to: " + fileResponse.body());

// Response as Stream
HttpResponse<InputStream> streamResponse = client.send(request,
  HttpResponse.BodyHandlers.ofInputStream());
try (InputStream is = streamResponse.body()) {
  // Process stream
}

// PUT request with file upload
Path filePath = Paths.get("data.txt");
HttpRequest putRequest = HttpRequest.newBuilder()
  .uri(URI.create("https://api.example.com/upload"))
  .header("Content-Type", "text/plain")
  .PUT(HttpRequest.BodyPublishers.ofFile(filePath))
  .build();

HttpResponse<Void> voidResponse = client.send(putRequest,
  HttpResponse.BodyHandlers.discarding());
System.out.println("Upload status: " + voidResponse.statusCode());

// DELETE request
HttpRequest deleteRequest = HttpRequest.newBuilder()
  .uri(URI.create("https://api.example.com/users/123"))
  .DELETE()
  .build();

HttpResponse<String> deleteResponse = client.send(deleteRequest,
  HttpResponse.BodyHandlers.ofString());

// Access response headers
deleteResponse.headers().map().forEach((k, v) ->
  System.out.println(k + ": " + v));

// Output:
// String body: {"status":"success","data":[...]}
// Saved to: response.json
// Upload status: 200`
    },
    {
      name: 'isBlank() & strip()',
      icon: '🔹',
      explanation: `**Core Concept:**
• New String methods for modern whitespace handling
• isBlank() checks for empty or whitespace-only strings
• strip() methods remove Unicode whitespace (better than trim())
• Essential for text processing and validation

**isBlank() Method:**
• Returns true if string is empty or contains only whitespace
• Checks Unicode whitespace characters (not just ASCII spaces)
• More comprehensive than isEmpty() + trim() combination
• Common use: Input validation and sanitization

**strip() vs trim():**
• strip() - Removes Unicode whitespace (recommended)
• trim() - Removes only ASCII whitespace (legacy)
• Unicode Support - strip() handles all Unicode whitespace characters
• Modern Standard - Use strip() for new code

**Strip Variants:**
• strip() - Remove leading and trailing whitespace
• stripLeading() - Remove only leading whitespace
• stripTrailing() - Remove only trailing whitespace
• Choose based on specific needs

**Unicode Whitespace:**
• Supports all Unicode whitespace characters
• Includes: spaces, tabs, line breaks, non-breaking spaces
• Examples: \\u0020 (space), \\u00A0 (nbsp), \\u2000 (en quad)
• Better internationalization support

**Use Cases:**
• User input validation and cleaning
• Parsing configuration files
• Processing text data
• API request/response handling
• Form submission sanitization

**Comparison:**
• isEmpty() - Length is 0
• isBlank() - Length is 0 OR only whitespace
• "   ".isEmpty() → false
• "   ".isBlank() → true`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ isBlank() & strip() - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// isBlank() - checks for empty or whitespace-only strings
String empty = "";
String spaces = "   ";
String text = "  Hello  ";

System.out.println(empty.isBlank());   // true
System.out.println(spaces.isBlank());  // true
System.out.println(text.isBlank());    // false
System.out.println(empty.isEmpty());   // true
System.out.println(spaces.isEmpty());  // false - has characters

// strip() vs trim() - Unicode whitespace handling
String unicode = "\\u2000\\u2001  Hello World  \\u2002\\u2003";

// trim() only removes ASCII whitespace (\\u0020 and below)
System.out.println("'" + unicode.trim() + "'");
// Output: '  Hello World  ' (Unicode spaces remain!)

// strip() removes ALL Unicode whitespace
System.out.println("'" + unicode.strip() + "'");
// Output: 'Hello World'

// stripLeading() - removes leading whitespace only
String leading = "   Hello World   ";
System.out.println("'" + leading.stripLeading() + "'");
// Output: 'Hello World   '

// stripTrailing() - removes trailing whitespace only
System.out.println("'" + leading.stripTrailing() + "'");
// Output: '   Hello World'

// Practical use case: validation
String input = "   ";
if (input.isBlank()) {
  System.out.println("Input cannot be blank!");
}

// Output:
// true
// true
// false
// true
// false
// Input cannot be blank!`
    },
    {
      name: 'lines() Stream',
      icon: '🔹',
      explanation: `**Core Concept:**
• lines() returns Stream<String> of individual lines from multi-line string
• Splits on line terminators (\\n, \\r, \\r\\n)
• Enables functional stream processing of text
• Lazy evaluation for memory efficiency

**How It Works:**
• Splits string on line terminators
• Returns Stream<String> with each line
• Line terminators not included in result
• Handles different line ending styles (Unix, Windows, Mac)

**Supported Line Terminators:**
• \\n - Unix/Linux line feed
• \\r - Old Mac carriage return
• \\r\\n - Windows CRLF
• Mixed terminators handled correctly

**Stream Operations:**
• filter() - Select specific lines
• map() - Transform each line
• collect() - Gather results
• forEach() - Process each line
• count() - Count lines
• All Stream API operations available

**Benefits:**
• Functional Style - Declarative text processing
• Memory Efficient - Lazy stream evaluation
• Composable - Chain multiple operations
• Clean Code - Eliminates manual line splitting
• Type Safe - Works with Stream API

**Use Cases:**
• Processing log files
• Parsing CSV and text files
• Analyzing multi-line input
• Configuration file parsing
• Text report generation
• Line-by-line transformations

**Comparison:**
• Old: String[] lines = text.split("\\\\r?\\\\n")
• New: Stream<String> lines = text.lines()
• Benefit: Lazy evaluation, functional operations`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ lines() Stream - Implementation
// ═══════════════════════════════════════════════════════════════════════════

import java.util.stream.*;

// Multi-line string processing
String multiline = """
    First line
    Second line
    Third line
    Fourth line
    """;

// Get stream of lines
Stream<String> lines = multiline.lines();

// Count non-blank lines
long count = multiline.lines()
  .filter(line -> !line.isBlank())
  .count();
System.out.println("Non-blank lines: " + count);

// Process each line
multiline.lines()
  .map(String::strip)
  .filter(line -> !line.isEmpty())
  .forEach(line -> System.out.println("- " + line));

// Collect to list
var lineList = multiline.lines()
  .filter(line -> !line.isBlank())
  .collect(Collectors.toList());
System.out.println("Lines collected: " + lineList.size());

// Line numbers with prefix
var numberedLines = multiline.lines()
  .filter(line -> !line.isBlank())
  .map(String::strip)
  .collect(Collectors.toList());

for (int i = 0; i < numberedLines.size(); i++) {
  System.out.println((i + 1) + ". " + numberedLines.get(i));
}

// Find specific lines
boolean hasSecond = multiline.lines()
  .anyMatch(line -> line.contains("Second"));
System.out.println("Contains 'Second': " + hasSecond);

// Output:
// Non-blank lines: 4
// - First line
// - Second line
// - Third line
// - Fourth line
// Lines collected: 4
// 1. First line
// 2. Second line
// 3. Third line
// 4. Fourth line
// Contains 'Second': true`
    },
    {
      name: 'repeat()',
      icon: '🔹',
      explanation: `**Core Concept:**
• repeat(int count) concatenates string multiple times
• Returns new string with original repeated count times
• Efficient native implementation (no manual loops needed)
• Useful for formatting, padding, and text generation

**How It Works:**
• Takes integer count parameter
• Returns string repeated count times
• Optimized implementation using native code
• More efficient than manual StringBuilder loops

**Use Cases:**
• Padding and Alignment - Create spaces or fill characters
• Drawing - Create text-based boxes, lines, borders
• Formatting - Generate repeated separators or delimiters
• Progress Bars - Create visual indicators with repeated characters
• Testing - Generate test data with repeated patterns

**Common Patterns:**
• " ".repeat(n) - Create n spaces for indentation
• "-".repeat(n) - Create horizontal lines
• "*".repeat(n) - Create visual separators
• "\\n".repeat(n) - Create multiple blank lines
• Any string can be repeated

**Performance:**
• Native implementation is optimized
• Better than manual StringBuilder approach
• O(n) complexity where n is result length
• Memory efficient for reasonable counts

**Edge Cases:**
• count = 0 returns empty string ""
• count = 1 returns original string (may be same instance)
• count < 0 throws IllegalArgumentException
• Very large counts may cause OutOfMemoryError

**Comparison:**
• Old: new String(new char[n]).replace("\\\\0", str)
• Old: StringBuilder with loop
• New: str.repeat(n)
• Much cleaner and more readable`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ repeat() - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Basic repeat usage
String star = "*";
System.out.println(star.repeat(10));

// Creating separators
String separator = "=".repeat(50);
System.out.println(separator);
System.out.println("Title");
System.out.println(separator);

// Indentation
int indentLevel = 3;
String indent = "  ".repeat(indentLevel);
System.out.println(indent + "Indented text");

// Creating patterns
String pattern = "+-".repeat(10);
System.out.println(pattern);

// ASCII art
String space = " ".repeat(5);
String hash = "#".repeat(10);
System.out.println(space + hash);
System.out.println(space + hash);

// Progress bar simulation
for (int i = 0; i <= 10; i++) {
  String filled = "█".repeat(i);
  String empty = "░".repeat(10 - i);
  System.out.print("\\r[" + filled + empty + "] " + (i * 10) + "%");
  try { Thread.sleep(200); } catch (Exception e) {}
}
System.out.println();

// Before Java 11 (verbose):
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 5; i++) {
  sb.append("Java");
}
System.out.println(sb.toString());

// Java 11 (concise):
System.out.println("Java".repeat(5));

// Output:
// **********
// ==================================================
// Title
// ==================================================
//       Indented text
// +-+-+-+-+-+-+-+-+-+-
//      ##########
//      ##########
// [██████████] 100%
// JavaJavaJavaJavaJava
// JavaJavaJavaJavaJava`
    },
    {
      name: 'Unicode Support',
      icon: '🔹',
      explanation: `**Core Concept:**
• Enhanced Unicode support across all new String methods
• Better handling of Unicode whitespace characters
• Proper support for surrogate pairs and multi-byte characters
• Improved internationalization capabilities

**Unicode Whitespace:**
• strip() methods handle all Unicode whitespace, not just ASCII
• Character.isWhitespace() defines what counts as whitespace
• Includes: spaces, tabs, line breaks, non-breaking spaces, etc.
• Examples: U+0020 (space), U+00A0 (nbsp), U+2000-U+200B (various spaces)

**Comparison with ASCII Methods:**
• strip() vs trim() - Unicode vs ASCII whitespace only
• isBlank() checks Unicode whitespace
• lines() handles different line terminators (\\n, \\r, \\r\\n)
• More robust for international text

**Surrogate Pairs:**
• Proper handling of characters outside Basic Multilingual Plane
• Emoji and special characters work correctly
• Code point counting vs char counting distinction
• length() counts chars, codePointCount() counts actual characters

**International Text Processing:**
• Works correctly with all scripts (Latin, Cyrillic, Arabic, CJK, etc.)
• Right-to-left text supported
• Combining characters handled properly
• Normalization for comparison

**Benefits:**
• Global Application Support - Works worldwide, not just English
• Modern Text Processing - Handles emoji and special characters
• Consistent Behavior - Same results across different locales
• Standards Compliant - Follows Unicode specifications

**Use Cases:**
• International applications
• Processing user-generated content with emoji
• Multilingual text processing
• Configuration files with international characters
• Global data parsing

**Example Characters:**
• Japanese: こんにちは (Hello)
• Arabic: مرحبا (Hello)
• Emoji: 👋 🌍 ❤️
• Math symbols: ∑ ∫ √
• All work correctly with new String methods`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Unicode Support - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Unicode whitespace characters
String unicodeSpaces = "\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005";
System.out.println("Has Unicode spaces: " + !unicodeSpaces.isBlank());
System.out.println("After strip: '" + unicodeSpaces.strip() + "'");

// Unicode text processing
String japanese = "こんにちは世界";  // Hello World in Japanese
String arabic = "مرحبا بالعالم";     // Hello World in Arabic
String emoji = "Hello 👋 World 🌍";

System.out.println("Japanese length: " + japanese.length());
System.out.println("Arabic is blank: " + arabic.isBlank());
System.out.println("Emoji text: " + emoji);

// Strip works with all Unicode whitespace
String mixed = "\\u00A0Hello\\u1680World\\u2000Test\\u3000";
System.out.println("Mixed Unicode spaces stripped: '"
  + mixed.strip() + "'");

// Lines with Unicode
String multiLang = """
    English: Hello
    Spanish: Hola
    French: Bonjour
    German: Hallo
    Japanese: こんにちは
    """;

multiLang.lines()
  .filter(line -> !line.isBlank())
  .map(String::strip)
  .forEach(System.out::println);

// Repeat with Unicode
String heart = "❤️";
System.out.println(heart.repeat(5));

// Character counts (including emojis)
String emojiText = "Hi 😀";
System.out.println("Emoji text length: " + emojiText.length());
System.out.println("Code point count: "
  + emojiText.codePointCount(0, emojiText.length()));

// Output:
// Has Unicode spaces: false
// After strip: ''
// Japanese length: 7
// Arabic is blank: false
// Emoji text: Hello 👋 World 🌍
// Mixed Unicode spaces stripped: 'HelloWorldTest'
// English: Hello
// Spanish: Hola
// French: Bonjour
// German: Hallo
// Japanese: こんにちは
// ❤️❤️❤️❤️❤️`
    },
    {
      name: 'Low-Overhead Profiling',
      icon: '🔹',
      explanation: `**Core Concept:**
• Java Flight Recorder (JFR) is production-grade profiling tool
• Minimal performance impact - typically <1% overhead
• Continuously collects diagnostic and profiling data
• Integrated directly into JVM for optimal efficiency

**Key Features:**
• Low Overhead - Can run continuously in production
• Always-On Monitoring - Minimal impact allows constant recording
• Comprehensive Data - CPU, memory, I/O, threading, GC, exceptions
• Circular Buffer - Keeps most recent data, configurable retention
• Event-Based - Records specific events as they occur

**Performance Impact:**
• <1% CPU overhead in typical applications
• Minimal memory footprint
• Negligible disk I/O
• Safe for production use 24/7

**What It Records:**
• CPU Profiling - Method execution samples
• Memory Allocation - Object allocation rates and locations
• Garbage Collection - GC events and pauses
• Thread Activity - Thread creation, blocking, waiting
• I/O Operations - File and network I/O
• Exception Events - Thrown exceptions with stack traces
• JVM Events - Class loading, compilation, safepoints

**Use Cases:**
• Performance Troubleshooting - Identify bottlenecks
• Memory Leak Detection - Track allocation patterns
• Production Monitoring - Always-on telemetry
• Incident Response - Post-mortem analysis with historical data
• Capacity Planning - Understand resource usage

**Compared to Traditional Profilers:**
• Lower overhead - Can run in production
• No instrumentation - Native JVM support
• Always available - No need to attach profiler
• Rich data - More comprehensive than sampling profilers`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Low-Overhead Profiling - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// JFR Command Line Options
// Start JVM with JFR enabled:
// java -XX:StartFlightRecording=duration=60s,filename=recording.jfr MyApp

// With custom settings:
// java -XX:StartFlightRecording=settings=profile,
//      duration=2m,filename=app.jfr MyApp

// Programmatic JFR control
import jdk.jfr.*;

public class JFRExample {
  public static void main(String[] args) throws Exception {
    // Create and start recording
    Recording recording = new Recording();
    recording.setMaxSize(100_000_000);  // 100 MB max
    recording.setDuration(Duration.ofMinutes(5));
    recording.setName("MyAppRecording");

    // Enable specific events
    recording.enable("jdk.CPUSample").withPeriod(Duration.ofMillis(10));
    recording.enable("jdk.JavaMonitorEnter").withThreshold(Duration.ofMillis(10));
    recording.enable("jdk.ObjectAllocationInNewTLAB");

    recording.start();
    System.out.println("JFR Recording started");

    // Your application code here
    performWork();

    // Stop and dump recording
    recording.stop();
    recording.dump(Paths.get("myapp-recording.jfr"));
    recording.close();

    System.out.println("Recording saved to myapp-recording.jfr");
  }

  static void performWork() {
    // Simulate work
    for (int i = 0; i < 1000000; i++) {
      String s = "Iteration: " + i;
    }
  }
}

// Analyze with JDK Mission Control (JMC):
// jmc recording.jfr

// Output:
// JFR Recording started
// Recording saved to myapp-recording.jfr`
    },
    {
      name: 'Event Recording',
      icon: '🔹',
      explanation: `**Core Concept:**
• JFR records specific events as they occur in the JVM
• Both built-in JVM events and custom application events supported
• Event-driven architecture for efficient data collection
• Rich metadata attached to each event

**Built-In Event Types:**
• GC Events - Garbage collection pauses and statistics
• Thread Events - Thread creation, start, end, blocking
• Lock Events - Monitor enter, synchronized blocks
• I/O Events - File read/write, socket operations
• Exception Events - Thrown exceptions with stack traces
• Method Profiling - CPU sampling of method execution
• Class Loading - Class load and unload events
• Compilation - JIT compilation events

**Custom Events:**
• Create application-specific events
• Extend jdk.jfr.Event class
• Add @Label, @Description annotations
• Annotate fields with metadata
• commit() method to record event

**Event Attributes:**
• Timestamp - When event occurred
• Thread - Which thread triggered event
• Stack Trace - Call stack (if applicable)
• Duration - How long event took (for duration events)
• Custom Fields - Application-specific data

**Circular Buffer:**
• Configurable size limit
• Oldest events discarded when buffer full
• Recent history always available
• Prevents unbounded memory growth

**Event Configuration:**
• Enable/disable specific event types
• Set thresholds - Only record if duration > threshold
• Sampling rates - Control frequency of periodic events
• Stack trace depth - How deep to capture stacks

**Performance Considerations:**
• Events only collected when needed
• Threshold filtering reduces overhead
• Efficient binary format
• Minimal allocation during recording`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Event Recording - Implementation
// ═══════════════════════════════════════════════════════════════════════════

import jdk.jfr.*;

// Custom JFR Event
@Name("com.example.UserLogin")
@Label("User Login Event")
@Category("Application")
@Description("Tracks user login attempts")
public class UserLoginEvent extends Event {
  @Label("Username")
  String username;

  @Label("Success")
  boolean success;

  @Label("Duration")
  @Timespan(Timespan.MILLISECONDS)
  long duration;
}

// Custom Transaction Event
@Name("com.example.DatabaseQuery")
@Label("Database Query")
public class DatabaseQueryEvent extends Event {
  String query;
  long executionTime;
  int rowCount;
}

public class JFREventExample {
  public static void main(String[] args) throws Exception {
    // Start recording with custom events
    Recording recording = new Recording();
    recording.enable(UserLoginEvent.class);
    recording.enable(DatabaseQueryEvent.class);
    recording.start();

    // Trigger custom events
    simulateUserLogin("alice", true, 150);
    simulateUserLogin("bob", false, 200);
    simulateDatabaseQuery("SELECT * FROM users", 45, 100);

    // Built-in events are automatically recorded:
    // - GC events (jdk.GarbageCollection)
    // - Thread events (jdk.ThreadStart, jdk.ThreadEnd)
    // - Exception events (jdk.ExceptionThrown)
    // - I/O events (jdk.FileRead, jdk.FileWrite)
    // - Network events (jdk.SocketRead, jdk.SocketWrite)

    recording.stop();
    recording.dump(Paths.get("events.jfr"));
    recording.close();

    System.out.println("Events recorded to events.jfr");
  }

  static void simulateUserLogin(String user, boolean success, long ms) {
    UserLoginEvent event = new UserLoginEvent();
    event.username = user;
    event.success = success;
    event.duration = ms;
    event.commit();  // Record the event
  }

  static void simulateDatabaseQuery(String sql, long time, int rows) {
    DatabaseQueryEvent event = new DatabaseQueryEvent();
    event.query = sql;
    event.executionTime = time;
    event.rowCount = rows;
    event.commit();
  }
}

// Output:
// Events recorded to events.jfr`
    },
    {
      name: 'JFR Analysis',
      icon: '🔹',
      explanation: `**Core Concept:**
• JFR recordings analyzed with JDK Mission Control (JMC) GUI tool
• Programmatic analysis available through JFR API
• Rich visualizations and automated issue detection
• Command-line tools for quick inspection

**JDK Mission Control (JMC):**
• Graphical analysis tool included with JDK
• Flame graphs for CPU profiling
• Memory leak detection
• Thread analysis and lock contention
• I/O performance visualization
• Automated rules engine finds common issues

**Analysis Capabilities:**
• CPU Profiling - Identify hot methods and bottlenecks
• Memory Analysis - Track allocations and potential leaks
• Thread Analysis - Understand thread activity and blocking
• Lock Contention - Find synchronization bottlenecks
• I/O Performance - Analyze file and network operations
• GC Analysis - Understand garbage collection behavior

**Programmatic Analysis:**
• RecordingFile API - Read .jfr files programmatically
• Iterate through events
• Filter by event type
• Extract specific data
• Build custom analysis tools

**Command-Line Tools:**
• jfr print - Display human-readable event data
• jfr summary - Show recording statistics
• jfr metadata - List available event types
• Useful for automation and CI/CD

**Automated Issue Detection:**
• JMC rules engine automatically identifies problems
• High GC pressure warnings
• Lock contention alerts
• Memory leak indicators
• Performance anti-patterns

**Visualizations:**
• Flame Graphs - CPU profiling visualization
• Timeline Views - Events over time
• Heat Maps - Hot spots in code
• Allocation Tables - Top allocating methods
• Thread States - Thread activity over time`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ JFR Analysis - Implementation
// ═══════════════════════════════════════════════════════════════════════════

import jdk.jfr.consumer.*;

// Programmatic analysis of JFR recordings
public class JFRAnalyzer {
  public static void main(String[] args) throws Exception {
    Path recordingFile = Paths.get("recording.jfr");

    // Read and analyze JFR file
    try (RecordingFile recording = new RecordingFile(recordingFile)) {

      // Process all events
      while (recording.hasMoreEvents()) {
        RecordedEvent event = recording.readEvent();

        // Analyze GC events
        if (event.getEventType().getName().equals("jdk.GarbageCollection")) {
          System.out.println("GC Event:");
          System.out.println("  Name: " + event.getValue("name"));
          System.out.println("  Duration: " + event.getDuration());
        }

        // Analyze allocation events
        if (event.getEventType().getName().contains("Allocation")) {
          System.out.println("Allocation:");
          System.out.println("  Class: " + event.getClass("objectClass"));
          System.out.println("  Size: " + event.getLong("allocationSize"));
        }

        // Analyze CPU samples
        if (event.getEventType().getName().equals("jdk.CPUSample")) {
          RecordedStackTrace stack = event.getStackTrace();
          if (stack != null) {
            System.out.println("CPU Sample:");
            stack.getFrames().forEach(frame ->
              System.out.println("  " + frame.getMethod()));
          }
        }
      }
    }

    // Command-line analysis tools:
    // jfr print recording.jfr
    // jfr summary recording.jfr
    // jfr metadata recording.jfr

    // JMC GUI provides:
    // - Method profiling flame graphs
    // - Memory leak detection
    // - Thread analysis
    // - Lock contention analysis
    // - I/O performance analysis

    System.out.println("Analysis complete");
  }
}

// Output:
// GC Event:
//   Name: G1Young
//   Duration: 15ms
// Allocation:
//   Class: java.lang.String
//   Size: 24
// CPU Sample:
//   com.example.MyApp.processData()
// Analysis complete`
    },
    {
      name: 'Production Ready',
      icon: '🔹',
      explanation: `**Core Concept:**
• JFR made free and open-source in Java 11 (previously commercial in Oracle JDK)
• Designed specifically for production environment use
• Safe to run continuously with minimal overhead
• Enterprise-grade profiling for all applications

**History:**
• Introduced in Oracle JDK 7 as commercial feature
• Required commercial license before Java 11
• Open-sourced in OpenJDK 11
• Now available to everyone for free

**Production Characteristics:**
• Minimal Overhead - <1% CPU, safe for 24/7 use
• No Sampling Bias - Captures all configured events
• Thread Safe - Concurrent recording without contention
• Stable API - Production-ready and well-tested
• Resource Bounded - Circular buffer prevents runaway growth

**Deployment Strategies:**
• Always-On Recording - Continuous recording with circular buffer
• On-Demand Recording - Start/stop programmatically
• Scheduled Recording - Time-based automatic recording
• Triggered Recording - Start on specific conditions
• Emergency Recording - Dump on OutOfMemoryError

**Integration Points:**
• JMX - Control recordings via JMX
• Monitoring Tools - Integrate with APM solutions
• CI/CD Pipelines - Automated performance testing
• Diagnostic Commands - jcmd for remote control
• Application Code - Programmatic API

**Operational Benefits:**
• Post-Mortem Analysis - Always have recent history
• No Repro Needed - Catch issues as they happen in production
• Minimal Disruption - No restart or downtime required
• Comprehensive Data - Full picture of JVM behavior
• Cost Effective - No commercial tools required

**Best Practices:**
• Enable in production with conservative settings
• Use circular buffer to limit disk usage
• Configure appropriate retention periods
• Set thresholds to reduce noise
• Integrate with alerting systems`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Production Ready - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Production JFR Configuration

// 1. Continuous recording (circular buffer)
// java -XX:StartFlightRecording=disk=true,
//      maxsize=500M,maxage=6h,
//      settings=default,dumponexit=true,
//      filename=/var/log/app-recording.jfr MyApp

// 2. On-demand recording via jcmd
// jcmd <pid> JFR.start name=emergency duration=60s filename=emergency.jfr

// 3. Programmatic production setup
import jdk.jfr.*;

public class ProductionJFR {
  private static Recording continuousRecording;

  public static void initializeJFR() {
    try {
      // Continuous background recording
      continuousRecording = new Recording();
      continuousRecording.setName("ProductionMonitoring");
      continuousRecording.setMaxAge(Duration.ofHours(6));
      continuousRecording.setMaxSize(500_000_000);  // 500 MB
      continuousRecording.setDumpOnExit(true);
      continuousRecording.setDestination(Paths.get("/var/log/app.jfr"));

      // Use 'default' profile for production (<1% overhead)
      Map<String, String> settings = new HashMap<>();
      settings.put("jdk.CPUSample", "enabled=true,period=20ms");
      settings.put("jdk.GarbageCollection", "enabled=true");
      settings.put("jdk.ExceptionThrown", "enabled=true,threshold=100ms");

      continuousRecording.start();
      System.out.println("Production JFR monitoring started");

    } catch (Exception e) {
      System.err.println("Failed to start JFR: " + e.getMessage());
    }
  }

  // Trigger emergency dump on critical error
  public static void emergencyDump() {
    try {
      Path dumpPath = Paths.get("/var/log/emergency-"
        + System.currentTimeMillis() + ".jfr");
      continuousRecording.dump(dumpPath);
      System.out.println("Emergency dump: " + dumpPath);
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  // Health check integration
  public static boolean isJFRHealthy() {
    return continuousRecording != null
      && continuousRecording.getState() == RecordingState.RUNNING;
  }

  public static void main(String[] args) {
    initializeJFR();

    // Register shutdown hook
    Runtime.getRuntime().addShutdownHook(new Thread(() -> {
      System.out.println("Stopping JFR...");
      continuousRecording.close();
    }));

    // Your application code
    System.out.println("Application running with JFR monitoring");
  }
}

// Output:
// Production JFR monitoring started
// Application running with JFR monitoring`
    },
    {
      name: 'readString() & writeString()',
      icon: '🔹',
      explanation: `**Core Concept:**
• Convenient methods for reading and writing text files as strings
• Files.readString(Path) - Read entire file into String
• Files.writeString(Path, String) - Write string to file
• Eliminates boilerplate code for simple file operations

**readString() Method:**
• Reads entire file content as single String
• Automatically handles character encoding (UTF-8 default)
• Throws IOException if file not found or not readable
• Suitable for small to medium files (loads entire content to memory)

**writeString() Method:**
• Writes string content to file
• Creates file if doesn't exist
• Overwrites existing content by default
• UTF-8 encoding by default
• Returns Path for method chaining

**Method Signatures:**
• readString(Path) - Read with UTF-8
• readString(Path, Charset) - Read with specific encoding
• writeString(Path, CharSequence, OpenOption...) - Write with options
• writeString(Path, CharSequence, Charset, OpenOption...) - Full control

**OpenOptions:**
• CREATE - Create file if doesn't exist (default)
• TRUNCATE_EXISTING - Overwrite existing file (default)
• APPEND - Append to existing file
• CREATE_NEW - Fail if file already exists

**Benefits:**
• Simple API - One-liner for common operations
• Less Boilerplate - No BufferedReader/Writer setup
• Automatic Resource Management - No try-with-resources needed
• Encoding Handled - UTF-8 default, customizable

**Use Cases:**
• Reading configuration files
• Loading templates
• Writing logs or reports
• Processing small text files
• Quick file I/O operations

**Comparison:**
• Old: BufferedReader + FileReader + StringBuilder + try-with-resources
• New: Files.readString(path)
• Much simpler and cleaner`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ readString() & writeString() - Implementation
// ═══════════════════════════════════════════════════════════════════════════

import java.nio.file.*;
import java.nio.charset.StandardCharsets;

// Write string to file - simple one-liner
String content = "Hello Java 11\\nFile I/O is easy!";
Path filePath = Paths.get("message.txt");

Files.writeString(filePath, content);
System.out.println("File written");

// Read entire file as string
String readContent = Files.readString(filePath);
System.out.println("Read content:\\n" + readContent);

// With explicit charset
Files.writeString(filePath, "UTF-8 content: 你好",
  StandardCharsets.UTF_8);

String utf8Content = Files.readString(filePath,
  StandardCharsets.UTF_8);
System.out.println(utf8Content);

// Append to file
Files.writeString(filePath, "\\nAppended line",
  StandardOpenOption.APPEND);

// Before Java 11 (verbose):
try (BufferedWriter writer = Files.newBufferedWriter(filePath)) {
  writer.write(content);
}
try (BufferedReader reader = Files.newBufferedReader(filePath)) {
  StringBuilder sb = new StringBuilder();
  String line;
  while ((line = reader.readLine()) != null) {
    sb.append(line).append("\\n");
  }
  String oldWay = sb.toString();
}

// Java 11 (concise):
Files.writeString(filePath, content);
String newWay = Files.readString(filePath);

// JSON file operations
String json = "{\\"name\\":\\"John\\",\\"age\\":30}";
Path jsonFile = Paths.get("data.json");
Files.writeString(jsonFile, json);
String jsonData = Files.readString(jsonFile);
System.out.println("JSON: " + jsonData);

// Output:
// File written
// Read content:
// Hello Java 11
// File I/O is easy!
// UTF-8 content: 你好
// JSON: {"name":"John","age":30}`
    },
    {
      name: 'Path Operations',
      icon: '🔹',
      explanation: `**Core Concept:**
• Enhanced Path API in Java 11 with convenience methods
• Better file and directory manipulation
• Improved error handling and atomic operations
• Rich metadata and attribute access

**Key Path Methods:**
• of() - Create Path from string parts
• resolve() - Combine paths
• relativize() - Get relative path between two paths
• normalize() - Remove redundant elements (. and ..)
• toAbsolutePath() - Convert to absolute path
• getFileName() - Extract file name

**File Operations:**
• createDirectory() / createDirectories() - Create dirs
• delete() / deleteIfExists() - Remove files/dirs
• move() - Move or rename
• copy() - Copy files
• exists() / notExists() - Check existence

**Atomic Operations:**
• move() with ATOMIC_MOVE - Atomically move file
• Ensures operation completes fully or not at all
• Important for data integrity

**File Attributes:**
• readAttributes() - Read file metadata
• setAttribute() - Modify attributes
• Access: size, timestamps, permissions, owner
• Platform-specific attributes available

**Benefits:**
• Type Safe - Path vs String
• Platform Independent - Works across OS
• Modern API - Replaces legacy File class
• Better Error Handling - More specific exceptions`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Path Operations - Implementation
// ═══════════════════════════════════════════════════════════════════════════

import java.nio.file.*;
import java.nio.file.attribute.*;

// Path creation and manipulation
Path path = Paths.get("documents", "java", "file.txt");
System.out.println("Path: " + path);
System.out.println("Absolute: " + path.toAbsolutePath());
System.out.println("Parent: " + path.getParent());
System.out.println("Filename: " + path.getFileName());

// Check file existence
if (Files.exists(path)) {
  System.out.println("File exists");
} else {
  System.out.println("File does not exist");
}

// Create directories
Path dir = Paths.get("temp", "test");
Files.createDirectories(dir);
System.out.println("Directories created: " + dir);

// Create file with content
Path file = dir.resolve("test.txt");
Files.writeString(file, "Test content");

// File attributes
BasicFileAttributes attrs = Files.readAttributes(file,
  BasicFileAttributes.class);
System.out.println("Size: " + attrs.size() + " bytes");
System.out.println("Created: " + attrs.creationTime());
System.out.println("Modified: " + attrs.lastModifiedTime());
System.out.println("Is Directory: " + attrs.isDirectory());
System.out.println("Is Regular File: " + attrs.isRegularFile());

// Copy file
Path destination = Paths.get("temp", "copy.txt");
Files.copy(file, destination,
  StandardCopyOption.REPLACE_EXISTING);
System.out.println("File copied to: " + destination);

// Move/rename file
Path renamed = Paths.get("temp", "renamed.txt");
Files.move(destination, renamed,
  StandardCopyOption.ATOMIC_MOVE);
System.out.println("File moved to: " + renamed);

// List directory contents
System.out.println("Directory contents:");
Files.list(dir).forEach(p ->
  System.out.println("  " + p.getFileName()));

// Delete file
Files.deleteIfExists(renamed);
System.out.println("File deleted");

// Output:
// Path: documents/java/file.txt
// Absolute: /home/user/documents/java/file.txt
// Parent: documents/java
// Filename: file.txt
// File does not exist
// Directories created: temp/test
// Size: 12 bytes
// Is Regular File: true
// File copied to: temp/copy.txt
// File moved to: temp/renamed.txt
// Directory contents:
//   test.txt
// File deleted`
    },
    {
      name: 'Unicode Support',
      icon: '🔹',
      explanation: `**Core Concept:**
• Better handling of different character encodings in file I/O
• Explicit charset specification prevents encoding issues
• UTF-8 default with customizable encoding
• BOM (Byte Order Mark) handling for compatibility

**Charset Support:**
• UTF-8 default (most common encoding)
• UTF-16, UTF-32 support
• ISO-8859-1, Windows-1252, etc.
• Any Charset supported by JVM
• Explicit encoding prevents platform-dependent issues

**Method Variants:**
• readString(Path) - UTF-8 default
• readString(Path, Charset) - Specify encoding
• writeString(Path, String) - UTF-8 default
• writeString(Path, String, Charset) - Custom encoding

**BOM Handling:**
• Byte Order Mark indicates encoding
• UTF-8 BOM, UTF-16 BE/LE BOMs
• Automatic detection and handling
• Ensures correct interpretation

**Benefits:**
• Prevent Encoding Bugs - Explicit encoding
• International Support - Handle any language
• Cross-Platform - Same results everywhere
• Modern Standard - UTF-8 by default`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Unicode Support - Implementation
// ═══════════════════════════════════════════════════════════════════════════

import java.nio.file.*;
import java.nio.charset.*;

// UTF-8 encoding (default in Java 11+)
String unicodeText = """
    English: Hello
    Japanese: こんにちは
    Arabic: مرحبا
    Emoji: 👋🌍
    """;

Path utf8File = Paths.get("unicode.txt");
Files.writeString(utf8File, unicodeText,
  StandardCharsets.UTF_8);

String read = Files.readString(utf8File,
  StandardCharsets.UTF_8);
System.out.println("UTF-8 content:\\n" + read);

// UTF-16 encoding
Path utf16File = Paths.get("utf16.txt");
Files.writeString(utf16File, unicodeText,
  StandardCharsets.UTF_16);

String utf16Read = Files.readString(utf16File,
  StandardCharsets.UTF_16);
System.out.println("UTF-16 read successfully");

// ISO-8859-1 (Latin-1)
String latin = "Café résumé";
Path latinFile = Paths.get("latin.txt");
Files.writeString(latinFile, latin,
  StandardCharsets.ISO_8859_1);

// Mixed charset handling
Path configFile = Paths.get("config.txt");
try {
  Files.writeString(configFile, "name=José",
    StandardCharsets.UTF_8);

  String config = Files.readString(configFile,
    StandardCharsets.UTF_8);
  System.out.println("Config: " + config);

} catch (IOException e) {
  System.err.println("Encoding error: " + e);
}

// File size in bytes vs characters
byte[] bytes = unicodeText.getBytes(StandardCharsets.UTF_8);
System.out.println("String length: " + unicodeText.length());
System.out.println("UTF-8 bytes: " + bytes.length);
System.out.println("File size: " + Files.size(utf8File));

// Custom charset
Charset shiftJIS = Charset.forName("Shift_JIS");
Path japaneseFile = Paths.get("japanese.txt");
Files.writeString(japaneseFile, "こんにちは", shiftJIS);

// Output:
// UTF-8 content:
// English: Hello
// Japanese: こんにちは
// Arabic: مرحبا
// Emoji: 👋🌍
// UTF-16 read successfully
// Config: name=José
// String length: 52
// UTF-8 bytes: 64
// File size: 64`
    },
    {
      name: 'Performance',
      icon: '🔹',
      explanation: `**Core Concept:**
• Optimized file I/O implementations in Java NIO.2
• Memory-efficient processing of large files
• Better buffer management and reduced overhead
• Native OS integration for performance

**readString()/writeString() Optimizations:**
• Optimized for small to medium files
• Single-pass reading/writing
• Efficient character decoding
• Minimal memory allocations

**Large File Handling:**
• Stream-Based Processing - Files.lines() for line-by-line
• Buffered I/O - Automatic buffering
• Memory-Mapped Files - Direct memory access
• Prevents OutOfMemoryError on large files

**Performance Benefits:**
• Reduced System Calls - Batched I/O operations
• Native Implementations - JVM optimizations
• Better Caching - OS-level file caching utilized
• Lower Latency - Direct buffer usage

**Best Practices:**
• readString() for files < 100MB
• Files.lines() stream for large text files
• Memory-mapped files for very large files (GB+)
• Async I/O for concurrent file operations

**Comparison:**
• Old BufferedReader - Multiple method calls
• New readString() - Single optimized call
• Significant performance improvement for common cases`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Performance - Implementation
// ═══════════════════════════════════════════════════════════════════════════

import java.nio.file.*;
import java.util.stream.*;

// Efficient reading of large files

// 1. Read all lines (small files)
Path smallFile = Paths.get("small.txt");
Files.writeString(smallFile, "Line 1\\nLine 2\\nLine 3");

List<String> allLines = Files.readAllLines(smallFile);
System.out.println("Lines: " + allLines.size());

// 2. Stream lines (memory-efficient for large files)
long start = System.currentTimeMillis();

try (Stream<String> lines = Files.lines(smallFile)) {
  long count = lines
    .filter(line -> !line.isBlank())
    .count();
  System.out.println("Non-blank lines: " + count);
}

long elapsed = System.currentTimeMillis() - start;
System.out.println("Processing time: " + elapsed + "ms");

// 3. Buffered reading/writing for performance
Path largeFile = Paths.get("large.txt");
StringBuilder large = new StringBuilder();
for (int i = 0; i < 10000; i++) {
  large.append("Line ").append(i).append("\\n");
}

// Write performance
start = System.currentTimeMillis();
Files.writeString(largeFile, large.toString());
elapsed = System.currentTimeMillis() - start;
System.out.println("Write time: " + elapsed + "ms");

// Read performance
start = System.currentTimeMillis();
String content = Files.readString(largeFile);
elapsed = System.currentTimeMillis() - start;
System.out.println("Read time: " + elapsed + "ms");
System.out.println("Content size: " + content.length() + " chars");

// Stream-based processing (low memory)
start = System.currentTimeMillis();
long lineCount = Files.lines(largeFile).count();
elapsed = System.currentTimeMillis() - start;
System.out.println("Stream count time: " + elapsed + "ms");
System.out.println("Lines counted: " + lineCount);

// Parallel processing for better performance
long wordCount = Files.lines(largeFile)
  .parallel()
  .flatMap(line -> Stream.of(line.split("\\\\s+")))
  .count();
System.out.println("Word count: " + wordCount);

// File metadata without reading content
long fileSize = Files.size(largeFile);
System.out.println("File size: " + fileSize + " bytes");

// Output:
// Lines: 3
// Non-blank lines: 3
// Processing time: 2ms
// Write time: 15ms
// Read time: 8ms
// Content size: 78894 chars
// Stream count time: 5ms
// Lines counted: 10000
// Word count: 20000
// File size: 78894 bytes`
    },
    {
      name: 'toArray() Enhancement',
      icon: '🔹',
      explanation: `**Core Concept:**
• New toArray(IntFunction<T[]>) method added to Collection interface
• Allows creating arrays of correct type using generator function
• More convenient and type-safe than older toArray(T[]) method
• Eliminates need for pre-sized array allocation

**New Method Signature:**
• toArray(IntFunction<T[]> generator)
• Generator function creates array of specified size
• Common usage: collection.toArray(String[]::new)
• Method reference creates array of exact size needed

**Comparison with Old Methods:**
• toArray() - Returns Object[], requires casting
• toArray(T[]) - Requires pre-sized array, awkward API
• toArray(IntFunction) - Clean, type-safe, no pre-sizing needed

**Benefits:**
• Type Safety - No casting required
• Cleaner Code - Method reference syntax
• Performance - Exact size array created
• No Boilerplate - No need to create array first

**Use Cases:**
• Converting Stream to array
• Converting Collection to array
• Type-safe array operations
• Functional programming patterns

**Common Patterns:**
• list.toArray(String[]::new)
• set.toArray(Integer[]::new)
• stream.collect(Collectors.toList()).toArray(MyType[]::new)`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ toArray() Enhancement - Implementation
// ═══════════════════════════════════════════════════════════════════════════

import java.util.*;

// Java 11: toArray() with generator function
List<String> names = List.of("Alice", "Bob", "Charlie");

// Old way (verbose and confusing)
String[] oldArray = names.toArray(new String[0]);
String[] oldArray2 = names.toArray(new String[names.size()]);

// Java 11 way (clean and type-safe)
String[] newArray = names.toArray(String[]::new);
System.out.println("Array: " + Arrays.toString(newArray));

// Works with any collection type
Set<Integer> numbers = Set.of(1, 2, 3, 4, 5);
Integer[] numArray = numbers.toArray(Integer[]::new);
System.out.println("Numbers: " + Arrays.toString(numArray));

// Custom objects
class Person {
  String name;
  Person(String name) { this.name = name; }
  @Override
  public String toString() { return name; }
}

List<Person> people = List.of(
  new Person("John"),
  new Person("Jane")
);
Person[] personArray = people.toArray(Person[]::new);
System.out.println("People: " + Arrays.toString(personArray));

// Stream to array (common pattern)
String[] streamArray = names.stream()
  .filter(name -> name.length() > 3)
  .toArray(String[]::new);
System.out.println("Filtered: " + Arrays.toString(streamArray));

// Type inference works perfectly
var autoArray = List.of("A", "B", "C").toArray(String[]::new);
System.out.println("Auto: " + Arrays.toString(autoArray));

// Output:
// Array: [Alice, Bob, Charlie]
// Numbers: [1, 2, 3, 4, 5]
// People: [John, Jane]
// Filtered: [Alice, Charlie]
// Auto: [A, B, C]`
    },
    {
      name: 'Immutable Collections',
      icon: '🔹',
      explanation: `**Core Concept:**
• List.of(), Set.of(), Map.of() factory methods create immutable collections
• Introduced in Java 9, refined in Java 11
• Null-hostile - throw NullPointerException on null elements
• Compact memory footprint and optimized performance

**Factory Methods:**
• List.of(E... elements) - Immutable list
• Set.of(E... elements) - Immutable set
• Map.of(K, V, K, V, ...) - Immutable map up to 10 pairs
• Map.ofEntries(Entry...) - Immutable map from entries

**Characteristics:**
• Truly Immutable - Cannot add, remove, or modify elements
• Null-Hostile - Reject null elements at creation time
• Space Efficient - Specialized implementations for small sizes
• Thread-Safe - Safe to share across threads
• Serializable - Can be serialized

**Performance Benefits:**
• Less Memory - More compact than mutable collections
• Faster Creation - Optimized factory methods
• Better Caching - JVM can optimize immutable objects
• No Synchronization Overhead - Thread-safe by design

**Use Cases:**
• Constants and Configuration - Immutable data
• API Return Values - Prevent modification
• Thread-Safe Sharing - No synchronization needed
• Functional Programming - Immutable data structures

**Comparison:**
• Old: Collections.unmodifiableList(Arrays.asList(...))
• New: List.of(...)
• Much simpler and more efficient

**Modification Attempts:**
• All mutating operations throw UnsupportedOperationException
• add(), remove(), set(), clear() all fail
• Fail-fast behavior prevents bugs`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Immutable Collections - Implementation
// ═══════════════════════════════════════════════════════════════════════════

import java.util.*;

// Immutable Lists
List<String> immutableList = List.of("A", "B", "C");
System.out.println("List: " + immutableList);

// Attempting to modify throws exception
try {
  immutableList.add("D");  // UnsupportedOperationException
} catch (UnsupportedOperationException e) {
  System.out.println("Cannot modify immutable list");
}

// Immutable Sets (no duplicates)
Set<Integer> immutableSet = Set.of(1, 2, 3, 4, 5);
System.out.println("Set: " + immutableSet);
System.out.println("Contains 3: " + immutableSet.contains(3));

// Immutable Maps
Map<String, Integer> scores = Map.of(
  "Alice", 95,
  "Bob", 87,
  "Charlie", 92
);
System.out.println("Scores: " + scores);
System.out.println("Bob's score: " + scores.get("Bob"));

// Map with more entries (up to 10)
Map<Integer, String> months = Map.ofEntries(
  Map.entry(1, "January"),
  Map.entry(2, "February"),
  Map.entry(3, "March"),
  Map.entry(4, "April"),
  Map.entry(5, "May")
);
System.out.println("Months: " + months);

// Null-hostile: nulls not allowed
try {
  List<String> nullList = List.of("A", null, "C");
} catch (NullPointerException e) {
  System.out.println("Cannot contain null values");
}

// Copy of mutable to immutable
List<String> mutable = new ArrayList<>();
mutable.add("X");
mutable.add("Y");
List<String> copy = List.copyOf(mutable);
System.out.println("Copy: " + copy);

// Modifying original doesn't affect copy
mutable.add("Z");
System.out.println("Original: " + mutable);
System.out.println("Copy unchanged: " + copy);

// Benefits: memory efficient, thread-safe
System.out.println("List size: " + immutableList.size());

// Output:
// List: [A, B, C]
// Cannot modify immutable list
// Set: [1, 2, 3, 4, 5]
// Contains 3: true
// Scores: {Alice=95, Bob=87, Charlie=92}
// Bob's score: 87
// Months: {1=January, 2=February, 3=March, 4=April, 5=May}
// Cannot contain null values
// Copy: [X, Y]
// Original: [X, Y, Z]
// Copy unchanged: [X, Y]
// List size: 3`
    },
    {
      name: 'Predicate Methods',
      icon: '🔹',
      explanation: `**Core Concept:**
• Predicate.not() static method provides clean negation of predicates
• Particularly useful with method references in Stream API
• Improves code readability and expressiveness
• Complements existing negate() instance method

**Predicate.not() vs negate():**
• not() - Static method, takes predicate as parameter
• negate() - Instance method, called on predicate object
• not() is cleaner with method references
• Both achieve same logical result

**Method Reference Benefits:**
• Predicate.not(String::isBlank) - Clean and readable
• Compared to: s -> !s.isBlank() - More verbose
• Compared to: ((Predicate<String>)String::isBlank).negate() - Ugly casting

**Use Cases:**
• Stream Filtering - filter(Predicate.not(String::isEmpty))
• Negating Method References - Cleaner than lambda
• Functional Composition - Combine with other predicates
• Readable Code - Self-documenting intent

**Common Patterns:**
• Filter non-blank strings: filter(Predicate.not(String::isBlank))
• Filter non-empty collections: filter(Predicate.not(Collection::isEmpty))
• Filter non-null optionals: filter(Predicate.not(Optional::isEmpty))
• Filter inactive items: filter(Predicate.not(Item::isActive))

**Benefits:**
• Readability - Intent is clear
• Conciseness - Shorter than lambda
• Consistency - Works with any method reference
• Type Safe - Compiler-checked

**Comparison:**
• Old: .filter(s -> !s.isBlank())
• New: .filter(Predicate.not(String::isBlank))
• More functional and declarative`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Predicate Methods - Implementation
// ═══════════════════════════════════════════════════════════════════════════

import java.util.*;
import java.util.function.Predicate;
import java.util.stream.*;

// Java 11: Predicate.not() for negation
List<String> strings = List.of(
  "Hello",
  "",
  "  ",
  "World",
  "\\t",
  "Java"
);

// Before Java 11: verbose negation
strings.stream()
  .filter(s -> !s.isBlank())
  .forEach(System.out::println);

System.out.println("---");

// Java 11: Predicate.not() with method reference
strings.stream()
  .filter(Predicate.not(String::isBlank))
  .forEach(System.out::println);

// More readable than lambda negation
List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// Old way
numbers.stream()
  .filter(n -> !(n % 2 == 0))
  .forEach(System.out::println);

System.out.println("---");

// Better with Predicate.not()
Predicate<Integer> isEven = n -> n % 2 == 0;
numbers.stream()
  .filter(Predicate.not(isEven))
  .forEach(System.out::println);

// Combining predicates
Predicate<String> isEmpty = String::isEmpty;
Predicate<String> isNotEmpty = Predicate.not(isEmpty);

System.out.println("Not empty: " + isNotEmpty.test("Hello"));
System.out.println("Not empty: " + isNotEmpty.test(""));

// Multiple negations with method references
List<String> words = List.of("Java", "", "Python", "\\n", "C++");

var nonBlankWords = words.stream()
  .filter(Predicate.not(String::isBlank))
  .collect(Collectors.toList());
System.out.println("Non-blank words: " + nonBlankWords);

// Custom predicates
class User {
  String name;
  boolean active;
  User(String name, boolean active) {
    this.name = name;
    this.active = active;
  }
  boolean isActive() { return active; }
  public String toString() { return name; }
}

List<User> users = List.of(
  new User("Alice", true),
  new User("Bob", false),
  new User("Charlie", true)
);

// Filter inactive users
users.stream()
  .filter(Predicate.not(User::isActive))
  .forEach(System.out::println);

// Output:
// Hello
// World
// Java
// ---
// Hello
// World
// Java
// 1
// 3
// 5
// 7
// 9
// ---
// 1
// 3
// 5
// 7
// 9
// Not empty: true
// Not empty: false
// Non-blank words: [Java, Python, C++]
// Bob`
    },
    {
      name: 'Optional Enhancement',
      icon: '🔹',
      explanation: `**Core Concept:**
• Optional.isEmpty() method added in Java 11
• Complements existing isPresent() for more natural null-checking
• Better integration with Stream API and Predicate.not()
• More readable code in certain contexts

**isEmpty() vs isPresent():**
• isEmpty() returns true if no value present
• isPresent() returns true if value present
• isEmpty() is logical opposite of isPresent()
• Choose based on what reads more naturally

**Readability Improvements:**
• if (optional.isEmpty()) - Natural for checking absence
• if (!optional.isPresent()) - Double negative, less clear
• Particularly useful in negative conditions

**Stream Integration:**
• stream.filter(Predicate.not(Optional::isEmpty))
• More readable than !opt.isPresent()
• Works naturally with method references
• Functional programming style

**Common Patterns:**
• Early Return - if (optional.isEmpty()) return;
• Validation - isEmpty() for checking required values
• Stream Filtering - Filter out empty optionals
• Guard Clauses - More readable guards

**Use Cases:**
• Input Validation - Check for missing values
• API Responses - Verify data presence
• Stream Processing - Filter empty optionals
• Conditional Logic - More natural expressions

**Comparison:**
• Old: if (!user.isPresent()) return;
• New: if (user.isEmpty()) return;
• More natural and readable`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Optional Enhancement - Implementation
// ═══════════════════════════════════════════════════════════════════════════

import java.util.*;

// Java 11: Optional.isEmpty()
Optional<String> empty = Optional.empty();
Optional<String> present = Optional.of("Hello");

// Before Java 11: negation
if (!empty.isPresent()) {
  System.out.println("Empty using !isPresent()");
}

// Java 11: more readable
if (empty.isEmpty()) {
  System.out.println("Empty using isEmpty()");
}

if (present.isPresent()) {
  System.out.println("Present: " + present.get());
}

// Practical example: user lookup
Optional<String> findUser(int id) {
  if (id == 1) return Optional.of("Alice");
  return Optional.empty();
}

Optional<String> user = findUser(1);
if (user.isPresent()) {
  System.out.println("Found: " + user.get());
}

Optional<String> notFound = findUser(999);
if (notFound.isEmpty()) {
  System.out.println("User not found");
}

// Chaining with isEmpty() checks
Optional<Integer> getScore(String name) {
  if (name.equals("Alice")) return Optional.of(95);
  return Optional.empty();
}

var score = getScore("Alice");
score.ifPresentOrElse(
  s -> System.out.println("Score: " + s),
  () -> System.out.println("No score found")
);

var noScore = getScore("Unknown");
if (noScore.isEmpty()) {
  System.out.println("Score is empty");
}

// Stream of Optionals
List<Optional<String>> optionals = List.of(
  Optional.of("A"),
  Optional.empty(),
  Optional.of("B"),
  Optional.empty(),
  Optional.of("C")
);

// Filter out empty optionals
List<String> values = optionals.stream()
  .filter(opt -> !opt.isEmpty())  // or .filter(Optional::isPresent)
  .map(Optional::get)
  .collect(Collectors.toList());
System.out.println("Values: " + values);

// Java 9+ stream() method with isEmpty()
List<String> flatValues = optionals.stream()
  .filter(Predicate.not(Optional::isEmpty))
  .flatMap(Optional::stream)
  .collect(Collectors.toList());
System.out.println("Flat values: " + flatValues);

// Null-safe operations
String nullString = null;
Optional<String> optional = Optional.ofNullable(nullString);
if (optional.isEmpty()) {
  System.out.println("Null converted to empty Optional");
}

// Output:
// Empty using !isPresent()
// Empty using isEmpty()
// Present: Hello
// Found: Alice
// User not found
// Score: 95
// Score is empty
// Values: [A, B, C]
// Flat values: [A, B, C]
// Null converted to empty Optional`
    },
    {
      name: 'Reflection API',
      icon: '🔹',
      explanation: `**Core Concept:**
• New reflection APIs for nest-based access control (JEP 181)
• Nest is group of classes/interfaces compiled from same source file
• Allows private access between nest members
• Better reflects Java language semantics at runtime

**Nest Reflection Methods:**
• getNestHost() - Returns nest host class
• getNestMembers() - Returns all classes in nest
• isNestmateOf(Class) - Check if two classes are nestmates

**What is a Nest:**
• Outer class and all its inner classes form a nest
• Nest host is the outermost class
• All members share private access
• JVM concept matching Java source structure

**Use Cases:**
• Framework Development - Understanding class relationships
• Serialization - Proper handling of inner classes
• Access Control - Runtime verification of access
• Code Generation - Creating proper nested structures

**Before Java 11:**
• Inner classes accessed outer private fields via synthetic bridge methods
• These bridges were implementation details
• No API to discover nest relationships
• Gap between language and runtime models

**Benefits:**
• Clean Semantics - Direct private access without bridges
• Performance - Fewer synthetic methods
• Introspection - Discover class relationships
• Security - Better access control understanding

**Common Pattern:**
• Check if classes are nestmates
• Get all classes in a nest
• Verify access control relationships`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Reflection API - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Nest reflection APIs
public class NestReflectionDemo {

  private String data = "host data";

  class InnerOne {
    private String inner1Data = "inner1 data";
  }

  class InnerTwo {
    private String inner2Data = "inner2 data";
  }

  static class StaticNested {
    private String staticData = "static data";
  }

  public static void main(String[] args) {
    // Get nest host
    Class<?> outerClass = NestReflectionDemo.class;
    Class<?> innerClass = InnerOne.class;

    System.out.println("Outer nest host: " +
      outerClass.getNestHost().getSimpleName());
    System.out.println("Inner nest host: " +
      innerClass.getNestHost().getSimpleName());

    // Check if classes are nestmates
    boolean areNestmates = outerClass.isNestmateOf(innerClass);
    System.out.println("Are nestmates: " + areNestmates);

    boolean staticNestmate = outerClass.isNestmateOf(StaticNested.class);
    System.out.println("Static nested is nestmate: " + staticNestmate);

    // Get all nest members
    Class<?>[] nestMembers = outerClass.getNestMembers();
    System.out.println("Nest members:");
    for (Class<?> member : nestMembers) {
      System.out.println("  - " + member.getSimpleName());
    }

    // Practical use: Access private fields using reflection
    try {
      NestReflectionDemo outer = new NestReflectionDemo();
      InnerOne inner = outer.new InnerOne();

      // Access private field of nestmate
      Field field = InnerOne.class.getDeclaredField("inner1Data");
      // No setAccessible(true) needed for nestmates!
      String value = (String) field.get(inner);
      System.out.println("Accessed private field: " + value);

    } catch (Exception e) {
      e.printStackTrace();
    }

    // Check nest membership programmatically
    if (InnerOne.class.getNestHost() == InnerTwo.class.getNestHost()) {
      System.out.println("InnerOne and InnerTwo share same nest");
    }
  }
}

// Output:
// Outer nest host: NestReflectionDemo
// Inner nest host: NestReflectionDemo
// Are nestmates: true
// Static nested is nestmate: true
// Nest members:
//   - NestReflectionDemo
//   - InnerOne
//   - InnerTwo
//   - StaticNested
// Accessed private field: inner1 data
// InnerOne and InnerTwo share same nest`
    },
    {
      name: 'Performance',
      icon: '🔹',
      explanation: `**Core Concept:**
• Nest-based access control eliminates synthetic bridge methods
• Reduces class file size and method count
• Improves startup time and JIT optimization
• Direct private access between nestmates

**Before Java 11:**
• Compiler generated synthetic bridge methods (access$000, etc.)
• Each private field access needed a bridge
• Increased class file size
• Additional method calls added overhead
• Made bytecode harder to understand

**After Java 11:**
• JVM directly enforces nest-based access control
• No synthetic bridge methods needed
• Private fields accessed directly
• Cleaner bytecode
• Better performance

**Performance Benefits:**
• Smaller Class Files - Fewer synthetic methods
• Faster Startup - Less bytecode to load and verify
• Better JIT Optimization - Cleaner code for compiler
• Reduced Method Calls - Direct access instead of bridges
• Lower Memory - Fewer methods to track

**Impact on Real Applications:**
• Inner class heavy code benefits most
• Android apps see noticeable improvements
• Microservices with fast startup requirements
• Applications with many nested classes

**Bytecode Improvements:**
• Cleaner disassembly output
• Easier to debug and understand
• Better tooling support
• More accurate profiling

**Measurement:**
• Class file size reduction: 5-15% typical
• Startup time improvement: 2-5% typical
• Varies based on inner class usage`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Performance - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Performance comparison: Before vs After Java 11

// Before Java 11: Compiler generated synthetic bridge methods
// Example (pseudocode of what compiler generated):
class OuterOld {
  private int value = 42;

  // Compiler generated: synthetic bridge method
  // static int access$000(OuterOld outer) {
  //   return outer.value;
  // }

  class InnerOld {
    void printValue() {
      // Actually calls: OuterOld.access$000(OuterOld.this)
      System.out.println("Value: " + OuterOld.this.value);
    }
  }
}

// Java 11+: Direct nest-based access (no bridge methods)
class OuterNew {
  private int value = 42;

  // No synthetic bridge methods generated!

  class InnerNew {
    void printValue() {
      // Direct access to private field via nest membership
      System.out.println("Value: " + OuterNew.this.value);
    }
  }
}

public class PerformanceDemo {
  // Benchmark showing improvements
  public static void main(String[] args) {
    long iterations = 1_000_000;

    OuterNew outer = new OuterNew();
    OuterNew.InnerNew inner = outer.new InnerNew();

    // Warm up JIT
    for (int i = 0; i < 10000; i++) {
      inner.printValue();
    }

    // Benchmark
    long start = System.nanoTime();
    for (long i = 0; i < iterations; i++) {
      inner.printValue();
    }
    long elapsed = System.nanoTime() - start;

    System.out.println("Time: " + elapsed / 1_000_000 + "ms");
    System.out.println("Avg: " + elapsed / iterations + "ns per call");

    // Benefits:
    // 1. Faster execution (no bridge method overhead)
    // 2. Smaller bytecode size
    // 3. Better JIT optimization
    // 4. Reduced method call overhead
    // 5. Improved startup time

    // Class file size comparison
    System.out.println("\\nBytecode benefits:");
    System.out.println("- No synthetic bridge methods");
    System.out.println("- Reduced class file size");
    System.out.println("- Cleaner stack traces");
  }
}

// Typical improvements:
// - 5-10% smaller class files
// - 2-5% faster execution for heavy nested class usage
// - Better JIT inline optimization
// - Cleaner bytecode for tools and debuggers

// Output:
// (Value printed 1,000,000 times)
// Time: 150ms
// Avg: 150ns per call
//
// Bytecode benefits:
// - No synthetic bridge methods
// - Reduced class file size
// - Cleaner stack traces`
    },
    {
      name: 'Security',
      icon: '🔹',
      explanation: `**Core Concept:**
• Nest-based access control improves Java security model
• Eliminates security risks from synthetic bridge methods
• More aligned with JVM access control semantics
• Clearer and more predictable private access

**Security Issues with Bridge Methods:**
• Synthetic bridges were package-private, not truly private
• Accessible via reflection from same package
• Security Manager couldn't properly restrict access
• Gap between language semantics and runtime behavior

**Nest-Based Access Improvements:**
• True private access enforcement at JVM level
• No synthetic methods that can be exploited
• Reflection properly respects nest boundaries
• Security Manager has accurate view of access

**Access Control Benefits:**
• Predictable - Matches developer expectations
• Consistent - Language and JVM aligned
• Verifiable - Security policies can be enforced
• Auditable - Access patterns are clear

**Vulnerability Closure:**
• Package-private synthetic methods eliminated
• Reflection-based attacks prevented
• Security auditing more accurate
• Compliance requirements better met

**Impact on Security:**
• Reduces attack surface
• Eliminates unexpected access paths
• Improves security tool accuracy
• Better alignment with security policies

**Enterprise Benefits:**
• Easier security auditing
• Better compliance verification
• More predictable sandboxing
• Clearer access control policies`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Security - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Security improvements with nest-based access

// Before Java 11: Security issues with synthetic bridges
class SecurityOld {
  private String password = "secret123";

  // Compiler generated synthetic bridge (package-private!)
  // static String access$000(SecurityOld obj) {
  //   return obj.password;  // Accessible from same package!
  // }

  class Inner {
    void usePassword() {
      System.out.println(password);
    }
  }
}

// Attacker could exploit this:
// class Attacker {
//   void hack() {
//     SecurityOld obj = new SecurityOld();
//     // Call synthetic bridge method directly!
//     String stolen = SecurityOld.access$000(obj);
//   }
// }

// Java 11: Proper nest-based security
class SecurityNew {
  private String password = "secret123";

  // No synthetic bridge methods!
  // Private access enforced at JVM level

  class Inner {
    void usePassword() {
      // Direct private access via nest membership
      System.out.println("Using: " + password);
    }
  }
}

public class SecurityDemo {
  public static void main(String[] args) {
    // Nest-based access provides:
    // 1. True private access (JVM enforced)
    // 2. No package-private bridge methods
    // 3. Can't be exploited by same-package classes
    // 4. Reflection security improved

    SecurityNew secure = new SecurityNew();
    SecurityNew.Inner inner = secure.new Inner();
    inner.usePassword();

    // Attempting to access private members from outside
    try {
      Field field = SecurityNew.class.getDeclaredField("password");
      // Proper security check
      // field.get(secure); // IllegalAccessException for non-nestmates!
      System.out.println("\\nSecurity enforced by JVM");
    } catch (Exception e) {
      System.out.println("Error: " + e.getMessage());
    }

    // Check nest membership for security
    Class<?> secureClass = SecurityNew.class;
    Class<?> innerClass = SecurityNew.Inner.class;

    if (secureClass.isNestmateOf(innerClass)) {
      System.out.println("\\nInner is verified nestmate - access allowed");
    }

    // Security benefits:
    System.out.println("\\nSecurity improvements:");
    System.out.println("- No synthetic bridge methods to exploit");
    System.out.println("- JVM-level access control");
    System.out.println("- True private encapsulation");
    System.out.println("- Better reflection security");
    System.out.println("- Closes security vulnerabilities");
  }
}

// Key security improvements:
// 1. Synthetic bridges were package-private (exploitable)
// 2. Nest-based access is JVM-enforced (secure)
// 3. Reflection properly respects nest boundaries
// 4. No more package-level access to "private" data
// 5. Stronger encapsulation guarantees

// Output:
// Using: secret123
// Security enforced by JVM
// Inner is verified nestmate - access allowed
// Security improvements:
// - No synthetic bridge methods to exploit
// - JVM-level access control
// - True private encapsulation
// - Better reflection security
// - Closes security vulnerabilities`
    },
    {
      name: 'ZGC Improvements',
      icon: '🔹',
      explanation: `**Core Concept:**
• Z Garbage Collector (ZGC) - Experimental low-latency GC in Java 11
• Sub-millisecond pause times (<10ms typical)
• Scalable from 8MB to 16TB heaps
• Concurrent garbage collection with minimal stop-the-world

**Key Features:**
• Low Latency - Pause times independent of heap size
• Concurrent - Most GC work done concurrently with application
• Region-Based - Divides heap into regions for parallel processing
• Colored Pointers - Uses pointer metadata for GC state
• Load Barriers - Enables concurrent relocation

**Pause Time Goals:**
• Target: Sub-millisecond pauses (< 1ms)
• Typical: 1-10ms pause times
• Independent of Heap Size - 1GB or 1TB, similar pauses
• Predictable - Consistent low latency

**Heap Size Support:**
• Minimum: 8MB (though not practical)
• Maximum: 16TB
• Tested: Multi-terabyte heaps in production
• Scalable: Performance scales with heap size

**Use Cases:**
• Low-Latency Applications - Trading systems, real-time analytics
• Large Heaps - Applications with TB of data
• Consistent Response Times - SLA-sensitive services
• Real-Time Systems - Near real-time requirements

**Trade-offs:**
• Higher Throughput Overhead - Uses more CPU than G1
• Memory Overhead - Requires extra memory for metadata
• Platform Support - Linux x64 initially (expanded later)
• Experimental Status - Production use requires testing

**Comparison with G1:**
• G1: Balanced, 10-200ms pauses, better throughput
• ZGC: Low latency, <10ms pauses, more CPU overhead
• Choose ZGC for latency, G1 for throughput

**Enabling ZGC:**
• -XX:+UnlockExperimentalVMOptions
• -XX:+UseZGC
• Experimental in Java 11, production-ready in Java 15`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ ZGC Improvements - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// ZGC - Z Garbage Collector (Experimental in Java 11)

// Enable ZGC with JVM flags:
// java -XX:+UnlockExperimentalVMOptions
//      -XX:+UseZGC
//      -Xms4g -Xmx16g MyApp

public class ZGCDemo {
  public static void main(String[] args) {
    System.out.println("Running with ZGC");
    System.out.println("Max heap: " +
      Runtime.getRuntime().maxMemory() / 1024 / 1024 / 1024 + "GB");

    // ZGC benefits: Low pause times
    // Even with large heaps (TB scale)

    // Simulate low-latency application
    for (int i = 0; i < 100; i++) {
      processLatencySensitiveRequest(i);

      // Allocate memory to trigger GC
      createGarbage();

      if (i % 10 == 0) {
        System.out.println("Processed " + i + " requests");
      }
    }

    System.out.println("All requests completed");
    System.out.println("ZGC kept pauses under 10ms!");
  }

  static void processLatencySensitiveRequest(int id) {
    // Simulate request processing
    long start = System.nanoTime();

    // Do work
    String data = "Request-" + id;
    for (int i = 0; i < 1000; i++) {
      data = data + "-" + i;
    }

    long elapsed = (System.nanoTime() - start) / 1_000_000;
    if (elapsed > 10) {
      System.out.println("WARNING: Request took " + elapsed + "ms");
    }
  }

  static void createGarbage() {
    // Create temporary objects
    List<String> temp = new ArrayList<>();
    for (int i = 0; i < 10000; i++) {
      temp.add("Object-" + i);
    }
    // temp becomes garbage after method returns
  }
}

// ZGC Features:
// - Concurrent marking
// - Concurrent compaction
// - Load barriers for reference coloring
// - Scalable to multi-TB heaps
// - Max pause time < 10ms

// ZGC Performance:
// - Pause times: < 10ms (typically 1-2ms)
// - Throughput overhead: 10-15%
// - Works with heaps from 8MB to 16TB

// Comparison:
// G1 GC:  50-200ms pauses (heap dependent)
// ZGC:    1-10ms pauses (heap independent!)

// Monitoring ZGC:
// -Xlog:gc:file=gc.log
// -Xlog:gc*

// ZGC Tuning:
// -XX:ZCollectionInterval=<seconds>
// -XX:ZAllocationSpikeTolerance=<factor>
// -XX:ConcGCThreads=<threads>

// Use cases:
// - Low-latency trading systems
// - Real-time analytics
// - Large heap applications
// - Response-time critical services

// Output:
// Running with ZGC
// Max heap: 16GB
// Processed 10 requests
// Processed 20 requests
// ...
// Processed 90 requests
// All requests completed
// ZGC kept pauses under 10ms!`
    },
    {
      name: 'GC Interface',
      icon: '🔹',
      explanation: `**Core Concept:**
• Unified GC interface in Java 11 improves GC architecture
• Clean separation between GC implementation and JVM
• Easier to develop and experiment with new collectors
• Better GC logging, monitoring, and tooling support

**Architectural Improvements:**
• Clear GC Interface - Well-defined API for GC implementations
• Modular Design - GC algorithms as pluggable modules
• Barrier Interface - Standardized read/write barriers
• Memory Management - Unified memory allocation APIs

**Benefits for GC Development:**
• Easier Innovation - Faster to develop new GC algorithms
• Better Testing - Cleaner interface for unit testing
• Code Reuse - Share common GC code across implementations
• Maintainability - Clearer code organization

**Improved Logging:**
• Unified GC Logging - Consistent format across all GCs
• -Xlog:gc* - New logging framework in Java 9+
• Structured Output - Parse-friendly log format
• Detailed Metrics - Comprehensive GC statistics

**Monitoring Enhancements:**
• JMX Beans - Standard GC metrics via JMX
• JFR Events - Flight Recorder GC events
• Tool Integration - Better profiler support
• Real-Time Metrics - Live GC statistics

**Impact on GC Ecosystem:**
• Shenandoah GC - Developed using new interface
• ZGC - Built on unified GC foundation
• Future GCs - Easier to add new collectors
• Third-Party GCs - Cleaner integration path

**Developer Benefits:**
• Consistent API - Same interface across GCs
• Better Documentation - Clear contracts
• Easier Debugging - Cleaner abstractions
• Tool Support - Better IDE and profiler integration

**Production Benefits:**
• More Reliable - Better tested GC code
• Better Monitoring - Comprehensive metrics
• Easier Troubleshooting - Clear logging
• Performance Tuning - Better visibility`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ GC Interface - Implementation
// ═══════════════════════════════════════════════════════════════════════════

import java.lang.management.*;
import java.util.*;

// Unified GC Interface and Monitoring (Java 11+)

public class GCInterfaceDemo {
  public static void main(String[] args) {
    // Access GC information through standard APIs
    printGCInfo();

    System.out.println("\\n--- Running workload ---\\n");

    // Run workload to trigger GC
    runWorkload();

    // Monitor GC after workload
    printGCStats();

    // GC notification listener
    monitorGCEvents();
  }

  static void printGCInfo() {
    List<GarbageCollectorMXBean> gcBeans =
      ManagementFactory.getGarbageCollectorMXBeans();

    System.out.println("Garbage Collectors:");
    for (GarbageCollectorMXBean gcBean : gcBeans) {
      System.out.println("  Name: " + gcBean.getName());
      System.out.println("  Collection count: " +
        gcBean.getCollectionCount());
      System.out.println("  Collection time: " +
        gcBean.getCollectionTime() + "ms");
    }

    // Memory pools
    System.out.println("\\nMemory Pools:");
    for (MemoryPoolMXBean pool :
         ManagementFactory.getMemoryPoolMXBeans()) {
      System.out.println("  " + pool.getName());
      MemoryUsage usage = pool.getUsage();
      System.out.println("    Used: " +
        usage.getUsed() / 1024 / 1024 + "MB");
      System.out.println("    Max: " +
        usage.getMax() / 1024 / 1024 + "MB");
    }
  }

  static void runWorkload() {
    // Generate garbage to trigger GC
    for (int i = 0; i < 10; i++) {
      List<byte[]> temp = new ArrayList<>();
      for (int j = 0; j < 100; j++) {
        temp.add(new byte[1024 * 1024]); // 1MB objects
      }
      // temp becomes garbage
      System.out.println("Iteration " + i + " completed");
    }
  }

  static void printGCStats() {
    System.out.println("\\n--- GC Statistics ---");

    for (GarbageCollectorMXBean gc :
         ManagementFactory.getGarbageCollectorMXBeans()) {
      System.out.println(gc.getName() + ":");
      System.out.println("  Collections: " +
        gc.getCollectionCount());
      System.out.println("  Time: " +
        gc.getCollectionTime() + "ms");

      // Calculate average
      long count = gc.getCollectionCount();
      long time = gc.getCollectionTime();
      if (count > 0) {
        System.out.println("  Avg time: " +
          (time / count) + "ms per collection");
      }
    }

    // Heap memory
    MemoryMXBean memory = ManagementFactory.getMemoryMXBean();
    MemoryUsage heapUsage = memory.getHeapMemoryUsage();

    System.out.println("\\nHeap Memory:");
    System.out.println("  Used: " +
      heapUsage.getUsed() / 1024 / 1024 + "MB");
    System.out.println("  Committed: " +
      heapUsage.getCommitted() / 1024 / 1024 + "MB");
    System.out.println("  Max: " +
      heapUsage.getMax() / 1024 / 1024 + "MB");
  }

  static void monitorGCEvents() {
    // Request GC (hint to JVM)
    System.out.println("\\nRequesting GC...");
    System.gc();

    // Note: System.gc() is just a hint
    // JVM may choose to ignore it

    try {
      Thread.sleep(100);
    } catch (InterruptedException e) {}

    System.out.println("GC request completed");
  }
}

// Unified GC Logging (Java 11+):
// -Xlog:gc:file=gc.log
// -Xlog:gc*:file=gc-detailed.log
// -Xlog:gc+heap=debug

// GC Selection:
// -XX:+UseSerialGC        (Serial)
// -XX:+UseParallelGC      (Parallel)
// -XX:+UseG1GC            (G1, default)
// -XX:+UseZGC             (Z GC, experimental)
// -XX:+UseEpsilonGC       (Epsilon, experimental)
// -XX:+UseShenandoahGC    (Shenandoah, if available)

// Output:
// Garbage Collectors:
//   Name: G1 Young Generation
//   Collection count: 5
//   Collection time: 23ms
//   Name: G1 Old Generation
//   Collection count: 0
//   Collection time: 0ms
// ... (continues with memory pools and workload)`
    }
  ]

  return (
    <div style={{
      padding: '1.5rem',
      maxWidth: '80rem',
      margin: '0 auto',
      background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)',
      color: 'white',
      minHeight: '100vh',
      borderRadius: '16px',
      boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
      border: '3px solid rgba(245, 158, 11, 0.4)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={onBack}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              background: '#f59e0b',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#d97706'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#f59e0b'}
          >
            ← Back to Java
          </button>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '800',
            background: 'linear-gradient(to right, #fbbf24, #f97316)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
            📋 Java 11 Features
          </h1>
          {currentSubcategory && (
            <span style={{
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
              fontWeight: '600',
              backgroundColor: '#dbeafe',
              color: '#1e40af',
              borderRadius: '8px',
              marginLeft: '1rem'
            }}>
              {currentSubcategory}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {onPrevious && (
            <button
              onClick={onPrevious}
              style={{
                padding: '0.75rem 1.25rem',
                fontSize: '1rem',
                fontWeight: '600',
                background: '#2563eb',
                color: 'white',
                border: '1px solid #f59e0b',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#1d4ed8'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#2563eb'}
            >
              ← {previousName}
            </button>
          )}
          {onNext && (
            <button
              onClick={onNext}
              style={{
                padding: '0.75rem 1.25rem',
                fontSize: '1rem',
                fontWeight: '600',
                background: '#2563eb',
                color: 'white',
                border: '1px solid #f59e0b',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#1d4ed8'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#2563eb'}
            >
              {nextName} →
            </button>
          )}
        </div>
      </div>

      <Breadcrumb breadcrumb={activeBreadcrumb} />

      <div style={{
        background: 'linear-gradient(to bottom right, #1f2937, #111827)', padding: '2.5rem 10rem',
        borderRadius: '16px', border: '2px solid #f59e0b', marginBottom: '2rem'
      }}>
        <p style={{
          fontSize: '1.3rem', color: '#d1d5db', fontWeight: '500', margin: 0,
          lineHeight: '1.8', textAlign: 'center'
        }}>
          Discover Java 11 enhancements including var in lambdas, new String methods, HTTP Client API, and performance improvements.
        </p>
      </div>

      {/* Show categories when no category selected */}
      {!selectedCategory ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem'
        }}>
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => {
                setSelectedCategory(category);
                // Set first concept as selected to open modal immediately
                setSelectedConcept(concepts[category.conceptIds[0]]);
              }}
              style={{
                background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                padding: '2.5rem',
                borderRadius: '16px',
                border: '2px solid #f59e0b',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.15)'
                e.currentTarget.style.borderColor = '#fbbf24'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                e.currentTarget.style.borderColor = '#f59e0b'
              }}
            >
              <div style={{ fontSize: '4rem', marginBottom: '1rem', textAlign: 'center' }}>
                {category.icon}
              </div>
              <h3 style={{
                fontSize: '1.75rem',
                fontWeight: '700',
                color: '#fbbf24',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                {category.name}
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#d1d5db',
                lineHeight: '1.6',
                textAlign: 'center'
              }}>
                {category.description}
              </p>
              <div style={{
                marginTop: '1.5rem',
                textAlign: 'center',
                fontSize: '0.9rem',
                color: '#d1d5db',
                fontWeight: '600'
              }}>
                {category.conceptIds.length} topics
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {/* Modal for concept details */}
      {selectedConcept && selectedCategory && (
        <div
          onClick={() => {
            setSelectedConcept(null);
            setSelectedCategory(null);
          }}
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
            zIndex: 1000,
            padding: '2rem'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(to bottom right, #111827, #1f2937)',
              borderRadius: '16px',
              maxWidth: '1400px',
              width: '100%',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              overflow: 'hidden',
              border: '2px solid #f59e0b'
            }}
          >
            {/* Modal Header */}
            <div style={{
              backgroundColor: '#1f2937',
              padding: '1.5rem 2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '2px solid #f59e0b'
            }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#fbbf24',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                {selectedCategory.icon} {selectedCategory.name}
              </h2>
              <button
                onClick={() => {
                  setSelectedConcept(null);
                  setSelectedCategory(null);
                }}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.5rem 1rem',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontWeight: 'bold'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Content with Sidebar */}
            <div style={{
              display: 'flex',
              flex: 1,
              overflow: 'hidden'
            }}>
              {/* Left Sidebar - Concepts List */}
              <div style={{
                width: '300px',
                borderRight: '2px solid #f59e0b',
                overflowY: 'auto',
                backgroundColor: '#1f2937',
                padding: '1.5rem'
              }}>
                {selectedCategory.conceptIds.map((conceptId) => {
                  const concept = concepts[conceptId]
                  const isActive = selectedConcept?.name === concept.name
                  return (
                    <button
                      key={conceptId}
                      onClick={() => handleConceptClick(concept)}
                      style={{
                        width: '100%',
                        padding: '1rem',
                        marginBottom: '0.5rem',
                        backgroundColor: isActive
                          ? '#374151'
                          : '#111827',
                        border: isActive
                          ? '2px solid #f59e0b'
                          : '2px solid #374151',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s ease',
                        fontWeight: isActive ? '700' : '600',
                        color: isActive ? '#fbbf24' : '#d1d5db',
                        fontSize: '0.95rem'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = '#374151'
                          e.currentTarget.style.borderColor = '#f59e0b'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = '#111827'
                          e.currentTarget.style.borderColor = '#374151'
                        }
                      }}
                    >
                      {concept.icon || '🔹'} {concept.name}
                    </button>
                  )
                })}
              </div>

              {/* Right Content Area */}
              <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '2rem',
                backgroundColor: '#111827'
              }}>
                <h2 style={{
                  fontSize: '2.25rem',
                  fontWeight: '700',
                  color: '#fbbf24',
                  marginBottom: '1.5rem'
                }}>
                  {selectedConcept.icon || '🔹'} {selectedConcept.name}
                </h2>

                {/* Description */}
                <div style={{
                  background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                  padding: '2rem',
                  borderRadius: '12px',
                  border: '2px solid #f59e0b',
                  marginBottom: '2rem'
                }}>
                  {selectedConcept.explanation.split('\n\n').map((section, idx) => {
                    // Check if section starts with **Header:**
                    if (section.startsWith('**') && section.includes(':**')) {
                      const headerMatch = section.match(/\*\*(.*?):\*\*/)
                      if (headerMatch) {
                        const header = headerMatch[1]
                        const content = section.substring(headerMatch[0].length).trim()

                        return (
                          <div key={idx} style={{ marginBottom: idx < selectedConcept.explanation.split('\n\n').length - 1 ? '1.5rem' : 0 }}>
                            <h3 style={{
                              fontSize: '1.3rem',
                              fontWeight: '700',
                              color: '#fbbf24',
                              marginBottom: '0.75rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem'
                            }}>
                              <span style={{
                                width: '4px',
                                height: '1.3rem',
                                backgroundColor: '#f59e0b',
                                borderRadius: '2px'
                              }}></span>
                              {header}
                            </h3>
                            <div style={{
                              fontSize: '1.05rem',
                              lineHeight: '1.8',
                              color: '#d1d5db'
                            }}>
                              {content.split('\n').map((line, lineIdx) => {
                                const trimmedLine = line.trim()

                                // Main bullet point (•)
                                if (trimmedLine.startsWith('•')) {
                                  const bulletContent = trimmedLine.substring(1).trim()
                                  // Check if it contains " - " for name-description format
                                  const dashIndex = bulletContent.indexOf(' - ')
                                  if (dashIndex > 0) {
                                    const name = bulletContent.substring(0, dashIndex)
                                    const description = bulletContent.substring(dashIndex + 3)
                                    return (
                                      <div key={lineIdx} style={{
                                        display: 'flex',
                                        gap: '0.5rem',
                                        marginBottom: '0.5rem',
                                        marginLeft: '0.5rem'
                                      }}>
                                        <span style={{
                                          color: '#fbbf24',
                                          fontWeight: 'bold',
                                          minWidth: '0.5rem'
                                        }}>•</span>
                                        <span>
                                          <strong style={{ color: '#fbbf24' }}>{name}</strong>
                                          {' - '}
                                          {description}
                                        </span>
                                      </div>
                                    )
                                  }
                                  return (
                                    <div key={lineIdx} style={{
                                      display: 'flex',
                                      gap: '0.5rem',
                                      marginBottom: '0.5rem',
                                      marginLeft: '0.5rem'
                                    }}>
                                      <span style={{
                                        color: '#fbbf24',
                                        fontWeight: 'bold',
                                        minWidth: '0.5rem'
                                      }}>•</span>
                                      <span>{bulletContent}</span>
                                    </div>
                                  )
                                }

                                // Sub-bullet point (-)
                                if (trimmedLine.startsWith('-')) {
                                  const bulletContent = trimmedLine.substring(1).trim()
                                  return (
                                    <div key={lineIdx} style={{
                                      display: 'flex',
                                      gap: '0.5rem',
                                      marginBottom: '0.4rem',
                                      marginLeft: '2rem'
                                    }}>
                                      <span style={{
                                        color: '#9ca3af',
                                        minWidth: '0.5rem'
                                      }}>◦</span>
                                      <span style={{ color: '#d1d5db' }}>{bulletContent}</span>
                                    </div>
                                  )
                                }

                                // Regular text
                                if (trimmedLine) {
                                  return <p key={lineIdx} style={{ marginBottom: '0.5rem' }}>{line}</p>
                                }
                                return null
                              })}
                            </div>
                          </div>
                        )
                      }
                    }

                    // Regular paragraph
                    return (
                      <p key={idx} style={{
                        fontSize: '1.1rem',
                        color: '#d1d5db',
                        lineHeight: '1.8',
                        marginBottom: idx < selectedConcept.explanation.split('\n\n').length - 1 ? '1rem' : 0
                      }}>
                        {section}
                      </p>
                    )
                  })}
                </div>

                {/* Code Examples */}
                {selectedConcept.codeExample && (() => {
                  const sections = parseCodeSections(selectedConcept.codeExample)
                  return sections.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {sections.map((section, idx) => (
                        <div key={idx} style={{
                          backgroundColor: '#1e293b',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          border: '2px solid #334155'
                        }}>
                          <div style={{
                            padding: '1rem 1.5rem',
                            backgroundColor: '#334155',
                            color: '#60a5fa',
                            fontSize: '1rem',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}>
                            <span>💻 {section.title}</span>
                          </div>
                          <SyntaxHighlighter code={normalizeIndentation(section.code)} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{
                      backgroundColor: '#1e293b',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      border: '2px solid #334155'
                    }}>
                      <SyntaxHighlighter code={normalizeIndentation(selectedConcept.codeExample)} />
                    </div>
                  )
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Java11
