import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CompletionCheckbox from '../../components/CompletionCheckbox'

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
    },
    {
      id: 5,
      category: 'Enhanced NullPointerException',
      difficulty: 'Hard',
      question: 'Explain Java 14\'s Helpful NullPointerExceptions (JEP 358). How does it improve debugging?',
      answer: `**Helpful NullPointerExceptions (Java 14):**

**The Problem (Before Java 14):**
\`\`\`java
public class User {
    private Address address;
    public Address getAddress() { return address; }
}

public class Address {
    private String city;
    public String getCity() { return city; }
}

// Complex chain
user.getAddress().getCity().toUpperCase();

// Old NullPointerException - which was null?
Exception in thread "main" java.lang.NullPointerException
    at Main.main(Main.java:10)

// Was it:
// 1. user was null?
// 2. address was null?
// 3. city was null?
// No way to know without debugging!
\`\`\`

**The Solution (Java 14+):**
\`\`\`java
// Same code, new error message
Exception in thread "main" java.lang.NullPointerException:
  Cannot invoke "String.toUpperCase()" because the return value of
  "Address.getCity()" is null
    at Main.main(Main.java:10)

// Now it's crystal clear: getCity() returned null!
\`\`\`

**How It Works:**

**Enable helpful NullPointerExceptions:**
\`\`\`bash
# Java 14: Opt-in with flag
java -XX:+ShowCodeDetailsInExceptionMessages MyApp

# Java 15+: Enabled by default
\`\`\`

**Detailed Error Messages:**

**1. Method Invocation:**
\`\`\`java
String city = user.getAddress().getCity();
// Error: Cannot invoke "Address.getCity()" because the return value
// of "User.getAddress()" is null

list.get(0).toString();
// Error: Cannot invoke "Object.toString()" because the return value
// of "List.get(int)" is null
\`\`\`

**2. Field Access:**
\`\`\`java
String city = user.address.city;
// Error: Cannot read field "city" because "user.address" is null

order.items[0].price
// Error: Cannot read the array component because "order.items" is null
\`\`\`

**3. Array Access:**
\`\`\`java
String[] names = getNames();
String first = names[0];
// Error: Cannot load from object array because "names" is null

int[] numbers = getNumbers();
int value = numbers[5];
// Error: Cannot load from int array because "numbers" is null
\`\`\`

**4. Assignment:**
\`\`\`java
user.getAddress().city = "NYC";
// Error: Cannot assign field "city" because the return value
// of "User.getAddress()" is null

array[0] = value;
// Error: Cannot store to object array because "array" is null
\`\`\`

**5. Length Access:**
\`\`\`java
int length = array.length;
// Error: Cannot read the array length because "array" is null

int size = str.length();
// Error: Cannot invoke "String.length()" because "str" is null
\`\`\`

**6. Unboxing:**
\`\`\`java
Integer num = getNumber();
int value = num;  // Unboxing
// Error: Cannot invoke "Integer.intValue()" because "num" is null

Boolean flag = getFlag();
if (flag) { }  // Unboxing in condition
// Error: Cannot invoke "Boolean.booleanValue()" because "flag" is null
\`\`\`

**7. Synchronized Block:**
\`\`\`java
Object lock = getLock();
synchronized (lock) {
    // code
}
// Error: Cannot enter synchronized block because "lock" is null
\`\`\`

**8. Throw Statement:**
\`\`\`java
Exception ex = getException();
throw ex;
// Error: Cannot throw exception because "ex" is null
\`\`\`

**Real-World Examples:**

**1. Complex Object Graph:**
\`\`\`java
class Order {
    Customer customer;
}

class Customer {
    Address billingAddress;
}

class Address {
    String zipCode;
}

// Deep nesting
order.customer.billingAddress.zipCode

// Old error: Just line number
// New error: Exact null reference identified
// "Cannot read field zipCode because order.customer.billingAddress is null"
\`\`\`

**2. Stream Operations:**
\`\`\`java
List<User> users = getUsers();
users.stream()
    .map(User::getAddress)
    .map(Address::getCity)
    .forEach(System.out::println);

// If getAddress() returns null:
// Error: Cannot invoke "Address.getCity()" because the return value
// of "User.getAddress()" is null
\`\`\`

**3. Optional Misuse:**
\`\`\`java
Optional<String> opt = Optional.ofNullable(getName());
String name = opt.get();  // If empty

// Error: Cannot invoke "String.length()" because "name" is null
// (if getName() returned null, opt.get() throws NoSuchElementException,
// but if you stored null later, you get helpful NPE)
\`\`\`

**4. Collections:**
\`\`\`java
Map<String, User> userMap = getUserMap();
User user = userMap.get("john");
String email = user.getEmail();

// Error: Cannot invoke "User.getEmail()" because "user" is null
// Clearly shows map.get() returned null
\`\`\`

**Comparison: Before vs After:**

**Before Java 14:**
\`\`\`
Exception in thread "main" java.lang.NullPointerException
    at com.example.Main.processOrder(Main.java:45)
    at com.example.Main.main(Main.java:20)

// Line 45: order.getCustomer().getBillingAddress().getZipCode()
// Which method returned null? Unknown!
\`\`\`

**After Java 14:**
\`\`\`
Exception in thread "main" java.lang.NullPointerException:
  Cannot invoke "Address.getZipCode()" because the return value
  of "Customer.getBillingAddress()" is null
    at com.example.Main.processOrder(Main.java:45)
    at com.example.Main.main(Main.java:20)

// Clear: getBillingAddress() returned null!
\`\`\`

**Technical Implementation:**

**Bytecode Analysis:**
The JVM analyzes bytecode at the exception site to determine:
1. Which expression was null
2. What operation was attempted
3. Exact context of the failure

**Example bytecode:**
\`\`\`
aload_1              // Load 'user' onto stack
invokevirtual #2     // Call getAddress()
invokevirtual #3     // Call getCity() <- NPE here
invokevirtual #4     // Call toUpperCase()

// JVM knows NPE occurred at invokevirtual #3
// Previous instruction was invokevirtual #2 (getAddress)
// Constructs message: "getAddress() returned null, couldn't call getCity()"
\`\`\`

**Performance Impact:**

**Minimal Overhead:**
- Message generated only when NPE is thrown
- No runtime cost for normal execution
- Bytecode analysis happens at exception time
- Negligible impact on application performance

**Memory Usage:**
- Exception message slightly longer
- No additional memory overhead during normal execution

**Best Practices:**

**1. Don't Rely on NPE Messages:**
\`\`\`java
// BAD: Relying on NPE for logic
try {
    String city = user.getAddress().getCity();
} catch (NullPointerException e) {
    // Handle
}

// GOOD: Explicit null checks
Address address = user.getAddress();
if (address != null) {
    String city = address.getCity();
}

// BETTER: Use Optional
Optional.ofNullable(user.getAddress())
    .map(Address::getCity)
    .ifPresent(city -> ...);
\`\`\`

**2. Still Prevent NPEs:**
\`\`\`java
// Helpful NPE is for debugging, not production!

// Use validation
Objects.requireNonNull(user, "User cannot be null");

// Use Optional
Optional<String> city = Optional.ofNullable(address)
    .map(Address::getCity);

// Use defensive programming
if (user == null || user.getAddress() == null) {
    return defaultCity;
}
\`\`\`

**3. Logging and Monitoring:**
\`\`\`java
try {
    processOrder(order);
} catch (NullPointerException e) {
    // New detailed message helps debugging
    logger.error("Order processing failed: {}", e.getMessage(), e);
    // Much more informative in logs!
}
\`\`\`

**Benefits:**

✓ **Faster Debugging:**
- Immediately identify null source
- No need to reproduce with debugger
- Save hours of debugging time

✓ **Better Production Diagnostics:**
- Clearer error logs
- Easier incident analysis
- Faster root cause identification

✓ **Improved Code Quality:**
- Reveals design issues
- Encourages proper null handling
- Makes code smells visible

✓ **No Code Changes Required:**
- Works with existing code
- Automatic improvement
- Just upgrade Java version

**Limitations:**

- Only for NullPointerException
- Doesn't prevent NPEs
- Slightly longer exception messages
- May expose internal structure in logs

**Migration Notes:**

**Java 13 or Earlier:**
\`\`\`bash
# No helpful messages available
\`\`\`

**Java 14:**
\`\`\`bash
# Enable explicitly
java -XX:+ShowCodeDetailsInExceptionMessages MyApp
\`\`\`

**Java 15+:**
\`\`\`bash
# Enabled by default, disable if needed:
java -XX:-ShowCodeDetailsInExceptionMessages MyApp
\`\`\`

**Security Considerations:**

Be aware that detailed messages might expose:
- Internal class structure
- Method names
- Field names

For security-sensitive applications, consider disabling in production or sanitizing logs.

**Summary:**
Java 14's Helpful NullPointerExceptions (JEP 358) dramatically improve debugging by pinpointing exactly which variable was null in a complex expression. This feature is enabled by default in Java 15+ and has minimal performance impact. While it greatly aids debugging, proper null handling and prevention remain essential for robust code.`
    },
    {
      id: 6,
      category: 'Hidden Classes',
      difficulty: 'Hard',
      question: 'What are Hidden Classes in Java 15 (JEP 371)? When and how are they used?',
      answer: `**Hidden Classes (Java 15 - JEP 371):**

**What are Hidden Classes:**
Hidden classes are classes that cannot be used directly by bytecode of other classes. They are intended for use by frameworks that generate classes at runtime and use them indirectly, via reflection.

**Key Characteristics:**
- Cannot be discovered by other classes
- Not linkable at runtime
- Have a limited lifecycle
- Can be unloaded independently
- Support dynamic class generation
- Created via Lookup.defineHiddenClass()

**Problems Hidden Classes Solve:**

**Before Hidden Classes:**
\`\`\`java
// Dynamic proxy or framework generates class
ClassLoader loader = new MyClassLoader();
Class<?> generatedClass = loader.defineClass("Generated", bytes, 0, bytes.length);

// Problems:
// 1. Class stays loaded forever (memory leak)
// 2. Pollutes ClassLoader namespace
// 3. Can be accessed by other code
// 4. Name collisions possible
// 5. GC cannot collect until ClassLoader dies
\`\`\`

**With Hidden Classes:**
\`\`\`java
import java.lang.invoke.MethodHandles;
import java.lang.invoke.MethodHandles.Lookup;

// Create hidden class
Lookup lookup = MethodHandles.lookup();
Lookup hiddenClassLookup = lookup.defineHiddenClass(
    classBytes,
    true,  // initialize
    ClassOption.NESTMATE  // options
);

Class<?> hiddenClass = hiddenClassLookup.lookupClass();

// Benefits:
// 1. Can be unloaded independently
// 2. Not discoverable by name
// 3. No namespace pollution
// 4. Automatic cleanup
\`\`\`

**Creating Hidden Classes:**

**Basic Creation:**
\`\`\`java
import java.lang.invoke.MethodHandles;
import java.lang.invoke.MethodHandles.Lookup;

public class HiddenClassExample {
    public static void main(String[] args) throws Exception {
        // Get bytecode for a class
        byte[] classBytes = getClassBytes();  // Your bytecode generation

        // Create hidden class
        Lookup lookup = MethodHandles.lookup();
        Lookup hiddenLookup = lookup.defineHiddenClass(
            classBytes,
            true  // initialize class
        );

        // Get the hidden class
        Class<?> hiddenClass = hiddenLookup.lookupClass();

        // Create instance and use via reflection
        Object instance = hiddenClass.getConstructor().newInstance();

        // Invoke methods
        var method = hiddenClass.getMethod("doWork");
        method.invoke(instance);
    }

    private static byte[] getClassBytes() {
        // Generate bytecode using ASM, ByteBuddy, or similar
        // For example with ASM:
        ClassWriter cw = new ClassWriter(0);
        cw.visit(V15, ACC_PUBLIC, "HiddenClass", null, "java/lang/Object", null);

        // Add methods, fields, etc.

        return cw.toByteArray();
    }
}
\`\`\`

**Class Options:**

**1. NESTMATE - Join nest of lookup class:**
\`\`\`java
Lookup hiddenLookup = lookup.defineHiddenClass(
    classBytes,
    true,
    ClassOption.NESTMATE
);

// Hidden class becomes nestmate of lookup class
// Can access private members of nest
\`\`\`

**2. STRONG - Create strong class:**
\`\`\`java
Lookup hiddenLookup = lookup.defineHiddenClass(
    classBytes,
    true,
    ClassOption.STRONG
);

// Strong hidden class:
// - Not unloadable
// - Tied to defining loader
// - Similar lifecycle to normal classes
\`\`\`

**Real-World Use Cases:**

**1. Dynamic Proxies:**
\`\`\`java
public interface UserService {
    User getUser(String id);
    void saveUser(User user);
}

public class DynamicProxyFactory {
    public static <T> T createProxy(Class<T> interfaceClass) throws Exception {
        // Generate bytecode for proxy class
        byte[] proxyBytes = generateProxyBytecode(interfaceClass);

        // Create hidden proxy class
        Lookup lookup = MethodHandles.lookup();
        Lookup proxyLookup = lookup.defineHiddenClass(
            proxyBytes,
            true,
            ClassOption.NESTMATE
        );

        Class<?> proxyClass = proxyLookup.lookupClass();

        // Create and return proxy instance
        return (T) proxyClass.getConstructor().newInstance();
    }

    private static byte[] generateProxyBytecode(Class<?> iface) {
        // Use ASM or ByteBuddy to generate proxy class
        // that implements the interface
        // ...
        return bytes;
    }
}

// Usage
UserService proxy = DynamicProxyFactory.createProxy(UserService.class);
// When proxy is no longer referenced, hidden class can be unloaded
\`\`\`

**2. Lambda Meta Factory:**
\`\`\`java
// Java's lambda implementation uses hidden classes internally

// When you write:
Runnable r = () -> System.out.println("Hello");

// Java generates a hidden class implementing Runnable
// This hidden class can be unloaded when no longer referenced
\`\`\`

**3. JVM Language Implementation:**
\`\`\`java
public class ScriptEngine {
    public CompiledScript compile(String script) throws Exception {
        // Parse script and generate bytecode
        byte[] bytecode = compileScriptToBytecode(script);

        // Create hidden class for compiled script
        Lookup lookup = MethodHandles.lookup();
        Lookup scriptLookup = lookup.defineHiddenClass(
            bytecode,
            true
        );

        Class<?> scriptClass = scriptLookup.lookupClass();

        // Return wrapper
        return new CompiledScript(scriptClass);
    }

    // When CompiledScript is garbage collected,
    // hidden class can be unloaded
}
\`\`\`

**4. Serialization Frameworks:**
\`\`\`java
public class SerializerFactory {
    public <T> Serializer<T> createSerializer(Class<T> targetClass) throws Exception {
        // Generate optimized serializer bytecode
        byte[] serializerBytes = generateSerializerBytecode(targetClass);

        // Create hidden serializer class
        Lookup lookup = MethodHandles.lookup();
        Lookup serializerLookup = lookup.defineHiddenClass(
            serializerBytes,
            true,
            ClassOption.NESTMATE
        );

        Class<?> serializerClass = serializerLookup.lookupClass();

        // Create serializer instance
        return (Serializer<T>) serializerClass.getConstructor().newInstance();
    }
}

// Multiple serializers can be created and unloaded independently
Serializer<User> userSerializer = factory.createSerializer(User.class);
Serializer<Order> orderSerializer = factory.createSerializer(Order.class);
\`\`\`

**5. Mock Frameworks:**
\`\`\`java
public class MockGenerator {
    public <T> T createMock(Class<T> targetClass) throws Exception {
        // Generate mock class bytecode
        byte[] mockBytes = generateMockBytecode(targetClass);

        // Create hidden mock class
        Lookup lookup = MethodHandles.lookup();
        Lookup mockLookup = lookup.defineHiddenClass(
            mockBytes,
            true
        );

        Class<?> mockClass = mockLookup.lookupClass();

        // Return mock instance
        return (T) mockClass.getConstructor().newInstance();
    }
}

// Mocks can be garbage collected with test
@Test
void testUserService() {
    UserRepository mock = MockGenerator.createMock(UserRepository.class);
    // Use mock
    // After test, mock and hidden class can be GC'd
}
\`\`\`

**Properties of Hidden Classes:**

**1. Not Discoverable:**
\`\`\`java
// Cannot find by name
Class<?> clazz = Class.forName("HiddenClassName");  // ClassNotFoundException

// Cannot use ClassLoader.loadClass()
ClassLoader loader = getClassLoader();
loader.loadClass("HiddenClassName");  // ClassNotFoundException

// Only accessible via the Lookup object that created it
\`\`\`

**2. Naming Convention:**
\`\`\`java
Class<?> hiddenClass = hiddenLookup.lookupClass();

// Name format: "originalName/0x<hash>"
String name = hiddenClass.getName();
System.out.println(name);  // "MyClass/0x0000000801234567"

// Ensures no name collisions
\`\`\`

**3. Unloadable:**
\`\`\`java
// Normal class: Lives as long as ClassLoader
// Hidden class: Can be unloaded independently

Lookup hiddenLookup = lookup.defineHiddenClass(bytes, true);
Class<?> hiddenClass = hiddenLookup.lookupClass();

// When all references to hiddenClass are gone,
// it becomes eligible for garbage collection
hiddenClass = null;
hiddenLookup = null;
System.gc();  // Hidden class can now be unloaded
\`\`\`

**4. Nest Membership:**
\`\`\`java
// With NESTMATE option
Lookup hiddenLookup = lookup.defineHiddenClass(
    bytes,
    true,
    ClassOption.NESTMATE
);

// Hidden class can access private members of nest host
class Outer {
    private int secret = 42;

    // Hidden class generated here can access 'secret'
}
\`\`\`

**Bytecode Generation Example:**
\`\`\`java
import org.objectweb.asm.*;

public class BytecodeGenerator {
    public static byte[] generateSimpleClass() {
        ClassWriter cw = new ClassWriter(ClassWriter.COMPUTE_FRAMES);

        // Class definition
        cw.visit(
            Opcodes.V15,
            Opcodes.ACC_PUBLIC,
            "GeneratedClass",
            null,
            "java/lang/Object",
            null
        );

        // Constructor
        MethodVisitor mv = cw.visitMethod(
            Opcodes.ACC_PUBLIC,
            "<init>",
            "()V",
            null,
            null
        );
        mv.visitCode();
        mv.visitVarInsn(Opcodes.ALOAD, 0);
        mv.visitMethodInsn(
            Opcodes.INVOKESPECIAL,
            "java/lang/Object",
            "<init>",
            "()V",
            false
        );
        mv.visitInsn(Opcodes.RETURN);
        mv.visitMaxs(1, 1);
        mv.visitEnd();

        // doWork method
        mv = cw.visitMethod(
            Opcodes.ACC_PUBLIC,
            "doWork",
            "()V",
            null,
            null
        );
        mv.visitCode();
        mv.visitFieldInsn(
            Opcodes.GETSTATIC,
            "java/lang/System",
            "out",
            "Ljava/io/PrintStream;"
        );
        mv.visitLdcInsn("Hello from hidden class!");
        mv.visitMethodInsn(
            Opcodes.INVOKEVIRTUAL,
            "java/io/PrintStream",
            "println",
            "(Ljava/lang/String;)V",
            false
        );
        mv.visitInsn(Opcodes.RETURN);
        mv.visitMaxs(2, 1);
        mv.visitEnd();

        cw.visitEnd();
        return cw.toByteArray();
    }
}
\`\`\`

**Benefits:**

✓ **Memory Efficiency:**
- Classes can be unloaded when no longer needed
- Reduces ClassLoader bloat
- Better for long-running applications

✓ **Encapsulation:**
- Generated classes not accessible by name
- Better security and isolation
- Prevents unintended usage

✓ **Performance:**
- Faster class generation (no ClassLoader overhead)
- Reduced metadata memory usage
- Better GC characteristics

✓ **Flexibility:**
- Support dynamic code generation
- Better for frameworks
- Cleaner lifecycle management

**Comparison:**

| Feature | Normal Class | Hidden Class |
|---------|-------------|--------------|
| Discoverable | Yes | No |
| Name lookup | Yes | No |
| Unloadable | With ClassLoader | Independently |
| Namespace | Global | Isolated |
| Use case | Application code | Framework-generated |

**Best Practices:**

✓ Use for dynamically generated classes
✓ Prefer over custom ClassLoaders for frameworks
✓ Use NESTMATE for accessing private members
✓ Let GC handle cleanup
✓ Use in proxy/mock generation
✓ Document lifecycle expectations

**Summary:**
Hidden Classes (JEP 371) provide a way for frameworks to create classes at runtime that are not discoverable by name, can be unloaded independently, and don't pollute the ClassLoader namespace. They are primarily used by frameworks like serialization libraries, mock frameworks, JVM language implementations, and dynamic proxy generators.`
    },
    {
      id: 7,
      category: 'ZGC Improvements',
      difficulty: 'Hard',
      question: 'Explain ZGC (Z Garbage Collector) enhancements in Java 15. What are its benefits and use cases?',
      answer: `**Z Garbage Collector (ZGC):**

**Overview:**
ZGC is a scalable, low-latency garbage collector designed for applications requiring large heaps (multi-terabyte) with minimal pause times (sub-millisecond). Initially experimental in Java 11, it became production-ready in Java 15.

**Key Features:**

**1. Ultra-Low Pause Times:**
\`\`\`
Traditional GC pause times: 10ms - 100ms+
ZGC pause times: < 1ms (typically sub-millisecond)

Even with:
- 8TB heap
- Millions of objects
- High allocation rates
\`\`\`

**2. Concurrent Operations:**
ZGC performs most GC work concurrently with application threads:
- Marking
- Relocation
- Reference processing
- Compaction

Only these operations pause application:
- Root scanning (very brief)
- Thread stack scanning (very brief)

**3. Colored Pointers:**
\`\`\`
64-bit pointer structure:
┌─────────────┬──────────────┬─────────────┐
│ Metadata    │ Object Addr  │  (Unused)   │
│ (4 bits)    │ (42 bits)    │  (18 bits)  │
└─────────────┴──────────────┴─────────────┘

Metadata bits encode GC state:
- Marked0, Marked1 (marking phases)
- Remapped (relocation status)
- Finalizable

Enables concurrent operations without object headers
\`\`\`

**4. Load Barriers:**
\`\`\`java
// Every object access goes through load barrier
Object obj = ref.field;  // Load barrier inserted here

// Load barrier:
// 1. Check if object needs to be marked/relocated
// 2. Fix reference if needed
// 3. Return correct reference

// Happens transparently at hardware level
\`\`\`

**Enabling ZGC:**

**Java 15 (Production Ready):**
\`\`\`bash
# Enable ZGC
java -XX:+UseZGC MyApplication

# With heap settings
java -XX:+UseZGC -Xms8g -Xmx16g MyApplication

# Logging
java -XX:+UseZGC -Xlog:gc MyApplication
java -XX:+UseZGC -Xlog:gc* -Xlog:gc*::time MyApplication
\`\`\`

**Java 15 Improvements:**

**1. Production Ready Status:**
- Removed experimental flag requirement
- Stable and battle-tested
- Suitable for production workloads

**2. Uncommit Memory:**
\`\`\`bash
# ZGC can return unused memory to OS
-XX:ZUncommitDelay=300    # Delay before uncommitting (seconds)
-XX:-ZUncommit             # Disable uncommit

# Example: 16GB max heap, currently using 4GB
# ZGC will uncommit 12GB back to OS after delay
\`\`\`

**3. Max Heap Size:**
\`\`\`bash
# Supports up to 16TB on x64 Linux
# Actual limit depends on OS and hardware
-Xmx16t  # 16 terabytes
\`\`\`

**4. Concurrent Thread Stack Processing:**
- Thread stacks processed concurrently
- Further reduces pause times
- Even large applications with many threads benefit

**ZGC Phases:**

**1. Mark Start (STW - very brief):**
\`\`\`
Pause: ~0.05ms
- Scan thread stacks
- Mark GC roots
- Set marking phase

Application paused: < 1ms
\`\`\`

**2. Concurrent Mark:**
\`\`\`
No pause
- Traverse object graph
- Mark reachable objects
- Use load barriers to track changes

Application runs: fully concurrent
\`\`\`

**3. Mark End (STW - very brief):**
\`\`\`
Pause: ~0.05ms
- Finish marking
- Handle weak references
- Prepare for relocation

Application paused: < 1ms
\`\`\`

**4. Concurrent Prepare for Relocation:**
\`\`\`
No pause
- Select pages to relocate
- Build relocation sets

Application runs: fully concurrent
\`\`\`

**5. Relocation Start (STW - very brief):**
\`\`\`
Pause: ~0.05ms
- Relocate roots
- Start relocation phase

Application paused: < 1ms
\`\`\`

**6. Concurrent Relocation:**
\`\`\`
No pause
- Move objects to new locations
- Update references
- Use load barriers for lazy relocation

Application runs: fully concurrent
\`\`\`

**Real-World Use Cases:**

**1. Low-Latency Trading Systems:**
\`\`\`java
// Financial trading application
// Requirements:
// - < 1ms response time (99.99th percentile)
// - 50GB heap
// - High throughput

java -XX:+UseZGC \\
     -Xms50g -Xmx50g \\
     -Xlog:gc \\
     TradingApplication

// ZGC ensures GC pauses don't impact trades
// Consistent sub-millisecond latency
\`\`\`

**2. Large In-Memory Databases:**
\`\`\`java
// In-memory cache/database
// Requirements:
// - 500GB heap
// - Millions of objects
// - Low query latency

java -XX:+UseZGC \\
     -Xms500g -Xmx500g \\
     -XX:ConcGCThreads=16 \\
     CacheServer

// ZGC handles massive heap with minimal pauses
\`\`\`

**3. Real-Time Analytics:**
\`\`\`java
// Real-time data processing
// Requirements:
// - Process millions of events/sec
// - 100GB heap
// - No latency spikes

java -XX:+UseZGC \\
     -Xms100g -Xmx100g \\
     -XX:ZAllocationSpikeTolerance=5 \\
     AnalyticsEngine

// Consistent performance during load spikes
\`\`\`

**4. Microservices with Large Heaps:**
\`\`\`java
// Microservice with caching
// Requirements:
// - 32GB heap
// - Fast response times
// - Cloud deployment

java -XX:+UseZGC \\
     -Xms16g -Xmx32g \\
     -XX:ZUncommitDelay=300 \\
     MicroserviceApp

// ZGC uncommits memory when load decreases
// Saves cloud costs
\`\`\`

**5. Gaming Servers:**
\`\`\`java
// Multiplayer game server
// Requirements:
// - No lag/stuttering
// - Large world state (50GB)
// - Thousands of concurrent players

java -XX:+UseZGC \\
     -Xms50g -Xmx50g \\
     GameServer

// Players don't experience GC-related lag
\`\`\`

**Configuration Options:**

**1. Basic Settings:**
\`\`\`bash
# Enable ZGC
-XX:+UseZGC

# Heap size (always set both for predictability)
-Xms<size>
-Xmx<size>
\`\`\`

**2. Concurrent GC Threads:**
\`\`\`bash
# Number of concurrent GC threads
# Default: 1/8 of available cores
-XX:ConcGCThreads=<n>

# Example for 64-core machine
-XX:ConcGCThreads=8  # Use 8 threads for GC
\`\`\`

**3. Parallel GC Threads:**
\`\`\`bash
# Threads for STW phases
# Default: 60% of available cores
-XX:ParallelGCThreads=<n>

# Example for 64-core machine
-XX:ParallelGCThreads=38
\`\`\`

**4. Memory Uncommit:**
\`\`\`bash
# Enable/disable uncommit
-XX:+ZUncommit  # Default: enabled
-XX:-ZUncommit  # Disable

# Delay before uncommitting (seconds)
-XX:ZUncommitDelay=300  # Default: 5 minutes
\`\`\`

**5. Allocation Spike Tolerance:**
\`\`\`bash
# Handle allocation rate spikes
# Higher = more tolerance for spikes
-XX:ZAllocationSpikeTolerance=5  # Default: 2
\`\`\`

**Monitoring ZGC:**

**1. GC Logs:**
\`\`\`bash
# Enable GC logging
-Xlog:gc
-Xlog:gc*
-Xlog:gc*::time,tags,level

# Output to file
-Xlog:gc:gc.log

# Example output:
[0.234s] GC(0) Garbage Collection (Warmup)
[0.234s] GC(0) Pause Mark Start 0.025ms
[0.245s] GC(0) Concurrent Mark
[0.256s] GC(0) Pause Mark End 0.028ms
[0.267s] GC(0) Concurrent Process Non-Strong References
[0.278s] GC(0) Concurrent Relocate 0.034ms
[0.289s] GC(0) Garbage Collection (Warmup) 55M(2%)->45M(1%)
\`\`\`

**2. JMX Monitoring:**
\`\`\`java
import java.lang.management.*;

MemoryMXBean memoryBean = ManagementFactory.getMemoryMXBean();
MemoryUsage heapUsage = memoryBean.getHeapMemoryUsage();

System.out.println("Used: " + heapUsage.getUsed() / 1024 / 1024 + "MB");
System.out.println("Max: " + heapUsage.getMax() / 1024 / 1024 + "MB");

// Get GC stats
List<GarbageCollectorMXBean> gcBeans = ManagementFactory.getGarbageCollectorMXBeans();
for (GarbageCollectorMXBean gcBean : gcBeans) {
    System.out.println("GC: " + gcBean.getName());
    System.out.println("Count: " + gcBean.getCollectionCount());
    System.out.println("Time: " + gcBean.getCollectionTime() + "ms");
}
\`\`\`

**3. Metrics:**
Key metrics to monitor:
- Pause times (should be < 1ms)
- GC frequency
- Heap usage
- Allocation rate
- Relocation rate

**Performance Comparison:**

**G1GC vs ZGC (100GB heap):**
\`\`\`
Metric          | G1GC      | ZGC
----------------|-----------|----------
Pause time avg  | 50ms      | 0.2ms
Pause time p99  | 200ms     | 0.8ms
Throughput      | 95%       | 98%
Memory overhead | 2-5%      | 10-15%
CPU overhead    | Low       | Medium
\`\`\`

**When to Use ZGC:**

**✓ Use ZGC When:**
- Need sub-millisecond pause times
- Large heaps (> 50GB)
- Latency-sensitive applications
- Real-time systems
- Trading platforms
- Gaming servers
- Large caches

**✗ Don't Use ZGC When:**
- Small heaps (< 8GB) - use G1GC
- Throughput more important than latency
- Limited CPU resources
- Memory constrained systems

**Best Practices:**

✓ Set -Xms equal to -Xmx for predictability
✓ Allocate enough heap (ZGC needs headroom)
✓ Monitor pause times and adjust
✓ Use on 64-bit Linux/x64 for best results
✓ Tune ConcGCThreads based on workload
✓ Enable uncommit for cloud deployments
✓ Use with Java 15+ for production

**Summary:**
ZGC is a revolutionary garbage collector that achieves sub-millisecond pause times even with multi-terabyte heaps. Java 15 made it production-ready, adding features like memory uncommit and further pause time reductions. It's ideal for latency-sensitive applications requiring large heaps, such as financial trading systems, gaming servers, and real-time analytics platforms.`
    },
    {
      id: 8,
      category: 'Edwards-Curve Cryptography',
      difficulty: 'Medium',
      question: 'What is Edwards-Curve Digital Signature Algorithm (EdDSA) in Java 15 (JEP 339)?',
      answer: `**EdDSA (Edwards-Curve Digital Signature Algorithm):**

**Overview:**
Java 15 added support for EdDSA (RFC 8032), a modern, high-performance digital signature algorithm based on Edwards curves. It provides better security and performance than traditional algorithms like RSA and ECDSA.

**Why EdDSA:**

**Advantages over RSA/ECDSA:**
- Faster signature generation
- Faster signature verification
- Smaller key sizes
- Deterministic signatures (no random number generation)
- Resistance to timing attacks
- Simpler implementation
- Better security guarantees

**Edwards Curves Supported:**
- **Ed25519** - 128-bit security level (most common)
- **Ed448** - 224-bit security level (higher security)

**Basic Usage:**

**1. Generate Key Pair:**
\`\`\`java
import java.security.*;

// Generate Ed25519 key pair
KeyPairGenerator keyGen = KeyPairGenerator.getInstance("Ed25519");
KeyPair keyPair = keyGen.generateKeyPair();

PrivateKey privateKey = keyPair.getPrivate();
PublicKey publicKey = keyPair.getPublic();

System.out.println("Private key: " + privateKey.getAlgorithm());  // Ed25519
System.out.println("Public key: " + publicKey.getAlgorithm());    // Ed25519

// Generate Ed448 key pair (higher security)
KeyPairGenerator keyGen448 = KeyPairGenerator.getInstance("Ed448");
KeyPair keyPair448 = keyGen448.generateKeyPair();
\`\`\`

**2. Sign Data:**
\`\`\`java
import java.security.*;

// Create signature
Signature signature = Signature.getInstance("Ed25519");

// Initialize with private key
signature.initSign(privateKey);

// Sign data
byte[] data = "Hello, World!".getBytes();
signature.update(data);
byte[] signatureBytes = signature.sign();

System.out.println("Signature length: " + signatureBytes.length);  // 64 bytes for Ed25519
\`\`\`

**3. Verify Signature:**
\`\`\`java
import java.security.*;

// Verify signature
Signature verifier = Signature.getInstance("Ed25519");

// Initialize with public key
verifier.initVerify(publicKey);

// Verify
byte[] data = "Hello, World!".getBytes();
verifier.update(data);
boolean isValid = verifier.verify(signatureBytes);

System.out.println("Signature valid: " + isValid);  // true
\`\`\`

**Real-World Examples:**

**1. API Request Signing:**
\`\`\`java
public class APIClient {
    private PrivateKey privateKey;

    public void sendRequest(String url, String data) throws Exception {
        // Sign request
        Signature signature = Signature.getInstance("Ed25519");
        signature.initSign(privateKey);
        signature.update(data.getBytes());
        byte[] sig = signature.sign();

        // Encode signature as Base64
        String encodedSig = Base64.getEncoder().encodeToString(sig);

        // Send HTTP request with signature header
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .header("X-Signature", encodedSig)
            .POST(HttpRequest.BodyPublishers.ofString(data))
            .build();

        HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
    }
}

// Server verification
public class APIServer {
    private PublicKey clientPublicKey;

    public boolean verifyRequest(String data, String signatureHeader) throws Exception {
        byte[] signatureBytes = Base64.getDecoder().decode(signatureHeader);

        Signature verifier = Signature.getInstance("Ed25519");
        verifier.initVerify(clientPublicKey);
        verifier.update(data.getBytes());

        return verifier.verify(signatureBytes);
    }
}
\`\`\`

**2. Document Signing:**
\`\`\`java
public class DocumentSigner {
    public byte[] signDocument(byte[] document, PrivateKey privateKey) throws Exception {
        // Hash document (optional, but recommended for large documents)
        MessageDigest digest = MessageDigest.getInstance("SHA-512");
        byte[] hash = digest.digest(document);

        // Sign hash
        Signature signature = Signature.getInstance("Ed25519");
        signature.initSign(privateKey);
        signature.update(hash);

        return signature.sign();
    }

    public boolean verifyDocument(byte[] document, byte[] sig, PublicKey publicKey) throws Exception {
        // Hash document
        MessageDigest digest = MessageDigest.getInstance("SHA-512");
        byte[] hash = digest.digest(document);

        // Verify signature
        Signature verifier = Signature.getInstance("Ed25519");
        verifier.initVerify(publicKey);
        verifier.update(hash);

        return verifier.verify(sig);
    }
}
\`\`\`

**3. JWT Signing (EdDSA):**
\`\`\`java
public class JWTSigner {
    private PrivateKey privateKey;

    public String createJWT(Map<String, Object> claims) throws Exception {
        // JWT header
        String header = Base64.getUrlEncoder().withoutPadding()
            .encodeToString("{\\"alg\\":\\"EdDSA\\",\\"typ\\":\\"JWT\\"}".getBytes());

        // JWT payload
        String payload = Base64.getUrlEncoder().withoutPadding()
            .encodeToString(new ObjectMapper().writeValueAsBytes(claims));

        // Sign
        String data = header + "." + payload;
        Signature signature = Signature.getInstance("Ed25519");
        signature.initSign(privateKey);
        signature.update(data.getBytes());
        byte[] sig = signature.sign();

        String encodedSig = Base64.getUrlEncoder().withoutPadding()
            .encodeToString(sig);

        return data + "." + encodedSig;
    }

    public boolean verifyJWT(String jwt, PublicKey publicKey) throws Exception {
        String[] parts = jwt.split("\\\\.");
        String data = parts[0] + "." + parts[1];
        byte[] sig = Base64.getUrlDecoder().decode(parts[2]);

        Signature verifier = Signature.getInstance("Ed25519");
        verifier.initVerify(publicKey);
        verifier.update(data.getBytes());

        return verifier.verify(sig);
    }
}
\`\`\`

**4. Blockchain/Cryptocurrency:**
\`\`\`java
public class Transaction {
    private String from;
    private String to;
    private double amount;
    private byte[] signature;

    public void sign(PrivateKey privateKey) throws Exception {
        // Create transaction data
        String data = from + to + amount;

        // Sign transaction
        Signature signature = Signature.getInstance("Ed25519");
        signature.initSign(privateKey);
        signature.update(data.getBytes());

        this.signature = signature.sign();
    }

    public boolean verify(PublicKey publicKey) throws Exception {
        String data = from + to + amount;

        Signature verifier = Signature.getInstance("Ed25519");
        verifier.initVerify(publicKey);
        verifier.update(data.getBytes());

        return verifier.verify(signature);
    }
}
\`\`\`

**Key Storage:**

**1. Store Keys to File:**
\`\`\`java
public class KeyStorage {
    public static void saveKeyPair(KeyPair keyPair, String filename) throws IOException {
        // Save private key
        try (FileOutputStream fos = new FileOutputStream(filename + ".private")) {
            fos.write(keyPair.getPrivate().getEncoded());
        }

        // Save public key
        try (FileOutputStream fos = new FileOutputStream(filename + ".public")) {
            fos.write(keyPair.getPublic().getEncoded());
        }
    }

    public static KeyPair loadKeyPair(String filename) throws Exception {
        // Load private key
        byte[] privateKeyBytes = Files.readAllBytes(Paths.get(filename + ".private"));
        KeyFactory keyFactory = KeyFactory.getInstance("Ed25519");
        PrivateKey privateKey = keyFactory.generatePrivate(
            new PKCS8EncodedKeySpec(privateKeyBytes)
        );

        // Load public key
        byte[] publicKeyBytes = Files.readAllBytes(Paths.get(filename + ".public"));
        PublicKey publicKey = keyFactory.generatePublic(
            new X509EncodedKeySpec(publicKeyBytes)
        );

        return new KeyPair(publicKey, privateKey);
    }
}
\`\`\`

**2. Store in KeyStore:**
\`\`\`java
public class KeyStoreExample {
    public static void storeInKeyStore(KeyPair keyPair, String alias, char[] password) throws Exception {
        KeyStore keyStore = KeyStore.getInstance("PKCS12");
        keyStore.load(null, null);

        // Store private key with certificate chain
        X509Certificate cert = generateSelfSignedCert(keyPair);
        keyStore.setKeyEntry(
            alias,
            keyPair.getPrivate(),
            password,
            new Certificate[]{cert}
        );

        // Save to file
        try (FileOutputStream fos = new FileOutputStream("keystore.p12")) {
            keyStore.store(fos, password);
        }
    }

    private static X509Certificate generateSelfSignedCert(KeyPair keyPair) {
        // Generate self-signed certificate
        // (implementation omitted for brevity)
        return null;
    }
}
\`\`\`

**Performance Comparison:**

**Signature Generation (1000 operations):**
\`\`\`
Algorithm     | Time       | Key Size | Signature Size
--------------|------------|----------|----------------
RSA-2048      | 1200ms     | 2048 bits| 256 bytes
ECDSA P-256   | 450ms      | 256 bits | 64-72 bytes
Ed25519       | 180ms      | 256 bits | 64 bytes
Ed448         | 320ms      | 448 bits | 114 bytes
\`\`\`

**Signature Verification (1000 operations):**
\`\`\`
Algorithm     | Time
--------------|----------
RSA-2048      | 45ms
ECDSA P-256   | 680ms
Ed25519       | 350ms
Ed448         | 650ms
\`\`\`

**Benefits:**

✓ **Fast**: 3-5x faster signing than ECDSA
✓ **Secure**: Resistance to timing attacks
✓ **Deterministic**: No random number generation required
✓ **Simple**: Fewer parameters to configure
✓ **Small**: Compact keys and signatures
✓ **Safe**: Built-in protection against implementation errors

**Security Levels:**

**Ed25519:**
- 128-bit security level
- Equivalent to 3072-bit RSA
- Suitable for most applications

**Ed448:**
- 224-bit security level
- Equivalent to 15360-bit RSA
- High-security applications

**Use Cases:**

✓ API authentication
✓ Digital signatures for documents
✓ JWT signing
✓ Cryptocurrency transactions
✓ SSH keys
✓ TLS certificates
✓ Code signing
✓ Blockchain applications

**Best Practices:**

✓ Use Ed25519 for general purpose
✓ Use Ed448 for high-security requirements
✓ Store private keys securely
✓ Use deterministic signatures (built-in)
✓ Verify signatures before processing
✓ Use with TLS for network communication
✓ Rotate keys periodically

**Summary:**
Java 15 added EdDSA (Edwards-Curve Digital Signature Algorithm) support via JEP 339. EdDSA provides faster performance, better security, and simpler implementation compared to traditional RSA and ECDSA. It's ideal for API authentication, document signing, JWT tokens, and blockchain applications.`
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
      'Pattern Matching': '#10b981',
      'Edwards-Curve Cryptography': '#ef4444',
      'Enhanced NullPointerException': '#ec4899',
      'Hidden Classes': '#06b6d4',
      'ZGC Improvements': '#a855f7'
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

      <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div onClick={(e) => e.stopPropagation()} style={{ transform: 'scale(0.85)' }}>
                  <CompletionCheckbox problemId={`Java15Questions-${q.id}`} />
                </div>
                <div style={{
                  fontSize: '1.5rem',
                  color: getCategoryColor(q.category),
                  fontWeight: 'bold',
                  transform: expandedQuestion === q.id ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}>
                  ▼
                </div>
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
