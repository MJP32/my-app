import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

function Decorators({ onBack, breadcrumb }) {
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
      name: 'Decorator Fundamentals',
      icon: '🎀',
      explanation: `**What Is a Decorator?**
• A function that takes a function and returns a modified function
• Syntactic sugar: @decorator above a function definition
• @decorator def f(): ... is equivalent to f = decorator(f)
• Decorators wrap functions to add behavior without modifying them

**How Decorators Work:**
• Functions are first-class objects in Python
• They can be passed as arguments, returned, assigned to variables
• A decorator receives a function, wraps it, and returns the wrapper
• The wrapper runs extra code before/after calling the original

**Basic Structure:**
• def decorator(func): — accepts the function
•     def wrapper(*args, **kwargs): — the replacement
•         # before logic
•         result = func(*args, **kwargs) — call original
•         # after logic
•         return result
•     return wrapper

**Why Use Decorators:**
• Logging, timing, caching, authentication
• Separation of concerns (cross-cutting logic)
• DRY principle — avoid repeating wrapper code
• Framework hooks (Flask routes, pytest fixtures)`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Functions are objects — the foundation
# ═══════════════════════════════════════════════════════════════
def greet(name):
    return f"Hello, {name}!"

# Functions can be assigned to variables
say_hello = greet
print(say_hello("Alice"))  # Hello, Alice!

# Functions can be passed as arguments
def apply(func, value):
    return func(value)

print(apply(greet, "Bob"))  # Hello, Bob!

# Functions can be returned from functions
def make_greeter(greeting):
    def greeter(name):
        return f"{greeting}, {name}!"
    return greeter

hi = make_greeter("Hi")
hey = make_greeter("Hey")
print(hi("Alice"))   # Hi, Alice!
print(hey("Bob"))    # Hey, Bob!


# ═══════════════════════════════════════════════════════════════
# ✦ Your first decorator — step by step
# ═══════════════════════════════════════════════════════════════
from functools import wraps

def my_decorator(func):
    @wraps(func)  # preserve func's name and docstring
    def wrapper(*args, **kwargs):
        print(f"Before calling {func.__name__}")
        result = func(*args, **kwargs)
        print(f"After calling {func.__name__}")
        return result
    return wrapper

# Apply with @ syntax
@my_decorator
def say_hello(name):
    """Greet someone"""
    print(f"Hello, {name}!")

say_hello("Alice")
# Before calling say_hello
# Hello, Alice!
# After calling say_hello

# This is exactly equivalent to:
# say_hello = my_decorator(say_hello)

print(say_hello.__name__)  # say_hello (preserved by @wraps)
print(say_hello.__doc__)   # Greet someone (preserved by @wraps)


# ═══════════════════════════════════════════════════════════════
# ✦ Timer decorator — measure execution time
# ═══════════════════════════════════════════════════════════════
import time

def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(0.1)
    return "done"

result = slow_function()  # slow_function took 0.100Xs
print(result)             # done


# ═══════════════════════════════════════════════════════════════
# ✦ Debug/logging decorator
# ═══════════════════════════════════════════════════════════════
def debug(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        args_repr = [repr(a) for a in args]
        kwargs_repr = [f"{k}={v!r}" for k, v in kwargs.items()]
        signature = ", ".join(args_repr + kwargs_repr)
        print(f"Calling {func.__name__}({signature})")
        result = func(*args, **kwargs)
        print(f"  → {func.__name__} returned {result!r}")
        return result
    return wrapper

@debug
def add(a, b):
    return a + b

add(3, 5)
# Calling add(3, 5)
#   → add returned 8`
    },
    {
      name: 'Decorators with Arguments',
      icon: '⚙️',
      explanation: `**The Problem:**
• Basic decorators take no arguments: @my_decorator
• Sometimes you need: @repeat(3) or @retry(max_attempts=5)
• This requires an extra layer of nesting

**Three-Layer Pattern:**
• Outer function: accepts decorator arguments
• Middle function: accepts the function being decorated
• Inner function: the actual wrapper that runs

**Structure:**
• def decorator(arg): — accepts decorator arguments
•     def actual_decorator(func): — accepts the function
•         @wraps(func)
•         def wrapper(*args, **kwargs): — the wrapper
•             ...use arg here...
•             return func(*args, **kwargs)
•         return wrapper
•     return actual_decorator

**Flexible Pattern (with or without args):**
• Can make decorators that work both as @decorator and @decorator(args)
• Check if first argument is callable (function)
• Common in production libraries`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Decorator with arguments — three layers
# ═══════════════════════════════════════════════════════════════
from functools import wraps

def repeat(n):
    """Decorator that calls the function n times"""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            results = []
            for _ in range(n):
                results.append(func(*args, **kwargs))
            return results
        return wrapper
    return decorator

@repeat(3)
def greet(name):
    print(f"Hello, {name}!")
    return name

greet("Alice")
# Hello, Alice!
# Hello, Alice!
# Hello, Alice!


# ═══════════════════════════════════════════════════════════════
# ✦ Retry decorator with configurable attempts
# ═══════════════════════════════════════════════════════════════
import time
import random

def retry(max_attempts=3, delay=0.1, exceptions=(Exception,)):
    """Retry a function on failure with delay between attempts"""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    if attempt == max_attempts:
                        raise
                    print(f"  Attempt {attempt} failed: {e}. Retrying...")
                    time.sleep(delay)
        return wrapper
    return decorator

@retry(max_attempts=3, delay=0.01)
def flaky_api_call():
    if random.random() < 0.7:
        raise ConnectionError("Server unavailable")
    return "Success!"

# Will retry up to 3 times before giving up
try:
    result = flaky_api_call()
    print(result)
except ConnectionError:
    print("All attempts failed")


# ═══════════════════════════════════════════════════════════════
# ✦ Rate limiter decorator
# ═══════════════════════════════════════════════════════════════
def rate_limit(max_calls, period=1.0):
    """Limit function to max_calls per period seconds"""
    def decorator(func):
        calls = []
        @wraps(func)
        def wrapper(*args, **kwargs):
            now = time.time()
            # Remove old calls outside the period
            while calls and calls[0] < now - period:
                calls.pop(0)
            if len(calls) >= max_calls:
                wait = period - (now - calls[0])
                print(f"  Rate limited! Wait {wait:.2f}s")
                time.sleep(wait)
                calls.pop(0)
            calls.append(time.time())
            return func(*args, **kwargs)
        return wrapper
    return decorator

@rate_limit(max_calls=2, period=1.0)
def api_request(endpoint):
    return f"Response from {endpoint}"


# ═══════════════════════════════════════════════════════════════
# ✦ Flexible: works with AND without arguments
# ═══════════════════════════════════════════════════════════════
def log(func=None, *, level="INFO"):
    """Works as @log or @log(level='DEBUG')"""
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            print(f"[{level}] Calling {fn.__name__}")
            return fn(*args, **kwargs)
        return wrapper

    if func is not None:
        # Called without arguments: @log
        return decorator(func)
    # Called with arguments: @log(level='DEBUG')
    return decorator

@log
def task_a():
    return "A done"

@log(level="DEBUG")
def task_b():
    return "B done"

task_a()  # [INFO] Calling task_a
task_b()  # [DEBUG] Calling task_b`
    },
    {
      name: 'Class-Based Decorators',
      icon: '🏗️',
      explanation: `**Using Classes as Decorators:**
• A class with __init__ and __call__ can be a decorator
• __init__ receives the function (or arguments)
• __call__ is invoked when the decorated function is called
• Can maintain state between calls (counters, caches)

**Advantages Over Function Decorators:**
• Clean state management via instance attributes
• Easier to read for complex decorators
• Can use inheritance for decorator families
• Natural place for configuration

**Patterns:**
• Without args: __init__(func), __call__(*args, **kwargs)
• With args: __init__(args), __call__(func) returns wrapper
• Stateful: track call count, execution history, etc.

**Decorating Methods (Important!):**
• Class decorators on methods need __get__ for binding
• Or use functools.update_wrapper
• Simpler: use function decorators for methods`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Class decorator — no arguments
# ═══════════════════════════════════════════════════════════════
from functools import wraps, update_wrapper

class CountCalls:
    """Track how many times a function is called"""
    def __init__(self, func):
        update_wrapper(self, func)
        self.func = func
        self.count = 0

    def __call__(self, *args, **kwargs):
        self.count += 1
        print(f"  Call #{self.count} to {self.func.__name__}")
        return self.func(*args, **kwargs)

@CountCalls
def say_hello(name):
    return f"Hello, {name}!"

print(say_hello("Alice"))  # Call #1 to say_hello → Hello, Alice!
print(say_hello("Bob"))    # Call #2 to say_hello → Hello, Bob!
print(say_hello("Charlie"))# Call #3 to say_hello → Hello, Charlie!
print(f"Total calls: {say_hello.count}")  # 3


# ═══════════════════════════════════════════════════════════════
# ✦ Class decorator — with arguments
# ═══════════════════════════════════════════════════════════════
class Throttle:
    """Allow at most 'limit' calls, then raise error"""
    def __init__(self, limit):
        self.limit = limit

    def __call__(self, func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            if wrapper.calls >= self.limit:
                raise RuntimeError(f"{func.__name__}: call limit ({self.limit}) exceeded")
            wrapper.calls += 1
            return func(*args, **kwargs)
        wrapper.calls = 0
        return wrapper

@Throttle(limit=3)
def limited_func():
    return "OK"

print(limited_func())  # OK
print(limited_func())  # OK
print(limited_func())  # OK
try:
    limited_func()     # RuntimeError: call limit exceeded
except RuntimeError as e:
    print(e)


# ═══════════════════════════════════════════════════════════════
# ✦ Stateful decorator — execution history
# ═══════════════════════════════════════════════════════════════
class TrackHistory:
    """Record all calls and their results"""
    def __init__(self, func):
        update_wrapper(self, func)
        self.func = func
        self.history = []

    def __call__(self, *args, **kwargs):
        result = self.func(*args, **kwargs)
        self.history.append({
            'args': args,
            'kwargs': kwargs,
            'result': result
        })
        return result

    def last(self):
        return self.history[-1] if self.history else None

    def clear(self):
        self.history.clear()

@TrackHistory
def calculate(a, b, op='add'):
    if op == 'add': return a + b
    if op == 'mul': return a * b

calculate(3, 5)
calculate(10, 2, op='mul')
calculate(7, 8)

print(f"Call count: {len(calculate.history)}")  # 3
print(f"Last call: {calculate.last()}")
# {'args': (7, 8), 'kwargs': {}, 'result': 15}

# View all results
for entry in calculate.history:
    print(f"  {entry['args']} → {entry['result']}")


# ═══════════════════════════════════════════════════════════════
# ✦ Decorator using a class for validation
# ═══════════════════════════════════════════════════════════════
class ValidateTypes:
    """Enforce argument types at runtime"""
    def __init__(self, **type_hints):
        self.type_hints = type_hints  # param_name: expected_type

    def __call__(self, func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            import inspect
            sig = inspect.signature(func)
            bound = sig.bind(*args, **kwargs)
            bound.apply_defaults()

            for param, expected_type in self.type_hints.items():
                if param in bound.arguments:
                    value = bound.arguments[param]
                    if not isinstance(value, expected_type):
                        raise TypeError(
                            f"{param} must be {expected_type.__name__}, "
                            f"got {type(value).__name__}"
                        )
            return func(*args, **kwargs)
        return wrapper

@ValidateTypes(name=str, age=int)
def create_user(name, age):
    return {"name": name, "age": age}

print(create_user("Alice", 30))  # {'name': 'Alice', 'age': 30}
try:
    create_user("Bob", "thirty")  # TypeError: age must be int
except TypeError as e:
    print(e)`
    },
    {
      name: 'Stacking & Chaining',
      icon: '📚',
      explanation: `**Stacking Multiple Decorators:**
• Apply multiple decorators to one function
• Decorators are applied bottom-up (closest to function first)
• But execute top-down at call time
• @A @B @C def f: equivalent to f = A(B(C(f)))

**Execution Order:**
• @outer → @inner → def func
• At call time: outer runs first, then inner, then func
• Return values propagate back up: func → inner → outer

**Chaining Patterns:**
• Combine logging + timing + auth
• Layer validation + caching + retry
• Each decorator adds one responsibility

**Common Pitfalls:**
• Order matters! @auth before @log vs @log before @auth
• Each decorator wraps the PREVIOUS result
• Use @wraps in every decorator for proper introspection
• Too many decorators = hard to debug`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Stacking decorators — order matters
# ═══════════════════════════════════════════════════════════════
from functools import wraps

def bold(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return f"<b>{func(*args, **kwargs)}</b>"
    return wrapper

def italic(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return f"<i>{func(*args, **kwargs)}</i>"
    return wrapper

def underline(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return f"<u>{func(*args, **kwargs)}</u>"
    return wrapper

# Decorators applied bottom-up, executed top-down
@bold
@italic
@underline
def greet(name):
    return f"Hello, {name}!"

print(greet("Alice"))
# <b><i><u>Hello, Alice!</u></i></b>

# Equivalent to: greet = bold(italic(underline(greet)))
# At call time: bold wrapper → italic wrapper → underline wrapper → greet


# ═══════════════════════════════════════════════════════════════
# ✦ Practical stack: log + time + validate
# ═══════════════════════════════════════════════════════════════
import time

def log_call(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"[LOG] {func.__name__} called")
        return func(*args, **kwargs)
    return wrapper

def time_it(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"[TIME] {func.__name__}: {elapsed:.4f}s")
        return result
    return wrapper

def require_positive(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        for arg in args:
            if isinstance(arg, (int, float)) and arg < 0:
                raise ValueError(f"Negative argument: {arg}")
        return func(*args, **kwargs)
    return wrapper

@log_call          # 1st to execute
@time_it           # 2nd to execute
@require_positive  # 3rd to execute (closest to function)
def compute(x, y):
    time.sleep(0.01)
    return x ** y

print(compute(2, 10))
# [LOG] compute called
# [TIME] compute: 0.01XXs
# 1024

try:
    compute(-1, 5)
except ValueError as e:
    print(f"Caught: {e}")
# [LOG] compute called
# Caught: Negative argument: -1


# ═══════════════════════════════════════════════════════════════
# ✦ Order matters — auth + cache example
# ═══════════════════════════════════════════════════════════════
current_user = {"role": "admin"}

def require_auth(role="user"):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            if current_user.get("role") != role:
                raise PermissionError(f"Requires {role} role")
            print(f"  [AUTH] {role} access granted")
            return func(*args, **kwargs)
        return wrapper
    return decorator

def cache_result(func):
    _cache = {}
    @wraps(func)
    def wrapper(*args):
        if args not in _cache:
            print(f"  [CACHE] miss for {args}")
            _cache[args] = func(*args)
        else:
            print(f"  [CACHE] hit for {args}")
        return _cache[args]
    return wrapper

# Auth THEN cache: checks auth every time, caches result
@require_auth(role="admin")
@cache_result
def get_secret_data(key):
    return f"secret_{key}"

print(get_secret_data("x"))
# [AUTH] admin access granted
# [CACHE] miss for ('x',)
# secret_x

print(get_secret_data("x"))
# [AUTH] admin access granted ← auth checked again!
# [CACHE] hit for ('x',)     ← but result is cached


# ═══════════════════════════════════════════════════════════════
# ✦ Unwrapping and debugging decorator stacks
# ═══════════════════════════════════════════════════════════════
# Access the original unwrapped function
@log_call
@time_it
def my_func():
    return 42

# Peel back one layer
print(my_func.__wrapped__.__name__)  # my_func (via time_it's @wraps)

# Peel back all layers to get original
original = my_func
while hasattr(original, '__wrapped__'):
    original = original.__wrapped__
print(f"Original: {original.__name__}")  # my_func`
    },
    {
      name: '@property & Descriptors',
      icon: '🏠',
      explanation: `**@property — Managed Attributes:**
• Turn a method into a read-only attribute
• Access like obj.name instead of obj.get_name()
• Add @name.setter for write access
• Add @name.deleter for delete access

**Why Use @property:**
• Computed attributes that look like simple attributes
• Validation on attribute assignment
• Lazy evaluation — compute only when accessed
• Backward compatible API changes

**Built-in Decorator: @staticmethod:**
• Method that doesn't receive self or cls
• Utility function scoped to the class
• Called on class or instance: MyClass.method() or obj.method()

**Built-in Decorator: @classmethod:**
• Receives class (cls) instead of instance (self)
• Can create alternative constructors
• Works with inheritance — cls is the actual subclass

**@abstractmethod:**
• From abc module — forces subclasses to implement
• Cannot instantiate class with unimplemented abstract methods`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ @property — getter, setter, deleter
# ═══════════════════════════════════════════════════════════════
class Temperature:
    def __init__(self, celsius=0):
        self._celsius = celsius  # private storage

    @property
    def celsius(self):
        """Get temperature in Celsius"""
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        """Set with validation"""
        if value < -273.15:
            raise ValueError("Below absolute zero!")
        self._celsius = value

    @property
    def fahrenheit(self):
        """Computed property — always derived from celsius"""
        return self._celsius * 9/5 + 32

    @fahrenheit.setter
    def fahrenheit(self, value):
        """Set via Fahrenheit — converts to Celsius internally"""
        self._celsius = (value - 32) * 5/9

temp = Temperature(100)
print(temp.celsius)      # 100     (uses getter)
print(temp.fahrenheit)   # 212.0   (computed property)

temp.fahrenheit = 72     # uses fahrenheit setter
print(temp.celsius)      # 22.22   (auto-converted)

try:
    temp.celsius = -300  # validation in setter
except ValueError as e:
    print(e)  # Below absolute zero!


# ═══════════════════════════════════════════════════════════════
# ✦ @property for lazy computation and caching
# ═══════════════════════════════════════════════════════════════
class DataSet:
    def __init__(self, values):
        self._values = list(values)
        self._stats = None  # lazy cache

    @property
    def stats(self):
        """Compute stats on first access, cache for reuse"""
        if self._stats is None:
            print("  Computing stats...")
            n = len(self._values)
            mean = sum(self._values) / n
            variance = sum((x - mean)**2 for x in self._values) / n
            self._stats = {'mean': mean, 'std': variance**0.5, 'n': n}
        return self._stats

    @property
    def values(self):
        return self._values.copy()  # return copy to protect internal state

    @values.setter
    def values(self, new_values):
        self._values = list(new_values)
        self._stats = None  # invalidate cache

ds = DataSet([10, 20, 30, 40, 50])
print(ds.stats)  # Computing stats... → {'mean': 30.0, ...}
print(ds.stats)  # Cached! No recomputation

ds.values = [1, 2, 3]  # cache invalidated
print(ds.stats)  # Computing stats... → {'mean': 2.0, ...}


# ═══════════════════════════════════════════════════════════════
# ✦ @staticmethod and @classmethod
# ═══════════════════════════════════════════════════════════════
class Date:
    def __init__(self, year, month, day):
        self.year = year
        self.month = month
        self.day = day

    def __repr__(self):
        return f"Date({self.year}-{self.month:02d}-{self.day:02d})"

    @classmethod
    def from_string(cls, date_str):
        """Alternative constructor — parse 'YYYY-MM-DD'"""
        year, month, day = map(int, date_str.split('-'))
        return cls(year, month, day)  # cls, not Date — works with subclasses!

    @classmethod
    def today(cls):
        """Alternative constructor — current date"""
        import datetime
        d = datetime.date.today()
        return cls(d.year, d.month, d.day)

    @staticmethod
    def is_valid(year, month, day):
        """Utility — no self or cls needed"""
        return 1 <= month <= 12 and 1 <= day <= 31 and year > 0

# Use classmethods as alternative constructors
d1 = Date(2024, 1, 15)
d2 = Date.from_string("2024-06-30")
d3 = Date.today()
print(d1, d2, d3)

# staticmethod is just a namespaced utility
print(Date.is_valid(2024, 13, 1))  # False


# ═══════════════════════════════════════════════════════════════
# ✦ @abstractmethod — enforce interface
# ═══════════════════════════════════════════════════════════════
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        """Subclasses MUST implement this"""
        pass

    @abstractmethod
    def perimeter(self):
        pass

    def describe(self):
        """Concrete method — inherited by all subclasses"""
        return f"{self.__class__.__name__}: area={self.area():.2f}"

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14159 * self.radius ** 2

    def perimeter(self):
        return 2 * 3.14159 * self.radius

# s = Shape()  # TypeError: Can't instantiate abstract class
c = Circle(5)
print(c.describe())   # Circle: area=78.54
print(c.perimeter())  # 31.42`
    },
    {
      name: 'Real-World Patterns',
      icon: '🛠️',
      explanation: `**Memoization / Caching:**
• Cache expensive function results
• @lru_cache for simple cases
• Custom caching with expiry/invalidation

**Authentication / Authorization:**
• Check permissions before function executes
• Common in web frameworks (Flask, Django)

**Singleton Pattern:**
• Ensure only one instance of a class
• Decorator on the class itself

**Registry / Plugin System:**
• Register functions/classes automatically
• Build dispatch tables, plugin architectures

**Input Validation:**
• Type checking, range validation, sanitization
• Enforce contracts on function arguments

**Deprecation Warnings:**
• Warn users about deprecated functions
• Suggest alternatives`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Memoize with TTL (time-to-live expiry)
# ═══════════════════════════════════════════════════════════════
from functools import wraps
import time

def memoize_ttl(ttl_seconds=60):
    """Cache results with automatic expiration"""
    def decorator(func):
        cache = {}
        @wraps(func)
        def wrapper(*args):
            now = time.time()
            if args in cache:
                result, timestamp = cache[args]
                if now - timestamp < ttl_seconds:
                    print(f"  [CACHE HIT] {args}")
                    return result
            result = func(*args)
            cache[args] = (result, now)
            return result
        wrapper.cache = cache
        wrapper.clear_cache = lambda: cache.clear()
        return wrapper
    return decorator

@memoize_ttl(ttl_seconds=5)
def fetch_price(symbol):
    print(f"  [FETCH] Getting price for {symbol}")
    return 150.00  # simulated

print(fetch_price("AAPL"))  # [FETCH] Getting price...
print(fetch_price("AAPL"))  # [CACHE HIT] — no fetch


# ═══════════════════════════════════════════════════════════════
# ✦ Registry pattern — auto-register handlers
# ═══════════════════════════════════════════════════════════════
class CommandRegistry:
    def __init__(self):
        self._commands = {}

    def register(self, name=None):
        """Decorator to register a command handler"""
        def decorator(func):
            cmd_name = name or func.__name__
            self._commands[cmd_name] = func
            return func
        return decorator

    def execute(self, name, *args, **kwargs):
        if name not in self._commands:
            raise ValueError(f"Unknown command: {name}")
        return self._commands[name](*args, **kwargs)

    def list_commands(self):
        return list(self._commands.keys())

cli = CommandRegistry()

@cli.register()
def greet(name):
    return f"Hello, {name}!"

@cli.register(name="quit")
def exit_app():
    return "Goodbye!"

@cli.register()
def add(a, b):
    return a + b

print(cli.list_commands())      # ['greet', 'quit', 'add']
print(cli.execute("greet", "Alice"))  # Hello, Alice!
print(cli.execute("add", 3, 5))      # 8


# ═══════════════════════════════════════════════════════════════
# ✦ Singleton decorator — one instance per class
# ═══════════════════════════════════════════════════════════════
def singleton(cls):
    """Ensure only one instance of a class exists"""
    instances = {}
    @wraps(cls)
    def get_instance(*args, **kwargs):
        if cls not in instances:
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]
    return get_instance

@singleton
class Database:
    def __init__(self, url="localhost:5432"):
        self.url = url
        print(f"  Connecting to {url}...")

db1 = Database()          # Connecting to localhost:5432...
db2 = Database()          # No output — returns same instance!
print(db1 is db2)         # True


# ═══════════════════════════════════════════════════════════════
# ✦ Deprecation warning decorator
# ═══════════════════════════════════════════════════════════════
import warnings

def deprecated(reason="", alternative=None):
    """Mark a function as deprecated"""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            msg = f"{func.__name__} is deprecated."
            if reason:
                msg += f" {reason}"
            if alternative:
                msg += f" Use {alternative} instead."
            warnings.warn(msg, DeprecationWarning, stacklevel=2)
            return func(*args, **kwargs)
        return wrapper
    return decorator

@deprecated(reason="Slow implementation.", alternative="fast_sort()")
def old_sort(data):
    return sorted(data)

# Will show: DeprecationWarning: old_sort is deprecated. ...
result = old_sort([3, 1, 2])


# ═══════════════════════════════════════════════════════════════
# ✦ Context-preserving decorator for methods
# ═══════════════════════════════════════════════════════════════
def ensure_connected(func):
    """Ensure connection before calling method"""
    @wraps(func)
    def wrapper(self, *args, **kwargs):
        if not getattr(self, '_connected', False):
            print(f"  Auto-connecting before {func.__name__}...")
            self.connect()
        return func(self, *args, **kwargs)
    return wrapper

class APIClient:
    def __init__(self, base_url):
        self.base_url = base_url
        self._connected = False

    def connect(self):
        self._connected = True
        print(f"  Connected to {self.base_url}")

    @ensure_connected
    def get(self, endpoint):
        return f"GET {self.base_url}/{endpoint}"

    @ensure_connected
    def post(self, endpoint, data):
        return f"POST {self.base_url}/{endpoint} with {data}"

client = APIClient("https://api.example.com")
print(client.get("users"))
# Auto-connecting before get...
# Connected to https://api.example.com
# GET https://api.example.com/users

print(client.post("users", {"name": "Alice"}))
# Already connected — no auto-connect
# POST https://api.example.com/users with {'name': 'Alice'}`
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
              background: 'linear-gradient(to right, #f472b6, #e879f9)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              🎀 Decorators Deep Dive
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
          primaryColor={'#ec4899'}
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
                border: '2px solid #ec4899',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#f472b6'
                e.currentTarget.style.transform = 'translateY(-0.5rem)'
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(236, 72, 153, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#ec4899'
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
                color: '#f9a8d4'
              }}>
                {concept.name}
              </h3>
              <p style={{
                color: '#d1d5db',
                textAlign: 'left',
                fontSize: '0.875rem'
              }}>
                Click to explore decorator concepts
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
              border: '2px solid #ec4899',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}>
              <div style={{
                position: 'sticky',
                top: '0',
                background: 'linear-gradient(to right, #be185d, #9d174d)',
                padding: '1.5rem',
                borderTopLeftRadius: '0.75rem',
                borderTopRightRadius: '0.75rem',
                borderBottom: '2px solid #f472b6',
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
                  border: '1px solid #ec4899'
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: '#f9a8d4'
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
                        return <div key={i} style={{ fontWeight: '700', color: '#f9a8d4', marginTop: i > 0 ? '1rem' : 0, marginBottom: '0.5rem' }}>{text}</div>
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
                  border: '1px solid #ec4899'
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: '#f9a8d4'
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
                            background: '#be185d',
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

export default Decorators
