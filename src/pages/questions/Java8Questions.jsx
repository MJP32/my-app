import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

function Java8Questions({ onBack, breadcrumb }) {
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
      category: 'Lambda Expressions',
      question: 'What are Lambda Expressions in Java 8 and why are they important?',
      answer: `**Lambda Expression:**
- Anonymous function (function without name)
- Enables functional programming in Java
- Provides clear and concise way to represent one method interface
- Can be passed around as if it was an object and executed on demand

**Syntax:**
\`\`\`java
(parameters) -> expression
(parameters) -> { statements; }
\`\`\`

**Before Java 8:**
\`\`\`java
// Using anonymous class
Runnable r1 = new Runnable() {
    @Override
    public void run() {
        System.out.println("Hello World");
    }
};
\`\`\`

**After Java 8:**
\`\`\`java
// Using Lambda
Runnable r2 = () -> System.out.println("Hello World");
\`\`\`

**More Examples:**
\`\`\`java
// No parameters
() -> System.out.println("Hello")

// One parameter (parentheses optional)
x -> x * x

// Multiple parameters
(x, y) -> x + y

// Multiple statements
(x, y) -> {
    int result = x + y;
    return result;
}
\`\`\`

**Benefits:**
- Less code (reduces boilerplate)
- Better readability
- Enables functional programming
- Facilitates parallel processing
- Works with Streams API
- Supports lazy evaluation`
    },
    {
      id: 2,
      category: 'Stream API',
      question: 'Explain the Stream API and its key operations',
      answer: `**Stream API:**
- Process collections of objects
- Not a data structure (doesn't store data)
- Supports functional-style operations on streams of elements
- Can be parallel or sequential
- Designed for lambdas
- Lazy evaluation (intermediate operations)

**Creating Streams:**
\`\`\`java
List<String> list = Arrays.asList("a", "b", "c");
Stream<String> stream = list.stream();
Stream<String> parallelStream = list.parallelStream();
Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5);
\`\`\`

**Intermediate Operations (Lazy):**

**1. filter():** Filter elements based on condition
\`\`\`java
list.stream()
    .filter(s -> s.startsWith("a"))
\`\`\`

**2. map():** Transform elements
\`\`\`java
list.stream()
    .map(String::toUpperCase)
\`\`\`

**3. flatMap():** Flatten nested structures
\`\`\`java
Stream.of(Arrays.asList(1, 2), Arrays.asList(3, 4))
    .flatMap(List::stream)  // [1, 2, 3, 4]
\`\`\`

**4. distinct():** Remove duplicates
\`\`\`java
list.stream().distinct()
\`\`\`

**5. sorted():** Sort elements
\`\`\`java
list.stream().sorted()
\`\`\`

**6. peek():** Perform action without modifying stream
\`\`\`java
list.stream()
    .peek(System.out::println)
\`\`\`

**Terminal Operations (Eager):**

**1. forEach():** Iterate over elements
\`\`\`java
list.stream().forEach(System.out::println)
\`\`\`

**2. collect():** Convert to collection
\`\`\`java
List<String> result = list.stream()
    .filter(s -> s.startsWith("a"))
    .collect(Collectors.toList());
\`\`\`

**3. reduce():** Combine elements
\`\`\`java
int sum = Stream.of(1, 2, 3, 4, 5)
    .reduce(0, (a, b) -> a + b);  // 15
\`\`\`

**4. count():** Count elements
\`\`\`java
long count = list.stream().count();
\`\`\`

**5. anyMatch() / allMatch() / noneMatch():**
\`\`\`java
boolean hasA = list.stream().anyMatch(s -> s.startsWith("a"));
\`\`\`

**Complete Example:**
\`\`\`java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

List<Integer> result = numbers.stream()
    .filter(n -> n % 2 == 0)      // Get even numbers
    .map(n -> n * n)               // Square them
    .sorted()                      // Sort
    .collect(Collectors.toList()); // Collect to list

// Result: [4, 16, 36, 64, 100]
\`\`\``
    },
    {
      id: 3,
      category: 'Functional Interfaces',
      question: 'What are Functional Interfaces and the key built-in ones in Java 8?',
      answer: `**Functional Interface:**
- Interface with exactly one abstract method
- Can have multiple default or static methods
- Annotated with @FunctionalInterface (optional but recommended)
- Target type for lambda expressions and method references

**@FunctionalInterface:**
\`\`\`java
@FunctionalInterface
interface MyFunctionalInterface {
    void execute();  // Single abstract method

    default void print() {  // Default methods allowed
        System.out.println("Default");
    }
}
\`\`\`

**Key Built-in Functional Interfaces:**

**1. Predicate<T>:** Takes T, returns boolean
\`\`\`java
Predicate<Integer> isEven = n -> n % 2 == 0;
System.out.println(isEven.test(4));  // true
\`\`\`

**2. Function<T, R>:** Takes T, returns R
\`\`\`java
Function<String, Integer> length = s -> s.length();
System.out.println(length.apply("hello"));  // 5
\`\`\`

**3. Consumer<T>:** Takes T, returns nothing
\`\`\`java
Consumer<String> print = s -> System.out.println(s);
print.accept("Hello");  // Prints: Hello
\`\`\`

**4. Supplier<T>:** Takes nothing, returns T
\`\`\`java
Supplier<String> supplier = () -> "Hello World";
System.out.println(supplier.get());  // Hello World
\`\`\`

**5. BiFunction<T, U, R>:** Takes T and U, returns R
\`\`\`java
BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;
System.out.println(add.apply(2, 3));  // 5
\`\`\`

**6. UnaryOperator<T>:** Takes T, returns T (extends Function<T, T>)
\`\`\`java
UnaryOperator<Integer> square = n -> n * n;
System.out.println(square.apply(5));  // 25
\`\`\`

**7. BinaryOperator<T>:** Takes two T, returns T (extends BiFunction<T, T, T>)
\`\`\`java
BinaryOperator<Integer> multiply = (a, b) -> a * b;
System.out.println(multiply.apply(3, 4));  // 12
\`\`\`

**Usage in Streams:**
\`\`\`java
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

// Predicate in filter
names.stream()
    .filter(name -> name.length() > 3)  // Predicate<String>

// Function in map
    .map(String::toUpperCase)  // Function<String, String>

// Consumer in forEach
    .forEach(System.out::println);  // Consumer<String>
\`\`\``
    },
    {
      id: 4,
      category: 'Optional',
      question: 'What is Optional in Java 8 and how does it help prevent NullPointerException?',
      answer: `**Optional:**
- Container object that may or may not contain a non-null value
- Helps avoid NullPointerException
- Makes null-handling explicit
- Forces developers to think about null cases
- Introduced to reduce null checks

**Creating Optional:**
\`\`\`java
// Empty Optional
Optional<String> empty = Optional.empty();

// Optional with non-null value
Optional<String> name = Optional.of("John");  // NPE if null

// Optional that may be null
Optional<String> nullable = Optional.ofNullable(null);  // Safe
\`\`\`

**Checking Value:**
\`\`\`java
Optional<String> opt = Optional.of("Hello");

// Check if present
if (opt.isPresent()) {
    System.out.println(opt.get());
}

// Better: Use ifPresent with Consumer
opt.ifPresent(System.out::println);
\`\`\`

**Getting Value:**
\`\`\`java
Optional<String> opt = Optional.of("Hello");

// get() - throws NoSuchElementException if empty
String value1 = opt.get();

// orElse() - return default if empty
String value2 = opt.orElse("Default");

// orElseGet() - lazy evaluation with Supplier
String value3 = opt.orElseGet(() -> "Generated Default");

// orElseThrow() - throw custom exception
String value4 = opt.orElseThrow(() -> new RuntimeException("Not found"));
\`\`\`

**Transforming Optional:**
\`\`\`java
Optional<String> name = Optional.of("john");

// map() - transform value if present
Optional<String> upper = name.map(String::toUpperCase);  // "JOHN"

// flatMap() - avoid nested Optionals
Optional<Optional<String>> nested = name.map(n -> Optional.of(n.toUpperCase()));
Optional<String> flat = name.flatMap(n -> Optional.of(n.toUpperCase()));
\`\`\`

**Filtering:**
\`\`\`java
Optional<Integer> number = Optional.of(5);

Optional<Integer> evenNumber = number.filter(n -> n % 2 == 0);
// Result: Optional.empty() because 5 is odd
\`\`\`

**Before Java 8:**
\`\`\`java
public String getName(User user) {
    if (user != null) {
        if (user.getName() != null) {
            return user.getName().toUpperCase();
        }
    }
    return "UNKNOWN";
}
\`\`\`

**After Java 8:**
\`\`\`java
public String getName(Optional<User> user) {
    return user
        .map(User::getName)
        .map(String::toUpperCase)
        .orElse("UNKNOWN");
}
\`\`\`

**Best Practices:**

**DO:**
- Use as return type for methods that might not have result
- Use in Stream operations
- Chain operations (map, filter, flatMap)

**DON'T:**
- Don't use as method parameters
- Don't use in fields
- Don't use Optional.get() without checking isPresent()
- Don't use for collections (use empty collection instead)`
    },
    {
      id: 5,
      category: 'Default Methods',
      question: 'What are Default Methods in interfaces and why were they introduced?',
      answer: `**Default Methods:**
- Methods in interfaces with implementation
- Allow adding new methods to interfaces without breaking existing implementations
- Introduced to enable lambda expressions and Stream API
- Keyword: \`default\`
- Can be overridden by implementing classes

**Syntax:**
\`\`\`java
interface Vehicle {
    // Abstract method
    void start();

    // Default method
    default void honk() {
        System.out.println("Beep beep!");
    }

    // Static method
    static int getWheels() {
        return 4;
    }
}
\`\`\`

**Why Introduced:**

**Problem:** Adding new method to interface breaks all implementations
\`\`\`java
// Java 7 - Adding sort() to List would break millions of classes
interface List<E> {
    // Existing methods
    boolean add(E e);

    // Adding this would break existing code:
    // void sort(Comparator<? super E> c);
}
\`\`\`

**Solution:** Default method provides implementation
\`\`\`java
// Java 8 - sort() added without breaking code
interface List<E> {
    boolean add(E e);

    default void sort(Comparator<? super E> c) {
        Collections.sort(this, c);
    }
}
\`\`\`

**Example: forEach in Iterable:**
\`\`\`java
interface Iterable<T> {
    Iterator<T> iterator();

    default void forEach(Consumer<? super T> action) {
        for (T t : this) {
            action.accept(t);
        }
    }
}
\`\`\`

**Overriding Default Methods:**
\`\`\`java
class Car implements Vehicle {
    @Override
    public void start() {
        System.out.println("Car starting");
    }

    // Can override default method
    @Override
    public void honk() {
        System.out.println("Car horn!");
    }
}
\`\`\`

**Multiple Inheritance Conflict:**

**Problem:** What if two interfaces have same default method?
\`\`\`java
interface A {
    default void print() {
        System.out.println("A");
    }
}

interface B {
    default void print() {
        System.out.println("B");
    }
}

class C implements A, B {
    // MUST override to resolve conflict
    @Override
    public void print() {
        A.super.print();  // Call A's version
        // or B.super.print();  // Call B's version
        // or provide own implementation
    }
}
\`\`\`

**Resolution Rules:**

**1. Class wins:** Class method overrides interface default method
\`\`\`java
interface I {
    default void method() { }
}

class C implements I {
    public void method() { }  // This wins
}
\`\`\`

**2. Sub-interface wins:** More specific interface wins
\`\`\`java
interface A {
    default void method() { }
}

interface B extends A {
    default void method() { }  // This wins
}

class C implements A, B { }
\`\`\`

**3. Explicit selection:** Must explicitly choose
\`\`\`java
interface A {
    default void method() { }
}

interface B {
    default void method() { }
}

class C implements A, B {
    public void method() {
        A.super.method();  // Must choose
    }
}
\`\`\`

**Benefits:**
- Backward compatibility
- Evolution of interfaces
- Enabled Stream API
- Multiple inheritance of behavior
- Library enhancement without breaking changes`
    },
    {
      id: 6,
      category: 'Method References',
      question: 'Explain Method References in Java 8',
      answer: `**Method Reference:**
- Shorthand notation of lambda expression to call a method
- Makes code more readable and concise
- Denoted by :: (double colon operator)
- Four types of method references

**1. Static Method Reference:**
\`\`\`java
// Lambda
Function<String, Integer> parser = s -> Integer.parseInt(s);

// Method reference
Function<String, Integer> parser = Integer::parseInt;

// Usage
int num = parser.apply("123");  // 123
\`\`\`

**2. Instance Method Reference (on specific object):**
\`\`\`java
// Lambda
String str = "Hello";
Supplier<Integer> lengthGetter = () -> str.length();

// Method reference
Supplier<Integer> lengthGetter = str::length;

// Usage
System.out.println(lengthGetter.get());  // 5
\`\`\`

**3. Instance Method Reference (on arbitrary object of type):**
\`\`\`java
// Lambda
Function<String, String> upperCase = s -> s.toUpperCase();

// Method reference
Function<String, String> upperCase = String::toUpperCase;

// Usage in streams
List<String> names = Arrays.asList("alice", "bob", "charlie");
names.stream()
    .map(String::toUpperCase)  // Method reference
    .forEach(System.out::println);
\`\`\`

**4. Constructor Reference:**
\`\`\`java
// Lambda
Supplier<List<String>> listSupplier = () -> new ArrayList<>();

// Constructor reference
Supplier<List<String>> listSupplier = ArrayList::new;

// With parameters
Function<Integer, List<String>> listCreator = size -> new ArrayList<>(size);
Function<Integer, List<String>> listCreator = ArrayList::new;
\`\`\`

**Real-World Examples:**

**Sorting:**
\`\`\`java
List<String> names = Arrays.asList("Charlie", "Alice", "Bob");

// Lambda
names.sort((s1, s2) -> s1.compareTo(s2));

// Method reference
names.sort(String::compareTo);
\`\`\`

**Filtering and Mapping:**
\`\`\`java
List<String> list = Arrays.asList("1", "2", "3", "4", "5");

List<Integer> numbers = list.stream()
    .map(Integer::parseInt)     // Static method reference
    .filter(n -> n > 2)
    .collect(Collectors.toList());
\`\`\`

**forEach:**
\`\`\`java
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

// Lambda
names.forEach(name -> System.out.println(name));

// Method reference
names.forEach(System.out::println);
\`\`\`

**Creating Objects:**
\`\`\`java
class Person {
    private String name;

    public Person() { }
    public Person(String name) {
        this.name = name;
    }
}

// No-arg constructor
Supplier<Person> personSupplier = Person::new;
Person p1 = personSupplier.get();

// Parameterized constructor
Function<String, Person> personCreator = Person::new;
Person p2 = personCreator.apply("John");
\`\`\`

**Comparison:**

| Lambda | Method Reference |
|--------|------------------|
| \`x -> System.out.println(x)\` | \`System.out::println\` |
| \`() -> new ArrayList<>()\` | \`ArrayList::new\` |
| \`x -> x.length()\` | \`String::length\` |
| \`x -> Integer.parseInt(x)\` | \`Integer::parseInt\` |

**Benefits:**
- More concise than lambda
- Better readability
- Clear intent
- Reuses existing methods`
    }
  ]

  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id)
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Lambda Expressions': '#f59e0b',
      'Stream API': '#3b82f6',
      'Functional Interfaces': '#8b5cf6',
      'Optional': '#10b981',
      'Default Methods': '#ef4444',
      'Method References': '#ec4899'
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
          Java 8 Interview Questions
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      <p style={{
        fontSize: '1.1rem',
        color: '#d1d5db',
        textAlign: 'center',
        marginBottom: '2rem',
        lineHeight: '1.6'
      }}>
        Java 8 interview questions covering Lambda Expressions, Stream API, Functional Interfaces, and more.
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
        border: '2px solid #6366f1'
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#a5b4fc', marginBottom: '0.5rem' }}>
          Java 8 Key Features
        </h3>
        <ul style={{ color: '#d1d5db', lineHeight: '1.8', margin: '0.5rem 0' }}>
          <li>Lambda Expressions - Enable functional programming</li>
          <li>Stream API - Process collections functionally</li>
          <li>Functional Interfaces - Single abstract method interfaces</li>
          <li>Default Methods - Add methods to interfaces without breaking implementations</li>
          <li>Optional - Avoid NullPointerException</li>
          <li>Method References - Shorthand for lambda expressions</li>
        </ul>
      </div>
    </div>
  )
}

export default Java8Questions
