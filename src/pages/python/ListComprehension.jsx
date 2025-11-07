import { useState } from 'react'

// Simple syntax highlighter for Python code
const SyntaxHighlighter = ({ code }) => {
  const highlightPython = (code) => {
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    const protectedContent = []
    let placeholder = 0

    highlighted = highlighted.replace(/(#.*$)/gm, (match) => {
      const id = `___COMMENT_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #6a9955; font-style: italic;">${match}</span>` })
      return id
    })

    highlighted = highlighted.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, (match) => {
      const id = `___STRING_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #ce9178;">${match}</span>` })
      return id
    })

    highlighted = highlighted
      .replace(/\b(def|class|if|elif|else|for|while|in|not|and|or|is|return|yield|import|from|as|try|except|finally|with|lambda|None|pass|break|continue)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(True|False|None)\b/g, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(print|len|range|enumerate|zip|map|filter|sorted|sum|max|min|list|dict|set|tuple)\b/g, '<span style="color: #dcdcaa;">$1</span>')
      .replace(/\b(\d+\.?\d*)\b/g, '<span style="color: #b5cea8;">$1</span>')

    protectedContent.forEach(({ id, replacement }) => {
      highlighted = highlighted.replace(id, replacement)
    })

    return highlighted
  }

  return (
    <pre style={{
      margin: 0,
      fontFamily: '"Fira Code", "Consolas", "Monaco", "Courier New", monospace',
      fontSize: '0.9rem',
      lineHeight: '1.7',
      color: '#e2e8f0',
      whiteSpace: 'pre',
      overflowX: 'auto',
      padding: '1.25rem'
    }}>
      <code dangerouslySetInnerHTML={{ __html: highlightPython(code) }} />
    </pre>
  )
}

function ListComprehension({ onBack }) {
  const [selectedConcept, setSelectedConcept] = useState(null)
  const [expandedSections, setExpandedSections] = useState({})

  const toggleSection = (sectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }))
  }

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
      name: 'Basic List Comprehension',
      icon: '📋',
      explanation: `**Core Concept:**
• Concise way to create lists based on existing iterables
• Syntax: [expression for item in iterable]
• More readable and faster than traditional for loops
• Combines map and filter operations in one line

**Basic Syntax:**
• [expression for item in iterable]
• expression - what to include in result
• item - variable for each element
• iterable - source sequence (list, range, string, etc.)

**Advantages:**
• More Pythonic and readable
• Often faster than equivalent for loop
• Less code to write and maintain
• Creates list directly without append() calls

**When to Use:**
• Transforming one list into another
• Creating lists from ranges or sequences
• Simple filtering and mapping operations
• Building lists in a single expression

**When NOT to Use:**
• Complex logic requiring multiple statements
• Deeply nested structures (hard to read)
• Side effects needed (use regular for loop)
• Performance critical code with large datasets`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Basic list comprehension
# ═══════════════════════════════════════════════════════════════
# Traditional for loop
squares_loop = []
for x in range(10):
    squares_loop.append(x ** 2)
print(f"Loop: {squares_loop}")

# List comprehension (preferred)
squares = [x ** 2 for x in range(10)]
print(f"Comprehension: {squares}")
# Output: [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]


# ═══════════════════════════════════════════════════════════════
# ✦ String transformations
# ═══════════════════════════════════════════════════════════════
# Uppercase all words
words = ['python', 'java', 'javascript']
uppercase = [word.upper() for word in words]
print(uppercase)
# Output: ['PYTHON', 'JAVA', 'JAVASCRIPT']

# Get string lengths
lengths = [len(word) for word in words]
print(lengths)
# Output: [6, 4, 10]

# First character of each word
first_chars = [word[0] for word in words]
print(first_chars)
# Output: ['p', 'j', 'j']


# ═══════════════════════════════════════════════════════════════
# ✦ Mathematical operations
# ═══════════════════════════════════════════════════════════════
# Multiply all numbers by 3
numbers = [1, 2, 3, 4, 5]
tripled = [n * 3 for n in numbers]
print(tripled)
# Output: [3, 6, 9, 12, 15]

# Convert Celsius to Fahrenheit
celsius = [0, 10, 20, 30, 40]
fahrenheit = [(c * 9/5) + 32 for c in celsius]
print(fahrenheit)
# Output: [32.0, 50.0, 68.0, 86.0, 104.0]


# ═══════════════════════════════════════════════════════════════
# ✦ Working with range
# ═══════════════════════════════════════════════════════════════
# Even numbers from 0 to 20
evens = [x for x in range(0, 21, 2)]
print(evens)
# Output: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

# Powers of 2
powers_of_2 = [2 ** i for i in range(10)]
print(powers_of_2)
# Output: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512]


# ═══════════════════════════════════════════════════════════════
# ✦ Tuple unpacking
# ═══════════════════════════════════════════════════════════════
# Extract from tuple pairs
pairs = [(1, 'a'), (2, 'b'), (3, 'c')]
numbers = [num for num, letter in pairs]
letters = [letter for num, letter in pairs]
print(f"Numbers: {numbers}")  # [1, 2, 3]
print(f"Letters: {letters}")  # ['a', 'b', 'c']


# ═══════════════════════════════════════════════════════════════
# ✦ Method calls in comprehension
# ═══════════════════════════════════════════════════════════════
# Strip whitespace from strings
raw_data = ['  hello  ', '  world  ', '  python  ']
cleaned = [s.strip() for s in raw_data]
print(cleaned)
# Output: ['hello', 'world', 'python']

# Call method with arguments
numbers = ['-42', '13', '-7', '99']
absolute_values = [int(n.strip('-')) if n.startswith('-') else int(n) for n in numbers]
print(absolute_values)
# Output: [42, 13, 7, 99]`
    },
    {
      name: 'Conditional Comprehensions',
      icon: '🔍',
      explanation: `**Core Concept:**
• Add filtering conditions to comprehensions
• Two forms: filter only, or conditional expression
• Combines map, filter, and conditional logic
• Creates cleaner code than nested if statements

**Filter Syntax:**
• [expression for item in iterable if condition]
• if condition - filters items (only True items included)
• Placed at the end after for clause
• Can have multiple if clauses

**Conditional Expression:**
• [true_expr if condition else false_expr for item in iterable]
• Ternary operator inside comprehension
• Always produces output for each item
• Placed before for clause

**Multiple Conditions:**
• [expr for item in iterable if cond1 if cond2]
• Acts as AND (both must be True)
• Equivalent to: if cond1 and cond2

**Complex Filtering:**
• Combine multiple conditions
• Use and, or, not operators
• Call functions for complex logic
• Can reference multiple variables`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Filter with if condition
# ═══════════════════════════════════════════════════════════════
# Even numbers only
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = [x for x in numbers if x % 2 == 0]
print(evens)
# Output: [2, 4, 6, 8, 10]

# Words longer than 4 characters
words = ['hi', 'hello', 'python', 'code', 'programming']
long_words = [word for word in words if len(word) > 4]
print(long_words)
# Output: ['hello', 'python', 'programming']

# Positive numbers only
mixed = [-5, 3, -1, 7, -2, 9, 0]
positive = [n for n in mixed if n > 0]
print(positive)
# Output: [3, 7, 9]


# ═══════════════════════════════════════════════════════════════
# ✦ Conditional expression (if-else)
# ═══════════════════════════════════════════════════════════════
# Replace negative with 0, keep positive
numbers = [-2, 5, -1, 8, -3]
normalized = [n if n > 0 else 0 for n in numbers]
print(normalized)
# Output: [0, 5, 0, 8, 0]

# Categorize numbers as even/odd
numbers = [1, 2, 3, 4, 5]
categories = ['even' if n % 2 == 0 else 'odd' for n in numbers]
print(categories)
# Output: ['odd', 'even', 'odd', 'even', 'odd']

# Apply discount to expensive items
prices = [10, 50, 30, 80, 20]
final_prices = [p * 0.9 if p > 40 else p for p in prices]
print(final_prices)
# Output: [10, 45.0, 30, 72.0, 20]


# ═══════════════════════════════════════════════════════════════
# ✦ Multiple conditions (AND)
# ═══════════════════════════════════════════════════════════════
# Numbers divisible by 2 AND 3
numbers = range(1, 31)
div_by_6 = [n for n in numbers if n % 2 == 0 if n % 3 == 0]
print(div_by_6)
# Output: [6, 12, 18, 24, 30]

# Equivalent using 'and'
div_by_6_alt = [n for n in numbers if n % 2 == 0 and n % 3 == 0]
print(div_by_6_alt)
# Output: [6, 12, 18, 24, 30]


# ═══════════════════════════════════════════════════════════════
# ✦ Complex filtering logic
# ═══════════════════════════════════════════════════════════════
# Words that start with vowel and have even length
words = ['apple', 'banana', 'orange', 'pear', 'avocado']
vowels = 'aeiouAEIOU'
filtered = [w for w in words if w[0] in vowels and len(w) % 2 == 0]
print(filtered)
# Output: ['orange']

# Numbers in specific range
numbers = [5, 12, 18, 25, 30, 42, 55]
in_range = [n for n in numbers if 15 <= n <= 45]
print(in_range)
# Output: [18, 25, 30, 42]


# ═══════════════════════════════════════════════════════════════
# ✦ Function calls in conditions
# ═══════════════════════════════════════════════════════════════
def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True

# Get prime numbers
numbers = range(2, 30)
primes = [n for n in numbers if is_prime(n)]
print(primes)
# Output: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]


# ═══════════════════════════════════════════════════════════════
# ✦ Nested conditions
# ═══════════════════════════════════════════════════════════════
# Categorize numbers
numbers = range(1, 21)
categories = [
    'divisible by 15' if n % 15 == 0
    else 'divisible by 5' if n % 5 == 0
    else 'divisible by 3' if n % 3 == 0
    else 'other'
    for n in numbers
]
print(categories)


# ═══════════════════════════════════════════════════════════════
# ✦ Practical examples
# ═══════════════════════════════════════════════════════════════
# Extract valid email addresses
emails = ['user@example.com', 'invalid', 'test@test.com', 'bad.email']
valid_emails = [e for e in emails if '@' in e and '.' in e.split('@')[1]]
print(valid_emails)
# Output: ['user@example.com', 'test@test.com']

# Parse CSV row
data = ['10', '20', 'invalid', '30', '40']
numbers = [int(x) for x in data if x.isdigit()]
print(numbers)
# Output: [10, 20, 30, 40]

# Filter and transform
scores = [45, 78, 92, 67, 55, 88]
grades = ['Pass: ' + str(s) for s in scores if s >= 60]
print(grades)
# Output: ['Pass: 78', 'Pass: 92', 'Pass: 67', 'Pass: 88']`
    },
    {
      name: 'Nested & Advanced Comprehensions',
      icon: '🎯',
      explanation: `**Core Concept:**
• Multiple for clauses in single comprehension
• Create flattened lists from nested structures
• Dictionary and set comprehensions
• Generator expressions for memory efficiency

**Nested Comprehensions:**
• [expr for item1 in iter1 for item2 in iter2]
• Equivalent to nested for loops
• Order: outer loop first, inner loop second
• Can have multiple levels

**Flattening Lists:**
• Convert 2D list to 1D: [item for sublist in list2d for item in sublist]
• Unpack nested structures
• Common pattern for matrix operations

**Dict Comprehensions:**
• {key_expr: value_expr for item in iterable}
• Create dictionaries concisely
• Can include conditions
• Useful for transformations

**Set Comprehensions:**
• {expression for item in iterable}
• Creates set (unique values)
• Automatic duplicate removal
• Same syntax as list, different brackets

**Generator Expressions:**
• (expression for item in iterable)
• Lazy evaluation (memory efficient)
• Returns generator object, not list
• Use for large datasets or infinite sequences`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Nested list comprehension
# ═══════════════════════════════════════════════════════════════
# Cartesian product
colors = ['red', 'blue']
sizes = ['S', 'M', 'L']
combinations = [(color, size) for color in colors for size in sizes]
print(combinations)
# Output: [('red', 'S'), ('red', 'M'), ('red', 'L'), ('blue', 'S'), ('blue', 'M'), ('blue', 'L')]

# Multiplication table
table = [[i * j for j in range(1, 6)] for i in range(1, 6)]
for row in table:
    print(row)
# Output: [[1, 2, 3, 4, 5], [2, 4, 6, 8, 10], ...]


# ═══════════════════════════════════════════════════════════════
# ✦ Flattening nested lists
# ═══════════════════════════════════════════════════════════════
# 2D list to 1D
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened = [num for row in matrix for num in row]
print(flattened)
# Output: [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Flatten list of lists of different sizes
nested = [[1, 2], [3, 4, 5], [6]]
flat = [item for sublist in nested for item in sublist]
print(flat)
# Output: [1, 2, 3, 4, 5, 6]


# ═══════════════════════════════════════════════════════════════
# ✦ Dictionary comprehension
# ═══════════════════════════════════════════════════════════════
# Create dict from lists
names = ['Alice', 'Bob', 'Charlie']
ages = [25, 30, 35]
name_age = {name: age for name, age in zip(names, ages)}
print(name_age)
# Output: {'Alice': 25, 'Bob': 30, 'Charlie': 35}

# Square numbers dict
squares_dict = {x: x**2 for x in range(1, 6)}
print(squares_dict)
# Output: {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# Invert dictionary
original = {'a': 1, 'b': 2, 'c': 3}
inverted = {v: k for k, v in original.items()}
print(inverted)
# Output: {1: 'a', 2: 'b', 3: 'c'}

# Filter dict items
scores = {'Alice': 85, 'Bob': 92, 'Charlie': 78, 'David': 95}
high_scores = {name: score for name, score in scores.items() if score >= 90}
print(high_scores)
# Output: {'Bob': 92, 'David': 95}


# ═══════════════════════════════════════════════════════════════
# ✦ Set comprehension
# ═══════════════════════════════════════════════════════════════
# Unique lengths
words = ['python', 'java', 'c', 'cpp', 'javascript', 'go']
unique_lengths = {len(word) for word in words}
print(unique_lengths)
# Output: {1, 2, 3, 4, 6, 10}

# Unique first letters
first_letters = {word[0] for word in words}
print(first_letters)
# Output: {'c', 'g', 'j', 'p'}

# Remove duplicates while transforming
numbers = [1, 2, 2, 3, 3, 3, 4, 4, 5]
unique_squares = {x**2 for x in numbers}
print(unique_squares)
# Output: {1, 4, 9, 16, 25}


# ═══════════════════════════════════════════════════════════════
# ✦ Generator expressions
# ═══════════════════════════════════════════════════════════════
# Memory-efficient for large datasets
gen = (x**2 for x in range(1000000))
print(type(gen))                    # <class 'generator'>
print(next(gen))                    # 0
print(next(gen))                    # 1

# Use in functions that accept iterables
numbers = range(100)
total = sum(x**2 for x in numbers)  # No list created in memory
print(f"Sum: {total}")              # 328350

# Generator for file processing (memory efficient)
# lines = (line.strip() for line in open('file.txt'))


# ═══════════════════════════════════════════════════════════════
# ✦ Complex nested patterns
# ═══════════════════════════════════════════════════════════════
# Matrix transpose
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
transposed = [[row[i] for row in matrix] for i in range(len(matrix[0]))]
print(transposed)
# Output: [[1, 4, 7], [2, 5, 8], [3, 6, 9]]

# Nested filtering
matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]
evens_only = [[num for num in row if num % 2 == 0] for row in matrix]
print(evens_only)
# Output: [[2, 4], [6, 8], [10, 12]]


# ═══════════════════════════════════════════════════════════════
# ✦ Practical applications
# ═══════════════════════════════════════════════════════════════
# Parse coordinates
points = ['1,2', '3,4', '5,6']
coords = [(int(x), int(y)) for point in points for x, y in [point.split(',')]]
print(coords)
# Output: [(1, 2), (3, 4), (5, 6)]

# Group by property
students = [
    {'name': 'Alice', 'grade': 'A'},
    {'name': 'Bob', 'grade': 'B'},
    {'name': 'Charlie', 'grade': 'A'}
]
grade_groups = {
    grade: [s['name'] for s in students if s['grade'] == grade]
    for grade in set(s['grade'] for s in students)
}
print(grade_groups)
# Output: {'A': ['Alice', 'Charlie'], 'B': ['Bob']}

# Flatten and filter
nested_data = [[1, -2, 3], [-4, 5, -6], [7, 8, -9]]
positive_flat = [num for row in nested_data for num in row if num > 0]
print(positive_flat)
# Output: [1, 3, 5, 7, 8]`
    }
  ]

  return (
    <>
      <div style={{
        padding: '2rem',
        maxWidth: '95%',
        margin: '120px auto 0',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
        border: '3px solid rgba(124, 58, 237, 0.4)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <button
            onClick={onBack}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              backgroundColor: '#7c3aed',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(124, 58, 237, 0.3)'
            }}
          >
            ← Back to Python Topics
          </button>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            color: '#1f2937',
            margin: 0
          }}>
            📋 List Comprehension
          </h1>
          <div style={{ width: '150px' }}></div>
        </div>

        <div style={{
          backgroundColor: 'rgba(124, 58, 237, 0.05)',
          padding: '2.5rem 10rem',
          borderRadius: '16px',
          border: '3px solid rgba(124, 58, 237, 0.3)',
          marginBottom: '2rem'
        }}>
          <p style={{
            fontSize: '1.3rem',
            color: '#374151',
            fontWeight: '500',
            margin: 0,
            lineHeight: '1.8',
            textAlign: 'center'
          }}>
            Concise list creation with comprehensions: filtering, mapping, nested comprehensions, dict/set comprehensions, and generator expressions.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {concepts.map((concept, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedConcept(concept)}
              style={{
                backgroundColor: 'rgba(124, 58, 237, 0.05)',
                padding: '2rem',
                borderRadius: '16px',
                border: '3px solid rgba(124, 58, 237, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>
                {concept.icon}
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#7c3aed',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                {concept.name}
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#6b7280',
                lineHeight: '1.6',
                textAlign: 'center'
              }}>
                {concept.explanation?.substring(0, 150)}...
              </p>
            </div>
          ))}
        </div>
      </div>

      {selectedConcept && (
        <div
          onClick={() => setSelectedConcept(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem',
            backdropFilter: 'blur(4px)'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '90vw',
              maxHeight: '90vh',
              width: '1200px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              border: '3px solid rgba(124, 58, 237, 0.4)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{
              padding: '1.5rem 2rem',
              borderBottom: '2px solid rgba(124, 58, 237, 0.2)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'rgba(124, 58, 237, 0.05)'
            }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#7c3aed',
                margin: 0
              }}>
                {selectedConcept.icon} {selectedConcept.name}
              </h2>
              <button
                onClick={() => setSelectedConcept(null)}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '1.5rem',
                  backgroundColor: 'transparent',
                  color: '#6b7280',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ padding: '2rem', overflowY: 'auto', flex: 1 }}>
              <div style={{
                backgroundColor: 'rgba(124, 58, 237, 0.05)',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '2px solid rgba(124, 58, 237, 0.2)',
                marginBottom: '2rem'
              }}>
                {selectedConcept.explanation.split('\n\n').map((section, idx) => {
                  if (section.startsWith('**') && section.includes(':**')) {
                    const headerMatch = section.match(/\*\*(.*?):\*\*/)
                    if (headerMatch) {
                      const header = headerMatch[1]
                      const content = section.substring(headerMatch[0].length).trim()

                      return (
                        <div key={idx} style={{ marginBottom: '1.5rem' }}>
                          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#7c3aed', marginBottom: '0.75rem' }}>
                            {header}
                          </h3>
                          <div style={{ paddingLeft: '1.25rem', color: '#4b5563', fontSize: '0.95rem', lineHeight: '1.8' }}>
                            {content.split('\n').map((line, lineIdx) => {
                              if (line.trim().startsWith('•')) {
                                return (
                                  <div key={lineIdx} style={{ display: 'flex', marginBottom: '0.5rem' }}>
                                    <span style={{ color: '#7c3aed', marginRight: '0.75rem' }}>•</span>
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

              {selectedConcept.codeExample && (() => {
                const sections = parseCodeSections(selectedConcept.codeExample)
                return sections.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {sections.map((section, idx) => {
                      const sectionKey = `${selectedConcept.name}-${idx}`
                      const isExpanded = expandedSections[sectionKey]

                      return (
                        <div key={idx} style={{ backgroundColor: '#1e293b', borderRadius: '12px', overflow: 'hidden', border: '2px solid #334155' }}>
                          <button
                            onClick={() => toggleSection(sectionKey)}
                            style={{
                              width: '100%',
                              padding: '1rem 1.5rem',
                              backgroundColor: '#334155',
                              border: 'none',
                              color: '#60a5fa',
                              fontSize: '1rem',
                              fontWeight: '600',
                              cursor: 'pointer',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}
                          >
                            <span>💻 {section.title}</span>
                            <span style={{ fontSize: '1.2rem' }}>{isExpanded ? '▼' : '▶'}</span>
                          </button>

                          {isExpanded && (
                            <div style={{ padding: 0 }}>
                              <SyntaxHighlighter code={section.code} />
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ) : null
              })()}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ListComprehension
