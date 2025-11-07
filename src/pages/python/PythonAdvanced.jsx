import { useState } from 'react'

// Simple syntax highlighter for Python code
const SyntaxHighlighter = ({ code }) => {
  const highlightPython = (code) => {
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    const protectedContent = []
    let placeholder = 0

    highlighted = highlighted.replace(/(#.*$)/gm, (match) => {
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
      .replace(/\b(def|class|if|elif|else|for|while|in|not|and|or|is|return|yield|import|from|as|try|except|finally|with|lambda|None|pass|break|continue|async|await|raise|assert|global|nonlocal)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(True|False|None)\b/g, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(print|len|range|enumerate|zip|map|filter|sorted|sum|max|min|list|dict|set|tuple|type|isinstance|property|staticmethod|classmethod|super)\b/g, '<span style="color: #dcdcaa;">$1</span>')
      .replace(/\b(\d+\.?\d*)\b/g, '<span style="color: #b5cea8;">$1</span>')

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
      padding: '1.25rem'
    }}>
      <code dangerouslySetInnerHTML={{ __html: highlightPython(code) }} />
    </pre>
  )
}

function PythonAdvanced({ onBack }) {
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

      if (line.includes('# ═══════════════════════════════════════════════════════════════')) {
        if (currentSection) {
          sections.push({ title: currentSection, code: currentContent.join('\n') })
          currentContent = []
        }

        if (i + 1 < lines.length && lines[i + 1].includes('# ✦')) {
          currentSection = lines[i + 1].replace('# ✦', '').trim()
          i += 2
          continue
        }
      }

      if (currentSection) {
        currentContent.push(line)
      }
    }

    if (currentSection && currentContent.length > 0) {
      sections.push({ title: currentSection, code: currentContent.join('\n') })
    }

    return sections
  }

  const concepts = [
    {
      name: 'Decorators',
      icon: '🎨',
      explanation: `**Core Concept:**
• Functions that modify or enhance other functions
• Wrapper pattern for adding functionality
• Syntax: @decorator above function definition
• Can be stacked (multiple decorators)
• Returns modified function object

**Function Decorators:**
• Wrap function to add behavior before/after execution
• Preserve function metadata with functools.wraps
• Can accept arguments via decorator factories
• Common uses: logging, timing, authentication, caching

**Decorator Syntax:**
• @decorator is shorthand for func = decorator(func)
• Applied bottom-to-top when stacked
• Can be used with or without parentheses

**Decorator with Arguments:**
• Decorator factory pattern
• Outer function accepts arguments
• Returns actual decorator
• Three levels: factory → decorator → wrapper

**Class Decorators:**
• Modify or enhance classes
• Add methods or attributes dynamically
• Implement singleton pattern
• Register classes automatically

**Built-in Decorators:**
• @property - getter method
• @staticmethod - no self parameter
• @classmethod - receives class as first argument
• @functools.wraps - preserves function metadata`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Basic decorator
# ═══════════════════════════════════════════════════════════════
def simple_decorator(func):
    def wrapper():
        print("Before function call")
        func()
        print("After function call")
    return wrapper

@simple_decorator
def greet():
    print("Hello!")

greet()
# Output:
# Before function call
# Hello!
# After function call


# ═══════════════════════════════════════════════════════════════
# ✦ Decorator with arguments
# ═══════════════════════════════════════════════════════════════
def decorator_with_args(func):
    def wrapper(*args, **kwargs):
        print(f"Arguments: {args}, {kwargs}")
        result = func(*args, **kwargs)
        print(f"Result: {result}")
        return result
    return wrapper

@decorator_with_args
def add(a, b):
    return a + b

result = add(5, 3)
# Output:
# Arguments: (5, 3), {}
# Result: 8


# ═══════════════════════════════════════════════════════════════
# ✦ Preserving function metadata
# ═══════════════════════════════════════════════════════════════
from functools import wraps

def logged(func):
    @wraps(func)  # Preserves original function's metadata
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@logged
def calculate(x, y):
    """Calculate sum of two numbers"""
    return x + y

print(calculate.__name__)  # calculate (not wrapper)
print(calculate.__doc__)   # Calculate sum of two numbers


# ═══════════════════════════════════════════════════════════════
# ✦ Decorator factory (parameterized decorator)
# ═══════════════════════════════════════════════════════════════
def repeat(times):
    """Decorator factory that repeats function call"""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def say_hello():
    print("Hello!")

say_hello()
# Output:
# Hello!
# Hello!
# Hello!


# ═══════════════════════════════════════════════════════════════
# ✦ Timing decorator
# ═══════════════════════════════════════════════════════════════
import time

def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end - start:.4f} seconds")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
    return "Done"

slow_function()
# Output: slow_function took 1.0001 seconds


# ═══════════════════════════════════════════════════════════════
# ✦ Caching decorator
# ═══════════════════════════════════════════════════════════════
def memoize(func):
    cache = {}
    @wraps(func)
    def wrapper(*args):
        if args not in cache:
            cache[args] = func(*args)
        return cache[args]
    return wrapper

@memoize
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))  # Fast due to caching
# Output: 55


# ═══════════════════════════════════════════════════════════════
# ✦ Class decorator
# ═══════════════════════════════════════════════════════════════
def singleton(cls):
    """Ensures only one instance of class exists"""
    instances = {}
    @wraps(cls)
    def get_instance(*args, **kwargs):
        if cls not in instances:
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]
    return get_instance

@singleton
class Database:
    def __init__(self):
        print("Database initialized")

db1 = Database()  # Database initialized
db2 = Database()  # No output (returns same instance)
print(db1 is db2)  # True


# ═══════════════════════════════════════════════════════════════
# ✦ Stacking decorators
# ═══════════════════════════════════════════════════════════════
@timer
@repeat(2)
def process():
    print("Processing...")

process()
# Output:
# Processing...
# Processing...
# process took 0.0001 seconds


# ═══════════════════════════════════════════════════════════════
# ✦ Property decorator
# ═══════════════════════════════════════════════════════════════
class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("Radius cannot be negative")
        self._radius = value

    @property
    def area(self):
        return 3.14159 * self._radius ** 2

c = Circle(5)
print(c.radius)  # 5
print(c.area)    # 78.53975
c.radius = 10
print(c.area)    # 314.159`
    },
    {
      name: 'Generators',
      icon: '⚡',
      explanation: `**Core Concept:**
• Functions that yield values one at a time
• Use yield instead of return
• Lazy evaluation - values generated on demand
• Memory efficient for large datasets
• Maintain state between yields

**Yield Statement:**
• Pauses function and returns value
• Resumes from where it left off on next call
• Local variables preserved between calls
• Can yield multiple times

**Generator Expressions:**
• Similar to list comprehensions with ()
• Creates generator object, not list
• Memory efficient alternative to lists
• Syntax: (expression for item in iterable)

**Generator Methods:**
• next(gen) - get next value
• gen.send(value) - send value to generator
• gen.throw(exception) - raise exception in generator
• gen.close() - stop generator

**Use Cases:**
• Large file processing
• Infinite sequences
• Pipeline processing
• Memory-constrained operations
• Streaming data

**Advantages:**
• Memory efficient (one item at a time)
• Can represent infinite sequences
• Composable pipelines
• Lazy evaluation benefits`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Basic generator
# ═══════════════════════════════════════════════════════════════
def count_up_to(n):
    count = 1
    while count <= n:
        yield count
        count += 1

gen = count_up_to(5)
print(next(gen))  # 1
print(next(gen))  # 2
print(next(gen))  # 3

# Or use in for loop
for num in count_up_to(3):
    print(num)
# Output: 1, 2, 3


# ═══════════════════════════════════════════════════════════════
# ✦ Generator vs list (memory comparison)
# ═══════════════════════════════════════════════════════════════
# List - all values in memory
def list_squares(n):
    return [x ** 2 for x in range(n)]

# Generator - one value at a time
def gen_squares(n):
    for x in range(n):
        yield x ** 2

# Memory efficient for large n
gen = gen_squares(1000000)
print(next(gen))  # 0
print(next(gen))  # 1


# ═══════════════════════════════════════════════════════════════
# ✦ Fibonacci generator (infinite sequence)
# ═══════════════════════════════════════════════════════════════
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

fib = fibonacci()
# Get first 10 Fibonacci numbers
for i, num in enumerate(fib):
    if i >= 10:
        break
    print(num, end=' ')
# Output: 0 1 1 2 3 5 8 13 21 34


# ═══════════════════════════════════════════════════════════════
# ✦ Generator expression
# ═══════════════════════════════════════════════════════════════
# List comprehension (all in memory)
squares_list = [x ** 2 for x in range(10)]

# Generator expression (lazy)
squares_gen = (x ** 2 for x in range(10))

print(type(squares_gen))  # <class 'generator'>
print(sum(squares_gen))   # 285


# ═══════════════════════════════════════════════════════════════
# ✦ File reading generator
# ═══════════════════════════════════════════════════════════════
def read_large_file(file_path):
    """Memory-efficient file reading"""
    with open(file_path, 'r') as file:
        for line in file:
            yield line.strip()

# Usage (doesn't load entire file into memory)
# for line in read_large_file('huge_file.txt'):
#     process(line)


# ═══════════════════════════════════════════════════════════════
# ✦ Generator pipeline
# ═══════════════════════════════════════════════════════════════
def numbers():
    for i in range(10):
        yield i

def square(nums):
    for num in nums:
        yield num ** 2

def even_only(nums):
    for num in nums:
        if num % 2 == 0:
            yield num

# Chain generators
pipeline = even_only(square(numbers()))
print(list(pipeline))
# Output: [0, 4, 16, 36, 64]


# ═══════════════════════════════════════════════════════════════
# ✦ Generator with send()
# ═══════════════════════════════════════════════════════════════
def echo_generator():
    while True:
        value = yield
        if value is not None:
            print(f"Received: {value}")

gen = echo_generator()
next(gen)  # Prime the generator
gen.send("Hello")    # Received: Hello
gen.send("World")    # Received: World


# ═══════════════════════════════════════════════════════════════
# ✦ Generator for batching
# ═══════════════════════════════════════════════════════════════
def batch(iterable, batch_size):
    """Split iterable into batches"""
    batch = []
    for item in iterable:
        batch.append(item)
        if len(batch) == batch_size:
            yield batch
            batch = []
    if batch:  # Yield remaining items
        yield batch

data = range(10)
for b in batch(data, 3):
    print(b)
# Output: [0, 1, 2], [3, 4, 5], [6, 7, 8], [9]


# ═══════════════════════════════════════════════════════════════
# ✦ Practical example: CSV processing
# ═══════════════════════════════════════════════════════════════
def process_csv_rows(filename):
    """Process CSV file row by row"""
    with open(filename) as f:
        # Skip header
        next(f)
        for line in f:
            values = line.strip().split(',')
            yield {
                'name': values[0],
                'age': int(values[1]),
                'city': values[2]
            }

# Memory efficient even for huge files
# for row in process_csv_rows('data.csv'):
#     if row['age'] > 18:
#         print(row['name'])


# ═══════════════════════════════════════════════════════════════
# ✦ Generator state preservation
# ═══════════════════════════════════════════════════════════════
def stateful_generator():
    state = 0
    while True:
        state += 1
        received = yield state
        if received:
            state = received
            print(f"State reset to {state}")

gen = stateful_generator()
print(next(gen))      # 1
print(next(gen))      # 2
gen.send(10)          # State reset to 10
print(next(gen))      # 11`
    },
    {
      name: 'Context Managers',
      icon: '🔐',
      explanation: `**Core Concept:**
• Manage resources with setup and cleanup
• Use with statement for automatic cleanup
• Implements __enter__ and __exit__ methods
• Guarantees cleanup even if exceptions occur
• Common for file handling, locks, connections

**Protocol:**
• __enter__(self) - setup, returns resource
• __exit__(self, exc_type, exc_val, exc_tb) - cleanup
• Called automatically by with statement
• __exit__ receives exception info if raised

**Built-in Context Managers:**
• open() - file handling
• threading.Lock() - thread synchronization
• decimal.localcontext() - precision control
• contextlib helpers - suppress, redirect_stdout

**contextlib Module:**
• @contextmanager decorator - simpler syntax
• Uses yield to separate setup/cleanup
• Exception handling with try/finally
• More Pythonic than class-based approach

**Use Cases:**
• File operations (auto close)
• Database connections
• Acquiring/releasing locks
• Temporary state changes
• Resource allocation/deallocation

**Best Practices:**
• Always use with for file operations
• Implement both __enter__ and __exit__
• Return self from __enter__ commonly
• Handle exceptions in __exit__ appropriately`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Class-based context manager
# ═══════════════════════════════════════════════════════════════
class FileManager:
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode
        self.file = None

    def __enter__(self):
        print(f"Opening {self.filename}")
        self.file = open(self.filename, self.mode)
        return self.file

    def __exit__(self, exc_type, exc_val, exc_tb):
        print(f"Closing {self.filename}")
        if self.file:
            self.file.close()
        return False  # Don't suppress exceptions

# Usage
with FileManager('test.txt', 'w') as f:
    f.write("Hello, World!")
# File automatically closed


# ═══════════════════════════════════════════════════════════════
# ✦ Using @contextmanager decorator
# ═══════════════════════════════════════════════════════════════
from contextlib import contextmanager

@contextmanager
def file_manager(filename, mode):
    print(f"Opening {filename}")
    file = open(filename, mode)
    try:
        yield file  # Setup before yield, cleanup after
    finally:
        print(f"Closing {filename}")
        file.close()

with file_manager('test.txt', 'r') as f:
    content = f.read()


# ═══════════════════════════════════════════════════════════════
# ✦ Database connection context manager
# ═══════════════════════════════════════════════════════════════
@contextmanager
def database_connection(db_name):
    print(f"Connecting to {db_name}")
    connection = {"db": db_name, "connected": True}
    try:
        yield connection
    finally:
        print(f"Closing connection to {db_name}")
        connection["connected"] = False

with database_connection("mydb") as conn:
    print(f"Using {conn}")
# Output:
# Connecting to mydb
# Using {'db': 'mydb', 'connected': True}
# Closing connection to mydb


# ═══════════════════════════════════════════════════════════════
# ✦ Timer context manager
# ═══════════════════════════════════════════════════════════════
import time

@contextmanager
def timer(label):
    start = time.time()
    try:
        yield
    finally:
        end = time.time()
        print(f"{label}: {end - start:.4f} seconds")

with timer("Processing"):
    time.sleep(1)
    print("Working...")
# Output:
# Working...
# Processing: 1.0001 seconds


# ═══════════════════════════════════════════════════════════════
# ✦ Temporary directory changer
# ═══════════════════════════════════════════════════════════════
import os

@contextmanager
def change_dir(path):
    old_dir = os.getcwd()
    os.chdir(path)
    try:
        yield
    finally:
        os.chdir(old_dir)

# Temporarily change directory
with change_dir('/tmp'):
    print(f"In: {os.getcwd()}")
print(f"Back to: {os.getcwd()}")


# ═══════════════════════════════════════════════════════════════
# ✦ Exception suppression
# ═══════════════════════════════════════════════════════════════
from contextlib import suppress

# Instead of try/except for specific exception
with suppress(FileNotFoundError):
    os.remove('nonexistent_file.txt')
# No error raised

# Equivalent to:
# try:
#     os.remove('nonexistent_file.txt')
# except FileNotFoundError:
#     pass


# ═══════════════════════════════════════════════════════════════
# ✦ Lock manager
# ═══════════════════════════════════════════════════════════════
class Lock:
    def __init__(self, name):
        self.name = name
        self.locked = False

    def __enter__(self):
        print(f"Acquiring lock: {self.name}")
        self.locked = True
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        print(f"Releasing lock: {self.name}")
        self.locked = False
        return False

with Lock("resource") as lock:
    print(f"Lock status: {lock.locked}")
# Output:
# Acquiring lock: resource
# Lock status: True
# Releasing lock: resource


# ═══════════════════════════════════════════════════════════════
# ✦ Multiple context managers
# ═══════════════════════════════════════════════════════════════
# Python 3.10+ syntax
with (
    open('input.txt', 'r') as infile,
    open('output.txt', 'w') as outfile
):
    outfile.write(infile.read())

# Or nested (older syntax)
with open('input.txt', 'r') as infile:
    with open('output.txt', 'w') as outfile:
        outfile.write(infile.read())


# ═══════════════════════════════════════════════════════════════
# ✦ Redirect stdout
# ═══════════════════════════════════════════════════════════════
from contextlib import redirect_stdout
import io

f = io.StringIO()
with redirect_stdout(f):
    print("This goes to StringIO")
    print("Not to console")

output = f.getvalue()
print(f"Captured: {output}")


# ═══════════════════════════════════════════════════════════════
# ✦ Practical: Transaction manager
# ═══════════════════════════════════════════════════════════════
@contextmanager
def transaction():
    print("BEGIN TRANSACTION")
    try:
        yield
        print("COMMIT")
    except Exception as e:
        print(f"ROLLBACK due to {e}")
        raise

# Successful transaction
with transaction():
    print("Inserting data...")

# Failed transaction
try:
    with transaction():
        print("Inserting data...")
        raise ValueError("Error!")
except ValueError:
    pass

# Output:
# BEGIN TRANSACTION
# Inserting data...
# COMMIT
# BEGIN TRANSACTION
# Inserting data...
# ROLLBACK due to Error!`
    },
    {
      name: 'Iterators & Itertools',
      icon: '🔄',
      explanation: `**Core Concept:**
• Objects that implement __iter__ and __next__
• Protocol for traversing collections
• More memory efficient than lists
• Foundation for for loops and generators
• Exhausted after one pass (unless recreated)

**Iterator Protocol:**
• __iter__(self) - returns iterator object
• __next__(self) - returns next value
• Raises StopIteration when exhausted
• All generators are iterators

**Built-in Iterators:**
• iter() - creates iterator from iterable
• next() - gets next value
• enumerate() - adds counter
• zip() - combines iterables
• reversed() - reverse iterator

**itertools Module:**
• Efficient iterators for complex operations
• count() - infinite counter
• cycle() - repeat sequence infinitely
• chain() - concatenate iterables
• combinations() - all combinations
• permutations() - all permutations

**Use Cases:**
• Custom iteration logic
• Memory-efficient data processing
• Infinite sequences
• Combinatorial operations
• Pipeline processing

**Advantages:**
• Memory efficient
• Lazy evaluation
• Composable
• Supports infinite sequences`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Custom iterator class
# ═══════════════════════════════════════════════════════════════
class CountDown:
    def __init__(self, start):
        self.current = start

    def __iter__(self):
        return self

    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        self.current -= 1
        return self.current + 1

for num in CountDown(5):
    print(num, end=' ')
# Output: 5 4 3 2 1


# ═══════════════════════════════════════════════════════════════
# ✦ iter() and next()
# ═══════════════════════════════════════════════════════════════
numbers = [1, 2, 3]
iterator = iter(numbers)

print(next(iterator))  # 1
print(next(iterator))  # 2
print(next(iterator))  # 3
# print(next(iterator))  # StopIteration error


# ═══════════════════════════════════════════════════════════════
# ✦ enumerate() - add index to iteration
# ═══════════════════════════════════════════════════════════════
fruits = ['apple', 'banana', 'cherry']
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")
# Output:
# 0: apple
# 1: banana
# 2: cherry

# Start from different index
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}. {fruit}")


# ═══════════════════════════════════════════════════════════════
# ✦ zip() - combine multiple iterables
# ═══════════════════════════════════════════════════════════════
names = ['Alice', 'Bob', 'Charlie']
ages = [25, 30, 35]
cities = ['NYC', 'LA', 'Chicago']

for name, age, city in zip(names, ages, cities):
    print(f"{name}, {age}, {city}")
# Output:
# Alice, 25, NYC
# Bob, 30, LA
# Charlie, 35, Chicago

# Unzip with zip(*...)
pairs = [(1, 'a'), (2, 'b'), (3, 'c')]
numbers, letters = zip(*pairs)
print(numbers)  # (1, 2, 3)
print(letters)  # ('a', 'b', 'c')


# ═══════════════════════════════════════════════════════════════
# ✦ itertools.count() - infinite counter
# ═══════════════════════════════════════════════════════════════
from itertools import count, islice

# Infinite counter
counter = count(start=1, step=2)
first_5 = list(islice(counter, 5))
print(first_5)  # [1, 3, 5, 7, 9]


# ═══════════════════════════════════════════════════════════════
# ✦ itertools.cycle() - repeat sequence
# ═══════════════════════════════════════════════════════════════
from itertools import cycle

colors = cycle(['red', 'green', 'blue'])
for i, color in enumerate(colors):
    if i >= 7:
        break
    print(color, end=' ')
# Output: red green blue red green blue red


# ═══════════════════════════════════════════════════════════════
# ✦ itertools.chain() - concatenate iterables
# ═══════════════════════════════════════════════════════════════
from itertools import chain

list1 = [1, 2, 3]
list2 = [4, 5, 6]
list3 = [7, 8, 9]

combined = chain(list1, list2, list3)
print(list(combined))
# Output: [1, 2, 3, 4, 5, 6, 7, 8, 9]


# ═══════════════════════════════════════════════════════════════
# ✦ itertools.combinations() and permutations()
# ═══════════════════════════════════════════════════════════════
from itertools import combinations, permutations

items = ['A', 'B', 'C']

# Combinations (order doesn't matter)
combos = list(combinations(items, 2))
print(combos)
# Output: [('A', 'B'), ('A', 'C'), ('B', 'C')]

# Permutations (order matters)
perms = list(permutations(items, 2))
print(perms)
# Output: [('A', 'B'), ('A', 'C'), ('B', 'A'), ('B', 'C'), ('C', 'A'), ('C', 'B')]


# ═══════════════════════════════════════════════════════════════
# ✦ itertools.groupby() - group consecutive items
# ═══════════════════════════════════════════════════════════════
from itertools import groupby

data = [1, 1, 2, 2, 2, 3, 1, 1]
for key, group in groupby(data):
    print(f"{key}: {list(group)}")
# Output:
# 1: [1, 1]
# 2: [2, 2, 2]
# 3: [3]
# 1: [1, 1]


# ═══════════════════════════════════════════════════════════════
# ✦ itertools filtering
# ═══════════════════════════════════════════════════════════════
from itertools import filterfalse, takewhile, dropwhile

numbers = [1, 2, 3, 4, 5, 6, 7, 8]

# filterfalse - opposite of filter
odd_numbers = list(filterfalse(lambda x: x % 2 == 0, numbers))
print(odd_numbers)  # [1, 3, 5, 7]

# takewhile - take until condition fails
result = list(takewhile(lambda x: x < 5, numbers))
print(result)  # [1, 2, 3, 4]

# dropwhile - drop until condition fails
result = list(dropwhile(lambda x: x < 5, numbers))
print(result)  # [5, 6, 7, 8]


# ═══════════════════════════════════════════════════════════════
# ✦ Practical: Sliding window
# ═══════════════════════════════════════════════════════════════
from itertools import islice

def sliding_window(iterable, n):
    """Generate sliding window of size n"""
    it = iter(iterable)
    window = list(islice(it, n))
    if len(window) == n:
        yield tuple(window)
    for item in it:
        window = window[1:] + [item]
        yield tuple(window)

data = [1, 2, 3, 4, 5, 6]
for window in sliding_window(data, 3):
    print(window)
# Output:
# (1, 2, 3)
# (2, 3, 4)
# (3, 4, 5)
# (4, 5, 6)`
    }
  ]

  return (
    <>
      <div style={{
        padding: '2rem',
        maxWidth: '95%',
        margin: '120px auto 0',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
        border: '3px solid rgba(100, 100, 100, 0.4)'
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
              backgroundColor: '#646464',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(100, 100, 100, 0.3)'
            }}
          >
            ← Back to Python Topics
          </button>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            color: '#1f2937',
            margin: 0
          }}>
            🚀 Python Advanced
          </h1>
          <div style={{ width: '150px' }}></div>
        </div>

        <div style={{
          backgroundColor: 'rgba(100, 100, 100, 0.05)',
          padding: '2.5rem 10rem',
          borderRadius: '16px',
          border: '3px solid rgba(100, 100, 100, 0.3)',
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
            Decorators, generators, context managers, metaclasses, descriptors, async/await patterns, and advanced OOP concepts.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {concepts.map((concept, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedConcept(concept)}
              style={{
                backgroundColor: 'rgba(100, 100, 100, 0.05)',
                padding: '2rem',
                borderRadius: '16px',
                border: '3px solid rgba(100, 100, 100, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>
                {concept.icon}
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#646464',
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
                {concept.explanation?.substring(0, 150)}...
              </p>
            </div>
          ))}
        </div>
      </div>

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
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '90vw',
              maxHeight: '90vh',
              width: '1200px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              border: '3px solid rgba(100, 100, 100, 0.4)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{
              padding: '1.5rem 2rem',
              borderBottom: '2px solid rgba(100, 100, 100, 0.2)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'rgba(100, 100, 100, 0.05)'
            }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#646464',
                margin: 0
              }}>
                {selectedConcept.icon} {selectedConcept.name}
              </h2>
              <button
                onClick={() => setSelectedConcept(null)}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '1.5rem',
                  backgroundColor: 'transparent',
                  color: '#6b7280',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ padding: '2rem', overflowY: 'auto', flex: 1 }}>
              <div style={{
                backgroundColor: 'rgba(100, 100, 100, 0.05)',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '2px solid rgba(100, 100, 100, 0.2)',
                marginBottom: '2rem'
              }}>
                {selectedConcept.explanation.split('\n\n').map((section, idx) => {
                  if (section.startsWith('**') && section.includes(':**')) {
                    const headerMatch = section.match(/\*\*(.*?):\*\*/)
                    if (headerMatch) {
                      const header = headerMatch[1]
                      const content = section.substring(headerMatch[0].length).trim()

                      return (
                        <div key={idx} style={{ marginBottom: '1.5rem' }}>
                          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#646464', marginBottom: '0.75rem' }}>
                            {header}
                          </h3>
                          <div style={{ paddingLeft: '1.25rem', color: '#4b5563', fontSize: '0.95rem', lineHeight: '1.8' }}>
                            {content.split('\n').map((line, lineIdx) => {
                              if (line.trim().startsWith('•')) {
                                return (
                                  <div key={lineIdx} style={{ display: 'flex', marginBottom: '0.5rem' }}>
                                    <span style={{ color: '#646464', marginRight: '0.75rem' }}>•</span>
                                    <span>{line.trim().substring(1).trim()}</span>
                                  </div>
                                )
                              }
                              return line.trim() ? <div key={lineIdx} style={{ marginBottom: '0.5rem' }}>{line}</div> : null
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
                        <div key={idx} style={{ backgroundColor: '#1e293b', borderRadius: '12px', overflow: 'hidden', border: '2px solid #334155' }}>
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
                              alignItems: 'center'
                            }}
                          >
                            <span>💻 {section.title}</span>
                            <span style={{ fontSize: '1.2rem' }}>{isExpanded ? '▼' : '▶'}</span>
                          </button>

                          {isExpanded && (
                            <div style={{ padding: 0 }}>
                              <SyntaxHighlighter code={section.code} />
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ) : null
              })()}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PythonAdvanced
