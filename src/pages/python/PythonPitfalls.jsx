import { useState } from 'react'

function PythonPitfalls({ onBack }) {
  const [selectedPitfall, setSelectedPitfall] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const pitfalls = [
    {
      id: 'set-tuple-confusion',
      title: 'Set Constructor vs Set Literal with Tuples',
      category: 'Sets & Tuples',
      severity: 'High',
      description: 'Using set() with a tuple unpacks it, but {} creates a set with the tuple as an element.',
      wrongCode: `# WRONG: Creates set of individual elements from tuple
visited = set((0, 0))   # Unpacks tuple → {0}
print(visited)          # {0} ← NOT what you want!

# WRONG: This also doesn't work as expected
coords = set((1, 2, 3))
print(coords)           # {1, 2, 3} - lost the tuple structure`,
      correctCode: `# CORRECT: Creates set containing ONE tuple element
visited = {(0, 0)}      # {(0, 0)} ✓
print(visited)          # {(0, 0)}

# CORRECT: Use curly braces for set literal
coords = {(1, 2, 3)}
print(coords)           # {(1, 2, 3)}

# CORRECT: Add more tuples
visited.add((1, 1))
visited.add((2, 2))
print(visited)          # {(0, 0), (1, 1), (2, 2)}

# CORRECT: If you must use set(), wrap in list
visited = set([(0, 0)])  # {(0, 0)} ✓`,
      explanation: `The set() constructor iterates over its argument. When you pass a tuple to set(), it unpacks the tuple and creates a set of its elements. Use set literal syntax {} when you want to create a set containing tuples.

Common use case: Graph traversal, coordinate tracking
- visited = {(0, 0)} → Set of one coordinate
- visited = set((0, 0)) → Set of two numbers: {0}`,
      relatedPatterns: [
        'Use {(x, y)} for coordinate sets',
        'Use set([(x, y)]) if you must use set()',
        'Remember: set(iterable) unpacks the iterable'
      ]
    },
    {
      id: 'mutable-default-args',
      title: 'Mutable Default Arguments',
      category: 'Functions',
      severity: 'High',
      description: 'Default arguments are evaluated once at function definition, not each call.',
      wrongCode: `# WRONG: Default list is shared across all calls
def add_item(item, items=[]):
    items.append(item)
    return items

print(add_item(1))  # [1]
print(add_item(2))  # [1, 2] ← Unexpected!
print(add_item(3))  # [1, 2, 3] ← All calls share same list!`,
      correctCode: `# CORRECT: Use None as default, create new list inside
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items

print(add_item(1))  # [1]
print(add_item(2))  # [2] ✓
print(add_item(3))  # [3] ✓

# Each call gets a fresh list`,
      explanation: `Python evaluates default arguments once when the function is defined, not each time it's called. If the default is mutable (list, dict, set), all calls share the same object.

Rule: Never use mutable objects as default arguments. Use None instead and create the mutable object inside the function.`,
      relatedPatterns: [
        'Always use None for mutable defaults',
        'Create new instances inside function body',
        'Same applies to dicts, sets, and custom objects'
      ]
    },
    {
      id: 'loop-variable-closure',
      title: 'Loop Variable Closure in Lambdas',
      category: 'Closures',
      severity: 'Medium',
      description: 'Lambda functions capture variables by reference, not by value.',
      wrongCode: `# WRONG: All lambdas reference the same 'i'
funcs = []
for i in range(5):
    funcs.append(lambda: i)

# All return 4 (last value of i)
print(funcs[0]())  # 4 ← Expected 0!
print(funcs[1]())  # 4 ← Expected 1!
print(funcs[2]())  # 4 ← Expected 2!`,
      correctCode: `# CORRECT: Use default argument to capture value
funcs = []
for i in range(5):
    funcs.append(lambda x=i: x)

print(funcs[0]())  # 0 ✓
print(funcs[1]())  # 1 ✓
print(funcs[2]())  # 2 ✓

# ALSO CORRECT: Use functools.partial
from functools import partial
funcs = [partial(lambda x: x, i) for i in range(5)]

# ALSO CORRECT: List comprehension creates new scope
funcs = [lambda x=i: x for i in range(5)]`,
      explanation: `Lambda functions (and nested functions) capture variables by reference. When the loop ends, all lambdas reference the same variable with its final value.

Solution: Use default arguments (which are evaluated at definition time) to capture the current value.`,
      relatedPatterns: [
        'Use lambda x=i: x to capture loop variable',
        'List comprehensions create implicit closure',
        'Same issue affects nested def functions'
      ]
    },
    {
      id: 'is-vs-equals',
      title: 'is vs == Comparison',
      category: 'Comparisons',
      severity: 'Medium',
      description: 'is checks identity (same object), == checks equality (same value).',
      wrongCode: `# WRONG: Using 'is' for value comparison
a = [1, 2, 3]
b = [1, 2, 3]
print(a is b)  # False - different objects!

# WRONG: Works accidentally for small integers
x = 5
y = 5
print(x is y)  # True - Python caches small ints (happens to work)

# But breaks for larger numbers
x = 1000
y = 1000
print(x is y)  # False (or True in REPL!) - unpredictable!`,
      correctCode: `# CORRECT: Use == for value comparison
a = [1, 2, 3]
b = [1, 2, 3]
print(a == b)  # True ✓

# CORRECT: Use 'is' only for None, True, False
x = None
if x is None:  # Correct ✓
    print("x is None")

# CORRECT: Check if same object
a = [1, 2, 3]
b = a  # b points to same object
print(a is b)  # True ✓
print(a == b)  # True ✓`,
      explanation: `'is' checks if two variables point to the same object in memory (identity). '==' checks if two objects have the same value (equality).

Use 'is' only for: None, True, False (singleton objects)
Use '==' for: Everything else (value comparison)

Note: Python caches small integers (-5 to 256), so 'is' may work accidentally but will fail for larger numbers.`,
      relatedPatterns: [
        'Always use "is None" not "== None"',
        'Use == for all other comparisons',
        'is checks object identity, not value'
      ]
    },
    {
      id: 'float-equality',
      title: 'Float Comparison Issues',
      category: 'Numbers',
      severity: 'Medium',
      description: 'Floating point arithmetic has precision issues, avoid direct equality checks.',
      wrongCode: `# WRONG: Direct float comparison
print(0.1 + 0.2 == 0.3)  # False!
print(0.1 + 0.2)         # 0.30000000000000004

# WRONG: Accumulation errors
total = 0.0
for _ in range(10):
    total += 0.1
print(total == 1.0)  # False!`,
      correctCode: `# CORRECT: Use math.isclose()
import math
print(math.isclose(0.1 + 0.2, 0.3))  # True ✓

# CORRECT: Specify tolerance
result = 0.1 + 0.2
expected = 0.3
print(abs(result - expected) < 1e-9)  # True ✓

# CORRECT: Use Decimal for precision
from decimal import Decimal
a = Decimal('0.1')
b = Decimal('0.2')
print(a + b == Decimal('0.3'))  # True ✓`,
      explanation: `Floating point numbers are stored in binary and cannot represent all decimal values exactly. This leads to small rounding errors.

Never use == with floats. Always use:
1. math.isclose() with default or custom tolerance
2. Manual tolerance check: abs(a - b) < epsilon
3. Decimal type for exact decimal arithmetic`,
      relatedPatterns: [
        'Use math.isclose() for float comparison',
        'Use Decimal for money/financial calculations',
        'Understand IEEE 754 floating point limitations'
      ]
    },
    {
      id: 'late-binding-closure',
      title: 'Late Binding in Closures',
      category: 'Closures',
      severity: 'Medium',
      description: 'Closures look up variable values when called, not when defined.',
      wrongCode: `# WRONG: x is looked up when function is called
x = 10
def foo():
    print(x)  # References outer x

x = 20
foo()  # Prints 20, not 10!

# WRONG: All functions share same 'i'
funcs = []
for i in range(3):
    def func():
        return i
    funcs.append(func)

print([f() for f in funcs])  # [2, 2, 2] ← All return 2!`,
      correctCode: `# CORRECT: Use default argument to capture value
funcs = []
for i in range(3):
    def func(x=i):  # Capture current value
        return x
    funcs.append(func)

print([f() for f in funcs])  # [0, 1, 2] ✓

# CORRECT: Use partial
from functools import partial
def identity(x):
    return x
funcs = [partial(identity, i) for i in range(3)]

# CORRECT: Create factory function
def make_func(x):
    def func():
        return x
    return func
funcs = [make_func(i) for i in range(3)]`,
      explanation: `Python uses late binding for closures - variables in nested functions are looked up when the inner function is called, not when it's defined.

This means the inner function sees the current value of the variable, not its value at definition time.

Solutions:
1. Use default arguments (evaluated at definition time)
2. Use factory functions to create new scope
3. Use functools.partial`,
      relatedPatterns: [
        'Default arguments capture values at definition',
        'Factory functions create new scopes',
        'Same issue as loop variable closure'
      ]
    },
    {
      id: 'dict-keys-order',
      title: 'Dictionary Iteration Order',
      category: 'Dictionaries',
      severity: 'Low',
      description: 'In Python 3.7+, dicts maintain insertion order. But don\'t rely on it for older code.',
      wrongCode: `# WRONG: Relying on order in Python < 3.7
d = {'c': 3, 'a': 1, 'b': 2}
print(list(d.keys()))  # Order unpredictable in Python < 3.7

# WRONG: Assuming sorted order
d = {3: 'three', 1: 'one', 2: 'two'}
for k in d:
    print(k)  # 3, 1, 2 (insertion order, not sorted)`,
      correctCode: `# CORRECT: Explicit OrderedDict for clarity
from collections import OrderedDict
d = OrderedDict([('c', 3), ('a', 1), ('b', 2)])
print(list(d.keys()))  # ['c', 'a', 'b'] - guaranteed order

# CORRECT: Sort if you need sorted order
d = {3: 'three', 1: 'one', 2: 'two'}
for k in sorted(d):
    print(k)  # 1, 2, 3 ✓

# Python 3.7+: Dicts maintain insertion order
d = {'c': 3, 'a': 1, 'b': 2}
print(list(d.keys()))  # ['c', 'a', 'b'] - insertion order ✓`,
      explanation: `Python 3.7+ guarantees dictionary insertion order as part of the language spec. Before 3.7, dict order was implementation-dependent.

Best practices:
1. If order matters and you support Python < 3.7, use OrderedDict
2. If you need sorted order, explicitly sort keys
3. Don't rely on hash order for any logic`,
      relatedPatterns: [
        'Use OrderedDict for explicit ordering',
        'Use sorted(dict) for sorted iteration',
        'Python 3.7+ maintains insertion order'
      ]
    },
    {
      id: 'string-concatenation',
      title: 'Inefficient String Concatenation',
      category: 'Performance',
      severity: 'Medium',
      description: 'Repeated string concatenation is O(n²) because strings are immutable.',
      wrongCode: `# WRONG: O(n²) time complexity
result = ""
for i in range(1000):
    result += str(i)  # Creates new string each time!

# WRONG: Same issue in loop
s = ""
for word in ["hello", "world", "python"]:
    s = s + " " + word  # Inefficient`,
      correctCode: `# CORRECT: Use join() - O(n)
result = "".join(str(i) for i in range(1000))

# CORRECT: Build list, then join
parts = []
for i in range(1000):
    parts.append(str(i))
result = "".join(parts)

# CORRECT: Use f-strings or list comprehension
words = ["hello", "world", "python"]
result = " ".join(words)  # Much faster

# For very large strings, use io.StringIO
from io import StringIO
buffer = StringIO()
for i in range(1000):
    buffer.write(str(i))
result = buffer.getvalue()`,
      explanation: `Strings are immutable in Python. Each += creates a new string object and copies all previous content. With n concatenations, this is O(n²) time.

join() is O(n) because it:
1. Calculates total size needed
2. Allocates memory once
3. Copies all strings in one pass

Use join() for multiple concatenations, += for 2-3 strings.`,
      relatedPatterns: [
        'Use "".join(list) for multiple strings',
        'Use io.StringIO for very large builds',
        'f-strings are fine for 2-3 concatenations'
      ]
    },
    {
      id: 'list-copy-pitfall',
      title: 'Shallow vs Deep Copy',
      category: 'Lists',
      severity: 'High',
      description: 'Copying a list only creates a shallow copy - nested objects are still shared.',
      wrongCode: `# WRONG: Nested lists are shared
matrix = [[0] * 3] * 3  # Creates 3 references to SAME list
matrix[0][0] = 1
print(matrix)  # [[1, 0, 0], [1, 0, 0], [1, 0, 0]] ← All rows changed!

# WRONG: Shallow copy doesn't help with nested lists
original = [[1, 2], [3, 4]]
copied = original.copy()  # or original[:]
copied[0][0] = 999
print(original)  # [[999, 2], [3, 4]] ← Original changed!`,
      correctCode: `# CORRECT: Create separate lists
matrix = [[0] * 3 for _ in range(3)]  # Each row is separate
matrix[0][0] = 1
print(matrix)  # [[1, 0, 0], [0, 0, 0], [0, 0, 0]] ✓

# CORRECT: Deep copy for nested structures
import copy
original = [[1, 2], [3, 4]]
copied = copy.deepcopy(original)
copied[0][0] = 999
print(original)  # [[1, 2], [3, 4]] ✓ Unchanged

# CORRECT: Manual nested comprehension
original = [[1, 2], [3, 4]]
copied = [row[:] for row in original]`,
      explanation: `Python's * operator and copy()/[:] create shallow copies. For nested structures, inner objects are still shared references.

Shallow copy: Copies first level only
Deep copy: Recursively copies all levels

Use copy.deepcopy() for nested lists, dicts, or objects.
Use list comprehension for 2D lists.`,
      relatedPatterns: [
        'Use [[0] * cols for _ in range(rows)] for 2D lists',
        'Use copy.deepcopy() for nested structures',
        'Remember: * repeats references, not values'
      ]
    },
    {
      id: 'truthiness-gotchas',
      title: 'Truthiness and Falsy Values',
      category: 'Conditionals',
      severity: 'Low',
      description: 'Many values are falsy in Python - empty containers, 0, None, False, "".',
      wrongCode: `# WRONG: Empty list is falsy
def get_data():
    return []  # Valid empty result

result = get_data()
if not result:  # Treats empty list as error
    print("Error!")  # Prints unexpectedly!

# WRONG: 0 is falsy
count = 0
if not count:  # True when count is 0
    print("No items")  # Misleading for valid 0`,
      correctCode: `# CORRECT: Explicit None check
def get_data():
    return []  # or return None on error

result = get_data()
if result is None:  # Explicit check
    print("Error!")

# CORRECT: Check for specific condition
count = 0
if count == 0:  # Explicit comparison
    print("No items")

# Falsy values in Python:
# None, False, 0, 0.0, '', [], {}, set()
# Everything else is truthy

# CORRECT: Use 'if x is not None' when 0 is valid
def find_index(item, lst):
    return lst.index(item) if item in lst else None

idx = find_index('a', ['a', 'b'])  # Returns 0
if idx is not None:  # Correct ✓
    print(f"Found at {idx}")`,
      explanation: `Python has many falsy values beyond False and None. Empty containers ([]{}''), zero (0, 0.0), and empty string ('') are all falsy.

This can cause bugs when:
- Empty list/dict is a valid result
- 0 is a valid value (index, count)
- Empty string is meaningful

Use explicit comparisons when falsy values are valid results.`,
      relatedPatterns: [
        'Use "is None" for None checks',
        'Use "== 0" when 0 is valid',
        'Use "len(x) == 0" to be explicit about empty'
      ]
    },
    {
      id: 'dict-get-pitfall',
      title: 'dict.get() Default Value',
      category: 'Dictionaries',
      severity: 'Low',
      description: 'dict.get() returns None by default, which may not be what you want.',
      wrongCode: `# WRONG: None is not always the best default
counts = {}
item = 'apple'
count = counts.get(item)  # Returns None
count += 1  # TypeError: unsupported operand type(s)

# WRONG: Mutable default
cache = {}
result = cache.get(key, [])  # Same list shared!
result.append(value)  # Modifies shared default`,
      correctCode: `# CORRECT: Specify appropriate default
counts = {}
item = 'apple'
count = counts.get(item, 0)  # Returns 0 if missing ✓
count += 1  # Works!

# CORRECT: Use setdefault for mutable defaults
cache = {}
result = cache.setdefault(key, [])  # Creates new list in dict
result.append(value)  # Modifies dict entry ✓

# CORRECT: Use defaultdict
from collections import defaultdict
counts = defaultdict(int)  # Default 0
counts['apple'] += 1  # Works! ✓

cache = defaultdict(list)  # Default empty list
cache[key].append(value)  # Works! ✓`,
      explanation: `dict.get(key) returns None if key doesn't exist. This is often not the right default value.

Better approaches:
1. dict.get(key, default) - Specify explicit default
2. dict.setdefault(key, default) - Sets and returns default
3. defaultdict - Automatically creates defaults

Note: get(key, []) creates a new list each call, but it's not added to dict. Use setdefault() to both get and set.`,
      relatedPatterns: [
        'Use get(key, 0) for counters',
        'Use setdefault() to modify default',
        'Use defaultdict for automatic defaults'
      ]
    }
  ]

  const categories = [...new Set(pitfalls.map(p => p.category))]
  const severities = ['High', 'Medium', 'Low']

  const filteredPitfalls = pitfalls.filter(pitfall =>
    pitfall.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pitfall.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleBackClick = () => {
    if (selectedPitfall) {
      setSelectedPitfall(null)
    } else {
      onBack()
    }
  }

  if (selectedPitfall) {
    return (
      <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', backgroundColor: '#fef2f2', minHeight: '100vh' }}>
        <button
          onClick={handleBackClick}
          style={{
            marginBottom: '1.5rem',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#3776ab',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          ← Back to Pitfalls
        </button>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '2.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          {/* Header */}
          <div style={{ marginBottom: '2rem', borderBottom: '2px solid #fee2e2', paddingBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
              <h1 style={{ margin: 0, color: '#991b1b', fontSize: '2rem' }}>{selectedPitfall.title}</h1>
              <span style={{
                padding: '0.25rem 0.75rem',
                backgroundColor: selectedPitfall.severity === 'High' ? '#fee2e2' : selectedPitfall.severity === 'Medium' ? '#fef3c7' : '#dbeafe',
                color: selectedPitfall.severity === 'High' ? '#991b1b' : selectedPitfall.severity === 'Medium' ? '#92400e' : '#1e40af',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                {selectedPitfall.severity} Severity
              </span>
              <span style={{
                padding: '0.25rem 0.75rem',
                backgroundColor: '#e0e7ff',
                color: '#3730a3',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                {selectedPitfall.category}
              </span>
            </div>
            <p style={{ color: '#64748b', fontSize: '1.1rem', margin: '0.5rem 0 0 0' }}>
              {selectedPitfall.description}
            </p>
          </div>

          {/* Wrong Code */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#991b1b', marginBottom: '0.75rem', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>❌</span> Wrong Code (Common Mistake)
            </h3>
            <pre style={{
              backgroundColor: '#7f1d1d',
              color: '#fef2f2',
              padding: '1.5rem',
              borderRadius: '8px',
              overflow: 'auto',
              fontSize: '0.875rem',
              lineHeight: '1.6',
              margin: 0,
              border: '2px solid #dc2626'
            }}>
              <code>{selectedPitfall.wrongCode}</code>
            </pre>
          </div>

          {/* Correct Code */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#166534', marginBottom: '0.75rem', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>✅</span> Correct Code (Best Practice)
            </h3>
            <pre style={{
              backgroundColor: '#14532d',
              color: '#f0fdf4',
              padding: '1.5rem',
              borderRadius: '8px',
              overflow: 'auto',
              fontSize: '0.875rem',
              lineHeight: '1.6',
              margin: 0,
              border: '2px solid #16a34a'
            }}>
              <code>{selectedPitfall.correctCode}</code>
            </pre>
          </div>

          {/* Explanation */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#1e293b', marginBottom: '0.75rem', fontSize: '1.25rem' }}>Why This Happens</h3>
            <div style={{
              backgroundColor: '#fef3c7',
              padding: '1.5rem',
              borderRadius: '8px',
              borderLeft: '4px solid #f59e0b',
              whiteSpace: 'pre-line',
              lineHeight: '1.6',
              color: '#78350f'
            }}>
              {selectedPitfall.explanation}
            </div>
          </div>

          {/* Related Patterns */}
          <div>
            <h3 style={{ color: '#1e293b', marginBottom: '0.75rem', fontSize: '1.25rem' }}>Remember</h3>
            <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
              {selectedPitfall.relatedPatterns.map((pattern, idx) => (
                <li key={idx} style={{
                  color: '#475569',
                  marginBottom: '0.5rem',
                  lineHeight: '1.6',
                  fontSize: '0.95rem',
                  fontWeight: '500'
                }}>
                  {pattern}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', backgroundColor: '#fef2f2', minHeight: '100vh' }}>
      <button
        onClick={handleBackClick}
        style={{
          marginBottom: '1.5rem',
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          backgroundColor: '#3776ab',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: '600'
        }}
      >
        ← Back to Python Topics
      </button>

      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: '0 0 0.5rem 0', color: '#991b1b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>⚠️</span> Python Common Pitfalls & Gotchas
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem', margin: 0 }}>
          Learn about common Python mistakes and how to avoid them with correct patterns
        </p>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Search pitfalls... (e.g., 'set', 'mutable', 'closure')"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            fontSize: '1rem',
            border: '2px solid #fee2e2',
            borderRadius: '8px',
            outline: 'none'
          }}
          onFocus={(e) => e.target.style.borderColor = '#dc2626'}
          onBlur={(e) => e.target.style.borderColor = '#fee2e2'}
        />
      </div>

      {/* Severity Filter */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {severities.map((sev) => {
          const count = pitfalls.filter(p => p.severity === sev).length
          return (
            <div key={sev} style={{
              padding: '0.5rem 1rem',
              backgroundColor: sev === 'High' ? '#fee2e2' : sev === 'Medium' ? '#fef3c7' : '#dbeafe',
              color: sev === 'High' ? '#991b1b' : sev === 'Medium' ? '#92400e' : '#1e40af',
              borderRadius: '6px',
              fontSize: '0.875rem',
              fontWeight: '600'
            }}>
              {sev} ({count})
            </div>
          )
        })}
      </div>

      {/* Pitfalls Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
        gap: '1.5rem'
      }}>
        {filteredPitfalls.map((pitfall) => (
          <div
            key={pitfall.id}
            onClick={() => setSelectedPitfall(pitfall)}
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'all 0.2s',
              border: '2px solid',
              borderColor: pitfall.severity === 'High' ? '#fca5a5' : pitfall.severity === 'Medium' ? '#fcd34d' : '#93c5fd'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'
              e.currentTarget.style.borderColor = pitfall.severity === 'High' ? '#dc2626' : pitfall.severity === 'Medium' ? '#f59e0b' : '#3b82f6'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'
              e.currentTarget.style.borderColor = pitfall.severity === 'High' ? '#fca5a5' : pitfall.severity === 'Medium' ? '#fcd34d' : '#93c5fd'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, color: '#1e293b', fontSize: '1.125rem', flex: 1 }}>{pitfall.title}</h3>
              <span style={{
                padding: '0.25rem 0.5rem',
                backgroundColor: pitfall.severity === 'High' ? '#fee2e2' : pitfall.severity === 'Medium' ? '#fef3c7' : '#dbeafe',
                color: pitfall.severity === 'High' ? '#991b1b' : pitfall.severity === 'Medium' ? '#92400e' : '#1e40af',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: '600',
                whiteSpace: 'nowrap',
                marginLeft: '0.5rem'
              }}>
                {pitfall.severity}
              </span>
            </div>
            <div style={{
              padding: '0.5rem 0.75rem',
              backgroundColor: '#f8fafc',
              borderRadius: '6px',
              marginBottom: '0.75rem'
            }}>
              <span style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: '600' }}>
                {pitfall.category}
              </span>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>
              {pitfall.description}
            </p>
          </div>
        ))}
      </div>

      {filteredPitfalls.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          color: '#94a3b8',
          fontSize: '1.1rem'
        }}>
          No pitfalls found matching "{searchTerm}"
        </div>
      )}
    </div>
  )
}

export default PythonPitfalls
