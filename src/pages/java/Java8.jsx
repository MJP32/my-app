import { useState, useEffect, useRef } from 'react'
import { KEYS, AriaUtils } from '../../utils/keyboardNavigation.js'

// Normalize indentation by removing common leading whitespace
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
  const normalizedCode = normalizeIndentation(code)

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
      .replace(/\b(public|private|protected|static|final|class|interface|extends|implements|new|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|import|package|void|abstract|synchronized|volatile|transient|native|strictfp|super|this|null|sealed|permits|non-sealed|record|instanceof|var|default)\b/g, '<span style="color: #c586c0;">$1</span>')

      // Boolean and primitives - blue
      .replace(/\b(true|false|int|double|float|long|short|byte|char|boolean)\b/g, '<span style="color: #569cd6;">$1</span>')

      // Types and classes - light green
      .replace(/\b(String|List|ArrayList|LinkedList|HashMap|TreeMap|HashSet|TreeSet|Map|Set|Queue|Deque|Collection|Arrays|Collections|Thread|Runnable|Executor|ExecutorService|CompletableFuture|Stream|Optional|Path|Files|Pattern|Matcher|StringBuilder|StringBuffer|Integer|Double|Float|Long|Short|Byte|Character|Boolean|Object|System|Math|Scanner|BufferedReader|FileReader|FileWriter|PrintWriter|InputStream|OutputStream|Exception|RuntimeException|IOException|SQLException|WeakReference|SoftReference|PhantomReference|ReferenceQueue|Function|Consumer|Supplier|Predicate|Comparator)\b/g, '<span style="color: #4ec9b0;">$1</span>')

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
      <code dangerouslySetInnerHTML={{ __html: highlightJava(normalizedCode) }} />
    </pre>
  )
}

function Java8({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory }) {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedConcept, setSelectedConcept] = useState(null)
  const [expandedSections, setExpandedSections] = useState({})
  const [focusedCategoryIndex, setFocusedCategoryIndex] = useState(0)
  const [focusedConceptIndex, setFocusedConceptIndex] = useState(0)
  const [isKeyboardUser, setIsKeyboardUser] = useState(false)

  // Refs for keyboard navigation
  const backButtonRef = useRef(null)
  const categoryRefs = useRef([])
  const conceptRefs = useRef([])

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

    // Combine small sections
    const meaningfulSections = []
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i]
      const codeLines = section.code.trim().split('\n').filter(line => {
        const trimmed = line.trim()
        return trimmed && !trimmed.startsWith('//') && trimmed !== ''
      })

      if (codeLines.length < 3 && i < sections.length - 1) {
        // Combine with next section
        sections[i + 1].title = `${section.title} & ${sections[i + 1].title}`
        sections[i + 1].code = `${section.code}\n\n${sections[i + 1].code}`
      } else {
        meaningfulSections.push(section)
      }
    }

    return meaningfulSections
  }

  const handleConceptClick = (concept) => {
    setSelectedConcept(concept)
  }

  // Detect keyboard usage
  useEffect(() => {
    const handleKeyDown = () => setIsKeyboardUser(true);
    const handleMouseDown = () => setIsKeyboardUser(false);

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  // Hierarchical keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't handle if typing in input fields
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      // Don't handle if the event is coming from a button click
      if (e.target.tagName === 'BUTTON' && (e.key === KEYS.ENTER || e.key === KEYS.SPACE)) {
        return;
      }

      // Back button shortcut
      if ((e.key === 'b' || e.key === 'B') && backButtonRef.current) {
        e.preventDefault();
        backButtonRef.current.focus();
        return;
      }

      // Escape navigation
      if (e.key === KEYS.ESCAPE) {
        e.preventDefault();
        // Close modal entirely - both concept and category
        if (selectedConcept || selectedCategory) {
          setSelectedConcept(null);
          setSelectedCategory(null);
          AriaUtils.announce('Returned to categories');
        } else {
          onBack();
        }
        return;
      }

      // Navigation based on current view
      if (!selectedCategory && !selectedConcept) {
        // Category navigation
        if (e.key === KEYS.ARROW_DOWN) {
          e.preventDefault();
          setFocusedCategoryIndex(prev => Math.min(prev + 1, categories.length - 1));
        } else if (e.key === KEYS.ARROW_UP) {
          e.preventDefault();
          setFocusedCategoryIndex(prev => Math.max(prev - 1, 0));
        } else if (e.key === KEYS.ENTER || e.key === KEYS.SPACE) {
          e.preventDefault();
          const selectedCat = categories[focusedCategoryIndex];
          setSelectedCategory(selectedCat);
          setFocusedConceptIndex(0); // Reset concept focus
          AriaUtils.announce(`${selectedCat.name} selected, ${selectedCat.conceptIds.length} concepts available`);
        }
      } else if (selectedCategory && !selectedConcept) {
        // Concept navigation within category
        const availableConcepts = selectedCategory.conceptIds.map(id => concepts[id]);
        if (e.key === KEYS.ARROW_DOWN) {
          e.preventDefault();
          setFocusedConceptIndex(prev => Math.min(prev + 1, availableConcepts.length - 1));
        } else if (e.key === KEYS.ARROW_UP) {
          e.preventDefault();
          setFocusedConceptIndex(prev => Math.max(prev - 1, 0));
        } else if (e.key === KEYS.ENTER || e.key === KEYS.SPACE) {
          e.preventDefault();
          const selectedConceptData = availableConcepts[focusedConceptIndex];
          setSelectedConcept(selectedConceptData);
          AriaUtils.announce(`${selectedConceptData.name} concept opened`);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedCategory, selectedConcept, focusedCategoryIndex, focusedConceptIndex, onBack]);

  // Handle programmatic focus when keyboard navigation changes focus
  useEffect(() => {
    if (isKeyboardUser) {
      if (!selectedCategory && !selectedConcept) {
        // Focus on category
        const categoryElement = categoryRefs.current[focusedCategoryIndex];
        if (categoryElement) {
          categoryElement.focus();
        }
      } else if (selectedCategory && !selectedConcept) {
        // Focus on concept
        const conceptElement = conceptRefs.current[focusedConceptIndex];
        if (conceptElement) {
          conceptElement.focus();
        }
      }
    }
  }, [focusedCategoryIndex, focusedConceptIndex, selectedCategory, selectedConcept, isKeyboardUser]);

  const categories = [
    {
      id: 'lambda',
      name: 'Lambda Expressions',
      icon: '🔹',
      color: '#8b5cf6',
      description: 'Functional programming with lambda expressions, method references, and closures',
      conceptIds: [0, 1, 2, 3, 4]
    },
    {
      id: 'streams',
      name: 'Stream API',
      icon: '🌊',
      color: '#3b82f6',
      description: 'Powerful stream operations for collection processing and data manipulation',
      conceptIds: [5, 6, 7, 8, 9, 10, 11, 12, 13]
    },
    {
      id: 'optional',
      name: 'Optional',
      icon: '🎯',
      color: '#10b981',
      description: 'Null-safe programming with Optional class',
      conceptIds: [14, 15, 16, 17, 18]
    },
    {
      id: 'datetime',
      name: 'Date/Time API',
      icon: '🕐',
      color: '#f59e0b',
      description: 'Modern date and time handling with java.time package',
      conceptIds: [19, 20, 21, 22]
    },
    {
      id: 'default-methods',
      name: 'Default Methods',
      icon: '🔧',
      color: '#ec4899',
      description: 'Interface evolution with default and static methods',
      conceptIds: [23, 24, 25]
    },
    {
      id: 'completablefuture',
      name: 'CompletableFuture',
      icon: '⚡',
      color: '#ef4444',
      description: 'Asynchronous programming and non-blocking operations',
      conceptIds: [26, 27, 28, 29]
    },
    {
      id: 'nashorn',
      name: 'Nashorn JavaScript',
      icon: '🔶',
      color: '#f97316',
      description: 'JavaScript engine integration (deprecated in Java 11+)',
      conceptIds: [30, 31, 32, 33]
    },
    {
      id: 'jvm',
      name: 'JVM Improvements',
      icon: '⚙️',
      color: '#6366f1',
      description: 'Performance enhancements and memory improvements',
      conceptIds: [34, 35]
    }
  ]

  const concepts = [
    {
      name: 'Syntax & Structure',
      icon: '🔹',
      explanation: `**Core Concept:**
• Concise way to represent anonymous functions introduced in Java 8
• Enables functional programming style in Java
• Significantly reduces boilerplate code compared to anonymous classes
• Treats functions as first-class citizens

**Lambda Syntax:**
• Basic - (parameters) -> expression
• Multiple statements - (parameters) -> { statements; return value; }
• Zero parameters - () -> expression
• Single parameter - parameter -> expression (parentheses optional)
• Type inference - Compiler infers parameter types automatically

**Key Benefits:**
• Readable Code - Eliminates verbose anonymous class syntax
• Maintainability - Less code means fewer bugs
• Functional Style - Enables declarative programming patterns
• Method References - Can be simplified further using :: operator

**Use Cases:**
• Event handlers and callbacks
• Collection processing with streams
• Asynchronous task execution
• Custom sorting and filtering
• Anywhere functional interfaces are used`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Syntax & Structure - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Before Java 8 - Anonymous class
Runnable r1 = new Runnable() {
@Override
public void run() {
System.out.println("Hello World");
}
};

// Java 8 - Lambda expression
Runnable r2 = () -> System.out.println("Hello World");

// Lambda with parameters
Comparator<String> comp = (s1, s2) -> s1.compareTo(s2);

// Lambda with multiple statements
BiFunction<Integer, Integer, Integer> add = (a, b) -> {
int sum = a + b;
return sum;
};

// Output:
// Hello World`
    },
    {
      name: 'Functional Interfaces',
      icon: '🔹',
      explanation: `**Core Concept:**
• Interfaces with exactly one abstract method (Single Abstract Method - SAM)
• Target type for lambda expressions and method references
• @FunctionalInterface annotation prevents accidental addition of abstract methods
• Can have multiple default and static methods

**Built-in Functional Interfaces:**
• Predicate<T> - Tests a condition, returns boolean
• Function<T,R> - Transforms input T to output R
• Consumer<T> - Accepts input, no return value
• Supplier<T> - Provides value, no input
• BiFunction<T,U,R> - Takes two inputs, returns result
• UnaryOperator<T> - Special Function where input and output are same type
• BinaryOperator<T> - Takes two same-type inputs, returns same type

**Key Features:**
• Type Safety - Compile-time checking ensures lambda matches interface
• Composability - Many have default methods for chaining (andThen, compose)
• Primitive Specializations - IntPredicate, LongConsumer, etc. to avoid boxing
• Versatility - Covers most common functional programming patterns

**Common Patterns:**
• Predicate - Filtering and validation
• Function - Mapping and transformation
• Consumer - Side effects and output operations
• Supplier - Lazy evaluation and factory methods`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Functional Interfaces - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Predicate - boolean test
Predicate<String> isEmpty = s -> s.isEmpty();
boolean result = isEmpty.test("");
// Result: true

// Function - transform input to output
Function<String, Integer> length = s -> s.length();
int len = length.apply("Hello");
// Result: 5

// Consumer - accept input, no return
Consumer<String> print = s -> System.out.println(s);
print.accept("Hello");
// Output:
// Hello

// Supplier - provide value, no input
Supplier<Double> random = () -> Math.random();
double value = random.get();
// Result: random double value between 0.0 and 1.0

// Custom functional interface
@FunctionalInterface
interface Calculator {
int calculate(int a, int b);
}
Calculator add = (a, b) -> a + b;
// Result: add.calculate(5, 3) returns 8`
    },
    {
      name: 'Method References',
      icon: '🔹',
      explanation: `**Core Concept:**
• Shorthand notation for lambdas that simply call an existing method
• Makes code more concise and readable when lambda just delegates to a method
• Uses the :: operator (double colon)
• Compiler infers parameter types and return values

**Four Types of Method References:**
• Static Method - Class::staticMethod
• Instance Method of Specific Object - instance::instanceMethod
• Instance Method of Arbitrary Object - Class::instanceMethod
• Constructor Reference - Class::new

**Syntax Comparison:**
• Lambda: s -> System.out.println(s)
• Method Reference: System.out::println
• Lambda: x -> Integer.parseInt(x)
• Method Reference: Integer::parseInt

**Benefits:**
• Conciseness - Shorter than equivalent lambda expressions
• Readability - Intent is clearer when method name is descriptive
• Reusability - Promotes using existing methods instead of duplicating logic
• Maintainability - Changes to referenced method automatically propagate

**Common Use Cases:**
• Collection processing with existing methods
• Constructor references for object creation
• Utility method references for transformations
• Instance method references for delegation`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Method References - Implementation
// ═══════════════════════════════════════════════════════════════════════════

List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

// Static method reference
names.forEach(System.out::println);
// Equivalent to: names.forEach(s -> System.out.println(s));
// Output:
// Alice
// Bob
// Charlie

// Instance method reference
String prefix = "Hello ";
Function<String, String> greeter = prefix::concat;
// Equivalent to: s -> prefix.concat(s)
String result = greeter.apply("World");
// Result: "Hello World"

// Constructor reference
Supplier<List<String>> listFactory = ArrayList::new;
List<String> list = listFactory.get();
// Result: new empty ArrayList instance

// Arbitrary object method reference
Function<String, String> upper = String::toUpperCase;
// Equivalent to: s -> s.toUpperCase()
String upperCase = upper.apply("hello");
// Result: "HELLO"

// Sorting with method reference
names.sort(String::compareToIgnoreCase);
// Result: ["Alice", "Bob", "Charlie"] (sorted case-insensitively)`
    },
    {
      name: 'Closure & Scope',
      icon: '🔹',
      explanation: `**Core Concept:**
• Lambdas can capture variables from the enclosing scope (closure)
• Enables powerful functional composition patterns
• Maintains thread safety through effectively final requirement
• Creates a snapshot of the variable's value at lambda creation time

**Effectively Final Rule:**
• Captured local variables must be effectively final
• Effectively final - Variable not modified after initialization
• Explicit final keyword is optional but variable must not change
• Compilation error if you try to modify captured variable

**What Can Be Captured:**
• Local Variables - Must be effectively final
• Instance Variables - Can be captured and modified (object reference is final)
• Static Variables - Can be captured and modified
• Method Parameters - Must be effectively final

**Thread Safety:**
• Effectively final requirement ensures thread safety
• No risk of concurrent modification
• Prevents subtle race conditions
• Makes lambda behavior predictable

**Practical Implications:**
• Encourages immutable programming style
• Forces clear separation of concerns
• Prevents accidental variable capture bugs
• Enables safe parallel execution`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Closure & Scope - Implementation
// ═══════════════════════════════════════════════════════════════════════════

int multiplier = 10; // effectively final

// Lambda captures 'multiplier' from enclosing scope
Function<Integer, Integer> multiply = x -> x * multiplier;
System.out.println(multiply.apply(5));
// Output: 50

// multiplier = 20; // Error! Cannot modify captured variable

// Using final explicitly
final int divisor = 2;
Function<Integer, Integer> divide = x -> x / divisor;
int result = divide.apply(10);
// Result: 5

// Capturing instance variables (allowed)
class Calculator {
private int base = 100;

public Function<Integer, Integer> getAdder() {
return x -> x + base; // captures 'base'
}
}
Calculator calc = new Calculator();
Function<Integer, Integer> adder = calc.getAdder();
int sum = adder.apply(50);
// Result: 150`
    },
    {
      name: 'Use Cases',
      icon: '🔹',
      explanation: `**Core Concept:**
• Lambdas replace anonymous classes in most scenarios
• Provide cleaner, more expressive code
• Enable functional programming patterns in Java
• Improve code readability and maintainability

**Common Use Cases:**
• Event Handlers - GUI callbacks and listeners
• Collection Processing - Stream operations with filter, map, reduce
• Asynchronous Callbacks - CompletableFuture, async operations
• Custom Sorting - Comparators for complex sorting logic
• Conditional Filtering - Predicate-based data filtering
• Resource Management - Try-with-resources alternatives

**Benefits Over Anonymous Classes:**
• Concise Syntax - Much shorter code
• Better Performance - More efficient bytecode with invokedynamic
• Clearer Intent - Functional approach is self-documenting
• Easier Testing - Pure functions are easier to unit test

**Real-World Applications:**
• API callbacks and event handling
• Stream-based data pipelines
• Concurrent and parallel processing
• Custom collection operations
• Functional-style error handling`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Use Cases - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Event handler
button.addActionListener(e -> System.out.println("Clicked!"));
// Output: "Clicked!" (when button is clicked)

// Custom sorting
List<Person> people = getPersons();
people.sort((p1, p2) -> p1.getAge() - p2.getAge());
// Result: people list sorted by age in ascending order

// Filtering collections
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
numbers.stream()
.filter(n -> n % 2 == 0)
.forEach(System.out::println);
// Output:
// 2
// 4

// Asynchronous callback
CompletableFuture.supplyAsync(() -> fetchData())
.thenApply(data -> process(data))
.thenAccept(result -> System.out.println(result));
// Output: result of processed data (async)

// Thread creation
new Thread(() -> {
System.out.println("Running in thread");
}).start();
// Output: "Running in thread" (in separate thread)`
    },
    {
      name: 'map() Transformation',
      icon: '🔹',
      explanation: `**Core Concept:**
• Transforms each element in the stream using a provided function
• One-to-one transformation where each input produces exactly one output
• Essential building block for data transformation pipelines
• Intermediate operation that returns a new stream

**How It Works:**
• Takes a Function<T, R> that transforms each element
• Original stream remains unchanged (immutable)
• Result is a new stream with transformed elements
• Can change element type (String to Integer, etc.)

**Key Features:**
• Type Transformation - Can map from one type to another
• Chainable - Multiple map operations can be chained
• Lazy Evaluation - Only executes when terminal operation is called
• Method References - Often used with method references for conciseness

**Common Use Cases:**
• Extract properties from objects (map(Person::getName))
• Transform data types (map(String::length))
• Apply calculations (map(n -> n * 2))
• Format or normalize data
• Chain multiple transformations

**Best Practices:**
• Use method references when possible for clarity
• Keep mapping functions pure (no side effects)
• Chain multiple maps for complex transformations
• Consider mapToInt/mapToLong/mapToDouble for primitives`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ map() Transformation - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Basic map - transform strings to uppercase
List<String> names = Arrays.asList("alice", "bob", "charlie");
List<String> upper = names.stream()
.map(String::toUpperCase)
.collect(Collectors.toList());
// Result: [ALICE, BOB, CHARLIE]

// Map to different type - String to Integer
List<String> words = Arrays.asList("Java", "Python", "JavaScript");
List<Integer> lengths = words.stream()
.map(String::length)
.collect(Collectors.toList());
// Result: [4, 6, 10]

// Chaining multiple maps
List<String> result = Arrays.asList("1", "2", "3").stream()
.map(Integer::parseInt)      // String -> Integer
.map(n -> n * 2)              // Integer -> Integer
.map(n -> "Number: " + n)     // Integer -> String
.collect(Collectors.toList());
// Result: [Number: 2, Number: 4, Number: 6]

// Map with complex objects
List<Person> people = getPeople();
List<String> emails = people.stream()
.map(Person::getEmail)
.collect(Collectors.toList());
// Result: list of email addresses

// Map with method reference
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
List<String> strings = numbers.stream()
.map(Object::toString)
.collect(Collectors.toList());
// Result: ["1", "2", "3", "4", "5"]`
    },
    {
      name: 'flatMap() Flattening',
      icon: '🔹',
      explanation: `**Core Concept:**
• Transforms each element into a stream and flattens all resulting streams into one
• One-to-many transformation where one input can produce zero or more outputs
• Essential for working with nested collections and hierarchical data
• Intermediate operation that returns a flattened stream

**How It Works:**
• Takes a Function<T, Stream<R>> that produces a stream for each element
• All produced streams are automatically flattened into a single stream
• Eliminates nested stream structures (Stream<Stream<T>> becomes Stream<T>)
• More powerful than map for complex transformations

**Key Differences from map():**
• map() - One element to one element (Stream<T> -> Stream<R>)
• flatMap() - One element to multiple elements (Stream<T> -> Stream<R>)
• flatMap() flattens nested structures automatically
• flatMap() can filter by returning empty streams

**Common Use Cases:**
• Flatten nested collections (List<List<T>> to List<T>)
• Split strings into characters or words
• Unwrap Optional values
• Process hierarchical data structures
• Cartesian products and combinations
• One-to-many relationships in object models

**Best Practices:**
• Use when each element maps to zero or more results
• Prefer over nested loops for readability
• Combine with filter for conditional flattening
• Consider Optional.stream() for Java 9+ Optional handling`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ flatMap() Flattening - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Flatten nested lists
List<List<Integer>> nested = Arrays.asList(
Arrays.asList(1, 2, 3),
Arrays.asList(4, 5),
Arrays.asList(6, 7, 8)
);
List<Integer> flat = nested.stream()
.flatMap(List::stream)
.collect(Collectors.toList());
// Result: [1, 2, 3, 4, 5, 6, 7, 8]

// Split strings into characters
List<String> words = Arrays.asList("Hello", "World");
List<String> chars = words.stream()
.flatMap(word -> Arrays.stream(word.split("")))
.collect(Collectors.toList());
// Result: [H, e, l, l, o, W, o, r, l, d]

// Flatten Optional values
List<Optional<String>> optionals = Arrays.asList(
Optional.of("Alice"),
Optional.empty(),
Optional.of("Bob"),
Optional.empty(),
Optional.of("Charlie")
);
List<String> present = optionals.stream()
.flatMap(Optional::stream)  // Java 9+
.collect(Collectors.toList());
// Result: [Alice, Bob, Charlie]

// Get all books from all authors
List<Author> authors = getAuthors();
List<Book> allBooks = authors.stream()
.flatMap(author -> author.getBooks().stream())
.collect(Collectors.toList());
// Result: flattened list of all books

// Cartesian product with flatMap
List<String> colors = Arrays.asList("Red", "Blue");
List<String> sizes = Arrays.asList("S", "M", "L");
List<String> combinations = colors.stream()
.flatMap(color -> sizes.stream()
.map(size -> color + "-" + size))
.collect(Collectors.toList());
// Result: [Red-S, Red-M, Red-L, Blue-S, Blue-M, Blue-L]`
    },
    {
      name: 'teeing() Collector (Java 12+)',
      icon: '🔹',
      explanation: `**Core Concept:**
• Applies two different collectors to the same stream simultaneously
• Combines both results using a merge function
• Introduced in Java 12 as part of Collectors utility class
• Avoids processing the same stream twice for multiple aggregations

**How It Works:**
• Takes three parameters: downstream1, downstream2, merger
• Both downstream collectors process all stream elements
• Merger function combines both results into final result
• Single pass through the stream for both operations

**Syntax:**
• Collectors.teeing(collector1, collector2, (result1, result2) -> combined)
• collector1 and collector2 can be any valid collectors
• Merger function receives both results and produces final output
• Result type determined by merger function's return type

**Common Patterns:**
• Calculate multiple statistics in one pass (min and max, sum and count)
• Partition data while computing aggregate (count and average)
• Combine filtering with aggregation
• Generate composite results from single data pass

**Benefits:**
• Performance - Single stream traversal instead of multiple
• Efficiency - Avoid creating intermediate collections
• Clarity - Express multiple aggregations declaratively
• Composability - Combine any two collectors

**Use Cases:**
• Statistical analysis (min/max, mean/median)
• Dual grouping or partitioning
• Combined filtering and aggregation
• Multi-dimensional analysis of data`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ teeing() Collector (Java 12+) - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Calculate average and count simultaneously
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

String result = numbers.stream()
.collect(Collectors.teeing(
Collectors.summingInt(Integer::intValue),    // First collector
Collectors.counting(),                        // Second collector
(sum, count) -> "Sum: " + sum + ", Count: " + count
));
// Result: "Sum: 55, Count: 10"

// Find min and max in single pass
record MinMax(Integer min, Integer max) {}

MinMax minMax = numbers.stream()
.collect(Collectors.teeing(
Collectors.minBy(Integer::compareTo),
Collectors.maxBy(Integer::compareTo),
(min, max) -> new MinMax(
min.orElse(null),
max.orElse(null)
)
));
// Result: MinMax[min=1, max=10]

// Group by condition and calculate statistics
List<Person> people = getPeople();

record Stats(long adults, double avgAge) {}

Stats stats = people.stream()
.collect(Collectors.teeing(
Collectors.filtering(
p -> p.getAge() >= 18,
Collectors.counting()
),
Collectors.averagingInt(Person::getAge),
Stats::new
));
// Result: Stats[adults=15, avgAge=32.5]

// Partition and count both groups
Map.Entry<Long, Long> evenOddCount = numbers.stream()
.collect(Collectors.teeing(
Collectors.filtering(n -> n % 2 == 0, Collectors.counting()),
Collectors.filtering(n -> n % 2 != 0, Collectors.counting()),
Map::entry
));
// Result: Entry[5, 5] (5 even, 5 odd)

// Calculate sum of positive and negative numbers
record SumStats(int positive, int negative) {}

List<Integer> mixed = Arrays.asList(-5, 3, -2, 8, -1, 4);
SumStats sums = mixed.stream()
.collect(Collectors.teeing(
Collectors.filtering(n -> n > 0, Collectors.summingInt(Integer::intValue)),
Collectors.filtering(n -> n < 0, Collectors.summingInt(Integer::intValue)),
SumStats::new
));
// Result: SumStats[positive=15, negative=-8]`
    },
    {
      name: 'Stream Operations',
      icon: '🔹',
      explanation: `**Core Concept:**
• Declarative approach to processing collections and data sequences
• Two types of operations: intermediate and terminal
• Operations form a pipeline that processes elements on-demand
• Functional programming style for data manipulation

**Intermediate Operations:**
• filter(Predicate) - Select elements matching a condition
• map(Function) - Transform each element
• flatMap(Function) - Flatten nested structures
• distinct() - Remove duplicates
• sorted() - Sort elements
• limit(n) - Take first n elements
• skip(n) - Skip first n elements
• peek(Consumer) - Perform action without modifying stream

**Terminal Operations:**
• forEach(Consumer) - Perform action on each element
• collect(Collector) - Accumulate elements into collection
• reduce(BinaryOperator) - Combine elements into single result
• count() - Count elements
• anyMatch/allMatch/noneMatch(Predicate) - Test elements
• findFirst/findAny() - Retrieve element
• min/max(Comparator) - Find extreme values

**Key Characteristics:**
• Lazy Evaluation - Intermediate operations not executed until terminal operation
• Chainable - Multiple intermediate operations can be chained
• Immutable - Original collection remains unchanged
• One-time Use - Stream can only be consumed once

**Benefits:**
• Readability - Declarative code is easier to understand
• Maintainability - Less boilerplate compared to loops
• Parallelization - Easy to convert to parallel streams
• Optimization - Lazy evaluation enables short-circuiting`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Stream Operations - Implementation
// ═══════════════════════════════════════════════════════════════════════════

List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David", "Eve");

// Filter and map - intermediate operations
List<String> result = names.stream()
.filter(name -> name.length() > 3)  // Keep names longer than 3 chars
.map(String::toUpperCase)            // Convert to uppercase
.sorted()                            // Sort alphabetically
.collect(Collectors.toList());       // Terminal operation
// Result: [ALICE, CHARLIE, DAVID]

// FlatMap - flatten nested structures
List<List<Integer>> nested = Arrays.asList(
Arrays.asList(1, 2, 3),
Arrays.asList(4, 5),
Arrays.asList(6, 7, 8)
);
List<Integer> flat = nested.stream()
.flatMap(List::stream)
.collect(Collectors.toList());
// Result: [1, 2, 3, 4, 5, 6, 7, 8]

// Distinct and limit
List<Integer> unique = Arrays.asList(1, 2, 2, 3, 3, 3, 4, 5)
.stream()
.distinct()    // Remove duplicates
.limit(3)      // Take first 3
.collect(Collectors.toList());
// Result: [1, 2, 3]`
    },
    {
      name: 'Lazy Evaluation',
      icon: '🔹',
      explanation: `**Core Concept:**
• Intermediate operations are deferred until a terminal operation is invoked
• Enables powerful optimizations and short-circuit evaluation
• Processes elements on-demand rather than all at once
• Fundamental to stream efficiency

**How It Works:**
• Stream pipeline is constructed but not executed
• No computation happens during intermediate operations
• Terminal operation triggers the entire pipeline execution
• Elements flow through pipeline one at a time (vertical processing)

**Benefits:**
• Performance - Avoid unnecessary computations
• Memory Efficiency - No intermediate collections created
• Short-Circuiting - Operations like findFirst can stop early
• Optimization - JVM can reorder and combine operations

**Short-Circuit Operations:**
• anyMatch/allMatch/noneMatch - Stop when result is determined
• findFirst/findAny - Stop after finding element
• limit - Stop after n elements
• Can significantly improve performance on large datasets

**Vertical vs Horizontal Processing:**
• Vertical - Elements processed through entire pipeline one at a time
• Horizontal - All elements through one operation, then next operation
• Streams use vertical processing for efficiency
• Enables early termination for short-circuit operations`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Lazy Evaluation - Implementation
// ═══════════════════════════════════════════════════════════════════════════

List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// Intermediate operations are not executed yet
Stream<Integer> stream = numbers.stream()
.filter(n -> {
System.out.println("Filtering: " + n);
return n % 2 == 0;
})
.map(n -> {
System.out.println("Mapping: " + n);
return n * 2;
});

// Nothing printed yet - operations are lazy!

// Terminal operation triggers execution
List<Integer> result = stream.collect(Collectors.toList());
// Output:
// Filtering: 1
// Filtering: 2
// Mapping: 2
// Filtering: 3
// Filtering: 4
// Mapping: 4
// ... etc.
// Result: [4, 8, 12, 16, 20]

// Short-circuit operations
boolean hasEven = numbers.stream()
.peek(n -> System.out.println("Processing: " + n))
.anyMatch(n -> n % 2 == 0);
// Output:
// Processing: 1
// Processing: 2
// Result: true (stops after finding first even number)`
    },
    {
      name: 'Parallel Streams',
      icon: '🔹',
      explanation: `**Core Concept:**
• Enable parallel processing of stream elements across multiple CPU cores
• Use ForkJoinPool for automatic work distribution
• Can significantly improve performance for large datasets
• Simple conversion: .stream() to .parallelStream()

**How It Works:**
• Splits data into chunks using Spliterator
• Processes chunks in parallel across available CPU cores
• Combines results automatically
• Uses common ForkJoinPool by default (can customize)

**When to Use:**
• Large datasets (typically thousands of elements)
• CPU-intensive operations (complex calculations)
• Independent operations (no shared mutable state)
• Operations where parallelization overhead is justified

**When NOT to Use:**
• Small datasets (overhead exceeds benefits)
• I/O-bound operations (threads wait for I/O)
• Operations with shared mutable state
• Order-dependent processing

**Thread Safety Considerations:**
• Ensure operations are stateless
• Avoid accessing shared mutable variables
• Use thread-safe collectors
• Be aware of non-deterministic ordering

**Performance Tips:**
• Benchmark sequential vs parallel for your use case
• Consider using custom ForkJoinPool for control
• Avoid boxing/unboxing with primitive streams
• Use parallel() for existing sequential streams`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Parallel Streams - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Sequential stream
long start = System.currentTimeMillis();
long count1 = IntStream.range(1, 1000000)
.filter(n -> n % 2 == 0)
.count();
long sequential = System.currentTimeMillis() - start;
// Result: count1 = 499999, sequential time (e.g., 50ms)

// Parallel stream - utilizes multiple cores
start = System.currentTimeMillis();
long count2 = IntStream.range(1, 1000000)
.parallel()
.filter(n -> n % 2 == 0)
.count();
long parallel = System.currentTimeMillis() - start;
// Result: count2 = 499999, parallel time (e.g., 15ms)
// Parallel is typically 2-4x faster on multi-core systems

// Parallel processing with collections
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8);
List<Integer> doubled = numbers.parallelStream()
.map(n -> n * 2)
.collect(Collectors.toList());
// Result: [2, 4, 6, 8, 10, 12, 14, 16]

// Custom thread pool
ForkJoinPool customPool = new ForkJoinPool(4);
List<Integer> result = customPool.submit(() ->
numbers.parallelStream()
.map(n -> expensiveOperation(n))
.collect(Collectors.toList())
).join();
// Result: processed list using 4 threads`
    },
    {
      name: 'Collectors',
      icon: '🔹',
      explanation: `**Core Concept:**
• Mutable reduction operations that accumulate stream elements into collections
• Terminal operation that transforms stream into desired data structure
• Provided by Collectors utility class with many pre-built collectors
• Can create custom collectors for specialized needs

**Basic Collectors:**
• toList() - Collect into ArrayList
• toSet() - Collect into HashSet (removes duplicates)
• toMap() - Collect into HashMap with key and value mappers
• toCollection() - Collect into specific collection type
• toUnmodifiableList/Set/Map() - Create immutable collections (Java 10+)

**Grouping & Partitioning:**
• groupingBy() - Group elements by classifier function
• partitioningBy() - Split into two groups based on predicate
• Downstream collectors - Apply additional collectors to grouped results
• Multi-level grouping - Nested groupingBy for hierarchical data

**String Collectors:**
• joining() - Concatenate strings with delimiter
• joining(delimiter, prefix, suffix) - With formatting

**Statistical Collectors:**
• counting() - Count elements
• summingInt/Long/Double() - Sum numeric values
• averagingInt/Long/Double() - Calculate average
• summarizingInt/Long/Double() - Get comprehensive statistics

**Advanced Collectors:**
• reducing() - Custom reduction operation
• collectingAndThen() - Transform collector result
• mapping() - Transform elements before collecting
• filtering() - Filter before collecting (Java 9+)
• teeing() - Apply two collectors and merge results (Java 12+)`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Collectors - Implementation
// ═══════════════════════════════════════════════════════════════════════════

List<Person> people = Arrays.asList(
new Person("Alice", 30, "Engineering"),
new Person("Bob", 25, "Marketing"),
new Person("Charlie", 30, "Engineering"),
new Person("David", 35, "Marketing")
);

// Group by department
Map<String, List<Person>> byDept = people.stream()
.collect(Collectors.groupingBy(Person::getDepartment));
// Result: {"Engineering": [Alice, Charlie], "Marketing": [Bob, David]}

// Group by age with counting
Map<Integer, Long> ageCount = people.stream()
.collect(Collectors.groupingBy(Person::getAge, Collectors.counting()));
// Result: {25: 1, 30: 2, 35: 1}

// Partition by condition
Map<Boolean, List<Person>> partition = people.stream()
.collect(Collectors.partitioningBy(p -> p.getAge() > 28));
// Result: {true: [Alice, Charlie, David], false: [Bob]}

// Join names
String names = people.stream()
.map(Person::getName)
.collect(Collectors.joining(", ", "[", "]"));
// Result: "[Alice, Bob, Charlie, David]"

// Statistics
IntSummaryStatistics stats = people.stream()
.collect(Collectors.summarizingInt(Person::getAge));
System.out.println("Average age: " + stats.getAverage());
System.out.println("Max age: " + stats.getMax());
// Output:
// Average age: 30.0
// Max age: 35`
    },
    {
      name: 'Stream Creation',
      icon: '🔹',
      explanation: `**Core Concept:**
• Multiple ways to create streams from various data sources
• Streams can be finite or infinite
• Different creation methods for different use cases
• Lazy initialization enables working with large or infinite datasets

**From Collections:**
• collection.stream() - Sequential stream from any Collection
• collection.parallelStream() - Parallel stream from Collection
• Works with List, Set, Queue, and all Collection implementations

**From Arrays:**
• Arrays.stream(array) - Stream from array
• Stream.of(T... values) - Stream from varargs
• Arrays.stream(array, startInclusive, endExclusive) - Partial array

**From Ranges:**
• IntStream.range(start, end) - Exclusive end
• IntStream.rangeClosed(start, end) - Inclusive end
• LongStream.range/rangeClosed() - For long values
• Great for numerical sequences and loops

**From Files:**
• Files.lines(Path) - Stream of lines from file
• Files.walk(Path) - Stream of file paths
• Files.list(Path) - Stream of directory entries
• Auto-closeable - use try-with-resources

**Infinite Streams:**
• Stream.generate(Supplier) - Generate elements using supplier
• Stream.iterate(seed, UnaryOperator) - Generate by applying function
• Must use limit() to make finite
• Useful for sequences and random values

**Other Sources:**
• Stream.empty() - Empty stream
• Stream.concat(stream1, stream2) - Combine two streams
• Stream.builder() - Build stream incrementally
• Custom sources via StreamSupport`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Stream Creation - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// From collection
List<String> list = Arrays.asList("a", "b", "c");
Stream<String> stream1 = list.stream();

// From array
String[] array = {"x", "y", "z"};
Stream<String> stream2 = Arrays.stream(array);

// From values
Stream<Integer> stream3 = Stream.of(1, 2, 3, 4, 5);

// From range
IntStream range = IntStream.range(1, 10);     // 1 to 9
IntStream rangeClosed = IntStream.rangeClosed(1, 10); // 1 to 10

// From file
try (Stream<String> lines = Files.lines(Paths.get("data.txt"))) {
lines.filter(line -> !line.isEmpty())
.forEach(System.out::println);
}
// Output: non-empty lines from file

// Infinite stream with generate
Stream<Double> randoms = Stream.generate(Math::random)
.limit(5);  // Must limit infinite streams
List<Double> randomList = randoms.collect(Collectors.toList());
// Result: 5 random double values

// Infinite stream with iterate
Stream<Integer> fibonacci = Stream.iterate(
new int[]{0, 1},
f -> new int[]{f[1], f[0] + f[1]}
).map(f -> f[0])
.limit(10);  // First 10 Fibonacci numbers
// Result: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]`
    },
    {
      name: 'Primitive Streams',
      icon: '🔹',
      explanation: `**Core Concept:**
• Specialized stream implementations for int, long, and double primitives
• Avoid autoboxing/unboxing overhead for better performance
• Provide additional aggregate operations for numerical data
• IntStream, LongStream, and DoubleStream

**Key Benefits:**
• Performance - No boxing/unboxing overhead
• Memory Efficiency - Primitives use less memory than wrapper objects
• Specialized Operations - sum(), average(), min(), max() without collectors
• Type Safety - Compile-time guarantees for numeric operations

**Specialized Methods:**
• sum() - Sum all elements
• average() - Calculate average (returns OptionalDouble)
• min()/max() - Find minimum/maximum values
• summaryStatistics() - Get count, sum, min, average, max in one pass
• range()/rangeClosed() - Generate numeric sequences

**Conversion Methods:**
• mapToInt/Long/Double() - Convert Stream<T> to primitive stream
• boxed() - Convert primitive stream to Stream<Integer/Long/Double>
• mapToObj() - Convert primitive stream to object stream

**Use Cases:**
• Mathematical calculations and aggregations
• Numerical data processing
• Performance-critical stream operations
• Range-based iterations
• Statistical analysis

**Best Practices:**
• Use primitive streams for numerical computations
• Avoid unnecessary boxing/unboxing
• Use summaryStatistics() for multiple aggregates
• Convert to object stream only when needed`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Primitive Streams - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// IntStream with specialized operations
IntStream numbers = IntStream.range(1, 100);
int sum = numbers.sum();  // More efficient than boxed Integer
// Result: 4950

// Statistics on primitive stream
IntSummaryStatistics stats = IntStream.range(1, 10)
.summaryStatistics();
System.out.println("Sum: " + stats.getSum());
System.out.println("Average: " + stats.getAverage());
System.out.println("Max: " + stats.getMax());
// Output:
// Sum: 45
// Average: 5.0
// Max: 9

// DoubleStream
DoubleStream doubles = DoubleStream.of(1.5, 2.3, 3.7, 4.1);
double average = doubles.average().orElse(0.0);
// Result: 2.9

// Convert from object stream to primitive
List<String> strings = Arrays.asList("1", "2", "3", "4", "5");
int total = strings.stream()
.mapToInt(Integer::parseInt)  // Stream<String> -> IntStream
.sum();
// Result: 15

// LongStream for large numbers
LongStream longStream = LongStream.rangeClosed(1, 1000000);
long product = longStream.limit(10)
.reduce(1L, (a, b) -> a * b);  // Factorial of 10
// Result: 3628800

// Boxing when necessary
List<Integer> boxed = IntStream.range(1, 5)
.boxed()  // IntStream -> Stream<Integer>
.collect(Collectors.toList());
// Result: [1, 2, 3, 4]`
    },
    {
      name: 'Null Safety',
      icon: '🔹',
      explanation: `**Core Concept:**
• Container object that may or may not contain a non-null value
• Explicitly represents the absence of a value in APIs
• Forces developers to handle null cases at compile time
• Reduces NullPointerExceptions and makes APIs self-documenting

**Why Optional:**
• Eliminates ambiguity - Clear distinction between "no value" and "null"
• Self-Documenting - Method signature indicates potential absence
• Compile-Time Safety - Forces null handling instead of runtime errors
• Functional Composition - Chain operations safely

**Problem It Solves:**
• Tony Hoare's "Billion Dollar Mistake" - null references
• Defensive null checking - if (x != null) everywhere
• Unclear APIs - Does method return null or throw exception?
• NullPointerException - Most common Java runtime error

**API Design:**
• Return Optional<T> instead of T when value might be absent
• Never return null Optional - use Optional.empty() instead
• Don't use Optional for fields or parameters (controversial)
• Use Optional to make absence explicit in return types

**Benefits:**
• Explicit Null Handling - Forces consideration of absent values
• Chainable Operations - Functional-style null handling
• Less Boilerplate - Eliminates repetitive null checks
• Better Documentation - Self-explanatory method signatures`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Null Safety - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Before Optional - prone to NullPointerException
public String getUserEmail(int userId) {
User user = findUser(userId);
if (user != null) {
Address address = user.getAddress();
if (address != null) {
return address.getEmail();
}
}
return "no-email@example.com";
}

// With Optional - explicit null handling
public Optional<String> getUserEmail(int userId) {
return findUser(userId)
.flatMap(User::getAddress)
.map(Address::getEmail);
}

// Using the result
String email = getUserEmail(123)
.orElse("no-email@example.com");
// Result: email address or "no-email@example.com"

// Optional makes API contract clear
Optional<User> user = findUser(123);
if (user.isPresent()) {
System.out.println("Found: " + user.get().getName());
} else {
System.out.println("User not found");
}
// Output: "Found: John Doe" or "User not found"`
    },
    {
      name: 'Creation Methods',
      icon: '🔹',
      explanation: `**Core Concept:**
• Three primary ways to create Optional instances
• Each method serves different use cases and safety guarantees
• Choosing the right method prevents bugs and clarifies intent
• Part of Optional's API for explicit null handling

**Creation Methods:**
• Optional.of(value) - For guaranteed non-null values
• Optional.ofNullable(value) - For potentially null values
• Optional.empty() - For explicitly empty Optional

**Optional.of(T value):**
• Use when you're certain the value is non-null
• Throws NullPointerException immediately if value is null
• Fail-fast behavior catches bugs early
• Common in transformations where null isn't expected

**Optional.ofNullable(T value):**
• Safe for values that might be null
• Returns Optional.empty() if value is null
• Most commonly used creation method
• Ideal for wrapping nullable return values

**Optional.empty():**
• Creates an empty Optional explicitly
• Singleton instance (same empty Optional reused)
• Use when you know there's no value
• Return type for methods that might find nothing

**Best Practices:**
• Use ofNullable() for external data or method returns
• Use of() only when null would be a programming error
• Never return null Optional - use empty() instead
• Prefer ofNullable() when in doubt`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Creation Methods - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Optional.of() - use when value is guaranteed non-null
String name = "Alice";
Optional<String> opt1 = Optional.of(name);
// Optional.of(null); // Throws NullPointerException

// Optional.ofNullable() - use when value might be null
String nullableName = getName();  // might return null
Optional<String> opt2 = Optional.ofNullable(nullableName);

// Optional.empty() - explicitly create empty optional
Optional<String> opt3 = Optional.empty();
// Result: empty Optional

// Real-world example
public Optional<User> findUserByEmail(String email) {
User user = database.query("SELECT * FROM users WHERE email = ?", email);
return Optional.ofNullable(user);  // user might be null
}

// Using creation methods safely
Optional<String> config = Optional.ofNullable(System.getProperty("config"));
String configValue = config.orElse("default-config.xml");
// Result: system property value or "default-config.xml"`
    },
    {
      name: 'Value Access',
      icon: '🔹',
      explanation: `**Core Concept:**
• Multiple ways to extract values from Optional instances
• Each method handles empty Optional differently
• Choose method based on what should happen when value is absent
• Avoid get() in favor of safer alternatives

**Value Extraction Methods:**
• get() - Retrieve value, throws if empty (avoid when possible)
• orElse(T other) - Return value or default
• orElseGet(Supplier<T>) - Return value or computed default
• orElseThrow() - Return value or throw exception
• orElseThrow(Supplier<Exception>) - Return value or throw custom exception

**get() Method:**
• Returns value if present
• Throws NoSuchElementException if empty
• Considered bad practice - defeats Optional's purpose
• Only use after isPresent() check (but prefer other methods)

**orElse(T other):**
• Most commonly used extraction method
• Default value is always evaluated (even if not needed)
• Use for simple, cheap default values
• Example: orElse("Unknown")

**orElseGet(Supplier<T>):**
• Lazily evaluates default value
• Default computed only when Optional is empty
• Use for expensive default value computations
• Better performance when default is rarely needed

**orElseThrow():**
• Throws NoSuchElementException if empty (Java 10+)
• Same as get() but more explicit about throwing
• Custom exception version for better error messages

**Checking Methods:**
• isPresent() - Returns boolean, true if value exists
• isEmpty() - Returns boolean, true if no value (Java 11+)
• ifPresent(Consumer) - Execute action only if value present
• ifPresentOrElse(Consumer, Runnable) - Execute action or else clause (Java 9+)`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Value Access - Implementation
// ═══════════════════════════════════════════════════════════════════════════

Optional<String> opt = Optional.of("Hello");

// get() - avoid if possible, throws NoSuchElementException if empty
if (opt.isPresent()) {
String value = opt.get();  // Safe because we checked
// Result: "Hello"
}

// orElse() - provide default value (always evaluated)
String result1 = opt.orElse("Default");
// Result: "Hello"
String result2 = Optional.<String>empty().orElse("Default");
// Result: "Default"

// orElseGet() - lazily compute default (only if empty)
String result3 = opt.orElseGet(() -> {
System.out.println("Computing default");  // Not executed
return expensiveDefaultValue();
});
// Result: "Hello" (supplier not called)

// orElseThrow() - throw custom exception if empty
String result4 = opt.orElseThrow(() ->
new IllegalStateException("Value required!"));
// Result: "Hello" (no exception thrown)

// isPresent() and ifPresent()
if (opt.isPresent()) {
System.out.println(opt.get());
}
// Better:
opt.ifPresent(System.out::println);
// Output: Hello

// ifPresentOrElse() (Java 9+)
opt.ifPresentOrElse(
value -> System.out.println("Found: " + value),
() -> System.out.println("Not found")
);
// Output: Found: Hello`
    },
    {
      name: 'Functional Operations',
      icon: '🔹',
      explanation: `**Core Concept:**
• Transform and filter Optional values functionally
• Chain operations without explicit null checks
• Similar to Stream operations but for single values
• Enables elegant null-safe code

**Transformation Operations:**
• map(Function<T, R>) - Transform value if present
• flatMap(Function<T, Optional<R>>) - Transform to another Optional and flatten
• filter(Predicate<T>) - Keep value only if it matches condition

**map() Operation:**
• Transforms the contained value if present
• Returns Optional with transformed value
• Returns empty Optional if original was empty
• One-to-one transformation (value to value)

**flatMap() Operation:**
• Used when transformation itself returns Optional
• Flattens Optional<Optional<T>> to Optional<T>
• Essential for chaining operations that return Optional
• Prevents nested Optional structures

**filter() Operation:**
• Tests value against a predicate
• Returns original Optional if predicate matches
• Returns empty Optional if predicate fails or Optional was empty
• Useful for conditional value retention

**Benefits:**
• Avoid Nested Null Checks - Declarative chaining instead of if statements
• Composability - Build complex transformations from simple operations
• Readability - Intent is clear from method names
• Safety - No risk of NullPointerException

**Common Patterns:**
• map() for transformations (User::getName)
• flatMap() for nullable getters (User::getAddress when it returns Optional)
• filter() for validation (age -> age >= 18)
• Chaining all three for complex workflows`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Functional Operations - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// map() - transform the value if present
Optional<String> name = Optional.of("alice");
Optional<String> upper = name.map(String::toUpperCase);
// Result: Optional["ALICE"]

Optional<Integer> length = name.map(String::length);
// Result: Optional[5]

// flatMap() - when transformation returns Optional
Optional<User> user = findUser(123);
Optional<String> email = user.flatMap(User::getEmail);
// If User::getEmail returns Optional<String>
// Result: Optional with email or empty Optional

// Chaining operations
Optional<Integer> result = Optional.of("12345")
.filter(s -> s.length() > 3)        // Keep if length > 3
.map(String::length)                 // Convert to length
.filter(len -> len < 10);            // Keep if length < 10
// Result: Optional[5]

// Complex example - nested optionals
public Optional<String> getUserCity(int userId) {
return findUser(userId)
.flatMap(User::getAddress)      // User -> Optional<Address>
.flatMap(Address::getCity)      // Address -> Optional<City>
.map(City::getName);            // City -> String
}
// Result: Optional with city name or empty Optional

// filter() - conditional keeping
Optional<Integer> evenNumber = Optional.of(42)
.filter(n -> n % 2 == 0);  // Keeps 42
// Result: Optional[42]

Optional<Integer> oddNumber = Optional.of(43)
.filter(n -> n % 2 == 0);  // Empty optional
// Result: Optional.empty()`
    },
    {
      name: 'Best Practices',
      icon: '🔹',
      explanation: `**Core Concept:**
• Guidelines for effective and idiomatic Optional usage
• Avoid common anti-patterns and pitfalls
• Make code more maintainable and less error-prone
• Follow Java community conventions

**DO - Return Types:**
• Use Optional as method return type for potentially absent values
• Makes API contracts explicit and self-documenting
• Forces callers to handle absence explicitly
• Example: Optional<User> findById(int id)

**DON'T - Fields and Parameters:**
• Never use Optional as class field (use nullable field instead)
• Don't use Optional as method parameter (just accept null)
• Optional is for return types, not internal state
• Adds unnecessary complexity and overhead

**DON'T - Return null Optional:**
• Never return null instead of Optional
• Always return Optional.empty() for "no value"
• Defeats the entire purpose of Optional
• Creates same problems Optional was designed to solve

**DON'T - Unsafe get():**
• Avoid get() without isPresent() check
• Throws NoSuchElementException if empty
• Use orElse(), orElseGet(), or orElseThrow() instead
• get() defeats Optional's safety guarantees

**DO - Prefer Functional Style:**
• Use map/flatMap/filter for transformations
• Use ifPresent() for side effects instead of isPresent() + get()
• Chain operations rather than nested if statements
• More concise and less error-prone

**Performance Considerations:**
• orElse() always evaluates default value
• orElseGet() lazily evaluates (better for expensive operations)
• Primitive Optionals (OptionalInt, etc.) for performance-critical code
• Don't overuse - sometimes null checks are simpler`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Best Practices - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// GOOD - Optional as return type
public Optional<User> findUser(int id) {
User user = database.find(id);
return Optional.ofNullable(user);
}

// BAD - Optional as parameter (just use null)
public void setUser(Optional<User> user) { /* Don't do this */ }
// GOOD - accept potentially null parameter
public void setUser(User user) { /* user can be null */ }

// BAD - Optional as field
class Order {
private Optional<Customer> customer;  // Don't do this
}
// GOOD - nullable field
class Order {
private Customer customer;  // can be null
}

// BAD - return null Optional
public Optional<String> getName() {
return null;  // NEVER do this!
}

// BAD - using get() without checking
String name = findUser(123).get();  // May throw exception

// GOOD - safe value extraction
String name = findUser(123)
.map(User::getName)
.orElse("Unknown");
// Result: user name or "Unknown"

// GOOD - method chaining
findUser(123)
.map(User::getName)
.filter(name -> name.length() > 3)
.ifPresent(System.out::println);
// Output: user name (if present and length > 3)`
    },
    {
      name: 'Core Classes',
      icon: '🔹',
      explanation: `**Core Concept:**
• New java.time package introduced in Java 8
• Immutable and thread-safe date/time classes
• Replaces problematic java.util.Date and Calendar
• Clear separation between human and machine time

**Main Date/Time Classes:**
• LocalDate - Date without time (2023-12-25)
• LocalTime - Time without date (14:30:00)
• LocalDateTime - Date and time without timezone
• ZonedDateTime - Date, time with timezone
• Instant - Machine timestamp (epoch seconds)

**LocalDate:**
• Represents ISO-8601 date without time
• No timezone information
• Immutable - all operations return new instances
• Use for: birthdays, anniversaries, date-only data

**LocalTime:**
• Represents time without date
• No timezone information
• Precision to nanoseconds
• Use for: business hours, schedules, time-only data

**LocalDateTime:**
• Combination of LocalDate and LocalTime
• No timezone - "local" to observer
• Most commonly used for application-level timestamps
• Use for: meetings, events, logs without timezone needs

**ZonedDateTime:**
• LocalDateTime with timezone and offset
• Handles daylight saving time automatically
• Use for: international scheduling, timezone-aware operations
• Includes ZoneId (e.g., "America/New_York")

**Instant:**
• Point on timeline in UTC
• Machine time (not human time)
• Use for: timestamps, duration calculations, system events
• Stored as seconds since epoch (1970-01-01T00:00:00Z)

**Key Advantages:**
• Immutability - Thread-safe by design
• Clear API - Intuitive method names
• Type Safety - Different types for different use cases
• No Silent Failures - Proper exception handling`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Core Classes - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// LocalDate - date without time
LocalDate today = LocalDate.now();
LocalDate birthday = LocalDate.of(1990, Month.JANUARY, 15);
LocalDate parsed = LocalDate.parse("2023-12-25");
// Result: 2023-12-25

// LocalTime - time without date
LocalTime now = LocalTime.now();
LocalTime lunchTime = LocalTime.of(12, 30, 0);
LocalTime parsed2 = LocalTime.parse("14:30:00");
// Result: 14:30:00

// LocalDateTime - date and time
LocalDateTime meeting = LocalDateTime.of(2023, 12, 25, 14, 30);
LocalDateTime current = LocalDateTime.now();
// Result: 2023-12-25T14:30

// ZonedDateTime - with timezone
ZonedDateTime nyTime = ZonedDateTime.now(ZoneId.of("America/New_York"));
ZonedDateTime tokyoTime = ZonedDateTime.now(ZoneId.of("Asia/Tokyo"));
// Result: 2023-12-25T14:30:00-05:00[America/New_York]

// Instant - timestamp (epoch seconds)
Instant timestamp = Instant.now();
Instant epoch = Instant.ofEpochSecond(1609459200);
// Result: 2021-01-01T00:00:00Z

// All are immutable
LocalDate date = LocalDate.now();
LocalDate tomorrow = date.plusDays(1);  // Returns new instance
// 'date' is unchanged - thread-safe!`
    },
    {
      name: 'Period & Duration',
      icon: '🔹',
      explanation: `**Core Concept:**
• Represent amounts of time for date/time arithmetic
• Period for date-based amounts (calendar concepts)
• Duration for time-based amounts (exact time)
• Essential for calculating differences and adding/subtracting time

**Period:**
• Date-based amount in years, months, and days
• Human-scale calendar units
• Use with LocalDate, LocalDateTime, ZonedDateTime
• Considers calendar irregularities (month lengths, leap years)
• Example: "2 years, 3 months, 15 days"

**Duration:**
• Time-based amount in hours, minutes, seconds, nanoseconds
• Machine-scale exact time measurement
• Use with LocalTime, LocalDateTime, Instant
• Always exact (no calendar considerations)
• Example: "5 hours, 30 minutes, 45 seconds"

**Key Differences:**
• Period - Calendar-aware, human-friendly (years, months, days)
• Duration - Exact time measurement (hours, minutes, seconds)
• Period.between() for dates
• Duration.between() for times/timestamps

**Creation Methods:**
• Period: ofYears(), ofMonths(), ofDays(), ofWeeks(), of(y, m, d)
• Duration: ofHours(), ofMinutes(), ofSeconds(), ofMillis(), ofNanos()
• Between: Period.between(date1, date2), Duration.between(time1, time2)

**Arithmetic Operations:**
• plus() and minus() methods on date/time objects
• Add Period to LocalDate: date.plus(Period.ofMonths(3))
• Add Duration to LocalTime: time.plus(Duration.ofHours(2))
• Negative values for subtraction

**Common Use Cases:**
• Calculate age: Period.between(birthDate, today)
• Time elapsed: Duration.between(startTime, endTime)
• Future/past dates: date.plus(Period.ofWeeks(2))
• Time intervals: Duration.ofMinutes(30)`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Period & Duration - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Period - date-based amounts
Period oneYear = Period.ofYears(1);
Period threeMonths = Period.ofMonths(3);
Period tenDays = Period.ofDays(10);
Period complex = Period.of(1, 6, 15);  // 1 year, 6 months, 15 days

LocalDate start = LocalDate.of(2020, 1, 1);
LocalDate end = LocalDate.of(2023, 6, 15);
Period between = Period.between(start, end);
System.out.println(between.getYears() + " years, " +
between.getMonths() + " months, " +
between.getDays() + " days");
// Output: 3 years, 5 months, 14 days

// Duration - time-based amounts
Duration oneHour = Duration.ofHours(1);
Duration thirtyMinutes = Duration.ofMinutes(30);
Duration fiveSeconds = Duration.ofSeconds(5);

LocalDateTime start2 = LocalDateTime.of(2023, 1, 1, 10, 0);
LocalDateTime end2 = LocalDateTime.of(2023, 1, 1, 15, 30);
Duration duration = Duration.between(start2, end2);
System.out.println("Hours: " + duration.toHours());
System.out.println("Minutes: " + duration.toMinutes());
// Output:
// Hours: 5
// Minutes: 330

// Date arithmetic
LocalDate futureDate = LocalDate.now().plus(Period.ofWeeks(2));
LocalTime futureTime = LocalTime.now().plus(Duration.ofHours(3));
// Result: dates/times 2 weeks / 3 hours in the future`
    },
    {
      name: 'Formatting & Parsing',
      icon: '🔹',
      explanation: `**Core Concept:**
• DateTimeFormatter for converting between strings and date/time objects
• Thread-safe replacement for SimpleDateFormat
• Predefined formatters and custom pattern support
• Locale-aware formatting for internationalization

**Key Features:**
• Immutable and Thread-Safe - Unlike SimpleDateFormat
• Two-way Conversion - Parse strings to objects, format objects to strings
• Predefined Formats - ISO standards and common patterns
• Custom Patterns - Flexible pattern syntax
• Locale Support - Language and region-specific formatting

**Predefined Formatters:**
• ISO_LOCAL_DATE - 2023-12-25
• ISO_LOCAL_TIME - 14:30:00
• ISO_LOCAL_DATE_TIME - 2023-12-25T14:30:00
• ISO_ZONED_DATE_TIME - 2023-12-25T14:30:00-05:00[America/New_York]
• BASIC_ISO_DATE - 20231225

**Custom Patterns:**
• y/yyyy - Year
• M/MM/MMM/MMMM - Month (1, 01, Jan, January)
• d/dd - Day of month
• H/HH - Hour (0-23)
• m/mm - Minute
• s/ss - Second
• a - AM/PM marker
• z/Z - Timezone

**Format() Method:**
• Converts date/time object to string
• date.format(formatter)
• formatter.format(date)
• Both syntaxes are equivalent

**Parse() Method:**
• Converts string to date/time object
• LocalDate.parse(string, formatter)
• Throws DateTimeParseException if string doesn't match pattern
• Use try-catch for robust parsing

**Locale-Specific Formatting:**
• withLocale() method for internationalization
• FormatStyle enum for predefined locale styles (FULL, LONG, MEDIUM, SHORT)
• Automatically handles date/time conventions per locale`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Formatting & Parsing - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Predefined formatters
LocalDate date = LocalDate.now();
String iso = date.format(DateTimeFormatter.ISO_LOCAL_DATE);
// Output: "2023-12-25"

LocalDateTime dateTime = LocalDateTime.now();
String isoDateTime = dateTime.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
// Output: "2023-12-25T14:30:00"

// Custom patterns
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
String formatted = date.format(formatter);
// Output: "25/12/2023"

DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("hh:mm a");
String time = LocalTime.now().format(timeFormatter);
// Output: "02:30 PM"

// Parsing with custom format
String dateStr = "25/12/2023";
LocalDate parsedDate = LocalDate.parse(dateStr,
DateTimeFormatter.ofPattern("dd/MM/yyyy"));
// Result: 2023-12-25

// Locale-specific formatting
DateTimeFormatter usFormat = DateTimeFormatter.ofPattern("MMMM dd, yyyy", Locale.US);
String usDate = date.format(usFormat);
// Output: "December 25, 2023"

// Thread-safe (unlike SimpleDateFormat!)
DateTimeFormatter formatter2 = DateTimeFormatter.ofPattern("yyyy-MM-dd");
// Safe to use in multiple threads`
    },
    {
      name: 'Timezone Handling',
      icon: '🔹',
      explanation: `**Core Concept:**
• Comprehensive timezone support in java.time package
• Handles complex timezone rules and daylight saving time
• Multiple classes for different timezone needs
• Proper global time coordination

**Key Classes:**
• ZoneId - Timezone identifier (e.g., "America/New_York")
• ZoneOffset - Fixed offset from UTC (e.g., +05:00)
• ZonedDateTime - Date-time with timezone
• OffsetDateTime - Date-time with fixed offset
• Clock - Abstraction for current instant and timezone

**ZoneId:**
• Represents timezone regions from IANA timezone database
• Handles complex rules including DST transitions
• Examples: "America/New_York", "Europe/London", "Asia/Tokyo"
• ZoneId.of(String) to create
• ZoneId.systemDefault() for system timezone

**ZoneOffset:**
• Simple fixed offset from UTC
• No DST handling - just hours/minutes difference
• Examples: +05:00, -08:00, Z (UTC)
• Use when timezone rules don't matter
• Simpler than ZoneId but less powerful

**ZonedDateTime:**
• LocalDateTime + ZoneId
• Full timezone support with DST handling
• withZoneSameInstant() - Convert between timezones
• withZoneSameLocal() - Keep same local time, change zone
• Automatically adjusts for DST transitions

**Daylight Saving Time (DST):**
• Automatically handled by ZonedDateTime
• Spring forward / fall back transitions work correctly
• Gap and overlap periods handled properly
• No manual DST calculation needed

**Clock Abstraction:**
• Allows dependency injection of time source
• Clock.systemDefaultZone() - Real system clock
• Clock.fixed() - Fixed instant for testing
• Clock.offset() - Offset clock for simulation
• Essential for testable time-dependent code`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Timezone Handling - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// ZoneId - timezone identification
ZoneId newYork = ZoneId.of("America/New_York");
ZoneId tokyo = ZoneId.of("Asia/Tokyo");
ZoneId utc = ZoneId.of("UTC");

// Current time in different timezones
ZonedDateTime nyTime = ZonedDateTime.now(newYork);
ZonedDateTime tokyoTime = ZonedDateTime.now(tokyo);

// Convert between timezones
ZonedDateTime meeting = ZonedDateTime.of(
LocalDateTime.of(2023, 12, 25, 14, 0),
newYork
);
ZonedDateTime tokyoMeeting = meeting.withZoneSameInstant(tokyo);
System.out.println("NY: " + meeting);
System.out.println("Tokyo: " + tokyoMeeting);
// Output:
// NY: 2023-12-25T14:00-05:00[America/New_York]
// Tokyo: 2023-12-26T04:00+09:00[Asia/Tokyo]

// ZoneOffset - fixed offset
ZoneOffset offset = ZoneOffset.ofHours(5);
OffsetDateTime offsetTime = OffsetDateTime.now(offset);

// DST handling - automatic!
ZonedDateTime spring = ZonedDateTime.of(
LocalDateTime.of(2023, 3, 12, 2, 30),  // DST transition
newYork
);

// Clock abstraction for testing
Clock fixed = Clock.fixed(Instant.now(), ZoneId.systemDefault());
LocalDateTime testTime = LocalDateTime.now(fixed);
// Always returns same time - great for testing!`
    },
    {
      name: 'Diamond Problem',
      icon: '🔹',
      explanation: `**Core Concept:**
• Multiple inheritance ambiguity when a class implements two interfaces with same default method
• Java 8's solution to the classic "diamond problem" of multiple inheritance
• Compiler enforces explicit conflict resolution to prevent ambiguity
• Three resolution rules apply in priority order

**The Problem:**
• Class implements Interface A and Interface B
• Both interfaces provide default implementation of same method
• Which implementation should the class inherit?
• Compiler cannot automatically choose - ambiguity must be resolved

**Resolution Rules (Priority Order):**
• Rule 1: Class Implementation Wins - If the class overrides the method, it takes precedence
• Rule 2: More Specific Interface Wins - Subinterface overrides superinterface default method
• Rule 3: Explicit Override Required - If no clear winner, must explicitly override and choose
• Compiler Error - If ambiguity remains unresolved, code won't compile

**Calling Specific Interface:**
• Use InterfaceName.super.methodName() syntax
• Allows calling specific interface's default method
• Can combine multiple interface implementations
• Provides full control over method resolution

**Best Practices:**
• Always resolve conflicts explicitly for clarity
• Document which interface method you're calling
• Consider if default methods are the right design choice
• Use super calls to reuse interface implementations`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Diamond Problem - Implementation
// ═══════════════════════════════════════════════════════════════════════════

interface A {
default void hello() {
System.out.println("Hello from A");
}
}

interface B {
default void hello() {
System.out.println("Hello from B");
}
}

// Diamond problem - compiler error without resolution
class C implements A, B {
// MUST override to resolve conflict
@Override
public void hello() {
// Can call specific interface method
A.super.hello();  // Call A's hello
B.super.hello();  // Call B's hello
// Or provide own implementation
System.out.println("Hello from C");
}
}

C obj = new C();
obj.hello();
// Output:
// Hello from A
// Hello from B
// Hello from C

// More specific interface wins
interface Animal {
default void move() {
System.out.println("Animal moves");
}
}

interface Dog extends Animal {
@Override
default void move() {
System.out.println("Dog walks");
}
}

class Beagle implements Dog {
// No conflict - Dog.move() is more specific
}

Beagle beagle = new Beagle();
beagle.move();
// Output: Dog walks

// Class implementation always wins
class Pet implements Animal {
@Override
public void move() {
System.out.println("Pet moves");
}
}

class MyPet extends Pet implements Animal {
// Pet.move() wins (class over interface)
}

MyPet myPet = new MyPet();
myPet.move();
// Output: Pet moves`
    },
    {
      name: 'Evolution Strategy',
      icon: '🔹',
      explanation: `**Core Concept:**
• Default methods enable adding new functionality to interfaces without breaking existing implementations
• Solves the "interface evolution problem" that plagued Java before version 8
• Critical for Java API evolution and backward compatibility
• Allows libraries to evolve while maintaining binary compatibility

**The Problem Before Java 8:**
• Interfaces were frozen once published - couldn't add new methods
• Adding method to interface broke all existing implementations
• Led to awkward workarounds (abstract classes, adapter patterns)
• Hindered API evolution and innovation

**How Default Methods Solve It:**
• New methods added as default methods with implementation
• Existing classes automatically inherit default implementation
• No code changes required in implementing classes
• Binary compatibility maintained across versions

**Real-World Example - Collections API:**
• Java 8 added stream(), forEach(), removeIf() to Collection interface
• Thousands of existing Collection implementations didn't break
• Legacy code continued working without modification
• New functionality available to all collections instantly

**Benefits:**
• API Evolution - Libraries can add features without breaking changes
• Backward Compatibility - Old code continues to work
• Gradual Migration - Implementations can override when ready
• Reduced Boilerplate - Don't need parallel interface hierarchies

**Best Practices:**
• Use for genuinely new functionality, not core behavior
• Provide sensible default implementations
• Document that implementations may override for better performance
• Consider impact on existing implementations`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Evolution Strategy - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Before Java 8 - couldn't add methods to interfaces
interface OldCollection {
int size();
boolean isEmpty();
// Adding new method would break all implementations!
}

// Java 8+ - can evolve interfaces safely
interface ModernCollection {
// Original abstract methods
int size();
boolean isEmpty();

// New methods added in Java 8 as default
default Stream<Object> stream() {
return StreamSupport.stream(spliterator(), false);
}

default void forEach(Consumer<Object> action) {
for (Object item : this) {
action.accept(item);
}
}

default boolean removeIf(Predicate<Object> filter) {
boolean removed = false;
Iterator<Object> it = iterator();
while (it.hasNext()) {
if (filter.test(it.next())) {
it.remove();
removed = true;
}
}
return removed;
}
}

// Old implementations continue to work!
class MyOldList implements ModernCollection {
@Override
public int size() { return 0; }

@Override
public boolean isEmpty() { return true; }
// Automatically gets stream(), forEach(), removeIf()
}

// Real example: Collection interface evolution
List<String> list = new ArrayList<>();
list.stream();     // Added in Java 8
list.forEach(System.out::println); // Added in Java 8
list.removeIf(s -> s.isEmpty());// Added in Java 8
// ArrayList didn't need to change!`
    },
    {
      name: 'Use Cases',
      icon: '🔹',
      explanation: `**Core Concept:**
• Default methods serve multiple important design patterns and use cases
• Enable richer, more expressive interfaces without compromising backward compatibility
• Bridge between traditional OOP and modern functional programming
• Provide elegant solutions to common design problems

**1. API Evolution:**
• Add new methods to existing interfaces safely
• Maintain binary compatibility across library versions
• Enable gradual feature adoption
• Example: Collection.stream() added without breaking implementations

**2. Optional Functionality:**
• Provide convenience methods that implementations may override
• Offer sensible defaults that work for most cases
• Allow specialized implementations to optimize
• Reduce boilerplate in simple implementations

**3. Template Method Pattern:**
• Define algorithm structure in interface with default method
• Abstract methods define customizable steps
• Default methods orchestrate the steps
• Eliminates need for abstract base classes

**4. Utility Methods:**
• Static methods in interfaces for related functionality
• Group related utilities with the interface they support
• Alternative to separate utility classes
• Example: Comparator.naturalOrder(), Comparator.reversed()

**5. Functional Programming Bridge:**
• Compose operations with default methods
• Enable method chaining and fluent APIs
• Support functional composition patterns
• Example: Function.andThen(), Function.compose()

**Benefits:**
• Cleaner Code - Fewer abstract classes and utility classes
• Better Organization - Utilities live with related interfaces
• More Expressive - Rich interfaces with sensible defaults
• Easier Evolution - APIs can grow without breaking changes`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Use Cases - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// 1. API Evolution
interface Repository<T> {
T findById(Long id);
List<T> findAll();

// Add new functionality without breaking existing code
default Optional<T> findOptionalById(Long id) {
return Optional.ofNullable(findById(id));
}
}

// 2. Optional Functionality
interface Drawable {
void draw();

default void drawWithBorder() {
System.out.println("Drawing border");
draw();
}

default void drawWithShadow() {
draw();
System.out.println("Adding shadow");
}
}

// 3. Template Method Pattern
interface DataProcessor {
void process();  // Abstract - must implement

default void execute() {
validate();
process();    // Calls abstract method
cleanup();
}

default void validate() {
System.out.println("Validating data");
}

default void cleanup() {
System.out.println("Cleaning up");
}
}

DataProcessor processor = () -> System.out.println("Processing...");
processor.execute();
// Output:
// Validating data
// Processing...
// Cleaning up

// 4. Utility Methods
interface StringUtils {
static boolean isEmpty(String str) {
return str == null || str.isEmpty();
}

static String reverse(String str) {
return new StringBuilder(str).reverse().toString();
}
}

boolean empty = StringUtils.isEmpty("");
// Result: true
String reversed = StringUtils.reverse("hello");
// Result: "olleh"

// 5. Functional Programming Bridge
interface Processor<T> {
T process(T input);

default Processor<T> andThen(Processor<T> next) {
return input -> next.process(process(input));
}
}

Processor<String> upper = String::toUpperCase;
Processor<String> addExclaim = s -> s + "!";
Processor<String> combined = upper.andThen(addExclaim);
String result = combined.process("hello");
// Result: "HELLO!"`
    },
    {
      name: 'Async Programming',
      icon: '🔹',
      explanation: `**Core Concept:**
• CompletableFuture is an enhanced Future for asynchronous, non-blocking programming
• Represents a promise of a future value that will be computed asynchronously
• Supports callback-based completion instead of blocking get() calls
• Fundamental building block for reactive and asynchronous Java applications

**Creation Methods:**
• supplyAsync(Supplier) - Executes task that returns a value
• runAsync(Runnable) - Executes task with no return value
• completedFuture(value) - Already completed future with given value
• Can specify custom Executor or use ForkJoinPool.commonPool()

**Key Advantages Over Future:**
• Non-Blocking - Callbacks instead of blocking get()
• Composable - Chain operations functionally
• Combinable - Coordinate multiple async operations
• Exception Handling - Built-in error handling support
• Manual Completion - Can complete manually when needed

**Thread Pool:**
• Uses ForkJoinPool.commonPool() by default
• Common pool size = number of CPU cores - 1
• Can provide custom ExecutorService for control
• Different executors for different workload types (CPU-bound vs I/O-bound)

**Common Patterns:**
• Async API calls without blocking threads
• Parallel processing of independent tasks
• Non-blocking I/O operations
• Event-driven architectures
• Microservices communication

**Best Practices:**
• Use custom executor for blocking operations
• Don't block in callbacks
• Handle exceptions explicitly
• Consider timeout strategies
• Use join() instead of get() to avoid checked exceptions`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Async Programming - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// supplyAsync - returns a value
CompletableFuture<String> future1 = CompletableFuture.supplyAsync(() -> {
// Simulating expensive operation
sleep(1000);
return "Result from async task";
});

// runAsync - no return value
CompletableFuture<Void> future2 = CompletableFuture.runAsync(() -> {
System.out.println("Running async task");
sleep(1000);
});
// Output: Running async task

// Custom executor
ExecutorService executor = Executors.newFixedThreadPool(10);
CompletableFuture<String> future3 = CompletableFuture.supplyAsync(
() -> fetchData(),
executor  // Use custom thread pool
);

// Non-blocking - continues immediately
System.out.println("Task started, doing other work...");
// Output: Task started, doing other work...

// Get result when needed (blocks if not complete)
String result = future1.get();  // May throw checked exceptions
// Result: "Result from async task"
// Or use join() - throws unchecked exception
String result2 = future1.join();
// Result: "Result from async task"

// Check if done
if (future1.isDone()) {
System.out.println("Task completed!");
}
// Output: Task completed!

// Real-world example - async API call
CompletableFuture<User> userFuture = CompletableFuture.supplyAsync(() ->
restTemplate.getForObject("http://api.com/user/123", User.class)
);
// Result: User object fetched asynchronously`
    },
    {
      name: 'Composition',
      icon: '🔹',
      explanation: `**Core Concept:**
• Functional composition allows chaining async operations sequentially
• Transform and process future values without blocking
• Eliminates "callback hell" through fluent API
• Build complex workflows from simple operations

**Transformation Methods:**
• thenApply(Function) - Transform result synchronously
• thenApplyAsync(Function) - Transform result in separate thread
• Synchronous versions run in completing thread (efficient for fast operations)
• Async versions use executor (better for blocking operations)

**Chaining Methods:**
• thenCompose(Function) - Chain dependent async operations (flatMap)
• Returns CompletableFuture<U> instead of CompletableFuture<CompletableFuture<U>>
• Essential for sequential async operations where next depends on previous
• Avoids nested futures

**Combining Two Futures:**
• thenCombine(other, BiFunction) - Combine results of two independent futures
• Both futures execute in parallel
• BiFunction receives both results when complete
• Efficient parallel execution with synchronized completion

**Consuming Results:**
• thenAccept(Consumer) - Consume result without returning value
• thenRun(Runnable) - Execute action after completion, ignores result
• Async variants available (thenAcceptAsync, thenRunAsync)

**Callback Hell Solution:**
• Before: Nested callbacks with error handling at each level
• After: Flat, readable chain of operations
• Single error handling at the end
• Much easier to reason about and maintain

**Best Practices:**
• Use thenApply for quick transformations
• Use thenApplyAsync for blocking transformations
• Use thenCompose for dependent async operations
• Use thenCombine for independent parallel operations`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Composition - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// thenApply - transform result (synchronous)
CompletableFuture<Integer> future = CompletableFuture.supplyAsync(() -> "42")
.thenApply(Integer::parseInt)        // String -> Integer
.thenApply(num -> num * 2);          // Integer -> Integer
// Result: 84

// thenCompose - chain dependent async operations
CompletableFuture<User> userFuture = CompletableFuture
.supplyAsync(() -> getUserId())
.thenCompose(id -> CompletableFuture.supplyAsync(() -> fetchUser(id)))
.thenCompose(user -> CompletableFuture.supplyAsync(() -> enrichUser(user)));
// Result: enriched User object

// thenCombine - combine two independent futures
CompletableFuture<String> future1 = CompletableFuture.supplyAsync(() -> "Hello");
CompletableFuture<String> future2 = CompletableFuture.supplyAsync(() -> "World");

CompletableFuture<String> combined = future1.thenCombine(
future2,
(s1, s2) -> s1 + " " + s2
);
// Result: "Hello World"

// Complex chaining example
CompletableFuture<String> result = CompletableFuture
.supplyAsync(() -> fetchOrderId())
.thenApply(orderId -> "ORDER-" + orderId)
.thenCompose(order -> fetchOrderDetails(order))
.thenApply(details -> details.toUpperCase())
.thenApply(details -> "Processed: " + details);
// Result: "Processed: ORDER DETAILS"

// thenAccept - consume result without returning
future.thenAccept(result -> System.out.println("Got: " + result));
// Output: Got: 84

// thenRun - run action after completion
future.thenRun(() -> System.out.println("Task completed"));
// Output: Task completed`
    },
    {
      name: 'Combination',
      icon: '🔹',
      explanation: `**Core Concept:**
• Coordinate multiple CompletableFutures executing in parallel
• Wait for all, any, or specific combinations to complete
• Aggregate results from parallel operations efficiently
• Essential for complex async workflows with dependencies

**allOf() - Wait for All:**
• CompletableFuture.allOf(futures...) waits for all to complete
• Returns CompletableFuture<Void> (no combined result)
• Use thenApply/thenRun to collect results from individual futures
• All futures execute in parallel, returns when last completes
• If any fails, result future completes exceptionally

**anyOf() - Wait for First:**
• CompletableFuture.anyOf(futures...) waits for first to complete
• Returns CompletableFuture<Object> with first result
• Useful for redundant operations or racing multiple sources
• Remaining futures continue executing (not cancelled)
• First success or first failure is returned

**thenCombine() - Combine Two:**
• future1.thenCombine(future2, BiFunction) combines two independent futures
• Both execute in parallel
• BiFunction receives both results when both complete
• More efficient than allOf for just two futures

**Parallel Aggregation Pattern:**
• Launch multiple async operations simultaneously
• Use allOf() to wait for completion
• Collect results with join() (non-blocking after allOf completes)
• Common for parallel API calls or batch processing

**Use Cases:**
• Parallel API calls to multiple services
• Batch processing with aggregation
• Racing multiple data sources (caching)
• Fan-out/fan-in patterns
• Scatter-gather operations

**Best Practices:**
• Use custom executor for blocking operations
• Handle partial failures appropriately
• Consider timeout strategies for all operations
• Use join() not get() after allOf/anyOf completes
• Be aware anyOf doesn't cancel other futures`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Combination - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// allOf - wait for all futures to complete
CompletableFuture<String> future1 = CompletableFuture.supplyAsync(() -> "Task 1");
CompletableFuture<String> future2 = CompletableFuture.supplyAsync(() -> "Task 2");
CompletableFuture<String> future3 = CompletableFuture.supplyAsync(() -> "Task 3");

CompletableFuture<Void> allFutures = CompletableFuture.allOf(
future1, future2, future3
);

// Wait for all and collect results
allFutures.thenRun(() -> {
String result1 = future1.join();
String result2 = future2.join();
String result3 = future3.join();
System.out.println("All done: " + result1 + ", " + result2 + ", " + result3);
});
// Output: All done: Task 1, Task 2, Task 3

// anyOf - wait for first to complete
CompletableFuture<Object> firstDone = CompletableFuture.anyOf(
future1, future2, future3
);
firstDone.thenAccept(result ->
System.out.println("First result: " + result)
);
// Output: First result: Task 1 (whichever completes first)

// Parallel API calls with aggregation
List<String> urls = Arrays.asList("url1", "url2", "url3");
List<CompletableFuture<String>> futures = urls.stream()
.map(url -> CompletableFuture.supplyAsync(() -> fetchData(url)))
.collect(Collectors.toList());

CompletableFuture<List<String>> allResults = CompletableFuture
.allOf(futures.toArray(new CompletableFuture[0]))
.thenApply(v -> futures.stream()
.map(CompletableFuture::join)
.collect(Collectors.toList())
);
// Result: List of all fetched data`
    },
    {
      name: 'Completion',
      icon: '🔹',
      explanation: `**Core Concept:**
• Manual completion allows external control of CompletableFuture lifecycle
• Check completion status and retrieve results multiple ways
• Support for cancellation and exceptional completion
• Essential for bridging callback-based APIs to CompletableFuture

**Manual Completion Methods:**
• complete(value) - Complete successfully with given value
• completeExceptionally(Throwable) - Complete with exception
• Returns true if this call completed the future, false if already complete
• Useful for custom async operations and callbacks

**Status Checking:**
• isDone() - Returns true if completed (normally, exceptionally, or cancelled)
• isCancelled() - Returns true if cancelled before completion
• isCompletedExceptionally() - Returns true if completed with exception or cancelled
• Non-blocking status queries

**Retrieving Results:**
• get() - Blocks until complete, throws checked exceptions (ExecutionException, InterruptedException)
• get(timeout, TimeUnit) - Blocks with timeout, throws TimeoutException
• join() - Blocks until complete, throws unchecked CompletionException
• getNow(defaultValue) - Returns value if complete, otherwise returns default (non-blocking)

**Cancellation:**
• cancel(mayInterruptIfRunning) - Attempts to cancel execution
• Returns true if successfully cancelled
• Future completes with CancellationException
• Does not guarantee task stops (depends on implementation)

**Timeout Support (Java 9+):**
• orTimeout(timeout, unit) - Completes exceptionally if timeout exceeded
• completeOnTimeout(value, timeout, unit) - Completes with value if timeout exceeded
• Essential for preventing indefinite waits

**Use Cases:**
• Bridging callback APIs to futures
• Manual result injection for testing
• Implementing custom async operations
• Polling operations with completion logic
• Timeout and cancellation strategies`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Completion - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Manual completion
CompletableFuture<String> future = new CompletableFuture<>();

// Complete from another thread
new Thread(() -> {
sleep(1000);
future.complete("Manual result");
}).start();

// Or complete exceptionally
future.completeExceptionally(new RuntimeException("Failed!"));

// Check status
boolean done = future.isDone();
// Result: true if complete
boolean cancelled = future.isCancelled();
// Result: true if cancelled
boolean exceptional = future.isCompletedExceptionally();
// Result: true if completed with exception

// Cancel the future
boolean cancelled = future.cancel(true);
// Result: true if successfully cancelled

// Get result with timeout
try {
String result = future.get(5, TimeUnit.SECONDS);
// Result: "Manual result" or throws TimeoutException
} catch (TimeoutException e) {
System.out.println("Timed out");
}

// join() - unchecked exception
String result = future.join();  // Throws CompletionException
// Result: "Manual result"

// getNow() - return default if not complete
String result = future.getNow("default value");
// Result: "default value" if not complete yet

// Real-world example - polling with timeout
CompletableFuture<String> pollTask = new CompletableFuture<>();

ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
scheduler.scheduleAtFixedRate(() -> {
String status = checkStatus();
if ("COMPLETE".equals(status)) {
pollTask.complete(status);
}
}, 0, 1, TimeUnit.SECONDS);

// Timeout after 30 seconds
pollTask.orTimeout(30, TimeUnit.SECONDS)
.exceptionally(ex -> "TIMEOUT");
// Result: "COMPLETE" or "TIMEOUT"`
    },
    {
      name: 'JavaScript Engine',
      icon: '🔹',
      explanation: `**Core Concept:**
• Nashorn is a high-performance JavaScript engine introduced in Java 8
• Replaced the older Rhino JavaScript engine
• Executes JavaScript code from within Java applications
• Implements ECMAScript 5.1 specification fully

**Key Features:**
• JIT Compilation - Uses invokedynamic for better performance than Rhino
• javax.script API - Standard Java scripting interface
• Lightweight - No external dependencies required
• Interoperability - Seamless Java-JavaScript integration
• ECMAScript 5.1 - Modern JavaScript features (strict mode, JSON, etc.)

**Invocation Methods:**
• ScriptEngine API - Standard javax.script.ScriptEngine interface
• jjs Command Line Tool - Interactive REPL and script execution
• Direct Evaluation - engine.eval(String) for JavaScript code
• File Execution - engine.eval(FileReader) for JavaScript files

**Performance:**
• 2-10x faster than Rhino for most operations
• Uses Java's JIT compiler optimizations
• Efficient memory usage
• Better garbage collection integration

**Use Cases:**
• Scripting in Java applications
• Dynamic configuration and rules engines
• Template processing
• Build tools and automation
• Testing and mocking
• Extending applications with JavaScript plugins

**Limitations:**
• ECMAScript 5.1 only (no ES6+ features)
• Not suitable for frontend JavaScript (browser APIs)
• Deprecated in Java 11, removed in Java 15
• Replaced by GraalVM for modern JavaScript support`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ JavaScript Engine - Implementation
// ═══════════════════════════════════════════════════════════════════════════

import javax.script.*;

// Get Nashorn engine
ScriptEngine engine = new ScriptEngineManager().getEngineByName("nashorn");

// Execute JavaScript code
engine.eval("print('Hello from JavaScript')");
// Output: Hello from JavaScript

// Evaluate expressions
Object result = engine.eval("2 + 2");
System.out.println("Result: " + result);
// Output: Result: 4

// Define JavaScript function
engine.eval(
"function greet(name) {" +
"  return 'Hello, ' + name;" +
"}"
);

// Call JavaScript function from Java
Invocable invocable = (Invocable) engine;
Object greeting = invocable.invokeFunction("greet", "World");
System.out.println(greeting);
// Output: Hello, World

// Execute JavaScript file
engine.eval(new FileReader("script.js"));

// Access JavaScript objects
engine.eval("var person = { name: 'Alice', age: 30 }");
ScriptObjectMirror person = (ScriptObjectMirror) engine.get("person");
System.out.println(person.get("name"));
// Output: Alice

// Set variables from Java
engine.put("javaVar", "Value from Java");
engine.eval("print(javaVar)");
// Output: Value from Java`
    },
    {
      name: 'Java-JavaScript Interop',
      icon: '🔹',
      explanation: `**Core Concept:**
• Bidirectional interoperability between Java and JavaScript code
• Call Java methods from JavaScript and vice versa
• Share objects and data between both languages seamlessly
• Enables powerful scripting and extension capabilities

**Java to JavaScript:**
• engine.put(name, object) - Pass Java object to JavaScript
• JavaScript can access public fields and methods
• Java objects maintain their type and behavior
• Collections, primitives, and custom objects supported

**JavaScript to Java:**
• engine.get(name) - Retrieve JavaScript object in Java
• Invocable.invokeFunction(name, args) - Call JavaScript function from Java
• ScriptObjectMirror - Java wrapper for JavaScript objects
• Type conversion handled automatically

**Creating Java Objects from JavaScript:**
• Java.type('fully.qualified.ClassName') - Get Java class in JavaScript
• new ClassName() - Create Java instance from JavaScript
• Access static methods and fields
• Full Java reflection capabilities available

**Implementing Java Interfaces:**
• JavaScript objects can implement Java interfaces
• Enables callbacks and event handlers
• Duck typing - JavaScript object with matching methods works
• Runnable, Callable, and custom interfaces supported

**Data Type Conversion:**
• Primitives - Automatic conversion between Java and JavaScript
• Strings - Seamless string passing
• Arrays - JavaScript arrays map to Java arrays/collections
• null/undefined - Both map to Java null

**Use Cases:**
• Plugin systems with JavaScript extensions
• Dynamic rule engines and configuration
• Template engines with Java data
• Testing with JavaScript-based mocks
• Scripting business logic
• Custom DSLs for non-developers

**Best Practices:**
• Minimize data crossing between languages for performance
• Use Java.type() for accessing Java classes efficiently
• Handle exceptions from both languages
• Be aware of threading model differences`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Java-JavaScript Interop - Implementation
// ═══════════════════════════════════════════════════════════════════════════

ScriptEngine engine = new ScriptEngineManager().getEngineByName("nashorn");

// Pass Java object to JavaScript
List<String> javaList = new ArrayList<>();
javaList.add("Item 1");
javaList.add("Item 2");
engine.put("list", javaList);

// Access Java object from JavaScript
engine.eval("list.add('Item 3')");
engine.eval("print(list.size())");
// Output: 3

// Create Java objects from JavaScript
engine.eval(
"var ArrayList = Java.type('java.util.ArrayList');" +
"var list2 = new ArrayList();" +
"list2.add('JavaScript item');"
);

// Call static Java methods
engine.eval(
"var System = Java.type('java.lang.System');" +
"System.out.println('From JavaScript');"
);
// Output: From JavaScript

// Implement Java interface in JavaScript
engine.eval(
"var Runnable = Java.type('java.lang.Runnable');" +
"var runner = new Runnable() {" +
"  run: function() {" +
"    print('Running from JavaScript');" +
"  }" +
"};"
);

Runnable runner = (Runnable) engine.get("runner");
new Thread(runner).start();
// Output: Running from JavaScript

// Use Java libraries in JavaScript
engine.eval(
"var Files = Java.type('java.nio.file.Files');" +
"var Paths = Java.type('java.nio.file.Paths');" +
"var content = Files.readAllLines(Paths.get('data.txt'));"
);
// Result: content contains lines from data.txt`
    },
    {
      name: 'Command Line Tool',
      icon: '🔹',
      explanation: `**Core Concept:**
• jjs is Nashorn's command-line tool for executing JavaScript outside Java code
• Provides interactive REPL (Read-Eval-Print Loop) for JavaScript experimentation
• Supports scripting with shebang for executable JavaScript files
• Full access to Java APIs from command line

**Execution Modes:**
• File Execution - jjs script.js to run JavaScript files
• Inline Execution - jjs -e "code" to execute JavaScript directly
• REPL Mode - jjs with no arguments for interactive shell
• Shebang Scripts - #!/usr/bin/jjs for executable scripts

**REPL Features:**
• Interactive JavaScript console
• Immediate code evaluation and results
• Tab completion for Java classes
• Multi-line input support
• Access to command history

**Script Arguments:**
• $ARG array contains command-line arguments
• Arguments passed after -- separator
• $ARG[0], $ARG[1], etc. for individual arguments
• $ENV for environment variables

**Loading External Resources:**
• load('file.js') - Load local JavaScript files
• load('http://url/script.js') - Load remote scripts
• Useful for including libraries and shared code
• Multiple loads compose together

**Java Access:**
• Java.type() available in all modes
• Full Java API accessible
• Create objects, call methods, access static members
• Same interoperability as ScriptEngine API

**Use Cases:**
• Quick scripting and automation tasks
• Testing JavaScript code with Java APIs
• Building command-line tools with JavaScript
• Learning and experimenting with Nashorn
• Prototyping before embedding in Java

**Limitations:**
• Deprecated along with Nashorn
• Not available in Java 15+
• Limited to ECMAScript 5.1
• Replaced by modern JavaScript runtimes (Node.js, Deno)`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Command Line Tool - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Execute JavaScript file
// $ jjs script.js

// REPL mode
// $ jjs
// jjs> var x = 10;
// jjs> print(x * 2);
// Output: 20

// Shebang support (Linux/Mac)
// script.js:
#!/usr/bin/jjs

var name = $ARG[0] || "World";
print("Hello, " + name);

// Make executable and run:
// $ chmod +x script.js
// $ ./script.js Alice
// Output: Hello, Alice

// Access Java from command line
// $ jjs
// jjs> var ArrayList = Java.type('java.util.ArrayList')
// jjs> var list = new ArrayList()
// jjs> list.add("test")
// jjs> print(list.size())
// Output: 1

// Load JavaScript libraries
// load('library.js')
// load('https://code.jquery.com/jquery.min.js')

// Execute inline JavaScript
// $ jjs -e "print('Hello World')"
// Output: Hello World

// Pass arguments
// script.js:
print("Arguments: " + $ARG);
for (var i in $ARG) {
print("Arg " + i + ": " + $ARG[i]);
}

// $ jjs script.js -- arg1 arg2 arg3
// Output:
// Arguments: arg1,arg2,arg3
// Arg 0: arg1
// Arg 1: arg2
// Arg 2: arg3`
    },
    {
      name: 'Deprecated Notice',
      icon: '🔹',
      explanation: `**Core Concept:**
• Nashorn was deprecated in Java 11 (2018) and completely removed in Java 15 (2020)
• Replaced by GraalVM JavaScript engine with better performance and modern features
• Represents shift from bundled scripting to external polyglot runtimes
• Important for understanding Java 8 legacy code

**Deprecation Timeline:**
• Java 8 (2014) - Nashorn introduced, replacing Rhino
• Java 8-10 (2014-2018) - Active development and use
• Java 11 (2018) - Deprecated for removal
• Java 15 (2020) - Completely removed from JDK
• 6 years of active lifecycle

**Reasons for Deprecation:**
• Maintenance Burden - Significant effort to maintain JavaScript engine
• Limited ECMAScript Support - Stuck at ES5.1, no ES6+ features
• Better Alternatives - GraalVM offers superior performance and modern JavaScript
• Polyglot Vision - Shift to external, specialized language runtimes
• Security Concerns - Additional attack surface for applications

**Migration Path:**
• GraalVM JavaScript - Drop-in replacement with better performance
• GraalVM Polyglot API - Modern API supporting multiple languages
• External Runtimes - Node.js, Deno for JavaScript execution
• Alternative JVM Languages - Kotlin, Scala for JVM scripting needs

**GraalVM Advantages:**
• Modern JavaScript - Full ES6+ support including modules, async/await
• Better Performance - 2-10x faster than Nashorn
• Polyglot Support - JavaScript, Python, Ruby, R in one runtime
• Ahead-of-Time Compilation - Native image support

**Historical Significance:**
• Enabled scripting in enterprise Java applications
• Used in build tools (Gradle), testing frameworks
• Template engines and rule engines relied on it
• Configuration scripting in many frameworks
• Learning tool for JavaScript-Java integration

**Legacy Code:**
• Many Java 8-10 applications still use Nashorn
• Consider migration when upgrading to Java 11+
• javax.script API still available for other engines
• GraalVM can run most Nashorn code with minimal changes`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Deprecated Notice - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Nashorn lifecycle
// Java 8 (2014) - Introduced as modern JavaScript engine
ScriptEngine engine = new ScriptEngineManager()
.getEngineByName("nashorn");
engine.eval("print('Nashorn active')");
// Output: Nashorn active

// Java 11 (2018) - Deprecated
// Warning: Nashorn engine is planned for removal from a future JDK release
// jdk.nashorn.api.scripting package deprecated

// Java 15 (2020) - Removed
// Nashorn no longer available

// Migration path to GraalVM
// 1. Use GraalVM JavaScript engine (better performance)
// 2. Implements modern ECMAScript standards
// 3. Polyglot API for multiple languages

// GraalVM example (replacement)
import org.graalvm.polyglot.*;

Context context = Context.create("js");
Value result = context.eval("js", "2 + 2");
System.out.println(result.asInt());
// Output: 4

// Why deprecated?
// 1. Maintenance burden
// 2. Limited to ECMAScript 5.1
// 3. GraalVM offers better performance
// 4. GraalVM supports modern JavaScript (ES6+)

// Historical significance:
// - Enabled scripting in Java applications
// - Used in build tools, testing frameworks
// - Template engines, rule engines
// - Configuration scripts

// Legacy code may still use it in Java 8-10 projects`
    },
    {
      name: 'PermGen Removal',
      icon: '🔹',
      explanation: `**Core Concept:**
• Permanent Generation (PermGen) space removed in Java 8
• Replaced with Metaspace which uses native memory instead of heap
• Eliminates notorious "OutOfMemoryError: PermGen space" errors
• Major architectural improvement in JVM memory management

**PermGen Problems (Before Java 8):**
• Fixed size heap space for class metadata and interned strings
• OutOfMemoryError: PermGen space very common in app servers
• Required manual tuning with -XX:PermSize and -XX:MaxPermSize
• Difficult to predict correct size for applications
• Class unloading complicated and often failed

**Metaspace Solution (Java 8+):**
• Stores class metadata in native memory, not heap
• No fixed maximum size by default (limited by system memory)
• Automatic size management based on application needs
• Better garbage collection of class metadata
• Configured with -XX:MetaspaceSize and -XX:MaxMetaspaceSize

**What's Stored in Metaspace:**
• Class definitions and structures
• Method metadata
• Field metadata
• Constant pools
• Annotations
• JIT compiled code (code cache)

**Benefits:**
• No More PermGen Errors - Eliminated a major source of OutOfMemoryError
• Automatic Sizing - Grows and shrinks as needed
• Better for Dynamic Class Loading - Frameworks like Spring benefit
• Simpler Configuration - Less manual tuning required
• Improved Performance - Better garbage collection

**Migration Considerations:**
• Remove -XX:PermSize/-XX:MaxPermSize JVM args
• Add -XX:MetaspaceSize/-XX:MaxMetaspaceSize if needed
• Monitor native memory usage, not just heap
• Most applications work without changes
• Some monitoring tools need updates

**Best Practices:**
• Set MaxMetaspaceSize only if you need hard limits
• Monitor metaspace usage via JMX or JFR
• Be aware metaspace uses native memory
• Consider total system memory, not just heap`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ PermGen Removal - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Before Java 8 - PermGen issues
// JVM args: -XX:PermSize=64m -XX:MaxPermSize=256m
// OutOfMemoryError: PermGen space (common in app servers)

// Java 8+ - Metaspace (native memory)
// JVM args: -XX:MetaspaceSize=64m -XX:MaxMetaspaceSize=256m
// No more PermGen errors!

// Monitoring Metaspace
import java.lang.management.*;

MemoryPoolMXBean metaspacePool = ManagementFactory
.getMemoryPoolMXBeans()
.stream()
.filter(pool -> pool.getName().equals("Metaspace"))
.findFirst()
.orElse(null);

if (metaspacePool != null) {
MemoryUsage usage = metaspacePool.getUsage();
System.out.println("Metaspace used: " + usage.getUsed() / (1024 * 1024) + " MB");
System.out.println("Metaspace max: " + usage.getMax() / (1024 * 1024) + " MB");
}
// Output:
// Metaspace used: 25 MB
// Metaspace max: 256 MB

// Benefits:
// 1. No fixed size limit (uses native memory)
// 2. Automatic class metadata cleanup
// 3. Better for dynamic class loading
// 4. Fewer memory configuration issues

// Class metadata now in Metaspace:
// - Class structures
// - Method metadata
// - Field metadata
// - Constant pools
// - Annotations

// Example: Dynamic class loading
ClassLoader loader = new URLClassLoader(urls);
for (int i = 0; i < 10000; i++) {
Class<?> clazz = loader.loadClass("DynamicClass" + i);
// In Java 7: would eventually hit PermGen limit
// In Java 8+: Metaspace grows automatically
}`
    },
    {
      name: 'Parallel Operations',
      icon: '🔹',
      explanation: `**Core Concept:**
• Java 8 introduced parallel operations to leverage multi-core processors efficiently
• Arrays.parallelSort() performs sorting using multiple threads
• Parallel streams automatically distribute work across cores
• ForkJoinPool enhancements enable better task parallelism

**Arrays.parallelSort():**
• Parallel merge sort algorithm using ForkJoinPool
• Significantly faster for large arrays on multi-core systems
• 2-4x speedup typical on 4+ core machines
• Automatically decides when parallelism is beneficial
• Supports custom comparators and partial array sorting

**Parallel Streams:**
• collection.parallelStream() or stream().parallel()
• Work distributed across ForkJoinPool.commonPool()
• Automatic work-stealing for load balancing
• Best for CPU-intensive operations on large datasets
• Not always faster - has overhead for small datasets

**ForkJoinPool Improvements:**
• Enhanced work-stealing algorithm
• Better load balancing across threads
• Reduced contention and synchronization overhead
• Default pool size = number of CPU cores
• Custom pools supported for fine-grained control

**When to Use Parallel Operations:**
• Large datasets (thousands+ elements)
• CPU-intensive operations (computation, not I/O)
• Independent operations (no shared state)
• Multi-core machines available
• Performance critical code paths

**When NOT to Use:**
• Small datasets (parallelization overhead > benefit)
• I/O-bound operations (threads blocked on I/O)
• Shared mutable state (synchronization kills performance)
• Order-sensitive operations requiring sequential processing
• Operations already fast enough

**Common Pitfalls:**
• Thread Safety - Ensure operations are thread-safe
• Shared State - Avoid mutable shared state in parallel operations
• Boxing Overhead - Use primitive streams for numeric operations
• Over-Parallelization - Not everything benefits from parallelism

**Best Practices:**
• Measure performance - parallel isn't always faster
• Use for stateless, independent operations
• Avoid side effects in parallel stream operations
• Consider custom ForkJoinPool for control
• Use primitive streams (IntStream, etc.) when possible`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Parallel Operations - Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Arrays.parallelSort() - parallel sorting
int[] array = new int[1000000];
Arrays.fill(array, (int) (Math.random() * 1000));

// Sequential sort
long start = System.currentTimeMillis();
Arrays.sort(array.clone());
long sequential = System.currentTimeMillis() - start;

// Parallel sort - uses ForkJoinPool
start = System.currentTimeMillis();
Arrays.parallelSort(array);
long parallel = System.currentTimeMillis() - start;
System.out.println("Sequential: " + sequential + "ms");
System.out.println("Parallel: " + parallel + "ms");
// Output:
// Sequential: 120ms
// Parallel: 35ms
// Parallel is typically 2-4x faster

// Parallel sort with custom comparator
String[] strings = {"zebra", "apple", "banana", "cherry"};
Arrays.parallelSort(strings, String::compareToIgnoreCase);
// Result: ["apple", "banana", "cherry", "zebra"]

// Parallel sort with range
Arrays.parallelSort(array, 0, array.length / 2);
// Result: first half sorted, second half unchanged

// ForkJoinPool improvements
ForkJoinPool pool = new ForkJoinPool(8);  // 8 threads

// Custom RecursiveTask
class SumTask extends RecursiveTask<Long> {
private int[] array;
private int start, end;
private static final int THRESHOLD = 1000;

public SumTask(int[] array, int start, int end) {
this.array = array;
this.start = start;
this.end = end;
}

@Override
protected Long compute() {
if (end - start <= THRESHOLD) {
// Direct computation
long sum = 0;
for (int i = start; i < end; i++) {
sum += array[i];
}
return sum;
} else {
// Split task
int mid = (start + end) / 2;
SumTask left = new SumTask(array, start, mid);
SumTask right = new SumTask(array, mid, end);
left.fork();  // Async execution
long rightResult = right.compute();
long leftResult = left.join();
return leftResult + rightResult;
}
}
}

Long sum = pool.invoke(new SumTask(array, 0, array.length));
// Result: sum of all array elements`
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
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
            }}
          >
            ← Back to Menu
          </button>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '800',
            color: '#1f2937',
            margin: 0,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
            🚀 Java 8 Features
          </h1>
          {currentSubcategory && (
            <span style={{
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
              fontWeight: '600',
              backgroundColor: '#dbeafe',
              color: '#1e40af',
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
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
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
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
            >
              {nextName} →
            </button>
          )}
        </div>
      </div>

      <div style={{
        backgroundColor: 'rgba(16, 185, 129, 0.05)',
        padding: '2.5rem 10rem',
        borderRadius: '16px',
        border: '3px solid rgba(16, 185, 129, 0.3)',
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
          Explore the revolutionary features of Java 8 including Lambdas, Streams API, Optional, and functional programming capabilities.
        </p>
      </div>

      {/* Show categories first */}
      {!selectedCategory && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem'
        }}>
          {categories.map((category, index) => (
            <button
              key={category.id}
              ref={el => categoryRefs.current[index] = el}
              onClick={() => {
                setSelectedCategory(category);
                setFocusedConceptIndex(0);
                // Set first concept as selected
                setSelectedConcept(concepts[category.conceptIds[0]]);
              }}
              tabIndex={0}
              aria-label={`${category.name} - ${category.description}`}
              style={{
                padding: '2rem',
                backgroundColor: `${category.color}10`,
                border: focusedCategoryIndex === index && isKeyboardUser ? `3px solid ${category.color}` : `3px solid ${category.color}40`,
                outline: focusedCategoryIndex === index && isKeyboardUser ? `2px solid ${category.color}` : 'none',
                outlineOffset: '2px',
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                width: '100%',
                textAlign: 'left'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.15)'
                e.currentTarget.style.borderColor = `${category.color}80`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                e.currentTarget.style.borderColor = `${category.color}40`
              }}
            >
              <div style={{ fontSize: '3.5rem', marginBottom: '1rem', textAlign: 'center' }}>
                {category.icon}
              </div>
              <h3 style={{
                fontSize: '1.75rem',
                fontWeight: '700',
                color: category.color,
                marginBottom: '0.75rem',
                textAlign: 'center'
              }}>
                {category.name}
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#6b7280',
                lineHeight: '1.6',
                textAlign: 'center',
                marginBottom: '1rem'
              }}>
                {category.description}
              </p>
              <p style={{
                fontSize: '0.85rem',
                color: category.color,
                fontWeight: '600',
                textAlign: 'center'
              }}>
                {category.conceptIds.length} {category.conceptIds.length === 1 ? 'concept' : 'concepts'}
              </p>
            </button>
          ))}
        </div>
      )}


      {/* Show selected concept details in modal with sidebar */}
      {selectedConcept && selectedCategory && (
        <div
          onClick={() => {
            setSelectedConcept(null)
            setSelectedCategory(null)
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem',
            overflowY: 'auto'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '1400px',
              width: '100%',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              border: `3px solid ${selectedCategory.color}`,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{
              backgroundColor: `${selectedCategory.color}`,
              padding: '1.5rem 2rem',
              borderBottom: `3px solid ${selectedCategory.color}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexShrink: 0
            }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: 'white',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                {selectedCategory.icon} {selectedCategory.name}
              </h2>
              <button
                onClick={() => {
                  setSelectedConcept(null)
                  setSelectedCategory(null)
                }}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: '2px solid white',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
                }}
              >
                ✕
              </button>
            </div>

            {/* Content with sidebar */}
            <div style={{
              display: 'flex',
              flex: 1,
              overflow: 'hidden'
            }}>
              {/* Left sidebar with all concepts */}
              <div style={{
                width: '300px',
                flexShrink: 0,
                backgroundColor: '#f9fafb',
                borderRight: `2px solid ${selectedCategory.color}40`,
                overflowY: 'auto',
                padding: '1.5rem'
              }}>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: '700',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '1rem',
                  marginTop: 0
                }}>
                  Concepts
                </h3>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}>
                  {selectedCategory.conceptIds.map((conceptId) => {
                    const concept = concepts[conceptId]
                    const isActive = selectedConcept?.name === concept.name
                    return (
                      <button
                        key={conceptId}
                        onClick={() => handleConceptClick(concept)}
                        style={{
                          padding: '0.75rem 1rem',
                          backgroundColor: isActive
                            ? `${selectedCategory.color}20`
                            : 'white',
                          borderRadius: '8px',
                          border: isActive
                            ? `2px solid ${selectedCategory.color}`
                            : '2px solid transparent',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          textAlign: 'left',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.backgroundColor = '#f3f4f6'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.backgroundColor = 'white'
                          }
                        }}
                      >
                        <span style={{ fontSize: '1.25rem' }}>{concept.icon || '🔹'}</span>
                        <span style={{
                          fontWeight: isActive ? '700' : '600',
                          color: isActive ? selectedCategory.color : '#374151',
                          fontSize: '0.9rem'
                        }}>
                          {concept.name}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Right content area */}
              <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '2rem'
              }}>
                <h3 style={{
                  fontSize: '1.75rem',
                  fontWeight: '700',
                  color: selectedCategory.color,
                  marginTop: 0,
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  {selectedConcept.icon || '🔹'} {selectedConcept.name}
                </h3>

                <div style={{
                  backgroundColor: `${selectedCategory.color}10`,
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: `2px solid ${selectedCategory.color}40`,
                  marginBottom: '2rem'
                }}>
                  {selectedConcept.explanation.split('\n\n').map((section, idx) => {
                    // Check if this is a section header (starts with **)
                    if (section.startsWith('**') && section.includes(':**')) {
                      const headerMatch = section.match(/\*\*(.*?):\*\*/)
                      if (headerMatch) {
                        const header = headerMatch[1]
                        const content = section.substring(headerMatch[0].length).trim()

                        return (
                          <div key={idx} style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{
                              fontSize: '1.1rem',
                              fontWeight: '700',
                              color: selectedCategory.color,
                              marginBottom: '0.75rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem'
                            }}>
                              <span style={{
                                width: '4px',
                                height: '20px',
                                backgroundColor: selectedCategory.color,
                                borderRadius: '2px'
                              }}></span>
                              {header}
                            </h3>
                            <div style={{
                              paddingLeft: '1.25rem',
                              color: '#4b5563',
                              fontSize: '0.95rem',
                              lineHeight: '1.8'
                            }}>
                              {content.split('\n').map((line, lineIdx) => {
                                // Handle bullet points
                                if (line.trim().startsWith('•')) {
                                  const bulletContent = line.trim().substring(1).trim()
                                  // Check if it has a dash separator (e.g., "name - description")
                                  const dashMatch = bulletContent.match(/^(.*?)\s*-\s*(.*)$/)

                                  if (dashMatch) {
                                    return (
                                      <div key={lineIdx} style={{
                                        display: 'flex',
                                        marginBottom: '0.5rem',
                                        paddingLeft: '0.5rem'
                                      }}>
                                        <span style={{
                                          color: selectedCategory.color,
                                          marginRight: '0.75rem',
                                          fontWeight: '600',
                                          flexShrink: 0
                                        }}>•</span>
                                        <span>
                                          <strong style={{ color: '#1f2937' }}>{dashMatch[1]}</strong>
                                          <span style={{ color: '#6b7280' }}> - {dashMatch[2]}</span>
                                        </span>
                                      </div>
                                    )
                                  } else {
                                    return (
                                      <div key={lineIdx} style={{
                                        display: 'flex',
                                        marginBottom: '0.5rem',
                                        paddingLeft: '0.5rem'
                                      }}>
                                        <span style={{
                                          color: selectedCategory.color,
                                          marginRight: '0.75rem',
                                          fontWeight: '600',
                                          flexShrink: 0
                                        }}>•</span>
                                        <span style={{ color: '#374151' }}>{bulletContent}</span>
                                      </div>
                                    )
                                  }
                                }
                                // Handle sub-bullets (indented with -)
                                else if (line.trim().startsWith('-')) {
                                  const subBulletContent = line.trim().substring(1).trim()
                                  return (
                                    <div key={lineIdx} style={{
                                      display: 'flex',
                                      marginBottom: '0.4rem',
                                      paddingLeft: '2rem'
                                    }}>
                                      <span style={{
                                        color: '#6b7280',
                                        marginRight: '0.75rem',
                                        fontSize: '0.9rem',
                                        flexShrink: 0
                                      }}>◦</span>
                                      <span style={{ color: '#4b5563', fontSize: '0.9rem' }}>{subBulletContent}</span>
                                    </div>
                                  )
                                }
                                // Regular text
                                else if (line.trim()) {
                                  return (
                                    <div key={lineIdx} style={{ marginBottom: '0.5rem', color: '#374151' }}>
                                      {line}
                                    </div>
                                  )
                                }
                                return null
                              })}
                            </div>
                          </div>
                        )
                      }
                    }
                    return null
                  })}
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
                            backgroundColor: '#1e293b',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            border: '2px solid #334155'
                          }}>
                            <button
                              onClick={() => toggleSection(sectionKey)}
                              style={{
                                width: '100%',
                                padding: '1rem 1.5rem',
                                backgroundColor: '#334155',
                                border: 'none',
                                color: '#60a5fa',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                transition: 'all 0.2s ease'
                              }}
                            >
                              <span>💻 {section.title}</span>
                              <span style={{ fontSize: '1.2rem' }}>
                                {isExpanded ? '▼' : '▶'}
                              </span>
                            </button>

                            {isExpanded && (
                              <div>
                                <SyntaxHighlighter code={section.code} />
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div style={{
                      backgroundColor: '#1e293b',
                      borderRadius: '12px',
                      border: '2px solid #334155',
                      overflow: 'hidden'
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

export default Java8
