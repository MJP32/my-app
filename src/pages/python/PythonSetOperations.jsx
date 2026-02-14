import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

function PythonSetOperations({ onBack, breadcrumb }) {
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
      name: 'Set Creation & Basics',
      icon: '\uD83C\uDFAF',
      explanation: `**Core Concept:**
• Sets are unordered collections of unique, hashable elements
• Created with curly braces {} or the set() constructor
• Mutable: add(), remove(), discard(), pop(), clear()
• frozenset is the immutable variant (can be used as dict key or in other sets)
• Empty set MUST use set(), not {} (which creates an empty dict)

**Key Methods:**
• add(elem): Add element (no effect if already present)
• remove(elem): Remove element (raises KeyError if missing)
• discard(elem): Remove element (no error if missing)
• pop(): Remove and return an arbitrary element
• clear(): Remove all elements

**Set Properties:**
• Elements must be hashable (int, str, tuple of hashables)
• No duplicate elements - duplicates silently ignored
• Unordered - iteration order is not guaranteed
• Average O(1) for add, remove, and membership testing
• Cannot contain lists, dicts, or other sets (use frozenset)

**When to Use Sets:**
• Removing duplicates from a collection
• Fast membership testing (O(1) vs O(n) for lists)
• Mathematical set operations (union, intersection, etc.)
• Tracking seen elements in algorithms`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Creating sets
# ═══════════════════════════════════════════════════════════════
# From a literal
colors = {'red', 'green', 'blue'}
print(colors)          # {'red', 'green', 'blue'} (order may vary)
print(type(colors))    # <class 'set'>

# From set() constructor with any iterable
from_list = set([1, 2, 3, 2, 1])
print(from_list)       # {1, 2, 3}

from_string = set('hello')
print(from_string)     # {'h', 'e', 'l', 'o'} (duplicates removed)

from_tuple = set((10, 20, 30))
print(from_tuple)      # {10, 20, 30}

from_range = set(range(5))
print(from_range)      # {0, 1, 2, 3, 4}

# Duplicates are silently dropped
nums = {1, 2, 2, 3, 3, 3}
print(nums)            # {1, 2, 3}
print(len(nums))       # 3


# ═══════════════════════════════════════════════════════════════
# ✦ add / remove / discard
# ═══════════════════════════════════════════════════════════════
s = {1, 2, 3}

# add() — adds element, no-op if exists
s.add(4)
print(s)               # {1, 2, 3, 4}
s.add(2)               # no effect, 2 already present
print(s)               # {1, 2, 3, 4}

# remove() — raises KeyError if element is missing
s.remove(3)
print(s)               # {1, 2, 4}
try:
    s.remove(99)
except KeyError as e:
    print(f"KeyError: {e}")  # KeyError: 99

# discard() — safe remove, no error if missing
s.discard(4)
print(s)               # {1, 2}
s.discard(99)          # no error
print(s)               # {1, 2}

# pop() — remove and return arbitrary element
s = {10, 20, 30}
elem = s.pop()
print(f"Popped: {elem}, Remaining: {s}")

# clear() — remove all elements
s.clear()
print(s)               # set()
print(len(s))          # 0


# ═══════════════════════════════════════════════════════════════
# ✦ frozenset
# ═══════════════════════════════════════════════════════════════
# Immutable set — cannot add or remove elements
fs = frozenset([1, 2, 3, 2])
print(fs)              # frozenset({1, 2, 3})
print(type(fs))        # <class 'frozenset'>

# frozenset supports all read operations
print(1 in fs)         # True
print(len(fs))         # 3

# But NOT mutation
try:
    fs.add(4)
except AttributeError as e:
    print(f"Error: {e}")  # 'frozenset' object has no attribute 'add'

# Use case: frozenset as dict key (regular sets can't be keys)
cache = {}
cache[frozenset([1, 2, 3])] = "result_a"
cache[frozenset([4, 5])] = "result_b"
print(cache[frozenset([1, 2, 3])])  # "result_a"

# Use case: set of sets (regular sets can't contain sets)
set_of_sets = {frozenset([1, 2]), frozenset([3, 4])}
print(set_of_sets)


# ═══════════════════════════════════════════════════════════════
# ✦ Empty set gotcha
# ═══════════════════════════════════════════════════════════════
# WRONG: {} creates an empty DICT, not a set!
empty_braces = {}
print(type(empty_braces))   # <class 'dict'>  <-- NOT a set!

# CORRECT: use set() for empty set
empty_set = set()
print(type(empty_set))      # <class 'set'>
print(len(empty_set))       # 0

# Once there's at least one element, braces work fine
one_elem = {42}
print(type(one_elem))       # <class 'set'>

# Summary:
#   {}       -> empty dict
#   {1, 2}   -> set
#   set()    -> empty set
#   dict()   -> empty dict`
    },
    {
      name: 'Union & Intersection',
      icon: '\uD83D\uDD17',
      explanation: `**Union (all elements from both sets):**
• Operator: A | B
• Method: A.union(B)
• In-place: A |= B or A.update(B)
• Methods accept any iterable, operators require sets

**Intersection (elements common to both sets):**
• Operator: A & B
• Method: A.intersection(B)
• In-place: A &= B or A.intersection_update(B)
• Methods accept any iterable, operators require sets

**Key Differences:**
• Operators (|, &) require both operands to be sets
• Methods (.union(), .intersection()) accept any iterable as argument
• In-place operations modify the original set
• Non-in-place operations return a new set

**Multiple Sets:**
• Union: A | B | C or A.union(B, C)
• Intersection: A & B & C or A.intersection(B, C)
• Both support passing multiple arguments to the method

**Performance:**
• Union: O(len(A) + len(B))
• Intersection: O(min(len(A), len(B)))
• Methods iterate over the argument; operators use optimized C code`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Union (| and .union())
# ═══════════════════════════════════════════════════════════════
a = {1, 2, 3}
b = {3, 4, 5}

# Using | operator (both must be sets)
result = a | b
print(f"a | b = {result}")        # {1, 2, 3, 4, 5}

# Using .union() method (accepts any iterable)
result = a.union(b)
print(f"a.union(b) = {result}")   # {1, 2, 3, 4, 5}

# union() with non-set iterables
result = a.union([10, 20], (30, 40))
print(result)                      # {1, 2, 3, 10, 20, 30, 40}

# Original sets are unchanged
print(f"a = {a}")                  # {1, 2, 3}
print(f"b = {b}")                  # {3, 4, 5}

# Union with itself and empty set
print(a | a)                       # {1, 2, 3} (same set)
print(a | set())                   # {1, 2, 3} (identity)


# ═══════════════════════════════════════════════════════════════
# ✦ Intersection (& and .intersection())
# ═══════════════════════════════════════════════════════════════
a = {1, 2, 3, 4}
b = {2, 3, 4, 5}

# Using & operator (both must be sets)
result = a & b
print(f"a & b = {result}")              # {2, 3, 4}

# Using .intersection() method (accepts any iterable)
result = a.intersection(b)
print(f"a.intersection(b) = {result}")  # {2, 3, 4}

# intersection() with a list
result = a.intersection([2, 5, 7])
print(result)                           # {2}

# No common elements => empty set
c = {10, 20}
print(a & c)                            # set()

# Intersection with itself and empty set
print(a & a)                            # {1, 2, 3, 4} (same set)
print(a & set())                        # set() (empty)


# ═══════════════════════════════════════════════════════════════
# ✦ In-place operations
# ═══════════════════════════════════════════════════════════════
# update() / |= : union in-place (adds all elements from other)
s = {1, 2, 3}
s.update({3, 4, 5})
print(f"After update: {s}")        # {1, 2, 3, 4, 5}

s |= {6, 7}
print(f"After |= : {s}")          # {1, 2, 3, 4, 5, 6, 7}

# update() accepts multiple iterables
s = {1}
s.update([2, 3], {4, 5}, (6,))
print(f"Multi-update: {s}")        # {1, 2, 3, 4, 5, 6}

# intersection_update() / &= : intersection in-place
s = {1, 2, 3, 4, 5}
s.intersection_update({2, 3, 4, 6})
print(f"After intersection_update: {s}")  # {2, 3, 4}

s = {1, 2, 3, 4, 5}
s &= {3, 4, 5, 6}
print(f"After &= : {s}")                 # {3, 4, 5}


# ═══════════════════════════════════════════════════════════════
# ✦ Multiple sets
# ═══════════════════════════════════════════════════════════════
a = {1, 2, 3, 4}
b = {2, 3, 4, 5}
c = {3, 4, 5, 6}

# Union of multiple sets
all_union = a | b | c
print(f"a | b | c = {all_union}")         # {1, 2, 3, 4, 5, 6}

# Using method with multiple arguments
all_union = a.union(b, c)
print(f"a.union(b, c) = {all_union}")     # {1, 2, 3, 4, 5, 6}

# Intersection of multiple sets
common = a & b & c
print(f"a & b & c = {common}")            # {3, 4}

common = a.intersection(b, c)
print(f"a.intersection(b, c) = {common}") # {3, 4}

# Union/intersection of a list of sets
sets = [{1, 2, 3}, {2, 3, 4}, {3, 4, 5}]

# Union of all
from functools import reduce
total_union = reduce(lambda x, y: x | y, sets)
print(f"Union of all: {total_union}")     # {1, 2, 3, 4, 5}

# Intersection of all
total_inter = reduce(lambda x, y: x & y, sets)
print(f"Intersection of all: {total_inter}")  # {3}

# Using set methods with unpacking
total_union = set().union(*sets)
print(f"set().union(*sets): {total_union}")   # {1, 2, 3, 4, 5}`
    },
    {
      name: 'Difference & Symmetric Difference',
      icon: '\u2796',
      explanation: `**Difference (elements in A but not in B):**
• Operator: A - B
• Method: A.difference(B)
• In-place: A -= B or A.difference_update(B)
• Order matters: A - B != B - A (in general)

**Symmetric Difference (elements in either, but not both):**
• Operator: A ^ B
• Method: A.symmetric_difference(B)
• In-place: A ^= B or A.symmetric_difference_update(B)
• Order does NOT matter: A ^ B == B ^ A

**Relationship:**
• A ^ B == (A | B) - (A & B)
• A ^ B == (A - B) | (B - A)
• A - B == A & ~B (conceptually)

**Performance:**
• Difference: O(len(A)) for A - B
• Symmetric difference: O(len(A) + len(B))
• Methods accept any iterable as argument

**Practical Notes:**
• difference() accepts multiple arguments: A.difference(B, C)
• symmetric_difference() accepts only ONE argument
• For ^ operator with multiple sets: A ^ B ^ C (left to right)`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Difference (- and .difference())
# ═══════════════════════════════════════════════════════════════
a = {1, 2, 3, 4, 5}
b = {3, 4, 5, 6, 7}

# Using - operator
result = a - b
print(f"a - b = {result}")              # {1, 2}

result = b - a
print(f"b - a = {result}")              # {6, 7}

# Using .difference() method (accepts any iterable)
result = a.difference(b)
print(f"a.difference(b) = {result}")    # {1, 2}

# With a list
result = a.difference([3, 4, 10])
print(result)                            # {1, 2, 5}

# Difference with multiple sets
c = {1, 6}
result = a.difference(b, c)
print(f"a.difference(b, c) = {result}")  # {2} (remove b and c elements)

# Original sets unchanged
print(f"a = {a}")                        # {1, 2, 3, 4, 5}

# Edge cases
print(a - a)                             # set() (everything removed)
print(a - set())                         # {1, 2, 3, 4, 5} (nothing removed)
print(set() - a)                         # set()


# ═══════════════════════════════════════════════════════════════
# ✦ Symmetric difference (^ and .symmetric_difference())
# ═══════════════════════════════════════════════════════════════
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

# Using ^ operator — elements in either but NOT both
result = a ^ b
print(f"a ^ b = {result}")                            # {1, 2, 5, 6}

# Symmetric: order doesn't matter
print(f"b ^ a = {b ^ a}")                             # {1, 2, 5, 6}

# Using .symmetric_difference() method
result = a.symmetric_difference(b)
print(f"a.symmetric_difference(b) = {result}")        # {1, 2, 5, 6}

# Equivalent expressions
print(f"(a | b) - (a & b) = {(a | b) - (a & b)}")    # {1, 2, 5, 6}
print(f"(a - b) | (b - a) = {(a - b) | (b - a)}")    # {1, 2, 5, 6}

# Multiple sets with ^
c = {5, 6, 7, 8}
# Note: A ^ B ^ C means: first compute A ^ B, then result ^ C
result = a ^ b ^ c
print(f"a ^ b ^ c = {result}")                        # {1, 2, 7, 8}

# Edge cases
print(a ^ a)                                           # set() (all cancel out)
print(a ^ set())                                       # {1, 2, 3, 4}


# ═══════════════════════════════════════════════════════════════
# ✦ In-place variants
# ═══════════════════════════════════════════════════════════════
# difference_update() / -= : remove elements found in other set
s = {1, 2, 3, 4, 5}
s.difference_update({3, 4})
print(f"After difference_update: {s}")           # {1, 2, 5}

s = {1, 2, 3, 4, 5}
s -= {4, 5, 6}
print(f"After -= : {s}")                         # {1, 2, 3}

# Multiple arguments
s = {1, 2, 3, 4, 5}
s.difference_update({1}, {5}, [3])
print(f"Multi difference_update: {s}")           # {2, 4}

# symmetric_difference_update() / ^= : keep only non-shared
s = {1, 2, 3, 4}
s.symmetric_difference_update({3, 4, 5, 6})
print(f"After symmetric_difference_update: {s}") # {1, 2, 5, 6}

s = {1, 2, 3, 4}
s ^= {3, 4, 5, 6}
print(f"After ^= : {s}")                         # {1, 2, 5, 6}


# ═══════════════════════════════════════════════════════════════
# ✦ Practical examples
# ═══════════════════════════════════════════════════════════════
# Find items only in one inventory
warehouse_a = {'laptop', 'mouse', 'keyboard', 'monitor', 'webcam'}
warehouse_b = {'mouse', 'keyboard', 'headset', 'speaker'}

only_a = warehouse_a - warehouse_b
only_b = warehouse_b - warehouse_a
shared = warehouse_a & warehouse_b
all_unique = warehouse_a ^ warehouse_b

print(f"Only in A:     {only_a}")       # {'laptop', 'monitor', 'webcam'}
print(f"Only in B:     {only_b}")       # {'headset', 'speaker'}
print(f"In both:       {shared}")       # {'mouse', 'keyboard'}
print(f"Exclusive:     {all_unique}")   # {'laptop', 'monitor', 'webcam', 'headset', 'speaker'}

# Find new/removed items between versions
v1_features = {'auth', 'search', 'upload', 'export'}
v2_features = {'auth', 'search', 'upload', 'api', 'dashboard'}

added = v2_features - v1_features
removed = v1_features - v2_features
changed = v1_features ^ v2_features

print(f"Added:   {added}")     # {'api', 'dashboard'}
print(f"Removed: {removed}")   # {'export'}
print(f"Changed: {changed}")   # {'export', 'api', 'dashboard'}`
    },
    {
      name: 'Subset, Superset & Disjoint',
      icon: '\uD83D\uDCD0',
      explanation: `**Subset (all elements of A are in B):**
• Operator: A <= B (subset or equal)
• Method: A.issubset(B)
• Proper subset: A < B (subset AND not equal)

**Superset (A contains all elements of B):**
• Operator: A >= B (superset or equal)
• Method: A.issuperset(B)
• Proper superset: A > B (superset AND not equal)

**Disjoint (no common elements):**
• Method: A.isdisjoint(B)
• Equivalent to: len(A & B) == 0
• No operator form exists

**Key Rules:**
• Empty set is a subset of every set
• Every set is a subset of itself (A <= A is True)
• A < A is False (proper subset excludes equal)
• Every set is a superset of empty set
• Empty set is disjoint with every set

**Relationships:**
• A <= B implies B >= A
• A < B implies A <= B and A != B
• A.isdisjoint(B) implies len(A & B) == 0
• Not disjoint implies A & B is non-empty`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Subset checks
# ═══════════════════════════════════════════════════════════════
a = {1, 2, 3}
b = {1, 2, 3, 4, 5}

# <= operator (subset or equal)
print(f"a <= b: {a <= b}")              # True (a is subset of b)
print(f"b <= a: {b <= a}")              # False
print(f"a <= a: {a <= a}")              # True (every set is subset of itself)

# .issubset() method (accepts any iterable)
print(f"a.issubset(b): {a.issubset(b)}")        # True
print(f"a.issubset([1,2,3,4]): {a.issubset([1,2,3,4])}")  # True

# Practical check: are all required skills met?
required = {'python', 'sql'}
candidate = {'python', 'sql', 'java', 'docker'}
print(f"Meets requirements: {required.issubset(candidate)}")  # True

# Empty set is subset of everything
print(f"set() <= a: {set() <= a}")      # True
print(f"set() <= set(): {set() <= set()}")  # True


# ═══════════════════════════════════════════════════════════════
# ✦ Superset checks
# ═══════════════════════════════════════════════════════════════
a = {1, 2, 3, 4, 5}
b = {2, 3}

# >= operator (superset or equal)
print(f"a >= b: {a >= b}")              # True (a is superset of b)
print(f"b >= a: {b >= a}")              # False
print(f"a >= a: {a >= a}")              # True

# .issuperset() method (accepts any iterable)
print(f"a.issuperset(b): {a.issuperset(b)}")  # True
print(f"a.issuperset([1,2]): {a.issuperset([1,2])}")  # True

# Practical: does our inventory cover all orders?
inventory = {'widget', 'gadget', 'doohickey', 'thingamajig'}
order = {'widget', 'gadget'}
print(f"Can fulfill order: {inventory.issuperset(order)}")  # True

# Every set is superset of empty set
print(f"a >= set(): {a >= set()}")      # True


# ═══════════════════════════════════════════════════════════════
# ✦ Proper subset / superset
# ═══════════════════════════════════════════════════════════════
a = {1, 2, 3}
b = {1, 2, 3, 4, 5}
c = {1, 2, 3}

# < (proper subset: subset AND not equal)
print(f"a < b: {a < b}")    # True  (a is proper subset of b)
print(f"a < c: {a < c}")    # False (a equals c, not proper subset)
print(f"a < a: {a < a}")    # False (no set is proper subset of itself)

# > (proper superset: superset AND not equal)
print(f"b > a: {b > a}")    # True  (b is proper superset of a)
print(f"c > a: {c > a}")    # False (c equals a)
print(f"a > a: {a > a}")    # False

# Comparison summary
print("\\n--- Comparison Summary ---")
x = {1, 2}
y = {1, 2, 3}
z = {1, 2}
print(f"{{1,2}} <  {{1,2,3}} = {x < y}")    # True  (proper subset)
print(f"{{1,2}} <= {{1,2,3}} = {x <= y}")    # True  (subset)
print(f"{{1,2}} <= {{1,2}}   = {x <= z}")    # True  (equal counts)
print(f"{{1,2}} <  {{1,2}}   = {x < z}")     # False (not proper)
print(f"{{1,2,3}} >  {{1,2}} = {y > x}")     # True  (proper superset)
print(f"{{1,2,3}} >= {{1,2}} = {y >= x}")    # True  (superset)


# ═══════════════════════════════════════════════════════════════
# ✦ Disjoint check
# ═══════════════════════════════════════════════════════════════
a = {1, 2, 3}
b = {4, 5, 6}
c = {3, 4, 5}

# .isdisjoint() — no elements in common
print(f"a.isdisjoint(b): {a.isdisjoint(b)}")    # True  (no overlap)
print(f"a.isdisjoint(c): {a.isdisjoint(c)}")    # False (3 is common)
print(f"b.isdisjoint(c): {b.isdisjoint(c)}")    # False (4,5 common)

# isdisjoint() accepts any iterable
print(f"a.isdisjoint([10, 20]): {a.isdisjoint([10, 20])}")  # True

# Equivalent check (less efficient)
print(f"len(a & b) == 0: {len(a & b) == 0}")    # True

# Empty set is disjoint with everything
print(f"set().isdisjoint(a): {set().isdisjoint(a)}")  # True

# Practical: check if schedules conflict
monday_meetings = {'9am', '11am', '2pm'}
tuesday_meetings = {'10am', '1pm', '3pm'}
wednesday_meetings = {'9am', '2pm'}

print(f"Mon/Tue conflict: {not monday_meetings.isdisjoint(tuesday_meetings)}")  # False
print(f"Mon/Wed conflict: {not monday_meetings.isdisjoint(wednesday_meetings)}")  # True`
    },
    {
      name: 'Set Comprehensions',
      icon: '\uD83D\uDD04',
      explanation: `**Basic Syntax:**
• {expression for item in iterable}
• Creates a new set from an iterable with transformation
• Automatically deduplicates the results

**With Filtering:**
• {expression for item in iterable if condition}
• Only includes elements where condition is True
• Filter is applied before the expression

**Nested Comprehensions:**
• {expr for x in iter1 for y in iter2}
• Equivalent to nested for loops
• Outer loop first, inner loop second

**vs List Comprehension:**
• Set: {x for x in iterable} - uses curly braces, returns set
• List: [x for x in iterable] - uses square brackets, returns list
• Set automatically removes duplicates
• Set is unordered; list preserves insertion order
• Set elements must be hashable

**Performance:**
• Set comprehension: O(n) average for n elements
• Slightly slower than list comprehension due to hashing
• But membership testing is O(1) vs O(n) for lists
• Choose based on whether you need uniqueness or order`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Basic set comprehension
# ═══════════════════════════════════════════════════════════════
# Square of numbers
squares = {x**2 for x in range(10)}
print(f"Squares: {squares}")
# {0, 1, 4, 9, 16, 25, 36, 49, 64, 81}

# Lowercase all strings
words = ['Hello', 'WORLD', 'hello', 'Python', 'PYTHON']
unique_lower = {w.lower() for w in words}
print(f"Unique lowercase: {unique_lower}")
# {'hello', 'world', 'python'}

# First characters
names = ['Alice', 'Bob', 'Anna', 'Brian', 'Charlie', 'Amy']
initials = {name[0] for name in names}
print(f"Initials: {initials}")  # {'A', 'B', 'C'}

# Lengths of words (duplicates removed automatically)
texts = ['cat', 'dog', 'fish', 'ant', 'bear']
lengths = {len(w) for w in texts}
print(f"Word lengths: {lengths}")  # {3, 4}


# ═══════════════════════════════════════════════════════════════
# ✦ With filtering
# ═══════════════════════════════════════════════════════════════
# Even squares only
even_squares = {x**2 for x in range(20) if x % 2 == 0}
print(f"Even squares: {even_squares}")
# {0, 4, 16, 36, 64, 100, 144, 196, 256, 324}

# Vowels in a string
text = "Set comprehensions are powerful"
vowels = {ch.lower() for ch in text if ch.lower() in 'aeiou'}
print(f"Vowels used: {vowels}")  # {'e', 'o', 'a', 'i', 'u'}

# Positive numbers only
data = [3, -1, 4, -1, 5, -9, 2, 6, -5, 3]
positives = {x for x in data if x > 0}
print(f"Positive unique: {positives}")  # {2, 3, 4, 5, 6}

# Words longer than 3 characters
sentence = "the quick brown fox jumps over the lazy dog"
long_words = {w for w in sentence.split() if len(w) > 3}
print(f"Long words: {long_words}")
# {'quick', 'brown', 'jumps', 'over', 'lazy'}

# Multiple conditions
nums = range(100)
special = {n for n in nums if n % 3 == 0 if n % 5 == 0}
print(f"Divisible by 3 AND 5: {special}")
# {0, 15, 30, 45, 60, 75, 90}


# ═══════════════════════════════════════════════════════════════
# ✦ From other data
# ═══════════════════════════════════════════════════════════════
# From dictionary keys
scores = {'Alice': 90, 'Bob': 85, 'Charlie': 90, 'Diana': 85}
unique_scores = {v for v in scores.values()}
print(f"Unique scores: {unique_scores}")  # {85, 90}

# Passing students
passing = {name for name, score in scores.items() if score >= 90}
print(f"Passing: {passing}")  # {'Alice', 'Charlie'}

# From nested lists (flatten and deduplicate)
matrix = [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
all_elements = {elem for row in matrix for elem in row}
print(f"All unique elements: {all_elements}")  # {1, 2, 3, 4, 5}

# Unique file extensions
files = ['main.py', 'app.js', 'test.py', 'style.css', 'index.js', 'utils.py']
extensions = {f.split('.')[-1] for f in files}
print(f"Extensions: {extensions}")  # {'py', 'js', 'css'}

# From tuples (extract unique second elements)
pairs = [(1, 'a'), (2, 'b'), (3, 'a'), (4, 'c'), (5, 'b')]
unique_second = {p[1] for p in pairs}
print(f"Unique second: {unique_second}")  # {'a', 'b', 'c'}


# ═══════════════════════════════════════════════════════════════
# ✦ vs list comprehension
# ═══════════════════════════════════════════════════════════════
data = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]

# List comprehension: preserves order and duplicates
list_result = [x**2 for x in data]
print(f"List: {list_result}")
# [1, 4, 4, 9, 9, 9, 16, 16, 16, 16]

# Set comprehension: removes duplicates, unordered
set_result = {x**2 for x in data}
print(f"Set:  {set_result}")
# {1, 4, 9, 16}

# When to use each:
# - List: need order, allow duplicates, any element type
# - Set: need uniqueness, fast lookup, hashable elements

# Performance comparison for membership testing
import time
big_list = [x for x in range(100000)]
big_set = {x for x in range(100000)}

target = 99999
# List lookup: O(n)
start = time.perf_counter()
for _ in range(1000):
    _ = target in big_list
list_time = time.perf_counter() - start

# Set lookup: O(1)
start = time.perf_counter()
for _ in range(1000):
    _ = target in big_set
set_time = time.perf_counter() - start

print(f"List lookup: {list_time:.4f}s")
print(f"Set lookup:  {set_time:.4f}s")
print(f"Set is ~{list_time/set_time:.0f}x faster for membership testing")`
    },
    {
      name: 'Common Patterns',
      icon: '\uD83E\uDDE9',
      explanation: `**Remove Duplicates:**
• list(set(items)) - fast but loses order
• list(dict.fromkeys(items)) - preserves order (Python 3.7+)
• Manual with seen set - preserves order, most explicit

**Fast Membership Testing (O(1)):**
• Convert list to set for repeated lookups
• Use set for allowlists/blocklists
• Dramatically faster than list for large collections

**Finding Common / Unique Elements:**
• Intersection for common elements between groups
• Difference for elements unique to one group
• Symmetric difference for non-shared elements

**Set-Based Algorithms:**
• Two-sum variants using set complement
• Finding missing numbers
• Detecting duplicates
• Graph algorithms (visited nodes)
• Sliding window with uniqueness constraints

**Tips:**
• Sets use ~8x more memory than lists per element
• Prefer sets when uniqueness or fast lookup is needed
• Convert to set once, query many times
• frozenset for sets that shouldn't change`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Remove duplicates
# ═══════════════════════════════════════════════════════════════
# Method 1: set() — fastest, but loses order
items = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]
unique = list(set(items))
print(f"set():          {unique}")       # order not guaranteed

# Method 2: dict.fromkeys() — preserves insertion order (3.7+)
unique_ordered = list(dict.fromkeys(items))
print(f"dict.fromkeys(): {unique_ordered}")  # [3, 1, 4, 5, 9, 2, 6]

# Method 3: manual seen-set — preserves order, most explicit
def deduplicate(seq):
    seen = set()
    result = []
    for item in seq:
        if item not in seen:
            seen.add(item)
            result.append(item)
    return result

print(f"manual:          {deduplicate(items)}")  # [3, 1, 4, 5, 9, 2, 6]

# Deduplicate objects by a key
people = [
    {'name': 'Alice', 'dept': 'Eng'},
    {'name': 'Bob', 'dept': 'Sales'},
    {'name': 'Alice', 'dept': 'Eng'},   # duplicate
    {'name': 'Charlie', 'dept': 'Eng'},
]
seen_names = set()
unique_people = []
for p in people:
    if p['name'] not in seen_names:
        seen_names.add(p['name'])
        unique_people.append(p)
print(f"Unique people: {[p['name'] for p in unique_people]}")
# ['Alice', 'Bob', 'Charlie']


# ═══════════════════════════════════════════════════════════════
# ✦ Fast membership testing
# ═══════════════════════════════════════════════════════════════
# BAD: O(n) lookup each time with a list
banned_list = ['spam', 'phishing', 'malware', 'adware']

# GOOD: O(1) lookup with a set
banned_set = {'spam', 'phishing', 'malware', 'adware'}

# Filtering with set membership
emails = ['hello@test.com', 'spam@bad.com', 'info@site.com']
categories = ['normal', 'spam', 'normal']

clean = [e for e, c in zip(emails, categories) if c not in banned_set]
print(f"Clean emails: {clean}")

# Allowlist pattern
VALID_STATUS = {'active', 'pending', 'completed', 'archived'}

def validate_status(status):
    if status not in VALID_STATUS:
        raise ValueError(f"Invalid status: {status}. Must be one of {VALID_STATUS}")
    return True

print(validate_status('active'))    # True
try:
    validate_status('deleted')
except ValueError as e:
    print(e)

# Two-sum using set complement
def two_sum_exists(nums, target):
    """Check if any two numbers sum to target - O(n)"""
    seen = set()
    for n in nums:
        complement = target - n
        if complement in seen:
            return True
        seen.add(n)
    return False

print(two_sum_exists([2, 7, 11, 15], 9))   # True (2+7)
print(two_sum_exists([2, 7, 11, 15], 10))  # False


# ═══════════════════════════════════════════════════════════════
# ✦ Finding unique / common
# ═══════════════════════════════════════════════════════════════
# Students in different classes
math_class = {'Alice', 'Bob', 'Charlie', 'Diana', 'Eve'}
science_class = {'Bob', 'Diana', 'Frank', 'Grace'}
art_class = {'Alice', 'Charlie', 'Frank', 'Hank'}

# Students taking both math AND science
both = math_class & science_class
print(f"Math AND Science: {both}")     # {'Bob', 'Diana'}

# Students taking math OR science (at least one)
either = math_class | science_class
print(f"Math OR Science: {either}")    # All names from both

# Students taking math but NOT science
math_only = math_class - science_class
print(f"Math only: {math_only}")       # {'Alice', 'Charlie', 'Eve'}

# Students in exactly one of math/science (not both)
exclusive = math_class ^ science_class
print(f"Exactly one: {exclusive}")

# Students taking ALL three classes
all_three = math_class & science_class & art_class
print(f"All three: {all_three}")       # set() (no one takes all three)

# Students taking at least two classes
from itertools import combinations
classes = [math_class, science_class, art_class]
at_least_two = set()
for c1, c2 in combinations(classes, 2):
    at_least_two |= (c1 & c2)
print(f"At least 2 classes: {at_least_two}")

# Find missing numbers in range
def find_missing(nums, n):
    """Find numbers missing from range [1, n]"""
    return set(range(1, n + 1)) - set(nums)

print(find_missing([1, 2, 4, 6, 7], 7))  # {3, 5}


# ═══════════════════════════════════════════════════════════════
# ✦ Set algebra in practice
# ═══════════════════════════════════════════════════════════════
# Longest substring without repeating characters
def longest_unique_substring(s):
    """Sliding window with set for O(n) solution"""
    char_set = set()
    left = 0
    max_len = 0
    for right in range(len(s)):
        while s[right] in char_set:
            char_set.discard(s[left])
            left += 1
        char_set.add(s[right])
        max_len = max(max_len, right - left + 1)
    return max_len

print(longest_unique_substring("abcabcbb"))  # 3 ("abc")
print(longest_unique_substring("bbbbb"))     # 1 ("b")
print(longest_unique_substring("pwwkew"))    # 3 ("wke")

# Count distinct elements in sliding window
def distinct_in_windows(arr, k):
    """Count distinct elements in each window of size k"""
    from collections import Counter
    window = Counter(arr[:k])
    result = [len(window)]
    for i in range(k, len(arr)):
        window[arr[i]] += 1
        window[arr[i - k]] -= 1
        if window[arr[i - k]] == 0:
            del window[arr[i - k]]
        result.append(len(window))
    return result

print(distinct_in_windows([1, 2, 1, 3, 4, 2, 3], 4))
# [3, 4, 4, 3] — windows: [1,2,1,3],[2,1,3,4],[1,3,4,2],[3,4,2,3]

# Graph BFS with visited set
def bfs(graph, start):
    """Breadth-first search using set for O(1) visited checks"""
    visited = set()
    queue = [start]
    visited.add(start)
    order = []
    while queue:
        node = queue.pop(0)
        order.append(node)
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return order

graph = {'A': ['B', 'C'], 'B': ['D', 'E'], 'C': ['F'], 'D': [], 'E': [], 'F': []}
print(f"BFS order: {bfs(graph, 'A')}")  # ['A', 'B', 'C', 'D', 'E', 'F']`
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
                background: '#059669',
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
                e.currentTarget.style.background = '#047857'
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#059669'
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            >
              {'\u2190'} {selectedConcept !== null ? 'Back to Concepts' : 'Back to Python Topics'}
            </button>
            <h1 style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #059669, #10b981)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Set Operations
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
          primaryColor={'#059669'}
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
                border: '2px solid #059669',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#10b981'
                e.currentTarget.style.transform = 'translateY(-0.5rem)'
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(5, 150, 105, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#059669'
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
                Click to explore set operations concepts
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
              border: '2px solid #059669',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}>
              <div style={{
                position: 'sticky',
                top: '0',
                background: 'linear-gradient(to right, #059669, #047857)',
                padding: '1.5rem',
                borderTopLeftRadius: '0.75rem',
                borderTopRightRadius: '0.75rem',
                borderBottom: '2px solid #10b981',
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
                  border: '1px solid #059669'
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
                  border: '1px solid #059669'
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

export default PythonSetOperations
