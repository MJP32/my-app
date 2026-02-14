import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

function PythonMapFunctions({ onBack, breadcrumb }) {
  const [selectedConcept, setSelectedConcept] = useState(null)

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
      name: 'map() Function',
      icon: '🗺️',
      explanation: `**Core Concept:**
• map(function, iterable, ...) applies a function to every item of an iterable
• Returns a map object (iterator) — lazy evaluation
• Can accept multiple iterables with multi-argument function
• Equivalent to [f(x) for x in iterable] but more functional

**Signature:**
• map(func, iterable) → map object
• map(func, iter1, iter2, ...) → map object (parallel mapping)

**Key Points:**
• Returns iterator — use list() to materialize
• Stops at shortest iterable when multiple are given
• More memory-efficient than list comprehensions for large datasets
• func can be lambda, named function, or built-in

**Common Patterns:**
• Type conversion: map(int, ["1","2","3"])
• String operations: map(str.upper, words)
• Math transforms: map(lambda x: x**2, nums)
• Parallel ops: map(operator.add, list1, list2)`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Basic map() Usage
# ═══════════════════════════════════════════════════════════════
# Apply function to each element
nums = [1, 2, 3, 4, 5]

# With lambda
squared = list(map(lambda x: x ** 2, nums))
print(squared)   # [1, 4, 9, 16, 25]

# With named function
def double(x):
    return x * 2

doubled = list(map(double, nums))
print(doubled)   # [2, 4, 6, 8, 10]

# With built-in function
words = ["hello", "world"]
upper = list(map(str.upper, words))
print(upper)     # ['HELLO', 'WORLD']

# ═══════════════════════════════════════════════════════════════
# ✦ Type Conversion with map()
# ═══════════════════════════════════════════════════════════════
# Convert strings to integers
str_nums = ["10", "20", "30", "40"]
int_nums = list(map(int, str_nums))
print(int_nums)  # [10, 20, 30, 40]

# Convert to floats
floats = list(map(float, ["1.5", "2.7", "3.14"]))
print(floats)    # [1.5, 2.7, 3.14]

# Parse input line: "3 5 7 9"
values = list(map(int, "3 5 7 9".split()))
print(values)    # [3, 5, 7, 9]

# ═══════════════════════════════════════════════════════════════
# ✦ Multiple Iterables
# ═══════════════════════════════════════════════════════════════
a = [1, 2, 3]
b = [10, 20, 30]

# Add corresponding elements
sums = list(map(lambda x, y: x + y, a, b))
print(sums)      # [11, 22, 33]

# Multiply pairwise
import operator
products = list(map(operator.mul, a, b))
print(products)  # [10, 40, 90]

# Stops at shortest iterable
short = [1, 2]
long_list = [10, 20, 30]
result = list(map(lambda x, y: x + y, short, long_list))
print(result)    # [11, 22]  (stops at length 2)

# Three iterables
c = [100, 200, 300]
total = list(map(lambda x, y, z: x + y + z, a, b, c))
print(total)     # [111, 222, 333]

# ═══════════════════════════════════════════════════════════════
# ✦ map() vs List Comprehension
# ═══════════════════════════════════════════════════════════════
nums = [1, 2, 3, 4, 5]

# Equivalent approaches:
r1 = list(map(lambda x: x ** 2, nums))
r2 = [x ** 2 for x in nums]
# Both give [1, 4, 9, 16, 25]

# List comprehension is more Pythonic for simple transforms
# map() is better when you already have a named function
def complex_transform(x):
    return (x ** 2 + x) // 2

r3 = list(map(complex_transform, nums))
r4 = [complex_transform(x) for x in nums]

# map() is lazier — great for large datasets
big_map = map(str, range(1_000_000))  # No memory used yet
first_10 = [next(big_map) for _ in range(10)]`
    },
    {
      name: 'filter() Function',
      icon: '🔍',
      explanation: `**Core Concept:**
• filter(function, iterable) returns items where function returns True
• Returns a filter object (iterator) — lazy evaluation
• If function is None, removes falsy values
• Equivalent to [x for x in iterable if func(x)]

**Signature:**
• filter(func, iterable) → filter object
• filter(None, iterable) → removes falsy values (0, '', None, False, [])

**Key Points:**
• Returns iterator — use list() to materialize
• function must return truthy/falsy value
• Does NOT modify original iterable
• More readable than comprehension for named predicates

**Common Patterns:**
• Remove falsy: filter(None, items)
• Even numbers: filter(lambda x: x%2==0, nums)
• Non-empty strings: filter(str.strip, lines)
• Type filtering: filter(lambda x: isinstance(x, int), mixed)`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Basic filter() Usage
# ═══════════════════════════════════════════════════════════════
nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Filter even numbers
evens = list(filter(lambda x: x % 2 == 0, nums))
print(evens)     # [2, 4, 6, 8, 10]

# Filter positive numbers
mixed = [-3, -1, 0, 2, 5, -4, 8]
positives = list(filter(lambda x: x > 0, mixed))
print(positives) # [2, 5, 8]

# With named predicate
def is_prime(n):
    if n < 2: return False
    return all(n % i != 0 for i in range(2, int(n**0.5) + 1))

primes = list(filter(is_prime, range(20)))
print(primes)    # [2, 3, 5, 7, 11, 13, 17, 19]

# ═══════════════════════════════════════════════════════════════
# ✦ filter(None, ...) — Remove Falsy Values
# ═══════════════════════════════════════════════════════════════
items = [0, 1, '', 'hello', None, True, False, [], [1, 2]]
truthy = list(filter(None, items))
print(truthy)    # [1, 'hello', True, [1, 2]]

# Clean up empty strings
lines = ['hello', '', '  ', 'world', '', 'python']
non_empty = list(filter(str.strip, lines))
print(non_empty) # ['hello', 'world', 'python']

# Remove None values only
data = [1, None, 3, None, 5]
cleaned = list(filter(lambda x: x is not None, data))
print(cleaned)   # [1, 3, 5]

# ═══════════════════════════════════════════════════════════════
# ✦ filter() with Strings and Objects
# ═══════════════════════════════════════════════════════════════
words = ["apple", "banana", "avocado", "cherry", "apricot"]

# Words starting with 'a'
a_words = list(filter(lambda w: w.startswith('a'), words))
print(a_words)   # ['apple', 'avocado', 'apricot']

# Filter dicts
people = [
    {'name': 'Alice', 'age': 30},
    {'name': 'Bob', 'age': 17},
    {'name': 'Charlie', 'age': 25},
    {'name': 'Diana', 'age': 15}
]
adults = list(filter(lambda p: p['age'] >= 18, people))
print(adults)
# [{'name': 'Alice', 'age': 30}, {'name': 'Charlie', 'age': 25}]

# ═══════════════════════════════════════════════════════════════
# ✦ filter() vs List Comprehension
# ═══════════════════════════════════════════════════════════════
nums = range(20)

# Equivalent
r1 = list(filter(lambda x: x % 3 == 0, nums))
r2 = [x for x in nums if x % 3 == 0]
# Both: [0, 3, 6, 9, 12, 15, 18]

# Comprehension is more Pythonic for simple conditions
# filter() better when you have a named predicate function
import keyword
identifiers = ['for', 'count', 'while', 'name', 'class']
non_keywords = list(filter(lambda s: not keyword.iskeyword(s), identifiers))
print(non_keywords)  # ['count', 'name']`
    },
    {
      name: 'reduce() Function',
      icon: '🔄',
      explanation: `**Core Concept:**
• reduce(function, iterable[, initializer]) cumulatively applies function
• Reduces iterable to a single value (fold operation)
• Lives in functools module (not a built-in)
• function takes two arguments: accumulator and current item

**How It Works:**
• Step 1: acc = initial (or first element)
• Step 2: acc = func(acc, item2)
• Step 3: acc = func(acc, item3)
• ... continues until iterable is exhausted

**Common Patterns:**
• Sum: reduce(operator.add, nums)
• Product: reduce(operator.mul, nums)
• Flatten: reduce(lambda a, b: a + b, nested_lists)
• Max: reduce(lambda a, b: a if a > b else b, nums)

**Warning:**
• Can be hard to read — prefer sum(), max(), min() for simple cases
• Use initial value to avoid TypeError on empty iterables`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Basic reduce() Usage
# ═══════════════════════════════════════════════════════════════
from functools import reduce

nums = [1, 2, 3, 4, 5]

# Sum all elements
total = reduce(lambda acc, x: acc + x, nums)
print(total)     # 15  (((1+2)+3)+4)+5

# Product of all elements
product = reduce(lambda acc, x: acc * x, nums)
print(product)   # 120  (((1*2)*3)*4)*5

# With initial value
total_plus_100 = reduce(lambda acc, x: acc + x, nums, 100)
print(total_plus_100)  # 115  (100 + 1+2+3+4+5)

# Safe for empty iterables with initial
empty_sum = reduce(lambda acc, x: acc + x, [], 0)
print(empty_sum)  # 0

# ═══════════════════════════════════════════════════════════════
# ✦ Common reduce() Patterns
# ═══════════════════════════════════════════════════════════════
import operator

nums = [3, 1, 4, 1, 5, 9, 2, 6]

# Using operator module
total = reduce(operator.add, nums)       # 31
product = reduce(operator.mul, nums)     # 6480

# Find max (prefer max() built-in instead)
maximum = reduce(lambda a, b: a if a > b else b, nums)
print(maximum)   # 9

# Flatten nested lists
nested = [[1, 2], [3, 4], [5, 6]]
flat = reduce(lambda acc, lst: acc + lst, nested, [])
print(flat)      # [1, 2, 3, 4, 5, 6]

# Build a string
words = ['Python', 'is', 'awesome']
sentence = reduce(lambda acc, w: f"{acc} {w}", words)
print(sentence)  # 'Python is awesome'

# ═══════════════════════════════════════════════════════════════
# ✦ reduce() with Complex Objects
# ═══════════════════════════════════════════════════════════════
# Merge dictionaries
dicts = [{'a': 1}, {'b': 2}, {'c': 3}]
merged = reduce(lambda acc, d: {**acc, **d}, dicts, {})
print(merged)    # {'a': 1, 'b': 2, 'c': 3}

# Count occurrences
items = ['a', 'b', 'a', 'c', 'b', 'a']
counts = reduce(
    lambda acc, x: {**acc, x: acc.get(x, 0) + 1},
    items,
    {}
)
print(counts)    # {'a': 3, 'b': 2, 'c': 1}

# Pipeline of transformations
transforms = [
    lambda x: x * 2,
    lambda x: x + 10,
    lambda x: x ** 2
]
result = reduce(lambda val, fn: fn(val), transforms, 5)
print(result)    # ((5*2)+10)**2 = 400

# ═══════════════════════════════════════════════════════════════
# ✦ When to Use reduce() vs Built-ins
# ═══════════════════════════════════════════════════════════════
nums = [1, 2, 3, 4, 5]

# PREFER built-ins when available:
print(sum(nums))         # 15  (not reduce)
print(max(nums))         # 5   (not reduce)
print(min(nums))         # 1   (not reduce)

# USE reduce for custom accumulation:
# - Merging dicts
# - Complex aggregation
# - Function composition
# - When no built-in exists for your operation`
    },
    {
      name: 'zip() Function',
      icon: '🤐',
      explanation: `**Core Concept:**
• zip(*iterables) combines multiple iterables element-wise
• Returns an iterator of tuples
• Stops at the shortest iterable
• Use itertools.zip_longest() for padding

**Signature:**
• zip(iter1, iter2, ...) → zip object
• zip(*iterables, strict=True) → raises ValueError if lengths differ (3.10+)

**Key Points:**
• Lazy evaluation — returns iterator
• Great for parallel iteration
• Transpose with zip(*matrix)
• Create dicts: dict(zip(keys, values))

**Common Patterns:**
• Parallel loop: for a, b in zip(list1, list2)
• Dict creation: dict(zip(keys, values))
• Transpose: list(zip(*matrix))
• Unzip: keys, vals = zip(*pairs)`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Basic zip() Usage
# ═══════════════════════════════════════════════════════════════
names = ['Alice', 'Bob', 'Charlie']
ages = [30, 25, 35]
cities = ['NYC', 'LA', 'Chicago']

# Combine two lists
pairs = list(zip(names, ages))
print(pairs)
# [('Alice', 30), ('Bob', 25), ('Charlie', 35)]

# Combine three lists
triples = list(zip(names, ages, cities))
print(triples)
# [('Alice', 30, 'NYC'), ('Bob', 25, 'LA'), ('Charlie', 35, 'Chicago')]

# Parallel iteration
for name, age, city in zip(names, ages, cities):
    print(f"{name} is {age}, lives in {city}")

# ═══════════════════════════════════════════════════════════════
# ✦ zip() for Dict Creation
# ═══════════════════════════════════════════════════════════════
keys = ['name', 'age', 'city']
values = ['Alice', 30, 'NYC']

# Create dict from parallel lists
person = dict(zip(keys, values))
print(person)    # {'name': 'Alice', 'age': 30, 'city': 'NYC'}

# Swap keys and values
original = {'a': 1, 'b': 2, 'c': 3}
swapped = dict(zip(original.values(), original.keys()))
print(swapped)   # {1: 'a', 2: 'b', 3: 'c'}

# ═══════════════════════════════════════════════════════════════
# ✦ Unzip and Transpose
# ═══════════════════════════════════════════════════════════════
# "Unzip" with zip(*)
pairs = [('Alice', 30), ('Bob', 25), ('Charlie', 35)]
names, ages = zip(*pairs)
print(names)     # ('Alice', 'Bob', 'Charlie')
print(ages)      # (30, 25, 35)

# Transpose a matrix
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
transposed = [list(row) for row in zip(*matrix)]
print(transposed)
# [[1, 4, 7], [2, 5, 8], [3, 6, 9]]

# ═══════════════════════════════════════════════════════════════
# ✦ zip_longest and strict Mode
# ═══════════════════════════════════════════════════════════════
from itertools import zip_longest

a = [1, 2, 3]
b = [10, 20]

# zip stops at shortest
print(list(zip(a, b)))           # [(1, 10), (2, 20)]

# zip_longest pads with fillvalue
print(list(zip_longest(a, b, fillvalue=0)))
# [(1, 10), (2, 20), (3, 0)]

# strict=True raises error on length mismatch (Python 3.10+)
# list(zip(a, b, strict=True))  # ValueError!

# Practical: match headers to values
headers = ['Name', 'Age', 'City', 'Email']
row = ['Alice', 30, 'NYC']
record = dict(zip_longest(headers, row, fillvalue='N/A'))
print(record)
# {'Name': 'Alice', 'Age': 30, 'City': 'NYC', 'Email': 'N/A'}`
    },
    {
      name: 'enumerate() Function',
      icon: '🔢',
      explanation: `**Core Concept:**
• enumerate(iterable, start=0) adds a counter to an iterable
• Returns an iterator of (index, element) tuples
• Replaces the pattern of using range(len(list))
• Essential for Python loops needing both index and value

**Signature:**
• enumerate(iterable, start=0) → enumerate object

**Key Points:**
• Default start index is 0
• Can customize start index with start parameter
• Returns lazy iterator
• Unpacking: for i, val in enumerate(list)

**Common Patterns:**
• Index tracking: for i, item in enumerate(items)
• 1-based numbering: enumerate(items, 1)
• Build index map: {v: i for i, v in enumerate(items)}
• Find positions: [i for i, x in enumerate(items) if x == target]`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Basic enumerate() Usage
# ═══════════════════════════════════════════════════════════════
fruits = ['apple', 'banana', 'cherry', 'date']

# Basic enumeration (index starts at 0)
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")
# 0: apple, 1: banana, 2: cherry, 3: date

# Custom start index
for i, fruit in enumerate(fruits, 1):
    print(f"{i}. {fruit}")
# 1. apple, 2. banana, 3. cherry, 4. date

# Convert to list of tuples
indexed = list(enumerate(fruits))
print(indexed)
# [(0, 'apple'), (1, 'banana'), (2, 'cherry'), (3, 'date')]

# ═══════════════════════════════════════════════════════════════
# ✦ enumerate() vs range(len())
# ═══════════════════════════════════════════════════════════════
items = ['a', 'b', 'c', 'd']

# BAD: using range(len())
for i in range(len(items)):
    print(f"{i}: {items[i]}")

# GOOD: using enumerate
for i, item in enumerate(items):
    print(f"{i}: {item}")

# enumerate is cleaner, more Pythonic, and less error-prone

# ═══════════════════════════════════════════════════════════════
# ✦ Building Index Maps
# ═══════════════════════════════════════════════════════════════
# Value-to-index mapping (essential for LeetCode!)
nums = [10, 20, 30, 40, 50]
index_map = {val: idx for idx, val in enumerate(nums)}
print(index_map)  # {10: 0, 20: 1, 30: 2, 40: 3, 50: 4}

# Find all positions of a value
text = "hello world hello python hello"
words = text.split()
hello_positions = [i for i, w in enumerate(words) if w == 'hello']
print(hello_positions)  # [0, 2, 4]

# Two Sum pattern using enumerate
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

print(two_sum([2, 7, 11, 15], 9))  # [0, 1]

# ═══════════════════════════════════════════════════════════════
# ✦ enumerate() with Other Functions
# ═══════════════════════════════════════════════════════════════
scores = [85, 92, 78, 95, 88]

# Find index of max value
max_idx, max_val = max(enumerate(scores), key=lambda x: x[1])
print(f"Highest score: {max_val} at index {max_idx}")
# Highest score: 95 at index 3

# Enumerate with zip
names = ['Alice', 'Bob', 'Charlie']
scores = [95, 87, 92]
for rank, (name, score) in enumerate(zip(names, scores), 1):
    print(f"#{rank}: {name} — {score}")

# Enumerate a string
word = "Python"
for i, char in enumerate(word):
    print(f"Position {i}: '{char}'")`
    },
    {
      name: 'Chaining & Pipelines',
      icon: '⛓️',
      explanation: `**Core Concept:**
• Combine map(), filter(), reduce() in functional pipelines
• Each function's output feeds into the next
• Lazy evaluation means intermediate results aren't materialized
• Pattern: filter → map → reduce (select, transform, aggregate)

**Pipeline Pattern:**
• Step 1: filter() — select relevant items
• Step 2: map() — transform selected items
• Step 3: reduce() — aggregate results

**Key Points:**
• Chaining is memory-efficient (lazy iterators)
• Read right-to-left: reduce(map(filter(...)))
• Consider readability — sometimes a for loop is clearer
• Generator expressions offer an alternative pipe syntax

**Also Useful:**
• any(map(func, iter)) — test if any satisfy condition
• all(map(func, iter)) — test if all satisfy condition
• sorted(filter(...)) — filter then sort
• sum(map(...)) — transform then sum`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ filter → map → reduce Pipeline
# ═══════════════════════════════════════════════════════════════
from functools import reduce

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Goal: sum of squares of even numbers
# Step 1: filter evens → [2, 4, 6, 8, 10]
# Step 2: map to squares → [4, 16, 36, 64, 100]
# Step 3: reduce to sum → 220

result = reduce(
    lambda acc, x: acc + x,
    map(lambda x: x ** 2,
        filter(lambda x: x % 2 == 0, numbers)),
    0
)
print(result)    # 220

# Same with comprehension (often more readable):
result2 = sum(x ** 2 for x in numbers if x % 2 == 0)
print(result2)   # 220

# ═══════════════════════════════════════════════════════════════
# ✦ Data Processing Pipeline
# ═══════════════════════════════════════════════════════════════
orders = [
    {'product': 'Laptop', 'price': 999, 'qty': 2, 'status': 'shipped'},
    {'product': 'Mouse', 'price': 29, 'qty': 5, 'status': 'pending'},
    {'product': 'Monitor', 'price': 449, 'qty': 1, 'status': 'shipped'},
    {'product': 'Keyboard', 'price': 79, 'qty': 3, 'status': 'cancelled'},
    {'product': 'Webcam', 'price': 69, 'qty': 2, 'status': 'shipped'},
]

# Total revenue from shipped orders
shipped_revenue = sum(
    map(lambda o: o['price'] * o['qty'],
        filter(lambda o: o['status'] == 'shipped', orders))
)
print(f"Shipped revenue: \${shipped_revenue}")
# Shipped revenue: $2585

# Get shipped product names, sorted
shipped_products = sorted(
    map(lambda o: o['product'],
        filter(lambda o: o['status'] == 'shipped', orders))
)
print(shipped_products)  # ['Laptop', 'Monitor', 'Webcam']

# ═══════════════════════════════════════════════════════════════
# ✦ any() and all() with map/filter
# ═══════════════════════════════════════════════════════════════
nums = [2, 4, 6, 8, 10]

# Check if all are even
print(all(map(lambda x: x % 2 == 0, nums)))  # True

# Check if any are > 7
print(any(map(lambda x: x > 7, nums)))  # True

# Validate data
emails = ['a@b.com', 'invalid', 'c@d.org', '']
all_valid = all(map(lambda e: '@' in e and e, emails))
print(all_valid)  # False

# Find first match (use next with filter)
first_gt_5 = next(filter(lambda x: x > 5, nums), None)
print(first_gt_5)  # 6

# ═══════════════════════════════════════════════════════════════
# ✦ Real-World Pipeline Examples
# ═══════════════════════════════════════════════════════════════
# Process log lines
logs = [
    "2024-01-15 ERROR: Connection timeout",
    "2024-01-15 INFO: Request processed",
    "2024-01-15 ERROR: Database unavailable",
    "2024-01-15 INFO: Health check OK",
    "2024-01-15 WARN: High memory usage",
]

# Extract error messages
errors = list(
    map(lambda line: line.split('ERROR: ')[1],
        filter(lambda line: 'ERROR' in line, logs))
)
print(errors)    # ['Connection timeout', 'Database unavailable']

# Word frequency pipeline
text = "the quick brown fox jumps over the lazy brown dog the fox"
word_freq = reduce(
    lambda acc, w: {**acc, w: acc.get(w, 0) + 1},
    text.split(),
    {}
)
# Sort by frequency
top_words = sorted(word_freq.items(), key=lambda x: -x[1])[:3]
print(top_words)  # [('the', 3), ('brown', 2), ('fox', 2)]

# Matrix operations with map + zip
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
col_sums = list(map(sum, zip(*matrix)))
print(col_sums)  # [12, 15, 18]

row_maxes = list(map(max, matrix))
print(row_maxes) # [3, 6, 9]`
    }
  ]

  const activeBreadcrumb = selectedConcept !== null ? {
    onMainMenu: breadcrumb?.onMainMenu,
    section: breadcrumb?.section,
    category: breadcrumb?.category,
    subcategory: {
      name: breadcrumb?.topic,
      onClick: () => setSelectedConcept(null)
    },
    topic: concepts[selectedConcept]?.name,
    colors: breadcrumb?.colors
  } : breadcrumb

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1800px',
      margin: '0 auto',
      background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)',
      minHeight: '100vh'
    }}>
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        alignItems: 'center'
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
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
        >
          ← Back to Python
        </button>
        <div>
          <h1 style={{
            fontSize: '2.25rem',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            🗺️ Map, Filter, Reduce & More
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
        primaryColor={'#3b82f6'}
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
              border: '2px solid #3b82f6',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#60a5fa'
              e.currentTarget.style.transform = 'translateY(-0.5rem)'
              e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(59, 130, 246, 0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#3b82f6'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>
              {concept.icon}
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '0.75rem', color: '#93c5fd' }}>
              {concept.name}
            </h3>
            <p style={{ color: '#d1d5db', textAlign: 'left', fontSize: '0.875rem' }}>
              Click to explore {concept.name.toLowerCase()}
            </p>
          </div>
        ))}
      </div>

      {selectedConcept !== null && (
        <div style={{
          position: 'fixed', inset: '0', background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1rem', zIndex: '50', overflowY: 'auto'
        }}>
          <div style={{
            background: 'linear-gradient(to bottom right, #111827, #1f2937)',
            borderRadius: '0.75rem', width: '95vw', maxWidth: '1400px', height: '90vh',
            overflowY: 'auto', border: '2px solid #3b82f6',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            <div style={{
              position: 'sticky', top: '0',
              background: 'linear-gradient(to right, #2563eb, #7c3aed)',
              padding: '1.5rem', borderTopLeftRadius: '0.75rem',
              borderTopRightRadius: '0.75rem', borderBottom: '2px solid #60a5fa', zIndex: '10'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '3rem' }}>{concepts[selectedConcept].icon}</span>
                  <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'white' }}>
                    {concepts[selectedConcept].name}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedConcept(null)}
                  style={{
                    background: '#dc2626', color: 'white', padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem', border: 'none', cursor: 'pointer',
                    fontWeight: '500', fontSize: '1rem', transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#b91c1c'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#dc2626'}
                >
                  Close
                </button>
              </div>
            </div>

            <div style={{ padding: '2rem' }}>
              <div style={{
                background: '#1f2937', borderRadius: '0.5rem', padding: '1.5rem',
                marginBottom: '1.5rem', border: '1px solid #3b82f6'
              }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#93c5fd' }}>Overview</h3>
                <div style={{ whiteSpace: 'pre-line', color: '#d1d5db', lineHeight: '1.8' }}>
                  {concepts[selectedConcept].explanation.split('\n').map((line, i) => {
                    if (line.startsWith('**') && line.endsWith('**')) {
                      const text = line.slice(2, -2)
                      return <div key={i} style={{ fontWeight: '700', color: '#93c5fd', marginTop: i > 0 ? '1rem' : 0, marginBottom: '0.5rem' }}>{text}</div>
                    }
                    if (line.startsWith('•')) {
                      return <div key={i} style={{ marginLeft: '1.5rem', marginBottom: '0.25rem' }}>{line}</div>
                    }
                    return <div key={i} style={{ marginBottom: '0.5rem' }}>{line}</div>
                  })}
                </div>
              </div>

              <div style={{ background: '#1f2937', borderRadius: '0.5rem', padding: '1.5rem', border: '1px solid #3b82f6' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#93c5fd' }}>Code Examples</h3>
                {parseCodeSections(concepts[selectedConcept].codeExample).map((section, index) => (
                  <div key={index} style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#a78bfa', marginBottom: '0.5rem', borderBottom: '1px solid #374151', paddingBottom: '0.5rem' }}>
                      {section.title}
                    </h4>
                    <SyntaxHighlighter
                      language="python"
                      style={vscDarkPlus}
                      customStyle={{ borderRadius: '0.5rem', fontSize: '0.875rem', padding: '1.25rem', margin: 0, backgroundColor: '#0d1117' }}
                    >
                      {section.code.trim()}
                    </SyntaxHighlighter>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PythonMapFunctions
