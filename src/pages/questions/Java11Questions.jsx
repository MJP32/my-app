import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

function Java11Questions({ onBack, breadcrumb }) {
  const [expandedQuestion, setExpandedQuestion] = useState(null)

  const renderFormattedAnswer = (text) => {
    const lines = text.split('\n')
    const colors = ['#2563eb', '#7c3aed', '#059669', '#dc2626', '#ea580c', '#0891b2']
    let colorIndex = 0

    return lines.map((line, lineIndex) => {
      const boldMatch = line.match(/^\*\*(.+?):\*\*/)
      if (boldMatch) {
        const color = colors[colorIndex % colors.length]
        colorIndex++
        return (
          <div key={lineIndex} style={{ marginTop: lineIndex > 0 ? '1rem' : 0 }}>
            <span style={{
              fontWeight: '700',
              color: color,
              fontSize: '1.05rem'
            }}>
              {boldMatch[1]}:
            </span>
            {line.substring(boldMatch[0].length)}
          </div>
        )
      }

      const numberedMatch = line.match(/^\*\*(\d+\.\s+.+?):\*\*/)
      if (numberedMatch) {
        const color = colors[colorIndex % colors.length]
        colorIndex++
        return (
          <div key={lineIndex} style={{ marginTop: lineIndex > 0 ? '1rem' : 0 }}>
            <span style={{
              fontWeight: '700',
              color: color,
              fontSize: '1.05rem'
            }}>
              {numberedMatch[1]}:
            </span>
            {line.substring(numberedMatch[0].length)}
          </div>
        )
      }

      return <div key={lineIndex}>{line}</div>
    })
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
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#e0e7ff', minHeight: '100vh' }}>
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
          color: '#1f2937',
          margin: 0
        }}>
          Java 11 Interview Questions
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      <p style={{
        fontSize: '1.1rem',
        color: '#4b5563',
        textAlign: 'center',
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
              backgroundColor: 'white',
              borderRadius: '12px',
              border: `3px solid ${expandedQuestion === q.id ? getCategoryColor(q.category) : '#e5e7eb'}`,
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
                  : 'white',
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
                  e.currentTarget.style.backgroundColor = '#f9fafb'
                }
              }}
              onMouseLeave={(e) => {
                if (expandedQuestion !== q.id) {
                  e.currentTarget.style.backgroundColor = 'white'
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
                  color: '#1f2937',
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
                backgroundColor: '#fafafa',
                borderTop: `2px solid ${getCategoryColor(q.category)}40`
              }}>
                <div style={{
                  fontSize: '1rem',
                  lineHeight: '1.8',
                  color: '#374151',
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
        backgroundColor: '#dbeafe',
        borderRadius: '12px',
        border: '2px solid #3b82f6'
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#1e40af', marginBottom: '0.5rem' }}>
          💡 Java 11 LTS Key Features
        </h3>
        <ul style={{ color: '#1e3a8a', lineHeight: '1.8', margin: '0.5rem 0' }}>
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
