import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

function LambdaFunctions({ onBack, breadcrumb }) {
  const [selectedConcept, setSelectedConcept] = useState(null)

  // Compute extended breadcrumb when a concept is selected
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
      name: 'Lambda Basics',
      icon: 'λ',
      explanation: `**Core Concept:**
• Anonymous functions defined with lambda keyword
• Single-line function expressions
• Syntax: lambda arguments: expression
• Returns result of expression automatically
• No return statement needed

**Syntax:**
• lambda parameters: expression
• Can have multiple parameters (comma-separated)
• Expression must be single line
• Cannot contain statements (no assignments, loops, etc.)

**Comparison with def:**
• def function: Named, multi-line, can have statements
• lambda: Anonymous, single-line expression only
• lambda is function object, can be assigned to variable
• Use lambda for simple, throwaway functions

**When to Use Lambda:**
• Short function needed once
• Passing function as argument (map, filter, sort)
• Simple transformations
• Functional programming patterns

**When NOT to Use:**
• Complex logic requiring multiple lines
• Need for documentation/clarity
• Function will be reused multiple times
• Requires statements (if, for, etc.)

**Best Practices:**
• Keep lambdas simple and readable
• Use def for complex logic
• Avoid nesting lambdas
• Don't assign lambda to variable (use def instead)`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Basic lambda syntax
# ═══════════════════════════════════════════════════════════════
# Regular function
def square(x):
    return x ** 2

# Equivalent lambda
square_lambda = lambda x: x ** 2

print(square(5))          # 25
print(square_lambda(5))   # 25

# Lambda with multiple parameters
add = lambda a, b: a + b
print(add(3, 7))          # 10

multiply = lambda x, y, z: x * y * z
print(multiply(2, 3, 4))  # 24


# ═══════════════════════════════════════════════════════════════
# ✦ Lambdas in expressions
# ═══════════════════════════════════════════════════════════════
# Direct invocation
result = (lambda x: x * 2)(5)
print(result)             # 10

# Conditional expression in lambda
max_value = lambda a, b: a if a > b else b
print(max_value(10, 20))  # 20

absolute = lambda n: n if n >= 0 else -n
print(absolute(-42))      # 42


# ═══════════════════════════════════════════════════════════════
# ✦ Lambdas vs named functions
# ═══════════════════════════════════════════════════════════════
# Good use of lambda (simple, one-time use)
numbers = [1, 2, 3, 4, 5]
doubled = list(map(lambda x: x * 2, numbers))
print(doubled)            # [2, 4, 6, 8, 10]

# Bad practice - assigning lambda to variable
# Instead of this:
power = lambda x, n: x ** n  # Bad

# Use this:
def power(x, n):             # Good
    return x ** n


# ═══════════════════════════════════════════════════════════════
# ✦ Lambda limitations
# ═══════════════════════════════════════════════════════════════
# Can't use statements
# This doesn't work:
# bad_lambda = lambda x: print(x)  # print is statement

# Can't have multiple expressions
# This doesn't work:
# bad_lambda = lambda x: x += 1; return x

# Must be single expression
# Good: transform and return in one expression
good_lambda = lambda x: x * 2 + 1
print(good_lambda(5))     # 11


# ═══════════════════════════════════════════════════════════════
# ✦ Practical simple examples
# ═══════════════════════════════════════════════════════════════
# String operations
uppercase = lambda s: s.upper()
print(uppercase("hello")) # HELLO

reverse = lambda s: s[::-1]
print(reverse("Python"))  # nohtyP

# Type checking
is_even = lambda n: n % 2 == 0
print(is_even(4))         # True
print(is_even(7))         # False

# Tuple extraction
get_first = lambda t: t[0]
get_second = lambda t: t[1]
pair = (10, 20)
print(get_first(pair))    # 10
print(get_second(pair))   # 20


# ═══════════════════════════════════════════════════════════════
# ✦ Default arguments in lambda
# ═══════════════════════════════════════════════════════════════
# Lambda with default parameter
greet = lambda name="World": f"Hello, {name}!"
print(greet())            # Hello, World!
print(greet("Alice"))     # Hello, Alice!

# Multiple defaults
power = lambda x, n=2: x ** n
print(power(5))           # 25 (default n=2)
print(power(5, 3))        # 125`
    },
    {
      name: 'Lambda with Built-in Functions',
      icon: '🔧',
      explanation: `**Core Concept:**
• Lambda functions shine with map(), filter(), and sorted()
• Pass lambda as function argument
• Avoid creating named functions for simple operations
• Common functional programming pattern

**map() Function:**
• Applies function to every item in iterable
• Syntax: map(function, iterable)
• Returns iterator (convert to list if needed)
• Use lambda for simple transformations

**filter() Function:**
• Filters items based on condition
• Syntax: filter(function, iterable)
• Function should return True/False
• Keeps items where function returns True

**sorted() Function:**
• Sorts iterable using key function
• Syntax: sorted(iterable, key=function)
• Lambda extracts value for comparison
• reverse=True for descending order

**reduce() Function:**
• Accumulates values using binary function
• From functools module
• Syntax: reduce(function, iterable, initial)
• Combines all items into single value

**Common Patterns:**
• Transform: map(lambda x: expression, data)
• Filter: filter(lambda x: condition, data)
• Sort: sorted(data, key=lambda x: x[field])
• Accumulate: reduce(lambda a, b: operation, data)`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ map() with lambda
# ═══════════════════════════════════════════════════════════════
# Square all numbers
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x ** 2, numbers))
print(squared)
# Output: [1, 4, 9, 16, 25]

# Convert to uppercase
words = ['python', 'java', 'javascript']
uppercase = list(map(lambda s: s.upper(), words))
print(uppercase)
# Output: ['PYTHON', 'JAVA', 'JAVASCRIPT']

# Multiple iterables
nums1 = [1, 2, 3]
nums2 = [4, 5, 6]
sums = list(map(lambda x, y: x + y, nums1, nums2))
print(sums)
# Output: [5, 7, 9]

# Extract from tuples
pairs = [(1, 'a'), (2, 'b'), (3, 'c')]
first_items = list(map(lambda t: t[0], pairs))
print(first_items)
# Output: [1, 2, 3]


# ═══════════════════════════════════════════════════════════════
# ✦ filter() with lambda
# ═══════════════════════════════════════════════════════════════
# Filter even numbers
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)
# Output: [2, 4, 6, 8, 10]

# Filter strings by length
words = ['hi', 'hello', 'world', 'python', 'code']
long_words = list(filter(lambda w: len(w) > 4, words))
print(long_words)
# Output: ['hello', 'world', 'python']

# Filter positive numbers
numbers = [-5, 3, -1, 7, -2, 9, 0, 4]
positive = list(filter(lambda n: n > 0, numbers))
print(positive)
# Output: [3, 7, 9, 4]

# Filter non-empty strings
data = ['hello', '', 'world', '', 'python']
non_empty = list(filter(lambda s: len(s) > 0, data))
print(non_empty)
# Output: ['hello', 'world', 'python']


# ═══════════════════════════════════════════════════════════════
# ✦ sorted() with lambda key
# ═══════════════════════════════════════════════════════════════
# Sort by string length
words = ['python', 'java', 'c', 'javascript', 'go']
by_length = sorted(words, key=lambda w: len(w))
print(by_length)
# Output: ['c', 'go', 'java', 'python', 'javascript']

# Sort tuples by second element
pairs = [(3, 'c'), (1, 'a'), (2, 'b')]
by_second = sorted(pairs, key=lambda t: t[1])
print(by_second)
# Output: [(1, 'a'), (2, 'b'), (3, 'c')]

# Sort dictionaries by value
people = [
    {'name': 'Alice', 'age': 30},
    {'name': 'Bob', 'age': 25},
    {'name': 'Charlie', 'age': 35}
]
by_age = sorted(people, key=lambda p: p['age'])
print([p['name'] for p in by_age])
# Output: ['Bob', 'Alice', 'Charlie']

# Sort by multiple criteria
students = [
    ('Alice', 85),
    ('Bob', 92),
    ('Charlie', 85),
    ('David', 92)
]
sorted_students = sorted(students, key=lambda s: (-s[1], s[0]))
print(sorted_students)
# Output: [('Bob', 92), ('David', 92), ('Alice', 85), ('Charlie', 85)]


# ═══════════════════════════════════════════════════════════════
# ✦ reduce() with lambda
# ═══════════════════════════════════════════════════════════════
from functools import reduce

# Sum all numbers
numbers = [1, 2, 3, 4, 5]
total = reduce(lambda a, b: a + b, numbers)
print(total)
# Output: 15

# Find maximum
numbers = [3, 7, 2, 9, 5]
maximum = reduce(lambda a, b: a if a > b else b, numbers)
print(maximum)
# Output: 9

# Multiply all numbers
numbers = [1, 2, 3, 4, 5]
product = reduce(lambda a, b: a * b, numbers)
print(product)
# Output: 120

# Concatenate strings
words = ['Hello', ' ', 'World', '!']
sentence = reduce(lambda a, b: a + b, words)
print(sentence)
# Output: Hello World!


# ═══════════════════════════════════════════════════════════════
# ✦ Combining map, filter, sorted
# ═══════════════════════════════════════════════════════════════
# Get squares of even numbers, sorted descending
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
result = sorted(
    map(lambda x: x ** 2, filter(lambda x: x % 2 == 0, numbers)),
    reverse=True
)
print(result)
# Output: [100, 64, 36, 16, 4]

# Process pipeline
data = ['  hello  ', '  world  ', '  python  ']
processed = list(map(
    lambda s: s.strip().upper(),
    filter(lambda s: len(s.strip()) > 4, data)
))
print(processed)
# Output: ['HELLO', 'WORLD', 'PYTHON']


# ═══════════════════════════════════════════════════════════════
# ✦ Practical examples
# ═══════════════════════════════════════════════════════════════
# Parse CSV-like data
csv_data = ['1,John,30', '2,Jane,25', '3,Bob,35']
parsed = list(map(lambda row: row.split(','), csv_data))
print(parsed)
# Output: [['1', 'John', '30'], ['2', 'Jane', '25'], ['3', 'Bob', '35']]

# Calculate grades
scores = [85, 92, 78, 95, 88]
grades = list(map(
    lambda s: 'A' if s >= 90 else 'B' if s >= 80 else 'C',
    scores
))
print(grades)
# Output: ['B', 'A', 'C', 'A', 'B']

# Filter and transform in one go
prices = [10, 50, 30, 80, 20]
expensive_with_tax = list(map(
    lambda p: p * 1.1,
    filter(lambda p: p > 40, prices)
))
print(expensive_with_tax)
# Output: [55.0, 88.0]`
    },
    {
      name: 'Advanced Lambda Patterns',
      icon: '🎯',
      explanation: `**Core Concept:**
• Advanced techniques with lambda functions
• Closures and scope handling
• Lambda in data structures
• Partial application and currying
• Error handling with lambdas

**Closures:**
• Lambda can capture variables from enclosing scope
• Creates closure over outer variables
• Useful for creating function factories
• Be careful with late binding in loops

**Lambda in Data Structures:**
• Store lambdas in lists, dicts
• Create dispatch tables
• Strategy pattern implementation
• Function mapping for polymorphism

**Partial Application:**
• Create specialized functions from general ones
• Use functools.partial or lambda
• Bind some arguments, leave others open
• Useful for callbacks and event handlers

**Higher-Order Functions:**
• Functions that return functions
• Lambda can return lambda
• Currying: transform f(x,y) to f(x)(y)
• Function composition

**Common Pitfalls:**
• Late binding in loops
• Readability vs brevity
• Debugging lambda functions
• Performance considerations`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Closures with lambda
# ═══════════════════════════════════════════════════════════════
# Create multiplier function
def make_multiplier(n):
    return lambda x: x * n

times_2 = make_multiplier(2)
times_5 = make_multiplier(5)

print(times_2(10))    # 20
print(times_5(10))    # 50

# Create incrementer
def make_incrementer(n):
    return lambda x: x + n

add_10 = make_incrementer(10)
print(add_10(5))      # 15


# ═══════════════════════════════════════════════════════════════
# ✦ Lambda in data structures
# ═══════════════════════════════════════════════════════════════
# Dispatch table (strategy pattern)
operations = {
    'add': lambda a, b: a + b,
    'sub': lambda a, b: a - b,
    'mul': lambda a, b: a * b,
    'div': lambda a, b: a / b if b != 0 else None
}

print(operations['add'](10, 5))   # 15
print(operations['mul'](10, 5))   # 50

# State machine transitions
transitions = {
    'start': lambda: 'processing',
    'processing': lambda: 'complete',
    'complete': lambda: 'start'
}

state = 'start'
state = transitions[state]()
print(state)          # processing


# ═══════════════════════════════════════════════════════════════
# ✦ List of lambdas
# ═══════════════════════════════════════════════════════════════
# Function pipeline
processors = [
    lambda x: x.strip(),
    lambda x: x.lower(),
    lambda x: x.replace(' ', '_')
]

text = "  Hello World  "
for process in processors:
    text = process(text)
print(text)           # hello_world

# Validators
validators = [
    lambda s: len(s) > 5,
    lambda s: any(c.isdigit() for c in s),
    lambda s: any(c.isupper() for c in s)
]

password = "Pass123"
is_valid = all(validator(password) for validator in validators)
print(f"Valid: {is_valid}")  # Valid: True


# ═══════════════════════════════════════════════════════════════
# ✦ Partial application
# ═══════════════════════════════════════════════════════════════
from functools import partial

# Using functools.partial
def power(base, exponent):
    return base ** exponent

square = partial(power, exponent=2)
cube = partial(power, exponent=3)

print(square(5))      # 25
print(cube(5))        # 125

# Using lambda for partial application
power_of_2 = lambda x: power(x, 2)
power_of_3 = lambda x: power(x, 3)

print(power_of_2(4))  # 16
print(power_of_3(4))  # 64


# ═══════════════════════════════════════════════════════════════
# ✦ Currying with lambda
# ═══════════════════════════════════════════════════════════════
# Transform f(x, y) to f(x)(y)
add = lambda x: lambda y: x + y

add_5 = add(5)
print(add_5(10))      # 15
print(add(3)(7))      # 10

# Three parameter currying
multiply = lambda x: lambda y: lambda z: x * y * z
result = multiply(2)(3)(4)
print(result)         # 24


# ═══════════════════════════════════════════════════════════════
# ✦ Late binding pitfall and solution
# ═══════════════════════════════════════════════════════════════
# WRONG - late binding issue
functions_wrong = []
for i in range(5):
    functions_wrong.append(lambda: i)  # All capture same 'i'

print([f() for f in functions_wrong])  # [4, 4, 4, 4, 4]

# CORRECT - capture value immediately
functions_correct = []
for i in range(5):
    functions_correct.append(lambda i=i: i)  # Default arg captures value

print([f() for f in functions_correct])    # [0, 1, 2, 3, 4]


# ═══════════════════════════════════════════════════════════════
# ✦ Function composition
# ═══════════════════════════════════════════════════════════════
# Compose two functions
def compose(f, g):
    return lambda x: f(g(x))

double = lambda x: x * 2
increment = lambda x: x + 1

double_then_increment = compose(increment, double)
print(double_then_increment(5))  # 11 (5*2 + 1)

increment_then_double = compose(double, increment)
print(increment_then_double(5))  # 12 ((5+1)*2)


# ═══════════════════════════════════════════════════════════════
# ✦ Conditional lambda chains
# ═══════════════════════════════════════════════════════════════
# Chain of responsibility
validators = [
    (lambda x: x > 0, "Must be positive"),
    (lambda x: x < 100, "Must be less than 100"),
    (lambda x: x % 2 == 0, "Must be even")
]

def validate(value):
    for validator, message in validators:
        if not validator(value):
            return f"Invalid: {message}"
    return "Valid"

print(validate(50))   # Valid
print(validate(-5))   # Invalid: Must be positive
print(validate(150))  # Invalid: Must be less than 100


# ═══════════════════════════════════════════════════════════════
# ✦ Practical advanced examples
# ═══════════════════════════════════════════════════════════════
# Event handlers
event_handlers = {
    'click': lambda event: print(f"Clicked at {event}"),
    'hover': lambda event: print(f"Hovered at {event}"),
    'scroll': lambda event: print(f"Scrolled to {event}")
}

event_handlers['click']((10, 20))  # Clicked at (10, 20)

# Dynamic attribute getter
def get_attr_getter(attr_name):
    return lambda obj: getattr(obj, attr_name, None)

get_name = get_attr_getter('name')
get_age = get_attr_getter('age')

class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

person = Person("Alice", 30)
print(get_name(person))   # Alice
print(get_age(person))    # 30

# Memoization with lambda
cache = {}
fib = lambda n: cache.get(n) or cache.setdefault(
    n, n if n < 2 else fib(n-1) + fib(n-2)
)
print(fib(10))            # 55`
    }
  ]

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
              λ Lambda Functions
            </h1>
          </div>
        </div>

        <Breadcrumb breadcrumb={activeBreadcrumb} onMainMenu={breadcrumb?.onMainMenu} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {concepts.map((concept, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedConcept(concept)}
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
                {concept.explanation?.substring(0, 150)}...
              </p>
            </div>
          ))}
        </div>

        {selectedConcept && (
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
              maxWidth: '72rem',
              width: '100%',
              maxHeight: '90vh',
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
                    <span style={{ fontSize: '3rem' }}>{selectedConcept.icon}</span>
                    <h2 style={{
                      fontSize: '1.875rem',
                      fontWeight: 'bold',
                      color: 'white'
                    }}>
                      {selectedConcept.name}
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
                    color: '#d1d5db',
                    lineHeight: '1.625'
                  }}>
                    {selectedConcept.explanation.split('\n\n').map((section, idx) => {
                      if (section.startsWith('**') && section.includes(':**')) {
                        const headerMatch = section.match(/\*\*(.*?):\*\*/)
                        if (headerMatch) {
                          const header = headerMatch[1]
                          const content = section.substring(headerMatch[0].length).trim()

                          return (
                            <div key={idx} style={{ marginBottom: '1.5rem' }}>
                              <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#60a5fa', marginBottom: '0.75rem' }}>
                                {header}
                              </h4>
                              <div style={{ paddingLeft: '1.25rem', fontSize: '0.95rem', lineHeight: '1.8' }}>
                                {content.split('\n').map((line, lineIdx) => {
                                  if (line.trim().startsWith('•')) {
                                    return (
                                      <div key={lineIdx} style={{ display: 'flex', marginBottom: '0.5rem' }}>
                                        <span style={{ color: '#60a5fa', marginRight: '0.75rem' }}>•</span>
                                        <span>{line.trim().substring(1).trim()}</span>
                                      </div>
                                    )
                                  }
                                  return line.trim() ? <div key={lineIdx} style={{ marginBottom: '0.5rem' }}>{line}</div> : null
                                })}
                              </div>
                            </div>
                          )
                        }
                      }
                      return null
                    })}
                  </div>
                </div>

                {selectedConcept.codeExample && (() => {
                  const sections = parseCodeSections(selectedConcept.codeExample)
                  return sections.length > 0 ? (
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
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {sections.map((section, idx) => (
                          <div key={idx} style={{ backgroundColor: '#1e293b', borderRadius: '12px', overflow: 'hidden', border: '2px solid #334155' }}>
                            <div
                              style={{
                                width: '100%',
                                padding: '1rem 1.5rem',
                                backgroundColor: '#334155',
                                color: '#60a5fa',
                                fontSize: '1rem',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <span>{section.title}</span>
                            </div>

                            <div style={{ padding: 0 }}>
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
                        ))}
                      </div>
                    </div>
                  ) : null
                })()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LambdaFunctions
