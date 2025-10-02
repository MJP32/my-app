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

function Java11({ onBack }) {
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
      name: 'var Keyword',
      icon: '🔹',
      explanation: `Introduced in Java 10 and enhanced in Java 11, the var keyword enables local variable type inference. The compiler automatically infers the type from the initializer, reducing boilerplate while maintaining strong static typing. Works with local variables, for-loops, and try-with-resources.`,
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
      explanation: `Java 11 allows var in lambda expressions for parameters, enabling the use of annotations on inferred types. This provides consistency between different contexts where var can be used while maintaining type safety.`,
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
      explanation: `Use var when the type is obvious from the right-hand side, improving readability. Avoid when it makes code less clear. Combine with meaningful variable names. Works best with complex generic types and diamond operators.`,
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
      explanation: `Cannot be used for fields, method parameters, or return types. Requires initialization at declaration. Not available for variables initialized to null. Must have a clear and unambiguous type that can be inferred.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Limitations - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// VALID: Local variable with initialization
public void method() {
  var name = "John";  // OK
}

// INVALID: Cannot use for fields
public class Example {
  // var count = 0;  // Compile error!
  private int count = 0;  // Must specify type
}

// INVALID: Cannot use for method parameters
// public void process(var data) { }  // Compile error!
public void process(String data) { }  // Must specify type

// INVALID: Cannot use for return types
// public var getData() { }  // Compile error!
public String getData() { return "data"; }

// INVALID: Must initialize
public void test() {
  // var x;  // Compile error!
  var x = 10;  // OK
}

// INVALID: Cannot initialize to null
public void nullTest() {
  // var value = null;  // Compile error!
  String value = null;  // OK with explicit type
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
      explanation: `Native support for HTTP/2 protocol with multiplexing, server push, and header compression. Provides better performance than legacy HttpURLConnection. Includes automatic connection pooling and redirect handling.`,
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
      explanation: `Built-in support for asynchronous and synchronous requests using CompletableFuture. Non-blocking I/O operations for better resource utilization. Supports request and response timeouts with fine-grained control.`,
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
      explanation: `Native WebSocket client implementation for bidirectional communication. Supports text and binary messages, ping/pong frames, and connection lifecycle management with automatic reconnection strategies.`,
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
      explanation: `Fluent builder API for constructing HTTP requests with headers, body, and method. Flexible response handling with BodyHandlers for strings, files, streams, and custom processors. Cookie management and authentication support.`,
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
      explanation: `isBlank() checks if string is empty or contains only whitespace. strip(), stripLeading(), and stripTrailing() remove Unicode whitespace, superior to trim() which only handles ASCII.`,
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
      explanation: `lines() method returns a Stream<String> of lines extracted from the string, split by line terminators. Enables functional processing of multi-line strings with Stream API operations.`,
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
      explanation: `repeat(int count) method returns a string whose value is the concatenation of this string repeated count times. Efficient implementation for string duplication without manual loops.`,
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
      explanation: `Enhanced Unicode support for string operations. Better handling of surrogate pairs and Unicode whitespace characters. Improved normalization and comparison methods for international text.`,
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
      explanation: `Production-grade profiling tool with minimal performance impact (<1% overhead). Continuously collects diagnostic and profiling data about the running JVM and Java application for performance analysis.`,
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
      explanation: `Records events like GC pauses, thread locks, I/O operations, exceptions, and method profiling. Custom events can be created for application-specific monitoring. Circular buffer keeps recent data.`,
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
      explanation: `Rich data format analyzable with JDK Mission Control (JMC). Provides insights into CPU usage, memory allocation, synchronization bottlenecks, and I/O performance. Supports automated issue detection.`,
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
      explanation: `Now free and open-sourced in Java 11 (previously commercial). Designed for continuous use in production environments. Integrates with monitoring tools and can be triggered on-demand or scheduled.`,
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
      explanation: `Convenient methods to read entire file content as a String and write String to file. Files.readString(Path) and Files.writeString(Path, String) simplify common file operations without verbose Stream handling.`,
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
      explanation: `Enhanced Path API with better methods for file and directory manipulation. Improved error handling and atomic operations. Support for file attributes and metadata access.`,
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
      explanation: `Better handling of different character encodings and Unicode text files. Explicit charset specification prevents encoding issues. BOM (Byte Order Mark) detection and handling.`,
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
      explanation: `Optimized implementations for reading and writing files. Memory-efficient processing of large files. Better buffer management and reduced system call overhead.`,
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
      explanation: `Collection.toArray(IntFunction<T[]>) allows creating arrays of the correct type without reflection. More convenient and type-safe than the older toArray(T[]) method. Reduces boilerplate code.`,
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
      explanation: `List.of(), Set.of(), and Map.of() create immutable collections (from Java 9). Java 11 continues this pattern with better performance and null-hostile behavior. Compact memory footprint.`,
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
      explanation: `Predicate.not() method provides negation of predicates in a more readable way when used with method references. Improves Stream API expressiveness and functional programming style.`,
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
      explanation: `Optional.isEmpty() method complements isPresent() for more readable code. Better integration with Stream API and functional programming patterns.`,
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
      explanation: `New reflection APIs to work with nests: Class.getNestHost(), Class.getNestMembers(), and Class.isNestmateOf(). Enables runtime introspection of nest membership and access control.`,
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
      explanation: `Eliminates need for compiler-generated bridge methods for private access between nested classes. Reduces class file size and improves startup time. Better JIT optimization opportunities.`,
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
      explanation: `More aligned with JVM access control model. Closes security vulnerabilities related to synthetic bridge methods. Provides clearer semantics for private access within class hierarchies.`,
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
      explanation: `Experimental Z Garbage Collector for low-latency applications. Sub-millisecond pause times regardless of heap size. Concurrent garbage collection with minimal stop-the-world phases.`,
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
      explanation: `Unified GC interface for better GC implementation and experimentation. Allows for easier development of new garbage collectors. Improved GC logging and monitoring capabilities.`,
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
          📋 Java 11 Features
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
          Discover Java 11 enhancements including var in lambdas, new String methods, HTTP Client API, and performance improvements.
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

export default Java11
