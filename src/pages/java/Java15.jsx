import { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

// Normalize indentation helper
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

function Java15({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedConcept, setSelectedConcept] = useState(null)

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

    // Combine sections with fewer than 3 meaningful lines
    const combinedSections = []
    let tempCombined = null

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i]
      const meaningfulLines = section.code.split('\n').filter(line =>
        line.trim() && !line.trim().startsWith('//') && line.trim() !== '}'
      ).length

      if (meaningfulLines < 3 && i < sections.length - 1) {
        if (!tempCombined) {
          tempCombined = { title: section.title, code: section.code }
        } else {
          tempCombined.code += '\n\n' + section.code
        }
      } else {
        if (tempCombined) {
          tempCombined.code += '\n\n' + section.code
          combinedSections.push(tempCombined)
          tempCombined = null
        } else {
          combinedSections.push(section)
        }
      }
    }

    if (tempCombined) {
      combinedSections.push(tempCombined)
    }

    return combinedSections.length > 0 ? combinedSections : sections
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

  const categories = [
    {
      id: 'text-blocks',
      name: 'Text Blocks',
      icon: '📝',
      color: '#8b5cf6',
      description: 'Multi-line string literals with proper formatting',
      conceptIds: [0, 1, 2] // Use Cases, Pattern Matching, Design Benefits
    },
    {
      id: 'sealed-classes',
      name: 'Sealed Classes',
      icon: '🔒',
      color: '#3b82f6',
      description: 'Controlled class hierarchies and pattern matching support',
      conceptIds: [3, 4, 5, 6, 7, 8] // Preview Feature, Dynamic Class Generation, Framework Support, Unloading, Lookup.defineHiddenClass, Access Control
    },
    {
      id: 'records',
      name: 'Records',
      icon: '📦',
      color: '#10b981',
      description: 'Immutable data carriers with compact syntax',
      conceptIds: [9, 10, 11, 12, 13, 14] // Data Carrier Classes, Compact Syntax, Immutability, Customization, Pattern Matching, Preview Refinements
    }
  ]

  const concepts = [
    {
      name: 'Use Cases',
      icon: '🔹',
      explanation: `**Common Use Cases:**

• SQL Queries - Multi-line queries without concatenation
• JSON/XML Templates - Complex data structures with proper indentation
• HTML Snippets - Email templates and web content
• Regex Patterns - Complex patterns with comments and formatting
• Test Data - Multi-line test inputs and expected outputs

**Benefits:**

• Eliminates string concatenation noise
• Preserves formatting and indentation
• No escape character management
• Improved code readability`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Use Cases - Implementation
// ═══════════════════════════════════════════════════════════════════════════

import java.util.regex.Pattern;
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
      name: 'Pattern Matching',
      icon: '🔹',
      explanation: `**Integration with Pattern Matching:**

• Sealed types enable exhaustive switch expressions
• Compiler knows all possible subtypes
• No default case required
• Type-safe pattern matching guaranteed

**Algebraic Data Types:**

• Models sum types (sealed) and product types (records)
• Enables functional programming patterns
• Compiler-verified completeness
• Makes impossible states unrepresentable`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Pattern Matching - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Sealed type hierarchy for JSON values
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

    public JsonString(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}

public final class JsonNumber implements JsonValue {
    private double value;

    public JsonNumber(double value) {
        this.value = value;
    }

    public double getValue() {
        return value;
    }
}

public final class JsonBoolean implements JsonValue {
    private boolean value;

    public JsonBoolean(boolean value) {
        this.value = value;
    }

    public boolean getValue() {
        return value;
    }
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
      name: 'Design Benefits',
      icon: '🔹',
      explanation: `**Domain Modeling:**

• Payment types - Credit card, PayPal, crypto
• Shapes - Circle, rectangle, triangle
• States - Success, failure, pending
• Events - User actions, system events

**API Design:**

• Controlled extension points
• Closed set of implementations
• API maintainer controls hierarchy
• Compiler enforces proper implementation

**Maintainability:**

• Type hierarchy invariants guaranteed
• Refactoring safety with compiler checks
• Clear domain boundaries`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Design Benefits - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Domain modeling: Payment types
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
      icon: '🔹',
      explanation: `**Evolution Timeline:**

• Java 15 - First preview (JEP 360)
• Java 16 - Second preview (JEP 397) with refinements
• Java 17 - Standard feature (JEP 409) finalized

**Preview Process Benefits:**

• Community testing and feedback
• Iterative refinement before finalization
• Compatibility validation
• Real-world use case discovery

**Key Refinements:**

• Local sealed classes support
• Better error messages
• Pattern matching integration
• Documentation improvements`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Preview Feature - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Java 15 (First Preview) - requires --enable-preview
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
    },
    {
      name: 'Dynamic Class Generation',
      icon: '🔹',
      explanation: `**What are Hidden Classes:**

• Classes not directly usable by other bytecode
• Created dynamically at runtime
• Not discoverable via standard reflection
• Replace sun.misc.Unsafe patterns

**Creation Process:**

• Generated by frameworks at runtime
• Use MethodHandles.Lookup API
• Bytecode created programmatically
• Dynamically named and loaded

**Use Cases:**

• JVM language implementations
• Dynamic proxies
• Lambda expressions (internal use)
• Method handle optimization`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Dynamic Class Generation - Implementation
// ═══════════════════════════════════════════════════════════════════════════

import java.lang.invoke.MethodHandles;
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
      icon: '🔹',
      explanation: `**Target Frameworks:**

• JVM Languages - Groovy, Kotlin, Scala bytecode generation
• Dynamic Proxies - Runtime interface implementations
• Lambda Expressions - Internal lambda class generation
• Method Handles - Performance-optimized invocation

**Standard API Benefits:**

• Replaces internal sun.misc.Unsafe usage
• Official, supported mechanism
• Better security and encapsulation
• Improved maintainability

**Performance:**

• Optimized class loading
• Reduced memory overhead
• Better JIT compilation support`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Framework Support - Implementation
// ═══════════════════════════════════════════════════════════════════════════

import java.lang.invoke.*;
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
      icon: '🔹',
      explanation: `**Independent Unloading:**

• Hidden classes unload when unreachable
• Independent of class loader lifecycle
• No metaspace memory leaks
• Automatic garbage collection

**Memory Management:**

• Framework-generated classes cleaned automatically
• No manual cleanup required
• Prevents metaspace exhaustion
• Ideal for long-running applications

**Use Cases:**

• Scripting engines with temporary classes
• Dynamic code generation frameworks
• Hot-reload development environments
• JVM language implementations`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Unloading - Implementation
// ═══════════════════════════════════════════════════════════════════════════

import java.lang.invoke.MethodHandles;
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
      icon: '🔹',
      explanation: `**API Overview:**

• Lookup.defineHiddenClass(bytes, init, options...)
• Returns Lookup with full class access
• Bytecode provided as byte array
• Options control class behavior

**Class Options:**

• NESTMATE - Hidden class joins lookup's nest
• STRONG - Strong reachability reference
• Controls class lifecycle and access

**Access Pattern:**

• Cannot reference by name in bytecode
• Full access through returned Lookup
• Use MethodHandles for invocation
• More secure than Unsafe approaches`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Lookup.defineHiddenClass - Implementation
// ═══════════════════════════════════════════════════════════════════════════

import java.lang.invoke.MethodHandles;
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
      icon: '🔹',
      explanation: `**Strong Encapsulation:**

• Cannot be referenced by name in code
• Class.forName() cannot find them
• No reflection access without Lookup
• Controlled visibility scope

**Security Benefits:**

• Framework code cannot be hijacked
• Prevention of reflection-based attacks
• Controlled access patterns
• Strong encapsulation guarantees

**Access Requirements:**

• Must use proper Lookup object
• MethodHandles for invocation
• Access rights verified at creation
• Security enforced at JVM level`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Access Control - Implementation
// ═══════════════════════════════════════════════════════════════════════════

import java.lang.invoke.*;
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
    },
    {
      name: 'Data Carrier Classes',
      icon: '🔹',
      explanation: `**Record Basics:**

• Syntax: record Point(int x, int y) {}
• Transparent carriers for immutable data
• Components declared in header
• Zero boilerplate required

**Auto-Generated Methods:**

• Canonical constructor - All components
• Accessor methods - Named after components
• equals() - Component-wise equality
• hashCode() - Based on all components
• toString() - Readable representation

**Benefits:**

• Dramatically reduced boilerplate
• Clear intent and purpose
• Compiler-verified correctness`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Data Carrier Classes - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Before Records - traditional class (boilerplate!)
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
      icon: '🔹',
      explanation: `**Declaration Simplicity:**

• Components in header only
• No explicit fields needed
• No constructor declaration
• No accessor methods required

**Accessor Naming:**

• Named after components: x(), not getX()
• Follows functional style
• More concise API
• Better readability

**Advanced Features:**

• Generic records: record Pair<K, V>(K key, V value)
• Interface implementation supported
• Nested records allowed
• Computed properties can be added`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Compact Syntax - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Records with multiple components
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
      icon: '🔹',
      explanation: `**Built-in Immutability:**

• All fields implicitly final
• No setter methods generated
• Components cannot be modified
• Functional update patterns encouraged

**Class Restrictions:**

• Records are implicitly final
• Cannot extend other classes
• Can implement interfaces
• Cannot be subclassed

**Benefits:**

• Thread-safe by default
• Safe to share across threads
• Usable as map keys
• Easier to reason about
• Prevents defensive copying`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Immutability - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Records are immutable - all fields final
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
      icon: '🔹',
      explanation: `**Compact Constructor:**

• No parameter list required
• Validates and transforms arguments
• Runs before field initialization
• Clean validation syntax

**Custom Methods:**

• Add computed properties
• Business logic methods
• Static factory methods
• Helper functions

**Method Overriding:**

• Override generated methods
• Custom toString() implementation
• Enhanced equals() logic
• Specialized hashCode()

**Flexibility:**

• Combine conciseness with customization
• Validation without boilerplate
• Full OOP capabilities maintained`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Customization - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Record with validation using compact constructor
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
      icon: '🔹',
      explanation: `**Pattern Matching Integration:**

• Records work perfectly with instanceof patterns
• Destructuring support (future Java versions)
• Type-safe extraction of components
• Exhaustive switch with sealed types

**Functional Programming:**

• Enables functional-style patterns
• Algebraic data type modeling
• Clean data transformation
• Immutable data pipelines

**Future Enhancements:**

• Record patterns for destructuring
• Switch expressions with records
• Nested pattern matching
• More concise syntax`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Pattern Matching - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Records with pattern matching (preview in Java 15)
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
      icon: '🔹',
      explanation: `**Evolution Timeline:**

• Java 14 - First preview with basic records
• Java 15 - Second preview with refinements
• Java 16 - Final release as standard feature

**Java 15 Additions:**

• Local Records - Records inside methods
• Annotations on record components
• Better serialization support
• Improved accessor overriding

**Key Refinements:**

• Local record classes for scoped data
• Component annotations propagate properly
• Pattern matching preparation
• Community feedback incorporated

**Finalization Benefits:**

• Production-ready feature
• Full documentation
• Best practices established
• Tool support matured`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Preview Refinements - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Java 14 (First Preview)
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
  ]

  return (
    <div style={{
      padding: '1.5rem',
      maxWidth: '80rem',
      margin: '0 auto',
      background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)',
      color: 'white',
      minHeight: '100vh'
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
            Java 15 Features
          </h1>
          {currentSubcategory && (
            <span style={{
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
              fontWeight: '600',
              backgroundColor: 'rgba(245, 158, 11, 0.2)',
              color: '#fbbf24',
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
                boxShadow: '0 2px 8px rgba(55, 65, 81, 0.3)',
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
                boxShadow: '0 2px 8px rgba(55, 65, 81, 0.3)',
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

      <Breadcrumb breadcrumb={breadcrumb} />

      <div style={{
        background: 'linear-gradient(to bottom right, #1f2937, #111827)', padding: '2.5rem 10rem',
        borderRadius: '16px', border: '2px solid #f59e0b', marginBottom: '2rem'
      }}>
        <p style={{
          fontSize: '1.3rem', color: '#d1d5db', fontWeight: '500', margin: 0,
          lineHeight: '1.8', textAlign: 'center'
        }}>
          Explore Java 15 additions with Text Blocks, Sealed Classes (Preview), Records (Preview), and Pattern Matching enhancements.
        </p>
      </div>

      {!selectedCategory && !selectedConcept && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {categories.map((category) => (
            <div key={category.id} onClick={() => {
              setSelectedCategory(category);
              setSelectedConcept(concepts[category.conceptIds[0]]);
            }} style={{
                background: 'linear-gradient(to bottom right, #1f2937, #111827)', padding: '2rem',
                borderRadius: '16px', border: '2px solid #f59e0b',
                cursor: 'pointer', transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
                e.currentTarget.style.borderColor = '#fbbf24'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                e.currentTarget.style.borderColor = '#f59e0b'
              }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>
                {category.icon}
              </div>
              <h3 style={{
                fontSize: '1.5rem', fontWeight: '700', color: '#fbbf24',
                marginBottom: '1rem', textAlign: 'center'
              }}>{category.name}</h3>
              <p style={{
                fontSize: '1rem', color: '#d1d5db', lineHeight: '1.6', textAlign: 'center'
              }}>
                {category.description}
              </p>
            </div>
          ))}
        </div>
      )}

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
              background: 'linear-gradient(to right, #1f2937, #374151)',
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
                  backgroundColor: 'rgba(245, 158, 11, 0.2)',
                  color: '#fbbf24',
                  border: '1px solid #f59e0b',
                  borderRadius: '8px',
                  padding: '0.5rem 1rem',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontWeight: 'bold'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(245, 158, 11, 0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(245, 158, 11, 0.2)'
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
                background: 'linear-gradient(to bottom, #1f2937, #111827)',
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
                          ? 'rgba(245, 158, 11, 0.2)'
                          : '#374151',
                        border: isActive
                          ? '2px solid #f59e0b'
                          : '2px solid #4b5563',
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
                          e.currentTarget.style.backgroundColor = '#1d4ed8'
                          e.currentTarget.style.borderColor = '#f59e0b'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = '#374151'
                          e.currentTarget.style.borderColor = '#4b5563'
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
                background: 'linear-gradient(to bottom right, #1f2937, #111827)'
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
                  background: 'linear-gradient(to bottom right, #374151, #1f2937)',
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
                                      <span style={{ color: '#9ca3af' }}>{bulletContent}</span>
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
                          <SyntaxHighlighter code={section.code} />
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
                      <SyntaxHighlighter code={selectedConcept.codeExample} />
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

export default Java15
