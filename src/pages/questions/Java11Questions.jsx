import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

function Java11Questions({ onBack, breadcrumb }) {
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
      category: 'Local Variable Type Inference',
      question: 'Explain the "var" keyword introduced in Java 11 and its limitations',
      answer: `**var Keyword:**
- Local variable type inference
- Compiler infers type from right-hand side
- Only for local variables (not fields, parameters, or return types)
- Makes code more concise while maintaining strong typing
- Introduced in Java 10, enhanced in Java 11

**Basic Usage:**
\`\`\`java
// Before Java 11
String message = "Hello";
List<String> names = new ArrayList<>();
Map<String, List<Integer>> map = new HashMap<>();

// With var
var message = "Hello";  // String
var names = new ArrayList<String>();  // List<String>
var map = new HashMap<String, List<Integer>>();
\`\`\`

**Where var CAN be used:**
\`\`\`java
// Local variables
var list = new ArrayList<String>();

// For-each loop
for (var item : list) { }

// Traditional for loop
for (var i = 0; i < 10; i++) { }

// Try-with-resources
try (var reader = new FileReader("file.txt")) { }
\`\`\`

**Where var CANNOT be used:**
\`\`\`java
// Class/instance fields - NOT ALLOWED
class MyClass {
    var field = "Hello";  // Compilation error
}

// Method parameters - NOT ALLOWED
public void method(var param) { }  // Compilation error

// Method return type - NOT ALLOWED
public var method() { return "Hello"; }  // Compilation error

// Lambda parameters (before Java 11)
Function<String, String> f = (var s) -> s.toUpperCase();  // OK in Java 11+
\`\`\`

**Java 11 Enhancement - var in Lambda:**
\`\`\`java
// Can use var in lambda parameters for annotations
BiFunction<String, String, String> concat =
    (@NonNull var s1, @NonNull var s2) -> s1 + s2;
\`\`\`

**Limitations:**

**1. Cannot infer from null:**
\`\`\`java
var x = null;  // Error: cannot infer type
\`\`\`

**2. Cannot infer without initializer:**
\`\`\`java
var x;  // Error: cannot use 'var' without initializer
x = "Hello";
\`\`\`

**3. Must initialize with concrete type:**
\`\`\`java
var list = new ArrayList<>();  // Error: cannot infer
var list = new ArrayList<String>();  // OK
\`\`\`

**4. Array initializer:**
\`\`\`java
var array = {1, 2, 3};  // Error
var array = new int[]{1, 2, 3};  // OK
\`\`\`

**Best Practices:**

**Good Use Cases:**
\`\`\`java
// Long generic types
var map = new HashMap<String, List<Integer>>();

// Clear from right-hand side
var path = Paths.get("/tmp/file.txt");
var date = LocalDate.now();

// Try-with-resources
try (var stream = Files.lines(path)) { }
\`\`\`

**Avoid:**
\`\`\`java
// Unclear types
var result = getData();  // What type is result?

// Primitive wrappers
var number = 10;  // int or Integer? (It's int)
\`\`\``
    },
    {
      id: 2,
      category: 'HTTP Client API',
      question: 'Explain the new HTTP Client API introduced in Java 11',
      answer: `**HTTP Client API:**
- Modern replacement for HttpURLConnection
- Supports HTTP/1.1 and HTTP/2
- Synchronous and asynchronous requests
- WebSocket support
- Reactive Streams support
- Better performance and ease of use

**Creating HTTP Client:**
\`\`\`java
// Simple client
HttpClient client = HttpClient.newHttpClient();

// Custom client with configuration
HttpClient client = HttpClient.newBuilder()
    .version(Version.HTTP_2)
    .connectTimeout(Duration.ofSeconds(10))
    .followRedirects(Redirect.NORMAL)
    .build();
\`\`\`

**Synchronous GET Request:**
\`\`\`java
HttpClient client = HttpClient.newHttpClient();

HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/users"))
    .GET()
    .build();

HttpResponse<String> response = client.send(
    request,
    HttpResponse.BodyHandlers.ofString()
);

System.out.println(response.statusCode());  // 200
System.out.println(response.body());  // Response body
\`\`\`

**Asynchronous GET Request:**
\`\`\`java
HttpClient client = HttpClient.newHttpClient();

HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/users"))
    .build();

client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
    .thenApply(HttpResponse::body)
    .thenAccept(System.out::println)
    .join();  // Wait for completion
\`\`\`

**POST Request with JSON:**
\`\`\`java
String json = "{\\"name\\":\\"John\\",\\"age\\":30}";

HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/users"))
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(json))
    .build();

HttpResponse<String> response = client.send(
    request,
    HttpResponse.BodyHandlers.ofString()
);
\`\`\`

**Handling Responses:**
\`\`\`java
// String body
HttpResponse<String> response = client.send(
    request,
    HttpResponse.BodyHandlers.ofString()
);

// File body
HttpResponse<Path> response = client.send(
    request,
    HttpResponse.BodyHandlers.ofFile(Paths.get("/tmp/output.json"))
);

// Stream body
HttpResponse<Stream<String>> response = client.send(
    request,
    HttpResponse.BodyHandlers.ofLines()
);

// Discard body
HttpResponse<Void> response = client.send(
    request,
    HttpResponse.BodyHandlers.discarding()
);
\`\`\`

**Multiple Async Requests:**
\`\`\`java
List<URI> uris = Arrays.asList(
    URI.create("https://api.example.com/user/1"),
    URI.create("https://api.example.com/user/2"),
    URI.create("https://api.example.com/user/3")
);

HttpClient client = HttpClient.newHttpClient();

List<CompletableFuture<String>> futures = uris.stream()
    .map(uri -> client.sendAsync(
        HttpRequest.newBuilder(uri).build(),
        HttpResponse.BodyHandlers.ofString())
        .thenApply(HttpResponse::body))
    .collect(Collectors.toList());

// Wait for all to complete
CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]))
    .join();

// Get all results
futures.stream()
    .map(CompletableFuture::join)
    .forEach(System.out::println);
\`\`\`

**Benefits over HttpURLConnection:**
- Cleaner, more modern API
- HTTP/2 support
- Native async support
- Better error handling
- Request/Response builder pattern
- Reactive Streams support`
    },
    {
      id: 3,
      category: 'String Methods',
      question: 'What new String methods were added in Java 11?',
      answer: `**New String Methods in Java 11:**

**1. isBlank():** Check if string is empty or contains only whitespace
\`\`\`java
"".isBlank();        // true
"  ".isBlank();      // true
" text ".isBlank();  // false

// vs isEmpty()
"".isEmpty();        // true
"  ".isEmpty();      // false (has whitespace)
\`\`\`

**2. lines():** Split string into Stream of lines
\`\`\`java
String multiline = "Line1\\nLine2\\nLine3";

multiline.lines()
    .forEach(System.out::println);

// Count non-empty lines
long count = multiline.lines()
    .filter(line -> !line.isBlank())
    .count();
\`\`\`

**3. strip(), stripLeading(), stripTrailing():** Remove whitespace (Unicode-aware)
\`\`\`java
String text = "  Hello  ";

text.strip();         // "Hello" (removes leading & trailing)
text.stripLeading();  // "Hello  " (removes leading only)
text.stripTrailing(); // "  Hello" (removes trailing only)

// vs trim() - strip() is Unicode-aware
String unicode = "\\u2000Hello\\u2000";  // Unicode space
unicode.trim();   // Still has spaces (trim doesn't recognize Unicode)
unicode.strip();  // "Hello" (strip recognizes all Unicode whitespace)
\`\`\`

**4. repeat(n):** Repeat string n times
\`\`\`java
"Ha".repeat(3);     // "HaHaHa"
"*".repeat(10);     // "**********"
"-".repeat(50);     // 50 dashes

// Practical use: creating separators
String separator = "=".repeat(80);
System.out.println(separator);
\`\`\`

**Comparison with Previous Versions:**

| Method | Java 11 | Before Java 11 |
|--------|---------|----------------|
| Check blank | \`isBlank()\` | \`trim().isEmpty()\` |
| Split lines | \`lines()\` | \`split("\\\\n")\` |
| Remove whitespace | \`strip()\` | \`trim()\` |
| Repeat | \`repeat(n)\` | Custom loop or StringBuilder |

**Real-World Examples:**

**Processing File Lines:**
\`\`\`java
String content = Files.readString(Paths.get("file.txt"));

long nonEmptyLines = content.lines()
    .filter(line -> !line.isBlank())
    .count();
\`\`\`

**Creating Formatted Output:**
\`\`\`java
String title = "Report";
String separator = "=".repeat(title.length());

System.out.println(separator);
System.out.println(title);
System.out.println(separator);
\`\`\`

**Cleaning User Input:**
\`\`\`java
String userInput = "  hello world  ";
String cleaned = userInput.strip();

if (cleaned.isBlank()) {
    System.out.println("Empty input");
}
\`\`\``
    },
    {
      id: 4,
      category: 'File Methods',
      question: 'Explain the new File methods added in Java 11',
      answer: `**New File Methods:**

**1. Files.readString():** Read file as String
\`\`\`java
// Read entire file as String
String content = Files.readString(Paths.get("file.txt"));

// With specific charset
String content = Files.readString(
    Paths.get("file.txt"),
    StandardCharsets.UTF_8
);

// Before Java 11
String content = new String(
    Files.readAllBytes(Paths.get("file.txt")),
    StandardCharsets.UTF_8
);
\`\`\`

**2. Files.writeString():** Write String to file
\`\`\`java
// Write string to file (creates or overwrites)
Files.writeString(
    Paths.get("output.txt"),
    "Hello World"
);

// With charset and options
Files.writeString(
    Paths.get("output.txt"),
    "Hello World",
    StandardCharsets.UTF_8,
    StandardOpenOption.CREATE,
    StandardOpenOption.APPEND
);

// Before Java 11
Files.write(
    Paths.get("output.txt"),
    "Hello World".getBytes(StandardCharsets.UTF_8)
);
\`\`\`

**Complete Example - Read, Process, Write:**
\`\`\`java
// Read file
String content = Files.readString(Paths.get("input.txt"));

// Process (convert to uppercase, filter lines)
String processed = content.lines()
    .map(String::strip)
    .filter(line -> !line.isBlank())
    .map(String::toUpperCase)
    .collect(Collectors.joining("\\n"));

// Write back
Files.writeString(Paths.get("output.txt"), processed);
\`\`\`

**Benefits:**
- Simpler API (one method call instead of multiple)
- Less boilerplate code
- No need to handle byte arrays
- Built-in charset handling
- Better readability`
    },
    {
      id: 5,
      category: 'Advanced',
      question: 'What are the limitations of var in Java 11? When can\'t you use it?',
      answer: `**var Limitations:**

**1. Cannot use in fields:**
\`\`\`java
class User {
    var name = "Alice";  // ❌ Compile error
    private String name = "Alice";  // ✓ Must use explicit type
}
\`\`\`

**2. Cannot use in method parameters:**
\`\`\`java
public void process(var data) {  // ❌ Compile error
    // Must use explicit type
}

public void process(String data) {  // ✓ Correct
    // ...
}
\`\`\`

**3. Cannot use in method return types:**
\`\`\`java
public var getName() {  // ❌ Compile error
    return "Alice";
}

public String getName() {  // ✓ Correct
    return "Alice";
}
\`\`\`

**4. Cannot use without initializer:**
\`\`\`java
var x;  // ❌ Compile error - cannot infer type
x = 10;

var x = 10;  // ✓ Type inferred as int
\`\`\`

**5. Cannot use with null initializer:**
\`\`\`java
var name = null;  // ❌ Compile error - cannot infer type

var name = (String) null;  // ✓ Workaround with cast
String name = null;  // ✓ Better - use explicit type
\`\`\`

**6. Cannot use with lambda without target type:**
\`\`\`java
var func = x -> x * 2;  // ❌ Compile error

Function<Integer, Integer> func = x -> x * 2;  // ✓ Explicit
var func = (Function<Integer, Integer>) (x -> x * 2);  // ✓ With cast
\`\`\`

**7. Cannot use with method references:**
\`\`\`java
var printer = System.out::println;  // ❌ Compile error

Consumer<String> printer = System.out::println;  // ✓ Explicit type
\`\`\`

**8. Cannot use with array initializer:**
\`\`\`java
var numbers = {1, 2, 3};  // ❌ Compile error

var numbers = new int[]{1, 2, 3};  // ✓ With new keyword
int[] numbers = {1, 2, 3};  // ✓ Explicit type
\`\`\`

**9. Diamond operator complications:**
\`\`\`java
// Infers ArrayList<Object> - not what you want!
var list = new ArrayList<>();
list.add("string");
list.add(123);  // Both allowed!

// Better: specify type
var list = new ArrayList<String>();
List<String> list = new ArrayList<>();  // Or explicit
\`\`\`

**10. Problematic with conditional expressions:**
\`\`\`java
var result = condition ? 1 : 2.0;  // Type is double (wider type)
// Might not be what you expect

var result = condition ? "yes" : null;  // ❌ Compile error
// Cannot infer common type
\`\`\`

**Best Practices:**

**Use var when:**
\`\`\`java
// 1. Type is obvious from right-hand side
var user = new User();
var numbers = List.of(1, 2, 3);
var stream = list.stream();

// 2. Reduces verbosity
var connection = DriverManager.getConnection(url, user, password);
// Instead of: Connection connection = ...

// 3. With builder pattern
var request = HttpRequest.newBuilder()
    .uri(URI.create("https://example.com"))
    .build();
\`\`\`

**Avoid var when:**
\`\`\`java
// 1. Type not obvious
var data = getData();  // What type is returned?
SomeType data = getData();  // Clear

// 2. Using with literals that might surprise
var number = 10;  // int, not Integer or long
var flag = true;  // boolean, not Boolean

// 3. Reduces readability
var x = y.process().transform().filter();  // What type is x?
\`\`\`

**Interview Trap Question:**
\`\`\`java
// What's the type of result?
var result = List.of(1, 2, 3).stream()
    .filter(x -> x > 1)
    .toArray();

// Answer: Object[], not Integer[]!
// Better:
Integer[] result = List.of(1, 2, 3).stream()
    .filter(x -> x > 1)
    .toArray(Integer[]::new);
\`\`\``
    },
    {
      id: 6,
      category: 'Advanced',
      question: 'Explain Java 11\'s new HttpClient with async/reactive patterns and performance optimizations',
      answer: `**Advanced HttpClient Features:**

**1. Asynchronous Non-Blocking Requests:**
\`\`\`java
HttpClient client = HttpClient.newBuilder()
    .version(HttpClient.Version.HTTP_2)
    .connectTimeout(Duration.ofSeconds(10))
    .build();

HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/data"))
    .GET()
    .build();

// Async request returns CompletableFuture
CompletableFuture<HttpResponse<String>> future =
    client.sendAsync(request, HttpResponse.BodyHandlers.ofString());

// Non-blocking - continue processing
System.out.println("Request sent, doing other work...");

// Handle response asynchronously
future.thenApply(HttpResponse::body)
      .thenAccept(body -> System.out.println("Response: " + body))
      .exceptionally(ex -> {
          System.err.println("Request failed: " + ex.getMessage());
          return null;
      });
\`\`\`

**2. Multiple Parallel Requests:**
\`\`\`java
List<String> urls = List.of(
    "https://api1.example.com/data",
    "https://api2.example.com/data",
    "https://api3.example.com/data"
);

// Send all requests in parallel
List<CompletableFuture<HttpResponse<String>>> futures = urls.stream()
    .map(url -> HttpRequest.newBuilder()
        .uri(URI.create(url))
        .build())
    .map(request -> client.sendAsync(request,
        HttpResponse.BodyHandlers.ofString()))
    .collect(Collectors.toList());

// Wait for all to complete
CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]))
    .thenRun(() -> {
        futures.forEach(f -> {
            try {
                HttpResponse<String> response = f.get();
                System.out.println("Status: " + response.statusCode());
                System.out.println("Body: " + response.body());
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    });
\`\`\`

**3. Reactive Streaming with Flow API:**
\`\`\`java
// Stream response body as it arrives (don't wait for full response)
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/large-file"))
    .GET()
    .build();

CompletableFuture<HttpResponse<Flow.Publisher<List<ByteBuffer>>>> future =
    client.sendAsync(request, HttpResponse.BodyHandlers.ofPublisher());

future.thenAccept(response -> {
    Flow.Publisher<List<ByteBuffer>> publisher = response.body();

    publisher.subscribe(new Flow.Subscriber<>() {
        private Flow.Subscription subscription;

        @Override
        public void onSubscribe(Flow.Subscription subscription) {
            this.subscription = subscription;
            subscription.request(1);  // Request first chunk
        }

        @Override
        public void onNext(List<ByteBuffer> buffers) {
            // Process chunk as it arrives
            buffers.forEach(buffer -> {
                byte[] bytes = new byte[buffer.remaining()];
                buffer.get(bytes);
                processChunk(bytes);
            });
            subscription.request(1);  // Request next chunk
        }

        @Override
        public void onError(Throwable throwable) {
            System.err.println("Error: " + throwable.getMessage());
        }

        @Override
        public void onComplete() {
            System.out.println("Stream complete");
        }
    });
});
\`\`\`

**4. HTTP/2 Server Push:**
\`\`\`java
HttpClient client = HttpClient.newBuilder()
    .version(HttpClient.Version.HTTP_2)
    .build();

HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://example.com/index.html"))
    .build();

// Handle server push promises
CompletableFuture<HttpResponse<String>> future =
    client.sendAsync(
        request,
        HttpResponse.BodyHandlers.ofString(),
        HttpResponse.PushPromiseHandler.of(
            pushPromise -> {
                System.out.println("Server pushed: " + pushPromise.uri());
                return HttpResponse.BodyHandlers.ofString();
            }
        )
    );
\`\`\`

**5. Connection Pooling and Reuse:**
\`\`\`java
// Single HttpClient instance reuses connections
HttpClient client = HttpClient.newBuilder()
    .version(HttpClient.Version.HTTP_2)
    .connectionPool(ConnectionPool.newBuilder()
        .maxConnections(50)
        .maxConnectionsPerRoute(10)
        .build())
    .build();

// Multiple requests reuse same connection
for (int i = 0; i < 100; i++) {
    client.sendAsync(
        HttpRequest.newBuilder()
            .uri(URI.create("https://api.example.com/data/" + i))
            .build(),
        HttpResponse.BodyHandlers.ofString()
    );
}
// HTTP/2 multiplexing: multiple requests over single TCP connection
\`\`\`

**6. Custom Body Handlers:**
\`\`\`java
// Custom handler to process response incrementally
public class JsonStreamHandler implements HttpResponse.BodyHandler<List<User>> {
    @Override
    public HttpResponse.BodySubscriber<List<User>> apply(HttpResponse.ResponseInfo info) {
        return HttpResponse.BodySubscribers.mapping(
            HttpResponse.BodySubscribers.ofString(),
            body -> parseJsonToUsers(body)
        );
    }

    private List<User> parseJsonToUsers(String json) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.readValue(json,
                new TypeReference<List<User>>() {});
        } catch (JsonProcessingException e) {
            return Collections.emptyList();
        }
    }
}

// Usage
HttpResponse<List<User>> response = client.send(
    request,
    new JsonStreamHandler()
);
\`\`\`

**7. Retry with Exponential Backoff:**
\`\`\`java
public <T> CompletableFuture<HttpResponse<T>> sendWithRetry(
        HttpRequest request,
        HttpResponse.BodyHandler<T> bodyHandler,
        int maxRetries) {

    return sendWithRetryHelper(request, bodyHandler, 0, maxRetries, 1000);
}

private <T> CompletableFuture<HttpResponse<T>> sendWithRetryHelper(
        HttpRequest request,
        HttpResponse.BodyHandler<T> bodyHandler,
        int attempt,
        int maxRetries,
        long delayMs) {

    return client.sendAsync(request, bodyHandler)
        .thenCompose(response -> {
            if (response.statusCode() >= 500 && attempt < maxRetries) {
                // Server error - retry with exponential backoff
                return CompletableFuture.delayedExecutor(
                    delayMs, TimeUnit.MILLISECONDS
                ).execute(() ->
                    sendWithRetryHelper(request, bodyHandler,
                        attempt + 1, maxRetries, delayMs * 2)
                );
            }
            return CompletableFuture.completedFuture(response);
        });
}
\`\`\`

**8. Performance Comparison:**
\`\`\`java
// Old Apache HttpClient (synchronous)
CloseableHttpClient oldClient = HttpClients.createDefault();
long start = System.currentTimeMillis();
for (int i = 0; i < 100; i++) {
    HttpGet request = new HttpGet("https://api.example.com/data");
    oldClient.execute(request);  // Blocking
}
System.out.println("Time: " + (System.currentTimeMillis() - start) + "ms");
// ~10,000ms (sequential, blocking)

// New HttpClient (async, HTTP/2)
HttpClient newClient = HttpClient.newHttpClient();
start = System.currentTimeMillis();
List<CompletableFuture<HttpResponse<String>>> futures = new ArrayList<>();
for (int i = 0; i < 100; i++) {
    futures.add(newClient.sendAsync(
        HttpRequest.newBuilder()
            .uri(URI.create("https://api.example.com/data"))
            .build(),
        HttpResponse.BodyHandlers.ofString()
    ));
}
CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();
System.out.println("Time: " + (System.currentTimeMillis() - start) + "ms");
// ~500ms (parallel, non-blocking, HTTP/2 multiplexing)
\`\`\`

**Performance Benefits:**
- HTTP/2 multiplexing: multiple requests over single connection
- Non-blocking I/O: threads not blocked waiting for response
- Connection reuse: reduces TCP handshake overhead
- Async processing: better resource utilization
- Built-in compression and header optimization`
    },
    {
      id: 7,
      category: 'Advanced',
      question: 'What are Epsilon GC and ZGC introduced in Java 11? When would you use them?',
      answer: `**Epsilon GC (No-Op Garbage Collector):**

**What is it?**
- Garbage collector that does NO garbage collection
- Only allocates memory, never reclaims it
- Application terminates when heap is exhausted

**Enabling Epsilon GC:**
\`\`\`bash
java -XX:+UnlockExperimentalVMOptions \\
     -XX:+UseEpsilonGC \\
     -Xms1g -Xmx1g \\
     MyApp
\`\`\`

**When to use:**

**1. Performance Testing:**
\`\`\`java
// Measure application performance without GC overhead
// Useful for benchmarking pure computation

public class PerformanceTest {
    public static void main(String[] args) {
        // With Epsilon: measures raw performance
        // With G1: includes GC pauses
        long start = System.nanoTime();
        doComputation();
        long end = System.nanoTime();
        System.out.println("Time: " + (end - start) / 1_000_000 + "ms");
    }
}
\`\`\`

**2. Short-Lived Applications:**
\`\`\`bash
# CLI tools that run < 1 second
# No time for GC to kick in anyway
java -XX:+UseEpsilonGC -jar quick-tool.jar

# Lambda functions with guaranteed memory
# Function runs and terminates before heap exhausted
\`\`\`

**3. Memory Pressure Testing:**
\`\`\`java
// Test how application behaves when running out of memory
// Helps identify memory leaks quickly
\`\`\`

**4. Ultra-Low Latency (if memory is abundant):**
\`\`\`java
// Trading systems where ANY GC pause is unacceptable
// Allocate massive heap, restart before exhaustion
\`\`\`

**Example:**
\`\`\`java
public class EpsilonExample {
    public static void main(String[] args) {
        System.out.println("Starting with Epsilon GC");
        List<byte[]> list = new ArrayList<>();

        try {
            while (true) {
                list.add(new byte[1024 * 1024]);  // 1 MB
                System.out.println("Allocated: " + list.size() + " MB");
            }
        } catch (OutOfMemoryError e) {
            System.out.println("Out of memory - no GC happened!");
            System.out.println("Total allocated: " + list.size() + " MB");
        }
    }
}
\`\`\`

**ZGC (Z Garbage Collector):**

**What is it?**
- Scalable low-latency garbage collector
- Pause times < 10ms regardless of heap size
- Supports heaps from 8MB to 16TB
- Concurrent GC (doesn't stop application threads)

**Enabling ZGC:**
\`\`\`bash
# Java 11-14 (experimental)
java -XX:+UnlockExperimentalVMOptions \\
     -XX:+UseZGC \\
     -Xms16g -Xmx16g \\
     MyApp

# Java 15+ (production ready)
java -XX:+UseZGC \\
     -Xms16g -Xmx16g \\
     MyApp
\`\`\`

**ZGC Characteristics:**

**1. Low Pause Times:**
\`\`\`
Traditional GC (G1):
Heap: 4GB  → Pause: 50ms
Heap: 32GB → Pause: 200ms
Heap: 128GB → Pause: 1000ms+

ZGC:
Heap: 4GB   → Pause: <1ms
Heap: 32GB  → Pause: <10ms
Heap: 128GB → Pause: <10ms
Heap: 16TB  → Pause: <10ms  (!)
\`\`\`

**2. Concurrent Operations:**
\`\`\`
ZGC Phase Timeline:
┌────────────────────────────────────┐
│ Pause Mark Start (< 1ms)           │  ← STW
├────────────────────────────────────┤
│ Concurrent Mark (10-100ms)         │  ← App runs
├────────────────────────────────────┤
│ Pause Mark End (< 1ms)             │  ← STW
├────────────────────────────────────┤
│ Concurrent Process References      │  ← App runs
│ Concurrent Relocate (10-100ms)     │  ← App runs
└────────────────────────────────────┘

Total STW time: < 2ms
\`\`\`

**3. Colored Pointers:**
\`\`\`
ZGC uses pointer coloring (metadata in pointer itself)

64-bit pointer:
[42 bits: address][4 bits: metadata][18 bits: unused]

Metadata bits indicate object state:
- Marked
- Finalizable
- Remapped

Allows concurrent relocation without read barriers
\`\`\`

**When to use ZGC:**

**1. Large Heaps:**
\`\`\`java
// Application needs > 32GB heap
// G1 GC would have long pause times
java -XX:+UseZGC -Xmx128g MyApp
\`\`\`

**2. Low Latency Requirements:**
\`\`\`java
// Real-time trading systems
// Interactive applications
// Gaming servers
// Any system where pause > 10ms is unacceptable
\`\`\`

**3. Predictable Latency:**
\`\`\`java
// 99.9th percentile latency < 10ms
// Regardless of heap size or allocation rate
\`\`\`

**ZGC Configuration:**
\`\`\`bash
# Basic ZGC
java -XX:+UseZGC -Xmx32g MyApp

# Set concurrent GC threads
java -XX:+UseZGC -XX:ConcGCThreads=4 -Xmx32g MyApp

# Enable detailed logging
java -XX:+UseZGC \\
     -Xlog:gc*:file=gc.log \\
     -Xmx32g MyApp

# Tune for latency
java -XX:+UseZGC \\
     -XX:ZAllocationSpikeTolerance=5 \\
     -Xmx32g MyApp
\`\`\`

**Monitoring ZGC:**
\`\`\`java
// JMX monitoring
MBeanServer mbs = ManagementFactory.getPlatformMBeanServer();
ObjectName name = new ObjectName("java.lang:type=GarbageCollector,name=ZGC");

// Get pause time
long pauseTime = (Long) mbs.getAttribute(name, "CollectionTime");
System.out.println("ZGC pause time: " + pauseTime + "ms");
\`\`\`

**Performance Comparison:**
\`\`\`
Benchmark: 64GB heap, high allocation rate

G1 GC:
├── Average pause: 150ms
├── Max pause: 500ms
├── Throughput: 95%

ZGC:
├── Average pause: 2ms
├── Max pause: 8ms
├── Throughput: 98%

Epsilon (no GC):
├── Pause: 0ms
├── Throughput: 100%
└── Crashes after ~10 seconds (OOM)
\`\`\`

**Limitations:**

**Epsilon:**
- No garbage collection at all
- Heap exhaustion = crash
- Not for long-running applications

**ZGC:**
- Higher memory overhead (~10-20%)
- Requires more CPU for concurrent work
- Not ideal for small heaps (< 8GB)
- Write barriers add slight overhead

**Choosing the right GC:**
\`\`\`
G1 (default): Balanced, works for most applications
ZGC: Large heaps (>32GB) or low latency requirements
Epsilon: Benchmarking, short-lived apps, memory testing
Shenandoah: Alternative to ZGC (similar characteristics)
Serial: Single-threaded, small heaps, client apps
Parallel: High throughput, batch processing
\`\`\``
    },
    {
      id: 8,
      category: 'Advanced',
      question: 'Explain Java 11 Nest-Based Access Control and why it matters',
      answer: `**Nest-Based Access Control:**

**Problem Before Java 11:**
\`\`\`java
public class Outer {
    private int outerField = 10;

    class Inner {
        private int innerField = 20;

        void accessOuter() {
            // Can access outer's private field
            System.out.println(outerField);  // Works
        }
    }

    void accessInner() {
        Inner inner = new Inner();
        // Can access inner's private field
        System.out.println(inner.innerField);  // Works
    }
}
\`\`\`

**What Java 11 compiler used to generate (Java 8-10):**
\`\`\`java
// Compiler generated synthetic bridge methods:
public class Outer {
    private int outerField = 10;

    // Synthetic accessor (package-private)
    static int access$000(Outer outer) {
        return outer.outerField;  // Bridge method
    }

    class Inner {
        private int innerField = 20;

        // Synthetic accessor (package-private)
        static int access$100(Inner inner) {
            return inner.innerField;  // Bridge method
        }
    }
}

// Problems:
// 1. Extra methods bloat class file
// 2. Performance overhead (extra method calls)
// 3. Reflection sees synthetic methods
// 4. Security: package-private methods can be called by any class in package
\`\`\`

**Java 11 Solution - Nest-Based Access:**
\`\`\`java
// No synthetic bridge methods generated!
// JVM natively understands nested classes

// Check nest membership
class Outer {
    class Inner {}

    public static void main(String[] args) {
        System.out.println(Outer.class.getNestHost());
        // Output: class Outer

        System.out.println(Inner.class.getNestHost());
        // Output: class Outer (same nest host!)

        System.out.println(Arrays.toString(Outer.class.getNestMembers()));
        // Output: [class Outer, class Outer$Inner]

        System.out.println(Outer.class.isNestmateOf(Inner.class));
        // Output: true
    }
}
\`\`\`

**Benefits:**

**1. No Synthetic Bridge Methods:**
\`\`\`bash
# Java 8-10
javap -p Outer.class
# Shows: access$000, access$100 (synthetic methods)

# Java 11+
javap -p Outer.class
# No synthetic methods! Cleaner bytecode
\`\`\`

**2. Better Performance:**
\`\`\`java
// Before Java 11: indirect access via bridge method
inner.innerField  →  Outer.access$100(inner)  →  inner.innerField
// Two steps

// Java 11+: direct access
inner.innerField  →  inner.innerField
// One step, faster
\`\`\`

**3. Reflection Improvements:**
\`\`\`java
public class ReflectionExample {
    private static class Inner {
        private int value = 42;
    }

    public static void main(String[] args) throws Exception {
        Inner inner = new Inner();
        Field field = Inner.class.getDeclaredField("value");

        // Before Java 11: synthetic methods appear in reflection
        Method[] methods = Inner.class.getDeclaredMethods();
        // Contains access$xxx synthetic methods

        // Java 11+: cleaner reflection
        Method[] methods = Inner.class.getDeclaredMethods();
        // No synthetic accessor methods!

        // Still need setAccessible for private fields
        field.setAccessible(true);
        System.out.println(field.get(inner));  // 42
    }
}
\`\`\`

**4. Security Improvements:**
\`\`\`java
// Before Java 11:
// Synthetic bridge methods were package-private
// Any class in same package could call them!

package com.example;

public class Outer {
    private int secret = 42;

    class Inner {
        void access() {
            System.out.println(secret);  // Generates access$000(Outer)
        }
    }
}

// Attacker class in same package:
package com.example;

public class Attacker {
    public static void main(String[] args) {
        Outer outer = new Outer();
        // Could call synthetic bridge method!
        int stolen = Outer.access$000(outer);  // Accessed private field!
        System.out.println("Stolen: " + stolen);
    }
}

// Java 11+: No synthetic methods → no security hole
\`\`\`

**Nest Attributes in Class File:**
\`\`\`bash
# View nest information
javap -v Outer.class

# Shows NestHost attribute:
NestHost: class Outer

# Shows NestMembers attribute:
NestMembers:
  Outer$Inner
  Outer$AnotherInner
\`\`\`

**Advanced: Checking Nest Membership:**
\`\`\`java
public class NestChecker {
    private static class Inner1 {
        private static class Nested {}
    }

    private static class Inner2 {}

    public static void main(String[] args) {
        // All share same nest host
        System.out.println(NestChecker.class.getNestHost());  // NestChecker
        System.out.println(Inner1.class.getNestHost());       // NestChecker
        System.out.println(Inner2.class.getNestHost());       // NestChecker
        System.out.println(Inner1.Nested.class.getNestHost()); // NestChecker

        // Check if nestmates
        System.out.println(Inner1.class.isNestmateOf(Inner2.class));  // true
        System.out.println(Inner1.class.isNestmateOf(String.class));  // false

        // Get all nest members
        Class<?>[] members = NestChecker.class.getNestMembers();
        // [NestChecker, Inner1, Inner1$Nested, Inner2]
    }
}
\`\`\`

**Performance Impact:**
\`\`\`java
// Microbenchmark: access inner class private field 1M times

// Java 8-10 (with synthetic bridge):
// Time: 15ms
// Bytecode:
//   aload_1
//   invokestatic access$000  ← Extra method call
//   ireturn

// Java 11+ (nest-based):
// Time: 8ms (47% faster!)
// Bytecode:
//   aload_1
//   getfield innerField  ← Direct access
//   ireturn
\`\`\`

**Use Cases:**

**1. Framework Development:**
\`\`\`java
// Dependency injection frameworks
// Need to access private fields in nested classes
// Faster with nest-based access

@Service
public class UserService {
    @Repository
    private class UserRepository {  // Private nested class
        private EntityManager em;  // Private field
    }

    // Framework uses reflection to inject dependencies
    // Java 11+: faster, cleaner reflection
}
\`\`\`

**2. Security-Sensitive Code:**
\`\`\`java
// No synthetic bridge methods = smaller attack surface
public class CryptoHandler {
    private byte[] secretKey = generateKey();

    private class KeyManager {
        byte[] getKey() {
            return secretKey;  // Direct access, no bridge method
        }
    }

    // Before Java 11: access$000(CryptoHandler) could be called
    // Java 11+: No bridge method, more secure
}
\`\`\`

**Summary:**
- Nest-based access = JVM-level support for nested classes
- No synthetic bridge methods generated
- Better performance, security, and cleaner bytecode
- Transparent to developers (automatic in Java 11+)
- Matters for framework developers and security`
    }
  ]

  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id)
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Local Variable Type Inference': '#f59e0b',
      'HTTP Client API': '#3b82f6',
      'String Methods': '#8b5cf6',
      'File Methods': '#10b981'
    }
    return colors[category] || '#6b7280'
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
          Java 11 Interview Questions
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu} />

      <p style={{
        fontSize: '1.1rem',
        color: '#d1d5db',
        textAlign: 'left',
        marginBottom: '2rem',
        lineHeight: '1.6'
      }}>
        Java 11 LTS interview questions covering var keyword, HTTP Client API, new String and File methods.
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
                ? '0 8px 16px rgba(0,0,0,0.3)'
                : '0 2px 8px rgba(0,0,0,0.2)'
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
                <div style={{
                  display: 'inline-block',
                  padding: '0.25rem 0.75rem',
                  backgroundColor: getCategoryColor(q.category),
                  color: 'white',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem'
                }}>
                  {q.category}
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
          Java 11 LTS Key Features
        </h3>
        <ul style={{ color: '#d1d5db', lineHeight: '1.8', margin: '0.5rem 0' }}>
          <li>Long-Term Support (LTS) Release</li>
          <li>Local Variable Type Inference (var) enhancements</li>
          <li>New HTTP Client API (standardized)</li>
          <li>New String methods (isBlank, lines, strip, repeat)</li>
          <li>New File methods (readString, writeString)</li>
          <li>Launch single-file programs without compilation</li>
        </ul>
      </div>
    </div>
  )
}

export default Java11Questions
