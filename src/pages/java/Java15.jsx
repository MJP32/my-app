/**
 * Java 15 Features Page
 *
 * Covers Java 15 features including Text Blocks, Sealed Classes (Preview),
 * Records (Second Preview), and Hidden Classes.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const JAVA15_COLORS = {
  primary: '#10b981',
  primaryHover: '#34d399',
  bg: 'rgba(16, 185, 129, 0.1)',
  border: 'rgba(16, 185, 129, 0.3)',
  arrow: '#10b981',
  hoverBg: 'rgba(16, 185, 129, 0.2)',
  topicBg: 'rgba(16, 185, 129, 0.2)'
}

const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
  { bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.3)' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
]

// =============================================================================
// DIAGRAM COMPONENTS
// =============================================================================

const TextBlocksDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-tb" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Text Blocks - Multi-line String Literals
    </text>

    <rect x="50" y="50" width="200" height="120" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="150" y="75" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">Traditional String</text>
    <text x="150" y="100" textAnchor="middle" fill="#94a3b8" fontSize="9">"Line1\\n" +</text>
    <text x="150" y="115" textAnchor="middle" fill="#94a3b8" fontSize="9">"Line2\\n" +</text>
    <text x="150" y="130" textAnchor="middle" fill="#94a3b8" fontSize="9">"Line3"</text>
    <text x="150" y="155" textAnchor="middle" fill="#ef4444" fontSize="9">Escape characters</text>

    <line x1="255" y1="110" x2="335" y2="110" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-tb)"/>
    <text x="295" y="100" textAnchor="middle" fill="#10b981" fontSize="10">Java 15</text>

    <rect x="340" y="50" width="200" height="120" rx="8" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="2"/>
    <text x="440" y="75" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">Text Block</text>
    <text x="440" y="100" textAnchor="middle" fill="#94a3b8" fontSize="9">"""</text>
    <text x="440" y="115" textAnchor="middle" fill="#94a3b8" fontSize="9">Line1</text>
    <text x="440" y="130" textAnchor="middle" fill="#94a3b8" fontSize="9">Line2</text>
    <text x="440" y="145" textAnchor="middle" fill="#94a3b8" fontSize="9">"""</text>
    <text x="440" y="165" textAnchor="middle" fill="#10b981" fontSize="9">{`Clean & readable`}</text>

    <rect x="580" y="60" width="180" height="100" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="670" y="85" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Use Cases</text>
    <text x="670" y="105" textAnchor="middle" fill="#94a3b8" fontSize="9">SQL queries</text>
    <text x="670" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">JSON/XML templates</text>
    <text x="670" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">HTML snippets</text>
    <text x="670" y="150" textAnchor="middle" fill="#94a3b8" fontSize="9">Regex patterns</text>
  </svg>
)

const SealedClassesDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-sc" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Sealed Classes - Controlled Type Hierarchies
    </text>

    <rect x="300" y="45" width="200" height="50" rx="8" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="400" y="65" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">sealed interface Shape</text>
    <text x="400" y="82" textAnchor="middle" fill="#94a3b8" fontSize="9">permits Circle, Rectangle, Triangle</text>

    <line x1="350" y1="95" x2="150" y2="140" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-sc)"/>
    <line x1="400" y1="95" x2="400" y2="140" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-sc)"/>
    <line x1="450" y1="95" x2="650" y2="140" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-sc)"/>

    <rect x="50" y="145" width="150" height="40" rx="6" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="2"/>
    <text x="125" y="162" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">final class Circle</text>
    <text x="125" y="178" textAnchor="middle" fill="#94a3b8" fontSize="8">No further extension</text>

    <rect x="325" y="145" width="150" height="40" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="400" y="162" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">final class Rectangle</text>
    <text x="400" y="178" textAnchor="middle" fill="#94a3b8" fontSize="8">No further extension</text>

    <rect x="600" y="145" width="150" height="40" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="675" y="162" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">final class Triangle</text>
    <text x="675" y="178" textAnchor="middle" fill="#94a3b8" fontSize="8">No further extension</text>

    <text x="400" y="210" textAnchor="middle" fill="#10b981" fontSize="10">Exhaustive pattern matching - compiler knows all subtypes</text>
  </svg>
)

const RecordsDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-rec" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Records - Immutable Data Carriers
    </text>

    <rect x="50" y="45" width="300" height="140" rx="8" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" strokeWidth="2"/>
    <text x="200" y="65" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">Traditional Class (~40 lines)</text>
    <text x="200" y="85" textAnchor="middle" fill="#94a3b8" fontSize="9">private final String name;</text>
    <text x="200" y="100" textAnchor="middle" fill="#94a3b8" fontSize="9">private final int age;</text>
    <text x="200" y="115" textAnchor="middle" fill="#94a3b8" fontSize="9">+ constructor</text>
    <text x="200" y="130" textAnchor="middle" fill="#94a3b8" fontSize="9">+ getters</text>
    <text x="200" y="145" textAnchor="middle" fill="#94a3b8" fontSize="9">+ equals/hashCode</text>
    <text x="200" y="160" textAnchor="middle" fill="#94a3b8" fontSize="9">+ toString</text>
    <text x="200" y="178" textAnchor="middle" fill="#ef4444" fontSize="9">Lots of boilerplate!</text>

    <line x1="355" y1="115" x2="435" y2="115" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-rec)"/>
    <text x="395" y="105" textAnchor="middle" fill="#10b981" fontSize="10">Java 15</text>

    <rect x="440" y="70" width="320" height="90" rx="8" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="2"/>
    <text x="600" y="95" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">Record (1 line!)</text>
    <text x="600" y="120" textAnchor="middle" fill="#d1d5db" fontSize="12" fontFamily="monospace">record Person(String name, int age) {}</text>
    <text x="600" y="150" textAnchor="middle" fill="#10b981" fontSize="9">Auto-generates: constructor, accessors, equals, hashCode, toString</text>
  </svg>
)

const HiddenClassesDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-hc" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Hidden Classes - Dynamic Class Generation
    </text>

    <rect x="50" y="50" width="180" height="70" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="140" y="75" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Framework</text>
    <text x="140" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">Generates bytecode</text>
    <text x="140" y="110" textAnchor="middle" fill="#94a3b8" fontSize="9">at runtime</text>

    <line x1="235" y1="85" x2="295" y2="85" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-hc)"/>

    <rect x="300" y="50" width="200" height="70" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Lookup.defineHiddenClass</text>
    <text x="400" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">Creates hidden class</text>
    <text x="400" y="110" textAnchor="middle" fill="#94a3b8" fontSize="9">from byte[]</text>

    <line x1="505" y1="85" x2="565" y2="85" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-hc)"/>

    <rect x="570" y="50" width="180" height="70" rx="8" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="2"/>
    <text x="660" y="75" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">Hidden Class</text>
    <text x="660" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">Not discoverable</text>
    <text x="660" y="110" textAnchor="middle" fill="#94a3b8" fontSize="9">Auto-unloads</text>

    <rect x="150" y="145" width="500" height="60" rx="8" fill="rgba(139, 92, 246, 0.15)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="400" y="165" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">Benefits</text>
    <text x="250" y="190" textAnchor="middle" fill="#94a3b8" fontSize="9">No Class.forName()</text>
    <text x="400" y="190" textAnchor="middle" fill="#94a3b8" fontSize="9">Independent unloading</text>
    <text x="550" y="190" textAnchor="middle" fill="#94a3b8" fontSize="9">Replaces Unsafe API</text>
  </svg>
)

const PatternMatchingDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-pm" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Sealed Types + Pattern Matching
    </text>

    <rect x="50" y="50" width="220" height="130" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="160" y="75" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Sealed Interface</text>
    <text x="160" y="100" textAnchor="middle" fill="#94a3b8" fontSize="9">sealed interface Result</text>
    <text x="160" y="115" textAnchor="middle" fill="#94a3b8" fontSize="9">permits Success, Failure</text>
    <text x="160" y="140" textAnchor="middle" fill="#10b981" fontSize="9">Compiler knows all types!</text>
    <text x="160" y="165" textAnchor="middle" fill="#94a3b8" fontSize="8">No default case needed</text>

    <line x1="275" y1="115" x2="335" y2="115" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-pm)"/>

    <rect x="340" y="50" width="200" height="130" rx="8" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="2"/>
    <text x="440" y="75" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">Switch Expression</text>
    <text x="440" y="100" textAnchor="middle" fill="#d1d5db" fontSize="9" fontFamily="monospace">switch (result) {'{'}</text>
    <text x="440" y="115" textAnchor="middle" fill="#d1d5db" fontSize="9" fontFamily="monospace">{`  case Success s -{'>'} ...`}</text>
    <text x="440" y="130" textAnchor="middle" fill="#d1d5db" fontSize="9" fontFamily="monospace">{`  case Failure f -{'>'} ...`}</text>
    <text x="440" y="145" textAnchor="middle" fill="#d1d5db" fontSize="9" fontFamily="monospace">{'}'}</text>
    <text x="440" y="170" textAnchor="middle" fill="#10b981" fontSize="9">Exhaustive!</text>

    <rect x="570" y="60" width="180" height="110" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="660" y="85" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">Benefits</text>
    <text x="660" y="110" textAnchor="middle" fill="#94a3b8" fontSize="9">Type safety</text>
    <text x="660" y="125" textAnchor="middle" fill="#94a3b8" fontSize="9">Compiler verification</text>
    <text x="660" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9">No missed cases</text>
    <text x="660" y="155" textAnchor="middle" fill="#94a3b8" fontSize="9">Cleaner code</text>
  </svg>
)

const ImmutabilityDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Record Immutability - Thread-Safe by Default
    </text>

    <rect x="50" y="50" width="200" height="110" rx="8" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="2"/>
    <text x="150" y="75" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">Record Instance</text>
    <text x="150" y="100" textAnchor="middle" fill="#94a3b8" fontSize="9">All fields final</text>
    <text x="150" y="115" textAnchor="middle" fill="#94a3b8" fontSize="9">No setters</text>
    <text x="150" y="130" textAnchor="middle" fill="#94a3b8" fontSize="9">Cannot extend</text>
    <text x="150" y="150" textAnchor="middle" fill="#10b981" fontSize="9">Immutable!</text>

    <rect x="300" y="50" width="200" height="110" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Functional Updates</text>
    <text x="400" y="100" textAnchor="middle" fill="#d1d5db" fontSize="9" fontFamily="monospace">account.deposit(100)</text>
    <text x="400" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">Returns NEW instance</text>
    <text x="400" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9">Original unchanged</text>

    <rect x="550" y="50" width="200" height="110" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="650" y="75" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">Benefits</text>
    <text x="650" y="100" textAnchor="middle" fill="#94a3b8" fontSize="9">Thread-safe</text>
    <text x="650" y="115" textAnchor="middle" fill="#94a3b8" fontSize="9">Safe as Map keys</text>
    <text x="650" y="130" textAnchor="middle" fill="#94a3b8" fontSize="9">Easy to reason about</text>
    <text x="650" y="145" textAnchor="middle" fill="#94a3b8" fontSize="9">No defensive copies</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function Java15({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'text-blocks',
      name: 'Text Blocks',
      icon: '📝',
      color: '#8b5cf6',
      description: 'Multi-line string literals with proper formatting - SQL, JSON, HTML without escape characters.',
      diagram: TextBlocksDiagram,
      details: [
        {
          name: 'Use Cases',
          diagram: TextBlocksDiagram,
          explanation: 'Text blocks eliminate the need for string concatenation and escape characters in multi-line strings. Common use cases include SQL queries, JSON/XML templates, HTML snippets, regex patterns, and test data. They preserve formatting and indentation automatically.',
          codeExample: `// SQL Queries - clean multi-line formatting
String insertQuery = """
    INSERT INTO employees (first_name, last_name, email, salary)
    VALUES (?, ?, ?, ?)
    """;

// HTML Templates - no escape characters needed
String emailTemplate = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Welcome Email</title>
    </head>
    <body>
        <h1>Welcome, %s!</h1>
        <p>Thank you for joining our service.</p>
        <a href="%s">Activate Account</a>
    </body>
    </html>
    """;

// JSON Configuration
String config = """
    {
        "server": {
            "port": 8080,
            "host": "localhost"
        },
        "database": {
            "url": "jdbc:postgresql://localhost/mydb",
            "pool_size": 10
        }
    }
    """;

// Using with String.format
String email = String.format(emailTemplate, "John Doe", "https://example.com/activate");
System.out.println(email);`
        },
        {
          name: 'Indentation Control',
          explanation: 'Text blocks use incidental whitespace stripping - the compiler removes common leading whitespace. The closing delimiter position controls indentation. You can also use \\s for trailing space preservation and \\ for line continuation.',
          codeExample: `// Indentation is controlled by the closing delimiter position
String aligned = """
    This line has 4 spaces of indentation
    This line also has 4 spaces
    """;  // Closing delimiter sets the baseline

// Trailing delimiter controls final newline
String noTrailingNewline = """
    No trailing newline here""";

String withTrailingNewline = """
    Has trailing newline
    """;

// Preserve trailing spaces with \\s
String preserveSpaces = """
    Name:     \\s
    Address:  \\s
    """;

// Line continuation with \\
String longLine = """
    This is a very long line that we want to \\
    continue without introducing a line break \\
    in the final string.""";

System.out.println("Aligned:\\n" + aligned);
System.out.println("Long line: " + longLine);`
        },
        {
          name: 'String Methods',
          explanation: 'Java 15 adds new String methods to support text blocks: formatted() for printf-style formatting, stripIndent() to remove incidental whitespace, and translateEscapes() to process escape sequences.',
          codeExample: `// formatted() - convenient printf-style formatting
String greeting = """
    Hello, %s!
    Your balance is $%.2f
    """.formatted("Alice", 1234.56);

// stripIndent() - remove common leading whitespace
String indented = "    Line 1\\n    Line 2\\n    Line 3";
String stripped = indented.stripIndent();
System.out.println("Stripped:\\n" + stripped);

// translateEscapes() - process escape sequences
String withEscapes = "Hello\\\\nWorld";  // Literal \\n
String processed = withEscapes.translateEscapes();
System.out.println("Processed: " + processed);  // Actual newline

// Combining methods
String template = """
    {
        "name": "%s",
        "email": "%s",
        "active": %b
    }
    """.formatted("John", "john@example.com", true);

System.out.println(template);
// Output:
// {
//     "name": "John",
//     "email": "john@example.com",
//     "active": true
// }`
        }
      ]
    },
    {
      id: 'sealed-classes',
      name: 'Sealed Classes',
      icon: '🔒',
      color: '#3b82f6',
      description: 'Control class hierarchies with permits clause - enable exhaustive pattern matching.',
      diagram: SealedClassesDiagram,
      details: [
        {
          name: 'Preview Feature',
          diagram: SealedClassesDiagram,
          explanation: 'Sealed classes were introduced as a preview feature in Java 15 (JEP 360), refined in Java 16 (JEP 397), and finalized in Java 17 (JEP 409). They allow you to control which classes can extend or implement a type.',
          codeExample: `// Enable preview features in Java 15
// javac --release 15 --enable-preview SealedExample.java
// java --enable-preview SealedExample

// Sealed class - explicitly lists permitted subclasses
public sealed class Shape permits Circle, Rectangle, Triangle {
    public abstract double area();
}

// Subclasses must be final, sealed, or non-sealed
public final class Circle extends Shape {
    private final double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    @Override
    public double area() {
        return Math.PI * radius * radius;
    }
}

public final class Rectangle extends Shape {
    private final double width, height;

    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    @Override
    public double area() {
        return width * height;
    }
}

public final class Triangle extends Shape {
    private final double base, height;

    public Triangle(double base, double height) {
        this.base = base;
        this.height = height;
    }

    @Override
    public double area() {
        return 0.5 * base * height;
    }
}`
        },
        {
          name: 'Pattern Matching',
          diagram: PatternMatchingDiagram,
          explanation: 'Sealed types enable exhaustive pattern matching. The compiler knows all possible subtypes, so no default case is needed in switch expressions. This provides type safety and ensures all cases are handled.',
          codeExample: `// Sealed type hierarchy
public sealed interface Result<T> permits Success, Failure {
}

public final class Success<T> implements Result<T> {
    private final T value;

    public Success(T value) { this.value = value; }
    public T getValue() { return value; }
}

public final class Failure<T> implements Result<T> {
    private final String error;

    public Failure(String error) { this.error = error; }
    public String getError() { return error; }
}

// Exhaustive pattern matching
public class ResultProcessor {
    public static <T> void handleResult(Result<T> result) {
        // Pattern matching with instanceof
        if (result instanceof Success<T> s) {
            System.out.println("Success: " + s.getValue());
        } else if (result instanceof Failure<T> f) {
            System.out.println("Error: " + f.getError());
        }
        // Compiler knows these are the only cases!
    }

    // Future: switch expressions (Java 17+)
    // public static <T> String format(Result<T> result) {
    //     return switch (result) {
    //         case Success<T> s -> "OK: " + s.getValue();
    //         case Failure<T> f -> "ERROR: " + f.getError();
    //         // No default needed!
    //     };
    // }

    public static void main(String[] args) {
        Result<Integer> r1 = new Success<>(42);
        Result<Integer> r2 = new Failure<>("Not found");

        handleResult(r1);  // Success: 42
        handleResult(r2);  // Error: Not found
    }
}`
        },
        {
          name: 'Design Benefits',
          explanation: 'Sealed classes provide controlled extension points, clear domain boundaries, and API design benefits. They enable modeling closed sets of types like payment methods, states, or events with compiler-enforced invariants.',
          codeExample: `// Domain modeling: Payment types
public sealed interface Payment permits CreditCard, PayPal, Crypto {
    void process(double amount);
}

public final class CreditCard implements Payment {
    private final String cardNumber;
    private final String cvv;

    public CreditCard(String cardNumber, String cvv) {
        this.cardNumber = cardNumber;
        this.cvv = cvv;
    }

    @Override
    public void process(double amount) {
        System.out.println("Processing $" + amount + " via Credit Card");
        // Secure credit card processing
    }
}

public final class PayPal implements Payment {
    private final String email;

    public PayPal(String email) {
        this.email = email;
    }

    @Override
    public void process(double amount) {
        System.out.println("Processing $" + amount + " via PayPal: " + email);
    }
}

public final class Crypto implements Payment {
    private final String wallet;

    public Crypto(String wallet) {
        this.wallet = wallet;
    }

    @Override
    public void process(double amount) {
        System.out.println("Processing $" + amount + " to wallet: " + wallet);
    }
}

// Benefits:
// 1. Closed set - no surprise implementations
// 2. API maintainer controls extension
// 3. Exhaustive switch possible
// 4. Compiler enforces proper implementation`
        },
        {
          name: 'Subclass Modifiers',
          explanation: 'Permitted subclasses must be declared as final (no further extension), sealed (controlled extension), or non-sealed (open to any extension). This gives fine-grained control over the hierarchy.',
          codeExample: `// Three options for permitted subclasses

// 1. final - no further extension
public sealed class Vehicle permits Car, Motorcycle, Truck {}

public final class Car extends Vehicle {
    // Cannot be extended
}

// 2. sealed - controlled extension (continue the chain)
public sealed class Motorcycle extends Vehicle permits SportBike, Cruiser {}

public final class SportBike extends Motorcycle {}
public final class Cruiser extends Motorcycle {}

// 3. non-sealed - open to extension (break the chain)
public non-sealed class Truck extends Vehicle {
    // Anyone can extend Truck
}

public class PickupTruck extends Truck {
    // This is allowed because Truck is non-sealed
}

public class SemiTruck extends Truck {
    // Also allowed
}

// Usage example
public static void describe(Vehicle v) {
    if (v instanceof Car c) {
        System.out.println("A car");
    } else if (v instanceof SportBike sb) {
        System.out.println("A sport bike");
    } else if (v instanceof Cruiser cr) {
        System.out.println("A cruiser motorcycle");
    } else if (v instanceof Truck t) {
        System.out.println("A truck (could be any subtype)");
    }
}`
        }
      ]
    },
    {
      id: 'records',
      name: 'Records',
      icon: '📦',
      color: '#10b981',
      description: 'Immutable data carriers with compact syntax - auto-generates constructor, accessors, equals, hashCode, toString.',
      diagram: RecordsDiagram,
      details: [
        {
          name: 'Data Carrier Classes',
          diagram: RecordsDiagram,
          explanation: 'Records are transparent carriers for immutable data. A single line declaration generates constructor, accessor methods, equals(), hashCode(), and toString(). They dramatically reduce boilerplate.',
          codeExample: `// Traditional class - lots of boilerplate!
public class PersonOld {
    private final String name;
    private final int age;

    public PersonOld(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() { return name; }
    public int getAge() { return age; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PersonOld)) return false;
        PersonOld person = (PersonOld) o;
        return age == person.age && name.equals(person.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }

    @Override
    public String toString() {
        return "Person[name=" + name + ", age=" + age + "]";
    }
}

// Record - one line does it all!
public record Person(String name, int age) {}

// Usage
Person person1 = new Person("Alice", 30);
Person person2 = new Person("Alice", 30);

System.out.println(person1.name());       // Alice (not getName()!)
System.out.println(person1.age());        // 30
System.out.println(person1);              // Person[name=Alice, age=30]
System.out.println(person1.equals(person2));  // true
System.out.println(person1.hashCode() == person2.hashCode());  // true`
        },
        {
          name: 'Compact Syntax',
          explanation: 'Records support generic parameters, interface implementation, nested records, and computed properties. Accessor methods are named after components (x() not getX()) following a more functional style.',
          codeExample: `// Records with multiple components
public record Point(int x, int y) {}

// Nested records with computed properties
public record Rectangle(Point topLeft, Point bottomRight) {
    public int width() {
        return bottomRight.x() - topLeft.x();
    }

    public int height() {
        return bottomRight.y() - topLeft.y();
    }

    public int area() {
        return width() * height();
    }
}

// Generic records
public record Pair<K, V>(K key, V value) {}

// Record implementing interface
public record Employee(String name, int id) implements Comparable<Employee> {
    @Override
    public int compareTo(Employee other) {
        return Integer.compare(this.id, other.id);
    }
}

// Usage
Point p1 = new Point(0, 0);
Point p2 = new Point(10, 10);
Rectangle rect = new Rectangle(p1, p2);

System.out.println("Width: " + rect.width());   // 10
System.out.println("Height: " + rect.height()); // 10
System.out.println("Area: " + rect.area());     // 100

Pair<String, Integer> pair = new Pair<>("age", 25);
System.out.println(pair.key() + ": " + pair.value());  // age: 25`
        },
        {
          name: 'Immutability',
          diagram: ImmutabilityDiagram,
          explanation: 'Records are immutable by design - all fields are final, no setters are generated, and records cannot be extended. This makes them thread-safe, suitable as Map keys, and easy to reason about.',
          codeExample: `// Records are immutable - all fields final
public record BankAccount(String owner, double balance) {
    // This would NOT compile - cannot modify final field
    // public void deposit(double amount) {
    //     balance += amount;  // ERROR!
    // }

    // Instead, return a new instance (functional style)
    public BankAccount deposit(double amount) {
        return new BankAccount(owner, balance + amount);
    }

    public BankAccount withdraw(double amount) {
        if (amount > balance) {
            throw new IllegalArgumentException("Insufficient funds");
        }
        return new BankAccount(owner, balance - amount);
    }
}

// Records are implicitly final - cannot be extended
// public class SavingsAccount extends BankAccount {}  // ERROR!

// Usage demonstrating immutability
BankAccount account1 = new BankAccount("Alice", 1000.0);
BankAccount account2 = account1.deposit(500.0);   // New instance
BankAccount account3 = account2.withdraw(200.0);  // Another new

System.out.println("Original: " + account1.balance());       // 1000.0
System.out.println("After deposit: " + account2.balance());  // 1500.0
System.out.println("After withdrawal: " + account3.balance()); // 1300.0

// Benefits:
// - Thread-safe by default
// - Safe to share across threads
// - Can be used as Map keys
// - Easier to reason about`
        },
        {
          name: 'Customization',
          explanation: 'Records support compact constructors for validation, custom methods, static factory methods, and method overriding. The compact constructor syntax allows validation without parameter list repetition.',
          codeExample: `// Compact constructor for validation
public record Temperature(double celsius) {
    // Compact constructor - no parameter list needed
    public Temperature {
        if (celsius < -273.15) {
            throw new IllegalArgumentException(
                "Temperature below absolute zero: " + celsius
            );
        }
    }

    // Custom methods
    public double fahrenheit() {
        return celsius * 9/5 + 32;
    }

    public double kelvin() {
        return celsius + 273.15;
    }

    // Static factory method
    public static Temperature fromFahrenheit(double f) {
        return new Temperature((f - 32) * 5/9);
    }

    // Override generated toString
    @Override
    public String toString() {
        return String.format("%.2f C (%.2f F)", celsius, fahrenheit());
    }
}

// Canonical constructor with normalization
public record Range(int min, int max) {
    public Range(int min, int max) {
        // Normalize - ensure min <= max
        if (min > max) {
            int temp = min;
            min = max;
            max = temp;
        }
        this.min = min;
        this.max = max;
    }

    public boolean contains(int value) {
        return value >= min && value <= max;
    }
}

// Usage
Temperature temp = new Temperature(25.0);
System.out.println(temp);  // 25.00 C (77.00 F)
System.out.println("Kelvin: " + temp.kelvin());  // 298.15

Range range = new Range(10, 5);  // Normalized to (5, 10)
System.out.println("Min: " + range.min());  // 5
System.out.println("Max: " + range.max());  // 10`
        },
        {
          name: 'Local Records',
          explanation: 'Java 15 added support for local records - records defined inside methods. This is useful for intermediate data transformations, grouping related values, and avoiding class pollution.',
          codeExample: `// Local records - defined inside methods
public class OrderProcessor {

    public void processOrders(List<Order> orders) {
        // Local record for intermediate aggregation
        record OrderSummary(String customerId, double total, int count) {}

        // Group and aggregate orders
        Map<String, OrderSummary> summaries = orders.stream()
            .collect(Collectors.groupingBy(
                Order::customerId,
                Collectors.collectingAndThen(
                    Collectors.toList(),
                    list -> new OrderSummary(
                        list.get(0).customerId(),
                        list.stream().mapToDouble(Order::amount).sum(),
                        list.size()
                    )
                )
            ));

        // Process summaries
        summaries.values().forEach(s ->
            System.out.printf("Customer %s: $%.2f (%d orders)%n",
                s.customerId(), s.total(), s.count())
        );
    }

    public List<String> findTopCustomers(List<Transaction> transactions) {
        // Local record for ranking
        record CustomerTotal(String customer, double total) {}

        return transactions.stream()
            .collect(Collectors.groupingBy(
                Transaction::customer,
                Collectors.summingDouble(Transaction::amount)
            ))
            .entrySet().stream()
            .map(e -> new CustomerTotal(e.getKey(), e.getValue()))
            .sorted((a, b) -> Double.compare(b.total(), a.total()))
            .limit(10)
            .map(CustomerTotal::customer)
            .toList();
    }
}

// Benefits of local records:
// 1. Scoped to method - no class pollution
// 2. Clear intent - data transformation
// 3. Type-safe intermediate results
// 4. Cleaner than anonymous classes`
        }
      ]
    },
    {
      id: 'hidden-classes',
      name: 'Hidden Classes',
      icon: '🔐',
      color: '#f59e0b',
      description: 'Dynamic class generation for frameworks - not discoverable by Class.forName(), auto-unloading.',
      diagram: HiddenClassesDiagram,
      details: [
        {
          name: 'Dynamic Class Generation',
          diagram: HiddenClassesDiagram,
          explanation: 'Hidden classes are classes that cannot be used directly by bytecode of other classes. They are created dynamically at runtime using Lookup.defineHiddenClass() and are intended for use by frameworks that generate classes at runtime.',
          codeExample: `import java.lang.invoke.MethodHandles;
import java.lang.invoke.MethodHandles.Lookup;
import java.lang.invoke.MethodType;
import java.lang.invoke.MethodHandle;

public class HiddenClassExample {
    public static void main(String[] args) throws Throwable {
        // Bytecode for a simple class (generated by framework)
        byte[] classBytes = generateSimpleClass();

        // Get lookup context
        Lookup lookup = MethodHandles.lookup();

        // Define a hidden class
        Lookup hiddenLookup = lookup.defineHiddenClass(
            classBytes,
            true,  // initialize immediately
            Lookup.ClassOption.NESTMATE
        );

        // Get the hidden class
        Class<?> hiddenClass = hiddenLookup.lookupClass();

        // Hidden class has dynamically generated name
        System.out.println("Hidden class: " + hiddenClass.getName());
        // Output: HiddenClass/0x1a2b3c4d (unique suffix)

        // Cannot be found by name!
        try {
            Class.forName(hiddenClass.getName());
            System.out.println("Found - unexpected!");
        } catch (ClassNotFoundException e) {
            System.out.println("Cannot find by Class.forName() - as expected");
        }

        // Access through MethodHandles
        MethodHandle constructor = hiddenLookup.findConstructor(
            hiddenClass,
            MethodType.methodType(void.class)
        );

        Object instance = constructor.invoke();
        System.out.println("Instance: " + instance);
    }

    private static byte[] generateSimpleClass() {
        // In reality, use ASM or ByteBuddy to generate bytecode
        return new byte[]{/* bytecode */};
    }
}`
        },
        {
          name: 'Framework Support',
          explanation: 'Hidden classes replace unsafe mechanisms like sun.misc.Unsafe for framework class generation. They support JVM languages, dynamic proxies, lambda expressions, and method handle optimization with a standard, supported API.',
          codeExample: `import java.lang.invoke.*;

// Hidden classes support frameworks that generate code at runtime

public class FrameworkSupport {

    // Lambda expressions internally use hidden classes
    public static void lambdaExample() {
        Runnable lambda = () -> System.out.println("Lambda!");
        lambda.run();

        // Lambda is implemented as a hidden class
        System.out.println("Lambda class: " + lambda.getClass().getName());
        // Output includes $$Lambda$ indicating hidden class implementation
    }

    // Dynamic proxy alternative using hidden classes
    public static Object createProxy(Class<?> interfaceType,
                                      InvocationHandler handler) throws Throwable {
        // Generate proxy bytecode
        byte[] proxyBytes = generateProxyClass(interfaceType);

        Lookup lookup = MethodHandles.lookup();

        // Define as hidden class
        Lookup proxyLookup = lookup.defineHiddenClass(
            proxyBytes,
            true,
            Lookup.ClassOption.STRONG  // Strong reference
        );

        Class<?> proxyClass = proxyLookup.lookupClass();

        // Create instance
        MethodHandle constructor = proxyLookup.findConstructor(
            proxyClass,
            MethodType.methodType(void.class, InvocationHandler.class)
        );

        return constructor.invoke(handler);
    }

    // MethodHandle performance with hidden classes
    public static void methodHandleExample() throws Throwable {
        Lookup lookup = MethodHandles.lookup();

        MethodHandle mh = lookup.findVirtual(
            String.class,
            "length",
            MethodType.methodType(int.class)
        );

        int length = (int) mh.invoke("Hello, Hidden Classes!");
        System.out.println("Length: " + length);
    }

    private static byte[] generateProxyClass(Class<?> iface) {
        // Use ASM or ByteBuddy
        return new byte[]{/* bytecode */};
    }
}`
        },
        {
          name: 'Unloading',
          explanation: 'Hidden classes can be unloaded independently of their defining class loader. This prevents metaspace memory leaks from dynamic class generation and is ideal for long-running applications that generate many temporary classes.',
          codeExample: `import java.lang.invoke.MethodHandles;
import java.lang.invoke.MethodHandles.Lookup;
import java.lang.ref.WeakReference;

public class HiddenClassUnloading {

    public static void demonstrateUnloading() throws Throwable {
        System.out.println("Creating hidden class...");

        byte[] classBytes = generateClass();
        Lookup lookup = MethodHandles.lookup();

        // Define hidden class (without STRONG option)
        Lookup hiddenLookup = lookup.defineHiddenClass(
            classBytes,
            true  // No ClassOption.STRONG
        );

        Class<?> hiddenClass = hiddenLookup.lookupClass();
        WeakReference<Class<?>> weakRef = new WeakReference<>(hiddenClass);

        System.out.println("Hidden class: " + hiddenClass.getName());

        // Create and use instance
        Object instance = hiddenLookup.findConstructor(
            hiddenClass,
            java.lang.invoke.MethodType.methodType(void.class)
        ).invoke();

        System.out.println("Instance created: " + instance);

        // Clear references
        hiddenClass = null;
        hiddenLookup = null;
        instance = null;

        // Request garbage collection
        System.gc();
        Thread.sleep(100);

        // Check if unloaded
        if (weakRef.get() == null) {
            System.out.println("Hidden class has been unloaded!");
        } else {
            System.out.println("Hidden class still in memory");
        }

        // Benefits:
        // 1. No metaspace leaks from dynamic class generation
        // 2. Framework-generated classes cleaned up automatically
        // 3. Ideal for scripting engines, JVM languages
        // 4. Better memory management in long-running apps
    }

    private static byte[] generateClass() {
        return new byte[]{/* bytecode */};
    }
}`
        },
        {
          name: 'Access Control',
          explanation: 'Hidden classes provide strong encapsulation - they cannot be referenced by name in bytecode, Class.forName() cannot find them, and reflection access is controlled through the Lookup API. This prevents security vulnerabilities.',
          codeExample: `import java.lang.invoke.*;
import java.lang.reflect.Method;

public class HiddenClassSecurity {

    public static void demonstrateSecurity() throws Throwable {
        byte[] secretClass = generateSecretClass();
        Lookup lookup = MethodHandles.lookup();

        // Define hidden class
        Lookup hiddenLookup = lookup.defineHiddenClass(
            secretClass,
            true,
            Lookup.ClassOption.NESTMATE
        );

        Class<?> hidden = hiddenLookup.lookupClass();
        System.out.println("Hidden class: " + hidden.getName());

        // Test 1: Cannot find by name
        try {
            Class.forName(hidden.getName());
            System.out.println("ERROR: Found by Class.forName!");
        } catch (ClassNotFoundException e) {
            System.out.println("OK: Cannot find by name");
        }

        // Test 2: Reflection sees methods but cannot invoke
        Method[] methods = hidden.getDeclaredMethods();
        System.out.println("Methods visible: " + methods.length);

        try {
            methods[0].setAccessible(true);
            methods[0].invoke(null);
            System.out.println("ERROR: Method invoked!");
        } catch (Exception e) {
            System.out.println("OK: Cannot invoke without Lookup");
        }

        // Test 3: Proper access through Lookup
        MethodHandle secretMethod = hiddenLookup.findStatic(
            hidden,
            "processSecret",
            MethodType.methodType(String.class)
        );

        String result = (String) secretMethod.invoke();
        System.out.println("OK: Accessed with Lookup: " + result);

        // Security benefits:
        // 1. Framework code cannot be hijacked
        // 2. No reflection-based attacks
        // 3. Controlled access through Lookup API
        // 4. Strong encapsulation guaranteed
    }

    private static byte[] generateSecretClass() {
        return new byte[]{/* bytecode */};
    }
}`
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
      { name: 'Java 15', icon: '🚀', page: 'Java 15' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #064e3b 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #34d399, #10b981)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(16, 185, 129, 0.2)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    borderRadius: '0.5rem',
    color: '#10b981',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Java 15 Features</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(16, 185, 129, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Back to Java
        </button>
      </div>

      {/* Breadcrumb */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu}
          colors={JAVA15_COLORS}
        />
      </div>

      {/* Concept Cards Grid */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
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

      {/* Modal */}
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
              width: '95vw', maxWidth: '1400px', height: '90vh',
              overflow: 'auto',
              border: `1px solid ${selectedConcept.color}40`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Breadcrumb */}
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
              onMainMenu={breadcrumb?.onMainMenu}
              colors={JAVA15_COLORS}
            />

            {/* Modal Header */}
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
                >Prev</button>
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
                >Next</button>
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
                >Close</button>
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

            {/* Detail Content */}
            {(() => {
              const detail = selectedConcept.details[selectedDetailIndex]
              const colorScheme = SUBTOPIC_COLORS[selectedDetailIndex % SUBTOPIC_COLORS.length]
              const DiagramComponent = detail.diagram || selectedConcept.diagram
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

export default Java15
