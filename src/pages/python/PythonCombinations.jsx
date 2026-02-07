import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

function PythonCombinations({ onBack, breadcrumb }) {
  const [selectedTopic, setSelectedTopic] = useState(null)

  const topics = [
    {
      id: 1,
      title: 'sorted() + lambda + key',
      category: 'Sorting',
      description: 'Sort complex data structures using custom keys',
      code: `# Sort list of tuples by second element
data = [(1, 'z'), (2, 'a'), (3, 'm')]
sorted_data = sorted(data, key=lambda x: x[1])
# [(2, 'a'), (3, 'm'), (1, 'z')]

# Sort dictionaries by value
scores = {'alice': 85, 'bob': 92, 'charlie': 78}
sorted_by_value = sorted(scores.items(), key=lambda x: x[1], reverse=True)
# [('bob', 92), ('alice', 85), ('charlie', 78)]

# Sort objects by attribute
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

people = [Person('Alice', 30), Person('Bob', 25), Person('Charlie', 35)]
sorted_by_age = sorted(people, key=lambda p: p.age)

# Multiple sort keys (sort by age, then by name)
sorted_multi = sorted(people, key=lambda p: (p.age, p.name))

# Case-insensitive string sort
words = ['Apple', 'banana', 'Cherry']
sorted_words = sorted(words, key=lambda s: s.lower())
# ['Apple', 'banana', 'Cherry']`,
      explanation: `**Combining sorted() + lambda + key:**
- sorted() returns a new sorted list
- key= specifies a function to extract comparison key
- lambda creates inline function for custom sorting
- reverse=True for descending order
- Can use tuple keys for multi-level sorting`
    },
    {
      id: 2,
      title: 'map() + lambda + list()',
      category: 'Transformation',
      description: 'Transform all elements in a sequence',
      code: `# Square all numbers
nums = [1, 2, 3, 4, 5]
squares = list(map(lambda x: x**2, nums))
# [1, 4, 9, 16, 25]

# Convert strings to integers
str_nums = ['1', '2', '3', '4']
int_nums = list(map(int, str_nums))  # Using int directly
# [1, 2, 3, 4]

# Apply function to multiple iterables
a = [1, 2, 3]
b = [4, 5, 6]
sums = list(map(lambda x, y: x + y, a, b))
# [5, 7, 9]

# Chain transformations
data = ['  hello  ', '  world  ']
cleaned = list(map(lambda s: s.strip().upper(), data))
# ['HELLO', 'WORLD']

# Equivalent list comprehension (often preferred)
squares_lc = [x**2 for x in nums]`,
      explanation: `**Combining map() + lambda + list():**
- map() applies function to each element lazily
- lambda provides inline transformation logic
- list() converts map object to list
- Can map over multiple iterables simultaneously
- List comprehension is often more Pythonic`
    },
    {
      id: 3,
      title: 'filter() + lambda + list()',
      category: 'Filtering',
      description: 'Filter elements based on conditions',
      code: `# Filter even numbers
nums = [1, 2, 3, 4, 5, 6, 7, 8]
evens = list(filter(lambda x: x % 2 == 0, nums))
# [2, 4, 6, 8]

# Filter non-empty strings
strings = ['hello', '', 'world', '', 'python']
non_empty = list(filter(lambda s: s, strings))
# ['hello', 'world', 'python']

# Or simply (truthy filter)
non_empty = list(filter(None, strings))

# Filter with multiple conditions
data = [1, -2, 3, -4, 5, -6]
positive_even = list(filter(lambda x: x > 0 and x % 2 == 0, data))
# [] - no positive even numbers

# Combine filter + map
nums = [1, 2, 3, 4, 5, 6]
squared_evens = list(map(lambda x: x**2, filter(lambda x: x % 2 == 0, nums)))
# [4, 16, 36]

# Equivalent list comprehension
squared_evens_lc = [x**2 for x in nums if x % 2 == 0]`,
      explanation: `**Combining filter() + lambda + list():**
- filter() keeps elements where function returns True
- lambda defines the filter condition
- list() materializes the filtered result
- filter(None, iterable) removes falsy values
- Can chain filter and map operations`
    },
    {
      id: 4,
      title: 'zip() + dict() / list()',
      category: 'Pairing',
      description: 'Combine multiple iterables element-wise',
      code: `# Create dictionary from two lists
keys = ['a', 'b', 'c']
values = [1, 2, 3]
d = dict(zip(keys, values))
# {'a': 1, 'b': 2, 'c': 3}

# Pair elements from multiple lists
names = ['Alice', 'Bob', 'Charlie']
ages = [25, 30, 35]
cities = ['NYC', 'LA', 'SF']
combined = list(zip(names, ages, cities))
# [('Alice', 25, 'NYC'), ('Bob', 30, 'LA'), ('Charlie', 35, 'SF')]

# Unzip (transpose) using zip(*...)
pairs = [('a', 1), ('b', 2), ('c', 3)]
letters, numbers = zip(*pairs)
# letters = ('a', 'b', 'c'), numbers = (1, 2, 3)

# zip with enumerate for index
data = ['x', 'y', 'z']
indexed = list(zip(range(len(data)), data))
# [(0, 'x'), (1, 'y'), (2, 'z')]

# Better: just use enumerate
indexed = list(enumerate(data))

# Parallel iteration
for name, age in zip(names, ages):
    print(f"{name} is {age} years old")`,
      explanation: `**Combining zip() + dict() / list():**
- zip() pairs elements from multiple iterables
- dict(zip(...)) creates dictionary from key-value pairs
- zip(*iterable) transposes/unzips nested structure
- Stops at shortest iterable (use itertools.zip_longest for padding)
- Commonly used for parallel iteration`
    },
    {
      id: 5,
      title: 'enumerate() + unpacking',
      category: 'Iteration',
      description: 'Get index and value while iterating',
      code: `# Basic enumerate
fruits = ['apple', 'banana', 'cherry']
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")
# 0: apple, 1: banana, 2: cherry

# Start from custom index
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}: {fruit}")
# 1: apple, 2: banana, 3: cherry

# Convert to list of tuples
indexed = list(enumerate(fruits))
# [(0, 'apple'), (1, 'banana'), (2, 'cherry')]

# Use with list comprehension
indexed_upper = [(i, f.upper()) for i, f in enumerate(fruits)]

# Find index of matching element
data = [10, 20, 30, 40, 50]
indices = [i for i, x in enumerate(data) if x > 25]
# [2, 3, 4]

# Enumerate with zip
names = ['Alice', 'Bob']
scores = [95, 87]
for i, (name, score) in enumerate(zip(names, scores)):
    print(f"{i}: {name} scored {score}")`,
      explanation: `**Combining enumerate() + unpacking:**
- enumerate() yields (index, value) tuples
- Tuple unpacking extracts both in for loop
- start= parameter for custom starting index
- Works with any iterable
- Essential for needing both index and value`
    },
    {
      id: 6,
      title: 'List Comprehension + Conditions',
      category: 'Comprehension',
      description: 'Powerful one-liner data transformations',
      code: `# Filter and transform
nums = [1, 2, 3, 4, 5, 6]
squared_evens = [x**2 for x in nums if x % 2 == 0]
# [4, 16, 36]

# Conditional expression (ternary)
labels = ['even' if x % 2 == 0 else 'odd' for x in nums]
# ['odd', 'even', 'odd', 'even', 'odd', 'even']

# Nested loops (flatten)
matrix = [[1, 2], [3, 4], [5, 6]]
flat = [x for row in matrix for x in row]
# [1, 2, 3, 4, 5, 6]

# Nested with condition
flat_evens = [x for row in matrix for x in row if x % 2 == 0]
# [2, 4, 6]

# Dict comprehension
names = ['alice', 'bob', 'charlie']
name_lengths = {name: len(name) for name in names}
# {'alice': 5, 'bob': 3, 'charlie': 7}

# Set comprehension
unique_lengths = {len(name) for name in names}
# {3, 5, 7}

# Combine with function calls
words = ['Hello', 'World', 'Python']
processed = [w.lower().strip() for w in words if len(w) > 4]
# ['hello', 'world', 'python']`,
      explanation: `**List Comprehension + Conditions:**
- [expr for x in iterable if condition] - filter then transform
- [a if cond else b for x in iterable] - conditional expression
- Nested loops flatten structures
- Dict/set comprehensions follow same pattern
- More readable than map/filter for simple cases`
    },
    {
      id: 7,
      title: 'Counter + most_common()',
      category: 'Counting',
      description: 'Count occurrences and find most frequent',
      code: `from collections import Counter

# Count elements
words = ['apple', 'banana', 'apple', 'cherry', 'banana', 'apple']
counts = Counter(words)
# Counter({'apple': 3, 'banana': 2, 'cherry': 1})

# Get most common
top_2 = counts.most_common(2)
# [('apple', 3), ('banana', 2)]

# Get just the items (without counts)
most_frequent = [item for item, count in counts.most_common(3)]
# ['apple', 'banana', 'cherry']

# Count characters in string
char_counts = Counter('mississippi')
# Counter({'i': 4, 's': 4, 'p': 2, 'm': 1})

# Combine counters
c1 = Counter(['a', 'b', 'a'])
c2 = Counter(['b', 'c', 'b'])
combined = c1 + c2
# Counter({'b': 3, 'a': 2, 'c': 1})

# Get least common (reverse most_common)
least_common = counts.most_common()[-2:]
# or
least_common = counts.most_common()[:-3:-1]  # last 2, reversed

# Filter by count
frequent = {k: v for k, v in counts.items() if v >= 2}
# {'apple': 3, 'banana': 2}`,
      explanation: `**Counter + most_common():**
- Counter creates frequency dictionary
- most_common(n) returns n most frequent as list of tuples
- Counter supports arithmetic (+, -, &, |)
- Works with any iterable (strings, lists, etc.)
- Access counts like dictionary: counts['apple']`
    },
    {
      id: 8,
      title: 'defaultdict + lambda',
      category: 'Grouping',
      description: 'Auto-initialize dictionary values',
      code: `from collections import defaultdict

# Group items by key
data = [('a', 1), ('b', 2), ('a', 3), ('b', 4)]
grouped = defaultdict(list)
for key, value in data:
    grouped[key].append(value)
# {'a': [1, 3], 'b': [2, 4]}

# Count occurrences
counts = defaultdict(int)
for item in ['a', 'b', 'a', 'c', 'a']:
    counts[item] += 1
# {'a': 3, 'b': 1, 'c': 1}

# Nested defaultdict
nested = defaultdict(lambda: defaultdict(int))
nested['a']['x'] += 1
nested['a']['y'] += 2
# {'a': {'x': 1, 'y': 2}}

# Set as default
unique_by_key = defaultdict(set)
for key, value in [('a', 1), ('a', 1), ('a', 2)]:
    unique_by_key[key].add(value)
# {'a': {1, 2}}

# Custom default value
d = defaultdict(lambda: 'N/A')
d['exists'] = 'value'
print(d['missing'])  # 'N/A'

# Graph adjacency list
edges = [(1, 2), (1, 3), (2, 3)]
graph = defaultdict(list)
for u, v in edges:
    graph[u].append(v)
    graph[v].append(u)  # undirected`,
      explanation: `**defaultdict + lambda:**
- defaultdict(type) auto-creates missing keys
- list: grouping, int: counting, set: unique values
- lambda: custom default value/factory
- Avoids KeyError and if-else checks
- Perfect for building graphs, grouping data`
    },
    {
      id: 9,
      title: 'reduce() + lambda',
      category: 'Aggregation',
      description: 'Reduce sequence to single value',
      code: `from functools import reduce

# Sum (though sum() is better)
nums = [1, 2, 3, 4, 5]
total = reduce(lambda acc, x: acc + x, nums)
# 15

# Product
product = reduce(lambda acc, x: acc * x, nums)
# 120

# With initial value
product = reduce(lambda acc, x: acc * x, nums, 1)

# Find maximum (though max() is better)
maximum = reduce(lambda a, b: a if a > b else b, nums)
# 5

# Flatten nested list
nested = [[1, 2], [3, 4], [5, 6]]
flat = reduce(lambda acc, x: acc + x, nested)
# [1, 2, 3, 4, 5, 6]

# Build dictionary
pairs = [('a', 1), ('b', 2), ('c', 3)]
d = reduce(lambda acc, kv: {**acc, kv[0]: kv[1]}, pairs, {})
# {'a': 1, 'b': 2, 'c': 3}

# Chain string operations
words = ['Hello', 'World', 'Python']
sentence = reduce(lambda acc, w: f"{acc} {w}", words)
# 'Hello World Python'

# Compose functions
def double(x): return x * 2
def add_one(x): return x + 1
funcs = [double, add_one, double]
result = reduce(lambda x, f: f(x), funcs, 5)
# ((5 * 2) + 1) * 2 = 22`,
      explanation: `**reduce() + lambda:**
- reduce(func, iterable, initial) accumulates values
- func takes (accumulator, current) returns new accumulator
- Initial value prevents error on empty iterable
- Often replaced by sum(), max(), min(), ''.join()
- Useful for complex aggregations and function composition`
    },
    {
      id: 10,
      title: 'any() / all() + generator',
      category: 'Boolean',
      description: 'Check conditions across iterables',
      code: `# any() - True if ANY element is truthy
nums = [0, 0, 1, 0]
has_truthy = any(nums)  # True

# all() - True if ALL elements are truthy
all_truthy = all(nums)  # False

# With generator expression (lazy evaluation)
data = [2, 4, 6, 8, 10]
all_even = all(x % 2 == 0 for x in data)  # True
any_odd = any(x % 2 == 1 for x in data)   # False

# Check if any string contains substring
strings = ['hello', 'world', 'python']
has_o = any('o' in s for s in strings)  # True

# Validate all items
users = [{'name': 'Alice', 'age': 25}, {'name': 'Bob', 'age': 30}]
all_adults = all(u['age'] >= 18 for u in users)  # True

# Short-circuit evaluation (stops early)
def check(x):
    print(f"Checking {x}")
    return x > 0

nums = [-1, 2, 3]
any(check(x) for x in nums)  # Prints: Checking -1, Checking 2 (stops at 2)

# Combine with map
all_positive = all(map(lambda x: x > 0, [1, 2, 3]))  # True

# Empty iterable behavior
any([])  # False (no truthy elements)
all([])  # True (no falsy elements - vacuous truth)`,
      explanation: `**any() / all() + generator:**
- any(): True if at least one True, False for empty
- all(): True if no False, True for empty
- Generator expression for lazy evaluation
- Short-circuits (stops when result is determined)
- Perfect for validation and searching`
    },
    {
      id: 11,
      title: 'itertools combinations',
      category: 'Itertools',
      description: 'Generate combinations, permutations, products',
      code: `from itertools import combinations, permutations, product, chain

# Combinations (order doesn't matter, no repeat)
items = ['a', 'b', 'c']
combos = list(combinations(items, 2))
# [('a', 'b'), ('a', 'c'), ('b', 'c')]

# Permutations (order matters)
perms = list(permutations(items, 2))
# [('a', 'b'), ('a', 'c'), ('b', 'a'), ('b', 'c'), ('c', 'a'), ('c', 'b')]

# Product (cartesian product)
colors = ['red', 'blue']
sizes = ['S', 'M', 'L']
variants = list(product(colors, sizes))
# [('red', 'S'), ('red', 'M'), ('red', 'L'), ('blue', 'S'), ...]

# Repeat with product
dice_rolls = list(product(range(1, 7), repeat=2))  # All 2-dice combinations

# Chain multiple iterables
a = [1, 2]
b = [3, 4]
c = [5, 6]
all_items = list(chain(a, b, c))
# [1, 2, 3, 4, 5, 6]

# Flatten with chain.from_iterable
nested = [[1, 2], [3, 4], [5, 6]]
flat = list(chain.from_iterable(nested))
# [1, 2, 3, 4, 5, 6]

# combinations_with_replacement
from itertools import combinations_with_replacement
combos_rep = list(combinations_with_replacement('ab', 2))
# [('a', 'a'), ('a', 'b'), ('b', 'b')]`,
      explanation: `**itertools combinations:**
- combinations(iterable, r): r-length subsets, no repeat
- permutations(iterable, r): r-length orderings
- product(*iterables): cartesian product
- chain(*iterables): flatten multiple iterables
- All return iterators (lazy), use list() to materialize`
    },
    {
      id: 12,
      title: 'groupby() + sorted()',
      category: 'Grouping',
      description: 'Group consecutive elements by key',
      code: `from itertools import groupby

# IMPORTANT: groupby requires sorted input!
data = [('a', 1), ('a', 2), ('b', 3), ('b', 4), ('a', 5)]

# First sort by key
sorted_data = sorted(data, key=lambda x: x[0])
# [('a', 1), ('a', 2), ('a', 5), ('b', 3), ('b', 4)]

# Then group
groups = {}
for key, group in groupby(sorted_data, key=lambda x: x[0]):
    groups[key] = list(group)
# {'a': [('a', 1), ('a', 2), ('a', 5)], 'b': [('b', 3), ('b', 4)]}

# Group numbers by property
nums = [1, 2, 3, 4, 5, 6, 7, 8, 9]
sorted_nums = sorted(nums, key=lambda x: x % 3)
for remainder, group in groupby(sorted_nums, key=lambda x: x % 3):
    print(f"Remainder {remainder}: {list(group)}")
# Remainder 0: [3, 6, 9]
# Remainder 1: [1, 4, 7]
# Remainder 2: [2, 5, 8]

# Group strings by first letter
words = ['apple', 'banana', 'apricot', 'blueberry', 'cherry']
sorted_words = sorted(words, key=lambda w: w[0])
for letter, group in groupby(sorted_words, key=lambda w: w[0]):
    print(f"{letter}: {list(group)}")

# Alternative: defaultdict (doesn't require sorting)
from collections import defaultdict
grouped = defaultdict(list)
for item in data:
    grouped[item[0]].append(item)`,
      explanation: `**groupby() + sorted():**
- groupby() groups CONSECUTIVE elements by key
- MUST sort by same key first!
- Returns iterator of (key, group_iterator) pairs
- group iterator is exhausted after one use - convert to list
- defaultdict is often simpler for non-consecutive grouping`
    },
    {
      id: 13,
      title: 'heapq operations',
      category: 'Heap',
      description: 'Priority queue and top-k operations',
      code: `import heapq

# Create min-heap
nums = [3, 1, 4, 1, 5, 9, 2, 6]
heapq.heapify(nums)  # In-place, O(n)
# nums is now a min-heap

# Push and pop
heapq.heappush(nums, 0)
smallest = heapq.heappop(nums)  # 0

# Get smallest without removing
smallest = nums[0]

# Push and pop in one operation
result = heapq.heappushpop(nums, 7)  # Push 7, pop smallest

# Get n smallest/largest
data = [3, 1, 4, 1, 5, 9, 2, 6]
three_smallest = heapq.nsmallest(3, data)  # [1, 1, 2]
three_largest = heapq.nlargest(3, data)    # [9, 6, 5]

# With key function
people = [('Alice', 25), ('Bob', 30), ('Charlie', 20)]
youngest = heapq.nsmallest(2, people, key=lambda x: x[1])
# [('Charlie', 20), ('Alice', 25)]

# Max-heap trick (negate values)
max_heap = []
for x in [3, 1, 4, 1, 5]:
    heapq.heappush(max_heap, -x)
largest = -heapq.heappop(max_heap)  # 5

# Merge sorted iterables
a = [1, 3, 5]
b = [2, 4, 6]
merged = list(heapq.merge(a, b))  # [1, 2, 3, 4, 5, 6]`,
      explanation: `**heapq operations:**
- heapify(): convert list to min-heap in O(n)
- heappush/heappop: O(log n) operations
- nsmallest/nlargest: efficient for small n
- For max-heap: negate values or use key
- merge(): efficiently merge sorted iterables`
    },
    {
      id: 14,
      title: 'bisect for sorted lists',
      category: 'Binary Search',
      description: 'Maintain sorted order and binary search',
      code: `import bisect

# Find insertion point
sorted_list = [1, 3, 5, 7, 9]
pos = bisect.bisect(sorted_list, 4)  # 2 (insert after 3)
pos_left = bisect.bisect_left(sorted_list, 5)   # 2 (insert before 5)
pos_right = bisect.bisect_right(sorted_list, 5) # 3 (insert after 5)

# Insert maintaining sort order
bisect.insort(sorted_list, 4)  # [1, 3, 4, 5, 7, 9]

# Binary search (find if exists)
def binary_search(arr, x):
    i = bisect.bisect_left(arr, x)
    return i < len(arr) and arr[i] == x

# Find range of equal elements
def find_range(arr, x):
    left = bisect.bisect_left(arr, x)
    right = bisect.bisect_right(arr, x)
    return (left, right)

data = [1, 2, 2, 2, 3, 4]
start, end = find_range(data, 2)  # (1, 4)
count = end - start  # 3 occurrences

# Grade lookup with bisect
def grade(score):
    breakpoints = [60, 70, 80, 90]
    grades = ['F', 'D', 'C', 'B', 'A']
    return grades[bisect.bisect(breakpoints, score)]

grade(85)  # 'B'
grade(92)  # 'A'

# With key (Python 3.10+)
# bisect.bisect(arr, x, key=lambda item: item.score)

# Pre-3.10: transform the list
scores = [(85, 'Alice'), (92, 'Bob'), (78, 'Charlie')]
scores.sort()  # Sort by first element
pos = bisect.bisect([s[0] for s in scores], 80)`,
      explanation: `**bisect for sorted lists:**
- bisect_left: insertion point for leftmost position
- bisect_right/bisect: insertion point for rightmost
- insort: insert while maintaining sort
- O(log n) search, O(n) insert (due to shifting)
- Perfect for maintaining sorted containers`
    },
    {
      id: 15,
      title: 'String join + split + strip',
      category: 'Strings',
      description: 'Common string transformations',
      code: `# Join list to string
words = ['Hello', 'World', 'Python']
sentence = ' '.join(words)  # 'Hello World Python'
csv = ','.join(words)       # 'Hello,World,Python'

# Split string to list
text = 'Hello World Python'
parts = text.split()        # ['Hello', 'World', 'Python']
parts = text.split(' ', 1)  # ['Hello', 'World Python'] (max 1 split)

# Split on multiple delimiters (use re)
import re
text = 'a,b;c:d'
parts = re.split(r'[,;:]', text)  # ['a', 'b', 'c', 'd']

# Strip whitespace
s = '  hello world  '
s.strip()   # 'hello world'
s.lstrip()  # 'hello world  '
s.rstrip()  # '  hello world'

# Strip specific characters
s = '###hello###'
s.strip('#')  # 'hello'

# Combine operations
data = '  Alice, Bob , Charlie  '
names = [name.strip() for name in data.strip().split(',')]
# ['Alice', 'Bob', 'Charlie']

# Join with formatting
nums = [1, 2, 3, 4, 5]
formatted = ', '.join(str(n) for n in nums)  # '1, 2, 3, 4, 5'

# Multiline string processing
text = """
  line 1
  line 2
  line 3
"""
lines = [line.strip() for line in text.strip().split('\\n') if line.strip()]
# ['line 1', 'line 2', 'line 3']`,
      explanation: `**String join + split + strip:**
- join(): combine list to string with separator
- split(): break string into list by delimiter
- strip(): remove whitespace or specified chars
- Combine with list comprehension for processing
- Generator expression in join() for memory efficiency`
    },
    {
      id: 16,
      title: 'Dictionary get + setdefault',
      category: 'Dictionary',
      description: 'Safe dictionary access and modification',
      code: `# get() with default value
d = {'a': 1, 'b': 2}
value = d.get('c', 0)     # 0 (key doesn't exist)
value = d.get('a', 0)     # 1 (key exists)
value = d.get('c')        # None (default default)

# setdefault() - get or set
d = {'a': 1}
value = d.setdefault('b', 2)  # Sets d['b']=2, returns 2
value = d.setdefault('a', 9)  # Returns 1 (already exists)
# d is now {'a': 1, 'b': 2}

# Building lists with setdefault
data = [('a', 1), ('b', 2), ('a', 3)]
grouped = {}
for key, value in data:
    grouped.setdefault(key, []).append(value)
# {'a': [1, 3], 'b': [2]}

# Nested dict access safely
config = {'database': {'host': 'localhost'}}
host = config.get('database', {}).get('host', 'default')  # 'localhost'
port = config.get('database', {}).get('port', 5432)       # 5432

# Counting with get
counts = {}
for item in ['a', 'b', 'a', 'c', 'a']:
    counts[item] = counts.get(item, 0) + 1
# {'a': 3, 'b': 1, 'c': 1}

# update() to merge dictionaries
d1 = {'a': 1, 'b': 2}
d2 = {'b': 3, 'c': 4}
d1.update(d2)  # d1 is now {'a': 1, 'b': 3, 'c': 4}

# Merge with | operator (Python 3.9+)
merged = d1 | d2  # New dict, d2 values take precedence`,
      explanation: `**Dictionary get + setdefault:**
- get(key, default): safe access without KeyError
- setdefault(key, default): get or set and return
- Chained get() for nested dict access
- update(): merge dictionaries
- | operator (3.9+): create merged dictionary`
    },
    {
      id: 17,
      title: 'Walrus operator :=',
      category: 'Assignment',
      description: 'Assign and use value in one expression',
      code: `# Basic walrus operator (Python 3.8+)
# Without walrus:
line = input()
while line != 'quit':
    print(line)
    line = input()

# With walrus:
while (line := input()) != 'quit':
    print(line)

# In list comprehension (filter computed value)
data = [1, 2, 3, 4, 5]
# Without walrus - computes twice:
results = [x**2 for x in data if x**2 > 10]
# With walrus - compute once:
results = [y for x in data if (y := x**2) > 10]
# [16, 25]

# In conditional expressions
if (n := len(data)) > 3:
    print(f"List has {n} items")

# Reading file
while (line := file.readline()):
    process(line)

# Regex matching
import re
if (match := re.search(r'\\d+', text)):
    number = match.group()

# In any/all with capture
if any((result := check(x)) for x in items):
    print(f"Found: {result}")

# Avoid recomputation in comprehension
# Without walrus:
processed = [expensive_func(x) for x in data if expensive_func(x) is not None]
# With walrus:
processed = [y for x in data if (y := expensive_func(x)) is not None]`,
      explanation: `**Walrus operator := :**
- Assigns value AND returns it in one expression
- Useful in while conditions, if statements
- Avoids duplicate computation in comprehensions
- Works in any expression context
- Python 3.8+ only`
    },
    {
      id: 18,
      title: 'Unpacking operators * and **',
      category: 'Unpacking',
      description: 'Unpack iterables and dictionaries',
      code: `# Unpack list/tuple with *
a, *rest = [1, 2, 3, 4, 5]
# a = 1, rest = [2, 3, 4, 5]

first, *middle, last = [1, 2, 3, 4, 5]
# first = 1, middle = [2, 3, 4], last = 5

# Merge lists with *
a = [1, 2]
b = [3, 4]
merged = [*a, *b]  # [1, 2, 3, 4]

# Merge dicts with **
d1 = {'a': 1, 'b': 2}
d2 = {'c': 3, 'd': 4}
merged = {**d1, **d2}  # {'a': 1, 'b': 2, 'c': 3, 'd': 4}

# Override values
config = {**defaults, **user_config}  # user_config overrides

# Function arguments
def func(a, b, c):
    return a + b + c

args = [1, 2, 3]
func(*args)  # Same as func(1, 2, 3)

kwargs = {'a': 1, 'b': 2, 'c': 3}
func(**kwargs)  # Same as func(a=1, b=2, c=3)

# Combine positional and keyword
func(*[1, 2], **{'c': 3})

# *args and **kwargs in definition
def flexible(*args, **kwargs):
    print(f"args: {args}")
    print(f"kwargs: {kwargs}")

flexible(1, 2, 3, name='Alice', age=25)
# args: (1, 2, 3)
# kwargs: {'name': 'Alice', 'age': 25}

# Unpack in print
items = [1, 2, 3]
print(*items)  # 1 2 3 (space-separated)
print(*items, sep=', ')  # 1, 2, 3`,
      explanation: `**Unpacking operators * and **:**
- *iterable: unpack sequence elements
- **dict: unpack dictionary key-value pairs
- Use in assignments, function calls, literals
- *args/**kwargs in function definitions
- Merge collections easily`
    }
  ]

  const categories = [...new Set(topics.map(t => t.category))]

  const getCategoryColor = (category) => {
    const colors = {
      'Sorting': '#f59e0b',
      'Transformation': '#3b82f6',
      'Filtering': '#10b981',
      'Pairing': '#8b5cf6',
      'Iteration': '#ec4899',
      'Comprehension': '#06b6d4',
      'Counting': '#ef4444',
      'Grouping': '#14b8a6',
      'Aggregation': '#f97316',
      'Boolean': '#a855f7',
      'Itertools': '#0ea5e9',
      'Heap': '#84cc16',
      'Binary Search': '#6366f1',
      'Strings': '#22c55e',
      'Dictionary': '#eab308',
      'Assignment': '#fb7185',
      'Unpacking': '#2dd4bf'
    }
    return colors[category] || '#6b7280'
  }

  if (selectedTopic) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)',
        padding: '2rem',
        color: 'white'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <button
            onClick={() => setSelectedTopic(null)}
            style={{
              marginBottom: '1.5rem',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            ← Back to Topics
          </button>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            borderRadius: '1rem',
            padding: '2rem',
            border: `2px solid ${getCategoryColor(selectedTopic.category)}`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
              <div>
                <span style={{
                  padding: '0.25rem 0.75rem',
                  background: `${getCategoryColor(selectedTopic.category)}30`,
                  color: getCategoryColor(selectedTopic.category),
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  {selectedTopic.category}
                </span>
                <h1 style={{ fontSize: '2rem', fontWeight: '700', marginTop: '0.75rem', color: 'white' }}>
                  {selectedTopic.title}
                </h1>
                <p style={{ color: '#9ca3af', marginTop: '0.5rem' }}>{selectedTopic.description}</p>
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#60a5fa' }}>Code Example</h3>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  borderRadius: '0.5rem',
                  fontSize: '0.9rem',
                  padding: '1.5rem',
                  background: '#0d1117'
                }}
              >
                {selectedTopic.code}
              </SyntaxHighlighter>
            </div>

            <div style={{
              background: '#1e293b',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              border: '1px solid #334155'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#10b981' }}>Key Points</h3>
              <div style={{ color: '#d1d5db', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
                {selectedTopic.explanation}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)',
      padding: '2rem',
      color: 'white'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <button
          onClick={onBack}
          style={{
            marginBottom: '1.5rem',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            background: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          ← Back to Python
        </button>

        <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

        <CollapsibleSidebar
          items={topics}
          selectedIndex={selectedTopic ? topics.findIndex(t => t.id === selectedTopic.id) : -1}
          onSelect={(index) => setSelectedTopic(topics[index])}
          title="Topics"
          getItemLabel={(item) => item.title}
          getItemIcon={(item) => {
            const colors = {
              'Sorting': '🔄',
              'Transformation': '🔀',
              'Filtering': '🔍',
              'Pairing': '🔗',
              'Iteration': '🔁',
              'Comprehension': '📝',
              'Counting': '🔢',
              'Grouping': '📊',
              'Aggregation': '📈',
              'Boolean': '✅',
              'Itertools': '🛠️',
              'Heap': '📚',
              'Binary Search': '🎯',
              'Strings': '📜',
              'Dictionary': '🗂️',
              'Assignment': '📌',
              'Unpacking': '📦'
            }
            return colors[item.category] || '📋'
          }}
          primaryColor="#3b82f6"
        />

        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            background: 'linear-gradient(to right, #60a5fa, #a78bfa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>
            Combining Python Keywords
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#9ca3af', maxWidth: '800px', margin: '0 auto' }}>
            Master the art of combining Python built-ins, functions, and operators to write elegant, efficient code
          </p>
        </div>

        {/* Category filter buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem', justifyContent: 'center' }}>
          {categories.map(category => (
            <span
              key={category}
              style={{
                padding: '0.5rem 1rem',
                background: `${getCategoryColor(category)}20`,
                color: getCategoryColor(category),
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: '600',
                border: `1px solid ${getCategoryColor(category)}50`
              }}
            >
              {category}
            </span>
          ))}
        </div>

        {/* Topics grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '1.5rem'
        }}>
          {topics.map(topic => (
            <div
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              style={{
                background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                borderRadius: '1rem',
                padding: '1.5rem',
                border: `2px solid ${getCategoryColor(topic.category)}40`,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = `0 8px 24px ${getCategoryColor(topic.category)}30`
                e.currentTarget.style.borderColor = getCategoryColor(topic.category)
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = `${getCategoryColor(topic.category)}40`
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                <span style={{
                  padding: '0.25rem 0.75rem',
                  background: `${getCategoryColor(topic.category)}30`,
                  color: getCategoryColor(topic.category),
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  {topic.category}
                </span>
                <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>#{topic.id}</span>
              </div>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: 'white',
                marginBottom: '0.5rem',
                fontFamily: 'monospace'
              }}>
                {topic.title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#9ca3af', lineHeight: '1.5' }}>
                {topic.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PythonCombinations
