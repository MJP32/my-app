import { useState, useEffect, useRef } from 'react'

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

const ModernDiagram = ({ components, onComponentClick, title, width = 1400, height = 800, containerWidth = 1800, focusedIndex }) => {
  const [hoveredComponent, setHoveredComponent] = useState(null)

  return (
    <div style={{
      width: '100%',
      maxWidth: `${containerWidth}px`,
      margin: '0 auto',
      backgroundColor: '#f8fafc',
      borderRadius: '16px',
      padding: '2rem',
      boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1)',
      border: '2px solid #e2e8f0'
    }}>
      <h3 style={{
        textAlign: 'center',
        marginBottom: '2rem',
        fontSize: '1.75rem',
        fontWeight: '800',
        color: '#1e293b',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        {title}
      </h3>

      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#1e40af" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#059669" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="tealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#0d9488" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="indigoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#db2777" stopOpacity="0.9"/>
          </linearGradient>

          {/* Arrow markers */}
          <marker id="arrowSolid" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#1e293b" />
          </marker>
          <marker id="arrowDashed" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#64748b" />
          </marker>
        </defs>

        {/* Architectural layer backgrounds */}
        <g opacity="0.1">
          <rect x="50" y="180" width="420" height="200" rx="16" fill="#3b82f6" />
          <text x="260" y="210" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e40af" opacity="0.6">
            Layer 1
          </text>

          <rect x="550" y="80" width="420" height="560" rx="16" fill="#10b981" />
          <text x="760" y="110" textAnchor="middle" fontSize="14" fontWeight="700" fill="#059669" opacity="0.6">
            Layer 2
          </text>

          <rect x="1050" y="180" width="420" height="520" rx="16" fill="#8b5cf6" />
          <text x="1260" y="210" textAnchor="middle" fontSize="14" fontWeight="700" fill="#7c3aed" opacity="0.6">
            Layer 3
          </text>
        </g>

        {/* Connecting lines with arrows and labels */}
        <g fill="none">
          <line x1="430" y1="300" x2="580" y2="200" stroke="#1e293b" strokeWidth="3" strokeOpacity="0.8" markerEnd="url(#arrowSolid)"/>
          <text x="505" y="240" fontSize="11" fontWeight="600" fill="#1e293b" textAnchor="middle">
            interacts
          </text>

          <line x1="430" y1="300" x2="580" y2="400" stroke="#1e293b" strokeWidth="3" strokeOpacity="0.8" markerEnd="url(#arrowSolid)"/>
          <text x="505" y="360" fontSize="11" fontWeight="600" fill="#1e293b" textAnchor="middle">
            uses
          </text>

          <line x1="930" y1="200" x2="1080" y2="300" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="1005" y="240" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            depends
          </text>

          <line x1="930" y1="400" x2="1080" y2="500" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="1005" y="460" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            provides
          </text>

          <line x1="430" y1="500" x2="580" y2="600" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="505" y="560" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            extends
          </text>

          <line x1="930" y1="500" x2="760" y2="600" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="845" y="560" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            integrates
          </text>
        </g>

        {/* Component rectangles */}
        {components.map((component, index) => {
          const isFocused = focusedIndex === index
          const isHovered = hoveredComponent === component.id
          const isHighlighted = isFocused || isHovered

          return (
          <g key={component.id}>
            {/* Focused ring indicator */}
            {isFocused && (
              <rect
                x={component.x - 6}
                y={component.y - 6}
                width={component.width + 12}
                height={component.height + 12}
                rx="16"
                ry="16"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="4"
                style={{
                  opacity: 0.9,
                  filter: 'drop-shadow(0 0 12px rgba(251, 191, 36, 0.6))'
                }}
              />
            )}
            <rect
              x={component.x}
              y={component.y}
              width={component.width}
              height={component.height}
              rx="12"
              ry="12"
              fill={`url(#${component.color}Gradient)`}
              stroke={isHighlighted ? '#1e293b' : '#64748b'}
              strokeWidth={isHighlighted ? '4' : '2'}
              style={{
                cursor: 'pointer',
                filter: isHighlighted ? 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))' : 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                transform: isHighlighted ? 'scale(1.05)' : 'scale(1)',
                transformOrigin: `${component.x + component.width/2}px ${component.y + component.height/2}px`,
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={() => setHoveredComponent(component.id)}
              onMouseLeave={() => setHoveredComponent(null)}
              onClick={() => onComponentClick && onComponentClick(component)}
            />

            {/* Icon */}
            <text
              x={component.x + component.width/2}
              y={component.y + 35}
              textAnchor="middle"
              fontSize="48"
              style={{ userSelect: 'none', pointerEvents: 'none' }}
            >
              {component.icon}
            </text>

            {/* Title */}
            <text
              x={component.x + component.width/2}
              y={component.y + 75}
              textAnchor="middle"
              fontSize="18"
              fontWeight="700"
              fill="white"
              style={{ userSelect: 'none', pointerEvents: 'none' }}
            >
              {component.title}
            </text>

            {/* Details */}
            {component.details && component.details.slice(0, 3).map((detail, idx) => (
              <text
                key={idx}
                x={component.x + component.width/2}
                y={component.y + 100 + (idx * 15)}
                textAnchor="middle"
                fontSize="10"
                fontWeight="500"
                fill="rgba(255,255,255,0.9)"
                style={{ userSelect: 'none', pointerEvents: 'none' }}
              >
                {detail.name.length > 18 ? detail.name.substring(0, 15) + '...' : detail.name}
              </text>
            ))}
            {component.details && component.details.length > 3 && (
              <text
                x={component.x + component.width/2}
                y={component.y + 145}
                textAnchor="middle"
                fontSize="10"
                fontWeight="500"
                fill="rgba(255,255,255,0.7)"
                style={{ userSelect: 'none', pointerEvents: 'none' }}
              >
                +{component.details.length - 3} more features...
              </text>
            )}
          </g>
        )})}
      </svg>
    </div>
  )
}

function Java15({ onBack }) {
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedConcept, setSelectedConcept] = useState(null)
  const [focusedComponentIndex, setFocusedComponentIndex] = useState(0)

  const components = [
    {
      id: 'text-blocks', x: 80, y: 240, width: 350, height: 160,
      icon: '📝', title: 'Text Blocks', color: 'blue',
      details: [
        {
          name: 'Multi-line Strings',
          explanation: 'Text blocks use triple quotes """ to define multi-line string literals. Preserves formatting, indentation, and line breaks without escape sequences. Makes SQL queries, JSON, HTML, and multi-line text much more readable.',
          codeExample: `// Before Java 15 - old way with escape sequences
String html = "<html>\\n" +
              "  <body>\\n" +
              "    <p>Hello World</p>\\n" +
              "  </body>\\n" +
              "</html>";

// Java 15 Text Blocks - clean and readable
String htmlBlock = """
    <html>
      <body>
        <p>Hello World</p>
      </body>
    </html>
    """;

// SQL Query example
String query = """
    SELECT
      users.id,
      users.name,
      orders.total
    FROM users
    INNER JOIN orders ON users.id = orders.user_id
    WHERE orders.status = 'COMPLETED'
    ORDER BY orders.total DESC
    """;

// JSON example
String json = """
    {
      "name": "John Doe",
      "age": 30,
      "address": {
        "street": "123 Main St",
        "city": "New York"
      }
    }
    """;

System.out.println(htmlBlock);
System.out.println(query);

// Output:
// <html>
//   <body>
//     <p>Hello World</p>
//   </body>
// </html>
// (SQL and JSON formatted as written)`
        },
        {
          name: 'Automatic Indentation',
          explanation: 'Compiler automatically removes incidental whitespace based on the least-indented line. Opening """ must be on its own line. Closing """ position determines indentation removal. Enables natural code formatting.',
          codeExample: `public class TextBlockIndentation {
  public static void main(String[] args) {
    // Indentation determined by closing delimiter position
    String aligned = """
        Line 1
        Line 2
        Line 3
        """;

    // All lines aligned to leftmost content
    String poem = """
        Roses are red,
          Violets are blue,
            Text blocks are neat,
              And preserve indentation too!
        """;

    // Closing delimiter on same line as last content
    String compact = """
        First line
        Second line""";

    // Using text block in method call
    System.out.println("""
        ┌─────────────────┐
        │  Java 15 Rocks! │
        └─────────────────┘
        """);

    // Incidental whitespace removed
    String code = """
            public void method() {
                System.out.println("Hello");
            }
            """;

    System.out.println(aligned);
    System.out.println(poem);

    // Output:
    // Line 1
    // Line 2
    // Line 3
    //
    // Roses are red,
    //   Violets are blue,
    //     Text blocks are neat,
    //       And preserve indentation too!
  }
}`
        },
        {
          name: 'Escape Sequences',
          explanation: 'Supports standard escape sequences: \\n (newline), \\t (tab), \\" (quote). New \\s escape preserves trailing spaces. \\ at end of line suppresses newline. Provides control when needed.',
          codeExample: `public class TextBlockEscapes {
  public static void main(String[] args) {
    // Standard escape sequences work
    String withEscapes = """
        First line\\nSecond line with explicit newline
        Tab\\there
        Quote: \\" inside text block
        """;

    // New \\s escape preserves trailing spaces
    String withSpaces = """
        Line with trailing spaces\\s\\s\\s
        Next line
        """;

    // Line continuation with \\ (suppress newline)
    String longLine = """
        This is a very long line \\
        that continues on the next line \\
        without actual line breaks.
        """;

    // Combining escapes
    String formatted = """
        Name:\\tJohn Doe
        Age:\\t30
        City:\\t"New York"
        """;

    // Unicode escapes work too
    String unicode = """
        Greek: \\u03B1\\u03B2\\u03B3
        Math: \\u221E \\u2248 \\u2260
        """;

    System.out.println(withEscapes);
    System.out.println(longLine);
    System.out.println(formatted);

    // Output:
    // First line
    // Second line with explicit newline
    // Tab    here
    // Quote: " inside text block
    //
    // This is a very long line that continues on the next line without actual line breaks.
    //
    // Name:    John Doe
    // Age:     30
    // City:    "New York"
  }
}`
        },
        {
          name: 'Use Cases',
          explanation: 'Perfect for SQL queries, JSON/XML templates, HTML snippets, regex patterns, and any multi-line string content. Eliminates string concatenation and escape character noise in code.',
          codeExample: `import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class TextBlockUseCases {
  public static void main(String[] args) {
    // 1. SQL Queries
    String insertQuery = """
        INSERT INTO employees (first_name, last_name, email, salary)
        VALUES (?, ?, ?, ?)
        """;

    // 2. HTML Templates
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

    // 3. JSON Configuration
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

    // 4. Complex Regex Patterns
    String regexPattern = """
        ^                     # Start of line
        [a-zA-Z0-9._%+-]+     # Local part
        @                     # @ symbol
        [a-zA-Z0-9.-]+        # Domain name
        \\.[a-zA-Z]{2,}       # Top-level domain
        $                     # End of line
        """;

    // 5. Test Data
    String testData = """
        user1,john@example.com,active
        user2,jane@example.com,inactive
        user3,bob@example.com,active
        """;

    // Using HTML template
    String email = String.format(
      emailTemplate,
      "John Doe",
      "https://example.com/activate"
    );

    System.out.println("SQL: " + insertQuery);
    System.out.println("Email:\\n" + email);

    // Output:
    // SQL: INSERT INTO employees (first_name, last_name, email, salary)
    //      VALUES (?, ?, ?, ?)
    // Email: [formatted HTML with John Doe and activation link]
  }
}`
        },
        {
          name: 'Preview to Standard',
          explanation: 'Introduced as preview in Java 13, second preview in Java 14, finalized as standard feature in Java 15. Shows Java\'s careful feature evolution process.',
          codeExample: `// Java 13 (First Preview) - enable with --enable-preview
// javac --release 13 --enable-preview Example.java
// java --enable-preview Example

// Java 14 (Second Preview) - refinements added
// - Added \\s escape sequence for trailing spaces
// - Improved indentation handling

// Java 15 (Standard Feature) - no preview flag needed!
public class TextBlockEvolution {
  public static void main(String[] args) {
    // Now a permanent feature in Java 15+
    String message = """
        Text blocks are now standard!
        No more --enable-preview flag needed.
        This is production-ready code.
        """;

    // Evolution timeline:
    String timeline = """
        ┌──────────┬────────────────────────────────┐
        │ Version  │ Status                         │
        ├──────────┼────────────────────────────────┤
        │ Java 13  │ First Preview (JEP 355)        │
        │ Java 14  │ Second Preview (JEP 368)       │
        │ Java 15  │ Standard Feature (JEP 378)     │
        └──────────┴────────────────────────────────┘
        """;

    // Key improvements from preview to standard:
    // 1. Escape sequences refined (\\s added in Java 14)
    // 2. Indentation algorithm improved
    // 3. Edge cases handled better
    // 4. Performance optimizations

    System.out.println(message);
    System.out.println(timeline);

    // Real-world example showing maturity
    String productionCode = """
        {
          "apiVersion": "v1",
          "kind": "Service",
          "metadata": {
            "name": "my-service"
          },
          "spec": {
            "selector": {
              "app": "MyApp"
            },
            "ports": [
              {
                "protocol": "TCP",
                "port": 80,
                "targetPort": 9376
              }
            ]
          }
        }
        """;

    System.out.println("Kubernetes manifest:\\n" + productionCode);

    // Output:
    // Text blocks are now standard!
    // No more --enable-preview flag needed.
    // This is production-ready code.
  }
}`
        }
      ],
      description: 'Multi-line string literals with automatic indentation management, eliminating escape sequences for cleaner code.'
    },
    {
      id: 'sealed-classes', x: 580, y: 140, width: 350, height: 160,
      icon: '🔒', title: 'Sealed Classes (Preview)', color: 'green',
      details: [
        {
          name: 'Controlled Inheritance',
          explanation: 'Sealed classes restrict which classes can extend them using "sealed" keyword and "permits" clause. Enables controlled type hierarchies between public extensibility and final classes. Author has control over all subclasses.',
          codeExample: `// Sealed class with permits clause
public sealed class Shape permits Circle, Rectangle, Triangle {
  protected double area;

  public double getArea() {
    return area;
  }
}

// Permitted subclasses must be final, sealed, or non-sealed
public final class Circle extends Shape {
  private double radius;

  public Circle(double radius) {
    this.radius = radius;
    this.area = Math.PI * radius * radius;
  }
}

public final class Rectangle extends Shape {
  private double width, height;

  public Rectangle(double width, double height) {
    this.width = width;
    this.height = height;
    this.area = width * height;
  }
}

public final class Triangle extends Shape {
  private double base, height;

  public Triangle(double base, double height) {
    this.base = base;
    this.height = height;
    this.area = 0.5 * base * height;
  }
}

// This would NOT compile - Pentagon not in permits list
// public class Pentagon extends Shape { }  // ERROR!

// Usage
Shape circle = new Circle(5.0);
Shape rectangle = new Rectangle(4.0, 6.0);
System.out.println("Circle area: " + circle.getArea());
System.out.println("Rectangle area: " + rectangle.getArea());

// Output:
// Circle area: 78.53981633974483
// Rectangle area: 24.0`
        },
        {
          name: 'Permitted Subclasses',
          explanation: 'Use "permits" to list allowed subclasses: sealed class Shape permits Circle, Rectangle, Triangle. Permitted classes must be final, sealed, or non-sealed. Compiler enforces this hierarchy.',
          codeExample: `// Sealed interface with multiple implementers
public sealed interface Vehicle permits Car, Truck, Motorcycle {
  void start();
  void stop();
  int getMaxSpeed();
}

// Final implementation
public final class Car implements Vehicle {
  private String model;

  public Car(String model) {
    this.model = model;
  }

  public void start() {
    System.out.println(model + " car started");
  }

  public void stop() {
    System.out.println(model + " car stopped");
  }

  public int getMaxSpeed() {
    return 200;
  }
}

// Another sealed class in the hierarchy
public sealed class Truck implements Vehicle permits DeliveryTruck, DumpTruck {
  public void start() {
    System.out.println("Truck started");
  }

  public void stop() {
    System.out.println("Truck stopped");
  }

  public int getMaxSpeed() {
    return 120;
  }
}

// Final subclass of sealed Truck
public final class DeliveryTruck extends Truck {
  private int cargoCapacity;

  public DeliveryTruck(int capacity) {
    this.cargoCapacity = capacity;
  }

  public int getCargoCapacity() {
    return cargoCapacity;
  }
}

public final class DumpTruck extends Truck {
  private int dumpCapacity;

  public DumpTruck(int capacity) {
    this.dumpCapacity = capacity;
  }
}

// Final implementation
public final class Motorcycle implements Vehicle {
  public void start() {
    System.out.println("Motorcycle started");
  }

  public void stop() {
    System.out.println("Motorcycle stopped");
  }

  public int getMaxSpeed() {
    return 180;
  }
}

// Usage
Vehicle car = new Car("Tesla Model 3");
Vehicle truck = new DeliveryTruck(1000);
car.start();
System.out.println("Max speed: " + car.getMaxSpeed());

// Output:
// Tesla Model 3 car started
// Max speed: 200`
        },
        {
          name: 'Pattern Matching',
          explanation: 'Works perfectly with pattern matching and switch expressions. Compiler knows all possible subtypes, enabling exhaustive checking without default case. Makes algebraic data types possible in Java.',
          codeExample: `// Sealed type hierarchy for JSON values
public sealed interface JsonValue
  permits JsonObject, JsonArray, JsonString, JsonNumber, JsonBoolean, JsonNull {
}

public final class JsonObject implements JsonValue {
  // Implementation
}

public final class JsonArray implements JsonValue {
  // Implementation
}

public final class JsonString implements JsonValue {
  private String value;
  public JsonString(String value) { this.value = value; }
  public String getValue() { return value; }
}

public final class JsonNumber implements JsonValue {
  private double value;
  public JsonNumber(double value) { this.value = value; }
  public double getValue() { return value; }
}

public final class JsonBoolean implements JsonValue {
  private boolean value;
  public JsonBoolean(boolean value) { this.value = value; }
  public boolean getValue() { return value; }
}

public final class JsonNull implements JsonValue {
}

// Exhaustive switch with pattern matching (future feature)
// Compiler knows all possible types - no default needed!
public static String formatJson(JsonValue json) {
  return switch (json) {
    case JsonString s -> "\\"" + s.getValue() + "\\"";
    case JsonNumber n -> String.valueOf(n.getValue());
    case JsonBoolean b -> String.valueOf(b.getValue());
    case JsonNull n -> "null";
    case JsonObject o -> "{...}";
    case JsonArray a -> "[...]";
    // No default case needed - compiler knows all cases covered!
  };
}

// Traditional instanceof with sealed types
public static void processValue(JsonValue json) {
  if (json instanceof JsonString s) {
    System.out.println("String: " + s.getValue());
  } else if (json instanceof JsonNumber n) {
    System.out.println("Number: " + n.getValue());
  } else if (json instanceof JsonBoolean b) {
    System.out.println("Boolean: " + b.getValue());
  } else if (json instanceof JsonNull) {
    System.out.println("Null value");
  }
  // Compiler helps ensure all cases handled
}

// Usage
JsonValue str = new JsonString("Hello");
JsonValue num = new JsonNumber(42);
System.out.println(formatJson(str));
System.out.println(formatJson(num));

// Output:
// "Hello"
// 42.0`
        },
        {
          name: 'Non-Sealed Option',
          explanation: 'Permitted subclasses can be "non-sealed" to allow further extension beyond the sealed hierarchy. Provides escape hatch when needed while maintaining control at sealed level.',
          codeExample: `// Sealed base class with controlled extension
public sealed class Animal permits Mammal, Bird, Fish {
  protected String name;

  public Animal(String name) {
    this.name = name;
  }

  public abstract String makeSound();
}

// Non-sealed class - allows further extension
public non-sealed class Mammal extends Animal {
  public Mammal(String name) {
    super(name);
  }

  public String makeSound() {
    return "Generic mammal sound";
  }
}

// Anyone can now extend Mammal!
public class Dog extends Mammal {
  public Dog(String name) {
    super(name);
  }

  @Override
  public String makeSound() {
    return "Woof!";
  }
}

public class Cat extends Mammal {
  public Cat(String name) {
    super(name);
  }

  @Override
  public String makeSound() {
    return "Meow!";
  }
}

// Final sealed subclass
public final class Bird extends Animal {
  public Bird(String name) {
    super(name);
  }

  public String makeSound() {
    return "Chirp!";
  }
}

// Sealed subclass with its own hierarchy
public sealed class Fish extends Animal permits Goldfish, Shark {
  public Fish(String name) {
    super(name);
  }

  public String makeSound() {
    return "Blub!";
  }
}

public final class Goldfish extends Fish {
  public Goldfish(String name) {
    super(name);
  }
}

public final class Shark extends Fish {
  public Shark(String name) {
    super(name);
  }

  @Override
  public String makeSound() {
    return "Chomp!";
  }
}

// Usage
Animal dog = new Dog("Buddy");
Animal cat = new Cat("Whiskers");
Animal bird = new Bird("Tweety");

System.out.println(dog.name + ": " + dog.makeSound());
System.out.println(cat.name + ": " + cat.makeSound());
System.out.println(bird.name + ": " + bird.makeSound());

// Output:
// Buddy: Woof!
// Whiskers: Meow!
// Tweety: Chirp!`
        },
        {
          name: 'Design Benefits',
          explanation: 'Models closed domain concepts (payment types, shapes, states). Enables better API design with controlled extension points. Compiler helps maintain invariants across type hierarchy.',
          codeExample: `// Domain modeling: Payment types
public sealed interface Payment permits CreditCardPayment, PayPalPayment, CryptoPayment {
  void process(double amount);
  String getPaymentMethod();
}

public final class CreditCardPayment implements Payment {
  private String cardNumber;
  private String cvv;

  public CreditCardPayment(String cardNumber, String cvv) {
    this.cardNumber = cardNumber;
    this.cvv = cvv;
  }

  public void process(double amount) {
    System.out.println("Processing $" + amount + " via Credit Card");
    // Secure credit card processing logic
  }

  public String getPaymentMethod() {
    return "Credit Card ending in " + cardNumber.substring(cardNumber.length() - 4);
  }
}

public final class PayPalPayment implements Payment {
  private String email;

  public PayPalPayment(String email) {
    this.email = email;
  }

  public void process(double amount) {
    System.out.println("Processing $" + amount + " via PayPal");
    // PayPal API integration
  }

  public String getPaymentMethod() {
    return "PayPal: " + email;
  }
}

public final class CryptoPayment implements Payment {
  private String walletAddress;
  private String currency;

  public CryptoPayment(String walletAddress, String currency) {
    this.walletAddress = walletAddress;
    this.currency = currency;
  }

  public void process(double amount) {
    System.out.println("Processing $" + amount + " via " + currency);
    // Blockchain transaction logic
  }

  public String getPaymentMethod() {
    return currency + " wallet: " + walletAddress.substring(0, 8) + "...";
  }
}

// Benefits:
// 1. Closed set of payment types - no surprise implementations
// 2. Exhaustive switch possible
// 3. API maintainer controls extension
// 4. Compiler enforces proper implementation

public class PaymentProcessor {
  public static void processPayment(Payment payment, double amount) {
    // Exhaustive handling of all payment types
    String method = switch (payment) {
      case CreditCardPayment cc -> "Credit Card";
      case PayPalPayment pp -> "PayPal";
      case CryptoPayment cp -> "Cryptocurrency";
      // No default needed!
    };

    System.out.println("Using payment method: " + method);
    payment.process(amount);
    System.out.println("Payment via " + payment.getPaymentMethod() + " completed");
  }

  public static void main(String[] args) {
    Payment payment1 = new CreditCardPayment("1234-5678-9012-3456", "123");
    Payment payment2 = new PayPalPayment("user@example.com");

    processPayment(payment1, 99.99);
    System.out.println();
    processPayment(payment2, 149.99);
  }
}

// Output:
// Using payment method: Credit Card
// Processing $99.99 via Credit Card
// Payment via Credit Card ending in 3456 completed
//
// Using payment method: PayPal
// Processing $149.99 via PayPal
// Payment via PayPal: user@example.com completed`
        },
        {
          name: 'Preview Feature',
          explanation: 'Preview feature in Java 15, second preview in Java 16, finalized in Java 17. Demonstrates iterative refinement based on developer feedback.',
          codeExample: `// Java 15 (First Preview) - requires --enable-preview
// javac --release 15 --enable-preview SealedExample.java
// java --enable-preview SealedExample

// Evolution timeline:
// Java 15: First preview (JEP 360)
// Java 16: Second preview (JEP 397) - refinements
// Java 17: Standard feature (JEP 409) - finalized

// Preview phase allowed testing and feedback
public sealed class Result permits Success, Failure {
  private Result() {}
}

public final class Success extends Result {
  private Object value;

  public Success(Object value) {
    this.value = value;
  }

  public Object getValue() {
    return value;
  }
}

public final class Failure extends Result {
  private String error;

  public Failure(String error) {
    this.error = error;
  }

  public String getError() {
    return error;
  }
}

// Example showing iterative improvement
// In Java 15 preview, you could test sealed classes
// Feedback led to refinements in Java 16
// By Java 17, feature was production-ready

public class DatabaseOperation {
  public static Result executeQuery(String query) {
    try {
      // Simulate database operation
      if (query.contains("SELECT")) {
        return new Success("Query results: 42 rows");
      } else {
        return new Failure("Invalid query syntax");
      }
    } catch (Exception e) {
      return new Failure(e.getMessage());
    }
  }

  public static void handleResult(Result result) {
    // Pattern matching with sealed types
    if (result instanceof Success s) {
      System.out.println("Success: " + s.getValue());
    } else if (result instanceof Failure f) {
      System.out.println("Error: " + f.getError());
    }
    // Compiler knows these are the only options!
  }

  public static void main(String[] args) {
    Result r1 = executeQuery("SELECT * FROM users");
    Result r2 = executeQuery("INVALID QUERY");

    handleResult(r1);
    handleResult(r2);

    // Key improvements during preview:
    // 1. Local sealed classes support added
    // 2. Better error messages
    // 3. Interaction with pattern matching refined
    // 4. Documentation and best practices established
  }
}

// Output:
// Success: Query results: 42 rows
// Error: Invalid query syntax`
        }
      ],
      description: 'Controlled inheritance allowing classes to restrict their subclasses, enabling better domain modeling and exhaustive pattern matching.'
    },
    {
      id: 'hidden-classes', x: 580, y: 340, width: 350, height: 160,
      icon: '👻', title: 'Hidden Classes', color: 'purple',
      details: [
        {
          name: 'Dynamic Class Generation',
          explanation: 'Hidden classes are classes that cannot be used directly by bytecode of other classes. Created dynamically at runtime by frameworks. Not discoverable via reflection by normal means. Replace sun.misc.Unsafe usage.',
          codeExample: `import java.lang.invoke.MethodHandles;
import java.lang.invoke.MethodHandles.Lookup;

public class HiddenClassExample {
  public static void main(String[] args) throws Throwable {
    // Bytecode for a simple class
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
    System.out.println("Hidden class name: " + hiddenClass.getName());
    // Output: HiddenClass/0x1a2b3c4d (or similar)

    // Cannot be found by name
    try {
      Class.forName(hiddenClass.getName());
    } catch (ClassNotFoundException e) {
      System.out.println("Cannot find hidden class by name!");
    }

    // Can instantiate using lookup
    Object instance = hiddenLookup.findConstructor(
      hiddenClass,
      java.lang.invoke.MethodType.methodType(void.class)
    ).invoke();

    System.out.println("Instance created: " + instance);
  }

  private static byte[] generateSimpleClass() {
    // In reality, use ASM or ByteBuddy to generate bytecode
    // This is simplified for demonstration
    return new byte[]{/* bytecode here */};
  }
}

// Output:
// Hidden class name: HiddenClass/0x1a2b3c4d
// Cannot find hidden class by name!
// Instance created: HiddenClass@abc123`
        },
        {
          name: 'Framework Support',
          explanation: 'Designed for frameworks that generate classes at runtime: JVM languages (Groovy, Kotlin), dynamic proxies, lambda expressions, method handles. Provides standard API replacing internal mechanisms.',
          codeExample: `import java.lang.invoke.*;
import java.lang.reflect.Method;

// Hidden classes replace unsafe mechanisms in frameworks
public class FrameworkUsage {
  // Lambda expressions internally use hidden classes
  public static void lambdaExample() {
    Runnable lambda = () -> System.out.println("Lambda using hidden class");
    lambda.run();

    // The lambda is implemented as a hidden class
    System.out.println("Lambda class: " + lambda.getClass().getName());
    // Output includes $$Lambda$ indicating hidden class
  }

  // Dynamic proxy replacement with hidden classes
  public static void proxyExample() throws Throwable {
    // Before: JDK Dynamic Proxy
    // Now: Can use hidden classes for better performance

    byte[] proxyBytes = generateProxyClass();

    Lookup lookup = MethodHandles.lookup();
    Lookup proxyLookup = lookup.defineHiddenClass(
      proxyBytes,
      true,
      Lookup.ClassOption.STRONG
    );

    Class<?> proxyClass = proxyLookup.lookupClass();
    System.out.println("Proxy class created: " + proxyClass.getSimpleName());
  }

  // Method handle usage with hidden classes
  public static void methodHandleExample() throws Throwable {
    // Hidden classes improve method handle performance
    MethodHandles.Lookup lookup = MethodHandles.lookup();

    MethodHandle mh = lookup.findVirtual(
      String.class,
      "length",
      MethodType.methodType(int.class)
    );

    int length = (int) mh.invoke("Hello");
    System.out.println("Length: " + length);
  }

  private static byte[] generateProxyClass() {
    // Framework generates bytecode for proxy
    return new byte[]{/* bytecode */};
  }

  public static void main(String[] args) throws Throwable {
    lambdaExample();
    proxyExample();
    methodHandleExample();
  }
}

// Output:
// Lambda using hidden class
// Lambda class: FrameworkUsage$$Lambda$1/0x123456789
// Proxy class created: Proxy
// Length: 5`
        },
        {
          name: 'Unloading',
          explanation: 'Hidden classes can be unloaded independently when no longer reachable, even if their defining class loader is still alive. Improves memory management for dynamic code generation.',
          codeExample: `import java.lang.invoke.MethodHandles;
import java.lang.invoke.MethodHandles.Lookup;
import java.lang.ref.WeakReference;

public class HiddenClassUnloading {
  public static void main(String[] args) throws Throwable {
    // Demonstrate hidden class unloading
    System.out.println("Creating hidden class...");

    byte[] classBytes = generateClass();
    Lookup lookup = MethodHandles.lookup();

    // Define hidden class
    Lookup hiddenLookup = lookup.defineHiddenClass(
      classBytes,
      true
    );

    Class<?> hiddenClass = hiddenLookup.lookupClass();
    WeakReference<Class<?>> weakRef = new WeakReference<>(hiddenClass);

    System.out.println("Hidden class created: " + hiddenClass.getName());

    // Create instance
    Object instance = hiddenLookup.findConstructor(
      hiddenClass,
      java.lang.invoke.MethodType.methodType(void.class)
    ).invoke();

    System.out.println("Instance created");

    // Clear references
    hiddenClass = null;
    hiddenLookup = null;
    instance = null;

    // Request garbage collection
    System.gc();
    Thread.sleep(100);

    // Check if class was unloaded
    if (weakRef.get() == null) {
      System.out.println("Hidden class has been unloaded!");
    } else {
      System.out.println("Hidden class still in memory");
    }

    // Benefits:
    // 1. No metaspace leak with dynamic class generation
    // 2. Framework-generated classes cleaned up automatically
    // 3. Better memory management in long-running applications
    // 4. Ideal for scripting engines and JVM languages
  }

  private static byte[] generateClass() {
    // Generate bytecode
    return new byte[]{/* bytecode */};
  }
}

// Output:
// Creating hidden class...
// Hidden class created: GeneratedClass/0x1a2b3c4d
// Instance created
// Hidden class has been unloaded!`
        },
        {
          name: 'Lookup.defineHiddenClass',
          explanation: 'Created via Lookup.defineHiddenClass() API. Returns Lookup with full access to hidden class. Class cannot be referenced by name in bytecode. More secure and maintainable than previous approaches.',
          codeExample: `import java.lang.invoke.MethodHandles;
import java.lang.invoke.MethodHandles.Lookup;
import java.lang.invoke.MethodType;
import java.lang.invoke.MethodHandle;

public class DefineHiddenClassAPI {
  public static void main(String[] args) throws Throwable {
    byte[] classBytes = generateCalculatorClass();

    // Get current lookup context
    Lookup lookup = MethodHandles.lookup();

    // Define hidden class with options
    Lookup hiddenLookup = lookup.defineHiddenClass(
      classBytes,
      true,  // initialize the class
      Lookup.ClassOption.NESTMATE,  // Make it a nestmate
      Lookup.ClassOption.STRONG     // Strong reachability
    );

    Class<?> hiddenClass = hiddenLookup.lookupClass();
    System.out.println("Defined hidden class: " + hiddenClass.getName());

    // Access hidden class through lookup
    // Find constructor
    MethodHandle constructor = hiddenLookup.findConstructor(
      hiddenClass,
      MethodType.methodType(void.class)
    );

    // Create instance
    Object calculator = constructor.invoke();

    // Find and invoke method
    MethodHandle addMethod = hiddenLookup.findVirtual(
      hiddenClass,
      "add",
      MethodType.methodType(int.class, int.class, int.class)
    );

    int result = (int) addMethod.invoke(calculator, 5, 3);
    System.out.println("5 + 3 = " + result);

    // Class Options explained:
    // NESTMATE: Hidden class is nestmate of lookup class
    // STRONG: Strong reference (won't be unloaded while lookup exists)

    // Cannot access without proper Lookup
    try {
      Class.forName(hiddenClass.getName());
      System.out.println("Found by name (unexpected!)");
    } catch (ClassNotFoundException e) {
      System.out.println("Cannot find by name (expected)");
    }
  }

  private static byte[] generateCalculatorClass() {
    // In real code, use ASM or ByteBuddy:
    // ClassWriter cw = new ClassWriter(0);
    // cw.visit(V15, ACC_PUBLIC, "Calculator", null, "java/lang/Object", null);
    // ... generate add method ...
    // return cw.toByteArray();
    return new byte[]{/* Calculator bytecode */};
  }
}

// Output:
// Defined hidden class: Calculator/0x5f4b2c3a
// 5 + 3 = 8
// Cannot find by name (expected)`
        },
        {
          name: 'Access Control',
          explanation: 'Hidden classes have strong encapsulation - cannot be referenced by name, discovered via Class.forName(), or accessed reflectively without proper Lookup. Enhances security for framework-generated code.',
          codeExample: `import java.lang.invoke.*;
import java.lang.reflect.Method;

public class HiddenClassSecurity {
  public static void main(String[] args) throws Throwable {
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

    // Security Test 1: Cannot find by name
    try {
      Class.forName(hidden.getName());
      System.out.println("ERROR: Found by Class.forName!");
    } catch (ClassNotFoundException e) {
      System.out.println("✓ Protected: Cannot find by name");
    }

    // Security Test 2: Cannot discover methods without proper Lookup
    Method[] methods = hidden.getDeclaredMethods();
    System.out.println("✓ Methods visible via reflection: " + methods.length);

    // But cannot invoke without proper access
    try {
      methods[0].invoke(null);
      System.out.println("ERROR: Method invoked without Lookup!");
    } catch (IllegalAccessException e) {
      System.out.println("✓ Protected: Cannot invoke without Lookup");
    }

    // Security Test 3: Proper way to access
    MethodHandle secretMethod = hiddenLookup.findStatic(
      hidden,
      "processSecret",
      MethodType.methodType(String.class)
    );

    String result = (String) secretMethod.invoke();
    System.out.println("✓ Accessed with proper Lookup: " + result);

    // Security benefits:
    // 1. Framework code cannot be hijacked
    // 2. No reflection-based attacks
    // 3. Controlled access through Lookup API
    // 4. Strong encapsulation guarantees
  }

  private static byte[] generateSecretClass() {
    // Generates class with sensitive logic
    return new byte[]{/* bytecode for secret operations */};
  }
}

// Output:
// Hidden class: SecretClass/0x7a8b9c0d
// ✓ Protected: Cannot find by name
// ✓ Methods visible via reflection: 1
// ✓ Protected: Cannot invoke without Lookup
// ✓ Accessed with proper Lookup: secret_data_processed`
        }
      ],
      description: 'Framework-level feature for dynamic class generation with improved unloading and encapsulation, replacing unsafe mechanisms.'
    },
    {
      id: 'records-preview', x: 80, y: 440, width: 350, height: 160,
      icon: '📦', title: 'Records (Second Preview)', color: 'red',
      details: [
        {
          name: 'Data Carrier Classes',
          explanation: 'Records are transparent carriers for immutable data. Syntax: record Point(int x, int y) {}. Automatically generates constructor, getters, equals(), hashCode(), toString(). Reduces boilerplate dramatically.',
          codeExample: `// Before Records - traditional class (boilerplate!)
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

// Java 15 Records - concise and clear!
public record Person(String name, int age) {}

// Usage
Person person1 = new Person("Alice", 30);
Person person2 = new Person("Alice", 30);

System.out.println(person1.name());      // Alice
System.out.println(person1.age());       // 30
System.out.println(person1);             // Person[name=Alice, age=30]
System.out.println(person1.equals(person2));  // true
System.out.println(person1.hashCode() == person2.hashCode());  // true

// Output:
// Alice
// 30
// Person[name=Alice, age=30]
// true
// true`
        },
        {
          name: 'Compact Syntax',
          explanation: 'Just declare components in header. No need for explicit fields, constructors, or accessors. Compiler generates everything. Accessor methods named after components (not getX(), just x()).',
          codeExample: `// Records with multiple components
public record Point(int x, int y) {}

public record Rectangle(Point topLeft, Point bottomRight) {
  // Computed property
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

System.out.println("Width: " + rect.width());
System.out.println("Height: " + rect.height());
System.out.println("Area: " + rect.area());

Pair<String, Integer> pair = new Pair<>("age", 25);
System.out.println(pair.key() + ": " + pair.value());

Employee emp1 = new Employee("John", 102);
Employee emp2 = new Employee("Jane", 101);
System.out.println("Compare: " + emp1.compareTo(emp2));

// Output:
// Width: 10
// Height: 10
// Area: 100
// age: 25
// Compare: 1`
        },
        {
          name: 'Immutability',
          explanation: 'All fields are implicitly final. Cannot extend other classes (implicitly final itself). Can implement interfaces. Immutability by default encourages better design patterns.',
          codeExample: `// Records are immutable - all fields final
public record BankAccount(String owner, double balance) {
  // This would NOT compile - trying to modify field
  // public void deposit(double amount) {
  //   balance += amount;  // ERROR: cannot assign to final field
  // }

  // Instead, return new instance (functional style)
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

// Records cannot be extended (implicitly final)
// public record SavingsAccount extends BankAccount { }  // ERROR!

// But can implement interfaces
public interface Account {
  String owner();
  double balance();
}

public record CheckingAccount(String owner, double balance) implements Account {
  // Implements interface naturally
}

// Usage demonstrating immutability
BankAccount account1 = new BankAccount("Alice", 1000.0);
BankAccount account2 = account1.deposit(500.0);  // New instance
BankAccount account3 = account2.withdraw(200.0);  // Another new instance

System.out.println("Original: " + account1.balance());  // 1000.0
System.out.println("After deposit: " + account2.balance());  // 1500.0
System.out.println("After withdrawal: " + account3.balance());  // 1300.0

// Benefits of immutability:
// 1. Thread-safe by default
// 2. Safe to share across threads
// 3. Can be used as map keys
// 4. Easier to reason about

// Output:
// Original: 1000.0
// After deposit: 1500.0
// After withdrawal: 1300.0`
        },
        {
          name: 'Customization',
          explanation: 'Can add custom constructors (compact form validates arguments), custom methods, static members. Can override generated methods. Provides flexibility when needed while keeping concise syntax.',
          codeExample: `// Record with validation using compact constructor
public record Temperature(double celsius) {
  // Compact constructor - no parameter list
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
    return String.format("%.2f°C (%.2f°F)", celsius, fahrenheit());
  }
}

// Record with custom canonical constructor
public record Range(int min, int max) {
  // Full canonical constructor with normalization
  public Range(int min, int max) {
    if (min > max) {
      // Swap if needed
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

  public int size() {
    return max - min + 1;
  }
}

// Usage
Temperature temp = new Temperature(25.0);
System.out.println(temp);
System.out.println("Kelvin: " + temp.kelvin());

Temperature temp2 = Temperature.fromFahrenheit(77.0);
System.out.println("From Fahrenheit: " + temp2);

Range range = new Range(10, 5);  // Will be normalized to (5, 10)
System.out.println("Range: [" + range.min() + ", " + range.max() + "]");
System.out.println("Contains 7: " + range.contains(7));

// Output:
// 25.00°C (77.00°F)
// Kelvin: 298.15
// From Fahrenheit: 25.00°C (77.00°F)
// Range: [5, 10]
// Contains 7: true`
        },
        {
          name: 'Pattern Matching',
          explanation: 'Records work excellently with pattern matching. Can destructure records in patterns. Enables functional-style programming patterns in Java.',
          codeExample: `// Records with pattern matching (preview in Java 15)
public sealed interface Shape permits Circle, Rectangle, Triangle {}

public record Circle(double radius) implements Shape {}
public record Rectangle(double width, double height) implements Shape {}
public record Triangle(double base, double height) implements Shape {}

public class ShapeProcessor {
  public static double calculateArea(Shape shape) {
    // Pattern matching with instanceof
    if (shape instanceof Circle c) {
      return Math.PI * c.radius() * c.radius();
    } else if (shape instanceof Rectangle r) {
      return r.width() * r.height();
    } else if (shape instanceof Triangle t) {
      return 0.5 * t.base() * t.height();
    }
    throw new IllegalArgumentException("Unknown shape");
  }

  // Future: Record patterns (coming in later Java versions)
  // public static double calculateArea(Shape shape) {
  //   return switch (shape) {
  //     case Circle(double r) -> Math.PI * r * r;
  //     case Rectangle(double w, double h) -> w * h;
  //     case Triangle(double b, double h) -> 0.5 * b * h;
  //   };
  // }
}

// Nested records with pattern matching
public record Point(int x, int y) {}
public record Line(Point start, Point end) {}

public class GeometryUtils {
  public static double lineLength(Line line) {
    // Accessing nested record components
    int dx = line.end().x() - line.start().x();
    int dy = line.end().y() - line.start().y();
    return Math.sqrt(dx * dx + dy * dy);
  }

  public static boolean isVertical(Line line) {
    return line.start().x() == line.end().x();
  }

  public static boolean isHorizontal(Line line) {
    return line.start().y() == line.end().y();
  }
}

// Usage
Shape circle = new Circle(5.0);
Shape rect = new Rectangle(4.0, 6.0);

System.out.println("Circle area: " + ShapeProcessor.calculateArea(circle));
System.out.println("Rectangle area: " + ShapeProcessor.calculateArea(rect));

Line line = new Line(new Point(0, 0), new Point(3, 4));
System.out.println("Line length: " + GeometryUtils.lineLength(line));

// Output:
// Circle area: 78.53981633974483
// Rectangle area: 24.0
// Line length: 5.0`
        },
        {
          name: 'Preview Refinements',
          explanation: 'First preview in Java 14, second preview in Java 15 with refinements (local records, annotations on records), finalized in Java 16. Iterative improvement process.',
          codeExample: `// Java 14 (First Preview)
// Basic record support introduced

// Java 15 (Second Preview) - New features added:

// 1. Local Records - records defined inside methods
public class LocalRecordsExample {
  public static void processMerchants(List<Transaction> transactions) {
    // Local record inside method!
    record MerchantTotal(String merchant, double total) {}

    Map<String, Double> totals = new HashMap<>();
    for (Transaction tx : transactions) {
      totals.merge(tx.merchant(), tx.amount(), Double::sum);
    }

    List<MerchantTotal> results = totals.entrySet().stream()
      .map(e -> new MerchantTotal(e.getKey(), e.getValue()))
      .sorted((a, b) -> Double.compare(b.total(), a.total()))
      .toList();

    results.forEach(mt ->
      System.out.println(mt.merchant() + ": $" + mt.total())
    );
  }
}

// 2. Annotations on record components
public record User(
  @NotNull String username,
  @Email String email,
  @Min(18) int age
) {}

// 3. Better support for serialization
public record SerializableData(
  String id,
  LocalDate timestamp
) implements java.io.Serializable {}

// Java 16 (Final) - Finalized with all refinements

// Record with @Override on accessor
public record Product(String name, double price) {
  @Override
  public String name() {
    return name.toUpperCase();
  }
}

// Records in switch (when combined with pattern matching)
public class PaymentProcessor {
  sealed interface Payment permits CashPayment, CardPayment {}
  record CashPayment(double amount) implements Payment {}
  record CardPayment(String cardNumber, double amount) implements Payment {}

  public static String processPayment(Payment payment) {
    if (payment instanceof CashPayment cash) {
      return "Cash payment: $" + cash.amount();
    } else if (payment instanceof CardPayment card) {
      return "Card ending in " +
             card.cardNumber().substring(card.cardNumber().length() - 4) +
             ": $" + card.amount();
    }
    return "Unknown payment";
  }
}

// Output example:
// Amazon: $1250.50
// Walmart: $890.75
// Target: $650.25`
        }
      ],
      description: 'Concise syntax for immutable data carrier classes with automatic implementations of common methods (second preview).'
    },
    {
      id: 'pattern-matching', x: 580, y: 540, width: 350, height: 160,
      icon: '🎯', title: 'Pattern Matching (Second Preview)', color: 'orange',
      details: [
        { name: 'instanceof Patterns', explanation: 'Pattern matching for instanceof eliminates explicit cast: if (obj instanceof String s) { use s directly }. Pattern variable s is automatically scoped and cast. Type-safe and concise.' },
        { name: 'Scope Rules', explanation: 'Pattern variable is in scope where pattern matching succeeds. Works with boolean operators: if (obj instanceof String s && s.length() > 5). Compiler tracks flow-sensitive scoping.' },
        { name: 'Null Safety', explanation: 'instanceof with pattern matching never matches null. Pattern variable not in scope when null. Eliminates null checks before instanceof patterns. Makes code safer by default.' },
        { name: 'Reduces Boilerplate', explanation: 'Eliminates repetitive cast-after-test idiom: no more if (obj instanceof String) { String s = (String) obj; }. More readable and less error-prone code.' },
        { name: 'Foundation for Future', explanation: 'Sets foundation for more advanced pattern matching: switch patterns, record patterns, array patterns. Part of Java\'s evolution toward more expressive type patterns.' },
        { name: 'Preview Evolution', explanation: 'First preview in Java 14, second preview in Java 15, finalized in Java 16. Each iteration refined based on community feedback.' }
      ],
      description: 'Enhanced instanceof with pattern variables, eliminating explicit casts and reducing boilerplate (second preview).'
    },
    {
      id: 'zgc', x: 1080, y: 240, width: 350, height: 160,
      icon: '🗑️', title: 'ZGC Improvements', color: 'teal',
      details: [
        { name: 'Production Ready', explanation: 'Z Garbage Collector (ZGC) moves from experimental to production-ready in Java 15. Low-latency garbage collector with sub-millisecond pause times. Handles heaps from 8MB to 16TB.' },
        { name: 'Concurrent Operations', explanation: 'Performs most GC work concurrently with application threads. Pause times don\'t increase with heap size or live-set size. Consistent low latency regardless of heap pressure.' },
        { name: 'Uncommit Unused Memory', explanation: 'ZGC now returns unused heap memory to operating system. Improves resource utilization in containerized environments. Memory footprint adjusts dynamically based on application needs.' },
        { name: 'Performance Characteristics', explanation: 'Sub-millisecond pause times (typically < 1ms). Max pause time independent of heap size. Throughput overhead typically < 15%. Ideal for latency-sensitive applications.' },
        { name: 'Use Cases', explanation: 'Perfect for large heap applications, low-latency requirements, microservices, cloud deployments. Used in financial trading systems, real-time analytics, responsive web applications.' },
        { name: 'Platform Support', explanation: 'Available on Linux, Windows, and macOS. Production-ready status means it\'s fully supported and recommended for production use. Represents major advancement in Java GC technology.' }
      ],
      description: 'Low-latency garbage collector achieving production-ready status with sub-millisecond pause times and improved memory management.'
    },
    {
      id: 'nashorn-removal', x: 1080, y: 440, width: 350, height: 160,
      icon: '⚠️', title: 'Nashorn Removal', color: 'indigo',
      details: [
        { name: 'Deprecation Timeline', explanation: 'Nashorn JavaScript engine deprecated for removal in Java 11. Officially removed in Java 15. Gives users 4 Java versions (2+ years) to migrate. Demonstrates Java\'s careful deprecation policy.' },
        { name: 'Removal Rationale', explanation: 'ECMAScript language evolves rapidly. Maintaining Nashorn required significant effort. Limited usage in modern Java applications. Better alternatives available (GraalVM).' },
        { name: 'Migration Path', explanation: 'GraalVM provides modern JavaScript engine with better performance. Supports latest ECMAScript versions. Standalone Nashorn available as separate module for compatibility.' },
        { name: 'Impact Assessment', explanation: 'Affects applications using jjs command-line tool, javax.script API with Nashorn, or embedded JavaScript execution. Most modern applications unaffected.' },
        { name: 'Alternatives', explanation: 'GraalVM JavaScript for modern JavaScript support. Standalone Nashorn OpenJDK project for backward compatibility. Native JavaScript engines for specific use cases.' }
      ],
      description: 'Removal of Nashorn JavaScript engine after deprecation period, encouraging migration to modern alternatives like GraalVM.'
    },
    {
      id: 'other-features', x: 1080, y: 640, width: 350, height: 140,
      icon: '🚀', title: 'Additional Improvements', color: 'pink',
      details: [
        { name: 'Edwards-Curve Crypto', explanation: 'Added EdDSA (Edwards-Curve Digital Signature Algorithm) cryptography support. Modern elliptic curve signature scheme. Better performance and security than traditional algorithms.' },
        { name: 'Helpful NPEs', explanation: 'Enhanced NullPointerException messages showing precisely which variable was null. Example: "Cannot invoke String.length() because local variable s is null". Dramatically improves debugging.' },
        { name: 'Reimplemented Legacy APIs', explanation: 'DatagramSocket and MulticastSocket APIs reimplemented to be simpler, more maintainable, and ready for Project Loom. Improved performance and reliability.' },
        { name: 'Shenandoah GC', explanation: 'Shenandoah low-pause-time garbage collector no longer experimental. Alternative to ZGC with different tradeoffs. Provides another option for low-latency applications.' }
      ],
      description: 'Various improvements including modern cryptography, enhanced NullPointerException messages, and GC enhancements.'
    }
  ]

  const handleComponentClick = (component) => {
    setSelectedComponent(component)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedComponent(null)
    setSelectedConcept(null)


  }

  // Use refs to access current modal state in event handler
  const selectedConceptRef = useRef(selectedConcept)
  useEffect(() => {
    selectedConceptRef.current = selectedConcept
  }, [selectedConcept])


  // Set initial focus on mount
  useEffect(() => {
    setFocusedComponentIndex(0)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      const currentSelectedConcept = selectedConceptRef.current
      // Handle Escape to close modal or go back to menu
      if (e.key === 'Escape') {
        if (currentSelectedConcept) {
          e.preventDefault()
          e.stopImmediatePropagation()
          setSelectedConcept(null)
          return
        }
        return
      }

      if (currentSelectedConcept) {
        // Modal is open, don't handle other keys
        return
      }

      // Navigation when modal is closed
      const componentCount = components.length

      switch(e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault()
          setFocusedComponentIndex((prev) => (prev + 1) % componentCount)
          break
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault()
          setFocusedComponentIndex((prev) => (prev - 1 + componentCount) % componentCount)
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          if (components[focusedComponentIndex]) {
            handleComponentClick(components[focusedComponentIndex])
          }
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [focusedComponentIndex])

  const handleConceptClick = (concept) => {
    setSelectedConcept(concept)
  }

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '95%',
      margin: '120px auto 0',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
      border: '3px solid rgba(139, 92, 246, 0.4)'
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
          📝 Java 15 Features
        </h1>
        <div style={{ width: '120px' }}></div>
      </div>

      <div style={{
        backgroundColor: 'rgba(139, 92, 246, 0.05)',
        padding: '2.5rem 10rem',
        borderRadius: '16px',
        border: '3px solid rgba(139, 92, 246, 0.3)',
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
          Java 15 brings text blocks to standard, advances sealed classes and records through preview,
          enhances pattern matching, makes ZGC production-ready, and removes Nashorn JavaScript engine.
          Continues Java\'s evolution toward more expressive and modern language features.
        </p>
      </div>

      <ModernDiagram
        components={components}
        onComponentClick={handleComponentClick}
        title="Java 15 Features & Enhancements"
        width={1400}
        height={800}
        containerWidth={1800}
      
        focusedIndex={focusedComponentIndex}
      />

      {/* Modal */}
      {isModalOpen && selectedComponent && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 99999
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2.5rem',
            borderRadius: '16px',
            maxWidth: '1400px',
            width: '95%',
            maxHeight: '85vh',
            overflowY: 'auto',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            border: '3px solid rgba(139, 92, 246, 0.4)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '800',
                color: '#1f2937',
                margin: 0,
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                {selectedComponent.icon} {selectedComponent.title}
              </h2>
              <button
                onClick={closeModal}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                ✕
              </button>
            </div>

            <div style={{
              backgroundColor: 'rgba(139, 92, 246, 0.05)',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '2px solid rgba(139, 92, 246, 0.2)',
              marginBottom: '2rem'
            }}>
              <p style={{
                fontSize: '1.1rem',
                color: '#374151',
                fontWeight: '500',
                margin: 0,
                lineHeight: '1.6'
              }}>
                {selectedComponent.description}
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: selectedConcept ? '1fr 1fr' : '1fr',
              gap: '2rem'
            }}>
              <div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '1rem'
                }}>
                  Key Features
                </h3>
                <div style={{
                  display: 'grid',
                  gap: '0.75rem'
                }}>
                  {selectedComponent.details.map((detail, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleConceptClick(detail)}
                      style={{
                        backgroundColor: selectedConcept?.name === detail.name
                          ? 'rgba(139, 92, 246, 0.15)'
                          : 'rgba(34, 197, 94, 0.1)',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        border: selectedConcept?.name === detail.name
                          ? '2px solid rgba(139, 92, 246, 0.4)'
                          : '2px solid rgba(34, 197, 94, 0.2)',
                        fontSize: '0.95rem',
                        fontWeight: '500',
                        color: selectedConcept?.name === detail.name
                          ? '#7c3aed'
                          : '#166534',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        transform: 'scale(1)'
                      }}
                      onMouseEnter={(e) => {
                        if (selectedConcept?.name !== detail.name) {
                          e.target.style.backgroundColor = 'rgba(34, 197, 94, 0.15)'
                          e.target.style.transform = 'scale(1.02)'
                          e.target.style.borderColor = 'rgba(34, 197, 94, 0.4)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedConcept?.name !== detail.name) {
                          e.target.style.backgroundColor = 'rgba(34, 197, 94, 0.1)'
                          e.target.style.transform = 'scale(1)'
                          e.target.style.borderColor = 'rgba(34, 197, 94, 0.2)'
                        }
                      }}
                    >
                      • {detail.name}
                      {selectedConcept?.name === detail.name && (
                        <span style={{
                          fontSize: '0.8rem',
                          opacity: 0.8,
                          marginLeft: '0.5rem',
                          fontWeight: '600'
                        }}>
                          ← Selected
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {selectedConcept && (
                <div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#1f2937',
                    marginBottom: '1rem'
                  }}>
                    {selectedConcept.name}
                  </h3>

                  <div style={{
                    backgroundColor: 'rgba(139, 92, 246, 0.05)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '2px solid rgba(139, 92, 246, 0.2)',
                    marginBottom: '1.5rem'
                  }}>
                    <p style={{
                      fontSize: '1rem',
                      color: '#374151',
                      fontWeight: '500',
                      margin: 0,
                      lineHeight: '1.7',
                      textAlign: 'justify'
                    }}>
                      {selectedConcept.explanation}
                    </p>
                  </div>

                  {selectedConcept.codeExample && (
                    <div style={{
                      backgroundColor: '#1e293b',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      border: '2px solid #334155',
                      marginBottom: '1.5rem'
                    }}>
                      <h4 style={{
                        fontSize: '1rem',
                        fontWeight: '700',
                        color: '#60a5fa',
                        margin: '0 0 1rem 0'
                      }}>
                        💻 Code Example
                      </h4>
                      <SyntaxHighlighter code={selectedConcept.codeExample} />
                    </div>
                  )}

                  <div style={{
                    backgroundColor: 'rgba(34, 197, 94, 0.05)',
                    padding: '1.25rem',
                    borderRadius: '12px',
                    border: '2px solid rgba(34, 197, 94, 0.2)'
                  }}>
                    <h4 style={{
                      fontSize: '1rem',
                      fontWeight: '700',
                      color: '#166534',
                      margin: '0 0 0.75rem 0'
                    }}>
                      💡 Key Takeaway
                    </h4>
                    <p style={{
                      fontSize: '0.9rem',
                      color: '#15803d',
                      fontWeight: '500',
                      margin: 0,
                      lineHeight: '1.5',
                      fontStyle: 'italic'
                    }}>
                      {selectedConcept.name} represents Java 15's commitment to language evolution, bringing modern features while maintaining backward compatibility and careful design iteration.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Java15
