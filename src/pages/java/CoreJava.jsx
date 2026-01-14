import { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

// Normalize indentation by removing common leading whitespace
const normalizeIndentation = (code) => {
  const lines = code.split('\n')

  // Filter out empty lines for calculating min indentation
  const nonEmptyLines = lines.filter(line => line.trim().length > 0)

  if (nonEmptyLines.length === 0) return code

  // Find minimum indentation
  const minIndent = Math.min(
    ...nonEmptyLines.map(line => {
      const match = line.match(/^(\s*)/)
      return match ? match[1].length : 0
    })
  )

  // Remove common indentation from all lines
  return lines.map(line => {
    if (line.trim().length === 0) return '' // Keep empty lines empty
    return line.substring(minIndent)
  }).join('\n')
}

// Simple syntax highlighter for Java code
const SyntaxHighlighter = ({ code }) => {
  const highlightJava = (code) => {
    // Normalize indentation first
    const normalizedCode = normalizeIndentation(code)

    let highlighted = normalizedCode
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
      fontFamily: '"Fira Code", "Consolas", "Monaco", "Courier New", monospace',
      fontSize: '0.9rem',
      lineHeight: '1.7',
      color: '#e2e8f0',
      whiteSpace: 'pre',
      overflowX: 'auto',
      textAlign: 'left',
      padding: '1.25rem',
      tabSize: 4,
      MozTabSize: 4,
      letterSpacing: '0.02em'
    }}>
      <code dangerouslySetInnerHTML={{ __html: highlightJava(code) }} style={{
        fontFamily: 'inherit',
        fontSize: 'inherit'
      }} />
    </pre>
  )
}

function CoreJava({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
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

    // Filter and combine sections to make them more meaningful
    const meaningfulSections = []
    let tempSection = null

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i]
      const codeLines = section.code.trim().split('\n').filter(line => {
        const trimmed = line.trim()
        return trimmed && !trimmed.startsWith('//') && trimmed !== ''
      })

      // If section has less than 3 meaningful lines, combine with next or previous
      if (codeLines.length < 3) {
        if (tempSection) {
          tempSection.code += '\n\n' + section.code
          tempSection.title = tempSection.title // Keep the first title
        } else {
          tempSection = { ...section }
        }
      } else {
        // This is a meaningful section
        if (tempSection) {
          // Combine the temp section with this one
          meaningfulSections.push({
            title: tempSection.title,
            code: tempSection.code + '\n\n' + section.code
          })
          tempSection = null
        } else {
          meaningfulSections.push(section)
        }
      }
    }

    // Add any remaining temp section
    if (tempSection) {
      if (meaningfulSections.length > 0) {
        // Combine with the last section
        const lastIdx = meaningfulSections.length - 1
        meaningfulSections[lastIdx].code += '\n\n' + tempSection.code
      } else {
        meaningfulSections.push(tempSection)
      }
    }

    return meaningfulSections
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
      name: 'Generics',
      icon: '🔤',
      explanation: `**Core Concept:**
• Parameterized types that enable type safety at compile time
• Introduced in Java 5 to eliminate ClassCastException at runtime
• Allow classes, interfaces, and methods to operate on specified types
• Provide stronger type checks and eliminate need for casting

**Type Parameters:**
• T - Type (most common, used for any class)
• E - Element (used in collections)
• K - Key (used in maps)
• V - Value (used in maps)
• N - Number (for numeric types)
• Convention: Single uppercase letters

**Generic Classes:**
• Define type parameter in class declaration: class Box<T>
• Type parameter used throughout class
• Multiple type parameters allowed: class Pair<K, V>
• Type is specified when creating instance: new Box<String>()

**Generic Methods:**
• Type parameter declared before return type: <T> void method(T param)
• Can be static or instance methods
• Type inference allows omitting type arguments in some cases
• Useful for utility methods that work with any type

**Bounded Type Parameters:**
• Upper Bound - <T extends Number> restricts to Number and subclasses
• Multiple Bounds - <T extends Class & Interface1 & Interface2>
• Lower Bound - <? super Integer> accepts Integer and superclasses (used in wildcards)
• Enables methods to call specific methods on the type parameter

**Wildcards:**
• Unbounded - <?> represents unknown type
• Upper Bounded - <? extends Number> accepts Number and subclasses (covariant)
• Lower Bounded - <? super Integer> accepts Integer and superclasses (contravariant)
• PECS Principle - Producer Extends, Consumer Super

**Type Erasure:**
• Generics removed during compilation (backward compatibility)
• Generic type replaced with Object or bound type
• Bridge methods generated for polymorphism
• Cannot create arrays of parameterized types
• Cannot use primitive types as type parameters

**Generic Interfaces:**
• Comparable<T>, Comparator<T>, Iterable<T>
• Custom interfaces: interface Repository<T, ID>
• Implementation can be generic or specify concrete type

**Benefits:**
• Type Safety - Compile-time type checking prevents ClassCastException
• Elimination of Casts - No need for explicit type casting
• Code Reusability - Write once, use with any type
• Cleaner Code - More readable and maintainable

**Common Patterns:**
• Generic Collections - List<String>, Map<Integer, String>
• Generic DAO/Repository - Repository<User, Long>
• Builder Pattern - Builder<T>
• Factory Pattern - Factory<T>`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Generic class with single type parameter
// ═══════════════════════════════════════════════════════════════════════════
class Box<T> {
    private T item;

    public void set(T item) {
        this.item = item;
    }

    public T get() {
        return item;
    }
}

Box<String> stringBox = new Box<>();
stringBox.set("Hello");
String value = stringBox.get();  // No casting needed
System.out.println("String box: " + value);

Box<Integer> intBox = new Box<>();
intBox.set(123);
Integer num = intBox.get();
System.out.println("Integer box: " + num);
// Output: String box: Hello
// Output: Integer box: 123


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Generic class with multiple type parameters
// ═══════════════════════════════════════════════════════════════════════════
class Pair<K, V> {
    private K key;
    private V value;

    public Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }

    public K getKey() { return key; }
    public V getValue() { return value; }
}

Pair<String, Integer> pair = new Pair<>("Age", 25);
System.out.println("Key: " + pair.getKey() + ", Value: " + pair.getValue());
// Output: Key: Age, Value: 25


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Generic method
// ═══════════════════════════════════════════════════════════════════════════
class Util {
    public static <T> void printArray(T[] array) {
        for (T element : array) {
            System.out.print(element + " ");
        }
        System.out.println();
    }

    public static <T> T getFirst(T[] array) {
        return array.length > 0 ? array[0] : null;
    }
}

Integer[] intArray = {1, 2, 3, 4, 5};
String[] strArray = {"Java", "Python", "C++"};

Util.printArray(intArray);
Util.printArray(strArray);
System.out.println("First integer: " + Util.getFirst(intArray));
System.out.println("First string: " + Util.getFirst(strArray));
// Output: 1 2 3 4 5
// Output: Java Python C++
// Output: First integer: 1
// Output: First string: Java


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Bounded type parameters - upper bound
// ═══════════════════════════════════════════════════════════════════════════
class NumberBox<T extends Number> {
    private T number;

    public NumberBox(T number) {
        this.number = number;
    }

    public double doubleValue() {
        return number.doubleValue();  // Can call Number methods
    }
}

NumberBox<Integer> intBox2 = new NumberBox<>(100);
NumberBox<Double> doubleBox = new NumberBox<>(3.14);
System.out.println("Int as double: " + intBox2.doubleValue());
System.out.println("Double value: " + doubleBox.doubleValue());
// Output: Int as double: 100.0
// Output: Double value: 3.14


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Multiple bounds
// ═══════════════════════════════════════════════════════════════════════════
interface Printable {
    void print();
}

class Document implements Printable {
    private String content;

    public Document(String content) {
        this.content = content;
    }

    public void print() {
        System.out.println("Document: " + content);
    }

    public int length() {
        return content.length();
    }
}

class Processor<T extends Document & Printable> {
    public void process(T item) {
        item.print();
        System.out.println("Length: " + item.length());
    }
}

Processor<Document> processor = new Processor<>();
processor.process(new Document("Hello World"));
// Output: Document: Hello World
// Output: Length: 11


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Wildcards - unbounded
// ═══════════════════════════════════════════════════════════════════════════
class WildcardDemo {
    public static void printList(List<?> list) {
        for (Object item : list) {
            System.out.print(item + " ");
        }
        System.out.println();
    }
}

List<Integer> intList = Arrays.asList(1, 2, 3);
List<String> strList = Arrays.asList("A", "B", "C");

WildcardDemo.printList(intList);
WildcardDemo.printList(strList);
// Output: 1 2 3
// Output: A B C


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Upper bounded wildcard (Producer Extends)
// ═══════════════════════════════════════════════════════════════════════════
class NumberProcessor {
    public static double sum(List<? extends Number> list) {
        double total = 0;
        for (Number num : list) {
            total += num.doubleValue();
        }
        return total;
    }
}

List<Integer> integers = Arrays.asList(1, 2, 3, 4, 5);
List<Double> doubles = Arrays.asList(1.5, 2.5, 3.5);

System.out.println("Sum of integers: " + NumberProcessor.sum(integers));
System.out.println("Sum of doubles: " + NumberProcessor.sum(doubles));
// Output: Sum of integers: 15.0
// Output: Sum of doubles: 7.5


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Lower bounded wildcard (Consumer Super)
// ═══════════════════════════════════════════════════════════════════════════
class ListAdder {
    public static void addIntegers(List<? super Integer> list) {
        list.add(1);
        list.add(2);
        list.add(3);
    }
}

List<Number> numberList = new ArrayList<>();
ListAdder.addIntegers(numberList);
System.out.println("Number list: " + numberList);

List<Object> objectList = new ArrayList<>();
ListAdder.addIntegers(objectList);
System.out.println("Object list: " + objectList);
// Output: Number list: [1, 2, 3]
// Output: Object list: [1, 2, 3]


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Generic interface and implementation
// ═══════════════════════════════════════════════════════════════════════════
interface Repository<T, ID> {
    T findById(ID id);
    void save(T entity);
}

class User {
    String name;
    User(String name) { this.name = name; }
    public String toString() { return "User: " + name; }
}

class UserRepository implements Repository<User, Long> {
    private Map<Long, User> database = new HashMap<>();

    public User findById(Long id) {
        return database.get(id);
    }

    public void save(User user) {
        database.put(System.currentTimeMillis(), user);
        System.out.println("Saved: " + user);
    }
}

UserRepository repo = new UserRepository();
repo.save(new User("Alice"));
repo.save(new User("Bob"));
// Output: Saved: User: Alice
// Output: Saved: User: Bob


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Type inference with diamond operator
// ═══════════════════════════════════════════════════════════════════════════
List<String> list1 = new ArrayList<String>();  // Java 6
List<String> list2 = new ArrayList<>();        // Java 7+ (type inference)

Map<String, List<Integer>> map1 = new HashMap<String, List<Integer>>();  // Java 6
Map<String, List<Integer>> map2 = new HashMap<>();                       // Java 7+

System.out.println("Type inference simplifies generic instantiation");
// Output: Type inference simplifies generic instantiation


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Generic method with type inference
// ═══════════════════════════════════════════════════════════════════════════
class GenericMethods {
    public static <T> List<T> createList(T... elements) {
        List<T> list = new ArrayList<>();
        for (T element : elements) {
            list.add(element);
        }
        return list;
    }
}

List<String> names = GenericMethods.createList("Alice", "Bob", "Charlie");
List<Integer> numbers = GenericMethods.createList(1, 2, 3, 4, 5);

System.out.println("Names: " + names);
System.out.println("Numbers: " + numbers);
// Output: Names: [Alice, Bob, Charlie]
// Output: Numbers: [1, 2, 3, 4, 5]`
    },
    {
      name: 'Collections Framework',
      icon: '📦',
      explanation: `**Core Concept:**
• Unified architecture for representing and manipulating groups of objects
• Provides interfaces, implementations, and algorithms for common data structures
• Part of java.util package, introduced in Java 1.2
• Eliminates need for custom data structure implementations

**Core Interfaces:**
• Collection - Root interface for most collection types
• List - Ordered collection (allows duplicates): ArrayList, LinkedList, Vector
• Set - No duplicates allowed: HashSet, TreeSet, LinkedHashSet
• Queue - FIFO ordering: LinkedList, PriorityQueue, ArrayDeque
• Deque - Double-ended queue: ArrayDeque, LinkedList
• Map - Key-value pairs: HashMap, TreeMap, LinkedHashMap, Hashtable

**List Implementations:**
• ArrayList - Resizable array, fast random access O(1), slow insertion/deletion O(n)
• LinkedList - Doubly-linked list, fast insertion/deletion O(1), slow random access O(n)
• Vector - Thread-safe ArrayList (legacy, prefer Collections.synchronizedList)
• CopyOnWriteArrayList - Thread-safe, optimized for read-heavy scenarios

**Set Implementations:**
• HashSet - Hash table, O(1) operations, no ordering guaranteed
• LinkedHashSet - Maintains insertion order, slightly slower than HashSet
• TreeSet - Red-black tree, O(log n) operations, sorted order
• EnumSet - Optimized for enum types, very fast

**Map Implementations:**
• HashMap - Hash table, O(1) average operations, no ordering
• LinkedHashMap - Maintains insertion/access order
• TreeMap - Red-black tree, O(log n) operations, sorted by keys
• Hashtable - Legacy synchronized map (prefer ConcurrentHashMap)
• ConcurrentHashMap - Thread-safe without locking entire map

**Queue Implementations:**
• PriorityQueue - Heap-based priority queue, elements ordered by natural/comparator
• ArrayDeque - Resizable array deque, faster than LinkedList for queue operations
• LinkedList - Implements both List and Deque interfaces

**Common Operations:**
• add/addAll - Add elements
• remove/removeAll - Remove elements
• contains/containsAll - Check membership
• size/isEmpty - Collection size
• iterator/forEach - Traverse elements
• clear - Remove all elements

**Utility Classes:**
• Collections - Static methods: sort, reverse, shuffle, binarySearch, synchronizedX
• Arrays - Array manipulation: sort, binarySearch, fill, copyOf, asList

**Benefits:**
• Reduced programming effort - Pre-built data structures
• Increased performance - Highly optimized implementations
• Interoperability - Consistent API across different collections
• Type safety - Generics prevent runtime ClassCastException`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ ArrayList - dynamic array
// ═══════════════════════════════════════════════════════════════════════════
import java.util.*;

List<String> arrayList = new ArrayList<>();
arrayList.add("Java");
arrayList.add("Python");
arrayList.add("JavaScript");
arrayList.add(1, "C++");  // Insert at index
System.out.println("ArrayList: " + arrayList);
System.out.println("Element at index 2: " + arrayList.get(2));
// Output: ArrayList: [Java, C++, Python, JavaScript]
// Output: Element at index 2: Python


// ═══════════════════════════════════════════════════════════════════════════
// ✦ LinkedList - doubly-linked list
// ═══════════════════════════════════════════════════════════════════════════
LinkedList<Integer> linkedList = new LinkedList<>();
linkedList.add(10);
linkedList.add(20);
linkedList.addFirst(5);   // Add to front
linkedList.addLast(30);   // Add to end
System.out.println("LinkedList: " + linkedList);
System.out.println("First: " + linkedList.getFirst());
System.out.println("Last: " + linkedList.getLast());
// Output: LinkedList: [5, 10, 20, 30]
// Output: First: 5
// Output: Last: 30


// ═══════════════════════════════════════════════════════════════════════════
// ✦ HashSet - no duplicates, no order
// ═══════════════════════════════════════════════════════════════════════════
Set<String> hashSet = new HashSet<>();
hashSet.add("Apple");
hashSet.add("Banana");
hashSet.add("Apple");  // Duplicate - ignored
hashSet.add("Cherry");
System.out.println("HashSet: " + hashSet);
System.out.println("Contains Banana: " + hashSet.contains("Banana"));
// Output: HashSet: [Apple, Cherry, Banana] (order may vary)
// Output: Contains Banana: true


// ═══════════════════════════════════════════════════════════════════════════
// ✦ TreeSet - sorted, no duplicates
// ═══════════════════════════════════════════════════════════════════════════
Set<Integer> treeSet = new TreeSet<>();
treeSet.add(50);
treeSet.add(20);
treeSet.add(70);
treeSet.add(20);  // Duplicate - ignored
treeSet.add(30);
System.out.println("TreeSet (sorted): " + treeSet);
// Output: TreeSet (sorted): [20, 30, 50, 70]


// ═══════════════════════════════════════════════════════════════════════════
// ✦ HashMap - key-value pairs
// ═══════════════════════════════════════════════════════════════════════════
Map<String, Integer> hashMap = new HashMap<>();
hashMap.put("Alice", 25);
hashMap.put("Bob", 30);
hashMap.put("Charlie", 35);
hashMap.put("Alice", 26);  // Updates existing value
System.out.println("HashMap: " + hashMap);
System.out.println("Alice's age: " + hashMap.get("Alice"));
System.out.println("Contains key 'Bob': " + hashMap.containsKey("Bob"));
// Output: HashMap: {Bob=30, Alice=26, Charlie=35} (order may vary)
// Output: Alice's age: 26
// Output: Contains key 'Bob': true


// ═══════════════════════════════════════════════════════════════════════════
// ✦ LinkedHashMap - maintains insertion order
// ═══════════════════════════════════════════════════════════════════════════
Map<String, String> linkedHashMap = new LinkedHashMap<>();
linkedHashMap.put("First", "Java");
linkedHashMap.put("Second", "Python");
linkedHashMap.put("Third", "C++");
System.out.println("LinkedHashMap: " + linkedHashMap);
// Output: LinkedHashMap: {First=Java, Second=Python, Third=C++} (insertion order)


// ═══════════════════════════════════════════════════════════════════════════
// ✦ TreeMap - sorted by keys
// ═══════════════════════════════════════════════════════════════════════════
Map<Integer, String> treeMap = new TreeMap<>();
treeMap.put(3, "Three");
treeMap.put(1, "One");
treeMap.put(2, "Two");
System.out.println("TreeMap (sorted): " + treeMap);
// Output: TreeMap (sorted): {1=One, 2=Two, 3=Three}


// ═══════════════════════════════════════════════════════════════════════════
// ✦ PriorityQueue - min heap by default
// ═══════════════════════════════════════════════════════════════════════════
PriorityQueue<Integer> pq = new PriorityQueue<>();
pq.offer(50);
pq.offer(20);
pq.offer(70);
pq.offer(30);
System.out.println("PriorityQueue polling (min first):");
while (!pq.isEmpty()) {
    System.out.print(pq.poll() + " ");
}
System.out.println();
// Output: PriorityQueue polling (min first):
// Output: 20 30 50 70


// ═══════════════════════════════════════════════════════════════════════════
// ✦ ArrayDeque - efficient stack and queue
// ═══════════════════════════════════════════════════════════════════════════
Deque<String> deque = new ArrayDeque<>();
deque.addFirst("Front");
deque.addLast("Back");
deque.offerFirst("New Front");
deque.offerLast("New Back");
System.out.println("Deque: " + deque);
System.out.println("Poll first: " + deque.pollFirst());
System.out.println("Poll last: " + deque.pollLast());
// Output: Deque: [New Front, Front, Back, New Back]
// Output: Poll first: New Front
// Output: Poll last: New Back


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Collections utility methods
// ═══════════════════════════════════════════════════════════════════════════
List<Integer> numbers = Arrays.asList(5, 2, 8, 1, 9);
Collections.sort(numbers);
System.out.println("Sorted: " + numbers);
Collections.reverse(numbers);
System.out.println("Reversed: " + numbers);
System.out.println("Max: " + Collections.max(numbers));
System.out.println("Min: " + Collections.min(numbers));
Collections.shuffle(numbers);
System.out.println("Shuffled: " + numbers);
// Output: Sorted: [1, 2, 5, 8, 9]
// Output: Reversed: [9, 8, 5, 2, 1]
// Output: Max: 9
// Output: Min: 1
// Output: Shuffled: [random order]


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Iteration and forEach
// ═══════════════════════════════════════════════════════════════════════════
List<String> langs = Arrays.asList("Java", "Python", "C++");

// Traditional for loop
for (int i = 0; i < langs.size(); i++) {
    System.out.println("Index " + i + ": " + langs.get(i));
}

// Enhanced for loop
for (String lang : langs) {
    System.out.println("Language: " + lang);
}

// Iterator
Iterator<String> it = langs.iterator();
while (it.hasNext()) {
    System.out.println("Next: " + it.next());
}

// forEach with lambda
langs.forEach(lang -> System.out.println("Lambda: " + lang));


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Thread-safe collections
// ═══════════════════════════════════════════════════════════════════════════
List<String> syncList = Collections.synchronizedList(new ArrayList<>());
Set<Integer> syncSet = Collections.synchronizedSet(new HashSet<>());
Map<String, Integer> concurrentMap = new ConcurrentHashMap<>();

// CopyOnWriteArrayList for read-heavy scenarios
List<String> cowList = new CopyOnWriteArrayList<>();
cowList.add("Thread-safe");
cowList.add("No locking for reads");

System.out.println("Synchronized collections created for thread-safe operations");
// Output: Synchronized collections created for thread-safe operations`
    },
    {
      name: 'Encapsulation',
      icon: '🔹',
      explanation: `**Core Concept:**
• One of the four fundamental OOP principles
• Bundles data (fields) and methods (functions) within a single unit (class)
• Creates a protective barrier around object's internal state

**Access Control:**
• private - Accessible only within the same class
• protected - Accessible within package and subclasses
• public - Accessible from anywhere
• package-private (default) - Accessible within the same package

**Key Benefits:**
• Data Integrity - Prevents unauthorized or invalid modifications
• Data Hiding - Internal implementation details are hidden
• Flexibility - Change internal implementation without affecting external code
• Maintainability - Clear interface between object's internal workings and outside world
• Security - Controlled access through public methods (getters/setters)

**Implementation Pattern:**
• Make fields private
• Provide public getter/setter methods for controlled access
• Add validation logic in setters to maintain data consistency`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Encapsulation - hiding internal state
// ═══════════════════════════════════════════════════════════════════════════
public class BankAccount {
    private double balance;  // private field
    private String accountNumber;

    public BankAccount(String accountNumber) {
        this.accountNumber = accountNumber;
        this.balance = 0.0;
    }

    // Controlled access through public methods
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }

    public boolean withdraw(double amount) {
        if (amount > 0 && balance >= amount) {
            balance -= amount;
            return true;
        }
        return false;
    }

    // Getter with validation
    public double getBalance() {
        return balance;
    }
}


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Usage example
// ═══════════════════════════════════════════════════════════════════════════
BankAccount account = new BankAccount("123456");
account.deposit(1000.0);
account.withdraw(250.0);
System.out.println(account.getBalance());
// Output: 750.0`
    },
    {
      name: 'Thread Management',
      icon: '🔹',
      explanation: `**Core Concept:**
• Creating, controlling, and coordinating multiple concurrent execution paths
• Enables programs to perform multiple tasks simultaneously
• Essential for building responsive, efficient applications

**Thread Creation Methods:**
• Extend Thread class - Direct but limits inheritance
• Implement Runnable interface - Preferred for better flexibility
• Use lambda expressions (Java 8+) - Concise syntax

**Thread Lifecycle States:**
• NEW - Thread created but not yet started
• RUNNABLE - Ready to run or currently running
• BLOCKED - Waiting to acquire a monitor lock
• WAITING - Waiting indefinitely for another thread's action
• TIMED_WAITING - Waiting for a specified period of time
• TERMINATED - Thread has completed execution

**Control Mechanisms:**
• Priorities - Range from 1 (MIN_PRIORITY) to 10 (MAX_PRIORITY)
• Daemon Threads - Background threads that terminate when all user threads finish
• Thread Methods - start(), run(), sleep(), join(), interrupt()

**Key Considerations:**
• Avoid deadlocks through careful resource ordering
• Prevent race conditions with proper synchronization
• Use thread pools instead of creating individual threads for better performance`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Method 1: Extend Thread class
// ═══════════════════════════════════════════════════════════════════════════
class MyThread extends Thread {
    public void run() {
        for (int i = 0; i < 3; i++) {
            System.out.println(Thread.currentThread().getName() + ": " + i);
            try { Thread.sleep(100); } catch (InterruptedException e) {}
        }
    }
}


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Method 2: Implement Runnable
// ═══════════════════════════════════════════════════════════════════════════
class MyRunnable implements Runnable {
    public void run() {
        System.out.println(Thread.currentThread().getName() + " executing");
    }
}


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Creating and starting threads
// ═══════════════════════════════════════════════════════════════════════════
MyThread thread1 = new MyThread();
thread1.setName("Worker-1");
thread1.start();
// Output: Worker-1: 0
// Output: Worker-1: 1
// Output: Worker-1: 2

Thread thread2 = new Thread(new MyRunnable());
thread2.start();
// Output: Thread-1 executing


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Method 3: Lambda with Runnable
// ═══════════════════════════════════════════════════════════════════════════
Thread thread3 = new Thread(() -> {
    System.out.println("Lambda thread: " + Thread.currentThread().getId());
});
thread3.start();
// Output: Lambda thread: 15


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Daemon thread - runs in background
// ═══════════════════════════════════════════════════════════════════════════
Thread daemon = new Thread(() -> {
    while (true) {
        System.out.println("Daemon running...");
        try { Thread.sleep(500); } catch (InterruptedException e) {}
    }
});
daemon.setDaemon(true);
daemon.start();


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Thread priorities
// ═══════════════════════════════════════════════════════════════════════════
thread1.setPriority(Thread.MAX_PRIORITY);  // 10
thread2.setPriority(Thread.MIN_PRIORITY);  // 1
System.out.println("Thread 1 priority: " + thread1.getPriority());
// Output: Thread 1 priority: 10`
    },
    {
      name: 'Synchronization',
      icon: '🔹',
      explanation: `**Core Concept:**
• Coordinates access to shared resources among multiple threads
• Prevents data inconsistency and race conditions
• Critical for thread safety in concurrent programs

**Synchronized Keyword:**
• Synchronized Methods - Lock entire method for single-thread access
• Synchronized Blocks - Lock specific code sections for fine-grained control
• Uses intrinsic locks (monitors) to ensure mutual exclusion
• Only one thread can execute synchronized code at a time

**Wait/Notify Mechanism:**
• wait() - Thread releases lock and waits for notification
• notify() - Wakes up one waiting thread
• notifyAll() - Wakes up all waiting threads
• Enables inter-thread communication and coordination

**Volatile Keyword:**
• Ensures memory visibility across threads
• Forces reads from main memory instead of thread-local cache
• Prevents instruction reordering
• Does NOT provide atomicity for compound operations (i++, etc.)

**Benefits:**
• Prevents race conditions
• Ensures thread safety
• Maintains data consistency
• Provides happens-before guarantees in Java Memory Model

**Considerations:**
• Performance - Excessive synchronization creates bottlenecks
• Deadlocks - Improper lock ordering can cause threads to wait indefinitely
• Liveness - Balance between safety and performance`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Synchronized method and block
// ═══════════════════════════════════════════════════════════════════════════
class Counter {
    private int count = 0;

    // Synchronized method - locks entire method
    public synchronized void increment() {
        count++;
    }

    public synchronized int getCount() {
        return count;
    }

    // Synchronized block - more fine-grained control
    public void incrementBlock() {
        synchronized(this) {
            count++;
        }
    }
}


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Usage - thread-safe counter
// ═══════════════════════════════════════════════════════════════════════════
Counter counter = new Counter();
Thread t1 = new Thread(() -> {
    for (int i = 0; i < 1000; i++) counter.increment();
});
Thread t2 = new Thread(() -> {
    for (int i = 0; i < 1000; i++) counter.increment();
});
t1.start();
t2.start();
t1.join();
t2.join();
System.out.println("Final count: " + counter.getCount());
// Output: Final count: 2000 (correct with synchronization)


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Wait/Notify pattern - Producer/Consumer
// ═══════════════════════════════════════════════════════════════════════════
class SharedResource {
    private int data;
    private boolean hasData = false;

    public synchronized void produce(int value) throws InterruptedException {
        while (hasData) {
            wait();  // Wait until consumed
        }
        data = value;
        hasData = true;
        System.out.println("Produced: " + value);
        notify();  // Notify consumer
    }

    public synchronized int consume() throws InterruptedException {
        while (!hasData) {
            wait();  // Wait until produced
        }
        hasData = false;
        System.out.println("Consumed: " + data);
        notify();  // Notify producer
        return data;
    }
}


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Volatile keyword - memory visibility
// ═══════════════════════════════════════════════════════════════════════════
class VolatileExample {
    private volatile boolean flag = false;

    public void writer() {
        flag = true;  // Visible to all threads immediately
    }

    public void reader() {
        if (flag) {
            System.out.println("Flag is true!");
        }
    }
}`
    },
    {
      name: 'Locks & Semaphores',
      icon: '🔹',
      explanation: `**Core Concept:**
• Advanced synchronization primitives from java.util.concurrent.locks
• Offer more flexibility and functionality than synchronized keyword
• Provide fine-grained control over locking behavior

**ReentrantLock:**
• Explicit lock/unlock control with try-finally pattern
• tryLock() - Non-blocking lock acquisition attempt
• tryLock(timeout) - Timed lock acquisition
• Fairness policy - Optional FIFO ordering for waiting threads
• Interruptible lock acquisition
• Condition variables for advanced wait/notify patterns

**ReadWriteLock (ReentrantReadWriteLock):**
• Optimizes read-heavy scenarios
• Multiple concurrent readers allowed
• Exclusive access for single writer
• Improves performance over exclusive locks
• Prevents writer starvation with fairness option

**Semaphore:**
• Controls access to limited number of resources
• Maintains counter of available permits
• acquire() - Decrements permit count (blocks if zero)
• release() - Increments permit count
• Use Cases: Connection pools, rate limiting, resource management

**CountDownLatch:**
• One-time synchronization barrier
• Allows threads to wait until operations complete
• countDown() - Decrements latch count
• await() - Blocks until count reaches zero
• Cannot be reset (use CyclicBarrier for reusable barriers)

**Advantages Over Synchronized:**
• Timeout support for lock acquisition
• Interruptibility while waiting
• Fairness guarantees
• Multiple condition variables
• Try-lock without blocking`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ ReentrantLock - more flexible than synchronized
// ═══════════════════════════════════════════════════════════════════════════
import java.util.concurrent.locks.*;
import java.util.concurrent.*;

class BankAccount {
    private double balance = 0;
    private ReentrantLock lock = new ReentrantLock();

    public void deposit(double amount) {
        lock.lock();
        try {
            balance += amount;
            System.out.println("Deposited: " + amount + ", Balance: " + balance);
        } finally {
            lock.unlock();  // Always unlock in finally
        }
    }

    public boolean tryDeposit(double amount) {
        if (lock.tryLock()) {  // Non-blocking attempt
            try {
                balance += amount;
                return true;
            } finally {
                lock.unlock();
            }
        }
        return false;
    }
}


// ═══════════════════════════════════════════════════════════════════════════
// ✦ ReadWriteLock - multiple readers, single writer
// ═══════════════════════════════════════════════════════════════════════════
class Cache {
    private Map<String, String> data = new HashMap<>();
    private ReadWriteLock rwLock = new ReentrantReadWriteLock();

    public String read(String key) {
        rwLock.readLock().lock();
        try {
            return data.get(key);
        } finally {
            rwLock.readLock().unlock();
        }
    }

    public void write(String key, String value) {
        rwLock.writeLock().lock();
        try {
            data.put(key, value);
            System.out.println("Written: " + key + " = " + value);
        } finally {
            rwLock.writeLock().unlock();
        }
    }
}


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Semaphore - limit concurrent access
// ═══════════════════════════════════════════════════════════════════════════
Semaphore semaphore = new Semaphore(3);  // Allow 3 concurrent threads
for (int i = 0; i < 5; i++) {
    int id = i;
    new Thread(() -> {
        try {
            semaphore.acquire();
            System.out.println("Thread " + id + " acquired permit");
            Thread.sleep(1000);
            semaphore.release();
            System.out.println("Thread " + id + " released permit");
        } catch (InterruptedException e) {}
    }).start();
}
// Output: Only 3 threads execute concurrently


// ═══════════════════════════════════════════════════════════════════════════
// ✦ CountDownLatch - wait for multiple threads
// ═══════════════════════════════════════════════════════════════════════════
CountDownLatch latch = new CountDownLatch(3);
for (int i = 0; i < 3; i++) {
    new Thread(() -> {
        System.out.println("Task completed");
        latch.countDown();
    }).start();
}
latch.await();  // Wait for all 3 threads
System.out.println("All tasks completed!");
// Output: All tasks completed! (after 3 countDowns)`
    },
    {
      name: 'Executor Framework',
      icon: '🔹',
      explanation: `**Core Concept:**
• High-level API for managing asynchronous tasks (introduced Java 5)
• Decouples task submission from execution mechanics
• Uses thread pools to efficiently reuse threads
• Eliminates overhead of creating new threads for each task

**Key Interfaces:**
• Executor - Basic execute(Runnable) method
• ExecutorService - Lifecycle management, task submission, shutdown
• ScheduledExecutorService - Delayed and periodic task execution
• ThreadPoolExecutor - Customizable thread pool implementation

**Common Executor Types:**
• newFixedThreadPool(n) - Fixed number of threads, shared unbounded queue
• newCachedThreadPool() - Creates threads as needed, reuses idle threads
• newSingleThreadExecutor() - Single worker thread, sequential execution
• newScheduledThreadPool(n) - Supports delayed and periodic tasks
• newWorkStealingPool() - Fork-join based pool (Java 8+)

**Task Submission:**
• Runnable - No return value, void run() method
• Callable<V> - Returns result via Future<V>, can throw exceptions
• submit() - Returns Future for result tracking
• invokeAll() - Executes multiple tasks, waits for all to complete
• invokeAny() - Executes multiple tasks, returns first successful result

**Thread Pool Configuration:**
• Core Pool Size - Minimum number of threads kept alive
• Maximum Pool Size - Maximum number of threads allowed
• Keep-Alive Time - How long excess threads wait before termination
• Work Queue - Stores tasks before execution (bounded/unbounded)
• Rejection Policy - Handles tasks when queue is full

**Lifecycle Management:**
• shutdown() - Graceful shutdown, completes submitted tasks
• shutdownNow() - Immediate shutdown, attempts to stop running tasks
• awaitTermination() - Blocks until all tasks complete after shutdown

**Benefits:**
• Automatic thread lifecycle management
• Task queuing and scheduling
• Resource cleanup
• Better performance and scalability
• Cleaner, more maintainable code`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Fixed thread pool
// ═══════════════════════════════════════════════════════════════════════════
import java.util.concurrent.*;

ExecutorService executor = Executors.newFixedThreadPool(3);
for (int i = 0; i < 5; i++) {
    int taskId = i;
    executor.submit(() -> {
        System.out.println("Task " + taskId + " by " + Thread.currentThread().getName());
        return taskId * taskId;
    });
}
executor.shutdown();
// Output: Task 0 by pool-1-thread-1
// Output: Task 1 by pool-1-thread-2
// Output: Task 2 by pool-1-thread-3
// (pool reuses threads for remaining tasks)


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Callable with Future - returns result
// ═══════════════════════════════════════════════════════════════════════════
ExecutorService exec = Executors.newSingleThreadExecutor();
Future<Integer> future = exec.submit(() -> {
    Thread.sleep(1000);
    return 42;
});
System.out.println("Waiting for result...");
Integer result = future.get();  // Blocks until complete
System.out.println("Result: " + result);
// Output: Waiting for result...
// Output: Result: 42 (after 1 second)
exec.shutdown();


// ═══════════════════════════════════════════════════════════════════════════
// ✦ ScheduledExecutorService - delayed/periodic tasks
// ═══════════════════════════════════════════════════════════════════════════
ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(2);
scheduler.schedule(() -> {
    System.out.println("Executed after 2 seconds");
}, 2, TimeUnit.SECONDS);

scheduler.scheduleAtFixedRate(() -> {
    System.out.println("Periodic task: " + System.currentTimeMillis());
}, 0, 1, TimeUnit.SECONDS);
// Output: Periodic task: 1234567890
// Output: Periodic task: 1234567891 (repeats every second)


// ═══════════════════════════════════════════════════════════════════════════
// ✦ invokeAll - execute multiple tasks
// ═══════════════════════════════════════════════════════════════════════════
List<Callable<String>> tasks = Arrays.asList(
    () -> "Task 1",
    () -> "Task 2",
    () -> "Task 3"
);
ExecutorService pool = Executors.newFixedThreadPool(3);
List<Future<String>> results = pool.invokeAll(tasks);
for (Future<String> f : results) {
    System.out.println(f.get());
}
// Output: Task 1
// Output: Task 2
// Output: Task 3
pool.shutdown();`
    },
    {
      name: 'CompletableFuture',
      icon: '🔹',
      explanation: `**Core Concept:**
• Powerful asynchronous programming framework (introduced Java 8)
• Extends Future interface with functional programming capabilities
• Represents a promise of a value that may not be available yet
• Enables building complex asynchronous pipelines through method chaining

**Transformation Operations:**
• thenApply(Function) - Transforms result (synchronous)
• thenApplyAsync(Function) - Transforms result (asynchronous)
• thenAccept(Consumer) - Consumes result without returning value
• thenRun(Runnable) - Executes action after completion

**Composition Operations:**
• thenCompose(Function) - Sequential composition, flattens nested futures
• thenCombine(other, BiFunction) - Combines results of two futures in parallel
• thenAcceptBoth(other, BiConsumer) - Consumes results of two futures
• runAfterBoth(other, Runnable) - Runs after both futures complete

**Error Handling:**
• exceptionally(Function) - Handles exceptions, provides fallback value
• handle(BiFunction) - Handles both success and failure cases
• whenComplete(BiConsumer) - Executes cleanup actions regardless of outcome

**Coordination Operations:**
• allOf(futures...) - Completes when all futures complete
• anyOf(futures...) - Completes when any future completes
• join() - Blocks until completion (unchecked exceptions)
• get() - Blocks until completion (checked exceptions)

**Execution Models:**
• Synchronous - Executes in calling thread
• Async - Methods ending in "Async" execute in separate thread
• Custom Executor - Most Async methods accept custom ExecutorService

**Advanced Features:**
• Timeout Support - orTimeout(), completeOnTimeout()
• Manual Completion - complete(), completeExceptionally()
• Dependent Stages - Chain multiple async operations
• Non-blocking - Avoid blocking threads with callbacks

**Benefits:**
• Eliminates callback hell with declarative syntax
• Better error handling than traditional futures
• More readable and maintainable async code
• Composable and reusable async workflows
• Supports both reactive and imperative styles`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Simple async execution
// ═══════════════════════════════════════════════════════════════════════════
import java.util.concurrent.*;

CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
    try { Thread.sleep(1000); } catch (InterruptedException e) {}
    return "Hello";
});
System.out.println("Doing other work...");
System.out.println("Result: " + future.get());
// Output: Doing other work...
// Output: Result: Hello (after 1 second)


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Chaining operations
// ═══════════════════════════════════════════════════════════════════════════
CompletableFuture.supplyAsync(() -> "Hello")
    .thenApply(s -> s + " World")
    .thenApply(String::toUpperCase)
    .thenAccept(System.out::println);
// Output: HELLO WORLD


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Combining multiple futures
// ═══════════════════════════════════════════════════════════════════════════
CompletableFuture<Integer> future1 = CompletableFuture.supplyAsync(() -> 10);
CompletableFuture<Integer> future2 = CompletableFuture.supplyAsync(() -> 20);
CompletableFuture<Integer> combined = future1.thenCombine(future2, (a, b) -> a + b);
System.out.println("Combined result: " + combined.get());
// Output: Combined result: 30


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Exception handling
// ═══════════════════════════════════════════════════════════════════════════
CompletableFuture.supplyAsync(() -> {
    if (Math.random() > 0.5) throw new RuntimeException("Error!");
    return "Success";
})
.exceptionally(ex -> "Recovered from: " + ex.getMessage())
.thenAccept(System.out::println);
// Output: Success OR Recovered from: Error!


// ═══════════════════════════════════════════════════════════════════════════
// ✦ allOf - wait for multiple futures
// ═══════════════════════════════════════════════════════════════════════════
CompletableFuture<String> f1 = CompletableFuture.supplyAsync(() -> "Task1");
CompletableFuture<String> f2 = CompletableFuture.supplyAsync(() -> "Task2");
CompletableFuture<String> f3 = CompletableFuture.supplyAsync(() -> "Task3");
CompletableFuture<Void> allDone = CompletableFuture.allOf(f1, f2, f3);
allDone.join();
System.out.println("All completed: " + f1.get() + ", " + f2.get() + ", " + f3.get());
// Output: All completed: Task1, Task2, Task3


// ═══════════════════════════════════════════════════════════════════════════
// ✦ anyOf - complete when any future completes
// ═══════════════════════════════════════════════════════════════════════════
CompletableFuture<Object> any = CompletableFuture.anyOf(f1, f2, f3);
System.out.println("First completed: " + any.get());
// Output: First completed: Task1 (or Task2 or Task3)`
    },
    {
      name: 'Class Loading',
      icon: '🔹',
      explanation: `**Core Concept:**
• Fundamental process for dynamically loading Java classes at runtime
• JVM loads .class files (bytecode) into memory as needed
• Follows a three-phase mechanism: Loading → Linking → Initialization

**Phase 1: Loading**
• Locates and reads .class file from various sources
• Sources: Filesystem, network, JAR files, databases, bytecode generation
• Creates Class object in memory representing the loaded class
• Determines fully qualified class name

**Phase 2: Linking**
• Verification - Ensures bytecode is valid, safe, and follows JVM spec
• Preparation - Allocates memory for static variables, initializes to defaults
• Resolution - Converts symbolic references to direct references (optional)

**Phase 3: Initialization**
• Executes static initializers
• Runs static initialization blocks
• Initializes static variables with actual values
• Happens before first use of the class

**ClassLoader Hierarchy:**
• Bootstrap ClassLoader - Loads core Java classes (rt.jar), written in native code
• Platform/Extension ClassLoader - Loads classes from extension directories
• Application/System ClassLoader - Loads classes from classpath
• Custom ClassLoaders - User-defined for specialized needs

**Parent Delegation Model:**
• Child classloader delegates to parent before attempting to load
• Ensures classes loaded by most appropriate classloader
• Prevents duplicate class loading
• Maintains security boundaries
• Core classes cannot be overridden

**Custom ClassLoader Use Cases:**
• Hot deployment/redeployment without JVM restart
• Class isolation for plugin systems
• Loading classes from non-standard sources (database, network)
• Implementing custom security policies
• Dynamic code generation and loading

**Key Methods:**
• loadClass(String) - Loads class with delegation
• findClass(String) - Finds class without delegation (override point)
• defineClass(byte[]) - Converts bytecode to Class object
• getParent() - Returns parent classloader`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Custom class loader
// ═══════════════════════════════════════════════════════════════════════════
class CustomClassLoader extends ClassLoader {
    @Override
    public Class<?> loadClass(String name) throws ClassNotFoundException {
        System.out.println("Loading class: " + name);
        return super.loadClass(name);
    }
}


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Using custom class loader
// ═══════════════════════════════════════════════════════════════════════════
CustomClassLoader loader = new CustomClassLoader();
try {
    Class<?> clazz = loader.loadClass("java.lang.String");
    System.out.println("Loaded: " + clazz.getName());
} catch (ClassNotFoundException e) {
    System.out.println("Error: " + e.getMessage());
}
// Output: Loading class: java.lang.String
// Output: Loaded: java.lang.String


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Class loader hierarchy
// ═══════════════════════════════════════════════════════════════════════════
ClassLoader appLoader = ClassLoader.getSystemClassLoader();
ClassLoader extLoader = appLoader.getParent();
ClassLoader bootLoader = extLoader.getParent();

System.out.println("App ClassLoader: " + appLoader.getClass().getName());
System.out.println("Platform ClassLoader: " + extLoader.getClass().getName());
System.out.println("Bootstrap ClassLoader: " + bootLoader);  // null (native)
// Output: App ClassLoader: jdk.internal.loader.ClassLoaders$AppClassLoader
// Output: Platform ClassLoader: jdk.internal.loader.ClassLoaders$PlatformClassLoader
// Output: Bootstrap ClassLoader: null


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Loading class from different loader
// ═══════════════════════════════════════════════════════════════════════════
Class<?> stringClass = String.class;
ClassLoader stringLoader = stringClass.getClassLoader();
System.out.println("String class loader: " + stringLoader);  // null (bootstrap)
// Output: String class loader: null

Class<?> myClass = CustomClassLoader.class;
System.out.println("Custom class loader: " + myClass.getClassLoader());
// Output: Custom class loader: jdk.internal.loader.ClassLoaders$AppClassLoader


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Class initialization
// ═══════════════════════════════════════════════════════════════════════════
class InitDemo {
    static {
        System.out.println("Static block executed");
    }
    static int value = initialize();

    static int initialize() {
        System.out.println("Static initializer called");
        return 42;
    }
}

System.out.println("Before class usage");
int val = InitDemo.value;  // Triggers class initialization
System.out.println("Value: " + val);
// Output: Before class usage
// Output: Static block executed
// Output: Static initializer called
// Output: Value: 42


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Class.forName() with initialization
// ═══════════════════════════════════════════════════════════════════════════
try {
    Class.forName("InitDemo");  // Initializes class
    System.out.println("Class loaded and initialized");
} catch (ClassNotFoundException e) {
    System.out.println("Error: " + e.getMessage());
}`
    },
    {
      name: 'Bytecode',
      icon: '🔹',
      explanation: `**Core Concept:**
• Platform-independent intermediate representation of compiled Java code
• Stored in .class files, executed by Java Virtual Machine (JVM)
• Compiled by javac from Java source code
• Stack-based instruction set with ~200 opcodes

**Bytecode Instruction Categories:**
• Load/Store - Move values between stack and local variables
  - iload, aload, lload, fload, dload (load onto stack)
  - istore, astore, lstore, fstore, dstore (store from stack)
• Arithmetic - Mathematical operations
  - iadd, isub, imul, idiv, irem (integer arithmetic)
  - dadd, dsub, dmul, ddiv (double arithmetic)
• Control Flow - Program flow control
  - if_icmpeq, if_icmpne, if_icmplt, if_icmpgt (comparisons)
  - goto, tableswitch, lookupswitch (jumps)
• Method Invocation - Calling methods
  - invokevirtual (instance methods)
  - invokespecial (constructors, private methods, super calls)
  - invokestatic (static methods)
  - invokeinterface (interface methods)
  - invokedynamic (dynamic language support, lambdas)
• Object Operations - Object manipulation
  - new (create object), newarray (create array)
  - getfield, putfield (access instance fields)
  - getstatic, putstatic (access static fields)

**Stack-Based Architecture:**
• Operations push and pop values from operand stack
• No registers - simpler instruction set
• More compact bytecode compared to register-based
• Platform-independent execution model

**Bytecode Verification:**
• Ensures type safety before execution
• Prevents stack overflow/underflow
• Validates method signatures and access permissions
• Checks proper exception handling
• Critical for Java's security model
• Performed during class loading (linking phase)

**Execution Methods:**
• Interpretation - JVM directly executes bytecode
• Just-In-Time (JIT) Compilation - Converts hot bytecode to native code
• Ahead-of-Time (AOT) Compilation - Pre-compiles to native code (Java 9+)
• Tiered Compilation - Combines interpretation and JIT for optimal performance

**Bytecode Analysis Tools:**
• javap - Disassembles .class files to view bytecode
• ASM - Library for bytecode manipulation
• ByteBuddy - Higher-level bytecode generation
• Javassist - Simplified bytecode editing

**Practical Applications:**
• Performance optimization - Identify bottlenecks
• Debugging - Understand complex runtime behavior
• Framework development - Generate code at runtime
• AOP (Aspect-Oriented Programming) - Weave cross-cutting concerns
• Code instrumentation - Add monitoring/logging without source changes`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Simple method to demonstrate bytecode
// ═══════════════════════════════════════════════════════════════════════════
public class BytecodeDemo {
    public int add(int a, int b) {
        return a + b;
    }

    public int calculate(int x) {
        int y = 10;
        int z = x + y;
        return z * 2;
    }
}

// Bytecode for add method (javap -c BytecodeDemo):
/*
public int add(int, int);
  Code:
    0: iload_1        // Load first parameter onto stack
    1: iload_2        // Load second parameter onto stack
    2: iadd           // Add top two stack values
    3: ireturn        // Return integer result
*/


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Analyzing bytecode at runtime
// ═══════════════════════════════════════════════════════════════════════════
try {
    Class<?> clazz = BytecodeDemo.class;
    System.out.println("Class: " + clazz.getName());

    // Get methods
    for (java.lang.reflect.Method method : clazz.getDeclaredMethods()) {
        System.out.println("Method: " + method.getName());
        System.out.println("Parameters: " + method.getParameterCount());
        System.out.println("Return type: " + method.getReturnType().getName());
    }
} catch (Exception e) {
    System.out.println("Error: " + e.getMessage());
}
// Output: Class: BytecodeDemo
// Output: Method: add
// Output: Parameters: 2
// Output: Return type: int


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Common bytecode instructions
// ═══════════════════════════════════════════════════════════════════════════
// Load instructions:  iload, aload, lload, fload, dload
// Store instructions: istore, astore, lstore, fstore, dstore
// Arithmetic:         iadd, isub, imul, idiv
// Control flow:       if_icmpeq, goto, ifeq, ifne
// Method invocation:  invokevirtual, invokespecial, invokestatic
// Object operations:  new, newarray, getfield, putfield


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Stack-based execution example
// ═══════════════════════════════════════════════════════════════════════════
// Bytecode for calculate method (conceptual):
/*
  0: bipush 10      // Push 10 onto stack
  2: istore_2       // Store in local variable y
  3: iload_1        // Load x onto stack
  4: iload_2        // Load y onto stack
  5: iadd           // Add: stack now has x+y
  6: istore_3       // Store in z
  7: iload_3        // Load z
  8: iconst_2       // Push 2
  9: imul           // Multiply: z*2
  10: ireturn       // Return result
*/

System.out.println("Result: " + new BytecodeDemo().calculate(5));
// Output: Result: 30


// ═══════════════════════════════════════════════════════════════════════════
// ✦ Bytecode verification
// ═══════════════════════════════════════════════════════════════════════════
// JVM verifies: correct types, no stack overflow/underflow,
// valid method calls, proper exception handling

class VerificationDemo {
    public void safeMethod(String str) {
        if (str != null) {
            System.out.println(str.length());
        }
        // Bytecode verifier ensures null check before dereference
    }
}`
    }
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={onBack}
              style={{
                background: '#f59e0b',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: '500',
                fontSize: '1rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#d97706'
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f59e0b'
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            >
              ← Back to Java
            </button>
            <h1 style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #fbbf24, #f97316)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              ☕ Core Java Fundamentals
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {onPrevious && (
              <button
                onClick={onPrevious}
                style={{
                  background: '#2563eb',
                  color: 'white',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #f59e0b',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '1rem',
                  transition: 'all 0.2s'
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
                  background: '#2563eb',
                  color: 'white',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #f59e0b',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '1rem',
                  transition: 'all 0.2s'
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

        <p style={{
          fontSize: '1.2rem',
          color: '#d1d5db',
          textAlign: 'center',
          marginBottom: '2rem',
          lineHeight: '1.8'
        }}>
          Master the foundational concepts of Java programming including OOP principles, data structures, exception handling, and core APIs.
        </p>


        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {concepts.map((concept, idx) => (
            <div
              key={idx}
              onClick={() => handleConceptClick(concept)}
              style={{
                background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                padding: '1.5rem',
                borderRadius: '0.75rem',
                border: '2px solid #f59e0b',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-0.5rem)'
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(245, 158, 11, 0.4)'
                e.currentTarget.style.borderColor = '#fbbf24'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                e.currentTarget.style.borderColor = '#f59e0b'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>
                {concept.icon || '🔹'}
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#fbbf24',
                marginBottom: '0.75rem',
                textAlign: 'center'
              }}>
                {concept.name}
              </h3>
              <p style={{
                fontSize: '0.9rem',
                color: '#d1d5db',
                lineHeight: '1.6',
                textAlign: 'center'
              }}>
                {concept.explanation?.substring(0, 150) || ''}...
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedConcept && (
        <div
          onClick={() => setSelectedConcept(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem',
            backdropFilter: 'blur(4px)'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(to bottom right, #111827, #1f2937)',
              borderRadius: '16px',
              maxWidth: '90vw',
              maxHeight: '90vh',
              width: '1200px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              border: '2px solid #f59e0b',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Modal Header */}
            <div style={{
              padding: '1.5rem 2rem',
              borderBottom: '2px solid rgba(245, 158, 11, 0.3)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'rgba(245, 158, 11, 0.1)'
            }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#fbbf24',
                margin: 0
              }}>
                {selectedConcept.icon || '🔹'} {selectedConcept.name}
              </h2>
              <button
                onClick={() => setSelectedConcept(null)}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  backgroundColor: 'transparent',
                  color: '#d1d5db',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div style={{
              padding: '2rem',
              overflowY: 'auto',
              flex: 1
            }}>
              <div style={{
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '2px solid rgba(245, 158, 11, 0.3)',
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
                            color: '#fbbf24',
                            marginBottom: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}>
                            <span style={{
                              width: '4px',
                              height: '20px',
                              backgroundColor: '#10b981',
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
                                        color: '#10b981',
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
                                        color: '#10b981',
                                        marginRight: '0.75rem',
                                        fontWeight: '600',
                                        flexShrink: 0
                                      }}>•</span>
                                      <span style={{ color: '#d1d5db' }}>{bulletContent}</span>
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
                                  <div key={lineIdx} style={{ marginBottom: '0.5rem', color: '#d1d5db' }}>
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
                    padding: 0,
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
      )}
    </div>
  )
}

export default CoreJava
