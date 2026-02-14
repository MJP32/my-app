import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

function PythonTuples({ onBack, breadcrumb }) {
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
      name: 'Creation & Immutability',
      icon: '\ud83d\udce6',
      explanation: `**Core Concept:**
\u2022 Tuples are ordered, immutable sequences defined with parentheses or commas
\u2022 Immutability means elements cannot be reassigned after creation
\u2022 Single-element tuples require a trailing comma: (1,) not (1)
\u2022 tuple() constructor converts any iterable into a tuple

**Creation Syntax:**
\u2022 Parenthesized: t = (1, 2, 3)
\u2022 Comma-separated (packing): t = 1, 2, 3
\u2022 Single element: t = (42,) \u2014 comma is required
\u2022 Empty: t = () or t = tuple()
\u2022 From iterable: t = tuple([1, 2, 3])
\u2022 From string: t = tuple("abc") \u2192 ('a', 'b', 'c')

**Immutability Details:**
\u2022 Cannot reassign elements: t[0] = 10 raises TypeError
\u2022 Cannot add or remove elements (no append, pop, etc.)
\u2022 However, if a tuple contains mutable objects (lists, dicts), those inner objects CAN be modified
\u2022 The tuple only guarantees the references are fixed, not the referenced objects

**Why Use Immutable Sequences:**
\u2022 Thread-safe \u2014 no locking needed for read-only data
\u2022 Hashable \u2014 can serve as dict keys and set elements
\u2022 Memory efficient \u2014 ~20-25% less memory than equivalent lists
\u2022 Faster creation \u2014 ~15-20% faster than list creation
\u2022 Signal intent \u2014 communicate that data should not change`,
      codeExample: `# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Creating tuples
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# Standard creation with parentheses
t1 = (1, 2, 3)
print(t1)              # (1, 2, 3)
print(type(t1))        # <class 'tuple'>

# Tuple packing (parentheses are optional)
t2 = 10, 20, 30
print(t2)              # (10, 20, 30)

# From iterables using tuple() constructor
t3 = tuple([1, 2, 3])        # From list
t4 = tuple("hello")           # From string: ('h', 'e', 'l', 'l', 'o')
t5 = tuple(range(5))          # From range: (0, 1, 2, 3, 4)
t6 = tuple({1, 2, 3})         # From set (order may vary)

# Empty tuple
empty = ()
also_empty = tuple()
print(len(empty))      # 0

# Nested tuples
matrix = ((1, 2, 3), (4, 5, 6), (7, 8, 9))
print(matrix[1][2])    # 6


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Single element pitfall
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# WRONG: This is NOT a tuple, just an integer with parentheses
not_a_tuple = (42)
print(type(not_a_tuple))   # <class 'int'>
print(not_a_tuple)         # 42

# CORRECT: Trailing comma makes it a tuple
is_a_tuple = (42,)
print(type(is_a_tuple))    # <class 'tuple'>
print(is_a_tuple)          # (42,)

# The comma is the operator, not the parentheses
also_a_tuple = 42,
print(type(also_a_tuple))  # <class 'tuple'>

# Same with strings
not_tuple_str = ("hello")     # str
tuple_str = ("hello",)        # tuple with one str element
print(type(not_tuple_str))    # <class 'str'>
print(type(tuple_str))        # <class 'tuple'>


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Immutability
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
t = (1, 2, 3)

# Cannot reassign elements
try:
    t[0] = 10
except TypeError as e:
    print(f"Error: {e}")
    # Error: 'tuple' object does not support item assignment

# Cannot delete elements
try:
    del t[0]
except TypeError as e:
    print(f"Error: {e}")
    # Error: 'tuple' object doesn't support item deletion

# No append, insert, remove, pop, extend, clear methods
# Tuples only have count() and index()

# You CAN delete the entire tuple variable
t = (1, 2, 3)
del t  # removes the variable binding, not the data


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Mutable contents
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# Tuple holds references; the referenced objects can still change
t = ([1, 2], [3, 4], {"key": "value"})

# Mutating a list inside the tuple \u2014 this is ALLOWED
t[0].append(99)
print(t)  # ([1, 2, 99], [3, 4], {'key': 'value'})

# Mutating a dict inside the tuple \u2014 also ALLOWED
t[2]["new_key"] = "new_value"
print(t)  # ([1, 2, 99], [3, 4], {'key': 'value', 'new_key': 'new_value'})

# But reassigning the reference is NOT allowed
try:
    t[0] = [10, 20]      # TypeError!
except TypeError as e:
    print(f"Error: {e}")

# CAUTION: Tuples with mutable contents are NOT hashable
try:
    hash(([1, 2], [3, 4]))
except TypeError as e:
    print(f"Error: {e}")
    # TypeError: unhashable type: 'list'

# Only tuples of all-immutable contents are hashable
print(hash((1, 2, "hello")))   # Works fine
print(hash((1, (2, 3))))       # Nested immutable tuples OK`
    },
    {
      name: 'Unpacking & Packing',
      icon: '\ud83d\udce4',
      explanation: `**Core Concept:**
\u2022 Tuple unpacking assigns each element to a separate variable
\u2022 The number of variables must match the number of elements (unless using *)
\u2022 Star (*) expressions capture remaining elements into a list

**Basic Unpacking:**
\u2022 x, y, z = (1, 2, 3) assigns each value to its variable
\u2022 Works with any iterable on the right side (list, string, range, etc.)
\u2022 ValueError if variable count doesn't match element count

**Extended Unpacking (* operator):**
\u2022 first, *rest = (1, 2, 3, 4) \u2192 first=1, rest=[2, 3, 4]
\u2022 first, *middle, last = (1, 2, 3, 4, 5) \u2192 middle=[2, 3, 4]
\u2022 *rest always produces a list (even if empty)
\u2022 Only one * expression allowed per assignment

**Swap Pattern:**
\u2022 a, b = b, a swaps without a temp variable
\u2022 Works because right side is evaluated fully before assignment
\u2022 Extends to multiple: a, b, c = c, a, b rotates values

**Underscore Convention:**
\u2022 Use _ to ignore unwanted values: _, y, _ = (1, 2, 3)
\u2022 Use *_ to ignore multiple: first, *_ = (1, 2, 3, 4, 5)

**Function Returns:**
\u2022 Python functions returning comma-separated values return tuples
\u2022 Callers unpack directly: x, y = get_coordinates()`,
      codeExample: `# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Basic unpacking
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# Assign each element to a variable
x, y, z = (1, 2, 3)
print(x, y, z)         # 1 2 3

# Works with any iterable on the right side
a, b, c = [10, 20, 30]       # list
p, q = "AB"                   # string: p='A', q='B'
i, j, k = range(3)            # range: i=0, j=1, k=2

# Unpacking in for loops
pairs = [(1, 'a'), (2, 'b'), (3, 'c')]
for num, letter in pairs:
    print(f"{num}: {letter}")  # 1: a, 2: b, 3: c

# Unpacking with enumerate
fruits = ['apple', 'banana', 'cherry']
for idx, fruit in enumerate(fruits):
    print(f"{idx}: {fruit}")

# Unpacking dict.items()
ages = {'Alice': 30, 'Bob': 25}
for name, age in ages.items():
    print(f"{name} is {age}")

# ValueError if counts don't match
try:
    a, b = (1, 2, 3)     # Too many values
except ValueError as e:
    print(f"Error: {e}")  # too many values to unpack


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Extended unpacking (*)
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# Star captures remaining elements into a LIST
first, *rest = (1, 2, 3, 4, 5)
print(first)   # 1
print(rest)    # [2, 3, 4, 5]  (always a list!)

# Star in the middle
first, *middle, last = (1, 2, 3, 4, 5)
print(first)   # 1
print(middle)  # [2, 3, 4]
print(last)    # 5

# Star at the beginning
*head, tail = (1, 2, 3, 4, 5)
print(head)    # [1, 2, 3, 4]
print(tail)    # 5

# Star can produce an empty list
first, *rest = (42,)
print(first)   # 42
print(rest)    # []

a, b, *rest = (1, 2)
print(a, b)    # 1 2
print(rest)    # []

# Practical: split head from tail of a sequence
def process_csv_row(row):
    header, *values = row
    return header, [float(v) for v in values]

result = process_csv_row(("temperature", "23.5", "24.1", "22.8"))
print(result)  # ('temperature', [23.5, 24.1, 22.8])


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Swap variables
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# Pythonic swap \u2014 no temp variable needed
a, b = 10, 20
a, b = b, a
print(a, b)    # 20 10

# How it works: right side creates tuple (b, a) = (20, 10)
# then unpacks into a, b

# Rotate three variables
a, b, c = 1, 2, 3
a, b, c = c, a, b
print(a, b, c)  # 3 1 2

# Swap list elements in-place
nums = [1, 2, 3, 4, 5]
nums[0], nums[-1] = nums[-1], nums[0]
print(nums)     # [5, 2, 3, 4, 1]

# Useful in sorting algorithms (e.g., bubble sort)
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

print(bubble_sort([64, 34, 25, 12, 22]))  # [12, 22, 25, 34, 64]


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Ignore values & nested
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# Use _ for values you don't need
_, y, _ = (1, 2, 3)
print(y)       # 2

# Use *_ to ignore multiple values
first, *_, last = (1, 2, 3, 4, 5, 6, 7)
print(first, last)  # 1 7

# Nested unpacking
(a, b), (c, d) = (1, 2), (3, 4)
print(a, b, c, d)   # 1 2 3 4

# Deeply nested
((a, b), c) = ((1, 2), 3)
print(a, b, c)       # 1 2 3

# Nested in for loop
points = [((0, 0), (1, 1)), ((2, 2), (3, 3))]
for (x1, y1), (x2, y2) in points:
    print(f"({x1},{y1}) -> ({x2},{y2})")

# Function returning multiple values (returns a tuple)
def min_max(numbers):
    return min(numbers), max(numbers)

lo, hi = min_max([5, 2, 8, 1, 9])
print(f"min={lo}, max={hi}")  # min=1, max=9

# divmod returns a tuple
quotient, remainder = divmod(17, 5)
print(f"17 / 5 = {quotient} remainder {remainder}")  # 3 remainder 2`
    },
    {
      name: 'Methods & Operations',
      icon: '\ud83d\udd27',
      explanation: `**Tuple Methods (only two!):**
\u2022 t.count(value) \u2014 returns number of occurrences of value
\u2022 t.index(value, start, stop) \u2014 returns index of first occurrence

**Why Only Two Methods:**
\u2022 Tuples are immutable, so no mutating methods exist
\u2022 No append, insert, remove, pop, sort, reverse, extend, clear
\u2022 This is intentional \u2014 simplicity and immutability by design

**Slicing (same as lists):**
\u2022 t[start:stop:step] returns a new tuple
\u2022 t[::-1] reverses the tuple
\u2022 Slicing always returns a new tuple

**Operators:**
\u2022 + concatenation: (1, 2) + (3, 4) = (1, 2, 3, 4)
\u2022 * repetition: (1, 2) * 3 = (1, 2, 1, 2, 1, 2)
\u2022 in membership: 3 in (1, 2, 3) is True

**Built-in Functions:**
\u2022 len(t) \u2014 number of elements
\u2022 min(t), max(t) \u2014 smallest/largest element
\u2022 sum(t) \u2014 sum of numeric elements
\u2022 sorted(t) \u2014 returns a sorted list (not tuple!)
\u2022 any(t), all(t) \u2014 logical tests
\u2022 reversed(t) \u2014 returns an iterator

**Performance Note:**
\u2022 Concatenation creates a new tuple: O(n+m)
\u2022 Avoid repeated concatenation in loops (use list + convert)`,
      codeExample: `# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 count() and index()
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
t = (1, 2, 3, 2, 4, 2, 5)

# count() \u2014 count occurrences (never fails, returns 0 if not found)
print(t.count(2))    # 3
print(t.count(99))   # 0

# index() \u2014 find first occurrence (raises ValueError if not found)
print(t.index(2))        # 1 (first occurrence of 2)
print(t.index(2, 2))     # 3 (search starting from index 2)
print(t.index(2, 4))     # 5 (search starting from index 4)

# index() with start and stop
print(t.index(2, 2, 5))  # 3 (search in t[2:5])

# Safe pattern: check before using index()
value = 99
idx = t.index(value) if value in t else -1
print(idx)                # -1

# Find ALL indices of a value
def find_all_indices(tup, value):
    return tuple(i for i, v in enumerate(tup) if v == value)

print(find_all_indices(t, 2))  # (1, 3, 5)


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Slicing
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
t = (0, 1, 2, 3, 4, 5, 6, 7, 8, 9)

# Basic slicing: t[start:stop]
print(t[2:5])      # (2, 3, 4)
print(t[:4])        # (0, 1, 2, 3)
print(t[6:])        # (6, 7, 8, 9)
print(t[:])         # (0, 1, 2, ..., 9) \u2014 full copy

# Step slicing: t[start:stop:step]
print(t[::2])       # (0, 2, 4, 6, 8) \u2014 every 2nd element
print(t[1::2])      # (1, 3, 5, 7, 9) \u2014 odd indices
print(t[::-1])      # (9, 8, 7, ..., 0) \u2014 reversed

# Negative indexing
print(t[-3:])       # (7, 8, 9) \u2014 last 3 elements
print(t[:-3])       # (0, 1, 2, 3, 4, 5, 6)
print(t[-5:-2])     # (5, 6, 7)

# Slicing never raises IndexError (out of range is safe)
print(t[100:200])   # () \u2014 empty tuple
print(t[:100])      # (0, 1, 2, ..., 9) \u2014 clamped to end


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Concatenation & repetition
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# Concatenation with +
t1 = (1, 2, 3)
t2 = (4, 5, 6)
t3 = t1 + t2
print(t3)           # (1, 2, 3, 4, 5, 6)

# Repetition with *
t = (0, 1) * 4
print(t)            # (0, 1, 0, 1, 0, 1, 0, 1)

# Membership with 'in'
print(3 in (1, 2, 3, 4))     # True
print(10 in (1, 2, 3, 4))    # False
print(10 not in (1, 2, 3))   # True

# BAD: Repeated concatenation in a loop (O(n^2))
# result = ()
# for i in range(1000):
#     result = result + (i,)  # Creates new tuple each time!

# BETTER: Build list first, convert once (O(n))
result = tuple(i for i in range(1000))


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Built-in functions
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
numbers = (5, 2, 8, 1, 9, 3)

# Length
print(len(numbers))       # 6

# Min, Max, Sum
print(min(numbers))       # 1
print(max(numbers))       # 9
print(sum(numbers))       # 28

# sorted() returns a LIST (not a tuple!)
sorted_list = sorted(numbers)
print(sorted_list)        # [1, 2, 3, 5, 8, 9]
sorted_tuple = tuple(sorted(numbers))
print(sorted_tuple)       # (1, 2, 3, 5, 8, 9)

# reversed() returns an iterator
rev = tuple(reversed(numbers))
print(rev)                # (3, 9, 1, 8, 2, 5)

# any() and all()
print(any((0, 0, 1)))    # True (at least one truthy)
print(all((1, 2, 3)))    # True (all truthy)
print(all((1, 0, 3)))    # False (0 is falsy)

# zip() with tuples
names = ('Alice', 'Bob', 'Charlie')
scores = (85, 92, 78)
combined = tuple(zip(names, scores))
print(combined)
# (('Alice', 85), ('Bob', 92), ('Charlie', 78))

# map() with tuples
doubled = tuple(map(lambda x: x * 2, numbers))
print(doubled)            # (10, 4, 16, 2, 18, 6)

# filter() with tuples
evens = tuple(filter(lambda x: x % 2 == 0, numbers))
print(evens)              # (2, 8)`
    },
    {
      name: 'As Dict Keys & Hashability',
      icon: '\ud83d\udd11',
      explanation: `**Core Concept:**
\u2022 Tuples (of immutable elements) are hashable \u2014 they can be dict keys and set members
\u2022 Lists are NOT hashable \u2014 they cannot be dict keys or set members
\u2022 Hashability requires that the object's hash never changes during its lifetime

**Hashability Rules:**
\u2022 Immutable types are hashable: int, float, str, bool, tuple, frozenset
\u2022 Mutable types are NOT hashable: list, dict, set
\u2022 A tuple is hashable ONLY if all its elements are also hashable
\u2022 (1, 2, 3) is hashable; ([1, 2], 3) is NOT

**Use as Dict Keys:**
\u2022 Map composite keys to values: grid[(row, col)] = value
\u2022 Cache/memoize with multi-parameter keys: memo[(a, b)] = result
\u2022 Represent edges in graphs: edge_weights[("A", "B")] = 5

**Use as Set Elements:**
\u2022 Track visited states: visited.add((row, col))
\u2022 Eliminate duplicate pairs/triples
\u2022 Set operations on coordinate pairs

**Common Pitfall:**
\u2022 set((0, 0)) unpacks the tuple \u2192 {0} (a set containing int 0)
\u2022 {(0, 0)} is a set literal \u2192 {(0, 0)} (a set containing a tuple)
\u2022 set([(0, 0)]) also works \u2192 {(0, 0)}`,
      codeExample: `# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Dict keys
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# Tuples as dictionary keys (because they are hashable)
grid = {}
grid[(0, 0)] = 'origin'
grid[(1, 0)] = 'right'
grid[(0, 1)] = 'up'
grid[(-1, 0)] = 'left'

# Access and check existence
print(grid[(0, 0)])          # 'origin'
print((1, 0) in grid)       # True

# Multi-key dictionary for caching
cache = {}
cache[('user123', 'profile')] = {'name': 'Alice'}
cache[('user123', 'settings')] = {'theme': 'dark'}
cache[('user456', 'profile')] = {'name': 'Bob'}

# Graph edge weights
edge_weights = {
    ('A', 'B'): 5,
    ('B', 'C'): 3,
    ('A', 'C'): 10,
    ('C', 'D'): 2,
}
print(edge_weights[('A', 'B')])  # 5

# Lists CANNOT be dict keys
try:
    bad_dict = {[1, 2]: 'value'}
except TypeError as e:
    print(f"Error: {e}")  # unhashable type: 'list'


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Set elements
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# Tuples can be members of sets
visited = set()
visited.add((0, 0))
visited.add((1, 0))
visited.add((0, 1))
visited.add((0, 0))   # Duplicate \u2014 ignored
print(visited)         # {(0, 0), (1, 0), (0, 1)}
print(len(visited))    # 3

# CRITICAL PITFALL: set() constructor vs set literal
wrong = set((0, 0))       # Unpacks tuple! Creates {0}
print(wrong)               # {0}

correct = {(0, 0)}         # Set literal with one tuple element
print(correct)             # {(0, 0)}

also_correct = set([(0, 0)])  # Pass list of tuples
print(also_correct)            # {(0, 0)}

# Eliminate duplicate pairs
pairs = [(1, 2), (3, 4), (1, 2), (5, 6), (3, 4)]
unique_pairs = set(pairs)
print(unique_pairs)    # {(1, 2), (3, 4), (5, 6)}

# Set operations on coordinate tuples
region_a = {(0, 0), (0, 1), (1, 0), (1, 1)}
region_b = {(1, 0), (1, 1), (2, 0), (2, 1)}
overlap = region_a & region_b
print(overlap)         # {(1, 0), (1, 1)}


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Coordinate grid pattern
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# BFS/DFS grid traversal using tuple-based visited set
def bfs_grid(grid, start):
    """BFS on a 2D grid using tuples for visited tracking"""
    rows, cols = len(grid), len(grid[0])
    visited = {start}
    queue = [start]
    directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]  # R, L, D, U

    while queue:
        r, c = queue.pop(0)
        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            if (0 <= nr < rows and 0 <= nc < cols
                    and (nr, nc) not in visited
                    and grid[nr][nc] == 0):
                visited.add((nr, nc))
                queue.append((nr, nc))

    return visited

# Example: count reachable cells (0 = open, 1 = wall)
grid = [
    [0, 0, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 1],
]
reachable = bfs_grid(grid, (0, 0))
print(f"Reachable cells from (0,0): {len(reachable)}")  # 6

# Sparse matrix using tuple keys
sparse = {}
sparse[(0, 0)] = 5
sparse[(2, 3)] = 10
sparse[(100, 200)] = 42
# Get with default 0 for missing entries
print(sparse.get((2, 3), 0))    # 10
print(sparse.get((1, 1), 0))    # 0


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Memoization pattern
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# Memoization with tuple keys for multi-parameter functions
memo = {}

def grid_paths(m, n):
    """Count paths from top-left to bottom-right in m x n grid"""
    if m == 1 or n == 1:
        return 1
    if (m, n) not in memo:
        memo[(m, n)] = grid_paths(m - 1, n) + grid_paths(m, n - 1)
    return memo[(m, n)]

print(grid_paths(3, 3))    # 6
print(grid_paths(10, 10))  # 48620

# Using @lru_cache (tuples work automatically as cache keys)
from functools import lru_cache

@lru_cache(maxsize=None)
def edit_distance(s1, s2, i, j):
    """Levenshtein distance between s1[:i] and s2[:j]"""
    if i == 0: return j
    if j == 0: return i
    if s1[i - 1] == s2[j - 1]:
        return edit_distance(s1, s2, i - 1, j - 1)
    return 1 + min(
        edit_distance(s1, s2, i - 1, j),     # delete
        edit_distance(s1, s2, i, j - 1),      # insert
        edit_distance(s1, s2, i - 1, j - 1)   # replace
    )

s1, s2 = "kitten", "sitting"
print(f"Edit distance: {edit_distance(s1, s2, len(s1), len(s2))}")  # 3

# State-based memoization (e.g., knapsack)
@lru_cache(maxsize=None)
def knapsack(weights, values, capacity, n):
    """0/1 knapsack \u2014 weights and values are tuples (hashable)"""
    if n == 0 or capacity == 0:
        return 0
    if weights[n - 1] > capacity:
        return knapsack(weights, values, capacity, n - 1)
    return max(
        knapsack(weights, values, capacity, n - 1),
        values[n - 1] + knapsack(weights, values, capacity - weights[n - 1], n - 1)
    )

w = (1, 3, 4, 5)
v = (1, 4, 5, 7)
print(f"Max value: {knapsack(w, v, 7, len(w))}")  # 9`
    },
    {
      name: 'Comparison & Sorting',
      icon: '\ud83d\udcca',
      explanation: `**Lexicographic Comparison:**
\u2022 Tuples compare element by element, left to right
\u2022 First unequal pair determines the result
\u2022 If all elements equal, shorter tuple is "less than" longer
\u2022 Supports all comparison operators: <, <=, >, >=, ==, !=

**Comparison Examples:**
\u2022 (1, 2) < (1, 3) \u2192 True (first elements equal, 2 < 3)
\u2022 (1, 2) < (2, 0) \u2192 True (1 < 2, rest doesn't matter)
\u2022 (1, 2) < (1, 2, 0) \u2192 True (prefix equal, shorter is less)
\u2022 (1, 2) == (1, 2) \u2192 True

**Sorting Tuples:**
\u2022 Default sort is lexicographic (by first element, then second, etc.)
\u2022 Use key= parameter for custom sorting criteria
\u2022 sorted() returns a list; use tuple(sorted(...)) for a tuple

**Multi-key Sorting Trick:**
\u2022 Return a tuple from key function for multi-criteria sorting
\u2022 Use negative values for descending on numeric fields
\u2022 key=lambda x: (-x[1], x[0]) sorts by score desc, name asc

**Common Patterns:**
\u2022 Sort list of tuples by specific index
\u2022 Sort with mixed ascending/descending criteria
\u2022 Use min()/max() with key for finding extremes`,
      codeExample: `# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Lexicographic comparison
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# Compares element by element, left to right
print((1, 2, 3) < (1, 2, 4))    # True  (3 < 4 at index 2)
print((1, 2, 3) < (1, 3, 0))    # True  (2 < 3 at index 1)
print((2, 0, 0) < (1, 9, 9))    # False (2 > 1 at index 0)

# Equal prefixes: shorter is less
print((1, 2) < (1, 2, 0))       # True
print((1, 2) < (1, 2))          # False (equal)

# Equality
print((1, 2, 3) == (1, 2, 3))   # True
print((1, 2, 3) != (1, 2, 4))   # True

# Works with strings too (alphabetical ordering)
print(('Alice', 85) < ('Bob', 60))      # True ('A' < 'B')
print(('Alice', 85) < ('Alice', 90))    # True (85 < 90)

# Useful for priority comparison
# (priority, timestamp, task) \u2014 lower priority number = higher priority
task_a = (1, 100, 'urgent')
task_b = (2, 50, 'normal')
task_c = (1, 200, 'important')
# task_a < task_c (same priority, earlier timestamp wins)
print(sorted([task_b, task_c, task_a]))
# [(1, 100, 'urgent'), (1, 200, 'important'), (2, 50, 'normal')]


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Basic sorting
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# Default sort: lexicographic (by 1st element, then 2nd, etc.)
points = [(3, 1), (1, 4), (2, 1), (1, 2)]
print(sorted(points))
# [(1, 2), (1, 4), (2, 1), (3, 1)]

# Sort by second element
print(sorted(points, key=lambda p: p[1]))
# [(3, 1), (2, 1), (1, 2), (1, 4)]

# Sort in reverse (descending)
print(sorted(points, reverse=True))
# [(3, 1), (2, 1), (1, 4), (1, 2)]

# Sort a tuple of tuples
data = ((3, 'c'), (1, 'a'), (2, 'b'))
result = tuple(sorted(data))
print(result)  # ((1, 'a'), (2, 'b'), (3, 'c'))

# min() and max() use lexicographic comparison by default
print(min(points))   # (1, 2)
print(max(points))   # (3, 1)

# min/max with key
closest_to_origin = min(points, key=lambda p: p[0]**2 + p[1]**2)
print(closest_to_origin)  # (2, 1) \u2014 distance = sqrt(5)


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Multi-key sorting
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# Return a TUPLE from key function for multi-criteria sort
students = [
    ('Alice', 85, 'CS'),
    ('Bob', 92, 'Math'),
    ('Charlie', 85, 'CS'),
    ('Alice', 90, 'Math'),
    ('Eve', 92, 'CS'),
]

# Sort by score (ascending), then name (ascending)
by_score_name = sorted(students, key=lambda s: (s[1], s[0]))
for s in by_score_name:
    print(s)
# ('Alice', 85, 'CS')
# ('Charlie', 85, 'CS')
# ('Alice', 90, 'Math')
# ('Bob', 92, 'Math')
# ('Eve', 92, 'CS')

# Sort by department (asc), then score (desc), then name (asc)
by_dept = sorted(students, key=lambda s: (s[2], -s[1], s[0]))
for s in by_dept:
    print(s)
# ('Eve', 92, 'CS')
# ('Alice', 85, 'CS')
# ('Charlie', 85, 'CS')
# ('Bob', 92, 'Math')
# ('Alice', 90, 'Math')


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Sort with negative trick
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# Negative values flip the sort order for numeric fields
# This is the standard Python trick for mixed asc/desc sorting

# Leaderboard: highest score first, earliest time first
players = [
    ('Alice', 100, 45.2),    # (name, score, time_seconds)
    ('Bob', 100, 30.1),
    ('Charlie', 90, 20.0),
    ('Eve', 100, 45.2),
    ('Dave', 90, 15.5),
]

# Sort: score DESC, time ASC, name ASC
leaderboard = sorted(players, key=lambda p: (-p[1], p[2], p[0]))
for rank, (name, score, time) in enumerate(leaderboard, 1):
    print(f"{rank}. {name}: {score}pts ({time}s)")
# 1. Bob: 100pts (30.1s)
# 2. Alice: 100pts (45.2s)
# 3. Eve: 100pts (45.2s)
# 4. Dave: 90pts (15.5s)
# 5. Charlie: 90pts (20.0s)

# NOTE: Negative trick only works for numbers, not strings
# For descending string sort, use a two-pass approach or cmp_to_key
from functools import cmp_to_key

def compare_students(a, b):
    """Sort by score DESC, then name ASC"""
    if a[1] != b[1]:
        return b[1] - a[1]        # score descending
    if a[0] < b[0]: return -1     # name ascending
    if a[0] > b[0]: return 1
    return 0

result = sorted(players, key=cmp_to_key(compare_students))

# Using heapq with tuple priority (negative for max-heap)
import heapq

heap = []
for name, score, time in players:
    heapq.heappush(heap, (-score, time, name))

# Pop in priority order
while heap:
    neg_score, time, name = heapq.heappop(heap)
    print(f"{name}: {-neg_score}pts")`
    },
    {
      name: 'Named Tuples & Patterns',
      icon: '\ud83c\udff7\ufe0f',
      explanation: `**Named Tuples (collections.namedtuple):**
\u2022 Create tuple subclasses with named fields
\u2022 Access by name (p.x) or index (p[0]) \u2014 best of both worlds
\u2022 Self-documenting code without the overhead of full classes
\u2022 Still immutable and hashable like regular tuples

**Creation:**
\u2022 Point = namedtuple('Point', ['x', 'y'])
\u2022 Point = namedtuple('Point', 'x y') \u2014 space-separated string also works
\u2022 Instances: p = Point(10, 20) or p = Point(x=10, y=20)

**Useful Methods:**
\u2022 _asdict() \u2014 convert to OrderedDict
\u2022 _replace(**kwargs) \u2014 create new instance with some fields changed
\u2022 _fields \u2014 tuple of field names
\u2022 _make(iterable) \u2014 class method to create from iterable

**Common Iteration Patterns with Tuples:**
\u2022 zip(a, b) \u2014 pair corresponding elements as tuples
\u2022 enumerate(seq) \u2014 yield (index, value) tuples
\u2022 dict.items() \u2014 yield (key, value) tuples
\u2022 *args in function signatures \u2014 captured as a tuple

**Tuple vs List Decision Guide:**
\u2022 Use tuple: fixed structure, heterogeneous data, dict keys, immutable
\u2022 Use list: variable length, homogeneous data, need to modify
\u2022 Use namedtuple: like tuple but with readable field names`,
      codeExample: `# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 namedtuple basics
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
from collections import namedtuple

# Define named tuple types
Point = namedtuple('Point', ['x', 'y'])
Color = namedtuple('Color', 'r g b')           # Space-separated also works
Person = namedtuple('Person', ['name', 'age', 'city'])

# Create instances
p = Point(10, 20)
red = Color(255, 0, 0)
alice = Person(name='Alice', age=30, city='NYC')

# Access by name (readable and self-documenting)
print(f"Point: ({p.x}, {p.y})")          # Point: (10, 20)
print(f"Red channel: {red.r}")           # Red channel: 255
print(f"{alice.name} lives in {alice.city}")  # Alice lives in NYC

# Still works like a regular tuple
print(p[0], p[1])          # 10 20
x, y = p                    # Unpacking works
print(len(p))               # 2
print(p == (10, 20))        # True (compares like a regular tuple)

# Immutable (like regular tuples)
try:
    p.x = 30
except AttributeError as e:
    print(f"Error: {e}")  # can't set attribute

# _fields attribute
print(Point._fields)        # ('x', 'y')
print(Person._fields)       # ('name', 'age', 'city')

# _make class method (create from iterable)
data = [3, 4]
p2 = Point._make(data)
print(p2)                    # Point(x=3, y=4)

# Create from dict using **
config = {'name': 'Bob', 'age': 25, 'city': 'LA'}
bob = Person(**config)
print(bob)                   # Person(name='Bob', age=25, city='LA')

# Default values (Python 3.6.1+)
Employee = namedtuple('Employee', ['name', 'dept', 'salary'], defaults=['Engineering', 50000])
emp = Employee('Alice')
print(emp)  # Employee(name='Alice', dept='Engineering', salary=50000)


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 _asdict() & _replace()
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
from collections import namedtuple

Person = namedtuple('Person', ['name', 'age', 'city'])
alice = Person('Alice', 30, 'NYC')

# _asdict() \u2014 convert to dictionary
d = alice._asdict()
print(d)           # {'name': 'Alice', 'age': 30, 'city': 'NYC'}
print(type(d))     # <class 'dict'>

# Useful for JSON serialization
import json
print(json.dumps(alice._asdict()))
# '{"name": "Alice", "age": 30, "city": "NYC"}'

# _replace() \u2014 create a new instance with some fields changed
# (namedtuples are immutable, so _replace returns a NEW instance)
bob = alice._replace(name='Bob', age=25)
print(bob)         # Person(name='Bob', age=25, city='NYC')
print(alice)       # Person(name='Alice', age=30, city='NYC') (unchanged!)

# Practical: update a record
Config = namedtuple('Config', ['host', 'port', 'debug', 'timeout'])
default_config = Config(host='localhost', port=8080, debug=False, timeout=30)

# Override just what you need
dev_config = default_config._replace(debug=True)
prod_config = default_config._replace(host='api.example.com', port=443, timeout=60)

print(dev_config)   # Config(host='localhost', port=8080, debug=True, timeout=30)
print(prod_config)  # Config(host='api.example.com', port=443, debug=False, timeout=60)

# Iterate over fields and values
for field, value in zip(alice._fields, alice):
    print(f"  {field}: {value}")


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Common iteration patterns
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# zip() \u2014 pair elements from multiple iterables
names = ('Alice', 'Bob', 'Charlie')
scores = (85, 92, 78)
grades = ('B', 'A', 'C')

for name, score, grade in zip(names, scores, grades):
    print(f"{name}: {score} ({grade})")

# zip creates tuples by default
paired = list(zip(names, scores))
print(paired)  # [('Alice', 85), ('Bob', 92), ('Charlie', 78)]

# Unzip with zip(*...)
zipped = [('Alice', 85), ('Bob', 92), ('Charlie', 78)]
names_back, scores_back = zip(*zipped)
print(names_back)   # ('Alice', 'Bob', 'Charlie')
print(scores_back)  # (85, 92, 78)

# enumerate() \u2014 yield (index, value) tuples
fruits = ('apple', 'banana', 'cherry')
for idx, fruit in enumerate(fruits, start=1):
    print(f"{idx}. {fruit}")

# dict.items() \u2014 yield (key, value) tuples
inventory = {'apples': 5, 'bananas': 3, 'cherries': 12}
for item, count in inventory.items():
    if count < 5:
        print(f"Low stock: {item} ({count})")

# *args captures as tuple
def show_args(*args):
    print(f"Received {len(args)} args: {args}")
    print(f"Type: {type(args)}")  # <class 'tuple'>

show_args(1, 2, 3)  # Received 3 args: (1, 2, 3)

# Tuple comprehension? No! Use tuple(generator)
squares = tuple(x**2 for x in range(10))
print(squares)  # (0, 1, 4, 9, 16, 25, 36, 49, 64, 81)


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Tuple vs List guide
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
import sys

# Memory comparison
t = (1, 2, 3, 4, 5)
l = [1, 2, 3, 4, 5]
print(f"Tuple: {sys.getsizeof(t)} bytes")  # ~80 bytes
print(f"List:  {sys.getsizeof(l)} bytes")  # ~104 bytes (~30% more)

# USE TUPLE when:
# 1. Data is fixed structure (coordinates, RGB, records)
point = (10, 20)
rgb = (255, 128, 0)
record = ('Alice', 30, 'alice@example.com')

# 2. Need as dict key or set element
locations = {(40.71, -74.01): 'NYC', (34.05, -118.24): 'LA'}

# 3. Returning multiple values from functions
def get_stats(data):
    return min(data), max(data), sum(data) / len(data)

# 4. Constant lookup data
HTTP_CODES = (
    (200, 'OK'),
    (404, 'Not Found'),
    (500, 'Internal Server Error'),
)

# USE LIST when:
# 1. Collection size changes
cart = []
cart.append('item1')
cart.append('item2')
cart.pop()

# 2. Need sorting or in-place modification
nums = [5, 3, 1, 4, 2]
nums.sort()

# 3. Building up data incrementally
results = []
for i in range(100):
    results.append(i ** 2)

# BEST OF BOTH: List of tuples (mutable collection of immutable records)
students = [
    ('Alice', 85),
    ('Bob', 92),
]
students.append(('Charlie', 78))
students.sort(key=lambda s: -s[1])
print(students)  # [('Bob', 92), ('Alice', 85), ('Charlie', 78)]`
    }
  ]

  const codeSections = selectedConcept ? parseCodeSections(concepts[selectedConcept].codeExample) : []

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #1e3a8a, #111827)',
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
              {'\u2190'} {selectedConcept !== null ? 'Back to Concepts' : 'Back to Python Topics'}
            </button>
            <h1 style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #0ea5e9, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Python Tuples
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
                color: '#93c5fd'
              }}>
                {concept.name}
              </h3>
              <p style={{
                color: '#d1d5db',
                textAlign: 'left',
                fontSize: '0.875rem'
              }}>
                Click to explore tuple concepts
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
              border: '2px solid #3b82f6',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}>
              <div style={{
                position: 'sticky',
                top: '0',
                background: 'linear-gradient(to right, #2563eb, #1d4ed8)',
                padding: '1.5rem',
                borderTopLeftRadius: '0.75rem',
                borderTopRightRadius: '0.75rem',
                borderBottom: '2px solid #60a5fa',
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
                  border: '1px solid #3b82f6'
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: '#93c5fd'
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
                        return <div key={i} style={{ fontWeight: '700', color: '#93c5fd', marginTop: i > 0 ? '1rem' : 0, marginBottom: '0.5rem' }}>{text}</div>
                      }
                      if (line.startsWith('\u2022')) {
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
                  border: '1px solid #3b82f6'
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: '#93c5fd'
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
                            background: '#2563eb',
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

export default PythonTuples
