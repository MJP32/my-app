import { useState, useEffect } from 'react'

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

function Java8({ onBack }) {
  const [selectedConcept, setSelectedConcept] = useState(null)
  const [expandedSections, setExpandedSections] = useState({})

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

    return sections
  }

  const handleConceptClick = (concept) => {
    setSelectedConcept(concept)
  }

  // Keyboard navigation - Escape to deselect
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedConcept) {
        setSelectedConcept(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedConcept])

  const concepts = [
    {
      name: 'Syntax & Structure',
      icon: '🔹',
      explanation: `Lambda expressions provide a concise way to represent anonymous functions. Syntax: (parameters) -> expression or (parameters) -> { statements; }. Enable functional programming style in Java, reducing boilerplate code significantly.`,
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
      explanation: `Lambdas work with functional interfaces (interfaces with single abstract method). Common ones: Predicate<T>, Function<T,R>, Consumer<T>, Supplier<T>, BiFunction<T,U,R>. @FunctionalInterface annotation ensures interface has exactly one abstract method.`,
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
      explanation: `Shorthand notation for lambdas that call existing methods. Four types: static methods (Class::staticMethod), instance methods (instance::instanceMethod), constructor references (Class::new), and arbitrary object instance methods (Class::instanceMethod).`,
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
      explanation: `Lambdas can capture variables from enclosing scope (closure). Captured variables must be effectively final. Enables powerful functional composition patterns while maintaining thread safety.`,
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
      explanation: `Event handlers, collection processing, asynchronous callbacks, custom sorting, conditional filtering, and anywhere anonymous classes were used. Makes code more readable and maintainable.`,
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
      explanation: `map() transforms each element in the stream using a function. One-to-one transformation where each input produces exactly one output. Essential for data transformation pipelines.`,
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
      explanation: `flatMap() transforms each element into a stream and flattens all streams into one. One-to-many transformation. Essential for working with nested collections and optional values.`,
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
      explanation: `Teeing collector allows you to apply two different collectors to the same stream and combine their results. Process stream elements with two collectors simultaneously and merge results with a function.`,
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
      explanation: `Streams provide declarative way to process collections. Intermediate operations (filter, map, flatMap, distinct, sorted, limit, skip) return streams for chaining. Terminal operations (forEach, collect, reduce, count, anyMatch) produce results.`,
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
      explanation: `Intermediate operations are lazy - not executed until terminal operation called. Enables optimization and short-circuit evaluation. Streams process elements on-demand, improving performance for large datasets.`,
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
      explanation: `parallelStream() enables parallel processing using ForkJoinPool. Automatically splits data, processes in parallel, and combines results. Best for CPU-intensive operations on large datasets. Be aware of thread safety and ordering.`,
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
      explanation: `Collectors.toList(), toSet(), toMap(), groupingBy(), partitioningBy(), joining(), summarizing statistics. Custom collectors can be created for specialized aggregations. Powerful tool for data transformation.`,
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
      explanation: `Create from collections (list.stream()), arrays (Arrays.stream()), values (Stream.of()), ranges (IntStream.range()), files (Files.lines()), or custom sources. Infinite streams with Stream.generate() and Stream.iterate().`,
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
      explanation: `IntStream, LongStream, DoubleStream for primitive types. Avoid boxing overhead and provide specialized methods like sum(), average(), max(), min(). Methods like mapToInt() convert from object streams.`,
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
      explanation: `Container object that may or may not contain non-null value. Explicitly represents absence of value, replacing null references. Reduces NullPointerExceptions and makes null-handling explicit in API.`,
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
      explanation: `Optional.of(value) for non-null values, Optional.ofNullable(value) for potentially null values, Optional.empty() for empty optional. Throws NullPointerException if Optional.of() receives null.`,
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
      explanation: `get() retrieves value (throws if empty), orElse(default) provides default value, orElseGet(supplier) lazily provides default, orElseThrow() throws custom exception. isPresent() checks if value exists.`,
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
      explanation: `map() transforms contained value, flatMap() transforms to another Optional, filter() conditionally keeps value. Enables functional chaining for null-safe operations without explicit null checks.`,
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
      explanation: `Use as return types, not fields or parameters. Never return null Optional. Avoid get() without checking isPresent(). Prefer orElse/orElseGet over isPresent() + get(). Use ifPresent() for side effects.`,
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
      explanation: `LocalDate (date without time), LocalTime (time without date), LocalDateTime (date and time), ZonedDateTime (with timezone), Instant (timestamp). All immutable and thread-safe, unlike old Date/Calendar.`,
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
      explanation: `Period for date-based amounts (years, months, days). Duration for time-based amounts (hours, minutes, seconds). Used for calculating differences and performing date arithmetic with clear semantics.`,
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
      explanation: `DateTimeFormatter for parsing and formatting. Predefined formatters (ISO_LOCAL_DATE) or custom patterns. Thread-safe replacement for SimpleDateFormat. Supports locale-specific formatting.`,
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
      explanation: `ZoneId for timezone identification, ZoneOffset for fixed offsets. ZonedDateTime handles DST transitions. Clock abstraction for testing. Proper handling of complex timezone rules.`,
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
      explanation: `When class implements multiple interfaces with same default method. Resolved by: 1) Class implementation wins, 2) More specific interface wins, 3) Explicit override required. Compiler enforces resolution.`,
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
      explanation: `Add new methods to interfaces without breaking existing implementations. Critical for Java API evolution. Example: Collection.stream() added without modifying all collection implementations.`,
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
      explanation: `API evolution, optional functionality, template methods in interfaces, utility methods. Enables richer interfaces while maintaining backward compatibility. Bridge between traditional OOP and functional programming.`,
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
      explanation: `Enhanced Future for asynchronous programming. Methods: supplyAsync(), runAsync() for starting async tasks. Non-blocking with callback-based completion. Uses ForkJoinPool.commonPool() by default or custom Executor.`,
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
      explanation: `Chain operations with thenApply(), thenCompose(), thenCombine(). Handle both success and failure paths. Enable complex async workflows without callback hell. Functional composition of async operations.`,
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
      explanation: `Combine multiple futures: allOf() waits for all, anyOf() waits for first. thenCombine() combines two futures. Enables parallel execution with result aggregation. Control complex async dependencies.`,
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
      explanation: `Complete manually with complete(), completeExceptionally(). Check status with isDone(), isCompletedExceptionally(). Cancel with cancel(). Get results with get(), join(), or getNow().`,
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
      explanation: `High-performance JavaScript engine replacing Rhino. Executes JavaScript code from Java. Implements ECMAScript 5.1 specification. Invokable via javax.script API. Better performance through JIT compilation.`,
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
      explanation: `Call Java from JavaScript and vice versa. Access Java objects, call methods, create instances from JavaScript. Pass data between languages seamlessly. Enable scripting capabilities in Java applications.`,
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
      explanation: `jjs command-line tool for executing JavaScript. REPL for interactive JavaScript. Scripting with shebang support. Useful for testing and quick scripts combining Java and JavaScript.`,
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
      explanation: `Deprecated in Java 11, removed in Java 15. Replaced by GraalVM for better performance and modern JavaScript support. Historical importance for Java 8 era applications.`,
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
      explanation: `Permanent Generation replaced with Metaspace in native memory. Eliminates OutOfMemoryError: PermGen. Automatic memory management for class metadata. More flexible memory allocation.`,
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
      explanation: `Arrays.parallelSort() for parallel sorting. Parallel streams leverage multiple cores. ForkJoinPool improvements. Better utilization of modern multi-core processors.`,
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
          🚀 Java 8 Features
        </h1>
        <div style={{ width: '120px' }}></div>
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

      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedConcept ? '350px 1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {!selectedConcept ? (
          concepts.map((concept, idx) => (
            <div
              key={idx}
              onClick={() => handleConceptClick(concept)}
              style={{
                backgroundColor: 'rgba(16, 185, 129, 0.05)',
                padding: '2rem',
                borderRadius: '16px',
                border: '3px solid rgba(16, 185, 129, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.15)'
                e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.3)'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>
                {concept.icon || '🔹'}
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#047857',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                {concept.name}
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#6b7280',
                lineHeight: '1.6',
                textAlign: 'center'
              }}>
                {concept.explanation?.substring(0, 150) || ''}...
              </p>
            </div>
          ))
        ) : (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button
                onClick={() => setSelectedConcept(null)}
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
                ← Back to All Concepts
              </button>
              
              {concepts.map((concept, idx) => (
                <div
                  key={idx}
                  onClick={() => handleConceptClick(concept)}
                  style={{
                    padding: '1rem',
                    backgroundColor: selectedConcept?.name === concept.name 
                      ? 'rgba(16, 185, 129, 0.15)' 
                      : 'rgba(243, 244, 246, 1)',
                    borderRadius: '8px',
                    border: selectedConcept?.name === concept.name 
                      ? '2px solid rgba(16, 185, 129, 0.5)' 
                      : '2px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span style={{ fontWeight: '600', color: '#047857' }}>
                    {concept.icon || '🔹'} {concept.name}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#047857',
                marginBottom: '1.5rem'
              }}>
                {selectedConcept.icon || '🔹'} {selectedConcept.name}
              </h2>

              <div style={{
                backgroundColor: 'rgba(16, 185, 129, 0.05)',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '2px solid rgba(16, 185, 129, 0.2)',
                marginBottom: '2rem'
              }}>
                <p style={{
                  fontSize: '1.1rem',
                  color: '#374151',
                  lineHeight: '1.8',
                  margin: 0
                }}>
                  {selectedConcept.explanation}
                </p>
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
                            <div style={{ padding: '1.5rem' }}>
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
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '2px solid #334155'
                  }}>
                    <SyntaxHighlighter code={selectedConcept.codeExample} />
                  </div>
                )
              })()}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Java8
