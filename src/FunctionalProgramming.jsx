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
      .replace(/\b(public|private|protected|static|final|class|interface|extends|implements|new|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|import|package|void|abstract|synchronized|volatile|transient|native|strictfp|super|this|null)\b/g, '<span style="color: #c586c0;">$1</span>')

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
                +{component.details.length - 3} more concepts...
              </text>
            )}

            {/* Hover tooltip */}
            {hoveredComponent === component.id && (
              <g>
                <rect
                  x={component.x + component.width + 20}
                  y={component.y}
                  width="300"
                  height="140"
                  rx="8"
                  ry="8"
                  fill="#1e293b"
                  stroke="#64748b"
                  strokeWidth="2"
                  style={{ filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))' }}
                />
                <text
                  x={component.x + component.width + 35}
                  y={component.y + 25}
                  fontSize="14"
                  fontWeight="700"
                  fill="#60a5fa"
                >
                  Functional Concepts
                </text>
                {Object.entries(component.metrics).map(([key, value], idx) => (
                  <text
                    key={idx}
                    x={component.x + component.width + 35}
                    y={component.y + 50 + (idx * 20)}
                    fontSize="12"
                    fontWeight="500"
                    fill="white"
                  >
                    {key}: {value}
                  </text>
                ))}
              </g>
            )}
          </g>
        )})}
      </svg>
    </div>
  )
}

function FunctionalProgramming({ onBack }) {
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedConcept, setSelectedConcept] = useState(null)
  const [focusedComponentIndex, setFocusedComponentIndex] = useState(0)

  const components = [
    {
      id: 'pure-functions', x: 80, y: 240, width: 350, height: 160,
      icon: '🔄', title: 'Pure Functions', color: 'blue',
      details: [
        {
          name: 'Deterministic',
          explanation: 'Pure functions always return the same output for the same input, making them predictable and reliable. No hidden dependencies or side effects that could change behavior.',
          codeExample: `// Pure function - always returns same result for same input
public class PureFunctions {
  // Pure function - deterministic
  public static int add(int a, int b) {
    return a + b;
  }

  // Pure function - no side effects
  public static int square(int n) {
    return n * n;
  }

  // Impure function - depends on external state
  private static int counter = 0;
  public static int impureIncrement() {
    return ++counter; // Side effect!
  }

  // Pure function - uses only parameters
  public static String greet(String name) {
    return "Hello, " + name;
  }

  public static void main(String[] args) {
    // Pure functions always give same results
    System.out.println(add(2, 3));      // Output: 5
    System.out.println(add(2, 3));      // Output: 5 (same!)

    System.out.println(square(4));      // Output: 16
    System.out.println(square(4));      // Output: 16 (same!)

    // Impure function gives different results
    System.out.println(impureIncrement()); // Output: 1
    System.out.println(impureIncrement()); // Output: 2 (different!)
  }
}`
        },
        {
          name: 'No Side Effects',
          explanation: 'Pure functions do not modify external state, variables, or perform I/O operations. They only compute and return values based on their parameters.',
          codeExample: `import java.util.*;

public class SideEffects {
  // Impure - modifies external state
  private static List<String> globalList = new ArrayList<>();

  public static void impureAdd(String item) {
    globalList.add(item); // Side effect!
  }

  // Pure - returns new list without modifying input
  public static List<String> pureAdd(List<String> list, String item) {
    List<String> newList = new ArrayList<>(list);
    newList.add(item);
    return newList;
  }

  // Pure - no modification of parameters
  public static int sumList(List<Integer> numbers) {
    return numbers.stream()
                  .mapToInt(Integer::intValue)
                  .sum();
  }

  // Impure - logs to console (I/O operation)
  public static int impureSum(List<Integer> numbers) {
    int sum = numbers.stream().mapToInt(Integer::intValue).sum();
    System.out.println("Sum: " + sum); // Side effect!
    return sum;
  }

  public static void main(String[] args) {
    List<String> original = Arrays.asList("a", "b");
    List<String> result = pureAdd(original, "c");

    System.out.println(original); // Output: [a, b] (unchanged)
    System.out.println(result);   // Output: [a, b, c]

    List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);
    System.out.println(sumList(nums)); // Output: 15
  }
}`
        },
        {
          name: 'Referential Transparency',
          explanation: 'Function calls can be replaced with their return values without changing program behavior. This enables powerful optimization and reasoning techniques.',
          codeExample: `public class ReferentialTransparency {
  // Referentially transparent function
  public static int multiply(int a, int b) {
    return a * b;
  }

  // Can be replaced with its value
  public static int calculate() {
    int x = multiply(3, 4);  // Can replace with 12
    int y = multiply(3, 4);  // Can replace with 12
    return x + y;
  }

  // Equivalent optimized version
  public static int calculateOptimized() {
    int x = 12;  // Replaced multiply(3, 4) with 12
    int y = 12;  // Replaced multiply(3, 4) with 12
    return x + y;
  }

  // Pure function - referentially transparent
  public static String formatName(String first, String last) {
    return first + " " + last;
  }

  // Not referentially transparent - depends on time
  public static long getCurrentTime() {
    return System.currentTimeMillis(); // Different each call
  }

  public static void main(String[] args) {
    // These produce identical results
    System.out.println(calculate());          // Output: 24
    System.out.println(calculateOptimized()); // Output: 24

    // Can be replaced anywhere
    String name1 = formatName("John", "Doe");
    String name2 = "John Doe";
    System.out.println(name1.equals(name2));  // Output: true
  }
}`
        },
        {
          name: 'Testability',
          explanation: 'Pure functions are easy to test since they have no dependencies and always produce the same output. No need for mocking or complex setup.',
          codeExample: `import java.util.*;
import java.util.stream.Collectors;

public class TestableCode {
  // Pure function - easy to test
  public static List<Integer> filterEven(List<Integer> numbers) {
    return numbers.stream()
                  .filter(n -> n % 2 == 0)
                  .collect(Collectors.toList());
  }

  // Pure function - no dependencies
  public static double calculateDiscount(double price, double percentage) {
    if (price < 0 || percentage < 0 || percentage > 100) {
      throw new IllegalArgumentException("Invalid input");
    }
    return price * (percentage / 100);
  }

  // Pure function - predictable output
  public static String capitalize(String text) {
    if (text == null || text.isEmpty()) {
      return text;
    }
    return text.substring(0, 1).toUpperCase() +
           text.substring(1).toLowerCase();
  }

  // Simple test cases
  public static void testFunctions() {
    // Test filterEven
    List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 6);
    List<Integer> evens = filterEven(nums);
    assert evens.equals(Arrays.asList(2, 4, 6)) : "Filter failed";

    // Test calculateDiscount
    assert calculateDiscount(100, 10) == 10.0 : "Discount failed";
    assert calculateDiscount(50, 20) == 10.0 : "Discount failed";

    // Test capitalize
    assert capitalize("hello").equals("Hello") : "Capitalize failed";
    assert capitalize("WORLD").equals("World") : "Capitalize failed";

    System.out.println("All tests passed!");
  }

  public static void main(String[] args) {
    testFunctions();
  }
}`
        },
        {
          name: 'Immutability',
          explanation: 'Pure functions work with immutable data, creating new objects rather than modifying existing ones. This prevents unexpected mutations and data corruption.',
          codeExample: `import java.util.*;
import java.util.stream.Collectors;

public class ImmutableOperations {
  // Pure - returns new list
  public static List<Integer> addElement(List<Integer> list, int element) {
    List<Integer> newList = new ArrayList<>(list);
    newList.add(element);
    return newList;
  }

  // Pure - returns new list with transformation
  public static List<Integer> multiplyAll(List<Integer> list, int factor) {
    return list.stream()
               .map(n -> n * factor)
               .collect(Collectors.toList());
  }

  // Immutable data class
  public static final class Point {
    private final int x;
    private final int y;

    public Point(int x, int y) {
      this.x = x;
      this.y = y;
    }

    public int getX() { return x; }
    public int getY() { return y; }

    // Returns new Point instead of modifying
    public Point move(int dx, int dy) {
      return new Point(x + dx, y + dy);
    }

    @Override
    public String toString() {
      return "(" + x + ", " + y + ")";
    }
  }

  public static void main(String[] args) {
    List<Integer> original = Arrays.asList(1, 2, 3);
    List<Integer> modified = addElement(original, 4);

    System.out.println(original); // Output: [1, 2, 3] (unchanged)
    System.out.println(modified); // Output: [1, 2, 3, 4]

    List<Integer> doubled = multiplyAll(original, 2);
    System.out.println(doubled);  // Output: [2, 4, 6]

    Point p1 = new Point(0, 0);
    Point p2 = p1.move(5, 10);
    System.out.println(p1);       // Output: (0, 0) (unchanged)
    System.out.println(p2);       // Output: (5, 10)
  }
}`
        }
      ],
      metrics: { predictability: '100%', testability: 'High', optimization: 'Easy', debugging: 'Simple' },
      description: 'Functions that always return the same output for the same input and have no side effects, forming the foundation of functional programming.'
    },
    {
      id: 'lambda-expressions', x: 680, y: 140, width: 350, height: 160,
      icon: 'λ', title: 'Lambda Expressions', color: 'green',
      details: [
        {
          name: 'Anonymous Functions',
          explanation: 'Lambda expressions create functions without explicit names, perfect for short, one-time use functions. Syntax: (parameters) -> expression or statement block.',
          codeExample: `import java.util.*;

public class LambdaBasics {
  public static void main(String[] args) {
    List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

    // Traditional anonymous class
    names.forEach(new java.util.function.Consumer<String>() {
      @Override
      public void accept(String name) {
        System.out.println(name);
      }
    });

    // Lambda expression - much cleaner!
    names.forEach(name -> System.out.println(name));

    // Lambda with multiple statements
    names.forEach(name -> {
      String greeting = "Hello, " + name;
      System.out.println(greeting);
    });

    // Lambda with multiple parameters
    Map<String, Integer> map = new HashMap<>();
    map.put("Alice", 25);
    map.put("Bob", 30);

    map.forEach((key, value) ->
      System.out.println(key + " is " + value + " years old")
    );
    // Output:
    // Alice is 25 years old
    // Bob is 30 years old

    // Lambda for sorting
    List<Integer> numbers = Arrays.asList(5, 2, 8, 1, 9);
    numbers.sort((a, b) -> a.compareTo(b));
    System.out.println(numbers); // Output: [1, 2, 5, 8, 9]
  }
}`
        },
        {
          name: 'Functional Interfaces',
          explanation: 'Lambdas implement functional interfaces (interfaces with single abstract method). Examples: Predicate<T>, Function<T,R>, Consumer<T>, Supplier<T>.',
          codeExample: `import java.util.function.*;
import java.util.*;
import java.util.stream.Collectors;

public class FunctionalInterfaces {
  public static void main(String[] args) {
    // Predicate<T> - takes T, returns boolean
    Predicate<Integer> isEven = n -> n % 2 == 0;
    System.out.println(isEven.test(4));  // Output: true
    System.out.println(isEven.test(5));  // Output: false

    // Function<T, R> - takes T, returns R
    Function<String, Integer> stringLength = s -> s.length();
    System.out.println(stringLength.apply("Hello")); // Output: 5

    // Consumer<T> - takes T, returns nothing
    Consumer<String> printer = s -> System.out.println(s);
    printer.accept("Hello World"); // Output: Hello World

    // Supplier<T> - takes nothing, returns T
    Supplier<Double> randomSupplier = () -> Math.random();
    System.out.println(randomSupplier.get()); // Output: random number

    // BiFunction<T, U, R> - takes T and U, returns R
    BiFunction<Integer, Integer, Integer> adder = (a, b) -> a + b;
    System.out.println(adder.apply(5, 3)); // Output: 8

    // Using with streams
    List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

    List<String> longNames = names.stream()
      .filter(name -> name.length() > 3)  // Predicate
      .map(name -> name.toUpperCase())    // Function
      .collect(Collectors.toList());

    System.out.println(longNames); // Output: [ALICE, CHARLIE]

    // Custom functional interface
    @FunctionalInterface
    interface Calculator {
      int calculate(int a, int b);
    }

    Calculator multiply = (a, b) -> a * b;
    System.out.println(multiply.calculate(4, 5)); // Output: 20
  }
}`
        },
        {
          name: 'Method References',
          explanation: 'Shorthand for lambda expressions that call existing methods. Types: static (Class::method), instance (object::method), constructor (Class::new).',
          codeExample: `import java.util.*;
import java.util.function.*;

public class MethodReferences {
  // Static method
  public static int parseInt(String s) {
    return Integer.parseInt(s);
  }

  // Instance method
  public void printMessage(String msg) {
    System.out.println("Message: " + msg);
  }

  public static void main(String[] args) {
    List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

    // 1. Static method reference
    // Lambda: s -> Integer.parseInt(s)
    // Method reference: Integer::parseInt
    List<String> numberStrings = Arrays.asList("1", "2", "3");
    numberStrings.stream()
                 .map(Integer::parseInt)
                 .forEach(System.out::println);
    // Output: 1, 2, 3

    // 2. Instance method reference (on specific object)
    MethodReferences obj = new MethodReferences();
    Consumer<String> printer = obj::printMessage;
    printer.accept("Hello"); // Output: Message: Hello

    // 3. Instance method reference (on arbitrary object)
    // Lambda: s -> s.toUpperCase()
    // Method reference: String::toUpperCase
    names.stream()
         .map(String::toUpperCase)
         .forEach(System.out::println);
    // Output: ALICE, BOB, CHARLIE

    // 4. Constructor reference
    // Lambda: () -> new ArrayList<>()
    // Method reference: ArrayList::new
    Supplier<List<String>> listSupplier = ArrayList::new;
    List<String> newList = listSupplier.get();

    // Lambda: s -> new String(s)
    // Method reference: String::new
    Function<char[], String> stringCreator = String::new;
    String str = stringCreator.apply(new char[]{'H', 'i'});
    System.out.println(str); // Output: Hi

    // Comparison sorting with method reference
    List<String> words = Arrays.asList("banana", "apple", "cherry");
    words.sort(String::compareToIgnoreCase);
    System.out.println(words); // Output: [apple, banana, cherry]
  }
}`
        },
        {
          name: 'Closure',
          explanation: 'Lambdas can capture and use variables from enclosing scope. Captured variables must be effectively final to ensure thread safety and predictability.',
          codeExample: `import java.util.function.*;

public class LambdaClosures {
  public static void main(String[] args) {
    // Capturing effectively final variables
    int multiplier = 10; // Effectively final

    Function<Integer, Integer> multiply = n -> n * multiplier;
    System.out.println(multiply.apply(5)); // Output: 50

    // multiplier = 20; // Compile error! Can't modify captured variable

    // Capturing instance variables
    String prefix = "Hello";
    Consumer<String> greeter = name -> {
      System.out.println(prefix + ", " + name); // Captures prefix
    };
    greeter.accept("Alice"); // Output: Hello, Alice

    // Creating multiple closures
    int factor = 2;
    Function<Integer, Integer> doubler = x -> x * factor;
    Function<Integer, Integer> squared = x -> x * x;
    Function<Integer, Integer> combined =
      x -> squared.apply(doubler.apply(x));

    System.out.println(combined.apply(3)); // Output: 36 ((3*2)^2)

    // Counter example with closure
    int[] counter = new int[1]; // Array to allow modification
    Runnable increment = () -> counter[0]++;

    increment.run();
    increment.run();
    increment.run();
    System.out.println("Count: " + counter[0]); // Output: Count: 3

    // Function factory using closures
    Function<Integer, Function<Integer, Integer>> createAdder =
      x -> y -> x + y; // Returns a function that adds x to its input

    Function<Integer, Integer> add5 = createAdder.apply(5);
    Function<Integer, Integer> add10 = createAdder.apply(10);

    System.out.println(add5.apply(3));  // Output: 8
    System.out.println(add10.apply(3)); // Output: 13
  }
}`
        },
        {
          name: 'Type Inference',
          explanation: 'Compiler automatically infers lambda parameter types based on context, reducing verbosity while maintaining type safety. Target typing determines the functional interface.',
          codeExample: `import java.util.*;
import java.util.function.*;
import java.util.stream.Collectors;

public class TypeInference {
  // Custom functional interfaces for demonstration
  @FunctionalInterface
  interface StringProcessor {
    String process(String input);
  }

  @FunctionalInterface
  interface NumberCombiner {
    int combine(int a, int b);
  }

  public static void main(String[] args) {
    // Type inferred from context - no need to specify types
    List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

    // Type of 'name' is inferred as String
    names.forEach(name -> System.out.println(name.toUpperCase()));

    // Explicit type (optional, but sometimes clearer)
    names.forEach((String name) -> System.out.println(name));

    // Return type inferred
    Function<String, Integer> lengthCalc = s -> s.length();
    // Compiler knows: takes String, returns Integer

    // Multiple parameters - types inferred
    BiFunction<Integer, Integer, Integer> adder = (a, b) -> a + b;
    System.out.println(adder.apply(5, 3)); // Output: 8

    // Explicit types for clarity
    BiFunction<Integer, Integer, Integer> multiplier =
      (Integer a, Integer b) -> a * b;

    // Type inference with streams
    List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

    // All types inferred from context
    List<Integer> doubled = numbers.stream()
      .filter(n -> n > 2)      // Predicate<Integer>
      .map(n -> n * 2)         // Function<Integer, Integer>
      .collect(Collectors.toList());

    System.out.println(doubled); // Output: [6, 8, 10]

    // Custom functional interface usage
    StringProcessor uppercase = s -> s.toUpperCase();
    StringProcessor lowercase = s -> s.toLowerCase();

    System.out.println(uppercase.process("hello")); // Output: HELLO
    System.out.println(lowercase.process("WORLD")); // Output: world

    NumberCombiner max = (a, b) -> Math.max(a, b);
    NumberCombiner min = (a, b) -> Math.min(a, b);

    System.out.println(max.combine(5, 10)); // Output: 10
    System.out.println(min.combine(5, 10)); // Output: 5

    // Target typing with method calls
    processList(names, s -> s.length() > 3); // Type inferred
  }

  static void processList(List<String> list, Predicate<String> condition) {
    list.stream()
        .filter(condition)
        .forEach(System.out::println);
  }
}`
        }
      ],
      metrics: { conciseness: '80%', readability: 'High', performance: 'Optimized', usage: 'Ubiquitous' },
      description: 'Concise way to represent anonymous functions, enabling functional programming constructs and cleaner code in Java 8+.'
    },
    {
      id: 'higher-order-functions', x: 680, y: 340, width: 350, height: 160,
      icon: '📈', title: 'Higher-Order Functions', color: 'purple',
      details: [
        {
          name: 'Functions as Parameters',
          explanation: 'Higher-order functions accept other functions as parameters, enabling flexible and reusable code. Common pattern in functional programming for customizable behavior.',
          codeExample: `import java.util.*;
import java.util.function.*;

public class FunctionsAsParameters {
  // Higher-order function - accepts function as parameter
  public static <T> List<T> filterList(List<T> list, Predicate<T> predicate) {
    List<T> result = new ArrayList<>();
    for (T item : list) {
      if (predicate.test(item)) {
        result.add(item);
      }
    }
    return result;
  }

  // Higher-order function with multiple function parameters
  public static <T, R> List<R> mapAndFilter(
      List<T> list,
      Function<T, R> mapper,
      Predicate<R> filter) {
    List<R> result = new ArrayList<>();
    for (T item : list) {
      R mapped = mapper.apply(item);
      if (filter.test(mapped)) {
        result.add(mapped);
      }
    }
    return result;
  }

  // Execute operation with custom behavior
  public static void repeatOperation(int times, Consumer<Integer> operation) {
    for (int i = 0; i < times; i++) {
      operation.accept(i);
    }
  }

  public static void main(String[] args) {
    List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

    // Filter even numbers
    List<Integer> evens = filterList(numbers, n -> n % 2 == 0);
    System.out.println(evens); // Output: [2, 4, 6, 8, 10]

    // Filter numbers greater than 5
    List<Integer> greaterThan5 = filterList(numbers, n -> n > 5);
    System.out.println(greaterThan5); // Output: [6, 7, 8, 9, 10]

    // Map to strings and filter
    List<String> result = mapAndFilter(
      numbers,
      n -> "Number: " + n,
      s -> s.contains("5") || s.contains("1")
    );
    System.out.println(result);
    // Output: [Number: 1, Number: 5, Number: 10]

    // Custom operation
    repeatOperation(5, i -> System.out.println("Iteration: " + i));
    // Output: Iteration: 0, 1, 2, 3, 4
  }
}`
        },
        {
          name: 'Functions as Return Values',
          explanation: 'Functions can return other functions, creating function factories and enabling partial application, currying, and function composition patterns.',
          codeExample: `import java.util.function.*;

public class FunctionsAsReturnValues {
  // Function factory - returns configured function
  public static Predicate<Integer> createRangeChecker(int min, int max) {
    return n -> n >= min && n <= max;
  }

  // Partial application - fix some arguments
  public static Function<Integer, Integer> createMultiplier(int factor) {
    return n -> n * factor;
  }

  // Currying - transform multi-arg function to chain of single-arg functions
  public static Function<Integer, Function<Integer, Integer>> curriedAdd() {
    return a -> b -> a + b;
  }

  // Function that returns conditional function
  public static Function<String, String> createFormatter(boolean uppercase) {
    if (uppercase) {
      return s -> s.toUpperCase();
    } else {
      return s -> s.toLowerCase();
    }
  }

  // Composable validator factory
  public static Predicate<String> createValidator(int minLength, boolean noSpaces) {
    Predicate<String> lengthCheck = s -> s.length() >= minLength;
    Predicate<String> spaceCheck = s -> !s.contains(" ");

    if (noSpaces) {
      return lengthCheck.and(spaceCheck);
    }
    return lengthCheck;
  }

  public static void main(String[] args) {
    // Use function factory
    Predicate<Integer> inRange = createRangeChecker(10, 20);
    System.out.println(inRange.test(15)); // Output: true
    System.out.println(inRange.test(25)); // Output: false

    // Use multiplier factory
    Function<Integer, Integer> triple = createMultiplier(3);
    Function<Integer, Integer> double_ = createMultiplier(2);

    System.out.println(triple.apply(5));  // Output: 15
    System.out.println(double_.apply(5)); // Output: 10

    // Use curried function
    Function<Integer, Function<Integer, Integer>> adder = curriedAdd();
    Function<Integer, Integer> add5 = adder.apply(5);
    Function<Integer, Integer> add10 = adder.apply(10);

    System.out.println(add5.apply(3));  // Output: 8
    System.out.println(add10.apply(3)); // Output: 13

    // Use formatter factory
    Function<String, String> upper = createFormatter(true);
    Function<String, String> lower = createFormatter(false);

    System.out.println(upper.apply("hello")); // Output: HELLO
    System.out.println(lower.apply("WORLD")); // Output: world

    // Use validator factory
    Predicate<String> validator = createValidator(5, true);
    System.out.println(validator.test("hello"));     // Output: true
    System.out.println(validator.test("hi"));        // Output: false
    System.out.println(validator.test("hello world")); // Output: false
  }
}`
        },
        {
          name: 'Built-in HOFs',
          explanation: 'Java provides higher-order functions like map(), filter(), reduce(), forEach() in Stream API. These operate on collections using function parameters.',
          codeExample: `import java.util.*;
import java.util.stream.*;

public class BuiltInHOFs {
  public static void main(String[] args) {
    List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

    // map() - transforms each element
    List<Integer> doubled = numbers.stream()
      .map(n -> n * 2)
      .collect(Collectors.toList());
    System.out.println(doubled); // Output: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

    // filter() - selects elements matching predicate
    List<Integer> evens = numbers.stream()
      .filter(n -> n % 2 == 0)
      .collect(Collectors.toList());
    System.out.println(evens); // Output: [2, 4, 6, 8, 10]

    // reduce() - combines elements to single value
    int sum = numbers.stream()
      .reduce(0, (a, b) -> a + b);
    System.out.println("Sum: " + sum); // Output: Sum: 55

    int product = numbers.stream()
      .reduce(1, (a, b) -> a * b);
    System.out.println("Product: " + product); // Output: Product: 3628800

    // forEach() - performs action on each element
    System.out.print("Squares: ");
    numbers.stream()
           .map(n -> n * n)
           .forEach(n -> System.out.print(n + " "));
    System.out.println(); // Output: Squares: 1 4 9 16 25 36 49 64 81 100

    // anyMatch(), allMatch(), noneMatch()
    boolean hasEven = numbers.stream().anyMatch(n -> n % 2 == 0);
    boolean allPositive = numbers.stream().allMatch(n -> n > 0);
    boolean noneNegative = numbers.stream().noneMatch(n -> n < 0);

    System.out.println("Has even: " + hasEven);        // Output: true
    System.out.println("All positive: " + allPositive); // Output: true
    System.out.println("None negative: " + noneNegative); // Output: true

    // Chaining multiple HOFs
    List<String> result = numbers.stream()
      .filter(n -> n > 3)              // Filter
      .map(n -> n * n)                 // Transform
      .sorted(Comparator.reverseOrder()) // Sort
      .map(n -> "Value: " + n)         // Transform again
      .limit(5)                        // Limit
      .collect(Collectors.toList());

    System.out.println(result);
    // Output: [Value: 100, Value: 81, Value: 64, Value: 49, Value: 36]
  }
}`
        },
        {
          name: 'Custom HOFs',
          explanation: 'Creating custom higher-order functions for domain-specific operations, enabling code reuse and abstraction of common patterns across different data types.',
          codeExample: `import java.util.*;
import java.util.function.*;

public class CustomHOFs {
  // Retry operation with custom logic
  public static <T> T retry(Supplier<T> operation, int maxAttempts) {
    Exception lastException = null;
    for (int i = 0; i < maxAttempts; i++) {
      try {
        return operation.get();
      } catch (Exception e) {
        lastException = e;
        System.out.println("Attempt " + (i + 1) + " failed");
      }
    }
    throw new RuntimeException("All attempts failed", lastException);
  }

  // Execute with timing
  public static <T> T timeExecution(Supplier<T> operation, String label) {
    long start = System.nanoTime();
    T result = operation.get();
    long duration = System.nanoTime() - start;
    System.out.println(label + " took " + duration / 1_000_000 + "ms");
    return result;
  }

  // Apply function until condition met
  public static <T> T applyUntil(T initial, Function<T, T> transformer,
                                   Predicate<T> condition) {
    T current = initial;
    while (!condition.test(current)) {
      current = transformer.apply(current);
    }
    return current;
  }

  // Compose multiple predicates with custom logic
  public static <T> Predicate<T> anyOf(List<Predicate<T>> predicates) {
    return item -> predicates.stream().anyMatch(p -> p.test(item));
  }

  // Map with index
  public static <T, R> List<R> mapWithIndex(List<T> list,
                                             BiFunction<T, Integer, R> mapper) {
    List<R> result = new ArrayList<>();
    for (int i = 0; i < list.size(); i++) {
      result.add(mapper.apply(list.get(i), i));
    }
    return result;
  }

  // Batch process with function
  public static <T, R> List<R> batchProcess(List<T> items, int batchSize,
                                             Function<List<T>, List<R>> processor) {
    List<R> results = new ArrayList<>();
    for (int i = 0; i < items.size(); i += batchSize) {
      int end = Math.min(i + batchSize, items.size());
      List<T> batch = items.subList(i, end);
      results.addAll(processor.apply(batch));
    }
    return results;
  }

  public static void main(String[] args) {
    // Use retry
    int result = retry(() -> {
      double rand = Math.random();
      if (rand < 0.7) throw new RuntimeException("Failed");
      return 42;
    }, 5);
    System.out.println("Result: " + result);

    // Use timing
    List<Integer> numbers = timeExecution(
      () -> Arrays.asList(1, 2, 3, 4, 5),
      "List creation"
    );

    // Use applyUntil
    int value = applyUntil(1, n -> n * 2, n -> n > 100);
    System.out.println("Value: " + value); // Output: 128

    // Use anyOf
    Predicate<Integer> isEvenOrGreaterThan10 = anyOf(Arrays.asList(
      n -> n % 2 == 0,
      n -> n > 10
    ));
    System.out.println(isEvenOrGreaterThan10.test(4));  // Output: true
    System.out.println(isEvenOrGreaterThan10.test(15)); // Output: true
    System.out.println(isEvenOrGreaterThan10.test(7));  // Output: false

    // Use mapWithIndex
    List<String> indexed = mapWithIndex(
      Arrays.asList("a", "b", "c"),
      (item, idx) -> idx + ":" + item
    );
    System.out.println(indexed); // Output: [0:a, 1:b, 2:c]
  }
}`
        },
        {
          name: 'Function Composition',
          explanation: 'Combining simple functions to create complex operations. The compose() and andThen() methods in Function interface enable elegant function chaining.',
          codeExample: `import java.util.function.*;

public class FunctionCompositionHOF {
  public static void main(String[] args) {
    // Basic function composition with andThen
    Function<Integer, Integer> multiplyBy2 = x -> x * 2;
    Function<Integer, Integer> add10 = x -> x + 10;

    Function<Integer, Integer> multiplyThenAdd =
      multiplyBy2.andThen(add10);

    System.out.println(multiplyThenAdd.apply(5)); // Output: 20 (5*2=10, 10+10=20)

    // Composition with compose (reverse order)
    Function<Integer, Integer> addThenMultiply =
      multiplyBy2.compose(add10);

    System.out.println(addThenMultiply.apply(5)); // Output: 30 (5+10=15, 15*2=30)

    // String processing pipeline
    Function<String, String> trim = String::trim;
    Function<String, String> lowercase = String::toLowerCase;
    Function<String, String> removeSpaces = s -> s.replaceAll("\\s+", "");

    Function<String, String> normalize =
      trim.andThen(lowercase).andThen(removeSpaces);

    System.out.println(normalize.apply("  Hello World  "));
    // Output: helloworld

    // Chaining multiple transformations
    Function<Integer, Integer> square = x -> x * x;
    Function<Integer, Integer> increment = x -> x + 1;
    Function<Integer, Integer> negate = x -> -x;

    Function<Integer, Integer> complex =
      square.andThen(increment).andThen(negate);

    System.out.println(complex.apply(3)); // Output: -10 (3²=9, 9+1=10, -10)

    // Predicate composition
    Predicate<Integer> isPositive = n -> n > 0;
    Predicate<Integer> isEven = n -> n % 2 == 0;

    Predicate<Integer> isPositiveEven = isPositive.and(isEven);
    Predicate<Integer> isPositiveOrEven = isPositive.or(isEven);
    Predicate<Integer> isNotPositive = isPositive.negate();

    System.out.println(isPositiveEven.test(4));  // Output: true
    System.out.println(isPositiveEven.test(-4)); // Output: false
    System.out.println(isPositiveOrEven.test(-4)); // Output: true
  }
}`
        }
      ],
      metrics: { reusability: 'Very High', abstraction: 'High', complexity: 'Medium', power: 'High' },
      description: 'Functions that take other functions as parameters or return functions, enabling powerful abstraction and code reuse patterns.'
    },
    {
      id: 'immutability', x: 80, y: 440, width: 350, height: 160,
      icon: '🔒', title: 'Immutability', color: 'red',
      details: [
        {
          name: 'Immutable Objects',
          explanation: 'Objects whose state cannot be changed after creation. All fields are final, no setter methods, and any "modification" returns a new object instance.',
          codeExample: `import java.util.*;

// Immutable class example
public final class ImmutablePerson {
  private final String name;
  private final int age;
  private final List<String> hobbies;

  public ImmutablePerson(String name, int age, List<String> hobbies) {
    this.name = name;
    this.age = age;
    // Defensive copy of mutable parameter
    this.hobbies = new ArrayList<>(hobbies);
  }

  public String getName() { return name; }
  public int getAge() { return age; }

  // Return defensive copy to prevent external modification
  public List<String> getHobbies() {
    return new ArrayList<>(hobbies);
  }

  // Methods return new instances instead of modifying
  public ImmutablePerson withName(String newName) {
    return new ImmutablePerson(newName, this.age, this.hobbies);
  }

  public ImmutablePerson withAge(int newAge) {
    return new ImmutablePerson(this.name, newAge, this.hobbies);
  }

  public ImmutablePerson addHobby(String hobby) {
    List<String> newHobbies = new ArrayList<>(this.hobbies);
    newHobbies.add(hobby);
    return new ImmutablePerson(this.name, this.age, newHobbies);
  }

  @Override
  public String toString() {
    return "Person{name='" + name + "', age=" + age +
           ", hobbies=" + hobbies + "}";
  }

  public static void main(String[] args) {
    List<String> hobbies = Arrays.asList("Reading", "Coding");
    ImmutablePerson person = new ImmutablePerson("Alice", 30, hobbies);

    System.out.println(person);
    // Output: Person{name='Alice', age=30, hobbies=[Reading, Coding]}

    // Create modified versions
    ImmutablePerson older = person.withAge(31);
    ImmutablePerson withHobby = person.addHobby("Gaming");

    System.out.println(person);     // Original unchanged
    System.out.println(older);      // New instance with different age
    System.out.println(withHobby);  // New instance with additional hobby
  }
}`
        },
        {
          name: 'Defensive Copying',
          explanation: 'Creating copies of mutable objects when returning them from methods or storing them as fields, preventing external modification of internal state.',
          codeExample: `import java.util.*;

public class DefensiveCopying {
  private final Date creationDate;
  private final List<String> items;

  public DefensiveCopying(Date date, List<String> items) {
    // Defensive copy on input
    this.creationDate = new Date(date.getTime());
    this.items = new ArrayList<>(items);
  }

  // Defensive copy on output
  public Date getCreationDate() {
    return new Date(creationDate.getTime());
  }

  // Defensive copy on output
  public List<String> getItems() {
    return new ArrayList<>(items);
  }

  // Unmodifiable view (lighter than copying)
  public List<String> getItemsUnmodifiable() {
    return Collections.unmodifiableList(items);
  }

  public static void main(String[] args) {
    // Create original data
    Date date = new Date();
    List<String> originalItems = new ArrayList<>(Arrays.asList("A", "B", "C"));

    DefensiveCopying obj = new DefensiveCopying(date, originalItems);

    // Try to modify original data
    originalItems.add("D");
    date.setTime(0);

    // Internal state is protected
    System.out.println("Items: " + obj.getItems());
    // Output: Items: [A, B, C] (D not added)

    System.out.println("Date: " + obj.getCreationDate());
    // Output: Original date (not modified)

    // Try to modify returned data
    List<String> retrieved = obj.getItems();
    retrieved.add("E");

    // Internal state still protected
    System.out.println("Items after external modification: " + obj.getItems());
    // Output: Items after external modification: [A, B, C] (E not added)

    // Unmodifiable view throws exception on modification
    try {
      List<String> unmodifiable = obj.getItemsUnmodifiable();
      unmodifiable.add("F"); // Throws UnsupportedOperationException
    } catch (UnsupportedOperationException e) {
      System.out.println("Cannot modify unmodifiable view");
    }
  }
}`
        },
        {
          name: 'Builder Pattern',
          explanation: 'Creating immutable objects with many fields using builder pattern. Builders are mutable during construction but produce immutable objects.',
          codeExample: `public class BuilderPattern {
  // Immutable class
  public static final class User {
    private final String username;
    private final String email;
    private final int age;
    private final String address;
    private final String phone;

    private User(Builder builder) {
      this.username = builder.username;
      this.email = builder.email;
      this.age = builder.age;
      this.address = builder.address;
      this.phone = builder.phone;
    }

    // Getters only - no setters
    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public int getAge() { return age; }
    public String getAddress() { return address; }
    public String getPhone() { return phone; }

    @Override
    public String toString() {
      return "User{username='" + username + "', email='" + email +
             "', age=" + age + ", address='" + address +
             "', phone='" + phone + "'}";
    }

    // Static builder class
    public static class Builder {
      private String username;
      private String email;
      private int age;
      private String address;
      private String phone;

      public Builder username(String username) {
        this.username = username;
        return this;
      }

      public Builder email(String email) {
        this.email = email;
        return this;
      }

      public Builder age(int age) {
        this.age = age;
        return this;
      }

      public Builder address(String address) {
        this.address = address;
        return this;
      }

      public Builder phone(String phone) {
        this.phone = phone;
        return this;
      }

      public User build() {
        // Validation before building
        if (username == null || email == null) {
          throw new IllegalStateException("Username and email required");
        }
        return new User(this);
      }
    }
  }

  public static void main(String[] args) {
    // Build immutable object with fluent API
    User user = new User.Builder()
        .username("john_doe")
        .email("john@example.com")
        .age(30)
        .address("123 Main St")
        .phone("555-1234")
        .build();

    System.out.println(user);

    // Can omit optional fields
    User simpleUser = new User.Builder()
        .username("jane_doe")
        .email("jane@example.com")
        .build();

    System.out.println(simpleUser);
    // Output: User{username='jane_doe', email='jane@example.com',
    //              age=0, address='null', phone='null'}
  }
}`
        },
        {
          name: 'Collections.unmodifiable',
          explanation: 'Creating read-only views of collections that throw exceptions on modification attempts. Useful for exposing internal collections safely.',
          codeExample: `import java.util.*;

public class UnmodifiableCollections {
  private final List<String> items;
  private final Map<String, Integer> scores;
  private final Set<String> tags;

  public UnmodifiableCollections() {
    this.items = new ArrayList<>(Arrays.asList("A", "B", "C"));
    this.scores = new HashMap<>();
    scores.put("Alice", 100);
    scores.put("Bob", 85);
    this.tags = new HashSet<>(Arrays.asList("tag1", "tag2"));
  }

  // Return unmodifiable views
  public List<String> getItems() {
    return Collections.unmodifiableList(items);
  }

  public Map<String, Integer> getScores() {
    return Collections.unmodifiableMap(scores);
  }

  public Set<String> getTags() {
    return Collections.unmodifiableSet(tags);
  }

  public static void main(String[] args) {
    UnmodifiableCollections obj = new UnmodifiableCollections();

    // Get unmodifiable views
    List<String> items = obj.getItems();
    Map<String, Integer> scores = obj.getScores();
    Set<String> tags = obj.getTags();

    // Can read from collections
    System.out.println("Items: " + items);
    System.out.println("Scores: " + scores);
    System.out.println("Tags: " + tags);

    // Attempts to modify throw UnsupportedOperationException
    try {
      items.add("D");
    } catch (UnsupportedOperationException e) {
      System.out.println("Cannot add to unmodifiable list");
    }

    try {
      scores.put("Charlie", 90);
    } catch (UnsupportedOperationException e) {
      System.out.println("Cannot put to unmodifiable map");
    }

    try {
      tags.remove("tag1");
    } catch (UnsupportedOperationException e) {
      System.out.println("Cannot remove from unmodifiable set");
    }

    // Java 9+ factory methods create unmodifiable collections
    List<String> immutableList = List.of("X", "Y", "Z");
    Map<String, Integer> immutableMap = Map.of("key1", 1, "key2", 2);
    Set<String> immutableSet = Set.of("a", "b", "c");

    System.out.println(immutableList);
    System.out.println(immutableMap);
    System.out.println(immutableSet);

    // These also throw exceptions on modification attempts
    try {
      immutableList.add("W");
    } catch (UnsupportedOperationException e) {
      System.out.println("Cannot modify List.of() result");
    }
  }
}`
        },
        {
          name: 'Record Classes',
          explanation: 'Java 14+ records provide concise syntax for immutable data classes with automatic equals(), hashCode(), toString() and accessor methods.',
          codeExample: `import java.util.*;

// Java 14+ Record - immutable by default
record Point(int x, int y) {
  // Custom constructor with validation
  public Point {
    if (x < 0 || y < 0) {
      throw new IllegalArgumentException("Coordinates must be non-negative");
    }
  }

  // Custom methods
  public Point translate(int dx, int dy) {
    return new Point(x + dx, y + dy);
  }

  public double distanceFrom(Point other) {
    int dx = this.x - other.x;
    int dy = this.y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

// Record with multiple fields
record Person(String name, int age, List<String> hobbies) {
  // Canonical constructor with defensive copy
  public Person(String name, int age, List<String> hobbies) {
    this.name = name;
    this.age = age;
    this.hobbies = List.copyOf(hobbies); // Immutable copy
  }

  // Factory method
  public static Person createAdult(String name, List<String> hobbies) {
    return new Person(name, 18, hobbies);
  }
}

// Using records
public class RecordExample {
  public static void main(String[] args) {
    // Create records
    Point p1 = new Point(10, 20);
    Point p2 = new Point(30, 40);

    // Automatic accessors (no get prefix)
    System.out.println("x: " + p1.x() + ", y: " + p1.y());
    // Output: x: 10, y: 20

    // Automatic toString()
    System.out.println(p1); // Output: Point[x=10, y=20]

    // Automatic equals() and hashCode()
    Point p3 = new Point(10, 20);
    System.out.println(p1.equals(p3)); // Output: true

    // Custom methods
    Point p4 = p1.translate(5, 5);
    System.out.println(p4); // Output: Point[x=15, y=25]

    double distance = p1.distanceFrom(p2);
    System.out.println("Distance: " + distance);
    // Output: Distance: 28.284271247461902

    // Person record
    Person person = new Person(
      "Alice",
      30,
      Arrays.asList("Reading", "Coding")
    );

    System.out.println(person);
    // Output: Person[name=Alice, age=30, hobbies=[Reading, Coding]]

    // Records work well with pattern matching (Java 16+)
    if (person instanceof Person p) {
      System.out.println("Name: " + p.name() + ", Age: " + p.age());
    }

    // Hobbies list is immutable
    try {
      person.hobbies().add("Gaming");
    } catch (UnsupportedOperationException e) {
      System.out.println("Cannot modify record's immutable list");
    }
  }
}`
        }
      ],
      metrics: { safety: 'Very High', concurrency: 'Thread-safe', bugs: 'Reduced', memory: 'Efficient' },
      description: 'Creating objects that cannot be modified after construction, eliminating many classes of bugs and enabling safe concurrent programming.'
    },
    {
      id: 'stream-api', x: 1080, y: 240, width: 350, height: 160,
      icon: '🌊', title: 'Stream API', color: 'orange',
      details: [
        {
          name: 'Declarative Processing',
          explanation: 'Streams express what to do rather than how to do it. Focus on the desired outcome rather than step-by-step iteration logic.',
          codeExample: `import java.util.*;
import java.util.stream.*;

public class DeclarativeProcessing {
  public static void main(String[] args) {
    List<String> names = Arrays.asList(
      "Alice", "Bob", "Charlie", "David", "Eve", "Frank"
    );

    // Imperative approach - how to do it
    List<String> result1 = new ArrayList<>();
    for (String name : names) {
      if (name.length() > 3) {
        String upper = name.toUpperCase();
        result1.add(upper);
      }
    }
    System.out.println("Imperative: " + result1);

    // Declarative approach - what to do
    List<String> result2 = names.stream()
      .filter(name -> name.length() > 3)
      .map(String::toUpperCase)
      .collect(Collectors.toList());
    System.out.println("Declarative: " + result2);
    // Output: [ALICE, CHARLIE, DAVID, FRANK]

    // Complex declarative pipeline
    List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

    int sumOfEvenSquares = numbers.stream()
      .filter(n -> n % 2 == 0)
      .map(n -> n * n)
      .reduce(0, Integer::sum);

    System.out.println("Sum of even squares: " + sumOfEvenSquares);
    // Output: 220 (4 + 16 + 36 + 64 + 100)

    // Find first matching element
    Optional<String> firstLongName = names.stream()
      .filter(name -> name.length() > 5)
      .findFirst();

    firstLongName.ifPresent(name ->
      System.out.println("First long name: " + name)
    );
    // Output: First long name: Charlie

    // Count matching elements
    long count = names.stream()
      .filter(name -> name.startsWith("A") || name.startsWith("E"))
      .count();

    System.out.println("Names starting with A or E: " + count);
    // Output: 2
  }
}`
        },
        {
          name: 'Lazy Evaluation',
          explanation: 'Intermediate operations are not executed until a terminal operation is called. This enables optimization and prevents unnecessary computation.',
          codeExample: `import java.util.*;
import java.util.stream.*;

public class LazyEvaluation {
  public static void main(String[] args) {
    List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8);

    System.out.println("Creating stream with intermediate operations...");

    Stream<Integer> stream = numbers.stream()
      .filter(n -> {
        System.out.println("Filter: " + n);
        return n % 2 == 0;
      })
      .map(n -> {
        System.out.println("Map: " + n);
        return n * n;
      });

    System.out.println("Stream created, but nothing executed yet!");
    System.out.println("Now calling terminal operation...");

    List<Integer> result = stream.collect(Collectors.toList());
    System.out.println("Result: " + result);
    // Output shows filtering and mapping happen together, lazily

    System.out.println("\\n--- Lazy evaluation with findFirst ---");

    // Only processes until first match found
    Optional<Integer> first = numbers.stream()
      .peek(n -> System.out.println("Processing: " + n))
      .filter(n -> n > 3)
      .findFirst();

    System.out.println("First match: " + first.get());
    // Only processes 1, 2, 3, 4 - stops after finding 4

    System.out.println("\\n--- Short-circuiting operations ---");

    // anyMatch stops as soon as condition is met
    boolean hasEven = numbers.stream()
      .peek(n -> System.out.println("Checking: " + n))
      .anyMatch(n -> n % 2 == 0);

    System.out.println("Has even: " + hasEven);
    // Stops after finding first even number (2)

    System.out.println("\\n--- Limit operation ---");

    // limit() short-circuits the stream
    List<Integer> firstThree = numbers.stream()
      .peek(n -> System.out.println("Peek: " + n))
      .limit(3)
      .collect(Collectors.toList());

    System.out.println("First three: " + firstThree);
    // Only processes first 3 elements
  }
}`
        },
        {
          name: 'Pipeline Operations',
          explanation: 'Chain multiple operations like filter(), map(), sorted(), distinct() to create processing pipelines. Each operation returns a new stream.',
          codeExample: `import java.util.*;
import java.util.stream.*;

public class StreamPipelines {
  static class Product {
    String name;
    String category;
    double price;

    Product(String name, String category, double price) {
      this.name = name;
      this.category = category;
      this.price = price;
    }

    @Override
    public String toString() {
      return name + " ($" + price + ")";
    }
  }

  public static void main(String[] args) {
    List<Product> products = Arrays.asList(
      new Product("Laptop", "Electronics", 999.99),
      new Product("Mouse", "Electronics", 29.99),
      new Product("Keyboard", "Electronics", 79.99),
      new Product("Desk", "Furniture", 299.99),
      new Product("Chair", "Furniture", 199.99),
      new Product("Monitor", "Electronics", 399.99)
    );

    // Complex pipeline: filter, map, sort, limit
    List<String> topElectronics = products.stream()
      .filter(p -> p.category.equals("Electronics"))
      .sorted((p1, p2) -> Double.compare(p2.price, p1.price))
      .limit(3)
      .map(p -> p.name + ": $" + p.price)
      .collect(Collectors.toList());

    System.out.println("Top 3 Electronics:");
    topElectronics.forEach(System.out::println);

    // Multiple transformations
    List<Integer> numbers = Arrays.asList(1, 2, 2, 3, 3, 3, 4, 5, 5);

    List<Integer> processed = numbers.stream()
      .distinct()                    // Remove duplicates
      .filter(n -> n > 2)           // Filter
      .map(n -> n * 2)              // Transform
      .sorted(Comparator.reverseOrder()) // Sort
      .collect(Collectors.toList());

    System.out.println("\\nProcessed numbers: " + processed);
    // Output: [10, 8, 6]

    // Statistical pipeline
    DoubleSummaryStatistics stats = products.stream()
      .filter(p -> p.category.equals("Electronics"))
      .mapToDouble(p -> p.price)
      .summaryStatistics();

    System.out.println("\\nElectronics Statistics:");
    System.out.println("Count: " + stats.getCount());
    System.out.println("Sum: $" + stats.getSum());
    System.out.println("Average: $" + stats.getAverage());
    System.out.println("Min: $" + stats.getMin());
    System.out.println("Max: $" + stats.getMax());

    // Grouping pipeline
    Map<String, List<Product>> byCategory = products.stream()
      .collect(Collectors.groupingBy(p -> p.category));

    System.out.println("\\nProducts by category:");
    byCategory.forEach((category, prods) ->
      System.out.println(category + ": " + prods)
    );
  }
}`
        },
        {
          name: 'Parallel Processing',
          explanation: 'Convert sequential streams to parallel streams with parallelStream() or parallel() for automatic multi-core utilization without manual thread management.',
          codeExample: `import java.util.*;
import java.util.stream.*;

public class ParallelStreams {
  public static void main(String[] args) {
    List<Integer> numbers = IntStream.rangeClosed(1, 1000)
      .boxed()
      .collect(Collectors.toList());

    // Sequential stream
    long startSeq = System.nanoTime();
    long sumSeq = numbers.stream()
      .filter(n -> n % 2 == 0)
      .mapToLong(n -> n * n)
      .sum();
    long timeSeq = System.nanoTime() - startSeq;

    System.out.println("Sequential sum: " + sumSeq);
    System.out.println("Sequential time: " + timeSeq / 1_000_000 + "ms");

    // Parallel stream
    long startPar = System.nanoTime();
    long sumPar = numbers.parallelStream()
      .filter(n -> n % 2 == 0)
      .mapToLong(n -> n * n)
      .sum();
    long timePar = System.nanoTime() - startPar;

    System.out.println("\\nParallel sum: " + sumPar);
    System.out.println("Parallel time: " + timePar / 1_000_000 + "ms");

    // Demonstrating parallel execution
    System.out.println("\\nParallel execution threads:");
    List<String> items = Arrays.asList("A", "B", "C", "D", "E");

    items.parallelStream()
         .map(item -> {
           System.out.println(item + " processed by " +
             Thread.currentThread().getName());
           return item.toLowerCase();
         })
         .collect(Collectors.toList());

    // Converting between sequential and parallel
    long count = numbers.stream()
      .parallel()        // Convert to parallel
      .filter(n -> n > 100)
      .sequential()      // Convert back to sequential
      .limit(10)         // limit() works better sequentially
      .count();

    System.out.println("\\nCount: " + count);

    // Parallel reduction
    int sum = numbers.parallelStream()
      .reduce(0,
        (a, b) -> a + b,           // Accumulator
        (a, b) -> a + b);          // Combiner for parallel

    System.out.println("Parallel reduction sum: " + sum);

    // When NOT to use parallel streams:
    // 1. Small datasets (overhead > benefit)
    // 2. Operations with side effects
    // 3. Order-dependent operations
    List<Integer> small = Arrays.asList(1, 2, 3, 4, 5);
    small.stream().forEach(System.out::print); // Sequential
    System.out.println();
    small.parallelStream().forEach(System.out::print); // Unordered
    System.out.println();
  }
}`
        },
        {
          name: 'Collectors',
          explanation: 'Terminal operations that accumulate stream elements into collections, strings, or custom data structures using Collectors utility class methods.',
          codeExample: `import java.util.*;
import java.util.stream.*;

public class CollectorsExamples {
  static class Person {
    String name;
    int age;
    String city;

    Person(String name, int age, String city) {
      this.name = name;
      this.age = age;
      this.city = city;
    }

    @Override
    public String toString() {
      return name + "(" + age + ")";
    }
  }

  public static void main(String[] args) {
    List<Person> people = Arrays.asList(
      new Person("Alice", 30, "NYC"),
      new Person("Bob", 25, "LA"),
      new Person("Charlie", 35, "NYC"),
      new Person("David", 28, "LA"),
      new Person("Eve", 32, "NYC")
    );

    // toList, toSet
    List<String> names = people.stream()
      .map(p -> p.name)
      .collect(Collectors.toList());
    System.out.println("Names: " + names);

    Set<String> cities = people.stream()
      .map(p -> p.city)
      .collect(Collectors.toSet());
    System.out.println("Cities: " + cities);

    // joining
    String nameList = people.stream()
      .map(p -> p.name)
      .collect(Collectors.joining(", ", "[", "]"));
    System.out.println("Name list: " + nameList);

    // counting
    long count = people.stream()
      .filter(p -> p.age > 30)
      .collect(Collectors.counting());
    System.out.println("People over 30: " + count);

    // summingInt, averagingInt
    int totalAge = people.stream()
      .collect(Collectors.summingInt(p -> p.age));
    System.out.println("Total age: " + totalAge);

    double avgAge = people.stream()
      .collect(Collectors.averagingInt(p -> p.age));
    System.out.println("Average age: " + avgAge);

    // groupingBy
    Map<String, List<Person>> byCity = people.stream()
      .collect(Collectors.groupingBy(p -> p.city));
    System.out.println("\\nGrouped by city:");
    byCity.forEach((city, ppl) ->
      System.out.println(city + ": " + ppl)
    );

    // groupingBy with downstream collector
    Map<String, Long> countByCity = people.stream()
      .collect(Collectors.groupingBy(
        p -> p.city,
        Collectors.counting()
      ));
    System.out.println("\\nCount by city: " + countByCity);

    // partitioningBy
    Map<Boolean, List<Person>> partitioned = people.stream()
      .collect(Collectors.partitioningBy(p -> p.age >= 30));
    System.out.println("\\nPartitioned by age >= 30:");
    System.out.println("Adults: " + partitioned.get(true));
    System.out.println("Young: " + partitioned.get(false));

    // toMap
    Map<String, Integer> nameToAge = people.stream()
      .collect(Collectors.toMap(
        p -> p.name,
        p -> p.age
      ));
    System.out.println("\\nName to age: " + nameToAge);

    // Custom collector
    String custom = people.stream()
      .collect(Collectors.collectingAndThen(
        Collectors.toList(),
        list -> "Total: " + list.size() + " people"
      ));
    System.out.println("\\n" + custom);
  }
}`
        }
      ],
      metrics: { performance: 'High', readability: 'Excellent', parallelism: 'Built-in', operations: '40+' },
      description: 'Functional-style operations on collections enabling declarative data processing with built-in parallelization support.'
    },
    {
      id: 'function-composition', x: 1080, y: 440, width: 350, height: 160,
      icon: '🔗', title: 'Function Composition', color: 'teal',
      details: [
        {
          name: 'compose() Method',
          explanation: 'Creates new function by composing two functions where f.compose(g) means f(g(x)). Right-to-left composition following mathematical notation.',
          codeExample: `import java.util.function.*;

public class ComposeMethod {
  public static void main(String[] args) {
    // f(g(x)) - mathematical composition
    Function<Integer, Integer> multiplyBy2 = x -> x * 2;
    Function<Integer, Integer> add3 = x -> x + 3;

    // compose: executes g first, then f
    // f.compose(g) means f(g(x))
    Function<Integer, Integer> composedFunc =
      multiplyBy2.compose(add3);

    System.out.println(composedFunc.apply(5));
    // Output: 16 (first add 3 -> 8, then multiply by 2 -> 16)

    // More examples
    Function<String, String> trim = String::trim;
    Function<String, String> uppercase = String::toUpperCase;
    Function<String, Integer> length = String::length;

    // trim(uppercase(x))
    Function<String, String> trimAfterUpper =
      trim.compose(uppercase);

    System.out.println(trimAfterUpper.apply("  hello  "));
    // Output: HELLO (uppercase first, then trim)

    // length(trim(x))
    Function<String, Integer> lengthAfterTrim =
      length.compose(trim);

    System.out.println(lengthAfterTrim.apply("  hello  "));
    // Output: 5 (trim first, then length)

    // Complex composition chain
    Function<Integer, Integer> square = x -> x * x;
    Function<Integer, Integer> increment = x -> x + 1;
    Function<Integer, Integer> negate = x -> -x;

    // negate(square(increment(x)))
    Function<Integer, Integer> complex =
      negate.compose(square).compose(increment);

    System.out.println(complex.apply(3));
    // Output: -16 (3+1=4, 4²=16, -16)

    // Real-world example: data validation pipeline
    Function<String, String> removeSpaces = s -> s.replaceAll("\\s", "");
    Function<String, String> toLowerCase = String::toLowerCase;
    Function<String, Boolean> isValid = s -> s.length() >= 5;

    Predicate<String> validator = s ->
      isValid.compose(removeSpaces).compose(toLowerCase).apply(s);

    System.out.println(validator.test("  Hello World  "));
    // Output: true
  }
}`
        },
        {
          name: 'andThen() Method',
          explanation: 'Creates new function by chaining functions where f.andThen(g) means g(f(x)). Left-to-right composition, more intuitive for pipeline-style operations.',
          codeExample: `import java.util.function.*;

public class AndThenMethod {
  public static void main(String[] args) {
    // g(f(x)) - pipeline composition
    Function<Integer, Integer> multiplyBy2 = x -> x * 2;
    Function<Integer, Integer> add3 = x -> x + 3;

    // andThen: executes f first, then g
    // f.andThen(g) means g(f(x))
    Function<Integer, Integer> pipeline =
      multiplyBy2.andThen(add3);

    System.out.println(pipeline.apply(5));
    // Output: 13 (first multiply by 2 -> 10, then add 3 -> 13)

    // String processing pipeline
    Function<String, String> removeSpaces = s -> s.replaceAll("\\s", "");
    Function<String, String> toLowerCase = String::toLowerCase;
    Function<String, String> reverse = s -> new StringBuilder(s).reverse().toString();

    Function<String, String> processString =
      removeSpaces
        .andThen(toLowerCase)
        .andThen(reverse);

    System.out.println(processString.apply("  Hello World  "));
    // Output: dlrowolleh

    // Consumer composition with andThen
    Consumer<String> printUpperCase = s -> System.out.println(s.toUpperCase());
    Consumer<String> printLength = s -> System.out.println("Length: " + s.length());
    Consumer<String> printReverse = s ->
      System.out.println("Reversed: " + new StringBuilder(s).reverse());

    Consumer<String> allPrints =
      printUpperCase
        .andThen(printLength)
        .andThen(printReverse);

    System.out.println("\\nProcessing 'Java':");
    allPrints.accept("Java");
    // Output: JAVA, Length: 4, Reversed: avaJ

    // Predicate composition with and/or
    Predicate<Integer> isPositive = n -> n > 0;
    Predicate<Integer> isEven = n -> n % 2 == 0;
    Predicate<Integer> isLessThan100 = n -> n < 100;

    Predicate<Integer> complexPredicate =
      isPositive
        .and(isEven)
        .and(isLessThan100);

    System.out.println("\\nTesting 42: " + complexPredicate.test(42));
    // Output: true
    System.out.println("Testing -4: " + complexPredicate.test(-4));
    // Output: false

    // BiFunction to Function conversion
    BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;
    Function<Integer, Integer> add5 =
      b -> add.apply(5, b);

    Function<Integer, Integer> add5ThenDouble =
      add5.andThen(x -> x * 2);

    System.out.println("\\n5 + 3, then double: " + add5ThenDouble.apply(3));
    // Output: 16
  }
}`
        },
        {
          name: 'Chain Building',
          explanation: 'Building complex operations by combining simple, focused functions. Each function has single responsibility, making code modular and testable.',
          codeExample: `import java.util.function.*;
import java.util.*;

public class ChainBuilding {
  // Simple, focused transformation functions
  static Function<String, String> trim = String::trim;
  static Function<String, String> toLowerCase = String::toLowerCase;
  static Function<String, String> removeSpecialChars =
    s -> s.replaceAll("[^a-zA-Z0-9]", "");
  static Function<String, String> capitalizeFirst = s ->
    s.isEmpty() ? s : Character.toUpperCase(s.charAt(0)) + s.substring(1);

  // Validation functions
  static Predicate<String> notEmpty = s -> !s.isEmpty();
  static Predicate<String> minLength = s -> s.length() >= 3;
  static Predicate<String> maxLength = s -> s.length() <= 20;

  // Build complex operations from simple ones
  public static Function<String, String> buildNormalizer() {
    return trim
      .andThen(toLowerCase)
      .andThen(removeSpecialChars);
  }

  public static Function<String, String> buildFormatter() {
    return buildNormalizer()
      .andThen(capitalizeFirst);
  }

  public static Predicate<String> buildValidator() {
    return notEmpty
      .and(minLength)
      .and(maxLength);
  }

  // Number processing chain
  static class NumberProcessor {
    private Function<Integer, Integer> pipeline = Function.identity();

    public NumberProcessor add(int value) {
      pipeline = pipeline.andThen(n -> n + value);
      return this;
    }

    public NumberProcessor multiply(int value) {
      pipeline = pipeline.andThen(n -> n * value);
      return this;
    }

    public NumberProcessor square() {
      pipeline = pipeline.andThen(n -> n * n);
      return this;
    }

    public NumberProcessor negate() {
      pipeline = pipeline.andThen(n -> -n);
      return this;
    }

    public int process(int input) {
      return pipeline.apply(input);
    }
  }

  public static void main(String[] args) {
    // Use string processing chains
    Function<String, String> normalizer = buildNormalizer();
    Function<String, String> formatter = buildFormatter();

    String input = "  Hello, World! 123  ";
    System.out.println("Normalized: " + normalizer.apply(input));
    // Output: helloworld123
    System.out.println("Formatted: " + formatter.apply(input));
    // Output: Helloworld123

    // Use validation chain
    Predicate<String> validator = buildValidator();
    System.out.println("Valid 'test': " + validator.test("test"));
    // Output: true
    System.out.println("Valid 'ab': " + validator.test("ab"));
    // Output: false

    // Use fluent number processor
    int result = new NumberProcessor()
      .add(5)
      .multiply(2)
      .square()
      .negate()
      .process(3);

    System.out.println("Result: " + result);
    // Output: -256 ((3+5)*2 = 16, 16² = 256, -256)

    // Complex data transformation chain
    List<String> names = Arrays.asList(
      "  alice  ", "BOB", "Charlie!", "dave123"
    );

    Function<List<String>, List<String>> processNames =
      list -> list.stream()
        .map(buildFormatter())
        .filter(buildValidator())
        .collect(java.util.stream.Collectors.toList());

    System.out.println("Processed names: " + processNames.apply(names));
    // Output: [Alice, Bob, Charlie, Dave123]
  }
}`
        },
        {
          name: 'Monadic Composition',
          explanation: 'Advanced composition patterns using Optional, CompletableFuture, and custom monads for handling null values, asynchronous operations, and error handling.',
          codeExample: `import java.util.*;
import java.util.concurrent.*;
import java.util.function.*;

public class MonadicComposition {
  // Optional monad - handling null values
  public static Optional<String> getUserName(int id) {
    return id > 0 ? Optional.of("User" + id) : Optional.empty();
  }

  public static Optional<String> getEmail(String userName) {
    return userName != null ?
      Optional.of(userName.toLowerCase() + "@example.com") :
      Optional.empty();
  }

  // CompletableFuture monad - async operations
  public static CompletableFuture<Integer> fetchUserId(String name) {
    return CompletableFuture.supplyAsync(() -> {
      try { Thread.sleep(100); } catch (InterruptedException e) {}
      return name.hashCode() % 1000;
    });
  }

  public static CompletableFuture<String> fetchUserData(int id) {
    return CompletableFuture.supplyAsync(() -> {
      try { Thread.sleep(100); } catch (InterruptedException e) {}
      return "Data for user " + id;
    });
  }

  public static void main(String[] args) {
    // Optional composition with flatMap
    Optional<String> result = getUserName(5)
      .flatMap(MonadicComposition::getEmail)
      .map(String::toUpperCase);

    result.ifPresent(System.out::println);
    // Output: USER5@EXAMPLE.COM

    // Handling empty Optional
    Optional<String> empty = getUserName(-1)
      .flatMap(MonadicComposition::getEmail)
      .map(String::toUpperCase);

    System.out.println("Empty result: " +
      empty.orElse("No user found"));
    // Output: No user found

    // CompletableFuture composition
    CompletableFuture<String> asyncResult = fetchUserId("Alice")
      .thenCompose(MonadicComposition::fetchUserData)
      .thenApply(String::toUpperCase)
      .exceptionally(ex -> "Error: " + ex.getMessage());

    try {
      System.out.println("Async result: " + asyncResult.get());
    } catch (Exception e) {
      e.printStackTrace();
    }

    // Combining multiple CompletableFutures
    CompletableFuture<Integer> future1 =
      CompletableFuture.supplyAsync(() -> 10);
    CompletableFuture<Integer> future2 =
      CompletableFuture.supplyAsync(() -> 20);
    CompletableFuture<Integer> future3 =
      CompletableFuture.supplyAsync(() -> 30);

    CompletableFuture<Integer> combined = future1
      .thenCombine(future2, (a, b) -> a + b)
      .thenCombine(future3, (ab, c) -> ab + c);

    try {
      System.out.println("Combined: " + combined.get());
      // Output: 60
    } catch (Exception e) {
      e.printStackTrace();
    }

    // Custom Result monad for error handling
    class Result<T> {
      private final T value;
      private final String error;

      private Result(T value, String error) {
        this.value = value;
        this.error = error;
      }

      public static <T> Result<T> success(T value) {
        return new Result<>(value, null);
      }

      public static <T> Result<T> failure(String error) {
        return new Result<>(null, error);
      }

      public <R> Result<R> map(Function<T, R> mapper) {
        return error != null ?
          Result.failure(error) :
          Result.success(mapper.apply(value));
      }

      public <R> Result<R> flatMap(Function<T, Result<R>> mapper) {
        return error != null ?
          Result.failure(error) :
          mapper.apply(value);
      }

      public T orElse(T defaultValue) {
        return error != null ? defaultValue : value;
      }
    }

    // Using Result monad
    Result<Integer> divResult = Result.success(10)
      .flatMap(n -> n != 0 ?
        Result.success(100 / n) :
        Result.failure("Division by zero"))
      .map(n -> n * 2);

    System.out.println("Division result: " + divResult.orElse(-1));
    // Output: 20
  }
}`
        },
        {
          name: 'Pipeline Patterns',
          explanation: 'Creating data transformation pipelines where output of one function becomes input of next. Common in data processing and business logic implementation.',
          codeExample: `import java.util.*;
import java.util.function.*;
import java.util.stream.*;

public class PipelinePatterns {
  // Data transformation pipeline
  static class DataPipeline<T> {
    private final T data;

    private DataPipeline(T data) {
      this.data = data;
    }

    public static <T> DataPipeline<T> of(T data) {
      return new DataPipeline<>(data);
    }

    public <R> DataPipeline<R> transform(Function<T, R> transformer) {
      return new DataPipeline<>(transformer.apply(data));
    }

    public DataPipeline<T> filter(Predicate<T> predicate) {
      if (!predicate.test(data)) {
        throw new IllegalStateException("Filter condition not met");
      }
      return this;
    }

    public T get() {
      return data;
    }
  }

  // Business logic pipeline
  static class Order {
    String id;
    double amount;
    String status;

    Order(String id, double amount, String status) {
      this.id = id;
      this.amount = amount;
      this.status = status;
    }

    @Override
    public String toString() {
      return "Order{" + id + ", $" + amount + ", " + status + "}";
    }
  }

  static Function<Order, Order> validateOrder = order -> {
    if (order.amount <= 0) {
      throw new IllegalArgumentException("Invalid amount");
    }
    return order;
  };

  static Function<Order, Order> applyDiscount = order -> {
    if (order.amount > 100) {
      order.amount *= 0.9; // 10% discount
    }
    return order;
  };

  static Function<Order, Order> calculateTax = order -> {
    order.amount *= 1.1; // 10% tax
    return order;
  };

  static Function<Order, Order> processPayment = order -> {
    order.status = "PAID";
    return order;
  };

  public static void main(String[] args) {
    // Simple data pipeline
    String result = DataPipeline.of("  hello world  ")
      .transform(String::trim)
      .transform(String::toUpperCase)
      .transform(s -> s.replaceAll(" ", "-"))
      .get();

    System.out.println("Pipeline result: " + result);
    // Output: HELLO-WORLD

    // Number processing pipeline
    Integer numResult = DataPipeline.of(5)
      .transform(n -> n + 10)
      .transform(n -> n * 2)
      .filter(n -> n > 20)
      .transform(n -> n - 5)
      .get();

    System.out.println("Number result: " + numResult);
    // Output: 25

    // Order processing pipeline
    Order order = new Order("ORD001", 150.0, "PENDING");

    Function<Order, Order> orderPipeline =
      validateOrder
        .andThen(applyDiscount)
        .andThen(calculateTax)
        .andThen(processPayment);

    Order processed = orderPipeline.apply(order);
    System.out.println("Processed order: " + processed);
    // Output: Order{ORD001, $148.5, PAID}

    // Stream pipeline for batch processing
    List<Order> orders = Arrays.asList(
      new Order("ORD001", 150.0, "PENDING"),
      new Order("ORD002", 80.0, "PENDING"),
      new Order("ORD003", 200.0, "PENDING")
    );

    List<Order> processedOrders = orders.stream()
      .map(validateOrder)
      .map(applyDiscount)
      .map(calculateTax)
      .map(processPayment)
      .collect(Collectors.toList());

    System.out.println("\\nBatch processed:");
    processedOrders.forEach(System.out::println);

    // ETL Pipeline (Extract, Transform, Load)
    Function<String, String[]> extract = csv -> csv.split(",");
    Function<String[], Map<String, String>> transform = parts ->
      Map.of("name", parts[0], "value", parts[1]);
    Consumer<Map<String, String>> load = map ->
      System.out.println("Loaded: " + map);

    String csv = "John,100";
    Map<String, String> etlResult = extract
      .andThen(transform)
      .apply(csv);
    load.accept(etlResult);
  }
}`
        }
      ],
      metrics: { modularity: 'Very High', reusability: 'High', complexity: 'Manageable', maintainability: 'Excellent' },
      description: 'Combining simple functions to create complex operations, enabling modular and reusable code architecture.'
    },
    {
      id: 'reactive-programming', x: 680, y: 540, width: 350, height: 160,
      icon: '⚡', title: 'Reactive Programming', color: 'indigo',
      details: [
        {
          name: 'Asynchronous Streams',
          explanation: 'Processing data streams asynchronously using reactive libraries like RxJava or Spring WebFlux. Handles events as they occur without blocking threads.',
          codeExample: `import java.util.concurrent.*;
import java.util.*;
import java.util.stream.*;

public class AsyncStreams {
  // Simple reactive stream implementation
  static class DataStream<T> {
    private final List<T> data;

    public DataStream(List<T> data) {
      this.data = data;
    }

    public CompletableFuture<List<T>> processAsync() {
      return CompletableFuture.supplyAsync(() -> {
        System.out.println("Processing on: " +
          Thread.currentThread().getName());
        return data;
      });
    }

    public <R> DataStream<R> mapAsync(java.util.function.Function<T, R> mapper) {
      List<R> mapped = data.stream()
        .map(mapper)
        .collect(Collectors.toList());
      return new DataStream<>(mapped);
    }
  }

  public static void main(String[] args) throws Exception {
    // Create async data stream
    DataStream<Integer> stream = new DataStream<>(
      Arrays.asList(1, 2, 3, 4, 5)
    );

    // Process asynchronously
    CompletableFuture<List<Integer>> future = stream
      .mapAsync(n -> n * 2)
      .mapAsync(n -> n + 1)
      .processAsync();

    System.out.println("Main thread continues...");

    List<Integer> result = future.get();
    System.out.println("Result: " + result);
    // Output: [3, 5, 7, 9, 11]

    // Multiple async operations
    CompletableFuture<String> async1 = CompletableFuture.supplyAsync(() -> {
      try { Thread.sleep(1000); } catch (InterruptedException e) {}
      return "Result1";
    });

    CompletableFuture<String> async2 = CompletableFuture.supplyAsync(() -> {
      try { Thread.sleep(500); } catch (InterruptedException e) {}
      return "Result2";
    });

    CompletableFuture<String> async3 = CompletableFuture.supplyAsync(() -> {
      try { Thread.sleep(300); } catch (InterruptedException e) {}
      return "Result3";
    });

    // Wait for all to complete
    CompletableFuture<Void> all =
      CompletableFuture.allOf(async1, async2, async3);

    all.thenRun(() -> {
      try {
        System.out.println("All complete:");
        System.out.println(async1.get());
        System.out.println(async2.get());
        System.out.println(async3.get());
      } catch (Exception e) {
        e.printStackTrace();
      }
    }).get();

    // Race - get first to complete
    CompletableFuture<Object> fastest =
      CompletableFuture.anyOf(async1, async2, async3);

    System.out.println("Fastest: " + fastest.get());
  }
}`
        },
        {
          name: 'Observer Pattern',
          explanation: 'Publishers emit data items to subscribers who react to emissions. Supports backpressure handling when consumers cannot keep up with producers.',
          codeExample: `import java.util.*;
import java.util.function.*;

public class ObserverPattern {
  // Simple Observable implementation
  static class Observable<T> {
    private final List<Consumer<T>> subscribers = new ArrayList<>();

    public void subscribe(Consumer<T> subscriber) {
      subscribers.add(subscriber);
    }

    public void emit(T value) {
      for (Consumer<T> subscriber : subscribers) {
        subscriber.accept(value);
      }
    }

    public <R> Observable<R> map(Function<T, R> mapper) {
      Observable<R> mapped = new Observable<>();
      this.subscribe(value -> mapped.emit(mapper.apply(value)));
      return mapped;
    }

    public Observable<T> filter(java.util.function.Predicate<T> predicate) {
      Observable<T> filtered = new Observable<>();
      this.subscribe(value -> {
        if (predicate.test(value)) {
          filtered.emit(value);
        }
      });
      return filtered;
    }
  }

  // Event emitter with backpressure
  static class EventStream<T> {
    private final Queue<T> buffer = new LinkedList<>();
    private final int maxBufferSize;
    private Consumer<T> subscriber;

    public EventStream(int maxBufferSize) {
      this.maxBufferSize = maxBufferSize;
    }

    public void subscribe(Consumer<T> subscriber) {
      this.subscriber = subscriber;
      // Process buffered events
      while (!buffer.isEmpty()) {
        subscriber.accept(buffer.poll());
      }
    }

    public void emit(T value) {
      if (subscriber != null) {
        subscriber.accept(value);
      } else {
        // Buffer if no subscriber (backpressure)
        if (buffer.size() < maxBufferSize) {
          buffer.add(value);
        } else {
          System.out.println("Buffer full, dropping event: " + value);
        }
      }
    }
  }

  public static void main(String[] args) {
    // Simple observable
    Observable<Integer> numbers = new Observable<>();

    // Subscribe multiple observers
    numbers.subscribe(n -> System.out.println("Observer1: " + n));
    numbers.subscribe(n -> System.out.println("Observer2: " + (n * 2)));

    // Emit events
    numbers.emit(1);
    numbers.emit(2);
    numbers.emit(3);

    System.out.println("\\n--- Transformed Observable ---");

    // Create transformed observable
    Observable<Integer> source = new Observable<>();
    Observable<String> transformed = source
      .filter(n -> n % 2 == 0)
      .map(n -> "Value: " + (n * n));

    transformed.subscribe(System.out::println);

    source.emit(1); // Filtered out
    source.emit(2); // Output: Value: 4
    source.emit(3); // Filtered out
    source.emit(4); // Output: Value: 16

    System.out.println("\\n--- Backpressure Example ---");

    // Event stream with backpressure
    EventStream<String> stream = new EventStream<>(3);

    // Emit before subscribing (buffered)
    stream.emit("Event1");
    stream.emit("Event2");
    stream.emit("Event3");
    stream.emit("Event4"); // Buffer full, might drop

    // Subscribe and process buffered events
    stream.subscribe(event ->
      System.out.println("Processed: " + event)
    );

    // Emit after subscribing (immediate)
    stream.emit("Event5");
  }
}`
        },
        {
          name: 'Non-blocking I/O',
          explanation: 'Reactive programming enables non-blocking operations for I/O intensive tasks, improving application scalability and resource utilization.',
          codeExample: `import java.util.concurrent.*;
import java.util.*;
import java.util.function.*;

public class NonBlockingIO {
  // Simulate non-blocking I/O operations
  static class AsyncIO {
    private final ExecutorService executor =
      Executors.newFixedThreadPool(4);

    public CompletableFuture<String> readFileAsync(String filename) {
      return CompletableFuture.supplyAsync(() -> {
        System.out.println("Reading " + filename + " on " +
          Thread.currentThread().getName());
        try {
          Thread.sleep(1000); // Simulate I/O
        } catch (InterruptedException e) {}
        return "Content of " + filename;
      }, executor);
    }

    public CompletableFuture<Void> writeFileAsync(
        String filename, String content) {
      return CompletableFuture.runAsync(() -> {
        System.out.println("Writing " + filename + " on " +
          Thread.currentThread().getName());
        try {
          Thread.sleep(500); // Simulate I/O
        } catch (InterruptedException e) {}
        System.out.println("Wrote: " + content);
      }, executor);
    }

    public CompletableFuture<String> fetchDataAsync(String url) {
      return CompletableFuture.supplyAsync(() -> {
        System.out.println("Fetching " + url + " on " +
          Thread.currentThread().getName());
        try {
          Thread.sleep(800); // Simulate network I/O
        } catch (InterruptedException e) {}
        return "Data from " + url;
      }, executor);
    }

    public void shutdown() {
      executor.shutdown();
    }
  }

  public static void main(String[] args) throws Exception {
    AsyncIO io = new AsyncIO();

    System.out.println("Starting async operations...");
    long startTime = System.currentTimeMillis();

    // Blocking approach (sequential)
    System.out.println("\\n=== Blocking Approach ===");
    long blockStart = System.currentTimeMillis();

    // Would block for 1000ms + 1000ms + 1000ms = 3000ms total
    System.out.println("Would take ~3 seconds sequentially");

    // Non-blocking approach (parallel)
    System.out.println("\\n=== Non-blocking Approach ===");
    long asyncStart = System.currentTimeMillis();

    CompletableFuture<String> file1 = io.readFileAsync("file1.txt");
    CompletableFuture<String> file2 = io.readFileAsync("file2.txt");
    CompletableFuture<String> file3 = io.readFileAsync("file3.txt");

    // Combine results without blocking
    CompletableFuture<String> combined = file1
      .thenCombine(file2, (f1, f2) -> f1 + "\\n" + f2)
      .thenCombine(file3, (f12, f3) -> f12 + "\\n" + f3);

    // Process result when ready
    combined.thenAccept(result -> {
      long duration = System.currentTimeMillis() - asyncStart;
      System.out.println("\\nCombined result:");
      System.out.println(result);
      System.out.println("Async time: " + duration + "ms");
    });

    // Continue doing other work while I/O happens
    System.out.println("Main thread continues while I/O happens...");

    // Chain multiple async operations
    System.out.println("\\n=== Chained Async Operations ===");

    io.fetchDataAsync("http://api1.com")
      .thenCompose(data1 ->
        io.fetchDataAsync("http://api2.com")
           .thenApply(data2 -> data1 + "\\n" + data2)
      )
      .thenCompose(combinedData ->
        io.writeFileAsync("output.txt", combinedData)
           .thenApply(v -> combinedData)
      )
      .thenAccept(finalData ->
        System.out.println("\\nFinal result:\\n" + finalData)
      )
      .get(); // Wait for completion

    // Parallel I/O operations
    System.out.println("\\n=== Parallel I/O ===");

    List<String> urls = Arrays.asList(
      "http://api1.com",
      "http://api2.com",
      "http://api3.com",
      "http://api4.com"
    );

    List<CompletableFuture<String>> futures = urls.stream()
      .map(io::fetchDataAsync)
      .collect(java.util.stream.Collectors.toList());

    CompletableFuture<Void> allDone =
      CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]));

    allDone.thenRun(() -> {
      System.out.println("\\nAll parallel I/O complete:");
      futures.forEach(f -> {
        try {
          System.out.println(f.get());
        } catch (Exception e) {}
      });
    }).get();

    long totalTime = System.currentTimeMillis() - startTime;
    System.out.println("\\nTotal execution time: " + totalTime + "ms");

    io.shutdown();
  }
}`
        },
        {
          name: 'CompletableFuture',
          explanation: 'Java 8+ asynchronous programming support with CompletableFuture for composing asynchronous operations and handling results functionally.',
          codeExample: `import java.util.concurrent.*;
import java.util.*;

public class CompletableFutureExamples {
  public static void main(String[] args) throws Exception {
    // Basic async computation
    CompletableFuture<String> future =
      CompletableFuture.supplyAsync(() -> {
        try { Thread.sleep(1000); } catch (InterruptedException e) {}
        return "Hello";
      });

    System.out.println("Waiting for result...");
    System.out.println("Result: " + future.get());

    // Chaining with thenApply
    CompletableFuture<Integer> chain =
      CompletableFuture.supplyAsync(() -> 5)
        .thenApply(n -> n * 2)
        .thenApply(n -> n + 3)
        .thenApply(n -> n * n);

    System.out.println("Chain result: " + chain.get());
    // Output: 169 ((5*2+3)²)

    // thenCompose for nested async operations
    CompletableFuture<String> composed =
      CompletableFuture.supplyAsync(() -> "User123")
        .thenCompose(userId ->
          CompletableFuture.supplyAsync(() ->
            "Data for " + userId
          )
        );

    System.out.println("Composed: " + composed.get());

    // Combining multiple futures
    CompletableFuture<Integer> future1 =
      CompletableFuture.supplyAsync(() -> 10);
    CompletableFuture<Integer> future2 =
      CompletableFuture.supplyAsync(() -> 20);

    CompletableFuture<Integer> combined = future1.thenCombine(
      future2,
      (a, b) -> a + b
    );

    System.out.println("Combined: " + combined.get());
    // Output: 30

    // Error handling with exceptionally
    CompletableFuture<Integer> withError =
      CompletableFuture.supplyAsync(() -> {
        if (Math.random() > 0.5) {
          throw new RuntimeException("Random error");
        }
        return 42;
      }).exceptionally(ex -> {
        System.out.println("Caught: " + ex.getMessage());
        return -1;
      });

    System.out.println("With error handling: " + withError.get());

    // handle() for both success and error
    CompletableFuture<String> handled =
      CompletableFuture.supplyAsync(() -> {
        if (Math.random() > 0.5) {
          throw new RuntimeException("Failed");
        }
        return "Success";
      }).handle((result, ex) -> {
        if (ex != null) {
          return "Recovered from: " + ex.getMessage();
        }
        return result;
      });

    System.out.println("Handled: " + handled.get());

    // allOf() - wait for multiple futures
    CompletableFuture<String> f1 =
      CompletableFuture.supplyAsync(() -> "A");
    CompletableFuture<String> f2 =
      CompletableFuture.supplyAsync(() -> "B");
    CompletableFuture<String> f3 =
      CompletableFuture.supplyAsync(() -> "C");

    CompletableFuture<Void> all =
      CompletableFuture.allOf(f1, f2, f3);

    all.thenRun(() -> {
      try {
        System.out.println("All done: " +
          f1.get() + f2.get() + f3.get());
      } catch (Exception e) {}
    }).get();

    // anyOf() - complete when first completes
    CompletableFuture<Object> fastest =
      CompletableFuture.anyOf(
        CompletableFuture.supplyAsync(() -> {
          try { Thread.sleep(300); } catch (InterruptedException e) {}
          return "Slow";
        }),
        CompletableFuture.supplyAsync(() -> {
          try { Thread.sleep(100); } catch (InterruptedException e) {}
          return "Fast";
        })
      );

    System.out.println("Fastest: " + fastest.get());

    // Timeout handling (Java 9+)
    try {
      CompletableFuture<String> withTimeout =
        CompletableFuture.supplyAsync(() -> {
          try { Thread.sleep(5000); } catch (InterruptedException e) {}
          return "Done";
        }).orTimeout(2, TimeUnit.SECONDS);

      System.out.println(withTimeout.get());
    } catch (TimeoutException e) {
      System.out.println("Timed out!");
    } catch (Exception e) {
      System.out.println("Error: " + e.getCause());
    }
  }
}`
        },
        {
          name: 'Functional Composition',
          explanation: 'Combining reactive operators like map, filter, flatMap, merge to create complex asynchronous data processing pipelines with declarative code.',
          codeExample: `import java.util.concurrent.*;
import java.util.*;
import java.util.stream.*;

public class ReactiveFunctionalComposition {
  // Reactive pipeline builder
  static class AsyncPipeline<T> {
    private CompletableFuture<T> future;

    public AsyncPipeline(CompletableFuture<T> future) {
      this.future = future;
    }

    public static <T> AsyncPipeline<T> of(T value) {
      return new AsyncPipeline<>(CompletableFuture.completedFuture(value));
    }

    public static <T> AsyncPipeline<T> async(java.util.function.Supplier<T> supplier) {
      return new AsyncPipeline<>(CompletableFuture.supplyAsync(supplier));
    }

    public <R> AsyncPipeline<R> map(java.util.function.Function<T, R> mapper) {
      return new AsyncPipeline<>(future.thenApply(mapper));
    }

    public <R> AsyncPipeline<R> flatMap(
        java.util.function.Function<T, AsyncPipeline<R>> mapper) {
      return new AsyncPipeline<>(
        future.thenCompose(value -> mapper.apply(value).future)
      );
    }

    public AsyncPipeline<T> filter(java.util.function.Predicate<T> predicate) {
      return new AsyncPipeline<>(future.thenApply(value -> {
        if (predicate.test(value)) {
          return value;
        }
        throw new IllegalStateException("Filter failed");
      }));
    }

    public AsyncPipeline<T> onError(java.util.function.Function<Throwable, T> handler) {
      return new AsyncPipeline<>(future.exceptionally(handler));
    }

    public T get() throws Exception {
      return future.get();
    }
  }

  public static void main(String[] args) throws Exception {
    // Simple async pipeline
    String result = AsyncPipeline.of("hello")
      .map(String::toUpperCase)
      .map(s -> s + " WORLD")
      .map(s -> s + "!")
      .get();

    System.out.println("Pipeline result: " + result);
    // Output: HELLO WORLD!

    // Async computations in pipeline
    Integer asyncResult = AsyncPipeline.async(() -> {
      try { Thread.sleep(500); } catch (InterruptedException e) {}
      return 5;
    })
    .map(n -> n * 2)
    .map(n -> n + 10)
    .map(n -> n * n)
    .get();

    System.out.println("Async result: " + asyncResult);
    // Output: 400 ((5*2+10)²)

    // FlatMap for nested async operations
    String flatMapResult = AsyncPipeline.async(() -> "user123")
      .flatMap(userId ->
        AsyncPipeline.async(() -> {
          try { Thread.sleep(300); } catch (InterruptedException e) {}
          return "profile_" + userId;
        })
      )
      .flatMap(profile ->
        AsyncPipeline.async(() -> {
          try { Thread.sleep(200); } catch (InterruptedException e) {}
          return "data_for_" + profile;
        })
      )
      .map(String::toUpperCase)
      .get();

    System.out.println("FlatMap result: " + flatMapResult);

    // Error handling in pipeline
    Integer errorResult = AsyncPipeline.async(() -> {
      if (Math.random() > 0.5) {
        throw new RuntimeException("Random error");
      }
      return 100;
    })
    .map(n -> n / 2)
    .onError(ex -> {
      System.out.println("Error caught: " + ex.getMessage());
      return -1;
    })
    .map(n -> n * 2)
    .get();

    System.out.println("Error handled result: " + errorResult);

    // Complex reactive composition
    System.out.println("\\n=== Complex Composition ===");

    List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

    // Process each number asynchronously
    List<CompletableFuture<String>> futures = numbers.stream()
      .map(n -> AsyncPipeline.async(() -> {
        try { Thread.sleep(100); } catch (InterruptedException e) {}
        return n;
      })
      .map(num -> num * num)
      .map(square -> "Square: " + square)
      .future)
      .collect(Collectors.toList());

    // Wait for all and collect results
    CompletableFuture<Void> all =
      CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]));

    all.thenRun(() -> {
      System.out.println("All async operations complete:");
      futures.forEach(f -> {
        try {
          System.out.println(f.get());
        } catch (Exception e) {}
      });
    }).get();

    // Merge multiple async streams
    AsyncPipeline<Integer> stream1 = AsyncPipeline.async(() -> 10);
    AsyncPipeline<Integer> stream2 = AsyncPipeline.async(() -> 20);
    AsyncPipeline<Integer> stream3 = AsyncPipeline.async(() -> 30);

    Integer merged = stream1.future
      .thenCombine(stream2.future, (a, b) -> a + b)
      .thenCombine(stream3.future, (ab, c) -> ab + c)
      .get();

    System.out.println("\\nMerged result: " + merged);
    // Output: 60
  }
}`
        }
      ],
      metrics: { scalability: 'Very High', responsiveness: 'Excellent', throughput: 'High', complexity: 'High' },
      description: 'Programming paradigm focused on asynchronous data streams and propagation of change, enabling highly responsive applications.'
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
      maxWidth: '2000px',
      margin: '120px auto 0',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
      border: '3px solid rgba(59, 130, 246, 0.4)'
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
          ⚡ Functional Programming
        </h1>
        <div style={{ width: '120px' }}></div>
      </div>

      <div style={{
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
        padding: '1.5rem',
        borderRadius: '12px',
        border: '2px solid rgba(59, 130, 246, 0.2)',
        marginBottom: '2rem'
      }}>
        <p style={{
          fontSize: '1.1rem',
          color: '#374151',
          fontWeight: '500',
          margin: 0,
          lineHeight: '1.6',
          textAlign: 'center'
        }}>
          Programming paradigm that treats computation as evaluation of mathematical functions.
          Emphasizes immutability, pure functions, and declarative programming style for building
          robust, maintainable, and concurrent applications.
        </p>
      </div>

      <ModernDiagram
        components={components}
        onComponentClick={handleComponentClick}
        title="Functional Programming Concepts & Patterns"
        width={1400}
        height={800}
        containerWidth={1800}
      
        focusedIndex={focusedComponentIndex}
      />

      <div style={{
        marginTop: '3rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '1.5rem'
      }}>
        <div style={{
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '2px solid rgba(34, 197, 94, 0.3)'
        }}>
          <h3 style={{
            color: '#166534',
            fontSize: '1.25rem',
            fontWeight: '700',
            marginBottom: '1rem'
          }}>
            🎯 Core Principles
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '0.5rem',
            fontSize: '0.9rem'
          }}>
            <div>• <strong>Immutability:</strong> Data cannot be changed</div>
            <div>• <strong>Pure Functions:</strong> No side effects</div>
            <div>• <strong>Higher-Order Functions:</strong> Functions as values</div>
            <div>• <strong>Declarative Style:</strong> What, not how</div>
            <div>• <strong>Function Composition:</strong> Building complexity</div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '2px solid rgba(59, 130, 246, 0.3)'
        }}>
          <h3 style={{
            color: '#1e40af',
            fontSize: '1.25rem',
            fontWeight: '700',
            marginBottom: '1rem'
          }}>
            🔧 Java Features
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '0.5rem',
            fontSize: '0.9rem'
          }}>
            <div>• Lambda Expressions (Java 8+)</div>
            <div>• Stream API & Collectors</div>
            <div>• Method References</div>
            <div>• Optional Class</div>
            <div>• CompletableFuture</div>
            <div>• Functional Interfaces</div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '2px solid rgba(139, 92, 246, 0.3)'
        }}>
          <h3 style={{
            color: '#7c3aed',
            fontSize: '1.25rem',
            fontWeight: '700',
            marginBottom: '1rem'
          }}>
            🌐 Benefits
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '0.5rem',
            fontSize: '0.9rem'
          }}>
            <div>• Reduced Bugs & Side Effects</div>
            <div>• Enhanced Testability</div>
            <div>• Better Parallelization</div>
            <div>• Improved Code Reusability</div>
            <div>• Cleaner, More Readable Code</div>
            <div>• Easier Reasoning & Debugging</div>
          </div>
        </div>
      </div>

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
            maxWidth: '1200px',
            width: '95%',
            maxHeight: '85vh',
            overflowY: 'auto',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            border: '3px solid rgba(59, 130, 246, 0.4)'
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
              backgroundColor: 'rgba(59, 130, 246, 0.05)',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '2px solid rgba(59, 130, 246, 0.2)',
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
                  Key Concepts
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
                          ? 'rgba(59, 130, 246, 0.15)'
                          : 'rgba(34, 197, 94, 0.1)',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        border: selectedConcept?.name === detail.name
                          ? '2px solid rgba(59, 130, 246, 0.4)'
                          : '2px solid rgba(34, 197, 94, 0.2)',
                        fontSize: '0.95rem',
                        fontWeight: '500',
                        color: selectedConcept?.name === detail.name
                          ? '#1e40af'
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
                    backgroundColor: 'rgba(59, 130, 246, 0.05)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '2px solid rgba(59, 130, 246, 0.2)',
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
                      backgroundColor: '#1e1e1e',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      border: '2px solid #374151',
                      marginBottom: '1.5rem',
                      maxHeight: '500px',
                      overflowY: 'auto'
                    }}>
                      <h4 style={{
                        fontSize: '1rem',
                        fontWeight: '700',
                        color: '#60a5fa',
                        margin: '0 0 1rem 0'
                      }}>
                        Code Example
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
                      Mastering {selectedConcept.name.toLowerCase()} is crucial for writing clean, maintainable functional code and leveraging the full power of modern Java development.
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

export default FunctionalProgramming
