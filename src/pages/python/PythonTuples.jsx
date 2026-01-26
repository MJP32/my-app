import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import CompletionCheckbox from '../../components/CompletionCheckbox'
import Breadcrumb from '../../components/Breadcrumb'

function PythonTuples({ onBack, breadcrumb }) {
  const [selectedProblem, setSelectedProblem] = useState(null)
  const [showSolution, setShowSolution] = useState(false)

  const parseCodeSections = (codeString) => {
    const sections = codeString.split('\n\n')
    return sections.map((section, index) => ({
      id: index,
      code: section.trim()
    }))
  }

  const problems = [
    {
      id: 1,
      title: 'Tuple Creation and Immutability',
      difficulty: 'Easy',
      description: 'Understand tuple creation, immutability, and the difference between tuples and lists.',
      example: `# Create tuples in different ways
t1 = (1, 2, 3)           # Standard tuple
t2 = 1, 2, 3             # Tuple packing (no parentheses)
t3 = (1,)                # Single element tuple (comma required!)
t4 = (1)                 # This is an int, NOT a tuple
t5 = tuple([1, 2, 3])    # Convert list to tuple
empty = ()               # Empty tuple

# Immutability
t = (1, 2, 3)
# t[0] = 10  # TypeError: 'tuple' object does not support item assignment

# But if tuple contains mutable objects, those can be modified
t = ([1, 2], [3, 4])
t[0].append(5)  # OK: [1, 2, 5]
# t[0] = [10]   # Error: can't reassign tuple element`,
      testCases: [
        { input: '(1, 2, 3)', expected: 'Tuple with 3 elements' },
        { input: '(1,)', expected: 'Tuple with 1 element' },
        { input: '(1)', expected: 'Integer, not a tuple' }
      ],
      hints: [
        'Single element tuples MUST have a trailing comma: (1,)',
        'Tuples are immutable, but can contain mutable objects',
        'Tuple packing: a, b, c = 1, 2, 3 creates tuple (1, 2, 3)'
      ],
      solution: `def demonstrate_tuples():
    # Different ways to create tuples
    t1 = (1, 2, 3)
    t2 = 1, 2, 3          # Same as t1
    t3 = (1,)             # Single element tuple
    t4 = tuple([1, 2, 3]) # From list

    # Common mistake: forgetting comma for single element
    not_a_tuple = (1)     # This is int: 1
    is_a_tuple = (1,)     # This is tuple: (1,)

    # Immutability
    t = (1, 2, 3)
    try:
        t[0] = 10  # Will raise TypeError
    except TypeError:
        print("Can't modify tuple elements")

    # But mutable contents can change
    t = ([1, 2], [3, 4])
    t[0].append(5)  # OK: ([1, 2, 5], [3, 4])

    return t1, t3, is_a_tuple

# Time: O(1) for creation
# Space: O(n) where n is number of elements`,
      complexity: {
        time: 'O(1) for creation, O(n) for conversion from list',
        space: 'O(n) where n is the number of elements'
      }
    },
    {
      id: 2,
      title: 'Tuple Unpacking and Packing',
      difficulty: 'Easy',
      description: 'Master tuple packing, unpacking, and the * operator for extended unpacking.',
      example: `# Basic unpacking
x, y, z = (1, 2, 3)  # x=1, y=2, z=3

# Tuple packing
coords = 10, 20  # Creates tuple (10, 20)

# Extended unpacking with *
first, *middle, last = [1, 2, 3, 4, 5]
# first=1, middle=[2,3,4], last=5

# Swap variables (Python idiom)
a, b = 1, 2
a, b = b, a  # Swap: a=2, b=1

# Unpacking in function returns
def get_stats():
    return 100, 50, 75  # Return tuple

min_val, max_val, avg = get_stats()

# Underscore for ignored values
_, y, _ = (1, 2, 3)  # Only care about y=2`,
      testCases: [
        { input: 'a, b = 1, 2; a, b = b, a', expected: 'Swaps values' },
        { input: 'first, *rest, last = [1,2,3,4,5]', expected: 'first=1, rest=[2,3,4], last=5' }
      ],
      hints: [
        'Use * to capture multiple elements: first, *rest = [1, 2, 3, 4]',
        'Swapping: a, b = b, a (no temp variable needed)',
        'Use _ for values you want to ignore'
      ],
      solution: `def tuple_unpacking_examples():
    # Basic unpacking
    x, y, z = (1, 2, 3)

    # Extended unpacking
    numbers = [1, 2, 3, 4, 5]
    first, *middle, last = numbers
    # first=1, middle=[2,3,4], last=5

    # Swap variables
    a, b = 10, 20
    a, b = b, a  # a=20, b=10

    # Ignore values with _
    _, important, _ = (100, 200, 300)

    # Unpacking in loops
    pairs = [(1, 'a'), (2, 'b'), (3, 'c')]
    for num, letter in pairs:
        print(f"{num}: {letter}")

    # Nested unpacking
    (a, b), (c, d) = [(1, 2), (3, 4)]
    # a=1, b=2, c=3, d=4

    return first, middle, last

# Time: O(n) for unpacking n elements
# Space: O(1) (just variable assignments)`,
      complexity: {
        time: 'O(n) where n is number of elements being unpacked',
        space: 'O(1) for simple unpacking, O(k) if using * to capture k elements'
      }
    },
    {
      id: 3,
      title: 'Tuple Methods: count() and index()',
      difficulty: 'Easy',
      description: 'Use the two built-in tuple methods: count() and index().',
      example: `t = (1, 2, 3, 2, 4, 2, 5)

# count() - count occurrences of a value
count_2 = t.count(2)  # 3 occurrences of 2
count_9 = t.count(9)  # 0 (not found)

# index() - find first index of value
idx = t.index(2)      # 1 (first occurrence)
idx = t.index(2, 2)   # 3 (search starting from index 2)

# index() raises ValueError if not found
try:
    t.index(99)
except ValueError:
    print("Value not found")

# Common pattern: check before index
value = 2
if value in t:
    idx = t.index(value)
    print(f"Found at index {idx}")`,
      testCases: [
        { input: '(1, 2, 2, 3).count(2)', expected: '2' },
        { input: '(1, 2, 3).index(2)', expected: '1' },
        { input: '(1, 2, 3).index(99)', expected: 'ValueError' }
      ],
      hints: [
        'count() returns number of occurrences (never fails)',
        'index() raises ValueError if value not found',
        'Check with "in" operator before using index() to avoid errors'
      ],
      solution: `def tuple_methods():
    t = (1, 2, 3, 2, 4, 2, 5)

    # count() - safe, always returns int
    twos = t.count(2)      # 3
    missing = t.count(99)  # 0

    # index() - can raise ValueError
    first_two = t.index(2)       # 1
    second_two = t.index(2, 2)   # 3 (start search from index 2)

    # Safe index pattern
    value = 10
    idx = t.index(value) if value in t else -1

    # Find all indices of a value
    def find_all_indices(tup, value):
        indices = []
        for i, val in enumerate(tup):
            if val == value:
                indices.append(i)
        return indices

    all_twos = find_all_indices(t, 2)  # [1, 3, 5]

    return twos, first_two, all_twos

# count() - Time: O(n), Space: O(1)
# index() - Time: O(n), Space: O(1)`,
      complexity: {
        time: 'O(n) for both count() and index() - must scan the tuple',
        space: 'O(1) - no extra space used'
      }
    },
    {
      id: 4,
      title: 'Tuples as Dictionary Keys',
      difficulty: 'Medium',
      description: 'Use tuples as hashable dictionary keys (lists cannot be used as keys).',
      example: `# Tuples are hashable (immutable) → can be dict keys
# Lists are NOT hashable → cannot be dict keys

# Common use: coordinate mapping
grid = {}
grid[(0, 0)] = 'origin'
grid[(1, 0)] = 'right'
grid[(0, 1)] = 'up'

# Matrix element storage
matrix = {}
matrix[(0, 0)] = 1
matrix[(0, 1)] = 2
matrix[(1, 0)] = 3

# Multi-key dictionary
cache = {}
cache[('user123', 'profile')] = {'name': 'Alice'}
cache[('user123', 'settings')] = {'theme': 'dark'}

# WRONG: Lists as keys
# grid[[0, 0]] = 'origin'  # TypeError: unhashable type: 'list'

# visited set pattern (common in graph/grid problems)
visited = {(0, 0)}  # Set of tuples ✓
# visited = set((0, 0))  # WRONG! Creates {0} not {(0, 0)}`,
      testCases: [
        { input: 'd = {}; d[(1,2)] = "value"', expected: 'Valid - tuple is hashable' },
        { input: 'd[[1,2]] = "value"', expected: 'TypeError - list is not hashable' },
        { input: 'visited = {(0, 0)}', expected: 'Set containing tuple (0,0)' }
      ],
      hints: [
        'Only immutable/hashable types can be dict keys or set elements',
        'Tuples are hashable, lists are not',
        'Common pattern: visited = {(row, col)} for grid traversal'
      ],
      solution: `def tuples_as_keys():
    # Coordinate system using tuples
    grid = {
        (0, 0): 'start',
        (5, 3): 'treasure',
        (-1, 2): 'trap'
    }

    # Check if position exists
    pos = (5, 3)
    if pos in grid:
        print(f"Found: {grid[pos]}")

    # Graph adjacency with tuple keys
    graph = {
        ('A', 'B'): 5,   # Edge A→B with weight 5
        ('B', 'C'): 3,
        ('A', 'C'): 10
    }

    # Visited set pattern (BFS/DFS)
    visited = set()
    visited.add((0, 0))
    visited.add((1, 0))

    # CRITICAL: Set constructor pitfall
    wrong_visited = set((0, 0))    # {0} - unpacks tuple!
    correct_visited = {(0, 0)}     # {(0,0)} - set literal
    correct_visited2 = set([(0, 0)])  # {(0,0)} - list of tuples

    # Memoization with multiple parameters
    memo = {}
    def fibonacci(n, k):
        if (n, k) not in memo:
            memo[(n, k)] = n + k  # Simplified
        return memo[(n, k)]

    return grid, visited, memo

# Time: O(1) for dict/set operations with tuple keys
# Space: O(n) where n is number of keys`,
      complexity: {
        time: 'O(1) average for dict lookup/insert with tuple keys',
        space: 'O(n) for storing n key-value pairs'
      }
    },
    {
      id: 5,
      title: 'Tuple Comparison and Sorting',
      difficulty: 'Medium',
      description: 'Understand lexicographic tuple comparison and sorting of tuples.',
      example: `# Tuples compare lexicographically (left to right)
(1, 2) < (1, 3)      # True  (2 < 3)
(1, 2) < (2, 0)      # True  (1 < 2)
(1, 2, 3) < (1, 2)   # False (longer when equal prefix)

# Sorting tuples
points = [(2, 3), (1, 4), (2, 1), (1, 2)]
points.sort()  # [(1, 2), (1, 4), (2, 1), (2, 3)]

# Sort by second element
points.sort(key=lambda x: x[1])
# [(2, 1), (1, 2), (2, 3), (1, 4)]

# Sort by second, then first
points.sort(key=lambda x: (x[1], x[0]))

# Reverse order
points.sort(reverse=True)

# Sort with multiple criteria
students = [('Alice', 85), ('Bob', 90), ('Alice', 90)]
students.sort(key=lambda x: (-x[1], x[0]))
# Sort by score descending, then name ascending
# [('Bob', 90), ('Alice', 90), ('Alice', 85)]`,
      testCases: [
        { input: '(1, 2) < (1, 3)', expected: 'True' },
        { input: 'sorted([(2,1), (1,2)])', expected: '[(1, 2), (2, 1)]' },
        { input: 'sorted([(2,1), (1,2)], key=lambda x: x[1])', expected: '[(2, 1), (1, 2)]' }
      ],
      hints: [
        'Tuples compare element by element, left to right',
        'Use key parameter for custom sorting criteria',
        'Negative values in key for descending order'
      ],
      solution: `def tuple_comparison():
    # Lexicographic comparison
    print((1, 2) < (1, 3))    # True
    print((2, 0) < (1, 9))    # False (2 > 1)

    # Sorting points
    points = [(3, 1), (1, 2), (2, 1), (1, 3)]

    # Default sort (by first element, then second)
    sorted_points = sorted(points)
    # [(1, 2), (1, 3), (2, 1), (3, 1)]

    # Sort by distance from origin
    sorted_by_dist = sorted(points, key=lambda p: p[0]**2 + p[1]**2)

    # Sort by y-coordinate, then x-coordinate
    sorted_by_y_then_x = sorted(points, key=lambda p: (p[1], p[0]))
    # [(2, 1), (3, 1), (1, 2), (1, 3)]

    # Sort students by grade (desc), then name (asc)
    students = [
        ('Alice', 85),
        ('Bob', 90),
        ('Charlie', 85),
        ('Alice', 90)
    ]
    students.sort(key=lambda s: (-s[1], s[0]))
    # [('Alice', 90), ('Bob', 90), ('Alice', 85), ('Charlie', 85)]

    # Min/max with tuples
    min_point = min(points)  # (1, 2) - lexicographically smallest
    max_y = max(points, key=lambda p: p[1])  # (1, 3) - highest y

    return sorted_points, students

# Time: O(n log n) for sorting n tuples
# Space: O(n) for sorted result`,
      complexity: {
        time: 'O(n log n) for sorting, O(n) for comparison of n elements',
        space: 'O(n) for creating sorted list'
      }
    },
    {
      id: 6,
      title: 'Named Tuples',
      difficulty: 'Medium',
      description: 'Use namedtuple from collections for self-documenting tuples with named fields.',
      example: `from collections import namedtuple

# Define a named tuple type
Point = namedtuple('Point', ['x', 'y'])
Person = namedtuple('Person', ['name', 'age', 'city'])

# Create instances
p = Point(10, 20)
alice = Person('Alice', 30, 'NYC')

# Access by name (more readable)
print(p.x, p.y)           # 10 20
print(alice.name)         # Alice

# Still works like regular tuple
print(p[0], p[1])         # 10 20
x, y = p                  # Unpacking works

# Immutable (like regular tuples)
# p.x = 30  # AttributeError

# Convert to dict
print(alice._asdict())
# {'name': 'Alice', 'age': 30, 'city': 'NYC'}

# Replace values (creates new instance)
bob = alice._replace(name='Bob', age=25)

# Use in functions for clarity
def distance(p1: Point, p2: Point) -> float:
    return ((p1.x - p2.x)**2 + (p1.y - p2.y)**2)**0.5`,
      testCases: [
        { input: 'Point(10, 20).x', expected: '10' },
        { input: 'Point(10, 20)[0]', expected: '10' },
        { input: "Person('Alice', 30, 'NYC')._asdict()", expected: "{'name': 'Alice', 'age': 30, 'city': 'NYC'}" }
      ],
      hints: [
        'namedtuple creates a new class, not a function',
        'Named fields make code self-documenting',
        '_replace() creates new instance (tuples are immutable)'
      ],
      solution: `from collections import namedtuple

def named_tuple_examples():
    # Define named tuple types
    Point = namedtuple('Point', ['x', 'y'])
    Color = namedtuple('Color', ['r', 'g', 'b'])

    # Create instances
    p1 = Point(0, 0)
    p2 = Point(3, 4)
    red = Color(255, 0, 0)

    # Access by name (readable)
    distance = ((p2.x - p1.x)**2 + (p2.y - p1.y)**2)**0.5

    # Still works like tuple
    x, y = p2  # Unpacking
    print(p1[0])  # Index access

    # Convert to dict
    point_dict = p2._asdict()

    # Create from dict
    data = {'x': 10, 'y': 20}
    p3 = Point(**data)

    # Replace fields (immutable)
    p4 = p2._replace(x=10)  # Point(x=10, y=4)

    # Use in data structures
    points = [Point(1, 2), Point(3, 4), Point(5, 6)]

    # Sort by x-coordinate
    sorted_points = sorted(points, key=lambda p: p.x)

    # Good for function signatures
    def create_rectangle(top_left: Point, bottom_right: Point):
        return {
            'width': bottom_right.x - top_left.x,
            'height': bottom_right.y - top_left.y
        }

    return p1, p2, red, point_dict

# Time: O(1) for field access, same as regular tuples
# Space: O(1) per instance (same as regular tuples)`,
      complexity: {
        time: 'O(1) for field access and creation',
        space: 'O(1) per instance - same memory as regular tuples'
      }
    },
    {
      id: 7,
      title: 'Tuple Slicing and Concatenation',
      difficulty: 'Easy',
      description: 'Use slicing, concatenation, and repetition operations on tuples.',
      example: `t = (0, 1, 2, 3, 4, 5)

# Slicing (same as lists)
print(t[1:4])      # (1, 2, 3)
print(t[:3])       # (0, 1, 2)
print(t[3:])       # (3, 4, 5)
print(t[::2])      # (0, 2, 4) - every 2nd element
print(t[::-1])     # (5, 4, 3, 2, 1, 0) - reverse

# Concatenation
t1 = (1, 2)
t2 = (3, 4)
t3 = t1 + t2  # (1, 2, 3, 4)

# Repetition
t = (1, 2) * 3  # (1, 2, 1, 2, 1, 2)

# Length
len(t)  # 6

# Membership
2 in t  # True
10 in t  # False

# Min/Max
numbers = (5, 2, 8, 1, 9)
print(min(numbers))  # 1
print(max(numbers))  # 9`,
      testCases: [
        { input: '(1, 2, 3, 4)[1:3]', expected: '(2, 3)' },
        { input: '(1, 2) + (3, 4)', expected: '(1, 2, 3, 4)' },
        { input: '(1, 2) * 3', expected: '(1, 2, 1, 2, 1, 2)' }
      ],
      hints: [
        'Slicing returns a new tuple',
        'Concatenation (+) creates new tuple',
        'Repetition (*) duplicates elements'
      ],
      solution: `def tuple_operations():
    # Slicing
    t = (0, 1, 2, 3, 4, 5, 6, 7, 8, 9)

    first_half = t[:5]          # (0, 1, 2, 3, 4)
    second_half = t[5:]         # (5, 6, 7, 8, 9)
    every_other = t[::2]        # (0, 2, 4, 6, 8)
    reversed_t = t[::-1]        # (9, 8, 7, ..., 0)

    # Concatenation
    t1 = (1, 2, 3)
    t2 = (4, 5, 6)
    combined = t1 + t2          # (1, 2, 3, 4, 5, 6)

    # Repetition
    pattern = (0, 1) * 5        # (0, 1, 0, 1, 0, 1, 0, 1, 0, 1)

    # Build tuple incrementally (inefficient!)
    # BAD: Concatenation is O(n) each time
    result = ()
    for i in range(5):
        result = result + (i,)  # Creates new tuple each time!

    # BETTER: Use list, then convert
    result_list = []
    for i in range(5):
        result_list.append(i)   # O(1) append
    result = tuple(result_list)  # Convert once at end

    # Or use generator expression
    result = tuple(i for i in range(5))

    return first_half, combined, pattern

# Time: O(k) for slicing k elements, O(n+m) for concatenating tuples of size n and m
# Space: O(k) for slice result`,
      complexity: {
        time: 'O(k) for slicing k elements, O(n+m) for concatenation',
        space: 'O(result_size) - slicing and concatenation create new tuples'
      }
    },
    {
      id: 8,
      title: 'Tuple vs List: When to Use Each',
      difficulty: 'Medium',
      description: 'Understand when to use tuples vs lists based on semantics and performance.',
      example: `# TUPLES: Use for heterogeneous, fixed-structure data
# (different types, fixed size, immutable)

# Examples of good tuple use:
person = ('Alice', 30, 'Engineer')  # Fixed structure
point = (10, 20)                     # Coordinate pair
rgb = (255, 0, 128)                  # Color values
record = ('2024-01-01', 'login', 'user123')

# LISTS: Use for homogeneous, variable-length data
# (same type, can grow/shrink, mutable)

# Examples of good list use:
scores = [85, 92, 78, 90]           # Variable number of scores
names = ['Alice', 'Bob', 'Charlie']  # Can add/remove
tasks = ['email', 'meeting', 'code'] # Mutable collection

# Performance: Tuples are slightly faster
import timeit
tuple_time = timeit.timeit('x = (1, 2, 3)', number=1000000)
list_time = timeit.timeit('x = [1, 2, 3]', number=1000000)
# Tuples are ~15-20% faster for creation

# Memory: Tuples use less memory
import sys
sys.getsizeof((1, 2, 3))  # ~64 bytes
sys.getsizeof([1, 2, 3])  # ~88 bytes (extra overhead)

# Use tuples when:
# 1. Data shouldn't change (coordinates, RGB values)
# 2. Using as dict keys or set elements
# 3. Returning multiple values from functions
# 4. Representing database records

# Use lists when:
# 1. Need to modify data (add/remove/sort)
# 2. Working with homogeneous collections
# 3. Size may change
# 4. Need list methods (append, extend, pop, etc.)`,
      testCases: [
        { input: 'Coordinate (x, y)', expected: 'Use tuple - fixed structure' },
        { input: 'Shopping cart items', expected: 'Use list - variable size' },
        { input: 'RGB color', expected: 'Use tuple - immutable value' }
      ],
      hints: [
        'Tuples: fixed structure, immutable, hashable',
        'Lists: variable size, mutable, not hashable',
        'Tuples are faster and use less memory'
      ],
      solution: `def tuple_vs_list_guide():
    # TUPLE EXAMPLES (fixed structure, heterogeneous)

    # 1. Function returns (multiple values)
    def get_user_info():
        return ('Alice', 30, 'alice@example.com')  # Tuple

    name, age, email = get_user_info()

    # 2. Dictionary keys (must be hashable)
    locations = {
        (40.7128, -74.0060): 'New York',
        (34.0522, -118.2437): 'Los Angeles'
    }

    # 3. Database records (fixed schema)
    db_record = (1, 'Product A', 29.99, 'Electronics')

    # 4. Enum-like constant values
    STATUS_PENDING = ('pending', 0)
    STATUS_COMPLETE = ('complete', 1)

    # LIST EXAMPLES (variable size, homogeneous)

    # 1. Collections that grow/shrink
    shopping_cart = []
    shopping_cart.append('item1')
    shopping_cart.append('item2')
    shopping_cart.remove('item1')

    # 2. Data to be sorted/modified
    scores = [85, 92, 78, 90]
    scores.sort()
    scores.append(88)

    # 3. Queue/Stack operations
    queue = []
    queue.append(1)  # Enqueue
    item = queue.pop(0)  # Dequeue

    # 4. List comprehensions for filtering
    numbers = [1, 2, 3, 4, 5, 6]
    evens = [x for x in numbers if x % 2 == 0]

    # COMMON PATTERN: List of tuples
    # (mutable collection of immutable records)
    students = [
        ('Alice', 85),
        ('Bob', 92),
        ('Charlie', 78)
    ]
    students.append(('David', 90))  # Can add
    students.sort(key=lambda x: x[1])  # Can sort

    return locations, students

# Key Decision Points:
# - Need to modify? → List
# - Fixed structure? → Tuple
# - Dict key or set element? → Tuple (must be hashable)
# - Performance critical? → Tuple (faster, less memory)`,
      complexity: {
        time: 'Tuples: O(1) creation. Lists: O(n) for n elements',
        space: 'Tuples use ~25% less memory than equivalent lists'
      }
    },
    {
      id: 9,
      title: 'Common Tuple Patterns in Python',
      difficulty: 'Medium',
      description: 'Master common tuple patterns: multiple returns, swapping, defaultdict, and more.',
      example: `# Pattern 1: Multiple return values
def divide_with_remainder(a, b):
    return a // b, a % b

quotient, remainder = divide_with_remainder(17, 5)

# Pattern 2: Swapping without temp variable
a, b = 10, 20
a, b = b, a  # Swap

# Pattern 3: Parallel iteration with zip
names = ['Alice', 'Bob', 'Charlie']
scores = [85, 92, 78]

for name, score in zip(names, scores):
    print(f"{name}: {score}")

# Pattern 4: enumerate with tuples
items = ['apple', 'banana', 'cherry']
for index, item in enumerate(items):
    print(f"{index}: {item}")

# Pattern 5: Dictionary iteration
grades = {'Alice': 85, 'Bob': 92}
for name, grade in grades.items():
    print(f"{name}: {grade}")

# Pattern 6: Unpacking in function calls
def point_distance(x1, y1, x2, y2):
    return ((x2-x1)**2 + (y2-y1)**2)**0.5

p1 = (0, 0)
p2 = (3, 4)
dist = point_distance(*p1, *p2)  # Unpacking

# Pattern 7: Tuple for immutable constants
COLORS = (
    ('RED', '#FF0000'),
    ('GREEN', '#00FF00'),
    ('BLUE', '#0000FF')
)`,
      testCases: [
        { input: 'def f(): return 1, 2, 3', expected: 'Returns tuple (1, 2, 3)' },
        { input: 'a, b = b, a', expected: 'Swaps values' },
        { input: 'for i, x in enumerate([5,6,7]): ...', expected: 'Yields (0,5), (1,6), (2,7)' }
      ],
      hints: [
        'Multiple returns automatically create tuples',
        'zip() creates tuples of corresponding elements',
        'enumerate() yields (index, value) tuples'
      ],
      solution: `def common_tuple_patterns():
    # 1. Multiple returns
    def min_max_avg(numbers):
        return min(numbers), max(numbers), sum(numbers)/len(numbers)

    min_val, max_val, avg_val = min_max_avg([1, 2, 3, 4, 5])

    # 2. Swapping multiple variables
    a, b, c = 1, 2, 3
    a, b, c = c, a, b  # Rotate: a=3, b=1, c=2

    # 3. Parallel iteration
    names = ['Alice', 'Bob', 'Charlie']
    ages = [25, 30, 35]
    cities = ['NYC', 'LA', 'Chicago']

    for name, age, city in zip(names, ages, cities):
        print(f"{name}, {age}, from {city}")

    # 4. Enumerate for index + value
    words = ['hello', 'world', 'python']
    for i, word in enumerate(words, start=1):
        print(f"{i}. {word}")

    # 5. Dictionary unpacking in loops
    scores = {'Alice': 85, 'Bob': 92, 'Charlie': 78}
    for name, score in scores.items():
        if score >= 90:
            print(f"{name} got an A!")

    # 6. Sorting with tuple keys
    students = [
        ('Alice', 85, 'CS'),
        ('Bob', 92, 'Math'),
        ('Charlie', 85, 'CS')
    ]
    # Sort by score (desc), then name (asc)
    students.sort(key=lambda s: (-s[1], s[0]))

    # 7. Tuple unpacking in comprehensions
    pairs = [(1, 2), (3, 4), (5, 6)]
    sums = [x + y for x, y in pairs]  # [3, 7, 11]

    # 8. *args for variable arguments (received as tuple)
    def sum_all(*numbers):
        return sum(numbers)

    result = sum_all(1, 2, 3, 4, 5)  # numbers is (1,2,3,4,5)

    # 9. Divmod (built-in that returns tuple)
    quotient, remainder = divmod(17, 5)  # (3, 2)

    return students, sums, result

# Common idioms:
# - def f(): return x, y  # Return multiple values
# - a, b = b, a  # Swap
# - for i, x in enumerate(items)  # Index and value
# - for k, v in dict.items()  # Key and value
# - x, y = divmod(a, b)  # Quotient and remainder`,
      complexity: {
        time: 'O(n) for iteration patterns, O(1) for unpacking/swapping',
        space: 'O(1) for most patterns, O(n) for comprehensions'
      }
    },
    {
      id: 10,
      title: 'Generator Expressions (Tuple-Like)',
      difficulty: 'Medium',
      description: 'Use generator expressions (similar to tuple comprehensions) for memory efficiency.',
      example: `# List comprehension (creates full list in memory)
list_comp = [x**2 for x in range(1000000)]  # Uses lots of memory

# Generator expression (lazy evaluation)
gen_exp = (x**2 for x in range(1000000))  # Uses minimal memory

# Generator expressions use () but are NOT tuples!
gen = (x for x in range(5))  # Generator object
tup = tuple(gen)  # Convert to tuple: (0, 1, 2, 3, 4)

# Use cases for generators:

# 1. Large sequences
sum_of_squares = sum(x**2 for x in range(1000000))

# 2. One-time iteration
for val in (x**2 for x in range(10)):
    print(val)

# 3. Memory-efficient filtering
large_nums = (x for x in range(1000000) if x > 500000)

# 4. Passing to functions
max_square = max(x**2 for x in range(100))
any_even = any(x % 2 == 0 for x in range(100))

# Convert to tuple when needed
gen = (x**2 for x in range(5))
tup = tuple(gen)  # (0, 1, 4, 9, 16)

# Note: Generators are exhausted after one iteration
gen = (x for x in range(3))
list1 = list(gen)  # [0, 1, 2]
list2 = list(gen)  # [] - empty! Already consumed`,
      testCases: [
        { input: 'type((x for x in range(5)))', expected: '<class generator>' },
        { input: 'tuple(x**2 for x in range(5))', expected: '(0, 1, 4, 9, 16)' },
        { input: 'sum(x for x in range(5))', expected: '10' }
      ],
      hints: [
        'Generator expressions use () but are NOT tuples',
        'Generators are lazy - compute values on demand',
        'Convert to tuple with tuple() if you need multiple iterations'
      ],
      solution: `def generator_expressions():
    # List vs Generator memory comparison
    import sys

    # List comprehension - all in memory
    list_comp = [x**2 for x in range(1000)]
    print(f"List size: {sys.getsizeof(list_comp)} bytes")

    # Generator expression - lazy evaluation
    gen_exp = (x**2 for x in range(1000))
    print(f"Generator size: {sys.getsizeof(gen_exp)} bytes")
    # Generator is MUCH smaller!

    # Use generators for one-time iteration
    sum_squares = sum(x**2 for x in range(1000))

    # Use generators in functions
    max_val = max(x for x in range(100) if x % 7 == 0)
    any_large = any(x > 500 for x in range(1000))
    all_positive = all(x > 0 for x in range(1, 100))

    # Convert to tuple when multiple iterations needed
    gen = (x**2 for x in range(10))
    squares_tuple = tuple(gen)  # (0, 1, 4, 9, ..., 81)

    # Generator is exhausted after use
    gen = (x for x in range(3))
    first_list = list(gen)   # [0, 1, 2]
    second_list = list(gen)  # [] - empty!

    # Nested generator expressions
    matrix_gen = ((i, j) for i in range(3) for j in range(3))
    # Generates: (0,0), (0,1), (0,2), (1,0), (1,1), ...

    # Filter with generator
    large_evens = (x for x in range(1000000) if x % 2 == 0 and x > 500000)

    # Chain generators
    squares = (x**2 for x in range(10))
    filtered_squares = (x for x in squares if x > 20)

    return squares_tuple, sum_squares

# When to use generators vs tuples:
# - Generators: Large sequences, one-time iteration, memory efficiency
# - Tuples: Need multiple iterations, small fixed data, dict keys
# - Lists: Need to modify, index access, multiple iterations

# Memory: Generator is O(1), Tuple/List is O(n)
# Time: Similar for single iteration, but tuple allows re-iteration`,
      complexity: {
        time: 'O(n) to consume generator, same as list/tuple',
        space: 'O(1) for generator vs O(n) for list/tuple'
      }
    }
  ]

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return '#22c55e'
      case 'Medium': return '#f59e0b'
      case 'Hard': return '#ef4444'
      default: return '#6b7280'
    }
  }

  if (selectedProblem) {
    const problem = problems.find(p => p.id === selectedProblem)

    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #111827, #1e3a8a, #111827)',
        color: 'white',
        padding: '2rem'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <button
              onClick={() => {
                setSelectedProblem(null)
                setShowSolution(false)
              }}
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            >
              ← Back to Python
            </button>
            <button
              onClick={onBack}
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            >
              ← Back to Python
            </button>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '2px solid #3b82f6',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <h2 style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  background: 'linear-gradient(to right, #60a5fa, #22d3ee)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  margin: '0 0 1rem 0'
                }}>
                  {problem.title}
                </h2>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: getDifficultyColor(problem.difficulty),
                    color: 'white',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    borderRadius: '6px'
                  }}>
                    {problem.difficulty}
                  </span>
                  <div style={{ marginLeft: 'auto' }}>
                    <CompletionCheckbox problemId={`python-tuples-${problem.id}`} />
                  </div>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '1.1rem', color: '#d1d5db', lineHeight: '1.8', marginBottom: '2rem' }}>
              {problem.description}
            </p>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#93c5fd', marginBottom: '1rem' }}>
                Example:
              </h3>
              {parseCodeSections(problem.example).map(
                (section, idx) => (
                  <div key={section.id} style={{ marginBottom: '1rem' }}>
                    <div
                      style={{
                        width: '100%',
                        background: '#2563eb',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        marginBottom: '0.5rem',
                        textAlign: 'left',
                        fontWeight: '500',
                        fontSize: '1rem'
                      }}
                    >
                      Code Block {idx + 1}
                    </div>
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
                )
              )}
            </div>

            {problem.testCases && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#93c5fd', marginBottom: '1rem' }}>
                  Test Cases:
                </h3>
                {problem.testCases.map((tc, idx) => (
                  <div key={idx} style={{
                    backgroundColor: '#111827',
                    padding: '1rem',
                    borderRadius: '6px',
                    marginBottom: '0.75rem',
                    border: '1px solid #3b82f6'
                  }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong style={{ color: '#93c5fd' }}>Input:</strong>
                      <code style={{ marginLeft: '0.5rem', color: '#22d3ee' }}>{tc.input}</code>
                    </div>
                    <div>
                      <strong style={{ color: '#93c5fd' }}>Expected:</strong>
                      <code style={{ marginLeft: '0.5rem', color: '#10b981' }}>{tc.expected}</code>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#93c5fd', marginBottom: '1rem' }}>
                Hints:
              </h3>
              <ul style={{ paddingLeft: '1.5rem', color: '#d1d5db', lineHeight: '1.8' }}>
                {problem.hints.map((hint, idx) => (
                  <li key={idx} style={{ marginBottom: '0.5rem' }}>{hint}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setShowSolution(!showSolution)}
              style={{
                padding: '1rem 2rem',
                fontSize: '1.1rem',
                backgroundColor: showSolution ? '#dc2626' : '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                marginBottom: '2rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = showSolution ? '#b91c1c' : '#1d4ed8'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = showSolution ? '#dc2626' : '#2563eb'}
            >
              {showSolution ? 'Hide Solution' : 'Show Solution'}
            </button>

            {showSolution && (
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#93c5fd', marginBottom: '1rem' }}>
                  Solution:
                </h3>
                {parseCodeSections(problem.solution).map(
                  (section, idx) => (
                    <div key={section.id} style={{ marginBottom: '1rem' }}>
                      <div
                        style={{
                          width: '100%',
                          background: '#2563eb',
                          color: 'white',
                          padding: '0.5rem 1rem',
                          borderRadius: '0.5rem',
                          marginBottom: '0.5rem',
                          textAlign: 'left',
                          fontWeight: '500',
                          fontSize: '1rem'
                        }}
                      >
                        Code Block {idx + 1}
                      </div>
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
                  )
                )}

                <div style={{
                  backgroundColor: '#1f2937',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: '2px solid #3b82f6'
                }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#60a5fa', marginBottom: '0.75rem' }}>
                    Complexity Analysis:
                  </h4>
                  <div style={{ color: '#d1d5db', lineHeight: '1.8' }}>
                    <div><strong>Time Complexity:</strong> {problem.complexity.time}</div>
                    <div><strong>Space Complexity:</strong> {problem.complexity.space}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

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
              onClick={onBack}
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
              ← Back to Python
            </button>
            <h1 style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #60a5fa, #22d3ee)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              🎯 Python Tuples
            </h1>
          </div>
        </div>

        <Breadcrumb breadcrumb={breadcrumb} />

        <p style={{
          fontSize: '1.2rem',
          color: '#d1d5db',
          textAlign: 'left',
          marginBottom: '3rem',
          lineHeight: '1.8'
        }}>
          Master Python tuples: creation, unpacking, immutability, named tuples, and common patterns.
          Understand when to use tuples vs lists.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '1.5rem'
        }}>
          {problems.map((problem) => (
            <div
              key={problem.id}
              onClick={() => setSelectedProblem(problem.id)}
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#93c5fd',
                  margin: 0,
                  flex: 1
                }}>
                  {problem.id}. {problem.title}
                </h3>
                <span style={{
                  padding: '0.25rem 0.75rem',
                  backgroundColor: getDifficultyColor(problem.difficulty),
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  borderRadius: '4px',
                  marginLeft: '0.5rem',
                  whiteSpace: 'nowrap'
                }}>
                  {problem.difficulty}
                </span>
              </div>

              <p style={{
                fontSize: '0.95rem',
                color: '#d1d5db',
                lineHeight: '1.6',
                margin: 0
              }}>
                {problem.description}
              </p>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '1rem',
                paddingTop: '1rem',
                borderTop: '1px solid #3b82f6'
              }}>
                <CompletionCheckbox problemId={`python-tuples-${problem.id}`} />
                <span style={{
                  color: '#60a5fa',
                  fontSize: '0.9rem',
                  fontWeight: '600'
                }}>
                  Solve →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PythonTuples
