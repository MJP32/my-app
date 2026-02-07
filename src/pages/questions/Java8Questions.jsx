import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'
import CompletionCheckbox from '../../components/CompletionCheckbox'

function Java8Questions({ onBack, breadcrumb, problemLimit }) {
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
    },
    {
      id: 7,
      category: 'Date Time API',
      difficulty: 'Hard',
      question: 'Explain Java 8 Date Time API with practical examples. How is it better than old Date/Calendar?',
      answer: `**Problems with Old API (Date/Calendar):**

**Issues:**
- Not thread-safe (mutable)
- Poor API design (confusing methods)
- Month indexing starts at 0 (January = 0)
- Mixing date and time
- TimeZone handling complex
- Formatting not included

\`\`\`java
// Old way (problematic)
Date date = new Date();
SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
String formatted = sdf.format(date);  // Not thread-safe!

Calendar cal = Calendar.getInstance();
cal.set(2024, 0, 15);  // January is 0!
Date result = cal.getTime();
\`\`\`

**Java 8 Date Time API (java.time):**

**Key Classes:**

**1. LocalDate - Date without time:**
\`\`\`java
// Create dates
LocalDate today = LocalDate.now();
LocalDate birthday = LocalDate.of(1990, Month.MARCH, 15);
LocalDate parsed = LocalDate.parse("2024-01-15");

// Get components
int year = today.getYear();         // 2024
Month month = today.getMonth();     // JANUARY
int day = today.getDayOfMonth();    // 15
DayOfWeek dayOfWeek = today.getDayOfWeek();  // MONDAY

// Operations (immutable - returns new object)
LocalDate tomorrow = today.plusDays(1);
LocalDate nextWeek = today.plusWeeks(1);
LocalDate nextMonth = today.plusMonths(1);
LocalDate lastYear = today.minusYears(1);

// Comparisons
boolean isBefore = birthday.isBefore(today);
boolean isAfter = birthday.isAfter(today);
boolean isEqual = birthday.equals(today);

// Period between dates
LocalDate start = LocalDate.of(2020, 1, 1);
LocalDate end = LocalDate.of(2024, 1, 1);
Period period = Period.between(start, end);
System.out.println(period.getYears() + " years");  // 4 years
\`\`\`

**2. LocalTime - Time without date:**
\`\`\`java
// Create times
LocalTime now = LocalTime.now();
LocalTime lunchTime = LocalTime.of(12, 30);
LocalTime precise = LocalTime.of(12, 30, 45, 123456789);  // with nanos

// Get components
int hour = now.getHour();
int minute = now.getMinute();
int second = now.getSecond();

// Operations
LocalTime later = now.plusHours(2);
LocalTime earlier = now.minusMinutes(30);

// Duration between times
LocalTime start = LocalTime.of(9, 0);
LocalTime end = LocalTime.of(17, 0);
Duration duration = Duration.between(start, end);
System.out.println(duration.toHours() + " hours");  // 8 hours
\`\`\`

**3. LocalDateTime - Date and time:**
\`\`\`java
// Create date-times
LocalDateTime now = LocalDateTime.now();
LocalDateTime meeting = LocalDateTime.of(2024, 1, 15, 14, 30);
LocalDateTime combined = LocalDateTime.of(LocalDate.now(), LocalTime.now());

// Operations
LocalDateTime nextHour = now.plusHours(1);
LocalDateTime yesterday = now.minusDays(1);

// Extract components
LocalDate date = now.toLocalDate();
LocalTime time = now.toLocalTime();
\`\`\`

**4. ZonedDateTime - With timezone:**
\`\`\`java
// Create with timezone
ZonedDateTime nowInNY = ZonedDateTime.now(ZoneId.of("America/New_York"));
ZonedDateTime nowInTokyo = ZonedDateTime.now(ZoneId.of("Asia/Tokyo"));

// Convert between timezones
ZonedDateTime meeting = ZonedDateTime.of(
    LocalDateTime.of(2024, 1, 15, 10, 0),
    ZoneId.of("America/New_York")
);
ZonedDateTime meetingInTokyo = meeting.withZoneSameInstant(ZoneId.of("Asia/Tokyo"));

// Get all available timezones
Set<String> zones = ZoneId.getAvailableZoneIds();
\`\`\`

**5. Instant - Timestamp (UTC):**
\`\`\`java
// Unix timestamp (seconds since epoch)
Instant now = Instant.now();
long epochSecond = now.getEpochSecond();
long epochMilli = now.toEpochMilli();

// Create from timestamp
Instant fromEpoch = Instant.ofEpochSecond(1640000000);

// Convert to ZonedDateTime
ZonedDateTime zdt = now.atZone(ZoneId.systemDefault());

// Duration between instants
Instant start = Instant.parse("2024-01-01T00:00:00Z");
Instant end = Instant.now();
Duration duration = Duration.between(start, end);
\`\`\`

**6. Period and Duration:**
\`\`\`java
// Period: Date-based (years, months, days)
Period period = Period.of(1, 6, 15);  // 1 year, 6 months, 15 days
Period period2 = Period.between(
    LocalDate.of(2020, 1, 1),
    LocalDate.of(2024, 1, 1)
);

LocalDate future = LocalDate.now().plus(period);

// Duration: Time-based (hours, minutes, seconds, nanos)
Duration duration = Duration.ofHours(2);
Duration duration2 = Duration.ofMinutes(30);
Duration duration3 = Duration.between(
    LocalTime.of(9, 0),
    LocalTime.of(17, 0)
);

LocalTime later = LocalTime.now().plus(duration);
\`\`\`

**7. DateTimeFormatter - Formatting:**
\`\`\`java
// Predefined formatters
LocalDateTime now = LocalDateTime.now();
String iso = now.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
String basic = now.format(DateTimeFormatter.BASIC_ISO_DATE);

// Custom formatters
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
String formatted = now.format(formatter);  // "2024-01-15 14:30:45"

// Parsing
LocalDateTime parsed = LocalDateTime.parse("2024-01-15 14:30:45", formatter);

// Localized formatters
DateTimeFormatter french = DateTimeFormatter.ofPattern("dd MMMM yyyy", Locale.FRENCH);
String frenchDate = LocalDate.now().format(french);  // "15 janvier 2024"
\`\`\`

**Real-World Examples:**

**1. Calculate age:**
\`\`\`java
public int calculateAge(LocalDate birthDate) {
    return Period.between(birthDate, LocalDate.now()).getYears();
}

LocalDate birthday = LocalDate.of(1990, 3, 15);
int age = calculateAge(birthday);  // 34
\`\`\`

**2. Business days calculation:**
\`\`\`java
public long getBusinessDays(LocalDate start, LocalDate end) {
    return start.datesUntil(end.plusDays(1))
        .filter(date -> {
            DayOfWeek day = date.getDayOfWeek();
            return day != DayOfWeek.SATURDAY && day != DayOfWeek.SUNDAY;
        })
        .count();
}
\`\`\`

**3. Meeting scheduler across timezones:**
\`\`\`java
ZonedDateTime meetingNY = ZonedDateTime.of(
    LocalDate.of(2024, 1, 15),
    LocalTime.of(10, 0),
    ZoneId.of("America/New_York")
);

// When is this in Tokyo?
ZonedDateTime meetingTokyo = meetingNY.withZoneSameInstant(ZoneId.of("Asia/Tokyo"));
System.out.println("Tokyo time: " + meetingTokyo.format(
    DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm z")
));
\`\`\`

**4. Check if date is in past/future:**
\`\`\`java
public boolean isExpired(LocalDate expiryDate) {
    return expiryDate.isBefore(LocalDate.now());
}

public boolean isUpcoming(LocalDateTime eventTime) {
    return eventTime.isAfter(LocalDateTime.now());
}
\`\`\`

**5. Calculate deadline:**
\`\`\`java
public LocalDateTime getDeadline(int hoursFromNow) {
    return LocalDateTime.now().plusHours(hoursFromNow);
}

// 48 hours from now
LocalDateTime deadline = getDeadline(48);
\`\`\`

**6. Working with databases:**
\`\`\`java
// Save to database (convert to Timestamp/Date)
LocalDateTime ldt = LocalDateTime.now();
Timestamp timestamp = Timestamp.valueOf(ldt);

// Read from database (convert from Timestamp)
Timestamp ts = resultSet.getTimestamp("created_at");
LocalDateTime dateTime = ts.toLocalDateTime();

// Modern JDBC drivers support java.time directly
PreparedStatement ps = conn.prepareStatement("INSERT INTO events VALUES (?, ?)");
ps.setObject(1, LocalDateTime.now());
ps.setObject(2, ZonedDateTime.now());
\`\`\`

**7. Temporal adjusters:**
\`\`\`java
// Next Monday
LocalDate nextMonday = LocalDate.now()
    .with(TemporalAdjusters.next(DayOfWeek.MONDAY));

// Last day of month
LocalDate lastDayOfMonth = LocalDate.now()
    .with(TemporalAdjusters.lastDayOfMonth());

// First day of next month
LocalDate firstDayNextMonth = LocalDate.now()
    .with(TemporalAdjusters.firstDayOfNextMonth());

// Next working day (Monday-Friday)
LocalDate nextWorkday = LocalDate.now()
    .with(TemporalAdjusters.next(DayOfWeek.MONDAY));
\`\`\`

**Thread Safety:**
\`\`\`java
// Old way - NOT thread-safe
SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
// Multiple threads using sdf can cause errors!

// Java 8 - Thread-safe (immutable)
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
// Safe to use across multiple threads

// All java.time classes are immutable and thread-safe
LocalDate date = LocalDate.now();
LocalDate tomorrow = date.plusDays(1);  // Creates NEW object
// Original date unchanged
\`\`\`

**Comparison Table:**

| Old API | Java 8 API |
|---------|------------|
| Date | LocalDate, LocalDateTime, Instant |
| Calendar | LocalDate, LocalDateTime |
| SimpleDateFormat | DateTimeFormatter |
| Mutable | Immutable |
| Not thread-safe | Thread-safe |
| Month 0-11 | Month 1-12 |
| Complex API | Clean, fluent API |

**Best Practices:**
✓ Use LocalDate for dates without time
✓ Use LocalTime for time without date
✓ Use LocalDateTime for date+time without timezone
✓ Use ZonedDateTime when timezone matters
✓ Use Instant for timestamps (database, logs)
✓ Always use DateTimeFormatter (thread-safe)
✓ Leverage immutability (thread-safe by design)
✓ Use TemporalAdjusters for complex date logic
✓ Store UTC in database, convert to local timezone in UI

**Migration from Old API:**
\`\`\`java
// Date to LocalDateTime
Date date = new Date();
LocalDateTime ldt = LocalDateTime.ofInstant(
    date.toInstant(),
    ZoneId.systemDefault()
);

// LocalDateTime to Date
LocalDateTime localDateTime = LocalDateTime.now();
Date dateFromLdt = Date.from(
    localDateTime.atZone(ZoneId.systemDefault()).toInstant()
);
\`\`\``
    },
    {
      id: 8,
      category: 'CompletableFuture',
      difficulty: 'Hard',
      question: 'Explain CompletableFuture in Java 8. How does it improve asynchronous programming?',
      answer: `**CompletableFuture Overview:**

Java 8's CompletableFuture is a powerful tool for asynchronous, non-blocking programming. It extends Future interface and implements CompletionStage, providing a rich API for composing asynchronous operations.

**Problems with Future:**
\`\`\`java
// Old way with Future
ExecutorService executor = Executors.newFixedThreadPool(10);
Future<String> future = executor.submit(() -> {
    Thread.sleep(1000);
    return "Result";
});

// Blocking wait - defeats async purpose!
String result = future.get();  // Blocks until complete

// No way to chain operations
// No exception handling
// No combining multiple futures
\`\`\`

**CompletableFuture Basics:**

**1. Creating CompletableFuture:**
\`\`\`java
// Already completed future
CompletableFuture<String> completed = CompletableFuture.completedFuture("Hello");

// Async computation (uses ForkJoinPool.commonPool())
CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
    // Long running task
    return "Result";
});

// With custom executor
ExecutorService executor = Executors.newFixedThreadPool(10);
CompletableFuture<String> future2 = CompletableFuture.supplyAsync(() -> {
    return "Result";
}, executor);

// Async runnable (returns Void)
CompletableFuture<Void> voidFuture = CompletableFuture.runAsync(() -> {
    System.out.println("Task executed");
});
\`\`\`

**2. Transformation (thenApply):**
\`\`\`java
CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> "Hello");

CompletableFuture<String> upperCase = future.thenApply(s -> s.toUpperCase());
CompletableFuture<Integer> length = upperCase.thenApply(String::length);

// Chain multiple transformations
CompletableFuture<Integer> result = CompletableFuture
    .supplyAsync(() -> "Hello World")
    .thenApply(String::toUpperCase)  // "HELLO WORLD"
    .thenApply(String::length);      // 11

System.out.println(result.get());  // 11
\`\`\`

**3. Consumption (thenAccept, thenRun):**
\`\`\`java
// thenAccept - Consume result
CompletableFuture.supplyAsync(() -> "Hello")
    .thenAccept(s -> System.out.println("Result: " + s));

// thenRun - Run action (no access to result)
CompletableFuture.supplyAsync(() -> "Hello")
    .thenRun(() -> System.out.println("Task completed"));

// Chaining
CompletableFuture.supplyAsync(() -> 42)
    .thenAccept(n -> System.out.println("Number: " + n))
    .thenRun(() -> System.out.println("All done!"));
\`\`\`

**4. Combining Futures (thenCompose):**
\`\`\`java
// Sequential async operations
CompletableFuture<String> future = CompletableFuture
    .supplyAsync(() -> "User123")
    .thenCompose(userId -> getUserDetails(userId))  // Returns CompletableFuture
    .thenCompose(user -> getOrderHistory(user));     // Returns CompletableFuture

// Example methods
CompletableFuture<User> getUserDetails(String userId) {
    return CompletableFuture.supplyAsync(() -> {
        // Fetch user from database
        return new User(userId);
    });
}

CompletableFuture<List<Order>> getOrderHistory(User user) {
    return CompletableFuture.supplyAsync(() -> {
        // Fetch orders from database
        return fetchOrders(user.getId());
    });
}
\`\`\`

**5. Combining Multiple Futures (thenCombine):**
\`\`\`java
// Run two async tasks and combine results
CompletableFuture<Integer> future1 = CompletableFuture.supplyAsync(() -> 10);
CompletableFuture<Integer> future2 = CompletableFuture.supplyAsync(() -> 20);

CompletableFuture<Integer> combined = future1.thenCombine(
    future2,
    (result1, result2) -> result1 + result2
);

System.out.println(combined.get());  // 30

// Real-world example: Parallel API calls
CompletableFuture<User> userFuture = fetchUser(userId);
CompletableFuture<Orders> ordersFuture = fetchOrders(userId);

CompletableFuture<UserProfile> profile = userFuture.thenCombine(
    ordersFuture,
    (user, orders) -> new UserProfile(user, orders)
);
\`\`\`

**6. Waiting for All/Any:**
\`\`\`java
// Wait for all futures (allOf)
CompletableFuture<String> future1 = CompletableFuture.supplyAsync(() -> "Task1");
CompletableFuture<String> future2 = CompletableFuture.supplyAsync(() -> "Task2");
CompletableFuture<String> future3 = CompletableFuture.supplyAsync(() -> "Task3");

CompletableFuture<Void> allFutures = CompletableFuture.allOf(future1, future2, future3);

// Wait for all to complete
allFutures.get();

// Get all results
List<String> results = Stream.of(future1, future2, future3)
    .map(CompletableFuture::join)  // join() doesn't throw checked exception
    .collect(Collectors.toList());

// Wait for any future (anyOf)
CompletableFuture<Object> anyFuture = CompletableFuture.anyOf(future1, future2, future3);
Object firstResult = anyFuture.get();  // First one to complete
\`\`\`

**7. Exception Handling:**
\`\`\`java
// handle - Transform result or exception
CompletableFuture<String> future = CompletableFuture
    .supplyAsync(() -> {
        if (Math.random() > 0.5) {
            throw new RuntimeException("Error!");
        }
        return "Success";
    })
    .handle((result, ex) -> {
        if (ex != null) {
            return "Error: " + ex.getMessage();
        }
        return result;
    });

// exceptionally - Recover from exception
CompletableFuture<String> future2 = CompletableFuture
    .supplyAsync(() -> {
        throw new RuntimeException("Failed!");
    })
    .exceptionally(ex -> {
        System.out.println("Caught: " + ex.getMessage());
        return "Default Value";
    });

// whenComplete - Execute action on completion (doesn't transform)
CompletableFuture<String> future3 = CompletableFuture
    .supplyAsync(() -> "Result")
    .whenComplete((result, ex) -> {
        if (ex != null) {
            System.out.println("Failed: " + ex);
        } else {
            System.out.println("Success: " + result);
        }
    });
\`\`\`

**8. Async variants:**
\`\`\`java
// Sync version - runs in same thread
future.thenApply(String::toUpperCase);

// Async version - runs in ForkJoinPool
future.thenApplyAsync(String::toUpperCase);

// Async with custom executor
ExecutorService executor = Executors.newFixedThreadPool(10);
future.thenApplyAsync(String::toUpperCase, executor);

// All transformation methods have async variants:
// thenApply -> thenApplyAsync
// thenAccept -> thenAcceptAsync
// thenRun -> thenRunAsync
// thenCompose -> thenComposeAsync
// thenCombine -> thenCombineAsync
\`\`\`

**Real-World Examples:**

**1. Parallel API calls:**
\`\`\`java
public CompletableFuture<Dashboard> getDashboard(String userId) {
    CompletableFuture<User> userFuture = fetchUser(userId);
    CompletableFuture<Orders> ordersFuture = fetchOrders(userId);
    CompletableFuture<Recommendations> recosFuture = fetchRecommendations(userId);

    return CompletableFuture.allOf(userFuture, ordersFuture, recosFuture)
        .thenApply(v -> new Dashboard(
            userFuture.join(),
            ordersFuture.join(),
            recosFuture.join()
        ));
}
\`\`\`

**2. Timeout handling:**
\`\`\`java
CompletableFuture<String> future = CompletableFuture
    .supplyAsync(() -> slowOperation())
    .orTimeout(5, TimeUnit.SECONDS)  // Java 9+
    .exceptionally(ex -> "Timeout!");

// Java 8 alternative
CompletableFuture<String> timeoutFuture = CompletableFuture
    .supplyAsync(() -> slowOperation())
    .applyToEither(
        timeoutAfter(5, TimeUnit.SECONDS),
        Function.identity()
    );
\`\`\`

**3. Retry logic:**
\`\`\`java
public CompletableFuture<String> retryOperation(int maxRetries) {
    return CompletableFuture
        .supplyAsync(() -> riskyOperation())
        .exceptionally(ex -> {
            if (maxRetries > 0) {
                return retryOperation(maxRetries - 1).join();
            }
            throw new RuntimeException("Max retries exceeded", ex);
        });
}
\`\`\`

**4. Fan-out/Fan-in pattern:**
\`\`\`java
public CompletableFuture<List<Result>> processItems(List<Item> items) {
    List<CompletableFuture<Result>> futures = items.stream()
        .map(item -> CompletableFuture.supplyAsync(() -> process(item)))
        .collect(Collectors.toList());

    return CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]))
        .thenApply(v -> futures.stream()
            .map(CompletableFuture::join)
            .collect(Collectors.toList())
        );
}
\`\`\`

**5. Caching with async loading:**
\`\`\`java
Map<String, CompletableFuture<Data>> cache = new ConcurrentHashMap<>();

public CompletableFuture<Data> getData(String key) {
    return cache.computeIfAbsent(key, k ->
        CompletableFuture.supplyAsync(() -> loadFromDatabase(k))
    );
}
\`\`\`

**Performance Considerations:**

**Thread pool sizing:**
\`\`\`java
// ForkJoinPool.commonPool() size
int parallelism = Runtime.getRuntime().availableProcessors();

// Custom thread pool for I/O operations
ExecutorService ioExecutor = Executors.newFixedThreadPool(50);

// Custom thread pool for CPU operations
ExecutorService cpuExecutor = Executors.newFixedThreadPool(
    Runtime.getRuntime().availableProcessors()
);
\`\`\`

**Best Practices:**
✓ Use supplyAsync for computation returning value
✓ Use runAsync for void operations
✓ Use thenCompose for sequential async operations
✓ Use thenCombine for parallel operations
✓ Always handle exceptions (handle, exceptionally)
✓ Use custom executor for I/O heavy tasks
✓ Avoid blocking operations (get()) in async chain
✓ Use join() instead of get() to avoid checked exceptions
✓ Close custom executors when done
✓ Be careful with ForkJoinPool.commonPool() saturation

**Common Pitfalls:**

**1. Blocking in async chain:**
\`\`\`java
// BAD: Blocking defeats async purpose
CompletableFuture.supplyAsync(() -> task1())
    .thenApply(result -> task2(result).get());  // Blocking!

// GOOD: Chain async operations
CompletableFuture.supplyAsync(() -> task1())
    .thenCompose(result -> task2(result));  // Non-blocking
\`\`\`

**2. Not handling exceptions:**
\`\`\`java
// BAD: Exception silently lost
CompletableFuture.supplyAsync(() -> {
    throw new RuntimeException("Error");
});

// GOOD: Handle exceptions
CompletableFuture.supplyAsync(() -> {
    throw new RuntimeException("Error");
}).exceptionally(ex -> {
    log.error("Error occurred", ex);
    return defaultValue;
});
\`\`\`

**Summary:**
CompletableFuture provides powerful asynchronous programming capabilities:
- Non-blocking operations
- Composition of async tasks
- Exception handling
- Combining multiple futures
- Much better than plain Future interface`
    },
    {
      id: 9,
      category: 'Collectors',
      difficulty: 'Hard',
      question: 'Explain advanced Collectors in Java 8 Stream API with real-world examples',
      answer: `**Java 8 Collectors:**

Collectors are terminal operations that accumulate stream elements into a collection or perform reduction operations. The Collectors utility class provides many built-in collectors.

**Basic Collectors:**

**1. toList, toSet, toCollection:**
\`\`\`java
List<String> names = stream.collect(Collectors.toList());
Set<String> uniqueNames = stream.collect(Collectors.toSet());
LinkedList<String> linkedList = stream.collect(Collectors.toCollection(LinkedList::new));

// Immutable collections (Java 10+)
List<String> immutable = stream.collect(Collectors.toUnmodifiableList());
\`\`\`

**2. joining - String concatenation:**
\`\`\`java
List<String> names = List.of("Alice", "Bob", "Charlie");

// Simple join
String result = names.stream()
    .collect(Collectors.joining());  // "AliceBobCharlie"

// With delimiter
String csv = names.stream()
    .collect(Collectors.joining(", "));  // "Alice, Bob, Charlie"

// With prefix and suffix
String formatted = names.stream()
    .collect(Collectors.joining(", ", "[", "]"));  // "[Alice, Bob, Charlie]"
\`\`\`

**3. counting, summing, averaging:**
\`\`\`java
List<Integer> numbers = List.of(1, 2, 3, 4, 5);

long count = numbers.stream()
    .collect(Collectors.counting());  // 5

int sum = numbers.stream()
    .collect(Collectors.summingInt(Integer::intValue));  // 15

double average = numbers.stream()
    .collect(Collectors.averagingInt(Integer::intValue));  // 3.0

// For complex objects
List<Product> products = getProducts();
double totalPrice = products.stream()
    .collect(Collectors.summingDouble(Product::getPrice));
\`\`\`

**4. summarizingInt/Long/Double - Statistics:**
\`\`\`java
List<Integer> numbers = List.of(1, 2, 3, 4, 5);

IntSummaryStatistics stats = numbers.stream()
    .collect(Collectors.summarizingInt(Integer::intValue));

System.out.println("Count: " + stats.getCount());      // 5
System.out.println("Sum: " + stats.getSum());          // 15
System.out.println("Min: " + stats.getMin());          // 1
System.out.println("Max: " + stats.getMax());          // 5
System.out.println("Average: " + stats.getAverage());  // 3.0
\`\`\`

**Advanced Collectors:**

**5. groupingBy - Group elements:**
\`\`\`java
class Person {
    String name;
    int age;
    String city;
}

List<Person> people = getPeople();

// Simple grouping
Map<String, List<Person>> byCity = people.stream()
    .collect(Collectors.groupingBy(Person::getCity));

// Grouping with counting
Map<String, Long> countByCity = people.stream()
    .collect(Collectors.groupingBy(
        Person::getCity,
        Collectors.counting()
    ));

// Grouping with averaging
Map<String, Double> avgAgeByCity = people.stream()
    .collect(Collectors.groupingBy(
        Person::getCity,
        Collectors.averagingInt(Person::getAge)
    ));

// Nested grouping
Map<String, Map<Integer, List<Person>>> byCityAndAge = people.stream()
    .collect(Collectors.groupingBy(
        Person::getCity,
        Collectors.groupingBy(Person::getAge)
    ));

// Custom map type
Map<String, List<Person>> sorted = people.stream()
    .collect(Collectors.groupingBy(
        Person::getCity,
        TreeMap::new,  // Sorted map
        Collectors.toList()
    ));
\`\`\`

**6. partitioningBy - Boolean grouping:**
\`\`\`java
List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// Partition into even/odd
Map<Boolean, List<Integer>> evenOdd = numbers.stream()
    .collect(Collectors.partitioningBy(n -> n % 2 == 0));

List<Integer> even = evenOdd.get(true);   // [2, 4, 6, 8, 10]
List<Integer> odd = evenOdd.get(false);   // [1, 3, 5, 7, 9]

// With downstream collector
Map<Boolean, Long> countEvenOdd = numbers.stream()
    .collect(Collectors.partitioningBy(
        n -> n % 2 == 0,
        Collectors.counting()
    ));
\`\`\`

**7. toMap - Convert to Map:**
\`\`\`java
List<Person> people = getPeople();

// Simple map
Map<String, Integer> nameToAge = people.stream()
    .collect(Collectors.toMap(
        Person::getName,    // Key mapper
        Person::getAge      // Value mapper
    ));

// Handle duplicates
Map<String, Person> nameToPersonMap = people.stream()
    .collect(Collectors.toMap(
        Person::getName,
        Function.identity(),
        (existing, replacement) -> existing  // Keep first
    ));

// Custom map type
TreeMap<String, Integer> sorted = people.stream()
    .collect(Collectors.toMap(
        Person::getName,
        Person::getAge,
        (v1, v2) -> v1,
        TreeMap::new
    ));
\`\`\`

**8. collectingAndThen - Post-processing:**
\`\`\`java
// Create list then make it immutable
List<String> immutableList = stream
    .collect(Collectors.collectingAndThen(
        Collectors.toList(),
        Collections::unmodifiableList
    ));

// Find max then convert to Optional
Optional<Person> youngest = people.stream()
    .collect(Collectors.collectingAndThen(
        Collectors.minBy(Comparator.comparing(Person::getAge)),
        Optional::of
    )).flatMap(Function.identity());
\`\`\`

**9. mapping - Transform then collect:**
\`\`\`java
// Extract names from grouped persons
Map<String, List<String>> cityToNames = people.stream()
    .collect(Collectors.groupingBy(
        Person::getCity,
        Collectors.mapping(
            Person::getName,
            Collectors.toList()
        )
    ));

// Multiple transformations
Map<String, Set<String>> cityToUpperNames = people.stream()
    .collect(Collectors.groupingBy(
        Person::getCity,
        Collectors.mapping(
            person -> person.getName().toUpperCase(),
            Collectors.toSet()
        )
    ));
\`\`\`

**10. filtering - Filter during collection:**
\`\`\`java
// Group only adults
Map<String, List<Person>> cityToAdults = people.stream()
    .collect(Collectors.groupingBy(
        Person::getCity,
        Collectors.filtering(
            person -> person.getAge() >= 18,
            Collectors.toList()
        )
    ));
\`\`\`

**11. flatMapping - Flatten during collection:**
\`\`\`java
class Department {
    String name;
    List<Employee> employees;
}

List<Department> departments = getDepartments();

// Get all employee names by department
Map<String, List<String>> deptToEmployeeNames = departments.stream()
    .collect(Collectors.groupingBy(
        Department::getName,
        Collectors.flatMapping(
            dept -> dept.getEmployees().stream().map(Employee::getName),
            Collectors.toList()
        )
    ));
\`\`\`

**12. reducing - Custom reduction:**
\`\`\`java
// Sum with reducing
Optional<Integer> sum = numbers.stream()
    .collect(Collectors.reducing(Integer::sum));

// With identity
Integer sum2 = numbers.stream()
    .collect(Collectors.reducing(0, Integer::sum));

// With mapper
Integer totalLength = words.stream()
    .collect(Collectors.reducing(
        0,                    // Identity
        String::length,       // Mapper
        Integer::sum          // Reducer
    ));
\`\`\`

**Real-World Examples:**

**1. Sales Analysis:**
\`\`\`java
class Sale {
    String product;
    String region;
    double amount;
    LocalDate date;
}

List<Sale> sales = getSales();

// Total sales by region
Map<String, Double> salesByRegion = sales.stream()
    .collect(Collectors.groupingBy(
        Sale::getRegion,
        Collectors.summingDouble(Sale::getAmount)
    ));

// Top 3 products by sales
List<String> topProducts = sales.stream()
    .collect(Collectors.groupingBy(
        Sale::getProduct,
        Collectors.summingDouble(Sale::getAmount)
    ))
    .entrySet().stream()
    .sorted(Map.Entry.<String, Double>comparingByValue().reversed())
    .limit(3)
    .map(Map.Entry::getKey)
    .collect(Collectors.toList());

// Monthly sales summary
Map<Month, DoubleSummaryStatistics> monthlySales = sales.stream()
    .collect(Collectors.groupingBy(
        sale -> sale.getDate().getMonth(),
        Collectors.summarizingDouble(Sale::getAmount)
    ));
\`\`\`

**2. Student Grade Analysis:**
\`\`\`java
class Student {
    String name;
    String subject;
    int score;
}

List<Student> students = getStudents();

// Average score by subject
Map<String, Double> avgBySubject = students.stream()
    .collect(Collectors.groupingBy(
        Student::getSubject,
        Collectors.averagingInt(Student::getScore)
    ));

// Pass/Fail partition
Map<Boolean, List<Student>> passFailBySubject = students.stream()
    .collect(Collectors.partitioningBy(s -> s.getScore() >= 60));

// Top performer per subject
Map<String, Optional<Student>> topBySubject = students.stream()
    .collect(Collectors.groupingBy(
        Student::getSubject,
        Collectors.maxBy(Comparator.comparing(Student::getScore))
    ));
\`\`\`

**3. Inventory Management:**
\`\`\`java
class Product {
    String category;
    String name;
    int quantity;
    double price;
}

List<Product> inventory = getInventory();

// Low stock items by category
Map<String, List<Product>> lowStockByCategory = inventory.stream()
    .filter(p -> p.getQuantity() < 10)
    .collect(Collectors.groupingBy(Product::getCategory));

// Total inventory value by category
Map<String, Double> valueByCategory = inventory.stream()
    .collect(Collectors.groupingBy(
        Product::getCategory,
        Collectors.summingDouble(p -> p.getPrice() * p.getQuantity())
    ));
\`\`\`

**Custom Collector:**
\`\`\`java
// Create custom collector for specific use case
public static Collector<String, ?, String> toCommaSeparatedString() {
    return Collector.of(
        StringBuilder::new,                    // Supplier
        (sb, s) -> {                          // Accumulator
            if (sb.length() > 0) sb.append(", ");
            sb.append(s);
        },
        (sb1, sb2) -> {                       // Combiner
            if (sb1.length() > 0) sb1.append(", ");
            return sb1.append(sb2);
        },
        StringBuilder::toString               // Finisher
    );
}

// Usage
String result = names.stream()
    .collect(toCommaSeparatedString());
\`\`\`

**Best Practices:**
✓ Use appropriate collector for the task
✓ Combine collectors for complex aggregations
✓ Use downstream collectors for nested grouping
✓ Consider custom collectors for reusable logic
✓ Be aware of performance with large datasets
✓ Use parallel streams carefully with collectors
✓ Prefer built-in collectors over custom ones
✓ Use meaningful variable names for map keys

**Performance Tips:**
- toList() is faster than toCollection()
- Parallel streams can improve groupingBy performance
- Use primitive stream collectors (summingInt vs summingDouble)
- Consider memory usage with large groupings`
    },
    {
      id: 10,
      category: 'Nashorn JavaScript',
      difficulty: 'Medium',
      question: 'What was Nashorn JavaScript Engine in Java 8? Why was it deprecated?',
      answer: `**Nashorn JavaScript Engine:**

**Overview:**
Nashorn was a JavaScript engine introduced in Java 8 to replace the older Rhino engine. It allowed executing JavaScript code from Java and vice versa. However, it was deprecated in Java 11 and removed in Java 15.

**Basic Usage:**

**1. Execute JavaScript from Java:**
\`\`\`java
import javax.script.*;

ScriptEngineManager manager = new ScriptEngineManager();
ScriptEngine engine = manager.getEngineByName("nashorn");

// Execute JavaScript code
Object result = engine.eval("var x = 10; var y = 20; x + y;");
System.out.println(result);  // 30

// Execute JavaScript file
engine.eval(new FileReader("script.js"));
\`\`\`

**2. Pass variables between Java and JavaScript:**
\`\`\`java
ScriptEngine engine = new ScriptEngineManager().getEngineByName("nashorn");

// Set variable in JavaScript
engine.put("name", "John");
engine.put("age", 30);

// Use in JavaScript
engine.eval("print('Hello ' + name + ', age: ' + age)");

// Get result back
engine.eval("var result = age * 2");
Object result = engine.get("result");
System.out.println(result);  // 60
\`\`\`

**3. Call Java methods from JavaScript:**
\`\`\`java
public class JavaClass {
    public String greet(String name) {
        return "Hello, " + name;
    }
}

// In Java
ScriptEngine engine = new ScriptEngineManager().getEngineByName("nashorn");
engine.put("javaObj", new JavaClass());

// In JavaScript
engine.eval("var greeting = javaObj.greet('World')");
engine.eval("print(greeting)");  // Hello, World
\`\`\`

**4. Use Java classes in JavaScript:**
\`\`\`javascript
// Access Java classes
var ArrayList = Java.type("java.util.ArrayList");
var list = new ArrayList();
list.add("Item 1");
list.add("Item 2");
print(list.size());  // 2

// Use Java 8 Streams
var Stream = Java.type("java.util.stream.Stream");
var result = Stream.of("a", "b", "c")
    .map(function(s) { return s.toUpperCase(); })
    .toArray();
\`\`\`

**5. Invoke JavaScript functions from Java:**
\`\`\`java
ScriptEngine engine = new ScriptEngineManager().getEngineByName("nashorn");

// Define JavaScript function
engine.eval("function multiply(a, b) { return a * b; }");

// Get invocable interface
Invocable invocable = (Invocable) engine;

// Call JavaScript function
Object result = invocable.invokeFunction("multiply", 5, 3);
System.out.println(result);  // 15
\`\`\`

**6. Implement Java interface with JavaScript:**
\`\`\`java
interface Calculator {
    int calculate(int a, int b);
}

ScriptEngine engine = new ScriptEngineManager().getEngineByName("nashorn");

// Define JavaScript implementation
engine.eval("var calc = { calculate: function(a, b) { return a + b; } }");

// Get Java interface
Invocable invocable = (Invocable) engine;
Calculator calculator = invocable.getInterface(
    engine.get("calc"),
    Calculator.class
);

// Use as Java object
int result = calculator.calculate(10, 20);
System.out.println(result);  // 30
\`\`\`

**Real-World Use Cases:**

**1. Dynamic business rules:**
\`\`\`java
// Store rules in database as JavaScript
String rule = "function validateAge(age) { return age >= 18 && age <= 65; }";

ScriptEngine engine = new ScriptEngineManager().getEngineByName("nashorn");
engine.eval(rule);

Invocable invocable = (Invocable) engine;
boolean isValid = (boolean) invocable.invokeFunction("validateAge", 25);
\`\`\`

**2. Template engine:**
\`\`\`java
String template = "Hello \${name}, your order #\${orderId} is \${status}";
Map<String, Object> data = Map.of(
    "name", "John",
    "orderId", 12345,
    "status", "shipped"
);

// Process template with JavaScript
ScriptEngine engine = new ScriptEngineManager().getEngineByName("nashorn");
data.forEach(engine::put);
String result = (String) engine.eval("'" + template.replaceAll("\\$\\{(\\w+)\\}", "' + $1 + '") + "'");
\`\`\`

**3. Configuration DSL:**
\`\`\`javascript
// config.js - User-friendly configuration
config({
    server: {
        port: 8080,
        host: "localhost"
    },
    database: {
        url: "jdbc:mysql://localhost:3306/db",
        username: "root"
    }
});
\`\`\`

**Why Nashorn was Deprecated:**

**1. Maintenance Burden:**
- JavaScript evolves rapidly (ES6, ES7, etc.)
- Nashorn couldn't keep up with ECMAScript standards
- Significant engineering effort to maintain

**2. Performance Issues:**
- Slower than modern JavaScript engines (V8, SpiderMonkey)
- Not optimized for newer JavaScript features
- Better alternatives available

**3. Better Alternatives:**
- GraalVM JavaScript (faster, ES6+ support)
- External JavaScript engines (Node.js via REST)
- JVM scripting alternatives (Groovy, Kotlin scripting)

**4. Limited Adoption:**
- Not widely used in production
- Specialized use cases only
- Modern microservices prefer dedicated JS runtime

**Migration Path:**

**From Nashorn to GraalVM JavaScript:**
\`\`\`java
// Old (Nashorn)
ScriptEngine engine = new ScriptEngineManager().getEngineByName("nashorn");

// New (GraalVM)
// Add dependency: org.graalvm.js:js-scriptengine
ScriptEngine engine = new ScriptEngineManager().getEngineByName("graal.js");

// Same API, better performance and ES6+ support
\`\`\`

**Alternative: Use external JavaScript runtime:**
\`\`\`java
// Call Node.js via HTTP/gRPC
HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("http://localhost:3000/execute"))
    .POST(HttpRequest.BodyPublishers.ofString(jsCode))
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
\`\`\`

**Timeline:**
- Java 8 (2014): Nashorn introduced
- Java 11 (2018): Nashorn deprecated
- Java 15 (2020): Nashorn removed

**Best Practices (Historical):**
✓ Cache ScriptEngine instances (expensive to create)
✓ Use Invocable for better performance
✓ Handle JavaScript exceptions properly
✓ Be careful with type conversions
✓ Consider security implications
✓ Test JavaScript code thoroughly

**Security Concerns:**
\`\`\`java
// Restrict access to Java classes
ScriptEngine engine = new ScriptEngineManager().getEngineByName("nashorn");

// Can access sensitive Java APIs!
engine.eval("java.lang.System.exit(0)");  // Dangerous!

// Use ClassFilter to restrict access (Nashorn-specific)
NashornScriptEngineFactory factory = new NashornScriptEngineFactory();
ScriptEngine secureEngine = factory.getScriptEngine(new ClassFilter() {
    @Override
    public boolean exposeToScripts(String className) {
        // Only allow specific classes
        return className.startsWith("com.myapp.safe.");
    }
});
\`\`\`

**Modern Alternatives:**
1. **GraalVM JavaScript** - ES6+ support, better performance
2. **Groovy** - Dynamic JVM language with better Java integration
3. **Kotlin Scripting** - Type-safe scripting
4. **External JS Runtime** - Node.js, Deno via REST/gRPC
5. **Rule Engines** - Drools, Easy Rules for business logic

**Summary:**
Nashorn was Java 8's JavaScript engine for embedding JS in Java applications. It was deprecated due to maintenance burden and better alternatives (GraalVM JS). For new projects, use GraalVM JavaScript or external JavaScript runtimes instead.`
    },
    {
      id: 11,
      category: 'CompletableFuture',
      difficulty: 'Hard',
      question: 'Explain CompletableFuture in depth. How do you handle complex asynchronous pipelines with error handling?',
      answer: `**CompletableFuture - Advanced Async Programming:**

**Overview:**
CompletableFuture is Java 8's implementation of Future with completion stages, enabling non-blocking asynchronous programming with functional composition.

**Core Concepts:**

**1. Creating CompletableFutures:**
\`\`\`java
// Completed future
CompletableFuture<String> completed = CompletableFuture.completedFuture("result");

// Supply async computation
CompletableFuture<String> async = CompletableFuture.supplyAsync(() -> {
    // Heavy computation
    return fetchDataFromDB();
});

// Run async without return value
CompletableFuture<Void> runAsync = CompletableFuture.runAsync(() -> {
    sendEmail();
});

// With custom executor
ExecutorService executor = Executors.newFixedThreadPool(10);
CompletableFuture<String> withExecutor = CompletableFuture.supplyAsync(
    () -> computeValue(),
    executor
);
\`\`\`

**2. Transformation - thenApply, thenCompose:**
\`\`\`java
// thenApply - transform result (like map)
CompletableFuture<Integer> future = CompletableFuture.supplyAsync(() -> "123")
    .thenApply(Integer::parseInt)
    .thenApply(num -> num * 2);

// thenCompose - flatten nested futures (like flatMap)
CompletableFuture<User> userFuture = CompletableFuture.supplyAsync(() -> getUserId())
    .thenCompose(id -> fetchUserById(id))  // fetchUserById returns CompletableFuture<User>
    .thenCompose(user -> enrichUserData(user));

// Difference:
// thenApply:   T -> U
// thenCompose: T -> CompletableFuture<U>
\`\`\`

**3. Combining Multiple Futures:**
\`\`\`java
// thenCombine - combine two independent futures
CompletableFuture<String> future1 = CompletableFuture.supplyAsync(() -> "Hello");
CompletableFuture<String> future2 = CompletableFuture.supplyAsync(() -> "World");

CompletableFuture<String> combined = future1.thenCombine(
    future2,
    (s1, s2) -> s1 + " " + s2
);

// allOf - wait for all futures (returns CompletableFuture<Void>)
CompletableFuture<?>[] futures = {future1, future2, future3};
CompletableFuture<Void> allOf = CompletableFuture.allOf(futures);

// Get all results
allOf.thenRun(() -> {
    String result1 = future1.join();
    String result2 = future2.join();
    String result3 = future3.join();
});

// anyOf - complete when any future completes
CompletableFuture<Object> anyOf = CompletableFuture.anyOf(
    callAPI1(),
    callAPI2(),
    callAPI3()
);
anyOf.thenAccept(result -> System.out.println("First: " + result));
\`\`\`

**4. Error Handling:**
\`\`\`java
// exceptionally - handle errors
CompletableFuture<String> withRecovery = CompletableFuture.supplyAsync(() -> {
    if (Math.random() > 0.5) throw new RuntimeException("Error!");
    return "Success";
}).exceptionally(throwable -> {
    log.error("Error occurred", throwable);
    return "Default Value";
});

// handle - handle both success and error
CompletableFuture<String> handled = CompletableFuture.supplyAsync(() -> fetchData())
    .handle((result, throwable) -> {
        if (throwable != null) {
            return "Error: " + throwable.getMessage();
        }
        return "Success: " + result;
    });

// whenComplete - perform side effect (doesn't transform result)
CompletableFuture<String> logged = CompletableFuture.supplyAsync(() -> fetchData())
    .whenComplete((result, throwable) -> {
        if (throwable != null) {
            log.error("Failed", throwable);
        } else {
            log.info("Succeeded: " + result);
        }
    });
\`\`\`

**5. Complex Pipeline with Error Handling:**
\`\`\`java
public CompletableFuture<OrderConfirmation> processOrder(OrderRequest request) {
    return CompletableFuture
        // Step 1: Validate order
        .supplyAsync(() -> validateOrder(request))
        .exceptionally(ex -> {
            throw new ValidationException("Validation failed", ex);
        })

        // Step 2: Check inventory (parallel with payment)
        .thenCompose(validOrder -> {
            CompletableFuture<Inventory> inventoryCheck =
                CompletableFuture.supplyAsync(() -> checkInventory(validOrder));
            CompletableFuture<Payment> paymentProcess =
                CompletableFuture.supplyAsync(() -> processPayment(validOrder));

            // Combine both results
            return inventoryCheck.thenCombine(paymentProcess, (inventory, payment) -> {
                if (!inventory.isAvailable()) {
                    throw new OutOfStockException();
                }
                if (!payment.isSuccessful()) {
                    throw new PaymentFailedException();
                }
                return new OrderData(validOrder, inventory, payment);
            });
        })

        // Step 3: Create order
        .thenCompose(orderData ->
            CompletableFuture.supplyAsync(() -> createOrder(orderData))
        )

        // Step 4: Send notifications (don't wait)
        .thenApply(order -> {
            CompletableFuture.runAsync(() -> sendConfirmationEmail(order));
            CompletableFuture.runAsync(() -> notifyWarehouse(order));
            return order;
        })

        // Step 5: Generate confirmation
        .thenApply(order -> new OrderConfirmation(order))

        // Global error handling
        .exceptionally(throwable -> {
            log.error("Order processing failed", throwable);

            if (throwable instanceof ValidationException) {
                return OrderConfirmation.validationError(throwable.getMessage());
            } else if (throwable instanceof OutOfStockException) {
                return OrderConfirmation.outOfStock();
            } else if (throwable instanceof PaymentFailedException) {
                return OrderConfirmation.paymentFailed();
            } else {
                return OrderConfirmation.systemError();
            }
        })

        // Timeout handling
        .orTimeout(5, TimeUnit.SECONDS)
        .exceptionally(throwable -> {
            if (throwable instanceof TimeoutException) {
                return OrderConfirmation.timeout();
            }
            throw new CompletionException(throwable);
        });
}
\`\`\`

**6. Advanced Patterns:**
\`\`\`java
// Retry pattern
public <T> CompletableFuture<T> retry(Supplier<CompletableFuture<T>> supplier, int maxRetries) {
    return supplier.get()
        .exceptionally(throwable -> null)
        .thenCompose(result -> {
            if (result != null) {
                return CompletableFuture.completedFuture(result);
            }
            if (maxRetries <= 0) {
                return CompletableFuture.failedFuture(new RuntimeException("Max retries exceeded"));
            }
            return retry(supplier, maxRetries - 1);
        });
}

// Circuit breaker pattern
public class CircuitBreaker {
    private AtomicInteger failureCount = new AtomicInteger(0);
    private volatile boolean open = false;

    public <T> CompletableFuture<T> execute(Supplier<CompletableFuture<T>> supplier) {
        if (open) {
            return CompletableFuture.failedFuture(
                new RuntimeException("Circuit breaker is open")
            );
        }

        return supplier.get()
            .whenComplete((result, throwable) -> {
                if (throwable != null) {
                    if (failureCount.incrementAndGet() > 5) {
                        open = true;
                        scheduleReset();
                    }
                } else {
                    failureCount.set(0);
                }
            });
    }
}

// Fan-out/Fan-in pattern
public CompletableFuture<AggregatedResult> fanOutFanIn(List<String> ids) {
    // Fan-out: create parallel requests
    List<CompletableFuture<Data>> futures = ids.stream()
        .map(id -> CompletableFuture.supplyAsync(() -> fetchData(id)))
        .collect(Collectors.toList());

    // Fan-in: combine all results
    return CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]))
        .thenApply(v -> {
            List<Data> results = futures.stream()
                .map(CompletableFuture::join)
                .collect(Collectors.toList());
            return new AggregatedResult(results);
        });
}
\`\`\`

**Best Practices:**
- Use async methods (supplyAsync, thenApplyAsync) to avoid blocking calling thread
- Provide custom executor for better thread pool control
- Always handle exceptions (exceptionally, handle, whenComplete)
- Use thenCompose for nested CompletableFutures to avoid CompletableFuture<CompletableFuture<T>>
- Add timeouts (orTimeout, completeOnTimeout) to prevent hanging
- Be careful with join() - it blocks the thread
- Use CompletableFuture.allOf for parallel execution, not sequential chaining

**Common Pitfalls:**
- Using thenApply instead of thenCompose for futures
- Not providing executors (uses ForkJoinPool.commonPool())
- Forgetting error handling in async chains
- Blocking with get() or join() defeating async purpose
- Not canceling futures when they're no longer needed`
    },
    {
      id: 12,
      category: 'Parallel Streams',
      difficulty: 'Hard',
      question: 'When should you use parallel streams? What are the performance pitfalls and how do you avoid them?',
      answer: `**Parallel Streams - When and How:**

**What are Parallel Streams:**
Parallel streams divide the stream into multiple chunks, process them in parallel using ForkJoinPool, then combine the results.

**Basic Usage:**
\`\`\`java
// Convert to parallel
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
numbers.parallelStream()
    .map(n -> n * 2)
    .forEach(System.out::println);

// Or from sequential
numbers.stream()
    .parallel()
    .filter(n -> n > 2)
    .collect(Collectors.toList());

// Back to sequential
numbers.parallelStream()
    .sequential()
    .map(n -> n * 2);
\`\`\`

**When to Use Parallel Streams:**

**Good Use Cases:**
\`\`\`java
// 1. Large datasets with independent operations
List<String> hugeList = loadMillionRecords();
long count = hugeList.parallelStream()
    .filter(s -> s.length() > 10)
    .count();

// 2. CPU-intensive operations
List<Integer> numbers = IntStream.range(1, 10000).boxed().collect(Collectors.toList());
List<Integer> results = numbers.parallelStream()
    .map(n -> heavyComputation(n))  // CPU-bound work
    .collect(Collectors.toList());

// 3. Independent transformations
List<Image> images = loadImages();
List<Image> processed = images.parallelStream()
    .map(img -> resizeImage(img))
    .map(img -> applyFilter(img))
    .collect(Collectors.toList());
\`\`\`

**When NOT to Use:**

**1. Small Datasets:**
\`\`\`java
// BAD - overhead of parallelization outweighs benefit
List<Integer> small = Arrays.asList(1, 2, 3, 4, 5);
small.parallelStream()  // Slower than sequential!
    .map(n -> n * 2)
    .collect(Collectors.toList());

// Benchmark shows parallel is slower for < 10,000 elements
// for simple operations
\`\`\`

**2. Order-Dependent Operations:**
\`\`\`java
// BAD - forEach order is not guaranteed
numbers.parallelStream()
    .forEach(System.out::println);  // Random order!

// GOOD - use forEachOrdered if order matters
numbers.parallelStream()
    .map(n -> process(n))
    .forEachOrdered(System.out::println);  // Preserves order (but slower)
\`\`\`

**3. Stateful Operations:**
\`\`\`java
// BAD - shared mutable state causes race conditions
List<Integer> results = new ArrayList<>();  // Not thread-safe!
numbers.parallelStream()
    .map(n -> n * 2)
    .forEach(results::add);  // RACE CONDITION!

// GOOD - use collect
List<Integer> results = numbers.parallelStream()
    .map(n -> n * 2)
    .collect(Collectors.toList());  // Thread-safe
\`\`\`

**4. Blocking Operations:**
\`\`\`java
// BAD - I/O operations block threads
List<String> urls = getUrls();
List<String> content = urls.parallelStream()
    .map(url -> httpClient.get(url))  // Blocks thread!
    .collect(Collectors.toList());

// GOOD - use CompletableFuture instead
List<CompletableFuture<String>> futures = urls.stream()
    .map(url -> CompletableFuture.supplyAsync(() -> httpClient.get(url)))
    .collect(Collectors.toList());

List<String> content = futures.stream()
    .map(CompletableFuture::join)
    .collect(Collectors.toList());
\`\`\`

**Performance Characteristics:**

**NQ Model - When Parallel Helps:**
\`\`\`
N = number of elements
Q = computational cost per element

Parallel is beneficial when: N * Q > threshold

Thresholds (approximate):
- Simple operations (multiply, add): N > 10,000
- Medium operations (string parse): N > 1,000
- Heavy operations (crypto, image): N > 100
\`\`\`

**Data Structure Impact:**
\`\`\`java
// GOOD - easily splittable
ArrayList<Integer> list = new ArrayList<>();
list.parallelStream();  // Excellent splitting

int[] array = new int[1000];
Arrays.stream(array).parallel();  // Excellent splitting

// BAD - hard to split
LinkedList<Integer> linkedList = new LinkedList<>();
linkedList.parallelStream();  // Poor splitting, overhead high

HashSet<Integer> set = new HashSet<>();
set.parallelStream();  // Unpredictable splitting
\`\`\`

**Common Pitfalls and Solutions:**

**1. Boxing/Unboxing Overhead:**
\`\`\`java
// BAD - boxing overhead
List<Integer> numbers = IntStream.range(1, 1000000)
    .boxed()
    .collect(Collectors.toList());

long sum = numbers.parallelStream()
    .mapToInt(Integer::intValue)  // Unboxing
    .sum();

// GOOD - use primitive streams
long sum = IntStream.range(1, 1000000)
    .parallel()
    .sum();  // No boxing!
\`\`\`

**2. Incorrect Collector:**
\`\`\`java
// BAD - groupingBy can be slow in parallel
Map<String, List<Person>> grouped = people.parallelStream()
    .collect(Collectors.groupingBy(Person::getCity));

// GOOD - use concurrent collector
Map<String, List<Person>> grouped = people.parallelStream()
    .collect(Collectors.groupingByConcurrent(Person::getCity));
\`\`\`

**3. ForkJoinPool Contention:**
\`\`\`java
// Default uses common pool (CPU cores)
Runtime.getRuntime().availableProcessors();  // Parallelism level

// Custom ForkJoinPool
ForkJoinPool customPool = new ForkJoinPool(20);
customPool.submit(() ->
    list.parallelStream()
        .map(this::process)
        .collect(Collectors.toList())
).get();
\`\`\`

**Benchmarking Example:**
\`\`\`java
@Benchmark
public long sequentialSum() {
    return numbers.stream()
        .mapToLong(Integer::longValue)
        .sum();
}

@Benchmark
public long parallelSum() {
    return numbers.parallelStream()
        .mapToLong(Integer::longValue)
        .sum();
}

// Results (N=1,000,000):
// Sequential: 3.2 ms
// Parallel:   0.8 ms (4x speedup on 8 cores)

// Results (N=100):
// Sequential: 0.003 ms
// Parallel:   0.015 ms (5x SLOWER due to overhead!)
\`\`\`

**Best Practices:**
- Measure before using parallel streams (don't guess!)
- Use for CPU-intensive operations on large datasets
- Avoid for I/O-bound operations (use CompletableFuture)
- Prefer ArrayList, arrays over LinkedList, HashSet
- Use primitive streams (IntStream, LongStream, DoubleStream)
- Avoid stateful lambda expressions
- Use concurrent collectors when appropriate
- Be aware of ForkJoinPool.commonPool() limitations
- Consider custom ForkJoinPool for isolated workloads

**Decision Tree:**
1. Is N large enough? (> 10,000 for simple ops)
2. Is operation CPU-intensive (not I/O)?
3. Is data structure easily splittable?
4. Are operations independent (no shared state)?
5. Have you benchmarked?

If all yes → Use parallel streams
Otherwise → Stick with sequential or use alternatives`
    },
    {
      id: 13,
      category: 'Method References',
      difficulty: 'Hard',
      question: 'Explain all four types of method references with complex examples. How do constructor references work with generics?',
      answer: `**Method References - Deep Dive:**

**Overview:**
Method references are shorthand notation of lambda expressions to call a method. They make code more readable when lambda just calls an existing method.

**Four Types of Method References:**

**1. Static Method Reference - ClassName::staticMethod**
\`\`\`java
// Lambda
Function<String, Integer> parser1 = s -> Integer.parseInt(s);

// Method reference
Function<String, Integer> parser2 = Integer::parseInt;

// Usage
List<String> numbers = Arrays.asList("1", "2", "3");
List<Integer> parsed = numbers.stream()
    .map(Integer::parseInt)
    .collect(Collectors.toList());

// More examples
BiFunction<Integer, Integer, Integer> max = Math::max;
System.out.println(max.apply(10, 20));  // 20

Predicate<String> isEmpty = String::isEmpty;
boolean result = isEmpty.test("");  // true
\`\`\`

**2. Instance Method Reference (Bound) - instance::instanceMethod**
\`\`\`java
// Bound to specific instance
String str = "Hello";
Supplier<Integer> lengthSupplier = str::length;
System.out.println(lengthSupplier.get());  // 5

Predicate<String> startsWithHello = str::startsWith;
System.out.println(startsWithHello.test("Hel"));  // true

// Complex example
class Validator {
    private Set<String> blacklist = new HashSet<>();

    public Validator(Set<String> blacklist) {
        this.blacklist = blacklist;
    }

    public boolean isValid(String word) {
        return !blacklist.contains(word);
    }
}

Validator validator = new Validator(Set.of("bad", "word"));
Predicate<String> filter = validator::isValid;

List<String> words = Arrays.asList("good", "bad", "word", "nice");
List<String> valid = words.stream()
    .filter(filter)  // Uses validator instance
    .collect(Collectors.toList());  // ["good", "nice"]
\`\`\`

**3. Instance Method Reference (Unbound) - ClassName::instanceMethod**
\`\`\`java
// First parameter becomes the instance
Function<String, Integer> length = String::length;
System.out.println(length.apply("Hello"));  // 5

BiPredicate<String, String> contains = String::contains;
System.out.println(contains.test("Hello", "ell"));  // true

// Sorting example
List<String> words = Arrays.asList("banana", "apple", "cherry");
words.sort(String::compareToIgnoreCase);  // Uses first parameter as instance

// Method with multiple parameters
class Person {
    private String name;
    private int age;

    public void setDetails(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

// BiConsumer: (Person, String, Integer) - doesn't exist!
// Need custom functional interface
@FunctionalInterface
interface PersonUpdater {
    void update(Person p, String name, int age);
}

PersonUpdater updater = Person::setDetails;
Person p = new Person();
updater.update(p, "John", 30);
\`\`\`

**4. Constructor Reference - ClassName::new**
\`\`\`java
// Simple constructor
Supplier<Person> personSupplier = Person::new;  // No-arg constructor
Person p1 = personSupplier.get();

Function<String, Person> personCreator = Person::new;  // One-arg constructor
Person p2 = personCreator.apply("John");

BiFunction<String, Integer, Person> personBuilder = Person::new;  // Two-arg constructor
Person p3 = personBuilder.apply("John", 30);

// Array constructor
Function<Integer, int[]> arrayCreator = int[]::new;
int[] array = arrayCreator.apply(10);  // new int[10]

// List to array
List<String> list = Arrays.asList("a", "b", "c");
String[] array = list.stream().toArray(String[]::new);
\`\`\`

**Constructor References with Generics:**

**Basic Generic Constructor:**
\`\`\`java
class Box<T> {
    private T value;

    public Box(T value) {
        this.value = value;
    }

    public T getValue() {
        return value;
    }
}

// Constructor reference with generic
Function<String, Box<String>> stringBoxCreator = Box::new;
Box<String> box1 = stringBoxCreator.apply("Hello");

Function<Integer, Box<Integer>> intBoxCreator = Box::new;
Box<Integer> box2 = intBoxCreator.apply(42);

// Generic method using constructor reference
public <T> List<Box<T>> wrap(List<T> items) {
    return items.stream()
        .map(Box::new)  // Creates Box<T> for each item
        .collect(Collectors.toList());
}

List<String> strings = Arrays.asList("a", "b", "c");
List<Box<String>> boxes = wrap(strings);
\`\`\`

**Complex Generic Factory Pattern:**
\`\`\`java
@FunctionalInterface
interface Factory<T> {
    T create(String id, String data);
}

class Product<T> {
    private String id;
    private T data;

    public Product(String id, T data) {
        this.id = id;
        this.data = data;
    }
}

class ProductService<T> {
    private Factory<Product<T>> factory;

    public ProductService(Factory<Product<T>> factory) {
        this.factory = factory;
    }

    public Product<T> createProduct(String id, T data) {
        return factory.create(id, (String) data);  // Note: type erasure limitation
    }
}

// Usage
Factory<Product<String>> stringProductFactory = Product::new;
ProductService<String> service = new ProductService<>(stringProductFactory);
\`\`\`

**Generic Constructor with Type Inference:**
\`\`\`java
class Pair<K, V> {
    private K key;
    private V value;

    public Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }
}

// Type inference in action
BiFunction<String, Integer, Pair<String, Integer>> pairCreator = Pair::new;

Map<String, Integer> map = Map.of("age", 30, "year", 2024);
List<Pair<String, Integer>> pairs = map.entrySet().stream()
    .map(entry -> Pair::new)  // Type inferred from stream
    .collect(Collectors.toList());

// Better: use method reference directly
List<Pair<String, Integer>> pairs = map.entrySet().stream()
    .map(e -> new Pair<>(e.getKey(), e.getValue()))
    .collect(Collectors.toList());
\`\`\`

**Advanced: Constructor Reference with Varargs:**
\`\`\`java
class Data {
    private String[] values;

    public Data(String... values) {
        this.values = values;
    }
}

// Can't use constructor reference directly for varargs
// Must create wrapper functional interface
@FunctionalInterface
interface VarargsConstructor<T> {
    T create(String[] values);
}

VarargsConstructor<Data> creator = Data::new;  // Treats as array
Data data = creator.create(new String[]{"a", "b", "c"});
\`\`\`

**Practical Example - Builder Pattern with Method References:**
\`\`\`java
class User {
    private String name;
    private int age;
    private String email;

    public static class Builder {
        private String name;
        private int age;
        private String email;

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder age(int age) {
            this.age = age;
            return this;
        }

        public Builder email(String email) {
            this.email = email;
            return this;
        }

        public User build() {
            return new User(this);
        }
    }

    private User(Builder builder) {
        this.name = builder.name;
        this.age = builder.age;
        this.email = builder.email;
    }
}

// Using method references with builder
Supplier<User.Builder> builderSupplier = User.Builder::new;

List<Map<String, Object>> userData = loadUserData();
List<User> users = userData.stream()
    .map(map -> {
        User.Builder builder = builderSupplier.get();
        return builder
            .name((String) map.get("name"))
            .age((Integer) map.get("age"))
            .email((String) map.get("email"))
            .build();
    })
    .collect(Collectors.toList());
\`\`\`

**When to Use Method References:**

**✓ Good Cases:**
- Lambda only calls one method: \`s -> s.length()\` → \`String::length\`
- Lambda passes all parameters: \`(a, b) -> Math.max(a, b)\` → \`Math::max\`
- Constructor creation: \`() -> new Person()\` → \`Person::new\`

**✗ Bad Cases:**
- Lambda has additional logic: \`s -> s.length() + 1\` (stay with lambda)
- Parameter transformation: \`s -> s.toUpperCase().length()\` (stay with lambda)
- Multiple statements: Can't use method reference

**Common Pitfalls:**
- Type inference limitations with generics
- Ambiguous method references (multiple overloads)
- Can't reference private methods from outside class
- Constructor references with varargs require special handling
- Method reference doesn't support checked exceptions (need to wrap)`
    },
    {
      id: 14,
      category: 'Stream Performance',
      difficulty: 'Hard',
      question: 'How do you optimize Stream performance? Explain lazy evaluation, short-circuiting, and when to avoid streams.',
      answer: `**Stream Performance Optimization:**

**1. Lazy Evaluation:**

**How Lazy Evaluation Works:**
\`\`\`java
List<String> words = Arrays.asList("apple", "banana", "cherry");

// This does NOT execute yet!
Stream<String> stream = words.stream()
    .map(s -> {
        System.out.println("Mapping: " + s);
        return s.toUpperCase();
    })
    .filter(s -> {
        System.out.println("Filtering: " + s);
        return s.length() > 5;
    });

// Nothing printed yet!
System.out.println("Stream created");

// NOW it executes (terminal operation)
List<String> result = stream.collect(Collectors.toList());

// Output:
// Stream created
// Mapping: apple
// Filtering: APPLE
// Mapping: banana
// Filtering: BANANA
// Mapping: cherry
// Filtering: CHERRY
\`\`\`

**Intermediate vs Terminal Operations:**
\`\`\`java
// Intermediate operations (lazy) - return Stream
stream.map(...)      // Lazy
      .filter(...)   // Lazy
      .distinct()    // Lazy
      .sorted()      // Lazy (but stores elements)
      .limit()       // Lazy

// Terminal operations (eager) - trigger execution
stream.collect(...)  // Eager
      .forEach(...)  // Eager
      .reduce(...)   // Eager
      .count()       // Eager
      .anyMatch(...) // Eager (with short-circuit)
\`\`\`

**2. Short-Circuiting Operations:**

**Short-circuit operations stop processing when result is determined:**
\`\`\`java
List<Integer> numbers = IntStream.range(1, 1000000)
    .boxed()
    .collect(Collectors.toList());

// anyMatch - stops at first match
boolean hasEven = numbers.stream()
    .peek(n -> System.out.println("Checking: " + n))
    .anyMatch(n -> n % 2 == 0);
// Output: Checking: 1, Checking: 2 (then stops!)

// allMatch - stops at first non-match
boolean allPositive = numbers.stream()
    .allMatch(n -> n > 0);
// Stops at first negative number

// noneMatch - stops at first match
boolean noneNegative = numbers.stream()
    .noneMatch(n -> n < 0);

// findFirst - stops at first element
Optional<Integer> first = numbers.stream()
    .filter(n -> n > 100)
    .findFirst();  // Stops after finding first match

// findAny - stops at any match (useful for parallel)
Optional<Integer> any = numbers.parallelStream()
    .filter(n -> n > 100)
    .findAny();  // Faster in parallel

// limit - stops after N elements
List<Integer> firstTen = numbers.stream()
    .limit(10)
    .collect(Collectors.toList());
\`\`\`

**3. Performance Antipatterns:**

**Bad: Multiple Terminal Operations:**
\`\`\`java
// BAD - creates stream twice
List<Person> people = getPeople();
long count = people.stream().count();
List<String> names = people.stream()
    .map(Person::getName)
    .collect(Collectors.toList());

// GOOD - process once
Map<String, Long> result = people.stream()
    .collect(Collectors.teeing(
        Collectors.counting(),
        Collectors.mapping(Person::getName, Collectors.toList()),
        (cnt, names) -> Map.of("count", cnt, "names", (Long)(long)names.size())
    ));
\`\`\`

**Bad: Boxing/Unboxing:**
\`\`\`java
// BAD - boxing overhead
List<Integer> numbers = IntStream.range(1, 1000000)
    .boxed()  // int -> Integer
    .collect(Collectors.toList());

long sum = numbers.stream()
    .mapToInt(Integer::intValue)  // Integer -> int
    .sum();

// GOOD - use primitive streams
long sum = IntStream.range(1, 1000000)
    .sum();  // No boxing!

// GOOD - specialized streams
IntStream.range(1, 1000)
    .filter(n -> n % 2 == 0)
    .map(n -> n * 2)
    .average();
\`\`\`

**Bad: Inefficient Order:**
\`\`\`java
// BAD - filter after expensive map
List<String> result = words.stream()
    .map(s -> expensiveOperation(s))  // Process all!
    .filter(s -> s.length() > 10)     // Then filter
    .collect(Collectors.toList());

// GOOD - filter first
List<String> result = words.stream()
    .filter(s -> s.length() > 5)      // Cheap filter first
    .map(s -> expensiveOperation(s))  // Only process filtered
    .collect(Collectors.toList());
\`\`\`

**Bad: Using collect() for simple operations:**
\`\`\`java
// BAD - unnecessary collect
long count = list.stream()
    .filter(s -> s.length() > 5)
    .collect(Collectors.toList())
    .size();

// GOOD - use count()
long count = list.stream()
    .filter(s -> s.length() > 5)
    .count();

// BAD - collect then check
boolean hasAny = list.stream()
    .filter(predicate)
    .collect(Collectors.toList())
    .isEmpty();

// GOOD - use anyMatch
boolean hasAny = list.stream()
    .anyMatch(predicate);
\`\`\`

**4. When to Avoid Streams:**

**Use Loops Instead:**
\`\`\`java
// Case 1: Small datasets (< 100 elements)
List<Integer> small = Arrays.asList(1, 2, 3, 4, 5);

// Faster
int sum = 0;
for (int n : small) {
    sum += n;
}

// Slower (stream overhead)
int sum = small.stream().mapToInt(Integer::intValue).sum();

// Case 2: Early return/break logic
public String findFirstMatch(List<String> list) {
    // GOOD
    for (String s : list) {
        if (s.startsWith("test")) {
            return s;
        }
    }
    return null;

    // WORSE - functional but not clearer
    return list.stream()
        .filter(s -> s.startsWith("test"))
        .findFirst()
        .orElse(null);
}

// Case 3: Index needed
List<String> items = getItems();

// GOOD
for (int i = 0; i < items.size(); i++) {
    process(items.get(i), i);
}

// AWKWARD with streams
IntStream.range(0, items.size())
    .forEach(i -> process(items.get(i), i));

// Case 4: Primitive arrays
int[] array = new int[1000];

// GOOD
int sum = 0;
for (int n : array) {
    sum += n;
}

// WORSE - creates stream overhead
int sum = Arrays.stream(array).sum();
\`\`\`

**5. Micro-Optimizations:**

**Collector Optimization:**
\`\`\`java
// Use toList() (Java 16+) instead of Collectors.toList()
List<String> list = stream.toList();  // Faster, immutable

// Use Collectors.toCollection for mutable
List<String> list = stream.collect(Collectors.toCollection(ArrayList::new));

// Parallel collector
Map<String, List<Person>> grouped = people.parallelStream()
    .collect(Collectors.groupingByConcurrent(Person::getCity));
\`\`\`

**Reduce Allocations:**
\`\`\`java
// BAD - creates intermediate collections
List<String> result = list.stream()
    .filter(s -> s.length() > 5)
    .collect(Collectors.toList())
    .stream()
    .map(String::toUpperCase)
    .collect(Collectors.toList());

// GOOD - single pipeline
List<String> result = list.stream()
    .filter(s -> s.length() > 5)
    .map(String::toUpperCase)
    .collect(Collectors.toList());
\`\`\`

**6. Benchmarking:**

\`\`\`java
@Benchmark
public int streamSum(Blackhole bh) {
    return IntStream.range(1, 10000)
        .sum();
}

@Benchmark
public int loopSum(Blackhole bh) {
    int sum = 0;
    for (int i = 1; i < 10000; i++) {
        sum += i;
    }
    return sum;
}

// Results (JMH):
// streamSum: 12.3 µs
// loopSum:    3.1 µs
// Stream is 4x slower for simple operations!
\`\`\`

**Performance Guidelines:**

**Use Streams When:**
- Dataset > 10,000 elements (consider parallel)
- Complex functional transformations
- Multiple chained operations
- Readability is priority
- Operations are independent

**Use Loops When:**
- Dataset < 100 elements
- Simple operations (sum, count, iterate)
- Need index access
- Early termination with complex logic
- Maximum performance needed
- Mutable state required

**Best Practices:**
- Filter early, map late
- Use primitive streams (IntStream, LongStream, DoubleStream)
- Avoid boxing/unboxing
- Use short-circuiting operations
- Don't create multiple streams from same source
- Use parallel only for large datasets with CPU-intensive ops
- Profile before optimizing
- Prefer method references over lambdas (slightly faster)
- Use appropriate collectors (toList() in Java 16+)
- Avoid peek() in production (debugging only)`
    },
    {
      id: 15,
      category: 'Collectors',
      difficulty: 'Hard',
      question: 'Explain custom Collectors and advanced collection strategies. How do you implement your own Collector?',
      answer: `**Custom Collectors - Advanced Collection Strategies:**

**Collector Interface:**
\`\`\`java
public interface Collector<T, A, R> {
    Supplier<A> supplier();           // Create accumulator
    BiConsumer<A, T> accumulator();   // Add element to accumulator
    BinaryOperator<A> combiner();     // Combine accumulators (parallel)
    Function<A, R> finisher();        // Transform accumulator to result
    Set<Characteristics> characteristics();  // Collector properties
}

// Characteristics:
// CONCURRENT - thread-safe accumulator
// UNORDERED - order doesn't matter
// IDENTITY_FINISH - accumulator = result (no finisher needed)
\`\`\`

**1. Simple Custom Collector:**
\`\`\`java
// Collect into comma-separated string
public class CommaSeparatedCollector implements Collector<String, StringJoiner, String> {

    @Override
    public Supplier<StringJoiner> supplier() {
        return () -> new StringJoiner(", ");
    }

    @Override
    public BiConsumer<StringJoiner, String> accumulator() {
        return StringJoiner::add;
    }

    @Override
    public BinaryOperator<StringJoiner> combiner() {
        return StringJoiner::merge;
    }

    @Override
    public Function<StringJoiner, String> finisher() {
        return StringJoiner::toString;
    }

    @Override
    public Set<Characteristics> characteristics() {
        return Collections.emptySet();
    }
}

// Usage
List<String> words = Arrays.asList("apple", "banana", "cherry");
String result = words.stream()
    .collect(new CommaSeparatedCollector());
// "apple, banana, cherry"
\`\`\`

**2. Custom Collector with Statistics:**
\`\`\`java
public class StatisticsCollector<T extends Number>
    implements Collector<T, StatisticsCollector.Stats, StatisticsCollector.Stats> {

    static class Stats {
        long count = 0;
        double sum = 0;
        double min = Double.MAX_VALUE;
        double max = Double.MIN_VALUE;

        void add(double value) {
            count++;
            sum += value;
            min = Math.min(min, value);
            max = Math.max(max, value);
        }

        void combine(Stats other) {
            count += other.count;
            sum += other.sum;
            min = Math.min(min, other.min);
            max = Math.max(max, other.max);
        }

        double getAverage() {
            return count == 0 ? 0 : sum / count;
        }
    }

    @Override
    public Supplier<Stats> supplier() {
        return Stats::new;
    }

    @Override
    public BiConsumer<Stats, T> accumulator() {
        return (stats, num) -> stats.add(num.doubleValue());
    }

    @Override
    public BinaryOperator<Stats> combiner() {
        return (stats1, stats2) -> {
            stats1.combine(stats2);
            return stats1;
        };
    }

    @Override
    public Function<Stats, Stats> finisher() {
        return Function.identity();
    }

    @Override
    public Set<Characteristics> characteristics() {
        return Set.of(Characteristics.IDENTITY_FINISH, Characteristics.UNORDERED);
    }
}

// Usage
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 10, 100);
StatisticsCollector.Stats stats = numbers.stream()
    .collect(new StatisticsCollector<>());

System.out.println("Count: " + stats.count);
System.out.println("Sum: " + stats.sum);
System.out.println("Average: " + stats.getAverage());
System.out.println("Min: " + stats.min);
System.out.println("Max: " + stats.max);
\`\`\`

**3. Collector.of() - Shorthand Creation:**
\`\`\`java
// Create collector without implementing interface
Collector<String, ?, String> toCommaSeparated = Collector.of(
    () -> new StringJoiner(", "),      // supplier
    StringJoiner::add,                  // accumulator
    StringJoiner::merge,                // combiner
    StringJoiner::toString              // finisher
);

// With characteristics
Collector<String, ?, Set<String>> toUnmodifiableSet = Collector.of(
    HashSet::new,
    Set::add,
    (set1, set2) -> { set1.addAll(set2); return set1; },
    Collections::unmodifiableSet,
    Collector.Characteristics.UNORDERED
);
\`\`\`

**4. Advanced: Immutable Collection Collector:**
\`\`\`java
public class ImmutableListCollector<T> implements Collector<T, List<T>, List<T>> {

    @Override
    public Supplier<List<T>> supplier() {
        return ArrayList::new;
    }

    @Override
    public BiConsumer<List<T>, T> accumulator() {
        return List::add;
    }

    @Override
    public BinaryOperator<List<T>> combiner() {
        return (list1, list2) -> {
            list1.addAll(list2);
            return list1;
        };
    }

    @Override
    public Function<List<T>, List<T>> finisher() {
        return Collections::unmodifiableList;
    }

    @Override
    public Set<Characteristics> characteristics() {
        return Collections.emptySet();  // Not IDENTITY_FINISH due to wrapper
    }
}

// Usage
List<String> immutable = stream.collect(new ImmutableListCollector<>());
// immutable.add("test");  // UnsupportedOperationException
\`\`\`

**5. Downstream Collectors:**

**groupingBy with custom downstream:**
\`\`\`java
List<Person> people = getPeople();

// Group by city, collect names into comma-separated string
Map<String, String> cityNames = people.stream()
    .collect(Collectors.groupingBy(
        Person::getCity,
        Collectors.mapping(
            Person::getName,
            Collectors.joining(", ")
        )
    ));

// Group by city, collect statistics
Map<String, IntSummaryStatistics> cityAgeStats = people.stream()
    .collect(Collectors.groupingBy(
        Person::getCity,
        Collectors.summarizingInt(Person::getAge)
    ));

// Group by city, count and average age
Map<String, Map<String, Object>> cityData = people.stream()
    .collect(Collectors.groupingBy(
        Person::getCity,
        Collectors.teeing(
            Collectors.counting(),
            Collectors.averagingInt(Person::getAge),
            (count, avgAge) -> Map.of("count", count, "avgAge", avgAge)
        )
    ));
\`\`\`

**6. Custom Partitioning Collector:**
\`\`\`java
public class MultiPartitionCollector<T>
    implements Collector<T, Map<String, List<T>>, Map<String, List<T>>> {

    private final List<Predicate<T>> predicates;
    private final List<String> labels;

    public MultiPartitionCollector(List<Predicate<T>> predicates, List<String> labels) {
        this.predicates = predicates;
        this.labels = labels;
    }

    @Override
    public Supplier<Map<String, List<T>>> supplier() {
        return () -> {
            Map<String, List<T>> map = new LinkedHashMap<>();
            labels.forEach(label -> map.put(label, new ArrayList<>()));
            return map;
        };
    }

    @Override
    public BiConsumer<Map<String, List<T>>, T> accumulator() {
        return (map, item) -> {
            for (int i = 0; i < predicates.size(); i++) {
                if (predicates.get(i).test(item)) {
                    map.get(labels.get(i)).add(item);
                    break;  // First match wins
                }
            }
        };
    }

    @Override
    public BinaryOperator<Map<String, List<T>>> combiner() {
        return (map1, map2) -> {
            map2.forEach((key, value) -> map1.get(key).addAll(value));
            return map1;
        };
    }

    @Override
    public Function<Map<String, List<T>>, Map<String, List<T>>> finisher() {
        return Function.identity();
    }

    @Override
    public Set<Characteristics> characteristics() {
        return Set.of(Characteristics.IDENTITY_FINISH);
    }
}

// Usage
List<Integer> numbers = IntStream.range(1, 100).boxed().collect(Collectors.toList());

Map<String, List<Integer>> partitioned = numbers.stream()
    .collect(new MultiPartitionCollector<>(
        Arrays.asList(
            n -> n < 33,
            n -> n < 66,
            n -> true
        ),
        Arrays.asList("low", "medium", "high")
    ));
\`\`\`

**7. Performance-Optimized Collector:**
\`\`\`java
// Concurrent collector for parallel streams
public class ConcurrentSetCollector<T>
    implements Collector<T, Set<T>, Set<T>> {

    @Override
    public Supplier<Set<T>> supplier() {
        return ConcurrentHashMap::newKeySet;  // Thread-safe
    }

    @Override
    public BiConsumer<Set<T>, T> accumulator() {
        return Set::add;
    }

    @Override
    public BinaryOperator<Set<T>> combiner() {
        return (set1, set2) -> {
            set1.addAll(set2);
            return set1;
        };
    }

    @Override
    public Function<Set<T>, Set<T>> finisher() {
        return Function.identity();
    }

    @Override
    public Set<Characteristics> characteristics() {
        return Set.of(
            Characteristics.CONCURRENT,
            Characteristics.UNORDERED,
            Characteristics.IDENTITY_FINISH
        );
    }
}

// Parallel-safe usage
Set<String> uniqueWords = largeList.parallelStream()
    .collect(new ConcurrentSetCollector<>());
\`\`\`

**8. Real-World Example - Top-K Collector:**
\`\`\`java
public class TopKCollector<T> implements Collector<T, PriorityQueue<T>, List<T>> {

    private final int k;
    private final Comparator<T> comparator;

    public TopKCollector(int k, Comparator<T> comparator) {
        this.k = k;
        this.comparator = comparator.reversed();  // Min-heap for top-K
    }

    @Override
    public Supplier<PriorityQueue<T>> supplier() {
        return () -> new PriorityQueue<>(comparator);
    }

    @Override
    public BiConsumer<PriorityQueue<T>, T> accumulator() {
        return (queue, item) -> {
            queue.offer(item);
            if (queue.size() > k) {
                queue.poll();  // Remove smallest
            }
        };
    }

    @Override
    public BinaryOperator<PriorityQueue<T>> combiner() {
        return (queue1, queue2) -> {
            queue2.forEach(item -> {
                queue1.offer(item);
                if (queue1.size() > k) {
                    queue1.poll();
                }
            });
            return queue1;
        };
    }

    @Override
    public Function<PriorityQueue<T>, List<T>> finisher() {
        return queue -> {
            List<T> result = new ArrayList<>(queue);
            result.sort(comparator.reversed());  // Reverse back to descending
            return result;
        };
    }

    @Override
    public Set<Characteristics> characteristics() {
        return Collections.emptySet();
    }
}

// Usage
List<Person> topTen = people.stream()
    .collect(new TopKCollector<>(10, Comparator.comparing(Person::getAge)));
\`\`\`

**When to Create Custom Collectors:**
- Built-in collectors don't fit your needs
- Need specific data structure (custom collection)
- Performance optimization (reduce intermediate allocations)
- Domain-specific aggregations
- Complex business logic in collection phase
- Need special handling for parallel streams
- Want reusable collection logic across codebase

**Best Practices:**
- Use Collector.of() for simple collectors
- Implement Collector interface for complex logic
- Mark CONCURRENT if thread-safe
- Mark IDENTITY_FINISH to avoid finisher call
- Test with parallel streams if applicable
- Document thread-safety guarantees
- Consider performance implications of combiner
- Use appropriate data structures in accumulator`
    }
  ]

  // Filter questions based on problemLimit (for Top 100/300 mode)
  const displayQuestions = problemLimit ? questions.slice(0, problemLimit) : questions

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
      'Method References': '#ec4899',
      'Date Time API': '#06b6d4',
      'CompletableFuture': '#f43f5e',
      'Collectors': '#a855f7',
      'Nashorn JavaScript': '#64748b',
      'Parallel Streams': '#14b8a6',
      'Stream Performance': '#0ea5e9'
    }
    return colors[category] || '#6b7280'
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', minHeight: '100vh' }}>
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

      <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

      <CollapsibleSidebar
        items={displayQuestions}
        selectedIndex={expandedQuestion ? displayQuestions.findIndex(q => q.id === expandedQuestion) : -1}
        onSelect={(index) => toggleQuestion(displayQuestions[index].id)}
        title="Questions"
        getItemLabel={(item) => `${item.id}. ${item.category}`}
        getItemIcon={() => '❓'}
        primaryColor="#3b82f6"
      />

      <p style={{
        fontSize: '1.1rem',
        color: '#d1d5db',
        textAlign: 'left',
        marginBottom: '2rem',
        lineHeight: '1.6'
      }}>
        Java 8 interview questions covering Lambda Expressions, Stream API, Functional Interfaces, and more.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {displayQuestions.map((q) => (
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
                  <CompletionCheckbox problemId={`Java8Questions-${q.id}`} />
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
