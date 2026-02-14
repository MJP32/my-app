import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

function BuiltinFunctions({ onBack, breadcrumb }) {
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
      name: 'any() & all()',
      icon: '✅',
      explanation: `**Core Concept:**
• any(iterable) — returns True if ANY element is truthy
• all(iterable) — returns True if ALL elements are truthy
• Both short-circuit: stop iterating as soon as result is determined
• Return True for empty iterables (all) or False (any)
• Work with any iterable: lists, sets, generators, etc.

**Truth Table:**
• any([]) → False (no truthy elements)
• any([0, '', None]) → False (all falsy)
• any([0, 1, '']) → True (1 is truthy)
• all([]) → True (vacuously true)
• all([1, 'a', True]) → True (all truthy)
• all([1, 0, True]) → False (0 is falsy)

**Short-Circuit Behavior:**
• any() stops at first truthy value
• all() stops at first falsy value
• Use generators for lazy evaluation and early exit

**Common Patterns:**
• Validation: all(condition(x) for x in items)
• Search: any(match(x) for x in items)
• Combine with map/filter for complex checks`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ any() — True if ANY element is truthy
# ═══════════════════════════════════════════════════════════════
# Basic usage
print(any([False, False, True]))    # True
print(any([0, 0, 0]))              # False (0 is falsy)
print(any([0, 1, 0]))              # True  (1 is truthy)
print(any([]))                      # False (empty iterable)
print(any([None, '', 0, [], {}]))  # False (all falsy types)
print(any([None, '', 0, 'hello'])) # True  ('hello' is truthy)

# With generator expression (preferred — lazy evaluation)
nums = [2, 4, 6, 8, 10]
has_odd = any(n % 2 != 0 for n in nums)
print(has_odd)  # False

words = ['hello', 'world', 'Python']
has_upper = any(w[0].isupper() for w in words)
print(has_upper)  # True (Python starts with uppercase)

# Check if any file exists
import os
files = ['config.json', 'settings.yaml', '.env']
has_config = any(os.path.exists(f) for f in files)


# ═══════════════════════════════════════════════════════════════
# ✦ all() — True if ALL elements are truthy
# ═══════════════════════════════════════════════════════════════
# Basic usage
print(all([True, True, True]))     # True
print(all([True, False, True]))    # False
print(all([1, 2, 3]))             # True  (non-zero = truthy)
print(all([]))                     # True  (vacuously true!)

# Validation: check all items meet a condition
scores = [85, 92, 78, 95, 88]
all_passing = all(s >= 70 for s in scores)
print(f"All passing: {all_passing}")  # True

ages = [25, 17, 30, 22]
all_adults = all(a >= 18 for a in ages)
print(f"All adults: {all_adults}")  # False (17 {'<'} 18)

# Validate a password
password = "Str0ng!Pass"
checks = [
    len(password) >= 8,
    any(c.isupper() for c in password),
    any(c.islower() for c in password),
    any(c.isdigit() for c in password),
    any(c in '!@#$%^&*' for c in password)
]
is_valid = all(checks)
print(f"Password valid: {is_valid}")  # True


# ═══════════════════════════════════════════════════════════════
# ✦ Short-circuit behavior
# ═══════════════════════════════════════════════════════════════
# any() stops at first truthy value
def check(x):
    print(f"  Checking {x}")
    return x > 5

print("any() short-circuits:")
result = any(check(x) for x in [1, 2, 10, 3, 20])
# Prints: Checking 1, Checking 2, Checking 10 → stops!
print(f"  Result: {result}")  # True

# all() stops at first falsy value
print("all() short-circuits:")
result = all(check(x) for x in [10, 20, 3, 30])
# Prints: Checking 10, Checking 20, Checking 3 → stops!
print(f"  Result: {result}")  # False

# Performance tip: put likely-to-fail checks first in all()
# put likely-to-succeed checks first in any()


# ═══════════════════════════════════════════════════════════════
# ✦ Practical patterns with any() and all()
# ═══════════════════════════════════════════════════════════════
# Check if a matrix has any zero row
matrix = [[1, 2, 3], [0, 0, 0], [7, 8, 9]]
has_zero_row = any(all(v == 0 for v in row) for row in matrix)
print(f"Has zero row: {has_zero_row}")  # True

# Check if all strings are non-empty
fields = {"name": "Alice", "email": "a@b.com", "phone": "123"}
all_filled = all(fields.values())
print(f"All filled: {all_filled}")  # True

fields["phone"] = ""
all_filled = all(fields.values())
print(f"All filled: {all_filled}")  # False (empty string is falsy)

# Check if any element appears in both lists
list_a = [1, 2, 3, 4]
list_b = [5, 6, 3, 7]
has_common = any(x in list_b for x in list_a)
print(f"Has common: {has_common}")  # True (3)

# Equivalent to: bool(set(list_a) & set(list_b))`
    },
    {
      name: 'enumerate() & zip()',
      icon: '🔢',
      explanation: `**enumerate(iterable, start=0):**
• Returns (index, element) pairs
• start parameter sets the starting index
• Essential for loops needing both index and value
• More Pythonic than range(len(...))

**zip(*iterables):**
• Pairs elements from multiple iterables
• Stops at shortest iterable (use zip_longest for all)
• Can zip any number of iterables
• zip(*zipped) to unzip

**Key Properties:**
• Both return iterators (lazy evaluation)
• Both are memory efficient — don't create lists in memory
• Can be converted to list/dict/tuple as needed

**Common Patterns:**
• enumerate: numbered loops, building indexed dicts
• zip: parallel iteration, dict creation, transpose matrices`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ enumerate() — index + value pairs
# ═══════════════════════════════════════════════════════════════
fruits = ['apple', 'banana', 'cherry', 'date']

# Basic usage
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")
# 0: apple, 1: banana, 2: cherry, 3: date

# Custom start index
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}. {fruit}")
# 1. apple, 2. banana, 3. cherry, 4. date

# Anti-pattern vs Pythonic
# BAD:  for i in range(len(fruits)): print(fruits[i])
# GOOD: for i, fruit in enumerate(fruits): print(fruit)

# Build a lookup dict: value → index
index_map = {v: i for i, v in enumerate(fruits)}
print(index_map)  # {'apple': 0, 'banana': 1, 'cherry': 2, 'date': 3}

# Find index of first match
data = [10, 20, 30, 40, 50]
idx = next((i for i, v in enumerate(data) if v > 25), -1)
print(f"First > 25 at index: {idx}")  # 2


# ═══════════════════════════════════════════════════════════════
# ✦ zip() — pair elements from multiple iterables
# ═══════════════════════════════════════════════════════════════
names = ['Alice', 'Bob', 'Charlie']
ages = [30, 25, 35]
cities = ['NYC', 'LA', 'Chicago']

# Pair two lists
for name, age in zip(names, ages):
    print(f"{name} is {age}")

# Zip three lists
for name, age, city in zip(names, ages, cities):
    print(f"{name}, {age}, {city}")

# Create dict from two lists
name_age = dict(zip(names, ages))
print(name_age)  # {'Alice': 30, 'Bob': 25, 'Charlie': 35}

# Stops at shortest iterable
short = [1, 2]
long = [10, 20, 30, 40]
print(list(zip(short, long)))  # [(1, 10), (2, 20)]


# ═══════════════════════════════════════════════════════════════
# ✦ zip_longest and unzipping
# ═══════════════════════════════════════════════════════════════
from itertools import zip_longest

# zip_longest pads with fillvalue (default None)
a = [1, 2, 3]
b = ['x', 'y']
print(list(zip_longest(a, b, fillvalue='-')))
# [(1, 'x'), (2, 'y'), (3, '-')]

# Unzip with zip(*...)
pairs = [('Alice', 30), ('Bob', 25), ('Charlie', 35)]
names, ages = zip(*pairs)
print(names)  # ('Alice', 'Bob', 'Charlie')
print(ages)   # (30, 25, 35)

# Transpose a matrix
matrix = [[1, 2, 3],
          [4, 5, 6],
          [7, 8, 9]]
transposed = list(zip(*matrix))
print(transposed)  # [(1, 4, 7), (2, 5, 8), (3, 6, 9)]


# ═══════════════════════════════════════════════════════════════
# ✦ Combining enumerate() and zip()
# ═══════════════════════════════════════════════════════════════
names = ['Alice', 'Bob', 'Charlie']
scores = [95, 87, 92]

# Numbered pairs
for i, (name, score) in enumerate(zip(names, scores), 1):
    print(f"{i}. {name}: {score}")
# 1. Alice: 95
# 2. Bob: 87
# 3. Charlie: 92

# Compare adjacent elements
data = [10, 20, 15, 30, 25]
for prev, curr in zip(data, data[1:]):
    change = "up" if curr > prev else "down"
    print(f"{prev} → {curr} ({change})")
# 10 → 20 (up), 20 → 15 (down), 15 → 30 (up), 30 → 25 (down)

# Sliding window of size n
def windows(lst, n):
    return zip(*(lst[i:] for i in range(n)))

print(list(windows([1,2,3,4,5], 3)))
# [(1,2,3), (2,3,4), (3,4,5)]`
    },
    {
      name: 'isinstance() & type()',
      icon: '🔍',
      explanation: `**type(obj):**
• Returns the exact type/class of an object
• type(name, bases, dict) — creates new type dynamically
• Use for exact type matching only

**isinstance(obj, classinfo):**
• Returns True if obj is an instance of classinfo
• Supports inheritance: checks parent classes too
• classinfo can be a tuple of types (OR logic)
• Preferred over type() for type checking

**issubclass(class, classinfo):**
• Returns True if class is a subclass of classinfo
• Works with class objects, not instances

**Key Differences:**
• type(x) == int — exact match only, ignores inheritance
• isinstance(x, int) — includes subclasses (preferred)
• Duck typing preferred over type checking in Python

**Falsy Values by Type:**
• int: 0, float: 0.0, str: '', list: [], dict: {}
• tuple: (), set: set(), bool: False, None`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ type() — get exact type of an object
# ═══════════════════════════════════════════════════════════════
print(type(42))          # {'<'}class 'int'>
print(type(3.14))        # {'<'}class 'float'>
print(type("hello"))     # {'<'}class 'str'>
print(type([1, 2]))      # {'<'}class 'list'>
print(type({'a': 1}))    # {'<'}class 'dict'>
print(type((1, 2)))      # {'<'}class 'tuple'>
print(type({1, 2}))      # {'<'}class 'set'>
print(type(True))        # {'<'}class 'bool'>
print(type(None))        # {'<'}class 'NoneType'>
print(type(len))         # {'<'}class 'builtin_function_or_method'>

# Compare types directly
x = 42
print(type(x) == int)      # True
print(type(x) == float)    # False

# type() ignores inheritance
print(type(True) == int)   # False! (bool is subclass of int)
print(type(True) == bool)  # True


# ═══════════════════════════════════════════════════════════════
# ✦ isinstance() — preferred type checking (respects inheritance)
# ═══════════════════════════════════════════════════════════════
print(isinstance(42, int))         # True
print(isinstance(3.14, float))     # True
print(isinstance("hi", str))       # True
print(isinstance([1,2], list))     # True

# Respects inheritance!
print(isinstance(True, int))       # True! (bool inherits from int)
print(isinstance(True, bool))      # True

# Check against multiple types (tuple = OR)
def process(value):
    if isinstance(value, (int, float)):
        return value * 2
    elif isinstance(value, str):
        return value.upper()
    elif isinstance(value, (list, tuple)):
        return len(value)
    return None

print(process(5))           # 10
print(process(3.14))        # 6.28
print(process("hello"))     # HELLO
print(process([1, 2, 3]))   # 3

# With Abstract Base Classes
from collections.abc import Iterable, Mapping, Sequence
print(isinstance([1,2], Iterable))    # True
print(isinstance("abc", Sequence))    # True
print(isinstance({}, Mapping))        # True
print(isinstance(42, Iterable))       # False


# ═══════════════════════════════════════════════════════════════
# ✦ issubclass() — check class hierarchy
# ═══════════════════════════════════════════════════════════════
print(issubclass(bool, int))        # True  (bool extends int)
print(issubclass(int, float))       # False
print(issubclass(str, object))      # True  (everything extends object)

class Animal: pass
class Dog(Animal): pass
class Puppy(Dog): pass

print(issubclass(Dog, Animal))      # True
print(issubclass(Puppy, Animal))    # True  (transitive)
print(issubclass(Animal, Dog))      # False

# Check multiple base classes
print(issubclass(bool, (int, str)))  # True (is subclass of int)


# ═══════════════════════════════════════════════════════════════
# ✦ Type conversion functions
# ═══════════════════════════════════════════════════════════════
# int() — convert to integer
print(int("42"))         # 42
print(int(3.99))         # 3  (truncates, doesn't round!)
print(int("1010", 2))    # 10 (binary to int)
print(int("ff", 16))     # 255 (hex to int)
print(int(True))         # 1

# float() — convert to float
print(float("3.14"))     # 3.14
print(float("inf"))      # inf
print(float(42))         # 42.0

# str() — convert to string
print(str(42))           # '42'
print(str([1, 2, 3]))    # '[1, 2, 3]'
print(str(None))         # 'None'

# bool() — convert to boolean (truthy/falsy)
print(bool(0))           # False
print(bool(1))           # True
print(bool(""))          # False
print(bool("hello"))     # True
print(bool([]))          # False
print(bool([0]))         # True (non-empty list!)
print(bool(None))        # False`
    },
    {
      name: 'getattr() & hasattr()',
      icon: '📦',
      explanation: `**getattr(obj, name, default):**
• Returns the value of named attribute of object
• Raises AttributeError if not found (unless default given)
• Equivalent to obj.name but with string attribute name
• Enables dynamic/programmatic attribute access

**setattr(obj, name, value):**
• Sets attribute on object: equivalent to obj.name = value
• Creates attribute if it doesn't exist

**hasattr(obj, name):**
• Returns True if object has the named attribute
• Internally calls getattr and checks for AttributeError
• Useful for duck typing checks

**delattr(obj, name):**
• Deletes named attribute from object
• Equivalent to del obj.name

**Common Use Cases:**
• Dynamic dispatch (call method by name string)
• Configuration objects
• Plugin systems and factory patterns
• Serialization / deserialization`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ getattr() — dynamic attribute access
# ═══════════════════════════════════════════════════════════════
class User:
    def __init__(self, name, age, email):
        self.name = name
        self.age = age
        self.email = email

user = User("Alice", 30, "alice@example.com")

# Access attributes by string name
print(getattr(user, "name"))     # Alice
print(getattr(user, "age"))      # 30

# With default value (prevents AttributeError)
print(getattr(user, "phone", "N/A"))  # N/A (doesn't exist)
# Without default: getattr(user, "phone") → AttributeError!

# Dynamic attribute access from a list of field names
fields = ["name", "age", "email"]
for field in fields:
    print(f"{field}: {getattr(user, field)}")
# name: Alice, age: 30, email: alice@example.com

# Build a dict from selected attributes
data = {f: getattr(user, f) for f in fields}
print(data)  # {'name': 'Alice', 'age': 30, 'email': 'alice@example.com'}


# ═══════════════════════════════════════════════════════════════
# ✦ setattr() and delattr()
# ═══════════════════════════════════════════════════════════════
class Config:
    pass

config = Config()

# Set attributes dynamically
settings = {"debug": True, "port": 8080, "host": "localhost"}
for key, value in settings.items():
    setattr(config, key, value)

print(config.debug)   # True
print(config.port)    # 8080
print(config.host)    # localhost

# Modify existing attribute
setattr(config, "port", 9090)
print(config.port)    # 9090

# Delete attribute
delattr(config, "debug")
# print(config.debug)  # AttributeError!

# Equivalent operations:
# setattr(obj, 'x', 10)  ↔  obj.x = 10
# getattr(obj, 'x')      ↔  obj.x
# delattr(obj, 'x')      ↔  del obj.x


# ═══════════════════════════════════════════════════════════════
# ✦ hasattr() — check if attribute exists
# ═══════════════════════════════════════════════════════════════
class Shape:
    def __init__(self, name):
        self.name = name

class Circle(Shape):
    def __init__(self, radius):
        super().__init__("circle")
        self.radius = radius

    def area(self):
        return 3.14159 * self.radius ** 2

c = Circle(5)
print(hasattr(c, "radius"))   # True
print(hasattr(c, "name"))     # True (inherited)
print(hasattr(c, "area"))     # True (methods too!)
print(hasattr(c, "sides"))    # False

# Duck typing with hasattr
def get_area(shape):
    if hasattr(shape, 'area'):
        return shape.area()
    return "Cannot compute area"

print(get_area(c))          # 78.53975
print(get_area("not a shape"))  # Cannot compute area


# ═══════════════════════════════════════════════════════════════
# ✦ Practical: dynamic method dispatch
# ═══════════════════════════════════════════════════════════════
class Calculator:
    def add(self, a, b): return a + b
    def sub(self, a, b): return a - b
    def mul(self, a, b): return a * b
    def div(self, a, b): return a / b if b != 0 else "Error"

calc = Calculator()

# Call method by name (e.g., from user input or config)
operations = [("add", 10, 5), ("mul", 3, 4), ("div", 10, 0)]
for op_name, a, b in operations:
    method = getattr(calc, op_name, None)
    if method:
        print(f"{op_name}({a}, {b}) = {method(a, b)}")
    else:
        print(f"Unknown operation: {op_name}")
# add(10, 5) = 15
# mul(3, 4) = 12
# div(10, 0) = Error`
    },
    {
      name: 'vars(), dir() & id()',
      icon: '🔬',
      explanation: `**vars(obj):**
• Returns __dict__ of an object (its namespace as dict)
• vars() without args = locals()
• Useful for inspecting object attributes

**dir(obj):**
• Returns list of names in object's scope
• Without arg: names in current scope
• With arg: all attributes/methods of object
• Includes inherited and dunder methods

**id(obj):**
• Returns unique integer identifier for object
• Same as memory address in CPython
• Two objects with same id are the same object
• Used by 'is' operator: a is b ↔ id(a) == id(b)

**hash(obj):**
• Returns hash value of object (for dict keys, sets)
• Only hashable objects: immutable types
• hash(a) == hash(b) if a == b (required)

**callable(obj):**
• Returns True if object appears callable
• Functions, classes, objects with __call__

**repr(obj) vs str(obj):**
• repr() — unambiguous string for developers
• str() — readable string for users`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ vars() — inspect object's attributes as dict
# ═══════════════════════════════════════════════════════════════
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

p = Point(3, 7)
print(vars(p))  # {'x': 3, 'y': 7}

# Modify attributes through vars()
vars(p)['z'] = 10
print(p.z)  # 10

# Iterate over object's attributes
for attr, value in vars(p).items():
    print(f"  {attr} = {value}")
# x = 3, y = 7, z = 10

# Serialize to dict easily
import json
print(json.dumps(vars(p)))  # '{"x": 3, "y": 7, "z": 10}'


# ═══════════════════════════════════════════════════════════════
# ✦ dir() — list all names/attributes
# ═══════════════════════════════════════════════════════════════
# All attributes of a string (including dunder methods)
print(dir("hello"))
# ['__add__', '__class__', ..., 'capitalize', 'center', ...]

# Filter to public methods only
public = [m for m in dir("hello") if not m.startswith('_')]
print(public)
# ['capitalize', 'casefold', 'center', 'count', 'encode', ...]

# Check what methods a list has
list_methods = [m for m in dir([]) if not m.startswith('_')]
print(list_methods)
# ['append', 'clear', 'copy', 'count', 'extend', 'index',
#  'insert', 'pop', 'remove', 'reverse', 'sort']

# dir() on a class vs instance
class Dog:
    species = "Canis"
    def __init__(self, name):
        self.name = name
    def bark(self): return "Woof!"

d = Dog("Rex")
instance_attrs = set(dir(d)) - set(dir(Dog))
print(instance_attrs)  # might include instance-specific attrs


# ═══════════════════════════════════════════════════════════════
# ✦ id() — object identity
# ═══════════════════════════════════════════════════════════════
a = [1, 2, 3]
b = a           # same object
c = [1, 2, 3]   # different object, same value

print(id(a))            # e.g., 140234567890
print(id(b))            # same as a (same object!)
print(id(c))            # different from a

print(a is b)           # True  (same id)
print(a is c)           # False (different id)
print(a == c)           # True  (same value)

# 'is' vs '=='
# is  → checks identity (same object)
# ==  → checks equality (same value)

# Python caches small integers (-5 to 256)
x = 256
y = 256
print(x is y)  # True (cached)

x = 257
y = 257
print(x is y)  # May be False (not cached)

# Always use 'is' for None checks
value = None
print(value is None)      # True  (correct)
print(value == None)      # True  (works but not Pythonic)


# ═══════════════════════════════════════════════════════════════
# ✦ hash(), callable(), repr()
# ═══════════════════════════════════════════════════════════════
# hash() — for dict keys and set members
print(hash(42))          # 42
print(hash("hello"))     # some integer
print(hash((1, 2, 3)))   # tuples are hashable
# hash([1, 2, 3])        # TypeError! lists are not hashable

# Hashable = immutable: int, float, str, tuple, frozenset
# Not hashable: list, dict, set

# callable() — check if something can be called
print(callable(print))         # True
print(callable(len))           # True
print(callable(42))            # False
print(callable("hello"))       # False
print(callable(lambda x: x))  # True

class Greeter:
    def __call__(self, name):
        return f"Hello, {name}!"

g = Greeter()
print(callable(g))     # True (has __call__)
print(g("Alice"))      # Hello, Alice!

# repr() vs str()
from datetime import datetime
now = datetime.now()
print(str(now))    # 2024-01-15 10:30:45.123456 (readable)
print(repr(now))   # datetime.datetime(2024, 1, 15, ...) (unambiguous)

# repr() is what you see in the REPL
# str() is what print() uses
print([1, 2, 3])        # uses str() → [1, 2, 3]
print(repr("hello"))    # 'hello' (with quotes)`
    },
    {
      name: 'map(), filter() & reduce()',
      icon: 'λ',
      explanation: `**map(function, iterable, ...):**
• Applies function to every item of iterable
• Returns an iterator (lazy evaluation)
• Can map over multiple iterables simultaneously
• Equivalent to: (func(x) for x in iterable)

**filter(function, iterable):**
• Returns items where function returns True
• If function is None, filters falsy values
• Returns an iterator (lazy evaluation)
• Equivalent to: (x for x in iterable if func(x))

**functools.reduce(function, iterable, initial):**
• Reduces iterable to single value via cumulative application
• function takes two args: (accumulator, current)
• optional initial value (recommended to avoid errors)

**When to Use vs Comprehensions:**
• Simple transforms: prefer list comprehensions
• map/filter: when passing existing functions (no lambda needed)
• reduce: for cumulative operations (sum, product, etc.)
• Chain: map + filter when you'd need nested comprehensions`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ map() — transform every element
# ═══════════════════════════════════════════════════════════════
# Basic: apply function to each element
nums = [1, 2, 3, 4, 5]
squares = list(map(lambda x: x**2, nums))
print(squares)  # [1, 4, 9, 16, 25]

# With built-in functions (no lambda needed!)
words = ['hello', 'world', 'python']
upper = list(map(str.upper, words))
print(upper)  # ['HELLO', 'WORLD', 'PYTHON']

strs = ['1', '2', '3', '4']
ints = list(map(int, strs))
print(ints)  # [1, 2, 3, 4]

# Multiple iterables: map with 2+ args
a = [1, 2, 3]
b = [10, 20, 30]
sums = list(map(lambda x, y: x + y, a, b))
print(sums)  # [11, 22, 33]

# Equivalent comprehension
sums2 = [x + y for x, y in zip(a, b)]
print(sums2)  # [11, 22, 33]


# ═══════════════════════════════════════════════════════════════
# ✦ filter() — keep elements that pass a test
# ═══════════════════════════════════════════════════════════════
# Basic: keep even numbers
nums = [1, 2, 3, 4, 5, 6, 7, 8]
evens = list(filter(lambda x: x % 2 == 0, nums))
print(evens)  # [2, 4, 6, 8]

# With built-in function
words = ['hello', '', 'world', '', 'python']
non_empty = list(filter(None, words))  # None filters falsy
print(non_empty)  # ['hello', 'world', 'python']

# Filter with str methods
words = ['Apple', 'banana', 'Cherry', 'date']
capitalized = list(filter(str.istitle, words))
print(capitalized)  # ['Apple', 'Cherry']

# Equivalent comprehension
evens2 = [x for x in nums if x % 2 == 0]
print(evens2)  # [2, 4, 6, 8]


# ═══════════════════════════════════════════════════════════════
# ✦ reduce() — accumulate to a single value
# ═══════════════════════════════════════════════════════════════
from functools import reduce

# Sum all numbers (reduce is overkill here — use sum())
nums = [1, 2, 3, 4, 5]
total = reduce(lambda acc, x: acc + x, nums)
print(total)  # 15

# Product of all numbers
product = reduce(lambda acc, x: acc * x, nums)
print(product)  # 120

# With initial value (recommended)
product = reduce(lambda acc, x: acc * x, nums, 1)
print(product)  # 120

# Empty list with initial value
result = reduce(lambda acc, x: acc + x, [], 0)
print(result)  # 0 (returns initial)
# Without initial: reduce(lambda a,x: a+x, []) → TypeError!

# Flatten nested list
nested = [[1, 2], [3, 4], [5, 6]]
flat = reduce(lambda acc, x: acc + x, nested, [])
print(flat)  # [1, 2, 3, 4, 5, 6]

# Find longest string
words = ['hi', 'hello', 'hey', 'greetings']
longest = reduce(lambda a, b: a if len(a) >= len(b) else b, words)
print(longest)  # greetings


# ═══════════════════════════════════════════════════════════════
# ✦ Chaining map + filter, and when to use what
# ═══════════════════════════════════════════════════════════════
# Get squares of even numbers
nums = range(1, 11)

# Method 1: chain map + filter
result = list(map(lambda x: x**2, filter(lambda x: x % 2 == 0, nums)))
print(result)  # [4, 16, 36, 64, 100]

# Method 2: list comprehension (usually clearer)
result = [x**2 for x in nums if x % 2 == 0]
print(result)  # [4, 16, 36, 64, 100]

# When map/filter wins: passing existing functions
data = ['  hello  ', '  world  ', '  python  ']
clean = list(map(str.strip, data))
print(clean)  # ['hello', 'world', 'python']
# vs: [s.strip() for s in data]  — both fine

# Process and validate data pipeline
raw = ['42', 'abc', '17', '', '99', 'xyz', '5']
numbers = list(map(int, filter(str.isdigit, raw)))
print(numbers)  # [42, 17, 99, 5]`
    },
    {
      name: 'sorted(), min() & max()',
      icon: '📊',
      explanation: `**sorted(iterable, key=None, reverse=False):**
• Returns NEW sorted list from any iterable
• key: function applied to each element for comparison
• reverse=True for descending order
• Stable sort: equal elements keep original order

**min(iterable, key=None, default=None):**
• Returns smallest element
• key: comparison function
• default: returned if iterable is empty

**max(iterable, key=None, default=None):**
• Returns largest element
• Same signature as min()

**sum(iterable, start=0):**
• Returns total of all elements plus start value
• Only works with numbers (use join for strings)

**Key Functions:**
• lambda x: x.attr — sort by attribute
• lambda x: (x[0], x[1]) — multi-level sort
• str.lower — case-insensitive sort
• len — sort by length`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ sorted() with key functions
# ═══════════════════════════════════════════════════════════════
# Basic sorting
nums = [3, 1, 4, 1, 5, 9, 2, 6]
print(sorted(nums))              # [1, 1, 2, 3, 4, 5, 6, 9]
print(sorted(nums, reverse=True)) # [9, 6, 5, 4, 3, 2, 1, 1]

# Sort strings case-insensitive
words = ['banana', 'Apple', 'cherry', 'Date']
print(sorted(words))                    # ['Apple', 'Date', 'banana', 'cherry']
print(sorted(words, key=str.lower))     # ['Apple', 'banana', 'cherry', 'Date']

# Sort by length
words = ['python', 'go', 'java', 'c']
print(sorted(words, key=len))           # ['c', 'go', 'java', 'python']

# Sort dicts by value
scores = {'Alice': 95, 'Bob': 87, 'Charlie': 92}
by_score = sorted(scores.items(), key=lambda x: x[1], reverse=True)
print(by_score)  # [('Alice', 95), ('Charlie', 92), ('Bob', 87)]

# Multi-level sort: by age, then name
people = [('Alice', 30), ('Bob', 25), ('Charlie', 30), ('Dave', 25)]
result = sorted(people, key=lambda x: (x[1], x[0]))
print(result)
# [('Bob', 25), ('Dave', 25), ('Alice', 30), ('Charlie', 30)]


# ═══════════════════════════════════════════════════════════════
# ✦ min() and max() with key functions
# ═══════════════════════════════════════════════════════════════
nums = [3, 1, 4, 1, 5, 9]
print(min(nums))  # 1
print(max(nums))  # 9

# With key function
words = ['Python', 'Go', 'JavaScript', 'C']
print(min(words, key=len))   # 'C' (shortest)
print(max(words, key=len))   # 'JavaScript' (longest)

# Multiple arguments (not iterable)
print(min(10, 20, 5))   # 5
print(max(10, 20, 5))   # 20

# default for empty iterables
print(min([], default=0))    # 0 (instead of ValueError)
print(max([], default=-1))   # -1

# Find person with highest score
students = [
    {'name': 'Alice', 'score': 95},
    {'name': 'Bob', 'score': 87},
    {'name': 'Charlie', 'score': 92}
]
best = max(students, key=lambda s: s['score'])
print(f"Best: {best['name']} ({best['score']})")  # Alice (95)

# Find closest number to target
target = 7
nums = [1, 4, 6, 9, 12]
closest = min(nums, key=lambda x: abs(x - target))
print(f"Closest to {target}: {closest}")  # 6


# ═══════════════════════════════════════════════════════════════
# ✦ sum() and aggregation patterns
# ═══════════════════════════════════════════════════════════════
nums = [1, 2, 3, 4, 5]
print(sum(nums))           # 15
print(sum(nums, 100))      # 115 (start=100)

# Sum with generator expression
scores = [85, 92, 78, 95, 88]
above_90 = sum(1 for s in scores if s >= 90)
print(f"Scores >= 90: {above_90}")  # 2

# Sum of specific field
orders = [{'item': 'A', 'price': 10}, {'item': 'B', 'price': 25}]
total = sum(o['price'] for o in orders)
print(f"Total: {total}")  # 35

# DON'T use sum for strings — use join
words = ['Hello', 'World']
# sum(words, '')  # Works but VERY slow for strings
print(' '.join(words))  # "Hello World" (correct way)

# Flatten list with sum (works but slow for large data)
nested = [[1, 2], [3, 4], [5]]
flat = sum(nested, [])
print(flat)  # [1, 2, 3, 4, 5]


# ═══════════════════════════════════════════════════════════════
# ✦ abs(), round(), pow() & divmod()
# ═══════════════════════════════════════════════════════════════
# abs() — absolute value
print(abs(-42))      # 42
print(abs(3.14))     # 3.14
print(abs(-0))       # 0

# round() — round to n digits
print(round(3.14159))       # 3
print(round(3.14159, 2))    # 3.14
print(round(3.145, 2))      # 3.14 (banker's rounding!)
print(round(3.155, 2))      # 3.15
print(round(1234, -2))      # 1200 (round to hundreds)

# pow() — power with optional modulo
print(pow(2, 10))          # 1024
print(pow(2, 10, 1000))    # 24  (2**10 % 1000, efficient!)
# Three-arg pow is very efficient for modular exponentiation

# divmod() — quotient and remainder at once
q, r = divmod(17, 5)
print(f"17 / 5 = {q} remainder {r}")  # 3 remainder 2

# Convert seconds to hours:minutes:seconds
total_seconds = 3725
hours, remainder = divmod(total_seconds, 3600)
minutes, seconds = divmod(remainder, 60)
print(f"{hours}h {minutes}m {seconds}s")  # 1h 2m 5s`
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
              background: 'linear-gradient(to right, #60a5fa, #22d3ee)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              🐍 Built-in Functions
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
                Click to explore built-in functions
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

export default BuiltinFunctions
