import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

function Java15Questions({ onBack, breadcrumb }) {
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
      category: 'Text Blocks',
      question: 'What are Text Blocks in Java 15 and how do they improve multi-line string handling?',
      answer: `**Text Blocks (JEP 378):**
- Multi-line string literals that avoid the need for escape sequences
- Introduced as preview in Java 13, standardized in Java 15
- Uses triple quotes (""") as delimiters
- Automatically manages indentation and line breaks
- Makes code more readable for HTML, JSON, SQL, etc.

**Basic Syntax:**
\`\`\`java
// Before Java 15 - traditional strings
String html = "<html>\\n" +
              "    <body>\\n" +
              "        <h1>Hello</h1>\\n" +
              "    </body>\\n" +
              "</html>";

// With Text Blocks (Java 15+)
String html = """
              <html>
                  <body>
                      <h1>Hello</h1>
                  </body>
              </html>
              """;
\`\`\`

**JSON Example:**
\`\`\`java
// Traditional way - messy with escapes
String json = "{\\n" +
              "  \\"name\\": \\"John\\",\\n" +
              "  \\"age\\": 30\\n" +
              "}";

// Text Block - clean and readable
String json = """
              {
                "name": "John",
                "age": 30
              }
              """;
\`\`\`

**SQL Example:**
\`\`\`java
// Traditional - hard to read
String query = "SELECT u.id, u.name, o.total\\n" +
               "FROM users u\\n" +
               "JOIN orders o ON u.id = o.user_id\\n" +
               "WHERE u.active = true";

// Text Block - much clearer
String query = """
               SELECT u.id, u.name, o.total
               FROM users u
               JOIN orders o ON u.id = o.user_id
               WHERE u.active = true
               """;
\`\`\`

**Indentation Management:**
\`\`\`java
// Indentation is automatically removed based on closing delimiter
String message = """
                 This is a
                 multi-line
                 message
                 """;  // Common indentation removed

// Explicit trailing spaces with \\s
String withSpaces = """
                    Line 1\\s
                    Line 2\\s
                    """;
\`\`\`

**Key Features:**

**1. Automatic Line Termination:**
- Each line automatically ends with \\n
- No need to manually add line breaks

**2. Incidental Whitespace Removal:**
- Compiler removes common leading whitespace
- Based on position of closing delimiter

**3. Escape Sequences Still Work:**
\`\`\`java
String text = """
              Line 1
              Line 2\\tTabbed
              Line 3
              """;
\`\`\`

**4. String Interpolation (with formatted()):**
\`\`\`java
String name = "Alice";
int age = 25;

String message = """
                 Name: %s
                 Age: %d
                 """.formatted(name, age);
\`\`\`

**Best Practices:**

**Good Use Cases:**
- HTML/XML templates
- JSON/YAML configuration
- SQL queries
- Regular expressions
- Multi-line test data

**Things to Remember:**
- Opening """ must be followed by line terminator
- Closing """ position controls indentation removal
- Use \\s to preserve trailing spaces
- Still a String object - all String methods work`
    },
    {
      id: 2,
      category: 'Sealed Classes',
      question: 'Explain Sealed Classes (preview) in Java 15 and their purpose',
      answer: `**Sealed Classes (JEP 360 - Preview):**
- Restrict which classes can extend or implement them
- More fine-grained control than public/package-private
- Enables exhaustive pattern matching
- Introduced as preview in Java 15, standardized in Java 17
- Works with classes, interfaces, and abstract classes

**Basic Syntax:**
\`\`\`java
// Sealed class - explicitly permits subtypes
public sealed class Shape
    permits Circle, Rectangle, Triangle {
    // Common shape behavior
}

// Permitted subclasses must be final, sealed, or non-sealed
public final class Circle extends Shape {
    private double radius;
}

public final class Rectangle extends Shape {
    private double width, height;
}

public final class Triangle extends Shape {
    private double base, height;
}
\`\`\`

**Why Sealed Classes?**

**1. Domain Modeling:**
\`\`\`java
// Model a closed set of payment types
public sealed interface Payment
    permits CreditCard, DebitCard, Cash, PayPal {
}

public final class CreditCard implements Payment {
    private String cardNumber;
    private String cvv;
}

public final class DebitCard implements Payment {
    private String accountNumber;
}

public final class Cash implements Payment {
    private double amount;
}

public final class PayPal implements Payment {
    private String email;
}
\`\`\`

**2. Exhaustive Pattern Matching:**
\`\`\`java
// Compiler knows all possible subtypes
public double calculateArea(Shape shape) {
    if (shape instanceof Circle c) {
        return Math.PI * c.radius * c.radius;
    } else if (shape instanceof Rectangle r) {
        return r.width * r.height;
    } else if (shape instanceof Triangle t) {
        return 0.5 * t.base * t.height;
    }
    // No default needed - compiler knows all cases covered
}
\`\`\`

**Three Modifier Options for Subclasses:**

**1. final - No further subclassing:**
\`\`\`java
public final class Circle extends Shape {
    // Cannot be extended
}
\`\`\`

**2. sealed - Controlled further subclassing:**
\`\`\`java
public sealed class Polygon extends Shape
    permits Triangle, Square, Pentagon {
    // Can be extended, but only by permitted classes
}
\`\`\`

**3. non-sealed - Open for extension:**
\`\`\`java
public non-sealed class CustomShape extends Shape {
    // Can be freely extended by anyone
}
\`\`\`

**Sealed Interfaces:**
\`\`\`java
public sealed interface Vehicle
    permits Car, Truck, Motorcycle {
}

public final class Car implements Vehicle {
    private int doors;
}

public final class Truck implements Vehicle {
    private double cargoCapacity;
}

public final class Motorcycle implements Vehicle {
    private boolean hasSidecar;
}
\`\`\`

**Restrictions:**

**1. Permitted subclasses must be accessible:**
\`\`\`java
// Permitted classes must be in same module or package
public sealed class Base
    permits Sub1, Sub2 {  // Must be accessible
}
\`\`\`

**2. All permitted subclasses must extend directly:**
\`\`\`java
public sealed class Shape permits Circle {
    // Circle MUST extend Shape directly
}

public final class Circle extends Shape {
    // OK
}
\`\`\`

**3. Permitted subclasses must choose modifier:**
- Must be final, sealed, or non-sealed
- Cannot be left open implicitly

**Benefits:**

**1. Security:**
- Prevent unexpected subclasses
- Control API evolution

**2. Maintainability:**
- Clear hierarchy
- Compiler helps find all usages

**3. Performance:**
- JVM can optimize sealed hierarchies
- No need to check for unknown subtypes

**4. Better Pattern Matching:**
- Exhaustive switch expressions (Java 17+)
- No default case needed

**Real-World Use Cases:**
- Expression trees (AST nodes)
- Message types in messaging systems
- Command patterns
- State machines
- Type-safe enums with data`
    },
    {
      id: 3,
      category: 'Records',
      question: 'What are Records (second preview) in Java 15?',
      answer: `**Records (JEP 384 - Second Preview):**
- Compact syntax for immutable data classes
- First preview in Java 14, second preview in Java 15, standard in Java 16
- Automatically generates constructor, getters, equals(), hashCode(), toString()
- Ideal for DTOs, value objects, and data carriers
- Final and cannot extend other classes (but can implement interfaces)

**Basic Syntax:**
\`\`\`java
// Traditional class - verbose
public class Person {
    private final String name;
    private final int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String name() { return name; }
    public int age() { return age; }

    @Override
    public boolean equals(Object o) {
        // 10+ lines of boilerplate
    }

    @Override
    public int hashCode() {
        // 3+ lines of boilerplate
    }

    @Override
    public String toString() {
        // 1+ lines of boilerplate
    }
}

// Record - concise and clear
public record Person(String name, int age) {}
\`\`\`

**What Records Automatically Provide:**

**1. Canonical Constructor:**
\`\`\`java
public record Person(String name, int age) {}

// Automatically generated:
public Person(String name, int age) {
    this.name = name;
    this.age = age;
}
\`\`\`

**2. Accessor Methods (not getters!):**
\`\`\`java
Person person = new Person("Alice", 30);
String name = person.name();  // Not getName()
int age = person.age();       // Not getAge()
\`\`\`

**3. equals() and hashCode():**
\`\`\`java
Person p1 = new Person("Alice", 30);
Person p2 = new Person("Alice", 30);

p1.equals(p2);  // true - based on all fields
p1.hashCode() == p2.hashCode();  // true
\`\`\`

**4. toString():**
\`\`\`java
Person person = new Person("Alice", 30);
System.out.println(person);
// Output: Person[name=Alice, age=30]
\`\`\`

**Customizing Records:**

**1. Compact Constructor - Validation:**
\`\`\`java
public record Person(String name, int age) {
    // Compact constructor for validation
    public Person {
        if (age < 0) {
            throw new IllegalArgumentException("Age cannot be negative");
        }
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Name is required");
        }
    }
}
\`\`\`

**2. Custom Constructor:**
\`\`\`java
public record Person(String name, int age) {
    // Additional constructor
    public Person(String name) {
        this(name, 0);  // Must call canonical constructor
    }
}
\`\`\`

**3. Additional Methods:**
\`\`\`java
public record Person(String name, int age) {
    // Custom methods allowed
    public boolean isAdult() {
        return age >= 18;
    }

    public Person withAge(int newAge) {
        return new Person(name, newAge);
    }
}
\`\`\`

**4. Static Methods and Fields:**
\`\`\`java
public record Person(String name, int age) {
    private static final int MAX_AGE = 150;

    public static Person unknown() {
        return new Person("Unknown", 0);
    }
}
\`\`\`

**Implementing Interfaces:**
\`\`\`java
public interface Identifiable {
    String getId();
}

public record Person(String name, int age, String id)
    implements Identifiable {

    @Override
    public String getId() {
        return id;
    }
}
\`\`\`

**Records in Collections:**
\`\`\`java
List<Person> people = List.of(
    new Person("Alice", 30),
    new Person("Bob", 25),
    new Person("Charlie", 35)
);

// Works great with streams
people.stream()
      .filter(p -> p.age() > 25)
      .map(Person::name)
      .forEach(System.out::println);

// Set works correctly (equals/hashCode)
Set<Person> uniquePeople = new HashSet<>(people);

// Map keys work correctly
Map<Person, String> personRoles = new HashMap<>();
\`\`\`

**Restrictions:**

**1. Cannot extend classes:**
\`\`\`java
// NOT ALLOWED
public record Person(String name) extends BaseClass {}
\`\`\`

**2. Implicitly final:**
\`\`\`java
// Cannot be extended
public record Person(String name) {}
// No class can extend Person
\`\`\`

**3. All fields are final:**
\`\`\`java
// Cannot add mutable instance fields
public record Person(String name) {
    private int count;  // NOT ALLOWED (non-static mutable field)
}
\`\`\`

**Best Use Cases:**
- Data Transfer Objects (DTOs)
- API responses
- Database query results
- Value objects
- Configuration objects
- Message/Event objects
- Coordinates, points, ranges
- Return multiple values from methods`
    },
    {
      id: 4,
      category: 'Pattern Matching',
      question: 'What is Pattern Matching for instanceof (second preview) in Java 15?',
      answer: `**Pattern Matching for instanceof (JEP 375 - Second Preview):**
- Simplifies type checking and casting
- First preview in Java 14, second preview in Java 15, standard in Java 16
- Eliminates redundant casts
- Makes code more concise and less error-prone
- Pattern variable is automatically scoped

**Traditional instanceof (Before Java 14):**
\`\`\`java
// Old way - tedious and error-prone
if (obj instanceof String) {
    String str = (String) obj;  // Redundant cast
    System.out.println(str.length());
}

// Old way with multiple checks
if (obj instanceof String) {
    String s = (String) obj;
    if (s.length() > 5) {
        System.out.println("Long string: " + s);
    }
}
\`\`\`

**Pattern Matching (Java 15+):**
\`\`\`java
// New way - clean and concise
if (obj instanceof String str) {
    System.out.println(str.length());  // str is automatically cast
}

// With additional conditions
if (obj instanceof String str && str.length() > 5) {
    System.out.println("Long string: " + str);
}
\`\`\`

**Scope of Pattern Variable:**

**1. Pattern variable available in true branch:**
\`\`\`java
if (obj instanceof String str) {
    System.out.println(str.toUpperCase());  // str in scope
}
// str NOT in scope here
\`\`\`

**2. Flow-sensitive scoping:**
\`\`\`java
// Pattern variable in scope when compiler knows it's true
if (!(obj instanceof String str)) {
    return;
}
// str IS in scope here (because we returned above if false)
System.out.println(str.length());
\`\`\`

**3. Works with logical operators:**
\`\`\`java
// str in scope in && right-hand side
if (obj instanceof String str && str.length() > 0) {
    System.out.println(str);
}

// str in scope in || right-hand side when negated
if (!(obj instanceof String str) || str.isEmpty()) {
    // If we're here after ||, str must be valid
}
\`\`\`

**Real-World Examples:**

**1. Polymorphic Methods:**
\`\`\`java
// Old way
public double getArea(Shape shape) {
    if (shape instanceof Circle) {
        Circle circle = (Circle) shape;
        return Math.PI * circle.radius() * circle.radius();
    } else if (shape instanceof Rectangle) {
        Rectangle rect = (Rectangle) shape;
        return rect.width() * rect.height();
    } else if (shape instanceof Triangle) {
        Triangle tri = (Triangle) shape;
        return 0.5 * tri.base() * tri.height();
    }
    return 0;
}

// New way - much cleaner
public double getArea(Shape shape) {
    if (shape instanceof Circle c) {
        return Math.PI * c.radius() * c.radius();
    } else if (shape instanceof Rectangle r) {
        return r.width() * r.height();
    } else if (shape instanceof Triangle t) {
        return 0.5 * t.base() * t.height();
    }
    return 0;
}
\`\`\`

**2. equals() Implementation:**
\`\`\`java
// Old way
@Override
public boolean equals(Object obj) {
    if (obj == this) return true;
    if (!(obj instanceof Person)) return false;
    Person other = (Person) obj;
    return Objects.equals(name, other.name) && age == other.age;
}

// New way
@Override
public boolean equals(Object obj) {
    if (obj == this) return true;
    if (!(obj instanceof Person other)) return false;
    return Objects.equals(name, other.name) && age == other.age;
}

// Even cleaner with early return
@Override
public boolean equals(Object obj) {
    return obj == this ||
           obj instanceof Person other &&
           Objects.equals(name, other.name) &&
           age == other.age;
}
\`\`\`

**3. Processing Different Types:**
\`\`\`java
public String format(Object obj) {
    if (obj instanceof Integer i) {
        return String.format("Integer: %d", i);
    } else if (obj instanceof Double d) {
        return String.format("Double: %.2f", d);
    } else if (obj instanceof String s) {
        return String.format("String: '%s'", s);
    } else if (obj instanceof List<?> list) {
        return String.format("List of size %d", list.size());
    }
    return obj.toString();
}
\`\`\`

**4. Null Handling:**
\`\`\`java
// Pattern matching with null check
if (obj instanceof String str && !str.isEmpty()) {
    // obj is not null AND is a String AND not empty
    System.out.println(str);
}

// instanceof returns false for null
Object obj = null;
if (obj instanceof String str) {
    // Never executed - instanceof returns false for null
}
\`\`\`

**Benefits:**

**1. Less Boilerplate:**
- No explicit cast needed
- Fewer lines of code
- More readable

**2. Type Safety:**
- Compiler ensures pattern variable is correct type
- No ClassCastException possible
- Flow-sensitive type checking

**3. Better Maintainability:**
- Clear intent
- Less duplication
- Easier to refactor

**Common Patterns:**

**Early Return:**
\`\`\`java
if (!(obj instanceof String str)) {
    return defaultValue;
}
return str.toUpperCase();  // str in scope
\`\`\`

**Combining Checks:**
\`\`\`java
if (obj instanceof String str &&
    str.startsWith("prefix") &&
    str.length() > 10) {
    // All conditions met
}
\`\`\``
    }
  ]

  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id)
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Text Blocks': '#f59e0b',
      'Sealed Classes': '#3b82f6',
      'Records': '#8b5cf6',
      'Pattern Matching': '#10b981'
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
          Java 15 Interview Questions
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      <p style={{
        fontSize: '1.1rem',
        color: '#d1d5db',
        textAlign: 'left',
        marginBottom: '2rem',
        lineHeight: '1.6'
      }}>
        Java 15 interview questions covering Text Blocks, Sealed Classes (preview), and Records (preview).
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
        border: '2px solid rgba(99, 102, 241, 0.4)'
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#a5b4fc', marginBottom: '0.5rem' }}>
          Java 15 Key Features
        </h3>
        <ul style={{ color: '#d1d5db', lineHeight: '1.8', margin: '0.5rem 0' }}>
          <li>Text Blocks (standard feature)</li>
          <li>Sealed Classes (preview)</li>
          <li>Records (second preview)</li>
          <li>Pattern Matching for instanceof (second preview)</li>
          <li>Hidden Classes</li>
          <li>Edwards-Curve Digital Signature Algorithm (EdDSA)</li>
        </ul>
      </div>
    </div>
  )
}

export default Java15Questions
