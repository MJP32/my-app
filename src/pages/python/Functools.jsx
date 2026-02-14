import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

function Functools({ onBack, breadcrumb }) {
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
      name: 'lru_cache',
      icon: '⚡',
      explanation: `**Core Concept:**
• @lru_cache — decorator that caches function return values
• LRU = Least Recently Used eviction policy
• Dramatic speedup for recursive or repeated computations
• Arguments must be hashable (no lists/dicts)

**Parameters:**
• maxsize=128 — max entries in cache (None = unlimited)
• typed=False — if True, f(3) and f(3.0) cached separately
• Python 3.8+: @cache is shorthand for @lru_cache(maxsize=None)

**Cache Management:**
• func.cache_info() — hits, misses, maxsize, currsize
• func.cache_clear() — empty the cache
• Cache wraps function transparently

**When to Use:**
• Recursive algorithms (fibonacci, tree traversal)
• Expensive computations called with same args
• API/database result caching (with caution)
• Pure functions only (same input → same output)`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Basic lru_cache — memoize expensive functions
# ═══════════════════════════════════════════════════════════════
from functools import lru_cache

# Without cache: exponential time O(2^n)
def fib_slow(n):
    if n < 2: return n
    return fib_slow(n-1) + fib_slow(n-2)

# With cache: linear time O(n)
@lru_cache(maxsize=128)
def fib(n):
    if n < 2: return n
    return fib(n-1) + fib(n-2)

print(fib(50))   # 12586269025 — instant!
# fib_slow(50) would take YEARS

# Check cache statistics
print(fib.cache_info())
# CacheInfo(hits=48, misses=51, maxsize=128, currsize=51)

# Clear cache when done
fib.cache_clear()


# ═══════════════════════════════════════════════════════════════
# ✦ @cache (Python 3.9+) — unlimited cache shorthand
# ═══════════════════════════════════════════════════════════════
from functools import cache  # Python 3.9+

@cache  # same as @lru_cache(maxsize=None)
def factorial(n):
    if n <= 1: return 1
    return n * factorial(n - 1)

print(factorial(10))  # 3628800
print(factorial(5))   # 120 — uses cached results from above!

# For Python 3.8 and below, use:
# @lru_cache(maxsize=None)


# ═══════════════════════════════════════════════════════════════
# ✦ maxsize and typed parameters
# ═══════════════════════════════════════════════════════════════
# maxsize limits cache entries (LRU eviction)
@lru_cache(maxsize=3)
def square(n):
    print(f"  Computing {n}^2")
    return n ** 2

square(1)  # Computing 1^2
square(2)  # Computing 2^2
square(3)  # Computing 3^2
square(1)  # cached! (no print)
square(4)  # Computing 4^2 — evicts oldest unused entry
square(2)  # Computing 2^2 — was evicted!

# typed=True: treats 3 and 3.0 as different keys
@lru_cache(maxsize=128, typed=True)
def add_one(x):
    print(f"  Computing for {x!r}")
    return x + 1

add_one(3)    # Computing for 3
add_one(3.0)  # Computing for 3.0 — different cache entry!
add_one(3)    # cached!


# ═══════════════════════════════════════════════════════════════
# ✦ Practical: caching expensive lookups
# ═══════════════════════════════════════════════════════════════
import time

# Simulate slow API call
@lru_cache(maxsize=64)
def get_user_data(user_id):
    """Simulated database lookup"""
    time.sleep(0.01)  # simulate latency
    return {"id": user_id, "name": f"User_{user_id}"}

# First call is slow, subsequent calls are instant
start = time.time()
for _ in range(100):
    get_user_data(42)
elapsed = time.time() - start
print(f"100 calls took {elapsed:.3f}s")  # ~0.01s (99 cache hits)

# IMPORTANT: only cache pure functions!
# DON'T cache functions with side effects or time-dependent results

# Arguments must be hashable
# @lru_cache
# def bad(data):  # TypeError if data is a list or dict!
#     return sum(data)

# Workaround: convert to tuple
@lru_cache
def sum_items(data):  # pass tuple, not list
    return sum(data)

print(sum_items((1, 2, 3)))  # 6 — tuples are hashable`
    },
    {
      name: 'partial',
      icon: '🧩',
      explanation: `**Core Concept:**
• functools.partial(func, *args, **kwargs) — freeze some arguments
• Returns a new callable with pre-filled arguments
• Original function is not modified
• Remaining args passed at call time

**How It Works:**
• partial(func, a)(b) is equivalent to func(a, b)
• Frozen args come first, then call-time args
• kwargs can be overridden at call time
• .func, .args, .keywords — inspect partial object

**Use Cases:**
• Adapting functions to expected signatures (callbacks)
• Creating specialized versions of general functions
• Reducing repetition in repeated calls
• Configuring factory functions

**vs Lambda:**
• partial is more readable for simple arg freezing
• partial preserves function name and metadata
• Lambda needed for complex transformations
• partial is slightly faster than lambda`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Basic partial — freeze arguments
# ═══════════════════════════════════════════════════════════════
from functools import partial

# Create specialized functions by freezing args
def power(base, exponent):
    return base ** exponent

square = partial(power, exponent=2)
cube = partial(power, exponent=3)

print(square(5))   # 25
print(cube(3))     # 27

# Freeze the first positional argument
def multiply(x, y):
    return x * y

double = partial(multiply, 2)
triple = partial(multiply, 3)

print(double(10))  # 20
print(triple(10))  # 30


# ═══════════════════════════════════════════════════════════════
# ✦ partial with keyword arguments
# ═══════════════════════════════════════════════════════════════
def connect(host, port, timeout=30, ssl=False):
    return f"Connecting to {host}:{port} (timeout={timeout}, ssl={ssl})"

# Create pre-configured connection functions
connect_local = partial(connect, "localhost", 5432)
connect_prod = partial(connect, "prod.db.com", 5432, timeout=10, ssl=True)

print(connect_local())
# Connecting to localhost:5432 (timeout=30, ssl=False)
print(connect_prod())
# Connecting to prod.db.com:5432 (timeout=10, ssl=True)

# Override frozen kwargs at call time
print(connect_local(timeout=5))
# Connecting to localhost:5432 (timeout=5, ssl=False)


# ═══════════════════════════════════════════════════════════════
# ✦ Inspect partial objects
# ═══════════════════════════════════════════════════════════════
greet = partial(print, "Hello", sep=", ")

# Access partial internals
print(greet.func)       # {'<'}built-in function print>
print(greet.args)       # ('Hello',)
print(greet.keywords)   # {'sep': ', '}

greet("World")          # Hello, World
greet("Alice", "Bob")   # Hello, Alice, Bob


# ═══════════════════════════════════════════════════════════════
# ✦ Practical: callbacks, sorting, and map
# ═══════════════════════════════════════════════════════════════
# As key function in sorted()
data = ["hello", "World", "PYTHON", "code"]
# Sort case-insensitive with a specific method
from operator import methodcaller
sort_lower = partial(sorted, key=str.lower)
print(sort_lower(data))  # ['code', 'hello', 'PYTHON', 'World']

# With map() — convert strings to ints with base
hex_strings = ['ff', 'a0', '1b']
to_int_hex = partial(int, base=16)
print(list(map(to_int_hex, hex_strings)))  # [255, 160, 27]

# As callback adapter
def log_message(level, msg, timestamp=None):
    ts = timestamp or "now"
    return f"[{level}] {ts}: {msg}"

log_error = partial(log_message, "ERROR")
log_info = partial(log_message, "INFO")

print(log_error("Connection failed"))
# [ERROR] now: Connection failed
print(log_info("Server started"))
# [INFO] now: Server started

# partial vs lambda
# These are equivalent:
double_p = partial(multiply, 2)
double_l = lambda y: multiply(2, y)
# partial is cleaner and preserves metadata`
    },
    {
      name: 'wraps',
      icon: '🎁',
      explanation: `**The Problem:**
• Decorators replace the original function with a wrapper
• This loses __name__, __doc__, __module__, __annotations__
• Debugging and introspection become confusing

**The Solution:**
• @functools.wraps(wrapped_func) on the wrapper function
• Copies metadata from original to wrapper
• Preserves __name__, __doc__, __qualname__, __module__
• Also sets __wrapped__ to reference the original function

**What It Copies:**
• __name__ — function name
• __doc__ — docstring
• __module__ — defining module
• __qualname__ — qualified name
• __annotations__ — type hints
• __dict__ — function attributes
• __wrapped__ — reference to original (for unwrapping)

**Best Practice:**
• ALWAYS use @wraps when writing decorators
• Access original via decorated_func.__wrapped__
• Essential for correct help(), debugging, and testing`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ The problem: decorators lose function identity
# ═══════════════════════════════════════════════════════════════
# BAD: decorator without @wraps
def timer_bad(func):
    def wrapper(*args, **kwargs):
        """Wrapper function"""
        import time
        start = time.time()
        result = func(*args, **kwargs)
        print(f"Took {time.time() - start:.4f}s")
        return result
    return wrapper

@timer_bad
def my_function():
    """Does something important"""
    return 42

print(my_function.__name__)  # 'wrapper'  ← WRONG!
print(my_function.__doc__)   # 'Wrapper function'  ← WRONG!
# help(my_function)  # Shows wrapper docs, not my_function docs


# ═══════════════════════════════════════════════════════════════
# ✦ The fix: @wraps preserves function metadata
# ═══════════════════════════════════════════════════════════════
from functools import wraps

# GOOD: decorator with @wraps
def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        """Wrapper function"""
        import time
        start = time.time()
        result = func(*args, **kwargs)
        print(f"Took {time.time() - start:.4f}s")
        return result
    return wrapper

@timer
def my_function():
    """Does something important"""
    return 42

print(my_function.__name__)  # 'my_function'  ← CORRECT!
print(my_function.__doc__)   # 'Does something important'  ← CORRECT!

# Access original function through __wrapped__
original = my_function.__wrapped__
print(original())  # 42 (no timer output)


# ═══════════════════════════════════════════════════════════════
# ✦ Complete decorator patterns with @wraps
# ═══════════════════════════════════════════════════════════════
# Logging decorator
def log_calls(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}({args}, {kwargs})")
        result = func(*args, **kwargs)
        print(f"  → returned {result}")
        return result
    return wrapper

# Retry decorator
def retry(max_attempts=3):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts:
                        raise
                    print(f"Attempt {attempt} failed: {e}")
        return wrapper
    return decorator

@log_calls
@retry(max_attempts=3)
def fetch_data(url):
    """Fetch data from URL with retries"""
    return f"Data from {url}"

print(fetch_data.__name__)  # 'fetch_data' (preserved!)
print(fetch_data.__doc__)   # 'Fetch data from URL with retries'


# ═══════════════════════════════════════════════════════════════
# ✦ Decorator with optional arguments pattern
# ═══════════════════════════════════════════════════════════════
def validate_args(func=None, *, check_none=True, check_empty=True):
    """Decorator that works with or without arguments"""
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            for arg in args:
                if check_none and arg is None:
                    raise ValueError("None argument not allowed")
                if check_empty and hasattr(arg, '__len__') and len(arg) == 0:
                    raise ValueError("Empty argument not allowed")
            return fn(*args, **kwargs)
        return wrapper

    if func is not None:
        return decorator(func)  # called without arguments
    return decorator              # called with arguments

# Both syntaxes work:
@validate_args
def process(data):
    """Process data"""
    return len(data)

@validate_args(check_empty=False)
def process2(data):
    """Process data allowing empty"""
    return len(data) if data else 0

print(process.__name__)   # 'process'
print(process2.__name__)  # 'process2'`
    },
    {
      name: 'total_ordering',
      icon: '📏',
      explanation: `**The Problem:**
• Rich comparison needs 6 methods: __eq__, __ne__, __lt__, __le__, __gt__, __ge__
• Writing all 6 is tedious and error-prone
• Inconsistencies if you only define some

**The Solution:**
• @total_ordering — auto-generate missing comparison methods
• You define __eq__ and ONE of: __lt__, __le__, __gt__, __ge__
• The decorator derives the remaining 4 methods

**Requirements:**
• MUST define __eq__
• MUST define at least one of __lt__, __le__, __gt__, __ge__
• The defined method should be consistent with __eq__

**Trade-offs:**
• Pro: Less code, less bugs, always consistent
• Con: Slightly slower than hand-written methods
• For performance-critical code, consider defining all 6

**Common Use Cases:**
• Custom sortable objects
• Priority queue items
• Version number comparison
• Date/range/interval objects`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Without total_ordering — tedious manual definitions
# ═══════════════════════════════════════════════════════════════
# You'd need ALL of these for full comparison support:
class VersionManual:
    def __init__(self, major, minor, patch):
        self.major = major
        self.minor = minor
        self.patch = patch
    def __eq__(self, other):
        return (self.major, self.minor, self.patch) == (other.major, other.minor, other.patch)
    def __lt__(self, other):
        return (self.major, self.minor, self.patch) < (other.major, other.minor, other.patch)
    def __le__(self, other):
        return (self.major, self.minor, self.patch) <= (other.major, other.minor, other.patch)
    def __gt__(self, other):
        return (self.major, self.minor, self.patch) > (other.major, other.minor, other.patch)
    def __ge__(self, other):
        return (self.major, self.minor, self.patch) >= (other.major, other.minor, other.patch)
    # That's 5 comparison methods! Very repetitive.


# ═══════════════════════════════════════════════════════════════
# ✦ With total_ordering — define __eq__ + one other
# ═══════════════════════════════════════════════════════════════
from functools import total_ordering

@total_ordering
class Version:
    def __init__(self, major, minor, patch):
        self.major = major
        self.minor = minor
        self.patch = patch

    def __eq__(self, other):
        if not isinstance(other, Version):
            return NotImplemented
        return (self.major, self.minor, self.patch) == (other.major, other.minor, other.patch)

    def __lt__(self, other):
        if not isinstance(other, Version):
            return NotImplemented
        return (self.major, self.minor, self.patch) < (other.major, other.minor, other.patch)

    def __repr__(self):
        return f"Version({self.major}.{self.minor}.{self.patch})"

v1 = Version(1, 0, 0)
v2 = Version(2, 1, 0)
v3 = Version(1, 0, 0)

# All comparisons work — only __eq__ and __lt__ were defined!
print(v1 == v3)   # True
print(v1 != v2)   # True  (auto-generated)
print(v1 {'<'} v2)    # True
print(v1 {'<'}= v3)   # True  (auto-generated)
print(v2 > v1)    # True  (auto-generated)
print(v2 >= v1)   # True  (auto-generated)


# ═══════════════════════════════════════════════════════════════
# ✦ Sorting with total_ordering
# ═══════════════════════════════════════════════════════════════
versions = [
    Version(2, 0, 1),
    Version(1, 9, 0),
    Version(2, 0, 0),
    Version(1, 0, 10),
]

# Sorting works because all comparisons are defined
print(sorted(versions))
# [Version(1.0.10), Version(1.9.0), Version(2.0.0), Version(2.0.1)]

print(min(versions))  # Version(1.0.10)
print(max(versions))  # Version(2.0.1)


# ═══════════════════════════════════════════════════════════════
# ✦ Practical: priority items and custom orderings
# ═══════════════════════════════════════════════════════════════
@total_ordering
class Task:
    PRIORITY = {'critical': 0, 'high': 1, 'medium': 2, 'low': 3}

    def __init__(self, name, priority='medium'):
        self.name = name
        self.priority = priority

    def __eq__(self, other):
        if not isinstance(other, Task):
            return NotImplemented
        return self.PRIORITY[self.priority] == self.PRIORITY[other.priority]

    def __lt__(self, other):
        """Lower priority VALUE = higher urgency = comes first"""
        if not isinstance(other, Task):
            return NotImplemented
        return self.PRIORITY[self.priority] < self.PRIORITY[other.priority]

    def __repr__(self):
        return f"Task({self.name!r}, {self.priority})"

tasks = [
    Task("Fix bug", "critical"),
    Task("Write docs", "low"),
    Task("Code review", "high"),
    Task("Deploy", "medium"),
]

# Sort by priority (most urgent first)
for task in sorted(tasks):
    print(f"  {task}")
# Task('Fix bug', critical)
# Task('Code review', high)
# Task('Deploy', medium)
# Task('Write docs', low)`
    },
    {
      name: 'singledispatch',
      icon: '🔀',
      explanation: `**Core Concept:**
• @singledispatch — function overloading by argument type
• Define a generic function, then register type-specific versions
• Dispatches on the type of the FIRST argument
• Python's answer to method overloading in Java/C++

**How It Works:**
• @singledispatch on base function (handles default case)
• @func.register(type) to register specialized implementations
• Dispatch is based on runtime type of first argument
• Falls back to base function for unregistered types

**Registration Methods:**
• @func.register(int) — decorator with type argument
• @func.register — with type annotation (Python 3.7+)
• func.register(type, implementation) — functional form

**singledispatchmethod (Python 3.8+):**
• For methods inside classes
• @singledispatchmethod instead of @singledispatch

**Use Cases:**
• Processing different data formats
• Serialization by type
• Pretty-printing various types
• Type-specific validation`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Basic singledispatch — overload by type
# ═══════════════════════════════════════════════════════════════
from functools import singledispatch

@singledispatch
def process(data):
    """Default handler for unknown types"""
    raise TypeError(f"Unsupported type: {type(data).__name__}")

@process.register(int)
def _(data):
    return f"Integer: {data * 2}"

@process.register(str)
def _(data):
    return f"String: {data.upper()}"

@process.register(list)
def _(data):
    return f"List with {len(data)} items: {data}"

print(process(42))           # Integer: 84
print(process("hello"))      # String: HELLO
print(process([1, 2, 3]))    # List with 3 items: [1, 2, 3]
# process(3.14)              # TypeError: Unsupported type: float


# ═══════════════════════════════════════════════════════════════
# ✦ Register with type annotations (Python 3.7+)
# ═══════════════════════════════════════════════════════════════
@singledispatch
def serialize(obj):
    """Convert object to string representation"""
    return str(obj)

@serialize.register
def _(obj: dict):
    pairs = [f"{k}={serialize(v)}" for k, v in obj.items()]
    return "{" + ", ".join(pairs) + "}"

@serialize.register
def _(obj: list):
    items = [serialize(x) for x in obj]
    return "[" + ", ".join(items) + "]"

@serialize.register
def _(obj: bool):  # Must register before int (bool is subclass of int)
    return "true" if obj else "false"

@serialize.register
def _(obj: int):
    return str(obj)

@serialize.register
def _(obj: type(None)):
    return "null"

print(serialize({"name": "Alice", "scores": [95, 87]}))
# {name=Alice, scores=[95, 87]}
print(serialize(None))    # null
print(serialize(True))    # true


# ═══════════════════════════════════════════════════════════════
# ✦ Register multiple types and inspect dispatch
# ═══════════════════════════════════════════════════════════════
@singledispatch
def format_value(val):
    return repr(val)

# Register same handler for multiple types
@format_value.register(int)
@format_value.register(float)
def _(val):
    return f"{val:,.2f}"

@format_value.register(str)
def _(val):
    return f'"{val}"'

print(format_value(1234567))    # 1,234,567.00
print(format_value(3.14159))    # 3.14
print(format_value("hello"))    # "hello"
print(format_value([1, 2]))     # [1, 2] (default handler)

# Inspect what's registered
print(format_value.dispatch(int))    # the int handler
print(format_value.registry.keys())  # all registered types


# ═══════════════════════════════════════════════════════════════
# ✦ singledispatchmethod — for class methods
# ═══════════════════════════════════════════════════════════════
from functools import singledispatchmethod

class Formatter:
    @singledispatchmethod
    def format(self, arg):
        return f"[{type(arg).__name__}] {arg}"

    @format.register
    def _(self, arg: int):
        return f"Integer: {arg:,}"

    @format.register
    def _(self, arg: float):
        return f"Float: {arg:.4f}"

    @format.register
    def _(self, arg: str):
        return f"String: {arg!r} (length={len(arg)})"

    @format.register
    def _(self, arg: list):
        return f"List[{len(arg)}]: {arg}"

fmt = Formatter()
print(fmt.format(42))          # Integer: 42
print(fmt.format(3.14))        # Float: 3.1400
print(fmt.format("hello"))     # String: 'hello' (length=5)
print(fmt.format([1, 2, 3]))   # List[3]: [1, 2, 3]
print(fmt.format((1, 2)))      # [tuple] (1, 2) — default handler`
    },
    {
      name: 'reduce & Other Utilities',
      icon: '🧰',
      explanation: `**functools.reduce(func, iterable, initial):**
• Cumulative application of func to iterable elements
• func(accumulator, current_item) → new accumulator
• Optional initial value (recommended)
• Imported from functools (not a builtin since Python 3)

**functools.cached_property (Python 3.8+):**
• Like @property but caches result after first access
• Only computed once, then stored as instance attribute
• Thread-safe in Python 3.12+
• Great for expensive computed properties

**functools.cmp_to_key:**
• Convert old-style comparison function to key function
• For sorted(), min(), max() compatibility
• Old style: cmp(a, b) returns -1, 0, or 1

**functools.partialmethod:**
• Like partial() but for methods in class bodies
• Creates a partial that works as a method descriptor

**operator module (companion to functools):**
• operator.add, operator.mul — function versions of operators
• operator.itemgetter, operator.attrgetter — efficient key functions
• Often used with reduce, sorted, map`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ reduce — fold an iterable to a single value
# ═══════════════════════════════════════════════════════════════
from functools import reduce
import operator

# Sum (reduce is overkill here, just use sum())
nums = [1, 2, 3, 4, 5]
total = reduce(operator.add, nums, 0)
print(total)  # 15

# Product of all numbers
product = reduce(operator.mul, nums, 1)
print(product)  # 120

# Build a nested dict path
def deep_get(d, keys):
    """Get nested dict value: deep_get(d, ['a', 'b', 'c']) → d['a']['b']['c']"""
    return reduce(lambda acc, key: acc[key], keys, d)

data = {"a": {"b": {"c": 42}}}
print(deep_get(data, ["a", "b", "c"]))  # 42

# Compose functions (right to left)
def compose(*funcs):
    return reduce(lambda f, g: lambda x: f(g(x)), funcs)

transform = compose(str.upper, str.strip, str.title)
print(transform("  hello world  "))  # "HELLO WORLD"

# Flatten nested list
nested = [[1, 2], [3, 4], [5, 6]]
flat = reduce(operator.concat, nested)
print(flat)  # [1, 2, 3, 4, 5, 6]


# ═══════════════════════════════════════════════════════════════
# ✦ cached_property — compute once, cache forever
# ═══════════════════════════════════════════════════════════════
from functools import cached_property

class DataAnalyzer:
    def __init__(self, data):
        self.data = data

    @cached_property
    def statistics(self):
        """Expensive computation — only runs once!"""
        print("  Computing statistics...")
        n = len(self.data)
        mean = sum(self.data) / n
        variance = sum((x - mean) ** 2 for x in self.data) / n
        return {"mean": mean, "variance": variance, "std": variance ** 0.5}

    @cached_property
    def sorted_data(self):
        print("  Sorting data...")
        return sorted(self.data)

analyzer = DataAnalyzer([4, 2, 7, 1, 9, 3, 8])
print(analyzer.statistics)      # Computing statistics... → prints stats
print(analyzer.statistics)      # Cached! No recomputation
print(analyzer.sorted_data)     # Sorting data... → prints sorted

# To recompute: delete the cached value
del analyzer.statistics
print(analyzer.statistics)      # Computing statistics... → recomputed


# ═══════════════════════════════════════════════════════════════
# ✦ cmp_to_key — old-style comparison to key function
# ═══════════════════════════════════════════════════════════════
from functools import cmp_to_key

# Old-style comparison: return -1, 0, or 1
def compare_length_then_alpha(a, b):
    """Sort by length first, then alphabetically"""
    if len(a) != len(b):
        return len(a) - len(b)  # shorter first
    if a < b: return -1
    if a > b: return 1
    return 0

words = ["banana", "apple", "fig", "date", "kiwi", "cherry"]
result = sorted(words, key=cmp_to_key(compare_length_then_alpha))
print(result)  # ['fig', 'date', 'kiwi', 'apple', 'banana', 'cherry']

# Useful for complex sorting that's hard with key functions alone
# Example: custom string sorting for version numbers
versions = ["1.10.0", "1.9.0", "1.2.0", "2.0.0", "1.10.1"]
def cmp_version(a, b):
    a_parts = list(map(int, a.split('.')))
    b_parts = list(map(int, b.split('.')))
    if a_parts < b_parts: return -1
    if a_parts > b_parts: return 1
    return 0

print(sorted(versions, key=cmp_to_key(cmp_version)))
# ['1.2.0', '1.9.0', '1.10.0', '1.10.1', '2.0.0']


# ═══════════════════════════════════════════════════════════════
# ✦ operator module — companions to functools
# ═══════════════════════════════════════════════════════════════
from operator import itemgetter, attrgetter, methodcaller

# itemgetter — efficient dict/tuple key access
students = [("Alice", 95), ("Bob", 87), ("Charlie", 92)]
by_score = sorted(students, key=itemgetter(1), reverse=True)
print(by_score)  # [('Alice', 95), ('Charlie', 92), ('Bob', 87)]

# Multi-key sorting
data = [("B", 2), ("A", 1), ("B", 1), ("A", 2)]
print(sorted(data, key=itemgetter(0, 1)))
# [('A', 1), ('A', 2), ('B', 1), ('B', 2)]

# attrgetter — for object attributes
class Student:
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade
    def __repr__(self):
        return f"{self.name}({self.grade})"

students = [Student("Alice", 95), Student("Bob", 87)]
print(sorted(students, key=attrgetter('grade')))
# [Bob(87), Alice(95)]`
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
              🧰 functools Module
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
                Click to explore functools concepts
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

export default Functools
