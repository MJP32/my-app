import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

function JavaQuestions({ onBack, breadcrumb }) {
  const [expandedQuestion, setExpandedQuestion] = useState(null)

  // Helper function to render formatted text with colors for bold sections
  const renderFormattedAnswer = (text) => {
    const lines = text.split('\n')
    const colors = ['#2563eb', '#7c3aed', '#059669', '#dc2626', '#ea580c', '#0891b2']
    let colorIndex = 0

    return lines.map((line, lineIndex) => {
      // Check if line starts with ** (bold section header)
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

      // Check for numbered sections like **1. Title:**
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

      // Regular line
      return <div key={lineIndex}>{line}</div>
    })
  }

  const questions = [
    {
      id: 1,
      category: 'Core Java',
      question: 'What is the difference between JDK, JRE, and JVM?',
      answer: `**JVM (Java Virtual Machine):**
- Runtime engine that executes Java bytecode
- Provides platform independence (Write Once, Run Anywhere)
- Performs memory management, garbage collection
- Machine-specific (different for Windows, Mac, Linux)

**JRE (Java Runtime Environment):**
- Contains JVM + libraries + other components to run Java applications
- JRE = JVM + Libraries (rt.jar) + Other files
- Used by end-users who only want to run Java applications
- Does NOT include development tools like compiler

**JDK (Java Development Kit):**
- Contains JRE + development tools (compiler, debugger, etc.)
- JDK = JRE + Development Tools (javac, javadoc, jar, etc.)
- Used by developers to develop Java applications
- Includes everything needed to develop, compile, and run Java code

**Relationship:**
JDK ⊃ JRE ⊃ JVM`
    },
    {
      id: 2,
      category: 'OOP',
      question: 'Explain the four pillars of Object-Oriented Programming',
      answer: `**1. Encapsulation:**
- Bundling data (fields) and methods that operate on that data into a single unit (class)
- Hiding internal state using private access modifiers
- Providing public getters/setters for controlled access
- Example: Private fields with public getter/setter methods

**2. Inheritance:**
- Mechanism where one class acquires properties and behaviors of another class
- Promotes code reusability and establishes IS-A relationship
- Uses \`extends\` keyword
- Example: Dog extends Animal (Dog IS-A Animal)
- Java supports single inheritance for classes, multiple for interfaces

**3. Polymorphism:**
- Ability of an object to take many forms
- **Compile-time (Method Overloading):** Same method name, different parameters
- **Runtime (Method Overriding):** Subclass provides specific implementation of parent method
- Example: Animal reference pointing to Dog object calls Dog's speak() method

**4. Abstraction:**
- Hiding complex implementation details and showing only essential features
- Achieved using abstract classes and interfaces
- Example: Car interface with start() method - user doesn't need to know engine mechanics
- Focuses on WHAT an object does rather than HOW it does it`
    },
    {
      id: 3,
      category: 'Collections',
      question: 'What is the difference between ArrayList and LinkedList?',
      answer: `**ArrayList:**
- Backed by dynamic array
- Fast random access: O(1) for get(index)
- Slow insertion/deletion in middle: O(n) due to shifting elements
- Better for read-heavy operations
- Less memory per element (just stores elements)
- Use when: Frequent access by index, less frequent modifications

**LinkedList:**
- Backed by doubly-linked list
- Slow random access: O(n) for get(index) - must traverse from head/tail
- Fast insertion/deletion at beginning/end: O(1)
- Fast insertion/deletion in middle: O(1) if you have the node reference
- More memory per element (stores element + two node references)
- Use when: Frequent insertions/deletions, especially at beginning/end

**Performance Comparison:**
| Operation | ArrayList | LinkedList |
|-----------|-----------|------------|
| get(i)    | O(1)      | O(n)       |
| add(element) | O(1) amortized | O(1) |
| add(i, element) | O(n) | O(n) |
| remove(i) | O(n)      | O(n)       |
| Iterator.remove() | O(n) | O(1) |

**Best Practice:** Use ArrayList by default, only use LinkedList if you have specific requirements for frequent insertions/deletions.`
    },
    {
      id: 4,
      category: 'Multithreading',
      question: 'What is the difference between synchronized method and synchronized block?',
      answer: `**Synchronized Method:**
\`\`\`java
public synchronized void method() {
    // entire method is synchronized
    // locks the entire object (this)
}
\`\`\`

**Synchronized Block:**
\`\`\`java
public void method() {
    // some code
    synchronized(this) {
        // only this block is synchronized
        // can lock specific object
    }
    // more code
}
\`\`\`

**Key Differences:**

**1. Lock Scope:**
- Method: Locks entire object for the whole method duration
- Block: Locks only for the critical section, better performance

**2. Flexibility:**
- Method: Always locks \`this\` (or Class object for static methods)
- Block: Can lock any object, more flexible
  \`\`\`java
  synchronized(lockObject) { }  // Lock specific object
  \`\`\`

**3. Granularity:**
- Method: Coarse-grained locking (locks more than needed)
- Block: Fine-grained locking (locks only critical section)

**4. Performance:**
- Method: Can cause more contention and waiting
- Block: Better performance by reducing lock holding time

**When to Use:**
- **Synchronized Method:** When entire method needs to be atomic
- **Synchronized Block:** When only part of method is critical section, or when you need to lock multiple objects in specific order (to avoid deadlock)`
    },
    {
      id: 5,
      category: 'Exception Handling',
      question: 'What is the difference between Checked and Unchecked exceptions?',
      answer: `**Checked Exceptions:**
- Exceptions that are checked at compile-time
- Must be either caught (try-catch) or declared (throws)
- Extend Exception class (but not RuntimeException)
- Represent recoverable conditions
- Examples: IOException, SQLException, ClassNotFoundException
- Compiler forces you to handle them

\`\`\`java
// Must handle with try-catch or throws
public void readFile() throws IOException {
    FileReader fr = new FileReader("file.txt");
}
\`\`\`

**Unchecked Exceptions:**
- Exceptions checked at runtime, not compile-time
- No requirement to catch or declare
- Extend RuntimeException class
- Represent programming errors (bugs)
- Examples: NullPointerException, ArrayIndexOutOfBoundsException, IllegalArgumentException
- Not forced by compiler

\`\`\`java
// No need to declare or catch
public void divide(int a, int b) {
    return a / b;  // May throw ArithmeticException
}
\`\`\`

**When to Use:**

**Checked Exceptions:**
- External resource failures (file not found, network down)
- Situations where caller can reasonably recover
- Example: Retry connection, use default file

**Unchecked Exceptions:**
- Programming errors (null pointer, index out of bounds)
- Conditions that shouldn't happen with correct code
- Example: Null checks, array bounds checks

**Hierarchy:**
Throwable → Exception → RuntimeException (unchecked)
Throwable → Exception → IOException (checked)
Throwable → Error (unchecked, but not used for app exceptions)`
    },
    {
      id: 6,
      category: 'Core Java',
      question: 'What is the difference between == and equals() in Java?',
      answer: `**== Operator:**
- Compares references (memory addresses)
- For primitives: compares values
- For objects: checks if both references point to same object in memory
- Cannot be overridden
- Fast comparison (just memory address comparison)

**equals() Method:**
- Compares contents/values of objects
- Defined in Object class, can be overridden
- Default implementation in Object class uses ==
- String class overrides to compare character sequences
- Must override equals() when you want logical equality

**Examples:**

\`\`\`java
// Primitives - == compares values
int a = 5;
int b = 5;
System.out.println(a == b);  // true

// Objects - == compares references
String s1 = new String("hello");
String s2 = new String("hello");
System.out.println(s1 == s2);        // false (different objects)
System.out.println(s1.equals(s2));   // true (same content)

// String pool
String s3 = "hello";
String s4 = "hello";
System.out.println(s3 == s4);        // true (same object in pool)
System.out.println(s3.equals(s4));   // true (same content)
\`\`\`

**Best Practices:**

1. **Use == for:**
   - Primitives (int, char, boolean, etc.)
   - Checking if two references point to exact same object
   - Checking null: \`if (obj == null)\`

2. **Use equals() for:**
   - Comparing object contents
   - Strings: always use equals()
   - Custom objects: override equals() for logical equality

3. **When overriding equals():**
   - Must override hashCode() too (equals-hashCode contract)
   - Make it symmetric, transitive, consistent, reflexive
   - Check null and class type first

\`\`\`java
@Override
public boolean equals(Object obj) {
    if (this == obj) return true;
    if (obj == null || getClass() != obj.getClass()) return false;
    Person person = (Person) obj;
    return age == person.age &&
           Objects.equals(name, person.name);
}
\`\`\``
    },
    {
      id: 7,
      category: 'Core Java',
      question: 'Explain String, StringBuilder, and StringBuffer',
      answer: `**String:**
- Immutable (cannot be changed after creation)
- Thread-safe (because immutable)
- Stored in String Pool for memory optimization
- Every modification creates a new String object
- Use for: Small number of concatenations, constant strings

\`\`\`java
String s = "Hello";
s = s + " World";  // Creates new String object
\`\`\`

**StringBuilder:**
- Mutable (can be modified)
- NOT thread-safe
- Faster than StringBuffer (no synchronization overhead)
- Use for: String manipulation in single-threaded environment

\`\`\`java
StringBuilder sb = new StringBuilder("Hello");
sb.append(" World");  // Modifies same object
\`\`\`

**StringBuffer:**
- Mutable (can be modified)
- Thread-safe (synchronized methods)
- Slower than StringBuilder due to synchronization
- Use for: String manipulation in multi-threaded environment

\`\`\`java
StringBuffer sbf = new StringBuffer("Hello");
sbf.append(" World");  // Modifies same object, synchronized
\`\`\`

**Performance Comparison:**

For 10,000 concatenations:
- String: Very slow (creates 10,000 objects)
- StringBuilder: Fast (~1-2ms)
- StringBuffer: Moderate (~3-5ms due to synchronization)

**When to Use:**

| Scenario | Use |
|----------|-----|
| Constant string | String |
| Single-threaded concatenation | StringBuilder |
| Multi-threaded concatenation | StringBuffer |
| Small concatenations (2-3) | String with + |
| Loop concatenations | StringBuilder |

**Common Mistake:**
\`\`\`java
// BAD - creates new String in each iteration
String result = "";
for (int i = 0; i < 1000; i++) {
    result += i;  // Creates 1000 String objects!
}

// GOOD - uses StringBuilder
StringBuilder result = new StringBuilder();
for (int i = 0; i < 1000; i++) {
    result.append(i);  // Modifies same object
}
\`\`\``
    },
    {
      id: 8,
      category: 'Collections',
      question: 'Explain HashMap internal working in Java',
      answer: `**Internal Structure:**
- Array of Node<K,V>[] (buckets)
- Each Node contains: key, value, hash, next (for linked list)
- Default capacity: 16 buckets
- Load factor: 0.75 (rehashes when 75% full)

**How put() Works:**

1. **Calculate Hash:**
\`\`\`java
hash = key.hashCode()
index = hash & (array.length - 1)  // Bitwise AND for modulo
\`\`\`

2. **Find Bucket:**
- Use hash to find array index (bucket)

3. **Handle Collisions:**
- **Java 7:** Linked List (all collisions in same bucket)
- **Java 8+:** Linked List → Tree (when > 8 elements in bucket)
  - Converts to Red-Black Tree for O(log n) lookup
  - Converts back to list when < 6 elements

4. **Insert/Update:**
- If bucket empty: insert new Node
- If key exists: update value
- If collision: add to end of list/tree

**How get() Works:**

1. Calculate hash from key
2. Find bucket using hash
3. If bucket has multiple entries:
   - Traverse linked list / search tree
   - Use equals() to find matching key
4. Return value

**Resizing (Rehashing):**
- When size > capacity × load factor (e.g., 16 × 0.75 = 12)
- Doubles capacity: 16 → 32 → 64 → ...
- Recalculates hash for all entries
- Redistributes entries to new buckets

**Time Complexity:**

| Operation | Best Case | Average | Worst Case (Java 7) | Worst Case (Java 8+) |
|-----------|-----------|---------|---------------------|----------------------|
| put()     | O(1)      | O(1)    | O(n)                | O(log n)             |
| get()     | O(1)      | O(1)    | O(n)                | O(log n)             |

**Important Points:**

1. **hashCode() and equals() Contract:**
   - If a.equals(b) → a.hashCode() == b.hashCode()
   - Must override both or neither

2. **Null Keys:**
   - HashMap allows one null key (stored at index 0)
   - HashTable doesn't allow null keys/values

3. **Thread Safety:**
   - HashMap is NOT thread-safe
   - Use ConcurrentHashMap for multi-threading

4. **Java 8 Optimization:**
   - Treeify threshold: 8 (converts to tree)
   - Untreeify threshold: 6 (converts back to list)
   - Prevents oscillation between structures`
    },
    {
      id: 9,
      category: 'Core Java',
      question: 'What is the difference between abstract class and interface?',
      answer: `**Abstract Class:**
- Can have both abstract and concrete methods
- Can have instance variables (state)
- Can have constructors
- Supports access modifiers (private, protected, public)
- Single inheritance (extends one class)
- Use when: Classes share common code/state

\`\`\`java
abstract class Animal {
    private String name;  // Instance variable

    public Animal(String name) {  // Constructor
        this.name = name;
    }

    public void eat() {  // Concrete method
        System.out.println("Eating...");
    }

    public abstract void sound();  // Abstract method
}
\`\`\`

**Interface:**
- Only abstract methods (until Java 8)
- Java 8+: Can have default and static methods
- Only public static final variables (constants)
- No constructors
- All methods implicitly public abstract
- Multiple inheritance (implements multiple interfaces)
- Use when: Defining contract/capability

\`\`\`java
interface Flyable {
    int MAX_SPEED = 100;  // public static final

    void fly();  // public abstract

    default void land() {  // Java 8+
        System.out.println("Landing...");
    }

    static void checkWeather() {  // Java 8+
        System.out.println("Checking...");
    }
}
\`\`\`

**Java 8+ Changes:**

**Default Methods:**
- Provide default implementation in interface
- Can be overridden by implementing class
- Allows adding new methods without breaking existing code

**Static Methods:**
- Utility methods in interface
- Cannot be overridden
- Called using Interface.method()

**When to Use:**

**Abstract Class:**
- Related classes share common code
- Need constructors or instance variables
- Need non-public members
- Want to provide default behavior
- Example: Template Method pattern

**Interface:**
- Unrelated classes should implement capability
- Define contract without implementation
- Support multiple inheritance
- Achieve loose coupling
- Example: Comparable, Serializable, Runnable

**Real-World Example:**
\`\`\`java
// Abstract class - IS-A relationship
abstract class Vehicle {
    protected String brand;
    public Vehicle(String brand) {
        this.brand = brand;
    }
    public abstract void start();
}

// Interface - CAN-DO capability
interface Flyable {
    void fly();
}

// Car IS-A Vehicle, cannot fly
class Car extends Vehicle {
    public Car(String brand) { super(brand); }
    public void start() { System.out.println("Car starting"); }
}

// FlyingCar IS-A Vehicle AND CAN fly
class FlyingCar extends Vehicle implements Flyable {
    public FlyingCar(String brand) { super(brand); }
    public void start() { System.out.println("Flying car starting"); }
    public void fly() { System.out.println("Flying..."); }
}
\`\`\`

**Comparison Table:**

| Feature | Abstract Class | Interface |
|---------|----------------|-----------|
| Methods | Abstract + Concrete | Abstract + Default (Java 8+) |
| Variables | Any type | public static final only |
| Constructor | Yes | No |
| Access Modifiers | All | public only |
| Inheritance | Single (extends) | Multiple (implements) |
| Use Case | Common behavior | Contract/Capability |`
    },
    {
      id: 10,
      category: 'Memory Management',
      question: 'Explain Java Memory Model (Heap vs Stack)',
      answer: `**Stack Memory:**
- Stores method calls and local variables
- Each thread has its own stack
- LIFO (Last In First Out) structure
- Automatically managed (variables cleared when method returns)
- Fast access
- Limited size (StackOverflowError if exceeded)
- Stores primitive values and object references

**Heap Memory:**
- Stores objects and instance variables
- Shared among all threads
- Managed by Garbage Collector
- Slower access than stack
- Larger size than stack
- OutOfMemoryError if full
- Divided into generations (Young, Old, Permanent/Metaspace)

**Example:**
\`\`\`java
public class MemoryExample {
    public void method() {
        int age = 30;              // Stack - primitive
        String name = "John";      // Stack - reference
                                   // Heap - "John" object
        Person p = new Person();   // Stack - reference p
                                   // Heap - Person object
    }
}
\`\`\`

**Memory Layout:**
\`\`\`
STACK                  HEAP
---------             ---------
| age=30    |         | Person object  |
| name ref  |-------->| String "John"  |
| p ref     |-------->| name="John"    |
---------             | age=30         |
                      ---------
\`\`\`

**Heap Generations:**

**1. Young Generation:**
- Eden Space: New objects created here
- Survivor Spaces (S0, S1): Objects that survive minor GC
- Minor GC occurs here (fast, frequent)

**2. Old Generation (Tenured):**
- Long-lived objects promoted from Young Gen
- Major GC occurs here (slow, less frequent)

**3. Metaspace (Java 8+) / PermGen (Java 7):**
- Class metadata, static variables, string pool
- Not part of heap in Java 8+

**Garbage Collection:**

**Minor GC:**
- Clears Young Generation
- Fast and frequent
- Most objects die young (generational hypothesis)

**Major GC (Full GC):**
- Clears Old Generation + Young Generation
- Slow, causes "Stop the World" pause
- Should be infrequent

**Memory Comparison:**

| Aspect | Stack | Heap |
|--------|-------|------|
| Storage | Local vars, method calls | Objects, instance vars |
| Size | Smaller | Larger |
| Speed | Faster | Slower |
| Access | Thread-specific | Shared |
| Management | Automatic (scope-based) | GC |
| Error | StackOverflowError | OutOfMemoryError |

**Common Issues:**

**StackOverflowError:**
\`\`\`java
// Infinite recursion
public void recursive() {
    recursive();  // No base case!
}
\`\`\`

**OutOfMemoryError: Java Heap Space:**
\`\`\`java
// Creating too many objects
List<byte[]> list = new ArrayList<>();
while(true) {
    list.add(new byte[1024*1024]);  // 1MB each
}
\`\`\`

**JVM Options:**
- \`-Xms\`: Initial heap size
- \`-Xmx\`: Maximum heap size
- \`-Xss\`: Stack size per thread
- Example: \`java -Xms512m -Xmx2g -Xss1m MyApp\``
    }
  ]

  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id)
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Core Java': '#f59e0b',
      'OOP': '#3b82f6',
      'Collections': '#8b5cf6',
      'Multithreading': '#10b981',
      'Exception Handling': '#ef4444',
      'Memory Management': '#ec4899'
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
          color: '#f9fafb',
          margin: 0
        }}>
          Java Interview Questions
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
        Common Java interview questions with detailed explanations. Click on any question to reveal the answer.
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
                ? '0 8px 16px rgba(0,0,0,0.1)'
                : '0 2px 8px rgba(0,0,0,0.05)'
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
          Interview Tips
        </h3>
        <ul style={{ color: '#d1d5db', lineHeight: '1.8', margin: '0.5rem 0' }}>
          <li>Understand the concepts deeply, don't just memorize answers</li>
          <li>Relate answers to real-world examples from your experience</li>
          <li>Be ready to write code that demonstrates these concepts</li>
          <li>Know the trade-offs and when to use each approach</li>
          <li>Practice explaining complex topics in simple terms</li>
        </ul>
      </div>
    </div>
  )
}

export default JavaQuestions
