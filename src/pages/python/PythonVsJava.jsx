import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

const customTheme = {
  ...vscDarkPlus,
  'pre[class*="language-"]': {
    ...vscDarkPlus['pre[class*="language-"]'],
    background: '#1e1e1e',
  },
  'code[class*="language-"]': {
    ...vscDarkPlus['code[class*="language-"]'],
    background: 'transparent',
  },
}

function PythonVsJava({ onBack, breadcrumb }) {
  const [activeSection, setActiveSection] = useState('basics')

  const ComparisonCard = ({ title, python, java, notes }) => (
    <div style={{ background: '#1f2937', borderRadius: '0.75rem', padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #374151' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#93c5fd' }}>{title}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ background: '#3b82f6', color: 'white', padding: '0.125rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: '600' }}>Python</span>
          </div>
          <SyntaxHighlighter language="python" style={customTheme} customStyle={{ margin: 0, borderRadius: '0.375rem', fontSize: '0.8rem' }}>
            {python}
          </SyntaxHighlighter>
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ background: '#f97316', color: 'white', padding: '0.125rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: '600' }}>Java</span>
          </div>
          <SyntaxHighlighter language="java" style={customTheme} customStyle={{ margin: 0, borderRadius: '0.375rem', fontSize: '0.8rem' }}>
            {java}
          </SyntaxHighlighter>
        </div>
      </div>
      {notes && (
        <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#1e3a5f', borderRadius: '0.5rem', border: '1px solid #3b82f6' }}>
          <p style={{ color: '#93c5fd', fontSize: '0.85rem', margin: 0 }}>{notes}</p>
        </div>
      )}
    </div>
  )

  const tabs = [
    { id: 'basics', label: 'Basics' },
    { id: 'data-types', label: 'Data Types' },
    { id: 'collections', label: 'Collections' },
    { id: 'oop', label: 'OOP' },
    { id: 'functions', label: 'Functions' },
    { id: 'error-handling', label: 'Error Handling' },
    { id: 'concurrency', label: 'Concurrency' },
    { id: 'syntax-tricks', label: 'Syntax Tricks' },
    { id: 'io-files', label: 'I/O & Files' },
    { id: 'ecosystem', label: 'Ecosystem' },
  ]

  const renderBasics = () => (
    <>
      <ComparisonCard
        title="Hello World"
        python={`# hello.py
print("Hello, World!")`}
        java={`// Main.java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`}
        notes="Python requires no class or main method boilerplate. Java requires a class definition and a public static void main entry point for every executable program."
      />
      <ComparisonCard
        title="Variables & Types"
        python={`# Dynamic typing - no type declarations needed
name = "Alice"
age = 30
pi = 3.14
is_active = True

# Type hints (optional, not enforced at runtime)
count: int = 42
greeting: str = "hello"`}
        java={`// Static typing - must declare types
String name = "Alice";
int age = 30;
double pi = 3.14;
boolean isActive = true;

// Type inference with var (Java 10+)
var count = 42;
var greeting = "hello";`}
        notes="Python uses dynamic typing where types are determined at runtime. Java uses static typing where types are checked at compile time. Java 10+ introduced var for local variable type inference, but the type is still determined at compile time."
      />
      <ComparisonCard
        title="String Formatting"
        python={`name = "Alice"
age = 30

# f-string (Python 3.6+) - most common
msg = f"Hello, {name}! You are {age} years old."

# .format() method
msg = "Hello, {}! Age: {}".format(name, age)

# %-formatting (older style)
msg = "Hello, %s! Age: %d" % (name, age)`}
        java={`String name = "Alice";
int age = 30;

// String.format()
String msg = String.format(
    "Hello, %s! You are %d years old.", name, age);

// String concatenation
String msg2 = "Hello, " + name + "! Age: " + age;

// String template (Java 21+ preview)
// String msg3 = STR."Hello, \\{name}! Age: \\{age}";`}
        notes="Python f-strings are the most concise and readable. Java traditionally uses String.format() or concatenation. Java 21 introduced string templates as a preview feature."
      />
      <ComparisonCard
        title="Input / Output"
        python={`# Reading input from console
name = input("Enter your name: ")
age = int(input("Enter your age: "))

# Printing output
print("Name:", name)
print(f"Age: {age}")
print("Items:", 1, 2, 3, sep=", ")`}
        java={`import java.util.Scanner;

Scanner scanner = new Scanner(System.in);
System.out.print("Enter your name: ");
String name = scanner.nextLine();
System.out.print("Enter your age: ");
int age = scanner.nextInt();

System.out.println("Name: " + name);
System.out.printf("Age: %d%n", age);`}
        notes="Python's input() always returns a string, so you must cast for numbers. Java's Scanner provides typed methods like nextInt(), nextDouble(), etc."
      />
      <ComparisonCard
        title="Comments"
        python={`# Single-line comment

'''
Multi-line string used
as a block comment
(technically a string literal, not a true comment)
'''

def greet():
    """Docstring: documents a function.
    Used by help() and documentation generators."""
    pass`}
        java={`// Single-line comment

/*
 * Multi-line comment
 * spanning several lines
 */

/**
 * Javadoc comment: documents a class or method.
 * Used by the javadoc tool to generate HTML docs.
 * @param name the person's name
 * @return greeting string
 */
public String greet(String name) {
    return "Hello, " + name;
}`}
        notes="Python uses triple-quoted strings as block comments and docstrings. Java has dedicated multi-line /* */ and Javadoc /** */ comment syntax with annotation tags like @param and @return."
      />
      <ComparisonCard
        title="Constants"
        python={`# Convention only - UPPER_CASE signals a constant
MAX_SIZE = 100
PI = 3.14159
BASE_URL = "https://api.example.com"

# Nothing prevents reassignment
MAX_SIZE = 200  # No error, just bad practice

# typing.Final (Python 3.8+, checked by mypy)
from typing import Final
MAX_RETRIES: Final = 3`}
        java={`// final keyword enforces immutability
public static final int MAX_SIZE = 100;
public static final double PI = 3.14159;
public static final String BASE_URL =
    "https://api.example.com";

// Reassignment causes compile error
// MAX_SIZE = 200;  // ERROR: cannot assign to final

// final also works for local variables
final int maxRetries = 3;`}
        notes="Python relies on naming conventions (UPPER_CASE) to indicate constants. Java enforces true constants with the final keyword, which causes a compile-time error on reassignment."
      />
    </>
  )

  const renderDataTypes = () => (
    <>
      <ComparisonCard
        title="Integers"
        python={`# Arbitrary precision - no overflow
x = 10 ** 100
print(x)  # 100-digit number, no problem

# No distinction between int and long
small = 42
big = 99999999999999999999

# Integer division
print(7 // 2)   # 3 (floor division)
print(7 / 2)    # 3.5 (true division)`}
        java={`// Fixed precision - overflow is possible
int x = Integer.MAX_VALUE;    // 2,147,483,647
long y = Long.MAX_VALUE;       // 9.2e18
// x + 1 silently overflows to -2,147,483,648

// BigInteger for arbitrary precision
import java.math.BigInteger;
BigInteger big = new BigInteger("10").pow(100);

// Integer division
System.out.println(7 / 2);    // 3 (truncation)
System.out.println(7.0 / 2);  // 3.5`}
        notes="Python integers have arbitrary precision and never overflow. Java int is 32-bit and long is 64-bit; overflow wraps silently. Use BigInteger for arbitrary precision in Java."
      />
      <ComparisonCard
        title="Strings"
        python={`s = "Hello, World!"

# Slicing
print(s[0:5])      # "Hello"
print(s[-6:])       # "orld!"
print(s[::-1])      # "!dlroW ,olleH" (reverse)

# Strings are immutable
# s[0] = 'h'  # TypeError

# Useful methods
print(s.upper())         # "HELLO, WORLD!"
print(s.split(", "))     # ["Hello", "World!"]
print("lo" in s)         # True`}
        java={`String s = "Hello, World!";

// Substring (no slicing syntax)
System.out.println(s.substring(0, 5));  // "Hello"
System.out.println(s.substring(7));     // "World!"
// No built-in reverse for String

// Strings are immutable
// Use StringBuilder for mutation
StringBuilder sb = new StringBuilder(s);
sb.reverse();  // "!dlroW ,olleH"

System.out.println(s.toUpperCase());
System.out.println(s.split(", "));  // String[]
System.out.println(s.contains("lo")); // true`}
        notes="Python strings support slicing with [start:stop:step] syntax. Java requires substring() calls. Both languages have immutable strings; Java uses StringBuilder for mutable string operations."
      />
      <ComparisonCard
        title="Booleans"
        python={`# True and False (capitalized)
is_valid = True
is_empty = False

# Truthy/falsy values
bool(0)       # False
bool("")      # False
bool([])      # False
bool(None)    # False
bool(1)       # True
bool("hi")    # True

# Used directly in conditions
items = []
if not items:
    print("List is empty")`}
        java={`// true and false (lowercase)
boolean isValid = true;
boolean isEmpty = false;

// No truthy/falsy concept for non-booleans
// if (0) {}      // ERROR: incompatible types
// if ("") {}     // ERROR: incompatible types
// if (null) {}   // ERROR for primitives

// Must use explicit comparisons
List<String> items = new ArrayList<>();
if (items.isEmpty()) {
    System.out.println("List is empty");
}`}
        notes="Python has broad truthy/falsy rules: 0, empty strings, empty collections, and None are all falsy. Java only accepts boolean expressions in conditions and does not auto-convert other types."
      />
      <ComparisonCard
        title="Type Conversion"
        python={`# Built-in conversion functions
x = int("42")          # str -> int
y = float("3.14")      # str -> float
s = str(42)            # int -> str
b = bool(1)            # int -> bool

# Implicit conversion in expressions
result = 3 + 4.5       # int auto-promoted to float
print(type(result))    # <class 'float'>

# Careful with int()
int("3.9")   # ValueError (won't truncate)
int(3.9)     # 3 (truncates float to int)`}
        java={`// Parsing methods for conversion
int x = Integer.parseInt("42");
double y = Double.parseDouble("3.14");
String s = String.valueOf(42);
boolean b = Boolean.parseBoolean("true");

// Casting for numeric types
double d = 3.14;
int truncated = (int) d;     // 3 (explicit cast)

// Widening is implicit
int a = 3;
double result = a + 4.5;    // int -> double auto

// Narrowing requires explicit cast
long big = 100L;
int small = (int) big;      // explicit required`}
        notes="Python uses constructor-style functions for type conversion. Java uses parse methods on wrapper classes and casting syntax. Java distinguishes between widening (implicit) and narrowing (explicit) conversions."
      />
      <ComparisonCard
        title="None vs Null"
        python={`# None is a singleton object
x = None

# Check with 'is' (identity), not '=='
if x is None:
    print("x is None")

if x is not None:
    print("x has a value")

# None is falsy
if not x:
    print("x is falsy")

# Type hint for optional values
from typing import Optional
def find(name: str) -> Optional[str]:
    return None`}
        java={`// null is a literal, not an object
String x = null;

// Check with == (no .equals() on null!)
if (x == null) {
    System.out.println("x is null");
}

// NullPointerException danger
// x.length()  // Throws NPE at runtime

// Optional for safer null handling (Java 8+)
import java.util.Optional;
Optional<String> find(String name) {
    return Optional.empty();
}
// Usage: find("bob").orElse("default");`}
        notes="Python's None is an object of type NoneType and should be compared with 'is'. Java's null can cause NullPointerException if you call methods on it. Java 8+ introduced Optional to handle absent values more safely."
      />
      <ComparisonCard
        title="Enums"
        python={`from enum import Enum, auto

class Color(Enum):
    RED = 1
    GREEN = 2
    BLUE = 3

class Direction(Enum):
    NORTH = auto()
    SOUTH = auto()
    EAST = auto()
    WEST = auto()

# Usage
c = Color.RED
print(c.name)    # "RED"
print(c.value)   # 1

# Iteration
for color in Color:
    print(color)`}
        java={`public enum Color {
    RED, GREEN, BLUE
}

// Enums can have fields and methods
public enum Direction {
    NORTH("N"), SOUTH("S"),
    EAST("E"), WEST("W");

    private final String abbrev;
    Direction(String abbrev) {
        this.abbrev = abbrev;
    }
    public String getAbbrev() {
        return abbrev;
    }
}

// Usage
Color c = Color.RED;
System.out.println(c.name());    // "RED"
System.out.println(c.ordinal()); // 0

for (Color color : Color.values()) {
    System.out.println(color);
}`}
        notes="Java enums are more powerful than Python's: they can have constructors, fields, and methods. Python enums use the enum module and assign explicit values. Both support iteration and name-based lookup."
      />
    </>
  )

  const renderCollections = () => (
    <>
      <ComparisonCard
        title="Lists vs Arrays / ArrayList"
        python={`# Lists are dynamic and heterogeneous
nums = [1, 2, 3, 4, 5]
mixed = [1, "two", 3.0, True]

# Common operations
nums.append(6)            # Add to end
nums.insert(0, 0)         # Insert at index
nums.pop()                # Remove last
nums.remove(3)            # Remove first occurrence
length = len(nums)

# Slicing
first_three = nums[:3]
last_two = nums[-2:]
reversed_list = nums[::-1]`}
        java={`// ArrayList is dynamic, but typed
List<Integer> nums = new ArrayList<>(
    List.of(1, 2, 3, 4, 5));
// No mixed types in a typed list

// Common operations
nums.add(6);              // Add to end
nums.add(0, 0);           // Insert at index
nums.remove(nums.size()-1); // Remove last
nums.remove(Integer.valueOf(3)); // Remove value
int length = nums.size();

// No slicing - use subList
List<Integer> firstThree = nums.subList(0, 3);
Collections.reverse(nums); // In-place reverse`}
        notes="Python lists are flexible and support slicing, mixed types, and concise operations. Java uses typed ArrayList for dynamic arrays. Java arrays (int[]) are fixed-size. Python lists are closer to Java's ArrayList."
      />
      <ComparisonCard
        title="Dictionaries vs HashMap"
        python={`# Dict creation
person = {"name": "Alice", "age": 30}
scores = dict(math=95, science=88)

# Access and defaults
name = person["name"]
grade = person.get("grade", "N/A")

# Dict comprehension
squares = {x: x**2 for x in range(5)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# Iteration
for key, value in person.items():
    print(f"{key}: {value}")

# Merge (Python 3.9+)
merged = person | {"city": "NYC"}`}
        java={`// HashMap creation
Map<String, Object> person = new HashMap<>();
person.put("name", "Alice");
person.put("age", 30);

// Immutable map
var scores = Map.of("math", 95, "science", 88);

// Access and defaults
String name = (String) person.get("name");
String grade = (String) person.getOrDefault(
    "grade", "N/A");

// No dict comprehension - use streams
Map<Integer, Integer> squares = IntStream.range(0, 5)
    .boxed()
    .collect(Collectors.toMap(x -> x, x -> x * x));

// Iteration
person.forEach((k, v) ->
    System.out.println(k + ": " + v));`}
        notes="Python dicts are built-in and concise with comprehension syntax. Java uses HashMap with verbose generic types. Python 3.9+ supports the | merge operator. Java's Map.of() creates immutable maps."
      />
      <ComparisonCard
        title="Sets"
        python={`# Set creation
fruits = {"apple", "banana", "cherry"}
nums = set([1, 2, 3, 2, 1])  # {1, 2, 3}

# Operations
fruits.add("date")
fruits.discard("banana")  # No error if missing
print("apple" in fruits)  # True

# Set math
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
print(a | b)    # Union: {1,2,3,4,5,6}
print(a & b)    # Intersection: {3, 4}
print(a - b)    # Difference: {1, 2}
print(a ^ b)    # Symmetric diff: {1,2,5,6}`}
        java={`// HashSet creation
Set<String> fruits = new HashSet<>(
    Set.of("apple", "banana", "cherry"));
Set<Integer> nums = new HashSet<>(
    List.of(1, 2, 3, 2, 1)); // [1, 2, 3]

// Operations
fruits.add("date");
fruits.remove("banana");
System.out.println(fruits.contains("apple"));

// Set math (modifies in place)
Set<Integer> a = new HashSet<>(Set.of(1,2,3,4));
Set<Integer> b = Set.of(3, 4, 5, 6);
a.addAll(b);        // Union
a.retainAll(b);     // Intersection
a.removeAll(b);     // Difference
// No built-in symmetric difference`}
        notes="Python sets have concise operators (|, &, -, ^) for set math. Java's HashSet uses method calls (addAll, retainAll, removeAll) that modify the set in place rather than returning new sets."
      />
      <ComparisonCard
        title="Tuples vs Records"
        python={`# Tuple - immutable ordered sequence
point = (3, 4)
x, y = point       # Unpacking

# Named tuple for clarity
from collections import namedtuple
Point = namedtuple("Point", ["x", "y"])
p = Point(3, 4)
print(p.x, p.y)    # 3 4

# Dataclass as alternative (mutable by default)
from dataclasses import dataclass

@dataclass(frozen=True)  # immutable
class Person:
    name: str
    age: int

alice = Person("Alice", 30)`}
        java={`// Record - immutable data carrier (Java 14+)
record Point(int x, int y) {}
Point p = new Point(3, 4);
System.out.println(p.x());  // 3
System.out.println(p.y());  // 4

// Records auto-generate:
// - constructor, getters, equals, hashCode, toString
record Person(String name, int age) {}
Person alice = new Person("Alice", 30);

// Before records: manual class needed
// or use Map.entry() for simple pairs
var pair = Map.entry("key", 42);
System.out.println(pair.getKey());   // "key"
System.out.println(pair.getValue()); // 42`}
        notes="Python tuples are lightweight and built-in. Java records (14+) provide a concise way to define immutable data classes with auto-generated equals, hashCode, and toString. Python's frozen dataclass is the closest equivalent to Java records."
      />
      <ComparisonCard
        title="Stack & Queue"
        python={`from collections import deque

# Stack (LIFO) - use list or deque
stack = []
stack.append(1)       # push
stack.append(2)
top = stack.pop()     # 2

# Queue (FIFO) - use deque for O(1)
queue = deque()
queue.append("first")     # enqueue
queue.append("second")
front = queue.popleft()   # "first"

# Priority Queue
import heapq
heap = []
heapq.heappush(heap, 3)
heapq.heappush(heap, 1)
smallest = heapq.heappop(heap)  # 1`}
        java={`import java.util.*;

// Stack (LIFO) - use ArrayDeque
Deque<Integer> stack = new ArrayDeque<>();
stack.push(1);
stack.push(2);
int top = stack.pop();     // 2

// Queue (FIFO) - use ArrayDeque or LinkedList
Queue<String> queue = new ArrayDeque<>();
queue.offer("first");      // enqueue
queue.offer("second");
String front = queue.poll(); // "first"

// Priority Queue (min-heap)
PriorityQueue<Integer> heap = new PriorityQueue<>();
heap.offer(3);
heap.offer(1);
int smallest = heap.poll(); // 1`}
        notes="Both languages use deque-based implementations. Python's deque is from collections module. Java's ArrayDeque is preferred over the legacy Stack class. Both provide built-in priority queues (min-heap)."
      />
      <ComparisonCard
        title="Sorting"
        python={`nums = [3, 1, 4, 1, 5, 9, 2, 6]

# Sort in place
nums.sort()

# Return new sorted list
sorted_nums = sorted(nums)

# Reverse sort
nums.sort(reverse=True)

# Sort by custom key
words = ["banana", "apple", "cherry"]
words.sort(key=len)
# ["apple", "banana", "cherry"]

# Sort by multiple criteria
people = [("Alice", 30), ("Bob", 25), ("Carol", 30)]
people.sort(key=lambda p: (p[1], p[0]))`}
        java={`List<Integer> nums = new ArrayList<>(
    List.of(3, 1, 4, 1, 5, 9, 2, 6));

// Sort in place
Collections.sort(nums);
// or: nums.sort(null);

// Reverse sort
nums.sort(Collections.reverseOrder());

// Sort by custom comparator
List<String> words = new ArrayList<>(
    List.of("banana", "apple", "cherry"));
words.sort(Comparator.comparingInt(String::length));

// Sort by multiple criteria
List<Person> people = /* ... */;
people.sort(Comparator
    .comparingInt(Person::age)
    .thenComparing(Person::name));`}
        notes="Python uses key functions (lambdas) for custom sorting. Java uses Comparator objects and supports chaining with .thenComparing(). Both use TimSort internally with O(n log n) performance."
      />
    </>
  )

  const renderOOP = () => (
    <>
      <ComparisonCard
        title="Class Definition"
        python={`class Dog:
    species = "Canis familiaris"  # class variable

    def __init__(self, name, age):
        self.name = name          # instance variable
        self.age = age

    def bark(self):
        return f"{self.name} says Woof!"

    def __str__(self):
        return f"Dog({self.name}, {self.age})"

    def __repr__(self):
        return f"Dog('{self.name}', {self.age})"

rex = Dog("Rex", 5)
print(rex.bark())    # "Rex says Woof!"
print(rex)           # "Dog(Rex, 5)"`}
        java={`public class Dog {
    static String species = "Canis familiaris";

    private String name;
    private int age;

    public Dog(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String bark() {
        return name + " says Woof!";
    }

    @Override
    public String toString() {
        return "Dog(" + name + ", " + age + ")";
    }
}

Dog rex = new Dog("Rex", 5);
System.out.println(rex.bark());
System.out.println(rex);`}
        notes="Python uses __init__ as the constructor and requires explicit self parameter. Java uses a constructor matching the class name and implicit this. Python's __str__ is equivalent to Java's toString()."
      />
      <ComparisonCard
        title="Inheritance"
        python={`class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        raise NotImplementedError

class Dog(Animal):
    def speak(self):
        return f"{self.name} says Woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says Meow!"

# Multiple inheritance
class Flyable:
    def fly(self):
        return "Flying!"

class FlyingDog(Dog, Flyable):
    pass

fd = FlyingDog("Buddy")
print(fd.speak())  # "Buddy says Woof!"
print(fd.fly())    # "Flying!"`}
        java={`abstract class Animal {
    protected String name;

    public Animal(String name) {
        this.name = name;
    }
    abstract String speak();
}

class Dog extends Animal {
    public Dog(String name) { super(name); }
    String speak() { return name + " says Woof!"; }
}

class Cat extends Animal {
    public Cat(String name) { super(name); }
    String speak() { return name + " says Meow!"; }
}

// Single inheritance + interfaces
interface Flyable {
    default String fly() { return "Flying!"; }
}

class FlyingDog extends Dog implements Flyable {
    public FlyingDog(String n) { super(n); }
}`}
        notes="Python supports multiple inheritance with MRO (Method Resolution Order). Java allows single class inheritance but supports multiple interface implementation. Java interfaces can have default methods since Java 8."
      />
      <ComparisonCard
        title="Access Modifiers"
        python={`class Account:
    def __init__(self, owner, balance):
        self.owner = owner       # public
        self._balance = balance  # protected (convention)
        self.__pin = 1234        # private (name mangling)

    def get_balance(self):
        return self._balance

    def __validate_pin(self, pin):
        return pin == self.__pin

a = Account("Alice", 1000)
print(a.owner)       # "Alice" - public
print(a._balance)    # 1000 - accessible (convention only)
# print(a.__pin)     # AttributeError
print(a._Account__pin)  # 1234 - name mangling workaround`}
        java={`public class Account {
    public String owner;         // accessible everywhere
    protected double balance;    // same package + subclasses
    private int pin = 1234;      // this class only
    String status;               // package-private (default)

    public double getBalance() {
        return balance;
    }

    private boolean validatePin(int pin) {
        return pin == this.pin;
    }
}

Account a = new Account();
a.owner = "Alice";     // OK - public
// a.pin = 0000;       // Compile error - private
a.getBalance();        // OK - public method`}
        notes="Python uses naming conventions (_protected, __private with name mangling) but nothing is truly enforced. Java has four access levels enforced by the compiler: public, protected, package-private (default), and private."
      />
      <ComparisonCard
        title="Properties"
        python={`class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Below absolute zero!")
        self._celsius = value

    @property
    def fahrenheit(self):
        return self._celsius * 9/5 + 32

t = Temperature(25)
print(t.celsius)      # 25 (calls getter)
t.celsius = 30        # calls setter
print(t.fahrenheit)   # 86.0 (computed property)`}
        java={`public class Temperature {
    private double celsius;

    public Temperature(double celsius) {
        this.celsius = celsius;
    }

    public double getCelsius() {
        return celsius;
    }

    public void setCelsius(double value) {
        if (value < -273.15) {
            throw new IllegalArgumentException(
                "Below absolute zero!");
        }
        this.celsius = value;
    }

    public double getFahrenheit() {
        return celsius * 9.0 / 5 + 32;
    }
}

Temperature t = new Temperature(25);
System.out.println(t.getCelsius());    // 25.0
t.setCelsius(30);
System.out.println(t.getFahrenheit()); // 86.0`}
        notes="Python's @property decorator allows attribute-style access while running getter/setter logic. Java uses explicit get/set method naming conventions (JavaBeans pattern). Python properties look like plain attributes to the caller."
      />
      <ComparisonCard
        title="Abstract Classes"
        python={`from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

    @abstractmethod
    def perimeter(self):
        pass

    def describe(self):  # Concrete method
        return f"Area: {self.area():.2f}"

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14159 * self.radius ** 2

    def perimeter(self):
        return 2 * 3.14159 * self.radius

# shape = Shape()  # TypeError: can't instantiate`}
        java={`abstract class Shape {
    abstract double area();
    abstract double perimeter();

    // Concrete method
    String describe() {
        return String.format("Area: %.2f", area());
    }
}

class Circle extends Shape {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    @Override
    double area() {
        return Math.PI * radius * radius;
    }

    @Override
    double perimeter() {
        return 2 * Math.PI * radius;
    }
}

// Shape s = new Shape(); // Compile error`}
        notes="Python uses the abc module to create abstract classes. Java has the abstract keyword built into the language. Both prevent direct instantiation and require subclasses to implement abstract methods."
      />
      <ComparisonCard
        title="Static & Class Methods"
        python={`class MathUtils:
    multiplier = 2  # class variable

    @staticmethod
    def add(a, b):
        return a + b

    @classmethod
    def scaled_add(cls, a, b):
        # Can access class variables via cls
        return cls.multiplier * (a + b)

    @classmethod
    def create_from_string(cls, s):
        # Factory method pattern
        return cls()

# No instance needed
print(MathUtils.add(3, 4))         # 7
print(MathUtils.scaled_add(3, 4))  # 14`}
        java={`public class MathUtils {
    static int multiplier = 2;

    // Static method - no instance needed
    public static int add(int a, int b) {
        return a + b;
    }

    public static int scaledAdd(int a, int b) {
        return multiplier * (a + b);
    }

    // Factory method pattern
    public static MathUtils fromString(String s) {
        return new MathUtils();
    }
}

// No instance needed
System.out.println(MathUtils.add(3, 4));      // 7
System.out.println(MathUtils.scaledAdd(3, 4));// 14`}
        notes="Python distinguishes between @staticmethod (no access to class) and @classmethod (receives class as first arg). Java only has static methods, which can access other static members. Python's @classmethod enables factory patterns with inheritance support."
      />
    </>
  )

  const renderFunctions = () => (
    <>
      <ComparisonCard
        title="Function Definition"
        python={`# Simple function
def greet(name):
    return f"Hello, {name}!"

# With type hints
def add(a: int, b: int) -> int:
    return a + b

# Multiple return values
def min_max(lst):
    return min(lst), max(lst)

lo, hi = min_max([3, 1, 4, 1, 5])

# First-class functions
def apply(func, value):
    return func(value)

result = apply(len, "hello")  # 5`}
        java={`// Method must be inside a class
public class Utils {
    static String greet(String name) {
        return "Hello, " + name + "!";
    }

    static int add(int a, int b) {
        return a + b;
    }

    // Can only return one value - use record/array
    record MinMax(int min, int max) {}
    static MinMax minMax(int[] arr) {
        return new MinMax(
            Arrays.stream(arr).min().orElse(0),
            Arrays.stream(arr).max().orElse(0));
    }

    // Functions via functional interfaces
    static <T, R> R apply(Function<T, R> func, T val) {
        return func.apply(val);
    }
}`}
        notes="Python functions are first-class objects and can exist outside classes. Java methods must belong to a class. Python can return multiple values as tuples; Java requires wrapper objects or records."
      />
      <ComparisonCard
        title="Lambda Expressions"
        python={`# Lambda - anonymous single-expression function
double = lambda x: x * 2
add = lambda x, y: x + y

print(double(5))       # 10
print(add(3, 4))       # 7

# Common with higher-order functions
nums = [3, 1, 4, 1, 5, 9]
sorted_nums = sorted(nums, key=lambda x: -x)
# [9, 5, 4, 3, 1, 1]

evens = list(filter(lambda x: x % 2 == 0, nums))
doubled = list(map(lambda x: x * 2, nums))

# Cannot have multiple statements in lambda`}
        java={`// Lambda with functional interfaces
Function<Integer, Integer> doubleIt = x -> x * 2;
BiFunction<Integer, Integer, Integer> add =
    (x, y) -> x + y;

System.out.println(doubleIt.apply(5));   // 10
System.out.println(add.apply(3, 4));     // 7

// Common with streams and sorting
List<Integer> nums = List.of(3, 1, 4, 1, 5, 9);
var sorted = nums.stream()
    .sorted((a, b) -> b - a)
    .toList();

var evens = nums.stream()
    .filter(x -> x % 2 == 0).toList();
var doubled = nums.stream()
    .map(x -> x * 2).toList();

// Multi-statement lambda with braces
Function<String, String> process = s -> {
    String trimmed = s.trim();
    return trimmed.toUpperCase();
};`}
        notes="Python lambdas are limited to a single expression. Java lambdas can contain multiple statements with braces and require a functional interface as the target type."
      />
      <ComparisonCard
        title="Default Arguments"
        python={`# Default parameter values
def connect(host, port=3306, timeout=30):
    return f"{host}:{port} (timeout={timeout}s)"

connect("localhost")
connect("localhost", 5432)
connect("localhost", timeout=60)

# Keyword arguments in any order
connect(timeout=10, host="db.example.com")

# WARNING: mutable default argument trap
def bad(items=[]):   # Shared across calls!
    items.append(1)
    return items

def good(items=None):  # Safe pattern
    items = items or []
    items.append(1)
    return items`}
        java={`// No default arguments - use method overloading
static String connect(String host, int port,
                      int timeout) {
    return host + ":" + port +
           " (timeout=" + timeout + "s)";
}

static String connect(String host, int port) {
    return connect(host, port, 30);
}

static String connect(String host) {
    return connect(host, 3306, 30);
}

// Or use Builder pattern for many optional params
ConnectionConfig.builder()
    .host("localhost")
    .port(5432)
    .timeout(60)
    .build();`}
        notes="Python supports default arguments and keyword arguments natively. Java requires method overloading or the Builder pattern to simulate defaults. Beware of mutable default arguments in Python."
      />
      <ComparisonCard
        title="*args and **kwargs"
        python={`# *args: variable positional arguments (tuple)
def sum_all(*args):
    return sum(args)

print(sum_all(1, 2, 3))      # 6
print(sum_all(1, 2, 3, 4, 5)) # 15

# **kwargs: variable keyword arguments (dict)
def build_profile(**kwargs):
    return kwargs

profile = build_profile(name="Alice", age=30)
# {"name": "Alice", "age": 30}

# Combined
def flexible(required, *args, **kwargs):
    print(required, args, kwargs)

flexible("a", "b", "c", x=1, y=2)
# a ('b', 'c') {'x': 1, 'y': 2}`}
        java={`// Varargs: variable number of same-type args
static int sumAll(int... nums) {
    int total = 0;
    for (int n : nums) total += n;
    return total;
}

System.out.println(sumAll(1, 2, 3));       // 6
System.out.println(sumAll(1, 2, 3, 4, 5)); // 15

// No equivalent to **kwargs
// Simulate with Map parameter
static Map<String, Object> buildProfile(
        Map<String, Object> kwargs) {
    return kwargs;
}

var profile = buildProfile(Map.of(
    "name", "Alice", "age", 30));

// Varargs must be last parameter
// Only one varargs parameter allowed per method`}
        notes="Python's *args and **kwargs provide very flexible function signatures. Java only has varargs (Type... name) for positional arguments of the same type. Java has no built-in equivalent to **kwargs."
      />
      <ComparisonCard
        title="List Comprehension vs Streams"
        python={`nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# List comprehension
evens = [x for x in nums if x % 2 == 0]
squares = [x**2 for x in nums]
pairs = [(x, y) for x in range(3) for y in range(3)]

# Dict comprehension
word_lens = {w: len(w) for w in ["hi", "hello"]}

# Set comprehension
unique_mods = {x % 3 for x in nums}

# Generator expression (lazy)
total = sum(x**2 for x in range(1000000))

# Chained operations
result = [x**2 for x in nums if x % 2 == 0]
# [4, 16, 36, 64, 100]`}
        java={`List<Integer> nums = List.of(1,2,3,4,5,6,7,8,9,10);

// Stream API
List<Integer> evens = nums.stream()
    .filter(x -> x % 2 == 0)
    .toList();

List<Integer> squares = nums.stream()
    .map(x -> x * x)
    .toList();

// Map from stream
Map<String, Integer> wordLens = List.of("hi", "hello")
    .stream()
    .collect(Collectors.toMap(w -> w, String::length));

// Set from stream
Set<Integer> uniqueMods = nums.stream()
    .map(x -> x % 3)
    .collect(Collectors.toSet());

// Chained operations
var result = nums.stream()
    .filter(x -> x % 2 == 0)
    .map(x -> x * x)
    .toList();  // [4, 16, 36, 64, 100]`}
        notes="Python comprehensions are concise and Pythonic. Java's Stream API is more verbose but offers parallel processing with .parallelStream(). Streams are lazy by default, similar to Python generators."
      />
      <ComparisonCard
        title="Decorators vs Annotations"
        python={`import time
from functools import wraps

# Decorator: wraps a function to add behavior
def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        elapsed = time.time() - start
        print(f"{func.__name__} took {elapsed:.3f}s")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
    return "done"

# Stacking decorators
@timer
@cache
def compute(n):
    return fibonacci(n)`}
        java={`import java.lang.annotation.*;

// Annotation: metadata, not behavior modification
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Timer {}

// Behavior added via AOP framework or reflection
public class Service {
    @Timer
    public String slowFunction() {
        Thread.sleep(1000);
        return "done";
    }

    @Override  // Built-in annotation
    public String toString() {
        return "Service";
    }

    @Deprecated
    public void oldMethod() {}

    @SuppressWarnings("unchecked")
    public void riskyMethod() {}
}`}
        notes="Python decorators directly modify function behavior at definition time. Java annotations are metadata markers that require frameworks (Spring AOP, Lombok) or reflection to add behavior. They serve different purposes despite similar @ syntax."
      />
    </>
  )

  const renderErrorHandling = () => (
    <>
      <ComparisonCard
        title="Try / Except vs Try / Catch"
        python={`try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Error: {e}")
except (ValueError, TypeError) as e:
    print(f"Value/Type error: {e}")
except Exception as e:
    print(f"Unexpected: {e}")
else:
    # Runs only if no exception occurred
    print(f"Result: {result}")
finally:
    print("Always runs")`}
        java={`try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Error: " + e.getMessage());
} catch (IllegalArgumentException |
         NumberFormatException e) {
    System.out.println("Arg error: " + e.getMessage());
} catch (Exception e) {
    System.out.println("Unexpected: " + e.getMessage());
} finally {
    System.out.println("Always runs");
}

// No "else" clause equivalent in Java`}
        notes="Python has an else clause that runs when no exception was raised, which Java lacks. Java catches exceptions by type with multi-catch using |. Both support finally for cleanup."
      />
      <ComparisonCard
        title="Custom Exceptions"
        python={`# Simple custom exception
class InsufficientFundsError(Exception):
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        super().__init__(
            f"Cannot withdraw {amount}: "
            f"only {balance} available"
        )

class Account:
    def __init__(self, balance):
        self.balance = balance

    def withdraw(self, amount):
        if amount > self.balance:
            raise InsufficientFundsError(
                self.balance, amount)
        self.balance -= amount

try:
    acct = Account(100)
    acct.withdraw(200)
except InsufficientFundsError as e:
    print(e.balance)  # 100`}
        java={`// Custom checked exception
public class InsufficientFundsException
        extends Exception {
    private final double balance;
    private final double amount;

    public InsufficientFundsException(
            double balance, double amount) {
        super("Cannot withdraw " + amount +
              ": only " + balance + " available");
        this.balance = balance;
        this.amount = amount;
    }

    public double getBalance() { return balance; }
}

public class Account {
    private double balance;

    // Must declare checked exception
    public void withdraw(double amount)
            throws InsufficientFundsException {
        if (amount > balance)
            throw new InsufficientFundsException(
                balance, amount);
        balance -= amount;
    }
}`}
        notes="Both languages support custom exceptions with extra fields. Java distinguishes between checked exceptions (must be declared or caught) and unchecked (RuntimeException subclasses). Python has no checked exceptions."
      />
      <ComparisonCard
        title="Context Managers vs Try-With-Resources"
        python={`# with statement auto-closes resources
with open("data.txt", "r") as f:
    content = f.read()
# f is automatically closed here

# Multiple resources
with open("in.txt") as src, open("out.txt", "w") as dst:
    dst.write(src.read())

# Custom context manager
class DatabaseConnection:
    def __enter__(self):
        self.conn = create_connection()
        return self.conn

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.conn.close()
        return False  # Don't suppress exceptions

with DatabaseConnection() as conn:
    conn.execute("SELECT 1")`}
        java={`// try-with-resources auto-closes (Java 7+)
try (var reader = new BufferedReader(
        new FileReader("data.txt"))) {
    String content = reader.readLine();
}  // reader is automatically closed

// Multiple resources
try (var src = new FileReader("in.txt");
     var dst = new FileWriter("out.txt")) {
    dst.write(src.read());
}

// Custom: implement AutoCloseable
class DatabaseConnection implements AutoCloseable {
    private Connection conn;

    public DatabaseConnection() {
        this.conn = createConnection();
    }

    @Override
    public void close() {
        conn.close();
    }
}

try (var db = new DatabaseConnection()) {
    db.execute("SELECT 1");
}`}
        notes="Python uses 'with' and the context manager protocol (__enter__/__exit__). Java uses try-with-resources and the AutoCloseable interface. Both ensure resources are properly cleaned up even when exceptions occur."
      />
      <ComparisonCard
        title="Multiple Exceptions"
        python={`# Catch multiple exception types
try:
    value = int("abc")
except (ValueError, TypeError) as e:
    print(f"Conversion error: {e}")

# Re-raise the current exception
try:
    risky_operation()
except ValueError:
    log_error()
    raise  # Re-raises the caught exception

# Exception chaining
try:
    process()
except KeyError as e:
    raise RuntimeError("Processing failed") from e`}
        java={`// Multi-catch (Java 7+)
try {
    int value = Integer.parseInt("abc");
} catch (NumberFormatException |
         IllegalArgumentException e) {
    System.out.println("Conversion error: " +
        e.getMessage());
}

// Re-throw the exception
try {
    riskyOperation();
} catch (IOException e) {
    logError();
    throw e;  // Re-throws
}

// Exception chaining
try {
    process();
} catch (SQLException e) {
    throw new RuntimeException(
        "Processing failed", e);  // cause
}`}
        notes="Both languages support catching multiple exception types and exception chaining. Python uses 'raise ... from ...' for explicit chaining. Java passes the cause exception to the constructor."
      />
      <ComparisonCard
        title="Raising vs Throwing"
        python={`# Raise an exception
raise ValueError("Invalid input")
raise TypeError("Expected string, got int")

# Raise without arguments (re-raise)
try:
    risky()
except Exception:
    raise

# All exceptions are "unchecked" in Python
# No need to declare what a function might raise
def parse(data):
    if not data:
        raise ValueError("Empty data")
    return process(data)

# Checking exception type
try:
    parse("")
except ValueError:
    print("Bad data")  # Caught here`}
        java={`// Throw an exception (new keyword required)
throw new IllegalArgumentException("Invalid input");
throw new RuntimeException("Unexpected error");

// Checked exceptions - MUST declare or catch
public void readFile(String path)
        throws IOException {  // Must declare
    if (!Files.exists(Path.of(path)))
        throw new IOException("File not found");
}

// Unchecked exceptions - no declaration needed
public void validate(int age) {
    if (age < 0)
        throw new IllegalArgumentException(
            "Age cannot be negative");
}

// Caller must handle checked exceptions
try {
    readFile("data.txt");
} catch (IOException e) {
    e.printStackTrace();
}`}
        notes="Python uses 'raise' and Java uses 'throw new'. The biggest difference is Java's checked exceptions: IOException, SQLException etc. must be declared in the method signature with 'throws' or caught by the caller. Python has no such requirement."
      />
    </>
  )

  const renderConcurrency = () => (
    <>
      <ComparisonCard
        title="Threading"
        python={`import threading

def worker(name, count):
    for i in range(count):
        print(f"{name}: task {i}")

# Create and start threads
t1 = threading.Thread(target=worker,
                      args=("Thread-1", 3))
t2 = threading.Thread(target=worker,
                      args=("Thread-2", 3))

t1.start()
t2.start()

# Wait for threads to complete
t1.join()
t2.join()
print("All threads finished")`}
        java={`// Using Thread class
Thread t1 = new Thread(() -> {
    for (int i = 0; i < 3; i++)
        System.out.println("Thread-1: task " + i);
});
Thread t2 = new Thread(() -> {
    for (int i = 0; i < 3; i++)
        System.out.println("Thread-2: task " + i);
});

t1.start();
t2.start();

// Wait for threads to complete
t1.join();
t2.join();
System.out.println("All threads finished");

// Or using Runnable interface
Runnable task = () -> System.out.println("Running");
new Thread(task).start();`}
        notes="Both languages provide Thread classes with similar APIs. Python threads pass target functions and args. Java threads use Runnable lambdas. The key difference is Python's GIL (see GIL Note section below)."
      />
      <ComparisonCard
        title="Thread Pools"
        python={`from concurrent.futures import ThreadPoolExecutor
from concurrent.futures import as_completed

def fetch_url(url):
    # Simulate network call
    import time
    time.sleep(1)
    return f"Data from {url}"

urls = ["url1", "url2", "url3", "url4"]

# Thread pool with max 3 workers
with ThreadPoolExecutor(max_workers=3) as executor:
    # Submit tasks
    futures = {executor.submit(fetch_url, url): url
               for url in urls}

    # Process results as they complete
    for future in as_completed(futures):
        url = futures[future]
        result = future.result()
        print(f"{url}: {result}")`}
        java={`import java.util.concurrent.*;

ExecutorService executor =
    Executors.newFixedThreadPool(3);

List<String> urls = List.of(
    "url1", "url2", "url3", "url4");

// Submit tasks and collect Futures
List<Future<String>> futures = urls.stream()
    .map(url -> executor.submit(() -> {
        Thread.sleep(1000);
        return "Data from " + url;
    }))
    .toList();

// Process results
for (Future<String> future : futures) {
    System.out.println(future.get());
}

executor.shutdown();
executor.awaitTermination(10, TimeUnit.SECONDS);`}
        notes="Both use executor/thread pool patterns. Python's ThreadPoolExecutor is a context manager (auto-shutdown). Java requires explicit shutdown(). Python's as_completed() processes results in completion order."
      />
      <ComparisonCard
        title="Async / Await"
        python={`import asyncio

async def fetch_data(url):
    print(f"Fetching {url}...")
    await asyncio.sleep(1)  # Non-blocking sleep
    return f"Data from {url}"

async def main():
    # Run tasks concurrently
    tasks = [
        fetch_data("api/users"),
        fetch_data("api/posts"),
        fetch_data("api/comments"),
    ]
    results = await asyncio.gather(*tasks)
    for r in results:
        print(r)

asyncio.run(main())`}
        java={`import java.util.concurrent.CompletableFuture;

CompletableFuture<String> fetchData(String url) {
    return CompletableFuture.supplyAsync(() -> {
        System.out.println("Fetching " + url + "...");
        Thread.sleep(1000);
        return "Data from " + url;
    });
}

// Run tasks concurrently
var f1 = fetchData("api/users");
var f2 = fetchData("api/posts");
var f3 = fetchData("api/comments");

CompletableFuture.allOf(f1, f2, f3).join();

System.out.println(f1.get());
System.out.println(f2.get());
System.out.println(f3.get());

// Chaining with thenApply / thenCompose
fetchData("api/users")
    .thenApply(data -> data.toUpperCase())
    .thenAccept(System.out::println);`}
        notes="Python has native async/await syntax with an event loop. Java uses CompletableFuture for async programming with chaining via thenApply, thenCompose, etc. Java 21+ introduces virtual threads for simpler concurrent code."
      />
      <ComparisonCard
        title="Locks & Synchronization"
        python={`import threading

counter = 0
lock = threading.Lock()

def increment():
    global counter
    for _ in range(100000):
        with lock:  # Acquire and release
            counter += 1

t1 = threading.Thread(target=increment)
t2 = threading.Thread(target=increment)
t1.start(); t2.start()
t1.join(); t2.join()
print(counter)  # 200000

# RLock for reentrant locking
rlock = threading.RLock()
with rlock:
    with rlock:  # Same thread can acquire again
        pass`}
        java={`import java.util.concurrent.locks.*;
import java.util.concurrent.atomic.*;

// Using synchronized keyword
int counter = 0;
final Object lock = new Object();

Runnable increment = () -> {
    for (int i = 0; i < 100000; i++) {
        synchronized (lock) {
            counter++;
        }
    }
};

// Using ReentrantLock
ReentrantLock rLock = new ReentrantLock();
rLock.lock();
try {
    counter++;
} finally {
    rLock.unlock();
}

// Using AtomicInteger (lock-free)
AtomicInteger atomicCounter = new AtomicInteger(0);
atomicCounter.incrementAndGet(); // Thread-safe`}
        notes="Python uses threading.Lock with context manager syntax. Java offers synchronized blocks, ReentrantLock, and atomic classes. Java's AtomicInteger provides lock-free thread safety for simple counters."
      />
      <ComparisonCard
        title="GIL Note: Python's Concurrency Limitation"
        python={`# Python's Global Interpreter Lock (GIL)
# Only ONE thread executes Python bytecode at a time

# CPU-bound tasks: threads DON'T help
# Use multiprocessing instead
from multiprocessing import Pool

def cpu_task(n):
    return sum(i*i for i in range(n))

with Pool(4) as pool:
    results = pool.map(cpu_task,
                       [10**6, 10**6, 10**6, 10**6])

# I/O-bound tasks: threads DO help
# (GIL is released during I/O operations)
# Use threading or asyncio for I/O-bound work`}
        java={`// Java has NO GIL
// True parallel execution on multiple CPU cores

// CPU-bound: threads give real speedup
ExecutorService pool =
    Executors.newFixedThreadPool(4);

List<Future<Long>> results = new ArrayList<>();
for (int i = 0; i < 4; i++) {
    results.add(pool.submit(() -> {
        long sum = 0;
        for (long j = 0; j < 1_000_000; j++)
            sum += j * j;
        return sum;
    }));
}

// All 4 tasks run truly in parallel
// Utilizes all CPU cores

// Java 21: Virtual threads for I/O-bound
try (var executor = Executors
        .newVirtualThreadPerTaskExecutor()) {
    executor.submit(() -> fetchUrl("url1"));
    executor.submit(() -> fetchUrl("url2"));
}`}
        notes="Python's GIL is the biggest concurrency difference. It prevents true parallelism for CPU-bound work in threads. Use multiprocessing for CPU-bound parallelism in Python. Java threads run truly in parallel on multiple cores."
      />
    </>
  )

  const renderSyntaxTricks = () => (
    <>
      <ComparisonCard
        title="Swap Variables"
        python={`# Pythonic swap - no temp variable needed
a, b = 1, 2
a, b = b, a
print(a, b)  # 2 1

# Works with any number of variables
a, b, c = c, a, b

# Swap in a list
lst = [1, 2, 3, 4]
lst[0], lst[-1] = lst[-1], lst[0]
# [4, 2, 3, 1]`}
        java={`// Traditional swap with temp variable
int a = 1, b = 2;
int temp = a;
a = b;
b = temp;
System.out.println(a + " " + b); // 2 1

// Swap in an array
int[] arr = {1, 2, 3, 4};
int tmp = arr[0];
arr[0] = arr[arr.length - 1];
arr[arr.length - 1] = tmp;

// XOR trick (integers only, not recommended)
a = a ^ b;
b = a ^ b;
a = a ^ b;`}
        notes="Python's tuple unpacking makes swapping elegant and readable. Java requires a temporary variable. The XOR trick works for integers but is less readable and not commonly used in production."
      />
      <ComparisonCard
        title="Ternary Operator"
        python={`# Conditional expression
age = 20
status = "adult" if age >= 18 else "minor"

# Nested (avoid for readability)
grade = "A" if score >= 90 else "B" if score >= 80 else "C"

# In function calls
print("even" if x % 2 == 0 else "odd")

# With assignment
result = value if value is not None else "default"`}
        java={`// Ternary operator
int age = 20;
String status = age >= 18 ? "adult" : "minor";

// Nested (avoid for readability)
String grade = score >= 90 ? "A"
             : score >= 80 ? "B" : "C";

// In method calls
System.out.println(x % 2 == 0 ? "even" : "odd");

// With assignment
String result = value != null ? value : "default";`}
        notes="Python reads like English: 'value if condition else other'. Java uses the C-style ternary: 'condition ? value : other'. Both should be used sparingly for readability."
      />
      <ComparisonCard
        title="Multiple Assignment"
        python={`# Assign multiple variables at once
a, b, c = 1, 2, 3

# Same value to multiple variables
x = y = z = 0

# Unpack from a list/tuple
first, second, third = [10, 20, 30]

# Unpack with * (rest operator)
first, *middle, last = [1, 2, 3, 4, 5]
# first=1, middle=[2,3,4], last=5

# Swap and rotate
a, b, c = b, c, a`}
        java={`// Separate declarations required
int a = 1, b = 2, c = 3;

// Same value
int x = 0, y = 0, z = 0;
// or: int x, y, z; x = y = z = 0;

// No destructuring from arrays
int[] arr = {10, 20, 30};
int first = arr[0];
int second = arr[1];
int third = arr[2];

// No rest/spread operator for arrays
// Must manually slice
int firstEl = arr[0];
int lastEl = arr[arr.length - 1];
int[] middle = Arrays.copyOfRange(arr, 1,
    arr.length - 1);`}
        notes="Python's unpacking is concise and powerful, supporting the * operator for collecting remaining elements. Java requires separate variable declarations and manual array indexing."
      />
      <ComparisonCard
        title="String Multiplication"
        python={`# Repeat strings with *
line = "-" * 40
print(line)  # "----------------------------------------"

banner = "ha" * 3    # "hahaha"
indent = "  " * depth

# Repeat lists too
zeros = [0] * 10     # [0,0,0,0,0,0,0,0,0,0]
grid = [[0]*cols for _ in range(rows)]`}
        java={`// String.repeat() (Java 11+)
String line = "-".repeat(40);
System.out.println(line);

String banner = "ha".repeat(3);  // "hahaha"
String indent = "  ".repeat(depth);

// Before Java 11
String oldWay = new String(new char[40])
    .replace('\\0', '-');

// No list multiplication equivalent
int[] zeros = new int[10]; // default 0
int[][] grid = new int[rows][cols];`}
        notes="Python's * operator works on strings and lists for repetition. Java added String.repeat() in Java 11. Java arrays are initialized to default values (0 for int, null for objects)."
      />
      <ComparisonCard
        title="Chained Comparisons"
        python={`# Chained comparison operators
x = 5
if 1 < x < 10:
    print("x is between 1 and 10")

if 0 <= index < len(arr):
    print("Valid index")

# Multiple chains
if a < b < c < d:
    print("Strictly increasing")

# Works with any comparison operators
if 1 <= x <= 100:
    print("In range [1, 100]")`}
        java={`// Must use logical operators
int x = 5;
if (x > 1 && x < 10) {
    System.out.println("x is between 1 and 10");
}

if (index >= 0 && index < arr.length) {
    System.out.println("Valid index");
}

// Multiple conditions
if (a < b && b < c && c < d) {
    System.out.println("Strictly increasing");
}

// Range check
if (x >= 1 && x <= 100) {
    System.out.println("In range [1, 100]");
}`}
        notes="Python allows chaining comparison operators naturally (1 < x < 10). Java requires explicit && between each comparison. Python's syntax is more readable and less error-prone."
      />
      <ComparisonCard
        title="Unpacking & Walrus Operator"
        python={`# Extended unpacking
first, *rest = [1, 2, 3, 4, 5]
# first=1, rest=[2,3,4,5]

*init, last = [1, 2, 3, 4, 5]
# init=[1,2,3,4], last=5

# Walrus operator := (Python 3.8+)
# Assign and use in one expression
if (n := len(data)) > 10:
    print(f"Too long: {n} items")

# In while loops
while (line := input(">> ")) != "quit":
    process(line)

# In list comprehensions
results = [y for x in data if (y := f(x)) is not None]`}
        java={`// No unpacking syntax - manual indexing
int[] arr = {1, 2, 3, 4, 5};
int first = arr[0];
int[] rest = Arrays.copyOfRange(arr, 1, arr.length);

// No walrus operator - assign before condition
int n = data.size();
if (n > 10) {
    System.out.println("Too long: " + n + " items");
}

// Pattern matching (Java 16+) is closest
// for instanceof
if (obj instanceof String s) {
    // s is already assigned and typed
    System.out.println(s.length());
}

// In switch (Java 21+)
switch (obj) {
    case Integer i -> System.out.println(i * 2);
    case String s -> System.out.println(s.length());
    default -> System.out.println("other");
}`}
        notes="Python's walrus operator := combines assignment and expression. Java has no direct equivalent but Java 16+ pattern matching in instanceof and Java 21 switch patterns serve a similar purpose of binding variables in conditions."
      />
    </>
  )

  const renderIOFiles = () => (
    <>
      <ComparisonCard
        title="Read File"
        python={`# Read entire file
with open("data.txt", "r") as f:
    content = f.read()

# Read line by line (memory efficient)
with open("data.txt", "r") as f:
    for line in f:
        print(line.strip())

# Read all lines into a list
with open("data.txt", "r") as f:
    lines = f.readlines()

# One-liner (Python 3.9+)
from pathlib import Path
content = Path("data.txt").read_text()`}
        java={`// Read entire file (Java 11+)
String content = Files.readString(
    Path.of("data.txt"));

// Read all lines
List<String> lines = Files.readAllLines(
    Path.of("data.txt"));

// Read line by line (memory efficient)
try (var reader = Files.newBufferedReader(
        Path.of("data.txt"))) {
    String line;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
}

// Stream lines (lazy, memory efficient)
try (Stream<String> stream = Files.lines(
        Path.of("data.txt"))) {
    stream.forEach(System.out::println);
}`}
        notes="Both languages offer simple one-liners and memory-efficient line-by-line reading. Python uses 'with open()' as the standard pattern. Java's Files utility class (java.nio.file) provides modern file operations since Java 7+."
      />
      <ComparisonCard
        title="Write File"
        python={`# Write text to file
with open("output.txt", "w") as f:
    f.write("Hello, World!\\n")
    f.write("Second line\\n")

# Append to file
with open("log.txt", "a") as f:
    f.write("New log entry\\n")

# Write multiple lines
lines = ["line 1", "line 2", "line 3"]
with open("output.txt", "w") as f:
    f.writelines(line + "\\n" for line in lines)

# One-liner
from pathlib import Path
Path("output.txt").write_text("Hello!")`}
        java={`// Write text to file (Java 11+)
Files.writeString(Path.of("output.txt"),
    "Hello, World!\\nSecond line\\n");

// Append to file
Files.writeString(Path.of("log.txt"),
    "New log entry\\n",
    StandardOpenOption.APPEND,
    StandardOpenOption.CREATE);

// Write multiple lines
List<String> lines = List.of(
    "line 1", "line 2", "line 3");
Files.write(Path.of("output.txt"), lines);

// BufferedWriter for large files
try (var writer = Files.newBufferedWriter(
        Path.of("output.txt"))) {
    writer.write("Hello!");
    writer.newLine();
}`}
        notes="Python's 'w' mode creates or overwrites, 'a' appends. Java uses StandardOpenOption flags for the same behavior. Both languages have simple one-liners and buffered options for large files."
      />
      <ComparisonCard
        title="CSV Files"
        python={`import csv

# Read CSV
with open("data.csv", "r") as f:
    reader = csv.reader(f)
    header = next(reader)
    for row in reader:
        print(row)  # List of strings

# Read as dictionaries
with open("data.csv", "r") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["name"], row["age"])

# Write CSV
with open("out.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["name", "age"])
    writer.writerow(["Alice", 30])
    writer.writerow(["Bob", 25])`}
        java={`// No built-in CSV library - manual parsing
try (var reader = Files.newBufferedReader(
        Path.of("data.csv"))) {
    String header = reader.readLine();
    String line;
    while ((line = reader.readLine()) != null) {
        String[] fields = line.split(",");
        System.out.println(Arrays.toString(fields));
    }
}

// With OpenCSV library (common choice)
// CSVReader reader = new CSVReader(
//     new FileReader("data.csv"));
// List<String[]> rows = reader.readAll();

// Write CSV manually
try (var writer = Files.newBufferedWriter(
        Path.of("out.csv"))) {
    writer.write("name,age\\n");
    writer.write("Alice,30\\n");
    writer.write("Bob,25\\n");
}`}
        notes="Python has a built-in csv module with reader, DictReader, and writer. Java has no built-in CSV support; manual parsing with split() works for simple cases. Libraries like OpenCSV or Apache Commons CSV are used for robust CSV handling."
      />
      <ComparisonCard
        title="JSON"
        python={`import json

# Parse JSON string
data = json.loads('{"name": "Alice", "age": 30}')
print(data["name"])  # "Alice"

# Convert to JSON string
obj = {"name": "Bob", "scores": [95, 87, 92]}
json_str = json.dumps(obj, indent=2)

# Read JSON file
with open("config.json", "r") as f:
    config = json.load(f)

# Write JSON file
with open("output.json", "w") as f:
    json.dump(obj, f, indent=2)`}
        java={`// Using Jackson (most popular library)
import com.fasterxml.jackson.databind.ObjectMapper;

ObjectMapper mapper = new ObjectMapper();

// Parse JSON string
var data = mapper.readTree(
    "{\\"name\\": \\"Alice\\", \\"age\\": 30}");
System.out.println(data.get("name").asText());

// Convert object to JSON
record Person(String name, int[] scores) {}
Person obj = new Person("Bob",
    new int[]{95, 87, 92});
String json = mapper.writerWithDefaultPrettyPrinter()
    .writeValueAsString(obj);

// Read JSON file
Person p = mapper.readValue(
    new File("config.json"), Person.class);

// Write JSON file
mapper.writeValue(
    new File("output.json"), obj);`}
        notes="Python has built-in json module for serialization. Java requires external libraries: Jackson (most popular), Gson (Google), or org.json. Jackson maps JSON directly to Java objects via ObjectMapper."
      />
      <ComparisonCard
        title="Path Handling"
        python={`from pathlib import Path

# Create paths
home = Path.home()
config = home / ".config" / "app" / "settings.json"

# Path operations
print(config.name)      # "settings.json"
print(config.stem)      # "settings"
print(config.suffix)    # ".json"
print(config.parent)    # ~/.config/app

# Check existence
if config.exists():
    print("File exists")
if config.is_file():
    print("It's a file")

# List directory contents
for item in Path(".").iterdir():
    print(item)

# Glob pattern matching
for py_file in Path(".").rglob("*.py"):
    print(py_file)`}
        java={`import java.nio.file.*;

// Create paths
Path home = Path.of(System.getProperty("user.home"));
Path config = home.resolve(".config")
    .resolve("app").resolve("settings.json");

// Path operations
System.out.println(config.getFileName());
// "settings.json"
String name = config.getFileName().toString();
String ext = name.substring(name.lastIndexOf("."));
System.out.println(config.getParent());

// Check existence
if (Files.exists(config))
    System.out.println("File exists");
if (Files.isRegularFile(config))
    System.out.println("It's a file");

// List directory contents
try (var stream = Files.list(Path.of("."))) {
    stream.forEach(System.out::println);
}

// Glob pattern matching
try (var stream = Files.walk(Path.of("."))) {
    stream.filter(p -> p.toString().endsWith(".java"))
        .forEach(System.out::println);
}`}
        notes="Python's pathlib provides an elegant object-oriented API with the / operator for joining paths. Java's Path and Files classes (java.nio.file) are powerful but more verbose. Both handle cross-platform path separators automatically."
      />
    </>
  )

  const renderEcosystem = () => (
    <>
      <ComparisonCard
        title="Package Management"
        python={`# pip - the standard package installer
pip install requests
pip install flask==2.3.0
pip install -r requirements.txt

# requirements.txt
# requests==2.31.0
# flask>=2.3.0
# numpy~=1.24.0

# Modern: pyproject.toml (PEP 621)
# [project]
# name = "my-app"
# dependencies = ["requests>=2.31", "flask>=2.3"]

# Virtual environment isolation
python -m venv .venv
source .venv/bin/activate  # Linux/Mac
pip install -e .           # Install current project`}
        java={`<!-- Maven: pom.xml -->
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <version>3.2.0</version>
    </dependency>
</dependencies>

// Gradle: build.gradle
// dependencies {
//     implementation 'org.springframework.boot:
//         spring-boot-starter-web:3.2.0'
//     testImplementation 'junit:junit:5.10.0'
// }

// Commands
// mvn install       (Maven)
// gradle build      (Gradle)
// mvn dependency:tree  (view dependencies)`}
        notes="Python uses pip with requirements.txt or pyproject.toml. Java uses Maven (pom.xml) or Gradle (build.gradle). Maven/Gradle handle transitive dependencies, build lifecycle, and plugins. Python's ecosystem is simpler but less structured."
      />
      <ComparisonCard
        title="Virtual Environments"
        python={`# Create isolated environment
python -m venv myproject_env

# Activate
source myproject_env/bin/activate   # Linux/Mac
myproject_env\\Scripts\\activate     # Windows

# Install packages (isolated)
pip install flask
pip freeze > requirements.txt

# Deactivate
deactivate

# Alternative tools:
# - conda (Anaconda)
# - poetry (dependency management + venv)
# - pipenv (Pipfile-based)
# - uv (fast, Rust-based)`}
        java={`// Java has no virtual environments
// Dependency isolation via build tools

// Maven: dependencies in local repository
// ~/.m2/repository/

// Gradle: cached in
// ~/.gradle/caches/

// SDKMAN for managing Java versions
// sdk install java 21.0.1-tem
// sdk use java 17.0.9-tem

// Classpath isolates dependencies per project
// Each project has its own dependency tree

// Docker is commonly used for full isolation
// FROM eclipse-temurin:21-jre
// COPY target/app.jar /app.jar
// CMD ["java", "-jar", "/app.jar"]`}
        notes="Python needs virtual environments to avoid dependency conflicts between projects. Java's build tools (Maven/Gradle) manage per-project dependencies via the classpath. SDKMAN manages multiple Java versions. Docker provides full environment isolation."
      />
      <ComparisonCard
        title="Testing"
        python={`# pytest (most popular)
# test_calculator.py
def test_add():
    assert add(2, 3) == 5

def test_divide_by_zero():
    with pytest.raises(ZeroDivisionError):
        divide(1, 0)

# Parametrized tests
@pytest.mark.parametrize("a,b,expected", [
    (1, 2, 3),
    (0, 0, 0),
    (-1, 1, 0),
])
def test_add_params(a, b, expected):
    assert add(a, b) == expected

# Run: pytest
# Run verbose: pytest -v
# Run specific: pytest test_calc.py::test_add`}
        java={`// JUnit 5 (standard)
import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

class CalculatorTest {
    @Test
    void testAdd() {
        assertEquals(5, add(2, 3));
    }

    @Test
    void testDivideByZero() {
        assertThrows(ArithmeticException.class,
            () -> divide(1, 0));
    }

    @ParameterizedTest
    @CsvSource({"1,2,3", "0,0,0", "-1,1,0"})
    void testAddParams(int a, int b, int expected) {
        assertEquals(expected, add(a, b));
    }
}

// Run: mvn test
// Run specific: mvn test -Dtest=CalculatorTest
// Mockito for mocking dependencies`}
        notes="Python's pytest is concise and uses plain assert statements. Java's JUnit 5 uses annotations (@Test, @ParameterizedTest) and assertion methods. Both support parametrized tests, fixtures/setup, and mocking frameworks."
      />
      <ComparisonCard
        title="Web Frameworks"
        python={`# Flask - lightweight micro-framework
from flask import Flask, jsonify
app = Flask(__name__)

@app.route("/api/hello")
def hello():
    return jsonify({"message": "Hello!"})

# FastAPI - modern, async, auto-docs
from fastapi import FastAPI
app = FastAPI()

@app.get("/api/users/{user_id}")
async def get_user(user_id: int):
    return {"id": user_id, "name": "Alice"}

# Django - full-featured ("batteries included")
# Includes ORM, admin panel, auth, templates
# python manage.py runserver`}
        java={`// Spring Boot - dominant Java web framework
@RestController
public class HelloController {

    @GetMapping("/api/hello")
    public Map<String, String> hello() {
        return Map.of("message", "Hello!");
    }

    @GetMapping("/api/users/{userId}")
    public User getUser(
            @PathVariable int userId) {
        return new User(userId, "Alice");
    }
}

// Spring Boot includes:
// - Dependency injection
// - ORM (Spring Data JPA)
// - Security (Spring Security)
// - Auto-configuration
// mvn spring-boot:run`}
        notes="Python has many web frameworks: Flask (micro), Django (full-stack), FastAPI (modern async). Java is dominated by Spring Boot, which is comprehensive but heavier. FastAPI and Spring Boot both generate API documentation automatically."
      />
      <ComparisonCard
        title="Type Checking"
        python={`# Type hints (PEP 484) - optional annotations
def greet(name: str) -> str:
    return f"Hello, {name}"

# Complex types
from typing import Optional, Union

def find_user(id: int) -> Optional[dict]:
    return None

def process(data: list[int]) -> dict[str, int]:
    return {"sum": sum(data), "count": len(data)}

# Checked by external tools, NOT at runtime
# mypy: static type checker
# $ mypy my_module.py

# pyright: faster alternative (used by VS Code)
# Runtime still allows: greet(42)  # No error`}
        java={`// Types enforced by compiler - always required
public String greet(String name) {
    return "Hello, " + name;
}

// Generics for complex types
public Optional<Map<String, Object>> findUser(
        int id) {
    return Optional.empty();
}

public Map<String, Integer> process(
        List<Integer> data) {
    return Map.of(
        "sum", data.stream()
            .mapToInt(Integer::intValue).sum(),
        "count", data.size());
}

// Compile-time enforcement
// greet(42);  // COMPILE ERROR: incompatible types

// Generics with bounds
public <T extends Comparable<T>> T max(T a, T b) {
    return a.compareTo(b) >= 0 ? a : b;
}`}
        notes="Java's type system is mandatory and enforced at compile time - type errors are caught before the code runs. Python's type hints are optional and only checked by external tools like mypy. This is one of the most fundamental differences between the languages."
      />
    </>
  )

  const renderSection = () => {
    switch (activeSection) {
      case 'basics': return renderBasics()
      case 'data-types': return renderDataTypes()
      case 'collections': return renderCollections()
      case 'oop': return renderOOP()
      case 'functions': return renderFunctions()
      case 'error-handling': return renderErrorHandling()
      case 'concurrency': return renderConcurrency()
      case 'syntax-tricks': return renderSyntaxTricks()
      case 'io-files': return renderIOFiles()
      case 'ecosystem': return renderEcosystem()
      default: return renderBasics()
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #111827, #1e3a8a, #111827)', padding: '1.5rem' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        {/* Back Button */}
        <button
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'white',
            background: '#2563eb',
            border: 'none',
            borderRadius: '0.5rem',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            fontSize: '0.9rem',
            marginBottom: '1.5rem',
          }}
        >
          Back
        </button>

        {/* Title */}
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          marginBottom: '0.5rem',
          background: 'linear-gradient(to right, #60a5fa, #22d3ee)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          Python vs Java
        </h1>

        {/* Breadcrumb */}
        {breadcrumb && <Breadcrumb items={breadcrumb} />}

        <p style={{ color: '#9ca3af', marginBottom: '2rem', fontSize: '1.1rem' }}>
          Side-by-side comparison of Python and Java syntax, idioms, and ecosystem features.
        </p>

        {/* Tab Bar */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2rem',
          overflowX: 'auto',
          paddingBottom: '0.5rem',
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: '600',
                whiteSpace: 'nowrap',
                color: 'white',
                background: activeSection === tab.id ? '#2563eb' : '#374151',
                transition: 'background 0.2s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Section Content */}
        {renderSection()}
      </div>
    </div>
  )
}

export default PythonVsJava
