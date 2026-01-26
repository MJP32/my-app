/**
 * Java 11 Features Page
 *
 * Converted to tab_template format with:
 * - JAVA11_COLORS constant (purple theme #8b5cf6)
 * - SUBTOPIC_COLORS array
 * - SVG diagram components for key features
 * - Modal-based navigation with concepts and details
 * - Breadcrumb integration
 * - Keyboard navigation
 * - SyntaxHighlighter with vscDarkPlus
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const JAVA11_COLORS = {
  primary: '#a78bfa',
  primaryHover: '#c4b5fd',
  bg: 'rgba(139, 92, 246, 0.1)',
  border: 'rgba(139, 92, 246, 0.3)',
  arrow: '#8b5cf6',
  hoverBg: 'rgba(139, 92, 246, 0.2)',
  topicBg: 'rgba(139, 92, 246, 0.2)'
}

const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
]

// =============================================================================
// DIAGRAM COMPONENTS
// =============================================================================

const VarInferenceDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead-var" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Local Variable Type Inference
    </text>
    <rect x="50" y="60" width="150" height="60" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="125" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">var declaration</text>
    <text x="125" y="105" textAnchor="middle" fill="#e0e7ff" fontSize="10">var x = value</text>
    <rect x="280" y="60" width="150" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="355" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Compiler Inference</text>
    <text x="355" y="105" textAnchor="middle" fill="#dbeafe" fontSize="10">Analyzes RHS type</text>
    <rect x="510" y="60" width="150" height="60" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="585" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Static Type</text>
    <text x="585" y="105" textAnchor="middle" fill="#dcfce7" fontSize="10">Full type safety</text>
    <line x1="200" y1="90" x2="275" y2="90" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowhead-var)"/>
    <line x1="430" y1="90" x2="505" y2="90" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowhead-var)"/>
    <text x="237" y="80" textAnchor="middle" fill="#94a3b8" fontSize="9">infer</text>
    <text x="467" y="80" textAnchor="middle" fill="#94a3b8" fontSize="9">assign</text>
    <rect x="200" y="150" width="400" height="35" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="400" y="172" textAnchor="middle" fill="#a78bfa" fontSize="11">Works with: locals, for-loops, try-with-resources, lambda params (Java 11)</text>
  </svg>
)

const HttpClientDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead-http" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      HTTP Client API Architecture
    </text>
    <rect x="50" y="50" width="120" height="70" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="110" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">HttpClient</text>
    <text x="110" y="100" textAnchor="middle" fill="#dbeafe" fontSize="9">HTTP/2 + HTTP/1.1</text>
    <rect x="220" y="50" width="120" height="70" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="280" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">HttpRequest</text>
    <text x="280" y="100" textAnchor="middle" fill="#e0e7ff" fontSize="9">Builder Pattern</text>
    <rect x="390" y="50" width="120" height="70" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="450" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">HttpResponse</text>
    <text x="450" y="100" textAnchor="middle" fill="#dcfce7" fontSize="9">BodyHandlers</text>
    <rect x="560" y="50" width="120" height="70" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="620" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">WebSocket</text>
    <text x="620" y="100" textAnchor="middle" fill="#fef3c7" fontSize="9">Bidirectional</text>
    <line x1="170" y1="85" x2="215" y2="85" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead-http)"/>
    <line x1="340" y1="85" x2="385" y2="85" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead-http)"/>
    <line x1="510" y1="85" x2="555" y2="85" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead-http)"/>
    <rect x="150" y="150" width="500" height="55" rx="8" fill="rgba(59, 130, 246, 0.15)" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1"/>
    <text x="400" y="172" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Key Features</text>
    <text x="400" y="192" textAnchor="middle" fill="#94a3b8" fontSize="10">Async support | CompletableFuture | Connection pooling | Redirect handling</text>
  </svg>
)

const StringMethodsDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      New String Methods in Java 11
    </text>
    <rect x="50" y="50" width="140" height="55" rx="8" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="120" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">isBlank()</text>
    <text x="120" y="92" textAnchor="middle" fill="#d1fae5" fontSize="9">Empty or whitespace</text>
    <rect x="210" y="50" width="140" height="55" rx="8" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="280" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">strip()</text>
    <text x="280" y="92" textAnchor="middle" fill="#d1fae5" fontSize="9">Unicode whitespace</text>
    <rect x="370" y="50" width="140" height="55" rx="8" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="440" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">lines()</text>
    <text x="440" y="92" textAnchor="middle" fill="#d1fae5" fontSize="9">Stream of lines</text>
    <rect x="530" y="50" width="140" height="55" rx="8" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="600" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">repeat(n)</text>
    <text x="600" y="92" textAnchor="middle" fill="#d1fae5" fontSize="9">Repeat string n times</text>
    <rect x="100" y="130" width="250" height="50" rx="6" fill="rgba(16, 185, 129, 0.15)" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="1"/>
    <text x="225" y="152" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">stripLeading() / stripTrailing()</text>
    <text x="225" y="168" textAnchor="middle" fill="#94a3b8" fontSize="9">Directional whitespace removal</text>
    <rect x="380" y="130" width="250" height="50" rx="6" fill="rgba(16, 185, 129, 0.15)" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="1"/>
    <text x="505" y="152" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">Full Unicode Support</text>
    <text x="505" y="168" textAnchor="middle" fill="#94a3b8" fontSize="9">Handles all Unicode whitespace chars</text>
  </svg>
)

const JFRDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead-jfr" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Java Flight Recorder Architecture
    </text>
    <rect x="50" y="50" width="130" height="65" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="115" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">JVM Events</text>
    <text x="115" y="95" textAnchor="middle" fill="#fef3c7" fontSize="9">GC, CPU, Memory</text>
    <rect x="220" y="50" width="130" height="65" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="285" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Recording</text>
    <text x="285" y="95" textAnchor="middle" fill="#fef3c7" fontSize="9">Circular buffer</text>
    <rect x="390" y="50" width="130" height="65" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="455" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">.jfr File</text>
    <text x="455" y="95" textAnchor="middle" fill="#fef3c7" fontSize="9">Binary format</text>
    <rect x="560" y="50" width="130" height="65" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="625" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">JMC Analysis</text>
    <text x="625" y="95" textAnchor="middle" fill="#fef3c7" fontSize="9">Flame graphs</text>
    <line x1="180" y1="82" x2="215" y2="82" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowhead-jfr)"/>
    <line x1="350" y1="82" x2="385" y2="82" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowhead-jfr)"/>
    <line x1="520" y1="82" x2="555" y2="82" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowhead-jfr)"/>
    <rect x="100" y="140" width="600" height="60" rx="8" fill="rgba(245, 158, 11, 0.15)" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="1"/>
    <text x="400" y="162" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Production-Ready Profiling</text>
    <text x="400" y="182" textAnchor="middle" fill="#94a3b8" fontSize="10">Less than 1% overhead | Free in Java 11+ | Custom events | Always-on monitoring</text>
  </svg>
)

const FilesAPIDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead-files" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ec4899" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Files API Convenience Methods
    </text>
    <rect x="100" y="50" width="150" height="55" rx="8" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="175" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Files.readString()</text>
    <text x="175" y="92" textAnchor="middle" fill="#fce7f3" fontSize="9">File to String</text>
    <rect x="300" y="50" width="150" height="55" rx="8" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="375" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Files.writeString()</text>
    <text x="375" y="92" textAnchor="middle" fill="#fce7f3" fontSize="9">String to File</text>
    <rect x="500" y="50" width="150" height="55" rx="8" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="575" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Path.of()</text>
    <text x="575" y="92" textAnchor="middle" fill="#fce7f3" fontSize="9">Create paths easily</text>
    <line x1="250" y1="77" x2="295" y2="77" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrowhead-files)"/>
    <line x1="450" y1="77" x2="495" y2="77" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrowhead-files)"/>
    <rect x="150" y="125" width="500" height="40" rx="6" fill="rgba(236, 72, 153, 0.15)" stroke="rgba(236, 72, 153, 0.3)" strokeWidth="1"/>
    <text x="400" y="150" textAnchor="middle" fill="#f472b6" fontSize="11">UTF-8 default | Charset support | One-liner file operations</text>
  </svg>
)

const CollectionsDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Collection and Optional Enhancements
    </text>
    <rect x="50" y="50" width="160" height="55" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="130" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">toArray(T[]::new)</text>
    <text x="130" y="92" textAnchor="middle" fill="#fecaca" fontSize="9">Type-safe arrays</text>
    <rect x="240" y="50" width="160" height="55" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="320" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">List/Set/Map.of()</text>
    <text x="320" y="92" textAnchor="middle" fill="#fecaca" fontSize="9">Immutable factories</text>
    <rect x="430" y="50" width="160" height="55" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="510" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Predicate.not()</text>
    <text x="510" y="92" textAnchor="middle" fill="#fecaca" fontSize="9">Negate predicates</text>
    <rect x="620" y="50" width="130" height="55" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="685" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Optional.isEmpty()</text>
    <text x="685" y="92" textAnchor="middle" fill="#fecaca" fontSize="9">Check absence</text>
    <rect x="150" y="125" width="500" height="40" rx="6" fill="rgba(239, 68, 68, 0.15)" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="1"/>
    <text x="400" y="150" textAnchor="middle" fill="#f87171" fontSize="11">Improved APIs for functional programming patterns</text>
  </svg>
)

const NestAccessDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead-nest" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f97316" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Nest-Based Access Control
    </text>
    <rect x="200" y="50" width="400" height="100" rx="10" fill="rgba(249, 115, 22, 0.15)" stroke="#f97316" strokeWidth="2" strokeDasharray="5,5"/>
    <text x="400" y="70" textAnchor="middle" fill="#f97316" fontSize="12" fontWeight="bold">Nest (Same Source File)</text>
    <rect x="220" y="85" width="120" height="50" rx="6" fill="#f97316" stroke="#fb923c" strokeWidth="2"/>
    <text x="280" y="115" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Outer Class</text>
    <rect x="360" y="85" width="100" height="50" rx="6" fill="#f97316" stroke="#fb923c" strokeWidth="2"/>
    <text x="410" y="115" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Inner 1</text>
    <rect x="480" y="85" width="100" height="50" rx="6" fill="#f97316" stroke="#fb923c" strokeWidth="2"/>
    <text x="530" y="115" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Inner 2</text>
    <path d="M 340 110 L 355 110" stroke="#fb923c" strokeWidth="2" markerEnd="url(#arrowhead-nest)"/>
    <path d="M 460 110 L 475 110" stroke="#fb923c" strokeWidth="2" markerEnd="url(#arrowhead-nest)"/>
    <rect x="150" y="165" width="500" height="30" rx="6" fill="rgba(249, 115, 22, 0.15)" stroke="rgba(249, 115, 22, 0.3)" strokeWidth="1"/>
    <text x="400" y="185" textAnchor="middle" fill="#fb923c" fontSize="10">Direct private access | No synthetic bridges | Better security</text>
  </svg>
)

const ZGCDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Z Garbage Collector (ZGC)
    </text>
    <rect x="50" y="50" width="180" height="60" rx="8" fill="#6366f1" stroke="#818cf8" strokeWidth="2"/>
    <text x="140" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Low Latency</text>
    <text x="140" y="95" textAnchor="middle" fill="#e0e7ff" fontSize="10">&lt;10ms pause times</text>
    <rect x="260" y="50" width="180" height="60" rx="8" fill="#6366f1" stroke="#818cf8" strokeWidth="2"/>
    <text x="350" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Scalable</text>
    <text x="350" y="95" textAnchor="middle" fill="#e0e7ff" fontSize="10">8MB to 16TB heaps</text>
    <rect x="470" y="50" width="180" height="60" rx="8" fill="#6366f1" stroke="#818cf8" strokeWidth="2"/>
    <text x="560" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Concurrent</text>
    <text x="560" y="95" textAnchor="middle" fill="#e0e7ff" fontSize="10">Minimal stop-the-world</text>
    <rect x="100" y="130" width="600" height="55" rx="8" fill="rgba(99, 102, 241, 0.15)" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="1"/>
    <text x="400" y="152" textAnchor="middle" fill="#818cf8" fontSize="11" fontWeight="bold">Use Cases</text>
    <text x="400" y="172" textAnchor="middle" fill="#94a3b8" fontSize="10">Low-latency trading | Real-time analytics | Large heap applications</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function Java11({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'var-inference',
      name: 'Local Variable Type Inference',
      icon: '🔹',
      color: '#8b5cf6',
      description: 'Enhanced var keyword for local variable type inference and lambda parameters',
      diagram: VarInferenceDiagram,
      details: [
        {
          name: 'var Keyword',
          explanation: 'Local variable type inference introduced in Java 10 and enhanced in Java 11. The compiler automatically infers type from the initializer expression. This reduces boilerplate code while maintaining strong static typing. The type is determined at compile time from the right-hand side expression - it is still statically typed, NOT dynamic typing. Works with local variables, for-loops, try-with-resources, and lambda parameters (new in Java 11).',
          codeExample: `// Basic var usage - type inference
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
}`
        },
        {
          name: 'Lambda Parameters',
          explanation: 'Java 11 extended var to work with lambda expression parameters. This enables annotations on inferred parameter types in lambdas and provides consistency between var usage in methods and lambdas. The main reason for this feature is annotation support - you can apply annotations like @NonNull, @Nullable to lambda parameters. You must use var for ALL parameters or NONE - mixing is not allowed.',
          codeExample: `// Java 11: var in lambda parameters
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

// Multiple parameters with var
BiPredicate<String, Integer> checker = (var str, var len) ->
    str.length() > len;

// Note: Either all parameters use var or none
// Valid: (var x, var y) -> x + y
// Invalid: (var x, y) -> x + y`
        },
        {
          name: 'Best Practices',
          explanation: 'Use var when type is obvious from right-hand side expression. This improves readability by reducing visual clutter, but focus on clear, descriptive variable names. Use var for complex generic types, constructor calls, factory methods, builder patterns, and for-loops. Avoid var when types are unclear, for primitive promotions where the specific type matters, and in public APIs where explicit types serve as documentation.',
          codeExample: `// GOOD: Type is clear from right side
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
    .map(x -> x * 2);`
        },
        {
          name: 'Limitations',
          explanation: 'var is ONLY for local variables - not fields, parameters, or return types. It requires initialization at declaration and cannot be initialized to null without a cast. Cannot use for class fields, method parameters, method return types, constructor parameters, or exception catches. Array initializers need explicit type (var arr = new int[]{1, 2, 3}).',
          codeExample: `// VALID: Local variable with initialization
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

// INVALID: Must initialize
// var x;  // Compile error!
var x = 10;  // OK

// INVALID: Cannot initialize to null
// var value = null;  // Compile error!
String value = null;  // OK with explicit type

// VALID: var with null cast
var nullValue = (String) null;  // OK - type is String

// INVALID: Lambda without context
// var lambda = x -> x * 2;  // Compile error!
Function<Integer, Integer> lambda = x -> x * 2;  // OK`
        }
      ]
    },
    {
      id: 'http-client',
      name: 'HTTP Client API',
      icon: '🌐',
      color: '#3b82f6',
      description: 'Modern HTTP/2 client with async operations and WebSocket support',
      diagram: HttpClientDiagram,
      details: [
        {
          name: 'Modern HTTP/2',
          explanation: 'Native HTTP/2 client introduced in Java 11 as standard API. Replaces legacy HttpURLConnection with modern, fluent API. Full HTTP/2 protocol support with multiplexing, server push, header compression, stream prioritization, and binary protocol. Features include connection pooling, redirect handling, cookie management, authentication, and proxy support.',
          codeExample: `import java.net.http.*;
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
    .build();`
        },
        {
          name: 'Async Operations',
          explanation: 'Built-in asynchronous HTTP operations using CompletableFuture. Non-blocking I/O for better resource utilization and scalability. Both sync (send) and async (sendAsync) methods available. sendAsync returns CompletableFuture for composition - chain operations with thenApply(), thenAccept(), thenCompose(). Combine multiple requests with allOf(), anyOf().',
          codeExample: `HttpClient client = HttpClient.newBuilder()
    .connectTimeout(Duration.ofSeconds(10))
    .build();

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
CompletableFuture.allOf(future1, future2).join();`
        },
        {
          name: 'WebSocket Support',
          explanation: 'Native WebSocket client implementation introduced in Java 11. Full-duplex bidirectional communication over single TCP connection. Event-driven API with listener callbacks for lifecycle management (onOpen, onText, onBinary, onClose, onError). Supports both text and binary message types. Uses demand-based flow control with request(n) to prevent overwhelming receiver.',
          codeExample: `// WebSocket listener
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
};

// Create WebSocket connection
HttpClient client = HttpClient.newHttpClient();
CompletableFuture<WebSocket> ws = client.newWebSocketBuilder()
    .buildAsync(URI.create("ws://echo.websocket.org"), listener);

WebSocket webSocket = ws.join();
webSocket.sendText("Hello WebSocket", true);
webSocket.sendClose(WebSocket.NORMAL_CLOSURE, "Goodbye");`
        },
        {
          name: 'Request/Response',
          explanation: 'Fluent builder pattern for constructing HTTP requests. Immutable request and response objects for thread safety. Flexible body handling with pre-built BodyPublishers (ofString, ofFile, ofByteArray, ofInputStream) and BodyHandlers (ofString, ofFile, ofByteArray, ofInputStream, ofLines, discarding). Rich metadata access for headers, status codes, URI, and HTTP version.',
          codeExample: `HttpClient client = HttpClient.newHttpClient();

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

// Response to File
HttpResponse<Path> fileResponse = client.send(request,
    HttpResponse.BodyHandlers.ofFile(Paths.get("response.json")));

// PUT request with file upload
Path filePath = Paths.get("data.txt");
HttpRequest putRequest = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/upload"))
    .header("Content-Type", "text/plain")
    .PUT(HttpRequest.BodyPublishers.ofFile(filePath))
    .build();

// DELETE request
HttpRequest deleteRequest = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/users/123"))
    .DELETE()
    .build();

// Access response headers
response.headers().map().forEach((k, v) ->
    System.out.println(k + ": " + v));`
        }
      ]
    },
    {
      id: 'string-methods',
      name: 'String Enhancements',
      icon: '📝',
      color: '#10b981',
      description: 'New String methods for modern text processing and manipulation',
      diagram: StringMethodsDiagram,
      details: [
        {
          name: 'isBlank() & strip()',
          explanation: 'New String methods for modern whitespace handling. isBlank() checks for empty or whitespace-only strings using Unicode whitespace characters. strip() methods remove Unicode whitespace (better than trim()). strip() vs trim(): strip() removes ALL Unicode whitespace characters while trim() only removes ASCII whitespace. Variants include stripLeading() and stripTrailing().',
          codeExample: `// isBlank() - checks for empty or whitespace-only strings
String empty = "";
String spaces = "   ";
String text = "  Hello  ";

System.out.println(empty.isBlank());   // true
System.out.println(spaces.isBlank());  // true
System.out.println(text.isBlank());    // false
System.out.println(spaces.isEmpty());  // false - has characters

// strip() vs trim() - Unicode whitespace handling
String unicode = "\\u2000\\u2001  Hello World  \\u2002\\u2003";

// trim() only removes ASCII whitespace
System.out.println("'" + unicode.trim() + "'");
// Output: '  Hello World  ' (Unicode spaces remain!)

// strip() removes ALL Unicode whitespace
System.out.println("'" + unicode.strip() + "'");
// Output: 'Hello World'

// stripLeading() and stripTrailing()
String leading = "   Hello World   ";
System.out.println("'" + leading.stripLeading() + "'");
// Output: 'Hello World   '
System.out.println("'" + leading.stripTrailing() + "'");
// Output: '   Hello World'`
        },
        {
          name: 'lines() Stream',
          explanation: 'lines() returns Stream<String> of individual lines from multi-line string. Splits on line terminators (\\n, \\r, \\r\\n). Enables functional stream processing of text with lazy evaluation for memory efficiency. All Stream API operations available: filter(), map(), collect(), forEach(), count(). Perfect for processing log files, parsing text, and analyzing multi-line input.',
          codeExample: `// Multi-line string processing
String multiline = """
    First line
    Second line
    Third line
    Fourth line
    """;

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

// Find specific lines
boolean hasSecond = multiline.lines()
    .anyMatch(line -> line.contains("Second"));
System.out.println("Contains 'Second': " + hasSecond);`
        },
        {
          name: 'repeat()',
          explanation: 'repeat(int count) concatenates string multiple times. Returns new string with original repeated count times. Efficient native implementation - more efficient than manual StringBuilder loops. Useful for formatting, padding, text generation, and creating visual elements like progress bars or separators.',
          codeExample: `// Basic repeat usage
String star = "*";
System.out.println(star.repeat(10));  // **********

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
System.out.println(pattern);  // +-+-+-+-+-+-+-+-+-+-

// Progress bar simulation
for (int i = 0; i <= 10; i++) {
    String filled = "█".repeat(i);
    String empty = "░".repeat(10 - i);
    System.out.print("\\r[" + filled + empty + "] " + (i * 10) + "%");
}

// Before Java 11 (verbose):
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 5; i++) {
    sb.append("Java");
}

// Java 11 (concise):
System.out.println("Java".repeat(5));  // JavaJavaJavaJavaJava`
        },
        {
          name: 'Unicode Support',
          explanation: 'Enhanced Unicode support across all new String methods. Better handling of Unicode whitespace characters. Proper support for surrogate pairs and multi-byte characters. strip() methods handle all Unicode whitespace including U+0020 (space), U+00A0 (nbsp), U+2000-U+200B (various spaces). Works correctly with all scripts (Latin, Cyrillic, Arabic, CJK), emoji, and special characters.',
          codeExample: `// Unicode whitespace characters
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

// Lines with Unicode
String multiLang = """
    English: Hello
    Spanish: Hola
    Japanese: こんにちは
    """;

multiLang.lines()
    .filter(line -> !line.isBlank())
    .map(String::strip)
    .forEach(System.out::println);

// Repeat with Unicode
String heart = "❤️";
System.out.println(heart.repeat(5));  // ❤️❤️❤️❤️❤️`
        }
      ]
    },
    {
      id: 'jfr',
      name: 'Java Flight Recorder',
      icon: '✈️',
      color: '#f59e0b',
      description: 'Production-ready profiling with low overhead for performance monitoring',
      diagram: JFRDiagram,
      details: [
        {
          name: 'Low-Overhead Profiling',
          explanation: 'Java Flight Recorder (JFR) is production-grade profiling tool with minimal performance impact - typically less than 1% overhead. Continuously collects diagnostic and profiling data. Integrated directly into JVM for optimal efficiency. Can run continuously in production with always-on monitoring using a circular buffer. Records CPU, memory, I/O, threading, GC, and exceptions.',
          codeExample: `// JFR Command Line Options
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
    }
}`
        },
        {
          name: 'Event Recording',
          explanation: 'JFR records specific events as they occur in the JVM. Both built-in JVM events (GC, Thread, Lock, I/O, Exception, Method Profiling, Class Loading) and custom application events are supported. Create custom events by extending jdk.jfr.Event class with @Label, @Description, @Category annotations. Use commit() method to record events.',
          codeExample: `import jdk.jfr.*;

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

public class JFREventExample {
    public static void main(String[] args) throws Exception {
        Recording recording = new Recording();
        recording.enable(UserLoginEvent.class);
        recording.start();

        // Trigger custom events
        simulateUserLogin("alice", true, 150);
        simulateUserLogin("bob", false, 200);

        recording.stop();
        recording.dump(Paths.get("events.jfr"));
    }

    static void simulateUserLogin(String user, boolean success, long ms) {
        UserLoginEvent event = new UserLoginEvent();
        event.username = user;
        event.success = success;
        event.duration = ms;
        event.commit();  // Record the event
    }
}`
        },
        {
          name: 'JFR Analysis',
          explanation: 'JFR recordings analyzed with JDK Mission Control (JMC) GUI tool. Programmatic analysis available through JFR API using RecordingFile. Rich visualizations: flame graphs for CPU profiling, memory leak detection, thread analysis, lock contention, I/O performance. Command-line tools: jfr print, jfr summary, jfr metadata. Automated rules engine finds common issues.',
          codeExample: `import jdk.jfr.consumer.*;

// Programmatic analysis of JFR recordings
public class JFRAnalyzer {
    public static void main(String[] args) throws Exception {
        Path recordingFile = Paths.get("recording.jfr");

        // Read and analyze JFR file
        try (RecordingFile recording = new RecordingFile(recordingFile)) {
            while (recording.hasMoreEvents()) {
                RecordedEvent event = recording.readEvent();

                // Analyze GC events
                if (event.getEventType().getName().equals("jdk.GarbageCollection")) {
                    System.out.println("GC Event:");
                    System.out.println("  Name: " + event.getValue("name"));
                    System.out.println("  Duration: " + event.getDuration());
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

        // Command-line tools:
        // jfr print recording.jfr
        // jfr summary recording.jfr
    }
}`
        },
        {
          name: 'Production Ready',
          explanation: 'JFR made free and open-source in Java 11 (previously commercial in Oracle JDK). Designed specifically for production environment use. Safe to run continuously with minimal overhead. Deployment strategies: always-on recording with circular buffer, on-demand, scheduled, triggered, or emergency dump on OutOfMemoryError. Integrates with JMX, monitoring tools, CI/CD pipelines, and diagnostic commands.',
          codeExample: `// Production JFR Configuration

// 1. Continuous recording (circular buffer)
// java -XX:StartFlightRecording=disk=true,
//      maxsize=500M,maxage=6h,
//      settings=default,dumponexit=true,
//      filename=/var/log/app-recording.jfr MyApp

// 2. On-demand recording via jcmd
// jcmd <pid> JFR.start name=emergency duration=60s filename=emergency.jfr

// 3. Programmatic production setup
public class ProductionJFR {
    private static Recording continuousRecording;

    public static void initializeJFR() {
        try {
            continuousRecording = new Recording();
            continuousRecording.setName("ProductionMonitoring");
            continuousRecording.setMaxAge(Duration.ofHours(6));
            continuousRecording.setMaxSize(500_000_000);  // 500 MB
            continuousRecording.setDumpOnExit(true);
            continuousRecording.setDestination(Paths.get("/var/log/app.jfr"));

            continuousRecording.start();
            System.out.println("Production JFR monitoring started");
        } catch (Exception e) {
            System.err.println("Failed to start JFR: " + e.getMessage());
        }
    }

    // Trigger emergency dump on critical error
    public static void emergencyDump() {
        try {
            Path dumpPath = Paths.get("/var/log/emergency-" +
                System.currentTimeMillis() + ".jfr");
            continuousRecording.dump(dumpPath);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}`
        }
      ]
    },
    {
      id: 'files-api',
      name: 'Files API Enhancements',
      icon: '📁',
      color: '#ec4899',
      description: 'Simplified file operations with new convenience methods',
      diagram: FilesAPIDiagram,
      details: [
        {
          name: 'readString() & writeString()',
          explanation: 'Convenient methods for reading and writing text files as strings. Files.readString(Path) reads entire file into String. Files.writeString(Path, String) writes string to file. Eliminates boilerplate code for simple file operations. UTF-8 encoding by default, customizable with Charset parameter. OpenOptions: CREATE, TRUNCATE_EXISTING, APPEND, CREATE_NEW.',
          codeExample: `import java.nio.file.*;
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
}

// Java 11 (concise):
Files.writeString(filePath, content);
String newWay = Files.readString(filePath);`
        },
        {
          name: 'Path Operations',
          explanation: 'Enhanced Path API with convenience methods. Key Path methods: of(), resolve(), relativize(), normalize(), toAbsolutePath(), getFileName(). File operations: createDirectory/createDirectories, delete/deleteIfExists, move, copy, exists/notExists. Atomic operations with move() and ATOMIC_MOVE. Rich file attributes access with readAttributes().',
          codeExample: `import java.nio.file.*;
import java.nio.file.attribute.*;

// Path creation and manipulation
Path path = Paths.get("documents", "java", "file.txt");
System.out.println("Path: " + path);
System.out.println("Absolute: " + path.toAbsolutePath());
System.out.println("Parent: " + path.getParent());
System.out.println("Filename: " + path.getFileName());

// Create directories
Path dir = Paths.get("temp", "test");
Files.createDirectories(dir);

// Create file with content
Path file = dir.resolve("test.txt");
Files.writeString(file, "Test content");

// File attributes
BasicFileAttributes attrs = Files.readAttributes(file,
    BasicFileAttributes.class);
System.out.println("Size: " + attrs.size() + " bytes");
System.out.println("Created: " + attrs.creationTime());
System.out.println("Is Directory: " + attrs.isDirectory());

// Copy and move files
Path destination = Paths.get("temp", "copy.txt");
Files.copy(file, destination, StandardCopyOption.REPLACE_EXISTING);

Path renamed = Paths.get("temp", "renamed.txt");
Files.move(destination, renamed, StandardCopyOption.ATOMIC_MOVE);

// List directory contents
Files.list(dir).forEach(p ->
    System.out.println("  " + p.getFileName()));

// Delete file
Files.deleteIfExists(renamed);`
        },
        {
          name: 'Unicode Support',
          explanation: 'Better handling of different character encodings in file I/O. Explicit charset specification prevents encoding issues. UTF-8 default with customizable encoding. Supports UTF-16, UTF-32, ISO-8859-1, Windows-1252, and any Charset supported by JVM. BOM (Byte Order Mark) handling for compatibility. Prevents platform-dependent encoding issues.',
          codeExample: `import java.nio.file.*;
import java.nio.charset.*;

// UTF-8 encoding (default in Java 11+)
String unicodeText = """
    English: Hello
    Japanese: こんにちは
    Arabic: مرحبا
    Emoji: 👋🌍
    """;

Path utf8File = Paths.get("unicode.txt");
Files.writeString(utf8File, unicodeText, StandardCharsets.UTF_8);

String read = Files.readString(utf8File, StandardCharsets.UTF_8);
System.out.println("UTF-8 content:\\n" + read);

// UTF-16 encoding
Path utf16File = Paths.get("utf16.txt");
Files.writeString(utf16File, unicodeText, StandardCharsets.UTF_16);

// ISO-8859-1 (Latin-1)
String latin = "Cafe resume";
Path latinFile = Paths.get("latin.txt");
Files.writeString(latinFile, latin, StandardCharsets.ISO_8859_1);

// Custom charset
Charset shiftJIS = Charset.forName("Shift_JIS");
Path japaneseFile = Paths.get("japanese.txt");
Files.writeString(japaneseFile, "こんにちは", shiftJIS);

// File size comparison
byte[] bytes = unicodeText.getBytes(StandardCharsets.UTF_8);
System.out.println("String length: " + unicodeText.length());
System.out.println("UTF-8 bytes: " + bytes.length);
System.out.println("File size: " + Files.size(utf8File));`
        },
        {
          name: 'Performance',
          explanation: 'Optimized file I/O implementations in Java NIO.2. Memory-efficient processing of large files. readString()/writeString() optimized for small to medium files with single-pass reading/writing and efficient character decoding. For large files, use stream-based processing with Files.lines() for lazy evaluation. Memory-mapped files for very large files (GB+).',
          codeExample: `import java.nio.file.*;
import java.util.stream.*;

// Efficient reading of large files

// 1. Read all lines (small files)
Path smallFile = Paths.get("small.txt");
Files.writeString(smallFile, "Line 1\\nLine 2\\nLine 3");
List<String> allLines = Files.readAllLines(smallFile);

// 2. Stream lines (memory-efficient for large files)
try (Stream<String> lines = Files.lines(smallFile)) {
    long count = lines
        .filter(line -> !line.isBlank())
        .count();
    System.out.println("Non-blank lines: " + count);
}

// 3. Performance benchmarking
Path largeFile = Paths.get("large.txt");
StringBuilder large = new StringBuilder();
for (int i = 0; i < 10000; i++) {
    large.append("Line ").append(i).append("\\n");
}

long start = System.currentTimeMillis();
Files.writeString(largeFile, large.toString());
long writeTime = System.currentTimeMillis() - start;
System.out.println("Write time: " + writeTime + "ms");

start = System.currentTimeMillis();
String content = Files.readString(largeFile);
long readTime = System.currentTimeMillis() - start;
System.out.println("Read time: " + readTime + "ms");

// Parallel processing for better performance
long wordCount = Files.lines(largeFile)
    .parallel()
    .flatMap(line -> Stream.of(line.split("\\\\s+")))
    .count();
System.out.println("Word count: " + wordCount);`
        }
      ]
    },
    {
      id: 'collections',
      name: 'Collection & Optional',
      icon: '📦',
      color: '#ef4444',
      description: 'Enhanced collections API and Optional improvements',
      diagram: CollectionsDiagram,
      details: [
        {
          name: 'toArray() Enhancement',
          explanation: 'New toArray(IntFunction<T[]>) method added to Collection interface. Allows creating arrays of correct type using generator function. Common usage: collection.toArray(String[]::new). Method reference creates array of exact size needed. More convenient and type-safe than older toArray(T[]) method which required pre-sized array allocation.',
          codeExample: `import java.util.*;

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

// Custom objects
class Person {
    String name;
    Person(String name) { this.name = name; }
}

List<Person> people = List.of(new Person("John"), new Person("Jane"));
Person[] personArray = people.toArray(Person[]::new);

// Stream to array (common pattern)
String[] streamArray = names.stream()
    .filter(name -> name.length() > 3)
    .toArray(String[]::new);
System.out.println("Filtered: " + Arrays.toString(streamArray));`
        },
        {
          name: 'Immutable Collections',
          explanation: 'List.of(), Set.of(), Map.of() factory methods create immutable collections. Introduced in Java 9, refined in Java 11. Null-hostile - throw NullPointerException on null elements. Compact memory footprint and optimized performance. Thread-safe and serializable. All mutating operations throw UnsupportedOperationException.',
          codeExample: `import java.util.*;

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

// Immutable Maps
Map<String, Integer> scores = Map.of(
    "Alice", 95,
    "Bob", 87,
    "Charlie", 92
);
System.out.println("Bob's score: " + scores.get("Bob"));

// Map with more entries (up to 10)
Map<Integer, String> months = Map.ofEntries(
    Map.entry(1, "January"),
    Map.entry(2, "February"),
    Map.entry(3, "March")
);

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
List<String> copy = List.copyOf(mutable);`
        },
        {
          name: 'Predicate Methods',
          explanation: 'Predicate.not() static method provides clean negation of predicates. Particularly useful with method references in Stream API. Predicate.not(String::isBlank) is cleaner than s -> !s.isBlank() and much cleaner than ((Predicate<String>)String::isBlank).negate(). Works naturally with method references for more functional and declarative code.',
          codeExample: `import java.util.*;
import java.util.function.Predicate;

// Java 11: Predicate.not() for negation
List<String> strings = List.of("Hello", "", "  ", "World", "\\t", "Java");

// Before Java 11: verbose negation
strings.stream()
    .filter(s -> !s.isBlank())
    .forEach(System.out::println);

// Java 11: Predicate.not() with method reference
strings.stream()
    .filter(Predicate.not(String::isBlank))
    .forEach(System.out::println);

// More readable predicates
List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
Predicate<Integer> isEven = n -> n % 2 == 0;

numbers.stream()
    .filter(Predicate.not(isEven))  // Get odd numbers
    .forEach(System.out::println);

// Custom predicates
class User {
    boolean active;
    User(boolean active) { this.active = active; }
    boolean isActive() { return active; }
}

List<User> users = List.of(
    new User(true),
    new User(false),
    new User(true)
);

// Filter inactive users
long inactiveCount = users.stream()
    .filter(Predicate.not(User::isActive))
    .count();
System.out.println("Inactive users: " + inactiveCount);`
        },
        {
          name: 'Optional Enhancement',
          explanation: 'Optional.isEmpty() method added in Java 11. Complements existing isPresent() for more natural null-checking. Better integration with Stream API and Predicate.not(). if (optional.isEmpty()) is more readable than if (!optional.isPresent()). Particularly useful in negative conditions and guard clauses.',
          codeExample: `import java.util.*;
import java.util.function.Predicate;

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

Optional<String> notFound = findUser(999);
if (notFound.isEmpty()) {
    System.out.println("User not found");
}

// Stream of Optionals
List<Optional<String>> optionals = List.of(
    Optional.of("A"),
    Optional.empty(),
    Optional.of("B")
);

// Filter out empty optionals
List<String> values = optionals.stream()
    .filter(Predicate.not(Optional::isEmpty))
    .flatMap(Optional::stream)
    .collect(Collectors.toList());
System.out.println("Values: " + values);`
        }
      ]
    },
    {
      id: 'performance',
      name: 'Performance & Reflection',
      icon: '⚡',
      color: '#f97316',
      description: 'Performance improvements and reflection API enhancements',
      diagram: NestAccessDiagram,
      details: [
        {
          name: 'Reflection API',
          explanation: 'New reflection APIs for nest-based access control (JEP 181). A nest is a group of classes/interfaces compiled from same source file. Methods: getNestHost() returns nest host class, getNestMembers() returns all classes in nest, isNestmateOf(Class) checks if two classes are nestmates. Allows private access between nest members.',
          codeExample: `// Nest reflection APIs
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
        Class<?> outerClass = NestReflectionDemo.class;
        Class<?> innerClass = InnerOne.class;

        // Get nest host
        System.out.println("Outer nest host: " +
            outerClass.getNestHost().getSimpleName());
        System.out.println("Inner nest host: " +
            innerClass.getNestHost().getSimpleName());

        // Check if classes are nestmates
        boolean areNestmates = outerClass.isNestmateOf(innerClass);
        System.out.println("Are nestmates: " + areNestmates);

        // Get all nest members
        Class<?>[] nestMembers = outerClass.getNestMembers();
        System.out.println("Nest members:");
        for (Class<?> member : nestMembers) {
            System.out.println("  - " + member.getSimpleName());
        }
    }
}`
        },
        {
          name: 'Nest-Based Performance',
          explanation: 'Nest-based access control eliminates synthetic bridge methods. Reduces class file size (5-15% typical) and method count. Improves startup time (2-5% typical) and JIT optimization. Direct private access between nestmates instead of through synthetic access$000 methods. Cleaner bytecode that is easier to debug and understand.',
          codeExample: `// Performance comparison: Before vs After Java 11

// Before Java 11: Compiler generated synthetic bridge methods
class OuterOld {
    private int value = 42;

    // Compiler generated: synthetic bridge method
    // static int access$000(OuterOld outer) {
    //     return outer.value;
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

// Benefits:
// 1. Faster execution (no bridge method overhead)
// 2. Smaller bytecode size (5-10% reduction)
// 3. Better JIT optimization
// 4. Reduced method call overhead
// 5. Improved startup time
// 6. Cleaner stack traces`
        },
        {
          name: 'Security',
          explanation: 'Nest-based access control improves Java security model. Eliminates security risks from synthetic bridge methods which were package-private, not truly private. Accessible via reflection from same package before Java 11. Now JVM directly enforces true private access. Reflection properly respects nest boundaries. Security Manager has accurate view of access.',
          codeExample: `// Security improvements with nest-based access

// Before Java 11: Security issues with synthetic bridges
class SecurityOld {
    private String password = "secret123";

    // Compiler generated synthetic bridge (package-private!)
    // static String access$000(SecurityOld obj) {
    //     return obj.password;  // Accessible from same package!
    // }

    class Inner {
        void usePassword() {
            System.out.println(password);
        }
    }
}

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

// Security improvements:
// 1. No synthetic bridge methods to exploit
// 2. JVM-level access control
// 3. True private encapsulation
// 4. Better reflection security
// 5. Can't be exploited by same-package classes
// 6. Closes security vulnerabilities in nested classes`
        }
      ]
    },
    {
      id: 'gc',
      name: 'Garbage Collection',
      icon: '🗑️',
      color: '#6366f1',
      description: 'Z Garbage Collector and GC interface improvements',
      diagram: ZGCDiagram,
      details: [
        {
          name: 'ZGC Improvements',
          explanation: 'Z Garbage Collector (ZGC) - Experimental low-latency GC in Java 11. Sub-millisecond pause times (<10ms typical), independent of heap size. Scalable from 8MB to 16TB heaps. Concurrent garbage collection with minimal stop-the-world. Features: colored pointers, load barriers, region-based processing. Enable with -XX:+UnlockExperimentalVMOptions -XX:+UseZGC.',
          codeExample: `// ZGC - Z Garbage Collector (Experimental in Java 11)

// Enable ZGC with JVM flags:
// java -XX:+UnlockExperimentalVMOptions
//      -XX:+UseZGC
//      -Xms4g -Xmx16g MyApp

public class ZGCDemo {
    public static void main(String[] args) {
        System.out.println("Running with ZGC");
        System.out.println("Max heap: " +
            Runtime.getRuntime().maxMemory() / 1024 / 1024 / 1024 + "GB");

        // Simulate low-latency application
        for (int i = 0; i < 100; i++) {
            processLatencySensitiveRequest(i);
            createGarbage();  // Trigger GC
        }
        System.out.println("All requests completed");
        System.out.println("ZGC kept pauses under 10ms!");
    }

    static void createGarbage() {
        List<String> temp = new ArrayList<>();
        for (int i = 0; i < 10000; i++) {
            temp.add("Object-" + i);
        }
        // temp becomes garbage after method returns
    }
}

// ZGC Features:
// - Concurrent marking and compaction
// - Load barriers for reference coloring
// - Scalable to multi-TB heaps
// - Max pause time < 10ms

// Comparison with G1:
// G1 GC:  50-200ms pauses (heap dependent)
// ZGC:    1-10ms pauses (heap independent!)

// Use cases:
// - Low-latency trading systems
// - Real-time analytics
// - Large heap applications`
        },
        {
          name: 'GC Interface',
          explanation: 'Unified GC interface in Java 11 improves GC architecture. Clean separation between GC implementation and JVM. Easier to develop and experiment with new collectors. Unified GC logging with -Xlog:gc* format. Better GC logging, monitoring, and tooling support. Standard GC metrics via JMX and JFR events.',
          codeExample: `import java.lang.management.*;

// Unified GC Interface and Monitoring
public class GCInterfaceDemo {
    public static void main(String[] args) {
        printGCInfo();
        runWorkload();
        printGCStats();
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
    }

    static void printGCStats() {
        for (GarbageCollectorMXBean gc :
             ManagementFactory.getGarbageCollectorMXBeans()) {
            long count = gc.getCollectionCount();
            long time = gc.getCollectionTime();
            if (count > 0) {
                System.out.println(gc.getName() + ":");
                System.out.println("  Avg time: " +
                    (time / count) + "ms per collection");
            }
        }

        MemoryMXBean memory = ManagementFactory.getMemoryMXBean();
        MemoryUsage heapUsage = memory.getHeapMemoryUsage();
        System.out.println("Heap Used: " +
            heapUsage.getUsed() / 1024 / 1024 + "MB");
    }
}

// GC Selection:
// -XX:+UseSerialGC        (Serial)
// -XX:+UseParallelGC      (Parallel)
// -XX:+UseG1GC            (G1, default)
// -XX:+UseZGC             (Z GC, experimental)

// Unified Logging:
// -Xlog:gc:file=gc.log
// -Xlog:gc*:file=gc-detailed.log`
        },
        {
          name: 'Epsilon GC',
          explanation: 'Epsilon is a "no-op" garbage collector introduced in Java 11 (JEP 318). It handles memory allocation but does not implement any memory reclamation - once heap is exhausted, JVM terminates with OutOfMemoryError. Useful for: performance testing (measure application memory footprint without GC overhead), extremely short-lived jobs (finish before heap exhausted), memory pressure testing, and latency-sensitive applications where you prefer crash over unpredictable GC pauses. Enable with -XX:+UnlockExperimentalVMOptions -XX:+UseEpsilonGC.',
          codeExample: `// Epsilon GC - No-Op Garbage Collector (Java 11)

// Enable Epsilon GC with JVM flags:
// java -XX:+UnlockExperimentalVMOptions
//      -XX:+UseEpsilonGC
//      -Xms2g -Xmx2g MyApp

public class EpsilonGCDemo {
    public static void main(String[] args) {
        System.out.println("Running with Epsilon GC");
        System.out.println("Max heap: " +
            Runtime.getRuntime().maxMemory() / 1024 / 1024 + "MB");

        // Example: Short-lived batch job
        processBatchJob();
        System.out.println("Batch job completed");
    }

    static void processBatchJob() {
        List<String> results = new ArrayList<>();
        for (int i = 0; i < 100_000; i++) {
            results.add("Processed item " + i);
        }
        // Process and exit before heap exhaustion
        System.out.println("Processed " + results.size() + " items");
    }
}

// Use Cases for Epsilon GC:
// 1. Performance Testing
//    - Measure true application memory usage
//    - Benchmark without GC interference
//    - Identify memory allocation patterns

// 2. Short-Lived Applications
//    - Serverless functions
//    - Container jobs
//    - CLI tools

// 3. Memory Pressure Testing
//    - Test OutOfMemoryError handling
//    - Verify memory limits
//    - Stress testing

// 4. Ultra-Low Latency (with sufficient heap)
//    - No GC pauses at all
//    - Predictable performance

// Compare heap usage:
// java -XX:+UseG1GC -Xlog:gc MyApp         # With GC
// java -XX:+UseEpsilonGC -Xlog:gc MyApp    # Without GC

// Note: Application will crash with OOM when heap full!
// Only use when you know memory requirements`
        }
      ]
    }
  ]

  // =============================================================================
  // NAVIGATION HANDLERS
  // =============================================================================

  const selectedConcept = selectedConceptIndex !== null ? concepts[selectedConceptIndex] : null

  const handlePreviousConcept = () => {
    if (selectedConceptIndex > 0) {
      setSelectedConceptIndex(selectedConceptIndex - 1)
      setSelectedDetailIndex(0)
    }
  }

  const handleNextConcept = () => {
    if (selectedConceptIndex < concepts.length - 1) {
      setSelectedConceptIndex(selectedConceptIndex + 1)
      setSelectedDetailIndex(0)
    }
  }

  // =============================================================================
  // BREADCRUMB CONFIGURATION
  // =============================================================================

  const buildBreadcrumbStack = () => {
    const stack = [
      { name: 'Java', icon: '☕', page: 'Java' },
      { name: 'Java 11', icon: '📋', page: 'Java11' }
    ]
    if (selectedConcept) {
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    }
    return stack
  }

  const handleBreadcrumbClick = (index) => {
    if (index === 0) {
      onBack()
    } else if (index === 1 && selectedConcept) {
      setSelectedConceptIndex(null)
    }
  }

  // =============================================================================
  // KEYBOARD NAVIGATION
  // =============================================================================

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        if (selectedConcept) {
          setSelectedConceptIndex(null)
        } else {
          onBack()
        }
      } else if (e.key === 'ArrowLeft' && selectedConceptIndex !== null) {
        e.preventDefault()
        handlePreviousConcept()
      } else if (e.key === 'ArrowRight' && selectedConceptIndex !== null) {
        e.preventDefault()
        handleNextConcept()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedConceptIndex, onBack])

  // =============================================================================
  // STYLES
  // =============================================================================

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #4c1d95 50%, #0f172a 100%)',
    padding: '2rem',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  }

  const headerStyle = {
    maxWidth: '1400px',
    margin: '0 auto 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem'
  }

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(139, 92, 246, 0.2)',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    borderRadius: '0.5rem',
    color: '#a78bfa',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div style={containerStyle}>
      {/* Header with title and back button */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Java 11 Features</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(139, 92, 246, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(139, 92, 246, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Back to Java
        </button>
      </div>

      {/* Breadcrumb navigation */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          colors={JAVA11_COLORS}
        />
      </div>

      {/* Concept Cards Grid */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '1.5rem'
      }}>
        {concepts.map((concept, index) => (
          <div
            key={concept.id}
            onClick={() => setSelectedConceptIndex(index)}
            style={{
              background: 'rgba(15, 23, 42, 0.8)',
              borderRadius: '1rem',
              padding: '1.5rem',
              border: `1px solid ${concept.color}40`,
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = `0 20px 40px ${concept.color}20`
              e.currentTarget.style.borderColor = concept.color
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.borderColor = `${concept.color}40`
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2.5rem' }}>{concept.icon}</span>
              <h3 style={{ color: concept.color, margin: 0, fontSize: '1.25rem' }}>{concept.name}</h3>
            </div>
            <p style={{ color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>{concept.description}</p>
            <div style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.875rem' }}>
              {concept.details.length} topics - Click to explore
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Selected Concept */}
      {selectedConcept && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
          }}
          onClick={() => setSelectedConceptIndex(null)}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #1e293b, #0f172a)',
              borderRadius: '1rem',
              padding: '2rem',
              maxWidth: '1200px',
              maxHeight: '92vh',
              overflow: 'auto',
              border: `1px solid ${selectedConcept.color}40`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Breadcrumb */}
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
              colors={JAVA11_COLORS}
            />

            {/* Modal Header with Navigation */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid #334155'
            }}>
              <h2 style={{
                color: selectedConcept.color,
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1.25rem'
              }}>
                <span>{selectedConcept.icon}</span>
                {selectedConcept.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <button
                  onClick={handlePreviousConcept}
                  disabled={selectedConceptIndex === 0}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(100, 116, 139, 0.2)',
                    border: '1px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '0.375rem',
                    color: selectedConceptIndex === 0 ? '#475569' : '#94a3b8',
                    cursor: selectedConceptIndex === 0 ? 'not-allowed' : 'pointer',
                    fontSize: '0.8rem'
                  }}
                >&larr;</button>
                <span style={{ color: '#64748b', fontSize: '0.75rem', padding: '0 0.5rem' }}>
                  {selectedConceptIndex + 1}/{concepts.length}
                </span>
                <button
                  onClick={handleNextConcept}
                  disabled={selectedConceptIndex === concepts.length - 1}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(100, 116, 139, 0.2)',
                    border: '1px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '0.375rem',
                    color: selectedConceptIndex === concepts.length - 1 ? '#475569' : '#94a3b8',
                    cursor: selectedConceptIndex === concepts.length - 1 ? 'not-allowed' : 'pointer',
                    fontSize: '0.8rem'
                  }}
                >&rarr;</button>
                <button
                  onClick={() => setSelectedConceptIndex(null)}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '0.375rem',
                    color: '#f87171',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    marginLeft: '0.5rem'
                  }}
                >&times;</button>
              </div>
            </div>

            {/* Subtopic Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {selectedConcept.details.map((detail, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDetailIndex(i)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: selectedDetailIndex === i ? `${selectedConcept.color}30` : 'rgba(100, 116, 139, 0.2)',
                    border: `1px solid ${selectedDetailIndex === i ? selectedConcept.color : 'rgba(100, 116, 139, 0.3)'}`,
                    borderRadius: '0.5rem',
                    color: selectedDetailIndex === i ? selectedConcept.color : '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: selectedDetailIndex === i ? '600' : '400',
                    transition: 'all 0.2s'
                  }}
                >
                  {detail.name}
                </button>
              ))}
            </div>

            {/* Selected Subtopic Content */}
            {(() => {
              const detail = selectedConcept.details[selectedDetailIndex]
              const colorScheme = SUBTOPIC_COLORS[selectedDetailIndex % SUBTOPIC_COLORS.length]
              const DiagramComponent = selectedConcept.diagram
              return (
                <div>
                  {/* Diagram */}
                  {DiagramComponent && (
                    <div style={{
                      background: 'rgba(15, 23, 42, 0.6)',
                      borderRadius: '0.75rem',
                      padding: '1rem',
                      marginBottom: '1.5rem',
                      border: '1px solid #334155'
                    }}>
                      <DiagramComponent />
                    </div>
                  )}

                  {/* Detail Name */}
                  <h3 style={{ color: '#e2e8f0', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
                    {detail.name}
                  </h3>

                  {/* Explanation */}
                  <p style={{
                    color: '#e2e8f0',
                    lineHeight: '1.8',
                    marginBottom: '1rem',
                    background: colorScheme.bg,
                    border: `1px solid ${colorScheme.border}`,
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    textAlign: 'left'
                  }}>
                    {detail.explanation}
                  </p>

                  {/* Code Example */}
                  {detail.codeExample && (
                    <SyntaxHighlighter
                      language="java"
                      style={vscDarkPlus}
                      customStyle={{
                        padding: '1rem',
                        margin: 0,
                        borderRadius: '0.5rem',
                        fontSize: '0.8rem',
                        border: '1px solid #334155',
                        background: '#0f172a'
                      }}
                      codeTagProps={{ style: { background: 'transparent' } }}
                    >
                      {detail.codeExample}
                    </SyntaxHighlighter>
                  )}
                </div>
              )
            })()}

          </div>
        </div>
      )}
    </div>
  )
}

export default Java11
