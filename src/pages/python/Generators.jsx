import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

function Generators({ onBack, breadcrumb }) {
  const [selectedConcept, setSelectedConcept] = useState(null)

  const activeBreadcrumb = selectedConcept ? {
    onMainMenu: breadcrumb?.onMainMenu,
    section: breadcrumb.section,
    category: breadcrumb.category,
    subcategory: {
      name: breadcrumb.topic,
      onClick: () => setSelectedConcept(null)
    },
    topic: selectedConcept.name,
    colors: breadcrumb.colors
  } : breadcrumb

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
      name: 'Iterator Protocol',
      icon: '🔄',
      explanation: `**What Is an Iterator?**
• An object that produces values one at a time
• Implements __iter__() and __next__()
• __iter__() returns the iterator object itself
• __next__() returns the next value or raises StopIteration

**What Is an Iterable?**
• Any object that can return an iterator
• Implements __iter__() which returns an iterator
• Lists, tuples, strings, dicts, sets, files are all iterable
• Iterables are NOT iterators (but iterators are iterable)

**The Protocol:**
• iter(obj) calls obj.__iter__() → returns iterator
• next(iterator) calls iterator.__next__() → returns next value
• StopIteration exception signals the end
• for loops handle this protocol automatically

**Key Difference:**
• Iterable: can be looped over (has __iter__)
• Iterator: remembers position, produces next value (has __next__)
• A list is iterable but not an iterator
• iter(list) returns an iterator over the list`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ How for loops actually work
# ═══════════════════════════════════════════════════════════════
# This for loop:
colors = ["red", "green", "blue"]
for color in colors:
    print(color)

# Is equivalent to this:
iterator = iter(colors)       # Get iterator from iterable
while True:
    try:
        color = next(iterator)  # Get next value
        print(color)
    except StopIteration:       # No more values
        break

# Manual iteration
nums = [10, 20, 30]
it = iter(nums)
print(next(it))   # 10
print(next(it))   # 20
print(next(it))   # 30
# print(next(it))  # StopIteration!

# next() with default value (avoids exception)
it = iter([1, 2])
print(next(it, "done"))  # 1
print(next(it, "done"))  # 2
print(next(it, "done"))  # "done" (no StopIteration)


# ═══════════════════════════════════════════════════════════════
# ✦ Iterable vs Iterator
# ═══════════════════════════════════════════════════════════════
my_list = [1, 2, 3]

# A list is iterable, NOT an iterator
print(hasattr(my_list, '__iter__'))   # True  (iterable)
print(hasattr(my_list, '__next__'))   # False (not an iterator)

# iter() creates an iterator FROM an iterable
my_iter = iter(my_list)
print(hasattr(my_iter, '__iter__'))   # True  (iterators are iterable)
print(hasattr(my_iter, '__next__'))   # True  (it's an iterator)

# Iterables can create MULTIPLE independent iterators
it1 = iter(my_list)
it2 = iter(my_list)
print(next(it1))  # 1
print(next(it1))  # 2
print(next(it2))  # 1 ← independent!

# Iterators are EXHAUSTED after one pass
my_iter = iter([1, 2, 3])
print(list(my_iter))  # [1, 2, 3]
print(list(my_iter))  # [] ← exhausted!


# ═══════════════════════════════════════════════════════════════
# ✦ Building a custom iterator class
# ═══════════════════════════════════════════════════════════════
class Countdown:
    """Iterator that counts down from n to 1"""
    def __init__(self, n):
        self.n = n

    def __iter__(self):
        return self  # iterator returns itself

    def __next__(self):
        if self.n <= 0:
            raise StopIteration
        value = self.n
        self.n -= 1
        return value

for num in Countdown(5):
    print(num, end=" ")  # 5 4 3 2 1
print()

# Works with all iteration tools
print(list(Countdown(3)))       # [3, 2, 1]
print(sum(Countdown(10)))       # 55
print(max(Countdown(5)))        # 5


# ═══════════════════════════════════════════════════════════════
# ✦ Custom iterable (reusable) vs iterator (one-shot)
# ═══════════════════════════════════════════════════════════════
class Range:
    """Reusable iterable — creates fresh iterator each time"""
    def __init__(self, start, stop):
        self.start = start
        self.stop = stop

    def __iter__(self):
        # Return a NEW iterator each time
        return RangeIterator(self.start, self.stop)

class RangeIterator:
    def __init__(self, start, stop):
        self.current = start
        self.stop = stop

    def __iter__(self):
        return self

    def __next__(self):
        if self.current >= self.stop:
            raise StopIteration
        value = self.current
        self.current += 1
        return value

r = Range(1, 4)
print(list(r))  # [1, 2, 3]
print(list(r))  # [1, 2, 3] ← works again! (reusable iterable)`
    },
    {
      name: 'Generator Functions',
      icon: '⚡',
      explanation: `**What Is a Generator?**
• A function that uses yield instead of return
• Returns a generator object (a special iterator)
• State is suspended between yield calls
• Much easier to write than iterator classes

**How yield Works:**
• yield value — pauses function, returns value to caller
• Function state (locals, position) is preserved
• Calling next() resumes from where it left off
• Function exit or return raises StopIteration

**Why Generators?**
• Lazy evaluation — compute values on demand
• Memory efficient — don't store entire sequence
• Cleaner code than manual __iter__/__next__
• Natural for infinite or very large sequences

**Generator vs Regular Function:**
• Regular: runs to completion, returns result
• Generator: pauses at each yield, resumes on next()
• Regular: all results computed upfront
• Generator: one result at a time (lazy)`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Your first generator function
# ═══════════════════════════════════════════════════════════════
def count_up_to(n):
    """Generator that yields 1, 2, ..., n"""
    i = 1
    while i <= n:
        yield i       # pause here, return i
        i += 1        # resume here on next call

# Calling a generator function returns a generator object
gen = count_up_to(5)
print(type(gen))  # {'<'}class 'generator'>

# Use next() to get values one at a time
print(next(gen))  # 1
print(next(gen))  # 2
print(next(gen))  # 3

# Or use in a for loop (handles StopIteration automatically)
for num in count_up_to(5):
    print(num, end=" ")  # 1 2 3 4 5
print()

# Convert to list
print(list(count_up_to(5)))  # [1, 2, 3, 4, 5]


# ═══════════════════════════════════════════════════════════════
# ✦ Generator state is preserved between yields
# ═══════════════════════════════════════════════════════════════
def fibonacci():
    """Infinite Fibonacci generator"""
    a, b = 0, 1
    while True:      # infinite loop is fine with generators!
        yield a
        a, b = b, a + b

fib = fibonacci()
# Get first 10 Fibonacci numbers
for _ in range(10):
    print(next(fib), end=" ")  # 0 1 1 2 3 5 8 13 21 34
print()

# Take first n from any generator
from itertools import islice
print(list(islice(fibonacci(), 15)))
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377]


# ═══════════════════════════════════════════════════════════════
# ✦ Multiple yields and control flow
# ═══════════════════════════════════════════════════════════════
def traffic_light():
    """Cycle through traffic light colors"""
    while True:
        yield "GREEN"
        yield "YELLOW"
        yield "RED"

light = traffic_light()
for _ in range(7):
    print(next(light), end=" ")
# GREEN YELLOW RED GREEN YELLOW RED GREEN
print()

# Generator with conditional yields
def even_squares(limit):
    """Yield squares of even numbers up to limit"""
    for n in range(limit):
        if n % 2 == 0:
            yield n ** 2

print(list(even_squares(10)))  # [0, 4, 16, 36, 64]

# return in a generator triggers StopIteration
def limited():
    yield 1
    yield 2
    return  # or just let function end
    yield 3  # never reached

print(list(limited()))  # [1, 2]


# ═══════════════════════════════════════════════════════════════
# ✦ Memory efficiency — generator vs list
# ═══════════════════════════════════════════════════════════════
import sys

# List: stores ALL values in memory
big_list = [x ** 2 for x in range(1000000)]
print(f"List size: {sys.getsizeof(big_list):,} bytes")  # ~8MB

# Generator: stores only the formula, computes on demand
big_gen = (x ** 2 for x in range(1000000))
print(f"Generator size: {sys.getsizeof(big_gen)} bytes")  # ~200 bytes!

# Both produce the same results
print(sum(x ** 2 for x in range(1000000)))  # uses generator — O(1) memory

# Reading large files line by line (generator pattern)
def read_large_file(filepath):
    """Process file without loading it all into memory"""
    with open(filepath) as f:
        for line in f:       # file objects are iterators!
            yield line.strip()

# for line in read_large_file("huge.log"):
#     process(line)  # only one line in memory at a time`
    },
    {
      name: 'Generator Expressions',
      icon: '📝',
      explanation: `**Generator Expressions:**
• Like list comprehensions but with () instead of []
• Returns a generator object (lazy, memory efficient)
• Syntax: (expression for item in iterable if condition)
• Can be passed directly to functions that accept iterables

**vs List Comprehension:**
• [x*2 for x in range(10)] — creates list (all in memory)
• (x*2 for x in range(10)) — creates generator (lazy)
• Generator: less memory, can't index or len()
• List: more memory, supports indexing and multiple passes

**When to Use Generator Expressions:**
• Passing to sum(), min(), max(), any(), all(), join()
• Processing large datasets
• Chaining transformations
• When you only need one pass through the data

**When to Use List Comprehensions:**
• Need to access by index
• Need to iterate multiple times
• Need len() of the result
• Small datasets where memory isn't a concern`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Generator expression syntax
# ═══════════════════════════════════════════════════════════════
# List comprehension — creates a list
squares_list = [x**2 for x in range(10)]
print(squares_list)       # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
print(type(squares_list)) # {'<'}class 'list'>

# Generator expression — creates a generator
squares_gen = (x**2 for x in range(10))
print(squares_gen)        # {'<'}generator object ...>
print(type(squares_gen))  # {'<'}class 'generator'>
print(list(squares_gen))  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# With filtering
evens = (x for x in range(20) if x % 2 == 0)
print(list(evens))  # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# Nested (flatten)
matrix = [[1, 2], [3, 4], [5, 6]]
flat = (num for row in matrix for num in row)
print(list(flat))  # [1, 2, 3, 4, 5, 6]


# ═══════════════════════════════════════════════════════════════
# ✦ Pass directly to functions (no extra parentheses needed)
# ═══════════════════════════════════════════════════════════════
nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# sum(), min(), max() accept generators directly
print(sum(x**2 for x in nums))          # 385
print(max(x for x in nums if x % 2 == 0))  # 10
print(min(abs(x - 5) for x in nums))    # 0

# any() and all() short-circuit with generators!
data = [2, 4, 6, 7, 8, 10]  # 7 is odd
has_odd = any(x % 2 != 0 for x in data)
print(has_odd)  # True (stops at 7, doesn't check 8, 10)

all_positive = all(x > 0 for x in data)
print(all_positive)  # True

# str.join() with generator
words = ["hello", "world", "python"]
print(", ".join(w.upper() for w in words))  # HELLO, WORLD, PYTHON

# Conditional aggregation
scores = {'Alice': 95, 'Bob': 67, 'Charlie': 82, 'David': 91}
passing_avg = sum(s for s in scores.values() if s >= 70) / \
              sum(1 for s in scores.values() if s >= 70)
print(f"Passing average: {passing_avg:.1f}")  # 89.3


# ═══════════════════════════════════════════════════════════════
# ✦ Chaining generator expressions
# ═══════════════════════════════════════════════════════════════
# Process data through a pipeline — each step is lazy
raw_data = ["  Alice: 95  ", "  Bob: 67  ", "  Charlie: 82  ", ""]

# Step 1: strip whitespace
stripped = (line.strip() for line in raw_data)

# Step 2: filter empty lines
non_empty = (line for line in stripped if line)

# Step 3: parse name and score
parsed = (line.split(": ") for line in non_empty)

# Step 4: extract scores as integers
scores = (int(parts[1]) for parts in parsed)

# Nothing computed yet! All lazy until we consume:
print(sum(scores))  # 244 — entire pipeline runs here

# This is equivalent to (but more memory efficient than):
result = sum(
    int(line.strip().split(": ")[1])
    for line in raw_data
    if line.strip()
)
print(result)  # 244


# ═══════════════════════════════════════════════════════════════
# ✦ Generator expression gotchas
# ═══════════════════════════════════════════════════════════════
# Generators are ONE-SHOT — exhausted after one pass
gen = (x for x in [1, 2, 3])
print(list(gen))  # [1, 2, 3]
print(list(gen))  # [] ← empty! Already consumed

# Can't get length or index
gen = (x**2 for x in range(5))
# len(gen)   # TypeError
# gen[2]     # TypeError

# Late binding gotcha
funcs = [lambda: x for x in range(3)]
print([f() for f in funcs])  # [2, 2, 2] ← all return last x!

# Fix with generator or default argument
funcs = [lambda x=x: x for x in range(3)]
print([f() for f in funcs])  # [0, 1, 2] ← correct!`
    },
    {
      name: 'yield from',
      icon: '🔗',
      explanation: `**yield from — Delegate to Sub-generator:**
• yield from iterable — yields each item from the iterable
• Replaces: for item in iterable: yield item
• Cleaner syntax for generator delegation
• Automatically handles StopIteration

**Why yield from?**
• Flatten nested generators
• Compose generators from sub-generators
• Delegate to another generator transparently
• Propagates send() and throw() to sub-generator

**Recursion with yield from:**
• Perfect for tree traversal
• Recursive generators become natural
• Each recursive call yields its values up the chain

**vs Simple Yield:**
• yield [1,2,3] — yields the list as ONE item
• yield from [1,2,3] — yields 1, then 2, then 3
• yield from gen() — yields each value from gen()`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Basic yield from — delegate to an iterable
# ═══════════════════════════════════════════════════════════════
# Without yield from
def chain_manual(*iterables):
    for it in iterables:
        for item in it:
            yield item

# With yield from — cleaner!
def chain(*iterables):
    for it in iterables:
        yield from it

print(list(chain([1, 2], [3, 4], [5, 6])))
# [1, 2, 3, 4, 5, 6]

print(list(chain("AB", "CD", "EF")))
# ['A', 'B', 'C', 'D', 'E', 'F']

# yield vs yield from
def with_yield():
    yield [1, 2, 3]       # yields the LIST as one item

def with_yield_from():
    yield from [1, 2, 3]  # yields 1, then 2, then 3

print(list(with_yield()))       # [[1, 2, 3]]
print(list(with_yield_from()))  # [1, 2, 3]


# ═══════════════════════════════════════════════════════════════
# ✦ Composing generators with yield from
# ═══════════════════════════════════════════════════════════════
def header():
    yield "=== START ==="
    yield "Processing..."

def body(items):
    for item in items:
        yield f"  Item: {item}"

def footer(count):
    yield f"Total: {count} items"
    yield "=== END ==="

def report(items):
    """Compose multiple generators into one"""
    yield from header()
    yield from body(items)
    yield from footer(len(items))

for line in report(["apple", "banana", "cherry"]):
    print(line)
# === START ===
# Processing...
#   Item: apple
#   Item: banana
#   Item: cherry
# Total: 3 items
# === END ===


# ═══════════════════════════════════════════════════════════════
# ✦ Recursive generators — tree traversal
# ═══════════════════════════════════════════════════════════════
# Binary tree as nested tuples: (value, left, right)
tree = (1,
    (2,
        (4, None, None),
        (5, None, None)),
    (3,
        (6, None, None),
        (7, None, None)))

def inorder(node):
    """In-order traversal using yield from"""
    if node is None:
        return
    value, left, right = node
    yield from inorder(left)    # all left values
    yield value                  # current value
    yield from inorder(right)   # all right values

print(list(inorder(tree)))  # [4, 2, 5, 1, 6, 3, 7]

def preorder(node):
    if node is None:
        return
    value, left, right = node
    yield value
    yield from preorder(left)
    yield from preorder(right)

print(list(preorder(tree)))  # [1, 2, 4, 5, 3, 6, 7]

# Flatten arbitrarily nested lists
def flatten(lst):
    for item in lst:
        if isinstance(item, (list, tuple)):
            yield from flatten(item)
        else:
            yield item

nested = [1, [2, [3, 4]], [5, [6, [7]]]]
print(list(flatten(nested)))  # [1, 2, 3, 4, 5, 6, 7]


# ═══════════════════════════════════════════════════════════════
# ✦ Filesystem walk generator
# ═══════════════════════════════════════════════════════════════
import os

def find_files(directory, extension):
    """Recursively yield all files with given extension"""
    for entry in os.scandir(directory):
        if entry.is_file() and entry.name.endswith(extension):
            yield entry.path
        elif entry.is_dir():
            yield from find_files(entry.path, extension)

# Usage: for f in find_files("./src", ".py"): print(f)`
    },
    {
      name: 'send() & throw()',
      icon: '📨',
      explanation: `**generator.send(value):**
• Sends a value INTO the generator
• The sent value becomes the result of the yield expression
• Must send None on first call (or use next() first)
• Enables two-way communication with generators

**generator.throw(exception):**
• Throws an exception inside the generator at the yield point
• Generator can catch it with try/except
• If not caught, propagates to caller

**generator.close():**
• Throws GeneratorExit inside the generator
• Generator should clean up and stop
• Called automatically when generator is garbage collected

**Coroutine Pattern (pre-async):**
• Generators that accept input via send()
• Used for cooperative multitasking before async/await
• Running average, state machines, pipelines
• Modern Python prefers async/await for coroutines`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ send() — push values into a generator
# ═══════════════════════════════════════════════════════════════
def accumulator():
    """Generator that accumulates sent values"""
    total = 0
    while True:
        value = yield total    # yield current total, receive new value
        if value is not None:
            total += value

acc = accumulator()
next(acc)              # prime the generator (first call must be next() or send(None))
print(acc.send(10))    # 10 (total = 0 + 10)
print(acc.send(20))    # 30 (total = 10 + 20)
print(acc.send(5))     # 35 (total = 30 + 5)

# Running average
def running_average():
    total = 0
    count = 0
    average = None
    while True:
        value = yield average
        if value is not None:
            total += value
            count += 1
            average = total / count

avg = running_average()
next(avg)              # prime
print(avg.send(10))    # 10.0
print(avg.send(20))    # 15.0
print(avg.send(30))    # 20.0
print(avg.send(40))    # 25.0


# ═══════════════════════════════════════════════════════════════
# ✦ throw() — inject exceptions into generator
# ═══════════════════════════════════════════════════════════════
def resilient_counter():
    """Counter that can be reset via exception"""
    count = 0
    while True:
        try:
            yield count
            count += 1
        except ValueError:
            print("  Reset!")
            count = 0

counter = resilient_counter()
print(next(counter))    # 0
print(next(counter))    # 1
print(next(counter))    # 2
counter.throw(ValueError)  # Reset!
print(next(counter))    # 0 (reset)
print(next(counter))    # 1


# ═══════════════════════════════════════════════════════════════
# ✦ close() and cleanup with try/finally
# ═══════════════════════════════════════════════════════════════
def managed_resource():
    """Generator with cleanup logic"""
    print("  Opening resource")
    try:
        while True:
            data = yield
            print(f"  Processing: {data}")
    except GeneratorExit:
        print("  Generator closed — cleaning up")
    finally:
        print("  Resource released")

gen = managed_resource()
next(gen)                  # Opening resource
gen.send("chunk 1")        # Processing: chunk 1
gen.send("chunk 2")        # Processing: chunk 2
gen.close()                # Generator closed — cleaning up
                           # Resource released


# ═══════════════════════════════════════════════════════════════
# ✦ Practical: state machine with send()
# ═══════════════════════════════════════════════════════════════
def traffic_light_sm():
    """State machine: transitions on send()"""
    state = "RED"
    while True:
        action = yield state
        if state == "RED" and action == "next":
            state = "GREEN"
        elif state == "GREEN" and action == "next":
            state = "YELLOW"
        elif state == "YELLOW" and action == "next":
            state = "RED"
        elif action == "emergency":
            state = "RED"

light = traffic_light_sm()
print(next(light))             # RED
print(light.send("next"))      # GREEN
print(light.send("next"))      # YELLOW
print(light.send("next"))      # RED
print(light.send("next"))      # GREEN
print(light.send("emergency")) # RED`
    },
    {
      name: 'Generator Pipelines',
      icon: '🔧',
      explanation: `**Pipeline Pattern:**
• Chain generators together for data processing
• Each stage is a generator that transforms data
• Data flows through stages lazily (on demand)
• Only one item in memory at each stage

**Pipeline Stages:**
• Source: produces raw data (file reader, API poller)
• Transform: map, filter, convert, enrich
• Sink: consume final results (write, aggregate, display)

**Benefits:**
• Memory efficient — process one item at a time
• Composable — mix and match stages
• Testable — each stage is independent
• Readable — clear data flow

**Real-World Uses:**
• Log processing pipelines
• ETL (Extract, Transform, Load) workflows
• Stream processing
• Data cleaning and validation`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Building a processing pipeline
# ═══════════════════════════════════════════════════════════════
# Stage 1: Source — generate raw data
def read_lines(text):
    for line in text.strip().split("\\n"):
        yield line

# Stage 2: Transform — strip whitespace
def strip_lines(lines):
    for line in lines:
        yield line.strip()

# Stage 3: Filter — skip empty lines and comments
def skip_comments(lines):
    for line in lines:
        if line and not line.startswith("#"):
            yield line

# Stage 4: Transform — parse key=value pairs
def parse_config(lines):
    for line in lines:
        if "=" in line:
            key, value = line.split("=", 1)
            yield (key.strip(), value.strip())

# Connect the pipeline
config_text = """
  # Database settings
  host = localhost
  port = 5432

  # App settings
  debug = true
  name = myapp
"""

pipeline = parse_config(skip_comments(strip_lines(read_lines(config_text))))

config = dict(pipeline)  # consume the entire pipeline
print(config)
# {'host': 'localhost', 'port': '5432', 'debug': 'true', 'name': 'myapp'}


# ═══════════════════════════════════════════════════════════════
# ✦ Reusable pipeline utilities
# ═══════════════════════════════════════════════════════════════
def gen_filter(predicate, iterable):
    """Generic filter stage"""
    for item in iterable:
        if predicate(item):
            yield item

def gen_map(func, iterable):
    """Generic map stage"""
    for item in iterable:
        yield func(item)

def gen_take(n, iterable):
    """Take first n items"""
    for i, item in enumerate(iterable):
        if i >= n:
            return
        yield item

def gen_batch(size, iterable):
    """Group items into batches"""
    batch = []
    for item in iterable:
        batch.append(item)
        if len(batch) == size:
            yield batch
            batch = []
    if batch:
        yield batch

# Build pipeline with reusable stages
numbers = range(1, 101)
result = list(
    gen_take(5,
        gen_map(lambda x: x ** 2,
            gen_filter(lambda x: x % 3 == 0, numbers)))
)
print(result)  # [9, 36, 81, 144, 225]

# Batching
data = range(1, 11)
for batch in gen_batch(3, data):
    print(f"  Batch: {batch}")
# Batch: [1, 2, 3]
# Batch: [4, 5, 6]
# Batch: [7, 8, 9]
# Batch: [10]


# ═══════════════════════════════════════════════════════════════
# ✦ Log processing pipeline
# ═══════════════════════════════════════════════════════════════
import re

sample_logs = [
    "2024-01-15 10:30:45 INFO  User login: alice",
    "2024-01-15 10:30:46 ERROR Database timeout",
    "2024-01-15 10:30:47 INFO  Page view: /home",
    "2024-01-15 10:30:48 ERROR Connection refused",
    "2024-01-15 10:30:49 WARN  High memory usage",
    "2024-01-15 10:30:50 ERROR Disk full",
]

def parse_logs(lines):
    pattern = re.compile(r"(\\S+ \\S+) (\\w+)\\s+(.*)")
    for line in lines:
        m = pattern.match(line)
        if m:
            yield {"time": m.group(1), "level": m.group(2), "msg": m.group(3)}

def filter_level(logs, level):
    for log in logs:
        if log["level"] == level:
            yield log

def format_alert(logs):
    for log in logs:
        yield f"ALERT [{log['time']}]: {log['msg']}"

# Pipeline: parse → filter errors → format
alerts = format_alert(filter_level(parse_logs(sample_logs), "ERROR"))

for alert in alerts:
    print(alert)
# ALERT [2024-01-15 10:30:46]: Database timeout
# ALERT [2024-01-15 10:30:48]: Connection refused
# ALERT [2024-01-15 10:30:50]: Disk full


# ═══════════════════════════════════════════════════════════════
# ✦ Tee — split a generator into multiple consumers
# ═══════════════════════════════════════════════════════════════
from itertools import tee

def source():
    for i in range(5):
        yield i * 10

# Create two independent iterators from one generator
gen1, gen2 = tee(source(), 2)

print(list(gen1))  # [0, 10, 20, 30, 40]
print(list(gen2))  # [0, 10, 20, 30, 40] ← independent copy

# Useful: compare current with previous
def pairwise(iterable):
    a, b = tee(iterable)
    next(b, None)  # advance second iterator by one
    return zip(a, b)

data = [10, 20, 15, 30, 25]
for prev, curr in pairwise(data):
    diff = curr - prev
    print(f"  {prev} → {curr} ({\"+\" if diff > 0 else \"\"}{diff})")
# 10 → 20 (+10), 20 → 15 (-5), 15 → 30 (+15), 30 → 25 (-5)`
    }
  ]

  const codeSections = selectedConcept !== null ? parseCodeSections(concepts[selectedConcept].codeExample) : []

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
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <button
              onClick={() => {
                if (selectedConcept !== null) {
                  setSelectedConcept(null)
                } else {
                  onBack()
                }
              }}
              style={{
                background: '#2563eb',
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
                e.currentTarget.style.background = '#1d4ed8'
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#2563eb'
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            >
              ← {selectedConcept !== null ? 'Back to Concepts' : 'Back to Python Topics'}
            </button>
            <h1 style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #34d399, #60a5fa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              🔄 Generators & Iterators
            </h1>
          </div>
        </div>

        <Breadcrumb breadcrumb={activeBreadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

        <CollapsibleSidebar
          items={concepts}
          selectedIndex={selectedConcept !== null ? selectedConcept : -1}
          onSelect={(index) => setSelectedConcept(index)}
          title="Concepts"
          getItemLabel={(item) => item.name}
          getItemIcon={(item) => item.icon}
          primaryColor={'#10b981'}
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {concepts.map((concept, index) => (
            <div
              key={index}
              onClick={() => setSelectedConcept(index)}
              style={{
                background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                padding: '1.5rem',
                borderRadius: '0.75rem',
                border: '2px solid #10b981',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#34d399'
                e.currentTarget.style.transform = 'translateY(-0.5rem)'
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(16, 185, 129, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#10b981'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                {concept.icon}
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '0.75rem',
                color: '#6ee7b7'
              }}>
                {concept.name}
              </h3>
              <p style={{
                color: '#d1d5db',
                textAlign: 'left',
                fontSize: '0.875rem'
              }}>
                Click to explore generator concepts
              </p>
            </div>
          ))}
        </div>

        {selectedConcept !== null && (
          <div style={{
            position: 'fixed',
            inset: '0',
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            zIndex: '50',
            overflowY: 'auto'
          }}>
            <div style={{
              background: 'linear-gradient(to bottom right, #111827, #1f2937)',
              borderRadius: '0.75rem',
              width: '95vw', maxWidth: '1400px', height: '90vh',
              overflowY: 'auto',
              border: '2px solid #10b981',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}>
              <div style={{
                position: 'sticky',
                top: '0',
                background: 'linear-gradient(to right, #059669, #047857)',
                padding: '1.5rem',
                borderTopLeftRadius: '0.75rem',
                borderTopRightRadius: '0.75rem',
                borderBottom: '2px solid #34d399',
                zIndex: '10'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <span style={{ fontSize: '3rem' }}>{concepts[selectedConcept].icon}</span>
                    <h2 style={{
                      fontSize: '1.875rem',
                      fontWeight: 'bold',
                      color: 'white'
                    }}>
                      {concepts[selectedConcept].name}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedConcept(null)}
                    style={{
                      background: '#dc2626',
                      color: 'white',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: '500',
                      fontSize: '1rem',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#b91c1c'
                      e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#dc2626'
                      e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>

              <div style={{ padding: '2rem' }}>
                <div style={{
                  background: '#1f2937',
                  borderRadius: '0.5rem',
                  padding: '1.5rem',
                  marginBottom: '1.5rem',
                  border: '1px solid #10b981'
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: '#6ee7b7'
                  }}>
                    Overview
                  </h3>
                  <div style={{
                    whiteSpace: 'pre-line',
                    color: '#d1d5db',
                    lineHeight: '1.8'
                  }}>
                    {concepts[selectedConcept].explanation.split('\n').map((line, i) => {
                      if (line.startsWith('**') && line.endsWith('**')) {
                        const text = line.slice(2, -2)
                        return <div key={i} style={{ fontWeight: '700', color: '#6ee7b7', marginTop: i > 0 ? '1rem' : 0, marginBottom: '0.5rem' }}>{text}</div>
                      }
                      if (line.startsWith('•')) {
                        return <div key={i} style={{ marginLeft: '1.5rem', marginBottom: '0.25rem' }}>{line}</div>
                      }
                      return <div key={i} style={{ marginBottom: '0.5rem' }}>{line}</div>
                    })}
                  </div>
                </div>

                <div style={{
                  background: '#1f2937',
                  borderRadius: '0.5rem',
                  padding: '1.5rem',
                  border: '1px solid #10b981'
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: '#6ee7b7'
                  }}>
                    Code Examples
                  </h3>

                  {codeSections.length > 0 ? (
                    codeSections.map((section, idx) => (
                      <div key={idx} style={{ marginBottom: '1.5rem' }}>
                        <div
                          style={{
                            width: '100%',
                            padding: '1rem',
                            background: '#059669',
                            color: 'white',
                            borderRadius: '8px 8px 0 0',
                            fontSize: '1rem',
                            fontWeight: '600',
                            textAlign: 'left'
                          }}
                        >
                          {section.title}
                        </div>
                        <div style={{
                          backgroundColor: '#1e293b',
                          borderRadius: '0 0 8px 8px',
                          overflow: 'hidden'
                        }}>
                          <SyntaxHighlighter
                            language="python"
                            style={vscDarkPlus}
                            customStyle={{
                              margin: 0,
                              borderRadius: '0.375rem',
                              fontSize: '0.875rem',
                              background: 'none',
                              backgroundColor: 'transparent',
                              padding: 0
                            }}
                          >
                            {section.code}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{
                      backgroundColor: '#1e293b',
                      borderRadius: '8px',
                      overflow: 'hidden'
                    }}>
                      <SyntaxHighlighter
                        language="python"
                        style={vscDarkPlus}
                        customStyle={{
                          margin: 0,
                          borderRadius: '0.375rem',
                          fontSize: '0.875rem',
                          background: 'none',
                          backgroundColor: 'transparent',
                          padding: 0
                        }}
                      >
                        {concepts[selectedConcept].codeExample}
                      </SyntaxHighlighter>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Generators
